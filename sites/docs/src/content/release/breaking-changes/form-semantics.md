---
# title: The Form widget no longer supports being a sliver.
title: Form widget 不再支持直接作为 sliver
# description: >-
#   The Form widget now includes a semantics widget,
#   which prevents it from being used directly as a sliver.
description: Form widget 现在包含语义 widget，因此不能再直接当作 sliver 使用。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Previously, the Form widget essentially acted as a direct wrapper
around its child. This design allowed a Form containing a sliver child
(e.g., Form(child: other sliver)) to be treated as a sliver itself
 within a CustomScrollView or similar scrollable parent.

以前，Form widget 基本上就是子组件的直接包装。
这种设计让包含 sliver 子组件的 Form
（例如 Form(child: other sliver)）本身也能被当作 sliver，
放进 CustomScrollView 或类似的可滚动父级中。

However, This PR introduced a new semantics widget
within the Form widget's internal structure. This change alters
its rendering behavior, meaning Form can no longer directly
function as a sliver.

不过，该 PR 在 Form widget 的内部结构中引入了新的语义 widget。
这一改动改变了它的渲染行为，Form 不能再直接充当 sliver。

## Context

## 上下文

This change is part of an ongoing effort to improve the
accessibility and semantic understanding of Flutter widgets.
By embedding a semantics widget directly within Form, the framework
can provide better information to accessibility services.

这次改动是持续改进 Flutter widget 无障碍与语义理解的一部分。
把语义 widget 直接放进 Form 后，框架可以向无障碍服务提供更准确的信息。

## Description of change

## 变更说明

The core change is the integration of a semantics widget
into the Form widget's build method.

核心改动是把语义 widget 集成进 Form widget 的 build 方法。

## Migration guide

## 迁移指南

If your app does not currently use the Form widget directly
as a sliver within a scrollable list
(e.g., as a direct child of CustomScrollView's slivers property),
then no changes are required.

如果你的应用目前没有把 Form widget 直接当作可滚动列表中的 sliver
（例如作为 CustomScrollView 的 slivers 属性的直接子项），
则无需修改。

If your app use Form as a sliver, you will need to wrap the Form
widget within a SliverToBoxAdapter. SliverToBoxAdapter is a
sliver that contains a single box widget, converting a regular
widget into a sliver that can be placed in a CustomScrollView.

如果你的应用把 Form 当作 sliver 使用，
需要用 SliverToBoxAdapter 包住 Form widget。
SliverToBoxAdapter 是只包含一个 box widget 的 sliver，
它把普通 widget 转换成可以放进 CustomScrollView 的 sliver。

Code before migration:

迁移之前的代码：

```dart
sliver: Form(
    key: controller.formKey,
    child: SomeWidgetWithFormFields(),
)
```

Code after migration:

迁移之后的代码：

```dart
sliver: SliverToBoxAdapter(
    child: Form(
        key: controller.formKey,
        child: SomeWidgetWithFormFields(),
    )
)
```

## Timeline

## 时间线

Landed in version: 3.35.0-pre<br>
合入版本：3.35.0-pre<br>
In stable release: 3.35

进入稳定版：3.35

## References

## 参考资料

API documentation:

API 文档：

* [`Form`]({{site.api}}/flutter/widgets/Form-class.html)

  [`Form`]({{site.api}}/flutter/widgets/Form-class.html)

Relevant issues:

相关 issue：

* [Issue 161628]({{site.repo.flutter}}/issues/161628)

  [问题 161628]({{site.repo.flutter}}/issues/161628)

Relevant PRs:

相关 PR：

* [PR 170709: Add semantics role for form]({{site.repo.flutter}}/pull/170709)

  [PR 170709：为 form 添加语义角色]({{site.repo.flutter}}/pull/170709)
