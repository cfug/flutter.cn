---
# title: Architecture case study
title: 架构案例研究
# shortTitle: Architecture case study
shortTitle: 架构案例研究
# description: >-
#   A walk-through of a Flutter app that implements the MVVM architectural pattern.
description: >-
  逐步讲解一个实现 MVVM 架构模式的 Flutter 应用。
prev:
  # title: Guide to app architecture
  title: 应用架构指南
  path: /app-architecture/guide
next:
  # title: UI Layer
  title: UI 层
  path: /app-architecture/case-study/ui-layer
ai-translated: true
---

The code examples in this guide are from the [Compass sample application][],
an app that helps users build and book itineraries for trips.
It's a robust sample application with many features, routes, and screens.
The app communicates with an HTTP server,
has development and production environments,
includes brand-specific styling, and contains high test coverage.
In these ways and more, it simulates a real-world,
feature-rich Flutter application.

本指南代码示例来自 [Compass 示例应用][Compass sample application]，
该应用帮助用户规划并预订行程。
它是功能、路由与屏幕丰富的健壮示例，与 HTTP 服务器通信，
具备开发与生产环境、品牌样式与高测试覆盖率，
在多方面模拟真实世界的功能丰富 Flutter 应用。

<div class="wrapping-row" style="margin-block-end: 2rem">
  <DashImage figure image="app-architecture/case-study/splash_screen.png" alt="A screenshot of the splash screen of the compass app." img-style="max-height: 400px;" />
  <DashImage figure image="app-architecture/case-study/home_screen.png" alt="A screenshot of the home screen of the compass app." img-style="max-height: 400px;" />
  <DashImage figure image="app-architecture/case-study/search_form_screen.png" alt="A screenshot of the search form screen of the compass app." img-style="max-height: 400px;" />
  <DashImage figure image="app-architecture/case-study/booking_screen.png" alt="A screenshot of the booking screen of the compass app." img-style="max-height: 400px;" />
</div>

The Compass app's architecture most resembles the [MVVM architectural pattern][]
as described in Flutter's [app architecture guidelines][].
This architecture case study demonstrates how to
implement those guidelines by walking through
the "Home" feature of the compass app.
If you aren't familiar with MVVM, you should read those guidelines first.

Compass 应用架构最接近 Flutter [应用架构指南][app architecture guidelines] 中描述的 [MVVM 架构模式][MVVM architectural pattern]。
本案例研究通过逐步讲解 Compass 应用的「Home」功能，演示如何落实这些指南。
若你不熟悉 MVVM，请先阅读该指南。

The Home screen of the Compass app displays user account information and
a list of the user's saved trips.
From this screen you can log out, open detailed trip pages,
delete saved trips, and navigate to the first page of the core app flow,
which allows the user to build a new itinerary.

Compass 的 Home 屏幕展示用户账户信息与已保存行程列表。
从此屏幕可登出、打开行程详情、删除已保存行程，
并导航至核心流程首页以规划新行程。

In this case study, you'll learn the following:

在本案例研究中，你将学习：

* How to implement Flutter's [app architecture guidelines][]
  using repositories and services in the [data layer][] and
  the MVVM architectural pattern in the [UI layer][]

  如何在 [数据层][data layer] 用 repository 与 service、在 [UI 层][UI layer] 用 MVVM 落实 Flutter [应用架构指南][app architecture guidelines]

* How to use the [Command pattern][] to safely render UI as data changes

  如何使用 [命令模式][Command pattern] 在数据变化时安全渲染 UI

* How to use [`ChangeNotifier`][] and [`Listenable`][] objects to manage state

  如何使用 [`ChangeNotifier`][] 与 [`Listenable`][] 管理状态

* How to implement [Dependency Injection][] using `package:provider`

  如何使用 `package:provider` 实现 [依赖注入][Dependency Injection]

* How to [set up tests][] when following the recommended architecture

  按推荐架构 [搭建测试][set up tests]

* Effective [package structure][] for large Flutter apps

  大型 Flutter 应用的有效 [package 结构][package structure]

This case-study was written to be read in order.
Any given page might reference the previous pages.

本案例研究建议按顺序阅读，各页可能引用前文。

The code examples in this case-study include all the details needed to
understand the architecture, but they're not complete, runnable snippets.
If you prefer to follow along with the full app,
you can find it on [GitHub][].

案例中的代码示例包含理解架构所需的细节，但并非完整可运行片段。
若希望对照完整应用，可在 [GitHub][] 查看。

## Package structure

## Package 结构

Well-organized code is easier for multiple engineers to work on with
minimal code conflicts and is easier for new engineers to
navigate and understand.
Code organization both benefits and benefits from well-defined architecture.

组织良好的代码便于多人协作、减少冲突，也便于新人浏览理解。
代码组织既受益于清晰架构，也反过来强化架构。

There are two popular means of organizing code:

组织代码有两种常见方式：

1. By feature - The classes needed for each feature are grouped together. For
   example, you might have an `auth` directory, which would contain files
   like `auth_viewmodel.dart`, `login_usecase.dart`, `logout_usecase.dart`,
   `login_screen.dart`, `logout_button.dart`, etc.

   按功能 — 每个功能所需的类放在一起。
   例如 `auth` 目录可含 `auth_viewmodel.dart`、`login_usecase.dart`、`logout_usecase.dart`、`login_screen.dart`、`logout_button.dart` 等。

2. By type - Each "type" of architecture is grouped together.
   For example, you might have directories such as
   `repositories`, `models`, `services`, and `viewmodels`.

   按类型 — 每种架构「类型」放在一起，例如 `repositories`、`models`、`services`、`viewmodels` 等目录。

The architecture recommended in this guide lends itself to
a combination of the two.
Data layer objects (repositories and services) aren't tied to a single feature,
while UI layer objects (views and view models) are.
The following is how the code is organized within the Compass application.

本指南推荐的架构适合两者结合：
数据层对象（repository 与 service）不绑定单一功能，UI 层对象（view 与 view model）则绑定功能。
Compass 应用中的代码组织如下。

<FileTree>

- lib/
  - ui/
    - core/
      - ui/ 
        - <shared_widgets>
      - themes/
    - <feature_name>/
      - view_models/
        - <view_model_class>.dart
      - widgets/
        - <feature_name>_screen.dart
        - <other_widgets>
  - domain/
    - models/
      - <model_name>.dart
  - data/
    - repositories/
      - <repository_class>.dart
    - services/
      - <service_class>.dart
    - model/
      - <api_model_class>.dart
  - config/
  - utils/
  - routing/
  - main_staging.dart
  - main_development.dart
  - main.dart
- test/ // Contains unit and widget tests.
  - data/
  - domain/
  - ui/
  - utils/
- testing/ // Contains mocks that other classes need to execute tests.
  - fakes/
  - models/

</FileTree>

Most of the application code lives in the
`data`, `domain`, and `ui` folders.
The data folder organizes code by type,
because repositories and services can be used across
different features and by multiple view models.
The ui folder organizes the code by feature,
because each feature has exactly one view and exactly one view model.

大部分应用代码位于 `data`、`domain` 与 `ui` 文件夹。
`data` 按类型组织，因为 repository 与 service 可跨功能、被多个 view model 使用。
`ui` 按功能组织，因为每个功能恰好有一个 view 与一个 view model。

Other notable features of this folder structure:

该文件夹结构的其他要点：

* The UI folder also contains a subdirectory named "core".
  Core contains widgets and theme logic that is shared by multiple views,
  such as buttons with your brand styling.

  UI 文件夹还有名为 `core` 的子目录，包含多 view 共享的 widget 与主题逻辑（如品牌样式按钮）。

* The domain folder contains the application data types, because they're
  used by the data and ui layers.

  `domain` 文件夹包含应用数据类型，供数据层与 UI 层使用。

* The app contains three "main" files, which act as different entry points to
  the application for development, staging, and production.

  应用有三个 `main` 文件，分别作为开发、预发布与生产的入口。

* There are two test-related directories at the same level as `lib`: `test/` has
  the test code, and its own structure matches `lib/`. `testing/` is a
  subpackage that contains mocks and other testing utilities which can be used
  in other packages' test code. The `testing/` folder could be described as a
  version of your app that you don't ship. It's the content that is tested.

  与 `lib` 同级有两个测试相关目录：`test/` 含测试代码，
  结构与 `lib/` 对应；`testing/` 是子 package，含 mock 等测试工具，
  可供其他 package 测试使用。`testing/` 可视为不随应用发布的「被测内容」版本。

There's additional code in the compass app that doesn't pertain to architecture.
For the full package structure, [view it on GitHub][].

Compass 应用中还有与架构无关的额外代码。完整 package 结构请 [在 GitHub 上查看][view it on GitHub]。

## Other architecture options

## 其他架构选项

The example in this case-study demonstrates how one application abides by our
recommended architectural rules, but there are many other example apps that
could've been written. The UI of this app leans heavily on view models
and `ChangeNotifier`, but it could've easily been written
with streams, or with other libraries such as [`riverpod`][],
[`flutter_bloc`][], and [`signals`][].
The communication between layers of this app handled
everything with method calls, including polling for new data.
It could've instead used streams to expose data from a repository to
a view model and still abide by the rules covered in this guide.

本案例展示一个应用如何遵循推荐架构规则，但也可写出许多其他示例。
本应用 UI 重度依赖 view model 与 `ChangeNotifier`，
也可用 stream 或 [`riverpod`][]、[`flutter_bloc`][]、[`signals`][] 等库实现。
层间通信本例全部用方法调用（含轮询新数据），
也可用 stream 从 repository 向 view model 暴露数据，仍符合本指南规则。

Even if you do follow this guide exactly,
and choose not to introduce additional libraries, you have decisions to make:
Will you have a domain layer?
If so, how will you manage data access?
The answer depends so much on an individual team's needs that
there isn't a single right answer.
Regardless of how you answer these questions,
the principles in this guide will help you write scalable Flutter apps.

即使完全遵循本指南、不引入额外库，你仍需决策：是否有领域层？若有，如何管理数据访问？
答案高度依赖团队需求，没有唯一正确答案。
无论如何作答，本指南原则都有助于编写可扩展的 Flutter 应用。

And if you squint, aren't all architectures MVVM anyway?

往大了说，一切架构不都是 MVVM 吗？

[Compass sample application]: https://github.com/flutter/samples/tree/main/compass_app
[MVVM architectural pattern]: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel
[app architecture guidelines]: /app-architecture/guide
[data layer]: /app-architecture/case-study/data-layer
[UI layer]: /app-architecture/case-study/ui-layer
[Command pattern]: /app-architecture/case-study/ui-layer#command-objects
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[Dependency Injection]: /app-architecture/case-study/dependency-injection
[set up tests]: /app-architecture/case-study/testing
[view it on GitHub]: https://github.com/flutter/samples/tree/main/compass_app
[GitHub]: https://github.com/flutter/samples/tree/main/compass_app
[`riverpod`]: {{site.pub-pkg}}/riverpod
[`flutter_bloc`]: {{site.pub-pkg}}/flutter_bloc
[`signals`]: {{site.pub-pkg}}/signals
[package structure]: /app-architecture/case-study#package-structure

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

网站本节内容仍在完善中，
[欢迎提供反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/index"
