---
# title: Networking and data
title: Networking and data
# description: Learn how to network your Flutter app.
description: Learn how to network your Flutter app.
prev:
  title: Handling user input
  path: /get-started/fundamentals/user-input
next:
  title: Local data and caching
  path: /get-started/fundamentals/local-caching
---

While it's said that "no man is an island",
a Flutter app without any networking capability
can feel a tad disconnected.
This page covers how to add networking features
to your Flutter app. Your app will retrieve data,
parse JSON into usable in memory representations,
and then send data out again.



俗话说「没有人是一座孤岛」，
一个没有任何网络功能的 Flutter 应用可能会让人感觉有些孤立。
本页介绍如何为你的 Flutter 应用添加网络功能。
你的应用将检索数据，将 JSON 解析为可用的内存表示，然后再次发送数据。

## Introduction to retrieving data over the network



## 通过网络检索数据简介

At it's simplest, assuming you utilize the [`http`][]
package to adapt to the differences between network access
from Dart VM based platforms and web browser-based environments,
making a HTTP `GET` request can be as simple as the following:



最简单的情况下，假设你使用 [`http`][] 包来适应基于 Dart VM 的平台
和基于 Web 浏览器的环境之间网络访问的差异，
发起 HTTP `GET` 请求可以像下面这样简单：

```dart
import 'package:http/http.dart' as http;

void main() async {
  var response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  );
  print(response.body);
}
```



以下两个教程向你展示了将 [`http`][] 包添加到应用中的所有细节，
无论你是在 Android、iOS、Web 浏览器中运行，
还是在 Windows、macOS 或 Linux 上原生运行。
第一个教程向你展示如何向网站发起未经身份验证的 `GET` 请求，
将检索到的数据解析为 `JSON`，然后显示结果数据。
第二个教程在第一个的基础上添加身份验证头，
从而能够访问需要授权的 Web 服务器。
Mozilla 开发者网络 (MDN) 的文章提供了更多关于 Web 授权工作原理的背景知识。

The following two tutorials show you all of the details
involved in adding the [`http`][] package to your app,
whether you are running on Android,
iOS, inside a web browser, or natively on Windows,
macOS, or Linux.
The first tutorial shows you how to make an
unauthenticated `GET` request to a website,
parse the retrieved data as `JSON` and then
display the resulting data. The second tutorial
builds on the first by adding authentication headers,
enabling access to web servers requiring authorization.
The article by the Mozilla Developer Network (MDN)
gives more background on how authorization works on the web.



* 教程：[从网络获取数据][Fetch data from the internet]
* 教程：[发起经过身份验证的请求][Make authenticated requests]
* 文章：[MDN 关于网站授权的文章][MDN's article on Authorization for websites]

* Tutorial: [Fetch data from the internet][]
* Tutorial: [Make authenticated requests][]
* Article: [MDN's article on Authorization for websites][]



## 使从网络检索的数据变得有用

## Making data retrieved from the network useful



一旦你从网络检索到数据，你需要一种方法将网络数据转换为
你可以在 Dart 中轻松使用的内容。
上一节中的教程使用手动编写的 Dart 代码将网络数据转换为内存表示。
在本节中，你将看到处理此转换的其他选项。
第一个链接到一个 YouTube 视频，展示了 [`freezed` 包][`freezed` package]的概述。
第二个链接到一个 codelab，该 codelab 通过解析 JSON 的案例研究来介绍模式和记录。

Once you retrieve data from the network,
you need a way to convert the data from the network
into something that you can easily work with in Dart.
The tutorials in the previous section used hand rolled Dart
to convert network data into an in-memory representation.
In this section,
you'll see other options for handling this conversion.
The first links to a YouTube video showing an overview
of the [`freezed` package][].
The second links to a codelab that covers patterns
and records using a case study of parsing JSON.



* YouTube 视频：[Freezed（每周包）][Freezed (Package of the Week)]
* Codelab：[深入了解 Dart 的模式和记录][Dive into Dart's patterns and records]

* YouTube video: [Freezed (Package of the Week)][]
* Codelab: [Dive into Dart's patterns and records][]



## 双向传输，再次发送数据

## Going both ways, getting data out again



既然你已经掌握了检索数据的技巧，现在是时候看看如何发送数据了。
这些信息从向网络发送数据开始，然后深入异步性。
事实是，一旦你在网络上进行对话，
你就需要处理一个事实：物理距离较远的 Web 服务器可能需要一段时间才能响应，
而你不能在等待数据包往返时停止向屏幕渲染。
Dart 对异步性有很好的支持，Flutter 也是如此。
你将在一个教程中学习所有关于 Dart 支持的内容，
然后在「每周 Widget」视频中看到 Flutter 的功能介绍。
完成后，你将学习如何使用 DevTools 的网络视图来调试网络流量。

Now that you've mastered the art of retrieving data,
it's time to look at pushing data out.
This information starts with sending data to the network,
but then dives into asynchronicity. The truth is,
once you are in a conversation over the network,
you'll need to deal with the fact that web servers
that are physically far away can take a while to respond,
and you can't stop rendering to the screen
while you wait for packets to round trip.
Dart has great support for asynchronicity,
as does Flutter.
You'll learn all about Dart's support in a tutorial,
then see Flutter's capability covered in a
Widget of the Week video.
Once you complete that, you'll learn how to debug
network traffic using DevTool's Network View.



* 教程：[向网络发送数据][Send data to the internet]
* 教程：[异步编程：futures、async、await][Asynchronous programming: futures, async, await]
* YouTube 视频：[FutureBuilder（每周 Widget）][FutureBuilder (Widget of the Week)]
* 文章：[使用网络视图][Using the Network View]

* Tutorial: [Send data to the internet][]
* Tutorial: [Asynchronous programming: futures, async, await][]
* YouTube video: [FutureBuilder (Widget of the Week)][]
* Article: [Using the Network View][]



## 扩展材料

## Extension material



既然你已经掌握了使用 Flutter 的网络 API，
那么在上下文中查看 Flutter 的网络使用会很有帮助。
第一个 codelab（表面上是关于在 Flutter 中创建自适应应用的），
使用 Dart 编写的 Web 服务器来解决 Web 浏览器的
[跨源资源共享 (CORS) 限制][Cross-Origin Resource Sharing (CORS) restrictions]。

Now that you've mastered using Flutter's networking APIs,
it helps to see Flutter's network usage in context.
The first codelab (ostensibly on creating Adaptive apps in Flutter),
uses a web server written in Dart to work around the web browsers'
[Cross-Origin Resource Sharing (CORS) restrictions][].



接下来是一个长视频，Flutter DevRel 校友 Fitz
讨论了数据位置对 Flutter 应用的重要性。
最后是 Flutter GDE Anna (Domashych) Leushchenko
撰写的一系列非常有用的文章，涵盖了 Flutter 中的高级网络。

:::note
If you've already worked through this codelab
on the [layout][] page, feel free to skip this step.
:::

[layout]: /get-started/fundamentals/layout

Next, a long-form YouTube video where
Flutter DevRel alumnus, Fitz,
talks about how the location of data matters for Flutter apps.
Finally, a really useful series of articles by Flutter GDE
Anna (Domashych) Leushchenko covering advanced networking in Flutter.



* Codelab：[Flutter 中的自适应应用][Adaptive apps in Flutter]
* 视频：[保持本地：管理 Flutter 应用的数据][Keeping it local: Managing a Flutter app's data]
* 文章系列：[Dart 和 Flutter 中的基础和高级网络][Basic and advanced networking in Dart and Flutter]

* Codelab: [Adaptive apps in Flutter][]
* Video: [Keeping it local: Managing a Flutter app's data][]
* Article series: [Basic and advanced networking in Dart and Flutter][]



## 反馈

[Adaptive apps in Flutter]: {{site.codelabs}}/codelabs/flutter-adaptive-app
[Asynchronous programming: futures, async, await]: {{site.dart-site}}/codelabs/async-await
[Basic and advanced networking in Dart and Flutter]: {{site.medium}}/tide-engineering-team/basic-and-advanced-networking-in-dart-and-flutter-the-tide-way-part-0-introduction-33ac040a4a1c
[Cross-Origin Resource Sharing (CORS) restrictions]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[Dive into Dart's patterns and records]: {{site.codelabs}}/codelabs/dart-patterns-records
[Fetch data from the internet]: /cookbook/networking/fetch-data
[Freezed (Package of the Week)]: {{site.youtube-site}}/watch?v=RaThk0fiphA
[`freezed` package]: {{site.pub-pkg}}/freezed
[FutureBuilder (Widget of the Week)]: {{site.youtube-site}}/watch?v=zEdw_1B7JHY
[`http`]: {{site.pub-pkg}}/http
[HTTP]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
[Keeping it local: Managing a Flutter app's data]: {{site.youtube-site}}/watch?v=uCbHxLA9t9E
[Make authenticated requests]: /cookbook/networking/authenticated-requests
[MDN's article on Authorization for websites]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
[Using the Network View]: /tools/devtools/network
[Send data to the internet]: /cookbook/networking/send-data

## Feedback



由于本网站的此部分正在不断发展，
我们[欢迎你的反馈][welcome your feedback]！

As this section of the website is evolving,
we [welcome your feedback][]!

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="networking"
