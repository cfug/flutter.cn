---
title: Differentiate between ephemeral state and app state
title: 短时 (ephemeral) 和应用 (app) 状态的区别
short-title: Ephemeral versus app state
short-title: 区分短时和共享状态
prev:
  title: Start thinking declaratively
  title: 声明式的编程思维
  path: /docs/development/data-and-backend/state-mgmt/declarative
next:
  title: Simple app state management
  title: 简单的应用 (app) 状态管理
  path: /docs/development/data-and-backend/state-mgmt/simple
---

_This doc introduces app state, ephemeral state,
and how you might manage each in a Flutter app._
 
**本文将介绍应用 (app)状态 ，短时 (ephemeral) 状态, 以及在一个 Flutter 应用中你可以如何应用这两种状态**

In the broadest possible sense, the state of an app is everything that
exists in memory when the app is running. This includes the app's assets,
all the variables that the Flutter framework keeps about the UI,
animation state, textures, fonts, and so on. While this broadest
possible definition of state is valid, it's not very useful for
architecting an app.

广义上来讲，一个应用的状态就是当这个应用运行时存在于内存中的所有内容。
这包括了应用中用到的资源，所有 Flutter 框架中
有关用户界面、动画状态、纹理、字体以及其他等等的变量。
这个对于状态广义的定义是有效的，但是它对于构建一个应用来说并不是很有用。

First, you don't even manage some state (like textures).
The framework handles those for you. So a more useful definition of
state is "whatever data you need in order to rebuild your UI at any
moment in time". Second, the state that you _do_ manage yourself can
be separated into two conceptual types: ephemeral state and app state.

首先，你不需要管理一些状态（例如纹理），框架本身会替你管理。
所以对于状态的更有用的定义是“当任何时候你需要重建你的用户界面时你所需要的数据”。
其次，你需要自己**管理**的状态可以分为两种概念类型：短时 (ephemeral) 状态和应用 (app)状态。

## Ephemeral state

## 短时状态

Ephemeral state (sometimes called _UI state_ or _local state_) is the state you
can neatly contain in a single widget.

短时状态 (有时也称 **用户界面(UI)状态** 或者 **局部状态**) 是你可以完全包含在一个独立 widget 中的状态。

This is, intentionally, a vague definition, so here are a few examples. 

这是一个有点儿模糊的定义，这里有几个例子。

* current page in a [`PageView`][]

  一个 [`PageView`][] 组件中的当前页面

* current progress of a complex animation

  一个复杂动画中当前进度

* current selected tab in a `BottomNavigationBar`

  一个 `BottomNavigationBar` 中当前被选中的 tab

Other parts of the widget tree seldom need to access this kind of state.
There is no need to serialize it, and it doesn't change in complex ways.

widget 树中其他部分不需要访问这种状态。不需要去序列化这种状态，这种状态也不会以复杂的方式改变。

In other words, there is no need to use state management techniques 
(ScopedModel, Redux, etc.) on this kind of state. All you need is a 
`StatefulWidget`.

换句话说，不需要使用状态管理架构（例如 ScopedModel, Redux）去管理这种状态。你需要用的只是一个 `StatefulWidget`。

Below, you see how the currently selected item in a bottom navigation bar is
held in the `_index` field of the `_MyHomepageState` class. In this example,
`_index` is ephemeral state.

在下方你可以看到一个底部导航栏中当前被选中的项目是
如何被被保存在 `_MyHomepageState` 类 的 `_index` 变量中。在这个例子中， 
`_index` 是一个短时状态。

<?code-excerpt "state_mgmt/simple/lib/src/set_state.dart (Ephemeral)" plaster="// ... items ..."?>
```dart
class MyHomepage extends StatefulWidget {
  @override
  _MyHomepageState createState() => _MyHomepageState();
}

class _MyHomepageState extends State<MyHomepage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _index,
      onTap: (newIndex) {
        setState(() {
          _index = newIndex;
        });
      },
      // ... items ...
    );
  }
}
```

Here, using `setState()` and a field inside the StatefulWidget's State
class is completely natural. No other part of your app needs to access
`_index`. The variable only changes inside the `MyHomepage` widget.
And, if the user closes and restarts the app, you don't mind that
`_index` resets to zero.

在这里，使用 `setState()` 和一个在有状态 Widget 的 State 类中的变量是很自然的。你的 app 中的其他部分不需要访问 `_index`。
这个变量只会在 `MyHomepage` widget 中改变。而且， 如果用户关闭并重启这个 app，你不会介意 `_index` 重置回0.

## App state

## 应用状态

State that is not ephemeral, that you want to share across many parts of your 
app, and that you want to keep between user sessions, is what we call 
application state (sometimes also called shared state).

如果你想在你的应用中的多个部分之间共享一个非短时的状态，并且在用户会话期间保留这个状态，
我们称之为应用状态（有时也称共享状态）。

Examples of application state:

应用状态的一些例子：

* User preferences

  用户选项

* Login info

  登录信息

* Notifications in a social networking app

  一个社交应用中的通知

* The shopping cart in an e-commerce app

  一个电商应用中的购物车

* Read/unread state of articles in a news app

  一个新闻应用中的文章已读/未读状态

For managing app state, you'll want to research your options. Your choice 
depends on the complexity and nature of your app, your team's previous 
experience, and many other aspects. Read on.

为了管理应用状态，你需要研究你的选项。你的选择取决于你的应用的复杂度和限制，
你的团队之前的经验以及其他方面。请继续阅读。

## There is no clear-cut rule

## 没有明确的规则

To be clear, you _can_ use `State` and `setState()` to manage all of
the state in your app. In fact, the Flutter team does this in many
simple app samples (including the starter app that you get with every
`flutter create`).

需要说明的是，你*可以*使用 `State` 和 `setState()` 管理你的应用中的所有状态。实际上Flutter团队在很多简单的
示例程序（包括你每次使用 `flutter create` 命令创建的初始应用）中正是这么做的。

It goes the other way, too. For example, you might decide that&mdash;in
the context of your particular app&mdash;the selected tab in a bottom
navigation bar is _not_ ephemeral state. You might need to change it
from outside the class, keep it between sessions, and so on.
In that case, the `_index` variable is app state.

也可以用另外一种方式。比如，在一个特定的应用中，
你可以指定底部导航栏中被选中的项目*不是*一个短时状态。
你可能需要在底部导航栏类的外部来改变这个值，并在对话期间保留它。
在种情况下 `_index` 就是一个应用状态。 

There is no clear-cut, universal rule to distinguish whether a particular 
variable is ephemeral or app state. Sometimes, you'll have to refactor one into 
another. For example, you'll start with some clearly ephemeral state, but as 
your application grows in features, it will need to be moved to app state.

没有一个明确、普遍的规则来区分一个变量属于短时状态还是应用状态，
有时你不得不在此之间重构。比如，刚开始你认为一些状态是短时状态，
但随着应用不断增加功能，有些状态需要被改变为应用状态。

For that reason, take the following diagram with a large grain of salt:

因此，请有保留地遵循以下这张流程图：

{% asset development/data-and-backend/state-mgmt/ephemeral-vs-app-state alt="A flow chart. Start with 'Data'. 'Who needs it?'. Three options: 'Most widgets', 'Some widgets' and 'Single widget'. The first two options both lead to 'App state'. The 'Single widget' option leads to 'Ephemeral state'." %}

{% comment %}
Source drawing for the png above: : https://docs.google.com/drawings/d/1p5Bvuagin9DZH8bNrpGfpQQvKwLartYhIvD0WKGa64k/edit?usp=sharing
{% endcomment %}

When asked about React's setState versus Redux's store, the author of Redux,
Dan Abramov, replied:

当我们就 React 的 setState 和 Redux 的 Store 哪个好这个问题问 Redux 的作者 Dan Abramov 时, 他如此回答:

> "The rule of thumb is: [Do whatever is less awkward][]."
>
> "经验原则是: [选择能够减少麻烦的方式][Do whatever is less awkward]"

In summary, there are two conceptual types of state in any Flutter app.
Ephemeral state can be implemented using `State` and `setState()`,
and is often local to a single widget. The rest is your app state.
Both types have their place in any Flutter app, and the split between
the two depends on your own preference and the complexity of the app.

总之，在任何 Flutter 应用中都存在两种概念类型的状态，
短时状态经常被用于一个单独 widget 的本地状态，
通常使用 `State` 和 `setState()` 来实现。
其他的是你的应用应用状态，在任何一个 Flutter 应用中这两种状态都有自己的位置。
如何划分这两种状态取决于你的偏好以及应用的复杂度。

[`PageView`]: {{site.api}}/flutter/widgets/PageView-class.html
[Do whatever is less awkward]: {{site.github}}/reduxjs/redux/issues/1287#issuecomment-175351978
