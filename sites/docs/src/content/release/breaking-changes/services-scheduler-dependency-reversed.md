---
# title: Reversing the dependency between the scheduler and services layer
title: 反转 scheduler 与 services layer 的依赖关系
# description: The services layer now depends on the scheduler layer.
description: services layer 现在依赖于 scheduler layer。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The services layer now depends on the scheduler layer.
Previously, the opposite was true. This may affect you
if you have defined custom bindings overriding
Flutter's `SchedulerBinding` or `ServicesBinding`.

services layer 现在依赖于 scheduler layer。
此前则相反。
如果你定义了自定义 binding，
并覆盖 Flutter 的 `SchedulerBinding` 或 `ServicesBinding`，
这次改动可能会影响到你。

## Context

## 上下文

Prior to this change, the scheduler layer was dependent
on the services layer. This change reverses the dependency
chain and allows the services layer to make use of the
scheduling primitives in the scheduler layer. For example,
services in the services layer can now schedule tasks by using
`SchedulerBinding.scheduleTask`.

在此改动之前，scheduler layer 依赖于 services layer。
这次改动反转了依赖链，
让 services layer 可以使用 scheduler layer 中的调度原语。
例如，services layer 中的服务现在可以通过
`SchedulerBinding.scheduleTask` 来调度任务。

## Description of change

## 变更说明

The change only affects users who are defining their own
custom bindings based on Flutter's `SchedulerBinding`
and `ServicesBinding`.

此改动只影响基于 Flutter 的 `SchedulerBinding`
和 `ServicesBinding` 定义自定义 binding 的用户。

## Migration guide

## 迁移指南

Prior to this change, the `ServiceBinding` had to be defined before the
`SchedulerBinding`. With this change, it is the other way around:

在此改动之前，必须先定义 `ServiceBinding`，再定义 `SchedulerBinding`。
现在顺序相反：

Code before migration:

迁移之前的代码：

```dart
class FooBinding extends BindingBase with ServicesBinding, SchedulerBinding {
 // ...
}
```

Code after migration:

迁移之后的代码：

```dart
class FooBinding extends BindingBase with SchedulerBinding, ServicesBinding {
 // ...
}
```

## Timeline

## 时间线

Landed in version: 1.18.0<br>
In stable release: 1.20

合入版本：1.18.0<br>
进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`ServicesBinding`][]
* [`SchedulerBinding`][]

Relevant PRs:

相关 PR：

* [Reverse dependency between services and scheduler][]

  [反转 services 与 scheduler
  之间的依赖][Reverse dependency between services and scheduler]

* [Revert bindings dependency workaround][]

  [还原 binding 依赖关系的权宜改动][Revert bindings dependency workaround]

[Reverse dependency between services and scheduler]: {{site.repo.flutter}}/pull/54212
[Revert bindings dependency workaround]: {{site.repo.flutter}}/pull/54286
[`SchedulerBinding`]: {{site.api}}/flutter/scheduler/SchedulerBinding-mixin.html
[`ServicesBinding`]: {{site.api}}/flutter/scheduler/ServicesBinding-mixin.html
