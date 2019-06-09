---
title: Layouts in Flutter
title: Flutter 中的布局
short-title: Layout
short-title: 布局
description: Learn how Flutter's layout mechanism works and how to build a layout.
description: 了解 Flutter 的布局机制和如何构建布局。
diff2html: true
---

{% assign api = site.api | append: '/flutter' -%}
{% capture code -%} {{site.repo.this}}/tree/{{site.branch}}/src/_includes/code {%- endcapture -%}
{% capture examples -%} {{site.repo.this}}/tree/{{site.branch}}/examples {%- endcapture -%}
{% assign rawExFile = 'https://raw.githubusercontent.com/flutter/website/master/examples' -%}
{% capture demo -%} {{site.repo.flutter}}/tree/{{site.branch}}/examples/flutter_gallery/lib/demo {%- endcapture -%}

<style>dl, dd { margin-bottom: 0; }</style>

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>
  
  关键点是什么？

  * Widgets are classes used to build UIs.
  * 组件是用来创建 UI 的类
  * Widgets are used for both layout and UI elements.
  * 组件组件是用在布局和 UI 元素上的
  * Compose simple widgets to build complex widgets.
  * 组合简单的组件可以创建复杂的组件
{{site.alert.end}}

The core of Flutter's layout mechanism is widgets. In Flutter, almost
everything is a widget&mdash;even layout models are widgets.
The images, icons, and text that you see in a Flutter app  are all widgets.
But things you don't see are also widgets, such as the rows, columns,
and grids that arrange, constrain, and align the visible widgets.

Flutter 布局机制的核心是组件。在 Flutter 中，几乎所有的都是组件；甚至布局模型也是组件。在 Flutter 应用中使用的图片，图标和文本都是组件。有一些在界面上看不见的也是组件，比如排列在可见组件周围的行，列和网格。

You create a layout by composing widgets to build more complex widgets.
For example, the first screenshot below shows 3 icons with a label under each one:

你可以通过组合多个组件来创建复杂组件进行布局。例如，下面的第一个截图展示了3个图标，每个图标下面有一个标签：

<div class="row mb-4">
  <div class="col-12 text-center">
    {% asset ui/layout/lakes-icons.png class="border mt-1 mb-1 mw-100" alt="Sample layout" %}
    {% asset ui/layout/lakes-icons-visual.png class="border mt-1 mb-1 mw-100" alt="Sample layout with visual debugging" %}
  </div>
</div>

The second screenshot displays the visual layout, showing a row of
3 columns where each column contains an icon and a label.

第二个截图展示了一个可见的布局，有1行，3列，每一列中含有一个图标和一个标签。

{{site.alert.note}}
  Most of the screenshots in this tutorial are displayed with
  `debugPaintSizeEnabled` set to true so you can see the visual layout.
  For more information, see
  [Visual debugging](/docs/testing/debugging#visual-debugging), a section in
  [Debugging Flutter apps](/docs/testing/debugging).
  
  在这篇教程中，多数的截图都设置了 debugPaintSizeEnabled 为 true ，这样你就可以看到布局。
  更多信息请参考：
  
   [Visual debugging](/docs/testing/debugging#visual-debugging), 是 
  [Debugging Flutter apps](/docs/testing/debugging) 中的一个模块。
  
{{site.alert.end}}

Here's a diagram of the widget tree for this UI:
下面是描述这个 UI 的组件树的图：

{% asset ui/layout/sample-flutter-layout.png class="mw-100" alt="Node tree" %}
{:.text-center}

Most of this should look as you might expect, but you might be wondering
about the containers (shown in pink). [Container][] is a widget class that allows
you to customize its child widget. Use a `Container` when you want to
add padding, margins, borders, or background color, to name some of its
capabilities.
大多数布局显示和你期待的是一致的，但是你可能会好奇粉色部分显示的容器。[容器]()是一个组件类，你可以自定义容器的子组件。当你需要添加内边缘，外边缘，边框或这背景颜色，你可以使用`容器`给这些属性命名。

In this example, each [Text][] widget is placed in a `Container` to add margins.
The entire [Row][] is also placed in a `Container` to add padding around the
row.
在本例中，每个文本[组件]()都放在`容器`中，来添加外边缘。整个[行]()也放在容器中，来添加行的内边缘。

The rest of the UI in this example is controlled by properties.
Set an [Icon][]'s color using its `color` property.
Use the `Text.style` property to set the font, its color, weight, and so on.
Columns and rows have properties that allow you to specify how their
children are aligned vertically or horizontally, and how much space
the children should occupy.
本例中的其他 UI 通过设置属性来控制。使用`color`属性来设置[图标]()的颜色。

## Lay out a widget
## 组件布局

How do you layout a single widget in Flutter? This section shows you how to
create and display a simple widget. It also shows the entire code for a simple
Hello World app.

在 Flutter 中你是如何布局一个简单的组件的呢？这部分展示如何创建和展示一个简单的组件。也展示了 Hello World 应用的整段代码。

In Flutter, it takes only a few steps to put text, an icon, or an image on the
screen.
在 Flutter 中，只需要几步就可以在屏幕中展示文本，一个图标，或者一张图片。

### 1. Select a layout widget
### 1. 选择一个布局组件

Choose from a variety of [layout widgets][] based
on how you want to align or constrain the visible widget,
as these characteristics are typically passed on to the
contained widget.

基于你想如何排列和约束可见组件，来选择一些[layout widgets]()，因为这些特性会传给容器组件。

This example uses [Center][] which centers its content
horizontally and vertically.
本例使用 [Center]() 属性是组件内容水平和垂直居中。

### 2. Create a visible widget
### 2. 创建一个可见组件

For example, create a [Text][] widget:
例如，创建一个[Text]() 组件：

<?code-excerpt "layout/base/lib/main.dart (text)" replace="/child: //g"?>
```dart
Text('Hello World'),
```

Create an [Image][] widget:
创建一个[Image]() 组件：

<?code-excerpt "layout/lakes/step5/lib/main.dart (Image-asset)" remove="/width|height/"?>
```dart
Image.asset(
  'images/lake.jpg',
  fit: BoxFit.cover,
),
```

Create an [Icon][] widget:
创建一个[Icon]()组件

<?code-excerpt "layout/lakes/step5/lib/main.dart (Icon)"?>
```dart
Icon(
  Icons.star,
  color: Colors.red[500],
),
```

### 3. Add the visible widget to the layout widget
### 3. 在布局组件上添加一个可见组件

<?code-excerpt path-base="layout/base"?>

All layout widgets have either of the following:

所有的布局组件都有以下之一：

- A `child` property if they take a single child -- for example, `Center` or
  `Container`
  一个`child`属性，如果只有一个组件--比如`Center` 或 `Container`
  
- A `children` property if they take a list of widgets -- for example, `Row`,
  `Column`, `ListView`, or `Stack`.
  一个 `children` 属性如果有一列组件，例如`Row`, `Column`, `ListView`, or `Stack`

Add the `Text` widget to the `Center` widget:
在 `Center` 组件中添加 `Text` 组件：

<?code-excerpt "lib/main.dart (centered-text)" replace="/body: //g"?>
```dart
Center(
  child: Text('Hello World'),
),
```

### 4. Add the layout widget to the page
### 4. 在页面添加布局组件

A Flutter app is itself a widget, and most widgets have a [build()][]
method. Instantiating and returning a widget in the app's `build()` method
displays the widget.
一个 Flutter 应用本身也是一个组件，并且大多数组件都有 [build()][] 方法。在组件的 `build` 方法中初始化和返回一个组件即可展示这个组件。

#### Material apps
#### Material 应用

For a `Material` app, you can use a [Scaffold][] widget; it provides a default
banner, background color, and has API for adding drawers, snack bars, and bottom
sheets. Then you can add the `Center` widget directly to the `body` property for
the home page.
对于一个 `Material` 应用，你可以使用 [Scaffold][] 组件；它提供了默认的标题栏，背景颜色，并且有 API 可以添加画布，菜单栏和底部表格。然后你可以在主页中的 `body` 属性中直接添加 `Center` 组件。

<?code-excerpt path-base="layout/base"?>
<?code-excerpt "lib/main.dart (MyApp)" title?>
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter layout demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Flutter layout demo'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

{{site.alert.note}}
  The [Material library][] implements widgets that follow [Material
  Design][] principles. When designing your UI, you can exclusively use
  widgets from the standard [widgets library][], or you can use widgets from
  the Material library. You can mix widgets from both libraries, you can
  customize existing widgets, or you can build your own set of custom
  widgets.
  [Material library][] 遵循[Material
  Design][] 的原则实现组件，当你设计 UI 时，你可以只使用标准[组件库][]里面的组件，或者使用 Material 库的组件。也可以混合使用两个组件库的组件，你可以标准化已经存在的组件，也可以自己自定义组件。
{{site.alert.end}}

#### Non-Material apps
#### Non-Material 应用

For a non-Material app, you can add the `Center` widget to the app's
`build()` method:

对于一个 non-Material 的应用，你可以在 `build()` 方法中添加`Center` 组件。

<?code-excerpt path-base="layout/non_material"?>
<?code-excerpt "lib/main.dart (MyApp)" title?>
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Colors.white),
      child: Center(
        child: Text(
          'Hello World',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 32,
            color: Colors.black87,
          ),
        ),
      ),
    );
  }
}
```

By default a non-Material app doesn't include an `AppBar`, title, or background
color. If you want these features in a non-Material app, you have to build them
yourself. This app changes the background color to white and the text to dark
grey to mimic a Material app.
默认情况下，一个 non-Material 应用不包含 `AppBar`，标题或背景颜色。如果你想要在 non-Material 应用中有这些特性，你需要自己创建。为了模仿 Material 应用，这个应用把背景颜色改为白色，文本颜色改为灰黑色。

<div class="row">
<div class="col-md-6" markdown="1">
  That's it! When you run the app, you should see _Hello World_.

  App source code:
  - [Material app]({{examples}}/layout/base)
  - [Non-Material app]({{examples}}/layout/non_material)
</div>
<div class="col-md-6">
  {% include app-figure.md img-class="site-mobile-screenshot border w-75"
      image="ui/layout/hello-world.png" alt="Hello World" %}
</div>
</div>

<hr>

## Lay out multiple widgets vertically and horizontally
## 水平和垂直布局多个组件

<?code-excerpt path-base=""?>

One of the most common layout patterns is to arrange widgets vertically
or horizontally. You can use a Row widget to arrange widgets horizontally,
and a Column widget to arrange widgets vertically.
最普遍的布局模式之一就是在水品和垂直方向上排列组件。你可以使用 Row 组件水平排列组件，Column 组件垂直排列组件。

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>

  * Row and Column are two of the most commonly used layout patterns.
  Row 和 Column 是两个最常使用的布局模式
  * Row and Column each take a list of child widgets.
  Row 和 Column 都有一系列的子组件
  * A child widget can itself be a Row, Column, or other complex widget.
  子组件本身可以是 Row, Column 或其他更复杂的组件
  * You can specify how a Row or Column aligns its children, both vertically
    and horizontally.
    你可以明确 Row 或 Column 如何在水平和垂直方向上排列它的子组件
  * You can stretch or constrain specific child widgets.
  你可以延展或约束特定的子组件
  * You can specify how child widgets use the Row's or Column's available space.
  你可以指定子组件如何使用 Row's 或 Column's的剩余空间
{{site.alert.end}}

To create a row or column in Flutter, you add a list of children widgets to a
[Row][] or [Column][] widget. In turn, each child can itself be a row or column,
and so on. The following example shows how it is possible to nest rows or
columns inside of rows or columns.
为了在 Flutter 中创建一行胡一列，你添加一系列的子组件到 [Row][] 或 [Column][]组件。反过来，每个子组件自己也可以是行或列组件等等。下面的例子显示了如何在行或列组件中嵌套行或列组件。

This layout is organized as a Row. The row contains two children:
a column on the left, and an image on the right:
这个布局为一行。一行中包含两个子组件：
左边是一列，右边是一个图片：

{% asset ui/layout/pavlova-diagram.png class="mw-100"
    alt="Screenshot with callouts showing the row containing two children" %}

The left column's widget tree nests rows and columns.
左边的列组件树嵌套了行和列

{% asset ui/layout/pavlova-left-column-diagram.png class="mw-100"
    alt="Diagram showing a left column broken down to its sub-rows and sub-columns" %}

You'll implement some of Pavlova's layout code in
[Nesting rows and columns](#nesting-rows-and-columns).

你将在[嵌套的行和列](#nesting-rows-and-columns)实现一些 Pavlova's 的布局代码。

{{site.alert.note}}
  Row and Column are basic primitive widgets for horizontal
  and vertical layouts&mdash;these low-level widgets allow for maximum
  customization. Flutter also offers specialized, higher level widgets
  that might be sufficient for your needs. For example, instead of Row
  you might prefer
  [ListTile]({{api}}/material/ListTile-class.html),
  an easy-to-use widget with properties for leading and trailing icons,
  and up to 3 lines of text.  Instead of Column, you might prefer
  [ListView]({{api}}/widgets/ListView-class.html),
  a column-like layout that automatically scrolls if its content is too long
  to fit the available space.  For more information,
  see [Common layout widgets](#common-layout-widgets).
  在水平和垂直布局中 Row 和 Column是基本的重要组件；这些基本的组件允许最大的定制化。Flutter 也可以提供高级的组件来满足你的需求。例如，除了水平组件你可能更喜欢 [ListTile]({{api}}/material/ListTile-class.html),一个简单且易用的组件，它带有头部和尾部图标属性。除了 Column 组件，你可能更喜欢 [ListView]({{api}}/widgets/ListView-class.html),如果当前内容足够长可以填充可用空间，它像列布局一样可以自动滚动，更多信息可以参考 [Common layout widgets](#common-layout-widgets)。
  
{{site.alert.end}}

### Aligning widgets
### 对齐组件

You control how a row or column aligns its children using the
`mainAxisAlignment` and `crossAxisAlignment` properties.
For a row, the main axis runs horizontally and the cross axis runs
vertically. For a column, the main axis runs vertically and the cross
axis runs horizontally.

你可以使用 `mainAxisAlignment` 和 `crossAxisAlignment` 属性来控制行和列如何对齐它的子组件。对一行而言，主轴在水平方向，交叉轴在垂直方向。对一列而言，主轴在垂直方向，交叉轴在水平方向。

<div class="mb-2 text-center">
  {% asset ui/layout/row-diagram.png class="mb-2 mw-100"
      alt="Diagram showing the main axis and cross axis for a row" %}
  {% asset ui/layout/column-diagram.png class="mb-2 mr-2 ml-2 mw-100"
      alt="Diagram showing the main axis and cross axis for a column" %}
</div>

The [MainAxisAlignment]({{api}}/rendering/MainAxisAlignment-class.html)
and [CrossAxisAlignment]({{api}}/rendering/CrossAxisAlignment-class.html)
classes offer a variety of constants for controlling alignment.

[MainAxisAlignment]({{api}}/rendering/MainAxisAlignment-class.html)
和 [CrossAxisAlignment]({{api}}/rendering/CrossAxisAlignment-class.html) 类为控制对齐提供了很多约束。

{{site.alert.note}}
  When you add images to your project,
  you need to update the pubspec file to access them&mdash;this
  example uses `Image.asset` to display the images.  For more information,
  see this example's [pubspec.yaml
  file]({{examples}}/layout/row/pubspec.yaml),
  or [Adding Assets and Images in Flutter](/docs/development/ui/assets-and-images).
  You don't need to do this if you're referencing online images using
  `Image.network`.
  
  当你添加图片到你的组件，你需要更新 pubspec 文件来访问它们&mdash; 这个例子使用 `Image.asset` 来展示组件。更多信息，参考这个例子的  [pubspec.yaml
  文件]({{examples}}/layout/row/pubspec.yaml), 或者[在 Flutter 中添加资源和图片](/docs/development/ui/assets-and-images)。
  如果你使用 `Image.network` 引用网上的图片，你就不需要做这个了。
  
{{site.alert.end}}

In the following example, each of the 3 images is 100 pixels wide.
The render box (in this case, the entire screen) is more than 300 pixels wide,
so setting the main axis alignment to `spaceEvenly` divides the free
horizontal space evenly between, before, and after each image.

在下面的例子中，3 个图片都是 100 像素宽。渲染（在本例中，整个屏幕） 超过 300 像素宽，因此设置主轴对齐为 `spaceEvenly`， 在每张图片之前，图片之间，图片之后平分水平的剩余空间。

<div class="row">
<div class="col-lg-8">
  <?code-excerpt "layout/row_column/lib/main.dart (Row)" replace="/Row/[!$&!]/g"?>
  {% prettify dart context="html" %}
  [!Row!](
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Image.asset('images/pic1.jpg'),
      Image.asset('images/pic2.jpg'),
      Image.asset('images/pic3.jpg'),
    ],
  );
  {% endprettify %}
</div>
<div class="col-lg-4" markdown="1">
  {% asset ui/layout/row-spaceevenly-visual.png class="mw-100" alt="Row with 3 evenly spaced images" %}

  **App source:** [row_column]({{examples}}/layout/row_column)
</div>
</div>

Columns work the same way as rows. The following example shows a column
of 3 images, each is 100 pixels high. The height of the render box
(in this case, the entire screen) is more than 300 pixels, so
setting the main axis alignment to `spaceEvenly` divides the free vertical
space evenly between, above, and below each image.
Columns 和 Rows 的工作机制相同。下面的例子显示了一列有 3 个图片，每个图片的高度为 100 像素。渲染的高度（在本例中，整个屏幕）超过了 300 像素，以此设置主轴对齐为 `spaceEvenly` ，在每张图片之前，图片之间，图片之后平分水平的剩余空间。

<div class="row">
<div class="col-lg-8" markdown="1">
  <?code-excerpt "layout/row_column/lib/main.dart (Column)" replace="/Column/[!$&!]/g"?>
  {% prettify dart context="html" %}
  [!Column!](
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Image.asset('images/pic1.jpg'),
      Image.asset('images/pic2.jpg'),
      Image.asset('images/pic3.jpg'),
    ],
  );
  {% endprettify %}

  **App source:** [row_column]({{examples}}/layout/row_column)
</div>
<div class="col-lg-4 text-center">
  {% asset ui/layout/column-visual.png class="mb-4" height="250px"
      alt="Column showing 3 images spaced evenly" %}
</div>
</div>

### Sizing widgets
### 调整组件大小

When a layout is too large to fit a device, a yellow and black striped pattern
appears along the affected edge. Here is an [example][sizing] of a row that is
too wide:

如果布局太大难以适配设备，超过的边缘会出现黄色和黑色的条纹。下面的是当一行的宽度太宽时，[调整一行的大小][示例]。

{% asset ui/layout/layout-too-large.png class="mw-100" alt="Overly-wide row" %}
{:.text-center}

Widgets can be sized to fit within a row or column by using the [Expanded][]
widget. To fix the previous example where the row of images is too wide for its
render box, wrap each image with an `Expanded` widget.
使用 [Expanded][] 组件可以调整组件大小，使它在一行或一列中显示。为了解决之前的例子中图片的宽度太宽，
使用 `Expand` 组件使图片等间距显示。

<div class="row">
<div class="col-lg-8">
  <?code-excerpt "layout/sizing/lib/main.dart (expanded-images)" replace="/Expanded/[!$&!]/g"?>
  {% prettify dart context="html" %}
  Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      [!Expanded!](
        child: Image.asset('images/pic1.jpg'),
      ),
      [!Expanded!](
        child: Image.asset('images/pic2.jpg'),
      ),
      [!Expanded!](
        child: Image.asset('images/pic3.jpg'),
      ),
    ],
  );
  {% endprettify %}
</div>
<div class="col-lg-4" markdown="1">
  {% asset ui/layout/row-expanded-2-visual.png class="mw-100"
      alt="Row of 3 images that are too wide, but each is constrained to take only 1/3 of the space" %}
  {% asset ui/layout/row-expanded-2-visual.png class="mw-100"
      alt="一行有三张图片太宽, 但是每一张图片只能占用 1/3 的可用空间" %}
  **App source:** [sizing]({{examples}}/layout/sizing)
  **应用来源:** [sizing]({{examples}}/layout/sizing)
</div>
</div>

Perhaps you want a widget to occupy twice as much space as its siblings. For
this, use the `Expanded` widget `flex` property, an integer that determines the
flex factor for a widget. The default flex factor is 1. The following code sets
the flex factor of the middle image to 2:
可能你希望组件占用空间是相邻的兄弟组件占用 2 倍。这种情况下，使用 `Expanded` 组件的 `flex` 属性，设为正数可以决定组件所占的比例。默认情况下，flex 的值为 1。下面的代码设置中间图片的 flex 为 2：


<div class="row">
<div class="col-lg-8">
  <?code-excerpt "layout/sizing/lib/main.dart (expanded-images-with-flex)" replace="/flex.*/[!$&!]/g"?>
  {% prettify dart context="html" %}
  Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Expanded(
        child: Image.asset('images/pic1.jpg'),
      ),
      Expanded(
        [!flex: 2,!]
        child: Image.asset('images/pic2.jpg'),
      ),
      Expanded(
        child: Image.asset('images/pic3.jpg'),
      ),
    ],
  );
  {% endprettify %}
</div>
<div class="col-lg-4" markdown="1">
  {% asset ui/layout/row-expanded-visual.png class="mw-100"
      alt="Row of 3 images with the middle image twice as wide as the others" %}

  **App source:** [sizing]({{examples}}/layout/sizing)
</div>
</div>

[sizing]: {{examples}}/layout/sizing
[sizing]: {{examples}}/layout/sizing

### Packing widgets
### Packing widgets

By default, a row or column occupies as much space along its main axis
as possible, but if you want to pack the children closely together,
set its `mainAxisSize` to `MainAxisSize.min`. The following example
uses this property to pack the star icons together.
默认情况下，一行或一列会在主轴上占据尽可能多的空间，如果你想子组件挨在一起，可以将 `mainAxisSize` 设置为 `MainAxisSize.min`。下面的示例使用这个属性将多个星星图标显示在一起。

<div class="row">
<div class="col-lg-8">
  <?code-excerpt "layout/pavlova/lib/main.dart (stars)" replace="/mainAxisSize.*/[!$&!]/g; /\w+ \w+ = //g; /;//g"?>
  {% prettify dart context="html" %}
  Row(
    [!mainAxisSize: MainAxisSize.min,!]
    children: [
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.black),
      Icon(Icons.star, color: Colors.black),
    ],
  )
  {% endprettify %}
</div>
<div class="col-lg-4" markdown="1">
  {% asset ui/layout/packed.png class="border mw-100"
      alt="Row of 5 stars, packed together in the middle of the row" %}

  **App source:** [pavlova]({{examples}}/layout/pavlova)
</div>
</div>

### Nesting rows and columns
### 嵌套行和列

The layout framework allows you to nest rows and columns inside of rows
and columns as deeply as you need. Let's look the code for the outlined section
of the following layout:
布局框架允许你在行和列中再嵌套行和列，而且可以根据你的需要嵌套多层，我们来看一下下面的布局中，划线部分的代码：

{% asset ui/layout/pavlova-large-annotated.png class="border mw-100"
    alt="Screenshot of the pavlova app, with the ratings and icon rows outlined in red" %}
{:.text-center}

The outlined section is implemented as two rows. The ratings row contains
five stars and the number of reviews. The icons row contains three
columns of icons and text.
划线部分有两行，星星行包含 5 可星星和一些描述。图标行包含 3 列图标和文本。

The widget tree for the ratings row:
星星行的组件树结构如下：

{% asset ui/layout/widget-tree-pavlova-rating-row.png class="mw-100" alt="Ratings row widget tree" %}
{:.text-center}

The `ratings` variable creates a row containing a smaller row of 5 star icons,
and text:
`ratings` 变量创建了一行，一行中包含 5 个小星星的图标和文本的。
<?code-excerpt "layout/pavlova/lib/main.dart (ratings)" replace="/ratings/[!$&!]/g"?>
```dart
var stars = Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.black),
    Icon(Icons.star, color: Colors.black),
  ],
);

final [!ratings!] = Container(
  padding: EdgeInsets.all(20),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      stars,
      Text(
        '170 Reviews',
        style: TextStyle(
          color: Colors.black,
          fontWeight: FontWeight.w800,
          fontFamily: 'Roboto',
          letterSpacing: 0.5,
          fontSize: 20,
        ),
      ),
    ],
  ),
);
```

{{site.alert.tip}}
  To minimize the visual confusion that can result from heavily nested layout
  code, implement pieces of the UI in variables and functions.
  为了使因层层嵌套的布局代码导致的视觉复杂度达到最小，可以在变量和函数中实现部分的 UI。
  
{{site.alert.end}}

The icons row, below the ratings row, contains 3 columns; each column contains
an icon and two lines of text, as you can see in its widget tree:
图标行在星星行的下面，有 3 列；每一列有一个图标和 2 行文本，你可以在下面的组件树中看到：

{% asset ui/layout/widget-tree-pavlova-icon-row.png class="mw-100" alt="Icon widget tree" %}
{:.text-center}

The `iconList` variable defines the icons row:
`iconList` 变量定义图标行：

<?code-excerpt "layout/pavlova/lib/main.dart (iconList)" replace="/iconList/[!$&!]/g"?>
```dart
final descTextStyle = TextStyle(
  color: Colors.black,
  fontWeight: FontWeight.w800,
  fontFamily: 'Roboto',
  letterSpacing: 0.5,
  fontSize: 18,
  height: 2,
);

// DefaultTextStyle.merge() allows you to create a default text
// style that is inherited by its child and all subsequent children.
final [!iconList!] = DefaultTextStyle.merge(
  style: descTextStyle,
  child: Container(
    padding: EdgeInsets.all(20),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Column(
          children: [
            Icon(Icons.kitchen, color: Colors.green[500]),
            Text('PREP:'),
            Text('25 min'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.timer, color: Colors.green[500]),
            Text('COOK:'),
            Text('1 hr'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.restaurant, color: Colors.green[500]),
            Text('FEEDS:'),
            Text('4-6'),
          ],
        ),
      ],
    ),
  ),
);
```

The `leftColumn` variable contains the ratings and icons rows, as well as the
title and text that describes the Pavlova:
`leftColumn` 变量包含星星和图标，还有描述 Pavlova 的标题和文本：

<?code-excerpt "layout/pavlova/lib/main.dart (leftColumn)" replace="/leftColumn/[!$&!]/g"?>
```dart
final [!leftColumn!] = Container(
  padding: EdgeInsets.fromLTRB(20, 30, 20, 20),
  child: Column(
    children: [
      titleText,
      subTitle,
      ratings,
      iconList,
    ],
  ),
);
```

The left column is placed in a `Container` to constrain its width.
Finally, the UI is constructed with the entire row (containing the
left column and the image) inside a `Card`.
左边的列放在 `Container` 中来设置它的宽度。最后，在 `Card` 里用整行构建了 UI，行中包含左边的列和图标。

The [Pavlova image][] is from [Pixabay][].
You can embed an image from the net using `Image.network()` but,
for this example, the image is saved to an images directory in the project,
added to the [pubspec file,]({{examples}}/layout/pavlova/pubspec.yaml)
and accessed using `Images.asset()`. For more information, see
[Adding assets and images](/docs/development/ui/assets-and-images).

[Pavlova image][] 来自于 [Pixabay][]。你可以使用 `Image.network()` 来内嵌一张网上的图片，但是，对这个例子来说，图片保存在项目的图片目录中，
加到了 [pubspec file,]({{examples}}/layout/pavlova/pubspec.yaml) 中，可以使用 `Images.asset()` 来访问。如果想了解更多的信息，可以参考 
[Adding assets and images](/docs/development/ui/assets-and-images)。

<?code-excerpt "layout/pavlova/lib/main.dart (body)"?>
```dart
body: Center(
  child: Container(
    margin: EdgeInsets.fromLTRB(0, 40, 0, 30),
    height: 600,
    child: Card(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 440,
            child: leftColumn,
          ),
          mainImage,
        ],
      ),
    ),
  ),
),
```

{{site.alert.tip}}
  The Pavlova example runs best horizontally on a wide device, such as a tablet.
  If you are running this example in the iOS simulator, you can select a
  different device using the **Hardware > Device** menu. For this example, we
  recommend the iPad Pro. You can change its orientation to landscape mode using
  **Hardware > Rotate**. You can also change the size of the simulator window
  (without changing the number of logical pixels) using **Window > Scale**.
  
  Pavlova 示例最好在大屏设备上运行，例如 tablet。如果你在 iOS 模拟器上运行这个示例，你可以在 **Hardware > Device** 菜单栏下选择不同的设备。对于本例而言，我们推荐使用 iPad Pro。你可以使用 **Hardware > Rotate** 将其方向更改为横屏模式。你也可以使用 **Window > Scale** 改变模拟器窗口的大小（不需要改变逻辑像素值）。
{{site.alert.end}}

**App source:** [pavlova]({{examples}}/layout/pavlova)

[Pavlova image]: https://pixabay.com/en/photos/pavlova
[Pixabay]: https://pixabay.com/en/photos/pavlova

**应用程序源文件:** [pavlova]({{examples}}/layout/pavlova)

[Pavlova image]: https://pixabay.com/en/photos/pavlova
[Pixabay]: https://pixabay.com/en/photos/pavlova

<hr>

## Common layout widgets
## 公共布局组件

Flutter has a rich library of layout widgets. Here are a few of those most
commonly used. The intent is to get you up and running as quickly as possible,
rather than overwhelm you with a complete list.  For information on other
available widgets, refer to the [Widget catalog][],
or use the Search box in the [API reference docs]({{api}}).
Also, the widget pages in the API docs often make suggestions
about similar widgets that might better suit your needs.

Flutter 的组件库很丰富。下面列出了一些最常用的组件。目的是让你能尽快启动开发并运行，而不用了解所有的组件。如果想了解其他组件的使用信息，可以参考
 [Widget catalog][] 或者在 [API reference docs]({{api}}) 中搜索。同时，API 文档中组件部分也会向你推荐更满足你的需求的相似组件。
 
The following widgets fall into two categories: standard widgets from the
[widgets library][], and specialized widgets from the [Material library][]. Any
app can use the widgets library but only Material apps can use the Material
Components library.

下面的组件可以分为两类： [Material library][] 中的标准组件， [Material library][] 中的定制组件。任何应用程序都可以使用组件库的组件，但是只用 
Material 应用才能使用 Material 组件库的组件。

### Standard widgets
### Standard widgets
### 标准组件

* [Container](#container): Adds padding, margins, borders, background color, or
  other decorations to a widget.
  [Container](#container): 为组件添加外边缘，没边缘，边框，背景颜色和其他的样式。
* [GridView](#gridview): Lays widgets out as a scrollable grid.
  [GridView](#gridview): 将组件显示为可滚动的网格。
* [ListView](#listview): Lays widgets out as a scrollable list.
  [ListView](#listview): 将组件显示为可滚动的列表。
* [Stack](#stack): Overlaps a widget on top of another.
  [Stack](#stack): 讲一个组件覆盖在另一个组件的顶部。

### Material widgets
### Material 组件

* [Card](#card): Organizes related info into a box with rounded corners and a
  drop shadow.
  [Card](#card): 将相关联的信息组织在有圆角和阴影的区块。
* [ListTile](#listtile): Organizes up to 3 lines of text, and optional leading
  and trailing icons, into a row.
  [ListTile](#listtile): 将达到 3 行的文本和可选的图标显示为一行。

### Container
### Container

Many layouts make liberal use of [Container][]s to separate widgets using
padding, or to add borders or margins. You can change the device's background
by placing the entire layout into a `Container` and changing its background
color or image.
很多布局可以自由使用 [Container][]s，使用 padding 来分隔组件，或者为组件添加边框和外边缘。你可以将整个布局放在 `Container` 中来改变设备的背景颜色并且可以改变布局的背景颜色或图片。

<div class="row">
<div class="col-lg-6" markdown="1">
  <h4 class="no_toc">Summary (Container)</h4>

  * Add padding, margins, borders
  添加内边缘，外边缘，边框
  * Change background color or image
  改变布局的背景颜色或图片
  * Contains a single child widget, but that child can be a Row, Column,
    or even the root of a widget tree
    包含一个子组件，但是自组件可以是一行，列甚至是组件树的根组件
</div>
<div class="col-lg-6 text-center">
  {% asset ui/layout/margin-padding-border.png class="mb-4 mw-100"
      width="230px"
      alt="Diagram showing: margin, border, padding, and content" %}
</div>
</div>

#### Examples (Container)
#### 示例 (Container)
{:.no_toc}

This layout consists of a column with two rows, each containing 2 images. A
[Container][] is used to change the background color of the column to a lighter
grey.

这个布局中有一列，一列中有两行，每一行有两张图片。使用 [Container][]  来将列的背景颜色改为浅灰。

<div class="row">
<div class="col-lg-7">
  <?code-excerpt "layout/container/lib/main.dart (column)" replace="/\bContainer/[!$&!]/g;"?>
  {% prettify dart context="html" %}
  Widget _buildImageColumn() => [!Container!](
        decoration: BoxDecoration(
          color: Colors.black26,
        ),
        child: Column(
          children: [
            _buildImageRow(1),
            _buildImageRow(3),
          ],
        ),
      );
  {% endprettify %}
</div>
<div class="col-lg-5 text-center">
  {% asset ui/layout/container.png class="mb-4 mw-100" width="230px"
      alt="Screenshot showing 2 rows, each containing 2 images" %}
</div>
</div>

A `Container` is also used to add a rounded border and margins to each image:
`Container` 可以用来添加圆形的边框，并且为每张图片添加外边缘：

<?code-excerpt "layout/container/lib/main.dart (row)" replace="/\bContainer/[!$&!]/g;"?>
```dart
Widget _buildDecoratedImage(int imageIndex) => Expanded(
      child: [!Container!](
        decoration: BoxDecoration(
          border: Border.all(width: 10, color: Colors.black38),
          borderRadius: const BorderRadius.all(const Radius.circular(8)),
        ),
        margin: const EdgeInsets.all(4),
        child: Image.asset('images/pic$imageIndex.jpg'),
      ),
    );

Widget _buildImageRow(int imageIndex) => Row(
      children: [
        _buildDecoratedImage(imageIndex),
        _buildDecoratedImage(imageIndex + 1),
      ],
    );
```

You can find more `Container` examples in the [tutorial][] and the [Flutter
Gallery][].
你可以在 [tutorial][] 和 [Flutter Gallery][] 中找到更多 `Container` 的示例。

**App source:** [container]({{examples}}/layout/container)
**应用程序源代码:** [container]({{examples}}/layout/container)

<hr>

### GridView
### GridView

Use [GridView][] to lay widgets out as a two-dimensional list. `GridView`
provides two pre-fabricated lists, or you can build your own custom grid. When a
`GridView` detects that its contents are too long to fit the render box, it
automatically scrolls.
使用 [GridView][] 可以将组件布局为一个二维列表。`GridView` 提供了两个预制的列表，或者你可以创建自定义的网格。当  `GridView` 检测到自己内容太长超出当前渲染页面时，列表自动就是可滚动的。

#### Summary (GridView)
#### 总结 (GridView)
{:.no_toc}

* Lays widgets out in a grid
将组件布局在网格中
* Detects when the column content exceeds the render box and automatically
  provides scrolling
识别当一列的内容超出渲染空间就可以滚动
* Build your own custom grid, or use one of the provided grids:
  * `GridView.count` allows you to specify the number of columns
  * `GridView.extent` allows you to specify the maximum pixel width of a tile
  使用下面提供的网格组件可以创建自定义网格单元：
  `GridView.count` 可以定义有多少列
  `GridView.extent` 可以定义一个单元块的最大宽度
  
{% comment %}
* Use `MediaQuery.of(context).orientation` to create a grid that changes
  its layout depending on whether the device is in landscape or portrait mode.
  使用 `MediaQuery.of(context).orientation` 来创建单元格，它可以根据设备是横屏还是竖屏模式来改变布局样式。
{% endcomment %}

{{site.alert.note}}
  When displaying a two-dimensional list where it's important which
  row and column a cell occupies (for example,
  it's the entry in the "calorie" column for the "avocado" row), use
  [Table]({{api}}/widgets/Table-class.html) or
  [DataTable]({{api}}/material/DataTable-class.html).
  当展示二维列表，每一个元素为行或列（例如，对于 "avocado" 这一行，它是 "calorie" 这一列的入口），可以使用
   [Table]({{api}}/widgets/Table-class.html) 或
   [DataTable]({{api}}/material/DataTable-class.html) 来实现。

{{site.alert.end}}

#### Examples (GridView)
#### 示例 (GridView)
{:.no_toc}

<div class="row">
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/gridview-extent.png class="mw-100" alt="A 3-column grid of photos" %}
  {:.text-center}

  Uses `GridView.extent` to create a grid with tiles a maximum 150 pixels wide.
  使用 `GridView.extent` 创建一个单元格，它的最大宽度为 150 像素。

  **App source:** [grid_and_list]({{examples}}/layout/grid_and_list)
  **应用程序源代码:** [grid_and_list]({{examples}}/layout/grid_and_list)
</div>
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/gridview-count-flutter-gallery.png class="mw-100"
      alt="A 2 column grid with footers" %}
  {:.text-center}

  Uses `GridView.count` to create a grid that's 2 tiles wide in portrait mode,
  and 3 tiles wide in landscape mode. The titles are created by setting the
  `footer` property for each [GridTile][].
  使用 `GridView.count` 来创建一个单元格，在竖屏模式下有 2 块宽，横屏模式下 3 块宽。为每个 [GridTile][] 设置 `footer` 属性就可以创建标题。

  **Dart code:** [grid_list_demo.dart]({{demo}}/material/grid_list_demo.dart)
  from the [Flutter Gallery][]
   **Dart 代码:** [grid_list_demo.dart]({{demo}}/material/grid_list_demo.dart)
    来源于 [Flutter Gallery][]
</div>
</div>

<?code-excerpt "layout/grid_and_list/lib/main.dart (grid)" replace="/\GridView/[!$&!]/g;"?>
```dart
Widget _buildGrid() => [!GridView!].extent(
    maxCrossAxisExtent: 150,
    padding: const EdgeInsets.all(4),
    mainAxisSpacing: 4,
    crossAxisSpacing: 4,
    children: _buildGridTileList(30));

// The images are saved with names pic0.jpg, pic1.jpg...pic29.jpg.
// The List.generate() constructor allows an easy way to create
// a list when objects have a predictable naming pattern.
List<Container> _buildGridTileList(int count) => List.generate(
    count, (i) => Container(child: Image.asset('images/pic$i.jpg')));
```

<hr>

### ListView
### ListView

[ListView]({{api}}/widgets/ListView-class.html),
a column-like widget, automatically provides scrolling when
its content is too long for its render box.

 [ListView]({{api}}/widgets/ListView-class.html)，就好像是只有一列的组件，当一列的内容太长超出渲染空间就可以滚动

#### Summary (ListView)
#### 总结 (ListView)
{:.no_toc}

* A specialized [Column][] for organizing a list of boxes
是为组织李烈元素而自定义的 [Column][]
* Can be laid out horizontally or vertically
可以水平或垂直布局
* Detects when its content won't fit and provides scrolling
检测当列表的内容超出渲染空间就可以滚动
* Less configurable than `Column`, but easier to use and supports scrolling
相比 `Column`，没有它好配置，但是更容易使用并且支持滚动

#### Examples (ListView)
#### 示例 (ListView)
{:.no_toc}

<div class="row">
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/listview.png class="border mw-100"
      alt="ListView containing movie theaters and restaurants" %}
  {:.text-center}

  Uses `ListView` to display a list of businesses using `ListTile`s. A `Divider`
  separates the theaters from the restaurants.
  使用 `ListView` 来展示一列使用 `ListTile` 的业务。`Divider` 将剧院和饭店分隔开。

  **App source:** [grid_and_list]({{examples}}/layout/grid_and_list)
  **应用程序源代码:** [grid_and_list]({{examples}}/layout/grid_and_list)
</div>
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/listview-flutter-gallery.png class="border mw-100"
      alt="ListView containing shades of blue" %}
  {:.text-center}

  Uses `ListView` to display the [Colors]({{api}}/material/Colors-class.html) from
  the [Material Design palette]({{site.material}}/guidelines/style/color.html)
  for a particular color family.
  使用 `ListView` 来展示特定颜色集中的各种 [Colors]({{api}}/material/Colors-class.html)，它的色值来源于 [Material Design palette]({{site.material}}/guidelines/style/color.html)。

  **Dart code:** [colors_demo.dart]({{demo}}/colors_demo.dart) from the
  [Flutter Gallery][]
   **Dart 代码:** [colors_demo.dart]({{demo}}/colors_demo.dart) 来源于
    [Flutter Gallery][]
</div>
</div>

<?code-excerpt "layout/grid_and_list/lib/main.dart (list)" replace="/\ListView/[!$&!]/g;"?>
```dart
Widget _buildList() => [!ListView!](
      children: [
        _tile('CineArts at the Empire', '85 W Portal Ave', Icons.theaters),
        _tile('The Castro Theater', '429 Castro St', Icons.theaters),
        _tile('Alamo Drafthouse Cinema', '2550 Mission St', Icons.theaters),
        _tile('Roxie Theater', '3117 16th St', Icons.theaters),
        _tile('United Artists Stonestown Twin', '501 Buckingham Way',
            Icons.theaters),
        _tile('AMC Metreon 16', '135 4th St #3000', Icons.theaters),
        Divider(),
        _tile('K\'s Kitchen', '757 Monterey Blvd', Icons.restaurant),
        _tile('Emmy\'s Restaurant', '1923 Ocean Ave', Icons.restaurant),
        _tile(
            'Chaiya Thai Restaurant', '272 Claremont Blvd', Icons.restaurant),
        _tile('La Ciccia', '291 30th St', Icons.restaurant),
      ],
    );

ListTile _tile(String title, String subtitle, IconData icon) => ListTile(
      title: Text(title,
          style: TextStyle(
            fontWeight: FontWeight.w500,
            fontSize: 20,
          )),
      subtitle: Text(subtitle),
      leading: Icon(
        icon,
        color: Colors.blue[500],
      ),
    );
```

<hr>

### Stack
### Stack

Use [Stack][] to arrange widgets on top of a base widget&mdash;often an image.
The widgets can completely or partially overlap the base widget.
使用 [Stack][] 可以将组件放在基本组件的顶部，基本组件通常是一张图片。组件可以完全或部分覆盖基本组件。

#### Summary (Stack)
#### 总结 (Stack)
{:.no_toc}

* Use for widgets that overlap another widget
用于组件覆盖另一个组件
* The first widget in the list of children is the base widget;
  subsequent children are overlaid on top of that base widget
  自组件的第一个组件是基本组件；其他的自组件覆盖在基础组件的顶部
* A `Stack`'s content can't scroll
`Stack` 的内容不可以滚动
* You can choose to clip children that exceed the render box
你可以用来裁剪那些超出渲染空间的子组件

#### Examples (Stack)
#### 示例 (Stack)
{:.no_toc}

<div class="row">
<div class="col-lg-7" markdown="1">
  {% asset ui/layout/stack.png class="mw-100" width="200px" alt="Circular avatar image with a label" %}
  {:.text-center}

  Uses `Stack` to overlay a `Container` (that displays its `Text` on a translucent
  black background) on top of a `CircleAvatar`.
  The `Stack` offsets the text using the `alignment` property and
  `Alignment`s.
  使用 `Stack` 来覆盖一个 `Container`（它展示 `Text` 的背景颜色为半透明的黑色）

  **App source:** [card_and_stack]({{examples}}/layout/card_and_stack)
  **应用程序源代码:** [card_and_stack]({{examples}}/layout/card_and_stack)
</div>
<div class="col-lg-5" markdown="1">
  {% asset ui/layout/stack-flutter-gallery.png class="mw-100" alt="An image with a grey gradient across the top" %}
  {:.text-center}

  Uses `Stack` to overlay a gradient to the top of the image. The gradient
  ensures that the toolbar's icons are distinct against the image.
  使用  `Stack` 来在图片顶部覆盖一个透明度，透明度可以确保状态栏的图标在图片上是清晰可见的。

  **Dart code:** [contacts_demo.dart]({{demo}}/contacts_demo.dart)
  from the [Flutter Gallery][]
   **Dart 代码:** [contacts_demo.dart]({{demo}}/contacts_demo.dart)
    来自于 [Flutter Gallery][]
</div>
</div>

<?code-excerpt "layout/card_and_stack/lib/main.dart (Stack)" replace="/\bStack/[!$&!]/g;"?>
```dart
Widget _buildStack()=> [!Stack!](
    alignment: const Alignment(0.6, 0.6),
    children: [
      CircleAvatar(
        backgroundImage: AssetImage('images/pic.jpg'),
        radius: 100,
      ),
      Container(
        decoration: BoxDecoration(
          color: Colors.black45,
        ),
        child: Text(
          'Mia B',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    ],
  );
```

<hr>

### Card

A [Card][], from the [Material library][], contains related nuggets of
information and can be composed from almost any widget, but is often used with
[ListTile][]. `Card` has a single child, but its child can be a column, row,
list, grid, or other widget that supports multiple children. By default, a
`Card` shrinks its size to 0 by 0 pixels. You can use [SizedBox][] to constrain
the size of a card.

[Card][] 是 [Material library][] 中的组件，包含信息关联的块，可以将任何组件组合在一起，通常它和 [ListTile][] 一起使用。`Card` 只有一个子组件，子组件可能是一列，行，列表，网格或者其他支持多个子组件的其他组件。默认情况，`Card` 
的大小为 0 像素。你可以使用 [SizedBox][] 设置 card 的大小。

In Flutter, a `Card` features slightly rounded corners and a drop shadow, giving
it a 3D effect. Changing a `Card`'s `elevation` property allows you to control
the drop shadow effect. Setting the elevation to 24, for example, visually lifts
the `Card` further from the surface and causes the shadow to become more
dispersed. For a list of supported elevation values, see [Elevation][] in the
[Material guidelines][Material Design]. Specifying an unsupported value disables
the drop shadow entirely.

在 Flutter 中，`Card` 的特点是有一个小的圆角和一个下沉的阴影，给人一种 3D 的效果。例如设置阴影值为 24， `Card` 离表面很远，阴影就会更加的明显。elevation 支持的一些值，可以参考 [Material guidelines][Material Design] 中的 [Elevation][] 。
如果你设置了不支持的值，这个阴影就完全不生效。

#### Summary (Card)
#### 总结 (Card)
{:.no_toc}

* Implements a [Material card][]
实现一个 [Material card][]
* Used for presenting related nuggets of information
用在信息关联的块中
* Accepts a single child, but that child can be a `Row`, `Column`, or other
  widget that holds a list of children
  只支持单个子组件，子组件可能是一列，行，或者其他支持多个子组件的其他组件
* Displayed with rounded corners and a drop shadow
展现的时候有圆角和阴影
* A `Card`'s content can't scroll
`Card` 的内容不可以滚动
* From the [Material library][]
它来自于 [Material library][]

#### Examples (Card)
#### 示例 (Card)
{:.no_toc}

<div class="row">
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/card.png class="mw-100" alt="Card containing 3 ListTiles" %}
  {:.text-center}

  A `Card` containing 3 ListTiles and sized by wrapping it with a `SizedBox`. A
  `Divider` separates the first and second `ListTiles`.
  一个 `Card` 有3 个 ListTiles ，通过 `SizedBox` 设置他们的大小和间距。 `Divider` 将第一个和第二个分开。

  **App source:** [card_and_stack]({{examples}}/layout/card_and_stack)
  **应用程序源代码:** [card_and_stack]({{examples}}/layout/card_and_stack)
</div>
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/card-flutter-gallery.png class="mw-100"
      alt="Card containing an image, text and buttons" %}
  {:.text-center}

  A `Card` containing an image and text.
一个 `Card` 包含一张图片和文本.
  **Dart code:** [cards_demo.dart]({{demo}}/material/cards_demo.dart)
  from the [Flutter Gallery][]
  **Dart 代码:** [cards_demo.dart]({{demo}}/material/cards_demo.dart)
  来自于 [Flutter Gallery][]
</div>
</div>

<?code-excerpt "layout/card_and_stack/lib/main.dart (Card)" replace="/\bCard/[!$&!]/g;"?>
```dart
Widget _buildCard() => SizedBox(
    height: 210,
    child: [!Card!](
      child: Column(
        children: [
          ListTile(
            title: Text('1625 Main Street',
                style: TextStyle(fontWeight: FontWeight.w500)),
            subtitle: Text('My City, CA 99984'),
            leading: Icon(
              Icons.restaurant_menu,
              color: Colors.blue[500],
            ),
          ),
          Divider(),
          ListTile(
            title: Text('(408) 555-1212',
                style: TextStyle(fontWeight: FontWeight.w500)),
            leading: Icon(
              Icons.contact_phone,
              color: Colors.blue[500],
            ),
          ),
          ListTile(
            title: Text('costa@example.com'),
            leading: Icon(
              Icons.contact_mail,
              color: Colors.blue[500],
            ),
          ),
        ],
      ),
    ),
  );
```
<hr>

### ListTile
### ListTile

Use [ListTile][], a specialized row widget from the [Material library][], for an
easy way to create a row containing up to 3 lines of text and optional leading
and trailing icons. `ListTile` is most commonly used in [Card][] or
[ListView][], but can be used elsewhere.
[ListTile][] 是 [Material library][] 中自定义的行组件。使用 [ListTile][] 可以很容易就创建达到 3 行文本和多个可选的图标的行。`ListTile` 最常见是在 [Card][] 中使用，但是实际上它可以在任何地方使用。


#### Summary (ListTile)
#### 总结 (ListTile)
{:.no_toc}

* A specialized row that contains up to 3 lines of text and optional icons
定制的行包含 3 行文本和一些可选的图标
* Less configurable than `Row`, but easier to use
`Row` 配置起来不是很方便，但是使用起来很容易
* From the [Material library][]
该组件在[Material library][] 中
#### Examples (ListTile)
#### 示例 (ListTile)
{:.no_toc}

<div class="row">
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/card.png class="mw-100" alt="Card containing 3 ListTiles" %}
  {:.text-center}

  A `Card` containing 3 `ListTiles`.
  一个 `Card` 包含 3 个 `ListTiles`。

  **App source:** [card_and_stack]({{examples}}/layout/card_and_stack)
  **应用源程序:** [card_and_stack]({{examples}}/layout/card_and_stack)
</div>
<div class="col-lg-6" markdown="1">
  {% asset ui/layout/listtile-flutter-gallery.png class="border mw-100" height="200px"
      alt="3 ListTiles, each containing a pull-down button" %}
  {:.text-center}

  Uses `ListTile` to list 3 drop down button types.<br>
  使用 `ListTile` 列出了 3 种按钮类型。<br>
  
  **Dart code:** [buttons_demo.dart]({{demo}}/material/buttons_demo.dart)
  from the [Flutter Gallery][]
  **Dart 代码:** [buttons_demo.dart]({{demo}}/material/buttons_demo.dart)
    来自于 [Flutter Gallery][]
</div>
</div>

<hr>

## Videos
## 视频

The following videos, part of the [Flutter in
Focus](https://www.youtube.com/watch?v=wgTBLj7rMPM&list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2)
series, explain Stateless and Stateful widgets.

下面的视频是 [Flutter in Focus](https://www.youtube.com/watch?v=wgTBLj7rMPM&list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2) 系列视频的一部分，解释了无状态组件和有状态组件。

<iframe width="560" height="315" src="https://www.youtube.com/embed/wE7khGHVkYY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <iframe width="560" height="315" src="https://www.youtube.com/embed/AqCMFXEmf3w?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[Flutter in Focus playlist](https://www.youtube.com/watch?v=wgTBLj7rMPM&list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2)

---

Each episode of the [Widget of the Week
series](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)
focuses on a widget. Several of them includes layout widgets.
每一集 [Widget of the Week
series](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG) 视频只关注一个组件。多个视频包含了所有的布局组件。

<iframe width="560" height="315" src="https://www.youtube.com/embed/b_sQ9bMltGU?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[Flutter Widget of the Week playlist](https://www.youtube.com/watch?v=yI-8QHpGIP4&index=5&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

## Other resources
## 其他资源

The following resources may help when writing layout code.
当你写布局代码时参考下面的资源可能会帮到你。

* [Layout tutorial](/docs/development/ui/layout/tutorial)
: Learn how to build a layout.
* [Widget Overview](/docs/development/ui/widgets)
: Describes many of the widgets available in Flutter.
* [HTML/CSS Analogs in Flutter](/docs/get-started/flutter-for/web-devs)
: For those familiar with web programming, this page maps HTML/CSS functionality
  to Flutter features.
* [Flutter Gallery][]
: Demo app showcasing many Material Design widgets and other Flutter features.
* [Flutter API documentation]({{api}})
: Reference documentation for all of the Flutter libraries.
* [Dealing with Box Constraints in Flutter](/docs/development/ui/layout/box-constraints)
: Discusses how widgets are constrained by their render boxes.
* [Adding Assets and Images in Flutter](/docs/development/ui/assets-and-images)
: Explains how to add images and other assets to your app's package.
* [Zero to One with Flutter]({{site.medium}}/@mravn/zero-to-one-with-flutter-43b13fd7b354)
: One person's experience writing his first Flutter app.

* [Layout tutorial](/docs/development/ui/layout/tutorial)
: 学习如何构建布局
* [Widget Overview](/docs/development/ui/widgets)
: 描述在 Flutter 中已有的许多组件
* [HTML/CSS Analogs in Flutter](/docs/get-started/flutter-for/web-devs)
: 对那些熟悉 Web 编程的人来说，这篇文章将 HTML/CSS 特性映射为 Flutter 特性。
* [Flutter Gallery][]
: 展示了许多 Material Design 组件和其他的 Flutter 特性的示例应用。
* [Flutter API documentation]({{api}})
: 所有 Flutter 库的引用文档。
* [Dealing with Box Constraints in Flutter](/docs/development/ui/layout/box-constraints)
: 讨论组件是如何受渲染样式的约束。
* [Adding Assets and Images in Flutter](/docs/development/ui/assets-and-images)
: 解释了如何向应用包中添加图片和资源。
* [Zero to One with Flutter]({{site.medium}}/@mravn/zero-to-one-with-flutter-43b13fd7b354)
: 一个人在写他的第一个 Flutter 应用的经验。

[build()]: {{api}}/widgets/StatelessWidget/build.html
[Card]: {{api}}/material/Card-class.html
[Center]: {{api}}/widgets/Center-class.html
[Column]: {{api}}/widgets/Column-class.html
[Container]: {{api}}/widgets/Container-class.html
[Elevation]: {{site.material}}/design/environment/elevation.html
[Expanded]: {{api}}/widgets/Expanded-class.html
[Flutter Gallery]: {{site.repo.flutter}}/tree/master/examples/flutter_gallery
[GridView]: {{api}}/widgets/GridView-class.html
[GridTile]: {{api}}/material/GridTile-class.html
[Icon]: {{api}}/material/Icons-class.html
[Image]: {{api}}/widgets/Image-class.html
[layout widgets]: /docs/development/ui/widgets/layout
[ListTile]: {{api}}/material/ListTile-class.html
[ListView]: {{api}}/widgets/ListView-class.html
[Material card]: {{site.material}}/design/components/cards.html
[Material Design]: {{site.material}}/design
[Material library]: {{api}}/material/material-library.html
[Row]: {{api}}/widgets/Row-class.html
[Scaffold]: {{api}}/material/Scaffold-class.html
[SizedBox]: {{api}}/widgets/SizedBox-class.html
[Stack]: {{api}}/widgets/Stack-class.html
[Text]: {{api}}/widgets/Text-class.html
[tutorial]: /docs/development/ui/layout/tutorial
[widgets library]: {{api}}/widgets/widgets-library.html
[Widget catalog]: /docs/development/ui/widgets
