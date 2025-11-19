---
# title: Build and release an Android app
title: 构建和发布为 Android 应用
# description: How to prepare for and release an Android app to the Play store.
description: 如何打包把 App 发布到 Play 商店。
shortTitle: Android
tags: 发布, Android
keywords: 上传Google商店,发布Flutter应用
---

To test an app, you can use `flutter run` at the command line,
or the **Run** and **Debug** options in your IDE.

在一般的开发过程中，我们可以使用 `flutter run` 命令，
或者 IntelliJ 工具栏中的 **Run** 和 **Debug** 来测试 app。

When you're ready to prepare a _release_ version of your app,
for example to [publish to the Google Play Store][play],
this page can help. Before publishing,
you might want to put some finishing touches on your app.
This guide explains how to perform the following tasks:

当想要发布 app 时，比如 [发布到 Google Play Store][play]，
可以按照以下步骤来准备 Android 平台的 **发布** 版本。
本指南将介绍如何执行以下步骤的内容：

* [Add a launcher icon](#add-a-launcher-icon)

  [添加启动图标](#add-a-launcher-icon)

* [Enable Material Components](#enable-material-components)

  [启用 Material 组件](#enable-material-components)

* [Sign the app](#sign-the-app)

  [为 app 签名](#sign-the-app)

* [Shrink your code with R8](#shrink-your-code-with-r8)

  [使用 R8 缩小你的代码体积](#shrink-your-code-with-r8)

* [Enable multidex support](#enable-multidex-support)

  [启用 MultiDex](#enable-multidex-support)

* [Review the app manifest](#review-the-app-manifest)

  [检查 app manifest 文件](#review-the-app-manifest)

* [Review the build configuration](#review-the-gradle-build-configuration)

  [检查构建配置](#review-the-gradle-build-configuration)

* [Build the app for release](#build-the-app-for-release)

  [为发布构建应用](#build-the-app-for-release)

* [Publish to the Google Play Store](#publish-to-the-google-play-store)

  [发布到 Google Play Store](#publish-to-the-google-play-store)

* [Update the app's version number](#update-the-apps-version-number)

  [更新应用版本号](#update-the-apps-version-number)

* [Android release FAQ](#android-release-faq)

  [Android 发布常见问题](#android-release-faq)

:::note

Throughout this page, `[project]` refers to
the directory that your application is in. While following
these instructions, substitute `[project]` with
your app's directory.

在整个页面中，`[project]` 是指
你的应用所处的目录。同时关注
这些说明，替换 `[project]` 为
你的应用的目录。

:::

[play]: {{site.android-dev}}/distribute

## Add a launcher icon

## 添加启动图标

When a new Flutter app is created, it has a default launcher icon.
To customize this icon, you might want to check out the
[flutter_launcher_icons][] package.

当我们创建一个新的 Flutter app 的时候，它会有一个默认的启动图标。
要自定义这个图标，可以参考使用 [flutter_launcher_icons][] 这个 package。

Alternatively, you can do it manually using the following steps:

或者，如果我们想手动操作，可以参考以下方法：

1. Review the
   [Material Design product icons][launchericons] guidelines for icon design.

   查看 [Material Design Product Icons][launchericons] 指南中图标设计部分。

1. In the `[project]/android/app/src/main/res/` directory,
   place your icon files in folders named using
   [configuration qualifiers][].
   The default `mipmap-` folders demonstrate the correct
   naming convention.

   在 `<app dir>/android/app/src/main/res/` 目录下，
   把我们的图标文件放在以 [配置限定符][configuration qualifiers] 命名的文件夹中。
   类似默认的 `mipmap-` 文件夹这样的命名方式。

1. In `AndroidManifest.xml`, update the
   [`application`][applicationtag] tag's `android:icon`
   attribute to reference icons from the previous
   step (for example,
   `<application android:icon="@mipmap/ic_launcher" ...`).

   在 `AndroidManifest.xml` 中，更新 [`application`][applicationtag] 标签中的
   `android:icon` 属性来引用上一步骤中我们自己的图标文件
   (例如，`<application android:icon="@mipmap/ic_launcher" ...`)。

1. To verify that the icon has been replaced,
   run your app and inspect the app icon in the Launcher.

   用 `flutter run` 运行 app，检查启动程序中的 app 图标
   是否已经替换成我们自己的图标文件。

[flutter_launcher_icons]: {{site.pub}}/packages/flutter_launcher_icons
[launchericons]: {{site.material}}/styles/icons
[configuration qualifiers]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element

## Enable Material Components

## 启用 Material 组件

If your app uses [platform views][], you might want to enable
Material Components by following the steps described in the
[Getting Started guide for Android][].

如果你的应用使用了 [平台视图 (Platform View)][Platform views]，
你可能要通过 [Android 平台的入门指南文档][Getting Started guide for Android]
中的步骤使用 Material 组件：

For example:

举个例子：

1. Add the dependency on Android's Material in `<my-app>/android/app/build.gradle.kts`:

   在 `<my-app>/android/app/build.gradle.kts` 文件中添加
   Android Material 组件依赖：

   ```groovy
   dependencies {
       // ...
       implementation("com.google.android.material:material:<version>")
       // ...
   }
   ```

   To find out the latest version, visit [Google Maven][maven-material].

   查看最新的版本，请访问 [Google Maven 仓库][maven-material]。

1. Set the light theme in `<my-app>/android/app/src/main/res/values/styles.xml`:

   在 `<my-app>/android/app/src/main/res/values/styles.xml` 文件中设置亮色主题：

   ```xml diff
   - <style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
   + <style name="NormalTheme" parent="Theme.MaterialComponents.Light.NoActionBar">
   ```

1. Set the dark theme in `<my-app>/android/app/src/main/res/values-night/styles.xml`:

   在 `<my-app>/android/app/src/main/res/values-night/styles.xml` 文件中设置深色主题：

   ```xml diff
   - <style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
   + <style name="NormalTheme" parent="Theme.MaterialComponents.DayNight.NoActionBar">
   ```

[platform views]: /platform-integration/android/platform-views
[Getting Started guide for Android]: {{site.material}}/develop/android/mdc-android
[maven-material]: https://maven.google.com/web/index.html#com.google.android.material:material

<a id="signing-the-app"></a>
## Sign the app

## 为 app 签名

To publish on the Play Store, you need to
sign your app with a digital certificate.

为了将你的应用发布到 Play 商店，
你需要给你的应用进行数字签名。

Android uses two signing keys: _upload_ and _app signing_.

Android 应用需要两个签名：**上传签名** 和 **应用签名**。

* Developers upload an `.aab` or `.apk` file signed with
  an _upload key_ to the Play Store.

  开发者上传到 Play Store 的 `.aab` 或 `.apk` 需要有上传签名。

* The end-users download the `.apk` file signed with an _app signing key_.

  终端用户下载的 `.apk` 文件需要有 **应用签名**。

To create your app signing key, use Play App Signing
as described in the [official Play Store documentation][].

请参考 [Play Store 的官方文档][official Play Store documentation]
来创建你的应用签名。

To sign your app, use the following instructions.

参考以下步骤对你的应用进行签名。

[official Play Store documentation]: https://support.google.com/googleplay/android-developer/answer/7384423?hl=en

### Create an upload keystore

### 创建一个用于上传的密钥库

If you have an existing keystore, skip to the next step.
If not, create one using one of the following methods:

如果你已经有一个密钥库了，可以直接跳到下一步，
如果还没有，需要参考下面的方式创建一个：

1. Follow the [Android Studio key generation steps][].

   参考文档：[在 Android Studio 上为你的应用签名][Android Studio key generation steps]。

1. Run the following command at the command line:

   在命令行窗口运行如下的命令：

   On macOS or Linux, use the following command:

   在 macOS 或者 Linux 系统上，执行下面的代码：

   ```console
   keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \
           -keysize 2048 -validity 10000 -alias upload
   ```

   On Windows, use the following command in PowerShell:

   在 Windows 系统上，在 PoweShell 内执行以下代码：

   ```ps
   keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks `
           -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 `
           -alias upload
   ```

   This command stores the `upload-keystore.jks` file in your home
   directory. If you want to store it elsewhere, change
   the argument you pass to the `-keystore` parameter.
   **However, keep the `keystore` file private;
   don't check it into public source control!**

   该命令将会把 `upload-keystore.jks` 文件储存在你的主文件夹中。
   如果你想要储存在其他地方，请通过指定 `-keystore` 传入参数。
   **注意，请保证这个文件的私有性，不要将它提交到公共的代码管理空间**。

   :::note

   * The `keytool` command might not be in your path&mdash;it's
     part of Java, which is installed as part of Android Studio.
     For the concrete path, run `flutter doctor -v` and
     locate the path printed after 'Java binary at:'.
     Then use that fully qualified path
     replacing `java` (at the end) with `keytool`.
     If your path includes space-separated names, such as `Program Files`,
     use platform-appropriate notation for the names.
     For example, on macOS and Linux use `Program\ Files`, and
     on Windows use `"Program Files"`.

     `keytool` 可能不在我们的系统路径中。
     它是 Java 的一部分，在安装 Android Studio 的时候会被一起安装。
     运行 `flutter doctor -v`，'Java binary at:' 之后打印出来的就是它的路径，
     然后用 `java` 来替换以上命令中的 `keytool`，并加上 `keytool` 的完整路径即可。
     如果文件路径包含空格，类似 `Program Files` 这样的，请使用平台允许的命名规则。
     例如，在 Mac/Linux 上使用 `Program\ Files`，而在 Windows 上可以使用
     `"Program Files"`。

   * The `-storetype JKS` tag is only required for Java 9
     or newer. As of the Java 9 release,
     the keystore type defaults to PKS12.

     只有 Java 9 或更高版本才需要 `-storetype JKS` 标签。
     从 Java 9 版本开始，keystore 类型默认为 PKS12。

   :::

[Android Studio key generation steps]: {{site.android-dev}}/studio/publish/app-signing#generate-key

### Reference the keystore from the app

### 从 app 中引用密钥库

Create a file named `[project]/android/key.properties`
that contains a reference to your keystore.
Don't include the angle brackets (`< >`).
They indicate that the text serves as a placeholder for your values.

创建一个名为 `[project]/android/key.properties` 的文件，
它包含了密钥库位置的定义。
在替换内容时请去除 `< >` 括号：

```properties
storePassword=<password-from-previous-step>
keyPassword=<password-from-previous-step>
keyAlias=upload
storeFile=<keystore-file-location>
```

The `storeFile` might be located at
`/Users/<user name>/upload-keystore.jks` on macOS
or `C:\\Users\\<user name>\\upload-keystore.jks` on Windows.

`storeFile` 密钥路径在 macOS 上类似于 `/Users/<user name>/upload-keystore.jks`，
在 Windows 上类似于 `C:\\Users\\<user name>\\upload-keystore.jks`。

:::note

The Windows path to `keystore.jks` must be specified with double backslashes: `\\`.

`keystore.jks` 的 Windows 路径必须使用双反斜杠：`\\`。

:::

:::warning

Keep the `key.properties` file private;
don't check it into public source control.

请确保 `key.properties` 文件的私有性，
不要将它提交到公共的代码管理空间。

:::

### Configure signing in Gradle

### 在 Gradle 中配置签名

When building your app in release mode, configure Gradle to use your upload key.
To configure Gradle, edit the `<project>/android/app/build.gradle.kts` file.

在 release 模式下构建你的应用时，
可以通过配置 Gradle 来使用你的上传密钥。
请编辑 `<project>/android/app/build.gradle` 文件来配置 gradle。

1. Define and load the keystore properties file before the `android`
   property block.

   在 `android` 属性块之前定义并加载 keystore properties 文件：


1. Set the `keystoreProperties` object to load the `key.properties` file.

   设置 `keystoreProperties` 对象，来加载 `key.properties` 文件。

   ```kotlin diff title="[project]/android/app/build.gradle.kts"
   + import java.util.Properties
   + import java.io.FileInputStream
   +
     plugins {
        ...
     }
   +
   + val keystoreProperties = Properties()
   + val keystorePropertiesFile = rootProject.file("key.properties")
   + if (keystorePropertiesFile.exists()) {
   +     keystoreProperties.load(FileInputStream(keystorePropertiesFile))
   + }
   +
     android {
        ...
     }
   ```

1. Add the signing configuration before the `buildTypes` property block
   inside the `android` property block.

   在 `android` 属性块内的 `buildTypes` 属性块前面添加签名配置。

   ```kotlin diff title="[project]/android/app/build.gradle.kts"
     android {
         // ...

   +     signingConfigs {
   +         create("release") {
   +             keyAlias = keystoreProperties["keyAlias"] as String
   +             keyPassword = keystoreProperties["keyPassword"] as String
   +             storeFile = keystoreProperties["storeFile"]?.let { file(it) }
   +             storePassword = keystoreProperties["storePassword"] as String
   +         }
   +     }
         buildTypes {
             release {
                 // TODO: Add your own signing config for the release build.
                 // Signing with the debug keys for now,
                 // so `flutter run --release` works.
   -             signingConfig = signingConfigs.getByName("debug")
   +             signingConfig = signingConfigs.getByName("release")
             }
         }
     ...
     }
   ```

Flutter now signs all release builds.

现在，Flutter 会在所有 release 版本上签名。

:::note

You might need to run `flutter clean` after changing the Gradle file.
This prevents cached builds from affecting the signing process.

当你更改 Gradle 文件后，也许需要运行一下 `flutter clean`。
这将防止缓存的版本影响签名过程。

:::

To learn more about signing your app, check out
[Sign your app][] on the Android developer docs.

有关应用签名的更多信息，请查看 Android 开发者文档的
[为你的应用设置签名][Sign your app]。

[Sign your app]: {{site.android-dev}}/studio/publish/app-signing.html#generate-key

## Shrink your code with R8

## 使用 R8 压缩你的代码

[R8][] is the new code shrinker from Google.
It's enabled by default when you build a release APK or AAB.
To disable R8, pass the `--no-shrink` flag to
`flutter build apk` or `flutter build appbundle`.

[R8][] 是谷歌推出的最新代码压缩器。
当你打包 release 版本的 APK 或者 AAB 时会默认开启。
如果要关闭 R8，请运行 `flutter build apk` 或
在运行 `flutter build appbundle` 时加上 `--no-shrink` 参数。

:::note

Obfuscation and minification can considerably extend
the compile time of an Android application.

混淆和压缩会显著增加 Android 应用的编译时间。

The `--[no-]shrink` flag has no effect.
Code shrinking is always enabled in release builds.
To learn more, check out [Shrink, obfuscate, and optimize your app][].

`--[no-]shrink` 标志不起作用。
代码缩减是始终在 release 构建中启用的。
要了解更多信息，请参阅 [缩减、混淆处理和优化应用][Shrink, obfuscate, and optimize your app]。

:::

[R8]: {{site.android-dev}}/studio/build/shrink-code
[Shrink, obfuscate, and optimize your app]: {{site.android-dev}}/studio/build/shrink-code

## Enable multidex support

## 启用 multidex 支持

When writing large apps or making use of large plugins,
you might encounter Android's dex limit of 64k methods
when targeting a minimum API of 20 or below.
This might also be encountered when running debug versions of your app
using `flutter run` that doesn't have shrinking enabled.

当你在编写较大的应用或使用体量较大的插件时，
你可能会在最低的 API 目标版本低于 20 时，
遇到 Android 的 dex 的 64k 方法数限制问题。
当 `flutter run` 以调试模式运行应用时，
由于缩减机制没有运行，该问题也有可能发生。

Flutter tool supports easily enabling multidex.
The simplest way is to opt into multidex support when prompted.
The tool detects multidex build errors and
asks before making changes to your Android project.
Opting in allows Flutter to automatically depend on
`androidx.multidex:multidex` and use a generated
`FlutterMultiDexApplication` as the project's application.

Flutter 工具支持以便捷的方式启用 multidex 支持。
当工具提示你需要支持时，跟随工具的指示进行调整，是最快的方式。
Flutter 工具会检测 multidex 的构建错误，并提示你是否要更改 Android 项目。
在同意的情况下，项目会自动依赖 `androidx.multidex:multidex`，
并且让项目的 `Application` 继承于 `FlutterMultiDexApplication`。

When you try to build and run your app with the **Run** and **Debug**
options in your IDE, your build might fail with the following message:

当你尝试在 IDE 中使用 **Run** 和 **Debug** 选项构建和运行应用时，
你的构建可能会失败，并显示以下信息：

<img src='/assets/images/docs/deployment/android/ide-build-failure-multidex.png' width="100%" alt='Build failure because Multidex support is required'>

To enable multidex from the command line,
run `flutter run --debug` and select an Android-powered device:

如果要通过命令行启用 multidex，
请运行 `flutter run --debug` 并选择一个 Android 设备：

<img src='/assets/images/docs/deployment/android/cli-select-device.png' width="100%" alt='Selecting an Android device with the flutter CLI.'>

When prompted, enter `y`.
The Flutter tool enables multidex support and retries the build:

当出现提示时，请输入 `y`。
Flutter 工具会启用 multidex 的支持并重新尝试构建：

<img src='/assets/images/docs/deployment/android/cli-multidex-added-build.png' width="100%" alt='The output of a successful build after adding multidex.'>

:::note

Multidex support is natively included when targeting
Android SDK 21 or later.

在设定了目标 Android SDK 版本为 21 和以上时，其已经包含了 Multidex 的原生支持。

:::

You might also choose to manually support multidex by following Android's guides
and modifying your project's Android directory configuration.
A [multidex keep file][multidex-keep] must be specified to include:

你也可以根据 Android 的指南，手动配置你的 Android 项目以支持 multidex。
请务必指定 [multidex keep 文件][multidex-keep] 以包含以下内容：

```plaintext
io/flutter/embedding/engine/loader/FlutterLoader.class
io/flutter/util/PathUtils.class
```

Also, include any other classes used in app startup.
For more detailed guidance on adding multidex support manually,
check out the official [Android documentation][multidex-docs].

同时也要包含所有在应用启动时加载的其他类。
参考 [Android 文档的 multidex][multidex-docs]
了解更详细的手动适配指南。

[multidex-keep]: {{site.android-dev}}/studio/build/multidex#keep
[multidex-docs]: {{site.android-dev}}/studio/build/multidex

## Review the app manifest

## 检查 app manifest 文件

Review the default [App Manifest][manifest] file.

```xml title="[project]/android/app/src/main/AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        [!android:label="[project]"!]
        ...
    </application>
    ...
    [!<uses-permission android:name="android.permission.INTERNET"/>!]
</manifest>
```

Verify the following values:

| Tag                                | Attribute | Value                                                                                                   |
|------------------------------------|-----------|-----------------------------------------------------------------------------------------------------------|
| [`application`][applicationtag]    | Edit the `android:label` in the [`application`][applicationtag] tag to reflect the final name of the app. |
| [`uses-permission`][permissiontag] | Add the `android.permission.INTERNET` [permission][permissiontag] value to the `android:name` attribute if your app needs Internet access. The standard template doesn't include this tag but allows Internet access during development to enable communication between Flutter tools and a running app. |

{:.table .table-striped}

[manifest]: {{site.android-dev}}/guide/topics/manifest/manifest-intro
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element
[permissiontag]: {{site.android-dev}}/guide/topics/manifest/uses-permission-element

## Review or change the Gradle build configuration {:#review-the-gradle-build-configuration}

To verify the Android build configuration,
review the `android` block in the default
[Gradle build script][gradlebuild].
The default Gradle build script is found at `[project]/android/app/build.gradle.kts`.
You can change the values of any of these properties.

```kotlin title="[project]/android/app/build.gradle.kts"
android {
    namespace = "com.example.[project]"
    // Any value starting with "flutter." gets its value from
    // the Flutter Gradle plugin.
    // To change from these defaults, make your changes in this file.
    [!compileSdk = flutter.compileSdkVersion!]
    ndkVersion = flutter.ndkVersion

    ...

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        [!applicationId = "com.example.[project]"!]
        // You can update the following values to match your application needs.
        [!minSdk = flutter.minSdkVersion!]
        [!targetSdk = flutter.targetSdkVersion!]
        // These two properties use values defined elsewhere in this file.
        // You can set these values in the property declaration
        // or use a variable.
        [!versionCode = flutterVersionCode.toInteger()!]
        [!versionName = flutterVersionName!]
    }

    buildTypes {
        ...
    }
}
```

[gradlebuild]: {{site.android-dev}}/studio/build/#module-level

### Properties to adjust in build.gradle.kts

| Property             | Purpose                                                                                                                                                                                                                                                     | Default Value              |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `compileSdk`         | The Android API level against which your app is compiled. This should be the highest version available. If you set this property to `31`, you run your app on a device running API `30` or earlier as long as your app makes uses no APIs specific to `31`. | |
| `defaultConfig`      |  |  |
| `.applicationId`     | The final, unique [application ID][] that identifies your app.                                                                                                                                                                                              |                            |
| `.minSdk`            | The [minimum Android API level][] for which you designed your app to run.                                                                                                                                                                                   | `flutter.minSdkVersion`    |
| `.targetSdk`         | The Android API level against which you tested your app to run. Your app should run on all Android API levels up to this one.                                                                                                                               | `flutter.targetSdkVersion` |
| `.versionCode`       | A positive integer that sets an [internal version number][]. This number only determines which version is more recent than another. Greater numbers indicate more recent versions. App users never see this value.                                          |                            |
| `.versionName`       | A string that your app displays as its version number. Set this property as a raw string or as a reference to a string resource.                                                                                                                            |                            |
| `.buildToolsVersion` | The Gradle plugin specifies the default version of the Android build tools that your project uses. To specify a different version of the build tools, change this value.                                                                                    |                            |

{:.table .table-striped}

To learn more about Gradle, check out the module-level build
section in the [Gradle build file][gradlebuild].

更多信息可以参考 [Gradle 构建文件][gradlebuild]
文档中模块级构建的部分。

:::note

If you use a recent version of the Android SDK,
you might get deprecation warnings about
`compileSdkVersion`, `minSdkVersion`, or `targetSdkVersion`.
You can rename these properties to
`compileSdk`, `minSdk`, and `targetSdk` respectively.

如果你使用最新版本的 Android SDK，
可能会收到关于 `compileSdkVersion`、`minSdkVersion` 和 `targetSdkVersion` 的弃用警告。
你可以将它们分别重命名为 `compileSdk`、`minSdk` 和 `targetSdk`。

:::

[application ID]: {{site.android-dev}}/studio/build/application-id
[minimum Android API level]: {{site.android-dev}}/studio/publish/versioning#minsdk
[internal version number]: {{site.android-dev}}/studio/publish/versioning
[gradlebuild]: {{site.android-dev}}/studio/build/#module-level

## Build the app for release

## 构建生产版本应用

You have two possible release formats when
publishing to the Play Store.

当要发布到 Play Store 时，你有两种发布方式的选择：

* App bundle (preferred)

  App bundle（推荐）

* APK

:::note

The Google Play Store prefers the app bundle format.
To learn more, check out [About Android App Bundles][bundle].

Google Play 更推荐使用 app bundle 格式的应用，
更多信息可以参考 [Android App Bundle][bundle]。

:::

[bundle]: {{site.android-dev}}/guide/app-bundle

### Build an app bundle

### 构建一个 app bundle

This section describes how to build a release app bundle.
If you completed the signing steps,
the app bundle will be signed.
At this point, you might consider [obfuscating your Dart code][]
to make it more difficult to reverse engineer.
Obfuscating your code involves adding flags to your build command and
maintaining additional files to de-obfuscate stack traces.

这个部分描述了如何构建一个发布的 app bundle。
如果在前面的部分已经完成了签名步骤，发布的 bundle 会被签名。
这时你也许想要 [混淆你的 Dart 代码][obfuscating your Dart code] 以加大反编译难度。
混淆你的代码需要在 build 的时候添加一些标志，并维护其他文件以消除反编译的堆栈跟踪。

From the command line:

使用如下命令：

1. Enter `cd [project]`<br>

   运行 `cd [project]`。

1. Run `flutter build appbundle`<br>
   (Running `flutter build` defaults to a release build.)

   运行 `flutter build appbundle`。
   (运行 `flutter build` 默认构建一个发布版本。)

The release bundle for your app is created at
`[project]/build/app/outputs/bundle/release/app.aab`.

你的应用的 release bundle 会被创建到
`<app dir>/build/app/outputs/bundle/release/app.aab`.

By default, the app bundle contains your Dart code and the Flutter
runtime compiled for [armeabi-v7a][] (ARM 32-bit), [arm64-v8a][]
(ARM 64-bit), and [x86-64][] (x86 64-bit).

此 app bundle 会默认地包含为
[armeabi-v7a][] (ARM 32-bit)、[arm64-v8a][] (ARM 64-bit)
以及 [x86-64][] (x86 64-bit) 编译的 Dart 和 Fluter 运行时代码。

[obfuscating your Dart code]: /deployment/obfuscate
[arm64-v8a]: {{site.android-dev}}/ndk/guides/abis#arm64-v8a
[armeabi-v7a]: {{site.android-dev}}/ndk/guides/abis#v7a
[x86-64]: {{site.android-dev}}/ndk/guides/abis#86-64

### Test the app bundle

### 测试 app bundle

An app bundle can be tested in multiple ways.
This section describes two.

一个 app bundle 可以用多种方法测试，这里介绍两种。

#### Offline using the bundle tool

#### 离线使用 bundle tool

1. If you haven't done so already, download `bundletool` from
   its [GitHub repository][bundletool-github].

   如果你还没准备好，可以从 [GitHub 仓库][bundletool-github] 下载 `bundletool`。

2. [Generate a set of APKs][apk-set] from your app bundle.

   从你的 app bundle [生成 APKs][apk-set]。

3. [Deploy the APKs][apk-deploy] to connected devices.

   [将这 APKs 部署到][apk-deploy] 已连接的设备。

[bundletool-github]: {{site.github}}/google/bundletool/releases/latest
[apk-set]: {{site.android-dev}}/studio/command-line/bundletool#generate_apks
[apk-deploy]: {{site.android-dev}}/studio/command-line/bundletool#deploy_with_bundletool

#### Online using Google Play

#### 在线使用 Google Play

1. Upload your bundle to Google Play to test it.
   You can use the internal test track,
   or the alpha or beta channels to test the bundle before
   releasing it in production.

   上传你的 bundle 到 Google Play 去测试它。
   或者在正式发布之前用 alpha 或 beta 频道去测试。

2. Follow the steps to [upload your bundle][upload-bundle]
   to the Play Store.

   按照步骤 [上传你的 bundle][upload-bundle] 到 Play Store。

[upload-bundle]: {{site.android-dev}}/studio/publish/upload-bundle

### Build an APK

### 构建一个 APK

Although app bundles are preferred over APKs,
there are stores that don't yet support app bundles.
In this case, build a release APK for
each target ABI (Application Binary Interface).

虽然 app bundle 比 APKs 更被推荐使用，
但是有一些 Store 目前还不支持 app bundle方式。
这种情况下，要为各种目标
ABI (Application Binary Interface) 分别构建发布的 APK 文件。

If you completed the signing steps, the APK will be signed.
At this point, you might consider [obfuscating your Dart code][]
to make it more difficult to reverse engineer.
Obfuscating your code involves adding flags to your build command.

如果你完成签名步骤，APK 就被签名了。
这时你也许想要 [混淆你的 Dart 代码][obfuscating your Dart code] 以加大反编译难度。
混淆你的代码需要在构建时添加一些参数。

From the command line:

使用如下命令：

1. Enter `cd [project]`.

   输入命令 `cd [project]`。

1. Run `flutter build apk --split-per-abi`.

   (The `flutter build` command defaults to `--release`.)

   运行 `flutter build apk --split-per-abi`<br>
   （`flutter build` 默认带有 `--release` 参数。）

This command results in three APK files:

这个命令会生成如下三个 APK 文件

* `[project]/build/app/outputs/apk/release/app-armeabi-v7a-release.apk`
* `[project]/build/app/outputs/apk/release/app-arm64-v8a-release.apk`
* `[project]/build/app/outputs/apk/release/app-x86_64-release.apk`

Removing the `--split-per-abi` flag results in a fat APK that contains
your code compiled for _all_ the target ABIs.
Such APKs are larger in size than their split counterparts,
causing the user to download native binaries that
aren't applicable to their device's architecture.

[obfuscating your Dart code]: /deployment/obfuscate

如果移除 `--split-per-abi` 将会生成一个包含 **所有** 目标 ABI 的 fat APK 文件。
这种 APK 文件将会在比单独构建的 APK 文件尺寸要大，
会导致用户下载一些不适用于其设备架构的二进制文件。

### Install an APK on a device

### 在设备上安装 APK 文件

Follow these steps to install the APK on a connected Android-powered device.

按照如下这些步骤，将前一步中构建出来的 APK 安装到 Android 设备上。

From the command line:

使用如下命令：

1. Connect your Android-powered device to your computer with a USB cable.

   用 USB 线将 Android 设备连接到电脑上。

1. Enter `cd [project]`.

   输入命令 `cd [project]`。

1. Run `flutter install`.

   运行 `flutter install`。

## Publish to the Google Play Store

## 发布到 Google Play Store

For detailed instructions on publishing your app to the Google Play Store,
check out the [Google Play launch][play] documentation.

要了解如何发布一个 app 到 Google Play Store，
可以参考 [Google Play 发布文档][play]。

## Update the app's version number

## 更新应用版本号

The default version number of the app is `1.0.0`.
To update it, navigate to the `pubspec.yaml` file
and update the following line:

每个应用默认的初始版本号是 `1.0.0`。若要更新它，
请转到 `pubspec.yaml` 文件并更新以下内容：

```yaml
version: 1.0.0+1
```

The version number is three numbers separated by dots,
such as `1.0.0` in the preceding example,
followed by an optional build number,
such as `1` in the preceding example, separated by a `+`.

版本号由三个点分隔的数字组成，例如上面样例中的 `1.0.0`。然后是可选的
构建号，例如上面样例中的 `1`，以 `+` 分隔。

Both the version and the build number can be overridden in
Flutter's build by specifying `--build-name` and `--build-number`, respectively.

版本号与构建号都可以在 Flutter 打包时分别使用
`--build-name` 和 `--build-number` 重新指定。

In Android, `build-name` is used as `versionName` while
`build-number` used as `versionCode`. For more information,
check out [Version your app][] in the Android documentation.

在 Android 中，`build-number` 被用作 `versionCode`，
`build-name` 将作为 `versionName` 使用。
更多信息请参考 Android 文档中的 [为你的应用添加版本][Version your app]。

When you rebuild the app for Android, any updates in
the version number from the pubspec file will
update the `versionName` and `versionCode`in the `local.properties` file.

当重新构建 Android 应用后，任何在 pubspec 文件所做的版本号更新，
都将会更新 `local.properties` 文件中的
`versionName` 和 `versionCode`。

[Version your app]: {{site.android-dev}}/studio/publish/versioning

## Android release FAQ

## Android 发布常见问题

Here are some commonly asked questions about deployment for
Android apps.

这里是一些关于 Android 应用发布的常见问题。

### When should I build app bundles versus APKs?

### 我应该什么时候构建 app bundles 而不是 APKs?

The Google Play Store recommends that you deploy app bundles
over APKs because they allow a more efficient delivery of the
application to your users. However, if you're distributing
your application by means other than the Play Store,
an APK might be your only option.

Google Play Store 相对于 APKs 更建议你发布 app bundles，
因为那样应用会更有效率地交付给你的用户。
但是，如果你想将应用发布到其他的应用商店，APK可能是唯一选项。

### What is a fat APK?

### 什么是 fat APK?

A [fat APK][] is a single APK that contains binaries for multiple
ABIs embedded within it. This has the benefit that the single APK
runs on multiple architectures and thus has wider compatibility,
but it has the drawback that its file size is much larger,
causing users to download and store more bytes when installing
your application. When building APKs instead of app bundles,
it is strongly recommended to build split APKs,
as described in [build an APK](#build-an-apk) using the
`--split-per-abi` flag.

一个 [fat APK][] 是一个包含了支持多个 ABI 架构的 APK 文件。
这样做的好处是单个 APK 可以运行在多个架构上，因此
具有更广泛的兼容性。但同时缺点就是文件体积会比较大，
导致用户在安装你的应用时会下载和储存更多的字节。
当构建 APK 而不是 app bundles 时强烈建议分开构建 APK，
如 [build an APK](#build-an-apk) 所描述的那样，
使用 `--split-per-abi` 指令。

[fat APK]: https://en.wikipedia.org/wiki/Fat_binary

### What are the supported target architectures?

### 哪些目标架构是被支持的?

When building your application in release mode,
Flutter apps can be compiled for [armeabi-v7a][] (ARM 32-bit),
[arm64-v8a][] (ARM 64-bit), and [x86-64][] (x86 64-bit).

当使用 release 模式构建你的应用时,
Flutter app 可以基于 [armeabi-v7a][] (ARM 32 位)、
[arm64-v8a][] (ARM 64 位) 以及 [x86-64][] (x86 64 位) 被编译。
Flutter 目前支持通过 ARM 模拟 x86 Android。

### How do I sign the app bundle created by `flutter build appbundle`?

### 如何为一个使用 `flutter build appbundle` 创建的 app bundle 签名？

Check out [Sign the app](#sign-the-app).

请查看 [为 app 签名](#sign-the-app)。

### How do I build a release from within Android Studio?

### 如何使用 Android Studio 构建一个发布？

In Android Studio, open the existing `android/`
folder under your app's folder. Then,
select **build.gradle (Module: app)** in the project panel:

在Android Studio中, 打开你的 app 文件夹下的 `android/`
文件夹. 然后在项目面板中选择 **build.gradle (Module: app)** :

<img src='/assets/images/docs/deployment/android/gradle-script-menu.png' alt='The Gradle build script menu in Android Studio.' style="max-height: 20rem">

Next, select the build variant. Click **Build > Select Build Variant**
in the main menu. Select any of the variants in the **Build Variants**
panel (debug is the default):

接下来，选择构建变体。在主菜单中点击 **Build > Select Build Variant**。
从 **Build Variants** 面板中选择任意一个变体（默认是 debug）。

<img src='/assets/images/docs/deployment/android/build-variant-menu.png' alt='The build variant menu in Android Studio with Release selected.' style="max-height: 20rem">

The resulting app bundle or APK files are located in
`build/app/outputs` within your app's folder.

生成的 app bundle 或 APK 文件会在你的 app 所在文件夹下的 `build/app/outputs` 文件夹下。

### How to tell if an apk uses Flutter?

Recommended: Using APK files
[apkanalyzer](https://developer.android.com/tools/apkanalyzer) files list --files-only <SOME-APK>
Then looking for a file in `/lib/<ARCH>/libflutter.so`

Example:
`apkanalyzer files list some-flutter-app.apk | grep flutter.so | wc -l`
returns any number greater than 0.

**Why this works**
Flutter depends on C++ code used by the Flutter engine. In Android,
this code is bundled with the Flutter framework and the developer's
Dart code as a native library called `libflutter.so`.
The Java/Android tooling renames the `flutter` library with the `lib` prefix
and handles library location across architectures.
This is how some reverse engineer an APK to identify it as a Flutter app.

#### Secondary Evaluation:
Run `apkanalyzer manifest print <SOME-APK>` and look for a `<meta-data>` tag with `android:name="flutterEmbedding"`.
The value can be `1` or `2`.

Example:
`apkanalyzer manifest print some-flutter-app.apk | grep flutterEmbedding -C 2`
returns the following style string.
```
<meta-data
   android:name="flutterEmbedding"
   android:value="2" />
```


**Why this works**
Flutter has had two different embedders, and this flag was read to determine which embedder was used.
Flutter 3.22 removed the ability of v1 embedder apps to build.
https://blog.flutter.dev/whats-new-in-flutter-3-22-fbde6c164fe3
This mechanism is not recommended because it is unclear how long the `flutterEmbedding` value will
continue to be included in all Flutter apps. Additionally, this will not work for all libraries written
in Flutter that are imported into Android apps as AAR dependencies.

#### Non-technical evaluation
*   Download [Flutter Shark](https://play.google.com/store/apps/details?id=com.fluttershark.fluttersharkapp&pli=1) on a device and let it scan local apps.
*   Visit the [Flutter Hunt](https://flutterhunt.com/) website.

{% comment %}

### Are there any special considerations with add-to-app?

### 在混合应用中是否有特殊考虑之处？

{% endcomment %}
