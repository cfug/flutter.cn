---
# title: Architecture recommendations and resources
title: 架构推荐与资源
# shortTitle: Architecture recommendations
shortTitle: 架构推荐
# description: >
#   Recommendations for building scalable Flutter applications.
description: >
  构建可扩展 Flutter 应用的推荐方案。
prev:
  # title: Architecture case study
  title: 架构案例研究
  path: /app-architecture/case-study
next:
  # title: Design patterns
  title: 设计模式
  path: /app-architecture/design-patterns
---

This page presents architecture best practices, why they matter, and
whether we recommend them for your Flutter application.
You should treat these recommendations as recommendations,
and not steadfast rules, and you should
adapt them to your app's unique requirements.

本页介绍了架构最佳实践、它们的重要性，
以及我们是否推荐你在 Flutter 应用中采用它们。
你应该将这些推荐视为建议，
而非一成不变的规则，
并根据应用的独特需求进行调整。

The best practices on this page have a priority,
which reflects how strongly the Flutter team recommends it.

本页的最佳实践都有一个优先级，
反映了 Flutter 团队的推荐程度。

* **Strongly recommend:** You should always implement this recommendation if
  you're starting to build a new application. You should strongly consider
  refactoring an existing app to implement this practice unless doing so would
  fundamentally clash with your current approach.

  **强烈推荐：** 如果你正在构建一个新应用，应该始终采用此推荐。
  对于现有应用，你也应该认真考虑通过重构来实施此实践，
  除非这样做会与你当前的方案产生根本性冲突。

* **Recommend**: This practice will likely improve your app.

  **推荐：** 此实践可能会改善你的应用。

* **Conditional**: This practice can improve your app in certain circumstances.

  **视情况而定：** 此实践在某些情况下可以改善你的应用。

## Separation of concerns

## 关注点分离

You should separate your app into a UI layer and a data layer. Within those layers,
you should further separate logic into classes by responsibility.

你应该将应用分为 UI 层和数据层。在每一层中，
你还应该按职责将逻辑进一步拆分到不同的类中。

<ArchitectureRecommendations category="separation-of-concerns" />

## Handling data

## 数据处理

Handling data with care makes your code easier to understand, less error prone, and
prevents malformed or unexpected data from being created.

谨慎地处理数据可以使你的代码更易于理解、更不容易出错，
并防止创建格式错误或意外的数据。

<ArchitectureRecommendations category="handling-data" />

## App structure

## 应用结构

Well organized code benefits both the health of the app itself, and the team working on the code.

良好的代码组织既有利于应用本身的健康发展，也有利于团队的协作开发。

<ArchitectureRecommendations category="app-structure" />

## Testing

## 测试

Good testing practices makes your app flexible.
It also makes it straightforward and low risk to add new logic and new UI.

良好的测试实践使你的应用更具灵活性，
也使添加新逻辑和新 UI 变得简单且低风险。

<ArchitectureRecommendations category="testing" />

<a id="recommended-resources" aria-hidden="true"></a>

## Recommended resources {:#resources}

## 推荐资源 {:#resources}

* Code and templates
  * [Compass app source code][] -
    Source code of a full-featured, robust Flutter application that
    implements many of these recommendations.
  * [very_good_cli][] -
    A Flutter application template made by
    the Flutter experts Very Good Ventures.
    This template generates a similar app structure.

* 代码和模板
  * [Compass app source code][] -
    一个功能完整、健壮的 Flutter 应用的源代码，
    实现了本页中的许多推荐方案。
  * [very_good_cli][] -
    由 Flutter 专家团队 Very Good Ventures 制作的
    Flutter 应用模板。
    该模板生成类似的应用结构。

* Documentation
  * [Very Good Engineering architecture documentation][] -
    Very Good Engineering is a documentation site by VGV that has
    technical articles, demos, and open-sourced projects.
    It includes documentation on architecting Flutter applications.
  * [State Management with ChangeNotifier walkthrough][] -
    A gentle introduction into using the primitives in
    the Flutter SDK for your state management.

* 文档
  * [Very Good Engineering architecture documentation][] -
    Very Good Engineering 是 VGV 的一个文档网站，包含技术文章、
    演示和开源项目。
    其中包括 Flutter 应用架构的相关文档。
  * [State Management with ChangeNotifier walkthrough][] -
    一个关于使用 Flutter SDK 中的基本构件
    进行状态管理的入门介绍。

* Tooling
  * [Flutter developer tools][] -
    DevTools is a suite of performance and debugging tools for Dart and Flutter.
  * [flutter_lints][] -
    A package that contains the lints for
    Flutter apps recommended by the Flutter team.
    Use this package to encourage good coding practices across a team.

* 工具
  * [Flutter developer tools][] -
    DevTools 是一套用于 Dart 和 Flutter 的性能和调试工具。
  * [flutter_lints][] -
    一个包含 Flutter 团队推荐的 Flutter 应用 lint 规则的 package。
    使用此 package 可以在团队中推广良好的编码实践。


[Compass app source code]: https://github.com/flutter/samples/tree/main/compass_app
[very_good_cli]: https://cli.vgv.dev/
[Very Good Engineering architecture documentation]: https://engineering.verygood.ventures/architecture/architecture/
[State Management with ChangeNotifier walkthrough]: /get-started/fwe/state-management
[Flutter developer tools]: /tools/devtools
[flutter_lints]: https://pub.dev/packages/flutter_lints

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

由于网站的这一部分仍在不断完善中，
我们 [欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="recommendations"
