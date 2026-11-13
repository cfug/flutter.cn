---
# title: Use a custom font
title: 使用自定义字体
# description: How to use custom fonts.
description: 学习如何在 Flutter 里使用自定义字体
tags: cookbook, 实用教程, 设计
keywords: Material Design 效果, 字体, 自定义字体, Flutter使用谷歌字体
ai-translated: true
---

<?code-excerpt path-base="cookbook/design/fonts/"?>

:::secondary 你将学到什么
<!-- What you'll learn -->

* How to choose a font.

  如何选择字体。

* How to import font files.

  如何导入字体文件。

* How to set a font as a default.

  如何设置默认字体。

* How to use a font in a given widget.

  如何在特定 widget 中使用字体。

:::

Although Android and iOS offer high quality system fonts,
designers want support for custom fonts.
You might have a custom-built font from a designer,
or perhaps you downloaded a font from [Google Fonts][].

尽管 Android 和 iOS 已经提供了一套高质量系统字体，
但设计师还是希望能支持自定义字体。
你可能需要使用设计师提供的定制字体，或者从
[Google Fonts][] 下载的字体。

A typeface is the collection of glyphs or shapes that comprise
a given style of lettering.
A font is one representation of that typeface at a given weight or variation.
Roboto is a typeface and Roboto Bold is a font.

字体是指构成特定字体风格的字形或形状的集合。
也是在特定字重或变化下的一种表现形式。
Roboto 是一种字体，Roboto Bold 也是一种字体。

Flutter lets you apply a custom font across an entire app or to individual widgets.
This recipe creates an app that uses custom fonts with the following steps.

Flutter 可以很方便地使用自定义字体，不仅能够将其用于整个应用里，
还可以用在某个单独的 widget 中。
本指南参照下面的步骤使用自定义字体：

1. Choose your fonts.

   选择你的字体。

1. Import the font files.

   导入字体文件。

1. Declare the font in the pubspec.

   在 `pubspec.yaml` 中声明字体。

1. Set a font as the default.

   设置默认字体。

1. Use a font in a specific widget.

   将字体用于特定 widget。

You don't need to follow each step as you go.
The guide offers completed example files at the end.

你不需要按照每个步骤进行操作。
指南最后提供了已完成的示例文件。

:::note
This guide makes the following presumptions:

本指南基于以下前提：

1. You've [set up your Flutter environment][].

   你已经 [搭建好 Flutter 环境][set up your Flutter environment]。

1. You've [created a new Flutter app][new-flutter-app] named `custom_fonts`.
   If you haven't completed these steps yet, do so before continuing
   with this guide.

   你已经创建了名为 `custom_fonts` 的 [新 Flutter 应用][new-flutter-app]。
   若尚未完成这些步骤，请先完成再继续阅读本指南。

1. You're performing the provided commands in a macOS or Linux shell
   and using `vi`. You can substitute any text editor for `vi`.
   Windows users should use the appropriate commands and paths when
   performing the steps.

   你在 macOS 或 Linux shell 中执行文中命令，并使用 `vi`。
   你可以用任意文本编辑器代替 `vi`。
   Windows 用户在执行这些步骤时，应使用对应的命令和路径。

1. You're adding the Raleway and RobotoMono fonts to your Flutter app.

   你要为 Flutter 应用添加 Raleway 和 RobotoMono 字体。
:::

[set up your Flutter environment]: /install
[new-flutter-app]: /reference/create-new-app

## Choose a font

## 字体的选择

Your choice of font should be more than a preference.
Consider which file formats work with Flutter and
how the font could affect design options and app performance.

字体的选择不应仅仅是一种偏好。
请考虑哪些文件格式可与 Flutter 配合使用，
以及字体会如何影响设计和应用的性能。

#### Pick a supported font format

#### 选择已支持的字体格式

Flutter supports the following font formats:

Flutter 支持以下的字体格式：

* OpenType font collections: `.ttc`

  OpenType 字体集：`.ttc`

* TrueType fonts: `.ttf`

  TrueType 字体：`.ttf`

* OpenType fonts: `.otf`

  OpenType 字体：`.otf`

Flutter does not support fonts in the Web Open Font Format,
`.woff` and `.woff2`, on desktop platforms.

Flutter 在桌面平台上不支持 Web Open 字体格式（`.woff` 和 `.woff2`）
的字体。

#### Choose fonts for their specific benefits

#### 按具体优势选择字体

Few sources agree on what a font file type is or which uses less space.
The key difference between font file types involves how the format
encodes the glyphs in the file.
Most TrueType and OpenType font files have similar capabilities as they
borrowed from each other as the formats and fonts improved over time.

关于字体文件类型的定义，以及哪种格式更省空间，各方说法并不一致。
关键差别在于格式如何编码文件中的字形。
随着格式和字体不断演进，大多数 TrueType 与 OpenType 字体文件的能力已经接近，
因为它们互相借鉴了对方的特性。

Which font you should use depends on the following considerations.

该使用哪种字体，取决于以下考量。

* How much variation you need for fonts in your app?

  应用中的字体需要多少种变化？

* How much file size you can accept fonts using in your app?

  你能接受字体占用多大的文件体积？

* How many languages you need to support in your app?

  应用需要支持多少种语言？

Research what options a given font offers,
like more than one weight or style per font file,
[variable font capability][variable-fonts],
the availability of multiple font files for a multiple font weights,
or more than one width per font.

先了解一款字体提供了哪些选项，
例如单个字体文件是否包含多种字重或样式、
是否支持 [可变字体][variable-fonts]、
是否为多种字重提供了多个字体文件，
或者同一字体是否包含多种宽度。

Choose the typeface or font family that meets the design needs of your app.

选择符合应用设计需求的字族或字体家族。

:::secondary
To learn how to get direct access to over 1,000 open-sourced font families,
check out the [google_fonts][] package.

若要直接使用超过 1000 个开源字体家族，
请查看 [google_fonts][] package。

<YouTubeEmbed id="8Vzv2CdbEY0"
  title="google_fonts | Flutter package of the week"></YouTubeEmbed>

To learn about another approach to using custom fonts that allows you to
re-use one font over multiple projects,
check out [Export fonts from a package][].

若要了解另一种自定义字体用法，以便在多个项目中复用同一字体，
请查看 [从 package 导出字体][Export fonts from a package]。
:::

## Import the font files

## 导入字体文件

To work with a font, import its font files into your Flutter project.

要使用某种字体，请将其字体文件导入 Flutter 项目。

To import font files, perform the following steps.

请按以下步骤导入字体文件。

1. If necessary, to match the remaining steps in this guide,
   change the name of your Flutter app to `custom_fonts`.

   如有必要，为与本指南后续步骤一致，
   请将 Flutter 应用重命名为 `custom_fonts`。

   ```console
   $ mv /path/to/my_app /path/to/custom_fonts
   ```

1. Navigate to the root of your Flutter project.

   进入 Flutter 项目的根目录。

   ```console
   $ cd /path/to/custom_fonts
   ```

1. Create a `fonts` directory at the root of your Flutter project.

   在 Flutter 项目根目录创建 `fonts` 目录。

   ```console
   $ mkdir fonts
   ```

1. Move or copy the font files in a `fonts` or `assets`
   folder at the root of your Flutter project.

   将字体文件移动或复制到 Flutter 项目根目录下的
   `fonts` 或 `assets` 文件夹中。

   ```console
   $ cp ~/Downloads/*.ttf ./fonts
   ```

The resulting folder structure should resemble the following:

完成后的目录结构应类似如下：

```plaintext
custom_fonts/
|- fonts/
  |- Raleway-Regular.ttf
  |- Raleway-Italic.ttf
  |- RobotoMono-Regular.ttf
  |- RobotoMono-Bold.ttf
```

## Declare the font in the pubspec.yaml file

## 在 pubspec.yaml 文件中声明字体

After you've downloaded a font,
include a font definition in the `pubspec.yaml` file.
This font definition also specifies which font file should be used to
render a given weight or style in your app.

下载字体后，在 `pubspec.yaml` 文件中加入字体定义。
该定义还会指定应用中某个字重或样式应使用哪个字体文件来渲染。

### Define fonts in the `pubspec.yaml` file

### 在 `pubspec.yaml` 文件中定义字体

To add font files to your Flutter app, complete the following steps.

要将字体文件加入 Flutter 应用，请完成以下步骤。

1. Open the `pubspec.yaml` file at the root of your Flutter project.

   打开 Flutter 项目根目录下的 `pubspec.yaml` 文件。

   ```console
   $ vi pubspec.yaml
   ```

1. Paste the following YAML block after the `flutter` declaration.

   将以下 YAML 块粘贴到 `flutter` 声明之后。

   ```yaml
     fonts:
       - family: Raleway
         fonts:
           - asset: fonts/Raleway-Regular.ttf
           - asset: fonts/Raleway-Italic.ttf
             style: italic
       - family: RobotoMono
         fonts:
           - asset: fonts/RobotoMono-Regular.ttf
           - asset: fonts/RobotoMono-Bold.ttf
             weight: 700
   ```

This `pubspec.yaml` file defines the italic style for the
`Raleway` font family as the `Raleway-Italic.ttf` font file.
When you set `style: TextStyle(fontStyle: FontStyle.italic)`,
Flutter swaps `Raleway-Regular` with `Raleway-Italic`.

这份 `pubspec.yaml` 将 `Raleway` 字体家族的斜体样式
定义为 `Raleway-Italic.ttf` 字体文件。
当你设置 `style: TextStyle(fontStyle: FontStyle.italic)` 时，
Flutter 会用 `Raleway-Italic` 替换 `Raleway-Regular`。

The `family` value sets the name of the typeface.
You use this name in the [`fontFamily`][] property of a [`TextStyle`][] object.

`family` 的值是字族名称。
你可以在 [`TextStyle`][] 对象的 [`fontFamily`][] 属性中使用这个名称。

The value of an `asset` is a relative path from the `pubspec.yaml` file
to the font file.
These files contain the outlines for the glyphs in the font.
When building the app,
Flutter includes these files in the app's asset bundle.

`asset` 的值是从 `pubspec.yaml` 文件到字体文件的相对路径。
这些文件包含字体中字形的轮廓。
构建应用时，Flutter 会把这些文件打进应用的资源包。

### Include font files for each font

### 为每种字体包含对应的字体文件

Different typefaces implement font files in different ways.
If you need a typeface with a variety of font weights and styles,
choose and import font files that represent that variety.

不同字族实现字体文件的方式并不相同。
如果需要包含多种字重和样式的字族，
请选择并导入能体现这些变化的字体文件。

When you import a font file that doesn't include either multiple fonts
within it or variable font capabilities,
don't use the `style` or `weight` property to adjust how they display.
If you use those properties on a regular font file,
Flutter attempts to _simulate_ the look.
The visual result will look quite different from using the correct font file.

如果导入的字体文件既不包含多种字体，也不支持可变字体，
就不要用 `style` 或 `weight` 属性去调整显示效果。
若对普通字体文件使用这些属性，
Flutter 会尝试 **模拟** 相应外观。
视觉效果会和使用正确的字体文件相差很大。

### Declare styles and weights

### 声明样式和字重

Flutter doesn't infer a font's weight or style from its file name.
To use a specific weight or style, you must explicitly declare the `weight`
or `style` property for that font file in your `pubspec.yaml`.

Flutter 不会根据文件名推断字体的字重或样式。
要使用特定字重或样式，必须在 `pubspec.yaml` 中
为该字体文件显式声明 `weight` 或 `style` 属性。

#### Set font weight

#### 设置字重

The `weight` property specifies the weight of the outlines in
the file as an integer multiple of 100, between 100 and 900.
These values correspond to the [`FontWeight`][] and can be used in the
[`fontWeight`][fontWeight property] property of a [`TextStyle`][] object.

`weight` 属性用 100 的整数倍指定文件中轮廓的字重，范围是 100 到 900。
这些值对应 [`FontWeight`][]，
可用于 [`TextStyle`][] 对象的 [`fontWeight`][fontWeight property] 属性。

In the `pubspec.yaml` shown in this guide,
you defined `RobotoMono-Bold` as the `700` weight of the font family.
To use the `RobotoMono-Bold` font that you added to your app,
set `fontWeight` to `FontWeight.w700` in your `TextStyle` widget.

在本指南的 `pubspec.yaml` 中，
你将 `RobotoMono-Bold` 定义为该字体家族的 `700` 字重。
要使用已添加到应用中的 `RobotoMono-Bold` 字体，
请在 `TextStyle` widget 中把 `fontWeight` 设为 `FontWeight.w700`。

If you hadn't added `RobotoMono-Bold` to your app and declared its weight,
Flutter attempts to make the regular font _look_ bold.
The text then might appear to be somewhat darker.

如果没有把 `RobotoMono-Bold` 加入应用并声明其字重，
Flutter 会尝试让常规字体 **看起来** 是粗体。
文字可能会显得略深一些。

You can't use the `weight` property to override the weight of the font.
You can't set `RobotoMono-Bold` to any other weight than `700`.
If you set `TextStyle(fontFamily: 'RobotoMono', fontWeight: FontWeight.w900)`,
the displayed font would still render as however bold `RobotoMono-Bold` looks.

不能用 `weight` 属性覆盖字体本身的字重。
不能把 `RobotoMono-Bold` 设成 `700` 以外的字重。
即使设置
`TextStyle(fontFamily: 'RobotoMono', fontWeight: FontWeight.w900)`，
显示出来的字体仍然是 `RobotoMono-Bold` 原本的粗细。

#### Set font style

#### 设置字体样式

The `style` property specifies whether the glyphs in the font file display as
either `italic` or `normal`.
These values correspond to the [`FontStyle`][].
You can use these styles in the [`fontStyle`][fontStyle property] property
of a [`TextStyle`][] object.

`style` 属性指定字体文件中的字形显示为 `italic` 还是 `normal`。
这些值对应 [`FontStyle`][]。
你可以在 [`TextStyle`][] 对象的
[`fontStyle`][fontStyle property] 属性中使用这些样式。

In the `pubspec.yaml` shown in this guide,
you defined `Raleway-Italic` as being in the `italic` style.
To use the `Raleway-Italic` font that you added to your app,
set `style: TextStyle(fontStyle: FontStyle.italic)`.
Flutter swaps `Raleway-Regular` with `Raleway-Italic` when rendering.

在本指南的 `pubspec.yaml` 中，
你将 `Raleway-Italic` 定义为 `italic` 样式。
要使用已添加到应用中的 `Raleway-Italic` 字体，
请设置 `style: TextStyle(fontStyle: FontStyle.italic)`。
渲染时 Flutter 会用 `Raleway-Italic` 替换 `Raleway-Regular`。

If you hadn't added `Raleway-Italic` to your app and declared its style,
Flutter attempts to make the regular font _look_ italic.
The text then might appear to be leaning to the right.

如果没有把 `Raleway-Italic` 加入应用并声明其样式，
Flutter 会尝试让常规字体 **看起来** 是斜体。
文字可能会显得向右倾斜。

You can't use the `style` property to override the glyphs of a font.
If you set `TextStyle(fontFamily: 'Raleway', fontStyle: FontStyle.normal)`,
the displayed font would still render as italic.
The `regular` style of an italic font _is_ italic.

不能用 `style` 属性覆盖字体的字形。
即使设置
`TextStyle(fontFamily: 'Raleway', fontStyle: FontStyle.normal)`，
显示出来的字体仍然是斜体。
斜体字体的 `regular` 样式 **就是** 斜体。

## Set a font as the default

## 将字体设为默认字体

To apply a font to text, you can set the font as the app's default font
in its `theme`.

要把某种字体应用到文本，可以在应用的 `theme` 中把它设为默认字体。

To set a default font, set the `fontFamily` property in the app's `theme`.
Match the `fontFamily` value to the `family` name declared in the
`pubspec.yaml` file.

要设置默认字体，请设置应用 `theme` 中的 `fontFamily` 属性。
`fontFamily` 的值应与 `pubspec.yaml` 中声明的 `family` 名称一致。

The result would resemble the following code.

结果类似下面的代码。

<?code-excerpt "lib/main.dart (MaterialApp)"?>

```dart
return MaterialApp(
  title: 'Custom Fonts',
  // Set Raleway as the default app font.
  theme: ThemeData(fontFamily: 'Raleway'),
  home: const MyHomePage(),
);
```

To learn more about themes,
check out the [Using Themes to share colors and font styles][] recipe.

要进一步了解主题，
请参阅
[使用主题共享颜色和字体样式][Using Themes to share colors and font styles]
这篇实用教程。

## Set the font in a specific widget

## 在特定 widget 中设置字体

To apply the font to a specific widget like a `Text` widget,
provide a [`TextStyle`][] to the widget.

要把字体应用到特定 widget（例如 `Text` widget），
请为该 widget 提供 [`TextStyle`][]。

For this guide,
try to apply the `RobotoMono` font to a single `Text` widget.
Match the `fontFamily` value to the `family` name declared in the
`pubspec.yaml` file.

在本指南中，试着把 `RobotoMono` 字体应用到单个 `Text` widget。
`fontFamily` 的值应与 `pubspec.yaml` 中声明的 `family` 名称一致。

The result would resemble the following code.

结果类似下面的代码。

<?code-excerpt "lib/main.dart (Text)"?>

```dart
child: Text(
  'Roboto Mono sample',
  style: TextStyle(fontFamily: 'RobotoMono'),
),
```

:::important
If a [`TextStyle`][] object specifies a weight or style without a
corresponding font file, the engine uses a generic file for the font
and attempts to extrapolate outlines for the requested weight and style.

如果 [`TextStyle`][] 对象指定了字重或样式，却没有对应的字体文件，
引擎会使用该字体的通用文件，并尝试推算出所请求字重和样式的轮廓。

Avoid relying on this capability. Import the proper font file instead.

不要依赖这种能力。请改为导入正确的字体文件。
:::

## Try the complete example

## 试用完整示例

### Download fonts

### 下载字体

Download the Raleway and RobotoMono font files from [Google Fonts][].

从 [Google Fonts][] 下载 Raleway 和 RobotoMono 字体文件。

### Update the `pubspec.yaml` file

### 更新 `pubspec.yaml` 文件

1. Open the `pubspec.yaml` file at the root of your Flutter project.

   打开 Flutter 项目根目录下的 `pubspec.yaml` 文件。

   ```console
   $ vi pubspec.yaml
   ```

1. Replace its contents with the following YAML.

   将其内容替换为以下 YAML。

   ```yaml
   name: custom_fonts
   description: An example of how to use custom fonts with Flutter

   dependencies:
     flutter:
       sdk: flutter

   dev_dependencies:
     flutter_test:
       sdk: flutter

   flutter:
     fonts:
       - family: Raleway
         fonts:
           - asset: fonts/Raleway-Regular.ttf
           - asset: fonts/Raleway-Italic.ttf
             style: italic
       - family: RobotoMono
         fonts:
           - asset: fonts/RobotoMono-Regular.ttf
           - asset: fonts/RobotoMono-Bold.ttf
             weight: 700
     uses-material-design: true
   ```

### Use this `main.dart` file

### 使用这份 `main.dart` 文件

1. Open the `main.dart` file in the `lib/` directory of your Flutter project.

   打开 Flutter 项目 `lib/` 目录中的 `main.dart` 文件。

   ```console
   $ vi lib/main.dart
   ```

1. Replace its contents with the following Dart code.

   将其内容替换为以下 Dart 代码。

   <?code-excerpt "lib/main.dart"?>
   ```dart
   import 'package:flutter/material.dart';
   
   void main() => runApp(const MyApp());
   
   class MyApp extends StatelessWidget {
     const MyApp({super.key});
   
     @override
     Widget build(BuildContext context) {
       return MaterialApp(
         title: 'Custom Fonts',
         // Set Raleway as the default app font.
         theme: ThemeData(fontFamily: 'Raleway'),
         home: const MyHomePage(),
       );
     }
   }
   
   class MyHomePage extends StatelessWidget {
     const MyHomePage({super.key});
   
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         // The AppBar uses the app-default Raleway font.
         appBar: AppBar(title: const Text('Custom Fonts')),
         body: const Center(
           // This Text widget uses the RobotoMono font.
           child: Text(
             'Roboto Mono sample',
             style: TextStyle(fontFamily: 'RobotoMono'),
           ),
         ),
       );
     }
   }
   ```

The resulting Flutter app should display the following screen.

完成后的 Flutter 应用应显示如下界面。

![Custom Fonts Demo](/assets/images/docs/cookbook/fonts.png){:.site-mobile-screenshot}

[variable-fonts]: https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts
[Export fonts from a package]: /cookbook/design/package-fonts
[`fontFamily`]: {{site.api}}/flutter/painting/TextStyle/fontFamily.html
[fontStyle property]: {{site.api}}/flutter/painting/TextStyle/fontStyle.html
[`FontStyle`]: {{site.api}}/flutter/dart-ui/FontStyle.html
[fontWeight property]: {{site.api}}/flutter/painting/TextStyle/fontWeight.html
[`FontWeight`]: {{site.api}}/flutter/dart-ui/FontWeight-class.html
[Google Fonts]: https://fonts.google.com
[google_fonts]: {{site.pub-pkg}}/google_fonts
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[Using Themes to share colors and font styles]: /cookbook/design/themes
