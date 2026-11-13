---
# title: Flutter now sets default `abiFilters` in Android builds
title: Flutter 现在会在 Android 构建中设置默认 `abiFilters`
# description: >-
#   The Flutter Gradle Plugin now automatically configures abiFilters
#   for Android builds, which might break custom abiFilters settings.
description: >-
  Flutter Gradle 插件现在会为 Android 构建自动配置 abiFilters，
  这可能会破坏自定义的 abiFilters 设置。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Starting in Flutter 3.35, the Flutter Gradle Plugin automatically sets
[`abiFilters`][] for Android builds to prevent the inclusion of unsupported
architectures in release APKs. This change can break custom
`abiFilters` specified in your app's `build.gradle` file.

从 Flutter 3.35 开始，Flutter Gradle 插件会为 Android 构建自动设置
[`abiFilters`][`abiFilters`]，
以免发布版 APK 包含不受支持的架构。
这次改动可能会破坏应用 `build.gradle` 文件中自定义的 `abiFilters`。

## Context

## 上下文

This change was introduced to solve an issue where third-party
dependencies with x86 native libraries would cause Google Play to
incorrectly identify Flutter apps as supporting x86 devices. When users
with x86 devices installed these apps, they would crash at runtime
because Flutter's native libraries aren't available for x86.

引入这次改动，是为了解决第三方依赖携带 x86 原生库时，
Google Play 会错误地把 Flutter 应用识别为支持 x86 设备的问题。
x86 设备上的用户安装这些应用后，会在运行时崩溃，
因为 Flutter 的原生库不提供 x86 版本。

The Flutter Gradle Plugin now automatically configures `abiFilters` to
include only the architectures that Flutter supports. This prevents
Google Play from making apps available to incompatible devices.

Flutter Gradle 插件现在会自动配置 `abiFilters`，
只包含 Flutter 支持的架构。
这样可以避免 Google Play 把应用提供给不兼容的设备。

## Description of change

## 改动说明

The Flutter Gradle Plugin now programmatically sets `abiFilters` for
non-debuggable builds when the `--splits-per-abi` option is not enabled
by default to:
- `armeabi-v7a`
- `arm64-v8a`
- `x86_64`

Flutter Gradle 插件现在会在未默认启用 `--splits-per-abi` 选项时，
以编程方式为不可调试构建设置 `abiFilters`，
默认为 `armeabi-v7a`、`arm64-v8a` 和 `x86_64`。

Because this automatic configuration happens before your `build.gradle` files
are processed, it might break custom `abiFilters` settings that depend on the
set being empty. Flutter can preserve `abiFilters` that you configure in
`defaultConfig`, but it can't safely preserve every `buildTypes` or
`productFlavors` ABI filter customization with the current Android Gradle
Plugin APIs.

由于此自动配置发生在处理 `build.gradle` 文件之前，
它可能会破坏那些依赖该集合为空的自定义 `abiFilters` 设置。
Flutter 可以保留你在 `defaultConfig` 中配置的 `abiFilters`，
但以当前 Android Gradle 插件 API，
无法安全地保留每一处 `buildTypes` 或 `productFlavors` 的 ABI 过滤器自定义。

## Migration guide

## 迁移指南

If your app doesn't customize `abiFilters`, no changes are required.

如果应用没有自定义 `abiFilters`，则无需更改。

If your app needs to customize which architectures are included, you have
several options:

如果应用需要自定义包含哪些架构，可以有以下几种方案：

### Option 1: Use the splits-per-abi flag

### 方案 1：使用 splits-per-abi 标志

If you want to control architecture inclusion, use Flutter's built-in
`--splits-per-abi` option instead of manually configuring `abiFilters`:

如果希望控制包含哪些架构，
请使用 Flutter 内置的 `--splits-per-abi` 选项，
而不要手动配置 `abiFilters`：

```console
flutter build apk --splits-per-abi
```

This creates separate APKs for each architecture and automatically disables
the automatic `abiFilters` configuration.

这会为每个架构生成单独的 APK，并自动停用自动 `abiFilters` 配置。

### Option 2: Configure abiFilters in defaultConfig

### 方案 2：在 defaultConfig 中配置 abiFilters

If you must use a single APK with custom architecture filters, clear the
automatically set filters and configure your own in `defaultConfig`.
For example:

如果必须使用带自定义架构过滤器的单个 APK，
请清除自动设置的过滤器，并在 `defaultConfig` 中配置你自己的过滤器。
例如：

```kotlin
android {
    defaultConfig {
        ndk {
            // Clear the automatically set filters.
            abiFilters.clear()
            // Set your custom filters.
            abiFilters.addAll(listOf("arm64-v8a"))
        }
    }
}
```

### Option 3: Disable Flutter's default ABI filtering

### 方案 3：停用 Flutter 的默认 ABI 过滤

If your app configures ABI filters in `buildTypes` or `productFlavors`,
pass `-Pdisable-abi-filtering=true` when running `flutter build` or
`flutter run`. This prevents Flutter from applying its default ABI filters,
so your build type or product flavor configuration controls which
architectures are included.

如果应用在 `buildTypes` 或 `productFlavors` 中配置了 ABI 过滤器，
请在运行 `flutter build` 或 `flutter run` 时传入
`-Pdisable-abi-filtering=true`。
这会阻止 Flutter 应用其默认 ABI 过滤器，
从而由你的构建类型或产品风味配置决定包含哪些架构。

## Timeline

## 时间线

Landed in version: 3.35.0<br>
合入版本：3.35.0<br>
In stable release: 3.35

进入稳定版：3.35

Relevant issues:

相关 issue：

* [Issue #174004]({{site.repo.flutter}}/issues/174004)
* [Issue #153476]({{site.repo.flutter}}/issues/153476)
* [Issue #175845]({{site.repo.flutter}}/issues/175845)

Relevant PRs:

相关 PR：

* [PR #168293]({{site.repo.flutter}}/pull/168293)
* [PR #177753]({{site.repo.flutter}}/pull/177753)

[`abiFilters`]: https://developer.android.com/reference/tools/gradle-api/8.7/com/android/build/api/dsl/Ndk#abiFilters()
