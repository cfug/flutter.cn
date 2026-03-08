---
# title: Create an app
title: 创建一个应用
# description: Instructions on how to create a new Flutter app.
description: 关于如何创建一个新的 Flutter 应用的说明。
layout: tutorial
---

Learn the first steps to building a Flutter app, from creating a project to understanding widgets and hot reload.

学习构建 Flutter 应用的第一步，从创建项目到理解 widget 和热重载。

<YouTubeEmbed id="sE1M2EayFes" title="First steps with Flutter" fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: What you'll accomplish
items:
  - title: Create a new Flutter project using the CLI
    icon: terminal
  - title: Understand widgets and the widget tree
    icon: account_tree
  - title: Run your app and use hot reload
    icon: bolt
</SummaryCard>

---

### What you'll build

### 你将构建什么

In this first section of the Flutter tutorial,
you'll build the core UI of an app called 'Birdle',
a game similar to [Wordle, the popular New York Times game][].

在 Flutter 教程的第一部分中，
你将构建一个名为 "Birdle" 的应用的核心 UI，
这是一个类似于 [Wordle（纽约时报的热门游戏）][Wordle, the popular New York Times game] 的游戏。

<img src='/assets/images/docs/tutorial/birdle.png' width="320px" class="diagram-wrap" alt="A screenshot that resembles the popular game Wordle.">

By the end of this tutorial, you'll have
learned the fundamentals of building Flutter UIs, and your app will
look like the following screenshot (and it'll even mostly work 😀).

在本教程结束时，你将学会构建 Flutter UI 的基础知识，
你的应用将如下面的截图所示（而且它基本上可以正常运行 😀）。

[Wordle, the popular New York Times game]: https://www.nytimes.com/games/wordle/index.html


### Create a new Flutter project

### 创建一个新的 Flutter 项目

The first step to building Flutter apps is to create a new project.
You create new apps with the [Flutter CLI tool][],
installed as part of the Flutter SDK.

构建 Flutter 应用的第一步是创建一个新项目。
你可以使用 [Flutter CLI 工具][Flutter CLI tool]来创建新应用，
它作为 Flutter SDK 的一部分被安装。

Open your terminal or command prompt and run
the following command to create a new Flutter project:

打开你的终端或命令提示符，运行以下命令来创建一个新的 Flutter 项目：

```console
$ flutter create birdle --empty
```

This creates a new Flutter project using the minimal "empty" template.

这会使用精简的 "empty" 模板创建一个新的 Flutter 项目。

[Flutter CLI tool]: /reference/flutter-cli

### Examine the code

### 查看代码

In your IDE, open the file at `lib/main.dart`.
Starting from the top, you'll see this code.

在你的 IDE 中，打开 `lib/main.dart` 文件。
从文件顶部开始，你会看到以下代码。

```dart title"lib/main.dart"
import 'package:flutter/material.dart'; // Imports Flutter.

void main() {
  runApp(const MainApp());
}
// ...
```

The `main` function is the entry point to any Dart program,
and a Flutter app is just a **Dart** program.
The `runApp` method is part of the Flutter SDK,
and it takes a **widget** as an argument.
In this case, an instance of the `MainApp` widget is being passed in.

`main` 函数是所有 Dart 程序的入口，
而 Flutter 应用本质上就是一个 **Dart** 程序。
`runApp` 方法是 Flutter SDK 的一部分，
它接收一个 **widget** 作为参数。
在这里，传入的是 `MainApp` widget 的一个实例。

Just below the `main` function, you'll find the `MainApp` class declaration.

在 `main` 函数下方，你会看到 `MainApp` 类的声明。

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello World!'),
        ),
      ),
    );
  }
}

```

`MainApp` is the **root widget**,
as it's the widget that's passed into `runApp`.
Within this widget, there's a `build` method that
returns another widget called `MaterialApp`.
Essentially, this is what a Flutter app is:
a composition of widgets that make
up a tree structure called the **widget tree.**

`MainApp` 是**根 widget**，
因为它是传递给 `runApp` 的那个 widget。
在这个 widget 内部，有一个 `build` 方法，
它返回另一个名为 `MaterialApp` 的 widget。
本质上，Flutter 应用就是这样的：
通过组合 widget 构成一个树形结构，
称为 **widget 树**。

Your job as a Flutter developer is to
compose widgets from the SDK into larger, custom widgets that display a UI.

作为 Flutter 开发者，你的工作就是
将 SDK 中的 widget 组合成更大的、自定义的 widget 来展示 UI。

At the moment, the widget tree is quite simple:

目前，这个 widget 树非常简单：

<img src='/assets/images/docs/tutorial/initial_widget_tree.png' width="320px" alt="A screenshot that resembles the popular game Wordle.">

### Run your app

### 运行你的应用

1.  In your terminal,
    navigate to the root directory of your created Flutter app:

    在终端中，导航到你创建的 Flutter 应用的根目录：

    ```console
    $ cd birdle
    ```

1.  Run the app using the Flutter CLI tool.

    使用 Flutter CLI 工具运行应用。

    ```console
    $ flutter run -d chrome
    ```

    The app will build and launch in a new instance of Chrome.

    应用将会被构建并在新的 Chrome 实例中启动。

<img src='/assets/images/docs/tutorial/hello_world.png' width="320px" alt="A screenshot that resembles the popular game Wordle.">

### Use hot reload

### 使用热重载

**Stateful hot reload**, if you haven't heard of it,
allows a running Flutter app to re-render updated business logic or UI code in
less than a second – all without losing your place in the app.

**有状态热重载**，如果你还没听说过的话，
它允许正在运行的 Flutter 应用在不到一秒的时间内重新渲染更新后的业务逻辑或 UI 代码——
而且不会丢失你在应用中的当前状态。

In your IDE, open the `main.dart` file and navigate to line ~15 and find this
code:

在 IDE 中打开 `main.dart` 文件，导航到大约第 15 行，找到以下代码：

```dart
child: Text('Hello World!'),
```

Change the text inside the string to anything you want.
Then, hot-reload your app by
pressing `r` in the terminal where the app is running.
The running app should instantly show your updated text.

将字符串中的文本修改为你想要的任何内容。
然后，在运行应用的终端中按 `r` 键来热重载你的应用。
运行中的应用应该会立即显示你更新后的文本。

### Review

### 回顾

<SummaryCard expands="false">
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Created your first Flutter project
    icon: terminal
    details: >-
      You used `flutter create` with the `--empty` flag to
      scaffold a minimal Flutter project.
      The CLI generates the project structure and
      boilerplate code needed to get started.
  - title: Explored the widget tree
    icon: account_tree
    details: >-
      Flutter UIs are built by composing **widgets** into a tree structure.
      The `runApp` function takes a root widget, and that widget's
      `build` method returns other widgets, forming the **widget tree**.
      Your job as a Flutter developer is to
      compose these widgets into custom UIs.
  - title: Ran your app with hot reload
    icon: bolt
    details: >-
      You ran your app with `flutter run` and
      experienced **stateful hot reload**, which lets you
      see code changes reflected in under a second without losing app state.
      Press `r` in the terminal to trigger a hot reload.
</SummaryCard>

### Test yourself

### 自我测试

<Quiz title="Create an App Quiz">
- question: "What is the purpose of the `runApp` function in a Flutter application?"
  options:
    - text: It compiles the Dart code into native machine code.
      correct: false
      explanation: "Compilation happens before the app runs; `runApp` starts the Flutter framework with a root widget."
    - text: It takes a widget as an argument and makes it the root of the widget tree.
      correct: true
      explanation: "The `runApp` function inflates the given widget and attaches it to the screen, making it the root of the widget tree."
    - text: "It creates the `main.dart` file for the project."
      correct: false
      explanation: "The file is created by `flutter create`; `runApp` is called at runtime."
    - text: It downloads Flutter dependencies from the internet.
      correct: false
      explanation: "Dependencies are managed by `flutter pub get`, not `runApp`."
- question: How do you trigger a hot reload while a Flutter app is running in the terminal?
  options:
    - text: "Press `h` in the terminal."
      correct: false
      explanation: "Pressing `h` shows help options; `r` triggers hot reload."
    - text: "Press `r` in the terminal."
      correct: true
      explanation: "Pressing `r` in the terminal where the app is running triggers a hot reload."
    - text: "Stop and restart the app with `flutter run`."
      correct: false
      explanation: A full restart is not needed; hot reload is faster.
    - text: Save the file and wait for automatic reload.
      correct: false
      explanation: "By default, you need to press `r` to trigger hot reload in the terminal."
</Quiz>
