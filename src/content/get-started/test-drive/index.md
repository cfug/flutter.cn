---
# title: Test drive
title: 开发体验初探
# description: How to create a templated Flutter app and use hot reload.
description: 如何使用 hot reload 创建一个 Flutter 应用模版。
tags: Flutter安装,Flutter环境搭建
keywords: Flutter IDE,Flutter编辑器,Android Studio,VS Code,Flutter插件
prev:
  # title: Install Flutter
  title: 安装和环境配置
  path: /get-started/install
next:
  # title: Write your first Flutter app
  title: 编写第一个 Flutter 应用
  path: /get-started/codelab
toc: false
---

{% case os %}
{% when 'Windows' -%}
   {% assign path='C:\dev\' %}
   {% assign terminal='PowerShell' %}
   {% assign prompt1='D:>' %}
   {% assign prompt2=path | append: '>' %}
   {% assign dirdl='%CSIDL_DEFAULT_DOWNLOADS%\' %}
{% when "macOS" -%}
   {% assign path='~/development/' %}
   {% assign terminal='Terminal' %}
   {% assign prompt1='$' %}
   {% assign prompt2='$' %}
   {% assign dirdl='~/Downloads/' %}
{% else -%}
   {% assign path='~/development/' %}
   {% assign terminal='shell' %}
   {% assign prompt1='$' %}
   {% assign prompt2='$' %}
   {% assign dirdl='~/Downloads/' %}
{% endcase -%}

## What you'll learn

## 你将了解到什么

1. How to create a new Flutter app from a sample template.

   如何基于示例模板创建新的 Flutter 应用。

1. How to run the new Flutter app.

   如何运行新的 Flutter 应用。

1. How to use "hot reload" after you make changes to the app.

   如何在应用中使用「热重载」应用你的更改。

These tasks depend on which integrated development environment (IDE) you use.

这些工作的细节会根据你使用 IDE 的不同，有所变化。

* **Option 1** explains how to code with Visual Studio Code and
  its Flutter extension.

  **选项 1** 讲解如何使用 Visual Studio Code 及其 Flutter 扩展进行编码。

* **Option 2** explains how to code with Android Studio or IntelliJ IDEA with
  its Flutter plugin.

  **选项 2** 讲解如何使用 Android Studio 或 IntelliJ IDEA 及其 Flutter 插件进行编码。

  Flutter supports IntelliJ IDEA Community, Educational, and Ultimate editions.

  Flutter 支持 IntelliJ IDEA Community、Educational 和 Ultimate editions。

* **Option 3** explains how to code with an editor of your choice and use
  the terminal to compile and debug your code.

  **选项 3** 讲解如何使用自己选择的编辑器编写代码，
  以及如何使用终端编译和调试代码。

## Choose your IDE

## 选择你的 IDE

Select your preferred IDE for Flutter apps.

为 Flutter 应用选择你喜欢的 IDE。

{% tabs %}
{% tab "Visual Studio Code" %}

{% include docs/install/test-drive/vscode.md %}

{% endtab %}
{% tab "Android Studio 或 IntelliJ" %}

{% include docs/install/test-drive/androidstudio.md %}

{% endtab %}
{% tab "终端 & 文本编辑器" %}

{% include docs/install/test-drive/terminal.md %}

{% endtab %}
{% endtabs %}
