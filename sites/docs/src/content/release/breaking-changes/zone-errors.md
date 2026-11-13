---
# title: "\"Zone mismatch\" message"
title: 「Zone mismatch」消息
# description: >
#   When Flutter's bindings are initialized in a different zone
#   than the Zone used for `runApp`, a warning is printed to the console.
description: >-
  当 Flutter binding 的初始化 Zone
  与 `runApp` 所用的 Zone 不同时，控制台会打印一条警告。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Starting with Flutter 3.10, the framework detects mismatches
when using Zones and reports them to the console in debug builds.

从 Flutter 3.10 起，框架会检测 Zone 使用不一致的情况，
并在调试构建中向控制台报告。

## Background

## 背景

Zones are a mechanism for managing callbacks in Dart.
While primarily useful for overriding `print` and `Timer` logic in tests,
and for catching errors in tests,
they are sometimes used for scoping global variables
to certain parts of an application.

Zone 是 Dart 中管理回调的一种机制。
它主要用于在测试中覆盖 `print` 和 `Timer` 的逻辑，以及在测试中捕获错误，
有时也用来把全局变量限定在应用的某些部分。

Flutter requires (and has always required)
that all framework code be run in the same zone.
Notably, this means that calls to
`WidgetsFlutterBinding.ensureInitialized()` should be run in the same zone
as calls to `runApp()`.

Flutter 要求（而且一直要求）所有框架代码在同一个 Zone 中运行。
特别是，`WidgetsFlutterBinding.ensureInitialized()` 的调用
应当与 `runApp()` 的调用处于同一个 Zone。

Historically, Flutter has not detected such mismatches.
This sometimes leads to obscure and hard-to-debug issues.
For example,
a callback for keyboard input might be invoked
using a zone that does not have access to the `zoneValues` that it expects.
In our experience,
most if not all code that uses Zones
in a way that does not guarantee that all parts of
the Flutter framework are working in the same Zone
has some latent bug.
Often these bugs appear unrelated to the use of Zones.

过去，Flutter 不会检测这种不一致。
这有时会导致晦涩、难以调试的问题。
例如，键盘输入的回调可能在一个
无法访问它期望的 `zoneValues` 的 Zone 中被调用。
根据我们的经验，如果代码使用 Zone 的方式
不能保证 Flutter 框架的各个部分都在同一个 Zone 中工作，
那么其中大多数（甚至全部）都存在潜伏的 bug。
这些 bug 看起来往往与 Zone 的使用无关。

To help developers who have accidentally violated this invariant,
starting with Flutter 3.10,
a non-fatal warning is printed in debug builds when a mismatch is detected.
The warning looks like the following:

为了帮助无意中违反这一不变式的开发者，
从 Flutter 3.10 起，
调试构建在检测到不一致时会打印一条非致命警告。
警告类似下面这样：

```plaintext
════════ Exception caught by Flutter framework ════════════════════════════════════
The following assertion was thrown during runApp:
Zone mismatch.

The Flutter bindings were initialized in a different zone than is now being used.
This will likely cause confusion and bugs as any zone-specific configuration will
inconsistently use the configuration of the original binding initialization zone or
this zone based on hard-to-predict factors such as which zone was active when a
particular callback was set.
It is important to use the same zone when calling `ensureInitialized` on the
binding as when calling `runApp` later.
To make this warning fatal, set BindingBase.debugZoneErrorsAreFatal to true before
the bindings are initialized (i.e. as the first statement in `void main() { }`).
[...]
═══════════════════════════════════════════════════════════════════════════════════
```

The warning can be made fatal by
setting [`BindingBase.debugZoneErrorsAreFatal`][] to `true`.
This flag might be changed to default to `true` in a future version of Flutter.

将 [`BindingBase.debugZoneErrorsAreFatal`][] 设为 `true`，
可以把这条警告变成致命错误。
未来版本的 Flutter 可能会把该标志的默认值改为 `true`。

## Migration guide

## 迁移指南

The best way to silence this message is to
remove use of Zones from within the application.
Zones can be very hard to debug,
because they are essentially global variables,
and break encapsulation.
Best practice is to avoid global variables and zones.

消除这条消息的最好办法，是从应用中移除对 Zone 的使用。
Zone 可能非常难调试，
因为它们本质上是全局变量，并且会破坏封装。
最佳实践是避免使用全局变量和 Zone。

If removing zones is not an option
(for example because the application depends on a third-party library
that relies on zones for its configuration),
then the various calls into the Flutter framework
should be moved to all be in the same zone.
Typically, this means moving the call to
`WidgetsFlutterBinding.ensureInitialized()` to the
same closure as the call to `runApp()`.

如果无法移除 Zone
（例如应用依赖的第三方库用 Zone 做配置），
就应当把进入 Flutter 框架的各次调用都放到同一个 Zone 中。
通常这意味着把 `WidgetsFlutterBinding.ensureInitialized()` 的调用
移到与 `runApp()` 调用相同的闭包里。

This can be awkward when the zone in which `runApp` is run
is being initialized with `zoneValues` obtained from a plugin
(which requires `WidgetsFlutterBinding.ensureInitialized()`
to have been called).

如果运行 `runApp` 的 Zone 要用从插件取得的 `zoneValues` 来初始化，
就会比较别扭
（取得这些值要求已经调用过 `WidgetsFlutterBinding.ensureInitialized()`）。

One option in this kind of scenario is to
place a mutable object in the `zoneValues`, and
update that object with the value once the value is available.

这种情况下的一种做法是：
在 `zoneValues` 中放入一个可变对象，
等值可用时再更新该对象。

```dart
import 'dart:async';
import 'package:flutter/material.dart';

class Mutable<T> {
  Mutable(this.value);
  T value;
}

void main() {
  var myValue = Mutable<double>(0.0);
  Zone.current.fork(
    zoneValues: {
      'myKey': myValue,
    }
  ).run(() {
    WidgetsFlutterBinding.ensureInitialized();
    var newValue = ...; // obtain value from plugin
    myValue.value = newValue; // update value in Zone
    runApp(...);
  });
}
```

In code that needs to use `myKey`,
it can be obtained indirectly using `Zone.current['myKey'].value`.

需要使用 `myKey` 的代码，
可以通过 `Zone.current['myKey'].value` 间接取得它。

When such a solution does not work
because a third-party dependency requires the use
of a specific type for a specific `zoneValues` key,
all calls into the dependency can be
wrapped in `Zone` calls that provide suitable values.

如果这种做法行不通，
是因为第三方依赖要求某个 `zoneValues` 键使用特定类型，
可以把对该依赖的所有调用包进提供合适值的 `Zone` 调用中。

It is strongly recommended that packages that use zones in this way
migrate to more maintainable solutions.

强烈建议以这种方式使用 Zone 的 package 迁移到更易维护的方案。

## Timeline

## 时间线

Landed in version: 3.9.0-9.0.pre<br>
In stable release: 3.10.0

合入版本：3.9.0-9.0.pre<br>
进入稳定版：3.10.0

## References

## 参考资料

API documentation:

API 文档：

* [`Zone`][]
* [`BindingBase.debugZoneErrorsAreFatal`][]

Relevant issues:

相关 issue：

* [Issue 94123][]: Flutter framework does not warn when ensureInitialized
  is called in a different zone than runApp

  [Issue 94123][]：当 ensureInitialized 与 runApp
  不在同一个 Zone 中调用时，Flutter 框架不会发出警告

Relevant PRs:

相关 PR：

* [PR 122836][]: Assert that runApp is called
  in the same zone as binding.ensureInitialized

  [PR 122836][]：断言 runApp 与 binding.ensureInitialized
  在同一个 Zone 中调用

[`Zone`]: {{site.api}}/flutter/dart-async/Zone-class.html
[`BindingBase.debugZoneErrorsAreFatal`]: {{site.api}}/flutter/foundation/BindingBase/debugZoneErrorsAreFatal.html
[Issue 94123]: {{site.repo.flutter}}/issues/94123
[PR 122836]: {{site.repo.flutter}}/pull/122836
