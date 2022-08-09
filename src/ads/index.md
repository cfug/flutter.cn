---
title: Ads support for Flutter
title: Flutter 对广告的支持
description: Learn how to put ads in your Flutter apps.
description: 学习如何将广告加入您的 Flutter 应用中。
---

Monetizing apps by using ads has been one of
the most popular requests for many Flutter developers.

通过使用广告获利是众多 Flutter 开发者最流行的需求之一。

Flutter ads support is available through the
[Google Mobile Ads SDK for Flutter (Beta)][plugin],
which works with both AdMob and AdManager.
This plugin supports a variety of ad formats,
including banner (inline and overlay),
interstitial, rewarded video, native ads,
and adaptive banner.

Flutter 广告支持功能可以通过 [Google Mobile Ads SDK for Flutter (Beta)][plugin] 插件获得，这款插件可以与 AdMob 和 AdManager 一起使用。
这款插件还支持多种广告格式，其中包括横幅广告（内嵌和叠加），插页式广告，奖励视频广告，原生广告和自适应横幅广告。

![Pic showing different types of ads]({{site.url}}/assets/images/ads/GoogleMobileAdTypes.png){:width="100%"}

The following video tutorial,
[Monetizing apps with Flutter][],
shows how to get started with Ads:

以下的视频教程，[通过 Flutter 应用获利][]，展示了如何开始使用广告功能。

<iframe width="560" height="315" src="https://player.bilibili.com/player.html?aid=289460171&bvid=BV1Vf4y147Er&cid=305747760&page=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

The following resources can help you get started:

以下资源可以帮助你入门：

* To get the Google Mobile Ads SDK for Flutter,
  download the [google_mobile_ads plugin][plugin] from pub.dev.
  
  要获取 Flutter 的谷歌移动广告 SDK ，请在 pub.dev 下载 [google_mobile_ads plugin][plugin] 插件。

* For instructions on creating and loading an Ad with
  AdMob or AdManager, see the [detailed implementation guide][].

  对于如何使用 AdMob 或 AdManager 创建和加载广告的相关说明，可以查阅 [detailed implementation guide][] 文档。

* To learn how to implement overlay banner,
  interstitial, and rewarded ads, see the
  [Adding AdMob ads to a Flutter app][] codelab.

  想要了解如何实现叠加横幅广告、插页式广告和奖励广告，可以查阅 [Adding AdMob ads to a Flutter app][] 文档。

* To learn how to implement inline banner
  and native ads, see the [Adding AdMob banner
  and native inline ads to a Flutter app][] codelab.

  想要了解如何实现内嵌横幅广告和本地广告，可以查阅 [Adding AdMob banner
  and native inline ads to a Flutter app][] 文档。

* If you experience any problems with the beta release,
  please [file an issue][].

  如果你在测试版本中遇到任何问题，请 [提出问题][] 。

[Adding AdMob Ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-ads-in-flutter#0
[Adding AdMob banner and native inline ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-inline-ads-in-flutter
[detailed implementation guide]: {{site.developers}}/admob/flutter
[file an issue]: {{site.github}}/googleads/googleads-mobile-flutter/issues
[Monetizing apps with Flutter]: {{site.youtube-site}}/watch?v=m0d_pbgeeG8&feature=youtu.be
[plugin]: {{site.pub-pkg}}/google_mobile_ads
[通过 Flutter 应用获利]: {{site.youtube-site}}/watch?v=m0d_pbgeeG8&feature=youtu.be
[提出问题]: {{site.github}}/googleads/googleads-mobile-flutter/issues

