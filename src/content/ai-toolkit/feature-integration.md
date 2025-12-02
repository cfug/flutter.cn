---
title: 功能集成
description: >
  How to integrate with other Flutter features.
prev:
  title: User experience
  path: /ai-toolkit/user-experience
next:
  title: Custom LLM providers
  path: /ai-toolkit/custom-llm-providers
---

除了 [`LlmChatView`][] 自动提供的功能外，
还有许多集成点可让你的应用与其他功能无缝融合，
提供额外的功能：

* **欢迎消息**：向用户显示初始问候语。
* **建议提示词**：为用户提供预定义的提示词来引导交互。
* **系统指令**：为 LLM 提供特定输入以影响其响应。
* **禁用附件和音频输入**：移除聊天 UI 的可选部分。
* **管理取消或错误行为**：更改用户取消或 LLM 错误的行为。
* **管理历史记录**：每个 LLM provider 都允许管理聊天历史，
  这对于清除历史、动态更改历史以及在会话之间存储历史非常有用。
* **聊天序列化/反序列化**：在应用会话之间存储和检索对话。
* **自定义响应 widget**：引入专门的 UI 组件来展示 LLM 响应。
* **自定义样式**：定义独特的视觉样式以匹配聊天外观与整体应用。
* **无 UI 聊天**：直接与 LLM provider 交互，不影响用户当前的聊天会话。
* **自定义 LLM provider**：构建你自己的 LLM provider，
  以便将聊天与你自己的模型后端集成。
* **重路由提示词**：调试、记录或重路由发送给 provider 的消息，
  以追踪问题或动态路由提示词。

[`LlmChatView`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## 欢迎消息

聊天视图允许你提供自定义欢迎消息来为用户设置上下文：

![欢迎消息示例](/assets/images/docs/ai-toolkit/example-of-welcome-message.png)

你可以通过设置 `welcomeMessage` 参数来使用欢迎消息初始化 `LlmChatView`：

```dart
class ChatPage extends StatelessWidget {
 const ChatPage({super.key});

 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: const Text(App.title)),
       body: LlmChatView(
         welcomeMessage: 'Hello and welcome to the Flutter AI Toolkit!',
         provider: GeminiProvider(
           model: GenerativeModel(
             model: 'gemini-2.0-flash',
             apiKey: geminiApiKey,
           ),
         ),
       ),
     );
}
```

有关设置欢迎消息的完整示例，请查看 [welcome 示例][welcome example]。

[welcome example]: {{site.github}}/flutter/ai/blob/main/example/lib/welcome/welcome.dart

## 建议提示词

你可以提供一组建议提示词，让用户了解聊天会话针对什么进行了优化：

![建议提示词示例](/assets/images/docs/ai-toolkit/example-of-suggested-prompts.png)

建议仅在没有现有聊天历史时显示。
点击其中一个会将文本复制到用户的提示词编辑区域。
要设置建议列表，请使用 `suggestions` 参数构造 `LlmChatView`：

```dart
class ChatPage extends StatelessWidget {
 const ChatPage({super.key});

 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: const Text(App.title)),
       body: LlmChatView(
         suggestions: [
           'I\'m a Star Wars fan. What should I wear for Halloween?',
           'I\'m allergic to peanuts. What candy should I avoid at Halloween?',
           'What\'s the difference between a pumpkin and a squash?',
         ],
         provider: GeminiProvider(
           model: GenerativeModel(
             model: 'gemini-2.0-flash',
             apiKey: geminiApiKey,
           ),
         ),
       ),
     );
}
```

有关为用户设置建议的完整示例，请查看 [suggestions 示例][suggestions example]。

[suggestions example]: {{site.github}}/flutter/ai/blob/main/example/lib/suggestions/suggestions.dart

## LLM 指令

要根据应用的需求优化 LLM 的响应，你需要给它指令。
例如，[recipes 示例应用][recipes example app]使用
`GenerativeModel` 类的 `systemInstructions` 参数
来定制 LLM，使其专注于根据用户的指令提供食谱：

```dart
class _HomePageState extends State<HomePage> {
  ...
  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) => GeminiProvider(
      history: history,
        ...,
        model: GenerativeModel(
          model: 'gemini-2.0-flash',
          apiKey: geminiApiKey,
          ...,
          systemInstruction: Content.system('''
You are a helpful assistant that generates recipes based on the ingredients and
instructions provided as well as my food preferences, which are as follows:
${Settings.foodPreferences.isEmpty ? 'I don\'t have any food preferences' : Settings.foodPreferences}

You should keep things casual and friendly. You may generate multiple recipes in a single response, but only if asked. ...
''',
          ),
        ),
      );
  ...
}
```

设置系统指令对每个 provider 是独特的；
`GeminiProvider` 和 `VertexProvider`
都允许你通过 `systemInstruction` 参数提供它们。

请注意，在这种情况下，我们将用户偏好作为传递给
`LlmChatView` 构造函数的 LLM provider 创建过程的一部分。
每次用户更改其偏好时，我们都会在创建过程中设置指令。
recipes 应用允许用户使用 scaffold 上的抽屉来更改他们的食物偏好：

![优化提示词的示例](/assets/images/docs/ai-toolkit/setting-food-preferences.png)

每当用户更改他们的食物偏好时，
recipes 应用会创建一个新模型来使用新的偏好：

```dart
class _HomePageState extends State<HomePage> {
  ...
  void _onSettingsSave() => setState(() {
        // move the history over from the old provider to the new one
        final history = _provider.history.toList();
        _provider = _createProvider(history);
      });
}
```

## 禁用附件和音频输入

如果你想禁用附件（**+** 按钮）或音频输入（麦克风按钮），
可以使用 `LlmChatView` 构造函数的 `enableAttachments` 和 `enableVoiceNotes` 参数：

```dart
class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    // ...

    return Scaffold(
      appBar: AppBar(title: const Text('Restricted Chat')),
      body: LlmChatView(
        // ...
        enableAttachments: false,
        enableVoiceNotes: false,
      ),
    );
  }
}
```

这两个标志默认为 `true`。

## 管理取消或错误行为

默认情况下，当用户取消 LLM 请求时，LLM 的响应会附加字符串 "CANCEL"，
并弹出消息提示用户已取消请求。
同样，当发生 LLM 错误（如网络连接断开）时，
LLM 的响应会附加字符串 "ERROR"，并弹出警告对话框显示错误详情。

你可以使用 `LlmChatView` 的 `cancelMessage`、`errorMessage`、
`onCancelCallback` 和 `onErrorCallback` 参数来覆盖取消和错误行为。
例如，以下代码替换了默认的取消处理行为：

```dart
class ChatPage extends StatelessWidget {
  // ...

  void _onCancel(BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Chat cancelled')));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text(App.title)),
    body: LlmChatView(
      // ...
      onCancelCallback: _onCancel,
      cancelMessage: 'Request cancelled',
    ),
  );
}
```

你可以覆盖这些参数中的任何一个或全部，
`LlmChatView` 将为你未覆盖的内容使用默认值。

## 管理历史记录

[定义所有可以接入聊天视图的 LLM provider 的标准接口][providerIF]
包括获取和设置 provider 历史记录的能力：

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(
    String prompt, {
    Iterable<Attachment> attachments,
  });

  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments,
  });

  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

[providerIF]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

当 provider 的历史记录发生变化时，
它会调用 `Listenable` 基类暴露的 `notifyListener` 方法。
这意味着你可以使用 `add` 和 `remove` 方法手动订阅/取消订阅，
或使用它来构造 `ListenableBuilder` 类的实例。

`generateStream` 方法调用底层 LLM 而不影响历史记录。
调用 `sendMessageStream` 方法会在响应完成时
向 provider 的历史记录添加两条新消息来更改历史记录——
一条是用户消息，一条是 LLM 响应。
聊天视图在处理用户的聊天提示词时使用 `sendMessageStream`，
在处理用户的语音输入时使用 `generateStream`。

要查看或设置历史记录，你可以访问 `history` 属性：

```dart
void _clearHistory() => _provider.history = [];
```

访问 provider 历史记录的能力在重新创建 provider 同时保持历史记录时也很有用：

```dart
class _HomePageState extends State<HomePage> {
  ...
  void _onSettingsSave() => setState(() {
        // move the history over from the old provider to the new one
        final history = _provider.history.toList();
        _provider = _createProvider(history);
      });
}
```

`_createProvider` 方法使用前一个 provider 的历史记录_和_新的用户偏好创建一个新的 provider。
对用户来说这是无缝的；他们可以继续聊天，
但现在 LLM 会根据他们的新食物偏好给出响应。
例如：


```dart
class _HomePageState extends State<HomePage> {
  ...
  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) =>
    GeminiProvider(
      history: history,
      ...
    );
  ...
}
```

要查看历史记录的实际应用，
请查看 [recipes 示例应用][recipes example app]和 [history 示例应用][history example app]。

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart
[recipes example app]: {{site.github}}/flutter/ai/tree/main/example/lib/recipes

## 聊天序列化/反序列化

要在应用会话之间保存和恢复聊天历史，
需要能够序列化和反序列化每个用户提示词（包括附件）和每个 LLM 响应。
这两种消息（用户提示词和 LLM 响应）
都在 `ChatMessage` 类中公开。
可以使用每个 `ChatMessage` 实例的 `toJson` 方法来实现序列化。

```dart
Future<void> _saveHistory() async {
  // get the latest history
  final history = _provider.history.toList();

  // write the new messages
  for (var i = 0; i != history.length; ++i) {
    // skip if the file already exists
    final file = await _messageFile(i);
    if (file.existsSync()) continue;

    // write the new message to disk
    final map = history[i].toJson();
    final json = JsonEncoder.withIndent('  ').convert(map);
    await file.writeAsString(json);
  }
}
```

同样，要反序列化，请使用 `ChatMessage` 类的静态 `fromJson` 方法：

```dart
Future<void> _loadHistory() async {
  // read the history from disk
  final history = <ChatMessage>[];
  for (var i = 0;; ++i) {
    final file = await _messageFile(i);
    if (!file.existsSync()) break;

    final map = jsonDecode(await file.readAsString());
    history.add(ChatMessage.fromJson(map));
  }

  // set the history on the controller
  _provider.history = history;
}
```

为确保序列化时的快速响应，我们建议每个用户消息只写入一次。
否则，用户必须等待你的应用每次都写入所有消息，
而在处理二进制附件时，这可能需要一段时间。

要查看实际应用，请查看 [history 示例应用][history example app]。

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart

## 自定义响应 widget

默认情况下，聊天视图显示的 LLM 响应是格式化的 Markdown。
但在某些情况下，你想创建一个自定义 widget 来显示特定于你应用并与之集成的 LLM 响应。
例如，当用户在 [recipes 示例应用][recipes example app]中请求食谱时，
LLM 响应被用于创建一个特定于显示食谱的 widget，
就像应用的其他部分一样，并提供一个**添加**按钮，
以便用户可以将食谱添加到他们的数据库中：

![添加食谱按钮](/assets/images/docs/ai-toolkit/add-recipe-button.png)

这是通过设置 `LlmChatView` 构造函数的 `responseBuilder` 参数来实现的：

```dart
LlmChatView(
  provider: _provider,
  welcomeMessage: _welcomeMessage,
  responseBuilder: (context, response) => RecipeResponseView(
    response,
  ),
),
```

在这个特定的示例中，`RecipeResponseView` widget
使用 LLM provider 的响应文本构造，并使用它来实现其 `build` 方法：

```dart
class RecipeResponseView extends StatelessWidget {
  const RecipeResponseView(this.response, {super.key});
  final String response;

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[];
    String? finalText;

    // created with the response from the LLM as the response streams in, so
    // many not be a complete response yet
    try {
      final map = jsonDecode(response);
      final recipesWithText = map['recipes'] as List<dynamic>;
      finalText = map['text'] as String?;

      for (final recipeWithText in recipesWithText) {
        // extract the text before the recipe
        final text = recipeWithText['text'] as String?;
        if (text != null && text.isNotEmpty) {
          children.add(MarkdownBody(data: text));
        }

        // extract the recipe
        final json = recipeWithText['recipe'] as Map<String, dynamic>;
        final recipe = Recipe.fromJson(json);
        children.add(const Gap(16));
        children.add(Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(recipe.title, style: Theme.of(context).textTheme.titleLarge),
            Text(recipe.description),
            RecipeContentView(recipe: recipe),
          ],
        ));

        // add a button to add the recipe to the list
        children.add(const Gap(16));
        children.add(OutlinedButton(
          onPressed: () => RecipeRepository.addNewRecipe(recipe),
          child: const Text('Add Recipe'),
        ));
        children.add(const Gap(16));
      }
    } catch (e) {
      debugPrint('Error parsing response: $e');
    }

    ...

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: children,
    );
  }
}
```

这段代码解析文本以从 LLM 中提取介绍文本和食谱，
将它们与**添加食谱**按钮捆绑在一起显示，以替代 Markdown。

请注意，我们将 LLM 响应解析为 JSON。
通常会将 provider 设置为 JSON 模式，
并提供 schema 来限制其响应的格式，以确保我们得到可以解析的内容。
每个 provider 以自己的方式暴露此功能，
但 `GeminiProvider` 和 `VertexProvider` 类都通过 `GenerationConfig` 对象启用此功能，
recipes 示例使用如下：

```dart
class _HomePageState extends State<HomePage> {
  ...

  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) => GeminiProvider(
        ...
        model: GenerativeModel(
          ...
          generationConfig: GenerationConfig(
            responseMimeType: 'application/json',
            responseSchema: Schema(...),
          systemInstruction: Content.system('''
...
Generate each response in JSON format
with the following schema, including one or more "text" and "recipe" pairs as
well as any trailing text commentary you care to provide:

{
  "recipes": [
    {
      "text": "Any commentary you care to provide about the recipe.",
      "recipe":
      {
        "title": "Recipe Title",
        "description": "Recipe Description",
        "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        "instructions": ["Instruction 1", "Instruction 2", "Instruction 3"]
      }
    }
  ],
  "text": "any final commentary you care to provide",
}
''',
          ),
        ),
      );
  ...
}
```

这段代码通过将 `responseMimeType` 参数设置为 `'application/json'`
并将 `responseSchema` 参数设置为定义你准备解析的 JSON 结构的 `Schema` 类实例
来初始化 `GenerationConfig` 对象。
此外，在系统指令中请求 JSON 并提供该 JSON schema 的描述也是一种好做法，
我们在这里就是这样做的。

要查看实际应用，请查看 [recipes 示例应用][recipes example app]。

## 自定义样式

聊天视图开箱即用，提供了一组默认样式，
包括背景、文本字段、按钮、图标、建议等。
你可以通过使用 `LlmChatView` 构造函数的 `style` 参数
设置你自己的样式来完全自定义这些样式：

```dart
LlmChatView(
  provider: GeminiProvider(...),
  style: LlmChatViewStyle(...),
),
```

例如，[custom styles 示例应用][custom-ex]
使用此功能实现了一个万圣节主题的应用：

![万圣节主题演示应用](/assets/images/docs/ai-toolkit/demo-app.png)

有关 `LlmChatViewStyle` 类中可用样式的完整列表，
请查看[参考文档][reference documentation]。
要查看自定义样式的实际应用，
除了 [custom styles 示例][custom-ex]外，
还可以查看 [dark mode 示例][dark mode example]和[演示应用][demo app]。

[custom-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/custom_styles/custom_styles.dart
[dark mode example]: {{site.github}}/flutter/ai/blob/main/example/lib/dark_mode/dark_mode.dart
[demo app]: {{site.github}}/flutter/ai#online-demo
[reference documentation]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatViewStyle-class.html

## 无 UI 聊天

你不必使用聊天视图来访问底层 provider 的功能。
除了能够简单地使用它提供的任何专有接口调用它之外，
你还可以使用 [LlmProvider 接口][LlmProvider interface]。

[LlmProvider interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

例如，recipes 示例应用在编辑食谱的页面上提供了一个魔法按钮。
该按钮的目的是使用你当前的食物偏好更新数据库中的现有食谱。
按下按钮可以让你预览推荐的更改，并决定是否要应用它们：

![用户决定是否更新数据库中的食谱](/assets/images/docs/ai-toolkit/apply-changes-decision.png)

Edit Recipe 页面不是使用应用聊天部分使用的同一个 provider
（这会将多余的用户消息和 LLM 响应插入用户的聊天历史中），
而是创建自己的 provider 并直接使用它：

```dart
class _EditRecipePageState extends State<EditRecipePage> {
  ...
  final _provider = GeminiProvider(...);
  ...
  Future<void> _onMagic() async {
    final stream = _provider.sendMessageStream(
      'Generate a modified version of this recipe based on my food preferences: '
      '${_ingredientsController.text}\n\n${_instructionsController.text}',
    );
    var response = await stream.join();
    final json = jsonDecode(response);

    try {
      final modifications = json['modifications'];
      final recipe = Recipe.fromJson(json['recipe']);

      if (!context.mounted) return;
      final accept = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          title: Text(recipe.title),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Modifications:'),
              const Gap(16),
              Text(_wrapText(modifications)),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => context.pop(true),
              child: const Text('Accept'),
            ),
            TextButton(
              onPressed: () => context.pop(false),
              child: const Text('Reject'),
            ),
          ],
        ),
      );
      ...
    } catch (ex) {
      ...
      }
    }
  }
}
```

对 `sendMessageStream` 的调用会在 provider 的历史记录中创建条目，
但由于它没有与聊天视图关联，因此不会显示。
如果方便的话，你也可以通过调用 `generateStream` 来实现同样的目的，
这允许你重用现有的 provider 而不影响聊天历史。

要查看实际应用，
请查看 recipes 示例的 [Edit Recipe 页面][Edit Recipe page]。

[Edit Recipe page]: {{site.github}}/flutter/ai/blob/main/example/lib/recipes/pages/edit_recipe_page.dart

## 重路由提示词

如果你想调试、记录或操作聊天视图与底层 provider 之间的连接，
可以通过实现 [`LlmStreamGenerator`][] 函数来完成。
然后将该函数通过 `messageSender` 参数传递给 `LlmChatView`：

[`LlmStreamGenerator`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmStreamGenerator.html

```dart
class ChatPage extends StatelessWidget {
  final _provider = GeminiProvider(...);

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(title: const Text(App.title)),
      body: LlmChatView(
        provider: _provider,
        messageSender: _logMessage,
      ),
    );

  Stream<String> _logMessage(
    String prompt, {
    required Iterable<Attachment> attachments,
  }) async* {
    // log the message and attachments
    debugPrint('# Sending Message');
    debugPrint('## Prompt\n$prompt');
    debugPrint('## Attachments\n${attachments.map((a) => a.toString())}');

    // forward the message on to the provider
    final response = _provider.sendMessageStream(
      prompt,
      attachments: attachments,
    );

    // log the response
    final text = await response.join();
    debugPrint('## Response\n$text');

    // return it
    yield text;
  }
}
```

这个示例记录了来回传递的用户提示词和 LLM 响应。
当提供函数作为 `messageSender` 时，调用底层 provider 是你的责任。
如果你不调用，它就不会收到消息。
此功能允许你执行高级操作，如动态路由到 provider 或检索增强生成 (RAG)。

要查看实际应用，请查看 [logging 示例应用][logging example app]。

[logging example app]: {{site.github}}/flutter/ai/blob/main/example/lib/logging/logging.dart
