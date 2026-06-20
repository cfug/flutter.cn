---
# title: "Flutter pubspec options"
title: “Flutter pubspec 选项”
# description: "Describes the Flutter-only fields in the pubspec file."
description: "描述了 pubspec 文件中与 Flutter 相关的部分。"
---

This page is primarily aimed at folks who write
Flutter apps. If you write packages or plugins,
(perhaps you want to create a federated plugin),
you should check out the
[Developing packages and plugins][] page.

本页主要是面向编写 Flutter 应用程序的开发者。
如果你编写 package 或插件（也许你想创建一个联合插件），
你应该查看 [开发 package 和插件][Developing packages and plugins] 页面。

## Overview

## 概览

Every Flutter project includes a `pubspec.yaml` file,
often referred to as _the pubspec_.
A basic pubspec is generated when you create
a new Flutter project. It's located at the top
of the project tree and contains metadata about
the project that the Dart and Flutter tooling
needs to know. The pubspec is written in
[YAML][], which is human readable, but be aware
that _white space (tabs v spaces) matters_.

每个 Flutter 项目都包含一个 `pubspec.yaml` 文件，通常被称为 **pubspec**。
当你创建一个新的 Flutter 项目时，会生成一个基本的 pubspec。
它位于项目的根目录，包含 Dart 和 Flutter 工具需要了解的项目元数据。
pubspec 是用 [YAML][] 编写的，它具有可读性，
但要注意 **缩进符号（制表符和空格）很重要**。

The pubspec specifies dependencies
that the project requires, such as:

pubspec 指定了项目所需的依赖项，例如：

+ Particular packages and their versions

  特定 package 及版本

+ Fonts

  字体

+ Images

  图片

+ Developer packages (like testing or mocking packages)

  开发者 package（如测试或模拟 package）

+ Particular constraints on the version of the Flutter SDK

  对 Flutter SDK 版本的特定限制

Fields common to both Dart and Flutter projects
are described in [the pubspec file][] on [dart.dev][].
This page lists _Flutter-specific_ fields and packages
that are only valid for a Flutter project.

Dart 和 Flutter 项目共有的字段在
[dart.dev][] 的 [pubspec 文件][the pubspec file] 中进行说明。
本页列出了只对 Flutter 项目有效的 **Flutter 特定的** 字段和 package。

[YAML]: https://yaml.org/
[the pubspec file]: {{site.dart-site}}/tools/pub/pubspec
[dart.dev]: {{site.dart-site}}

## Example

## 示例

When you create a new project with the
`flutter create` command (or by using the
equivalent button in your IDE), it creates
a pubspec for a basic Flutter app.

当你用 `flutter create` 命令创建一个新项目时
（或通过使用你的 IDE 中的相应按钮），
它会为每一个 Flutter 应用程序创建 pubspec。

The first time you build your project, it
also creates a `pubspec.lock` file that contains
specific versions of the included packages.
This ensures that you get the same version
the next time the project is built.

首次构建项目时，
系统还会创建一个包含 package 特定版本的 `pubspec.lock` 文件。
这将确保下次构建项目时获得相同的版本。

Here is an example of a Flutter project pubspec file.
The Flutter-only fields and packages are highlighted.

以下是 Flutter 项目 pubspec 文件的示例。
仅 Flutter 字段和 package 突出显示。

```yaml title="pubspec.yaml"
name: <project name>
description: A new Flutter project.

publish_to: none
version: 1.0.0+1

environment:
  sdk: ^3.12.0

dependencies:
  [!flutter:!]       # Required for every Flutter project
    [!sdk: flutter!] # Required for every Flutter project
  [!flutter_localizations:!] # Required to enable localization
    [!sdk: flutter!]         # Required to enable localization

  [!cupertino_icons: ^1.0.8!] # Only required if you use Cupertino (iOS style) icons

dev_dependencies:
  [!flutter_test:!]
    [!sdk: flutter!] # Required for a Flutter project that includes tests

  [!flutter_lints: ^6.0.0!] # Contains a set of recommended lints for Flutter code

[!flutter:!]

  [!uses-material-design: true!] # Required if you use the Material icon font

  [!generate: true!] # Enables generation of localized strings from arb files

  [!config:!] # App-specific configuration flags that mirror `flutter config`
    [!enable-swift-package-manager: true!]

  [!assets:!]  # Lists assets, such as image files
    [!- images/a_dot_burr.png!]
    [!- images/a_dot_ham.png!]

  [!licenses:!] # Lists additional license files to be bundled with the app
    [!- assets/my_license.txt!]

  [!fonts:!]              # Required if your app uses custom fonts
    [!- family: Schyler!]
      [!fonts:!]
        [!- asset: fonts/Schyler-Regular.ttf!]
        [!- asset: fonts/Schyler-Italic.ttf!]
          [!style: italic!]
    [!- family: Trajan Pro!]
      [!fonts:!]
        [!- asset: fonts/TrajanPro.ttf!]
        [!- asset: fonts/TrajanPro_Bold.ttf!]
          [!weight: 700!]
```

## Fields

## 字段

Flutter-specific and Dart-specific fields can be added to
the Flutter pubspec. To learn more about Flutter-specific
fields, see the following sections. To learn more about
Dart-specific fields, see [Dart's pubspec supported fields][].

Flutter 特定字段和 Dart 特定字段可以添加到 Flutter pubspec 中。
要了解相关 Flutter 特定字段的更多信息，请参阅下面的章节。
要了解相关 Dart 特定字段的更多信息，请参阅 [Dart pubspec 支持的字段][Dart's pubspec supported fields]。

:::note

The pubspec can have additional auto-generated Flutter
fields that are not listed here.

pubspec 可以有其他自动生成的 Flutter 字段（未在此处列出）。

:::

[Dart's pubspec supported fields]: {{site.dart-site}}/tools/pub/pubspec#supported-fields

### assets field {: #assets }

### 静态资源字段

A list of asset paths that your app uses. These assets are
bundled with your application. Common types of assets
include static data (for example, `JSON`),
configuration files, icons, and images (`JPEG`, `WebP`,
`GIF`, animated `WebP/GIF`, `PNG`, `BMP`, and `WBMP`).

应用使用的静态资源路径列表。
这些静态资源与应用程序捆绑在一起。
常见的静态资源类型包括静态数据（例如`JSON`）、
配置文件、图标和图像（`JPEG`、`WebP`、`GIF`、
动画 `WebP/GIF`、`PNG`、`BMP` 和 `WBMP`）。

Besides listing the images that are included in the
app package, an image asset can also refer to one or more
resolution-specific "variants". For more information,
see the [resolution aware][] section of the
[Assets and images][] page.
For information on adding assets from package
dependencies, see the
[asset images in package dependencies][]
section in the same page.

除了列出应用 package 中包含的图片，
一个图片资源还可以引用一个或多个特定分辨率的「变体」。
想要了解更多信息，请参阅 [资源和图像][Assets and images]
页面的 [分辨率相关][resolution aware] 部分。
关于从 package 的依赖关系中添加资源的信息，
见同一页的 [package 依赖关系中的图片资源][asset images in package dependencies] 部分。

The `asset` field has this structure:

`asset` 字段具有以下结构：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - [ path_to_file | path_to_directory ]
      [ flavor_path_field | platform_path_field ]
    [...]
```

```yaml
# path_to_file structure
- path/to/directory/file
```

```yaml
# path_to_directory structure
- path/to/directory/
```

```yaml
# flavor_path_field structure
- path: path/to/directory
  flavors:
  - flavor_name
```

```yaml
# platform_path_field structure
- path: path/to/file
  platforms:
    - platform_name
```

Subfields of `assets`:

`assets` 的子字段：

* `path_to_file`: A string that represents the path to
  a file.

  `path_to_file`：表示文件路径的字符串。

* `path_to_directory`: A string that represents the path to
  a directory.

  `path_to_directory`：表示目录路径的字符串。

* `flavor_path_field`: A path field and its flavor
  subfields.

  `flavor_path_field`：路径字段和 flavor 的子字段。

* `platform_path_field`: A path field and its platform
  subfields.

  `platform_path_field`：路径字段及其平台子字段。

* `path`: The path to an asset file or directory.

  `path`：资产文件和目录路径。

* `flavors`: A list of flutter flavors to use with assets
  at a specific path. To learn more about
  flavors, see [Set up flavors for iOS and macOS] and
  [Set up flavors for Android].

  `flavors`：用于特定路径资源的 Flutter flavor 列表。
  要了解相关 flavor 的更多信息，
  请参阅 [为 iOS 和 macOS 设置 flavor][Set up flavors for iOS and macOS] 
  和 [为 Android 设置 flavor][Set up flavors for Android]。

* `platforms`: A list of platforms to use with assets at a
  specific path. Valid values are `android`, `ios`, `web`, `linux`,
  `macos`, and `windows`.

  `platforms`：在特定路径下使用资源的平台列表。
  有效值为 `android`、`ios`、`web`、`linux`、`macos` 和 `windows`。

You can pass in a path to a file:

你可以传入文件路径：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - assets/images/my_image_a.png
    - assets/images/my_image_b.png
```

You can pass in a path to a directory:

你可以传入目录路径：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - assets/images/
    - assets/icons/
```

You can pass in a path to a directory for specific
flavors:

你可以为特定 flavor 传入目录路径：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - path: assets/flavor_a_and_b/images
      flavors:
      - flavor_a
      - flavor_b
    - path: assets/flavor_c/images
      flavors:
      - flavor_c
```

You can pass in a path to a file for specific platforms:

你可以为特定平台传入文件路径：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - path: assets/web_worker.js
      platforms:
        - web
    - path: assets/desktop_icon.png
      platforms:
        - windows
        - linux
        - macos
```

[Set up flavors for iOS and macOS]: /deployment/flavors-ios
[Set up flavors for Android]: /deployment/flavors
[Assets and images]: /ui/assets/assets-and-images
[asset images in package dependencies]: /ui/assets/assets-and-images#from-packages
[resolution aware]: /ui/assets/assets-and-images#resolution-aware

### config field {: #config }

### 配置字段

A map of keys to flags (`true` or `false`) that influences how the `flutter` CLI
is executed.

一个由键映射到标记（`true` 或 `false`）的字典，
它会影响 `flutter` CLI 的执行方式。

> NOTE: This feature is only available as of
> [#167953]({{site.github}}/flutter/flutter/pull/167953) on the `main`
> channel.

> NOTE: 此特性仅在 `main` channel 上的
> [#167953]({{site.github}}/flutter/flutter/pull/167953) 之后可用。

The available keys mirror those available in `flutter config --list`.

可用的键与 `flutter config --list` 中可用的键相对应。

```yaml title="pubspec.yaml"
flutter:
  config:
    cli-animations: false
    enable-swift-package-manager: true
```

Use `flutter config --help` for a description of each flag.

使用 `flutter config --help` 查看每个标记的说明。

Flags are only read from the current _application_ package, and have no effect
in the context of a package or dependency.

标记仅从当前的 **应用程序** package 中读取，
在 package 或依赖项的上下文中不起作用。

### default-flavor field

### 默认 flavor 字段

Assign a default Flutter flavor for an app.
When used, you don't need to include the name of this
flavor in Flutter launch command.

为应用程序指定默认的 Flutter flavor。
使用时，你无需在 Flutter 启动命令中包含此 flavor 的名称。

```yaml title="pubspec.yaml"
flutter:
  default-flavor: flavor_name
```

In the following example, an Android Flutter app has a
flavor called `staging` and `production`. The `production`
flavor is the default flavor. When that flavor is run,
you don't need to include it in the launch command.

在下面的示例中，
Android Flutter 应用程序有名为 `staging` 和 `production` 的 flavor。
`production` flavor 是默认 flavor。
运行该 flavor 时，无需在启动命令中包含它。

```yaml title="pubspec.yaml"
flutter:
  default-flavor: production
```

```console title="console"
// Use this command to run the default flavor (production).
flutter run

// Use this command to run non-default flavors (staging).
flutter run --flavor staging
```

To learn how to create Flutter flavors,
see [Set up Flutter flavors for Android][] and
[Set up Flutter flavors for iOS and macOS][].

要了解如何创建 Flutter flavor，
请参阅 [为 Android 设置 Flutter flavor][Set up Flutter flavors for Android]
和 [为 iOS 和 macOS 设置 Flutter flavor][Set up Flutter flavors for iOS and macOS]。

[Set up Flutter flavors for Android]: /deployment/flavors
[Set up Flutter flavors for iOS and macOS]: /deployment/flavors-ios

### deferred-components field

### 延迟加载组件字段

Defer initial the download size of an Android app. Most
often used with large applications, modularized applications,
and applications with on-demand features.

延迟 Android 应用初始的下载体积。
最常用于大型应用、模块化应用，
以及带有按需特性的应用。

The `deferred-components` field has this structure:

`deferred-components` 字段具有以下结构：

```yaml title="pubspec.yaml"
flutter:
  deferred-components:
    name: component_name
      libraries:
        - string_expression
        [...]
      assets:
        - string_expression
        [...]
    [...]
```

Deferred component subfields:

延迟组件的子字段：

* `name`: The unique identifier for a specific deferred
  component.

  `name`：特定延迟组件的唯一标识符。

* `libraries`: A list of Dart libraries that are part of
  the deferred component.

  `libraries`：作为延迟组件一部分的 Dart 库列表。

* `assets`: A list of asset paths that are associated with
  the deferred component.

  `assets`：与延迟组件相关联的静态资源路径列表。

Example:

示例：

```yaml title="pubspec.yaml"
flutter:
  deferred-components:
    - name: box_component
      libraries:
        - package:testdeferredcomponents/box.dart
    - name: gallery_feature
      libraries:
        - package:testdeferredcomponents/gallery_feature.dart
      assets:
        - assets/gallery_images/gallery_feature.png
```

To learn more about how you can use deferred components with
a Flutter Android app, see
[Deferred components for Android].

要了解关于如何在 Flutter Android 应用中使用延迟组件的更多信息，
请参阅 [Android 的延迟加载组件][Deferred components for Android]。

[Deferred components for Android]: /perf/deferred-components

### disable-swift-package-manager field

### 禁用 Swift Package Manager 字段

Disable the use of the Swift Package Manager (SPM) so that
it no longer manages dependencies in your iOS and macOS
Flutter projects.

禁用 Swift Package Manager (SPM)，
使其不再管理你的 iOS 和 macOS Flutter 项目中的依赖项。

```yaml title="pubspec.yaml"
flutter:
  disable-swift-package-manager: true
```

> NOTE: As of [#168433]({{site.github}}/flutter/flutter/pull/168433) on the
> `main` channel, this property has moved to the [`config`](#config) section:
>
> ```yaml title="pubspec.yaml"
> flutter:
>   config:
>     enable-swift-package-manager: false
> ```

> NOTE: 从 `main` channel 上的
> [#168433]({{site.github}}/flutter/flutter/pull/168433) 起，
> 此属性已移至 [`config`](#config) 部分：
>
> ```yaml title="pubspec.yaml"
> flutter:
>   config:
>     enable-swift-package-manager: false
> ```

### flutter field

### flutter 字段

A field that contains Flutter-specific settings for your
app.

包含应用 Flutter 特定设置的字段。

```yaml title="pubspec.yaml"
flutter:
  [flutter_field]
  [...]
```

### fonts field {: #fonts }

### 字体字段

Configure and include custom fonts in your Flutter
application.

在 Flutter 应用程序中配置并包含自定义字体。

For examples of using fonts
see the [Use a custom font][] and
[Export fonts from a package][] recipes in the
Flutter cookbook.

关于使用字体的例子，请参见 Flutter 实用教程中的
[使用自定义字体][Use a custom font] 和
[从 package 中导出字体][Export fonts from a package] 教程。

The `fonts` field has this structure:

`fonts` 字段具有以下结构：

```yaml title="pubspec.yaml"
flutter:
  fonts:
    -  { font_family_field | font_asset_field }
    [...]
```

```yaml
# font_family_field structure
- family: font_name
      fonts:
        - font_asset_field
        [...]
```

```yaml
# font_asset_field structure
- asset: path/to/directory/font_name
  weight: int_expression # Optional
  style: string_expression # Optional
```

Subfields of `fonts`:

`fonts` 的子字段：

+ `family`: Optional. The font family name. Can have
  multiple font assets.

  `family`：可选项。字体 family 名称。
  可以有多个字体静态资源。

+ `asset`: The font to use.

  `asset`：使用的字体。

+ `weight`: Optional. The weight of the font. This can be
  `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800` or
  `900`.

  `weight`：可选项。字体的字重。可以是
  `100`、`200`、`300`、`400`、`500`、`600`、`700`、`800` 或者
  `900`。

+ `style`: Optional. The style of the font. This can be
  `italic`.

  `style`：可选项，字体的样式。可以是 `italic`。

Use a font that is not part of a font family:

使用不属于字体 family 的字体：

```yaml title="pubspec.yaml"
flutter:
  fonts:
    - asset: fonts/Roboto-Regular.ttf
      weight: 900 # Optional
      style: italic # Optional
```

Use a font family:

使用字体 family：

```yaml title="pubspec.yaml"
flutter:
  fonts:
  - family: Roboto # Optional
        fonts:
          - asset: fonts/Roboto-Regular.ttf
          - asset: fonts/Roboto-Bold.ttf
            weight: 700 # Optional
            style: italic # Optional
```

Alternatively, if you have a font that requires no family,
weight or style requirements, you can declare it as a simple
asset:

另外，如果你有一种不需要 family、字重或样式要求的字体，
你可以将其声明为简单的静态资源：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - fonts/Roboto-Regular.ttf
```

[Export fonts from a package]: /cookbook/design/package-fonts
[Use a custom font]: /cookbook/design/fonts

### generate field

### 生成字段

Handles localization tasks. This field can appear as a
subfield of `flutter` and `material`.

处理本地化任务。
该字段可以作为 `flutter` 和 `material` 的子字段出现。

Enable general localization:

启用通用本地化：

```yaml title="pubspec.yaml"
flutter:
  generate: true
```

### licenses field {: #licenses}

### 许可证字段

A list of additional license file paths that should be bundled with your
application. These files are typically found within your project's `assets`
directory.

应与应用程序捆绑在一起的额外许可证文件路径列表。
这些文件通常位于项目的 `assets` 目录中。

The `licenses` field has this structure:

`licenses` 字段具有以下结构：

```yaml title="pubspec.yaml"
flutter:
  licenses:
    - [path_to_file]
```

### plugin field

### 插件字段

Configure settings specifically for Flutter plugins.

专门为 Flutter 插件配置设置。

The `plugin` field has this structure:

`plugin` 字段具有以下结构：

```yaml title="pubspec.yaml"
flutter:
  plugin:
    platforms:
      android: # Optional
        package: com.example.my_plugin
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      ios: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
        sharedDarwinSource: true
      macos: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
        sharedDarwinSource: true
      windows: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      linux: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      web: # Optional
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
    implements: # Optional
      - example_platform_interface
```

Subfields of `plugin`:

`plugin` 的子字段：

* `platforms`: A list of platforms that will have
  configuration settings.

  `platforms`：将拥有配置设置的平台列表。

* `package`: The Android package name of the plugin. This
  can be used with the Android platform and is required.

  `package`：插件的 Android package 名称。
  可用于 Android 平台，且是必需的。

* `pluginClass`: The name of the plugin class. Optional if
  `dartPluginClass` is used for the same platform. This
  can be used with the Android, iOS, Linux macOS, and
  Windows platforms.

  `pluginClass`：插件类的名称。
  如果同一平台使用了 `dartPluginClass`，则为可选项。
  可用于 Android、iOS、Linux、macOS 和 Windows 平台。

* `default_package`: Optional. The package that should be
  used as the default implementation of a platform
  interface. Only applicable to federated plugins, where the
  plugin's implementation is split into multiple
  platform-specific packages.

  `default_package`：可选项。
  应被用作平台接口默认实现的 package。
  仅适用于联合插件，
  即插件的实现被拆分为多个特定平台的 package。

* `dartPluginClass`: Optional. The Dart class that serves
  as the entry point for a Flutter plugin. This
  can be used with the Android, iOS, Linux macOS, and
  Windows platforms.

  `dartPluginClass`：可选项。
  作为 Flutter 插件入口点的 Dart 类。
  可用于 Android、iOS、Linux、macOS 和 Windows 平台。

* `sharedDarwinSource`: Optional. Indicates that the plugin
  shares native code between iOS and macOS. This
  can be used with the iOS and macOS platforms.

  `sharedDarwinSource`：可选项。
  表示插件在 iOS 和 macOS 之间共享原生代码。
  可用于 iOS 和 macOS 平台。

* `fileName`: Optional. The file that contains the plugin
  class.

  `fileName`：可选项。包含插件类的文件。

* `ffiPlugin`: Optional. True if the plugin uses a
  Foreign Function Interface (FFI).

  `ffiPlugin`：可选项。如果插件使用了外部函数接口 (FFI)，则为 True。

* `implements`: Optional. The platform interfaces that a
  Flutter plugin implements.

  `implements`：可选项。Flutter 插件实现的平台接口。

To learn more about plugins, see
[Developing packages & plugins][].

要了解关于插件的更多信息，
请参阅 [开发 package 和插件][Developing packages & plugins]。

[Developing packages & plugins]: /packages-and-plugins/developing-packages

### shaders field

### 着色器字段

GLSL Shaders with the `FRAG` extension, must be declared in
the shaders section of your project's `pubspec.yaml` file.
The Flutter command-line tool compiles the shader to its
appropriate backend format, and generates its necessary
runtime metadata. The compiled shader is then included in
the application just like an asset.

带有 `FRAG` 扩展名的 GLSL 着色器，
必须在项目 `pubspec.yaml` 文件的 shaders 部分声明。
Flutter 命令行工具会将着色器编译为相应的后端格式，
并生成其所需的运行时元数据。
编译后的着色器随后会像静态资源一样被包含在应用程序中。

The `shaders` field has this structure:

`shaders` 字段具有以下结构：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    -  { path_to_file | path_to_directory }
    [...]
```

```yaml
# path_to_file structure
- assets/shaders/file
```

```yaml
# path_to_directory structure
- assets/shaders/
```

Add specific shaders:

添加特定的着色器：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    - assets/shaders/shader_a.frag
    - assets/shaders/shader_b.frag
```

Add a directory of shaders:

添加一个着色器目录：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    - assets/shaders/
```

Alternatively, you can add your shader directory to the
`assets` field:

或者，你可以将着色器目录添加到 `assets` 字段：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - assets/shaders/my_shader.frag
```

### uses-material-design field

### 使用 Material Design 字段

Use Material Design components in your Flutter app.

在 Flutter 应用中使用 Material Design 组件。

```yaml title="pubspec.yaml"
flutter:
  uses-material-design: true
```

## Packages

## Package 列表

The following Flutter-specific packages can be added to the
pubspec. If you add a package, run `flutter pub get` in your
terminal to install the package.

以下 Flutter 特定的 package 可以添加到 pubspec 中。
如果你添加了一个 package，
请在终端中运行 `flutter pub get` 来安装该 package。

### flutter package

### flutter package（Flutter SDK 依赖）

A package that represents the Flutter SDK itself and
can be added to the `dependencies` field. Use this if
your project relies on the Flutter SDK, not a regular
package from pub.dev.

代表 Flutter SDK 自身的 package，
可以添加到 `dependencies` 字段。
如果你的项目依赖于 Flutter SDK，
而非来自 pub.dev 的常规 package，请使用它。

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
```

### flutter_localizations package

A package that represents the Flutter SDK itself and
can be added to the `dependencies` field. Use this to
enable the localization of `ARB` files. Often used with
the `intl` package.

代表 Flutter SDK 自身的 package，
可以添加到 `dependencies` 字段。
使用它来启用 `ARB` 文件的本地化。
通常与 `intl` package 一起使用。

```yaml title="pubspec.yaml"
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any
```

### flutter_test package

A package that represents the Flutter SDK itself and
can be added to the `dependencies` field. Use this if you
have unit, widget, or integration tests for your Flutter
app.

代表 Flutter SDK 自身的 package，
可以添加到 `dependencies` 字段。
如果你的 Flutter 应用有单元测试、widget 测试或集成测试，
请使用它。

```yaml title="pubspec.yaml"
dependencies:
  flutter_test:
    sdk: flutter
```

### flutter_lints package

A package that that provides a set of recommended lints for
Flutter projects. This package can be added to the
`dev_dependency` field in the pubspec.

为 Flutter 项目提供一组推荐 lint 规则的 package。
该 package 可以添加到 pubspec 的 `dev_dependency` 字段。

```yaml title="pubspec.yaml"
dev_dependencies:
  flutter_lints: ^6.0.0
```

### cupertino_icons

A package that provides a set of Apple's Cupertino icons
for use in Flutter applications. This package can be added
to the `dependency` field in the pubspec.

提供一组 Apple Cupertino 图标供 Flutter 应用使用的 package。
该 package 可以添加到 pubspec 的 `dependency` 字段。

```yaml title="pubspec.yaml"
dependencies:
  cupertino_icons: ^1.0.0
```

## More information

## 更多信息

For more information on packages, plugins,
and pubspec files, see the following:

要查看更多有关 package、插件和 pubspec 的信息，
请参考下面文档：

* [Creating packages][] on dart.dev

  dart.dev 上介绍的 [创建 package][Creating packages]

* [Glossary of package terms][] on dart.dev

  dart.dev 上介绍的 [package 的术语表][Glossary of package terms]
  
* [Package dependencies][] on dart.dev
  
  dart.dev 上介绍的 [package 的依赖][Package dependencies]
  
* [Using packages][]
  
  dart.dev 上介绍的 [使用 package][Using packages]

* [What not to commit][] on dart.dev

  dart.dev 上介绍的 [避免提交的内容][What not to commit]

[Creating packages]: {{site.dart-site}}/guides/libraries/create-library-packages
[Developing packages and plugins]: /packages-and-plugins/developing-packages
[Federated plugins]: /packages-and-plugins/developing-packages#federated-plugins
[Glossary of package terms]: {{site.dart-site}}/tools/pub/glossary
[Package dependencies]: {{site.dart-site}}/tools/pub/dependencies
[Using packages]: /packages-and-plugins/using-packages
[What not to commit]: {{site.dart-site}}/guides/libraries/private-files#pubspeclock
