---
# title: Added enabled property and made onChanged optional for DropdownButton
title: DropdownButton 新增 enabled 属性，并将 onChanged 改为可选
# description: >-
#   DropdownButton and DropdownButtonFormField now support an explicit enabled
#   property, and their onChanged callbacks are no longer required.
description: >-
  DropdownButton 和 DropdownButtonFormField 现在支持显式的 enabled 属性，
  它们的 onChanged 回调也不再是必需的。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`DropdownButton` and `DropdownButtonFormField` now include
an `enabled` property to explicitly manage their interactive state,
and the `onChanged` callback is no longer marked as `required`.

`DropdownButton` 和 `DropdownButtonFormField` 现在包含 `enabled` 属性，
用来显式管理交互状态，`onChanged` 回调也不再标记为 `required`。

## Background

## 背景

Previously, `DropdownButton` and `DropdownButtonFormField` didn't
have an `enabled` parameter.
The only way to disable the dropdown
(graying it out and making it non-interactive) was to
pass `null` to the `required` `onChanged` callback.
This led to unintuitive code when trying to
dynamically enable or disable the button,
forcing developers to write conditional expressions for the callback itself,
such as `onChanged: condition ? (value) { ... } : null`.

以前，`DropdownButton` 和 `DropdownButtonFormField` 没有 `enabled` 参数。
要禁用下拉框（把它变灰并使其不可交互），
唯一的办法是向标记为 `required` 的 `onChanged` 回调传入 `null`。
想要动态启用或禁用按钮时，这样的代码很不直观，
开发者不得不为回调本身写条件表达式，
例如 `onChanged: condition ? (value) { ... } : null`。

To improve this API, a dedicated `enabled` property was introduced,
and `onChanged` was made optional.

为了改进这个 API，我们引入了专门的 `enabled` 属性，
并把 `onChanged` 改成了可选。

The `enabled` property is optional.
Making it mandatory introduces a massive breaking change that
breaks nearly every existing `DropdownButton` implementation in
the Flutter ecosystem.
Instead, to preserve backward compatibility,
if the `enabled` argument isn't explicitly provided,
the button determines its state by falling back to whether
`onChanged` is provided (that is, it's enabled if `onChanged != null`,
and disabled if `onChanged == null`).

`enabled` 属性是可选的。
如果把它改成必需，会带来巨大的破坏性改动，
几乎会破坏 Flutter 生态中每一个现有的 `DropdownButton` 实现。
因此，为了保持向后兼容，如果没有显式传入 `enabled` 参数，
按钮会退回到根据是否提供了 `onChanged` 来决定状态
（也就是 `onChanged != null` 时启用，`onChanged == null` 时禁用）。

The minor breaking change here is structural:
while the old conditional `onChanged` pattern technically
still works due to the fallback logic,
developers are encouraged to migrate to the clearer API by
explicitly using the `enabled` property.

这里较小的破坏性改动是结构性的：
由于存在回退逻辑，旧的条件 `onChanged` 写法在技术上仍然有效，
但我们建议开发者迁移到更清晰的 API，显式使用 `enabled` 属性。

## Migration guide

## 迁移指南

If you previously disabled your `DropdownButton` by
conditionally passing `null` to `onChanged`,
migrate to the new `enabled` property.
This cleanly separates the state of the widget (enabled/disabled) from
its behavior (the callback).

如果你以前通过有条件地向 `onChanged` 传入 `null` 来禁用 `DropdownButton`，
请迁移到新的 `enabled` 属性。
这样可以把 widget 的状态（启用或禁用）与它的行为（回调）清楚地分开。

To automatically migrate your code for simple cases
(such as statically passing `null`), run the following command:

对于简单情况（例如静态传入 `null`），可以运行下面的命令自动迁移代码：

```console
$ dart fix --apply
```

:::important
Note that `dart fix` will not automatically migrate cases where `onChanged`
is set using conditional logic. For those, you must update your code manually.

如果 `onChanged` 是用条件逻辑赋值的，`dart fix` 不会自动迁移。
这些情况需要你手动更新代码。
:::

### Case 1: Statically disabled dropdown {: #case-1-statically-disabled }

### 情形 1：静态禁用的下拉框

For simple cases where a dropdown is permanently disabled,
you can now simply omit `onChanged` and use `enabled: false`.

对于下拉框被永久禁用的简单情况，
现在可以直接省略 `onChanged`，并使用 `enabled: false`。

Code before migration:

迁移之前的代码：

```dart
final disabledDropdown = DropdownButton<String>(
  value: 'Option 1',
  items: const [
    DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
  ],
  onChanged: null, // This was the only way to disable it.
);
```

Code after migration:

迁移之后的代码：

```dart diff
  final disabledDropdown = DropdownButton<String>(
    value: 'Option 1',
    items: const [
      DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
    ],
-   onChanged: null, // This was the only way to disable it.
+   enabled: false,
  );
```

### Case 2: Conditionally disabled dropdown {: #case-2-conditionally-disabled }

### 情形 2：按条件禁用的下拉框

The recommended best practice is to separate the callback from
the interactive state by using the `enabled` property directly.

推荐的做法是直接使用 `enabled` 属性，把回调和交互状态分开。

Code before migration:

迁移之前的代码：

```dart
final conditionalDropdown = DropdownButton<String>(
  value: 'Option 1',
  items: const [
    DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
  ],
  onChanged: condition ? (value) { ... } : null,
);
```

Code after migration:

迁移之后的代码：

```dart diff
  final conditionalDropdown = DropdownButton<String>(
    value: 'Option 1',
    items: const [
      DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
    ],
-   onChanged: condition ? (value) { ... } : null,
+   onChanged: (value) { ... },
+   enabled: condition,
  );
```

## Timeline

## 时间线

Landed in version: Not yet<br>
合入版本：Not yet<br>
In stable release: Not yet

进入稳定版：Not yet

## References

## 参考资料

API documentation:

API 文档：

* [`DropdownButton`][]
* [`DropdownButtonFormField`][]

Relevant issues:

相关 issue：

* [Why is DropdownButtonFormField's onChanged required?][issue-57953]

  [为什么 DropdownButtonFormField 的 onChanged 是必需的？][issue-57953]

Relevant PRs:

相关 PR：

* [Update DropdownButton enabled property logic][]

  [更新 DropdownButton 的 enabled 属性逻辑][Update DropdownButton enabled property logic]

[`DropdownButton`]: {{site.api}}/flutter/material/DropdownButton-class.html
[`DropdownButtonFormField`]: {{site.api}}/flutter/material/DropdownButtonFormField-class.html
[issue-57953]: {{site.repo.flutter}}/issues/57953
[Update DropdownButton enabled property logic]: {{site.repo.flutter}}/pull/182419
