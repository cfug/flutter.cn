---
title: "Basic Flutter layout concepts"
title: "Flutter 布局基础教程"
description: "A codelab that teaches basic Flutter layout concepts through DartPad examples and exercises."
description: "使用 DartPad2 工具教你如何构建 Flutter 布局"
toc: true
<<<<<<< HEAD
--- 

Welcome to the Flutter layout codelab, 
=======
---
Welcome to the Flutter layout codelab,
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
where you learn how to build a Flutter UI without
downloading and installing Flutter or Dart!

欢迎来到 Flutter 布局 codelab！
你将在这里学到如何构建 Flutter UI，
更棒的是这一切都不需要安装 Flutter 或者 Dart！

{{site.alert.important}}

  This codelab covers basic Flutter layout concepts using an
  experimental code editor called DartPad.
  DartPad hasn't been fully tested on all browsers.
  If you experience any difficulties while using DartPad
  on a specific browser, please create a [DartPad issue][]
  and specify which browser you're using in the issue title.

  这个 codelab 涵盖了 Flutter 的基本布局概念，
  并且将会使用一个叫做 DartPad 的实验性代码编辑器。
  DartPad 并没有在所有浏览器上进行严格测试，
  如果你在任何特定浏览器上使用 DartPad 遇到了问题，
  请创建一个 [DartPad issue][] 并指明是哪个浏览器。

{{site.alert.end}}

Flutter is different from other frameworks because its UI
is built in code, not (for example) in an XML file or similar.
Widgets are the basic building blocks of a Flutter UI.
As you progress through this codelab,
you'll learn that almost everything in Flutter is a widget.
A widget is an immutable object that describes a specific part of a UI.
You'll also learn that Flutter widgets are composable, meaning,
that you can combine existing widgets to make more sophisticated widgets.
At the end of this codelab,
you'll get to apply what you've learned
into building a Flutter UI that displays a business card.

Flutter 与其他框架有着明显的差异，
原因在于它使用代码来构建 UI，而不是 XML 或其他东西。
其中，Widget 是构建 Flutter UI 的基本单元。
当你逐渐深入这个 codelab，你将会发现在 Flutter 中几乎所有的东西都是 Widget。
Widget 是一个不会改变的对象，它是 UI 中一个特定部分的描述。
你还会学到 Flutter 的 Widget 非常容易组合，
这意味着你能够通过组合已有的 Widgets 来创造更多复杂的 Widgets。
到这篇文章的最后，你会运用这里所学的知识构建一个显示名片的 Flutter UI。

**Estimated time to complete this codelab: 45-60 minutes.**

**本 codelab 的预期完成时间约为 45 - 60 分钟**

## Row and Column classes
<<<<<<< HEAD

## Row 和 Column 类

`Row` and `Column` are classes that contain and lay out widgets. 
Widgets inside of a `Row` or `Column` are called *children*, 
and `Row` and `Column` are referred to as *parents*. 
`Row` lays out its widgets horizontally, 
and `Column` lays out its widgets vertically. 
=======
`Row` and `Column` are classes that contain and lay out widgets.
Widgets inside of a `Row` or `Column` are called *children*,
and `Row` and `Column` are referred to as *parents*.
`Row` lays out its widgets horizontally,
and `Column` lays out its widgets vertically.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621

`Row` 和 `Column` 是两个用来容纳和布局 Widgets 的类。
在它们内部的 Widgets 我们称为 *children*，
`Row` 和 `Column` 就作为它们的父级。
`Row` 将会让 Widgets 水平排列，而 Column 则会让其竖直排列。

#### Example: Creating a Column
{:.no_toc}

#### 样例：创建一个 Column
{:.no_toc}

{{site.alert.secondary}}
<<<<<<< HEAD

=======
{:.no_toc}
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
  The following example displays the differences between
  a `Row` and `Column`.

  下面的样例将会显示 `Row` 和 `Column` 的区别。

1. Click the **Run** button.

   点击 **运行** 按钮。

2. In the code, change the `Row` to a `Column`, and run again.

   在这段代码中，将 `Row` 改为 `Column` 并再次运行。

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/4e11c4a7ec824685f963f25d7c30ba0b
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=4e11c4a7ec824685f963f25d7c30ba0b&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## Axis size and alignment

<<<<<<< HEAD
## 轴大小和对齐方式

So far, the `BlueBox` widgets have been squished together 
=======
So far, the `BlueBox` widgets have been squished together
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
(either to the left or at the top of the UI Output).
You can change how the `BlueBox` widgets are spaced
out using the axis size and alignment properties.

至此，`BlueBox` widget 已经在一起被压扁了（在界面的左边或者上面）。
你可以通过轴大小和对齐属性来改变 `BlueBox` Widget 的间距。

### mainAxisSize property

<<<<<<< HEAD
### mainAxisSize 属性

`Row` and `Column` occupy different main axes. 
A `Row`'s main axis is horizontal, 
and a `Column`'s main axis is vertical. 
=======
`Row` and `Column` occupy different main axes.
A `Row`'s main axis is horizontal,
and a `Column`'s main axis is vertical.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
The `mainAxisSize` property determines how much
space a `Row` and `Column` can occupy on their main axes.
The `mainAxisSize` property has two possible values:

`Row` 和 `Column`分别占据了不同的主轴。`Row` 的主轴是水平的。
 `mainAxisSize` 决定了 `Row` 和 `Column` 能够在主轴上占据多大空间。
`mainAxisSize` 有两个可选属性：

`MainAxisSize.max`
<<<<<<< HEAD
<br> `Row` and `Column` occupy all of the space on their main axes.
  If the combined width of their children is 
  less than the total space on their main axes, 
=======
: `Row` and `Column` occupy all of the space on their main axes.
  If the combined width of their children is
  less than the total space on their main axes,
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
  their children are laid out with extra space.

`MainAxisSize.max`
<br>  `Row` 和 `Column` 占据它们主轴上所有空间。
  如果子 Widget 的总宽度小于主轴上的空间，它们就会充满剩余的空间。

`MainAxisSize.min`
<br> `Row` and `Column` only occupy enough space on their main axes
  for their children. Their children are laid out without extra space
  and at the middle of their main axes.

`MainAxisSize.min`
<br>  `Row` 和 `Column` 仅占据它的 children 在主轴上所需的空间，
  它的 children 在主轴之间将没有额外空间。

{{site.alert.tip}}
<<<<<<< HEAD

  `MainAxisSize.max` is the `mainAxisSize` property's default value. 
  If you don't specify another value, 
  the default value is used, 
  as shown in the previous example. 

  `mainAxisSize` 默认为 `MainAxisSize.max`。
  如果你不特别指定其他的值，就会使用默认值，就像我们前一个样例中展示的那样。

=======
  `MainAxisSize.max` is the `mainAxisSize` property's default value.
  If you don't specify another value,
  the default value is used,
  as shown in the previous example.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}

#### Example: Modifying axis size
{:.no_toc}

#### 样例：自定义轴大小
{:.no_toc}

{{site.alert.secondary}}

  The following example explicitly sets `mainAxisSize`
  to its default value, `MainAxisSize.max`.

<<<<<<< HEAD
  下面的样例将会特别指定 `mainAxisSize` 为其默认值 `MainAxisSize.max`。

**1.** Click the **Run** button. 

       点击**运行**按钮。

**2.** Change `MainAxisSize.max` to `MainAxisSize.min`,
         and run again.

       将 `MainAxisSize.max` 改为 `MainAxisSize.min`，并再次运行。 

=======
  **1.** Click the **Run** button.

  **2.** Change `MainAxisSize.max` to `MainAxisSize.min`,
         and run again.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/d852e4f07d6c87600fe8e0f186c7a31b
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=d852e4f07d6c87600fe8e0f186c7a31b&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

### mainAxisAlignment property

<<<<<<< HEAD
### mainAxisAlignment 属性 

When `mainAxisSize` is set to `MainAxisSize.max`, 
`Row` and `Column` might lay out their children with extra space. 
The `mainAxisAlignment` property determines how `Row` and `Column` 
can position their children in that extra space. 
`mainAxisAlignment` has six possible values: 
=======
When `mainAxisSize` is set to `MainAxisSize.max`,
`Row` and `Column` might lay out their children with extra space.
The `mainAxisAlignment` property determines how `Row` and `Column`
can position their children in that extra space.
`mainAxisAlignment` has six possible values:
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621

当 `mainAxisSize` 被设为 `MainAxisSize.max`,
`Row` 和 `Column` 将会使用额外空间来对齐它的 children。
`mainAxisAlignment` 属性决定了 `Row` 和 `Column` 将会在额外空间中如何对齐它的 children。
`mainAxisAlignment` 有以下六个可选属性：

`MainAxisAlignment.start`
<<<<<<< HEAD
<br> Positions children near the beginning of the main axis. 
=======
: Positions children near the beginning of the main axis.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
  (Left for `Row`, top for `Column`)

`MainAxisAlignment.start`
<br> 将其 children 从主轴起点处开始对齐。（`Row` 的起点在左边，`Column` 的起点在顶部）

`MainAxisAlignment.end`
<<<<<<< HEAD
<br> Positions children near the end of the main axis. 
=======
: Positions children near the end of the main axis.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
  (Right for `Row`, bottom for `Column`)

`MainAxisAlignment.end`
<br> 将其 children 从主轴终点处开始对齐。（`Row` 的终点在右边，`Column` 的终点在底部）

`MainAxisAlignment.center`
<br> Positions children at the middle of the main axis.

`MainAxisAlignment.center`
<br> 将其 children 置于主轴中心。

`MainAxisAlignment.spaceBetween`
<br> Divides the extra space evenly between children.

`MainAxisAlignment.spaceBetween`
<br> 在 children 之间平均分配额外空间。

`MainAxisAlignment.spaceEvenly`
<br> Divides the extra space evenly between children
  and before and after the children.
  
`MainAxisAlignment.spaceEvenly`
<br> 在 children 之间，以及第一个 children 之前和最后一个 children 之后，平均分配额外空间。

`MainAxisAlignment.spaceAround`
<br> Similar to `MainAxisAlignment.spaceEvenly`,
  but reduces half of the space before the first
  child and after the last child
  to half of the width between the children.

`MainAxisAlignment.spaceAround`
<br> 与 `MainAxisAlignment.spaceEvenly` 相似，
  但在第一个 child 之前以及最后一个孩子之后减少了一半的空间，
  让其 children 之间宽度缩减一半。

#### Example: Modifying main axis alignment
{:.no_toc}

#### 样例：自定义主轴对齐方式
{:.no_toc}

{{site.alert.secondary}}

  The following example explicitly sets
  `mainAxisAlignment` to its default value,
  `MainAxisAlignment.start`.

  下面的样例将特别指定 `mainAxisAlignment` 为其默认值，
  `MainAxisAlignment.start`。

**1.** Click the **Run** button.

       点击**运行**按钮。

**2.** Change `MainAxisAlignment.start` to
         `MainAxisAlignment.end`, and run again.

       将 `MainAxisAlignment.start` 改为 `MainAxisAlignment.end`，
       然后再次运行。

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/cb8abed13f90a6a0c7a0ada6f15a09c9
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=cb8abed13f90a6a0c7a0ada6f15a09c9&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>
{{site.alert.tip}}

  Before moving to the next section,
  change `MainAxisAlignment.end` to another value.

  在阅读下一个小节之前，将 `MainAxisAlignment.end` 换成其他值试试看。

{{site.alert.end}}

### crossAxisAlignment property

<<<<<<< HEAD
### crossAxisAlignment 属性

The `crossAxisAlignment` property determines 
=======
The `crossAxisAlignment` property determines
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
how `Row` and `Column` can position their children
on their cross axes.
A `Row`'s cross axis is vertical,
and a `Column`'s cross axis is horizontal.
Most of the `crossAxisAlignment` property's values
only work with the `Row` class.
The `crossAxisAlignment` property has five possible values:

`crossAxisAlignment` 属性决定了 `Row` 和 `Column`
能够如何在其横轴上定位 children。
`Row` 的横轴是竖直的，而 `Column` 则是水平的。
绝大多数 `crossAxisAlignment` 属性仅在 `Row` 中生效。
`crossAxisAlignment` 属性有五个可选属性：

`CrossAxisAlignment.start`
<br> Positions children near the top of the cross axis. (`Row` only)

`CrossAxisAlignment.start`
<br> 将其 children 横轴顶部对齐。（只在 `Row` 中生效）

`CrossAxisAlignment.end`
<br> Positions children near the bottom of the cross axis. (`Row` only)

`CrossAxisAlignment.end`
<br> 将其 children 横轴底部对齐。（只在 `Row` 中生效）

`CrossAxisAlignment.center`
<br> Positions children at the middle of the cross axis. (`Row` only)

`CrossAxisAlignment.center`
<br> 将其 children 横轴中心对齐。（只在 `Row` 中生效）

`CrossAxisAlignment.stretch`
<<<<<<< HEAD
<br> Stretches children across the cross axis. 
=======
: Stretches children across the cross axis.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
  (Top-to-bottom for `Row`, left-to-right for `Column`)

`CrossAxisAlignment.stretch`
<br>沿横轴延伸 children。（在 `Row` 中是从顶至底，`Column` 则是从左至右）

`CrossAxisAlignment.baseline`
<br> Aligns children by their character baselines.
  (`Text` class only, and requires that the
  `textBaseline` property is set to
  `TextBaseline.alphabetic`.  See the
  [Text widget](#text-widget) section for an example.)

`CrossAxisAlignment.baseline`
<br> 根据 children 的基线对子节点。
  （仅限`Text`类，并要求 `textBaseline` 属性设置为
  `TextBaseline.alphabetic`。
  在 [Text class](#text-class) 小节中查看样例。

#### Example: Modifying cross axis alignment
{:.no_toc}

#### 样例：自定义横轴对齐方式
{:.no_toc}

{{site.alert.secondary}}

  The following example explicitly sets `crossAxisAlignment`
  to its default value, `CrossAxisAlignment.center`.

  下面的样例将特别指定 `crossAxisAlignment` 为其默认值，
   `CrossAxisAlignment.center`。

  To demonstrate cross axis alignment,
  `mainAxisAlignment` is set to
 `MainAxisAlignment.spaceAround`,
  and `Row` now contains a `BiggerBlueBox` widget
  that is taller than the `BlueBox` widgets.

  为了演示横轴对齐方式，`mainAxisAlignment` 被设为
  `MainAxisAlignment.spaceAround`，`Row` 现在包含一个比
  “BlueBox” Widget 更高的 `BiggerBlueBox` Widget。

**1.** Click the **Run** button.

       点击**运行**按钮

**2.** Change `CrossAxisAlignment.center` to
         `CrossAxisAlignment.start`, and run again.

       将 `CrossAxisAlignment.center` 改为 `CrossAxisAlignment.start`，并再次运行。

<<<<<<< HEAD
=======
  **2.** Change `CrossAxisAlignment.center` to
         `CrossAxisAlignment.start`, and run again.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/70a6eb88f13019eec349a57bc4fd5fe0
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=70a6eb88f13019eec349a57bc4fd5fe0&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>
{{site.alert.tip}}

  Before moving to the next section,
<<<<<<< HEAD
  change `CrossAxisAlignment.start` to another value. 

  在阅读下一个小节之前，将 `CrossAxisAlignment.start` 改为其他值试试。

=======
  change `CrossAxisAlignment.start` to another value.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}

## Flexible widget

As you've seen, the `mainAxisAlignment` and
`crossAxisAlignment` properties determine
how `Row` and `Column` position widgets along both axes.
`Row` and `Column` first lay out widgets of a fixed size.
Fixed size widgets are considered *inflexible* because
they can't resize themselves after they've been laid out.

正如你所看到，`mainAxisAlignment` 和 `crossAxisAlignment` 属性
决定了 `Row` 和 `Column`在各个轴上如何布局 widget。
`Row` 和 `Column` 首先布置固定大小的 widget。
固定大小的小部件被认为是 **不灵活的** 因为它们布局后无法自我调整大小。

The `Flexible` widget wraps a widget,
so the widget becomes resizable.
When the `Flexible` widget wraps a widget,
the widget becomes the `Flexible` widget's child
and is considered *flexible*.
After inflexible widgets are laid out,
the widgets are resized according to their
`flex` and `fit` properties.:

`Flexible` widget 包裹一个 widget 让这个 widget 变得可以调整大小。
当 `Flexible` widget 包裹 widget 时，
这个 Widget 就成为 `Flexible` widget 的子节点，
并被视为 *flexible* 的。在布置固定大小的 widget 后，
Flex 的 widget 根据其 `flex` 和 `fit` 属性调整大小：

`flex`
<br> Compares itself against other `flex`
  properties before determining what fraction of the
  total remaining space each `Flexible` widget receives.

<<<<<<< HEAD
`flex`
<br> 将自身的 `flex` 因子与其他的比较，以决定自身占剩余空间的比例。

`fit` 
<br> Determines whether a `Flexible` widget
=======
`fit`
: Determines whether a `Flexible` widget
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
  fills all of its extra space.

`fit`
<br> 决定 `Flexible` 的 Widget 是否能够填充所有剩余空间。 

#### Example: Changing fit properties
{:.no_toc}
<<<<<<< HEAD

#### 样例：改变 fit 属性
{:.no_toc}

=======
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.secondary}}

  The following example demonstrates the `fit` property,
  which can have one of two values:

  下面的样例演示了 `fit` 属性，它可以使用这两个值之一：

  `FlexFit.loose`
  <br> The widget's preferred size is used. (Default)

  `FlexFit.loose`
  <br> 使用 Widget 的自身作为首选大小。（默认情况下）

  `FlexFit.tight`
  <br> Forces the widget to fill all of its extra space. 
  
  `FlexFit.tight`
<<<<<<< HEAD
  <br> 强制 Widget 充满所有剩余空间。
=======
  : Forces the widget to fill all of its extra space.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621

  In this example, change the `fit` properties to
  make the `Flexible` widgets fill the extra space.

<<<<<<< HEAD
  在这个样例中，改变 `fit` 属性使 `Flexible` widgets
  能够填充剩余空间。

**1.** Click the **Run** button. 

       点击**运行**按钮

**2.** Change both `fit` values to `FlexFit.tight`, 
         and run again.

       将所有 `fit` 的值设为 `FlexFit.tight`，并再次运行。

=======
  **1.** Click the **Run** button.

  **2.** Change both `fit` values to `FlexFit.tight`,
         and run again.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/ba0f40356d1023066d960f6de2be1a4b
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=ba0f40356d1023066d960f6de2be1a4b&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

#### Example: Testing flex values
{:.no_toc}

#### 样例：测试 flex 值
{:.no_toc}

{{site.alert.secondary}}

  In the following example,
  `Row` contains one `BlueBox` widget
  and two `Flexible` widgets that wrap two
  `BlueBox` widgets.  The `Flexible` widgets
  contain `flex` properties with `flex`
  values set to 1 (the default value).

<<<<<<< HEAD
  在下面这个例子中，`Row` 包含了一个 `BlueBox` widget 和
  两个 `Flexible` widgets 包裹的 `BlueBox` Widget。
  `Flexible` widgets 包含了 `flex` 属性，并将其值设为 1。（默认值）

  When `flex` properties are compared against one another, 
  the ratio between their `flex` values determines 
=======
  When `flex` properties are compared against one another,
  the ratio between their `flex` values determines
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
  what fraction of the total remaining space each
  `Flexible` widget receives.

  当 `flex` 属性互相比较时，它们的 `flex` 值的比率决定了 `Flexible` Widget
  自身所占剩余空间的比例。

  ```dart
  remainingSpace * (flex / totalOfAllFlexValues)
  ```

  In this example, the sum of the `flex` values (2),
  determines that both `Flexible` widgets receive
  half of the total remaining space.
  The `BlueBox` widget (or fixed-size widget)
  remains the same size.

  在这个例子中，`flex` 值的总和为（2），这决定了每个 `Flexible` widgets 
  都能分到总剩余空间的一半空间。`BlueBox` widget（或是 fixed-size widget）得到了相同的大小。

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/82e4dd24028034ae03ba0ddc71bf59e5
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=82e4dd24028034ae03ba0ddc71bf59e5&amp;fw=true&amp;split=60" width="100%" height="400px"></iframe>
{{site.alert.tip}}

  Before moving to the next example,
  try changing the `flex` properties to other values,
  such as 2 and 1.

  在阅读下个样例之前，尝试将 `flex` 属性转换为其他值，例如 2 和 1。

{{site.alert.end}}

## Expanded widget

Similar to `Flexible`, the `Expanded` widget can
wrap a widget and force the widget to fill extra space.

`Expanded` widget 能够包裹一个 Widget 并强制其填满剩余空间，
与 `Flexible` 非常相似。

{{site.alert.tip}}
  
  **What's the difference between Flexible and Expanded?**
  Use `Flexible` to resize widgets in a `Row` or `Column`.
  That way, you can adjust a child widget's spacing
  while keeping its size in relation to its parent widget.
  `Expanded` changes the constraints of a child widget,
  so it fills any empty space.
<<<<<<< HEAD

  **Flexible 和 Expanded 有何不同呢？**
  使用 `Flexible` 在  `Row` 或 `Column` 中重新调整 widgets 的大小。
  这样，你就可以调整子 Widget 的间距同时保持其相对于父 Widget  的大小。
  `Expanded`改变子窗口小部件的约束， 所以它会填补全部空白空间。

{{site.alert.end}} 
=======
{{site.alert.end}}
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621

#### Example: Filling extra space
{:.no_toc}

#### 样例：填补额外空间
{:.no_toc}

{{site.alert.secondary}}

  The following example demonstrates how the
  `Expanded` widget forces its child widget to
  fill extra space.

<<<<<<< HEAD
**1.** Click the **Run** button.

       点击**运行**按钮 

**2.** Wrap the second `BlueBox` widget in an `Expanded` widget. 

       在第二个 `BlueBox` widget 外包裹一个 `Expanded` widget。

For example: 

例如：

```dart
Expanded(child: BlueBox(),),
```
**3.** Select the **Format** button to properly format the code, and run again. 
        
       点击 **Format (格式化)** 按钮格式化你的代码，再重新运行一次。
         
=======
  **1.** Click the **Run** button.

  **2.** Wrap the second `BlueBox` widget in an `Expanded` widget.

  For example:

  ```dart
  Expanded(child: BlueBox(),),
  ```
  **3.** Select the **Format** button to properly format the code,
         and run again.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/77021d2ed15f9ece850de15e73c47526
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=77021d2ed15f9ece850de15e73c47526&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## SizedBox widget

The `SizedBox` widget can be used in one of two ways when
creating exact dimensions.
When `SizedBox` wraps a widget, it resizes the widget
using the `height` and `width` properties.
When it doesn't wrap a widget,
it uses the `height` and `width` properties to
create empty space.

<<<<<<< HEAD
`SizedBox` widget 的两种用途之一就是创建精确的尺寸。
当 `SizedBox` 包裹了一个 Widget 时，
它会使用 `height` 和 `width` 调整其大小。
如果它没有包裹 Widget，
它可以使用`height`和`width`属性创造空的空间。

#### Example: Resizing a widget 
=======
#### Example: Resizing a widget
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{:.no_toc}

#### 样例：调整一个 Widget
{:.no_toc}

{{site.alert.secondary}}
  The following example wraps the middle `BlueBox` widget inside of a
  `SizedBox` widget and sets the `BlueBox`'s width to 100 logical pixels.

  下面的样例使用 `SizedBox` widget 包裹了中间的 `BlueBox` widget，
  并将 `BlueBox` 的宽度设为 100 逻辑像素。

**1.** Click the **Run** button.

       点击**运行**按钮

**2.** Add a `height` property equal to 100 logical pixels
         inside the `SizedBox` widget, and run again. 

       将 `SizedBox` widget 中的 `height` 设为 100 逻辑像素，并重新运行。

<<<<<<< HEAD
=======
  **2.** Add a `height` property equal to 100 logical pixels
         inside the `SizedBox` widget, and run again.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/6582851e85b57180ff5321f814fabb81
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=6582851e85b57180ff5321f814fabb81&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

<<<<<<< HEAD
#### Example: Creating space 

#### 样例：创建空间

=======
#### Example: Creating space
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{:.no_toc}
{{site.alert.secondary}}

  The following example contains three `BlueBox` widgets
  and one `SizedBox` widget that separates the first
  and second `BlueBox` widgets. The `SizedBox` widget
  contains a `width` property equal to 50 logical pixels.

  下面的样例将会包含三个 `BlueBox` widget，
  其中 第一个和第二个 `BlueBox` widget 包裹 `SizedBox`。
  `SizedBox` widget 的 `width` 设为 50 逻辑像素。

**1.** Click the **Run** button.

       点击**运行**按钮

<<<<<<< HEAD
**2.** Create more space by adding another
         `SizedBox` widget (25 logical pixels wide) 
=======
  **2.** Create more space by adding another
         `SizedBox` widget (25 logical pixels wide)
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
         between the second and third `BlueBox` widgets,
         and run again.

       通过在第二个和第三个 `BlueBox` widget 之间
       添加另一个 `SizedBox` widget (宽 25 逻辑像素)以创建更多空间。 

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/19ead147ab5c7668d7d32e1cfed90097
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=19ead147ab5c7668d7d32e1cfed90097&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## Spacer widget

Similar to `SizedBox`, the `Spacer` widget also
can create space between widgets.

与 `SizedBox` 相似，`Spacer` widget 也能在 Widgets 之间创建空间。

{{site.alert.tip}}

  **What's the difference between SizedBox and Spacer?**
  Use `Spacer` when you want to create space using a `flex` property.
  Use `SizedBox` when you want to create space
  using a specific number of logical pixels.
<<<<<<< HEAD

  **SizedBox 和 Spacer 有何不同？**
  如果你想用 `flex` 属性创建一段空间，请使用 `Spacer`。
  如果你想创建一个拥有特定逻辑像素值的空间，请使用 `SizedBox`。

{{site.alert.end}} 
=======
{{site.alert.end}}
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621

#### Example: Creating more space
{:.no_toc}

#### Example：创建更多空间
{:.no_toc}

{{site.alert.secondary}}

  The following example separates the first two
  `BlueBox` widgets using a `Spacer` widget with
  a `flex` value of 1.

  下面的样例使用 `flex` 值为 1 的 `Spacer` widget，
  分隔最初的两个 `BlueBox` widget。

**1.** Click the **Run** button.

       点击**运行**按钮

**2.** Add another `Spacer` widget (also with a `flex` value of 1)
         between the second and third `BlueBox` widgets.

       在第二个和第三个 `BlueBox` widget 之间添加另一个 `Spacer` widget。（flex 值仍然为 1）

<<<<<<< HEAD
=======
  **2.** Add another `Spacer` widget (also with a `flex` value of 1)
         between the second and third `BlueBox` widgets.
>>>>>>> 5e57b0a83f6610408035e1689be6493976052621
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/bfc367aefde35e02ea5283efdbf58e60
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=bfc367aefde35e02ea5283efdbf58e60&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## Text widget

The `Text` widget displays text and can be configured
for different fonts, sizes, and colors.

`Text` widget 不仅能够显示文字，并能够配置不同的字体，大小和颜色。

#### Example: Aligning text
{:.no_toc}

#### 样例：文字对齐
{:.no_toc}

{{site.alert.secondary}}
  The following example displays "Hey!" three times,
  but at different font sizes and in different colors.
  `Row` specifies the `crossAxisAlignment`
  and `textBaseline` properties.

  下面的样例将会显示三次"Hey!"，但是使用不同的字体和不同颜色。
  特别指定 `Row` 的 `crossAxisAlignment` 和 `textBaseline` 属性。

**1.** Click the **Run** button. 

       点击**运行**按钮

**2.** Change `CrossAxisAlignment.center` to
         `CrossAxisAlignment.baseline`, and run again.

       将 `CrossAxisAlignment.center` 改为 `CrossAxisAlignment.baseline`，然后再次运行。
       
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/0ff109090b99ef1873d9fad501b2bc86
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=0ff109090b99ef1873d9fad501b2bc86&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## Icon widget

The `Icon` widget displays a graphical symbol
that represents an aspect of the UI.
Flutter is preloaded with icon packages for
[Material][] and [Cupertino][] applications.

`Icon` Widget 能够显示图形符号，这代表了 UI 的一个方面。
Flutter 将会为 [Material][] 和 [Cupertino][]
的应用提前加载 icon packages。

#### Example: Creating an Icon
{:.no_toc}

#### 样例：创建一个 Icon
{:.no_toc}

{{site.alert.secondary}}
  The following example displays the widget `Icons.widget`
  from the [Material Icon library][] in red and blue.

  下面的样例显示了来自 [Material Icon library][] 的红蓝 `Icons.widget` Widget。

**1.** Click the **Run** button. 

       点击**运行**按钮

**2.** Add another `Icon` from the 
         [Material Icon library][]
         with a size of 50.

       添加另一个来自 [Material Icon library][] 的 `Icon` 并将其大小设为 50。

**3.** Give the `Icon` a color of `Colors.amber` from the 
         [Material Color palette][], and run again.  

       给 `Icon` 设置一个来自 [Material Color palette][] 的 `Colors.amber` 色，然后再次运行。

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/01688fca8c13f85d93078054af2e858b
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=01688fca8c13f85d93078054af2e858b&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## Image widget

The `Image` widget displays an image.
You either can reference images using a URL,
or you can include images inside your app package.
Since DartPad can't package an image,
the following example uses an image from the network.

`Image` widget 显示了一张图片。你还能够直接引用图片 URL，
或是你的应用 package 中的图片。但是由于 DartPad 无法引用包图片，
所以下面的样例将会使用网络上的图片。  

#### Example: Displaying an image
{:.no_toc}

#### 样例：显示一张图片
{:.no_toc}

{{site.alert.secondary}}

  The following example displays an image that's
  stored remotely on [GitHub][].
  The `Image.network` method takes a string
  parameter that contains an image's URL.

  下面的样例将会显示一张储存在远端 [GitHub][] 上的图片。
  `Image.network` 方法接收一个含有图片 url 的字符串。

  In this example, `Image.network` contains a short URL. 

  在这个样例中，`Image.network` 包含了一个短小的 URL。

**1.** Click the **Run** button. 

       点击**运行**按钮

**2.** Change the short URL to the actual URL: 

       将短 URL 替换为实际 URL：

  `https://github.com/flutter/website/blob/master/examples/layout/sizing/images/pic3.jpg?raw=true`

**3.** Then change `pic3.jpg` to `pic1.jpg` or `pic2.jpg`, 
         and run again. 

       然后将 `pic3.jpg` 改为 `pic1.jpg` 或 `pic2.jpg`，然后重新运行。

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/b6f3084800bd139cdb522b8858bb58b7
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=b6f3084800bd139cdb522b8858bb58b7&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## Putting it all together

## 综合练习

You're almost at the end of this codelab. 
If you'd like to test your knowledge of the
techniques that you've learned, why not apply
those skills into building a Flutter UI that
displays a business card!

你就要完成这个 codelab 了！如果你想要检验你刚学的知识，
为何不讲这些结合起来，构建一个显示名片的 Flutter UI 呢！

 ![Completed business card]({% asset codelab/layout/businesscarddisplay1.png
 @path%}){:width="400px"}{:.text-center}

You'll break down Flutter's layout into parts,
which is how you'd create a Flutter UI in the real world.

你将会把 Flutter 的布局分解成几个部分，这就是如何在实际开发中构建 Flutter UI 方式！

In [Part 1](#part-1),
you'll implement a `Column` that contains the name and title.
Then you'll wrap the `Column` in a `Row` that contains the icon,
which is positioned to the left of the name and title.

在[第一部分](#part-1), 你将会实现包含姓名和标题的 `Column`。
然后你将会在 `Column` 包裹一个含有 icon 的 `Row`，
它将会被放在姓名和标题的左边。

 ![Completed business card]({% asset codelab/layout/businesscarddisplay2.png
 @path%}){:width="400px"}{:.text-center}

In [Part 2](#part-2), you'll wrap the `Row` in a `Column`,
so the code contains a `Column` within a `Row` within a `Column`.
Then you'll tweak the outermost `Column`'s layout,
so it looks nice.
Finally, you'll add the contact information
to the outermost `Column`'s list of children,
so it's displayed below the name, title, and icon.

在[第二部分](#part-2)中，你将会在 `Row` 外包裹一个 `Column`，
所以你的代码中就包含了
一个 Column（Row（Column））。然后你将调整最外面的`Column`的布局，
所以它看起来不错。最后，您将添加联系信息到最外面的`Column`的 children 中，
所以它将显示在名称，标题和图标下方。

 ![Completed business card]({% asset codelab/layout/businesscarddisplay3.png
 @path%}){:width="400px"}{:.text-center}

In [Part 3](#part-3), you'll finish building
the business card display by adding four more icons,
which are positioned below the contact information.

在[第三部分](#part-3)，你将会完成添加了更多图标的名片，
它们会被放在联系信息的下方。

 ![Completed business card]({% asset codelab/layout/businesscarddisplay4.png
 @path %}){:width="400px"}{:.text-center}

### Part 1
{:.no_toc}

### 第一部分
{:.no_toc}


#### Exercise: Create the name and title
{:.no_toc}

#### 练习：创建 name 和 title
{:.no_toc}

{{site.alert.secondary}}

  Implement a `Column` that contains two text widgets:

  实现含有两个 Text Widget 的 `Column`：

<ul markdown="1">
  <li markdown="1">
  
  <t>The first `Text` widget has the name `Flutter McFlutter` and
  the `style` property set to `Theme.of(context).textTheme.headline`. </t>
  <t>第一个 `Text` widget 有一个叫做 `Flutter McFlutter` 的名字，
  并将其 `style` 属性设为 `Theme.of(context).textTheme.headline`。</t>
  
  </li>
  <li markdown="1">
  <t>The second `Text` widget contains the title `Experienced Developer`.</t>
  <t>第二个 `Text` widget 包含了标题 `Experienced Developer`。</t>
  </li>
</ul>
 
  For the `Column`, 
  set `mainAxisSize` to `MainAxisSize.min` 
  and `crossAxisAlignment` to `CrossAxisAlignment.start`.  

  对于这个 `Column`，将其 `mainAxisSize` 设为 `MainAxisSize.min`，
  `crossAxisAlignment` 设为 `CrossAxisAlignment.start`。
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/30ccbe0fcf31cc10eafba3aea8ff0697
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=30ccbe0fcf31cc10eafba3aea8ff0697&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

#### Exercise: Wrap the Column in a Row
{:.no_toc}

#### 练习：在 Column 外包裹一个 Row
{:.no_toc}

{{site.alert.secondary}}

  Wrap the `Column` you implemented in a
  `Row` that contains the following widgets:

  你将在下面的 Widgets 中实现 `Row` 包裹一个 `Column`：ßß

<ul markdown="1">
  <li markdown="1">
  <t>An `Icon` widget set to `Icons.account_circle`
  and with a size of 50 pixels.</t>
  <t>将一个 `Icon` widget 设为 `Icons.account_circle`，
  并设为 50 像素大小。</t>

  </li>
  <li markdown="1">
  <t>A `Padding` widget that creates a space of 8
  pixels around the `Icon` widget. 
  To do this, you can specify `const EdgeInsets.all(8.0)`
  for the `padding` property.
  The `Row` should look like this: </t>
  <t>在 `Icon` widget外包裹一个 `Padding` widget 以在其周围创建 8 像素的空间。
  为了完成这个，你可以指定其 `padding` 属性为 `const EdgeInsets.all(8.0)`。
  这个 `Row` 看上去会像这样：</t>

  </li>
</ul>

  ```dart
     Row(
       children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Icon(Icons.account_circle, size: 50),
        ),
        Column( ... ), // <--- The Column you first implemented
      ],
     );
  ```
{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/95dcc1451aea8412669c41eb8a1a5f23
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=95dcc1451aea8412669c41eb8a1a5f23&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

### Part 2
{:.no_toc}

### 第二部分
{:.no_toc}

#### Exercise: Tweak the layout
{:.no_toc}

#### 练习：调整布局
{:.no_toc}

{{site.alert.secondary}}

  Wrap the `Row` in a `Column` that has a `mainAxisSize`
  property set to `MainAxisSize.min` and a
  `crossAxisAlignment` property set to `CrossAxisAlignment.stretch`.
  The `Column` contains the following widgets:

  将 `Column` 包裹在 `Row` 外面，并将其 `mainAxisSize` 属性设为 `MainAxisSize.min`，
  `crossAxisAlignment` 属性设为 `CrossAxisAlignment.stretch`。
  这个 `Column` 将包含以下 widgets：

  * A `SizedBox` widget with a height of 8.

    一个高度为 8 的 `SizedBox` widget。

  * An empty `Row` where you'll add the contact information in
    a later step.

    一个空的 `Row`，你等会将用它来添加联系方式。

  * A second `SizedBox` widget with a height of 16.

    第二个高度为 16 的 `SizedBox` widget。

  * A second empty `Row` where you'll add
    four icons (Part 3).

    第二个空的 `Row`，你将会添加四个图标。（第三部分）

  The `Column`'s list of widgets should be formatted as follows, 
  so the contact information and icons are displayed below the
  name and title:

  `Column` Widget 的列表格式应该如下一样，
  联系信息和图标显示在名称和头衔下方：

  ```dart

     ],
    ), // <--- Closing parenthesis for the Row
    SizedBox(),
    Row(), // First empty Row
    SizedBox(),
    Row(), // Second empty Row
   ],
  ); // <--- Closing parenthesis for the Column that wraps the Row

  ```

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/c3ac34ed8952724a0ecb0af1445c2af8
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=c3ac34ed8952724a0ecb0af1445c2af8&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

#### Exercise: Enter contact information
{:.no_toc}

#### 练习：输入联系信息
{:.no_toc}

{{site.alert.secondary}}

  Enter two `Text` widgets inside the first empty `Row`:
  
  在第一个空的 `Row` 中，添加两个 `Text` widget。

<ul markdown="1">
  <li markdown="1">  
  <t>The first `Text` widget contains the address `123 Main Street`.</t><t>第一个 `Text` widget 包含了 `123 Main Street` 的地址。</t>
  </li>
  <li markdown="1">
  <t>The second `Text` widget contains the phone number `(415) 555-0198`.</t><t>第二个 `Text` widget 包含了电话号`(415) 555-0198`。</t>
  </li>
</ul>

  For the first empty `Row`,
  set the `mainAxisAlignment` property to
  `MainAxisAlignment.spaceBetween`.

  对于第一个空的 `Row`，将 `mainAxisAlignment`
  属性设为 `MainAxisAlignment.spaceBetween`。

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/c5be61116652927c5d92262fce1b5360
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=c5be61116652927c5d92262fce1b5360&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

### Part 3
{:.no_toc}

### 第三部分
{:.no_toc}

#### Exercise: Add four icons
{:.no_toc}

#### 练习：添加四个图标
{:.no_toc}

{{site.alert.secondary}}
  Enter the following `Icon` widgets inside the second empty `Row`:

  在第二个空的 `Row` 中添加以下四个 `Icon` widget。

  * `Icons.accessibility` 
  * `Icons.timer`
  * `Icons.phone_android`
  * `Icons.phone_iphone`

  For the second empty `Row`,
  set the `mainAxisAlignment` property to
  `MainAxisAlignment.spaceAround`.

  对于第二个空的 `Row`，将其 `mainAxisAlignment` 
  属性设为 `MainAxisAlignment.spaceAround`。

{{site.alert.end}}
{% comment %}
  Gist: https://gist.github.com/datafoya/dae36611fc9af04c4b9d0fbc3429275e
{% endcomment %}
<iframe src="{{site.custom.dartpadx.embed-flutter-prefix}}?id=dae36611fc9af04c4b9d0fbc3429275e&amp;theme=dark&amp;split=60" width="100%" height="400px"></iframe>

## What's next?

## 下一步是什么？

Congratulations, you've finished this codelab!
If you'd like to know more about Flutter,
here are a few suggestions for resources worth exploring:

恭喜你，已经完成了这个 codelab！
如果你想要了解关于 Flutter 的更多信息，这里有些值得探索的资源要推荐给你：

* Learn more about layouts in Flutter by
  visiting the [Building layouts][] page. 

  在 [Building layouts][] 页面中学习关于 Flutter 的布局。

* Check out the [sample apps][].

  查看 [sample apps][]。

* Visit [Flutter's YouTube channel][], 
  where you can watch a variety videos from
  videos that focus on individual widgets
  to videos of developers building apps.

  访问 [Flutter's YouTube channel][]，你将能够观看大量
  专注于独立的 widget 以及开发者如何构建应用的视频。

You can download Flutter from the [install][] page. 

你可以在 [install][] 页面中下载 Flutter。

[Building layouts]: /docs/development/ui/layout
[Cupertino]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[DartPad issue]: {{site.github}}/dart-lang/dart-pad/issues/new
[Flutter's YouTube channel]: https://www.youtube.com/channel/UCwXdFgeE9KYzlDdR7TG9cMw
[GitHub]: {{site.github}}/flutter/website/tree/master/examples/layout/sizing/images
[install]: /docs/get-started/install
[Material]: {{site.api}}/flutter/material/MaterialApp-class.html
[Material Color palette]: {{site.api}}/flutter/material/Colors-class.html
[Material Icon library]: {{site.api}}/flutter/material/Icons-class.html
[sample apps]: {{site.github}}/flutter/samples/blob/master/INDEX.md
