---
title: Dart 2.14 版现已发布
description: Dart 2.14 版现已发布
toc: true
---

*支持 Apple Silicon，增加了默认的 lint、更好的工具和新的语言功能提高生产力。*

本月，我们发布了 Dart SDK 2.14 的正式版，新的版本旨在通过独特的可移植性、生产力和稳健性组合来打造构建应用程序的最佳平台。这一次，我们对 Apple Silicon 提供了更好的支持，并提供了许多增强生产力的功能，例如用于通过代码样式分析在你编写代码时捕获错误的标准 lint 代码规则、更快的发布工具、更好的级联代码格式以及一些小的语言特性更新。

![]({{site.flutter-files-cn}}/posts/flutter-cn/2021/announcing-dart-2-14/announcing-dart-2-14.png){:width="85%"}

自 Apple 在 2020 年末发布新的 [Apple 芯片](https://support.apple.com/zh-cn/HT211814 "Apple 芯片") 处理器芯片以来，我们一直致力于更新 Dart SDK 以增加对新处理器上的原生运行支持。所需的更新已经在 dev 渠道中提供了一段时间，过去一个月，beta 渠道也提供了支持，从 Dart 2.14.1 开始，可以在 Dart stable 渠道中使用啦。当你 [下载](https://dart.cn/get-dart "下载") 一个 macOS 的 SDK 时，确保要选择 ARM64 选项。请注意，与 Flutter SDK 中捆绑的 Dart SDK 还没有支持这些改进。

这些支持包括了在 Apple 芯片上运行 SDK 和 Dart 虚拟机，也支持了在 Apple 芯片上编译运行的可执行文件 (使用 [dart compile](https://dart.cn/tools/dart-compile "dart compile") 命令)。由于 Dart 命令行工具使用原生 Apple 芯片支持，因此它们的启动速度要快得多。

开发者们通常会更偏向让代码遵循某种风格。这些规则中有许多并不只是风格上的偏好 (比如众所周知的 tab 与空格的讨论)，而且涵盖了可能导致错误或引入错误的编码风格。例如，Dart 风格指南要求对所有控制流结构使用花括号，如 if-else 语句。这可以防止经典的「悬空 else」问题，即在有多个嵌套的 if-else 语句时存在歧义。另一个例子则是类型推断，虽然在声明具有初始值的变量时，使用类型推断没有问题，但在 [声明未初始化的变量](https://dart-lang.github.io/linter/lints/prefer_typing_uninitialized_variables.html "声明未初始化的变量") 时手动指定类型就相当重要，这样可以确保类型安全。

保持良好代码风格当然也可以选择某种人工审查的形式，也就是我们熟悉的 code review。但是，在编写代码时运行静态分析来强制要求执行规则，通常要更为有效。

在 Dart 中，这种静态分析是高度 [可配置的](https://dart.cn/guides/language/analysis-options "可配置的")，我们有 [数百条样式规则](https://dart.cn/tools/linter-rules "数百条样式规则") (也称为 lints)。有了这么丰富的选项，可能会导致我们不知道选择要启用哪个规则。Dart 团队维护了一个 [Dart 风格指南](https://dart.cn/guides/language/effective-dart/style "Dart 风格指南")，它描述了我们认为编写和设计 Dart 代码的最佳实践，在此之前我们还没有提供正式的官方风格指南的 linter 规则。

许多开发者，也包括 pub.dev 网站的 [评分](https://pub.flutter-io.cn/help/scoring "评分") 引擎都在使用一个名为 [pedantic](https://github.com/google/pedantic "pedantic") 的 lint 规则。然而，pedantic 起源于谷歌内部的 Dart 风格指南，由于历史原因，它与一般的 Dart 风格指南并不相同。因此，Flutter 框架从未使用过 pedantic 规则集，而是有自己的一套规范性规则。

这听起来可能有点乱，不过确实如此。但是在这次的版本发布中，我们很高兴地宣布，我们现在拥有了一套全新的 lint 集合来实现样式指南，并且 Dart 和 Flutter SDK 已更新为默认情况下将这些规则集用于新项目。这些规则集包括：

- [package:lints/core.yaml](https://github.com/dart-lang/lints/blob/main/lib/core.yaml "package:lints/core.yaml"): Dart 风格指南中的主要规则，我们认为所有 Dart 代码都应该遵循该规则。pub.dev 评分引擎已更新，使用这些规则代替 pedantic。
- [package:lints/recommended.yaml](https://github.com/dart-lang/lints/blob/main/lib/recommended.yaml "package:lints/recommended.yaml"): 核心规则，加上额外的推荐规则。这套规则被推荐用于所有一般的 Dart 代码。
- [package:flutter_lints/flutter.yaml](https://github.com/flutter/packages/blob/master/packages/flutter_lints/lib/flutter.yaml "package:flutter_lints/flutter.yaml"): 核心和推荐规则，加上额外的 Flutter 专用推荐规则。这套规则被推荐用于所有 Flutter 代码。

如果你现有的项目中使用了 pedantic，我们强烈建议你升级到这些新规则集。从 pedantic 升级 [只需几步](https://github.com/dart-lang/lints#migrating-from-packagepedantic "只需几步")。

我们对 Dart 格式化器格式化 [级联](https://dart.cn/guides/language/language-tour#cascade-notation "级联") 代码的方式进行了一些优化。以前，格式化器在某些情况下会产生混乱的格式化。例如，在这个例子中，`doIt()` 是怎么被调用的？

```dart
var result = errorState ? foo : bad..doIt();
```

看上去它总会被 `bad` 调用，但实际上级联适用于整个 ? 表达式，所以级联是在该表达式的结果上调用的，而不仅仅是在 `false` 子句上，新的格式化器会清晰地表明这一点：

```dart
var result = errorState ? foo : bad
 ..doIt();
```

其他的变化还涉及如何对有多个级联的行进行格式化，以及级联一般缩进多远。我们还大大提高了包含级联的代码的格式化速度；在为 [协议缓冲区](https://developers.google.cn/protocol-buffers/docs/reference/dart-generated "协议缓冲区") 生成的 Dart 代码中，我们看到格式化速度 <highlight>提高了 10 倍</highlight>。

有关该问题的所有详细信息，请参阅和跟踪这个 [Pull Request](https://github.com/dart-lang/dart_style/pull/1033 "Pull Request")。

目前，当你 [发布](https://dart.cn/tools/pub/publishing "发布") 一个 package 到 [pub.dev](https://pub.flutter-io.cn/ "pub.dev 社区仓库") 社区仓库时，`pub` 便会捕获该文件夹中的所有文件，但是会跳过隐藏的文件 (那些以点 `.` 开头的文件) 和 `.gitignore` 中列出的文件。一些开发者需要能够控制哪些文件在 `.gitignore` 的列表之外被忽略。例如，你可能在一个 `tool/` 文件夹里有一些内部开发工具，你用来维护你的 package，但这些工具与使用你 package 的人没有关系。

Dart 2.14 中更新的 `pub` 命令支持新的 `.pubignore` 文件，你可以在其中列出不想上传到 pub.dev 的文件。此文件使用与 `.gitignore` 文件相同的格式。详细信息，请参阅 [package 发布文档](https://dart.cn/tools/pub/publishing#what-files-are-published "package 发布文档")。

虽然 `pub` 可能最常用于管理代码的依赖性，但它也有第二个重要用途：提供强大的工具支持。其中一个例子就是 Dart 测试工具，通过 `dart test` 命令使用。这个命令实际上只是 `pub run test:test` 命令的一个包装，它运行 [package:test](https://github.com/dart-lang/test/blob/master/pkgs/test/bin/test.dart "package:test") 中的测试入口。在调用该入口之前，`pub` 首先将其编译为可以更快地运行的本地代码。

在 Dart 2.14 之前，对 `pubspec` 的任何更改 (包括与 `package:test` 无关的更改 ) 都会使此测试构建无效，并且你会看到一堆这样的输出，其中包含「预编译可执行文件」：

```console
$ dart test
Precompiling executable... (11.6s)
Precompiled test:test.
00:01 +1: All tests passed!
```

在 Dart 2.14 中，`pub` 对何时取消构建步骤变得更加智能，因此只有当版本改变时才会进行构建。此外，我们改进了使用并行化来执行构建步骤的方式，因此该步骤本身会完成得更快。在我们测试的一些 package 上，我们看到它只用了一半的时间。

Dart 2.14 还包含了一些小的语言特性。这一次，我们把重点放在更具体的改进上，这些改进可能只是一些细小的功能，但却能实现以前不支持的更专业的用例。

首先，我们添加了一个新的 [三重移位](https://github.com/dart-lang/language/issues/120 "三重移位") 运算符 (`>>>`)。这类似于现有的移位运算符 (`>>`)，但其中 `>>` 执行算术移位，`>>>` 执行逻辑或无符号移位，其中无论被移位的数字是正数还是负数，零位都会被移入最高有效位。

我们还删除了对类型参数的旧限制，该限制不允许使用泛型函数类型作为类型参数。以下所有内容在 2.14 之前都是无效的，但现在是允许的：

```dart
late List<T Function<T>(T)> idFunctions;
var callback = [<T>(T value) => value];
late S Function<S extends T Function<T>(T)>(S) f;
```

最后，我们对注解类型做了一个小小的调整 (像 [@Deprecated](https://api.dart.cn/stable/2.13.4/dart-core/Deprecated-class.html "@Deprecated") 这样注解在 Dart 代码中通常用来捕获元数据)。以前注解不能传递类型参数，所以像 `@TypeHelper<int>(42, "The meaning")` 这样的代码是不允许的。现在这个限制已经被移除。

我们对核心 Dart package 和代码库进行了许多增强，包括：

- `dart:core`: 向 Object 类添加了静态方法 `hash` 、`hashAll` 和 `hashAllUnordered`。这些可用于以一致的方式组合多个对象的哈希码 ([hashAll 示例](https://api.dart.cn/stable/2.14.0/dart-core/Object/hashAll.html "hashAll 示例"))；
- `dart:core`: 本机 DateTime 类现在可以更好地处理本地时间，而不是精确到一小时的夏令时更改——例如澳大利亚豪勋爵岛，它有 30 分钟的时差偏移；
- [package:ffi](https://pub.flutter-io.cn/packages/ffi "package:ffi"): 添加了对使用 [arena](https://pub.flutter-io.cn/documentation/ffi/latest/ffi/Arena-class.html "arena") 分配器管理内存的支持 ([示例](https://github.com/dart-lang/sdk/blob/master/samples/ffi/resource_management/arena_sample.dart "使用 arena 分配器管理内存的示例"))。Arenas 是一种 [基于区域的内存管理](https://en.wikipedia.org/wiki/Region-based_memory_management "基于区域的内存管理") 形式，一旦退出 arena/region 就会自动释放资源；
- [package:ffigen](https://pub.flutter-io.cn/packages/ffigen "package:ffigen"): 现在支持从 C 类型定义生成 Dart 类型定义。

Dart 2.14 还包含一些较小的、已经 [提前宣布过的](https://github.com/dart-lang/sdk/blob/master/docs/process/breaking-changes.md "提前宣布过的破坏性更新") 破坏性更新 (breaking changes)。预计这些变化只会影响一些特别的用例，这些破坏性更新如下：

## [#46545](https://github.com/dart-lang/sdk/issues/46545 "#46545"): 取消对 ECMAScript5 的支持

[所有的现代浏览器](https://caniuse.com/es6 "所有的现代浏览器") 都已支持最新的 ECMAScript 版本，所以两年前我们 [宣布了](https://groups.google.com/a/dartlang.org/g/announce/c/x7eDinVT6fM/m/ZSFl2a9tEAAJ "宣布不再支持 ES5") 一项计划，不再支持 ECMAScript 5 (ES5)。这使我们能够利用最新的 ECMAScript 的改进，生成更小的输出。在 Dart 2.14 中，这项工作已经完成，Dart Web 编译器不再支持 ES5 了，因此，较旧的浏览器 (例如 IE11 ) 将不再支持。

## [#46100](https://github.com/dart-lang/sdk/issues/46100 "#46100"): 弃用 stagehand、dartfmt 和 dart2native

在 2020 年 10 月的 [Dart 2.10 博客文章中](https://medium.com/dartlang/announcing-dart-2-10-350823952bd5 "Dart 2.10 博客文章中")，我们宣布了将所有 Dart CLI 开发人员工具组合成一个单一的组 `dart` 命令工具 (类似于 flutter 命令工具) 的工作。作为这一演变的一部分，Dart 2.14 弃用了以前 `dartfmt` 和 `dart2native` 命令，并停止了 `stagehand`。这些工具在 [统一的 dart 命令工具中](https://dart.cn/tools/dart-tool "统一的 dart 命令工具中") 都有等价的替代品。

## [#45451](https://github.com/dart-lang/sdk/issues/45451 "#45451"): 弃用 VM 原生扩展

我们已经弃用了 Dart VM 的原生扩展，这是我们从 Dart 代码调用原生代码的旧机制。Dart [FFI](https://dart.cn/guides/libraries/c-interop "FFI") (外部功能接口) 是我们当前用于这个用例的机制，我们正在积极 [发展](https://mp.weixin.qq.com/s/pmfJ3Q8wJ_fM0VTNWeaSqg) 它以使其功能更加强大且易于使用。

我们在 3 月份的 [Dart 2.12](/posts/announcing-dart-2-12) 版本中推出了健全的空安全。空安全是 Dart 最新的主要生产力特性，旨在帮助你避免空值错误，这是一类通常难以发现的错误。

自从我们上次更新以来，我们看到现有 package 和应用程序的迁移取得了巨大的进展，以实现空安全 的健全检查优势。对于 pub.dev 上的 package，前 250 名的 package 中 100% 都已支持了空安全，前 1000 名中有 94% 都支持。这意味着更多的开发者可以用完全 [健全的空安全](https://dart.cn/null-safety/unsound-null-safety#sound-and-unsound-null-safety "健全的空安全") 来运行他们的应用。分析显示，56% 的 `flutter run` 命令以完全健全的方式执行。感谢生态系统中的所有开发者，感谢你们的迁移工作!

包含上述变化的增强型 Dart SDK 已经可以在 Dart 2.14.1 和 [Flutter 2.5](/posts/whats-new-in-flutter-2-5) SDK 中使用。我们希望你会喜欢这些新的改进和功能。

## 感谢 Dart 社区

另外，我们想借此机会向 Dart 社区表示感谢。通过最近对编程语言调查的一些更新，可以看到 Dart 的势头很强劲。备受尊敬的 [RedMonk 排名中](https://redmonk.com/sogrady/2021/08/05/language-rankings-6-21/ "RedMonk 排名中") 提到了 "Dart 的显著上升"，并首次将 Dart 列入前 20 名。StackOverflow 的 [2021 年开发者综合调查](https://insights.stackoverflow.com/survey/2021#technology-most-loved-dreaded-and-wanted "2021 年开发者综合调查") 同样让人欣喜。据报道，Dart 是开发人员最喜爱的第七种编程语言。我们真的很高兴看到 Dart 平台有持续的增长和发展势头。

*感谢 flutter.cn 社区成员 (@AlexV525、@Vadaski、@MeandNi) 以及 Lynn 对本文的审校和贡献。*
