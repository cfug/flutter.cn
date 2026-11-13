---
# title: Redesigned the Radio widget
title: 重新设计了 Radio widget
# description: >-
#   Learn about changes to the radio widget in Flutter 3.35.
description: >-
  了解 Flutter 3.35 中 radio widget 的改动。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Introduced the `RadioGroup` widget to centralize `groupValue` management and the `onChanged`
callback for a set of `Radio` widgets. As a result, the individual `Radio.groupValue` and
`Radio.onChanged` properties have been deprecated.

引入了 `RadioGroup` widget，用来集中管理一组 `Radio` widget 的 `groupValue`
以及 `onChanged` 回调。
因此，单独的 `Radio.groupValue` 和 `Radio.onChanged` 属性已弃用。

## Context

## 上下文

To meet APG (ARIA Practices Guide) requirements for keyboard navigation and
semantic properties in radio button groups, Flutter needed a dedicated radio group concept.
Introducing a wrapper widget, `RadioGroup`, provides this out-of-the-box support.
This change also presented an opportunity to simplify the API for individual `Radio` widgets.

为满足 APG（ARIA 实践指南）对单选按钮组的键盘导航和语义属性的要求，
Flutter 需要一个专门的 radio 分组概念。
引入包装 widget `RadioGroup` 后，开箱即可获得这一支持。
此次改动也让单个 `Radio` widget 的 API 得以简化。

## Description of change

## 改动说明

The following API is deprecated:

下列 API 已弃用：

* `Radio.onChanged`
* `Radio.groupValue`
* `CupertinoRadio.onChanged`
* `CupertinoRadio.groupValue`
* `RadioListTile.groupValue`
* `RadioListTile.onChanged`.

## Migration guide

## 迁移指南

If you are using these properties, you can refactor them with `RadioGroup`.

如果你正在使用这些属性，可以用 `RadioGroup` 重构。

### Case 1: trivial case

### 情形 1：简单情形

Code before migration:

迁移之前的代码：

```dart
Widget build(BuildContext context) {
  return Column(
    children: <Widget>[
      Radio<int>(
        value: 0,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        },
      ),
      Radio<int>(
        value: 2,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        },
      ),
    ],
  );
}
```

Code after migration:

迁移之后的代码：

```dart
Widget build(BuildContext context) {
  return RadioGroup<int>(
    groupValue: _groupValue,
    onChanged: (int? value) {
      setState(() {
        _groupValue = value;
      });
    },
    child: Column(
      children: <Widget>[
        Radio<int>(value: 0),
        Radio<int>(value: 2),
      ],
    ),
  );
}
```

### Case 2: disabled radio

### 情形 2：禁用的 radio

Code before migration:

迁移之前的代码：

```dart
Widget build(BuildContext context) {
  return Column(
    children: <Widget>[
      Radio<int>(
        value: 0,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        },
      ),
      Radio<int>(
        value: 2,
        groupValue: _groupValue,
        onChanged: null, // disabled
      ),
    ],
  );
}
```

Code after migration:

迁移之后的代码：

```dart
Widget build(BuildContext context) {
  return RadioGroup<int>(
    groupValue: _groupValue,
    onChanged: (int? value) {
      setState(() {
        _groupValue = value;
      });
    },
    child: Column(
      children: <Widget>[
        Radio<int>(value: 0),
        Radio<int>(value: 2, enabled: false),
      ],
    ),
  );
}
```

### Case 3: mixed group or multi-selection

### 情形 3：混合分组或多选

Code before migration:

迁移之前的代码：

```dart
Widget build(BuildContext context) {
  return Column(
    children: <Widget>[
      Radio<int>(
        value: 1,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        }, // disabled
      ),
      Radio<String>(
        value: 'a',
        groupValue: _stringValue,
        onChanged: (String? value) {
          setState(() {
            _stringValue = value;
          });
        },
      ),
      Radio<String>(
        value: 'b',
        groupValue: _stringValue,
        onChanged: (String? value) {
          setState(() {
            _stringValue = value;
          });
        },
      ),
      Radio<int>(
        value: 2,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        }, // disabled
      ),
    ],
  );
}
```

Code after migration:

迁移之后的代码：

```dart
Widget build(BuildContext context) {
  return RadioGroup<int>(
    groupValue: _groupValue,
    onChanged: (int? value) {
      setState(() {
        _groupValue = value;
      });
    },
    child: Column(
      children: <Widget>[
        Radio<int>(value: 1),
        RadioGroup<String>(
          child: Column(
            children: <Widget>[
              Radio<String>(value: 'a'),
              Radio<String>(value: 'b'),
            ]
          ),
        ),
        Radio<int>(value: 2),
      ],
    ),
  );
}
```

## Timeline

## 时间线

Landed in version: 3.34.0-0.0.pre<br>
合入版本：3.34.0-0.0.pre<br>
In stable release: 3.35

进入稳定版：3.35

## References

## 参考资料

* [`APG`][]

API documentation:

API 文档：

* [`Radio`][]
* [`CupertinoRadio`][]
* [`RadioListTile`][]
* [`RadioGroup`][]

Relevant issue:

相关 issue：

* [Issue 113562][]

Relevant PR:

相关 PR：

* [PR 168161][]

[`APG`]: https://www.w3.org/WAI/ARIA/apg/patterns/radio
[`Radio`]: {{site.api}}/flutter/material/Radio-class.html
[`RadioListTile`]: {{site.api}}/flutter/material/RadioListTile-class.html
[`CupertinoRadio`]: {{site.api}}/flutter/cupertino/CupertinoRadio-class.html
[`RadioGroup`]: {{site.api}}/flutter/widgets/RadioGroup-class.html
[Issue 113562]: {{site.repo.flutter}}/issues/113562
[PR 168161]: {{site.repo.flutter}}/pull/168161
