---
title: Ads support for Flutter
title: Flutter 对广告的支持
description: Learn how to put ads in your Flutter apps.
description: 学习如何将广告加入您的 Flutter 应用中。
---

Monetizing apps by using ads has been one of
the most popular requests for many Flutter developers.

Flutter ads support is available through the
[Google Mobile Ads SDK for Flutter (Beta)][plugin],
which works with both AdMob and AdManager.
This plugin supports a variety of ad formats,
including banner (inline and overlay),
interstitial, rewarded video, native ads,
and adaptive banner.

![Pic showing different types of ads](/assets/images/ads/GoogleMobileAdTypes.png){:width="100%"}

The following video tutorial,
[Monetizing apps with Flutter][],
shows how to get started with Ads:

<iframe width="560" height="315" src="https://player.bilibili.com/player.html?aid=289460171&bvid=BV1Vf4y147Er&cid=305747760&page=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

The following resources can help you get started:

* To get the Google Mobile Ads SDK for Flutter,
  download the [google_mobile_ads plugin][plugin] from pub.dev.
* For instructions on creating and loading an Ad with
  AdMob or AdManager, see the [detailed implementation guide][].
* To learn how to implement overlay banner,
  interstitial, and rewarded ads, see the
  [Adding AdMob ads to a Flutter app][] codelab.
* To learn how to implement inline banner
  and native ads, see the [Adding AdMob banner
  and native inline ads to a Flutter app][] codelab.
* If you experience any problems with the beta release,
  please [file an issue][].


[Adding AdMob Ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-ads-in-flutter#0
[Adding AdMob banner and native inline ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-inline-ads-in-flutter
[detailed implementation guide]: {{site.developers}}/admob/flutter
[file an issue]: {{site.github}}/googleads/googleads-mobile-flutter/issues
[Monetizing apps with Flutter]: {{site.youtube-site}}/watch?v=m0d_pbgeeG8&feature=youtu.be
[plugin]: {{site.pub-pkg}}/google_mobile_ads
