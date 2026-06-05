---
# title: Tool calls (aka function calls)
title: 工具调用（又称函数调用）
# sidenav: ai
sidenav: ai
# shortTitle: Tool calls
shortTitle: 工具调用
# description: >
#   Learn how to implement tool calling, manage agentic loops, and incorporate 
#   human-in-the-loop interactions using the Firebase AI Logic SDK.
description: >
  了解如何使用 Firebase AI Logic SDK 实现工具调用、管理智能体循环，并融入人在回路交互。
prev:
  # title: Structure & output
  title: 结构与输出
  path: /ai/best-practices/structure-output
next:
  # title: Mode of interaction
  title: 交互模式
  path: /ai/best-practices/mode-of-interaction
ai-translated: true
---


While it's true that LLMs are trained essentially on the entire internet, they
don't know everything.

诚然，LLM 的训练数据本质上覆盖整个互联网，但它们并非无所不知。

They know what was on the public internet the day they
were trained, but they don't know anything more recent than that. They don't
know anything that's private to you or your organization. And even things they
do know can easily get tangled up with other things they know.

它们知道训练当日公开互联网上的内容，但不知道更晚的信息；不知道你或组织的私有信息；即使已知内容也易与其他知识纠缠。

For those scenarios, and many others, we often provide an LLM with one or more
tools.

在这些场景及许多其他情况下，我们常向 LLM 提供一个或多个工具。

### Tool defined

### 工具的定义

A tool is a name, a description and a JSON schema for the format of the input
data when the LLM "calls" the tool. For example, if we prompt the LLM to "Reduce
the carbs in Grandma's All America Breakfast recipe", it won't know what
grandma's recipe is unless we give it a "lookupRecipe" tool that takes a query
string we can use to look up the recipe.

工具由名称、描述以及 LLM「调用」工具时输入数据格式的 JSON schema 组成。例如，若我们提示 LLM「减少 Grandma's All America Breakfast 食谱中的碳水」，它不知道奶奶的菜谱是什么，除非我们提供接受查询字符串的 `lookupRecipe` 工具来查找食谱。

Conceptually, a tool is something we give the LLM to call when it needs that
data or service. The way an LLM calls a tool is by responding to the app's
request with a specially formatted message that means "tool call". A tool call
message includes the name and JSON arguments for the tool. The app handles the
tool call and bundles the result in another LLM request, to which the LLM then
responds.

概念上，工具是我们在 LLM 需要该数据或服务时供其调用的东西。LLM 调用工具的方式是：以表示「工具调用」的特殊格式消息响应应用请求；工具调用消息包含工具名称与 JSON 参数。应用处理工具调用，将结果打包进另一条 LLM 请求，LLM 再据此响应。

This can go on for a while.

这可能持续多轮。

An app can configure a model instance with any
number of tools (although the LLM does better with a smaller set of targeted
tools that don't overlap in functionality). The LLM can bundle up any number of
tool calls in its response and can take any number of tool results in a request.
The LLM consolidates multiple round-trips for prompts and tool call results via
a stack of messages that form a history of request/response pairs.

应用可为模型实例配置任意数量的工具（尽管 LLM 在较小、目标明确且功能不重叠的工具集上表现更好）。LLM 可在响应中打包任意数量的工具调用，也可在请求中接收任意数量的工具结果。LLM 通过构成请求/响应对历史的消息栈，整合提示词与工具调用结果的多轮往返。

When it's done with the tool calls, the LLM returns its final response, for
example "Here's a version of Grandma's All American Breakfast recipe that's high
on protein and low on carbs…".

工具调用结束后，LLM 返回最终响应，例如「这是 Grandma's All American Breakfast 食谱的高蛋白低碳水版本……」。

### Gemini functions

### Gemini 函数

In the Firebase AI Logic SDK, a tool is called a "function", but it's the same
thing. In the sample, the clue solver model is configured with a function to
look up word details. If the LLM wants details about a word to help with the
solving process, calling the function provides it with data from [the Free
Dictionary API][dictionary-api]:

在 Firebase AI Logic SDK 中，工具称为「function（函数）」，但含义相同。在示例中，线索求解模型配置了查找单词详情的函数。若 LLM 需要单词详情辅助求解，调用该函数可从 [Free Dictionary API][dictionary-api] 获取数据：

```json
[
  {
    "word": "tool",
    "phonetic": "/tuːl/",
    "phonetics": [
      {
        "text": "/tuːl/",
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/tool-uk.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=94709459",
        "license": {
          "name": "BY-SA 4.0",
          "url": "https://creativecommons.org/licenses/by-sa/4.0"
        }
      }
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "A mechanical device intended to make a task easier.",
            "synonyms": [],
            "antonyms": [],
            "example": "Hand me that tool, would you?   I don't have the right tools to start fiddling around with the engine."
          },
...
```

The app has a Dart function that does the look up:

应用中有执行查找的 Dart 函数：

```dart
// Look up the metadata for a word in the dictionary API.
Future<Map<String, dynamic>> _getWordMetadataFromApi(String word) async {
  final url = Uri.parse(
    'https://api.dictionaryapi.dev/api/v2/entries/en/${Uri.encodeComponent(word)}',
  );

  final response = await http.get(url);
  return response.statusCode == 200
      ? {'result': jsonDecode(response.body)}
      : {'error': 'Could not find a definition for "$word".'};
}
```

The model is configured with the look up function as part of initialization:

模型在初始化时配置了该查找函数：

```dart
// The model for solving clues.
_clueSolverModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-flash',
  systemInstruction: Content.text(clueSolverSystemInstruction),
  tools: [
    Tool.functionDeclarations([
      FunctionDeclaration(
        'getWordMetadata',
        'Gets grammatical metadata for a word, like its part of speech. '
        'Best used to verify a candidate answer against a clue that implies a '
        'grammatical constraint.',
        parameters: {
           'word': Schema(SchemaType.string, description: 'The word to look up.'),
         },
       ),
    ]),
  ],
);
```

For reliability, it's also a good idea to list the tools in the system
instruction:

为可靠起见，在系统指令中列出工具也是好主意：

````dart
static String get clueSolverSystemInstruction =>
    '''
You are an expert crossword puzzle solver.

...

### Tool: `getWordMetadata`

You have a tool to get grammatical information about a word.

**When to use:**
- This tool is most helpful as a verification step after you have a likely answer.
- Consider using this tool when a clue contains a grammatical hint that could be ambiguous.
- **Good candidates for verification:**
  - Clues that seem to be verbs (e.g., "To run," "Waving").
  - Clues that are adverbs (e.g., "Happily," "Quickly").
  - Clues that specify a plural form.
- **Try to avoid using the tool for:**
  - Simple definitions (e.g., "A small dog").
  - Fill-in-the-blank clues (e.g., "___ and flow").
  - Proper nouns (e.g., "Capital of France").

**Function signature:**
```json
${jsonEncode(_getWordMetadataFunction.toJson())}
```
''';
````

When the app makes a request, the model now has a tool to use when it decides
that it will be helpful. To support tool calls, we need to implement an agentic
loop.

应用发起请求时，模型在认为有帮助时可使用该工具。要支持工具调用，需实现智能体循环。

## The Agentic Loop

## 智能体循环

An LLM is functionally stateless, which means that you have to give it all of
the data it needs with every request. For a request that's just the prompt and
any files you want to send along, the Firebase AI Logic SDK exposes the
`generateContent` method on your model instance.

LLM 在功能上是无状态的，意味着每次请求都必须提供其所需的全部数据。若请求仅含提示词及附带文件，Firebase AI Logic SDK 在模型实例上提供 `generateContent` 方法。

However, tool calling requires a history of messages that form the initial
prompt, as well as the response/request pairs that make up tool calls and tool
results. To support this Firebase Logic AI provides a "chat" object to gather
the history. We use it to build the agentic loop:

然而，工具调用需要由初始提示词以及构成工具调用与工具结果的响应/请求对组成的消息历史。为此 Firebase AI Logic 提供用于收集历史的「chat」对象。我们用它构建智能体循环：

- Start a chat to hold the message history across multiple request/response
  pairs  
- Gather the tool results for any tool calls it provides  
- Bundle the tool results into a new request  
- Loop until the model provides a response without tool calls  
- Return the text accumulated across all responses

  启动 chat，在多个请求/响应对之间保存消息历史  
- 收集其提供的任意工具调用的工具结果  
- 将工具结果打包进新请求  
- 循环直到模型返回不含工具调用的响应  
- 返回所有响应累积的文本

Here's that algorithm expressed as an extension method on the `GenerativeModel` class so we can call it just like we call `generateContent`:

以下算法以 `GenerativeModel` 类的扩展方法表达，可像调用 `generateContent` 一样调用：

```dart
extension on GenerativeModel {
  Future<String> generateContentWithFunctions({
    required String prompt,
    required Future<Map<String, dynamic>> Function(FunctionCall) onFunctionCall,
  }) async {
    // Use a chat session to support multiple request/response pairs, which is
    // needed to support function calls.
    final chat = startChat();
    final buffer = StringBuffer();
    var response = await chat.sendMessage(Content.text(prompt));

    while (true) {
      // Append the response text to the buffer.
      buffer.write(response.text ?? '');

      // If no function calls were collected, we're done
      if (response.functionCalls.isEmpty) break;

      // Append a newline to separate responses.
      buffer.write('\n');

      // Execute all function calls
      final functionResponses = <FunctionResponse>[];
      for (final functionCall in response.functionCalls) {
        try {
          functionResponses.add(
            FunctionResponse(
              functionCall.name,
              await onFunctionCall(functionCall),
            ),
          );
        } catch (ex) {
          functionResponses.add(
            FunctionResponse(functionCall.name, {'error': ex.toString()}),
          );
        }
      }

      // Get the next response stream with function results
      response = await chat.sendMessage(
        Content.functionResponses(functionResponses),
      );
    }

    return buffer.toString();
  }
}
```

（扩展方法在存在函数调用时循环执行工具、回传 `FunctionResponse`，直至无函数调用并返回累积文本。）

This method takes a prompt and a callback for handling the specific tool calls,
which the sample calls to handle the word lookup function:

该方法接收提示词与处理具体工具调用的回调；示例用它处理单词查找函数：

```dart
await _clueSolverModel.generateContentWithFunctions(
  prompt: getSolverPrompt(clue, length, pattern),
  onFunctionCall: (functionCall) async => switch (functionCall.name) {
    'getWordMetadata' => await _getWordMetadataFromApi(
      functionCall.args['word'] as String,
    ),
    _ => throw Exception('Unknown function call: ${functionCall.name}'),
  },
);
```

Structured output makes an LLM useful to program against but it's the tools that
turn an LLM into an "agent" (more on this in the Mode of interaction section).

结构化输出使 LLM 便于编程对接，而工具将 LLM 变为「智能体」（详见交互模式一节）。

### Structured output and tool calls

### 结构化输出与工具调用

Combining structured output and tool calls produce a powerful combination. In
the sample, the clue solver has a tool to look up word details. It's also asked
to return JSON that bundles the solution with a confidence score, both of which
are shown in the app's task list:

结合结构化输出与工具调用是强大组合。在示例中，线索求解器有查找单词详情的工具，还被要求返回捆绑解法与置信度的 JSON，二者显示在应用任务列表中：

<img
src="/assets/images/docs/ai-best-practices/app-task-list-showing-crossword-clues-fo.png"
alt="App task list showing crossword clues followed by bold answers and
confidence scores in parentheses">

（上图 alt：应用任务列表——填字线索后接粗体答案与括号内置信度分数。）

Unfortunately, as of this writing, combining structured output and functions
when using the Firebase AI Logic SDK produces an exception:

遗憾的是，截至本文撰写时，在 Firebase AI Logic SDK 中同时启用结构化输出与函数会抛出异常：

```plaintext
Function calling with a response mime type: 'application/json' is unsupported
```

（中文：在使用 response mime type 为 `application/json` 时不支持函数调用。）

As a (hopefully temporary) work-around to this issue, the sample removes the
structured output configuration, instead using a tool called `returnResult` to
simulate structured output:

作为（希望临时的）变通，示例移除结构化输出配置，改用名为 `returnResult` 的工具模拟结构化输出：

```dart
 // The model for solving clues.
_clueSolverModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-flash',
  systemInstruction: Content.text(clueSolverSystemInstruction),
  tools: [
    Tool.functionDeclarations([
      ...,
      FunctionDeclaration(
        'returnResult',
        'Returns the final result of the clue solving process.',
        parameters: {
        'answer': Schema(
          SchemaType.string,
          description: 'The answer to the clue.',
        ),
        'confidence': Schema(
          SchemaType.number,
          description: 'The confidence score in the answer from 0.0 to 1.0.',
          ),
        },
      ),
    ]),
  ],
);
```

The `returnResult` method is also mentioned in the system instruction:

`returnResult` 也在系统指令中说明：

````dart
static String get clueSolverSystemInstruction =>
    '''
You are an expert crossword puzzle solver.

...

### Tool: `returnResult`

You have a tool to return the final result of the clue solving process.

**When to use:**
- Use this tool when you have a final answer and confidence score to return. You
must use this tool exactly once, and only once, to return the final result.

**Function signature:**
```json
${jsonEncode(_returnResultFunction.toJson())}
```
''';
````

When the model calls `returnResult`, the sample caches the result, which the
`solveClue` looks up after calling `generateContentWithFunctions`:

模型调用 `returnResult` 时，示例缓存结果，`solveClue` 在调用 `generateContentWithFunctions` 后读取：

```dart
// Buffer for the result of the clue solving process.
final _returnResult = <String, dynamic>{};

// Cache the return result of the clue solving process via a function call.
// This is how we get JSON responses from the model with functions, since the
// model cannot return JSON directly when tools are used.
Map<String, dynamic> _cacheReturnResult(Map<String, dynamic> returnResult) {
  assert(_returnResult.isEmpty);
  _returnResult.addAll(returnResult);
  return {'status': 'success'};
}

Future<ClueAnswer?> solveClue(Clue clue, int length, String pattern) async {
  // Clear the return result cache; this is where the result will be stored.
  _returnResult.clear();

  // Generate JSON response with functions and schema.
  await _clueSolverModel.generateContentWithFunctions(
    prompt: getSolverPrompt(clue, length, pattern),
    onFunctionCall: (functionCall) async => switch (functionCall.name) {
      'getWordMetadata' => ...,
      'returnResult' => _cacheReturnResult(functionCall.args),
      _ => throw Exception('Unknown function call: ${functionCall.name}'),
    },
  );

  // Use the structured output that the LLM has called function with
  assert(_returnResult.isNotEmpty);
  return ClueAnswer(
    answer: _returnResult['answer'] as String,
    confidence: (_returnResult['confidence'] as num).toDouble(),
  );
}
```

（通过 `returnResult` 工具调用缓存 JSON 结果，再构造 `ClueAnswer`。）

We have to work a little harder to get the combo of structured output and tool
calls using Firebase AI Logic, but the results are worth it!

用 Firebase AI Logic 同时获得结构化输出与工具调用需要多费些功夫，但结果值得。

### Human in the loop

### 人在回路

So far, we've seen tools used for gathering data and formatting output. We can
also use them to get a human involved.

到目前为止，工具用于收集数据与格式化输出。也可用它让人类参与。

As an example, sometimes when the sample will pass in a pattern the solution
should take – like "_R_Y" – the model wants to suggest an answer that doesn't
fit this pattern – like "RENT". A conflict like this is a good time to ask for
help from the user:  
<img
src="/assets/images/docs/ai-best-practices/crossword-companion-app-displaying-a-con.png"
alt="Crossword Companion app displaying a Conflict Detected dialog asking for
user input to resolve a clue pattern">  

例如，示例有时传入解法应匹配的模式（如 "_R_Y"），模型却想建议不匹配的模式（如 "RENT"）。此类冲突适合向用户求助：  
（上图 alt：Crossword Companion 应用显示冲突检测对话框，请求用户输入以解决线索模式。）

This is called putting the "human in the loop" and it's yet another way for
humans and LLMs to collaborate. Flutter and the Firebase AI Logic SDK make this
easy to do. First, the sample defines a function and configures the model:

这称为「人在回路（human in the loop）」，是人类与 LLM 协作的又一方式。Flutter 与 Firebase AI Logic SDK 使其实现简单。首先，示例定义函数并配置模型：

````dart

// The new function to let the LLM resolve solution conflicts
static final _resolveConflictFunction = FunctionDeclaration(
  'resolveConflict',
  'Asks the user to resolve a conflict between the letter pattern and the '
  'proposed answer. Use this BEFORE calling returnResult if the answer you '
  'want to propose does not match the letter pattern.',
  parameters: {
    'proposedAnswer': Schema(
      SchemaType.string,
      description: 'The answer the LLM wants to suggest.',
    ),
    'pattern': Schema(
      SchemaType.string,
      description: 'The current letter pattern from the grid.',
    ),
    'clue': Schema(SchemaType.string, description: 'The clue text.'),
  },
);

// Pass the new tool to the model for solving clues.
final _clueSolverModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-flash',
  systemInstruction: Content.text(clueSolverSystemInstruction),
  tools: [
    Tool.functionDeclarations([
      ...
      _resolveConflictFunction,
    ]),
  ],
);
// Let the LLM know that it has a new tool.
static String get clueSolverSystemInstruction =>
    '''
You are an expert crossword puzzle solver.

...

### Tool: `resolveConflict`

You have a tool to ask the user to resolve a conflict.

**When to use:**
- Use this tool **BEFORE** `returnResult` if your proposed answer conflicts with the provided letter pattern.
- For example, if the pattern is `_ R _ Y` and you want to suggest `RENT` (which fits the clue), there is a conflict at the second letter (`R` vs `E`). You should call `resolveConflict(proposedAnswer: "RENT", pattern: "_ R _ Y", clue: "...")`.
- The tool will return the user's decision (either your proposed answer or a new one). You should then use that result to call `returnResult`.

**Function signature:**
```json
${jsonEncode(_resolveConflictFunction.toJson())}
```
''';
````

Now when the model sees a conflict, it will call the tool:

模型发现冲突时会调用该工具：

```dart
// handle the LLM's request to resolve the conflict
await _clueSolverModel.generateContentWithFunctions(
  prompt: getSolverPrompt(clue, length, pattern),
  onFunctionCall: (functionCall) async => switch (functionCall.name) {
    ...
    'resolveConflict' => await _handleResolveConflict(
      functionCall.args,
      onConflict,
    ),
  },
);

// Show the dialog to gather the user's input
Future<Map<String, dynamic>> _handleResolveConflict(
  Map<String, dynamic> args,
  Future<String> Function(String clue, String proposedAnswer, String pattern)?
  onConflict,
) async {
  final proposedAnswer = args['proposedAnswer'] as String;
  final pattern = args['pattern'] as String;
  final clue = args['clue'] as String;

  if (onConflict != null) {
    final result = await onConflict(clue, proposedAnswer, pattern);
    return {'result': result};
  }

  return {'result': proposedAnswer};
}
```

The sample handles the tool with an implementation of the `onConflict` method
that calls `showDialog` to gather data from the user. This all happens in the
middle of the agentic loop, but that's OK – the model is not waiting; it's
already sent back its response to the app's initial request. The user can take
their time with the UI while the sample waits on the `Future` returned
`showDialog`. When they're done, the model continues where it left off using the
message history and the most recent request, which in this case happens to be
data gathered interactively from the user.

示例通过 `onConflict` 实现处理该工具，调用 `showDialog` 收集用户数据。这一切发生在智能体循环中间，但没问题——模型并未等待；它已向应用的初始请求返回响应。用户可慢慢操作 UI，示例等待 `showDialog` 返回的 `Future`。完成后，模型借助消息历史与最近请求（此处为与用户交互收集的数据）从断点继续。

A modal dialog box is a simple way to put the human in the loop but is not the
only way in Flutter to do so. If you'd prefer, an instance of [a
`Completer`][completer] lets you set some state in your app that puts it into
"gathering data from the user" mode. When the app has the data, it can call
`complete` on the `Completer` and resume the agentic loop.

模态对话框是人在回路的简单方式，但不是 Flutter 的唯一方式。若你愿意，[ `Completer` ][completer] 实例可让应用进入「向用户收集数据」模式；有数据后对 `Completer` 调用 `complete` 并恢复智能体循环。

Or, since you own the agentic loop, you can check for a call to a "special"
function that indicates that you need to gather data from the user. This kind of
special function is sometimes called an "interrupt" and you "resume" the
conversation with the model when you have the data from the user.

或者，既然你拥有智能体循环，可检查对「特殊」函数的调用——表示需向用户收集数据。此类特殊函数有时称为「interrupt（中断）」，获得用户数据后你「resume（恢复）」与模型的对话。

Remember that the LLM is stateless. It's not waiting on you, so you can handle
the agentic loop in whatever way makes the most sense for your app. You can come
back to the LLM with an updated message history and a new prompt at any time,
whether it's been a minute or in a month.

请记住 LLM 是无状态的。它不会等你，因此可按最适合应用的方式处理智能体循环。你可随时带着更新的消息历史与新提示词回到 LLM，无论间隔一分钟还是一个月。



[dictionary-api]: https://dictionaryapi.dev/
[completer]: {{site.api}}/flutter/dart-async/Completer-class.html
