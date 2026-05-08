---
# title: Code formatting
title: 代码格式化
# description: >-
#     Flutter's code formatter formats your code
#     following recommended style guidelines.
description: Flutter 的代码格式化工具以及推荐的代码格式。
tags: SDK,Flutter SDK
keywords: 代码格式化,dartfmt,代码审查,code review
---


While your code might follow any preferred style&mdash;in our
experience&mdash;teams of developers might find it more productive to:

每个人都有自己喜欢的代码样式。但是根据我们的经验，下面这些做法可以提高团队的开发效率：

* Have a single, shared style, and

  团队使用单一，共享的代码样式。

* Enforce this style through automatic formatting.
  
  通过自动格式化代码来保证统一的代码样式。

The alternative is often tiring formatting debates during code reviews,
where time might be better spent on code behavior rather than code style.

如果没有统一的代码样式，当进行代码审查的时候，
可能会为了一些样式的问题而进行争论从而浪费时间。
代码审查最好把时间花在代码的行为上，而不是代码的样式上。

## Automatically formatting code in VS Code

## 在 VS Code 中自动格式化代码

Install the `Flutter` extension (see [VS Code setup][])
to get automatic formatting of code in VS Code.

在 VS Code 中安装 `Flutter` 扩展
（见章节 [配置 VS Code][VS Code setup]）来进行代码的自动格式化。

To automatically format the code in the current source code window,
right-click in the code window and select `Format Document`.
You can add a keyboard shortcut to this VS Code **Preferences**.

格式化当前窗口中代码的方法是先在代码窗口中单击右键，
然后选择 `Format Document` 选项即可。
也可以在 VS Code 的偏好设置里面增加快捷键，
然后使用快捷键操作。

To automatically format code whenever you save a file, set the
`editor.formatOnSave` setting to `true`.

将 `editor.formatOnSave` 设置成 `true`，
可以在保存文件的时候自动进行代码格式化。

[VS Code setup]: /tools/vs-code#setup

## Automatically formatting code in Android Studio and IntelliJ

## 在 Android Studio 和 IntelliJ 中自动格式化代码

Install the `Dart` plugin (see [Android Studio and IntelliJ setup][])
to get automatic formatting of code in Android Studio and IntelliJ.
To format your code in the current source code window:

在 Android Studio / IntelliJ 中安装 `Dart` 插件
（见章节 [配置 Android Studio 和 IntelliJ][Android Studio and IntelliJ setup]）
来进行代码的自动格式化。
在当前代码窗口中格式化代码的方法是：

* On macOS,
  press <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>L</kbd>.

  在 Mac 系统里使用 <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>L</kbd>。

* On Windows and Linux,
  press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>L</kbd>.

  在 Windows 和 Linux 系统里使用
  <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>L</kbd>。

Android Studio and IntelliJ also provide a checkbox named
**Format code on save** on the Flutter page in **Preferences**
on macOS or **Settings** on Windows and Linux.
This option corrects formatting in the current file when you save it.

Android Studio 和 IntelliJ 为 Flutter 页面提供了一个选项，
即“在保存的时候格式化代码”—— `Format code on save`，
要开启这个，可以在 Windows 和 Linux 下选择设置、在 macOS 下选择偏好设置。
这样在每次保存代码的时候就会自动格式化当前文件。

[Android Studio and IntelliJ setup]: /tools/android-studio#setup

## Automatically formatting code with the `dart` command

## 使用 `dart` 命令自动格式化代码

To correct code formatting in the command line interface (CLI),
run the `dart format` command:

我们也可以在命令行界面（CLI）中使用 `dart format` 命令，
进行代码的自动格式化。

```console
$ dart format path1 path2 [...]
```

To learn more about the Dart formatter,
check out the dart.dev docs on [`dart format`][].

请查阅 dart.cn 文档中的 [`dart format`][]，
来了解更多有关 Dart 格式化的信息。

[`dart format`]: {{site.dart-site}}/tools/dart-format
