---
# title: Performance FAQ
title: 性能常见问题和回答
# description: Frequently asked questions about Flutter performance
description: 关于 Flutter 性能的常见问题
---

This page collects some frequently asked questions
about evaluating and debugging Flutter's performance.

本篇收集了一些关于评估和调试 Flutter 性能的常见问题。

* Which performance dashboards have metrics that are related to Flutter?

  哪些性能仪表盘有 Flutter 相关的指标？

  * [Flutter dashboard on appspot][]

    [在 Appspot 上的 Flutter 仪表盘][Flutter dashboard on appspot]

  * [Flutter Skia dashboard][]

    [Flutter Skia 仪表盘][Flutter Skia dashboard]

  * [Flutter Engine Skia dashboard][]

    [Flutter Engine Skia 仪表盘][Flutter Engine Skia dashboard]

[Flutter dashboard on appspot]: https://flutter-dashboard.appspot.com/
[Flutter engine Skia dashboard]: https://flutter-engine-perf.skia.org/t/?subset=regressions
[Flutter Skia dashboard]: https://flutter-flutter-perf.skia.org/t/?subset=regressions

* How do I add a benchmark to Flutter?

  我如何向 Flutter 添加一个基准测试？

  * [How to write a render speed test for Flutter][speed-test]

    [如何编写 Flutter 的渲染速度测试][speed-test]

  * [How to write a memory test for Flutter][memory-test]

    [如何编写 Flutter 的内存测试][memory-test]

[memory-test]: {{site.repo.flutter}}/wiki/How-to-write-a-memory-test-for-Flutter
[speed-test]: {{site.repo.flutter}}/wiki/How-to-write-a-render-speed-test-for-Flutter

* What are some tools for capturing and analyzing performance
  metrics?

  有哪些捕捉和分析性能指标的工具？

  * [Dart/Flutter DevTools](/tools/devtools)
  * [Apple instruments](https://en.wikipedia.org/wiki/Instruments_(software))
  * [Linux perf](https://en.wikipedia.org/wiki/Perf_(Linux))
  * [Chrome tracing (enter `about:tracing` in your
    Chrome URL field)][tracing]

    [Chrome tracing（在浏览器地址栏输入 `about:tracing`）][tracing]

  * [Android systrace (`adb systrace`)][systrace]
  * [Fuchsia `fx traceutil`][traceutil]
  * [Perfetto](https://ui.perfetto.dev/)
  * [speedscope](https://www.speedscope.app/)

[systrace]: {{site.android-dev}}/studio/profile/systrace
[tracing]: https://www.chromium.org/developers/how-tos/trace-event-profiling-tool
[traceutil]: https://fuchsia.dev/fuchsia-src/development/tracing/usage-guide

* My Flutter app looks janky or stutters. How do I fix it?

  我的 Flutter 应用程序很卡顿，性能很糟糕。
  怎么样才能修复这些问题？

  * [Improving rendering performance][]

    [提高渲染性能][Improving rendering performance]

[Improving rendering performance]: /perf/rendering-performance

* What are some costly performance operations that I need
  to be careful with?

  有哪些特别消耗性能的操作是我需要注意的？

  * [`Opacity`][], [`Clip.antiAliasWithSaveLayer`][],
     or anything that triggers [`saveLayer`][]

    [`Opacity`][]、[`Clip.antiAliasWithSaveLayer`][] 
    或任何能触发 [`saveLayer`][] 的操作。

  * [`ImageFilter`][]
  * Also see [Performance best practices][]

    查阅 [性能优化最佳实践][Performance best practices]

[`Clip.antiAliasWithSaveLayer`]: {{site.api}}/flutter/dart-ui/Clip.html#antiAliasWithSaveLayer
[`ImageFilter`]: {{site.api}}/flutter/dart-ui/ImageFilter-class.html
[`Opacity`]: {{site.api}}/flutter/widgets/Opacity-class.html
[Performance best practices]: /perf/best-practices
[`savelayer`]: {{site.api}}/flutter/dart-ui/Canvas/saveLayer.html

* How do I tell which widgets in my Flutter app are rebuilt
  in each frame?

  我如何才能知道 Flutter 应用程序中哪些 widget 在哪一帧中被重新构建？

  * Set [`debugProfileBuildsEnabled`][] true in
    [widgets/debug.dart][debug.dart].

    将 [widgets/debug.dart][debug.dart] 
    中的 [`debugProfileBuildsEnabled`][] 设置为 true。

  * Alternatively, change the `performRebuild` function in
    [widgets/framework.dart][framework.dart] to ignore
    `debugProfileBuildsEnabled` and always call
    `Timeline.startSync(...)/finish`.

    或者，改变 [widgets/framework.dart][framework.dart] 中的
    `performRebuild` 函数，忽略 `debugProfileBuildsEnabled`，
    并始终调用 `Timeline.startSync(...)/finish`。

  * If you use IntelliJ, a GUI view of this data is available.
    Select **Track widget rebuilds**,
    and your IDE displays which the widgets rebuild.

    如果你使用 IntelliJ，就可以看见这些数据的视图。
    在 IntelliJ 的 Flutter Performance 工具中
    勾选 **Track widget rebuilds**，
    你就能在 IDE 中直观地看见哪些 widget 进行了重建。

[`debugProfileBuildsEnabled`]: {{site.api}}/flutter/widgets/debugProfileBuildsEnabled.html
[debug.dart]: {{site.repo.flutter}}/blob/master/packages/flutter/lib/src/widgets/debug.dart
[framework.dart]: {{site.repo.flutter}}/blob/master/packages/flutter/lib/src/widgets/framework.dart

* How do I query the target frames per second (of the display)?

  我如何查询显示器的刷新率？

  * [Get the display refresh rate][]

    [获取显示器刷新率][Get the display refresh rate]

[Get the display refresh rate]: {{site.repo.flutter}}/wiki/Engine-specific-Service-Protocol-extensions#get-the-display-refresh-rate-_fluttergetdisplayrefreshrate

* How to solve my app's poor animations caused by an expensive
  Dart async function call that is blocking the UI thread?

  如何解决我的应用程序因高消耗的 Dart 异步函数调用
  阻塞了 UI 线程，而导致动画效果不佳？

  * Spawn another isolate using the [`compute()`][] method,
    as demonstrated in [Parse JSON in the background][] cookbook.

    使用 [`compute()`][] 方法生成另一个 isolate，
    例如 [在后台处理 JSON 数据解析][Parse JSON in the background] 实用教程 (Cookbook) 中所演示的。

[`compute()`]: {{site.api}}/flutter/foundation/compute-constant.html
[Parse JSON in the background]: /cookbook/networking/background-parsing

* How do I determine my Flutter app's package size that a
  user will download?

  我如何确定用户下载的 Flutter 应用程序包的体积？

  * See [Measuring your app's size][]

    请查阅 [测量你的应用体积][Measuring your app's size]

[Measuring your app's size]: /perf/app-size

* How do I see the breakdown of the Flutter engine size?

  我如何才能看到 Flutter engine 内架构细分的体积？

  * Visit the [binary size dashboard][], and replace the git
    hash in the URL with a recent commit hash from
    [GitHub engine repository commits][].

    访问 [binary size dashboard][]，
    用 [GitHub 上 engine 仓库][GitHub engine repository commits] 最近提交的 hash 值替换 URL 中的 hash 值。

[binary size dashboard]: https://storage.flutter-io.cn/flutter_infra_release/flutter/241c87ad800beeab545ab867354d4683d5bfb6ce/android-arm-release/sizes/index.html
[GitHub engine repository commits]: {{site.repo.engine}}/commits

* How can I take a screenshot of an app that is running and export it
  as a SKP file?

  我如何才能对正在运行的应用程序进行截图，
  并将其导出 SKP 文件？

  * Run `flutter screenshot --type=skia --observatory-uri=...`

    运行 `flutter screenshot --type=skia --observatory-uri=...` 命令

  * Note a known issue viewing screenshots:

    注意，一个查看截图的已知问题：

    * [Issue 21237][]: Doesn't record images in real devices.

      [Issue 21237][]: 无法在真机中截图。

  * To analyze and visualize the SKP file,
    check out the [Skia WASM debugger][].

    分析和可视化 SKP 文件，请使用 [Skia WASM debugger][]。

[Issue 21237]: {{site.repo.flutter}}/issues/21237
[Skia WASM debugger]: https://debugger.skia.org/

* How do I retrieve the shader persistent cache from a device?

  如何从设备上读取着色器持久化缓存？

  * On Android, you can do the following:

    在 Android 上，你可以进行以下操作：

    ```console
    adb shell
    run-as <com.your_app_package_name>
    cp <your_folder> <some_public_folder, e.g., /sdcard> -r
    adb pull <some_public_folder/your_folder>
    ```

* How do I perform a trace in Fuchsia?

  我如何在 Fuchsia 中进行追踪？

  * See [Fuchsia tracing guidelines][traceutil]

    请查阅 [Fuchsia 追踪指南][traceutil]
