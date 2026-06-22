---
# title: GenUI SDK for Flutter
title: 适用于 Flutter 的 GenUI SDK
sidenav: ai
# shortTitle: GenUI SDK
shortTitle: GenUI SDK
# description: >-
#   Learn how to use GenUI SDK for Flutter to build more
#   interactive experiences for applications and chatbots.
description: >-
  了解如何使用适用于 Flutter 的 GenUI SDK，为应用与聊天机器人构建更具交互性的体验。
next:
  # title: GenUI SDK main components & concepts
  title: GenUI SDK 主要组件与概念
  path: /ai/genui/components
ai-translated: true
---

## What is GenUI?

## 什么是 GenUI？

At its core, the GenUI SDK for Flutter is an orchestration layer.
This suite of packages coordinates the flow of information between your user,
your Flutter widgets, and an AI agent,
transforming text-based conversations into rich, interactive experiences.

其核心上，适用于 Flutter 的 GenUI SDK 是一个编排层。
这套 package 协调用户、Flutter widget 与 AI 智能体之间的信息流，将基于文本的对话转化为丰富的交互体验。

Imagine that, instead of presenting your user with a wall of text,
they are presented with a graphical UI consisting of (for example),
a row of labeled buttons and a date picker.

想象一下，你不是向用户展示一堵文字墙，而是展示由（例如）一行带标签按钮和日期选择器组成的图形 UI。

The GenUI SDK for Flutter uses a JSON-based format to
compose a UI from your existing
widget catalog. As a user interacts with the UI,
state changes are fed back to the agent,
creating a high-bandwidth loop and turning
an agent interaction into a rich, intuitive experience.

适用于 Flutter 的 GenUI SDK 使用基于 JSON 的格式，
从你现有的 widget 目录组合 UI。用户与 UI 交互时，
状态变化会反馈给智能体，形成高带宽循环，将智能体交互变为丰富、直观的体验。

The GenUI SDK for Flutter is designed to easily integrate
into your Flutter application.

适用于 Flutter 的 GenUI SDK 旨在轻松集成到你的 Flutter 应用中。

## When would you use it?

## 何时使用？

Use GenUI SDK for Flutter to incorporate graphical UI
into your app.  For example:

在应用中加入图形 UI 时使用 GenUI SDK for Flutter。
例如：

* Instead of describing a list of products in text,
  use it to render a clickable carousel of product widgets.

  不要用文字描述产品列表，用它渲染可点击的产品 widget 轮播。

* When a user asks to plan a trip, use it to generate a
  complete form with sliders, date pickers, and text fields.

  当用户要求规划旅行时，用它生成带滑块、日期选择器和文本字段的完整表单。

For more context about GenUI SDK for Flutter,
check out the [Getting started with GenUI video][]:

有关 GenUI SDK for Flutter 的更多背景，
请参阅 [GenUI 入门视频][Getting started with GenUI video]：

<YouTubeEmbed id="nWr6eZKM6no"
    title="Getting started with GenUI"></YouTubeEmbed>

Also, check out the Flutter + A2UI = GenUI video from
Google I/O 2026!

也可观看 Google I/O 2026 的 Flutter + A2UI = GenUI 视频！

<YouTubeEmbed id="tXeyaV1gVJk"
    title="Flutter + A2UI = GenUI"></YouTubeEmbed>

:::experimental
The `genui` package is in
alpha and is likely to change.

`genui` package 处于 alpha 阶段，可能会变更。
:::

[Getting started with GenUI video]: https://www.youtube.com/watch?v=nWr6eZKM6no
