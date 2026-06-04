---
# title: Architecting Flutter apps
title: 构建 Flutter 应用架构
# shortTitle: Architecture
shortTitle: 架构
# description: >
#   Learn how to structure Flutter apps.
description: >
  学习如何组织 Flutter 应用结构。
# showToc: false
showToc: false
# next:
#   title: Architecture concepts
#   path: /app-architecture/concepts
next:
  title: 架构概念
  path: /app-architecture/concepts
ai-translated: true
---

<div class="side-by-side">
<div>

Architecture is an important part of building a
maintainable, resilient, and scalable Flutter app.
In this guide, you'll learn app architecture principles and
best practices for building Flutter apps.

架构是构建可维护、有韧性且可扩展的 Flutter 应用的重要一环。
在本指南中，你将学习应用架构原则以及构建 Flutter 应用的最佳实践。

'Architecture' is a word that's hard to define.
It's a broad term and can refer to any number
of topics depending on the context. In this guide,
'architecture' refers to how to structure, organize, and design
your Flutter app in order to scale as your project requirements and team grow.

「架构」这个词很难精确定义。
它是一个宽泛术语，在不同语境下可以指许多不同主题。
在本指南中，「架构」指如何组织、划分与设计 Flutter 应用结构，
以便随项目需求与团队规模增长而扩展。

</div>
<div class="centered-rows">
<img src='/assets/images/docs/app-architecture/hero-image.png' style="max-height: 480px;" alt="Hero image">
</div>
</div>


## What you'll learn

## 你将学到什么

* Benefits of intentional architecture

  有意为之的架构带来的好处

* Common architectural principles

  常见架构原则

* The Flutter team's recommended app architecture

  Flutter 团队推荐的应用架构

* MVVM and state management

  MVVM 与状态管理

* Dependency injection

  依赖注入

* Common design patterns for writing robust Flutter applications

  编写健壮 Flutter 应用的常见设计模式

{% comment %}
TODO @ewindmill complete this list as pages land, add links.
{% endcomment %}

## Benefits of intentional architecture

## 有意为之的架构的好处

Good app architecture provides a number of benefits to
engineering teams and their end users.

良好的应用架构为工程团队与最终用户带来诸多好处。

* Maintainability - App architecture makes it easier to modify, update, and fix
  issues over time.

  可维护性 — 应用架构使长期修改、更新与修复问题更容易。

* Scalability - A well thought out application allows more people to contribute
  to the same codebase concurrently, with minimal code conflicts.

  可扩展性 — 经过深思熟虑的应用设计能让更多人并行贡献同一代码库，并尽量减少代码冲突。

* Testability - Applications with intentional architecture generally have
  simpler classes with well-defined inputs and outputs, which makes them easier
  to mock and test.

  可测试性 — 有意为之的架构通常带来输入输出边界清晰的更简单类，更易于 mock 与测试。

* Lower cognitive load - Developers who are new to the project will be more
  productive in a shorter amount of time, and code reviews are generally less
  time-consuming when code is easier to understand.

  更低认知负担 — 新加入项目的开发者能更快上手，代码更易理解时，代码评审通常也更省时。

* A better user experience - Features can ship faster and with fewer bugs.

  更好的用户体验 — 功能可以更快上线，且 bug 更少。

## How to use this guide

## 如何使用本指南

This is a guide for building scalable Flutter applications and was written for
teams that have multiple developers contributing to the same code base,
who're building a feature-rich application.
If you're writing a Flutter app that has a *growing team and codebase*,
this guidance is for you.

本指南面向构建可扩展 Flutter 应用的团队而写，
适用于多名开发者共同维护同一代码库、并构建功能丰富应用的情形。
若你正在开发的 Flutter 应用拥有*不断壮大的团队与代码库*，
这些指导正适合你。

Along with general architectural advice, this guide gives concrete examples of
best practices and includes specific recommendations.
Some libraries can be swapped out, and very large teams with unique complexity
might find that some parts don't apply.
In either case, the ideas remain sound.
This is the recommended way to build a Flutter app.

除一般架构建议外，本指南还提供最佳实践的具体示例与明确推荐。
部分库可以替换；规模极大且复杂度特殊的团队可能发现某些部分并不适用。
无论哪种情况，核心理念仍然成立。
这是构建 Flutter 应用的推荐方式。

In the first part of this guide, you'll learn about common architectural
principles from a high level. In the second part,
the guide walks through specific and
concrete recommendations of architecting Flutter apps.
Finally, at the end of the guide, you'll find a list of design patterns and
sample code that shows the recommendations in action.

指南第一部分从宏观层面介绍常见架构原则。
第二部分逐步讲解构建 Flutter 应用的具体、可落地建议。
最后在指南末尾，你会看到设计模式列表与示例代码，展示这些建议如何落地。

[Common architectural principles]: /app-architecture/concepts
[recommended app architecture]: /app-architecture/guide
[MVVM]: /app-architecture/guide#mvvm


## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

网站本节内容仍在完善中，
[欢迎提供反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="index"
