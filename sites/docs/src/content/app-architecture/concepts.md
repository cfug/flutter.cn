---
# title: Common architecture concepts
title: 常见架构概念
# shortTitle: Architecture concepts
shortTitle: 架构概念
# description: >
#   Learn about common architecture concepts in application design,
#   and how they apply to Flutter.
description: >
  了解应用设计中的常见架构概念及其在 Flutter 中的运用。
# prev:
#     title: Architecting Flutter apps
#     path: /app-architecture
prev:
    title: 构建 Flutter 应用架构
    path: /app-architecture
# next:
#     title: Guide to app architecture
#     path: /app-architecture/guide
next:
    title: 应用架构指南
    path: /app-architecture/guide
ai-translated: true
---

In this section, you'll find tried and true principles that guide architectural
decisions in the larger world of app development,
as well as information about how they fit into Flutter specifically.
It's a gentle introduction to vocabulary and concepts related to
the recommended architecture and best practices,
so they can be explored in more detail throughout this guide.

在本节中，你将找到指导更广泛应用开发领域架构决策的成熟原则，
以及它们如何具体适用于 Flutter 的说明。
这是对推荐架构与最佳实践相关术语与概念的温和入门，
以便在本指南其余部分深入探讨。

## Separation of concerns

## 关注点分离

[Separation-of-concerns][] is a core principle in app development that
promotes modularity and maintainability by dividing an application's
functionality into distinct, self-contained units. From a high-level,
this means separating your UI logic from your business logic.
This is often described as *layered* architecture.
Within each layer, you should further separate your application by
feature or functionality. For example, your application's authentication logic
should be in a different class than the search logic.

[关注点分离][Separation-of-concerns] 是应用开发的核心原则，
通过将应用功能划分为彼此独立、自包含的单元来提升模块化与可维护性。
从宏观上看，这意味着将 UI 逻辑与业务逻辑分开，
通常称为*分层*架构。
在各层内部，还应按功能或特性进一步拆分应用。
例如，应用的认证逻辑应与搜索逻辑放在不同的类中。

In Flutter, this applies to [widgets](/resources/glossary#widget) in the UI layer as well. You should write
reusable, lean widgets that hold as little logic as possible.

在 Flutter 中，这也适用于 UI 层中的 [widget](/resources/glossary#widget)。
你应编写可复用、精简、尽可能少包含逻辑的 widget。

## Layered architecture

## 分层架构

Flutter applications should be written in *layers*. Layered architecture is a
software design pattern that organizes an application into distinct layers, each
with specific roles and responsibilities. Typically, applications are separated
into 2 to 3 layers, depending on complexity.

Flutter 应用应按*层*编写。分层架构是一种软件设计模式，
将应用组织为职责明确的若干层。通常根据复杂度分为 2 到 3 层。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-icons.png' alt="The three common layers of app architecture, the UI layer, logic layer, and data layer.">

* **UI layer** - Displays data to the user that is exposed by the business logic
  layer, and handles user interaction. This is also commonly referred to as the
  "presentation layer".

  **UI 层** — 向用户展示业务逻辑层暴露的数据，并处理用户交互。也常称为「展示层」。

* **Logic layer** - Implements core business logic, and facilitates interaction
  between the data layer and UI layer. Commonly known as the "domain layer".
  The logic layer is optional, and only needs to be implemented if your
  application has complex business logic that happens on the client.
  Many apps are only concerned with presenting data to a user and
  allowing the user to change that data (colloquially known as CRUD apps).
  These apps might not need this optional layer.

  **逻辑层** — 实现核心业务逻辑，并协调数据层与 UI 层之间的交互。常称为「领域层」。
  逻辑层是可选的，仅当应用在客户端有复杂业务逻辑时才需要实现。
  许多应用只关注向用户展示数据并允许用户修改数据（俗称 CRUD 应用），
  可能不需要这一可选层。

* **Data layer** - Manages interactions with data sources, such as databases or
  platform plugins. Exposes data and methods to the business logic layer.

  **数据层** — 管理与数据库、平台插件等数据源的交互，并向业务逻辑层暴露数据与方法。

These are called "layers" because each layer can only communicate with the
layers directly below or above it. The UI layer shouldn't know that the data
layer exists, and vice versa.

之所以称为「层」，是因为每一层只能与紧邻的上下层通信。
UI 层不应知道数据层的存在，反之亦然。

## Single source of truth

## 单一数据源

Every data type in your app should have a [single source of truth][] (SSOT).
The source of truth is responsible for representing local or remote state.
If the data can be modified in the app,
the SSOT class should be the only class that can do so.

应用中每种数据类型都应有 [单一数据源][single source of truth]（SSOT）。
数据源负责表示本地或远程状态。
若数据可在应用内修改，SSOT 类应是唯一能修改它的类。

This can dramatically reduce the number of bugs in your application,
and it can simplify code because you'll only ever have one copy of the same data.

这能显著减少应用中的 bug 数量，并简化代码，因为同一份数据只会有一个副本。

Generally, the source of truth for any given type of data in your application is
held in a class called a **Repository**, which is part of the data layer.
There is typically one repository class for each type of data in your app.

通常，应用中某类数据的单一数据源由数据层中称为 **Repository（仓库）** 的类持有。
应用中每种数据类型通常对应一个仓库类。

This principle can be applied across layers and components in your application
as well as within individual classes. For example,
a Dart class might use [getters][] to derive values from an SSOT field
(instead of having multiple fields that need to be updated independently)
or a list of [records][] to group related values
(instead of parallel lists whose indices might get out of sync).

该原则可应用于应用各层与各组件，也可应用于单个类内部。
例如，Dart 类可用 [getter][getters] 从 SSOT 字段派生值
（而不是维护多个需独立更新的字段），
或用 [record][records] 列表将相关值分组
（而不是使用索引可能失步的并行列表）。

## Unidirectional data flow

## 单向数据流

[Unidirectional data flow][] (UDF) refers to a design pattern that helps
decouple state from the UI that displays that state. In the simplest terms,
state flows from the data layer through the logic layer and eventually to the
widgets in the UI layer.
Events from user-interaction flow the opposite direction,
from the presentation layer back through the logic layer and to the data layer.

[单向数据流][Unidirectional data flow]（UDF）是一种有助于将状态与展示该状态的 UI 解耦的设计模式。
简而言之，状态从数据层经逻辑层最终流向 UI 层中的 widget；
用户交互事件则沿相反方向，从展示层经逻辑层回到数据层。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-UDF.png' alt="The three common layers of app architecture, the UI layer, logic layer, and data layer, and the flow of state from the data layer to the UI layer.">

In UDF, the update loop from user interaction to re-rendering the UI looks like
this:

在 UDF 中，从用户交互到 UI 重新渲染的更新循环如下：

1. [UI layer] An event occurs due to user interaction, such as a button being
   clicked. The widget's event handler callback invokes a method exposed by a
   class in the logic layer.

   [UI 层] 因用户交互（如按钮点击）产生事件。widget 的事件处理回调调用逻辑层类暴露的方法。

2. [Logic layer] The logic class calls methods exposed by a repository that
   know how to mutate the data.

   [逻辑层] 逻辑类调用仓库暴露的、知道如何变更数据的方法。

3. [Data layer] The repository updates data (if necessary) and then provides the
   new data to the logic class.

   [数据层] 仓库更新数据（如有必要），再将新数据提供给逻辑类。

4. [Logic layer] The logic class saves its new state, which it sends to the UI.

   [逻辑层] 逻辑类保存新状态并发送给 UI。

5. [UI layer] The UI displays the new state of the view model.

   [UI 层] UI 展示 view model 的新状态。

New data can also start at the data layer.
For example, a repository might poll an HTTP server for new data.
In this case, the data flow only makes the second half of the journey.
The most important idea is that data changes always happen
in the [SSOT][], which is the data layer.
This makes your code easier to understand, less error prone, and
prevents malformed or unexpected data from being created.

新数据也可以从数据层发起。
例如，仓库可能轮询 HTTP 服务器获取新数据。
此时数据流只完成后半段旅程。
最重要的是：数据变更始终发生在作为数据层的 [SSOT][] 中。
这使代码更易理解、更少出错，并避免产生畸形或意外数据。


## UI is a function of (immutable) state

## UI 是（不可变）状态的函数

Flutter is declarative,
meaning that it builds its UI to reflect the current state of your app.
When state changes,
your app should trigger a rebuild of the UI that depends on that state.
In Flutter, you'll often hear this described as "UI is a function of state".

Flutter 是声明式的，即根据应用当前状态构建 UI。
当状态变化时，应用应触发依赖该状态的 UI 重建。
在 Flutter 中，这常被表述为「UI 是状态的函数」。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/ui-f-state.png' style="width:50%; margin:auto; display:block" alt="UI is a function of state.">

It's crucial that your data drive your UI, and not the other way around.
Data should be immutable and persistent,
and views should contain as little logic as possible.
This minimizes the possibility of data being lost when an app is closed,
and makes your app more testable and resilient to bugs.

关键是让数据驱动 UI，而非相反。
数据应不可变且持久，view 应尽可能少包含逻辑。
这能尽量减少应用关闭时数据丢失的可能，并提升可测试性与抗 bug 能力。

## Extensibility

## 可扩展性

Each piece of architecture should have a well defined list of inputs and outputs.
For example, a view model in the logic layer should only
take in data sources as inputs, such as repositories,
and should only expose commands and data formatted for views.

架构的每一部分都应有明确定义的输入与输出列表。
例如，逻辑层中的 view model 应仅以仓库等数据源为输入，
并仅向 view 暴露为其格式化的命令与数据。

Using clean interfaces in this way allows you to swap out
concrete implementations of your classes without needing to
change any of the code that consumes the interface.

以这种方式使用清晰接口，可在不修改消费方代码的情况下替换类的具体实现。

## Testability

## 可测试性

The principles that make software extensible also make software easier to test.
For example, you can test the self-contained logic of a view model by mocking a
repository.
The view model tests don't require you to mock other parts of your application,
and you can test your UI logic separate from Flutter widgets themselves.

使软件可扩展的原则同样使软件更易测试。
例如，可通过 mock 仓库测试 view model 的自包含逻辑。
view model 测试无需 mock 应用其他部分，且可将 UI 逻辑与 Flutter widget 本身分开测试。

Your app will also be more flexible.
It will be straightforward and low risk to add new logic and new UI.
For example, adding a new view model cannot break any logic
from the data or business logic layers.

应用也会更灵活，新增逻辑与 UI 将直接且低风险。
例如，新增 view model 不会破坏数据层或业务逻辑层的任何逻辑。

The next section explains the idea of inputs and outputs for any given component
in your application's architecture.

下一节将说明应用架构中任意组件的输入与输出概念。

[Separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[single source of truth]: https://en.wikipedia.org/wiki/Single_source_of_truth
[SSOT]: https://en.wikipedia.org/wiki/Single_source_of_truth
[getters]: {{site.dart-site}}/effective-dart/design#do-use-getters-for-operations-that-conceptually-access-properties
[records]: {{site.dart-site}}/language/records
[Unidirectional data flow]: https://en.wikipedia.org/wiki/Unidirectional_Data_Flow_(computer_science)

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

网站本节内容仍在完善中，
[欢迎提供反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="concepts"
