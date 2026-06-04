---
# title: Custom LLM providers
title: 自定义 LLM 提供商
# sidenav: ai
sidenav: ai
# description: >
#   How to integrate with other Flutter features.
description: >
  如何与其他 Flutter 功能集成。
# prev:
#   title: Feature integration
#   path: /ai/ai-toolkit/feature-integration
# next:
#   title: Chat client sample
#   path: /ai/ai-toolkit/chat-client-sample
prev:
  title: 功能集成
  path: /ai/ai-toolkit/feature-integration
next:
  title: 聊天客户端示例
  path: /ai/ai-toolkit/chat-client-sample
ai-translated: true
---

The protocol connecting an LLM and the `LlmChatView` is expressed in the
[`LlmProvider` interface][]:

连接 LLM 与 `LlmChatView` 的协议由 [`LlmProvider` 接口][`LlmProvider` interface] 表达：

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(String prompt, {Iterable<Attachment> attachments});
  Stream<String> sendMessageStream(String prompt, {Iterable<Attachment> attachments});
  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

LLM could be in the cloud or local,
it could be hosted in the Google Cloud Platform
or on some other cloud provider,
it could be a proprietary LLM or open source.
Any LLM or LLM-like endpoint that can be used
to implement this interface can be plugged into
the chat view as an LLM provider. The AI Toolkit
comes with two providers out of the box,
both of which implement the `LlmProvider` interface
that is required to plug the provider into the following:

LLM 可在云端或本地，
可托管于 Google Cloud Platform 或其他云提供商，
可以是专有或开源 LLM。
任何可实现该接口的 LLM 或类 LLM 端点都可作为 LLM 提供商接入聊天视图。
AI 工具包自带两个提供商，均实现接入所需的 `LlmProvider` 接口：

* The [Firebase AI Logic provider][],
  which wraps the `firebase_ai` package

  [Firebase AI Logic 提供商][Firebase AI Logic provider]，封装 `firebase_ai` 软件包

* The [Echo provider][],
  which is useful as a minimal provider example

  [Echo 提供商][Echo provider]，可作为最简提供商示例

[Echo provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/EchoProvider-class.html
[`LlmProvider` interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html
[Firebase AI Logic provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/FirebaseProvider-class.html

## Implementation

## 实现

To build your own provider, you need to implement the `LlmProvider` interface
with these things in mind:

构建自有提供商时，实现 `LlmProvider` 接口需注意：

1. Providing for full configuration support

   提供完整配置支持

1. Handling history

   处理历史记录

1. Translating messages and attachments to the underlying LLM

   将消息与附件转换为底层 LLM 格式

1. Calling the underlying LLM

   调用底层 LLM

1. Configuration
   To support full configurability in your custom provider,
   you should allow the user to create the underlying model
   and pass that in as a parameter, as the MyLlmProvider does:

   配置
   要在自定义提供商中支持完整可配置性，
   应允许用户创建底层模型并作为参数传入，如 `MyLlmProvider`：

```dart
class MyLlmProvider extends LlmProvider ... {
  @immutable
  MyLlmProvider({
    required GenerativeModel model,
    ...
  })  : _model = model,
        ...

  final GenerativeModel _model;
  ...
}
```

In this way, no matter what changes come to the underlying model in the future,
the configuration knobs will all be available to the user of your custom
provider.

这样无论底层模型未来如何变化，
自定义提供商的用户仍可使用全部配置项。

2. History

   History is a big part of any provider—not only does the provider need
   to allow history to be manipulated directly, but it has to notify listeners as
   it changes. In addition, to support serialization and changing provider
   parameters, it must also support saving history as part of the construction
   process.

   历史记录

   历史记录是任何提供商的重要部分——不仅需支持直接操作历史，还须在变更时通知监听者。
   此外，为支持序列化与更改提供商参数，构造过程中还须支持保存历史。

The Firebase provider handles this as shown:

Firebase 提供商的处理方式如下：

```dart
class MyLlmProvider extends LlmProvider with ChangeNotifier {
  @immutable
  MyLlmProvider({
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

你会注意到代码中的几点：

* The use of `ChangeNotifier` to implement the `Listenable` method requirements
  from the `LlmProvider` interface

  使用 `ChangeNotifier` 实现 `LlmProvider` 接口对 `Listenable` 的要求

* The ability to pass initial history in as a constructor parameter

  可将初始历史作为构造参数传入

* Notifying listeners when there's a new user prompt/LLM response pair

  出现新的用户提示词/LLM 回复对时通知监听者
* Notifying listeners when the history is changed manually

  手动更改历史时通知监听者

* Creating a new chat when the history changes, using the new history

  历史变更时用新历史创建新聊天

Essentially, a custom provider manages the history
for a single chat session with the underlying LLM.
As the history changes, the underlying chat either
needs to be kept up to date automatically
(as the Firebase provider does when you call
the underlying chat-specific methods) or manually recreated
(as the Firebase provider does whenever the history is set manually).

本质上，自定义提供商管理单次聊天会话与底层 LLM 的历史。
历史变更时，底层聊天需自动保持同步
（如 Firebase 提供商在调用聊天专用方法时），或手动重建
（如 Firebase 提供商在手动设置历史时）。

3. Messages and attachments

   消息与附件

Attachments must be mapped from the standard
`ChatMessage` class exposed by the `LlmProvider`
type to whatever is handled by the underlying LLM.
For example, the Firebase provider maps from the
`ChatMessage` class from the AI Toolkit to the
`Content` type provided by the Firebase Logic AI SDK,
as shown in the following example:

附件必须从 `LlmProvider` 暴露的标准 `ChatMessage` 类
映射到底层 LLM 所处理的类型。
例如，Firebase 提供商将 AI 工具包的 `ChatMessage` 映射为
Firebase Logic AI SDK 的 `Content` 类型，如下所示：

```dart
import 'package:firebase_ai/firebase_ai.dart';
...

class MyLlmProvider extends LlmProvider with ChangeNotifier {
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

The `_contentFrom` method is called whenever a user prompt needs to be sent to
the underlying LLM. Every provider needs to provide for its own mapping.

每当需要向底层 LLM 发送用户提示词时会调用 `_contentFrom` 方法。
每个提供商都需自行实现映射。

4. Calling the LLM

   调用 LLM

How you call the underlying LLM to implement
`generateStream` and `sendMessageStream` methods
depends on the protocol it exposes.
The Firebase provider in the AI Toolkit
handles configuration and history but calls to
`generateStream` and `sendMessageStream` each
end up in a call to an API from the Firebase Logic AI SDK:

如何实现 `generateStream` 与 `sendMessageStream` 取决于底层 LLM 暴露的协议。
AI 工具包中的 Firebase 提供商处理配置与历史，
但对 `generateStream` 与 `sendMessageStream` 的调用最终都会落到 Firebase Logic AI SDK 的 API：

```dart
class MyLlmProvider extends LlmProvider with ChangeNotifier {
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

The [Firebase provider][] 
implementation provides
a good starting point for your own custom provider.
If you'd like to see an example provider implementation with
all of the calls to the underlying LLM stripped away,
check out the [Echo example app][], which simply formats
the user's prompt and attachments as Markdown
to send back to the user as its response.

[Firebase 提供商][Firebase provider] 实现是构建自定义提供商的良好起点。
若想看去掉所有底层 LLM 调用的示例实现，
请参阅 [Echo 示例应用][Echo example app]：它将用户提示词与附件格式化为 Markdown 作为回复返回。

[Echo example app]:
    {{site.github}}/flutter/ai/blob/main/lib/src/providers/implementations/echo_provider.dart
[Firebase provider]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/FirebaseProvider-class.html
