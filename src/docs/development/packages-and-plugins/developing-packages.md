---
title: Developing packages & plugins
title: Flutter Packages 的开发和提交
short-title: Developing
short-title: 开发和提交
description: How to write packages and plugins for Flutter.
description: 如何编写和提交你的 Packages。
---

## Package introduction

## Package 介绍

Packages enable the creation of modular code that can be shared easily. A
minimal package consists of:

通过使用 packages （的模式）可以创建易于共享的模块化代码。一个最基本的 package 由以下内容构成：

* A `pubspec.yaml` file: A metadata file that declares the package name,
  version, author, etc.

  `pubspec.yaml` 文件：用于定义 package 名称、版本号、作者等其他信息的元数据文件。

* A `lib` directory containing the public code in the package, minimally a
  single `<package-name>.dart` file.

  包含共享代码的 `lib` 目录，其中至少包含一个 `<package-name>.dart` 文件。

{{site.alert.note}}

  For a list of dos and don'ts when writing an effective plugin,
  see [Writing a good
  plugin][]
  on Medium.

  有关编写高效插件的注意事项列表，请参考 Medium 上的文章：[Writing a good
  plugin][]。

{{site.alert.end}}

### Package types {#types}

### Package 类别 {#types}

Packages can contain several kinds of content:

Package 包含以下两种类别：

* *Dart packages*: General packages written in Dart, for example the
  [`path`][] package. Some of these might
  contain Flutter specific functionality and thus have a dependency on the
  Flutter framework, restricting their use to Flutter only,
  for example the [`fluro`][] package.

  纯 Dart 库：用 Dart 编写的传统 package，比如
  [`path`]({{site.pub}}/packages/path)。其中一些可能包含 Flutter
  的特定功能，因此依赖于 Flutter 框架，其使用范围仅限于 Flutter，比如
  [`fluro`]({{site.pub}}/packages/fluro)。

* *Plugin packages*: A specialized Dart package which contains an API written in
  Dart code combined with a platform-specific implementation for Android (using
  Java or Kotlin), and/or for iOS (using ObjC or Swift). A concrete example is
  the [`battery`][] plugin package.

  原生插件：使用 Dart 编写的，按需使用
  Java 或 Kotlin、ObjC 或 Swift 分别在 Android 和/或 iOS 平台实现的 package。
  一个具体的例子是 [`battery`]({{site.pub}}/packages/battery)。

## Developing Dart packages {#dart}

## 开发纯 Dart 库的 packages {#dart}

### Step 1: Create the package

### 第一步：创建 package

To create a Dart package, use the `--template=package` flag with `flutter create`:

想要创建纯 Dart 库的 package，请使用带有 `--template=package` 标志的 `flutter create` 命令：

```terminal
$ flutter create --template=package hello
```

This creates a package project in the `hello/` folder with the following
specialized content:

这将在 `hello/` 目录下创建一个 package 项目，其中包含以下内容：

* `lib/hello.dart`
<br> The Dart code for the package.

<br> package 的 Dart 实现代码。

* `test/hello_test.dart`
<br> The [unit tests][] for the package.

<br> Package 的 [单元测试](/docs/testing#unit-tests)。

### Step 2: Implement the package

### 第二步：实现 package

For pure Dart packages, simply add the functionality inside the main
`lib/<package name>.dart` file, or in several files in the `lib` directory.

对于纯 Dart 库的 package，只要在 `lib/<package name>.dart` 文件中添加功能实现，或在 `lib`
目录中的多个文件中添加功能实现。

To test the package, add [unit tests][]
in a `test` directory.

如果要对 package 进行测试，在 `test` 目录下添加 [单元测试][unit tests]。

For additional details on how to organize the package contents, see the
[Dart library package][] documentation.

关于如何组织 package 内容的更多详细信息，请参考 [Dart library
package]({{site.dart-site}}/guides/libraries/create-library-packages) 文档。

## Developing plugin packages {#plugin}

## 开发原生插件类型的 packages {#plugin}

*For information about the `flutter.plugin.platforms` key see: [Specifying a plugin's supported platforms](#plugin-platforms).*

**如果你想了解更多 `flutter.plugin.platforms` 的内容，请在 [这里查看更多](#plugin-platforms)**

If you want to develop a package that calls into platform-specific APIs, you
need to develop a plugin package. A plugin package is a specialized version of a
Dart package, that in addition to the content described above also contains
platform-specific implementations written for Android (Java or Kotlin code), for
iOS (Objective-C or Swift code), or for both. The API is connected to the
platform-specific implementation(s) using [platform channels][].

如果想要开发一个调用特定平台 API 的 package，你需要开发一个原生插件 packgae。
原生插件 packgae 是 Dart package 的特别版本，
除了要实现 Dart package 要实现的内容，还需要按需使用 Java 或 Kotlin、ObjC 
或 Swift 分别在 Android 和/或 iOS 平台实现，
你可以使用 [platform channels][] 中的 API 来实现特定平台的调用。

### Step 1: Create the package

### 第一步：创建 package

To create a plugin package, use the `--template=plugin` flag with `flutter create`.

想要创建原生插件 package，请使用带有 `--template=plugin` 标志的 `flutter create` 命令。

Use the `--org` option to specify your organization, using reverse domain name
notation. This value is used in various package and bundle identifiers in the
generated Android and iOS code.

使用 `--org` 选项，以反向域名表示法来指定你的组织。该值用于生成的 Android 及

```terminal
$ flutter create --org com.example --template=plugin hello
```

This creates a plugin project in the `hello/` folder with the following
specialized content:

这将在 `hello/` 目录下创建一个插件项目，其中包含以下内容：

* `lib/hello.dart`:
   - The Dart API for the plugin.

     Dart 插件 API 实现。

* <code>android/src/main/java/com/example/&#8203;hello/HelloPlugin.kt</code>:
   - The Android platform specific implementation of the plugin API.

     Android 平台原生插件 API 实现。

* `ios/Classes/HelloPlugin.m`:
   - The iOS platform specific implementation of the plugin API.

     iOS 平台原生插件 API 实现。

* `example/`:
   - A Flutter app that depends on the plugin, and illustrates how to use it.

     一个依赖于该插件并说明了如何使用它的 Flutter 应用。

By default, the plugin project uses Swift for iOS code and
Kotlin for Android code. If you prefer Objective-C or Java, you can specify the
iOS language using `-i` and/or the Android language using `-a`. For example:

默认情况下，插件项目中 iOS 代码使用 Swift 编写，Android 代码使用 Kotlin 编写。
如果你更喜欢 Objective-C 或 Java，
你可以通过 `-i` 指定 iOS 所使用的语言和/或
使用`-a` 指定 Android 所使用的语言。比如：

```terminal
$ flutter create --template=plugin -i objc -a java hello
```

### Step 2: Implement the package {#edit-plugin-package}

### 第二步：实现 package {#edit-plugin-package}

As a plugin package contains code for several platforms written in several
programming languages, some specific steps are needed to ensure a smooth
experience.

由于原生插件类型的 package 包含了使用多种编程语言编写的多个平台代码，因此需要一些特定步骤来保证体验的流畅性。

#### Step 2a: Define the package API (.dart)

#### 步骤 2a：定义 package API（.dart）

The API of the plugin package is defined in Dart code. Open the main `hello/`
folder in your favorite [Flutter editor][]. Locate the file
`lib/hello.dart`.

原生插件类型 package 的 API 在 Dart 代码中要首先定义好，使用你钟爱的 [Flutter 编辑器][Flutter editor]，
打开 `hello/` 主目录，并找到 `lib/hello.dart` 文件。

#### Step 2b: Add Android platform code (.java/.kt)

#### 步骤 2b：添加 Android 平台代码（.java/.kt）

We recommend you edit the Android code using Android Studio.

我们建议你使用 Android Studio 来编辑 Android 代码。

Before editing the Android platform code in Android Studio, first make sure that
the code has been built at least once (in other words,
run the example app from your IDE/editor,
or in a terminal execute `cd hello/example; flutter build apk`).

使用 Android Studio 编辑 Android 平台代码之前，首先确保代码至少被构建过一次
（换句话说，即从
IDE/编辑器执行示例程序，或在终端中执行以下命令：`cd hello/example; flutter build apk`）。

Next,

接下来，

1. Launch Android Studio

   启动 Android Studio

1. Select 'Import project' in 'Welcome to Android Studio' dialog, or select
'File > New > Import Project...'' in the menu, and select the
`hello/example/android/build.gradle` file.

   在“Welcome to Android Studio”对话框中选择“Import project”，或在菜单中选择“File > New > Import
   Project...”，然后选择 `hello/example/android/build.gradle` 文件；

1. In the 'Gradle Sync' dialog, select 'OK'.

   在“Gradle Sync”对话框中，选择“OK”；

1. In the 'Android Gradle Plugin Update' dialog, select 'Don't remind me again
   for this project'.

   在“Android Gradle Plugin Update”对话框中，选择“Don't remind me again
   for this project”。

The Android platform code of your plugin is located in
<code>hello/java/com.example.hello/&#8203;HelloPlugin</code>.

插件的 Android 平台代码位于
<code>hello/java/com.example.hello/&#8203;HelloPlugin</code>。

You can run the example app from Android Studio by pressing the &#9654; button.

你可以在 Android Studio 中点击 &#9654; 按钮来运行示例程序。

#### Step 2c: Add iOS platform code (.h+.m/.swift)

#### 步骤 2c：添加 iOS 平台代码（.h+.m/.swift）

We recommend you edit the iOS code using Xcode.

我们建议你使用 Xcode 来编辑 iOS 代码。

Before editing the iOS platform code in Xcode, first make sure that
the code has been built at least once (i.e., run the example app from your IDE/editor,
or in a terminal execute `cd hello/example; flutter build ios --no-codesign`).

使用 Xcode 编辑 iOS 平台代码之前，首先确保代码至少被构建过一次（即从
IDE/编辑器执行示例程序，或在终端中执行以下命令：`cd hello/example; flutter build ios --no-codesign`）。

Next,

下一步，

1. Launch Xcode

   启动 Xcode

1. Select 'File > Open', and select the `hello/example/ios/Runner.xcworkspace` file.

   选择“File > Open”， 然后选择 `hello/example/ios/Runner.xcworkspace` 文件。

The iOS platform code of your plugin is located in `Pods/Development
Pods/hello/Classes/` in the Project Navigator.

插件的 iOS 平台代码位于项目导航中的 `Pods/Development
Pods/hello/Classes/`。

You can run the example app by pressing the &#9654; button.

你可以点击 &#9654; 按钮来运行示例程序。

#### Step 2d: Connect the API and the platform code

#### 步骤 2d：关联 API 和平台代码

Finally, you need to connect the API written in Dart code with the platform-specific
implementations. This is done using [platform channels][].

最后，你需要将 Dart 编写的 API 代码与特定平台的实现相互关联。这是通过 [platform channels][] 
完成的。

### Specifying a plugin's supported platforms {#plugin-platforms}

Starting Flutter version 1.10 plugins specify their supported platforms by adding keys to the
`platforms` map in the `pubspec.yaml` file. For example the following showd the `flutter:` map for the "hello" plugin:

```
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin

environment:
  sdk: ">=2.1.0 <3.0.0"
  # Flutter versions prior to 1.10 did not support the flutter.plugin.platforms map.
  flutter: ">=1.10.0 <2.0.0"
```

When adding plugin implementations for more platforms, the platforms map should be updated accordignly, e.g
this is what the map looks like for the hello plugin that supports Android, iOS, macOS, and Flutter Web:


```
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      macos:
        pluginClass: HelloPlugin
      web:
        pluginClass: HelloPlugin
        fileName: hello_web.dart

environment:
  sdk: ">=2.1.0 <3.0.0"
  # Flutter versions prior to 1.10 did not support the flutter.plugin.platforms map.
  flutter: ">=1.10.0 <2.0.0"
```

## Adding documentation

## 添加文档

It is recommended practice to add the following documentation to all packages:

建议将下列文档添加到所有 package 中：

1. A `README.md` file that introduces the package

   `README.md` 文件用来对 package 进行介绍

1. A `CHANGELOG.md` file that documents changes in each version

   `CHANGELOG.md` 文件用来记录每个版本的更改

1. A [`LICENSE`][] file containing the terms under which the package is licensed

   [`LICENSE`][] 文件用来阐述 package 的许可条款

1. API documentation for all public APIs (see below for details)

   API 文档包含所有的公共 API（详情参见下文）

### API documentation

### API 文档

When you publish a package, API documentation is automatically generated and
published to dartdocs.org, see for example the [device_info docs][].

当你提交一个 package 时，会自动生成 API 文档并将其提交到 dartdocs.org，示例请参见
[device_info docs]({{site.pub-api}}/device_info/latest)

If you wish to generate API documentation locally on your development machine, 
use the following commands:

如果你希望在本地开发环境中生成 API 文档，可以使用以下命令：

1. Change directory to the location of your package:

   将当前工作目录切换到 package 所在目录：

   `cd ~/dev/mypackage`

1. Tell the documentation tool where the Flutter SDK is (change to reflect where you placed it):

   告知文档工具 Flutter SDK 所在位置（更改以反应它所在的位置）：

   `export FLUTTER_ROOT=~/dev/flutter` (on macOS or Linux)

   `export FLUTTER_ROOT=~/dev/flutter`（适用于 macOS 或 Linux 操作系统）

   `set FLUTTER_ROOT=~/dev/flutter` (on Windows)

   `set FLUTTER_ROOT=~/dev/flutter`（适用于 Windows 操作系统）

1. Run the `dartdoc` tool (comes as part of the Flutter SDK):

   运行 `dartdoc` 工具（作为 Flutter SDK 的一部分）：

   `$FLUTTER_ROOT/bin/cache/dart-sdk/bin/dartdoc` (on macOS or Linux)

   `$FLUTTER_ROOT/bin/cache/dart-sdk/bin/dartdoc`（适用于 macOS 或 Linux 操作系统）

   `%FLUTTER_ROOT%\bin\cache\dart-sdk\bin\dartdoc` (on Windows)

   `%FLUTTER_ROOT%\bin\cache\dart-sdk\bin\dartdoc`（适用于 Windows 操作系统）

For tips on how to write API documentation, see 
[Effective Dart: Documentation][].

关于如何编写 API 文档的建议，请参阅 
[高效 Dart 指南][Effective Dart: Documentation]。

### Adding licenses to the LICENSE file

### 将许可证添加到 LICENSE 文件中

Individual licenses inside each LICENSE file should be separated by 80
hyphens on their own on a line.

每个 LICENSE 文件中的各个许可证应由 80 个短线字符组成的线段进行分割。

If a LICENSE file contains more than one component license, then each
component license must start with the names of the packages to which the
component license applies, with each package name on its own line, and the
list of package names separated from the actual license text by a blank
line. (The packages need not match the names of the pub package. For
example, a package might itself contain code from multiple third-party
sources, and might need to include a license for each one.)

如果 LICENSE 文件中包含多个组件许可证，那么每个组件许可证必须以其所在 package
的名称开始，每个 package 名称单独一行显示，并且 package
名称列表与实际许可证内容由空行隔开。（package 名称无需与 pub package 相匹配。比如，一个
package 可能包含多个第三方代码，并且可能需要为每个 package 添加许可证。）

Good:

正确：
```
package_1

<some license text>

--------------------------------------------------------------------------------
package_2

<some license text>
```

Also good:

正确：
```
package_1

<some license text>

--------------------------------------------------------------------------------
package_1
package_2

<some license text>
```

Bad:

不正确：
```
<some license text>

--------------------------------------------------------------------------------
<some license text>
```

Also bad:

不正确：
```
package_1

<some license text>
--------------------------------------------------------------------------------
<some license text>
```

## Publishing packages {#publish}

## 提交 package {#publish}

Once you have implemented a package, you can publish it on the
[pub.dev][], so that other developers can
easily use it.

一旦完成了 package 的实现，你便可以将其提交到 [pub.dev][]
上，以便其他开发者可以轻松地使用它。

Prior to publishing, make sure to review the `pubspec.yaml`, `README.md`, and
`CHANGELOG.md` files to make sure their content is complete and correct. 
Also, to improve the quality and usability of your package, 
consider including the items below.

发布你的 package 之前，确保检查了这几个文件：`pubspec.yaml`、`README.md` 和
`CHANGELOG.md`，确保它们完整且争取，另外，为了提高 package 的可用性，
可以考虑加入如下的内容：

* Diverse code usage examples
 
  代码的示例用法

* Screenshots, animated gifs, or videos

  屏幕截图，GIF 动画或者视频

* A link to the corresponding code repository

  代码库的正确指向链接

提交之前，请确保 `pubspec.yaml`、`README.md` 以及
`CHANGELOG.md` 文件已被审查，以保证其内容的完整性和正确性。

Next, run the dry-run command to see if everything passes analysis:

接下来，运行 dry-run 命令以检验是否所有内容都通过了分析：

```terminal
$ flutter pub publish --dry-run
```

Finally, run the actual publish command:

最后，运行以下提交命令：

```terminal
$ flutter pub publish
```

For details on publishing, see the
[publishing docs][] for pub.dev.

有关提交的详细信息，请查阅关于 Pub 站点的 [提交文档]({{site.dart-site}}/tools/pub/publishing)。

## Handling package interdependencies {#dependencies}

## Package 依赖处理 {#dependencies}

If you are developing a package `hello` that depends on the Dart API exposed
by another package, you need to add that package to the `dependencies`
section of your `pubspec.yaml` file.  The code below makes the Dart API
of the `url_launcher` plugin available to `hello`:

如果你正在开发的 `hello` 依赖于另外一个 package 所公开的 Dart API，你需要将该 package
添加到文件 `pubspec.yaml` 的 `dependencies` 段中。以下代码使得插件 `url_launcher` 的
Dart API 在 `hello` 中可用：

In `hello/pubspec.yaml`:

在 `hello/pubspec.yaml` 文件中：

```yaml
dependencies:
  url_launcher: ^0.4.2
```

You can now `import 'package:url_launcher/url_launcher.dart'` and `launch(someUrl)` in
the Dart code of `hello`.

现在你可以在 `hello` 的 Dart 代码中使用
`import 'package:url_launcher/url_launcher.dart'` 和 `launch(someUrl)`。

This is no different from how you include packages in Flutter apps or any other Dart project.

这与你在 Flutter 应用或其他任何 Dart 项目中引入 package 的方式没什么区别。

But if `hello` happens to be a _plugin_ package whose platform-specific code needs access
to the platform-specific APIs exposed by `url_launcher`, you also need to add
suitable dependency declarations to your platform-specific build files, as shown below.

但碰巧 `hello` 是一个 **原生插件** package，其特定的平台代码如果需要访问 `url_launcher`
所公开的平台特定 API，那么还需要为特定平台的构建文件添加适当的依赖说明，如下所示：

### Android

In `hello/android/build.gradle`:

在 `hello/android/build.gradle` 文件中：

```groovy
android {
    // lines skipped
    dependencies {
        provided rootProject.findProject(":url_launcher")
    }
}
```
You can now `import io.flutter.plugins.urllauncher.UrlLauncherPlugin` and access the `UrlLauncherPlugin`
class in the source code at `hello/android/src`.

现在你可以在 `hello/android/src` 目录下的源代码文件中使用
`import io.flutter.plugins.urllauncher.UrlLauncherPlugin` 并访问类 `UrlLauncherPlugin`。

### iOS

In `hello/ios/hello.podspec`:

在 `hello/ios/hello.podspec` 文件中：

```ruby
Pod::Spec.new do |s|
  # lines skipped
  s.dependency 'url_launcher'
```
You can now `#import "UrlLauncherPlugin.h"` and access the `UrlLauncherPlugin` class in the source code
at `hello/ios/Classes`.

现在你可以在 `hello/ios/Classes` 目录下的源代码文件中使用 `#import "UrlLauncherPlugin.h"` 
并访问 `UrlLauncherPlugin` 这个类了。

[`battery`]: {{site.pub}}/packages/battery
[Dart library package]: {{site.dart-site}}/guides/libraries/create-library-packages
[device_info docs]: {{site.pub-api}}/device_info/latest
[Effective Dart Documentation]: {{site.dart-site}}/guides/language/effective-dart/documentation
[`fluro`]: {{site.pub}}/packages/fluro
[Flutter editor]: /docs/get-started/editor
[issue #33302]: https://github.com/flutter/flutter/issues/33302
[`LICENSE`]: #adding-licenses-to-the-license-file
[`path`]: {{site.pub}}/packages/path
[platform channels]: /docs/development/platform-integration/platform-channels
[pub.dev]: {{site.pub}}
[publishing docs]: {{site.dart-site}}/tools/pub/publishing
[Writing a good plugin]: {{site.flutter-medium}}/writing-a-good-flutter-plugin-1a561b986c9c
[unit tests]: /docs/testing#unit-tests
