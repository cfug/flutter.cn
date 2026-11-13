---
# title: Android 14 nonlinear font scaling enabled
title: 已启用 Android 14 非线性字体缩放
# description: >-
#   Android 14's new nonlinear font scaling feature is
#   enabled in Flutter after v3.14.
description: >-
  Flutter 在 v3.14 之后启用了
  Android 14 的非线性字体缩放功能。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Android 14 introduced nonlinear font scaling up to 200%.
It may change how your app looks when the user changes
the accessibility text scaling in system preferences.

Android 14 引入了最高 200% 的非线性字体缩放。
当用户在系统偏好设置中更改无障碍文字缩放时，
应用外观可能会改变。

## Background

## 背景

The [Android 14 nonlinear font scaling][] feature prevents
excessive accessibility font scaling by scaling larger text at a lesser rate
when the user increases the text scaling value in system preferences.

[Android 14 非线性字体缩放][Android 14 nonlinear font scaling]
会在用户于系统偏好设置中增大文字缩放值时，
以较小的比例缩放较大的文字，从而避免无障碍字体缩放过大。

## Migration guide

## 迁移指南

As the
[Android 14 feature overview][Android 14 nonlinear font scaling] suggests,
test your UI with the maximum font size enabled (`200%`).
This should verify that your app can apply the font sizes correctly
and can accommodate larger font sizes without impacting usability.

正如 [Android 14 功能概览][Android 14 nonlinear font scaling] 所述，
请在启用最大字号（`200%`）的情况下测试界面。
这样可以确认应用能正确应用字号，
并在不影响可用性的前提下容纳更大的字体。

To adopt nonlinear font scaling in your app and custom widgets,
consider migrating from `textScaleFactor` to `TextScaler`.
To learn how to migrate to `TextScaler`,
check out the
[Deprecate `textScaleFactor` in favor of `TextScaler`][] migration guide.

要在应用和自定义 widget 中采用非线性字体缩放，
请考虑从 `textScaleFactor` 迁移到 `TextScaler`。
要了解如何迁移到 `TextScaler`，
请查阅
[弃用 `textScaleFactor`，改用 `TextScaler`][Deprecate `textScaleFactor` in favor of
`TextScaler`]
迁移指南。

**Temporarily Opting Out**

**临时退出**

To opt-out of nonlinear text scaling on Android 14 until you migrate your app,
add a modified `MediaQuery` at the top of your app's widget tree:

在你完成应用迁移之前，若要在 Android 14 上退出非线性文字缩放，
请在应用 widget 树的顶层添加修改后的 `MediaQuery`：

```dart
runApp(
  Builder(builder: (context) {
    final mediaQueryData = MediaQuery.of(context);
    final mediaQueryDataWithLinearTextScaling = mediaQueryData
      .copyWith(textScaler: TextScaler.linear(mediaQueryData.textScaler.textScaleFactor));
    return MediaQuery(data: mediaQueryDataWithLinearTextScaling, child: realWidgetTree);
  }),
);
```

This uses the deprecated `textScaleFactor` API.
It will stop working once that API is removed from the Flutter API.

这里使用了已弃用的 `textScaleFactor` API。
一旦该 API 从 Flutter API 中移除，这段代码就会失效。

## Timeline

## 时间线

Landed in version: 3.14.0-11.0.pre<br>
合入版本：3.14.0-11.0.pre<br>
In stable release: 3.16

进入稳定版：3.16

## References

## 参考资料

API documentation:

API 文档：

* [`TextScaler`][]

Relevant issues:

相关 issue：

* [New font scaling system (Issue 116231)][]

  [新的字体缩放系统（Issue 116231）][New font scaling system (Issue 116231)]

Relevant PRs:

相关 PR：

* [Implementing TextScaler for nonlinear text scaling][]

  [为非线性文字缩放实现 TextScaler][Implementing TextScaler for nonlinear text scaling]

See also:

另请参阅：

* [Deprecate `textScaleFactor` in favor of `TextScaler`][]

  [弃用 `textScaleFactor`，改用 `TextScaler`][Deprecate `textScaleFactor` in favor
  of `TextScaler`]

[Android 14 nonlinear font scaling]: {{site.android-dev}}/about/versions/14/features#non-linear-font-scaling
[Deprecate `textScaleFactor` in favor of `TextScaler`]: /release/breaking-changes/deprecate-textscalefactor
[`TextScaler`]: {{site.api}}/flutter/painting/TextScaler-class.html
[New font scaling system (Issue 116231)]: {{site.repo.flutter}}/issues/116231
[Implementing TextScaler for nonlinear text scaling]: {{site.repo.engine}}/pull/44907
