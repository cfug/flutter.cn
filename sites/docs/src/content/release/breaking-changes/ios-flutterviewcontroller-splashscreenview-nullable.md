---
# title: iOS FlutterViewController splashScreenView made nullable
title: iOS FlutterViewController 的 splashScreenView 改为可空
# description: >
#   FlutterViewController splashScreenView changed from nonnull to nullable.
description: FlutterViewController 的 splashScreenView 从 nonnull 改为 nullable。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `FlutterViewController` property `splashScreenView` has
been changed from `nonnull` to `nullable`.

`FlutterViewController` 的 `splashScreenView` 属性已从 `nonnull` 改为 `nullable`。

Old declaration of `splashScreenView`:

`splashScreenView` 的旧声明：

```objc
@property(strong, nonatomic) UIView* splashScreenView;
```

New declaration of `splashScreenView`:

`splashScreenView` 的新声明：

```objc
@property(strong, nonatomic, nullable) UIView* splashScreenView;
```

## Context

## 上下文

Prior to this change, on iOS the `splashScreenView` property returned `nil`
when no splash screen view was set, and
setting the property to `nil` removed the splash screen view.
However, the `splashScreenView` API was incorrectly marked `nonnull`.
This property is most often used when transitioning to
Flutter views in iOS add-to-app scenarios.

在这次改动之前，iOS 上的 `splashScreenView` 属性在未设置启动屏视图时返回 `nil`，
把它设为 `nil` 则会移除启动屏视图。
但是，`splashScreenView` API 被错误地标记成了 `nonnull`。
这个属性最常用于 iOS 嵌入场景中切换到 Flutter 视图的时候。

## Description of change

## 变更说明

While it was possible in Objective-C to work around the
incorrect `nonnull` annotation by setting `splashScreenView` to
a `nil` `UIView`, in Swift this caused a compilation error:

在 Objective-C 中，可以把 `splashScreenView` 设为一个值为 `nil` 的 `UIView`，
从而绕过错误的 `nonnull` 标注。
但在 Swift 中，这会导致编译错误：

```plaintext
error build: Value of optional type 'UIView?' must be unwrapped to a value of type 'UIView'
```

[PR #34743][] updates the property attribute to `nullable`.
It can return `nil` and can be set to `nil` to
remove the view in both Objective-C and Swift.

[PR #34743][] 把该属性的特性更新为 `nullable`。
在 Objective-C 和 Swift 中，它都可以返回 `nil`，
也可以被设为 `nil` 来移除视图。

## Migration guide

## 迁移指南

If `splashScreenView` is stored in a `UIView` variable in Swift,
update to an optional type `UIView?`.

如果在 Swift 中把 `splashScreenView` 存在 `UIView` 变量里，
请改为可选类型 `UIView?`。

Code before migration:

迁移之前的代码：

```swift
  var splashScreenView = UIView()
  var flutterEngine = FlutterEngine(name: "my flutter engine")
  let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
  splashScreenView = flutterViewController.splashScreenView // compilation error: Value of optional type 'UIView?' must be unwrapped to a value of type 'UIView'
```

Code after migration:

迁移之后的代码：

```swift
  var splashScreenView : UIView? = UIView()
  var flutterEngine = FlutterEngine(name: "my flutter engine")
  let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
  let splashScreenView = flutterViewController.splashScreenView // compiles successfully
  if let splashScreenView = splashScreenView {
  }
```

## Timeline

## 时间线

In stable release: 3.7

进入稳定版：3.7

## References

## 参考资料

Relevant PR:

相关 PR：

* [Make splashScreenView of FlutterViewController nullable][]

  [将 FlutterViewController 的 splashScreenView 改为可空][Make splashScreenView of FlutterViewController nullable]

[Make splashScreenView of FlutterViewController nullable]: {{site.repo.engine}}/pull/34743
[PR #34743]: {{site.repo.engine}}/pull/34743
