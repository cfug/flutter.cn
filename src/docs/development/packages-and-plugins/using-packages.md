---
title: Using packages
title: 在 Flutter 里使用 Packages
description: How to use packages in your Flutter app.
description: 如何在你的 Flutter 应用里使用 Packages。
---

Flutter supports using shared packages contributed by other developers
to the Flutter and Dart ecosystems. This allows quickly building
an app without having to develop everything from scratch.

Flutter 支持使用其他开发者向 Flutter 和 Dart 生态系统贡献的共享 package，这意味着你可以快速构建应用而不是一切从零开始。

Existing packages enable many use cases for example, making network requests
([`http`](/docs/cookbook/networking/fetch-data)),
custom navigation/route handling ([`fluro`]({{site.pub-pkg}}/fluro)),
integration with device APIs
([`url_launcher`]({{site.pub-pkg}}/url_launcher) and
[`battery`]({{site.pub-pkg}}/battery)),
and using third-party platform SDKs like Firebase
([FlutterFire]({{site.github}}/flutter/plugins/blob/master/FlutterFire.md)).

现有的 package 支持许多使用场景，例如，网络请求（[`http`](/docs/cookbook/networking/fetch-data)），自定义导航/路由处理（[`fluro`]({{site.pub-pkg}}/fluro)），集成设备 API（如 [`url_launcher`]({{site.pub-pkg}}/url_launcher) 和
[`battery`]({{site.pub-pkg}}/battery)），以及使用第三方平台的 SDK（如 [Firebase]({{site.github}}/flutter/plugins/blob/master/FlutterFire.md)）。

To develop a new package, see [developing
packages](/docs/development/packages-and-plugins/developing-packages).

如果你正打算开发新的 package，请参阅 [Flutter Packages 的开发和提交](/docs/development/packages-and-plugins/developing-packages)。

To add assets, images or fonts,
whether stored in files or packages
see [Adding assets and images](/docs/development/ui/assets-and-images).

如果你想添加资源、图片或字体，无论是存储在文件中还是 package 中，请参阅 [添加资源和图片](/docs/development/ui/assets-and-images)。

## Using packages

## 使用 package

The following section describes how to use existing published packages.

下面的内容将为你描述如何使用已经发布了的 packages。

### Searching for packages

### 搜索 package

Packages are published to the [*Pub site*]({{site.pub}}).

Package 会被发布到 [**Pub site**]({{site.pub}})。

The [Flutter landing page]({{site.pub}}/flutter) on
the Pub site displays top packages that are compatible with Flutter
(those that declare dependencies generally compatible with Flutter),
and supports searching among all published packages.

Pub 网站上的 [Flutter 页面]({{site.pub}}/flutter) 展示了与 Flutter 兼容的 package（即声明的依赖通常与 Flutter 兼容），并且所有已发布的 package 都支持搜索。

### Adding a package dependency to an app

### 将 package 依赖添加到应用

To add the package, `css_colors`, to an app:

要将 package 'css_colors' 添加到应用：

1. Depend on it

   添加依赖
   * Open the `pubspec.yaml` file located inside the app folder,
     and add `css_colors:` under `dependencies`.

     打开应用文件夹下的 `pubspec.yaml` 文件，然后在 `pubspec.yaml` 下添加 `css_colors:`。

1. Install it

   安装

   * From the terminal: Run `flutter pub get`<br/>
     
     在命令行中运行：`flutter pub get`<br/>

   **OR**
   
   **或者**

   * From Android Studio/IntelliJ: Click **Packages get** in the action
     ribbon at the top of `pubspec.yaml`.
     
     在 Android Studio/IntelliJ 中点击 `pubspec.yaml` 文件顶部操作功能区的 **Packages get**

   * From VS Code: Click **Get Packages** located in right side of the action
     ribbon at the top of `pubspec.yaml`.

     在 VS Code 中点击位于 `pubspec.yaml` 文件顶部操作功能区右侧的 **Get Packages**
    
1. Import it

   导入
   * Add a corresponding `import` statement in the Dart code.

     在 Dart 代码中添加相关的 `import` 语句。

1. Stop and restart the app, if necessary

   如果有必要，停止并重启应用

   * If the package brings platform-specific code (Java/Kotlin for Android,
     Swift/Objective-C for iOS), that code must be built into your app.
     Hot reload and hot restart only update the Dart code,
     so a full restart of the app might be required to avoid
     errors like `MissingPluginException` when using the package.

     如果 package 内有特定平台的代码（Android 的 Java/Kotlin,
     iOS 的 Swift/Objective-C），代码必须内置到你的应用内。热重载和热重启只对 package 的 Dart 代码执行此操作，所以你需要完全重启应用以避免使用 package 时出现 `MissingPluginException` 错误。

The [Installing]({{site.pub-pkg}}/css_colors#-installing-tab-)
tab available on any package page on Pub is a handy reference for these
steps.

对于这些步骤，Pub 上任何 package 页面的 ['Installing']({{site.pub-pkg}}/css_colors#-installing-tab-) 选项卡都是一个很方便的参考。

For a complete example, see the [css_colors example](#css-example) below.

完整示例，参阅下面的 [CSS Colors example](#css-example) 。

### Conflict resolution


### 冲突解决

Suppose you want to use `some_package` and `another_package` in an app,
and both of these depend on `url_launcher`, but in different versions.
That causes a potential conflict.
The best way to avoid this is for package authors to use [version
ranges]({{site.dart-site}}/tools/pub/dependencies#version-constraints)
rather than specific versions when specifying dependencies.

假设你想在应用中使用 `some_package` 和
`other_package`，并且它们依赖于不同版本的 `url_launcher`。于是我们便有了潜在的冲突。避免这种情况的最好方法是 package
的作者在指定依赖项时使用 [版本范围]({{site.dart-site}}/tools/pub/dependencies#version-constraints) 而非特定版本。

```yaml
dependencies:
  url_launcher: ^0.4.2    # Good, any 0.4.x version where x >= 2 works.
  image_picker: '0.1.1'   # Not so good, only version 0.1.1 works.
```

If `some_package` declares the dependencies above and `another_package`
declares a compatible `url_launcher` dependency like `'0.4.5'` or
`^0.4.0`, Pub resolves the issue automatically.
Platform-specific dependencies on [Gradle modules][] and/or [CocoaPods][]
are solved in a similar way.

如果 `some_package` 声明了以上依赖，并且 `another_package` 声明了一个兼容的
`url_launcher` 依赖项，如 `'0.4.5'` 或 `^0.4.0`，`pub` 能够自动解决冲突问题。类似的注解也适用于插件
package 特定平台 [Gradle modules][] 和/或 [CocoaPods][] 的依赖关系。

Even if `some_package` and `another_package` declare incompatible versions
for `url_launcher`, they might actually use `url_launcher` in
compatible ways. In this situation, the conflict can be resolved by adding
a dependency override declaration to the app's `pubspec.yaml` file,
forcing the use of a particular version.

即使 `some_package` 和 `another_package` 声明了不兼容的 `url_launcher`
版本，它们实际上仍可能以兼容的方式使用 `url_launcher`。在这种情况下，可在
`pubspec.yaml` 文件中添加一个依赖覆盖声明来强制使用特定版本，从而处理冲突。

To force the use of `url_launcher` version `0.4.3`,
make the following changes to the app's `pubspec.yaml` file:

为了强制使用版本为 `0.4.3` 的 `url_launcher`，你可以对应用的 `pubspec.yaml` 文件做如下更改：

```yaml
dependencies:
  some_package:
  another_package:
dependency_overrides:
  url_launcher: '0.4.3'
```

If the conflicting dependency is not itself a package,
but an Android-specific library like `guava`, the dependency override
declaration must be added to Gradle build logic instead.

如果依赖冲突项不是 package 自身，而是如 `guava` 这样特定于 Android 的库，那么依赖的覆盖声明必须添加到
Gradle 的构建逻辑中。

To force the use of `guava` version `23.0`, make the following
changes to the app's `android/build.gradle` file:

为了强制使用版本为 `23.0` 的 `guava`，你可以对 `android/build.gradle` 文件做如下更改：

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

## Developing new packages

## 开发新的 package

If no package exists for your specific use case, you can
[develop new custom
packages](/docs/development/packages-and-plugins/developing-packages).

如果某个 package 不适用于你的特定需求，你可以 [开发新的自定义 package](/docs/development/packages-and-plugins/developing-packages)。

## Managing package dependencies and versions

## 管理 package 的依赖和版本

To minimize the risk of version collisions,
specify a version range in the pubspec file.

为了使版本冲突的风险最小化，请在 pubspec 文件中指定一个版本范围。

### Package versions

### Package 版本

All packages have a version number, specified in the
package's `pubspec.yaml` file. The current version of a package
is displayed next to its name (for example,
see the [url_launcher]({{site.pub-pkg}}/url_launcher) package), as
well as a list of all prior versions ([url_launcher
versions]({{site.pub-pkg}}/url_launcher#-versions-tab-)).

所有 package 都有一个版本号，在它们的 `pubspec.yaml` 文件中指定。当前的 package 版本会在其名称旁边显示当前版本号（例如，参阅 [url_launcher]({{site.pub-pkg}}/url_launcher) package）以及所有先前版本的列表（[url_launcher
versions]({{site.pub-pkg}}/url_launcher#-versions-tab-)）。

When a package is added to `pubspec.yaml`, the shorthand form `plugin1:`
means that any version of the plugin1 package can be used.
To ensure that the app doesn't break when a package is updated,
specify a version range using one of the following formats:

当使用简写形式 `plugin1:` 将 package 添加到 `pubspec.yaml` 时，表明 plugin1 package 的任何版本都可以被使用。为了确保在更新 package 的时候你的应用不会奔溃，我们建议使用以下格式之一来指定版本范围：

* Range constraints: Specify a minimum and maximim version. For example:

  范围限制：指定一个最小和最大的版本号，例如：

  ```yaml
  dependencies:
    url_launcher: '>=0.1.2 <0.2.0'
  ```

* Range constraints with [*caret
  syntax*]({{site.dart-site}}/tools/pub/dependencies#caret-syntax)
  are similar to regular range constraints:

  使用 [*caret
  语法*]({{site.dart-site}}/tools/pub/dependencies#caret-syntax) 的范围约束与常规的范围约束类似。
  ```yaml
  dependencies:
    collection: '^0.1.2'
  ```

For additional details, see the [package versioning
guide]({{site.dart-site}}/tools/pub/versioning).

了解更详细的信息，参阅 [Pub 版本管理指南]({{site.dart-site}}/tools/pub/versioning)。

### Updating package dependencies

### 更新 package 依赖

When running `flutter pub get` (**Packages get** in IntelliJ)
for the first time after adding a package,
Flutter saves the concrete package version found in the `pubspec.lock`
[lockfile]({{site.dart-site}}/tools/pub/glossary#lockfile).
This ensures that you get the same version again if you, or another
developer on your team, run `flutter pub get`.

当你添加一个 package 后首次运行 `flutter pub get`（IntelliJ 中的 'Packages Get'），Flutter 将会保存在 `pubspec.lock`
[lockfile]({{site.dart-site}}/tools/pub/glossary#lockfile) 中找到的具体 package 版本。这将确保当你或者团队中其他开发者运行 `flutter pub get` 后能得到相同版本的 package。

To upgrade to a new version of the package,
for example to use new features in that package, run
`flutter pub upgrade` (**Upgrade dependencies** in IntelliJ)
to retrieve the highest available version of the package
that is allowed by the version constraint specified in
`pubspec.yaml`.

如果你想升级到 package 的最新版本，比如使用 package 的最新特性，请运行 `flutter packages upgrade`（Intellij 中的 `flutter packages upgrade`）。这将检索你在 `pubspec.yaml` 文件中指定的版本约束所允许的最高可用版本。

### Dependencies on unpublished packages

### 依赖未发布的 package

Packages can be used even when not published on the Pub site.
For private plugins, or for packages not ready for publishing,
additional dependency options are available:

即使未在 Pub site 上发布，也可以使用 package。对于不用于公开发布的私有插件，或者尚未准备好发布的 package，可以使用其他依赖选项。

* **Path** dependency: A Flutter app can depend on a plugin via a file system
  `path:` dependency. The path can be either relative or absolute.
  For example, to depend on a plugin `plugin1` located in a directory
  next to the app, use the following syntax:

  **Path** 依赖，Flutter 应用可以通过文件系统 `path:` 依赖而依赖于插件。路径可以是相对的，也可以是绝对的。例如，要依赖位于应用相邻目录中的插件 `plugin1`，可以使用以下语法：

  ```yaml
  dependencies:
    plugin1:
      path: ../plugin1/
  ```

* **Git** dependency: You can also depend on a package stored in a Git
  repository. If the package is located in the root of the repo, use this
  syntax:

  **Git** 依赖：你也可以依赖存储在 Git 仓库中的 package。如果 package 位于仓库的根目录，可以使用以下语法：
  ```yaml
  dependencies:
    plugin1:
      git:
        url: git://github.com/flutter/plugin1.git
  ```

* **Git** dependency on a package in a folder: By default Pub assumes the
  package is located in the root of the Git repository. If that is not the
  case, you can specify the location with the `path` argument. For example:

  **Git** 依赖于文件夹中的 package：默认情况下，Pub 假定 package 位于 Git 仓库的根目录。如果不是这种情况，你可以使用 `path` 参数指定位置，例如：
  ```yaml
  dependencies:
    package1:
      git:
        url: git://github.com/flutter/packages.git
        path: packages/package1
  ```

  Finally, use the `ref` argument to pin the dependency to a
  specific git commit, branch, or tag. For more details, see
  [Package dependencies]({{site.dart-site}}/tools/pub/dependencies).

  最后，你可以使用 `ref` 参数将依赖固定到 git 特定的 commit、branch 或者 tag。更多详细信息，请参阅 [Pub Dependencies]({{site.dart-site}}/tools/pub/dependencies)。

## Examples

## 例子

The following examples walk through the necessary steps for
using packages.

下面的示例将介绍使用 packages 的一些必要步骤。

### Example: Using the CSS Colors package {#css-example}

### 例子：使用 CSS Colors package {#css-example}

The [`css_colors`]({{site.pub-pkg}}/css_colors) package
defines color constants for CSS colors, so use the constants
wherever the Flutter framework expects the `Color` type.

[`css_colors`]({{site.pub-pkg}}/css_colors) package 为 CSS 颜色定义颜色常量，允许你在 Flutter 框架中任何需要 `Color` 类型的地方使用它们。

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

   ```
   dependencies:
     flutter:
       sdk: flutter
     css_colors: ^1.0.0
   ```

1. Run `flutter pub get` in the terminal, or click **Packages get** in
   IntelliJ.

   在命令行中运行 `flutter packages get`，或者点击 Intellij 中的 **Packages get**

1. Open `lib/main.dart` and replace its full contents with:

   打开 `lib/main.dart` 并将其全部内容替换为：

    ```dart
    import 'package:css_colors/css_colors.dart';
    import 'package:flutter/material.dart';

    void main() {
      runApp(MyApp());
    }

    class MyApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          home: DemoPage(),
        );
      }
    }

    class DemoPage extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return Scaffold(body: Container(color: CSSColors.orange));
      }
    }
    ```

1. Run the app. The app's background should now be orange.

   运行应用。当你点击 'Show Flutter homepage' 时，你将看到手机默认浏览器打开并出现 Flutter 主页。
   
### Example: Using the url_launcher package to launch the browser {#url-example}

### 例子：使用 url_launcher package 来打开浏览器 {#url-example}

The [url_launcher]({{site.pub-pkg}}/url_launcher) plugin
package enables opening the default browser on the mobile platform to
display a given URL, and is supported on both Android and iOS.
The package demonstrates that packages can contain
platform-specific code&mdash;these are often called _plugins_.

[URL Launcher]({{site.pub-pkg}}/url_launcher) 插件允许你在移动平台上打开默认浏览器以显示给定的 URL。
它演示了 package 如何也可能包含特定于平台的代码（我们将这些 package 称为**插件**）。它同时支持 Android 和 iOS。

To use this plugin:

要使用这个插件：

1. Create a new project called 'launchdemo'.

   新建一个名为 'lauchdemo' 的新项目

1. Open `pubspec.yaml`, and add the `url_launcher` dependency:

   打开 `pubspec.yaml`，然后添加依赖 `url_launcher`：
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
   ```
   with:

   替换为：

   ```
   dependencies:
     flutter:
       sdk: flutter
     url_launcher: ^0.4.1
   ```

1. Run `flutter pub get` in the terminal, or click **Packages get** in
   IntelliJ.

   在命令行中运行 `flutter packages get`，或者点击 Intellij 中的 'Packages get'

1. Open `lib/main.dart` and replace its full contents with the
   following:

   打开 `lib/main.dart` 并将其全部内容替换为：

    ```dart
    import 'package:flutter/material.dart';
    import 'package:url_launcher/url_launcher.dart';

    void main() {
      runApp(MyApp());
    }

    class MyApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          home: DemoPage(),
        );
      }
    }

    class DemoPage extends StatelessWidget {
      launchURL() {
        launch('https://flutter.dev');
      }

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: RaisedButton(
              onPressed: launchURL,
              child: Text('Show Flutter homepage'),
            ),
          ),
        );
      }
    }
    ```

1. Run the app (or stop and restart it, if it was already running
   before adding the plugin). Click **Show Flutter homepage**.
   You should see the default browser open on the device,
   displaying the Flutter homepage.

   运行应用（如果你的应用在添加插件之前已经运行，请停止并重启应用）。
   当你点击 **Show Flutter homepage** 时，
   你将看到手机默认浏览器打开并出现 Flutter 主页。
   
