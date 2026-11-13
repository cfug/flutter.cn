---
# title: Paint.enableDithering is now true by default.
title: '`Paint.enableDithering` 现在默认为 true'
# description: >-
#   Deprecation of user-configurable `Paint.enableDithering`.
description: 弃用可由用户配置的 `Paint.enableDithering`。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

[`Paint.enableDithering`][] is now `true` by default (previously, `false`),
and is _deprecated_ pending removal - Flutter no longer supports
user-configurable dithering settings.

[`Paint.enableDithering`][] 现在默认为 `true`（以前为 `false`），
并已 **弃用**、等待移除。
Flutter 不再支持可由用户配置的抖动设置。

In addition, the dithering documentation states support is _only_ for gradients.

此外，抖动文档说明支持范围 **仅限** 渐变。

## Background

## 背景

[`Paint.enableDithering`][] was added as a global option in [PR 13868][] as
a response to [Issue 44134][], which reported that gradients in Flutter had
visible banding artifacts:

[`Paint.enableDithering`][] 在 [PR 13868][] 中作为全局选项加入，
以回应 [Issue 44134][]。该 issue 报告 Flutter 中的渐变
有可见的色带瑕疵：

> Gradients currently have a lot of color banding on all devices, and it looks
> very weird when using the pulse animation too. A solution is to make the
> gradients opaque, and to use dithered gradients with Skia. Dithered gradients
> aren't currently exposed, so adding a dither parameter to dart:ui's Paint
> class would be nice. We'd be able to manually draw our gradients with a
> CustomPainter.

> 目前在所有设备上，渐变都有明显的色带，
> 配合 pulse 动画时看起来也很奇怪。
> 一种办法是让渐变不透明，并使用 Skia 的抖动渐变。
> 抖动渐变目前没有暴露出来，
> 因此最好给 dart:ui 的 Paint 类加一个 dither 参数。
> 这样就能用 CustomPainter 手动绘制渐变。

![Example of banding](https://user-images.githubusercontent.com/30870216/210907719-4f4a1a8d-e28a-4d39-9e99-3635a26a0c74.png)

[Issue 118073][] reported that gradients in our new [Impeller][]
backend displayed visible banding artifacts in some gradients.
It was later discovered that Impeller didn't support the (rarely used)
[`Paint.enableDithering`][] property.

[Issue 118073][] 报告新的 [Impeller][] 后端中，
部分渐变出现了可见的色带瑕疵。
后来发现 Impeller 不支持（很少使用的）
[`Paint.enableDithering`][] 属性。

After adding dithering support to Impeller ([PR 44181][], [PR 44331][],
[PR 44522][]), and reviewing the performance impact of dithering (negligible),
the following observations were made:

在为 Impeller 加入抖动支持（[PR 44181][]、[PR 44331][]、
[PR 44522][]）并评估抖动的性能影响（可以忽略）之后，
得出以下观察：

1. Consensus that gradients look good by default: [Issue 112498][].

   共识是渐变在默认情况下看起来更好：[Issue 112498][]。

1. Having a global option was intended to be deprecated: [PR 13868][].

   全局选项原本就计划弃用：[PR 13868][]。

This resulted in the following decisions:

由此做出以下决定：

1. Make dithering enabled by default.

   默认启用抖动。

1. Deprecate the global option.

   弃用该全局选项。

1. Remove the global option in a future release.

   在未来的版本中移除该全局选项。

As part of that process, the ability for dithering to affect anything
other than gradients was removed in [PR 44730][] and [PR 44912][].
That was done to ease the process of migrating, because
Impeller will never support dithering for anything but gradients.

在此过程中，[PR 44730][] 和 [PR 44912][] 移除了抖动对渐变以外内容的影响。
这样做是为了降低迁移难度，
因为 Impeller 永远只会为渐变支持抖动。

## Migration guide

## 迁移指南

Most users and libraries will not need to make any changes.

大多数用户和库无需做任何更改。

For users that maintain golden tests, you might
need to update your golden images to reflect the new default.
For example, if you use [`matchesGoldenFile`][] to
test a widget that contains a gradient:

如果你维护 golden 测试，可能需要更新 golden 图片以反映新的默认值。
例如，如果你用 [`matchesGoldenFile`][] 测试包含渐变的 widget：

```console
$ flutter test --update-goldens
```

While this is not expected to be a common case, you can
disable dithering temporarily by setting the `enableDithering` property in
your `main()` method (either in an app or test):

虽然预计并不常见，你仍可以在 `main()` 方法中
（应用或测试均可）设置 `enableDithering` 属性，临时关闭抖动：

```dart diff
  void main() {
+   // TODO: Remove this after XYZ.
+   Paint.enableDithering = false;

    runApp(MyApp());
  }
```

As the plan is to _permanently_ remove the `enableDithering` property, please
provide feedback in [Issue 112498][] if you have a use case that requires
disabling dithering (due to performance, crashes).

计划会 **永久** 移除 `enableDithering` 属性。
如果你有必须关闭抖动的用例（例如性能或崩溃），
请在 [Issue 112498][] 中反馈。

If you must draw gradients without dithering, you can write a custom fragment
shader. Describing how to write shaders is outside the scope of this migration
guide. For more information, refer to
[Writing and using fragment shaders](/ui/design/graphics/fragment-shaders).

如果必须绘制不带抖动的渐变，可以编写自定义片段着色器。
如何编写着色器超出本迁移指南的范围。
更多信息请参阅
[编写并使用片段着色器](/ui/design/graphics/fragment-shaders)。

**NOTE**: Flutter web does not support dithering: [Issue 134250][].

**注意**：Flutter web 不支持抖动：[Issue 134250][]。

## Timeline

## 时间线

Landed in version: 3.14.0-0.1.pre<br>
合入版本：3.14.0-0.1.pre<br>
In stable release: 3.16

进入稳定版：3.16

## References

## 参考资料

API documentation:

API 文档：

- [`Paint.enableDithering`][]
- [`matchesGoldenFile`]

Relevant issues:

相关 issue：

- [Issue 44134][]
- [Issue 112498][]
- [Issue 118073][]

Relevant PRs:

相关 PR：

- [PR 13868][]
- [PR 44181][]
- [PR 44331][]
- [PR 44522][]
- [PR 44730][]
- [PR 44912][]

[`Paint.enableDithering`]: {{site.api}}/flutter/dart-ui/Paint/enableDithering.html
[`matchesGoldenFile`]: {{site.api}}/flutter_test/matchesGoldenFile.html
[Impeller]: /perf/impeller
[PR 13868]: {{site.repo.engine}}/pull/13868
[PR 44181]: {{site.repo.engine}}/pull/44181
[PR 44331]: {{site.repo.engine}}/pull/44331
[PR 44522]: {{site.repo.engine}}/pull/44522
[PR 44730]: {{site.repo.engine}}/pull/44730
[PR 44912]: {{site.repo.engine}}/pull/44912
[Issue 44134]: {{site.repo.flutter}}/issues/44134
[Issue 112498]: {{site.repo.flutter}}/issues/112498
[Issue 118073]: {{site.repo.flutter}}/issues/118073
[Issue 134250]: {{site.repo.flutter}}/issues/134250
