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

尽管 Android 和 iOS 提供的系统字体质量不错，但是很多时候需要我们使用自定
义字体。例如，您可能需要使用字体设计师提供的自定义字体，或者可能您想要
使用 [Google Fonts](https://fonts.google.com) 中提供的字体。

Flutter works out of the box with custom fonts. You can apply fonts across an
entire app or to individual Widgets.

Flutter 中使用自定义字体不需要二次开发。您可以在整个应用或单个 Widget 中使
用自定义字体。

## Directions

## 步骤

  1. Import the font files
     导入字体文件
  2. Declare the font in the `pubspec.yaml`
     在 `pubspec.yaml` 中声明字体
  3. Set a font as the default
     设置字体为默认字体
  4. Use a font in a specific Widget
     设置特定 Widget 中的字体

## 1. Import the font files

## 1. 导入字体文件

In order to work with a font, you need to import the font files into the
project.  It is common practice to put font files in a `fonts` or `assets`
folder at the root of a Flutter project.

首先，您需要导入字体文件到项目中。字体文件一般放在 Flutter 项目根目录下
的文件夹 `fonts` 和 `assets` 中。

For example, if you want to import the Raleway and Roboto Mono font files into
a project, the folder structure would look like this:

例如，您想要在项目中导入 Raleway 和 Roboto Mono 字体，项目文件夹结构将
会如下所示：

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

现在，您已经导入字体到项目中，接下来您需要告诉 Flutter 到哪里找到它。您可以
像下面这样在 `pubspec.yaml` 中声明它。

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

### `pubspec.yaml` 属性定义

The `family` determines the name of the font, which you use in the
[`fontFamily`]({{site.api}}/flutter/painting/TextStyle/fontFamily.html)
property of a [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html)
object.

`family` 属性定义字体名称，您会在 [`fontFamily`]({{site.api}}/flutter/painting/TextStyle/fontFamily.html) 
属性的 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 
对象中使用。

The `asset` is a path to the font file, relative to the `pubspec.yaml` file.
These files contain the outlines for the glyphs in the font. When building the
app, these files are included in the app's asset bundle.

`asset` 定义的是字体文件相对于 `pubspec.yaml` 文件的路径。它包含字体
中字形的轮廓。构建应用程序时，这些文件包含在应用程序的资源包中。

A single font can reference many different files with different outline weights
and styles:

一个字体中可以引用多个不同风格和样式的文件：

  * The `weight` property specifies the weight of the outlines in the file as an
    integer multiple of 100, between 100 and 900. These values correspond to the
    [`FontWeight`]({{site.api}}/flutter/dart-ui/FontWeight-class.html)
    and can be used in the
    [`fontWeight`]({{site.api}}/flutter/painting/TextStyle/fontWeight.html)
    property of a
    [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) object.
    ~~`weight` 属性指定文件的样式权重为 100 的整数倍，介于 100 和 900 之间。~~
    ~~这些值对应于~~
    ~~[`FontWeight`]({{site.api}}/flutter/dart-ui/FontWeight-class.html)~~
    ~~和可以在对象的~~
    ~~[`fontWeight`]({{site.api}}/flutter/painting/TextStyle/fontWeight.html)~~
    ~~属性中使用~~
    ~~[`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 。~~
  * The `style` property specifies whether the outlines in the file are
    `italic` or `normal`. These values correspond to the
    [`FontStyle`]({{site.api}}/flutter/dart-ui/FontStyle-class.html)
    and can be used in the
    [fontStyle]({{site.api}}/flutter/painting/TextStyle/fontStyle.html)
    property of a
    [`TextStyle`]({{site.api}}* /flutter/painting/TextStyle-class.html) object.
    ~~`style` 属性指定文件中的样式是否为 italic 或 normal。这些值对应于~~
    ~~[`FontStyle`]({{site.api}}/flutter/dart-ui/FontStyle-class.html)~~
    ~~并且可以在对象的~~
    ~~[fontStyle]({{site.api}}/flutter/painting/TextStyle/fontStyle.html)~~
    ~~属性中使用~~
    ~~[`TextStyle`]({{site.api}}* /flutter/painting/TextStyle-class.html) 。~~

## 3. Set a font as the default

## 3. 设置字体为默认字体

You have two options for how to apply fonts to text: as the default font
or only within specific Widgets.

您有两种将字体应用于文本的选择：设置为默认字体或仅在特定 Widget 中使用。

To use a font as the default, set the `fontFamily` property as part of
the app's `theme`. The value provided to `fontFamily` must match the `family`
name declared in the `pubspec.yaml`.

如果您想设置应用默认字体，请将 `fontFamily` 属性设置到应用 `theme` 的
ThemeData 中。 fontFamily 的值必须与 pubspec.yaml 中声明的值匹配。

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

有关主题的更多信息，清查阅 ["Using Themes to share colors
and font styles"](/docs/cookbook/design/themes) 说明。

## 4. Use the font in a specific Widget

## 4. 在特定的 Widget 中使用字体

If you want to apply the font to a specific Widget, such as a `Text` Widget,
provide a [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html)
to the Widget.

如果您希望在特定 Widget 中使用字体，例如 `Text` Widget，则需要在 Widget 中
使用 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 。

In this example, you'll apply the RobotoMono font to a single `Text` Widget.
Once again, the `fontFamily` must match the `family` name declared in the
`pubspec.yaml`.

在这个例子中，您将会在 `Text` Widget 中应用 RobotoMono 字体。和前面提到的
一样， fontFamily 的值必须与 pubspec.yaml 中声明的值匹配。
<!-- skip -->

```dart
Text(
  'Roboto Mono sample',
  style: TextStyle(fontFamily: 'RobotoMono'),
);
```

### TextStyle

If a [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html)
object specifies a weight or style for which is there is no exact font file, the
engine uses one of the more generic files for the font and attempts to
extrapolate outlines for the requested weight and style.

~~如果 [`TextStyle`]({{site.api}}/flutter/painting/TextStyle-class.html) 对象没有指定字体样式或指定的样式没有找到字体文件，则 Flutter 会~~
~~使用该字体的其~~

## Complete example

### Fonts

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
