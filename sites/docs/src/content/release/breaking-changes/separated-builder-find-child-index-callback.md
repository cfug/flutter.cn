---
# title: Deprecate `findChildIndexCallback` in favor of `findItemIndexCallback` in `ListView` and `SliverList` separated constructors
title: ListView 与 SliverList 的 separated 构造函数改用 findItemIndexCallback
# description: >-
#   The findChildIndexCallback parameter in ListView.separated and
#   SliverList.separated have been deprecated in favor of findItemIndexCallback.
description: >-
  ListView.separated 和 SliverList.separated 中的
  findChildIndexCallback 参数已废弃，改用 findItemIndexCallback。
ai-translated: true
---

## Summary

## 概要

The `findChildIndexCallback` parameter in `ListView.separated` and
`SliverList.separated` constructors have been deprecated in favor of
`findItemIndexCallback`. The new callback returns item indices directly,
eliminating the need for manual index calculations to account for separators.

`ListView.separated` 和 `SliverList.separated` 构造函数中的
`findChildIndexCallback` 参数已废弃，改用 `findItemIndexCallback`。
新回调直接返回项索引，
不再需要为了分隔符而手动计算索引。

## Background

## 背景

In `ListView.separated` and `SliverList.separated` constructors,
the `findChildIndexCallback` was used to locate widgets by their key.
However, this callback returned child indices, which include both items
and separators in the internal widget tree. This meant that developers had to
multiply item indices by 2 to get the correct child index, creating
confusion and error-prone code.

在 `ListView.separated` 和 `SliverList.separated` 构造函数中，
`findChildIndexCallback` 用来按 key 定位 widget。
但是，这个回调返回的是子组件索引，
内部 widget 树里既包含项，也包含分隔符。
因此开发者必须把项索引乘以 2 才能得到正确的子组件索引，
代码容易混淆，也容易出错。

The new `findItemIndexCallback` parameter simplifies this by working
directly with item indices, which do not include separators.
This makes the API more intuitive and reduces the likelihood of
index calculation errors.

新的 `findItemIndexCallback` 参数直接使用不包含分隔符的项索引，
从而简化了这一过程。
这让 API 更直观，也降低了索引计算出错的可能。

If you use the deprecated `findChildIndexCallback` parameter,
you will see a deprecation warning:

如果使用已废弃的 `findChildIndexCallback` 参数，会看到废弃警告：

```plaintext
'findChildIndexCallback' is deprecated and shouldn't be used.
Use findItemIndexCallback instead.
findChildIndexCallback returns child indices (which include separators),
while findItemIndexCallback returns item indices (which do not).
If you were multiplying results by 2 to account for separators,
you can remove that workaround when migrating to findItemIndexCallback.
This feature was deprecated after v3.37.0-1.0.pre.
```

Additionally, if you try to provide both parameters, you will encounter
an assertion error:

此外，如果试图同时提供这两个参数，会遇到断言错误：

```plaintext
Cannot provide both findItemIndexCallback and findChildIndexCallback.
Use findItemIndexCallback as findChildIndexCallback is deprecated.
```

## Migration guide

## 迁移指南

To migrate from `findChildIndexCallback` to `findItemIndexCallback`,
replace the parameter name and remove any index multiplications
that were used to account for separators.

要从 `findChildIndexCallback` 迁移到 `findItemIndexCallback`，
请替换参数名，并去掉为了分隔符而做的索引乘法。

Code before migration:

迁移之前的代码：

```dart
ListView.separated(
  itemCount: items.length,
  findChildIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    // Multiply by 2 to account for separators.
    return itemIndex == -1 ? null : itemIndex * 2;
  },
  itemBuilder: (BuildContext context, int index) {
    return ListTile(
      key: ValueKey<String>(items[index]),
      title: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

Code after migration:

迁移之后的代码：

```dart
ListView.separated(
  itemCount: items.length,
  findItemIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    // Return item index directly - no need to multiply by 2.
    return itemIndex == -1 ? null : itemIndex;
  },
  itemBuilder: (BuildContext context, int index) {
    return ListTile(
      key: ValueKey<String>(items[index]),
      title: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

The same migration applies to `SliverList.separated`:

同样的迁移也适用于 `SliverList.separated`：

Code before migration:

迁移之前的代码：

```dart
SliverList.separated(
  itemCount: items.length,
  findChildIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    return itemIndex == -1 ? null : itemIndex * 2;
  },
  itemBuilder: (BuildContext context, int index) {
    return Container(
      key: ValueKey<String>(items[index]),
      child: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

Code after migration:

迁移之后的代码：

```dart
SliverList.separated(
  itemCount: items.length,
  findItemIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    return itemIndex == -1 ? null : itemIndex;
  },
  itemBuilder: (BuildContext context, int index) {
    return Container(
      key: ValueKey<String>(items[index]),
      child: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

## Timeline

## 时间线

Landed in version: 3.38.0-1.0.pre<br>
合入版本：3.38.0-1.0.pre<br>
In stable release: 3.41

进入稳定版：3.41

## References

## 参考资料

API documentation:

API 文档：

* [`ListView.separated`][]
* [`SliverList.separated`][]

Relevant PRs:

相关 PR：

* [Deprecate findChildIndexCallback for separated constructors][]

  [为 separated 构造函数废弃 findChildIndexCallback][Deprecate findChildIndexCallback for separated constructors]

[`ListView.separated`]: {{site.api}}/flutter/widgets/ListView/ListView.separated.html
[`SliverList.separated`]: {{site.api}}/flutter/widgets/SliverList/SliverList.separated.html
[Deprecate findChildIndexCallback for separated constructors]: {{site.repo.flutter}}/pull/174491
