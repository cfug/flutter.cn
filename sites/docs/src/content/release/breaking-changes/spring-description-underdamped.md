---
# title: Underdamped spring formula changed
title: 欠阻尼弹簧公式已更改
# description: >-
#   The formula for `SpringDescription` changed to correct an earlier error,
#   affecting underdamped springs (damping ratio less than 1).
description: >-
  `SpringDescription` 的公式已更改，以修正先前的错误，
  影响阻尼比小于 1 的欠阻尼弹簧。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The formula for `SpringDescription` changed to correct an earlier error,
affecting underdamped springs (damping ratio less than 1)
with mass values other than 1.
Springs created prior to this change may exhibit
different bouncing behaviors after upgrading.

`SpringDescription` 的公式已更改，以修正先前的错误。
这会影响阻尼比小于 1、且质量不为 1 的欠阻尼弹簧。
此次改动之前创建的弹簧，升级后回弹行为可能会不同。

## Background

## 背景

The [`SpringDescription`][] class describes the behavior of damped springs,
enabling Flutter widgets to animate realistically based on provided parameters.
The physics of damped springs are widely studied and documented. For an overview
of damping, see [Wikipedia: Damping][].

[`SpringDescription`][`SpringDescription`] 类描述阻尼弹簧的行为，
让 Flutter widget 能根据给定参数做出更真实的动画。
阻尼弹簧的物理规律已有广泛研究和记载。
阻尼的概述见 [Wikipedia：阻尼][Wikipedia: Damping]。

Previously, Flutter's formula for calculating underdamped spring behavior was
incorrect, as reported in [Issue 163858][]. This error affected all springs with
a damping ratio less than 1 and a mass other than 1. Consequently, animations
did not match expected real-world physics, and behavior around the critical
damping point (damping ratio of exactly 1) exhibited discontinuities.
Specifically, when using `SpringDescription.withDampingRatio`, small
differences, such as damping ratios of 1.0001 versus 0.9999, resulted in
significantly different animations.

此前，Flutter 计算欠阻尼弹簧行为的公式不正确，
见 [Issue 163858][Issue 163858]。
该错误会影响所有阻尼比小于 1 且质量不为 1 的弹簧。
因此动画与预期的真实物理效果不符，
临界阻尼点（阻尼比恰好为 1）附近的行为还会出现不连续。
具体来说，使用 `SpringDescription.withDampingRatio` 时，
阻尼比 1.0001 与 0.9999 这种细微差别，
会产生明显不同的动画。

The issue was corrected in PR [Fix SpringSimulation formula for underdamping][],
which updated the underlying calculation. As a result, previously affected
animations now behave differently, though no explicit errors are reported by the
framework.

该问题已在 PR [修复欠阻尼的 SpringSimulation 公式][Fix SpringSimulation formula for underdamping]
中修正，底层计算已更新。
因此，先前受影响的动画现在表现会不同，
但框架不会显式报告错误。

## Migration guide

## 迁移指南

Migration is necessary only for springs with damping ratios less than 1 and
masses other than 1.

只有阻尼比小于 1 且质量不为 1 的弹簧才需要迁移。

To restore previous animation behavior, update your spring parameters
accordingly. You can calculate the required parameter adjustments using the
provided [JSFiddle for migration][]. Detailed formulas and explanations follow
in the next sections.

若要恢复之前的动画行为，请按下面的方式更新弹簧参数。
可以用提供的 [迁移用 JSFiddle][JSFiddle for migration] 计算需要调整的参数。
后面几节给出具体公式和说明。

### Default constructor

### 默认构造函数

If the `SpringDescription` was built with the default constructor with
mass `m`, stiffness `k`, and damping `c`,
then it should be changed with the following formula:

如果 `SpringDescription` 是用默认构造函数创建的，
质量为 `m`、刚度为 `k`、阻尼为 `c`，
则应按下面的公式修改：

```plaintext
new_m = 1
new_c = c * m
new_k = (4 * (k / m) - (c / m)^2 + (c * m)^2) / 4
```

Code before migration:

迁移前的代码：

```dart
const spring = SpringDescription(
  mass: 20.0,
  stiffness: 10,
  damping: 1,
);
```

Code after migration:

迁移后的代码：

```dart
const spring = SpringDescription(
  mass: 1.0,
  stiffness: 100.499375,
  damping: 20,
);
```

### `.withDampingRatio` constructor

### `.withDampingRatio` 构造函数

If the `SpringDescription` was built with the `.withDampingRatio` constructor
with mass `m`, stiffness `k`, and ratio `z`, then first calculate damping:

如果 `SpringDescription` 是用 `.withDampingRatio` 构造函数创建的，
质量为 `m`、刚度为 `k`、阻尼比为 `z`，请先计算阻尼：

```plaintext
c = z * 2 * sqrt(m * k)
```

Then apply the formula above.
Optionally, you might convert the result back to damping ratio with:

然后套用上面的公式。
也可以按下面的方式把结果换算回阻尼比：

```plaintext
new_z = new_c / 2 / sqrt(new_m * new_k)
```

Code before migration:

迁移前的代码：

```dart
const spring = SpringDescription.withDampingRatio(
  mass: 5.0,
  stiffness: 6.0,
  damping: 0.03,
);
```

Code after migration:

迁移后的代码：

```dart
const spring = SpringDescription.withDampingRatio(
  mass: 1,
  stiffness: 1.87392,
  ratio: 0.60017287468545,
);
```

## Timeline

## 时间线

Landed in version: 3.31.0-0.1.pre<br>
合入版本：3.31.0-0.1.pre<br>
In stable release: 3.32

进入稳定版：3.32

## References

## 参考资料

API documentation:

API 文档：

* [`SpringDescription`][]

  [`SpringDescription`][`SpringDescription`]

Relevant issues:

相关 issue：

* [Issue 163858][], where the bug was discovered and more context can be found.

  [Issue 163858][Issue 163858]，bug 在这里被发现，也可以看到更多背景。

Relevant PRs:

相关 PR：

* [Fix SpringSimulation formula for underdamping][]

  [修复欠阻尼的 SpringSimulation 公式][Fix SpringSimulation formula for underdamping]

Tool:

工具：

* [JSFiddle for migration][]

  [迁移用 JSFiddle][JSFiddle for migration]

[Fix SpringSimulation formula for underdamping]: {{site.repo.flutter}}/pull/165017
[Issue 163858]: {{site.repo.flutter}}/issues/163858
[JSFiddle for migration]: https://jsfiddle.net/6jgvbzps/30/
[`SpringDescription`]: {{site.api}}/flutter/physics/SpringDescription-class.html
[Wikipedia: Damping]: https://en.wikipedia.org/wiki/Damping
