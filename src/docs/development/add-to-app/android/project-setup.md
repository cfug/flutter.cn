---
title: Integrate a Flutter module into your Android project
title: 将 Flutter module 集成到 Android 项目
short-title: Integrate Flutter
short-title: 集成 Flutter
description: Learn how to integrate a Flutter module into your existing Android project.
description: 了解如何将 Flutter module 集成到你现有的 Android 项目中。
---

Flutter can be embedded into your existing Android
application piecemeal, as a source code Gradle
subproject or as AARs.

Flutter 可以作为 Gradle 子项目源码或者 AAR 嵌入到现有的 Android 应用程序中。

The integration flow can be done using the Android Studio
IDE with the [Flutter plugin][] or manually.

开发者可以使用带有 [Flutter 插件][Flutter plugin] 
的 Android Studio 或手动完成整个集成流程。

{{site.alert.warning}}

  Your existing Android app may support architectures such as `mips`
  or `x86`. Flutter currently [only supports][]
  building ahead-of-time (AOT) compiled libraries
  for `x86_64`, `armeabi-v7a` and `arm64-v8a`.

  你目前现有的 Android 项目可能支持 `mips`  或 `x86` 之类的架构，
  然而，Flutter 当前仅支持为 `x86_64`，`armeabi-v7a` 和 `arm64-v8a` 构建预编
  （AOT）的库。

  Consider using the [`abiFilters`][] Android Gradle
  Plugin API to limit the supported architectures in your APK.
  Doing this avoids a missing `libflutter.so` runtime crash,
  for example:

  可以考虑使用 `abiFilters` 这个 Android Gradle 插件 API 
  来指定 APK 中支持的架构，从而避免 `libflutter.so` 无法生成而导致应用运行时崩溃，
  具体操作如下：

<!--code-excerpt "MyApp/app/build.gradle" title-->
```gradle
android {
  //...
  defaultConfig {
    ndk {
      // Filter for architectures supported by Flutter.
      abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86_64'
    }
  }
}
```

  The Flutter engine has an `x86` and `x86_64` version.
  When using an emulator in debug Just-In-Time (JIT) mode,
  the Flutter module still runs correctly.

  Flutter 引擎支持 `x86` 和 `x86_64` 的版本，
  在模拟器以 debug 即时编译 (JIT) 模式运行时，
  Flutter 模块仍可以正常运行。

{{site.alert.end}}

## Using Android Studio

## 使用 Android Studio

The Android Studio IDE is a convenient way of integrating
your Flutter module automatically. With Android Studio,
you can co-edit both your Android code and your Flutter code
in the same project. You can also continue to use your normal
IntelliJ Flutter plugin functionalities such as Dart code
completion, hot reload, and widget inspector.

直接使用 Android Studio 是在现有应用中自动集成 Flutter 模块比较便捷的方法。 
在 Android Studio 中，你可以在一个项目中同时编写 Android 代码和 Flutter 代码，
还可以继续使用各种常用的 IntelliJ Flutter 插件功能，
例如 Dart 代码自动补全、热重载和 widget 检查器等。

Add-to-app flows with Android Studio are only supported on
Android Studio 3.6 with version 42+ of the [Flutter plugin][]
for IntelliJ. The Android Studio integration also only
supports integrating using a source code Gradle subproject,
rather than using AARs. See below for more details on
the distinction.

只有在 Android Studio 3.6 及以上的版本，配合 42 以上版本的
IntelliJ [Flutter 插件][Flutter plugin] 才能直接通过 Android Studio 执行集成流程，
并且，Android Studio 目前仅支持以 Gradle 子项目源码的方式集成，而不能以 AAR 方式集成。
有关这两种方式的区别及更多详细信息，请参见下文。

Using the **File > New > New Module...** menu in
Android Studio in your existing Android project,
you can either create a new Flutter module to integrate,
or select an existing Flutter module that was created previously.

在 Android Studio 打开现有的 Android 项目并点击菜单按钮 **File > New > New Module...** ，
这样就可以创建出一个可以集成的新 Flutter 模块，或者选择导入已有的 Flutter 模块。

{% include app-figure.md image="development/add-to-app/android/project-setup/ide-new-module.png" %}

If you create a new module, you can use a wizard to
select the module name, location, and so on.

如果你想创建一个新的 Flutter 模块，则可以直接在向导窗口中填写模块名称、路径等信息。

{% include app-figure.md image="development/add-to-app/android/project-setup/ide-wizard.png" %}

The Android Studio plugin automatically configures your
Android project to add your Flutter module as a dependency,
and your app is ready to build.

此时，Android Studio 插件就会自动为这个 Android 项目
配置添加 Flutter 模块作为依赖项，这时集成应用就已准备好进行下一步的构建。

{{site.alert.note}}

  To see the changes that were automatically made to your
  Android project by the IDE plugin, consider using
  source control for your Android project before performing
  any steps. A local diff shows the changes.

  如果要查看 IDE 插件自动对 Android 项目做了哪些更改，
  可以在执行具体步骤之前对 Android 项目使用代码版本控制，
  便可以使用本地 diff 查看更改内容的具体信息。

{{site.alert.end}}

{{site.alert.tip}}

  By default, your project's Project pane is probably
  showing the 'Android' view. If you can't see your new
  Flutter files in the Project pane, ensure that
  your Project pane is set to display 'Project Files',
  which shows all files without filtering.

  默认情况下，项目的 Project 窗口中可能会显示的是 “Android” 视图，
  如果在 Project 窗口中看不到新创建的 Flutter 文件，
  可以将 Project 窗口设置为显示 “Project Files”，
  这时就会显示所有未过滤的文件。

{{site.alert.end}}

Your app now includes the Flutter module as a dependency.
You can jump to the [Adding a Flutter screen to an Android app][]
to follow the next steps.

现在，应用程序已经包含了 Flutter 模块作为依赖项，
你可以跳转至
[向 Android 应用中添加 Flutter 页面][Adding a Flutter screen to an Android app] 执行后续步骤。

## Manual integration

## 手动集成

To integrate a Flutter module with an existing Android app
manually, without using Flutter's Android Studio plugin,
follow these steps:

如果想要在不使用 Flutter 的 Android Studio 插件的情况下
手动将 Flutter 模块与现有的 Android 应用集成，可以参考以下步骤：

### Create a Flutter module

### 创建 Flutter 模块

Let's assume that you have an existing Android app at
`some/path/MyApp`, and that you want your Flutter
project as a sibling:

假设你在 `some/path/MyApp` 路径下已有一个 Android 应用，
并且你希望 Flutter 项目作为同级项目：

```terminal
$ cd some/path/
$ flutter create -t module --org com.example my_flutter
```

This creates a `some/path/my_flutter/` Flutter module project
with some Dart code to get you started and an `.android/`
hidden subfolder. The `.android` folder contains an
Android project that can both help you run a barebones
standalone version of your Flutter module via `flutter run`
and it's also a wrapper that helps bootstrap the Flutter
module an embeddable Android library.

这会创建一个 `some/path/my_flutter/` 的 Flutter 模块项目，
其中包含一些 Dart 代码来帮助你入门以及一个隐藏的子文件夹 `.android/`。
`.android` 文件夹包含一个 Android 项目，
该项目不仅可以帮助你通过 `flutter run` 运行这个 Flutter 模块的独立应用，
而且还可以作为封装程序来帮助引导 Flutter 模块作为可嵌入的 Android 库。

{{site.alert.note}}

  Add custom Android code to your own existing
  application's project or a plugin,
  not to the module in `.android/`.
  Changes made in your module's `.android/`
  directory won't appear in your existing Android
  project using the module.

  将自己的 Android 代码添加到你现有应用程序的项目或插件中，
  而不是添加到 `.android/` 中的模块。在模块的 `.android/` 目录中
  所做的任何更改并不会显示在使用该模块的现有 Android 项目中。

  Do not source control the `.android/` directory
  since it's autogenerated. Before building the
  module on a new machine, run `flutter pub get`
  in the `my_flutter` directory first to regenerate
  the `.android/` directory before building the
  Android project using the Flutter module.

  由于 `.android/` 目录是自动生成的，因此不需要对它的代码进行版本控制，
  在新机器上构建模块之前，可以先在 `my_flutter` 目录中
  运行 `flutter pub get` 来重新生成 `.android/` 目录，
  然后再使用 Flutter 模块构建 Android 项目。

{{site.alert.end}}

### Java 8 requirement

### 引入 Java 8

The Flutter Android engine uses Java 8 features.

Flutter Android 引擎需要使用到 Java 8 中的新特性。

Before attempting to connect your Flutter module project
to your host Android app, ensure that your host Android
app declares the following source compatibility within your
app's `build.gradle` file, under the `android { }`
block, such as:

在尝试将 Flutter 模块项目集成到宿主 Android 应用之前，
请先确保宿主 Android 应用的 build.gradle 文件的  `android { }` 块中
声明了以下源兼容性，例如：

<!--code-excerpt "MyApp/app/build.gradle" title-->

```gradle
android {
  //...
  compileOptions {
    sourceCompatibility 1.8
    targetCompatibility 1.8
  }
}
```

### Add the Flutter module as a dependency

### 将 Flutter module 作为依赖项

Next, add the Flutter module as a dependency of your
existing app in Gradle. There are two ways to achieve this.
The AAR mechanism creates generic Android AARs as
intermediaries that packages your Flutter module.
This is good when your downstream app builders don't
want to have the Flutter SDK installed. But,
it adds one more build step if you build frequently.

接下来，将 Flutter 模块添加为 Gradle 中宿主应用程序的依赖项。
主要有两种方法实现。 AAR 机制可以为每个 Flutter 模块
创建 Android AAR 作为依赖媒介。当你的宿主应用程序开发者
不想安装 Flutter SDK 时，这是一个很好方案，但是，如果你想要经常编译，
那么每次都需要重新编译一次，该步骤不可避免。

The source code subproject mechanism is a convenient
one-click build process, but requires the Flutter SDK.
This is the mechanism used by the Android Studio IDE plugin.

直接将 Flutter 模块的源码作为子项目的依赖机制是一种便捷的一键式构建方案，
但此时需要另外安装 Flutter SDK，这是目前 Android Studio IDE 插件使用的机制。

#### Option A - Depend on the Android Archive (AAR)

#### 方案 A - 依赖 Android Archive (AAR)

This option packages your Flutter library as a generic local
Maven repository composed of AARs and POMs artifacts.
This option allows your team to build the host app without
installing the Flutter SDK. You can then distribute the
artifacts from a local or remote repository.

这种方式会将 Flutter 库打包成由 AAR 和 POM artifacts 组成的本地 Maven 存储库。
这种方案可以使你的团队不需要安装 Flutter SDK 即可编译宿主应用。
之后，你可以从本地或远程存储库中分发更新 artifacts。

Let's assume you built a Flutter module at
`some/path/my_flutter`, and then run:

假设你在 `some/path/my_flutter` 下构建 Flutter 模块，执行如下命令：

```terminal
$ cd some/path/my_flutter
$ flutter build aar
```

Then, follow the on-screen instructions to integrate.

然后，根据屏幕上的提示完成集成操作。

{% include app-figure.md image="development/add-to-app/android/project-setup/build-aar-instructions.png" %}

More specifically, this command creates
(by default all debug/profile/release modes)
a [local repository][], with the following files:

详细地说，该命令应用于创建（默认情况下创建 debug/profile/release 所有模式）本地存储库，
主要包含以下文件：

```text
build/host/outputs/repo
└── com
    └── example
        └── my_flutter
            ├── flutter_release
            │   ├── 1.0
            │   │   ├── flutter_release-1.0.aar
            │   │   ├── flutter_release-1.0.aar.md5
            │   │   ├── flutter_release-1.0.aar.sha1
            │   │   ├── flutter_release-1.0.pom
            │   │   ├── flutter_release-1.0.pom.md5
            │   │   └── flutter_release-1.0.pom.sha1
            │   ├── maven-metadata.xml
            │   ├── maven-metadata.xml.md5
            │   └── maven-metadata.xml.sha1
            ├── flutter_profile
            │   ├── ...
            └── flutter_debug
                └── ...
```

To depend on the AAR, the host app must be able
to find these files.

要依赖 AAR，宿主应用必须能够找到这些文件。

To do that, edit `app/build.gradle` in your host app
so that it includes the local repository and the dependency:

为此，需要在宿主应用程序中修改 `app/build.gradle` 文件，
使其包含本地存储库和上述依赖项：

<!--code-excerpt "MyApp/app/build.gradle" title-->
```gradle
android {
  // ...
}

repositories {
  maven {
    url 'some/path/my_flutter/build/host/outputs/repo'
    // This is relative to the location of the build.gradle file
    // if using a relative path.
  }
  maven {
    url 'https://storage.googleapis.com/download.flutter.io'
  }
}

dependencies {
  // ...
  debugImplementation 'com.example.flutter_module:flutter_debug:1.0'
  profileImplementation 'com.example.flutter_module:flutter_profile:1.0'
  releaseImplementation 'com.example.flutter_module:flutter_release:1.0'
}
```

{{site.alert.important}}

  If you're located in China, use a mirror site such as
  `https://[a mirror site]/download.flutter.io` rather than the
  `storage.googleapis.com` domain directly. See our
  [Using Flutter in China][] page for information on mirrors.

  在国内，需要使用镜像站点（如直接使用 `https://[a mirror site]/download.flutter.io` 代替 `storage.googleapis.com`）。 
  有关镜像的详细信息，参见 [在中国网络环境下使用 Flutter][Using Flutter in China] 页面。

{{site.alert.end}}

{{site.alert.tip}}

  You can also build an AAR for your Flutter module in Android Studio using
  the `Build > Flutter > Build AAR` menu.

  你也可以直接点击 Android Studio 菜单中的 `Build > Flutter > Build AAR` 
  为 Flutter 模块构建 AAR。

{% include app-figure.md image="development/add-to-app/android/project-setup/ide-build-aar.png" %}
{{site.alert.end}}

  Your app now includes the Flutter module as a dependency.
  You can follow the next steps in the
  [Adding a Flutter screen to an Android app][].

你的应用程序现在添加了 Flutter 模块作为依赖项，下面，
你可以按照 [向 Android 应用中添加 Flutter 页面][Adding a Flutter screen to an Android app] 中的后续步骤继续操作。

#### Option B - Depend on the module's source code

#### 方案 B - 依赖模块的源码

This option enables a one-step build for both your
Android project and Flutter project. This option is
convenient when you work on both parts simultaneously
and rapidly iterate, but your team must install the
Flutter SDK to build the host app.

该方式可以使你的 Android 项目和 Flutter 项目能够同步一键式构建。
当你需要同时在这两个项目中进行快速迭代时，这种方案非常方便，
但是此时，你的团队必须安装 Flutter SDK 才能构建宿主应用程序。

{{site.alert.tip}}

  By default, the host app provides the `:app` Gradle project.
  To change the name of this project, set
  `flutter.hostAppProjectName` in the Flutter module's
  `gradle.properties` file. Finally, include this project
  in the host app's `settings.gradle` file mentioned below.

  默认情况下，宿主应用程序已经提供了 Gradle 项目 `:app`。 
  要更改该项目的名称，可以在 Flutter 模块的 `gradle.properties` 文件中
  设置 `flutter.hostAppProjectName`。最后，将该项目添加到
  下面提到的宿主应用的 settings.gradle 文件中。

{{site.alert.end}}

Include the Flutter module as a subproject in the host app's
`settings.gradle`:

将 Flutter 模块作为子项目添加到宿主应用的 `settings.gradle` 中：

<!--code-excerpt "MyApp/settings.gradle" title-->
```groovy
// Include the host app project.
include ':app'                                    // assumed existing content
setBinding(new Binding([gradle: this]))                                // new
evaluate(new File(                                                     // new
  settingsDir.parentFile,                                              // new
  'my_flutter/.android/include_flutter.groovy'                         // new
))                                                                     // new
```

Assuming `my_flutter` is a sibling to `MyApp`.

假设 `my_flutter` 和 `MyApp` 是同级目录。

The binding and script evaluation allows the Flutter]
module to `include` itself (as `:flutter`) and any
Flutter plugins used by the module (as `:package_info`,
`:video_player`, etc) in the evaluation context of
your `settings.gradle`.

binding 和 evaluation 脚本可以使 Flutter 模块将其自身（如 `:flutter`）和
该模块使用的所有 Flutter 插件（如 `:package_info`，`:video_player` 等）
都包含在 `settings.gradle` 的评估的上下文中。

Introduce an `implementation` dependency on the Flutter
module from your app:

在你的应用中引入对 Flutter 模块的依赖：

<!--code-excerpt "MyApp/app/build.gradle" title-->

```groovy
dependencies {
  implementation project(':flutter')
}
```

Your app now includes the Flutter module as a dependency.
You can follow the next steps in the [Adding a Flutter screen to an Android app][].

此时，你的应用程序已将 Flutter 模块添加为依赖项，
下面，你可以按照 
[向 Android 应用中添加 Flutter 页面][Adding a Flutter screen to an Android app] 
中的后续步骤继续操作。


[`abiFilters`]: http://google.github.io/android-gradle-dsl/current/com.android.build.gradle.internal.dsl.NdkOptions.html
[Adding a Flutter screen to an Android app]: /docs/development/add-to-app/android/add-flutter-screen
[Flutter plugin]: https://plugins.jetbrains.com/plugin/9212-flutter
[local repository]: https://docs.gradle.org/current/userguide/declaring_repositories.html#sub:maven_local
[only supports]: /docs/resources/faq#what-devices-and-os-versions-does-flutter-run-on
[Using Flutter in China]: /community/china
