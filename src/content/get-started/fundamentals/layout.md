---
title: Layouts
title: 布局
description: Learn how to create layouts in Flutter.
description: 了解如何在 Flutter 中创建布局。
prev:
  title: Widgets
  title: Widget
  path: /get-started/fundamentals/widgets
next:
  title: State management
  title: 状态管理
  path: /get-started/fundamentals/state-management
---

Given that Flutter is a UI toolkit,
you'll spend a lot of time creating layouts
with Flutter widgets. In this section,
you'll learn how to build layouts with some of the
most common layout widgets.
You'll use Flutter DevTools (also
called Dart DevTools) to understand how
Flutter is creating your layout.
Finally, you'll encounter and debug one of
Flutter's most common layout errors,
the dreaded "unbounded constraints" error.

由于 Flutter 是一个 UI 工具包，
你将花费大量时间使用 Flutter widget 创建布局。
在本节中，你将学习如何使用一些最常用的布局 widget 来构建布局。
你将使用 Flutter DevTools（也称为 Dart DevTools）
来了解 Flutter 是如何创建布局的。
最后，你将遇到并调试 Flutter 中最常见的布局错误之一——
令人头疼的「无界约束」错误。

## Understanding layout in Flutter

## 理解 Flutter 中的布局

The core of Flutter's layout mechanism is widgets.
In Flutter, almost everything is a widget — even
layout models are widgets.
The images, icons, and text that you see in a
Flutter app are all widgets.
Things you don't see are also widgets,
such as the rows, columns, and grids that arrange,
constrain, and align the visible widgets.

Flutter 布局机制的核心是 widget。
在 Flutter 中，几乎一切都是 widget——甚至布局模型也是 widget。
你在 Flutter 应用中看到的图像、图标和文本都是 widget。
你看不到的东西也是 widget，
例如用于排列、约束和对齐可见 widget 的行、列和网格。

You create a layout by composing widgets to
build more complex widgets. For example,
the diagram below shows 3 icons with a label under
each one, and the corresponding widget tree:

你可以通过组合 widget 来构建更复杂的 widget，从而创建布局。
例如，下图展示了 3 个图标，每个图标下方都有一个标签，
以及对应的 widget 树：

<img src='/assets/images/docs/fwe/layout/simple_row_column_widget_tree.png' alt="A diagram that shows widget composition with a series of lines and nodes.">

In this example, there's a row of 3 columns where
each column contains an icon and a label.
All layouts, no matter how complex,
are created by composing these layout widgets.

在这个例子中，有一行 3 列，每列包含一个图标和一个标签。
所有布局，无论多么复杂，都是通过组合这些布局 widget 来创建的。

### Constraints

### 约束

Understanding constraints in Flutter is an
important part of understanding
how layout works in Flutter.

理解 Flutter 中的约束是理解 Flutter 布局工作原理的重要部分。

Layout, in a general sense, refers to the size of
the widgets and their positions on the screen.
The size and position of any given widget is
constrained by its parent;
it can't have any size it wants,
and it doesn't decide its own place on the screen.
Instead, size and position are determined by
a conversation between a widget and its parent.

从一般意义上讲，布局是指 widget 的大小及其在屏幕上的位置。
任何给定 widget 的大小和位置都受其父级约束；
它不能拥有任何它想要的大小，
也不能自己决定在屏幕上的位置。
相反，大小和位置是由 widget 与其父级之间的「对话」决定的。

In the simplest example,
the layout conversation looks like this:

在最简单的例子中，布局对话看起来像这样：

 1. A widget receives its constraints from its parent.

    widget 从其父级接收约束。

 2. A constraint is just a set of 4 doubles:
    a minimum and maximum width,
    and a minimum and maximum height.

    约束只是 4 个 double 值的集合：
    最小和最大宽度，以及最小和最大高度。

 3. The widget determines what size it should be
    within those constraints, and passes its
    width and height back to the parent.

    widget 在这些约束范围内确定自己应该是什么大小，
    并将其宽度和高度传回给父级。

 4. The parent looks at the size it wants to be and
    how it should be aligned,
    and sets the widget's position accordingly.
    Alignment can be set explicitly,
    using a variety of widgets like `Center`,
    and the alignment properties on `Row` and `Column`.

    父级查看它想要的大小以及应该如何对齐，
    并相应地设置 widget 的位置。
    可以使用各种 widget（如 `Center`）
    以及 `Row` 和 `Column` 上的对齐属性来显式设置对齐方式。

In Flutter, this layout conversation is often
expressed with the simplified phrase,
"Constraints go down. Sizes go up.
Parent sets the position."

在 Flutter 中，这种布局对话通常用简化的短语表示：
「约束向下传递。尺寸向上传递。父级设置位置。」

### Box types

### 盒子类型

In Flutter, widgets are rendered by their
underlying [`RenderBox`][] objects.
These objects determine how to handle the
constraints they're passed.

在 Flutter 中，widget 由其底层的 [`RenderBox`][] 对象渲染。
这些对象决定如何处理传递给它们的约束。

Generally, there are three kinds of boxes:

一般来说，有三种类型的盒子：

* Those that try to be as big as possible.
For example, the boxes used by
[`Center`][] and [`ListView`][].

* 尽可能大的盒子。
例如，[`Center`][] 和 [`ListView`][] 使用的盒子。

* Those that try to be the same size as their
children. For example, the boxes used by
[`Transform`][] and [`Opacity`][]

* 尝试与其子级大小相同的盒子。
例如，[`Transform`][] 和 [`Opacity`][] 使用的盒子。

* Those that try to be a particular size.
For example, the boxes used by
[`Image`][] and [`Text`][].

* 尝试成为特定大小的盒子。
例如，[`Image`][] 和 [`Text`][] 使用的盒子。

Some widgets, for example [`Container`][],
vary from type to type based on their
constructor arguments.
The `Container` constructor defaults to trying to
be as big as possible, but if you give it a width,
for instance, it tries to honor that and
be that particular size.

某些 widget，例如 [`Container`][]，
会根据其构造函数参数改变类型。
`Container` 构造函数默认尝试尽可能大，
但如果你给它一个宽度，它就会尝试遵守并成为那个特定大小。

Others, for example [`Row`][] and [`Column`][] (flex boxes)
vary based on the constraints they are given.
Read more about flex boxes and constraints in
the [Understanding Constraints article][].

其他的，例如 [`Row`][] 和 [`Column`][]（flex 盒子），
会根据给定的约束而变化。
在[理解约束][Understanding Constraints article]文章中阅读更多关于
flex 盒子和约束的内容。

## Lay out a single widget

## 布局单个 widget

To lay out a single widget in Flutter,
wrap a visible widget,
such as `Text` or `Image` with a widget that
can change its position on a screen,
such as a `Center` widget.

要在 Flutter 中布局单个 widget，
请用可以改变其在屏幕上位置的 widget（如 `Center` widget）
包裹一个可见的 widget（如 `Text` 或 `Image`）。

:::note Note
<!-- Note -->

:::note 注意

The examples on the page use a widget called
`BorderedImage`. This is a custom widget,
and is used here to hide
the code that isn't relevant to this topic.

本页的示例使用了一个名为 `BorderedImage` 的 widget。
这是一个自定义 widget，
在这里使用它是为了隐藏与本主题无关的代码。

:::

```dart
Widget build(BuildContext context) {
  return Center(
    child: BorderedImage(),
  );
}
```

The following figure shows a widget that isn't
aligned on the left,
and a widget that has been centered on the right.

下图显示了左侧未对齐的 widget 和右侧已居中的 widget。

<img src='/assets/images/docs/fwe/layout/center.png' alt="A screenshot of a centered widget and a screenshot of a widget that hasn't been centered.">

All layout widgets have either of the following:

所有布局 widget 都具有以下属性之一：

* A `child` property if they take a single
child—for example, `Center`, `Container`,
or `Padding`.

* 如果它们接受单个子级，则具有 `child` 属性——
例如 `Center`、`Container` 或 `Padding`。

* A `children` property if they take a list
of widgets—for example,
`Row`, `Column`, `ListView`, or `Stack`.

* 如果它们接受 widget 列表，则具有 `children` 属性——
例如 `Row`、`Column`、`ListView` 或 `Stack`。

### Container

`Container` is a convenience widget that's
made up of several widgets responsible for layout,
painting, positioning, and sizing.
In regard to layout,
it can be used to add padding and
margins to a widget.
There is also a `Padding` widget
that could be used here to the same effect.
The following example uses a `Container`.

`Container` 是一个便捷的 widget，
由多个负责布局、绘制、定位和大小调整的 widget 组成。
在布局方面，它可用于向 widget 添加内边距和外边距。
也可以使用 `Padding` widget 来达到相同的效果。
以下示例使用了 `Container`。

```dart
Widget build(BuildContext context) {
  return Container(
    padding: EdgeInsets.all(16.0),
    child: BorderedImage(),
  );
}
```

The following figure shows a widget without
padding on the left,
and a widget with padding on the right.

下图显示了左侧没有内边距的 widget 和右侧有内边距的 widget。

<img src='/assets/images/docs/fwe/layout/padding.png' alt="A screenshot of a widget with padding and a screenshot of a widget without padding.">

To create more complex layouts in Flutter,
you can compose many widgets.
For example, you can combine `Container` and `Center`:

要在 Flutter 中创建更复杂的布局，你可以组合多个 widget。
例如，你可以组合 `Container` 和 `Center`：

```dart
Widget build(BuildContext context) {
  return Center(
    Container(
      padding: EdgeInsets.all(16.0),
      child: BorderedImage(),
    ),
  );
}
```

## Layout multiple widgets vertically or horizontally

## 垂直或水平布局多个 widget

One of the most common layout patterns is to
arrange widgets vertically or horizontally.
You can use a `Row` widget to arrange widgets
horizontally,
and a `Column` widget to arrange widgets vertically.
The first figure on this page used both.

最常见的布局模式之一是垂直或水平排列 widget。
你可以使用 `Row` widget 水平排列 widget，
使用 `Column` widget 垂直排列 widget。
本页的第一个图就同时使用了这两者。

This is the most basic example of using a `Row` widget.

这是使用 `Row` widget 的最基本示例。

{% render "docs/code-and-image.md",
image:"fwe/layout/row.png",
caption: "This figure shows a row widget with three children."
alt: "A screenshot of a row widget with three children"
code:"
```dart
Widget build(BuildContext context) {
  return Row(
    children: [
      BorderedImage(),
      BorderedImage(),
      BorderedImage(),
    ],
  );
}
```
" %}

Each child of `Row` or `Column` can be
rows and columns themselves,
combining to make a complex layout.
For example, you could add labels to each
of the images in the example above using columns.

`Row` 或 `Column` 的每个子级本身也可以是行和列，
组合起来形成复杂的布局。
例如，你可以使用列为上面示例中的每个图像添加标签。


{% render "docs/code-and-image.md",
image:"fwe/layout/nested_row_column.png",
caption: "This figure shows a row widget with three children, each of which is a column."
alt: "A screenshot of a row of three widgets, each of which has a label underneath it."
code:"
```dart
Widget build(BuildContext context) {
  return Row(
    children: [
      Column(
        children: [
          BorderedImage(),
          Text('Dash 1'),
        ],
      ),
      Column(
        children: [
          BorderedImage(),
          Text('Dash 2'),
        ],
      ),
      Column(
        children: [
          BorderedImage(),
          Text('Dash 3'),
        ],
      ),
    ],
  );
}
```
" %}


### Align widgets within rows and columns

### 在行和列中对齐 widget

In the following example,
the widgets are each 200 pixels wide,
and the viewport is 700 pixels wide.
The widgets are consequently aligned to the left,
one after the other,
with all the extra space on the right.

在下面的示例中，每个 widget 宽 200 像素，视口宽 700 像素。
因此，widget 会依次向左对齐，所有额外的空间都在右侧。

<img src='/assets/images/docs/fwe/layout/left_alignment.png' alt="A diagram that shows three widgets laid out in a row. Each child widget is labeled as 200px wide, and the blank space on the right is labeled as 100px wide.">

You control how a row or column aligns its
children using the `mainAxisAlignment` and
`crossAxisAlignment` properties.
For a row, the main axis runs horizontally and
the cross axis runs vertically. For a column,
the main axis runs
vertically and the cross axis runs horizontally.

你可以使用 `mainAxisAlignment` 和 `crossAxisAlignment` 属性
来控制行或列如何对齐其子级。
对于行，主轴水平运行，交叉轴垂直运行。
对于列，主轴垂直运行，交叉轴水平运行。

<img src='/assets/images/docs/fwe/layout/axes_diagram.png' alt="A diagram that shows the direction of the main axis and cross axis in both rows and columns">

Setting the main axis alignment to `spaceEvenly`
divides the free horizontal space evenly between,
before, and after each image.

将主轴对齐设置为 `spaceEvenly` 会将可用的水平空间
均匀分配到每个图像之间、之前和之后。

{% render "docs/code-and-image.md",
image:"fwe/layout/space_evenly.png",
caption: "This figure shows a row widget with three children, which are aligned with the MainAxisAlignment.spaceEvenly constant."
alt: "A screenshot of three widgets, spaced evenly from each other."
code:"
```dart
Widget build(BuildContext context) {
  return Row(
    [!mainAxisAlignment: MainAxisAlignment.spaceEvenly!],
    children: [
      BorderedImage(),
      BorderedImage(),
      BorderedImage(),
    ],
  );
}
```
" %}

Columns work the same way as rows.
The following example shows a column of 3 images,
each is 100 pixels high. The height of the
render box (in this case, the entire screen)
is more than 300 pixels,
so setting the main axis alignment to `spaceEvenly`
divides the free vertical space evenly between,
above, and below each image.

列的工作方式与行相同。
下面的示例显示了一列 3 个图像，每个图像高 100 像素。
渲染框的高度（在本例中为整个屏幕）超过 300 像素，
因此将主轴对齐设置为 `spaceEvenly` 会将可用的垂直空间
均匀分配到每个图像之间、之上和之下。

<img src='/assets/images/docs/fwe/layout/col_space_evenly.png' alt="A screenshot of a three widgets laid out vertically, using a column widget.">

The [`MainAxisAlignment`][] and [`CrossAxisAlignment`][]
enums offer a variety of constants for
controlling alignment.

[`MainAxisAlignment`][] 和 [`CrossAxisAlignment`][]
枚举提供了各种用于控制对齐的常量。

Flutter includes other widgets that can be used
for alignment, notably the `Align` widget.

Flutter 还包括其他可用于对齐的 widget，特别是 `Align` widget。

### Sizing widgets within rows and columns

### 在行和列中调整 widget 大小

When a layout is too large to fit a device,
a yellow and black striped pattern appears
along the affected edge.
In this example, the viewport is 400 pixels wide,
and each child is 150 pixels wide.

当布局太大而无法适应设备时，
受影响的边缘会出现黄黑条纹图案。
在此示例中，视口宽 400 像素，每个子级宽 150 像素。

<img src='/assets/images/docs/fwe/layout/overflowing_row.png' alt="A screenshot of a row of widgets that are wider than their viewport.">

Widgets can be sized to fit within a
row or column by using the `Expanded` widget.
To fix the previous example where the row of
images is too wide for its render box,
wrap each image with an [`Expanded`][] widget.

可以使用 `Expanded` widget 调整 widget 的大小以适应行或列。
要修复前面示例中图像行对于其渲染框来说太宽的问题，
请用 [`Expanded`][] widget 包裹每个图像。

{% render "docs/code-and-image.md",
image:"fwe/layout/expanded_row.png",
caption: "This figure shows a row widget with three children that are wrapped with `Expanded` widgets."
alt: "A screenshot of three widgets, which take up exactly the amount of space available on the main axis. All three widgets are equal width."
code:"
```dart
Widget build(BuildContext context) {
  return const Row(
    children: [
      [!Expanded!](
        child: BorderedImage(width: 150, height: 150),
      ),
      [!Expanded!](
        child: BorderedImage(width: 150, height: 150),
      ),
      [!Expanded!](
        child: BorderedImage(width: 150, height: 150),
      ),
    ],
  );
}
```
" %}

The `Expanded` widget can also dictate how much
space a widget should take up relative
to its siblings. For example,
perhaps you want a widget to occupy twice
as much space as its siblings.
For this, use the `Expanded` widgets `flex` property,
an integer that determines the flex factor
for a widget. The default flex factor is 1.
The following code sets the flex factor of the
middle image to 2:

`Expanded` widget 还可以指定一个 widget 相对于其兄弟 widget
应该占用多少空间。例如，也许你希望一个 widget
占用其兄弟 widget 两倍的空间。
为此，请使用 `Expanded` widget 的 `flex` 属性，
这是一个确定 widget 弹性因子的整数。默认弹性因子为 1。
以下代码将中间图像的弹性因子设置为 2：

{% render "docs/code-and-image.md",
image:"fwe/layout/flex_2_row.png",
caption: "This figure shows a row widget with three children which are wrapped with `Expanded` widgets. The center child has it's `flex` property set to 2."
alt: "A screenshot of three widgets, which take up exactly the amount of space available on the main axis. The widget in the center is twice as wide as the widgets on the left and right."
code:"
```dart
Widget build(BuildContext context) {
  return const Row(
    children: [
      Expanded(
        child: BorderedImage(width: 150, height: 150),
      ),
      Expanded(
        [!flex: 2!],
        child: BorderedImage(width: 150, height: 150),
      ),
      Expanded(
        child: BorderedImage(width: 150, height: 150),
      ),
    ],
  );
}
```
" %}

## DevTools and debugging layout

## DevTools 和调试布局

In certain situations,
a box's constraint is unbounded, or infinite.
This means that either the maximum width or the
maximum height is set to [`double.infinity`][].
A box that tries to be as big as possible won't
function usefully when given an
unbounded constraint and, in debug mode,
throws an exception.

在某些情况下，盒子的约束是无界的或无限的。
这意味着最大宽度或最大高度被设置为 [`double.infinity`][]。
当给定无界约束时，尝试尽可能大的盒子将无法正常工作，
并且在调试模式下会抛出异常。

The most common case where a render box ends up
with an unbounded constraint is within a
flex box ([`Row`][] or [`Column`][]),
and within a scrollable region
(such as [`ListView`][] and other [`ScrollView`][] subclasses).
`ListView`, for example, tries to expand to
fit the space available in its cross-direction
(perhaps it's a vertically-scrolling
block and tries to be as wide as its parent).
If you nest a vertically scrolling `ListView`
inside a horizontally scrolling `ListView`,
the inner list tries to be as wide as possible,
which is infinitely wide, since the outer one is
scrollable in that direction.

渲染框最终获得无界约束的最常见情况是在
flex 盒子（[`Row`][] 或 [`Column`][]）中，
以及在可滚动区域
（如 [`ListView`][] 和其他 [`ScrollView`][] 子类）中。
例如，`ListView` 会尝试扩展以适应其交叉方向上的可用空间
（也许它是一个垂直滚动的块，并尝试与其父级一样宽）。
如果你将一个垂直滚动的 `ListView`
嵌套在一个水平滚动的 `ListView` 中，
内部列表会尝试尽可能宽，
即无限宽，因为外部列表在该方向上是可滚动的。

Perhaps the most common error you'll run into
while building a Flutter application is due to
incorrectly using layout widgets,
and is referred to as the "unbounded constraints"
error.

也许你在构建 Flutter 应用时遇到的最常见错误
是由于错误使用布局 widget 造成的，
这被称为「无界约束」错误。

If there was only one type error you should be
prepared to confront when you first start building
Flutter apps, it would be this one.

如果你刚开始构建 Flutter 应用时只需要准备应对一种类型的错误，
那就是这个错误。

<YouTubeEmbed id="jckqXR5CrPI" title="Decoding Flutter: Unbounded height and width"></YouTubeEmbed>

:::note The Widget inspector
<!-- The Widget inspector -->

:::note Widget 检查器

Flutter has a robust suite of DevTools that
help you work with any number of aspects of
Flutter development.
The "Widget Inspector" tool is particularly
useful when building and debugging layouts (and working with widgets in general).

Flutter 拥有一套强大的 DevTools，
可以帮助你处理 Flutter 开发的各个方面。
「Widget 检查器」工具在构建和调试布局
（以及一般情况下使用 widget）时特别有用。

[Learn more about the Flutter inspector][].

[了解更多关于 Flutter 检查器的信息][Learn more about the Flutter inspector]。

:::

##  Scrolling widgets

## 滚动 widget

Flutter has many built-in widgets that
automatically scroll and also offers a variety of
widgets that you can customize to
create specific scrolling behavior.
On this page, you'll see how to use the most common widget for
making any page scrollable,
as well as a widget for creating scrollable lists.

Flutter 有许多内置的 widget 可以自动滚动，
还提供了各种可以自定义的 widget 来创建特定的滚动行为。
在本页中，你将看到如何使用最常见的 widget
使任何页面可滚动，以及用于创建可滚动列表的 widget。

### ListView

`ListView` is a column-like widget that
automatically provides scrolling when its
content is longer than its render box.
The most basic way to use a `ListView` is
very similar to using a `Column` or `Row`.
Unlike a column or row,
a `ListView` requires its children to take up
all the available space on the cross axis,
as shown in the example below.

`ListView` 是一个类似列的 widget，
当其内容长于其渲染框时会自动提供滚动。
使用 `ListView` 的最基本方式与使用 `Column` 或 `Row` 非常相似。
与列或行不同，`ListView` 要求其子级占用交叉轴上的所有可用空间，
如下面的示例所示。

{% render "docs/code-and-image.md",
image:"fwe/layout/basic_listview.png",
caption: "This figure shows a ListView widget with three children."
alt: "A screenshot of three widgets laid out vertically. They have expanded to take up all available space on the cross axis."
code:"
```dart
Widget build(BuildContext context) {
  return [!ListView!](
    children: const [
      BorderedImage(),
      BorderedImage(),
      BorderedImage(),
    ],
  );
}
```
" %}

`ListView`s are commonly used when you have an
unknown or very large (or infinite) number of list items.
When this is the case,
it's best to use the `ListView.builder` constructor.
The builder constructor only builds the
children that are currently visible on screen.

当你有未知数量或非常大（或无限）数量的列表项时，
通常会使用 `ListView`。
在这种情况下，最好使用 `ListView.builder` 构造函数。
builder 构造函数只构建当前在屏幕上可见的子级。

In the following example,
the `ListView` is displaying a list of to-do items.
The todo items are being fetched from a repository,
and therefore the number of todos is unknown.

在下面的示例中，`ListView` 显示了一个待办事项列表。
待办事项是从存储库中获取的，因此待办事项的数量是未知的。


{% render "docs/code-and-image.md",
image:"fwe/layout/listview_builder.png",
caption: "This figure shows the ListView.builder constructor to display an unknown number of children."
alt: "A screenshot of several widgets laid out vertically. They have expanded to take up all available space on the cross axis."
code:"
```dart
final List<ToDo> items = Repository.fetchTodos();

Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, idx) {
      var item = items[idx];
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(item.description),
            Text(item.isComplete),
          ],
        ),
      );
    },
  );
}
```
" %}

## Adaptive layouts

## 自适应布局

Because Flutter is used to create mobile,
tablet, desktop, _and_ web apps,
it's likely you'll need to adjust your
application to behave differently depending on
things like screen size or input device.
This is referred to as making an app
_adaptive_ and _responsive_.

由于 Flutter 用于创建移动端、平板电脑、桌面端*和* Web 应用，
你可能需要根据屏幕大小或输入设备等因素
调整应用的行为。
这被称为使应用具有*自适应性*和*响应性*。

One of the most useful widgets in making
adaptive layouts is the [`LayoutBuilder`][] widget.
`LayoutBuilder` is one of many widgets that uses
the "builder" pattern in Flutter.

在创建自适应布局时，最有用的 widget 之一是 [`LayoutBuilder`][] widget。
`LayoutBuilder` 是 Flutter 中使用「构建器」模式的众多 widget 之一。

### The builder pattern

### 构建器模式

In Flutter, you'll find several widgets that use
the word "builder" in their names or
in their constructors.
The following list isn't exhaustive:

在 Flutter 中，你会发现有几个 widget
在其名称或构造函数中使用了「builder」一词。
以下列表并不详尽：

* [`ListView.builder`][]
* [`GridView.builder`][]
* [`Builder`][]
* [`LayoutBuilder`][]
* [`FutureBuilder`][]

These different "builders" are useful for solving
different problems. For example,
the `ListView.builder` constructor is primarily used
to lazily render items in a list,
while the `Builder` widget is useful for gaining
access to the `BuildContext` in deeply widget code.

这些不同的「构建器」用于解决不同的问题。
例如，`ListView.builder` 构造函数主要用于
延迟渲染列表中的项目，
而 `Builder` widget 则用于在深层 widget 代码中
获取对 `BuildContext` 的访问。

Despite their different use cases,
these builders are unified by how they work.
Builder widgets and builder constructors all have
arguments called 'builder'
(or something similar,
like `itemBuilder` in the case of `ListView.builder`),
and the builder argument always accepts a
callback.
This callback is a __builder function__.
Builder functions are callbacks that pass data to
the parent widget,
and the parent widget uses those arguments to
build and return the child widget.
Builder functions always pass in at least
one argument–the build context–
and generally at least one other argument.

尽管它们的用例不同，这些构建器的工作方式是统一的。
构建器 widget 和构建器构造函数都有名为「builder」的参数
（或类似的名称，如 `ListView.builder` 中的 `itemBuilder`），
并且 builder 参数始终接受一个回调。
这个回调是一个**构建器函数**。
构建器函数是将数据传递给父 widget 的回调，
父 widget 使用这些参数来构建和返回子 widget。
构建器函数始终至少传入一个参数——构建上下文——
并且通常至少还有一个其他参数。

For example, the `LayoutBuilder` widget is used
to create responsive layouts based
on the size of the viewport. The builder callback
body is passed the [`BoxConstraints`][] that it receives
from its parent, along with the widgets 'BuildContext'.
With these constraints, you can return a different
widget based on the available space.

例如，`LayoutBuilder` widget 用于根据视口大小创建响应式布局。
构建器回调体会接收从其父级传递的 [`BoxConstraints`][]，
以及 widget 的「BuildContext」。
通过这些约束，你可以根据可用空间返回不同的 widget。

<YouTubeEmbed id="IYDVcriKjsw" title="LayoutBuilder (Flutter Widget of the Week)"></YouTubeEmbed>

In the following example,
the widget returned by the `LayoutBuilder`
changes based on whether the viewport is
less than or equal 600 pixels,
or greater than 600 pixels.

在下面的示例中，`LayoutBuilder` 返回的 widget
会根据视口是小于等于 600 像素还是大于 600 像素而改变。


{% render "docs/code-and-image.md",
image:"fwe/layout/layout_builder.png",
caption: "This figure shows a narrow layout, which lays out its children vertically, and a wider layout, which lays out its children in a grid."
alt: "Two screenshots, in which one shows a narrow layout and the other shows a wide layout."
code:"
```dart
Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (BuildContext context, BoxConstraints constraints) {
      [!if (constraints.maxWidth <= 600)!] {
        return _MobileLayout();
      } else {
        return _DesktopLayout();
      }
    },
  );
}
```
" %}

Meanwhile, the `itemBuilder` callback on the
`ListView.builder` constructor is passed the
build context and an `int`.
This callback is called once for every item
in the list,
and the int argument represents the index of the list item.
The first time the itemBuilder callback is called
when Flutter is building the UI,
the int passed to the function is 0,
the second time it's 1, and so on.

同时，`ListView.builder` 构造函数上的 `itemBuilder` 回调
会接收构建上下文和一个 `int`。
对于列表中的每个项目，这个回调都会被调用一次，
int 参数表示列表项的索引。
当 Flutter 构建 UI 时，第一次调用 itemBuilder 回调时，
传递给函数的 int 是 0，第二次是 1，依此类推。

This allows you to provide specific configuration
based on the index. Recall the example above using
the`ListView.builder` constructor:

这允许你根据索引提供特定的配置。
回忆一下上面使用 `ListView.builder` 构造函数的示例：

```dart
final List<ToDo> items = Repository.fetchTodos();

Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, idx) {
      var item = items[idx];
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(item.description),
            Text(item.isComplete),
          ],
        ),
      );
    },
  );
}
```

This example code uses the index that's
passed into the builder to grab the correct
todo from the list of items,
and then displays that todo's data in
the widget that is returned from the builder.

此示例代码使用传递到构建器中的索引
从项目列表中获取正确的待办事项，
然后在从构建器返回的 widget 中显示该待办事项的数据。

To exemplify this,
the following example changes the
background color of every other list item.

为了说明这一点，以下示例更改了每隔一个列表项的背景颜色。

{% render "docs/code-and-image.md",
image:"fwe/layout/alternating_list_items.png"
caption:"This figure shows a `ListView`, in which its children have alternating background colors. The background colors were determined programmatically based on the index of the child within the `ListView`."
code:"
```dart
final List<ToDo> items = Repository.fetchTodos();

Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, idx) {
      var item = items[idx];
      return Container(
        [!color: idx % 2 == 0 ? Colors.lightBlue : Colors.transparent!],
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(item.description),
            Text(item.isComplete),
          ],
        ),
      );
    },
  );
}
```
" %}

## Additional resources

## 其他资源

* Common layout widgets and concepts

  常见布局 widget 和概念

  * Video: [OverlayPortal—Flutter Widget of the Week][]
  * Video: [Stack—Flutter Widget of the Week][]
  * Tutorial: [Layouts in Flutter][]
  * Documentation: [Stack documentation][]

* Sizing and positioning widgets

  调整大小和定位 widget

  * Video: [Expanded—Flutter Widget of the Week][]
  * Video: [Flexible—Flutter Widget of the Week][]
  * Video: [Intrinsic widgets—Decoding Flutter][]

* Scrollable widgets

  可滚动 widget

  * Example code: [Work with long lists][]
  * Example code: [Create a horizontal list][]
  * Example code: [Create a grid list][]
  * Video: [ListView—Flutter Widget of the Week][]

* Adaptive Apps

  自适应应用

  * Tutorial: [Adaptive Apps codelab][]
  * Video: [MediaQuery—Flutter Widget of the Week][]
  * Video: [Building platform adaptive apps][]
  * Video: [Builder—Flutter Widget of the Week][]

### API reference

### API 参考

The following resources explain individual APIs.

以下资源解释了各个 API。

* [`Builder`][]
* [`Row`][]
* [`Column`][]
* [`Expanded`][]
* [`Flexible`][]
* [`ListView`][]
* [`Stack`][]
* [`Positioned`][]
* [`MediaQuery`][]
* [`LayoutBuilder`][]

[Layouts in Flutter]: /ui/layout
[Understanding constraints article]: /ui/layout/constraints
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[Expanded—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=_rnZaagadyo
[Flexible—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=CI7x0mAZiY0
[Intrinsic widgets—Decoding Flutter]: {{site.youtube-site}}/watch?v=Si5XJ_IocEs
[Build a Flutter Layout]: /ui/layout/tutorial
[Basic scrolling]: /ui/layout/scrolling#basic-scrolling
[Builder—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=xXNOkIuSYuA
[ListView—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=KJpkjHGiI5A
[Work with long lists]: /cookbook/lists/long-lists
[Create a horizontal list]: /cookbook/lists/horizontal-list
[Create a grid list]: /cookbook/lists/grid-lists
[PageView—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=J1gE9xvph-A
[Stack—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=liEGSeD3Zt8
[Stack documentation]: /ui/layout#stack
[OverlayPortal—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=S0Ylpa44OAQ
[LayoutBuilder—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=IYDVcriKjsw
[MediaQuery—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=A3WrA4zAaPw
[Adaptive apps codelab]: {{site.codelabs}}/codelabs/flutter-adaptive-app
[Building platform adaptive apps]: {{site.youtube-site}}/watch?v=RCdeSKVt7LI
[Learn more about the Flutter inspector]: /tools/devtools/inspector
[Unbounded height and width—Decoding Flutter]: {{site.youtube-site}}/watch?v=jckqXR5CrPI
[2D Scrolling]: {{site.youtube-site}}/watch?v=ppEdTo-VGcg
[`Builder`]: {{site.api}}/flutter/widgets/Builder-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`Flexible`]: {{site.api}}/flutter/widgets/Flexible-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`Positioned`]: {{site.api}}/flutter/widgets/Positioned-class.html
[`MediaQuery`]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[`Transform`]:{{site.api}}/flutter/widgets/Transform-class.html
[`Opacity`]:{{site.api}}/flutter/widgets/Opacity-class.html
[`Center`]:{{site.api}}/flutter/widgets/Center-class.html
[`ListView`]:{{site.api}}/flutter/widgets/Listview-class.html
[`Image`]:{{site.api}}/flutter/widgets/Image-class.html
[`Text`]:{{site.api}}/flutter/widgets/Text-class.html
[`MainAxisAlignment`]: {{site.api}}/flutter/rendering/MainAxisAlignment.html
[`CrossAxisAlignment`]: {{site.api}}/flutter/rendering/CrossAxisAlignment.html
[`double.infinity`]:{{site.api}}/flutter/dart-core/double/infinity-constant.html
[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`GridView.builder`]: {{site.api}}/flutter/widgets/GridView/GridView.builder.html
[`Builder`]: {{site.api}}/flutter/widgets/Builder-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/Scrollview-class.html
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`BoxConstraints`]:{{site.api}}/flutter/rendering/BoxConstraints-class.html
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[`Container`]:{{site.api}}/flutter/widgets/Container-class.html
[`Column`]:{{site.api}}/flutter/widgets/Column-class.html
[`Row`]:{{site.api}}/flutter/widgets/Row-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

由于网站的这一部分仍在不断完善中，
我们[欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="layout"
