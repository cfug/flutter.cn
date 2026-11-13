---
# title: Updated Material 3 progress indicators
title: 更新后的 Material 3 进度指示器
# description: >-
#   The `LinearProgressIndicator` and `CircularProgressIndicator` widgets
#   have been updated to match the Material 3 Design specifications.
description: >-
  `LinearProgressIndicator` 与 `CircularProgressIndicator` widget
  已更新，以符合 Material 3 设计规范。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `LinearProgressIndicator` and `CircularProgressIndicator` have
been updated to match the Material 3 Design specifications.

`LinearProgressIndicator` 与 `CircularProgressIndicator`
已更新，以符合 Material 3 设计规范。

The `LinearProgressIndicator`changes include a gap between
the active and inactive tracks, a stop indicator, and rounded corners.
The `CircularProgressIndicator` changes include a gap between
the active and inactive tracks, and rounded stroke cap.

`LinearProgressIndicator` 的改动包括：
活动轨道与非活动轨道之间的间隙、停止指示器，以及圆角。
`CircularProgressIndicator` 的改动包括：
活动轨道与非活动轨道之间的间隙，以及圆角笔触端点。

## Context

## 上下文

The Material 3 Design specifications for the `LinearProgressIndicator` and
`CircularProgressIndicator` were updated in December 2023.

`LinearProgressIndicator` 与 `CircularProgressIndicator`
的 Material 3 设计规范已于 2023 年 12 月更新。

To opt into the 2024 design specifications,
set the `LinearProgressIndicator.year2023` and
`CircularProgressIndicator.year2023` flags to `false`.
This is done to ensure that existing apps aren't affected by
the updated design spec.

要选用 2024 设计规范，
请把 `LinearProgressIndicator.year2023`
和 `CircularProgressIndicator.year2023` 标志设为 `false`。
这样做是为了确保现有应用不受更新后设计规范的影响。

## Description of change

## 改动说明

The `LinearProgressIndicator` and `CircularProgressIndicator` widgets each
have a `year2023` flag that can be set to `false` to
opt in to the updated design specification.
The default value for the `year2023` flag is `true`, which means that
the progress indicators use the 2023 design spec.

`LinearProgressIndicator` 与 `CircularProgressIndicator` widget
各自都有 `year2023` 标志，设为 `false` 即可
选用更新后的设计规范。
`year2023` 标志的默认值是 `true`，
也就是进度指示器使用 2023 设计规范。

When [`LinearProgressIndicator.year2023`][] is set to `false`,
the progress indicator have gaps between active and inactive tracks,
a stop indicator, and rounded corners.
If the `LinearProgressIndicator` is indeterminate,
the stop indicator isn't shown.

当 [`LinearProgressIndicator.year2023`][] 设为 `false` 时，
进度指示器会在活动轨道与非活动轨道之间留出间隙，
并带有停止指示器和圆角。
如果 `LinearProgressIndicator` 处于不确定状态，
则不显示停止指示器。

When [`CircularProgressIndicator.year2023`][] is set to `false`,
the progress indicator has a track gap and rounded stroke cap.

当 [`CircularProgressIndicator.year2023`][] 设为 `false` 时，
进度指示器会有轨道间隙和圆角笔触端点。

## Migration guide

## 迁移指南

To opt into the updated design spec for the `LinearProgressIndicator`,
set the `year2023` flag to `false`:

要为 `LinearProgressIndicator` 选用更新后的设计规范，
请把 `year2023` 标志设为 `false`：

```dart highlightLines=2
LinearProgressIndicator(
  year2023: false,
  value: 0.5,
),
```

To update your entire app to use the updated `LinearProgressIndicator` design,
set the `ProgressIndicatorThemeData.year2023` property to `false` in your
`MaterialApp`:

要让整个应用使用更新后的 `LinearProgressIndicator` 设计，
请在 `MaterialApp` 里把
`ProgressIndicatorThemeData.year2023` 属性设为 `false`：

```dart highlightLines=2
return MaterialApp(
  theme: ThemeData(progressIndicatorTheme: const ProgressIndicatorThemeData(year2023: false)),
        // ...
        LinearProgressIndicator(
          year2023: false,
          value: 0.5,
        ),
        // ...
```

To opt into the updated design spec for the `CircularProgressIndicator`,
set the `year2023` flag to `false`:

要为 `CircularProgressIndicator` 选用更新后的设计规范，
请把 `year2023` 标志设为 `false`：

```dart highlightLines=2
CircularProgressIndicator(
  year2023: false,
  value: 0.5,
),
```

To update your entire app to use the updated `CircularProgressIndicator` design,
set the `ProgressIndicatorThemeData.year2023` property to `false` in your
`MaterialApp`:

要让整个应用使用更新后的 `CircularProgressIndicator` 设计，
请在 `MaterialApp` 里把
`ProgressIndicatorThemeData.year2023` 属性设为 `false`：

```dart highlightLines=2
return MaterialApp(
  theme: ThemeData(progressIndicatorTheme: const ProgressIndicatorThemeData(year2023: false)),
        // ...
        CircularProgressIndicator(
          year2023: false,
          value: 0.5,
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

- [`LinearProgressIndicator`][]
- [`CircularProgressIndicator`][]
- [`LinearProgressIndicator.year2023`][]
- [`CircularProgressIndicator.year2023`][]

Relevant issues:

相关 issue：

- [Update both `ProgressIndicator` for Material 3 redesign][]

  [更新两种进度指示器][Update both `ProgressIndicator` for Material 3 redesign]

Relevant PRs:

相关 PR：

- [Update Material 3 `LinearProgressIndicator` for new visual style][]

  [更新线性进度指示器][Update Material 3 `LinearProgressIndicator` for new visual style]

- [Update Material 3 `CircularProgressIndicator` for new visual style][]

  [更新圆形指示器][Update Material 3 `CircularProgressIndicator` for new visual style]

[`LinearProgressIndicator`]: {{site.main-api}}/flutter/material/LinearProgressIndicator-class.html
[`CircularProgressIndicator`]: {{site.main-api}}/flutter/material/CircularProgressIndicator-class.html
[`LinearProgressIndicator.year2023`]: {{site.main-api}}/flutter/material/LinearProgressIndicator/year2023.html
[`CircularProgressIndicator.year2023`]: {{site.main-api}}/flutter/material/CircularProgressIndicator/year2023.html
[Update both `ProgressIndicator` for Material 3 redesign]: {{site.repo.flutter}}/issues/141340
[Update Material 3 `LinearProgressIndicator` for new visual style]: {{site.repo.flutter}}/pull/154817
[Update Material 3 `CircularProgressIndicator` for new visual style]: {{site.repo.flutter}}/pull/158104
