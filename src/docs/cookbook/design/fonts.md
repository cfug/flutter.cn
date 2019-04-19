---
title: Using custom fonts
title: 使用自定义字体
short-title: Custom fonts
short-title: 自定义字体
description: How to use custom fonts.
description: 学习如何在 Flutter 里使用自定义字体
prev:
  title: Using Themes to share colors and font styles
  title: 使用 Themes 统一颜色和字体风格
  path: /docs/cookbook/design/themes
next:
  title: Working with Tabs
  title: 使用 Tabs
  path: /docs/cookbook/design/tabs
---

While Android and iOS offer high quality system fonts, one of the most common
requests from designers is to use custom fonts. For example, you may have a
custom-built font from a designer, or maybe you downloaded a font from
[Google Fonts](https://fonts.google.com).

尽管 Android 和 iOS 已经提供了一套高质量系统字体，然而通常设计师还是会要求使用自定义字体。例如，你可能需要使用设计师提供的自定义字体，或者从 [Google Fonts](https://fonts.google.com) 下载的字体。

Flutter works out of the box with custom fonts. You can apply fonts across an
entire app or to individual Widgets.

Flutter 为自定义字体提供了一套开箱即用的方法。你不仅能够将其用于整个 app，还可以用在个别 Widget 中。

## Directions

## 步骤

  1. Import the font files

     导入字体文件

  2. Declare the font in the `pubspec.yaml`

     在 `pubspec.yaml` 中声明字体

  3. Set a font as the default

     设置默认字体

  4. Use a font in a specific Widget
  
     将字体用于特定 Widget

## 1. Import the font files

## 1. 导入字体文件

In order to work with a font, you need to import the font files into the
project.  It is common practice to put font files in a `fonts` or `assets`
folder at the root of a Flutter project.

要使用字体，你需要将字体文件导入到项目中。常见的做法是将字体文件放在项目根目录下的 `fonts` 或者 `assets` 文件夹中。

For example, if you want to import the Raleway and Roboto Mono font files into
a project, the folder structure would look like this:

例如，如果你想要在项目中导入 Raleway 和 Roboto Mono 字体，文件夹结构会像下面这样：

```
awesome_app/
  fonts/
    Raleway-Regular.ttf
    Raleway-Italic.ttf
    RobotoMono-Regular.ttf
    RobotoMono-Bold.ttf
```

## 2. Declare the font in the `pubspec.yaml`

## 2. 在 `pubspec.yaml` 中声明字体

Now that you have a font to work with, you need to tell Flutter where to
find it. You can do so by including a font definition in the `pubspec.yaml`.

现在你已经有一个字体可以使用，接下来则需要告诉 Flutter 它在哪。你可以在 `pubspec.yaml` 中像这样声明。

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
[`fontFamily`]({{site.api}}/flutter/painting/TextStyle/fontFamily.html)
property of a [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html)
object.

`family` 属性决定了字体的名称，你将会在 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 的 [`fontFamily`]({{site.api}}/flutter/painting/TextStyle/fontFamily.html) 属性中用到。

The `asset` is a path to the font file, relative to the `pubspec.yaml` file.
These files contain the outlines for the glyphs in the font. When building the
app, these files are included in the app's asset bundle.

`asset` 是字体文件对于 `pubspec.yaml` 文件的相对路径。这些文件包含了字体中字形的轮廓。构建应用时，这些文件将会被包含在应用程序的资源包中。

A single font can reference many different files with different outline weights
and styles:

单个字体可以引用多个不同轮廓字重及风格的文件：

  * The `weight` property specifies the weight of the outlines in the file as an
    integer multiple of 100, between 100 and 900. These values correspond to the
    [`FontWeight`]({{site.api}}/flutter/dart-ui/FontWeight-class.html)
    and can be used in the
    [`fontWeight`]({{site.api}}/flutter/painting/TextStyle/fontWeight.html)
    property of a
    [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) object.

    `weight` 属性指定了文件中字体轮廓的字重为 100 的整数倍，并且范围在 100 和 900 之间。这些值对应 [`FontWeight`]({{site.api}}/flutter/dart-ui/FontWeight-class.html) 并能够在 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 对象的 [`FontWeight`]({{site.api}}/flutter/dart-ui/FontWeight-class.html) 属性上使用。

  * The `style` property specifies whether the outlines in the file are
    `italic` or `normal`. These values correspond to the
    [`FontStyle`]({{site.api}}/flutter/dart-ui/FontStyle-class.html)
    and can be used in the
    [fontStyle]({{site.api}}/flutter/painting/TextStyle/fontStyle.html)
    property of a
    [`TextStyle`]({{site.api}} /flutter/painting/TextStyle-class.html) object.

    `style` 属性指定文件中字体的轮廓是否为 `italic` 或 `normal`。这些值对应 [`FontStyle`]({{site.api}}/flutter/dart-ui/FontStyle-class.html) 并能够在 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 对象的 [fontStyle]({{site.api}}/flutter/painting/TextStyle/fontStyle.html) 属性上使用。

## 3. Set a font as the default

## 3. 设置默认字体

You have two options for how to apply fonts to text: as the default font
or only within specific Widgets.

关于如何应用这些字体，你有两种选择：将其设为默认字体，或者仅在某些特定 Widget 中使用。

To use a font as the default, set the `fontFamily` property as part of
the app's `theme`. The value provided to `fontFamily` must match the `family`
name declared in the `pubspec.yaml`.

如果你想要设为默认字体，请将 `fontFamily` 设为应用（全局）`theme` 的属性的一部分。提供的 `fontFamily` 的值必须与 pubspec.yaml 中声明的名称相匹配。

<!-- skip -->
```dart
MaterialApp(
  title: 'Custom Fonts',
  // Set Raleway as the default app font
  theme: ThemeData(fontFamily: 'Raleway'),
  home: MyHomePage(),
);
```

For more information on themes, please view the ["Using Themes to share colors
and font styles"](/docs/cookbook/design/themes) recipe.

有关主题的更多信息，请参阅 ["Using Themes to share colors and font styles"](/docs/cookbook/design/themes) 文档。

## 4. Use the font in a specific Widget

## 4. 将字体用于特定 Widget

If you want to apply the font to a specific Widget, such as a `Text` Widget,
provide a [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html)
to the Widget.

如果你希望在特定 Widget（例如 `Text` Widget）中使用该字体，可以通过 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 中进行指定。

In this example, you'll apply the RobotoMono font to a single `Text` Widget.
Once again, the `fontFamily` must match the `family` name declared in the
`pubspec.yaml`.

在这个例子中，你将会在一个 `Text` Widget 上使用 RobotoMono 字体。同样的，这里的 fontFamily 的值必须与 pubspec.yaml 中声明的值相匹配。

<!-- skip -->
```dart
Text(
  'Roboto Mono sample',
  style: TextStyle(fontFamily: 'RobotoMono'),
);
```

### TextStyle

### 字体样式

If a [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html)
object specifies a weight or style for which is there is no exact font file, the
engine uses one of the more generic files for the font and attempts to
extrapolate outlines for the requested weight and style.

如若 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 指定的字体样式缺少相应的字体文件，Engine 则会使用一个更加通用的字体文件，并尝试推断所请求的字体 weight 和样式的轮廓。

## Complete example

## 一个完整的例子

### Fonts

### 字体

The Raleway and RobotoMono fonts were downloaded from [Google
Fonts](https://fonts.google.com).

Raleway 和 RobotoMono 字体是从 [GoogleFonts](https://fonts.google.com) 下载的。

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
      // Set Raleway as the default app font
      theme: ThemeData(fontFamily: 'Raleway'),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // The AppBar uses the app-default Raleway font
      appBar: AppBar(title: Text('Custom Fonts')),
      body: Center(
        // This Text Widget uses the RobotoMono font
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
