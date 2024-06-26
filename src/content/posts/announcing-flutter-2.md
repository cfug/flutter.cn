---
title: Flutter 2 正式发布！
toc: true
---

3月4日凌晨，**Flutter 2** 正式发布: 开发者为*任何*平台创建美观、快速且可移植应用的能力得以更上一层楼。通过 Flutter 2，你可以使用相同的代码库为五种操作系统构建原生应用: iOS、Android、Windows、macOS 和 Linux；以及为 Chrome、Firefox、Safari 和 Edge 等浏览器打造 web 体验。Flutter 甚至可以嵌入到汽车、电视和智能家电，为环境计算提供最普适、可移植的体验。

![]({{site.flutter-files-cn}}posts/images/2021/03/0939e5e734a5c.png)

我们的目标是*从根本上改变*开发者的应用构建思路，让体验先于平台。Flutter 可以让你尽情雕琢**精美**的应用体验，畅快表达自己的品牌和设计风格。Flutter 可以将你的源代码编译为机器码，并**快速**运行，同时借助有状态热重载功能为你带来了解释环境的**高效**生产力，让你可以在应用运行时做出更改并立即查看结果。而且 Flutter 是**开源**的，有成千上万的贡献者在为核心框架添砖加瓦，并围绕其打造了包含海量 package 的生态系统。

![]({{site.flutter-files-cn}}posts/images/2021/03/f090329f06af7.png)

在 [发布](https://flutter.dev/) 的 Flutter 2 中，我们将 Flutter 从移动框架扩展为**可移植**框架，让你的应用基本可以不加变动地在多种平台上运行。仅 Google Play 商店就已有**超过 15 万款 Flutter 应用**，而现在应用可以在无需重写的情况下部署到桌面设备和 web 平台，可以说每款应用都通过 Flutter 2 得到 "免费升级"。

世界各地的用户都在使用 Flutter，包括 [WeChat](https://apps.apple.com/us/app/wechat/id414478124)、[Grab](https://play.google.com/store/apps/details?id=com.grabtaxi.passenger)、[Yandex Go](https://play.google.com/store/apps/details?id=ru.yandex.taxi)、[Nubank](https://play.google.com/store/apps/details?id=com.nu.production)、[Sonos](https://apps.apple.com/us/app/sonos/id1488977981)、[Fastic](https://apps.apple.com/us/app/fastic-fasting-app/id1459260306)、[Betterment](https://play.google.com/store/apps/details?id=com.betterment) 和 [realtor.com](https://apps.apple.com/US/app/id336698281?mt=8) 等热门应用。Flutter 在 Google 也是备受依赖的重要工具，我们有一千多名工程师正在使用 Dart 和 Flutter 构建应用。许多产品已经发布，包括 Stadia、Google One 和 Google Nest Hub。

![]({{site.flutter-files-cn}}posts/images/2021/03/458afcd4aaecf.png)

几个月前，[Google Pay 改用 Flutter](https://mp.weixin.qq.com/s/2y3dWbA4uZbwfTx_bOGdSQ) 打造其旗舰移动应用，在生产力和质量上取得重大进步。通过统一代码库，团队消除了平台之间的功能差异，精简了超过 50 万行代码。Google Pay 还表示，其工程师效率大幅提高，技术债务显著减少，并在 iOS 和 Android 系统上统一了安全审查和实验等发布流程。

## Flutter web 支持

也许 Flutter 2 带来的最重大的进展是**在 web 平台达到了稳定版**。

Web 的 [早期基础以文档为中心](https://tools.ietf.org/html/rfc1866)。但 web 平台经过发展，所包含的平台 API 也越发丰富，已实现高度复杂的应用，支持硬件加速 2D 和 3D 图形以及灵活的布局和绘画 API。Flutter 的 web 支持建立在这些创新的基础上，提供了**一个以应用为中心** **的框架**，能充分展现现代 web 的所有优势。

这次发布带来的初始版本特别关注三种应用场景:

* **渐进式 web 应用 (Progressive web apps, PWA)** ，兼具 web 的高覆盖面与桌面应用的强大功能。
* **单页应用 (Single page apps, SPA)** ，只需加载一次即可与互联网服务互传数据。
* **将现有 Flutter 移动应用带到 web** ，使两种体验共享代码。

在过去几个月准备发布稳定版 web 支持的过程中，性能优化方面也取得了许多进展，增加了由 [WebAssembly](https://webassembly.org/) 构建的由 [CanvasKit](https://skia.org/user/modules/canvaskit) 驱动的新渲染引擎。[Flutter Plasma](https://flutterplasma.dev) 是由社区成员 [Felix Blaschke](https://felixblaschke.medium.com/) 构建的演示，展示了使用 Dart 和 Flutter 构建复杂 web 图形体验的便利性，而且这些体验也可以在桌面或移动设备上原生运行。

我们不断扩展 Flutter，力求为大家提供 web 平台最棒的功能。最近几个月，我们增加了文本自动填充、地址栏 URL 和路由控制以及 PWA 清单。由于桌面浏览器与移动浏览器同样重要，我们添加了交互式滚动条和键盘快捷键，提升了桌面模式下的默认内容密度，并为 Windows、macOS 和 Chrome OS 增加了屏幕阅读器无障碍功能支持。

目前已经出现了一批使用 Flutter 构建的 web 应用示例。在教育工作者中，[iRobot](https://www.irobot.com/) 以其广受欢迎的 [Root 教育机器人](https://www.irobot.com/Root) 而闻名。Flutter 在 web 平台对生产环境的支持，使 iRobot 能够将现有的 [教育编程环境](https://edu.irobot.com/what-we-offer/irobot-coding) 搬到 web 上，从而覆盖到了 Chromebook 以及其他以浏览器为主要体验的设备。iRobot 的 [博文](https://edu.irobot.com/the-latest/building-a-coding-experience-for-all) 详尽阐述了选择 Flutter 的理由以及使用情况。

![]({{site.flutter-files-cn}}posts/images/2021/03/3bbba28798746.png)

另一个例子是 Rive，他们为设计师打造的强大工具可以将创建的自定义动画发布到任意平台。其 [新版 web 应用](https://rive.app/) 完 全由 Flutter 构建，现已进入 Beta 阶段，这也是 web 平台最能展现 Flutter 特色的体验之一。

![]({{site.flutter-files-cn}}posts/images/2021/03/384a963e53119.png)

你可以从 [Flutter web 发布文章](https://medium.com/flutter/web-post-d6b84e83b425) 中了解更多信息。

## 桌面、可折叠和嵌入式设备上的 Flutter 2

除了传统的移动设备和 web 之外，Flutter 正越来越多地覆盖到其他类型设备。[Flutter Engage](https://zhuanlan.zhihu.com/p/355036482) 主题演讲中重点介绍了三位合作伙伴，以展示 Flutter 的可移植性。

第一位合作伙伴，**Canonical** 与我们联手将 Flutter 带到桌面，Canonical 工程师贡献的代码使得 Flutter 开发者能在 Linux 上进行开发和部署。在活动中，Ubuntu 团队展示了使用 Flutter 重写的新安装程序的早期演示版。对 Canonical 来说，在多种硬件配置上提供稳如磐石且美妙的体验至关重要。未来，**Flutter 将成为 Canonical 打造桌面和移动应用的首选**。

![]({{site.flutter-files-cn}}posts/images/2021/03/74e068704f2a5.png)

第二位合作伙伴 **Microsoft** 正在继续扩大对 Flutter 的支持。除了 [持续与我们合作](https://github.com/flutter/flutter/issues/14967#issuecomment-787678757) 为 Flutter 提供高质量的 Windows 支持外，Microsoft 还发布了对 Flutter 引擎的贡献: 支持新兴的可折叠 Android 设备。这些设备带来了新的设计模式，应用可以扩展内容，或者利用双屏特性提供窗口并排体验。Surface 工程团队在一篇 [博文](https://devblogs.microsoft.com/surface-duo/flutter-dual-screen-foldable/) 中展示了其工作成果，并邀请大家加入他们的行列，共同完成适用于 Surface Duo 和其他设备的高质量解决方案。

![]({{site.flutter-files-cn}}posts/images/2021/03/781360ee27de7.png)

第三位合作伙伴，全球畅销汽车制造商之一 **Toyota** 宣布，计划构建由 Flutter 驱动的信息娱乐系统，打造最佳的汽车数字体验。使用 Flutter 标志着车载软件的开发方式向着未来迈进了一大步。Toyota 之所以选择 Flutter，是因为其高性能和体验的一致性，快速迭代的能力和极高的开发者工效，以及智能手机级别的触控体验机制。通过使用 Flutter 的嵌入器 API，Toyota 能够根据车载系统的独特需求对 Flutter 进行定制。

![]({{site.flutter-files-cn}}posts/images/2021/03/8f5850ecec2bd.png)

我们很荣幸与 Toyota 等合作伙伴继续深入协作，将 Flutter 带到汽车、电视和其他嵌入式设备中，在未来几个月我们会为大家带来更多这方面的示例。

## 持续发展的 Flutter 生态系统

目前，Flutter 和 Dart 有超过 15,000 个 package: 包括 [Amazon](https://pub.flutter-io.cn/publishers/aws-amplify.com/packages)、[Microsoft](https://pub.flutter-io.cn/publishers/microsoft.com/packages)、[Adobe](https://pub.flutter-io.cn/publishers/adobe.com/packages)、[Alibaba](https://pub.flutter-io.cn/publishers/community.opensource.alibaba.com/packages)、[eBay](https://pub.flutter-io.cn/publishers/ebay.com/packages) 和 [Square](https://pub.flutter-io.cn/packages/square_in_app_payments) 等企业 package，[Lottie](https://pub.flutter-io.cn/packages/lottie)、[Sentry](https://pub.flutter-io.cn/packages/sentry_flutter) 和 [SVG](https://pub.flutter-io.cn/packages/flutter_svg) 等关键 package，以及 [sign_in_with_apple](https://pub.flutter-io.cn/packages/sign_in_with_apple)、[google_fonts](https://pub.flutter-io.cn/packages/google_fonts)、[geolocator](https://pub.flutter-io.cn/packages/geolocator) 和 [sqflite](https://pub.flutter-io.cn/packages/sqflite) 等 [Flutter Favorite](https://docs.flutter.cn/development/packages-and-plugins/favorites) package。

我们也为 Flutter 带来了 [Google Mobile Ads ](https://pub.dev/packages/google_mobile_ads) Beta 版，这款全新 SDK 通过 AdMob 和 AdManager 提供多种广告格式，包括横幅式、插页式、原生和激励视频广告。我们之前已经邀请了一些主要客户 (比如拉丁美洲最大的独立艺术家音乐平台 [Sua Música](https://www.suamusica.com.br/)) 先行体验此 SDK，现在计划开放 Google Mobile Ads 供更多的 Flutter 开发者采用。

![图片]({{site.flutter-files-cn}}posts/images/2021/03/59e21f0feea5d.png)

我们还更新了 [几项核心 Firebase 服务的 Flutter 插件](https://firebase.flutter.dev/): Authentication、Cloud Firestore、Cloud Functions、Cloud Messaging、Cloud Storage 和 Crashlytics，包括对健全空安全的支持以及对 Cloud Messaging package 的全面改版。

## Dart: Flutter 背后的秘诀

如前所述，Flutter 2 可以移植到许多不同的平台和设备上。之所以能轻松过渡到支持 web、桌面和嵌入式设备，这在很大程度上要归功于 [Dart](https://dart.cn)，它是 Google 为多平台开发优化的编程语言。

Dart 为构建应用提供了一套独特的功能:

* **无意外的可移植性** ，编译器可为移动和桌面设备生成高性能的 Intel 和 ARM 机器代码，并为 web 输出严密优化过的 JavaScript。相同的 Flutter 框架源代码可编译到所有这些目标平台。
* 在桌面和移动设备上进行**有状态热重载的迭代开发**，以及为现代界面编程的异步、并发模式设计的语言结构。
* 全平台一致的 **Google 级性能**，健全空安全保证了运行时以及开发时的空约束。

没有其他语言可以同时提供这些功能，也许这就解释了为什么 Dart 能成为 [GitHub 上发展最快的语言](https://madnight.github.io/githut/#/pull_requests/2020/4) 之一。

我们同期发布的 Dart 2.12 是自 2.0 以来最重大的版本更新，支持**健全的空安全**。健全的空安全能扫除令人头疼的空引用异常，除非开发者明确允许，否则类型在开发时和运行时不可能包含空值。最重要的是，此功能并非重要改动 (breaking change): 你可以按照自己的节奏将空安全逐步添加到代码中，我们也准备好了迁移工具，你可以在准备好之后使用它完成迁移。

这一版本的更新还包括: [FFI 的稳定版本](https://dart.cn/guides/libraries/c-interop)，让你可以编写出高性能的代码与基于 C 语言的 API 进行互操作；使用 Flutter 编写的 [新的集成开发者和性能剖析器工具](https://docs.flutter.cn/development/tools/devtools/overview)；以及许多性能改进和尺寸优化，只需重新编译即可让代码得到长足的改进。如需了解详细信息，请查看 [Dart 2.12 发布文章](https://medium.com/dartlang/announcing-dart-2-12-499a6e689c87)。

## 即刻体验 Flutter 2

在介绍 Flutter 2 时，本文由于篇幅限制难免挂一漏万。事实上，被合并的 PR (pull request) 清单就有足足 200 页！请阅读 [Flutter 2 技术博文](https://medium.com/@csells_18027/fe8e95ecc65)，里面介绍了更多新功能和性能改进，我们认为会让 Flutter 开发者感到满意，也请大家立即下载 Flutter 2 开始体验。

![]({{site.flutter-files-cn}}posts/images/2021/03/46794d1264d83.png)

我们还为大家准备了一款全新的示例应用，[Flutter Folio](https://flutterfolio.com)，由我们与加拿大埃德蒙顿的获奖设计团队 [gskinner](https://gskinner.com/) 合作完成，这个示例展示了我们刚刚提到的一切内容。Flutter Folio 是一款能在你所有的设备上运行的剪贴簿应用。在小屏幕上体验时会强调展示内容；而在大屏幕上体验时则支持以桌面和平板电脑的习惯用法进行内容编辑；web 体验则着重强调分享。这些定制化的体验都共享相同的开源代码库，可供你自由浏览。

![]({{site.flutter-files-cn}}posts/images/2021/03/7ef1cc3624d4e.png)

如果你尚未尝试过 Flutter，我们相信它将为你的应用开发体验带来巨大的提升。Flutter，一个开源工具包，让你通过单一代码库为移动、桌面、web 和嵌入式设备打造美观、快速的应用，让你即便是在面对 Google 和广大用户的苛刻需求时也能游刃有余。

而且 Flutter 是免费和开源的。你会使用 Flutter 2 构建怎样精彩的应用呢？我们拭目以待！