---
# title: The forgetChild() method must call super
title: forgetChild() 方法必须调用 super
# description: >
#     Any element subclasses that override forgetChild are required to call super.
description: 重写 forgetChild 的 Element 子类都必须调用 super。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A recent global key duplication detection refactor now requires
`Element` subclasses that override the `forgetChild()` to call `super()`.

最近对全局 key 重复检测的重构要求：
重写 `forgetChild()` 的 `Element` 子类必须调用 `super()`。

## Context

## 背景

When encountering a global key duplication that will be
cleaned up by an element rebuild later,
we must not report global key duplication.
Our previous implementation threw an error as soon as
duplication was detected, and didn't wait for the rebuild if the
element with the duplicated global key would have rebuilt.

如果全局 key 重复会在稍后的 element 重建中被清理，
就不应当报告这次重复。
先前的实现一检测到重复就抛出错误，
即使持有重复全局 key 的 element 本来会重建，也不会等待这次重建。

The new implementation keeps track of all global
key duplications during a build cycle, and only verifies global
key duplication at the end of the that cycle instead of
throwing an error immediately. As part of the refactoring,
we implemented a mechanism to remove previous global key
duplication in `forgetChild` if the rebuild had happened.
This, however, requires all `Element` subclasses that
override `forgetChild` to call the `super` method.

新实现会在一个构建周期内记录所有全局 key 重复，
并在该周期结束时才校验，而不是立刻抛出错误。
作为重构的一部分，如果已经发生重建，
会在 `forgetChild` 中移除先前的全局 key 重复记录。
因此，所有重写 `forgetChild` 的 `Element` 子类
都必须调用 `super` 方法。

## Description of change

## 变更说明

The `forgetChild` of abstract class `Element` has a base
implementation to remove global key reservation,
and it is enforced by the `@mustCallSuper` meta tag.
All subclasses that override the method have to call `super`;
otherwise, the analyzer shows a linting error and
global key duplication detection might throw an unexpected error.

抽象类 `Element` 的 `forgetChild` 有一份基类实现，
用于移除全局 key 的预留，
并由 `@mustCallSuper` 元标记强制执行。
所有重写该方法的子类都必须调用 `super`；
否则分析器会给出 lint 错误，
全局 key 重复检测也可能抛出意外错误。

## Migration guide

## 迁移指南

In the following example, an app's `Element`
subclass overrides the `forgetChild` method.

下面的示例中，应用的 `Element` 子类重写了 `forgetChild` 方法。

Code before migration:

迁移前的代码：

```dart
class CustomElement extends Element {

    @override
    void forgetChild(Element child) {
        ...
    }
}
```

Code after migration:

迁移后的代码：

```dart
class CustomElement extends Element {

    @override
    void forgetChild(Element child) {
        ...
        super.forgetChild(child);
    }
}
```

## Timeline

## 时间线

Landed in version: 1.16.3<br>
In stable release: 1.17

合入版本：1.16.3<br>
进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`Element`][]
* [`forgetChild()`][]

Relevant issues:

相关 issue：

* [Issue 43780][]

Relevant PRs:

相关 PR：

* [PR 43790: Fix global key error][]

  [PR 43790：修复全局 key 错误][PR 43790: Fix global key error]


[`Element`]: {{site.api}}/flutter/widgets/Element-class.html
[`forgetChild()`]: {{site.api}}/flutter/widgets/Element/forgetChild.html
[Issue 43780]: {{site.repo.flutter}}/issues/43780
[PR 43790: Fix global key error]: {{site.repo.flutter}}/pull/46183
