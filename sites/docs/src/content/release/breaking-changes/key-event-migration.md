---
# title: Migrate RawKeyEvent/RawKeyboard system to KeyEvent/HardwareKeyboard system
title: 从 RawKeyEvent/RawKeyboard 系统迁移到 KeyEvent/HardwareKeyboard 系统
# description: >-
#   The raw key event subsystem has been superseded by the key event subsystem,
#   and APIs that use RawKeyEvent and RawKeyboard are converted to KeyEvent and
#   HardwareKeyboard.
description: >-
  原始按键事件子系统已被按键事件子系统取代，
  使用 RawKeyEvent 和 RawKeyboard 的 API
  已转换为 KeyEvent 和 HardwareKeyboard。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

For some time now (years), Flutter has had two key event systems implemented.
The new system reached parity with the old platform-specific raw key event
system, and the raw system has been deprecated.

多年来，Flutter 同时实现了两套按键事件系统。
新系统已经与旧的、特定于平台的原始按键事件系统能力相当，
原始系统已被弃用。

## Context

## 背景

In the original key event subsystem, handling each platform's quirks in the
framework and in client apps caused overly complex code, and the old system
didn't properly represent the true state of key events on the system.

在最初的按键事件子系统中，框架和客户端应用都要处理各平台的特殊行为，
代码因此过于复杂，旧系统也无法正确表示系统上按键事件的真实状态。

The legacy API [`RawKeyboard`][] has been deprecated
and will be removed in the future.
The [`HardwareKeyboard`][] and [`KeyEvent`][] APIs replace this legacy API.
An example of this change is [`FocusNode.onKeyEvent`][]
replacing `FocusNode.onKey`.

旧 API [`RawKeyboard`][] 已被弃用，并将在未来移除。
[`HardwareKeyboard`][] 和 [`KeyEvent`][] API 取代了这个旧 API。
例如，[`FocusNode.onKeyEvent`][] 取代了 `FocusNode.onKey`。

The behavior of [`RawKeyboard`][] provided a
less unified and less regular event model
than [`HardwareKeyboard`][] does.
Consider the following examples:

[`RawKeyboard`][] 的行为所提供的事件模型
不如 [`HardwareKeyboard`][] 统一、规律。
请看下面的例子：

* Down events were not always matched with an up event, and vice versa (the set
  of pressed keys was silently updated).

  按下事件并不总是与抬起事件成对出现，反之亦然
  （已按下按键的集合会被静默更新）。

* The logical key of the down event was not always the same as that of the up
  event.

  按下事件的逻辑键并不总是与抬起事件相同。

* Down events and repeat events were not easily distinguishable (had to be
  tracked manually).

  按下事件和重复事件不容易区分（必须手动跟踪）。

* Lock modes (such as CapsLock) only had their "enabled" state recorded. There
  was no way to acquire their pressed state.

  锁定模式（例如 CapsLock）只记录了「已启用」状态。
  无法获取它们的按下状态。

So, the new [`KeyEvent`][]/[`HardwareKeyboard`][]-based system was born and, to
minimize breaking changes, was implemented in parallel with the old system with
the intention of eventually deprecating the raw system. That time has arrived,
and application developers should migrate their code to avoid breaking changes
that will occur when the deprecated APIs are removed.

因此出现了基于 [`KeyEvent`][] 和 [`HardwareKeyboard`][] 的新系统。
为了尽量减少破坏性改动，它与旧系统并行实现，
并打算最终弃用原始系统。现在时机已到，
应用开发者应当迁移代码，以免已弃用的 API 被移除时遇到破坏性改动。

## Description of change

## 变更说明

Below are the APIs that have been deprecated.

以下是已被弃用的 API。

### Deprecated APIs that have an equivalent

### 有对应替代的已弃用 API

* [`Focus.onKey`][] => [`Focus.onKeyEvent`][]
* [`FocusNode.attach`][]'s `onKey` argument => `onKeyEvent` argument
* [`FocusNode.onKey`][] => [`FocusNode.onKeyEvent`][]
* [`FocusOnKeyCallback`][] => [`FocusOnKeyEventCallback`][]
* [`FocusScope.onKey`][] => [`FocusScope.onKeyEvent`][]
* [`FocusScopeNode.onKey`][] => [`FocusScopeNode.onKeyEvent`][]
* [`RawKeyboard`][] => [`HardwareKeyboard`][]
* [`RawKeyboardListener`][] => [`KeyboardListener`][]
* [`RawKeyDownEvent`][] => [`KeyDownEvent`][]
* [`RawKeyEvent`][] => [`KeyEvent`][]
* [`RawKeyUpEvent`][] => [`KeyUpEvent`][]

### APIs that have been discontinued

### 已停止提供的 API

These APIs are no longer needed once there is only one key event system, or
their functionality is no longer offered.

只剩一套按键事件系统之后，这些 API 不再需要，
或者它们的功能不再提供。

* [`debugKeyEventSimulatorTransitModeOverride`][]
* [`GLFWKeyHelper`][]
* [`GtkKeyHelper`][]
* [`KeyboardSide`][]
* [`KeyDataTransitMode`][]
* [`KeyEventManager`][]
* [`KeyHelper`][]
* [`KeyMessage`][]
* [`KeyMessageHandler`][]
* [`KeySimulatorTransitModeVariant`][]
* [`ModifierKey`][]
* [`RawKeyEventData`][]
* [`RawKeyEventDataAndroid`][]
* [`RawKeyEventDataFuchsia`][]
* [`RawKeyEventDataIos`][]
* [`RawKeyEventDataLinux`][]
* [`RawKeyEventDataMacOs`][]
* [`RawKeyEventDataWeb`][]
* [`RawKeyEventDataWindows`][]
* [`RawKeyEventHandler`][]
* [`ServicesBinding.keyEventManager`][]

## Migration guide

## 迁移指南

The Flutter framework libraries have already been migrated.
If your code uses any of the classes or methods listed in
the previous section, migrate to these new APIs.

Flutter 框架库已经完成迁移。
如果你的代码使用了上一节列出的任何类或方法，请迁移到这些新 API。

### Migrating your code that uses `RawKeyEvent`

### 迁移使用 `RawKeyEvent` 的代码

For the most part, there are equivalent `KeyEvent` APIs available for all of the
`RawKeyEvent` APIs.

在大多数情况下，所有 `RawKeyEvent` API 都有对应的 `KeyEvent` API。

Some APIs relating to platform specific information contained in
[`RawKeyEventData`][] objects or their subclasses have been removed and are no
longer supported. One exception is that [`RawKeyEventDataAndroid.eventSource`][]
information is accessible now as [`KeyEvent.deviceType`][] in a more
platform independent form.

与 [`RawKeyEventData`][] 对象或其子类中特定于平台的信息相关的一些 API
已被移除，不再受支持。一个例外是
[`RawKeyEventDataAndroid.eventSource`][] 的信息现在可以通过
[`KeyEvent.deviceType`][] 获取，形式更加独立于平台。

#### Migrating `isKeyPressed` and related functions

#### 迁移 `isKeyPressed` 及相关函数

If the legacy code used the [`RawKeyEvent.isKeyPressed`][],
[`RawKeyEvent.isControlPressed`][], [`RawKeyEvent.isShiftPressed`][],
[`RawKeyEvent.isAltPressed`][], or [`RawKeyEvent.isMetaPressed`][] APIs, there
are now equivalent functions on the [`HardwareKeyboard`][] singleton instance,
but are not available on [KeyEvent]. [`RawKeyEvent.isKeyPressed`][] is available
as [`HardwareKeyboard.isLogicalKeyPressed`][].

如果旧代码使用了 [`RawKeyEvent.isKeyPressed`][]、
[`RawKeyEvent.isControlPressed`][]、[`RawKeyEvent.isShiftPressed`][]、
[`RawKeyEvent.isAltPressed`][] 或 [`RawKeyEvent.isMetaPressed`][] API，
现在 [`HardwareKeyboard`][] 单例上有对应函数，
但 [KeyEvent] 上没有。
[`RawKeyEvent.isKeyPressed`][] 对应
[`HardwareKeyboard.isLogicalKeyPressed`][]。

Before:

之前：

```dart
KeyEventResult _handleKeyEvent(RawKeyEvent keyEvent) {
  if (keyEvent.isControlPressed ||
      keyEvent.isShiftPressed ||
      keyEvent.isAltPressed ||
      keyEvent.isMetaPressed) {
    print('Modifier pressed: $keyEvent');
  }
  if (keyEvent.isKeyPressed(LogicalKeyboardKey.keyA)) {
    print('Key A pressed.');
  }
  return KeyEventResult.ignored;
}
```

After:

之后：

```dart
KeyEventResult _handleKeyEvent(KeyEvent _) {
  if (HardwareKeyboard.instance.isControlPressed ||
      HardwareKeyboard.instance.isShiftPressed ||
      HardwareKeyboard.instance.isAltPressed ||
      HardwareKeyboard.instance.isMetaPressed) {
    print('Modifier pressed: $keyEvent');
  }
  if (HardwareKeyboard.instance.isLogicalKeyPressed(LogicalKeyboardKey.keyA)) {
    print('Key A pressed.');
  }
  return KeyEventResult.ignored;
}
```

#### Setting `onKey` for focus

#### 为焦点设置 `onKey`

If the legacy code was using the [`Focus.onKey`][], [`FocusScope.onKey`][],
[`FocusNode.onKey`][], or [`FocusScopeNode.onKey`][] parameters, then there is
an equivalent [`Focus.onKeyEvent`][], [`FocusScope.onKeyEvent`][],
[`FocusNode.onKeyEvent`][], or [`FocusScopeNode.onKeyEvent`][] parameter that
supplies `KeyEvent`s instead of `RawKeyEvent`s.

如果旧代码使用了 [`Focus.onKey`][]、[`FocusScope.onKey`][]、
[`FocusNode.onKey`][] 或 [`FocusScopeNode.onKey`][] 参数，
现在有对应的 [`Focus.onKeyEvent`][]、[`FocusScope.onKeyEvent`][]、
[`FocusNode.onKeyEvent`][] 或 [`FocusScopeNode.onKeyEvent`][] 参数，
它们提供的是 `KeyEvent` 而不是 `RawKeyEvent`。

Before:

之前：

```dart
Widget build(BuildContext context) {
  return Focus(
    onKey: (RawKeyEvent keyEvent) {
      print('Key event: $keyEvent');
      return KeyEventResult.ignored;
    }
    child: child,
  );
}
```

After:

之后：

```dart
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (KeyEvent keyEvent) {
      print('Key event: $keyEvent');
      return KeyEventResult.ignored;
    }
    child: child,
  );
}
```

#### Repeat key event handling

#### 重复按键事件的处理

If you were relying on the [`RawKeyEvent.repeat`][] attribute to determine if a
key was a repeated key event, that has now been separated into a separate
[`KeyRepeatEvent`][] type.

如果你依赖 [`RawKeyEvent.repeat`][] 属性来判断某个键是否为重复按键事件，
现在它已被拆成单独的 [`KeyRepeatEvent`][] 类型。

Before:

之前：

```dart
KeyEventResult _handleKeyEvent(RawKeyEvent keyEvent) {
  if (keyEvent is RawKeyDownEvent) {
    print('Key down: ${keyEvent.data.logicalKey.keyLabel}(${keyEvent.repeat ? ' (repeated)' : ''})');
  }
  return KeyEventResult.ignored;
}
```

After:

之后：

```dart
KeyEventResult _handleKeyEvent(KeyEvent _) {
  if (keyEvent is KeyDownEvent || keyEvent is KeyRepeatEvent) {
    print('Key down: ${keyEvent.logicalKey.keyLabel}(${keyEvent is KeyRepeatEvent ? ' (repeated)' : ''})');
  }
  return KeyEventResult.ignored;
}
```

Though it is not a subclass of [`KeyDownEvent`][],
a [`KeyRepeatEvent`][] is also a key down event.
Don't assume that `keyEvent is! KeyDownEvent` only allows key up events.
Check both `KeyDownEvent` and `KeyRepeatEvent`.

虽然 [`KeyRepeatEvent`][] 不是 [`KeyDownEvent`][] 的子类，
它同样是按键按下事件。
不要认为 `keyEvent is! KeyDownEvent` 就只剩下按键抬起事件。
请同时检查 `KeyDownEvent` 和 `KeyRepeatEvent`。

## Timeline

## 时间线

Landed in version: 3.18.0-7.0.pre<br>
合入版本：3.18.0-7.0.pre<br>
In stable release: 3.19.0

进入稳定版：3.19.0

## References

## 参考资料

Replacement API documentation:

替代 API 文档：

* [`Focus.onKeyEvent`][]
* [`FocusNode.onKeyEvent`][]
* [`FocusOnKeyEventCallback`][]
* [`FocusScope.onKeyEvent`][]
* [`FocusScopeNode.onKeyEvent`][]
* [`HardwareKeyboard`][]
* [`KeyboardListener`][]
* [`KeyDownEvent`][]
* [`KeyRepeatEvent`][]
* [`KeyEvent`][]
* [`KeyEventHandler`][]
* [`KeyUpEvent`][]

Relevant issues:

相关 issue：

* [`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)][]

  [应弃用并移除 `RawKeyEvent`、`RawKeyboard` 等（Issue 136419）][`RawKeyEvent` and
  `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]

Relevant PRs:

相关 PR：

* [Deprecate RawKeyEvent, et al. and exempt uses in the framework.][]

  [弃用 RawKeyEvent 等，并豁免框架内的使用。][Deprecate RawKeyEvent, et al. and exempt uses
  in the framework.]

[`debugKeyEventSimulatorTransitModeOverride`]: {{site.api}}/flutter/services/debugKeyEventSimulatorTransitModeOverride-class.html
[`Focus.onKey`]: {{site.api}}/flutter/services/Focus/onKey.html
[`FocusNode.attach`]: {{site.api}}/flutter/services/FocusNode/attach.html
[`FocusNode.onKey`]: {{site.api}}/flutter/services/FocusNode/onKey.html
[`FocusOnKeyCallback`]: {{site.api}}/flutter/services/FocusOnKeyCallback-class.html
[`FocusScope.onKey`]: {{site.api}}/flutter/services/FocusScope/onKey.html
[`FocusScopeNode.onKey`]: {{site.api}}/flutter/services/FocusScopeNode/onKey.html
[`GLFWKeyHelper`]: {{site.api}}/flutter/services/GLFWKeyHelper-class.html
[`GtkKeyHelper`]: {{site.api}}/flutter/services/GtkKeyHelper-class.html
[`KeyboardSide`]: {{site.api}}/flutter/services/KeyboardSide-class.html
[`KeyDataTransitMode`]: {{site.api}}/flutter/services/KeyDataTransitMode-class.html
[`KeyEventManager`]: {{site.api}}/flutter/services/KeyEventManager-class.html
[`KeyHelper`]: {{site.api}}/flutter/services/KeyHelper-class.html
[`KeyMessage`]: {{site.api}}/flutter/services/KeyMessage-class.html
[`KeyMessageHandler`]: {{site.api}}/flutter/services/KeyMessageHandler-class.html
[`KeySimulatorTransitModeVariant`]: {{site.api}}/flutter/services/KeySimulatorTransitModeVariant-class.html
[`ModifierKey`]: {{site.api}}/flutter/services/ModifierKey-class.html
[`RawKeyboard`]: {{site.api}}/flutter/services/RawKeyboard-class.html
[`RawKeyboardListener`]: {{site.api}}/flutter/services/RawKeyboardListener-class.html
[`RawKeyDownEvent`]: {{site.api}}/flutter/services/RawKeyDownEvent-class.html
[`RawKeyEvent`]: {{site.api}}/flutter/services/RawKeyEvent-class.html
[`RawKeyEventData`]: {{site.api}}/flutter/services/RawKeyEventData-class.html
[`RawKeyEventDataAndroid`]: {{site.api}}/flutter/services/RawKeyEventDataAndroid-class.html
[`RawKeyEventDataFuchsia`]: {{site.api}}/flutter/services/RawKeyEventDataFuchsia-class.html
[`RawKeyEventDataIos`]: {{site.api}}/flutter/services/RawKeyEventDataIos-class.html
[`RawKeyEventDataLinux`]: {{site.api}}/flutter/services/RawKeyEventDataLinux-class.html
[`RawKeyEventDataMacOs`]: {{site.api}}/flutter/services/RawKeyEventDataMacOs-class.html
[`RawKeyEventDataWeb`]: {{site.api}}/flutter/services/RawKeyEventDataWeb-class.html
[`RawKeyEventDataWindows`]: {{site.api}}/flutter/services/RawKeyEventDataWindows-class.html
[`RawKeyEventHandler`]: {{site.api}}/flutter/services/RawKeyEventHandler-class.html
[`RawKeyUpEvent`]: {{site.api}}/flutter/services/RawKeyUpEvent-class.html
[`ServicesBinding.keyEventManager`]: {{site.api}}/flutter/services/ServicesBinding/keyEventManager.html
[`Focus.onKeyEvent`]: {{site.api}}/flutter/services/Focus/onKeyEvent.html
[`FocusNode.onKeyEvent`]: {{site.api}}/flutter/services/FocusNode/onKeyEvent.html
[`FocusOnKeyEventCallback`]: {{site.api}}/flutter/services/FocusOnKeyEventCallback-class.html
[`FocusScope.onKeyEvent`]: {{site.api}}/flutter/services/FocusScope/onKeyEvent.html
[`FocusScopeNode.onKeyEvent`]: {{site.api}}/flutter/services/FocusScopeNode/onKeyEvent.html
[`HardwareKeyboard`]: {{site.api}}/flutter/services/HardwareKeyboard-class.html
[`HardwareKeyboard.isLogicalKeyPressed`]: {{site.api}}/flutter/services/HardwareKeyboard/isLogicalKeyPressed.html
[`KeyboardListener`]: {{site.api}}/flutter/services/KeyboardListener-class.html
[`KeyDownEvent`]: {{site.api}}/flutter/services/KeyDownEvent-class.html
[`KeyRepeatEvent`]: {{site.api}}/flutter/services/KeyRepeatEvent-class.html
[`KeyEvent`]: {{site.api}}/flutter/services/KeyEvent-class.html
[`KeyEventHandler`]: {{site.api}}/flutter/services/KeyEventHandler-class.html
[`KeyUpEvent`]: {{site.api}}/flutter/services/KeyUpEvent-class.html
[`RawKeyEvent.isKeyPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isKeyPressed.html
[`RawKeyEvent.isControlPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isControlPressed.html
[`RawKeyEvent.isShiftPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isShiftPressed.html
[`RawKeyEvent.isAltPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isAltPressed.html
[`RawKeyEvent.isMetaPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isMetaPressed.html
[`RawKeyEvent.repeat`]: {{site.api}}/flutter/services/RawKeyEvent/repeat.html
[`RawKeyEventDataAndroid.eventSource`]: {{site.api}}/flutter/services/RawKeyEventDataAndroid/eventSource.html
[`KeyEvent.deviceType`]: {{site.api}}/flutter/services/KeyEvent/deviceType.html
[`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]: {{site.repo.flutter}}/issues/136419
[Deprecate RawKeyEvent, et al. and exempt uses in the framework.]: {{site.repo.flutter}}/pull/136677
