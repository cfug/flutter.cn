---
title: Dart 2.8 同期发布
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2021/05/w7DjVe.png)

*作者 / Michael Thomsen, Dart & Flutter Product Manager, Google*

我们同样为大家带来了 Dart SDK 的新版本: Dart 2.8。Dart 社区保持着惊人的增长，如今有 [数百万 Flutter 开发者](https://flutter.cn/posts/flutter-spring-2020-update) 使用 Dart 作为针对客户端优化的开发语言，在各个平台上构建高速流畅的应用。我们仍在努力完成 [即将推出的空安全 (null safety) 功能](https://flutter.cn/posts/dart-2-7)，使 Dart 成为一种更优化的语言，打造高速且稳定的用户界面。我们准备了一些激动人心的新功能，让开发者在管理依赖关系时更加高效。

Dart 平台通过 [pub 客户端工具](https://dart.cn/tools/pub/cmd) 和 [pub.dev](https://pub.flutter-io.cn/) package 库内置了代码包管理功能。在过去的一年里，pub.dev package 库增长了 200%，现在已经拥有近 10,000 个 package。作为持续改进 Dart 生态系统的一环，Dart 2.8 SDK 为 pub 客户端工具带来了两个改进: 更强的 pub get 性能，以及一款新工具，可确保你的 package 依赖始终保持最新。

Dart 2.8 还在 Dart 语言和代码库中引入了一些小幅度的重要改动 (Breaking Changes)。这些变更为我们的第一版空安全功能奠定了基础。

## **为空安全奠基**

应用崩溃的一个常见原因是代码试图使用一个恰好为空 (null) 的变量。Tony Hoare 爵士于 1965 年在 ALGOL 编程语言中引入了空引用，他在 [2009 年 QCon 演讲](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/) 中，把空引用称为 "价值十亿美元的错误"。在某些情况下，空值是有用的；但难点在于如何把这些有用的情况甄别出来。在过去的一年中，我们一直忙于在 Dart 中打造 [健全的空安全支持](https://github.com/dart-lang/language/issues/110)。这种支持将扩展类型系统，以表达始终不可空的变量；类型系统也会是完全健全的: Dart 编译器和运行时都将信任这些类型，并能够在类型系统保证变量不为空的情况下生成优化过的代码。

如你所想，这是一项浩大的工程，牵涉到的内容很多。为了确保用简洁的语义构建空安全，我们决定在 Dart 语言和库中引入一些小幅的重要改动。这些重要改动是对 Dart 类型系统边界情况和一些 Dart 核心库所做的小调整，以确保可空性相关的可用性和性能。我们已经在 Dart 公告列表中 [预先宣布](https://groups.google.com/a/dartlang.org/g/announce/c/JwPWiC0jTiU) 了这些改动，而且我们估计这些重要改动对普通应用的代码影响很小。如果你在使用 Dart 2.8 时遇到任何问题，建议你查看这些 [重要改动](https://github.com/dart-lang/sdk/issues/40686)，了解其详情以及应对方法。如果这样依然不能解决问题，请在我们的 [问题反馈页](https://github.com/dart-lang/sdk/issues) 提交报告。想提前体验空安全，请 [通过 DartPad 一睹为快](https://nullsafety.dartpad.cn/53257b6da4cb128dc1e069df64748ed1)。

## **更优质的 package 生态**

Pub package 管理器和 pub.dev 网站为 Dart 和 Flutter 提供了欣欣向荣的生态系统。在 pub.dev 上有近 10,000 个 package，许多有趣的 package 更是让我们拍案叫绝。我们的核心任务之一就是帮助众多作者打造高品质的 package，并帮助开发者找到它们。在这方面我们已经做了一些工作，比如 [改进 pub.dev 的可发现性](https://medium.com/dartlang/improved-discovery-on-the-dart-package-site-9bfe24c3d7d3)，[Verified Publishers](https://medium.com/dartlang/verified-publishers-98f05466558a) (发布者认证)，以及 [Flutter Favorite](https://flutter.dev/docs/development/packages-and-plugins/favorites) 项目。

现在你从 pub.dev 获取 package 的速度会快上许多。我们还提供了一款新工具来帮助你更新所有 package 的依赖关系。现在的应用颇为复杂，很可能依赖几十个 package。如何把它们都更新到最新版本，确保满足最新的依赖关系，并获得所有的 bug 修复和性能优化？从 Dart 2.8 开始，你可以使用 pub outdated，这款新工具将自动判断哪些依赖项需要更新到最新、最合适的版本。

## **Dart 2.8 发布工具性能改进**

我们优化了 pub 工具的性能，在运行 pub get 时会并行获取 package，并且推迟了 pub run 预编译的运行时机。

在使用 flutter create 创建的新项目上运行 flutter pub get 的非正式基准测试，使用 Flutter 1.12 (使用 Dart 2.7) 总执行时间约为 6.5 秒，而在 Flutter 1.17 (使用 Dart 2.8) 中下降至 2.5 秒。在 [Flutter Gallery](https://github.com/flutter/gallery) 这样更大型的应用中，时间则从约 15 秒降到了 3 秒左右！

## **使用 pub outdated 管理依赖**

![]({{site.flutter-files-cn}}/posts/images/2021/05/LpzhUs.gif)

Dart 代码中的依赖关系会被收集到 [pubspec 文件](https://dart.cn/tools/pub/pubspec) 中。当你运行 pub get 命令，从 pub.dev 中获取 package 时，pub 版本求解器 (使用 [PubGrub 算法](https://medium.com/@nex3/pubgrub-2fb6470504f)) 会运行一个进程来得出满足 pubspec 中所有约束条件的所有依赖项的最新版本。请注意，pub 使用的是单版本方案，你的应用中只包含每个 package 的单一版本，这个方案可以确保你的应用获得尽可能小的体积。

始终使用最新的稳定版 package 是 [最佳开发实践](http://dart.cn/tools/pub/dependencies#best-practices) 之一，但这样做会很费力。Dart 支持使用 [pub upgrade](https://dart.cn/tools/pub/cmd/pub-upgrade) 升级到 [语义上兼容](https://dart.cn/tools/pub/dependencies#version-constraints) 的最新版本，但如果不更新 pubspec，就不能包含 package 最新的大版本。pub outdated 命令通过比较当前使用的版本和 pub.dev 上的最新版本，让你知晓小版本和大版本何时可用。

我们来看一个例子。假如你正在构建一款应用，这款应用的 pubspec.yaml 包含下列内容:

![]({{site.flutter-files-cn}}/posts/images/2021/05/9DxuuV.png)

运行 pub get，这款工具会创建一个 pubspec.lock 文件，包含如下版本信息:

![]({{site.flutter-files-cn}}/posts/images/2021/05/FYXC5g.png)

几个月过去了，pub.dev 现在有了新版本的 foo (1.3.1) 和 bar (2.1.0 和 3.0.3)。那么我们如何才能知道这些新版本是可用的？对于小版本升级 (foo 1.4.0 和 bar 2.1.0)，你可以运行 pub upgrade，但这样你不会得到 bar 3.0.0。为了版本更新你不得不访问 pub.dev 上对应 package 的页面来了解详情。或者你也可以尝试社区提供的解决方案，比如 Paulina Szklarska 的 [version checker](https://plugins.jetbrains.com/plugin/12400-flutter-pub-version-checker) 或者 Jeroen Meijer 的 [pubspec assist](https://marketplace.visualstudio.com/items?itemName=jeroen-meijer.pubspec-assist)。

Dart SDK 现在通过 `pub outdated` 支持发现新版本。如果你使用的是支持 Dart 或 Flutter 的 IDE，请使用 **Pub outdated** 指令，这个指令在 `pubspec.yaml` 文件被打开时会显示。或者通过终端运行 `pub outdated` 或者 f`lutter pub outdated` 命令:

![]({{site.flutter-files-cn}}/posts/images/2021/05/B9BoA1.png)

上面的输出结果表明，我们可以使用 pub upgrade 自动升级到 foo 1.3.1，也就是 foo 的最新可用版本。与此同时，虽然我们可以自动升级到 bar 2.1.0，但最新可用的版本其实是 3.0.3。升级到 bar 3.0.3 属于大版本升级，所以我们需要编辑 pubspec.yaml 文件，才能完成升级:

![]({{site.flutter-files-cn}}/posts/images/2021/05/oGr7Qc.png)

在编辑完 pubspec 并运行 pub upgrade 之后，pub outdated 会报告所有的依赖均已是最新版本:

![]({{site.flutter-files-cn}}/posts/images/2021/05/RwkudP.png)

成功更新到最新版本了！由于我们刚才获取了最新的版本，包括一次大版本升级，现在我们需要查看一下这些版本中是否存在重要改动。然后运行各种测试，确保我们的应用可以正常运行。

## **下一步**

性能改善、[重要改动](https://github.com/dart-lang/sdk/issues/40686)，以及全新的 `pub outdated` 命令，现已加入稳定版 [Dart 2.8 SDK](https://dart.cn/get-dart) 和稳定版 [Flutter 1.17 SDK](https://flutter.cn/docs/get-started/install)。我们建议你尽快开始使用 [pub outdated](https://dart.cn/tools/pub/cmd/pub-outdated)，掌握自己项目中依赖的健康状况！

如果你遇到了问题，请前往 [pub 问题反馈页](https://github.com/dart-lang/pub/issues) 报告给我们；如果你遇到了通用问题，请前往 [SDK 问题反馈页](https://github.com/dart-lang/sdk/issues) 进行上报。我们非常期待大家分享 `pub outdated` 的使用体验。
