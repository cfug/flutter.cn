---
# title: Required Kotlin version
title: 所需的 Kotlin 版本
# description: >
#     Flutter apps built for the Android platform
#     now require Kotlin 1.5.31 or greater.
description: >
  面向 Android 平台构建的 Flutter 应用
  现在需要 Kotlin 1.5.31 或更高版本。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

:::important
As of Flutter 3.16, the default Gradle build scripts differ across
Flutter versions. For example, the Kotlin version is now
configured in the `android/settings.gradle` file.
If you have generated your project with
an older version of Flutter, it's advisable to upgrade
your build scripts to the newest form. For more information,
see [Issue 10380][] and [Issue 135392].

自 Flutter 3.16 起，不同 Flutter 版本的默认 Gradle 构建脚本有所不同。
例如，Kotlin 版本现在配置在 `android/settings.gradle` 文件中。
如果你用较旧版本的 Flutter 生成了项目，
建议把构建脚本升级到最新形式。
更多信息请参阅 [Issue 10380][] 和 [Issue 135392]。
:::

[Issue 10380]:  {{site.repo.this}}/issues/10380
[Issue 135392]: {{site.repo.flutter}}/issues/135392

## Summary

## 概要

To build a Flutter app for Android, Kotlin 1.5.31 or greater is required.

要为 Android 构建 Flutter 应用，需要 Kotlin 1.5.31 或更高版本。

If your app uses a lower version,
you will receive the following error message:

如果应用使用了更低的版本，
你会看到以下错误信息：

```plaintext noHighlight
┌─ Flutter Fix ────────────────────────────────────────────────────────────┐
│                                                                          │
│ [!] Your project requires a newer version of the Kotlin Gradle plugin.   │
│ Find the latest version on                                               │
│ https://kotlinlang.org/docs/gradle.html#plugin-and-versions, then update │
│ <path-to-app>/android/build.gradle:                                      │
│ ext.kotlin_version = '<latest-version>'                                  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## Context

## 上下文

Flutter added support for [foldable devices][1] on Android.
This required adding an AndroidX dependency to the Flutter embedding that
requires apps to use Kotlin 1.5.31 or greater.

Flutter 增加了对 Android [可折叠设备][1] 的支持。
为此需要给 Flutter embedding 添加一项 AndroidX 依赖，
该依赖要求应用使用 Kotlin 1.5.31 或更高版本。

## Description of change

## 变更说明

A Flutter app compiled for Android now includes the Gradle dependency
`androidx.window:window-java`.

为 Android 编译的 Flutter 应用现在会包含 Gradle 依赖
`androidx.window:window-java`。

## Migration guide

## 迁移指南

Open `<app-src>/android/build.gradle`, and change `ext.kotlin_version`:

打开 `<app-src>/android/build.gradle`，修改 `ext.kotlin_version`：

```groovy diff
  buildscript {
-     ext.kotlin_version = '1.3.50'
+     ext.kotlin_version = '1.5.31'
```

## Timeline

## 时间线

Landed in version: v2.9.0 beta<br>
In stable release: 2.10

合入版本：v2.9.0 beta<br>
进入稳定版：2.10

## References

## 参考资料

Relevant PR:

相关 PR：

* [PR 29585: Display Features support][]

  [PR 29585：Display Features 支持][PR 29585: Display Features support]


[PR 29585: Display Features support]: {{site.repo.engine}}/pull/29585

[1]: {{site.android-dev}}/guide/topics/large-screens/learn-about-foldables
