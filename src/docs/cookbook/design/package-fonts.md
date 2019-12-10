---
title: Export fonts from a package
title: 以 package 的方式使用字体
prev:
  title: Display a snackbars
  title: 显示 SnackBars
  path: /docs/cookbook/design/snackbars
next:
  title: Update the UI based on orientation
  title: 根据屏幕方向更新界面
  path: /docs/cookbook/design/orientation
---

Rather than declaring a font as part of an app,
you can declare a font as part of a separate package.
This is a convenient way to share the same font across
several different projects,
or for coders publishing their packages to [pub.dev][].
This recipe uses the following steps:

自定义字体，除了可以把字体文件作为应用的一部分之外，还可以通过 package 的方式使用，
这样有助于跨项目的字体共享，也可以更方便的发布到 [pub.dev][]。

## Directions

## 步骤

  1. Add a font to a package.

     将字体添加到 package
  
  2. Add the package and font to the app.
  
     将 package 和字体添加到应用
  
  3. Use the font.
  
     使用字体

## 1. Add a font to a package

## 1. 将字体添加到 package

To export a font from a package, you need to import the font files into the
`lib` folder of the package project. You can place font files directly in the
`lib` folder or in a subdirectory, such as `lib/fonts`.

通过 package 的方式使用字体，需要将字体文件导入 package 项目的 `lib` 文件夹中。
你既可以将字体文件直接放在 `lib` 文件夹中，也可以放在子目录中，例如 `lib/fonts`。

In this example, assume you've got a Flutter library called
`awesome_package` with fonts living in a `lib/fonts` folder.

在此示例中，假设你已有一个名为 `awesome_package` 的 library，
其中包含了 `lib/fonts` 文件夹中的字体资源。

```
awesome_package/
  lib/
    awesome_package.dart
    fonts/
      Raleway-Regular.ttf
      Raleway-Italic.ttf
```

## 2. Add the package and fonts to the app

## 2. 将 package 和字体添加到应用

Now you can use the fonts in the package by
updating the `pubspec.yaml` in the *app's* root directory.

现在你可以使用该 package 以及它提供的字体。
我们来编辑 *应用程序* 根目录下的 `pubspec.yaml` 文件。

### Add the package to the app

### 将 package 添加到应用中

```yaml
dependencies:
  awesome_package: <latest_version>
```

### Declare the font assets

### 声明字体资源

Now that you've imported the package, tell Flutter where to
find the fonts from the `awesome_package`.

现在已经导入了 package，你需要告之 Flutter
在 `awesome_package` 中的哪里可以找到字体文件。

To declare package fonts, prefix the path to the font with
`packages/awesome_package`.
This tells Flutter to look in the `lib` folder
of the package for the font.

要想声明 package 中的字体，必须在 `packages/awesome_package` 的路径前加上字体声明。
这将会让 Flutter 检索到 `lib` package 的文件夹中的字体。

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

Use a [`TextStyle`][] to change the appearance of text.
To use package fonts, declare which font you'd like to use and
which package the font belongs to.

你可以使用 [`TextStyle`][] 来更改文本的外观。
在使用 package 中的字体时，你不仅需要声明该文字所要使用的字体，
还需要声明字体所属的 `package`。

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

## 完整样例

### Fonts

### 字体

The Raleway and RobotoMono fonts were downloaded from
[Google Fonts][].

这里所使用的 Raleway 和 RobotoMono 字体都是从 [Google Fonts](https://fonts.google.com/) 下载的 。

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
      // The AppBar uses the app-default font.
      appBar: AppBar(title: Text('Package Fonts')),
      body: Center(
        // This Text widget uses the Raleway font.
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

[Google Fonts]: https://fonts.google.com
[pub.dev]: {{site.pub}}
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
