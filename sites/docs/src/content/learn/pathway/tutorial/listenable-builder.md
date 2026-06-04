---
# title: Rebuild UI when state changes
title: 状态变化时重建 UI
# description: Instructions on how to manage state with ChangeNotifiers.
description: 如何使用 ChangeNotifier 管理状态的说明。
layout: tutorial
ai-translated: true
---

<?code-excerpt replace="/ *\/\/\s+ignore_for_file:[^\n]+\n//g;"?>

Learn to use ListenableBuilder to automatically rebuild UI and
handle all possible states with switch expressions.

学习使用 ListenableBuilder 在状态变化时自动重建 UI，
并用 switch 表达式处理所有可能的状态。

<SummaryCard>
title: 你将完成的内容
items:
  - title: 使用 ListenableBuilder 自动重建 UI
    icon: sync
  - title: 用 switch 表达式处理所有可能的状态
    icon: alt_route
  - title: 用合适的样式构建完整的 View 层
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

View 层就是你的 UI，在 Flutter 中，
这指的是你应用中的 widget。
就本教程而言，重要的是
将 UI 与 ViewModel 的数据变化关联起来。
[`ListenableBuilder`][] 是一个可以「监听」
[`ChangeNotifier`][] 的 widget，当其
提供的 `ChangeNotifier` 调用 `notifyListeners()` 时会自动重建。

[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html

### Create the article view widget

### 创建文章视图 widget

Create the `ArticleView` widget that
manages your page's layout and ViewModel lifecycle.
Because it must explicitly initialize data fetching before rendering,
implement it as a `StatefulWidget`.

创建 `ArticleView` widget，用于
管理页面的布局与 ViewModel 生命周期。
由于必须在渲染前显式初始化数据获取，
请将其实现为 `StatefulWidget`。

Start by creating the basic stateful structure:

先创建基本的 stateful 结构：

<?code-excerpt "fwe/wikipedia_reader/lib/step4a_main.dart"?>
```dart
import 'package:flutter/material.dart';

class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  // The view model will be instantiated here next.

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: const Center(child: Text('Loading...')),
    );
  }
}
```

### Instantiate the article view model

### 实例化文章 ViewModel

Next, initialize your `ArticleViewModel` mapping it to the state's lifecycle. 
Provide the ViewModel and execute `fetchArticle()` within `initState()`:

接下来，初始化 `ArticleViewModel` 并将其与 state 的生命周期绑定。
在 `initState()` 中提供 ViewModel 并执行 `fetchArticle()`：

<?code-excerpt "fwe/wikipedia_reader/lib/step4b_main.dart (view-model)"?>
```dart highlightLines=2-8
class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  void initState() {
    super.initState();
    viewModel.fetchArticle();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: const Center(child: Text('Loading...')),
    );
  }
}
```

### Update your app to include the article view

### 更新应用以包含文章视图

Connect everything together by updating your `MainApp` to
include your completed `ArticleView`.

通过更新 `MainApp` 以
包含已完成的 `ArticleView`，将所有部分连接起来。

Replace your existing `MainApp` with this updated version:

用以下更新版本替换现有的 `MainApp`：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (main-app)"?>
```dart highlightLines=6
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: ArticleView());
  }
}
```

This change switches from the console-based test to the full UI
experience with proper state management.

这一更改从基于控制台的测试切换到
具备完善状态管理的完整 UI 体验。

### Listen for state changes

### 监听状态变化

Wrap your UI in a [`ListenableBuilder`][] to listen for state changes,
and pass it a `ChangeNotifier` object.
In this case, the `ArticleViewModel` extends `ChangeNotifier`.

用 [`ListenableBuilder`][] 包裹 UI 以监听状态变化，
并向其传入 `ChangeNotifier` 对象。
在本例中，`ArticleViewModel` 继承自 `ChangeNotifier`。

<?code-excerpt "fwe/wikipedia_reader/lib/step4c_main.dart (view-model)"?>
```dart highlightLines=21-26
class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  void initState() {
    super.initState();
    viewModel.fetchArticle();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: ListenableBuilder(
        listenable: viewModel,
        builder: (context, child) {
          return const Center(child: Text('Loading...'));
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

`ListenableBuilder` 使用 *builder* 模式，
它需要回调而不是 `child` widget 来
构建其下方的 widget 树。
这些 widget 很灵活，因为你可以在
回调中执行操作，
根据状态构建不同的 widget。

[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html

### Handle possible view model states

### 处理 ViewModel 的可能状态

Recall the `ArticleViewModel`, which has three properties that
the UI is interested in:

回顾 `ArticleViewModel`，它有三个 UI
关心的属性：

- `Summary? summary`

  文章摘要（`summary`，可选）

- `bool isLoading`

  是否正在加载（`isLoading`）

- `Exception? error`

  错误信息（`error`，可选）

Depending on the combined state of these properties,
the UI can display different widgets.
Use Dart's support for [switch expressions][]
to handle all possible combinations in a clean, readable way:

根据这些属性的组合状态，
UI 可以显示不同的 widget。
利用 Dart 对 [switch 表达式][switch expressions] 的支持，
以清晰、可读的方式处理所有可能的组合：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (view-model)"?>
```dart
class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  void initState() {
    super.initState();
    viewModel.fetchArticle();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: Center(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) {
            return switch ((
              viewModel.isLoading,
              viewModel.summary,
              viewModel.error,
            )) {
              (true, _, _) => const CircularProgressIndicator(),
              (_, _, final Exception e) => Text('Error: $e'),
              (_, final summary?, _) => ArticlePage(
                summary: summary,
                nextArticleCallback: viewModel.fetchArticle,
              ),
              _ => const Text('Something went wrong!'),
            };
          },
        ),
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

这是声明式、响应式框架（如 Flutter）与
MVVM 等模式如何协同工作的绝佳示例：
UI 根据状态渲染，并在
状态变化需要时更新，但
它不管理任何状态，也不管理自我更新的过程。
业务逻辑与渲染完全彼此分离。

[switch expressions]: {{site.dart-site}}/language/branches#switch-expressions

### Complete the UI

### 完成 UI

The only thing remaining is to use the properties and methods provided
by the view model to build the UI.

剩下要做的就是用 ViewModel 提供的
属性和方法来构建 UI。

Now create a `ArticlePage` widget that displays the actual article content.
This reusable widget takes summary data and a callback function:

现在创建 `ArticlePage` widget 以显示实际文章内容。
这个可复用 widget 接收摘要数据和回调函数：

<?code-excerpt "fwe/wikipedia_reader/lib/step4d_main.dart (page)"?>
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
    return const Center(
      child: Text('Article content will be displayed here...'),
    );
  }
}
```

### Add a scrollable layout

### 添加可滚动布局

Replace the placeholder with a scrollable column layout:

用可滚动的 Column 布局替换占位内容：

<?code-excerpt "fwe/wikipedia_reader/lib/step4e_main.dart (page)"?>
```dart highlightLines=13-16
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
    return const SingleChildScrollView(
      child: Column(
        children: [Text('Article content will be displayed here...')],
      ),
    );
  }
}
```

### Add article content and button

### 添加文章内容与按钮

Complete the layout with an article widget and navigation button:

用文章 widget 和导航按钮完成布局：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (page)"?>
```dart highlightLines=16-20
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
          ArticleWidget(summary: summary),
          ElevatedButton(
            onPressed: nextArticleCallback,
            child: const Text('Next random article'),
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

`ArticleWidget` 负责以合适的样式和条件渲染
显示实际文章内容。

#### Set up the basic article structure

#### 搭建基本文章结构

Start with the widget that accepts a `summary` parameter:

从接受 `summary` 参数的 widget 开始：

<?code-excerpt "fwe/wikipedia_reader/lib/step4f_main.dart (article)"?>
```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return const Text('Article content will be displayed here...');
  }
}
```

#### Add padding and column layout

#### 添加内边距与 Column 布局

Wrap the content in proper padding and layout:

用合适的内边距和布局包裹内容：

<?code-excerpt "fwe/wikipedia_reader/lib/step4g_main.dart (article)"?>
```dart highlightLines=8-14
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Column(
        spacing: 10,
        children: [const Text('Article content will be displayed here...')],
      ),
    );
  }
}
```

#### Add conditional image display

#### 添加条件图片显示

Add the article image that only shows when available:

添加仅在可用时显示的文章图片：

<?code-excerpt "fwe/wikipedia_reader/lib/step4h_main.dart (article)"?>
```dart highlightLines=13
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Column(
        spacing: 10,
        children: [
          if (summary.hasImage) Image.network(summary.originalImage!.source),
          const Text('Article content will be displayed here...'),
        ],
      ),
    );
  }
}
```

#### Complete with styled text content

#### 用带样式的文本内容完成

Replace the placeholder text with a
properly styled title, description, and extract:

用带样式的
标题、描述和摘录替换占位文本：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (article)"?>
```dart highlightLines=14-25
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Column(
        spacing: 10,
        children: [
          if (summary.hasImage) Image.network(summary.originalImage!.source),
          Text(
            summary.titles.normalized,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.displaySmall,
          ),
          if (summary.description != null)
            Text(
              summary.description!,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          Text(summary.extract),
        ],
      ),
    );
  }
}
```

This widget demonstrates a few important UI concepts:

该 widget 演示了几个重要的 UI 概念：

- **Conditional rendering**:
  The `if` statements show content only when available.

  **条件渲染**：
  `if` 语句仅在内容可用时显示。

- **Text styling**:
  Different text styles create visual hierarchy using Flutter's theme system.

  **文本样式**：
  不同文本样式借助 Flutter 的主题系统建立视觉层次。

- **Proper spacing**:
  The `spacing` parameter provides consistent vertical spacing.

  **合适间距**：
  `spacing` 参数提供一致的垂直间距。

- **Overflow handling**:
  `TextOverflow.ellipsis` prevents text from breaking the layout.

  **溢出处理**：
  `TextOverflow.ellipsis` 防止文本破坏布局。

### Run the complete app

### 运行完整应用

Hot reload your app one final time. You should now see:

最后一次热重载应用。你现在应能看到：

1.  A loading spinner while the initial article loads.

    初始文章加载时显示的加载指示器。

1.  The article's title, description, and summary extract.

    文章的标题、描述和摘要摘录。

1.  An image (if the article has one).

    图片（若文章有图片）。

1.  A button to load another random article.

    用于加载另一篇随机文章的按钮。

To see the reactive UI in action,
click the **Next random article** button.
The app shows a loading state, fetches new data, and
updates the display automatically.

要查看响应式 UI 的实际效果，
点击 **Next random article**（下一篇随机文章）按钮。
应用会显示加载状态、获取新数据，并
自动更新显示。

### Review

### 回顾

<SummaryCard>
title: 你已完成的内容
subtitle: 以下是你本课构建与学习内容的摘要。
completed: true
items:
  - title: 使用 ListenableBuilder 自动重建 UI
    icon: sync
    details: >-
      `ListenableBuilder` 会监听你的 ViewModel，并在每次调用
      `notifyListeners()` 时自动重建其子 widget。
      在 MVVM 模式中，
      这是 ViewModel 与 View 之间的关键连接。
  - title: 用 switch 表达式处理所有可能的状态
    icon: alt_route
    details: >-
      通过 switch 表达式，你为
      可能的状态组合提供了合适的用户界面，
      有条件地显示加载指示器、错误消息
      或实际文章内容。
      有了这种处理，UI 现在更加健壮和完整。
  - title: 用合适的样式构建完整的 View 层
    icon: article
    details: >-
      你创建了 `ArticleView`、`ArticlePage` 和
      `ArticleWidget`，包含条件渲染、文本样式、
      合适间距和溢出处理。
      这些是你将在每个 Flutter 应用中使用的核心 UI 模式。
  - title: 完成了 MVVM 架构
    icon: celebration
    details: >-
      你已构建包含 Model（数据操作）、
      ViewModel（状态管理）和 View（响应式 UI）层的完整应用。
      这种关注点分离有助于代码
      更易测试、维护和扩展。
</SummaryCard>

### Test yourself

### 自测

<Quiz title="ListenableBuilder 测验">
- question: ListenableBuilder 在 Flutter 中的作用是什么？
  options:
    - text: 基于 ChangeNotifier 创建动画。
      correct: false
      explanation: ListenableBuilder 在状态变化时重建 UI，并非专门用于动画。
    - text: "监听 ChangeNotifier，并在调用 `notifyListeners()` 时自动重建其子 widget。"
      correct: true
      explanation: ListenableBuilder 监听 Listenable，并在收到通知时重建其 builder 函数。
    - text: 手动控制何时应重建 widget。
      correct: false
      explanation: 调用 notifyListeners() 时重建是自动的；你无需手动控制。
    - text: 缓存 widget 构建以提升性能。
      correct: false
      explanation: ListenableBuilder 用于响应式更新，而非缓存。
- question: ListenableBuilder 何时重建其子 widget？
  options:
    - text: 每次应用帧刷新时。
      correct: false
      explanation: ListenableBuilder 仅在收到通知时重建，而非每一帧。
    - text: 当它监听的 Listenable 调用 notifyListeners() 时。
      correct: true
      explanation: "ListenableBuilder 订阅 Listenable，并在每次调用 `notifyListeners()` 时重建其 builder 函数。"
    - text: 仅在 widget 首次挂载时。
      correct: false
      explanation: "它在每次调用 `notifyListeners()` 时都会重建，而不仅限于挂载时。"
    - text: 当父 widget 重建时。
      correct: false
      explanation: "ListenableBuilder 根据 Listenable 重建，而非父 widget 重建。"
</Quiz>
