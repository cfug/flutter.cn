---
title: Mock dependencies using Mockito
title: 使用 Mockito 模拟依赖关系
description: Use the Mockito package to mimic the behavior of services for testing.
description: 使用 Mockito package 在测试中模拟服务端行为。
short-title: Mocking
tags: cookbook, 实用教程, 测试
keywords: 依赖关系测试,Mockito,flaky test
prev:
  title: An introduction to unit testing
  title: 单元测试介绍
  path: /docs/cookbook/testing/unit/introduction
next:
  title: An introduction to widget testing
  title: Widget 测试介绍
  path: /docs/cookbook/testing/widget/introduction
---

<?code-excerpt path-base="cookbook/testing/unit/mocking"?>

Sometimes, unit tests might depend on classes that fetch data from live
web services or databases. This is inconvenient for a few reasons:

某些情况下，单元测试可能会依赖需要从线上 Web 服务或数据库中获取数据的类。
这样会带来一些不便，原因如下： 

  * Calling live services or databases slows down test execution.

    访问线上服务或数据库会拖慢测试执行效率。

  * A passing test might start failing if a web service or database returns
    unexpected results. This is known as a "flaky test."

    原本可以通过的测试可能会失败，
    因为 Web 服务或数据库可能会返回不符合预期的结果。
    这种情况被称作“flaky test”。

  * It is difficult to test all possible success and failure scenarios
    by using a live web service or database.
    
    使用线上 web 服务或数据库来测试很难覆盖全所有可能成功或失败的场景。

Therefore, rather than relying on a live web service or database,
you can "mock" these dependencies. Mocks allow emulating a live
web service or database and return specific results depending
on the situation.

因此，最好不要依赖线上 web 服务或数据库，我们可以把这些依赖“模拟（mock）”出来 。
模拟（Mocks）允许我们仿造一个线上服务或数据库，并且可以根据条件返回特定结果。

Generally speaking, you can mock dependencies by creating an alternative
implementation of a class. Write these alternative implementations by
hand or make use of the [Mockito package][] as a shortcut.

通常来说，可以通过创建类的另一种实现来模拟（mock）这种依赖。
类的另一种实现可以手写，也可以借助 [Mockito 包]({{site.pub-pkg}}/mockito)，
后者简单一些。

This recipe demonstrates the basics of mocking with the
Mockito package using the following steps:

本篇教程介绍了 Mockito 包的基本用法，可以参考以下步骤：

## Directions

## 使用步骤

  1. Add the package dependencies.

     添加 `mockito` 和 `test` 依赖

  2. Create a function to test.

     创建一个要测试的函数

  3. Create a test file with a mock `http.Client`.

     创建一个模拟了 `http.Client` 的测试文件

  4. Write a test for each condition.

     给每一个条件写一个测试

  5. Run the tests.

     执行这些测试

For more information, see the [Mockito package][] documentation.

更多信息可以查阅 [Mockito][Mockito package] package 的官方文档。

## 1. Add the package dependencies

## 1. 添加 package 依赖

To use the `mockito` package, add it to the
`pubspec.yaml` file along with the `flutter_test` dependency in the
`dev_dependencies` section.

为了使用 mockito 包，首先将其和 `flutter_test`
的依赖一起添加到 `pubspec.yaml` 文件的 `dev_dependencies` 部分：

This example also uses the `http` package,
so define that dependency in the `dependencies` section.

本例中还使用了 `http` 包，需要添加到 `dependencies` 部分：

`mockito: 5.0.0` supports Dart's null safety thanks to code generation.
To run the required code generation, add the `build_runner` dependency
in the `dev_dependencies` section.

感谢代码生成，`mockito: 5.0.0` 已经支持了 Dart 的空安全。
要运行所需的代码生成工具，请将 `build_runner` 依赖添加到 `dev_dependencies` 项目下。

```yaml
dependencies:
  http: <newest_version>
dev_dependencies:
  flutter_test:
    sdk: flutter
  mockito: <newest_version>
  build_runner: <newest_version>
```

## 2. Create a function to test

## 2. 创建一个要测试的函数

In this example, unit test the `fetchAlbum` function from the
[Fetch data from the internet][] recipe.
To test this function, make two changes:

本例中，我们要对 [获取网络数据][Fetch data from the internet]
章节的 `fetchAlbum` 函数进行单元测试。
为了便于测试，我们需要做两个改动：

  1. Provide an `http.Client` to the function. This allows providing the
     correct `http.Client` depending on the situation.
     For Flutter and server-side projects, provide an `http.IOClient`.
     For Browser apps, provide an `http.BrowserClient`.
     For tests, provide a mock `http.Client`.
  
     给函数提供一个 `http.Client`。这样的话我们可以在不同情形下提供相应的
     `http.Client` 实例。如果是 Flutter 以及服务端项目，
     可以提供 `http.IOClient `。如果是浏览器应用，
     可以提供 `http.BrowserClient`。为了测试，
     我们要提供一个模拟的 `http.Client`。

  2. Use the provided `client` to fetch data from the internet,
     rather than the static `http.get()` method, which is difficult to mock.

     使用上面提供的 `client` 来请求网络数据，
     不要用 `http.get()` 这个静态方法，因为它比较难以模拟。

The function should now look like this:

函数经过改动之后：

<?code-excerpt "lib/main.dart (fetchAlbum)"?>
```dart
Future<Album> fetchAlbum(http.Client client) async {
  final response =
      await client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}
```

In your app code, you can provide an `http.Client` to the `fetchAlbum` method 
directly with `fetchAlbum(http.Client())`. `http.Client()` creates a default
`http.Client`.

## 3. Create a test file with a mock `http.Client`

## 3. 创建一个模拟了 http.Client 的测试文件

Next, create a test file.
Following the advice in the [Introduction to unit testing][] recipe,
create a file called `fetch_album_test.dart` in the root `test` folder.

接下来，创建一个测试文件。
遵循 [单元测试介绍][Introduction to unit testing] 章节的建议，
我们在根目录下的 `test` 文件夹中创建一个名字为 `fetch_post_test.dart` 的文件。

Add the annotation `@GenerateMocks([http.Client])` to the main
function to generate a `MockClient` class with `mockito`.

在 main 函数上添加一个 `@GenerateMocks([http.Client])` 注解以生成含有 `mockito` 的 `MockClient` 类。

The generated `MockClient` class implements the `http.Client` class.
This allows you to pass the `MockClient` to the `fetchAlbum` function,
and return different http responses in each test.

`MockClient` 类实现了 `http.Client` 类。
如此一来，我们就可以把 `MockClient` 传给 `fetchPost` 函数，
还可以在每个测试中返回不同的 http 请求结果。

The generated mocks will be located in `fetch_album_test.mocks.dart`.
Import this file to use them.

生成的 mock 文件将会放在 `fetch_album_test.mocks.dart`，请导入以使用它。

<?code-excerpt "test/fetch_album_test.dart (mockClient)"?>
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mocking/main.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'fetch_album_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
@GenerateMocks([http.Client])
void main() {
```

Next, generate the mocks running the following command:

```terminal
$ flutter pub run build_runner build
```

## 4. Write a test for each condition

## 4. 给每一个条件写一个测试

The `fetchAlbum()` function does one of two things:

回过头来看，`fetchPost()` 函数会完成下面两件事中的一件：

  1. Returns an `Album` if the http call succeeds

     如果 http 请求成功，返回 `Post`

  2. Throws an `Exception` if the http call fails
      
     如果 http 请求失败，抛出 `Exception`


Therefore, you want to test these two conditions.
Use the `MockClient` class to return an "Ok" response
for the success test, and an error response for the unsuccessful test.

因此，我们要测试这两种条件。可以使用 `MockClient`
类为成功的测试返回一个 "OK" 的请求结果，
为不成功的测试返回一个错误的请求结果。

Test these conditions using the `when()` function provided by
Mockito:

我们使用 Mockito 的 `when()` 函数来达到以上目的：

<?code-excerpt "test/fetch_album_test.dart"?>
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mocking/main.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'fetch_album_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
@GenerateMocks([http.Client])
void main() {
  group('fetchAlbum', () {
    test('returns an Album if the http call completes successfully', () async {
      final client = MockClient();

      // Use Mockito to return a successful response when it calls the
      // provided http.Client.
      when(client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')))
          .thenAnswer((_) async => http.Response('{"userId": 1, "id": 2, "title": "mock"}', 200));

      expect(await fetchAlbum(client), isA<Album>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')))
          .thenAnswer((_) async => http.Response('Not Found', 404));

      expect(fetchAlbum(client), throwsException);
    });
  });
}
```

## 5. Run the tests

### 5. 执行测试

Now that you have a `fetchAlbum()` function with tests in place,
run the tests.

现在我们有了一个带测试的 `fetchAlbum()` 函数，开始执行测试！

```terminal
$ flutter test test/fetch_album_test.dart
```

You can also run tests inside your favorite editor by following the
instructions in the [Introduction to unit testing][] recipe.

你也可以参考
[单元测试介绍][Introduction to unit testing]
章节用自己喜欢的编辑器来执行测试。

## Complete example

## 完整的样例

##### lib/main.dart

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Album> fetchAlbum(http.Client client) async {
  final response =
      await client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body));
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

  Album({required this.userId, required this.id, required this.title});

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
  MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late final Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum(http.Client());
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
                return Text(snapshot.data!.title);
              } else if (snapshot.hasError) {
                return Text('${snapshot.error}');
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

##### test/fetch_album_test.dart

<?code-excerpt "test/fetch_album_test.dart"?>
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mocking/main.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'fetch_album_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
@GenerateMocks([http.Client])
void main() {
  group('fetchAlbum', () {
    test('returns an Album if the http call completes successfully', () async {
      final client = MockClient();

      // Use Mockito to return a successful response when it calls the
      // provided http.Client.
      when(client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')))
          .thenAnswer((_) async => http.Response('{"userId": 1, "id": 2, "title": "mock"}', 200));

      expect(await fetchAlbum(client), isA<Album>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')))
          .thenAnswer((_) async => http.Response('Not Found', 404));

      expect(fetchAlbum(client), throwsException);
    });
  });
}
```

## Summary

### 总结

In this example, you've learned how to use Mockito to test functions or classes
that depend on web services or databases. This is only a short introduction to
the Mockito library and the concept of mocking. For more information,
see the documentation provided by the [Mockito package][].

通过本例，我们已经学会了如何用 Mockito 来测试对
web 服务或数据库有依赖的函数或类。
这里只是简短地介绍了 Mockito 库以及模拟（mocking）的概念。
更多内容请移步至 [Mockito package][]。

[Fetch data from the internet]: /docs/cookbook/networking/fetch-data
[Introduction to unit testing]: /docs/cookbook/testing/unit/introduction
[Mockito package]: {{site.pub-pkg}}/mockito