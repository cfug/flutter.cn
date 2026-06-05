---
# title: GenUI SDK main components and concepts
title: GenUI SDK 主要组件与概念
# sidenav: ai
sidenav: ai
# breadcrumb: Main components & concepts
breadcrumb: 主要组件与概念
# description: >-
#   Familiarize yourself with the main components and concepts of the
#   Flutter for GenUI SDK.
description: >-
  熟悉适用于 Flutter 的 GenUI SDK 的主要组件与概念。
prev:
  # title: GenUI SDK overview
  title: GenUI SDK 概览
  path: /ai/genui
next:
  # title: Get started with the GenUI SDK
  title: GenUI SDK 入门
  path: /ai/genui/get-started
ai-translated: true
---

:::experimental
The `genui` package is in
alpha and is likely to change.
:::

:::experimental
`genui` 包处于 alpha 阶段，可能会变更。
:::

## Main components

## 主要组件

The [`genui`][] package is built around the following main components:

[`genui`][] 包围绕以下主要组件构建：

`Conversation`
: The primary facade and entry point for the package.
  It includes the `SurfaceController` class,
  manages the conversation history,
  and orchestrates the entire generative UI process.

`Conversation`
: 包的主要门面与入口。包含 `SurfaceController` 类，管理对话历史，并编排整个生成式 UI 流程。

`Catalog`
: A collection of `CatalogItem` objects that defines
  the set of widgets that the AI is allowed to use.
  The `SurfaceController` supports multiple catalogs,
  allowing you to organize your widgets into logical groups.
  Each `CatalogItem` specifies a widget's name (for the AI
  to reference), a data schema for its properties, and a
  builder function to render the Flutter widget.

`Catalog`
: `CatalogItem` 对象的集合，定义 AI 允许使用的 widget 集。`SurfaceController` 支持多个 catalog，便于将 widget 组织成逻辑分组。每个 `CatalogItem` 指定 widget 名称（供 AI 引用）、属性数据 schema，以及渲染 Flutter widget 的 builder 函数。

`DataModel`
: A centralized, observable store for all dynamic UI state.
  Widgets are _bound_ to data in this model. When data changes,
  only the widgets that depend on that specific piece of data are rebuilt.

`DataModel`
: 所有动态 UI 状态的集中、可观察存储。widget _绑定_ 到该模型中的数据；数据变化时，仅依赖该数据的 widget 会重建。

`A2uiTransportAdapter`
: A bridge that parses raw text streams coming from your LLM into
  `A2uiMessage` commands for the `SurfaceController`.

`A2uiTransportAdapter`
: 将来自 LLM 的原始文本流解析为供 `SurfaceController` 使用的 `A2uiMessage` 命令的桥梁。

`A2uiMessage`
: A message sent from the AI
  (parsed by the `A2uiTransportAdapter`) to the UI,
  instructing it to perform actions like `createSurface`,
  `surfaceUpdate`, `dataModelUpdate`, or `deleteSurface`.

`A2uiMessage`
: 由 AI 发送（经 `A2uiTransportAdapter` 解析）给 UI 的消息，指示其执行 `createSurface`、`surfaceUpdate`、`dataModelUpdate` 或 `deleteSurface` 等操作。

`SurfaceController`
: Handles the processing of `A2uiMessage`s,
  manages the `DataModel`, and maintains the state of UI surfaces.

`SurfaceController`
: 处理 `A2uiMessage`，管理 `DataModel`，并维护 UI surface 的状态。


## How it works

## 工作原理

The `Conversation` manages the interaction cycle:

`Conversation` 管理交互周期：

 1. **User input**

    The user provides a prompt (for example, through a text field).
    The app calls `conversation.sendMessage()`.

 **用户输入**

    用户提供提示词（例如通过文本字段）。应用调用 `conversation.sendMessage()`。

 2. **AI invocation**

    The `Conversation` sends the user's message to the LLM SDK.

 **AI 调用**

    `Conversation` 将用户消息发送给 LLM SDK。

 3. **AI response**

    The LLM, guided by the widget schemas provided in its system prompt,
    sends back responses.

 **AI 响应**

    LLM 在其系统提示词提供的 widget schema 引导下返回响应。

 4. **Stream handling**

    The text stream from the LLM SDK is fed into the `A2uiTransportAdapter`.

 **流式传输处理**

    LLM SDK 的文本流输入 `A2uiTransportAdapter`。

 5. **UI state update**

    `A2uiMessages` parsed by the adapter are passed to
    `SurfaceController.handleMessage()`, which updates
    the UI state and `DataModel`.

 **UI 状态更新**

    适配器解析的 `A2uiMessages` 传给 `SurfaceController.handleMessage()`，更新 UI 状态与 `DataModel`。

 6. **UI rendering**

    The `SurfaceController` broadcasts an update,
    and any `Surface` widgets listening for that surface ID will rebuild.
    Widgets are bound to the `DataModel`, so they update automatically
    when their data changes.

 **UI 渲染**

    `SurfaceController` 广播更新，监听该 surface ID 的 `Surface` widget 会重建。widget 绑定 `DataModel`，数据变化时自动更新。

 7. **Callbacks**

    Text responses and errors trigger callbacks on the `Conversation` or
    are handled by your specific LLM integration flow.

 **回调**

    文本响应与错误在 `Conversation` 上触发回调，或由你的 LLM 集成流程处理。

 8. **User interaction**

    The user interacts with the newly generated UI
    (for example, by typing in a text field). This interaction directly
    updates the `DataModel`. If the interaction is an action (like a button click),
    the `Surface` captures the event and forwards it to the
    `SurfaceController`, which automatically creates
    a new `UserMessage` containing the current state of the data model
    and restarts the cycle.

 **用户交互**

    用户与新生的 UI 交互（例如在文本字段中输入）。交互直接更新 `DataModel`。若为操作（如按钮点击），`Surface` 捕获事件并转发给 `SurfaceController`，后者自动创建包含数据模型当前状态的 `UserMessage` 并重启周期。

{:.steps}

For more detailed information on the implementation of GenUI SDK for Flutter,
check out the [design doc][].

有关适用于 Flutter 的 GenUI SDK 实现的更多细节，请参阅[设计文档][design doc]。

The next section walks you through adding `genui` to your app.

下一节将引导你把 `genui` 加入应用。

[design doc]: {{site.repo.organization}}/genui/blob/main/packages/genui/DESIGN.md
[`genui`]: {{site.pub-pkg}}/genui
