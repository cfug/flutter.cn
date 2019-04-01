---
title: Exporting fonts from a package
title: 从 package 里导出字体
prev:
  title: Displaying SnackBars
  title: 显示 SnackBars
  path: /docs/cookbook/design/snackbars
next:
  title: Updating the UI based on orientation
  title: 根据屏幕方向更新界面
  path: /docs/cookbook/design/orientation
---

Rather than declaring a font as part of an app, you can declare a font as part
of a separate package. This is a convenient way to share the same font across
several different projects, or for coders publishing their packages to the
[Pub site][].

您可以将字体单独声明为 package（而不是应用程序）的一部分。这是一种能够让开发者在多个项目之间共享相同字体或者将 package 发布到 [Pub 网站](https://pub.flutter-io.cn/)的便捷方式。

## Directions

## 步骤

  1. Add a font to a package

     将字体添加到 package
  
  2. Add the package and font to the app
  
     将 package 和字体添加到应用程序
  
  3. Use the font
  
     使用字体

## 1. Add fonts to a package

## 1. 将字体添加到 package

To export a font from a package, you need to import the font files into the
`lib` folder of the package project. You can place font files directly in the
`lib` folder or in a subdirectory, such as `lib/fonts`.

要从 package 中导出字体，需要将字体文件导入 package 项目的 `lib` 文件夹中。您既可以将字体文件直接放在 `lib` 文件夹中，也可以放在子目录中，例如 `lib/fonts`。

In this example, assume you've got a Flutter library called
`awesome_package` with fonts living in a `lib/fonts` folder.

在此示例中，假设您已有一个叫做 `awesome_package` 的 Flutter 库，其中包含了 `lib/fonts` 文件夹中的字体资源。

```
awesome_package/
  lib/
    awesome_package.dart
    fonts/
      Raleway-Regular.ttf
      Raleway-Italic.ttf
```

## 2. Add the package and fonts to the app

## 2. 将 package 和字体添加到应用程序

You can now consume the package and use the fonts it provides.
This involves updating the `pubspec.yaml` in the *app's* root directory.

现在您可以使用该 package 以及它提供的字体。这将涉及更新位于*应用程序*根目录下的 `pubspec.yaml`。

### Add the package to the project

### 将package添加到项目中

```yaml
dependencies:
  awesome_package: <latest_version>
```

### Declare the font assets

### 声明字体资源

Now that you've imported the package, you need to tell Flutter where to
find the fonts from the `awesome_package`.

现在已经导入了 package，您需要告诉 Flutter 在 `awesome_package` 中哪里可以找到字体。

To declare package fonts, you must must prefix the path to the font with
`packages/awesome_package`. This tells Flutter to look in the `lib` folder
of the package for the font.

要声明 package 中的字体，您必须在 `packages/awesome_package` 的路径前加上字体声明。这将会让 Flutter 检查 `lib` package 的文件夹中的字体。

```yaml
flutter:
  fonts:
    - family: Raleway
      fonts:
        - asset: packages/awesome_package/fonts/Raleway-Regular.ttf
        - asset: packages/awesome_package/fonts/Raleway-Italic.ttf
          style: italic
```

## 3. Use the font

## 3. 使用字体

You can use a [`TextStyle`][] to change the appearance of text.
To use package fonts, you need to not only declare which font you'd like to use,
you need to declare the `package` the font belongs to.

您可以使用 [`TextStyle`](https://docs.flutter.io/flutter/painting/TextStyle-class.html) 来更改文本的外观。要使用 package 中的字体，您不仅需要声明要使用的字体，还需要声明字体所属的 `package`。

<!-- skip -->
```dart
Text(
  'Using the Raleway font from the awesome_package',
  style: TextStyle(
    fontFamily: 'Raleway',
    package: 'awesome_package',
  ),
);
```

## Complete example

## 一个完整的例子

### Fonts

### 字体

The Raleway and RobotoMono fonts were downloaded from
[Google Fonts](https://fonts.google.com).

Raleway 和 RobotoMono 字体都是从 [Google Fonts](https://fonts.google.com/) 下载的 。

### `pubspec.yaml`

```yaml
name: package_fonts
description: An example of how to use package fonts with Flutter

dependencies:
  awesome_package:
  flutter:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  fonts:
    - family: Raleway
      fonts:
        - asset: packages/awesome_package/fonts/Raleway-Regular.ttf
        - asset: packages/awesome_package/fonts/Raleway-Italic.ttf
          style: italic
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
      title: 'Package Fonts',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // The AppBar uses the app-default Raleway font.
      appBar: AppBar(title: Text('Package Fonts')),
      body: Center(
        // This Text Widget uses the RobotoMono font.
        child: Text(
          'Using the Raleway font from the awesome_package',
          style: TextStyle(
            fontFamily: 'Raleway',
            package: 'awesome_package',
          ),
        ),
      ),
    );
  }
}
```

![Package Fonts Demo](/images/cookbook/package-fonts.png){:.site-mobile-screenshot}

[Pub site]: {{site.pub}} 
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
