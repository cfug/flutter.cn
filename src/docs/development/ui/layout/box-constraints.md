---
title: Dealing with box constraints
title: 处理边界约束 (Box constraints) 的问题
description: How box constraints might go wrong.
description: 为何框约束可能会出错。
short-title: Box constraints
short-title: 边界约束 (Box constraints)
tags: 用户界面,Flutter UI,布局
keywords: 边界约束问题,渲染
---

{{site.alert.note}}

  You might be directed to this page if the
  framework detects a problem involving box constraints.

  如果你被引导至本页面，
  是因为 Flutter 框架检测到你可能遇到涉及边界约束的问题。 

{{site.alert.end}}

{{site.alert.note}}
  If you are confused by how constraints, sizing,
  and positioning work in Flutter, see
  [Understanding constraints][].
{{site.alert.end}}

In Flutter, widgets are rendered by their underlying
[`RenderBox`][] objects. Render boxes are given
constraints by their parent, and size themselves within those
constraints. Constraints consist of minimum and maximum widths
and heights; sizes consist of a specific width and height.

Flutter 中的 widget 由在其底层的 [`RenderBox`][] 对象渲染而成。
渲染框由其父级 widget 给出约束，
并根据这些约束调整自身尺寸大小。
约束是由最小宽度、最大宽度、最小高度、最大高度四个方面构成；
尺寸大小则由特定的宽度和高度两个方面构成 。

Generally, there are three kinds of boxes,
in terms of how they handle their constraints:

一般来说，从如何处理约束的角度来看，有以下三种类型的渲染框：

* Those that try to be as big as possible.
  For example, the boxes used by [`Center`][] and
  [`ListView`][].

  尽可能大。比如 [`Center`][] 和 [`ListView`][] 的渲染框。

* Those that try to be the same size as their children.
  For example, the boxes used by [`Transform`][] and
  [`Opacity`][].

  与子 widget 一样大，比如 [`Transform`][] 和 [`Opacity`][] 的渲染框。

* Those that try to be a particular size.
  For example, the boxes used by [`Image`][] and
  [`Text`][].

  特定大小，比如 [`Image`][] 和 [`Text`][] 的渲染框。

Some widgets, for example [`Container`][],
vary from type to type based on their constructor arguments.
In the case of [`Container`][], it defaults
to trying to be as big as possible, but if you give it a `width`,
for instance, it tries to honor that and be that particular size.

对于一些诸如 [`Container`][] 的 widget，
其尺寸会因构造方法的参数而异，
就 [`Container`][] 来说，它默认是尽可能大的，
而一旦给它一个特定的宽度，
那么它就会遵照这个特定的宽度来调整自身尺寸。

Others, for example [`Row`][] and  (flex boxes)
vary based on the constraints they are given,
as described below in the "Flex" section.

其它一些像 [`Row`][] and [`Column`][] (flex boxes)这样的 widget ，
其尺寸会因给定的约束而异，具体细节见后文 "Flex" 部分；

The constraints are sometimes "tight",
meaning that they leave no room for the render box to decide on
a size (for example, if the minimum and maximum width are the same,
it is said to have a tight width). An example of this is the
`App` widget, which is contained by the [`RenderView`][]
class: the box used by the child returned by the
application's [`build`][] function is given a constraint
that forces it to exactly fill the application's content area
(typically, the entire screen).
Many of the boxes in Flutter, especially those that just take a
single child, pass their constraint on to their children.
This means that if you nest a bunch of boxes inside each other
at the root of your application's render tree,
they'll all exactly fit in each other, forced by these tight constraints.

约束有时是"紧密的"，这意味着这些约束严格地限定了
渲染框在定夺自身尺寸方面的空间（例如：当约束的最小宽度和最大宽度相同时，
这种情况下，我们称这个约束有紧密宽度），
这方面的主要例子是 App Widget，
它是 [`RenderView`][] 类里面的一个 widget: 
由应用程序的 [`build`][] 函数返回的子 widget 渲染框被指定了一个约束，
该约束强制 App Widget 精确填充应用程序的内容区域(通常是整个屏幕)。
Flutter 中的许多渲染框，特别是那些只包含单个 widget 的渲染框，
都会将自身的约束传递给他们的子级 widget。
这意味着如果你在应用程序渲染树的根部嵌套了一些渲染框，
这些框将会在受到约束的影响下相互适应彼此。

Some boxes _loosen_ the constraints,
meaning the maximum is maintained but the
minimum is removed. For example, [`Center`][].

有些渲染框**放松**了约束，即：约束中只有最大宽度，
最大高度，但没有最小宽度，最小高度，
例如 [`Center`][]。


## Unbounded constraints

无边界约束
---------------------

In certain situations, the constraint that is given to a box is
_unbounded_, or infinite. This means that either the maximum width or
the maximum height is set to `double.INFINITY`.

在某些情况下，传递给框的约束是 **无边界** 的或无限的。这意味着约束的最大宽度或最大高度为`double.INFINITY`。

A box that tries to be as big as possible won't function usefully when
given an unbounded constraint and, in debug mode, such a combination
throws an exception that points to this file.

当传递无边界约束给类型为尽可能大的框时会失效，在 debug 模式下，则会抛出异常，该异常信息会把你引导到本页面。

The most common cases where a render box finds itself with unbounded
constraints are within flex boxes
([`Row`][] and [`Column`][]),
and **within scrollable regions**
([`ListView`][] and other [`ScrollView`][] subclasses).

渲染框具有无边界约束的最常见情况是：
当其被置于 flex boxes ([`Row`][] 和 [`Column`][])内以及
**可滚动区域**([`ListView`][] 和其它 [`ScrollView`][] 的子类)内时。


In particular, [`ListView`][]
tries to expand to fit the space available
in its cross-direction (for example,
if it's a vertically-scrolling block,
it tries to be as wide as its parent).
If you nest a vertically scrolling [`ListView`][]
inside a horizontally scrolling `ListView`,
the inner one tries to be as wide as possible,
which is infinitely wide,
since the outer one is scrollable in that direction.

特别是 [`ListView`][] 会试图扩展以适应其交叉方向可用空间
(比如说，如果它是一个垂直滚动块，
它将试图扩充到与其父 widget 一样宽)。
如果让垂直滚动的 [`ListView`][] 
嵌套在水平滚动的 [`ListView`][]
内，那么被嵌套在里面的垂直滚动的 [`ListView`][]
将会试图尽可能宽，直到无限宽，
因为将其嵌套的是一个水平滚动的[`ListView`][]，
它可以在水平方向上一直滚动。

## Flex

Flex boxes themselves ([`Row`][] and [`Column`][])
behave differently based on whether they are in
bounded constraints or unbounded constraints in
their given direction.

Flex 框本身([`Row`][] 和 [`Column`][])的行为会有所不同，
这取决于其在给定方向上是处于有边界约束还是无边界约束。

In bounded constraints,
they try to be as big as possible in that direction.

在有边界约束条件下，它们在给定方向上会尽可能大。

In unbounded constraints,
they try to fit their children in that direction.
In this case, you cannot set `flex` on the children to
anything other than 0 (the default).
In the widget library, this means that you cannot use
[`Expanded`][] when the flex box is inside
another flex box or inside a scrollable. If you do,
you'll get an exception message pointing you at this document.

在无边界约束条件下，它们试图让其子 widget 自适应这个给定的方向。
在这种情况下，不能将子 widget 的`flex`属性设置为 0（默认值）以外的任何值。
这意味着在 widget 库中，
当一个 flex 框嵌套在另外一个 flex 框或者嵌套在可滚动区域内时，
不能使用 [`Expanded`][]。
如果这样做了，就会收到异常，该异常信息会把你引导到本页面。

In the _cross_ direction, for example, in the width for
[`Column`][] (vertical flex) or in the height for
[`Row`][] (horizontal flex), they must never be unbounded,
otherwise they would not be able to reasonably align their children.

在 **交叉** 方向上，如 [`Column`][]（垂直的 flex）的宽度和 
[`Row`][]（水平的 flex）的高度，它们必将不能是无界的，
否则它们将无法合理地对齐它们的子 widget。


[`build`]: {{site.api}}/flutter/widgets/State/build.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`Image`]: {{site.api}}/flutter/dart-ui/Image-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`Opacity`]: {{site.api}}/flutter/widgets/Opacity-class.html
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[`RenderView`]: {{site.api}}/flutter/rendering/RenderView-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`Transform`]: {{site.api}}/flutter/widgets/Transform-class.html
[Understanding constraints]: /docs/development/ui/layout/constraints

