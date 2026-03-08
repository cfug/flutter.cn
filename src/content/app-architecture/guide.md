---
# title: Guide to app architecture
title: 应用架构指南
# shortTitle: Architecture guide
shortTitle: 架构指南
# description: >
#   The recommended way to architect a Flutter app.
description: >
  构建 Flutter 应用的推荐架构方式。
prev:
    # title: Common architecture concepts
    title: 通用架构概念
    path: /app-architecture/concepts
next:
  # title: Architecture case study
  title: 架构案例研究
  path: /app-architecture/case-study
---

The following pages demonstrate how to build an app using best practices.
The recommendations in this guide can be applied to most apps,
making them easier to scale, test, and maintain.
However, they're guidelines, not steadfast rules,
and you should adapt them to your unique requirements.

以下页面演示了如何使用最佳实践构建应用。
本指南中的建议适用于大多数应用，
使它们更易于扩展、测试和维护。
然而，这些只是指导方针，而非一成不变的规则，
你应该根据自己的具体需求进行调整。

This section provides a high-level overview of how Flutter applications can be
architected. It explains the layers of an application,
along with the classes that exist within each layer.
The section after this provides concrete code samples and
walks through a Flutter application that's implemented these recommendations.

本节提供了 Flutter 应用架构的高层概述。
它解释了应用的各个层级，
以及每个层级中存在的类。
下一节将提供具体的代码示例，
并详细介绍一个实现了这些建议的 Flutter 应用。

## Overview of project structure

## 项目结构概述

[Separation-of-concerns][] is the most important principle to follow when
designing your Flutter app.
Your Flutter application should split into two broad layers,
the UI layer and the Data layer.

[关注点分离][Separation-of-concerns]是设计 Flutter 应用时应遵循的最重要原则。
你的 Flutter 应用应该分为两个大的层级，
即 UI 层和数据层。

Each layer is further split into different components,
each of which has distinct responsibilities, a well-defined interface,
boundaries and dependencies.
This guide recommends you split your application into the following components:

每个层级又进一步划分为不同的组件，
每个组件都有明确的职责、定义良好的接口、
边界和依赖关系。
本指南建议你将应用拆分为以下组件：

* Views
* View models
* Repositories
* Services

* 视图（Views）
* 视图模型（View models）
* Repositories
* Services

### MVVM

If you've encountered the [Model-View-ViewModel architectural pattern][] (MVVM),
this will be familiar.
MVVM is an architectural pattern that separates a
feature of an application into three parts:
the `Model`, the `ViewModel` and the `View`.
Views and view models make up the UI layer of an application.
Repositories and services represent the data of an application,
or the model layer of MVVM.
Each of these components is defined in the next section.

如果你了解过 [Model-View-ViewModel 架构模式][Model-View-ViewModel architectural pattern]（MVVM），
对此会比较熟悉。
MVVM 是一种将应用功能分为三个部分的架构模式：
`Model`、`ViewModel` 和 `View`。
视图和视图模型构成了应用的 UI 层。
Repository 和 Service 代表应用的数据，
即 MVVM 中的模型层。
每个组件将在下一节中定义。

<img src='/assets/images/docs/app-architecture/guide/mvvm-intro-with-layers.png' alt="MVVM architectural pattern">

Every feature in an application will contain one view to describe the UI and
one view model to handle logic,
one or more repositories as the sources of truth for your application data,
and zero or more services that interact with external APIs,
like client servers and platform plugins.

应用中的每个功能都包含一个用于描述 UI 的视图和一个用于处理逻辑的视图模型，
一个或多个作为应用数据单一数据源的 Repository，
以及零个或多个与外部 API 交互的 Service，
例如客户端服务器和平台插件。

A single feature of an application might require all of the following objects:

应用的单个功能可能需要以下所有对象：

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-example.png' alt="An example of the Dart objects that might exist in one feature using the architecture described on page.">

Each of these objects and the arrows that connect them will be explained
thoroughly by the end of this page. Throughout this guide,
the following simplified version of that diagram will be used as an anchor.

在本页结束时，这些对象及连接它们的箭头都将被详细解释。
在整个指南中，以下简化版的图表将作为参考。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified.png' alt="A simplified diagram of the architecture described on this page.">

:::note
Apps with complex logic might also have a logic layer that sits in between the
UI layer and data layer. This logic layer is commonly called the *domain layer.*
The domain layer contains additional components often called *interactors* or
*use-cases*. The domain layer is covered later in this guide.

具有复杂逻辑的应用可能还有一个位于 UI 层和数据层之间的逻辑层。
这个逻辑层通常被称为*领域层*。
领域层包含通常被称为*交互器*或*用例*的额外组件。
领域层将在本指南的后面部分介绍。
:::

[Model-View-ViewModel architectural pattern]: https://en.wikipedia.org/wiki/Model–view–viewmodel

## UI layer

## UI 层

An application's UI layer is responsible for interacting with the user.
It displays an application's data to the user and receives user input,
such as tap events and form inputs.

应用的 UI 层负责与用户交互。
它向用户展示应用数据并接收用户输入，
例如点击事件和表单输入。

The UI reacts to data changes or user input.
When the UI receives new data from a Repository,
it should re-render to display that new data.
When the user interacts with the UI,
it should change to reflect that interaction.

UI 对数据变化或用户输入做出响应。
当 UI 从 Repository 接收到新数据时，
它应该重新渲染以显示新数据。
当用户与 UI 交互时，
它应该发生变化以反映该交互。

The UI layer is made up of two architectural components,
based on the MVVM design pattern:

UI 层由两个架构组件组成，
基于 MVVM 设计模式：

* **Views** describe how to present application data to the user.
  Specifically, they refer to *compositions of widgets* that make a feature.
  For instance, a view is often (but not always) a screen that
  has a `Scaffold` widget, along with
  all of the widgets below it in the widget tree.
  Views are also responsible for passing events to
  the view model in response to user interactions.
  **视图**描述了如何向用户展示应用数据。
  具体来说，它们指的是构成一个功能的 *widget 组合*。
  例如，视图通常（但不总是）是一个包含 `Scaffold` widget
  以及 widget 树中其下所有 widget 的屏幕。
  视图还负责将事件传递给视图模型以响应用户交互。
* **View models** contain the logic that converts app data into *UI State*,
  because data from repositories is often formatted differently from
  the data that needs to be displayed.
  For example, you might need to combine data from multiple repositories,
  or you might want to filter a list of data records.
  **视图模型**包含将应用数据转换为 *UI 状态*的逻辑，
  因为来自 Repository 的数据格式通常与需要显示的数据格式不同。
  例如，你可能需要合并来自多个 Repository 的数据，
  或者你可能想要过滤数据记录列表。

Views and view models should have a one-to-one relationship.

视图和视图模型应该是一对一的关系。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-UI-highlighted.png' alt="A simplified diagram of the architecture described on this page with the view and view model objects highlighted.">

In the simplest terms,
a view model manages the UI state and the view displays that state.
Using views and view models, your UI layer can maintain state during
configuration changes (such as screen rotations),
and you can test the logic of your UI independently of Flutter widgets.

简单来说，
视图模型管理 UI 状态，视图则显示该状态。
通过使用视图和视图模型，你的 UI 层可以在
配置更改（例如屏幕旋转）期间保持状态，
并且你可以独立于 Flutter widget 来测试 UI 逻辑。

:::note
'View' is an abstract term, and one view doesn't equal one widget.
Widgets are composable, and several can be combined to create one view.
Therefore, view models don't have a one-to-one relationship with widgets,
but rather a one-to-one relationship with a *collection* of widgets.

"视图"是一个抽象术语，一个视图并不等于一个 widget。
Widget 是可组合的，多个 widget 可以组合成一个视图。
因此，视图模型与 widget 不是一对一的关系，
而是与一组 widget 的一对一关系。
:::

A feature of an application is user centric,
and therefore defined by the UI layer.
Every instance of a paired *view* and *view model* defines one feature in your app.
This is often a screen in your app, but it doesn't have to be.
For example, consider logging in and out.
Logging in is generally done on a specific screen whose
only purpose is to provide the user with a way to log in.
In the application code, the login screen would be
made up of a `LoginViewModel` class and a `LoginView` class.

应用的功能以用户为中心，
因此由 UI 层定义。
每一对*视图*和*视图模型*的实例定义了应用中的一个功能。
这通常是应用中的一个屏幕，但不一定如此。
例如，考虑登录和退出的场景。
登录通常在一个专门的屏幕上完成，
该屏幕的唯一目的是为用户提供登录方式。
在应用代码中，登录屏幕由
`LoginViewModel` 类和 `LoginView` 类组成。

On the other hand,
logging out of an app is generally not done on a dedicated screen.
The ability to log out is generally presented to the user as a button in
a menu, a user account screen, or any number of different locations.
It's often presented in multiple locations.
In such scenarios, you might have a `LogoutViewModel` and a `LogoutView` which
only contains a single button that can be dropped into other widgets.

另一方面，
退出应用通常不在专门的屏幕上完成。
退出功能通常以按钮的形式呈现给用户，
可能在菜单、用户账户屏幕或其他任意位置。
它经常出现在多个位置。
在这种场景下，你可能有一个 `LogoutViewModel` 和一个 `LogoutView`，
其中只包含一个可以放入其他 widget 中的按钮。

### Views

### 视图

In Flutter, views are the widget classes of your application.
Views are the primary method of rendering UI,
and shouldn't contain any business logic.
They should be passed all data they need to render from the view model.

在 Flutter 中，视图是应用的 widget 类。
视图是渲染 UI 的主要方式，
不应该包含任何业务逻辑。
它们应该从视图模型获取渲染所需的所有数据。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-View-highlighted.png' alt="A simplified diagram of the architecture described on this page with the view object highlighted.">

The only logic a view should contain is:

视图应该包含的唯一逻辑是：

* Simple if-statements to show and hide widgets based on a flag or nullable
  field in the view model
  简单的 if 语句，根据视图模型中的标志或可空字段来显示和隐藏 widget
* Animation logic
  动画逻辑
* Layout logic based on device information, like screen size or orientation.
  基于设备信息的布局逻辑，如屏幕尺寸或方向。
* Simple routing logic
  简单的路由逻辑

All logic related to data should be handled in the view model.

所有与数据相关的逻辑都应该在视图模型中处理。

### View models

### 视图模型

A view model exposes the application data necessary to render a view.
In the architecture design described on this page,
most of the logic in your Flutter application lives in view models.

视图模型暴露渲染视图所需的应用数据。
在本页描述的架构设计中，
Flutter 应用中的大部分逻辑都在视图模型中。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-ViewModel-highlighted.png' alt="A simplified diagram of the architecture described on this page with the view model object highlighted.">

A view model's main responsibilities include:

视图模型的主要职责包括：

* Retrieving application data from repositories and transforming it into a
  format suitable for presentation in the view.
  For example, it might filter, sort or aggregate data.
  从 Repository 获取应用数据并将其转换为适合在视图中展示的格式。
  例如，它可能会过滤、排序或聚合数据。
* Maintaining the current state needed in the view,
  so that the view can rebuild without losing data.
  For example, it might contain boolean flags to
  conditionally render widgets in the view, or a field that
  tracks which section of a carousel is active on screen.
  维护视图所需的当前状态，
  以便视图可以在不丢失数据的情况下重建。
  例如，它可能包含用于在视图中有条件地渲染 widget 的布尔标志，
  或者跟踪屏幕上轮播图哪个部分处于活动状态的字段。
* Exposes callbacks (called **commands**) to the view that can be
  attached to an event handler, like a button press or form submission.
  向视图暴露回调（称为**命令**），
  这些回调可以附加到事件处理器上，如按钮点击或表单提交。

Commands are named for the [command pattern][],
and are Dart functions that allow views to
execute complex logic without knowledge of its implementation.
Commands are written as members of the view model class to
be called by the gesture handlers in the view class.

命令以[命令模式][command pattern]命名，
是允许视图在不了解其实现细节的情况下执行复杂逻辑的 Dart 函数。
命令作为视图模型类的成员编写，
由视图类中的手势处理器调用。

You can find examples of views, view models, and commands on
the [UI layer][] portion of the [App architecture case study][].

你可以在[架构案例研究][App architecture case study]的 [UI 层][UI layer]部分找到视图、视图模型和命令的示例。

For a gentle introduction to MVVM in Flutter,
check out the [state management fundamentals][].

如需了解 Flutter 中 MVVM 的入门介绍，
请查看[状态管理基础][state management fundamentals]。

[UI layer]: /app-architecture/case-study/ui-layer
[App architecture case study]: /app-architecture/case-study
[state management fundamentals]: /data-and-backend/state-mgmt/intro

## Data layer

## 数据层

The data layer of an app handles your business data and logic.
Two pieces of architecture make up the data layer: services and repositories.
These pieces should have well-defined inputs and outputs
to simplify their reusability and testability.

应用的数据层处理业务数据和逻辑。
数据层由两部分架构组成：Service 和 Repository。
这些部分应该有定义良好的输入和输出，
以简化其可复用性和可测试性。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Data-highlighted.png' alt="A simplified diagram of the architecture described on this page with the Data layer highlighted.">

Using MVVM language, services and repositories make up your *model layer*.

使用 MVVM 的术语来说，Service 和 Repository 构成了你的*模型层*。

### Repositories

[Repository][] classes are the source of truth for your model data.
They're responsible for polling data from services,
and transforming that raw data into **domain models**.
Domain models represent the data that the application needs,
formatted in a way that your view model classes can consume.
There should be a repository class for
each different type of data handled in your app.

[Repository][] 类是模型数据的单一数据源。
它们负责从 Service 轮询数据，
并将原始数据转换为**领域模型**。
领域模型表示应用所需的数据，
以视图模型类可以使用的格式进行格式化。
应用中处理的每种不同类型的数据都应该有一个对应的 Repository 类。

Repositories handle the business logic associated with services, such as:

Repository 处理与 Service 相关的业务逻辑，例如：

* Caching
  缓存
* Error handling
  错误处理
* Retry logic
  重试逻辑
* Refreshing data
  刷新数据
* Polling services for new data
  轮询 Service 获取新数据
* Refreshing data based on user actions
  根据用户操作刷新数据

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Repository-highlighted.png' alt="A simplified diagram of the architecture described on this page with the Repository object highlighted.">

Repositories output application data as domain models.
For example, a social media app might have a
`UserProfileRepository` class that exposes a `Stream<UserProfile?>`,
which emits a new value whenever the user signs in or out.

Repository 以领域模型的形式输出应用数据。
例如，一个社交媒体应用可能有一个
`UserProfileRepository` 类，它暴露一个 `Stream<UserProfile?>`，
每当用户登录或退出时都会发出新值。

The models output by repositories are consumed by view models.
Repositories and view models have a many-to-many relationship.
A view model can use many repositories to get the data it needs,
and a repository can be used by many view models.

Repository 输出的模型由视图模型使用。
Repository 和视图模型是多对多的关系。
一个视图模型可以使用多个 Repository 来获取所需的数据，
一个 Repository 也可以被多个视图模型使用。

Repositories should never be aware of each other.
If your application has business logic that needs data from two repositories,
you should combine the data in the view model or in the domain layer,
especially if your repository-to-view-model relationship is complex.

Repository 之间不应该相互感知。
如果你的应用有需要来自两个 Repository 数据的业务逻辑，
你应该在视图模型或领域层中合并数据，
尤其是当 Repository 与视图模型的关系比较复杂时。

### Services

Services are in the lowest layer of your application.
They wrap API endpoints and expose asynchronous response objects,
such as `Future` and `Stream` objects.
They're only used to isolate data-loading, and they hold no state.
Your app should have one service class per data source.
Examples of endpoints that services might wrap include:

Service 处于应用的最底层。
它们封装 API 端点并暴露异步响应对象，
如 `Future` 和 `Stream` 对象。
它们仅用于隔离数据加载，不持有任何状态。
你的应用应该为每个数据源创建一个 Service 类。
Service 可能封装的端点示例包括：

* The underlying platform, like iOS and Android APIs
  底层平台，如 iOS 和 Android API
* REST endpoints
  REST 端点
* Local files
  本地文件

As a rule of thumb, services are most helpful when
the necessary data lives outside of your application's Dart code -
which is true of each of the preceding examples.

根据经验，当所需数据存在于应用的 Dart 代码之外时，
Service 最为有用——上述每个示例都是如此。

Services and repositories have a many-to-many relationship.
A single Repository can use several services,
and a service can be used by multiple repositories.

Service 和 Repository 是多对多的关系。
一个 Repository 可以使用多个 Service，
一个 Service 也可以被多个 Repository 使用。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Service-highlighted.png' alt="A simplified diagram of the architecture described on this page with the Service object highlighted.">

## Optional: Domain layer

## 可选：领域层

As your app grows and adds features, you may need to abstract away logic that
adds too much complexity to your view models.
These classes are often called interactors or **use-cases**.

随着应用的增长和功能的增加，你可能需要将为视图模型带来过多复杂性的逻辑抽象出来。
这些类通常被称为交互器或**用例**。

Use-cases are responsible for making interactions between
the UI and Data layers simpler and more reusable.
They take data from repositories and make it suitable for the UI layer.

用例负责使 UI 层和数据层之间的交互更简单、更可复用。
它们从 Repository 获取数据并使其适合 UI 层使用。

<img src='/assets/images/docs/app-architecture/guide/mvvm-intro-with-domain-layer.png' alt="MVVM design pattern with an added domain layer object">

Use-cases are primarily used to encapsulate business logic that would otherwise
live in the view model and meets one or more of the following conditions:

用例主要用于封装原本存在于视图模型中的业务逻辑，
这些逻辑满足以下一个或多个条件：

1. Requires merging data from multiple repositories
   需要合并来自多个 Repository 的数据
2. Is exceedingly complex
   逻辑极其复杂
3. The logic will be reused by different view models
   该逻辑将被不同的视图模型复用

This layer is optional because not all applications or features within an
application have these requirements.
If you suspect your application would
benefit from this additional layer, consider the pros and cons:

这一层是可选的，因为并非所有应用或应用中的所有功能都有这些需求。
如果你认为你的应用可以从这个额外的层中受益，请考虑其优缺点：


| Pros | Cons |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| ✅ Avoid code duplication in view models | ❌ Increases complexity of your architecture, adding more classes and higher cognitive load |
| ✅ 避免视图模型中的代码重复 | ❌ 增加架构复杂性，添加更多类并提高认知负荷 |
| ✅ Improve testability by separating complex business logic from UI logic | ❌ Testing requires additional mocks |
| ✅ 通过将复杂的业务逻辑与 UI 逻辑分离来提高可测试性 | ❌ 测试需要额外的 mock 对象 |
| ✅ Improve code readability in view models | ❌ Adds additional boilerplate to your code |
| ✅ 提高视图模型中的代码可读性 | ❌ 为代码增加额外的样板代码 |

{:.table .table-striped}

### Data access with use-cases

### 通过用例访问数据

Another consideration when adding a Domain layer is whether view models will
continue to have access to repository data directly, or if you'll enforce
view models to go through use-cases to get their data. Put another way,
will you add use-cases as you need them?
Perhaps when you notice repeated logic in your view models?
Or, will you create a use-case each time a view model needs data,
even if the logic in the use-case is simple?

添加领域层时的另一个考虑因素是，视图模型是否仍然可以直接访问 Repository 数据，
还是强制视图模型通过用例来获取数据。换句话说，
你是在需要时才添加用例？
也许是当你注意到视图模型中有重复逻辑时？
还是每次视图模型需要数据时都创建用例，
即使用例中的逻辑很简单？

If you choose to do the latter,
it intensifies the earlier outlined pros and cons.
Your application code will be extremely modular and testable,
but it also adds a significant amount of unnecessary overhead.

如果你选择后者，
它会加剧前面概述的优缺点。
你的应用代码将非常模块化且可测试，
但也会增加大量不必要的开销。

A good approach is to add use-cases only when needed.
If you find that your view models are
accessing data through use-cases most of the time,
you can always refactor your code to utilize use-cases exclusively.
The example app used later in this guide has use-cases for some features,
but also has view models that interact with repositories directly.
A complex feature may ultimately end up looking like this:

一个好的方法是仅在需要时添加用例。
如果你发现视图模型大部分时间都通过用例访问数据，
你可以随时重构代码以完全使用用例。
本指南后面使用的示例应用对某些功能使用了用例，
但也有直接与 Repository 交互的视图模型。
一个复杂的功能最终可能看起来像这样：

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-with-logic-layer.png'
alt="A simplified diagram of the architecture described on this page with a use case object.">

This method of adding use-cases is defined by the following rules:

这种添加用例的方法由以下规则定义：

* Use-cases depend on repositories
  用例依赖于 Repository
* Use-cases and repositories have a many-to-many relationship
  用例和 Repository 是多对多的关系
* View models depend on one or more use-cases *and* one or more repositories
  视图模型依赖于一个或多个用例*以及*一个或多个 Repository

This method of using use-cases ends up looking
less like a layered lasagna, and more like a plated dinner with
two mains (UI and data layers) and a side (domain layer).
Use-cases are just utility classes that have well-defined inputs and outputs.
This approach is flexible and extendable,
but it requires greater diligence to maintain order.

这种使用用例的方法看起来
不像是分层的千层面，而更像是一道有
两个主菜（UI 层和数据层）和一个配菜（领域层）的晚餐。
用例只是具有定义良好的输入和输出的工具类。
这种方法灵活且可扩展，
但需要更加谨慎地维护秩序。

[Separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[command pattern]: https://en.wikipedia.org/wiki/Command_pattern
[Repository]: https://martinfowler.com/eaaCatalog/repository.html

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

由于网站的这个部分仍在不断完善中，
我们[欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="guide"
