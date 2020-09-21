---
title: Flutter for iOS developers
title: 给 iOS 开发者的 Flutter 指南
description: Learn how to apply iOS developer knowledge when building Flutter apps.
description: 学习如何将 iOS 开发经验应用到 Flutter 应用开发中。
tags: Flutter教程,Flutter起步,Flutter入门
keywords: Flutter iOS,iOS,用Flutter开发iOS,Cupertino
---

This document is for iOS developers looking to apply their existing iOS
knowledge to build mobile apps with Flutter. If you understand the
fundamentals of the iOS framework then you can use this document as a
way to get started learning Flutter development.

这篇文章是为那些想将已有的 iOS 开发经验运用到 Flutter 开发中的 iOS 开发者所作。
如果你理解 iOS framework 的基本原理，那么你可以将这篇文章作为学习 Flutter 开发的起点。

{{site.alert.note}}

  To integrate Flutter code into your iOS app, see
  [Add Flutter to existing app][].

  要向你的 Android 应用中集成 Flutter 请参阅 [向已有应用中添加 Flutter][Add Flutter to existing app]。

{{site.alert.end}}

Before diving into this doc, you might want to watch a 15-minute video from
the [Flutter Youtube channel][] about
the Cupertino package.

在开始本文档之前，建议先浏览一下这个 15 分钟的视频，
了解一下 Cupertino package 是什么吧：

<iframe width="560" height="315" src="https://player.bilibili.com/player.html?aid=55647852&bvid=BV1B4411V79J&cid=97286350&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Your iOS knowledge and skill set are highly valuable when building with
Flutter, because Flutter relies on the mobile operating system for numerous
capabilities and configurations. Flutter is a new way to build UIs for mobile,
but it has a plugin system to communicate with iOS (and Android) for non-UI
tasks. If you're an expert in iOS development, you don't have to relearn
everything to use Flutter.

在使用 Flutter 开发时，你 iOS 方面的知识和技能都很是非常有用的，因为 Flutter 中
很多的功能和配置都依赖于移动端操作系统。Flutter 是移动端绘制 UI 的一种新方式，而对于
非 UI 层面的任务，它通过插件机制来和 iOS（Android）系统进行通信。如果你很精通 iOS 开
发，使用 Flutter 并不需要完全从头开始。

Flutter also already makes a number of adaptations in the framework for you 
when running on iOS. For a list, see [Platform adaptations][].

Flutter 框架针对 iOS 平台做了一些适配，
在 [平台行为差异和适配][Platform adaptations] 里可以了解更多。

This document can be used as a cookbook by jumping around and finding questions
that are most relevant to your needs.

你同样可以将这篇文章当作一份手册查看，以便查找并解决你所遇到的问题。


## Views

## 视图

### What is the equivalent of a UIView in Flutter?

### `UIView` 相当于 Flutter 中的什么？

{{site.alert.secondary}}

How is react-style, or _declarative_, programming different than the
traditional imperative style?
For a comparison, see [Introduction to declarative
UI](/docs/get-started/flutter-for/declarative).

这里有一份关于响应式编程，或者说 **声明式编程** 和
传统的命令式编程有什么不同之处的文章，
你可以浏览 [声明式 UI 介绍][Introduction to declarative UI]。
{{site.alert.end}}

On iOS, most of what you create in the UI is done using view objects, which are
instances of the `UIView` class. These can act as containers for other `UIView`
classes, which form your layout.

在 iOS 中，你在 UI 中创建的大部分视图都是 `UIView` 的实例。而在构造布局时，这些视图也可以作为其他
视图的容器。

In Flutter, the rough equivalent to a `UIView` is a `Widget`. Widgets don't map
exactly to iOS views, but while you're getting acquainted with how Flutter works
you can think of them as "the way you declare and construct UI".

在 Flutter 中，同 `UIView` 能够进行类比的就是 `Widget` 了。但 `Widget` 和 iOS 里的视图
并不能同等对待，不过当你想要了解 Flutter 的工作原理时，你可以把它理解为“声明和构造 UI 的方法”。

However, these have a few differences to a `UIView`. To start, widgets have a
different lifespan: they are immutable and only exist until they need to be
changed. Whenever widgets or their state change, Flutter’s framework creates
a new tree of widget instances. In comparison, an iOS view is not recreated when
it changes, but rather it's a mutable entity that is drawn once and doesn't
redraw until it is invalidated using `setNeedsDisplay()`.

然而，`Widget` 和 `UIView` 还是有着相当一部分区别的。首先，widget 拥有着不同的生命周期： 整个
生命周期内它是不可变的，且只能够存活到被修改的时候。一旦 widget 实例或者它的状态发生了改变，
Flutter 框架就会创建一个新的由 `Widget` 实例构造而成的树状结构。而在 iOS 里，修改一个视图
并不会导致它重新创建实例，它作为一个可变对象，只会绘制一次，只有在发生 `setNeedsDisplay()` 调
用之后才会发生重绘。

Furthermore, unlike `UIView`, Flutter’s widgets are lightweight, in part due
to their immutability. Because they aren't views themselves, and aren't directly
drawing anything, but rather are a description of the UI and its semantics
that get "inflated" into actual view objects under the hood.

还有，和 `UIView` 不同，Flutter 的 widget 是很轻量的，一部分原因就是源于它的不可变特性。因为它并不
是视图，也不直接绘制任何内容，而是作为对 UI 及其特性的一种描述，而被“注入”到视图中去。

Flutter includes the [Material Components][]
library. These are widgets that implement the
[Material Design guidelines][]. Material Design is a
flexible design system [optimized for all
platforms][],
including iOS.

Flutter 包含了 [Material Components][] 库。内容都是
一些遵循了 [Material Design 设计规范][] 的组件。Material Design 是
一种灵活的 [支持全平台][]
的设计体系，其中也包括了 iOS。

But Flutter is flexible and expressive enough to implement any design language.
On iOS, you can use the [Cupertino widgets][]
to produce an interface that looks like
[Apple's iOS design language][].

但是 Flutter 的灵活性和表现力使其能够适配任何的设计语言。
在 iOS 中，你可以通过 [Cupertino widgets][] 
来构造类似于 [Apple iOS 设计语言][Apple's iOS design language]的接口。

### How do I update widgets?

### 我该如何更新 widget？

To update your views on iOS, you directly mutate them.
In Flutter, widgets are immutable and not updated directly.
Instead, you have to manipulate the widget’s state.

在 iOS 可以直接对视图进行修改。但是在 Flutter 中，widget 都是不可变的，
所以也不能够直接对其修改。
所以，你必须通过修改 widget 的 state 来达到更新视图的目的。

This is where the concept of Stateful vs Stateless widgets
comes in. A `StatelessWidget` is just what it sounds
like&mdash;a widget with no state attached.

于是，就引入了 Stateful widget 和 Stateless widget 的概念。
和字面意思相同，`StatelessWidget` 就是一个没有绑定状态的 widget。

`StatelessWidgets` are useful when the part of the user interface you are
describing does not depend on anything other than the initial configuration
information in the widget.

当某个 widget 不需要依赖任何别的初始配置来对这个 widget 进行描述时，
`StatelessWidgets` 会是很有用的。

For example, in iOS, this is similar to placing a `UIImageView` with
your logo as the `image`. If the logo is not changing during runtime,
use a `StatelessWidget` in Flutter.

举个例子，在 iOS 中，你需要把 logo 当作 `image` 并将它放置在 `UIImageView` 中，
如果在运行时这个 logo 不会发生变化，
那么对应 Flutter 中你应该使用 `StatelessWidget`。

If you want to dynamically change the UI based on data received after making an
HTTP call, use a `StatefulWidget`. After the HTTP call has
completed, tell the Flutter framework that the widget’s `State` is
updated, so it can update the UI.

但是如果你想要根据 HTTP 请求的返回结果动态的修改 UI，
那么你应该使用 `StatefulWidget`。在 HTTP 请求结束后，
通知 Flutter 更新这个 widget 的 `State`，然后 UI 就会得到更新。

The important difference between stateless and
stateful widgets is that `StatefulWidget`s have a `State` object that stores
state data and carries it over across tree rebuilds, so it's not lost.

`StatefulWidget` 和 `StatelessWidget` 最重要的区别就是，
`StatefulWidget` 中有一个 `State` 对象，
它用来存储一些状态的信息，并在整个生命周期内保持不变。

If you are in doubt, remember this rule: if a widget changes outside of
the `build` method (because of runtime user interactions, for example), it’s stateful.
If the widget never changes, once built, it's stateless.
However, even if a widget is stateful, the containing parent widget can still
be stateless if it isn’t itself reacting to those changes (or other inputs).

如果你对此还存有疑虑，记住一点：如果一个 widget 在 `build` 方法之外（比如运行时下发生用户点击事件）被修改，
那么就应该是有状态的。如果一个 widget 一旦生成就不再发生改变，那么它就是无状态的。
然而，即使一个 widget 是有状态的，如果不是自身直接响应修改（或别的输入），那么他的父容器也可以是无状态的。

The following example shows how to use a `StatelessWidget`. A common
`StatelessWidget` is the `Text` widget. If you look at the implementation of
the `Text` widget you'll find it subclasses `StatelessWidget`.

下面是如何使用 `StatelessWidget` 的示例。`Text` 是一个常用的 `StatelessWidget`。
如果你看了 `Text` 的源代码，就会发现它继承于 `StatelessWidget`。

<!-- skip -->
```dart
Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
```

If you look at the code above, you might notice that the `Text` widget
carries no explicit state with it. It renders what is passed in its
constructors and nothing more.

看了上面的代码，你会注意到 `Text` 没有携带任何状态，
它只会渲染初始化时传进来的内容。

But, what if you want to make "I Like Flutter" change dynamically,
for example when clicking a `FloatingActionButton`?

然而，如果你想要动态地修改文本为 “I Like Flutter”，
比如说在点击一个 `FloatingActionButton` 时该怎么做呢？

To achieve this, wrap the `Text` widget in a `StatefulWidget` and
update it when the user clicks the button.

想要实现这个需求，只需要把 `Text` 放到 `StatefulWidget` 中，
并在用户点击按钮时更新它即可。

For example:

下面是示例代码：

<!-- skip -->
```dart
class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default placeholder text
  String textToShow = "I Like Flutter";
  void _updateText() {
    setState(() {
      // update the text
      textToShow = "Flutter is Awesome!";
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: Center(child: Text(textToShow)),
      floatingActionButton: FloatingActionButton(
        onPressed: _updateText,
        tooltip: 'Update Text',
        child: Icon(Icons.update),
      ),
    );
  }
}
```

### How do I lay out my widgets? Where is my Storyboard?

### 如何对 widget 做布局？Storyboard 哪去了？

In iOS, you might use a Storyboard file to organize your views and set
constraints, or you might set your constraints programmatically in your view
controllers. In Flutter, declare your layout in code by composing
a widget tree.

在 iOS 开发中，你可能会经常使用 Storyboard 来组织你的视图，
并直接通过 Storyboard 或者在 ViewController 中通过代码来设置约束。
而在 Flutter 中，你要通过代码来对 widget 进行组织来形成一个 widget 树状结构。

The following example shows how to display a simple widget with padding:

下面的例子展示了如何展示一个带有 padding 的 widget：

<!-- skip -->
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text("Sample App"),
    ),
    body: Center(
      child: CupertinoButton(
        onPressed: () {
          setState(() { _pressedCount += 1; });
        },
        child: Text('Hello'),
        padding: EdgeInsets.only(left: 10.0, right: 10.0),
      ),
    ),
  );
}
```

You can add padding to any widget,
which mimics the functionality of constraints in iOS.

你可以为任何 widget 添加 padding，来达到类似在 iOS 中视图约束的作用。

You can view the layouts that Flutter has to offer in the [widget
catalog][].

你可以在 [widget 目录][widget catalog] 中查看 Flutter 提供
的所有 widget 布局方法。

### How do I add or remove a component from my layout?

### 如何增加或者移除一个组件？

In iOS, you call `addSubview()` on the parent, or `removeFromSuperview()`
on a child view to dynamically add or remove child views. In Flutter, because
widgets are immutable there is no direct equivalent to `addSubview()`.
Instead, you can pass a function to the parent that returns a widget, and
control that child's creation with a boolean flag.

在 iOS 中，你可以通过调用父视图的 `addSubview()` 方法或者
`removeFromSuperview()` 方法来动态的添加或移除视图。在 Flutter 中，
因为 widget 是不可变的，所以没有提供直接同 `addSubview()`
作用相同的方法。但是你可以通过向父视图传递一个返回值是 widget 的方法，
并通过一个 boolean flag 来控制子视图的存在。

The following example shows how to toggle between two widgets when the
user clicks the `FloatingActionButton`:

下面的例子中像你展示了如何让用户通过点击 `FloatingActionButton` 
按钮来达到在两个 widget 中切换的目的。

<!-- skip -->
```dart
class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default value for toggle
  bool toggle = true;
  void _toggle() {
    setState(() {
      toggle = !toggle;
    });
  }

  _getToggleChild() {
    if (toggle) {
      return Text('Toggle One');
    } else {
      return CupertinoButton(
        onPressed: () {},
        child: Text('Toggle Two'),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: Center(
        child: _getToggleChild(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggle,
        tooltip: 'Update Text',
        child: Icon(Icons.update),
      ),
    );
  }
}
```

### How do I animate a widget?

### 如何添加动画？

In iOS, you create an animation by calling the
`animate(withDuration:animations:)` method on a view. In Flutter,
use the animation library to wrap widgets inside an animated widget.

在 iOS 里，你可以使用调用视图的 `animate(withDuration:animations:)` 方法来创建动画。
在 Flutter 里，通过使用动画库将 widget 封装到 animated widget 中来实现带动画效果。

In Flutter, use an `AnimationController`, which is an `Animation<double>`
that can pause, seek, stop, and reverse the animation. It requires a `Ticker`
that signals when vsync happens and produces a linear interpolation between
0 and 1 on each frame while it's running. You then create one or more
`Animation`s and attach them to the controller.

在 Flutter 里，使用 `AnimationController`，它是一个可以暂停、查找、停止和反转动画
的 `Animation<double>` 类型。它需要一个 `Ticker`，在屏幕刷新时发出信号量，并在运行时
对每一帧都产生一个 0~1 的线性差值。然后
你可以创建一个或多个 `Animation`，并把它们添加到控制器中。

For example, you might use `CurvedAnimation` to implement an animation
along an interpolated curve. In this sense, the controller
is the "master" source of the animation progress and the `CurvedAnimation`
computes the curve that replaces the controller's default linear motion.
Like widgets, animations in Flutter work with composition.

比如，你可以使用 `CurvedAnimation` 来实现一个曲线翻页动画。
这种情况下，控制器就是动画进度的主要数据源，
而 `CurvedAnimation` 计算曲线并替换控制器的默认线性运动，
和 widget 一样，在 Flutter 里动画也可以复合嵌套。

When building the widget tree you assign the `Animation` to an animated
property of a widget, such as the opacity of a `FadeTransition`, and tell the
controller to start the animation.

当构建一个 widget 树时，可以将 `Animation` 赋值给 widget 用户表现动画能力的属性，
比如 `FadeTransition` 的 opacity 属性，然后告诉控制器启动动画。

The following example shows how to write a `FadeTransition` that
fades the widget into a logo when you press the `FloatingActionButton`:

下面的示例描述了当你点击 `FloatingActionButton` 时，
如何实现一个视图渐淡出成 logo 的 `FadeTransition` 效果。

<!-- skip -->
```dart
class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fade Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyFadeTest(title: 'Fade Demo'),
    );
  }
}

class MyFadeTest extends StatefulWidget {
  MyFadeTest({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyFadeTest createState() => _MyFadeTest();
}

class _MyFadeTest extends State<MyFadeTest> with TickerProviderStateMixin {
  AnimationController controller;
  CurvedAnimation curve;

  @override
  void initState() {
    controller = AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
    curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Container(
          child: FadeTransition(
            opacity: curve,
            child: FlutterLogo(
              size: 100.0,
            )
          )
        )
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Fade',
        child: Icon(Icons.brush),
        onPressed: () {
          controller.forward();
        },
      ),
    );
  }

  @override
  dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

For more information, see
[Animation & Motion widgets][],
the [Animations tutorial][],
and the [Animations overview][].

关于更多的内容，可以查看
[Animation 和 Motion widgets][Animation & Motion widgets]，
[Animations 教程][Animations tutorial]，
以及 [Animations 概览][Animations overview]。

### How do I draw to the screen?

### 如何渲染到屏幕上？

On iOS, you use `CoreGraphics` to draw lines and shapes to the
screen. Flutter has a different API based on the `Canvas` class, with two
other classes that help you draw: `CustomPaint` and `CustomPainter`, the
latter of which implements your algorithm to draw to the canvas.

在 iOS 里，可以使用 `CoreGraphics` 绘制线条和图形到屏幕上。
Flutter 里有一套基于 `Cavans` 实现的 API，有两个类可以帮助你进行绘制：
`CustomPaint` 和 `CustomPainter`，后者实现了绘制图形到 canvas 的算法。

To learn how to implement a signature painter in Flutter, see Collin's answer on
[StackOverflow][].

想要学习在 Flutter 里如何实现一个画笔，
可以查看 Collin 在 [StackOverflow][] 里的回答。

<!-- skip -->
```dart
class SignaturePainter extends CustomPainter {
  SignaturePainter(this.points);

  final List<Offset> points;

  void paint(Canvas canvas, Size size) {
    var paint = Paint()
      ..color = Colors.black
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 5.0;
    for (int i = 0; i < points.length - 1; i++) {
      if (points[i] != null && points[i + 1] != null)
        canvas.drawLine(points[i], points[i + 1], paint);
    }
  }

  bool shouldRepaint(SignaturePainter other) => other.points != points;
}

class Signature extends StatefulWidget {
  SignatureState createState() => SignatureState();
}

class SignatureState extends State<Signature> {

  List<Offset> _points = <Offset>[];

  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (DragUpdateDetails details) {
        setState(() {
          RenderBox referenceBox = context.findRenderObject();
          Offset localPosition =
          referenceBox.globalToLocal(details.globalPosition);
          _points = List.from(_points)..add(localPosition);
        });
      },
      onPanEnd: (DragEndDetails details) => _points.add(null),
      child: CustomPaint(painter: SignaturePainter(_points), size: Size.infinite),
    );
  }
}
```

### Where is the widget's opacity?

### 如何设置视图 widget 的透明度？

On iOS, everything has .opacity or .alpha.
In Flutter, most of the time you need to
wrap a widget in an Opacity widget to accomplish this.

在 iOS 里，视图都有一个 opacity 或者 alpha 属性。而在 Flutter 里，大部分时候你都需要封装 widget 到
一个 Opacity widget 中来实现这一功能。

### How do I build custom widgets?

### 如何构建自定义 widget？

In iOS, you typically subclass `UIView`, or use a pre-existing view, to
override and implement methods that achieve the desired behavior. In
Flutter, build a custom widget by
[composing][] smaller widgets
(instead of extending them).

在 iOS 里，你可以直接继承 `UIView` 或者使用已经存在的视图，然后重写并实现对应的方法来达到想要的效果。
在 Flutter 里，构建自定义 widget 需要通过 [组合](/docs/resources/technical-overview#everythings-a-widget) 一些小的 widget（而不是对它们进行扩展）来实现。

For example, how do you build a `CustomButton` that takes a label in
the constructor? Create a CustomButton that composes a
`RaisedButton` with a label, rather than by extending `RaisedButton`:

例如，应该如何构建一个初始方法中就包含文本标签的 `CustomButton`？需要创建一个合成一个 `RaisedButton` 和一个
文本标签的 CustomButton，而不是继承 `RaisedButton`：

<!-- skip -->
```dart
class CustomButton extends StatelessWidget {
  final String label;

  CustomButton(this.label);

  @override
  Widget build(BuildContext context) {
    return RaisedButton(onPressed: () {}, child: Text(label));
  }
}
```

Then use `CustomButton`,
just as you'd use any other Flutter widget:

与其他 Flutter widget 一样的用法，下面我们使用 `CustomButton`：

<!-- skip -->
```dart
@override
Widget build(BuildContext context) {
  return Center(
    child: CustomButton("Hello"),
  );
}
```

## Navigation

## 导航

### How do I navigate between pages?

### 如何在两个页面之间切换？

In iOS, to travel between view controllers, you can use a
`UINavigationController` that manages the stack of view controllers to
display.

在 iOS 里，想要在多个 viewcontroller 中切换，可以使用 `UINavigationController`
管理 viewcontroller 构成的栈进行显示。

Flutter has a similar implementation, using a `Navigator` and
`Routes`. A `Route` is an abstraction for a “screen” or “page” of an app, and
a `Navigator` is a [widget][]
that manages routes. A route roughly maps to a
`UIViewController`. The navigator works in a similar way to the iOS
`UINavigationController`, in that it can `push()` and `pop()`
routes depending on whether you want to navigate to, or back from, a view.

Flutter 中也有类似的实现，使用 `Navigator` 和 `Routes`。
一个 `Route` 是应用中屏幕或者页面的抽象概念，
而一个 `Navigator` 是管多个 `Route` 的 [widget][]。
也可以理解把 `Route` 理解为 `UIViewController`。
而 `Navigator` 的工作方式和 iOS 里的 `UINavigationController` 类似，
当你想要进入或退出一个新页面的时候，它也可以进行 `push()` 和 `pop()` 操作。

To navigate between pages, you have a couple options:
想要在不同页面间跳转，你有两个选择：

* Specify a `Map` of route names.
  
  构建由 route 名称组成的 `Map`；
  
* Directly navigate to a route.
  
  直接跳转到一个 route。

The following example builds a `Map`.

下面的示例构建了一个 `Map`：

<!-- skip -->
```dart
void main() {
  runApp(CupertinoApp(
    home: MyAppHome(), // becomes the route named '/'
    routes: <String, WidgetBuilder> {
      '/a': (BuildContext context) => MyPage(title: 'page A'),
      '/b': (BuildContext context) => MyPage(title: 'page B'),
      '/c': (BuildContext context) => MyPage(title: 'page C'),
    },
  ));
}
```

Navigate to a route by `push`ing its name to the `Navigator`.

通过把 route 名称传递给 `Navigator` 来实现 `push` 效果。

```
Navigator.of(context).pushNamed('/b');
```

The `Navigator` class handles routing in Flutter and is used to get
a result back from a route that you have pushed on the stack. This is done
by `await`ing on the `Future` returned by `push()`.

`Navigator` 类对 Flutter 中的路由事件做处理，还可以用来获取入栈之后的路由的结果。
这需要通过 `push()` 返回的 `Future` 中 的 `await` 来实现。

For example, to start a ‘location’ route that lets the user select their
location, you might do the following:

例如，要打开一个“定位”页面来让用户选择他们的位置，你需要做如下事情：

<!-- skip -->
```dart
Map coordinates = await Navigator.of(context).pushNamed('/location');
```

And then, inside your ‘location’ route, once the user has selected their
location, `pop()` the stack with the result:

然后，在”定位“页面中，一旦用户选择了自己的定位，就 `pop()` 出栈并返回结果。

<!-- skip -->
```dart
Navigator.of(context).pop({"lat":43.821757,"long":-79.226392});
```

### How do I navigate to another app?

### 如何跳转到其他应用？

In iOS, to send the user to another application, you use a
specific URL scheme. For the system level apps, the scheme
depends on the app. To implement this functionality in Flutter,
create a native platform integration, or use an
[existing plugin][], such as [`url_launcher`][].

在 iOS 里，想要跳转到其他应用，可以使用特定的 URL scheme。对于系统级别的应用，scheme 都是
取决于应用的。在 Flutter 里想要实现这个功能，需要创建原生平台的整合层，或者
使用已经存在的 [插件]({{site.pub-pkg}}/flutter/)，例如
[`url_launcher`]({{site.pub-pkg}}/url_launcher)。

### How do I pop back to the iOS native viewcontroller?

### 如何退回到 iOS 原生的 viewcontroller？

Calling `SystemNavigator.pop()` from your Dart code invokes the
following iOS code:

在 Dart 代码中调用 `SystemNavigator.pop()` 将会调用下面的 iOS 代码：

```
UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
  if ([viewController isKindOfClass:[UINavigationController class]]) {
    [((UINavigationController*)viewController) popViewControllerAnimated:NO];
  }
```

If that doesn't do what you want, you can create your own
[platform channel][] to invoke arbitrary iOS code.

如果这不是你需要的功能，你可以创建你自己的 [平台通道][platform channel] 来调用
对应的 iOS 代码。

## Threading & asynchronicity

## 线程和异步

### How do I write asynchronous code?

### 如何编写异步代码？

Dart has a single-threaded execution model, with support for `Isolate`s (a way
to run Dart code on another thread), an event loop, and asynchronous programming.
Unless you spawn an `Isolate`, your Dart code runs in the main UI thread and is
driven by an event loop. Flutter’s event loop is equivalent to the iOS main
loop&mdash;that is, the `Looper` that is attached to the main thread.

Dart 是单线程执行模型，支持 `Isolate`（一种在其他线程运行 Dart 代码的方法）、事件循环和异步编程。
除非生成了 `Isolate`，否则所有 Dart 代码将永远在主 UI 线程运行，并由事件循环驱动。Flutter 中的事件循环
类似于 iOS 中的 main loop&mdash;，也就是主线程上的 `Looper`。

Dart’s single-threaded model doesn’t mean you are required to run everything as
a blocking operation that causes the UI to freeze. Instead,
use the asynchronous facilities that the Dart language provides, such as
`async`/`await`, to perform asynchronous work.

Dart 的单线程模型并不意味着你需要以阻塞 UI 的形式来执行代码，相反，你更应该使用 Dart 语言提供的异步功能，
比如使用 `async`/`await` 来实现异步操作。

For example, you can run network code without causing the UI to hang by using
`async`/`await` and letting Dart do the heavy lifting:

例如，你可以使用 `async`/`await` 来执行网络代码以避免 UI 挂起，让 Dart 来完成这个繁重的任务：

<!-- skip -->
```dart
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
```

Once the `await`ed network call is done,
update the UI by calling `setState()`,
which triggers a rebuild of the widget sub-tree
and updates the data.

一旦 `await` 等待的网络操作结束，通过调用 `setState()` 来更新 UI，这将会触发 widget 子树的重新
构建并更新数据。

The following example loads data asynchronously and displays it in a `ListView`:

下面的示例展示了如何异步加载数据，并在 `ListView` 中展示出来：

<!-- skip -->
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();

    loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView.builder(
          itemCount: widgets.length,
          itemBuilder: (BuildContext context, int position) {
            return getRow(position);
          }));
  }

  Widget getRow(int i) {
    return Padding(
      padding: EdgeInsets.all(10.0),
      child: Text("Row ${widgets[i]["title"]}")
    );
  }

  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = json.decode(response.body);
    });
  }
}
```

Refer to the next section for more information on doing work
in the background, and how Flutter differs from iOS.

更多关于在后台执行任务的信息，以及 Flutter 和 iOS 的区别，可以参考下一章节。

### How do you move work to a background thread?

### 如何让你的任务在后台线程执行？

Since Flutter is single threaded and runs an event loop (like Node.js), you
don't have to worry about thread management or spawning background threads. If
you're doing I/O-bound work, such as disk access or a network call, then
you can safely use `async`/`await` and you're done. If, on the other
hand, you need to do computationally intensive work that keeps the CPU busy,
you want to move it to an `Isolate` to avoid blocking the event loop.

由于 Flutter 是单线程模型，而且执行着一个 event loop（就像 Node.js），你不需要为线程管理或
是开启后台线程操心。如果你在处理 I/O 操作，例如磁盘访问或网络请求，那么你安全地使用 `async`/`await` 就
可以了。但是，如果你需要大量的计算来让 CPU 保持忙碌状态，你需要使用 `Isolate` 来防治阻塞 event loop。

For I/O-bound work, declare the function as an `async` function,
and `await` on long-running tasks inside the function:

对于 I/O 操作，把方法声明为 `async` 方法，然后通过 `await` 来等待异步方法的执行完成：

<!-- skip -->
```dart
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
```

This is how you typically do network or database calls,
which are both I/O operations.

这就是处理网络或数据库请求等 I/O 操作的经典做法。

However, there are times when you might be processing a large amount of data and
your UI hangs. In Flutter, use `Isolate`s to take advantage of
multiple CPU cores to do long-running or computationally intensive tasks.

然而，有时候你需要处理大量的数据，从而导致 UI 挂起。在 Flutter 里，当处理长期运行或者运算密集的任务时，
可以使用 `Isolate` 来发挥出多核 CPU 的优势。

Isolates are separate execution threads that do not share any memory
with the main execution memory heap. This means you can’t access variables from
the main thread, or update your UI by calling `setState()`. Isolates are true to
their name, and cannot share memory (in the form of static fields, for example).

Isolates 是相互隔离的执行线程，并不和主线程共享内存。这意味着你不能够访问主线程的变量，也不能
使用 `setState()` 来更新 UI。Isolates 正如起字面意思是不能共享内存（例如静态变量表）的。

The following example shows, in a simple isolate, how to share data back to
the main thread to update the UI.

下面的例子展示了在一个简单的 isolate 中，如何把数据推到主线程上用来更新 UI。

<!-- skip -->
```dart
loadData() async {
  ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message
  SendPort sendPort = await receivePort.first;

  List msg = await sendReceive(
    sendPort,
    "https://jsonplaceholder.typicode.com/posts",
  );

  setState(() {
    widgets = msg;
  });
}

// The entry point for the isolate
static dataLoader(SendPort sendPort) async {
  // Open the ReceivePort for incoming messages.
  ReceivePort port = ReceivePort();

  // Notify any other isolates what port this isolate listens to.
  sendPort.send(port.sendPort);

  await for (var msg in port) {
    String data = msg[0];
    SendPort replyTo = msg[1];

    String dataURL = data;
    http.Response response = await http.get(dataURL);
    // Lots of JSON to parse
    replyTo.send(json.decode(response.body));
  }
}

Future sendReceive(SendPort port, msg) {
  ReceivePort response = ReceivePort();
  port.send([msg, response.sendPort]);
  return response.first;
}
```

Here, `dataLoader()` is the `Isolate` that runs in
its own separate execution thread.
In the isolate you can perform more CPU intensive
processing (parsing a big JSON, for example),
or perform computationally intensive math,
such as encryption or signal processing.

在这里，`dataLoader` 就是运行在独立线程上的 `Isolate`。在 `Isolate` 中，你可以处理 CPU 密集型任务（如解析一个
庞大的 JSON 文件），或者处理复杂的数学运算，比如加密操作或者信号处理等。

You can run the full example below:

下面是一个完整示例：

<!-- skip -->
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:isolate';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  showLoadingDialog() {
    if (widgets.length == 0) {
      return true;
    }

    return false;
  }

  getBody() {
    if (showLoadingDialog()) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  getProgressDialog() {
    return Center(child: CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() => ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return Padding(
      padding: EdgeInsets.all(10.0),
      child: Text("Row ${widgets[i]["title"]}"),
    );
  }

  loadData() async {
    ReceivePort receivePort = ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message
    SendPort sendPort = await receivePort.first;

    List msg = await sendReceive(
      sendPort,
      "https://jsonplaceholder.typicode.com/posts",
    );

    setState(() {
      widgets = msg;
    });
  }

// the entry point for the isolate
  static dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    ReceivePort port = ReceivePort();

    // Notify any other isolates what port this isolate listens to.
    sendPort.send(port.sendPort);

    await for (var msg in port) {
      String data = msg[0];
      SendPort replyTo = msg[1];

      String dataURL = data;
      http.Response response = await http.get(dataURL);
      // Lots of JSON to parse
      replyTo.send(json.decode(response.body));
    }
  }

  Future sendReceive(SendPort port, msg) {
    ReceivePort response = ReceivePort();
    port.send([msg, response.sendPort]);
    return response.first;
  }
}
```

### How do I make network requests?

### 如何发起网络请求？

Making a network call in Flutter is easy when you use the popular
[`http` package][]. This abstracts
away a lot of the networking that you might normally implement yourself,
making it simple to make network calls.

在 Flutter 里，想要构造网络请求十分简单，直接使用
[`http` 库]({{site.pub-pkg}}/http) 即可。
它把你可能要实现的网络操作进行了抽象封装，让处理网络请求变得十分简单。

To use the `http` package, add it to your dependencies in `pubspec.yaml`:

要使用 `http` 库，需要在 `pubspec.yaml` 中把它添加为依赖：

```yaml
dependencies:
  ...
  http: ^0.11.3+16
```

To make a network call,
call `await` on the `async` function `http.get()`:

构造网络请求，需要在 `async` 方法 `http.get()` 中调用 `await`：

<!-- skip -->
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
[...]
  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = json.decode(response.body);
    });
  }
}
```

### How do I show the progress of a long-running task?

### 展示耗时任务的进度

In iOS, you typically use a `UIProgressView` while executing a
long-running task in the background.

在 iOS 里，在后台运行耗时任务时，会使用 `UIProgressView`。

In Flutter, use a `ProgressIndicator` widget.
Show the progress programmatically by controlling when it's rendered
through a boolean flag. Tell Flutter to update its state before your
long-running task starts, and hide it after it ends.

在 Flutter 里，应该使用 `ProgressIndicator`。
它在渲染时通过一个 boolean flag 来控制是否显示
进度。在耗时任务开始前，告诉 Flutter 去更新状态，
并在任务结束后隐藏。

In the example below, the build function is separated into three different
functions. If `showLoadingDialog()` is `true` (when `widgets.length == 0`),
then render the `ProgressIndicator`. Otherwise, render the
`ListView` with the data returned from a network call.

在下面的例子中，`build` 函数被分为三个不同的函数。
当 `showLoadingDialog()` 是 `true` 时
（当 `widgets.length == 0`），渲染 `ProgressIndicator`。
否则，使用网络请求返回的数据渲染 `ListView`。

<!-- skip -->
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  showLoadingDialog() {
    return widgets.length == 0;
  }

  getBody() {
    if (showLoadingDialog()) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  getProgressDialog() {
    return Center(child: CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() => ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return Padding(
      padding: EdgeInsets.all(10.0),
      child: Text("Row ${widgets[i]["title"]}"),
    );
  }

  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = json.decode(response.body);
    });
  }
}
```

## Project structure, localization, dependencies and assets

## 工程结构，本地化，依赖和资源

### How do I include image assets for Flutter? What about multiple resolutions?

### 如何在 Flutter 中引入图片资源？如何处理多分辨率？

While iOS treats images and assets as distinct items, Flutter apps have only
assets. Resources that are placed in the `Images.xcasset` folder on iOS,
are placed in an assets folder for Flutter.
As with iOS, assets are any type of file, not just images.
For example, you might have a JSON file located in the `my-assets` folder:

在 iOS 里，图片和其他资源会被视为不同的资源分别处理，
而在 Flutter 中只有资源这一个概念。
iOS 里被放置在 `Images.xcasset` 文件夹的资源在
Flutter 中都被放置到了 assets 文件夹中。
和 iOS 一样，assets 中可以放置任意类型的文件，而不仅仅是图片。
例如，你可以把一个 JSON 文件放置到 `my-assets` 文件夹中。


```
my-assets/data.json
```

Declare the asset in the `pubspec.yaml` file:

在 `pubspec.yaml` 中声明 assets：

```yaml
assets:
 - my-assets/data.json
```

And then access it from code using an [`AssetBundle`][]:

然后在代码中通过 [`AssetBundle`][] 访问资源:

<!-- skip -->
```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('my-assets/data.json');
}
```

For images, Flutter follows a simple density-based format like iOS.
Image assets might be `1.0x`, `2.0x`, `3.0x`, or any other multiplier.
The so-called [`devicePixelRatio`][]
expresses the ratio of physical pixels in a single logical pixel.

对于图片，Flutter 和 iOS 一样遵循了一个简单的基于屏幕密度的格式。
Image assets 可能是 `1.0x`，`2.0x`，`3.0x` 或者其他任意的倍数。
而 [`devicePixelRatio`][] 则表达了物理分辨率到逻辑分辨率的对照比例。

Assets are located in any arbitrary folder&mdash;Flutter has no
predefined folder structure. You declare the assets (with location) in
the `pubspec.yaml` file, and Flutter picks them up.

Assets 可以放在任何属性的文件夹中&mdash;Flutter 没有任何预置的文件结构。
你需要在 `pubspec.yaml` 中声明 assets （包括路径），然后 Flutter 将会识别它们。

For example, to add an image called `my_icon.png` to your Flutter
project, you might decide to store it in a folder arbitrarily called `images`.
Place the base image (1.0x) in the `images` folder, and the
other variants in sub-folders named after the appropriate ratio multiplier:

例如，要添加一个名为 `my_icon.png` 的图片到你的 Flutter 工程中，
你可以把它存储在 `images` 文件夹下。
把基础的图片（一倍图）放到 `images` 文件夹下，
然后把其他倍数的图片放置到对应的比例下的子文件夹中。

```
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

Next, declare these images in the `pubspec.yaml` file:

接着，在 `pubspec.yaml` 文件中声明这些图片：

```yaml
assets:
 - images/my_icon.png
```

You can now access your images using `AssetImage`:

现在你可以使用 `AssetImage` 访问你的图片了：

<!-- skip -->
```dart
return AssetImage("images/a_dot_burr.jpeg");
```

or directly in an `Image` widget:

或者直接在 `Image` widget 进行使用：

<!-- skip -->
```dart
@override
Widget build(BuildContext context) {
  return Image.asset("images/my_image.png");
}
```

For more details, see
[Adding Assets and Images in Flutter][].

关于更多的细节，请参见文档 [在 Flutter 中添加资源和图片](/docs/development/ui/assets-and-images)。

### Where do I store strings? How do I handle localization?

### 字符串存储在哪里？如何处理本地化？

Unlike iOS, which has the `Localizable.strings` file, Flutter doesn't
currently have a dedicated system for handling strings. At the moment, the
best practice is to declare your copy text in a class as static fields and
access them from there. For example:

iOS 里有 `Localizable.strings` 文件，而 Flutter 则不同，
目前并没有关于字符串的处理系统。
目前，最佳的方案就是在静态区声明你的文本，
然后进行访问。例如：

<!-- skip -->
```dart
class Strings {
  static String welcomeMessage = "Welcome To Flutter";
}
```

You can access your strings as such:

你可以这样访问字符串：

<!-- skip -->
```dart
Text(Strings.welcomeMessage)
```

By default, Flutter only supports US English for its strings.
If you need to add support for other languages,
include the `flutter_localizations` package.
You might also need to add Dart's [`intl`][]
package to use i10n machinery, such as date/time formatting.

默认情况下，Flutter 只支持美式英语的本地化字符串。
如果你需要添加其他语言支持，请引入 `flutter_localizations` 库。
同时你可能还需要添加 [`intl`]({{site.pub-pkg}}/intl) 库来使用 i10n 机制，
比如日期 / 时间的格式化等。

```yaml
dependencies:
  # ...
  flutter_localizations:
    sdk: flutter
  intl: "^0.15.6"
```

To use the `flutter_localizations` package,
specify the `localizationsDelegates` and
`supportedLocales` on the app widget:

<!-- skip -->
```dart
import 'package:flutter_localizations/flutter_localizations.dart';

MaterialApp(
 localizationsDelegates: [
   // Add app-specific localization delegate[s] here
   GlobalMaterialLocalizations.delegate,
   GlobalWidgetsLocalizations.delegate,
 ],
 supportedLocales: [
    const Locale('en', 'US'), // English
    const Locale('he', 'IL'), // Hebrew
    // ... other locales the app supports
  ],
  // ...
)
```

The delegates contain the actual localized values,
while the `supportedLocales`
defines which locales the app supports.
The above example uses a `MaterialApp`,
so it has both a `GlobalWidgetsLocalizations` for the base
widgets localized values,
and a `MaterialWidgetsLocalizations` for the Material
widgets localizations. If you use `WidgetsApp` for your app,
you don't need the latter. Note that these two delegates contain "default"
values, but you'll need to provide one or more delegates for your own app's
localizable copy, if you want those to be localized too.

`supportedLocales` 指定了应用支持的语言，
而这些 delegates 则包含了实际的本地化内容。
上面的示例使用了一个 `MaterialApp`，
所以它既使用了处理基础 widget 本地化的 `GlobalWidgetsLocalizations`，
也使用了处理 Material widget 本地化的 `MaterialWidgetsLocalizations`。
如果你在应用中使用的是 `WidgetApp`，就不需要后者了。
注意，这两个 delegates 虽然都包含了“默认”值，
但是如果你想要实现本地化，
就必须在本地提供一个或多个 delegates 的实现副本。


When initialized, the `WidgetsApp` (or `MaterialApp`) creates a
[`Localizations`][] widget for you, with the delegates you specify.
The current locale for the device is always accessible from the
`Localizations` widget from the current context
(in the form of a `Locale` object), or using the
[`Window.locale`][].

当初始化的时候，`WidgetsApp`（或 `MaterialApp`）会根据
你提供的 delegates 创建一个 [`Localizations`][] widget。
`Localizations` widget 可以随时从当前上下文中中获取设备所用的语言，
也可以使用 [`Window.locale`][]。

To access localized resources, use the `Localizations.of()` method to
access a specific localizations class that is provided by a given delegate.
Use the [`intl_translation`][]
package to extract translatable copy to
[arb][]
files for translating, and importing them back into the app for using them
with `intl`.

要使用本地化资源，使用 `Localizations.of()` 方法可以访问提供代理的特定本地化类。
使用 [`intl_translation`][] 库解压翻译
的副本到 [arb][] 文件，
然后在应用中通过 `intl` 来引用它们。

For further details on internationalization and localization in Flutter, see the
[internationalization guide][],
which has sample code with and without the `intl` package.

关于 Flutter 中国际化和本地化的细节内容，请参看
[Flutter 应用里的国际化][internationalization guide]，
里面包含有使用和不使用 `intl` 库的示例代码。

Note that before Flutter 1.0 beta 2, assets defined in Flutter were not
accessible from the native side, and vice versa, native assets and resources
weren’t available to Flutter, as they lived in separate folders.

注意在 Flutter 1.0 beta 2 之前，在 Flutter 里定义的资源是不能被原生代码访问的，
反之亦然，而原生的资源也是不能在 Flutter 中使用，
因为它们都被放在了独立的文件夹中。

### What is the equivalent of CocoaPods? How do I add dependencies?

### CocoaPods 相当于 Flutter 中的什么？如何添加依赖？

In iOS, you add dependencies by adding to your `Podfile`. Flutter uses Dart’s
build system and the Pub package manager to handle dependencies. The tools
delegate the building of the native Android and iOS wrapper apps to the
respective build systems.

在 iOS 里，可以通过 `Podfile` 添加依赖。
而 Flutter 使用 Dart 构建系统和 Pub 包管理器来处理依赖。
这些工具将原生应用的打包任务分发给相应 Android 或 iOS 构建系统。

While there is a Podfile in the iOS folder in your
Flutter project, only use this if you are adding native
dependencies needed for per-platform integration. In general, use
`pubspec.yaml` to declare external dependencies in Flutter.
A good place to find great packages for Flutter is on
[pub.dev][].

如果你的 Flutter 项目 iOS 文件夹中存在 Podfile，
那么请仅在里面添加原生平台的依赖。总而言之，
在 Flutter 中使用 `pubspec.yaml` 来声明外部依赖。
你可以通过 [pub.dev][] 来查找一些优秀的 Flutter 第三方包。

## ViewControllers

### What is the equivalent to ViewController in Flutter?

### ViewControllers 相当于 Flutter 中的什么？

In iOS, a `ViewController` represents a portion of user interface, most
commonly used for a screen or section. These are composed together to build
complex user interfaces, and help scale your application's UI. In Flutter, this
job falls to Widgets. As mentioned in the Navigation
section, screens in Flutter are represented by Widgets since "everything is a
widget!" Use a `Navigator` to move between different `Route`s
that represent different screens or pages,
or maybe different states or renderings of the same data.

在 iOS 里，一个 `ViewController` 是用户界面的一部分，通常是作为屏幕或者其中的一部分来使用。
这些组合在一起构成了复杂的用户界面，并以此对应用的 UI 做不断的扩充。
在 Flutter 中，这一任务又落到了 Widget 这里。就像在导航那一章提到的，
Flutter 中的屏幕也是使用 Widgets 表示的，因为“万物皆 widget！”。使用 `Naivgator` 在不同的 
`Route` 之间切换，而不同的路由则代表了不同的屏幕或页面，或是不同的状态，也可能是渲染相同的数据。

### How do I listen to iOS lifecycle events?

### 如何监听 iOS 中的生命周期？

In iOS, you can override methods to the `ViewController` to capture lifecycle
methods for the view itself, or register lifecycle callbacks in the
`AppDelegate`. In Flutter you have neither concept, but you can instead listen
to lifecycle events by hooking into the `WidgetsBinding` observer and
listening to the `didChangeAppLifecycleState()` change event.

在 iOS 里，可以重写 `ViewController` 的方法来捕获自身的生命周期，或者在 `AppDelegate` 中注册生命
周期的回调。Flutter 中则没有这两个概念，但是你可以通过在 `WidgetsBinding` 的 observer 中挂钩子，也可以
通过监听 `didChangeAppLifecycleState()` 事件，来实现相应的功能。

The observable lifecycle events are:

可监听的生命周期事件有：

**`inactive`** 
<br> The application is in an inactive state and is not receiving
user input. This event only works on iOS, as there is no equivalent event on
Android.
  
**`inactive`** 
<br> 应用当前处于不活跃状态，不接收用户输入事件。
  这个事件只在 iOS 上有效，Android 中没有类似的状态。
  
**`paused`** 
<br> The application is not currently visible to
the user, is not responding to user input, but is running in the background.

**`paused`** 
<br> 应用当前处于用户不可见状态，不接收用户输入事件，但仍在后台运行。
  
**`resumed`** 
<br> The application is visible and responding to user input.
  
**`resumed`** 
<br> 应用可见，也响应用户输入。
  
**`suspending`** 
<br> The application is suspended momentarily. The iOS platform
has no equivalent event.

**`suspending`**
<br> 应用被挂起，在 iOS 平台没有这一事件。

For more details on the meaning of these states, see
[`AppLifecycleStatus` documentation][].

关于这些状态含义的更多细节，请参看 [AppLifecycleStatus 文档][`AppLifecycleStatus` documentation]。

## Layouts

## 布局

### What is the equivalent of UITableView or UICollectionView in Flutter?

### `UITableView` 和 `UICollectionView` 相当于 Flutter 中的什么？

In iOS, you might show a list in either a `UITableView` or a
`UICollectionView`. In Flutter, you have a similar implementation using a
`ListView`.
In iOS, these views have delegate methods for deciding the number of rows, the
cell for each index path, and the size of the cells.

在 iOS 里，你可能使用 `UITableView` 或者 `UICollectionView` 来展示一个列表。而在 Flutter 里，
你可以使用 `ListView` 来达到类似的实现。
在 iOS 中，你通过 delegate 方法来确定显示的行数，相应位置的 cell，以及 cell 的尺寸。

Due to Flutter’s immutable widget pattern, you pass a list of widgets to your
`ListView`, and Flutter takes care of making sure that scrolling is fast
and smooth.

由于 Flutter 中 widget 的不可变特性，你需要向 `ListView` 传递一个 widget 列表，Flutter 会确保滚动
快速而流畅。

<!-- skip -->
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(Padding(padding: EdgeInsets.all(10.0), child: Text("Row $i")));
    }
    return widgets;
  }
}
```

### How do I know which list item is clicked?

### 如何确定列表中被点击的元素？

In iOS, you implement the delegate method, `tableView:didSelectRowAtIndexPath:`.
In Flutter, use the touch handling provided by the passed-in widgets.

在 iOS 里，可以通过 `tableView:didSelectRowAtIndexPath:` 代理方法来实现。
而在 Flutter 里，需要通过 widget 传递进来的 touch 响应处理来实现。

<!-- skip -->
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(GestureDetector(
        child: Padding(
          padding: EdgeInsets.all(10.0),
          child: Text("Row $i"),
        ),
        onTap: () {
          print('row tapped');
        },
      ));
    }
    return widgets;
  }
}
```

### How do I dynamically update a ListView?

### 如何动态更新 `ListView`？

In iOS, you update the data for the list view, and notify the table or
collection view using the `reloadData` method.

在 iOS 里，可以更新列表的数据，然后通过调用 `reloadData` 方法来通知 tableView 或者 collectionView。

In Flutter, if you update the list of widgets inside a `setState()`,
you quickly see that your data doesn't change visually.
This is because when `setState()` is called,
the Flutter rendering engine looks at the widget tree
to see if anything has changed. When it gets to your `ListView`,
it performs an `==` check, and determines that the two `ListView`s
are the same. Nothing has changed, so no update is required.

在 Flutter 里，如果你在 `setState()` 中更新了 widget 列表，你会发现展示的数据并不会立刻更新。
这是因为当 `setState()` 被调用时，Flutter 的渲染引擎回去检索 widget 树是否有改变。当它获取到 `ListView`，
会进行 `==` 判断，然后发现两个 `ListView` 是相等的。没发现有改变，所以也就不会进行更新。

For a simple way to update your `ListView`, create a new `List` inside of
`setState()`, and copy the data from the old list to the new list.
While this approach is simple,
it is not recommended for large data sets, as shown in the next example.

一个更新 `ListView` 的简单方法就是，在 `setState()` 创建一个新的 `List`，然后拷贝旧列表中的
所有数据到新列表。这样虽然简单，但是像下面示例一样数据量很大时，并不推荐这样做。

<!-- skip -->
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView(children: widgets),
    );
  }

  Widget getRow(int i) {
    return GestureDetector(
      child: Padding(
        padding: EdgeInsets.all(10.0),
        child: Text("Row $i"),
      ),
      onTap: () {
        setState(() {
          widgets = List.from(widgets);
          widgets.add(getRow(widgets.length + 1));
          print('row $i');
        });
      },
    );
  }
}
```

The recommended, efficient,
and effective way to build a list uses a `ListView.Builder`.
This method is great when you have a dynamic
list or a list with very large amounts of data.

一个推荐的、高效且有效的方法就是使用 `ListView.Builder` 来构建列表。当你的数据量很大，
且需要构建动态列表时，这个方法会非常好用。

<!-- skip -->
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView.builder(
        itemCount: widgets.length,
        itemBuilder: (BuildContext context, int position) {
          return getRow(position);
        },
      ),
    );
  }

  Widget getRow(int i) {
    return GestureDetector(
      child: Padding(
        padding: EdgeInsets.all(10.0),
        child: Text("Row $i"),
      ),
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length + 1));
          print('row $i');
        });
      },
    );
  }
}
```

Instead of creating a "ListView", create a `ListView.builder` that
takes two key parameters: the initial length of the list,
and an `ItemBuilder` function.

和创建 `ListView` 不同，创建 `ListView.Builder` 需要两个关键参数：初始化列表长度和 `ItemBuilder` 函数。

The `ItemBuilder` function is similar to the `cellForItemAt` delegate method
in an iOS table or collection view, as it takes a position, and returns the
cell you want rendered at that position.

`ItemBuilder` 函数和 iOS 里 tableView 和 collectionView 的 `cellForItemAt` 方法类似，
它接收位置参数，然后返回想要在该位置渲染的 cell。

Finally, but most importantly, notice that the `onTap()` function
doesn't recreate the list anymore, but instead `.add`s to it.

最后，也是最重要的，注意 `onTap()` 方法并没有重新创建列表，而是使用 `.add` 方法进行添加。

### What is the equivalent of a ScrollView in Flutter?

### `ScrollView` 相当于 Flutter 中的什么？

In iOS, you wrap your views in a `ScrollView` that allows a user to scroll
your content if needed.

在 iOS 里，把视图放在 `ScrollView` 里来允许用户在需要时滚动内容。


In Flutter the easiest way to do this is using the `ListView` widget. This
acts as both a `ScrollView` and an iOS `TableView`, as you can layout widgets
in a vertical format.

在 Flutter 中，最简单的办法就是使用 `ListView` widget。它和 iOS 中的 `ScrollView` 以
及 `TableView` 表现一致，也可以给它的子 widget 做垂直排版。

<!-- skip -->
```dart
@override
Widget build(BuildContext context) {
  return ListView(
    children: <Widget>[
      Text('Row One'),
      Text('Row Two'),
      Text('Row Three'),
      Text('Row Four'),
    ],
  );
}
```

For more detailed docs on how to lay out widgets in Flutter,
see the [layout tutorial][].

关于 Flutter 中布局的更多细节，请参看 [布局教程][layout tutorial]。

## Gesture detection and touch event handling

## 手势检测与 touch 事件处理

### How do I add a click listener to a widget in Flutter?

### 如何给 Flutter 的 widget 添加点击事件？

In iOS, you attach a `GestureRecognizer` to a view to handle
click events. In Flutter, there are two ways of adding touch listeners:

在 iOS 里，通过把 `GestureRecognizer` 绑定给 UIView 来处理点击事件。在 Flutter 中，
有两种方法来添加事件监听者：

 1. If the widget supports event detection, pass a function to it,
    and handle the event in the function. For example, the
    `RaisedButton` widget has an `onPressed` parameter:
    
    如果 widget 本身支持事件检测，则直接传递处理函数给它。例如，`RaisedButton` 拥有
    一个  `onPressed` 参数：

    <!-- skip -->
    ```dart
    @override
    Widget build(BuildContext context) {
      return RaisedButton(
        onPressed: () {
          print("click");
        },
        child: Text("Button"),
      );
    }
    ```

 2. If the Widget doesn't support event detection, wrap the
    widget in a GestureDetector and pass a function to the `onTap` parameter.
    
    如果 widget 本身不支持事件检测，那么把它封装到一个 GestureDetector 中，并
    给它的 `onTap` 参数传递一个函数：

    <!-- skip -->
    ```dart
    class SampleApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: GestureDetector(
              child: FlutterLogo(
                size: 200.0,
              ),
              onTap: () {
                print("tap");
              },
            ),
          ),
        );
      }
    }
    ```

### How do I handle other gestures on widgets?

### 如何处理 widget 的其他手势？

Using `GestureDetector` you can listen to a wide range of gestures such as:

你可以使用 `GestureDetector` 来监听更多的手势，例如：

* **Tapping**
  
  **单击事件**

  **`onTapDown`**
  : A pointer that might cause a tap has contacted the screen at a
    particular location.
    
    `onTapDown` —— 用户在特定区域发生点触屏幕的一个即时操作。
    
  **`onTapUp`**
  : A pointer that triggers a tap has stopped contacting the
    screen at a particular location.

    `onTapUp` —— 用户在特定区域发生触摸抬起的一个即时操作。
    
  **`onTap`**
  : A tap has occurred.

    `onTap` —— 从点触屏幕之后到触摸抬起之间的单击操作。
    
  **`onTapCancel`**
  : The pointer that previously triggered the `onTapDown` won't
    cause a tap.
    
    `onTapCancel` —— 用户在之前触发了 `onTapDown` 时间，但未触发 tap 事件。

* **Double tapping**
  
  双击事件

  **`onDoubleTap`**
  : The user tapped the screen at the same location twice in
    quick succession.
    
    `onDoubleTap` —— 用户在同一位置发生快速点击屏幕两次的操作。

* **Long pressing**

  长按事件

  **`onLongPress`**
  : A pointer has remained in contact with the screen at the same
    location for a long period of time.
    
    `onLongPress` —— 用户在同一位置长时间触摸屏幕的操作。

* **Vertical dragging**

  垂直拖动事件

  **`onVerticalDragStart`**
  : A pointer has contacted the screen and might begin to
    move vertically.
    
    `onVerticalDragStart` —— 用户手指接触屏幕，并且将要进行垂直移动事件。
  
  **`onVerticalDragUpdate`**
  : A pointer in contact with the screen
    has moved further in the vertical direction.
    
    `onVerticalDragUpdate` —— 用户手指接触屏幕，已经开始垂直移动，且会持续进行移动。
    
  **`onVerticalDragEnd`**
  : A pointer that was previously in contact with the
    screen and moving vertically is no longer in contact with the screen and was
    moving at a specific velocity when it stopped contacting the screen.
    
    `onVerticalDragEnd` —— 用户之前手指接触了屏幕并发生了垂直移动操作，并且停止接触前还在以一定的速率移动。

  **`onVerticalDragEnd`**
  : A pointer that was previously in contact with the
    screen and moving vertically is no longer in contact
    with the screen and was moving at a specific velocity
    when it stopped contacting the screen.

* **Horizontal dragging**

  水平拖动事件

  **`onHorizontalDragStart`**
  : A pointer has contacted the screen and might begin
    to move horizontally.
    
    `onHorizontalDragStart` —— 用户手指接触屏幕，并且将要进行水平移动事件。
    
  **`onHorizontalDragUpdate`**
  : A pointer in contact with the screen
    has moved further in the horizontal direction.
    
    `onHorizontalDragUpdate` —— 用户手指接触屏幕，已经开始水平移动，且会持续进行移动。
    
  **`onHorizontalDragEnd`**
  : A pointer that was previously in contact with the
    screen and moving horizontally is no longer in contact with the screen.
    
    `onHorizontalDragEnd` —— 用户之前手指接触了屏幕并发生了水平移动操作，并且停止接触前还在以一定的速率移动。

下面的示例展示了 `GestureDetector` 是如何实现双击时旋转 Flutter 的 logo 的：

<!-- skip -->
```dart
AnimationController controller;
CurvedAnimation curve;

@override
void initState() {
  controller = AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
  curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: GestureDetector(
          child: RotationTransition(
            turns: curve,
            child: FlutterLogo(
              size: 200.0,
            )),
          onDoubleTap: () {
            if (controller.isCompleted) {
              controller.reverse();
            } else {
              controller.forward();
            }
          },
        ),
      ),
    );
  }
}
```

## Theming and text

## 主题和文字

### How do I theme an app?

### 如何设置应用主题？

Out of the box, Flutter comes with a beautiful implementation of Material Design,
which takes care of a lot of styling and theming needs that you would typically do.

Flutter 实现了一套漂亮的 Material Design 组件，而且开箱可用，它提供了许多常用的样式和主题。

To take full advantage of Material Components in your app, declare a top-level
widget, MaterialApp, as the entry point to your application. MaterialApp is a convenience
widget that wraps a number of widgets that are commonly required for applications
implementing Material Design. It builds upon a WidgetsApp by adding Material
specific functionality.

为了充分发挥应用中 Material Components 的优势，声明一个顶级的 widget，MaterialApp，来作为你的应用
入口。MaterialApp 是一个封装了大量常用 Material Design 组件的 widget。它基于 WidgetsApp 添加了 Material 的
相关功能。

But Flutter is flexible and expressive enough to implement any design language.
On iOS, you can use the
[Cupertino library][]
to produce an interface that adheres to the [Human Interface
Guidelines][].
For the full set of these widgets, see the
[Cupertino widgets gallery][].

但是 Flutter 有足够的灵活性和表现力来实现任何设计语言。在 iOS 上，可以使
用 [Cupertino library][] 来
制作遵循 [Human Interface
Guidelines][] 的
界面。关于这些 widget 的全部集合，可以参看 [Cupertino widgets gallery][]。

You can also use a `WidgetApp` as your app widget, which provides some of the
same functionality, but is not as rich as `MaterialApp`.

也可以使用 `WidgetApp` 来做为应用入口，它提供了一部分类似的功能接口，但是不如 `MaterialApp` 强大。

To customize the colors and styles of any child components, pass a
`ThemeData` object to the `MaterialApp` widget. For example, in the code below,
the primary swatch is set to blue and text selection color is red.

定义所有子组件颜色和样式，可以直接传递 `ThemeData` 对象给 `MaterialApp` widget。
例如在下面的代码中，primary swatch 被设置为蓝色，而文本选中后的颜色被设置为红色。

```
class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        textSelectionColor: Colors.red
      ),
      home: SampleAppPage(),
    );
  }
}
```

### How do I set custom fonts on my Text widgets?

### 如何给 `Text` widget 设置自定义字体？

In iOS, you import any `ttf` font files into your project and create a
reference in the `info.plist` file. In Flutter, place the font file
in a folder and reference it in the `pubspec.yaml` file,
similar to how you import images.

在 iOS 里，可以在项目中引入任何的 `ttf` 字体文件，并在 `info.plist` 文件中声明并进行引用。
在 Flutter 里，把字体放到一个文件夹中，然后在 `pubspec.yaml` 文件中引用它，就和引用图片一样。

```yaml
fonts:
   - family: MyCustomFont
     fonts:
       - asset: fonts/MyCustomFont.ttf
       - style: italic
```

Then assign the font to your `Text` widget:

然后在 `Text` widget 中指定字体：

<!-- skip -->
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text("Sample App"),
    ),
    body: Center(
      child: Text(
        'This is a custom font text',
        style: TextStyle(fontFamily: 'MyCustomFont'),
      ),
    ),
  );
}
```

### How do I style my Text widgets?

### 如何设置 `Text` widget 的样式？

Along with fonts, you can customize other styling elements on a `Text` widget.
The style parameter of a `Text` widget takes a `TextStyle` object, where you can
customize many parameters, such as:

除了字体以外，你也可以自定义 `Text` widget 的其他样式。`Text` widget 接收一个 `TextStyle` 对象
的参数，可以指定很多参数，例如：

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

### How do forms work in Flutter? How do I retrieve user input?

### Flutter 中如何使用表单？如何获取到用户的输入？

Given how Flutter uses immutable widgets with a separate state, you might be
wondering how user input fits into the picture. On iOS, you usually
query the widgets for their current values when it's time to submit the
user input, or action on it. How does that work in Flutter?

我们知道 Flutter 使用的是不可变而且状态分离的 widget，你可能会好奇这种情况下如何处理用户的输入。
在 iOS 上，一般会在提交数据时查询当前组件的数值或动作。那么在 Flutter 中会怎么样呢？

In practice forms are handled, like everything in Flutter, by specialized
widgets. If you have a `TextField` or a `TextFormField`, you can supply a
[`TextEditingController`][]
to retrieve user input:

和 Flutter 的其他部分一样，表单处理要通过特定的 widget 来实现。如果你有一个 `TextField` 或者 `TextFormField`，
你可以通过 [`TextEditingController`][] 来
获取用户的输入：

<!-- skip -->
```dart
class _MyFormState extends State<MyForm> {
  // Create a text controller and use it to retrieve the current value.
  // of the TextField!
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when disposing of the Widget.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Retrieve Text Input'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: TextField(
          controller: myController,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog with the
        // text the user has typed into our text field.
        onPressed: () {
          return showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                // Retrieve the text the user has typed in using our
                // TextEditingController
                content: Text(myController.text),
              );
            },
          );
        },
        tooltip: 'Show me the value!',
        child: Icon(Icons.text_fields),
      ),
    );
  }
}
```

You can find more information and the full code listing in
[Retrieve the value of a text field][],
from the [Flutter cookbook][].

你在 [Flutter Cookbook][] 的 [获取文本框的输入值][Retrieve the value of a text field] 
教程中可以找到更多的相关内容以及详细的代码列表。

### What is the equivalent of a placeholder in a text field?

### TextField 中的 placeholder 相当于什么？

In Flutter you can easily show a "hint" or a placeholder text for your field by
adding an `InputDecoration` object to the decoration constructor parameter for
the `Text` widget:

在 Flutter 里，通过向 `Text` widget 传递一个 `InputDecoration` 对象，你可以轻易的显示
文本框的提示信息，或是 placeholder。

<!-- skip -->
```dart
body: Center(
  child: TextField(
    decoration: InputDecoration(hintText: "This is a hint"),
  ),
)
```

### How do I show validation errors?

### 如何展示验证错误信息？

Just as you would with a "hint", pass an `InputDecoration` object
to the decoration constructor for the `Text` widget.

就和显示提示信息一样，你可以通过向 `Text` widget 
传递一个 `InputDecoration` 来实现。

However, you don't want to start off by showing an error.
Instead, when the user has entered invalid data,
update the state, and pass a new `InputDecoration` object.

然而，你并不想在一开始就显示错误信息。相反，在用户输入非法数据后，
应该更新状态，并传递一个新的 `InputDecoration` 对象。

<!-- skip -->
```dart
class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String _errorText;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: Center(
        child: TextField(
          onSubmitted: (String text) {
            setState(() {
              if (!isEmail(text)) {
                _errorText = 'Error: This is not an email';
              } else {
                _errorText = null;
              }
            });
          },
          decoration: InputDecoration(hintText: "This is a hint", errorText: _getErrorText()),
        ),
      ),
    );
  }

  _getErrorText() {
    return _errorText;
  }

  bool isEmail(String emailString) {
    String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = RegExp(emailRegexp);

    return regExp.hasMatch(emailString);
  }
}
```

## Interacting with hardware, third party services and the platform

## 和硬件、第三方服务以及系统平台交互

### How do I interact with the platform, and with platform native code?

### 如何与系统平台以及平台原生代码进行交互？

Flutter doesn't run code directly on the underlying platform; rather, the Dart code
that makes up a Flutter app is run natively on the device, "sidestepping" the SDK
provided by the platform. That means, for example, when you perform a network request
in Dart, it runs directly in the Dart context. You don't use the Android or iOS
APIs you normally take advantage of when writing native apps. Your Flutter
app is still hosted in a native app's `ViewController` as a view, but you don't
have direct access to the `ViewController` itself, or the native framework.

Flutter 并不直接在平台上运行代码；而是以 Dart 代码的方式原生运行于设备之上，
这算是绕过了平台的 SDK 的限制。这意味着，例如，你用 Dart 发起了一个网络请求，
它会直接在 Dart 的上下文中运行。
你不需要调用写 iOS 或者 Android 原生应用时常用的 API 接口。
你的 Flutter 应用仍旧被原生平台的 `ViewController` 当做一个 view 来管理，
但是你不能够直接访问 `ViewController` 自身或是对应的原生框架。

This doesn't mean Flutter apps cannot interact with those native APIs, or with any
native code you have. Flutter provides [platform channels][],
that communicate and exchange data with the `ViewController` that
hosts your Flutter view. Platform channels are essentially an asynchronous messaging
mechanism that bridge the Dart code with the host `ViewController` and
the iOS framework it runs on. You can use platform channels to execute a method on
the native side, or to retrieve some data from the device's sensors, for example.

这并不意味着 Flutter 应用不能够和原生 API，或是原生代码进行交互。
Flutter 提供了用来和宿主 `ViewController` 通信和交换数据的 [platform channels][]。
platform channels 本质上是一个桥接了 Dart 代码与
宿主 `ViewController` 和 iOS 框架的异步通信模型。
你可以通过 platform channels 来执行原生代码的方法，
或者获取设备的传感器信息等数据。

In addition to directly using platform channels, you can use a variety of pre-made
[plugins][] that encapsulate
the native and
Dart code for a specific goal. For example, you can use a plugin to access
the camera roll and the device camera directly from Flutter, without having to
write your own integration. Plugins are found on the
[pub.dev][] site,
Dart and Flutter's open source package repository. Some packages might
support native integrations on iOS, or Android, or both.

除了直接使用 platform channels 之外，也可以使用一系列包含了原生代码和 Dart代码，
实现了特定功能的现有 [插件][plugins]。例如，你在 Flutter 中
可以直接使用插件来访问相册或是设备摄像头，而不需要自己重新集成。
[pub.dev][] 是一个 Dart 和 Flutter 的开源包仓库，你可以在这里找到需要的插件。
有些包可能支持集成 iOS 或 Android，或两者皆有。

If you can't find a plugin on Pub that fits your needs, you can
[write your own][]
and [publish it on Pub][].

如果你在 Pub 找不到自己需要的包，你可以自己写一个，
相关信息可以查阅 [Flutter Packages 的开发和提交][write your own]，
并且你可以将其 [发布到 Pub 上][publish it on Pub]。

### How do I access the GPS sensor?

### 如何访问 GPS 传感器？

Use the [`geolocator`][] community plugin.

使用 [`geolocator`]({{site.pub-pkg}}/geolocator) 插件，这一插件由社区提供。

### How do I access the camera?

### 如何访问相机？

The [`image_picker`][] plugin is popular
for accessing the camera.

[`image_picker`]({{site.pub-pkg}}/image_picker) 是常用的访问相机的插件。

### How do I log in with Facebook?

### 如何使用 Facebook 登录？

To log in with Facebook, use the
[`flutter_facebook_login`][] community plugin.

登录 Facebook 可以使用 [`flutter_facebook_login`][] 插件。

### How do I use Firebase features?

### 如何集成 Firebase 的功能？

Most Firebase functions are covered by
[first party plugins][].
These plugins are first-party integrations, maintained by the Flutter team:

大多数的 Firebase 特性都在 [官方维护的插件][first party plugins] 中实现了。
这些插件由 Flutter 官方团队维护：

 * [`firebase_admob`][] for Firebase AdMob

   搭配 [`firebase_admob`][] 插件来使用 Firebase AdMob

 * [`firebase_analytics`][] for Firebase Analytics

   搭配 [`firebase_analytics`][] 插件来使用 Firebase Analytics

 * [`firebase_auth`][] for Firebase Auth
   
   搭配 [`firebase_auth`][] 插件来使用 Firebase Auth

 * [`firebase_core`][] for Firebase's Core package
   
   搭配 [`firebase_core`][] 插件来使用 Firebase 核心库

 * [`firebase_database`][] for Firebase RTDB
   
   搭配 [`firebase_database`][] 插件来使用 Firebase RTDB

 * [`firebase_storage`][] for Firebase Cloud Storage

   搭配 [`firebase_storage`][] 插件来使用 Firebase Cloud Storage

 * [`firebase_messaging`][] for Firebase Messaging (FCM)

   搭配 [`firebase_messaging`][] 插件来使用 Firebase Messaging (FCM)

 * [`cloud_firestore`][] for Firebase Cloud Firestore
   
   搭配 [`cloud_firestore`][] 插件来使用 Firebase Cloud Firestore


You can also find some third-party Firebase plugins on pub.dev that
cover areas not directly covered by the first-party plugins.

在 pub.dev 上你也可以找到一些第三方的 Firebase 插件，
主要实现了官方插件没有直接实现的功能。

### How do I build my own custom native integrations?

### 如何构建自己的插件？

If there is platform-specific functionality that Flutter or its community
Plugins are missing, you can build your own following the
[developing packages and plugins][] page.

如果有一些 Flutter 和遗漏的平台特性，可以
根据 [developing packages and plugins][] 构建
自己的插件。

Flutter's plugin architecture, in a nutshell, is much like using an Event bus in
Android: you fire off a message and let the receiver process and emit a result
back to you. In this case, the receiver is code running on the native side
on Android or iOS.

Flutter 的插件结构，简单来说，更像是 Android 中的 Event bus：
你发送一个消息，并让接受者处理并反馈结果给你。
这种情况下，接受者就是在 iOS 或 Android 的原生代码。

## Databases and local storage

## 数据库和本地存储

### How do I access UserDefault in Flutter?

### Flutter 中如何访问 UserDefaults？

In iOS, you can store a collection of key-value pairs using a property list,
known as the `UserDefaults`.

在 iOS 里，可以使用属性列表存储一个键值对的集合，也就是我们所说的 `UserDefaults`。

In Flutter, access equivalent functionality using the
[Shared Preferences plugin][].
This plugin wraps the functionality of both
`UserDefaults` and the Android equivalent, `SharedPreferences`.

在 Flutter 里，可以使用 [Shared Preferences 插件][Shared Preferences plugin]
来实现相同的功能。这个插件封装了 `UserDefaults` 以及 Android 里类似的 `SharedPreferences`。

### What is the equivalent to CoreData in Flutter?

### CoreData 相当于 Flutter 中的什么？

In iOS, you can use CoreData to store structured data. This is simply a
layer on top of an SQL database, making it easier to make queries that
relate to your models.

在 iOS 里，你可以使用 CoreData 来存储结构化的数据。
这是一个基于 SQL 数据库的上层封装，可以使关联模型的查询变得更加简单。

In Flutter, access this functionality using the
[SQFlite][] plugin.

在 Flutter 里，可以使用 [SQFlite][] 插件来实现这个功能。

## Debugging

### What tools can I use to debug my app in Flutter?

### 应该使用什么工具调试我的 Flutter 应用？

Use the [DevTools][] suite for debugging Flutter or Dart apps.

请使用 [开发者工具][DevTools] debug 你的 Flutter 和 Dart 应用。

DevTools includes support for profiling, examining the heap,
inspecting the widget tree, logging diagnostics, debugging,
observing executed lines of code, debugging memory leaks and memory
fragmentation. For more information, see the
[DevTools][] documentation.

开发者工具包含了 profiling 构建、检查堆栈、检视 widget 树、诊断信息记录、调试、
执行代码行观察、调试内存泄漏和内存碎片等。
有关更多信息，请参阅 [开发者工具][DevTools] 文档。

## Notifications

## 通知

### How do I set up push notifications?

### 如何设置推送通知？

In iOS, you need to register your app on the developer portal to allow
push notifications.

在 iOS 里，你需要向开发者中心注册来允许推送通知。

In Flutter, access this functionality using the
`firebase_messaging` plugin.

在 Flutter 里，使用 `firebase_messaging` 插件来实现这个功能。

For more information on using the Firebase Cloud Messaging API, see the
[`firebase_messaging`][]
plugin documentation.

关于 Firebase Cloud Messaging API 的更多信息，可以
查看 [`firebase_messaging`][] 插件文档。

[Add Flutter to existing app]: /docs/development/add-to-app
[Adding Assets and Images in Flutter]: /docs/development/ui/assets-and-images
[Animation & Motion widgets]: /docs/development/ui/widgets/animation
[Animations overview]: /docs/development/ui/animations
[Animations tutorial]: /docs/development/ui/animations/tutorial
[Apple's iOS design language]: https://developer.apple.com/design/resources
[`AppLifecycleStatus` documentation]: {{site.api}}/flutter/dart-ui/AppLifecycleState-class.html
[arb]: {{site.github}}/googlei18n/app-resource-bundle
[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html
[`cloud_firestore`]: {{site.pub-pkg}}/cloud_firestore
[composing]: /docs/resources/architectural-overview#composition
[Cupertino library]: {{site.api}}/flutter/cupertino/cupertino-library.html
[Cupertino widgets]: /docs/development/ui/widgets/cupertino
[developing packages and plugins]: /docs/development/packages-and-plugins/developing-packages
[`devicePixelRatio`]: {{site.api}}/flutter/dart-ui/Window/devicePixelRatio.html
[DevTools]: /docs/development/tools/devtools
[existing plugin]: ({{site.pub}}/flutter
[`firebase_admob`]: {{site.pub-pkg}}/firebase_admob
[`firebase_analytics`]: {{site.pub-pkg}}/firebase_analytics
[`firebase_auth`]: {{site.pub-pkg}}/firebase_auth
[`firebase_core`]: {{site.pub-pkg}}/firebase_core
[`firebase_database`]: {{site.pub-pkg}}/firebase_database
[`firebase_messaging`]: {{site.pub-pkg}}/firebase_messaging
[`firebase_storage`]: {{site.pub-pkg}}/firebase_storage
[first party plugins]: {{site.pub}}/flutter/packages?q=firebase
[`flutter_facebook_login`]: {{site.pub-pkg}}/flutter_facebook_login
[Flutter cookbook]: /docs/cookbook
[Flutter Youtube channel]: https://www.youtube.com/flutterdev
[`geolocator`]: {{site.pub-pkg}}/geolocator
[`http` package]: {{site.pub-pkg}}/http
[Human Interface Guidelines]: https://developer.apple.com/ios/human-interface-guidelines/overview/themes/
[`image_picker`]: {{site.pub-pkg}}/image_picker
[internationalization guide]: /docs/development/accessibility-and-localization/internationalization
[`intl`]: {{site.pub-pkg}}/intl
[`intl_translation`]: {{site.pub-pkg}}/intl_translation
[Introduction to declarative UI]: /docs/get-started/flutter-for/declarative
[layout tutorial]: /docs/development/ui/widgets/layout
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[Material Components]: {{site.material}}/develop/flutter/
[Material Design guidelines]: {{site.material}}/design/
[optimized for all platforms]: {{site.material}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines
[Platform adaptations]: /docs/resources/platform-adaptations
[platform channel]: /docs/development/platform-integration/platform-channels
[plugins]: /docs/development/packages-and-plugins/using-packages
[pub.dev]: {{site.pub}}/flutter/packages
[publish it on pub.dev]: /docs/development/packages-and-plugins/developing-packages#publish
[Retrieve the value of a text field]: /docs/cookbook/forms/retrieve-input
[Shared Preferences plugin]: {{site.pub-pkg}}/shared_preferences
[SQFlite]: {{site.pub-pkg}}/sqflite
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[widget]: /docs/resources/architectural-overview#widgets
[widget catalog]: /docs/development/ui/widgets/layout
[`Window.locale`]: {{site.api}}/flutter/dart-ui/Window/locale.html
[write your own]: /docs/development/packages-and-plugins/developing-packages
