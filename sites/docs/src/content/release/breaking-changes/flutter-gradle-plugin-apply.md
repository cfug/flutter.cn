---
# title: Deprecated imperative apply of Flutter's Gradle plugins
title: 已弃用 Flutter Gradle 插件的命令式 apply
# description: >-
#   How to migrate your Flutter app's Android Gradle build files to the
#   new, declarative format.
description: >-
  如何将 Flutter 应用的 Android Gradle 构建文件迁移到新的声明式格式。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

To build a Flutter app for Android, Flutter's Gradle plugins must be applied.
Historically, this was done imperatively with Gradle's
[legacy, imperative apply script method][].

要为 Android 构建 Flutter 应用，必须应用 Flutter 的 Gradle 插件。
过去这是用 Gradle 的
[旧式命令式 apply 脚本方法][legacy, imperative apply script method]
以命令式方式完成的。

In Flutter 3.16, support was added for applying these plugins with Gradle's
[declarative plugins {} block][] (also called the Plugin DSL) and it is
now the recommended approach. Since Flutter 3.16, projects generated with
`flutter create` use the Plugin DSL to apply Gradle plugins. Projects created
with versions of Flutter prior to 3.16 need to be migrated manually.

Flutter 3.16 起，支持用 Gradle 的
[声明式 plugins {} 块][declarative plugins {} block]
（也称为 Plugin DSL）来应用这些插件，这现在是推荐做法。
自 Flutter 3.16 起，`flutter create` 生成的项目使用 Plugin DSL 来应用 Gradle 插件。
用 3.16 之前的 Flutter 版本创建的项目需要手动迁移。

Applying Gradle plugins using the `plugins {}` block executes the same code as
before and should produce equivalent app binaries.

使用 `plugins {}` 块应用 Gradle 插件会执行与之前相同的代码，
应当生成等价的应用二进制文件。

To learn about advantages the new Plugin DSL syntax has over the legacy `apply`
script syntax, see [Gradle docs][plugins block].

要了解新 Plugin DSL 语法相对旧式 `apply` 脚本语法的优势，
请参阅 [Gradle 文档][plugins block]。

Migrating the app ecosystem to use the new approach will also make it easier for
Flutter team to develop Flutter's Gradle plugins, and to enable exciting new
features in the future, such as using Kotlin instead of Groovy in Gradle
buildscripts.

让应用生态迁移到新做法，也会让 Flutter 团队更容易开发 Flutter 的 Gradle 插件，
并在未来启用令人期待的新功能，
例如在 Gradle 构建脚本中用 Kotlin 代替 Groovy。

## Migrate

## 迁移

### android/settings.gradle

### android/settings.gradle 文件

First, find the values of the Android Gradle Plugin (AGP)
and Kotlin that the project currently uses.
Unless they have been moved,
they are likely defined in the buildscript block of the
`<app-src>/android/build.gradle` file.
As an example, consider the `build.gradle` file from
a new Flutter app created before this change:

首先找出项目当前使用的 Android Gradle Plugin (AGP) 和 Kotlin 版本。
除非已经挪走，它们多半定义在
`<app-src>/android/build.gradle` 文件的 buildscript 块中。
下面是此次改动之前新建 Flutter 应用的 `build.gradle` 示例：

```groovy
buildscript {
    ext.kotlin_version = '1.7.10'
    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:7.3.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.buildDir = '../build'
subprojects {
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
subprojects {
    project.evaluationDependsOn(':app')
}

tasks.register("clean", Delete) {
    delete rootProject.buildDir
}
```

The AGP version is the number that comes at the end of the line
`classpath 'com.android.tools.build:gradle:7.3.0'`, so `7.3.0`
in this case. Similarly, the Kotlin version comes at the end of the line
`ext.kotlin_version = '1.7.10'`, in this case `1.7.10`.

AGP 版本是这一行末尾的数字：
`classpath 'com.android.tools.build:gradle:7.3.0'`，此例中为 `7.3.0`。
同样，Kotlin 版本是这一行末尾的值：
`ext.kotlin_version = '1.7.10'`，此例中为 `1.7.10`。

Next, replace the contents of
`<app-src>/android/settings.gradle` with the following,
remembering to replace `{agpVersion}` and `{kotlinVersion}` with previously
identified values:

接下来，用下面的内容替换
`<app-src>/android/settings.gradle`，
记得把 `{agpVersion}` 和 `{kotlinVersion}` 换成前面找出的值：

```groovy
pluginManagement {
    def flutterSdkPath = {
        def properties = new Properties()
        file("local.properties").withInputStream { properties.load(it) }
        def flutterSdkPath = properties.getProperty("flutter.sdk")
        assert flutterSdkPath != null, "flutter.sdk not set in local.properties"
        return flutterSdkPath
    }()

    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id "dev.flutter.flutter-plugin-loader" version "1.0.0" // apply true
    id "com.android.application" version "{agpVersion}" apply false
    id "org.jetbrains.kotlin.android" version "{kotlinVersion}" apply false
}

include ":app"
```

If you made some changes to this file, make sure they're placed after
`pluginManagement {}` and `plugins {}` blocks, since Gradle enforces
that no other code can be placed before these blocks.

如果你曾修改过这个文件，请把改动放在
`pluginManagement {}` 和 `plugins {}` 块之后，
因为 Gradle 要求这两个块之前不能放置其他代码。

The settings Flutter Gradle Plugin (`dev.flutter.flutter-plugin-loader`)
should not have apply false (the default is true) or should be explicitly
set to true.

settings 中的 Flutter Gradle 插件（`dev.flutter.flutter-plugin-loader`）
不应设置 apply false（默认是 true），或者应显式设为 true。


### android/build.gradle

### android/build.gradle 文件

Remove the whole `buildscript` block from `<app-src/android/build.gradle`:

从 `<app-src/android/build.gradle` 中移除整个 `buildscript` 块：

```groovy diff
- buildscript {
-     ext.kotlin_version = '{kotlinVersion}'
-     repositories {
-         google()
-         mavenCentral()
-     }
-
-     dependencies {
-         classpath "org.jetbrains.kotlin:gradle-plugin:$kotlin_version"
-     }
- }
```

Here's how that file will likely end up:

该文件最终大致会是这样：

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.buildDir = '../build'
subprojects {
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
subprojects {
    project.evaluationDependsOn(':app')
}

tasks.register("clean", Delete) {
    delete rootProject.buildDir
}
```

### android/app/build.gradle

### android/app/build.gradle 文件

The following changes to code that is, by default
found in `<app-src>/android/app/build.gradle`, also need to be made.
First, remove the following 2 chunks of code that use the
legacy imperative apply method:

默认位于 `<app-src>/android/app/build.gradle` 中的代码
也需要做下面的修改。
首先，移除下面两段使用旧式命令式 apply 方法的代码：

```groovy diff
- def flutterRoot = localProperties.getProperty('flutter.sdk')
- if (flutterRoot == null) {
-     throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
- }
```

```groovy diff
- apply plugin: 'com.android.application'
- apply plugin: 'com.jetbrains.kotlin.android'
- apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"
```

Now apply the plugins again,
but this time using the Plugin DSL syntax.
At the very top of your file, add:

现在再次应用这些插件，但这次使用 Plugin DSL 语法。
在文件最顶部添加：

```groovy
plugins {
    id "com.android.application"
    id "kotlin-android"
    id "dev.flutter.flutter-gradle-plugin"
}
```
`"dev.flutter.flutter-gradle-plugin"` is the project Flutter
Gradle Plugin, which is a different string than the value applied
in settings.gradle(.kts) (`"dev.flutter.flutter-plugin-loader"`).

`"dev.flutter.flutter-gradle-plugin"` 是项目级 Flutter Gradle 插件，
它与 settings.gradle(.kts) 中应用的值
（`"dev.flutter.flutter-plugin-loader"`）不是同一个字符串。

Finally, if your `dependencies` block contains a dependency
on `"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"`,
then remove that dependency.

最后，如果 `dependencies` 块中包含
`"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"` 依赖，
请移除该依赖。

```groovy diff
  dependencies {
-     implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
  }
```
If it was the only dependency in the `dependencies` block,
then you can instead remove the block entirely.

如果它是 `dependencies` 块中唯一的依赖，
可以直接移除整个块。

### Validation

### 验证

Execute `flutter run` to confirm that your app builds and
launches on a connected Android device or emulator.

执行 `flutter run`，确认应用能够构建，
并在已连接的 Android 设备或模拟器上启动。

## Examples

## 示例

### Google Mobile Services and Crashlytics

### Google Mobile Services 与 Crashlytics

If your app was using Google Mobile Services and Crashlytics,
remove the following lines from `<app-src>/android/build.gradle`:

如果应用使用了 Google Mobile Services 和 Crashlytics，
请从 `<app-src>/android/build.gradle` 中移除下面几行：

```groovy diff
  buildscript {
      // ...

      dependencies {
          // ...
-         classpath "com.google.gms:google-services:4.4.0"
-         classpath "com.google.firebase:firebase-crashlytics-gradle:2.9.9"
      }
  }
```

Then remove these 2 lines from `<app-src>/android/app/build.gradle`:

然后从 `<app-src>/android/app/build.gradle` 中移除下面两行：

```groovy diff
- apply plugin: 'com.google.gms.google-services'
- apply plugin: 'com.google.firebase.crashlytics'
```

To migrate to the new, declarative-apply syntax for
the GMS and Crashlytics plugins, add them to `plugins` block
in your app's `<app-src>/android/settings.gradle` file.
The additions should look similar to the following,
but with your desired plugin versions, likely matching
the ones you removed from the `<app-src>/android/build.gradle` file.

要把 GMS 和 Crashlytics 插件迁移到新的声明式 apply 语法，
请把它们加到应用的 `<app-src>/android/settings.gradle` 文件的 `plugins` 块中。
添加的内容应与下面类似，但使用你需要的插件版本，
通常与从 `<app-src>/android/build.gradle` 中移除的版本一致。

```groovy diff
  plugins {
      id "dev.flutter.flutter-plugin-loader" version "1.0.0"
      id "com.android.application" version "{agpVersion}" apply false
      id "org.jetbrains.kotlin.android" version "{kotlinVersion}" apply false
+     id "com.google.gms.google-services" version "4.4.0" apply false
+     id "com.google.firebase.crashlytics" version "2.9.9" apply false
  }
```

Add the following lines to `<app-src>/android/app/build.gradle`:

把下面几行加到 `<app-src>/android/app/build.gradle`：

```groovy diff
  plugins {
      id "com.android.application"
      id "dev.flutter.flutter-gradle-plugin"
      id "org.jetbrains.kotlin.android"
+     id "com.google.gms.google-services"
+     id "com.google.firebase.crashlytics"
  }
```

## Timeline

## 时间线

Support in stable release: 3.16.0

稳定版中提供支持：3.16.0

Recommended in stable release: 3.19.0

稳定版中建议采用：3.19.0

## References

## 参考资料

Gradle build files generated by `flutter create`
differ across Flutter versions.
For a detailed overview, see [issue #135392][].
You should consider using the
latest versions of build files.

`flutter create` 生成的 Gradle 构建文件会随 Flutter 版本而不同。
详细说明请参阅 [issue #135392][issue #135392]。
建议使用最新版本的构建文件。

[legacy, imperative apply script method]: https://docs.gradle.org/8.5/userguide/plugins.html#sec:script_plugins
[declarative plugins {} block]: https://docs.gradle.org/8.5/userguide/plugins.html#sec:plugins_block
[plugins block]: https://docs.gradle.org/current/userguide/plugins.html#plugins_dsl_limitations
[issue #135392]: {{site.repo.flutter}}/issues/135392
