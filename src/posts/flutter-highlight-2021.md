---
title: 回顾 2021 Flutter 精彩时刻
description: 祝愿各位 Flutter 开发者们虎年大吉、虎虎生威！
---

![Flutter新年](https://devrel.andfun.cn/devrel/posts/2022/01/6879bbc9b157d.png)

![2](https://devrel.andfun.cn/devrel/posts/2022/01/752a1f9e5ac3f.png)

2021 年，Flutter 正式进入 2.x 系列的正式版发布，年初的 [Flutter 2 的发布](./announcing-flutter-2) 打开了一个新的“格局”，为 Flutter 的加入了第五大特色——「**可移植性**」，让 Flutter 从一个移动框架正式“升级”为一个「可移植框架」，目标是让 Flutter 应用基本可以不加变动地在多种平台上运行。通过 Flutter，开发者们可以为任何平台创建美观、快速且可移植的应用。3 月份，除了 [Web 平台发布稳定版](https://mp.weixin.qq.com/s/6oSwvPsMy6r4AW90aostiA) 之外，Flutter 也开始向桌面、可折叠和嵌入式设备上进行扩展。随之发布的 [Dart 2.12 正式版](./announcing-dart-2-12) 提供了健全的空安全和 FFI 的生产环境级支持。Dart 是一个站在 Flutter 背后的“秘密武器”，我们提到的很多 Flutter 的“闪光点”，实际很大程度要归功于 Dart: 包括我们熟知的有状态的热重载 (Stateful Hot-Reload)，以及 Dart FFI 的成熟支撑了 Flutter 2 提到的「可移植性」，以及最新 Flutter 2.8 稳定版中关于性能的提升的部分，都离不开 Dart。

![2.2](https://devrel.andfun.cn/devrel/posts/2022/01/2faa787ee6bae.png)

21 年 5 月下旬的 I/O 大会仍是在线上举办，[Flutter 2.2](https://mp.weixin.qq.com/s/tnQ1F7kvrxKrbRs8bSzMmg) 和 [Dart 2.13](https://mp.weixin.qq.com/s/pmfJ3Q8wJ_fM0VTNWeaSqg) 稳定版正式发布。除了不断进化的 Web 支持，Flutter 也在移动平台有了很多关于性能方面的改进，也着手从基础侧为 Flutter 增强扩展到其他平台进行改进。Flutter 2.2 着重改进开发体验，新项目会默认自动启用健全的空安全
，Flutter 的开发者工具 (DevTools) 并和 IDE 插件都得以改进和更新，DartPad 也为教学者增加了引导式代码体验。Dart 2.13 对空安全加入了更多更新，并推出了开发者们非常期待的「类型别名」的新特性。

Flutter 生态里有一个非常重要的角色，就是围绕着 Flutter 发布的一些 Dart Package，这些 package 极大程度上帮助了开发者更好的构建 Flutter 应用。FlutterFire 是官方维护的方便 Flutter 应用集成 Firebase 服务的一系列插件合集，官方也将一批自己维护的插件移交给社区进行维护，这标志着 Flutter 已经远不是只有 Google 工程团队在“单打独斗”，整个社区都在为 Flutter 进行持续贡献。除了广大的开发者社区成员们的贡献之外，丰田、Canonical、三星、索尼、微软也都在持续为 Flutter 做出贡献。Flutter 不只是适用于开发者，也同样适用于设计师们，Adobe XD 是一款 UI/UX 设计和协作工具，你可以使用 xd-to-flutter 插件轻松的将设计稿转换为支持空安全的 Flutter 代码。I/O 期间，Flutter 团队还联合 VGV 团队发布并开源了一个 [使用 Flutter 和 Firebase 构建的 Web 应用](https://mp.weixin.qq.com/s/vEtpHNgsNNzl5Bln3Tfr1g) ——「Flutter 照相亭」，作为一个样例应用，开发者们可以学习应用是如何构建良好的拍照体验、优化 Web 的应用体验以及使用 Firebase 完成业务逻辑等。

![2.5](https://devrel.andfun.cn/devrel/posts/2022/01/30914f7e0b7fe.png)

21 年 9 月，Flutter 更新到了 [2.5 正式版](./whats-new-in-flutter-2-5)，Dart 也发布了 [2.14 正式版](./announcing-dart-2-14)，这个版本仍延续了过去的一些工作，继续进行一些重要的性能和工具改进，也同时加入了对 Material You 的支持等。从这个版本开始，Dart 对 Apple 芯片的支持正式在稳定版渠道推出，同时增加了很多共享的代码 lint 工具，pub.dev 上的评分引擎也开始使用其中的部分 lint 规则，package 发布工具也支持了识别和使用 `.gitignore` 来声明哪些需要忽略的内容，避免上传无用的代码片段等。随着 Dart 空安全特性的推出，有很多应用开发者和 package 开发者们已经开始跟进并应用了健全的空安全特性。除了稳步更新 Flutter 移动端的性能和开发体验，[Flutter Web 也发布了产品路线图](./flutter-2022-roadmap)，力求让 Flutter 应用在 Web 平台的体验更自然。Flutter 团队几乎完全依靠 GitHub 等开源开放平台协作，所有的流程和代码改进都是向社区公开透明的，因此我们也在非常努力的推动国内的开发者参与全球社区贡献，并 [在每次的开发者调查中发声]({{site.bili.video}}/BV1CP4y1V7c9)，很多新特性和改进都会在 GitHub Issue 上发布并公开征集反馈，开发者们的反馈和交互越多，Flutter 团队就越重视，越会投入资源去解决。

从 Play 商店的应用数量看，Flutter 应用数量从 21 年第一季度的 15 万+ 上升到第二季度的 20 万+，同时，21 年 4 月到 5 月，Play 商店中有超过八分之一的新应用是采用 Flutter 构建，21 年年末 Play 商店的 Flutter 应用数量对比第二季度几乎翻番，达到了 37.5 万+ 款应用。这些数字证明着 Flutter 的流行，以及受到越来越多开发者们的采纳和喜爱。开发者们对 Flutter 的采纳和喜爱也同时体现在很多开发者报告里，分析公司 SlashData 的报告里显示：Flutter 是如今最流行的跨平台开发框架，有 45% 的受访开发者选用；RedMonk 排名中提到“Dart 有显著上升”；StackOverflow 的开发者调查体现出开发者喜爱的编程语言里，Dart 排名第七、喜爱的框架里，Flutter 排名第二；JetBrains 2021 开发者生态系统现状报告中显示，在跨平台移动框架选择上，Flutter 的受欢迎程度持续增长，已经超越 React Native 成为最流行的跨平台移动框架。使用 Flutter 的头部公司和应用也包含了 BMW、ByteDance、滴滴、eBay、Grab、Greggs、贝壳、Norton、Philips Hue、PUBG、SHEIN、trip.com、WeChat 等 (*排名不分先后)，截止 21 年末，全球的 Flutter 开发者数量已达 300 万以上，Flutter 也从最初的「便携式 UI 工具包」进化成「一个为环境计算打造的 UI 平台」。

![2.8](https://devrel.andfun.cn/devrel/posts/2022/01/d914e399b45a1.png)

2021 年的最后一次稳定版更新发布的是 [Flutter 2.8](./announcing-flutter-2-8) 和 [Dart 2.15](./announcing-dart-2-15)，这个版本着重关注的是移动端平台的性能，由于重新设计和实现了 Dart 编程语言中 [isolate 的工作方式](https://mp.weixin.qq.com/s/WCvv7DXzWXNRaMtM-0u7pA)，使得 isolate 所消耗的内存最高减少了 100 倍，体现在 Flutter 应用里就是启动性能和内存占用等性能都有非常大的提升，同时为了方便开发者们调试应用性能，新版的开发者工具 (DevTools) 加入了一个 Enhace Tracing (增强跟踪) 的功能，用于诊断消耗较大的、引起 UI 卡顿的 Widget 构建、布局和绘制操作。在 Web 的平台视图 (PlatformView) 方面，2.8 版本会复用平台视图之前创建的 canvas，提升性能减少滚动卡顿。围绕 package 生态，这次更新了一系列 Firebase 相关的插件，以及 Google 移动端广告 SDK 的插件，与此同时，你也可以通过 DartPad 工具直接使用部分 Firebase 插件和其他 package 了。2.8 还将桌面端的支持往前迈出了一大步，官方也在近期向全球开发者征集 [Flutter 桌面端的应用](https://mp.weixin.qq.com/s/RgUphbNnc6UTD05oppWnWA)，以扩大测试覆盖率，为 Flutter 桌面端的稳定支持提供更多保障。

![2:4:2022](https://devrel.andfun.cn/devrel/posts/2022/01/b7b3cf3eadea5.png)

回望 2021，Flutter 的发展势头正旺、潜力无限，展望 2022，更是信心满满。尤其是桌面端的版本推进，马上就会进行一个新的 Flutter 产品更新发布，这次发布是针对 Windows 桌面应用程序开发者的，中国时间 2 月 4 号 (正月初四) 发布，届时我们也会关注并推送最新的信息。

农历新年将至，向各位 Flutter 开发者们拜年了，祝大家虎年大吉、虎虎生威！愿所有不好的事情都烟消云散，愿这个世界的秩序可以尽快恢复，我们能自由的去见想见的人并和他们相互拥抱。衷心祝愿各位读者和家人朋友们身体健康、幸福美满！

我们今年为大家准备了两款 Flutter 红包封面，分别是 Dash 虎头帽和 Dash 迎新春 (迎新春款可通过领红包页面领取)，去年的三只小秃头也限时返场，祝愿各位开发者们虎年红红火火，再创佳绩！

![](https://devrel.andfun.cn/devrel/posts/2022/01/f9dvuY.jpg)

![虎头帽封面二维码](https://devrel.andfun.cn/devrel/posts/2022/01/ehgTJi.jpg)

![](https://devrel.andfun.cn/devrel/posts/2022/01/fbbcc804ac6c7.png)

![Dash 迎新春封面二维码](https://devrel.andfun.cn/devrel/posts/2022/01/jzJ8QQ.jpg)

![](https://devrel.andfun.cn/devrel/posts/2022/01/3ZiOn9.jpg)

![三小只封面二维码](https://devrel.andfun.cn/devrel/posts/2022/01/qnBir2.jpg)