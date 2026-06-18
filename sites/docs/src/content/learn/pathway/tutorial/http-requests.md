---
# title: Fetch data from the internet
title: 从互联网获取数据
# description: Instructions on how to make HTTP requests and parse responses.
description: 如何发起 HTTP 请求并解析响应的说明。
layout: tutorial
ai-translated: true
---

Learn the MVVM architecture pattern and how to build HTTP requests with async/await.

学习 MVVM 架构模式，以及如何使用 async/await 构建 HTTP 请求。

<SummaryCard>
title: 你将完成的内容
items:
  - title: 理解 MVVM 架构模式
    icon: layers
  - title: 使用 async/await 构建 HTTP 请求
    icon: cloud_download
  - title: 处理错误并解析 JSON 响应
    icon: data_object
</SummaryCard>

---

### 简介
<!-- Introduction -->

The overarching pattern that this tutorial implements is called
_Model-View-ViewModel_ or _MVVM_.
MVVM is an [architectural pattern][] used in client apps that
separates your app into three layers:

本教程实现的总体模式称为
**模型-视图-视图模型** (**Model-View-ViewModel**) 或 **MVVM**。
MVVM 是一种用于客户端应用的[架构模式][architectural pattern]，它将
应用分为三层：

- **Model**: Handles data operations.

  **Model**：处理数据操作。

- **View**: Displays the UI.

  **View**：显示 UI。

- **ViewModel**: Manages state and connects the two.

  **ViewModel**：管理状态并连接前两者。

The core tenet of MVVM (and many other patterns) is *separation of concerns*.
Managing state in separate classes (outside your UI widgets) makes
your code more testable, reusable, and easier to maintain.

MVVM（及许多其他模式）的核心原则是 **关注点分离**。
在单独的类中管理状态（在 UI widget 之外）使
代码更易测试、复用和维护。

A single feature in your app contains each one of the MVVM components.
In this tutorial, in addition to Flutter widgets,
you'll create `ArticleModel`, `ArticleViewModel`, and `ArticleView`.

应用中的单个功能包含 MVVM 的每个组件。
在本教程中，除了 Flutter widget 外，
你还将创建 `ArticleModel`、`ArticleViewModel` 和 `ArticleView`。

[architectural pattern]: /app-architecture/guide

### 定义 Model
<!-- Define the Model -->

The Model is the source-of-truth for your app's data and is responsible for
low-level tasks such as making HTTP requests, caching data, or
managing system resources such as used by a Flutter plugin.
A model doesn't usually need to import Flutter libraries.

Model 是应用数据的唯一真实来源，负责底层任务，
例如发起 HTTP 请求、缓存数据，或管理 Flutter 插件等使用的系统资源。
Model 通常不需要导入 Flutter 库。

Create an empty `ArticleModel` class in your `main.dart` file:

在 `main.dart` 文件中创建一个空的 `ArticleModel` 类：

<?code-excerpt "fwe/wikipedia_reader/lib/step2a_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  // Properties and methods will be added here.
}
```

### 构建 HTTP 请求
<!-- Build the HTTP request -->

Wikipedia provides a REST API that returns JSON data about articles.
For this app, you'll use the endpoint that returns a random article summary.

Wikipedia 提供返回文章 JSON 数据的 REST API。
在本应用中，你将使用返回随机文章摘要的端点。

```text
https://en.wikipedia.org/api/rest_v1/page/random/summary
```

Add a method to fetch a random Wikipedia article summary:

添加一个获取随机 Wikipedia 文章摘要的方法：

<?code-excerpt "fwe/wikipedia_reader/lib/step2b_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    // TODO: Add error handling and JSON parsing.
    throw UnimplementedError();
  }
}
```

Use the [`async` and `await`][] keywords to handle asynchronous operations.
The `async` keyword marks a method as asynchronous, and
`await` waits for expressions that return a [`Future`][].

使用 [`async` 和 `await`][`async` and `await`] 关键字处理异步操作。
`async` 关键字将方法标记为异步，
`await` 会等待返回 [`Future`][] 的表达式。

The `Uri.https` constructor safely builds URLs by
handling encoding and formatting.
This approach is more reliable than string concatenation,
especially when dealing with special characters or query parameters.

`Uri.https` 构造函数通过处理编码和格式安全地构建 URL。
这种方式比字符串拼接更可靠，尤其在处理特殊字符或查询参数时。

[`async` and `await`]: {{site.dart-site}}/language/async
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html

### 处理网络错误
<!-- Handle network errors -->

Always handle errors when making HTTP requests.
A status code of **200** indicates success, while other codes indicate errors.
If the status code isn't **200**, the model throws an error for
the UI to display to users.

发起 HTTP 请求时务必处理错误。
状态码 **200** 表示成功，其他状态码表示错误。
若状态码不是 **200**，Model 会抛出错误供 UI 向用户显示。

<?code-excerpt "fwe/wikipedia_reader/lib/step2c_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw const HttpException('Failed to update resource');
    }

    // TODO: Parse JSON and return Summary.
    throw UnimplementedError();
  }
}
```

### 解析来自 Wikipedia 的 JSON
<!-- Parse JSON from Wikipedia -->

The [Wikipedia API][] returns [JSON][] data that
you decode into a `Summary` class
Complete the `getRandomArticleSummary` method:

[Wikipedia API][] 返回 [JSON][] 数据，
你需要将其解码为 `Summary` 类。
完成 `getRandomArticleSummary` 方法：

<?code-excerpt "fwe/wikipedia_reader/lib/step2_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw const HttpException('Failed to update resource');
    }

    return Summary.fromJson(jsonDecode(response.body) as Map<String, Object?>);
  }
}
```

The `Summary` class is defined in `summary.dart`.
If you're unfamiliar with JSON parsing,
check out the [Getting started with Dart][] tutorial.

`Summary` 类定义在 `summary.dart` 中。
如果你不熟悉 JSON 解析，
请查看 [Getting started with Dart][] 教程。

[Wikipedia API]: https://en.wikipedia.org/api/rest_v1/
[JSON]: {{site.dart-site}}/tutorial/json
[Getting started with Dart]: {{site.dart-site}}/tutorial

### 回顾
<!-- Review -->

<SummaryCard>
title: 你已完成的内容
subtitle: 以下是你本课构建与学习内容的摘要。
completed: true
items:
  - title: 理解了 MVVM 架构模式
    icon: layers
    details: >-
      MVVM 将应用分为 Model（数据操作）、
      View（用户界面）和 ViewModel（状态管理）。
      这种关注点分离使代码更
      易测试、复用和维护。
  - title: 构建了获取 Wikipedia 数据的 HTTP 请求
    icon: cloud_download
    details: >-
      你创建了 `ArticleModel` 类，其中包含使用
      `async` 和 `await` 从 Wikipedia API 获取数据的方法。
      为安全构建请求 URL，
      你使用了 `Uri.https` 构造函数，它会
      为你处理编码和特殊字符。
  - title: 处理了错误并解析了 JSON 响应
    icon: data_object
    details: >-
      你检查了 HTTP 状态码以检测错误，并
      使用 `jsonDecode` 解析响应体。
      然后将原始 JSON 转换为类型化的 Dart 对象时，
      你使用了 `Summary.fromJson` 命名构造函数。
</SummaryCard>

### 自测
<!-- Test yourself -->

<Quiz title="HTTP 请求测验">
- question: "Dart 中 `async` 和 `await` 关键字的作用是什么？"
  options:
    - text: 它们让代码在单独线程上运行。
      correct: false
      explanation: Dart 是单线程的；async/await 在不使用线程的情况下处理异步操作。
    - text: 它们将函数标记为异步，并暂停执行直到 Future 完成。
      correct: true
      explanation: "`async` 关键字将函数标记为异步，`await` 会暂停执行直到 Future 完成。"
    - text: 它们自动缓存函数调用的结果。
      correct: false
      explanation: 缓存需要单独实现；async/await 用于处理异步操作。
    - text: 它们将同步代码转换为在后台运行。
      correct: false
      explanation: 它们不会把代码移到后台；它们管理异步执行流程。
- question: "在 Dart 中构建 URL 时，为什么更推荐使用 `Uri.https` 而不是字符串拼接？"
  options:
    - text: 它让代码更短。
      correct: false
      explanation: 代码长度不是主要好处；正确编码才是。
    - text: 它安全处理编码和格式，尤其适用于特殊字符和查询参数。
      correct: true
      explanation: Uri.https 正确编码特殊字符并格式化 URL，避免常见错误。
    - text: http package 要求必须使用它。
      correct: false
      explanation: 可以使用字符串，但 Uri.https 更安全可靠。
    - text: 它会自动验证 URL 是否存在。
      correct: false
      explanation: Uri.https 构建 URL；不会检查端点是否存在。
</Quiz>
