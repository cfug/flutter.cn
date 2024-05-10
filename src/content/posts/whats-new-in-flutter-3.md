---
title: Flutter 3 更新详解
toc: true
keywords: Flutter 3, Flutter 3 新特性
description: 深入了解最新版本，包括 macOS 和 Linux 平台的稳定支持、多项性能改进等！
image:
    path: https://files.flutter-io.cn/posts/images/2022/05/TCPW12.png
---

*作者 / Kevin Jamaul Chisholm, Technical Program Manager for Dart and Flutter at Google*

又到了 Flutter 稳定版发布时间，我们无比自豪地宣布推出 [**Flutter 3**](https://flutter.cn/posts/introducing-flutter-3) ！仅 3 个月前，我们宣布了 [Flutter 对 Windows 的支持](https://flutter.cn/posts/announcing-flutter-for-windows)。现在，我们再次怀着激动的心情宣布，继 Windows 之后，Flutter 现已稳定支持 macOS 和 Linux！

我们总计合并了 5,248 条 PR，感谢各位 Flutter 贡献者的辛勤工作！

此版本中激动人心的升级包括: 更新了 Flutter 对 macOS 和 Linux 的支持，性能得到了显著提升，针对移动设备和 web 端的更新，以及诸多其他功能！此外，我们还带来了关于减少对旧版 Windows 提供支持的消息，以及几条重大变更。下面让我们直奔主题吧！

## **全桌面平台生产就绪**

Linux 和 macOS 平台的支持已进入稳定状态，内含下列功能:

### **级联菜单和 macOS 系统菜单栏支持**

现在你可以使用 `PlatformMenuBar` widget 在 macOS 上创建平台渲染的菜单栏，支持插入仅限该平台使用的菜单，并控制 macOS 应用菜单中的显示内容。

![△ 级联菜单示意](https://files.flutter-io.cn/posts/images/2022/05/QHCvSV.gif)

△ 级联菜单示意

### **完整支持全桌面平台多国文本输入**

全部三种桌面平台完整支持多国文本输入，包括使用文本 [输入法编辑器](https://en.wikipedia.org/wiki/Input_method) (IME) 的语言，如中文、日文和韩文。同时支持第三方输入法，如搜狗 (Sogou)、谷歌日文输入法 (Google Japanese Input) 等。

### **全桌面平台无障碍服务**

Flutter 支持 Windows、macOS 和 Linux 平台的无障碍服务，包括屏幕文字阅读、无障碍导航和颜色反转等。

### **macOS 平台默认使用通用二进制文件**

在 Flutter 3 中，Flutter macOS 桌面应用会被构建为通用二进制文件，从而原生支持使用 Intel 处理器的 Mac 电脑和搭载 Apple Silicon 的新设备。

### **不再支持使用 Windows 7/8 进行开发**

此版本将建议的 Windows 开发版本提升为 Windows 10。虽然我们不会禁止使用旧版本 (Windows 7、Windows 8、Windows 8.1) 进行开发，但由于 [Microsoft 不再支持这些旧版本](https://docs.microsoft.com/en-us/lifecycle/faq/windows)，我们仅会针对这些版本提供有限的测试。尽管我们会尽力为旧版本提供支持，但还是建议你升级版本。

*注意: 在 Windows 7 和 8 上依然可以运行 Flutter 应用，此更改只影响我们推荐使用的开发环境。*

## **移动端更新**

我们针对移动端的更新包括:

### **支持可折叠设备**

Flutter 3 支持可折叠移动设备。通过由 Microsoft 牵头的合作，让大家可以使用新的功能和 widget 在可折叠设备上创建动感、愉悦的体验。

作为合作的一部分，[MediaQuery](https://api.flutter-io.cn/flutter/widgets/MediaQuery-class.html) 现在包含一个 [DisplayFeature](https://api.flutter-io.cn/flutter/dart-ui/DisplayFeature-class.html) 列表，用以描述设备组件状态，包括铰链、折叠状态和屏幕刘海等。此外，[DisplayFeatureSubScreen](https://api.flutter-io.cn/flutter/widgets/DisplayFeatureSubScreen-class.html) widget 包含的子 widget 的位置现在不会与 `DisplayFeature` 的边界重叠，并且已经用于框架的默认对话框和弹出窗口，使 Flutter 默认即可动态适应这些元素的位置。

![](https://files.flutter-io.cn/posts/images/2022/05/Nqhj5g.png)

非常感谢 Microsoft 团队。另外我们还要特别鸣谢 [@andreidiaconu](https://github.com/andreidiaconu) 所做出的贡献！

欢迎大家尝试[ Surface Duo 模拟器示例](https://docs.microsoft.com/en-us/dual-screen/flutter/samples)，其中包含了 Flutter Gallery 的一个特别派生版本，以便了解 Flutter 在双屏中的实际运行情况:

### **支持 iOS 可变刷新率**

Flutter 现已在使用 ProMotion 显示屏的 iOS 设备上支持可变刷新率，包括 iPhone 13 Pro 和 iPad Pro。在这些设备上 Flutter 应用的渲染刷新率可达 120 Hz，而之前最高为 60 Hz，这使得滚动等快速动画的观感体验更加流畅。请查看 [官方文档](https://docs.google.com/document/d/1O-ot6MydAl5pAr_XGnpR-Qq5A5CPDF6edaPu8xQtgCQ/edit?resourcekey=0-LlXeGtGRC67XL4NrGoc91A) 了解详情。

### **简化 iOS 发布**

我们为 `flutter build ipa` 命令添加了 [新选项](https://github.com/flutter/flutter/pull/97672)，使得 iOS 应用发布更加简便。在你准备好分发至 TestFlight 或 App Store 时，请运行 flutter build ipa 构建 Xcode 归档 (.xcarchive 文件) 和应用软件包 (.ipa 文件)。你可选择添加 --export-method ad-hoc、--export-method development 或 --export-method enterprise 选项。应用软件包构建完成后，即可通过 [Apple Transport macOS 应用](https://apps.apple.com/us/app/transporter/id1450874784) 将其上传至 Apple，或使用 xcrun altool 在命令行中完成上传 (运行 man altool 获取 App Store Connect API 密钥验证说明)。上传完成后，你的应用即可发布至 [TestFlight 或 App Store](https://docs.flutter.cn/deployment/ios#release-your-app-to-the-app-store)。在完成应用显示名称、应用图标等初始 [Xcode 项目设置](https://docs.flutter.cn/deployment/ios#review-xcode-project-settings) 后，你在发布应用时就无需再打开 Xcode 了。

### **Gradle 版本更新**

使用 Flutter 工具创建新项目时，你或许已经注意到，生成的文件现在使用了最新版本的 Gradle 和 Android Gradle 插件。对于现有的项目而言，你需要手动将 Gradle 版本升级至 7.4，Android Gradle 插件版本升级至 7.1.2。

### **停止更新 32 位 iOS/iOS 9/iOS 10**

按照 2022 年 2 月 2.10 稳定版发布的公告，Flutter 对 32 位 iOS 设备以及 iOS 9 和 10 的支持即将结束。这一变化会影响到 iPhone 4S、iPhone 5、iPhone 5C 以及 iPad 第二、三、四代设备。Flutter 3 是最后一个支持上述 iOS 版本和设备的稳定版本。

如需详细了解此项变更，请参阅 [RFC: 终止对 32 位 iOS 设备的支持](https://docs.google.com/document/d/1cc5EOsuTlbf4dTDTwmkD3aKjS8XEbVCIqi9BFct9XHM/edit?resourcekey=0-Iv0gXDx7nSDCe3YDfxDKqw)。

## **Web 端更新**

我们针对 web 端的更新包括:

### **图像解码**

在浏览器支持的情况下，Flutter web 现在可以自动检测并使用 ImageDecoder API。到目前为止，大多数基于 Chrome 的浏览器都添加了此 API，如 Chrome、Edge、Opera、Samsung Browser 等。

这个新 API 使用浏览器内置的图像编解码器在主线程之外异步解码图像。这使得图像解码速度提高 2 倍，而且完全不会阻塞主线程，消除了所有之前由图像引起的卡顿现象。

### **Web 应用的生命周期**

Flutter web 应用的新生命周期 API 提升了灵活性，可实现从托管 HTML 页面控制 Flutter 应用的引导程序，并支持使用 Lighthouse 分析你的应用的性能表现。这适用于许多用例，包括以下常被开发者们提及的场景:

* 启动画面。
* 加载指示器。

* 在 Flutter 应用之前显示的纯 HTML 交互式加载页。

请阅读官方文档 "[自定义 web 应用初始化](https://docs.flutter.cn/development/platform-integration/web/initialization)" 了解详细信息。

## **工具更新**

我们针对 Flutter 和 Dart 工装的更新内容包括:

### **Lint package 更新**

Lint package 2.0 版现已发布:

* [Flutter](https://pub.flutter-io.cn/packages/flutter_lints/versions/2.0.0)
* [Dart](https://pub.flutter-io.cn/packages/lints/versions/2.0.0)

使用 `flutter create` 生成的 Flutter 3 应用将自动启用 2.0 版 Lint 套件。我们建议大家运行 `flutter pub upgrade --major-versions flutter_lints`，将现有应用、package 和插件迁移到 2.0 版，以遵循 Flutter 最新、最优的最佳实践。

Lint 2.0 版中新增的大多数警告都带有自动修复功能。因此，当你在应用的 `pubspec.yaml` 中升级至最新 package 版本后，即可在代码库中运行 `dart fix --apply` 自动修复大多数 Lint 警告 (某些警告仍需部分手动操作)。对于尚未使用 `package:flutter_lints` 的应用、package 或插件，建议开发者按照 [迁移指南](https://docs.flutter.cn/release/breaking-changes/flutter-lints-package#migration-guide) 迁移至最新版本。

### **性能提升**

感谢开源贡献者 [knopp](https://github.com/knopp)，局部重绘已经在支持此功能的 [Android 设备上实现](https://github.com/flutter/engine/pull/29591)。在我们的本地测试中，此功能在 Pixel 4XL 设备上将依照 `backdrop_filter_perf` 基准测试的帧栅格化时间的平均值、90 百分位值和 99 百分位值缩减了 5 倍。现在，iOS 设备和较新版本的 Android 设备上都已实现在单一矩形脏区出现时进行局部重绘。

我们 [进一步提升](https://github.com/flutter/engine/pull/30957) 了简单用例中不透明度动画的性能。具体而言，当 `Opacity` widget 只包含单个渲染原语时，通常由 `Opacity` widget 调用的 `saveLayer` 方法可以省略。在为此优化构建的基准测试中，此用例下的栅格化时间提升了 [一个数量级](https://flutter-flutter-perf.skia.org/e/?begin=1643063115&end=1644004520&keys=X32827d8819e8271e025f50e77bf2bec0&requestType=0&xbaroffset=27447)。在今后的版本中，我们计划为更多场景应用此优化。

在开源贡献者 [JsouLiang](https://github.com/JsouLiang) 的努力下，引擎的光栅和界面线程在 Android 和 iOS 上的运行优先级已经高于其他线程 (比如 Dart VM 的后台垃圾回收线程)。在我们的基准测试中，这使得帧构建平均时间提速 [约 20%](https://flutter-flutter-perf.skia.org/e/?begin=1644581114&end=1644647407&keys=X3999dc0a0c89054eaa9f66bcff27d882&num_commits=50&request_type=1&xbaroffset=27549)。

在第 3 版发布之前，光栅缓存的准入策略只查看图片中绘制算子的数量 (假设任何具有多个算子的图片都应该进入缓存)。但这会导致引擎消耗内存来缓存渲染速度极快的图片。此版本 [引入新的机制](https://github.com/flutter/engine/pull/31417)，根据所包含绘制算子的成本来估计图像渲染的复杂性。在我们的性能测试中，使用新机制作为栅格缓存准入策略可以 [减少内存用量](https://flutter-flutter-perf.skia.org/e/?begin=1644790212&end=1646044276&keys=X4c7dd4e4903a38523816c00b31d4d787&requestType=0&xbaroffset=27636)，而不会降低性能。

感谢开源贡献者 [ColdPaleLight](https://github.com/ColdPaleLight)，他修复了 iOS 上由于 [帧调度 bug](https://github.com/flutter/engine/pull/31513) 而导致少量动画帧丢失的问题。感谢所有报告此问题并提供掉帧复现视频的每一个人。

### **Impeller**

我们一直致力于解决 iOS 和其他平台上的早期卡顿问题。在 Flutter 3 中，你可以在 iOS 上预览一个名为 [Impeller](https://github.com/flutter/engine/tree/main/impeller) 的实验性渲染后端。Impeller 会在引擎构建时预编译一组 [较为小巧、简单的着色器](https://github.com/flutter/flutter/issues/77412)，从而避免在应用运行时编译，而后者是造成 Flutter 卡顿的主要原因。Impeller 尚未作好投产准备，距离完成也还有一段距离。目前 Impeller 尚未实现 Flutter 的所有功能特性，但我们对它在 [flutter/gallery](https://github.com/flutter/gallery) 应用中实现的保真度和性能感到满意，并且很高兴地在这里和大家分享开发进度。特别是，在 Gallery 应用的过场动画中，即便最差的帧速度也比之前快大约 [20 倍](https://flutter-flutter-perf.skia.org/e/?begin=1650297849&end=1651261748&queries=sub_result%3Dworst_frame_rasterizer_time_millis%26test%3Dnew_gallery_impeller_ios__transition_perf%26test%3Dnew_gallery_ios__transition_perf&requestType=0)。

Impeller 可以带标记在 iOS 上使用。如果你要试用 Impeller，可以传递 `--enable-impeller` 标记至 `flutter run`，或将 `Info.plist` 文件中的 `FLTEnableImpeller` 标记为 `true`。Impeller 的开发会继续在 Flutter 主渠道进行，我们希望在未来的版本中提供进一步更新。

### **Android 上的内联广** **告**

使用 [google_mobile_ads](https://pub.flutter-io.cn/packages/google_mobile_ads) package 时，你应该可以感受到用户关键交互 (如页面之间的滚动和切换) 的性能有所提升。在新兴市场广为流行的设备上，这种性能提升尤其明显。最棒的是，你无需更改任何代码！

在具体实现方面，Flutter 现在是异步组合 Android 视图 (即通常所说的 [平台视图](https://docs.flutter.cn/development/platform-integration/platform-views))。这意味着 Flutter 的光栅线程无需等待 Android 视图渲染。现在，Flutter 引擎使用它管理的 OpenGL 纹理将视图显示在屏幕上。

## **更多令人兴奋的更新**

我们针对 Flutter 生态系统的其他更新包括:

### **Material 3**

Flutter 3 支持新一代 Material Design，即 [Material Design 3](https://m3.material.io/)。Flutter 3 提供 Material 3 的可选支持，包括动态颜色、最新颜色系统和字体等 Material You 功能，还包含许多组件的更新，以及在 Android 12 中引入的新触摸波纹设计和拉伸滚动等全新视觉效果。我们欢迎大家通过全新的 "[将枯燥无味的 Flutter 应用变得生动有趣](https://codelabs.developers.google.com/codelabs/flutter-boring-to-beautiful)" 的 Codelab 来尝试 Material 3 的功能特性。请参阅 [API 文档](https://api.flutter-io.cn/flutter/material/ThemeData/useMaterial3.html)，详细了解如何选用上述新功能特性，以及哪些组件支持 Material 3。另请关注 [Material 3 Umbrella issue](https://github.com/flutter/flutter/issues/91605) 了解最新开发进展。

### **主题扩展**

借助 "主题扩展 (Theme extension)"，Flutter 现支持向 Material 库中的 `ThemeData` 添加任何内容。你现在可以指定 `ThemeData.extensions`，而无需 (在 Dart 中) 扩展 `ThemeData` 并重新实现其 `copyWith`、`lerp` 和其他方法。另外，package 开发者也可以提供 `ThemeExtension`。请参阅 [官方文档](https://docs.google.com/document/d/1LbD4JqBgAfHex02oR3r2jyu9lTBBNBmyec2ovT59Kr8/edit) 了解详情，并查看 GitHub 上的 [相关示例](https://github.com/guidezpl/flutter/blob/master/examples/api/lib/material/theme/theme_extension.1.dart)。

### **广告**

我们知道对于发布商来说，征求用户同意对个性化广告，以及应对 Apple 的 "应用追踪透明度 (App Tracking Transparency, ATT)" 要求非常重要。

为了支持这些需求，Google 提供了 "用户消息平台 (User Messaging Platform, UMP)" SDK，取代了之前的开源 [Consent SDK](https://github.com/googleads/googleads-consent-sdk-ios)。在即将发布的 Google 移动广告 SDK (Flutter) 中，我们会增加对 UMP (用户消息平台) SDK 的支持，让发布商能够征求用户同意。如需了解详情，请在 pub.dev 上查看 [google_mobile_ads](https://pub.flutter-io.cn/packages/google_mobile_ads) package 页面。

## **重大变更**

在持续扩展和改进 Flutter 的过程中，我们会尽量把重大变更的数量维持在最低限度。Flutter 3 包含以下重大变更:

* [2.10 版之后移除已弃用的 API](https://docs.flutter.cn/release/breaking-changes/2-10-deprecations)
* [页面切换转为使用 ZoomPageTransitionsBuilder](https://docs.flutter.cn/release/breaking-changes/page-transition-replaced-by-ZoomPageTransitionBuilder)
* [Chips 的 useDeleteButtonTooltip 迁移至 deleteButtonTooltipMessage](https://docs.flutter.cn/release/breaking-changes/chip-usedeletebuttontooltip-migration)

如果你正在使用上述 API，请参阅 Flutter.dev 上的 [迁移指南](https://docs.flutter.cn/release/breaking-changes)。

## **总结**

按照 Statista 和 SlashData 等分析机构的统计，Flutter 依然是最受欢迎的跨平台界面工具包，我们能保持这种地位，社区的贡献功不可没，对此，Google Flutter 团队向大家致以由衷敬意。期待与各位社区成员共同努力，继续提供由社区驱动的工具，帮助大家为用户创造出更多令人愉悦的体验！
