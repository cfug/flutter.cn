---
title: Test drive
title: 开发体验初探
description: How to create a templated Flutter app and use hot reload.
description: 如何使用 hot reload 创建一个 Flutter 应用模版。
tags: Flutter安装,Flutter环境搭建
keywords: Flutter IDE,Flutter编辑器,Android Studio,VS Code,Flutter插件
prev:
  title: Set up an editor
  title: 编辑工具设定
  path: /docs/get-started/editor
next:
  title: Write your first Flutter app
  title: 编写第一个 Flutter 应用
  path: /docs/get-started/codelab
toc: false
---

This page describes the following tasks:

本篇文章讲解以下内容：

1. How to create a new Flutter app from templates.

   如何基于模板创建新的 Flutter 应用。

1. How to run the created Flutter app.

   如何运行创建好的 Flutter 应用。

1. How to use "hot reload" after you make changes to the app.

   如何在应用中使用「热重载」应用你的更改。

Details for these tasks depend on the integrated development environment
(IDE) you use.

这些任务的细节会根据你使用的 IDE 的不同有所变化。

The first two options listed rely on the Flutter plugin for
the respective IDE.
Visual Studio Code, Android Studio, and IntelliJ IDEA Community,
Educational, and Ultimate editions support Flutter development
through plugins.

前两个任务依赖于 IDE 上的 Flutter 插件。
Visual Studio Code、Android Studio、以及 IntelliJ IDEA 的
Community、Educational 和 Ultimate 版本都通过插件支持 Flutter 开发。

The third option explains how to use an editor of your choice and
the terminal to run the commands.

第三个任务向你解释了如何用你使用的编辑器或者终端来运行命令。

Select your preferred IDE for Flutter apps.

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="editor-setup" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="vscode-tab" href="#vscode" role="tab" aria-controls="vscode" aria-selected="true">Visual Studio Code</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="androidstudio-tab" href="#androidstudio" role="tab" aria-controls="androidstudio" aria-selected="false">Android Studio and IntelliJ</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="terminal-tab" href="#terminal" role="tab" aria-controls="terminal" aria-selected="false">终端 & 文本编辑器</a>
  </li>
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">
  {% include_relative _vscode.md %}
  {% include_relative _androidstudio.md %}
  {% include_relative _terminal.md %}
</div>
