---
# title: Manage plugins and dependencies in add-to-app
title: 在混合应用中管理 plugin 和依赖
# shortTitle: Plugin setup
shortTitle: 初始化 Plugin
# description: >
#   Learn how to use plugins and share your 
#   plugin's library dependencies with your existing app.
description: 学习如何在现有应用中使用 plugin，并共享 plugin 的依赖库。
tags: Flutter混合工程,add2app
keywords: Android,插件依赖
ai-translated: true
---

This guide describes how to set up your project to consume
plugins and how to manage your Gradle library dependencies
between your existing Android app and your Flutter module's plugins.

本指南介绍如何设置你的项目以使用 plugin，
以及如何在你现有的 Android 应用与 Flutter 模块的 plugin 之间
管理 Gradle 库依赖。

## A. Simple scenario

## A. 简单场景

In the simple cases:

在简单的情况下：

* Your Flutter module uses a plugin that has no additional
  Android Gradle dependency because it only uses Android OS
  APIs, such as the camera plugin.

  你的 Flutter 模块使用的 plugin 没有额外的 Android Gradle 依赖，
  因为它只使用 Android OS API，例如 camera plugin。

* Your Flutter module uses a plugin that has an Android
  Gradle dependency, such as
  [ExoPlayer from the video_player plugin][],
  but your existing Android app didn't depend on ExoPlayer.

  你的 Flutter 模块使用的 plugin 有 Android Gradle 依赖，
  例如 [video_player plugin 中的 ExoPlayer][ExoPlayer from the video_player plugin]，
  但你现有的 Android 应用并不依赖 ExoPlayer。

There are no additional steps needed. Your add-to-app
module will work the same way as a full-Flutter app.
Whether you integrate using Android Studio,
Gradle subproject or AARs,
transitive Android Gradle libraries are automatically
bundled as needed into your outer existing app.

无需额外步骤。你的 add-to-app 模块
将与纯 Flutter 应用以相同的方式工作。
无论你使用 Android Studio、Gradle 子项目还是 AAR 进行集成，
传递依赖的 Android Gradle 库都会按需自动
打包进你外层的现有应用中。

## B. Plugins needing project edits

## B. 需要修改项目的 plugin

Some plugins require you to make some edits to the
Android side of your project.

有些 plugin 需要你对项目的 Android 端做一些修改。

For example, the integration instructions for the
[firebase_crashlytics][] plugin require manual
edits to your Android wrapper project's `build.gradle` file.

例如，[firebase_crashlytics][] plugin 的集成说明
要求手动修改你的 Android 包装项目的 `build.gradle` 文件。

For full-Flutter apps, these edits are done in your
Flutter project's `/android/` directory.

对于纯 Flutter 应用，这些修改是在你的
Flutter 项目的 `/android/` 目录中完成的。

In the case of a Flutter module, there are only Dart
files in your module project. Perform those Android
Gradle file edits on your outer, existing Android
app rather than in your Flutter module.

对于 Flutter 模块，你的模块项目中只有 Dart 文件。
请在你外层的现有 Android 应用上执行这些 Android Gradle 文件修改，
而不是在你的 Flutter 模块中。

:::note
Astute readers might notice that the Flutter module
directory also contains an `.android` and an
`.ios` directory. Those directories are Flutter-tool-generated
and are only meant to bootstrap Flutter into generic
Android or iOS libraries. They should not be edited or checked-in.
This allows Flutter to improve the integration point should
there be bugs or updates needed with new versions of Gradle,
Android, Android Gradle Plugin, etc.

敏锐的读者可能会注意到，Flutter 模块目录中
还包含 `.android` 和 `.ios` 目录。这些目录由 Flutter 工具生成，
仅用于将 Flutter 引导进通用的 Android 或 iOS 库。
不应编辑它们，也不应将其提交到版本库。
这样，当新版本的 Gradle、Android、Android Gradle Plugin 等
出现 bug 或需要更新时，Flutter 便可以改进该集成点。

For advanced users, if more modularity is needed and you must
not leak knowledge of your Flutter module's dependencies into
your outer host app, you can rewrap and repackage your Flutter
module's Gradle library inside another native Android Gradle
library that depends on the Flutter module's Gradle library.
You can make your Android specific changes such as editing the
AndroidManifest.xml, Gradle files or adding more Java files
in that wrapper library.

对于高级用户，如果需要更高的模块化，
且不能将 Flutter 模块的依赖信息泄露到外层宿主应用中，
你可以将 Flutter 模块的 Gradle 库重新包装并重新打包，
放进另一个依赖该 Flutter 模块 Gradle 库的原生 Android Gradle 库中。
你可以在那个包装库中进行 Android 专属的修改，
例如编辑 AndroidManifest.xml、Gradle 文件或添加更多 Java 文件。
:::

## C. Merging libraries

## C. 合并库

The scenario that requires slightly more attention is if
your existing Android application already depends on the
same Android library that your Flutter module
does (transitively via a plugin).

需要稍加注意的场景是：如果你现有的 Android 应用
已经依赖了与你的 Flutter 模块（通过 plugin 传递依赖）
相同的 Android 库。

For instance, your existing app's Gradle might already have:

例如，你现有应用的 Gradle 中可能已有：

<Tabs key="existing-app-dependencies-1">
<Tab name="Kotlin">

```kotlin title="ExistingApp/app/build.gradle.kts"
…
dependencies {
    …
    implementation("com.crashlytics.sdk.android:crashlytics:2.10.1")
    …
}
…
```

</Tab>
<Tab name="Groovy">

```groovy title="ExistingApp/app/build.gradle"
…
dependencies {
    …
    implementation "com.crashlytics.sdk.android:crashlytics:2.10.1"
    …
}
…
```

</Tab>
</Tabs>

And your Flutter module also depends on
[firebase_crashlytics][] via `pubspec.yaml`:

而你的 Flutter 模块也通过 `pubspec.yaml`
依赖了 [firebase_crashlytics][]：

```yaml title="flutter_module/pubspec.yaml"
…
dependencies:
  …
  firebase_crashlytics: ^0.1.3
  …
…
```

This plugin usage transitively adds a Gradle dependency again via
firebase_crashlytics v0.1.3's own [Gradle file][]:

这种 plugin 用法会通过 firebase_crashlytics v0.1.3 自身的
[Gradle 文件][Gradle file] 再次传递依赖式地添加一个 Gradle 依赖：

```groovy title="firebase_crashlytics_via_pub/android/build.gradle
…
dependencies {
    …
    implementation "com.crashlytics.sdk.android:crashlytics:2.9.9"
    …
}
…
```

The two `com.crashlytics.sdk.android:crashlytics` dependencies
might not be the same version. In this example,
the host app requested v2.10.1 and the Flutter
module plugin requested v2.9.9.

这两个 `com.crashlytics.sdk.android:crashlytics` 依赖
可能版本不同。在本例中，
宿主应用请求的是 v2.10.1，而 Flutter
模块 plugin 请求的是 v2.9.9。

By default, Gradle v5
[resolves dependency version conflicts][]
by using the newest version of the library.

默认情况下，Gradle v5
[解决依赖版本冲突][resolves dependency version conflicts]
的方式是使用该库的最新版本。

This is generally ok as long as there are no API
or implementation breaking changes between the versions.
For example, you might use the new Crashlytics library
in your existing app as follows:

只要各版本之间没有破坏性的 API 或实现变更，
这通常没有问题。例如，你可能会在现有应用中
按如下方式使用新的 Crashlytics 库：

<Tabs key="existing-app-dependencies-2">
<Tab name="Kotlin">

```kotlin title="ExistingApp/app/build.gradle.kts"
…
dependencies {
    …
    implementation("com.crashlytics.sdk.android:crashlytics:2.10.1")
    …
}
…
```

</Tab>
<Tab name="Groovy">

```groovy title="ExistingApp/app/build.gradle"
…
dependencies {
    …
    implementation "com.google.firebase:firebase-crashlytics:17.0.0-beta03"
    …
}
…
```

</Tab>
</Tabs>

This approach won't work since there are major API differences
between the Crashlytics' Gradle library version
v17.0.0-beta03 and v2.9.9.

这种方式行不通，因为 Crashlytics 的 Gradle 库
v17.0.0-beta03 与 v2.9.9 之间存在重大的 API 差异。

For Gradle libraries that follow semantic versioning,
you can generally avoid compilation and runtime errors
by using the same major semantic version in your
existing app and Flutter module plugin.

对于遵循语义化版本的 Gradle 库，
你通常可以通过在现有应用和 Flutter 模块 plugin 中
使用相同的主版本号，来避免编译和运行时错误。


[ExoPlayer from the video_player plugin]: {{site.repo.packages}}/blob/main/packages/video_player/video_player_android/android/build.gradle
[firebase_crashlytics]: {{site.pub}}/packages/firebase_crashlytics
[Gradle file]: {{site.github}}/firebase/flutterfire/blob/bdb95fcacf7cf077d162d2f267eee54a8b0be3bc/packages/firebase_crashlytics/android/build.gradle#L40
[resolves dependency version conflicts]: https://docs.gradle.org/current/userguide/dependency_resolution.html#sub:resolution-strategy
