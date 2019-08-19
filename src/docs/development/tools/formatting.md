---
title: Code formatting
title: 代码格式化
description: Flutter's code formatter formats your code along recommended style guidelines.
description: Flutter 的代码格式化工具以及推荐的代码格式。
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

如果没有统一的代码样式，当进行代码审查的时候，可能会为了一些样式的问题而进行争论，从而浪费时间。代码审查最好把时间花在代码的行为上，而不是代码的样式上。

## Automatically formatting code in Android Studio and IntelliJ

## 在 Android Studio / IntelliJ 中自动格式化代码

Install the `Dart` plugin (see [Editor setup](/docs/get-started/editor))
to get automatic formatting of code in Android Studio and IntelliJ.

在 Android Studio / IntelliJ 中安装 `Dart` 插件（见章节 [编辑工具设定](/docs/get-started/editor)）来进行代码的自动格式化。

To automatically format the code in the current source code window,
right-click in the code window and select `Reformat Code with dartfmt`.
You can add a keyboard shortcut to this in Keymap section of IntelliJ
Preferences.

格式化当前窗口中代码的方法是先在代码窗口中单击右键，然后选择 `Reformat Code with dartfmt` 选项即可。也可以在 IntelliJ 的偏好设置里的 Keymap 部分中增加快捷键，然后使用快捷键操作。

## Automatically formatting code in VS Code

## 在 VS Code 中自动格式化代码

Install the `Flutter` extension (see [Editor setup](/docs/get-started/editor))
to get automatic formatting of code in VS Code.

在 VS Code 中安装 `Flutter` 扩展（见章节 [编辑工具设定](/docs/get-started/editor)）来进行代码的自动格式化。

To automatically format the code in the current source code window,
right-click in the code window and select `Format Document`.
You can add a keyboard shortcut to this VS Code Preferences.

格式化当前窗口中代码的方法是先在代码窗口中单击右键，然后选择 `Format Document` 选项即可。也可以在 VS Code 的偏好设置里面增加快捷键，然后使用快捷键操作。

To automatically format code whenever you save a file, set the
`editor.formatOnSave` setting to `true`.

将 `editor.formatOnSave` 设置成 `true`，可以在保存文件的时候自动进行代码格式化。

## Automatically formatting code with the 'flutter' command

## 使用 'flutter' 命令自动格式化代码

You can also automatically format code in the command line interface
(CLI) using the `flutter format` command:

我们也可以在命令行界面（CLI）中使用 `flutter format` 命令，进行代码的自动格式化。

```terminal
$ flutter format path1 path2 ...
```

## Using trailing commas

## 末尾处添加逗号

Flutter code often involves building fairly deep tree-shaped data structures,
for example in a `build` method. To get good automatic formatting,
we recommend you adopt the optional *trailing commas*.
The guideline for adding a trailing comma is simple: Always
add a trailing comma at the end of a parameter list in
functions, methods, and constructors where you care about
keeping the formatting you crafted.
This helps the automatic formatter to insert an appropriate
amount of line breaks for Flutter-style code.

Flutter 代码经常会构建一定深度的树形数据结构，如在 `build` 方法中。为了有更好的自动格式化效果，我们推荐在末尾处添加逗号，尽管也可以不这样做。规则也比较简单：总是在函数、普通方法、构造方法参数列表的末尾处添加逗号。这样做会使格式化工具自动插入一些换行符，使代码更具有 Flutter 风格。

Here is an example of automatically formatted code *with* trailing commas:

自动格式化的时候，末尾处 *加入* 逗号的例子：

![Automatically formatted code with trailing commas]({% asset tools/android-studio/trailing-comma-with.png @path %})

![末尾处有逗号进行代码自动格式化的情况(Automatically formatted code with trailing commas)]({% asset tools/android-studio/trailing-comma-with.png @path %})

And the same code automatically formatted code *without* trailing commas:

同样的代码在进行自动格式化的时候，末尾处没有逗号的例子：

![Automatically formatted code without trailing commas]({% asset tools/android-studio/trailing-comma-without.png @path %})

![末尾处没有逗号进行代码自动格式化的情况(Automatically formatted code without trailing commas)]({% asset tools/android-studio/trailing-comma-without.png @path %})
