---
# title: Architecting Flutter apps
title: 构建 Flutter 应用的架构
# shortTitle: Architecture
shortTitle: 架构
# description: >
#   Learn how to structure Flutter apps.
description: >
  学习如何组织 Flutter 应用的结构。
showToc: false
next:
  # title: Architecture concepts
  title: 架构概念
  path: /app-architecture/concepts
---

<div class="side-by-side">
<div>

Architecture is an important part of building a
maintainable, resilient, and scalable Flutter app.
In this guide, you'll learn app architecture principles and
best practices for building Flutter apps.

架构是构建可维护、可靠且可扩展的 Flutter 应用的重要组成部分。
在本指南中，你将学习应用架构原则以及构建 Flutter 应用的最佳实践。

'Architecture' is a word that's hard to define.
It's a broad term and can refer to any number
of topics depending on the context. In this guide,
'architecture' refers to how to structure, organize, and design
your Flutter app in order to scale as your project requirements and team grow.

"架构"是一个很难定义的词。
它是一个广泛的术语，根据上下文可以指代许多不同的主题。
在本指南中，"架构"是指如何组织、规划和设计你的 Flutter 应用，
以便随着项目需求和团队的增长而进行扩展。

</div>
<div class="centered-rows">
<img src='/assets/images/docs/app-architecture/hero-image.png' style="max-height: 480px;" alt="Hero image">
</div>
</div>


## What you'll learn

## 你将学到什么

* Benefits of intentional architecture
* Common architectural principles
* The Flutter team's recommended app architecture
* MVVM and state management
* Dependency injection
* Common design patterns for writing robust Flutter applications

* 有意识地进行架构设计的好处
* 常见的架构原则
* Flutter 团队推荐的应用架构
* MVVM 和状态管理
* 依赖注入
* 编写健壮的 Flutter 应用的常见设计模式

{% comment %}
TODO @ewindmill complete this list as pages land, add links.
{% endcomment %}

## Benefits of intentional architecture

## 有意识地进行架构设计的好处

Good app architecture provides a number of benefits to
engineering teams and their end users.

良好的应用架构为工程团队及其最终用户提供了许多好处。

* Maintainability - App architecture makes it easier to modify, update, and fix
  issues over time.

  可维护性——应用架构使得随着时间的推移，修改、更新和修复问题变得更加容易。

* Scalability - A well thought out application allows more people to contribute
  to the same codebase concurrently, with minimal code conflicts.

  可扩展性——经过深思熟虑的应用允许更多人同时为同一代码库做出贡献，并且代码冲突最少。

* Testability - Applications with intentional architecture generally have
  simpler classes with well-defined inputs and outputs, which makes them easier
  to mock and test.

  可测试性——有意识地进行架构设计的应用通常拥有更简单的类，具有明确定义的输入和输出，这使得它们更容易进行模拟和测试。

* Lower cognitive load - Developers who are new to the project will be more
  productive in a shorter amount of time, and code reviews are generally less
  time-consuming when code is easier to understand.

  更低的认知负担——新加入项目的开发者可以在更短的时间内提高生产力，当代码更容易理解时，代码审查通常也不那么耗时。

* A better user experience - Features can ship faster and with fewer bugs.

  更好的用户体验——功能可以更快地交付，并且 bug 更少。

## How to use this guide

## 如何使用本指南

This is a guide for building scalable Flutter applications and was written for
teams that have multiple developers contributing to the same code base,
who're building a feature-rich application.
If you're writing a Flutter app that has a *growing team and codebase*,
this guidance is for you.

这是一份用于构建可扩展 Flutter 应用的指南，专为多个开发者在同一代码库中协作、
构建功能丰富的应用的团队而编写。
如果你正在编写一个拥有*不断增长的团队和代码库*的 Flutter 应用，
本指南就是为你准备的。

Along with general architectural advice, this guide gives concrete examples of
best practices and includes specific recommendations.
Some libraries can be swapped out, and very large teams with unique complexity
might find that some parts don't apply.
In either case, the ideas remain sound.
This is the recommended way to build a Flutter app.

除了一般的架构建议外，本指南还提供了最佳实践的具体示例，并包含特定的建议。
某些库可以替换，而拥有独特复杂性的大型团队可能会发现某些部分并不适用。
无论哪种情况，这些理念都是合理的。
这是构建 Flutter 应用的推荐方式。

In the first part of this guide, you'll learn about common architectural
principles from a high level. In the second part,
the guide walks through specific and
concrete recommendations of architecting Flutter apps.
Finally, at the end of the guide, you'll find a list of design patterns and
sample code that shows the recommendations in action.

在本指南的第一部分，你将从较高的层面了解常见的架构原则。
在第二部分，本指南将介绍构建 Flutter 应用架构的具体建议。
最后，在指南的末尾，你将找到一系列设计模式和示例代码，展示这些建议的实际应用。

[Common architectural principles]: /app-architecture/concepts
[recommended app architecture]: /app-architecture/guide
[MVVM]: /app-architecture/guide#mvvm


## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

由于网站的这一部分仍在不断完善中，
我们 [欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="index"
