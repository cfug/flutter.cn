---
title: Flutter 2.10 更新详解
description: Flutter 2.10 更新详解
toc: true
---

Flutter 2.10 版已正式发布！虽然⾃ [上次稳定版本发布](./whats-new-in-flutter-2-8) 以来还不到两个⽉，即使在这么短的时间内，我们也已处理和关闭了 1843 个 Issue，合并了来⾃全球 155 位贡献者的 1525 个 PR。感谢⼤家在 2021 年末的假期期间的出⾊⼯作。

我们有⼏件令⼈兴奋的事情要宣布，包括 Flutter 对 Windows ⽀持的重⼤更新、⼏项重⼤的性能改进、框架中图标和颜⾊的新⽀持以及一些⼯具改进等。此外，该版本还包括移除了 dev 渠道的更新、减少对旧版 iOS 的⽀持以及几个简短的破坏性改动。让我们开始吧！

## 使用 Flutter 构建 Windows 桌面应用支持已经进入稳定阶段

⾸先，Flutter 2.10 版本带来了稳定的 Windows ⽀持，无需再通过 `--enable-windows-desktop` 标记来单独配置 Windows 桌面版应用程序的支持，因为它现在已经默认被启用！

![]({{site.flutter-files-cn}}/posts/images/2022/02/2b8921d82869b.jpg)

当然，此次稳定版发布肯定不只是“删掉”一个标记这么简单 ;-) 在 Flutter 2.10 的 Windows 支持中，也包含了对⽂本处理、键盘处理和键盘快捷键的⼴泛改进，以及直接与 Windows 集成的新方式、⽀持命令行参数、全球化⽂本输⼊和无障碍功能等。

有关 Windows 稳定版发布的更多信息，你可以阅读今天的另一篇推送文章，文章为大家详述了 Flutter 在 Windows 上的架构，同时说明了有多少 Flutter package 和插件已经⽀持 Windows。你还可以查看我们的⼯具和应⽤合作伙伴在 Windows 上使⽤ Flutter 制作的一些⽰例等。

## 引擎的性能改进

此版本的 Flutter 包括由社区成员 [knopp](https://github.com/knopp "Flutter 社区成员 Matej 的 GitHub 主页") 提供的 **绘制脏区管理** 的初步⽀持，他为 [iOS/Metal 上的单个脏区域启⽤了选择性重绘](https://github.com/flutter/engine/pull/28801 "iOS/Metal 上的单个脏区域启⽤了选择性重绘")。这一变化将一些基准测试中九十分位和九十九分位的光栅化时间减少了一个数量级，并将这些基准测试中的 GPU 利⽤率从 90% 以上降低到了 10% 以下。

![优化后的 Skia 渲染基准测试数据 1]({{site.flutter-files-cn}}/posts/images/2022/02/fa73031f55ece.jpg)

我们希望在未来的版本中，[将选择性重绘的优势引入到其他平台](https://github.com/flutter/engine/pull/29591 "将选择性重绘的优势引入到其他平台")。

在 [Flutter 2.8](./whats-new-in-flutter-2-8)。而在 Flutter 2.10 中，我们已经开始使⽤它 (`DisplayList`) 进行优化。例如，**[一种常见不透明层的情况现在已经以更高效的方式实现](https://github.com/flutter/engine/pull/29775 "一种常见不透明层的情况现以更高效的方式实现")**。即使在最坏的情况下，在我们基准测试中每帧光栅化时间也下降到了先前的三分之一以下。

![优化后的 Skia 渲染基准测试数据 2]({{site.flutter-files-cn}}/posts/images/2022/02/7ef05091b9321.jpg)

随着我们继续开发记录格式，将来会继续将该优化扩展到更多的场景。

在 profile 和 release 模式下，Dart 代码将以 AOT 方式编译。这段代码的轻量和高效的关键来源于整个程序的类型流分析，它解锁了许多编译器优化和激进的摇树优化 (tree-shaking)。但由于类型流分析必须涵盖整个程序，因此可能会有些消耗性能。新版本带来了 [更快的类型流分析实现](https://dart.googlesource.com/sdk.git/+/e698500693603374ecc409e158f36c25bff45b12 "Flutter 新版本带来了更快的类型流分析实现")。在我们的基准测试中，Flutter 应⽤的总体构建时间下降了约 10%。

![优化后的构建时间]({{site.flutter-files-cn}}/posts/images/2022/02/869bf3b91639b.jpg)

与往常一样，性能增强、减少内存使⽤和减少延迟是 Flutter 团队的⾸要任务。期待未来版本的进一步改进。

## iOS 平台更新

除了性能改进之外，我们还添加并增强了一些特定平台的功能。[luckysmg](https://github.com/luckysmg "luckysmg") 就为我们带来了一项 [iOS 上新的增强功能——更流畅的键盘动画](https://github.com/flutter/engine/pull/29281 "iOS 上新的增强功能——更流畅的键盘动画")，它会⾃动应用在你的应用中。

![iOS 键盘过渡动画]({{site.flutter-files-cn}}/posts/images/2022/02/6bd64fc2cc49f.gif)


除此以外，我们还通过修复一些 [边缘情况崩溃提⾼了 iOS 相机插件的稳定性](https://github.com/flutter/plugins/pull/4619 "边缘情况崩溃提⾼了 iOS 相机插件的稳定性")。

最后，**我们为 64 位架构的 iOS 系统加入减少内存使⽤的新功能：[压缩指针](https://github.com/flutter/engine/pull/30077 "我们为 64 位架构的 iOS 系统加入减少内存使⽤的新功能: 压缩指针")。**

64 位架构将指针表⽰为 4 字节大小的数据结构。当你有大量对象时，指针本⾝占⽤的空间会增加应⽤整体的内存占用，特别是如果你的应⽤更庞大更复杂时，这些应⽤有更多的 GC 抖动。然而，iOS 应⽤不太可能有⾜够的对象来占⽤大部分的 32 位地址空间（20 亿个对象），更不⽤说庞⼤的 64 位地址空间（900 亿个对象）了。

Dart 2.15 中引入了压缩指针的功能，在这次发布的 Flutter 版本中，我们使⽤这项功能来减少 64 位 iOS 应⽤的内存使⽤量。你可以查看 [Dart 2.15 博客⽂章](./announcing-dart-2-15) 了解详细信息。

与此同时，Dart 2.16 稳定版也正式发布，我们将在稍微晚些的时间发布 Dart 2.16 的更新内容，敬请关注。

## Android 平台更新

Flutter 2.10 版本还包含许多针对 Android 平台的改进。现在在默认情况下，当你创建新应⽤时，**Flutter 默认⽀持最新版本的 Android**，即 Android 12（API 级别 31）。此外，在此版本中，我们启⽤了 [multidex](https://developer.android.google.cn/studio/build/multidex "为你的构建启⽤ multidex") ⾃动⽀持。如果你的应⽤⽀持低于 21 的 Android SDK 版本，并且超过了 64K 的 dex ⽅法数限制，只需将 `--multidex` 参数传递给 `flutter build appbundle` 或 `flutter build apk` 命令，你的应⽤就会增加 multidex 的⽀持。

最后，在我们收到开发者们对于 Gradle 抛出让人费解的错误消息的反馈后，我们调整了 Flutter 命令行工具，现在它将 **为常⻅问题提供解决方法**。例如，如果你向你的应⽤添加了一个插件，该插件需要你提⾼最低支持的 Android SDK 版本，你现在会在错误信息中看到「Flutter Fix」的建议。

![Gradle 错误提示]({{site.flutter-files-cn}}/posts/images/2022/02/37d95f749a27e.jpg)

我们将继续为常⻅错误消息添加更多解决方法的建议，并希望获得你对其他错误消息的反馈，这些错误消息将显著帮助开发者处理同类问题。

## Web 平台更新

此版本还包含对 Web 平台的一些改进。例如，在先前的版本中，当鼠标拖动到多行文本框的边缘时，它不会正确地跟随滚动。在此版本中，当选择光标拖出了文本框时，文本框会进行滚动，浏览并选中对应的文字内容。此行为同时适⽤于 Web 平台和桌⾯端。

![在 Web 平台选中并拖拽 TextField 光标]({{site.flutter-files-cn}}/posts/images/2022/02/516ce9d6c26e3.gif)

Flutter 2.10 还包括对 Web 平台的另一项显著改进，我们也一直在寻求减少将 Flutter 应用运行到 Web 平台的开销，在先前的版本中，每次我们想要将原⽣ HTML 的 widget 引⼊ Flutter 应⽤时，我们都需要一个覆盖层 (Overlay) 作为我们对 Web 的平台视图 (Platform view) ⽀持的一部分。这些叠加层中的每一个都⽀持⾃定义绘制，但同时也代表了一定数量的性能开销。如果你的应⽤中有⼤量原⽣ HTML 的 widget (例如链接)，那这将造成非常大性能开销。在这个版本中我们为 Web 平台构建了一个新的「⾮绘制的平台视图」，已经基本上消除了这种开销。我们已经 [将这种优化](https://github.com/flutter/plugins/pull/4578 "使用⾮绘制的平台视图优化") 应用到 [Link widget](https://pub.flutter-io.cn/documentation/url_launcher/latest/link/Link-class.html "Link widget API 文档") 中，这意味着如果你的 Flutter Web 应⽤中有⼤量的链接，它们将不再产生额外的性能消耗。随着时间的推移，我们会将此优化应⽤到其他的 widget。

## Material 3

此版本是向 Material 3 过渡的开始，其中包括 [从单一种⼦颜⾊⽣成整个配⾊⽅案](https://github.com/flutter/flutter/pull/93463 "从单一种⼦颜⾊⽣成整个配⾊⽅案") 的能力。

你可以使用任意颜色来创建新的 `ColorScheme` 类型：

```dart
final lightScheme = ColorScheme.fromSeed(seedColor: Colors.green);
final darkScheme = ColorScheme.fromSeed(seedColor: Colors.green, brightness: Brightness.dark);
```

`ThemeData` 的构造函数还有一个新的 `colorSchemeSeed` 参数，可以直接从颜色⽣成主题的配⾊⽅案：

```dart 
final lightTheme = ThemeData(colorSchemeSeed: Colors.orange, ...); 
final darkTheme = ThemeData(colorSchemeSeed: Colors.orange, brightness: Brightness.dark, ...); 
```

此外，此版本包括了 **`ThemeData.useMaterial3` 的参数，它可以将 widget 切换到新的 Material 3 外观**。

最后，我们添加了 [1028 个新的 Material 图标](https://github.com/flutter/flutter/pull/95007 "添加了 1028 个新 Material 图标的 PR")。

![1028 个图标的部分预览]({{site.flutter-files-cn}}/posts/images/2022/02/8f784a556bba2.jpg)

你可以在 [这个 issue 中](https://github.com/flutter/flutter/issues/91605 "在这里跟进 Material 3 的接入情况") 跟进 Material 3 的接入情况，并随时留下你的意见反馈。 

## 集成测试改进

2020 年 12 ⽉，我们宣布了使⽤ `integration_test` 进行端到端测试的新⽅法，查看中文文档 [集成测试介绍](https://docs.flutter.cn/cookbook/testing/integration/introduction "中文文档: 集成测试介绍") 了解更多。这个新的 package 取代了 `flutter_driver` 作为进行集成测试的推荐⽅式，提供了新功能，如 Firebase 测试实验室⽀持以及对 Web 和桌⾯的⽀持。

从那时起，我们对集成测试进行了进一步改进，包括 **将 `integration_test` package 内置在 Flutter SDK 中**，使其更容易与你的应⽤集成。现在，我们撰写了一份新的迁移指南，帮助你 [从 flutter_driver 测试迁移到 integration_test](https://docs.flutter.cn/testing/integration-tests/migration "从 flutter_driver 测试迁移到 integration_test")。

[现有的⽂档](https://docs.flutter.cn/testing/integration-tests "集成测试说明⽂档")、[示例](https://github.com/flutter/samples/tree/master/testing_app "集成测试示例") 和 [codelab](https://codelabs.developers.google.com/codelabs/flutter-app-testing "集成测试的 codelab") 也已针对 `integration_test` 进行了更新。如果你还没有在 Flutter 应⽤上使⽤ `integration_test`，那么从现在就开始吧！

## DevTools

在这个版本中，我们也在 Flutter DevTools 上做了一些改进⼯作，包括从命令行直接使⽤ DevTools 的简易功能。现在你⽆需使⽤ `pub global activate` 来下载和运行最新版本的 devtools，只需简单地使⽤ `dart devtools` 获取与你正在使⽤的 Flutter 版本一致的最新版本即可。

我们还进行了一些 [可⽤性更新](https://github.com/flutter/devtools/pull/3493 "为 DevTools 加入可⽤性更新的 PR")，包括 [改进在调试器变量窗格中检查⼤型列表和映射](https://github.com/flutter/devtools/pull/3497 "改进在调试器变量窗格中检查⼤型列表和映射") 的⽀持（感谢 [Elliott](https://github.com/elliette "Elliott 的 GitHub 主页")）。

![在 DevTools 中查看大型列表和映射]({{site.flutter-files-cn}}/posts/images/2022/02/aaff408a25f10.gif)

最后，我们即将发布年度 DevTools 问卷调查！请提供你的反馈并帮助我们改善你的开发体验。

![该调查提⽰将在 2 ⽉中旬的某个时间直接显⽰在 DevTools 中，敬请参与并踊跃反馈！]({{site.flutter-files-cn}}/posts/images/2022/02/2f802a49c7f72.jpg)

## VSCode 改进

Flutter 的 Visual Studio Code 扩展也获得了许多增强功能，包括 **在代码的更多位置预览颜色** 以及 [可更新颜色代码的颜⾊选择器](https://github.com/Dart-Code/Dart-Code/issues/3240 "VS Code 中加入了可更新颜色代码的颜⾊选择器")。

![VSCode 的 Flutter 颜色选择器]({{site.flutter-files-cn}}/posts/images/2022/02/bcc4017326ad4.gif)

此外，如果你想成为 VSCode 的 Dart 和 Flutter 扩展的预发布版本的测试⼈员，你可以 [在你的扩展设置中切换到预发布版本](https://github.com/Dart-Code/Dart-Code/issues/3729 "将 Dart 和 Flutter 扩展切换到预发布版本")。

![使用预发布版本的插件]({{site.flutter-files-cn}}/posts/images/2022/02/dc881f95347ef.jpg)

你可以在 flutter-announce 邮件列表的 [这一篇](https://groups.google.com/g/flutter-announce/c/lR-yn1s9HKk "flutter-announce 邮件列表中关于 VS Code 插件改进的文章") 阅读有关此更新的详细信息。

## 移除 dev 版本发布渠道

在 Flutter 2.8 版本中，我们宣布我们正在努力移除 dev 版本发布渠道，以简化你的选择并减少研发的开销。在这个版本中，我们已经完成了这项⼯作，包括：

- 更新 Flutter ⼯具以帮助将开发⼈员迁移出开发频道 
- 更新 wiki 对于各个渠道的说明和承诺
- 更新弃⽤政策
- 从 DartPad、预提交测试和⽹站中删除 dev 渠道的⽀持

Dev 渠道现已被彻底移除。如果我们漏了一些没有移除的位置，请告诉我们。

## 对 iOS 9.3.6 的⽀持进入尾声

由于我们实验室中⽬标设备的使⽤减少和维护难度增加，我们正在 [调整对于 iOS 9.3.6 的支持]({{site.flutter-files-cn}}/flutter-design-docs/RFC_Move_32-bit_iOS_to_Best_Effort_Tier.pdf "RFC 文档: 调整对于 iOS 9.3.6 的支持")，[从「⽀持」到「尽力⽽为」](https://docs.flutter.cn/development/tools/sdk/release-notes/supported-platforms "对于 iOS 9.3.6 的支持从「⽀持」到「尽力⽽为」")。这意味着对 iOS 9.3.6 的⽀持和对 32 位 iOS 设备的⽀持将仅通过编码实践、Ad-Hoc 和社区测试来维护了。 

我们预计在 2022 年第三季度的 Flutter 稳定版本中放弃对 32 位 iOS 设备以及 iOS 版本 9 和 10 的 ⽀持。这意味着基于稳定的 Flutter SDK 构建的应⽤将不再在 32 位 iOS 设备上运行，并且 Flutter ⽀持的最低 iOS 版本将增加到 iOS 11。

## 破坏性改动

我们还努力在每个版本和此版本中减少破坏性改动，尽管我们还没有完全归零，但我们会继续努力！

- [构建 Flutter 应用的 Kotlin 版本应高于 1.5.31](https://docs.flutter.cn/release/breaking-changes/kotlin-version "构建 Flutter 应用的 Kotlin 版本应高于 1.5.31")
- [Flutter 2.5 之后移除的已弃用的 API](https://docs.flutter.cn/release/breaking-changes/2-5-deprecations "Flutter 2.5 之后移除的已弃用的 API")
- [Web 上的原始图像使用正确的来源和颜色](https://docs.flutter.cn/release/breaking-changes/raw-images-on-web-uses-correct-origin-and-colors "Web 上的原始图像使用正确的来源和颜色")
- [Apple Pencil 随手写 TextInputClient 变动](https://docs.flutter.cn/release/breaking-changes/scribble-text-input-client "Apple Pencil 随手写 TextInputClient 变动")

如果你仍在使⽤这些 API，可以阅读 [flutter.cn 上的迁移指南](https://docs.flutter.cn/release/breaking-changes "flutter.cn 上的迁移指南")。一如既往，⾮常感谢社区贡献测试，帮助我们识别这些破坏性改动。

## 总结

谨代表 Google Flutter 团队的所有成员向大家说一声谢谢，感谢你成为社区的一员！有了社区的帮助，Flutter 才能成为最受欢迎的跨平台 UI 工具。尽管对 Windows 的稳定⽀持才刚刚开始，但我们已经开始期待我们将共同构建的一切！

## 致谢

- 原文: What’s New in Flutter 2.10
- 链接: https://medium.com/flutter/whats-new-in-flutter-2-10-5aafb0314b12
- 翻译: Alex
- 审校: Vadaski / Luke
- 制图: Lynn
