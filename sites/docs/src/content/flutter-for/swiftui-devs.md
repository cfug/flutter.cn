---
# title: Flutter for SwiftUI Developers
title: 给 SwiftUI 开发者的 Flutter 指南
# description: Learn how to apply SwiftUI developer knowledge when building Flutter apps.
description: 学习在构建 Flutter 应用时运用 SwiftUI 开发经验。
ai-translated: true
---

<?code-excerpt path-base="get-started/flutter-for/ios_devs"?>

SwiftUI developers who want to write mobile apps using Flutter
should review this guide.
It explains how to apply existing SwiftUI knowledge to Flutter.

想用 Flutter 编写移动应用的 SwiftUI 开发者应阅读本指南，
说明如何将现有 SwiftUI 知识应用于 Flutter。

:::note
If you instead have experience building apps for iOS with UIKit,
see [Flutter for UIKit developers][].

若你使用 UIKit 为 iOS 构建应用，请参阅 [给 UIKit 开发者的 Flutter 指南][Flutter for UIKit developers]。
:::

Flutter is a framework for building cross-platform applications
that uses the Dart programming language.
To understand some differences between programming with Dart
and programming with Swift, see [Learning Dart as a Swift Developer][]
and [Flutter concurrency for Swift developers][].

Flutter 是一个用于构建跨平台应用的框架。
它使用 Dart 编程语言。
如果要了解 Dart 编程与 Swift 编程之间的某些差异，
请参阅 [Swift 开发者学习 Dart 指南][Learning Dart as a Swift Developer]
和 [给 Swift 开发者的 Flutter 并发指南][Flutter concurrency for Swift developers]。

Your SwiftUI knowledge and experience
are highly valuable when building with Flutter.

在使用 Flutter 进行开发时，
你的 SwiftUI 知识和经验非常宝贵。

{% comment %}
  TODO: Add talk about plugin system for interacting with OS and hardware
  when [iOS and Apple hardware interactions with Flutter][] is released.
{% endcomment %}

Flutter also makes a number of adaptations
to app behavior when running on iOS and macOS.
To learn how, see [Platform adaptations][].

Flutter 还针对在 iOS 和 macOS 上运行的应用行为进行了一系列调整。
如果需要了解具体方法，请参阅 [平台适配][Platform adaptations]。

:::tip
To integrate Flutter code into an **existing** iOS app,
check out [Add Flutter to existing app][].

若要将 Flutter 代码集成到 **现有** iOS 应用，
请参阅 [将 Flutter 添加到现有应用][Add Flutter to existing app]。
:::

This document can be used as a cookbook by jumping around
and finding questions that are most relevant to your needs.
This guide embeds sample code.
By using the "Open in DartPad" button that appears on hover or focus,
you can open and run some of the examples on DartPad.

你可以在当前文档随意浏览并查找最符合你需要的内容。
当前指南嵌入了示例代码。
你可以通过悬停或聚焦时出现的 "Open in DartPad" 按钮，
在 DartPad 上打开并运行部分示例。

## Overview

## 概览

As an introduction, watch the following video.
It outlines how Flutter works on iOS and how to use Flutter to build iOS apps.

你可以观看以下视频来进行了解。
该视频概述了 Flutter 在 iOS 上的工作原理，
以及如何使用 Flutter 构建 iOS 应用。

<YouTubeEmbed id="ceMsPBbcEGg" title="Flutter for iOS developers"></YouTubeEmbed>

Flutter and SwiftUI code describes how the UI looks and works.
Developers call this type of code a _declarative framework_.

Flutter 和 SwiftUI 的代码描述了 UI 的外观和行为。
开发者将此类代码称为 **声明式框架**。

### Views vs. Widgets

### View 与 Widget

**SwiftUI** represents UI components as _views_.
You configure views using _modifiers_.

**SwiftUI** 将 UI 组件表示为 **view**，通过 **modifier** 配置 view。

```swift
Text("Hello, World!") // <-- This is a View
  .padding(10)        // <-- This is a modifier of that View
```

**Flutter** represents UI components as _widgets_.

**Flutter** 将 UI 组件表示为 **widget**。

Both views and widgets only exist until they need to be changed.
These languages call this property _immutability_.
SwiftUI represents a UI component property as a View modifier.
By contrast, Flutter uses widgets for both UI components and
their properties.

view 与 widget 仅在需要变更前存在，称为 **immutability（不可变性）**。
SwiftUI 用 View modifier 表示 UI 组件属性；
Flutter 则用 widget 同时表示 UI 组件及其属性。

```dart
Padding(                         // <-- This is a Widget
  padding: EdgeInsets.all(10.0), // <-- So is this
  child: Text("Hello, World!"),  // <-- This, too
)));
```

To compose layouts, both SwiftUI and Flutter nest UI components
within one another.
SwiftUI nests Views while Flutter nests Widgets.

组合布局时，SwiftUI 与 Flutter 都嵌套 UI 组件：SwiftUI 嵌套 View，Flutter 嵌套 Widget。

### Layout process

### 布局过程

**SwiftUI** lays out views using the following process:

**SwiftUI** 按以下过程布局 view：

1. The parent view proposes a size to its child view.

   父 view 向子 view 提议尺寸。

1. All subsequent child views:

   所有后续子 view：

    - propose a size to _their_ child's view

      向 **其** 子 view 提议尺寸

    - ask that child what size it wants

      询问子 view 期望尺寸

1. Each parent view renders its child view at the returned size.

   每个父 view 按返回的尺寸渲染子 view。

**Flutter** differs somewhat with its process:

**Flutter** 的过程略有不同：

1. The parent widget passes constraints down to its children.
   Constraints include minimum and maximum values for height and width.

   父 widget 向子级传递约束，包括高度与宽度的最小值和最大值。

1. The child tries to decide its size. It repeats the same process with its own
   list of children:

   子 widget 会尝试决定自身的尺寸，并对它自己的子级列表重复相同的过程：

    - It informs its child of the child's constraints.

      告知其子级所受的约束。

    - It asks its child what size it wishes to be.

      询问其子级希望的尺寸。

1. The parent lays out the child.

   父级对子级进行布局。

    - If the requested size fits in the constraints,
      the parent uses that size.

      若请求的尺寸符合约束，父级就采用该尺寸。

    - If the requested size doesn't fit in the constraints,
      the parent limits the height, width, or both to fit in
      its constraints.

      若请求的尺寸不符合约束，父级会限制高度、宽度或两者，使其符合约束。

Flutter differs from SwiftUI because the parent component can override
the child's desired size. The widget cannot have any size it wants.
It also cannot know or decide its position on screen as its parent
makes that decision.

Flutter 与 SwiftUI 不同在于父组件可覆盖子组件期望尺寸；
widget 不能任意尺寸，也无法知晓或决定屏幕位置，由父组件决定。

To force a child widget to render at a specific size,
the parent must set tight constraints.
A constraint becomes tight when its constraint's minimum size value
equals its maximum size value.

要强制子 widget 以特定尺寸渲染，父级须设置紧约束；最小尺寸等于最大尺寸时为紧约束。

In **SwiftUI**, views might expand to the available space or
limit their size to that of its content.
**Flutter** widgets behave in similar manner.

在 **SwiftUI** 中，view 可扩展到可用空间或限制为内容尺寸。
**Flutter** widget 行为类似。

However, in Flutter parent widgets can offer unbounded constraints.
Unbounded constraints set their maximum values to infinity.

但 Flutter 父 widget 可提供无界约束，最大值设为无穷。

```dart
UnboundedBox(
  child: Container(
      width: double.infinity, height: double.infinity, color: red),
)
```

If the child expands and it has unbounded constraints,
Flutter returns an overflow warning:

若子级扩展且有无界约束，Flutter 会返回溢出警告：

```dart
UnconstrainedBox(
  child: Container(color: red, width: 4000, height: 50),
)
```

<img src="/assets/images/docs/ui/layout/layout-14.png" alt="When parents pass unbounded constraints to children, and the children are expanding, then there is an overflow warning.">

To learn how constraints work in Flutter,
see [Understanding constraints][].

要了解 Flutter 中约束的工作原理，请参阅 [理解布局约束][Understanding constraints]。

### Design system

### 设计系统

Because Flutter targets multiple platforms, your app doesn't need
to conform to any design system.
Though this guide features [Material][] widgets,
your Flutter app can use many different design systems:

Flutter 面向多平台，应用不必遵循特定设计系统。
本指南使用 [Material][] widget，但可采用多种设计系统：

- Custom Material widgets

  自定义 Material widget
- Community built widgets

  社区构建的 widget
- Your own custom widgets

  你自己的自定义 widget
- [Cupertino widgets][] that follow Apple's Human Interface Guidelines

  遵循 Apple 人机界面指南的 [Cupertino widgets][]

<YouTubeEmbed id="3PdUaidHc-E" title="Flutter's cupertino library for iOS developers"></YouTubeEmbed>

If you're looking for a great reference app that features a
custom design system, check out [Wonderous][].

参考自定义设计系统的优秀应用请参阅 [Wonderous][]。

## UI Basics

## UI 基础

This section covers the basics of UI development in
Flutter and how it compares to SwiftUI.
This includes how to start developing your app, display static text,
create buttons, react to on-press events, display lists, grids, and more.

本节涵盖 Flutter UI 基础及与 SwiftUI 的对比，包括入门、静态文本、按钮、点击响应、列表与网格等。

### Getting started

### 入门

In **SwiftUI**, you use `App` to start your app.

在 **SwiftUI** 中，用 `App` 启动应用。

```swift
@main
struct MyApp: App {
  var body: some Scene {
    WindowGroup {
      HomePage()
    }
  }
}
```

Another common SwiftUI practice places the app body within a `struct`
that conforms to the `View` protocol as follows:

另一常见做法将应用 body 放在符合 `View` 协议的 `struct` 中，如下：

```swift
struct HomePage: View {
  var body: some View {
    Text("Hello, World!")
  }
}
```

To start your **Flutter** app, pass in an instance of your app to
the `runApp` function.

启动 **Flutter** 应用时，将应用实例传给 `runApp`。

<?code-excerpt "lib/get_started.dart (main)"?>
```dart dartpad="42cf3026e1460ef618257684ee5af6a2"
void main() {
  runApp(const MyApp());
}
```

`App` is a widget. The build method describes the part of the
user interface it represents.
It's common to begin your app with a [`WidgetApp`][] class,
like [`CupertinoApp`][].

`App` 是 widget，build 方法描述所代表的用户界面。
通常以 [`WidgetApp`][] 类（如 [`CupertinoApp`][]）开始。

<?code-excerpt "lib/get_started.dart (myapp)"?>
```dart dartpad="42cf3026e1460ef618257684ee5af6a2"
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Returns a CupertinoApp that, by default,
    // has the look and feel of an iOS app.
    return const CupertinoApp(home: HomePage());
  }
}
```

The widget used in `HomePage` might begin with the `Scaffold` class.
`Scaffold` implements a basic layout structure for an app.

`HomePage` 中的 widget 可能以 `Scaffold` 开始，实现应用基本布局结构。

<?code-excerpt "lib/get_started.dart (homepage)"?>
```dart dartpad="42cf3026e1460ef618257684ee5af6a2"
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: Text('Hello, World!')));
  }
}
```

Note how Flutter uses the [`Center`][] widget.
SwiftUI renders a view's contents in its center by default.
That's not always the case with Flutter.
`Scaffold` doesn't render its `body` widget at the center of the screen.
To center the text, wrap it in a `Center` widget.
To learn about different widgets and their default behaviors, check out
the [Widget catalog][].

注意 Flutter 使用 [`Center`][]。
SwiftUI 默认将 view 内容居中渲染，Flutter 并非总是如此；`Scaffold` 不会将 `body` 居中。
要居中文本请用 `Center` 包裹，详见 [核心 Widget 目录][Widget catalog]。

### Adding Buttons

### 添加按钮

In **SwiftUI**, you use the `Button` struct to create a button.

在 **SwiftUI** 中，用 `Button` 结构体创建按钮。

```swift
Button("Do something") {
  // this closure gets called when your
  // button is tapped
}
```

To achieve the same result in **Flutter**,
use the `CupertinoButton` class:

在 **Flutter** 中，用 `CupertinoButton` 类达到相同效果：

<?code-excerpt "lib/text_button.dart (text-button)" replace="/child: //g;"?>
```dart dartpad="3c9b9a4de431b86725197a7fc2c84158"
CupertinoButton(
  onPressed: () {
    // This closure is called when your button is tapped.
  },
  const Text('Do something'),
),
```

**Flutter** gives you access to a variety of buttons with predefined styles.
The [`CupertinoButton`][] class comes from the Cupertino library.
Widgets in the Cupertino library use Apple's design system.

**Flutter** 提供多种预定义样式按钮。
[`CupertinoButton`][] 来自 Cupertino 库，其 widget 使用 Apple 设计系统。

### Aligning components horizontally

### 水平对齐组件

In **SwiftUI**, stack views play a big part in designing your layouts.
Two separate structures allow you to create stacks:

在 **SwiftUI** 中，stack view 在布局中很重要，有两种结构：

1. `HStack` for horizontal stack views

   `HStack` 用于水平 stack view

2. `VStack` for vertical stack views

   `VStack` 用于垂直 stack view

The following SwiftUI view adds a globe image and
text to a horizontal stack view:

以下 SwiftUI view 在水平 stack 中添加地球图标与文本：

```swift
HStack {
  Image(systemName: "globe")
  Text("Hello, world!")
}
```

**Flutter** uses [`Row`][] rather than `HStack`:

**Flutter** 使用 [`Row`][] 而非 `HStack`：

<?code-excerpt "lib/row.dart (row)" replace="/child: //g;"?>
```dart dartpad="0365338f938427b01d72e37cea554f75"
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [Icon(CupertinoIcons.globe), Text('Hello, world!')],
),
```

The `Row` widget requires a `List<Widget>` in the `children` parameter.
The `mainAxisAlignment` property tells Flutter how to position children
with extra space. `MainAxisAlignment.center` positions children in the
center of the main axis. For `Row`, the main axis is the horizontal
axis.

`Row` 的 `children` 需 `List<Widget>`；
`mainAxisAlignment` 控制额外空间中的子项位置，`MainAxisAlignment.center` 将子项放在主轴中心；
`Row` 的主轴为水平轴。

### Aligning components vertically

### 垂直对齐组件

The following examples build on those in the previous section.

以下示例建立在上一节基础上。

In **SwiftUI**, you use `VStack` to arrange the components into a
vertical pillar.

在 **SwiftUI** 中，用 `VStack` 将组件垂直排列。

```swift
VStack {
  Image(systemName: "globe")
  Text("Hello, world!")
}
```

**Flutter** uses the same Dart code from the previous example,
except it swaps [`Column`][] for `Row`:

**Flutter** 使用与上一示例相同的 Dart 代码，但将 [`Row`][] 换为 [`Column`][]：

<?code-excerpt "lib/column.dart (column)" replace="/child: //g;"?>
```dart dartpad="d9a288be0c2a353296fc8825680b84b8"
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [Icon(CupertinoIcons.globe), Text('Hello, world!')],
),
```

### Displaying a list view

### 显示列表视图

In **SwiftUI**, you use the `List` base component to display sequences
of items.
To display a sequence of model objects, make sure that the user can
identify your model objects.
To make an object identifiable, use the `Identifiable` protocol.

在 **SwiftUI** 中，用 `List` 显示项序列；
要显示模型对象序列，须使用户能识别模型对象，对象需符合 `Identifiable` 协议。

```swift
struct Person: Identifiable {
  var name: String
}

var persons = [
  Person(name: "Person 1"),
  Person(name: "Person 2"),
  Person(name: "Person 3"),
]

struct ListWithPersons: View {
  let persons: [Person]
  var body: some View {
    List {
      ForEach(persons) { person in
        Text(person.name)
      }
    }
  }
}
```

This resembles how **Flutter** prefers to build its list widgets.
Flutter doesn't need the list items to be identifiable.
You set the number of items to display then build a widget for each item.

这与 **Flutter** 构建列表 widget 的方式类似；
Flutter 不要求列表项可识别，你设置项数并为每项构建 widget。

<?code-excerpt "lib/list.dart (simple-list)"?>
```dart dartpad="67426fd4f9c38c0c1db96b1af65598f2"
class Person {
  String name;
  Person(this.name);
}

final List<Person> items = [
  Person('Person 1'),
  Person('Person 2'),
  Person('Person 3'),
];

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          return ListTile(title: Text(items[index].name));
        },
      ),
    );
  }
}
```

Flutter has some caveats for lists:

Flutter 列表有一些注意事项：

- The [`ListView`] widget has a builder method.
  This works like the `ForEach` within SwiftUI's `List` struct.

  [`ListView`] widget 提供了一个 builder 方法，其作用类似于 SwiftUI `List` 结构体中的 `ForEach`。

- The `itemCount` parameter of the `ListView` sets how many items
  the `ListView` displays.

  `ListView` 的 `itemCount` 参数用于设置 `ListView` 显示的项目数量。

- The `itemBuilder` has an index parameter that will be between zero
  and one less than itemCount.

  `itemBuilder` 带有一个 index 参数，其取值范围在 0 到 itemCount 减 1 之间。

The previous example returned a [`ListTile`][] widget for each item.
The `ListTile` widget includes properties like `height` and `font-size`.
These properties help build a list. However, Flutter allows you to return
almost any widget that represents your data.

上面的示例为每个项目返回了一个 [`ListTile`][] widget。
`ListTile` widget 包含 `height`、`font-size` 等属性，这些属性有助于构建列表。
不过，Flutter 允许你返回几乎任何能表示你数据的 widget。

### Displaying a grid

### 显示网格

When constructing non-conditional grids in **SwiftUI**,
you use `Grid` with `GridRow`.

在 **SwiftUI** 中构建非条件网格时，使用 `Grid` 与 `GridRow`。

```swift
Grid {
  GridRow {
    Text("Row 1")
    Image(systemName: "square.and.arrow.down")
    Image(systemName: "square.and.arrow.up")
  }
  GridRow {
    Text("Row 2")
    Image(systemName: "square.and.arrow.down")
    Image(systemName: "square.and.arrow.up")
  }
}
```

To display grids in **Flutter**, use the [`GridView`] widget.
This widget has various constructors. Each constructor has
a similar goal, but uses different input parameters.
The following example uses the `.builder()` initializer:

在 **Flutter** 中用 [`GridView`] widget 显示网格，有多种构造函数，以下使用 `.builder()` 初始化：

<?code-excerpt "lib/grid.dart (grid-example)"?>
```dart dartpad="d6b9174f33db94164e457b3da80da933"
const widgets = <Widget>[
  Text('Row 1'),
  Icon(CupertinoIcons.arrow_down_square),
  Icon(CupertinoIcons.arrow_up_square),
  Text('Row 2'),
  Icon(CupertinoIcons.arrow_down_square),
  Icon(CupertinoIcons.arrow_up_square),
];

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          mainAxisExtent: 40,
        ),
        itemCount: widgets.length,
        itemBuilder: (context, index) => widgets[index],
      ),
    );
  }
}
```

The `SliverGridDelegateWithFixedCrossAxisCount` delegate determines
various parameters that the grid uses to lay out its components.
This includes `crossAxisCount` that dictates the number of items
displayed on each row.

`SliverGridDelegateWithFixedCrossAxisCount` delegate 决定了网格用来布局其组件的各种参数，
其中包括决定每行显示项目数量的 `crossAxisCount`。

How SwiftUI's `Grid` and Flutter's `GridView` differ in that `Grid`
requires `GridRow`. `GridView` uses the delegate to decide how the
grid should lay out its components.

SwiftUI 的 `Grid` 与 Flutter 的 `GridView` 的区别在于 `Grid` 需要 `GridRow`；
`GridView` 用 delegate 决定布局。

### Creating a scroll view

### 创建滚动视图

In **SwiftUI**, you use `ScrollView` to create custom scrolling
components.
The following example displays a series of `PersonView` instances
in a scrollable fashion.

在 **SwiftUI** 中，用 `ScrollView` 创建自定义滚动组件，以下示例以可滚动方式显示一系列 `PersonView`。

```swift
ScrollView {
  VStack(alignment: .leading) {
    ForEach(persons) { person in
      PersonView(person: person)
    }
  }
}
```

To create a scrolling view, **Flutter** uses [`SingleChildScrollView`][].
In the following example, the function `mockPerson` mocks instances
of the `Person` class to create the custom `PersonView` widget.

**Flutter** 用 [`SingleChildScrollView`][] 创建滚动视图，
以下 `mockPerson` 模拟 `Person` 实例创建 `PersonView`。

<?code-excerpt "lib/scroll.dart (scroll-example)" replace="/body: //g;"?>
```dart dartpad="a75740320989ed04020d95502a0de34e"
SingleChildScrollView(
  child: Column(
    children: mockPersons
        .map((person) => PersonView(person: person))
        .toList(),
  ),
),
```

### Responsive and adaptive design

### 响应式与自适应设计

In **SwiftUI**, you use `GeometryReader` to create relative view sizes.

在 **SwiftUI** 中，用 `GeometryReader` 创建相对 view 尺寸。

For example, you could:

例如，你可以：

- Multiply `geometry.size.width` by some factor to set the _width_.

  将 `geometry.size.width` 乘以某个因子来设置 **width**。

- Use `GeometryReader` as a breakpoint to change the design of your app.

  将 `GeometryReader` 用作断点以更改应用设计。

You can also see if the size class has `.regular` or `.compact`
using `horizontalSizeClass`.

还可用 `horizontalSizeClass` 查看 size class 为 `.regular` 或 `.compact`。

To create relative views in **Flutter**, you can use one of two options:

在 **Flutter** 中创建相对视图有两种方式：

- Get the `BoxConstraints` object in the [`LayoutBuilder`][] class.

  在 [`LayoutBuilder`][] 类中获取 `BoxConstraints` 对象。

- Use the [`MediaQuery.of()`][] in your build functions
  to get the size and orientation of your current app.

  在 build 函数中使用 [`MediaQuery.of()`][] 获取当前应用的尺寸和方向。

To learn more, check out [Creating responsive and adaptive apps][].

要了解更多内容，请参阅 [创建响应式与自适应应用][Creating responsive and adaptive apps]。

### Managing state

### 管理状态

In **SwiftUI**, you use the `@State` property wrapper to represent the
internal state of a SwiftUI view.

在 **SwiftUI** 中，用 `@State` 属性包装器表示 SwiftUI view 的内部状态。

```swift
struct ContentView: View {
  @State private var counter = 0;
  var body: some View {
    VStack{
      Button("+") { counter+=1 }
      Text(String(counter))
    }
  }}
```

**SwiftUI** also includes several options for more complex state
management such as the `ObservableObject` protocol.

**SwiftUI** 还有 `ObservableObject` 等更复杂状态管理选项。

**Flutter** manages local state using a [`StatefulWidget`][].
Implement a stateful widget with the following two classes:

**Flutter** 使用 [`StatefulWidget`][] 管理局部状态。
通过以下两个类来实现一个 stateful widget：

- a subclass of `StatefulWidget`

  `StatefulWidget` 的一个子类

- a subclass of `State`

  `State` 的一个子类

The `State` object stores the widget's state.
To change a widget's state, call `setState()` from the `State` subclass
to tell the framework to redraw the widget.

`State` 对象存储着 widget 的状态。
要改变 widget 的状态，可在 `State` 子类中调用 `setState()`，以通知框架重绘该 widget。

The following example shows a part of a counter app:

以下示例展示了一个计数器应用的部分代码：

<?code-excerpt "lib/state.dart (state)"?>
```dart dartpad="34815ab7d6ee0c5a45c82597df444450"
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('$_counter'),
            TextButton(
              onPressed: () => setState(() {
                _counter++;
              }),
              child: const Text('+'),
            ),
          ],
        ),
      ),
    );
  }
}
```

To learn more ways to manage state, check out [State management][].

要了解更多管理状态的方式，请参阅 [状态管理][State management]。

### Animations

### 动画

Two main types of UI animations exist.

UI 动画主要有两类。

- Implicit that animated from a current value to a new target.

  隐式：从当前值动画到新目标。
- Explicit that animates when asked.

  显式：按需动画。

#### Implicit Animation

#### 隐式动画

SwiftUI and Flutter take a similar approach to animation.
In both frameworks, you specify parameters like `duration`, and `curve`.

SwiftUI 与 Flutter 动画方式相似，都指定 `duration`、`curve` 等参数。

In **SwiftUI**, you use the `animate()` modifier to handle implicit
animation.

在 **SwiftUI** 中，用 `animate()` modifier 处理隐式动画。

```swift
Button("Tap me!"){
   angle += 45
}
.rotationEffect(.degrees(angle))
.animation(.easeIn(duration: 1))
```

**Flutter** includes widgets for implicit animation.
This simplifies animating common widgets.
Flutter names these widgets with the following format: `AnimatedFoo`.

**Flutter** 有隐式动画 widget，简化常见 widget 动画，命名格式为 `AnimatedFoo`。

For example: To rotate a button, use the [`AnimatedRotation`][] class.
This animates the `Transform.rotate` widget.

例如旋转按钮用 [`AnimatedRotation`][]，为 `Transform.rotate` widget 添加动画。

<?code-excerpt "lib/simple_animation.dart (animated-button)" replace="/child: //g;"?>
```dart dartpad="0ad0572cbf98ead2e5d31a2a94430f19"
AnimatedRotation(
  duration: const Duration(seconds: 1),
  turns: turns,
  curve: Curves.easeIn,
  TextButton(
    onPressed: () {
      setState(() {
        turns += .125;
      });
    },
    const Text('Tap me!'),
  ),
),
```

Flutter allows you to create custom implicit animations.
To compose a new animated widget, use the [`TweenAnimationBuilder`][].

Flutter 可创建自定义隐式动画，用 [`TweenAnimationBuilder`][] 组合新动画 widget。

#### Explicit Animation

#### 显式动画

For explicit animations, **SwiftUI** uses the `withAnimation()` function.

显式动画方面，**SwiftUI** 用 `withAnimation()`。

**Flutter** includes explicitly animated widgets with names formatted
like `FooTransition`.
One example would be the [`RotationTransition`][] class.

**Flutter** 有显式动画 widget，命名如 `FooTransition`，例如 [`RotationTransition`][]。

Flutter also allows you to create a custom explicit animation using
`AnimatedWidget` or `AnimatedBuilder`.

Flutter 还可用 `AnimatedWidget` 或 `AnimatedBuilder` 创建自定义显式动画。

To learn more about animations in Flutter, see [Animations overview][].

更多动画信息请参阅 [动画概览][Animations overview]。

### Drawing on the Screen

### 在屏幕上绘制

In **SwiftUI**, you use `CoreGraphics` to draw lines and shapes to the
screen.

在 **SwiftUI** 中，用 `CoreGraphics` 在屏幕上绘制线条与形状。

**Flutter** has an API based on the `Canvas` class,
with two classes that help you draw:

**Flutter** 基于 `Canvas` 类提供 API，有两个辅助类：

1. [`CustomPaint`][] that requires a painter:

   需要一个 painter 的 [`CustomPaint`][]：

    <?code-excerpt "lib/canvas.dart (custom-paint)" replace="/child: //g;"?>
    ```dart dartpad="978d64ee66d54177fb639f8a9f801039"
    CustomPaint(
      painter: SignaturePainter(_points),
      size: Size.infinite,
    ),
    ```

2. [`CustomPainter`][] that implements your algorithm to draw to the canvas.

   实现你的算法、负责将内容绘制到画布上的 [`CustomPainter`][]。

    <?code-excerpt "lib/canvas.dart (custom-painter)"?>
    ```dart dartpad="978d64ee66d54177fb639f8a9f801039"
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

## Navigation

## 导航

This section explains how to navigate between pages of an app,
the push and pop mechanism, and more.

本节说明应用页面间导航、push/pop 机制等。

### Navigating between pages

### 在页面间导航

Developers build iOS and macOS apps with different pages called
_navigation routes_.

开发者使用称为 **navigation routes**（导航路由）的不同页面来构建 iOS 与 macOS 应用。

In **SwiftUI**, the `NavigationStack` represents this stack of pages.

在 **SwiftUI** 中，`NavigationStack` 表示该页面栈。

The following example creates an app that displays a list of persons.
To display a person's details in a new navigation link,
tap on that person.

以下示例创建显示人员列表的应用，点击人员在新的导航链接中显示详情。

```swift
NavigationStack(path: $path) {
  List {
    ForEach(persons) { person in
      NavigationLink(
        person.name,
        value: person
      )
    }
  }
  .navigationDestination(for: Person.self) { person in
    PersonView(person: person)
  }
}
```

If you have a small **Flutter** app without complex linking,
use [`Navigator`][] with named routes.
After defining your navigation routes,
call your navigation routes using their names.

若无复杂链接的小型 **Flutter** 应用，可用 [`Navigator`][] 命名路由；定义路由后按名称调用。

1. Name each route in the class passed to the `runApp()` function.
   The following example uses `App`:

   在传给 `runApp()` 函数的类中为每条路由命名，以下示例使用 `App`：

    <?code-excerpt "lib/navigation.dart (routes)"?>
    ```dart dartpad="d8b22d4dcbefdc8a2e21f1382cf7dc2a"
    // Defines the route name as a constant
    // so that it's reusable.
    const detailsPageRouteName = '/details';
    
    class App extends StatelessWidget {
      const App({super.key});
    
      @override
      Widget build(BuildContext context) {
        return CupertinoApp(
          home: const HomePage(),
          // The [routes] property defines the available named routes
          // and the widgets to build when navigating to those routes.
          routes: {detailsPageRouteName: (context) => const DetailsPage()},
        );
      }
    }
    ```

   The following sample generates a list of persons using
   `mockPersons()`. Tapping a person pushes the person's detail page
   to the `Navigator` using `pushNamed()`.

   下面的示例使用 `mockPersons()` 生成一个人员列表。
   点击某个人员时，会使用 `pushNamed()` 将该人员的详情页推入 `Navigator`。

    <?code-excerpt "lib/navigation.dart (list-view)" replace="/child: //g;"?>
    ```dart dartpad="d8b22d4dcbefdc8a2e21f1382cf7dc2a"
    ListView.builder(
      itemCount: mockPersons.length,
      itemBuilder: (context, index) {
        final person = mockPersons.elementAt(index);
        final age = '${person.age} years old';
        return ListTile(
          title: Text(person.name),
          subtitle: Text(age),
          trailing: const Icon(Icons.arrow_forward_ios),
          onTap: () {
            // When a [ListTile] that represents a person is
            // tapped, push the detailsPageRouteName route
            // to the Navigator and pass the person's instance
            // to the route.
            Navigator.of(
              context,
            ).pushNamed(detailsPageRouteName, arguments: person);
          },
        );
      },
    ),
    ```

1. Define the `DetailsPage` widget that displays the details of
   each person. In Flutter, you can pass arguments into the
   widget when navigating to the new route.
   Extract the arguments using `ModalRoute.of()`:

   定义用于显示每个人员详情的 `DetailsPage` widget。
   在 Flutter 中，导航到新路由时可以向 widget 传入参数，并使用 `ModalRoute.of()` 提取这些参数。

    <?code-excerpt "lib/navigation.dart (details-page)"?>
    ```dart dartpad="d8b22d4dcbefdc8a2e21f1382cf7dc2a"
    class DetailsPage extends StatelessWidget {
      const DetailsPage({super.key});
    
      @override
      Widget build(BuildContext context) {
        // Read the person instance from the arguments.
        final Person person = ModalRoute.of(context)?.settings.arguments as Person;
        // Extract the age.
        final age = '${person.age} years old';
        return Scaffold(
          // Display name and age.
          body: Column(children: [Text(person.name), Text(age)]),
        );
      }
    }
    ```

To create more advanced navigation and routing requirements,
use a routing package such as [go_router][].

更高级导航需求可使用 [go_router][] 等路由 package。

To learn more, check out [Navigation and routing][].

更多内容请参阅 [导航与路由][Navigation and routing]。

### Manually pop back

### 手动返回

In **SwiftUI**, you use the `dismiss` environment value to pop-back to
the previous screen.

在 **SwiftUI** 中，用 `dismiss` 环境值返回上一屏。

```swift
Button("Pop back") {
  dismiss()
}
```

In **Flutter**, use the `pop()` function of the `Navigator` class:

在 **Flutter** 中，用 `Navigator` 类的 `pop()`：

<?code-excerpt "lib/popback.dart (pop-back)"?>
```dart dartpad="3c125ab2dfba9f4178aeaeb8619c5bea"
TextButton(
  onPressed: () {
    // This code allows the
    // view to pop back to its presenter.
    Navigator.of(context).pop();
  },
  child: const Text('Pop back'),
),
```

### Navigating to another app

### 导航到其他应用

In **SwiftUI**, you use the `openURL` environment variable to open a
URL to another application.

在 **SwiftUI** 中，用 `openURL` 环境变量打开其他应用的 URL。

```swift
@Environment(\.openURL) private var openUrl

// View code goes here

Button("Open website") {
  openUrl(
    URL(
      string: "https://google.com"
    )!
  )
}
```

In **Flutter**, use the [`url_launcher`][] plugin.

在 **Flutter** 中，使用 [`url_launcher`][] 插件。

<?code-excerpt "lib/openapp.dart (open-app-example)" replace="/child: //g;"?>
```dart dartpad="695beba25fa8120d89c9960cb222e276"
CupertinoButton(
  onPressed: () async {
    await launchUrl(Uri.parse('https://google.com'));
  },
  const Text('Open website'),
),
```

## Themes, styles, and media

## 主题、样式与媒体

You can style Flutter apps with little effort.
Styling includes switching between light and dark themes,
changing the design of your text and UI components,
and more. This section covers how to style your apps.

可轻松设置 Flutter 应用样式，包括主题切换、文本与 UI 组件设计等。

### Using dark mode

### 使用深色模式

In **SwiftUI**, you call the `preferredColorScheme()`
function on a `View` to use dark mode.

在 **SwiftUI** 中，在 `View` 上调用 `preferredColorScheme()` 使用深色模式。

In **Flutter**, you can control light and dark mode at the app-level.
To control the brightness mode, use the `theme` property
of the `App` class:

在 **Flutter** 中，可在应用级用 `App` 的 `theme` 控制亮度模式。

<?code-excerpt "lib/cupertino_themes.dart (theme)" replace="/return //g;"?>
```dart dartpad="18790cfaa8441085994373a4bc4f46b0"
const CupertinoApp(
  theme: CupertinoThemeData(brightness: Brightness.dark),
  home: HomePage(),
);
```

### Styling text

### 设置文本样式

In **SwiftUI**, you use modifier functions to style text.
For example, to change the font of a `Text` string,
use the `font()` modifier:

在 **SwiftUI** 中，用 modifier 设置文本样式，例如用 `font()` 修改 `Text` 字体。

```swift
Text("Hello, world!")
  .font(.system(size: 30, weight: .heavy))
  .foregroundColor(.yellow)
```

To style text in **Flutter**, add a `TextStyle` widget as the value
of the `style` parameter of the `Text` widget.

在 **Flutter** 中，将 `TextStyle` 作为 `Text` 的 `style` 参数。

<?code-excerpt "lib/cupertino_themes.dart (styling-text)" replace="/child: //g;"?>
```dart dartpad="18790cfaa8441085994373a4bc4f46b0"
Text(
  'Hello, world!',
  style: TextStyle(
    fontSize: 30,
    fontWeight: FontWeight.bold,
    color: CupertinoColors.systemYellow,
  ),
),
```

### Styling buttons

### 设置按钮样式

In **SwiftUI**, you use modifier functions to style buttons.

在 **SwiftUI** 中，用 modifier 设置按钮样式。

```swift
Button("Do something") {
  // Do something when the button is tapped.
}
.font(.system(size: 30, weight: .bold))
.background(Color.yellow)
.foregroundColor(Color.blue)
```

To style button widgets in **Flutter**, set the style of its child,
or modify properties on the button itself.

在 **Flutter** 中，设置子项样式或修改按钮属性。

In the following example:

在以下示例中：

- The `color` property of `CupertinoButton` sets its `color`.

  `CupertinoButton` 的 `color` 设置其颜色。

- The `color` property of the child `Text` widget sets the button
  text color.

  子 `Text` widget 的 `color` 设置按钮文字颜色。

<?code-excerpt "lib/stylingbutton.dart (styling-button)"?>
```dart dartpad="f8b6622f526fc5c7d5adadf1e071c28f"
child: CupertinoButton(
  color: CupertinoColors.systemYellow,
  onPressed: () {},
  child: const Text(
    'Do something',
    style: TextStyle(
      color: CupertinoColors.systemBlue,
      fontSize: 30,
      fontWeight: FontWeight.bold,
    ),
  ),
),
```

### Using custom fonts

### 使用自定义字体

In **SwiftUI**, you can use a custom font in your app in two steps.
First, add the font file to your SwiftUI project. After adding the file,
use the `.font()` modifier to apply it to your UI components.

在 **SwiftUI** 中，两步使用自定义字体：
将字体文件加入项目，再用 `.font()` modifier 应用到 UI 组件。

```swift
Text("Hello")
  .font(
    Font.custom(
      "BungeeSpice-Regular",
      size: 40
    )
  )
```

In **Flutter**, you control your resources with a file
named `pubspec.yaml`. This file is platform agnostic.
To add a custom font to your project, follow these steps:

在 **Flutter** 中，用 `pubspec.yaml` 管理平台无关的资源。添加自定义字体步骤：

1. Create a folder called `fonts` in the project's root directory.
   This optional step helps to organize your fonts.

   在项目的根目录创建一个名为 `fonts` 的文件夹。此步骤可选，有助于组织你的字体。

1. Add your `.ttf`, `.otf`, or `.ttc` font file into the `fonts` folder.

   将你的 `.ttf`、`.otf` 或 `.ttc` 字体文件放入 `fonts` 文件夹。

1. Open the `pubspec.yaml` file within the project.

   打开项目中的 `pubspec.yaml` 文件。

1. Find the `flutter` section.

   找到 `flutter` 部分。

1. Add your custom font(s) under the `fonts` section.

   在 `fonts` 部分下添加你的自定义字体。

    ```yaml
    flutter:
      fonts:
        - family: BungeeSpice
          fonts:
            - asset: fonts/BungeeSpice-Regular.ttf
    ```

After you add the font to your project, you can use it as in the
following example:

添加字体后，可如下使用：

<?code-excerpt "lib/stylingbutton.dart (custom-font)" replace="/middle: //g;"?>
```dart
Text(
  'Cupertino',
  style: TextStyle(fontSize: 40, fontFamily: 'BungeeSpice'),
),
```

:::note
To download custom fonts to use in your apps,
check out [Google Fonts](https://fonts.google.com).

要为应用下载自定义字体，请参阅 [Google Fonts](https://fonts.google.com)。
:::

### Bundling images in apps

### 在应用中打包图片

In **SwiftUI**, you first add the image files to `Assets.xcassets`,
then use the `Image` view to display the images.

在 **SwiftUI** 中，先将图像加入 `Assets.xcassets`，再用 `Image` view 显示。

To add images in **Flutter**, follow a method similar to how you added
custom fonts.

在 **Flutter** 中添加图像的方式类似自定义字体。

1. Add an `images` folder to the root directory.

   在根目录添加一个 `images` 文件夹。

1. Add this asset to the `pubspec.yaml` file.

   在 `pubspec.yaml` 文件中添加该资源。

    ```yaml
    flutter:
      assets:
        - images/Blueberries.jpg
    ```

After adding your image, display it using the `Image` widget's
`.asset()` constructor. This constructor:

添加图像后，用 `Image` widget 的 `.asset()` 构造函数显示。该构造函数：

1. Instantiates the given image using the provided path.

   使用提供的路径实例化给定的图像。

1. Reads the image from the assets bundled with your app.

   从随应用捆绑的资源中读取该图像。

1. Displays the image on the screen.

   在屏幕上显示该图像。

To review a complete example, check out the [`Image`][] docs.

完整示例请参阅 [`Image`][] 文档。

### Bundling videos in apps

### 在应用中打包视频

In **SwiftUI**, you bundle a local video file with your app in two
steps.
First, you import the `AVKit` framework, then you instantiate a
`VideoPlayer` view.

在 **SwiftUI** 中，两步捆绑本地视频：导入 `AVKit`，再实例化 `VideoPlayer` view。

In **Flutter**, add the [video_player][] plugin to your project.
This plugin allows you to create a video player that works on
Android, iOS, and on the web from the same codebase.

在 **Flutter** 中，添加 [video_player][] 插件，可从同一代码库在 Android、iOS 与 Web 上播放视频。

1. Add the plugin to your app and add the video file to your project.

   将该插件添加到你的应用，并将视频文件添加到项目中。

1. Add the asset to your `pubspec.yaml` file.

   在 `pubspec.yaml` 文件中添加该资源。

1. Use the `VideoPlayerController` class to load and play your video
   file.

   使用 `VideoPlayerController` 类加载并播放你的视频文件。

To review a complete walkthrough, check out the [video_player example][].

完整教程请参阅 [video_player 示例][video_player example]。

[Flutter for UIKit developers]: /flutter-for/uikit-devs
[Add Flutter to existing app]: /add-to-app
[Animations overview]: /ui/animations
[Cupertino widgets]: /ui/widgets/cupertino
[Flutter concurrency for Swift developers]: /flutter-for/dart-swift-concurrency
[Navigation and routing]: /ui/navigation
[Material]: {{site.material}}/develop/flutter/
[Platform adaptations]: /platform-integration/platform-adaptations
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[widget catalog]: /ui/widgets/layout
[Understanding constraints]: /ui/layout/constraints
[`WidgetApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`CupertinoButton`]: {{site.api}}/flutter/cupertino/CupertinoButton-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[Learning Dart as a Swift Developer]: {{site.dart-site}}/guides/language/coming-from/swift-to-dart
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ListTile`]: {{site.api}}/flutter/widgets/ListTitle-class.html
[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`AnimatedRotation`]: {{site.api}}/flutter/widgets/AnimatedRotation-class.html
[`TweenAnimationBuilder`]: {{site.api}}/flutter/widgets/TweenAnimationBuilder-class.html
[`RotationTransition`]: {{site.api}}/flutter/widgets/RotationTransition-class.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[State management]:  /data-and-backend/state-mgmt
[Wonderous]: https://flutter.gskinner.com/wonderous/?utm_source=flutterdocs&utm_medium=docs&utm_campaign=iosdevs
[video_player]: {{site.pub-pkg}}/video_player
[video_player example]: {{site.pub-pkg}}/video_player/example
[Creating responsive and adaptive apps]: /ui/adaptive-responsive
[`MediaQuery.of()`]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[`CustomPaint`]: {{site.api}}/flutter/widgets/CustomPaint-class.html
[`CustomPainter`]: {{site.api}}/flutter/rendering/CustomPainter-class.html
[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[go_router]: {{site.pub-pkg}}/go_router
