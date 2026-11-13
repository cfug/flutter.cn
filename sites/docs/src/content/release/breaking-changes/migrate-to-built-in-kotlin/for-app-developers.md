---
# title: Built-in Kotlin migration for app developers
title: 应用开发者的内置 Kotlin 迁移
# description: >-
#   Migrate Flutter apps to use built-in Kotlin.
description: >-
  将 Flutter 应用迁移为使用内置 Kotlin。
ai-translated: true
---

This guide outlines the migration steps specifically for app developers.

本指南专门说明应用开发者的迁移步骤。

These instructions assume you are updating from
an AGP version created before 9.0.0 to an AGP version 9.0.0+.
You should also use the minimum compatible dependency versions
listed in the [Android Gradle Plugin docs][AGP block].

这些步骤假定你正在从 9.0.0 之前创建的 AGP 版本
更新到 AGP 9.0.0 或更高版本。
你还应使用 [Android Gradle Plugin 文档][AGP block] 中列出的
最低兼容依赖版本。

:::warning
This guide only applies to apps that already use the
Kotlin Gradle Plugin (KGP).

To verify whether your app applies KGP,
find the `kotlin-android` plugin
(or the `org.jetbrains.kotlin.android` plugin).
It is likely located in the
`<app-src>/android/app/build.gradle` or
`<app-src>/android/app/build.gradle.kts` file.
To view the KGP application code,
see [Update the Gradle file](#update-the-gradle-file).

If your app doesn't currently apply KGP,
don't migrate to built-in Kotlin.

本指南仅适用于已经使用
Kotlin Gradle Plugin (KGP) 的应用。

要确认你的应用是否应用了 KGP，
请查找 `kotlin-android` 插件
（或 `org.jetbrains.kotlin.android` 插件）。
它通常位于
`<app-src>/android/app/build.gradle` 或
`<app-src>/android/app/build.gradle.kts` 文件中。
要查看应用 KGP 的代码，
请参阅 [更新 Gradle 文件](#update-the-gradle-file)。

如果你的应用目前没有应用 KGP，
请不要迁移到内置 Kotlin。
:::

:::note
To update Flutter plugins to use built-in Kotlin,
follow the [migration guide for plugin authors][].

要将 Flutter 插件更新为使用内置 Kotlin，
请遵循 [插件作者迁移指南][migration guide for plugin authors]。
:::

[AGP block]: {{site.android-dev}}/build/releases/gradle-plugin
[migration guide for plugin authors]: /release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors

<a id="verify-flags-in-properties-file" aria-hidden="true"></a>

## Verify flags in the Gradle properties file

## 核对 Gradle 属性文件中的标志

Flutter sets the default behavior to use the legacy Kotlin Gradle Plugin (KGP)
and the old AGP DSL types to support projects that haven't yet migrated.
The Flutter migrator tool automatically adds `android.builtInKotlin=false`
and `android.newDsl=false` to your `gradle.properties` file.

Flutter 把默认行为设为使用旧版 Kotlin Gradle Plugin (KGP)
和旧的 AGP DSL 类型，以支持尚未迁移的项目。
Flutter 迁移工具会自动把 `android.builtInKotlin=false`
和 `android.newDsl=false` 写入你的 `gradle.properties` 文件。

If these flags are missing from your `gradle.properties` file,
the Flutter tool automatically adds them when you
next build or run your app using `flutter run` or `flutter build apk`.

如果 `gradle.properties` 文件中没有这些标志，
下次你用 `flutter run` 或 `flutter build apk`
构建或运行应用时，Flutter 工具会自动添加它们。

Alternatively, building the project using Android Studio tooling also
adds these flags automatically.
Once the process completes, verify that the flags have been added.
For more details, see Flutter [issue #183910][issue-183910].

或者，用 Android Studio 的工具构建项目时也会自动添加这些标志。
流程结束后，请确认这些标志已经写入。
详情请参阅 Flutter 的 [issue #183910][issue-183910]。

All add-to-app projects must manually add
`android.builtInKotlin=false` and `android.newDsl=false` to
the Android host app's `gradle.properties` file.
The Flutter migrator tool can't run during add-to-app Android host app builds
because the host app is a pure native Android project.

所有 add-to-app 项目都必须手动把
`android.builtInKotlin=false` 和 `android.newDsl=false`
添加到 Android 宿主应用的 `gradle.properties` 文件中。
Flutter 迁移工具无法在 add-to-app 的 Android 宿主应用构建期间运行，
因为宿主应用是纯原生 Android 项目。

```properties diff title="<host-app-project>/gradle.properties"
# ...
+ android.newDsl=false
+ android.builtInKotlin=false
```

:::note
If your app doesn't apply
the `kotlin-android` plugin (also called the Kotlin Gradle Plugin),
then you only need to add `android.newDsl=false` and
don't need to complete any further migration steps.

如果你的应用没有应用
`kotlin-android` 插件（也称 Kotlin Gradle Plugin），
那么你只需要添加 `android.newDsl=false`，
不必再完成后续迁移步骤。
:::

## Update the Gradle file

## 更新 Gradle 文件

First, find the `kotlin-android` plugin
(or the `org.jetbrains.kotlin.android` plugin).
It is likely located in the `plugins` block of the
`<app-src>/android/app/build.gradle` or the
`<app-src>/android/app/build.gradle.kts` file.
If you use the legacy `apply` syntax, it will be located in
the Groovy-based `<app-src>/android/app/build.gradle` file,
as this syntax is not supported in Kotlin DSL.

首先找到 `kotlin-android` 插件
（或 `org.jetbrains.kotlin.android` 插件）。
它通常位于
`<app-src>/android/app/build.gradle` 或
`<app-src>/android/app/build.gradle.kts` 文件的 `plugins` 块中。
如果你使用旧的 `apply` 语法，它会位于
基于 Groovy 的 `<app-src>/android/app/build.gradle` 文件中，
因为 Kotlin DSL 不支持这种语法。

The following examples demonstrate how to
migrate a Flutter Android app and an add-to-app Android host app:

下面的示例演示如何迁移
Flutter Android 应用和 add-to-app 的 Android 宿主应用：

### Migrate your Flutter Android app

### 迁移你的 Flutter Android 应用

<Tabs key="modern-legacy-apply">
<Tab name="plugins block">

**Before**:

**之前**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    id("com.android.application")
    id("kotlin-android")
    // ...
}

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}

// ...
```

Next, remove the `kotlin-android` plugin and the `kotlinOptions` block:

接下来，移除 `kotlin-android` 插件和 `kotlinOptions` 块：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
  plugins {
      id("com.android.application")
-     id("kotlin-android")
      // ...
  }

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```

Add the `kotlin.compilerOptions{}` DSL block with the following:

按下面这样添加 `kotlin.compilerOptions{}` DSL 块：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

Here is how the file will likely end up:

文件最终大致会变成这样：

**After**:

**之后**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    id("com.android.application")
    // ...
}

android {
    // ...
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```

</Tab>
<Tab name="legacy apply">

**Before**:

**之前**：

```groovy title="<app-src>/android/app/build.gradle"
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
// ...

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}

// ...
```

Next, remove the `kotlin-android` plugin and the `kotlinOptions` block:

接下来，移除 `kotlin-android` 插件和 `kotlinOptions` 块：

```groovy diff title="<app-src>/android/app/build.gradle"
  apply plugin: 'com.android.application'
- apply plugin: 'kotlin-android'
// ...

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```

Add the `kotlin.compilerOptions{}` DSL block with the following:

按下面这样添加 `kotlin.compilerOptions{}` DSL 块：

```groovy diff title="<app-src>/android/app/build.gradle"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

Here is how the file will likely end up:

文件最终大致会变成这样：

**After**:

**之后**：

```groovy title="<app-src>/android/app/build.gradle"
apply plugin: 'com.android.application'
// ...

android {
    // ...
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```

</Tab>
</Tabs>

### Migrate your add-to-app Android host app

### 迁移 add-to-app 的 Android 宿主应用

Android native apps use the `alias` keyword to apply plugins,
which is incompatible with the legacy `apply()` syntax.
Therefore, only the `plugins {}` block instructions are included.

Android 原生应用使用 `alias` 关键字来应用插件，
这与旧的 `apply()` 语法不兼容。
因此这里只包含 `plugins {}` 块的说明。

**Before**:

**之前**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    // ...
}

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}

// ...
```

Next, remove the `kotlin-android` plugin and the `kotlinOptions` block:

接下来，移除 `kotlin-android` 插件和 `kotlinOptions` 块：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
  plugins {
      alias(libs.plugins.android.application)
-     alias(libs.plugins.kotlin.android)
      // ...
  }

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```

Add the `kotlin.compilerOptions{}` DSL block with the following:

按下面这样添加 `kotlin.compilerOptions{}` DSL 块：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

Here is how the file will likely end up:

文件最终大致会变成这样：

**After**:

**之后**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    alias(libs.plugins.android.application)
    // ...
}

android {
    // ...
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```

## Validate

## 验证

Before enabling built-in Kotlin,
confirm that you have migrated your application
and any Flutter plugins it uses.
Also, confirm that you updated your app
to AGP 9+, because built-in Kotlin requires AGP 9+.

在启用内置 Kotlin 之前，
请确认你已经迁移了应用以及它使用的所有 Flutter 插件。
同时确认应用已更新到 AGP 9 或更高版本，
因为内置 Kotlin 需要 AGP 9+。

To enable built-in Kotlin,
set the `android.builtInKotlin` property to `true`
in your `gradle.properties` file:

要启用内置 Kotlin，
请在 `gradle.properties` 文件中
把 `android.builtInKotlin` 属性设为 `true`：

```properties diff title="<flutter-project>/android/gradle.properties"
# ...
+ android.builtInKotlin=true
```

:::version-note
Flutter 3.44 added support for AGP 9 with built-in Kotlin disabled
(`android.builtInKotlin=false`),
while enabling built-in Kotlin (`android.builtInKotlin=true`)
requires Flutter 3.47 or later.

Flutter 3.44 增加了对 AGP 9 的支持，
此时内置 Kotlin 处于关闭状态
（`android.builtInKotlin=false`），
而启用内置 Kotlin（`android.builtInKotlin=true`）
需要 Flutter 3.47 或更高版本。
:::

After enabling built-in Kotlin,
execute `flutter run` or `flutter build apk`
to confirm that your app builds and launches
on a connected Android device or emulator.

启用内置 Kotlin 之后，
执行 `flutter run` 或 `flutter build apk`，
确认应用能在已连接的 Android 设备或模拟器上构建并启动。

If your app fails to build because
you are using an unmigrated Flutter plugin,
follow the instructions below:

如果应用因为使用了尚未迁移的 Flutter 插件而构建失败，
请按下面的说明处理：

## Report incompatible Kotlin Gradle Plugin usage to plugin authors

## 向插件作者报告不兼容的 Kotlin Gradle Plugin 用法

Follow these instructions only if your app uses a Flutter plugin
that hasn't yet migrated to built-in Kotlin.

仅当你的应用使用了尚未迁移到内置 Kotlin 的 Flutter 插件时，
才按这些说明操作。

1.  Find the repository of the unmigrated Flutter plugin by
    searching for the plugin name on [pub.dev]({{site.pub}}) or online.

    在 [pub.dev]({{site.pub}}) 或网上搜索插件名称，
    找到尚未迁移的 Flutter 插件仓库。

1.  Check the plugin's changelog to confirm that
    no existing version has migrated to built-in Kotlin.

    查看插件的更新日志，确认现有版本都还没有
    迁移到内置 Kotlin。

1.  Report an issue to the plugin authors,
    informing them that the Kotlin Gradle Plugin is incompatible and
    won't be supported in a future version of Flutter.

    向插件作者报告 issue，说明 Kotlin Gradle Plugin
    已不兼容，并且在未来的 Flutter 版本中将不再受支持。

You can use the following template for the issue:

你可以使用下面的 issue 模板：

**Issue Title:** Migrate plugin to built-in Kotlin

**Issue 标题：** 将插件迁移到内置 Kotlin

**Issue Body:**

**Issue 正文：**

```markdown
I am using `<plugin-name>` in my Flutter app.

Starting with Android Gradle Plugin (AGP) 9.0,
support for applying the Kotlin Gradle Plugin (KGP) has been removed.
Because this plugin applies KGP,
it causes a compilation error that prevents my app from building.
Flutter [issue #181383](https://github.com/flutter/flutter/issues/181383)
includes an example of the error.

Flutter has temporarily added support to allow KGP
while apps and plugins migrate to AGP 9.0 or later,
but this support will be removed in a future version of Flutter.

Please migrate this plugin to use built-in Kotlin to
ensure your plugin users can successfully
build their apps in future versions of Flutter.

Here is the Flutter
[migration guide for plugin authors](https://docs.flutter.dev/release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors).
```

Please be respectful and mindful of the
plugin repository's rules and code of conduct when
reporting issues and interacting with plugin authors.

报告 issue 以及与插件作者交流时，
请尊重并遵守插件仓库的规则与行为准则。

For reference, see the [Flutter Code of Conduct][Code of Conduct].

可参考 [Flutter 行为准则][Code of Conduct]。

[Code of Conduct]: {{site.repo.flutter}}/blob/main/CODE_OF_CONDUCT.md

## Next steps

## 后续步骤

For next steps,
see the [built-in Kotlin migration overview][migration-overview].

后续步骤请参阅
[内置 Kotlin 迁移概览][migration-overview]。

[migration-overview]: /release/breaking-changes/migrate-to-built-in-kotlin

## References

## 参考资料

Relevant issues:

相关 issue：

- [Issue #183910][issue-183910]: Add Disable Built-in Kotlin and new DSL Migrators

  [Issue #183910][issue-183910]：添加禁用内置 Kotlin 以及新 DSL 的迁移器

- [Issue #181383][issue-181383]: Flutter plugins should support AGP 9.0.0

  [Issue #181383][issue-181383]：Flutter 插件应支持 AGP 9.0.0

The Gradle build files in your app vary based on
the Flutter version used when your app was created.
Consider staying up to date with the latest version
of the build files by periodically running `flutter upgrade`
in your app's root directory.

应用中的 Gradle 构建文件会因创建应用时使用的 Flutter 版本而不同。
建议在应用根目录定期运行 `flutter upgrade`，
让构建文件与最新版本保持同步。

[issue-183910]: {{site.repo.flutter}}/issues/183910
[issue-181383]: {{site.repo.flutter}}/issues/181383
