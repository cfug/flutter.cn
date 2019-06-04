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

当你的应用被切换到后台时，是否仍希望它在后台可以执行一些业务逻辑？在 Flutter 里，你可以在应用被切换到后台时执行一些代码逻辑。

The mechanism for this feature involves setting up an isolate. _Isolates_
are Dart’s model for multithreading, though an isolate differs from a
conventional thread in that it doesn’t share memory with the main program.
You’ll set up your isolate for background execution using callbacks and
a callback dispatcher.

这个功能的机制主要是设置一个 isolate。_isolate_ 是 Dart 中的多线程模型，不过其与传统线程的不同之处在于它不与主进程共享内存。
你可以使用回调和回调调度器来设置 isolate，从而使应用被切换进后台时仍能执行一些业务。

For more information and a geofencing example that uses background
execution of Dart code, see [Executing Dart in the Background with
Flutter Plugins and
Geofencing]({{site.flutter-medium}}/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124),
an article in the Flutter Publication on Medium. At the end of this article,
you’ll find links to example code, and relevant documentation for Dart,
iOS, and Android.

有关在后台进程中使用 Dart 代码的 geofencing 案例，你可以查阅发布在 Flutter on Medium 上的一篇文章：[Executing Dart in the Background with Flutter Plugins and Geofencing]({{site.flutter-medium}}/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124)。
在这篇文章的最后，你可以找到示例代码的链接，以及相关的 Dart、iOS 和 Android 文档。
