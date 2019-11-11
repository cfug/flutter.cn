---
title: Install and run DevTools from the command line
title: 通过命令行安装和运行开发者工具
Description: Learn how to install and use DevTools from the command line.
Description: 学习如何通过命令行工具安装和使用开发者工具。
---

## Install DevTools

## 安装开发者工具

If you have `pub` on your path, you can run:

如果在你的环境变量 `PATH` 中有 `pub`, 可以运行：

```
pub global activate devtools
```

If you have `flutter` on your path, you can run:

如果环境变量 `PATH` 中有 `flutter` , 可以运行：

```
flutter pub global activate devtools
```

That command installs (or updates) DevTools on your machine.

这个命令会在你的机器上安装（或升级）开发者工具。

## Launch the DevTools application server

## 启动开发者工具服务

Next, run the local web server, which serves the DevTools
application itself. To do that, run one of the following
two commands:

下一步，启动本地 web server 服务来运行开发者工具。
运行下面两个命令中的一个。

```
pub global run devtools   # If you have `pub` on your path.
```

OR

或者

```
flutter pub global run devtools   # If you have `flutter` on your path.
```

On the command line, you should see output that looks something like:

```
Serving DevTools at http://127.0.0.1.9100
```

## Start an application to debug

## 启动一个 app 来 debug

Next, start an app to connect to. This can be either a Flutter application
or a Dart command-line application. The command below uses a Flutter app:

下一步，启动并连接一个 app。可以是 Flutter app 或者一个 Dart 命令行应用。
下面这个命令是启动一个 Flutter app:

```
cd path/to/flutter/app
flutter run
```

You need to have a device connected, or a simulator open, for
`flutter run` to work. Once the app starts, you'll see a
message in your terminal that looks like:

运行 `flutter run` 时，你需要连接一个设备或者模拟器。
当 app 启动后，你会在命令行中看到：


```
An Observatory debugger and profiler on iPhone X is available
at: http://127.0.0.1:50976/Swm0bjIe0ks=/
```

Keep note this URL, as you will use it to connect your app to
DevTools.

记下这个 URL ，你将会使用它来连接 app 和开发者工具。

## Open DevTools and connect to the target app

## 打开开发者工具并且连接到目标 app

Once it's set up, using DevTools is as simple as opening a 
Chrome browser window and navigating to `http://localhost:9100`.

上述完成后，使用开发者工具就会很简单，
只需打开 chrome 并访问 `http://localhost:9100` 。

Once DevTools opens, you should see a connect dialog:

当这个网页打开后，你会看到一个链接对话框：

![Screenshot of a logging view]({% asset tools/devtools/connect_dialog.png @path %}){:width="100%"}

Paste the URL you got from running your app (in this example,
`http://127.0.0.1:50976/Swm0bjIe0ks=/`) into the connect dialog
to connect your app to DevTools.

将从启动 app 时获得的 URL 链接
（在这个例子里是 `http://127.0.0.1:50976/Swm0bjIe0ks=/` ）
复制到这个链接对话框中来把你的 app 和开发者工具链接起来。

This URL contains a security token, so it will be different
for each run of your app. This means that if you stop your
application and re-run it, you need to connect to DevTools
with the new URL.

这个链接包含一个秘钥 token ，所以每次启动你的 app 时，链接都会改变。
这意味着如果重启 app 后，你需要用新的 URL 链接来连接开发者工具。

