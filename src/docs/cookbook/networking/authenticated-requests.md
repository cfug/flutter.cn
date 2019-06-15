---
title: Make authenticated requests
title: 发起 HTTP 认证授权请求
prev:
  title: Fetch data from the internet
  title: 获取网络数据
  path: /docs/cookbook/networking/fetch-data
next:
  title: Parse JSON in the background
  title: 在后台处理 JSON 数据解析
  path: /docs/cookbook/networking/background-parsing
---

To fetch data from many web services, you need to provide
authorization. There are many ways to do this, but perhaps the most common
uses the `Authorization` HTTP header.

为了从众多的网络服务中获取数据，你需要提供相应的授权认证信息。当然了，解决这一问题的方法有很多，而最常见的方法或许就是使用 `Authorization` HTTP header 了。

## Add authorization headers

## 添加 Authorization Headers

The [`http`]({{site.pub-pkg}}/http) package provides a
convenient way to add headers to your requests.
Alternatively, use the
[HttpHeaders]({{site.dart.api}}/stable/dart-io/HttpHeaders-class.html)
class from the `dart:io` library.

[`http`]({{site.pub-pkg}}/http) 这个 package 提供了相当实用的方法来向请求中添加 headers，你也可以使用 `dart:io` 来使用一些常见的 `HttpHeaders`。

<!-- skip -->
```dart
Future<http.Response> fetchPost() {
  return http.get(
    'https://jsonplaceholder.typicode.com/posts/1',
    // Send authorization headers to the backend.
    headers: {HttpHeaders.authorizationHeader: "Basic your_api_token_here"},
  );
}
```

## Complete example

## 完整样例

This example builds upon the [Fetching data from the
internet](/docs/cookbook/networking/fetch-data) recipe.

下面的例子是基于 [获取网络数据](/docs/cookbook/networking/fetch-data/) 中的方法编写的。

```dart
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

Future<Post> fetchPost() async {
  final response = await http.get(
    'https://jsonplaceholder.typicode.com/posts/1',
    headers: {HttpHeaders.authorizationHeader: "Basic your_api_token_here"},
  );
  final responseJson = json.decode(response.body);

  return Post.fromJson(responseJson);
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
```
