---
# title: Add ads to your mobile Flutter app or game
title: 为移动 Flutter 应用或游戏添加广告
# shortTitle: Show ads
shortTitle: 展示广告
# description: How to use the google_mobile_ads package to show ads in Flutter.
description: 如何使用 google_mobile_ads package 在 Flutter 中展示广告。
ai-translated: true
---

<?code-excerpt path-base="cookbook/plugins/google_mobile_ads"?>

{% comment %}
  This partly duplicates the AdMob documentation
  here: https://developers.google.com/admob/flutter/quick-start

  The added value of this page is that it's more straightforward for
  someone who just has a Flutter app or game and wants to add
  monetization to it.

  In short, this is a friendlier --- though not as comprehensive ---
  introduction to ads in Flutter.
{% endcomment %}


Many developers use advertising to monetize their mobile apps and games.
This allows their app to be downloaded free of charge,
which improves the app's popularity.

许多开发者通过广告为移动应用和游戏变现。
这允许应用免费下载，从而提高应用的人气。

![An illustration of a smartphone showing an ad](/assets/images/docs/cookbook/ads-device.jpg){:.site-illustration}

To add ads to your Flutter project, use
[AdMob](https://admob.google.com/home/),
Google's mobile advertising platform.
This recipe demonstrates how to use the
[`google_mobile_ads`]({{site.pub-pkg}}/google_mobile_ads)
package to add a banner ad to your app or game.

要向 Flutter 项目添加广告，请使用 Google 的移动广告平台
[AdMob](https://admob.google.com/home/)。
本实用教程演示如何使用
[`google_mobile_ads`]({{site.pub-pkg}}/google_mobile_ads)
package 向应用或游戏添加横幅广告。

:::note
Apart from AdMob, the `google_mobile_ads` package also supports
Ad Manager, a platform intended for large publishers. Integrating Ad
Manager resembles integrating AdMob, but it won't be covered in this
cookbook recipe. To use Ad Manager, follow the
[AdMob documentation]({{site.developers}}/ad-manager/mobile-ads-sdk/flutter/quick-start).

除了 AdMob，`google_mobile_ads` package 还支持面向大型发布商的 Ad Manager 平台。
集成 Ad Manager 与集成 AdMob 类似，但本实用教程不会涵盖。
要使用 Ad Manager，请遵循
[AdMob 文档]({{site.developers}}/ad-manager/mobile-ads-sdk/flutter/quick-start)。
:::

## 1. Get AdMob App IDs

## 1. 获取 AdMob App ID

1.  Go to [AdMob](https://admob.google.com/) and set up an
    account. This could take some time because you need to provide
    banking information, sign contracts, and so on.

    前往 [AdMob](https://admob.google.com/) 并设置账户。
    这可能需要一些时间，因为你需要提供银行信息、签署合同等。

2.  With the AdMob account ready, create two *Apps* in AdMob: one for
    Android and one for iOS.

    AdMob 账户就绪后，在 AdMob 中创建两个 **应用**：一个用于 Android，一个用于 iOS。

3.  Open the **App settings** section.

    打开 **App settings**（应用设置）部分。

4.  Get the AdMob *App IDs* for both the Android app and the iOS app.
    They resemble `ca-app-pub-1234567890123456~1234567890`. Note the
    tilde (`~`) between the two numbers.
    {% comment %} https://support.google.com/admob/answer/7356431 for future reference {% endcomment %}

    获取 Android 应用和 iOS 应用的 AdMob **App ID**。
    它们类似 `ca-app-pub-1234567890123456~1234567890`。注意两个数字之间的
    波浪号 (`~`)。
    {% comment %} https://support.google.com/admob/answer/7356431 for future reference {% endcomment %}

    ![Screenshot from AdMob showing the location of the App ID](/assets/images/docs/cookbook/ads-app-id.png)

## 2. Platform-specific setup

## 2. 平台特定配置

Update your Android and iOS configurations to include your App IDs.

更新 Android 和 iOS 配置以包含你的 App ID。

{% comment %}
    Content below is more or less a copypaste from devsite:
    https://developers.google.com/admob/flutter/quick-start#platform_specific_setup
{% endcomment %}

### Android

Add your AdMob app ID to your Android app.

将 AdMob App ID 添加到你的 Android 应用。

1.  Open the app's `android/app/src/main/AndroidManifest.xml` file.

    打开应用的 `android/app/src/main/AndroidManifest.xml` 文件。

2.  Add a new `<meta-data>` tag.

    添加新的 `<meta-data>` 标签。

3.  Set the `android:name` element with a value of
    `com.google.android.gms.ads.APPLICATION_ID`.

    将 `android:name` 元素的值设为
    `com.google.android.gms.ads.APPLICATION_ID`。

4.  Set the `android:value` element with the value to your own AdMob app
    ID that you got in the previous step.
    Include them in quotes as shown:

    将 `android:value` 元素设为上一步获得的 AdMob App ID。
    按所示用引号括起来：

    ```xml
    <manifest>
        <application>
            ...

            <!-- Sample AdMob app ID: ca-app-pub-3940256099942544~3347511713 -->
            <meta-data
                android:name="com.google.android.gms.ads.APPLICATION_ID"
                android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
        </application>
    </manifest>
    ```

### iOS

Add your AdMob app ID to your iOS app.

将 AdMob App ID 添加到你的 iOS 应用。

1.  Open your app's `ios/Runner/Info.plist` file.

    打开应用的 `ios/Runner/Info.plist` 文件。

2.  Enclose `GADApplicationIdentifier` with a `key` tag.

    用 `key` 标签包裹 `GADApplicationIdentifier`。

3.  Enclose your AdMob app ID with a `string` tag. You created this AdMob
    App ID in [step 1](#1-get-admob-app-ids).

    用 `string` 标签包裹你的 AdMob App ID。该 AdMob App ID 在 [第 1 步](#1-get-admob-app-ids) 中创建。

    ```xml
    <key>GADApplicationIdentifier</key>
    <string>ca-app-pub-################~##########</string>
    ```

## 3. Add the `google_mobile_ads` plugin

## 3. 添加 `google_mobile_ads` 插件

To add the `google_mobile_ads` plugin as a dependency, run
`flutter pub add`:

要将 `google_mobile_ads` 插件添加为依赖，运行 `flutter pub add`：

```console
$ flutter pub add google_mobile_ads
```

:::note
Once you add the plugin, your Android app might fail to build with a
`DexArchiveMergerException`:

添加插件后，你的 Android 应用可能会因 `DexArchiveMergerException` 构建失败：

```plaintext
Error while merging dex archives:
The number of method references in a .dex file cannot exceed 64K.
```

To resolve this, execute the `flutter run` command in the terminal, not
through an IDE plugin. The `flutter` tool can detect the issue and ask
whether it should try to solve it. Answer `y`, and the problem goes away.
You can return to running your app from an IDE after that.

要解决此问题，在终端执行 `flutter run` 命令，而不是通过 IDE 插件。
`flutter` 工具可以检测问题并询问是否尝试解决。回答 `y`，问题就会消失。
之后你可以再从 IDE 运行应用。

![Screenshot of the `flutter` tool asking about multidex support](/assets/images/docs/cookbook/ads-multidex.png)
:::

## 4. Initialize the Mobile Ads SDK

## 4. 初始化 Mobile Ads SDK

You need to initialize the Mobile Ads SDK before loading ads.

加载广告前需要初始化 Mobile Ads SDK。

1.  Call `MobileAds.instance.initialize()` to initialize the Mobile Ads
    SDK.

    调用 `MobileAds.instance.initialize()` 初始化 Mobile Ads SDK。

    <?code-excerpt "lib/main.dart (main)"?>
    ```dart
    void main() async {
      WidgetsFlutterBinding.ensureInitialized();
      unawaited(MobileAds.instance.initialize());
    
      runApp(const MyApp());
    }
    ```

Run the initialization step at startup, as shown above,
so that the AdMob SDK has enough time to initialize before it is needed.

如上所示，在启动时运行初始化步骤，
以便 AdMob SDK 在需要之前有足够时间完成初始化。

:::note
`MobileAds.instance.initialize()` returns a `Future` but, the
way the SDK is built, you don't need to `await` it.
If you try to load an ad before that `Future` is completed,
the SDK will gracefully wait until the initialization, and _then_ load the ad.
You can await the `Future`
if you want to know the exact time when the AdMob SDK is ready.

`MobileAds.instance.initialize()` 返回 `Future`，但
SDK 的构建方式使你无需 `await` 它。
如果你在 `Future` 完成前尝试加载广告，
SDK 会优雅地等待初始化完成，**然后** 再加载广告。
如果你想知道 AdMob SDK 就绪的确切时间，可以 `await` 该 `Future`。
:::

## 5. Load a banner ad

## 5. 加载横幅广告

To show an ad, you need to request it from AdMob.

要展示广告，你需要向 AdMob 请求广告。

To load a banner ad, construct a `BannerAd` instance, and
call `load()` on it.

要加载横幅广告，构造 `BannerAd` 实例并对其调用 `load()`。

:::note
The following code snippet refers to fields such a `adSize`, `adUnitId`
and `_bannerAd`. This will all make more sense in a later step.

以下代码片段引用了 `adSize`、`adUnitId` 和 `_bannerAd` 等字段。
这些在后续步骤中会更容易理解。
:::

<?code-excerpt "lib/my_banner_ad.dart (loadAd)"?>
```dart
/// Loads a banner ad.
void _loadAd() {
  final bannerAd = BannerAd(
    size: widget.adSize,
    adUnitId: widget.adUnitId,
    request: const AdRequest(),
    listener: BannerAdListener(
      // Called when an ad is successfully received.
      onAdLoaded: (ad) {
        if (!mounted) {
          ad.dispose();
          return;
        }
        setState(() {
          _bannerAd = ad as BannerAd;
        });
      },
      // Called when an ad request failed.
      onAdFailedToLoad: (ad, error) {
        debugPrint('BannerAd failed to load: $error');
        ad.dispose();
      },
    ),
  );

  // Start loading.
  bannerAd.load();
}
```

To view a complete example, check out the last step of this recipe.

要查看完整示例，请参阅本实用教程的最后一步。

## 6. Show banner ad

## 6. 展示横幅广告

Once you have a loaded instance of `BannerAd`, use `AdWidget` to show it.

获得已加载的 `BannerAd` 实例后，使用 `AdWidget` 展示它。

```dart
AdWidget(ad: _bannerAd)
```

It's a good idea to wrap the widget in a `SafeArea` (so that no part of
the ad is obstructed by device notches) and a `SizedBox` (so that it has
its specified, constant size before and after loading).

建议用 `SafeArea` 包裹 widget（避免广告被设备刘海遮挡），
并用 `SizedBox` 包裹（使加载前后具有指定的固定尺寸）。

<?code-excerpt "lib/my_banner_ad.dart (build)"?>
```dart
@override
Widget build(BuildContext context) {
  return SafeArea(
    child: SizedBox(
      width: widget.adSize.width.toDouble(),
      height: widget.adSize.height.toDouble(),
      child: _bannerAd == null
          // Nothing to render yet.
          ? const SizedBox()
          // The actual ad.
          : AdWidget(ad: _bannerAd!),
    ),
  );
}
```

You must dispose of an ad when you no longer need to access it. The best
practice for when to call `dispose()` is either after the `AdWidget` is
removed from the widget tree or in the
`BannerAdListener.onAdFailedToLoad()` callback.

不再需要访问广告时必须释放它。调用 `dispose()` 的最佳实践是
在 `AdWidget` 从 widget 树移除后，或在
`BannerAdListener.onAdFailedToLoad()` 回调中调用。

<?code-excerpt "lib/my_banner_ad.dart (dispose)"?>
```dart
_bannerAd?.dispose();
```


## 7. Configure ads

## 7. 配置广告

To show anything beyond test ads, you have to register ad units.

要展示测试广告以外的内容，你必须注册 ad unit。

1.  Open [AdMob](https://admob.google.com/).

    打开 [AdMob](https://admob.google.com/)。

2.  Create an *Ad unit* for each of the AdMob apps.

    为每个 AdMob 应用创建 **Ad unit**。

    ![Screenshot of the location of Ad Units in AdMob web UI](/assets/images/docs/cookbook/ads-ad-unit.png)

    This asks for the Ad unit's format. AdMob provides many formats
    beyond banner ads --- interstitials, rewarded ads, app open ads, and
    so on.
    The API for those is similar, and documented in the
    [Ad Manager documentation]({{site.developers}}/admob/flutter/quick-start)
    and through
    [official samples](https://github.com/googleads/googleads-mobile-flutter/tree/main/samples/admob).

    这会询问 Ad unit 的格式。AdMob 提供横幅广告以外的多种格式
    ——插页式广告、激励广告、应用开屏广告等。
    这些格式的 API 类似，记录在
    [Ad Manager 文档]({{site.developers}}/admob/flutter/quick-start) 和
    [官方示例](https://github.com/googleads/googleads-mobile-flutter/tree/main/samples/admob) 中。

3.  Choose banner ads.

    选择横幅广告。

4.  Get the *Ad unit IDs* for both the Android app and the iOS app.
    You can find these in the **Ad units** section. They look something
    like `ca-app-pub-1234567890123456/1234567890`. The format resembles
    the *App ID* but with a slash (`/`) between the two numbers. This
    distinguishes an *Ad unit ID* from an *App ID*.

    获取 Android 应用和 iOS 应用的 **Ad unit ID**。
    你可以在 **Ad units** 部分找到它们。它们类似
    `ca-app-pub-1234567890123456/1234567890`。格式与 **App ID** 类似，
    但两个数字之间是斜杠 (`/`) 而不是波浪号。
    这用于区分 **Ad unit ID** 与 **App ID**。

    ![Screenshot of an Ad Unit ID in AdMob web UI](/assets/images/docs/cookbook/ads-ad-unit-id.png)

5.  Add these *Ad unit IDs* to the constructor of `BannerAd`,
    depending on the target app platform.

    根据目标应用平台，将这些 **Ad unit ID** 添加到 `BannerAd` 的构造函数中。

    <?code-excerpt "lib/my_banner_ad.dart (adUnitId)"?>
    ```dart
    final String adUnitId = Platform.isAndroid
        // Use this ad unit on Android...
        ? 'ca-app-pub-3940256099942544/6300978111'
        // ... or this one on iOS.
        : 'ca-app-pub-3940256099942544/2934735716';
    ```

## 8. Final touches

## 8. 收尾工作

To display the ads in a published app or game (as opposed to debug or
testing scenarios), your app must meet additional requirements:

要在已发布的应用或游戏中展示广告（而非调试或测试场景），
你的应用必须满足额外要求：

1.  Your app must be reviewed and approved before it can fully serve
    ads.
    Follow AdMob's [app readiness guidelines](https://support.google.com/admob/answer/10564477).
    For example, your app must be listed on at least one of the
    supported stores such as Google Play Store or Apple App Store.

    你的应用必须经过审核和批准才能完整投放广告。
    遵循 AdMob 的 [应用就绪指南](https://support.google.com/admob/answer/10564477)。
    例如，你的应用必须至少上架 Google Play 商店或 Apple App Store 等受支持的商店之一。

2.  You must [create an `app-ads.txt`](https://support.google.com/admob/answer/9363762)
    file and publish it on your developer website.

    你必须 [创建 `app-ads.txt`](https://support.google.com/admob/answer/9363762)
    文件并将其发布在开发者网站上。

![An illustration of a smartphone showing an ad](/assets/images/docs/cookbook/ads-device.jpg){:.site-illustration}

To learn more about app and game monetization,
visit the official sites
of [AdMob](https://admob.google.com/)
and [Ad Manager](https://admanager.google.com/).

要了解更多应用和游戏变现信息，
请访问 [AdMob](https://admob.google.com/) 和
[Ad Manager](https://admanager.google.com/) 的官方网站。


## 9. Complete example

## 9. 完整示例

The following code implements a simple stateful widget that loads a
banner ad and shows it.

以下代码实现了一个加载并展示横幅广告的简单 stateful widget。

<?code-excerpt "lib/my_banner_ad.dart"?>
```dart
import 'dart:io';

import 'package:flutter/widgets.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class MyBannerAdWidget extends StatefulWidget {
  /// The requested size of the banner. Defaults to [AdSize.banner].
  final AdSize adSize;

  /// The AdMob ad unit to show.
  ///
  /// TODO: replace this test ad unit with your own ad unit
  final String adUnitId = Platform.isAndroid
      // Use this ad unit on Android...
      ? 'ca-app-pub-3940256099942544/6300978111'
      // ... or this one on iOS.
      : 'ca-app-pub-3940256099942544/2934735716';

  MyBannerAdWidget({super.key, this.adSize = AdSize.banner});

  @override
  State<MyBannerAdWidget> createState() => _MyBannerAdWidgetState();
}

class _MyBannerAdWidgetState extends State<MyBannerAdWidget> {
  /// The banner ad to show. This is `null` until the ad is actually loaded.
  BannerAd? _bannerAd;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SizedBox(
        width: widget.adSize.width.toDouble(),
        height: widget.adSize.height.toDouble(),
        child: _bannerAd == null
            // Nothing to render yet.
            ? const SizedBox()
            // The actual ad.
            : AdWidget(ad: _bannerAd!),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _loadAd();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  /// Loads a banner ad.
  void _loadAd() {
    final bannerAd = BannerAd(
      size: widget.adSize,
      adUnitId: widget.adUnitId,
      request: const AdRequest(),
      listener: BannerAdListener(
        // Called when an ad is successfully received.
        onAdLoaded: (ad) {
          if (!mounted) {
            ad.dispose();
            return;
          }
          setState(() {
            _bannerAd = ad as BannerAd;
          });
        },
        // Called when an ad request failed.
        onAdFailedToLoad: (ad, error) {
          debugPrint('BannerAd failed to load: $error');
          ad.dispose();
        },
      ),
    );

    // Start loading.
    bannerAd.load();
  }

}
```

:::tip
In many cases, you will want to load the ad _outside_ a widget.

在许多情况下，你会希望在 widget **外部** 加载广告。

For example, you can load it in a `ChangeNotifier`, a BLoC, a controller,
or whatever else you are using for app-level state. This way, you can
preload a banner ad in advance, and have it ready to show for when the
user navigates to a new screen.

例如，你可以在 `ChangeNotifier`、BLoC、controller
或你用于应用级状态的其他方式中加载它。这样你可以提前预加载横幅广告，
在用户导航到新屏幕时即可展示。

Verify that you have loaded the `BannerAd` instance before showing it with
an `AdWidget`, and that you dispose of the instance when it is no longer
needed.

在使用 `AdWidget` 展示前，请确认已加载 `BannerAd` 实例，
并在不再需要时释放该实例。
:::
