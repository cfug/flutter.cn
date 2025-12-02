---
title: Custom LLM providers
title: 自定义 LLM 提供者
description: >
  How to integrate with other Flutter features.
description: >
  如何与其他 Flutter 功能集成。
prev:
  title: Feature integration
  title: 功能集成
  path: /ai-toolkit/feature-integration
next:
  title: Chat client sample
  title: 聊天客户端示例
  path: /ai-toolkit/chat-client-sample
---

The protocol connecting an LLM and the `LlmChatView`
is expressed in the [`LlmProvider` interface][]:

连接 LLM 和 `LlmChatView` 的协议在 [`LlmProvider` 接口][] 中定义：

[`LlmProvider` 接口]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(String prompt, {Iterable<Attachment> attachments});
  Stream<String> sendMessageStream(String prompt, {Iterable<Attachment> attachments});
  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

The LLM could be in the cloud or local,
it could be hosted in the Google Cloud Platform
or on some other cloud provider,
it could be a proprietary LLM or open source.
Any LLM or LLM-like endpoint that can be used
to implement this interface can be plugged into
the chat view as an LLM provider. The AI Toolkit
comes with three providers out of the box,
all of which implement the `LlmProvider` interface
that is required to plug the provider into the following:

LLM 可以是云端的或本地的，可以托管在 Google Cloud Platform 或其他云服务商上，可以是专有的 LLM 或开源的。任何可以用来实现此接口的 LLM 或类似 LLM 的端点都可以作为 LLM 提供者插入到聊天视图中。AI Toolkit 开箱即用地提供了三个提供者，它们都实现了 `LlmProvider` 接口，这是将提供者插入到以下内容所需的：

* The [Gemini provider][],
  which wraps the `google_generative_ai` package

  [Gemini 提供者][]，它封装了 `google_generative_ai` 包
* The [Vertex provider][],
  which wraps the `firebase_vertexai` package

  [Vertex 提供者][]，它封装了 `firebase_vertexai` 包
* The [Echo provider][],
  which is useful as a minimal provider example

  [Echo 提供者][]，作为最小化的提供者示例很有用

[Echo provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/EchoProvider-class.html
[Echo 提供者]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/EchoProvider-class.html
[Gemini provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/GeminiProvider-class.html
[Gemini 提供者]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/GeminiProvider-class.html
[Vertex provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/VertexProvider-class.html
[Vertex 提供者]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/VertexProvider-class.html

## Implementation

## 实现

To build your own provider, you need to implement
the `LlmProvider` interface with these things in mind:

要构建你自己的提供者，你需要实现 `LlmProvider` 接口，并牢记以下几点：

1. Providing for full configuration support

   提供完整的配置支持
1. Handling history

   处理历史记录
1. Translating messages and attachments to the underlying LLM

   将消息和附件转换为底层 LLM 的格式
1. Calling the underlying LLM

   调用底层 LLM

1. Configuration
   To support full configurability in your custom provider,
   you should allow the user to create the underlying model
   and pass that in as a parameter, as the Gemini provider does:

   配置
   为了在自定义提供者中支持完整的可配置性，你应该允许用户创建底层模型并将其作为参数传入，就像 Gemini 提供者所做的那样：

```dart
class GeminiProvider extends LlmProvider ... {
  @immutable
  GeminiProvider({
    required GenerativeModel model,
    ...
  })  : _model = model,
        ...

  final GenerativeModel _model;
  ...
}
```

In this way, no matter what changes come
to the underlying model in the future,
the configuration knobs will all be available
to the user of your custom provider.

通过这种方式，无论底层模型未来发生什么变化，配置选项都将对你的自定义提供者的用户可用。

2. History
  History is a big part of any provider—not only
  does the provider need to allow history to be
  manipulated directly, but it has to notify listeners
  as it changes. In addition, to support serialization
  and changing provider parameters, it must also support
  saving history as part of the construction process.

  The Gemini provider handles this as shown:

  历史记录
  历史记录是任何提供者的重要组成部分——提供者不仅需要允许直接操作历史记录，还必须在历史记录发生变化时通知监听器。此外，为了支持序列化和更改提供者参数，它还必须支持在构造过程中保存历史记录。

  Gemini 提供者如下所示处理这个问题：

```dart
class GeminiProvider extends LlmProvider with ChangeNotifier {
  @immutable
  GeminiProvider({
    required GenerativeModel model,
    Iterable<ChatMessage>? history,
    ...
  })  : _model = model,
        _history = history?.toList() ?? [],
        ... { ... }

  final GenerativeModel _model;
  final List<ChatMessage> _history;
  ...

  @override
  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments = const [],
  }) async* {
    final userMessage = ChatMessage.user(prompt, attachments);
    final llmMessage = ChatMessage.llm();
    _history.addAll([userMessage, llmMessage]);

    final response = _generateStream(
      prompt: prompt,
      attachments: attachments,
      contentStreamGenerator: _chat!.sendMessageStream,
    );

    yield* response.map((chunk) {
      llmMessage.append(chunk);
      return chunk;
    });

    notifyListeners();
  }

  @override
  Iterable<ChatMessage> get history => _history;

  @override
  set history(Iterable<ChatMessage> history) {
    _history.clear();
    _history.addAll(history);
    _chat = _startChat(history);
    notifyListeners();
  }

  ...
}
```

You'll notice several things in this code:

你会在这段代码中注意到以下几点：

* The use of `ChangeNotifier` to implement the `Listenable`
  method requirements from the `LlmProvider` interface

  使用 `ChangeNotifier` 来实现 `LlmProvider` 接口中 `Listenable` 的方法要求
* The ability to pass initial history in as a constructor parameter

  可以将初始历史记录作为构造函数参数传入
* Notifying listeners when there's a new user
  prompt/LLM response pair

  在有新的用户提示/LLM 响应对时通知监听器
* Notifying listeners when the history is changed manually

  在手动更改历史记录时通知监听器
* Creating a new chat when the history changes, using the new history

  当历史记录更改时使用新历史记录创建新的聊天

Essentially, a custom provider manages the history
for a single chat session with the underlying LLM.
As the history changes, the underlying chat either
needs to be kept up to date automatically
(as the Gemini AI SDK for Dart does when you call
the underlying chat-specific methods) or manually recreated
(as the Gemini provider does whenever the history is set manually).

本质上，自定义提供者管理与底层 LLM 的单个聊天会话的历史记录。随着历史记录的变化，底层聊天需要自动保持最新（就像当你调用底层聊天特定方法时 Gemini AI SDK for Dart 所做的那样）或手动重新创建（就像每当手动设置历史记录时 Gemini 提供者所做的那样）。

3. Messages and attachments

   消息和附件

Attachments must be mapped from the standard
`ChatMessage` class exposed by the `LlmProvider`
type to whatever is handled by the underlying LLM.
For example, the Gemini provider maps from the
`ChatMessage` class from the AI Toolkit to the
`Content` type provided by the Gemini AI SDK for Dart,
as shown in the following example:

附件必须从 `LlmProvider` 类型公开的标准 `ChatMessage` 类映射到底层 LLM 处理的任何内容。例如，Gemini 提供者将 AI Toolkit 的 `ChatMessage` 类映射到 Gemini AI SDK for Dart 提供的 `Content` 类型，如下例所示：

```dart
import 'package:google_generative_ai/google_generative_ai.dart';
...

class GeminiProvider extends LlmProvider with ChangeNotifier {
  ...
  static Part _partFrom(Attachment attachment) => switch (attachment) {
        (final FileAttachment a) => DataPart(a.mimeType, a.bytes),
        (final LinkAttachment a) => FilePart(a.url),
      };

  static Content _contentFrom(ChatMessage message) => Content(
        message.origin.isUser ? 'user' : 'model',
        [
          TextPart(message.text ?? ''),
          ...message.attachments.map(_partFrom),
        ],
      );
}
```

The `_contentFrom` method is called whenever a user prompt
needs to be sent to the underlying LLM.
Every provider needs to provide for its own mapping.

每当需要将用户提示发送到底层 LLM 时，就会调用 `_contentFrom` 方法。每个提供者都需要提供自己的映射。

4. Calling the LLM

   调用 LLM

How you call the underlying LLM to implement
`generateStream` and `sendMessageStream` methods
depends on the protocol it exposes.
The Gemini provider in the AI Toolkit
handles configuration and history but calls to
`generateStream` and `sendMessageStream` each
end up in a call to an API from the Gemini AI SDK for Dart:

如何调用底层 LLM 来实现 `generateStream` 和 `sendMessageStream` 方法取决于它公开的协议。AI Toolkit 中的 Gemini 提供者处理配置和历史记录，但对 `generateStream` 和 `sendMessageStream` 的调用最终都会调用 Gemini AI SDK for Dart 的 API：

```dart
class GeminiProvider extends LlmProvider with ChangeNotifier {
  ...

  @override
  Stream<String> generateStream(
    String prompt, {
    Iterable<Attachment> attachments = const [],
  }) =>
      _generateStream(
        prompt: prompt,
        attachments: attachments,
        contentStreamGenerator: (c) => _model.generateContentStream([c]),
      );

  @override
  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments = const [],
  }) async* {
    final userMessage = ChatMessage.user(prompt, attachments);
    final llmMessage = ChatMessage.llm();
    _history.addAll([userMessage, llmMessage]);

    final response = _generateStream(
      prompt: prompt,
      attachments: attachments,
      contentStreamGenerator: _chat!.sendMessageStream,
    );

    yield* response.map((chunk) {
      llmMessage.append(chunk);
      return chunk;
    });

    notifyListeners();
  }

  Stream<String> _generateStream({
    required String prompt,
    required Iterable<Attachment> attachments,
    required Stream<GenerateContentResponse> Function(Content)
        contentStreamGenerator,
  }) async* {
    final content = Content('user', [
      TextPart(prompt),
      ...attachments.map(_partFrom),
    ]);

    final response = contentStreamGenerator(content);
    yield* response
        .map((chunk) => chunk.text)
        .where((text) => text != null)
        .cast<String>();
  }

  @override
  Iterable<ChatMessage> get history => _history;

  @override
  set history(Iterable<ChatMessage> history) {
    _history.clear();
    _history.addAll(history);
    _chat = _startChat(history);
    notifyListeners();
  }
}
```

## Examples

## 示例

The [Gemini provider][] and [Vertex provider][]
implementations are nearly identical and provide
a good starting point for your own custom provider.
If you'd like to see an example provider implementation with
all of the calls to the underlying LLM stripped away,
check out the [Echo example app][], which simply formats
the user's prompt and attachments as Markdown
to send back to the user as its response.

[Gemini 提供者][] 和 [Vertex 提供者][] 的实现几乎相同，为你自己的自定义提供者提供了一个很好的起点。如果你想看一个剥离了所有对底层 LLM 调用的提供者实现示例，请查看 [Echo 示例应用][]，它只是将用户的提示和附件格式化为 Markdown 并将其作为响应发送回用户。

[Echo example app]: {{site.github}}/flutter/ai/blob/main/lib/src/providers/implementations/echo_provider.dart
[Echo 示例应用]: {{site.github}}/flutter/ai/blob/main/lib/src/providers/implementations/echo_provider.dart
