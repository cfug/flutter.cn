---
# title: Architecture recommendations and resources
title: 架构建议与资源
# shortTitle: Architecture recommendations
shortTitle: 架构建议
# description: >
#   Recommendations for building scalable Flutter applications.
description: >
  构建可扩展 Flutter 应用的建议。
# prev:
#   title: Architecture case study
#   path: /app-architecture/case-study
prev:
  title: 架构案例研究
  path: /app-architecture/case-study
# next:
#   title: Design patterns
#   path: /app-architecture/design-patterns
next:
  title: 设计模式
  path: /app-architecture/design-patterns
ai-translated: true
---

This page presents architecture best practices, why they matter, and
whether we recommend them for your Flutter application.
You should treat these recommendations as recommendations,
and not steadfast rules, and you should
adapt them to your app's unique requirements.

本页介绍架构最佳实践、其重要性，
以及是否建议你在 Flutter 应用中采用。
请将这些内容视为建议而非铁律，
并根据应用的独特需求加以调整。

The best practices on this page have a priority,
which reflects how strongly the Flutter team recommends it.

本页最佳实践带有优先级，反映 Flutter 团队的推荐力度。

* **Strongly recommend:** You should always implement this recommendation if
  you're starting to build a new application. You should strongly consider
  refactoring an existing app to implement this practice unless doing so would
  fundamentally clash with your current approach.

  **强烈推荐：** 若你正在新建应用，应始终落实该建议。
  除非与现有做法根本冲突，否则应认真考虑在既有应用中重构以落实该实践。

* **Recommend**: This practice will likely improve your app.

  **推荐：** 该实践很可能改善你的应用。

* **Conditional**: This practice can improve your app in certain circumstances.

  **视情况而定：** 该实践在特定情形下可能改善你的应用。

## Separation of concerns

## 关注点分离

You should separate your app into a UI layer and a data layer. Within those layers, 
you should further separate logic into classes by responsibility.

你应将应用划分为 UI 层与数据层。
在各层内部，还应按职责将逻辑进一步拆分到不同类中。

<ArchitectureRecommendations category="separation-of-concerns" />

## Handling data

## 数据处理

Handling data with care makes your code easier to understand, less error prone, and
prevents malformed or unexpected data from being created.

谨慎处理数据能让代码更易理解、更少出错，
并避免产生畸形或意外的数据。

<ArchitectureRecommendations category="handling-data" />

## App structure

## 应用结构

Well organized code benefits both the health of the app itself, and the team working on the code.

组织良好的代码既有利于应用本身的健康，也有利于维护代码的团队。

<ArchitectureRecommendations category="app-structure" />

## Testing

## 测试

Good testing practices makes your app flexible. 
It also makes it straightforward and low risk to add new logic and new UI.

良好的测试实践使应用更灵活，
也让新增逻辑与 UI 变得直接且低风险。

<ArchitectureRecommendations category="testing" />

<a id="recommended-resources" aria-hidden="true"></a>

## Recommended resources {:#resources}

## 推荐资源 {:#resources}

* Code and templates

  代码与模板

  * [Compass app source code][] -
    Source code of a full-featured, robust Flutter application that
    implements many of these recommendations.

    [Compass 应用源代码][] —
    功能完整、健壮的 Flutter 应用源代码，落实了本指南中的许多建议。

  * [very_good_cli][] -
    A Flutter application template made by
    the Flutter experts Very Good Ventures.
    This template generates a similar app structure.

    [very_good_cli][] —
    由 Flutter 专家 Very Good Ventures 制作的 Flutter 应用模板，
    可生成类似的应用结构。

* Documentation

  文档

  * [Very Good Engineering architecture documentation][] -
    Very Good Engineering is a documentation site by VGV that has
    technical articles, demos, and open-sourced projects.
    It includes documentation on architecting Flutter applications.

    [Very Good Engineering 架构文档][] —
    Very Good Engineering 是 VGV 的文档站点，包含技术文章、演示与开源项目，
    其中包括 Flutter 应用架构相关文档。

* Tooling

  工具

  * [Flutter developer tools][] -
    DevTools is a suite of performance and debugging tools for Dart and Flutter.

    [Flutter 开发者工具][] —
    DevTools 是一套面向 Dart 与 Flutter 的性能与调试工具。

  * [flutter_lints][] -
    A package that contains the lints for
    Flutter apps recommended by the Flutter team.
    Use this package to encourage good coding practices across a team.

    [flutter_lints][] —
    包含 Flutter 团队为 Flutter 应用推荐的 lint 规则的软件包，
    可用于在团队中推广良好编码实践。


[Compass app source code]: https://github.com/flutter/samples/tree/main/compass_app
[Compass 应用源代码]: https://github.com/flutter/samples/tree/main/compass_app
[very_good_cli]: https://cli.vgv.dev/
[Very Good Engineering architecture documentation]: https://engineering.verygood.ventures/architecture/architecture/
[Very Good Engineering 架构文档]: https://engineering.verygood.ventures/architecture/architecture/
[Flutter developer tools]: /tools/devtools
[Flutter 开发者工具]: /tools/devtools
[flutter_lints]: https://pub.dev/packages/flutter_lints

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

网站本节内容仍在完善中，
[欢迎提供反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="recommendations"
