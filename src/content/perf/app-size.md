---
# title: Measuring your app's size
title: 测量你的应用体积
# description: How to measure app size for iOS and Android.
description: 如何测量你的应用在 Android 以及 iOS 上的大小。
tags: Flutter性能
keywords: 包大小,减少Flutter包体积,Flutter瘦身
---

Many developers are concerned with the size of their compiled app.
As the APK, app bundle, or IPA version of a Flutter app is
self-contained and holds all the code and assets needed to run the app,
its size can be a concern. The larger an app,
the more space it requires on a device,
the longer it takes to download,
and it might break the limit of useful
features like Android instant apps.

许多开发者都会关注应用编译后的大小。Flutter 应用编译出的 APK、app bundle 和 IPA 均持有
应用运行需要的所有代码和资源，是完全独立的。一个应用越大，在设备上占用的空间就越多，下载时间就越长，
还可能超出 Android 即时应用等实用功能的限制。

## Debug builds are not representative

## 调试版本不具有代表性

By default, launching your app with `flutter run`,
or by clicking the **Play** button in your IDE
(as used in [Test drive][] and
[Write your first Flutter app][]),
generates a _debug_ build of the Flutter app.
The app size of a debug build is large due to
the debugging overhead that allows for hot reload
and source-level debugging. As such, it is not representative of a production
app end users download.

默认情况下，使用 `flutter run` 命令启动应用，或者点击 IDE 的 **Play** 按钮
（如 [开发体验初探][Test drive] 和 [编写第一个 Flutter 应用][Write your first Flutter app] 中所使用的），
会生成 Flutter 应用的 **调试** 版本。调试版本体积很大，用于热重载和源码调试。
因此，它不能代表用户最终下载的正式版本的应用。

## Checking the total size

## 检查总大小

A default release build, such as one created by `flutter build apk` or
`flutter build ios`, is built to conveniently assemble your upload package
to the Play Store and App Store. As such, they're also not representative of
your end-users' download size. The stores generally reprocess and split
your upload package to target the specific downloader and the downloader's
hardware, such as filtering for assets targeting the phone's DPI, filtering
native libraries targeting the phone's CPU architecture.

由 `flutter build apk` 或 `flutter build ios` 等生成的默认发行版本，
是为了方便在 Play 商店和 App Store 上组装你上传的应用包。
因此，它们也无法代表你的用户最终下载的大小。
应用商店通常会针对不同的下载程序及其硬件，重新处理和拆分你上传的应用包，
例如根据手机的 DPI 过滤资源、根据手机的 CPU 架构过滤原生库。 

### Estimating total size

### 估算总大小

To get the closest approximate size on each platform, use the following
instructions.

请使用以下指南，获取各个平台下最接近的估算大小。

#### Android

Follow the Google [Play Console's instructions][] for checking app download and
install sizes.

根据 Google 的 [Play 控制台说明][Play Console's instructions] 来查看应用的下载大小。

Produce an upload package for your application:

生成你的应用的上传包：

```console
flutter build appbundle
```

Log into your [Google Play Console][]. Upload your application binary by drag
dropping the .aab file.

登录你的 [Google Play 控制台][Google Play Console]。
通过拖放 .abb 文件来上传应用的二进制文件。

View the application's download and install size in the **Android vitals** ->
**App size** tab.

在 **Android vitals** -> **App size** 选项卡中查看应用的下载和安装大小。

{% render docs/app-figure.md, image:"perf/vital-size.png", alt:"App size tab in Google Play Console" %}

The download size is calculated based on an XXXHDPI (~640dpi) device on an
arm64-v8a architecture. Your end users' download sizes might vary depending on
their hardware.

该下载大小是基于 XXXHDPI (~640dpi) 且架构为 arm64-v8a 的设备来计算的。
用户最终的下载大小可能因硬件而异。

The top tab has a toggle for download size and install size. The page also
contains optimization tips further below.

顶部选项卡有一个切换下载大小和安装大小的开关。该页面还包含了进一步的优化提示。

#### iOS

Create an [Xcode App Size Report][].

创建一份 [Xcode 应用大小报告][Xcode App Size Report]。

First, by configuring the app version and build as described in the
[iOS create build archive instructions][].

首先，参照 [iOS 创建构建归档指南][iOS create build archive instructions]，
配置应用的版本，并开始构建。

Then:

然后：

1. Run `flutter build ipa --export-method development`.

   运行命令 `flutter build ipa --export-method development`。

1. Run `open build/ios/archive/*.xcarchive` to open the archive in Xcode.

   运行命令 `open build/ios/archive/*.xcarchive` 打开 Xcode 生成的归档文件。

1. Click **Distribute App**.

   点击 **Distribute App**。

1. Select a method of distribution. **Development** is the simplest if you don't
   intend to distribute the application.
   
   选择一种发布方式。如果你不打算发布该应用，**Development** 模式是最简单的。
   
1. In **App Thinning**, select 'all compatible device variants'.

   在 **App Thinning** 中，选择「all compatible device variants」。

1. Select **Strip Swift symbols**.

   选择 **Strip Swift symbols**。

Sign and export the IPA. The exported directory contains
`App Thinning Size Report.txt` with details about your projected
application size on different devices and versions of iOS.

签名并导出 IPA 包，导出目录中有一个 `App Thinning Size Report.txt` 文件，
其中记录了在不同设备和 iOS 版本上预估的应用程序大小的详细信息。

The App Size Report for the default demo app in Flutter 1.17 shows:

Flutter 1.17 上的默认 demo app 的应用大小报告显示如下：

```plaintext
Variant: Runner-7433FC8E-1DF4-4299-A7E8-E00768671BEB.ipa
Supported variant descriptors: [device: iPhone12,1, os-version: 13.0] and [device: iPhone11,8, os-version: 13.0]
App + On Demand Resources size: 5.4 MB compressed, 13.7 MB uncompressed
App size: 5.4 MB compressed, 13.7 MB uncompressed
On Demand Resources size: Zero KB compressed, Zero KB uncompressed
```

In this example, the app has an approximate
download size of 5.4 MB and an approximate
installation size of 13.7 MB on an iPhone12,1 ([Model ID / Hardware
number][] for iPhone 11)
and iPhone11,8 (iPhone XR) running iOS 13.0.

在这个例子中，设备 iPhone12,1（iPhone 11 的 [Model ID / Hardware number][]）
和 iPhone11,8 (iPhone XR) 运行在 iOS 13.0 版本下时，
下载大小约为 5.4 MB，安装大小约为 13.7 MB。

To measure an iOS app exactly,
you have to upload a release IPA to Apple's
App Store Connect ([instructions][])
and obtain the size report from there.
IPAs are commonly larger than APKs as explained
in [How big is the Flutter engine?][], a
section in the Flutter [FAQ][].

想要精确测量一个 iOS 应用的体积，你需要先将一个发行版本的 IPA 包上传至 
App Store Connect（[简介][instructions]），再获取它的大小报告。
IPA 包一般都比 APK 包要大，这在 Flutter [FAQ][] 中的 
[Flutter 引擎有多大？][How big is the Flutter engine?] 一节中已经阐述过了。

## Breaking down the size

## 大小拆分

Starting in Flutter version 1.22 and DevTools version 0.9.1,
a size analysis tool is included to help developers understand the breakdown
of the release build of their application.

从 Flutter 1.22 和 DevTools 0.9.1 版本开始，包含了一个大小分析工具，
帮助开发者了解和拆分应用的发行版本。

:::warning

As stated in the [checking total size](#checking-the-total-size) section
above, an upload package is not representative of your end users' download
size. Be aware that redundant native library architectures and asset densities
seen in the breakdown tool can be filtered by the Play Store and App Store.

正如 [检查总大小](#checking-the-total-size) 一节所述，
上传包的大小并不代表用户最终的下载大小。请注意，拆分工具中显示的冗余的原生库结构和资源密度，
都可以通过 Play 商店和 App Store 过滤。

:::

The size analysis tool is invoked by passing the `--analyze-size` flag when
building:

该大小分析工具通过在构建时添加 `--analyze-size` 标记来调用：

- `flutter build apk --analyze-size`
- `flutter build appbundle --analyze-size`
- `flutter build ios --analyze-size`
- `flutter build linux --analyze-size`
- `flutter build macos --analyze-size`
- `flutter build windows --analyze-size`

This build is different from a standard release build in two ways.

这种构建模式和标准的发行构建相比，有以下两方面的区别：

1. The tool compiles Dart in a way that records code size usage of Dart
   packages.
   
   该工具编译 Dart 时，记录了 Dart 包的代码大小使用情况。
   
2. The tool displays a high level summary of the size breakdown
   in the terminal, and leaves a `*-code-size-analysis_*.json` file for more
   detailed analysis in DevTools.
   
   该工具在终端上展示了大小拆分的摘要信息，并在 DevTools 中生成了一个
   `*-code-size-analysis_*.json` 文件，用于进行更详细的分析。

In addition to analyzing a single build, two builds can also be diffed by
loading two `*-code-size-analysis_*.json` files into DevTools.
Check out the [DevTools documentation][] for details.

除了分析单个构建，你还可以在 DevTools 中加载两个 `*-code-size-analysis_*.json`
文件比较差异。详情请阅读 [DevTools 文档][DevTools documentation]。

{% render docs/app-figure.md, image:"perf/size-summary.png", alt:"Size summary of an Android application in terminal" %}

Through the summary, you can get a quick idea of the size usage per category
(such as asset, native code, Flutter libraries, etc). The compiled Dart
native library is further broken down by package for quick analysis.

通过总结，你可以快速了解每种类型（例如资源、原生代码、Flutter 库等）的大小使用情况。
编译后的 Dart 原生库会按包进一步拆分，以便快速分析。

:::warning

This tool on iOS creates a .app rather than an IPA. Use this tool to
evaluate the relative size of the .app's content. To get
a closer estimate of the download size, reference the
[Estimating total size](#estimating-total-size) section above.

在 iOS 上，该工具会创建一个 .app 文件，而不是一个 IPA 包文件。
使用该工具可以评估 .app 内容的相对大小。为了获取更准确的下载大小的估算值，
请参考上面的 [估算总大小](#estimating-total-size) 一节。

:::

### Deeper analysis in DevTools

### 在 DevTools 中深入分析

The `*-code-size-analysis_*.json` file produced above can be further
analyzed in deeper detail in DevTools where a tree or a treemap view can
break down the contents of the application into the individual file level and
up to function level for the Dart AOT artifact.

上面生成的 `*-code-size-analysis_*.json` 文件可以在 DevTools 中进一步深入分析，
树和树状图可以将应用内容分割至单文件级别，也可以达到 Dart AOT 产物的函数级别。

This can be done by `dart devtools`, selecting
`Open app size tool` and uploading the JSON file.

可以通过 `dart devtools` 打开 DevTools，
选择 `Open app size tool`，然后上传 JSON 文件。

{% render docs/app-figure.md, image:"perf/devtools-size.png", alt:"Example breakdown of app in DevTools" %}

For further information on using the DevTools app size tool,
check out the [DevTools documentation][].

更多关于 DevTools 中应用大小工具的使用，请看
[DevTools 文档][DevTools documentation]。

## Reducing app size

## 减少应用大小

When building a release version of your app,
consider using the `--split-debug-info` tag.
This tag can dramatically reduce code size.
For an example of using this tag, see
[Obfuscating Dart code][].

当构建应用的发行版本时，考虑使用 `--split-debug-info` 标记。
该标记会显著减少代码量。关于使用此标记的示例，
请查看文档 [Obfuscating Dart code][]。

Some other things you can do to make your app smaller are:

其他减少应用大小的方式：

* Remove unused resources

  删除无用的资源

* Minimize resource imported from libraries

  尽量减少从库中引入的资源

* Compress PNG and JPEG files

  压缩 PNG 和 JPEG 文件

[FAQ]: /resources/faq
[How big is the Flutter engine?]: /resources/faq#how-big-is-the-flutter-engine
[instructions]: /deployment/ios
[Xcode App Size Report]: {{site.apple-dev}}documentation/xcode/reducing_your_app_s_size#3458589
[iOS create build archive instructions]: /deployment/ios#update-the-apps-build-and-version-numbers
[Model ID / Hardware number]: https://en.wikipedia.org/wiki/List_of_iOS_devices#Models
[Obfuscating Dart code]: /deployment/obfuscate
[Test drive]: /get-started/test-drive
[Write your first Flutter app]: /get-started/codelab
[Play Console's instructions]: https://support.google.com/googleplay/android-developer/answer/9302563?hl=en
[Google Play Console]: https://play.google.com/apps/publish/
[DevTools documentation]: /tools/devtools/app-size
