---
# title: State management in Flutter
title: Flutter 中的状态管理
# description: Instructions on how to manage state with ChangeNotifiers.
description: 如何使用 ChangeNotifier 管理状态的说明。
layout: tutorial
ai-translated: true
---

Learn to create a ViewModel with ChangeNotifier and manage loading, success, and error states.

学习使用 ChangeNotifier 创建 ViewModel，并管理加载、成功与错误状态。

<SummaryCard>
title: 你将完成的内容
items:
  - title: 使用 ChangeNotifier 创建 ViewModel
    icon: layers
  - title: 管理加载、成功与错误状态
    icon: toggle_on
  - title: 使用 notifyListeners 通知 UI 更新
    icon: notifications_active
</SummaryCard>

---

### 介绍
<!-- Introduction -->

When developers talk about state-management in Flutter,
they're essentially referring to the pattern by which your app
updates the data it needs to render correctly and then
tells Flutter to re-render the UI with that new data.

当开发者在 Flutter 中谈论状态管理时，
他们本质上指的是应用更新正确渲染所需数据，
然后通知 Flutter 用新数据重新渲染 UI 的模式。

In MVVM, this responsibility falls to the ViewModel layer,
which sits between and connects your UI to your Model layer.
In Flutter, ViewModels use Flutter's `ChangeNotifier` class to
notify the UI when data changes.

在 MVVM 中，这一职责落在 ViewModel 层，
它位于 UI 与 Model 层之间并连接两者。
在 Flutter 中，ViewModel 使用 Flutter 的 `ChangeNotifier` 类在数据变化时通知 UI。

To use [`ChangeNotifier`][], extend it in your state management class to
gain access to the `notifyListeners()` method,
which triggers UI rebuilds when called.

要使用 [`ChangeNotifier`][]，在你的状态管理类中继承它以
获得 `notifyListeners()` 方法的访问权限，
调用该方法时会触发 UI 重建。

[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html

### 创建基本 view model 结构
<!-- Create the basic view model structure -->

Create the `ArticleViewModel` class with its
basic structure and state properties:

创建 `ArticleViewModel` 类及其基本结构与状态属性：

<?code-excerpt "fwe/wikipedia_reader/lib/step3a_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model);
}
```

The `ArticleViewModel` holds three pieces of state:

`ArticleViewModel` 保存三份状态：

- `summary`: The current Wikipedia article data.

  `summary`：当前的 Wikipedia 文章数据。

- `error`: Any error that occurred during data fetching.

  `error`：数据获取过程中发生的任何错误。

- `isLoading`: A flag to show progress indicators.

  `isLoading`：用于显示进度指示器的标志。

### 添加构造函数初始化
<!-- Add constructor initialization -->

Update the constructor to automatically fetch content when the
`ArticleViewModel` is created:

更新构造函数，以便在创建 `ArticleViewModel` 时自动获取内容：

<?code-excerpt "fwe/wikipedia_reader/lib/step3b_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model) {
    fetchArticle();
  }

  // Methods will be added next.
  Future<void> fetchArticle() async {}
}
```

This constructor initialization provides immediate content when
a `ArticleViewModel` object is created.
Because constructors can't be asynchronous,
it delegates initial content fetching to a separate method.

此构造函数初始化在创建
`ArticleViewModel` 对象时即可提供内容。
由于构造函数不能是异步的，
它将初始内容获取委托给单独的方法。

### 设置 `fetchArticle` 方法
<!-- Set up the `fetchArticle` method -->

Add the `fetchArticle` method that fetches data and manages state updates:

添加用于获取数据并管理状态更新的 `fetchArticle` 方法：

<?code-excerpt "fwe/wikipedia_reader/lib/step3c_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model) {
    fetchArticle();
  }

  Future<void> fetchArticle() async {
    isLoading = true;
    notifyListeners();

    // TODO: Add data fetching logic

    isLoading = false;
    notifyListeners();
  }
}
```

The ViewModel updates the `isLoading` property and
calls `notifyListeners()` to inform the UI of the update.
When the operation completes, it toggles the property back.
When you build the UI, you'll use this `isLoading` property to
show a loading indicator while fetching a new article.

ViewModel 会更新 `isLoading` 属性并
调用 `notifyListeners()` 通知 UI 已更新。
操作完成后，它会将该属性切换回来。
构建 UI 时，你将使用此 `isLoading` 属性在
获取新文章时显示加载指示器。

### 从 `ArticleModel` 获取文章
<!-- Retrieve an article from the `ArticleModel` -->

Complete the `fetchArticle` method to fetch an article summary.
Use a [try-catch block][] to gracefully handle network errors and
store error messages that the UI can display to users.
The method clears previous errors on success and
clears the previous article summary on error to maintain a consistent state.

完善 `fetchArticle` 方法以获取文章摘要。
使用 [try-catch block][] 优雅地处理网络错误并
保存 UI 可向用户显示的错误消息。
该方法在成功时清除先前的错误，
在出错时清除先前的文章摘要以保持一致的状态。

<?code-excerpt "fwe/wikipedia_reader/lib/step3d_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model) {
    fetchArticle();
  }

  Future<void> fetchArticle() async {
    isLoading = true;
    notifyListeners();
    try {
      summary = await model.getRandomArticleSummary();
      error = null; // Clear any previous errors.
    } on HttpException catch (e) {
      error = e;
      summary = null;
    }
    isLoading = false;
    notifyListeners();
  }
}
```

[try-catch block]: {{site.dart-site}}/language/error-handling#catch

### 测试 ViewModel
<!-- Test the ViewModel -->

Before building the full UI, test that your HTTP requests work by
printing results to the console.
First, update the `fetchArticle` method to
print the results:

在构建完整 UI 之前，
通过将结果打印到控制台来测试 HTTP 请求是否有效。
首先，更新 `fetchArticle` 方法以打印结果：

<?code-excerpt "fwe/wikipedia_reader/lib/step3e_main.dart (fetchArticle)"?>
```dart
Future<void> fetchArticle() async {
  isLoading = true;
  notifyListeners();
  try {
    summary = await model.getRandomArticleSummary();
    print('Article loaded: ${summary!.titles.normalized}'); // Temporary
    error = null; // Clear any previous errors.
  } on HttpException catch (e) {
    print('Error loading article: ${e.message}'); // Temporary
    error = e;
    summary = null;
  }
  isLoading = false;
  notifyListeners();
}
```

Then, update the `MainApp` widget to create the `ArticleViewModel`,
which calls the `fetchArticle` method on creation:

然后，更新 `MainApp` widget 以创建 `ArticleViewModel`，
它在创建时会调用 `fetchArticle` 方法：

<?code-excerpt "fwe/wikipedia_reader/lib/step3f_main.dart (MainApp)"?>
```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Instantiate your `ArticleViewModel` to test its HTTP requests.
    final viewModel = ArticleViewModel(ArticleModel());

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Wikipedia Flutter')),
        body: const Center(child: Text('Check console for article data')),
      ),
    );
  }
}
```

Hot reload your app and check your console output.
You should see either an article title or an error message,
which confirms that your Model and ViewModel are wired up correctly.

热重载应用并查看控制台输出。
你应看到文章标题或错误消息，
这确认 Model 与 ViewModel 已正确连接。

### 回顾
<!-- Review -->

<SummaryCard>
title: 你完成的内容
subtitle: 以下是你本课构建与学习内容的摘要。
completed: true
items:
  - title: 使用 ChangeNotifier 创建了 ArticleViewModel
    icon: layers
    details: >-
      ViewModel 位于 UI 与 Model 之间，
      管理状态并连接两层。
      通过继承 `ChangeNotifier`，ViewModel 获得在
      数据变化时通知监听者的能力。
  - title: 管理了加载、成功与错误状态
    icon: toggle_on
    details: >-
      ViewModel 跟踪三份状态：
      `isLoading`、`summary` 和 `error`。
      使用 `try` 和 `catch`，你优雅地处理网络错误并
      为每种可能结果保持一致的状态。
  - title: 使用 notifyListeners 通知 UI 更新
    icon: notifications_active
    details: >-
      调用 `notifyListeners()` 会告诉所有监听的 widget 重建。
      你在将 `loading = true` 之后调用一次，在
      操作完成后再调用一次。
      这就是在 Flutter 中实现响应式 UI 更新的方式。
</SummaryCard>

### 自测
<!-- Test yourself -->

<Quiz title="状态管理测验">
- question: ChangeNotifier 是什么？
  options:
    - text: 向用户显示通知的 widget。
      correct: false
      explanation: ChangeNotifier 不是 widget；它是用于管理状态的类。
    - text: 当数据变化时可通知监听者、从而实现响应式 UI 更新的类。
      correct: true
      explanation: ChangeNotifier 提供 notifyListeners 方法，在状态变化时通知 widget 重建。
    - text: 用于发送推送通知的内置 Dart 类。
      correct: false
      explanation: ChangeNotifier 用于应用内状态管理，而非推送通知。
    - text: Flutter 中的一种动画控制器类型。
      correct: false
      explanation: 动画控制器是独立的；ChangeNotifier 用于状态管理。
- question: "在 ChangeNotifier 中调用 `notifyListeners()` 会做什么？"
  options:
    - text: 将当前状态保存到本地存储。
      correct: false
      explanation: "`notifyListeners()` 通知 UI 更新；持久化需要单独实现。"
    - text: 告诉所有监听的 widget 重建并反映新状态。
      correct: true
      explanation: "调用 `notifyListeners()` 会触发监听此 ChangeNotifier 的所有 widget 重建。"
    - text: 将状态变化记录到控制台以便调试。
      correct: false
      explanation: 它不会记录任何内容；它通知监听者重建。
    - text: 将所有状态属性重置为默认值。
      correct: false
      explanation: "`notifyListeners()` 不会修改状态；它只是表明状态已变化。"
</Quiz>
