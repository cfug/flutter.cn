---
# title: Feature integration
title: Feature integration
# description: >
#   How to integrate with other Flutter features.
description: >
  How to integrate with other Flutter features.
prev:
  title: User experience
  path: /ai-toolkit/user-experience
next:
  title: Custom LLM providers
  path: /ai-toolkit/custom-llm-providers
---

In addition to the features that are provided
automatically by the [`LlmChatView`][],
a number of integration points allow your app to
blend seamlessly with other features to provide
additional functionality:



除了 [`LlmChatView`][] 自动提供的功能外，
还有许多集成点可让你的应用与其他功能无缝融合，
提供额外的功能：

* **Welcome messages**: Display an initial greeting to users.
* **Suggested prompts**: Offer users predefined prompts to guide interactions.
* **System instructions**: Provide the LLM with specific input to influence its responses.
* **Disable attachments and audio input**: Remove optional parts of the chat UI.
* **Manage cancel or error behavior**: Change the user cancellation or LLM error behavior.
* **Manage history**: Every LLM provider allows for managing chat history,
  which is useful for clearing it,
  changing it dynamically and storing it between sessions.
* **Chat serialization/deserialization**: Store and retrieve conversations
  between app sessions.
* **Custom response widgets**: Introduce specialized UI components
  to present LLM responses.
* **Custom styling**: Define unique visual styles to match the chat
  appearance to the overall app.
* **Chat w/o UI**: Interact directly with the LLM providers without
  affecting the user's current chat session.
* **Custom LLM providers**: Build your own LLM provider for integration of chat
  with your own model backend.
* **Rerouting prompts**: Debug, log, or reroute messages meant for the provider
  to track down issues or route prompts dynamically.



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

## Welcome messages



## 欢迎消息

The chat view allows you to provide a custom welcome message
to set context for the user:



聊天视图允许你提供自定义欢迎消息来为用户设置上下文：

![Example welcome message](/assets/images/docs/ai-toolkit/example-of-welcome-message.png)



![欢迎消息示例](/assets/images/docs/ai-toolkit/example-of-welcome-message.png)

You can initialize the `LlmChatView` with a welcome message
by setting the `welcomeMessage` parameter:



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

To see a complete example of setting the welcome message,
check out the [welcome example][].



## 建议提示词

[welcome example]: {{site.github}}/flutter/ai/blob/main/example/lib/welcome/welcome.dart

## Suggested prompts



你可以提供一组建议提示词，让用户了解聊天会话针对什么进行了优化：

You can provide a set of suggested prompts to give
the user some idea of what the chat session has been optimized for:



![建议提示词示例](/assets/images/docs/ai-toolkit/example-of-suggested-prompts.png)

![Example suggested prompts](/assets/images/docs/ai-toolkit/example-of-suggested-prompts.png)



建议仅在没有现有聊天历史时显示。
点击其中一个会将文本复制到用户的提示词编辑区域。
要设置建议列表，请使用 `suggestions` 参数构造 `LlmChatView`：

The suggestions are only shown when there is no existing
chat history. Clicking one copies the text into the
user's prompt editing area. To set the list of suggestions,
construct the `LlmChatView` with the `suggestions` parameter:



有关为用户设置建议的完整示例，请查看 [suggestions 示例][suggestions example]。

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



## LLM 指令

To see a complete example of setting up suggestions for the user,
take a look at the [suggestions example][].



要根据应用的需求优化 LLM 的响应，你需要给它指令。
例如，[recipes 示例应用][recipes example app]使用
`GenerativeModel` 类的 `systemInstructions` 参数
来定制 LLM，使其专注于根据用户的指令提供食谱：

[suggestions example]: {{site.github}}/flutter/ai/blob/main/example/lib/suggestions/suggestions.dart

## LLM instructions



设置系统指令对每个 provider 是独特的；
`GeminiProvider` 和 `VertexProvider`
都允许你通过 `systemInstruction` 参数提供它们。

To optimize an LLM's responses based on the needs
of your app, you'll want to give it instructions.
For example, the [recipes example app][] uses the
`systemInstructions` parameter of the `GenerativeModel`
class to tailor the LLM to focus on delivering recipes
based on the user's instructions:



请注意，在这种情况下，我们将用户偏好作为传递给
`LlmChatView` 构造函数的 LLM provider 创建过程的一部分。
每次用户更改其偏好时，我们都会在创建过程中设置指令。
recipes 应用允许用户使用 scaffold 上的抽屉来更改他们的食物偏好：

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



![优化提示词的示例](/assets/images/docs/ai-toolkit/setting-food-preferences.png)

Setting system instructions is unique to each provider;
both the `GeminiProvider` and the `VertexProvider`
allow you to provide them through the `systemInstruction` parameter.



每当用户更改他们的食物偏好时，
recipes 应用会创建一个新模型来使用新的偏好：

Notice that, in this case, we're bringing in user preferences
as part of the creation of the LLM provider passed to the
`LlmChatView` constructor. We set the instructions as part
of the creation process each time the user changes their preferences.
The recipes app allows the user to change their food preferences
using a drawer on the scaffold:



## 禁用附件和音频输入

![Example of refining prompt](/assets/images/docs/ai-toolkit/setting-food-preferences.png)



如果你想禁用附件（**+** 按钮）或音频输入（麦克风按钮），
可以使用 `LlmChatView` 构造函数的 `enableAttachments` 和 `enableVoiceNotes` 参数：

Whenever the user changes their food preferences,
the recipes app creates a new model to use the new preferences:



这两个标志默认为 `true`。

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



## 管理取消或错误行为

If you'd like to disable attachments (the **+** button) or audio input (the mic button),
you can do so with the `enableAttachments` and `enableVoiceNotes` parameters to
the `LlmChatView` constructor:



默认情况下，当用户取消 LLM 请求时，LLM 的响应会附加字符串 "CANCEL"，
并弹出消息提示用户已取消请求。
同样，当发生 LLM 错误（如网络连接断开）时，
LLM 的响应会附加字符串 "ERROR"，并弹出警告对话框显示错误详情。

```dart
class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

@override
  Widget build(BuildContext context) {
    // ...



你可以使用 `LlmChatView` 的 `cancelMessage`、`errorMessage`、
`onCancelCallback` 和 `onErrorCallback` 参数来覆盖取消和错误行为。
例如，以下代码替换了默认的取消处理行为：

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



你可以覆盖这些参数中的任何一个或全部，
`LlmChatView` 将为你未覆盖的内容使用默认值。

Both of these flags default to `true`.



## 管理历史记录

## Manage cancel or error behavior



[定义所有可以接入聊天视图的 LLM provider 的标准接口][providerIF]
包括获取和设置 provider 历史记录的能力：

By default, when the user cancels an LLM request, the LLM's response will be
appended with the string "CANCEL" and a message will pop up that the user has
canceled the request. Likewise, in the event of an LLM error, like a dropped
network connection, the LLM's response will be appended with the
string "ERROR" and an alert dialog will pop up with the details of the error.



当 provider 的历史记录发生变化时，
它会调用 `Listenable` 基类暴露的 `notifyListener` 方法。
这意味着你可以使用 `add` 和 `remove` 方法手动订阅/取消订阅，
或使用它来构造 `ListenableBuilder` 类的实例。

You can override the cancel and error behavior with the `cancelMessage`,
`errorMessage`, `onCancelCallback` and `onErrorCallback` parameters of the
`LlmChatView`. For example, the following code replaces the default cancellation
handling behavior:



`generateStream` 方法调用底层 LLM 而不影响历史记录。
调用 `sendMessageStream` 方法会在响应完成时
向 provider 的历史记录添加两条新消息来更改历史记录——
一条是用户消息，一条是 LLM 响应。
聊天视图在处理用户的聊天提示词时使用 `sendMessageStream`，
在处理用户的语音输入时使用 `generateStream`。

```dart
class ChatPage extends StatelessWidget {
  // ...

void _onCancel(BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Chat cancelled')));
  }



要查看或设置历史记录，你可以访问 `history` 属性：

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



访问 provider 历史记录的能力在重新创建 provider 同时保持历史记录时也很有用：

You can override any or all of these parameters and the `LlmChatView` will use
its defaults for anything you don't override.



`_createProvider` 方法使用前一个 provider 的历史记录_和_新的用户偏好创建一个新的 provider。
对用户来说这是无缝的；他们可以继续聊天，
但现在 LLM 会根据他们的新食物偏好给出响应。
例如：

## Manage history



要查看历史记录的实际应用，
请查看 [recipes 示例应用][recipes example app]和 [history 示例应用][history example app]。

The [standard interface that defines all LLM providers][providerIF]
that can plug into the chat view includes the ability to
get and set history for the provider:



## 聊天序列化/反序列化

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



要在应用会话之间保存和恢复聊天历史，
需要能够序列化和反序列化每个用户提示词（包括附件）和每个 LLM 响应。
这两种消息（用户提示词和 LLM 响应）
都在 `ChatMessage` 类中公开。
可以使用每个 `ChatMessage` 实例的 `toJson` 方法来实现序列化。

Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```



同样，要反序列化，请使用 `ChatMessage` 类的静态 `fromJson` 方法：

[providerIF]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

When the history for a provider changes,
it calls the `notifyListener` method exposed by the
`Listenable` base class. This means that you manually
subscribe/unsubscribe with the `add` and `remove` methods
or use it to construct an instance of the `ListenableBuilder` class.



为确保序列化时的快速响应，我们建议每个用户消息只写入一次。
否则，用户必须等待你的应用每次都写入所有消息，
而在处理二进制附件时，这可能需要一段时间。

The `generateStream` method calls into the underlying LLM
without affecting the history. Calling the `sendMessageStream`
method changes the history by adding two new messages to the
provider's history—one for the user message and one for the LLM
response—when the response is completed. The chat view uses
`sendMessageStream` when it processes a user's chat prompt and
`generateStream` when it's processing the user's voice input.



要查看实际应用，请查看 [history 示例应用][history example app]。

To see or set the history, you can access the `history` property:



## 自定义响应 widget

```dart
void _clearHistory() => _provider.history = [];
```

The ability to access a provider's history is also useful
when it comes to recreating a provider while maintaining the history:



默认情况下，聊天视图显示的 LLM 响应是格式化的 Markdown。
但在某些情况下，你想创建一个自定义 widget 来显示特定于你应用并与之集成的 LLM 响应。
例如，当用户在 [recipes 示例应用][recipes example app]中请求食谱时，
LLM 响应被用于创建一个特定于显示食谱的 widget，
就像应用的其他部分一样，并提供一个**添加**按钮，
以便用户可以将食谱添加到他们的数据库中：

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



![添加食谱按钮](/assets/images/docs/ai-toolkit/add-recipe-button.png)

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



这是通过设置 `LlmChatView` 构造函数的 `responseBuilder` 参数来实现的：

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart
[recipes example app]: {{site.github}}/flutter/ai/tree/main/example/lib/recipes

## Chat serialization/deserialization



在这个特定的示例中，`RecipeResponseView` widget
使用 LLM provider 的响应文本构造，并使用它来实现其 `build` 方法：

To save and restore chat history between sessions
of an app requires the ability to serialize and
deserialize each user prompt, including the attachments,
and each LLM response. Both kinds of messages
(the user prompts and LLM responses),
are exposed in the `ChatMessage` class.
Serialization can be accomplished by using the `toJson`
method of each `ChatMessage` instance.



这段代码解析文本以从 LLM 中提取介绍文本和食谱，
将它们与**添加食谱**按钮捆绑在一起显示，以替代 Markdown。

```dart
Future<void> _saveHistory() async {
  // get the latest history
  final history = _provider.history.toList();

// write the new messages
  for (var i = 0; i != history.length; ++i) {
    // skip if the file already exists
    final file = await _messageFile(i);
    if (file.existsSync()) continue;



请注意，我们将 LLM 响应解析为 JSON。
通常会将 provider 设置为 JSON 模式，
并提供 schema 来限制其响应的格式，以确保我们得到可以解析的内容。
每个 provider 以自己的方式暴露此功能，
但 `GeminiProvider` 和 `VertexProvider` 类都通过 `GenerationConfig` 对象启用此功能，
recipes 示例使用如下：

// write the new message to disk
    final map = history[i].toJson();
    final json = JsonEncoder.withIndent('  ').convert(map);
    await file.writeAsString(json);
  }
}
```



这段代码通过将 `responseMimeType` 参数设置为 `'application/json'`
并将 `responseSchema` 参数设置为定义你准备解析的 JSON 结构的 `Schema` 类实例
来初始化 `GenerationConfig` 对象。
此外，在系统指令中请求 JSON 并提供该 JSON schema 的描述也是一种好做法，
我们在这里就是这样做的。

Likewise, to deserialize, use the static `fromJson`
method of the `ChatMessage` class:



要查看实际应用，请查看 [recipes 示例应用][recipes example app]。

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



## 自定义样式

// set the history on the controller
  _provider.history = history;
}
```



聊天视图开箱即用，提供了一组默认样式，
包括背景、文本字段、按钮、图标、建议等。
你可以通过使用 `LlmChatView` 构造函数的 `style` 参数
设置你自己的样式来完全自定义这些样式：

To ensure fast turnaround when serializing,
we recommend only writing each user message once.
Otherwise, the user must wait for your app to
write every message every time and,
in the face of binary attachments,
that could take a while.



例如，[custom styles 示例应用][custom-ex]
使用此功能实现了一个万圣节主题的应用：

To see this in action, check out the [history example app][].



![万圣节主题演示应用](/assets/images/docs/ai-toolkit/demo-app.png)

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart

## Custom response widgets



有关 `LlmChatViewStyle` 类中可用样式的完整列表，
请查看[参考文档][reference documentation]。
要查看自定义样式的实际应用，
除了 [custom styles 示例][custom-ex]外，
还可以查看 [dark mode 示例][dark mode example]和[演示应用][demo app]。

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



## 无 UI 聊天

![Add recipe button](/assets/images/docs/ai-toolkit/add-recipe-button.png)



你不必使用聊天视图来访问底层 provider 的功能。
除了能够简单地使用它提供的任何专有接口调用它之外，
你还可以使用 [LlmProvider 接口][LlmProvider interface]。

This is accomplished by setting the `responseBuilder`
parameter of the `LlmChatView` constructor:



例如，recipes 示例应用在编辑食谱的页面上提供了一个魔法按钮。
该按钮的目的是使用你当前的食物偏好更新数据库中的现有食谱。
按下按钮可以让你预览推荐的更改，并决定是否要应用它们：

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



![用户决定是否更新数据库中的食谱](/assets/images/docs/ai-toolkit/apply-changes-decision.png)

```dart
class RecipeResponseView extends StatelessWidget {
  const RecipeResponseView(this.response, {super.key});
  final String response;

@override
  Widget build(BuildContext context) {
    final children = <Widget>[];
    String? finalText;



Edit Recipe 页面不是使用应用聊天部分使用的同一个 provider
（这会将多余的用户消息和 LLM 响应插入用户的聊天历史中），
而是创建自己的 provider 并直接使用它：

// created with the response from the LLM as the response streams in, so
    // many not be a complete response yet
    try {
      final map = jsonDecode(response);
      final recipesWithText = map['recipes'] as List<dynamic>;
      finalText = map['text'] as String?;



对 `sendMessageStream` 的调用会在 provider 的历史记录中创建条目，
但由于它没有与聊天视图关联，因此不会显示。
如果方便的话，你也可以通过调用 `generateStream` 来实现同样的目的，
这允许你重用现有的 provider 而不影响聊天历史。

for (final recipeWithText in recipesWithText) {
        // extract the text before the recipe
        final text = recipeWithText['text'] as String?;
        if (text != null && text.isNotEmpty) {
          children.add(MarkdownBody(data: text));
        }



要查看实际应用，
请查看 recipes 示例的 [Edit Recipe 页面][Edit Recipe page]。

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



## 重路由提示词

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



如果你想调试、记录或操作聊天视图与底层 provider 之间的连接，
可以通过实现 [`LlmStreamGenerator`][] 函数来完成。
然后将该函数通过 `messageSender` 参数传递给 `LlmChatView`：

...



这个示例记录了来回传递的用户提示词和 LLM 响应。
当提供函数作为 `messageSender` 时，调用底层 provider 是你的责任。
如果你不调用，它就不会收到消息。
此功能允许你执行高级操作，如动态路由到 provider 或检索增强生成 (RAG)。

return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: children,
    );
  }
}
```



要查看实际应用，请查看 [logging 示例应用][logging example app]。

This code parses the text to extract introductory text
and the recipe from the LLM, bundling them together
with an **Add Recipe** button to show in place of the Markdown.

Notice that we're parsing the LLM response as JSON.
It's common to set the provider into JSON mode and
to provide a schema to restrict the format of its responses
to ensure that we've got something we can parse.
Each provider exposes this functionality in its own way,
but both the `GeminiProvider` and `VertexProvider` classes
enable this with a `GenerationConfig` object that the
recipes example uses as follows:

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

To see this in action, check out the [recipes example app][].

## Custom styling

The chat view comes out of the box with a set of default styles
for the background, the text field, the buttons, the icons,
the suggestions, and so on. You can fully customize those
styles by setting your own by using the `style` parameter to the
`LlmChatView` constructor:

```dart
LlmChatView(
  provider: GeminiProvider(...),
  style: LlmChatViewStyle(...),
),
```

For example, the [custom styles example app][custom-ex]
uses this feature to implement an app with a Halloween theme:

![Halloween-themed demo app](/assets/images/docs/ai-toolkit/demo-app.png)

For a complete list of the styles available in the
`LlmChatViewStyle` class, check out the [reference documentation][].
To see custom styles in action,
in addition to the [custom styles example][custom-ex],
check out the [dark mode example][] and the [demo app][].

[custom-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/custom_styles/custom_styles.dart
[dark mode example]: {{site.github}}/flutter/ai/blob/main/example/lib/dark_mode/dark_mode.dart
[demo app]: {{site.github}}/flutter/ai#online-demo
[reference documentation]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatViewStyle-class.html

## Chat without UI

You don't have to use the chat view to access the
functionality of the underlying provider.
In addition to being able to simply call it with
whatever proprietary interface it provides,
you can also use it with the [LlmProvider interface][].

[LlmProvider interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

As an example, the recipes example app provides a
Magic button on the page for editing recipes.
The purpose of that button is to update an existing recipe
in your database with your current food preferences.
Pressing the button allows you to preview the recommended changes and
decide whether you'd like to apply them or not:

![User decides whether to update recipe in database](/assets/images/docs/ai-toolkit/apply-changes-decision.png)

Instead of using the same provider that the chat portion
of the app uses, which would insert spurious user messages
and LLM responses into the user's chat history,
the Edit Recipe page instead creates its own provider
and uses it directly:

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

To see this in action,
check out the [Edit Recipe page][] of the recipes example.

[Edit Recipe page]: {{site.github}}/flutter/ai/blob/main/example/lib/recipes/pages/edit_recipe_page.dart

## Rerouting prompts

If you'd like to debug, log, or manipulate the connection
between the chat view and the underlying provider,
you can do so with an implementation of an [`LlmStreamGenerator`][] function.
You then pass that function to the `LlmChatView` in the
`messageSender` parameter:

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

To see this in action, check out the [logging example app][].

[logging example app]: {{site.github}}/flutter/ai/blob/main/example/lib/logging/logging.dart
