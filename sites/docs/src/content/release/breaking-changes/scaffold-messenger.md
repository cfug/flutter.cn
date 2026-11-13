---
# title: SnackBars managed by the ScaffoldMessenger
title: 由 ScaffoldMessenger 管理的 SnackBar
# description: >
#   SnackBars are now managed by the ScaffoldMessenger, and persist across routes.
description: SnackBar 现由 ScaffoldMessenger 管理，并且会在路由之间保持显示。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `SnackBar` API within the `Scaffold` is now handled by the
`ScaffoldMessenger`, one of which is
available by default within the context of a `MaterialApp`.

`Scaffold` 中的 `SnackBar` API 现由 `ScaffoldMessenger` 处理。
在 `MaterialApp` 的上下文中，默认就有一个 `ScaffoldMessenger`。

## Context

## 背景

Prior to this change, `SnackBar`s would be shown by calling
on the `Scaffold` within the current `BuildContext`.
By calling `Scaffold.of(context).showSnackBar`,
the current `Scaffold` would animate a `SnackBar` into view.
This would only apply to the current `Scaffold`,
and would not persist across routes if they were changed
in the course of the `SnackBar`s presentation.
This would also lead to errors if `showSnackBar`
would be called in the course of executing an
asynchronous event, and the `BuildContext` became invalidated
by the route changing and the `Scaffold` being disposed of.

此次改动之前，显示 `SnackBar` 要调用当前 `BuildContext` 中的 `Scaffold`。
调用 `Scaffold.of(context).showSnackBar` 时，
当前 `Scaffold` 会把 `SnackBar` 动画显示出来。
这只作用于当前 `Scaffold`。
如果在 `SnackBar` 展示过程中切换了路由，它不会跨路由保留。
如果在执行异步事件的过程中调用 `showSnackBar`，
而路由变化导致 `BuildContext` 失效、`Scaffold` 已被释放，
还会因此出错。

The `ScaffoldMessenger` now handles `SnackBar`s in order to
persist across routes and always be displayed on the current `Scaffold`.
By default, a root `ScaffoldMessenger` is included in the `MaterialApp`,
but you can create your own controlled scope for the `ScaffoldMessenger`
to further control _which_ `Scaffold`s receive your `SnackBar`s.

现在由 `ScaffoldMessenger` 处理 `SnackBar`，
以便跨路由保留，并始终显示在当前 `Scaffold` 上。
默认情况下，`MaterialApp` 会包含一个根 `ScaffoldMessenger`。
你也可以自行创建受控的 `ScaffoldMessenger` 范围，
进一步控制 **哪些** `Scaffold` 会接收 `SnackBar`。

## Description of change

## 变更说明

The previous approach called upon the `Scaffold` to show a `SnackBar`.

先前的做法是让 `Scaffold` 显示 `SnackBar`。

```dart
Scaffold(
  key: scaffoldKey,
  body: Builder(
    builder: (BuildContext context) {
      return GestureDetector(
        onTap: () {
          Scaffold.of(context).showSnackBar(SnackBar(
            content: const Text('snack'),
            duration: const Duration(seconds: 1),
            action: SnackBarAction(
              label: 'ACTION',
              onPressed: () { },
            ),
          ));
        },
        child: const Text('SHOW SNACK'),
      );
    },
  )
);
```

The new approach calls on the `ScaffoldMessenger` to show
the `SnackBar`. In this case, the `Builder` is no longer
required to provide a new scope with a `BuildContext` that
is "under" the `Scaffold`.

新的做法是让 `ScaffoldMessenger` 显示 `SnackBar`。
此时不再需要 `Builder` 来提供一个位于 `Scaffold`「之下」的新 `BuildContext` 范围。

```dart
Scaffold(
  key: scaffoldKey,
  body: GestureDetector(
    onTap: () {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: const Text('snack'),
        duration: const Duration(seconds: 1),
        action: SnackBarAction(
          label: 'ACTION',
          onPressed: () { },
        ),
      ));
    },
    child: const Text('SHOW SNACK'),
  ),
);
```

When presenting a `SnackBar` during a transition,
the `SnackBar` completes a `Hero` animation,
moving smoothly to the next page.

在转场过程中展示 `SnackBar` 时，
`SnackBar` 会完成一段 `Hero` 动画，平滑移动到下一页。

The `ScaffoldMessenger` creates a scope in which all descendant
`Scaffold`s register to receive `SnackBar`s,
which is how they persist across these transitions.
When using the root `ScaffoldMessenger` provided by the
`MaterialApp`, all descendant `Scaffold`s receive `SnackBar`s,
unless a new `ScaffoldMessenger` scope is created further down the tree.
By instantiating your own `ScaffoldMessenger`,
you can control which `Scaffold`s receive `SnackBar`s, and which are not,
based on the context of your application.

`ScaffoldMessenger` 会创建一个范围，
所有后代 `Scaffold` 都在其中注册以接收 `SnackBar`，
这就是它们能跨这些转场保留的原因。
使用 `MaterialApp` 提供的根 `ScaffoldMessenger` 时，
所有后代 `Scaffold` 都会接收 `SnackBar`，
除非在树的更下层新建了 `ScaffoldMessenger` 范围。
通过自行实例化 `ScaffoldMessenger`，
你可以根据应用的上下文，控制哪些 `Scaffold` 接收 `SnackBar`、哪些不接收。

The method `debugCheckHasScaffoldMessenger` is available to assert
that a given context has a `ScaffoldMessenger` ancestor.
Trying to present  a `SnackBar` without a `ScaffoldMessenger` ancestor
present results in an assertion such as the following:

可以用 `debugCheckHasScaffoldMessenger` 方法断言
给定上下文拥有 `ScaffoldMessenger` 祖先。
在没有 `ScaffoldMessenger` 祖先时尝试展示 `SnackBar`，
会触发类似下面的断言：

```plaintext
No ScaffoldMessenger widget found.
Scaffold widgets require a ScaffoldMessenger widget ancestor.
Typically, the ScaffoldMessenger widget is introduced by the MaterialApp
at the top of your application widget tree.
```

## Migration guide

## 迁移指南

Code before migration:

迁移前的代码：

```dart
// The ScaffoldState of the current context was used for managing SnackBars.
Scaffold.of(context).showSnackBar(mySnackBar);
Scaffold.of(context).hideCurrentSnackBar(mySnackBar);
Scaffold.of(context).removeCurrentSnackBar(mySnackBar);

// If a Scaffold.key is specified, the ScaffoldState can be directly
// accessed without first obtaining it from a BuildContext via
// Scaffold.of. From the key, use the GlobalKey.currentState
// getter. This was previously used to manage SnackBars.
final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
Scaffold(
  key: scaffoldKey,
  body: ...,
);

scaffoldKey.currentState.showSnackBar(mySnackBar);
scaffoldKey.currentState.hideCurrentSnackBar(mySnackBar);
scaffoldKey.currentState.removeCurrentSnackBar(mySnackBar);

```

Code after migration:

迁移后的代码：

```dart
// The ScaffoldMessengerState of the current context is used for managing SnackBars.
ScaffoldMessenger.of(context).showSnackBar(mySnackBar);
ScaffoldMessenger.of(context).hideCurrentSnackBar(mySnackBar);
ScaffoldMessenger.of(context).removeCurrentSnackBar(mySnackBar);

// If a ScaffoldMessenger.key is specified, the ScaffoldMessengerState can be directly
// accessed without first obtaining it from a BuildContext via
// ScaffoldMessenger.of. From the key, use the GlobalKey.currentState
// getter. This is used to manage SnackBars.
final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
ScaffoldMessenger(
  key: scaffoldMessengerKey,
  child: ...
)

scaffoldMessengerKey.currentState.showSnackBar(mySnackBar);
scaffoldMessengerKey.currentState.hideCurrentSnackBar(mySnackBar);
scaffoldMessengerKey.currentState.removeCurrentSnackBar(mySnackBar);

// The root ScaffoldMessenger can also be accessed by providing a key to
// MaterialApp.scaffoldMessengerKey. This way, the ScaffoldMessengerState can be directly accessed
// without first obtaining it from a BuildContext via ScaffoldMessenger.of. From the key, use
// the GlobalKey.currentState getter.
final GlobalKey<ScaffoldMessengerState> rootScaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
MaterialApp(
  scaffoldMessengerKey: rootScaffoldMessengerKey,
  home: ...
)

rootScaffoldMessengerKey.currentState.showSnackBar(mySnackBar);
rootScaffoldMessengerKey.currentState.hideCurrentSnackBar(mySnackBar);
rootScaffoldMessengerKey.currentState.removeCurrentSnackBar(mySnackBar);
```

## Timeline

## 时间线

Landed in version: 1.23.0-13.0.pre<br>
In stable release: 2.0.0

合入版本：1.23.0-13.0.pre<br>
进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`Scaffold`][]
* [`ScaffoldMessenger`][]
* [`SnackBar`][]
* [`MaterialApp`][]

Relevant issues:

相关 issue：

* [Issue #57218][]
* [Issue #62921][]

Relevant PRs:

相关 PR：

* [ScaffoldMessenger][]
* [ScaffoldMessenger Migration][]

  [ScaffoldMessenger 迁移][ScaffoldMessenger Migration]

[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`ScaffoldMessenger`]: {{site.api}}/flutter/material/ScaffoldMessenger-class.html
[`SnackBar`]: {{site.api}}/flutter/material/SnackBar-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[Issue #57218]: {{site.repo.flutter}}/issues/57218
[Issue #62921]: {{site.repo.flutter}}/issues/62921
[ScaffoldMessenger]: {{site.repo.flutter}}/pull/64101
[ScaffoldMessenger Migration]: {{site.repo.flutter}}/pull/64170
