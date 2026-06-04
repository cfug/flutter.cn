---
# title: Flutter editor support
title: Flutter 编辑器支持
# shortTitle: Editors
shortTitle: 编辑器
# description: >-
#   Editor support for Dart and Flutter.
description: >-
  Dart 与 Flutter 的编辑器支持。
showToc: false
ai-translated: true
---

You can build apps with Flutter using any text editor or
integrated development environment (IDE)
combined with Flutter's command-line tools.

你可以使用任意文本编辑器或集成开发环境（IDE），
配合 Flutter 命令行工具来构建应用。

The Flutter team recommends using an editor that supports
a Flutter extension or plugin, like VS Code and Android Studio.
These plugins provide code completion, syntax highlighting,
widget editing assists, debug support, and much more.

Flutter 团队建议使用支持 Flutter 扩展或插件的编辑器，例如 VS Code 和 Android Studio。
这些插件提供代码补全、语法高亮、widget 编辑辅助、调试支持等功能。

## Local editors

## 本地编辑器

The Flutter team supports plugins for VS Code, Android Studio, and IntelliJ.
The plugins provide extensive development and debugging support as well as
deep integrations with the [Dart analyzer][] and [Dart and Flutter DevTools][].

Flutter 团队为 VS Code、Android Studio 和 IntelliJ 提供插件支持。
这些插件提供广泛的开发与调试支持，
并与 [Dart analyzer][]（Dart 分析器）和 [Dart and Flutter DevTools][]（Dart 与 Flutter DevTools）深度集成。

<div class="card-grid">
  <a class="card outlined-card" href="/tools/vs-code">
    <div class="card-header">
      <span class="card-title">Visual Studio Code</span>
    </div>
    <div class="card-content">
      <p>Develop and debug Flutter apps in a streamlined and customizable code editor.</p>
      <p>在简洁、可定制的代码编辑器中开发和调试 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/tools/android-studio">
    <div class="card-header">
      <span class="card-title">Android Studio and IntelliJ</span>
    </div>
    <div class="card-content">
      <p>Develop and debug Flutter apps in an IDE with rich language support and integrated tooling.</p>
      <p>在具备丰富语言支持与集成工具的 IDE 中开发和调试 Flutter 应用。</p>
    </div>
  </a>
</div>

[Dart analyzer]: {{site.dart-site}}/tools/analysis
[Dart and Flutter DevTools]: /tools/devtools

## Online editors

## 在线编辑器

You can quickly try Flutter online without any local setup
with one of the following editors.

你可以使用以下在线编辑器快速体验 Flutter，无需本地配置。

<div class="card-grid">
  <a class="card outlined-card" href="{{site.dartpad}}" target="_blank">
    <div class="card-header">
      <span class="card-title">
        <span>DartPad</span>
        <Icon id="open_in_new" size="1rem" />
      </span>
    </div>
    <div class="card-content">
      <p>Quickly build and run simple single-file Flutter apps on the web.</p>
      <p>在 Web 上快速构建并运行简单的单文件 Flutter 应用。</p>
    </div>
  </a>
</div>

## Other editors

## 其他编辑器

You can develop Dart and Flutter apps using any other text editor and terminal.

你可以使用任意其他文本编辑器和终端开发 Dart 与 Flutter 应用。

Depending on the editor, you can integrate the Dart SDK's support for the
[Language Server Protocol][lsp] and the [Debug Adapter Protocol][dap] to
enable rich code editing and debugging features for both Dart and Flutter.

根据编辑器不同，你可以集成 Dart SDK 对
[Language Server Protocol][lsp]（语言服务器协议）和 [Debug Adapter Protocol][dap]（调试适配器协议）的支持，
为 Dart 与 Flutter 启用丰富的代码编辑和调试功能。

[lsp]: https://github.com/dart-lang/sdk/tree/main/pkg/analysis_server/tool/lsp_spec/README.md
[dap]: https://github.com/dart-lang/sdk/blob/main/third_party/pkg/dap/tool/README.md
