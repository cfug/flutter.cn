---
title: Dart 2.5 正式公布
toc: true
---

![](https://devrel.andfun.cn/devrel/posts/2021/05/UUKmRn.jpg)

*作者: Michael Thomsen, Dart & Flutter Product Manager, Google*

继在中国 Google 开发者大会上 [发布 Flutter 1.9](https://flutter.cn/posts/flutter-news-from-gdd-china-flutter1.9) 之后，今天 Dart 2.5 SDK 稳定版也正式到来，其中包括两个意义重大的全新功能技术预览:

* ML Complete，由机器学习 (ML) 驱动的代码补全功能
* dart:ffi 外部函数接口，用来直接从 Dart 调用 C 语言代码

另外，Dart 2.5 还增强了对 [常量表达式](https://dart.dev/guides/language/language-tour#final-and-const) 的支持。

这个版本是我们向着针对客户端优化的最佳开发语言愿景迈出的又一步，让开发者可以在任何平台创建高效运行的应用。ML Complete 是我们现有生产力工具组件 ([热重载](https://flutter.dev/docs/development/tools/hot-reload)、[可自定义静态分析](https://dart.dev/guides/language/analysis-options) 和 [Dart DevTools](https://flutter.dev/docs/development/tools/devtools/overview) 等) 的强大补充，第二个预览功能 dart:ffi 则使你能够在运行 Dart 代码的许多操作系统上调用现有的原生 API，以及用 C 编写的现有跨平台原生代码库。

我们热切地想要创建最佳的客户端开发语言。令人振奋的是，新的 [IEEE Spectrum 2019 最佳开发语言](https://spectrum.ieee.org/computing/software/the-top-programming-languages-2019) 评级已于近期出炉，而 Dart 已经跻身其中并位列第 16 名。在 "热门" 条目下，Dart 则排名第 10，在只考虑移动端开发语言时则排名第 6 (位于 Java、C、C++、C# 和 Swift 之后)。

![](https://devrel.andfun.cn/devrel/posts/2021/05/jpZtih.png)

## **ML Complete: 基于机器学习的代码补全**

类型化编程语言的核心优势之一，就是在类型中附带的信息使得 IDE / 编辑器能够在键入代码时提供强大的代码补全功能，从而帮助开发者提高效率。通过代码补全，开发者只需要输入代码的开头部分即可从提供的选项中进行选择，从而避免拼写错误，也便于探索各种 API。

但随着 API 数量的增长，探索 API 也变得愈发困难，因为补全功能提供的列表太长，开发者无法按照字母顺序去逐一浏览。在过去的一年里，我们一直在努力让机器学习来解决这个问题。简单地讲，我们通过 [分析 GitHub 上大量开源的 Dart 代码](https://console.cloud.google.com/marketplace/details/github/github-repos) 来训练一个模型，用以分析特定上下文时不同代码成员的出现模式。这个基于 [TensorFlow Lite](https://www.tensorflow.org/lite) 打造的模型在被训练成型后，可以在开发者编写代码时预测接下来需要用到的代码内容。这个新功能我们称之为 ML Complete。以下是使用 Flutter 框架开发新的 MyHome widget 的示例:

![△ 使用 ML Complete 开发 Flutter widget 时的示例](https://devrel.andfun.cn/devrel/posts/2021/05/epDlid.gif)

> △ 使用 ML Complete 开发 Flutter widget 时的示例

让我们来深入了解一下它的运行机制。假设你正在编写一个小程序来计算从当前时间开始一天后的时间。使用 ML Complete，你将获得下图这样迅捷的开发体验。

![△ 使用 ML Complete 编写代码的体验](https://devrel.andfun.cn/devrel/posts/2021/05/tynAjy.gif)

> △ 使用 ML Complete 编写代码的体验

![△ 不使用 ML Complete 编写同样代码的体验](https://devrel.andfun.cn/devrel/posts/2021/05/gpR4if.gif)

> △ 不使用 ML Complete 编写同样代码的体验

首先，请注意 ML Complete 会根据开发者输入的变量名称 now 自动给出 DateTime.now() 的建议。当第一行输入完成后，请注意我们在开发者输入第二个变量名时，也给出了 tomorrow 这个变量名建议。最后，基于 now 这个变量给出了第二个补全建议 add(…)。而在上图的非 ML Complete 体验中，我们必须手动键入 DateTime，而且在键入 tomorrow 变量名时没有补全提示，另外 now 的 add(…) 方法在推荐列表更下面的位置才出现。

## **如何试用 ML Complete**

ML Complete 今天推出预览版。它内置于 Dart 分析器中，因此可用于所有支持 Dart 的编辑器，包括 Android Studio、IntelliJ 和 VS Code。有关如何启用此预览功能，以及如何提供反馈和报告问题，请参阅我们的 [反馈 wiki 页](https://github.com/dart-lang/sdk/wiki/Previewing-Dart-code-completions-powered-by-machine-learning)。

由于该功能仍在预览中，因此当前 Flutter 和 Dart 稳定版本中的 ML Complete 在性能表现和优化细节上会不及我们计划推出的后续版本。因此，我们建议你试用此功能时临时使用 [Flutter dev 渠道](https://github.com/flutter/flutter/wiki/Flutter-build-release-channels) 或 [Dart dev 渠道](https://dart.dev/tools/sdk/archive#dev-channel)。

## **dart:ffi 外部函数接口**

许多开发者要求我们为从 Dart 调用 C 代码提供更好的支持。一个非常明确的信号，是在 Flutter 问题反馈专区里 C 语言互操作是 [呼声最高的功能请求](https://github.com/flutter/flutter/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc)，得票数超过 600。这些功能请求背后有许多有趣的用例，包括调用低级平台 API (如 [stdlib.h](https://pubs.opengroup.org/onlinepubs/009695399/basedefs/stdlib.h.html) 或 [Win32](https://en.wikipedia.org/wiki/Windows_API))，调用现有的跨平台库以及用 C 语言编写的实用程序 (如 TensorFlow、Realm 和 SQLite) 等。

目前，直接从 Dart 调用 C 的支持仅限于使用 [原生扩展](https://dart.dev/server/c-interop-native-extensions) 与 Dart VM 进行深度集成。或者，Flutter 应用可以通过 [平台通道](https://flutter.dev/docs/development/platform-integration/platform-channels) 调用 host，并从那里来间接调用 C。这种两层的间接调用表现并不理想，我们希望提供一种新的机制，能够提供出色的性能，易于使用，并可以在许多支持 Dart 的平台和编译器上运行。

Dart-C 互操作支持两种主要场景:

* 在操作系统 (OS) 上调用基于 C 的系统 API
* 调用基于 C 的代码库，该代码库可以基于单个操作系统，也可以是跨平台的

## **调用基于 C 的操作系统 API**

我们来看看第一个互操作场景。我们将调用 Linux 命令 system，它可以执行任何系统命令; 传递给它的参数实际上是传递给了 shell/terminal，并在那里运行。这个指令的 C 语言头部如下所示:

```
// C header: int system(const char *command) in stdlib.h
```

任何互操作机制的核心挑战都是处理两种语言的语义差异。在 dart:ffi 这里，Dart 代码需要处理好两件事:

1. C 语言函数及其参数的类型，以及返回类型
2. 与之对应的 Dart 函数及其类型

我们通过定义两个 typedef 来做到这一点:

```
// C header typedef:
typedef SystemC = ffi.Int32 Function(ffi.Pointer<Utf8> command);

// Dart header typedef:
typedef SystemDart = int Function(ffi.Pointer<Utf8> command);
```

下面我们需要加载代码库，并查找我们要调用的函数。具体做法取决于操作系统，在下面这个例子中，我们使用的是 macOS。

```
// Load `stdlib`. On MacOS this is in libSystem.dylib.
final dylib = ffi.DynamicLibrary.open('/usr/lib/libSystem.dylib');

// Look up the system function.
final systemP = dylib.lookupFunction<SystemC, SystemDart>('system');
```

你可以在 GitHub 上找到可供所有三种操作系统 ([macOS](https://github.com/dart-lang/samples/blob/master/ffi/system-command/macos.dart)、[Windows](https://github.com/dart-lang/samples/blob/master/ffi/system-command/windows.dart)、[Linux](https://github.com/dart-lang/samples/blob/master/ffi/system-command/linux.dart)) 执行的完整示例。

接下来，我们使用与特定操作系统相关的编码对字符串参数进行编码，调用该函数，并再次释放参数内存:

```
// Allocate a pointer to a Utf8 array containing our command.
final cmdP = Utf8.toUtf8('open http://dart.dev');

// Invoke the command.
systemP(cmdP);

// Free the pointer.
cmdP.free();
```

这段代码会执行系统命令，使用系统默认浏览器打开 dart.dev 网页:

![△ 通过 dart:ffi 使用系统 API 打开默认浏览器](https://devrel.andfun.cn/devrel/posts/2021/05/6rNvGJ.gif)

> △ 通过 dart:ffi 使用系统 API 打开默认浏览器

## **调用基于 C 的框架和组件**

dart:ffi 的第二个核心用途是调用基于 C 的框架和组件。本文前面提及过的基于 ML 的代码补全功能就是一个具体的例子！它使用 TensorFlow Lite，这是一个基于 C 的 API。使用 dart:ffi 可以让我们在需要提供代码补全的所有操作系统上运行 TensorFlow，同时拥有原生 TensorFlow 的高性能。如果你想查看 Dart 与 TensorFlow 集成的代码，请查看 [这个 repo](https://github.com/dart-lang/tflite_native)。

我们希望调用 C 语言代码库的能力能够对 Flutter 应用带来助力，比如调用 [Realm](https://github.com/realm/realm-core) 或 [SQLite](https://www.sqlite.org/c3ref/intro.html) 等本地代码库，我们认为 dart:ffi 可能会为 [Flutter 桌面应用](https://github.com/flutter/flutter/wiki/Desktop-shells) 带来强大的插件功能。

## **封装 API 和代码生成**

你可能已经注意到，在互操作时，描述函数/方法和查找符号时会有一些不可避免的前置编程工作。你可以从 C 语言的头文件生成许多这种样板代码。我们目前专注于做好底层的基础工作，如果有任何人对这种代码生成器感兴趣的话，我们也很乐意与之合作。

## **如何试用 dart:ffi**

dart:ffi 库今天也已发布预览版。由于它仍处于预览状态，因此我们建议你使用 [Flutter master 渠道](https://github.com/flutter/flutter/wiki/Flutter-build-release-channels) 或 [Dart dev 渠道](https://dart.dev/tools/sdk/archive#dev-channel)，以更快地获得我们所做的更改和改进。

请注意，API 可能会在正式版本中有非兼容性变化，因为我们会添加一些细节改动，并扩大对常见模式的支持。你可以详细了解我们目前为第一个版本 [规划的内容](https://github.com/dart-lang/sdk/projects/13)。以下是你应该了解的一些限制:

* 该库不支持嵌套结构、内联数组、打包数据或与平台相关的基本类型
* 指针操作的性能不足 (但可以使用 Pointer.asExternalTypedData 作为替代方案)
* 该库不支持 finalizer (对象即将被垃圾回收时发生的回调)

我们的 [C 语言互操作文档](https://dart.dev/guides/libraries/c-interop) 和 [dart:ffi API 文档](https://api.dart.dev/dev/2.6.0-dev.1.0/dart-ffi/dart-ffi-library.html) 收录了相关的核心概念，并给出了你可以查看的示例。如果你有任何疑问的话，请在 [Dart FFI 讨论组](https://groups.google.com/forum/#!forum/dart-ffi) 中发帖，或直接 [向我们提交你的问题](https://github.com/dart-lang/sdk/issues/new?labels=area-vm,library-ffi)。

## **改进常量表达式**

Dart 长期以来一直支持 [创建 const 变量和值](https://dart.dev/guides/language/language-tour#final-and-const)，由于它们在编译时为常量，因此具有非常好的性能。在以前的版本中常量表达式的局限颇多。从 Dart 2.5 开始，我们支持更多定义常量表达式的方法，包括类型转换以及 [Dart 2.3](https://medium.com/dartlang/announcing-dart-2-3-optimized-for-building-user-interfaces-e84919ca1dff) 中提供的新控制流和集合扩展功能:

```
// Example: these are now valid compile-time constants.
const Object i = 3;
const list = [i as int];
const set = {if (list is List<int>) ...list};
const map = {if (i is int) i: "int"};
```

## **小结**

在接下来的几个季度，我们将迎来诸多令人振奋的进展: [扩展方法](https://github.com/dart-lang/language/issues/41) 已经进行了大量的研发工作，[非空引用](https://medium.com/dartlang/dart-nullability-syntax-decision-a-b-or-a-b-d827259e34a3) (non-nullable) 也在大力推进中，[更多语言特性](https://github.com/dart-lang/language/projects/1) 也进入了早期规划。我们还在研究如何改善并发支持，例如在现代智能手机上更好地使用多核处理器的能力。

默认采用非空引用是一个我们热切期望推进的语言特性。我们为这个特性制定了一个 [非常庞大的计划](https://github.com/dart-lang/language/blob/master/accepted/future-releases/)，并且正在进行大量工作。最近新出现的几种语言从设计一开始就支持非空引用，而大多数既有语言则在版本更新中也添加了 (有限的) 非空支持，但仅限于额外的静态分析。而 [我们的目标是实现完全的非空引用](https://github.com/dart-lang/language/blob/master/accepted/future-releases/)，简而言之，这意味着我们的非空将扩展到类型系统的核心，一旦我们的类型系统知道某些东西是非空的，我们就可以完全信任这些信息，并且我们的后端编译器就可以全力优化这些代码。这种稳健性会在很多地方带来优势，比如提供一致的 "无异常报错" 体验，更优化的代码体积以及更高的运行时性能。

当我们改进开发语言时，我们总会意识到这些修改给我们的生态系统带来的负担。因此，我们也在为现有代码提供丰富的迁移工具，并在这方面进行了大量的投入。我们希望这些工具能够抵消大部分迁移成本。我们还添加了一些支持逐步迁移的语言特性和工具，并将努力在 pub.dev 上迁移我们自己的代码和共享代码。

请保持对我们的关注，今年还会有更多惊喜到来！
