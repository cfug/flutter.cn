---
# title: Add the predictive back gesture
title: 添加预测性返回手势
# shortTitle: Predictive back
shortTitle: 预测性返回
# description: >-
#   Learn how to enable and handle Android predictive back gestures in Flutter.
description: >-
  了解如何在 Flutter 中启用和处理 Android 的预测性返回手势。
ai-translated: true
---

The Android predictive back gesture lets users preview
where a back gesture will navigate to,
whether that's the previous screen or the home screen,
before they commit to or cancel it.

Android 的预测性返回手势让用户在确认或取消之前，
先预览返回会去往何处，
可能是上一个屏幕，也可能是主屏幕。

## Overview

## 概述

Starting with Android 14 (API level 34),
predictive back animations are enabled by default for system gestures
when supported by the application.
Flutter provides built-in support for predictive back animations across
default page route transitions and custom pop handling.

从 Android 14（API 级别 34）开始，
只要应用支持，系统手势就会默认启用预测性返回动画。
Flutter 对默认页面路由转场和自定义弹出处理
都内置了预测性返回动画支持。

## Enable predictive back in Android

## 在 Android 上启用预测性返回

To support predictive back gestures in your Flutter app
on Android 13 or later:

要在 Android 13 或更高版本上
让 Flutter 应用支持预测性返回手势：

1. Open `android/app/src/main/AndroidManifest.xml`.

   打开 `android/app/src/main/AndroidManifest.xml`。

1. Add `android:enableOnBackInvokedCallback="true"` to the `<application>` tag:

   在 `<application>` 标签上添加 `android:enableOnBackInvokedCallback="true"`：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="my_app"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher"
        android:enableOnBackInvokedCallback="true">
        <!-- ... -->
    </application>
</manifest>
```

## Handle back gestures with PopScope

## 使用 PopScope 处理返回手势

To customize back navigation or prevent users
from accidentally leaving a screen,
use the [`PopScope`][] widget.
`PopScope` replaces the deprecated `WillPopScope` widget
and supports predictive back gestures.

要自定义返回导航，或避免用户意外离开某个屏幕，
请使用 [`PopScope`][] widget。
`PopScope` 取代了已弃用的 `WillPopScope` widget，
并支持预测性返回手势。

### Callback parameters

### 回调参数

`PopScope` uses the `onPopInvokedWithResult` callback:

`PopScope` 使用 `onPopInvokedWithResult` 回调：

* `didPop`: A boolean indicating whether the pop operation succeeded.
  If `canPop` is `false`, `didPop` is `false`.

  `didPop`：布尔值，表示弹出操作是否成功。
  如果 `canPop` 为 `false`，则 `didPop` 为 `false`。

* `result`: An optional return payload passed when popping the route
  (for example, with `Navigator.pop(context, result)`).

  `result`：弹出路由时可选的返回数据
  （例如通过 `Navigator.pop(context, result)` 传递）。

### Example: Intercepting back navigation

### 示例：拦截返回导航

```dart
PopScope(
  canPop: false,
  onPopInvokedWithResult: (bool didPop, Object? result) async {
    if (didPop) {
      return;
    }
    final shouldLeave = await _showExitConfirmationDialog(context);
    if (shouldLeave && context.mounted) {
      Navigator.of(context).pop(result);
    }
  },
  child: Scaffold(
    appBar: AppBar(title: const Text('Form Screen')),
    body: const Center(child: Text('Complete the form before leaving.')),
  ),
)
```

## More information

## 更多信息

For more details on API migrations,
see the [Android predictive back migration guide][].

要了解 API 迁移的更多细节，
请参阅 [Android 预测性返回迁移指南][Android predictive back migration guide]。

[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[Android predictive back migration guide]: /release/breaking-changes/android-predictive-back

