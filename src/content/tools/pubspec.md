---
# title: "Flutter and the pubspec file"
title: "Pubspec 文件的 Flutter 部分"
# description: "Describes the Flutter-only fields in the pubspec file."
description: "描述了 pubspec 文件中与 Flutter 相关的部分。"
---

:::note

This page is primarily aimed at folks who write
Flutter apps. If you write packages or plugins, 
(perhaps you want to create a federated plugin),
you should check out the
[Developing packages and plugins][] page.

本页主要是针对编写 Flutter 应用程序的人。
如果你写 package 或插件，（也许你想创建一个联合插件），
你应该查看 [开发 package 和插件][Developing packages and plugins] 页面。

:::

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
pubspec 是用 [YAML][] 写的，它具有可读性，
但要注意 **缩进符号（制表符和空格）很重要**。

[YAML]: https://yaml.org/

The pubspec file specifies dependencies
that the project requires, such as particular packages
(and their versions), fonts, or image files.
It also specifies other requirements, such as 
dependencies on developer packages (like
testing or mocking packages), or particular
constraints on the version of the Flutter SDK. 

pubspec 文件指定了项目所需的依赖，
如特定的 package（及其版本）、字体或图像文件。
它还指定了其他配置，如对开发者 package 的依赖（如测试或模拟 package），
或对 Flutter SDK 版本的特殊限制。

Fields common to both Dart and Flutter projects
are described in [the pubspec file][] on [dart.dev][].
This page lists _Flutter-specific_ fields
that are only valid for a Flutter project.

Dart 和 Flutter 项目共有的字段在
[dart.dev][] 的 [pubspec 文件][the pubspec file] 中描述。
本页列出了只对 Flutter 项目有效的 **Flutter 特定的** 字段。

:::note

The first time you build your project, it
creates a `pubspec.lock` file that contains
specific versions of the included packages.
This ensures that you get the same version
the next time the project is built.

在你第一次构建你的项目时，它会创建一个 `pubspec.lock` 文件，
其中包含了所导入 package 的特定版本。
这可以确保你在下次构建项目时得到相同的版本。

:::

[the pubspec file]: {{site.dart-site}}/tools/pub/pubspec
[dart.dev]: {{site.dart-site}}

When you create a new project with the
`flutter create` command (or by using the
equivalent button in your IDE), it creates
a pubspec for a basic Flutter app.

当你用 `flutter create` 命令创建一个新项目时
（或通过使用你的 IDE 中的相应按钮），
它会为每一个 Flutter 应用程序创建 pubspec。

Here is an example of a Flutter project pubspec file.
The Flutter only fields are highlighted.

下面是一个 Flutter 项目的 pubspec 文件的示例。
只有 Flutter 可用的字段会高亮显示。

```yaml
name: <project name>
description: A new Flutter project.

publish_to: none

version: 1.0.0+1

environment:
  sdk: ^3.5.0

dependencies:
  [!flutter:!]       # Required for every Flutter project
    [!sdk: flutter!] # Required for every Flutter project
  [!flutter_localizations:!] # Required to enable localization
    [!sdk: flutter!]         # Required to enable localization

  [!cupertino_icons: ^1.0.8!] # Only required if you use Cupertino (iOS style) icons

dev_dependencies:
  [!flutter_test:!]
    [!sdk: flutter!] # Required for a Flutter project that includes tests

  [!flutter_lints: ^4.0.0!] # Contains a set of recommended lints for Flutter code

[!flutter:!]

  [!uses-material-design: true!] # Required if you use the Material icon font

  [!generate: true!] # Enables generation of localized strings from arb files

  [!assets:!]  # Lists assets, such as image files
    [!- images/a_dot_burr.jpeg!]
    [!- images/a_dot_ham.jpeg!]

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
 
## Assets

## 资源

Common types of assets include static data
(for example, JSON files), configuration files,
icons, and images (JPEG, WebP, GIF,
animated WebP/GIF, PNG, BMP, and WBMP).

常见的资源包括静态数据（例如 JSON 文件）、
配置文件、图标和图像（JPEG、WebP、GIF、
动画 WebP/GIF、PNG、BMP 和 WBMP）。

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

[Assets and images]: /ui/assets/assets-and-images
[asset images in package dependencies]: /ui/assets/assets-and-images#from-packages
[resolution aware]: /ui/assets/assets-and-images#resolution-aware

## Fonts

## 字体

As shown in the above example,
each entry in the fonts section should have a
`family` key with the font family name,
and a `fonts` key with a list specifying the
asset and other descriptors for the font.

如上例所示，字体部分的每个条目都应该有一个
包含字体家族名称的 `family` 键，
以及一个包含指定字体的资源和其他描述符的 `fonts` 键。

For examples of using fonts
see the [Use a custom font][] and
[Export fonts from a package][] recipes in the
[Flutter cookbook][].

关于使用字体的例子，请参见 [Flutter 实用教程][Flutter cookbook] 中的
[使用自定义字体][Use a custom font] 和
[从 package 中导出字体][Export fonts from a package] 教程。

[Export fonts from a package]: /cookbook/design/package-fonts
[Flutter cookbook]: /cookbook
[Use a custom font]: /cookbook/design/fonts

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
