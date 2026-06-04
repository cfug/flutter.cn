---
# title: Flutter for Jetpack Compose developers
title: 面向 Jetpack Compose 开发者的 Flutter
# description: Learn how to apply Jetpack Compose developer knowledge when building Flutter apps.
description: 学习在构建 Flutter 应用时运用 Jetpack Compose 开发经验。
ai-translated: true
---

<?code-excerpt path-base="get-started/flutter-for/compose_devs"?>

:::note
If you have experience building Android apps with Views (XML),
check out [Flutter for Android developers][].
:::

:::note
若你有使用 Views（XML）构建 Android 应用的经验，
请参阅 [Flutter for Android developers][]（面向 Android 开发者的 Flutter）。
:::

Flutter is a framework for building cross-platform applications
that uses the Dart programming language.

Flutter 是使用 Dart 编程语言构建跨平台应用的框架。

Your Jetpack Compose knowledge and experience
are highly valuable when building with Flutter.

你的 Jetpack Compose 知识与经验在构建 Flutter 时非常宝贵。

:::tip
To integrate Flutter code into an **existing** Android app,
check out [Add Flutter to existing app][].
:::

:::tip
若要将 Flutter 代码集成到**现有** Android 应用，
请参阅 [Add Flutter to existing app][]（将 Flutter 添加到现有应用）。
:::

This document can be used as a reference by jumping around
and finding questions that are most relevant to your needs.
This guide embeds sample code.
By using the "Open in DartPad" button that appears on hover or focus,
you can open and run some of the examples on DartPad.

本文档可跳转查阅，找到最符合你需求的问题。本指南嵌入示例代码；通过悬停或聚焦时出现的「Open in DartPad」按钮，可在 DartPad 中打开并运行部分示例。

## Overview

## 概览

Flutter and Jetpack Compose code describe how the UI looks and works.
Developers call this type of code a _declarative framework_.

Flutter 与 Jetpack Compose 代码描述 UI 的外观与行为，开发者称此类代码为 _declarative framework_（声明式框架）。

While there are key differences especially when it comes to
interacting with legacy Android code, there are many commonalities
between the two frameworks.

两者尤其在与传统 Android 代码交互方面存在关键差异，但框架之间也有许多共同点。

### Composables vs. Widgets

### Composable 与 Widget

**Jetpack Compose** represents UI components as _composable functions_,
later noted in this document as _composables_. Composables can be
altered or decorated through the use of _Modifier_ objects.

**Jetpack Compose** 将 UI 组件表示为 _composable functions_（composable 函数），本文档中简称 _composables_。可通过 _Modifier_ 对象修改或装饰 Composable。

``` kotlin
Text("Hello, World!",
   modifier: Modifier.padding(10.dp)
)
Text("Hello, World!",
    modifier = Modifier.padding(10.dp))
```

**Flutter** represents UI components as _widgets_.

**Flutter** 将 UI 组件表示为 _widget_。

Both composables and widgets only exist until they need to change.
These languages call this property _immutability_.

Composable 与 widget 仅在需要变更前存在，这种特性称为 _immutability_（不可变性）。
Jetpack Compose modifies UI component properties using an optional
_modifier_ property backed by a `Modifier` object.
By contrast, Flutter widgets configure their properties directly
through constructor parameters.

Jetpack Compose 通过由 `Modifier` 对象支持的 _modifier_ 属性修改 UI 组件属性；Flutter widget 则通过构造函数参数直接配置属性。

```dart
Padding(                         // <-- This is a Widget
  padding: EdgeInsets.all(10.0), // <-- a parameter to Padding
  child: Text("Hello, World!"),  // <-- This is also a Widget
);
```

To compose layouts, both Jetpack Compose and Flutter nest UI components
within one another.
Jetpack Compose nests `Composables` while Flutter nests `Widgets`.

组合布局时，Jetpack Compose 与 Flutter 都将 UI 组件相互嵌套：Jetpack Compose 嵌套 `Composable`，Flutter 嵌套 `Widget`。

### Layout process

### 布局过程

Jetpack Compose and Flutter handle layout in similar ways. Both of them
lay out the UI in a single pass and parent elements provide layout constraints
down to their children. More specifically,

Jetpack Compose 与 Flutter 布局方式相似：单次传递布局 UI，父元素向子元素提供布局约束。更具体地说：

1. The parent measures itself and its children recursively providing
   any constraints from the parent to the child.

1. 父级递归测量自身与子级，将来自父级的约束传给子级。
2. The children try to size themselves using the above methods and
provide their own children both their constraints and any that
might apply from their ancestor nodes.

2. 子级尝试按上述方法确定尺寸，并向自己的子级提供约束及可能来自祖先节点的约束。
3. Upon encountering a leaf node (a node with no children), the size
and properties are determined based on the provided constraints
and the element is placed in the UI.

3. 遇到叶节点（无子节点）时，根据约束确定尺寸与属性并放置到 UI。
4. With all the children sized and placed, the root nodes can
determine their measurement, size, and placement.

4. 所有子级确定尺寸并放置后，根节点可确定自身的测量、尺寸与位置。

In both Jetpack Compose and Flutter, the parent component can override
or constrain the child's desired size. The widget cannot have any size it wants.
It also cannot _usually_ know or decide its position on screen as its parent
makes that decision.

在 Jetpack Compose 与 Flutter 中，父组件可覆盖或约束子组件期望的尺寸；widget 不能任意尺寸，也 _通常_ 无法知晓或决定屏幕位置，由父组件决定。

To force a child widget to render at a specific size,
the parent must set tight constraints.
A constraint becomes tight when its constraint's minimum size value
equals its maximum size value.

要强制子 widget 以特定尺寸渲染，父级须设置 tight constraints（紧约束）；当最小尺寸等于最大尺寸时约束为紧约束。

To learn how constraints work in Flutter,
visit [Understanding constraints][].

要了解 Flutter 约束机制，请参阅 [Understanding constraints][]（理解约束）。

### Design system

### 设计系统

Because Flutter targets multiple platforms, your app doesn't need
to conform to any design system.
While this guide features [Material][] widgets,
your Flutter app can use many different design systems:

Flutter 面向多平台，应用不必遵循特定设计系统。本指南使用 [Material][] widget，但 Flutter 应用可采用多种设计系统：

- Custom Material widgets

- 自定义 Material widget
- Community built widgets

- 社区构建的 widget
- Your own custom widgets

- 你自己的自定义 widget

If you're looking for a great reference app that features a
custom design system, check out [Wonderous][].

若要参考采用自定义设计系统的优秀应用，请参阅 [Wonderous][]。

## UI basics

## UI 基础

This section covers the basics of UI development in
Flutter and how it compares to Jetpack Compose.
This includes how to start developing your app, display static text,
create buttons, react to on-press events, display lists, grids, and more.

本节涵盖 Flutter UI 开发基础及其与 Jetpack Compose 的对比，包括如何开始开发、显示静态文本、创建按钮、响应点击、显示列表与网格等。

### Getting started

### 入门

For **Compose** apps, your main entry point will
be _Activity_ or one of its descendants,
generally _ComponentActivity_.

**Compose** 应用的主入口通常是 _Activity_ 或其子类，一般为 _ComponentActivity_。

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SampleTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

To start your **Flutter** app, pass an instance of your app to
the `runApp` function.

启动 **Flutter** 应用时，将应用实例传给 `runApp` 函数。

```dart
void main() {
  runApp(const MyApp());
}
```

`App` is a widget. It's `build` method describes the part of the
user interface it represents.
It's common to begin your app with a [`WidgetApp`][] class,
like [`MaterialApp`][].

`App` 是 widget，其 `build` 方法描述所代表的用户界面部分。通常以 [`WidgetApp`][] 类（如 [`MaterialApp`][]）开始应用。

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HomePage(),
    );
  }
}
```

The widget used in the `HomePage` might begin with the `Scaffold` class.
`Scaffold` implements a basic layout structure for an app.

`HomePage` 中使用的 widget 可能以 `Scaffold` 类开始，`Scaffold` 实现应用的基本布局结构。

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text(
          'Hello, World!',
        ),
      ),
    );
  }
}
```

Note how Flutter uses the [`Center`][] widget.

注意 Flutter 使用 [`Center`][] widget。

Compose has a number of defaults from its ancestor Android Views.
Unless otherwise specified, most components "wrap" their size to
content meaning they only take up as much space as needed when rendered.
That's not always the case with Flutter.

Compose 继承 Android Views 的若干默认行为：除非另有说明，多数组件按内容「包裹」尺寸，即仅占用渲染所需空间。Flutter 并非总是如此。

To center the text, wrap it in a `Center` widget.
To learn about different widgets and their default behaviors, check out
the [Widget catalog][].

要居中文本，请用 `Center` widget 包裹。要了解不同 widget 及其默认行为，请参阅 [Widget catalog][]（Widget 目录）。

### Adding Buttons

### 添加按钮

In **Compose**, you use the `Button` composable or one of its variants
to create a button. `Button` is an alias for `FilledTonalButton`
when using a Material theme.

在 **Compose** 中，使用 `Button` composable 或其变体创建按钮；使用 Material 主题时 `Button` 是 `FilledTonalButton` 的别名。

```kotlin
Button(onClick = {}) {
    Text("Do something")
}
```

To achieve the same result in **Flutter**,
use the `FilledButton` class:

在 **Flutter** 中，使用 `FilledButton` 类可达到相同效果：

```dart
FilledButton(
  onPressed: () {
    // This closure is called when your button is tapped.
  },
  const Text('Do something'),
),
```

**Flutter** gives you access to a variety of buttons with pre-defined styles.

**Flutter** 提供多种预定义样式的按钮。


### Aligning components horizontally or vertically

### 水平或垂直对齐组件
Jetpack Compose and Flutter handle horizontal and vertical collections of
items similarly.

Jetpack Compose 与 Flutter 以相似方式处理水平与垂直排列的项。

The following Compose snippet adds a globe image and
text in both `Row` and `Column` containers with centering of the items:

以下 Compose 片段在 `Row` 与 `Column` 容器中添加地球图标与文本并居中：

```kotlin
Row(horizontalArrangement = Arrangement.Center) {
   Image(Icons.Default.Public, contentDescription = "")
   Text("Hello, world!")
}

Column(verticalArrangement = Arrangement.Center) {
   Image(Icons.Default.Public, contentDescription = "")
   Text("Hello, world!")
}
```

**Flutter** uses [`Row`][] and [`Column`][] as well but there are some slight differences for specifying child
widgets and alignment. The following is equivalent to the Compose example.

**Flutter** 也使用 [`Row`][] 与 [`Column`][]，但在指定子 widget 与对齐方面略有不同。以下与 Compose 示例等价：

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Icon(Icons.public),
    Text('Hello, world!'),
  ],
),

Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Icon(MaterialIcons.globe),
    Text('Hello, world!'),
  ],
)

```

`Row` and `Column` require a `List<Widget>` in the `children` parameter.
The `mainAxisAlignment` property tells Flutter how to position children
with extra space. `MainAxisAlignment.center` positions children in the
center of the main axis. For `Row`, the main axis is the horizontal
axis, inversely for `Column`, the main axis is the vertical axis.

`Row` 与 `Column` 的 `children` 参数需要 `List<Widget>`。`mainAxisAlignment` 告诉 Flutter 如何在额外空间中定位子项；`MainAxisAlignment.center` 将子项放在主轴中心。`Row` 的主轴为水平轴，`Column` 则为垂直轴。

::: note
Whereas Flutter's `Row` and `Column` have `MainAxisAlignment`
and `CrossAxisAlignment` to control how items are placed, the properties that
control placement in Jetpack Compose are one vertical and horizontal property
from the following: `verticalArrangement`, `verticalAlignment`,
`horizontalAlignment`, and `horizontalArrangement`. The trick to determine
which is the `MainAxis` is to look for the property that ends in `arrangement`.
The `CrossAxis` will be the property that ends in `alignment`.
:::

::: note
Flutter 的 `Row` 与 `Column` 用 `MainAxisAlignment` 与 `CrossAxisAlignment` 控制项的位置；Jetpack Compose 用以下垂直与水平属性之一：`verticalArrangement`、`verticalAlignment`、`horizontalAlignment`、`horizontalArrangement`。判断 `MainAxis` 的技巧是找以 `arrangement` 结尾的属性；`CrossAxis` 则以 `alignment` 结尾的属性为准。
:::

### Displaying a list view

### 显示列表视图

In **Compose**, you have a couple ways to create a list based on
the size of the list you need to display. For a small number of items
that can all be displayed at once, you can iterate over a collection
inside a `Column` or `Row`.

在 **Compose** 中，可根据列表规模用几种方式创建列表：少量可一次显示的项可在 `Column` 或 `Row` 内遍历集合。

For a list with a large number of items, `LazyList` has better
performance. It only lays out the components that will be visible
versus all of them.

大量项的列表用 `LazyList` 性能更好，仅布局可见组件而非全部。

```kotlin
data class Person(val name: String)

val people = arrayOf(
   Person(name = "Person 1"),
   Person(name = "Person 2"),
   Person(name = "Person 3")
)

@Composable
fun ListDemo(people: List<Person>) {
   Column {
      people.forEach {
         Text(it.name)
      }
   }
}

@Composable
fun ListDemo2(people: List<Person>) {
   LazyColumn {
      items(people) { person ->
         Text(person.name)
      }
   }
}
```

To lazily build a list in Flutter, ....

在 Flutter 中惰性构建列表……

```dart
class Person {
  String name;
  Person(this.name);
}

var items = [
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
          return ListTile(
            title: Text(items[index].name),
          );
        },
      ),
    );
  }
}
```

Flutter has some conventions for lists:

Flutter 列表有一些约定：

- The [`ListView`] widget has a builder method.
  This works like the `item` closure inside a Compose `LazyList`.

- [`ListView`] widget 有 builder 方法，类似 Compose `LazyList` 内的 `item` 闭包。

- The `itemCount` parameter of the `ListView` sets how many items
  the `ListView` displays.

- `ListView` 的 `itemCount` 参数设置显示项数。

- The `itemBuilder` has an index parameter that will be between zero
  and one less than itemCount.

- `itemBuilder` 的 index 参数介于 0 与 itemCount 减 1 之间。

The previous example returned a [`ListTile`][] widget for each item.
The `ListTile` widget includes properties like `height` and `font-size`.
These properties help build a list. However, Flutter allows you to return
almost any widget that represents your data.

上一示例为每项返回 [`ListTile`][] widget，其包含 `height`、`font-size` 等属性有助于构建列表；但 Flutter 允许返回几乎任何表示数据的 widget。

### Displaying a grid

### 显示网格

Constructing a grid in **Compose** is similar to a
LazyList (`LazyColumn` or `LazyRow`). You can use the
same `items` closure. There are properties on each
grid type to specify how to arrange the items,
whether or not to use adaptive or fixed layout,
amongst others.

在 **Compose** 中构建网格类似 LazyList（`LazyColumn` 或 `LazyRow`），可使用相同 `items` 闭包；各网格类型有属性指定项排列方式、自适应或固定布局等。


```kotlin
val widgets = arrayOf(
        "Row 1",
        Icons.Filled.ArrowDownward,
        Icons.Filled.ArrowUpward,
        "Row 2",
        Icons.Filled.ArrowDownward,
        Icons.Filled.ArrowUpward
    )

    LazyVerticalGrid (
        columns = GridCells.Fixed(3),
        contentPadding = PaddingValues(8.dp)
    ) {
        items(widgets) { i ->
            if (i is String) {
                Text(i)
            } else {
                Image(i as ImageVector, "")
            }
        }
    }
```

To display grids in **Flutter**, use the [`GridView`] widget.
This widget has various constructors. Each constructor has
a similar goal, but uses different input parameters.
The following example uses the `.builder()` initializer:

在 **Flutter** 中用 [`GridView`] widget 显示网格；该 widget 有多种构造函数，目标相似但参数不同。以下示例使用 `.builder()` 初始化：

```dart
const widgets = [
  Text('Row 1'),
  Icon(Icons.arrow_downward),
  Icon(Icons.arrow_upward),
  Text('Row 2'),
  Icon(Icons.arrow_downward),
  Icon(Icons.arrow_upward),
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

`SliverGridDelegateWithFixedCrossAxisCount` delegate 决定网格布局组件的多种参数，包括每行项数的 `crossAxisCount`。

Jetpack Compose's `LazyHorizontalGrid`, `LazyVerticalGrid`, and Flutter's `GridView` are somewhat
similar. `GridView` uses a delegate to decide how the grid
should lay out its components. The `rows`, `columns`, and other
associated properties on `LazyHorizontalGrid` \ `LazyVerticalGrid` serve the same purpose.

Jetpack Compose 的 `LazyHorizontalGrid`、`LazyVerticalGrid` 与 Flutter 的 `GridView` 有些相似。`GridView` 用 delegate 决定布局；`LazyHorizontalGrid`/`LazyVerticalGrid` 的 `rows`、`columns` 等属性作用相同。

### Creating a scroll view

### 创建滚动视图

`LazyColumn` and `LazyRow` in **Jetpack Compose** have built-in
support for scrolling.

**Jetpack Compose** 的 `LazyColumn` 与 `LazyRow` 内置滚动支持。

To create a scrolling view, **Flutter** uses [`SingleChildScrollView`][].
In the following example, the function `mockPerson` mocks instances
of the `Person` class to create the custom `PersonView` widget.

**Flutter** 用 [`SingleChildScrollView`][] 创建滚动视图。以下示例中 `mockPerson` 模拟 `Person` 实例以创建自定义 `PersonView` widget。

```dart
SingleChildScrollView(
  child: Column(
    children: mockPersons
        .map(
          (person) => PersonView(
            person: person,
          ),
        )
        .toList(),
  ),
),
```

### Responsive and adaptive design

### 响应式与自适应设计

Adaptive Design in **Compose** is a complex topic with many
viable solutions:

**Compose** 中的自适应设计是复杂主题，有多种可行方案：
* Using a custom layout

* 使用自定义布局
* Using `WindowSizeClass` alone

* 单独使用 `WindowSizeClass`
* Using `BoxWithConstraints` to control what is shown based on
available space

* 使用 `BoxWithConstraints` 根据可用空间控制显示内容
* Using the Material 3 adaptive library that uses `WindowSizeClass`
along with specialized composable layouts for common layouts

* 使用 Material 3 自适应库，结合 `WindowSizeClass` 与常见布局的专用 composable 布局

For that reason, you are encouraged to look into the **Flutter**
options directly and see what fits your requirements versus
attempting to find something that is a one to one translation.

因此建议你直接了解 **Flutter** 选项，看何者符合需求，而非强求一一对应翻译。

To create relative views in **Flutter**, you can use one of two options:

在 **Flutter** 中创建相对视图有两种方式：

- Get the `BoxConstraints` object in the [`LayoutBuilder`][] class.

- 在 [`LayoutBuilder`][] 类中获取 `BoxConstraints` 对象。
- Use the [`MediaQuery.of()`][] in your build functions
  to get the size and orientation of your current app.

- 在 build 函数中使用 [`MediaQuery.of()`][] 获取当前应用的尺寸与方向。

To learn more, check out [Creating responsive and adaptive apps][].

了解更多请参阅 [Creating responsive and adaptive apps][]（创建响应式与自适应应用）。

### Managing state

### 管理状态

**Compose** stores state with the `remember` API and descendants
of the `MutableState` interface.

**Compose** 用 `remember` API 与 `MutableState` 接口的后代存储状态。

```kotlin
Scaffold(
   content = { padding ->
      var _counter = remember {  mutableIntStateOf(0) }
      Column(horizontalAlignment = Alignment.CenterHorizontally,
         verticalArrangement = Arrangement.Center,
         modifier = Modifier.fillMaxSize().padding(padding)) {
            Text(_counter.value.toString())
            Spacer(modifier = Modifier.height(16.dp))
            FilledIconButton (onClick = { -> _counter.intValue += 1 }) {
               Text("+")
            }
      }
   }
)
```


**Flutter** manages local state using a [`StatefulWidget`][].
Implement a stateful widget with the following two classes:

**Flutter** 用 [`StatefulWidget`][] 管理本地状态，需以下两个类实现：

- a subclass of `StatefulWidget`

- `StatefulWidget` 的子类
- a subclass of `State`

- `State` 的子类

The `State` object stores the widget's state.
To change a widget's state, call `setState()` from the `State` subclass
to tell the framework to redraw the widget.

`State` 对象存储 widget 状态；要变更状态，在 `State` 子类中调用 `setState()` 通知框架重绘 widget。

The following example shows a part of a counter app:

以下示例展示计数器应用的一部分：

```dart
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

更多状态管理方式请参阅 [State management][]（状态管理）。


### Drawing on the Screen

### 在屏幕上绘制

In **Compose**, you use the `Canvas` composable to draw
shapes, images, and text to the screen.

在 **Compose** 中，用 `Canvas` composable 在屏幕上绘制形状、图像与文本。

**Flutter** has an API based on the `Canvas` class,
with two classes that help you draw:

**Flutter** 基于 `Canvas` 类提供 API，有两个类辅助绘制：

1. [`CustomPaint`][] that requires a painter:

    ```dart
    CustomPaint(
      painter: SignaturePainter(_points),
      size: Size.infinite,
    ),
    ```

2. [`CustomPainter`][] that implements your algorithm to draw to the canvas.

    ```dart
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

## Themes, styles, and media

## 主题、样式与媒体

You can style Flutter apps with little effort.
Styling includes switching between light and dark themes,
changing the design of your text and UI components,
and more. This section covers how to style your apps.

可轻松为 Flutter 应用设置样式，包括在浅色与深色主题间切换、更改文本与 UI 组件设计等。本节介绍如何设置样式。

### Using dark mode

### 使用深色模式

In **Compose**, you can control light and dark at any
arbitrary level by wrapping a component with
a `Theme` composable.

在 **Compose** 中，可用 `Theme` composable 包裹组件，在任意层级控制浅色与深色。

In **Flutter**, you can control light and dark mode at the app-level.
To control the brightness mode, use the `theme` property
of the `App` class:

在 **Flutter** 中，可在应用级控制浅色与深色模式，通过 `App` 类的 `theme` 属性控制亮度模式：

```dart
const MaterialApp(
  theme: ThemeData(
    brightness: Brightness.dark,
  ),
  home: HomePage(),
);
```

### Styling text

### 设置文本样式

In **Compose**, you use the properties on `Text` for one or two
attributes or construct a `TextStyle` object to set many at once.

在 **Compose** 中，用 `Text` 上的属性设置一两个属性，或构建 `TextStyle` 一次设置多个。

```kotlin
Text("Hello, world!", color = Color.Green,
        fontWeight = FontWeight.Bold, fontSize = 30.sp)
```
```kotlin
Text("Hello, world!",
   style = TextStyle(
      color = Color.Green,
      fontSize = 30.sp,
      fontWeight = FontWeight.Bold
   ),
)
```

To style text in **Flutter**, add a `TextStyle` widget as the value
of the `style` parameter of the `Text` widget.

在 **Flutter** 中，将 `TextStyle` 作为 `Text` widget 的 `style` 参数值以设置文本样式。

```dart
Text(
  'Hello, world!',
  style: TextStyle(
    fontSize: 30,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
),
```

### Styling buttons

### 设置按钮样式

In **Compose**, you modify the colors of a button using
the `colors` property. If left unmodified, they
use the defaults from the current theme.

在 **Compose** 中，用 `colors` 属性修改按钮颜色；未修改则使用当前主题默认色。

```kotlin
Button(onClick = {},
   colors = ButtonDefaults.buttonColors().copy(
      containerColor = Color.Yellow, contentColor = Color.Blue,
       )) {
    Text("Do something", fontSize = 30.sp, fontWeight = FontWeight.Bold)
}
```

To style button widgets in **Flutter**, you similarly
set the style of its child, or modify properties on the button itself.

在 **Flutter** 中，可类似地设置子项样式或修改按钮自身属性。

```dart
FilledButton(
  onPressed: (){},
  style: FilledButton.styleFrom(backgroundColor: Colors.amberAccent),
  child: const Text(
    'Do something',
    style: TextStyle(
      color: Colors.blue,
      fontSize: 30,
      fontWeight: FontWeight.bold,
    )
  )
)
```
## Bundling assets for use in Flutter

## 为 Flutter 打包资源

There is commonly a need to bundle resources for use in your application.
They can be animations, vector graphics, images, fonts, or other general files.

应用常需打包资源：动画、矢量图、图像、字体或其他文件。

Unlike native Android apps that expect a set directory structure under `/res/<qualifier>/`
where the qualifier could be indicating the type of file, a specific orientation,
or android version, Flutter doesn't require a specific location as long
as the referenced files are listed in the `pubspec.yaml` file. Below is an excerpt
from a `pubspec.yaml` referencing several images and a font file.

与原生 Android 在 `/res/<qualifier>/` 下要求特定目录结构不同，Flutter 只要资源列在 `pubspec.yaml` 中即可，无需固定位置。以下是引用若干图像与字体的 `pubspec.yaml` 摘录。

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
  fonts:
    - family: FiraSans
      fonts:
        - asset: fonts/FiraSans-Regular.ttf
```

### Using fonts

### 使用字体

In **Compose**, you have two options for using fonts in your app.
You can use a runtime service I to retrieve them [Google Fonts][].
Alternatively, they may be bundled in resource files.

在 **Compose** 中，使用字体有两种方式：通过运行时服务获取 [Google Fonts][]，或打包在资源文件中。

**Flutter** has similar methods to use fonts, let's discuss them both inline.

**Flutter** 有类似字体用法，下面一并说明。

### Using bundled fonts

### 使用打包字体

The following are roughly equivalent Compose and Flutter code for using a font file in the `/res/` or `fonts` directory
as listed above.

以下 Compose 与 Flutter 代码大致等价，用于使用上文所列 `/res/` 或 `fonts` 目录中的字体文件。

```kotlin
// Font files bundled with app
val firaSansFamily = FontFamily(
   Font(R.font.firasans_regular, FontWeight.Normal),
   // ...
)

// Usage
Text(text = "Compose", fontFamily = firaSansFamily, fontWeight = FontWeight.Normal)
```

```dart
Text(
  'Flutter',
  style: TextStyle(
    fontSize: 40,
    fontFamily: 'FiraSans',
  ),
),
```

### Using a font provider (Google Fonts)

### 使用字体提供方（Google Fonts）

One point of difference is using fonts from a font provider like Google Fonts. In **Compose**,
the instantiation is done inline with the same approximate code to reference a local file.

差异之一是从 Google Fonts 等提供方使用字体：在 **Compose** 中，实例化方式与引用本地文件大致相同。

After instantiating a provider that references the special strings for the font service,
you would use the same `FontFamily` declaration.

实例化引用字体服务特殊字符串的 provider 后，使用相同 `FontFamily` 声明。

```kotlin
// Font files bundled with app
val provider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs
)

val firaSansFamily = FontFamily(
    Font(
        googleFont = GoogleFont("FiraSans"),
        fontProvider = provider,
    )
)

// Usage
Text(text = "Compose", fontFamily = firaSansFamily, fontWeight = FontWeight.Light)
```

For Flutter, this is provided by the [google_fonts][] plugin using the name of
the font.

Flutter 由 [google_fonts][] 插件按字体名称提供。

```dart
import 'package:google_fonts/google_fonts.dart';
//...
Text(
  'Flutter',
  style: GoogleFonts.firaSans(),
  // or
  //style: GoogleFonts.getFont('FiraSans')
),
```

### Using images

### 使用图片

In **Compose**, typically image files to the drawable directory
in resources `/res/drawable` and one uses `Image` composable to display
the images. Assets are referenced by using the resource locator
in the style of `R.drawable.<file name>` without the file extension.

在 **Compose** 中，图像通常放在 `/res/drawable`，用 `Image` composable 显示，通过 `R.drawable.<文件名>`（无扩展名）引用。

In **Flutter**, the resource location is a listed in `pubspec.yaml` as shown in the snippet below.

在 **Flutter** 中，资源位置列在 `pubspec.yaml` 中，如下片段所示。

```yaml
    flutter:
      assets:
        - images/Blueberries.jpg
   ```

After adding your image, you can display it using the `Image` widget's
`.asset()` constructor. This constructor:

添加图像后，可用 `Image` widget 的 `.asset()` 构造函数显示。该构造函数：

To review a complete example, check out the [`Image`][] docs.

完整示例请参阅 [`Image`][] 文档。


[Flutter for Android developers]: /flutter-for/android-devs
[Add Flutter to existing app]: /add-to-app
[Material]: {{site.material}}/develop/flutter/
[Platform adaptations]: /platform-integration/platform-adaptations
[widget catalog]: /ui/widgets/layout
[Understanding constraints]: /ui/layout/constraints
[`WidgetApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
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
[Wonderous]: https://flutter.gskinner.com/wonderous/?utm_source=flutterdocs&utm_medium=docs
[video_player]: {{site.pub-pkg}}/video_player
[video_player example]: {{site.pub-pkg}}/video_player/example
[Creating responsive and adaptive apps]: /ui/adaptive-responsive
[`MediaQuery.of()`]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[`CustomPaint`]: {{site.api}}/flutter/widgets/CustomPaint-class.html
[`CustomPainter`]: {{site.api}}/flutter/rendering/CustomPainter-class.html
[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[go_router]: {{site.pub-pkg}}/go_router
[Google Fonts]: https://fonts.google.com/
[google_fonts]: https://pub.dev/packages/google_fonts
[`MaterialApp`]: https://api.flutter-io.cn/flutter/material/MaterialApp-class.html
