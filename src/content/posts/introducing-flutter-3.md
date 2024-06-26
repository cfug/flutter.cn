---
title: Flutter 3 正式发布
toc: true
keywords: Flutter版本发布, Flutter正式版
description: Flutter 3 加入了对 macOS 和 Linux 桌面端的稳定版支持！也包括 Firebase、生产力和性能相关的更新。
image:
    path: https://files.flutter-io.cn/posts/flutter-cn/2022/introducing-flutter-3/flutter3_hero.png
---

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/introducing-flutter-3/flutter3_hero.png)

_作者 / Tim Sneath, Google Flutter 和 Dart 产品组产品经理_

Flutter 3 实现了 Flutter 以移动端为中心扩展到多平台的产品规划，并在今年 I/O 大会的主题演讲上正式发布，此次发布提供了对 macOS 和 Linux 桌面端的稳定版支持，同时包括 Firebase 集成的改进，增加了与生产力和性能相关的新特性，并对 Apple 芯片提供了支持。

## Flutter 3 的演进

创建 Flutter 的初衷是为了彻底改变应用开发：将 「Web 应用的迭代开发模式」与「硬件加速的图形渲染」和「像素级的控制」三者结合——之前只有游戏才能这么做。自 Flutter 1.0 Beta 版发布以来的四年里，我们逐渐在这些基础上发展，增加了新的框架功能和新的 widget，与底层平台进行了更深入的整合，还加入了丰富的 package 库，此外还进行了许多性能和工具等方面的改进。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/introducing-flutter-3/flutter-milestones.png)

随着 Flutter 逐渐产品走向成熟，越来越多的人开始用它来构建应用。今天，有超过 50 万个应用使用 Flutter 发布。来自 data.ai 等研究公司的分析以及公众的评价都可以表明，Flutter 正被许多细分领域的客户所使用。其使用场景非常广泛，从微信 (WeChat) 等社交应用，到 Betterment 和 Nubank 等金融和银行类应用，再到 SHEIN 和 trip.com 等商旅应用以及 Fastic、[Tabcorp](https://auspreneur.com.au/tabcorp-adopts-googles-flutter-platform/ "Tabcorp 使用 Google Flutter 平台进行构建") 等生活方式类的应用，还有 [My BMW](https://www.press.bmwgroup.com/global/article/detail/T0328610EN/the-my-bmw-app:-new-features-and-tech-insights-for-march-2021 "My BMW 应用: 2021 年 3 月的新特性更新和技术说明") 此类的硬件连接类应用，最后是巴西政府等公共机构的官方应用等等，都有 Flutter 在大放异彩。

<highlight>现在已有超过 50 万个应用使用 Flutter 构建。</highlight>

开发者告诉我们，Flutter 帮助他们在更多的平台上更快地构建出了精美的应用。我们最新的用户研究也表明:

- 91\% 的开发者认为 Flutter 缩短了构建和发布应用的时间。
- 85\% 的开发者认为 Flutter 使他们的应用比以前更加精美。
- 85\% 的开发者认为 Flutter 使他们的应用能在更多平台上发布。

Sonos 在 [最近的一篇博客文章](https://tech-blog.sonos.com/posts/renovating-setup-with-flutter/ "最近的一篇博客文章") 中讨论了他们对设置体验的改版工作，其中着重强调了上述的第二点：

> 毫不夸张地说，Flutter 为我们带来了一种 "高级感"，这与我们团队之前提供的任何东西都不一样。对我们的设计师来说，最重要的是，他们可以轻松地构建新的用户界面，这意味着我们团队在面对各种设计规格时，会更少说 "做不到"，而更多地直接进行迭代。如果你觉得我们的说法有道理，我们推荐你试试 Flutter —— 至少我们非常庆幸当初选择了它。

## 欢迎来到 Flutter 3

Flutter 3 正式发布，至此，Flutter 的跨平台之旅迈入高潮。有了 Flutter 3，你就可以仅用一套代码库，为 6 个平台构建精美的体验。它为开发者提供了无与伦比的生产力，并使初创团队从第一天起就能将新的想法投放到完全可用的市场中。

在以前的版本中，我们已经在 iOS 和 Android 平台之外增加了 [Web 端](https://mp.weixin.qq.com/s/6oSwvPsMy6r4AW90aostiA) 和 [Windows 平台](https://mp.weixin.qq.com/s/GSsym9zSYusZkrNLI2a6fQ) 的支持，现在，**Flutter 3 增加了对 macOS 和 Linux 应用的稳定支持**。增加平台支持需要的不仅仅是渲染像素这么简单: 还包括对新的输入和交互模型的支持、编译和构建的支持、无障碍和国际化支持，以及特定平台的整合。我们的目标是，让你能够灵活地充分利用底层操作系统，同时根据你的选择尽可能多地共享用户界面和逻辑。

在 macOS 上，我们已经投入资源支持 Intel 处理器和 Apple 芯片，并提供 [通用二进制 (Universal Binary) 文件](https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary "Apple 开发者文档: 构建通用 mac OS 二进制文件")) 的支持，使应用能够打包成在两种架构上都能原生运行的可执行文件。在 Linux 上，Canonical 和 Google 已经合作为开发者们带来了高度集成的最佳开发工具。

[Superlist](https://superlist.com/ "团队生产力提高工具 Superlist") 是一个很好的例子，告诉大家 Flutter 是如何帮助你实现精美桌面体验的，它今天推出了 Beta 版本供大家体验。Superlist 提供了超强的协作功能，通过一个崭新的应用将列表、任务和自由形式的内容结合在一起，将待办事项和个人计划等功能打磨得焕然一新。Superlist 团队选择 Flutter，是因为它能够提供快速且高度品牌化的桌面体验。我们认为，他们迄今为止的进展表明这是一个非常明智的选择。

Flutter 3 还对许多基本要素进行了改进，提高了性能，强化了对 Material You 的支持，并进一步提升了生产力。

除了上面提到的内容外，在这个版本中，Flutter 已经完全支持在 [Apple 芯片](https://support.apple.com/zh-cn/HT211814 "搭载 Apple 芯片的 Mac 电脑") 上进行原生开发。虽然自 M1 处理器诞生以来，Flutter 就一直与搭载 M1 的苹果设备兼容，但 Flutter 现在充分利用了 [Dart 对 Apple Silicon 的支持](https://mp.weixin.qq.com/s/mogv7U94WdZQ5Wd_S0kXLg)，在搭载 M1 的设备上实现了更快的编译，并支持 macOS 应用的通用二进制文件。

在这个版本中，我们对 [Material Design 3](https://m3.material-io.cn "Material Design 3 主页") 所做的支持工作已基本完成。开发者们现在可以尽情使用这套自适应性强、跨平台的设计系统，包括其动态颜色方案和经过更新的视觉组件。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/introducing-flutter-3/m3-support.png)

我们也将在近期发布更详细的技术文章，并在其中更多介绍这部分内容，以及 Flutter 3 的许多其他新功能。

Flutter 由 Dart 编程语言提供强有力的支持，这是一种用于多平台开发的高生产力、可移植的语言。我们在这个发布周期中对 Dart 的改进工作包括: 枚举支持成员变量、改进的超类参数继承，以及更为灵活的命名参数相关的新的语言特性；同时为 `package:lints` 开启了 2.x 版本，这是一套官方的 lint 规则，是根据我们总结的 Dart 最佳实践整合而成的一个 lint 规则集；与此同时，我们也更新了核心库的 API 文档，为其带来了丰富的示例代码。并且，为了改善平台集成特性，我们在 Flutter 插件中提供了一个新的模版，使用 `dart:ffi` 与原生平台进行 C 语言的互操作、对 RISC-V 指令集提供实验性支持，以及对 macOS 和 Windows 可执行文件的签名支持。如果想要了解 Dart 2.17 中所有新改进的细节情况，请关注将在近期发布的文章。

## Firebase 和 Flutter

当然，构建应用不仅仅是构建用户界面框架。应用发布者需要一套全面的工具，来帮助他们构建、发布和运营自己的应用，包括认证、数据存储、云端功能和设备测试等服务。目前已有多种服务支持 Flutter，包括 [Sentry](https://docs.sentry.io/platforms/flutter/ "Sentry 文档: Flutter 平台集成")、[AppWrite](https://appwrite.io/docs/getting-started-for-flutter "AppWrite 文档: 在 Appwrite 平台中使用 Flutter") 和 [AWS Amplify](https://docs.amplify.aws/start/q/integration/flutter/ "AWS Amplify 文档: Flutter 集成")。

Firebase 是由 Google 提供的应用服务平台。[SlashData 的开发者基准研究](https://www.slashdata.co/developer-program-benchmarking/ "SlashData 的开发者基准研究") 显示，62\% 的 Flutter 开发者在其应用中使用 Firebase。因此，在过去的几个版本中，我们一直在与 Firebase 合作对两者的集成进行扩展和改良，并将其打造成 Flutter 的首选集成服务。这包括将 Flutter 的 Firebase 插件升级到 1.0，增加更好的文档和工具，以及提供像 [FlutterFire UI](https://pub.flutter-io.cn/packages/flutterfire_ui "FlutterFire UI package 页面") 这样的新 widget，为开发者提供可重用的认证和用户资料界面。

今天，我们宣布 Flutter 和 Firebase 的整合已成为 Firebase 产品核心的一部分并得到完全的支持。我们已将源代码和文档转移到 Firebase 的主 repo 和网站中。Firebase 对 Flutter 的支持将和 Android 和 iOS 端的支持同步发展。

此外，我们还进行了重大改进，以支持 Flutter 应用使用 [Crashlytics](https://firebase.google.cn/docs/crashlytics "Firebase Crashlytics 产品主页") (这是 Firebase 中很受欢迎的实时崩溃报告服务)。随着 Flutter Crashlytics 插件的更新，你可以使用与 iOS 和 Android 开发者相同的功能集来实时跟踪致命错误。其中包括重要警报和指标，如 "无崩溃用户"，帮助你保持应用的稳定性。Crashlytics 的分析管线已经升级，以改善 Flutter 崩溃的聚合处理，使其能更快地分级、优先处理和修复问题。最后，我们简化了插件的设置过程，因此你只需要几个步骤就可以直接通过 Dart 代码设置并使用 Crashlytics。

## Flutter 休闲游戏工具包

对于大多数开发者来说，Flutter 是一个应用框架。但是，利用 Flutter 提供的硬件图形加速支持和 Flame 等开源游戏引擎，围绕休闲游戏开发而建立的社区也在不断壮大。我们希望让休闲游戏开发者更容易上手，所以在今天的 I/O 大会上，我们发布了 [Flutter 休闲游戏工具包](https://flutter.dev/games "Flutter 休闲游戏工具包") \(Casual Game Toolkit\)，它提供了模板、最佳实践入门套件，还为你准备了可用于广告和云服务的赞助额度。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/introducing-flutter-3/announcing-flutter-casual-game-toolkit.png)

虽然 Flutter 并不是为高强度的 3D 动作游戏而设计的，但如今，一部分这类游戏在独立于游戏场景之外的用户界面部分也开始使用 Flutter 来实现，包括 PUBG Mobile 这样拥有数亿用户的流行游戏。在 I/O 大会上，我们想看看我们能把技术推进到什么程度，所以我们创建了一个有趣的弹球游戏，它使用到了 Firebase 和 Flutter 的 web 端支持。I/O Pinball 弹球游戏提供了一个定制桌面，围绕着 Google 最受欢迎的四个吉祥物进行设计，它们分别是: Flutter 的 Dash、Firebase 的 Sparky、Android 机器人和 Chrome 恐龙，你可以在这个游戏中与他人一较高下。我们希望通过这种有趣方式展示 Flutter 的多功能性。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/introducing-flutter-3/io-pinball.png)

## Flutter: 由 Google 支持，由社区驱动

我们喜欢 Flutter 的一点是，它不仅仅是 Google 的产品——它是一个「属于所有人」的产品。开源意味着我们都可以参与其中，并与它的成功息息相关。你可以贡献新的代码或文档，创建 package 来为核心框架赋予新的超能力，编写教导他人的书籍和培训课程，还可以帮助组织活动和用户社群，等等。

为了展示社区的精彩，我们最近与 DevPost 合作，赞助了 Puzzle Hack 挑战，让开发者们通过 Flutter 来演绎经典的滑动拼图游戏，以展示他们的技能。这场活动呈现了 web、桌面和移动端完美结合的场景:  现在大家都可以通过浏览器或应用商店玩到这些游戏。  

感谢你对 Flutter 的支持，欢迎来到 Flutter 3！
