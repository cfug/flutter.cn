---
# title: Integrate a Flutter module into your Android project
title: 将 Flutter module 集成到 Android 项目
# short-title: Integrate Flutter
short-title: 集成 Flutter
# description: Learn how to integrate a Flutter module into your existing Android project.
description: 了解如何将 Flutter module 集成到你现有的 Android 项目中。
tags: Flutter混合工程,add2app
keywords: Android,项目集成
---

Flutter can be embedded into your existing Android
application piecemeal, as a source code Gradle
subproject or as AARs.

Flutter 可以作为 Gradle 子项目源码或者 AAR 嵌入到现有的 Android 应用程序中。

The integration flow can be done using the Android Studio
IDE with the [Flutter plugin][] or manually.

开发者可以使用带有 [Flutter 插件][Flutter plugin] 
的 Android Studio 或手动完成整个集成流程。

:::warning

Your existing Android app might support architectures
such as `mips` or `x86`. Flutter currently [only supports][]
building ahead-of-time (AOT) compiled libraries
for `x86_64`, `armeabi-v7a`, and `arm64-v8a`.

你目前现有的 Android 项目可能支持 `mips`  或 `x86` 之类的架构，
然而，Flutter [当前仅支持][only supports]
为 `x86_64`，`armeabi-v7a` 和 `arm64-v8a` 构建预编（AOT）的库。

Consider using the [`abiFilters`][] Android Gradle
Plugin API to limit the supported architectures in your APK.
Doing this avoids a missing `libflutter.so` runtime crash,
for example:

可以考虑使用 `abiFilters` 这个 Android Gradle 插件 API 
来指定 APK 中支持的架构，从而避免 `libflutter.so` 无法生成而导致应用运行时崩溃，
具体操作如下：

{% tabs "android-build-language" %}
{% tab "Kotlin" %}

```kotlin title="MyApp/app/build.gradle.kts"
android {
    //...
    defaultConfig {
        ndk {
            // Filter for architectures supported by Flutter
            abiFilters += listOf("armeabi-v7a", "arm64-v8a", "x86_64")
        }
    }
}
```

{% endtab %}
{% tab "Groovy" %}

```groovy title="MyApp/app/build.gradle"
android {
    // ...
    defaultConfig {
        ndk {
            // Filter for architectures supported by Flutter
            abiFilters "armeabi-v7a", "arm64-v8a", "x86_64"
        }
    }
}
```

{% endtab %}
{% endtabs %}

The Flutter engine also has an `x86_64` version.
When using an emulator in debug Just-In-Time (JIT) mode,
the Flutter module still runs correctly.

Flutter 引擎也有一个 `x86_64` 的版本，
在模拟器以 debug 即时编译 (JIT) 模式运行时，
Flutter 模块仍可以正常运行。

:::

## Integrate your Flutter module

## 集成 Flutter 模块

{% tabs %}
{% tab "使用 Android Studio" %}

### Integrate with Android Studio {:.no_toc}

### 使用 Android Studio 集成 {:.no_toc}

The Android Studio IDE can help integrate your Flutter module.
Using Android Studio, you can edit both your Android and Flutter code
in the same IDE.

直接使用 Android Studio 是在现有应用中自动集成 Flutter 模块比较便捷的方法。
在 Android Studio 中，你可以在一个项目中同时编写 Android 代码和 Flutter 代码。

You can also use IntelliJ Flutter plugin functionality like
Dart code completion, hot reload, and widget inspector.

你还可以继续使用各种常用的 IntelliJ Flutter 插件功能，
例如 Dart 代码自动补全、热重载和 widget 检查器等。

To build your app, the Android Studio plugin configures your
Android project to add your Flutter module as a dependency.

为了构建你的应用，
Android Studio 插件会配置你的 Android 项目，
来将 Flutter 模块添加为依赖。

1. Open your Android project in Android Studio.

   在 Android Studio 中打开你的 Android 项目。

1. Go to **File** > **New** > **New Project...**.
    The **New Project** dialog displays.

   前往 **File** > **New** > **New Project...**，
   此时 **New Project** 弹窗会显示。

1. Click **Flutter**.

   选择 **Flutter**。

1. If asked to provide your **Flutter SDK path**, do so and click **Next**.

   填写你的 **Flutter SDK path** 并点击 **Next** 继续。

1. Complete the configuration of your Flutter module.

   完成你的 Flutter 模块配置。

    * If you have an existing project:

      如果你的项目是已有的：

        {: type="a"}
        1. To choose an existing project, click **...**
           to the right of the **Project location** box.

           点击 **Project location** 右侧的 **...** 选择现有的项目。

        1. Navigate to your Flutter project directory.

           前往你的 Flutter 项目的目录所在位置。

        1. Click **Open**.

           点击 **打开**。

    * If you need to create a new Flutter project:

      如果你需要创建一个新的 Flutter 项目：

        {: type="a"}
        1. Complete the configuration dialog.

           完成配置弹窗的内容。

        1. In the **Project type** menu, select **Module**.

           在 **Project type** 菜单中，选择 **Module**。

1. Click **Finish**.

   点击完成。

:::tip

By default, your project's Project pane might show the 'Android' view.
If you can't see your new Flutter files in the Project pane,
set your Project pane to display **Project Files**.
This shows all files without filtering.

默认情况下，项目的 Project 窗口中可能会显示的是 “Android” 视图，
如果在 Project 窗口中看不到新创建的 Flutter 文件，
可以将 Project 窗口设置为显示 **Project Files**，
这时就会显示所有未过滤的文件。

:::

{% endtab %}
{% tab "不使用 Android Studio" %}

### Integrate without Android Studio {:.no_toc}

### 不使用 Android Studio 进行集成 {:.no_toc}

To integrate a Flutter module with an existing Android app
manually, without using Flutter's Android Studio plugin,
follow these steps:

如果想要在不使用 Flutter 的 Android Studio 插件的情况下
手动将 Flutter 模块与现有的 Android 应用集成，可以参考以下步骤：

#### Create a Flutter module

#### 创建 Flutter 模块

Let's assume that you have an existing Android app at
`some/path/MyApp`, and that you want your Flutter
project as a sibling:

假设你在 `some/path/MyApp` 路径下已有一个 Android 应用，
并且你希望 Flutter 项目作为同级项目：

```console
cd some/path/
flutter create -t module --org com.example flutter_module
```

This creates a `some/path/flutter_module/` Flutter module project
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

:::note

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
in the `flutter_module` directory first to regenerate
the `.android/` directory before building the
Android project using the Flutter module.

由于 `.android/` 目录是自动生成的，因此不需要对它的代码进行版本控制，
在新机器上构建模块之前，可以先在 `my_flutter` 目录中
运行 `flutter pub get` 来重新生成 `.android/` 目录，
然后再使用 Flutter 模块构建 Android 项目。

:::

:::note

To avoid Dex merging issues, `flutter.androidPackage` should
not be identical to your host app's package name.

为了避免 Dex 的合并问题，`flutter.androidPackage` 不要使用与宿主应用一样的包名。

:::

#### Java version requirement

#### Java 版本要求

Flutter requires your project to declare compatibility with Java 11 or later.

Flutter 需要使用 Java 11 的特性。

Before attempting to connect your Flutter module project
to your host Android app, ensure that your host Android
app declares the following source compatibility within your
app's `build.gradle` file, under the `android { }` block.

在尝试将 Flutter 模块项目集成到宿主 Android 应用之前，
请先确保宿主 Android 应用的 build.gradle 文件的
`android { }` 块中声明了以下源兼容性。

```groovy title="MyApp/app/build.gradle"
android {
    // ...
    compileOptions {
        sourceCompatibility = 11 // The minimum value
        targetCompatibility = 11 // The minimum value
    }
}
```

#### Centralize repository settings

Starting with Gradle 7, Android recommends using centralized repository
declarations in `settings.gradle` instead of project or module level
declarations in `build.gradle` files.

Before attempting to connect your Flutter module project to your
host Android app, make the following changes.

1. Remove the `repositories` block in all of your app's `build.gradle` files.

   ```groovy
   // Remove the following block, starting on the next line
       repositories {
           google()
           mavenCentral()
       }
   // ...to the previous line
   ```

1. Add the `dependencyResolutionManagement` displayed in this step to the
   `settings.gradle` file.

   ```groovy
   dependencyResolutionManagement {
      repositoriesMode = RepositoriesMode.PREFER_SETTINGS
      repositories {
          google()
          mavenCentral()
      }
   }
   ```

{% endtab %}
{% endtabs %}

## Add the Flutter module as a dependency

## 将 Flutter module 作为依赖项

Add the Flutter module as a dependency of your
existing app in Gradle. You can achieve this in two ways.

主要有两种方法将 Flutter 模块添加为 Gradle 中宿主应用程序的依赖项。

1. **Android archive**
    The AAR mechanism creates generic Android AARs as
    intermediaries that packages your Flutter module.
    This is good when your downstream app builders don't
    want to have the Flutter SDK installed. But,
    it adds one more build step if you build frequently.

   **AAR 集成**
    AAR 机制可以为每个 Flutter 模块创建 Android AAR 作为依赖媒介。
    当你的宿主应用程序开发者不想安装 Flutter SDK 时，这是一个很好方案。
    但是每次修改都需要重新编译。

1. **Module source code**
    The source code subproject mechanism is a convenient
    one-click build process, but requires the Flutter SDK.
    This is the mechanism used by the Android Studio IDE plugin.

   **模块源码集成**
    直接将 Flutter 模块的源码作为子项目的依赖机制是一种便捷的一键式构建方案，
    但此时需要另外安装 Flutter SDK，这是目前 Android Studio IDE 插件使用的机制。

{% tabs %}
{% tab "AAR 集成" %}

### Depend on the Android Archive (AAR) {:.no_toc}

### 依赖 Android Archive (AAR) {:.no_toc}

This option packages your Flutter library as a generic local
Maven repository composed of AARs and POMs artifacts.
This option allows your team to build the host app without
installing the Flutter SDK. You can then distribute the
artifacts from a local or remote repository.

这种方式会将 Flutter 库打包成由 AAR 和 POM artifacts 组成的本地 Maven 存储库。
这种方案可以使你的团队不需要安装 Flutter SDK 即可编译宿主应用。
之后，你可以从本地或远程存储库中分发更新 artifacts。

Let's assume you built a Flutter module at
`some/path/flutter_module`, and then run:

假设你在 `some/path/flutter_module` 下构建 Flutter 模块，执行如下命令：

```console
cd some/path/flutter_module
flutter build aar
```

Then, follow the on-screen instructions to integrate.

然后，根据屏幕上的提示完成集成操作。

{% render docs/app-figure.md, image:"development/add-to-app/android/project-setup/build-aar-instructions.png" %}

More specifically, this command creates
(by default all debug/profile/release modes)
a [local repository][], with the following files:

详细地说，该命令应用于创建（debug/profile/release 所有模式）
[本地仓库][local repository]，主要包含以下文件：

```plaintext
build/host/outputs/repo
└── com
    └── example
        └── flutter_module
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

To do that, edit `settings.gradle` in your host app
so that it includes the local repository and the dependency:

为此，需要在宿主应用程序中修改 `settings.gradle` 文件，
使其包含本地存储库和上述依赖项：

{% tabs "settings.gradle.kts" %}
{% tab "Kotlin" %}

```kotlin title="settings.gradle.kts"
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
        maven("https://storage.googleapis.com/download.flutter.io")
    }
}
```

{% endtab %}
{% tab "Groovy" %}

```groovy title="settings.gradle"
dependencyResolutionManagement {
    repositoriesMode = RepositoriesMode.PREFER_SETTINGS
    repositories {
        google()
        mavenCentral()

        // Add the new repositories starting on the next line...
        maven {
            url = uri("some/path/flutter_module/build/host/outputs/repo")
            // This is relative to the location of the build.gradle file
            // if using a relative path.
        }

        maven {
            url = uri("https://storage.googleapis.com/download.flutter.io")
        }
        // ...to before this line  
    }
}
```

{% endtab %}
{% endtabs %}

<br>

### Kotlin DSL based Android Project

### 基于 Kotlin DSL 的 Android 项目

After an `aar` build of a Kotlin DSL-based Android project,
follow these steps to add the flutter_module.

在基于 Kotlin DSL Android 项目的 `aar` 构建完成后，
请按照以下步骤添加 flutter_module。

Include the flutter module as a dependency in 
the Android project's `app/build.gradle` file.

在 Android 项目的 `app/build.gradle` 文件中
将 flutter module 列为依赖项。

```kotlin title="MyApp/app/build.gradle.kts"
android {
    buildTypes {
        release {
          ...
        }
        debug {
          ...
        }
        create("profile") {
            initWith(getByName("debug"))
        }
}

dependencies {
  // ...
  debugImplementation("com.example.flutter_module:flutter_debug:1.0")
  releaseImplementation("com.example.flutter_module:flutter_release:1.0")
  add("profileImplementation", "com.example.flutter_module:flutter_profile:1.0")
}
```

The `profileImplementation` ID is a custom `configuration` to be
implemented in the `app/build.gradle` file of a host project.

`profileImplementation` ID 是在宿主项目的 `app/build.gradle` 文件中
实施的自定义 `configuration`。

```kotlin title="host-project/app/build.gradle.kts"
configurations {
    getByName("profileImplementation") {
    }
}
```

```kotlin title="MyApp/settings.gradle.kts"
include(":app")

dependencyResolutionManagement {
    repositories {
        maven(url = "https://storage.googleapis.com/download.flutter.io")
        maven(url = "some/path/flutter_module_project/build/host/outputs/repo")
    }
}
```

:::important

If you're located in China, use a mirror site rather than the
`storage.googleapis.com` domain. To learn more about mirror sites,
check out [Using Flutter in China][] page.

在国内，需要使用镜像站点代替 `storage.googleapis.com`。 
有关镜像的详细信息，参见 [在中国网络环境下使用 Flutter][Using Flutter in China] 页面。

:::

:::tip

You can also build an AAR for your Flutter module in Android Studio using
the `Build > Flutter > Build AAR` menu.

你也可以直接点击 Android Studio 菜单中的 `Build > Flutter > Build AAR` 
为 Flutter 模块构建 AAR。

{% render docs/app-figure.md, image:"development/add-to-app/android/project-setup/ide-build-aar.png" %}

:::

{% endtab %}
{% tab "模块源码集成" %}

### Depend on the module's source code {:.no_toc}

### 依赖模块的源码 {:.no_toc}

This option enables a one-step build for both your
Android project and Flutter project. This option is
convenient when you work on both parts simultaneously
and rapidly iterate, but your team must install the
Flutter SDK to build the host app.

该方式可以使你的 Android 项目和 Flutter 项目能够同步一键式构建。
当你需要同时在这两个项目中进行快速迭代时，这种方案非常方便，
但是此时，你的团队必须安装 Flutter SDK 才能构建宿主应用程序。

:::tip

By default, the host app provides the `:app` Gradle project.
To change the name of this project, set
`flutter.hostAppProjectName` in the Flutter module's
`gradle.properties` file.
Include this project in the host app's `settings.gradle` file.

默认情况下，宿主应用程序已经提供了 Gradle 项目 `:app`。 
要更改该项目的名称，可以在 Flutter 模块的
`gradle.properties` 文件中
设置 `flutter.hostAppProjectName`。
将该项目添加到下面提到的宿主应用的
`settings.gradle` 文件中。

:::

#### Updating `settings.gradle`

#### 更新 `settings.gradle`

Include the Flutter module as a subproject in the host app's
`settings.gradle`. This example assumes `flutter_module` and `MyApp`
exist in the same directory

将 Flutter 模块作为子项目添加到宿主应用的 `settings.gradle` 中。
本示例假定 `flutter_module` 和 `MyApp` 在同一目录中：

If you are using Kotlin, apply the following changes:

如果你使用 Kotlin，请进行以下更改：

```kotlin title="MyApp/settings.gradle.kts"
// Include the host app project. Assumed existing content.
include(":app")            
// Replace "flutter_module" with whatever package_name you supplied when you ran:
// `$ flutter create -t module [package_name]
val filePath = settingsDir.parentFile.toString() + "/flutter_module/.android/include_flutter.groovy"
apply(from = File(filePath))
```

:::warning

The ability to invoke `include_flutter.groovy` from Kotlin code
requires Flutter 3.27.
To determine your current Flutter version,
run `flutter --version`. If it isn't at least version 3.27,
consider changing to either the `main` or `beta` channels.

从 Kotlin 代码中调用 `include_flutter.groovy` 的功能需要 Flutter 3.27。
你如果需要判断当前的 Flutter 版本，请运行 `flutter --version`。
如果低于 3.27 版本，请考虑更换到 `main` 或 `beta` 渠道版本。

:::

If you are using Groovy, apply the following changes:

如果你使用 Groovy，请进行以下更改：

```groovy title="MyApp/settings.gradle"
// Include the host app project.
include(":app")                                   // assumed existing content
setBinding(new Binding([gradle: this]))           // new
def filePath = settingsDir.parentFile.toString() + "/flutter_module/.android/include_flutter.groovy" // new
apply from: filePath                              // new
```

The binding and script evaluation allows the Flutter
module to `include` itself (as `:flutter`) and any
Flutter plugins used by the module (such as `:package_info` and `:video_player`)
in the evaluation context of your `settings.gradle`.

binding 和 evaluation 脚本可以使 Flutter 模块将其自身（如 `:flutter`）和
该模块使用的所有 Flutter 插件（如 `:package_info`，`:video_player`）
都包含在 `settings.gradle` 的评估的上下文中。

#### Updating `app/build.gradle`

#### 更新 `app/build.gradle`

Introduce an `implementation` dependency on the Flutter
module from your app:

在你的应用中引入对 Flutter 模块的 `implementation` 依赖：

```groovy title="MyApp/app/build.gradle"
dependencies {
    implementation(project(":flutter"))
}
```

:::note

This code is identical between Groovy and Kotlin.

Groovy 和 Kotlin 的代码完全相同。

:::

{% endtab %}
{% endtabs %}

Your app now includes the Flutter module as a dependency.

此时，你的应用程序已将 Flutter 模块添加为依赖项，

Continue to the [Adding a Flutter screen to an Android app][] guide.

接下来你可以按照
[向 Android 应用中添加 Flutter 页面][Adding a Flutter screen to an Android app]
继续进一步的集成。

[`abiFilters`]: {{site.android-dev}}/reference/tools/gradle-api/4.2/com/android/build/api/dsl/Ndk#abiFilters:kotlin.collections.MutableSet
[Adding a Flutter screen to an Android app]: /add-to-app/android/add-flutter-screen
[Flutter plugin]: https://plugins.jetbrains.com/plugin/9212-flutter
[local repository]: https://docs.gradle.org/current/userguide/declaring_repositories.html#sub:maven_local
[only supports]: /resources/faq#what-devices-and-os-versions-does-flutter-run-on
[Using Flutter in China]: /community/china
