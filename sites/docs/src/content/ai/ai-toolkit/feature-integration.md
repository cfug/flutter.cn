---
# title: Feature integration
title: 功能集成
# sidenav: ai
sidenav: ai
# description: >
#   How to integrate with other Flutter features.
description: >
  如何与其他 Flutter 功能集成。
# prev:
#   title: User experience
#   path: /ai/ai-toolkit/user-experience
# next:
#   title: Custom LLM providers
#   path: /ai/ai-toolkit/custom-llm-providers
prev:
  title: 用户体验
  path: /ai/ai-toolkit/user-experience
next:
  title: 自定义 LLM 提供商
  path: /ai/ai-toolkit/custom-llm-providers
ai-translated: true
---

In addition to the features that are provided automatically by the
[`LlmChatView`][], a number of integration points allow your app to blend
seamlessly with other features to provide additional functionality:

除 [`LlmChatView`][] 自动提供的功能外，多个集成点可让应用与其他功能无缝融合以提供额外能力：

* **Welcome messages**: Display an initial greeting to users.

  **欢迎消息**：向用户显示初始问候。

* **Suggested prompts**: Offer users predefined prompts to guide interactions.

  **建议提示词**：提供预定义提示词引导交互。

* **System instructions**: Provide the LLM with specific input to influence its
  responses.

  **系统指令**：向 LLM 提供特定输入以影响其回复。

* **Disable attachments and audio input**: Remove optional parts of the chat UI.

  **禁用附件与音频输入**：移除聊天 UI 的可选部分。

* **Manage cancel or error behavior**: Change the user cancellation or LLM error
  behavior.

  **管理取消或错误行为**：更改用户取消或 LLM 错误时的行为。

* **Manage history**: Every LLM provider allows for managing chat history, which
  is useful for clearing it, changing it dynamically and storing it between
  sessions.

  **管理历史**：各 LLM 提供商均支持管理聊天历史，便于清空、动态更改及在会话间存储。

* **Chat serialization/deserialization**: Store and retrieve conversations
  between app sessions.

  **聊天序列化/反序列化**：在应用会话间存储与恢复对话。

* **Custom response widgets**: Introduce specialized UI components to present
  LLM responses.

  **自定义响应 widget**：引入专用 UI 组件展示 LLM 回复。

* **Custom styling**: Define unique visual styles to match the chat appearance
  to the overall app.

  **自定义样式**：定义独特视觉样式使聊天外观与整体应用一致。

* **Chat without UI**: Interact directly with the LLM providers without
  affecting the user's current chat session.

  **无 UI 聊天**：直接与 LLM 提供商交互而不影响用户当前聊天会话。

* **Custom LLM providers**: Build your own LLM provider for integration of chat
  with your own model backend.

  **自定义 LLM 提供商**：构建自有 LLM 提供商以将聊天与你自己的模型后端集成。

* **Rerouting prompts**: Debug, log, or reroute messages meant for the provider
  to track down issues or route prompts dynamically.

  **重路由提示词**：调试、记录或重路由发往提供商的消息以排查问题或动态路由提示词。

[`LlmChatView`]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## Welcome messages

## 欢迎消息

The chat view allows you to provide a custom welcome message to set context for
the user:

聊天视图允许你提供自定义欢迎消息以为用户设定上下文：

![Example welcome
message](/assets/images/docs/ai-toolkit/example-of-welcome-message.png)

You can initialize the `LlmChatView` with a welcome message by setting the
`welcomeMessage` parameter:

可通过设置 `welcomeMessage` 参数为 `LlmChatView` 初始化欢迎消息：

```dart
class ChatPage extends StatelessWidget {
 const ChatPage({super.key});

 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: const Text(App.title)),
       body: LlmChatView(
         welcomeMessage: 'Hello and welcome to the Flutter AI Toolkit!',
         provider: FirebaseProvider(
          model: FirebaseAI.geminiAI().generativeModel(
             model: 'gemini-2.5-flash',
           ),
         ),
       ),
     );
}
```

To see a complete example of setting the welcome message, check out the [welcome
example][].

完整示例请参阅 [welcome 示例][welcome example]。

[welcome example]:
    {{site.github}}/flutter/ai/blob/main/example/lib/welcome/welcome.dart

## Suggested prompts

## 建议提示词

You can provide a set of suggested prompts to give the user some idea of what
the chat session has been optimized for:

你可提供一组建议提示词，让用户了解聊天会话的优化方向：

![Example suggested
prompts](/assets/images/docs/ai-toolkit/example-of-suggested-prompts.png)

The suggestions are only shown when there is no existing chat history. Clicking
one sends it immediately as a request to the underlying LLM. To set the list of
 suggestions, construct the `LlmChatView` with the `suggestions` parameter:

建议仅在无现有聊天历史时显示。点按某条会立即作为请求发送给底层 LLM。
要设置建议列表，构造 `LlmChatView` 时传入 `suggestions` 参数：

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
         provider: FirebaseProvider(
          model: FirebaseAI.geminiAI().generativeModel(
             model: 'gemini-2.5-flash',
           ),
         ),
       ),
     );
}
```

To see a complete example of setting up suggestions for the user, take a look at
the [suggestions example][].

完整示例请参阅 [suggestions 示例][suggestions example]。

[suggestions example]:
    {{site.github}}/flutter/ai/blob/main/example/lib/suggestions/suggestions.dart

## LLM instructions

## LLM 指令

To optimize an LLM's responses based on the needs of your app, you'll want to
give it instructions. For example, the [recipes example app][] uses the
`systemInstructions` parameter of the `GenerativeModel` class to tailor the LLM
to focus on delivering recipes based on the user's instructions:

要根据应用需求优化 LLM 回复，需要为其提供指令。
例如，[recipes 示例应用][recipes example app] 使用 `GenerativeModel` 类的 `systemInstructions` 参数，
使 LLM 专注于根据用户指令提供食谱：

```dart
class _HomePageState extends State<HomePage> {
  ...
  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) => FirebaseProvider(
      history: history,
        ...,
        model: FirebaseAI.geminiAI().generativeModel(
          model: 'gemini-2.5-flash',
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

Setting system instructions is unique to each provider; the `FirebaseProvider`
allows you to provide them through the `systemInstruction` parameter.

设置系统指令因提供商而异；`FirebaseProvider` 可通过 `systemInstruction` 参数提供。

Notice that, in this case, we're bringing in user preferences as part of the
creation of the LLM provider passed to the `LlmChatView` constructor. We set the
instructions as part of the creation process each time the user changes their
preferences. The recipes app allows the user to change their food preferences
using a drawer on the scaffold:

注意此处我们在创建传给 `LlmChatView` 构造函数的 LLM 提供商时纳入用户偏好。
每次用户更改偏好时，我们在创建过程中设置指令。
recipes 应用允许用户通过 scaffold 上的 drawer 更改食物偏好：

![Example of refining
prompt](/assets/images/docs/ai-toolkit/setting-food-preferences.png)

Whenever the user changes their food preferences, the recipes app creates a new
model to use the new preferences:

每当用户更改食物偏好，recipes 应用会创建使用新偏好的新模型：

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

## Function calling

## 函数调用

To enable the LLM to perform actions on behalf of the user, you can provide a
set of tools (functions) that the LLM can call. The `FirebaseProvider` supports
function calling out of the box. It handles the loop of sending the user's
prompt, receiving a function call request from the LLM, executing the function,
and sending the result back to the LLM until a final text response is generated.

要让 LLM 代表用户执行操作，可提供 LLM 可调用的工具（函数）集。
`FirebaseProvider` 开箱支持函数调用，处理循环：发送用户提示词、
接收 LLM 的函数调用请求、执行函数并将结果返回 LLM，直至生成最终文本回复。

To use function calling, you need to define your tools and pass them to the
`FirebaseProvider`. Check out the [function calling example][] for details.

使用函数调用需定义工具并传给 `FirebaseProvider`。
详情请参阅 [function calling 示例][function calling example]。

[function calling example]:
    {{site.github}}/flutter/ai/blob/main/example/lib/function_calls/function_calls.dart

## Disable attachments and audio input

## 禁用附件与音频输入

If you'd like to disable attachments (the **+** button) or audio input (the mic
button), you can do so with the `enableAttachments` and `enableVoiceNotes`
parameters to the `LlmChatView` constructor:

若要禁用附件（**+** 按钮）或音频输入（麦克风按钮），
可在 `LlmChatView` 构造函数中使用 `enableAttachments` 与 `enableVoiceNotes` 参数：

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

Both of these flags default to `true`.

这两个标志默认为 `true`。

## Custom speech-to-text

## 自定义语音转文字

By default, the AI Toolkit uses the `LlmProvider` to pass to the `LlmChatView`
to provide the speech-to-text implementation. If you'd like to provide your own
implementation, for example to use a device-specific service, you can do so by
implementing the `SpeechToText` interface and passing it to the `LlmChatView`
constructor:

默认情况下，AI 工具包通过传给 `LlmChatView` 的 `LlmProvider` 提供语音转文字实现。
若要提供自有实现（例如使用设备特定服务），
可实现 `SpeechToText` 接口并传给 `LlmChatView` 构造函数：

```dart
LlmChatView(
  // ...
  speechToText: MyCustomSpeechToText(),
)
```

Check out the [custom STT example][] for details.

详情请参阅 [custom STT 示例][custom STT example]。

[custom STT example]:
    {{site.github}}/flutter/ai/tree/main/example/lib/custom_stt

## Manage cancel or error behavior

## 管理取消或错误行为

By default, when the user cancels an LLM request, the LLM's response will be
appended with the string "CANCEL" and a message will pop up that the user has
canceled the request. Likewise, in the event of an LLM error, like a dropped
network connection, the LLM's response will be appended with the string "ERROR"
and an alert dialog will pop up with the details of the error.

默认情况下，用户取消 LLM 请求时，LLM 回复会追加 "CANCEL" 字符串并弹出已取消消息。
同样，发生 LLM 错误（如网络断开）时，回复会追加 "ERROR" 并弹出含错误详情的对话框。

You can override the cancel and error behavior with the `cancelMessage`,
`errorMessage`, `onCancelCallback` and `onErrorCallback` parameters of the
`LlmChatView`. For example, the following code replaces the default cancellation
handling behavior:

可通过 `LlmChatView` 的 `cancelMessage`、`errorMessage`、`onCancelCallback` 与 `onErrorCallback` 参数覆盖取消与错误行为。
例如以下代码替换默认取消处理：

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

You can override any or all of these parameters and the `LlmChatView` will use
its defaults for anything you don't override.

你可覆盖其中任意或全部参数；未覆盖的项将使用 `LlmChatView` 默认值。

## Manage history

## 管理历史

The [standard interface that defines all LLM providers][providerIF] that can
plug into the chat view includes the ability to get and set history for the
provider:

[定义所有可接入聊天视图的 LLM 提供商的标准接口][providerIF] 包含获取与设置提供商历史的能力：

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

[providerIF]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

When the history for a provider changes, it calls the `notifyListener` method
exposed by the `Listenable` base class. This means that you manually
subscribe/unsubscribe with the `add` and `remove` methods or use it to construct
an instance of the `ListenableBuilder` class.

提供商历史变更时会调用 `Listenable` 基类暴露的 `notifyListener` 方法。
这意味着你可手动用 `add` 与 `remove` 订阅/取消订阅，或用它构造 `ListenableBuilder` 实例。

The `generateStream` method calls into the underlying LLM without affecting the
history. Calling the `sendMessageStream` method changes the history by adding
two new messages to the provider's history—one for the user message and one for
the LLM response—when the response is completed. The chat view uses
`sendMessageStream` when it processes a user's chat prompt and `generateStream`
when it's processing the user's voice input.

`generateStream` 调用底层 LLM 而不影响历史。
`sendMessageStream` 在回复完成时向提供商历史添加两条新消息（用户消息与 LLM 回复）。
聊天视图处理用户聊天提示词时用 `sendMessageStream`，处理语音输入时用 `generateStream`。

To see or set the history, you can access the `history` property:

要查看或设置历史，可访问 `history` 属性：

```dart
void _clearHistory() => _provider.history = [];
```

The ability to access a provider's history is also useful when it comes to
recreating a provider while maintaining the history:

在保持历史的同时重建提供商时，访问提供商历史也很有用：

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

The `_createProvider` method creates a new provider with the history from the
previous provider _and_ the new user preferences. It's seamless for the user;
they can keep chatting away but now the LLM gives them responses taking their
new food preferences into account. For example:

`_createProvider` 方法用上一提供商的历史 _以及_ 新用户偏好创建新提供商。
对用户而言无缝：可继续聊天，而 LLM 回复会考虑新的食物偏好。例如：


```dart
class _HomePageState extends State<HomePage> {
  ...
  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) =>
    FirebaseProvider(
      history: history,
      ...
    );
  ...
}
```

To see history in action, check out the [recipes example app][] and the [history
example app][].

实践请参阅 [recipes 示例应用][recipes example app] 与 [history 示例应用][history example app]。

[history example app]:
    {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart
[recipes example app]: {{site.github}}/flutter/ai/tree/main/example/lib/recipes

## Chat serialization/deserialization

## 聊天序列化/反序列化

To save and restore chat history between sessions of an app requires the ability
to serialize and deserialize each user prompt, including the attachments, and
each LLM response. Both kinds of messages (the user prompts and LLM responses),
are exposed in the `ChatMessage` class. Serialization can be accomplished by
using the `toJson` method of each `ChatMessage` instance.

要在应用会话间保存与恢复聊天历史，需能序列化与反序列化每条用户提示词（含附件）及每条 LLM 回复。
两类消息均在 `ChatMessage` 类中暴露。序列化可使用各 `ChatMessage` 实例的 `toJson` 方法。

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

Likewise, to deserialize, use the static `fromJson` method of the `ChatMessage`
class:

反序列化同理，使用 `ChatMessage` 类的静态 `fromJson` 方法：

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

To ensure fast turnaround when serializing, we recommend only writing each user
message once. Otherwise, the user must wait for your app to write every message
every time and, in the face of binary attachments, that could take a while.

为确保序列化快速完成，建议每条用户消息只写入一次。
否则用户每次都要等待应用重写全部消息，面对二进制附件时可能耗时较长。

To see this in action, check out the [history example app][].

实践请参阅 [history 示例应用][history example app]。

[history example app]:
    {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart

## Custom response widgets

## 自定义响应 widget

By default, the LLM response shown by the chat view is formatted Markdown.
However, in some cases, you want to create a custom widget to show the LLM
response that's specific to and integrated with your app. For example, when the
user requests a recipe in the [recipes example app][], the LLM response is used
to create a widget that's specific to showing recipes just like the rest of the
app does and to provide for an **Add** button in case the user would like to add
the recipe to their database:

默认情况下，聊天视图显示的 LLM 回复为格式化 Markdown。
但有时你需要创建与应用特定且集成的自定义 widget 展示 LLM 回复。
例如，在 [recipes 示例应用][recipes example app] 中用户请求食谱时，
LLM 回复用于创建与应用其余部分一致的食谱展示 widget，
并提供 **Add** 按钮以便用户将食谱加入数据库：

![Add recipe button](/assets/images/docs/ai-toolkit/add-recipe-button.png)

This is accomplished by setting the `responseBuilder` parameter of the
`LlmChatView` constructor:

通过设置 `LlmChatView` 构造函数的 `responseBuilder` 参数实现：

```dart
LlmChatView(
  provider: _provider,
  welcomeMessage: _welcomeMessage,
  responseBuilder: (context, response) => RecipeResponseView(
    response,
  ),
),
```

In this particular example, the `RecipeResponseView` widget is constructed with
the LLM provider's response text and uses that to implement its `build` method:

此例中，`RecipeResponseView` widget 用 LLM 提供商的回复文本构造，并在 `build` 方法中使用：

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

This code parses the text to extract introductory text and the recipe from the
LLM, bundling them together with an **Add Recipe** button to show in place of
the Markdown.

此代码解析文本，从 LLM 提取介绍文字与食谱，并与 **Add Recipe** 按钮一起替代 Markdown 显示。

Notice that we're parsing the LLM response as JSON. It's common to set the
provider into JSON mode and to provide a schema to restrict the format of its
responses to ensure that we've got something we can parse. Each provider exposes
this functionality in its own way, but the `FirebaseProvider` class enables
this with a `GenerationConfig` object that the recipes example uses as follows:

注意我们将 LLM 回复解析为 JSON。常见做法是将提供商设为 JSON 模式并提供 schema 限制回复格式以确保可解析。
各提供商以不同方式暴露此功能，`FirebaseProvider` 通过 `GenerationConfig` 实现，recipes 示例如下：

```dart
class _HomePageState extends State<HomePage> {
  ...

  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) => FirebaseProvider(
        ...
        model: FirebaseAI.geminiAI().generativeModel(
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

This code initializes the `GenerationConfig` object by setting the
`responseMimeType` parameter to `'application/json'` and the `responseSchema`
parameter to an instance of the `Schema` class that defines the structure of the
JSON that you're prepared to parse. In addition, it's good practice to also ask
for JSON and to provide a description of that JSON schema in the system
instructions, which we've done here.

此代码将 `responseMimeType` 设为 `'application/json'`，
`responseSchema` 设为定义可解析 JSON 结构的 `Schema` 实例。
此外，最好在系统指令中也要求 JSON 并描述 schema，此处已这样做。

To see this in action, check out the [recipes example app][].

实践请参阅 [recipes 示例应用][recipes example app]。

## Custom styling

## 自定义样式

The chat view comes out of the box with a set of default styles for the
background, the text field, the buttons, the icons, the suggestions, and so on.
You can fully customize those styles by setting your own by using the `style`
parameter to the `LlmChatView` constructor:

聊天视图自带背景、文本框、按钮、图标、建议等默认样式。
可通过 `LlmChatView` 构造函数的 `style` 参数完全自定义：

```dart
LlmChatView(
  provider: FirebaseProvider(...),
  style: LlmChatViewStyle(...),
),
```

For example, the [custom styles example app][custom-ex] uses this feature to
implement an app with a Halloween theme:

例如，[custom styles 示例应用][custom-ex] 用此功能实现万圣节主题应用：

![Halloween-themed demo app](/assets/images/docs/ai-toolkit/demo-app.png)

For a complete list of the styles available in the `LlmChatViewStyle` class,
check out the [reference documentation][]. You can also customize the appearance
of the voice recorder using the `voiceNoteRecorderStyle` parameter of the
`LlmChatViewStyle` class, which is demonstrated in the [styles
example][styles-ex].

`LlmChatViewStyle` 可用样式完整列表请参阅[参考文档][reference documentation]。
还可用 `LlmChatViewStyle` 的 `voiceNoteRecorderStyle` 自定义录音机外观，见 [styles 示例][styles-ex]。

To see custom styles in action, in addition to the [custom styles
example][custom-ex] and the [styles example][styles-ex], check out the [dark
mode example][] and the [demo app][].

除 [custom styles 示例][custom-ex] 与 [styles 示例][styles-ex] 外，
还可参阅 [dark mode 示例][dark mode example] 与 [演示应用][demo app]。

[custom-ex]:
    {{site.github}}/flutter/ai/blob/main/example/lib/custom_styles/custom_styles.dart
[styles-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/styles/styles.dart
[dark mode example]:
    {{site.github}}/flutter/ai/blob/main/example/lib/dark_mode/dark_mode.dart
[demo app]: {{site.github}}/flutter/ai#online-demo
[reference documentation]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatViewStyle-class.html

## Chat without UI

## 无 UI 聊天

You don't have to use the chat view to access the functionality of the
underlying provider. In addition to being able to simply call it with whatever
proprietary interface it provides, you can also use it with the [LlmProvider
interface][].

不必使用聊天视图即可访问底层提供商功能。
除使用其专有接口直接调用外，也可通过 [LlmProvider 接口][LlmProvider interface] 使用。

[LlmProvider interface]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

As an example, the recipes example app provides a Magic button on the page for
editing recipes. The purpose of that button is to update an existing recipe in
your database with your current food preferences. Pressing the button allows you
to preview the recommended changes and decide whether you'd like to apply them
or not:

例如，recipes 示例应用在编辑食谱页面提供 Magic 按钮，
用于根据当前食物偏好更新数据库中的现有食谱。
点按按钮可预览建议的更改并决定是否应用：

![User decides whether to update recipe in
database](/assets/images/docs/ai-toolkit/apply-changes-decision.png)

Instead of using the same provider that the chat portion of the app uses, which
would insert spurious user messages and LLM responses into the user's chat
history, the Edit Recipe page instead creates its own provider and uses it
directly:

编辑食谱页面不使用应用聊天部分同一提供商（否则会在用户聊天历史中插入多余消息与回复），
而是创建自有提供商并直接使用：

```dart
class _EditRecipePageState extends State<EditRecipePage> {
  ...
  final _provider = FirebaseProvider(...);
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

The call to `sendMessageStream` creates entries in the provider's history, but
since it's not associated with a chat view, they won't be shown. If it's
convenient, you can also accomplish the same thing by calling `generateStream`,
which allows you to reuse an existing provider without affecting the chat
history.

调用 `sendMessageStream` 会在提供商历史中创建条目，但因未关联聊天视图而不会显示。
也可调用 `generateStream` 复用现有提供商而不影响聊天历史。

To see this in action, check out the [Edit Recipe page][] of the recipes
example.

实践请参阅 recipes 示例的 [Edit Recipe 页面][Edit Recipe page]。

[Edit Recipe page]:
    {{site.github}}/flutter/ai/blob/main/example/lib/recipes/pages/edit_recipe_page.dart

## Rerouting prompts

## 重路由提示词

If you'd like to debug, log, or manipulate the connection between the chat view
and the underlying provider, you can do so with an implementation of an
[`LlmStreamGenerator`][] function. You then pass that function to the
`LlmChatView` in the `messageSender` parameter:

若要调试、记录或操控聊天视图与底层提供商之间的连接，
可实现 [`LlmStreamGenerator`][] 函数，并通过 `messageSender` 参数传给 `LlmChatView`：

[`LlmStreamGenerator`]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmStreamGenerator.html

```dart
class ChatPage extends StatelessWidget {
  final _provider = FirebaseProvider(...);

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

This example logs the user prompts and LLM responses as they go back and forth.
When providing a function as a `messageSender`, it's your responsibility to call
the underlying provider. If you don't, it won't get the message. This capability
allows you to do advanced things like routing to a provider dynamically or
Retrieval Augmented Generation (RAG).

此示例记录往返的用户提示词与 LLM 回复。
将函数作为 `messageSender` 时，你须负责调用底层提供商，否则消息不会送达。
借此可实现动态路由到提供商或检索增强生成（RAG）等高级能力。

To see this in action, check out the [logging example app][].

实践请参阅 [logging 示例应用][logging example app]。

[logging example app]:
    {{site.github}}/flutter/ai/blob/main/example/lib/logging/logging.dart
