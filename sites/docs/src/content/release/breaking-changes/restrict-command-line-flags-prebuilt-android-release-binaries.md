---
# title: Restrict command-line flags for prebuilt Android release binaries
title: 限制预构建 Android 发布二进制文件的命令行标志
# description: >-
#   Passing configuration flags to prebuilt Android release binaries with
#   `--use-application-binary` is no longer supported.
description: >-
  不再支持用 `--use-application-binary`
  向预构建的 Android 发布二进制文件传递配置标志。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Previously, the Flutter CLI could pass engine configuration flags
(such as `--dart-flags`) to a prebuilt Android release binary
(`--use-application-binary --release`) at launch time
using Android `Intent` extras,
which the embedding accepted in all build modes.

以前，Flutter CLI 可以在启动时通过 Android `Intent` extras，
把引擎配置标志（例如 `--dart-flags`）传给预构建的
Android 发布二进制文件（`--use-application-binary --release`）。
嵌入层在所有构建模式下都会接受这些标志。

To protect production applications
against `Intent`-based spoofing vulnerabilities,
Flutter Android release builds now ignore `Intent` extras
and read engine configuration strictly
from the compiled `AndroidManifest.xml`.
Because prebuilt binaries cannot have their manifests
dynamically modified after compilation,
the Flutter CLI now produces a fatal error
if you pass engine configuration flags to a prebuilt release binary
(preventing flags from being silently ignored).

为保护生产应用免受基于 `Intent` 的欺骗漏洞影响，
Flutter 的 Android 发布构建现在会忽略 `Intent` extras，
并严格从编译后的 `AndroidManifest.xml` 读取引擎配置。
预构建的二进制文件在编译后无法再动态修改清单，
因此如果你向预构建的发布二进制文件传递引擎配置标志，
Flutter CLI 现在会产生致命错误
（避免标志被静默忽略）。

Standard release builds
(where the CLI compiles the app and injects flags into the manifest)
and all debug and profile workflows continue to work without changes.

标准发布构建
（CLI 编译应用并把标志注入清单）
以及所有 debug 和 profile 工作流仍然可以照常使用，无需更改。

## Context

## 背景

The Flutter CLI allows passing flags
(such as `--dart-flags` or tracing options)
to configure the Flutter engine when running or driving an application.
Historically, the Flutter Android embedding accepted these flags at runtime
through [`Intent`][] extras.

Flutter CLI 允许在运行或驱动应用时传递标志
（例如 `--dart-flags` 或追踪选项）来配置 Flutter 引擎。
过去，Flutter 的 Android 嵌入层会在运行时通过 [`Intent`][] extras
接受这些标志。

However, runtime `Intent` extras on Android
can be spoofed or intercepted by other applications on a user's device.
To harden production applications,
Flutter Android release builds now read configuration strictly
from a cryptographically signed `AndroidManifest.xml`
and ignore runtime `Intent` flags.

不过，Android 上的运行时 `Intent` extras
可能被用户设备上的其他应用欺骗或拦截。
为加固生产应用，Flutter 的 Android 发布构建现在严格从
经过加密签名的 `AndroidManifest.xml` 读取配置，
并忽略运行时的 `Intent` 标志。

For release builds of standard Gradle-based projects,
the Flutter CLI automatically injects command-line flags
into `AndroidManifest.xml` during compilation.
When you use a prebuilt release binary with `--use-application-binary`,
the CLI cannot modify the compiled manifest,
and the binary ignores runtime `Intent` flags.
To prevent tests or scripts from running
with unnoticed configuration failures,
the CLI now reports a fatal error.

对于基于标准 Gradle 的项目的发布构建，
Flutter CLI 会在编译期间自动把命令行标志注入 `AndroidManifest.xml`。
当你用 `--use-application-binary` 使用预构建的发布二进制文件时，
CLI 无法修改已编译的清单，二进制文件也会忽略运行时的 `Intent` 标志。
为避免测试或脚本在配置失败未被察觉的情况下运行，
CLI 现在会报告致命错误。

Debug and profile builds intentionally maintain runtime flag support
to preserve testing velocity and dynamic benchmarking workflows.

debug 和 profile 构建有意保留运行时标志支持，
以便保持测试速度和动态基准测试工作流。

[`Intent`]: https://developer.android.com/reference/android/content/Intent

## Description of change

## 变更说明

The Flutter CLI enforces the following behavior
when running Flutter apps on Android:

在 Android 上运行 Flutter 应用时，Flutter CLI 会强制执行以下行为：

| <t>Build mode</t><t>构建模式</t> | <t>Using `--use-application-binary`</t><t>是否使用 `--use-application-binary`</t> | <t>CLI behavior</t><t>CLI 行为</t> | <t>Notes</t><t>说明</t> |
| :--- | :--- | :--- | :--- |
| **Debug / Profile** | Yes | Passes flags to binary through `adb` | No rebuild required; flags apply at runtime. |
| **Debug / Profile** | 是 | 通过 `adb` 把标志传给二进制文件 | 无需重新构建；标志在运行时生效。 |
| **Debug / Profile** | No | Builds and passes flags through `adb` | Standard development workflow. |
| **Debug / Profile** | 否 | 构建并通过 `adb` 传递标志 | 标准开发工作流。 |
| **Release** | Yes | **Fatal error** if configuration flags are provided | Prebuilt release binaries cannot be dynamically configured. |
| **Release** | 是 | 若提供了配置标志，则 **致命错误** | 预构建的发布二进制文件无法动态配置。 |
| **Release** | No | Injects flags into `AndroidManifest.xml` during compilation | Standard release build workflow. |
| **Release** | 否 | 编译时把标志注入 `AndroidManifest.xml` | 标准发布构建工作流。 |

## Migration guide

## 迁移指南

:::note
You are **not affected** and do not need to take action if:

如果你属于以下情况，则 **不受影响**，无需采取行动：

- You build and run standard release apps (`flutter run --release`,
  `flutter build apk --release`, `flutter build appbundle`).

  你构建并运行标准发布应用（`flutter run --release`、
  `flutter build apk --release`、`flutter build appbundle`）。

- You run tests and benchmarks in **debug** or **profile** mode.

  你在 **debug** 或 **profile** 模式下运行测试和基准测试。

- You use `--use-application-binary`
  without passing engine configuration flags.

  你使用 `--use-application-binary`，但没有传递引擎配置标志。
:::

If your CI/CD pipelines, automated scripts, or build systems
pass flags to prebuilt release binaries,
use one of the following migration paths:

如果 CI/CD 流水线、自动化脚本或构建系统
会向预构建的发布二进制文件传递标志，
请采用以下迁移路径之一：

### Switch testing and benchmarking to profile mode

### 把测试和基准测试切换到 profile 模式

If your automated test pipelines use `--use-application-binary`
with `--release` to dynamically test different engine configurations:

如果自动化测试流水线使用 `--use-application-binary` 和 `--release`
来动态测试不同的引擎配置：

1. Switch your test target to **profile mode** (`--profile`).
   Profile mode mirrors release performance characteristics
   while retaining support for dynamic runtime flag configuration
   without recompilation.

   把测试目标切换到 **profile 模式**（`--profile`）。
   profile 模式的性能特征与发布模式接近，
   同时仍支持在不重新编译的情况下动态配置运行时标志。

### Build release binaries with flags directly

### 直接带标志构建发布二进制文件

If you must run tests against a release binary:

如果必须针对发布二进制文件运行测试：

1. Run `flutter build` or `flutter run` with your configuration flags
   without `--use-application-binary`.
   The CLI automatically embeds the flags into the compiled manifest.

   在不使用 `--use-application-binary` 的情况下，
   带上配置标志运行 `flutter build` 或 `flutter run`。
   CLI 会自动把标志嵌入编译后的清单。

1. Alternatively, compile separate release binaries
   for each required test configuration.

   也可以为每种所需的测试配置分别编译发布二进制文件。

### Configure non-Gradle or hermetic build systems

### 配置非 Gradle 或密封构建系统

If you build Flutter Android applications using hermetic build systems
(such as Bazel) that separate compilation from execution:

如果你使用把编译与执行分开的密封构建系统
（例如 Bazel）来构建 Flutter Android 应用：

1. Statically declare any necessary engine flags in `AndroidManifest.xml`
   before compiling the release APK.

   在编译发布 APK 之前，
   在 `AndroidManifest.xml` 中静态声明所有必要的引擎标志。

1. Use **profile mode** for test targets
   that require dynamic configuration at launch time.

   对需要在启动时动态配置的测试目标使用 **profile 模式**。

### Declare engine flags in `AndroidManifest.xml`

### 在 `AndroidManifest.xml` 中声明引擎标志

To configure engine flags statically in release builds,
add `<meta-data>` elements under the `<application>` tag in
your `android/app/src/main/AndroidManifest.xml` file:

要在发布构建中静态配置引擎标志，
请在 `android/app/src/main/AndroidManifest.xml` 文件的
`<application>` 标签下添加 `<meta-data>` 元素：

```xml title="AndroidManifest.xml" highlightLines=6-12
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="my_app"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <!-- Declare engine configuration flags statically -->
        <meta-data
            android:name="io.flutter.embedding.android.DartFlags"
            android:value="--some-dart-flag" />
        <meta-data
            android:name="io.flutter.embedding.android.EnableDartProfiling"
            android:value="false" />
        <activity
            ...
        </activity>
    </application>
</manifest>
```

## Timeline

## 时间线

Landed in version: TBD<br>
合入版本：TBD<br>
In stable release: TBD

进入稳定版：TBD

## References

## 参考资料

Relevant issues:

相关 issue：

* [Issue 180686][]

Relevant pull requests:

相关 PR：

* [PR 190870][]

[Issue 180686]: https://github.com/flutter/flutter/issues/180686
[PR 190870]: https://github.com/flutter/flutter/pull/190870
