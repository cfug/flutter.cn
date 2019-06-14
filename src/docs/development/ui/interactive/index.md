---
title: Adding Interactivity to Your Flutter App
title: 为你的 Flutter 应用加入交互体验
short-title: Adding Interactivity
short-title: 交互添加
---

{{site.alert.secondary}}
  <h4 class="no_toc">What you’ll learn</h4>
  <h4 class="no_toc">你会学到什么</h4>

  * How to respond to taps.
  * 如何响应点击。
  * How to create a custom widget.
  * 如何创建自定义 widget。
  * The difference between stateless and stateful widgets.
  * 无状态和有状态 widget 之间的区别。
{{site.alert.end}}

How do you modify your app to make it react to user input?
In this tutorial, you'll add interactivity to an app that contains only
non-interactive widgets.  Specifically, you'll modify an icon to make
it tappable by creating a custom stateful widget that manages two stateless widgets.
如何修改您的应用程序以使其对用户输入做出反应？在本教程中，您将为仅包含非交互式 widget 的应用程序添加交互性。具体来说，您将通过创建一个管理两个无状态 widget 的自定义有状态 widget，修改一个图标实现使其可点击。

## Getting ready
## 做好准备

If you've already built the layout in
[Building Layouts in Flutter](/docs/development/ui/layout),
skip to the next section.

如果您已经根据[在 Flutter 中构建布局](/docs/development/ui/layout)构建好了布局,请跳到下一节。

* Make sure you've [set up](/docs/get-started/install) your environment.
* 确保您已经 [设置](/docs/get-started/install) 好了您的环境.
* [Create a basic Flutter app.](/docs/get-started/test-drive/#create-app)
* [创建一个基础的 Flutter 应用](/docs/get-started/test-drive/#create-app)
* Replace the `lib/main.dart` file with
  [main.dart]({{site.repo.this}}/tree/{{site.branch}}/src/_includes/code/layout/lakes/main.dart)
  from GitHub.
* 用GitHub上的 [main.dart]({{site.repo.this}}/tree/{{site.branch}}/src/_includes/code/layout/lakes/main.dart) 替换 `lib/main.dart` 文件。
* Replace the `pubspec.yaml` file with
  [pubspec.yaml]({{site.repo.this}}/tree/{{site.branch}}/src/_includes/code/layout/lakes/pubspec.yaml)
  from GitHub.
* 用GitHub上的 [pubspec.yaml]({{site.repo.this}}/tree/{{site.branch}}/src/_includes/code/layout/lakes/pubspec.yaml) 替换 `pubspec.yaml` 文件。
* Create an `images` directory in your project, and add
  [lake.jpg.](https://github.com/flutter/website/tree/master/src/_includes/code/layout/lakes/images/lake.jpg)
* 在你的工程中创建一个 `images` 文件夹, 并添加 [lake.jpg.](https://github.com/flutter/website/tree/master/src/_includes/code/layout/lakes/images/lake.jpg)

Once you have a connected and enabled device, or you've launched the [iOS
simulator](/docs/get-started/install/macos#set-up-the-ios-simulator)
(part of the Flutter install),
you are good to go!
如果你有一个连接并可用的设备，或者你已经启动了 [ iOS 模拟器](/docs/get-started/install/macos#set-up-the-ios-simulator)（Flutter 安装部分介绍过），你就可以开始了！

[Building Layouts for Flutter](/docs/development/ui/layout)
showed how to create the layout for the following screenshot.
[在 Flutter 中构建布局](/docs/development/ui/layout)中展示了如何构建下面截图所示的布局。

<img src="/docs/development/ui/interactive/images/lakes.jpg" style="border:1px solid black" alt="The starting Lakes app that we will modify">

When the app first launches, the star is solid red, indicating that this lake
has previously been favorited. The number next to the star indicates that
41 people have favorited this lake.  After completing this tutorial,
tapping the star removes its favorited status, replacing
the solid star with an outline and decreasing the count. Tapping
again favorites the lake, drawing a solid star and increasing the count.
当应用第一次启动时，这个星形图标是实心红色，表明这个湖以前已经被收藏过了。星号旁边的数字表示41个人已经收藏了此湖。
完成本教程后，点击星形图标将取消收藏状态，然后用轮廓线的星形图标代替实心的，并减少计数。再次点击会重新收藏，并增加计数。

<img src="/docs/development/ui/interactive/images/favorited-not-favorited.png" alt="the custom widget you'll create">

To accomplish this, you'll create a single custom widget that includes both the
star and the count, which are themselves widgets. Because tapping the star
changes state for both widgets, so the same widget should manage both.
为了实现这个，您将创建一个包含星形图标和计数的自定义 widget，它们都是 widget。 因为点击星形图标会更改这两个 widget 的状态，所以同一个 widget 应该同时管理这两个 widget。

You can get right to touching the code in
[Step 2: Subclass StatefulWidget](#step-2).
If you want to try different ways of managing state, skip to
[Managing state](#managing-state).

您可以直接查看[第二步: 创建
StatefulWidget 的子类](#step-2).
如果您想尝试不同的管理状态方式，请跳至
[状态管理](#managing-state).

<a name="stateful-stateless"></a>
## Stateful and stateless widgets
## 有状态和无状态的 widgets

<div class="whats-the-point" markdown="1">

<b> <a id="whats-the-point" class="anchor" href="#whats-the-point" aria-hidden="true"><span class="octicon octicon-link"></span></a>What's the point?</b>
<b> <a id="whats-the-point" class="anchor" href="#whats-the-point" aria-hidden="true"><span class="octicon octicon-link"></span></a>重点是什么？</b>

* Some widgets are stateful, and some are stateless.
* 有些 widgets 是有状态的, 有些是无状态的。
* If a widget changes&mdash;the user interacts with it,
  for example&mdash;it's _stateful_.
* 如果用户与 widget 交互，widget 会发生变化，那么它就是_有状态的_.
* A widget's state consists of values that can change, like a slider's
  current value or whether a checkbox is checked.
* 一个 widget 的状态是一些可以更改的值, 如一个滑动条的当前值或一个复选框是否被选中。
* A widget's state is stored in a State object, separating the widget's
  state from its appearance.
* 一个 widget 的状态保存在一个 State 对象中, 它和 widget 的显示分离。
* When the widget's state changes, the state object calls
  `setState()`, telling the framework to redraw the widget.
* 当 widget 状态改变时, State 对象调用 `setState()`, 告诉框架去重绘 widget。

</div>

A _stateless_ widget has no internal state to manage.
[Icon](https://docs.flutter.io/flutter/widgets/Icon-class.html),
[IconButton](https://docs.flutter.io/flutter/material/IconButton-class.html),
and [Text](https://docs.flutter.io/flutter/widgets/Text-class.html) are
examples of stateless widgets, which subclass
[StatelessWidget](https://docs.flutter.io/flutter/widgets/StatelessWidget-class.html).

一个 _stateless_ widget 没有内部状态.
[Icon](https://docs.flutter.io/flutter/widgets/Icon-class.html),
[IconButton](https://docs.flutter.io/flutter/material/IconButton-class.html),
和 [Text](https://docs.flutter.io/flutter/widgets/Text-class.html) 都是无状态 widget, 他们都是
[StatelessWidget](https://docs.flutter.io/flutter/widgets/StatelessWidget-class.html)的子类。

A _stateful_ widget is dynamic. The user can interact with a stateful widget
(by typing into a form, or moving a slider, for example),
or it changes over time (perhaps a data feed causes the UI to update).
[Checkbox](https://docs.flutter.io/flutter/material/Checkbox-class.html),
[Radio](https://docs.flutter.io/flutter/material/Radio-class.html),
[Slider](https://docs.flutter.io/flutter/material/Slider-class.html),
[InkWell](https://docs.flutter.io/flutter/material/InkWell-class.html),
[Form](https://docs.flutter.io/flutter/widgets/Form-class.html), and
[TextField](https://docs.flutter.io/flutter/material/TextField-class.html)
are examples of stateful widgets, which subclass
[StatefulWidget](https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html).

一个 _stateful_ widget 是动态的. 用户可以和其交互
(例如输入一个表单、 或者移动一个 slider 滑块),或者可以随时间改变 (也许是数据改变导致的 UI 更新).
[Checkbox](https://docs.flutter.io/flutter/material/Checkbox-class.html),
[Radio](https://docs.flutter.io/flutter/material/Radio-class.html),
[Slider](https://docs.flutter.io/flutter/material/Slider-class.html),
[InkWell](https://docs.flutter.io/flutter/material/InkWell-class.html),
[Form](https://docs.flutter.io/flutter/widgets/Form-class.html), and
[TextField](https://docs.flutter.io/flutter/material/TextField-class.html)
都是 stateful widgets, 他们都是
[StatefulWidget](https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html)的子类。

<a name="creating-stateful-widget"></a>
## Creating a stateful widget
## 创建一个有状态的 widget

<div class="whats-the-point" markdown="1">

<b> <a id="whats-the-point" class="anchor" href="#whats-the-point" aria-hidden="true"><span class="octicon octicon-link"></span></a>What's the point?</b>
<b> <a id="whats-the-point" class="anchor" href="#whats-the-point" aria-hidden="true"><span class="octicon octicon-link"></span></a>重点是什么?</b>

* To create a custom stateful widget, subclass two classes:
  StatefulWidget and State.
* The state object contains the widget's state and the widget's `build()`
  method.
* When the widget's state changes, the state object calls
  `setState()`, telling the framework to redraw the widget.
  
* 要创建一个自定义有状态 widget，需创建 StatefulWidget 和 State 这两个类的子类。
* 状态对象包含 widget 的状态和 build() 方法。
* 当 widget 的状态改变时，状态对象调用 `setState()`，告诉框架重绘 widget。

</div>

In this section, you'll create a custom stateful widget.
You'll replace two stateless widgets&mdash;the solid red star and the
numeric count next to it&mdash;with a single custom
stateful widget that manages a row with two children widgets: an IconButton
and Text.

在本节中，您将创建一个自定义有状态的 widget。
您将使用一个自定义有状态 widget 来替换两个无状态 widget - 红色实心星形图标和其旁边的数字计数 - 该 widget 用两个子 widget 管理一行 IconButton 和 Text。

Implementing a custom stateful widget requires creating two classes:
实现一个自定义的有状态 widget 需要创建两个类:

* A subclass of StatefulWidget that defines the widget.
* A subclass of State that contains the state for that widget and defines
  the widget's `build()` method.
  
* 一个 StatefulWidget 的子类，用来定义一个 widget 类。
* 一个 State 的子类，包含该widget状态并定义该 widget 的 `build()` 方法.

This section shows how to build a StatefulWidget, called FavoriteWidget,
for the Lakes app. The first step is choosing how FavoriteWidget's state
is managed.
这一节展示如何为 Lakes 应用程序构建一个名为 FavoriteWidget 的 StatefulWidget。第一步是选择如何管理 FavoriteWidget 的状态。

<a name="step-1"></a>
### Step 1: Decide which object manages the widget's state
### Step 1: 决定哪个对象管理 widget 的状态

A widget's state can be managed in several ways, but in our example
the widget itself, FavoriteWidget, will manage its own state.
In this example, toggling the star is an isolated action that doesn't
affect the parent widget or the rest of the UI,
so the widget can handle its state internally.
一个 widget 的状态可以通过多种方式进行管理，但在我们的示例中，widget 本身 （FavoriteWidget） 将管理自己的状态。
在这个例子中，切换星形图标是一个独立的操作，不会影响父窗口 widget 或其他用户界面，因此该 widget 可以在内部处理它自己的状态。

Learn more about the separation of widget and state,
and how state might be managed, in [Managing state](#managing-state).
在[状态管理](#managing-state)中了解更多关于 widget 和状态的分离以及如何管理状态的信息。

<a name="step-2"></a>
### Step 2: Subclass StatefulWidget
### Step 2: 创建 StatefulWidget 的子类

The FavoriteWidget class manages its own state, so it overrides
`createState()` to create the State object.
The framework calls `createState()` when it wants to build the widget.
In this example, `createState()` creates an instance of _FavoriteWidgetState,
which you'll implement in the next step.
FavoriteWidget 类管理自己的状态，因此它重写 `createState()` 来创建状态对象。
框架会在构建 widget 时调用 `createState()`。在这个例子中，`createState()` 创建 _FavoriteWidgetState 的实例，您将在下一步中实现该实例。

<!-- code/layout/lakes-interactive/main.dart -->
<!-- skip -->
{% prettify dart %}
class FavoriteWidget extends StatefulWidget {
  @override
  _FavoriteWidgetState createState() => _FavoriteWidgetState();
}
{% endprettify %}

<aside class="alert alert-info" markdown="1">
**Note:**
Members or classes that start with an underscore (_) are private.
For more information, see [Libraries and
visibility,](https://www.dartlang.org/guides/language/language-tour#libraries-and-visibility)
a section in the
[Dart language tour.](https://www.dartlang.org/guides/language/language-tour)
**注意:**
以下划线 （_） 开头的成员或类是私有的。有关更多信息，请参阅 [Dart 语言参考](https://www.dartlang.org/guides/language/language-tour) 中的 [库和可见性](https://www.dartlang.org/guides/language/language-tour#libraries-and-visibility) 部分 。
</aside>

<a name="step-3"></a>
### Step 3: Subclass State
### Step 3: 创建 State 的子类

The custom State class stores the mutable information&mdash;the logic and
internal state that can change over the lifetime of the widget.
When the app first launches, the UI displays a solid red star,
indicating that the lake has "favorite" status, and has 41 “likes”.
The state object stores this information in the
`_isFavorited` and `_favoriteCount` variables.
自定义 State 类存储可变信息；可以在 widget 的生命周期内改变逻辑和内部状态。
当应用第一次启动时，用户界面显示一个红色实心的星星形图标，表明该湖已经被收藏，并有41个“喜欢”。状态对象存储这些信息在 `_isFavorited` 和 `_favoriteCount` 变量中。

The state object also defines the `build` method. This `build` method
creates a row containing a red IconButton, and Text.  The widget uses
[IconButton](https://docs.flutter.io/flutter/material/IconButton-class.html),
(instead of Icon), because it has an `onPressed` property that
defines the callback method for handling a tap.
IconButton also has an `icon` property that holds the Icon.

状态对象也定义了 `build` 方法。这个 `build` 方法创建一个包含红色 IconButton 和 Text 的行。
该 widget 使用 [IconButton](https://docs.flutter.io/flutter/material/IconButton-class.html)（而不是 Icon），
因为它具有一个 onPressed 属性，该属性定义了处理点击的回调方法。IconButton 也有一个 `icon` 的属性，持有图标。

The `_toggleFavorite()` method, which is called when the IconButton is pressed,
calls `setState()`. Calling `setState()` is critical, because this tells
the framework that the widget’s state has changed and the widget
should redraw. The `_toggleFavorite` function swaps the UI between
1) a star icon and the number ‘41’, and
2) a star_border icon and the number ‘40’.
按下 IconButton 时会调用 `_toggleFavorite()` 方法，然后它会调用 `setState()`。
调用 `setState()` 是至关重要的，因为这告诉框架，widget 的状态已经改变，应该重绘。
`_toggleFavorite`在实心的星形图标和数字 41 与轮廓线的星形图标和数字 40 之间切换 UI。

<!-- code/layout/lakes-interactive/main.dart -->
<!-- skip -->
{% prettify dart %}
class _FavoriteWidgetState extends State<FavoriteWidget> {
  [[highlight]]bool _isFavorited = true;[[/highlight]]
  [[highlight]]int _favoriteCount = 41;[[/highlight]]

  [[highlight]]void _toggleFavorite()[[/highlight]] {
    [[highlight]]setState(()[[/highlight]] {
      // If the lake is currently favorited, unfavorite it.
      // 如果这个湖已经被收藏，则取消收藏。
      if (_isFavorited) {
        _favoriteCount -= 1;
        _isFavorited = false;
        // Otherwise, favorite it.
        // 否则, 收藏它.
      } else {
        _favoriteCount += 1;
        _isFavorited = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: EdgeInsets.all(0.0),
          child: IconButton(
            [[highlight]]icon: (_isFavorited[[/highlight]]
                [[highlight]]? Icon(Icons.star)[[/highlight]]
                [[highlight]]: Icon(Icons.star_border)),[[/highlight]]
            color: Colors.red[500],
            [[highlight]]onPressed: _toggleFavorite,[[/highlight]]
          ),
        ),
        SizedBox(
          width: 18.0,
          child: Container(
            [[highlight]]child: Text('$_favoriteCount'),[[/highlight]]
          ),
        ),
      ],
    );
  }
}
{% endprettify %}

<aside class="alert alert-success" markdown="1">
<i class="fa fa-lightbulb-o"> </i> **Tip:**
Placing the Text in a SizedBox and setting its width prevents a discernible
"jump" when the text changes between the values of 40 and 41&mdash;this
would otherwise occur because those values have different widths.
**提示:**
当文本在 40 和 41 之间变化时，将文本放在 SizedBox 中并设置其宽度可防止出现明显的“跳跃” ，因为这些值具有不同的宽度。
</aside>

<a name="step-4"></a>
### Step 4: Plug the stateful widget into the widget tree
### Step 4: 将有 stateful widget 插入 widget 树中

Add your custom stateful widget to the widget tree in the app's
build method. First, locate the code that creates the Icon and Text, and delete it:
将您自定义 stateful widget 在 build 方法中添加到 widget 树中。首先，找到创建图标和文本的代码，并删除它：

<!-- code/layout/lakes/main.dart -->
<!-- skip -->
{% prettify dart %}
// ...
[[strike]]Icon([[/strike]]
  [[strike]]Icons.star,[[/strike]]
  [[strike]]color: Colors.red[500],[[/strike]]
[[strike]]),[[/strike]]
[[strike]]Text('41')[[/strike]]
// ...
{% endprettify %}

In the same location, create the stateful widget:
在相同的位置创建 stateful widget：

<!-- code/layout/lakes-interactive/main.dart -->
<!-- skip -->
{% prettify dart %}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget titleSection = Container(
      // ...
      child: Row(
        children: [
          Expanded(
            child: Column(
              // ...
          ),
          [[highlight]]FavoriteWidget()[[/highlight]],
        ],
      ),
    );

    return MaterialApp(
      // ...
    );
  }
}
{% endprettify %}

<br>That's it! When you hot reload the app, the star icon should now respond to taps.
<br>就是这样！当您热重载应用后，星形图标就会响应点击了.

### Problems?
### 有问题?

If you can't get your code to run, look in your IDE for possible errors.
[Debugging Flutter Apps](/docs/testing/debugging) might help.
If you still can't find the problem,
check your code against the interactive Lakes example on GitHub.
如果您的代码无法运行，请在 IDE 中查找可能的错误。[调试 Flutter 应用程序](/docs/testing/debugging)可能会有所帮助。如果仍然无法找到问题，请根据 GitHub 上的示例检查代码。

* [lib/main.dart]({{site.repo.this}}/tree/{{site.branch}}/src/_includes/code/layout/lakes-interactive/main.dart)
* [pubspec.yaml]({{site.repo.this}}/tree/{{site.branch}}/src/_includes/code/layout/lakes-interactive/pubspec.yaml)&mdash;no changes to this file 
* [pubspec.yaml]({{site.repo.this}}/tree/{{site.branch}}/src/_includes/code/layout/lakes-interactive/pubspec.yaml)&mdash;此文件没有变化
* [lakes.jpg](https://github.com/flutter/website/tree/master/src/_includes/code/layout/lakes-interactive/images/lake.jpg)&mdash;no changes to this file
* [lakes.jpg](https://github.com/flutter/website/tree/master/src/_includes/code/layout/lakes-interactive/images/lake.jpg)&mdash;no changes to this file 此文件没有变化

If you still have questions, refer to [Get support.](/community)
如果您仍有问题, 请参考[获得支持](/community)

---

The rest of this page covers several ways a widget's state can be managed,
and lists other available interactive widgets.
本页面的其余部分介绍了可以管理 widget 状态的几种方式，并列出了其他可用的可交互的 widget。

<a name="managing-state"></a>
## Managing state
## 状态管理

<div class="whats-the-point" markdown="1">

<b> <a id="whats-the-point" class="anchor" href="#whats-the-point" aria-hidden="true"><span class="octicon octicon-link"></span></a>What's the point?</b>
</span></a>重点是什么？</b>

* There are different approaches for managing state.
* You, as the widget designer, choose which approach to use.
* If in doubt, start by managing state in the parent widget.
* 有多种方法可以管理状态.
* 您作为 widget 的设计者，需要选择使用何种管理方法
* 如果不是很清楚时, 就在父 widget 中管理状态.

</div>

Who manages the stateful widget's state? The widget itself? The parent widget?
Both? Another object? The answer is... it depends.
There are several valid ways to make your widget interactive.
You, as the widget designer, make the decision based on how you expect your
widget to be used. Here are the most common ways to manage state:
谁管理着 stateful widget 的状态？widget 本身？父 widget？双方？另一个对象？答案是......这取决于实际情况。
有几种有效的方法可以给你的 widget 添加互动。作为 widget 设计师。以下是管理状态的最常见的方法：

* [The widget manages its own state](#self-managed)
* [The parent manages the widget's state](#parent-managed)
* [A mix-and-match approach](#mix-and-match)
* [widget 管理自己的状态](#self-managed)
* [父 widget 管理此 widget 的状态](#parent-managed)
* [混搭管理](#mix-and-match)

{% comment %}
NOTE: Commenting this out for now. The example needs some updates.

First, fix TapboxD, add it back to the repo, and then restore this note.
<aside class="alert alert-info" markdown="1">
**Note:** You can also manage state by exporting the state to a model class
that notifies widgets when state changes have occurred. This approach is
particularly useful when you want multiple widgets to listen and respond to the
same state information.

Explaining this approach is beyond the scope of this tutorial,
but you can try it out using the TapboxD example on GitHub.
The only file you need is
[lib/main.dart]().
[PENDING: Add a link once it's up on the site.]
</aside>
{% endcomment %}

How do you decide which approach to use? The following principles should help
you decide:
如何决定使用哪种管理方法？以下原则可以帮助您决定：

* If the state in question is user data,
  for example the checked or unchecked mode of a checkbox,
  or the position of a slider,
  then the state is best managed by the parent widget.
* 如果状态是用户数据，如复选框的选中状态、滑块的位置，则该状态最好由父 widget 管理

* If the state in question is aesthetic, for example an animation,
  then the state is best managed by the widget itself.
* 如果所讨论的状态是有关界面外观效果的，例如动画，那么状态最好由 widget 本身来管理.

If in doubt, start by managing state in the parent widget.
如果有疑问，首选是在父 widget 中管理状态

We'll give examples of the different ways of managing state by creating three
simple examples: TapboxA, TapboxB, and TapboxC.
The examples all work similarly&mdash;each creates a container that,
when tapped, toggles between a green or grey box.
The `_active` boolean determines the color: green for active or
grey for inactive.
我们将通过创建三个简单示例来举例说明管理状态的不同方式：TapboxA、TapboxB 和 TapboxC。
这些例子功能是相似的 - 每创建一个容器，当点击时，在绿色或灰色框之间切换。
`_active` 确定颜色：绿色为 true,灰色为 false。

<img src="/docs/development/ui/interactive/images/tapbox-active-state.png" style="border:1px solid black" alt="a large green box with the text, 'Active'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/docs/development/ui/interactive/images/tapbox-inactive-state.png" style="border:1px solid black" alt="a large grey box with the text, 'Inactive'">

These examples use
[GestureDetector](https://docs.flutter.io/flutter/widgets/GestureDetector-class.html)
to capture activity on the Container.
这些示例使用 [GestureDetector](https://docs.flutter.io/flutter/widgets/GestureDetector-class.html) 捕获 Container 上的用户动作。

<a name="self-managed"></a>
### The widget manages its own state
### widget 管理自己的状态

Sometimes it makes the most sense for the widget to manage its state internally.
For example,
[ListView](https://docs.flutter.io/flutter/widgets/ListView-class.html)
automatically scrolls when its content exceeds the render box. Most
developers using ListView don't want to manage ListView's
scrolling behavior, so ListView itself manages its scroll offset.
有时，widget 在内部管理其状态是最好的。例如， 当 [ListView](https://docs.flutter.io/flutter/widgets/ListView-class.html) 的内容超过渲染框时，
ListView 自动滚动。大多数使用 ListView 的开发人员不想管理 ListView 的滚动行为，因此 ListView 本身管理其滚动偏移量。

The `_TapboxAState` class:
_TapboxAState 类:

* Manages state for `TapboxA`.
* 管理 TapboxA 的状态.
* Defines the `_active` boolean which determines the box's current color.
* 定义布尔值 `_active` 确定盒子的当前颜色.
* Defines the `_handleTap()` function, which updates `_active` when the box is
  tapped and calls the `setState()` function to update the UI.
* 定义 `_handleTap()` 函数，该函数在点击该盒子时更新 `_active`,并调用 `setState()` 更新UI.
* Implements all interactive behavior for the widget.
* 实现 widget 的所有交互式行为.

<!-- skip -->
{% prettify dart %}
// TapboxA manages its own state.
// TapboxA 管理自身状态.

//------------------------- TapboxA ----------------------------------

class TapboxA extends StatefulWidget {
  TapboxA({Key key}) : super(key: key);

  @override
  _TapboxAState createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  bool _active = false;

  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}

//------------------------- MyApp ----------------------------------

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Flutter Demo'),
        ),
        body: Center(
          child: TapboxA(),
        ),
      ),
    );
  }
}
{% endprettify %}

<hr>

<a name="parent-managed"></a>
### The parent widget manages the widget's state
### 父 widget 管理 widget 的 state

Often it makes the most sense for the parent widget to manage the state
and tell its child widget when to update. For example,
[IconButton](https://docs.flutter.io/flutter/material/IconButton-class.html)
allows you to treat an icon as a tappable button.
IconButton is a stateless widget because we decided that
the parent widget needs to know whether the button has been tapped,
so it can take appropriate action.
一个来说父 widget 管理状态并告诉其子 widget 何时更新通常是最合适的。
例如，[IconButton](https://docs.flutter.io/flutter/material/IconButton-class.html) 允许您将图标视为可点按的按钮。
IconButton 是一个无状态的小部件，因为我们认为父 widget 需要知道该按钮是否被点击来采取相应的处理。

In the following example, TapboxB exports its state to its parent
through a callback. Because TapboxB doesn't manage any state, it
subclasses StatelessWidget.
在以下示例中，TapboxB 通过回调将其状态到其父类。由于 TapboxB 不管理任何状态，因此它继承自 StatelessWidget。

The ParentWidgetState class:
ParentWidgetState 类：

* Manages the `_active` state for TapboxB.
* Implements `_handleTapboxChanged()`, the method called when the box is tapped.
* When the state changes, calls `setState()` to update the UI.
* 为 TapboxB 管理 `_active` 状态.
* 实现 `_handleTapboxChanged()`，当盒子被点击时调用的方法.
* 当状态改变时，调用 `setState()` 更新 UI.

The TapboxB class:
TapboxB 类：

* Extends StatelessWidget because all state is handled by its parent.
* When a tap is detected, it notifies the parent.
* 继承 `StatelessWidget` 类，因为所有状态都由其父 widget 处理.
* 当检测到点击时，它会通知父 widget.

<!-- skip -->
{% prettify dart %}
// ParentWidget manages the state for TapboxB.
// ParentWidget 为 TapboxB 管理状态.

//------------------------ ParentWidget --------------------------------

class ParentWidget extends StatefulWidget {
  @override
  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TapboxB(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//------------------------- TapboxB ----------------------------------

class TapboxB extends StatelessWidget {
  TapboxB({Key key, this.active: false, @required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;

  void _handleTap() {
    onChanged(!active);
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}
{% endprettify %}

<aside class="alert alert-success" markdown="1">
<i class="fa fa-lightbulb-o"> </i> **Tip:**
When creating API, consider using the `@required` annotation for
any parameters that your code relies on.
To use `@required`, import the [foundation
library](https://docs.flutter.io/flutter/foundation/foundation-library.html)
(which re-exports Dart's
[meta.dart](https://pub.dartlang.org/packages/meta) library):
**提示:**
 在创建 API 时，请考虑使用 @required 为代码所依赖的任何参数使用注解。
 要使用 @required 注解，请导入 [foundation library](https://docs.flutter.io/flutter/foundation/foundation-library.html) （该库重新导出 Dart 的 [meta.dart](https://pub.dartlang.org/packages/meta)）
<pre>
import 'package:flutter/foundation.dart';
</pre>
</aside>

<hr>

<a name="mix-and-match"></a>
### A mix-and-match approach
### 混搭管理

For some widgets, a mix-and-match approach makes the most sense.
In this scenario, the stateful widget manages some of the state,
and the parent widget manages other aspects of the state.
对于一些 widget 来说，混搭管理的方法最合适的。在这种情况下，有状态的 widget 自己管理一些状态，同时父 widget 管理其他方面的状态。

In the TapboxC example, on tap down, a dark green border appears around the box.
On tap up, the border disappears and the box's color changes.
TapboxC exports its `_active` state to its parent but
manages its `_highlight` state internally.
This example has two State objects, _ParentWidgetState and _TapboxCState.
在 TapboxC 示例中，点击时，盒子的周围会出现一个深绿色的边框。点击时，边框消失，盒子的颜色改变。
TapboxC 将其 `_active` 状态导出到其父 widget 中，但在内部管理其 `_highlight` 状态。这个例子有两个状态对象 `_ParentWidgetState` 和 `_TapboxCState`。

The _ParentWidgetState object:
_ParentWidgetState 对象:

* Manages the `_active` state.
* Implements `_handleTapboxChanged()`, the method called when the box is tapped.
* Calls `setState()` to update the UI when a tap occurs and the `_active`
  state changes.
* 管理`_active` 状态.
* 实现 `_handleTapboxChanged()`, 此方法在盒子被点击时调用.
* 当点击盒子并且`_active`状态改变时调用`setState()`更新UI

The _TapboxCState object:
_TapboxCState 对象:

* Manages the `_highlight` state.
* The GestureDetector listens to all tap events.
  As the user taps down, it adds the highlight
  (implemented as a dark green border).
  As the user releases the tap, it removes the highlight.
* Calls `setState()` to update the UI on tap down, tap up, or tap cancel, and
  the `_highlight` state changes.
* On a tap event, passes that state change to the parent widget to take
  appropriate action using the
  [widget](https://docs.flutter.io/flutter/widgets/State/widget.html)
  property.
  
* 管理 `_highlight` state.
* `GestureDetector` 监听所有 tap 事件。当用户点下时，它添加高亮（深绿色边框）；当用户释放时，会移除高亮。
* 当按下、抬起、或者取消点击时更新 `_highlight` 状态，调用 `setState()` 更新UI。
* 当点击时，[widget](https://docs.flutter.io/flutter/widgets/State/widget.html) 属性将状态的改变传递给父 widget 并进行合适的操作.

<!-- skip -->
{% prettify dart %}
//---------------------------- ParentWidget ----------------------------

class ParentWidget extends StatefulWidget {
  @override
  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TapboxC(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//----------------------------- TapboxC ------------------------------

class TapboxC extends StatefulWidget {
  TapboxC({Key key, this.active: false, @required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;

  _TapboxCState createState() => _TapboxCState();
}

class _TapboxCState extends State<TapboxC> {
  bool _highlight = false;

  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _highlight = true;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTapCancel() {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTap() {
    widget.onChanged(!widget.active);
  }

  Widget build(BuildContext context) {
    // This example adds a green border on tap down.
    // On tap up, the square changes to the opposite state.
    return GestureDetector(
      onTapDown: _handleTapDown, // Handle the tap events in the order that
      onTapUp: _handleTapUp, // they occur: down, up, tap, cancel
      onTap: _handleTap,
      onTapCancel: _handleTapCancel,
      child: Container(
        child: Center(
          child: Text(widget.active ? 'Active' : 'Inactive',
              style: TextStyle(fontSize: 32.0, color: Colors.white)),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color:
              widget.active ? Colors.lightGreen[700] : Colors.grey[600],
          border: _highlight
              ? Border.all(
                  color: Colors.teal[700],
                  width: 10.0,
                )
              : null,
        ),
      ),
    );
  }
}
{% endprettify %}

An alternate implementation might have exported the highlight state to the
parent while keeping the active state internal,
but if you asked someone to use that tap box, they'd probably complain that
it doesn't make much sense. The developer cares whether the box is active.
The developer probably doesn't care how the highlighting is managed,
and prefers that the tap box handles those details.
另一种实现可能会将高亮状态导出到父 widget，同时保持 `_active` 状态为内部，但如果您要求某人使用该 TapBox，他们可能会抱怨说没有多大意义。
开发人员只会关心该框是否处于活动状态。开发人员可能不在乎高亮显示是如何管理的，并且倾向于让 TapBox 处理这些细节。
<hr>

<a name="other-interactive-widgets"></a>
## Other interactive widgets
## 其他交互式 widgets

Flutter offers a variety of buttons and similar interactive widgets.
Most of these widgets implement the [Material Design
guidelines,](https://material.io/guidelines/) which define a set of
components with an opinionated UI.

If you prefer, you can use
[GestureDetector](https://docs.flutter.io/flutter/widgets/GestureDetector-class.html)
to build interactivity into any custom widget. You can find examples of
GestureDetector in [Managing state](#managing-state), and in the
[Flutter
Gallery](https://github.com/flutter/flutter/tree/master/examples/flutter_gallery).

Flutter 提供各种按钮和类似的交互式 widget。这些 widget 中的大多数实现了 [Material Design 指南](https://material.io/guidelines/)，
它们定义了一组具有质感的UI组件。

如果你愿意，你可以使用 [GestureDetector](https://docs.flutter.io/flutter/widgets/GestureDetector-class.html) 来给任何自定义 widget 添加交互性。
您可以在[管理状态](#managing-state)和[Flutter Gallery](https://github.com/flutter/flutter/tree/master/examples/flutter_gallery)中找到 GestureDetector 的示例。
<aside class="alert alert-info" markdown="1">
**Note:**
Flutter also provides a set of iOS-style widgets called
[Cupertino](https://docs.flutter.io/flutter/cupertino/cupertino-library.html).
</aside>
**注意:**
Futter还提供了一组名为 [Cupertino](https://docs.flutter.io/flutter/cupertino/cupertino-library.html) 的 iOS 风格的小部件 。
</aside>

When you need interactivity,
it's easiest to use one of the prefabricated widgets. Here's a partial list:
当你需要交互性时，最容易的是使用预制的 widget。这是预置 widget 部分列表:

### Standard widgets:
### 标准 widgets:

* [Form](https://docs.flutter.io/flutter/widgets/Form-class.html)
* [FormField](https://docs.flutter.io/flutter/widgets/FormField-class.html)

### Material Components:
### 质感组件

* [Checkbox](https://docs.flutter.io/flutter/material/Checkbox-class.html)
* [DropdownButton](https://docs.flutter.io/flutter/material/DropdownButton-class.html)
* [FlatButton](https://docs.flutter.io/flutter/material/FlatButton-class.html)
* [FloatingActionButton](https://docs.flutter.io/flutter/material/FloatingActionButton-class.html)
* [IconButton](https://docs.flutter.io/flutter/material/IconButton-class.html)
* [Radio](https://docs.flutter.io/flutter/material/Radio-class.html)
* [RaisedButton](https://docs.flutter.io/flutter/material/RaisedButton-class.html)
* [Slider](https://docs.flutter.io/flutter/material/Slider-class.html)
* [Switch](https://docs.flutter.io/flutter/material/Switch-class.html)
* [TextField](https://docs.flutter.io/flutter/material/TextField-class.html)

## Resources
## 资源

The following resources may help when adding interactivity to your app.

* [Gestures](/docs/development/ui/widgets-intro#handling-gestures),
  a section in [A Tour of the Flutter Widget
  Framework](/docs/development/ui/widgets-intro)<br>
  How to create a button and make it respond to input.
* [处理手势](/docs/development/ui/widgets-intro#handling-gestures),
  [Flutter Widget 框架总览](/docs/development/ui/widgets-intro) 的一节<br>
  如何创建一个按钮并使其响应用户动作.
* [Gestures in Flutter](/docs/development/ui/advanced/gestures)<br>
  A description of Flutter's gesture mechanism.
* [Flutter中的手势](/docs/development/ui/advanced/gestures)<br>
  Flutter 手势机制的描述
* [Flutter API documentation](https://docs.flutter.io)<br>
  Reference documentation for all of the Flutter libraries.
* [Flutter API 文档](https://docs.flutter.io/)<br>
  所有 Flutter 库的参考文档.
* [Flutter
  Gallery](https://github.com/flutter/flutter/tree/master/examples/flutter_gallery)<br>
  Demo app showcasing many Material Components and other Flutter features.
* [Flutter
  Gallery](https://github.com/flutter/flutter/tree/master/examples/flutter_gallery)<br>
  一个 Demo 应用程序，展示了许多质感组件和其他 Flutter 功能
* [Flutter's Layered
   Design (video)](https://www.youtube.com/watch?v=dkyY9WCGMi0)<br>
   This video includes information about state and stateless widgets.
   Presented by Google engineer, Ian Hickson.
 * [Flutter的分层设计 (video)](https://www.youtube.com/watch?v=dkyY9WCGMi0)<br>
   此视频包含有关有状态和无状态 widget 的信息。由 Google 工程师 Ian Hickson 讲解。
