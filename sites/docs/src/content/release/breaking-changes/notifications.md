---
# title: Removing Notification.visitAncestor
title: 移除 Notification.visitAncestor
# description: >
#   Notifications only traverse ancestors that are notification listeners.
description: 通知只遍历作为通知监听器的祖先。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Notifications are more efficient by traversing only ancestors that
are notification listeners.

通知只遍历作为通知监听器的祖先，因此更高效。

## Context

## 背景

The notification API traversed the element tree in order to locate a
notification receiver. This led to some unfortunate performance
characteristics:

通知 API 会遍历 element 树来定位通知接收者。
这带来了一些不理想的性能特征：

  * If there was no receiver for a given notification type, the entire element
    tree above the notification dispatch point would be traversed and type
    checked.

    如果某种通知类型没有接收者，
    通知分发点之上的整棵 element 树都会被遍历并做类型检查。

  * For multiple notifications in a given frame (which is common for scroll
    views) we ended up traversing the element tree multiple times.

    同一帧内有多条通知时（滚动视图很常见），
    element 树会被反复遍历。

If there were multiple or nested scroll views on a given page, the situation
was worsened significantly - each scroll view would dispatch multiple
notifications per frame. For example, in the Dart/Flutter Devtools flamegraph
page, we found that about 30% of CPU time was spent dispatching notifications.

如果同一页面上有多个或嵌套的滚动视图，情况会严重得多：
每个滚动视图每帧都会分发多条通知。
例如，在 Dart/Flutter DevTools 火焰图页面上，
大约 30% 的 CPU 时间花在分发通知上。

In order to reduce the cost of dispatching notifications, we have changed
notification dispatch so that it only visits ancestors that are notification
listeners, reducing the number of elements visited per frame.

为降低分发通知的开销，通知分发现在只访问作为通知监听器的祖先，
从而减少每帧访问的 element 数量。

However, the old notification system exposed the fact that it traversed
each element as part of its API via `Notification.visitAncestor`. This
method is no longer supported as we no longer visit all ancestor elements.

不过，旧的通知系统通过 `Notification.visitAncestor`
把「会遍历每个 element」暴露成了 API 的一部分。
现在不再访问所有祖先 element，因此不再支持此方法。

## Description of change

## 变更说明

`Notification.visitAncestor` has been removed.
Any classes that extend `Notification` should
no longer override this method.

已移除 `Notification.visitAncestor`。
任何扩展 `Notification` 的类都不应再重写此方法。

**If you don't implement a custom Notification
that overrides `Notification.visitAncestor`,
then no changes are required.**

**如果你没有实现自定义 Notification，
也没有重写 `Notification.visitAncestor`，
则无需任何更改。**

## Migration guide

## 迁移指南

If you have a subclass of `Notification` that overrides
`Notification.visitAncestor`, then you must either delete the override or
opt-into old style notification dispatch with the following code.

如果你有重写 `Notification.visitAncestor` 的 `Notification` 子类，
则必须删除该重写，或用以下代码改用旧式通知分发。

Code before migration:

迁移之前的代码：

```dart
import 'package:flutter/widgets.dart';

class MyNotification extends Notification {

  @override
  bool visitAncestor(Element element) {
    print('Visiting $element');
    return super.visitAncestor(element);
  }
}

void methodThatSendsNotification(BuildContext? context) {
  MyNotification().dispatch(context);
}
```

Code after migration:

迁移之后的代码：

```dart
import 'package:flutter/widgets.dart';

class MyNotification extends Notification {

  bool visitAncestor(Element element) {
    print('Visiting $element');
    if (element is ProxyElement) {
      final Widget widget = element.widget;
      if (widget is NotificationListener<MyNotification>) {
        return widget.onNotification?.call(notification) ?? true;
      }
    }
    return true;
  }
}

void methodThatSendsNotification(BuildContext? context) {
  context?.visitAncestor(MyNotification().visitAncestor);
}
```

Note that this performs poorly compared to the
new default behavior of `Notification.dispatch`.

与 `Notification.dispatch` 的新默认行为相比，这种做法性能较差。

## Timeline

## 时间线

Landed in version: 2.12.0-4.1<br>
合入版本：2.12.0-4.1<br>
In stable release: 3.0.0

进入稳定版：3.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`Notification`]({{site.api}}/flutter/widgets/Notification-class.html)

Relevant issues:

相关 issue：

* [Issue 97849]({{site.repo.flutter}}/issues/97849)

Relevant PRs:

相关 PR：

* [improve Notification API performance]({{site.repo.flutter}}/pull/98451)

  [改进 Notification API 的性能]({{site.repo.flutter}}/pull/98451)
