---
# title: Using packages
title: 在 Flutter 里使用 Packages
# description: How to use packages in your Flutter app.
description: 如何在你的 Flutter 应用里使用 Packages。
tags: Packages,插件
keywords: 使用packages,Flutter第三方库
---

<?code-excerpt path-base="platform_integration/plugin_api_migration"?>

Flutter supports using shared packages contributed by other developers
to the Flutter and Dart ecosystems. This allows quickly building
an app without having to develop everything from scratch.

Flutter 支持使用其他开发者向 Flutter 和 Dart 生态系统贡献的共享 package，
这意味着你可以快速构建应用而不是一切从零开始。

:::note Package 和插件 (plugin) 的区别
<!-- Difference between packages and plugins -->

A plugin is a _type_ of
package&mdash;the full designation is _plugin package_,
which is generally shortened to _plugin_.

插件 (plugin) 是 package 的一种，全称是 plugin package，
我们简称为 plugin，中文叫插件。

**Packages**
<br> At a minimum, a Dart package is a directory
  containing a `pubspec.yaml` file. Additionally,
  a package can contain dependencies
  (listed in the pubspec), Dart libraries, apps,
  resources, tests, images, fonts, and examples.
  The [pub.dev][] site lists many packages—developed by Google engineers
  and generous members of the Flutter and Dart community—
  that you can use in your app.
  
**Packages**
<br> Dart package 最低要求是包含一个 `pubspec.yaml` 文件。
  此外，一个 package 可以包含依赖关系 (在 `pubspec.yaml` 文件里声明)、
  Dart 库、应用、资源、字体、测试、图片和例子等。
  [pub.dev][] 上列出了很多 package，由 Google 工程师和
  Flutter 和 Dart 社区的开发者开发和发布，你可以用在自己的应用里。

**Plugins**
<br> A plugin package is a special kind of package that makes
  platform functionality available to the app.
  Plugin packages can be written for Android (using Kotlin or Java),
  iOS (using Swift or Objective-C), web, macOS, Windows, Linux,
  or any combination thereof.
  For example, a plugin might provide Flutter apps
  with the ability to use a device's camera.

**Plugins**
<br> 插件 (plugin package) 是一种特别的 package，特别指
  那些帮助你获得原生平台特性的 package。
  插件可以为 Android (使用 Kotlin 或 Java 语言)、
  iOS (使用 Swift 或 Objective-C 语言)、Web、macOS、Windows、Linux 平台，
  或其任意组合的平台编写。
  比如：某个插件可以为 Flutter 应用提供使用原生平台的摄像头的功能。

<iframe width="560" height="315" src="{{site.bili.embed}}?bvid=BV1dY4y1r7xD&page=1&autoplay=false" title="了解 package 和 plugin 的区别 | Decoding Flutter" {{site.bili.set}}></iframe>

:::

Existing packages enable many use cases—for example,
making network requests ([`http`][]),
navigation/route handling ([`go_router`][]),
integration with device APIs
([`url_launcher`][] and [`battery_plus`][]),
and using third-party platform SDKs like Firebase
([FlutterFire][]).

现有的 package 支持许多使用场景，例如，网络请求 ([`http`][])，
自定义导航/路由处理 ([`go_router`][])，集成设备 API（如 [`url_launcher`][] 和
[`battery_plus`][]，以及使用第三方平台的 SDK（如 Firebase 的 ([FlutterFire][])。

To write a new package, see [developing packages][].
To add assets, images, or fonts,
whether stored in files or packages,
see [Adding assets and images][].

如果你正打算开发新的 package，请参阅
[Flutter Packages 的开发和提交][developing packages]。
如果你想添加资源、图片或字体，无论是存储在文件中还是 package 中，
请参阅 [添加资源和图片][Adding assets and images] 这篇文档。

[Adding assets and images]: /ui/assets/assets-and-images
[`battery_plus`]: {{site.pub-pkg}}/battery_plus
[developing packages]: /packages-and-plugins/developing-packages
[FlutterFire]: {{site.github}}/firebase/flutterfire

[`go_router`]: {{site.pub-pkg}}/go_router
[`http`]: /cookbook/networking/fetch-data
[pub.dev]: {{site.pub}}
[`url_launcher`]: {{site.pub-pkg}}/url_launcher

## Using packages

## 使用 package

The following section describes how to use
existing published packages.

下面的内容将为你描述如何使用已经发布了的 packages。

### Searching for packages

### 搜索 package

Packages are published to [pub.dev][].

Package 会被发布到 [pub.dev][] 网站上。

The [Flutter landing page][] on pub.dev displays
top packages that are compatible with Flutter
(those that declare dependencies generally compatible with Flutter),
and supports searching among all published packages.

Pub 网站上的 [Flutter 页面][Flutter landing page] 
展示了与 Flutter 兼容的 package（即声明的依赖通常与 Flutter 兼容），
并且所有已发布的 package 都支持搜索。

The [Flutter Favorites][] page on pub.dev lists
the plugins and packages that have been identified as
packages you should first consider using when writing
your app. For more information on what it means to
be a Flutter Favorite, see the
[Flutter Favorites program][].

Pub.dev 上的 [Flutter Favorites][] 页面列出了一系列编写应用时
可以首先考虑使用的插件和 package，关于这个项目的更多信息，请
查看 [Flutter Favorites 项目][Flutter Favorites program] 页面。

You can also browse the packages on pub.dev by filtering
on [Android][], [iOS][], [web][],
[Linux][], [Windows][], [macOS][],
or any combination thereof.

在 pub.dev 网站上你可以同时过滤出适合
[Android][]、[iOS][]、[Web][web]、[Linux][]、
[Windows][] 或 [macOS][] 的插件，
你也可以通过复选框，过滤出组合结果（适配一个或者多个平台）。

[Android]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Aandroid
[Flutter Favorites]: {{site.pub}}/flutter/favorites
[Flutter Favorites program]: /packages-and-plugins/favorites
[Flutter landing page]: {{site.pub}}/flutter
[Linux]: {{site.pub-pkgs}}?q=sdk%3Aflutter+platform%3Alinux
[iOS]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Aios
[macOS]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Amacos
[web]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Aweb
[Windows]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Awindows

### Adding a package dependency to an app using `flutter pub add`

To add the package `css_colors` to an app:

1. Use the [`pub add`][] command from inside the project directory
   * `flutter pub add css_colors`

1. Import it
   * Add a corresponding `import` statement in the Dart code.

1. Stop and restart the app, if necessary
   * If the package brings platform-specific code
     (Kotlin/Java for Android, Swift/Objective-C for iOS),
     that code must be built into your app.
     Hot reload and hot restart only update the Dart code,
     so a full restart of the app might be required to avoid
     errors like `MissingPluginException` when using the package.

[`pub add`]: {{site.dart-site}}/tools/pub/cmd/pub-add

### Adding a package dependency to an app

### 将 package 依赖添加到应用

To add the package `css_colors` to an app:

要将 package 'css_colors' 添加到应用：

1. Depend on it

   添加依赖

   * Open the `pubspec.yaml` file located inside the app folder,
     and add `css_colors: ^1.0.0` under `dependencies`.

     打开应用文件夹下的 `pubspec.yaml` 文件，
     然后在 `pubspec.yaml` 下添加 `css_colors:`。

1. Install it

   安装

   * From the terminal: Run `flutter pub get`<br/>

     在命令行中运行：`flutter pub get`<br/>

   **OR**

   **或者**

   * From VS Code: Click **Get Packages** located in right side of the action
     ribbon at the top of `pubspec.yaml` indicated by the Download icon.

     在 VS Code 中点击位于 `pubspec.yaml` 文件顶部操作功能区右侧的 **Get Packages**

   * From Android Studio/IntelliJ: Click **Packages get** in the action
     ribbon at the top of `pubspec.yaml`.

     在 Android Studio/IntelliJ 中点击 `pubspec.yaml` 文件顶部操作功能区的 **Packages get**

1. Import it

   导入
   
   * Add a corresponding `import` statement in the Dart code.

     在 Dart 代码中添加相关的 `import` 语句。

1. Stop and restart the app, if necessary

   如果有必要，停止并重启应用

   * If the package brings platform-specific code
     (Kotlin/Java for Android, Swift/Objective-C for iOS),
     that code must be built into your app.
     Hot reload and hot restart only update the Dart code,
     so a full restart of the app might be required to avoid
     errors like `MissingPluginException` when using the package.

     如果 package 内有特定平台的代码（Android 的 Java/Kotlin,
     iOS 的 Swift/Objective-C），代码必须内置到你的应用内。
     热重载和热重启只对 package 的 Dart 代码执行此操作，
     所以你需要完全重启应用以避免使用 package 时
     出现 `MissingPluginException` 错误。

### Removing a package dependency to an app using `flutter pub remove`

### 使用 `flutter pub remove` 命令移除一个 package 依赖

To remove the package `css_colors` from an app:

若要将 package 'css_colors' 从工程中移除：

1. Use the [`pub remove`][] command from inside the project directory

   在工程的目录里执行 [`pub remove`][] 命令

   * `flutter pub remove css_colors`

The [Installing tab][],
available on any package page on pub.dev,
is a handy reference for these steps.

对于这些步骤，Pub 上任何 package 页面的
[Installing tab][] 选项卡都是一个很方便的参考。

For a complete example,
see the [css_colors example][] below.

完整示例，参阅下面的
[css_colors 示例][css_colors example]。

[css_colors example]: #css-example
[Installing tab]: {{site.pub-pkg}}/css_colors/install
[`pub remove`]: {{site.dart-site}}/tools/pub/cmd/pub-remove

### Conflict resolution

### 冲突解决

Suppose you want to use `some_package` and
`another_package` in an app,
and both of these depend on `url_launcher`,
but in different versions.
That causes a potential conflict.
The best way to avoid this is for package authors to use
[version ranges][] rather than specific versions when
specifying dependencies.

假设你想在应用中使用 `some_package` 和
`other_package`，并且它们依赖于不同版本的 `url_launcher`。
于是我们便有了潜在的冲突。避免这种情况的最好方法是 package
的作者在指定依赖项时使用 [版本范围][version ranges] 而非特定版本。

```yaml
dependencies:
  url_launcher: ^5.4.0    # Good, any version >= 5.4.0 but < 6.0.0
  image_picker: '5.4.3'   # Not so good, only version 5.4.3 works.
```

If `some_package` declares the dependencies above
and `another_package` declares a compatible
`url_launcher` dependency like `'5.4.6'` or
`^5.5.0`, pub resolves the issue automatically.
Platform-specific dependencies on
[Gradle modules][] and/or [CocoaPods][]
are solved in a similar way.

如果 `some_package` 声明了以上依赖，
并且 `another_package` 声明了一个兼容的
`url_launcher` 依赖项，如 `'5.4.6'` 或 `^5.5.0`，
pub 能够自动解决冲突问题。
[Gradle modules][] 和 [CocoaPods][]
也是用类似的方式解决平台依赖的。

Even if `some_package` and `another_package`
declare incompatible versions for `url_launcher`,
they might actually use `url_launcher` in
compatible ways. In this situation,
the conflict can be resolved by adding
a dependency override declaration to the app's
`pubspec.yaml` file, forcing the use of a particular version.

即使 `some_package` 和 `another_package` 声明了不兼容的 `url_launcher`
版本，它们实际上仍可能以兼容的方式使用 `url_launcher`。在这种情况下，可在
`pubspec.yaml` 文件中添加一个依赖覆盖声明来强制使用特定版本，从而处理冲突。

For example, to force the use of `url_launcher` version `5.4.0`,
make the following changes to the app's `pubspec.yaml` file:

为了强制使用版本为 `5.4.0` 的 `url_launcher`，
你可以对应用的 `pubspec.yaml` 文件做如下更改：

```yaml
dependencies:
  some_package:
  another_package:
dependency_overrides:
  url_launcher: '5.4.0'
```

If the conflicting dependency is not itself a package,
but an Android-specific library like `guava`,
the dependency override declaration must be added to
Gradle build logic instead.

如果依赖冲突项不是 package 自身，而是如 `guava` 这样特定于 Android 的库，
那么依赖的覆盖声明必须添加到 Gradle 的构建逻辑中。

To force the use of `guava` version `28.0`, make the following
changes to the app's `android/build.gradle` file:

为了强制使用版本为 `28.0` 的 `guava`，
你可以对 `android/build.gradle` 文件做如下更改：

```groovy
configurations.all {
    resolutionStrategy {
        force 'com.google.guava:guava:28.0-android'
    }
}
```

CocoaPods doesn't currently offer dependency
override functionality.

CocoaPods 目前尚不提供依赖项覆盖功能。

[CocoaPods]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Gradle modules]: https://docs.gradle.org/current/userguide/declaring_dependencies.html
[version ranges]: {{site.dart-site}}/tools/pub/dependencies#version-constraints

## Developing new packages

## 开发新的 package

If no package exists for your specific use case,
you can [write a custom package][].

如果某个 package 不适用于你的特定需求，
你可以 [开发新的自定义 package][write a custom package]。

[write a custom package]: /packages-and-plugins/developing-packages

## Managing package dependencies and versions

## 管理 package 的依赖和版本

To minimize the risk of version collisions,
specify a version range in the `pubspec.yaml` file.

为了使版本冲突的风险最小化，请在 `pubspec.yaml` 文件中指定一个版本范围。

### Package versions

### Package 版本

All packages have a version number, specified in the
package's `pubspec.yaml` file. The current version of a package
is displayed next to its name (for example,
see the [`url_launcher`][] package), as
well as a list of all prior versions
(see [`url_launcher` versions][]).

所有 package 都有一个版本号，在它们的 `pubspec.yaml` 文件中指定。
当前的 package 版本会在其名称旁边显示当前版本号。
（例如，参阅 [`url_launcher`][] package）以及所有先前版本的列表：
[url_launcher 版本列表][`url_launcher` versions]。

To ensure that the app doesn't break when you update a package,
specify a version range using one of the following formats.

为了确保在更新 package 的时候你的应用不会崩溃，
我们建议使用以下格式之一来指定版本范围：

* **Ranged constraints:** Specify a minimum and maximum version.

  **范围限制：**指定一个最小和最大的版本号。

  ```yaml
  dependencies:
    url_launcher: '>=5.4.0 <6.0.0'
  ```

* **Ranged constraints using the [caret syntax][]:**
  Specify the version that serves as the inclusive minimum version.
  This covers all versions from that version to the next major version.

  **使用 [*caret语法*][caret syntax] 的范围约束：**
  指定最小版本，这包括从该版本到下一个主要版本的所有版本。
  
  ```yaml
  dependencies:
    collection: '^5.4.0'
  ```

  This syntax means the same as the one noted in the first bullet.

  该语法与第一项中的语法含义相同。

To learn more, check out the [package versioning guide][].

了解更详细的信息，参阅 [Pub 版本管理指南][package versioning guide]。

[caret syntax]: {{site.dart-site}}/tools/pub/dependencies#caret-syntax
[package versioning guide]: {{site.dart-site}}/tools/pub/versioning
[`url_launcher` versions]: {{site.pub-pkg}}/url_launcher/versions

### Updating package dependencies

### 更新 package 依赖

When running `flutter pub get`
for the first time after adding a package,
Flutter saves the concrete package version found in the `pubspec.lock`
[lockfile][]. This ensures that you get the same version again
if you, or another developer on your team, run `flutter pub get`.

当添加 package 后首次运行 `flutter pub get` 时，
Flutter 将会保存在 `pubspec.lock` [lockfile][] 中找到的具体 package 版本。
这将确保当你或者团队中其他开发者运行
`flutter pub get` 后能得到相同版本的 package。

To upgrade to a new version of the package,
for example to use new features in that package,
run `flutter pub upgrade`
to retrieve the highest available version of the package
that is allowed by the version constraint specified in
`pubspec.yaml`.
Note that this is a different command from
`flutter upgrade` or `flutter update-packages`,
which both update Flutter itself.

如果你想升级到 package 的最新版本，比如使用 package 的最新特性，
请运行 `flutter pub upgrade`。
这将检索你在 `pubspec.yaml` 文件中指定的版本约束所允许的最高可用版本。
请注意，`flutter upgrade` 与 `flutter update-packages` 是两个
不同的命令，但它们都会更新 Flutter。

[lockfile]: {{site.dart-site}}/tools/pub/glossary#lockfile

### Dependencies on unpublished packages

### 依赖未发布的 package

Packages can be used even when not published on pub.dev.
For private packages, or for packages not ready for publishing,
additional dependency options are available:

即使未在 Pub site 上发布，也可以使用 package。
对于不用于公开发布的私有插件，
或者尚未准备好发布的 package，可以使用其他依赖选项。

**Path dependency**
<br> A Flutter app can depend on a package via a file system
  `path:` dependency. The path can be either relative or absolute.
  Relative paths are evaluated relative to the directory
  containing `pubspec.yaml`. For example, to depend on a
  package, packageA, located in a directory next to the app,
  use the following syntax:

**Path 依赖**
<br> Flutter 应用可以通过文件系统 `path:` 依赖而依赖于插件。
  路径可以是相对的，也可以是绝对的。
  例如，要依赖位于应用相邻目录中的插件 `plugin1`，可以使用以下语法：

  ```yaml
    dependencies:
    packageA:
      path: ../packageA/
  
  ```

**Git dependency**
<br> You can also depend on a package stored in a Git repository.
  If the package is located at the root of the repo,
  use the following syntax:

**Git 依赖**
<br> 你也可以依赖存储在 Git 仓库中的 package，
  如果 package 位于仓库的根目录，可以使用以下语法：
  
  ```yaml
    dependencies:
      packageA:
        git:
          url: https://github.com/flutter/packageA.git
  ```

**Git dependency using SSH**
<br> If the repository is private and you can connect to it using SSH,
  depend on the package by using the repo's SSH url:

**通过 SSH 依赖 Git package**
<br> 如果你需要通过 SSH 连接私有的仓库，你可以用 SSH 链接依赖对应的 package：

  ```yaml
    dependencies:
      packageA:
        git:
          url: git@github.com:flutter/packageA.git
  ```

**Git dependency on a package in a folder**
<br> Pub assumes the package is located in
  the root of the Git repository. If that isn't
  the case, specify the location with the `path` argument.
  For example:

**Git 依赖于文件夹中的 package **
<br> 默认情况下，pub 会默认假定 package 位于 Git 仓库的根目录。
  如果不是这种情况，你可以使用 `path` 参数指定位置，例如：
  
  ```yaml
  dependencies:
    packageA:
      git:
        url: https://github.com/flutter/packages.git
        path: packages/packageA
  ```

  Finally, use the `ref` argument to pin the dependency to a
  specific git commit, branch, or tag. For more details, see
  [Package dependencies][].

  最后，你可以使用 `ref` 参数将依赖固定到 git 特定的 commit、branch 或者 tag。
  更多详细信息，请参阅 [Package dependencies][]。

[Package dependencies]: {{site.dart-site}}/tools/pub/dependencies

## Examples

## 例子

The following examples walk through the necessary steps for
using packages.

下面的示例将介绍使用 packages 的一些必要步骤。

### Example: Using the css_colors package {:#css-example}

### 例子：使用 css_colors package

The [`css_colors`][] package
defines color constants for CSS colors, so use the constants
wherever the Flutter framework expects the `Color` type.

[`css_colors`][] package 为 CSS 颜色定义颜色常量，
允许你在 Flutter 框架中任何需要 `Color` 类型的地方使用它们。

To use this package:

要使用这个 package：

1. Create a new project called `cssdemo`.

   创建一个名为 `cssdemo` 的新项目

1. Open `pubspec.yaml`, and add the `css-colors` dependency:

   打开 `pubspec.yaml`，并添加依赖 `css-colors`：
   
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
   ```
   with:

   替换为：

   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     css_colors: ^1.0.0
   ```

1. Run `flutter pub get` in the terminal,
   or click **Get Packages** in VS Code.

   在命令行中运行 `flutter packages get`，
   或者点击 Intellij 中的 **Packages get**

1. Open `lib/main.dart` and replace its full contents with:

   打开 `lib/main.dart` 并将其全部内容替换为：

    <?code-excerpt "lib/css_colors.dart (css-colors)"?>
    ```dart
    import 'package:css_colors/css_colors.dart';
    import 'package:flutter/material.dart';
    
    void main() {
      runApp(const MyApp());
    }
    
    class MyApp extends StatelessWidget {
      const MyApp({super.key});
    
      @override
      Widget build(BuildContext context) {
        return const MaterialApp(home: DemoPage());
      }
    }
    
    class DemoPage extends StatelessWidget {
      const DemoPage({super.key});
    
      @override
      Widget build(BuildContext context) {
        return Scaffold(body: Container(color: CSSColors.orange));
      }
    }
    ```

[`css_colors`]: {{site.pub-pkg}}/css_colors

1. Run the app. The app's background should now be orange.

   运行应用。当你点击 'Show Flutter homepage' 时，你将看到手机默认浏览器打开并出现 Flutter 主页。
   
### Example: Using the url_launcher package to launch the browser {:#url-example}

### 例子：使用 url_launcher package 来打开浏览器

The [`url_launcher`][] plugin package enables opening
the default browser on the mobile platform to display
a given URL, and is supported on Android, iOS, web,
Windows, Linux, and macOS.
This package is a special Dart package called a
_plugin package_ (or _plugin_),
which includes platform-specific code.

[`url_launcher`][] 插件可以让你在移动平台上打开默认浏览器以显示给定的 URL。
它支持 Android、iOS、web、Windows、Linux 以及 macOS。
我们将这一类包含各平台特定代码的 package 称为 **插件 package** 或者 **插件**。

To use this plugin:

要使用这个插件：

1. Create a new project called `launchdemo`.

   新建一个名为 `lauchdemo` 的新项目；

1. Open `pubspec.yaml`, and add the `url_launcher` dependency:

   打开 `pubspec.yaml`，然后添加 `url_launcher` 的依赖：
   
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     url_launcher: ^5.4.0
   ```

1. Run `flutter pub get` in the terminal,
   or click **Get Packages get** in VS Code.

   在命令行中运行 `flutter packages get`，或者
   点击 Intellij 或 Android Studio 中的 **Packages get**；

1. Open `lib/main.dart` and replace its full contents with the
   following:

   打开 `lib/main.dart` 并将其全部内容替换为：

    <?code-excerpt "lib/url_launcher.dart (url-launcher)"?>
    ```dart
    import 'package:flutter/material.dart';
    import 'package:path/path.dart' as p;
    import 'package:url_launcher/url_launcher.dart';
    
    void main() {
      runApp(const MyApp());
    }
    
    class MyApp extends StatelessWidget {
      const MyApp({super.key});
    
      @override
      Widget build(BuildContext context) {
        return const MaterialApp(home: DemoPage());
      }
    }
    
    class DemoPage extends StatelessWidget {
      const DemoPage({super.key});
    
      void launchURL() {
        launchUrl(p.toUri('https://flutter.dev'));
      }
    
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: ElevatedButton(
              onPressed: launchURL,
              child: const Text('Show Flutter homepage'),
            ),
          ),
        );
      }
    }
    ```

1. Run the app (or stop and restart it, if it was already running
   before adding the plugin). Click **Show Flutter homepage**.
   You should see the default browser open on the device,
   displaying the homepage for flutter.dev.

   运行应用（如果你的应用在添加插件之前已经运行，请停止并重启应用）。
   当你点击 **Show Flutter homepage** 时，
   你将看到手机默认浏览器打开并出现 Flutter 主页。
