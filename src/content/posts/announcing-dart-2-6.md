---
title: Dart 2.6 正式发布, 新增利器 dart2native：将 Dart 编译为自包含的本地可执行文件
toc: true
---

*作者: Michael Thomsen, Dart & Flutter Product Manager, Google*

Dart 提供了 [丰富多样的编译器](https://dart.dev/platforms)，全方位助力开发者为移动设备和 web 平台优化生产代码。灵活的编译器技术让我们的框架合作伙伴可以针对不同的目标平台，构建各种类型的应用，例如: [Android 和 iOS](https://flutter.dev/docs) 平台上的 Flutter 应用、[Web 端](https://flutter.dev/web) 和 [桌面端](https://github.com/flutter/flutter/wiki/Desktop-shells) Flutter 应用、[Web 端的 AngularDart 应用](https://angulardart.dev) 以及 [嵌入式设备](https://mp.weixin.qq.com/s/xVmilQeiveA8XZNU0g668Q) 上的 Google 助手。

今天，我们正式推出 **dart2native**。作为现有编译器集合的一个扩展，dart2native 可以将 Dart 程序编译为含有预编译机器码的自包含可执行文件。在它的协助下，你可以使用 Dart 在 **macOS**, **Windows** 或 **Linux** 上创建命令行工具。下方的功能宣传图就是 [使用 dart2native 来实现](https://gist.github.com/mit-mit/faec2bfc1d1cef7cd09df917e531c5c0) 的。

![](https://devrel.andfun.cn/devrel/posts/2021/05/H1ZCVn.gif)

## **Dart Native 及 dart2native 编译器**

Dart 从数年前就开始支持 AOT 运行前编译，通过 AOT 编译器，开发者可以提前将 Dart 代码编译为本地机器码。几年发展下来，[Dart Native](https://dart.dev/platforms) 技术也日趋成熟。不过，此前这项功能的应用范围比较局限，我们仅通过 [Flutter](https://flutter.dev) 向 iOS 和 Android 移动设备投放了该功能。

引入 dart2native 后，我们将本地编译支持扩展至 macOS、Windows 和 Linux 三款传统桌面操作系统。利用 dart2native 创建的可执行文件属于自包含文件，因此在未安装 Dart SDK 的机器上亦能运行。由于可执行文件之前已经通过 Dart 的 AOT 编译器进行过处理，因此几毫秒后就会开始运行。在编译为本地代码的过程中，dart2native 与其它 Dart 编译器和运行时工具一样，也可以使用丰富且一致的 [Dart 核心库](https://dart.dev/guides/libraries)。

许多客户要求我们为桌面操作系统提供 AOT 预编译支持 (Dart AOT 问题专区 [排名第 6 的功能请求](https://github.com/dart-lang/sdk/issues/36915))，所以，我们很高兴终于将这项功能带到你身边。

> 如果你之前使用过 dart2aot，那么，升级至 Dart SDK 2.6 后，你将开始使用 dart2native，它的功能比 dart2aot 更加强大。

## **使用 dart2native 构建命令行应用**

如果你想构建和部署 [基于 Dart 的命令行应用](https://dart.dev/tutorials/server/cmdline)，那么 dart2native 绝对是你的不二选择。此类应用通常会使用到 [dart:io](https://api.dart.dev/stable/2.6.1/dart-io/dart-io-library.html) (基础 I/O), package:[http](https://pub.dev/packages/http) (网络) 以及 package:[args](https://pub.dev/packages/args) (参数解析) 这三个库。下面让我们以 "hello, world" (你好，世界) 应用为例，回顾一下如何把应用编译成可执行文件:

源代码 hello.dart

```dart
main() {
 print(‘Hello Dart developers’);
}
```

编译 hello.dart 至 hello 可执行文件:

```console
$ dart2native src/hello.dart -o hello
Generated: /Users/mit/hello
```

运行 hello 并测量知执行时间:

```console
$ time ./hello
Hello Dart developers
real 0m0.049s
user 0m0.018s
sys 0m0.020s
```

**请注意:** 在短短 49 毫秒内，这条命令就完成了开始、打印到标准输入、退出整个流程！

之前，我们已经看到有不少 Dart 开发者小试牛刀，尝试利用 dart2native 开发命令行工具:

* 来自 [SASS](https://sass-lang.com/) (一款深受开发者喜爱的 CSS 扩展工具) 团队的 Natalie [在 Github 上留言说](https://github.com/dart-lang/sdk/issues/32894#issuecomment-513975562)，自从团队转用 dart2native 来编译基于 Dart 的 SASS 实现后，该实现的性能大幅提高，即使与 LibSass 这款基于 C++ 的实现相比也毫不逊色。
* 来自 Dart DevRel 团队的 Filip 使用 dart2native 重编译了自己的网站链接检查工具 [linkchecker](https://github.com/filiph/linkcheck/)，二次编译后，小型网站的检查速度 [提升了整整 27 倍](https://github.com/filiph/linkcheck/issues/7#issuecomment-496308288)。

## **通过 dart:ffi 与 C 代码互操作**

原生应用经常会用到由访问由操作系统提供的原生功能。此类系统 API 通常由基于 C 语言的原生库提供，而 Dart 则允许你通过 dart:ffi (外部函数接口) 与这些库实现互操作。dart:ffi 是我们新推出的 C 语言互操作机制，首个技术预览版本已随 [Dart 2.5](https://mp.weixin.qq.com/s?__biz=MzAwODY4OTk2Mg==&mid=2652050716&idx=1&sn=8f417c47868404bf55f9878f69f8c7e4&scene=21#wechat_redirect) 一同发布。dart2native 编译器与 dart:ffi 兼容，因此你可以直接在本地创建和编译需要用到 dart:ffi 的应用。

我们团队的一名成员最近利用 dart:ffi 创建了一个 [dart_console](https://pub.dev/packages/dart_console) 库，专门用于控制台应用的开发工作。该库涵盖多种功能，如获取窗口尺寸、读取和设定光标位置、颜色管理、读取键盘输入和控制序列等。出色的 dart:ffi 使用能力让 Dart 成为一款强大的控制台应用开发语言。

**不到 500 行 Dart 代码就能写出一个 7MB 大小的代码编辑器: kilo**

我们利用 Dart 核心库、dart:ffi 以及 dart_console 库开发出了几个十分有趣的控制台应用。我们 [大约用了 500 行 Dart 代码](https://github.com/timsneath/dart_console/blob/master/example/kilo.dart) 编写了一个名为 Kilo 的控制台文本编辑器，并将完整版演示封装至 dart_console 包内。Kilo 的命名源于它的前身 [kilo.c](https://github.com/antirez/kilo/blob/master/kilo.c) —— 一款由不到 1,000 行 C 代码实现的简易文本编辑器。

新推出的 dart2native 编译器让打包工作变得十分简单，我们最终得到了一个 7MB 大小的自包含代码编辑器。请查看下方演示动图，了解 Kilo 的编译过程，以及编译后的 Kilo 是如何通过编辑自己的源代码来修复错误的。

![](https://devrel.andfun.cn/devrel/posts/2021/05/frVHPl.gif)

正在编辑自己的源代码的 Kilo 编辑器 (该编辑器使用 Dart 编写，并通过 dart2native 编译为可执行文件)

## **使用 dart2native 构建服务**

微服务是 dart2native 编译器另一个潜在用途，比如说: 为前端 Flutter 应用提供支持的后台服务。近年来，[无服务器计算](https://en.wikipedia.org/wiki/Serverless_computing) 的应用趋势持续攀升，越来越多的用户开始使用运行在无服务器计算上的服务。这些服务完全交由供应商托管，支持自动扩缩，基础架构可根据流量从零 (停止运行时) 开始扩容，反向缩容亦可。此外，由于无服务器平台仅在代码运行期间收费，因此可以为开发者大幅削减成本。目前，Google Cloud 已通过 [Cloud Run](https://cloud.google.com/run/) 推出无服务器计算解决方案。

对于无服务器后台而言，快速的服务启动速度至关重要。过去，我们一般通过 JIT (即时) 编译器来运行基于 Dart 的服务，但是基于 JIT 的执行有一个明显的缺点: 代码必须先完成编译和预热两个步骤才能开始执行，所以延迟现象十分严重。通过把服务代码提前编译为本地代码，你不但可以避免延迟问题，而且还能够立即开始运行代码。此外，使用本地代码创建的 Dart 服务属于自包含应用，所占用的磁盘资源也比较小，因此对运行容器的体积要求也会大幅降低。Dart 开发者 Paul Mundt 在 [《初试 Dart 微服务》](https://itnext.io/experiments-with-dart-microservices-fa117aa408c7) 这篇文章中，谈到了对 dart2native 的一些心得体会: 之前使用 JIT 编译器时，Docker 镜像文件的体积为 220MB，转用本地代码后，文件体积缩减至 20MB，降幅高达 91%！更多技术细节，请查看官方文档 [《服务器端应用》](https://dart.dev/tutorials/server/httpserver) 和 [《包》](https://dart.dev/server/libraries#server-packages)。

## **如何获取**

你可从 2.6 及以上版本的 Dart SDK 中获取 dart2native 编译器。请前往 https://dart.dev/get-dart 下载最新版本的 Dart SDK。安装完毕后，你可在 bin/ directory 和 PATH 内找到新的编译器。请前往 Dart.dev 获取 [更多官方文档](https://dart.dev/tools/dart2native)。

通过 Flutter 获取 Dart SDK 的开发者请注意: 当前 Flutter 版本对 dart2native 的支持并不完整。在稳定版 Flutter 提供 Dart 2.6 之前，我们建议你前往 [dart.dev/get-dart](https://dart.dev/get-dart) 下载 Dart 2.6 SDK。

## **已知限制**

初始版本的 dart2native 编译器包含以下已知限制。请前往我们在 Github 上的问题追踪页面，为你关注的问题投票，以便告知我们哪些问题对你最为重要。

* 不提供交叉编译支持 ([Github 问题 28617](https://github.com/dart-lang/sdk/issues/28617)): dart2native 编译器每次只能为一种运行系统创建机器码，因此，如需同时为 macOS、Windows 和 Linux 创建可执行文件，请你分别运行 3 次编译器。或者，你也可以与支持 3 种操作系统的持续集成 (Continuous Integration) 供应商接洽合作，共同解决这类问题。
* 不提供签名支持 ([Github 问题 39106](https://github.com/dart-lang/sdk/issues/39106)): 生成的可执行文件的格式与 codesign 和 signtool 等标准签名工具不兼容。
* 不支持 dart:mirrors 和 dart:developer (请参阅 [Dart 核心库](https://dart.dev/guides/libraries))。

## **Dart 2.6 中的其它变更**

除了 dart2native 编译器之外，Dart SDK 2.6 另外还引入了多项变更。

作为我们新推出的 [C 语言互操作机制](https://dart.dev/guides/libraries/c-interop)，dart:ffi 的首个技术预览版本已随 Dart 2.5 一同发布。Dart 2.6 推出了全新的 dart:ffi，内含多个中断性 (Breaking) API 变更，使得 API 的易用性大幅提升，此外，新版本还提供了更多的类型安全，内存访问也更为便利。请阅读 [《Dart 2.6 变更日志》](https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md#foreign-function-interface-dartffi)，进一步了解详情。引入这些变更后，dart:ffi 已顺利迭代至 Beta 版本，我们预计今后 API 的变更频率将逐步放缓，整体稳定性也会有所提高。欢迎大家继续通过 [Dart 问题追踪器](https://github.com/dart-lang/sdk/issues)，向我们提交反馈。

此外，Dart 2.6 还新增了一款超棒的语言特性: 扩展方法 (Extention methods)。此项功能尚处于预览阶段，在性能优化及工具支持方面仍有不足，我们目前正在收尾相关工作，希望能在下个版本的 Dart SDK 中正式推出该功能，届时将为大家带去更为详尽的功能介绍。如果你有兴趣了解它背后的设计理念，请阅读 [《Dart 扩展方法的基础知识》](https://medium.com/dartlang/extension-methods-2d466cd8b308)。

## **下一步**

即刻下载 Dart 2.6 SDK ([https://dart.dev/get-dart](https://dart.dev/get-dart)), 使用 dart2native 构建精彩应用，并向我们提交使用反馈。
