---
title: Flutter Fix
description: Keep your code up to date with the help of the Flutter Fix feature.
description: 使用 Flutter Fix 帮助您的应用跟进最新的 API 用法。
---

The _Flutter Fix_ feature, introduced in Flutter 2,
combines a Dart command-line tool with
changes suggested by the Dart analyzer
to automatically clean up deprecated APIs
in your codebase.

Flutter 2 版本中引入的 **Flutter Fix** 功能将 Dart 命令行工具
与 Dart analyzer 建议的更改相结合，用于自动清理代码库中已弃用的 API。

This feature has also been added to IDE
plugins for Flutter (2.0) and Dart (2.12).
Depending on the IDE, these automated
updates are called _quick-fixes_ (IntelliJ,
Android Studio, Eclipse) or _code actions_ (VS Code).

此功能已被添加到 Flutter (2.0) 和 Dart (2.12) 的 IDE 插件中。
这种自动更新的功能在 IntelliJ、Android Studio 和 Eclipse 中被称为 **quick-fixes**，
在 VS Code 中被称为 **code actions**。

## Applying individual fixes

## 应用单个修复

You can use any supported IDE
to apply a single fix at a time.

你可以使用支持此功能的 IDE 逐个应用修复。

### IntelliJ and Android Studio

### IntelliJ 和 Android Studio

When the analyzer detects a deprecated API,
a light bulb appears on that line of code.
Clicking the light bulb displays the suggested fix
that updates that code to the new API.
Clicking the suggested fix performs the update.

当 analyzer 检测到已弃用的 API 时，该行代码上会出现一个灯泡状的图标。
点击灯泡图标会显示将代码更新为新 API 的修复建议。
点击建议的修复会执行 API 更新操作。

![Screenshot showing suggested change in IntelliJ]({{site.url}}/assets/images/docs/development/tools/flutter-fix-suggestion-intellij.png)<br>
A sample quick-fix in IntelliJ

在 IntelliJ 中使用 quick-fix 的一个案例。

### VS Code

When the analyzer detects a deprecated API,
it presents an error.
You can do any of the following:

当 analyzer 检测到已弃用的 API 时，
它会提供一个报错信息。
你可以执行以下任一操作：

* Hover over the error and then click the
  **Quick Fix** link.
  This presents a filtered list showing
  _only_ fixes.

  将鼠标悬停在报错的位置处，然后点击 **Quick Fix** 选项。
  此操作将只显示修复代码的选项。

* Put the caret in the code with the error and click
  the light bulb icon that appears.
  This shows a list of all actions, including
  refactors.

  将光标放在出现错误提示的代码中，然后点击出现的灯泡图标。
  此操作会显示包括重构在内所有可执行操作的列表。

* Put the caret in the code with the error and
  press the shortcut
  (**Command+.** on Mac, **Control+.** elsewhere)
  This shows a list of all actions, including
  refactors.

  将光标放在出现错误提示的代码中，然后按快捷键
  （mac 上是 **Command+.**，其他平台是 **Control+.** ）。
  此操作会显示包括重构在内所有可执行操作的列表。

![Screenshot showing suggested change in VS Code]({{site.url}}/assets/images/docs/development/tools/flutter-fix-suggestion-vscode.png)<br>
A sample code action in VS Code

在 VS Code 中使用 code action 的一个案例。

## Applying project-wide fixes

## 对整个工程应用修复

To see or apply changes to an entire project,
you can use the command-line tool, [`dart fix`][].

你可以使用命令行工具 [`dart fix`][] 来查看或应用整个项目的更改。

This tool has two options:

此工具有两个可用选项：

* To see a full list of available changes, run
  the following command:

  若要查看可用更改的完整列表，请执行以下命令:

  ```terminal
  dart fix --dry-run
  ```

* To apply all changes in bulk, run the
  following command:

  若要批量应用所有更改，请执行以下命令:

  ```terminal
  dart fix --apply
  ```

For more information on Flutter deprecations, see
[Deprecation lifetime in Flutter][], a free article
on Flutter's Medium publication.

更多有关 Flutter 废弃 API 的详细信息，请查看 Medium 上的
[Flutter 废弃 API 的周期][Deprecation lifetime in Flutter] 文章。


[Deprecation lifetime in Flutter]: {{site.flutter-medium}}/deprecation-lifetime-in-flutter-e4d76ee738ad
[`dart fix`]: {{site.dart-site}}/tools/dart-fix
