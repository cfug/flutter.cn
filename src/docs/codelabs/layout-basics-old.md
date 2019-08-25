---
title: "Codelab: Basic Flutter layout"
title: "Codelab: Flutter 布局基础教程"
description: "A codelab that uses DartPad2 to teach Flutter layout concepts."
description: "使用 DartPad2 工具教你如何构建 Flutter 布局"
toc: false
---

请注意，本文档已在官方文档中被移除，新的页面正在翻译中，本页面作为临时替代页面，
将在新页面翻译结束之后删除，请勿在站外引用或分享以避免不好的用户体验，谢谢！

{{site.alert.note}}

  The embedded editors use an experimental version of DartPad.
  If you find a DartPad bug or have suggestions for DartPad,
  please [create a DartPad
  issue](https://github.com/dart-lang/dart-pad/issues/new)
  by clicking the bug icon at the top right of this page.
  
  内置的编辑器使用的是实验版的 DartPad。如果你发现了 DartPad 的 bug 或有任何建议，请在 [create a DartPad
  issue](https://github.com/dart-lang/dart-pad/issues/new) 页面的右上角点击 bug 图标。
{{site.alert.end}}

{{site.alert.note}}

  This codelab is currently being developed and tested
  with Chrome. There might be (in the short term) features that
  work in some browsers and not others. If you encounter any, please
  [create a DartPad issue](https://goo.gle/flutter_web_issue),
  labeling the issue with `platform-web`.
  
  目前 codelab 是基于 Chrome 开发测试的。可能会有一些功能（短期内）在某些浏览器上可用，而在另一些浏览器上不可用。
  如果您遇到任何问题，请 [create a DartPad issue](https://goo.gle/flutter_web_issue) ，并为这个 issue 加上
   `platform-web` 标签。
{{site.alert.end}}

`Row` and `Column` are two very important widgets in the Flutter universe.
Want to put a `Text` widget with a label next to another `Text`
widget with the corresponding value?  Use a `Row`.
Want to present multiple pairs of labels and values?
That's a `Column` of `Row`s. Forms with several fields,
icons next to menu choices, buttons next to
search bars, these are all places where `Row`s and `Column`s are used,

`Row` and `Column` 是 Flutter 世界非常重要的两个 widgets。想要把一个带 label 的 `Text` widget 放到
另一个具有相应值的 `Text` widget边上？使用一个 `Row`。想要现实多对 labels 和值？使用一个包含多个 `Row` 的 `Column`。
包含多个字段的表单，旁边有图标的菜单选项，旁边有搜索栏的按钮，这些都是要用到 `Row`s 和 `Column` 的地方。

This codelab walks you through how `Row`s and `Column`s work.
Because they're so similar, once you're done learning about 
`Row`s, the codelab mostly shows you how all the same concepts apply
to `Column`s. There are inline editors
along the way so you can play around and test your knowledge.

codelab 将带您了解 `Row`s and `Column` 如何工作。因为它们非常相似，一旦您学会了如何使用 `Row`，codelab 将会向您
展示如何把相同的概念应用于 `Column`。使用内置的编辑器，您将会边玩边测试您学到的知识。

### Start with a Row and some children

### 从一个 Row 和一些 children开始

The whole point of a `Row` or `Column` is to contain
other widgets, known as children. In a `Row`, children
are arranged horizontally from first to last in accordance
with text direction. If your device is set to
English or another left-to-right language, it starts from the left.
If you're using Arabic or another right-to-left language, it starts
on the right and moves left.

`Row` or `Column` 的主要功能就是包含其他的 widgets，这些 widgets 被称为 children。
在一个 `Row` 里，所有的 children 都会根据 text 方向从头到尾水平排列。如果您的设备被设置为英文或其他从左到右的语言，
就会从左开始，如果您使用阿拉伯语或者其他从右到左显示的语言，就会从右到左排列。

#### Code example

#### 代码例子

Below is a widget called `MyWidget` that builds a single `Row`.
Try adding three `BlueBox` widgets to its list of children.

下面是一个叫作 `MyWidget` 的 widget，在其内部创建了一个 `Row`，然后请试着
将三个 `BlueBox` widgets 加到 `Row` 的 children中。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=76e993732820ef908ea8424744b9996d" width="100%" height="400px"></iframe>

### Main axis size

### 主轴空间

The main axis of a `Row` is the horizontal one (for
`Column`s, it's the vertical axis). Each `Row` has a
property called `mainAxisSize` that determines how much space
it should take along that axis. By default,
`mainAxisSize` is set to `MainAxisSize.max`, which
causes a `Row` to take up all the available horizontal
space. You can use `MainAxisSize.min` to direct a `Row`
widget to take up as little space as possible.

`Row` 的主轴是指水平方向的轴（`Column` 的主轴是指竖直方向的）。每一个 `Row` 都有一个
叫 `mainAxisSize` 的属性，它决定了此 `Row` 沿着水平方向占用空间的大小。默认情况下，`mainAxisSize` 的值为 `MainAxisSize.max`，
这意味着 `Row` 将会占用所有可用的水平方向空间。你可以使用 `MainAxisSize.min` 实现让一个 `Row` 占用尽可能少的空间。

#### Code example

#### 代码例子

Here's the example you just finished. Try setting the `Row`'s
`mainAxisSize` property to `MainAxisSize.min` and see what happens.

这里的例子是您刚刚完成的。试着将 `Row` 的 `mainAxisSize` 的值设为 `MainAxisSize.min`，看看会发生什么。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=9ac4ade5961150a27d3e547b667c8037" width="100%" height="400px"></iframe>

### Main axis alignment

### 主轴对齐

If you've set the `mainAxisSize` of a `Row` to the minimum,
there won't be any extra room beyond what the children use.
If you've set it to `max`, though, the `Row` might have some
additional space lying around.  You can use the `mainAxisAlignment`
property to control how the `Row` aligns its children within that space.

如果您将一个 `Row` 的 `mainAxisSize` 设为最小值，在 children 之外就不会有更多的空间。
如果您将其设为最大值，`Row` 就会有多出来的空间。您可以使用 `mainAxisAlignment` 属性来控制
`Row` 中的 children 对齐的方式。

There are six different values available in the `MainAxisAlignment` enum:

`MainAxisAlignment` 有六种不同的枚举值：

* `MainAxisAlignment.start`<br>
   Place all children as close to the start of the `Row` as possible
   (for left-to-right rows, this is the left side).
   
   将所有的 children 尽可能向 `Row` 的 start 方向排列（如果是从左到右，那就是靠左排列）。

* `MainAxisAlignment.end`<br>
  Place all children as close to the end of the `Row` as possible.
  
  将所有的 children 尽可能向 `Row` 的 end 方向排列。

* `MainAxisAlignment.center`<br>
  Group the children together in the center of the `Row`.
  
  将 children 聚在 `Row` 主轴的中间位置。

* `MainAxisAlignment.spaceBetween`<br>
  Any extra space is divided evenly and used to make gaps between the children.
  
  将主轴空白位置进行均分，用来在 children 之间制造间隔，首尾 children 距边缘没有间隙。

* `MainAxisAlignment.spaceEvenly`<br>
  Just like `spaceBetween`, except the spots before the first child
  and after the last one also count as gaps.
  
  很像 `spaceBetween`，除了让首尾 children 距边缘也有相同的间隙。

* `MainAxisAlignment.spaceAround`<br>
  Just like `spaceEvenly`, only the first and last gaps get 50% of the
  amount used between children.
  
  很像 `spaceEvenly`，只是首尾 children 距边缘间距为中间 children 间距的一半。

#### Code example

#### 代码例子

The row below has its `mainAxisAlignment` set to start. Try changing it to the
other values and re-running the code to see how things move around.

下面的 row 的 `mainAxisAlignment` 被设为了 start。试着将其改为其他的值，然后重新运行看看会怎么样。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=0c97de625a9aa5c3194f9eecbd73ec1a" width="100%" height="400px"></iframe>

### Cross axis alignment

### 交叉轴对齐

The cross axis for `Row` widgets is the vertical axis,
and you can use the `crossAxisAlignment` property to
control how children are positioned vertically.
The default value is `CrossAxisAlignment.center`,
but there are five options in total:

`Row` widgets 的交叉轴是竖直方向的轴， 你可以用 `crossAxisAlignment` 属性来控制
children 如何在垂直方向排列。默认值是 `CrossAxisAlignment.center`，一共有五种值：

* `CrossAxisAlignment.start`<br>
  Children are aligned at the start of the `Row`'s vertical space
  (by default, the top is considered to be the start,
  though you can change that via the `verticalDirection` property).

  将所有的 children 向 `Row` 竖直方向的 start 方向排列
  （如果是从上到下，你可以修改 `verticalDirection` 来改变）。

* `CrossAxisAlignment.end`<br>
  Children are aligned at the end of the `Row`'s
  vertical space (by default, that means the bottom).
  
  将所有的 children 向 `Row` 竖直方向的 end 方向排列（默认是底部）。

* `CrossAxisAlignment.center`<br>
  Children are centered with respect to the vertical axis.
  
  将 children 聚在 `Row` 竖直方向轴的中间位置。

* `CrossAxisAlignment.stretch`<br>
  Children are forced to have the same height as the
  `Row` itself, filling all the vertical space.
  
  所有的 Children 的高度会被拉伸到和 `Row` 一样，填满竖直方向轴的空间。

* `CrossAxisAlignment.baseline`<br>
  Children are aligned by their baselines (more on this one below).
  
  所有的 Children 的 baselines 在竖直方向对齐。

#### Code example

#### 代码例子

This `Row` has two small children and one big one. Its
`crossAxisAlignment` property is set to center, the default.
Try changing it to the other values and re-running the code to
see how things move around.

`Row` 有两个小的 children 和一个大的。`crossAxisAlignment` 属性默认为 center。
可以试着将其变为其他值然后重新运行，看看会怎样。

A word of warning: `CrossAxisAlignment.baseline` requires
that another property be set as well, so you
will see an error if you try that one.
Don't worry, though&mdash;it's covered in the next section.

会有一个警告： `CrossAxisAlignment.baseline` requires
that another property be set as well, so you
will see an error if you try that one. 不用担心，在下一节将会对此进行讨论。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=610aa31bbd09c90b5cede790bb6c3854" width="100%" height="400px"></iframe>

### Baseline alignment
### 基线对齐

Sometimes it's handy to align widgets containing text not by their
overall bounds, but by the baselines used by their characters.
That's what `CrossAxisAlignment.baseline` is for. You
can use it in combination with a `Row`'s `textBaseline`
property (which indicates which baseline to use) to align a
`Row`'s children along their baselines.

Note that if you set a `Row`'s `crossAxisAlignment` property
to baseline without setting `textBaseline` at the same
time, your widgets will fail to build.

有时候根据包含文本的 widgets 的基线对齐是比较方便的，而不是根据它们的整体边框对齐。
那就是 CrossAxisAlignment.baseline 的用途。你可以使用联合使用 `Row` 的 `textBaseline`属性（决定按照哪种基线来对齐），
来决定 `Row` 的所有 children 根据基线对齐。

#### Code example

#### 代码例子

This row contains three `Text` widgets with different font
sizes. Try changing the `crossAxisAlignment`
property to `baseline`, and experiment with different
values for `textBaseline` as well (there's an enum called
`TextBaseline` that contains the valid baseline values).

row 里包含三个拥有不同字体大小的 `Text` widgets。试着将 `crossAxisAlignment` 属性设为 `baseline`，
然后试验 `textBaseline` 的不同值（`TextBaseline` 枚举值里包含可用的 baseline 值）。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=8c4a0571b161755c8d9235df947d268e" width="100%" height="400px"></iframe>

### Flexible children

### 可伸缩 children

So far, all the widgets used as children in examples have
had a fixed size. It's possible, though, for a
`Row` to have children that flex,
and adapt to the available space. In order to
understand how this works,
it's best to take a look at how `Row`s size themselves and
their children:

到目前为止，例子中所有用作 children 的 widgets 都有一个固定的大小。
不过 `Row` 可以让它的 children 可伸缩，来适应可用的空间。
为了更好的理解这是怎么回事儿， 最好看看 `Row` 的大小和它的 children。

1. First, the `Row` asks all of its children with fixed
   sizes how big they'd like to be.
   
   首先，`Row` 首先会要求它所有的 children 想要多大的尺寸。
   
1. Next, it calculates the remaining space in its main
   axis (horizontal).
   
   然后，它会计算主轴（水平）的剩余空间。
   
1. Then it divides up that remaining space among its
   flexible children according to their flex factors.
   The flexible children can use some or all of the space
   they're offered.
   
   然后它把剩下的空间根据 children 的 flex 值分给它的可伸缩的 children，
   这些可伸缩的 children 可以使用他们提供的部分或者全部的空间。

1. At that point, the `Row` knows how big all of its
   children are, and can align them using the same axis
   size and alignment properties you've seen so far.
   
   在那时， `Row` 知道所有的 children 的尺寸有多大，然后可以根据你之前学到的 axis
   size 和 alignment 属性来排列它们。

Most widgets are considered to be of a fixed size.
You can change that by wrapping them in a `Flexible`
widget. `Flexibles` have two important properties:
a `flex` factor that determines how much of the remaining
space they get in comparison to other `Flexibles`,
and a `fit` property that determines whether their child
is forced to take up all the extra space it's offered.

大多数 widgets 是固定大小的。你可以将他们包裹在一个 `Flexible` widget 中来将它们变为可伸缩的。
`Flexibles` 有两个重要属性： `flex` 值决定与其他 children 相比可占用剩余空间的多少， `fit` 属性决定
其 child 是否占用所有额外的空间。


#### Code example

#### 代码例子

Try wrapping the middle box in this row with a `Flexible`
widget that has a `flex` factor of 1 and its `fit`
property set to `FlexFit.loose`. Afterward,
try changing the fit to tight and see what happens.

试着将 row 中间的 box 包裹在一个 `flex` factor 为 1 并且 `fit` 为 `FlexFit.loose` 的 Flexible` widget中。
然后试着将 `fit` 改为 `FlexFit.tight`，看看会发生什么。

This combination (a `flex` factor of 1 and a tight `fit`)
is so popular, there's a whole widget just to make
using them easier: `Expanded`.

`flex` factor 为 1 和 `fit` 为 `FlexFit.tight` 的组合是非常常见的, 更简单的方式是直接使用 `Expanded` widget.

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=c7ba00c50151ab2e5c0c2194686fef93" width="100%" height="400px"></iframe>

### Flex factors

If more than one child of a `Row` or `Column` has a
flexible size, the available space is allotted to them according to their
`flex` factors. Each child gets space in proportion to their flex
factor divided by the total of all the flex factors of all children:

如果 `Row` 或 `Column` 中多个 children 都是可伸缩的，那么如何分配可用空间取决于它们的 `flex` 值。
每个 child 获得的空间将取决于 他们的 flex 值占所有 children 的 flex 值之和的比例。

<!-- skip -->
```dart
remainingSpace * (flex / totalOfAllFlexValues)
```

For example, if there are two children with flex factors of 1,
each gets half of the available space. If there
are two children with flex factors of 1 and another child
with a flex factor of 2, the first two
children each get a quarter of the available space,
and the other child gets half.

例如， 如果有两个 flex 值为 1 的 children， 每个将获得一半的可用空间。
如果有两个  flex 值为 1 的 children， 还有一个 flex 值为 2 的 child，
那么前两个 children 将各获得四分之一的可用空间，另一个 child 将获得一半的可用空间。

#### Code example

#### 代码例子

In this example, all three of the `Row`'s children are `Flexible`.
Try changing their `flex` values and
re-running the code to see how the widgets' sizes adjust.

在这个例子中， `Row` 的所有三个 children 都是可伸缩的，试着改变它们的 `flex` 值然后重新运行看看它们的尺寸如何改变。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=4ab5409b566272c8f2cd28feddb0a995" width="100%" height="400px"></iframe>

### What happens if you run out of space?

### 如果没有空间了怎么办？

As you just saw, when a `Row` asks one of its `Flexible`
children how big it wants to be, it gives the child
a max width based on its `flex` factor. However,
fixed-size children get no such restriction. This is so
they can determine their own intrinsic size.

正如你所看到的，当一个 `Row` 问 它其中一个可伸缩的 child 想要多大空间时， 它会根据这个 child 的 `flex` 值分配给它一个最大值。
但是固定大小的 children 没有这个限制，它们可以自己决定大小。

One side effect is that there's nothing stopping a fixed-size
child from declaring itself to be bigger than the `Row` can support.
When that happens, a flex overflow results. You can
fix it by changing the child widget so that it chooses a smaller size,
or by using a scrolling widget.

一个副作用就是， 无法阻止一个固定大小的 child 声明超出 `Row` 所能支持的大小。
当这种情况发生时， 就会发生溢出。你可以通过修改这个 child 的大小或者使用一个可滚动的 widget 来解决这个问题。

#### Code example

#### 代码例子

The `Row` below contains a single widget that's way too wide to fit. Run the
code as-is to see what happens, then try modifying the width of the
`Container` to make it fit.

下面的 `Row` 包含一个特别宽的 widget。运行代码看会发生什么，然后试着修改`Container`的宽度使其适应。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=5a59d93119dc5b6eb1725235fde137cf" width="100%" height="400px"></iframe>

### Try using SizedBox to make space

### 试着使用 SizedBox 来留出空间

If you need a specific amount of space between two children of a
`Row`, an easy way to do it is by sticking a `SizedBox` of the
appropriate width in between.

如果你需要在一个 `Row` 中的两个 children 之间指定一个特定的间隔，一个简单的方法是在中间放一个 宽度合适的 `SizedBox`。

#### Code example

#### 代码例子

Trying making some space between these two list items by placing a
`SizedBox` with a `width` of 100 between them.

试着用一个宽度 100 的 `SizedBox` 在两个 items 中间制造一些间隔。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=326b8c5774079b7a80922e11a3730f99" width="100%" height="400px"></iframe>

### Spacers expand to make space

### Spacers 留出可变空间

`Spacers` are another convenient way to make space between
items in a `Row`.  They're flexible, and expand to fill any
leftover space.

使用`Spacers` 是另一个在 `Row` 的 children 之间留出空间的方法。它们是可伸缩的，可以填满任何剩下的空间。

#### Code example

#### 代码例子

Try adding a `Spacer` in between the first and second children of the
`Row` below.

试着在第一个和第二个 children 之间加一个 `Spacer`。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=dd68c1eb491e7a22a2ceb4127d78e504" width="100%" height="400px"></iframe>

### Wait, wasn't I going to learn about Columns, too?

### 等等, 我不是还要学习 Columns 吗?

Surprise, you already have! `Row`s and `Column`s do the
same job, just in different dimensions. The main
axis of a `Row` is horizontal, and the main axis of a
`Column` is vertical, but they both size and position their
children in the same way. They even share a base class,
`Flex`, so everything you've learned about `Row`s
applies to `Column`s as well!

给你个惊喜，你已经学习了。`Row` 的所有用法和 `Column` 是一样的，只是维度不同。
`Row` 的主轴是水平的， 而 `Column` 的主轴是竖直的， 但是它们设置其 children 的大小和位置的方式是一样的。
它们还共用一个基本类 `Flex`。所以你已经学习的有关 `Row` 的用法，同样适用于 `Column`。

#### Code example

#### 代码例子

Here's a `Column` with some children of various sizes and its most important
properties set. Try fiddling around with them and you'll see that the
`Column` works like a vertical `Row`.

这里有一个包含不同尺寸和一些重要属性已经设置好的 children 的 `Column`。试着摆弄以下，你会发现 `Column` 就像一个竖过来的的 `Row`。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=6cafe7beab954e72fed2fd2393a29f6c" width="100%" height="400px"></iframe>

### Putting it all together

### 将它们放在一起

Now that you're versed in `Row`s, `Column`s, and the
important properties of both, you're ready to practice
putting them together to build interfaces. The next few
examples guide you through the construction
of a business card display.

现在你已经熟悉了 `Row` 和 `Column` 的重要属性， 你已经可以来联系将它门组合在一起来构建用户界面。
下面的例子将带你完成一个名片显示的构建。

#### Code example

#### 代码例子

Every business card needs a name and a title, so start with that.

每一张名片都需要一个名字和头衔，让我们从这里开始。

* Add a `Column` widget
  
  添加一个 `Column` widget
  
* Add two text widgets to the `Column`'s list of children:

  添加两个 text widgets 到 `Column` 的 children 列表中：

  * The first should be a name (a short one is easier to
    fit into the small window) and use the `headline` style:
    
    第一个是名字（简短一点更适合于一个小窗口），使用 `headline` 样式：

<!-- skip -->
```dart
style: Theme.of(context).textTheme.headline
```

  * The second text widget should say `Experienced App Developer`
    and use the default style (leave the `style` property out entirely).
    
    第二个 text widget 应该是 `Experienced App Developer`，使用默认样式（不用设置 `style` 属性）。

* Set the `Column`'s `crossAxisAlignment` to start, so
  that the text widgets are start-aligned rather than centered.
  
  设置 `Column` 的 `crossAxisAlignment` 为 start，使得 text widgets 会开始对齐，而不是居中。

* Set the `Column`'s `mainAxisSize` to `MainAxisSize.min`,
  so the card won't expand to the full height of the window.
  
  将 `Column` 的 `mainAxisSize` 设为 `MainAxisSize.min`，这样 card 才不会扩展到整个 window 那么高。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=5e7e9352bca878f446d4347f324e2f63&split=60" width="100%" height="800px"></iframe>

Business cards often have an icon or logo in the top-left corner,
so the next step is to add one to yours. Start by wrapping the
`Column` you just created with a `Row` widget:

名片的左上角通常会有一个图标或者标志，所以下一步是加一个到你的名片上。将你刚创建的 `Column` 包裹在一个 `Row` widget 中。

<!-- skip -->
```dart
Row(
  children: [
    Column( … ), // <- This should be the Column you made in the previous step
  ],
);
```

Now you can add the `Icon`:

现在你可以添加一个图标：

* Above your `Column` in the `Row`'s list of children,
  add a `Padding` widget.
  
  在你的 `Row` 的 `Column` 的前面，加一个 `Padding` widget。
  
  * Set its `padding` to `const EdgeInsets.all(8)`.
    
    设置 `padding` 为 `const EdgeInsets.all(8)`。
  
  * For the child of the `Padding` widget, use an `Icon`.
  
    将一个 `Icon` widget 作为 `Padding` widget 的 child。
  
    * You can use any icon resource you want, though `Icons.account_circle`
      works nicely.
      
      你可以使用任何 icon resource， `Icons.account_circle`看起来就不错。
      
    * Set the `Icon`'s `size` to 50.
    
      把 `Icon` 的大小设置为 50。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=684e599476eef2ec4b4508e6b2186c03&split=60" width="100%" height="800px"></iframe>

Your first `Row` is now complete! There are two more to go, though,
and you need a `Column` to put them in.
Wrap your `Row` with a `Column` widget so that it looks like this:

你的第一个 `Row` 现在完成了。还有两件事要做，你需要一个 `Column` 把它们放进去。
把你的 `Row` 包裹进一个 `Column` widget 就像这样：

<!-- skip -->
```dart
 Column(
   children: [
     Row( … ), // <- This should be the Row with your Icon and Text widgets.
   ],
 );
```

Then, finish up your new `Column` with these steps:

然后按照以下步骤完成你的新 `Column`：

* Set the `Column`'s `mainAxisSize` to min

  设置 `Column` 的 mainAxisSize 为最小
  
  * Otherwise it'll expand to fill the screen!
  
    否则它会充满整个屏幕！

* Set the `Column`'s `crossAxisAlignment` to stretch
  
  设置`Column` 的 `crossAxisAlignment` 为 stretch。

  * This makes all of its children full-width
  
    这使得所有 children 都会拉伸到最大宽度

* Add more widgets below your `Row` in the `Column`'s
  list of children:
  
  在 `Column` 中你的 `Row` 下面添加更多的 widgets：
  
  * A `SizedBox` with a height of 8
  
    一个高度为 8 的 `SizedBox`
  
  * An empty `Row` (no children or other properties)
  
    一个空 `Row` （没有 children 或 其他属性）
  
  * A `SizedBox` with a height of 16
  
    一个高度为 16 的 `SizedBox`
    
  * Another empty `Row`
  
    另一个空 `Row`

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=19ead6db4f42ce112fc0a7d2e0922466&split=60" width="100%" height="800px"></iframe>

There are just a few steps to go now. Next up is the second row.
Add the following to its list of children:

现在就差几步了。接下来是第二个 `Row`。
添加以下的 widgets 作为它的 children：

* A `Text` widget with a street address like '123 Main Street'
  
  一个地址为 '123 Main Street' 的 `Text` widget

* A `Text` widget with a phone number like '800-123-1234'

  一个电话为 '800-123-1234' 的 `Text` widget

If you run the code at this point, you'll see that the two `Text`
widgets are placed right up against each other rather than at
opposite ends of the `Row`, which isn't right.
You can fix this by setting the `Row`'s `mainAxisAlignment`
property to `spaceBetween`, which puts any extra space between
the two `Text` widgets.

如果你现在运行代码，你会看到这两个 `Text`widgets 是挨着的，而不是在 `Row` 的两端对齐，这是不对的。
你可以将 `Row` 的 `mainAxisAlignment` 设为 `spaceBetween`，使得这两个 `Text` widge 中间有些间隔。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=e6e07bbe96255b762163cf3e40906944&split=60" width="100%" height="800px"></iframe>

The last step is to get those icons in place at the bottom of the card:

最后一步是在名片的底部放一些图标。

* Add four `Icon` widgets to the last `Row`'s list of
  children. You can use whichever icon resources you
  like, but these would be a good way to show that your
  imaginary developer focuses on accessibility,
  fast development, and multi-platform apps:
  
  添加四个 `Icon` widgets 到最后一个 `Row` 中。你可以使用任何你喜欢的图标资源，
  但是以下图标是一个很好的选择，用来展示你想象中的关注于 accessibility,
  fast development, and multi-platform apps 的开发人员：

  * `Icons.accessibility`
  * `Icons.timer`
  * `Icons.phone_android`
  * `Icons.phone_iphone`

* Set the `Row`'s `mainAxisAlignment` property to
  `MainAxisAlignment.spaceAround`
  
  设置 `Row` 的 `mainAxisAlignment` 属性为 `MainAxisAlignment.spaceAround`。

<iframe src="{{site.dartpad}}/experimental/embed-new-flutter.html?id=2234a5ccada200eb1e018b12fa95d57d&split=60" width="100%" height="800px"></iframe>