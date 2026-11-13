---
# title: Built-in Kotlin migration for plugin authors
title: 面向插件作者的内置 Kotlin 迁移
# description: >-
#   Migrate Flutter plugins to use built-in Kotlin.
description: 将 Flutter 插件迁移为使用内置 Kotlin。
ai-translated: true
---

This guide outlines the migration steps specifically for plugin authors.

本指南专门说明插件作者的迁移步骤。

:::warning
This guide only applies to plugins that already use the
Kotlin Gradle Plugin (KGP).

本指南只适用于已经使用 Kotlin Gradle Plugin (KGP) 的插件。

To verify whether your plugin applies KGP,
find the `kotlin-android` plugin
(or the `org.jetbrains.kotlin.android` plugin).
It is likely located in the
`<plugin-project>/android/build.gradle` or
`<plugin-project>/android/build.gradle.kts` file.
To view the KGP application code,
see [Update the Gradle file](#update-the-gradle-file).

要确认插件是否应用了 KGP，
请查找 `kotlin-android` 插件
（或 `org.jetbrains.kotlin.android` 插件）。
它很可能位于
`<plugin-project>/android/build.gradle` 或
`<plugin-project>/android/build.gradle.kts` 文件中。
要查看应用 KGP 的代码，
请参阅 [更新 Gradle 文件](#update-the-gradle-file)。

If your plugin project doesn't currently apply KGP,
don't migrate to built-in Kotlin.

如果插件项目目前没有应用 KGP，
不要迁移到内置 Kotlin。
:::

:::note
To update Flutter apps to use built-in Kotlin,
follow the [migration guide for app developers][].

要将 Flutter 应用更新为使用内置 Kotlin，
请遵循 [面向应用开发者的迁移指南][migration guide for app developers]。
:::

[migration guide for app developers]: /release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers

## Update the Gradle file

## 更新 Gradle 文件

The following steps assume you can
update your plugin's Flutter SDK minimum to 3.44.
If you can't update the Flutter SDK minimum to 3.44,
follow the instructions to
[support Flutter versions earlier than 3.44][flutter-sdk-minimum-below-3.44].

以下步骤假定你可以把插件的最低 Flutter SDK 更新到 3.44。
如果无法把最低 Flutter SDK 更新到 3.44，
请按照说明
[支持早于 3.44 的 Flutter 版本][flutter-sdk-minimum-below-3.44]。

First, find the `kotlin-android` plugin
(or the `org.jetbrains.kotlin.android` plugin).
It is likely located in the `plugins` block of the
`<plugin-project>/android/build.gradle` or the `<plugin-project>/android/build.gradle.kts` file.
If you use the legacy `apply` syntax,
it will be located in the Groovy-based `<plugin-project>/android/build.gradle` file,
as this syntax isn't supported in Kotlin DSL.

首先，找到 `kotlin-android` 插件
（或 `org.jetbrains.kotlin.android` 插件）。
它很可能位于
`<plugin-project>/android/build.gradle` 或
`<plugin-project>/android/build.gradle.kts` 文件的 `plugins` 块中。
如果使用旧式 `apply` 语法，
它会位于基于 Groovy 的 `<plugin-project>/android/build.gradle` 文件中，
因为 Kotlin DSL 不支持这种语法。

The following examples demonstrate how to migrate a Flutter plugin:

以下示例演示如何迁移 Flutter 插件：

<Tabs key="modern-legacy-apply">
<!-- <Tab name="Plugins block"> -->
<Tab name="插件块">

**Before**:

**之前**：

```kotlin title="<app-src>/android/build.gradle(.kts)"
plugins {
    id("com.android.library")
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

```kotlin diff title="<app-src>/android/build.gradle.kts"
  plugins {
      id("com.android.library")
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

添加包含以下内容的 `kotlin.compilerOptions{}` DSL 块：

```kotlin diff title="<app-src>/android/build.gradle.kts"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

Here is how the file will likely end up:

文件最终大概会变成这样：

**After**:

**之后**：

```kotlin title="<app-src>/android/build.gradle(.kts)"
plugins {
    id("com.android.library")
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
<!-- <Tab name="Legacy apply"> -->
<Tab name="旧式 apply">

**Before**:

**之前**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'
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

```groovy diff title="<app-src>/android/build.gradle"
  apply plugin: 'com.android.library'
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

添加包含以下内容的 `kotlin.compilerOptions{}` DSL 块：

```groovy diff title="<app-src>/android/build.gradle"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

Here is how the file will likely end up:

文件最终大概会变成这样：

**After**:

**之后**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'
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

[flutter-sdk-minimum-below-3.44]: #support-flutter-versions-earlier-than-3-44

## Update the plugin's `pubspec.yaml`

## 更新插件的 `pubspec.yaml`

Using the `kotlin.compilerOptions {}` DSL block requires
a minimum Kotlin Gradle Plugin (KGP) version of 2.0.0.
Beginning with Flutter 3.44, the minimum required KGP version is 2.0.0.
To ensure that apps using your plugin can build on AGP 9,
require a minimum Flutter version of 3.44 for the plugin version.
This allows apps using your plugin to build on AGP 9 with
built-in Kotlin disabled (`android.builtInKotlin=false`).

使用 `kotlin.compilerOptions {}` DSL 块要求
Kotlin Gradle Plugin (KGP) 的最低版本为 2.0.0。
从 Flutter 3.44 开始，要求的最低 KGP 版本为 2.0.0。
为确保使用你的插件的应用能在 AGP 9 上构建，
该插件版本需要把最低 Flutter 版本设为 3.44。
这样，使用你的插件的应用就可以在关闭内置 Kotlin
（`android.builtInKotlin=false`）的情况下于 AGP 9 上构建。

:::note
Enabling built-in Kotlin (`android.builtInKotlin=true`)
in the plugin's example app requires Flutter 3.47 or later.

在插件的示例应用中启用内置 Kotlin（`android.builtInKotlin=true`）
需要 Flutter 3.47 或更高版本。
:::

Because you are updating the minimum Flutter version,
you must also update the minimum associated Dart version.

因为你正在更新最低 Flutter 版本，
所以也必须更新对应的最低 Dart 版本。

Update the minimum Flutter version and the minimum Dart version:

更新最低 Flutter 版本和最低 Dart 版本：

```yaml diff title="<plugin-project>/pubspec.yaml"
# ...

  environment:
-   sdk: ^<previous-dart-minimum>
+   sdk: ^3.12.0
-   flutter: ">=<previous-flutter-minimum>"
+   flutter: ">=3.44.0"

# ...
```

Here is how the file will likely end up:

文件最终大概会变成这样：

```yaml title="<plugin-project>/pubspec.yaml"
# ...

environment:
  sdk: ^3.12.0
  flutter: ">=3.44.0"

# ...
```

<a id="supporting-flutter-versions-earlier-than-3-44" aria-hidden="true"></a>

## Support Flutter versions earlier than 3.44

## 支持早于 3.44 的 Flutter 版本

If you updated your plugin's Flutter SDK minimum to 3.44,
skip this section and proceed to
[updating the plugin's `CHANGELOG.md`](#update-the-plugins-changelog).

如果已经把插件的最低 Flutter SDK 更新到 3.44，
请跳过本节，继续
[更新插件的 `CHANGELOG.md`](#update-the-plugins-changelog)。

If you can't update the plugin's Flutter SDK minimum to 3.44, you must
make the following changes to `<plugin-project>/android/build.gradle` or
`<plugin-project>/android/build.gradle.kts` to
support apps on AGP versions less than 9 and versions on 9 or later.

如果无法把插件的最低 Flutter SDK 更新到 3.44，
就必须对 `<plugin-project>/android/build.gradle` 或
`<plugin-project>/android/build.gradle.kts` 做以下更改，
以同时支持 AGP 9 以下的应用和 9 及更高版本。

<Tabs key="workaround-for-plugins">
<!-- <Tab name="Kotlin DSL fix"> -->
<Tab name="Kotlin DSL 修复">

**Before**:

**之前**：

```kotlin title="<app-src>/android/build.gradle.kts"
plugins {
    id("com.android.library")
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

```kotlin diff title="<app-src>/android/build.gradle.kts"
  plugins {
      id("com.android.library")
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

Add a check to apply the Kotlin Gradle Plugin only when
the app's Android Gradle Plugin version is less than version 9.

添加一项检查，仅当应用的 Android Gradle Plugin 版本低于 9 时
才应用 Kotlin Gradle Plugin。

```kotlin diff title="<app-src>/android/build.gradle.kts"
+ val agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.substringBefore('.').toInt()
+
+ if (agpMajor < 9) {
+     apply(plugin = "org.jetbrains.kotlin.android")
+ }
```

Add the `compilerOptions` configuration using the project extension:

使用项目扩展添加 `compilerOptions` 配置：

```kotlin diff title="<app-src>/android/build.gradle.kts"
+ project.extensions.configure(org.jetbrains.kotlin.gradle.dsl.KotlinAndroidProjectExtension::class.java) {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

Here is how the file will likely end up:

文件最终大概会变成这样：

**After**:

**之后**：

```kotlin title="<app-src>/android/build.gradle.kts"
plugins {
    id("com.android.library")
    // ...
}

val agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.substringBefore('.').toInt()

if (agpMajor < 9) {
    apply(plugin = "org.jetbrains.kotlin.android")
}

android {
    // ...
}

project.extensions.configure(org.jetbrains.kotlin.gradle.dsl.KotlinAndroidProjectExtension::class.java) {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```

</Tab>
<!-- <Tab name="Groovy DSL fix"> -->
<Tab name="Groovy DSL 修复">

**Before**:

**之前**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'

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

```groovy diff title="<app-src>/android/build.gradle"
  apply plugin: 'com.android.library'
- apply plugin: 'kotlin-android'

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```

Add a check to apply the Kotlin Gradle Plugin only when
the app's Android Gradle Plugin version is less than version 9.

添加一项检查，仅当应用的 Android Gradle Plugin 版本低于 9 时
才应用 Kotlin Gradle Plugin。

```groovy diff title="<app-src>/android/build.gradle"
+ def agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.tokenize('.')[0] as int
+
+ if (agpMajor < 9) {
+    apply plugin: 'kotlin-android'
+ }
```

Add the `kotlin.compilerOptions{}` DSL block with the following:

添加包含以下内容的 `kotlin.compilerOptions{}` DSL 块：

```groovy diff title="<app-src>/android/build.gradle"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

Here is how the file will likely end up:

文件最终大概会变成这样：

**After**:

**之后**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'

def agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.tokenize('.')[0] as int
if (agpMajor < 9) {
    apply plugin: 'kotlin-android'
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
</Tabs>

<a id="update-the-plugins-changelog-md" aria-hidden="true"></a>

## Update the plugin's changelog

## 更新插件的更新日志

Include your changes in the `CHANGELOG.md` file of
the newly released plugin version:

把你的变更写入新发布插件版本的 `CHANGELOG.md` 文件：

```markdown diff title="<plugin-project>/CHANGELOG.md"
+ ## <new-plugin-release-version>

+ - Updates the minimum supported SDK version to Flutter 3.44/Dart 3.12.
+ - Migrates to built-in Kotlin.

// ...
```

## Validate

## 验证

Before enabling built-in Kotlin,
confirm that you have migrated your plugin example app
and any Flutter plugins it uses.
Also, confirm that you updated your plugin example app
to AGP 9+, because built-in Kotlin requires AGP 9+.

在启用内置 Kotlin 之前，
请确认已经迁移了插件示例应用以及它使用的所有 Flutter 插件。
同时确认插件示例应用已更新到 AGP 9 或更高版本，
因为内置 Kotlin 需要 AGP 9 或更高版本。

To enable built-in Kotlin,
set the `android.builtInKotlin` property to `true`
in your `gradle.properties` file:

要启用内置 Kotlin，
请在 `gradle.properties` 文件中把 `android.builtInKotlin` 属性设为 `true`：

```properties diff title="<flutter-project>/android/gradle.properties"
# ...
+ android.builtInKotlin=true
```

:::version-note
Flutter 3.44 added support for AGP 9 with built-in Kotlin disabled
(`android.builtInKotlin=false`),
while enabling built-in Kotlin (`android.builtInKotlin=true`)
requires Flutter 3.47 or later.

Flutter 3.44 增加了对 AGP 9 的支持，此时内置 Kotlin 处于关闭状态
（`android.builtInKotlin=false`）。
启用内置 Kotlin（`android.builtInKotlin=true`）
需要 Flutter 3.47 或更高版本。
:::

After enabling built-in Kotlin,
execute `flutter run` or `flutter build apk`
to confirm that your plugin example app builds and launches
on a connected Android device or emulator.

启用内置 Kotlin 之后，
执行 `flutter run` 或 `flutter build apk`，
确认插件示例应用能够构建，
并在已连接的 Android 设备或模拟器上启动。

If your plugin example app also applies KGP,
then you will also have to migrate the example app.
To migrate your example app,
follow the [migration guide for app developers][app-migration-guide].

如果插件示例应用也应用了 KGP，
那么你还必须迁移该示例应用。
要迁移示例应用，
请遵循 [面向应用开发者的迁移指南][app-migration-guide]。

[app-migration-guide]: /release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers
