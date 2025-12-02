---
title: Feature integration
title: 功能集成
description: >
  How to integrate with other Flutter features.
description: >
  如何与其他 Flutter 功能集成。
prev:
  title: User experience
  title: 用户体验
  path: /ai-toolkit/user-experience
next:
  title: Custom LLM providers
  title: 自定义 LLM provider
  path: /ai-toolkit/custom-llm-providers
---

In addition to the features that are provided
automatically by the [`LlmChatView`][],
a number of integration points allow your app to
blend seamlessly with other features to provide
additional functionality:

除了 [`LlmChatView`][] 自动提供的功能之外，
还有许多集成点允许你的应用与其他功能无缝融合，
从而提供额外的功能：

* **Welcome messages**: Display an initial greeting to users.

  **欢迎消息**：向用户显示初始问候。

* **Suggested prompts**: Offer users predefined prompts to guide interactions.

  **建议提示**：向用户提供预定义的提示以指导交互。

* **System instructions**: Provide the LLM with specific input to influence its responses.

  **系统指令**：为 LLM 提供特定的输入以影响其响应。

* **Disable attachments and audio input**: Remove optional parts of the chat UI.

  **禁用附件和音频输入**：移除聊天 UI 的可选部分。

* **Manage cancel or error behavior**: Change the user cancellation or LLM error behavior.

  **管理取消或错误行为**：更改用户取消或 LLM 错误行为。

* **Manage history**: Every LLM provider allows for managing chat history,
  which is useful for clearing it,
  changing it dynamically and storing it between sessions.

  **管理历史记录**：每个 LLM 提供者都允许管理聊天历史记录，
  这对于清除历史记录、动态更改历史记录以及在会话之间存储历史记录非常有用。

* **Chat serialization/deserialization**: Store and retrieve conversations
  between app sessions.

  **聊天序列化/反序列化**：在应用会话之间存储和检索对话。

* **Custom response widgets**: Introduce specialized UI components
  to present LLM responses.

  **自定义响应组件**：引入专门的 UI 组件来呈现 LLM 响应。

* **Custom styling**: Define unique visual styles to match the chat
  appearance to the overall app.

  **自定义样式**：定义独特的视觉样式，使聊天外观与整体应用匹配。

* **Chat w/o UI**: Interact directly with the LLM providers without
  affecting the user's current chat session.

  **无 UI 聊天**：直接与 LLM 提供者交互，
  而不影响用户当前的聊天会话。

* **Custom LLM providers**: Build your own LLM provider for integration of chat
  with your own model backend.

  **自定义 LLM 提供者**：构建你自己的 LLM 提供者，
  以便将聊天与你自己的模型后端集成。

* **Rerouting prompts**: Debug, log, or reroute messages meant for the provider
  to track down issues or route prompts dynamically.

  **重新路由提示**：调试、记录或重新路由发送给提供者的消息，
  以追踪问题或动态路由提示。

[`LlmChatView`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## Welcome messages

## 欢迎消息

The chat view allows you to provide a custom welcome message
to set context for the user:

聊天视图允许你提供自定义的欢迎消息，
为用户设置上下文：

![Example welcome message](/assets/images/docs/ai-toolkit/example-of-welcome-message.png)

You can initialize the `LlmChatView` with a welcome message
by setting the `welcomeMessage` parameter:

你可以通过设置 `welcomeMessage` 参数来初始化带有欢迎消息的 `LlmChatView`：

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

To see a complete example of setting the welcome message,
check out the [welcome example][].

要查看设置欢迎消息的完整示例，
请查看 [欢迎示例][welcome example]。

[welcome example]: {{site.github}}/flutter/ai/blob/main/example/lib/welcome/welcome.dart

## Suggested prompts

## 建议提示

You can provide a set of suggested prompts to give
the user some idea of what the chat session has been optimized for:

你可以提供一组建议提示，
让用户了解聊天会话针对什么进行了优化：

![Example suggested prompts](/assets/images/docs/ai-toolkit/example-of-suggested-prompts.png)

The suggestions are only shown when there is no existing
chat history. Clicking one copies the text into the
user's prompt editing area. To set the list of suggestions,
construct the `LlmChatView` with the `suggestions` parameter:

建议仅在没有现有聊天历史记录时显示。
点击其中一个会将文本复制到用户的提示编辑区域。
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

To see a complete example of setting up suggestions for the user,
take a look at the [suggestions example][].

要查看为用户设置建议的完整示例，
请查看 [建议示例][suggestions example]。

[suggestions example]: {{site.github}}/flutter/ai/blob/main/example/lib/suggestions/suggestions.dart

## LLM instructions

## LLM 指令

To optimize an LLM's responses based on the needs
of your app, you'll want to give it instructions.
For example, the [recipes example app][] uses the
`systemInstructions` parameter of the `GenerativeModel`
class to tailor the LLM to focus on delivering recipes
based on the user's instructions:

要根据你的应用需求优化 LLM 的响应，
你需要给它提供指令。
例如，[食谱示例应用][recipes example app] 使用 `GenerativeModel` 类的 `systemInstructions` 参数，
将 LLM 定制为专注于根据用户的指令提供食谱：

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

Setting system instructions is unique to each provider;
both the `GeminiProvider` and the `VertexProvider`
allow you to provide them through the `systemInstruction` parameter.

设置系统指令对于每个提供者来说都是独特的；
`GeminiProvider` 和 `VertexProvider` 都允许你通过 `systemInstruction` 参数提供它们。

Notice that, in this case, we're bringing in user preferences
as part of the creation of the LLM provider passed to the
`LlmChatView` constructor. We set the instructions as part
of the creation process each time the user changes their preferences.
The recipes app allows the user to change their food preferences
using a drawer on the scaffold:

请注意，在这种情况下，我们将用户偏好作为传递给 `LlmChatView` 构造函数的 LLM 提供者创建过程的一部分。
每次用户更改其偏好时，我们都会在创建过程中设置指令。
食谱应用允许用户使用脚手架上的抽屉更改其食物偏好：

![Example of refining prompt](/assets/images/docs/ai-toolkit/setting-food-preferences.png)

Whenever the user changes their food preferences,
the recipes app creates a new model to use the new preferences:

每当用户更改其食物偏好时，
食谱应用会创建一个新模型以使用新的偏好：

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

## Disable attachments and audio input

## 禁用附件和音频输入

If you'd like to disable attachments (the **+** button) or audio input (the mic button),
you can do so with the `enableAttachments` and `enableVoiceNotes` parameters to
the `LlmChatView` constructor:

如果你想禁用附件（**+** 按钮）或音频输入（麦克风按钮），
可以使用 `LlmChatView` 构造函数的 `enableAttachments` 和 `enableVoiceNotes` 参数来实现：

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

这两个标志默认都为 `true`。

## Manage cancel or error behavior

## 管理取消或错误行为

By default, when the user cancels an LLM request, the LLM's response will be
appended with the string "CANCEL" and a message will pop up that the user has
canceled the request. Likewise, in the event of an LLM error, like a dropped
network connection, the LLM's response will be appended with the
string "ERROR" and an alert dialog will pop up with the details of the error.

默认情况下，当用户取消 LLM 请求时，LLM 的响应将附加字符串 "CANCEL"，
并会弹出一条消息，提示用户已取消请求。
同样，在发生 LLM 错误（例如网络连接断开）时，LLM 的响应将附加字符串 "ERROR"，
并会弹出一个警告对话框，显示错误的详细信息。

You can override the cancel and error behavior with the `cancelMessage`,
`errorMessage`, `onCancelCallback` and `onErrorCallback` parameters of the
`LlmChatView`. For example, the following code replaces the default cancellation
handling behavior:

你可以使用 `LlmChatView` 的 `cancelMessage`、`errorMessage`、`onCancelCallback` 和 `onErrorCallback` 参数来覆盖取消和错误行为。
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

You can override any or all of these parameters and the `LlmChatView` will use
its defaults for anything you don't override.

你可以覆盖这些参数中的任何一个或全部，`LlmChatView` 将对你未覆盖的内容使用其默认值。

## Manage history

## 管理历史记录

The [standard interface that defines all LLM providers][providerIF]
that can plug into the chat view includes the ability to
get and set history for the provider:

[定义所有 LLM 提供者的标准接口][providerIF] 可以插入聊天视图，
包括获取和设置提供者历史记录的能力：

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

When the history for a provider changes,
it calls the `notifyListener` method exposed by the
`Listenable` base class. This means that you manually
subscribe/unsubscribe with the `add` and `remove` methods
or use it to construct an instance of the `ListenableBuilder` class.

当提供者的历史记录更改时，
它会调用 `Listenable` 基类公开的 `notifyListener` 方法。
这意味着你可以使用 `add` 和 `remove` 方法手动订阅/取消订阅，
或使用它来构造 `ListenableBuilder` 类的实例。

The `generateStream` method calls into the underlying LLM
without affecting the history. Calling the `sendMessageStream`
method changes the history by adding two new messages to the
provider's history—one for the user message and one for the LLM
response—when the response is completed. The chat view uses
`sendMessageStream` when it processes a user's chat prompt and
`generateStream` when it's processing the user's voice input.

`generateStream` 方法调用底层 LLM 而不影响历史记录。
调用 `sendMessageStream` 方法会在响应完成时通过向提供者的历史记录添加两条新消息来更改历史记录——
一条用于用户消息，一条用于 LLM 响应。
聊天视图在处理用户的聊天提示时使用 `sendMessageStream`，
在处理用户的语音输入时使用 `generateStream`。

To see or set the history, you can access the `history` property:

要查看或设置历史记录，你可以访问 `history` 属性：

```dart
void _clearHistory() => _provider.history = [];
```

The ability to access a provider's history is also useful
when it comes to recreating a provider while maintaining the history:

访问提供者历史记录的能力在重新创建提供者同时保持历史记录时也很有用：

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

The `_createProvider` method
creates a new provider with the history from
the previous provider _and_ the new user
preferences.
It's seamless for the user; they can keep chatting away
but now the LLM gives them responses taking their
new food preferences into account.
For example:

`_createProvider` 方法使用前一个提供者的历史记录和新的用户偏好创建一个新的提供者。
对于用户来说这是无缝的；他们可以继续聊天，
但现在 LLM 会考虑他们的新食物偏好来给出响应。
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

To see history in action,
check out the [recipes example app][] and the [history example app][].

要查看历史记录的实际应用，
请查看 [食谱示例应用][recipes example app] 和 [历史记录示例应用][history example app]。

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart
[recipes example app]: {{site.github}}/flutter/ai/tree/main/example/lib/recipes

## Chat serialization/deserialization

## 聊天序列化/反序列化

To save and restore chat history between sessions
of an app requires the ability to serialize and
deserialize each user prompt, including the attachments,
and each LLM response. Both kinds of messages
(the user prompts and LLM responses),
are exposed in the `ChatMessage` class.
Serialization can be accomplished by using the `toJson`
method of each `ChatMessage` instance.

要在应用的会话之间保存和恢复聊天历史记录，
需要能够序列化和反序列化每个用户提示（包括附件）和每个 LLM 响应。
这两种消息（用户提示和 LLM 响应）都在 `ChatMessage` 类中公开。
可以使用每个 `ChatMessage` 实例的 `toJson` 方法来完成序列化。

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

Likewise, to deserialize, use the static `fromJson`
method of the `ChatMessage` class:

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

To ensure fast turnaround when serializing,
we recommend only writing each user message once.
Otherwise, the user must wait for your app to
write every message every time and,
in the face of binary attachments,
that could take a while.

为了确保序列化时的快速周转，
我们建议每个用户消息只写入一次。
否则，用户必须等待你的应用每次都写入每条消息，
而且在有二进制附件的情况下，
这可能需要一段时间。

To see this in action, check out the [history example app][].

要查看实际应用，请查看 [历史记录示例应用][history example app]。

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart

## Custom response widgets

## 自定义响应组件

By default, the LLM response shown by the chat view is
formatted Markdown. However, in some cases,
you want to create a custom widget to show the
LLM response that's specific to and integrated with your app.
For example, when the user requests a recipe in the
[recipes example app][], the LLM response is used
to create a widget that's specific to showing recipes
just like the rest of the app does and to provide for an
**Add** button in case the user would like to add
the recipe to their database:

默认情况下，聊天视图显示的 LLM 响应是格式化的 Markdown。
但是，在某些情况下，你希望创建一个自定义组件来显示特定于你的应用并与之集成的 LLM 响应。
例如，当用户在 [食谱示例应用][recipes example app] 中请求食谱时，
LLM 响应被用于创建一个专门用于显示食谱的组件，
就像应用的其余部分所做的那样，
并提供一个 **Add** 按钮，以便用户可以将食谱添加到他们的数据库中：

![Add recipe button](/assets/images/docs/ai-toolkit/add-recipe-button.png)

This is accomplished by setting the `responseBuilder`
parameter of the `LlmChatView` constructor:

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

In this particular example, the `RecipeReponseView`
widget is constructed with the LLM provider's response text
and uses that to implement its `build` method:

在这个特定示例中，`RecipeReponseView` 组件使用 LLM 提供者的响应文本构造，
并使用它来实现其 `build` 方法：

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

This code parses the text to extract introductory text
and the recipe from the LLM, bundling them together
with an **Add Recipe** button to show in place of the Markdown.

这段代码解析文本以从 LLM 中提取介绍性文本和食谱，
将它们与一个 **Add Recipe** 按钮捆绑在一起，
以代替 Markdown 显示。

Notice that we're parsing the LLM response as JSON.
It's common to set the provider into JSON mode and
to provide a schema to restrict the format of its responses
to ensure that we've got something we can parse.
Each provider exposes this functionality in its own way,
but both the `GeminiProvider` and `VertexProvider` classes
enable this with a `GenerationConfig` object that the
recipes example uses as follows:

请注意，我们将 LLM 响应解析为 JSON。
通常会将提供者设置为 JSON 模式，
并提供一个模式来限制其响应的格式，
以确保我们有可以解析的内容。
每个提供者都以自己的方式公开此功能，
但 `GeminiProvider` 和 `VertexProvider` 类都通过 `GenerationConfig` 对象启用此功能，
食谱示例使用如下：

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

This code initializes the `GenerationConfig` object
by setting the `responseMimeType` parameter to `'application/json'`
and the `responseSchema` parameter to an instance of the
`Schema` class that defines the structure of the JSON
that you're prepared to parse. In addition,
it's good practice to also ask for JSON and to provide
a description of that JSON schema in the system instructions,
which we've done here.

这段代码通过将 `responseMimeType` 参数设置为 `'application/json'`，
并将 `responseSchema` 参数设置为定义你准备解析的 JSON 结构的 `Schema` 类实例来初始化 `GenerationConfig` 对象。
此外，在系统指令中请求 JSON 并提供该 JSON 模式的描述也是一个好习惯，
我们在这里就是这样做的。

To see this in action, check out the [recipes example app][].

要查看实际应用，请查看 [食谱示例应用][recipes example app]。

## Custom styling

## 自定义样式

The chat view comes out of the box with a set of default styles
for the background, the text field, the buttons, the icons,
the suggestions, and so on. You can fully customize those
styles by setting your own by using the `style` parameter to the
`LlmChatView` constructor:

聊天视图开箱即用，为背景、文本字段、按钮、图标、建议等提供了一组默认样式。
你可以通过使用 `LlmChatView` 构造函数的 `style` 参数来设置自己的样式，从而完全自定义这些样式：

```dart
LlmChatView(
  provider: GeminiProvider(...),
  style: LlmChatViewStyle(...),
),
```

For example, the [custom styles example app][custom-ex]
uses this feature to implement an app with a Halloween theme:

例如，[自定义样式示例应用][custom-ex] 使用此功能实现了一个万圣节主题的应用：

![Halloween-themed demo app](/assets/images/docs/ai-toolkit/demo-app.png)

For a complete list of the styles available in the
`LlmChatViewStyle` class, check out the [reference documentation][].
To see custom styles in action,
in addition to the [custom styles example][custom-ex],
check out the [dark mode example][] and the [demo app][].

有关 `LlmChatViewStyle` 类中可用样式的完整列表，
请查看 [参考文档][reference documentation]。
要查看自定义样式的实际应用，
除了 [自定义样式示例][custom-ex]，
还可以查看 [暗黑模式示例][dark mode example] 和 [演示应用][demo app]。

[custom-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/custom_styles/custom_styles.dart
[dark mode example]: {{site.github}}/flutter/ai/blob/main/example/lib/dark_mode/dark_mode.dart
[demo app]: {{site.github}}/flutter/ai#online-demo
[reference documentation]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatViewStyle-class.html

## Chat without UI

## 无 UI 聊天

You don't have to use the chat view to access the
functionality of the underlying provider.
In addition to being able to simply call it with
whatever proprietary interface it provides,
you can also use it with the [LlmProvider interface][].

你不必使用聊天视图来访问底层提供者的功能。
除了能够使用它提供的任何专有接口简单地调用它之外，
你还可以将它与 [LlmProvider 接口][LlmProvider interface] 一起使用。

[LlmProvider interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

As an example, the recipes example app provides a
Magic button on the page for editing recipes.
The purpose of that button is to update an existing recipe
in your database with your current food preferences.
Pressing the button allows you to preview the recommended changes and
decide whether you'd like to apply them or not:

例如，食谱示例应用在编辑食谱的页面上提供了一个 Magic 按钮。
该按钮的目的是根据你当前的食物偏好更新数据库中的现有食谱。
按下按钮可以让你预览推荐的更改，
并决定是否应用它们：

![User decides whether to update recipe in database](/assets/images/docs/ai-toolkit/apply-changes-decision.png)

Instead of using the same provider that the chat portion
of the app uses, which would insert spurious user messages
and LLM responses into the user's chat history,
the Edit Recipe page instead creates its own provider
and uses it directly:

与其使用应用的聊天部分使用的同一个提供者（这会将虚假的用户消息和 LLM 响应插入到用户的聊天历史记录中），
Edit Recipe 页面改为创建自己的提供者并直接使用它：

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

The call to `sendMessageStream` creates entries in the
provider's history, but since it's not associated with a chat view,
they won't be shown. If it's convenient,
you can also accomplish the same thing by calling `generateStream`,
which allows you to reuse an existing provider without affecting
the chat history.

对 `sendMessageStream` 的调用会在提供者的历史记录中创建条目，
但由于它没有与聊天视图关联，
因此不会显示它们。
如果方便的话，你也可以通过调用 `generateStream` 来实现相同的功能，
这允许你重用现有的提供者而不影响聊天历史记录。

To see this in action,
check out the [Edit Recipe page][] of the recipes example.

要查看实际应用，
请查看食谱示例的 [Edit Recipe 页面][Edit Recipe page]。

[Edit Recipe page]: {{site.github}}/flutter/ai/blob/main/example/lib/recipes/pages/edit_recipe_page.dart

## Rerouting prompts

## 重新路由提示

If you'd like to debug, log, or manipulate the connection
between the chat view and the underlying provider,
you can do so with an implementation of an [`LlmStreamGenerator`][] function.
You then pass that function to the `LlmChatView` in the
`messageSender` parameter:

如果你想调试、记录或操作聊天视图与底层提供者之间的连接，
可以使用 [`LlmStreamGenerator`][] 函数的实现来实现。
然后将该函数传递给 `LlmChatView` 的 `messageSender` 参数：

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

This example logs the user prompts and LLM responses
as they go back and forth. When providing a function
as a `messageSender`, it's your responsibility to call
the underlying provider. If you don't, it won't get the message.
This capability allows you to do advanced things like routing to
a provider dynamically or Retrieval Augmented Generation (RAG).

这个示例记录了用户提示和 LLM 响应的来回过程。
当提供一个函数作为 `messageSender` 时，
你有责任调用底层提供者。
如果不这样做，它将不会收到消息。
此功能允许你执行诸如动态路由到提供者或检索增强生成（RAG）之类的高级操作。

To see this in action, check out the [logging example app][].

要查看实际应用，请查看 [日志记录示例应用][logging example app]。

[logging example app]: {{site.github}}/flutter/ai/blob/main/example/lib/logging/logging.dart
