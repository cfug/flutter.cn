---
# title: Deprecate textScaleFactor in favor of TextScaler
title: 弃用 textScaleFactor，改用 TextScaler
# description: >-
#   The new class, TextScaler, replaces the textScaleFactor scalar in
#   preparation for Android 14 nonlinear text scaling support.
description: >-
  新的 TextScaler 类取代了 textScaleFactor 标量，
  为支持 Android 14 的非线性文本缩放做准备。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

In preparation for adopting the [Android 14 nonlinear font scaling][] feature,
all occurrences of `textScaleFactor` in the Flutter framework have been
deprecated and replaced by `TextScaler`.

为采用 [Android 14 非线性字体缩放][Android 14 nonlinear font scaling] 功能做准备，
Flutter 框架中所有 `textScaleFactor` 都已弃用，并由 `TextScaler` 取代。

## Context

## 背景

Many platforms allow users to scale textual contents up or down globally in
system preferences. In the past, the scaling strategy was captured as a single
`double` value named `textScaleFactor`, as text scaling was proportional:
`scaledFontSize = textScaleFactor x unScaledFontSize`. For example, when
`textScaleFactor` is 2.0 and the developer-specified font size is 14.0, the
actual font size is 2.0 x 14.0 = 28.0.

许多平台允许用户在系统偏好设置中全局放大或缩小文本。
过去，缩放策略用一个名为 `textScaleFactor` 的 `double` 值表示，
因为文本缩放是等比的：
`scaledFontSize = textScaleFactor x unScaledFontSize`。
例如，当 `textScaleFactor` 为 2.0、开发者指定的字号为 14.0 时，
实际字号是 2.0 x 14.0 = 28.0。

With the introduction of [Android 14 nonlinear font scaling][], larger text gets
scaled at a lesser rate as compared to smaller text, to prevent excessive scaling
of text that is already large. The `textScaleFactor` scalar value used by
"proportional" scaling is not enough to represent this new scaling strategy.
The [Replaces `textScaleFactor` with `TextScaler`][] pull request introduced a
new class `TextScaler` to replace `textScaleFactor` in preparation for this new
feature. Nonlinear text scaling is introduced in a different pull request.

引入 [Android 14 非线性字体缩放][Android 14 nonlinear font scaling] 之后，
较大的文本会以比小文本更低的比例缩放，以免已经很大的文本被放得过大。
「等比」缩放所用的 `textScaleFactor` 标量
不足以表示这种新的缩放策略。
[替换为 `TextScaler` 的 PR][Replaces `textScaleFactor` with `TextScaler`]
引入了新类 `TextScaler` 来取代 `textScaleFactor`，
为该功能做准备。
非线性文本缩放在另一个 pull request 中引入。

## Description of change

## 变更说明

Introducing a new interface `TextScaler`, which
represents a text scaling strategy.

引入新的接口 `TextScaler`，用来表示一种文本缩放策略。

```dart
abstract class TextScaler {
  double scale(double fontSize);
  double get textScaleFactor; // Deprecated.
}
```

Use the `scale` method to scale font sizes instead of `textScaleFactor`.
The `textScaleFactor` getter provides an estimated `textScaleFactor` value, it
is for backward compatibility purposes and is already marked as deprecated, and
will be removed in a future version of Flutter.

请用 `scale` 方法缩放字号，而不再使用 `textScaleFactor`。
`textScaleFactor` getter 提供一个估算的 `textScaleFactor` 值，
仅用于向后兼容，并且已经标记为弃用，
将在未来的 Flutter 版本中移除。

The new class has replaced
`double textScaleFactor` (`double textScaleFactor` -> `TextScaler textScaler`),
in the following APIs:

新类已在下列 API 中取代
`double textScaleFactor`（`double textScaleFactor` -> `TextScaler textScaler`）：

### Painting library

### Painting 库

| <t>Affected APIs</t><t>受影响的 API</t> | <t>Error Message</t><t>错误信息</t> |
|-----------------------------------------------------------------------------------|--------------------------------------------------------|
| `InlineSpan.build({ double textScaleFactor = 1.0 })` argument                     | The named parameter 'textScaleFactor' isn't defined.   |
| `InlineSpan.build({ double textScaleFactor = 1.0 })` 参数 | 未定义命名参数 'textScaleFactor'。 |
| `TextStyle.getParagraphStyle({ double TextScaleFactor = 1.0 })` argument          | The named parameter 'textScaleFactor' isn't defined.   |
| `TextStyle.getParagraphStyle({ double TextScaleFactor = 1.0 })` 参数 | 未定义命名参数 'textScaleFactor'。 |
| `TextStyle.getTextStyle({ double TextScaleFactor = 1.0 })`  argument              | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextStyle.getTextStyle({ double TextScaleFactor = 1.0 })` 参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `TextPainter({ double TextScaleFactor = 1.0 })` constructor argument              | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter({ double TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `TextPainter.textScaleFactor` getter and setter                                   | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter.textScaleFactor` getter 与 setter | 'textScaleFactor' 已弃用，不应再使用。 |
| `TextPainter.computeWidth({ double TextScaleFactor = 1.0 })` argument             | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter.computeWidth({ double TextScaleFactor = 1.0 })` 参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `TextPainter.computeMaxIntrinsicWidth({ double TextScaleFactor = 1.0 })` argument | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter.computeMaxIntrinsicWidth({ double TextScaleFactor = 1.0 })` 参数 | 'textScaleFactor' 已弃用，不应再使用。 |

### Rendering library

### Rendering 库

| <t>Affected APIs</t><t>受影响的 API</t> | <t>Error Message</t><t>错误信息</t> |
|--------------------------------------------------------------------------|--------------------------------------------------------|
| `RenderEditable({ double TextScaleFactor = 1.0 })` constructor argument  | 'textScaleFactor' is deprecated and shouldn't be used. |
| `RenderEditable({ double TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `RenderEditable.textScaleFactor` getter and setter                       | 'textScaleFactor' is deprecated and shouldn't be used. |
| `RenderEditable.textScaleFactor` getter 与 setter | 'textScaleFactor' 已弃用，不应再使用。 |
| `RenderParagraph({ double TextScaleFactor = 1.0 })` constructor argument | 'textScaleFactor' is deprecated and shouldn't be used. |
| `RenderParagraph({ double TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `RenderParagraph.textScaleFactor` getter and setter                      | 'textScaleFactor' is deprecated and shouldn't be used. |
| `RenderParagraph.textScaleFactor` getter 与 setter | 'textScaleFactor' 已弃用，不应再使用。 |

### Widgets library

### Widgets 库

| <t>Affected APIs</t><t>受影响的 API</t> | <t>Error Message</t><t>错误信息</t> |
|-------------------------------------------------------------------------|---------------------------------------------------------------|
| `MediaQueryData({ double TextScaleFactor = 1.0 })` constructor argument | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `MediaQueryData({ double TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `MediaQueryData.textScaleFactor` getter                                 | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `MediaQueryData.textScaleFactor` getter | 'textScaleFactor' 已弃用，不应再使用。 |
| `MediaQueryData.copyWith({ double? TextScaleFactor })` argument         | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `MediaQueryData.copyWith({ double? TextScaleFactor })` 参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `MediaQuery.maybeTextScaleFactorOf(BuildContext context)` static method | 'maybeTextScaleFactorOf' is deprecated and shouldn't be used. |
| `MediaQuery.maybeTextScaleFactorOf(BuildContext context)` 静态方法 | 'maybeTextScaleFactorOf' 已弃用，不应再使用。 |
| `MediaQuery.textScaleFactorOf(BuildContext context)` static method      | 'textScaleFactorOf' is deprecated and shouldn't be used.      |
| `MediaQuery.textScaleFactorOf(BuildContext context)` 静态方法 | 'textScaleFactorOf' 已弃用，不应再使用。 |
| `RichText({ double TextScaleFactor = 1.0 })` constructor argument       | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `RichText({ double TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `RichText.textScaleFactor` getter                                       | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `RichText.textScaleFactor` getter | 'textScaleFactor' 已弃用，不应再使用。 |
| `Text({ double? TextScaleFactor = 1.0 })` constructor argument          | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `Text({ double? TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `Text.rich({ double? TextScaleFactor = 1.0 })` constructor argument     | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `Text.rich({ double? TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `Text.textScaleFactor` getter                                           | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `Text.textScaleFactor` getter | 'textScaleFactor' 已弃用，不应再使用。 |
| `EditableText({ double? TextScaleFactor = 1.0 })` constructor argument  | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `EditableText({ double? TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `EditableText.textScaleFactor` getter                                   | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `EditableText.textScaleFactor` getter | 'textScaleFactor' 已弃用，不应再使用。 |

### Material library

### Material 库

| <t>Affected APIs</t><t>受影响的 API</t> | <t>Error Message</t><t>错误信息</t> |
|-------------------------------------------------------------------------------|--------------------------------------------------------|
| `SelectableText({ double? TextScaleFactor = 1.0 })` constructor argument      | 'textScaleFactor' is deprecated and shouldn't be used. |
| `SelectableText({ double? TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `SelectableText.rich({ double? TextScaleFactor = 1.0 })` constructor argument | 'textScaleFactor' is deprecated and shouldn't be used. |
| `SelectableText.rich({ double? TextScaleFactor = 1.0 })` 构造函数参数 | 'textScaleFactor' 已弃用，不应再使用。 |
| `SelectableText.textScaleFactor` getter                                       | 'textScaleFactor' is deprecated and shouldn't be used. |
| `SelectableText.textScaleFactor` getter | 'textScaleFactor' 已弃用，不应再使用。 |

## Migration guide

## 迁移指南

Widgets provided by the Flutter framework are already migrated.
Migration is needed only if you're using any of the
deprecated symbols listed in the previous tables.

Flutter 框架提供的 widget 已经完成迁移。
只有在使用上表列出的已弃用符号时才需要迁移。

### Migrating your APIs that expose `textScaleFactor`

### 迁移暴露 `textScaleFactor` 的 API

Before:

之前：

```dart
abstract class _MyCustomPaintDelegate {
  void paint(PaintingContext context, Offset offset, double textScaleFactor) {
  }
}
```

After:

之后：

```dart
abstract class _MyCustomPaintDelegate {
  void paint(PaintingContext context, Offset offset, TextScaler textScaler) {
  }
}
```

### Migrating code that consumes `textScaleFactor`

### 迁移使用 `textScaleFactor` 的代码

If you're not currently using `textScaleFactor` directly, but rather passing it
to a different API that receives a `textScaleFactor`, and the receiver API has
already been migrated, then it's relatively straightforward:

如果你目前没有直接使用 `textScaleFactor`，
只是把它传给另一个接收 `textScaleFactor` 的 API，
并且接收方 API 已经迁移，那么改动比较直接：

Before:

之前：

```dart
RichText(
  textScaleFactor: MediaQuery.textScaleFactorOf(context),
  ...
)
```

After:

之后：

```dart
RichText(
  textScaler: MediaQuery.textScalerOf(context),
  ...
)
```

If the API that provides `textScaleFactor` hasn't been migrated, consider
waiting for the migrated version.

如果提供 `textScaleFactor` 的 API 尚未迁移，可以考虑等待迁移后的版本。

If you wish to compute the scaled font size yourself, use `TextScaler.scale`
instead of the `*` binary operator:

如果希望自己计算缩放后的字号，请使用 `TextScaler.scale`，
而不再使用 `*` 二元运算符：

Before:

之前：

```dart
final scaledFontSize = textStyle.fontSize * MediaQuery.textScaleFactorOf(context);
```

After:

之后：

```dart
final scaledFontSize = MediaQuery.textScalerOf(context).scale(textStyle.fontSize);
```

If you are using `textScaleFactor` to scale dimensions that are not font sizes,
there are no generic rules for migrating the code to nonlinear scaling, and it
might require the UI to be implemented differently.
Reusing the `MyTooltipBox`example:

如果用 `textScaleFactor` 缩放的不是字号，
就没有把代码迁移到非线性缩放的通用规则，
可能需要换一种方式实现 UI。
沿用 `MyTooltipBox` 示例：

```dart
MyTooltipBox(
  size: chatBoxSize * textScaleFactor,
  child: RichText(..., style: TextStyle(fontSize: 20)),
)
```

You could choose to use the "effective" text scale factor by applying the
`TextScaler` on the font size 20: `chatBoxSize * textScaler.scale(20) / 20`, or
redesign the UI and let the widget assume its own intrinsic size.

可以选用「有效」文本缩放系数：
对字号 20 应用 `TextScaler`，即 `chatBoxSize * textScaler.scale(20) / 20`；
也可以重新设计 UI，让 widget 使用自己的固有尺寸。

### Overriding the text scaling strategy in a widget subtree

### 在 widget 子树中覆盖文本缩放策略

To override the existing `TextScaler` used in a widget subtree, override
the `MediaQuery` like so:

要覆盖 widget 子树中正在使用的 `TextScaler`，可以这样覆盖 `MediaQuery`：

Before:

之前：

```dart
MediaQuery(
  data: MediaQuery.of(context).copyWith(textScaleFactor: 2.0),
  child: child,
)
```

After:

之后：

```dart
MediaQuery(
  data: MediaQuery.of(context).copyWith(textScaler: _myCustomTextScaler),
  child: child,
)
```

However, it's rarely needed to create a custom `TextScaler` subclass.
`MediaQuery.withNoTextScaling` (which creates a widget that disables text scaling
altogether for its child subtree), and `MediaQuery.withClampedTextScaling` (which
creates a widget that restricts the scaled font size to within the range
`[minScaleFactor * fontSize, maxScaleFactor * fontSize]`), are convenience methods
that cover common cases where the text scaling strategy needs to be overridden.

不过，很少需要自行创建 `TextScaler` 子类。
`MediaQuery.withNoTextScaling`（创建一个对其子树完全禁用文本缩放的 widget）
和 `MediaQuery.withClampedTextScaling`（创建一个 widget，
把缩放后的字号限制在
`[minScaleFactor * fontSize, maxScaleFactor * fontSize]` 范围内）
是便捷方法，覆盖了需要覆盖文本缩放策略的常见情况。

#### Examples

#### 示例

**Disabling Text Scaling For Icon Fonts**

**为图标字体禁用文本缩放**

Before:

之前：

```dart
MediaQuery(
  data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0),
  child: IconTheme(
    data: ..,
    child: icon,
  ),
)
```

After:

之后：

```dart
MediaQuery.withNoTextScaling(
  child: IconTheme(
    data: ...
    child: icon,
  ),
)
```

**Preventing Contents From Overscaling**

**防止内容过度缩放**

Before:

之前：

```dart
final mediaQueryData = MediaQuery.of(context);
MediaQuery(
  data: mediaQueryData.copyWith(textScaleFactor: math.min(mediaQueryData.textScaleFactor, _kMaxTitleTextScaleFactor),
  child: child,
)
```

After:

之后：

```dart
MediaQuery.withClampedTextScaling(
  maxScaleFactor: _kMaxTitleTextScaleFactor,
  child: title,
)
```

**Disabling Nonlinear Text Scaling**

**禁用非线性文本缩放**

If you want to temporarily opt-out of nonlinear text scaling on Android 14 until
your app is fully migrated, put a modified `MediaQuery` at the top of your app's
widget tree:

如果希望在应用完成迁移之前，暂时退出 Android 14 的非线性文本缩放，
请在应用 widget 树的顶部放一个修改过的 `MediaQuery`：

```dart
runApp(
  Builder(builder: (context) {
    final mediaQueryData = MediaQuery.of(context);
    final mediaQueryDataWithLinearTextScaling = mediaQueryData
      .copyWith(textScaler: TextScaler.linear(mediaQueryData.textScaler.textScaleFactor));
    return MediaQuery(data: mediaQueryDataWithLinearTextScaling, child: realWidgetTree);
  }),
);
```

This trick uses the deprecated `textScaleFactor` API and will stop working once
it's removed from the Flutter API.

这个办法使用了已弃用的 `textScaleFactor` API，
一旦它从 Flutter API 中移除，就不再有效。

## Timeline

## 时间线

Landed in version: 3.13.0-4.0.pre<br>
In stable release: 3.16

合入版本：3.13.0-4.0.pre<br>
进入稳定版：3.16

## References

## 参考资料

API documentation:

API 文档：

* [`TextScaler`][]
* [`MediaQuery.textScalerOf`][]
* [`MediaQuery.maybeTextScalerOf`][]
* [`MediaQuery.withNoTextScaling`][]
* [`MediaQuery.withClampedTextScaling`][]

Relevant issues:

相关 issue：

* [New font scaling system (Issue 116231)][]

  [新字体缩放系统（Issue 116231）][New font scaling system (Issue 116231)]

Relevant PRs:

相关 PR：

* [Replaces `textScaleFactor` with `TextScaler`][]

  用 `TextScaler` 替换 `textScaleFactor`：
  [该 PR][Replaces `textScaleFactor` with `TextScaler`]


[Android 14 nonlinear font scaling]: {{site.android-dev}}/about/versions/14/features#non-linear-font-scaling
[`TextScaler`]: {{site.api}}/flutter/painting/TextScaler-class.html
[`MediaQuery.textScalerOf`]: {{site.api}}/flutter/widgets/MediaQuery/textScalerOf.html
[`MediaQuery.maybeTextScalerOf`]: {{site.api}}/flutter/widgets/MediaQuery/maybeTextScalerOf.html
[`MediaQuery.withNoTextScaling`]: {{site.api}}/flutter/widgets/MediaQuery/withNoTextScaling.html
[`MediaQuery.withClampedTextScaling`]: {{site.api}}/flutter/widgets/MediaQuery/withClampedTextScaling.html

[New font scaling system (Issue 116231)]: {{site.repo.flutter}}/issues/116231
[Replaces `textScaleFactor` with `TextScaler`]: {{site.repo.flutter}}/pull/128522
