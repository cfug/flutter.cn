---
# title: Flutter for web developers
title: 给 Web 开发者的 Flutter 指南
# description: >-
#   Learn how to apply Web developer knowledge when building Flutter apps.
description: >-
  学习如何把 Web 的开发经验应用到 Flutter 应用的开发中。
tags: Flutter教程,Flutter起步,Flutter入门
keywords: Flutter Web,iOS,用Flutter开发iOS,Flutter网页版
css-old: [two_column.css]
---

<?code-excerpt path-base="get-started/flutter-for/web_devs"?>

This page is for users who are familiar with the HTML
and CSS syntax for arranging components of an application's UI.
It maps HTML/CSS code snippets to their Flutter/Dart code equivalents.

本文是为那些熟悉用 HTML 与 CSS 语法来管理应用页面中元素的开发者准备的。
本文会将 HTML/CSS 代码片段替换为等价的 Flutter/Dart 代码。

Flutter is a framework for building cross-platform applications
that uses the Dart programming language.
To understand some differences between programming with Dart
and programming with Javascript, 
see [Learning Dart as a JavaScript Developer][].

Flutter 是一个用于构建跨平台应用的框架，它使用 Dart 编程语言。
要了解 Dart 编程语言与 Javascript 编程语言的异同，
请参考文档
[给 JavaScript 开发者的 Dart 编程语言指南][Learning Dart as a JavaScript Developer]。

One of the fundamental differences between
designing a web layout and a Flutter layout,
is learning how constraints work,
and how widgets are sized and positioned.
To learn more, see [Understanding constraints][].

在 Web 和 Flutter 的布局基础条件中，
**布局限制、widget 的大小确定和定位** 是重要的区别之一。
想要了解更多，你可以阅读
[深入理解 Flutter 布局约束][Understanding constraints]。

The examples assume:

以下的示例基于如下假设：

* The HTML document starts with `<!DOCTYPE html>`, and the CSS box model
  for all HTML elements is set to [`border-box`][],
  for consistency with the Flutter model.

  HTML 文件以 `<!DOCTYPE html>` 开头，且为了与 Flutter 模型保持一致，
  所有 HTML 元素的 CSS 盒模型被设置为
  [`border-box`](https://css-tricks.com/box-sizing/)。

  ```css
  {
      box-sizing: border-box;
  }
  ```
* In Flutter, the default styling of the 'Lorem ipsum' text
  is defined by the `bold24Roboto` variable as follows,
  to keep the syntax simple:

  在 Flutter 中，为了保持语法简洁，
  "Lorem ipsum" 文本的默认样式由如下 `bold24Roboto` 变量定义：

  <?code-excerpt "lib/main.dart (text-style)"?>
  ```dart
  TextStyle bold24Roboto = const TextStyle(
    color: Colors.white,
    fontSize: 24,
    fontWeight: FontWeight.bold,
  );
  ```

:::secondary

How is react-style, or _declarative_, programming different from the
traditional imperative style?
For a comparison, see [Introduction to declarative UI][].

React-style 或 **声明式** 编程与传统的命令式风格有何不同？
为了对比，请查阅 [声明式 UI 介绍][Introduction to declarative UI]。

:::

## Performing basic layout operations

## 执行基础布局操作

The following examples show how to perform the most common UI layout tasks.

以下示例将向你展示如何执行最常见的 UI 布局操作。

### Styling and aligning text

### 文本样式与对齐

Font style, size, and other text attributes that CSS handles with the font and
color properties are individual properties of a
[`TextStyle`][]
child of a
[`Text`][] widget.

CSS 所处理的字体样式、大小以及其他文本属性，
都是一个 [`Text`][] widget 子元素 [`TextStyle`][] 中单独的属性。

For text-align property in CSS that is used for aligning text,
there is a textAlign property of a [`Text`][] widget.

[`Text`][] widget 中的 textAlign 属性与 CSS 中的
text-align 属性作用相同，用来控制文本的对齐方向。

In both HTML and Flutter, child elements or widgets
are anchored at the top left, by default.

在 HTML 和 Flutter 中，子元素或者 widget 的位置都默认在左上方。

```css highlightLines=9
<div class="grey-box">
  Lorem ipsum
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Georgia;
}
```

```dart highlightLines=8-13
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: const Text(
    'Lorem ipsum',
    style: TextStyle(
      fontFamily: 'Georgia',
      fontSize: 24,
      fontWeight: FontWeight.bold,
    ),
    textAlign: TextAlign.center,
  ),
);
```

### Setting background color

### 设置背景颜色

In Flutter, you set the background color using the `color` property
or the `decoration` property of a [`Container`][].
However, you cannot supply both, since it would potentially
result in the decoration drawing over the background color.
The `color` property should be preferred
when the background is a simple color.
For other cases, such as gradients or images,
use the `decoration` property.

在 Flutter 中，你可以通过 [`Container`][] 的
`decoration` 或者 `color` 属性来设置背景颜色。
但是，你不能同时设置这两个属性，这有可能导致 `decoration` 覆盖掉 `color`。
当背景是简单的颜色时，应首选 `color` 属性，
对于其他情况渐变或图像等情况，推荐使用 `decoration` 属性。

The CSS examples use the hex color equivalents to the Material color palette.

CSS 示例使用十六进制颜色，
这等价于 Material 的调色板。

```css highlightLines=6
<div class="grey-box">
  Lorem ipsum
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
}
```

```dart highlightLines=5
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Text(
    'Lorem ipsum',
    style: bold24Roboto,
  ),
);
```

```dart highlightLines=5-7
final container = Container(
  // grey box
  width: 320,
  height: 240,
  decoration: BoxDecoration(
    color: Colors.grey[300],
  ),
  child: Text(
    'Lorem ipsum',
    style: bold24Roboto,
  ),
);
```

### Centering components

### 居中元素

A [`Center`][] widget
centers its child both horizontally and vertically.

一个 [`Center`][] widget 可以将它的子 widget 同时以水平和垂直方向居中。

To accomplish a similar effect in CSS, the parent element uses either a flex
or table-cell display behavior. The examples on this page show the flex
behavior.

要用 CSS 实现相似的效果，父元素需要使用一个 flex
或者 table-cell 显示布局。本节示例使用的是 flex 布局。

```css highlightLines=10-12
<div class="grey-box">
  Lorem ipsum
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

```dart highlightLines=6-7
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Text(
      'Lorem ipsum',
      style: bold24Roboto,
    ),
  ),
);
```

### Setting container width

### 设置容器宽度

To specify the width of a [`Container`][]
widget, use its `width` property.
This is a fixed width, unlike the CSS max-width property
that adjusts the container width up to a maximum value.
To mimic that effect in Flutter,
use the `constraints` property of the Container.
Create a new [`BoxConstraints`][] widget with a `minWidth` or `maxWidth`.

要指定一个 [`Container`][] widget 的宽度，请使用它的 `width` 属性。
与 CSS 中的 max-width 属性用于指定容器可调整的宽度最大值不同的是，
这里指定的是一个固定宽度。
要在 Flutter 中模拟该效果，可以使用 Container 的 `constraints` 属性。
新建一个带有 `minWidth` 和 `maxWidth` 属性的 [`BoxConstraints`][] widget。


For nested Containers, if the parent's width is less than the child's width,
the child Container sizes itself to match the parent.

对嵌套的 Container 来说，如果其父元素宽度小于子元素宽度，
则子元素会调整尺寸以匹配父元素大小。

```css highlightLines=9,20-21
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    width: 100%;
    max-width: 240px;
}
```

```dart highlightLines=3,9
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      width: 240, // max-width is 240
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

## Manipulating position and size

## 操控位置与大小

The following examples show how to perform more complex operations
on widget position, size, and background.

以下示例将展示如何对 widget 的位置、大小以及背景进行更复杂的操作。

### Setting absolute position

### 设置绝对位置

By default, widgets are positioned relative to their parent.

默认情况下，widget 相对于其父元素定位。

To specify an absolute position for a widget as x-y coordinates,
nest it in a [`Positioned`][] widget that is,
in turn, nested in a [`Stack`][] widget.

想要通过 x-y 坐标指定一个 widget 的绝对位置，
可以把它放在一个 [`Positioned`][] widget 中，
而 `Positioned` 则需被放在一个 [`Stack`][] widget 中。

```css highlightLines=8,18-20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    position: relative;
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    position: absolute;
    top: 24px;
    left: 24px;
}
```

```dart highlightLines=6-7,10-11
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Stack(
    children: [
      Positioned(
        // red box
        left: 24,
        top: 24,
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.red[400],
          ),
          child: Text(
            'Lorem ipsum',
            style: bold24Roboto,
          ),
        ),
      ),
    ],
  ),
);
```

### Rotating components

### 旋转元素

To rotate a widget, nest it in a [`Transform`][] widget.
Use the `Transform` widget's `alignment` and `origin` properties
to specify the transform origin (fulcrum) in relative and absolute terms,
respectively.

想要旋转一个 widget，请将它放在 [`Transform`][] widget 中。
使用 `Transform` widget 的 `alignment` 和 `origin`
属性分别来指定转换原点（支点）的相对和绝对位置信息。

For a simple 2D rotation, in which the widget is rotated on the Z axis,
create a new [`Matrix4`][] identity object
and use its `rotateZ()` method to specify the rotation factor
using radians (degrees × π / 180).

对于简单的 2D 旋转，例如在 Z 轴上旋转的，
创建一个新的 [`Matrix4`][] 对象，
并使用它的 `rotateZ()` 方法以弧度单位
（角度 × π / 180）指定旋转系数。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    transform: rotate(15deg);
}
```

```dart highlightLines=7-10,
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()..rotateZ(15 * 3.1415927 / 180),
      child: Container(
        // red box
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.red[400],
        ),
        child: Text(
          'Lorem ipsum',
          style: bold24Roboto,
          textAlign: TextAlign.center,
        ),
      ),
    ),
  ),
);
```

### Scaling components

### 缩放元素

To scale a widget up or down, nest it in a [`Transform`][] widget.
Use the Transform widget's `alignment` and `origin` properties
to specify the transform origin (fulcrum) in relative or absolute terms,
respectively.

想要缩放一个 widget，请同样将它放在一个 [`Transform`][] widget 中。
使用 `Transform` widget 的 `alignment` 和 `origin`
属性分别来指定缩放原点（支点）的相对和绝对信息。

For a simple scaling operation along the x-axis,
create a new [`Matrix4`][] identity object
and use its `scale()` method to specify the scaling factor.

对于沿 x 轴的简单缩放操作，新建一个 [`Matrix4`][] 对象
并用它的 `scale()` 方法来指定缩放因系数。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    transform: scale(1.5);
}
```

```dart highlightLines=7-10
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()..scale(1.5),
      child: Container(
        // red box
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.red[400],
        ),
        child: Text(
          'Lorem ipsum',
          style: bold24Roboto,
          textAlign: TextAlign.center,
        ),
      ),
    ),
  ),
);
```

### Applying a linear gradient

### 应用线性变换

To apply a linear gradient to a widget's background,
nest it in a [`Container`][] widget.
Then use the `Container` widget's `decoration` property to create a
[`BoxDecoration`][] object, and use `BoxDecoration`'s `gradient`
property to transform the background fill.

想要将线性颜色渐变在 widget 的背景上应用，请将它嵌套在一个 [`Container`][] widget 中。
接着将一个 [`BoxDecoration`][] 对象传递至 `Container` 的 `decoration`，
然后使用 `BoxDecoration` 的 `gradient` 属性来变换背景填充内容。

The gradient "angle" is based on the Alignment (x, y) values:

变换「角度」基于 `Alignment (x, y)` 取值来定：

* If the beginning and ending x values are equal, the gradient is vertical
(0° | 180°).

  如果开始和结束的 x 值相同，变换将是垂直的 (0° | 180°)。

* If the beginning and ending y values are equal, the gradient is horizontal
(90° | 270°).

  如果开始和结束的 y 值相同，变换将是水平的 (90° | 270°)。

#### Vertical gradient

#### 垂直变换

```css highlightLines=19
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    padding: 16px;
    color: #ffffff;
    background: linear-gradient(180deg, #ef5350, rgba(0, 0, 0, 0) 80%);
}
```

```dart highlightLines=9-18
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment(0.0, 0.6),
          colors: <Color>[
            Color(0xffef5350),
            Color(0x00ef5350),
          ],
        ),
      ),
      padding: const EdgeInsets.all(16),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

#### Horizontal gradient

#### 水平变换

```css highlightLines=19
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    padding: 16px;
    color: #ffffff;
    background: linear-gradient(90deg, #ef5350, rgba(0, 0, 0, 0) 80%);
}
```

```dart highlightLines=10-19
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment(-1.0, 0.0),
          end: Alignment(0.6, 0.0),
          colors: <Color>[
            Color(0xffef5350),
            Color(0x00ef5350),
          ],
        ),
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

## Manipulating shapes

## 操控图形

The following examples show how to make and customize shapes.

以下示例将展示如何新建和自定义图形。

### Rounding corners

### 圆角

To round the corners of a rectangular shape,
use the `borderRadius` property of a [`BoxDecoration`][] object.
Create a new [`BorderRadius`][]
object that specifies the radius for rounding each corner.

想要在矩形上实现圆角，请用 [`BoxDecoration`][] 对象的 `borderRadius` 属性。
新建一个 [`BorderRadius`][] 对象来指定各个圆角的半径大小。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    border-radius: 8px;
}
```

```dart highlightLines=12-14
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red circle
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
        borderRadius: const BorderRadius.all(
          Radius.circular(8),
        ),
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

### Adding box shadows

### 为盒子添加阴影 (box shadows)

In CSS you can specify shadow offset and blur in shorthand,
using the box-shadow property. This example shows two box shadows,
with properties:

在 CSS 中你可以通过 box-shadow 属性快速指定阴影偏移与模糊范围。
本例展示了两个盒阴影的属性设置：

* `xOffset: 0px, yOffset: 2px, blur: 4px, color: black @80% alpha`
* `xOffset: 0px, yOffset: 06x, blur: 20px, color: black @50% alpha`

In Flutter, each property and value is specified separately.
Use the `boxShadow` property of `BoxDecoration` to create a list of
[`BoxShadow`][] widgets. You can define one or multiple
`BoxShadow` widgets, which can be stacked
to customize the shadow depth, color, and so on.

在 Flutter 中，每个属性与其取值都是单独指定的。
请使用 BoxDecoration 的 `boxShadow` 
属性来生成一系列 [`BoxShadow`][] widget。
你可以定义一个或多个 `BoxShadow` widget，
这些 widget 共同用于设置阴影深度、颜色等等。

```css highlightLines=20-21
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8),
              0 6px 20px rgba(0, 0, 0, 0.5);
}
```

```dart highlightLines=15-26
final container = Container(
  // grey box
  width: 320,
  height: 240,
  margin: const EdgeInsets.only(bottom: 16),
  decoration: BoxDecoration(
    color: Colors.grey[300],
  ),
  child: Center(
    child: Container(
      // red box
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
        boxShadow: const <BoxShadow>[
          BoxShadow(
            color: Color(0xcc000000),
            offset: Offset(0, 2),
            blurRadius: 4,
          ),
          BoxShadow(
            color: Color(0x80000000),
            offset: Offset(0, 6),
            blurRadius: 20,
          ),
        ],
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

### Making circles and ellipses

### 生成圆与椭圆

Making a circle in CSS requires a workaround of applying a border-radius of
50% to all four sides of a rectangle, though there are
[basic shapes][].

尽管 CSS 中有 [基础图形][basic shapes]，
用 CSS 生成圆可以用一个变通方案，
即将矩形的四边 border-radius 均设成 50%。

While this approach is supported
with the `borderRadius` property of [`BoxDecoration`][],
Flutter provides a `shape` property
with [`BoxShape` enum][] for this purpose.

虽然 [`BoxDecoration`][] 的 `borderRadius` 属性支持这样设置，
Flutter 提供了一个 `shape` 属性用于实现同样的目的，
它的类型是 [`BoxShape` 枚举][`BoxShape` enum]。

```css highlightLines=20-23
<div class="grey-box">
  <div class="red-circle">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-circle {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    text-align: center;
    width: 160px;
    height: 160px;
    border-radius: 50%;
}
```

```dart highlightLines=11,14-15,19
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red circle
      decoration: BoxDecoration(
        color: Colors.red[400],
        shape: BoxShape.circle,
      ),
      padding: const EdgeInsets.all(16),
      width: 160,
      height: 160,
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
        textAlign: TextAlign.center,
      ),
    ),
  ),
);
```

## Manipulating text

## 操控文本

The following examples show how to specify fonts and other
text attributes. They also show how to transform text strings,
customize spacing, and create excerpts.

以下示例展示了如何设置字体和其他文本属性。
它们同时还展示了如何变换文本字符、自定义间距以及生成摘要。

### Adjusting text spacing

### 文字间距调整

In CSS, you specify the amount of white space
between each letter or word by giving a length value
for the letter-spacing and word-spacing properties, respectively.
The amount of space can be in px, pt, cm, em, etc.

在 CSS 中你可以通过分别设置 letter-spacing 和 word-spacing 属性，
来指定每个字母以及每个单词间的空白距离。
距离的单位可以是 px、pt、cm、em 等。

In Flutter, you specify white space as logical pixels
(negative values are allowed)
for the `letterSpacing` and `wordSpacing` properties
of a [`TextStyle`][] child of a `Text` widget.

在 Flutter 中，你可以将 `Text` widget 的 [`TextStyle`][] 属性中
`letterSpacing` 与 `wordSpacing` 设置为逻辑像素（允许负值）。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    letter-spacing: 4px;
}
```

```dart highlightLines=19
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      child: const Text(
        'Lorem ipsum',
        style: TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.w900,
          letterSpacing: 4,
        ),
      ),
    ),
  ),
);
```

### Making inline formatting changes

### 内联样式更改

A [`Text`][] widget lets you display text
with some formatting characteristics.
To display text that uses multiple styles
(in this example, a single word with emphasis),
use a [`RichText`][] widget instead.
Its `text` property can specify one or more
[`TextSpan`][] objects that can be individually styled.

一个 [`Text`][] widget 允许你展示同一类样式的文本。
为了展现具有多种样式（本例中，是一个带重音的单词）的文本，
你需要改用 [`RichText`][] widget。
它的 `text` 属性可以设置一个或多个可单独设置样式的 [`TextSpan`][]。

In the following example, "Lorem" is in a `TextSpan`
with the default (inherited) text styling,
and "ipsum" is in a separate `TextSpan` with custom styling.

在接下来的示例中，「Lorem」位于 `TextSpan` 中，具有默认（继承）文本样式，
「ipsum」位于具有自定义样式、单独的一个 `TextSpan` 中。

```css highlightLines=3,11,21-4
<div class="grey-box">
  <div class="red-box">
    Lorem <em>ipsum</em>
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
}
.red-box em {
    font: 300 48px Roboto;
    font-style: italic;
}
```

```dart highlightLines=13-28
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: const EdgeInsets.all(16),
      child: RichText(
        text: TextSpan(
          style: bold24Roboto,
          children: const <TextSpan>[
            TextSpan(text: 'Lorem '),
            TextSpan(
              text: 'ipsum',
              style: TextStyle(
                fontWeight: FontWeight.w300,
                fontStyle: FontStyle.italic,
                fontSize: 48,
              ),
            ),
          ],
        ),
      ),
    ),
  ),
);
```

### Creating text excerpts

### 生成文本摘要

An excerpt displays the initial line(s) of text in a paragraph,
and handles the overflow text, often using an ellipsis.

一个摘要会展示一个段落中文本的初始行内容，
并常用省略号处理溢出的文本内容。

In Flutter, use the `maxLines` property of a [`Text`][] widget
to specify the number of lines to include in the excerpt,
and the `overflow` property for handling overflow text.

在 Flutter 中，你可以使用 [`Text`][] widget 的
`maxLines` 属性来指定包含在摘要中的行数，
以及 `overflow` 属性来处理溢出文本。

```css highlightLines=20-23
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum dolor sit amet, consec etur
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
```

```dart highlightLines=16-17
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: const EdgeInsets.all(16),
      child: Text(
        'Lorem ipsum dolor sit amet, consec etur',
        style: bold24Roboto,
        overflow: TextOverflow.ellipsis,
        maxLines: 1,
      ),
    ),
  ),
);
```


[basic shapes]: https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape
[`border-box`]: https://css-tricks.com/box-sizing/
[`BorderRadius`]: {{site.api}}/flutter/painting/BorderRadius-class.html
[`BoxDecoration`]: {{site.api}}/flutter/painting/BoxDecoration-class.html
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
[`BoxShape` enum]: {{site.api}}/flutter/painting/BoxShape.html
[`BoxShadow`]: {{site.api}}/flutter/painting/BoxShadow-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[Introduction to declarative UI]: /get-started/flutter-for/declarative
[Learning Dart as a JavaScript Developer]: {{site.dart-site}}/guides/language/coming-from/js-to-dart
[`Matrix4`]: {{site.api}}/flutter/vector_math_64/Matrix4-class.html
[`Positioned`]: {{site.api}}/flutter/widgets/Positioned-class.html
[`RichText`]: {{site.api}}/flutter/widgets/RichText-class.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`TextSpan`]: {{site.api}}/flutter/painting/TextSpan-class.html
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[`Transform`]: {{site.api}}/flutter/widgets/Transform-class.html
[Understanding constraints]: /ui/layout/constraints

