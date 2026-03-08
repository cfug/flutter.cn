---
#title: Rebuild UI when state changes
title: 当状态变化时重建 UI
#description: Instructions on how to manage state with ChangeNotifiers.
description: 关于如何使用 ChangeNotifier 管理状态的说明。
layout: tutorial
---

Learn to use ListenableBuilder to automatically rebuild UI and handle all possible states with switch expressions.

学习使用 ListenableBuilder 自动重建 UI，并通过 switch 表达式处理所有可能的状态。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Use ListenableBuilder to rebuild UI automatically
    icon: sync
  - title: Handle all possible states with switch expressions
    icon: alt_route
  - title: Build the complete View layer with proper styling
    icon: article
</SummaryCard>

---

### Introduction

### 简介

The view layer is your UI, and in Flutter,
that refers to your app's widgets.
As it pertains to this tutorial, the important part is
wiring up your UI to respond to data changes from the ViewModel.
[`ListenableBuilder`][] is a widget that can "listen" to a
[`ChangeNotifier`][], and automatically rebuilds when it's
provided `ChangeNotifier` calls `notifyListeners()`.

视图层就是你的 UI，在 Flutter 中，
它指的是应用的 widget。
在本教程中，重要的部分是
将 UI 与 ViewModel 的数据变化连接起来。
[`ListenableBuilder`][] 是一个可以"监听"
[`ChangeNotifier`][] 的 widget，当它所绑定的
`ChangeNotifier` 调用 `notifyListeners()` 时会自动重建。

[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html

### Create the article view widget

### 创建文章视图 widget

Create the `ArticleView` widget that
manages the overall page layout and state handling.
Start with the basic class structure and widgets:

创建 `ArticleView` widget，
用于管理整体页面布局和状态处理。
首先从基本的类结构和 widget 开始：

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
      ),
      body: const Center(
        child: Text('UI will update here'),
      ),
    );
  }
}
```

### Create the article view model

### 创建文章视图模型

Create the `ArticleViewModel` in this widget:

在这个 widget 中创建 `ArticleViewModel`：

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  final viewModel = ArticleViewModel(ArticleModel());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
      ),
      body: const Center(
        child: Text('UI will update here'),
      ),
    );
  }
}
```

### Listen for state changes

### 监听状态变化

Wrap your UI in a [`ListenableBuilder`][] to listen for state changes,
and pass it a `ChangeNotifier` object.
In this case, the `ArticleViewModel` extends `ChangeNotifier`.

将你的 UI 包裹在 [`ListenableBuilder`][] 中来监听状态变化，
并传入一个 `ChangeNotifier` 对象。
在本例中，`ArticleViewModel` 继承自 `ChangeNotifier`。

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
      ),
      body: ListenableBuilder(
        listenable: viewModel,
        builder: (context, child) {
          return const Center(child: Text('UI will update here'));
        },
      ),
    );
  }
}
```

`ListenableBuilder` uses the *builder* pattern,
which requires a callback rather than a `child` widget to
build the widget tree below it.
These widgets are flexible because you can
perform operations within the callback,
building different widgets based on the state.

`ListenableBuilder` 使用了 *builder* 模式，
它需要一个回调函数而非 `child` widget 来
构建其下方的 widget 树。
这类 widget 非常灵活，因为你可以
在回调中执行操作，
根据不同的状态构建不同的 widget。

[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html

### Handle possible view model states

### 处理视图模型的可能状态

Recall the `ArticleViewModel`, which has three properties that
the UI is interested in:

回顾一下 `ArticleViewModel`，它有三个 UI 关心的属性：

- `Summary? summary`
- `bool loading`
- `String? errorMessage`

Depending on the combined state of these properties,
the UI can display different widgets.
Use Dart's support for [switch expressions][]
to handle all possible combinations in a clean, readable way:

根据这些属性的组合状态，
UI 可以展示不同的 widget。
使用 Dart 的 [switch 表达式][switch expressions]
以简洁、可读的方式处理所有可能的组合：

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
        actions: [],
      ),
      body: ListenableBuilder(
        listenable: viewModel,
        builder: (context, child) {
          return switch ((
            viewModel.loading,
            viewModel.summary,
            viewModel.errorMessage,
          )) {
            (true, _, _) => CircularProgressIndicator(),
            (false, _, String message) => Center(child: Text(message)),
            (false, null, null) => Center(
              child: Text('An unknown error has occurred'),
            ),
            // The summary must be non-null in this switch case.
            (false, Summary summary, null) => ArticlePage(
              summary: summary,
              nextArticleCallback: viewModel.getRandomArticleSummary,
            ),
          };
        },
      ),
    );
  }
}
```

This is an excellent example of how a
declarative, reactive framework like Flutter and
a pattern like MVVM work together:
The UI is rendered based on the state and updates when
a state changes demands it, but it
doesn't manage any state or the process of updating itself.
The business logic and rendering are completely separate from each other.

这是一个绝佳的例子，展示了
Flutter 这样的声明式响应框架与
MVVM 模式如何协同工作：
UI 基于状态进行渲染，并在状态变化需要时自动更新，
但它本身不管理任何状态，也不负责更新自身的过程。
业务逻辑和渲染彼此完全分离。

[switch expressions]: {{site.dart-site}}/language/branches#switch-expressions

### Complete the UI

### 完成 UI

The only thing remaining is to use the properties and methods provided
by the view model to build the UI.

剩下要做的就是使用视图模型提供的属性和方法来构建 UI。

Now create a `ArticlePage` widget that displays the actual article content.
This reusable widget takes summary data and a callback function:

现在创建一个 `ArticlePage` widget 来展示实际的文章内容。
这个可复用的 widget 接收摘要数据和一个回调函数：

```dart
class ArticlePage extends StatelessWidget {
  const ArticlePage({
    super.key,
    required this.summary,
    required this.nextArticleCallback,
  });

  final Summary summary;
  final VoidCallback nextArticleCallback;

  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Article content will be displayed here'));
  }
}
```

### Add a scrollable layout

### 添加可滚动布局

Replace the placeholder with a scrollable column layout:

将占位内容替换为可滚动的列布局：

```dart
class ArticlePage extends StatelessWidget {
  const ArticlePage({
    super.key,
    required this.summary,
    required this.nextArticleCallback,
  });

  final Summary summary;
  final VoidCallback nextArticleCallback;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Text('Article content will be displayed here'),
        ],
      ),
    );
  }
}
```

### Add article content and button

### 添加文章内容和按钮

Complete the layout with an article widget and navigation button:

使用文章 widget 和导航按钮完成布局：

```dart
class ArticlePage extends StatelessWidget {
  const ArticlePage({
    super.key,
    required this.summary,
    required this.nextArticleCallback,
  });

  final Summary summary;
  final VoidCallback nextArticleCallback;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          ArticleWidget(
            summary: summary,
          ),
          ElevatedButton(
            onPressed: nextArticleCallback,
            child: Text('Next random article'),
          ),
        ],
      ),
    );
  }
}
```

### Create the `ArticleWidget`

### 创建 `ArticleWidget`

The `ArticleWidget` handles the display of the actual article content
with proper styling and conditional rendering.

`ArticleWidget` 负责以合适的样式和条件渲染来展示实际的文章内容。

#### Set up the basic article structure

#### 搭建基本的文章结构

Start with the widget that accepts a `summary` parameter:

从接收 `summary` 参数的 widget 开始：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Text('Article content will be displayed here');
  }
}
```

#### Add padding and column layout

#### 添加内边距和列布局

Wrap the content in proper padding and layout:

用合适的内边距和布局包裹内容：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 10.0,
        children: [
          Text('Article content will be displayed here'),
        ],
      ),
    );
  }
}
```

#### Add conditional image display

#### 添加条件图片展示

Add the article image that only shows when available:

添加仅在可用时才显示的文章图片：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 10.0,
        children: [
          if (summary.hasImage)
            Image.network(
              summary.originalImage!.source,
            ),
          Text('Article content will be displayed here'),
        ],
      ),
    );
  }
}
```

#### Complete with styled text content

#### 完成带样式的文本内容

Replace the placeholder text with a
properly styled title, description, and extract:

将占位文本替换为
带有合适样式的标题、描述和摘要：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 10.0,
        children: [
          if (summary.hasImage)
            Image.network(
              summary.originalImage!.source,
            ),
          Text(
            summary.titles.normalized,
            overflow: TextOverflow.ellipsis,
            style: TextTheme.of(context).displaySmall,
          ),
          if (summary.description != null)
            Text(
              summary.description!,
              overflow: TextOverflow.ellipsis,
              style: TextTheme.of(context).bodySmall,
            ),
          Text(
            summary.extract,
          ),
        ],
      ),
    );
  }
}
```

This widget demonstrates a few important UI concepts:

这个 widget 展示了几个重要的 UI 概念：

- **Conditional rendering**:
  The `if` statements show content only when available.

  **条件渲染**：
  `if` 语句仅在内容可用时才显示。

- **Text styling**:
  Different text styles create visual hierarchy using Flutter's theme system.

  **文本样式**：
  不同的文本样式利用 Flutter 的主题系统创建视觉层次。

- **Proper spacing**:
  The `spacing` parameter provides consistent vertical spacing.

  **合理间距**：
  `spacing` 参数提供一致的垂直间距。

- **Overflow handling**:
  `TextOverflow.ellipsis` prevents text from breaking the layout.

  **溢出处理**：
  `TextOverflow.ellipsis` 防止文本破坏布局。

### Update your app to include the article view

### 更新应用以包含文章视图

Connect everything together by updating your `MainApp` to
include your completed `ArticleView`.

通过更新 `MainApp` 来将所有内容连接在一起，
引入你已完成的 `ArticleView`。

Replace your existing `MainApp` with this updated version:

将现有的 `MainApp` 替换为以下更新版本：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ArticleView(),
    );
  }
}
```

This change switches from the console-based test to the full UI
experience with proper state management.

这个改动将应用从基于控制台的测试切换到具有完整状态管理的 UI 体验。

### Run the complete app

### 运行完整应用

Hot reload your app one final time. You should now see:

最后一次热重载你的应用。你现在应该能看到：

1.  A loading spinner while the initial article loads.
    初始文章加载时显示一个加载旋转指示器。
1.  The article's title, description, and summary extract.
    文章的标题、描述和摘要。
1.  An image (if the article has one).
    一张图片（如果文章有的话）。
1.  A button to load another random article.
    一个加载另一篇随机文章的按钮。

To see the reactive UI in action,
click the **Next random article** button.
The app shows a loading state, fetches new data, and
updates the display automatically.

要查看响应式 UI 的实际效果，
请点击 **Next random article** 按钮。
应用会显示加载状态，获取新数据，
并自动更新显示内容。

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Used ListenableBuilder to rebuild UI automatically
    icon: sync
    details: >-
      `ListenableBuilder` listens to your ViewModel and automatically rebuilds
      its children whenever `notifyListeners()` is called.
      In the MVVM pattern,
      this is the key connection between your ViewModel and View.
  - title: Handled all possible states with switch expressions
    icon: alt_route
    details: >-
      Using a switch expression, you accounted for
      the possible state combinations with an appropriate user interface,
      Conditionally displaying a loading spinner, an error message,
      or the actual article content.
      With this handling, the UI is now more robust and complete.
  - title: Built the complete View layer with proper styling
    icon: article
    details: >-
      You created `ArticleView`, `ArticlePage`, and
      `ArticleWidget` with conditional rendering, text styling,
      proper spacing, and overflow handling.
      These are core UI patterns you'll use in every Flutter app.
  - title: Completed the MVVM architecture
    icon: celebration
    details: >-
      You've built a complete app with Model (data operations),
      ViewModel (state management), and View (reactive UI) layers.
      This separation of concerns helps your code be
      more testable, maintainable, and scalable.
</SummaryCard>

### Test yourself

### 自我测试

<Quiz title="ListenableBuilder Quiz">
- question: What is the purpose of ListenableBuilder in Flutter?
  options:
    - text: To create animations based on a ChangeNotifier.
      correct: false
      explanation: ListenableBuilder rebuilds UI on state changes, not specifically for animations.
    - text: "To listen to a ChangeNotifier and automatically rebuild its child widgets when `notifyListeners()` is called."
      correct: true
      explanation: ListenableBuilder listens to a Listenable and rebuilds its builder function when notified.
    - text: To manually control when widgets should be rebuilt.
      correct: false
      explanation: The rebuild is automatic when notifyListeners() is called; you don't control it manually.
    - text: To cache widget builds for better performance.
      correct: false
      explanation: ListenableBuilder is about reactive updates, not caching.
- question: When does ListenableBuilder rebuild its child widgets?
  options:
    - text: Every time the app's frame refreshes.
      correct: false
      explanation: ListenableBuilder only rebuilds when notified, not on every frame.
    - text: When the Listenable it's listening to calls notifyListeners().
      correct: true
      explanation: "ListenableBuilder subscribes to the Listenable and rebuilds its builder function whenever `notifyListeners()` is called."
    - text: Only when the widget is first mounted.
      correct: false
      explanation: "It rebuilds whenever `notifyListeners()` is called, not just on mount."
    - text: When the parent widget rebuilds.
      correct: false
      explanation: "ListenableBuilder rebuilds based on the Listenable, not parent rebuilds."
</Quiz>
