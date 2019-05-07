---
title: Preparing an Android App for Release
title: 打包和发布到 Android 平台
short-title: Android
---

During a typical development cycle, you test an app using
`flutter run` at the command line, the **Run** and **Debug**
toolbar buttons in IntelliJ. By default,
Flutter builds a *debug* version of your app.

在一般的开发过程中，我们可以使用 `flutter run` 命令，或者 IntelliJ 工具栏中的 **Run** 和 **Debug** 来测试 app。这时候，Flutter 默认会为我们构建 app 的**调试**版本。

When you're ready to prepare a *release* version for Android, for example to
[publish to the Google Play Store][play], follow the steps on this page.

当想要发布 app 时，比如 [发布到 Google Play Store][play]，可以按照以下步骤来准备 Android 平台的**发布**版本。

## Review the App Manifest
## 检查 App Manifest

Review the default [App Manifest][manifest] file `AndroidManifest.xml` located
in `<app dir>/android/app/src/main` and verify the values are correct,
especially:

检查位于 `<app dir>/android/app/src/main` 的默认 [App Manifest][manifest] 文件 `AndroidManifest.xml`，并确认各个值都设置正确，特别是：

* `application`: Edit the `android:label` in the
  [`application`][applicationtag] tag to reflect the final name of the app.
* `application`：编辑 [`application`][applicationtag] 标签中的 `android:label` 来设置 app 的最终名字。

* `uses-permission`: Remove the `android.permission.INTERNET`
  [permission][permissiontag] if your application code does not need Internet
  access. The standard template includes this tag to enable communication
  between Flutter tools and a running app.
* `uses-permission`：如果 app 不需要访问 Internet，移除 `android.permission.INTERNET` [权限][permissiontag]。标准模版里包含了这个权限，是为了允许 Flutter 工具和正在运行的 app 之间的通信。

## Review the build configuration
## 检查构建配置

Review the default [Gradle build file][gradlebuild] file `build.gradle`
located in `<app dir>/android/app` and verify the values are correct,
especially:

检查位于 `<app dir>/android/app` 的默认 [Gradle build file][gradlebuild]，并确认各个值都设置正确，特别是：

* `defaultConfig`:

  * `applicationId`: Specify the final, unique (Application Id)[appid]
  * `applicationId`：指定最终的，唯一的（Application Id）[appid]

  * `versionCode` & `versionName`: Specify the internal app version number,
     and the version number display string. You can do this by setting
     the `version` property in the pubspec.yaml file. Consult the version
     information guidance in the [versions documentation][versions].
  * `versionCode` & `versionName`：指定 app 的内部版本号，以及用于显示的版本号，这可以通过设置 pubspec.yaml 文件中 `version` 属性来做。具体可以参考 [版本文档][versions] 中的版本信息指南。

  * `minSdkVersion` & `targetSdkVersion`: Specify the minimum API level,
     and the API level on which the app is designed to run. Consult the API
     level section in the [versions documentation][versions] for details.
  * `minSdkVersion` & `targetSdkVersion`：指定支持的最低 API 版本，以及我们 app 的目标 API 版本。具体可以参考 [版本文档][versions]中的 API 版本部分。

## Adding a Launcher icon
## 添加一个启动图标

When a new Flutter app is created, it has a default Launcher icon. To
customize this icon you might want to check out the [Flutter Launcher
Icons]({{site.pub}}/packages/flutter_launcher_icons) package.

当我们创建一个新的 Flutter app 的时候，它会有一个默认的启动图标。要自定义这个图标，可以参考 [Flutter Launcher Icons]({{site.pub}}/packages/flutter_launcher_icons)。

Alternatively, if you want to do it manually, here's how:

或者，如果我们想手动操作，可以参考以下方法：

1. Review the [Android Launcher Icons][launchericons] guidelines for icon
   design.
   
   查看 [Android Launcher Icons][launchericons] 指南中图标设计部分。

1. In the `<app dir>/android/app/src/main/res/` directory, place your icon files
   in folders named using [configuration qualifiers][].
   The default `mipmap-` folders demonstrate the correct naming convention.
   
   在 `<app dir>/android/app/src/main/res/` 目录下, 把我们的图标文件放在以 [配置限定符][] 命名的文件夹中。
   类似默认的 `mipmap-` 文件夹这样的命名方式。

1. In `AndroidManifest.xml`, update the [`application`][applicationtag] tag's
   `android:icon` attribute to reference icons from the previous step (for
   example, `<application android:icon="@mipmap/ic_launcher" ...`).
   
   在 `AndroidManifest.xml` 中，更新 [`application`][applicationtag] 标签中的 `android:icon` 属性来引用上一步骤中我们自己的图标文件（例如，`<application android:icon="@mipmap/ic_launcher" ...`)。

1. To verify the icon has been replaced, run your app using `flutter run`
   and inspect the app icon in the Launcher.
   用 `flutter run` 运行 app，检查启动程序中的 app 图标是否已经替换成我们自己的图标文件。

## Signing the app
## 为 app 签名

To publish on the Play store, you need to give your app a digital
signature. Use the following instructions to sign your app.

要想把 app 发布到 Play store，还需要给 app 一个数字签名。我们可以采用以下步骤来为 app 签名：

### Create a keystore
### 创建一个密钥库
If you have an existing keystore, skip to the next step. If not, create one
by running the following at the command line:
`keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`

如果我们已经有一个密钥库，可以跳到下一步。如果没有，在命令行中运行以下的命令来创建一个：
`keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`

*Note:* Keep this file private; do not check it into public source control.

**注意：** 保证这个文件的私有性，不要将它提交到公共的代码管理空间。

*Note:* `keytool` might not be in your path. It is part of the Java JDK,
which is installed as part of Android Studio. For the concrete path,
run `flutter doctor -v` and see the path printed after 'Java binary at:',
and then use that fully qualified path replacing `java` with `keytool`.

**注意：** `keytool` 可能不在我们的系统路径中。它是 Java JDK 的一部分，在安装 Android Studio 的时候会被一起安装。运行 `flutter doctor -v`，'Java binary at:' 之后打印出来的就是它的路径，然后用 `java` 来替换以上命令中的 `keytool`，并加上 `keytool` 的完整路径即可。

### Reference the keystore from the app
### 从 app 中引用密钥库

Create a file named `<app dir>/android/key.properties` that contains a
reference to your keystore:

创建一个名为 `<app dir>/android/key.properties` 的文件，它包含了密钥库位置的定义：

```
storePassword=<password from previous step>
keyPassword=<password from previous step>
keyAlias=key
storeFile=<location of the key store file, e.g. /Users/<user name>/key.jks>
```
```
storePassword=<上一步骤中的密码>
keyPassword=<上一步骤中的密码>
keyAlias=key
storeFile=<密钥库的位置，e.g. /Users/<用户名>/key.jks>
```

*Note:* Keep this file private; do not check it into public source control.

**注意：** 保证这个文件的私有性，不要将它提交到公共的代码管理空间。

### Configure signing in gradle
### 在 gradle 中配置签名

Configure signing for your app by editing the
`<app dir>/android/app/build.gradle` file.

通过编辑 `<app dir>/android/app/build.gradle` 文件来为我们的 app 配置签名：

1. Replace:
```
   android {
```
   with the keystore information from your properties file:
```
   def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }

   android {
```
   将：
```
   android {
```
   替换为我们的 properties 文件的密钥库信息：
```
   def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }

   android {
```

1. Replace:
```
   buildTypes {
       release {
           // TODO: Add your own signing config for the release build.
           // Signing with the debug keys for now, so `flutter run --release` works.
           signingConfig signingConfigs.debug
       }
   }
```
   with:
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
   将：
```
   buildTypes {
       release {
           // TODO：为发布版本添加自己的签名配置
           // 暂时采用调试密钥来签名，这样 `flutter run --release` 就可以工作了
           signingConfig signingConfigs.debug
       }
   }
```
   替换为：
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

Release builds of your app will now be signed automatically.

现在我们 app 的发布版本就会被自动签名了。


## Enabling Proguard
## 启用 Proguard

By default, Flutter does not obfuscate or minify the Android host.
If you intend to use third-party Java or Android libraries,
you may want to reduce the size of the APK or protect that code from
reverse engineering.

默认情况下，Flutter 不会做混淆或者压缩 Android host 的工作。如果 app 使用了第三方的 Java 或者 Android 库，我们会希望减小 APK 的大小，或者保护代码不被反编译出来。

For information on obfuscating Dart code, see [Obfuscating Dart
Code]({{site.github}}/flutter/flutter/wiki/Obfuscating-Dart-Code)
in the [Flutter wiki]({{site.github}}/flutter/flutter/wiki).

要了解混淆 Dart 代码的相关信息，可以参考 [Flutter wiki]({{site.github}}/flutter/flutter/wiki) 上的 [Obfuscating Dart Code]({{site.github}}/flutter/flutter/wiki/Obfuscating-Dart-Code)。

### Step 1 - Configure Proguard
### 步骤1 - 配置 Proguard

Create `/android/app/proguard-rules.pro` file and add rules listed below.

创建 `/android/app/proguard-rules.pro` 文件并添加下面的规则。

```
#Flutter Wrapper
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.**  { *; }
-keep class io.flutter.plugins.**  { *; }
```

The configuration above only protects Flutter engine libraries.
Any additional libraries (for example, Firebase) require their own
rules to be added.

以上这样的配置只是对 Flutter 引擎库做保护。如果想要保护其他的库（例如，Firebase），需要为它们添加自己的规则。

### Step 2 - Enable obfuscation and/or minification
### 步骤2 - 启用混淆以及/或压缩

Open `/android/app/build.gradle` file and locate `buildTypes` definition.
Inside `release` configuration set `minifiyEnabled` and `useProguard` flags
to true. You have to also point ProGuard to the file you have created in step 1.

在 `/android/app/build.gradle` 文件找到 `buildTypes` 的定义。
在 `release` 配置中设置 `minifiyEnabled` 和 `useProguard` 为 true。另外我们必须再设置 Proguard 指向步骤 1 中我们创建的文件。

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

Note: Obfuscation and minification can considerably extend compile time
of the Android application.

注意：混淆和压缩会大大增加 Android 应用程序的编译时间。

## Building a release APK
## 构建 APK 的发布版本

This section describes how to build a release APK. If you completed the
signing steps in the previous section, the release APK will be signed.

这个部分讲述如何构建 APK 的发布版本。如果在前面的部分中已经完成了签名步骤，发布版本的 APK 会被自动签名。

Using the command line:

使用如下命令来构建发布版本：

1. `cd <app dir>` (replace `<app dir>` with your application's directory).
   
   `cd <app dir>` （将 `<app dir>` 替换为我们 app 的目录)。
1. Run `flutter build apk` (`flutter build` defaults to `--release`).
   
   运行 `flutter build apk` （`flutter build` 默认带有 `--release` 参数）。

The release APK for your app is created at
`<app dir>/build/app/outputs/apk/release/app-release.apk`.

运行之后，会在 `<app dir>/build/app/outputs/apk/release/app-release.apk` 路径中生成 app 的发布版本 APK。

## Installing a release APK on a device
## 在设备上安装发布版本 APK

Follow these steps to install the APK built in the previous step on a
connected Android device.

按照如下这些步骤，将前一步中构建出来的 APK 安装到 Android 设备上。

Using the command line:

使用如下命令：

1. Connect your Android device to your computer with a USB cable.
   
   用 USB 线将 Android 设备连接到电脑上。
1. `cd <app dir>` where `<app dir>` is your application directory.
   
   `cd <app dir>`，`<app dir>` 是我们 app 的目录。
1. Run `flutter install` .
   
   运行 `flutter install`。

## Publishing an APK to the Google Play Store
## 发布 APK 到 Google Play Store

For detailed instructions on publishing the release version of an app to the
Google Play Store, see the [Google Play publishing documentation][play].

要了解如何发布一个 app 到 Google Play Store，可以参考 [Google Play publishing documentation][play]。

## Building a release app bundle
## 构建发布的 app bundle

This section describes how to build a release app bundle. If you completed
the signing steps in the previous section, the release bundle will be signed.

这个部分描述了如何构建一个发布的 app bundle。如果在前面的部分已经完成了签名步骤，发布的 bundle 会被签名。

From the command line:

使用如下命令：

1. Enter `cd <app dir>`. (Replace `<app, dir>` with your application's directory.)
   
   运行 `cd <app dir>`。（将 `<app, dir>` 替换为我们 app 的目录）。
1. Run `flutter build appbundle`. (Running `flutter build` defaults to a release build.)
   
   运行 `flutter build appbundle`。（运行 `flutter build` 默认构建一个发布版本)。
1. To generate a different variant of bundle, you can enter
   <nobr>`flutter build appbundle --release --target-platform=android-arm`.</nobr>
   This generates a bundle for android-arm.
   
   为了生成各个不同平台的 bundle ，可以运行
   <nobr>`flutter build appbundle --release --target-platform=android-arm`。</nobr>
   它会生成 android-arm 平台的 bundle。

The release bundle for your app is created at
`<app dir>/build/app/outputs/bundle/release/app.aab`.

运行之后，会在 `<app dir>/build/app/outputs/bundle/release/app.aab` 路径生成我们 app 的发布 bundle。


{{site.alert.note}}
  As of this writing, the app bundle command only generates **armeabi-v7a**
  compatible libs. Follow [Issue 18494][Issue 18494] for more information.
  
  在撰写本文时，app bundle 命令只生成了 **armeabi-v7a** 的兼容库。更多的信息请参阅 [Issue 18494][Issue 18494]。
{{site.alert.end}} 


## Testing an app Bundle
## 测试 app Bundle

An app bundle can be tested in multiple ways. This section describes a couple
ways in which to test an app bundle.

我们可以用多种方式来测试 app bundle。这个部分描述测试 app bundle 的几种方式。

### Offline using the bundle tool
### 离线使用 bundle 工具

1. If you have done done so already, download `bundletool` from the
[GitHub repository](https://github.com/google/bundletool).
   
   从 [GitHub仓库](https://github.com/google/bundletool) 下载 `bundletool`。
1. [Generate a set of
APKs](https://developer.android.com/studio/command-line/bundletool#generate_apks)
from your app bundle.
   
   从我们的 app bundle [产生一系列 APK ](https://developer.android.com/studio/command-line/bundletool#generate_apks)。
1. [Deploy the
APKs](https://developer.android.com/studio/command-line/bundletool#deploy_with_bundletool)
to connected devices.
   
   [部署 APK](https://developer.android.com/studio/command-line/bundletool#deploy_with_bundletool) 到设备上。

### Online using Google Play
### 在线使用 Google Play

1. Upload your bundle to Google Play to test it. You can use the internal
test track, or the alpha or beta channels to test the bundle before releasing
it in production.
   
   上传我们的 bundle 到 Google Play上进行测试。在发布之前，我们可以使用内部测试追踪，或者 alpha 或者 beta 通道来测试 bundle。
2. Follow [these steps to upload your
bundle](https://developer.android.com/studio/publish/upload-bundle)
to the Play Store.
   
   按照 [这些步骤上传 bundle](https://developer.android.com/studio/publish/upload-bundle) 到 Play Store上。

[manifest]: {{site.android-dev}}/guide/topics/manifest/manifest-intro
[manifesttag]: {{site.android-dev}}/guide/topics/manifest/manifest-element
[appid]: {{site.android-dev}}/studio/build/application-id
[permissiontag]: {{site.android-dev}}/guide/topics/manifest/uses-permission-element
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element
[gradlebuild]: {{site.android-dev}}/studio/build/#module-level
[versions]: {{site.android-dev}}/studio/publish/versioning
[launchericons]: {{site.android-dev}}/guide/practices/ui_guidelines/icon_design_launcher
[configuration qualifiers]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[配置限定符]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[play]: {{site.android-dev}}/distribute/googleplay/start
[Issue 18494]: https://github.com/flutter/flutter/issues/18494
