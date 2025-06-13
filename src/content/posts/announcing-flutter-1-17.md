---
title: Flutter 1.17 — 2020 首个稳定版发布！
description: Flutter 1.17 — 2020 首个稳定版发布！
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2021/05/g6bFl3.jpg)

*作者 / Chris Sells, Product Manager, Flutter developer experience*

很高兴为大家带来 Flutter 1.17，这也是我们 2020 年的第一个稳定发布版本。

今年对每个人来说都是充满挑战的一年。我们的目标是每季度发布一次稳定版，由于我们一直在 [针对新的发布流程调整基础设施](https://flutter.cn/posts/flutter-spring-2020-update)，本次版本发布有所推迟。然而品质依然是我们的第一要务，新的版本发布流程将提升我们为稳定分支提供高质量热修复的能力。本次发布的版本包含大量的修复，自 1.12 稳定版发布以来，我们已经解决了 6,339 个 Issue，这是史无前例的大进展。而这很大程度上要归功于我们 [与 Nevercode 的合作](https://blog.codemagic.io/flutter-and-codemagic-join-forces-on-github/)，在用户提出问题时我们可以更快地响应。截至现在，我们已经解决的 bug 数量超过新增数量，报错总数减少了大约 800 个。这些 bug 中相当的一部分已通过合并 3,164 个 pull request 进行了修复，它们来自 231 位贡献者。这些数据都令人振奋，我们也衷心感谢大家在这个特殊时期的勤奋工作和持续贡献。

如果你想查看我们在这个版本中合并的所有 pull request，请前往 flutter.cn 了解详情。除了品质方面的改进，我们还设法在这个版本中加入了一些新功能，包括 iOS 系统中的 Metal 支持、全新的 Material 组件、全新的网络跟踪工具等等。这个版本还包括了 Dart 2.8，请阅读今天发布的二条文章详细了解。

## **移动端性能和文件体积优化**

性能和内存方面的整体优化是 1.17 版的重点之一。只需将你的工程升级到使用 Flutter 1.17，你的用户就能体验到更快速流畅的动画、更小巧的应用尺寸，以及更低的内存占用。在默认的导航场景下 (不包含透明图层内容的导航路径) 1.17 版的 [速度提升了 20%-37%](https://github.com/flutter/flutter/pull/48900)。简单 iOS 动画的 CPU/GPU 占用可减少高达 40%，具体的减少量取决于硬件 (详见 [PR 14104](https://github.com/flutter/engine/pull/14104) 和 [PR 13976](https://github.com/flutter/engine/pull/13976))。

得益于我们的多项修复工作，新版本还在应用体积上做出了可观的改进。比如 Flutter Gallery 范例应用的 Android 版本在去年年底是 9.6MB，现在则是 8.1MB，体积减少了 18.5%。

* 我们做出的多项修复：

	* [https://github.com/dart-lang/sdk/commit/f56b0f690789b6f0e2e5bc1340abf4eba414b7a0](https://github.com/dart-lang/sdk/commit/f56b0f690789b6f0e2e5bc1340abf4eba414b7a0)
	* [https://github.com/dart-lang/sdk/commit/a2bb7301c5795e6b28089a8dc96e6ab5ca798e22](https://github.com/dart-lang/sdk/commit/a2bb7301c5795e6b28089a8dc96e6ab5ca798e22)
	* [https://github.com/dart-lang/sdk/commit/d77f4913a18ecce8c4be95cbaa4299ff1521dc10](https://github.com/dart-lang/sdk/commit/d77f4913a18ecce8c4be95cbaa4299ff1521dc10)
	* [https://github.com/dart-lang/sdk/commit/e2faac751e1ef3707730e6e48f4d8f22ecbf35c3](https://github.com/dart-lang/sdk/commit/e2faac751e1ef3707730e6e48f4d8f22ecbf35c3)
	* [https://github.com/dart-lang/sdk/commit/8e7ffafbafc8203361111ddcafe0e0fcc372edf8](https://github.com/dart-lang/sdk/commit/8e7ffafbafc8203361111ddcafe0e0fcc372edf8)

内存使用方面也有明显的优化，例如在快速滚动大型图片时 [内存占用减少了 70%](https://github.com/flutter/engine/pull/14265)，进而提升性能，具体提升的程度取决于设备内存的大小。

![]({{site.flutter-files-cn}}/posts/images/2021/05/lKp7yG.png)

> △ 测试应用的内存占用量随着 PR 合并的变化 (竖条越短内存占用越少)

不过最大的性能提升来自在 iOS 系统中实现对 Metal 的支持。

## **Metal 将 iOS 性能提升 50%**

Apple 的 Metal API 使开发者几乎直接访问底层 GPU，它也是 Apple 推荐使用的图形 API。在支持 Metal 的 iOS 设备上，Flutter 将默认使用 Metal，使得应用在绝大多数情况下都运行得更快，[渲染速度平均提升约 50%](https://github.com/flutter/flutter/issues/53768) (具体取决于设备的工作负载)。

![]({{site.flutter-files-cn}}/posts/images/2021/05/rqHHKL.png)

> △ 测试 iOS 应用在 OpenGL 和 Metal 下的帧渲染时间 (值越低越好)

对于那些不完全支持 Metal 的设备 (使用 A7 之前的处理器或 iOS 10 之前系统的设备)，Flutter 会和以前一样使用 OpenGL，在这些设备上实现原生渲染速度。更多详情，请查看 Flutter wiki 上的 [iOS Metal 常见问题解答](https://github.com/flutter/flutter/wiki/Metal-on-iOS-FAQ)。

## **Material widgets: NavigationRail, DatePicker, 以及更多**

基于多方用户的反馈，我们也在持续推进 Material 设计系统在 Flutter 中落地。在新版本中我们加入了 [NavigationRail](https://master-api.flutter-io.cn/flutter/material/NavigationRail-class.html)，这是一个新的 widget，提供了响应式的应用导航模型。它由 Google Material Design 团队 [设计](https://material.io/components/navigation-rail) 并实现。NavigationRail 非常适合可以在移动和桌面设备之间切换的应用，当你的应用所在的屏幕尺寸增大时，你可以非常容易地从 BottomNavigator 切换成 NavigationRail。

![]({{site.flutter-files-cn}}/posts/images/2021/05/10uOeq.gif)

> △ 新加入的 NavigationRail widget

你可以在 [web_dashboard 样例](https://github.com/flutter/samples/tree/master/experimental/web_dashboard) 或者 [DartPad](https://dartpad.cn/b9c6cd345fd1cff643353c1f4902f888) 中实际体验 NavigationRail。

除了加入新的 widget 之外，新版本还更新了 Material [DatePicker](https://api.flutter.dev/flutter/material/showDatePicker.html) 以及修正了文字选择菜单 widget 的溢出显示问题。

![]({{site.flutter-files-cn}}/posts/images/2021/05/B4GHia.gif)

> △ 新的 Material DatePicker widget

DatePicker 基于更新过的 [Material 设计指南](https://material.io/components/pickers/#mobile-pickers) 引入了新的视觉设计，并新增了文本输入模式。详情请阅读 [Material DatePicker 改版文档](https://flutter.dev/go/material-date-picker-redesign)。

![]({{site.flutter-files-cn}}/posts/images/2021/05/TwiEKM.gif)

> △ Android 上新版文字选择悬浮菜单

![]({{site.flutter-files-cn}}/posts/images/2021/05/67UFM4.gif)

> △ iOS 上新版文字选择悬浮菜单

如上图，当按钮总长度超过了显示范围时，[Android](https://github.com/flutter/flutter/pull/49391) 和 [iOS](https://github.com/flutter/flutter/pull/54140) 中的文本选择菜单保真度也得到了提高。菜单文本越长，这项更新越显著。

另外，[全新的 Animations Package](https://pub.flutter-io.cn/packages/animations)，虽然并没有被包含进 Flutter 1.17 版本中，但也已同期发布。它实现了 [新的 Material 动效规范](https://material.io/design/motion/the-motion-system.html)。

![]({{site.flutter-files-cn}}/posts/images/2021/05/cDpbsU.gif)

> △ Animations Package 中的容器转场动画

在《[实现动效太难了？试试 Material Design》](https://mp.weixin.qq.com/s/v9QGn4xkEIlQ6DAe_1t7tg) 一文中，Material Design 团队给出了组件与全屏视图之间的四种转场模式: 容器变换、共享轴、淡入淡出和弹出效果。虽然 Flutter 一直就可以实现这些动效，但 Animations Package 让你可以更轻松地实现它们。今天就在应用里试试这些动效，让你的用户们眼前一亮吧！

## **Material 文字缩放: 现代化 Flutter 文字主题**

在新版本中，Flutter 团队在不破坏现有 Flutter 应用的同时，完成了对 2018 年 [Material Design 规范文字排版](https://material.io/design/typography/the-type-system.html#type-scale) 缩放 (Type Scale) 的实现。2018 年 10 月，我们在 [PR 22330](https://github.com/flutter/flutter/pull/22330) 中添加了对新配置 (而不是新名称) 的可选支持。现有的文本样式名称没有更改，因为这属于重大的 API 更改，可能会影响到大多数应用。Flutter 1.17 更新了 TextTheme API，以遵循当前的 Material 规范，但保留了旧的名称，从而不影响你的代码。由于旧的名称已经被废弃，你将收到 warning 提示，建议采用新的名称。

2018 年 Material TextStyle 的名称和配置汇总如下表所示。

![]({{site.flutter-files-cn}}/posts/images/2021/05/ICBLwp.png)

Material Design 规范中称为 `body1` 和 `body2` 的 TextStyle 在 Flutter TextTheme API 中被称为 `bodyText1` 和 `bodyText2`。同样的，在规范中称为 `H1-H6` 的 TextStyle，在 TextTheme API 中称为 `headline1-headline6`。

## **在 Flutter 中使用 Google Fonts**

文本和字体总是密不可分，如果新的 Material 文字缩放实现让你眼前一亮，那么你可能也会对新的 [Google Fonts for Flutter v1.0](https://medium.com/flutter/introducing-google-fonts-for-flutter-v-1-0-0-c0e993617118) 颇感兴趣。

![]({{site.flutter-files-cn}}/posts/images/2021/05/FJhCZx.gif)

> △ 在 Flutter 应用中轻松使用 Google Fonts

开发者可以通过 Google Fonts 在应用中轻松尝试和使用 fonts.google.com 中的字体。当应用准备发布时，开发者也可以决定是通过 API 来下载字体，还是在应用包中直接嵌入字体。

## **无障碍功能和国际化**

最后是我们持续关注的课题——无障碍功能。我们认为，让 Flutter 应用可以服务最为广泛的受众是我们的首要任务之一。在新版本中，我们做了全面的工作，对滚动、文本框以及其他输入 widget 的无障碍功能进行了修复。GitHub 上有我们在这个版本中 [完成修复的无障碍功能完整列表](https://github.com/flutter/flutter)。我们希望开发者能多多测试自己应用的无障碍功能，并且随着这次版本还发布了一些推荐的 [最佳实践](https://flutter.dev/docs/development/accessibility-and-localization/accessibility) 供大家参考。

在国际化方面，我们一直在处理一些 [影响三星键盘 IME 的问题](https://github.com/flutter/flutter/issues/42273)，这影响了许多东亚语言的文字输入。现在我们很高兴地宣布这个问题已经解决。各国开发者，尤其是韩国的开发者会在这个版本中发现不少喜人的变化。

## **工具: Dart DevTools 支持 Flutter**

将当前版本的 Dart DevTools 替换成新的 Flutter 版本，这一进程通过 Flutter 1.17 已经接近完成。如果你想试试新的 Flutter 版 Dart DevTools，请在启动 DevTools 后点击右上角的 Beaker (烧瓶) 图标。

![]({{site.flutter-files-cn}}/posts/images/2021/05/lbMHWp.png)

由 Flutter 实现的 Dart DevTools 预发布版本带来了诸多改进，其中全新的 **Network** (网络) 选项卡最为重要。

![]({{site.flutter-files-cn}}/posts/images/2021/05/tpb7Pb.png)

如果你在 Dart DevTools 的预发布版本中没有看到 Network 选项卡 (比如，你是通过命令行来使用 DevTools)，可以通过如下命令手动更新它:

```console
$ pub global activate devtools
```

在按下 Record (录制) 按钮后， Network 选项卡会显示你的 Flutter 应用的网络流量情况。如果你想在应用启动时就立即开始监测网络流量，可以在你的 main() 方法中加入这行代码:

```dart
void main() {
    // enable network traffic logging
    HttpClient.enableTimelineLogging = true;
    runApp(MyApp());
}
```

除了 Dart DevTools 的更新之外，这个版本还实验性地增加了 ["快速启动" 选项](https://github.com/flutter/flutter/pull/46140)，当你调试 Android 版 Flutter 应用时，其启动速度可以提升高达 70%。你可以通过 flutter run --fast-start -d <your Android device> 来启用这个选项。这个选项会安装一个只依赖你的插件代码的通用 Android 应用，而不包含任何 Dart 代码或资源。这会让重复运行的 flutter run 命令更快地启动，因为修改 Dart 代码或资源并不需要重新构建 APK。和通常的启动选项不同，快速启动选项将你的应用绑定到了一个通用的 Android "容器" 中，实际上并不会在你的设备上安装。在一些情况下，比如你使用的插件访问了后台执行的内容，快速启动选项将不起作用。如果你觉得 Android 调试的启动时间漫长得让人头疼，不妨试试这个全新的选项吧。

如果你的目标平台是 Android，你会注意到，现在创建新的 Flutter 项目时只提供 AndroidX 选项。[AndroidX](https://developer.android.google.cn/jetpack/androidx) 库提供了被称为 [Android Jetpack](https://developer.android.google.cn/jetpack/) 的高级 Android 功能。在上一个版本中，我们不再支持原先的 Android Support Library，转而将 AndroidX 作为所有新项目的默认选项。在 Flutter 1.17 中，flutter create 命令只有 --androidx 这一个选项。虽然现有的不使用 AndroidX 的 Flutter 应用依然可以编译，但 [是时候迁移至 AndroidX 了](https://zhuanlan.zhihu.com/p/136351588)。

如果你使用 Android Studio 或 IntelliJ，你会发现 Hot Reload (热重载) 功能的容错性更强了。在本次更新之前，如果你的应用出现了任何分析错误，Hot Reload 将不会重新加载你的代码。如果分析错误并不涉及你当前正在运行的代码 (比如在单元测试中)，会让人很崩溃。但通过 [本次更新](https://groups.google.com/forum/m/#!topic/flutter-announce/tTgQcTgqrKg)，Hot Reload 将不再受分析错误影响，而取决于 VM 中的编译错误。

如果你想更早地体验 Android Studio 或 IntelliJ 的 Flutter 插件中类似的改进，我们现在也为 [IntelliJ 插件提供了 dev 渠道](https://groups.google.com/forum/m/#!topic/flutter-announce/tTgQcTgqrKg)，你可以选择加入，以更快获取到这些更新。这个 dev 渠道的目标是在公开发布新 IDE 集成功能前通过 Flutter 开发者收集反馈。如果你希望尝鲜并且愿意向 Flutter 工具团队提供早期反馈，请即刻 [加入我们的体验计划](https://groups.google.com/forum/m/#!topic/flutter-announce/tTgQcTgqrKg)！

如果你使用的是 Visual Studio Code，我们推荐使用新的 **Dart: List Outdated Packages** 命令来运行新的 pub outdedated 命令。详情请见 Dart 2.8 发布 (今日微信二条文章)。

![]({{site.flutter-files-cn}}/posts/images/2021/05/wRDc6Y.png)

这个命令用于厘清依赖项中的版本问题。

最后值得一提的是，现在当 Flutter 崩溃时，工具会提示你上报这个 bug:

![]({{site.flutter-files-cn}}/posts/images/2021/05/mh6Izu.png)

我们的团队会密切关注这些错误报告的严重程度和出现频率，所以当这些提示出现时，请提交 bug 给我们。

## **案例分享: MGM 和 Superformula**

Flutter 的存在是为了实现精美的应用体验。数字开发商 [Superformula](https://superformula.com/flutter/) 最近就完成了一件精彩的作品: 他们最近与 MGM Resorts (美高梅酒店集团) 合作，完全使用 Flutter [对其移动应用进行了重构](https://www2.mgmresorts.com/app/)。他们反馈道，"在核心产品中引入 Flutter，为我们的客户和他们的用户带来了更快的速度和更高的灵活性，从而为他们带来了真正的、可衡量的价值。"

![]({{site.flutter-files-cn}}/posts/images/2021/05/004NS7.png)

Superformula 与 MGM Resorts 设计团队合作，为所有主要的网络、移动和店头体验打造了全新的 MGM 设计语言。这个规模不大的团队使用全新的 Flutter 源码库更快地完成了应用改版，并在两个应用商店上架，使得 MGM 的预订转化率提高了 9%。

## **重要改动 (Breaking Changes)**

和以往一样，我们会尽量减少每一个 Flutter 新版本中的重要改动，我们会反复权衡利弊，确保 Flutter 能够提供直观、灵活的 API，能够在新平台上支持新的开发习惯。在去年的用户调查中，开发者表示可以接受经过深思熟虑的、能够改善框架的重要改动。因此，我们正在稳步、审慎地更新 API。Flutter 1.17 中的重要改动包括:

* #42100 在使用 pushReplacement 时使用之前的路径运行后续动画
* #45940 弃用 UpdateLiveRegionEvent
* #49389 在高速滚动时推迟图像解码
* #49391 文本选取溢出 (Android)
* #49771 断言缓存提示未针对空绘图对象进行设置
* #50318 实时图像缓存
* #50354 使用构造块高度计算选区范围，确保其维持在可视范围内
* #50733 在 gen_l10n 中生成消息查询
* #51435 从 RouteSettings 中移除 isinitialroute
* #52781 将 mouse_tracking.dart 移动到 rendering

## **小结**

随着移动端支持的不断成熟，以及 [Web 端逐步稳定](https://mp.weixin.qq.com/s/NGqF2OTvsV1A2KLiMXE2PQ)，Flutter 有望解决困扰行业几十年的问题: 如何通过单一代码库构建出多平台部署的优秀应用？Flutter 成长至今的表现让我们相信，我们正走在正确的道路上，也期待着你精彩的 Flutter 作品！
