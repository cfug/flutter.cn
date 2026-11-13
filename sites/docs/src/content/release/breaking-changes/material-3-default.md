---
# title: The ThemeData.useMaterial3 flag is true by default
title: '`ThemeData.useMaterial3` 标志默认为 true'
# description: >-
#    The ThemeData.useMaterial3 flag is now set to true by default.
description: '`ThemeData.useMaterial3` 标志现在默认为 true。'
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The Material library has been updated to match
the latest Material Design spec.
Changes include new components, new component themes,
and updated component visuals.
As of this release, [`ThemeData.useMaterial3`][] is set `true` by default.

Material 库已更新，以符合最新的 Material Design 规范。
变更包括新组件、新的组件主题，以及更新后的组件外观。
自本版本起，[`ThemeData.useMaterial3`][] 默认设为 `true`。

## Background

## 背景

Flutter's Material widgets now fully support Material 3 and,
as of Flutter 3.16, Material 3 is now the default style.

Flutter 的 Material widget 现已完整支持 Material 3。
自 Flutter 3.16 起，Material 3 成为默认样式。

The appearance of Material 3 components are primarily determined by
the values for [`ThemeData.colorScheme`][] and [`ThemeData.textTheme`][].
ColorScheme makes it easier to create dark and light schemes so that
your app is both aesthetically pleasing and
compliant with accessibility requirements.
To further customize the appearance of Material 3 components,
add component themes to your `ThemeData`,
such as [`ThemeData.segmentedButtonTheme`][] or [`ThemeData.snackBarTheme`][].

Material 3 组件的外观主要由
[`ThemeData.colorScheme`][] 和 [`ThemeData.textTheme`][] 的值决定。
ColorScheme 让深色和浅色方案更容易创建，
使应用既美观，又符合无障碍要求。
若要进一步自定义 Material 3 组件的外观，
请向 `ThemeData` 添加组件主题，
例如 [`ThemeData.segmentedButtonTheme`][] 或 [`ThemeData.snackBarTheme`][]。

Additionally, Material 3 improves motion by using easing and duration tokens.
This means that Material 2 curves have been renamed to include
the word "legacy" and will eventually be deprecated and removed.

此外，Material 3 使用缓动和时长 token 改进了动效。
因此 Material 2 的曲线已重命名，名称中加入了「legacy」，
最终会被弃用并移除。

Check out the [Material 3 gallery][] to test out
all the new components and compare them with Material 2.

请查看 [Material 3 示例库][Material 3 gallery]，
试用所有新组件，并与 Material 2 对比。

[`ThemeData.colorScheme`]: {{site.api}}/flutter/material/ThemeData/colorScheme.html
[`ThemeData.textTheme`]: {{site.api}}/flutter/material/ThemeData/textTheme.html
[`ThemeData.segmentedButtonTheme`]: {{site.api}}/flutter/material/ThemeData/segmentedButtonTheme.html
[`ThemeData.snackBarTheme`]: {{site.api}}/flutter/material/ThemeData/snackBarTheme.html

## Migration guide

## 迁移指南

Prior to the 3.16 release, the changes were "opt-in"
using the `useMaterial3` theme property on `ThemeData`.
As of this release, `useMaterial3` is `true` by default.
You can still opt out of the Material 3 version of the Material library by
specifying `useMaterial3: false` in your `MaterialApp` theme.

在 3.16 之前，这些变更需要通过 `ThemeData` 上的
`useMaterial3` 主题属性选择启用。
自本版本起，`useMaterial3` 默认为 `true`。
你仍可以在 `MaterialApp` 主题中指定 `useMaterial3: false`，
退出 Material 库的 Material 3 版本。

:::note
Support for Material 2 and configuring the `useMaterial3` property
will eventually be deprecated and removed.

对 Material 2 的支持以及对 `useMaterial3` 属性的配置
最终会被弃用并移除。
:::

Also, some of the widgets couldn't merely be updated,
but needed a whole new implementation.
For this reason, your UI might look a little strange when
you see it running with Material 3.
To fix this, manually migrate to the new widgets, such as [`NavigationBar`][].

另外，有些 widget 无法只做更新，而需要全新实现。
因此，在 Material 3 下运行时，界面看起来可能有些奇怪。
要解决这个问题，请手动迁移到新 widget，例如 [`NavigationBar`][]。

For more details, check out the [Material 3 umbrella issue][] on GitHub.

更多细节请查阅 GitHub 上的 [Material 3 总 issue][Material 3 umbrella issue]。

[`NavigationBar`]: {{site.api}}/flutter/material/NavigationBar-class.html

## Timeline

## 时间线

Landed in version: 3.13.0-4.0.pre<br>
合入版本：3.13.0-4.0.pre<br>
In stable release: 3.16

进入稳定版：3.16

## References

## 参考资料

Documentation:

文档：

* [Material Design for Flutter][]

  [Flutter 的 Material Design][Material Design for Flutter]

API documentation:

API 文档：

* [`ThemeData.useMaterial3`][]

Relevant issues:

相关 issue：

* [Material 3 umbrella issue][]

  [Material 3 总 issue][Material 3 umbrella issue]

* [Add support for M3 motion][]

  [添加对 M3 动效的支持][Add support for M3 motion]

Relevant PRs:

相关 PR：

* [Change the default for `ThemeData.useMaterial3` to true][]

  [将 `ThemeData.useMaterial3` 的默认值改为 true][Change the default for
  `ThemeData.useMaterial3` to true]

* [Updated `ThemeData.useMaterial3` API doc, default is true][]

  [更新 `ThemeData.useMaterial3` 的 API 文档，默认值为 true][Updated
  `ThemeData.useMaterial3` API doc, default is true]


[Material 3 gallery]: https://github.com/flutter/samples/tree/main/material_3_demo
[Material 3 umbrella issue]: {{site.repo.flutter}}/issues/91605
[Material Design for Flutter]: /ui/design/material
[`ThemeData.useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html
[Add support for M3 motion]: {{site.repo.flutter}}/issues/129942
[Change the default for `ThemeData.useMaterial3` to true]: {{site.repo.flutter}}/pull/129724
[Updated `ThemeData.useMaterial3` API doc, default is true]: {{site.repo.flutter}}/pull/130764
