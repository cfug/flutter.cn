---
title: Dart 3.5 更新详解
description: Dart 3.5 更新详解
toc: true
---

![](https://img-s2.andfun.cn/devrel/posts/2024/08/e3c67fec6c3b5.gif)

又到了我们季度发布 Dart SDK 的时候了。这次我们在互操作性方面做了改进，为 pub.dev package 管理器添加了新功能，并且将我们新的 Web 集成 API 升级为稳定版和 1.0 版。

我们投入了大量精力在一些需要多个季度才能完成的大型工作上。因此，我们也更新了 Dart 的路线图，详细介绍了我们希望在未来几个季度取得进展的内容。

## Dart 3.5 中的新功能

Dart 3.5 包含了一些新功能，下面会详细介绍。同时还对核心库 API 做了一些小的改动，以及约 10 个非常小的破坏性变更，具体可以查看 [更新日志](https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md#350)。

## Web 平台和 JS 互操作性

在 Dart 3.4 和 Flutter 3.22 中，我们引入了 [将 Flutter Web 应用编译为 WebAssembly](https://docs.flutter.cn/platform-integration/web/wasm) 的支持。编译为 WebAssembly 需要使用我们新的 [Dart 到 JS 互操作模型](https://dart.cn/interop/js-interop)，该模型之前还处于预览阶段。从 Dart 3.5 开始，它现在被认为是稳定和完整的，我们还将 [package:web](https://pub.flutter-io.cn/packages/web) 中的浏览器 API 绑定(它取代了旧的 `dart:html` 库)更新到了 1.0 版本。

我们鼓励所有 Web package 的作者 [迁移到 package:web](https://dart.cn/interop/js-interop/package-web)。我们计划在下一个 Dart 版本中弃用旧的互操作 API (dart:html、dart:js、package:js 等)，并在明年晚些时候完全停止支持它们。我们邀请你在 [跟踪 issue](https://github.com/dart-lang/sdk/issues/56358)中对这个计划提供反馈。我们还计划更新 pub.dev package 管理器的 [评分系统](https://pub.flutter-io.cn/help/scoring)，为支持新互操作模型的 Web package 加分。

我们还添加了[一个新的 lint 规则](https://dart.cn/tools/linter-rules/invalid_runtime_check_with_js_interop_types)(代码风格检查规则)，用于验证你的代码是否正确使用了新的 JS 互操作类型。我们建议你在迁移 Web package 时将这个 lint 规则添加到 `analysis_options.yaml` 文件中。

## Dart 原生互操作性

我们还对原生互操作性做了一系列改进，支持直接从 Dart 调用 C、Java、Kotlin、Objective-C 和 Swift。

C 互操作是通过我们的 [FFI](https://dart.cn/interop/c-interop) (外部函数接口)库实现的，我们已经支持了几年。在 Dart 3.5 中，我们做了一些增量改进，支持直接将 Dart `TypedData` 对象的指针传递给 FFI，避免了先将内存从 Dart 复制到原生代码的需要([详情](https://github.com/dart-lang/sdk/issues/44589))。

Java 和 Kotlin 互操作是通过 [JNIgen](https://pub.flutter-io.cn/packages/jnigen) 生成器(目前处于预览阶段)实现的，它可以自动创建通过 Java 原生接口(JNI，Java Native Interface)从 Dart 调用 Java 和 Kotlin 的绑定代码。我们改进了性能，并添加了对 Java 异常和 Kotlin 顶级函数的支持。我们还停止了对之前的 [基于 C 的绑定](https://github.com/dart-lang/native/issues/660) 的支持，因为替代的纯 Dart 绑定现在具有可比的性能和功能，而且使用起来更加简单。详情请参见 [更新日志](https://pub.flutter-io.cn/packages/jnigen/changelog)。

Objective-C 互操作建立在 FFI 和我们的 [FFIgen](https://pub.flutter-io.cn/packages/ffigen) 生成器(目前处于预览阶段)之上。我们添加了对 Objective-C 协议和常见类型 (如 `NSString`) 的支持。有关使用 FFIgen 构建的大型 package 的示例，请参见 [cupertino_http](https://github.com/dart-lang/http/tree/master/pkgs/cupertino_http)，它与 Apple 的 URL 加载系统网络库进行互操作。

在接下来的版本中，我们将继续投资进一步的互操作性——既包括完善上述提到的库，也包括支持 Swift。详情请参见下面的路线图部分。

## Pub.dev package 仓库

Pub.dev 是我们的 package 仓库，社区可以在这里分享和查找具有丰富功能的 package。我们在这方面做了一些改进。首先，我们改进了对 [**主题**](https://dart.cn/tools/pub/pubspec#topics) 的支持——package 作者可以通过这种机制为他们的 package 添加所属类别的标签(例如 widget)。我们现在 [整合](https://github.com/dart-lang/pub-dev/blob/master/doc/topics.yaml) 了涵盖同一类别但措辞略有不同的常见主题(例如 widgets 与 widget)。

其次，我们添加了一个新的 `pub unpack` 命令。这提供了一种快速简便的方法来将 package 下载到你的文件系统中。例如，如果你想在本地机器上运行 package 的示例程序，可以使用这个命令:

```shell
$ dart pub unpack path
Downloading path 1.9.0 to `./path-1.9.0`...

$ cd path-1.9.0/example/

$ dart run example.dart
Current path style: posix
Current process path: /Users/mit/tmp/path-1.9.0/example
```

第三，我们添加了一个新的 `pub downgrade --tighten` 命令。这可以用来检查 package 的依赖项中的所有版本约束。运行时，它会将下限约束更新为 pub 能够解析的最低版本。

## Dart 路线图更新

除了上面完成的功能外，我们还在许多领域开展工作，以推进我们的长期路线图。

## 大型单一代码库的 IDE 和分析器性能

"单一代码库"(monorepo)是一种常见的方式，用于将一组相关 package 和应用的源代码结构化到单个代码库中，例如 Flutter 的 [packages repo](https://github.com/flutter/packages/tree/main)。单一代码库不仅仅是为了方便将所有源代码"放在一起"，还可以是确保代码库中的各个 package 和应用相互兼容的关键工具。

我们一直听到在大型单一代码库中工作的开发者反馈，我们的工具，特别是分析器的性能可能不太理想。我们对这些问题的分析表明，根本原因是我们最终为每个 package 及其所有依赖项加载了多个重叠的分析上下文，导致单一代码库中每个 package 的分析在内存中同时存在多个副本。我们认为根本的解决方案是为这样的代码库中每个依赖项的版本创建一个单一的、共享的解析，我们正在通过一个名为 workspaces 的新 pub 功能来实现这种能力。我们将在下一个 Dart 版本中分享更多相关内容，但现在你可以看看这是如何 [最近应用](https://github.com/flutter/engine/pull/54157/files) 到 Flutter 引擎代码库的。

## Pub.dev package 仓库

pub.dev package 仓库的用户长期以来一直要求改进对每个 package 的 [使用/下载](https://github.com/dart-lang/pub-dev/issues/2714) 情况的衡量。这对 package 作者来说可能很有帮助，作为他们的工作为多少用户带来好处的信号，对 package 消费者来说也是其他开发者正在使用哪些 package 的信号。我们很高兴地分享，我们在这个功能上取得了很好的进展，希望在年底前提供预览版。

## Dart 原生互操作

对于使用 JNIgen 的 Java 和 Kotlin 互操作，我们预计在接下来的两个季度内完成核心支持，并从实验阶段升级到稳定的 1.0 版本。详情请参见 [JNIgen 跟踪器](https://github.com/orgs/dart-lang/projects/69/)。对于 Objective-C 互操作，我们有类似的目标;请参见 [Objective-C 跟踪器](https://github.com/orgs/dart-lang/projects/87)。

接下来我们正在研究与 Swift 代码的直接互操作。初步实验看起来很有希望，我们希望在明年初添加实验性支持。

## 原生互操作和原生源代码的打包

在许多情况下，直接互操作用于调用操作系统中存在的 API，这意味着这些 API 在那些宿主平台上始终可用。然而，在某些情况下，Dart 互操作的代码是不直接包含在宿主上的原生源代码，这给使用这种互操作的 package 作者带来了一个实际挑战:如何在不将大量手动步骤推给 package 的消费者的情况下，打包和构建那些原生源代码？

为了支持这一点，我们正在探索一个 [平台原生资源](https://github.com/dart-lang/sdk/issues/50565) 的新特性，它可以支持发布包含原生源代码的 Dart package，同时提供一个标准化的协议，使 `dart` 和 `flutter` CLI 工具能够自动化构建和打包这些源代码。我们设想这将启用一组新的互操作用例，同时为使用依赖原生源代码的 package 的开发者提供简单的用户体验。

## Dart 语言和宏

Dart 语言和编译器团队目前的大部分时间都花在推进非常大的语言特性宏上，我们在 [Dart 3.4 博文](https://medium.com/dartlang/dart-3-4-bd8d23b4462a) 中介绍过这个特性。正如我们当时所说，这是一项巨大的工作，有可能在热重载等一些核心用例中造成回归，所以我们采取了一种彻底的方法，可能还需要几个季度的进一步工作才能分享下一步的细节。

除了宏之外，我们还同时在探索一些其他较小的语言特性，如 [Dart 语言漏斗](https://github.com/orgs/dart-lang/projects/90/views/1) 中所记录的。

从去年秋天开始，我们一直在重写 Dart 格式化程序。旧的设计运行良好多年，但随着 Flutter 的成功，我们希望转向 [一种新的风格](https://github.com/dart-lang/dart_style/issues/1253)，更适合 Flutter 用户经常编写的那种声明式代码。旧的格式化程序无法产生那种输出。重写工作即将完成，很快就会发布。如果你想试用，可以传递实验标志 `tall-style` ([标志说明](https://dart.cn/tools/experiment-flags))。如果你看到奇怪的输出，欢迎 [提供反馈](https://github.com/dart-lang/dart_style/issues)。

## 结语

今天的内容就到这里。我们欢迎你对讨论的路线图项目以及 Dart 3.5 中的新功能提供反馈。Dart 3.5 可以从 [dart.cn](https://dart.cn/get-dart) 获得，也包含在今天发布的 [Flutter 3.24 版本](/posts/whats-new-in-flutter-3-24)中。