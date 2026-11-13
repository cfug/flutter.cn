---
# title: Adding TextInputClient.currentAutofillScope property
title: 新增 TextInputClient.currentAutofillScope 属性
# description: >
#   A new getter TextInputClient.currentAutofillScope was
#   added to the TextInputClient interface for autofill support.
description: >
  TextInputClient 接口新增 getter
  TextInputClient.currentAutofillScope，用于支持自动填充。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A new getter, `TextInputClient.currentAutofillScope`, was added to the
`TextInputClient` interface; all `TextInputClient` subclasses must
provide a concrete implementation of `currentAutofillScope`.

`TextInputClient` 接口新增了 getter
`TextInputClient.currentAutofillScope`；
所有 `TextInputClient` 子类都必须
为 `currentAutofillScope` 提供具体实现。

This getter allows the `TextInputClient` to trigger an
autofill that involves multiple logically connected input
fields. For example, a "username" field can trigger an
autofill that fills both itself and the "password"
field associated with it.

借助这个 getter，`TextInputClient` 可以触发一次
涉及多个逻辑关联输入框的自动填充。
例如，「username」字段可以触发一次自动填充，
同时填入自身以及与之关联的「password」字段。

## Context

## 上下文

On many platforms, autofill services are capable of
autofilling multiple input fields in a single autofill attempt.
For example, username fields and password fields can usually
be autofilled in one go. For this reason, a Flutter input
field that is about to trigger autofill should also provide
the platform with information about other autofillable input
fields logically connected to it.
`TextInputClient.currentAutofillScope` defines the group of
input fields that are logically connected to this `TextInputClient`,
and can be autofilled together.

在许多平台上，自动填充服务可以在一次尝试中
填充多个输入框。
例如，用户名和密码字段通常可以一次填完。
因此，即将触发自动填充的 Flutter 输入框，
还应向平台提供与之逻辑关联的
其他可自动填充输入框的信息。
`TextInputClient.currentAutofillScope` 定义了
与该 `TextInputClient` 逻辑关联、
并且可以一起自动填充的那一组输入框。

## Description of change

## 改动说明

`TextInputClient` now has an additional getter that returns
the `AutofillScope` that this client belongs to.
This getter is used by the input client to collect autofill
related information from other autofillable input fields
within the same scope.

`TextInputClient` 现在多了一个 getter，
返回该客户端所属的 `AutofillScope`。
输入客户端用这个 getter，
从同一范围内其他可自动填充的输入框收集自动填充相关信息。

```dart
abstract class TextInputClient {
  AutofillScope get currentAutofillScope;
}
```

If you see the error message "missing concrete implementation of
'getter TextInputClient.currentAutofillScope'" while compiling
a Flutter app, follow the migration steps listed below.

如果在编译 Flutter 应用时看到错误信息
「missing concrete implementation of
'getter TextInputClient.currentAutofillScope'」，
请按下面的迁移步骤处理。

## Migration guide

## 迁移指南

If you're not planning to add multifield autofill
support to your `TextInputClient` subclass,
simply return `null` in the getter:

如果你不打算为 `TextInputClient` 子类
添加多字段自动填充支持，
在这个 getter 中直接返回 `null` 即可：

```dart
class CustomTextField implements TextInputClient {
  // Not having an AutofillScope does not prevent the input field
  // from being autofilled. However, only this input field is
  // autofilled when autofill is triggered on it.
  AutofillScope get currentAutofillScope => null;
}
```

If multifield autofill support is desirable, a common
`AutofillScope` to use is the `AutofillGroup` widget.
To get the closest `AutofillGroup` widget to the text
input, use `AutofillGroup.of(context)`:

如果需要多字段自动填充，
常用的 `AutofillScope` 是 `AutofillGroup` widget。
要获取离文本输入最近的 `AutofillGroup` widget，
请使用 `AutofillGroup.of(context)`：

```dart
class CustomTextFieldState extends State<CustomTextField> implements TextInputClient {
  AutofillScope get currentAutofillScope => AutofillGroup.of(context);
}
```

For more information, check out [`AutofillGroup`][].

更多信息请参阅 [`AutofillGroup`][]。

## Timeline

## 时间线

Landed in version: 1.18.0<br>
合入版本：1.18.0<br>
In stable release: 1.20

进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`AutofillGroup`][]
* [`TextInputClient.currentAutofillScope`][]

Relevant issue:

相关 issue：

* [Issue 13015: Autofill support][]

  [Issue 13015：自动填充支持][Issue 13015: Autofill support]

Relevant PR:

相关 PR：

* [Framework PR that added autofill support][]

  [添加自动填充支持的框架 PR][Framework PR that added autofill support]


[Framework PR that added autofill support]: {{site.repo.flutter}}/pull/52126
[Issue 13015: Autofill support]: {{site.repo.flutter}}/issues/13015

[`AutofillGroup`]: {{site.api}}/flutter/widgets/AutofillGroup-class.html
[`TextInputClient.currentAutofillScope`]: {{site.api}}/flutter/services/TextInputClient/currentAutofillScope.html
