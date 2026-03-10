---
# title: Fetch data from the internet
title: 从网络获取数据
# description: Instructions on how to make HTTP requests and parse responses.
description: 关于如何发起 HTTP 请求并解析响应的说明。
layout: tutorial
---

Learn the MVVM architecture pattern and how to build HTTP requests with async/await.

学习 MVVM 架构模式以及如何使用 async/await 构建 HTTP 请求。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Understand the MVVM architecture pattern
    icon: layers
  - title: Build HTTP requests with async/await
    icon: cloud_download
  - title: Handle errors and parse JSON responses
    icon: data_object
</SummaryCard>

---

### Introduction

### 简介

The overarching pattern that this tutorial implements is called
_Model-View-ViewModel_ or _MVVM_.
MVVM is an [architectural pattern][] used in client apps that
separates your app into three layers:

本教程所实现的总体模式被称为
**Model-View-ViewModel**，即 **MVVM**。
MVVM 是一种用于客户端应用的 [架构模式][architectural pattern]，
它将你的应用分为三层：

- **Model**: Handles data operations.

  **Model**：处理数据操作。

- **View**: Displays the UI.

  **View**：展示用户界面。

- **ViewModel**: Manages state and connects the two.

  **ViewModel**：管理状态并连接上述两层。

The core tenet of MVVM (and many other patterns) is *separation of concerns*.
Managing state in separate classes (outside your UI widgets) makes
your code more testable, reusable, and easier to maintain.

MVVM（以及许多其他模式）的核心原则是 **关注点分离**。
在独立的类中管理状态（在 UI widget 之外）可以让你的代码
更易于测试、复用和维护。

A single feature in your app contains each one of the MVVM components.
In this tutorial, in addition to Flutter widgets,
you'll create `ArticleModel`, `ArticleViewModel`, and `ArticleView`.

你的应用中的每个功能都包含 MVVM 的各个组成部分。
在本教程中，除了 Flutter widget 之外，
你还将创建 `ArticleModel`、`ArticleViewModel` 和 `ArticleView`。

[architectural pattern]: /app-architecture/guide

### Define the Model

### 定义 Model

The Model is the source-of-truth for your app's data and is responsible for
low-level tasks such as making HTTP requests, caching data, or
managing system resources such as used by a Flutter plugin.
A model doesn't usually need to import Flutter libraries.

Model 是应用数据的唯一可信来源，负责
底层任务，例如发起 HTTP 请求、缓存数据，
或管理 Flutter 插件所使用的系统资源等。
通常，Model 不需要导入 Flutter 库。

Create an empty `ArticleModel` class in your `main.dart` file:

在 `main.dart` 文件中创建一个空的 `ArticleModel` 类：

```dart title="lib/main.dart"
class ArticleModel {
  // Properties and methods will be added here.
}
```

### Build the HTTP request

### 构建 HTTP 请求

Wikipedia provides a REST API that returns JSON data about articles.
For this app, you'll use the endpoint that returns a random article summary.

Wikipedia 提供了一个 REST API，返回有关文章的 JSON 数据。
在本应用中，你将使用返回随机文章摘要的端点。

```text
https://en.wikipedia.org/api/rest_v1/page/random/summary
```

Add a method to fetch a random Wikipedia article summary:

添加一个方法来获取随机的 Wikipedia 文章摘要：

```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    // TODO: Add error handling and JSON parsing.
  }
}
```

Use the [`async` and `await`][] keywords to handle asynchronous operations.
The `async` keyword marks a method as asynchronous, and
`await` waits for expressions that return a [`Future`][].

使用 [`async` 和 `await`][`async` and `await`] 关键字来处理异步操作。
`async` 关键字将方法标记为异步方法，而
`await` 则等待返回 [`Future`][] 的表达式完成。

The `Uri.https` constructor safely builds URLs by
handling encoding and formatting.
This approach is more reliable than string concatenation,
especially when dealing with special characters or query parameters.

`Uri.https` 构造函数通过处理编码和格式化来安全地构建 URL。
与字符串拼接相比，这种方式更可靠，
尤其是在处理特殊字符或查询参数时。

[`async` and `await`]: {{site.dart-site}}/language/async
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html

### Handle network errors

### 处理网络错误

Always handle errors when making HTTP requests.
A status code of **200** indicates success, while other codes indicate errors.
If the status code isn't **200**, the model throws an error for
the UI to display to users.

发起 HTTP 请求时务必处理错误。
状态码 **200** 表示成功，其他状态码则表示出错。
如果状态码不是 **200**，Model 会抛出一个错误，
以便 UI 向用户展示。

```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw HttpException('Failed to update resource');
    }

    // TODO: Parse JSON and return Summary.
  }
}
```

### Parse JSON from Wikipedia

### 解析来自 Wikipedia 的 JSON

The [Wikipedia API][] returns [JSON][] data that
you decode into a `Summary` class
Complete the `getRandomArticleSummary` method:

[Wikipedia API][] 返回 [JSON][] 数据，
你需要将其解码为一个 `Summary` 类。
完成 `getRandomArticleSummary` 方法：

```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw HttpException('Failed to update resource');
    }

    return Summary.fromJson(jsonDecode(response.body));
  }
}
```

The `Summary` class is defined in `summary.dart`.
If you're unfamiliar with JSON parsing,
check out the [Getting started with Dart][] tutorial.

`Summary` 类定义在 `summary.dart` 中。
如果你对 JSON 解析不太熟悉，
请参阅 [Dart 入门][Getting started with Dart] 教程。

[Wikipedia API]: https://en.wikipedia.org/api/rest_v1/
[JSON]: {{site.dart-site}}/tutorial/json
[Getting started with Dart]: {{site.dart-site}}/tutorial

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Understood the MVVM architecture pattern
    icon: layers
    details: >-
      MVVM separates your app into Model (data operations),
      View (user interface), and ViewModel (state management).
      This separation of concerns makes your code more
      testable, reusable, and easier to maintain.
  - title: Built an HTTP request to fetch Wikipedia data
    icon: cloud_download
    details: >-
      You created an `ArticleModel` class with a method that
      uses `async` and `await` to fetch data from the Wikipedia API.
      To safely build the URLs for the requests,
      you used the `Uri.https` constructor which
      handles encoding and special characters for you.
  - title: Handled errors and parsed JSON responses
    icon: data_object
    details: >-
      You checked the HTTP status code to detect errors and
      used `jsonDecode` to parse the response body.
      Then to convert the raw JSON into a typed Dart object,
      you used the `Summary.fromJson` named constructor.
</SummaryCard>

### Test yourself

### 自测

<Quiz title="HTTP Requests Quiz">
- question: "What do the `async` and `await` keywords do in Dart?"
  options:
    - text: They make code run on a separate thread.
      correct: false
      explanation: Dart is single-threaded; async/await handles asynchronous operations without threads.
    - text: They mark a function as asynchronous and pause execution until a Future completes.
      correct: true
      explanation: "The `async` keyword marks a function as asynchronous, and `await` pauses execution until the Future resolves."
    - text: They automatically cache the results of function calls.
      correct: false
      explanation: Caching requires separate implementation; async/await is for handling asynchronous operations.
    - text: They convert synchronous code to run in the background.
      correct: false
      explanation: They don't move code to the background; they manage asynchronous execution flow.
- question: "Why is `Uri.https` preferred over string concatenation when building URLs in Dart?"
  options:
    - text: It makes the code shorter.
      correct: false
      explanation: Code length isn't the main benefit; proper encoding is.
    - text: It safely handles encoding and formatting, especially for special characters and query parameters.
      correct: true
      explanation: Uri.https properly encodes special characters and formats URLs, preventing common errors.
    - text: It's required by the http package.
      correct: false
      explanation: You can use strings, but Uri.https is safer and more reliable.
    - text: It automatically validates that the URL exists.
      correct: false
      explanation: Uri.https builds the URL; it doesn't check if the endpoint exists.
</Quiz>
