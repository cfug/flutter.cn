---
title: Test drive
title: 开发体验初探
description: How to create a templated Flutter app and use hot reload.
description: 如何使用 hot reload 创建一个 Flutter 应用模版。
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

This page describes how to create a new Flutter app from templates, run it,
and experience "hot reload" after you make changes to the app.

本页面讲解如何通过模板实现一个 Flutter 应用，执行并且在修改程序之后触发“热重载 (hot reload)”功能。

Select your development tool of choice for writing, building, and running Flutter apps.

选择你用于编写、编译、执行 Flutter 应用的开发环境吧。

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="editor-setup" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="androidstudio-tab" href="#androidstudio" role="tab" aria-controls="androidstudio" aria-selected="true">Android Studio and IntelliJ</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="vscode-tab" href="#vscode" role="tab" aria-controls="vscode" aria-selected="false">Visual Studio Code</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="terminal-tab" href="#terminal" role="tab" aria-controls="terminal" aria-selected="false">终端 & 文本编辑器</a>
  </li>
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">
  {% include_relative _androidstudio.md %}
  {% include_relative _vscode.md %}
  {% include_relative _terminal.md %}
</div>


## 下一步

You'll next learn some core Flutter concepts by creating a small app.

接下来，你会通过一个小的应用学到一些 Flutter 的核心概念。

[Install]: /docs/get-started/install
[Main IntelliJ toolbar]: {% asset tools/android-studio/main-toolbar.png @path %}
[Managing AVDs]: {{site.android-dev}}/studio/run/managing-avds
[Material Components]: {{site.material}}/guidelines
