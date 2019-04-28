---
title: Developing packages & plugins
title: Flutter Package 的开发和提交
short-title: Developing
short-title: 开发和提交
description: How to write packages and plugins for Flutter.
description: 如何编写和提交你的 Packages。
---

## Package 介绍

通过 Package 可以创建易于共享的模块化代码。一个最基本的 package 由以下内容构成：

* `pubspec.yaml` 文件：用于定义 package 名称、版本号、作者等其他信息的元数据文件。

* 包含共享代码的 `lib` 目录，其中至少包含一个 `<package-name>.dart` 文件。

{{site.alert.note}}
  有关编写高效插件的注意事项列表，请参考 Medium 上的文章：[Writing a good
  plugin]({{site.flutter-medium}}/writing-a-good-flutter-plugin-1a561b986c9c)。
{{site.alert.end}}

### Package 类别 {#types}

Package 可以包含以下几种类别：

* Dart package：用 Dart 编写的传统 package，比如
  [`path`]({{site.pub}}/packages/path)。其中一些可能包含 Flutter
  的特定功能，因此依赖于 Flutter 框架，其使用范围仅限于 Flutter，比如
  [`fluro`]({{site.pub}}/packages/fluro)。

* 插件 package：包含使用 Dart 编写的 API，针对 Android（使用 Java 或 Kotlin）和/或
  iOS（使用 ObjC 或 Swift）特定平台的实现。一个具体的例子是
  [`battery`]({{site.pub}}/packages/battery)。

## 开发 Dart packages {#dart}

### 第一步：创建 package

想要创建 Dart package，请使用带有 `--template=package` 标志的 `flutter create` 命令：

```terminal
$ flutter create --template=package hello
```

这将在 `hello/` 目录下创建一个 package 项目，其中包含以下内容：

* `lib/hello.dart`：
   - package 的 Dart 实现代码。
* `test/hello_test.dart`：
   - package 的 [单元测试](/docs/testing#unit-testing)。

### 第二步：实现 package

对于纯粹的 Dart package，只要在 `lib/<package name>.dart` 文件中添加功能实现，或在 `lib`
目录中的多个文件中添加功能实现。

如果要对 package 进行测试，在 `test` 目录下添加 [单元测试](/docs/testing#unit-testing)。

关于如何组织 package 内容的更多详细信息，请参考 [Dart library
package]({{site.dart-site}}/guides/libraries/create-library-packages) 文档。

## 开发插件 package {#plugin}

如果想要开发一个调用特定平台 API 的 package，你需要开发一个插件 packgae。插件 packgae
是 Dart package 的特别版本，除了上述内容外，它还包含为 Android（使用 Java 或 Kotlin）、
iOS（使用 Objective-C 或 Swift）或两者编写的特定于平台的实现。API 使用 [platform
channel](/docs/development/platform-integration/platform-channels)
来关联到特定平台。

### 第一步：创建 package

想要创建插件 package，请使用带有 `--template=plugin` 标志的 `flutter create` 命令。

使用 `--org` 选项，以反向域名表示法来指定你的组织。该值用于生成的 Android 及
iOS 代码中的各种 package 和 package 标识符。

```terminal
$ flutter create --org com.example --template=plugin hello
```

这将在 `hello/` 目录下创建一个插件项目，其中包含以下内容：

* `lib/hello.dart`：
   - Dart 插件 API 实现。
* <code>android/src/main/java/com/example/&#8203;hello/HelloPlugin.java</code>：
   - Android 平台插件 API 实现。
* `ios/Classes/HelloPlugin.m`：
   - iOS 平台插件 API 实现。
* `example/`：
   - 一个依赖于该插件并说明了如何使用它的 Flutter 应用。

默认情况下，插件项目中 iOS 代码使用 Objective-C 编写，Android 代码使用
Java 编写。如果你更喜欢 Swift 或 Kotlin，你可以通过 `-i` 指定 iOS 所使用的语言和/或使用
`-a` 指定 Android 所使用的语言。比如：

```terminal
$ flutter create --template=plugin -i swift -a kotlin hello
```

### 第二步：实现 package {#edit-plugin-package}

由于插件 package 包含使用多种编程语言编写的多个平台代码，因此需要一些特定步骤来保证体验的流畅性。

#### 步骤 2a：定义 package API（.dart）

插件 package 的 API 在 Dart 代码中定义。使用你钟爱的 [Flutter 编辑器](/docs/get-started/editor)，
打开 `hello/` 主目录，并找到 `lib/hello.dart` 文件。

#### 步骤 2b：添加 Android 平台代码（.java/.kt）

我们建议你使用 Android Studio 来编辑 Android 代码。

使用 Android Studio 编辑 Android 平台代码之前，首先确保代码至少被构建过一次（即从
IDE/编辑器执行示例程序，或在终端中执行以下命令：`cd hello/example; flutter build apk`）。

接下来，

1. 启动 Android Studio
1. 在“Welcome to Android Studio”对话框中选择“Import project”，或在菜单中选择“File > New > Import Project...”，
然后选择 `hello/example/android/build.gradle` 文件。
1. 在“Gradle Sync”对话框中，选择“OK”。
1. 在“Android Gradle Plugin Update”对话框中，选择“Don't remind me again
   for this project”。

插件的 Android 平台代码位于
<code>hello/java/com.example.hello/&#8203;HelloPlugin</code>。

你可以在 Android Studio 中点击 &#9654; 按钮来运行示例程序。

#### 步骤 2c：添加 iOS 平台代码（.h+.m/.swift）

我们建议你使用 Xcode 来编辑 iOS 代码。

使用 Xcode 编辑 iOS 平台代码之前，首先确保代码至少被构建过一次（即从
IDE/编辑器执行示例程序，或在终端中执行以下命令：`cd hello/example; flutter build ios --no-codesign`）。

下一步，

1. 启动 Xcode
1. 选择“File > Open”， 然后选择 `hello/example/ios/Runner.xcworkspace` 文件。

插件的 iOS 平台代码位于项目导航中的 `Pods/Development
Pods/hello/Classes/`。

你可以点击 &#9654; 按钮来运行示例程序。

#### 步骤 2d：关联 API 和平台代码

最后，你需要将 Dart 编写的 API 代码与特定平台的实现相互关联。这是通过 [platform
channel](/docs/development/platform-integration/platform-channels) 完成的。

## 添加文档

建议将下列文档添加到所有 package 中：

1. `README.md` 文件用来对 package 进行介绍
1. `CHANGELOG.md` 文件用来记录每个版本的更改
1. `LICENSE` 文件用来阐述 package 的许可条款
1. API 文档包含所有的公共 API（详情参见下文）

### API 文档

当你提交一个 package 时，会自动生成 API 文档并将其提交到 dartdocs.org，示例请参见
[device_info docs]({{site.pub-api}}/device_info/latest)

如果你希望在本地开发环境中生成 API 文档，可以使用以下命令：

1. 将当前工作目录切换到 package 所在目录：

   `cd ~/dev/mypackage`

1. 告知文档工具 Flutter SDK 所在位置（更改以反应它所在的位置）：

   `export FLUTTER_ROOT=~/dev/flutter`（macOS 或 Linux 下）

   `set FLUTTER_ROOT=~/dev/flutter`（Windows 下）

1. 运行 `dartdoc` 工具（作为 Flutter SDK 的一部分）：

   `$FLUTTER_ROOT/bin/cache/dart-sdk/bin/dartdoc`（macOS 或 Linux 下）

   `%FLUTTER_ROOT%\bin\cache\dart-sdk\bin\dartdoc`（Windows 下）

关于如何编写 API 文档的建议，请参阅 [Effective Dart:
Documentation]({{site.dart-site}}/guides/language/effective-dart/documentation)。

## 提交 package {#publish}

一旦完成了 package 的实现，你便可以将其提交到 [Pub site]({{site.pub}})
上，以便其他开发者可以轻松地使用它。

提交之前，请确保 `pubspec.yaml`、`README.md` 以及
`CHANGELOG.md` 文件已被审查，以保证其内容的完整性和正确性。

接下来，运行 dry-run 命令以检验是否所有内容都通过了分析：

```terminal
$ flutter packages pub publish --dry-run
```

最后，运行以下提交命令：

```terminal
$ flutter packages pub publish
```

有关提交的详细信息，请查阅关于 Pub 站点的 [提交文档]({{site.dart-site}}/tools/pub/publishing)。

## Package 依赖处理 {#dependencies}

如果你正在开发的 `hello` 依赖于另外一个 package 所公开的 Dart API，你需要将该 package
添加到文件 `pubspec.yaml` 的 `dependencies` 段中。以下代码使得插件 `url_launcher` 的
Dart API 在 `hello` 中可用：

在 `hello/pubspec.yaml` 文件中：
```yaml
dependencies:
  url_launcher: ^0.4.2
```

现在你可以在 `hello` 的 Dart 代码中使用
`import 'package:url_launcher/url_launcher.dart'` 和 `launch(someUrl)`。

这与你在 Flutter 应用或其他任何 Dart 项目中引入 package 的方式没什么区别。

但碰巧 `hello` 是一个**插件** package，其特定的平台代码如果需要访问 `url_launcher`
所公开的平台特定 API，那么还需要为特定平台的构建文件添加适当的依赖说明，如下所示：

### Android

在 `hello/android/build.gradle` 文件中：
```groovy
android {
    // lines skipped
    dependencies {
        provided rootProject.findProject(":url_launcher")
    }
}
```
现在你可以在 `hello/android/src` 目录下的源代码文件中使用
`import io.flutter.plugins.urllauncher.UrlLauncherPlugin` 并访问类 `UrlLauncherPlugin`。

### iOS

在 `hello/ios/hello.podspec` 文件中：
```ruby
Pod::Spec.new do |s|
  # lines skipped
  s.dependency 'url_launcher'
```
现在你可以在 `hello/ios/Classes` 目录下的源代码文件中使用 `#import "UrlLauncherPlugin.h"` 并访问类 `UrlLauncherPlugin`。

### 冲突解决

假设你想在 `hello` package 中使用 `some_package` 和
`other_package`，且它们依赖于不同版本的 `url_launcher`。于是我们便有了潜在的冲突。避免这种情况的最好方法是 package
的作者在指定依赖项时使用 [版本范围]({{site.dart-site}}/tools/pub/dependencies#version-constraints) 而非特定版本。

```yaml
dependencies:
  url_launcher: ^0.4.2    # Good, any 0.4.x with x >= 2 will do.
  image_picker: '0.1.1'   # Not so good, only 0.1.1 will do.
```

如果 `some_package` 声明了以上依赖，并且 `other_package` 声明了一个兼容的
`url_launcher` 依赖项，如 `'0.4.5'` 或 `^0.4.0`，`pub` 能够自动解决冲突问题。类似的注解也适用于插件
package 特定平台 [Gradle modules][] 和/或 [CocoaPods][] 的依赖关系。


即使 `some_package` 和 `other_package` 声明了不兼容的 `url_launcher`
版本，它们实际上仍可能以兼容的方式使用 `url_launcher`。可在 `hello` 中的
`pubspec.yaml` 文件中添加一个依赖覆盖声明来强制使用特定版本，从而处理冲突。

在 `hello/pubspec.yaml` 中强制使用版本为 `0.4.3` 的 `url_launcher`：

```yaml
dependencies:
  some_package:
  other_package:
dependency_overrides:
  url_launcher: '0.4.3'
```

如果依赖冲突项不是 package 自身，而是如 `guava` 这样特定于 Android 的库，那么依赖的覆盖声明必须添加到
Gradle 的构建逻辑中。

在 `hello/android/build.gradle` 中强制使用版本为 `23.0` 的 `guava`：

```groovy
configurations.all {
    resolutionStrategy {
        force 'com.google.guava:guava:23.0-android'
    }
}
```

CocoaPods 目前尚不提供依赖项覆盖功能。

[CocoaPods]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Gradle modules]: https://docs.gradle.org/current/userguide/introduction_dependency_management.html
