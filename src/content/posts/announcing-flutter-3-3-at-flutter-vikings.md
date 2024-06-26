---
title: 祝福 Eric 的下一段旅程，Flutter 3.3 现已发布
toc: true
keywords: Flutter 3.3, Flutter Vikings, Wonderous, Impeller
description: Flutter 3.3 正式发布，这个版本这个版本专注于完善和性能改进，以加强 Flutter 3 发布以来的新特性。
image:
    path: https://files.flutter-io.cn/posts/images/2022/09/ubVHzF.jpg
---

Flutter 团队及社区成员们在美丽的城市挪威奥斯陆向你发来问候，我们正在此参加社区举办的 Flutter Vikings 活动，这是一个为期两天的开发技术交流盛会，虽然线下门票已经售罄，但你还可以通过在线方式查看本次会议。本周，我们也有很多更新要分享给各位开发者们。

Flutter 的使用量和生态系统都在持续增长，**每天有超过 1,000 款使用 Flutter 的、新的移动应用发布到 App Store 和 Google Play 商店**，在 Web 端和桌面端的使用也在持续增长。Flutter 生态中目前也有超过 25,000 个以上的 package，这也进一步证明了 Flutter 的成熟和广泛应用。

![]({{site.flutter-files-cn}}posts/images/2022/09/ubVHzF.jpg)

今天，我们正式发布 Flutter 3.3。这个版本专注于完善和性能改进，以加强 Flutter 3 发布以来的新特性。Flutter 3.3 加入了一些新的组件并修复了一些错误以加强对 Material 3 规范的支持，也加入了对 iPad 上使用随手写输入文本的支持、可选择的文本分组和触控板支持等对平板电脑和桌面开发者有帮助的新支持。这个版本还包括了 Dart 2.18 的发布，它为使用 Swift 和 Objective-C 构建的库和代码加入了 FFI 的支持。使用这个 Dart 版本构建的应用，将会在桌面端、Web 端和移动端表现出更好的性能。因此我们强力建议你即刻运行命令 flutter upgrade 来升级到最新版。

## **发布 Wonderous 应用**

我们与 gskinner 的设计团队通力合作，发布了一个名为 Wonderous 的应用，旨在向大家展示 Flutter 的强大功能——帮助你构建出高质量、精美的用户体验，而它本身就是一个非常精美的应用——从印度阿格拉市令人惊叹的泰姬陵到墨西哥尤卡坦半岛上的玛雅遗址，Wonderous 将世界上一些非常了不起的地方带到你的手机上，使用视频和图像来探索这些艺术、历史和文化的交集。

![]({{site.flutter-files-cn}}posts/images/2022/09/TDcEt8.jpg)

我们希望你与家人和朋友分享 Wonderous，更重要的是，它还作为一个开源项目供开发者们探索。作为一个真实上线运营的应用，它提供了一个完整且全面的示例，展示了我们希望为中高级开发者带去灵感和创想的最佳实践。未来的几周时间里，gskinner 团队将会分享关于这个应用的更多技术细节文章，包括对无障碍的支持、动画效果以及性能方面的技巧等内容。

## **引入新的图形引擎: Impeller**

除了上面提到的 3.3 版本的改进内容之外，Flutter 团队还在努力开发 **下一代的渲染层引擎: Impeller**。

Impeller 是对 Flutter Engine 核心部分的一次重大重写，使用一个定制的运行时环境来取代 Skia 代码，并充分利用现代的硬件加速的图形 API，如 iOS 上的 Metal 和 Android 上的 Vulkan。Impeller 提供了丝滑的动画效果，并很大程度提升了各种多平台 UI 工具包的 "门槛"。这个性能上的差异是肉眼可见的，使用 Impeller 的应用可以保持 60Hz 或者更快的刷新率的同时，能够比以前更进一步地突破界限。最值得注意的是，Impeller 完全消除了对运行时着色器编译的需要，而运行时着色器编译是丢帧卡顿的一个常见来源。

虽然 Impeller 现有的功能还不够完善，并且我们也还在优化它的性能，但我们现在正在一个 Google 级的产品应用上做内部测试。如果你在 App Store 下载刚刚提到的 Wonderous for iPhone，你就能提前感受 Impeller 在生产环境中的应用上运行的效果。

**我们正在 iOS 上为 Impeller 做一个早期采纳者的预览版本** ，除了在命令中加入一个启用 Impeller 参数 (--enable-impeller) 之外，你无需对现有代码做任何改动就能启用它。更多的关于 Impeller 架构以及如何启用的文档你都可以在我们的 [wiki 页面](https://github.com/flutter/flutter/wiki/Impeller "Impeller 概览") 中找到。Impeller 正处于积极开发的状态，如果你想参与作为早期采纳者来使用的话，你需要切换到 Flutter 的 master 发布渠道来确保使用了最新的代码。

我们期待着更多使用 Impeller 的应用出现，同时也非常欢迎使用了 Impeller 的开发者向我们提出当下版本的、可复现的、对应用当前版本性能影响或者保真度失真的 [报告](https://github.com/flutter/flutter/issues/new?assignees=&labels=created+via+performance+template&labels=impeller&template=4_performance_others.md&title=%5BImpeller%5D "提交性能影响或者保真度失真问题报告")。

## **祝福 Eric 的下一段旅程**

最后，我们想要以对 Flutter 的联合创始人之一、Flutter 工程主管 Eric Seidel 的祝福作为结尾，他将于本月离开谷歌并开启新的冒险旅程。2015 年的 Dart 开发者峰会上，Eric 首次向全世界介绍 Flutter，当时 Flutter 还木有名字和吉祥物，在 Flutter 的过去和现在的大部分时间里，Eric 一直在带领和管理 Flutter 的工程团队，简单说，没有 Eric 就没有 Flutter。

Eric 是一个天生的创业者，他的 "superpower" ("超能力"，superpower 也是 Eric 最喜欢用的词语之一) 便是创造和发起新的构想和理念，因此，当 Eric 决定开启下一段冒险旅程的时候，我们衷心为他祝福。

以 [Flutter 1.0 发布](https://developers.google.cn/events/flutter-live "Flutter 1.0 发布") Eric 在当时 Flutter Live 大会上对 Flutter 的愿景作为结尾: Flutter 是一个长期主义的赌注，**希望从根本上做出改善并构建一个美好的用户体验**。这仍是我们的愿景，因为这个结果还没有最终实现。全球有数百万开发者信赖 Flutter，Flutter 生态有成千上万的贡献者，Google 的 Flutter 团队也正在蓬勃发展，我们希望你可以继续加入我们的 Flutter 之旅，谢谢！
