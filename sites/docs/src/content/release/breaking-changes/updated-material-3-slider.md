---
# title: Updated Material 3 `Slider`
title: 更新后的 Material 3 `Slider`
# description: >-
#   The `Slider` widget has been updated to match the
#   Material 3 Design specifications.
description: >-
  `Slider` widget 已更新，以匹配 Material 3 设计规范。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `Slider` has been updated to match the Material 3 Design specifications.

`Slider` 已更新，以匹配 Material 3 设计规范。

The `Slider` changes include an updated height,
a gap between the active and inactive track, and
a stop indicator to show the end value of the inactive track.
Pressing the thumb adjusts its width, and the track adjusts its shape.
The new value indicator shape is a rounded rectangle.
New color mappings have also been introduced for some of the `Slider` shapes.

`Slider` 的变化包括更新后的高度、
活动轨道与非活动轨道之间的间隙，
以及用于显示非活动轨道结束值的停止指示器。
按下拇指会调整其宽度，轨道也会调整形状。
新的值指示器形状是圆角矩形。
部分 `Slider` 形状还引入了新的颜色映射。

## Context

## 上下文

The Material 3 Design specs for the `Slider` were updated in December 2023.
To opt into the 2024 design spec, set the `Slider.year2023` flag to `false`.
This is done to ensure that existing apps aren't affected by
the updated design specifications.

`Slider` 的 Material 3 设计规范已于 2023 年 12 月更新。
要选用 2024 设计规范，请将 `Slider.year2023` 标志设为 `false`。
这样做是为了确保现有应用不受更新后的设计规范影响。

## Description of change

## 改动说明

The `Slider` widget has a `year2023` flag that can be set to `false` to
opt in to the updated design spec.
The default value for the `year2023` flag is `true`,
which means that the `Slider` uses the previous 2023 design specifications.

`Slider` widget 有一个 `year2023` 标志，
设为 `false` 即可选用更新后的设计规范。
`year2023` 标志的默认值为 `true`，
这意味着 `Slider` 使用先前的 2023 设计规范。

When [`Slider.year2023`][] is set to `false`,
the slider uses the updated design specifications.

当 [`Slider.year2023`][`Slider.year2023`] 设为 `false` 时，
滑块会使用更新后的设计规范。

## Migration guide

## 迁移指南

To opt into the updated design spec for the `Slider`,
set the `year2023` flag to `false`:

要为 `Slider` 选用更新后的设计规范，
请将 `year2023` 标志设为 `false`：

```dart highlightLines=2
Slider(
  year2023: false,
  value: _value,
  onChanged: (value) {
    setState(() {
      _value = value;
    });
  },
),
```

To update your entire app to use the updated `Slider` design, set the
`SliderThemeData.year2023` property to `false` in your `MaterialApp`:

要让整个应用使用更新后的 `Slider` 设计，
请在 `MaterialApp` 中将 `SliderThemeData.year2023` 属性设为 `false`：

```dart highlightLines=2
return MaterialApp(
  theme: ThemeData(sliderTheme: const SliderThemeData(year2023: false)),
        // ...
        Slider(
          value: _value,
          onChanged: (value) {
            setState(() {
              _value = value;
            });
          },
        ),
        // ...
```

## Timeline

## 时间线

Landed in version: 3.28.0-0.1.pre<br>
合入版本：3.28.0-0.1.pre<br>
In stable release: 3.29

进入稳定版：3.29

## References

## 参考资料

API documentation:

API 文档：

* [`Slider`][]
* [`Slider.year2023`][]

Relevant issues:

相关 issue：

* [Update `Slider` for Material 3 redesign][]

  [为 Material 3 重新设计更新 `Slider`][Update `Slider` for Material 3 redesign]

Relevant PRs:

相关 PR：

* [Introduce new Material 3 `Slider` shapes][]

  [引入新的 Material 3 `Slider` 形状][Introduce new Material 3 `Slider` shapes]

[`Slider`]: {{site.main-api}}/flutter/material/Slider-class.html
[`Slider.year2023`]: {{site.main-api}}/flutter/material/Slider/year2023.html
[Update `Slider` for Material 3 redesign]: {{site.repo.flutter}}/issues/141842
[Introduce new Material 3 `Slider` shapes]: {{site.repo.flutter}}/pull/152237
