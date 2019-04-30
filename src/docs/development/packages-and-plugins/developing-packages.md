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
  plugin]({{site.flutter-medium}}/writing-a-good-flutter-plugin-1a561b986c9c)
  on Medium.

  有关编写高效插件的注意事项列表，请参考 Medium 上的文章：[Writing a good
  plugin]({{site.flutter-medium}}/writing-a-good-flutter-plugin-1a561b986c9c)。

{{site.alert.end}}

### Package types {#types}

### Package 类别 {#types}

Packages can contain several kinds of content:

Package 包含以下两种类别：

* *Dart packages*: General packages written in Dart, for example the
  [`path`]({{site.pub}}/packages/path) package. Some of these may
  contain Flutter specific functionality and thus have a dependency on the
  Flutter framework, restricting their use to Flutter only, for example the
  [`fluro`]({{site.pub}}/packages/fluro) package.

  纯 Dart 库：用 Dart 编写的传统 package，比如
  [`path`]({{site.pub}}/packages/path)。其中一些可能包含 Flutter
  的特定功能，因此依赖于 Flutter 框架，其使用范围仅限于 Flutter，比如
  [`fluro`]({{site.pub}}/packages/fluro)。

* *Plugin packages*: A specialized Dart package which contain an API written in
  Dart code combined with a platform-specific implementation for Android (using
  Java or Kotlin), and/or for iOS (using ObjC or Swift). A concrete example is
  the [`battery`]({{site.pub}}/packages/battery) plugin package.

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

* `lib/hello.dart`:
   - The Dart code for the package.
     
     package 的 Dart 实现代码。

* `test/hello_test.dart`:
   - The [unit tests](/docs/testing#unit-testing) for the package.
     
     Package 的 [单元测试](/docs/testing#unit-testing)。
     
### Step 2: Implement the package

### 第二步：实现 package

For pure Dart packages, simply add the functionality inside the main
`lib/<package name>.dart` file, or in several files in the `lib` directory.

对于纯 Dart 库的 package，只要在 `lib/<package name>.dart` 文件中添加功能实现，或在 `lib`
目录中的多个文件中添加功能实现。

To test the package, add [unit tests](/docs/testing#unit-testing)
in a `test` directory.

如果要对 package 进行测试，在 `test` 目录下添加 [单元测试](/docs/testing#unit-testing)。

For additional details on how to organize the package contents, see the
[Dart library
package]({{site.dart-site}}/guides/libraries/create-library-packages)
documentation.

关于如何组织 package 内容的更多详细信息，请参考 [Dart library
package]({{site.dart-site}}/guides/libraries/create-library-packages) 文档。

## Developing plugin packages {#plugin}

## 开发原生插件类型的 packages {#plugin}

If you want to develop a package that calls into platform-specific APIs, you
need to develop a plugin package. A plugin package is a specialized version of a
Dart package, that in addition to the content described above also contains
platform-specific implementations written for Android (Java or Kotlin code), for
iOS (Objective-C or Swift code), or for both. The API is connected to the
platform-specific implementation(s) using [platform
channels](/docs/development/platform-integration/platform-channels).

如果想要开发一个调用特定平台 API 的 package，你需要开发一个原生插件 packgae。原生插件 packgae
是 Dart package 的特别版本，除了要实现 Dart package 要实现的内容，还需要按需使用
Java 或 Kotlin、ObjC 或 Swift 分别在 Android 和/或 iOS 平台实现，你可以使用 [platform
channel](/docs/development/platform-integration/platform-channels) API 来实现特定平台的调用。

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

* <code>android/src/main/java/com/example/&#8203;hello/HelloPlugin.java</code>:
   - The Android platform specific implementation of the plugin API.
     
     Android 平台原生插件 API 实现。

* `ios/Classes/HelloPlugin.m`:
   - The iOS platform specific implementation of the plugin API.
     
     iOS 平台原生插件 API 实现。     

* `example/`:
   - A Flutter app that depends on the plugin, and illustrates how to use it.
   
     一个依赖于该插件并说明了如何使用它的 Flutter 应用。

By default, the plugin project uses Objective-C for iOS code and
Java for Android code. If you prefer Swift or Kotlin, you can specify the
iOS language using `-i` and/or the Android language using `-a`. For example:

默认情况下，插件项目中 iOS 代码使用 Objective-C 编写，Android 代码使用
Java 编写。如果你更喜欢 Swift 或 Kotlin，你可以通过 `-i` 指定 iOS 所使用的语言和/或使用
`-a` 指定 Android 所使用的语言。比如：

```terminal
$ flutter create --template=plugin -i swift -a kotlin hello
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
folder in your favorite [Flutter editor](/docs/get-started/editor). Locate the file
`lib/hello.dart`.

原生插件类型 package 的 API 在 Dart 代码中要首先定义好，使用你钟爱的 [Flutter 编辑器](/docs/get-started/editor)，
打开 `hello/` 主目录，并找到 `lib/hello.dart` 文件。

#### Step 2b: Add Android platform code (.java/.kt)

#### 步骤 2b：添加 Android 平台代码（.java/.kt）

We recommend you edit the Android code using Android Studio.

我们建议你使用 Android Studio 来编辑 Android 代码。

Before editing the Android platform code in Android Studio, first make sure that
the code has been built at least once (i.e., run the example app from your IDE/editor,
or in a terminal execute `cd hello/example; flutter build apk`).

使用 Android Studio 编辑 Android 平台代码之前，首先确保代码至少被构建过一次（即从
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
implementations. This is done using [platform
channels](/docs/development/platform-integration/platform-channels).

最后，你需要将 Dart 编写的 API 代码与特定平台的实现相互关联。这是通过 [platform
channel](/docs/development/platform-integration/platform-channels) 完成的。

## Adding documentation

## 添加文档

It is recommended practice to add the following documentation to all packages:

建议将下列文档添加到所有 package 中：

1. A `README.md` file that introduces the package

   `README.md` 文件用来对 package 进行介绍

1. A `CHANGELOG.md` file that documents changes in each version

   `CHANGELOG.md` 文件用来记录每个版本的更改

1. A `LICENSE` file containing the terms under which the package is licensed

   `LICENSE` 文件用来阐述 package 的许可条款

1. API documentation for all public APIs (see below for details)

   API 文档包含所有的公共 API（详情参见下文）

### API documentation

### API 文档

When you publish a package, API documentation is automatically generated and
published to dartdocs.org, see for example the [device_info
docs]({{site.pub-api}}/device_info/latest)

当你提交一个 package 时，会自动生成 API 文档并将其提交到 dartdocs.org，示例请参见
[device_info docs]({{site.pub-api}}/device_info/latest)

If you wish to generate API documentation locally on your developement machine, use the following commands:

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

For tips on how to write API documentation, see [Effective Dart:
Documentation]({{site.dart-site}}/guides/language/effective-dart/documentation).

关于如何编写 API 文档的建议，请参阅 [Effective Dart:
Documentation]({{site.dart-site}}/guides/language/effective-dart/documentation)。

## Publishing packages {#publish}

## 提交 package {#publish}

Once you have implemented a package, you can publish it on the
[Pub site]({{site.pub}}), so that other developers can
easily use it.

一旦完成了 package 的实现，你便可以将其提交到 [Pub site]({{site.pub}})
上，以便其他开发者可以轻松地使用它。

Prior to publishing, make sure to review the `pubspec.yaml`, `README.md`, and
`CHANGELOG.md` files to make sure their content is complete and correct.

提交之前，请确保 `pubspec.yaml`、`README.md` 以及
`CHANGELOG.md` 文件已被审查，以保证其内容的完整性和正确性。

Next, run the dry-run command to see if everything passes analysis:

接下来，运行 dry-run 命令以检验是否所有内容都通过了分析：

```terminal
$ flutter packages pub publish --dry-run
```

Finally, run the actual publish command:

最后，运行以下提交命令：

```terminal
$ flutter packages pub publish
```

For details on publishing, see the
[publishing docs]({{site.dart-site}}/tools/pub/publishing).
for the Pub site.

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

现在你可以在 `hello/ios/Classes` 目录下的源代码文件中使用 `#import "UrlLauncherPlugin.h"` 并访问类 `UrlLauncherPlugin`。

### Conflict resolution

### 冲突解决

Suppose you want to use `some_package` and `other_package` in your package
`hello`, and both of these depend on `url_launcher`, but in different
versions. Then we have a potential conflict. The best way to avoid this
is for package authors to use [version
ranges]({{site.dart-site}}/tools/pub/dependencies#version-constraints)
rather than specific versions when specifying dependencies.

假设你想在 `hello` package 中使用 `some_package` 和
`other_package`，且它们依赖于不同版本的 `url_launcher`。于是我们便有了潜在的冲突。避免这种情况的最好方法是 package
的作者在指定依赖项时使用 [版本范围]({{site.dart-site}}/tools/pub/dependencies#version-constraints) 而非特定版本。

```yaml
dependencies:
  url_launcher: ^0.4.2    # Good, any 0.4.x with x >= 2 will do.
  image_picker: '0.1.1'   # Not so good, only 0.1.1 will do.
```

If `some_package` declares the dependencies above and `other_package`
declares a compatible  `url_launcher` dependency like `'0.4.5'` or `^0.4.0`,
`pub` is able to resolve the issue automatically. Similar
remarks apply to plugin packages' platform-specific dependencies on
[Gradle modules][] and/or [CocoaPods][].

如果 `some_package` 声明了以上依赖，并且 `other_package` 声明了一个兼容的
`url_launcher` 依赖项，如 `'0.4.5'` 或 `^0.4.0`，`pub` 能够自动解决冲突问题。类似的注解也适用于插件
package 特定平台 [Gradle modules][] 和/或 [CocoaPods][] 的依赖关系。

Even if `some_package` and `other_package` declare incompatible versions for
`url_launcher`, it may still be that they actually use `url_launcher` in
compatible ways. Then the conflict can be dealt with by adding
a dependency override declaration to the `pubspec.yaml` file in `hello`,
forcing the use of a particular version.

即使 `some_package` 和 `other_package` 声明了不兼容的 `url_launcher`
版本，它们实际上仍可能以兼容的方式使用 `url_launcher`。可在 `hello` 中的
`pubspec.yaml` 文件中添加一个依赖覆盖声明来强制使用特定版本，从而处理冲突。

Forcing the use of `url_launcher` version `0.4.3` in `hello/pubspec.yaml`:

在 `hello/pubspec.yaml` 中强制使用版本为 `0.4.3` 的 `url_launcher`：

```yaml
dependencies:
  some_package:
  other_package:
dependency_overrides:
  url_launcher: '0.4.3'
```

If the conflicting dependency is not itself a package,
but an Android-specific library like `guava`, the dependency override
declaration must be added to Gradle build logic instead.

如果依赖冲突项不是 package 自身，而是如 `guava` 这样特定于 Android 的库，那么依赖的覆盖声明必须添加到
Gradle 的构建逻辑中。

Forcing the use of `guava` version `23.0` in `hello/android/build.gradle`:

在 `hello/android/build.gradle` 中强制使用版本为 `23.0` 的 `guava`：

```groovy
configurations.all {
    resolutionStrategy {
        force 'com.google.guava:guava:23.0-android'
    }
}
```

CocoaPods does not currently offer dependency override functionality.

CocoaPods 目前尚不提供依赖项覆盖功能。

[CocoaPods]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Gradle modules]: https://docs.gradle.org/current/userguide/introduction_dependency_management.html
