---
# title: Migrate ShortcutActivator and ShortcutManager to KeyEvent system
title: 将 ShortcutActivator 与 ShortcutManager 迁移到 KeyEvent 系统
# description: >
#   The raw key event subsystem has been superseded by the key event subsystem,
#   and APIs that use RawKeyEvent and RawKeyboard are converted to KeyEvent and
#   HardwareKeyboard.
description: >-
  原始按键事件子系统已被按键事件子系统取代。
  使用 RawKeyEvent 与 RawKeyboard 的 API
  已转换为 KeyEvent 与 HardwareKeyboard。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

For some time now (years), Flutter has had two key event systems implemented.
The new system reached parity with the old platform-specific raw key event
system, and the raw system will be removed. To prepare for that, the Flutter
APIs that use the old system are being modified, and for a select few of them we
have decided to make breaking changes in the API in order to preserve the
quality of the API.

多年来，Flutter 同时实现了两套按键事件系统。
新系统已经与旧的、特定于平台的原始按键事件系统能力相当，
原始系统将被移除。
为此，使用旧系统的 Flutter API 正在修改。
其中少数 API 我们决定做破坏性改动，以保持 API 的质量。

## Context

## 背景

In the original key event subsystem handling each platform's quirks in the
framework and in client apps caused overly complex code, and the old system
didn't properly represent the true state of key events on the system.

在原来的按键事件子系统中，
要在框架和客户端应用里处理每个平台的怪癖，代码会过于复杂，
而且旧系统不能正确表示系统上按键事件的真实状态。

So, the new [`KeyEvent`][]-based system was born, and to minimize breaking
changes, was implemented in parallel with the old system with the intention of
eventually deprecating the raw system. That time is quickly arriving, and to
prepare for it, we have made some minimal breaking changes required to preserve
the quality of the API.

因此诞生了基于 [`KeyEvent`][] 的新系统。
为了尽量减少破坏性改动，它与旧系统并行实现，
目的是最终弃用原始系统。这一时刻很快就要到来。
为此，我们做了一些必要的、尽量小的破坏性改动，以保持 API 的质量。

## Description of change

## 变更说明

Summary of APIs that have been affected:

受影响 API 的概要：

- `ShortcutActivator.accepts` now takes a `KeyEvent` and `HardwareKeyboard`.

  `ShortcutActivator.accepts` 现在接收 `KeyEvent` 和 `HardwareKeyboard`。

- `ShortcutActivator.isActivatedBy` is now deprecated. Just call `accepts` instead.

  `ShortcutActivator.isActivatedBy` 现已弃用。改为直接调用 `accepts`。

- `ShortcutActivator.triggers` is now optional, and returns null if not implemented.

  `ShortcutActivator.triggers` 现在是可选的，未实现时返回 null。

- `ShortcutManager.handleKeypress` now takes a `KeyEvent`.

  `ShortcutManager.handleKeypress` 现在接收 `KeyEvent`。

The change modifies the `ShortcutActivator.accepts` method to take a `KeyEvent`
and `HardwareKeyboard` instead of the previous `RawKeyEvent` and `RawKeyboard`.

此次改动让 `ShortcutActivator.accepts` 方法接收 `KeyEvent` 和 `HardwareKeyboard`，
而不再是先前的 `RawKeyEvent` 和 `RawKeyboard`。

The meaning of `ShortcutActivator.accepts` has changed slightly. Before the
change, it was assumed that `accepts` was only called if
`ShortcutActivator.triggers` returned null, or if the key event sent to `accepts`
had a logical key that was in the `triggers` list. Now it is always called, and
may use the `triggers` list as a performance improvement, but is not required
to. Flutter subclasses such as `SingleActivator` and `CharacterActivator`
already do this.

`ShortcutActivator.accepts` 的含义略有变化。
改动之前，假定只有在 `ShortcutActivator.triggers` 返回 null，
或者传给 `accepts` 的按键事件的逻辑键位于 `triggers` 列表中时，
才会调用 `accepts`。
现在它总会被调用，可以把 `triggers` 列表用作性能优化，但不是必须的。
Flutter 的子类（如 `SingleActivator` 和 `CharacterActivator`）已经这样做了。

The change also modifies the `ShortcutManager.handleKeypress` method to take a
`KeyEvent` instead of `RawKeyEvent`.

此次改动还让 `ShortcutManager.handleKeypress` 方法接收 `KeyEvent`，
而不再是 `RawKeyEvent`。

## Migration guide

## 迁移指南

APIs provided by the Flutter framework are already migrated. Migration is
needed only if you're using any of the methods listed in the previous section.

Flutter 框架提供的 API 已经完成迁移。
只有在使用上一节列出的方法时才需要迁移。

### Migrating your APIs that use `ShortcutActivator` or its subclasses.

### 迁移使用 `ShortcutActivator` 或其子类的 API

Pass a `KeyEvent` instead of a `RawKeyEvent` to `ShortcutActivator.accepts`.
This may mean switching where you get your key events from. Depending on where
you get them, this can either mean switching to using `Focus.onKeyEvent` instead
of `Focus.onKey`, or a similar change if using `FocusScope`, `FocusNode` or
`FocusScopeNode`.

向 `ShortcutActivator.accepts` 传入 `KeyEvent`，而不再是 `RawKeyEvent`。
这可能意味着要换一个获取按键事件的地方。
取决于事件来源，可以改为使用 `Focus.onKeyEvent` 而不是 `Focus.onKey`；
如果使用 `FocusScope`、`FocusNode` 或 `FocusScopeNode`，也做类似调整。

If you're using a `RawKeyboardListener`, switch to using a
`KeyboardListener` instead. If you're accessing `RawKeyboard` directly, use
`HardwareKeyboard` instead. You'll find that there are non-raw equivalents for
all of the key event sources.

如果使用 `RawKeyboardListener`，请改用 `KeyboardListener`。
如果直接访问 `RawKeyboard`，请改用 `HardwareKeyboard`。
所有按键事件来源都有对应的非 raw 等价物。

### Migrating your APIs that extend `ShortcutActivator`

### 迁移扩展 `ShortcutActivator` 的 API

The `ShortcutActivator.accepts` method was modified to take a `KeyEvent` and a
`HardwareKeyboard` instead of a `RawKeyEvent` and `RawKeyboard`.

`ShortcutActivator.accepts` 方法已改为接收 `KeyEvent` 和 `HardwareKeyboard`，
而不再是 `RawKeyEvent` 和 `RawKeyboard`。

Before:

之前：

```dart
class MyActivator extends ShortcutActivator {
  @override
  bool accepts(RawKeyEvent event, RawKeyboard state) {
    // ... (your implementation here)
    returns false;
  }
  // ...
}
```

After:

之后：

```dart
class MyActivator extends ShortcutActivator {
  @override
  bool accepts(KeyEvent event, HardwareKeyboard state) {
    // ... (your implementation here)
    returns false;
  }
  // ...
}
```

### Migrating your APIs that extend `ShortcutManager`

### 迁移扩展 `ShortcutManager` 的 API

The `ShortcutManager` class was modified to take `KeyEvent`s in `handleKeypress`
instead of `RawKeyEvent`s.  One difference in the two APIs is that repeated keys
are determined differently. In the `RawKeyEvent` case, the `repeat` member
indicated a repeat, but in `RawKeyEvent` code, the event is a different type
(`KeyRepeatEvent`).

`ShortcutManager` 类已改为在 `handleKeypress` 中接收 `KeyEvent`，
而不再是 `RawKeyEvent`。
两套 API 的一个差别是重复按键的判定方式不同。
在 `RawKeyEvent` 中，`repeat` 成员表示重复；
而在 `KeyEvent` 相关代码中，重复事件是另一种类型（`KeyRepeatEvent`）。

Before:

之前：

```dart
class _MyShortcutManager extends ShortcutManager {
  @override
  KeyEventResult handleKeypress(BuildContext context, RawKeyEvent event) {
    if (event is! RawKeyDownEvent) {
      return KeyEventResult.ignored;
    }
    if (event.repeat) {
      // (Do something with repeated keys.)
    }
    // ... (your implementation here)
    return KeyEventResult.handled;
  }
}
```

After:

之后：

```dart
class _MyShortcutManager extends ShortcutManager {
  @override
  KeyEventResult handleKeypress(BuildContext context, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    if (event is KeyRepeatEvent) {
      // (Do something with repeated keys.)
    }
    // ... (your implementation here)
    return KeyEventResult.handled;
  }
}
```

## Timeline

## 时间线

Landed in version: 3.17.0-5.0.pre<br>
In stable release: 3.19.0

合入版本：3.17.0-5.0.pre<br>
进入稳定版：3.19.0

## References

## 参考资料

API documentation:

API 文档：

* [`KeyEvent`][]
* [`HardwareKeyboard`][]
* [`ShortcutActivator`][]
* [`ShortcutManager`][]

Relevant issues:

相关 issue：

* [`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)][]

  `RawKeyEvent`、`RawKeyboard` 等应被弃用并移除
  （Issue 136419）：
  [该 issue][`RawKeyEvent` and `RawKeyboard`,
  et al should be deprecated and removed (Issue 136419)]

Relevant PRs:

相关 PR：

* [Prepare ShortcutActivator and ShortcutManager to migrate to KeyEvent from RawKeyEvent][]

  让 ShortcutActivator 与 ShortcutManager
  准备从 RawKeyEvent 迁移到 KeyEvent：
  [该 PR][Prepare ShortcutActivator and ShortcutManager
  to migrate to KeyEvent from RawKeyEvent]

[`KeyEvent`]: {{site.api}}/flutter/services/KeyEvent-class.html
[`HardwareKeyboard`]: {{site.api}}/flutter/services/HardwareKeyboard-class.html
[`ShortcutActivator`]: {{site.api}}/flutter/widgets/ShortcutActivator-class.html
[`ShortcutManager`]: {{site.api}}/flutter/widgets/ShortcutManager-class.html
[`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]: {{site.repo.flutter}}/issues/136419
[Prepare ShortcutActivator and ShortcutManager to migrate to KeyEvent from RawKeyEvent]: {{site.repo.flutter}}/pull/136854
