---
# title: TestWidgetsFlutterBinding.clock change
title: TestWidgetsFlutterBinding.clock 变动
# description: The Clock implementation now comes from package:clock.
description: Clock 的具体实现移至 package:clock。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `TestWidgetsFlutterBinding.clock` now comes from
`package:clock` and not `package:quiver`.

`TestWidgetsFlutterBinding.clock` 现在来自 `package:clock`，
而不再来自 `package:quiver`。

## Context

## 背景

The `flutter_test` package is removing its dependency on
the heavier weight `quiver` package in favor of a dependency
on two more targeted and lighter weight packages,
`clock` and `fake_async`.

`flutter_test` 这个 package 正在去掉对更重的 `quiver` package 的依赖，
改为依赖两个更聚焦、更轻量的 package：`clock` 和 `fake_async`。

This can affect user code which grabs the clock from a
`TestWidgetsFlutterBinding` and passes that to an API
that expects a `Clock` from `package:quiver`,
for example some code like this:

如果你的代码从 `TestWidgetsFlutterBinding` 取出 clock，
再传给一个期望 `package:quiver` 中 `Clock` 的 API，就会受到影响。
例如下面这样的代码：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(tester.binding.clock);
});
```

## Migration guide

## 迁移指南

The error you might see after this change looks something like this:

这次改动之后，你可能会看到类似这样的错误：

```plaintext
Error: The argument type 'Clock/*1*/' can't be assigned to the parameter type 'Clock/*2*/'.
 - 'Clock/*1*/' is from 'package:clock/src/clock.dart' ('<pub-cache>/clock/lib/src/clock.dart').
 - 'Clock/*2*/' is from 'package:quiver/time.dart' ('<pub-cache>/quiver/lib/time.dart').
```

### Option #1: Create a package:quiver Clock from a package:clock Clock

### 方案 1：用 package:clock 的 Clock 创建 package:quiver 的 Clock

The easiest migration is to create a `package:quiver` clock from the
`package:clock` clock, which can be done by passing the `.now` function
tearoff to the `Clock` constructor:

最简单的迁移方式，是用 `package:clock` 的 clock 创建一个 `package:quiver` 的 clock。
把 `.now` 函数的 tear-off 传给 `Clock` 构造函数即可：

Code before migration:

迁移前的代码：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(tester.binding.clock);
});
```

Code after migration:

迁移后的代码：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(Clock(tester.binding.clock.now));
});
```

### Option #2: Change the api to accept a package:clock Clock

### 方案 2：让 API 接受 package:clock 的 Clock

If you own the api you are calling,
you may want to change it to accept a `Clock`
from `package:clock`.
This is a judgement call based on how many places are
calling this API with something other than a clock
retrieved from a `TestWidgetsFlutterBinding`.

如果你拥有正在调用的 API，
可以考虑让它接受来自 `package:clock` 的 `Clock`。
这需要你自行权衡：有多少调用处传入的并不是
从 `TestWidgetsFlutterBinding` 取出的 clock。

If you go this route, your call sites that are passing
`tester.binding.clock` won't need to be modified,
but other call sites will.

如果走这条路，传入 `tester.binding.clock` 的调用处不用改，
但其他调用处需要改。

### Option #3: Change the API to accept a `DateTime function()`

### 方案 3：让 API 接受 `DateTime function()`

If you only use the `Clock` for its `now` function,
and you control the API, then you can also change it
to accept that function directly instead of a `Clock`.
This makes it easily callable with either type of `Clock`,
by passing a tearoff of the `now` method from either type of clock:

如果你只用 `Clock` 的 `now` 函数，并且你控制这个 API，
也可以让它直接接受这个函数，而不是接受 `Clock`。
这样两种 `Clock` 都很容易调用：
传入任意一种 clock 的 `now` 方法 tear-off 即可。

Calling code before migration:

迁移前的调用代码：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(tester.binding.clock);
});
```

Calling code after migration:

迁移后的调用代码：

```dart
testWidgets('some test', (WidgetTester tester) {
  modifiedApiThatTakesANowFunction(tester.binding.clock.now);
});
```

## Timeline

## 时间线

Landed in version: 1.18.0<br>
合入版本：1.18.0<br>
In stable release: 1.20

进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`TestWidgetsFlutterBinding`][]

  [`TestWidgetsFlutterBinding`][`TestWidgetsFlutterBinding`]

Relevant PRs:

相关 PR：

* [PR 54125][]: remove flutter_test quiver dep,
  use fake_async and clock instead

  [PR 54125][PR 54125]：移除 flutter_test 对 quiver 的依赖，
  改用 fake_async 和 clock

[`TestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding-class.html
[PR 54125]: {{site.repo.flutter}}/pull/54125
