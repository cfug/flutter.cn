---
# title: Migrating Flutter Android projects to built-in Kotlin
title: 将 Flutter Android 项目迁移到内置 Kotlin
# description: >-
#   Update your Flutter Android Gradle files to use built-in Kotlin support.
#   Essential for migrating projects to Android Gradle Plugin 9 or later.
description: >-
  更新 Flutter Android 的 Gradle 文件以使用内置 Kotlin。
  迁移到 Android Gradle Plugin 9 或更高版本时必须完成。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

:::warning
This guide only applies to apps and plugins that already use the
Kotlin Gradle Plugin (KGP).
If your project doesn't currently apply KGP,
don't migrate to built-in Kotlin.

本指南只适用于已经使用 Kotlin Gradle Plugin (KGP) 的应用和插件。
如果项目目前没有应用 KGP，不要迁移到内置 Kotlin。
:::

## Summary

## 概要

To build a Flutter app for Android,
the Android Gradle Plugin (AGP) must be used.
To use AGP 9 and later, the following migrations are required.

要为 Android 构建 Flutter 应用，必须使用 Android Gradle Plugin (AGP)。
要使用 AGP 9 及更高版本，需要完成下面的迁移。

First, built-in Kotlin is the default in AGP 9 and later.
Apps that use the `kotlin-android` plugin,
also known as the Kotlin Gradle Plugin (KGP),
fail to build without migration ([Issue #181383][]).
Flutter 3.44 added temporary support for the legacy
KGP in AGP 9 and later with `android.builtInKotlin=false`
([Issue #183909][]).
This allows app and plugin developers to build their projects
while migrating off KGP.
Flutter 3.47 added support for enabling built-in Kotlin
(`android.builtInKotlin=true`)
once an app and all its plugins have migrated.

首先，内置 Kotlin 是 AGP 9 及更高版本的默认行为。
使用 `kotlin-android` 插件（也就是 Kotlin Gradle Plugin，简称 KGP）的应用，
如果不迁移就无法构建（[问题 #181383][Issue #181383]）。
Flutter 3.44 通过 `android.builtInKotlin=false`，
为 AGP 9 及更高版本临时保留了旧版 KGP 支持
（[问题 #183909][Issue #183909]）。
这样，应用和插件开发者可以在迁离 KGP 的同时继续构建项目。
Flutter 3.47 增加了对启用内置 Kotlin（`android.builtInKotlin=true`）的支持，
前提是应用及其全部插件都已完成迁移。

Second, AGP 9 and later only use the new AGP DSL interfaces.
This means any old DSL types will not be recognized.
The Flutter team is working on migrating old DSL types
to use the new DSL: [Issue #180137][].
In the meantime, the Flutter team has configured the AGP DSL
to be compatible with the legacy DSL types ([Issue #184838][]).
This ensures app and plugin developers can
safely upgrade to AGP 9 and later.

其次，AGP 9 及更高版本只使用新的 AGP DSL 接口。
这意味着任何旧的 DSL 类型都不会被识别。
Flutter 团队正在把旧 DSL 类型迁移到新 DSL：
[问题 #180137][Issue #180137]。
在此期间，Flutter 团队已将 AGP DSL 配置为兼容旧 DSL 类型
（[问题 #184838][Issue #184838]）。
因此，应用和插件开发者可以安全升级到 AGP 9 及更高版本。

To ensure compatibility,
manually migrate all apps and plugins
from the legacy KGP to built-in Kotlin.
Flutter plans to remove support for applying KGP
in a future version ([Issue #184837][]).

为了保证兼容，请手动把所有应用和插件从旧版 KGP 迁移到内置 Kotlin。
Flutter 计划在未来版本中移除应用 KGP 的支持
（[问题 #184837][Issue #184837]）。

To learn more about Android Gradle Plugin,
see the [Android Gradle Plugin docs][AGP block].

要进一步了解 Android Gradle Plugin，
请查阅 [Android Gradle Plugin 文档][AGP block]。

[AGP block]: {{site.android-dev}}/build/releases/gradle-plugin

## Migrate

## 迁移

**For app developers:**
Follow the [app developer migration guide][app-migration-guide].

**应用开发者：**
请按照 [应用开发者迁移指南][app-migration-guide] 操作。

**For plugin authors:**
Follow the [plugin author migration guide][plugin-migration-guide].

**插件作者：**
请按照 [插件作者迁移指南][plugin-migration-guide] 操作。

[app-migration-guide]: /release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers
[plugin-migration-guide]: /release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors

## Next steps

## 后续步骤

- **Remove support for KGP:**
  In a future version of Flutter,
  support for applying KGP will be removed ([Issue #184837][]).
  Migrate apps, plugins, and host apps to keep them building.

  **移除对 KGP 的支持：**
  在 Flutter 的未来版本中，应用 KGP 的支持将被移除
  （[问题 #184837][Issue #184837]）。
  请迁移应用、插件和宿主应用，让它们能够继续构建。

- **Remove the DSL Gradle property:**
  Once the Flutter team completes the migration to the new AGP DSL,
  it will remove support for the old DSL ([Issue #184839][]).

  **移除 DSL Gradle 属性：**
  Flutter 团队完成向新 AGP DSL 的迁移后，
  将移除对旧 DSL 的支持（[问题 #184839][Issue #184839]）。

## Timeline

## 时间线

Landed in version: 3.44.0-0.1.pre<br>
合入版本：3.44.0-0.1.pre<br>
In stable release: 3.44

进入稳定版：3.44

## References

## 参考资料

Relevant issues:

相关 issue：

- [Issue #180137][]: Migrate from old to new AGP DSL

  [问题 #180137][Issue #180137]：从旧 AGP DSL 迁移到新 AGP DSL

- [Issue #181383][]: Flutter plugins should support AGP 9.0.0

  [问题 #181383][Issue #181383]：Flutter 插件应支持 AGP 9.0.0

- [Issue #183909][]: Add support for KGP in AGP+

  [问题 #183909][Issue #183909]：在 AGP+ 中增加对 KGP 的支持

- [Issue #184837][]: Remove support for KGP

  [问题 #184837][Issue #184837]：移除对 KGP 的支持

- [Issue #184838][]: Disable new AGP DSL flag by default

  [问题 #184838][Issue #184838]：默认禁用新的 AGP DSL 标志

- [Issue #184839][]: Remove support for old AGP DSL types

  [问题 #184839][Issue #184839]：移除对旧 AGP DSL 类型的支持

The Gradle build files in your app vary based on the Flutter version
used when your app was created.
Consider staying up to date with the latest version
of the build files by periodically running `flutter upgrade`
in your app's directory.

应用中的 Gradle 构建文件会因创建应用时使用的 Flutter 版本而不同。
建议在应用目录中定期运行 `flutter upgrade`，
让构建文件保持为最新版本。

[Issue #180137]: {{site.repo.flutter}}/issues/180137
[Issue #181383]: {{site.repo.flutter}}/issues/181383
[Issue #183909]: {{site.repo.flutter}}/issues/183909
[Issue #184837]: {{site.repo.flutter}}/issues/184837
[Issue #184838]: {{site.repo.flutter}}/issues/184838
[Issue #184839]: {{site.repo.flutter}}/issues/184839
