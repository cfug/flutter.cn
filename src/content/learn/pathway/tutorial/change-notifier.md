---
# title: State management in Flutter
title: Flutter 中的状态管理
# description: Instructions on how to manage state with ChangeNotifiers.
description: 如何使用 ChangeNotifier 管理状态。
layout: tutorial
---

Learn to create a ViewModel with ChangeNotifier and manage loading, success, and error states.

学习如何使用 ChangeNotifier 创建 ViewModel，并管理加载、成功和错误状态。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Create a ViewModel with ChangeNotifier
    icon: layers
  - title: Manage loading, success, and error states
    icon: toggle_on
  - title: Signal UI updates with notifyListeners
    icon: notifications_active
</SummaryCard>

---

### Introduction

### 简介

When developers talk about state-management in Flutter,
they're essentially referring to the pattern by which your app
updates the data it needs to render correctly and then
tells Flutter to re-render the UI with that new data.

当开发者谈论 Flutter 中的状态管理时，
本质上是指应用更新渲染所需数据，
然后通知 Flutter 使用新数据重新渲染 UI 的模式。

In MVVM, this responsibility falls to the ViewModel layer,
which sits between and connects your UI to your Model layer.
In Flutter, ViewModels use Flutter's `ChangeNotifier` class to
notify the UI when data changes.

在 MVVM 架构中，这一职责由 ViewModel 层承担，
它位于 UI 和 Model 层之间，负责连接两者。
在 Flutter 中，ViewModel 使用 Flutter 的 `ChangeNotifier` 类
在数据变化时通知 UI。

To use [`ChangeNotifier`][], extend it in your state management class to
gain access to the `notifyListeners()` method,
which triggers UI rebuilds when called.

要使用 [`ChangeNotifier`][]，请在你的状态管理类中继承它，
以获得 `notifyListeners()` 方法的访问权限，
调用该方法即可触发 UI 重建。

[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html

### Create the basic view model structure

### 创建基本的 ViewModel 结构

Create the `ArticleViewModel` class with its
basic structure and state properties:

创建 `ArticleViewModel` 类，
包含其基本结构和状态属性：

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model);
}
```

The `ArticleViewModel` holds three pieces of state:

`ArticleViewModel` 持有三个状态：

- `summary`: The current Wikipedia article data.
  `summary`：当前的 Wikipedia 文章数据。
- `errorMessage`: Any error that occurred during data fetching.
  `errorMessage`：数据获取过程中发生的错误信息。
- `loading`: A flag to show progress indicators.
  `loading`：用于显示加载指示器的标志位。

### Add constructor initialization

### 添加构造函数初始化

Update the constructor to automatically fetch content when the
`ArticleViewModel` is created:

更新构造函数，使 `ArticleViewModel` 创建时自动获取内容：

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model) {
    getRandomArticleSummary();
  }

  // Methods will be added next.
}
```

This constructor initialization provides immediate content when
a `ArticleViewModel` object is created.
Because constructors can't be asynchronous,
it delegates initial content fetching to a separate method.

这种构造函数初始化方式可以在 `ArticleViewModel` 对象创建时立即获取内容。
由于构造函数不能是异步的，
因此将初始内容获取委托给一个单独的方法。

### Set up the `getRandomArticleSummary` method

### 设置 `getRandomArticleSummary` 方法

Add the `getRandomArticleSummary` that fetches data and manages state updates:

添加用于获取数据和管理状态更新的 `getRandomArticleSummary` 方法：

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model) {
    getRandomArticleSummary();
  }

  Future<void> getRandomArticleSummary() async {
    loading = true;
    notifyListeners();

    // TODO: Add data fetching logic

    loading = false;
    notifyListeners();
  }
}
```

The ViewModel updates the `loading` property and
calls `notifyListeners()` to inform the UI of the update.
When the operation completes, it toggles the property back.
When you build the UI, you'll use this `loading` property to
show a loading indicator while fetching a new article.

ViewModel 更新 `loading` 属性并调用 `notifyListeners()` 通知 UI 更新。
当操作完成时，它会将该属性切换回原值。
当你构建 UI 时，可以使用 `loading` 属性在获取新文章时显示加载指示器。

### Retrieve an article from the `ArticleModel`

### 从 `ArticleModel` 获取文章

Complete the `getRandomArticleSummary` method to fetch an article summary.
Use a [try-catch block][] to gracefully handle network errors and
store error messages that the UI can display to users.
The method clears previous errors on success and
clears the previous article summary on error to maintain a consistent state.

完成 `getRandomArticleSummary` 方法以获取文章摘要。
使用 [try-catch block][] 优雅地处理网络错误，
并存储 UI 可以展示给用户的错误信息。
该方法在成功时清除之前的错误，
在出错时清除之前的文章摘要，以维持一致的状态。

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model) {
    getRandomArticleSummary();
  }

  Future<void> getRandomArticleSummary() async {
    loading = true;
    notifyListeners();
    try {
      summary = await model.getRandomArticleSummary();
      errorMessage = null; // Clear any previous errors.
    } on HttpException catch (error) {
      errorMessage = error.message;
      summary = null;
    }
    loading = false;
    notifyListeners();
  }
}
```

[try-catch block]: {{site.dart-site}}/language/error-handling#catch

### Test the ViewModel

### 测试 ViewModel

Before building the full UI, test that your HTTP requests work by
printing results to the console.
First, update the `getRandomArticleSummary` method to
print the results:

在构建完整 UI 之前，先通过将结果打印到控制台来测试 HTTP 请求是否正常工作。
首先，更新 `getRandomArticleSummary` 方法以打印结果：

```dart
Future<void> getRandomArticleSummary() async {
  loading = true;
  notifyListeners();
  try {
    summary = await model.getRandomArticleSummary();
    print('Article loaded: ${summary!.titles.normalized}'); // Temporary
    errorMessage = null; // Clear any previous errors.
  } on HttpException catch (error) {
    print('Error loading article: ${error.message}'); // Temporary
    errorMessage = error.message;
    summary = null;
  }
  loading = false;
  notifyListeners();
}
```

Then, update the `MainApp` widget to create the `ArticleViewModel`,
which calls the `getRandomArticleSummary` method on creation:

然后，更新 `MainApp` widget 以创建 `ArticleViewModel`，
它会在创建时调用 `getRandomArticleSummary` 方法：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Instantiate your `ArticleViewModel` to test its HTTP requests.
    final viewModel = ArticleViewModel(ArticleModel());

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Wikipedia Flutter'),
        ),
        body: const Center(
          child: Text('Check console for article data'),
        ),
      ),
    );
  }
}
```

Hot reload your app and check your console output.
You should see either an article title or an error message,
which confirms that your Model and ViewModel are wired up correctly.

热重载你的应用并检查控制台输出。
你应该能看到文章标题或错误信息，
这说明你的 Model 和 ViewModel 已正确连接。

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Created the ArticleViewModel with ChangeNotifier
    icon: layers
    details: >-
      The ViewModel sits between your UI and Model,
      managing state and connecting the two layers.
      By extending `ChangeNotifier`, your ViewModel gains the ability to
      notify listeners when data changes.
  - title: Managed loading, success, and error states
    icon: toggle_on
    details: >-
      Your ViewModel tracks three pieces of state:
      `loading`, `summary`, and `errorMessage`.
      Using `try` and `catch`, you handle network errors gracefully and
      maintain consistent state for each possible outcome.
  - title: Used notifyListeners to signal UI updates
    icon: notifications_active
    details: >-
      Calling `notifyListeners()` tells any listening widgets to rebuild.
      You call it after setting `loading = true` and again
      after the operation completes.
      This is how you can implement reactive UI updates in Flutter.
</SummaryCard>

### Test yourself

### 自测

<Quiz title="State Management Quiz">
- question: What is a ChangeNotifier?
  options:
    - text: A widget that displays notifications to the user.
      correct: false
      explanation: ChangeNotifier is not a widget; it's a class for managing state.
    - text: A class that can notify listeners when its data changes, enabling reactive UI updates.
      correct: true
      explanation: ChangeNotifier provides the notifyListeners method to signal widgets to rebuild when state changes.
    - text: A built-in Dart class for sending push notifications.
      correct: false
      explanation: ChangeNotifier is for in-app state management, not push notifications.
    - text: A type of animation controller in Flutter.
      correct: false
      explanation: Animation controllers are separate; ChangeNotifier is for state management.
- question: "What does calling `notifyListeners()` do in a ChangeNotifier?"
  options:
    - text: Saves the current state to local storage.
      correct: false
      explanation: "`notifyListeners()` signals UI updates; persistence requires separate implementation."
    - text: Tells any listening widgets to rebuild and reflect the new state.
      correct: true
      explanation: "Calling `notifyListeners()` triggers a rebuild of all widgets listening to this ChangeNotifier."
    - text: Logs the state change to the console for debugging.
      correct: false
      explanation: It doesn't log anything; it signals listeners to rebuild.
    - text: Resets all state properties to their default values.
      correct: false
      explanation: "`notifyListeners()` doesn't modify state; it just signals that state has changed."
</Quiz>
