---
title: Flutter 3.24 和 Dart 3.5 现已发布
description: Flutter 3.24 和 Dart 3.5 现已发布
toc: true
---


今天，我们正式发布 Flutter 3.24 和 Dart 3.5，与此同时，[I/O 2024 Connect 系列活动](https://ioconnectchina.googlecnapps.cn/) 的最后一站即将在几小时后在中国举行 —— 中国是 Flutter 全球最活跃的社区之一，这让本次发布更具意义。

![](https://img-s2.andfun.cn/devrel/posts/2024/08/d93bd7d871bc3.gif)

我们在 5 月的 [Google I/O](https://io.google/2024/) 上宣布了一系列令人兴奋的更新，包括 WebAssembly 编译支持进入稳定渠道、Impeller 的改进，以及对 Dart 宏的未来展望。

Flutter 3.24 和 Dart 3.5 版本进一步推进了我们的使命 —— 帮助你创建出色、高性能的应用，可以在移动端、Web 端和桌面端触及用户 —— 全部使用单一共享代码库。它们包括新的 Flutter GPU API 的早期预览、Web 上元素嵌入的增强，以及针对 iOS 生态系统构建的几项令人兴奋的更新，包括对 Swift Package Manager 的早期支持，以及对 Cupertino widget 的功能更新。

让我们一起来看看具体更新内容!

## Impeller: 提高多平台图形性能的标准

传统上，跨平台框架在视觉效果上需要妥协，因为它们依赖于底层平台提供的高级抽象。Flutter 采用了不同的方法，拥有自己的渲染层，可以在每个设备上提供硬件加速的图形和流畅的性能。我们在 [Impeller](https://docs.flutter.cn/perf/impeller) 和 [着色器](https://docs.flutter.cn/ui/design/graphics/fragment-shaders) 方面取得了实质性进展，为图形处理带来了激动人心的新可能 —— 比如 3D。

我们很高兴分享新的 [Flutter GPU API](https://github.com/flutter/engine/blob/main/docs/impeller/Flutter-GPU.md) 的早期预览，这是一个强大的底层图形 API，直接集成到 Flutter SDK 中。你可以通过该 API 自定义光栅管线并直接向 GPU 提交绘制调用，使得创建专门的渲染器成为可能，如 2D Canvas 替代品、3D 场景图，甚至粒子系统，以创建视觉上令人惊叹、高性能和身临其境的体验，而无需通常需要的引擎级别的开销。

![在 flutter_scene 中渲染的科幻太空头盔的 3D 动画](https://img-s2.andfun.cn/devrel/posts/2024/08/980027fc41658.gif)

考虑到这是一个底层 API，我们预计对于没有大量图形开发经验的开发者来说会有一个学习曲线。这就是为什么我们正在投资渲染 package，比如新的 `flutter_scene` package，它借助于 Flutter GPU API 导入动画 glTF 模型和构建 3D 场景，使你能够在 Flutter 和 Dart 中轻松构建 3D 应用和游戏，就像下面这个视频里展示的那样。

<iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1tM4m117Gx&page=1&autoplay=false" {{site.bili.set}}></iframe>

虽然 Flutter GPU API 提供了令人兴奋的可能性，但它仍处于早期预览阶段，我们可能会对 API 进行重大更改。我们建议在使用 Flutter GPU 时针对 Flutter 的主分支进行开发。在博文 [Flutter GPU 和 Flutter Scene 简介](https://medium.com/flutter/getting-started-with-flutter-gpu-f33d497b7c11) 中了解更多信息。

## “更 iOS 和 macOS” 的 Flutter —— 轻松地为 Apple 生态系统交付美观、快速的应用

我们的目标是让你能够构建出色的应用，这些应用感觉原生且性能出色。这项工作的一部分是优化性能以及最大化 Flutter 与底层平台的兼容性，包括访问 Apple 生态系统的全部功能。

在这个版本中，我们引入了对 Swift Package Manager 的早期支持，让开发者可以使用丰富的 Swift package 生态系统，并使 Flutter 插件能够利用大量预构建的功能来加速开发。一旦 Swift Package Manager (SPM) 被插件开发者广泛采用，它应该能简化 Flutter 安装过程本身，并降低新手的入门门槛，特别是那些不熟悉 iOS 生态系统的人。我们鼓励插件作者 [尝试为你的插件添加 SPM 支持](https://docs.flutter.cn/packages-and-plugins/swift-package-manager/for-plugin-authors#how-to-add-swift-package-manager-support-to-an-existing-flutter-plugin)，并提供你的体验 [反馈](https://github.com/flutter/flutter/issues)。

接下来，我们希望让你始终能够对设计师说「没问题、能实现」，并在 iOS 上交付高保真体验。为了解决这个问题，我们着手对 Cupertino widget 库进行现代化改造和扩展，解决了 Cupertino 的 [15 个问题](https://github.com/flutter/flutter/issues?q=is%3Aissue+is%3Aclosed+label%3A%22f%3A+cupertino%22+sort%3Aupdated-desc+closed%3A2024-04-01..2024-07-01+)，并在 [widget 目录](https://docs.flutter.cn/ui/widgets/cupertino) 中添加了 37 个缺失的 Cupertino widget。

最后，我们为 Flutter macOS 应用添加了 [平台视图](https://docs.flutter.cn/platform-integration/macos/platform-views)和 [WebView](https://docs.flutter.cn/platform-integration/web/web-content-in-flutter) 支持，允许将原生 macOS UI 组件无缝集成到你的 Flutter 应用中，以获得更完整和精致的用户体验。

展望未来，我们将继续在 Cupertino widget 保真度、Swift Package Manager 支持以及与 Apple 平台的集成和互操作性方面投入更多资源，让开发变得更加简单高效。

## 突显全球活跃的 Flutter 社区的影响

我们要感谢社区的贡献，包括你的贡献，这些发布离不开你们的支持！这组发布包含了近 1，500 次提交，来自超过 167 位独特的贡献者，包括 49 位新的贡献者。我们对 Flutter 社区持续高水平的活跃度、承诺和增长感到鼓舞，包括那些积极构建框架的人。感谢你们！

我们的共同努力正在世界各地产生影响，创造出令人惊叹的应用和体验，每天有数百万人在使用。例如，这里有一个 [案例研究](http://flutter.dev/showcase/xiaomi) 的预览，展示了中国科技公司小米的一个小团队如何以及为什么使用 Flutter 开发该公司流行的新电动汽车 [小米 SU7](https://www.mi.com/global/discover/article?id=3263&ref=renatomitra.com) 的配套应用。

<iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1zi421h7AD&page=1&autoplay=false" {{site.bili.set}}></iframe>

全球还有几个令人兴奋的 Flutter 应用示例：

- [**SNCF Connect**](http://flutter.dev/showcase/sncf-connect): 法国铁路，欧洲最大的 Flutter 应用，拥有超过 150 个屏幕，与奥运会合作，对 Flutter 应用进行了多项更新，使数百万访客能够在奥运会期间畅游法国。
- [**Wolt**](http://flutter.dev/showcase/wolt): DoorDash International 旗下产品，使用 Flutter 扩展到商户零售市场。
- [**惠而浦**](http://flutter.dev/showcase/whirlpool): 一家在全球拥有业务的财富 500 强公司，正在使用 Flutter 探索巴西的新销售渠道。
- [**Monta**](http://flutter.dev/showcase/monta): 一家丹麦电动汽车充电生态系统初创公司，使用 Flutter 仅用 3 个月就将他们的第一个移动应用推向市场，后来又成功地将他们的 Web 应用移植到 Flutter。

## 总结

以上只是 Flutter 和 Dart 在这些版本中的部分新功能和更新，你可以在[《Flutter 3.24 更新详解》](/posts/whats-new-in-flutter-3-24) 文章和[《Dart 3.5 更新详解》](/posts/dart-3-5) 文章中了解更多。

我们对 Flutter 的未来充满期待，并将继续致力于我们的使命。我们由衷感谢每一位贡献者、社区成员和 Flutter 开发者，是你们让这个旅程如此精彩。我们迫不及待地想看到你们接下来的创新之作！