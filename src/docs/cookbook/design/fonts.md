---
title: Use a custom font
title: 使用自定义字体
short-title: Custom fonts
short-title: 自定义字体
description: How to use custom fonts.
description: 学习如何在 Flutter 里使用自定义字体
prev:
  title: Update the UI based on orientation
  title: 根据屏幕方向更新界面
  path: /docs/cookbook/design/orientation
next:
  title: Use themes to share colors and font styles
  title: 使用 Themes 统一颜色和字体风格
  path: /docs/cookbook/design/themes
---

Although Android and iOS offer high quality system fonts,
one of the most common requests from designers is for custom fonts.
For example, you might have a custom-built font from a designer,
or perhaps you downloaded a font from [Google Fonts][].

尽管 Android 和 iOS 已经提供了一套高质量系统字体，
然而通常设计师还是会要求使用自定义字体。
例如，你可能需要使用设计师提供的自定义字体，或者从
[Google Fonts][] 下载的字体。

{{site.alert.note}}

  Check out the [google_fonts][] package for direct access
  to almost 1000 open-sourced font families.

  查看 [google_fonts][] 库，你将可以直接访问近 1000 个开源字体族。

{{site.alert.end}}

{{site.alert.note}}

  For another approach to using custom fonts, 
  especially if you want to re-use one font over multiple projects, 
  see [Export fonts from a package][].

  这里还有另一个关于使用自定义字体的教程，
  如果你想要在多项目中重用一份字体的情况下，请参考[将字体导出到包][Export fonts from a package]。

{{site.alert.end}}

Flutter works with custom fonts and you can apply a custom
font across an entire app or to individual widgets.
This recipe creates an app that uses custom fonts with
the following steps:

Flutter 可以很方便的使用自定义字体，不仅能够将其用于整个应用里，
还可以用在某个单独的 widget 中。
请参照下面的步骤使用自定义字体：

## Directions

## 步骤

  1. Import the font files

     导入字体文件

  2. Declare the font in the `pubspec.yaml`

     在 `pubspec.yaml` 中声明字体

  3. Set a font as the default

     设置默认字体

  4. Use a font in a specific widget
  
     将字体用于特定 widget

## 1. Import the font files

## 1. 导入字体文件

To work with a font, import the font files into the project.
It's common practice to put font files in a `fonts` or `assets`
folder at the root of a Flutter project.

要使用字体，你需要将字体文件导入到项目中。
常见的做法是将字体文件放在项目根目录下的 `fonts` 或者 `assets` 文件夹中。

For example, to import the Raleway and Roboto Mono font
files into a project, the folder structure might look like this:

例如，如果你想要在项目中导入 Raleway 和 Roboto Mono 字体，
文件夹结构会像下面这样：

```
awesome_app/
  fonts/
    Raleway-Regular.ttf
    Raleway-Italic.ttf
    RobotoMono-Regular.ttf
    RobotoMono-Bold.ttf
```

## 2. Declare the font in the pubspec

## 2. 在 `pubspec.yaml` 中声明字体

Once you've identified a font, tell Flutter where to find it.
You can do this by including a font definition in the `pubspec.yaml` file.

现在你已经有一个字体可以使用，接下来则需要告诉 Flutter 它在哪。
你可以在 `pubspec.yaml` 中像下面这样声明：

```yaml
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
```

### `pubspec.yaml` option definitions

### `pubspec.yaml` 选项的定义

The `family` determines the name of the font, which you use in the
[`fontFamily`][] property of a [`TextStyle`][] object.

`family` 属性决定了字体的名称，你将会在 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 的 [`fontFamily`]({{site.api}}/flutter/painting/TextStyle/fontFamily.html) 属性中用到。

The `asset` is a path to the font file, relative to the `pubspec.yaml` file.
These files contain the outlines for the glyphs in the font.
When building the app, these files are included in the app's asset bundle.

`asset` 是字体文件对于 `pubspec.yaml` 文件的相对路径。这些文件包含了字体中字形的轮廓。构建应用时，这些文件将会被包含在应用程序的资源包中。

A single font can reference many different files with different
outline weights and styles:

单个字体可以引用多个不同轮廓字重及风格的文件：

  * The `weight` property specifies the weight of the outlines in
    the file as an integer multiple of 100, between 100 and 900.
    These values correspond to the [`FontWeight`][]
    and can be used in the [`fontWeight`][] property of a
    [`TextStyle`][] object.

    `weight` 属性指定了文件中字体轮廓的字重为 100 的整数倍，
    并且范围在 100 和 900 之间。
    这些值对应 [`FontWeight`][] 并能够在 [`TextStyle`][] 
    对象的 [`fontWeight`][] 属性上使用。

  * The `style` property specifies whether the outlines in the file are
    `italic` or `normal`. These values correspond to the
    [`FontStyle`][] and can be used in the [`fontStyle`][] property of a
    [`TextStyle`][] object.

    `style` 属性指定文件中字体的轮廓是否为 `italic` 或 `normal`。
    这些值对应 [`FontStyle`][] 并能够在 [`TextStyle`][]
    对象的 [`fontStyle`][] 属性上使用。

## 3. Set a font as the default

## 3. 设置默认字体

You have two options for how to apply fonts to text: as the default font
or only within specific widgets.

关于如何应用这些字体，你有两种选择：将其设为默认字体，或者仅在某些特定 Widget 中使用。

To use a font as the default, set the `fontFamily` property as part of
the app's `theme`. The value provided to `fontFamily` must match the `family`
name declared in the `pubspec.yaml`.

如果你想要设为默认字体，
请将 `fontFamily` 设为应用（全局）`theme` 的属性的一部分。
提供的 `fontFamily` 的值必须与 pubspec.yaml 中声明的名称相匹配。

<!-- skip -->
```dart
MaterialApp(
  title: 'Custom Fonts',
  // Set Raleway as the default app font.
  theme: ThemeData(fontFamily: 'Raleway'),
  home: MyHomePage(),
);
```

For more information on themes,
see the [Using Themes to share colors and font styles][] recipe.

有关主题的更多信息，请参阅文档：[使用 Themes 统一颜色和字体风格](/docs/cookbook/design/themes) 。

## 4. Use the font in a specific widget

## 4. 将字体用于特定 Widget

If you want to apply the font to a specific widget,
such as a `Text` widget,
provide a [`TextStyle`][] to the widget.

如果你希望在特定 Widget（例如 `Text` Widget）中使用该字体，可以通过
[`TextStyle`][] 中进行指定。

In this example, apply the RobotoMono font to a single `Text` widget.
Once again, the `fontFamily` must match the `family` name declared in the
`pubspec.yaml`.

在这个例子中，我们将在一个 `Text` Widget 上使用 RobotoMono 字体。
同样的，这里的 fontFamily 的值必须与 pubspec.yaml 中声明的值相匹配。

<!-- skip -->
```dart
Text(
  'Roboto Mono sample',
  style: TextStyle(fontFamily: 'RobotoMono'),
);
```

### TextStyle

### 字体样式

If a [`TextStyle`][] object specifies a weight
or style for which there is no exact font file,
the engine uses one of the more generic files for the font and attempts to
extrapolate outlines for the requested weight and style.

如若 [`TextStyle`][] 指定的字体样式缺少相应的字体文件，
Engine 则会使用一个更加通用的字体文件，
并尝试推断所请求的字体 weight 和样式的轮廓。

## Complete example

## 完整样例

### Fonts

### 字体

The Raleway and RobotoMono fonts were downloaded from
[Google Fonts][].

Raleway 和 RobotoMono 字体是从 [Google Fonts](https://fonts.google.com) 下载的。

### `pubspec.yaml`

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

### `main.dart`

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Custom Fonts',
      // Set Raleway as the default app font.
      theme: ThemeData(fontFamily: 'Raleway'),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // The AppBar uses the app-default Raleway font.
      appBar: AppBar(title: Text('Custom Fonts')),
      body: Center(
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

![Custom Fonts Demo](/images/cookbook/fonts.png){:.site-mobile-screenshot}
[Export fonts from a package]:  /docs/cookbook/design/package-fonts
[`fontFamily`]: {{site.api}}/flutter/painting/TextStyle/fontFamily.html
[`fontStyle`]: {{site.api}}/flutter/painting/TextStyle/fontStyle.html
[`FontStyle`]: {{site.api}}/flutter/dart-ui/FontStyle-class.html
[`fontWeight`]: {{site.api}}/flutter/painting/TextStyle/fontWeight.html
[`FontWeight`]: {{site.api}}/flutter/dart-ui/FontWeight-class.html
[Google Fonts]: https://fonts.google.com
[google_fonts]: {{site.pub-pkg}}/google_fonts
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[Using Themes to share colors and font styles]: /docs/cookbook/design/themes
