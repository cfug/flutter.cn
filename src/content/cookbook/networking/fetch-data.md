---
# title: Fetch data from the internet
title: 获取网络数据
# description: How to fetch data over the internet using the http package.
description: 如何使用 http package 获取网络数据。
---

<?code-excerpt path-base="cookbook/networking/fetch_data/"?>

Fetching data from the internet is necessary for most apps.
Luckily, Dart and Flutter provide tools, such as the
`http` package, for this type of work.

对于大部分应用来说，获取网络数据都是必不可少的一个功能。
幸运的是，Dart 和 Flutter 就为我们提供了这样的工具。

:::note

You should avoid directly using `dart:io` or `dart:html`
to make HTTP requests.
Those libraries are platform-dependent
and tied to a single implementation.

你需要避免直接使用 `dart:io` 或 `dart:html` 
来进行 HTTP 请求。
这些库依赖于平台并绑定单个实现。

:::

This recipe uses the following steps:

这个教程包含以下步骤：

  1. Add the `http` package.

     添加 `http` package。

  2. Make a network request using the `http` package.

     使用 `http` package 进行网络请求。

  3. Convert the response into a custom Dart object.

     将返回的响应转换成一个自定义的 Dart 对象。

  4. Fetch and display the data with Flutter.

     使用 Flutter 对数据进行获取和展示。

## 1. Add the `http` package

## 1. 添加 `http` package

The [`http`][] package provides the
simplest way to fetch data from the internet.

[`http`][] package 为我们提供了
获取网络数据最简单的方法。

To add the `http` package as a dependency,
run `flutter pub add`:

要将 `http` package 添加到依赖中，
运行 `flutter pub add` 命令：

```console
$ flutter pub add http
```

Import the http package.

导入 http package。

<?code-excerpt "lib/main.dart (Http)"?>
```dart
import 'package:http/http.dart' as http;
```

If you are deploying to Android, edit your `AndroidManifest.xml` file to 
add the Internet permission.

如果你要部署 Android，
请编辑 `AndroidManifest.xml` 文件，
添加 Internet 权限。

```xml
<!-- Required to fetch data from the internet. -->
<uses-permission android:name="android.permission.INTERNET" />
```

Likewise, if you are deploying to macOS, edit your 
`macos/Runner/DebugProfile.entitlements` and `macos/Runner/Release.entitlements`
files to include the network client entitlement.

同样，如果你要部署 macOS，
请编辑 `macos/Runner/DebugProfile.entitlements` 和 
`macos/Runner/Release.entitlements` 文件，
添加 network client 权限。

```xml
<!-- Required to fetch data from the internet. -->
<key>com.apple.security.network.client</key>
<true/>
```

## 2. Make a network request

## 2. 进行网络请求

This recipe covers how to fetch a sample album from the
[JSONPlaceholder][] using the [`http.get()`][] method.

在这里，你可以使用 [`http.get()`][] 方法
从 [JSONPlaceholder][] 上获取到一个样本相册数据。

<?code-excerpt "lib/main_step1.dart (fetchAlbum)"?>
```dart
Future<http.Response> fetchAlbum() {
  return http.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));
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
`Future<http.Response>` isn't very convenient.
To make your life easier,
convert the `http.Response` into a Dart object.

虽然进行网络请求很容易，但是处理 `Future<http.Response>` 却并不简单，
为了后续处理起来更加方便，我们需要将 `http.Response` 转换成一个 Dart 对象。

### Create an `Album` class

### 创建一个 `Album` 类

First, create an `Album` class that contains the data from the
network request. It includes a factory constructor that
creates an `Album` from JSON.

首先，创建一个包含网络请求返回数据的 `Album` 类，
而且这个类还需要一个可以利用 json 创建 `Album` 的工厂构造器。

Converting JSON using [pattern matching][] is only one option.
For more information, see the full article on
[JSON and serialization][].

使用 [模式匹配][pattern matching] 转换 JSON 只是其中一种方式。
想了解更多，请查看完整的文档：[JSON 和序列化数据][JSON and serialization]。

<?code-excerpt "lib/main.dart (Album)"?>
```dart
class Album {
  final int userId;
  final int id;
  final String title;

  const Album({
    required this.userId,
    required this.id,
    required this.title,
  });

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'userId': int userId,
        'id': int id,
        'title': String title,
      } =>
        Album(
          userId: userId,
          id: id,
          title: title,
        ),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}
```

### Convert the `http.Response` to an `Album`

### 将 `http.Response` 转换成 `Album`

Now, use the following steps to update the `fetchAlbum()`
function to return a `Future<Album>`:

现在，我们需要更新 `fetchPost()` 函数并返回 `Future<Album>`，
为了实现这个目标，我们需要做以下几步：

  1. Convert the response body into a JSON `Map` with
     the `dart:convert` package.

     用 `dart:convert` package 将响应体转换成一个 json `Map`。

  2. If the server does return an OK response with a status code of
     200, then convert the JSON `Map` into an `Album`
     using the `fromJson()` factory method.

     如果服务器返回了一个状态码为 200 的 "OK" 响应，
     那么就使用 `fromJson` 工厂方法将 json `Map` 转换成 `Album`。

  3. If the server does not return an OK response with a status code of 200,
     then throw an exception.
     (Even in the case of a "404 Not Found" server response,
     throw an exception. Do not return `null`.
     This is important when examining
     the data in `snapshot`, as shown below.)

     如果服务器返回的不是我们预期的响应（返回一个OK，Http Header 是 200），
     那么就抛出异常。服务器如若返回 404 Not Found 错误，也同样要抛出异常，
     而不是返回一个 `null`，
     在检查如下所示的 `snapshot` 值的时候，这一点相当重要。

<?code-excerpt "lib/main.dart (fetchAlbum)"?>
```dart
Future<Album> fetchAlbum() async {
  final response = await http
      .get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));

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

Hooray!
Now you've got a function that fetches an album from the internet.

太棒了！现在你就拥有了一个可以获取网络数据的完整函数啦。

## 4. Fetch the data

## 4. 获取数据

Call the `fetchAlbum()` method in either the
[`initState()`][] or [`didChangeDependencies()`][]
methods.

在 [`initState()`][] 或 [`didChangeDependencies()`][]
方法中调用获取数据的方法 `fetch()`。

The `initState()` method is called exactly once and then never again.
If you want to have the option of reloading the API in response to an
[`InheritedWidget`][] changing, put the call into the
`didChangeDependencies()` method.
See [`State`][] for more details.

`initState()` 方法仅会被调用一次。
如果你想要响应 [`InheritedWidget`][] 改变以重新加载 API 的话，
请在 `didChangeDependencies()` 方法中进行调用，
你可以在 [`State`][] 文档里了解更多。

<?code-excerpt "lib/main.dart (State)"?>
```dart
class _MyAppState extends State<MyApp> {
  late Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }
  // ···
}
```

This Future is used in the next step.

我们将会在下一步中使用这个 Future。

## 5. Display the data

## 5. 显示数据

To display the data on screen, use the
[`FutureBuilder`][] widget.
The `FutureBuilder` widget comes with Flutter and
makes it easy to work with asynchronous data sources.

为了能够获取数据并在屏幕上展示它，你可以使用 [`FutureBuilder`][] widget。
这个由 Flutter 提供的 `FutureBuilder` 组件可以让处理异步数据源变的非常简单。

You must provide two parameters:

此时，你必须要提供两个参数：

  1. The `Future` you want to work with.
     In this case, the future returned from
     the `fetchAlbum()` function.

     你想要处理的 `Future`，在这个例子中就是 `fetchAlbum()` 返回的 future。

  2. A `builder` function that tells Flutter
     what to render, depending on the
     state of the `Future`: loading, success, or error.

     一个告诉 Flutter 渲染哪些内容的 `builder` 函数，
     同时这也依赖于 `Future` 的状态：loading、success 或者是 error。
     
Note that `snapshot.hasData` only returns `true`
when the snapshot contains a non-null data value.

需要注意的是：当快照包含非空数据值，
`snapshot.hasData` 将只返回 `true`。

Because `fetchAlbum` can only return non-null values,
the function should throw an exception
even in the case of a "404 Not Found" server response.
Throwing an exception sets the `snapshot.hasError` to `true`
which can be used to display an error message.

因为 `fetchAlbum` 只能返回非空值，在服务器响应
"404 Not Found" 的时候应该引发异常抛出。
发生异常的时候会将 `snapshot.hasError` 设定为 `true`，
用来显示错误消息。

Otherwise, the spinner will be displayed.

其他情况下，spinner 就会正常显示。

<?code-excerpt "lib/main.dart (FutureBuilder)" replace="/^child: //g;/^\),$/)/g"?>
```dart
FutureBuilder<Album>(
  future: futureAlbum,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data!.title);
    } else if (snapshot.hasError) {
      return Text('${snapshot.error}');
    }

    // By default, show a loading spinner.
    return const CircularProgressIndicator();
  },
)
```

## Why is fetchAlbum() called in initState()?

## 为何要在 initState() 中调用 fetchPost()？

Although it's convenient,
it's not recommended to put an API call in a `build()` method.

虽然这样会比较方便，但是我们仍然不推荐将 API 调用置于 `build()` 方法内部。

Flutter calls the `build()` method every time it needs
to change anything in the view,
and this happens surprisingly often.
The `fetchAlbum()` method, if placed inside `build()`, is repeatedly 
called on each rebuild causing the app to slow down.

每当 Flutter 需要更改视图中的任何内容时（并且这种更改出现的频率非常高），
就会调用 `build()` 方法。因此，如果你将 `fetchAlbum()` 方法放在 `build()` 内，
该方法会在每次重建应用时重复调用，同时还会拖慢应用程序的速度。

Storing the `fetchAlbum()` result in a state variable ensures that
the `Future` is executed only once and then cached for subsequent
rebuilds.

将 `fetchAlbum()` 的结果存储在状态变量中，
可确保 `Future` 只执行一次，
然后缓存(得到的数据)以备后续重新构建应用。

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

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Album> fetchAlbum() async {
  final response = await http
      .get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));

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

class Album {
  final int userId;
  final int id;
  final String title;

  const Album({
    required this.userId,
    required this.id,
    required this.title,
  });

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'userId': int userId,
        'id': int id,
        'title': String title,
      } =>
        Album(
          userId: userId,
          id: id,
          title: title,
        ),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Future<Album> futureAlbum;

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
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Fetch Data Example'),
        ),
        body: Center(
          child: FutureBuilder<Album>(
            future: futureAlbum,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data!.title);
              } else if (snapshot.hasError) {
                return Text('${snapshot.error}');
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


[`didChangeDependencies()`]: {{site.api}}/flutter/widgets/State/didChangeDependencies.html
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[JSONPlaceholder]: https://jsonplaceholder.typicode.com/
[`http`]: {{site.pub-pkg}}/http
[`http.get()`]: {{site.pub-api}}/http/latest/http/get.html
[`http` package]: {{site.pub-pkg}}/http/install
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Introduction to unit testing]: /cookbook/testing/unit/introduction
[`initState()`]: {{site.api}}/flutter/widgets/State/initState.html
[Mock dependencies using Mockito]: /cookbook/testing/unit/mocking
[JSON and serialization]: /data-and-backend/serialization/json
[pattern matching]: {{site.dart-site}}/language/patterns
[`State`]: {{site.api}}/flutter/widgets/State-class.html
