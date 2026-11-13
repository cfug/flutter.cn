---
# title: Set default of `SystemUiMode` to edge-to-edge
title: 将 `SystemUiMode` 的默认值设为边到边
# description: >-
#     By default, apps targeting Android SDK 15+ will opt
#     in to edge-to-edge mode.
description: >-
    默认情况下，目标为 Android SDK 15 及以上的应用
    会选择启用边到边模式。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Edge-to-edge mode is Android's default display behavior as of
Android version 15 and above. In Android 15, you could
opt out of this behavior but, as of Android 16, you can't.
To learn more about this change,
check out the [Android 16 release notes][].

从 Android 15 及更高版本起，边到边模式是 Android 的默认显示行为。
在 Android 15 上你可以退出该行为，但从 Android 16 起则不能。
要进一步了解此改动，
请查阅 [Android 16 发行说明][Android 16 release notes]。

[Android 16 release notes]: {{site.android-dev}}/about/versions/16/behavior-changes-16#edge-to-edge

## Android 16 (or later)

## Android 16（及更高版本）

Using the mechanism to opt out of edge-to-edge on Android 16
or later might cause your app to crash, but you can avoid this
by using version-specific resources; for details,
visit the [migration guide](#migration-guide).

在 Android 16 或更高版本上使用退出边到边的机制，
可能会导致应用崩溃。你可以通过按版本区分的资源来避免，
详情请参阅 [迁移指南](#migration-guide)。

To learn how to structure your app to avoid this,
we recommend that you visit the LeanCode article, [Mastering Edge-To-Edge in Flutter:
A Deep Dive Into the System Navigation Bar in Android][article].
You can also find more discussion in [Issue 168635][] on GitHub.

要了解如何组织应用以避免这个问题，
建议阅读 LeanCode 的文章
[在 Flutter 中掌握边到边：深入了解 Android 系统导航栏][article]。
你也可以在 GitHub 的 [Issue 168635][] 中查看更多讨论。

[article]: https://leancode.co/blog/mastering-edge-to-edge-in-flutter
[Issue 168635]: {{site.repo.flutter}}/issues/168635#issuecomment-3485274018

## Android 15 (and below)

## Android 15（及更低版本）

If your Flutter app targets Android SDK version 15,
your app automatically displays in edge-to-edge mode,
as documented on the [`SystemUiMode`][] API page.
To maintain non edge-to-edge app behavior
(including an unset `SystemUiMode`),
follow the steps in the [migration guide](#migration-guide).

如果你的 Flutter 应用目标版本为 Android SDK 15，
应用会自动以边到边模式显示，
详见 [`SystemUiMode`][] API 页面。
要保持非边到边的应用行为
（包括未设置 `SystemUiMode` 的情况），
请按 [迁移指南](#migration-guide) 中的步骤操作。

[`SystemUiMode`]: {{site.api}}/flutter/services/SystemUiMode.html

## Context

## 上下文

By default, Android enforces [edge-to-edge mode][] for all apps that
target Android 15 or later.
To learn more about this change, check out the [Android 15 release notes][].
This impacts devices running on Android SDK 15+ or API 35+.

默认情况下，Android 会为所有目标版本为
Android 15 或更高的应用强制启用 [边到边模式][edge-to-edge mode]。
要进一步了解此改动，请查阅 [Android 15 发行说明][Android 15 release notes]。
这会影响运行 Android SDK 15+ 或 API 35+ 的设备。

Prior to Flutter 3.27, Flutter apps targeted Android 14 by default and
didn't opt into edge-to-edge mode automatically, but
your app _will_ be impacted when you choose to target Android 15.
If your app targets `flutter.targetSdkVersion` (as it does by default),
then it targets Android 15 starting with Flutter version 3.27,
automatically opting your app in to edge-to-edge.

在 Flutter 3.27 之前，Flutter 应用默认目标为 Android 14，
不会自动启用边到边模式，
但当你选择以 Android 15 为目标时，应用 **会** 受到影响。
如果你的应用以 `flutter.targetSdkVersion` 为目标（默认如此），
那么从 Flutter 3.27 起它的目标就是 Android 15，
并会自动启用边到边。

If your app explicitly sets `SystemUiMode.edgeToEdge` to run in
edge-to-edge mode by calling [`SystemChrome.setEnabledSystemUIMode`][],
then your app is already migrated. Apps needing more time to migrate to
edge-to-edge mode must use the following steps to opt out on
devices running Android SDK 15.

如果你的应用已经通过调用 [`SystemChrome.setEnabledSystemUIMode`][]
显式设置 `SystemUiMode.edgeToEdge` 来以边到边模式运行，
那么应用已经完成迁移。还需要更多时间迁移到边到边模式的应用，
必须按下列步骤在运行 Android SDK 15 的设备上退出该模式。

Be aware of the following:

请注意以下几点：

 1. Android plans for the workaround detailed here to be temporary.

    Android 计划让此处的变通方案只是临时措施。

 2. Flutter plans to align with Android (and iOS) to
    support edge-to-edge by default within the year, so
    **migrate to edge-to-edge mode before the operating system
    removes the ability to opt out**.

    Flutter 计划在今年内与 Android（以及 iOS）对齐，
    默认支持边到边，因此请在操作系统移除退出能力之前
    **迁移到边到边模式**。

[edge-to-edge mode]: {{site.android-dev}}/develop/ui/views/layout/edge-to-edge
[Android 15 release notes]: {{site.android-dev}}/about/versions/15/behavior-changes-15#edge-to-edge
[`SystemChrome.setEnabledSystemUIMode`]: {{site.api}}/flutter/services/SystemChrome/setEnabledSystemUIMode.html

## Migration guide

## 迁移指南

To opt out of edge-to-edge on Android SDK 15,
specify the new style attribute in each activity that requires it.
If you have a parent style that child styles need to opt out of,
you can modify the parent only. In the following example,
update the style configuration generated from `flutter create`.

要在 Android SDK 15 上退出边到边，
请在每个需要退出的 activity 中指定新的样式属性。
如果子样式需要退出某个父样式，可以只修改父样式。
下面的示例会更新由 `flutter create` 生成的样式配置。

By default, the styles used in a Flutter app are set in
the Android manifest file (`your_app/android/app/src/main/AndroidManifest.xml`).
Generally, styles are denoted by `@style` and help theme your app.
Modify these default styles in your manifest file:

默认情况下，Flutter 应用使用的样式设置在
Android 清单文件（`your_app/android/app/src/main/AndroidManifest.xml`）中。
样式通常用 `@style` 表示，用来为主题化你的应用。
请在清单文件中修改这些默认样式：

```xml title="AndroidManifest.xml" highlightLines=5-8
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application ...>
        <activity ...>
            <!-- Style to modify: -->
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
            />
        </activity>
    </application>
</manifest>
```

Locate the style definition in:
`your_app/android/app/src/main/res/values/styles.xml`.

样式定义位于：
`your_app/android/app/src/main/res/values/styles.xml`。

Add the following attribute to the appropriate styles:

把下面的属性添加到相应的样式中：

```xml title="styles.xml" highlightLines=6,12
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="LaunchTheme" parent="@android:style/Theme.Light.NoTitleBar">
        ...
        <!-- Add the following line: -->
        <item name="android:windowOptOutEdgeToEdgeEnforcement">true</item>
    </style>
    ...
    <style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
        ...
	      <!-- Add the following line: -->
        <item name="android:windowOptOutEdgeToEdgeEnforcement">true</item>
    </style>
</resources>
```

Make sure to apply the same change in the night mode styles file as well:
`your_app/android/app/src/main/res/values-night/styles.xml`.

夜间模式的样式文件也要做同样的修改：
`your_app/android/app/src/main/res/values-night/styles.xml`。

Ensure both styles are updated consistently in both files.

请确保两个文件中的两种样式都得到一致更新。

This modified style opts your app out of edge-to-edge for
apps targeting Android SDK 15.

修改后的样式会让目标版本为 Android SDK 15 的应用退出边到边。

:::note
If your app runs on Android 16 or above, to avoid crashes you can
create a `your_app/android/app/src/main/res/values-35` resource
directory that contains styles without the
`android:windowOptOutEdgeToEdgeEnforcement` attribute.

如果应用运行在 Android 16 或更高版本上，为避免崩溃，
你可以创建资源目录
`your_app/android/app/src/main/res/values-35`，
并在其中放置不含
`android:windowOptOutEdgeToEdgeEnforcement` 属性的样式。
:::

## Timeline

## 时间线

Starting in Flutter 3.27, Flutter apps target Android 15 by default, so
if you wish to use this version and not manually set
a lower target SDK version for your Flutter app,
follow the preceding [migration steps](#migration-guide) to
maintain an unset or non-edge-to-edge `SystemUiMode`.

从 Flutter 3.27 起，Flutter 应用默认目标为 Android 15。
如果你希望使用这个版本，并且不手动为 Flutter 应用
设置更低的目标 SDK 版本，
请按前面的 [迁移步骤](#migration-guide) 操作，
以保持未设置或非边到边的 `SystemUiMode`。

Landed in version: 3.26.0-0.0.pre<br>
合入版本：3.26.0-0.0.pre<br>
Stable release: 3.27

进入稳定版：3.27

## References

## 参考资料

* [The supported Flutter `SystemUiMode`s][]

  [Flutter 支持的 `SystemUiMode`][The supported Flutter `SystemUiMode`s]

* [The Android 15 edge-to-edge behavior changes guide][]

  [Android 15 边到边行为变更指南][The Android 15 edge-to-edge behavior changes guide]

* [The Android 16 edge-to-edge behavior changes guide][]

  [Android 16 边到边行为变更指南][The Android 16 edge-to-edge behavior changes guide]

[The supported Flutter `SystemUiMode`s]: {{site.api}}/flutter/services/SystemUiMode.html
[The Android 15 edge-to-edge behavior changes guide]: {{site.android-dev}}/about/versions/15/behavior-changes-15#edge-to-edge
[The Android 16 edge-to-edge behavior changes guide]: {{site.android-dev}}/about/versions/16/behavior-changes-16#edge-to-edge
[flutter#169810]: https://github.com/flutter/flutter/issues/169810
