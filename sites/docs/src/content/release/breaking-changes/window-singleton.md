---
# title: The window singleton is deprecated
title: window 单例已废弃
# description: >
#   In preparation for supporting multiple views and
#   multiple windows the window singleton has been deprecated.
description: 为支持多视图和多窗口，window 单例已被废弃。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

In preparation for supporting multiple views and multiple windows, the `window`
singleton has been deprecated. Code previously relying on the `window` singleton
needs to look up the specific view it wants to operate on via the `View.of` API
or interact with the `PlatformDispatcher` directly.

为了支持多视图和多窗口，`window` 单例已被废弃。
原先依赖 `window` 单例的代码，需要通过 `View.of` API
查找要操作的具体视图，或者直接与 `PlatformDispatcher` 交互。

## Context

## 上下文

Originally, Flutter assumed that an application would only consist of a single
view (the `window`) into which content can be drawn. In a multi-view world, this
assumption no longer makes sense and the APIs encoding this assumption have
been deprecated. Instead, applications and libraries that relied on these APIs
must choose a specific view they want to operate on and
migrate to new multi-view compatible APIs as outlined in this migration guide.

Flutter 最初假定应用只包含一个可以绘制内容的视图（即 `window`）。
在多视图的世界里，这个假设不再成立，体现该假设的 API 已被废弃。
依赖这些 API 的应用和库必须选定要操作的具体视图，
并按本迁移指南改用兼容多视图的新 API。

## Description of change

## 变更说明

The APIs that have been deprecated as part of this change are:

作为这次改动的一部分，下列 API 已被废弃：

* The global `window` property exposed by `dart:ui`.

  `dart:ui` 暴露的全局 `window` 属性。

* The `window` property on the `BaseBinding` class,
  which is usually accessed via

  `BaseBinding` 类上的 `window` 属性，通常通过以下方式访问：

  * `GestureBinding.instance.window`,

    `GestureBinding.instance.window`。

  * `SchedulerBinding.instance.window`,

    `SchedulerBinding.instance.window`。

  * `ServicesBinding.instance.window`,

    `ServicesBinding.instance.window`。

  * `PaintingBinding.instance.window`,

    `PaintingBinding.instance.window`。

  * `SemanticsBinding.instance.window`,

    `SemanticsBinding.instance.window`。

  * `RendererBinding.instance.window`,

    `RendererBinding.instance.window`。

  * `WidgetsBinding.instance.window`, or

    `WidgetsBinding.instance.window`，或

  * `WidgetTester.binding.window`.

    `WidgetTester.binding.window`。

* The `SingletonFlutterView` class from `dart:ui`.

  `dart:ui` 中的 `SingletonFlutterView` 类。

* `TestWindow` from `flutter_test`, its constructors,
  and all of its properties and methods.

  `flutter_test` 中的 `TestWindow`、它的构造函数，
  以及它的全部属性和方法。

The following options exist to migrate application and library code that relies
on these deprecated APIs:

依赖这些已废弃 API 的应用和库代码，可以按下面的方式迁移：

If a `BuildContext` is available, consider looking up the current `FlutterView`
via `View.of`. This returns the `FlutterView` into
which the widgets built by the `build` method associated with the given context
will be drawn. The `FlutterView` provides access to the same functionality
that was previously available on the deprecated `SingletonFlutterView` class
returned by the deprecated `window` properties mentioned above. However, some
of the platform-specific functionality has moved to the `PlatformDispatcher`,
which can be accessed from the `FlutterView` returned by `View.of` via
`FlutterView.platformDispatcher`. Using `View.of` is the preferred way of
migrating away from the deprecated properties mentioned above.

如果有 `BuildContext`，可以考虑用 `View.of` 查找当前的 `FlutterView`。
它返回的 `FlutterView` 就是与给定 context 关联的 `build` 方法
所构建的 widget 将被绘制到的视图。
`FlutterView` 提供的功能，与上面那些已废弃的 `window` 属性所返回的、
已废弃的 `SingletonFlutterView` 类原先提供的功能相同。
不过，一部分平台专属功能已经移到 `PlatformDispatcher`。
可以从 `View.of` 返回的 `FlutterView` 通过
`FlutterView.platformDispatcher` 访问它。
迁离上面提到的已废弃属性时，优先使用 `View.of`。

If no `BuildContext` is available to look up a `FlutterView`, the
`PlatformDispatcher` can be consulted directly to access platform-specific
functionality. It also maintains a list of all available `FlutterView`s in
`PlatformDispatcher.views` to access view-specific functionality. If possible,
the `PlatformDispatcher` should be accessed via a binding (for example
`WidgetsBinding.instance.platformDispatcher`) instead of using the static
`PlatformDispatcher.instance` property. This ensures that the functionality
of the `PlatformDispatcher` can be properly mocked out in tests.

如果没有 `BuildContext` 来查找 `FlutterView`，
可以直接查阅 `PlatformDispatcher` 以访问平台专属功能。
它还在 `PlatformDispatcher.views` 中维护全部可用 `FlutterView` 的列表，
用来访问视图专属功能。
如果可以，应通过 binding 访问 `PlatformDispatcher`
（例如 `WidgetsBinding.instance.platformDispatcher`），
而不是使用静态属性 `PlatformDispatcher.instance`。
这样测试中才能正确地模拟 `PlatformDispatcher` 的功能。

### Testing

### 测试

For tests that accessed the `WidgetTester.binding.window` property to change
window properties for testing, the following migrations are available:

对于通过 `WidgetTester.binding.window` 属性修改窗口属性的测试，
可以按下面的方式迁移：

In tests written with `testWidgets`, two new properties have been added that
together replace the functionality of `TestWindow`.

在用 `testWidgets` 编写的测试中，新增了两个属性，
它们合在一起取代了 `TestWindow` 的功能。

* `WidgetTester.view` will provide a `TestFlutterView` that can be modified
  similarly to `WidgetTester.binding.window`, but with only view-specific
  properties such as the size of a view, its display pixel ratio, etc.

  `WidgetTester.view` 会提供一个 `TestFlutterView`。
  修改方式与 `WidgetTester.binding.window` 类似，
  但只包含视图专属属性，例如视图大小、显示像素比等。

  * `WidgetTester.viewOf` is available for certain multi-view use cases, but
      should not be required for any migrations from
      `WidgetTester.binding.window`.

    `WidgetTester.viewOf` 可用于某些多视图场景，
    但从 `WidgetTester.binding.window` 迁移时并不需要它。

* `WidgetTester.platformDispatcher` will provide access to a
  `TestPlatformDispatcher` that can be used to modify platform specific
  properties such as the platform's locale, whether certain system features
  are available, etc.

  `WidgetTester.platformDispatcher` 会提供 `TestPlatformDispatcher`，
  可用于修改平台专属属性，例如平台的区域设置、
  某些系统功能是否可用等。

## Migration guide

## 迁移指南

Instead of accessing the static `window` property, application and library code
that has access to a `BuildContext` should use `View.of` to look up the
`FlutterView` the context is associated with. Some properties have moved to
the `PlatformDispatcher` accessible from the view via the `platformDispatcher`
getter.

有 `BuildContext` 的应用和库代码不应再访问静态 `window` 属性，
而应使用 `View.of` 查找该 context 关联的 `FlutterView`。
有些属性已移到 `PlatformDispatcher`，
可以通过视图的 `platformDispatcher` getter 访问。

Code before migration:

迁移之前的代码：

```dart
Widget build(BuildContext context) {
  final double dpr = WidgetsBinding.instance.window.devicePixelRatio;
  final Locale locale = WidgetsBinding.instance.window.locale;
  return Text('The device pixel ratio is $dpr and the locale is $locale.');
}
```

Code after migration:

迁移之后的代码：

```dart
Widget build(BuildContext context) {
  final double dpr = View.of(context).devicePixelRatio;
  final Locale locale = View.of(context).platformDispatcher.locale;
  return Text('The device pixel ratio is $dpr and the locale is $locale.');
}
```

If no `BuildContext` is available, the `PlatformDispatcher` exposed by the
bindings can be consulted directly.

如果没有 `BuildContext`，可以直接查阅 binding 暴露的 `PlatformDispatcher`。

Code before migration:

迁移之前的代码：

```dart
double getTextScaleFactor() {
  return WidgetsBinding.instance.window.textScaleFactor;
}
```

Code after migration:

迁移之后的代码：

```dart
double getTextScaleFactor() {
  // View.of(context).platformDispatcher.textScaleFactor if a BuildContext is available, otherwise:
  return WidgetsBinding.instance.platformDispatcher.textScaleFactor;
}
```

### Testing

### 测试

In tests written with `testWidget`, the new `view` and `platformDispatcher`
accessors should be used instead.

在用 `testWidget` 编写的测试中，应改用新的 `view` 和 `platformDispatcher` 访问器。

#### Setting view-specific properties

#### 设置视图专属属性

`TestFlutterView` has also made an effort to make the test API clearer and more
concise by using setters with the same name as their related getter instead of
setters with the `TestValue` suffix.

`TestFlutterView` 还让测试 API 更清晰、更简洁：
setter 与对应的 getter 同名，不再使用带 `TestValue` 后缀的 setter。

Code before migration:

迁移之前的代码：

```dart
testWidget('test name', (WidgetTester tester) async {
  tester.binding.window.devicePixelRatioTestValue = 2.0;
  tester.binding.window.displayFeaturesTestValue = <DisplayFeatures>[];
  tester.binding.window.gestureSettingsTestValue = const GestureSettings(physicalTouchSlop: 100);
  tester.binding.window.paddingTestValue = FakeViewPadding.zero;
  tester.binding.window.physicalGeometryTestValue = const Rect.fromLTRB(0,0, 500, 800);
  tester.binding.window.physicalSizeTestValue = const Size(300, 400);
  tester.binding.window.systemGestureInsetsTestValue = FakeViewPadding.zero;
  tester.binding.window.viewInsetsTestValue = FakeViewPadding.zero;
  tester.binding.window.viewPaddingTestValue = FakeViewPadding.zero;
});
```

Code after migration

迁移之后的代码

```dart
testWidget('test name', (WidgetTester tester) async {
  tester.view.devicePixelRatio = 2.0;
  tester.view.displayFeatures = <DisplayFeatures>[];
  tester.view.gestureSettings = const GestureSettings(physicalTouchSlop: 100);
  tester.view.padding = FakeViewPadding.zero;
  tester.view.physicalGeometry = const Rect.fromLTRB(0,0, 500, 800);
  tester.view.physicalSize = const Size(300, 400);
  tester.view.systemGestureInsets = FakeViewPadding.zero;
  tester.view.viewInsets = FakeViewPadding.zero;
  tester.view.viewPadding = FakeViewPadding.zero;
});
```

#### Resetting view-specific properties

#### 重置视图专属属性

`TestFlutterView` retains the capability to reset individual properties or the
entire view but, in order to be more clear and consist, the naming of these
methods has changed from `clear<property>TestValue` and `clearAllTestValues` to
`reset<property>` and `reset` respectively.

`TestFlutterView` 仍然可以重置单个属性或整个视图。
为了更清晰、更一致，这些方法的命名已从 `clear<property>TestValue` 和
`clearAllTestValues` 分别改为 `reset<property>` 和 `reset`。

##### Resetting individual properties

##### 重置单个属性

Code before migration:

迁移之前的代码：

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.binding.window.clearDevicePixelRatioTestValue);
  addTearDown(tester.binding.window.clearDisplayFeaturesTestValue);
  addTearDown(tester.binding.window.clearGestureSettingsTestValue);
  addTearDown(tester.binding.window.clearPaddingTestValue);
  addTearDown(tester.binding.window.clearPhysicalGeometryTestValue);
  addTearDown(tester.binding.window.clearPhysicalSizeTestValue);
  addTearDown(tester.binding.window.clearSystemGestureInsetsTestValue);
  addTearDown(tester.binding.window.clearViewInsetsTestValue);
  addTearDown(tester.binding.window.clearViewPaddingTestValue);
});
```

Code after migration

迁移之后的代码

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.view.resetDevicePixelRatio);
  addTearDown(tester.view.resetDisplayFeatures);
  addTearDown(tester.view.resetGestureSettings);
  addTearDown(tester.view.resetPadding);
  addTearDown(tester.view.resetPhysicalGeometry);
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetSystemGestureInsets);
  addTearDown(tester.view.resetViewInsets);
  addTearDown(tester.view.resetViewPadding);
});
```

##### Resetting all properties at once

##### 一次重置全部属性

Code before migration:

迁移之前的代码：

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.binding.window.clearAllTestValues);
});
```

Code after migration

迁移之后的代码

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.view.reset);
});
```

#### Setting platform-specific properties

#### 设置平台专属属性

`TestPlatformDispatcher` retains the same functionality and naming scheme for
test setters as did `TestWindow`, so migration of platform-specific properties
mainly consists of calling the same setters on the new
`WidgetTester.platformDispatcher` accessor.

`TestPlatformDispatcher` 的测试 setter 保留了与 `TestWindow` 相同的功能和命名。
因此，迁移平台专属属性主要就是在新的 `WidgetTester.platformDispatcher` 访问器上
调用同样的 setter。

Code before migration:

迁移之前的代码：

```dart
testWidgets('test name', (WidgetTester tester) async {
  tester.binding.window.accessibilityFeaturesTestValue = FakeAccessibilityFeatures.allOn;
  tester.binding.window.alwaysUse24HourFormatTestValue = false;
  tester.binding.window.brieflyShowPasswordTestValue = true;
  tester.binding.window.defaultRouteNameTestValue = '/test';
  tester.binding.window.initialLifecycleStateTestValue = 'painting';
  tester.binding.window.localesTestValue = <Locale>[const Locale('en-us'), const Locale('ar-jo')];
  tester.binding.window.localeTestValue = const Locale('ar-jo');
  tester.binding.window.nativeSpellCheckServiceDefinedTestValue = false;
  tester.binding.window.platformBrightnessTestValue = Brightness.dark;
  tester.binding.window.semanticsEnabledTestValue = true;
  tester.binding.window.textScaleFactorTestValue = 2.0;
});
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('test name', (WidgetTester tester) async {
  tester.platformDispatcher.accessibilityFeaturesTestValue = FakeAccessibilityFeatures.allOn;
  tester.platformDispatcher.alwaysUse24HourFormatTestValue = false;
  tester.platformDispatcher.brieflyShowPasswordTestValue = true;
  tester.platformDispatcher.defaultRouteNameTestValue = '/test';
  tester.platformDispatcher.initialLifecycleStateTestValue = 'painting';
  tester.platformDispatcher.localesTestValue = <Locale>[const Locale('en-us'), const Locale('ar-jo')];
  tester.platformDispatcher.localeTestValue = const Locale('ar-jo');
  tester.platformDispatcher.nativeSpellCheckServiceDefinedTestValue = false;
  tester.platformDispatcher.platformBrightnessTestValue = Brightness.dark;
  tester.platformDispatcher.semanticsEnabledTestValue = true;
  tester.platformDispatcher.textScaleFactorTestValue = 2.0;
});
```

#### Resetting platform-specific properties

#### 重置平台专属属性

Similarly to setting properties, resetting platform-specific properties consists
mainly of changing from the `binding.window` accessor to the
`platformDispatcher` accessor.

与设置属性类似，重置平台专属属性主要就是把访问器从 `binding.window`
改成 `platformDispatcher`。

##### Resetting individual properties

##### 重置单个属性

Code before migration:

迁移之前的代码：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.binding.window.clearAccessibilityFeaturesTestValue);
  addTeardown(tester.binding.window.clearAlwaysUse24HourFormatTestValue);
  addTeardown(tester.binding.window.clearBrieflyShowPasswordTestValue);
  addTeardown(tester.binding.window.clearDefaultRouteNameTestValue);
  addTeardown(tester.binding.window.clearInitialLifecycleStateTestValue);
  addTeardown(tester.binding.window.clearLocalesTestValue);
  addTeardown(tester.binding.window.clearLocaleTestValue);
  addTeardown(tester.binding.window.clearNativeSpellCheckServiceDefinedTestValue);
  addTeardown(tester.binding.window.clearPlatformBrightnessTestValue);
  addTeardown(tester.binding.window.clearSemanticsEnabledTestValue);
  addTeardown(tester.binding.window.clearTextScaleFactorTestValue);
});
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
  addTeardown(tester.platformDispatcher.clearAlwaysUse24HourFormatTestValue);
  addTeardown(tester.platformDispatcher.clearBrieflyShowPasswordTestValue);
  addTeardown(tester.platformDispatcher.clearDefaultRouteNameTestValue);
  addTeardown(tester.platformDispatcher.clearInitialLifecycleStateTestValue);
  addTeardown(tester.platformDispatcher.clearLocalesTestValue);
  addTeardown(tester.platformDispatcher.clearLocaleTestValue);
  addTeardown(tester.platformDispatcher.clearNativeSpellCheckServiceDefinedTestValue);
  addTeardown(tester.platformDispatcher.clearPlatformBrightnessTestValue);
  addTeardown(tester.platformDispatcher.clearSemanticsEnabledTestValue);
  addTeardown(tester.platformDispatcher.clearTextScaleFactorTestValue);
});
```

##### Resetting all properties at once

##### 一次重置全部属性

Code before migration:

迁移之前的代码：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.binding.window.clearAllTestValues);
});
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.platformDispatcher.clearAllTestValues);
});
```

## Timeline

## 时间线

Landed in version: 3.9.0-13.0.pre.20<br>
合入版本：3.9.0-13.0.pre.20<br>
In stable release: 3.10.0

进入稳定版：3.10.0

## References

## 参考资料

API documentation:

API 文档：

* [`View.of`][]
* [`FlutterView`][]
* [`PlatformDispatcher`][]
* [`TestPlatformDispatcher`][]
* [`TestFlutterView`][]
* [`TestWidgetsFlutterBinding.window`][]

Relevant issues:

相关 issue：

* [Issue 116929][]

  [问题 116929][Issue 116929]

* [Issue 117481][]

  [问题 117481][Issue 117481]

* [Issue 121915][]

  [问题 121915][Issue 121915]

Relevant PRs:

相关 PR：

* [Deprecate SingletonFlutterWindow and global window singleton][]

  [废弃 SingletonFlutterWindow 与全局 window 单例][Deprecate SingletonFlutterWindow and global window singleton]

* [Deprecate BindingBase.window][]

  [废弃 BindingBase.window][Deprecate BindingBase.window]

* [Deprecates `TestWindow`][]

  [废弃 `TestWindow`][Deprecates `TestWindow`]


[`View.of`]: {{site.api}}/flutter/widgets/View/of.html
[`FlutterView`]: {{site.api}}/flutter/dart-ui/FlutterView-class.html
[`PlatformDispatcher`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher-class.html
[`TestPlatformDispatcher`]: {{site.api}}/flutter/flutter_test/TestPlatformDispatcher-class.html
[`TestFlutterView`]: {{site.api}}/flutter/flutter_test/TestFlutterView-class.html
[`TestWidgetsFlutterBinding.window`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding/window.html
[Issue 116929]: {{site.repo.flutter}}/issues/116929
[Issue 117481]: {{site.repo.flutter}}/issues/117481
[Issue 121915]: {{site.repo.flutter}}/issues/121915
[Deprecate SingletonFlutterWindow and global window singleton]: {{site.repo.engine}}/pull/39302
[Deprecate BindingBase.window]: {{site.repo.flutter}}/pull/120998
[Deprecates `TestWindow`]: {{site.repo.flutter}}/pull/122824
