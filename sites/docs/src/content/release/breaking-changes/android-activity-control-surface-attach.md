---
# title: Android ActivityControlSurface attachToActivity signature change
title: Android ActivityControlSurface.attachToActivity 签名变更
# description: >
#   attachToActivity activity parameter changed to
#   ExclusiveAppComponent instead of Activity.
description: >
  attachToActivity 的 activity 参数已从 Activity
  改为 ExclusiveAppComponent。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

:::note
If you use standard Android embedding Java classes like
[`FlutterActivity`][] or [`FlutterFragment`][],
and don't manually embed a [`FlutterView`][]
inside your own custom `Activity` (this should be uncommon),
you can stop reading.

如果你使用的是 [`FlutterActivity`][`FlutterActivity`]
或 [`FlutterFragment`][`FlutterFragment`] 这类标准 Android 嵌入 Java 类，
并且没有在自定义 `Activity` 里手动嵌入 [`FlutterView`][`FlutterView`]
（这种情况应该不常见），可以不必继续阅读。
:::

A new [`ActivityControlSurface`][] method:

新增的 [`ActivityControlSurface`][`ActivityControlSurface`] 方法：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

is replacing the now deprecated method:

它将取代现已弃用的方法：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

The existing deprecated method with the `Activity`
parameter was removed in Flutter 2.

带 `Activity` 参数的原有弃用方法已在 Flutter 2 中移除。

## Context

## 背景

In order for custom Activities to also supply the `Activity`
lifecycle events Flutter plugins expect using the
[`ActivityAware`][] interface, the [`FlutterEngine`][]
exposed a [`getActivityControlSurface()`][] API.

为了让自定义 Activity 也能通过 [`ActivityAware`][`ActivityAware`] 接口
提供 Flutter 插件所期望的 `Activity` 生命周期事件，
[`FlutterEngine`][`FlutterEngine`] 暴露了
[`getActivityControlSurface()`][`getActivityControlSurface()`] API。

This allows custom Activities to signal to the engine
(with which it has a `(0|1):1` relationship) that
it was being attached or detached from the engine.

自定义 Activity 可以借此告知引擎
（二者是 `(0|1):1` 的关系）：
自己正在挂接到引擎，或正在从引擎上分离。

:::note
This lifecycle signaling is done automatically when you
use the engine's bundled [`FlutterActivity`][]
or [`FlutterFragment`][], which should be the most
common case.

使用引擎自带的 [`FlutterActivity`][`FlutterActivity`]
或 [`FlutterFragment`][`FlutterFragment`] 时，
这套生命周期通知会自动完成。这应该是最常见的情况。
:::

However, the previous API had the flaw that it didn't
enforce exclusion between activities connecting to
the engine, thus enabling `n:1` relationships between
the activity and the engine,
causing lifecycle cross-talk issues.

不过，旧 API 有一个缺陷：它不强制连接到引擎的各个 Activity 互斥，
因此 Activity 与引擎之间可以形成 `n:1` 关系，
从而造成生命周期事件串扰。

## Description of change

## 改动说明

After [Issue #21272][], instead of attaching your activity
to the [`FlutterEngine`][] by using the:

在 [Issue #21272][Issue #21272] 之后，不要再用下面的方法
把 Activity 挂接到 [`FlutterEngine`][`FlutterEngine`]：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

API, which is now deprecated, instead use:

该方法现已弃用，请改用：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

An `ExclusiveAppComponent<Activity>` interface
is now expected instead of an `Activity`.
The `ExclusiveAppComponent<Activity>` provides a callback
in case your exclusive activity is being replaced by
another activity attaching itself to the `FlutterEngine`.

现在期望传入的是 `ExclusiveAppComponent<Activity>` 接口，而不是 `Activity`。
当你独占的 Activity 被另一个挂接到 `FlutterEngine` 的 Activity 替换时，
`ExclusiveAppComponent<Activity>` 会提供一个回调。

```java
void detachFromActivity();
```

API remains unchanged and you're still expected
to call it when your custom
activity is being destroyed naturally.

这个 API 没有变化。自定义 Activity 正常销毁时，你仍然需要调用它。

## Migration guide

## 迁移指南

If you have your own activity holding a
[`FlutterView`][], replace calls to:

如果你有自己的 Activity 持有 [`FlutterView`][`FlutterView`]，
请把对下面方法的调用：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

with calls to:

替换为对下面方法的调用：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

on the [`ActivityControlSurface`][] that you obtained by calling
[`getActivityControlSurface()`][] on the [`FlutterEngine`][].

调用位置是 [`ActivityControlSurface`][`ActivityControlSurface`]，
通过对 [`FlutterEngine`][`FlutterEngine`] 调用
[`getActivityControlSurface()`][`getActivityControlSurface()`] 获得。

Wrap your activity with an `ExclusiveAppComponent<Activity>`
and implement the callback method:

用 `ExclusiveAppComponent<Activity>` 包住你的 Activity，
并实现这个回调方法：

```java
void detachFromFlutterEngine();
```

to handle your activity being replaced by another
activity being attached to the [`FlutterEngine`][].
Generally, you want to perform the same detaching operations
as performed when the activity is being naturally destroyed.

以便在你的 Activity 被另一个挂接到 [`FlutterEngine`][`FlutterEngine`] 的
Activity 替换时进行处理。
通常，你要执行的分离操作
与 Activity 正常销毁时相同。

## Timeline

## 时间线

Landed in version: 1.23.0-7.0.pre<br>
合入版本：1.23.0-7.0.pre<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

Motivating bug: [Issue #66192][]—Non exclusive
UI components attached to the FlutterEngine causes
event crosstalk

起因 bug：[Issue #66192][Issue #66192]——非独占的
UI 组件挂接到 FlutterEngine 会导致事件串扰。


[`ActivityAware`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityAware.html
[`ActivityControlSurface`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityControlSurface.html
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[`FlutterEngine`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
[`FlutterView`]: {{site.api}}/javadoc/io/flutter/view/FlutterView.html
[`getActivityControlSurface()`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html#getActivityControlSurface--
[Issue #66192]: {{site.repo.flutter}}/issues/66192.
[Issue #21272]: {{site.repo.engine}}/pull/21272
