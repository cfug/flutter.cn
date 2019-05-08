---
title: Fetch data from the internet
title: 获取网络数据
prev:
  title: Send data to a new screen
  title: 传递数据到新页面
  path: /docs/cookbook/navigation/passing-data
next:
  title: Making authenticated requests
  title: 发起 HTTP 认证授权请求
  path: /docs/cookbook/networking/authenticated-requests
---

Fetching data from the internet is necessary for most apps. Luckily, Dart and
Flutter provide tools for this type of work.

对于大部分应用来说，获取网络数据都是必不可少的一个功能。幸运的是，Dart 和 Flutter 就为我们提供了这样的工具。

## Directions

## 使用步骤

  1. Add the `http` package
  2. Make a network request using the `http` package
  3. Convert the response into a custom Dart object
  4. Fetch and Display the data with Flutter

  5. 添加 `http` 包
  6. 使用 `http` 包进行网络请求
  7. 将返回的响应转换成一个自定义的 Dart 对象
  8. 使用 Flutter 对数据进行获取和展示


## 1. Add the `http` package

## 1. 添加 `http` 包

The [`http`]({{site.pub-pkg}}/http) package provides the
simplest way to fetch data from the internet.

[`http`]({{site.pub-pkg}}/http) 包为我们提供了获取网络数据的最简单的方法。

To install the `http` package, you must add it to the dependencies section
of the `pubspec.yaml`. You can [find the latest version of the http package on
the Pub site]({{site.pub}}/packages/http#-installing-tab-).

安装 `http` 包之前，你必须先把它添加到 `pubspec.yaml` 的依赖区域。你可以在[Pub site 找到 http 包的最新版本]({{site.pub}}/packages/http#-installing-tab-)。

```yaml
dependencies:
  http: <latest_version>
```

## 2. Make a network request

## 2. 进行网络请求

In this example, you'll fetch a sample post from the
[JSONPlaceholder REST API](https://jsonplaceholder.typicode.com/) using the
[http.get()]({{site.pub-api}}/http/latest/http/get.html) method.

在这里，你可以使用 [http.get()]({{site.pub-api}}/http/latest/http/get.html) 方法从 [JSONPlaceholder REST API](https://jsonplaceholder.typicode.com/) 上获取到一个样本数据。

<!-- skip -->
```dart
Future<http.Response> fetchPost() {
  return http.get('https://jsonplaceholder.typicode.com/posts/1');
}
```

The `http.get()` method returns a `Future` that contains a `Response`.

这个 `http.get()` 方法会返回一个包含 `Response` 的 `Future`。

  * [`Future`]({{site.api}}/flutter/dart-async/Future-class.html) is
    a core Dart class for working with async operations.
    It is used to represent a potential value or error that will
    be available at some time in the future.
  * The `http.Response` class contains the data received from a successful
    http call.

  * [`Future`]({{site.api}}/flutter/dart-async/Future-class.html) 是 Dart 用来处理异步操作的一个核心类。它通常代表一个可能的值或者将来或许会用到的错误。
  * `http.Response` 类包含成功的 http 请求接收到的数据。

## 3. Convert the response into a custom Dart object

## 3. 将返回的响应转换成一个自定义的 Dart 对象

While it's easy to make a network request, working with a raw
`Future<http.Response>` isn't very convenient. To make your life easier,
convert the `http.Response` into a Dart object.

虽然进行网络请求很容易，但是处理 `Future<http.Response>` 却并不简单。为了后续处理起来更加方便，我们需要将 `http.Response`转换成一个 Dart 对象。

### Create a `Post` class

### 创建一个 `Post` 类

First, create a `Post` class that contains the data from the
network request. It will include a factory constructor that 
creates a `Post` from json.

首先，创建一个包含请求返回数据的 `Post` 类。而且这个类还需要一个可以利用 json 创建 `Post` 的的工厂构造器。

Converting JSON by hand is only one option. For more information,
please see the full article on [JSON and
serialization](/docs/development/data-and-backend/json).

手动转换 JSON 是我们唯一的选项。想了解更多，请查看完整的文章 [JSON 和序列化数据](/docs/development/data-and-backend/json)。

<!-- skip -->
```dart
class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({this.userId, this.id, this.title, this.body});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
}
```

### Convert the `http.Response` to a `Post`

### 将 `http.Response` 转换成一个 `Post`

Now, update the `fetchPost` function to return a `Future<Post>`. To do so,
you'll need to:

现在，更新 `fetchPost` 函数来返回一个 `Future<Post>`。因此，我们需要做以下几步：

  1. Convert the response body into a json `Map` with the `dart:convert`
     package.
  2. If the server returns an "OK" response with a status code of 200, convert
     the json `Map` into a `Post` using the `fromJson` factory method.
  3. If the server returns an unexpected response, throw an error

  1. 用 `dart:convert` 包将响应体转换成一个 json `Map`。
  2. 如果服务器返回了一个状态码为 200 的 "OK" 响应，就使用 `fromJson` 工厂方法将 json `Map` 转换成 `Post`。
  3. 如果服务器返回的不是我们预期的响应，那么就抛出错误。

<!-- skip -->
```dart
Future<Post> fetchPost() async {
  final response =
      await http.get('https://jsonplaceholder.typicode.com/posts/1');

  if (response.statusCode == 200) {
    // If server returns an OK response, parse the JSON
    return Post.fromJson(json.decode(response.body));
  } else {
    // If that response was not OK, throw an error.
    throw Exception('Failed to load post');
  }
}
```

Hooray! Now you've got a function that we can call to fetch a Post from the
internet.

棒极了！现在你就有了一个可以获取网络数据的完整函数啦。

## 4. Fetch and Display the data

## 4. 获取并展示数据

In order to fetch the data and display it on screen, you can use the
[`FutureBuilder`]({{site.api}}/flutter/widgets/FutureBuilder-class.html)
widget. The `FutureBuilder` Widget comes with Flutter and makes it easy
to work with async data sources.

为了在屏幕上获取并展示数据，你可以使用 [`FutureBuilder`]({{site.api}}/flutter/widgets/FutureBuilder-class.html) 部件。这个由 Flutter 提供的 `FutureBuilder` 部件可以让处理异步数据源变的非常简单。

You must provide two parameters:

此时，你必须要提供两个参数：

  1. The `Future` you want to work with. In this case, call the
     `fetchPost()` function.
  2. A `builder` function that tells Flutter what to render, depending on the
     state of the `Future`: loading, success, or error.

  1. 你想要处理的 `Future`。在这里就是调用 `fetchPost()` 函数。
  2. 一个告诉 Flutter 渲染哪些内容的 `builder` 函数，同时这也依赖于 `Future` 的状态：loading、success 或者是 error。

<!-- skip -->
```dart
FutureBuilder<Post>(
  future: fetchPost(),
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data.title);
    } else if (snapshot.hasError) {
      return Text("${snapshot.error}");
    }

    // By default, show a loading spinner
    return CircularProgressIndicator();
  },
);
```

## 5. Moving the fetch call out of the `build()` method

## 5. 将数据请求移出 `build()` 方法

Although it's convenient, it's not recommended to put a call to an API in a
`build()` method.

虽然这样会比较方便，但是我们仍然不推荐将 API 调用置于 `build()` 方法内部。

Flutter calls the `build()` method every time it wants to change anything
in the view, and this happens surprisingly often.  If you leave the fetch
call in your `build()` method, you'll flood the API with unnecessary calls
and slow down your app.

每当 Flutter 需要改变视图中的一些内容时（这个发生的频率非常高），就会调用 `build()` 方法。因此，如果你将数据请求置于 `build()` 内部，就会造成大量的无效调用，同时还会拖慢应用程序的速度。

Here are some better options so it'll only hit the API when the page is
initially loaded.

关于如何在页面初始化的时候，只调用 API，下面有一些更好的选择。

### Pass it into a `StatelessWidget`

### 传入 `StatelessWidget`

With this strategy, the parent widget is responsible for calling the fetch
method, storing its result, and then passing it to your widget.

使用这种策略的话，相当于父组件负责调用数据获取方法，存储结果并传入你的组件中。

<!-- skip -->
```dart
class MyApp extends StatelessWidget {
  final Future<Post> post;

  MyApp({Key key, this.post}) : super(key: key);
```

You can see a working example of this in the complete example below.

你可以在下面看到一个关于这种策略的完整代码示例。

### Call it in the lifecycle of a `StatefulWidget`'s state

### 在 `StatefulWidget` 的生命中期中调用

If your widget is stateful, you can call the fetch method in either the
[`initState`]({{site.api}}/flutter/widgets/State/initState.html) or
[`didChangeDependencies`]({{site.api}}/flutter/widgets/State/didChangeDependencies.html)
methods.

如果你的组件是有状态的，你可以在 [`initState`]({{site.api}}/flutter/widgets/State/initState.html) 或者 [`didChangeDependencies`]({{site.api}}/flutter/widgets/State/didChangeDependencies.html) 方法中调用 fetch 方法。

`initState` is called exactly once and then never again.
If you want to have the option of reloading the API in response to an
[`InheritedWidget`]({{site.api}}/flutter/widgets/InheritedWidget-class.html)
changing, put the call into the `didChangeDependencies` method.  See
[`State`]({{site.api}}/flutter/widgets/State-class.html) for more
details.

`initState` 只会被调用一次而且再也不会被调用。如果你需要在 [`InheritedWidget`]({{site.api}}/flutter/widgets/InheritedWidget-class.html) 改变的时候可以重新载入的话，可以把数据调用放在 `didChangeDependencies` 方法中。想了解更多详细内容请查看 [`State`]({{site.api}}/flutter/widgets/State-class.html)。

<!-- skip -->
```dart
class _MyAppState extends State<MyApp> {
  Future<Post> post;

  @override
  void initState() {
    super.initState();
    post = fetchPost();
  }
```

## Testing

## 测试

For information on how to test this functionality,
please see the following recipes:

关于如何测试这个功能，请查看下面的说明：

  * [Introduction to unit testing](/docs/cookbook/testing/unit/introduction)
  * [Mock dependencies using Mockito](/docs/cookbook/testing/unit/mocking)

  * [单元测试介绍](/docs/cookbook/testing/unit/introduction)
  * [使用 Mockito 模拟依赖](/docs/cookbook/testing/unit/mocking)


## Complete example

## 完整示例

```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Post> fetchPost() async {
  final response =
      await http.get('https://jsonplaceholder.typicode.com/posts/1');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return Post.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}

class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({this.userId, this.id, this.title, this.body});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
}

void main() => runApp(MyApp(post: fetchPost()));

class MyApp extends StatelessWidget {
  final Future<Post> post;

  MyApp({Key key, this.post}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fetch Data Example',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Fetch Data Example'),
        ),
        body: Center(
          child: FutureBuilder<Post>(
            future: post,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data.title);
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              // By default, show a loading spinner
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
```
