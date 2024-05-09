---
# title: Flutter for Xamarin.Forms developers
title: 给 Xamarin.Forms 开发者的 Flutter 指南
# description: Learn how to apply Xamarin.Forms developer knowledge when building Flutter apps.
description: 学习如何把 Xamarin.Forms 的开发经验应用到 Flutter 应用的开发中。
tags: Flutter教程,Flutter起步,Flutter入门
keywords: Flutter Xamarin.Forms,Xamarin.Forms,Xamarin.Forms转Flutter
---

<?code-excerpt path-base="get-started/flutter-for/xamarin_devs"?>

This document is meant for Xamarin.Forms developers
looking to apply their existing knowledge
to build mobile apps with Flutter.
If you understand the fundamentals of the Xamarin.Forms framework,
then you can use this document as a jump start to Flutter development.

本文档旨在帮助 Xamarin.Forms 开发者利用已有的知识去构建 Flutter 移动应用。
如果你懂得 Xamarin.Forms 框架的基本原理，
那么你就可以将本文档当作你开始 Flutter 开发的不错的起点。

Your Android and iOS knowledge and skill set
are valuable when building with Flutter,
because Flutter relies on the native operating system configurations,
similar to how you would configure your native Xamarin.Forms projects.
The Flutter Frameworks is also similar to how you create a single UI,
that is used on multiple platforms.

你的 Android 和 iOS 知识以及技能组合在构建 Flutter 时都是有价值的，
因为 Flutter 依赖的原生系统配置都与你配置 Xamarin.Forms 原生项目时一样。
Flutter 框架在创建适用于多个平台的单一界面时，与 Xamarin.Forms 是类似的。

This document can be used as a cookbook by jumping around
and finding questions that are most relevant to your needs.

这篇文档可以用作随时查阅以及答疑解惑的专题手册。

## Project setup

## 项目设置

### How does the app start?

### app 是如何运行的？

For each platform in Xamarin.Forms,
you call the `LoadApplication` method,
which creates a new application and starts your app.

对于 Xamarin.Forms 里的每个平台，你可以调用 `LoadApplication` 方法，
创建一个新应用并运行你的应用。

```csharp
LoadApplication(new App());
```

In Flutter, the default main entry point is
`main` where you load your Flutter app.

在 Flutter 中，加载 Flutter app 的默认主入口是 `main`。

<?code-excerpt "lib/main.dart (Main)"?>
```dart
void main() {
  runApp(const MyApp());
}
```

In Xamarin.Forms, you assign a `Page` to the
`MainPage` property in the `Application` class.

在 Xamarin.Forms 中，你会分配一个 `Page` 到
`Application` 类中的 `MainPage` 属性。

```csharp
public class App : Application
{
    public App()
    {
        MainPage = new ContentPage
        {
            Content = new Label
            {
                Text = "Hello World",
                HorizontalOptions = LayoutOptions.Center,
                VerticalOptions = LayoutOptions.Center
            }
        };
    }
}
```

In Flutter, "everything is a widget", even the application itself.
The following example shows `MyApp`, a simple application `Widget`.

在 Flutter 中，「万物皆 widget」，甚至连应用本身也是。
接下来的示例展示了 `MyApp`，一个简单的应用 `Widget`。

<?code-excerpt "lib/main.dart (MyApp)"?>
```dart
class MyApp extends StatelessWidget {
  /// This widget is the root of your application.
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'Hello World!',
        textDirection: TextDirection.ltr,
      ),
    );
  }
}
```

### How do you create a page?

### 如何创建一个页面？

Xamarin.Forms has many types of pages;
`ContentPage` is the most common.
In Flutter, you specify an application widget that holds your root page.
You can use a [`MaterialApp`][] widget, which supports [Material Design][],
or you can use a [`CupertinoApp`][] widget, which supports an iOS-style app,
or you can use the lower level [`WidgetsApp`][],
which you can customize in any way you want.

Xamarin.Forms 拥有一些不同类型的页面，`ContentPage` 是最为通用的。
在 Flutter 中，指定一个应用程序 widget 来控制你的根页面。
你可以使用一个 [`MaterialApp`][] widget，它支持 [Material Design][]；
你也可以使用 [`CupertinoApp`][] widget，它能用来创建 iOS 风格的应用；
或者你也可以使用更底层的 [`WidgetsApp`][]，可供你随心所欲地定制。

[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html

The following code defines the home page, a stateful widget.
In Flutter, all widgets are immutable,
but two types of widgets are supported: _Stateful_ and _Stateless_.
Examples of a stateless widget are titles, icons, or images.

接下来的代码定义了一个有状态的主页 widget。
在 Flutter 中，所有 widget 都是不可变的，并且包含以下两种主要的 widget：
**有状态** 和 **无状态** widget。
无状态 widget 的示例都是标题、图标或图片。

[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html

The following example uses `MaterialApp`,
which holds its root page in the `home` property.

下面的示例使用了 `MaterialApp`，它通过 `home` 属性中控制根页面。

<?code-excerpt "lib/page.dart (MyApp)"?>
```dart
class MyApp extends StatelessWidget {
  /// This widget is the root of your application.
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

From here, your actual first page is another `Widget`,
in which you create your state.

在这里真正的首页是另一个创建了状态的 `Widget` (`MyHomePage`)。

A _Stateful_ widget, such as `MyHomePage` below, consists of two parts.
The first part, which is itself immutable, creates a `State` object
that holds the state of the object. The `State` object persists over
the life of the widget.

一个 **有状态的** widget，例如下面的 MyHomePage，包含两个部分。
第一部分，是自身不变的 widget，创建一个状态对象来管理 widget 的状态。
状态对象在 widget 的整个生命周期中持续存在。

<?code-excerpt "lib/page.dart (MyHomePage)"?>
```dart
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}
```

The `State` object implements the `build()` method for the stateful widget.

`State` 对象实现了有状态 widget 中的 `build()` 方法。

When the state of the widget tree changes, call `setState()`,
which triggers a build of that portion of the UI.
Make sure to call `setState()` only when necessary,
and only on the part of the widget tree that has changed,
or it can result in poor UI performance.

当 widget 树的状态发生了改变，将会调用 `setState()`
触发 widget 当中该部分 UI 的构建。
确保只在需要时调用 `setState()`，
并且在只有部分 widget 树发生变化时调用，否则会造成糟糕的 UI 表现。

<?code-excerpt "lib/page.dart (MyHomePageState)"?>
```dart
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set the appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

In Flutter, the UI (also known as widget tree), is immutable,
meaning you can't change its state once it's built.
You change fields in your `State` class, then call `setState()`
to rebuild the entire widget tree again.

在 Flutter 中的 UI（也就是 widget 树）是不可变的，
意味着它一旦被构建，你就无法再改变它的状态。
你可以修改 `State` 类中的字段，并再次调用 `setState` 来重新构建整个 widget 树。

This way of generating UI is different from Xamarin.Forms,
but there are many benefits to this approach.

这样生成 UI 的方式不同于 Xamarin.Forms，但是却带来了更多好处。

## Views

## 视图

### What is the equivalent of a Page or Element in Flutter?

### 在 Flutter 中页面（Page）与元素（Element）的相同的是什么？

:::secondary

How is react-style, or _declarative_, programming different from the
traditional imperative style?
For a comparison, see [Introduction to declarative UI][].

响应式或者 **声明式** 的编程和传统的命令式风格有什么不同呢？
作为对比，请查阅 [声明式 UI 介绍][Introduction to declarative UI]。

:::

`ContentPage`, `TabbedPage`, `FlyoutPage` are all types of pages
you might use in a Xamarin.Forms application.
These pages would then hold `Element`s to display the various controls.
In Xamarin.Forms an `Entry` or `Button` are examples of an `Element`.

`ContentPage`、`TabbedPage`、`FlyoutPage`
就是你可以在 Xamarin.Forms 应用程序中使用的全部页面类型。
这些页面会控制 `Element` 来显示各种控件。
在 Xamarin.Forms 中，`Entry` 或者 `Button` 就是一个 `Element` 的示例。

In Flutter, almost everything is a widget.
A `Page`, called a `Route` in Flutter, is a widget.
Buttons, progress bars, and animation controllers are all widgets.
When building a route, you create a widget tree.

在 Flutter 中，几乎所有东西都是 widget，
在 Flutter 中被称作 `Route` 的一个 `Page`，也是一个 widget。
按钮、进度条、动画控制器都是 widget。
当构建一个路由时，就会创建一棵 widget 树。

Flutter includes the [Material Components][] library.
These are widgets that implement the [Material Design guidelines][].
Material Design is a flexible design system
[optimized for all platforms][], including iOS.

Flutter 包含 [Material 组件][Material Components] 库。
这些都是实现了 [Material Design 指南][Material Design guidelines] 的 widget。
Material Design 是一个灵活的
[针对所有平台][optimized for all platforms]
的设计系统，包括 iOS。

But Flutter is flexible and expressive enough
to implement any design language.
For example, on iOS, you can use the [Cupertino widgets][]
to produce an interface that looks like [Apple's iOS design language][].

不过，Flutter 有足够灵活和自描述性 (expressive) 去实现任何设计语言。
举个例子，在 iOS 上，你可以用 [Cupertino widgets][] 来生成一个看起来像
[苹果 iOS 设计语言][Apple's iOS design language] 的接口。

### How do I update widgets?

### 如何更新 widget？

In Xamarin.Forms, each `Page` or `Element` is a stateful class,
that has properties and methods.
You update your `Element` by updating a property,
and this is propagated down to the native control.

在 Xamarin.Forms 中，每一个 `Page` 或者 `Element` 都是一个有状态的类，
拥有一些属性和方法。通过更新一个属性来更新你的元素，而且这会传递到原生控件。

In Flutter, `Widget`s are immutable and you can't directly update them
by changing a property, instead you have to work with the widget's state.

在 Flutter 中，`widget` 是不可变的，你不可以直接地通过修改一个属性来更新它们，
而是应该使用 widget 的状态。

This is where the concept of Stateful vs Stateless widgets comes from.
A `StatelessWidget` is just what it sounds like&mdash;
a widget with no state information.

有状态 widget 和无状态 widget 的概念就是出自这里，
`StatelessWidget` 顾名思义，就是一个没有状态信息的 widget。

`StatelessWidgets` are useful when the part of the user interface
you are describing doesn't depend on anything
other than the configuration information in the object.

当你在描绘用户界面的一个不依赖除对象中的配置信息之外任何东西的部分时，
`StatelessWidget` 是有用的。

For example, in Xamarin.Forms, this is similar
to placing an `Image` with your logo.
The logo is not going to change during runtime,
so use a `StatelessWidget` in Flutter.

举个例子，在 Xamarin.Forms 中，可以轻而易举地用你的 logo 替换一张 `Image`。
这个 logo 将不会在运行过程中修改，所以在 Flutter 会使用 `StatelessWidget`。

If you want to dynamically change the UI based on data received
after making an HTTP call or a user interaction,
then you have to work with `StatefulWidget`
and tell the Flutter framework that
the widget's `State` has been updated,
so it can update that widget.

如果你想基于进行了 HTTP 调用或者用户交互后接收到的数据来动态地修改 UI，
你需要使用 `StatefulWidget` 并告诉 Flutter 框架这个 widget 的 `State`
已经被更新了所以它可以更新那个 widget。

The important thing to note here is at the core
both stateless and stateful widgets behave the same.
They rebuild every frame, the difference is
the `StatefulWidget` has a `State` object
that stores state data across frames and restores it.

这里要记下的重要内容是有状态和无状态 widget 的核心行为都是一样的。
他们重建每个结构，不同的是 `StatefulWidget` 拥有一个
`State` 对象来跨结构储存状态数据和恢复它。

If you are in doubt, then always remember this rule: if a widget changes
(because of user interactions, for example) it's stateful.
However, if a widget reacts to change, the containing parent widget can
still be stateless if it doesn't itself react to change.

如果你有疑惑，那么就记住这个规则：
如果一个 widget 改变了（例如是因为用户交互），它就是有状态的。
相反，如果一个 widget 对修改作出反应，
包含它的父 widget 如果本身没有对修改作出反应，它就是无状态的。

The following example shows how to use a `StatelessWidget`.
A common `StatelessWidget` is the `Text` widget.
If you look at the implementation of the `Text` widget
you'll find it subclasses `StatelessWidget`.

接下来的示例展示了如何使用一个 `StatelessWidget`。
一个常见的 `StatelessWidget` 是 `Text` widget。
如果你阅读了 `Text` widget 的实现，你会发现它是 `StatelessWidget` 的子类。

<?code-excerpt "lib/views.dart (Text)" replace="/return //g"?>
```dart
const Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
```

As you can see, the `Text` widget has no state information associated with it,
it renders what is passed in its constructors and nothing more.

如你所见，`Text` widget 没有状态信息与它关联，
它只渲染在它的构造函数中呈现的内容。

But, what if you want to make "I Like Flutter" change dynamically,
for example, when clicking a `FloatingActionButton`?

但是，如果你想动态地修改「I Like Flutter」呢？
例如在点击一个 `FloatingActionButton` 时进行修改。

To achieve this, wrap the `Text` widget in a `StatefulWidget`
and update it when the user clicks the button,
as shown in the following example:

为了实现这个目标，你需要将 `Text` widget 放到一个 `StatefulWidget` 中，
并在用用户点击按钮时更新它，正如接下来的例子：

<?code-excerpt "lib/views_stateful.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  /// Default placeholder text
  String textToShow = 'I Like Flutter';

  void _updateText() {
    setState(() {
      // Update the text
      textToShow = 'Flutter is Awesome!';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: Center(child: Text(textToShow)),
      floatingActionButton: FloatingActionButton(
        onPressed: _updateText,
        tooltip: 'Update Text',
        child: const Icon(Icons.update),
      ),
    );
  }
}
```

### How do I lay out my widgets? What is the equivalent of an XAML file?

### 我该如何布局我的 widget 呢？什么东西可以等价于一个 XAML 文件？

In Xamarin.Forms, most developers write layouts in XAML,
though sometimes in C#.
In Flutter, you write your layouts with a widget tree in code.

在 Xamarin.Forms 中，大部分开发者用 XAML 写布局，有时也会用到 C#。
在 Flutter 中编码一棵 widget 树来编写布局。

The following example shows how to display a simple widget with padding:

接下来的示例展示如何显示一个简单的带内边距的 widget：

<?code-excerpt "lib/padding.dart (Padding)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Sample App')),
    body: Center(
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.only(left: 20, right: 30),
        ),
        onPressed: () {},
        child: const Text('Hello'),
      ),
    ),
  );
}
```

You can view the layouts that Flutter has to offer in the
[widget catalog][].

你可以查看 Flutter 在 [widget 目录][widget catalog] 中提供的布局。

### How do I add or remove an Element from my layout?

### 如何从布局中添加或移除一个元素?

In Xamarin.Forms, you had to remove or add an `Element` in code.
This involved either setting the `Content` property or calling
`Add()` or `Remove()` if it was a list.

在 Xamarin.Forms 中，你需要在代码中移除或添加一个 `Element`。
如果是一个列表，这将会涉及设置 `Content` 属性
或者调用 `Add()` 或者 `Remove()` 方法。

In Flutter, because widgets are immutable there is no direct equivalent.
Instead, you can pass a function to the parent that returns a widget,
and control that child's creation with a boolean flag.

在 Flutter 中，因为 widget 都是不可变的，所以没有直接对等的东西。
但是你可以将一个构建 widget 的函数传递给父级，
并用布尔值控制它的子 widget 的创建。

The following example shows how to toggle between two widgets
when the user clicks the `FloatingActionButton`:

下面的示例展示当用户点击 `FloatingActionButton` 时，
如何在两个 widget 之间切换。

<?code-excerpt "lib/views.dart (AddRemoveElement)"?>
```dart
class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  /// Default value for toggle
  bool toggle = true;
  void _toggle() {
    setState(() {
      toggle = !toggle;
    });
  }

  Widget _getToggleChild() {
    if (toggle) {
      return const Text('Toggle One');
    }
    return CupertinoButton(
      onPressed: () {},
      child: const Text('Toggle Two'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: Center(child: _getToggleChild()),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggle,
        tooltip: 'Update Text',
        child: const Icon(Icons.update),
      ),
    );
  }
}
```

### How do I animate a widget?

### 如何让一个 widget 动起来？

In Xamarin.Forms, you create simple animations using ViewExtensions that
include methods such as `FadeTo` and `TranslateTo`.
You would use these methods on a view
to perform the required animations.

在 Xamarin.Forms 中，你可以利用 `FadeTo` 和 `TranslateTo`
等视图扩展方法（ViewExtensions）来创建简单的动画。
你需要在一个视图中使用这些方法来执行需要的动画。

```xml
<Image Source="{Binding MyImage}" x:Name="myImage" />
```

Then in code behind, or a behavior, this would fade in the image,
over a 1-second period.

在后面的代码或一个动作中，这个会在 1 秒内淡入这张图像。

```csharp
myImage.FadeTo(0, 1000);
```

In Flutter, you animate widgets using the animation library
by wrapping widgets inside an animated widget.
Use an `AnimationController`, which is an `Animation<double>`
that can pause, seek, stop and reverse the animation.
It requires a `Ticker` that signals when vsync happens,
and produces a linear interpolation between 0 and 1
on each frame while it's running.
You then create one or more`Animation`s and attach them to the controller.

Flutter 通过 `Animation<double>` 的子类
`AnimationController` 来暂停、播放、停止以及逆向播放动画。
它需要一个 `Ticker` 在垂直同步 (vsync) 的时候发出信号，
并且在运行的时候创建一个介于 0 和 1 之间的线性插值。
然后你就可以创建一个或多个 `Animation`，并将它们绑定到控制器上。

For example, you might use `CurvedAnimation`
to implement an animation along an interpolated curve.
In this sense, the controller is the "master" source of the animation progress
and the `CurvedAnimation` computes the curve
that replaces the controller's default linear motion.
Like widgets, animations in Flutter work with composition.

例如，你可以使用 `CurvedAnimation` 来实现一个曲线插值的动画。
在这种情况下，控制器决定了动画进度，
`CurvedAnimation` 计算用于替换控制器默认线性动画的曲线值。
与 Widget 一样，Flutter 中的动画效果也可以组合使用。

When building the widget tree, you assign the `Animation`
to an animated property of a widget,
such as the opacity of a `FadeTransition`,
and tell the controller to start the animation.

在构建 Widget 树的时候，你需要将 `Animation` 对象赋值给某个 Widget 的动画属性，
例如 `FadeTransition` 的不透明度属性，并让控制器开始动画。

The following example shows how to write a `FadeTransition` that fades
the widget into a logo when you press the `FloatingActionButton`:

下面的例子展示了如何实现一个点击 `FloatingActionButton` 时
将一个 Widget 渐变为一个图标的 `FadeTransition`：

<?code-excerpt "lib/animation.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const FadeAppTest());
}

class FadeAppTest extends StatelessWidget {
  /// This widget is the root of your application.
  const FadeAppTest({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Fade Demo',
      home: MyFadeTest(title: 'Fade Demo'),
    );
  }
}

class MyFadeTest extends StatefulWidget {
  const MyFadeTest({super.key, required this.title});

  final String title;

  @override
  State<MyFadeTest> createState() => _MyFadeTest();
}

class _MyFadeTest extends State<MyFadeTest> with TickerProviderStateMixin {
  late final AnimationController controller;
  late final CurvedAnimation curve;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    curve = CurvedAnimation(
      parent: controller,
      curve: Curves.easeIn,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Center(
        child: FadeTransition(
          opacity: curve,
          child: const FlutterLogo(size: 100),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          controller.forward();
        },
        tooltip: 'Fade',
        child: const Icon(Icons.brush),
      ),
    );
  }
}
```

For more information, see [Animation & Motion widgets][],
the [Animations tutorial][], and the [Animations overview][].

获取更多内容，请查看 [动画 & 运动 Widget][Animation & Motion widgets]、
[动画指南][Animations tutorial] 以及 [动画概览][Animations overview]。

### How do I draw/paint on the screen?

### 如何在屏幕上绘图？

Xamarin.Forms never had a built-in way to draw directly on the screen.
Many would use SkiaSharp, if they needed a custom image drawn.
In Flutter, you have direct access to the Skia Canvas
and can easily draw on screen.

Xamarin.Forms 从来没有任何内置的方法来直接在屏幕上绘图。
如果他们需要一个自定义图像绘制，大多数使用 SkiaSharp。
在 Flutter 中，你可以直接访问 Skia 画布（Skia Canvas）
方便地在屏幕上绘图。

Flutter has two classes that help you draw to the canvas: `CustomPaint`
and `CustomPainter`, the latter of which implements your algorithm to draw to
the canvas.

Flutter 有两个帮助你用画布 (canvas) 进行绘制的类：
`CustomPaint` 和 `CustomPainter`，
后者可以实现自定义的绘制算法。

To learn how to implement a signature painter in Flutter,
see Collin's answer on [Custom Paint][].

如果想学习在 Flutter 中如何实现一个签名功能，
可以查看 Collin 的回答 [Custom Paint][]。

[Custom Paint]: {{site.so}}/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter


<?code-excerpt "lib/draw.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: DemoApp()));
}

class DemoApp extends StatelessWidget {
  const DemoApp({super.key});

  @override
  Widget build(BuildContext context) => const Scaffold(body: Signature());
}

class Signature extends StatefulWidget {
  const Signature({super.key});

  @override
  SignatureState createState() => SignatureState();
}

class SignatureState extends State<Signature> {
  List<Offset?> _points = <Offset?>[];

  void _onPanUpdate(DragUpdateDetails details) {
    setState(() {
      final RenderBox referenceBox = context.findRenderObject() as RenderBox;
      final Offset localPosition = referenceBox.globalToLocal(
        details.globalPosition,
      );
      _points = List.from(_points)..add(localPosition);
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: _onPanUpdate,
      onPanEnd: (details) => _points.add(null),
      child: CustomPaint(
        painter: SignaturePainter(_points),
        size: Size.infinite,
      ),
    );
  }
}

class SignaturePainter extends CustomPainter {
  const SignaturePainter(this.points);

  final List<Offset?> points;

  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint = Paint()
      ..color = Colors.black
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 5;
    for (int i = 0; i < points.length - 1; i++) {
      if (points[i] != null && points[i + 1] != null) {
        canvas.drawLine(points[i]!, points[i + 1]!, paint);
      }
    }
  }

  @override
  bool shouldRepaint(SignaturePainter oldDelegate) =>
      oldDelegate.points != points;
}
```

### Where is the widget's opacity?

### widget 的不透明度在哪里？

On Xamarin.Forms, all `VisualElement`s have an Opacity.
In Flutter, you need to wrap a widget in an
[`Opacity` widget][] to accomplish this.

Xamarin.Forms 上，所有 `VisualElement` 都有不透明度的属性。
在 Flutter 中，你需要将 widget 放到一个
[不透明度 widget][`Opacity` widget] 来实现。

### How do I build custom widgets?

### 如何构建一个自定义 widget ？

In Xamarin.Forms, you typically subclass `VisualElement`,
or use a pre-existing `VisualElement`, to override and
implement methods that achieve the desired behavior.

在 Xamarin.Forms 中，通常派生 `VisualElement`
或使用一个已有的 `VisualElement` ，来重写和实现所需行为的方法。

In Flutter, build a custom widget by [composing][]
smaller widgets (instead of extending them).
It is somewhat similar to implementing a custom control
based off a `Grid` with numerous `VisualElement`s added in,
while extending with custom logic.

在 Flutter 中，通过 [组合][composing]
更小的 Widget 来创建自定义 Widget（而不是继承它们）。
这有点类似于基于 `Grid` 实现自定义控件，
其中添加了大量 `VisualElement`，同时使用自定义逻辑进行扩展。

For example, how do you build a `CustomButton`
that takes a label in the constructor?
Create a CustomButton that composes a `ElevatedButton`
with a label, rather than by extending `ElevatedButton`:

举例来说，你该如何创建一个在构造器接收标签参数的 `CustomButton`？
你要组合 `RaisedButton` 和一个标签来创建自定义按钮，
而不是继承 `RaisedButton`：

<?code-excerpt "lib/custom_button.dart (CustomButton)"?>
```dart
class CustomButton extends StatelessWidget {
  const CustomButton(this.label, {super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {},
      child: Text(label),
    );
  }
}
```

Then use `CustomButton`, just as you'd use any other Flutter widget:

然后就像使用其它 Flutter Widget 一样使用 `CustomButton`：

<?code-excerpt "lib/custom_button.dart (UseCustomButton)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Center(
    child: CustomButton('Hello'),
  );
}
```

## Navigation

## 导航

### How do I navigate between pages?

### 如何在页面之间导航？

In Xamarin.Forms, the `NavigationPage` class
provides a hierarchical navigation experience
where the user is able to navigate through pages,
forwards and backwards.

在 Xamarin.Forms 中，`NavigationPage` 类提供了一个
阶级式的导航方式，让用户可以在页面之间来回进行跳转。

Flutter has a similar implementation,
using a `Navigator` and `Routes`.
A `Route` is an abstraction for a `Page` of an app,
and a `Navigator` is a [widget][] that manages routes.

Flutter 也有类似的实现，使用 `Navigator` 和 `Route`。
`Route` 是应用程序里 `Page` 的抽象，
而 `Navigator` 是用于管理路由的 [widget][]。

A route roughly maps to a `Page`.
The navigator works in a similar way to the Xamarin.Forms `NavigationPage`,
in that it can `push()` and `pop()` routes depending on
whether you want to navigate to, or back from, a view.

一个路由大致上映射到一个 `Page`。
`Navigator` 的工作方式类似于 Xamarin.Forms 的 `NavigationPage`，
在里面可以 `push()` 和 `pop()` 路由，
取决于你是否想导航到一个视图，或者从它返回。

To navigate between pages, you have a couple options:

你有多种不同的方式在页面间导航：

* Specify a `Map` of route names. (`MaterialApp`)

  定义一个 route 名字的 `Map`。(MaterialApp)

* Directly navigate to a route. (`WidgetsApp`)

  直接导航到一个 route。(WidgetApp)

The following example builds a `Map`.

接下来构建一个 `Map` 映射的示例。

<?code-excerpt "lib/navigation.dart (Main)"?>
```dart
void main() {
  runApp(
    MaterialApp(
      home: const MyAppHome(), // becomes the route named '/'
      routes: <String, WidgetBuilder>{
        '/a': (context) => const MyPage(title: 'page A'),
        '/b': (context) => const MyPage(title: 'page B'),
        '/c': (context) => const MyPage(title: 'page C'),
      },
    ),
  );
}
```

Navigate to a route by pushing its name to the `Navigator`.

通过路由名 **压栈** (`push`) 到 `Navigator` 中来跳转到这个 route。

<?code-excerpt "lib/navigation.dart (PushNamed)"?>
```dart
Navigator.of(context).pushNamed('/b');
```

The `Navigator` is a stack that manages your app's routes.
Pushing a route to the stack moves to that route.
Popping a route from the stack, returns to the previous route.
This is done by awaiting on the `Future` returned by `push()`.

`Navigator` 管理应用程序的路由堆栈。
把一个路由推入堆栈可以导航到这个路由，
而从堆栈弹出一个路由可以返回到前一个路由。
这是通过 `await` 被 `push()` 返回的 `Future` 来完成的。

`async`/`await` is very similar to the .NET implementation
and is explained in more detail in [Async UI][].

`async`/`await` 与 .NET 的实现非常类似，在 [Async UI][] 中有更详尽的解释。

For example, to start a `location` route
that lets the user select their location,
you might do the following:

举个例子，想要让用户选择他们的定位的 `定位 (location)` 路由，你需要以下步骤：

<?code-excerpt "lib/navigation.dart (await)"?>
```dart
Object? coordinates = await Navigator.of(context).pushNamed('/location');
```

And then, inside your 'location' route, once the user has selected their
location, pop the stack with the result:

然后，在你的「定位」路由里，用户选择他们的定位后，通过 `pop()` 路由堆栈来返回结果。

<?code-excerpt "lib/navigation.dart (PopLocation)"?>
```dart
Navigator.of(context).pop({'lat': 43.821757, 'long': -79.226392});
```

### How do I navigate to another app?

### 如何导航到其它应用程序？

In Xamarin.Forms, to send the user to another application,
you use a specific URI scheme, using `Device.OpenUrl("mailto://")`.

在 Xamarin.Forms 中，需要用指定的 URI 协议并使用
`Device.OpenUrl("mailto://")` 跳转到其它应用程序。

To implement this functionality in Flutter,
create a native platform integration, or use an [existing plugin][],
such as[`url_launcher`][], available with many other packages on [pub.dev][].

在 Flutter 里想要实现这个功能，需要创建原生平台的整合层，
或者使用已经存在的 [插件][existing plugin]，例如
[`url_launcher`][]，可与在 [[pub.dev][] 上的许多其他包一起使用。。

## Async UI

## 异步 UI

### What is the equivalent of Device.BeginOnMainThread() in Flutter?

### 在 Flutter 中有什么是跟 Device.BeginOnMainThread() 方法是相等的？

Dart has a single-threaded execution model,
with support for `Isolate`s (a way to run Dart codes on another thread),
an event loop, and asynchronous programming.
Unless you spawn an `Isolate`,
your Dart code runs in the main UI thread
and is driven by an event loop.

Dart 有一个单线程执行的模型，同时也支持 `Isolate`
（在另一个线程运行 Dart 代码的方法），它是一个事件循环和异步编程方式。
除非你创建一个 `Isolate`，否则你的 Dart 代码会运行在主 UI 线程，
并被一个事件循环所驱动。

Dart's single-threaded model doesn't mean you need to run everything
as a blocking operation that causes the UI to freeze.
Much like Xamarin.Forms, you need to keep the UI thread free.
You would use `async`/`await` to perform tasks,
where you must wait for the response.

Dart 的单线程模型并不意味着你需要以会导致 UI 冻结的
阻塞操作的方式来运行所有代码。
与 Xamarin.Forms 一样，UI 线程应该尽可能地保持空闲。
你将使用 `async`/`wait` 来执行任务，其中必须等待响应。

In Flutter, use the asynchronous facilities that the Dart language provides,
also named `async`/`await`, to perform asynchronous work.
This is very similar to C# and should be very easy to use
for any Xamarin.Forms developer.

在 Flutter 中，可以使用 Dart 语言提供的异步工具，
例如 `async`/`await` 来执行异步任务。
这跟 C# 很像，并且对于 Xamarin.Forms 开发者来说应该是非常容易使用的。

For example, you can run network code without causing the UI to hang by
using `async`/`await` and letting Dart do the heavy lifting:

例如，你可以通过使用 `async`/`await`
来运行网络代码而且不会导致 UI 挂起，
同时让 Dart 来处理背后的繁重细节：

<?code-excerpt "lib/data.dart (loadData)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse(
    'https://jsonplaceholder.typicode.com/posts',
  );
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = jsonDecode(response.body);
  });
}
```

Once the awaited network call is done,
update the UI by calling `setState()`,
which triggers a rebuild of the widget subtree and updates the data.

一旦用 `await` 修饰的网络操作完成，再调用 `setState()` 更新 UI，
这会触发 widget 子树的重建并更新数据。

The following example loads data asynchronously
and displays it in a `ListView`:

下面的例子展示了异步加载数据并将之展示在 `ListView` 内：

<?code-excerpt "lib/data.dart"?>
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, dynamic>> data = <Map<String, dynamic>>[];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Future<void> loadData() async {
    final Uri dataURL = Uri.parse(
      'https://jsonplaceholder.typicode.com/posts',
    );
    final http.Response response = await http.get(dataURL);
    setState(() {
      data = jsonDecode(response.body);
    });
  }

  Widget getRow(int index) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text('Row ${data[index]['title']}'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView.builder(
        itemCount: data.length,
        itemBuilder: (context, index) {
          return getRow(index);
        },
      ),
    );
  }
}
```

Refer to the next section for more information
on doing work in the background,
and how Flutter differs from Android.

参考下一节内容获取更多关于后台任务以及 Flutter 与 Android 的差异的信息。

### How do you move work to a background thread?

### 如何将工作转移到后台线程？

Since Flutter is single threaded and runs an event loop,
you don't have to worry about thread management
or spawning background threads.
This is very similar to Xamarin.Forms.
If you're doing I/O-bound work, such as disk access or a network call,
then you can safely use `async`/`await` and you're all set.

因为 Flutter 是单线程的，并且持有事件循环，
所以你不必担心线程管理或产生后台线程。
这一点与 Xamarin.Forms 非常相似。如果你正在做 I/O 密集型的工作，比如磁盘访问或网络调用，
那么你可以安全地使用 `async`/`await`，这样就一切就绪了。

If, on the other hand, you need to do computationally intensive work
that keeps the CPU busy,
you want to move it to an `Isolate` to avoid blocking the event loop,
like you would keep _any_ sort of work out of the main thread.
This is similar to when you move things to a different
thread via `Task.Run()` in Xamarin.Forms.

另一方面，如果你需要执行消耗 CPU 的计算密集型工作，
那么你可以将其转移到一个 `Isolate` 上以避免阻塞事件循环，
就像你会将任何任务放到主线程之外一样。
这类似于通过 Xamarin.Forms 中的 `Task.Run()` 将内容移动到另一个线程。

For I/O-bound work, declare the function as an `async` function,
and `await` on long-running tasks inside the function:

对于和 I/O 绑定的任务，将方法声明为 `async` 方法，
并在方法内 `await` 一个长时间运行的任务：

<?code-excerpt "lib/data.dart (loadData)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse(
    'https://jsonplaceholder.typicode.com/posts',
  );
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = jsonDecode(response.body);
  });
}
```

This is how you would typically do network or database calls,
which are both I/O operations.

这是你通常执行网络或数据库调用的方式，它们都属于 I/O 操作。

However, there are times when you might be processing
a large amount of data and your UI hangs.
In Flutter, use `Isolate`s to take advantage of multiple CPU cores
to do long-running or computationally intensive tasks.

然而，有时候你可能需要处理大量的数据并挂起你的 UI。
在 Flutter 中，可以通过使用 `Isolate`
来利用多核处理器的优势执行耗时或计算密集的任务。

Isolates are separate execution threads that
do not share any memory with the main execution memory heap.
This is a difference between `Task.Run()`.
This means you can't access variables from the main thread,
or update your UI by calling `setState()`.

Isolate 是独立执行的线程，不会和主执行内存堆分享内存。
这是与 `Task.Run()` 的区别。
这意味着你无法访问主线程的变量，或者调用 `setState()` 更新 UI。

The following example shows, in a simple isolate,
how to share data back to the main thread to update the UI.

下面的例子展示了一个简单的 Isolate 是如何
将数据分享给主线程来更新 UI 的。

<?code-excerpt "lib/isolates.dart (SimpleIsolate)"?>
```dart
Future<void> loadData() async {
  final ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message
  final SendPort sendPort = await receivePort.first as SendPort;
  final List<Map<String, dynamic>> msg = await sendReceive(
    sendPort,
    'https://jsonplaceholder.typicode.com/posts',
  );
  setState(() {
    data = msg;
  });
}

// The entry point for the isolate
static Future<void> dataLoader(SendPort sendPort) async {
  // Open the ReceivePort for incoming messages.
  final ReceivePort port = ReceivePort();

  // Notify any other isolates what port this isolate listens to.
  sendPort.send(port.sendPort);
  await for (final dynamic msg in port) {
    final String url = msg[0] as String;
    final SendPort replyTo = msg[1] as SendPort;

    final Uri dataURL = Uri.parse(url);
    final http.Response response = await http.get(dataURL);
    // Lots of JSON to parse
    replyTo.send(jsonDecode(response.body) as List<Map<String, dynamic>>);
  }
}

Future<List<Map<String, dynamic>>> sendReceive(SendPort port, String msg) {
  final ReceivePort response = ReceivePort();
  port.send(<dynamic>[msg, response.sendPort]);
  return response.first as Future<List<Map<String, dynamic>>>;
}
```

Here, `dataLoader()` is the `Isolate` that runs in
its own separate execution thread.
In the isolate, you can perform more CPU intensive
processing (parsing a big JSON, for example),
or perform computationally intensive math,
such as encryption or signal processing.

这里的 `dataLoader()` 就是运行在自己独立执行线程内的 `Isolate`。
在 Isolate 中你可以执行更多的 CPU 密集型操作
（例如解析一个大的 JSON 数据），
或者执行计算密集型的数学运算，例如加密或信号处理。

You can run the full example below:

你可以运行下面这个完整的例子：

<?code-excerpt "lib/isolates.dart"?>
```dart
import 'dart:async';
import 'dart:convert';
import 'dart:isolate';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, dynamic>> data = <Map<String, dynamic>>[];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  bool get showLoadingDialog => data.isEmpty;

  Future<void> loadData() async {
    final ReceivePort receivePort = ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message
    final SendPort sendPort = await receivePort.first as SendPort;
    final List<Map<String, dynamic>> msg = await sendReceive(
      sendPort,
      'https://jsonplaceholder.typicode.com/posts',
    );
    setState(() {
      data = msg;
    });
  }

  // The entry point for the isolate
  static Future<void> dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    final ReceivePort port = ReceivePort();

    // Notify any other isolates what port this isolate listens to.
    sendPort.send(port.sendPort);
    await for (final dynamic msg in port) {
      final String url = msg[0] as String;
      final SendPort replyTo = msg[1] as SendPort;

      final Uri dataURL = Uri.parse(url);
      final http.Response response = await http.get(dataURL);
      // Lots of JSON to parse
      replyTo.send(jsonDecode(response.body) as List<Map<String, dynamic>>);
    }
  }

  Future<List<Map<String, dynamic>>> sendReceive(SendPort port, String msg) {
    final ReceivePort response = ReceivePort();
    port.send(<dynamic>[msg, response.sendPort]);
    return response.first as Future<List<Map<String, dynamic>>>;
  }

  Widget getBody() {
    if (showLoadingDialog) {
      return getProgressDialog();
    }
    return getListView();
  }

  Widget getProgressDialog() {
    return const Center(child: CircularProgressIndicator());
  }

  ListView getListView() {
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) {
        return getRow(index);
      },
    );
  }

  Widget getRow(int index) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text('Row ${data[index]['title']}'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: getBody(),
    );
  }
}
```

### How do I make network requests?

### 如何发送一个网络请求？

In Xamarin.Forms you would use `HttpClient`.
Making a network call in Flutter is easy
when you use the popular [`http` package][].
This abstracts away a lot of the networking
that you might normally implement yourself,
making it simple to make network calls.

在 Xamarin.Forms 中，你可以使用 `HttpClient`。
在 Flutter 中，你可以使用流行的
[`http` package][] package 轻松进行网络调用。
它抽象了很多通常你会自己实现的网络功能，
这使其本身在执行网络请求时简单易用。

To use the `http` package, add it to your dependencies in `pubspec.yaml`:

要使用 `http`，请在 `pubspec.yaml` 文件中添加依赖：

```yaml
dependencies:
  http: ^1.1.0
```

To make a network request,
call `await` on the `async` function `http.get()`:

如果要发起一个网络请求，
在异步 (`async`) 方法 `http.get()` 上调用 `await` 即可：

<?code-excerpt "lib/data.dart (loadData)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse(
    'https://jsonplaceholder.typicode.com/posts',
  );
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = jsonDecode(response.body);
  });
}
```

### How do I show the progress for a long-running task?

### 如何为耗时任务显示进度？

In Xamarin.Forms you would typically create a loading indicator,
either directly in XAML or through a 3rd party plugin such as AcrDialogs.

在 Xamarin.Forms 中常会创建一个加载指示器，
可以直接在 XAML 中创建，也可以通过第三方插件创建，比如 AcrDialogs。

In Flutter, use a `ProgressIndicator` widget.
Show the progress programmatically by controlling
when it's rendered through a boolean flag.
Tell Flutter to update its state before your long-running task starts,
and hide it after it ends.

在 Flutter 中，我们使用 `ProgressIndicator` widget。
通过代码逻辑使用一个布尔标记值控制进度条的渲染。
告诉 Flutter 在长时间运行的任务开始之前更新状态，并在结束后将其隐藏。

In the example below, the build function is separated into three different
functions. If `showLoadingDialog` is `true`
(when `widgets.length == 0`), then render the `ProgressIndicator`.
Otherwise, render the `ListView` with the data returned from a network call.

在下面的例子中，build 方法被拆分成三个不同的方法。
如果 `showLoadingDialog()` 返回 `true`（当 `widgets.length == 0`），
渲染 `ProgressIndicator`。否则，在 `ListView` 里渲染网络请求返回的数据。

<?code-excerpt "lib/loading.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, dynamic>> data = <Map<String, dynamic>>[];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  bool get showLoadingDialog => data.isEmpty;

  Future<void> loadData() async {
    final Uri dataURL = Uri.parse(
      'https://jsonplaceholder.typicode.com/posts',
    );
    final http.Response response = await http.get(dataURL);
    setState(() {
      data = jsonDecode(response.body);
    });
  }

  Widget getBody() {
    if (showLoadingDialog) {
      return getProgressDialog();
    }
    return getListView();
  }

  Widget getProgressDialog() {
    return const Center(child: CircularProgressIndicator());
  }

  ListView getListView() {
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) {
        return getRow(index);
      },
    );
  }

  Widget getRow(int index) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text('Row ${data[index]['title']}'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: getBody(),
    );
  }
}
```

## Project structure & resources

## 工程结构和资源文件

### Where do I store my image files?

### 在哪里放置分辨率相关的图片文件？

Xamarin.Forms has no platform independent way of storing images,
you had to place images in the iOS `xcasset` folder,
or on Android in the various `drawable` folders.

Xamarin.Forms 没有独立于平台的存储图像的方法，
你必须放置图片在 iOS 的 `xcasset` 文件夹,
或 Android 的 `drawable` 文件夹中。

While Android and iOS treat resources and assets as distinct items,
Flutter apps have only assets.
All resources that would live in the
`Resources/drawable-*` folders on Android,
are placed in an assets' folder for Flutter.

Android 和 iOS 将资源 (resources) 和资产 (assets) 视为不同的项目，
但是 Flutter 应用只有资产文件 (assets)。
所有原本在 Android 中应该放在 `res/drawable-*` 文件夹中的资源文件，
在 Flutter 中都放在一个 assets 文件夹中。

Flutter follows a simple density-based format like iOS.
Assets might be `1.0x`, `2.0x`, `3.0x`, or any other multiplier.
Flutter doesn't have `dp`s but there are logical pixels,
which are basically the same as device-independent pixels.
Flutter's [`devicePixelRatio`][] expresses the ratio
of physical pixels in a single logical pixel.

Flutter 遵循一个简单的类似 iOS 的密度相关的格式。
文件可以是一倍 (`1x`)、两倍 (`2x`)、三倍 (`3x`) 或其它的任意倍数。
Flutter 没有 `dp` 单位，但是有逻辑像素尺寸，基本和设备无关的像素尺寸是一样的。
名称为 [`devicePixelRatio`][] 的尺寸表示在单一逻辑像素标准下设备物理像素的比例。

The equivalent to Android's density buckets are:

与 Android 的密度分类的对照表如下：

| Android density qualifier | Flutter pixel ratio |
|---------------------------|---------------------|
| `ldpi`                    | `0.75x`             |
| `mdpi`                    | `1.0x`              |
| `hdpi`                    | `1.5x`              |
| `xhdpi`                   | `2.0x`              |
| `xxhdpi`                  | `3.0x`              |
| `xxxhdpi`                 | `4.0x`              |

Assets are located in any arbitrary folder&mdash;
Flutter has no predefined folder structure.
You declare the assets (with location)
in the `pubspec.yaml` file, and Flutter picks them up.

文件放置于任意文件夹中&mdash;&mdash;Flutter 没有预先定义好的文件夹结构。
你在 `pubspec.yaml` 文件中定义文件（包括位置信息），Flutter 负责找到它们。

To add a new image asset called `my_icon.png` to our Flutter project,
for example, and deciding that it should live in a folder we
arbitrarily called `images`, you would put the base image (1.0x)
in the `images` folder, and all the other variants in sub-folders
called with the appropriate ratio multiplier:

如果你要向 Flutter 项目中添加一个新的叫 `my_icon.png` 的图片资源，
并且将其放入我们随便起名的叫做 `images` 的文件夹中，
你需要将基础图片 (1.0x) 放在 `images` 文件夹中，
并将其它倍数的图片放入以特定倍数作为名称的子文件夹中：

```plaintext
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

Next, you'll need to declare these images in your `pubspec.yaml` file:

接下来，你需要在 `pubspec.yaml` 文件中定义这些图片：

```yaml
assets:
 - images/my_icon.jpeg
```

You can directly access your images in an `Image.asset` widget:

然后你就可以使用 `Image.asset` 访问你的图片了：

<?code-excerpt "lib/images.dart (ImageAsset)"?>
```dart
@override
Widget build(BuildContext context) {
  return Image.asset('images/my_icon.png');
}
```

or using `AssetImage`:

或者通过 `AssetImage` widget 直接访问：

<?code-excerpt "lib/images.dart (AssetImage)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Image(
    image: AssetImage('images/my_image.png'),
  );
}
```

More detailed information can be found in [Adding assets and images][].

更多详尽的信息可以在 [在 Flutter 中添加资产和图像][Adding assets and images] 中找到。

### Where do I store strings? How do I handle localization?

### 字符串储存在哪里？如何处理本地化？

Unlike .NET which has `resx` files,
Flutter doesn't currently have a dedicated system for handling strings.
At the moment, the best practice is to declare your copy text
in a class as static fields and access them from there. For example:

与 .NET 拥有 `resx` 文件不同，
Flutter 当下并没有一个特定的管理字符串的资源管理系统。
目前来讲，最好的办法是将字符串作为静态域存放在类中，
并通过类访问它们。例如：

<?code-excerpt "lib/strings.dart (StringsClass)"?>
```dart
class Strings {
  static const String welcomeMessage = 'Welcome To Flutter';
}
```

You can access your strings as such:

接着在你们的代码中，你可以这样访问你的字符串：

<?code-excerpt "lib/strings.dart (AccessString)" replace="/return const //g"?>
```dart
Text(Strings.welcomeMessage);
```

By default, Flutter only supports US English for its strings.
If you need to add support for other languages,
include the `flutter_localizations` package.
You might also need to add Dart's [`intl`][]
package to use i10n machinery, such as date/time formatting.

默认情况下，Flutter 只支持美式英语的本地化字符串。
如果你需要添加其他语言支持，请引入 `flutter_localizations` 库。
同时你可能还需要添加 [`intl`][] package 来使用国际化机制，
比如日期和时间的格式化等。

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any # Use version of intl from flutter_localizations.
```

To use the `flutter_localizations` package,
specify the `localizationsDelegates` and
`supportedLocales` on the app widget:

若你想使用 `flutter_localizations` package，
指定应用的 `localizationsDelegates` 和
`supportedLocales`。

<?code-excerpt "lib/strings.dart (Localization)"?>
```dart
import 'package:flutter_localizations/flutter_localizations.dart';

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      localizationsDelegates: <LocalizationsDelegate<dynamic>>[
        // Add app-specific localization delegate[s] here
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: <Locale>[
        Locale('en', 'US'), // English
        Locale('he', 'IL'), // Hebrew
        // ... other locales the app supports
      ],
    );
  }
}
```

The delegates contain the actual localized values,
while the `supportedLocales` defines which locales the app supports.
The above example uses a `MaterialApp`,
so it has both a `GlobalWidgetsLocalizations`
for the base widgets localized values,
and a `MaterialWidgetsLocalizations` for the Material widgets localizations.
If you use `WidgetsApp` for your app, you don't need the latter.
Note that these two delegates contain "default" values,
but you'll need to provide one or more delegates
for your own app's localizable copy,
if you want those to be localized too.

`supportedLocales` 指定了应用支持的语言，
而这些 delegates 则包含了实际的本地化内容。
上面的示例使用了一个 `MaterialApp`，
所以它既使用了处理基础 widget 本地化的 `GlobalWidgetsLocalizations`，
也使用了处理 Material widget 本地化的 `MaterialWidgetsLocalizations`。
如果你在应用中使用的是 `WidgetApp`，就不需要后者了。
注意，这两个 delegates 虽然都包含了「默认」值，
但是如果你想要实现本地化，
就必须在本地提供一个或多个 delegates 的实现副本。

When initialized, the `WidgetsApp` (or `MaterialApp`)
creates a [`Localizations`][] widget for you,
with the delegates you specify.
The current locale for the device is always accessible
from the `Localizations` widget from the current context
(in the form of a `Locale` object), or using the [`Window.locale`][].

当初始化的时候，`WidgetsApp`（或 `MaterialApp`）会根据
你提供的 delegates 创建一个 [`Localizations`][] widget。
`Localizations` widget 可以随时从当前上下文中中获取设备所用的语言，
也可以使用 [`Window.locale`][]。

To access localized resources, use the `Localizations.of()` method
to access a specific localizations class that is provided by a given delegate.
Use the [`intl_translation`][] package to extract translatable copy
to [arb][] files for translating, and importing them back into the app
for using them with `intl`.

要使用本地化资源，使用 `Localizations.of()` 方法可以访问提供代理的特定本地化类。
使用 [`intl_translation`][] 库解压翻译
的副本到 [arb][] 文件，
然后在应用中通过 `intl` 来引用它们。

For further details on internationalization and localization in Flutter,
see the [internationalization guide][], which has sample code
with and without the `intl` package.

关于 Flutter 中国际化和本地化的细节内容，请参看
[Flutter 应用里的国际化][internationalization guide]，
里面包含有使用和不使用 `intl` 库的示例代码。

### Where is my project file?

### 我的项目文件在哪里？

In Xamarin.Forms you will have a `csproj` file.
The closest equivalent in Flutter is pubspec.yaml,
which contains package dependencies and various project details.
Similar to .NET Standard,
files within the same directory are considered part of the project.

Xamarin.Forms 中有一个 `csproj` 文件。
在 Flutter 中最接近的它的是 pubspec.yaml，
其中包含包依赖项和各种项目细节。
与 .NET Standard 类似，相同目录中的文件被认为是项目的一部分。

### What is the equivalent of Nuget? How do I add dependencies?

### Nuget 的等价物是什么？如何添加依赖项？

In the .NET ecosystem, native Xamarin projects and Xamarin.Forms projects
had access to Nuget and the built-in package management system.
Flutter apps contain a native Android app, native iOS app and Flutter app.

在 .NET 生态系统中，原生 Xamarin 项目和
Xamarin.Forms 项目都可以访问 Nuget 和内置的包管理系统。
Flutter 应用程序默认包含一个原生 Android 应用程序、
原生 iOS 应用程序和 Flutter 应用程序。

In Android, you add dependencies by adding to your Gradle build script.
In iOS, you add dependencies by adding to your `Podfile`.

在 Android 中，你可以通过向 Gradle 添加构建脚本来添加依赖项。
而在 iOS 中，你可以通过添加到 `Podfile` 来添加依赖项。

Flutter uses Dart's own build system, and the Pub package manager.
The tools delegate the building of the native Android and iOS wrapper apps
to the respective build systems.

Flutter 使用 Dart 自己的构建系统和 Pub 包管理器。
这些工具将原生 Android 和 iOS 封装应用程序的构建委托给各自的构建系统。

In general, use `pubspec.yaml` to declare
external dependencies to use in Flutter.
A good place to find Flutter packages is on [pub.dev][].

通常你会在 Flutter 中使用 `pubspec.yaml` 来声明外部依赖。
你可以通过 [pub.dev][] 来查找一些优秀的 Flutter 第三方包。

## Application lifecycle

## 应用程序生命周期

### How do I listen to application lifecycle events?

### 如何侦听应用程序的生命周期事件？

In Xamarin.Forms, you have an `Application`
that contains `OnStart`, `OnResume` and `OnSleep`.
In Flutter, you can instead listen to similar lifecycle events
by hooking into the `WidgetsBinding` observer and listening to
the `didChangeAppLifecycleState()` change event.

在 Xamarin.Forms 中，你会有一个包含
`OnStart`、`OnResume` 和 `OnSleep` 的 `Application`。
在 Flutter 中，你可以通过在 `WidgetsBinding`
的监听器 (observer) 中添加监听，
也可以通过监听 `didChangeAppLifecycleState()` 事件，
来实现相应的功能。

The observable lifecycle events are:

可监听的生命周期事件有：

`inactive`
<br> The application is in an inactive state and is not receiving user input.
  This event is iOS only.

**`inactive`**
<br> 应用当前处于不活跃状态，不接收用户输入事件。
  这个事件只在 iOS 上有效。

`paused`
<br> The application is not currently visible to the user,
  is not responding to user input, but is running in the background.

**`paused`**
<br> 应用当前处于用户不可见状态，不接收用户输入事件，但仍在后台运行。

`resumed`
<br> The application is visible and responding to user input.

**`resumed`**
<br> 应用可见，同时响应用户输入。

`suspending`
<br> The application is suspended momentarily.
  This event is Android only.

**`suspending`**
<br> 应用被挂起。这个事件只在 Android 上有效。

For more details on the meaning of these states,
see the [`AppLifecycleStatus` documentation][].

有关这些状态的含义的更多细节，可参考
[`AppLifecycleStatus` 文档][`AppLifecycleStatus` documentation]。

[`AppLifecycleStatus` documentation]: {{site.api}}/flutter/dart-ui/AppLifecycleState.html

## Layouts

## 布局

### What is the equivalent of a StackLayout?

### 什么东西与 StackLayout 等效?

In Xamarin.Forms you can create a `StackLayout`
with an `Orientation` of horizontal or vertical.
Flutter has a similar approach,
however you would use the `Row` or `Column` widgets.

在 Xamarin.Forms 中，可以创建一个带水平或垂直方向
`Orientation` 的 `StackLayout` 。
Flutter 也有类似的方法，不过你将使用的是
`Row` 或 `Column` widget。

If you notice the two code samples are identical
except the `Row` and `Column` widget.
The children are the same and this feature
can be exploited to develop rich layouts
that can change overtime with the same children.

你可能会注意到除了 `Row` 和 `Column` widget 之外，
这两个代码示例是相同的。
这些子元素是相同的，可以利用这个特性开发丰富的布局，
这些布局可以随着时间的推移而改变。

<?code-excerpt "lib/layouts.dart (Row)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Text('Row One'),
      Text('Row Two'),
      Text('Row Three'),
      Text('Row Four'),
    ],
  );
}
```

<?code-excerpt "lib/layouts.dart (Column)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Text('Column One'),
      Text('Column Two'),
      Text('Column Three'),
      Text('Column Four'),
    ],
  );
```

### What is the equivalent of a Grid?

### 什么东西与网格（Grid） 等价?

The closest equivalent of a `Grid` would be a `GridView`.
This is much more powerful than what you are used to in Xamarin.Forms.
A `GridView` provides automatic scrolling when the
content exceeds its viewable space.

与 `Grid` 最接近的对等项是 `GridView`。
这比你在 Xamarin.Forms 中习惯使用的功能强大得多。
`GridView` 在内容超出其可视空间时自动滚动。

<?code-excerpt "lib/layouts.dart (Grid)"?>
```dart
@override
Widget build(BuildContext context) {
  return GridView.count(
    // Create a grid with 2 columns. If you change the scrollDirection to
    // horizontal, this would produce 2 rows.
    crossAxisCount: 2,
    // Generate 100 widgets that display their index in the list.
    children: List<Widget>.generate(
      100,
      (index) {
        return Center(
          child: Text(
            'Item $index',
            style: Theme.of(context).textTheme.headlineMedium,
          ),
        );
      },
    ),
  );
}
```

You might have used a `Grid` in Xamarin.Forms
to implement widgets that overlay other widgets.
In Flutter, you accomplish this with the `Stack` widget.

你可能在 Xamarin.Forms 中使用 `Grid` 来实现覆盖其他 widget 的 widget。
在 Flutter 中，你可以使用 `Stack` widget 来完成这一操作。

This sample creates two icons that overlap each other.

这个示例创建了两个相互重叠的图标。

<?code-excerpt "lib/layouts.dart (Stack)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Stack(
    children: <Widget>[
      Icon(
        Icons.add_box,
        size: 24,
        color: Colors.black,
      ),
      Positioned(
        left: 10,
        child: Icon(
          Icons.add_circle,
          size: 24,
          color: Colors.black,
        ),
      ),
    ],
  );
}
```

### What is the equivalent of a ScrollView?

### 有什么等同于 ScrollView ？

In Xamarin.Forms, a `ScrollView` wraps around a `VisualElement`,
and if the content is larger than the device screen, it scrolls.

在 Xamarin.Forms 中，`ScrollView` 封装了 `VisualElement`，
如果内容大于设备屏幕，它就会滚动。

In Flutter, the closest match is the `SingleChildScrollView` widget.
You simply fill the Widget with the content that you want to be scrollable.

在 Flutter 中，最接近的是 `SingleChildScrollView` widget。
你只需用想要可滚动的内容来填充 widget。

<?code-excerpt "lib/layouts.dart (ScrollView)"?>
```dart
@override
Widget build(BuildContext context) {
  return const SingleChildScrollView(
    child: Text('Long Content'),
  );
}
```

If you have many items you want to wrap in a scroll,
even of different `Widget` types, you might want to use a `ListView`.
This might seem like overkill, but in Flutter this is
far more optimized and less intensive than a Xamarin.Forms `ListView`,
which is backing on to platform specific controls.

如果你想在滚动条中包含许多项，即使是不同的`Widget`类型，
也可以使用 `ListView`。
这可能看起来有点大材小用，但在 Flutter 中，
它比 Xamarin.Forms 的回到平台特定控件的 `ListView`
更为优化且灵活。

<?code-excerpt "lib/layouts.dart (ListView)"?>
```dart
@override
Widget build(BuildContext context) {
  return ListView(
    children: const <Widget>[
      Text('Row One'),
      Text('Row Two'),
      Text('Row Three'),
      Text('Row Four'),
    ],
  );
}
```

### How do I handle landscape transitions in Flutter?

### 在 Flutter 中如何处理横向过渡 ?

Landscape transitions can be handled automatically by setting the
`configChanges` property in the AndroidManifest.xml:

通过在 AndroidManifest.xml 中设置 `configChanges` 属性，可以自动处理横向转换。

```xml
<activity android:configChanges="orientation|screenSize" />
```

## Gesture detection and touch event handling

## 手势检测和触摸事件处理

### How do I add GestureRecognizers to a widget in Flutter?

### 如何在 Flutter 中向 widget 添加手势识别器?

In Xamarin.Forms, `Element`s might contain a click event you can attach to.
Many elements also contain a `Command` that is tied to this event.
Alternatively you would use the `TapGestureRecognizer`.
In Flutter there are two very similar ways:

在 Xamarin.Forms 中，`Element` 可能包含一个可供附加 (attach) 的单击事件。
许多元素还包含一个与此事件关联的 `Command`。
你也可以使用 `TapGestureRecognizer`。
而在 Flutter 中有两种非常相似的方式：

1. If the widget supports event detection, pass a function to it and
   handle it in the function. For example, the ElevatedButton has an
   `onPressed` parameter:

   如果 Widget 支持事件监听，那么向它传入一个方法并在方法中处理事件。
   例如，RaisedButton 有一个 `onPressed` 参数：

   <?code-excerpt "lib/gestures.dart (ElevatedButton)"?>
   ```dart
   @override
   Widget build(BuildContext context) {
     return ElevatedButton(
       onPressed: () {
         developer.log('click');
       },
       child: const Text('Button'),
     );
   }
   ```

2. If the widget doesn't support event detection, wrap the
   widget in a `GestureDetector` and pass a function
   to the `onTap` parameter.

   如果 Widget 不支持事件监听，将 Widget 包装进一个 GestureDetector 中
   并向 `onTap` 参数传入一个方法。

   <?code-excerpt "lib/gestures.dart (GestureDetector)"?>
   ```dart
   class SampleApp extends StatelessWidget {
     const SampleApp({super.key});

     @override
     Widget build(BuildContext context) {
       return Scaffold(
         body: Center(
           child: GestureDetector(
             onTap: () {
               developer.log('tap');
             },
             child: const FlutterLogo(size: 200),
           ),
         ),
       );
     }
   }
   ```

### How do I handle other gestures on widgets?

### 我如何处理 widget 上的其他手势？

In Xamarin.Forms you would add a `GestureRecognizer` to the `View`.
You would normally be limited to `TapGestureRecognizer`,
`PinchGestureRecognizer`, `PanGestureRecognizer`, `SwipeGestureRecognizer`,
`DragGestureRecognizer` and `DropGestureRecognizer` unless you built your own.

在 Xamarin.Forms 中你可以在 `VisualElement`
中添加一个 `GestureRecognizer`。
你通常只能使用
`TapGestureRecognizer`、`PinchGestureRecognizer`、`PanGestureRecognizer`、，
`SwipeGestureRecognizer`、`DragGestureRecognizer` 和 `DropGestureRecognizer`，
除非你构建了自己的实现。

In Flutter, using the GestureDetector,
you can listen to a wide range of Gestures such as:

在 Flutter 中，使用手势检测器，你可以监听到各种各样的手势，比如:

* Tap

  单击

`onTapDown`
: A pointer that might cause a tap
  has contacted the screen at a particular location.

`onTapDown`
: 当指尖在特定位置与屏幕接触产生点击事件。

`onTapUp`
: A pointer that triggers a tap
  has stopped contacting the screen at a particular location.

`onTapUp`
: 当指尖触发的点击事件已经停止在特定位置与屏幕接触。

`onTap`
: A tap has occurred.

`onTap`
: 一个点击事件已经发生。

`onTapCancel`
: The pointer that previously triggered the `onTapDown`
  won't cause a tap.

`onTapCancel`
: 触发了 `onTapDown` 事件之后的指尖没有导致点击事件。

* Double tap

  双击

`onDoubleTap`
: The user tapped the screen at the same location twice
  in quick succession.

`onDoubleTap`
: 用户在同一位置连续快速点击屏幕两次。

* Long press

  长按

`onLongPress`
: A pointer has remained in contact with the screen
  at the same location for a long period of time.

`onLongPress`
: 指尖长时间保持与屏幕在同一位置的接触。

* Vertical drag

  垂直拖动

`onVerticalDragStart`
: A pointer has contacted the screen and might begin to move vertically.

`onVerticalDragStart`
: 指尖与屏幕接触后，可能开始垂直移动。

`onVerticalDragUpdate`
: A pointer in contact with the screen
  has moved further in the vertical direction.

`onVerticalDragUpdate`
: 指尖与屏幕接触并在垂直方向上移动得更远。

`onVerticalDragEnd`
: A pointer that was previously in contact with the
  screen and moving vertically is no longer in contact
  with the screen and was moving at a specific velocity
  when it stopped contacting the screen.

`onVerticalDragEnd`
: 指尖在之前与屏幕接触并垂直移动，
  当不再与屏幕接触时触发这个事件。
  当它停止与屏幕接触时，它会以特定的速度移动。

* Horizontal drag

  水平拖动

`onHorizontalDragStart`
: A pointer has contacted the screen and might begin to move horizontally.

`onHorizontalDragStart`
: 指尖与屏幕接触，开始水平移动时触发。

`onHorizontalDragUpdate`
: A pointer in contact with the screen
  has moved further in the horizontal direction.

`onHorizontalDragUpdate`
: 指尖与屏幕接触并在水平方向上移动得更远。

`onHorizontalDragEnd`
: A pointer that was previously in contact with the
  screen and moving horizontally is no longer in contact
  with the screen and was moving at a specific velocity
  when it stopped contacting the screen.

`onHorizontalDragEnd`
: 指尖在之前与屏幕接触并水平移动，当不再与屏幕接触时会触发这个事件。
  当它停止与屏幕接触时，
  它正在以特定的速度移动。

The following example shows a `GestureDetector`
that rotates the Flutter logo on a double tap:

下面的例子展示了一个实现了双击旋转 Flutter 标志的 `GestureDetector`：

<?code-excerpt "lib/gestures.dart (RotatingFlutterDetector)"?>
```dart
class RotatingFlutterDetector extends StatefulWidget {
  const RotatingFlutterDetector({super.key});

  @override
  State<RotatingFlutterDetector> createState() =>
      _RotatingFlutterDetectorState();
}

class _RotatingFlutterDetectorState extends State<RotatingFlutterDetector>
    with SingleTickerProviderStateMixin {
  late final AnimationController controller;
  late final CurvedAnimation curve;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: GestureDetector(
          onDoubleTap: () {
            if (controller.isCompleted) {
              controller.reverse();
            } else {
              controller.forward();
            }
          },
          child: RotationTransition(
            turns: curve,
            child: const FlutterLogo(size: 200),
          ),
        ),
      ),
    );
  }
}
```

## Listviews and adapters

## 列表视图和适配器

### What is the equivalent to a ListView in Flutter?

### 在 Flutter 中，与列表视图等价的是什么？

The equivalent to a `ListView` in Flutter is … a `ListView`!

在 Flutter 中与 `ListView` 等价的是……一个 `ListView`！

In a Xamarin.Forms `ListView`, you create a `ViewCell`
and possibly a `DataTemplateSelector`and pass it into the `ListView`,
which renders each row with what your
`DataTemplateSelector` or `ViewCell` returns.
However, you often have to make sure you turn on Cell Recycling
otherwise you will run into memory issues and slow scrolling speeds.

在一个 Xamarin.Forms 的 `ListView` 中，
你可以创建一个 `ViewCell` 或者 `DataTemplateSelector`，
并将其传递到 `ListView` 中，该视图将用你的 `DataTemplateSelector`
或者 `ViewCell` 的返回数据渲染每一行。
但是，你通常必须确保打开单元格回收，否则会遇到内存问题和会使滚动速度变慢。

Due to Flutter's immutable widget pattern,
you pass a list of widgets to your `ListView`,
and Flutter takes care of making sure that scrolling is fast and smooth.

由于 Flutter 中 widget 的不可变特性，
你需要向 `ListView` 传递一个 widget 列表，
Flutter 会确保滚动快速而流畅。

<?code-excerpt "lib/listview.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatelessWidget {
  const SampleAppPage({super.key});

  List<Widget> _getListData() {
    return List<Widget>.generate(
      100,
      (index) => Padding(
        padding: const EdgeInsets.all(10),
        child: Text('Row $index'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: _getListData()),
    );
  }
}
```

### How do I know which list item has been clicked?

### 如何确定列表中被点击的元素？

In Xamarin.Forms, the ListView has an `ItemTapped` method
to find out which item was clicked.
There are many other techniques you might have used
such as checking when `SelectedItem` or `EventToCommand`
behaviors change.

在 Xamarin.Forms 中，ListView 拥有一个
`ItemTapped` 方法能找出哪个列表项被单击了。
还有其他一些方法，比如检查 `SelectedItem`
或 `EventToCommand` 的行为何时会发生更改。

In Flutter, use the touch handling provided by the passed-in widgets.

而在 Flutter 里，需要通过 widget 传递进来的 touch 响应处理来实现。

<?code-excerpt "lib/listview_item_clicked.dart"?>
```dart
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> _getListData() {
    return List<Widget>.generate(
      100,
      (index) => GestureDetector(
        onTap: () {
          developer.log('Row $index tapped');
        },
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Text('Row $index'),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: _getListData()),
    );
  }
}
```

### How do I update a ListView dynamically?

### 如何动态更新 ListView ?

In Xamarin.Forms, if you bound the
`ItemsSource` property to an `ObservableCollection`,
you would just update the list in your ViewModel.
Alternatively, you could assign a new `List` to the `ItemSource` property.

在 Xamarin.Forms 中，如果将 `ItemsSource` 属性绑定到一个
`ObservableCollection`，就只需要更新视图模型中的列表。
另一种方法是，你可以给属性 `ItemsSource` 分配一个新的 `List 。

In Flutter, things work a little differently.
If you update the list of widgets inside a `setState()` method,
you would quickly see that your data did not change visually.
This is because when `setState()` is called,
the Flutter rendering engine looks at the widget tree
to see if anything has changed.
When it gets to your `ListView`, it performs a `==` check,
and determines that the two `ListView`s are the same.
Nothing has changed, so no update is required.

在 Flutter 中，情况略有不同。
如果你在 `setState()` 中更新了 widget 列表，
你会发现展示的数据并不会立刻更新。
这是因为当 `setState()` 被调用时，
Flutter 的渲染引擎回去检索 widget 树是否有改变。
当它获取到 `ListView`，会进行 `==` 判断，
然后发现两个 `ListView` 是相等的。
此时没有改变，也就不会进行更新。

For a simple way to update your `ListView`,
create a new `List` inside of `setState()`,
and copy the data from the old list to the new list.
While this approach is simple, it is not recommended for large data sets,
as shown in the next example.

一个更新 `ListView` 的简单方法就是，在 `setState()` 创建一个新的 `List`，
然后拷贝旧列表中的所有数据到新列表。
这样虽然简单，但是像下面示例一样数据量很大时，并不推荐这样做。

<?code-excerpt "lib/dynamic_listview.dart"?>
```dart
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> widgets = <Widget>[];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  Widget getRow(int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets = List<Widget>.from(widgets);
          widgets.add(getRow(widgets.length));
          developer.log('Row $index');
        });
      },
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Text('Row $index'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: widgets),
    );
  }
}
```

The recommended, efficient, and effective way to build a list
uses a `ListView.Builder`.
This method is great when you have a dynamic list
or a list with very large amounts of data.
This is essentially the equivalent of RecyclerView on Android,
which automatically recycles list elements for you:

一个推荐的、高效且有效的方法就是使用 `ListView.Builder` 来构建列表。
当你的数据量很大，且需要构建动态列表时，这个方法会非常好用。
这基本上相当于 Android 上的 `RecyclerView`，它会自动回收列表元素：

<?code-excerpt "lib/listview_builder.dart"?>
```dart
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  Widget getRow(int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length));
          developer.log('Row $index');
        });
      },
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Text('Row $index'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView.builder(
        itemCount: widgets.length,
        itemBuilder: (context, index) {
          return getRow(index);
        },
      ),
    );
  }
}
```

Instead of creating a `ListView`, create a `ListView.builder`
that takes two key parameters: the initial length of the list,
and an item builder function.

与创建 `ListView` 不同，创建 `ListView.Builder` 需要两个关键参数：
初始化列表长度和 item 构建函数。

The item builder function is similar to the `getView` function
in an Android adapter; it takes a position,
and returns the row you want rendered at that position.

Item 构建函数类似于 Android 适配器中的 `getView` 函数；
它接受一个位置，并返回你希望的在该位置呈现的行。

Finally, but most importantly, notice that the `onTap()` function
doesn't recreate the list anymore, but instead adds to it.

最后且最重要的是，要注意 `onTap()` 函数不再重新创建列表，
而是用 `.add` 添加给它的。

For more information, see
[Your first Flutter app][first_codelab] codelab.

更多信息，请访问 codelab: 
[编写你的第一个 Flutter 应用][first_codelab]。

## Working with text

## 文本处理

### How do I set custom fonts on my text widgets?

### 如何在文本 `Text` widget 上设置自定义字体?

In Xamarin.Forms, you would have to add a custom font in each native project.
Then, in your `Element` you would assign this font name
to the `FontFamily` attribute using `filename#fontname`
and just `fontname` for iOS.

在 Xamarin.Forms 中，你必须在每个原生项目中添加自定义字体。
然后在你的 `Element` 中，你会使用 `filename#fontname`
给 `FontFamily` 属性分配字体名，在 iOS 中使用 `fontname` 。

In Flutter, place the font file in a folder and reference it
in the `pubspec.yaml` file, similar to how you import images.

在 Flutter 中，你可以将字体文件放在一个文件夹中，
并在 `pubspec.yaml` 中引用它，这跟导入图像的方式类似。

```yaml
fonts:
  - family: MyCustomFont
    fonts:
      - asset: fonts/MyCustomFont.ttf
      - style: italic
```

Then assign the font to your `Text` widget:

然后将字体赋值给你的 `Text` Widget：

<?code-excerpt "lib/strings.dart (CustomFont)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Sample App')),
    body: const Center(
      child: Text(
        'This is a custom font text',
        style: TextStyle(fontFamily: 'MyCustomFont'),
      ),
    ),
  );
}
```

### How do I style my text widgets?

### 如何更改 · Widget 的样式？

Along with fonts, you can customize other styling elements on a `Text` widget.
The style parameter of a `Text` widget takes a `TextStyle` object,
where you can customize many parameters, such as:

除了字体，你还可以自定义 `Text` Widget 的其它样式元素。
`Text` Widget 的样式参数接收一个 `TextStyle` 对象，
你可以在这个对象里自定义很多参数，例如：

* `color`
* `decoration`
* `decorationColor`
* `decorationStyle`
* `fontFamily`
* `fontSize`
* `fontStyle`
* `fontWeight`
* `hashCode`
* `height`
* `inherit`
* `letterSpacing`
* `textBaseline`
* `wordSpacing`

## Form input

## 表单输入

### How do I retrieve user input?

### 如何检索用户输入？

Xamarin.Forms `element`s allow you to directly query the `element`
to determine the state of its properties,
or whether it's bound to a property in a `ViewModel`.

Xamarin.Forms 的 `element` 允许你直接查询 `element` 来确定它的任何属性的状态，
或者它被绑定到 `ViewModel` 中的属性。

Retrieving information in Flutter is handled by specialized widgets
and is different from how you are used to.
If you have a `TextField`or a `TextFormField`,
you can supply a [`TextEditingController`][]
to retrieve user input:

在 Flutter 中检索信息是由专门的 widget 处理的，这是跟原来的习惯不同的。
如果你有一个 `TextField` 或 `TextFormField`，你可以提供一个 
[`TextEditingController`][] 来检索用户输入:

<?code-excerpt "lib/form.dart"?>
```dart
import 'package:flutter/material.dart';

class MyForm extends StatefulWidget {
  const MyForm({super.key});

  @override
  State<MyForm> createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  /// Create a text controller and use it to retrieve the current value
  /// of the TextField.
  final TextEditingController myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when disposing of the widget.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Retrieve Text Input')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: TextField(controller: myController),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog with the
        // text that the user has typed into our text field.
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                // Retrieve the text that the user has entered using the
                // TextEditingController.
                content: Text(myController.text),
              );
            },
          );
        },
        tooltip: 'Show me the value!',
        child: const Icon(Icons.text_fields),
      ),
    );
  }
}
```

You can find more information and the full code listing in
[Retrieve the value of a text field][],
from the [Flutter cookbook][].

你可以在 [Flutter 实用教程][Flutter cookbook] 中的
[获取文本框的输入值][Retrieve the value of a text field]
找到更多的信息和完整的代码清单。

### What is the equivalent of a Placeholder on an Entry?

### 在入口的占位符 (Placeholder) 与什么等价？

In Xamarin.Forms, some `Elements` support a `Placeholder` property
that you can assign a value to. For example:

在 Xamarin.Forms 中，一些 `Element` 支持设置 `Placeholder` 属性。如：

```xml
  <Entry Placeholder="This is a hint">
```

In Flutter, you can easily show a "hint" or a placeholder text
for your input by adding an `InputDecoration` object
to the `decoration` constructor parameter for the text widget.

在 Flutter 中，通过在文本 widget 的装饰器构造函数参数中添加
`InputDecoration` 对象，可以轻松地为输入显示「提示」或占位符文本。

<?code-excerpt "lib/input_decoration.dart (HintText)" replace="/child: //g"?>
```dart
TextField(
  decoration: InputDecoration(hintText: 'This is a hint'),
),
```

### How do I show validation errors?

### 如何显示验证错误的信息？

With Xamarin.Forms, if you wished to provide a visual hint of a
validation error, you would need to create new properties and
`VisualElement`s surrounding the `Element`s that had validation errors.

使用 Xamarin.Forms 时，如果你希望提供验证错误的可视化提示，
则需要创建新属性和 `VisualElement` 来包围具有验证错误的元素。

In Flutter, you pass through an InputDecoration object to the
decoration constructor for the text widget.

在 Flutter 中，我们将 `InputDecoration` 对象传递给文本 widget 的装饰器构造函数。

However, you don't want to start off by showing an error.
Instead, when the user has entered invalid data,
update the state, and pass a new `InputDecoration` object.

然而，你并不想一开始就显示错误信息。相反，当用户输入了无效的信息后，
更新状态并传入一个新的 `InputDecoration` 对象。

<?code-excerpt "lib/validation.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Sample App',
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String? _errorText;

  String? _getErrorText() {
    return _errorText;
  }

  bool isEmail(String em) {
    const String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|'
        r'(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|'
        r'(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    final RegExp regExp = RegExp(emailRegexp);
    return regExp.hasMatch(em);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: Center(
        child: TextField(
          onSubmitted: (text) {
            setState(() {
              if (!isEmail(text)) {
                _errorText = 'Error: This is not an email';
              } else {
                _errorText = null;
              }
            });
          },
          decoration: InputDecoration(
            hintText: 'This is a hint',
            errorText: _getErrorText(),
          ),
        ),
      ),
    );
  }
}
```

## Flutter plugins

## Flutter 插件

## Interacting with hardware, third party services, and the platform

## 与硬件、第三方服务和平台交互

### How do I interact with the platform, and with platform native code?

### 应该如何与平台以及平台原生代码交互?

Flutter doesn't run code directly on the underlying platform;
rather, the Dart code that makes up a Flutter app is run natively
on the device, "sidestepping" the SDK provided by the platform.
That means, for example, when you perform a network request in Dart,
it runs directly in the Dart context.
You don't use the Android or iOS APIs
you normally take advantage of when writing native apps.
Your Flutter app is still hosted in a native app's
`ViewController` or `Activity` as a view,
but you don't have direct access to this, or the native framework.

Flutter 不直接在底层平台上运行代码。
相反，构成一个 Flutter 应用程序的 Dart 代码
是在设备上原生运行的，「绕开」了平台提供的 SDK。
这意味着当你在 Dart 中执行网络请求时，
它将直接运行在 Dart 上下文中。
在编写原生应用程序时，你通常不会使用 Android 或 iOS 的 API。
Flutter 应用程序仍然作为视图驻留在原生应用程序的
`ViewController` 或 `Activity` 中，但你不能直接访问这个或原生框架。

This doesn't mean Flutter apps can't interact with those native APIs,
or with any native code you have. Flutter provides [platform channels][]
that communicate and exchange data with the
`ViewController` or `Activity` that hosts your Flutter view.
Platform channels are essentially an asynchronous messaging mechanism
that bridges the Dart code with the host `ViewController`
or `Activity` and the iOS or Android framework it runs on.
You can use platform channels to execute a method on the native side,
or to retrieve some data from the device's sensors, for example.

这并不意味着 Flutter 应用程序不能与这些原生 API 或你自己的任何原生代码交互。
Flutter 提供了 [平台通道][platform channels]
用于与托管 Flutter 视图的 `ViewController` 或 `Activity` 通信和交换数据。
平台通道本质上是一个异步消息传递机制，
它将 Dart 代码与 `ViewController` 或 `Activity` 宿主
以及它所运行的 iOS 或 Android 框架桥接起来。
例如，你可以使用平台通道在原生端执行一个方法，或者从设备的传感器检索一些数据。

In addition to directly using platform channels,
you can use a variety of pre-made [plugins][]
that encapsulate the native and Dart code for a specific goal.
For example, you can use a plugin to access
the camera roll and the device camera directly from Flutter,
without having to write your own integration.
Plugins are found on [pub.dev][],
Dart and Flutter's open source package repository.
Some packages might support native integrations on iOS,
or Android, or both.

除了直接使用平台通道外，你还可以使用各种预制 [插件][plugins]，
它们封装了针对特定目标的原生代码和 Dart 代码。
例如，你可以使用插件直接从 Flutter 访问设备相机，而无需编写自己的集成。
插件可以在 [pub.dev][]、Dart 和 Flutter 的开源 package 仓库中找到。
有些包可能支持 iOS 上的本地集成，有些支持 Android，还有两者都兼而有之的。

If you can't find a plugin on pub.dev that fits your needs,
you can [write your own][], and [publish it on pub.dev][].

如果在 Pub 上找不到适合你需求的插件，你可以
[编写自己的插件][write your own] 并
[在 Pub 上发布][publish it on pub.dev]。

### How do I access the GPS sensor?

### 如何访问 GPS 传感器?

Use the [`geolocator`][] community plugin.

使用 [`geolocator`][] 社区插件.

### How do I access the camera?

### 如何访问照相机？

The [`camera`][] plugin is popular for accessing the camera.

[`camera`][] 插件被常用于相机功能的使用。

### How do I log in with Facebook?

### 如何通过 Facebook 登录？

To log in with Facebook, use the

[`flutter_facebook_login`][] community plugin.

使用 [`flutter_facebook_login`][] 社区插件实现
Facebook 登录功能。

### How do I use Firebase features?

### 如何使用 Firebase 特性？

Most Firebase functions are covered by [first party plugins][].
These plugins are first-party integrations, maintained by the Flutter team:

[官方插件][first party plugins] 提供了 Firebase 的大多数功能。
这些插件都是由 Flutter 团队维护的官方集成插件：

 * [`google_mobile_ads`][] for Google Mobile Ads for Flutter

   [`google_mobile_ads`][] 提供 Google Mobile Ads 功能

  * [`firebase_analytics`][] for Firebase Analytics

   [`firebase_analytics`][] 提供 Firebase Analytics 功能

 * [`firebase_auth`][] for Firebase Auth

   [`firebase_auth`][] 提供 Firebase Auth 功能

 * [`firebase_database`][] for Firebase RTDB

   [`firebase_database`][] 提供 Firebase RTDB 功能

 * [`firebase_storage`][] for Firebase Cloud Storage

   [`firebase_storage`][] 提供 Firebase Cloud Storage 功能

 * [`firebase_messaging`][] for Firebase Messaging (FCM)

   [`firebase_messaging`][] 提供 Firebase Messaging (FCM) 功能

 * [`flutter_firebase_ui`][] for quick Firebase Auth integrations
   (Facebook, Google, Twitter and email)

   [`flutter_firebase_ui`][] 提供快速的 Firebase Auth 集成功能
   (Facebook, Google, Twitter 和 email)

 * [`cloud_firestore`][] for Firebase Cloud Firestore

   [`cloud_firestore`][] 提供 Firebase Cloud Firestore 功能

  [`cloud_firestore`][] 提供 Firebase Cloud Firestore 功能

You can also find some third-party Firebase plugins on pub.dev
that cover areas not directly covered by the first-party plugins.

你可以在 [Pub](https://pub.flutter-io.cn/flutter) 网站上查找一些官方插件
没有直接支持的功能的第三方 Firebase 插件。

### How do I build my own custom native integrations?

### 如何构建自定义的原生集成？

If there is platform-specific functionality that Flutter
or its community plugins are missing,
you can build your own following the
[developing packages and plugins][] page.

如果有 Flutter 官方或社区第三方插件没有涵盖的平台特定的功能，
你可以参考 [开发包和插件][developing packages and plugins]
文档创建自己的插件。

Flutter's plugin architecture, in a nutshell,
is much like using an Event bus in Android:
you fire off a message and let the receiver process and emit a result
back to you. In this case, the receiver is code running on the native side
on Android or iOS.

简单地说，Flutter 的插件架构很像在 Android 中使用事件总线：
你发出一条消息，让接收方处理并向你发回一个结果。
在这种情况下，接收方是运行在 Android 或 iOS 上的原生代码。

## Themes (Styles)

## 主题（样式）

### How do I theme my app?

### 如何对应用使用主题？

Flutter comes with a beautiful, built-in implementation of Material Design,
which handles much of the styling and theming needs
that you would typically do.

Flutter 附带了一个内建的漂亮的 Material Design 实现，
它处理了许多你通常会做的样式和主题需求。

Xamarin.Forms does have a global `ResourceDictionary`
where you can share styles across your app.
Alternatively, there is Theme support currently in preview.

Xamarin.Forms 确实有一个全局的 `ResourceDictionary`，
可以为你的应用程序共享样式。另外，预览版目前还支持主题。

In Flutter, you declare themes in the top level widget.

在 Flutter 中，你可以在最顶级 widget 中声明主题。

To take full advantage of Material Components in your app,
you can declare a top level widget `MaterialApp`
as the entry point to your application.
`MaterialApp` is a convenience widget
that wraps a number of widgets that are commonly required
for applications implementing Material Design.
It builds upon a `WidgetsApp` by adding Material-specific functionality.

为了在应用中利用好 Material 组件，
你可以在应用中声明一个顶层 Widget `MaterialApp` 作为入口。
MaterialApp 是一个包装了一系列 Widget 的为你给予便利的 Widget，
而这些 Widget 通常是实现 Material Design 的应用所必须的。
它基于 WidgetsApp 并添加了 Material 相关的功能。

You can also use a `WidgetsApp` as your app widget,
which provides some of the same functionality,
but is not as rich as `MaterialApp`.

你也可以使用 `WidgetApp` 作为应用的 Widget，它会提供一些相同的功能，
但是不如 `MaterialApp` 提供的功能丰富。

To customize the colors and styles of any child components,
pass a `ThemeData` object to the `MaterialApp` widget.
For example, in the following code,
the color scheme from seed is set to deepPurple and text selection color is red.

如果要自定义任意子组件的颜色或者样式，
给 `MaterialApp` Widget 传入一个 `ThemeData` 对象即可。
例如，在下面的代码中，主色调设置为蓝色，文本选中颜色设置为红色。

<?code-excerpt "lib/theme.dart (Theme)"?>
```dart
class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        textSelectionTheme:
            const TextSelectionThemeData(selectionColor: Colors.red),
      ),
      home: const SampleAppPage(),
    );
  }
}
```

## Databases and local storage

## 数据库与本地存储

### How do I access shared preferences or UserDefaults?

### 如何访问共享首选项或用户默认值?

Xamarin.Forms developers will likely be familiar with the
`Xam.Plugins.Settings` plugin.

Xamarin.Forms 开发者可能会熟悉 `Xam.Plugins.Settings` 插件。

In Flutter, access equivalent functionality using the
[`shared_preferences`][] plugin. This plugin wraps the
functionality of both `UserDefaults` and the Android
equivalent, `SharedPreferences`.

在 Flutter 中，使用 [`shared_preferences` 插件][`shared_preferences`]
就可以访问相同的功能。这个插件封装了 `UserDefaults`
和 Android 平台上的 `SharedPreferences`。

### How do I access SQLite in Flutter?

### 在 Flutter 中如何访问 SQLite

In Xamarin.Forms most applications would use the `sqlite-net-pcl`
plugin to access SQLite databases.

在 Xamarin.Forms 中大多数应用会使用 `sqlite-net-pcl` 插件来访问 SQLite 数据库。

In Flutter, on macOS, Android, and iOS,
access this functionality using the
[`sqflite`][] plugin.

在 Flutter 中，
macOS、Android 和 iOS 平台，
可以使用 [`sqflite`][] 插件来实现该功能。

## Debugging

## 调试

### What tools can I use to debug my app in Flutter?

### 我可以使用什么工具调试我的 Flutter 应用？

Use the [DevTools][] suite for debugging Flutter or Dart apps.

请使用 [开发者工具][DevTools] 调试你的 Flutter 和 Dart 应用。

DevTools includes support for profiling, examining the heap,
inspecting the widget tree, logging diagnostics, debugging,
observing executed lines of code,
debugging memory leaks and memory fragmentation.
For more information, check out the [DevTools][] documentation.

开发者工具包含了性能工具、检查堆栈、检视 widget 树、诊断信息记录、调试、
执行代码行观察、调试内存泄漏和内存碎片等。
有关更多信息，请参阅 [开发者工具][DevTools] 文档。

## Notifications

## 通知

### How do I set up push notifications?

### 如何设置通知推送?

In Android, you use Firebase Cloud Messaging to set up
push notifications for your app.

在 Android 中，你可以使用 Firebase Cloud Messaging 来为应用设置推送通知。

In Flutter, access this functionality using the
[`firebase_messaging`][] plugin.
For more information on using the Firebase Cloud Messaging API, see the
[`firebase_messaging`][] plugin documentation.

在 Flutter 中，则使用 [`firebase_messaging`][] 插件实现此功能。
想要获得更多关于使用 Firebase Cloud Messaging API 的信息，
请查阅 [`firebase_messaging`][] 插件文档。

[Adding assets and images]: /ui/assets/assets-and-images
[Animation & Motion widgets]: /ui/widgets/animation
[Animations overview]: /ui/animations
[Animations tutorial]: /ui/animations/tutorial
[Apple's iOS design language]: {{site.apple-dev}}/design/resources/
[arb]: {{site.github}}/google/app-resource-bundle
[Async UI]: #async-ui
[`cloud_firestore`]: {{site.pub}}/packages/cloud_firestore
[composing]: /resources/architectural-overview#composition
[Cupertino widgets]: /ui/widgets/cupertino
[`devicePixelRatio`]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html
[developing packages and plugins]: /packages-and-plugins/developing-packages
[DevTools]: /tools/devtools/overview
[existing plugin]: {{site.pub}}/flutter
[`google_mobile_ads`]: {{site.pub}}/packages/google_mobile_ads
[`firebase_analytics`]: {{site.pub}}/packages/firebase_analytics
[`firebase_auth`]: {{site.pub}}/packages/firebase_auth
[`firebase_database`]: {{site.pub}}/packages/firebase_database
[`firebase_messaging`]: {{site.pub}}/packages/firebase_messaging
[`firebase_storage`]: {{site.pub}}/packages/firebase_storage
[first party plugins]: {{site.pub}}/flutter/packages?q=firebase
[Flutter cookbook]: /cookbook
[`flutter_facebook_login`]: {{site.pub}}/packages/flutter_facebook_login
[`flutter_firebase_ui`]: {{site.pub}}/packages/flutter_firebase_ui
[`geolocator`]: {{site.pub}}/packages/geolocator
[`camera`]: {{site.pub-pkg}}/camera
[`http` package]: {{site.pub}}/packages/http
[internationalization guide]: /ui/accessibility-and-internationalization/internationalization
[`intl`]: {{site.pub}}/packages/intl
[`intl_translation`]: {{site.pub}}/packages/intl_translation
[Introduction to declarative UI]: /get-started/flutter-for/declarative
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[Material Components]: /ui/widgets/material
[Material Design]: {{site.material}}/styles
[Material Design guidelines]: {{site.material}}/styles
[`Opacity` widget]: {{site.api}}/flutter/widgets/Opacity-class.html
[optimized for all platforms]: {{site.material2}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines
[platform channels]: /platform-integration/platform-channels
[plugins]: /packages-and-plugins/using-packages
[pub.dev]: {{site.pub}}
[publish it on pub.dev]: /packages-and-plugins/developing-packages#publish
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[`shared_preferences`]: {{site.pub}}/packages/shared_preferences
[`sqflite`]: {{site.pub}}/packages/sqflite
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
[`url_launcher`]: {{site.pub}}/packages/url_launcher
[widget]: /resources/architectural-overview#widgets
[widget catalog]: /ui/widgets/layout
[`Window.locale`]: {{site.api}}/flutter/dart-ui/Window/locale.html
[first_codelab]: {{site.codelabs}}/codelabs/flutter-codelab-first
[write your own]: /packages-and-plugins/developing-packages
