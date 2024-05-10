---
title: 适用于 Flutter 的 Google 移动广告 SDK 正式版现已发布
toc: true
---

![](https://files.flutter-io.cn/posts/images/2021/12/yWS0zM.png)

*作者 / Zoey Fan，Flutter 产品经理*

应用变现有多种方法: 通过实体企业的店面接受付款、提供订阅或应用内购买，或者直接在应用中投放广告。经过六个月的 beta 测试期，我们很高兴能够推出 [Google 移动广告 SDK (Flutter)](https://pub.flutter-io.cn/packages/google_mobile_ads) 正式版。这对需要应用内广告的 Flutter 应用来说是个好消息！

## **支持的广告格式**

适用于 Flutter 的 Google 移动广告 (GMA) SDK 可在 iOS 和 Android 上运行，支持加载和显示所有的 [Google 移动广告格式](https://developers.google.cn/admob/flutter/quick-start)，包括：

**横幅广告 (Banner Ads):** 在应用布局中出现的矩形广告。在用户与应用交互时，这些广告可以锚定在屏幕的顶部或底部，也可以嵌入到用户滚动的内容中。除了标准固定尺寸的横幅广告，我们还支持自适应的横幅广告，它会基于设备的宽度和高度选择最佳的横幅尺寸。

**插页式广告 (Interstitial Ads):** 覆盖应用整个屏幕的全屏广告。这些广告适合放置在应用的自然停顿点或转场中。

**激励视频广告 (Rewarded Video Ads):** 一种激励广告单元，让用户通过与视频广告、试玩广告、或参与问卷调查进行互动来换取应用内商品的奖励。这是最受游戏开发者欢迎的广告格式之一。

**原生广告 (Native Ads):** 一种高度可定制的格式，可用来设计匹配应用内容外观和特质的广告。

**应用开屏广告 (App Open Ads):** 一种让移动应用加载体验得以变现的广告格式。当用户打开或切换回应用时，会展示开屏广告。

![](https://files.flutter-io.cn/posts/images/2021/12/6UpIut.png)

## **Google AdMob 和 Ad Manager**

我们和 Google Ads 团队合作开发了这个插件，作为 Flutter 开发者的官方广告解决方案。Flutter GMA SDK 通过一个插件整合了对 **Google AdMob 和 Google Ad Manager** 的支持。

如果你不熟悉 Google 的广告服务，你可能不知道 [AdMob](https://admob.google.cn/intl/zh-CN_cn/home/) 和 [Ad Manager](https://admanager.google.com/intl/zh-CN_cn/home/) 是两种不同的产品，具有不同的变现功能。AdMob 平台专为想要通过广告获利并获得切实可行的洞察以发展应用业务的移动开发者设计。Ad Manager 平台专为拥有大量直销或多种库存类型的发布商设计。

[Flutter GMA SDK](https://pub.flutter-io.cn/packages/google_mobile_ads) 统一了这些产品，通过在 iOS 和 Android 平台共享代码来满足你的变现需求，且无需在需求增长时重写代码。

![](https://files.flutter-io.cn/posts/images/2021/12/VGvTlQ.png)

## **中介和竞价**

此版本还包括一个新中介功能的预览，以帮助你优化广告效果。[中介](https://developers.google.cn/admob/flutter/mediation/get-started) (Mediation) 可以帮助你在一个地方统一管理用于向你的应用投放广告的多个广告源。除了 Google 的广告投放需求，中介还可以让你展示来自非 Google 广告网络的广告。通过中介功能，你可以将传入的广告请求发送给多个广告源，并找出最佳的可用来源以满足请求。除了传统的中介功能，该插件还支持竞价，让广告源通过实时竞价来满足你的广告请求。这可以确保你从广告展示中获取最高的收入。

Flutter GMA SDK 为 iOS 和 Android 应用提供相同的广告功能。你可以使用相同的工具来管理广告计划，追踪广告效果，等等。

## **早期适配的开发者**

我们一直在与一些早期适配的开发者合作，他们热切希望在我们的正式版发布之前就开始使用 Flutter 提供的广告支持。其中一位开发者是 Lotum，他们最近重新编写了其广受好评的文字游戏 "[4 Pics 1 Word](https://play.google.com/store/apps/details?id=de.lotum.whatsinthefoto.us&hl=en_US&gl=US)"，这是一款在 50 个国家/地区获得巨大成功的应用，仅 Android 版本的安装量就超过 5,000 万。他们选择使用 Flutter 来进行重写，用 Flutter GMA SDK 来展示插页式广告和激励视频。

该应用的 Flutter 开发者 Petra Langenbacher 如此说道:

> 多年来，我们一直在打磨和优化我们的应用，我们曾担心大规模重写会影响我们的收入或用户群。但是我们惊喜地发现，情况并不是这样: 我们能够在不造成任何负面影响的前提下做出这些改变！

感谢 Lotum 和所有其他早期适配的开发者为我们提供的宝贵反馈。非常感谢大家为初始版本提供的帮助。

## **其他变现功能**

除了广告，Flutter 也提供了应用变现的其他方法。例如，[应用内购买](https://pub.flutter-io.cn/packages/in_app_purchase) (In-App Purchase) 插件可以让你在应用中提供额外内容，包括高级服务、数字商品和订阅。Flutter 的 [Pay](https://pub.flutter-io.cn/packages/pay) 插件可以让你的应用在 Android 设备上集成 Google Pay 以及在 iOS 上集成 Apple Pay，从而让你快速轻松地支持这两个平台，为你的用户打造顺畅的付款体验，来购买日用品、零售商品和食品外卖等。

要了解 Ads 的详情或其他变现功能，请前往我们 [最近更新的网站](https://flutter.cn/monetization) 查看示例、Codelab 和文档。

构建 Flutter 应用仅仅只是开始。我们希望你能善加利用这一系列变现功能，通过 Flutter 打造成功的业务！
