---
# title: Embedded support for Flutter
title: Flutter 嵌入式支持
# description: >
#   Details of how Flutter supports the creation of embedded experiences.
description: >
  介绍 Flutter 如何支持创建嵌入式体验。
ai-translated: true
---

If you would like to embed Flutter engine into a car,
a refrigerator, a thermostat... you CAN! For example,
you might embed Flutter in the following situations:

若你想把 Flutter 引擎嵌入汽车、冰箱、恒温器等设备，完全可以！
例如，你可能在以下场景中嵌入 Flutter：

* Using Flutter on an "embedded device",
  typically a low-powered hardware device
  such as a smart-display, a thermostat, or similar.

  在「嵌入式设备」上使用 Flutter，通常是智能显示屏、恒温器等低功耗硬件设备。

* Embedding Flutter into a new operating system or
  environment, for example a new mobile platform
  or a new operating system.

  将 Flutter 嵌入新的操作系统或环境，例如新的移动平台或新的操作系统。

The ability to embed Flutter, while stable,
uses low-level API and is _not_ for beginners.
In addition to the resources listed below, you
might consider joining [Discord][], where Flutter
developers (including Google engineers) discuss
various aspects of Flutter. The Flutter
[community][] page has info on more community
resources.

嵌入 Flutter 的能力虽稳定，但使用底层 API，**不适合** 初学者。
除下方列出的资源外，你也可以加入 [Discord][]，Flutter 开发者（包括 Google 工程师）会在其中讨论 Flutter 的各个方面。
Flutter [community][]（社区）页面有更多社区资源信息。

* [Custom Flutter Engine Embedders][], on the Flutter wiki.

  [Custom Flutter Engine Embedders][]（自定义 Flutter 引擎嵌入器），见 Flutter wiki。

* The doc comments in the
  [Flutter engine `embedder.h` file][] on GitHub.

  GitHub 上 [Flutter 引擎 `embedder.h` 文件][Flutter engine `embedder.h` file] 中的文档注释。

* The [Flutter architectural overview][] on docs.flutter.dev.

  docs.flutter.dev 上的 [Flutter architectural overview][]（架构概览）。

* A small, self-contained [Flutter Embedder Engine GLFW example][]
  in the Flutter engine GitHub repo.

  Flutter 引擎 GitHub 仓库中的小型自包含 [Flutter Embedder Engine GLFW 示例][Flutter Embedder Engine GLFW example]。

* An exploration into [embedding Flutter in a terminal][] by
  implementing Flutter's custom embedder API.

  通过实现 Flutter 自定义嵌入器 API，探索 [在终端中嵌入 Flutter][embedding Flutter in a terminal]。

* [Issue 31043][]: _Questions for porting flutter engine to
  a new os_ might also be helpful.

  [Issue 31043][]：**Questions for porting flutter engine to a new os**（将 Flutter 引擎移植到新操作系统的问题）也可能有帮助。


[community]: {{site.main-url}}/community
[Discord]: https://discord.com/invite/N7Yshp4
[Custom Flutter Engine Embedders]: {{site.repo.flutter}}/blob/main/docs/engine/Custom-Flutter-Engine-Embedders.md
[Flutter architectural overview]: /resources/architectural-overview
[Flutter engine `embedder.h` file]: {{site.repo.flutter}}/blob/main/engine/src/flutter/shell/platform/embedder/embedder.h
[Flutter Embedder Engine GLFW example]: {{site.repo.flutter}}/tree/main/engine/src/flutter/examples/glfw#flutter-embedder-engine-glfw-example
[embedding Flutter in a terminal]: https://github.com/jiahaog/flt
[Issue 31043]: {{site.repo.flutter}}/issues/31043
