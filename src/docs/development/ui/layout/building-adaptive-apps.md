---
title: Building adaptive apps
title: 构建自适应的应用
description: Some considerations and instructions on how to build adaptive apps to run on a variety of platforms.
description: 针对多样化的平台构建自适应的应用的重点和指南。
---

## Overview

## 概览

Flutter provides new opportunities to build apps that can
run on mobile, desktop, and the web from a single codebase.
However, with these opportunities, come new challenges.
You want your app to feel familiar to users,
adapting to each platform by maximizing usability and
ensuring a comfortable and seamless experience.
That is, you need to build apps that are not just
multiplatform, but are fully platform adaptive.

Flutter 为在移动端、桌面端和 Web 端使用同样的代码构建应用创造了新的机会。
伴随着机会而来的，是新的挑战。
你可能会希望你的应用既能在尽可能复用的情况下自适应多个平台，
又能保证流畅且无缝的体验，还可以让用户保持一致的使用习惯。
这样的应用不仅仅是为了多个平台而构建的，它能完全地自适应平台的变化。

There are many considerations for developing platform-adaptive
apps, but they fall into three major categories:

在构建平台自适应的应用时，有众多的考量因素，总的来说分为以下几类：

* [Layout](#layout)

  [布局](#layout)

* [Input](#input)

  [输入](#input)

* [Idioms and norms](#idioms-and-norms)

  [平台行为习惯与规范](#idioms-and-norms)

{% comment %}
TODO Embed Kevin's video when available.
{% endcomment %}

This page covers all three categories in detail
using code snippets to illustrate the concepts.
If you’d like to see how these concepts come together,
check out the [Flokk][] and [Folio][] examples that
were built using the concepts described here.

指南将通过代码片段，详细说明三个类别的概念。
若你想了解这些概念的实际落地情况，可以参考 [Flokk][] 和 [Folio][] 示例。

[Flokk]: {{site.github}}/gskinnerTeam/flokk
[Folio]: {{site.github}}/gskinnerTeam/flutter-folio

## Building adaptive layouts

## 构建自适应的布局

One of the first things you must consider when bringing
your app to multiple platforms is how to adapt
it to the various sizes and shapes of the screens that
it will run on. 

在构建多平台的应用时，首要考虑的是如何针对不同大小的设备进行尺寸适配。

### Layout widgets

### 布局 widgets

If you've been building apps or websites,
you're probably familiar with creating responsive interfaces.
Luckily for Flutter developers,
there are a large set of widgets to make this easier. 

如果你已经开发过应用或网站，也许你已经相对熟悉构建自适应的界面。
对于 Flutter 开发者而言，有非常多的 widgets 让构建更为简单。

Some of Flutter's most useful layout widgets include:

Flutter 中最有用的部分布局 widgets 包括：

**Single child**

**单子级**

* [`Align`][]&mdash;Aligns a child within itself.
  It takes a double value between -1 and 1,
  for both the vertical and horizontal alignment.

  [`Align`][]&mdash;&mdash;让子级在其内部进行对齐。
  可使用 -1 至 1 的双精度值在垂直和水平方向上进行对齐。

* [`AspectRatio`][]&mdash;Attempts to size the
  child to a specific aspect ratio.

  [`AspectRatio`][]&mdash;&mdash;尝试让子级以指定的比例进行布局。

* [`ConstrainedBox`][]&mdash;Imposes size constraints on its child,
  offering control over the minimum or maximum size.

  [`ConstrainedBox`][]&mdash;&mdash;对子级施加尺寸限制，可以控制最小和最大的尺寸。

* [`CustomSingleChildLayout`][]&mdash;Uses a delegate function
  to position a single child. The delegate can determine
  the layout constraints and positioning for the child.

  [`CustomSingleChildLayout`][]&mdash;&mdash;使用代理方法对单个子级进行定位。
  代理方法可以为子级确定布局限制和定位。

* [`Expanded`] and [`Flexible`][]&mdash;Allows a child of a
  `Row` or `Column` to shrink or grow to fill any available space.

  [`Expanded`] 和 [`Flexible`][]&mdash;&mdash;允许
  `Row` 或 `Column` 的子级填充剩余空间或者尽可能地小。

* [`FractionallySizedBox`][]&mdash;Sizes its child to a fraction
  of the available space.

  [`FractionallySizedBox`][]&mdash;&mdash;基于剩余空间的比例限定子级的大小。

* [`LayoutBuilder`][]&mdash;Builds a widget that can reflow
  itself based on its parents size.

  [`LayoutBuilder`][]&mdash;&mdash;让子级可以基于父级的尺寸重新调整其布局。

* [`SingleChildScrollView`][]&mdash;Adds scrolling to a single child.
  Often used with a `Row` or `Column`.

  [`SingleChildScrollView`][]&mdash;&mdash;为单一的子级添加滚动。
  通常配合 `Row` 或 `Column` 进行使用。

**Multichild**

**多子级**

* [`Column`][], [`Row`][], and [`Flex`][]&mdash;Lays out children
  in a single horizontal or vertical run.
  Both `Column` and `Row` extend the `Flex` widget.

  [`Column`][]、[`Row`][] 和 [`Flex`][]&mdash;&mdash;
  在同一水平线或垂直线上放置所有子级。
  `Column` 和 `Row` 都继承了 `Flex` widget。

* [`CustomMultiChildLayout`][]&mdash;Uses a delegate function to
  position multiple children during the layout phase.

  [`CustomMultiChildLayout`][]&mdash;&mdash;
  在布局过程中使用代理方法对多个子级进行定位。

* [`Flow`][]&mdash;Similar to `CustomMultiChildLayout`,
  but more efficient because it’s performed during the
  paint phase rather than the layout phase.

  [`Flow`][]&mdash;&mdash;与 `CustomMultiChildLayout` 类似但更高效。
  在绘制过程中使用代理方法对多个子级进行定位。

* [`ListView`][], [`GridView`][], and
  [`CustomScrollView`][]&mdash;Provides scrollable
  lists of children.

  [`ListView`][]、[`GridView`][] 和 [`CustomScrollView`][]&mdash;&mdash;
  为所有子级增加滚动支持。

* [`Stack`][]&mdash;Layers and positions multiple children
  relative to the edges of the `Stack`.
  Functions similarly to position-fixed in CSS.

  [`Stack`][]&mdash;&mdash;基于 `Stack` 的边界对多个子级进行放置和定位。
  与 CSS 中的 `position: fixed` 功能类似。

* [`Table`][]&mdash;Uses a classic table layout algorithm for
  its children, combining multiple rows and columns.

  [`Table`][]&mdash;&mdash;基于基础的表格布局算法，将子级组合为多列和多行。

* [`Wrap`][]&mdash;Displays its children in multiple horizontal
  or vertical runs.

  [`Wrap`][]&mdash;&mdash;将子级顺序显示在多行或多列内。

To see more available widgets and example code, see
[Layout widgets][].

查看 [布局 widgets][Layout widgets] 了解更多的 widgets 和代码示例。

[`Align`]: {{site.api}}/flutter/widgets/Align-class.html
[`AspectRatio`]: {{site.api}}/flutter/widgets/AspectRatio-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`ConstrainedBox`]: {{site.api}}/flutter/widgets/ConstrainedBox-class.html
[`CustomMultiChildLayout`]: {{site.api}}/flutter/widgets/CustomMultiChildLayout-class.html
[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[`CustomSingleChildLayout`]: {{site.api}}/flutter/widgets/CustomSingleChildLayout-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`Flex`]: {{site.api}}/flutter/widgets/Flex-class.html
[`Flexible`]: {{site.api}}/flutter/widgets/Flexible-class.html
[`Flow`]: {{site.api}}/flutter/widgets/Flow-class.html
[`FractionallySizedBox`]: {{site.api}}/flutter/widgets/FractionallySizedBox-class.html
[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[Layout widgets]: /docs/development/ui/widgets/layout
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`Table`]: {{site.api}}/flutter/widgets/Table-class.html
[`Wrap`]: {{site.api}}/flutter/widgets/Wrap-class.html

### Visual density

### 视觉密度

Different input devices offer various levels of precision,
which necessitate differently sized hit areas.
Flutter's `VisualDensity` class makes it easy to adjust the
density of your views across the entire application,
for example, by making a button larger
(and thereore easier to tap) on a touch device.

不同的设备会提供不同级别的显示密度，使得操作的命中区域也要随之变化。
Flutter 的 `VisualDensity` 类可以让你快速地调整整个应用的视图密度，
比如在可触控设备上放大按钮（更容易点击）。

When you change the `VisualDensity` for your `MaterialApp`,
`MaterialComponents` that support it animate their densities
to match. By default, both horizontal and vertical densities
are set to 0.0, but you can set the densities to any negative
or positive value that you want. By switching between different
densities, you can easily adjust your UI:

在你改变 `MaterialApp` 的 `VisualDensity` 时，
支持它的 `MaterialComponents` 会以动画过渡改变其自身的密度。
水平和垂直方向的密度默认都为 0.0，你可以将它设置为任意的正负值。
你可以通过调整密度轻松地调整你的 UI：

![Adaptive scaffold]({% asset development/ui/layout/adaptive_scaffold.gif @path %}){:width="100%"}

To set a custom visual density, inject the density into
your `MaterialApp` theme:

若想使用自定义的视觉密度，请在你的 `MaterialApp` 的主题中进行设置：

<!--skip-->
```dart
double densityAmt = enableTouchMode ? 0.0 : -1.0;
VisualDensity density = VisualDensity(horizontal: density, vertical: density);
return MaterialApp(
  theme: ThemeData(visualDensity: density),
  ...
);
```

To use `VisualDensity` inside your own views,
you can look it up: 

若想在你的视图中使用 `VisualDensity`，你可以向上查找：

<!--skip-->
```dart
VisualDensity density = Theme.of(context).visualDensity;
return Padding(
  padding: EdgeInsets.all(Insets.large + density.vertical * 4), 
  child: ...
);
```

Not only does the container react automatically to changes
in density, it also animates when it changes.
This ties together your custom components,
along with the built-in components,
for a smooth transition effect across the app.

容器在密度变化时会使用动画进行过渡变化。
所有的自定义组件都会联系在一起，使整个应用平滑过渡。

As shown, `VisualDensity` is unit-less,
so it can mean different things to different views.
In this example, 1 density unit equals 6 pixels,
but this is totally up to your views to decide.
The fact that it is unit-less makes it quite versatile,
and it should work in most contexts. 

我们可以看到，`VisualDensity` 是没有单位的，所以在不同的视图上可能有不同的含义。
在以上的例子中，1 个单位的密度等同于 6 个逻辑像素。
具体的处理完全由你的视图自行决定。
无单位的设计让它可以处理通用情况，能在大部分的场景下使用。

It’s worth noting that the Material Components generally
use a value of around 4 logical pixels for each
visual density unit. For more information about the
supported components, see [`VisualDensity`][] API.
For more information about density principles in general,
see the [Material Design guide][]. 

值得注意的是，在 Material 的组件中，1 个单位的视觉密度通常等于 4 个逻辑像素。
你可以查看 [`VisualDensity`][] API 文档了解更多支持视觉密度的组件。
若想了解视觉密度的通用原则，请查看 [Material Design 指南][Material Design guide]。

[Material Design guide]: {{site.material}}/design/layout/applying-density.html#usage
[`VisualDensity`]: {{site.api}}/flutter/material/VisualDensity-class.html

### Contextual layout

### 基于上下文的布局

If you need more than density changes and can't find a
widget that does what you need, you can take a more
procedural approach to adjust parameters, calculate sizes,
swap widgets, or completely restructure your UI to suit
a particular form factor. 

如果你需要的不仅是密度的变化，同时没有找到一个与你的使用场景契合的 widget，
那么你可以使用代码进行更细化的控制、计算尺寸、切换 widgets
或是完全重新构建你的 UI 适配对应的外形结构。

#### Screen-based breakpoints

#### 基于屏幕大小的断点

The simplest form of procedural layouts uses
screen-based breakpoints. In Flutter,
this can be done with the `MediaQuery` API.
There are no hard and fast rules for the sizes to use
here, but these are general values: 

最简单的代码控制布局方式是基于屏幕尺寸来定义断点。
在 Flutter 中，你可以使用 `MediaQuery` API 实现这些断点。
具体需要使用的大小并没有作出硬性规定，下方是一些通用的值：

<!--skip-->
```dart
class FormFactor {
 static double desktop = 900;
 static double tablet = 600;
 static double handset = 300;
}
```

Using breakpoints, you can set up a simple system
to determine the device type:

使用断点可以让你通过简单的判断快速确定设备的类型：

<!--skip-->
```dart
ScreenType getFormFactor(BuildContext context) {
 // Use .shortestSide to detect device type regardless of orientation
 double deviceWidth = MediaQuery.of(context).size.shortestSide;
 if (deviceWidth > FormFactor.desktop) return ScreenType.Desktop;
 if (deviceWidth > FormFactor.tablet) return ScreenType.Tablet;
 if (deviceWidth > FormFactor.handset) return ScreenType.Handset;
 return ScreenType.Watch;
}
```

As an alternative, you could abstract it more
and define it in terms of small to large:

又或者，你可以对大小类型进行更深层次的抽象，并且按照从小到大的方式定义：

<!--skip-->
```dart
enum ScreenSize { Small, Normal, Large, ExtraLarge }

ScreenSize getSize(BuildContext context) {
 double deviceWidth = MediaQuery.of(context).size.shortestSide;
 if (deviceWidth > 900) return ScreenSize.ExtraLarge;
 if (deviceWidth > 600) return ScreenSize.Large;
 if (deviceWidth > 300) return ScreenSize.Normal;
 return ScreenSize.Small;
}
```
 
Screen-based breakpoints are best used for making
top-level decisions in your app. Changing things like
visual density, paddings, or font-sizes are best when
defined on a global basis. 

使用基于屏幕大小的断点的最佳场景，是在应用的顶层进行尺寸决策。
在改变视觉密度、边距或者字体大小时，定义全局的基数是最好的方式。

You can also use screen-based breakpoints to reflow your
top-level widget trees. For example, you could switch
from a vertical to a horizontal layout when the user isn’t on a handset:

你也可以利用断点重新组织顶层的 widget 结构。
例如，你可以判断用户是否使用手持设备，来切换垂直或水平的布局：

<!--skip-->
```dart
bool useVerticalLayout = MediaQuery.of(context).size.width < 600;
return Flex(
  children: [...],
  direction: isHandset ?
    Axis.vertical :
    Axis.horizontal
);
```

In another widget,
you might swap some of the children completely: 

在其他的 widget 中，你也可以切换部分子级 widget：

<!--skip-->
```dart
Widget foo = Row(children: [
  BackButton(),
  ...isHandset ?
    _getHandsetChildren() :
    _getNormalChildren(),
],);
```

#### Use LayoutBuilder for extra flexibility

#### 使用 LayoutBuilder 提升布局灵活性

Even though checking total screen size is great for
full-screen pages or making global layout decisions,
it’s often not ideal for nested subviews.
Often, subviews have their own internal breakpoints
and care only about the space that they have available to render.

尽管对于全局的布局决策而言，判断屏幕大小非常有效，
但对于内嵌的子视图而言，并不一定是合理的方案。
子视图通常有自己的断点，并且会关心它们可用的渲染空间。

The simplest way to handle this in Flutter is using the
[`LayoutBuilder`][] class. `LayoutBuilder` allows a
widget to respond to incoming local size constraints,
which can make the widget more versatile than if it
depended on a global value.

在 Flutter 内处理这类场景最简单的做法是使用 [`LayoutBuilder`][]。
`LayoutBuilder` 让 widget 可以根据其父级的限制进行调整，
相比依赖全局的尺寸限制而言更为通用。

The previous example could be rewritten using `LayoutBuilder`:

之前的示例可以使用 `LayoutBuilder` 重写：

<!--skip-->
```dart
Widget foo = LayoutBuilder(builder: (_, constraints, __){
 bool useVerticalLayout = constraints.maxWidth < 400.0;
 return Flex(
     children: [...],
     direction: useVerticalLayout ?
     Axis.vertical : Axis.horizontal
 );
});
```

This widget can now be composed within a side panel,
dialog, or even a full-screen view,
and adapt its layout to whatever space is provided.

现在这个 widget 可以组装在侧边面板、弹框又或是全屏视图中，
并且根据尺寸自适应布局。

#### Device segmentation

#### 细化设备

There are times when you want to make layout decisions
based on the actual platform you’re running on,
regardless of size. For example, when building a
custom title bar, you might need to check the operating
system type and tweak the layout of your title bar so
it doesn’t get covered by the native window buttons. 

有时你可能需要根据实际运行的平台进行布局处理，而不是基于大小。
例如，在构建自定义的标题栏时，
你可能需要判断设备的平台来处理布局，以防被原生窗口的按钮遮挡。

To determine which combination of platforms you’re on,
you can use the [`Platform`][] API along with the `kIsWeb` value:

想判断应用当前所处的平台，你可以使用 [`Platform`][] API 和 `kIsWeb` 组合进行判断：

[`Platform`]: {{site.api}}/flutter/package-platform_platform/Platform-class.html

<!--skip-->
```dart
bool get isMobileDevice => !kIsWeb && (Platform.isIOS || Platform.isAndroid);
bool get isDesktopDevice =>
    !kIsWeb && (Platform.isMacOS || Platform.isWindows || Platform.isLinux);
bool get isMobileDeviceOrWeb => kIsWeb || isMobileDevice;
bool get isDesktopDeviceOrWeb => kIsWeb || isDesktopDevice;
```

The `Platform` API can’t be accessed from web builds without 
throwing an exception, because the `dart.io` package is not
supported on the web target. As a result, this code checks 
for web first, and becuase of short-circuiting, Dart will 
never call `Platform` on web targets.

在构建 Web 平台应用时，由于 `dart.io` package 不支持 Web 平台，
导致使用 `Platform` API 时会异常。
所以在上面的代码中，首先对 Web 平台进行了判断，
而由于判断时条件进行了阻断，在 Web 平台上永远不会调用 `Platform` API。

### Single source of truth for styling

### 使用单一来源控制样式

You’ll probably find it easier to maintain your views
if you create a single source of truth for styling values
like padding, spacing, corner shape, font sizes, and so on.
This can be done easily with some helper classes:

使用单一的来源对样式进行维护，可以让你更简便地控制边距、间距、圆角、字体等样式值。
你可以利用一些帮助类进行实现：

<!--skip-->
```dart
class Insets {
 static const double xsmall = 4;
 static const double small = 8;
 // etc
}


class Fonts {
 static const String raleway = 'Raleway';
 // etc
}

class TextStyles {
 static const TextStyle raleway = const TextStyle(fontFamily: Fonts.raleway, ... );
 static late TextStyle body1 = raleway.copyWith( ... );
 // etc
}
```

These constants can then be used in place of hard-coded numeric values:

这些常量可以用来替代硬编码的值：

<!--skip-->
```dart
return Padding(
    insets: EdgeInsets.all(Insets.small), 
    child: Text('Hello!', style: TextStyles.body1)
)
```

With all views referencing the same shared-design system rules,
they tend to look better and more consistent.
Making a change or adjusting a value for a specific platform
can be done in a single place, instead of using an error-prone
search and replace. Using shared rules has the added benefit
of helping enforce consistency on the design side.

由于所有的视图都引用了相同设计系统的规则，它们通常看起来更一致且更顺畅。
与其进行容易出错的搜索替换，你可以将平台对应样式值的修改集中在一处。
使用共享的规则也对设计部分的一致性有所帮助。

Some common design system categories that can be represented
this way are: 

常见的设计类型里，有一些分类可以以这样的方式进行组织：

* Animation timings 

  动画时间

* Sizes and breakpoints

  尺寸大小和断点

* Insets and paddings

  遮盖和内边距区域

* Corner radius

  圆角

* Shadows

  阴影

* Strokes 

  笔画

* Font families, sizes, and styles

  字体系列、大小和样式

Like most rules, there are exceptions:
one-off values that are used nowhere else in the app.
There is little point in cluttering up the styling rules
with these values, but it’s worth considering if they
should be derived from an existing value (for example,
`padding + 1.0`). You should also watch for reuse or duplication
of the same semantic values. Those values should likely be
added to the global styling ruleset.

当然，上述的例子也有一些例外：在应用中只使用了一次的值。
将这些值放在样式规则里属实无用之举，
但可以考虑它们是否能从现有的值延伸（例如 `padding + 1.0`）。
你也可以留意一些有着相同意义复用的值，这些值也许可以添加到全局的样式规则里。

### Design to the strengths of each form factor

Beyond screen size, you should also spend time
considering the unique strengths and weaknesses
of different form factors. It isn’t always ideal
for your multiplatform app to offer identical
functionality everywhere. Consider whether it makes
sense to focus on specific capabilities,
or even remove certain features, on some device categories.

除了屏幕尺寸以外，你也应当花时间，针对各种不同外形屏幕的优劣点进行设计。
支持多平台的应用，并不能在所有的设备上都提供理想的体验。
实际开发时，可以考虑某些特定的功能是否合理，也可以考虑在某些平台上移除特定的功能。

For example, mobile devices are portable and have cameras,
but they aren't well suited for detailed creative work.
With this in mind, you might focus more on capturing content
and tagging it with location data for a mobile UI,
but focus on organizing or manipulating that content
for a tablet or desktop UI.

举个例子，移动设备是十分便携的，一般还配有摄像头，但它们并不适合深度的内容创作工作。
基于这个前提，你的应用可以更侧重于内容捕获，并使用位置信息对其进行标记，配上移动端的界面，
而另一方面，在平板和桌面界面上专注于组织和操作产出的内容。

Another example is leveraging the web's extremely low barrier
for sharing. If you’re deploying a web app,
decide which deep links to support,
and design your navigation routes with those in mind.

另一个例子是利用 Web 平台的。如果你正在部署 Web 应用，可以考虑 deep link 将支持哪些页面，
并根据配置来设计应用的导航。

The key takeaway here is to think about what each
platform does best and see if there are unique capabilities
you can leverage.

此处的关键点在于，如何发挥每个平台的长处，寻找平台可以利用的特有功能。

### Use desktop build targets for rapid testing

### 使用桌面目标构建进行快速测试

One of the most effective ways to test adaptive
interfaces is to take advantage of the desktop build targets. 

测试自适应界面的最快方式，是利用桌面端快速进行构建。

When running on a desktop, you can easily resize the window
while the app is running to preview various screen sizes.
This, combined with hot reload, can greatly accelerate the
development of a responsive UI.

在桌面上运行应用时，你可以在应用运行时轻易地改变窗口的大小，预览多种尺寸的布局。
配上热重载，能极大程度地加快响应式开发的速度。

![Adaptive scaffold 2]({% asset development/ui/layout/adaptive_scaffold2.gif @path %}){:width="100%"}

### Solve touch first

### 优先处理触摸操作

Building a great touch UI can often be more difficult
than a traditional desktop UI due, in part,
to the lack of input accelerators like right-click,
scroll wheel, or keyboard shortcuts. 

在移动端构建优良的触摸交互式 UI 通常比传统的桌面端更为困难，
因为它缺少类似右键单击、滚轮或键盘快捷键这样的快速输入设备。

One way to approach this challenge is to focus initially
on a great touch-oriented UI. You can still do most of
your testing using the desktop target for its iteration speed.
But, remember to switch frequently to a mobile device to
verify that everything feels right. 

应对这样的挑战的方法之一，是在一开始专注于更好的面向触摸的 UI。
你依旧可以使用桌面端来提高你的开发效率，但要记得时不时切换回移动端，
验证开发的内容是否正常。

After you have the touch interface polished, you can tweak
the visual density for mouse users, and then layer on all
of the additional inputs. Approach these other inputs as
accelerator—alternatives that make a task faster.
The important thing to consider is what a user expects
when using a particular input device,
and work to reflect that in your app.

完善了触摸界面后，你可以调整鼠标用户的视觉密度，然后对所有的输入设备进行分层。
这些输入设备应当作为加快你的应用使用速度的途径。
在这里需要考虑的应当是用户对于应用体验的期望，并在应用中合理地实现这些期望。

## Input

## 输入

Of course, it isn’t enough to just adapt how your app looks,
you also have to support varying user inputs.
The mouse and keyboard introduce input types beyond those
found on a touch device—like scroll wheel, right-click,
hover interactions, tab traversal, and keyboard shortcuts.

当然，应用只适配了界面是远远不够的，你还需要适配各种用户的输入操作。
鼠标和键盘提供了触摸设备不具备的输入方式，
例如滚轮、右键点击、悬停交互、Tab 遍历切换和键盘快捷键。

### Scroll wheel

### 滚轮

Scrolling widgets like `ScrollView` or `ListView`
support the scroll wheel by default, and because
almost every scrollable custom widget is built
using one of these, it works with them as well.

像 `ScrollView` 和 `ListView` 这样的滚动 widget 默认支持滚轮行为，
而大部分可滚动的自定义 widget 都是基于它们构建的，所以也同样支持。

If you need to implement custom scroll behavior,
you can use the [`Listener`][] widget, which lets you
customize how your UI reacts to the scroll wheel.

如果你需要实现自定义的滑动行为，可以使用 [`Listener`][] widget，
通过它你可以完全自定义 UI 如何响应滚轮行为。

<!--skip-->
```dart
return Listener(
 onPointerSignal: (event) {
   if (event is PointerScrollEvent) print(event.scrollDelta.dy);
 },
 child: ...
);
```

[`Listener`]: {{site.api}}/flutter/widgets/Listener-class.html

### Tab traversal and focus interactions

### Tab 遍历切换和焦点交互

Users with physical keyboards expect that they can use
the tab key to quickly navigate your application,
and users with motor or vision differences often rely
completely on keyboard navigation.

使用键盘的用户，可能会希望通过 Tab 键在应用中快速导航，
特别是有动效和视觉障碍的用户，基本依赖于键盘导航。

There are two considerations for tab interactions:
how focus moves from widget to widget, known as traversal,
and the visual highlight shown when a widget is focused.

在考虑 Tab 遍历切换时，有两点需要注意：
焦点如何在 widget 之间遍历，以及 widget 聚焦时的突出显示。

Most built-in components, like buttons and text fields,
support traversal and highlights by default.
If you have your own widget that you want included in
traversal, you can use the [`FocusableActionDetector`][] widget
to create your own controls. It combines the functionality
of [`Actions`][], [`Shortcuts`][], [`MouseRegion`][], and
[`Focus`][] widgets to create a detector that defines actions
and key bindings, and provides callbacks for handling focus
and hover highlights.

大部分内置的组件，类似于按钮和输入框，都默认支持遍历和高亮。
如果你想让自己的 widget 包含在遍历中，你可以利用 [`FocusableActionDetector`][] 进行控制。
它将 [`Actions`][]、[`Shortcuts`][]、[`MouseRegion`][] 和 [`Focus`][]
的能力进行了整合，创建出一个可以定义行为和键位绑定，并且提供聚焦和悬浮高亮事件回调的 widget。

<!--skip-->
```dart
class _BasicActionDetectorState extends State<BasicActionDetector> {
 bool _hasFocus = false;
 @override
 Widget build(BuildContext context) {
   return FocusableActionDetector(
     onFocusChange: (value) => setState(() => _hasFocus = value),
     actions: <Type, Action<Intent>>{
       ActivateIntent: CallbackAction<Intent>(onInvoke: (Intent intent) {
         print("Enter or Space was pressed!");
       }),
     },
     child: Stack(
       clipBehavior: Clip.none,
       children: [
         FlutterLogo(size: 100),
         // Position focus in the negative margin
         if (_hasFocus) Positioned(left: -4, top: -4, bottom: -4, right: -4, child: _RoundedBorder())
       ],
     ),
   );
 }
}
```

[`Actions`]: {{site.api}}/flutter/widgets/Actions-class.html
[`Focus`]: {{site.api}}/flutter/widgets/Focus-class.html
[`FocusableActionDetector`]: {{site.api}}/flutter/widgets/FocusableActionDetector-class.html
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`Shortcuts`]: {{site.api}}/flutter/widgets/Shortcuts-class.html

#### Controlling traversal order

#### 控制遍历的顺序

To get more control over the order that
widgets are focused on when the user presses tab,
you can use [`FocusTraversalGroup`][] to define sections
of the tree that should be treated as a group when tabbing. 

想要控制用户按下 Tab 键时的 widget 切换顺序，
你可以使用 [`FocusTraversalGroup`][] 来指定树中的区域，作为切换时的组别。

For example, you might to tab through all the fields in
a form before tabbing to the submit button:

例如，你可能想在切换到上传按钮前，先切换到所有的输入框：

<!--skip-->
```dart
return Column(children: [
    FocusTraversalGroup(
      child: MyFormWithMultipleColumnsAndRows();
    ),
    SubmitButton(),
])
```

Flutter has several built-in ways to traverse widgets and groups,
defaulting to the `ReadingOrderTraversalPolicy` class.
This class usually works well, but it’s possible to modify this
using another predefined `TraversalPolicy` class or by creating
a custom policy.

Flutter 有几种内置的方法对 widget 和组别进行遍历，默认使用的是
`ReadingOrderTraversalPolicy` 类。
这个类通常可以正常使用，你也可以创建另一个 `TraversalPolicy` 或创建一个自定义的规则，
对它进行定义。

[`FocusTraversalGroup`]: {{site.api}}/flutter/widgets/FocusTraversalGroup-class.html

### Keyboard accelerators

In addition to tab traversal, desktop and web users are accustomed
to having various keyboard shortcuts bound to actions.
Whether it’s the `Delete` key for quick deletions or
`Control+N` for a new document, be sure to consider the different
accelerators your users expect. The keyboard is a powerful
input tool, so try to squeeze as much efficiency from it as you can.
Your users will appreciate it!

Keyboard accelerators can be accomplished in a few ways in Flutter
depending on your goals.

If you have a single widget like a `TextField` or a `Button` that
already has a focus node, you can wrap it in a
[`RawKeyboardListener`][] and listen for keyboard events:

<!--skip-->
```dart
return Focus(
 onKey: (FocusNode node, RawKeyEvent event) {
   if (event is RawKeyDownEvent) {
     print(event.logicalKey);
   }
   return KeyEventResult.ignored;
 },
 child: const TextField(),
);
```

If you’d like to apply a set of keyboard shortcuts to a
large section of the tree, you can use the [`Shortcuts`][] widget:

<!--skip-->
```dart
// Define a class for each type of shortcut action you want
class CreateNewItemIntent extends Intent {
 const CreateNewItemIntent();
}

Widget build(BuildContext context) {
 return Shortcuts(
   // Bind intents to key combinations
    shortcuts: <ShortcutActivator, Intent>{
      SingleActivator(LogicalKeyboardKey.keyN, control: true): CreateNewItemIntent(),
   },
   child: Actions(
     // Bind intents to an actual method in your code
     actions: <Type, Action<Intent>>{
       CreateNewItemIntent: CallbackAction<CreateNewItemIntent>(
           onInvoke: (CreateNewItemIntent intent) => _createNewItem()),
     },
     // Your sub-tree must be wrapped in a focusNode, so it can take focus. 
     child: Focus(
       autofocus: true,
       child:  ...,
     ),
   ),
 );
}
```

The [`Shortcuts`][] widget is useful because it only
allows shortcuts to be fired when this widget tree
or one of its children has focus and is visible.

The final option is a global listener. This listener
can be used for always-on, app-wide shortcuts or for
panels that can accept shortcuts whenever they're visible
(regardless of their focus state). Adding global listeners
is easy with [`RawKeyboard`][]:

<!--skip-->
```dart
void initState() {
  super.initState();
  RawKeyboard.instance.addListener(_handleKey);
}

@override
void dispose() {
  RawKeyboard.instance.removeListener(_handleKey);
  super.dispose();
}
```

To check key combinations with the global listener,
you can use the `RawKeyboard.instance.keysPressed` map.
For example, a method like the following can check whether any
of the provided keys are being held down:

<!--skip-->
```dart
static bool isKeyDown(Set<LogicalKeyboardKey> keys) {
 return keys.intersection(RawKeyboard.instance.keysPressed).isNotEmpty;
}
```

Putting these two things together,
you can fire an action when `Shift+N` is pressed:

<!--skip-->
```dart
void _handleKey(event){
  if(event is RawKeyDownEvent){
     bool isShiftDown = isKeyDown({
        LogicalKeyboardKey.shiftLeft, 
        LogicalKeyboardKey.shiftRight,
     });
     if(isShiftDown && event.logicalKey == LogicalKeyboardKey.keyN){
        _createNewItem();
      }
  }
}
```

One note of caution when using the static listener,
is that you often need to disable it when the user
is typing in a field or when the widget it’s associated with
is hidden from view.
Unlike with `Shortcuts` or `RawKeyboardListener`,
this is your responsibility to manage. This can be especially
important when you’re binding a Delete/Backspace accelerator for
`Delete`, but then have child `TextFields` that the user
might be typing in.


[`RawKeyboard`]: {{site.api}}/flutter/services/RawKeyboard-class.html
[`RawKeyboardListener`]: {{site.api}}/flutter/widgets/RawKeyboardListener-class.html

### Mouse enter, exit, and hover

On desktop, it’s common to change the mouse cursor
to indicate the functionality about the content the
mouse is hovering over. For example, you usually see
a hand cursor when you hover over a button,
or an `I` cursor when you hover over text.

The Material Component set has built-in support
for your standard button and text cursors.
To change the cursor from within your own widgets,
use [`MouseRegion`][]:

<!--skip-->
```dart
return MouseRegion(
 cursor: SystemMouseCursors.grab,
 child: MyDraggableWidget(),
)
```

`MouseRegion` is also useful for creating custom
rollover and hover effects:

<!--skip-->
```dart
return MouseRegion(
 onEnter: (_) => setState(() => _isMouseOver = true),
 onExit: (_) => setState(() => _isMouseOver = false),
 onHover: (PointerHoverEvent e) => print(e.localPosition),
 child: ... 
```


[`MouseRegions`]: {{site.api}}/flutter/widgets/MouseRegion-class.html


## Idioms and norms

The final area to consider for adaptive apps is platform standards.
Each platform has its own idioms and norms;
these nominal or de facto standards inform user expectations
of how an application should behave. Thanks, in part to the web,
users are accustomed to more customized experiences,
but reflecting these platform standards can still provide
significant benefits:

* **Reduce cognitive load**&mdash;By matching the user's
  existing mental model, accomplishing tasks becomes intuitive,
  which requires less thinking,
  boosts productivity, and reduces frustrations.

* **Build trust**&mdash;Users can become wary or suspicious
  when applications don't adhere to their expectations.
  Conversely, a UI that feels familiar can build user trust
  and can help improve the perception of quality.
  This often has the added benefit of better app store
  ratings&mdash;something we can all appreciate! 

### Consider expected behavior on each platform

The first step is to spend some time considering what
the expected appearance, presentation, or behavior is on this platform.
Try to forget any limitations of your current implementation,
and just envision the ideal user experience.
Work backwards from there.

Another way to think about this is to ask,
"How would a user of this platform expect to achieve this goal?"
Then, try to envision how that would work in your app
without any compromises.

This can be difficult if you aren’t a regular user of the platform.
You might be unaware of the specific idioms and can easily miss
them completely. For example, a lifetime Android user will
likely be unaware of platform conventions on iOS,
and the same holds true for macOS, Linux, and Windows.
These differences might be subtle to you,
but be painfully obvious to an experienced user. 

#### Find a platform advocate

If possible, assign someone as an advocate for each platform.
Ideally, your advocate uses the platform as their primary device,
and can offer the perspective of a highly opinionated user.
To reduce the number of people, combine roles.
Have one advocate for Windows and Android,
one for Linux and the web, and one for Mac and iOS.

The goal is to have constant, informed feedback so the app
feels great on each platform. Advocates should be encouraged
to be quite picky, calling out anything they feel differs from
typical applications on their device. A simple example is how
the default button in a dialog is typically on the left on Mac
and Linux, but is on the right on Windows.
Details like that are easy to miss if you aren't using a platform
on a regular basis.

{{site.alert.secondary}}
  **Important**: Advocates don’t need to be developers or
  even full-time team members. They can be designers,
  stakeholders, or external testers that are provided
  with regular builds. 
{{site.alert.end}}

#### Stay unique

Conforming to expected behaviors doesn't mean that your app
needs to use default components or styling.
Many of the most popular multiplatform apps have very distinct
and opinionated UIs including custom buttons, context menus,
and title bars.

The more you can consolidate styling and behavior across platforms,
the easier development and testing will be. 
The trick is to balance creating a unique experience with a
strong identity, while respecting the norms of each platform.

### Common idioms and norms to consider

Take a quick look at a few specific norms and idioms
you might want to consider, and how you could approach
them in Flutter.

#### Scrollbar appearance and behavior

Desktop and mobile users expect scrollbars,
but they expect them to behave differently on different platforms.
Mobile users expect smaller scrollbars that only appear
while scrolling, whereas desktop users generally expect
omnipresent, larger scrollbars that they can click or drag. 

Flutter comes with a built-in `Scrollbar` widget that already
has support for adaptive colors and sizes according to the
current platform. The one tweak you might want to make is to
toggle `alwaysShown` when on a desktop platform:

<!--skip-->
```dart
return Scrollbar(
  controller: controller,
  isAlwaysShown: DeviceType.isDesktop,
  child: ListView(controller: controller, ...),
);
```

This subtle attention to detail can make your app feel more
comfortable on a given platform.

#### Multi-select

Dealing with multi-select within a list is another area
with subtle differences across platforms: 

<!--skip-->
```dart
static bool get isSpanSelectModifierDown
  => isKeyDown([LogicalKeyboardKey.shiftLeft, LogicalKeyboardKey.shiftRight]);
```

To perform a platform-aware check for control or command,
you can write something like this: 

<!--skip-->
```dart
static bool get isMultiSelectModifierDown {
  bool isDown = false;
  if (DeviceOS.isMacOS) {
    isDown = isKeyDown([LogicalKeyboardKey.metaLeft, LogicalKeyboardKey.metaRight]);
  } else {
    isDown = isKeyDown([LogicalKeyboardKey.controlLeft, LogicalKeyboardKey.controlRight]);
  }
  return isDown;
}
```

A final consideration for keyboard users is the **Select All** action.
If you have a large list of items of selectable items,
many of your keyboard users will expect that they can use
`Control+A` to select all the items. 

##### Touch devices

On touch devices, multi-selection is typically simplified,
with the expected behavior being similar to having the
`isMultiSelectModifier` down on the desktop.
You can select or deselect items using a single tap,
and will usually have a button to **Select All** or
**Clear** the current selection. 

How you handle multi-selection on different devices depends
on your specific use cases, but the important thing is to
make sure that you're offering each platform the best
interaction model possible.

#### Selectable text

A common expectation on the web (and to a lesser extent desktop)
is that most visible text can be selected with the mouse cursor.
When text is not selectable,
users on the web tend to have an adverse reaction.

Luckily, this is easy to support with the [`SelectableText`][] widget: 

<!--skip-->
```dart
return SelectableText('Select me!');
```

To support rich text, then use `TextSpan`: 

<!--skip-->
```dart
return SelectableText.rich(TextSpan(children: [
 TextSpan(text: 'Hello'),
 TextSpan(text: 'Bold', style: TextStyle(fontWeight: FontWeight.bold)),
]));
```

[`SelectableText`]: {{site.api}}/flutter/material/SelectableText-class.html

#### Title bars

On modern desktop applications, it’s common to customize
the title bar of your app window, adding a logo for
stronger branding or contextual controls to help save
vertical space in your main UI. 
 
![Samples of title bars]({% asset development/ui/layout/titlebar.png @path %})

This isn't supported directly in Flutter, but you can use the
[`bits_dojo`][] package to disable the native title bars,
and replace them with your own.

This package lets you add whatever widgets you want to the
`TitleBar` because it uses pure Flutter widgets under the hood.
This makes it easy to adapt the title bar as you navigate
to different sections of the app.

[`bits_dojo`]: {{site.github}}/bitsdojo/bitsdojo_window

#### Context menus and tooltips

On desktop, there are several interactions that
manifest as a widget shown in an overlay,
but with differences in how they’re triggered, dismissed,
and positioned:

* **Context menu**&mdash;Typically triggered by a right-click,
  a context menu is positioned close to the mouse,
  and is dismissed by clicking anywhere,
  selecting an option from the menu, or clicking outside it.


* **Tooltip**&mdash;Typically triggered by hovering for
  200-400ms over an interactive element,
  a tooltip is usually anchored to a widget
  (as opposed to the mouse position) and is dismissed
  when the mouse cursor leaves that widget.


* **Popup panel (also known as flyout)**&mdash;Similar to a tooltip,
  a popup panel is usually anchored to a widget.
  The main difference is that panels are most often
  shown on a tap event, and they usually don’t hide
  themselves when the cursor leaves.
  Instead, panels are typically dismissed by clicking
  outside the panel or by pressing a **Close** or **Submit** button.
 
To show basic tooltips in Flutter,
use the built-in [`Tooltip`][] widget:

<!--skip-->
```dart
return const Tooltip(
    message: 'I am a Tooltip',
    child: Text('Hover over the text to show a tooltip.'),
);
```

Flutter also provides built-in context menus when editing
or selecting text. 

To show more advanced tooltips, popup panels,
or create custom context menus,
you either use one of the available packages,
or build it yourself using a `Stack` or `Overlay`.

Some available packages include: 

* [`context_menus`][]
* [`anchored_popups`][]
* [`flutter_portal`][]
* [`super_tooltip`][]
* [`custom_pop_up_menu`][]

While these controls can be valuable for touch users as accelerators,
they are essential for mouse users. These users expect
to right-click things, edit content in place,
and hover for more information. Failing to meet those expectations
can lead to disappointed users, or at least,
a feeling that something isn’t quite right.


[`anchored_popups`]: {{site.pub}}/packages/anchored_popups
[`context_menus`]: {{site.pub}}/packages/context_menus
[`custom_pop_up_menu`]: {{site.pub}}/packages/custom_pop_up_menu
[`flutter_portal`]: {{site.pub}}/packages/flutter_portal
[`super_tooltip`]: {{site.pub}}/packages/super_tooltip
[`Tooltip`]: {{site.api}}/flutter/material/Tooltip-class.html

#### Horizontal button order

On Windows, when presenting a row of buttons,
the confirmation button is placed at the start of
the row (left side). On all other platforms,
it’s the opposite. The confirmation button is
placed at the end of the row (right side). 

This can be easily handled in Flutter using the
`TextDirection` property on `Row`: 

<!--skip-->
```dart
TextDirection btnDirection = DeviceType.isWindows ? TextDirection.rtl : TextDirection.ltr;
return Row(
 children: [
   Spacer(),
   Row(
     textDirection: btnDirection,
     children: [
       DialogButton(label: 'Cancel', onPressed: () => Navigator.pop(context, false)),
       DialogButton(label: 'Ok', onPressed: () => Navigator.pop(context, true)),
     ],
   ),
 ],
);
```

![Sample of embedded image]({% asset development/ui/layout/embed_image1.png @path %})

![Sample of embedded image]({% asset development/ui/layout/embed_image2.png @path %})

#### Menu bar

Another common pattern on desktop apps is the menu bar.
On Windows and Linux, this menu lives as part of the Chrome title bar,
whereas on macOS, it’s located along the top of the primary screen. 

Currently, you can specify custom menu bar entries using
a prototype plugin, but it’s expected that this functionality will
eventually be integrated into the main SDK.

It’s worth mentioning that on Windows and Linux,
you can’t combine a custom title bar with a menu bar.
When you create a custom title bar,
you’re replacing the native one completely,
which means you also lose the integrated native menu bar.

If you need both a custom title bar and a menu bar,
you can achieve that by implementing it in Flutter,
similar to a custom context menu.

#### Drag and drop

One of the core interactions for both touch-based and
pointer-based inputs is drag and drop. Although this
interaction is expected for both types of input,
there are important differences to think about when
it comes to scrolling lists of draggable items.

Generally speaking, touch users expect to see drag handles
to differentiate draggable areas from scrollable ones,
or alternatively, to initiate a drag by using a long
press gesture. This is because scrolling and dragging
are both sharing a single finger for input.

Mouse users have more input options. They can use a wheel
or scrollbar to scroll, which generally eliminates the need
for dedicated drag handles. If you look at the macOS
Finder or Windows Explorer, you’ll see that they work
this way: you just select an item and start dragging.

In Flutter, you can implement drag and drop in many
different ways. Discussing specific implementations
is outside the scope of this article, but some of
the high level options are: 

* Use the [`Draggable`][] and [`DragTarget`][] APIs
  directly for a custom look and feel.

* Hook into `onPan` gesture events,
  and move an object yourself within a parent `Stack`.

* Use one of the [premade list packages][] on pub.dev.  


[`Draggable`]: {{site.api}}/flutter/widgets/Draggable-class.html
[`DragTarget`]: {{site.api}}/flutter/widgets/DragTarget-class.html
[premade list packages]: {{site.pub}}/packages?q=reorderable+list

### Educate yourself on basic usability principles

Of course, this page doesn’t constitute an exhaustive list
of the things you might consider. The more operating systems,
form factors, and input devices you support,
the more difficult it becomes to spec out every permutation in design. 

Taking time to learn basic usability principles as a
developer empowers you to make better decisions,
reduces back-and-forth iterations with design during production,
and results in improved productivity with better outcomes.

Here are some resources to get you started: 

* [Material guidelines on responsive UI layout][]
* [Material design for large screens][]
* [Build high quality apps (Android)][]
* [UI design do's and don'ts (Apple)][]
* [Human interface guidelines (Apple)][]
* [Responsive design techniques (Microsoft)][]
* [Machine sizes and breakpoints (Microsoft)][]


[Build high quality apps (Android)]: {{site.android-dev}}/quality
[Human interface guidelines (Apple)]: {{site.apple-dev}}/design/human-interface-guidelines/
[Material design for large screens]: {{site.material}}/blog/material-design-for-large-screens
[Machine sizes and breakpoints (Microsoft)]: https://docs.microsoft.com/en-us/windows/uwp/design/layout/screen-sizes-and-breakpoints-for-responsive-design
[Material guidelines on responsive UI layout]: {{site.material}}/archive/guidelines/layout/responsive-ui.html
[Responsive design techniques (Microsoft)]: https://docs.microsoft.com/en-us/windows/uwp/design/layout/responsive-design
[UI design do's and don'ts (Apple)]: {{site.apple-dev}}/design/tips/
