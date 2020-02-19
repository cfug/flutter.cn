---
title: Using Themes to share colors and font styles
title: 使用 Themes 统一颜色和字体风格
short-title: Themes
short-title: Themes
description: How to share colors and font styles throughout an app using Themes.
description: 学习如何使用 Themes 统一颜色和字体风格。
prev:
  title: Update the UI based on orientation
  title: 根据屏幕方向更新界面
  path: /docs/cookbook/design/orientation
next:
  title: Use custom fonts
  title: 使用自定义字体
  path: /docs/cookbook/design/fonts
next:
  title: Work with tabs
  title: 使用 tabs
  path: /docs/cookbook/design/tabs
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

To share colors and font styles throughout an app, use themes.
You can either define app-wide themes, or use `Theme` widgets
that define the colors and font styles for a particular part
of the application. In fact,
app-wide themes are just `Theme` widgets created at
the root of an app by the `MaterialApp`.

通过定义 `Theme`，我们可以更好地复用颜色和字体样式，
从而让整个 app 的设计看起来更一致。
全局 Theme 会在整个 app 范围内生效，而局部 Theme 只作用于特定元素。
其实所谓的全局 Theme 和局部 Theme 的区别只在于，
全局 Theme 定义在了 app 的 root 处而已。
而 `MaterialApp` 已经事先为你预设了一个全局的 `Theme` Widget。

After defining a Theme, use it within your own widgets. Flutter's
Material widgets also use your Theme to set the background
colors and font styles for AppBars, Buttons, Checkboxes, and more.

在定义一个 `Theme` 之后，我们可以让它在指定的 widgets
（包括 Flutter 自带的 Material widgets，例如 AppBars、Buttons、Checkboxes 等等）中生效。

## Creating an app theme

## 定义一个全局 theme

To share a Theme across an entire app, provide a
[`ThemeData`][] to the `MaterialApp` constructor.

全局 Theme 会影响整个 app 的颜色和字体样式。
只需要向 `MaterialApp` 构造器传入 [`ThemeData`][] 即可。

If no `theme` is provided, Flutter creates a default theme for you.

如果没有放置 `Theme`，Flutter 将会使用预设的样式。

<!-- skip -->
```dart
MaterialApp(
  title: title,
  theme: ThemeData(
    // Define the default brightness and colors.
    brightness: Brightness.dark,
    primaryColor: Colors.lightBlue[800],
    accentColor: Colors.cyan[600],

    // Define the default font family.
    fontFamily: 'Georgia',

    // Define the default TextTheme. Use this to specify the default
    // text styling for headlines, titles, bodies of text, and more.
    textTheme: TextTheme(
      headline: TextStyle(fontSize: 72.0, fontWeight: FontWeight.bold),
      title: TextStyle(fontSize: 36.0, fontStyle: FontStyle.italic),
      body1: TextStyle(fontSize: 14.0, fontFamily: 'Hind'),
    ),
  )
);
```

See the [`ThemeData`][] documentation to see all of
the colors and fonts you can define.

在 [ThemeData]({{site.api}}/flutter/material/ThemeData-class.html) 查看所有可自定义的颜色和字体样式。

## Themes for part of an application

## 定义一个局部 Theme

To override the app-wide theme in part of an application,
wrap a section of the app in a `Theme` widget.

如果我们只想对局部进行样式修改，可以创建一个 `Theme` Widget。

There are two ways to approach this: creating a unique `ThemeData`,
or extending the parent theme.

有以下两种方式：定义一个独立的 `ThemeData`，或者从父级 Theme 扩展。
下面为你分别介绍。

### Creating unique `ThemeData`

### 定义一个独立的 `ThemeData`

If you don't want to inherit any application colors or font styles,
create a `ThemeData()` instance and pass that to the `Theme` widget.

如果不想从任何全局 Theme 继承样式，
我们可以创建一个 `ThemeData()` 实例，然后把它传给 `Theme` widget：

<!-- skip -->
```dart
Theme(
  // Create a unique theme with "ThemeData"
  data: ThemeData(
    accentColor: Colors.yellow,
  ),
  child: FloatingActionButton(
    onPressed: () {},
    child: Icon(Icons.add),
  ),
);
```

### Extending the parent theme

### 从父级 Theme 扩展

Rather than overriding everything, it often makes sense to extend the parent
theme. You can handle this by using the [`copyWith()`][] method.

相比从头开始定义一套样式，从父级 Theme 扩展可能更常规一些，使用 
[`copyWith()`][] 方法即可。

<!-- skip -->
```dart
Theme(
  // Find and extend the parent theme using "copyWith". See the next
  // section for more info on `Theme.of`.
  data: Theme.of(context).copyWith(accentColor: Colors.yellow),
  child: FloatingActionButton(
    onPressed: null,
    child: Icon(Icons.add),
  ),
);
```

## Using a Theme

## 使用定义好的 Theme

Now that you've defined a theme, use it within the widgets' `build()`
methods by using the `Theme.of(context)` method.

现在我们定义好了一个 theme，接下来我们该使用它了！
在我们 widget 的 `build` 方法中调用 `Theme.of(context)` 函数，
可以让这些主题样式生效。

The `Theme.of(context)` method looks up the widget tree and returns
the nearest `Theme` in the tree. If you have a standalone
`Theme` defined above your widget, that's returned.
If not, the app's theme is returned.

`Theme.of(context)` 会查询 widget 树，并返回其中最近的 `Theme`。
所以他会优先返回我们之前定义过的一个独立的 `Theme`，
如果找不到，它会返回全局 theme。

In fact, the `FloatingActionButton` uses this technique to find the
`accentColor`.

实际上，`FloatingActionButton` 就是使用这种方式来定义自己的 `accentColor` 的。

<!-- skip -->
```dart
Container(
  color: Theme.of(context).accentColor,
  child: Text(
    'Text with a background color',
    style: Theme.of(context).textTheme.title,
  ),
);
```

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appName = 'Custom Themes';

    return MaterialApp(
      title: appName,
      theme: ThemeData(
        // Define the default brightness and colors.
        brightness: Brightness.dark,
        primaryColor: Colors.lightBlue[800],
        accentColor: Colors.cyan[600],

        // Define the default font family.
        fontFamily: 'Georgia',

        // Define the default TextTheme. Use this to specify the default
        // text styling for headlines, titles, bodies of text, and more.
        textTheme: TextTheme(
          headline5: TextStyle(fontSize: 72.0, fontWeight: FontWeight.bold),
          headline6: TextStyle(fontSize: 36.0, fontStyle: FontStyle.italic),
          bodyText2: TextStyle(fontSize: 14.0, fontFamily: 'Hind'),
        ),
      ),
      home: MyHomePage(
        title: appName,
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, @required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Container(
          color: Theme.of(context).accentColor,
          child: Text(
            'Text with a background color',
            style: Theme.of(context).textTheme.headline6,
          ),
        ),
      ),
      floatingActionButton: Theme(
        data: Theme.of(context).copyWith(
          colorScheme:
              Theme.of(context).colorScheme.copyWith(secondary: Colors.yellow),
        ),
        child: FloatingActionButton(
          onPressed: null,
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/images/cookbook/themes.png" alt="Themes Demo" class="site-mobile-screenshot" />
</noscript>


[`copyWith()`]: {{site.api}}/flutter/material/ThemeData/copyWith.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
