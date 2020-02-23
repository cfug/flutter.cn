---
title: Fetch data from the internet
title: 获取网络数据
prev:
  title: Send data to a new screen
  title: 传递数据到新页面
  path: /docs/cookbook/navigation/passing-data
next:
  title: Send data to the internet
  title: 发送网络数据
  path: /docs/cookbook/networking/send-data
---

Fetching data from the internet is necessary for most apps.
Luckily, Dart and Flutter provide tools, such as the
`http` package, for this type of work.

对于大部分应用来说，获取网络数据都是必不可少的一个功能。
幸运的是，Dart 和 Flutter 就为我们提供了这样的工具。

This recipe uses the following steps:

这个教程包含以下步骤：

  1. Add the `http` package.

     添加 `http` 包

  2. Make a network request using the `http` package.

     使用 `http` 包进行网络请求

  3. Convert the response into a custom Dart object.

     将返回的响应转换成一个自定义的 Dart 对象

  4. Fetch and display the data with Flutter.

     使用 Flutter 对数据进行获取和展示

## 1. Add the `http` package

## 1. 添加 `http` 包

The [`http`][] package provides the
simplest way to fetch data from the internet.

[`http`][] 包为我们提供了获取网络数据最简单的方法。

To install the `http` package, add it to the dependencies section
of the `pubspec.yaml`. You can find the latest version of the
[http package][] the pub.dev.

安装 `http` 包之前，你必须先把它添加到 `pubspec.yaml` 的依赖区域。
你可以在 [pub.dev 找到 http 包的最新版本][http package]。

```yaml
dependencies:
  http: <latest_version>
```

Import the http package.

<!-- skip -->
```dart
import 'package:http/http.dart' as http;
```

## 2. Make a network request

## 2. 进行网络请求

In this example, fetch a sample album from the
[JSONPlaceholder][] using the [http.get()][] method.

在这里，你可以使用 [http.get()][] 方法从 [JSONPlaceholder][] 上
获取到一个样本相册数据。

<!-- skip -->
```dart
Future<http.Response> fetchAlbum() {
  return http.get('https://jsonplaceholder.typicode.com/albums/1');
}
```

The `http.get()` method returns a `Future` that contains a `Response`.

这个 `http.get()` 方法会返回一个包含 `Response` 的 `Future`。

* [`Future`][] is a core Dart class for working with
  async operations. A Future object represents a potential
  value or error that will be available at some time in the future.
    
  [`Future`][] 是 Dart 用来处理异步操作的一个核心类，
  它通常代表一个可能的值或者将来或许会用到的错误。
    
* The `http.Response` class contains the data received from a successful
  http call.
    
  `http.Response` 类包含成功的 http 请求接收到的数据。


## 3. Convert the response into a custom Dart object

## 3. 将返回的响应转换成一个自定义的 Dart 对象

While it's easy to make a network request, working with a raw
`Future<http.Response>` isn't very convenient. To make your life easier,
convert the `http.Response` into a Dart object.

虽然进行网络请求很容易，但是处理 `Future<http.Response>` 却并不简单，
为了后续处理起来更加方便，我们需要将 `http.Response` 转换成一个 Dart 对象。

### Create a `Album` class

### 创建一个 `Album` 类

First, create a `Album` class that contains the data from the
network request. It includes a factory constructor that
creates a `Album` from JSON.

首先，创建一个包含网络请求返回数据的 `Album` 类，
而且这个类还需要一个可以利用 json 创建 `Album` 的工厂构造器。

Converting JSON by hand is only one option.
For more information, see the full article on
[JSON and serialization][].

手动转换 JSON 是我们目前唯一的选项。想了解更多，
请查看完整的文档 [JSON 和序列化数据][JSON and serialization]。

<!-- skip -->
```dart
class Album {
  final int userId;
  final int id;
  final String title;

  Album({this.userId, this.id, this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
    );
  }
}
```

### Convert the `http.Response` to a `Album`

### 将 `http.Response` 转换成 `Album`

Now, use the following steps to update the `fetchAlbum()`
function to return a `Future<Album>`:

现在，我们需要更新 `fetchPost()` 函数并返回 `Future<Album>`，
为了实现这个目标，我们需要做以下几步：

  1. Convert the response body into a JSON `Map` with the `dart:convert`
     package.

     用 `dart:convert` 包将响应体转换成一个 json `Map`。

  2. If the server does return an OK response with a status code of 200, then convert
     the JSON `Map` into a `Album` using the `fromJson()` factory method.

     如果服务器返回了一个状态码为 200 的 "OK" 响应，
     那么就使用 `fromJson` 工厂方法将 json `Map` 转换成 `Album`。

  3. If the server does not return an OK response with a status code of 200,
     then throw an exception. (Even in the case of a 404 Not Found server response,
     throw an exception. Do not return `null`. This is important when examining
     the data in `snapshot` as shown below.)

     如果服务器返回的不是我们预期的响应（返回一个OK，Http Header 是 200），
     那么就抛出异常。服务器如若返回 404 Not Found 错误，也同样要抛出异常，
     而不是返回一个 `null`，
     在检查如下所示的 `snapshot` 值的时候，这一点相当重要。

<!-- skip -->
```dart
Future<Album> fetchAlbum() async {
  final response = await http.get('https://jsonplaceholder.typicode.com/albums/1');

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response, then parse the JSON.
    return Album.fromJson(json.decode(response.body));
  } else {
    // If the server did not return a 200 OK response, then throw an exception.
    throw Exception('Failed to load album');
  }
}
```

Hooray! Now you've got a function that fetches an album from the
internet.

太棒了！现在你就拥有了一个可以获取网络数据的完整函数啦。

## 4. Fetch the data

## 4. 获取数据

Call the fetch method in either the
[`initState()`][] or [`didChangeDependencies()`][]
methods.

在 [`initState()`][] 或 [`didChangeDependencies()`][] 方法中调用获取数据的方法。

The `initState()` method is called exactly once and then never again.
If you want to have the option of reloading the API in response to an
[`InheritedWidget`][] changing, put the call into the
`didChangeDependencies()` method. See [`State`][] for more details.  

`initState()` 方法仅会被调用一次。如果你想要响应 [`InheritedWidget`][] 改变
以重新加载 API 的话，请在 `didChangeDependencies()` 方法中进行调用。
你可以在 [`State`][] 文档里了解更多。

<!-- skip -->
```dart
class _MyAppState extends State<MyApp> {
  Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }
```

This Future will be used in the next step.

我们将会在下一步中使用这个 Future。

## 5. Display the data

## 5. 显示数据

To display the data on screen, use the
[`FutureBuilder`][] widget.
The `FutureBuilder` widget comes with Flutter and
makes it easy to work with async data sources.

为了能够获取数据并在屏幕上展示它，你可以使用 [`FutureBuilder`][] widget。
这个由 Flutter 提供的 `FutureBuilder` 组件可以让处理异步数据源变的非常简单。

You must provide two parameters:

此时，你必须要提供两个参数：

  1. The `Future` you want to work with. In this case, the future returned from
  the `fetchAlbum()` function.

     你想要处理的 `Future`，在这个例子中就是 `fetchAlbum()` 返回的 future。

  2. A `builder` function that tells Flutter what to render, depending on the
  state of the `Future`: loading, success, or error.

     一个告诉 Flutter 渲染哪些内容的 `builder` 函数，
     同时这也依赖于 `Future` 的状态：loading、success 或者是 error。
     
Note that `snapshot.hasData` will only return `true` when the snapshot contains
a non-null data value. This is why the `fetchAlbum` function should throw an exception
even in the case of a 404 Not Found server response. If `fetchAlbum` returns `null`
then the spinner will show indefinitely.

需要注意的是：当快照包含非空数据值，`snapshot.hasData` 将只返回 `true`，
这就是为什么要在服务端返回 404 状态码的时候要让 `fetchAlbum` 方法抛出异常。
如果 `fetchAlbum` 返回 `null` 的话，spinner 会显示不正常。

<!-- skip -->
```dart
FutureBuilder<Album>(
  future: futureAlbum,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data.title);
    } else if (snapshot.hasError) {
      return Text("${snapshot.error}");
    }

    // By default, show a loading spinner.
    return CircularProgressIndicator();
  },
);
```

## Why is fetchAlbum() called in initState()?

## 为何要在 initState() 中调用 fetchPost()？

Although it's convenient, it's not recommended to put an API call in a
`build()` method.

虽然这样会比较方便，但是我们仍然不推荐将 API 调用置于 `build()` 方法内部。

Flutter calls the `build()` method every time it wants to change anything
in the view, and this happens surprisingly often. If you leave the fetch
call in your `build()` method, you'll flood the API with unnecessary calls
and slow down your app.

每当 Flutter 需要改变视图中的一些内容时（这个发生的频率非常高），
就会调用 `build()` 方法。因此，如果你将数据请求置于 `build()` 内部，
就会造成大量的无效调用，同时还会拖慢应用程序的速度。

Here are some better options so it only hits the API when the page is
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

### 在 `StatefulWidget` 状态的生命周期中调用

If your widget is stateful, call the fetch method in either the
[`initState()`][] or [`didChangeDependencies()`][] methods.

如果你的组件是有状态的，你可以在
[`initState()`][] 或者 [`didChangeDependencies()`][] 方法中调用 fetch 方法。

The `initState()` method is called exactly once and then never again.
If you want to have the option of reloading the API in response to an
[`InheritedWidget`][] changing, put the call into the 
`didChangeDependencies()` method. See [`State`][] for more details.

`initState()` 只会被调用一次而且再也不会被调用。
如果你需要在 [`InheritedWidget`][] 改变的时候可以重新载入的话，
可以把数据调用放在 `didChangeDependencies()` 方法中。
想了解更多详细内容请查看 [`State`][] 文档。

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
see the following recipes:

关于如何测试这个功能，请查看下面的说明：

  * [Introduction to unit testing][]
  
    [单元测试介绍][Introduction to unit testing]
    
  * [Mock dependencies using Mockito][]
 
    [使用 Mockito 模拟依赖][Mock dependencies using Mockito]


## Complete example

## 完整样例

```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Album> fetchAlbum() async {
  final response =
      await http.get('https://jsonplaceholder.typicode.com/albums/1');

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response, then parse the JSON.
    return Album.fromJson(json.decode(response.body));
  } else {
    // If the server did not return a 200 OK response, then throw an exception.
    throw Exception('Failed to load album');
  }
}

class Album {
  final int userId;
  final int id;
  final String title;

  Album({this.userId, this.id, this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
    );
  }
}

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }

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
          child: FutureBuilder<Album>(
            future: futureAlbum,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data.title);
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              // By default, show a loading spinner.
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
```


[`didChangeDependencies()`]: {{site.api}}/flutter/widgets/State/didChangeDependencies.html
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[JSONPlaceholder]: https://jsonplaceholder.typicode.com/
[`http`]: {{site.pub-pkg}}/http
[http.get()]: {{site.pub-api}}/http/latest/http/get.html
[http package]: {{site.pub}}/packages/http#-installing-tab-
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Introduction to unit testing]: /docs/cookbook/testing/unit/introduction
[`initState()`]: {{site.api}}/flutter/widgets/State/initState.html
[Mock dependencies using Mockito]: /docs/cookbook/testing/unit/mocking
[JSON and serialization]: /docs/development/data-and-backend/json
[`State`]: {{site.api}}/flutter/widgets/State-class.html

