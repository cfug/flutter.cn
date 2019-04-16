---
title: Using Themes to share colors and font styles
title: 使用 Themes 统一颜色和字体风格
short-title: Themes
short-title: Themes
description: How to share colors and font styles throughout an app using Themes.
description: 学习如何使用 Themes 统一颜色和字体风格。
prev:
  title: Updating the UI based on orientation
  title: 根据屏幕方向更新界面
  path: /docs/cookbook/design/orientation
next:
  title: Using custom fonts
  title: 使用自定义字体
  path: /docs/cookbook/design/fonts
---

In order to share colors and font styles throughout our app, we can take
advantage of themes. There are two ways to define themes: App-wide or using
`Theme` Widgets that define the colors and font styles for a particular part of
our application. In fact, app-wide themes are just `Theme` Widgets created at
the root of our apps by the `MaterialApp`!

通过定义 `Theme`，我们可以更好地复用颜色和字体样式，从而让整个 app 的设计看起来更一致。全局 `Theme` 会在整个 app 范围内生效，而局部 `Theme` 只作用于特定元素。其实所谓的全局 theme 和局部 theme 的区别只在于，全局 theme 定义在了 app 的 root 处而已。而 `MaterialApp` 已经事先为你预设了一个全局的 `Theme` Widget。

After we define a Theme, we can use it within our own Widgets. In addition, the
Material Widgets provided by Flutter will use our Theme to set the background
colors and font styles for AppBars, Buttons, Checkboxes, and more.

在定义一个 `Theme` 之后，我们可以让它在指定的 Widgets（包括 Flutter 自带的 Material Widgets，例如 AppBars, Buttons, Checkboxes 等等）中生效。

## Creating an app theme

## 定义一个全局 theme

In order to share a Theme containing colors and font styles across our entire
app, we can provide
[`ThemeData`]({{site.api}}/flutter/material/ThemeData-class.html)
to the `MaterialApp` constructor.

If no `theme` is provided, Flutter creates a fallback theme under the hood.

全局 theme 会作用于整个 app。Flutter 已经为你预设了默认值。你也可以覆盖这些默认值，只需要向 `MaterialApp` 构建器传送 [`ThemeData`]({{site.api}}/flutter/material/ThemeData-class.html) 即可。

<!-- skip -->
```dart
MaterialApp(
  title: title,
  theme: ThemeData(
    // Define the default Brightness and Colors
    brightness: Brightness.dark,
    primaryColor: Colors.lightBlue[800],
    accentColor: Colors.cyan[600],
    
    // Define the default Font Family
    fontFamily: 'Montserrat',
    
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

Please see the [ThemeData]({{site.api}}/flutter/material/ThemeData-class.html)
documentation to see all of the colors and fonts you can define.

在 [ThemeData]({{site.api}}/flutter/material/ThemeData-class.html) 查看所有可自定义的颜色和字体样式。

## Themes for part of an application

## 定义一个局部 theme

If we want to override the app-wide theme in part of our application, we can
wrap a section of our app in a `Theme` Widget.

如果我们只想对局部进行样式修改，可以创建一个 `Theme` Widget。

There are two ways to approach this: creating unique `ThemeData`, or
extending the parent theme.

有以下两种方式：定义一个独立的 `ThemeData`，或者从父级 theme 扩展。下面为你分别介绍。

### Creating unique `ThemeData`

### 定义一个独立的 `ThemeData`

If we don't want to inherit any application colors or font styles, we can create
a `ThemeData()` instance and pass that to the `Theme` Widget.

如果不想从任何全局 theme 继承样式，我们可以创建一个 `ThemeData()` 实例，然后把它传给 `Theme` Widget：

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
theme. We can achieve this by using the
[`copyWith`]({{site.api}}/flutter/material/ThemeData/copyWith.html)
method.

相比从头开始定义一套样式，从父级 theme 扩展可能更常规一些，使用 [`copyWith`]({{site.api}}/flutter/material/ThemeData/copyWith.html) 方法即可。

<!-- skip -->
```dart
Theme(
  // Find and Extend the parent theme using "copyWith". Please see the next
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

Now that we've defined a theme, we can use it within our Widget `build` methods
by using the `Theme.of(context)` function!

现在我们定义好了一个 theme，接下来我们该使用它了！在我们的 Widget 的 `build` 方法中调用 `Theme.of(context)` 函数，我们可以让这些 theme 生效。

`Theme.of(context)` looks up the Widget tree and return the nearest `Theme`
in the tree. If we have a stand-alone `Theme` defined above our Widget, it
returns that. If not, it returns the App theme.

`Theme.of(context)` 会查询 Widget tree，并返回其中最近的 `Theme`。所以他会优先返回我们之前定义过的一个独立的 `Theme`，如果找不到，它会返回全局 theme。

In fact, the `FloatingActionButton` uses this exact technique to find the
`accentColor`!

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

## Complete example

## 完整的例子

```dart
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
        // Define the default Brightness and Colors
        brightness: Brightness.dark,
        primaryColor: Colors.lightBlue[800],
        accentColor: Colors.cyan[600],

        // Define the default Font Family
        fontFamily: 'Montserrat',

        // Define the default TextTheme. Use this to specify the default
        // text styling for headlines, titles, bodies of text, and more.
        textTheme: TextTheme(
          headline: TextStyle(fontSize: 72.0, fontWeight: FontWeight.bold),
          title: TextStyle(fontSize: 36.0, fontStyle: FontStyle.italic),
          body1: TextStyle(fontSize: 14.0, fontFamily: 'Hind'),
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
            style: Theme.of(context).textTheme.title,
          ),
        ),
      ),
      floatingActionButton: Theme(
        data: Theme.of(context).copyWith(accentColor: Colors.yellow),
        child: FloatingActionButton(
          onPressed: null,
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```

![Themes Demo](/images/cookbook/themes.png){:.site-mobile-screenshot}
