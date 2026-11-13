---
# title: Export fonts from a package
title: 以 package 的方式使用字体
# description: How to export fonts from a package.
description: 如何从 package 中导出字体。
tags: cookbook, 实用教程, 设计
keywords: Flutter使用字体,字体打包,开放字体,谷歌字体
---

<?code-excerpt path-base="cookbook/design/package_fonts"?>

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

:::note

Check out the [google_fonts][] package for direct access
to almost 1000 open-sourced font families.

查看 [google_fonts][] 库，你将可以直接访问近 1000 个开源字体族。

:::

## 1. Add a font to a package

## 1. 将字体添加到 package

To export fonts, place the files in your package's `lib` directory
or one of its subdirectories.
This example uses `lib/fonts` in a Flutter package named `awesome_package`.
Place the package directory next to your app directory.

如果要导出字体，请将文件放置在 package 的 `lib` 目录或其子目录中。
当前示例使用名为 `awesome_package` 的 Flutter package 中的 `lib/fonts` 目录。
请将该 package 目录放置在应用目录的同一层级。

<FileTree>

- awesome_package/
  - lib/
    - awesome_package.dart
    - fonts/
      - Raleway-Regular.ttf
      - Raleway-Italic.ttf
  - pubspec.yaml

</FileTree>

## 2. Add the package and fonts to the app

## 2. 将 package 和字体添加到应用

Now you can use the fonts in the package by
updating the `pubspec.yaml` in the *app's* root directory.

现在你可以使用该 package 以及它提供的字体。
我们来编辑 *应用程序* 根目录下的 `pubspec.yaml` 文件。

{% render "docs/cookbook/material-ui-dependency.md", site: site %}

### Add the package to the app

### 将 package 添加到应用中

From your app's directory, add `awesome_package`
using a [path package descriptor][].

在应用程序的目录下，
使用 [package 路径描述符][path package descriptor]

```console
$ flutter pub add "awesome_package:{path: ../awesome_package}"
```

[path package descriptor]: {{site.dart-site}}/tools/pub/dependencies#path-package-descriptor

### Declare the font assets

### 声明字体资源

In your app's `pubspec.yaml`, declare the font files from `awesome_package`.

在你应用的 `pubspec.yaml` 文件中，
声明来自 `awesome_package` 的字体文件。

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

<a id="use" aria-hidden="true"></a>

## 3. Use the font

## 3. 使用字体

Use a [`TextStyle`][] to change the appearance of text.
To use package fonts, declare which font you'd like to use and
which package the font belongs to.

你可以使用 [`TextStyle`][] 来更改文本的外观。
在使用 package 中的字体时，你不仅需要声明该文字所要使用的字体，
还需要声明字体所属的 `package`。

<?code-excerpt "lib/main.dart (TextStyle)"?>
```dart
child: Text(
  'Using the Raleway font from the awesome_package',
  style: TextStyle(fontFamily: 'Raleway'),
),
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

environment:
  sdk: ^3.13.0

dependencies:
  awesome_package:
    path: ../awesome_package
  flutter:
    sdk: flutter
  material_ui: ^1.11.0

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

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:material_ui/material_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Package Fonts', home: MyHomePage());
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // The AppBar uses the app-default font.
      appBar: AppBar(title: const Text('Package Fonts')),
      body: const Center(
        // This Text widget uses the Raleway font.
        child: Text(
          'Using the Raleway font from the awesome_package',
          style: TextStyle(fontFamily: 'Raleway'),
        ),
      ),
    );
  }
}
```

![Package Fonts Demo](/assets/images/docs/cookbook/package-fonts.png){:.site-mobile-screenshot}

[Google Fonts]: https://fonts.google.com
[google_fonts]: {{site.pub-pkg}}/google_fonts
[pub.dev]: {{site.pub}}
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
