---
title: Technical overview
title: 技术概览
description: A technical overview of Flutter.
description: Flutter 技术概览。
---

## What is Flutter?

## Flutter 是什么？

Flutter is an app SDK for building high-performance,
high-fidelity apps for iOS, Android, web
([beta](https://flutter.dev/web)),
and desktop ([technical preview](https://flutter.dev/desktop))
from a single codebase.

Flutter 是 Google 开源的 UI 工具包，帮助开发者通过一套代码库高效构建多平台精美应用，
支持移动、Web ([测试版][https://flutter.cn/web])、桌面 ([技术预览版](https://flutter.dev/desktop)) 式平台。

The goal is to enable developers to deliver high-performance
apps that feel natural on different platforms.
We embrace differences in scrolling behaviors, typography,
icons, and more.

Flutter 旨在帮助开发者创作媲美原生的高性能应用，并遵从了各个平台不同的滚动行为、排版布局、图标样式等。

<object type="image/svg+xml" data="/images/whatisflutter/hero-shrine.svg" style="width: 100%; height: 100%;"></object>

This is a demo app from the [Flutter Gallery][],
a collection of Flutter sample apps you can run after
installing Flutter and setting up your environment.
Shrine has high-quality scrolling images,
interactive cards, buttons, dropdown lists, and a shopping cart page.
To look at the single codebase for this and more examples,
[visit our GitHub repository][].

这是一个名为 [Gallery 的示例应用][Flutter Gallery]，
Gallery 是一个在安装完 Flutter 并配置好环境后可以立即运行的
Flutter 示例应用集合。Shrine 有高质量的滚动图片、交互式卡片、按钮、
下拉列表以及一个购物车页面。
[访问我们的 GitHub 项目][visit our GitHub repository]
以查看该应用的代码库与更多示例。

No mobile development experience is required to get started.
Apps are written in [Dart][], which looks familiar if you've used a
language like Java or JavaScript.
Experience with object-oriented languages is definitely helpful,
but even non-programmers have made Flutter apps!

开始开发之前无需移动开发经验。应用使用 [Dart][] 开发，
如果你曾使用过 Java 或者 JavaScript 语言，
那么 Dart 看上去会很熟悉。面向对象编程的经验对开发毫无疑问会有帮助，
但即便不是程序员也可以制作 Flutter 应用！

## Why use Flutter?

## 为什么使用 Flutter？

What are some advantages of Flutter? It helps you:

Flutter 的优势是什么？它能够帮你：

*   Be highly productive
    
    高效率
    
    *   Develop for iOS and Android from a single codebase
        
        利用单一代码库开发 iOS 与 Android 应用
        
    *   Do more with less code, even on a single OS, with a modern, expressive
        language and a declarative approach
        
        即便在单一操作系统上，也可以通过使用现代、
        富有表现力的语言以及声明式方法，写更少代码做更多事
        
    *   Prototype and iterate easily
        
        原型与轻松迭代
        
        *  Experiment by changing code and reloading as your app runs
            (with hot reload)
            
           在应用运行时尝试修改代码并重载（通过热重载）
            
        *  Fix crashes and continue debugging from where the app left off
            
           修复崩溃并从应用停止的地方开始继续调试
            
*   Create beautiful, highly-customized user experiences
    
    生成美观、高度定制化的用户体验
    
    *   Benefit from a rich set of Material Design and Cupertino (iOS-flavor)
        widgets built using Flutter's own framework
        
        受益于用 Flutter 框架构建的丰富的 
        Material Design 以及 Cupertino （iOS 风格） widget
        
    *   Realize custom, beautiful, brand-driven designs, without the
        limitations of OEM widget sets
        
        实现定制、美观、品牌驱动的设计，不受 OEM widget 集合的限制

## Core principles

## 核心原则

Flutter includes a modern react-style framework,
a 2D rendering engine, ready-made widgets, and development tools.
These components work together to help you design, build, test,
and debug apps. Everything is organized around a few core principles.

Flutter 包含一个现代响应式框架，一个 2D 渲染引擎，现成的 widget 以及开发工具。
这些组件协同工作以帮助你设计、构建、测试和调试应用。
所有这一切都围绕几个核心原则进行组织。

### Everything's a widget

### 一切皆 Widget

Widgets are the basic building blocks of a Flutter app's
user interface. Each widget is an immutable declaration
of part of the user interface. Unlike other frameworks that
separate views, view controllers, layouts, and other properties,
Flutter has a consistent, unified object model: the widget.

Widget 是 Flutter 应用用户界面的基本构建单元，
每个 widget 都与最终的用户界面的展示紧密相关。
不同于其他框架和平台 —— 
将视图 (views)、视图控制器 (view controllers)、布局 (layouts) 等其他属性分开，
Flutter 拥有统一的对象模型：widget。

A widget can define:

一个 widget 可以定义：

*   a structural element (like a button or menu)
    
    一个结构元素（比如一个按钮或者菜单）
    
*   a stylistic element (like a font or color scheme)
    
    一个风格元素（比如一个字体或者配色方案）
    
*   an aspect of layout (like padding)
    
    布局的一个方面（比如 padding）
    
*   and so on...
    
    等等……

Widgets form a hierarchy based on composition.
Each widget nests inside, and inherits properties from,
its parent.  There is no separate "application" object.
Instead, the root widget serves this role.

Widget 通过组合形成一个层次结构，每个 widget 嵌套其中，从其父节点继承属性。
Flutter 中没有单独的“application”对象，与之相对应的功能由 root widgets 承担。

You can respond to events, like user interaction,
by telling the framework to replace a widget in the
hierarchy with another widget. The framework then
compares the new and old widgets and efficiently updates
the user interface.

你可以通过告诉框架将层次结构中的一个 widget
替换为另一个来响应事件，如用户交互。
框架将会对比新旧 widget 并及时更新用户界面。

#### Composition > inheritance

#### 组合大于继承

Widgets are themselves often composed of many small,
single-purpose widgets that combine to produce powerful effects.
For example, [`Container`][], a commonly-used widget,
is made up of several widgets responsible for layout,
painting, positioning, and sizing.
Specifically, `Container` is made up of [`LimitedBox`][],
[`ConstrainedBox`][], [`Align`][], [`Padding`][],
[`DecoratedBox`][], and [`Transform`][] widgets.
Rather than subclassing `Container` to produce a customized
effect, you can compose these, and other,
simple widgets in novel ways.

Widgets 本身往往是由许多小的、具有单一用途的 widget 组成，
它们组合在一起可以产生强大的效果。
比如，[`Container`][] 是一个常用的 widget，
由负责布局、绘制、定位和尺寸的几个 widget 组成。
具体来说，Container 是由
[`LimitedBox`][]、[`ConstrainedBox`][]、[`Align`][]、[`Padding`][]、
[`DecoratedBox`][] 和 [`Transform`][] widgets 组成的。
你可以将这些与其它小而简单的 widgets 用新颖的方式组合，
而不是子类化 Container 以生成自定义效果。

The class hierarchy is shallow and broad to maximize the
possible number of combinations.

类层次结构是浅而广的，以支持尽可能多的组合。

<object type="image/svg+xml" data="/images/whatisflutter/diagram-widgetclass.svg" style="width: 100%; height: 100%;"></object>

You can also control the *layout* of a widget by composing
it with other widgets.  For example, to center a widget,
you wrap it in a `Center` widget. There are widgets for padding,
alignment, row, columns, and grids. These layout widgets
do not have a visual representation of their own.
Instead, their sole purpose is to control some aspect of
another widget's layout. To understand why a widget renders
in a certain way, it's often helpful to inspect the neighboring widgets.

你也可以通过组合其它 widgets 以达到控制一个 widget 的*布局*。
例如，为了居中一个 widget，你可以把它包裹在一个 Center widget 中。
还有用于设置 间距、对齐、行、列以及网格的 widgets，
这些布局 widgets 本身并没有视觉表现。
反之，他们唯一的目的是在某些方面上控制另一个 widget 的布局。
要了解一个 widget 以某种方式呈现的原因，
查看其邻近 widgets 通常很有帮助。

#### Layer cakes are delicious

#### 层次蛋糕非常美味

The Flutter framework is organized into a series of layers,
with each layer building upon the previous layer.

Flutter 框架由一系列层结构组成，每一层都建立在前一层之上。

{% asset resources/diagram-layercake.png
   alt="Flutter framework layer cake"
   class="mw-100" %}

The upper layers of the framework are used more frequently
than the lower layers. For the complete set of libraries that make up
the Flutter's layered framework, see our [API documentation][].

框架上层会比下层使用的更频繁。
有关组成 Flutter 层次框架的完整库集可以参阅我们的 
[API 文档][API documentation]。

The goal of this design is to help you do more with less code.
For example, the Material layer is built by composing basic
widgets from the widgets layer, and the widgets layer itself
is built by orchestrating lower-level objects from the rendering layer.

这样做的目的是为了帮助你用更少的代码完成更多工作。
例如，通过在 widgets 层组合基础 widgets 来构建 Material 层，
而 widgets 层本身则是通过对来自 Rendering 层的低层次对象组合而来。

The layers offer many options for building apps.
Choose a customized approach to unlock the full expressive
power of the framework, or use building blocks from
the widgets layer, or mix and match.
You can compose the ready-made widgets Flutter provides,
or create your own custom widgets using the same tools and
techniques that the Flutter team used to build the framework.

这些层次为构建应用程序提供了许多选项。
选择一种自定义方法来释放框架的全部表现力，
或使用 widgets 层中的构建块，或混合搭配。
你可以组合 Flutter 提供的现成 widgets 或使用 Flutter 团队
在构建框架时所使用的相同工具和技术来构建你的自定义 widgets。

Nothing is hidden from you.
You reap the productivity benefits of a high-level,
unified widget concept, without sacrificing the ability
to dive as deeply as you wish into the lower layers.

没有任何内容可以逃离你的视线，
因此可以在生产力上从高级别、统一的 widget 概念中获益，
且不会牺牲你想深入更底层时的能力。

### Building widgets

### 构建 widget

You define the unique characteristics of a widget by
implementing a [`build()`][] function that returns
a tree (or hierarchy) of widgets. This tree represents
the widget's part of the user interface in more concrete terms.
For example, a toolbar widget might have a build function that returns
a [horizontal layout][] of some [text][] and [various][] [buttons][].
The framework then recursively asks each of these widgets to build until the
process bottoms out in [fully concrete widgets][],
which the framework then stitches together into a tree.

你可以通过完善 [`build()`][] 函数来定义一个 widget 拥有的特性，
该函数返回一个 widget 树（或者层次结构）。
该树通过更具体的方式来表示用户界面上的 widget 部分。
例如，一个 toolbar widget 可能会有一个返回一些
[水平布局][horizontal layout] [文本][text] 和 [各种][various] [按钮][buttons] 
的构建函数。框架会递归地去构建这些 widget 直到达到最底层
[完全具象的 widgets][fully concrete widgets]，然后将它们拼接成一棵树。

A widget's build function should be free of side effects.
Whenever it is asked to build, the widget should return a
new tree of widgets regardless of what the widget previously
returned. The framework does the heavy lifting of comparing
the previous build with the current build and determining
what modifications need to be made to the user interface.

一个 widget 的构建函数应该没有副作用。
不论何时调用，widget 总应该返回一颗新的 widgets 树，
不论其之前返回了什么。
框架会将先前构建与当前构建仔细进行比较，并确定需要对用户界面做哪些修改。

This automated comparison is quite effective,
enabling high-performance, interactive apps.
And the design of the build function simplifies your code by
focusing on declaring what a widget is made of,
rather than the complexities of updating the user
interface from one state to another.

这种自动比较非常有效，可实现高性能的交互式应用。
构建函数在设计上通过专注声明 widget 的构成，
而不是处理更新用户界面状态的复杂性，来达到简化代码的目的。

### Handling user interaction

### 处理用户交互

If the unique characteristics of a widget need to change
based on user interaction or other factors,
that widget is *stateful*. For example, if a widget has
a counter that increments whenever the user taps a button,
the value of the counter is the state for that widget.
When that value changes,
the widget needs to be rebuilt to update the UI.

如果一个 widget 的特性需要根据用户交互或其他因素改变，
那么这个 widget 是*有状态*的。
例如，如果一个 widget 包含一个随用户点击按钮而递增的计数器，
则计数器的值便是 widget 的状态。
当该值更改时，则需要重新构建 widget 以更新 UI。

These widgets subclass
[`StatefulWidget`][] (rather than [`StatelessWidget`][])
and store their mutable state in a subclass of [`State`][].

这些 widget 继承自 [`StatefulWidget`][]（而不是 [`StatelessWidget`][]）
并将它们可变的状态存储在 [`State`][] 的一个子类中。

<object type="image/svg+xml" data="/images/whatisflutter/diagram-state.svg" style="width: 85%; height: 85%"></object>

Whenever you mutate a `State` object
(for example, by incrementing the counter), you must call
[`setState()`][] to signal the framework to update the user
interface by calling the `State`'s build method again.
For an example of managing state, see the [MyApp template][]
that's created with each new Flutter project.

不论何时你操作一个 State 对象（例如，递增计数器），
你必须调用 [`setState()`][] 方法
来通知框架通过重新调用 State 的构建函数，以此达到更新用户界面的目的。
有关状态管理的示例，可以查看随着任何一个新 Flutter 项目生成的
[MyApp 模版][MyApp template]。

Having separate state and widget objects lets other widgets
treat stateless and stateful widgets in the same way,
without being concerned about losing state.
Rather than needing to hold on to a child to preserve its state,
the parent is free to create a new instance of the child
without losing the child's persistent state.
The framework does all the work of finding and reusing
existing state objects when appropriate.

将状态与 widgets 对象分开可以让其他 widgets 
以相同的方式处理无状态和有状态的 widget，而不用担心丢失状态。
不同于通过维持一个子节点来保留状态，父节点可以自由地创建子节点实例，
而不会丢失子节点的持久状态。
框架会在适当的时候做完查找和重用现有状态对象的所有工作。

## Try it!

## 试试！

Now that you're familiar with the basic structure and
principles of the Flutter framework,
along with how to build apps and make them interactive,
you're ready to start developing and iterating.

既然你已熟悉 Flutter 框架的基本结构和原理，
及如何构建应用并使其具有交互性，那么你已准备好开始开发与迭代了。

Next steps:

接下来的步骤：

1. Try the [layout codelab][].
   (It doesn't require downloading Flutter or Dart!)
   
   试试看 [Flutter 布局基础教程][layout codelab] (无须下载 Flutter 或 Dart)

1. [Install Flutter][].

   安装 [Flutter SDK][Install Flutter]
   
1. Check out the Flutter [cookbook][].

   查看 Flutter [使用教程(cookbook)][cookbook]

1. Check out the Flutter [examples][].

   尝试一些 [Flutter 样例][examples]

1. Try another of the Flutter [codelabs][].

   试试看上手一些 [Flutter codelabs][codelabs]
   
1. Try the [Flutter tutorials][].

   试试看这些 [Flutter 教程][Flutter tutorials]
   
1. Follow a detailed example in the
   [tour of the widget framework][].
   
   看看我们的 [Widgets 介绍文档][tour of the widget framework]

1. Check out Flutter's [technical videos][].
   
   看看这些 [Flutter 技术视频][technical videos]

## Get support

## 获得支持

Track the Flutter project and join the conversation in a variety of ways.
Flutter is open source and encourages dialog, so long as it follows
Flutter's [code of conduct][].

Flutter 是开源的，而且我们鼓励公开对话，但需要阅读我们的[行为准则][code of conduct]。

* Ask how-to questions that can be answered with specific solutions
  on [Stack Overflow][].

  在 [Stack Overflow][] 上提出和解答其他开发者们的问题
  
* Live chat with Flutter engineers and users on [Discord][] (preferred)
  or [gitter][].

  在 [Discord][]（推荐）和 [gitter][] 上与 Flutter 工程师和其他开发者一起在线讨论
  
* Discuss Flutter, best practices, app design,
  and more on the [flutter-dev][] mailing list.

  在 [flutter-dev 的邮件群组][flutter-dev] 里讨论关于 Flutter
  的最佳实践、应用开发等。
  
* Subscribe to the [flutter-announce][] mailing list
  to be notified of changes to the framework.

  关注和订阅 [flutter-announce][] 邮件群组获得关于 Flutter 框架的变更等信息
  
* Report bugs, request features and docs on [GitHub][].

  在 [GitHub][] 上提出 Bug、新功能请求和文档问题建议等

* Follow us on Twitter [@flutterdev][].

  在 Twitter 上关注我们 [@flutterdev][]


[`Align`]: {{site.api}}/flutter/widgets/Align-class.html
[API documentation]: {{site.api}}
[`build()`]: {{site.api}}/flutter/widgets/StatelessWidget/build.html
[buttons]: {{site.api}}/flutter/material/PopupMenuButton-class.html
[code of conduct]: {{site.github}}/flutter/blob/master/CODE_OF_CONDUCT
[codelabs]: /docs/codelabs
[`ConstrainedBox`]: {{site.api}}/flutter/widgets/ConstrainedBox-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[cookbook]: /docs/cookbook
[Dart]: {{site.dart-site}}
[`DecoratedBox`]: {{site.api}}/flutter/widgets/DecoratedBox-class.html
[Discord]: https://discord.gg/N7Yshp4
[tech preview]: /web
[examples]: {{site.github}}/flutter/samples/blob/master/INDEX.md
[@flutterdev]: https://twitter.com/flutterdev
[fully concrete widgets]: {{site.api}}/flutter/widgets/RenderObjectWidget-class.html
[Flutter tutorials]: /docs/reference/tutorials
[Flutter Gallery]: {{site.github}}/flutter/flutter/tree/master/examples/flutter_gallery/lib/demo
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[flutter-dev]: {{site.groups}}/d/forum/flutter-dev
[GitHub]: {{site.github}}/flutter/flutter/issues
[gitter]: https://gitter.im/flutter/flutter
[horizontal layout]: {{site.api}}/flutter/widgets/Row-class.html
[Install Flutter]: /docs/get-started/install
[layout codelab]: /docs/codelabs/layout-basics
[`LimitedBox`]: {{site.api}}/flutter/widgets/LimitedBox-class.html
[`Padding`]: {{site.api}}/flutter/widgets/Padding-class.html
[MyApp template]: {{site.github}}/flutter/flutter/blob/master/packages/flutter_tools/templates/app/lib/main.dart.tmpl
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
[Stack Overflow]: {{site.so}}/tags/flutter
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[technical videos]: /docs/resources/videos
[text]: {{site.api}}/flutter/widgets/Text-class.html
[tour of the widget framework]: /docs/development/ui/widgets-intro
[`Transform`]: {{site.api}}/flutter/widgets/Transform-class.html
[various]: {{site.api}}/flutter/material/IconButton-class.html
[visit our GitHub repository]: {{site.github}}/flutter/flutter/tree/master/examples
