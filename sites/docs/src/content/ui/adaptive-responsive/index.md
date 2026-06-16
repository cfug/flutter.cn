---
# title: Adaptive and responsive design in Flutter
title: Flutter 中的自适应与响应式设计
# description: >-
#   It's important to create an app,
#   whether for mobile or web,
#   that responds to size and orientation changes
#   and maximizes the use of each platform.
# shortTitle: Adaptive design
description: >-
  创建能响应尺寸与方向变化、
  并充分利用各平台的应用（移动端或 Web）很重要。
shortTitle: 自适应设计
ai-translated: true
---

![List of supported platforms](/assets/images/docs/ui/adaptive-responsive/platforms.png)

One of Flutter's primary goals is to create a framework
that allows you to develop apps from a single codebase
that look and feel great on any platform.

Flutter 的主要目标之一是创建框架，让你从单一代码库开发在任何平台都出色好看的应用。

This means that your app might appear on screens of
many different sizes, from a watch, to a foldable
phone with two screens, to a high definition monitor.
And your input device might be a physical or
virtual keyboard, a mouse, a touchscreen, or
any number of other devices.

这意味着应用可能出现在多种尺寸的屏幕上，从手表、双屏折叠手机到高清显示器。
输入设备可能是实体或虚拟键盘、鼠标、触摸屏或其他多种设备。

Two terms that describe these design concepts
are _adaptive_ and _responsive_. Ideally,
you'd want your app to be _both_ but what,
exactly, does this mean?

描述这些设计概念的两个术语是 **adaptive**（自适应）与 **responsive**（响应式）。
理想情况下，你希望应用 **兼具两者**，但这究竟意味着什么？

## What is responsive vs adaptive?

## 什么是响应式与自适应？

An easy way to think about it is that responsive design
is about fitting the UI _into_ the space and
adaptive design is about the UI being _usable_ in
the space.

一个简单的理解是：响应式设计关乎让 UI **融入** 空间，
自适应设计关乎 UI 在空间内 **可用**。

So, a responsive app adjusts the placement of design
elements to _fit_ the available space. And an
adaptive app selects the appropriate layout and
input devices to be usable _in_ the available space.
For example, should a tablet UI use bottom navigation or
side-panel navigation?

因此，响应式应用调整设计元素位置以 **适应** 可用空间；
自适应应用选择合适布局与输入设备，以便在可用空间内 **可用**。
例如，平板 UI 应使用底部导航还是侧边面板导航？

:::note
Often adaptive and responsive concepts are
collapsed into a single term. Most often,
_adaptive design_ is used to refer to both
adaptive and responsive.

通常自适应与响应式概念会合并为一个术语，
最常见的是用 **adaptive design** 同时指代自适应与响应式。
:::

This section covers various aspects of adaptive and
responsive design:

本节涵盖自适应与响应式设计的多个方面：

* [General approach][]

  [一般方法][General approach]

* [SafeArea & MediaQuery][]

  [SafeArea 与 MediaQuery][SafeArea & MediaQuery]

* [Large screens & foldables][]

  [大屏与折叠屏][Large screens & foldables]

* [User input & accessibility][]

  [用户输入与无障碍][User input & accessibility]

* [Capabilities & policies][]

  [能力与策略][Capabilities & policies]

* [Best practices for adaptive apps][]

  [自适应应用最佳实践][Best practices for adaptive apps]

* [Additional resources][]

  [更多资源][Additional resources]

[Additional resources]: /ui/adaptive-responsive/more-info
[Best practices for adaptive apps]: /ui/adaptive-responsive/best-practices
[Capabilities & policies]: /ui/adaptive-responsive/capabilities
[General approach]: /ui/adaptive-responsive/general
[Large screens & foldables]: /ui/adaptive-responsive/large-screens
[SafeArea & MediaQuery]: /ui/adaptive-responsive/safearea-mediaquery
[User input & accessibility]: /ui/adaptive-responsive/input

:::note
You might also check out the Google I/O 2024 talk about
this subject.

你也可以观看 Google I/O 2024 关于此主题的演讲。

<YouTubeEmbed id="LeKLGzpsz9I" title="How to build adaptive UI with Flutter"></YouTubeEmbed>
:::
