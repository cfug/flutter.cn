---
# title: Flutter for UIKit developers
title: 给 UIKit 开发者的 Flutter 指南
# description: Learn how to apply iOS and UIKit developer knowledge when building Flutter apps.
description: 学习如何将 iOS 和 UIKit 开发经验应用到 Flutter 应用开发中。
tags: Flutter教程,Flutter起步,Flutter入门
keywords: Flutter iOS,iOS,用Flutter开发iOS,Cupertino
ai-translated: true
---

<?code-excerpt path-base="get-started/flutter-for/ios_devs"?>

iOS developers with experience using UIKit
who want to write mobile apps using Flutter
should review this guide.
It explains how to apply existing UIKit knowledge to Flutter.

有使用 UIKit 经验、希望用 Flutter 编写移动应用的
iOS 开发者，应当阅读本指南。
它说明如何把已有的 UIKit 知识运用到 Flutter 中。

:::note
If you have experience building apps with SwiftUI,
check out [Flutter for SwiftUI developers][] instead.

如果你有用 SwiftUI 构建应用的经验，
请改为查阅 [给 SwiftUI 开发者的 Flutter 指南][Flutter for SwiftUI developers]。
:::

Flutter is a framework for building cross-platform applications
that uses the Dart programming language.
To understand some differences between programming with Dart
and programming with Swift,
check out [Learning Dart as a Swift Developer][]
and [Flutter concurrency for Swift developers][].

Flutter 是一套使用 Dart 编程语言
构建跨平台应用的框架。
若要了解用 Dart 编程与用 Swift 编程的若干差异，
请查阅 [以 Swift 开发者的身份学习 Dart][Learning Dart as a Swift Developer]
以及 [给 Swift 开发者的 Flutter 并发指南][Flutter concurrency for Swift developers]。

Your iOS and UIKit knowledge and experience
are highly valuable when building with Flutter.

你在 iOS 和 UIKit 方面的知识与经验，
在使用 Flutter 构建应用时非常有价值。

{% comment %}
  TODO: Add talk about plugin system for interacting with OS and hardware
  when [iOS and Apple hardware interactions with Flutter][] is released.
{% endcomment -%}

Flutter also makes a number of adaptations
to app behavior when running on iOS.
To learn how, see [Platform adaptations][].

Flutter 在 iOS 上运行时，
还会对应用行为做多处适配。
具体方式请参阅 [平台适配][Platform adaptations]。

:::tip
To integrate Flutter code into an **existing** iOS app,
check out [Add Flutter to existing app][].

若要将 Flutter 代码集成到**现有** iOS 应用中，
请参阅 [向现有应用添加 Flutter][Add Flutter to existing app]。
:::

Use this guide as a cookbook.
Jump around and find questions that address your most relevant needs.

把本指南当作一本手册来用。
可以跳着读，找到最贴近你当前需求的问题。

## Overview

## 概览

As an introduction, watch the following video.
It outlines how Flutter works on iOS and how to use Flutter to build iOS apps.

作为引言，请观看下面的视频。
它概述了 Flutter 在 iOS 上如何工作，
以及如何使用 Flutter 构建 iOS 应用。

<YouTubeEmbed id="ceMsPBbcEGg" title="Flutter for iOS developers"></YouTubeEmbed>

### Views vs. Widgets

### 视图与 Widget

:::secondary
How is react-style, or _declarative_,
programming different from the
traditional imperative style?
For a comparison, see [Introduction to declarative UI][].

React 风格，或者说 **声明式** 编程，
与传统的命令式编程有什么不同？
对照说明请参阅 [声明式 UI 简介][Introduction to declarative UI]。
:::

In UIKit, most of what you create in the UI is done using view objects,
which are instances of the `UIView` class.
These can act as containers for other `UIView` classes,
which form your layout.

在 UIKit 中，界面上的大部分内容都通过视图对象来创建，
这些对象是 `UIView` 类的实例。
它们可以充当其他 `UIView` 类的容器，
并由此组成你的布局。

In Flutter, the rough equivalent to a `UIView` is a `Widget`.
Widgets don't map exactly to iOS views,
but while you're getting acquainted with how Flutter works
you can think of them as "the way you declare and construct UI".

在 Flutter 中，与 `UIView` 大致对应的是 `Widget`。
Widget 并不能与 iOS 视图精确对应，
但在你熟悉 Flutter 工作方式的过程中，
可以把它们看作「声明并构建 UI 的方式」。

However, these have a few differences to a `UIView`.
To start, widgets have a different lifespan: they are immutable
and only exist until they need to be changed.
Whenever widgets or their state change,
Flutter's framework creates a new tree of widget instances.
In comparison, a UIKit view is not recreated when it changes,
but rather it's a mutable entity that is drawn once
and doesn't redraw until it is invalidated using `setNeedsDisplay()`.

不过，它们与 `UIView` 仍有几处差别。
首先，widget 的生命周期不同：它们是不可变的，
并且只存在到需要被改变的那一刻。
每当 widget 或其状态发生变化，
Flutter 框架都会创建一棵新的 widget 实例树。
相比之下，UIKit 视图在发生变化时不会被重新创建，
它是一个可变实体，绘制一次之后，
直到用 `setNeedsDisplay()` 将其标为失效才会重绘。

Furthermore, unlike `UIView`, Flutter's widgets are lightweight,
in part due to their immutability.
Because they aren't views themselves,
and aren't directly drawing anything,
but rather are a description of the UI and its semantics
that get "inflated" into actual view objects under the hood.

此外，与 `UIView` 不同，Flutter 的 widget 很轻量，
部分原因就在于它们不可变。
因为它们本身并不是视图，
也不会直接绘制任何内容，
而是一份对 UI 及其语义的描述，
这份描述会在底层被「展开」为真正的视图对象。

Flutter includes the [Material Components][] library.
These are widgets that implement the
[Material Design guidelines][].
Material Design is a flexible design system
[optimized for all platforms][], including iOS.

Flutter 带有 [Material 组件][Material Components] 库。
这些 widget 实现了
[Material Design 规范][Material Design guidelines]。
Material Design 是一套
[针对所有平台做了优化][optimized for all platforms] 的灵活设计系统，
其中包括 iOS。

But Flutter is flexible and expressive enough
to implement any design language.
On iOS, you can use the [Cupertino widgets][]
library to produce an interface that looks like
[Apple's iOS design language][].

不过 Flutter 足够灵活，表达力也足够强，
可以实现任何设计语言。
在 iOS 上，可以使用 [Cupertino widget][Cupertino widgets] 库，
做出外观接近
[Apple 的 iOS 设计语言][Apple's iOS design language] 的界面。

### Updating widgets

### 更新 widget

To update your views in UIKit, you directly mutate them.
In Flutter, widgets are immutable and not updated directly.
Instead, you have to manipulate the widget's state.

在 UIKit 中，更新视图是直接修改它们。
在 Flutter 中，widget 是不可变的，不能直接更新。
你需要操作的是 widget 的状态。

This is where the concept of Stateful vs Stateless widgets
comes in. A `StatelessWidget` is just what it sounds
like&mdash;a widget with no state attached.

由此就有了有状态 widget 与无状态 widget 的区分。
`StatelessWidget` 顾名思义，
就是不附带状态的 widget。

`StatelessWidgets` are useful when the part of the user interface you are
describing does not depend on anything other than the initial configuration
information in the widget.

当所描述的那部分用户界面
除了 widget 中的初始配置信息之外不再依赖其他东西时，
`StatelessWidget` 就很适用。

For example, with UIKit, this is similar to placing a `UIImageView`
with your logo as the `image`. If the logo is not changing during runtime,
use a `StatelessWidget` in Flutter.

例如在 UIKit 中，这就类似于放置一个 `UIImageView`，
并把 logo 设为它的 `image`。
如果 logo 在运行期间不会改变，
在 Flutter 中就使用 `StatelessWidget`。

If you want to dynamically change the UI based on data received
after making an HTTP call, use a `StatefulWidget`.
After the HTTP call has completed, tell the Flutter framework
that the widget's `State` is updated, so it can update the UI.

如果想根据 HTTP 请求返回的数据动态改变 UI，
请使用 `StatefulWidget`。
HTTP 请求完成后，告诉 Flutter 框架
该 widget 的 `State` 已更新，框架便会更新 UI。

The important difference between stateless and
stateful widgets is that `StatefulWidget`s have a `State` object
that stores state data and carries it over across tree rebuilds,
so it's not lost.

无状态 widget 与有状态 widget 的重要区别在于：
`StatefulWidget` 拥有一个 `State` 对象，
它保存状态数据，并在 widget 树重建之间把数据带过去，
因此状态不会丢失。

If you are in doubt, remember this rule:
if a widget changes outside of the `build` method
(because of runtime user interactions, for example),
it's stateful.
If the widget never changes, once built, it's stateless.
However, even if a widget is stateful, the containing parent widget
can still be stateless if it isn't itself reacting to those changes
(or other inputs).

如果拿不准，请记住这条规则：
如果 widget 在 `build` 方法之外发生变化
（例如因为运行时的用户交互），它就是有状态的。
如果 widget 一旦构建完成就不再变化，它就是无状态的。
不过，即便某个 widget 是有状态的，
只要包含它的父 widget 自身并不响应这些变化（或其他输入），
父 widget 仍然可以是无状态的。

The following example shows how to use a `StatelessWidget`.
A common`StatelessWidget` is the `Text` widget.
If you look at the implementation of the `Text` widget,
you'll find it subclasses `StatelessWidget`.

下面的示例演示如何使用 `StatelessWidget`。
常见的 `StatelessWidget` 是 `Text` widget。
查看 `Text` widget 的实现就会发现，
它继承自 `StatelessWidget`。

<?code-excerpt "lib/text_widget.dart (text-widget)" replace="/return const //g"?>
```dart
Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
```

If you look at the code above, you might notice that the `Text` widget
carries no explicit state with it. It renders what is passed in its
constructors and nothing more.

看过上面的代码，你可能会注意到 `Text` widget
并没有携带显式状态。
它只渲染构造函数传入的内容，除此之外再无其他。

But, what if you want to make "I Like Flutter" change dynamically,
for example when clicking a `FloatingActionButton`?

但如果想让「I Like Flutter」动态变化，
例如在点击 `FloatingActionButton` 时改变，又该怎么办？

To achieve this, wrap the `Text` widget in a `StatefulWidget` and
update it when the user clicks the button.

要做到这一点，把 `Text` widget 包在 `StatefulWidget` 里，
并在用户点击按钮时更新它。

For example:

例如：

<?code-excerpt "lib/text_widget.dart (stateful-widget)"?>
```dart

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default placeholder text
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

### Widget layout

### Widget 布局

In UIKit, you might use a Storyboard file
to organize your views and set constraints,
or you might set your constraints programmatically in your view controllers.
In Flutter, declare your layout in code by composing a widget tree.

在 UIKit 中，你可能会用 Storyboard 文件
来组织视图并设置约束，
也可能在视图控制器里用代码设置约束。
在 Flutter 中，通过组合一棵 widget 树，
在代码里声明布局。

The following example shows how to display a simple widget with padding:

下面的示例演示如何显示一个带有内边距的简单 widget：

<?code-excerpt "lib/layout.dart (simple-widget)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Sample App')),
    body: Center(
      child: CupertinoButton(
        onPressed: () {},
        padding: const EdgeInsets.only(left: 10, right: 10),
        child: const Text('Hello'),
      ),
    ),
  );
}
```

You can add padding to any widget,
which mimics the functionality of constraints in iOS.

你可以为任意 widget 添加内边距，
这对应了 iOS 里约束所起的作用。

You can view the layouts that Flutter has to offer
in the [widget catalog][].

Flutter 提供了哪些布局，
可以在 [widget 目录][widget catalog] 中查看。

### Removing Widgets

### 移除 Widget

In UIKit, you call `addSubview()` on the parent,
or `removeFromSuperview()` on a child view
to dynamically add or remove child views.
In Flutter, because widgets are immutable,
there is no direct equivalent to `addSubview()`.
Instead, you can pass a function to the parent
that returns a widget, and control that child's creation
with a boolean flag.

在 UIKit 中，你可以在父视图上调用 `addSubview()`，
或在子视图上调用 `removeFromSuperview()`，
从而动态添加或移除子视图。
在 Flutter 中，由于 widget 不可变，
没有与 `addSubview()` 直接对应的做法。
你可以改为向父级传入一个返回 widget 的函数，
并用一个布尔标志控制这个子 widget 是否创建。

The following example shows how to toggle between two widgets
when the user clicks the `FloatingActionButton`:

下面的示例演示，当用户点击 `FloatingActionButton` 时，
如何在两个 widget 之间切换：

<?code-excerpt "lib/layout.dart (toggle-widget)"?>
```dart
class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default value for toggle.
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

    return CupertinoButton(onPressed: () {}, child: const Text('Toggle Two'));
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

### Animations

### 动画

In UIKit, you create an animation by calling the
`animate(withDuration:animations:)` method on a view.
In Flutter, use the animation library
to wrap widgets inside an animated widget.

在 UIKit 中，创建动画的方式是在视图上调用
`animate(withDuration:animations:)` 方法。
在 Flutter 中，使用动画库，
把 widget 包进一个带动画的 widget。

In Flutter, use an `AnimationController`, which is an `Animation<double>`
that can pause, seek, stop, and reverse the animation.
It requires a `Ticker` that signals when vsync happens
and produces a linear interpolation
between 0 and 1 on each frame while it's running.
You then create one or more
`Animation`s and attach them to the controller.

在 Flutter 中使用 `AnimationController`，
它是一个 `Animation<double>`，
可以暂停、跳转、停止并反向播放动画。
它需要一个 `Ticker`，用来在发生 vsync 时发出信号，
并在运行期间于每一帧产生
0 到 1 之间的线性插值。
然后再创建一个或多个 `Animation`，
并把它们挂到这个控制器上。

For example, you might use `CurvedAnimation`
to implement an animation along an interpolated curve.
In this sense, the controller is the "master" source
of the animation progress
and the `CurvedAnimation` computes the curve
that replaces the controller's default linear motion.
Like widgets, animations in Flutter work with composition.

例如，可以用 `CurvedAnimation`
实现一段沿插值曲线进行的动画。
从这个意义上说，控制器是动画进度的「主」来源，
而 `CurvedAnimation` 会计算出一条曲线，
用来替换控制器默认的线性运动。
与 widget 一样，Flutter 中的动画也依靠组合来工作。

When building the widget tree you assign the `Animation` to an animated
property of a widget, such as the opacity of a `FadeTransition`,
and tell the controller to start the animation.

构建 widget 树时，把 `Animation` 赋给 widget 的某个动画属性，
例如 `FadeTransition` 的不透明度，
再让控制器开始播放动画。

The following example shows how to write a `FadeTransition` that
fades the widget into a logo when you press the `FloatingActionButton`:

下面的示例演示如何编写一个 `FadeTransition`：
按下 `FloatingActionButton` 时，
这个 widget 会淡入为一个 logo。

<?code-excerpt "lib/animation.dart"?>
```dart
import 'package:flutter/material.dart';

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  const SampleApp({super.key});

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

class _MyFadeTest extends State<MyFadeTest>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;
  late CurvedAnimation curve;

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
  void dispose() {
    controller.dispose();
    super.dispose();
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

更多信息请参阅 [动画与动效 widget][Animation & Motion widgets]、
[动画教程][Animations tutorial]
以及 [动画概览][Animations overview]。

### Drawing on the screen

### 在屏幕上绘制

In UIKit, you use `CoreGraphics` to draw lines and shapes to the
screen. Flutter has a different API based on the `Canvas` class,
with two other classes that help you draw: `CustomPaint` and `CustomPainter`,
the latter of which implements your algorithm to draw to the canvas.

在 UIKit 中，使用 `CoreGraphics`
把线条和形状绘制到屏幕上。
Flutter 则提供基于 `Canvas` 类的另一套 API，
另外还有两个协助绘制的类：`CustomPaint` 和 `CustomPainter`，
后者用来实现你绘制到画布上的算法。

To learn how to implement a signature painter in Flutter,
see Collin's answer on [StackOverflow][].

若要了解如何在 Flutter 中实现签名绘制器，
请参阅 Collin 在 [StackOverflow][StackOverflow] 上的回答。

[StackOverflow]: {{site.so}}/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter

<?code-excerpt "lib/canvas.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: DemoApp()));

class DemoApp extends StatelessWidget {
  const DemoApp({super.key});

  @override
  Widget build(BuildContext context) => const Scaffold(body: Signature());
}

class Signature extends StatefulWidget {
  const Signature({super.key});

  @override
  State<Signature> createState() => SignatureState();
}

class SignatureState extends State<Signature> {
  List<Offset?> _points = <Offset?>[];
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (details) {
        setState(() {
          RenderBox? referenceBox = context.findRenderObject() as RenderBox;
          Offset localPosition = referenceBox.globalToLocal(
            details.globalPosition,
          );
          _points = List.from(_points)..add(localPosition);
        });
      },
      onPanEnd: (details) => _points.add(null),
      child: CustomPaint(
        painter: SignaturePainter(_points),
        size: Size.infinite,
      ),
    );
  }
}

class SignaturePainter extends CustomPainter {
  SignaturePainter(this.points);

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

### Widget opacity

### Widget 不透明度

In UIKit, everything has `.opacity` or `.alpha`.
In Flutter, most of the time you need to
wrap a widget in an `Opacity` widget to accomplish this.

在 UIKit 中，几乎所有对象都有 `.opacity` 或 `.alpha`。
在 Flutter 中，多数时候需要
把 widget 包进一个 `Opacity` widget 才能做到这一点。

### Custom Widgets

### 自定义 Widget

In UIKit, you typically subclass `UIView`, or use a pre-existing view,
to override and implement methods that achieve the desired behavior.
In Flutter, build a custom widget by [composing][] smaller widgets
(instead of extending them).

在 UIKit 中，你通常会子类化 `UIView`，或使用一个已有视图，
通过重写并实现方法来达到期望的行为。
在 Flutter 中，自定义 widget 的方式是
[组合][composing] 更小的 widget
（而不是去继承它们）。

For example, how do you build a `CustomButton`
that takes a label in the constructor?
Create a CustomButton that composes a `ElevatedButton` with a label,
rather than by extending `ElevatedButton`:

例如，怎样构建一个在构造函数里接收标签的 `CustomButton`？
创建一个由带标签的 `ElevatedButton` 组合而成的 CustomButton，
而不是通过继承 `ElevatedButton`：

<?code-excerpt "lib/custom.dart (custom-button)"?>
```dart
class CustomButton extends StatelessWidget {
  const CustomButton(this.label, {super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: () {}, child: Text(label));
  }
}
```

Then use `CustomButton`,
just as you'd use any other Flutter widget:

然后就可以使用 `CustomButton`，
用法与其他任何 Flutter widget 相同：

<?code-excerpt "lib/custom.dart (use-custom-button)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Center(child: CustomButton('Hello'));
}
```

### Managing dependencies

### 管理依赖

In iOS, you add dependencies with CocoaPods by adding to your `Podfile`.
Flutter uses Dart's build system and the Pub package manager
to handle dependencies. The tools delegate the building of the
native Android and iOS wrapper apps to the
respective build systems.

在 iOS 中，添加依赖的方式是把它们写进 `Podfile`，
交由 CocoaPods 处理。
Flutter 使用 Dart 的构建系统以及 Pub package 管理器
来处理依赖。这些工具会把
原生 Android 与 iOS 包装应用的构建工作，
交给各自的构建系统。

While there is a Podfile in the iOS folder in your
Flutter project, only use this if you are adding native
dependencies needed for per-platform integration.
In general, use `pubspec.yaml` to declare external dependencies in Flutter.
A good place to find great packages for Flutter is on [pub.dev][].

Flutter 项目的 iOS 文件夹里虽然存在 Podfile，
但只有在添加各平台集成所需的原生依赖时才使用它。
一般情况下，用 `pubspec.yaml` 在 Flutter 中声明外部依赖。
寻找优秀 Flutter package 的好去处是 [pub.dev][]。

## Navigation

## 导航

This section of the document discusses navigation
between pages of an app, the push and pop mechanism, and more.

本节讨论应用内页面之间的导航、
push 与 pop 机制，以及其他相关内容。

### Navigating between pages

### 在页面之间导航

In UIKit, to travel between view controllers, you can use a
`UINavigationController` that manages the stack of view controllers
to display.

在 UIKit 中，要在视图控制器之间往来，
可以使用 `UINavigationController`，
由它管理待显示的视图控制器栈。

Flutter has a similar implementation,
using a `Navigator` and `Routes`.
A `Route` is an abstraction for a "screen" or "page" of an app,
and a `Navigator` is a [widget][]
that manages routes. A route roughly maps to a
`UIViewController`. The navigator works in a similar way to the iOS
`UINavigationController`, in that it can `push()` and `pop()`
routes depending on whether you want to navigate to, or back from, a view.

Flutter 有类似的实现，
使用 `Navigator` 和 `Route`。
`Route` 是应用中「屏幕」或「页面」的抽象，
`Navigator` 则是管理路由的 [widget][]。
一条路由大致对应一个 `UIViewController`。
导航器的工作方式与 iOS 的 `UINavigationController` 相近：
要进入某个视图时，它对路由执行 `push()`；
要从该视图返回时，则执行 `pop()`。

To navigate between pages, you have a couple options:

在页面之间导航，有下面两种做法：

* Specify a `Map` of route names.

  指定一份路由名称的 `Map`。

* Directly navigate to a route.

  直接导航到某条路由。

The following example builds a `Map.`

下面的示例会构建一个 `Map`。

<?code-excerpt "lib/intent.dart (map)"?>
```dart
void main() {
  runApp(
    CupertinoApp(
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

Navigate to a route by `push`ing its name to the `Navigator`.

把路由的名称 `push` 给 `Navigator`，即可导航到该路由。

<?code-excerpt "lib/intent.dart (push)"?>
```dart
Navigator.of(context).pushNamed('/b');
```

The `Navigator` class handles routing in Flutter and is used to get
a result back from a route that you have pushed on the stack.
This is done by `await`ing on the `Future` returned by `push()`.

`Navigator` 类在 Flutter 中负责路由，
也可以从已经压入栈中的路由取回结果。
具体做法是 `await` `push()` 所返回的 `Future`。

For example, to start a `location` route that lets the user select their
location, you might do the following:

例如，要打开一条让用户选择自己位置的 `location` 路由，
可以这样做：

<?code-excerpt "lib/intent.dart (push-await)"?>
```dart
Object? coordinates = await Navigator.of(context).pushNamed('/location');
```

And then, inside your `location` route, once the user has selected their
location, `pop()` the stack with the result:

然后，在 `location` 路由内部，
一旦用户选定了位置，就带着结果 `pop()` 出栈：

<?code-excerpt "lib/intent.dart (pop)"?>
```dart
Navigator.of(context).pop({'lat': 43.821757, 'long': -79.226392});
```

### Navigating to another app

### 跳转到另一个应用

In UIKit, to send the user to another application,
you use a specific URL scheme.
For the system level apps, the scheme depends on the app.
To implement this functionality in Flutter,
create a native platform integration, or use an
[existing plugin][], such as [`url_launcher`][].

在 UIKit 中，要把用户送到另一个应用，
需要使用特定的 URL scheme。
对于系统级应用，scheme 取决于具体是哪个应用。
要在 Flutter 中实现这一功能，
可以编写原生平台集成，也可以使用
[现有插件][existing plugin]，例如 [`url_launcher`][]。

### Manually pop back

### 手动返回

Calling `SystemNavigator.pop()` from your Dart code
invokes the following iOS code:

在 Dart 代码中调用 `SystemNavigator.pop()`
会执行下面这段 iOS 代码：

```objc
UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
if ([viewController isKindOfClass:[UINavigationController class]]) {
  [((UINavigationController*)viewController) popViewControllerAnimated:NO];
}
```

If that doesn't do what you want, you can create your own
[platform channel][] to invoke arbitrary iOS code.

如果这并不能满足你的需要，可以创建自己的
[平台通道][platform channel]，用来调用任意 iOS 代码。

### Handling localization

### 处理本地化

Unlike iOS, which has the `Localizable.strings` file,
Flutter doesn't currently have a dedicated system for handling strings.
At the moment, the best practice is to declare your copy text
in a class as static fields and access them from there. For example:

iOS 拥有 `Localizable.strings` 文件，
Flutter 目前还没有专门用来处理字符串的系统。
现阶段的最佳做法是把文案声明为类里的静态字段，
再从那里读取。例如：

<?code-excerpt "lib/string_examples.dart (strings)"?>
```dart
class Strings {
  static const String welcomeMessage = 'Welcome To Flutter';
}
```

You can access your strings as such:

可以这样访问你的字符串：

<?code-excerpt "lib/string_examples.dart (access-string)" replace="/const //g; /return //g;"?>
```dart
Text(Strings.welcomeMessage);
```

By default, Flutter only supports US English for its strings.
If you need to add support for other languages,
include the `flutter_localizations` package.
You might also need to add Dart's [`intl`][]
package to use i10n machinery, such as date/time formatting.

默认情况下，Flutter 的字符串只支持美式英语。
如果需要增加对其他语言的支持，
请引入 `flutter_localizations` package。
你可能还需要加入 Dart 的 [`intl`][]
package，才能使用国际化机制，例如日期与时间的格式化。

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any # Use version of intl from flutter_localizations.
```

To use the `flutter_localizations` package,
specify the `localizationsDelegates` and
`supportedLocales` on the app widget:

要使用 `flutter_localizations` package，
请在应用 widget 上指定 `localizationsDelegates`
和 `supportedLocales`：

<?code-excerpt "lib/localizations_example.dart"?>
```dart
import 'package:flutter/material.dart';
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

这些委托里存放实际的本地化值，
而 `supportedLocales` 定义应用支持哪些语言区域。
上面的示例使用的是 `MaterialApp`，
因此它同时包含用于基础 widget 本地化值的
`GlobalWidgetsLocalizations`，
以及用于 Material widget 本地化的 `MaterialWidgetsLocalizations`。
如果应用使用的是 `WidgetsApp`，就不需要后者。
请注意，这两个委托包含的是「默认」值。
如果你还希望应用自己的可本地化文案也被本地化，
就需要再提供一个或多个委托。

When initialized, the `WidgetsApp` (or `MaterialApp`)
creates a [`Localizations`][] widget for you,
with the delegates you specify.
The current locale for the device is always accessible
from the `Localizations` widget from the current context
(in the form of a `Locale` object), or using the [`Window.locale`][].

初始化时，`WidgetsApp`（或 `MaterialApp`）
会用你指定的委托，
为你创建一个 [`Localizations`][] widget。
设备当前的语言区域始终可以从当前 context 里的
`Localizations` widget 取得（形式是一个 `Locale` 对象），
也可以通过 [`Window.locale`][] 取得。

To access localized resources, use the `Localizations.of()` method
to access a specific localizations class that is provided by a given delegate.
Use the [`intl_translation`][] package to extract translatable copy
to [arb][] files for translating, and importing them back into the app
for using them with `intl`.

要访问本地化资源，使用 `Localizations.of()` 方法，
取得某个委托所提供的特定本地化类。
使用 [`intl_translation`][] package，
把可翻译文案提取到 [arb][arb] 文件中进行翻译，
再导回应用，配合 `intl` 使用。

For further details on internationalization and localization in Flutter,
see the [internationalization guide][], which has sample code
with and without the `intl` package.

关于 Flutter 中国际化与本地化的更多细节，
请参阅 [国际化指南][internationalization guide]。
其中提供了使用 `intl` package 和不使用它的示例代码。

## ViewControllers

## ViewControllers 控制器

This section of the document discusses the equivalent
of ViewController in Flutter and how to listen to
lifecycle events.

本节讨论 Flutter 中与 ViewController 对应的概念，
以及如何监听生命周期事件。

### Equivalent of ViewController in Flutter

### Flutter 中与 ViewController 对应的概念

In UIKit, a `ViewController` represents a portion of user interface,
most commonly used for a screen or section.
These are composed together to build complex user interfaces,
and help scale your application's UI.
In Flutter, this job falls to Widgets.
As mentioned in the Navigation section,
screens in Flutter are represented by Widgets since
"everything is a widget!"
Use a `Navigator` to move between different `Route`s
that represent different screens or pages,
or maybe different states or renderings of the same data.

在 UIKit 中，`ViewController` 代表用户界面的一部分，
最常用于一个屏幕或一个区块。
它们被组合在一起，以构建复杂的用户界面，
并帮助扩展应用的 UI。
在 Flutter 中，这项工作由 Widget 承担。
正如导航一节所说，
Flutter 里的屏幕由 Widget 来表示，
因为「一切皆 widget！」
使用 `Navigator` 在不同的 `Route` 之间移动，
这些路由代表不同的屏幕或页面，
也可能是同一份数据的不同状态或不同呈现。

### Listening to lifecycle events

### 监听生命周期事件

In UIKit, you can override methods to the `ViewController`
to capture lifecycle methods for the view itself,
or register lifecycle callbacks in the `AppDelegate`.
In Flutter, you have neither concept, but you can instead
listen to lifecycle events by hooking into
the `WidgetsBinding` observer and listening to
the `didChangeAppLifecycleState()` change event.

在 UIKit 中，你可以重写 `ViewController` 上的方法，
以捕获视图本身的生命周期方法，
也可以在 `AppDelegate` 中注册生命周期回调。
Flutter 里这两个概念都不存在，
但你可以接入 `WidgetsBinding` 的 observer，
并监听 `didChangeAppLifecycleState()` 变更事件，
从而收到生命周期事件。

The observable lifecycle events are:

可以观察到的生命周期事件有：

**`inactive`**
: The application is in an inactive state and is not receiving
user input. This event only works on iOS,
as there is no equivalent event on Android.

**`inactive`**
: 应用处于非活跃状态，并且不接收用户输入。
  此事件只在 iOS 上有效，
  Android 上没有对应事件。

**`paused`**
: The application is not currently visible to the user,
is not responding to user input, but is running in the background.

**`paused`**
: 应用当前对用户不可见，
  不响应用户输入，但仍在后台运行。

**`resumed`**
: The application is visible and responding to user input.

**`resumed`**
: 应用可见，并且正在响应用户输入。

**`suspending`**
: The application is suspended momentarily.
The iOS platform has no equivalent event.

**`suspending`**
: 应用被短暂挂起。
  iOS 平台没有对应事件。

For more details on the meaning of these states, see
[`AppLifecycleState` documentation][].

关于这些状态含义的更多细节，请参阅
[`AppLifecycleState` 文档][`AppLifecycleState` documentation]。

## Layouts

## 布局

This section discusses different layouts in Flutter
and how they compare with UIKit.

本节讨论 Flutter 中的不同布局，
以及它们与 UIKit 的对照。

### Displaying a list view

### 显示列表视图

In UIKit, you might show a list in
either a `UITableView` or a `UICollectionView`.
In Flutter, you have a similar implementation using a `ListView`.
In UIKit, these views have delegate methods
for deciding the number of rows,
the cell for each index path, and the size of the cells.

在 UIKit 中，你可能会用
`UITableView` 或 `UICollectionView` 来显示列表。
在 Flutter 中，对应的实现是 `ListView`。
在 UIKit 里，这些视图通过委托方法
决定行数、每个 index path 的单元格，以及单元格的尺寸。

Due to Flutter's immutable widget pattern,
you pass a list of widgets to your `ListView`,
and Flutter takes care of making sure that
scrolling is fast and smooth.

由于 Flutter 采用不可变 widget 这一模式，
你把一组 widget 传给 `ListView`，
Flutter 会负责让滚动保持快速、顺滑。

<?code-excerpt "lib/listview.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> _getListData() {
    final List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(
        Padding(padding: const EdgeInsets.all(10), child: Text('Row $i')),
      );
    }
    return widgets;
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

### Detecting what was clicked

### 检测点击了哪一项

In UIKit, you implement the delegate method,
`tableView:didSelectRowAtIndexPath:`.
In Flutter, use the touch handling provided by the passed-in widgets.

在 UIKit 中，你要实现委托方法
`tableView:didSelectRowAtIndexPath:`。
在 Flutter 中，使用所传入 widget 提供的触摸处理即可。

<?code-excerpt "lib/list_item_tapped.dart"?>
```dart
import 'dart:developer' as developer;

import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(
        GestureDetector(
          onTap: () {
            developer.log('row tapped');
          },
          child: Padding(
            padding: const EdgeInsets.all(10),
            child: Text('Row $i'),
          ),
        ),
      );
    }
    return widgets;
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

### Dynamically updating ListView

### 动态更新 ListView

In UIKit, you update the data for the list view,
and notify the table or collection view using the
`reloadData` method.

在 UIKit 中，你更新列表视图的数据，
再用 `reloadData` 方法通知 table 或 collection 视图。

In Flutter, if you update the list of widgets inside a `setState()`,
you quickly see that your data doesn't change visually.
This is because when `setState()` is called,
the Flutter rendering engine looks at the widget tree
to see if anything has changed.
When it gets to your `ListView`, it performs an `==` check,
and determines that the two `ListView`s are the same.
Nothing has changed, so no update is required.

在 Flutter 中，如果在 `setState()` 内部更新 widget 列表，
你会很快发现数据在画面上并没有变化。
这是因为调用 `setState()` 时，
Flutter 的渲染引擎会检查 widget 树，
看是否有内容发生了变化。
当检查到你的 `ListView` 时，它会做一次 `==` 比较，
并判定这两个 `ListView` 是相同的。
既然什么都没变，就不需要更新。

For a simple way to update your `ListView`,
create a new `List` inside of `setState()`,
and copy the data from the old list to the new list.
While this approach is simple,
it is not recommended for large data sets,
as shown in the next example.

一种简单的更新 `ListView` 的办法是：
在 `setState()` 内部新建一个 `List`，
并把旧列表中的数据复制到新列表。
这种做法虽然简单，
但不建议用于大数据集，
下一个示例会说明这一点。

<?code-excerpt "lib/listview_dynamic.dart"?>
```dart
import 'dart:developer' as developer;

import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
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

  Widget getRow(int i) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets = List.from(widgets);
          widgets.add(getRow(widgets.length));
          developer.log('row $i');
        });
      },
      child: Padding(padding: const EdgeInsets.all(10), child: Text('Row $i')),
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

The recommended, efficient,
and effective way to build a list uses a `ListView.Builder`.
This method is great when you have a dynamic
list or a list with very large amounts of data.

构建列表时，推荐、高效且有效的方式是使用 `ListView.builder`。
当列表是动态的，或数据量非常大时，这个方法很合适。

<?code-excerpt "lib/listview_builder.dart"?>
```dart
import 'dart:developer' as developer;

import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
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

  Widget getRow(int i) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length));
          developer.log('row $i');
        });
      },
      child: Padding(padding: const EdgeInsets.all(10), child: Text('Row $i')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView.builder(
        itemCount: widgets.length,
        itemBuilder: (context, position) {
          return getRow(position);
        },
      ),
    );
  }
}
```

Instead of creating a `ListView`, create a `ListView.builder`
that takes two key parameters: the initial length of the list,
and an `ItemBuilder` function.

可以不直接创建 `ListView`，
而是创建 `ListView.builder`。
它接收两个关键参数：列表的初始长度，
以及一个 `ItemBuilder` 函数。

The `ItemBuilder` function is similar to the `cellForItemAt`
delegate method in an iOS table or collection view,
as it takes a position, and returns the
cell you want rendered at that position.

`ItemBuilder` 函数类似于 iOS 的 table 或 collection 视图中
`cellForItemAt` 这一委托方法：
它接收一个位置，并返回希望在该位置渲染的单元格。

Finally, but most importantly, notice that the `onTap()` function
doesn't recreate the list anymore, but instead `.add`s to it.

最后，也是最重要的一点：注意 `onTap()` 函数
不再重新创建列表，而是对列表执行 `.add`。

### Creating a scroll view

### 创建滚动视图

In UIKit, you wrap your views in a `ScrollView` that
allows a user to scroll your content if needed.

在 UIKit 中，你把视图包进 `ScrollView`，
这样用户就可以在需要时滚动内容。

In Flutter the easiest way to do this is using the `ListView` widget.
This acts as both a `ScrollView` and an iOS `TableView`,
as you can lay out widgets in a vertical format.

在 Flutter 中，最简单的做法是使用 `ListView` widget。
它同时起到 `ScrollView` 和 iOS `TableView` 的作用，
因为你可以把 widget 按垂直方向排布。

<?code-excerpt "lib/layout.dart (list-view)"?>
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

For more detailed docs on how to lay out widgets in Flutter,
see the [layout tutorial][].

关于如何在 Flutter 中排布 widget 的更详细文档，
请参阅 [布局教程][layout tutorial]。

## Gesture detection and touch event handling

## 手势检测与触摸事件处理

This section discusses how to detect gestures
and handle different events in Flutter,
and how they compare with UIKit.

本节讨论如何在 Flutter 中检测手势并处理不同事件，
以及这些做法与 UIKit 的对照。

### Adding a click listener

### 添加点击监听

In UIKit, you attach a `GestureRecognizer` to a view to
handle click events.
In Flutter, there are two ways of adding touch listeners:

在 UIKit 中，你把 `GestureRecognizer` 附加到视图上，
用来处理点击事件。
在 Flutter 中，添加触摸监听有两种方式：

1. If the widget supports event detection, pass a function to it,
   and handle the event in the function. For example, the
   `ElevatedButton` widget has an `onPressed` parameter:

   如果该 widget 支持事件检测，就把一个函数传给它，
   并在函数里处理事件。例如，
   `ElevatedButton` widget 有一个 `onPressed` 参数：

  <?code-excerpt "lib/events.dart (on-pressed)"?>
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

2. If the Widget doesn't support event detection,
   wrap the widget in a GestureDetector and pass a function
   to the `onTap` parameter.

   如果该 Widget 不支持事件检测，
   就把这个 widget 包进 GestureDetector，
   并把函数传给 `onTap` 参数。

  <?code-excerpt "lib/events.dart (on-tap)"?>
   ```dart
  class SampleTapApp extends StatelessWidget {
    const SampleTapApp({super.key});
  
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

### Handling other gestures

### 处理其他手势

Using `GestureDetector` you can listen
to a wide range of gestures such as:

借助 `GestureDetector`，你可以监听多种手势，例如：

* **Tapping**

  **点击**

  **`onTapDown`**
  : A pointer that might cause a tap has contacted the
  screen at a particular location.

  **`onTapDown`**
  : 可能引发点击的指针已在特定位置接触屏幕。

  **`onTapUp`**
  : A pointer that triggers a tap has stopped contacting the
  screen at a particular location.

  **`onTapUp`**
  : 触发点击的指针已在特定位置停止接触屏幕。

  **`onTap`**
  : A tap has occurred.

  **`onTap`**
  : 已经发生了一次点击。

  **`onTapCancel`**
  : The pointer that previously triggered the `onTapDown`
  won't cause a tap.

  **`onTapCancel`**
  : 先前触发过 `onTapDown` 的指针不会再造成一次点击。

* **Double tapping**

  **双击**

  **`onDoubleTap`**
  : The user tapped the screen at the same location twice in
  quick succession.

  **`onDoubleTap`**
  : 用户在同一位置快速连续点击了屏幕两次。

* **Long pressing**

  **长按**

  **`onLongPress`**
  : A pointer has remained in contact with the screen
  at the same location for a long period of time.

  **`onLongPress`**
  : 指针在同一位置与屏幕保持了较长时间的接触。

* **Vertical dragging**

  **垂直拖动**

  **`onVerticalDragStart`**
  : A pointer has contacted the screen and might begin to
  move vertically.

  **`onVerticalDragStart`**
  : 指针已接触屏幕，并可能开始垂直移动。

  **`onVerticalDragUpdate`**
  : A pointer in contact with the screen
  has moved further in the vertical direction.

  **`onVerticalDragUpdate`**
  : 与屏幕接触的指针在垂直方向上又移动了一段距离。

  **`onVerticalDragEnd`**
  : A pointer that was previously in contact with the
  screen and moving vertically is no longer in contact
  with the screen and was moving at a specific velocity
  when it stopped contacting the screen.

  **`onVerticalDragEnd`**
  : 先前接触屏幕并垂直移动的指针已经不再接触屏幕，
  并且在停止接触时具有特定速度。

* **Horizontal dragging**

  **水平拖动**

  **`onHorizontalDragStart`**
  : A pointer has contacted the screen and might begin
  to move horizontally.

  **`onHorizontalDragStart`**
  : 指针已接触屏幕，并可能开始水平移动。

  **`onHorizontalDragUpdate`**
  : A pointer in contact with the screen
  has moved further in the horizontal direction.

  **`onHorizontalDragUpdate`**
  : 与屏幕接触的指针在水平方向上又移动了一段距离。

  **`onHorizontalDragEnd`**
  : A pointer that was previously in contact with the
  screen and moving horizontally is no longer in
  contact with the screen.

  **`onHorizontalDragEnd`**
  : 先前接触屏幕并水平移动的指针已经不再与屏幕接触。

The following example shows a `GestureDetector`
that rotates the Flutter logo on a double tap:

下面的示例展示一个 `GestureDetector`，
它会在双击时旋转 Flutter logo：

<?code-excerpt "lib/events.dart (sample-app)"?>
```dart
class SampleApp extends StatefulWidget {
  const SampleApp({super.key});

  @override
  State<SampleApp> createState() => _SampleAppState();
}

class _SampleAppState extends State<SampleApp>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;
  late CurvedAnimation curve;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
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

## Themes, styles, and media

## 主题、样式与媒体

Flutter applications are easy to style; you can switch
between light and dark themes,
change the style of your text and UI components,
and more. This section covers aspects of styling your Flutter apps
and compares how you might do the same in UIKit.

Flutter 应用的样式很容易调整。
你可以在浅色主题与深色主题之间切换，
也可以改变文本和 UI 组件的样式。
本节介绍为 Flutter 应用设置样式的若干方面，
并对照在 UIKit 中可以如何做同样的事。

### Using a theme

### 使用主题

Out of the box, Flutter comes with a beautiful implementation
of Material Design, which takes care of a lot of styling and
theming needs that you would typically do.

Flutter 开箱即带有一套出色的 Material Design 实现，
它承担了许多通常要由你自己完成的样式与主题工作。

To take full advantage of Material Components in your app,
declare a top-level widget, `MaterialApp`,
as the entry point to your application.
`MaterialApp` is a convenience widget that wraps a number
of widgets that are commonly required for applications
implementing Material Design.
It builds upon a `WidgetsApp` by adding Material specific functionality.

要在应用中充分利用 Material 组件，
请把顶层 widget `MaterialApp`
声明为应用的入口。
`MaterialApp` 是一个便捷 widget，
它包裹了实现 Material Design 的应用通常需要的一批 widget。
它在 `WidgetsApp` 的基础上增加了 Material 特有的功能。

But Flutter is flexible and expressive enough to implement
any design language. On iOS, you can use the
[Cupertino library][] to produce an interface that adheres to the
[Human Interface Guidelines][].
For the full set of these widgets,
see the [Cupertino widgets][] gallery.

同时，Flutter 足够灵活，表达力也足够强，
可以实现任何设计语言。在 iOS 上，你可以使用
[Cupertino 库][Cupertino library]，
做出符合 [人机界面指南][Human Interface Guidelines] 的界面。
这些 widget 的完整集合，
请参阅 [Cupertino widget][Cupertino widgets] 图库。

You can also use a `WidgetsApp` as your app widget,
which provides some of the same functionality,
but is not as rich as `MaterialApp`.

你也可以把 `WidgetsApp` 用作应用 widget。
它提供一部分相同的功能，
但没有 `MaterialApp` 那么丰富。

To customize the colors and styles of any child components,
pass a `ThemeData` object to the `MaterialApp` widget.
For example, in the code below,
the color scheme from seed is set to deepPurple and divider color is grey.

要自定义任意子组件的颜色和样式，
把一个 `ThemeData` 对象传给 `MaterialApp` widget。
例如在下面的代码中，
由种子色生成的配色方案被设为 deepPurple，
分隔线颜色为 grey。

<?code-excerpt "lib/theme.dart (theme)"?>
```dart
import 'package:flutter/material.dart';

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        dividerColor: Colors.grey,
      ),
      home: const SampleAppPage(),
    );
  }
}
```

### Using custom fonts

### 使用自定义字体

In UIKit, you import any `ttf` font files into your project
and create a reference in the `info.plist` file.
In Flutter, place the font file in a folder
and reference it in the `pubspec.yaml` file,
similar to how you import images.

在 UIKit 中，你把任意 `ttf` 字体文件导入项目，
并在 `info.plist` 文件里建立引用。
在 Flutter 中，把字体文件放进某个文件夹，
再在 `pubspec.yaml` 文件中引用它，
做法与导入图片类似。

```yaml
fonts:
  - family: MyCustomFont
    fonts:
      - asset: fonts/MyCustomFont.ttf
      - style: italic
```

Then assign the font to your `Text` widget:

然后把该字体指定给 `Text` widget：

<?code-excerpt "lib/text.dart (custom-font)"?>
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

### Styling text

### 设置文本样式

Along with fonts, you can customize other styling elements on a `Text` widget.
The style parameter of a `Text` widget takes a `TextStyle` object,
where you can customize many parameters, such as:

除了字体，你还可以自定义 `Text` widget 上的其他样式。
`Text` widget 的 `style` 参数接收一个 `TextStyle` 对象，
你可以在其中自定义许多参数，例如：

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

### Bundling images in apps

### 在应用中打包图片

While iOS treats images and assets as distinct items,
Flutter apps have only assets. Resources that are
placed in the `Images.xcasset` folder on iOS,
are placed in an assets' folder for Flutter.
As with iOS, assets are any type of file, not just images.
For example, you might have a JSON file located in the `my-assets` folder:

iOS 把图片和资源视为不同的事物，
Flutter 应用里则只有资源。
放在 iOS 的 `Images.xcasset` 文件夹中的资源，
在 Flutter 里放进 assets 文件夹。
与 iOS 一样，资源可以是任何类型的文件，并不只有图片。
例如，你可能在 `my-assets` 文件夹中放有一个 JSON 文件：

```plaintext
my-assets/data.json
```

Declare the asset in the `pubspec.yaml` file:

在 `pubspec.yaml` 文件中声明该资源：

```yaml
assets:
 - my-assets/data.json
```

And then access it from code using an [`AssetBundle`][]:

然后在代码里通过 [`AssetBundle`][] 访问它：

<?code-excerpt "lib/asset_bundle.dart"?>
```dart
import 'dart:async' show Future;

import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('my-assets/data.json');
}
```

For images, Flutter follows a simple density-based format like iOS.
Image assets might be `1.0x`, `2.0x`, `3.0x`, or any other multiplier.
Flutter's [`devicePixelRatio`][] expresses the ratio
of physical pixels in a single logical pixel.

对于图片，Flutter 采用与 iOS 类似的、基于密度的简单格式。
图片资源可以是 `1.0x`、`2.0x`、`3.0x`，或其他任意倍率。
Flutter 的 [`devicePixelRatio`][] 表示
一个逻辑像素对应多少物理像素。

Assets are located in any arbitrary folder&mdash;
Flutter has no predefined folder structure.
You declare the assets (with location) in
the `pubspec.yaml` file, and Flutter picks them up.

资源可以放在任意文件夹里，
Flutter 没有预定义的文件夹结构。
你在 `pubspec.yaml` 文件中声明资源（连同它们的位置），
Flutter 就会把它们收录进来。

For example, to add an image called `my_icon.png` to your Flutter
project, you might decide to store it in a folder arbitrarily called `images`.
Place the base image (1.0x) in the `images` folder, and the
other variants in sub-folders named after the appropriate ratio multiplier:

例如，要把名为 `my_icon.png` 的图片加入 Flutter 项目，
你可以决定把它放在一个随意命名为 `images` 的文件夹中。
把基准图片 (1.0x) 放在 `images` 文件夹里，
其他变体放在以相应倍率命名的子文件夹中：

```plaintext
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

Next, declare these images in the `pubspec.yaml` file:

接下来，在 `pubspec.yaml` 文件中声明这些图片：

```yaml
assets:
 - images/my_icon.png
```

You can now access your images using `AssetImage`:

现在可以使用 `AssetImage` 访问你的图片：

<?code-excerpt "lib/images.dart (asset-image)"?>
```dart
image: AssetImage('images/a_dot_burr.png'),
```

or directly in an `Image` widget:

也可以直接放在 `Image` widget 中：

<?code-excerpt "lib/images.dart (image-asset)"?>
```dart
@override
Widget build(BuildContext context) {
  return Image.asset('images/my_image.png');
}
```

For more details, see
[Adding Assets and Images in Flutter][].

更多细节请参阅
[在 Flutter 中添加资源和图片][Adding Assets and Images in Flutter]。

## Form input

## 表单输入

This section discusses how to use forms in Flutter
and how they compare with UIKit.

本节讨论如何在 Flutter 中使用表单，
以及它们与 UIKit 的对照。

### Retrieving user input

### 获取用户输入

Given how Flutter uses immutable widgets with a separate state,
you might be wondering how user input fits into the picture.
In UIKit, you usually query the widgets for their current values
when it's time to submit the user input, or action on it.
How does that work in Flutter?

既然 Flutter 使用的是带有独立状态的不可变 widget，
你可能会想知道用户输入在这套模型里如何安放。
在 UIKit 中，通常是在需要提交用户输入或据此执行操作时，
向这些控件查询它们的当前值。
在 Flutter 中又是怎样做的？

In practice forms are handled, like everything in Flutter,
by specialized widgets. If you have a `TextField` or a
`TextFormField`, you can supply a [`TextEditingController`][]
to retrieve user input:

在实践中，表单与 Flutter 里的其他事物一样，
由专门的 widget 来处理。如果你有 `TextField`
或 `TextFormField`，可以提供一个 [`TextEditingController`][]
来取回用户输入：

<?code-excerpt "lib/form.dart (my-form-state)"?>
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
      appBar: AppBar(title: const Text('Retrieve Text Input')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: TextField(controller: myController),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog with the
        // text the user has typed into our text field.
        onPressed: () {
          showDialog<void>(
            context: context,
            builder: (context) {
              return AlertDialog(
                // Retrieve the text the user has typed in using our
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
[Retrieve the value of a text field][].

更多信息以及完整代码请参阅
[获取文本框的值][Retrieve the value of a text field]。

### Placeholder in a text field

### 文本框中的占位文本

In Flutter, you can easily show a "hint" or a placeholder text
for your field by adding an `InputDecoration` object
to the decoration constructor parameter for the `Text` widget:

在 Flutter 中，可以很容易地为输入框显示一段「提示」或占位文本：
把一个 `InputDecoration` 对象加到 `Text` widget
的 decoration 构造参数上即可：

<?code-excerpt "lib/form.dart (input-hint)" replace="/return const //g;/;//g"?>
```dart
Center(
  child: TextField(decoration: InputDecoration(hintText: 'This is a hint')),
)
```

### Showing validation errors

### 显示校验错误

Just as you would with a "hint", pass an `InputDecoration` object
to the decoration constructor for the `Text` widget.

与显示「提示」时一样，把一个 `InputDecoration` 对象
传给 `Text` widget 的 decoration 构造参数。

However, you don't want to start off by showing an error.
Instead, when the user has entered invalid data,
update the state, and pass a new `InputDecoration` object.

不过，你并不会希望一开始就显示错误。
应当在用户输入了无效数据之后，
更新状态，并传入一个新的 `InputDecoration` 对象。

<?code-excerpt "lib/validation_errors.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String? _errorText;

  bool isEmail(String em) {
    String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|'
        r'(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|'
        r'(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = RegExp(emailRegexp);

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
            errorText: _errorText,
          ),
        ),
      ),
    );
  }
}
```

## Threading & asynchronicity

## 线程与异步

This section discusses concurrency in Flutter and
how it compares with UIKit.

本节讨论 Flutter 中的并发，
以及它与 UIKit 的对照。

### Writing asynchronous code

### 编写异步代码

Dart has a single-threaded execution model,
with support for `Isolate`s
(a way to run Dart code on another thread),
an event loop, and asynchronous programming.
Unless you spawn an `Isolate`,
your Dart code runs in the main UI thread and is
driven by an event loop. Flutter's event loop is
equivalent to the iOS main loop&mdash;that is,
the `Looper` that is attached to the main thread.

Dart 采用单线程执行模型，
同时支持 `Isolate`
（一种在另一个线程上运行 Dart 代码的方式）、
事件循环，以及异步编程。
除非你创建一个 `Isolate`，
否则你的 Dart 代码会运行在主 UI 线程上，
并由事件循环驱动。Flutter 的事件循环
等同于 iOS 的主循环，
也就是附着在主线程上的那个 `Looper`。

Dart's single-threaded model doesn't mean you are
required to run everything as a blocking operation
that causes the UI to freeze. Instead,
use the asynchronous facilities that the Dart language provides,
such as `async`/`await`, to perform asynchronous work.

Dart 的单线程模型并不表示
你必须把所有事情都当成会让 UI 卡住的阻塞操作来跑。
请改用 Dart 语言提供的异步能力，
例如 `async`/`await`，来完成异步工作。

For example, you can run network code without causing the
UI to hang by using `async`/`await` and letting Dart do
the heavy lifting:

例如，借助 `async`/`await`，把繁重的工作交给 Dart，
就可以运行网络代码，而不会让 UI 卡住：

<?code-excerpt "lib/async.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

Once the `await`ed network call is done,
update the UI by calling `setState()`,
which triggers a rebuild of the widget subtree
and updates the data.

一旦被 `await` 的网络调用完成，
就调用 `setState()` 来更新 UI。
这会触发 widget 子树的重建，并更新数据。

The following example loads data asynchronously and
displays it in a `ListView`:

下面的示例会异步加载数据，
并把它显示在 `ListView` 中：

<?code-excerpt "lib/async.dart"?>
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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> data = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Future<void> loadData() async {
    final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    final http.Response response = await http.get(dataURL);
    setState(() {
      data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
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

Refer to the next section for more information on doing work
in the background, and how Flutter differs from iOS.

关于如何在后台执行工作，以及 Flutter 与 iOS 有何不同，
请参阅下一节。

### Moving to the background thread

### 转到后台线程

Since Flutter is single threaded and runs an event loop
(like Node.js), you don't have to worry about
thread management or spawning background threads.
If you're doing I/O-bound work,
such as disk access or a network call,
then you can safely use `async`/`await` and you're done.
If, on the other hand, you need to do computationally intensive
work that keeps the CPU busy, you want to move it to an
`Isolate` to avoid blocking the event loop.

由于 Flutter 是单线程的，并且运行着一个事件循环
（与 Node.js 类似），你不必担心
线程管理，也不必自己创建后台线程。
如果做的是 I/O 密集型工作，
例如磁盘访问或网络调用，
那么放心使用 `async`/`await` 即可。
反过来，如果你需要做会让 CPU 持续忙碌的计算密集型工作，
就应该把它移到 `Isolate` 中，以免阻塞事件循环。

For I/O-bound work, declare the function as an `async` function,
and `await` on long-running tasks inside the function:

对于 I/O 密集型工作，把函数声明为 `async` 函数，
并在函数内部 `await` 那些耗时任务：

<?code-excerpt "lib/async.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

This is how you typically do network or database calls,
which are both I/O operations.

网络调用和数据库调用通常都是这样处理的，
它们都属于 I/O 操作。

However, there are times when you might be processing
a large amount of data and your UI hangs.
In Flutter, use `Isolate`s to take advantage of
multiple CPU cores to do long-running or
computationally intensive tasks.

不过，有时你要处理的数据量很大，UI 会因此卡住。
在 Flutter 中，使用 `Isolate` 来利用多个 CPU 核心，
执行耗时或计算密集型的任务。

Isolates are separate execution threads that do not share
any memory with the main execution memory heap.
This means you can't access variables from the main thread,
or update your UI by calling `setState()`.
Isolates are true to their name, and cannot share memory
(in the form of static fields, for example).

Isolate 是彼此独立的执行线程，
不与主执行线程的内存堆共享任何内存。
这意味着你不能访问主线程上的变量，
也不能通过调用 `setState()` 来更新 UI。
Isolate 名副其实，不能共享内存
（例如不能以静态字段的形式共享）。

The following example shows, in a simple isolate,
how to share data back to the main thread to update the UI.

下面的示例用一个简单的 isolate，
演示如何把数据回传给主线程，以便更新 UI。

<?code-excerpt "lib/isolates.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message.
  final SendPort sendPort = await receivePort.first as SendPort;

  final List<Map<String, dynamic>> msg = await sendReceive(
    sendPort,
    'https://jsonplaceholder.typicode.com/posts',
  );

  setState(() {
    data = msg;
  });
}

// The entry point for the isolate.
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

这里的 `dataLoader()` 就是那个 `Isolate`，
它运行在自己独立的执行线程里。
在 isolate 中，你可以做更耗费 CPU 的处理
（例如解析一份很大的 JSON），
也可以做计算密集的数学运算，
例如加密或信号处理。

You can run the full example below:

你可以运行下面的完整示例：

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> data = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  bool get showLoadingDialog => data.isEmpty;

  Future<void> loadData() async {
    final ReceivePort receivePort = ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message.
    final SendPort sendPort = await receivePort.first as SendPort;

    final List<Map<String, dynamic>> msg = await sendReceive(
      sendPort,
      'https://jsonplaceholder.typicode.com/posts',
    );

    setState(() {
      data = msg;
    });
  }

  // The entry point for the isolate.
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
    bool showLoadingDialog = data.isEmpty;

    if (showLoadingDialog) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  Widget getProgressDialog() {
    return const Center(child: CircularProgressIndicator());
  }

  ListView getListView() {
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, position) {
        return getRow(position);
      },
    );
  }

  Widget getRow(int i) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text("Row ${data[i]["title"]}"),
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

### Making network requests

### 发起网络请求

Making a network call in Flutter is easy when you
use the popular [`http` package][]. This abstracts
away a lot of the networking that you might normally
implement yourself, making it simple to make network calls.

在 Flutter 中，使用广受欢迎的 [`http` package][`http` package]，
发起网络调用就会变得简单。
它把许多通常要自己实现的网络细节抽象掉了，
让发起网络调用变得直接。

To add the `http` package as a dependency, run `flutter pub add`:

要把 `http` package 添加为依赖，请运行 `flutter pub add`：

```console
flutter pub add http
```

To make a network call,
call `await` on the `async` function `http.get()`:

要发起一次网络调用，
对 `async` 函数 `http.get()` 执行 `await`：

<?code-excerpt "lib/progress.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

### Showing the progress on long-running tasks

### 显示耗时任务的进度

In UIKit, you typically use a `UIProgressView`
while executing a long-running task in the background.

在 UIKit 中，当后台执行耗时任务时，
通常会使用 `UIProgressView`。

In Flutter, use a `ProgressIndicator` widget.
Show the progress programmatically by controlling
when it's rendered through a boolean flag.
Tell Flutter to update its state before your long-running task starts,
and hide it after it ends.

在 Flutter 中，使用 `ProgressIndicator` widget。
通过一个布尔标志控制它何时被渲染，
从而用代码来显示进度。
在耗时任务开始之前告诉 Flutter 更新状态，
并在任务结束后把它隐藏。

In the example below, the build function is separated into three different
functions. If `showLoadingDialog` is `true`
(when `widgets.length == 0`), then render the `ProgressIndicator`.
Otherwise, render the `ListView` with the data returned from a network call.

在下面的示例中，build 函数被拆成三个不同的函数。
如果 `showLoadingDialog` 为 `true`
（当 `widgets.length == 0` 时），就渲染 `ProgressIndicator`。
否则，用网络调用返回的数据渲染 `ListView`。

<?code-excerpt "lib/progress.dart"?>
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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> data = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  bool get showLoadingDialog => data.isEmpty;

  Future<void> loadData() async {
    final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    final http.Response response = await http.get(dataURL);
    setState(() {
      data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
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

  Widget getRow(int i) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text("Row ${data[i]["title"]}"),
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

[Flutter for SwiftUI developers]: /flutter-for/swiftui-devs
[Add Flutter to existing app]: /add-to-app
[Adding Assets and Images in Flutter]: /ui/assets/assets-and-images
[Animation & Motion widgets]: /ui/widgets/animation
[Animations overview]: /ui/animations
[Animations tutorial]: /ui/animations/tutorial
[Apple's iOS design language]: {{site.apple-dev}}/design/resources
[`AppLifecycleState` documentation]: {{site.api}}/flutter/dart-ui/AppLifecycleState.html
[arb]: https://github.com/googlei18n/app-resource-bundle
[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html
[composing]: /resources/architectural-overview#composition
[Cupertino library]: {{site.api}}/flutter/cupertino/cupertino-library.html
[Cupertino widgets]: /ui/widgets/cupertino
[`devicePixelRatio`]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html
[existing plugin]: {{site.pub}}/flutter
[Flutter concurrency for Swift developers]: /flutter-for/dart-swift-concurrency
[`http` package]: {{site.pub-pkg}}/http
[Human Interface Guidelines]: {{site.apple-dev}}/ios/human-interface-guidelines/overview/themes/
[internationalization guide]: /ui/internationalization
[`intl`]: {{site.pub-pkg}}/intl
[`intl_translation`]: {{site.pub-pkg}}/intl_translation
[Introduction to declarative UI]: /flutter-for/declarative
[layout tutorial]: /ui/widgets/layout
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[Material Components]: {{site.material}}/develop/flutter/
[Material Design guidelines]: {{site.material}}/styles/
[optimized for all platforms]: {{site.material2}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines
[Platform adaptations]: /platform-integration/platform-adaptations
[platform channel]: /platform-integration/platform-channels
[pub.dev]: {{site.pub}}/flutter/packages
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[widget]: /resources/architectural-overview#widgets
[widget catalog]: /ui/widgets/layout
[`Window.locale`]: {{site.api}}/flutter/dart-ui/Window/locale.html
[Learning Dart as a Swift Developer]: {{site.dart-site}}/guides/language/coming-from/swift-to-dart