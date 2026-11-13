---
# title: FlutterMain.setIsRunningInRobolectricTest on Android removed
title: 移除 Android 上的 FlutterMain.setIsRunningInRobolectricTest
# description: >
#     The test-only FlutterMain.setIsRunningInRobolectricTest API on the
#     Android engine is consolidated into the FlutterInjector.
description: >-
  Android 引擎上仅用于测试的
  FlutterMain.setIsRunningInRobolectricTest API
  已并入 FlutterInjector。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

If you write Java JUnit tests (such as Robolectric tests)
against the Flutter engine's Java embedding and used the
`FlutterMain.setIsRunningInRobolectricTest(true)` API,
replace it with the following:

如果你针对 Flutter 引擎的 Java 嵌入编写 Java JUnit 测试
（例如 Robolectric 测试），并且使用了
`FlutterMain.setIsRunningInRobolectricTest(true)` API，
请改用下面的写法：

```java
FlutterJNI mockFlutterJNI = mock(FlutterJNI.class);
FlutterInjector.setInstance(
        new FlutterInjector.Builder()
            .setFlutterLoader(new FlutterLoader(mockFlutterJNI))
            .build());
```

This should be very uncommon.

这种情况应该非常少见。

## Context

## 上下文

The `FlutterMain` class itself is being deprecated and replaced with the
`FlutterInjector` class. The `FlutterMain` class uses a number of
static variables and functions than make it difficult to test.
`FlutterMain.setIsRunningInRobolectricTest()` is one ad-hoc static
mechanism to allow tests to run on the host machine on JVM without
loading the `libflutter.so` native library
(which can't be done on the host machine).

`FlutterMain` 类本身正在被废弃，并由 `FlutterInjector` 类取代。
`FlutterMain` 类使用了不少静态变量和函数，让测试变得困难。
`FlutterMain.setIsRunningInRobolectricTest()` 是一种临时的静态机制，
让测试可以在宿主机器的 JVM 上运行，
而不必加载 `libflutter.so` 原生库（宿主机器上无法加载它）。

Rather than one-off solutions, all dependency injections needed for tests
in Flutter's Android/Java engine embedding are now moved to the
[`FlutterInjector`] class.

不再采用一次性的解决办法。
Flutter 的 Android/Java 引擎嵌入中，测试所需的依赖注入现在都移到了
[`FlutterInjector`][] 类。

[`FlutterInjector`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/FlutterInjector.java

Within the `FlutterInjector` class,
the `setFlutterLoader()` Builder
function allows for control of how the
[`FlutterLoader`][] class locates and loads
the `libflutter.so` library.

在 `FlutterInjector` 类中，
Builder 的 `setFlutterLoader()` 函数可以控制
[`FlutterLoader`][] 类如何定位并加载 `libflutter.so` 库。

[`FlutterLoader`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/embedding/engine/loader/FlutterLoader.java

## Description of change

## 变更说明

This [engine commit][] removed the
`FlutterMain.setIsRunningInRobolectricTest()` testing function;
and the following [commit][] added a
`FlutterInjector` class to assist testing.
[PR 20473][] further refactored `FlutterLoader`
and `FlutterJNI` to allow for additional mocking and testing.

这次 [引擎提交][engine commit] 移除了测试函数
`FlutterMain.setIsRunningInRobolectricTest()`；
随后的 [提交][commit] 增加了 `FlutterInjector` 类来辅助测试。
[PR 20473][] 进一步重构了 `FlutterLoader` 和 `FlutterJNI`，
以便做更多模拟和测试。

[commit]: {{site.repo.engine}}/commit/15f5696c4139a21e1fc54014ce17d01f6ad1737c#diff-f928557f2d60773a8435366400fa42ed
[engine commit]: {{site.repo.engine}}/commit/15f5696c4139a21e1fc54014ce17d01f6ad1737c#diff-599e1d64442183ead768757cca6805c3L154
[PR 20473]: {{site.repo.engine}}/pull/20473
to allow for additional mocking/testing.

以便进行更多模拟和测试。

## Migration guide

## 迁移指南

Code before migration:

迁移之前的代码：

```java
FlutterMain.setIsRunningInRobolectricTest(true);
```

Code after migration:

迁移之后的代码：

```java
FlutterJNI mockFlutterJNI = mock(FlutterJNI.class);
FlutterInjector.setInstance(
        new FlutterInjector.Builder()
            .setFlutterLoader(new FlutterLoader(mockFlutterJNI))
            .build());
```

## Timeline

## 时间线

Landed in version: 1.22.0-2.0.pre.133<br>
合入版本：1.22.0-2.0.pre.133<br>
In stable release: 2.0.0

进入稳定版：2.0.0
