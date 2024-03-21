---
title: Flutter 2.2 现已发布！
toc: true
---

在本次 [Google I/O 2021 大会](https://mp.weixin.qq.com/s/S1GZdQdwcdZKIbBY_FlzJQ)上，我们正式发布了 [Flutter 2.2](https://docs.flutter.cn/whats-new)。Flutter 2.2 是我们最新版的开源工具包，可让开发者立足单个平台构建适合任何设备的精美应用。Flutter 2.2 是迄今为止最出色的 Flutter 版本。借助更新后的功能，开发者能更便利地通过应用内购买、支付方式和广告将其应用变现，还能连接到云服务和 API 来扩展应用的功能；而借助工具和语言功能，开发者能够消除一整类的错误，增强应用性能并缩减软件包大小。

![](https://devrel.andfun.cn/devrel/posts/2021/05/zC30Hx.png)

## **在 Flutter 2 的基础上打造而成**

Flutter 2.2 在 Flutter 2 的基础上打造而成，并将 Flutter 的根基从最初的移动设备扩展到 web、桌面设备以及嵌入式设备。其绝无仅有的设计是为了满足环境计算世界的需求，因为在这样的世界中，用户有各式各样、尺寸不一的设备，而用户期望在其日常生活中的各式设备上获得一致的美好体验。Flutter 2.2 的存在，使得企业、初创团队和企业家们都可以创建高质量的解决方案，充分发挥潜在市场的潜力，让目标平台不再成为限制因素，而只需专注于寻找创意灵感。

**Flutter 是目前开发者首选的跨平台开发框架。**

近期的移动开发者调研结果凸显了 Flutter 的迅猛发展。分析公司 [SlashData](https://www.slashdata.co/) 的 [Mobile Developer Population Forecast 2021](https://www.slashdata.co/reports/?category=mobile-desktop) (2021 移动开发者人口预测) 报告显示 Flutter 是如今最流行的跨平台开发框架，有 45% 的开发者选用，在 2020 年 1 季度至 2021 年 1 季度期间，使用人数增长了 47%。我们自己的数据也印证了这一增长，过去 30 天内，在 Play 商店新上架的应用中，有超过八分之一的应用是使用 Flutter 开发的。

在 I/O 大会上，我们介绍过，如今仅 Play 商店就有超过 20 万款应用是使用 Flutter 开发的；开发这些应用的公司如腾讯，其即时通讯应用微信 ([WeChat](https://apps.apple.com/us/app/wechat/id414478124)) 在 iOS 和 Android 平台的用户数超过了 12 亿；还有 TikTok 的开创者 [字节跳动](https://www.bytedance.com/en/products/)，其目前已经使用 Flutter 开发了 70 款不同应用；以及 [BMW](https://www.press.bmwgroup.com/global/article/detail/T0328610EN/the-my-bmw-app:-new-features-and-tech-insights-for-march-2021?language=en)、[SHEIN](https://apps.apple.com/app/id878577184)、[Grab](https://apps.apple.com/app/id647268330) 和 [滴滴](https://play.google.com/store/apps/details?id=com.xiaojukeji.didi.global.customer&hl=None) 等公司。当然，使用 Flutter 的并非只有大公司，部分创意十足的应用就出自一些你可能不曾听过的公司，比如 [Wombo](https://play.google.com/store/apps/details?id=com.womboai.wombo&hl=None) (一款迅速走红的唱歌自拍应用)、[Fastly](https://play.google.com/store/apps/details?id=de.fastic.app&hl=None) (一款饮食控制应用) 以及 [Kite](https://play.google.com/store/apps/details?id=com.zerodha.kite3&hl=None) (一款精美的投资交易应用)。

## **介绍 Flutter 2.2**

Flutter 2.2 侧重于改进开发体验，目的是让你能够向客户提供更稳定、性能更好的应用。

现在，默认情况下，新项目会自动启用健全的空安全。空安全可有效防范空引用异常，让开发者能够有一些方式来在自己的代码中表示非可空类型。由于 Dart 的实现非常*健全*，编译器能够在运行时避免空检查，从而提升应用的性能。生态系统也紧随其后，目前已有大约 5,000 个 package 更新支持空安全。

在这一版本中还包含了许多性能改进: 对于 web 应用，我们使用 Service Worker 来提供后台缓存；对于 Android 应用，Flutter 支持延迟加载组件；至于 iOS 应用，我们已在开发工具来对着色器进行预编译，以便消除或减少首次运行卡顿。我们还向 DevTools 套件中添加了许多新功能，借此帮你了解应用中内存分配方式，以及支持第三方工具扩展程序。

此外，我们还在一些重要的领域进行了优化，例如提高网络目标的可访问性。

我们的工作已不再局限于 Flutter 的核心。我们还与 Google 其他团队合作，将 Flutter 与更多技术栈的开发者进行联动。特别指出的是，我们仍会继续打造可信赖的服务来帮助开发者负责任地将其应用变现。在此版本中，我们 [新的广告 SDK](https://developers.google.cn/admob/flutter/quick-start) 也已更新，现在具有空安全设置，并支持自适应横幅广告格式。我们还引入了一个新的支付插件，这款插件是我们与 Google Pay 团队合力开发，可用于在 iOS 和 Android 平台处理实物商品的支付事宜。此外，我们也更新了我们的 [应用内购买插件](https://pub.flutter-io.cn/packages/in_app_purchase)，以及配套的 [codelab](https://codelabs.developers.google.com/codelabs/flutter-in-app-purchases#0)。

在此版本中，作为成就 Flutter 的 "秘密武器"，[Dart](https://dart.cn/) 也有了更新。Dart 2.13 扩展了对原生互操作性的支持，现在支持在 FFI 中使用数组和封装结构体。新的 Dart 版本还支持类型别名，如此一来，不但能提高代码可读性，也让部分重构工作更为轻松。我们将继续为更广泛的生态系统增加集成方案，包括 [GitHub Actions](https://github.com/marketplace/actions/setup-dart-sdk) 和针对基于云的业务逻辑部署优化过的官方 [Docker 映像](https://hub.docker.com/_/dart)。

## **不止是 Google 项目**

尽管 Google 仍是 Flutter 项目的主要贡献者，但我们也欣喜地看到 Flutter 的生态系统在不断发展壮大。

![](https://devrel.andfun.cn/devrel/posts/2021/05/vulUJU.png)

近几个月来，一个特别的增长领域就是支持 Flutter 的平台和操作系统日益增多。在 [Flutter Engage 活动](https://flutter.cn/posts/flutter-engage-event-recap)中，我们曾宣布 [Toyota 将把 Flutter 引入其下一代汽车信息娱乐系统](https://flutter.cn/posts/seamless-multi-platform-app-development-with-flutter)。上个月，Canonical 推出了其首个 [集成了 Flutter 支持的 Ubuntu 版本](https://ubuntu.com/blog/ubuntu-21-04-is-here)，其中集成了 Snap 并支持 Wayland。

两家新合作伙伴的到来也说明这个生态系统正在不断发展: [三星正在将 Flutter 移植到 Tizen](https://github.com/flutter-tizen/flutter-tizen) (采用一个其他开发者也可贡献内容的开源代码库)，[索尼正在主导为嵌入式 Linux 提供解决方案而努力](https://github.com/sony/flutter-embedded-linux)。

设计师们也因为这个项目的开源性质而获益匪浅，[Adobe 已宣布推出其 XD to Flutter 插件更新版](https://flutter.cn/posts/announcing-xd-to-flutter-v2-0)。Adobe XD 为设计师提供了绝佳的试验和迭代方式，现在，由于加强了对 Flutter 的支持，设计师和开发者可以通力协作，以前所未有的速度将自己的想法付诸实践。

最后，微软将继续与我们合作；除了 Surface 团队一直在使用 Flutter 开发可折叠设备体验项目外，本周又增加了 [Flutter UWP (Windows 10) Alpha 应用](https://flutter.cn/desktop#windows-uwp)。我们兴奋地看到，越来越多的应用在利用 Flutter 内置的平台适应功能来打造可在移动设备、桌面和 web 等多个平台完美运行的体验。

## **打造绝佳的体验**

我们推出 Flutter 的最主要目的是帮助开发者打造绝佳的体验。我们认为应用开发工作可以更美好，希望可以为你消除在触及受众时遇到的传统障碍，这些理念激励着我们不断向前。

我们期待看到你使用 Flutter 构建应用。美国退伍军人事务部的项目就是一个不错的应用示例，通过 [视频](https://youtu.be/2S-KkvFuLWs)，你可以了解其 Flutter 应用是如何帮助他们为患有创伤后应激障碍 (PTSD) 的士兵提供康复治疗的。

我们在 Flutter 方面所做的工作会在 [Google I/O 大会](https://mp.weixin.qq.com/s/S1GZdQdwcdZKIbBY_FlzJQ)上 [以各种研讨会、演示和视频点播的形式](https://events.google.com/io/program/content?4=topic_flutter) 与大家分享。别忘记尝试我们的 [photo booth web 应用](https://photobooth.flutter.dev)，这个有趣的应用就是用 Flutter 开发的，你可以在那里与我们的吉祥物 Dash 及其伙伴们合影留念！

![](https://devrel.andfun.cn/devrel/posts/2021/05/r8Qxd4.png)
