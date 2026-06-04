---
# title: Delete data on the internet
title: 删除网络数据
# description: How to use the http package to delete data on the internet.
description: 如何使用 http 这个 package 来删除远程服务器的数据。
tags: cookbook, 实用教程, 网络请求
ai-translated: true
---

<?code-excerpt path-base="cookbook/networking/delete_data/"?>

This recipe covers how to delete data over
the internet using the `http` package.

本教程介绍如何使用 `http` package 在互联网上删除数据。

This recipe uses the following steps:

本教程包含以下步骤：

  1. Add the `http` package.

     添加 `http` package。

  2. Delete data on the server.

     在服务器上删除数据。

  3. Update the screen.

     更新屏幕。

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

## 2. Delete data on the server

## 2. 在服务器上删除数据

This recipe covers how to delete an album from the
[JSONPlaceholder][] using the `http.delete()` method.
Note that this requires the `id` of the album that
you want to delete. For this example,
use something you already know, for example `id = 1`.

本教程介绍如何使用 `http.delete()` 方法
从 [JSONPlaceholder][] 删除相册。
请注意，这需要你要删除的相册的 `id`。
在本示例中，
使用你已知的值，例如 `id = 1`。

<?code-excerpt "lib/main_step1.dart (deleteAlbum)"?>
```dart
Future<http.Response> deleteAlbum(String id) async {
  final http.Response response = await http.delete(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/$id'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );

  return response;
}
```

The `http.delete()` method returns a `Future` that contains a `Response`.

`http.delete()` 方法会返回一个包含 `Response` 的 `Future`。

* [`Future`][] is a core Dart class for working with
  async operations. A Future object represents a potential
  value or error that will be available at some time in the future.

  [`Future`][] 是 Dart 中用于处理异步操作的核心类。
  Future 对象表示将来某个时刻可用的潜在值或错误。

* The `http.Response` class contains the data received from a successful
  http call.

  `http.Response` 类包含成功的 http 调用所接收到的数据。

* The `deleteAlbum()` method takes an `id` argument that
  is needed to identify the data to be deleted from the server.

  `deleteAlbum()` 方法接受 `id` 参数，
  用于标识要从服务器删除的数据。

## 3. Update the screen

## 3. 更新屏幕

In order to check whether the data has been deleted or not,
first fetch the data from the [JSONPlaceholder][]
using the `http.get()` method, and display it in the screen.
(See the [Fetch Data][] recipe for a complete example.)
You should now have a **Delete Data** button that,
when pressed, calls the `deleteAlbum()` method.

为了检查数据是否已被删除，
请首先使用 `http.get()` 方法从 [JSONPlaceholder][] 获取数据，
并在屏幕上显示。
（完整示例请参阅 [Fetch Data][] 教程。）
此时你应该有一个 **Delete Data** 按钮，
按下时会调用 `deleteAlbum()` 方法。

<?code-excerpt "lib/main.dart (Column)" replace="/return //g"?>
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Text(snapshot.data?.title ?? 'Deleted'),
    ElevatedButton(
      child: const Text('Delete Data'),
      onPressed: () {
        setState(() {
          _futureAlbum = deleteAlbum(
            snapshot.data!.id.toString(),
          );
        });
      },
    ),
  ],
);
```
Now, when you click on the ***Delete Data*** button,
the `deleteAlbum()` method is called and the id
you are passing is the id of the data that you retrieved
from the internet. This means you are going to delete
the same data that you fetched from the internet.

现在，当你点击 ***Delete Data*** 按钮时，
会调用 `deleteAlbum()` 方法，而你传入的 id
正是你从互联网获取的数据的 id。这意味着你将删除
与从互联网获取的相同的数据。

### Returning a response from the deleteAlbum() method

### 从 deleteAlbum() 方法返回响应

Once the delete request has been made,
you can return a response from the `deleteAlbum()`
method to notify our screen that the data has been deleted.

发出删除请求后，
你可以从 `deleteAlbum()` 方法返回响应，
以通知屏幕数据已被删除。

<?code-excerpt "lib/main.dart (deleteAlbum)"?>
```dart
Future<Album> deleteAlbum(String id) async {
  final http.Response response = await http.delete(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/$id'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then return an empty Album. After deleting,
    // you'll get an empty JSON `{}` response.
    // Don't return `null`, otherwise `snapshot.hasData`
    // will always return false on `FutureBuilder`.
    return Album.empty();
  } else {
    // If the server did not return a "200 OK response",
    // then throw an exception.
    throw Exception('Failed to delete album.');
  }
}
```

`FutureBuilder()` now rebuilds when it receives a response.
Since the response won't have any data in its body
if the request was successful,
the `Album.fromJson()` method creates an instance of the
`Album` object with a default value (`null` in our case).
This behavior can be altered in any way you wish.

`FutureBuilder()` 在收到响应后会重新构建。
由于请求成功时响应体中不会有任何数据，
`Album.fromJson()` 方法会使用默认值（在我们的例子中是 `null`）
创建 `Album` 对象实例。
你可以按任意方式修改这一行为。

That's all!
Now you've got a function that deletes the data from the internet.

就是这样！
现在你就拥有了一个可以从互联网删除数据的函数。

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
    // If the server did return a 200 OK response, then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response, then throw an exception.
    throw Exception('Failed to load album');
  }
}

Future<Album> deleteAlbum(String id) async {
  final http.Response response = await http.delete(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/$id'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then return an empty Album. After deleting,
    // you'll get an empty JSON `{}` response.
    // Don't return `null`, otherwise `snapshot.hasData`
    // will always return false on `FutureBuilder`.
    return Album.empty();
  } else {
    // If the server did not return a "200 OK response",
    // then throw an exception.
    throw Exception('Failed to delete album.');
  }
}

class Album {
  int? id;
  String? title;

  Album({this.id, this.title});

  Album.empty();

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
  late Future<Album> _futureAlbum;

  @override
  void initState() {
    super.initState();
    _futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Delete Data Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('Delete Data Example')),
        body: Center(
          child: FutureBuilder<Album>(
            future: _futureAlbum,
            builder: (context, snapshot) {
              // If the connection is done,
              // check for response data or an error.
              if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasData) {
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(snapshot.data?.title ?? 'Deleted'),
                      ElevatedButton(
                        child: const Text('Delete Data'),
                        onPressed: () {
                          setState(() {
                            _futureAlbum = deleteAlbum(
                              snapshot.data!.id.toString(),
                            );
                          });
                        },
                      ),
                    ],
                  );
                } else if (snapshot.hasError) {
                  return Text('${snapshot.error}');
                }
              }

              // By default, show a loading spinner.
              return const CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
```

[Fetch Data]: /cookbook/networking/fetch-data
[ConnectionState]: {{site.api}}/flutter/widgets/ConnectionState-class.html
[`didChangeDependencies()`]: {{site.api}}/flutter/widgets/State/didChangeDependencies.html
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[JSONPlaceholder]: https://jsonplaceholder.typicode.com/
[`http`]: {{site.pub-pkg}}/http
[`http.delete()`]: {{site.pub-api}}/http/latest/http/delete.html
[`http` package]: {{site.pub-pkg}}/http/install
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Introduction to unit testing]: /cookbook/testing/unit/introduction
[`initState()`]: {{site.api}}/flutter/widgets/State/initState.html
[Mock dependencies using Mockito]: /cookbook/testing/unit/mocking
[JSON and serialization]: /data-and-backend/serialization/json
[`State`]: {{site.api}}/flutter/widgets/State-class.html
