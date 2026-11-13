---
# title: Material Chip button semantics
title: Material Chip 的按钮语义
# description: Interactive Material Chips are now semantically marked as buttons.
description: 可交互的 Material Chip 现在在语义上会被标记为按钮。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Flutter now applies the semantic label of `button` to
all interactive [Material Chips][] for accessibility purposes.

出于无障碍考虑，Flutter 现在会为所有可交互的
[Material Chip][Material Chips] 应用 `button` 语义标签。

## Context

## 上下文

Interactive Material Chips (namely [`ActionChip`][],
[`ChoiceChip`][], [`FilterChip`][], and [`InputChip`][])
are now semantically marked as being buttons.
However, the non-interactive information [`Chip`][] is not.

可交互的 Material Chip（即 [`ActionChip`][]、
[`ChoiceChip`][]、[`FilterChip`][] 和 [`InputChip`][]）
现在在语义上会被标记为按钮。
不过，不可交互的信息型 [`Chip`][] 不会。

Marking Chips as buttons helps accessibility tools,
search engines, and other semantic analysis software
understand the meaning of an app. For example, it
allows screen readers (such as TalkBack on Android
and VoiceOver on iOS) to announce a tappable Chip
as a "button", which can assist users in navigating
your app. Prior to this change, users of accessibility
tools may have had a subpar experience,
unless you implemented a workaround by manually adding the
missing semantics to the Chip widgets in your app.

把 Chip 标记为按钮，有助于无障碍工具、
搜索引擎和其他语义分析软件理解应用的含义。
例如，屏幕阅读器（如 Android 上的 TalkBack
和 iOS 上的 VoiceOver）可以把可点按的 Chip
朗读为「button」，从而帮助用户在应用中导航。
在此改动之前，无障碍工具的用户体验可能较差，
除非你手动为应用中的 Chip widget 补上缺失的语义作为变通。

## Description of change

## 改动说明

The outermost [`Semantics`][] widget that wraps all
Chip classes to describe their semantic properties
is modified.

包裹所有 Chip 类、用于描述其语义属性的
最外层 [`Semantics`][] widget 已修改。

The following changes apply to
[`ActionChip`][], [`ChoiceChip`][], [`FilterChip`][],
and [`InputChip`][]:

下列改动适用于
[`ActionChip`][]、[`ChoiceChip`][]、[`FilterChip`][]
和 [`InputChip`][]：

* The [`button`][`SemanticsProperties.button`] property
  is set to `true`.

  [`button`][`SemanticsProperties.button`] 属性设为 `true`。

* The [`enabled`][`SemanticsProperties.enabled`] property
  reflects whether the Chip is _currently_ tappable
  (by having a callback set).

  [`enabled`][`SemanticsProperties.enabled`] 属性反映
  Chip 是否 **当前** 可点按（即是否设置了回调）。

These property changes bring interactive Chips' semantic
behavior in-line with that of other [Material Buttons][].

这些属性改动使可交互 Chip 的语义行为
与其他 [Material 按钮][Material Buttons] 保持一致。

For the non-interactive information [`Chip`][]:

对于不可交互的信息型 [`Chip`][]：

* The [`button`][`SemanticsProperties.button`] property
  is set to `false`.

  [`button`][`SemanticsProperties.button`] 属性设为 `false`。

* The [`enabled`][`SemanticsProperties.enabled`] property
  is set to `null`.

  [`enabled`][`SemanticsProperties.enabled`] 属性设为 `null`。

## Migration guide

## 迁移指南

**You might not need to perform any migration.**
This change only affects you if you worked around
the issue of Material Chips missing `button` semantics by
wrapping the widget given to the `label` field of a
`Chip` with a `Semantics` widget marked as
`button: true`. **In this case, the inner and outer `button`
semantics conflict, resulting in the tappable area
of the button shrinking down to the size of the label
after this change is introduced.** Fix this issue
either by deleting that `Semantics` widget and replacing
it with its child, or by removing the `button: true`
property if other semantic properties still
need to be applied to the `label` widget of the Chip.

**你可能不需要做任何迁移。**
只有当你为了绕过 Material Chip 缺少 `button` 语义的问题，
用标记了 `button: true` 的 `Semantics` widget
包裹 `Chip` 的 `label` 字段所给的 widget 时，
此改动才会影响你。**在这种情况下，内外两层 `button`
语义会冲突，引入此改动后，按钮的可点按区域
会缩小到 label 的大小。** 修复方式有两种：
删掉那个 `Semantics` widget 并换成它的子级，
或者在 Chip 的 `label` widget 仍需应用其他语义属性时，
去掉 `button: true` 属性。

The following snippets use [`InputChip`][] as an example,
but the same process applies to [`ActionChip`][],
[`ChoiceChip`][], and [`FilterChip`][] as well.

下面的代码片段以 [`InputChip`][] 为例，
同样的步骤也适用于 [`ActionChip`][]、
[`ChoiceChip`][] 和 [`FilterChip`][]。

**Case 1: Remove the `Semantics` widget.**

**情形 1：移除 `Semantics` widget。**

Code before migration:

迁移前的代码：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Semantics(
    button: true,
    child: Text('My Input Chip'),
  ),
);
```

Code after migration:

迁移后的代码：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Text('My Input Chip'),
);
```

**Case 2: Remove `button:true` from the `Semantics` widget.**

**情形 2：从 `Semantics` widget 中移除 `button:true`。**

Code before migration:

迁移前的代码：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Semantics(
    button: true,
    hint: 'Example Hint',
    child: Text('My Input Chip'),
  ),
);
```

Code after migration:

迁移后的代码：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Semantics(
    hint: 'Example Hint',
    child: Text('My Input Chip'),
  ),
);
```

## Timeline

## 时间线

Landed in version: 1.23.0-7.0.pre<br>
合入版本：1.23.0-7.0.pre<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`ActionChip`][]
* [`Chip`][]
* [`ChoiceChip`][]
* [`FilterChip`][]
* [`InputChip`][]
* [Material Buttons][]

  [Material 按钮][Material Buttons]

* [Material Chips][]

  [Material Chip][Material Chips]

* [`Semantics`][]
* [`SemanticsProperties.button`][]
* [`SemanticsProperties.enabled`][]

Relevant issue:

相关 issue：

* [Issue 58010][]: InputChip doesn't announce any
  action for a11y on iOS

  [Issue 58010][Issue 58010]：InputChip 在 iOS 上
  不会为无障碍朗读任何操作

Relevant PRs:

相关 PR：

* [PR 60141][]: Tweaking Material Chip a11y semantics
  to match buttons

  [PR 60141][PR 60141]：调整 Material Chip 的无障碍语义，
  使其与按钮一致

* [PR 60645][]: Revert "Tweaking Material Chip a11y
  semantics to match buttons" (#60141)

  [PR 60645][PR 60645]：回退「调整 Material Chip 的无障碍语义，
  使其与按钮一致」（#60141）

* [PR 61048][]: Re-land "Tweaking Material Chip a11y
  semantics to match buttons" (#60141)

  [PR 61048][PR 61048]：重新落地「调整 Material Chip 的无障碍语义，
  使其与按钮一致」（#60141）

[`ActionChip`]: {{site.api}}/flutter/material/ActionChip-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`ChoiceChip`]: {{site.api}}/flutter/material/ChoiceChip-class.html
[`FilterChip`]: {{site.api}}/flutter/material/FilterChip-class.html
[`InputChip`]: {{site.api}}/flutter/material/InputChip-class.html
[Material Buttons]: {{site.material}}/components/all-buttons
[Material Chips]: {{site.material}}/components/chips
[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html
[`SemanticsProperties.button`]: {{site.api}}/flutter/semantics/SemanticsProperties/button.html
[`SemanticsProperties.enabled`]: {{site.api}}/flutter/semantics/SemanticsProperties/enabled.html

[Issue 58010]: {{site.repo.flutter}}/issues/58010

[PR 60141]: {{site.repo.flutter}}/pull/60141
[PR 60645]: {{site.repo.flutter}}/pull/60645
[PR 61048]: {{site.repo.flutter}}/pull/61048
