---
# title: Deprecated API removed after v3.13
title: v3.13 之后移除的已弃用 API
# description: >-
#   After reaching end of life, the following deprecated APIs
#   were removed from Flutter.
description: >-
  以下已弃用 API 在到达生命周期终点后，
  已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
3.13 stable release have been removed.

根据 Flutter 的 [弃用政策][Deprecation Policy]，
在 3.13 稳定版之后到达生命周期终点的已弃用 API 已被移除。

All affected APIs have been compiled into this
primary source to aid in migration.
To further aid your migration, check out this
[quick reference sheet][].

所有受影响的 API 都汇总在这份主要资料中，以便迁移。
还可以查阅这份 [快速参考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-13

## Changes

## 变更

This section lists the deprecations by the package and affected class.

本节按 package 和受影响的类列出这些弃用项。

### Chip classes' useDeleteButtonTooltip

### Chip 类的 useDeleteButtonTooltip

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
是否支持 Flutter Fix：是

The `useDeleteButtonTooltip` property of the following classes was deprecated
in v2.10:

以下类的 `useDeleteButtonTooltip` 属性已在 v2.10 中弃用：

* `DeletableChipAttributes`
* `Chip`
* `RawChip`
* `InputChip`

`deleteButtonTooltipMessage` replaces `useDeleteButtonTooltip`. This change simplified the
API, as providing an empty String to `deleteButtonTooltipMessage` achieves the
same result as setting the original property `useDeleteButtonTooltip` to false.
When `deleteButtonTooltipMessage` is unset, the
`MaterialLocalizations.deleteButtonTooltip` is used by default.

`deleteButtonTooltipMessage` 取代了 `useDeleteButtonTooltip`。
这次改动简化了 API：向 `deleteButtonTooltipMessage` 提供空字符串，
与把原属性 `useDeleteButtonTooltip` 设为 false 效果相同。
未设置 `deleteButtonTooltipMessage` 时，
默认使用 `MaterialLocalizations.deleteButtonTooltip`。

The [Deprecate `useDeleteButtonTooltip` for Chips][] design document
covers this update to chips and tooltips in greater depth.
To learn more, check out the [chips and tooltips migration guide][].

[弃用 Chip 的
`useDeleteButtonTooltip`][Deprecate `useDeleteButtonTooltip` for Chips]
设计文档更深入地介绍了这次对 chip 和 tooltip 的更新。
更多内容请查阅 [Chip 与 tooltip 迁移指南][chips and tooltips migration guide]。

[Deprecate `useDeleteButtonTooltip` for Chips]: https://docs.google.com/document/d/1wc9ot7T2E7hJubYxEWMX230a79wYSiFey4BHxnEzHtw/edit?usp=sharing&resourcekey=0-Bo7KPqEtkWgZcSuRCqwQ5w
[chips and tooltips migration guide]: /release/breaking-changes/chip-usedeletebuttontooltip-migration

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
Chip(useDeleteButtonTooltip: false);
InputChip(useDeleteButtonTooltip: true);
RawChip rawChip = RawChip();
rawChip.useDeleteButtonTooltip;
```

Code after migration:

迁移之后的代码：

```dart
Chip(deleteButtonTooltipMessage: '');
InputChip();
RawChip rawChip = RawChip();
rawChip.deleteButtonTooltipMessage;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`DeletableChipAttributes`][]
* [`Chip`][]
* [`RawChip`][]
* [`InputChip`][]
* [`MaterialLocalizations.deleteButtonTooltip`][]

Relevant PRs:

相关 PR：

* Deprecated in [#96174][]

  弃用于 [#96174][]

* Removed in [#134486][]

  移除于 [#134486][]

[`DeletableChipAttributes`]: {{site.api}}/flutter/material/DeletableChipAttributes-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`RawChip`]: {{site.api}}/flutter/material/RawChip-class.html
[`InputChip`]: {{site.api}}/flutter/material/InputChip-class.html
[`MaterialLocalizations.deleteButtonTooltip`]: {{site.api}}/flutter/material/MaterialLocalizations/deleteButtonTooltip.html

[#96174]: {{site.repo.flutter}}/pull/96174
[#134486]: {{site.repo.flutter}}/pull/134486

---

### MaterialButtonWithIconMixin

### MaterialButtonWithIconMixin 类

Package: flutter
Supported by Flutter Fix: no

Package：flutter
是否支持 Flutter Fix：否

The `MaterialButtonWithIconMixin` property was deprecated in v2.11.

`MaterialButtonWithIconMixin` 已在 v2.11 中弃用。

With the introduction of new button classes `TextButton`, `OutlinedButton` and `ElevatedButton`,
this mixin is no longer used.
An earlier release removed old button classes that used this mixin.
As a result, this mixin no longer affects any classes that might mix it in.

随着新按钮类 `TextButton`、`OutlinedButton` 和 `ElevatedButton` 的引入，
这个 mixin 不再被使用。
更早的版本已经移除了使用该 mixin 的旧按钮类。
因此，这个 mixin 不再影响任何混入它的类。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
class MyButtonClass extends StatelessWidget with MaterialButtonWithIconMixin {
  // ...
}
```

Code after migration:

迁移之后的代码：

```dart
class MyButtonClass extends StatelessWidget {
  // ...
}
```

**References**

**参考资料**

Relevant PRs:

相关 PR：

* Deprecated in [#99088][]

  弃用于 [#99088][]

* Removed in [#133173][]

  移除于 [#133173][]

[#99088]: {{site.repo.flutter}}/pull/99088
[#133173]: {{site.repo.flutter}}/pull/133173

---

### PlatformsViewsService.synchronizeToNativeViewHierarchy

### PlatformsViewsService.synchronizeToNativeViewHierarchy 方法

Package: flutter
Supported by Flutter Fix: no

Package：flutter
是否支持 Flutter Fix：否

The static method `synchronizeToNativeViewHierarchy` of `PlatformsViewsService`
was deprecated in v2.11.

`PlatformsViewsService` 的静态方法
`synchronizeToNativeViewHierarchy` 已在 v2.11 中弃用。

During the deprecation period, the method was a no-op function as it was no
longer required to call for performance improvements.
References to the method should be removed and won't impact the application.

在弃用期间，这个方法是空操作，
因为已经不再需要调用它来提升性能。
应移除对这个方法的引用，移除后不会影响应用。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
await PlatformsViewsService.synchronizeToNativeViewHierarchy(false);
````

Code after migration:

迁移之后的代码：

```dart
```

**References**

**参考资料**

API documentation:

API 文档：

* [`PlatformViewsService`][]

Relevant PRs:

相关 PR：

* Deprecated in [#100990][]

  弃用于 [#100990][]

* Removed in [#133175][]

  移除于 [#133175][]

[`PlatformViewsService`]: {{site.api}}/flutter/services/PlatformViewsService-class.html

[#100990]: {{site.repo.flutter}}/pull/100990
[#133175]: {{site.repo.flutter}}/pull/133175

---

### TextSelectionOverlay.fadeDuration

### TextSelectionOverlay.fadeDuration 属性

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
是否支持 Flutter Fix：是

The static `fadeDuration` property of `TextSelectionOverlay` was deprecated
in v2.12.

`TextSelectionOverlay` 的静态属性 `fadeDuration`
已在 v2.12 中弃用。

The `SelectionOverlay.fadeDuration` property replaces `TextSelectionOverlay.fadeDuration`.
With the `TextSelectionOverlay` refactor,
`SelectionOverlay` was added as a more generic widget without
the specific dependency on `RenderEditable`.

`SelectionOverlay.fadeDuration` 属性取代了
`TextSelectionOverlay.fadeDuration`。
在重构 `TextSelectionOverlay` 时，
新增了更通用的 `SelectionOverlay` widget，
它不再特别依赖 `RenderEditable`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
TextSelectionOverlay.fadeDuration;
```

Code after migration:

迁移之后的代码：

```dart
SelectionOverlay.fadeDuration;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`TextSelectionOverlay`][]
* [`SelectionOverlay`][]

Relevant PRs:

相关 PR：

* Deprecated in [#100381][]

  弃用于 [#100381][]

* Removed in [#134485][]

  移除于 [#134485][]

[`TextSelectionOverlay`]: {{site.api}}/flutter/widgets/TextSelectionOverlay-class.html
[`SelectionOverlay`]: {{site.api}}/flutter/widgets/SelectionOverlay-class.html

[#100381]: {{site.repo.flutter}}/pull/100381
[#134485]: {{site.repo.flutter}}/pull/134485

---

### androidOverscrollIndicator

### androidOverscrollIndicator 属性

Package: flutter
Supported by Flutter Fix: no

Package：flutter
是否支持 Flutter Fix：否

The `androidOverscrollIndicator` property of the following classes was
deprecated in v2.13:

以下类的 `androidOverscrollIndicator` 属性已在 v2.13 中弃用：

* `ScrollBehavior`
* `MaterialScrollBehavior`
* `ThemeData`

This flag was introduced to allow users to configure scrolling widgets to use
the `GlowingOverscrollIndicator` or the `StretchingOvercrollIndicator`.
It was deprecated in favor of the `ThemeData.useMaterial3` flag
as the framework introduced more support for Material 3-styled widgets.

引入这个标志是为了让用户把滚动 widget 配置为使用
`GlowingOverscrollIndicator` 或 `StretchingOvercrollIndicator`。
随着框架对 Material 3 风格 widget 的支持增加，
它被弃用，改为使用 `ThemeData.useMaterial3` 标志。

Since `ThemeData.useMaterial3` is `true` by default,
the `StretchingOverscrollIndicator` is applied by default.
Setting this value to `false` will apply a `GlowingOverscrollIndicator` instead.

由于 `ThemeData.useMaterial3` 默认为 `true`，
默认会应用 `StretchingOverscrollIndicator`。
把该值设为 `false` 则会改用 `GlowingOverscrollIndicator`。

Alternatively, the `buildOverscrollIndicator` method of `ScrollBehavior` or
`MaterialScrollBehavior` can be overridden to further alter the appearance of
overscroll indicators.

也可以覆盖 `ScrollBehavior` 或 `MaterialScrollBehavior` 的
`buildOverscrollIndicator` 方法，进一步改变过度滚动指示器的外观。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
MaterialApp(
  scrollBehavior: MaterialScrollBehavior(
    androidOverscrollIndicator: AndroidOverscrollIndicator.glow,
  ),
  //...
);

MaterialApp(
  scrollBehavior: ScrollBehavior(
    androidOverscrollIndicator: AndroidOverscrollIndicator.glow,
  ),
  //...
);

MaterialApp(
  theme: Theme.light().copyWith(
    androidOverscrollIndicator: AndroidOverscrollIndicator.glow,
  ),
  //...
);
```

Code after migration:

迁移之后的代码：

```dart
MaterialApp(
  theme: Theme.light().copyWith(
    // defaults to true and stretching indicator,
    // false results in glowing indicator
    useMaterial3: false,
  ),
  //...
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`ScrollBehavior`][]
* [`MaterialScrollBehavior`][]
* [`ThemeData`][]
* [`GlowingOverscrollIndicator`][]
* [`StretchingOverscrollIndicator`][]

Relevant PRs:

相关 PR：

* Deprecated in [#100234][]

  弃用于 [#100234][]

* Removed in [#133181][]

  移除于 [#133181][]

[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: {{site.api}}/flutter/material/MaterialScrollBehavior-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`GlowingOverscrollIndicator`]: {{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html
[`StretchingOverscrollIndicator`]: {{site.api}}/flutter/widgets/StretchingOverscrollIndicator-class.html

[#100234]: {{site.repo.flutter}}/pull/100234
[#133181]: {{site.repo.flutter}}/pull/133181

---

### Updates to ImageProvider and PaintingBinding

### ImageProvider 与 PaintingBinding 的更新

Package: flutter
Supported by Flutter Fix: no

Package：flutter
是否支持 Flutter Fix：否

The `instantiateImageCodec` method of `PaintingBinding`, as well as the `load`
method of `ImageProvider` and the associated `DecoderCallback` were all
deprecated in v2.13.

`PaintingBinding` 的 `instantiateImageCodec` 方法、`ImageProvider`
的 `load` 方法以及相关的 `DecoderCallback`
都已在 v2.13 中弃用。

The respective replacements are:

对应的替代项如下：

| <t>Deprecated Method</t><t>已弃用方法</t> | <t>Current Method</t><t>当前方法</t> |
|-----------------------------------------|---------------------------------------------------|
| `PaintingBinding.instantiateImageCodec` | `PaintingBinding.instantiateImageCodecFromBuffer` |
| `PaintingBinding.instantiateImageCodec` | `PaintingBinding.instantiateImageCodecFromBuffer` |
| `ImageProvider.load`                    | `ImageProvider.loadBuffer`                        |
| `ImageProvider.load`                    | `ImageProvider.loadBuffer`                        |
| `DecoderCallback`                       | `DecoderBufferCallback`                           |
| `DecoderCallback`                       | `DecoderBufferCallback`                           |

This change enabled faster performance in image loading by using a buffer.

这次改动通过使用缓冲区，加快了图片加载。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
PaintingBinding.instance.instantiateImageCodec
```

Code after migration:

迁移之后的代码：

```dart
PaintingBinding.instance.instantiateImageCodecFromBuffer
```

**References**

**参考资料**

API documentation:

API 文档：

* [`PaintingBinding`][]
* [`ImageProvider`][]
* [`DecoderBufferCallback`][]

Relevant PRs:

相关 PR：

* Deprecated in [#103496][]

  弃用于 [#103496][]

* Removed in [#132679][]

  移除于 [#132679][]

[`PaintingBinding`]: {{site.api}}/flutter/painting/PaintingBinding-mixin.html
[`ImageProvider`]: {{site.api}}/flutter/painting/ImageProvider-class.html
[`DecoderBufferCallback`]: {{site.api}}/flutter/painting/DecoderBufferCallback.html

[#103496]: {{site.repo.flutter}}/pull/103496
[#132679]: {{site.repo.flutter}}/pull/132679

---

### TestWindow properties

### TestWindow 属性

Package: flutter_test
Supported by Flutter Fix: no

Package：flutter_test
是否支持 Flutter Fix：否

To prepare for multi-window support,
many deprecated properties of `TestWindow` have been removed.
While `TestWindow` has been deprecated, it does not qualify
for removal at this time.
Migrating the expired properties now will help in migrating from `TestWindow`.

为了准备多窗口支持，`TestWindow`
的许多已弃用属性已被移除。
虽然 `TestWindow` 已经弃用，但目前还不到移除它的时候。
现在迁移这些过期属性，有助于日后从 `TestWindow` 迁出。

The following properties were removed:

以下属性已被移除：

* `localeTestValue`
* `clearLocaleTestValue`
* `localesTestValue`
* `clearLocalesTestValue`
* `initialLifecycleStateTestValue`
* `textScaleFactorTestValue`
* `clearTextScaleFactorTestValue`
* `platformBrightnessTestValue`
* `clearPlatformBrightnessTestValue`
* `alwaysUse24HourFormatTestValue`
* `clearAlwaysUse24HourTestValue`
* `brieflyShowPasswordTestValue`
* `defaultRouteNameTestValue`
* `clearDefaultRouteNameTestValue`
* `semanticsEnabledTestValue`
* `clearSemanticsEnabledTestValue`
* `accessibilityFeaturesTestValue`
* `clearAccessibilityFeaturesTestValue`

To learn more about this `TestWindow` update, check out
[`TestWindow` migration guide][].

要进一步了解这次 `TestWindow` 更新，
请查阅 [`TestWindow` 迁移指南][`TestWindow` migration guide]。

[`TestWindow` migration guide]: /release/breaking-changes/window-singleton

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
testWidgets('My test', (WidgetTester tester) async {
  // For all instances, replace window with platformDispatcher
  tester.binding.window.textScaleFactorTestValue = 42;
  addTearDown(tester.binding.window.clearTextScaleFactorTestValue);
  // ...
});
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('My test', (WidgetTester tester) async {
  // For all instances, replace window with platformDispatcher
  tester.binding.platformDispatcher.textScaleFactorTestValue = 42;
  addTearDown(tester.binding.platformDispatcher.clearTextScaleFactorTestValue);
  // ...
});
```

**References**

**参考资料**

API documentation:

API 文档：

* [`WidgetTester`][]
* [`TestWidgetsFlutterBinding`][]
* [`TestPlatformDispatcher`][]

Relevant PRs:

相关 PR：

* Deprecated in [#99443][]

  弃用于 [#99443][]

* Removed in [#131098][]

  移除于 [#131098][]

[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
[`TestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding-class.html
[`TestPlatformDispatcher`]: {{site.api}}/flutter/flutter_test/TestPlatformDispatcher-class.html

[#99443]: {{site.repo.flutter}}/pull/99443
[#131098]: {{site.repo.flutter}}/pull/131098

---

## Timeline

## 时间线

In stable release: 3.16

进入稳定版：3.16
