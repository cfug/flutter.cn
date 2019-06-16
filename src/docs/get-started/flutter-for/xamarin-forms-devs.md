---
title: Flutter for Xamarin.Forms developers
title: 给 Xamarin.Forms 开发者的 Flutter 指南
description: Learn how to apply Xamarin.Forms developer knowledge when building Flutter apps.
description: 学习如何把 Xamarin.Forms 的开发经验应用到 Flutter 应用的开发中。
---

This document is meant for Xamarin.Forms developers looking to apply their
existing knowledge to build mobile apps with Flutter. If you understand
the fundamentals of the Xamarin.Forms framework, then you can use this
document as a jump start to Flutter development.

本文档旨在帮助 Xamarin.Forms 开发者利用已有的知识去构建 Flutter 移动应用。如果你懂得 Xamarin.Forms 框架的基本原理，那么你就可以将本文档当作你开始 Flutter 开发的不错的起点。

Your Android and iOS knowledge and skill set are valuable when building with
Flutter, because Flutter relies on the native operating system configurations,
similar to how you would configure your native Xamarin.Forms projects.
The Flutter Frameworks is also similar to how you create a single UI,
that is used on multiple platforms.

你的 Android 和 iOS 知识以及技能组合在构建 Flutter 时都是有价值的，因为 Flutter 依赖的原生系统配置都与你配置 Xamarin.Forms 原生项目时一样。Flutter 框架与你创建一个单独的界面时也是一样的，这在多个平台中同样适用。

This document can be used as a cookbook by jumping around and finding questions
that are most relevant to your needs.

本文档可用做可指导手册来翻查与你需求最为相关的问题。

## Project Setup

## 项目设置

### How does the app start?

### app 是如何运行的？

For each platform in Xamarin.Forms, you call the `LoadApplication` method,
which creates a new application and starts your app.

对于 Xamarin.Forms 里的每个平台，你可以调用 `LoadApplication` 方法，创建一个新应用并运行你的 app 。

{% prettify csharp %}
LoadApplication(new App());
{% endprettify %}

In Flutter, the default main entry point is `main` where you load your
Flutter app.

在 Flutter 中，加载 Flutter app 的默认主入口点是 `main`。

{% prettify dart %}
void main() {
  runApp(new MyApp());
}
{% endprettify %}

In Xamarin.Forms, you assign a `Page` to the `MainPage` property in the
`Application` class.

在 Xamarin.Forms 中，你分配一个 `Page` 到 `Application` 类中的 `MainPage` 属性。

{% prettify csharp %}
public class App: Application
{
    public App()
    {
      MainPage = new ContentPage()
                 {
                   new Label()
                   {
                     Text="Hello World",
                     HorizontalOptions = LayoutOptions.Center,
                     VerticalOptions = LayoutOptions.Center
                   }
                 };
    }
}
{% endprettify %}

In Flutter, "everything is a widget", even the application itself.
The following example shows `MyApp`, a simple application `Widget`.

在 Flutter 中，“万物皆 widget”，甚至连应用本身也是。
接下来的示例展示了 `MyApp` ,一个简单的应用 `Widget`。

{% prettify dart %}
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new Center(
        child: Text("Hello World!", textDirection: TextDirection.ltr));
  }
}
{% endprettify %}

### How do you create a page?

### 如何创建一个页面？

Xamarin.Forms has many different types of pages; `ContentPage` is the most
common.

Xamarin.Forms 拥有一些不同类型的页面；`ContentPage` 是最为通用的。

In Flutter, you specify an application widget that holds your root page.
You can use a
[MaterialApp]({{site.api}}/flutter/material/MaterialApp-class.html)
widget, which supports [Material
Design]({{site.material}}/design),
or you can use a
[CupertinoApp]({{site.api}}/flutter/cupertino/CupertinoApp-class.html)
widget, which supports an iOS-style app,
or you can use the lower level
[WidgetsApp]({{site.api}}/flutter/widgets/WidgetsApp-class.html),
which you can customize in any way you want.

在 Flutter 中，指定一个应用程序 widget 来控制你的根页面。
你可以使用一个
[MaterialApp]({{site.api}}/flutter/material/MaterialApp-class.html)
widget，他支持[Material Design]({{site.material}}/design)，或者你也可以使用等级较低的
[WidgetsApp]({{site.api}}/flutter/widgets/WidgetsApp-class.html)，可供你随心所欲地定制。

The following code defines the home page, a stateful widget. In Flutter,
all widgets are immutable, but two types of widgets are supported:
stateful and stateless. Examples of a stateless widget are titles,
icons, or images.

接下来的代码定义了一个主页，一个有状态的 widget。在 Flutter 中，除了以下两个类型的 widget 外，其它 widget 都是不可变的：
有状态和无状态 widget。无状态 widget 的示例都是标题、图标或图片。

The following example uses MaterialApp, which holds its root page in the
`home` property.

下面的示例使用 MaterialApp，它在 `home` 属性中控制它的根页面。

{% prettify dart %}
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  
  // 这个 widget 是你的应用程序的根 widget。

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      [[highlight]]home: new MyHomePage(title: 'Flutter Demo Home Page'),[[/highlight]]
    );
  }
}
{% endprettify %}

From here, your actual first page is another `Widget`,
in which you create your state.

从这里开始，真正的首页是另一个你在里面创建了状态的 `widget`。

A stateful widget, such as MyHomePage below, consists of two parts.
The first part, which is itself immutable, creates a State object
that holds the state of the object. The State object persists over
the life of the widget.

一个有状态 widget，例如下面的 MyHomePage，包含两个部分。
第一部分，是它自身不变的，创建一个状态对象（State object）来管控对象的状态。状态对象持续存在于 widget 的整个生命周期中。

{% prettify dart %}
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}
{% endprettify %}

The `State` object implements the `build()` method for the stateful widget.

`状态`对象实现了有状态 widget 中的`构建`方法。

When the state of the widget tree changes, call `setState()`, which triggers
a build of that portion of the UI.  Make sure to call `setState()` only
when necessary, and only on the part of the widget tree that has changed,
or it can result in poor UI performance.

当 widget 树的状态发生了改变，将会调用  `setState()`  触发 widget 当中该部分UI的构建。
确保只在需要时调用 `setState()` ，并且在只有部分 widget 树发生变化时调用，否则会造成糟糕的UI性能表现。

{% prettify dart %}
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        // Take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set the appbar title.
        title: new Text(widget.title),
      ),
      body: new Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ),
    );
  }
}
{% endprettify %}

In Flutter,
the UI (also known as widget tree), is immutable, meaning you
can't change its state once it's built. You change fields in your
`State` class, then call `setState()` to rebuild the entire widget tree again.

在 Flutter 中的UI（也就是这里所说的 widget 树）是不可变的，意思是说它一旦被构建，你就无法再改变他的状态。
当你修改`状态` 类中的字段，就要再次调用 `setState` 来重新构建整个 widget 树。

This way of generating UI is different than Xamarin.Forms,
but there are many benefits to this approach.

这个生成UI的方式不同于 Xamarin.Forms，但是这种方法却有很多益处。

## Views

## 视图

### What is the equivalent of a `Page` or `Element` in Flutter?

### 在 Flutter 中 `页面（Page）` 与 `元素（Element）`的相同点是什么？

{{site.alert.secondary}}

  How is react-style, or _declarative_, programming different than the
  traditional imperative style?
  For a comparison, see [Introduction to declarative
  UI](/docs/get-started/flutter-for/declarative).

  类react的风格或者说是_声明式_编程风格与传统的命令式编程风格有何不同？
  作为比较，可以参考[声明式 UI 介绍](/docs/get-started/flutter-for/declarative).

{{site.alert.end}}

`ContentPage`, `TabbedPage`, `MasterDetailPage` are all types of pages you
might in a Xamarin.Forms application. These pages would then hold
`Element`s to display the various controls. In Xamarin.Forms an `Entry`
or `Button` are examples of an `Element`.

一个 `ContentPage`、`TabbedPage`、`MasterDetailPage`
就是你可以在 Xamarin.Forms 应用程序中使用的全部页面类型。
这些页面会控制`元素（Element）`来显示各种控件。
在 Xamarin.Forms 中，`Entry` 或者 `Button` 就是一个 `元素` 的示例。

In Flutter, almost everything is a widget. A `Page`, called a `Route` in
Flutter, is a widget.  Buttons, progress bars, and animation controllers
are all widgets. When building a route, you create a widget tree.

在 Flutter 中，几乎所有东西都是一个 widget 。一个`页面`在 Flutter 中被称作`路由（Route）`，也是一个 widget。
按钮、进度条、动画控制器都是 widget 。当构建一个路由时，就会创建一棵 widget 树。

Flutter includes the [Material
Components](/docs/development/ui/widgets/material)
library. These are widgets that implement the
[Material Design guidelines]({{site.material}}/design). Material Design is a
flexible design system [optimized for all
platforms]({{site.material}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines),
including iOS.

Flutter 包含 [Material 组件](/docs/development/ui/widgets/material)库。
这些都是实现了 [Material Design 指南]({{site.material}}/design)的 widget。
Material Design 是一个灵活的[针对所有平台]({{site.material}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines)的设计系统，包括 iOS。

But Flutter is flexible and expressive enough to implement any design language.
For example, on iOS, you can use the [Cupertino
widgets](/docs/development/ui/widgets/cupertino)
to produce an interface that looks like
[Apple's iOS design language](https://developer.apple.com/design/resources/).

不过， Flutter 有足够灵活和自描述性（expressive）去实现任何设计语言。
举个例子，在 iOS 上，你可以用 [Cupertino
 widget](/docs/development/ui/widgets/cupertino)来生成一个看起来像[苹果 iOS 设计语言](https://developer.apple.com/design/resources/)的接口。

### How do I update `Widget`s?

### 如何更新 `widget`？

In Xamarin.Forms, each `Page` or `Element` is a stateful class, that has
properties and methods. You update your `Element` by updating a property,
and this is propagated down to the native control.

在 Xamarin.Forms 中，每一个`页面`或者`元素`都是一个有状态的类，
拥有一些属性和方法。通过更新一个属性来更新你的元素，而且这会传递到原生控件。

In Flutter, `Widget`s are immutable and you can't directly update them
by changing a property, instead you have to work with the widget's state.

在 Flutter 中，`Widget`是不可变的，你不可以直接地通过修改一个属性来更新它们，而是应该使用 widget 的状态。

This is where the concept of Stateful vs Stateless widgets comes from. A
`StatelessWidget` is just what it sounds like&mdash;a widget with no state
information.

有状态 widget 和无状态 widget 的概念就是出自这里。`无状态 widget（StatelessWidget）`顾名思义，就是一个没有状态信息的 widget。

`StatelessWidgets` are useful when the part of the user interface
you are describing does not depend on anything other than the configuration
information in the object.

当你在描绘用户界面的一个不依赖除对象中的配置信息之外任何东西的部分时，`StatelessWidgets` 是有用的。

For example, in Xamarin.Forms, this is similar to placing an `Image`
with your logo. The logo is not going to change during runtime, so
use a `StatelessWidget` in Flutter.

举个例子，在 Xamarin.Forms 中，可以轻而易举地用你的logo替换一张`图片`。
这个logo将不会在运行过程中修改，所以在 Flutter 会使用`StatelessWidget`。

If you want to dynamically change the UI based on data received
after making an HTTP call or user interaction then you have to work
with `StatefulWidget` and tell the Flutter framework that the widget’s
`State` has been updated so it can update that widget.

如果你想动态地基于进行了HTTP调用或者用户交互后接收到的数据来修改UI，你需要使用`StatefulWidget`并告诉 Flutter 框架这个 widget 的`状态（State）`已经被更新了所以它可以更新那个 widget。

The important thing to note here is at the core both stateless and stateful
widgets behave the same. They rebuild every frame, the difference is the
`StatefulWidget` has a `State` object that stores state data across frames
and restores it.

这里要记下的重要内容是有状态和无状态 widget 的核心行为都是一样的。他们重建每个结构，不同的是`StatefulWidget`拥有一个`状态（State）`对象来跨结构储存状态数据和恢复它。

If you are in doubt, then always remember this rule: if a widget changes
(because of user interactions, for example) it’s stateful.
However, if a widget reacts to change, the containing parent widget can
still be stateless if it doesn't itself react to change.

如果你有疑惑，那么就记住这个规则：如果一个 widget 改变了（例如是因为用户交互），它就是有状态的。
相反，如果一个 widget 对修改作出反应，包含它的父 widget 如果本身没有对修改作出反应，仍然可以是无状态的。

The following example shows how to use a `StatelessWidget`. A common
`StatelessWidget` is the `Text` widget. If you look at the implementation of
the `Text` widget you'll find it subclasses `StatelessWidget`.

接下来的示例展示了如何使用一个`StatelessWidget`。一个公共的
`StatelessWidget`是`Text` widget。如果你查阅`文本`的实现，你会发现他是 `StatelessWidget` 的子类。

{% prettify dart %}
new Text(
  'I like Flutter!',
  style: new TextStyle(fontWeight: FontWeight.bold),
);
{% endprettify %}

As you can see, the `Text` widget has no state information associated with it,
it renders what is passed in its constructors and nothing more.

如你所见，`文本` widget 没有状态信息与它关联，它只渲染在它的构造函数中呈现的内容，没有更多。

But, what if you want to make "I Like Flutter" change dynamically, for
example when clicking a `FloatingActionButton`?

但是，如果你想动态地作出 "I Like Flutter"的修改呢？例如在点击一个`FloatingActionButton`时。

To achieve this, wrap the `Text` widget in a `StatefulWidget` and
update it when the user clicks the button, as shown in the following
example:

为了实现这个目标，需要将 `Text` widget 封装到一个`StatefulWidget`中，并在用用户点击按钮时更新它，
正如接下来的例子：

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default placeholder text
  String textToShow = "I Like Flutter";

  void _updateText() {
    setState(() {
      // Update the text
      textToShow = "Flutter is Awesome!";
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new Center(child: new Text(textToShow)),
      floatingActionButton: new FloatingActionButton(
        onPressed: _updateText,
        tooltip: 'Update Text',
        child: new Icon(Icons.update),
      ),
    );
  }
}
{% endprettify %}

### How do I lay out my widgets? What is the equivalent of an XAML file?

### 该如何布局我的 widget 呢？ 什么东西可以等价于一个 XAML 文件？

In Xamarin.Forms, most developers write layouts in XAML,
though sometimes in C#.
In Flutter, you write your layouts with a widget tree in code.

在 Xamarin.Forms 中，大部分开发者用 XAML 写布局，尽管有时用 C#。
在 Flutter 中编码一棵 widget 树来编写布局。

The following example shows how to display a simple widget with padding:

接下来的示例展示如何显示一个简单的带填充（padding）的 widget：

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new Center(
        child: new MaterialButton(
          onPressed: () {},
          child: new Text('Hello'),
          padding: new EdgeInsets.only(left: 10.0, right: 10.0),
        ),
      ),
    );
  }
{% endprettify %}

You can view the layouts that Flutter has to offer in the [widget
catalog](/docs/development/ui/widgets/layout).

您可以查看 Flutter 在[widget 目录](/docs/development/ui/widgets/layout)中提供的布局。

### How do I add or remove an Element from my layout?

### 如何从布局中添加或移除一个元素?

In Xamarin.Forms, you had to remove or add an `Element` in code.
This involved either setting the `Content` property or calling
`Add()` or `Remove()` if it was a list.

在 Xamarin.Forms 中，你需要在代码中移除或添加一个 `元素（Element）`。
如果它说一个列表，这将会涉及设置 `Content` 属性或者调用 `Add()`  或者  `Remove()` 方法。

In Flutter, because widgets are immutable there is no direct equivalent.
Instead, you can pass a function to the parent that returns a widget,
and control that child's creation with a boolean flag.

在 Flutter 中，因为 widget 都是不可变的，所以没有直接对等的东西。
相反，你可以将一个返回一个 widget 的函数传递给父级，并用布尔标控制它的子 widget 的创建。

The following example shows how to toggle between two widgets when the user
clicks the `FloatingActionButton`:

下面的示例展示当用户点击 `FloatingActionButton` 时，如何在两个 widget 之间切换。

{% prettify dart %}
class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
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
      return new Text('Toggle One');
    } else {
      return new CupertinoButton(
        onPressed: () {},
        child: new Text('Toggle Two'),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new Center(
        child: _getToggleChild(),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _toggle,
        tooltip: 'Update Text',
        child: new Icon(Icons.update),
      ),
    );
  }
}
{% endprettify %}

### How do I animate a widget?

### 如何让一个 widget 动起来？

In Xamarin.Forms, you create simple animations using ViewExtensions that
include methods such as `FadeTo` and `TranslateTo`.
You would use these methods on a view
to perform the required animations.

在 Xamarin.Forms 中，你可以利用包括例如 `FadeTo` 和 `TranslateTo`  等方法的视图扩展（ViewExtensions）来创建简单的动画。
你会在一个视图中使用这些方法来执行需要的动画。

{% prettify xml %}
<Image Source="{Binding MyImage}" x:Name="myImage" />
{% endprettify %}

Then in code behind, or a behavior, this would fade in the image,
over a 1 second period.

然后再后面的代码或一个动作中，这个会在1秒内淡入这张图像。

{% prettify csharp %}
myImage.FadeTo(0, 1000);
{% endprettify %}

In Flutter, you animate widgets using the animation library by wrapping
widgets inside an animated widget. Use an `AnimationController`,
which is an `Animation<double>` that can pause, seek, stop and reverse
the animation. It requires a `Ticker` that signals when vsync happens,
and produces a linear interpolation between 0 and 1 on each frame
while it's running. You then create one or more
`Animation`s and attach them to the controller.

在 Flutter 中，通过封装 widget 到一个动画 widget 中，可以使用动画类库来让 widget 动起来。
使用一个 `AnimationController` ，即一个可以暂停、寻找、停止和倒退动画的 `Animation<double>` 。
它需要一个`滴答器（Ticker）`，当垂直同步（vsync）发生时，会发出信号，并在运行时的每一帧都会产生0和1之间的线性插值。
然后你可以创建一个或多个`动画`并把它们附加到控制器上。

For example, you might use `CurvedAnimation` to implement an animation
along an interpolated curve. In this sense, the controller
is the "master" source of the animation progress and the `CurvedAnimation`
computes the curve that replaces the controller's default linear motion.
Like widgets, animations in Flutter work with composition.

举个例子，你可以使用 `CurvedAnimation` 来实现一个沿着插值曲线的动画。
在这个场景中，控制器说一个动画进展的“大师”源，而 `CurvedAnimation` 计算用来替代控制器默认线性运动的曲线。
跟 widget 一样，Flutter 中的动画与组成一起工作。

When building the widget tree, you assign the `Animation` to an animated
property of a widget, such as the opacity of a `FadeTransition`,
and tell the controller to start the animation.

当你在构建一个 widget 树，赋值一个`动画（Animation）`给一个 widget 的一个动画属性时，比如 `渐退（FadeTransition）`的 不透明度，会告诉控制器开始执行动画。

The following example shows how to write a `FadeTransition` that fades
the widget into a logo when you press the `FloatingActionButton`:

下面的实例展示如何去写一个 `渐退（FadeTransition）`，当你按下 `FloatingActionButton` 时，它会把 widget 渐变到一个logo。

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(new FadeAppTest());
}

class FadeAppTest extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Fade Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyFadeTest(title: 'Fade Demo'),
    );
  }
}

class MyFadeTest extends StatefulWidget {
  MyFadeTest({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyFadeTest createState() => new _MyFadeTest();
}

class _MyFadeTest extends State<MyFadeTest> with TickerProviderStateMixin {
  AnimationController controller;
  CurvedAnimation curve;

  @override
  void initState() {
    controller = new AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
    curve = new CurvedAnimation(parent: controller, curve: Curves.easeIn);
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
          child: new Container(
              child: new FadeTransition(
                  opacity: curve,
                  child: new FlutterLogo(
                    size: 100.0,
                  )))),
      floatingActionButton: new FloatingActionButton(
        tooltip: 'Fade',
        child: new Icon(Icons.brush),
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

更多信息，可以查阅 [动画 & 运动 widget](/docs/development/ui/widgets/animation)， 
[动画教程](/docs/development/ui/animations/tutorial)，
以及[动画概述](/docs/development/ui/animations)。

### How do I draw/paint on the screen?

### 如何在屏幕上绘图？

Xamarin.Forms never had a built in way to draw directly on the screen.
Many would use SkiaSharp, if they needed a custom image drawn. In Flutter,
you have direct access to the Skia Canvas and can easily draw on screen.

Xamarin.Forms 从来没有任何内置的方法来直接在屏幕上绘图。如果他们需要一个自定义图像绘制，大多数使用 SkiaSharp。
在 Flutter中，你可以直接访问 Skia 画布（Skia Canvas） 方便地在屏幕上绘图。

Flutter has two classes that help you draw to the canvas: `CustomPaint`
and `CustomPainter`, the latter of which implements your algorithm to draw to
the canvas.

Flutter 拥有两个类来帮助你在画布上绘图：`CustomPaint` 和 `CustomPainter`，后者实现了你在画布上绘图的算法。

To learn how to implement a signature painter in Flutter,
see Collin's answer on [StackOverflow][].

如果想学习如何在 Flutter 中实现一个签名画手，请阅读 Collin 在 [StackOverflow][] 的回答。

[StackOverflow]: {{site.so}}/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter

{% prettify dart %}
import 'package:flutter/material.dart';

void main() => runApp(new MaterialApp(home: new DemoApp()));

class DemoApp extends StatelessWidget {
  Widget build(BuildContext context) => new Scaffold(body: new Signature());
}

class Signature extends StatefulWidget {
  SignatureState createState() => new SignatureState();
}

class SignatureState extends State<Signature> {
  List<Offset> _points = <Offset>[];
  Widget build(BuildContext context) {
    return new GestureDetector(
      onPanUpdate: (DragUpdateDetails details) {
        setState(() {
          RenderBox referenceBox = context.findRenderObject();
          Offset localPosition =
          referenceBox.globalToLocal(details.globalPosition);
          _points = new List.from(_points)..add(localPosition);
        });
      },
      onPanEnd: (DragEndDetails details) => _points.add(null),
      child: new CustomPaint(painter: new SignaturePainter(_points), size: Size.infinite),
    );
  }
}

class SignaturePainter extends CustomPainter {
  SignaturePainter(this.points);
  final List<Offset> points;
  void paint(Canvas canvas, Size size) {
    var paint = new Paint()
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

### Where is the widget's opacity?

### widget 的不透明度在哪里？

On Xamarin.Forms, all `VisualElement`s have an Opacity.
In Flutter, you need to wrap a widget in an
[Opacity widget]({{site.api}}/flutter/widgets/Opacity-class.html)
to accomplish this.

Xamarin.Forms 上，所有 `虚拟元素（VisualElement）`都拥有一个不透明度。
在 Flutter 中，你需要封装一个 widget 到一个 [不透明度 widget]({{site.api}}/flutter/widgets/Opacity-class.html) 来实现它。

### How do I build custom widgets?

### 如何构建一个自定义 widget ？

In Xamarin.Forms, you typically subclass `VisualElement`,
or use a pre-existing `VisualElement`, to override and
implement methods that achieve the desired behavior.

在 Xamarin.Forms 中，通常派生 `VisualElement` 或使用一个已有的 `VisualElement` ，来重写和实现所需行为的方法。

In Flutter, build a custom widget by
[composing](/docs/resources/technical-overview#everythings-a-widget)
smaller widgets (instead of extending them).
It is somewhat similar to implementing a custom control based off a
`Grid` with numerous `VisualElement`s added in, while extending with
custom logic.

在 Flutter 中，通过
[组合（composing）](/docs/resources/technical-overview#everythings-a-widget)
更小的 widget（而不是扩展它们）来构建一个自定义 widget。
这有点类似于基于 `Grid` 实现自定义控件，其中添加了大量 `VisualElement`，同时使用自定义逻辑进行扩展。

For example, how do you build a `CustomButton` that takes a label in
the constructor? Create a CustomButton that composes a `RaisedButton`
with a label, rather than by extending `RaisedButton`:

举个例子，如何构建一个在构造器接受一个标签的`自定义按钮`？
创建一个组合了一个带有标签的`RaisedButton`的自定义按钮，而不是扩展 `RaisedButton` 。

{% prettify dart %}
class CustomButton extends StatelessWidget {
  final String label;

  CustomButton(this.label);

  @override
  Widget build(BuildContext context) {
    return new RaisedButton(onPressed: () {}, child: new Text(label));
  }
}
{% endprettify %}

Then use `CustomButton`, just as you'd use any other Flutter widget:

然后就可以像使用其他 Flutter widget 一样使用这个`自定义按钮`。

{% prettify dart %}
@override
Widget build(BuildContext context) {
  return new Center(
    child: new CustomButton("Hello"),
  );
}
{% endprettify %}

## Navigation

## 导航

### How do I navigate between pages?

### 如何在页面之间导航？

In Xamarin.Forms, you navigate between pages normally through a
CarouselPage. In Flutter, you can use a `NavigationPage`
that manages the stack of pages to display.

在 Xamarin.Forms 中，在页面之间导航通常会通过一个 CarouselPage。
在 Flutter 中，你可以使用一个 `NavigationPage` 来管理页面栈去显示。

Flutter has a similar implementation, using a `Navigator` and
`Routes`. A `Route` is an abstraction for a `Page` of an app, and
a `Navigator` is a
[widget](/docs/resources/technical-overview#everythings-a-widget)
that manages routes.

Flutter 也有类似的实现，使用了一个`导航器（Navigator）`和`路由（Routes）`。
一个`路由`是一个应用程序里一个`页面`的抽象，而一个`导航器`是一个管理路由的 [widget](/docs/resources/technical-overview#everythings-a-widget)。

A route dd maps to a `Page`. The navigator works in a similar way to the
Xamarin.Forms `NavigationPage`, in that it can `push()` and `pop()` routes
depending on whether you want to navigate to, or back from, a view.

一个路由大致上映射到一个`页面`。导航器以类似 Xamarin.Forms `NavigationPage` 的方式工作，
在里面可以 `push()` 和 `pop()` 路由，依赖于你是否想导航到一个视图，或者从它返回。

To navigate between pages, you have a couple options:

在页面间导航，你有几个选择：

* Specify a `Map` of route names. (MaterialApp)
* Directly navigate to a route. (WidgetApp)

* 指定路由名称的一个映射。（MaterialApp）
* 直接导航到一个路由。（WidgetApp）

The following example builds a Map.

接下来构建一个映射的示例。

{% prettify dart %}
void main() {
  runApp(new MaterialApp(
    home: new MyAppHome(), // becomes the route named '/'
    routes: <String, WidgetBuilder> {
      '/a': (BuildContext context) => new MyPage(title: 'page A'),
      '/b': (BuildContext context) => new MyPage(title: 'page B'),
      '/c': (BuildContext context) => new MyPage(title: 'page C'),
    },
  ));
}
{% endprettify %}

Navigate to a route by pushing its name to the `Navigator`.

通过`推入`一个路由的名称到`导航器`来导航到这个路由。

{% prettify dart %}
Navigator.of(context).pushNamed('/b');
{% endprettify %}

The Navigator is a stack that manages your app's routes.
Pushing a route to the stack moves to that route.
Popping a route from the stack, returns to the previous route. This
is done by awaiting on the `Future` returned by `push()`.

导航器是一个管理你的应用程序的路由的堆栈。把一个路由推入堆栈可以移动到这个路由，
而从堆栈弹出一个路由可以返回到前一个路由。
这是通过`等待`被 `push()` 返回的 `未来（Future）` 来完成的。

`Async`/`await` is very similar to the .NET implementation and is
explained in more detail in [Async UI](#async-ui).

`Async`/`await` 与 .NET 的实现非常类似，并且是在 [Async UI](#async-ui)中有更详尽的解释。

For example, to start a `location` route that lets the user select their
location, you might do the following:

举个例子，要开始一个让用户选择他们的定位的 `定位（location）` 路由，你需要做以下步骤：

{% prettify dart %}
Map coordinates = await Navigator.of(context).pushNamed('/location');
{% endprettify %}

And then, inside your ‘location’ route, once the user has selected their
location, pop the stack with the result:

然后，在你的“定位”路由里，一旦用户选择他们的定位，使用结果来 `pop()` 这个堆栈。

{% prettify dart %}
Navigator.of(context).pop({"lat":43.821757,"long":-79.226392});
{% endprettify %}

### How do I navigate to another app?

### 如何导航到其它应用程序？

In Xamarin.Forms, to send the user to another application, you use a
specific URI scheme, using `Device.OpenUrl("mailto://")`

在 Xamarin.Forms 中，需要用指定的 URI 协议并使用 `Device.OpenUrl("mailto://")` 来传送用户到其它应用程序。

To implement this functionality in Flutter,
create a native platform integration,
or use an [existing plugin]({{site.pub}}/flutter/), such as
[`url_launcher`]({{site.pub}}/packages/url_launcher), available with
many other packages on the [Pub site]({{site.pub}}/flutter).

为了在 Flutter 中实现这个功能，需要创建一个原生平台集成，或者使用 [已有的插件]({{site.pub}}/flutter/)，
比如 [`url_launcher`]({{site.pub}}/packages/url_launcher)，可与在 [Pub site]({{site.pub}}/flutter) 上的许多其他包一起使用。

## Async UI

## 异步 UI

### What is the equivalent of `Device.BeginOnMainThread()` in Flutter?

### 在 Flutter 中有什么是跟 `Device.BeginOnMainThread()` 相等的？

Dart has a single-threaded execution model, with support for `Isolate`s
(a way to run Dart code on another thread), an event loop, and
asynchronous programming. Unless you spawn an `Isolate`, your Dart code
runs in the main UI thread and is driven by an event loop.

Dart 拥有一个单线程执行模型，支持“隔离”
（在另一个线程上运行Dart代码的方法）、事件循环和
异步编程。除非生成一个“隔离”，否则您的Dart代码会在主UI线程中运行，并由一个事件循环来驱动。

Dart's single-threaded model doesn't mean you need to run everything as a
blocking operation that causes the UI to freeze. Much like Xamarin.Forms,
you need to keep the UI thread free. You would use `async`/`await` to perform
tasks, where you must wait for the response.

Dart 的单线程模型并不意味着需要以会导致UI冻结的阻塞操作方式来运行所有内容。
更多地像  Xamarin.Forms 一样需要让 UI 线程保持空闲。
您将使用“async”/“wait”来执行任务，其中必须等待响应。

In Flutter, use the asynchronous facilities that the Dart language provides,
also named `async`/`await`, to perform asynchronous work.
This is very similar to C# and should be very easy to use for any
Xamarin.Forms developer.

在 Flutter 中，使用 Dart 语言提供的异步工具（也称为 `async`/`await`）来执行异步工作。
这跟 C# 很像，并且对于 Xamarin.Forms 开发者来说应该是非常容易使用的。

For example, you can run network code without causing the UI to hang by
using `async`/`await` and letting Dart do the heavy lifting:

例如，您可以使用 `async`/`await` 运行网络请求代码，而不会导致UI挂起，并让Dart完成繁重的工作：

{% prettify dart %}
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
{% endprettify %}

Once the awaited network call is done, update the UI by calling `setState()`,
which triggers a rebuild of the widget sub-tree and updates the data.

一旦完成`等待`的网络调用后，通过调用 `setState()` 更新UI，这将触发 widget 子树的重新构建并更新数据。

The following example loads data asynchronously and displays it
in a `ListView`:

下面的实例异步加载数据并在一个 `ListView` 中显示：

{% prettify dart %}
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
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
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new ListView.builder(
          itemCount: widgets.length,
          itemBuilder: (BuildContext context, int position) {
            return getRow(position);
          }));
  }

  Widget getRow(int i) {
    return new Padding(
      padding: new EdgeInsets.all(10.0),
      child: new Text("Row ${widgets[i]["title"]}")
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

有关在后台工作、以及 Flutter 与 Android 的不同之处的更多信息，请参考下一节。

### How do you move work to a background thread?

### 如何将工作转移到后台线程？

Since Flutter is single threaded and runs an event loop,
you don't have to worry about thread management or spawning
background threads.  This is very similar to Xamarin.Forms.
If you're doing I/O-bound work, such as disk access or a network call,
then you can safely use `async`/`await` and you're all set.

因为 Flutter 是单线程的，并且运行一个事件循环，所以您不必担心线程管理或产生后台线程。
这一点与 Xamarin.Forms 非常相似。如果您正在做 I/O 密集型的工作，比如磁盘访问或网络调用，那么您可以安全地使用 `async`/`await`，这样就一切就绪了。

If, on the other hand, you need to do computationally intensive work
that keeps the CPU busy, you want to move it to an `Isolate`
to avoid blocking the event loop, like you would keep _any_ sort of
work out of the main thread. This is similar to when you
move things to a different thread via `Task.Run()` in Xamarin.Forms.

另一方面，如果您需要做计算密集型的工作，使CPU保持忙碌，那么您希望将它移动到“隔离”状态，以避免阻塞事件循环，就像您将任何类型的工作放在主线程之外一样。
这类似于通过 Xamarin.Forms 中的 `Task.Run()` 将内容移动到另一个线程。

For I/O-bound work, declare the function as an `async` function,
and `await` on long-running tasks inside the function:

对于 I/O 密集型的工作，将函数声明为一个 `异步` 函数，并在函数内部 `等待` 长时间运行的任务：

{% prettify dart %}
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
{% endprettify %}

This is how you would typically do network or database calls,
which are both I/O operations.

这是您通常执行网络或数据库调用的方式，它们都是I/O操作。

However, there are times when you might be processing a large amount
of data and your UI hangs. In Flutter, use `Isolate`s to take advantage of
multiple CPU cores to do long-running or computationally intensive tasks.

然而，有时您可能正在处理大量数据而UI挂起了。在 Flutter 中，使用`隔离`来利用多个CPU内核来执行长时间运行或计算密集型任务。

Isolates are separate execution threads that do not share any memory
with the main execution memory heap. This is a difference between
`Task.Run()`. This means you can’t access variables from the main thread,
or update your UI by calling `setState()`.

隔离线程是独立的执行线程，不与主执行内存堆共享任何内存。这是与 `Task.Run()` 的区别。
这意味着您不能从主线程访问变量，也不能通过调用 `setState()` 更新UI。

The following example shows, in a simple isolate, how to share data back to
the main thread to update the UI.

下面的示例以简单的方式展示了如何将数据共享回主线程以更新UI。

{% prettify dart %}
loadData() async {
  ReceivePort receivePort = new ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message.
  SendPort sendPort = await receivePort.first;

  List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

  setState(() {
    widgets = msg;
  });
}

// The entry point for the isolate.
static dataLoader(SendPort sendPort) async {
  // Open the ReceivePort for incoming messages.
  ReceivePort port = new ReceivePort();

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
  ReceivePort response = new ReceivePort();
  port.send([msg, response.sendPort]);
  return response.first;
}
{% endprettify %}

Here, `dataLoader()` is the `Isolate` that runs in its own separate
execution thread.  In the isolate you can perform more CPU intensive
processing (parsing a big JSON, for example),
or perform computationally intensive math,
such as encryption or signal processing.

在这里，`dataLoader()` 是在它自己单独的执行线程中运行的`隔离`。
在隔离中，您可以执行更多的CPU密集型处理（例如，解析大型JSON），或者执行计算密集型数学，如加密或信号处理。

You can run the full example below:

你可以运行下面这个完整的例子：

{% prettify dart %}
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:isolate';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
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
    return new Center(child: new CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() => new ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return new Padding(padding: new EdgeInsets.all(10.0), child: new Text("Row ${widgets[i]["title"]}"));
  }

  loadData() async {
    ReceivePort receivePort = new ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message.
    SendPort sendPort = await receivePort.first;

    List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

    setState(() {
      widgets = msg;
    });
  }

  // the entry point for the isolate
  static dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    ReceivePort port = new ReceivePort();

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
    ReceivePort response = new ReceivePort();
    port.send([msg, response.sendPort]);
    return response.first;
  }
}
{% endprettify %}

### How do I make network requests?

### 如何发送一个网络请求？

In Xamarin.Forms you would use `HttpClient`. Making a network call in Flutter
is easy when you use the popular
[`http` package]({{site.pub}}/packages/http).
This abstracts away a lot of the networking that you might normally
implement yourself, making it simple to make network calls.

在 Xamarin.Forms 中，你可以使用 `HttpClient`。
当您使用流行的[`http` package]({{site.pub}}/packages/http)包时，在 Flutter 中进行网络调用就很容易了。
这将抽象出许多您通常可能自己实现的网络，从而使网络调用变简化。

To use the `http` package, add it to your dependencies in `pubspec.yaml`:

要使用 `http` 包，请将它添加到  `pubspec.yaml` 文件中的依赖项中：

{% prettify yaml %}
dependencies:
  ...
  http: ^0.11.3+16
{% endprettify %}

To make a network request, call `await` on the `async` function `http.get()`:

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

### 如何显示长时间运行的任务的进度？

In Xamarin.Forms you would typically create a loading indicator,
either directly in XAML or through a 3rd party plugin such as AcrDialogs.

在 Xamarin.Forms 中常会创建一个加载指示器，可以直接在XAML中创建，也可以通过第三方插件创建，比如 AcrDialogs。

In Flutter, use a `ProgressIndicator` widget.
Show the progress programmatically by controlling when it's rendered
through a boolean flag. Tell Flutter to update its state before your
long-running task starts, and hide it after it ends.

在 Flutter 中，使用一个 `加载指示器（ ProgressIndicator）`widget。
通过一个布尔标志控制何时渲染来以编程方式显示进度。
告诉 Flutter 在长时间运行的任务开始之前更新它的状态，并在任务结束后隐藏它。

In the following example,
the build function is separated into three different
functions. If `showLoadingDialog()` is `true` (when `widgets.length == 0`),
then render the `ProgressIndicator`. Otherwise, render the
`ListView` with the data returned from a network call.

在下面的示例中，build 函数被分成三个不同的函数。
如果 `showLoadingDialog()` 是 `true` （即当`widgets.length == 0`时）就会渲染出 `进度指示器`。
另一方面，用网络调用返回的数据渲染 `列表视图（ListView）`。

{% prettify dart %}
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
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
    return new Center(child: new CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() => new ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return new Padding(padding: new EdgeInsets.all(10.0), child: new Text("Row ${widgets[i]["title"]}"));
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

## 项目结构与资源

### Where do I store my image files?

### 如何储存我的图片文件？

Xamarin.Forms has no platform independent way of storing images,
you had to place images in the iOS `xcasset` folder or on Android,
in the various `drawable` folders.

Xamarin.Forms 没有独立于平台的存储图像的方法，
您必须放置图片在 iOS 的 `xcasset` 文件夹,
或 Android 的 `drawable` 文件夹中。

While Android and iOS treat resources and assets as distinct items,
Flutter apps have only assets. All resources that would live in the
`Resources/drawable-*` folders on Android, are placed in an assets
folder for Flutter.

Android和iOS将资源（resources）和资产（assets）视为不同的项目，而 Flutter 应用程序只有资产（assets）。
`Resources/drawable-*` 文件夹中的所有资源都放在一个 Flutter 的资产文件夹中。

Flutter follows a simple density-based format like iOS.
Assets might be `1.0x`, `2.0x`, `3.0x`, or any other multiplier.
Flutter doesn't have `dp`s but there are logical pixels,
which are basically the same as device-independent pixels.
The so-called
[`devicePixelRatio`]({{site.api}}/flutter/dart-ui/Window/devicePixelRatio.html)
expresses the ratio of physical pixels in a single logical pixel.

Flutter 遵循一种与 iOS 类似的简单的基于密度（density-based）的格式。
资产可能是 `1.0x`、`2.0x`、`3.0x` 或任何其他倍数。Flutter 没有 `dp`，但是有逻辑像素，这基本上是与设备无关像素相同。
用所谓 [`devicePixelRatio`]({{site.api}}/flutter/dart-ui/Window/devicePixelRatio.html) 表示单个逻辑像素中物理像素的比例。

The equivalent to Android's density buckets are:

与 Android 的密度桶相等的是：

Android density qualifier | Flutter pixel ratio
--------------------------|--------------------
`ldpi`                    | `0.75x`
`mdpi`                    | `1.0x`
`hdpi`                    | `1.5x`
`xhdpi`                   | `2.0x`
`xxhdpi`                  | `3.0x`
`xxxhdpi`                 | `4.0x`

Assets are located in any arbitrary folder&mdash;Flutter has no
predefined folder structure. You declare the assets (with location) in
the `pubspec.yaml` file, and Flutter picks them up.

资产位于任意文件夹中&mdash; Flutter 没有预定义的文件夹结构。
在 `pubspec.yaml` 文件中声明资产(带有位置)，Flutter 就会得到它们。

Note that before Flutter 1.0 beta 2, assets defined in Flutter were not
accessible from the native side, and vice versa, native assets and resources
weren’t available to Flutter, as they lived in separate folders.

注意，在 Flutter 1.0 beta 2 之前的版本中，Flutter 中定义的资产并不能从原生一侧访问，
反之亦然，原生资产和资源对 Flutter 无效，就像他们被放在单独的文件夹中。

As of Flutter beta 2, assets are stored in the native asset folder,
and are accessed on the native side using Android's `AssetManager`:

在 Flutter beta 2 版本中，资产都被存储在原生的资产文件夹中，并且可以通过 Android 的`资产管理器（AssetManager）` 从原生一侧被访问。

As of Flutter beta 2, Flutter still cannot access native resources,
nor it can access native assets.

在 Flutter beta 2 版本中，Flutter 仍然不能访问原生资源，也不能访问原生资产。

To add a new image asset called `my_icon.png` to our Flutter project,
for example, and deciding that it should live in a folder we
arbitrarily called `images`, you would put the base image (1.0x)
in the `images` folder, and all the other variants in sub-folders
called with the appropriate ratio multiplier:

例如，如果要新建一个新的名为 `my_icon.png` 的图像资产到我们的 Flutter 项目，
并决定它应该放在一个被我们随意命名为 images 的文件夹中，你需要把基础图像（1.0x）放到 `images` 文件夹中，
而所有的其他变量的文件放在以与之对应的比率乘数命名的子文件夹中：

```dart
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

Next, you'll need to declare these images in your `pubspec.yaml` file:

接下来，您需要在您的 `pubspec.yaml` 文件中声明这些图像：

{% prettify yaml %}
assets:
 - images/my_icon.jpeg
{% endprettify %}

You can then access your images using `AssetImage`:

之后就可以用 `AssetImage` 来访问你的图像了：

{% prettify dart %}
return new AssetImage("images/a_dot_burr.jpeg");
{% endprettify %}

or directly in an `Image` widget:

或者可以直接在一个 `Image` widget 中访问：

{% prettify dart %}
@override
Widget build(BuildContext context) {
  return new Image.asset("images/my_image.png");
}
{% endprettify %}

More detailed information can be found in
[Adding assets and images](/docs/development/ui/assets-and-images).

更多详尽的信息可以在 [在 Flutter 中添加资产和图像](/docs/development/ui/assets-and-images) 中找到。

### Where do I store strings? How do I handle localization?

### 在哪里存储字符串？如何处理本地化？

Unlike .NET which has `resx` files, Flutter currently doesn't
have a dedicated resources-like system for strings. At the moment,
the best practice is to hold your copy text in a class as static
fields and accessing them from there. For example:

与 .NET 拥有 `resx` 文件不同，Flutter 目前没有一个专门的字符串类资源系统。
此时，最佳实践是将复制文本作为静态字段保存在类中，并从那里访问它们。
举个例子：

{% prettify dart %}
class Strings {
  static String welcomeMessage = "Welcome To Flutter";
}
{% endprettify %}

Then in your code, you can access your strings as such:

那么在你的代码中，你可以像这样访问你的字符串：

{% prettify dart %}
new Text(Strings.welcomeMessage)
{% endprettify %}

By default, Flutter only supports US English for its strings. If you need to
add support for other languages, include the `flutter_localizations`
package. You might also need to add Dart's
[`intl`]({{site.pub}}/packages/intl)
package to use i10n machinery, such as date/time formatting.

默认情况下，Flutter 的字符串只支持美式英语。
如果你需要添加其他语音的支持，可以包含 `flutter_localizations` 包。
你可能还需要添加 Dart的 [`intl`]({{site.pub}}/packages/intl)
包来使用 i10n 装置，例如日期、时间的格式化。

{% prettify yaml %}
dependencies:
  # ...
  flutter_localizations:
    sdk: flutter
  intl: "^0.15.6"
{% endprettify %}

To use the `flutter_localizations` package,
specify the `localizationsDelegates` and `supportedLocales` on the app widget:

使用 `flutter_localizations` 包时，要在应用程序的 widget 上指定 `localizationsDelegates` 和 `supportedLocales`：

{% prettify dart %}
import 'package:flutter_localizations/flutter_localizations.dart';

new MaterialApp(
 localizationsDelegates: [
   // Add app-specific localization delegate[s] here.
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
{% endprettify %}

The delegates contain the actual localized values, while the `supportedLocales`
defines which locales the app supports. The above example uses a `MaterialApp`,
so it has both a `GlobalWidgetsLocalizations` for the base
widgets localized values, and a `MaterialWidgetsLocalizations` for the Material
widgets localizations. If you use `WidgetsApp` for your app, you don't
need the latter. Note that these two delegates contain "default"
values, but you'll need to provide one or more delegates for your own app's
localizable copy, if you want those to be localized too.

委托包含实际的本地化值，而  `supportedLocales` 定义了应用程序支持哪些本地化。
上面的示例使用了一个 `MaterialApp`，因此它为基本 widget 本地化值提供了一个 `GlobalWidgetsLocalizations`，为Material widget 的本地化提供了一个 `MaterialWidgetsLocalizations`。
如果你的应用程序使用 `WidgetsApp` ，你就不需要后者了。
请注意，这两个委托包含“默认”值，但是如果您希望它们也本地化，则需要为您自己的应用程序的可本地化副本提供一个或多个委托。

When initialized, the `WidgetsApp` (or `MaterialApp`) creates a
[`Localizations`]({{site.api}}/flutter/widgets/Localizations-class.html)
widget for you, with the delegates you specify.
The current locale for the device is always accessible from the `Localizations`
widget from the current context (in the form of a `Locale` object),
or using the
[`Window.locale`]({{site.api}}/flutter/dart-ui/Window/locale.html).

初始化后， `WidgetsApp` （或 `MaterialApp`）为您创建一个
[`Localizations`]({{site.api}}/flutter/widgets/Localizations-class.html)
widget，其中包含您指定的委托。
设备的当前区域设置总是可以从当前上下文的 `Localizations` widget (以 `Locale` 对象的形式)或使用 [`Window.locale`]({{site.api}}/flutter/dart-ui/Window/locale.html) 访问。

To access localized resources, use the `Localizations.of()` method to
access a specific localizations class that is provided by a given delegate.
Use the [`intl_translation`]({{site.pub}}/packages/intl_translation)
package to extract translatable copy to
[arb]({{site.github}}/google/i18n/app-resource-bundle)
files for translating, and importing them back into the app for using them
with `intl`.

要访问本地化的资源，请使用 `Localizations.of()` 方法去访问一个由给定委托提供的特定本地化类。
使用 [`intl_translation`]({{site.pub}}/packages/intl_translation) 包将可翻译的文本拷贝到 [arb]({{site.github}}/google/i18n/app-resource-bundle) 
文件中进行翻译，并将其导入到应用程序中与 `intl` 一起使用。

For further details on internationalization and localization in Flutter,
see the
[internationalization guide](/docs/development/accessibility-and-localization/internationalization),
which has sample code with and without the `intl` package.

要了解更多关于 Flutter 国际化和本地化的细节，请查阅 [国际化指南](/docs/development/accessibility-and-localization/internationalization)，
它有带和不带 `intl` 包的示例代码。

### Where is my project file?

### 我的项目文件在哪里？

In Xamarin.Forms you will have a `csproj` file.
The closest equivalent in Flutter is pubspec.yaml,
which contains package dependencies and various project details.
Similar to .NET Standard,
files within the same directory are considered part of the project.

Xamarin.Forms 中有一个 `csproj` 文件。在 Flutter 中最接近的它的是 pubspec.yaml，
其中包含包依赖项和各种项目细节。
就像 .NET Standard，相同目录中的文件被认为是项目的一部分。

### What is the equivalent of Nuget? How do I add dependencies?

### Nuget 的等价物是什么？如何添加依赖项？


In the .NET eco-system, native Xamarin projects and Xamarin.Forms
projects had access to Nuget and the inbuilt package management system.
Flutter apps contain a native Android app, native iOS app and Flutter app.

在 .NET 生态系统中，原生 Xamarin 项目和 Xamarin.Forms 项目都可以访问 Nuget 和内置的包管理系统。
Flutter 应用程序包含一个原生Android 应用程序，原生 iOS 应用程序 和 Flutter 应用程序。

In Android, you add dependencies by adding to your Gradle build script.
In iOS, you add dependencies by adding to your `Podfile`.

在Android中，您可以通过向Gradle添加构建脚本来添加依赖项。而在iOS中，你可以通过添加到 `Podfile` 来添加依赖项。

Flutter uses Dart's own build system, and the Pub package manager.
The tools delegate the building of the native Android and iOS wrapper
apps to the respective build systems.

Flutter 使用 Dart 自己的构建系统和 Pub 包管理器。
这些工具将原生 Android 和 iOS 封装应用程序的构建委托给各自的构建系统。

In general, use `pubspec.yaml` to declare external dependencies to use in
Flutter. A good place to find Flutter packages is the
[Pub]({{site.pub}}/flutter) site.

一般来说，使用 `pubspec.yaml` 来声明要在 Flutter 中使用的外部依赖项。
[Pub]({{site.pub}}/flutter) 是一个寻找 Flutter 包的好地方。

## Application lifecycle

## 应用程序生命周期

### How do I listen to application lifecycle events?

### 如何侦听应用程序的生命周期事件？

In Xamarin.Forms, you have an `Application` that contains `OnStart`,
`OnResume` and `OnSleep`. In Flutter you can instead listen to similar
lifecycle events by hooking into the `WidgetsBinding` observer and
listening to the `didChangeAppLifecycleState()` change event.

在 Xamarin.Forms 中，拥有一个包含 `OnStart`,、`OnResume` 和 `OnSleep` 的`应用程序`。
在 Flutter 中，您可以通过挂钩到 `WidgetsBinding` 观察者并监听 `didChangeAppLifecycleState()` 更改事件来监听类似的生命周期事件。

The observable lifecycle events are:

可观察的生命周期事件有:

<dl>
<dt>`inactive`</dt>
<dd> <p>The application is in an inactive state and is not receiving
    user input. This event is iOS only.</p><p>* `inactive` — 应用程序处于非活动状态，并且没有接收用户输入。此事件仅适用于iOS。</p></dd>
<dt>`paused`</dt>
<dd><p>The application is not currently visible to
    the user, is not responding to user input,
    but is running in the background.</p><p>应用程序当前对用户不可见，不响应用户输入，但是在后台运行。</p></dd>
<dt>`resumed`</dt>
<dd><p>The application is visible and responding to user input.</p><p>应用程序是可见的，并响应用户输入。</p></dd>
<dt>`suspending`</dt>
<dd><p>The application is suspended momentarily. This event is Android
    only.</p><p>应用程序暂时暂停。此事件仅限Android。</p></dd>
</dl>

For more details on the meaning of these states, see the
[`AppLifecycleStatus` documentation][].

有关这些状态的含义的更多细节，可参考 [`AppLifecycleStatus` 文档][]。

[`AppLifecycleStatus` documentation]: {{site.api}}/flutter/dart-ui/AppLifecycleState-class.html

[`AppLifecycleStatus` 文档]: {{site.api}}/flutter/dart-ui/AppLifecycleState-class.html

## Layouts

## 布局

### What is the equivalent of a StackLayout?

### 什么东西与 StackLayout 等效?

In Xamarin.Forms you can create a `StackLayout` with an `Orientation` of
horizontal or vertical.  Flutter has a similar approach,
however you would use the `Row` or `Column` widgets.

在 Xamarin.Forms 中，可以创建一个带水平或垂直`方向`的 `StackLayout` 。
Flutter 也有类似的方法，不过您将使用 `Row` 或 `Column` widget。

If you notice the two code samples are identical with the exception of the
"Row" and "Column" widget. The children are the same and this feature can be
exploited to develop rich layouts that can change overtime with the same
children.

如果您注意到除了“Row” 和“Column” widget 之外，这两个代码示例是相同的。
这些子元素是相同的，可以利用这个特性开发丰富的布局，这些布局可以随着时间的推移而改变。

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return new Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        new Text('Row One'),
        new Text('Row Two'),
        new Text('Row Three'),
        new Text('Row Four'),
      ],
    );
  }
{% endprettify %}

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return new Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        new Text('Column One'),
        new Text('Column Two'),
        new Text('Column Three'),
        new Text('Column Four'),
      ],
    );
  }
{% endprettify %}

### What is the equivalent of a Grid?

### 什么东西与网格（Grid） 等价?

The closest equivalent of a `Grid` would be a `GridView`.
This is much more powerful than what you are used to in Xamarin.Forms.
A `GridView` provides automatic scrolling when the
content exceeds its viewable space.

与`Grid`最接近的对等项是 `GridView`。这比您在 Xamarin.Forms 中习惯使用的功能强大得多。
`GridView` 在内容超出其可视空间时自动滚动。

{% prettify dart %}
  GridView.count(
    // Create a grid with 2 columns. If you change the scrollDirection to
    // horizontal, this would produce 2 rows.
    crossAxisCount: 2,
    // Generate 100 widgets that display their index in the List
    children: List.generate(100, (index) {
      return Center(
        child: Text(
          'Item $index',
          style: Theme.of(context).textTheme.headline,
        ),
      );
    }),
  );
{% endprettify %}

You might have used a `Grid` in Xamarin.Forms to implement widgets
that overlay other widgets.
In Flutter, you accomplish this with the `Stack` widget

您可能在 Xamarin.Forms 中使用 `Grid` 来实现覆盖其他 widget 的 widget。
在 Flutter 中，您可以使用 `Stack` widget 来完成这一操作。

This sample creates two icons that overlap each other.

这个示例创建了两个相互重叠的图标。

{% prettify dart %}
  child: new Stack(
    children: <Widget>[
      new Icon(Icons.add_box, size: 24.0, color: const Color.fromRGBO(0,0,0,1.0)),
      new Positioned(
        left: 10.0,
        child: new Icon(Icons.add_circle, size: 24.0, color: const Color.fromRGBO(0,0,0,1.0)),
      ),
    ],
  ),
{% endprettify %}

### What is the equivalent of a ScrollView?

### 有什么等同于 ScrollView ？

In Xamarin.Forms, a `ScrollView` wraps around a `VisualElement` and,
if the content is larger than the device screen, it scrolls.

在 Xamarin.Forms 中，`ScrollView` 封装了 `VisualElement` ，如果内容大于设备屏幕，它就会滚动。

In Flutter, the closest match is the `SingleChildScrollView` widget.
You simply fill the Widget with the content that you want to be scrollable.

在 Flutter 中，最接近的是 `SingleChildScrollView` widget。
您只需用想要可滚动的内容来填充 widget。

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return new SingleChildScrollView(
      child: new Text('Long Content'),
    );
  }
{% endprettify %}

If you have many items you want to wrap in a scroll,
even of different `Widget` types, you might want
to use a `ListView`. This might seem like overkill,
but in Flutter this is far more optimized
and less intensive than a Xamarin.Forms `ListView`,
which is backing on to platform specific controls.

如果您想在滚动条中包含许多项，即使是不同的`Widget`类型，也可以使用 `ListView`。
这可能看起来有点过火，但在 Flutter 中，它比 Xamarin.Forms 的回到平台特定控件的 `ListView` 优化得多，松散得多。

{% prettify dart %}
  @override
  Widget build(BuildContext context) {
    return new ListView(
      children: <Widget>[
        new Text('Row One'),
        new Text('Row Two'),
        new Text('Row Three'),
        new Text('Row Four'),
      ],
    );
  }
{% endprettify %}

### How do I handle landscape transitions in Flutter?

### 在 Flutter 中如何处理横向过渡 ?

Landscape transitions can be handled automatically by setting the
`configChanges` property in the AndroidManifest.xml:

通过在 AndroidManifest.xml 中设置 `configChanges` 属性，可以自动处理横向转换。

{% prettify yaml %}
android:configChanges="orientation|screenSize"
{% endprettify %}

## Gesture detection and touch event handling

## 手势检测和触摸事件处理

### How do I add GestureRecognizers to a widget in Flutter?

### 如何在Flutter中向 widget 添加手势识别器?

In Xamarin.Forms, `Element`s might contain a click event you
can attach to. Many elements also contain a `Command` that is
tied to this event. Alternatively you would use the
`TapGestureRecognizer`. In Flutter there are two very similar ways:

在 Xamarin.Forms 中，`元素（Element）`可能包含一个可供附加（attach）的单击事件。许多元素还包含一个与此事件关联的 `命令 `。
或者你可以使用 `TapGestureRecognizer`。在 Flutter 中有两种非常相似的方式：

 1. If the widget supports event detection, pass a function to it and
    handle it in the function. For example, the RaisedButton has an
    `onPressed` parameter:

    如果 widget 支持事件发现（detection），那么可以将函数传递给它并在函数中处理它：

    <!-- skip -->
    ```dart
    @override
    Widget build(BuildContext context) {
      return new RaisedButton(
          onPressed: () {
            print("click");
          },
          child: new Text("Button"));
    }
    ```

 2. If the widget doesn't support event detection, wrap the
    widget in a GestureDetector and pass a function to the
    `onTap` parameter.

   如果 widget 不支持事件发现，则将 widget 封装在手势检测器（GestureDetector）中，并将函数传递给“onTap”参数。

    <!-- skip -->
    ```dart
    class SampleApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return new Scaffold(
            body: new Center(
          child: new GestureDetector(
            child: new FlutterLogo(
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

### 我如何处理 widget 上的其他手势？

In Xamarin.Forms you would add a `GestureRecognizer` to the
`VisualElement`. You would normally be limited to `TapGestureRecognizer`,
`PinchGestureRecognizer` and `PanGestureRecognizer`,
unless you built your own.

在 Xamarin.Forms 中你可以在`VisualElement`中添加一个`手势识别器（GestureRecognizer）`。
您通常只能使用 `TapGestureRecognizer`、`PinchGestureRecognizer` 和 `PanGestureRecognizer`，除非您构建了自己的实现。

In Flutter, using the GestureDetector, you can listen to a wide
range of Gestures such as:

在Flutter中，使用手势检测器，你可以监听到各种各样的手势，比如:

* Tap

* 单击

<dl>
  <dt>`onTapDown`</dt>
  <dd>A pointer that might cause a tap has contacted the screen at a
      particular location.</dd>
  <dt>`onTapUp`</dt>
  <dd>A pointer that triggers a tap has stopped contacting the
      screen at a particular location.</dd>
  <dt>`onTap`</dt>
  <dd>A tap has occurred.</dd>
  <dt>`onTapCancel`</dt>
  <dd>The pointer that previously triggered the `onTapDown` won't
      cause a tap.</dd>
</dl>

<dl>
  <dt>`onTapDown`</dt>
  <dd>当指尖在特定位置与屏幕接触产生点击事件。</dd>
  <dt>`onTapUp`</dt>
  <dd>当指尖触发的点击事件已经停止在特定位置与屏幕接触。</dd>
  <dt>`onTap`</dt>
  <dd>一个点击事件已经发生</dd>
  <dt>`onTapCancel`</dt>
  <dd>触发了 `onTapDown` 事件之后的指尖没有导致点击事件。</dd>
</dl>

* Double tap

* 双击

<dl>
  <dt>`onDoubleTap`</dt>
  <dd>The user tapped the screen at the same location twice in
      quick succession.</dd>
</dl>

<dl>
  <dt>`onDoubleTap`</dt>
  <dd>用户在同一位置连续快速点击屏幕两次。</dd>
</dl>


* Long press

* 长按

<dl>
  <dt>`onLongPress`</dt>
  <dd>A pointer has remained in contact with the screen at the same
      location for a long period of time.</dd>
</dl>

<dl>
  <dt>`onLongPress`</dt>
  <dd>指尖长时间保持与屏幕在同一位置的接触。</dd>
</dl>

* Vertical drag

* 垂直拖动

<dl>
  <dt>`onVerticalDragStart`</dt>
  <dd>A pointer has contacted the screen and might begin to
      move vertically.</dd>
  <dt>`onVerticalDragUpdate`</dt>
  <dd>A pointer in contact with the screen
      has moved further in the vertical direction.</dd>
  <dt>`onVerticalDragEnd`</dt>
  <dd>A pointer that was previously in contact with the
      screen and moving vertically is no longer in contact
      with the screen and was moving at a specific velocity
      when it stopped contacting the screen.</dd>
</dl>

<dl>
  <dt>`onVerticalDragStart`</dt>
  <dd>指尖与屏幕接触后，可能开始垂直移动。</dd>
  <dt>`onVerticalDragUpdate`</dt>
  <dd>指尖与屏幕接触并在垂直方向上移动得更远。</dd>
  <dt>`onVerticalDragEnd`</dt>
  <dd>指尖在之前与屏幕接触并垂直移动，当不再与屏幕接触时触发这个事件。当它停止与屏幕接触时，它会以特定的速度移动。</dd>
</dl>


* Horizontal drag

* 水平拖动

<dl>
  <dt>`onHorizontalDragStart`</dt>
  <dd>A pointer has contacted the screen and might begin
      to move horizontally.</dd>
  <dt>`onHorizontalDragUpdate`</dt>
  <dd>A pointer in contact with the screen
      has moved further in the horizontal direction.</dd>
  <dt>`onHorizontalDragEnd`</dt>
  <dd>A pointer that was previously in contact with the
      screen and moving horizontally is no longer in contact
      with the screen and was moving at a specific velocity
      when it stopped contacting the screen.</dd>
</dl>

<dl>
  <dt>`onHorizontalDragStart`</dt>
  <dd>指尖与屏幕接触，开始水平移动时触发。</dd>
  <dt>`onHorizontalDragUpdate`</dt>
  <dd>指尖与屏幕接触并在水平方向上移动得更远。</dd>
  <dt>`onHorizontalDragEnd`</dt>
  <dd>指尖在之前与屏幕接触并水平移动，当不再与屏幕接触时会触发这个事件。当它停止与屏幕接触时，它正在以特定的速度移动。</dd>
</dl>

The following example shows a `GestureDetector` that rotates the
Flutter logo on a double tap:

下面的例子展示了一个`手势检测器`，它可以在双击下旋转 Flutter 的 logo：

{% prettify dart %}
AnimationController controller;
CurvedAnimation curve;

@override
void initState() {
  controller = new AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
  curve = new CurvedAnimation(parent: controller, curve: Curves.easeIn);
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        body: new Center(
          child: new GestureDetector(
            child: new RotationTransition(
                turns: curve,
                child: new FlutterLogo(
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

## Listviews and adapters

## 列表视图和适配器

### What is the equivalent to a ListView in Flutter?

### 在 Flutter 中，与列表视图等价的是什么？

The equivalent to a `ListView` in Flutter is … a `ListView`!

在Flutter中与 `ListView` 等价的是……一个 `ListView`！

In a Xamarin.Forms `ListView`,
you create a `ViewCell` and possibly a `DataTemplateSelector`
and pass it into the `ListView`, which renders each row with
what your `DataTemplateSelector` or `ViewCell` returns.
However, you often have have to make sure you turn on Cell Recycling
otherwise you will run into memory issues and slow scrolling speeds.

在一个 Xamarin.Forms 的 `ListView` 中，你可以创建一个 `ViewCell` 可能还有一个 `DataTemplateSelector` 
并将其传递到 `ListView` 中，该视图将用您的`DataTemplateSelector` 或者 `ViewCell` 的返回数据渲染每一行。
但是，您通常必须确保打开单元格回收，否则会遇到内存问题和会使滚动速度变慢。

Due to Flutter's immutable widget pattern, you pass a list of
widgets to your `ListView`, and Flutter takes care of making sure
that scrolling is fast and smooth.

由于 Flutter 的不可变的 widget 模式，您将一个 widget 列表传递给您的 `ListView`，Flutter 会负责确保滚动速度快且平稳。

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(new Padding(padding: new EdgeInsets.all(10.0), child: new Text("Row $i")));
    }
    return widgets;
  }
}
{% endprettify %}

### How do I know which list item has been clicked?

### 如何知道哪个列表项被点击了？

In Xamarin.Forms, the ListView has an `ItemTapped` method to find out
which item was clicked. There are many other techniques you might have
used such as checking when `SelectedItem` or `EventToCommand`
behaviors change.

在 Xamarin.Forms 中，ListView 拥有一个`ItemTapped` 方法能找出哪个列表项被单击了。
您可能还使用了许多其他技术，比如检查 `SelectedItem` 或`EventToCommand` 的行为何时会发生更改。

In Flutter, use the touch handling provided by the passed-in widgets.

在 Flutter 中，使用传入 widget 提供的触摸处理。

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(new GestureDetector(
        child: new Padding(
            padding: new EdgeInsets.all(10.0),
            child: new Text("Row $i")),
        onTap: () {
          print('row tapped');
        },
      ));
    }
    return widgets;
  }
}
{% endprettify %}

### How do I update a ListView dynamically?

### 如何动态更新 ListView ?

In Xamarin.Forms, if you bound the `ItemsSource` property to
an `ObservableCollection` you would just update the list in your
ViewModel. Alternatively, you could assign a new `List` to the
`ItemSource` property.

在 Xamarin.Forms 中，如果将 `ItemsSource` 属性绑定到一个 `ObservableCollection`，就只需要更新视图模型中的列表。
另一种方法是，你可以给属性 `ItemsSource` 分配一个新的 `列表` 。

In Flutter, things work a little differently.
If you update the list of widgets inside a `setState()` method,
you would quickly see that your data did not change visually.
This is because when `setState()` is called,
the Flutter rendering engine looks at the widget tree to see if
anything has changed. When it gets to your
`ListView`, it performs a `==` check, and determines that the two
`ListView`s are the same. Nothing has changed, so no update is required.

在 Flutter 中，情况略有不同。如果您要在 `setState()` 内更新 widget 列表，您将很快看到您的数据在视觉上没有发生变化。
这是因为当 `setState()` 被调用时，Flutter 的渲染引擎会检查 widget 树是否发生了更改。
当它到达您的 `ListView` 时，会执行 `==` 检查，并确定这两个 `ListView` 是相同的。
没有任何更改，就不需要更新。

For a simple way to update your `ListView`, create a new `List` inside of
`setState()`, and copy the data from the old list to the new list.
While this approach is simple, it is not recommended for large data sets,
as shown in the next example.

要更新 `ListView` 的有一个简单方法，请在 `setState()` 中创建一个新 `列表` ，并将数据从旧列表复制到新列表。
虽然这种方法很简单，但不推荐用于大型数据集，如下例所示。

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
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
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new ListView(children: widgets),
    );
  }

  Widget getRow(int i) {
    return new GestureDetector(
      child: new Padding(
          padding: new EdgeInsets.all(10.0),
          child: new Text("Row $i")),
      onTap: () {
        setState(() {
          widgets = new List.from(widgets);
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
list or a list with very large amounts of data. This is essentially
the equivalent of RecyclerView on Android, which automatically
recycles list elements for you:

推荐的、高效的、有效的列表构建方法是使用 `ListView.Builder`。
在您有一个动态列表或一个包含大量数据的列表时，这种方法非常棒。
这基本上相当于 Android 上的 `RecyclerView`，它会自动回收列表元素：

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
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
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Sample App"),
        ),
        body: new ListView.builder(
            itemCount: widgets.length,
            itemBuilder: (BuildContext context, int position) {
              return getRow(position);
            }));
  }

  Widget getRow(int i) {
    return new GestureDetector(
      child: new Padding(
          padding: new EdgeInsets.all(10.0),
          child: new Text("Row $i")),
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
takes two key parameters: the initial length of the list,
and an ItemBuilder function.

与创建一个“列表视图” 相比，创建一个 `ListView.builder`
需要接受两个关键参数：列表的初始长度和 `ItemBuilder` 函数。

The ItemBuilder function is similar to the `getView` function in
an Android adapter; it takes a position,
and returns the row you want rendered at that position.

ItemBuilder 函数类似于 Android 适配器中的 `getView` 函数；
它接受一个位置，并返回您希望的在该位置呈现的行。

Finally, but most importantly, notice that the `onTap()` function
doesn't recreate the list anymore, but instead adds to it.

最后，但也是最重要的，要注意 `onTap()` 函数不再重新创建列表，
而是用 `.add` 添加给它的。

For more information, see
[Write your first Flutter app,
part 1]({{site.codelabs}}/codelabs/first-flutter-app-pt1)
and [Write your first Flutter app,
part 2]({{site.codelabs}}/codelabs/first-flutter-app-pt2)

更多信息，请访问
[编写您的第一个 Flutter 应用程序，第1部分]({{site.codelabs}}/codelabs/first-flutter-app-pt1-cn/index.html)
和 [编写您的第一个 Flutter 应用程序，第2部分]({{site.codelabs}}/codelabs/first-flutter-app-pt2-cn/index.html)

## Working with text

## 文本处理

### How do I set custom fonts on my text widgets?

### 如何在文本（Text） widget 上设置自定义字体?

In Xamarin.Forms, you would have to add a custom font in each native
project. Then, in your `Element` you would assign this font name
to the `FontFamily` attribute using `filename#fontname`
and just `fontname` for iOS.

在 Xamarin.Forms 中，您必须在每个原生项目中添加自定义字体。
然后在你的 `元素` 中，你会使用 `filename#fontname` 给 `FontFamily` 属性分配这个字体名，而在iOS中只使用 `fontname` 。

In Flutter, place the font file in a folder and reference it in the
`pubspec.yaml` file, similar to how you import images.

在 Flutter 中，将字体文件放在一个文件夹中，并在 `pubspec.yaml` 中引用它，这跟导入图像的方式类似。

{% prettify yaml %}
fonts:
   - family: MyCustomFont
     fonts:
       - asset: fonts/MyCustomFont.ttf
       - style: italic
{% endprettify %}

Then assign the font to your `Text` widget:

{% prettify dart %}
@override
Widget build(BuildContext context) {
  return new Scaffold(
    appBar: new AppBar(
      title: new Text("Sample App"),
    ),
    body: new Center(
      child: new Text(
        'This is a custom font text',
        style: new TextStyle(fontFamily: 'MyCustomFont'),
      ),
    ),
  );
}
{% endprettify %}

### How do I style my text widgets?

### 如何设置文本 widget 的样式？

Along with fonts, you can customize other styling elements on a `Text` widget.
The style parameter of a `Text` widget takes a `TextStyle` object,
where you can customize many parameters, such as:

除了字体，您还可以在`文本` widget 上定制其他样式元素。
`文本` widget 的样式参数接受一个 `TextStyle` 对象，您可以在其中定制许多参数，比如:

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

## 表单录入

### How do I retrieve user input?

### 如何检索用户输入？

Xamarin.Forms `element`s allow you to directly query the `element`
to determine the state of any of its properties,
or whether it's bound to a property in a `ViewModel`.

Xamarin.Forms 的`元素`允许您直接查询`元素`来确定它的任何属性的状态，或者它被绑定到`视图模型`中的属性。

Retrieving information in Flutter is handled by specialized widgets
and is different than how you are used to. If you have a `TextField`
or a `TextFormField`, you can supply a
[`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html)
to retrieve user input:

在 Flutter 中检索信息是由专门的 widget 处理的，这是跟原来的习惯不同的。
如果你有一个 `TextField` 或 `TextFormField` ，你可以提供一个 
[`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html) 
来检索用户输入:

{% prettify dart %}
class _MyFormState extends State<MyForm> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final myController = new TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when disposing of the widget.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Retrieve Text Input'),
      ),
      body: new Padding(
        padding: const EdgeInsets.all(16.0),
        child: new TextField(
          controller: myController,
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        // When the user presses the button, show an alert dialog with the
        // text that the user has typed into our text field.
        onPressed: () {
          return showDialog(
            context: context,
            builder: (context) {
              return new AlertDialog(
                // Retrieve the text that the user has entered using the
                // TextEditingController.
                content: new Text(myController.text),
              );
            },
          );
        },
        tooltip: 'Show me the value!',
        child: new Icon(Icons.text_fields),
      ),
    );
  }
}
{% endprettify %}

You can find more information and the full code listing in
[Retrieve the value of a text field](/docs/cookbook/forms/retrieve-input),
from the [Flutter cookbook](/docs/cookbook).

你可以在[Flutter 指南](/docs/cookbook)中的[检索一个文本字段的值](/docs/cookbook/forms/retrieve-input)找到更多的信息和完整的代码清单。

### What is the equivalent of a "Placeholder" on an Entry?

### 在入口的“占位符”与什么等价？

In Xamarin.Forms, some `Elements` support a `Placeholder` property
that you can assign a value to. For example:

在 Xamarin.Forms 中，一些`元素`支持`占位符（Placeholder）`属性，可以给它赋一个值。如：

{% prettify xml %}
  <Entry Placeholder="This is a hint">
{% endprettify %}

In Flutter, you can easily show a "hint" or a placeholder text
for your input by adding an InputDecoration object to the
decoration constructor parameter for the text widget.

在 Flutter 中，通过在文本 widget 的装饰器构造函数参数中添加 `InputDecoration` 对象，可以轻松地为输入显示“提示”或占位符文本。

{% prettify dart %}
body: new Center(
  child: new TextField(
    decoration: new InputDecoration(hintText: "This is a hint"),
  )
)
{% endprettify %}

### How do I show validation errors?

### 如何显示验证错误？

With Xamarin.Forms, if you wished to provide a visual hint of a
validation error, you would need to create new properties and
`VisualElement`s surrounding the `Element`s that had validation errors.

使用 Xamarin.Forms 时，如果您希望提供验证错误的可视化提示，则需要创建新属性和 `虚拟元素（VisualElement）` 来包围具有验证错误的元素。

In Flutter, you pass through an InputDecoration object to the
decoration constructor for the text widget.

在 Flutter 中，我们将 `InputDecoration` 对象传递给文本 widget 的装饰器构造函数。

However, you don't want to start off by showing an error.
Instead, when the user has entered invalid data,
update the state, and pass a new `InputDecoration` object.

然而，您不希望从显示错误开始。
相反，当用户输入无效数据时，应该更新状态，并传递一个新的 `InputDecoration` 对象。

{% prettify dart %}
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String _errorText;

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new Center(
        child: new TextField(
          onSubmitted: (String text) {
            setState(() {
              if (!isEmail(text)) {
                _errorText = 'Error: This is not an email';
              } else {
                _errorText = null;
              }
            });
          },
          decoration: new InputDecoration(hintText: "This is a hint", errorText: _getErrorText()),
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

    RegExp regExp = new RegExp(emailRegexp);

    return regExp.hasMatch(em);
  }
}
{% endprettify %}

## Flutter plugins

## Flutter 插件

## Interacting with hardware, third party services, and the platform

## 与硬件、第三方服务和平台交互

### How do I interact with the platform, and with platform native code?

### 应该如何与平台以及平台原生代码交互?

Flutter doesn't run code directly on the underlying platform;
rather, the Dart code that makes up a Flutter app is run natively
on the device, "sidestepping" the SDK provided by the platform.
That means, for example, when you perform a network request
in Dart, it runs directly in the Dart context. You don't use the
Android or iOS APIs you normally take advantage of when writing
native apps. Your Flutter app is still hosted in a native app's
`ViewController` or `Activity` as a view,
but you don't have direct access to this, or the native framework.

Flutter 不直接在底层平台上运行代码。相反，构成一个 Flutter 应用程序的 Dart 代码是在设备上原生运行的，“绕开”了平台提供的 SDK。
这意味着，例如，当您在 Dart 中执行网络请求时，它将直接运行在 Dart 上下文中。在编写原生应用程序时，您通常不会使用 Android 或 iOS 的 API。
Flutter 应用程序仍然作为视图驻留在原生应用程序的 `ViewController`或 `Activity` 中，但您不能直接访问这个或原生框架。

This doesn't mean Flutter apps can't interact with those native APIs,
or with any native code you have. Flutter provides [platform
channels](/docs/development/platform-integration/platform-channels)
that communicate and exchange data with the `ViewController` or
`Activity` that hosts your Flutter view.
Platform channels are essentially an asynchronous messaging
mechanism that bridges the Dart code with the host `ViewController`
or `Activity` and the iOS or Android framework it runs on.
You can use platform channels to execute a method on the native side,
or to retrieve some data from the device's sensors, for example.

这并不意味着 Flutter 应用程序不能与这些原生 API 或您自己的任何原生代码交互。
Flutter 提供 [平台通道](/docs/development/platform-integration/platform-channels),
可以与托管 Flutter 视图的 `ViewController` 或 `Activity` 通信和交换数据。
平台通道本质上是一个异步消息传递机制，它将 Dart 代码与 `ViewController` 或 `Activity` 宿主以及它所运行的 iOS 或 Android 框架桥接起来。
例如，您可以使用平台通道在原生端执行一个方法，或者从设备的传感器检索一些数据。

In addition to directly using platform channels,
you can use a variety of pre-made
[plugins](/docs/development/packages-and-plugins/using-packages)
that encapsulate the native and Dart code for a specific goal.
For example, you can use a plugin to access
the camera roll and the device camera directly from Flutter,
without having to write your own integration.
Plugins are found on the [Pub site]({{site.pub}}),
Dart and Flutter's open source package repository.
Some packages might support native integrations on iOS,
or Android, or both.

除了直接使用平台通道外，您还可以使用各种预制[插件](/docs/development/packages-and-plugins/using-packages)，它们封装了针对特定目标的原生代码和Dart代码。
例如，您可以使用插件直接从Flutter访问相机交卷和设备相机，而无需编写自己的集成。
插件可以在[在 Pub]({{site.pub}})、Dart 和 Flutter 的开源包存储库中找到。
有些包可能支持iOS上的本地集成，有些支持Android，还有两者都兼而有之的。


If you can't find a plugin on Pub that fits your needs,
you can [write your
own](/docs/development/packages-and-plugins/developing-packages),
and [publish it on
Pub](/docs/development/packages-and-plugins/developing-packages#publish).

如果在Pub上找不到适合您需求的插件，您可以
[编写自己的插件](/docs/development/packages-and-plugins/developing-packages)
并[在Pub上发布](/docs/development/packages-and-plugins/developing-packages#publish)。

### How do I access the GPS sensor?

### 如何访问 GPS 传感器?

Use the [`geolocator`]({{site.pub}}/packages/geolocator) community plugin.

使用 [`geolocator`]({{site.pub}}/packages/geolocator) 社区插件.

### How do I access the camera?

### 如何访问摄相机？

The [`image_picker`]({{site.pub}}/packages/image_picker) plugin is popular
for accessing the camera.

[`image_picker`]({{site.pub}}/packages/image_picker) 是流行的访问相机的插件。

### How do I log in with Facebook?

### 如何通过 Facebook 登录？

To log in with Facebook, use the

[`flutter_facebook_login`]({{site.pub}}/packages/flutter_facebook_login) community plugin.

使用 [`flutter_facebook_login`]({{site.pub}}/packages/flutter_facebook_login) 社区插件来通过 Facebook 登录。

### How do I use Firebase features?

### 如何使用 Firebase 特性？

Most Firebase functions are covered by
[first party plugins]({{site.pub}}/flutter/packages?q=firebase).
These plugins are first-party integrations, maintained by the Flutter team:

大多数 Firebase 功能被[第一方插件]({{site.pub}}/flutter/packages?q=firebase) 覆盖。

 * [`firebase_admob`]({{site.pub}}/packages/firebase_admob) for Firebase AdMob
 * [`firebase_analytics`]({{site.pub}}/packages/firebase_analytics) for Firebase Analytics
 * [`firebase_auth`]({{site.pub}}/packages/firebase_auth) for Firebase Auth
 * [`firebase_database`]({{site.pub}}/packages/firebase_database) for Firebase RTDB
 * [`firebase_storage`]({{site.pub}}/packages/firebase_storage) for Firebase Cloud Storage
 * [`firebase_messaging`]({{site.pub}}/packages/firebase_messaging) for Firebase Messaging (FCM)
 * [`flutter_firebase_ui`]({{site.pub}}/packages/flutter_firebase_ui) for quick Firebase Auth integrations (Facebook, Google, Twitter and email)
 * [`cloud_firestore`]({{site.pub}}/packages/cloud_firestore) for Firebase Cloud Firestore

You can also find some third-party Firebase plugins on Pub that cover areas
not directly covered by the first-party plugins.

你也可以在 Pub 上找一些第三方 Firebase 插件，它们覆盖了第一方插件没有直接覆盖的区域。

### How do I build my own custom native integrations?

### 如何构建自定义的原生集成？

If there is platform-specific functionality that Flutter or its community
plugins are missing, you can build your own following the
[developing packages and
plugins](/docs/development/packages-and-plugins/developing-packages) page.

如果有 Flutter 或它的社区插件没有的指定平台的功能，可以根据[开发包与插件](/docs/development/packages-and-plugins/developing-packages) 页面自己构建。

Flutter's plugin architecture, in a nutshell,
is much like using an Event bus in Android:
you fire off a message and let the receiver process and emit a result
back to you. In this case, the receiver is code running on the native side
on Android or iOS.

简单地说，Flutter 的插件架构很像在 Android 中使用事件总线：
您发出一条消息，让接收方处理并向您发回一个结果。
在这个例子中，接收方是运行在 Android 或 iOS 上的原生代码。

## Themes (Styles)

## 主题 （样式）

### How do I theme my app?

### 如何美化我的应用程序？

Flutter comes with a beautiful, built-in implementation of Material
Design, which handles much of the styling and theming needs that you would
typically do.

Flutter 附带了一个内建的漂亮的 Material Design 实现，它处理了许多您通常会做的样式和主题需求

Xamarin.Forms does have a global `ResourceDictionary` where you can
share styles across your app. Alternatively, there is Theme support
currently in preview.

Xamarin.Forms 确实有一个全局的 `资源字典`，可以为你的应用程序共享样式。另外，预览版目前还支持主题。

In Flutter you declare themes in the top level widget.

在 Flutter 中，需要在最顶级 widget 中声明主题。

To take full advantage of Material Components in your app,
you can declare a top level widget `MaterialApp` as the entry
point to your application. MaterialApp is a convenience widget
that wraps a number of widgets that are commonly required for
applications implementing Material Design. It builds upon a WidgetsApp by
adding Material-specific functionality.

要在应用程序中充分利用 Material 组件，需要声明一个最顶级 widget `MaterialApp` 作为应用程序的入口点。
MaterialApp 是一个方便的 widget，它封装了许多实现Material Design的应用程序通常需要的各种 widget。
它通过添加 Material 的指定功能来构建一个 WidgetsApp。

You can also use a `WidgetApp` as your app widget,
which provides some of the same functionality,
but is not as rich as `MaterialApp`.

还可以使用一个 `WidgetApp` 作为应用程序的 widget，它提供了一些相同的功能，但没有 `MaterialApp` 丰富。

To customize the colors and styles of any child components,
pass a `ThemeData` object to the `MaterialApp` widget.
For example, in the following code,
the primary swatch is set to blue and text selection color is red.

要定制任何子组件的颜色和样式，请将`主题数据（ThemeData）`对象传递给`MaterialApp` widget。
例如，在下面的代码中，主色调设置为蓝色，文本选择颜框色为红色。

{% prettify dart %}
class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
        textSelectionColor: Colors.red
      ),
      home: new SampleAppPage(),
    );
  }
}
{% endprettify %}

## Databases and local storage

## 数据库与本地存储

### How do I access shared preferences or UserDefaults?

### 如何访问共享首选项或用户默认值?

Xamarin.Forms developers will likely be familar with the
`Xam.Plugins.Settings` plugin.

Xamarin.Forms 开发者可能会熟悉 `Xam.Plugins.Settings` 插件。

In Flutter, access equivalent functionality using the
[shared_preferences]({{site.pub}}/packages/shared_preferences) plugin.
This plugin wraps the functionality of both `UserDefaults` and the Android
equivalent, `SharedPreferences`.

在 Flutter 中，使用 [Shared Preferences 插件]({{site.pub}}/packages/shared_preferences) 就可以访问相同的功能。
这个插件封装了 `用户默认值` 和等同 Android 的 `共享首选项`。

### How do I access SQLite in Flutter?

### 在 Flutter 中如何访问 SQLite

In Xamarin.Forms most applications would use the `sqlite-net-pcl`
plugin to access SQLite databases.

在 Xamarin.Forms 中大多数应用会使用 `sqlite-net-pcl` 插件来访问 SQLite 数据库。

In Flutter, access this functionality using the
[sqflite]({{site.pub}}/packages/sqflite) plugin.

在 Flutter 中，使用 [SQFlite]({{site.pub}}/packages/sqflite) 插件来访问这个功能。

## Notifications

## 通知

### How do I set up push notifications?

### 如何设置通知推送?

In Android, you use Firebase Cloud Messaging to setup push
notifications for your app.

在 Android 中，你可以利用 Firebase Cloud Messaging 来给应用程序设置通知推送。

In Flutter, access this functionality using the
[Firebase_Messaging]({{site.github}}/flutter/plugins/tree/master/packages/firebase_messaging)
plugin.
For more information on using the Firebase Cloud Messaging API, see the
[`firebase_messaging`]({{site.pub}}/packages/firebase_messaging)
plugin documentation.

在 Flutter 中，通过 [Firebase_Messaging]({{site.github}}/flutter/plugins/tree/master/packages/firebase_messaging) 插件
来访问这个功能。
更多关于使用 Firebase Cloud Messaging API 的信息，可以参考 [`firebase_messaging`]({{site.pub}}/packages/firebase_messaging) 插件文档。
