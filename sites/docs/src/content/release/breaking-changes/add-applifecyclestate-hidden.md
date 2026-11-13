---
# title: Migration guide for adding AppLifecycleState.hidden
title: 新增 AppLifecycleState.hidden 的迁移指南
# description: AppLifecycleState had an additional hidden state added.
description: AppLifecycleState 新增了 hidden 状态。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A new `hidden` state was added to the [`AppLifecycleState`][] enum to denote
when the application is not visible.

[`AppLifecycleState`][`AppLifecycleState`] 枚举新增了 `hidden` 状态，
用来表示应用不可见。

## Context

## 背景

The `AppLifecycleState` enum is used to indicate which lifecycle state the
application is in when [`WidgetsBindingObserver.didChangeAppLifecycleState`][]
is called.

当调用 [`WidgetsBindingObserver.didChangeAppLifecycleState`][`WidgetsBindingObserver.didChangeAppLifecycleState`]
时，`AppLifecycleState` 枚举用来表示应用处于哪个生命周期状态。

## Description of change

## 改动说明

The new state `AppLifecycleState.hidden` was added to the `AppLifecycleState`
enum in the `dart:ui` package.

`dart:ui` package 中的 `AppLifecycleState` 枚举
新增了状态 `AppLifecycleState.hidden`。

The `hidden` state is entered when all of the application views are no longer
visible to the user. On Android and iOS, this state is entered briefly whenever
the state machine traverses from inactive to paused, or from paused to inactive.
It doesn't change when paused or inactive are entered. On other platforms, it
will be in this state while the application is not visible.

当应用的所有视图对用户都不再可见时，会进入 `hidden` 状态。
在 Android 和 iOS 上，状态机从 inactive 转到 paused、
或从 paused 转到 inactive 时，都会短暂进入该状态。
进入 paused 或 inactive 本身并不会因此改变。
在其他平台上，只要应用不可见，就会处于该状态。

## Migration guide

## 迁移指南

If code has switch statements that handle all cases of the `AppLifecycleState`
enum, a new case will need to be added to handle the `AppLifecycleState.hidden`
state.

如果代码里的 switch 语句覆盖了 `AppLifecycleState` 枚举的所有情况，
需要新增一个 case 来处理 `AppLifecycleState.hidden` 状态。

Code before migration:

迁移前的代码：

```dart
void didChangeAppLifecycleState(AppLifecycleState state) {
  switch (state) {
    case AppLifecycleState.resumed:
    case AppLifecycleState.inactive:
      // Do something when the app is visible...
      break;
    case AppLifecycleState.paused:
    case AppLifecycleState.detached:
      // Do something when the app is not visible...
      break;
  }
}
```

Code after migration:

迁移后的代码：

```dart
void didChangeAppLifecycleState(AppLifecycleState state) {
  switch (state) {
    case AppLifecycleState.resumed:
    case AppLifecycleState.inactive:
      // Do something when the app is visible...
      break;
    case AppLifecycleState.hidden:  // <-- This is the new state.
    case AppLifecycleState.paused:
    case AppLifecycleState.detached:
      // Do something when the app is not visible...
      break;
  }
}
```

If there is already a `default:` case in the switch statement, or the code uses
conditionals instead, then the code will compile without changes, but the
default case or conditional will still need to be evaluated to decide if the
`hidden` state should also be handled.

如果 switch 语句里已经有 `default:` 分支，或者代码改用了条件判断，
那么代码无需修改也能编译。
但你仍然需要检查 default 分支或条件判断，
决定是否也要处理 `hidden` 状态。

## Timeline

## 时间线

Landed in version: 3.11.0-16.0.pre<br>
合入版本：3.11.0-16.0.pre<br>
In stable release: 3.13.0

进入稳定版：3.13.0

## References

## 参考资料

Relevant PRs:

相关 PR：

* [PR 42418][]: Adds `AppLifecycleState.hidden` enum value

  [PR 42418][PR 42418]：新增 `AppLifecycleState.hidden` 枚举值

[PR 42418]: {{site.repo.engine}}/pull/42418
[`WidgetsBindingObserver.didChangeAppLifecycleState`]: {{site.api}}/flutter/widgets/WidgetsBindingObserver/didChangeAppLifecycleState.html
[`AppLifecycleState`]: {{site.api}}/flutter/dart-ui/AppLifecycleState.html
