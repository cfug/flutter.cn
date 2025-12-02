---
title: 自定义 LLM provider
description: >
  How to integrate with other Flutter features.
prev:
  title: Feature integration
  path: /ai-toolkit/feature-integration
next:
  title: Chat client sample
  path: /ai-toolkit/chat-client-sample
---

连接 LLM 和 `LlmChatView` 的协议在 [`LlmProvider` 接口][`LlmProvider` interface]中表达：

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(String prompt, {Iterable<Attachment> attachments});
  Stream<String> sendMessageStream(String prompt, {Iterable<Attachment> attachments});
  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

LLM 可以在云端或本地，
可以托管在 Google Cloud Platform 或其他云提供商上，
可以是专有的 LLM 或开源的。
任何可用于实现此接口的 LLM 或类 LLM 端点
都可以作为 LLM provider 接入聊天视图。
AI Toolkit 开箱即提供三个 provider，
它们都实现了将 provider 接入以下内容所需的 `LlmProvider` 接口：

* [Gemini provider][]，封装了 `google_generative_ai` package
* [Vertex provider][]，封装了 `firebase_vertexai` package
* [Echo provider][]，作为最小 provider 示例很有用

[Echo provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/EchoProvider-class.html
[Gemini provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/GeminiProvider-class.html
[`LlmProvider` interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html
[Vertex provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/VertexProvider-class.html

## 实现

要构建你自己的 provider，你需要在实现 `LlmProvider` 接口时考虑以下几点：

1. 提供完整的配置支持
1. 处理历史记录
1. 将消息和附件转换为底层 LLM 的格式
1. 调用底层 LLM

1. 配置
   要在自定义 provider 中支持完整的可配置性，
   你应该允许用户创建底层模型并将其作为参数传入，
   就像 Gemini provider 所做的那样：

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

这样，无论底层模型将来发生什么变化，
所有配置选项都将对你的自定义 provider 的用户可用。

2. 历史记录
  历史记录是任何 provider 的重要组成部分——
  provider 不仅需要允许直接操作历史记录，
  而且必须在历史记录更改时通知监听器。
  此外，为了支持序列化和更改 provider 参数，
  它还必须支持在构造过程中保存历史记录。

  Gemini provider 如下所示处理这个问题：

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

你会在这段代码中注意到几件事：
* 使用 `ChangeNotifier` 来实现 `LlmProvider` 接口中 `Listenable` 的方法要求
* 能够将初始历史记录作为构造函数参数传入
* 当有新的用户提示词/LLM 响应对时通知监听器
* 当历史记录被手动更改时通知监听器
* 当历史记录更改时，使用新的历史记录创建新的聊天

本质上，自定义 provider 管理与底层 LLM 的单个聊天会话的历史记录。
当历史记录更改时，底层聊天要么需要自动保持最新
（就像 Dart 的 Gemini AI SDK 在你调用底层聊天特定方法时所做的那样），
要么需要手动重新创建
（就像 Gemini provider 在手动设置历史记录时所做的那样）。

3. 消息和附件

附件必须从 `LlmProvider` 类型暴露的标准 `ChatMessage` 类
映射到底层 LLM 处理的任何内容。
例如，Gemini provider 从 AI Toolkit 的 `ChatMessage` 类
映射到 Dart 的 Gemini AI SDK 提供的 `Content` 类型，
如以下示例所示：

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

`_contentFrom` 方法在需要将用户提示词发送到底层 LLM 时被调用。
每个 provider 都需要提供自己的映射。

4. 调用 LLM

你如何调用底层 LLM 来实现 `generateStream` 和 `sendMessageStream` 方法
取决于它暴露的协议。
AI Toolkit 中的 Gemini provider 处理配置和历史记录，
但对 `generateStream` 和 `sendMessageStream` 的调用
最终都会调用 Dart 的 Gemini AI SDK 的 API：

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

## 示例

[Gemini provider][] 和 [Vertex provider][] 的实现几乎相同，
为你自己的自定义 provider 提供了一个很好的起点。
如果你想查看一个去除了所有底层 LLM 调用的示例 provider 实现，
请查看 [Echo 示例应用][Echo example app]，
它只是将用户的提示词和附件格式化为 Markdown 作为响应发送回用户。

[Echo example app]: {{site.github}}/flutter/ai/blob/main/lib/src/providers/implementations/echo_provider.dart
