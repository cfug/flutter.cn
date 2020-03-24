---
title: Work with WebSockets
title: 发起 WebSockets 请求
description: How to connect to a web socket.
description: 如何建立 web socket 连接。
prev:
  title: Parse JSON in the background
  title: 在后台处理 JSON 数据解析
  path: /docs/cookbook/networking/background-parsing
next:
  title: Persist data with SQLite
  title: 用 SQLite 做数据持久化
  path: /docs/cookbook/persistence/sqlite
---

In addition to normal HTTP requests,
you can connect to servers using `WebSockets`.
`WebSockets` allow for two-way communication with a server
without polling.

除了普通的 HTTP 请求，你还可以通过 `WebSockets` 来连接服务器，
`WebSockets` 可以以非轮询的方式与服务器进行双向通信。

In this example, connect to a
[test server provided by websocket.org][].
The server sends back the same message you send to it.

在这里，你可以连接一个 
[由 websocket.org 提供的测试服务器][test server provided by websocket.org]。
该服务器只会返回你发送的信息。

This recipe uses the following steps:

这个教程里包含以下步骤：

  1. Connect to a WebSocket server.

     连接 WebSocket 服务器

  2. Listen for messages from the server.

     监听来自服务器的消息

  3. Send data to the server.

     向服务器发送数据
  
  4. Close the WebSocket connection.

     关闭 WebSocket 连接

## 1. Connect to a WebSocket server

## 1. 连接 WebSocket 服务器

The [`web_socket_channel`][] package provides the
tools you need to connect to a WebSocket server.

[`web_socket_channel`][] 这个 package 提供了
连接 WebSocket 服务器所需的一些工具。

The package provides a `WebSocketChannel`
that allows you to both listen for messages
from the server and push messages to the server.

该包提供的 `WebSocketChannel` 不仅可以让你监听到来自服务器的消息
还可以让你向服务器推送消息。

In Flutter, use the following line to
create a `WebSocketChannel` that connects to a server:

在 Flutter 中，只用一行代码就可以创建一个连接到服务器的 `WebSocketChannel`。

<!-- skip -->
```dart
final channel = IOWebSocketChannel.connect('ws://echo.websocket.org');
```

## 2. Listen for messages from the server

## 2. 监听来自服务器的消息

Now that you've established a connection,
listen to messages from the server.

建立了连接之后，你就可以监听来自服务器的消息了。

After sending a message to the test server,
it sends the same message back.

当你向测试服务器发送一条消息之后，它会将同样的消息发送回来。

In this example, use a [`StreamBuilder`][]
widget to listen for new messages, and a
[`Text`][] widget to display them.

在这个例子中，我们用 [`StreamBuilder`][] 组件来监听新消息，
并使用 [`Text`][] 组件来展示它们。

<!-- skip -->
```dart
StreamBuilder(
  stream: widget.channel.stream,
  builder: (context, snapshot) {
    return Text(snapshot.hasData ? '${snapshot.data}' : '');
  },
);
```

### How this works

### 这样为什么可行？

The `WebSocketChannel` provides a
[`Stream`][] of messages from the server.

`WebSocketChannel` 提供了一个来自服务器的 [`Stream`][] 类消息。

The `Stream` class is a fundamental part of the `dart:async` package.
It provides a way to listen to async events from a data source.
Unlike `Future`, which returns a single async response,
the `Stream` class can deliver many events over time.

这个 `Stream` 类是 `dart:async` 包的基本组成部分，
它提供了一个从数据源监听异步事件的方法。
和 `Future` 不一样的是，`Future` 只能返回一个单独的异步响应，
而 `Stream` 类可以随着时间的推移传递很多事件。

The [`StreamBuilder`][] widget connects to a `Stream`
and asks Flutter to rebuild every time it
receives an event using the given `builder()` function.

[`StreamBuilder`][] widget 会和 `Stream` 建立起连接，
并且每当它接收到一个使用给定 `builder()` 函数的事件时，
就会通知 Flutter 去 rebuild。

## 3. Send data to the server

## 3. 向服务器发送数据

To send data to the server,
`add()` messages to the `sink` provided
by the `WebSocketChannel`.

要向服务器发送数据，
可以使用 `WebSocketChannel` 提供的 `sink` 下的 `add()` 方法来发送信息。

<!-- skip -->
```dart
channel.sink.add('Hello!');
```

### How this works

### 这又是如何工作的呢

The `WebSocketChannel` provides a
[`StreamSink`][] to push messages to the server.

`WebSocketChannel` 提供了一个 [`StreamSink`][] 来向服务器推送消息。

The `StreamSink` class provides a general way to add sync or async
events to a data source.

这个 `StreamSink` 类提供了一个可以向数据源添加同步或者异步事件的通用方法。

## 4. Close the WebSocket connection

## 4. 关闭 WebSocket 连接

After you're done using the WebSocket, close the connection:
To do so, close the `sink`.

当你使用完 WebSocket 之后，记得关闭这个连接。
要关闭这个 WebSocket 连接，只需要关闭 `sink`。

<!-- skip -->
```dart
channel.sink.close();
```

## Complete example

## 完整样例

```dart
import 'package:flutter/foundation.dart';
import 'package:web_socket_channel/io.dart';
import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'WebSocket Demo';
    return MaterialApp(
      title: title,
      home: MyHomePage(
        title: title,
        channel: IOWebSocketChannel.connect('ws://echo.websocket.org'),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  final String title;
  final WebSocketChannel channel;

  MyHomePage({Key key, @required this.title, @required this.channel})
      : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Form(
              child: TextFormField(
                controller: _controller,
                decoration: InputDecoration(labelText: 'Send a message'),
              ),
            ),
            StreamBuilder(
              stream: widget.channel.stream,
              builder: (context, snapshot) {
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 24.0),
                  child: Text(snapshot.hasData ? '${snapshot.data}' : ''),
                );
              },
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _sendMessage,
        tooltip: 'Send message',
        child: Icon(Icons.send),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      widget.channel.sink.add(_controller.text);
    }
  }

  @override
  void dispose() {
    widget.channel.sink.close();
    super.dispose();
  }
}
```
![Web sockets demo](/images/cookbook/web-sockets.gif){:.site-mobile-screenshot}


[`Stream`]: {{site.api}}/flutter/dart-async/Stream-class.html
[`StreamBuilder`]: {{site.api}}/flutter/widgets/StreamBuilder-class.html
[`StreamSink`]: {{site.api}}/flutter/dart-async/StreamSink-class.html
[test server provided by websocket.org]: http://www.websocket.org/echo.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[web_socket_channel]: {{site.pub-pkg}}/web_socket_channel
