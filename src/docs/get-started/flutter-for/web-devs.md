---
title: Flutter for web developers
title: 给 Web 开发者的 Flutter 指南
description: Learn how to apply Web developer knowledge when building Flutter apps.
description: 学习如何把 Web 的开发经验应用到 Flutter 应用的开发中。
css-old: [two_column.css]
---

This page is for users who are familiar with the HTML and CSS syntax for
arranging components of an application's UI. It maps HTML/CSS code snippets to
their Flutter/Dart code equivalents.

本文是为那些熟悉用 HTML 与 CSS 语法来管理应用页面中元素的开发者准备的。
本文会将 HTML/CSS 代码片段替换为等价的 Flutter/Dart 代码。

One of the fundamental differences between designing a web
layout and a Flutter layout, is learning how constraints work,
and how widgets are sized and positioned. To learn more,
see [Understanding constraints][].

The examples assume:

这些示例包含如下假设：

* The HTML document starts with `<!DOCTYPE html>`, and the CSS box model
  for all HTML elements is set to [`border-box`][],
  for consistency with the Flutter model.
  
  HTML 文件以 `<!DOCTYPE html>` 开头，且为了与 Flutter 模型保持一致，
  所有 HTML 元素的 CSS 盒模型被设置为 [`border-box`](https://css-tricks.com/box-sizing/)。
  
  ```css
  {
    box-sizing: border-box;
  }
  ```
  
* In Flutter, the default styling of the "Lorem ipsum" text is defined by the
  `bold24Roboto` variable as follows, to keep the syntax simple:
  
  在 Flutter 中，为了保持语法简洁，"Lorem ipsum" 文本的默认样式由如下 `bold24Roboto` 变量定义：
  
  ```dart
  TextStyle bold24Roboto = TextStyle(
    color: Colors.white,
    fontSize: 24,
    fontWeight: FontWeight.w900,
  );
  ```

{{site.alert.secondary}}

 How is react-style, or _declarative_, programming different than the
 traditional imperative style?
 For a comparison, see [Introduction to declarative
 UI][Introduction to declarative UI].
 
 React-style 或 **声明式** 编程与传统的命令式风格有何不同？
 为了对比，请查阅 [声明式 UI 介绍][Introduction to declarative UI]。
 
{{site.alert.end}}

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

CSS 所处理的字���样式、大小以及其他文本属性，都是一个 [`Text`][] widget 子元素 [`TextStyle`][] 中单独的属性。

In both HTML and Flutter, child elements or widgets are anchored at
the top left, by default.

在 HTML 和 Flutter 中，子元素或者 widget 都默认锚定在左上方。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
    Lorem ipsum
</div>

.greybox {
      background-color: #e0e0e0; /* grey 300 */
      width: 320px;
      height: 240px;
      [[highlight]]font: 900 24px Georgia;[[/highlight]]
    }
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
  var container = Container( // grey box
    child: Text(
      "Lorem ipsum",
      style: [[highlight]]TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.w900,
        fontFamily: "Georgia",
      ),[[/highlight]]
    ),
    width: 320,
    height: 240,
    color: Colors.grey[300],
  );
{% endprettify %}
</div>

### Setting background color

### 设置背景颜色

In Flutter, you set the background color using a
[`Container`][]’s `decoration` property.

在 Flutter 中，你可以通过 [`Container`][]
的 `decoration` 属性来设置背景颜色。

The CSS examples use the hex color equivalents to the Material color palette.

CSS 示例使用十六进制颜色，这等价于材质调色板。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  Lorem ipsum
</div>

.greybox {
      [[highlight]]background-color: #e0e0e0;[[/highlight]]  /* grey 300 */
      width: 320px;
      height: 240px;
      font: 900 24px Roboto;
    }
{% endprettify %}
</div>

<div class="righthighlight">
{% prettify dart %}
  var container = Container( // grey box
    child: Text(
      "Lorem ipsum",
      style: bold24Roboto,
    ),
    width: 320,
    height: 240,
    [[highlight]]decoration: BoxDecoration(
      color: Colors.grey[300],
    ),[[/highlight]]
  );
{% endprettify %}
</div>

### Centering components

### 居中元素

A [`Center`][] widget
centers its child both horizontally and vertically.

一个 [`Center`][] widget 可以将它的子元素水平和垂直居中。

To accomplish a similar effect in CSS, the parent element uses either a flex
or table-cell display behavior. The examples on this page show the flex
behavior.

要用 CSS 实现相似的效果，父元素需要使用一个 flex 或者 table-cell 显示布局。
本节示例使用的是 flex 布局。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  Lorem ipsum
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  [[highlight]]display: flex;
  align-items: center;
  justify-content: center; [[/highlight]]
}
{% endprettify %}
</div>

<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child:  [[highlight]]Center(
    child: [[/highlight]] Text(
      "Lorem ipsum",
      style: bold24Roboto,
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

### Setting container width

### 设置容器宽度

To specify the width of a
[`Container`][]
widget, use its `width` property. This is a fixed width, unlike the
CSS max-width property that adjusts the container width up to a maximum value.
To mimic that effect in Flutter, use the `constraints` property of the
Container. Create a new [`BoxConstraints`][]
widget with a `minWidth` or `maxWidth`.

要指定一个 [`Container`][]
widget 的宽度，请使用它的 `width` 属性。
和 CSS 中的 max-width 属性用于指定容器可调整的宽度最大值不同的是，
这里指定的是一个固定宽度。要在 Flutter 中模拟该效果，可以使用 Container 的 `constraints` 属性。
新建一个带有 `minWidth` 和 `maxWidth` 属性的
[`BoxConstraints`][] widget。

For nested Containers, if the parent’s width is less than the child’s width,
the child Container sizes itself to match the parent.

对嵌套的 Container 来说，如果其父元素宽度小于子元素宽度，则子元素会调整尺寸以匹配父元素大小。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  [[highlight]]width: 320px; [[/highlight]]
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]width: 100%;
  max-width: 240px; [[/highlight]]
}
{% endprettify %}
</div>

<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red box
      child: Text(
        "Lorem ipsum",
        style: bold24Roboto,
      ),
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: EdgeInsets.all(16),
      [[highlight]]width: 240, [[/highlight]]//max-width is 240
    ),
  ),
  [[highlight]]width: 320, [[/highlight]]
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

## Manipulating position and size

## 操控位置与大小

The following examples show how to perform more complex operations on widget
position, size, and background.

以下示例将展示如何对 widget 的位置、大小以及背景进行更复杂的操作。

### Setting absolute position

### 设置绝对位置

By default, widgets are positioned relative to their parent.

默认情况下， widget 相对于其父元素定位。

To specify an absolute position for a widget as x-y coordinates, nest it in a
[`Positioned`][]
widget that is, in turn, nested in a 
[`Stack`][] widget.

要通过 x-y 坐标指定一个 widget 的绝对位置，
把它嵌套在一个 [`Positioned`][]
widget 中，而该 widget 则需被嵌套在一个
[`Stack`][] widget 中。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  [[highlight]]position: relative; [[/highlight]]
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]position: absolute;
  top: 24px;
  left: 24px; [[/highlight]]
}
{% endprettify %}
</div>

<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  [[highlight]]child: Stack(
    children: [
      Positioned( // red box
        child: [[/highlight]] Container(
          child: Text(
            "Lorem ipsum",
            style: bold24Roboto,
          ),
          decoration: BoxDecoration(
            color: Colors.red[400],
          ),
          padding: EdgeInsets.all(16),
        ),
        [[highlight]]left: 24,
        top: 24,
      ),
    ],
  ), [[/highlight]]
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

### Rotating components

### 旋转元素

To rotate a widget, nest it in a
[`Transform`][]
widget. Use the Transform widget’s `alignment` and `origin` properties to
specify the transform origin (fulcrum) in relative and absolute terms,
respectively.

要旋转一个 widget，请将它嵌套在 [`Transform`][] widget 中。
使用 Transform widget 的 `alignment` 和 `origin`
属性分别来指定转换原点（支点）的相对和绝对位置信息。

For a simple 2D rotation, in which the widget is rotated on the Z axis, create a new [`Matrix4`][] identity object and use
its `rotateZ()` method to specify the rotation factor using radians (degrees × π / 180).

对于简单的 2D 旋转，widget 是依据弧度在 Z 轴上旋转的，创建一个新的 [`Matrix4`][] 标志对象，并使用它的 `rotateZ()` 方法使用弧度系数 (角度 × π / 180) 以指定旋转系数。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]transform: rotate(15deg); [[/highlight]]
}
{% endprettify %}
</div>

<div class="righthighlight">
{% prettify dart %}
var container = Container( // gray box
  child: Center(
    child:  [[highlight]]Transform(
      child: [[/highlight]] Container( // red box
        child: Text(
          "Lorem ipsum",
          style: bold24Roboto,
          textAlign: TextAlign.center,
        ),
        decoration: BoxDecoration(
          color: Colors.red[400],
        ),
        padding: EdgeInsets.all(16),
      ),
      [[highlight]]alignment: Alignment.center,
      transform: Matrix4.identity()
        ..rotateZ(15 * 3.1415927 / 180),
    ), [[/highlight]]
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

### Scaling components

### 缩放元素

To scale a widget up or down, nest it in a
[`Transform`][]
widget. Use the Transform widget’s `alignment` and `origin`
properties to specify the transform origin (fulcrum) in relative or
absolute terms, respectively.

要缩放或放大一个 widget，请将它嵌套在一个
[`Transform`][]
widget 中。使用 Transform widget 的 `alignment` 和 `origin` 属性分别来指定缩放原点（支点）的相对和绝对信息。

For a simple scaling operation along the x-axis, create a new
[`Matrix4`][]
identity object and use its scale() method to specify the scaling factor.

对于沿 x 轴的简单缩放操作，新建一个 [`Matrix4`][] 标识对象并用它的 scale() 方法来指定缩放因系数。

When you scale a parent widget, its child widgets are scaled accordingly.

当你缩放一个父 widget 时，它的子 widget 也会相应被缩放。
<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]transform: scale(1.5); [[/highlight]]
}
{% endprettify %}
</div>

<div class="righthighlight">
{% prettify dart %}
var container = Container( // gray box
  child: Center(
    child:  [[highlight]]Transform(
      child: [[/highlight]] Container( // red box
        child: Text(
          "Lorem ipsum",
          style: bold24Roboto,
          textAlign: TextAlign.center,
        ),
        decoration: BoxDecoration(
          color: Colors.red[400],
        ),
        padding: EdgeInsets.all(16),
      ),
      [[highlight]]alignment: Alignment.center,
      transform: Matrix4.identity()
        ..scale(1.5),
     ), [[/highlight]]
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

### Applying a linear gradient

### 应用线性变换

To apply a linear gradient to a widget's background, nest it in a
[`Container`][]
widget.  Then use the Container widget’s `decoration` property to create a
[`BoxDecoration`][]
object, and use BoxDecoration's `gradient` property to transform the
background
fill.

要将线性变换应用在 widget 的背景上，请将它嵌套在一个
[`Container`][] widget 中。
然后用 Container widget 的 `decoration` 属性生成一个
[`BoxDecoration`][] 对象，
然后使用 BoxDecoration 的 `gradient` 属性来变换背景填充内容。

The gradient “angle” is based on the Alignment (x, y) values:

变换“角度”基于 Alignment (x, y) 取值来定：

* If the beginning and ending x values are equal, the gradient is vertical
(0° | 180°).

  如果开始和结束的 x 值相同，变换将是垂直的（0° | 180°）。

* If the beginning and ending y values are equal, the gradient is horizontal
(90° | 270°).

  如果开始和结束的 y 值相同，变换将是水平的（90° | 270°）。

#### Vertical gradient

#### 垂直变换

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  padding: 16px;
  color: #ffffff;
  [[highlight]]background: linear-gradient(180deg, #ef5350, rgba(0, 0, 0, 0) 80%); [[/highlight]]
}
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red box
      child: Text(
        "Lorem ipsum",
        style: bold24Roboto,
      ),
      [[highlight]]decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: const Alignment(0.0, -1.0),
          end: const Alignment(0.0, 0.6),
          colors: <Color>[
            const Color(0xffef5350),
            const Color(0x00ef5350)
          ],
        ),
      ), [[/highlight]]
      padding: EdgeInsets.all(16),
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

#### Horizontal gradient

#### 水平变换

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  padding: 16px;
  color: #ffffff;
  [[highlight]]background: linear-gradient(90deg, #ef5350, rgba(0, 0, 0, 0) 80%); [[/highlight]]
}
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red box
      child: Text(
        "Lorem ipsum",
        style: bold24Roboto,
      ),
      [[highlight]]decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: const Alignment(-1.0, 0.0),
          end: const Alignment(0.6, 0.0),
          colors: <Color>[
            const Color(0xffef5350),
            const Color(0x00ef5350)
          ],
        ),
      ), [[/highlight]]
      padding: EdgeInsets.all(16),
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

## Manipulating shapes

## 操控图形

The following examples show how to make and customize shapes.

以下示例将展示如何新建和自定义图形。

### Rounding corners

### 圆角

To round the corners of a rectangular shape, use the `borderRadius` property
of a
[BoxDecoration][]
object. Create a new
[BorderRadius][]
object that specifies the radii for rounding each corner.

在矩形上实现圆角，请用
[BoxDecoration][]
对象的 `borderRadius` 属性。新建一个
[BorderRadius][]
对象来指定每个圆角的半径大小。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* gray 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]border-radius: 8px; [[/highlight]]
}
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red circle
      child: Text(
        "Lorem ipsum",
        style: bold24Roboto,
      ),
      decoration: BoxDecoration(
        color: Colors.red[400],
        [[highlight]]borderRadius: BorderRadius.all(
          const Radius.circular(8),
        ), [[/highlight]]
      ),
      padding: EdgeInsets.all(16),
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

### Adding box shadows

### 添加盒阴影 (box shadows)

In CSS you can specify shadow offset and blur in shorthand,
using the box-shadow property. This example shows two box shadows,
with properties:

在 CSS 中你可以通过 box-shadow 属性快速指定阴影偏移与模糊范围。
本例展示了两个盒阴影的属性设置：

*  `xOffset: 0px, yOffset: 2px, blur: 4px, color: black @80% alpha`
*  `xOffset: 0px, yOffset: 06x, blur: 20px, color: black @50% alpha`

In Flutter, each property and value is specified separately.
Use the `boxShadow` property of `BoxDecoration` to create a list of
[`BoxShadow`][] widgets. You can define one or multiple
`BoxShadow` widgets, which can be stacked
to customize the shadow depth, color, and so on.

在 Flutter 中，每个属性与其取值都是单独指定的。
请使用 BoxDecoration 的 `boxShadow` 属性来生成一系列
[BoxShadow][]
widget。你可以定义一个或多个
BoxShadow widget，这些 widget 共同用于设置阴影深度、颜色等等。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8),
              0 6px 20px rgba(0, 0, 0, 0.5);[[/highlight]]
}
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red box
      child: Text(
        "Lorem ipsum",
        style: bold24Roboto,
      ),
      decoration: BoxDecoration(
        color: Colors.red[400],
        [[highlight]]boxShadow: [
          BoxShadow (
            color: const Color(0xcc000000),
            offset: Offset(0, 2),
            blurRadius: 4,
          ),
          BoxShadow (
            color: const Color(0x80000000),
            offset: Offset(0, 6),
            blurRadius: 20,
          ),
        ], [[/highlight]]
      ),
      padding: EdgeInsets.all(16),
    ),
  ),
  width: 320,
  height: 240,
  decoration: BoxDecoration(
    color: Colors.grey[300],
  ),
  margin: EdgeInsets.only(bottom: 16),
);
{% endprettify %}
</div>

### Making circles and ellipses

### 生成圆与椭圆

Making a circle in CSS requires a workaround of applying a border-radius of
50% to all four sides of a rectangle, though there are
[basic shapes][].

尽管 CSS 中有 [基础图形][basic shapes]，
用 CSS 生成圆可以用一个变通方案，即将矩形的四边 border-radius 均设成50%。

While this approach is supported with the `borderRadius` property of
[`BoxDecoration`][], Flutter provides a `shape` property with
[`BoxShape` enum][] for this purpose.

虽然 [`BoxDecoration`][]
的 `borderRadius` 属性支持这样设置，Flutter 为
[`BoxShape` enum][]
提供一个 `shape` 属性用于实现同样的目的。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redcircle">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* gray 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redcircle {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]text-align: center;
  width: 160px;
  height: 160px;
  border-radius: 50%; [[/highlight]]
}
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red circle
      child: Text(
        "Lorem ipsum",
        style: bold24Roboto,
        [[highlight]]textAlign: TextAlign.center, [[/highlight]]
      ),
      decoration: BoxDecoration(
        color: Colors.red[400],
        [[highlight]]shape: BoxShape.circle, [[/highlight]]
      ),
      padding: EdgeInsets.all(16),
      [[highlight]]width: 160,
      height: 160, [[/highlight]]
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

## Manipulating text

## 操控文本

The following examples show how to specify fonts and other text attributes. They
also show how to transform text strings, customize spacing, and create excerpts.

以下示例展示了如何设置字体和其他文本属性。他们同时还展示了如何变换文本字符、自定义间距以及生成摘要。

### Adjusting text spacing

### 文字间距调整

In CSS you specify the amount of white space between each letter or word by
giving a length value for the letter-spacing and word-spacing properties,
respectively. The amount of space can be in px, pt, cm, em, etc.

在 CSS 中你可以通过分别给 letter-spacing 和 word-spacing
属性的长度赋值来指定每个字母��及每个单词间的空白距离。距离的单位可以是 px, pt, cm, em 等等。

In Flutter, you specify white space as logical pixels
(negative values are allowed)
for the `letterSpacing` and `wordSpacing` properties of a
[`TextStyle`][] child of a `Text` widget.

在 Flutter 中，你可以在 Text widget 子元素
[`TextStyle`][]
的 `letterSpacing` 与 `wordSpacing` 属性中将间距设置为逻辑像素（允许负值）。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]letter-spacing: 4px; [[/highlight]]
}
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red box
      child: Text(
        "Lorem ipsum",
        style: TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.w900,
          [[highlight]]letterSpacing: 4, [[/highlight]]
        ),
      ),
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: EdgeInsets.all(16),
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

### Making inline formatting changes

### 内联样式更改

A [`Text`][] widget lets you display text with some
formatting characteristics. To display text that uses
multiple styles (in this example,
a single word with emphasis), use a [`RichText`][]
widget instead. Its `text` property can specify one or more
[`TextSpan`][] widgets
that can be individually styled.

一个 [`Text`][] widget
允许你展示同一类样式的文本。为了展现具有多种样式（本例中，是一个带重音的单词）的文本，
需要改用 [`RichText`][] widget。
它的 `text` 属性可以指定一个或多个可以单独设置样式的
[`TextSpan`][] widget。

In the following example, "Lorem" is in a TextSpan widget with the default
(inherited) text styling, and "ipsum" is in a separate TextSpan with custom
styling.

在接下来的示例中，"Lorem" 位于 TextSpan widget 中，
具有默认（继承）文本样式，"ipsum" 位于具有自定义样式、单独的一个 TextSpan 中。


<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    [[highlight]]Lorem <em>ipsum</em>[[/highlight]]
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  [[highlight]]font: 900 24px Roboto;[[/highlight]]
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
}
 [[highlight]].redbox em {
  font: 300 48px Roboto;
  font-style: italic;
} [[/highlight]]
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red box
      child:  [[highlight]]RichText(
        text: TextSpan(
          style: bold24Roboto,
          children: <TextSpan>[
            TextSpan(text: "Lorem "),
            TextSpan(
              text: "ipsum",
              style: TextStyle(
                fontWeight: FontWeight.w300,
                fontStyle: FontStyle.italic,
                fontSize: 48,
              ),
            ),
          ],
        ),
      ), [[/highlight]]
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: EdgeInsets.all(16),
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>

### Creating text excerpts

### 生成文本摘要

An excerpt displays the initial line(s) of text in a paragraph, and handles the
overflow text, often using an ellipsis. In HTML/CSS an excerpt can be no longer
than one line. Truncating after multiple lines requires some JavaScript code.

一个摘要会展示一个段落中文本的初始行内容，并常用省略号处理溢出的文本内容。
在 HTML/CSS 中，摘录不能超过一行。 在多行之后进行截断需要运行一些 JavaScript 代码。

In Flutter, use the `maxLines` property of a
[`Text`][]
widget to specify the number of lines to include in the excerpt, and the
`overflow` property for handling overflow text.

在 Flutter 中，使用 [Text]({{site.api}}/flutter/widgets/Text-class.html)
widget 的 `maxLines` 属性来指定包含在摘要中的行数，以及 `overflow` 属性来处理溢出文本。

<div class="lefthighlight">
{% prettify css %}
<div class="greybox">
  <div class="redbox">
    Lorem ipsum dolor sit amet, consec etur
  </div>
</div>

.greybox {
  background-color: #e0e0e0; /* grey 300 */
  width: 320px;
  height: 240px;
  font: 900 24px Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redbox {
  background-color: #ef5350; /* red 400 */
  padding: 16px;
  color: #ffffff;
  [[highlight]]overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; [[/highlight]]
}
{% endprettify %}
</div>
<div class="righthighlight">
{% prettify dart %}
var container = Container( // grey box
  child: Center(
    child: Container( // red box
      child: Text(
        "Lorem ipsum dolor sit amet, consec etur",
        style: bold24Roboto,
        [[highlight]]overflow: TextOverflow.ellipsis,
        maxLines: 1, [[/highlight]]
      ),
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: EdgeInsets.all(16),
    ),
  ),
  width: 320,
  height: 240,
  color: Colors.grey[300],
);
{% endprettify %}
</div>
<div class="end-examples"></div>


[basic shapes]: https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape
[`border-box`]: https://css-tricks.com/box-sizing/
[`BorderRadius`]: {{site.api}}/flutter/painting/BorderRadius-class.html
[`BoxDecoration`]: {{site.api}}/flutter/painting/BoxDecoration-class.html
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
[`BoxShape` enum]: {{site.api}}/flutter/painting/BoxShape-class.html
[`BoxShadow`]: {{site.api}}/flutter/painting/BoxShadow-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[Introduction to declarative UI]: /docs/get-started/flutter-for/declarative
[`Matrix4`]: {{site.api}}/flutter/vector_math_64/Matrix4-class.html
[`Positioned`]: {{site.api}}/flutter/widgets/Positioned-class.html
[`RichText`]: {{site.api}}/flutter/widgets/RichText-class.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`TextSpan`]: {{site.api}}/flutter/painting/TextSpan-class.html
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[`Transform`]: {{site.api}}/flutter/widgets/Transform-class.html
[Understanding constraints]: /docs/development/ui/layout/constraints

