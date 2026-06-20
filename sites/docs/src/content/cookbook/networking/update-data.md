---
# title: Update data over the internet
title: 更新网络数据
# description: How to use the http package to update data over the internet.
description: 如何使用 http 这个 package 来更新远程服务器的数据。
tags: cookbook, 实用教程, 网络请求
ai-translated: true
---

<?code-excerpt path-base="cookbook/networking/update_data/"?>

Updating data over the internet is necessary for most apps.
The `http` package has got that covered!

对于大部分应用来说，在网络上更新数据都是必不可少的。
`http` package 正好可以满足这一需求！

This recipe uses the following steps:

本教程包含以下步骤：

  1. Add the `http` package.

     添加 `http` package。

  2. Update data over the internet using the `http` package.

     使用 `http` package 在网络上更新数据。

  3. Convert the response into a custom Dart object.

     将响应转换成一个自定义的 Dart 对象。

  4. Get the data from the internet.

     从互联网获取数据。

  5. Update the existing `title` from user input.

     根据用户输入更新现有的 `title`。

  6. Update and display the response on screen.

     更新数据并在屏幕上显示响应。

## 1. Add the `http` package

## 1. 添加 `http` package

To add the `http` package as a dependency,
run `flutter pub add`:

要将 `http` package 添加为依赖，
请运行 `flutter pub add`：

```console
$ flutter pub add http
```

Import the `http` package.

导入 `http` package。

<?code-excerpt "lib/main.dart (Http)"?>
```dart
import 'package:http/http.dart' as http;
```

{% render "docs/cookbook/networking/internet-permission.md" %}

## 2. Updating data over the internet using the `http` package

## 2. 使用 `http` package 在网络上更新数据

This recipe covers how to update an album title to the
[JSONPlaceholder][] using the [`http.put()`][] method.

本教程介绍如何使用 [`http.put()`][] 方法
将相册标题更新到 [JSONPlaceholder][]。

<?code-excerpt "lib/main_step2.dart (updateAlbum)"?>
```dart
Future<http.Response> updateAlbum(String title) {
  return http.put(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );
}
```

The `http.put()` method returns a `Future` that contains a `Response`.

`http.put()` 方法会返回一个包含 `Response` 的 `Future`。

* [`Future`][] is a core Dart class for working with
  async operations. A `Future` object represents a potential
  value or error that will be available at some time in the future.

  [`Future`][] 是 Dart 中用于处理异步操作的核心类。
  `Future` 对象表示将来某个时刻可用的潜在值或错误。

* The `http.Response` class contains the data received from a successful
  http call.

  `http.Response` 类包含成功的 http 调用所接收到的数据。

* The `updateAlbum()` method takes an argument, `title`,
  which is sent to the server to update the `Album`.

  `updateAlbum()` 方法接受参数 `title`，
  该参数会发送到服务器以更新 `Album`。

## 3. Convert the `http.Response` to a custom Dart object

## 3. 将 `http.Response` 转换成自定义的 Dart 对象

While it's easy to make a network request,
working with a raw `Future<http.Response>`
isn't very convenient. To make your life easier,
convert the `http.Response` into a Dart object.

虽然发起网络请求很容易，
但直接处理原始的 `Future<http.Response>` 并不方便。
为了让后续工作更轻松，
请将 `http.Response` 转换成 Dart 对象。

### Create an Album class

### 创建一个 `Album` 类

First, create an `Album` class that contains the data from the
network request. It includes a factory constructor that
creates an `Album` from JSON.

首先，创建一个包含网络请求数据的 `Album` 类。
它包含一个工厂构造器，用于从 JSON 创建 `Album`。

Converting JSON with [pattern matching][] is only one option.
For more information, see the full article on
[JSON and serialization][].

使用 [pattern matching][] 转换 JSON 只是其中一种方式。
想了解更多，请查看完整文章：[JSON and serialization][]。

<?code-excerpt "lib/main.dart (Album)"?>
```dart
class Album {
  final int id;
  final String title;

  const Album({required this.id, required this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'id': int id, 'title': String title} => Album(id: id, title: title),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}
```

### Convert the `http.Response` to an `Album`

### 将 `http.Response` 转换成 `Album`

Now, use the following steps to update the `updateAlbum()`
function to return a `Future<Album>`:

现在，按以下步骤更新 `updateAlbum()` 函数，
使其返回 `Future<Album>`：

  1. Convert the response body into a JSON `Map` with the
     `dart:convert` package.

     使用 `dart:convert` package 将响应体转换成 JSON `Map`。

  2. If the server returns an `UPDATED` response with a status
     code of 200, then convert the JSON `Map` into an `Album`
     using the `fromJson()` factory method.

     如果服务器返回状态码为 200 的 `UPDATED` 响应，
     则使用 `fromJson()` 工厂方法将 JSON `Map` 转换成 `Album`。

  3. If the server doesn't return an `UPDATED` response with a
     status code of 200, then throw an exception.
     (Even in the case of a "404 Not Found" server response,
     throw an exception. Do not return `null`.
     This is important when examining
     the data in `snapshot`, as shown below.)

     如果服务器没有返回状态码为 200 的 `UPDATED` 响应，则抛出异常。
     （即使是「404 Not Found」的服务器响应，也要抛出异常。不要返回 `null`。
     在检查如下所示的 `snapshot` 中的数据时，这一点很重要。）

<?code-excerpt "lib/main.dart (updateAlbum)"?>
```dart
Future<Album> updateAlbum(String title) async {
  final response = await http.put(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to update album.');
  }
}
```

Hooray!
Now you've got a function that updates the title of an album.

太棒了！
现在你就拥有了一个可以更新相册标题的函数。

### Get the data from the internet

### 从互联网获取数据

Get the data from internet before you can update it.
For a complete example, see the [Fetch data][] recipe.

在更新之前，需要先从互联网获取数据。
完整示例请参阅 [Fetch data][] 教程。

<?code-excerpt "lib/main.dart (fetchAlbum)"?>
```dart
Future<Album> fetchAlbum() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}
```

Ideally, you will use this method to set
`_futureAlbum` during `initState` to fetch
the data from the internet.

理想情况下，你会在 `initState` 中使用此方法设置 `_futureAlbum`，
以从互联网获取数据。

## 4. Update the existing title from user input

## 4. 根据用户输入更新现有标题

Create a `TextField` to enter a title and a `ElevatedButton`
to update the data on server.
Also define a `TextEditingController` to
read the user input from a `TextField`.

创建一个用于输入标题的 `TextField` 和一个用于在服务器上更新数据的 `ElevatedButton`。
还要定义一个 `TextEditingController`，
用于从 `TextField` 读取用户输入。

When the `ElevatedButton` is pressed,
the `_futureAlbum` is set to the value returned by
`updateAlbum()` method.

当按下 `ElevatedButton` 时，
`_futureAlbum` 会被设置为 `updateAlbum()` 方法返回的值。

<?code-excerpt "lib/main_step5.dart (Column)"?>
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Padding(
      padding: const EdgeInsets.all(8),
      child: TextField(
        controller: _controller,
        decoration: const InputDecoration(hintText: 'Enter Title'),
      ),
    ),
    ElevatedButton(
      onPressed: () {
        setState(() {
          _futureAlbum = updateAlbum(_controller.text);
        });
      },
      child: const Text('Update Data'),
    ),
  ],
);
```

On pressing the **Update Data** button, a network request
sends the data in the `TextField` to the server as a `PUT` request.
The `_futureAlbum` variable is used in the next step.

按下 **Update Data** 按钮后，网络请求会以 `PUT` 请求
将 `TextField` 中的数据发送到服务器。
下一步会使用 `_futureAlbum` 变量。

## 5. Display the response on screen

## 5. 在屏幕上显示响应

To display the data on screen, use the
[`FutureBuilder`][] widget.
The `FutureBuilder` widget comes with Flutter and
makes it easy to work with async data sources.
You must provide two parameters:

要在屏幕上显示数据，请使用 [`FutureBuilder`][] widget。
`FutureBuilder` widget 随 Flutter 提供，
可让你轻松处理异步数据源。
你必须提供两个参数：

  1. The `Future` you want to work with. In this case,
     the future returned from the `updateAlbum()` function.

     你想要处理的 `Future`。在本例中，
     即 `updateAlbum()` 函数返回的 future。

  2. A `builder` function that tells Flutter what to render,
     depending on the state of the `Future`: loading,
     success, or error.

     一个 `builder` 函数，根据 `Future` 的状态（loading、success 或 error）
     告诉 Flutter 渲染什么内容。

Note that `snapshot.hasData` only returns `true` when
the snapshot contains a non-null data value.
This is why the `updateAlbum` function should throw an exception
even in the case of a "404 Not Found" server response.
If `updateAlbum` returns `null` then
`CircularProgressIndicator` will display indefinitely.

请注意，只有当快照包含非空数据值时，
`snapshot.hasData` 才会返回 `true`。
因此，即使在「404 Not Found」的服务器响应情况下，
`updateAlbum` 函数也应抛出异常。
如果 `updateAlbum` 返回 `null`，
则 `CircularProgressIndicator` 会无限期显示。

<?code-excerpt "lib/main_step5.dart (FutureBuilder)"?>
```dart
FutureBuilder<Album>(
  future: _futureAlbum,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data!.title);
    } else if (snapshot.hasError) {
      return Text('${snapshot.error}');
    }

    return const CircularProgressIndicator();
  },
);
```

## Complete example

## 完整样例

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Album> fetchAlbum() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

Future<Album> updateAlbum(String title) async {
  final response = await http.put(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to update album.');
  }
}

class Album {
  final int id;
  final String title;

  const Album({required this.id, required this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'id': int id, 'title': String title} => Album(id: id, title: title),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  final TextEditingController _controller = TextEditingController();
  late Future<Album> _futureAlbum;

  @override
  void initState() {
    super.initState();
    _futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Update Data Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('Update Data Example')),
        body: Container(
          alignment: Alignment.center,
          padding: const EdgeInsets.all(8),
          child: FutureBuilder<Album>(
            future: _futureAlbum,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasData) {
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(snapshot.data!.title),
                      TextField(
                        controller: _controller,
                        decoration: const InputDecoration(
                          hintText: 'Enter Title',
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            _futureAlbum = updateAlbum(_controller.text);
                          });
                        },
                        child: const Text('Update Data'),
                      ),
                    ],
                  );
                } else if (snapshot.hasError) {
                  return Text('${snapshot.error}');
                }
              }

              return const CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
```

[ConnectionState]: {{site.api}}/flutter/widgets/ConnectionState-class.html
[`didChangeDependencies()`]: {{site.api}}/flutter/widgets/State/didChangeDependencies.html
[Fetch data]: /cookbook/networking/fetch-data
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[`http`]: {{site.pub-pkg}}/http
[`http.put()`]: {{site.pub-api}}/http/latest/http/put.html
[`http` package]: {{site.pub}}/packages/http/install
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Introduction to unit testing]: /cookbook/testing/unit/introduction
[`initState()`]: {{site.api}}/flutter/widgets/State/initState.html
[JSONPlaceholder]: https://jsonplaceholder.typicode.com/
[JSON and serialization]: /data-and-backend/serialization/json
[Mock dependencies using Mockito]: /cookbook/testing/unit/mocking
[pattern matching]: {{site.dart-site}}/language/patterns
[`State`]: {{site.api}}/flutter/widgets/State-class.html
