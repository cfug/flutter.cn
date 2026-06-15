---
# title: "Restore state on Android"
title: "在 Android 上恢复状态"
# description: "How to restore the state of your Android app after it's been killed by the OS."
description: "如何在操作系统终止应用后恢复 Android 应用的状态。"
ai-translated: true
---

When a user runs a mobile app and then selects another
app to run, the first app is moved to the background,
or _backgrounded_. The operating system (both iOS and Android)
might kill the backgrounded app to release memory and
improve performance for the app running in the foreground.

当用户运行移动应用后选择运行另一个应用时，第一个应用会进入后台，或称 **被置于后台**。
操作系统（iOS 与 Android 均如此）可能会终止后台应用以释放内存，并提升前台应用的性能。

When the user selects the app again, bringing it
back to the foreground, the OS relaunches it.
But, unless you've set up a way to save the
state of the app before it was killed,
you've lost the state and the app starts from scratch.
The user has lost the continuity they expect,
which is clearly not ideal.
(Imagine filling out a lengthy form and being interrupted
by a phone call _before_ clicking **Submit**.)

当用户再次选择该应用、将其带回前台时，操作系统会重新启动它。
但除非你在应用被终止前设置了保存状态的方式，否则状态会丢失，应用会从头开始。
用户会失去他们期望的连续性，这显然不理想。（想象在点击 **Submit** **之前** 填写冗长表单时被电话打断。）

So, how can you restore the state of the app so that
it looks like it did before it was sent to the
background?

那么，如何恢复应用状态，使其看起来与进入后台之前一样？

Flutter has a solution for this with the
[`RestorationManager`][] (and related classes)
in the [services][] library.
With the `RestorationManager`, the Flutter framework
provides the state data to the engine _as the state
changes_, so that the app is ready when the OS signals
that it's about to kill the app, giving the app only
moments to prepare.

Flutter 在 [services][] 库中通过
[`RestorationManager`][]（及相关类）提供解决方案。
使用 `RestorationManager` 时，Flutter 框架会在 **状态变化时** 将状态数据提供给引擎，
以便在操作系统发出即将终止应用的信号时应用已就绪，而应用只有片刻时间准备。

:::secondary 实例状态与长期状态
<!-- Instance state vs long-lived state -->
  When should you use the `RestorationManager` and
  when should you save state to long term storage?
  _Instance state_
  (also called _short-term_ or _ephemeral_ state),
  includes unsubmitted form field values, the currently
  selected tab, and so on. On Android, this is
  limited to 1 MB and, if the app exceeds this,
  it crashes with a `TransactionTooLargeException`
  error in the native code.

  何时应使用 `RestorationManager`，
  何时应将状态保存到长期存储？
  **实例状态**
  （也称 **短期** 或 **临时** 状态），
  包括未提交的表单字段值、当前选中的标签页等。在 Android 上，这限制为 1 MB；若应用超出此限制，
  原生代码会因 `TransactionTooLargeException` 错误而崩溃。
:::

[state]: /data-and-backend/state-mgmt/ephemeral-vs-app

## Overview

## 概述

You can enable state restoration with just a few tasks:

只需完成几项任务即可启用状态恢复：

1. Define a `restorationScopeId` for classes like
   `CupertinoApp`, `MaterialApp`, or `WidgetsApp`.

   为 `CupertinoApp`、`MaterialApp` 或 `WidgetsApp` 等类定义 `restorationScopeId`。

2. Define a `restorationId` for widgets that support it,
   such as [`TextField`][] and [`ScrollView`][].
   This automatically enables built-in state restoration
   for those widgets.

   为支持它的 widget（如 [`TextField`][] 和 [`ScrollView`][]）定义 `restorationId`。
   这会自动为这些 widget 启用内置状态恢复。

3. For custom widgets,
   you must decide what state you want to restore
   and hold that state in a [`RestorableProperty`][].
   (The Flutter API provides various subclasses for
   different data types.)
   Define those `RestorableProperty` widgets
   in a `State` class that uses the [`RestorationMixin`][].
   Register those widgets with the mixin in a
   `restoreState` method.

   对于自定义 widget，
   你必须决定要恢复哪些状态，
   并在 [`RestorableProperty`][] 中保存该状态。
   （Flutter API 为不同数据类型提供多种子类。）
   在使用 [`RestorationMixin`][] 的 `State` 类中定义这些 `RestorableProperty` widget。
   在 `restoreState` 方法中向 mixin 注册这些 widget。

4. If you use any Navigator API (like `push`, `pushNamed`, and so on)
   migrate to the API that has "restorable" in the name
   (`restorablePush`, `restorablePushNamed`, and so on)
   to restore the navigation stack.

   若使用任何 Navigator API（如 `push`、`pushNamed` 等），
   请迁移到名称中包含 `restorable` 的 API
   （`restorablePush`、`restorablePushNamed` 等）
   以恢复导航栈。

Other considerations:

其他注意事项：

* Providing a `restorationScopeId` to
  `MaterialApp`, `CupertinoApp`, or `WidgetsApp`
  automatically enables state restoration by
  injecting a `RootRestorationScope`.
  If you need to restore state _above_ the app class,
  inject a `RootRestorationScope` manually.

  向 `MaterialApp`、`CupertinoApp` 或 `WidgetsApp` 提供 `restorationScopeId` 
  会通过注入 `RootRestorationScope` 自动启用状态恢复。
  若需要在应用类 **之上** 恢复状态，请手动注入 `RootRestorationScope`。

* **The difference between a `restorationId` and
  a `restorationScopeId`:** Widgets that take a
  `restorationScopeId` create a new `restorationScope`
  (a new `RestorationBucket`) into which all children
  store their state. A `restorationId` means the widget
  (and its children) store the data in the surrounding bucket.


  **`restorationId` 与 `restorationScopeId` 的区别：** 
  接受 `restorationScopeId` 的 widget 会创建新的 `restorationScope`（新的 `RestorationBucket`），
  所有子级在其中保存状态。
  `restorationId` 表示该 widget（及其子级）在周围的 bucket 中保存数据。

[a bit of extra setup]: {{site.api}}/flutter/services/RestorationManager-class.html#state-restoration-on-ios
[`restorationId`]: {{site.api}}/flutter/widgets/RestorationScope/restorationId.html
[`restorationScopeId`]: {{site.api}}/flutter/widgets/RestorationScope/restorationScopeId.html
[`RestorationMixin`]: {{site.api}}/flutter/widgets/RestorationMixin-mixin.html
[`RestorationScope`]: {{site.api}}/flutter/widgets/RestorationScope-class.html
[`restoreState`]: {{site.api}}/flutter/widgets/RestorationMixin/restoreState.html
[VeggieSeasons]: https://github.com/flutter/demos/tree/main/veggieseasons

## Restoring navigation state

## 恢复导航状态

If you want your app to return to a particular route
that the user was most recently viewing
(the shopping cart, for example), then you must implement
restoration state for navigation, as well.

若希望应用返回到用户最近查看的特定路由（例如购物车），则还必须为导航实现状态恢复。

If you use the Navigator API directly,
migrate the standard methods to restorable
methods (that have "restorable" in the name).
For example, replace `push` with [`restorablePush`][].

若直接使用 Navigator API，
请将标准方法迁移为可恢复的方法（名称中包含 `restorable`）。
例如，将 `push` 替换为 [`restorablePush`][]。

## Testing state restoration

## 测试状态恢复

To test state restoration, set up your mobile device so that
it doesn't save state once an app is backgrounded.
To learn how to do this for both iOS and Android,
check out [Testing state restoration][] on the
[`RestorationManager`][] page.

要测试状态恢复，请将移动设备配置为应用进入后台后不保存状态。
要了解如何在 iOS 与 Android 上操作，
请参阅 [`RestorationManager`][] 页面上的 [Testing state restoration][]。

:::warning
Don't forget to reenable
storing state on your device once you are
finished with testing!

测试结束后，别忘了在设备上重新启用状态存储！
:::

[Testing state restoration]: {{site.api}}/flutter/services/RestorationManager-class.html#testing-state-restoration
[`RestorationBucket`]: {{site.api}}/flutter/services/RestorationBucket-class.html
[`RestorationManager`]: {{site.api}}/flutter/services/RestorationManager-class.html
[services]: {{site.api}}/flutter/services/services-library.html

## Other resources

## 其他资源

For further information on state restoration,
check out the following resources.

有关状态恢复的更多信息，请参阅以下资源。

* To learn more about short term and long term state,
  check out [Differentiate between ephemeral state
  and app state][state].

  要了解短期与长期状态的更多信息，请参阅 [区分临时状态与应用状态][state]。

* You might want to check out packages on pub.dev that
  perform state restoration, such as [`statePersistence`][].

  你可能想查看 pub.dev 上执行状态恢复的 package，例如 [`statePersistence`][]。

* For more information on navigation and the
  [`go_router`][] package, check out [Navigation and routing][]
  and the [State restoration][] topic on pub.dev.

  有关导航与 [`go_router`][] package 的更多信息，
  请参阅 [导航与路由][Navigation and routing] 以及 pub.dev 上的 [State restoration][] 主题。

[`go_router`]: {{site.pub}}/packages/go_router
[State restoration]: {{site.pub-api}}/go_router/latest/topics/State%20restoration-topic.html
[Navigation and routing]: /ui/navigation
[`RestorableProperty`]: {{site.api}}/flutter/widgets/RestorableProperty-class.html
[`restorablePush`]: {{site.api}}/flutter/widgets/Navigator/restorablePush.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView/restorationId.html
[`statePersistence`]: {{site.pub-pkg}}/state_persistence
[`TextField`]: {{site.api}}/flutter/material/TextField/restorationId.html
