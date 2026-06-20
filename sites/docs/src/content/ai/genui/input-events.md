---
# title: Input and events
title: 输入与事件
sidenav: ai
# description: How input and events are handled in GenUI applications.
description: GenUI 应用中如何处理输入与事件。
prev:
  # title: Get started with the GenUI SDK for Flutter
  title: GenUI SDK 入门
  path: /ai/genui/get-started
ai-translated: true
---

This guide explains how user interactions are handled
within the GenUI package, from the initial widget
interaction to the AI agent receiving the event.

本指南说明 GenUI package 中如何处理用户交互，
从最初 widget 交互到 AI 智能体接收事件。

:::experimental
The `genui` package is in alpha and is likely to change.

`genui` package 处于 alpha 阶段，可能会变更。
:::

## Overview

## 概览

In the GenUI architecture, the UI is driven by the AI,
but user interactions (like clicking a button or submitting a form)
must be communicated back to the AI agent.
This allows the agent to update the UI or perform actions
in response to user input.

在 GenUI 架构中，UI 由 AI 驱动，
但用户交互（如点击按钮或提交表单）必须传回 AI 智能体，
以便智能体根据用户输入更新 UI 或执行操作。

The flow of an event is as follows:

事件流程如下：

1. Interaction: User interacts with a widget;
   for example, the user taps a button.

   交互 (Interaction)：用户与 widget 交互；例如点击按钮。

2. Capture: The widget implementation dispatches a `UiEvent`.

   捕获 (Capture)：widget 实现派发 `UiEvent`。

3. Processing: The framework adds context
   (such as a `surfaceId` or data model values)
   and forwards the event.

   处理 (Processing)：框架添加上下文（如 `surfaceId` 或数据模型值）并转发事件。

4. Transmission: The Flutter widget generates the event,
   adds the appropriate context, and routes
   it to the AI through the `ContentGenerator`,
   which forwards it to the AI agent.

   传输 (Transmission)：Flutter widget 生成事件、添加上下文，
   经 `ContentGenerator` 路由到 AI，再转发给 AI 智能体。

## Defining events

## 定义事件

### Protocol level

### 协议层

The A2UI protocol defines an `action` message used to report events.
An `action` contains:

A2UI 协议定义用于上报事件的 `action` 消息。
`action` 包含：

* `name`: The name of the action
  (defined by the AI when generating the component).

  `name`：操作名称（由 AI 在生成 widget 时定义）。

* `surfaceId`: The ID of the UI surface where the event occurred.

  `surfaceId`：事件发生所在 UI surface 的 ID。

* `sourceComponentId`: The ID of the component that triggered the event.

  `sourceComponentId`：触发事件的 widget ID。

* `context`: A JSON object containing data relevant to the event.

  `context`：包含与事件相关数据的 JSON 对象。

* `timestamp`: When the event occurred.

  `timestamp`：事件发生时间。

### Dart implementation

### Dart 实现

In [`package:genui`][], user events are represented by the
`UiEvent` extension type and its concrete implementation
`UserActionEvent`.

在 [`package:genui`][] 中，
用户事件由 `UiEvent` extension type 及其实现 `UserActionEvent` 表示。

[`package:genui`]: {{site.pub-pkg}}/genui

The following structures are defined in
`lib/src/model/ui_models.dart`:

以下结构定义在 `lib/src/model/ui_models.dart`：

```dart title="lib/src/model/ui_models.dart"
/// A data object that represents a user interaction event in the UI.
extension type UiEvent.fromMap(JsonMap _json) { ... }

/// A UI event that represents a user action.
extension type UserActionEvent.fromMap(JsonMap _json) implements UiEvent {
  UserActionEvent({
    String? surfaceId,
    required String name,
    required String sourceComponentId,
    JsonMap? context,
    // ...
  }) : ...
}
```

```dart title="lib/src/model/ui_models.dart"
/// 表示 UI 中用户交互事件的数据对象。
extension type UiEvent.fromMap(JsonMap _json) { ... }

/// 表示用户操作的 UI 事件。
extension type UserActionEvent.fromMap(JsonMap _json) implements UiEvent {
  UserActionEvent({
    String? surfaceId,
    required String name,
    required String sourceComponentId,
    JsonMap? context,
    // ...
  }) : ...
}
```

## Capturing events in widgets

## 在 widget 中捕获事件

Widgets in GenUI are defined in a `Catalog`,
which includes information about what events
the widget can send to the AI.
The AI can then send
information about how to communicate those events back.
When you implement a custom widget (or use the standard widgets),
you use the `dispatchEvent` method in `CatalogItemContext`
to dispatch events.

GenUI 中的 widget 在 `Catalog` 中定义，
其中包含 widget 可向 AI 发送哪些事件的信息。
AI 随后可发送如何回传这些事件的说明。
实现自定义 widget（或使用标准 widget）时，
在 `CatalogItemContext` 中使用 `dispatchEvent` 派发事件。

### Example: Button implementation {: #button-example}

### 示例：Button 实现 {: #button-example}

The following example shows how a `Button` widget typically captures
a tap and dispatches an event. It retrieves the action definition
(provided by the AI) from its properties,
resolves any data bindings in the context, and sends the event.

以下示例展示 `Button` widget 通常如何捕获点击并派发事件：
从属性获取 AI 提供的 action 定义，解析上下文中的数据绑定，并发送事件。

```dart
// Inside a CatalogItem widgetBuilder:
widgetBuilder: (itemContext) {
  // 1. Extract action data from the component properties.
  final buttonData = _ButtonData.fromMap(itemContext.data as JsonMap);
  final JsonMap actionData = buttonData.action;
  final actionName = actionData['name'] as String;

  // 2. Extract context definition (which data to send back).
  final List<Object?> contextDefinition =
      (actionData['context'] as List<Object?>?) ?? <Object?>[];

  return ElevatedButton(
    onPressed: () {
      // 3. Resolve the context values from the data model.
      final JsonMap resolvedContext = resolveContext(
        itemContext.dataContext,
        contextDefinition,
      );

      // 4. Dispatch the event.
      itemContext.dispatchEvent(
        UserActionEvent(
          name: actionName,
          sourceComponentId: itemContext.id,
          context: resolvedContext,
        ),
      );
    },
    child: /* ... */
  );
},
```

## Event processing pipeline

## 事件处理流水线

Once `dispatchEvent` is called,
the event travels through the GenUI core layers.

调用 `dispatchEvent` 后，事件流经 GenUI 核心层。

### Surface

The `Surface` widget (in `lib/src/core/surface.dart`)
wraps the rendered widgets.
It provides the dispatchEvent callback implementation.

`Surface` widget（位于 `lib/src/core/surface.dart`）包装已渲染 widget，
提供 dispatchEvent 回调实现。

When `_dispatchEvent` is called:

调用 `_dispatchEvent` 时：

1. It automatically injects the `surfaceId` into the event,
   ensuring the AI knows which surface the interaction came from.

   自动将 `surfaceId` 注入事件，确保 AI 知道交互来自哪个 surface。

2. It delegates handling to the `SurfaceHost`
   (implemented by `SurfaceController`).

   将处理委托给 `SurfaceHost`（由 `SurfaceController` 实现）。

```dart
// Surface implementation details
void _dispatchEvent(UiEvent event) {
  // ...
  final Map<String, Object?> eventMap = {
    ...event.toMap(),
    surfaceIdKey: widget.surfaceId, // Inject surfaceId
  };
  final UiEvent newEvent = UserActionEvent.fromMap(eventMap);
  widget.host.handleUiEvent(newEvent);
}
```

### SurfaceController

The `SurfaceController` (in `lib/src/core/surface_controller.dart`)
is the central hub for managing UI state.

`SurfaceController`（位于 `lib/src/core/surface_controller.dart`）
是管理 UI 状态的中央枢纽。

When `handleUiEvent` is called, it does the following:

调用 `handleUiEvent` 时，它会：

1.  Verifies the event type.

    验证事件类型。

2.  Wraps the event in the `action` JSON envelope
   required by the protocol.

    用协议要求的 `action` JSON 信封包装事件。

3.  Emits a `UserUiInteractionMessage` on its `onSubmit` stream.

    在其 `onSubmit` 流上发出 `UserUiInteractionMessage`。

```dart
// SurfaceController implementation details
@override
void handleUiEvent(UiEvent event) {
  if (event is! UserActionEvent) return;

  // Wrap in protocol 'action' envelope
  final String eventJsonString = jsonEncode({'action': event.toMap()});

  // Emit for listeners (like Conversation)
  _onSubmit.add(UserUiInteractionMessage.text(eventJsonString));
}
```

## Transmission to AI

## 传输到 AI

The final step sends the event to the AI Agent.
This is typically handled by `Conversation`
(in `lib/src/facade/conversation.dart`).
The `Conversation` listens to the `onSubmit` stream
from the message processor.

最后一步将事件发送给 AI 智能体，
通常由 `Conversation`（位于 `lib/src/facade/conversation.dart`）处理。
`Conversation` 监听消息处理器的 `onSubmit` 流。

```dart
// Conversation constructor
_userEventSubscription = surfaceController.onSubmit.listen(sendRequest);
```

When an event is received, the `sendRequest` method:

收到事件时，`sendRequest` 方法会：

1. Wraps the `UserUiInteractionMessage` back to the developer's client code.

   将 `UserUiInteractionMessage` 包装回开发者客户端代码。

2. The custom integration or predefined transport adapter forwards
   the message to the LLM agent network transport.

   自定义集成或预定义传输适配器将消息转发到 LLM 智能体网络传输。

The AI Agent receives this JSON message, processes the user action,
and might stream back new `surfaceUpdate` or `dataModelUpdate` messages
to modify the UI, or some other action, completing the full interaction loop.

AI 智能体接收该 JSON 消息，处理用户操作，
并可能流式返回新的 `surfaceUpdate` 或 `dataModelUpdate` 消息以修改 UI，
或其他操作，完成完整交互循环。

