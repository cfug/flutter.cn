---
title: Flutter for Android developers
title: 给 Android 开发者的 Flutter 指南
description: Learn how to apply Android developer knowledge when building Flutter apps.
description: 学习如何把 Android 开发的经验应用到 Flutter 应用的开发中。
---

This document is meant for Android developers looking to apply their
existing Android knowledge to build mobile apps with Flutter. If you understand
the fundamentals of the Android framework then you can use this document as a
jump start to Flutter development.

这篇文档旨在帮助 Android 开发者利用既有的 Android 知识来通过 Flutter 开发移动应用。
如果你了解 Android 框架的基本知识，你就可以使用这篇文档作为 Flutter 开发的快速入门。

Your Android knowledge and skill set are highly valuable when building with
Flutter, because Flutter relies on the mobile operating system for numerous
capabilities and configurations. Flutter is a new way to build UIs for mobile,
but it has a plugin system to communicate with Android (and iOS) for non-UI
tasks. If you're an expert with Android, you don't have to relearn everything
to use Flutter.

你的 Android 知识和技能对于 Flutter 开发是非常有用的，因为 Flutter 依赖于 Android 操作
系统的多种功能和配置。Flutter 是一种全新的构建移动界面的方式，但是它有一套和 Android（以及 iOS）
进行非 UI 任务通信的插件系统。如果你是一名 Android 专家，你就不必重新学习所有知识才能使用 Flutter。

This document can be used as a cookbook by jumping around and finding questions
that are most relevant to your needs.

这篇文档可以用作随时查阅以及答疑解惑的专题手册。

## Views

## 视图 (Views)

### What is the equivalent of a `View` in Flutter?

### `视图` 在 Flutter 中的对应概念是什么？

{{site.alert.secondary}}

How is react-style, or _declarative_, programming different than the
traditional imperative style?
For a comparison, see [Introduction to declarative
UI](/docs/get-started/flutter-for/declarative).

响应式或者声明式的编程和传统的命令式风格有什么不同呢？
作为对比，请查阅 [声明式 UI 介绍](/docs/get-started/flutter-for/declarative)。
{{site.alert.end}}

In Android, the `View` is the foundation of everything that shows up on the
screen. Buttons, toolbars, and inputs, everything is a View.
In Flutter, the rough equivalent to a `View` is a `Widget`.
Widgets don't map exactly to Android views, but while you're getting
acquainted with how Flutter works you can think of them as
"the way you declare and construct UI".

Android 中的 `View` 是显示在屏幕上的一切的基础。按钮、工具栏、输入框以及一切内容都是 `View`。
而 Flutter 中 `View` 的大致对应物是`Widget`。Widget 并非完全对应于 Android 中的 View，
但是在你熟悉 Flutter 的工作原理的过程中可以把它们看做“声明和构建 UI 的方式”。

However, these have a few differences to a `View`. To start, widgets have a
different lifespan: they are immutable and only exist until they need to be
changed. Whenever widgets or their state change, Flutter’s framework creates
a new tree of widget instances. In comparison, an Android view is drawn once
and does not redraw until `invalidate` is called.

然而，Widget 和 `View` 还是有一些差异。首先，Widget 有着不一样的生命周期：它们是不可变的，
一旦需要变化则生命周期终止。任何时候 Widget 或它们的状态变化时，Flutter 框架都会创建
一个新的 Widget 树的实例。对比来看，一个 Android View 只会绘制一次，除非调用 `invalidate` 
才会重绘。

Flutter’s widgets are lightweight, in part due to their immutability.
Because they aren't views themselves, and aren't directly drawing anything,
but rather are a description of the UI and its semantics that get "inflated"
into actual view objects under the hood.

Flutter 的 Widget 很轻量，部分原因在于它们的不可变性。因为它们本身既非视图，也不会直接绘制
任何内容，而是 UI 及其底层创建真正视图对象的语义的描述。

Flutter includes the [Material Components]({{site.material}}/develop/flutter)
library. These are widgets that implement the
[Material Design guidelines]({{site.material}}/design). Material Design is a
flexible design system [optimized for all
platforms]({{site.material}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines),
including iOS.

Flutter 支持 [Material Components]({{site.material}}/develop/flutter) 库。
它提供实现了 [Material Design 设计规范]({{site.material}}/design) 的 widgets。
Meterial Design 是一套 [为所有平台优化]({{site.material}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines) （包括 iOS）的灵活的设计系统。


But Flutter is flexible and expressive enough to implement any design language.
For example, on iOS, you can use the [Cupertino
widgets](/docs/development/ui/widgets/cupertino)
to produce an interface that looks like
[Apple's iOS design language](https://developer.apple.com/design/resources/).

Flutter 非常灵活、有表达能力，它可以实现任何设计语言。例如，在 iOS 平台上，你可以使用 
[Cupertino widgets](/docs/development/ui/widgets/cupertino) 创建 
[Apple 的 iOS 设计语言](https://developer.apple.com/design/resources/) 风格的界面。

### How do I update `Widget`s?

### 如何更新 `Widget`？

In Android, you update your views by directly mutating them. However,
in Flutter, `Widget`s are immutable and are not updated directly, instead
you have to work with the widget's state.

在 Android 中，你可以直接操作更新 View。然而在 Flutter 中，`Widget` 是不可变的，
无法被直接更新，你需要操作 Widget 的状态。

This is where the concept of Stateful and Stateless widgets comes from. A
`StatelessWidget` is just what it sounds like&mdash;a widget with no state
information.

这就是有状态 (Stateful) 和无状态 (Stateless) Widget 概念的来源。`StatelessWidget` 如其
字面意思&mdash;没有状态信息的 Widget。

`StatelessWidgets` are useful when the part of the user interface
you are describing does not depend on anything other than the configuration
information in the object.

`StatelessWidget` 用于你描述的用户界面的一部分不依赖于除了对象中的配置信息以外的任何东西的场景。

For example, in Android, this is similar to placing an `ImageView`
with your logo. The logo is not going to change during runtime, so
use a `StatelessWidget` in Flutter.

例如在 Android 中，这就像显示一个展示图标的 `ImageView`。这个图标在运行过程中不会改变，
所以在 Flutter 中就使用 `StatelessWidget`。

If you want to dynamically change the UI based on data received
after making an HTTP call or user interaction then you have to work
with `StatefulWidget` and tell the Flutter framework that the widget’s `State`
has been updated so it can update that widget.

如果你想要根据 HTTP 请求返回的数据或者用户的交互来动态地更新界面，那么你就必须使用 `StatefulWidget`，
并告诉 Flutter 框架 Widget 的`状态` (`State`) 更新了，以便 Flutter 可以更新这个 Widget。

The important thing to note here is at the core both stateless and stateful
widgets behave the same. They rebuild every frame, the difference is the
`StatefulWidget` has a `State` object that stores state data across frames
and restores it.

这里需要着重注意的是，无状态和有状态的 Widget 本质上是行为一致的。它们每一帧都会重建，不同之处
在于 `StatefulWidget` 有一个跨帧存储和恢复状态数据的 `State` 对象。

If you are in doubt, then always remember this rule: if a widget changes
(because of user interactions, for example) it’s stateful.
However, if a widget reacts to change, the containing parent widget can
still be stateless if it doesn't itself react to change.

如果你有疑问，那么记住这条规则：如果一个 Widget 会变化（例如由于用户交互），它是有状态的。
然而，如果一个 Widget 响应变化，它的父 Widget 只要本身不响应变化，就依然是无状态的。

The following example shows how to use a `StatelessWidget`. A common
`StatelessWidget` is the `Text` widget. If you look at the implementation of
the `Text` widget you'll find it subclasses `StatelessWidget`.

下面的例子展示了如何使用 `StatelessWidget`。`Text` Widget 是一个普通的 `StatelessWidget`。
如果你查看 `Text` Widget 的实现，你会发现它继承自 `StatelessWidget`。

{% prettify dart %}
Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
{% endprettify %}

As you can see, the `Text` Widget has no state information associated with it,
it renders what is passed in its constructors and nothing more.

如上所示，这个 `Text` Widget 没有相关联的状态信息，它只渲染传入构造器的信息，仅此而已。

But, what if you want to make "I Like Flutter" change dynamically, for
example when clicking a `FloatingActionButton`?

但是，假如你想要动态地改变 "I Like Flutter"，例如当你点击一个 `FloatingActionButton` 的时候，
该怎么办呢？

To achieve this, wrap the `Text` widget in a `StatefulWidget` and
update it when the user clicks the button.

为了实现这个效果，将 `Text` Widget 嵌入一个 `StatefulWidget` 中，并在用户点击按钮的时候更新它。

For example:

例如：

{% prettify dart %}
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
{% endprettify %}

### How do I lay out my widgets? Where is my XML layout file?

### 如何布局 Widget？我的 XML 布局文件在哪里？

In Android, you write layouts in XML, but in Flutter you write your layouts
with a widget tree.

在 Android 中，你通过 XML 文件定义布局，但是在 Flutter 中，你是通过一个 Widget 树来定义布局的。

The following example shows how to display a simple widget with padding:

以下示例展示了如何显示一个带有填充 (padding) 的简单 Widget：

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: Center(
        child: MaterialButton(
          onPressed: () {},
          child: Text('Hello'),
          padding: EdgeInsets.only(left: 10.0, right: 10.0),
        ),
      ),
    );
  }
{% endprettify %}

You can view the layouts that Flutter has to offer in the [widget
catalog](/docs/development/ui/widgets/layout).

你可以在 [widget 目录](/docs/development/ui/widgets/layout) 中查看 Flutter 提供
的布局。

### How do I add or remove a component from my layout?

### 如何在布局中添加或删除一个组件？

In Android, you call `addChild()` or `removeChild()` on a parent to dynamically
add or remove child views. In Flutter, because widgets are immutable there is
no direct equivalent to `addChild()`.
Instead, you can pass a function to the parent that returns a widget, and
control that child's creation with a boolean flag.

在 Android 中，你通过调用父 View 的 `addChild()` 或 `removeChild()` 方法动态地添加
或者删除子 View。在 Flutter 中，由于 Widget 是不可变的，所以没有 `addChild()` 的直接
对应的方法。不过，你可以给返回一个 Widget 的父 Widget 传入一个方法，并通过布尔标记值控制
子 Widget 的创建。

For example, here is how you can toggle between two widgets when you click on a
`FloatingActionButton`:

例如，下面就是你可以如何在点击一个 `FloatingActionButton` 的时候在两个 Widget 之间切换。

{% prettify dart %}
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
      return MaterialButton(onPressed: () {}, child: Text('Toggle Two'));
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
{% endprettify %}

### How do I animate a widget?

### Widget 如何实现动画？

In Android, you either create animations using XML, or call the `animate()`
method on a view. In Flutter, animate widgets using the animation
library by wrapping widgets inside an animated widget.

在 Android 中，你既可以通过 XML 文件定义动画，也可以调用 View 对象的 `animate()` 方法。
在 Flutter 里，则使用动画库，通过将 Widget 嵌入一个动画 Widget 的方式实现 Widget 的动画效果。

In Flutter, use an `AnimationController` which is an `Animation<double>`
that can pause, seek, stop and reverse the animation. It requires a `Ticker`
that signals when vsync happens, and produces a linear interpolation between
0 and 1 on each frame while it's running. You then create one or more
`Animation`s and attach them to the controller.

Flutter 通过 `Animation<double>` 的子类 `AnimationController` 来暂停、播放、停止以及逆向
播放动画。它需要一个 `Ticker` 在垂直同步 (vsync) 的时候发出信号，并且在运行的时候创建一个介于 
0 和 1 之间的线性插值。然后你就可以创建一个或多个 `Animation`，并将它们绑定到控制器上。

For example, you might use `CurvedAnimation` to implement an animation
along an interpolated curve. In this sense, the controller
is the "master" source of the animation progress and the `CurvedAnimation`
computes the curve that replaces the controller's default linear motion.
Like widgets, animations in Flutter work with composition.

例如，你可以使用 `CurvedAnimation` 来实现一个曲线插值的动画。在这种情况下，控制器决定了动画
进度，`CurvedAnimation` 计算用于替换控制器默认线性动画的曲线值。和 Widget 一样，Flutter 中
的动画效果也可以组合使用。

When building the widget tree you assign the `Animation` to an animated
property of a widget, such as the opacity of a `FadeTransition`, and tell the
controller to start the animation.

在构建 Widget 树的时候，你需要将 `Animation` 对象赋值给某个 Widget 的动画属性，例如
`FadeTransition` 的不透明度属性，并让控制器开始动画。

The following example shows how to write a `FadeTransition` that fades the
widget into a logo when you press the `FloatingActionButton`:

下面的例子展示了如何实现一个点击 `FloatingActionButton` 的时候将一个 Widget 渐变为一个图标
的 `FadeTransition`：

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(FadeAppTest());
}

class FadeAppTest extends StatelessWidget {
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
    super.initState();
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
                  )))),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Fade',
        child: Icon(Icons.brush),
        onPressed: () {
          controller.forward();
        },
      ),
    );
  }
}
{% endprettify %}

For more information, see
[Animation & Motion widgets](/docs/development/ui/widgets/animation),
the [Animations tutorial](/docs/development/ui/animations/tutorial),
and the [Animations overview](/docs/development/ui/animations).

获取更多内容，请查看 [动画 Widget](/docs/development/ui/widgets/animation)，
[动画指南](/docs/development/ui/animations/tutorial)，以及 
[动画概览](/docs/development/ui/animations)。

### How do I use a `Canvas` to draw/paint?

### 如何使用 `Canvas` 进行绘制？

In Android, you would use the `Canvas` and `Drawable`s to draw images and shapes
to the screen. Flutter has a similar `Canvas` API as well, since it is based
on the same low-level rendering engine, Skia. As a result, painting to a
canvas in Flutter is a very familiar task for Android developers.

在 Android 中，你可以使用 `Canvas` 和 `Drawable` 将图片和形状绘制到屏幕上。Flutter 也有一个
类似于 `Canvas` 的 API，因为它基于相同的底层渲染引擎 Skia。因此，在 Flutter 中用画布 (canvas) 
进行绘制对于 Android 开发者来说是一件非常熟悉的工作。

Flutter has two classes that help you draw to the canvas: `CustomPaint`
and `CustomPainter`, the latter of which implements your algorithm to draw to
the canvas.

Flutter 有两个帮助你用画布 (canvas) 进行绘制的类：`CustomPaint` 和 `CustomPainter`，后者
可以实现自定义的绘制算法。

To learn how to implement a signature painter in Flutter, see Collin's answer on
[StackOverflow][].

如果想学习在 Flutter 中如何实现一个签名功能，可以查看 Collin 在 [StackOverflow][] 上的回答。

[StackOverflow]: {{site.so}}/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter

{% prettify dart %}
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: DemoApp()));

class DemoApp extends StatelessWidget {
  Widget build(BuildContext context) => Scaffold(body: Signature());
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
{% endprettify %}

### How do I build custom widgets?

### 如何创建自定义 Widget？

In Android, you typically subclass `View`, or use a pre-existing view,
to override and implement methods that achieve the desired behavior.

在 Android 中，一般通过继承 `View` 类，或者使用已有的视图类，再覆写或实现可以达到
特定效果的方法。

In Flutter, build a custom widget by
[composing](/docs/resources/technical-overview#everythings-a-widget)
smaller widgets (instead of extending them).
It is somewhat similar to implementing a custom
`ViewGroup` in Android, where all the building blocks are already existing, but
you provide a different behavior&mdash;for example, custom layout logic.

在 Flutter 中，通过 [组合](/docs/resources/technical-overview#everythings-a-widget) 
更小的 Widget 来创建自定义 Widget（而不是继承它们）。这和 Android 中实现一个自定义的 `ViewGroup` 
有些类似，所有的构建 UI 的模块代码都在手边，不过由你提供不同的行为&mdash;例如，自定义布局 (layout) 逻辑。

For example, how do you build a `CustomButton` that takes a label in
the constructor? Create a CustomButton that composes a `RaisedButton` with
a label, rather than by extending `RaisedButton`:

举例来说，你该如何创建一个在构造器接收标签参数的 `CustomButton`？你要组合 `RaisedButton` 和一个标签来创建
自定义按钮，而不是继承 `RaisedButton`：

{% prettify dart %}
class CustomButton extends StatelessWidget {
  final String label;

  CustomButton(this.label);

  @override
  Widget build(BuildContext context) {
    return RaisedButton(onPressed: () {}, child: Text(label));
  }
}
{% endprettify %}

Then use `CustomButton`, just as you'd use any other Flutter widget:

然后就像使用其它 Flutter Widget 一样使用 `CustomButton`：

{% prettify dart %}
@override
Widget build(BuildContext context) {
  return Center(
    child: CustomButton("Hello"),
  );
}
{% endprettify %}

## Intents

### What is the equivalent of an `Intent` in Flutter?

### `Intent` 在 Flutter 中的对应概念是什么？

In Android, there are two main use cases for `Intent`s: navigating between
Activities, and communicating with components. Flutter, on the other hand, does
not have the concept of intents, although you can still start intents
through native integrations
(using [a plugin]({{site.pub}}/packages/android_intent)).

在 Android 中，`Intent` 主要有两个使用场景：在 Activity 之前进行导航，以及组件间通信。
Flutter 却没有 intent 这样的概念，但是你依然可以通过原生集成 ([插件]({{site.pub}}/packages/android_intent)) 来启动 intent。

Flutter doesn't really have a direct equivalent to activities and fragments;
rather, in Flutter you navigate between screens, using a `Navigator` and
`Route`s, all within the same `Activity`.

Flutter 实际上并没有 Activity 和 Fragment 的对应概念。在 Flutter 中你需要使用 `Navigator` 和
 `Route` 在同一个 `Activity` 内的不同界面间进行跳转。

A `Route` is an abstraction for a “screen” or “page” of an app, and a
`Navigator` is a widget that manages routes. A route roughly maps to an
`Activity`, but it does not carry the same meaning. A navigator can push
and pop routes to move from screen to screen. Navigators work like a stack
on which you can `push()` new routes you want to navigate to, and from
which you can `pop()` routes when you want to "go back".

`Route` 是应用内屏幕和页面的抽象，`Navigator` 是管理路径 route 的工具。一个 route 对象大致对应于
一个 `Activity`，但是它的含义是不一样的。Navigator 可以通过对 route 进行压栈和弹栈操作实现页面
的跳转。Navigator 的工作原理和栈相似，你可以将想要跳转到的 route 压栈 (`push()`)，想要返回
的时候将 route 弹栈 (`pop()`)。

In Android, you declare your activities inside the app's `AndroidManifest.xml`.

在 Android 中，在应用的 `AndroidManifest.xml` 文件中声明 Activity。

In Flutter, you have a couple options to navigate between pages:

在 Flutter 中，你有多种不同的方式在页面间导航：

* Specify a `Map` of route names. (MaterialApp)
  
  定义一个 route 名字的 `Map`。(MaterialApp)

* Directly navigate to a route. (WidgetApp)
  
  直接导航到一个 route。(WidgetApp)

The following example builds a Map.

下面的例子创建了一个 Map。

{% prettify dart %}
 void main() {
  runApp(MaterialApp(
    home: MyAppHome(), // becomes the route named '/'
    routes: <String, WidgetBuilder> {
      '/a': (BuildContext context) => MyPage(title: 'page A'),
      '/b': (BuildContext context) => MyPage(title: 'page B'),
      '/c': (BuildContext context) => MyPage(title: 'page C'),
    },
  ));
}
{% endprettify %}

Navigate to a route by `push`ing its name to the `Navigator`.

通过将 route 名`压栈` (`push`) 到 `Navigator` 中来跳转到这个 route。

{% prettify dart %}
Navigator.of(context).pushNamed('/b');
{% endprettify %}

The other popular use-case for `Intent`s is to call external components such
as a Camera or File picker. For this, you would need to create a native platform
integration (or use an [existing plugin]({{site.pub}}/flutter/)).

`Intent` 的另一种常见的使用场景是调用外部的组件，例如相机或文件选择器。对于这种情况，你需要创建
一个原生平台集成（或者使用 [已有的插件]({{site.pub}}/flutter/))。

To learn how to build a native platform integration, see
[Developing Packages and Plugins](/docs/development/packages-and-plugins/developing-packages).

想要学习如何创建一个原生平台集成，请查看 
[开发包和插件](/docs/development/packages-and-plugins/developing-packages)。

### How do I handle incoming intents from external applications in Flutter?

### 在 Flutter 中应该如何处理从外部应用接收到的 intent？

Flutter can handle incoming intents from Android by directly talking to the
Android layer and requesting the data that was shared.

Flutter 可以通过直接和 Android 层通信并请求分享的数据来处理接收到的 Android intent。

The following example registers a text share intent filter on the native
activity that runs our Flutter code, so other apps can share text with
our Flutter app.

下面的例子中，运行 Flutter 代码的原生 Activity 注册了一个文本分享的 intent 过滤器，这样
其它应用就可以和 Flutter 应用分享文本了。

The basic flow implies that we first handle the shared text data on the
Android native side (in our `Activity`), and then wait until Flutter requests
for the data to provide it using a `MethodChannel`.

从以上流程可以得知，我们首先在 Android 原生层面（在我们的 `Activity` 中）处理分享的文本数据，
然后 Flutter 再通过使用 `MethodChannel` 获取这个数据。

First, register the intent filter for all intents in `AndroidManifest.xml`:

首先，在 `AndroidManifest.xml` 中注册 intent 过滤器：

{% prettify xml %}
<activity
  android:name=".MainActivity"
  android:launchMode="singleTop"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize">
  <!-- ... -->
  <intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="text/plain" />
  </intent-filter>
</activity>
{% endprettify %}

Then in `MainActivity`, handle the intent, extract the text that was
shared from the intent, and hold onto it. When Flutter is ready to process,
it requests the data using a platform channel, and it's sent
across from the native side:

接着在 `MainActivity` 中处理 intent，提取出其它 intent 分享的文本并保存。当 Flutter 准备好处理的时候，
它会使用一个平台通道请求数据，数据便会从原生端发送过来：

{% prettify java %}
package com.example.shared;

import android.content.Intent;
import android.os.Bundle;

import java.nio.ByteBuffer;

import io.flutter.app.FlutterActivity;
import io.flutter.plugin.common.ActivityLifecycleListener;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugins.GeneratedPluginRegistrant;

public class MainActivity extends FlutterActivity {

  private String sharedText;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GeneratedPluginRegistrant.registerWith(this);
    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    if (Intent.ACTION_SEND.equals(action) && type != null) {
      if ("text/plain".equals(type)) {
        handleSendText(intent); // Handle text being sent
      }
    }

    new MethodChannel(getFlutterView(), "app.channel.shared.data").setMethodCallHandler(
      new MethodCallHandler() {
        @Override
        public void onMethodCall(MethodCall call, MethodChannel.Result result) {
          if (call.method.contentEquals("getSharedText")) {
            result.success(sharedText);
            sharedText = null;
          }
        }
      });
  }

  void handleSendText(Intent intent) {
    sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
  }
}
{% endprettify %}

Finally, request the data from the Flutter side when the widget is rendered:

最后，当 Widget 渲染的时候，从 Flutter 这端请求数据：

{% prettify dart %}
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample Shared App Handler',
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
  static const platform = const MethodChannel('app.channel.shared.data');
  String dataShared = "No data";

  @override
  void initState() {
    super.initState();
    getSharedText();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: Text(dataShared)));
  }

  getSharedText() async {
    var sharedData = await platform.invokeMethod("getSharedText");
    if (sharedData != null) {
      setState(() {
        dataShared = sharedData;
      });
    }
  }
}
{% endprettify %}

### What is the equivalent of `startActivityForResult()`?

### `startActivityForResult()` 的对应方法是什么？

The `Navigator` class handles routing in Flutter and is used to get
a result back from a route that you have pushed on the stack. This is done
by `await`ing on the `Future` returned by `push()`.

`Navigator` 类负责 Flutter 的导航，并用来接收被压栈的 route 的返回值。这是通过
在 `push()` 后返回的 `Future` 上 `await` 来实现的。

For example, to start a location route that lets the user select
their location, you could do the following:

例如，要打开一个让用户选择位置的 route，你可以这样做：

{% prettify dart %}
Map coordinates = await Navigator.of(context).pushNamed('/location');
{% endprettify %}

And then, inside your location route, once the user has selected their location
you can `pop` the stack with the result:

然后，在你的位置 route 内，一旦用户选择了位置，你就可以弹栈 (`pop`) 并返回结果：

{% prettify dart %}
Navigator.of(context).pop({"lat":43.821757,"long":-79.226392});
{% endprettify %}

## Async UI

## 异步 UI

### What is the equivalent of `runOnUiThread()` in Flutter?

### `runOnUiThread()` 在 Flutter 中的对应方法是什么？

Dart has a single-threaded execution model, with support for `Isolate`s
(a way to run Dart code on another thread), an event loop, and
asynchronous programming. Unless you spawn an `Isolate`, your Dart code
runs in the main UI thread and is driven by an event loop. Flutter's event
loop is equivalent to Android's main `Looper`&mdash;that is, the `Looper` that
is attached to the main thread.

Dart 有一个单线程执行的模型，同时也支持 `Isolate`（在另一个线程运行 Dart 代码的方法），
它是一个事件循环和异步编程方式。除非你创建一个 `Isolate`，否则你的 Dart 代码会运行在
主 UI 线程，并被一个事件循环所驱动。Flutter 的事件循环对应于 Android 里的主 `Looper`&mdash;
也即绑定到主线程上的 `Looper`。

Dart's single-threaded model doesn't mean you need to run everything as a
blocking operation that causes the UI to freeze. Unlike Android, which
requires you to keep the main thread free at all times, in Flutter,
use the asynchronous facilities that the Dart language provides, such as
`async`/`await`, to perform asynchronous work. You might be familiar with
the `async`/`await` paradigm if you've used it in C#, Javascript, or if you
have used Kotlin's coroutines.

Dart 的单线程模型并不意味着你需要以会导致 UI 冻结的阻塞操作的方式来运行所有代码。不同于 Android 中
需要你时刻保持主线程空闲，在 Flutter 中，可以使用 Dart 语言提供的异步工具，例如 `async`/`await` 来
执行异步任务。如果你使用过 C# 或者 Javascript 中的 `async`/`await` 范式，或者 Kotlin 中的
协程，你应该对它比较熟悉。

For example, you can run network code without causing the UI to hang by
using `async`/`await` and letting Dart do the heavy lifting:

例如，你可以通过使用 `async`/`await` 来运行网络代码而且不会导致 UI 挂起，同时让 Dart 来处理
背后的繁重细节：

{% prettify dart %}
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
{% endprettify %}

Once the `await`ed network call is done, update the UI by calling `setState()`,
which triggers a rebuild of the widget sub-tree and updates the data.

一旦用 `await` 修饰的网络操作完成，再调用 `setState()` 更新 UI，这会触发 Widget 子树的重建
并更新数据。

The following example loads data asynchronously and displays it in a `ListView`:

下面的例子展示了异步加载数据并将之展示在 `ListView` 内：

{% prettify dart %}
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
{% endprettify %}

Refer to the next section for more information on doing work in the
background, and how Flutter differs from Android.

参考下一节内容获取更多关于后台任务以及 Flutter 与 Android 的差异的信息。

### How do you move work to a background thread?

### 如何将任务转移到后台线程？

In Android, when you want to access a network resource you would typically
move to a background thread and do the work, as to not block the main thread,
and avoid ANRs. For example, you might be using an `AsyncTask`, a `LiveData`,
an `IntentService`, a `JobScheduler` job, or an RxJava pipeline with a
scheduler that works on background threads.

在 Android 中，当你想要访问一个网络资源却又不想阻塞主线程并避免 ANR 的时候，你一般会将任务
放到一个后台线程中运行。例如，你可以使用一个 `AsyncTask`、一个 `LiveData`、一个 `IntentService`、
一个 `JobScheduler` 任务或者通过 RxJava 的管道用调度器将任务切换到后台线程中。

Since Flutter is single threaded and runs an event loop (like Node.js), you
don't have to worry about thread management or spawning background threads. If
you're doing I/O-bound work, such as disk access or a network call, then
you can safely use `async`/`await` and you're all set. If, on the other
hand, you need to do computationally intensive work that keeps the CPU busy,
you want to move it to an `Isolate` to avoid blocking the event loop, like
you would keep _any_ sort of work out of the main thread in Android.

由于 Flutter 是单线程并且运行一个事件循环（类似 Node.js），你无须担心线程的管理以及后台线程的创建。
如果你在执行和 I/O 绑定的任务，例如存储访问或者网络请求，那么你可以安全地使用 `async`/`await`，
并无后顾之忧。再例如，你需要执行消耗 CPU 的计算密集型工作，那么你可以将其转移到一个 `Isolate` 上以
避免阻塞事件循环，就像你在 Android 中会将任何任务放到主线程之外一样。 

For I/O-bound work, declare the function as an `async` function,
and `await` on long-running tasks inside the function:

对于和 I/O 绑定的任务，将方法声明为 `async` 方法，并在方法内 `await` 一个长时间运行的任务：

{% prettify dart %}
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
{% endprettify %}

This is how you would typically do network or database calls, which are both
I/O operations.

这就是你一般应该如何执行网络和数据库操作，它们都属于 I/O 操作。

On Android, when you extend `AsyncTask`, you typically override 3 methods,
`onPreExecute()`, `doInBackground()` and `onPostExecute()`. There is no
equivalent in Flutter, since you `await` on a long running function, and
Dart's event loop takes care of the rest.

在 Android 中，当你继承 `AsyncTask` 的时候，你一般会覆写三个方法，`onPreExecute()`、`doInBackground()` 和 
`onPostExecute()`。Flutter 中没有对应的 API，你只需要 `await` 一个耗时方法调用， Dart 的事件循环
就会帮你处理剩下的事情。

However, there are times when you might be processing a large amount of data and
your UI hangs. In Flutter, use `Isolate`s to take advantage of
multiple CPU cores to do long-running or computationally intensive tasks.

然而，有时候你可能需要处理大量的数据并挂起你的 UI。在 Flutter 中，可以通过使用 `Isolate` 来
利用多核处理器的优势执行耗时或计算密集的任务。

Isolates are separate execution threads that do not share any memory
with the main execution memory heap. This means you can’t access variables from
the main thread, or update your UI by calling `setState()`. Unlike Android threads,
Isolates are true to their name, and cannot share memory (in the form of static fields,
for example).

Isolate 是独立执行的线程，不会和主执行内存堆分享内存。这意味着你无法访问主线程的变量，或者调用 `setState()` 
更新 UI。不同于 Android 中的线程，Isolate 如其名所示，它们无法分享内存（例如通过静态变量的形式）。

The following example shows, in a simple isolate, how to share data back to
the main thread to update the UI.

下面的例子展示了一个简单的 Isolate 是如何将数据分享给主线程来更新 UI 的。

{% prettify dart %}
loadData() async {
  ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message
  SendPort sendPort = await receivePort.first;

  List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

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
{% endprettify %}

Here, `dataLoader()` is the `Isolate` that runs in its own separate execution thread.
In the isolate you can perform more CPU intensive processing (parsing a big JSON, for
example), or perform computationally intensive math, such as encryption or signal processing.

这里的 `dataLoader()` 就是运行在自己独立执行线程内的 `Isolate`。在 Isolate 中你可以执行更多的 CPU 密集
型操作（例如解析一个大的 JSON 数据），或者执行计算密集型的数学运算，例如加密或信号处理。

You can run the full example below:

你可以运行下面这个完整的例子：

{% prettify dart %}
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
    return Padding(padding: EdgeInsets.all(10.0), child: Text("Row ${widgets[i]["title"]}"));
  }

  loadData() async {
    ReceivePort receivePort = ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message
    SendPort sendPort = await receivePort.first;

    List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

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
{% endprettify %}

### What is the equivalent of OkHttp on Flutter?

### OkHttp 在 Flutter 中的对应物是什么？

Making a network call in Flutter is easy when you use the popular
[`http` package]({{site.pub}}/packages/http).

Flutter 中使用流行的 [`http` 包]({{site.pub}}/packages/http) 进行网络请求是很简单的。

While the http package doesn't have every feature found in OkHttp,
it abstracts away much of the networking that you would normally implement
yourself, making it a simple way to make network calls.

虽然 http 包没有 OkHttp 中的所有功能，但是它抽象了很多通常你会自己实现的网络功能，这使其
本身在执行网络请求时简单易用。

To use the `http` package, add it to your dependencies in `pubspec.yaml`:

如果要使用 `http` 包，需要在 `pubspec.yaml` 文件中添加依赖：

{% prettify yaml %}
dependencies:
  ...
  http: ^0.11.3+16
{% endprettify %}

To make a network call, call `await` on the `async` function `http.get()`:

如果要发起一个网络请求，在异步 (`async`) 方法 `http.get()` 上调用 `await` 即可：

{% prettify dart %}
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
{% endprettify %}

### How do I show the progress for a long-running task?

### 如何为耗时任务显示进度？

In Android you would typically show a `ProgressBar` view in your UI while
executing a long running task on a background thread.

在 Android 中你通常会在后台执行一个耗时任务的时候显示一个 `ProgressBar` 在界面上。

In Flutter, use a `ProgressIndicator` widget.
Show the progress programmatically by controlling when it's rendered
through a boolean flag. Tell Flutter to update its state before your
long-running task starts, and hide it after it ends.

在 Flutter 中，我们使用 `ProgressIndicator` Widget。通过代码逻辑使用一个布尔标记值
控制进度条的渲染。

In the following example, the build function is separated into three different
functions. If `showLoadingDialog()` is `true` (when `widgets.length == 0`),
then render the `ProgressIndicator`. Otherwise, render the
`ListView` with the data returned from a network call.

在下面的例子中，build 方法被拆分成三个不同的方法。如果 `showLoadingDialog()` 返回 `true`（当 `widgets.length == 0`），
渲染 `ProgressIndicator`。否则，在 `ListView` 里渲染网络请求返回的数据。

{% prettify dart %}
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
    return Padding(padding: EdgeInsets.all(10.0), child: Text("Row ${widgets[i]["title"]}"));
  }

  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = json.decode(response.body);
    });
  }
}
{% endprettify %}

## Project structure & resources

## 工程结构和资源文件

### Where do I store my resolution-dependent image files?

### 在哪里放置分辨率相关的图片文件？

While Android treats resources and assets as distinct items, Flutter apps have
only assets. All resources that would live in the `res/drawable-*`
folders on Android, are placed in an assets folder for Flutter.

虽然 Android 区分对待资源文件 (resources) 和资产文件 (assets)，但是 Flutter 应用只有资产文件 (assets)。
所有原本在 Android 中应该放在 `res/drawable-*` 文件夹中的资源文件，在 Flutter 中都放在一个 
assets 文件夹中。

Flutter follows a simple density-based format like iOS. Assets might be `1.0x`,
`2.0x`, `3.0x`, or any other multiplier. Flutter doesn't have `dp`s but there
are logical pixels, which are basically the same as device-independent pixels.
The so-called
[`devicePixelRatio`]({{site.api}}/flutter/dart-ui/Window/devicePixelRatio.html)
expresses the ratio of physical pixels in a single logical pixel.

Flutter 遵循一个简单的类似 iOS 的密度相关的格式。文件可以是一倍 (`1.0x`)、两倍 (`2.0x`)、三倍 (`3.0x`) 
或其它的任意倍数。Flutter 没有 `dp` 单位，但是有逻辑像素尺寸，基本和设备无关的像素尺寸是一样的。名称为 
[`devicePixelRatio`]({{site.api}}/flutter/dart-ui/Window/devicePixelRatio.html) 
的尺寸表示在单一逻辑像素标准下设备物理像素的比例。

The equivalent to Android's density buckets are:

和 Android 的密度分类的对照表如下：
 
   <t>Android density qualifier</t><t>Android 密度修饰符</t> | <t>Flutter pixel ratio</t><t>Flutter 像素比例</t>
 --- | ---
 `ldpi` | `0.75x`
 `mdpi` | `1.0x`
 `hdpi` | `1.5x`
 `xhdpi` | `2.0x`
 `xxhdpi` | `3.0x`
 `xxxhdpi` | `4.0x`

Assets are located in any arbitrary folder&mdash;Flutter has no
predefined folder structure. You declare the assets (with location) in
the `pubspec.yaml` file, and Flutter picks them up.

文件放置于任意文件夹中&mdash;Flutter 没有预先定义好的文件夹结构。你在 `pubspec.yaml` 文件中
定义文件（包括位置信息），Flutter 负责找到它们。

Note that before Flutter 1.0 beta 2, assets defined in Flutter were not
accessible from the native side, and vice versa, native assets and resources
weren’t available to Flutter, as they lived in separate folders.

需要注意的是，在 Flutter 1.0 beta 2 之前，在 Flutter 中定义的文件不能被原生端访问，反之亦然，
原生端定义的资产文件 (assets) 和资源文件 (resources) 也无法被 Flutter 访问，因为它们是放置于
不同的文件夹中的。

As of Flutter beta 2, assets are stored in the native asset folder,
and are accessed on the native side using Android's `AssetManager`:

至于 Flutter beta 2，文件是放置于原生端的 asset 文件夹中，所以可以被原生端的 `AssetManager` 访问：

{% prettify kotlin %}
val flutterAssetStream = assetManager.open("flutter_assets/assets/my_flutter_asset.png")
{% endprettify %}

As of Flutter beta 2, Flutter still cannot access native resources, nor it can
access native assets.

然而对于 Flutter beta 2，Flutter 依然无法访问原生资源文件(resources)，也无法访问原生资产文件(assets)。

To add a new image asset called `my_icon.png` to our Flutter project, for example,
and deciding that it should live in a folder we arbitrarily called `images`, you
would put the base image (1.0x) in the `images` folder, and all the other
variants in sub-folders called with the appropriate ratio multiplier:

如果你要向 Flutter 项目中添加一个新的叫 `my_icon.png` 的图片资源，并且将其放入我们随便起名的叫做 
`images` 的文件夹中，你需要将基础图片(1.0x)放在 `images` 文件夹中，并将其它倍数的图片放入以特定
倍数作为名称的子文件夹中：

```
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

Next, you'll need to declare these images in your `pubspec.yaml` file:

接下来，你需要在 `pubspec.yaml` 文件中定义这些图片：

{% prettify yaml %}
assets:
 - images/my_icon.jpeg
{% endprettify %}

You can then access your images using `AssetImage`:

然后你就可以使用 `AssetImage` 访问你的图片了：

{% prettify dart %}
return AssetImage("images/a_dot_burr.jpeg");
{% endprettify %}

or directly in an `Image` widget:

或者通过 `Image` Widget 直接访问：

{% prettify dart %}
@override
Widget build(BuildContext context) {
  return Image.asset("images/my_image.png");
}
{% endprettify %}

### Where do I store strings? How do I handle localization?

### 字符串储存在哪里？如何处理本地化？

Flutter currently doesn't have a dedicated resources-like system for strings.
At the moment, the best practice is to hold your copy text in a class as
static fields and accessing them from there. For example:

Flutter 当下并没有一个特定的管理字符串的资源管理系统。目前来讲，最好的办法是将字符串作为静态域
存放在类中，并通过类访问它们。例如：

{% prettify dart %}
class Strings {
  static String welcomeMessage = "Welcome To Flutter";
}
{% endprettify %}

Then in your code, you can access your strings as such:

接着在你们的代码中，你可以这样访问你的字符串：

{% prettify dart %}
Text(Strings.welcomeMessage)
{% endprettify %}

Flutter has basic support for accessibility on Android, though this feature is
a work in progress.

Flutter 在 Android 上提供无障碍的基本支持，但是这个功能当下仍在开发。

Flutter developers are encouraged to use the [intl
package]({{site.pub}}/packages/intl) for internationalization and
localization.

我们鼓励 Flutter 开发者使用 [intl 包]({{site.pub}}/packages/intl) 进行国际化和本地化。

### What is the equivalent of a Gradle file? How do I add dependencies?

### Gradle 文件的对应物是什么？我该如何添加依赖？

In Android, you add dependencies by adding to your Gradle build script. Flutter
uses Dart's own build system, and the Pub package manager.
The tools delegate the building of the native Android and iOS wrapper apps to the
respective build systems.

在 Android 中，你在 Gradle 构建脚本中添加依赖。Flutter 使用 Dart 自己的构建系统以及 Pub 包管理器。
构建工具会将原生 Android 和 iOS 壳应用的构建代理给对应的构建系统。

While there are Gradle files under the `android` folder in your Flutter project,
only use these if you are adding native dependencies needed for
per-platform integration. In general, use `pubspec.yaml` to declare
external dependencies to use in Flutter. A good place to find Flutter packages is
[Pub]({{site.pub}}/flutter/packages/).

虽然在你的 Flutter 项目的 `android` 文件夹下有 Gradle 文件，但是它们只用于给对应平台的集成添加原生依赖。
一般来说，在 `pubspec.yaml` 文件中定义在 Flutter 里使用的外部依赖。[Pub]({{site.pub}}/flutter/packages/) 
是查找 Flutter 包的好地方。

## Activities and fragments

## Activity 和 Fragment

### What are the equivalent of activities and fragments in Flutter?

### Activity 和 Fragment 在 Flutter 中的对应概念是什么？

In Android, an `Activity` represents a single focused thing the user can do. A
`Fragment` represents a behavior or a portion of user interface. Fragments
are a way to modularize your code, compose sophisticated user interfaces for
larger screens, and help scale your application UI. In Flutter, both of these
concepts fall under the umbrella of `Widget`s.

在 Android 中，一个 `Activity` 代表用户可以完成的一件独立任务。一个 `Fragment` 代表一个
行为或者用户界面的一部分。Fragment 用于模块化你的代码，为大屏组合复杂的用户界面，并适配应用的界面。
在 Flutter 中，这两个概念都对应于 `Widget`。

To learn more about the UI for building Activities and Fragements, see
the community-contributed medium article,
[Flutter For Android Developers : How to design an Activity UI in
Flutter]({{site.medium}}/@burhanrashid52/flutter-for-android-developers-how-to-design-activity-ui-in-flutter-4bf7b0de1e48).

如果要学习更多的关于 Activity 和 Fragment 创建界面的内容，请阅读社区贡献的 Medium 文章，
[给 Android 开发者的 Flutter 指南：如何在 Flutter 中设计一个 Activity 界面]({{site.medium}}/@burhanrashid52/flutter-for-android-developers-how-to-design-activity-ui-in-flutter-4bf7b0de1e48)。

As mentioned in the [Intents](#what-is-the-equivalent-of-an-intent-in-flutter)
section, screens in Flutter are represented by `Widget`s since everything is
a widget in Flutter. Use a `Navigator` to move between different `Route`s
that represent different screens or pages, or maybe just different states or
renderings of the same data.

就如在 [Intents](#what-is-the-equivalent-of-an-intent-in-flutter) 部分所提，Flutter 中的界面
都是以 `Widget` 表示的，因为 Flutter 中一切皆为 Widget。你使用 `Navigator` 在表示不同屏幕或页面，
或者仅仅是相同数据的不同状态和渲染的各个 `Route` 之间进行导航。

### How do I listen to Android activity lifecycle events?

### 如何监听 Android Activity 的生命周期事件？

In Android, you can override methods from the `Activity` to capture lifecycle
methods for the activity itself, or register `ActivityLifecycleCallbacks` on
the `Application`. In Flutter, you have neither concept, but you can instead
listen to lifecycle events by hooking into the `WidgetsBinding` observer and
listening to the `didChangeAppLifecycleState()` change event.

在 Android 中，你可以覆写 `Actvity` 的生命周期方法来监听其生命周期，也可以在 `Application` 上
注册 `ActivityLifecycleCallbacks`。在 Flutter 中，这两种方法都没有，但是你可以通过绑定 
`WidgetsBinding` 观察者并监听 `didChangeAppLifecycleState()` 的变化事件来监听生命周期。

The observable lifecycle events are:

可以被观察的生命周期事件有：

* `inactive` — The application is in an inactive state and is not receiving user
  input. This event only works on iOS, as there is no equivalent event to map to
  on Android

  `inactive` — 应用处于非活跃状态并且不接收用户输入。这个事件只适用于 iOS，Android 上没有对应
  的事件

* `paused` — The application is not currently visible to the user, not responding
  to user input, and running in the background. This is equivalent to `onPause()`
  in Android

  `paused` — 应用当前对用户不可见，无法响应用户输入，并运行在后台。这个事件对应于 Android 中的 `onPause()`

* `resumed` — The application is visible and responding to user input. This is
  equivalent to `onPostResume()` in Android

  `resumed` — 应用对用户可见并且可以响应用户的输入。这个事件对应于 Android 中的 `onPostResume()`

* `suspending` — The application is suspended momentarily. This is equivalent
  to `onStop` in Android; it is not triggered on iOS as there is no equivalent
  event to map to on iOS

  `suspending` — 应用暂时被挂起。这个事件对应于 Android 中的 `onStop`；iOS 上由于没有对应的事件，
  因此不会触发此事件

For more details on the meaning of these states, see the
[`AppLifecycleStatus` documentation][].

想要了解这些状态含义的更多细节，请查看 [`AppLifecycleStatus` 文档][]

[`AppLifecycleStatus` documentation]: {{site.api}}/flutter/dart-ui/AppLifecycleState-class.html

[`AppLifecycleStatus` 文档]: {{site.api}}/flutter/dart-ui/AppLifecycleState-class.html

As you might have noticed, only a small minority of the Activity lifecycle events
are available; while `FlutterActivity` does capture almost all the activity lifecycle
events internally and send them over to the Flutter engine, they're mostly shielded
away from you. Flutter takes care of starting and stopping the engine for you, and
there is little reason for needing to observe the activity lifecycle on the Flutter
side in most cases. If you need to observe the lifecycle to acquire or release any
native resources, you should likely be doing it from the native side, at any rate.

你可能已经注意到，只有一小部分的 Activity 生命周期事件是可用的；虽然 `FlutterActivity` 在内部
捕获了几乎所有的 Activity 生命周期事件并将它们发送给 Flutter 引擎，但是它们大部分都向你屏蔽了。
Flutter 为你管理引擎的启动和停止，在大部分情况下几乎没有理由要在 Flutter 一端监听 Activity 的生命周期。
如果你需要通过监听生命周期来获取或释放原生的资源，你无论如何都应该在原生一端做这件事。

Here's an example of how to observe the lifecycle status of the containing activity:

下面的例子展示了如何监听容器 Activity 的生命周期状态：

{% prettify dart %}
import 'package:flutter/widgets.dart';

class LifecycleWatcher extends StatefulWidget {
  @override
  _LifecycleWatcherState createState() => _LifecycleWatcherState();
}

class _LifecycleWatcherState extends State<LifecycleWatcher> with WidgetsBindingObserver {
  AppLifecycleState _lastLifecycleState;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() {
      _lastLifecycleState = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_lastLifecycleState == null)
      return Text('This widget has not observed any lifecycle changes.', textDirection: TextDirection.ltr);

    return Text('The most recent lifecycle state this widget observed was: $_lastLifecycleState.',
        textDirection: TextDirection.ltr);
  }
}

void main() {
  runApp(Center(child: LifecycleWatcher()));
}
{% endprettify %}

## Layouts

## 布局

### What is the equivalent of a LinearLayout?

### LinearLayout 的对应概念是什么？

In Android, a LinearLayout is used to lay your widgets out
linearly&mdash;either horizontally or vertically.
In Flutter, use the Row widget or Column
widget to achieve the same result.

在 Android 中，LinearLayout 用于线性布局 widget 的&mdash;水平或者垂直。
在 Flutter 中，使用 Row 或者 Column Widget 来实现相同的效果。

If you notice the two code samples are identical with the exception of the
"Row" and "Column" widget. The children are the same and this feature can be
exploited to develop rich layouts that can change overtime with the same
children.

如果你注意看的话，会发现下面的两段代码除了 `Row` 和 `Column` Widget 以外是一模一样的。
它们的孩子是一样的，而这个特性可以被充分利用来开发包含有相同的孩子但是会随时间改变的复杂布局。

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text('Row One'),
        Text('Row Two'),
        Text('Row Three'),
        Text('Row Four'),
      ],
    );
  }
{% endprettify %}

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text('Column One'),
        Text('Column Two'),
        Text('Column Three'),
        Text('Column Four'),
      ],
    );
  }
{% endprettify %}

To learn more about building linear layouts, see the community contributed medium
article [Flutter For Android Developers : How to design LinearLayout in
Flutter?]({{site.medium}}/@burhanrashid52/flutter-for-android-developers-how-to-design-linearlayout-in-flutter-5d819c0ddf1a).

如果想学习更多的构建线性布局的内容，请阅读社区贡献的 Medium 文章 
[给 Android 开发者的 Flutter 指南：如何在 Flutter 中设计线性布局？]({{site.medium}}/@burhanrashid52/flutter-for-android-developers-how-to-design-linearlayout-in-flutter-5d819c0ddf1a)

### What is the equivalent of a RelativeLayout?

### RelativeLayout 的对应概念是什么？

A RelativeLayout lays your widgets out relative to each other. In
Flutter, there are a few ways to achieve the same result.

RelativeLayout 通过 Widget 的相互位置对它们进行布局。在 Flutter 中，
有几种实现相同效果的方法。

You can achieve the result of a RelativeLayout by using a combination of
Column, Row, and Stack widgets. You can specify rules for the widgets
constructors on how the children are laid out relative to the parent.

你可以通过组合使用 Column、Row 和 Stack Widget 实现 RelativeLayout 的效果。
你还可以在 Widget 构造器内声明孩子相对父亲的布局规则。

For a good example of building a RelativeLayout in Flutter, see Collin's
answer on
[StackOverflow]({{site.so}}/questions/44396075/equivalent-of-relativelayout-in-flutter).

Collin 在 [StackOverflow]({{site.so}}/questions/44396075/equivalent-of-relativelayout-in-flutter) 
上的回答是一个在 Flutter 中构建相对布局的好例子。

### What is the equivalent of a ScrollView?

### ScrollView 的对应概念是什么？

In Android, use a ScrollView to lay out your widgets&mdash;if the user's
device has a smaller screen than your content, it scrolls.

在 Android 中，使用 ScrollView 布局 widget&mdash;如果用户的设备屏幕比应用的内容区域小，用户可以滑动内容。

In Flutter, the easiest way to do this is using the ListView widget. This might
seem like overkill coming from Android, but in Flutter a ListView widget is
both a ScrollView and an Android ListView.

在 Flutter 中，实现这个功能的最简单的方法是使用 ListView Widget。从 Android 的角度看，这样做可能
是杀鸡用牛刀了，但是 Flutter 中 ListView Widget 既是一个 ScrollView，也是一个 Android 中的 ListView。

{% prettify dart %}
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
{% endprettify %}

### How do I handle landscape transitions in Flutter?

### 在 Flutter 中如何处理屏幕旋转？

FlutterView handles the config change if AndroidManifest.xml contains:

FlutterView 会处理配置的变化，前提条件是在 AndroidManifest.xml 文件中声明了：

{% prettify yaml %}
android:configChanges="orientation|screenSize"
{% endprettify %}

## Gesture detection and touch event handling

## 手势监听和触摸事件处理

### How do I add an onClick listener to a widget in Flutter?

### Flutter 中如何为一个 Widget 添加点击监听器？

In Android, you can attach onClick to views such as button by calling
the method 'setOnClickListener'.

在 Android 中，你可以通过调用 `setOnClickListener` 方法在按钮这样的 View 上
添加点击监听器。

In Flutter there are two ways of adding touch listeners:

在 Flutter 中有两种添加触摸监听器的方法：

 1. If the Widget supports event detection, pass a function to it and handle it
    in the function. For example, the RaisedButton has an `onPressed` parameter:

    如果 Widget 支持事件监听，那么向它传入一个方法并在方法中处理事件。例如，RaisedButton 有
    一个 `onPressed` 参数：

    <!-- skip -->
    ```dart
    @override
    Widget build(BuildContext context) {
      return RaisedButton(
          onPressed: () {
            print("click");
          },
          child: Text("Button"));
    }
    ```

 2. If the Widget doesn't support event detection, wrap the
    widget in a GestureDetector and pass a function to the `onTap` parameter.

    如果 Widget 不支持事件监听，将 Widget 包装进一个 GestureDetector 中并向 `onTap` 参数
    传入一个方法。

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
        ));
      }
    }
    ```

### How do I handle other gestures on widgets?

### 如何处理 Widget 上的其它手势？

Using the GestureDetector, you can listen to a wide range of Gestures such as:

使用 GestureDetector 可以监听非常多的手势，例如：

* Tap

  * `onTapDown` - A pointer that might cause a tap has contacted the screen at a
     particular location.

    `onTapDown` - 一个可能产生点击事件的指针触摸到屏幕的特定位置。

  * `onTapUp` - A pointer that triggers a tap has stopped contacting the
     screen at a particular location.

    `onTapUp` - 一个产生了点击事件的指针停止触摸屏幕的特定位置。

  * `onTap` - A tap has occurred.
   
    `onTap` - 一个点击事件已经发生。

  * `onTapCancel` - The pointer that previously triggered the `onTapDown` won't
     cause a tap.

    `onTapCancel` - 之前触发了 `onTapDown` 事件的指针不会产生点击事件。

* Double tap

  * `onDoubleTap` - The user tapped the screen at the same location twice in
     quick succession.

    `onDoubleTap` - 用户在屏幕同一位置连续快速地点击两次。

* Long press

  * `onLongPress` - A pointer has remained in contact with the screen at the same
    location for a long period of time.

    `onLongPress` - 指针在屏幕的同一位置保持了一段较长时间的触摸状态。

* Vertical drag

  * `onVerticalDragStart` - A pointer has contacted the screen and might begin to
    move vertically.

    `onVerticalDragStart` - 指针已经触摸屏幕并可能开始垂直移动。

  * `onVerticalDragUpdate` - A pointer in contact with the screen
    has moved further in the vertical direction.

    `onVerticalDragUpdate` - 触摸屏幕的指针在垂直方向移动了更多的距离。

  * `onVerticalDragEnd` - A pointer that was previously in contact with the
    screen and moving vertically is no longer in contact with the screen and was
    moving at a specific velocity when it stopped contacting the screen.

    `onVerticalDragEnd` - 之前和屏幕接触并垂直移动的指针不再继续和屏幕接触，并且在和屏幕停止
    接触的时候以一定的速度移动。

* Horizontal drag

  * `onHorizontalDragStart` - A pointer has contacted the screen and might begin
    to move horizontally.

    `onHorizontalDragStart` - 指针已经触摸屏幕并可能开始水平移动。

  * `onHorizontalDragUpdate` - A pointer in contact with the screen
    has moved further in the horizontal direction.

    `onHorizontalDragUpdate` - 触摸屏幕的指针在水平方向移动了更多的距离。

  * `onHorizontalDragEnd` - A pointer that was previously in contact with the
    screen and moving horizontally is no longer in contact with the screen and was
    moving at a specific velocity when it stopped contacting the screen.
    
    `onHorizontalDragEnd` - 之前和屏幕接触并水平移动的指针不再继续和屏幕接触，并且在和屏幕停止
    接触的时候以一定的速度移动。

The following example shows a `GestureDetector` that rotates the Flutter logo
on a double tap:

下面的例子展示了一个实现了双击旋转 Flutter 标志的 `GestureDetector`：

{% prettify dart %}
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
    ));
  }
}
{% endprettify %}

## Listviews & adapters

## Listviews 和 adapters

### What is the alternative to a ListView in Flutter?

### ListView 在 Flutter 中的对应概念是什么？

The equivalent to a ListView in Flutter is … a ListView!

Flutter 中 ListView 的对应概念仍然是...ListView！

In an Android ListView, you create an adapter and pass it into the
ListView, which renders each row with what your adapter returns. However, you
have to make sure you recycle your rows, otherwise, you get all sorts of crazy
visual glitches and memory issues.

使用 Android 的 ListView 时，创建一个 adapter 并将其传给 ListView，ListView 渲染 
adapter 返回的每一行内容。然后，你需要确保回收了每一行视图，否则，你会遇到各种奇怪的
界面和内存问题。

Due to Flutter's immutable widget pattern, you pass a List of
Widgets to your ListView, and Flutter takes care of making sure
that scrolling is fast and smooth.

因为 Flutter Widget 不可变的特点，你需要向 ListView 传入一组 Widget，
Flutter 会保证滑动的快速顺畅。

{% prettify dart %}
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
{% endprettify %}

### How do I know which list item is clicked on?

### 如何知道点击了哪个列表项？

In Android, the ListView has a method to find out which item was clicked
'onItemClickListener'.
In Flutter, use the touch handling provided by the passed-in widgets.

在 Android 中，ListView 有一个可以帮助你定位哪个列表项被点击了的方法 `onItemClickListener`。
在 Flutter 中，则使用传入 Widget 的触摸监听。

{% prettify dart %}
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
            child: Text("Row $i")),
        onTap: () {
          print('row tapped');
        },
      ));
    }
    return widgets;
  }
}
{% endprettify %}

### How do I update ListView's dynamically?

### 如何动态更新 ListView？

On Android, you update the adapter and call `notifyDataSetChanged`.

在 Android 中，你需要更新 adapter 并调用 `notifyDataSetChanged`。

In Flutter, if you were to update the list of widgets inside a `setState()`,
you would quickly see that your data did not change visually.
This is because when `setState()` is called, the Flutter rendering engine
looks at the widget tree to see if anything has changed. When it gets to your
`ListView`, it performs a `==` check, and determines that the two `ListView`s are the
same. Nothing has changed, so no update is required.

在 Flutter 中，如果你准备在 `setState()` 里更新一组 Widget，你很快会发现你的数据并没有
更新到界面上。这是因为当 `setState()` 被调用的时候，Flutter 渲染引擎会查看 Widget 树
是否有任何更改。当引擎检查到 `ListView`，他会执行 `==` 检查，并判断两个 `ListView` 是一样的。
没有任何更改，所以也就不需要更新。

For a simple way to update your `ListView`, create a new `List` inside of
`setState()`, and copy the data from the old list to the new list.
While this approach is simple, it is not recommended for large data sets,
as shown in the next example.

更新 `ListView` 的一个简单方法是，在 `setState()` 里创建一个新的 `List`，并将数据从旧列表
拷贝到新列表。虽然这个方法很简单，就如下面例子所示，但是并不推荐在大数据集的时候使用。

{% prettify dart %}
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
  List widgets = <Widget>[];

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
          child: Text("Row $i")),
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
{% endprettify %}

The recommended, efficient, and effective way to build a list uses a
ListView.Builder. This method is great when you have a dynamic
List or a List with very large amounts of data. This is essentially
the equivalent of RecyclerView on Android, which automatically
recycles list elements for you:

推荐的高效且有效的创建一个列表的方法是使用 ListView.Builder。这个方法非常适用于
动态列表或者拥有大量数据的列表。这基本上就是 Android 里的 RecyclerView，会为你
自动回收列表项：

{% prettify dart %}
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
  List widgets = <Widget>[];

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
            }));
  }

  Widget getRow(int i) {
    return GestureDetector(
      child: Padding(
          padding: EdgeInsets.all(10.0),
          child: Text("Row $i")),
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length + 1));
          print('row $i');
        });
      },
    );
  }
}
{% endprettify %}

Instead of creating a "ListView", create a ListView.builder that
takes two key parameters: the initial length of the list, and an ItemBuilder
function.

不用创建一个 "ListView"，而是创建接收两个参数的 ListView.Builder，两个参数分别是
列表的初始长度和一个 ItemBuilder 方法。

The ItemBuilder function is similar to the `getView` function in an Android
adapter; it takes a position, and returns the row you want rendered at
that position.

ItemBuilder 方法和 Android adapter 里的 `getView` 方法类似；它通过位置返回你期望在
这个位置渲染的列表项。

Finally, but most importantly, notice that the `onTap()` function
doesn't recreate the list anymore, but instead `.add`s to it.

最后也是最重要的一条，需要注意 `onTap()` 方法不再重建列表项，但是会执行 `.add` 操作。

## Working with text

## 文字处理

### How do I set custom fonts on my Text widgets?

### 如何为 Text Widget 设置自定义字体？

In Android SDK (as of Android O), you create a Font resource file and
pass it into the FontFamily param for your TextView.

在 Android SDK 中（从 Android O 开始），你可以创建一个字体资源文件并将其
传给 TextView 的 FontFamily 参数。

In Flutter, place the font file in a folder and reference it in the
`pubspec.yaml` file, similar to how you import images.

在 Flutter 中，将字体文件放入一个文件夹，并在 `pubspec.yaml` 文件中引用它，就
和导入图片一样。

{% prettify yaml %}
fonts:
   - family: MyCustomFont
     fonts:
       - asset: fonts/MyCustomFont.ttf
       - style: italic
{% endprettify %}

Then assign the font to your `Text` widget:

然后将字体赋值给你的 `Text` Widget：

{% prettify dart %}
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
{% endprettify %}

### How do I style my Text widgets?

### 如何更改 Text Widget 的样式？

Along with fonts, you can customize other styling elements on a `Text` widget.
The style parameter of a `Text` widget takes a `TextStyle` object, where you can
customize many parameters, such as:

除了字体，你还可以自定义 `Text` Widget 的其它样式元素。`Text` Widget 的样式参数接收一个 `TextStyle` 对象，
你可以在这个对象里自定义很多参数，例如：

* color
* decoration
* decorationColor
* decorationStyle
* fontFamily
* fontSize
* fontStyle
* fontWeight
* hashCode
* height
* inherit
* letterSpacing
* textBaseline
* wordSpacing

## Form input

## 表单输入

For more information on using Forms, see
[Retrieve the value of a text field](/docs/cookbook/forms/retrieve-input),
from the [Flutter Cookbook](/docs/cookbook).

如果需要更多使用表单的信息，请查看 [Flutter Cookbook](/docs/cookbook) 中的 
[检索一个文本字段的值](/docs/cookbook/forms/retrieve-input)。

### What is the equivalent of a "hint" on an Input?

### Input 的“提示”("hint")的对应概念是什么？

In Flutter, you can easily show a "hint" or a placeholder text for your input by
adding an InputDecoration object to the decoration constructor parameter for
the Text Widget.

在 Flutter 中，你可以简单地通过向 Text Widget 构造器的 decoration 参数传入一个 InputDecoration 对象
来为输入框展示一个“提示”或占位文本。

{% prettify dart %}
body: Center(
  child: TextField(
    decoration: InputDecoration(hintText: "This is a hint"),
  )
)
{% endprettify %}

### How do I show validation errors?

### 如何显示验证错误的信息？

Just as you would with a "hint", pass an InputDecoration object
to the decoration constructor for the Text widget.

就像上面实现“提示”功能一样，像 Text Widget 构造方法的 decoration 参数传入
一个 InputDecoration 对象。

However, you don't want to start off by showing an error.
Instead, when the user has entered invalid data,
update the state, and pass a new `InputDecoration` object.

然而，你并不想一开始就显示错误信息。相反，当用户输入了无效的信息后，
更新状态并传入一个新的 `InputDecoration` 对象。

{% prettify dart %}
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

  bool isEmail(String em) {
    String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = RegExp(emailRegexp);

    return regExp.hasMatch(em);
  }
}
{% endprettify %}


## Flutter plugins

## Flutter 插件

### How do I access the GPS sensor?

### 如何使用 GPS 传感器？

Use the [`geolocator`]({{site.pub}}/packages/geolocator) community plugin.

使用 [`geolocator`]({{site.pub}}/packages/geolocator) 社区插件。

### How do I access the camera?

### 如何使用相机？

The [`image_picker`]({{site.pub}}/packages/image_picker) plugin is popular
for accessing the camera.

[`image_picker`]({{site.pub}}/packages/image_picker) 插件被常用于相机功能的使用。

### How do I log in with Facebook?

### 如何使用 Facebook 登录？

To Log in with Facebook, use the
[`flutter_facebook_login`]({{site.pub}}/packages/flutter_facebook_login) community plugin.

使用 [`flutter_facebook_login`]({{site.pub}}/packages/flutter_facebook_login) 社区插件实现
Facebook 登录功能。

### How do I use Firebase features?

### 如何使用 Firebase 的功能？

Most Firebase functions are covered by
[first party plugins]({{site.pub}}/flutter/packages?q=firebase).
These plugins are first-party integrations, maintained by the Flutter team:

[官方插件]({{site.pub}}/flutter/packages?q=firebase) 提供了 Firebase 的大多数功能。
这些插件都是由 Flutter 团队维护的官方集成插件：

 * [`firebase_admob`]({{site.pub}}/packages/firebase_admob) for Firebase AdMob
  
   [`firebase_admob`]({{site.pub}}/packages/firebase_admob) 提供 Firebase AdMob 功能

 * [`firebase_analytics`]({{site.pub}}/packages/firebase_analytics) for Firebase Analytics

   [`firebase_analytics`]({{site.pub}}/packages/firebase_analytics) 提供 Firebase Analytics 功能

 * [`firebase_auth`]({{site.pub}}/packages/firebase_auth) for Firebase Auth
  
   [`firebase_auth`]({{site.pub}}/packages/firebase_auth) 提供 Firebase Auth 功能

 * [`firebase_database`]({{site.pub}}/packages/firebase_database) for Firebase RTDB
  
   [`firebase_database`]({{site.pub}}/packages/firebase_database) 提供 Firebase RTDB 功能

 * [`firebase_storage`]({{site.pub}}/packages/firebase_storage) for Firebase Cloud Storage

   [`firebase_storage`]({{site.pub}}/packages/firebase_storage) 提供 Firebase Cloud Storage 功能

 * [`firebase_messaging`]({{site.pub}}/packages/firebase_messaging) for Firebase Messaging (FCM)
  
   [`firebase_messaging`]({{site.pub}}/packages/firebase_messaging) 提供 Firebase Messaging (FCM) 功能

 * [`flutter_firebase_ui`]({{site.pub}}/packages/flutter_firebase_ui) for quick Firebase Auth integrations (Facebook, Google, Twitter and email)
  
   [`flutter_firebase_ui`]({{site.pub}}/packages/flutter_firebase_ui) 提供快速的 Firebase Auth 集成功能 (Facebook, Google, Twitter 和 email)

 * [`cloud_firestore`]({{site.pub}}/packages/cloud_firestore) for Firebase Cloud Firestore
  
   [`cloud_firestore`]({{site.pub}}/packages/cloud_firestore) 提供 Firebase Cloud Firestore 功能

You can also find some third-party Firebase plugins on Pub that cover areas
not directly covered by the first-party plugins.

你可以在 Pub(https://pub.dev/flutter) 网站上查找一些官方插件没有直接支持的功能的第三方 Firebase 插件。

### How do I build my own custom native integrations?

### 如何创建自己的自定义原生集成插件？

If there is platform-specific functionality that Flutter or its community
Plugins are missing, you can build your own following the
[developing packages and plugins](/docs/development/packages-and-plugins/developing-packages) page.

如果有 Flutter 官方或社区第三方插件没有涵盖的平台特定的功能，你可以根据 
[开发包和插件](/docs/development/packages-and-plugins/developing-packages) 页面
创建自己的插件。

Flutter's plugin architecture, in a nutshell, is much like using an Event bus in
Android: you fire off a message and let the receiver process and emit a result
back to you. In this case, the receiver is code running on the native side
on Android or iOS.

Flutter 的插件架构，简而言之，和 Android 中的事件总线的使用非常相似：你发送一个消息，并让接受者
处理并返回一个结果给你。在这种情况下，接受者是运行在 Android 或 iOS 原生端的代码。

### How do I use the NDK in my Flutter application?

### 如何在 Flutter 应用中使用 NDK？

If you use the NDK in your current Android application and want your Flutter
application to take advantage of your native libraries then it's possible by
building a custom plugin.

如果你在现有的 Android 应用中使用 NDK，并且希望你的 Flutter 应用可以利用你的 native 库，
这可以通过创建一个自定义插件实现。

Your custom plugin first talks to your Android app, where you call your
`native` functions over JNI. Once a response is ready,
send a message back to Flutter and render the result.

你的自定义插件首先和你的 Android 应用通信，Android 应用会通过 JNI 调用 `native` 方法。
一旦有返回值，就可以向 Flutter 发送回一个消息并渲染结果。

Calling native code directly from Flutter is currently not supported.

暂时还不支持从 Flutter 中直接调用 native 代码。

## Themes

## 主题(Themes)

### How do I theme my app?

### 如何对应用使用主题？

Out of the box, Flutter comes with a beautiful implementation of Material
Design, which takes care of a lot of styling and theming needs that you would
typically do. Unlike Android where you declare themes in XML and then assign it
to your application using AndroidManifest.xml, in Flutter you declare themes
in the top level widget.

Flutter 提供开箱即用的优美的 Material Design 实现，可以满足你通常需要的各种样式和主题的需求。
不同于 Android 中你在 XML 文件中定义主题并在 AndroidManifest.xml 中将其赋值给你的应用，
Flutter 中是在顶层 Widget 上声明主题。

To take full advantage of Material Components in your app, you can declare a top
level widget `MaterialApp` as the entry point to your application. MaterialApp
is a convenience widget that wraps a number of widgets that are commonly
required for applications implementing Material Design. It builds upon a WidgetsApp by
adding Material specific functionality.

为了在应用中利用好 Material 组件，你可以在应用中声明一个顶层 Widget `MeterialApp` 作为入口。
MaterialApp 是一个包装了一系列 Widget 的为你给予便利的 Widget，而这些 Widget 通常是实现 
Material Design 的应用所必须的。它基于 WidgetsApp 并添加了 Material 相关的功能。

You can also use a `WidgetApp` as your app widget, which provides some of the
same functionality, but is not as rich as `MaterialApp`.

你也可以使用 `WidgetApp` 作为应用的 Widget，它会提供一些相同的功能，但是不如 `MaterialApp` 提供
的功能丰富。

To customize the colors and styles of any child components, pass a
`ThemeData` object to the `MaterialApp` widget. For example, in the code below,
the primary swatch is set to blue and text selection color is red.

如果要自定义任意子组件的颜色或者样式，给 `MaterialApp` Widget 传入一个 `ThemeData` 对象即可。
例如，在下面的代码中，主色调设置为蓝色，文本选中颜色设置为红色。

{% prettify dart %}
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
{% endprettify %}


## Databases and local storage

## 数据库和本地存储

### How do I access Shared Preferences?

### 如何使用 Shared Preferences？

In Android, you can store a small collection of key-value pairs using
the SharedPreferences API.

在 Android 中，你可以使用 SharedPreferences API 来存储少量的键值对。

In Flutter, access this functionality using the
[Shared_Preferences plugin]({{site.pub}}/packages/shared_preferences).
This plugin wraps the functionality of both Shared Preferences and
NSUserDefaults (the iOS equivalent).

在 Flutter 中，使用 [Shared_Preferences 插件]({{site.pub}}/packages/shared_preferences) 实现此功能。
这个插件同时包装了 Shared Preferences 和 NSUserDefaults（iOS 平台对应 API）的功能。

{% prettify dart %}
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center(
          child: RaisedButton(
            onPressed: _incrementCounter,
            child: Text('Increment Counter'),
          ),
        ),
      ),
    ),
  );
}

_incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int counter = (prefs.getInt('counter') ?? 0) + 1;
  print('Pressed $counter times.');
  prefs.setInt('counter', counter);
}

{% endprettify %}

### How do I access SQLite in Flutter?

### 在 Flutter 中如何使用 SQLite？

In Android, you use SQLite to store structured data that you can query
using SQL.

在 Android 中，你会使用 SQLite 来存储可以通过 SQL 进行查询的结构化数据。

In Flutter, access this functionality using the
[SQFlite]({{site.pub}}/packages/sqflite) plugin.

在 Flutter 中，使用 [SQFlite]({{site.pub}}/packages/sqflite) 插件实现此功能。

## Notifications

## 通知

### How do I set up push notifications?

### 如何设置推送通知？

In Android, you use Firebase Cloud Messaging to setup push
notifications for your app.

在 Android 中，你会使用 Firebase Cloud Messaging 来为应用设置推送通知。

In Flutter, access this functionality using the
[Firebase_Messaging]({{site.github}}/flutter/plugins/tree/master/packages/firebase_messaging)
plugin.
For more information on using the Firebase Cloud Messaging API, see the
[`firebase_messaging`]({{site.pub}}/packages/firebase_messaging)
plugin documentation.

在 Flutter 中，则使用 
[Firebase_Messaging]({{site.github}}/flutter/plugins/tree/master/packages/firebase_messaging) 
插件实现此功能。想要获得更多关于使用 Firebase Cloud Messaging API 的信息，请查阅 
[`firebase_messaging`]({{site.pub}}/packages/firebase_messaging) 插件文档。
