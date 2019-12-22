---
title: Build and release an Android app
title: 打包并发布 Android 应用
short-title: Android
description: How to prepare for and release an Android app to the Play store.
description: 如何打包把 App 发布到 Play 商店。
---

During a typical development cycle,
you test an app using `flutter run` at the command line,
or by using the **Run** and **Debug**
options in your IDE. By default,
Flutter builds a _debug_ version of your app.

在一般的开发过程中，我们可以使用 `flutter run` 命令，
或者 IntelliJ 工具栏中的 **Run** 和 **Debug** 来测试 app。
这时候，Flutter 默认会为我们构建 app 的**调试**版本。

When you're ready to prepare a _release_ version of your app,
for example to [publish to the Google Play Store][play],
this page can help. Before publishing,
you might want to put some finishing touches on your app.
This page covers the following topics:

当想要发布 app 时，比如 [发布到 Google Play Store][play]，
可以按照以下步骤来准备 Android 平台的 **发布** 版本。
本页面的内容包含如下主题：

* [Adding a launcher icon](#adding-a-launcher-icon)

  [添加启动图标](#adding-a-launcher-icon)
  
* [Signing the app](#signing-the-app)

  [创建一个密钥库](#signing-the-app)
  
* [Enabling Proguard](#enabling-proguard)

  [启用混淆器](#enabling-proguard)

* [Reviewing the app manifest](#reviewing-the-app-manifest)

  [检查 app manifest 文件](#reviewing-the-app-manifest)

* [Reviewing the build configuration](#reviewing-the-build-configuration)

  [检查构建配置](#reviewing-the-build-configuration)

* [Building the app for release](#building-the-app-for-release)

  [为发布构建应用程序](#building-the-app-for-release)

* [Publishing to the Google Play Store](#publishing-to-the-google-play-store)

  [发布到 Google Play Store](#publishing-to-the-google-play-store)

* [Updating the app's version number](#updating-the-apps-version-number)

  [更新应用版本号](#updating-the-apps-version-number)

* [Android release FAQ](#android-release-faq)

  [安卓发布常见问题](#android-release-faq)


## Adding a launcher icon

## 添加启动图标

When a new Flutter app is created, it has a default launcher icon.
To customize this icon, you might want to check out the
[flutter_launcher_icons][] package.

当我们创建一个新的 Flutter app 的时候，它会有一个默认的启动图标。
要自定义这个图标，可以参考
[Flutter Launcher Icons][]。

Alternatively, you can do it manually using the following steps:

或者，如果我们想手动操作，可以参考以下方法：

1. Review the [Material Design product
   icons][launchericons] guidelines for icon design.
   
   查看 [Material Design Product Icons][launchericons] 指南中图标设计部分。

1. In the `<app dir>/android/app/src/main/res/` directory,
   place your icon files in folders named using [configuration qualifiers][].
   The default `mipmap-` folders demonstrate the correct naming convention.
   
   在 `<app dir>/android/app/src/main/res/` 目录下，
   把我们的图标文件放在以 [配置限定符][] 命名的文件夹中。
   类似默认的 `mipmap-` 文件夹这样的命名方式。

1. In `AndroidManifest.xml`, update the [`application`][applicationtag]
   tag's `android:icon` attribute to reference icons from the previous
   step (for example,
   `<application android:icon="@mipmap/ic_launcher" ...`).
   
   在 `AndroidManifest.xml` 中，更新 [`application`][applicationtag] 标签中的 `android:icon`
   属性来引用上一步骤中我们自己的图标文件
   (例如，`<application android:icon="@mipmap/ic_launcher" ...`)。

1. To verify that the icon has been replaced,
   run your app and inspect the app icon in the Launcher.
   
   用 `flutter run` 运行 app，检查启动程序中的 app 图标是否已经替换成我们自己的图标文件。

## Signing the app

## 为 app 签名

To publish on the Play Store, you need to give your app a digital
signature. Use the following instructions to sign your app.

要想把 app 发布到 Play store，还需要给 app 一个数字签名。
我们可以采用以下步骤来为 app 签名：

### Create a keystore

### 创建一个密钥库

If you have an existing keystore, skip to the next step.
If not, create one by running the following at the command line:

如果我们已经有一个密钥库，可以跳到下一步。
如果没有，在命令行中运行以下的命令来创建一个：

On Mac/Linux, use the following command:

在 macOS 或者 Linux 系统上，执行下面的代码

```
```terminal
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

On Windows, use the following command:

```terminal
keytool -genkey -v -keystore c:/Users/USER_NAME/key.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

{{site.alert.note}}
  
  Keep the `keystore` file private;
  do not check it into public source control.
  
  保证这个文件的私有性，不要将它提交到公共的代码管理空间。

{{site.alert.end}}

{{site.alert.note}}

* The `keytool` command might not be in your path&mdash;it's
  part of Java, which is installed as part of
  Android Studio.  For the concrete path,
  run `flutter doctor -v` and locate the path printed after
  'Java binary at:'. Then use that fully qualified path
  replacing `java` (at the end) with `keytool`.
  If your path includes space-separated names,
  such as `Program Files`, place quotes around the
  space-separated names. For example: `/"Program Files"/`
  
  `keytool` 可能不在我们的系统路径中。
  它是 Java 的一部分，在安装 Android Studio 的时候会被一起安装。
  运行 `flutter doctor -v`，'Java binary at:' 之后打印出来的就是它的路径，
  然后用 `java` 来替换以上命令中的 `keytool`，并加上 `keytool` 的完整路径即可。  
  如果文件路径包含空格，类似 `Program Files` 这样的，你需要在路径上加入转义符：
  `/"Program Files"/`。
  
* The `-storetype JKS` tag is only required for Java 9
  or newer. As of the Java 9 release,
  the keystore type defaults to PKS12.

  只有 Java 9 或更高版本才需要 `-storetype JKS` 标签。
  从 Java 9 版本开始，keystore 类型默认为 PKS12。

{{site.alert.end}}

### Reference the keystore from the app

### 从 app 中引用密钥库

Create a file named `<app dir>/android/key.properties`
that contains a reference to your keystore:

创建一个名为 `<app dir>/android/key.properties` 的文件，它包含了密钥库位置的定义：

```
storePassword=<上一步骤中的密码>
keyPassword=<上一步骤中的密码>
keyAlias=key
storeFile=<密钥库的位置，e.g. /Users/<用户名>/key.jks>
```

{{site.alert.note}}

  Keep the `key.properties` file private;
  do not check it into public source control.
  
  （再次）请保证这个文件的私有性，不要将它提交到公共的代码管理空间。
  
{{site.alert.end}}

### Configure signing in gradle

### 在 gradle 中配置签名


Configure signing for your app by editing the
`<app dir>/android/app/build.gradle` file.

通过编辑 `<app dir>/android/app/build.gradle` 文件来为我们的 app 配置签名：


<ol markdown="1">

<li markdown="1">将如下内容：
```
   android {
```

   With the keystore information from your properties file:
   
   替换为我们的 properties 文件的密钥库信息：

```
   def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }

   android {
```
</li>

<li markdown="1"> 将如下内容：

```
   buildTypes {
       release {
           // TODO: Add your own signing config for the release build.
           // Signing with the debug keys for now,
           // so `flutter run --release` works.
           signingConfig signingConfigs.debug
       }
   }
```

   With the signing configuration info:
   
   替换为我们的配置内容：

```
   signingConfigs {
       release {
           keyAlias keystoreProperties['keyAlias']
           keyPassword keystoreProperties['keyPassword']
           storeFile file(keystoreProperties['storeFile'])
           storePassword keystoreProperties['storePassword']
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
       }
   }
```
</li>
</ol>

Release builds of your app will now be signed automatically.

现在我们 app 的发布版本就会被自动签名了。

## Enabling Proguard

## 启用混淆器

By default, Flutter does not obfuscate or minify the Android host.
If you intend to use third-party Java, Kotlin, or Android libraries,
you might want to reduce the size of the APK or protect that code from
reverse engineering.

默认情况下，Flutter 不会做混淆或者压缩 Android host 的工作。
如果 app 使用了第三方的 Java 或者 Android 库，我们会希望减小 APK 的大小，或者保护代码不被反编译出来。

For information on obfuscating Dart code, see [Obfuscating Dart
Code]({{site.github}}/flutter/flutter/wiki/Obfuscating-Dart-Code)
in the [Flutter wiki]({{site.github}}/flutter/flutter/wiki).

要了解混淆 Dart 代码的相关信息，可以参考 [Flutter wiki]({{site.github}}/flutter/flutter/wiki)
上的 [Obfuscating Dart Code]({{site.github}}/flutter/flutter/wiki/Obfuscating-Dart-Code)。

### Step 1 - Configure Proguard

### 步骤　1 - 配置 Proguard

Create a `/android/app/proguard-rules.pro` file and
add the rules listed below.

创建 `/android/app/proguard-rules.pro` 文件并添加下面的规则：

```
## Flutter wrapper
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.**  { *; }
-keep class io.flutter.plugins.**  { *; }
-dontwarn io.flutter.embedding.**
```

This configuration only protects Flutter engine libraries.
Any additional libraries (for example, Firebase) require adding
their own rules.

以上这样的配置只是对 Flutter 引擎库做保护。
如果想要保护其他的库（例如，Firebase），需要为它们添加自己的规则。


### Step 2 - Enable obfuscation and/or minification

### 步骤　2 - 启用混淆以及/或压缩

Open the `/android/app/build.gradle` file and locate the `buildTypes`
definition. Inside the `release` configuration section,
set the `minifiyEnabled` and `useProguard` flags to true.
You must also point Proguard to the file you created in step 1:

在 `/android/app/build.gradle` 文件找到 `buildTypes` 的定义。
在 `release` 配置中设置 `minifiyEnabled` 和 `useProguard` 为 true。
另外我们必须再设置 Proguard 指向步骤 1 中我们创建的文件。


```
android {

    ...

    buildTypes {

        release {

            signingConfig signingConfigs.release

            minifyEnabled true
            useProguard true

            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'

        }
    }
}
```

{{site.alert.note}}

  Obfuscation and minification can considerably extend compile time
  of the Android application.
  
  混淆和压缩会大大地延长安卓应用程序的编译时间。
  
{{site.alert.end}}

## Reviewing the app manifest

## 检查 app manifest 文件

Review the default [App Manifest][manifest] file, `AndroidManifest.xml`,
located in `<app dir>/android/app/src/main` and verify that the values
are correct, especially the following:

检查位于 `<app dir>/android/app/src/main` 的默认 [App Manifest][manifest] 文件 `AndroidManifest.xml`，并确认各个值都设置正确，特别是：

`application`
: Edit the `android:label` in the
  [`application`][applicationtag] tag to reflect 
  the final name of the app.
  
  `application`：编辑 [`application`][applicationtag]
  标签中的 `android:label` 来设置 app 的最终名字。

`uses-permission`
: Add the `android.permission.INTERNET`
  [permission][permissiontag] if your application code needs Internet
  access. The standard template does not include this tag but allows
  Internet access during development to enable communication between
  Flutter tools and a running app.
  
  `uses-permission`：如果你的代码需要互联网交互，请加入
  `android.permission.INTERNET` [权限标签][permissiontag]。
  标准开发模版里并未加入这个权限（但是 Flutter debug 模版加入了这个权限），
  加入这个权限是为了允许 Flutter 工具和正在运行的 app 之间的通信，详情见 [Issue 22139]()。

## Reviewing the build configuration

## 检查构建配置

Review the default [Gradle build file][gradlebuild] file, `build.gradle`,located in `<app dir>/android/app` and 
verify the values are correct,especially the following
values in the `defaultConfig` block:

检查位于 `<app dir>/android/app` 的默认 [Gradle build file][gradlebuild]，
并确认各个值都设置正确，特别是下面 `defaultConfig` 块中的值：

`applicationId`
: Specify the final, unique (Application Id)[appid]

`applicationId`
：指定最终的，唯一的（Application Id）[appid]。

`versionCode` & `versionName`
: Specify the internal app version number,
  and the version number display string. You can do this by setting
  the `version` property in the pubspec.yaml file. Consult the version
  information guidance in the [versions documentation][versions].

`versionCode` & `versionName`
：指定 app 的内部版本号，以及用于显示的版本号，这可以通过设置 pubspec.yaml 文件中 `version` 属性来做。
具体可以参考 [版本文档][versions] 中的版本信息指南。

`minSdkVersion` & `targetSdkVersion`
: Specify the minimum API level,
  and the API level on which the app is designed to run.
  Consult the API level section in the [versions documentation][versions]
  for details.

`minSdkVersion` & `targetSdkVersion`
：指定支持的最低 API 版本，以及我们 app 的目标 API 版本。
具体可以参考 [版本文档][versions] 中的 API 版本部分。

## Building the app for release

## 为发布构建应用程序

You have two possible release formats when publishing to
the Play Store.

当要发布到 Play Store 时，你有两种可能的发布方式

* App bundle (preferred)
  
  App bundle (推荐）
  
* APK

{{site.alert.note}}

  The Google Play Store prefers the app bundle format.
  For more information, see [Android App Bundle][bundle] and
  [About Android App Bundles][bundle2].
  
  Google Play Store 更推荐 app bundle 方式.
  更多信息可以参考 [Android App Bundle][bundle] and
  [About Android App Bundles][bundle2].
  
{{site.alert.end}}

### Build an app bundle

### 构建一个 app bundle

This section describes how to build a release app bundle.
If you completed the signing steps,
the app bundle will be signed.

这个部分描述了如何构建一个发布的 app bundle。
如果在前面的部分已经完成了签名步骤，发布的 bundle 会被签名。

{{site.alert.warning}}
  Recently, the Flutter team has received several reports
  from developers indicating they are experiencing app
  crashes on certain devices on Android 6.0 when building
  an app bundle.

  最近 Flutter team 收到的几份开发者反馈显示，
  他们在尝试构建 app bundle 的时候，会在某些 Android 6.0 某些设备上崩溃。

  While the Android team is working to identify a feasible
  solution, you might try splitting the APK as a temporary
  workaround. For more information, see [Issue 36822][].

  在 Android team 努力寻找可行的解决方案时，你可以先尝试将 APK 拆分作为临时解决方案。
  更多有关信息请查看 [Issue 36822][]。
  
{{site.alert.end}}

From the command line:

使用如下命令：

1. Enter `cd <app dir>`<br>
   (Replace `<app dir>` with your application's directory.)
   
   运行 `cd <app dir>`。（将 `<app dir>` 替换为我们 app 的目录）。
   
1. Run `flutter build appbundle`<br>
   (Running `flutter build` defaults to a release build.)
   
   运行 `flutter build appbundle`。
   (运行 `flutter build` 默认构建一个发布版本。)

The release bundle for your app is created at
`<app dir>/build/app/outputs/bundle/release/app.aab`.

你的应用的 release bundle 会被创建到
`<app dir>/build/app/outputs/bundle/release/app.aab`.

By default, the app bundle contains your Dart code and the Flutter
runtime compiled for [armeabi-v7a][] (32-bit) and [arm64-v8a][] (64-bit).

此 app bundle 会默认地包含为 [armeabi-v7a][] (32-bit) 和 [arm64-v8a][] (64-bit) 编译的 Dart 和 Fluter 运行时代码。

### Test the app bundle

### 测试 app bundle

An app bundle can be tested in multiple ways&mdash;this section
describes two.

一个 app bundle 可以用多种方法测试，这里介绍两种。

#### Offline using the bundle tool

#### 离线使用 bundle tool

1. If you haven't done so already, download `bundletool` from the
   [GitHub repository][].
   
   如果你还没准备好，可以从 [GitHub repository][] 下载 `bundletool`
   
2. [Generate a set of APKs][apk-set] from your app bundle.

   从你的 app bundle [Generate a set of APKs][apk-set]

3. [Deploy the APKs][apk-deploy] to connected devices.

  [Deploy the APKs][apk-deploy] 连接到你的设备

#### Online using Google Play

#### 在线使用 Google Play

1. Upload your bundle to Google Play to test it.
   You can use the internal test track,
   or the alpha or beta channels to test the bundle before
   releasing it in production.
   
   上传你的 bundle 到 Google Play 去测试它。或者在正式发布之前用 alpha 或 beta 频道去测试。
   
2. Follow [these steps to upload your bundle][upload-bundle]
   to the Play Store.
   
   按照 [these steps to upload your bundle][upload-bundle] 上传到 Play Store。

### Build an APK

### 构建一个 APK

Although app bundles are preferred over APKs, there are stores
that don't yet support app bundles. In this case, build a release
APK for each target ABI (Application Binary Interface).

虽然 app bundle 比 APKs 更被推荐使用， 但是有一些 Store 目前还不支持 app bundle方式。
这种情况下，要为各种目标 ABI (Application Binary Interface) 分别构建发布的 APK 文件。

If you completed the signing steps,
the APK will be signed.

如果你完成签名步骤， APK 就被签名了。

From the command line:

使用如下命令：

1. Enter `cd <app dir>`<br>
   (Replace `<app dir>` with your application's directory.)
   
   `cd <app dir>` （将 `<app dir>` 替换为我们 app 的目录）。
   
1. Run `flutter build apk --split-per-abi`<br>
   (The `flutter build` command defaults to `--release`.)
   
   运行 `flutter build apk` （`flutter build` 默认带有 `--release` 参数）。

This command results in two APK files:

这个命令会生成两个 APK 文件：

* `<app dir>/build/app/outputs/apk/release/app-armeabi-v7a-release.apk`
* `<app dir>/build/app/outputs/apk/release/app-arm64-v8a-release.apk`

Removing the `--split-per-abi` flag results in a fat APK that contains
your code compiled for _all_ the target ABIs. Such APKs are larger in
size than their split counterparts, causing the user to download
native binaries that are not applicable to their device's architecture.

如果移除 `--split-per-abi` 将会生成一个包含_所有_目标 ABI 的 fat APK 文件。这种 APK 文件将会在
比单独构建的 APK 文件尺寸要大，会导致用户下载一些不适用于其设备架构的二进制文件。

### Install an APK on a device

### 在设备上安装 APK 文件

Follow these steps to install the APK on a connected Android device.

按照如下这些步骤，将前一步中构建出来的 APK 安装到 Android 设备上。

From the command line:

使用如下命令：

1. Connect your Android device to your computer with a USB cable.
	
   用 USB 线将 Android 设备连接到电脑上。

1. Enter `cd <app dir>` where `<app dir>` is your application directory.

   `cd <app dir>`，`<app dir>` 是我们 app 的目录。
   
1. Run `flutter install`.

   运行 `flutter install`。

## Publishing to the Google Play Store

## 发布到 Google Play Store

For detailed instructions on publishing your app to the Google Play Store,
see the [Google Play launch][play] documentation.

要了解如何发布一个 app 到 Google Play Store，
可以参考 [Google Play publishing documentation][play]。

Now that you’ve created your app, attract more users with Google Ads.
App campaigns use machine learning to drive more installs and
make the most of your budget. 

当你创建了应用之后，你可以通过 Google Ads 吸引更多用户，
Google Ads 平台可以通过机器学习帮助你以非常高的性价比吸引到更多用户。

Get your campaign running in a few steps

通过以下几步创建一个广告宣传：

1. Create your ad&mdash;we’ll help create your ad from your app
   information

   创建广告&mdash;我们会根据您的应用信息帮您制作广告。另外，您还可以添加图片和视频。

1. Choose your budget&mdash;set your target cost-per-install (tCPI)
   and daily budget cap

   决定推广预算&mdash;对于以提高应用安装量为主要目标的广告系列，
   您需要为其设置应用安装出价，也就是“目标每次安装费用”，同时设置每日推广支出预算。

1. Select your location&mdash;let us know where you’d like your ads to run

   选择目标地区&mdash;让我们知道你希望触达哪些区域的用户。

1. Decide what action you want users to take&mdash;choose installs,
   in-app actions, or target return on ad spend (ROAS) 

   设定用户行动&mdash;决定你希望用户要做什么，
   比如安装，应用内操作或者目标广告支出回报率 (ROAS)。

[Get $75 app advertising credit when you spend $25.][]

[获取 75 美元的赠金（当你消费 25 美金后）][Get $75 app advertising credit when you spend $25.]

## Updating the app's version number

## 更新应用版本号

The default version number of the app is `1.0.0`.
To update it, navigate to the `pubspec.yaml` file
and update the following line:

每个应用默认的初始版本号是 `1.0.0`。若要更新它，
请转到 `pubspec.yaml` 文件并更新以下内容：

`version: 1.0.0+1`

The version number is three numbers separated by dots,
such as `1.0.0` in the example above, followed by an optional
build number such as `1` in the example above, separated by a `+`.

版本号由三个点分隔的数字组成，例如上面样例中的 `1.0.0`。然后是可选的
构建号，例如上面样例中的 `1`，以 `+` 分隔。

Both the version and the build number may be overridden in Flutter's
build by specifying `--build-name` and `--build-number`, respectively.

版本号与构建号都可以在 Flutter 打包时分别使用 `--build-name` 和 `--build-number` 重新指定。

In Android, `build-name` is used as `versionName` while
`build-number` used as `versionCode`. For more information,
see [Version your app][] in the Android documentation.

在 Android 中，当 `build-number` 被用作 `versionCode` 时 `build-name` 作为 `versionName` 使用。更多信息请参考 Android 文档中的
[为你的应用添加版本][Version your app]。

## Android release FAQ

## Android发布常见问题

Here are some commonly asked questions about deployment for
Android apps.

这里是一些关于安卓应用程序发布的常见问题。

### When should I build app bundles versus APKs?

### 我应该什么时候构建 app bundles 而不是 APKs?

The Google Play Store recommends that you deploy app bundles
over APKs because they allow a more efficient delivery of the
application to your users. However, if you’re distributing
your application by means other than the Play Store,
an APK may be your only option.

Google Play Store 相对于 APKs 更建议你发布 app bundles， 因为那样应用程序会更有效率地
交付给你的用户。但是，如果你想将应用程序发布到其他的应用商店， APK可能是唯一选项。

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
`--split-per-abi` .

一个 [fat APK][] 是一个包含了支持多个 ABI 架构的 APK 文件。这样做的好处是单个 APK 可以运行在多个架构上，因此
具有更广泛的兼容性。但同时缺点就是文件体积会比较大，导致用户在安装你的应用程序时会下载和储存更多的字节。当构建 APKs 而不是
app bundles 时强烈建议分开构建 APKs，如 [build an APK](#build-an-apk) 所描述的那样，使用 `--split-per-abi` 指令。

### What are the supported target architectures?

### 哪些目标架构是被支持的?

When building your application in release mode,
Flutter apps can be compiled for [armeabi-v7a][] (32-bit)
and [arm64-v8a][] (64-bit). Flutter does not currently support
building for x86 Android (See [Issue 9253][]).

当使用 release 模式构建你的应用程序时, Flutter app 可以基于 [armeabi-v7a][] (32-bit)
和 [arm64-v8a][] (64-bit)被编译。Flutter 目前不支持 x86 Android (参考 [Issue 9253][]).

### How do I sign the app bundle created by `flutter build appbundle`?

### 如何为一个使用 `flutter build appbundle` 创建的 app bundle 签名？

See [Signing the app](#signing-the-app).

### How do I build a release from within Android Studio?

### 如何使用 Android Studio 构建一个发布？

In Android Studio, open the existing `android/`
folder under your app’s folder. Then,
select **build.gradle (Module: app)** in the project panel:

在Android Studio中, 打开你的 app 文件夹下的 `android/`
文件夹. 然后在项目面板中选择 **build.gradle (Module: app)** :

{% asset 'deployment/android/gradle-script-menu.png' alt='screenshot of gradle build script menu' %}

Next, select the build variant. Click **Build > Select Build Variant**
in the main menu. Select any of the variants in the **Build Variants**
panel (debug is the default):

接下来，选择构建变体。在主菜单中点击 **Build > Select Build Variant**。从 **Build Variants** 面板中选择任意一个变体 （默认是 debug）。

{% asset 'deployment/android/build-variant-menu.png' alt='screenshot of build variant menu' %}

The resulting app bundle or APK files are located in
`build/app/outputs` within your app's folder.

生成的 app bundle 或 APK 文件会在你的 app 所在文件夹下的 `build/app/outputs` 文件夹下。

{% comment %}

### Are there any special considerations with add-to-app?

### 在混合应用中是否有特殊考虑之处？

{% endcomment %}

{% comment %}

### TODO

This doc need to assign to a new translator.

该文档需要分配给新的译者。

{% endcomment %}

[manifest]: {{site.android-dev}}/guide/topics/manifest/manifest-intro
[manifesttag]: {{site.android-dev}}/guide/topics/manifest/manifest-element
[apk-set]: {{site.android-dev}}/studio/command-line/bundletool#generate_apks
[apk-deploy]: {{site.android-dev}}/studio/command-line/bundletool#deploy_with_bundletool
[apk-set]: {{site.android-dev}}/studio/command-line/bundletool#generate_apks
[appid]: {{site.android-dev}}/studio/build/application-id
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element
[gradlebuild]: {{site.android-dev}}/studio/build/#module-level
[versions]: {{site.android-dev}}/studio/publish/versioning
[launchericons]: {{site.material}}/design/iconography/
[configuration qualifiers]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[配置限定符]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[play]: {{site.android-dev}}/distribute/googleplay/start
[arm64-v8a]: {{site.android-dev}}/ndk/guides/abis#arm64-v8a
[armeabi-v7a]: {{site.android-dev}}/ndk/guides/abis#v7a
[bundle]: {{site.android-dev}}/platform/technology/app-bundle
[bundle2]: {{site.android-dev}}/guide/app-bundle
[configuration qualifiers]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[fat APK]: https://en.wikipedia.org/wiki/Fat_binary
[Flutter wiki]: {{site.github}}/flutter/flutter/wiki
[flutter_launcher_icons]: {{site.pub}}/packages/flutter_launcher_icons
[Get $75 app advertising credit when you spend $25.]: https://ads.google.com/lp/appcampaigns/?modal_active=none&subid=ww-ww-et-aw-a-flutter1!o1#?modal_active=none
[GitHub repository]: {{site.github}}/google/bundletool/releases/latest
[gradlebuild]: {{site.android-dev}}/studio/build/#module-level
[Issue 9253]: {{site.github}}/flutter/flutter/issues/9253
[Issue 18494]: {{site.github}}/flutter/flutter/issues/18494
[Issue 22139]: {{site.github}}/flutter/flutter/issues/22139
[Issue 36822]: {{site.github}}/flutter/flutter/issues/36822
[launchericons]: {{site.material}}/design/iconography/
[manifest]: {{site.android-dev}}/guide/topics/manifest/manifest-intro
[manifesttag]: {{site.android-dev}}/guide/topics/manifest/manifest-element
[Obfuscating Dart Code]: {{site.github}}/flutter/flutter/wiki/Obfuscating-Dart-Code
[permissiontag]: {{site.android-dev}}/guide/topics/manifest/uses-permission-element
[play]: {{site.android-dev}}/distribute/googleplay/start
[upload-bundle]: {{site.android-dev}}/studio/publish/upload-bundle
[Version your app]: {{site.android-dev}}/studio/publish/versioning
[versions]: {{site.android-dev}}/studio/publish/versioning
