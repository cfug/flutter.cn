---
title: Background processes
title: 后台进程
description: Where to find more information on implementing background processes in Flutter.
description: 可以找到更多关于 Flutter 中后台进程实现的信息的地方
---

Have you ever wanted to execute Dart code in the background—even if
your app wasn’t the currently active app? Perhaps you wanted to implement
a process that watches the time, or that catches camera movement.
In Flutter, you can execute Dart code in the background.


你是否想过如果你的 App 不是当前激活的 App ，并在后台执行 Dart 代码？或许你想实现监控时间，或者是捕捉摄像机运动的过程。
在 Flutter 中，你可以在后台执行 Dart 代码。

The mechanism for this feature involves setting up an isolate. _Isolates_
are Dart’s model for multithreading, though an isolate differs from a
conventional thread in that it doesn’t share memory with the main program.
You’ll set up your isolate for background execution using callbacks and
a callback dispatcher.

这个功能的机制主要是设置一个 isolate。_isolate_ 是 Dart 的多线程模型，不过 isolate 与传统线程的不同之处在于它不与主进程共享内存。
你会使用回调和回调调度器来为后台执行设置 isolate。

For more information and a geofencing example that uses background
execution of Dart code, see [Executing Dart in the Background with
Flutter Plugins and
Geofencing]({{site.flutter-medium}}/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124),
an article in the Flutter Publication on Medium. At the end of this article,
you’ll find links to example code, and relevant documentation for Dart,
iOS, and Android.

关于更多使用 Dart 代码后台运行的地理围栏的案例，你可以看发布在 Flutter on Medium 上的一篇文章：[使用 Flutter 插件 实现的在后台运行 Dart 代码的地理围栏]({{site.flutter-medium}}/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124)。
在这篇文章的最后，你可以找到示例代码，以及相关的 Dart、iOS 和 Android 文档。
