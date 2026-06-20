---
# title: Add the predictive-back gesture
title: 添加预测性返回手势
# shortTitle: Predictive-back
shortTitle: 预测性返回
# description: >-
#   Learn how to add the predictive back gesture to your Android app.
description: >-
  了解如何在你的 Android 应用中添加预测性返回手势。
ai-translated: true
---

This feature has landed in Flutter,
but it's not enabled by default in Android itself yet.
You can try it out using the following instructions.

该功能已在 Flutter 中落地，
但 Android 本身尚未默认启用。
你可以按以下说明试用。

## Configure your app

## 配置你的应用

Make sure your app supports Android API 33 or higher,
as predictive back won't work on older versions of Android.
Then, set the flag `android:enableOnBackInvokedCallback="true"`
in `android/app/src/main/AndroidManifest.xml`.

确保你的应用支持 Android API 33 或更高版本，
因为预测性返回在更低版本的 Android 上无效。
然后在 `android/app/src/main/AndroidManifest.xml` 中设置标志 `android:enableOnBackInvokedCallback="true"`。

## Configure your device

## 配置你的设备

You need to enable Developer Mode and set a flag on your device,
so you can't yet expect predictive back to work on most users'
Android devices. If you want to try it out on your own device though,
make sure it's running API 33 or higher, and then in
**Settings => System => Developer** options,
make sure the switch is enabled next to **Predictive back animations**.

你需要启用开发者模式并在设备上设置标志，
因此尚不能指望大多数用户的 Android 设备上都能使用预测性返回。若你想在自己的设备上试用，
请确保运行 API 33 或更高版本，然后在
**Settings => System => Developer** 选项中，
确保 **Predictive back animations** 旁的开关已启用。

## Set up your app

## 设置你的应用

The predictive back route transitions are currently
not enabled by default, so for now you'll need to enable them
manually in your app.
Typically, you do this by setting them in your theme:

预测性返回的路由过渡目前
默认未启用，因此暂时需要在你的应用中手动启用。
通常通过在主题中设置即可：

```dart
MaterialApp(
  theme: ThemeData(
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: <TargetPlatform, PageTransitionsBuilder>{
        // Set the predictive back transitions for Android.
        TargetPlatform.android: PredictiveBackPageTransitionsBuilder(),
      },
    ),
  ),
  ...
),
```

## Run your app

## 运行你的应用

Lastly, just make sure you're using at least
Flutter version 3.22.2 to run your app,
which is the latest stable release at the time of this writing.

最后，请确保运行应用时至少使用
Flutter 3.22.2 版本，
撰写本文时这是最新的稳定版。

## For more information

## 更多信息

You can find more information at the following link:

你可以在以下链接找到更多信息：

* [Android predictive back][] breaking change

  [Android 预测性返回][Android predictive back] 破坏性变更

[Android predictive back]: /release/breaking-changes/android-predictive-back
