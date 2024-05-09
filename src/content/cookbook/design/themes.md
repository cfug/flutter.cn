---
# title: Use themes to share colors and font styles
title: 使用 Themes 统一颜色和字体风格
# short-title: Themes
short-title: 主题
# description: How to share colors and font styles throughout an app using Themes.
description: 学习如何使用 Themes 统一颜色和字体风格。
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/design/themes"?>

:::note

This recipe uses Flutter's support for [Material 3][] and
the [google_fonts][] package. As of the Flutter 3.16 release,
Material 3 is Flutter's default theme.

本文内容使用了 Flutter 的 [Material 3][]
以及 [google_fonts][] package 的支持。
从 Flutter 3.16 版本开始，
Material 3 是 Flutter 的默认主题。

:::

[Material 3]: /ui/design/material
[google_fonts]: {{site.pub-pkg}}/google_fonts

To share colors and font styles throughout an app, use themes.

你可以使用主题来全局应用颜色和文字样式。

You can define app-wide themes.
You can extend a theme to change a theme style for one component.
Each theme defines the colors, type style, and other parameters
applicable for the type of Material component.

你可以定义应用全局的主题。
你也可以为某一个组件单独继承一个特定的主题。
每个主题都可以各自定义颜色、文字样式和其他 Material 配置参数。

Flutter applies styling in the following order:

Flutter 会按以下顺序应用样式：

1. Styles applied to the specific widget.

   针对特定 widget 的样式。

1. Themes that override the immediate parent theme.

   重载的继承主题的样式。

1. Main theme for the entire app.

   应用的总体样式。

After you define a `Theme`, use it within your own widgets.
Flutter's Material widgets use your theme to set the background
colors and font styles for app bars, buttons, checkboxes, and more.

在定义一个 `Theme` 之后，我们可以让它在指定的 widgets，
包括 Flutter 自带的 Material widgets，例如
AppBars、Buttons、Checkboxes 等 widget 中生效。

## Create an app theme

To share a `Theme` across your entire app, set the `theme` property
to your `MaterialApp` constructor.
This property takes a [`ThemeData`][] instance.

全局 Theme 会影响整个 app 的颜色和字体样式。
只需要向 `MaterialApp` 构造器传入 [`ThemeData`][] 即可。

As of the Flutter 3.16 release, Material 3 is Flutter's
default theme.

从 Flutter 3.16 版本开始，
Material 3 是 Flutter 的默认主题。

If you don't specify a theme in the constructor,
Flutter creates a default theme for you.

如果没有手动配置主题，Flutter 将会使用预设的样式。

<?code-excerpt "lib/main.dart (MaterialApp)" replace="/return //g"?>
```dart
MaterialApp(
  title: appName,
  theme: ThemeData(
    useMaterial3: true,

    // Define the default brightness and colors.
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.purple,
      // ···
      brightness: Brightness.dark,
    ),

    // Define the default `TextTheme`. Use this to specify the default
    // text styling for headlines, titles, bodies of text, and more.
    textTheme: TextTheme(
      displayLarge: const TextStyle(
        fontSize: 72,
        fontWeight: FontWeight.bold,
      ),
      // ···
      titleLarge: GoogleFonts.oswald(
        fontSize: 30,
        fontStyle: FontStyle.italic,
      ),
      bodyMedium: GoogleFonts.merriweather(),
      displaySmall: GoogleFonts.pacifico(),
    ),
  ),
  home: const MyHomePage(
    title: appName,
  ),
);
```

Most instances of `ThemeData` set values for the following two properties. These properties affect the entire app.

大部分 `ThemeData` 实例会设置以下两个属性。它们会影响大部分样式属性。

1. [`colorScheme`][] defines the colors.

   [`colorScheme`][] 定义了颜色。

1. [`textTheme`][] defines text styling.

   [`textTheme`][] 定义了文字样式。

[`colorScheme`]: {{site.api}}/flutter/material/ThemeData/colorScheme.html
[`textTheme`]: {{site.api}}/flutter/material/ThemeData/textTheme.html

To learn what colors, fonts, and other properties, you can define,
check out the [`ThemeData`][] documentation.

你可以在 [`ThemeData`][] 文档中查看所有可自定义的颜色和字体样式。

## Apply a theme

## 应用指定的主题

To apply your new theme, use the `Theme.of(context)` method
when specifying a widget's styling properties.
These can include, but are not limited to, `style` and `color`.

要想应用你的主题，使用 `Theme.of(context)` 方法来指定 widget 的样式属性。
其包括但不限于样式和颜色。

The `Theme.of(context)` method looks up the widget tree and retrieves
the nearest `Theme` in the tree.
If you have a standalone `Theme`, that's applied.
If not, Flutter applies the app's theme.

`Theme.of(context)` 会查询 widget 树，并返回其中最近的 `Theme`。
所以他会优先返回我们之前定义过的一个独立的 `Theme`，
如果找不到，它会返回全局主题。

In the following example, the `Container` constructor uses this technique to set its `color`.

在下面的例子中，`Container` 的颜色使用的就是指定主题（上层）的颜色。

<?code-excerpt "lib/main.dart (Container)" replace="/^child: //g"?>
```dart
Container(
  padding: const EdgeInsets.symmetric(
    horizontal: 12,
    vertical: 12,
  ),
  color: Theme.of(context).colorScheme.primary,
  child: Text(
    'Text with a background color',
    // ···
    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
          color: Theme.of(context).colorScheme.onPrimary,
        ),
  ),
),
```

## Override a theme

To override the overall theme in part of an app,
wrap that section of the app in a `Theme` widget.

你可以用 `Theme` widget 嵌套想要改变主题的部分以进行主题重载。

You can override a theme in two ways:

以下是两种重载主题的方法：

1. Create a unique `ThemeData` instance.

   构造一个不一样的 `ThemeData` 实例。

2. Extend the parent theme.

   继承上层主题。

### Set a unique `ThemeData` instance

If you want a component of your app to ignore the overall theme,
create a `ThemeData` instance.
Pass that instance to the `Theme` widget.

如果不想从任何全局 Theme 继承样式，
我们可以创建一个 `ThemeData()` 实例，
然后把它传给 `Theme` widget：

<?code-excerpt "lib/main.dart (Theme)"?>
```dart
Theme(
  // Create a unique theme with `ThemeData`.
  data: ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.pink,
    ),
  ),
  child: FloatingActionButton(
    onPressed: () {},
    child: const Icon(Icons.add),
  ),
);
```

### Extend the parent theme

Instead of overriding everything, consider extending the parent theme.
To extend a theme, use the [`copyWith()`][] method.

相比从头开始定义一套样式，从上层 Theme 扩展可能更常规一些，
使用 [`copyWith()`][] 方法即可。

<?code-excerpt "lib/main.dart (ThemeCopyWith)"?>
```dart
Theme(
  // Find and extend the parent theme using `copyWith`.
  // To learn more, check out the section on `Theme.of`.
  data: Theme.of(context).copyWith(
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.pink,
    ),
  ),
  child: const FloatingActionButton(
    onPressed: null,
    child: Icon(Icons.add),
  ),
);
```

## Watch a video on `Theme`

## 观看 `Theme` 的相关视频

To learn more, watch this short Widget of the Week video on the `Theme` widget:

想要了解更多，你可以观看 Widget of the Week 中关于 `Theme` 的短视频：

<iframe class="full-width" src="{{site.yt.embed}}/oTvQDJOBXmM" title="了解 Theme Flutter Widget" {{site.yt.set}}></iframe>

## Try an interactive example

## 交互式样例

<?code-excerpt "lib/main.dart (FullApp)"?>
```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
import 'package:flutter/material.dart';
// Include the Google Fonts package to provide more text format options
// https://pub.dev/packages/google_fonts
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appName = 'Custom Themes';

    return MaterialApp(
      title: appName,
      theme: ThemeData(
        useMaterial3: true,

        // Define the default brightness and colors.
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.purple,
          // TRY THIS: Change to "Brightness.light"
          //           and see that all colors change
          //           to better contrast a light background.
          brightness: Brightness.dark,
        ),

        // Define the default `TextTheme`. Use this to specify the default
        // text styling for headlines, titles, bodies of text, and more.
        textTheme: TextTheme(
          displayLarge: const TextStyle(
            fontSize: 72,
            fontWeight: FontWeight.bold,
          ),
          // TRY THIS: Change one of the GoogleFonts
          //           to "lato", "poppins", or "lora".
          //           The title uses "titleLarge"
          //           and the middle text uses "bodyMedium".
          titleLarge: GoogleFonts.oswald(
            fontSize: 30,
            fontStyle: FontStyle.italic,
          ),
          bodyMedium: GoogleFonts.merriweather(),
          displaySmall: GoogleFonts.pacifico(),
        ),
      ),
      home: const MyHomePage(
        title: appName,
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  const MyHomePage({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title,
            style: Theme.of(context).textTheme.titleLarge!.copyWith(
                  color: Theme.of(context).colorScheme.onSecondary,
                )),
        backgroundColor: Theme.of(context).colorScheme.secondary,
      ),
      body: Center(
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: 12,
            vertical: 12,
          ),
          color: Theme.of(context).colorScheme.primary,
          child: Text(
            'Text with a background color',
            // TRY THIS: Change the Text value
            //           or change the Theme.of(context).textTheme
            //           to "displayLarge" or "displaySmall".
            style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                  color: Theme.of(context).colorScheme.onPrimary,
                ),
          ),
        ),
      ),
      floatingActionButton: Theme(
        data: Theme.of(context).copyWith(
          // TRY THIS: Change the seedColor to "Colors.red" or
          //           "Colors.blue".
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.pink,
            brightness: Brightness.dark,
          ),
        ),
        child: FloatingActionButton(
          onPressed: () {},
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/themes.png" alt="Themes Demo" class="site-mobile-screenshot" />
</noscript>

[`copyWith()`]: {{site.api}}/flutter/material/ThemeData/copyWith.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
