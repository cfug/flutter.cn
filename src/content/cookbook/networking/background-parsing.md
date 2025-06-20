---
# title: Parse JSON in the background
title: 在后台处理 JSON 数据解析
# description: How to perform a task in the background.
description: 如何在后台执行任务。
tags: cookbook, 实用教程, 网络请求
keywords: json,后台任务,调度,fps,卡顿
---

<?code-excerpt path-base="cookbook/networking/background_parsing/"?>

By default, Dart apps do all of their work on a single thread.
In many cases, this model simplifies coding and is fast enough
that it does not result in poor app performance or stuttering animations,
often called "jank."

Dart 应用通常只会在单线程中处理它们的工作。
并且在大多数情况中，
这种模式不但简化了代码而且速度也够快，
基本不会出现像动画卡顿以及性能不足这种「不靠谱」的问题。

However, you might need to perform an expensive computation,
such as parsing a very large JSON document.
If this work takes more than 16 milliseconds,
your users experience jank.

但是，当你需要进行一个非常复杂的计算时，例如解析一个巨大的 JSON 文档。
如果这项工作耗时超过了 16 毫秒，那么你的用户就会感受到掉帧。

To avoid jank, you need to perform expensive computations
like this in the background, using a separate [Isolate][].
This recipe uses the following steps:

为了避免掉帧，像上面那样消耗性能的计算就应该放在后台处理。
你可以使用一个单独的 [Isolate][]。
你可以根据以下步骤来操作：

## Directions

## 使用步骤

  1. Add the `http` package.

     添加 `http` 这个 package；

  2. Make a network request using the `http` package.

     使用 `http` package 发起一个网络请求；

  3. Convert the response into a list of photos.

     将响应转换成一列照片；

  4. Move this work to a separate isolate.

     将这个工作移交给一个单独的 isolate。

## 1. Add the `http` package

## 1. 添加 `http` 包

First, add the [`http`][] package to your project.
The `http` package makes it easier to perform network
requests, such as fetching data from a JSON endpoint.

首先，在你的项目中添加 [`http`][] 这个 package，
`http` package 会让网络请求变的像从 JSON 端点获取数据一样简单。

To add the `http` package as a dependency,
run `flutter pub add`:

要将 `http` package 添加为依赖项，
请运行 `flutter pub add`：

```console
$ flutter pub add http
```

## 2. Make a network request

## 2. 发起一个网络请求

This example covers how to fetch a large JSON document
that contains a list of 5000 photo objects from the
[JSONPlaceholder REST API][],
using the [`http.get()`][] method.

在这个例子中，你将会使用 [`http.get()`][] 方法通过
[JSONPlaceholder REST API][] 获取到一个包含
5000 张图片对象的超大 JSON 文档。

<?code-excerpt "lib/main_step2.dart (fetchPhotos)"?>
```dart
Future<http.Response> fetchPhotos(http.Client client) async {
  return client.get(Uri.parse('https://jsonplaceholder.typicode.com/photos'));
}
```

:::note

You're providing an `http.Client` to the function in this example.
This makes the function easier to test and use in different environments.

在这个例子中你需要给方法添加了一个 `http.Client` 参数。
这将使得该方法测试起来更容易，同时也可以在不同环境中使用。

:::

## 3. Parse and convert the JSON into a list of photos

## 3. 解析并将 json 转换成一列图片

Next, following the guidance from the
[Fetch data from the internet][] recipe,
convert the `http.Response` into a list of Dart objects.
This makes the data easier to work with.

接下来，根据 [获取网络数据][Fetch data from the internet] 的说明，
为了让接下来的数据处理更简单，
你需要将 `http.Response` 转换成一列 Dart 对象。

### Create a `Photo` class

### 创建一个 `Photo` 类

First, create a `Photo` class that contains data about a photo.
Include a `fromJson()` factory method to make it easy to create a
`Photo` starting with a JSON object.

首先，创建一个包含图片数据的 `Photo` 类。
还需要一个 `fromJson` 的工厂方法，
使得通过 json 创建 `Photo` 变的更加方便。

<?code-excerpt "lib/main_step3.dart (Photo)"?>
```dart
class Photo {
  final int albumId;
  final int id;
  final String title;
  final String url;
  final String thumbnailUrl;

  const Photo({
    required this.albumId,
    required this.id,
    required this.title,
    required this.url,
    required this.thumbnailUrl,
  });

  factory Photo.fromJson(Map<String, dynamic> json) {
    return Photo(
      albumId: json['albumId'] as int,
      id: json['id'] as int,
      title: json['title'] as String,
      url: json['url'] as String,
      thumbnailUrl: json['thumbnailUrl'] as String,
    );
  }
}
```

### Convert the response into a list of photos

### 将响应转换成一列图片

Now, use the following instructions to update the
`fetchPhotos()` function so that it returns a
`Future<List<Photo>>`:

现在，为了让 `fetchPhotos()` 方法可以返回一个
`Future<List<Photo>>`，我们需要以下两点更新：

  1. Create a `parsePhotos()` function that converts the response
     body into a `List<Photo>`.

     创建一个可以将响应体转换成 `List<Photo>` 的方法：`parsePhotos()` 
  
  2. Use the `parsePhotos()` function in the `fetchPhotos()` function.

     在 `fetchPhotos()` 方法中使用 `parsePhotos()` 方法

<?code-excerpt "lib/main_step3.dart (parsePhotos)"?>
```dart
// A function that converts a response body into a List<Photo>.
List<Photo> parsePhotos(String responseBody) {
  final parsed = (jsonDecode(responseBody) as List)
      .cast<Map<String, dynamic>>();

  return parsed.map<Photo>((json) => Photo.fromJson(json)).toList();
}

Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/photos'),
  );

  // Synchronously run parsePhotos in the main isolate.
  return parsePhotos(response.body);
}
```

## 4. Move this work to a separate isolate

## 4. 将这部分工作移交到单独的 isolate 中

If you run the `fetchPhotos()` function on a slower device,
you might notice the app freezes for a brief moment as it parses and
converts the JSON. This is jank, and you want to get rid of it.

如果你在一台很慢的手机上运行 `fetchPhotos()` 函数，
你或许会注意到应用会有点卡顿，因为它需要解析并转换 json。
显然这并不好，所以你要避免它。

You can remove the jank by moving the parsing and conversion
to a background isolate using the [`compute()`][]
function provided by Flutter. The `compute()` function runs expensive
functions in a background isolate and returns the result. In this case,
run the `parsePhotos()` function in the background.

那么我们究竟可以做什么呢？
那就是通过 Flutter 提供的 [`compute()`][] 方法
将解析和转换的工作移交到一个后台 isolate 中。
这个 `compute()` 函数可以在后台 isolate 中运行复杂的函数并返回结果。
在这里，我们就需要将 `parsePhotos()` 方法放入后台。

<?code-excerpt "lib/main.dart (fetchPhotos)"?>
```dart
Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/photos'),
  );

  // Use the compute function to run parsePhotos in a separate isolate.
  return compute(parsePhotos, response.body);
}
```

## Notes on working with isolates

## 使用 Isolates 需要注意的地方

Isolates communicate by passing messages back and forth. These messages can
be primitive values, such as `null`, `num`, `bool`, `double`, or `String`, or
simple objects such as the `List<Photo>` in this example.

Isolates 通过来回传递消息来交流。这些消息可以是任何值，
它们可以是 `null`、`num`、`bool`、`double` 或者 `String`，
哪怕是像这个例子中的 `List<Photo>` 这样简单对象都没问题。

You might experience errors if you try to pass more complex objects,
such as a `Future` or `http.Response` between isolates.

当你试图传递更复杂的对象时，你可能会遇到错误，
例如在 isolates 之间的 `Future` 或者 `http.Response`。

As an alternate solution, check out the [`worker_manager`][] or
[`workmanager`][] packages for background processing.

与此同时，后台进程的其他解决方案是使用
[`worker_manager`][] 或 [`workmanager`][] package。

[`worker_manager`]:  {{site.pub}}/packages/worker_manager
[`workmanager`]: {{site.pub}}/packages/workmanager

## Complete example

## 完整样例

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/photos'),
  );

  // Use the compute function to run parsePhotos in a separate isolate.
  return compute(parsePhotos, response.body);
}

// A function that converts a response body into a List<Photo>.
List<Photo> parsePhotos(String responseBody) {
  final parsed = (jsonDecode(responseBody) as List)
      .cast<Map<String, dynamic>>();

  return parsed.map<Photo>((json) => Photo.fromJson(json)).toList();
}

class Photo {
  final int albumId;
  final int id;
  final String title;
  final String url;
  final String thumbnailUrl;

  const Photo({
    required this.albumId,
    required this.id,
    required this.title,
    required this.url,
    required this.thumbnailUrl,
  });

  factory Photo.fromJson(Map<String, dynamic> json) {
    return Photo(
      albumId: json['albumId'] as int,
      id: json['id'] as int,
      title: json['title'] as String,
      url: json['url'] as String,
      thumbnailUrl: json['thumbnailUrl'] as String,
    );
  }
}

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Isolate Demo';

    return const MaterialApp(
      title: appTitle,
      home: MyHomePage(title: appTitle),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Future<List<Photo>> futurePhotos;

  @override
  void initState() {
    super.initState();
    futurePhotos = fetchPhotos(http.Client());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: FutureBuilder<List<Photo>>(
        future: futurePhotos,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return const Center(child: Text('An error has occurred!'));
          } else if (snapshot.hasData) {
            return PhotosList(photos: snapshot.data!);
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}

class PhotosList extends StatelessWidget {
  const PhotosList({super.key, required this.photos});

  final List<Photo> photos;

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemCount: photos.length,
      itemBuilder: (context, index) {
        return Image.network(photos[index].thumbnailUrl);
      },
    );
  }
}
```

![Isolate demo](/assets/images/docs/cookbook/isolate.webp){:.site-mobile-screenshot}

[`compute()`]: {{site.api}}/flutter/foundation/compute.html
[Fetch data from the internet]: /cookbook/networking/fetch-data
[`http`]: {{site.pub-pkg}}/http
[`http.get()`]: {{site.pub-api}}/http/latest/http/get.html
[Isolate]: {{site.api}}/flutter/dart-isolate/Isolate-class.html
[JSONPlaceholder REST API]: https://jsonplaceholder.typicode.com
