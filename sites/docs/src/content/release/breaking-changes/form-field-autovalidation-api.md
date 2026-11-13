---
# title: The new Form, FormField auto-validation API
title: 新的 Form 与 FormField 自动校验 API
# description: Gives more control in how to auto validate a Form and a FormField.
description: 让你更能控制 Form 与 FormField 的自动校验方式。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The previous auto validation API for the `Form` and
`FormField` widgets didn't control when auto validation
should occur. So the auto validation for these widgets
always happened on first build when the widget was first
visible to the user, and you weren't able to control
when the auto validation should happen.

之前 `Form` 和 `FormField` widget 的自动校验 API
无法控制自动校验何时发生。
因此，这些 widget 总会在首次构建、刚对用户可见时就自动校验，
你无法控制自动校验的时机。

## Context

## 上下文

Due to the original API not allowing developers to change
the auto validation behavior for validating only when
the user interacts with the form field, we added new API
that allows developers to configure how they want
auto validation to behave for the `Form` and `FormField`
widgets.

原来的 API 无法把自动校验改成仅在用户与表单字段交互时才进行。
因此我们新增了 API，让开发者自行配置
`Form` 和 `FormField` widget 的自动校验行为。

## Description of change

## 改动说明

The following changes were made:

此次改动如下：

* The `autovalidate` parameter is deprecated.

  已弃用 `autovalidate` 参数。

* A new parameter called `autovalidateMode`,
  an Enum that accepts values from the `AutovalidateMode`
  Enum class, is added.

  新增了 `autovalidateMode` 参数。
  它是一个枚举，取值来自 `AutovalidateMode` 枚举类。

## Migration guide

## 迁移指南

To migrate to the new auto validation API you need to
replace the usage of the deprecated `autovalidate`
parameter to the new `autovalidateMode` parameter.
If you want the same behavior as before you can use:
`autovalidateMode = AutovalidateMode.always`.
This makes your `Form` and `FormField` widgets auto
validate on first build and every time it changes.

要迁移到新的自动校验 API，
需要把已弃用的 `autovalidate` 参数替换为新的 `autovalidateMode` 参数。
如果希望保持原来的行为，可以这样写：
`autovalidateMode = AutovalidateMode.always`。
这样 `Form` 和 `FormField` widget 会在首次构建时自动校验，
并在之后每次变化时再次校验。

Code before migration:

迁移之前的代码：

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FormField(
      autovalidate: true,
      builder: (FormFieldState state) {
        return Container();
      },
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FormField(
      autovalidateMode: AutovalidateMode.always,
      builder: (FormFieldState state) {
        return Container();
      },
    );
  }
}
```

## Timeline

## 时间线

Landed in version: 1.21.0-5.0.pre<br>
合入版本：1.21.0-5.0.pre<br>
In stable release: 1.22

进入稳定版：1.22

## References

## 参考资料

API documentation:

API 文档：

* [`AutovalidateMode`]({{site.api}}/flutter/widgets/AutovalidateMode.html)

Relevant issues:

相关 issue：

* [Issue 56363]({{site.repo.flutter}}/issues/56363)
* [Issue 18885]({{site.repo.flutter}}/issues/18885)
* [Issue 15404]({{site.repo.flutter}}/issues/15404)
* [Issue 36154]({{site.repo.flutter}}/issues/36154)
* [Issue 48876]({{site.repo.flutter}}/issues/48876)

Relevant PRs:

相关 PR：

* [PR 56365: FormField should autovalidate only if its
  content was changed]({{site.repo.flutter}}/pull/56365)

  [PR 56365：仅当内容发生变化时 FormField 才自动校验]({{site.repo.flutter}}/pull/56365)

* [PR 59766: FormField should autovalidate only if its
  content was changed (fixed)]({{site.repo.flutter}}/pull/59766)

  [PR 59766：仅当内容发生变化时 FormField 才自动校验（修复）]({{site.repo.flutter}}/pull/59766)
