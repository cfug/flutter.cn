---
# title: Common architecture concepts
title: 常见架构概念
# shortTitle: Architecture concepts
shortTitle: 架构概念
# description: >
#   Learn about common architecture concepts in application design,
#   and how they apply to Flutter.
description: >
  了解应用设计中的常见架构概念，
  以及它们如何应用于 Flutter。
prev:
  # title: Architecting Flutter apps
  title: 构建 Flutter 应用架构
  path: /app-architecture
next:
  # title: Guide to app architecture
  title: 应用架构指南
  path: /app-architecture/guide
---

In this section, you'll find tried and true principles that guide architectural
decisions in the larger world of app development,
as well as information about how they fit into Flutter specifically.
It's a gentle introduction to vocabulary and concepts related to
the recommended architecture and best practices,
so they can be explored in more detail throughout this guide.

在本节中，你将了解在应用开发领域中经过实践检验的架构决策指导原则，
以及它们如何具体应用于 Flutter。
这是对推荐架构和最佳实践相关术语和概念的简要介绍，
以便在本指南中进行更详细的探讨。

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

[关注点分离][Separation-of-concerns]是应用开发中的核心原则，
它通过将应用的功能划分为独立的、自包含的单元来促进模块化和可维护性。
从高层次来看，这意味着将 UI 逻辑与业务逻辑分离。
这通常被描述为*分层*架构。
在每一层中，你还应该按功能或特性进一步拆分你的应用。
例如，你的应用的身份验证逻辑应该与搜索逻辑位于不同的类中。

In Flutter, this applies to [widgets](/resources/glossary#widget) in the UI layer as well. You should write
reusable, lean widgets that hold as little logic as possible.

在 Flutter 中，这同样适用于 UI 层中的 [widget](/resources/glossary#widget)。你应该编写可复用的、精简的 widget，使其包含尽可能少的逻辑。

## Layered architecture

## 分层架构

Flutter applications should be written in *layers*. Layered architecture is a
software design pattern that organizes an application into distinct layers, each
with specific roles and responsibilities. Typically, applications are separated
into 2 to 3 layers, depending on complexity.

Flutter 应用应该以*分层*的方式编写。分层架构是一种软件设计模式，
它将应用组织成不同的层，每一层都有特定的角色和职责。
通常，应用根据复杂程度被分为 2 到 3 层。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-icons.png' alt="The three common layers of app architecture, the UI layer, logic layer, and data layer.">

* **UI layer** - Displays data to the user that is exposed by the business logic
  layer, and handles user interaction. This is also commonly referred to as the
  'presentation layer'.

  **UI 层** - 向用户展示由业务逻辑层暴露的数据，并处理用户交互。这通常也被称为"展示层"。

* **Logic layer** - Implements core business logic, and facilitates interaction
  between the data layer and UI layer. Commonly known as the 'domain layer'.
  The logic layer is optional, and only needs to be implemented if your
  application has complex business logic that happens on the client.
  Many apps are only concerned with presenting data to a user and
  allowing the user to change that data (colloquially known as CRUD apps).
  These apps might not need this optional layer.

  **逻辑层** - 实现核心业务逻辑，并协调数据层和 UI 层之间的交互。通常也被称为"领域层"。
  逻辑层是可选的，只有当你的应用在客户端存在复杂的业务逻辑时才需要实现。
  许多应用只关心向用户展示数据并允许用户修改数据（俗称 CRUD 应用）。
  这些应用可能不需要这个可选层。

* **Data layer** - Manages interactions with data sources, such as databases or
  platform plugins. Exposes data and methods to the business logic layer.

  **数据层** - 管理与数据源的交互，例如数据库或平台插件。向业务逻辑层暴露数据和方法。

These are called 'layers' because each layer can only communicate with the
layers directly below or above it. The UI layer shouldn't know that the data
layer exists, and vice versa.

之所以称为"层"，是因为每一层只能与直接相邻的上下层通信。
UI 层不应该知道数据层的存在，反之亦然。

## Single source of truth

## 单一数据源

Every data type in your app should have a [single source of truth][] (SSOT).
The source of truth is responsible for representing local or remote state.
If the data can be modified in the app,
the SSOT class should be the only class that can do so.

你的应用中的每种数据类型都应该有一个[单一数据源][single source of truth]（SSOT）。
数据源负责表示本地或远程状态。
如果数据可以在应用中被修改，
SSOT 类应该是唯一能够执行此操作的类。

This can dramatically reduce the number of bugs in your application,
and it can simplify code because you'll only ever have one copy of the same data.

这可以大幅减少应用中的 bug 数量，
并且可以简化代码，因为同一份数据始终只有一个副本。

Generally, the source of truth for any given type of data in your application is
held in a class called a **Repository**, which is part of the data layer.
There is typically one repository class for each type of data in your app.

通常，应用中任何给定类型数据的数据源都保存在一个名为 **Repository** 的类中，
它是数据层的一部分。通常每种数据类型对应一个 Repository 类。

This principle can be applied across layers and components in your application
as well as within individual classes. For example,
a Dart class might use [getters][] to derive values from an SSOT field
(instead of having multiple fields that need to be updated independently)
or a list of [records][] to group related values
(instead of parallel lists whose indices might get out of sync).

这一原则可以应用于应用中的各个层和组件，也可以应用于单个类内部。
例如，一个 Dart 类可以使用 [getter][getters] 从 SSOT 字段派生值
（而不是使用多个需要独立更新的字段），
或者使用 [record][records] 列表来分组相关值
（而不是使用索引可能不同步的并行列表）。

## Unidirectional data flow

## 单向数据流

[Unidirectional data flow][] (UDF) refers to a design pattern that helps
decouple state from the UI that displays that state. In the simplest terms,
state flows from the data layer through the logic layer and eventually to the
widgets in the UI layer.
Events from user-interaction flow the opposite direction,
from the presentation layer back through the logic layer and to the data layer.

[单向数据流][Unidirectional data flow]（UDF）是一种设计模式，
它有助于将状态与显示该状态的 UI 解耦。
简单来说，状态从数据层流经逻辑层，最终到达 UI 层的 widget。
用户交互产生的事件则沿相反方向流动，
从展示层经过逻辑层回到数据层。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-UDF.png' alt="The three common layers of app architecture, the UI layer, logic layer, and data layer, and the flow of state from the data layer to the UI layer.">

In UDF, the update loop from user interaction to re-rendering the UI looks like
this:

在 UDF 中，从用户交互到重新渲染 UI 的更新循环如下所示：

1. [UI layer] An event occurs due to user interaction, such as a button being
   clicked. The widget's event handler callback invokes a method exposed by a
   class in the logic layer.

   [UI 层] 由于用户交互（例如点击按钮）产生一个事件。widget 的事件处理回调调用逻辑层中某个类暴露的方法。

2. [Logic layer] The logic class calls methods exposed by a repository that
   know how to mutate the data.

   [逻辑层] 逻辑类调用 Repository 暴露的方法来修改数据。

3. [Data layer] The repository updates data (if necessary) and then provides the
   new data to the logic class.

   [数据层] Repository 更新数据（如果需要），然后将新数据提供给逻辑类。

4. [Logic layer] The logic class saves its new state, which it sends to the UI.

   [逻辑层] 逻辑类保存其新状态，并将其发送到 UI。

5. [UI layer] The UI displays the new state of the view model.

   [UI 层] UI 显示视图模型的新状态。

New data can also start at the data layer.
For example, a repository might poll an HTTP server for new data.
In this case, the data flow only makes the second half of the journey.
The most important idea is that data changes always happen
in the [SSOT][], which is the data layer.
This makes your code easier to understand, less error prone, and
prevents malformed or unexpected data from being created.

新数据也可以从数据层开始。
例如，Repository 可能会轮询 HTTP 服务器以获取新数据。
在这种情况下，数据流只经历后半段旅程。
最重要的理念是，数据变更始终发生在[单一数据源][SSOT]中，即数据层。
这使你的代码更容易理解、更不容易出错，并防止产生格式错误或意外的数据。


## UI is a function of (immutable) state

## UI 是（不可变）状态的函数

Flutter is declarative,
meaning that it builds its UI to reflect the current state of your app.
When state changes,
your app should trigger a rebuild of the UI that depends on that state.
In Flutter, you'll often hear this described as "UI is a function of state".

Flutter 是声明式的，
这意味着它构建 UI 以反映应用的当前状态。
当状态发生变化时，你的应用应该触发依赖于该状态的 UI 的重建。
在 Flutter 中，你经常会听到这样的描述："UI 是状态的函数"。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/ui-f-state.png' style="width:50%; margin:auto; display:block" alt="UI is a function of state.">

It's crucial that your data drive your UI, and not the other way around.
Data should be immutable and persistent,
and views should contain as little logic as possible.
This minimizes the possibility of data being lost when an app is closed,
and makes your app more testable and resilient to bugs.

至关重要的是，你的数据应该驱动 UI，而不是反过来。
数据应该是不可变的和持久化的，视图应该包含尽可能少的逻辑。
这可以最大限度地减少应用关闭时数据丢失的可能性，
并使你的应用更具可测试性和对 bug 的抵抗力。

## Extensibility

## 可扩展性

Each piece of architecture should have a well defined list of inputs and outputs.
For example, a view model in the logic layer should only
take in data sources as inputs, such as repositories,
and should only expose commands and data formatted for views.

每个架构组件都应该有一组明确定义的输入和输出。
例如，逻辑层中的视图模型应该只接收数据源作为输入（如 Repository），
并且只暴露命令和为视图格式化的数据。

Using clean interfaces in this way allows you to swap out
concrete implementations of your classes without needing to
change any of the code that consumes the interface.

以这种方式使用清晰的接口，允许你替换类的具体实现，
而无需更改任何使用该接口的代码。

## Testability

## 可测试性

The principles that make software extensible also make software easier to test.
For example, you can test the self-contained logic of a view model by mocking a
repository.
The view model tests don't require you to mock other parts of your application,
and you can test your UI logic separate from Flutter widgets themselves.

使软件具有可扩展性的原则同样也使软件更容易测试。
例如，你可以通过模拟 Repository 来测试视图模型的独立逻辑。
视图模型的测试不需要你模拟应用的其他部分，
并且你可以独立于 Flutter widget 本身来测试 UI 逻辑。

Your app will also be more flexible.
It will be straightforward and low risk to add new logic and new UI.
For example, adding a new view model cannot break any logic
from the data or business logic layers.

你的应用也将更加灵活。
添加新逻辑和新 UI 将是简单且低风险的。
例如，添加一个新的视图模型不会破坏数据层或业务逻辑层的任何逻辑。

The next section explains the idea of inputs and outputs for any given component
in your application's architecture.

下一节将解释应用架构中任何给定组件的输入和输出的概念。

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

由于网站的这一部分仍在不断完善中，
我们[欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="concepts"
