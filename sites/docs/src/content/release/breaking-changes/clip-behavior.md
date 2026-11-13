---
# title: Clip Behavior
title: 裁剪行为
# description: >
#   Flutter unifies clipBehavior and defaults to not clip in most cases.
description: >
  Flutter 统一了 clipBehavior，并且在大多数情况下默认不裁剪。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Flutter now defaults to _not_ clip except for a few specialized widgets
(such as `ClipRect`). To override the no-clip default,
explicitly set `clipBehavior` in widgets constructions.

除少数专用 widget（例如 `ClipRect`）外，
Flutter 现在默认 **不** 裁剪。
要覆盖不裁剪的默认行为，
请在构造 widget 时显式设置 `clipBehavior`。

## Context

## 上下文

Flutter used to be slow because of clips. For example,
the Flutter gallery app benchmark had an average frame
rasterization time of about 35ms in May 2018,
where the budget for smooth 60fps rendering is 16ms.
By removing unnecessary clips and their related operations,
we saw an almost 2x speedup from 35ms/frame to 17.5ms/frame.

Flutter 过去会因为裁剪而变慢。例如，
在 2018 年 5 月，Flutter gallery 应用基准测试的
平均帧光栅化时间约为 35 ms，
而流畅 60 fps 渲染的预算是 16 ms。
去掉不必要的裁剪及其相关操作后，
我们看到接近 2 倍的提速，从 35 ms/帧降到 17.5 ms/帧。

{% comment %}
The following two images are not visible.
![](https://lh5.googleusercontent.com/Pn8FxuW2W3Cgvw9kIUvLLenrwXti7WRm_zPif3VJILa325d1Njm8aP47DXfK1r2Du-FwLKhI9umw5nMG6eNqn5fLnQBIt6VIPZ7Q2ETiCuXgQPD1cUYOeA-2Ph_DpvL27fK7m_Af)

Here's a comparison of transition with and without clips.

![](https://lh5.googleusercontent.com/gSFKigrEoekji0juxTVjj29PlIizjuxJsetHsIegLt85zCHknRIUOeICjMdEBjBhPZDZXcEzFh1WCOrdmZa9KZ5vghgS7Uo9IDAKyBtEJ7h3tKfIHXf6A4vxrHfj1a_0kuT6f4r2)
{% endcomment %}

The biggest cost associated with clipping at that time is that Flutter
used to add a `saveLayer` call after each clip (unless it was a simple
axis-aligned rectangle clip) to avoid the bleeding edge artifacts
as described in [Issue 18057][]. Such behaviors were universal to
material apps through widgets like `Card`, `Chip`, `Button`, and so on,
which resulted in `PhysicalShape` and `PhysicalModel` clipping their content.

当时与裁剪相关的最大开销在于，Flutter 会在每次裁剪之后
添加一次 `saveLayer` 调用（除非是简单的轴对齐矩形裁剪），
以避免 [问题 18057][Issue 18057] 中描述的边缘渗色伪影。
这类行为通过 `Card`、`Chip`、`Button` 等 widget
普遍存在于 Material 应用中，
导致 `PhysicalShape` 和 `PhysicalModel` 会裁剪其内容。

A `saveLayer` call is especially expensive in older devices because
it creates an offscreen render target, and a render target switch
can sometimes cost about 1ms.

`saveLayer` 调用在较旧的设备上尤其昂贵，
因为它会创建一个离屏渲染目标，
而一次渲染目标切换有时大约要花费 1 ms。

Even without `saveLayer` call, a clip is still expensive
because it applies to all subsequent draws until it's restored.
Therefore a single clip may slow down the performance on
hundreds of draw operations.

即使没有 `saveLayer` 调用，裁剪仍然昂贵，
因为它会作用于之后的所有绘制，直到被恢复。
因此单次裁剪就可能拖慢数百次绘制操作的性能。

In addition to performance issues, Flutter also suffered from
some correctness issues as the clip was not managed and implemented
in a single place. In several places, `saveLayer` was inserted
in the wrong place and it therefore only increased the performance
cost without fixing any bleeding edge artifacts.

除了性能问题，Flutter 还有一些正确性问题，
因为裁剪没有在单一位置统一管理和实现。
有几处把 `saveLayer` 插在了错误的位置，
结果只增加了性能开销，并没有修复任何边缘渗色伪影。

So, we unified the `clipBehavior` control and its implementation in
this breaking change. The default `clipBehavior` is `Clip.none`
for most widgets to save performance, except the following:

因此，在这次破坏性改动中，我们统一了 `clipBehavior` 的控制与实现。
为了节省性能，大多数 widget 的默认 `clipBehavior` 是 `Clip.none`，
以下除外：

* `ClipPath` defaults to `Clip.antiAlias`

  `ClipPath` 默认为 `Clip.antiAlias`

* `ClipRRect` defaults to `Clip.antiAlias`

  `ClipRRect` 默认为 `Clip.antiAlias`

* `ClipRect` defaults to `Clip.hardEdge`

  `ClipRect` 默认为 `Clip.hardEdge`

* `Stack` defaults to `Clip.hardEdge`

  `Stack` 默认为 `Clip.hardEdge`

* `EditableText` defaults to `Clip.hardEdge`

  `EditableText` 默认为 `Clip.hardEdge`

* `ListWheelScrollView` defaults to `Clip.hardEdge`

  `ListWheelScrollView` 默认为 `Clip.hardEdge`

* `SingleChildScrollView` defaults to `Clip.hardEdge`

  `SingleChildScrollView` 默认为 `Clip.hardEdge`

* `NestedScrollView` defaults to `Clip.hardEdge`

  `NestedScrollView` 默认为 `Clip.hardEdge`

* `ShrinkWrappingViewport` defaults to `Clip.hardEdge`

  `ShrinkWrappingViewport` 默认为 `Clip.hardEdge`

## Migration guide

## 迁移指南

You have 4 choices for migrating your code:

迁移代码时，你有 4 种选择：

1. Leave your code as is if your content does not need
   to be clipped (for example, none of the widgets' children
   expand outside their parent's boundary).
   This will likely have a positive impact on your app's
   overall performance.

   如果内容不需要裁剪，可以保持代码不变
   （例如，所有子 widget 都没有超出父级边界）。
   这通常会对应用的整体性能有积极影响。

2. Add `clipBehavior: Clip.hardEdge` if you need clipping,
   and clipping without anti-alias is good enough for your
   (and your clients') eyes. This is the common case
   when you clip rectangles or shapes with very small curved areas
   (such as the corners of rounded rectangles).

   如果需要裁剪，并且不做抗锯齿的裁剪对你
   （以及你的用户）而言已经足够，请添加 `clipBehavior: Clip.hardEdge`。
   裁剪矩形或曲线区域很小的形状时（例如圆角矩形的角），这是常见情况。

3. Add `clipBehavior: Clip.antiAlias` if you need
   anti-aliased clipping. This gives you smoother edges
   at a slightly higher cost. This is the common case when
   dealing with circles and arcs.

   如果需要抗锯齿裁剪，请添加 `clipBehavior: Clip.antiAlias`。
   这会以略高的开销换来更平滑的边缘。
   处理圆和弧时，这是常见情况。

4. Add `clip.antiAliasWithSaveLayer` if you want the exact
   same behavior as before (May 2018). Be aware that it's
   very costly in performance. This is likely to be only
   rarely needed. One case where you might need this is if
   you have an image overlaid on a very different background color.
   In these cases, consider whether you can avoid overlapping
   multiple colors in one spot (for example, by having the
   background color only present where the image is absent).

   如果希望得到与之前（2018 年 5 月）完全相同的行为，
   请添加 `clip.antiAliasWithSaveLayer`。
   请注意，它的性能开销非常高，通常很少需要。
   一种可能需要它的情况是，图片叠在差异很大的背景色上。
   这时请考虑能否避免在同一位置重叠多种颜色
   （例如，只在没有图片的地方保留背景色）。

For the `Stack` widget specifically, if you previously used
`overflow: Overflow.visible`, replace it with `clipBehavior: Clip.none`.

特别是对于 `Stack` widget，如果此前使用了 `overflow: Overflow.visible`，
请替换为 `clipBehavior: Clip.none`。

For the `ListWheelViewport` widget, if you previously specified
`clipToSize`, replace it with the corresponding `clipBehavior`:
`Clip.none` for `clipToSize = false` and
`Clip.hardEdge` for `clipToSize = true`.

对于 `ListWheelViewport` widget，如果此前指定了 `clipToSize`，
请替换为对应的 `clipBehavior`：
`clipToSize = false` 对应 `Clip.none`，
`clipToSize = true` 对应 `Clip.hardEdge`。

Code before migration:

迁移之前的代码：

```dart
    await tester.pumpWidget(
      Directionality(
        textDirection: TextDirection.ltr,
        child: Center(
          child: Stack(
            overflow: Overflow.visible,
            children: const <Widget>[
              SizedBox(
                width: 100,
                height: 100,
              ),
            ],
          ),
        ),
      ),
    );
```

Code after migration:

迁移之后的代码：

```dart
    await tester.pumpWidget(
      Directionality(
        textDirection: TextDirection.ltr,
        child: Center(
          child: Stack(
            clipBehavior: Clip.none,
            children: const <Widget>[
              SizedBox(
                width: 100.0,
                height: 100.0,
              ),
            ],
          ),
        ),
      ),
    );
```

## Timeline

## 时间线

Landed in version: _various_<br>
合入版本：多个版本<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`Clip`][]

Relevant issues:

相关 issue：

* [Issue 13736][]
* [Issue 18057][]
* [Issue 21830][]

Relevant PRs:

相关 PR：

* [PR 5420][]: Remove unnecessary saveLayer

  [PR 5420][PR 5420]：移除不必要的 saveLayer

* [PR 18576][]: Add Clip enum to Material and related widgets

  [PR 18576][PR 18576]：为 Material 及相关 widget 添加 Clip 枚举

* [PR 18616][]: Remove saveLayer after clip from dart

  [PR 18616][PR 18616]：从 Dart 中移除裁剪之后的 saveLayer

* [PR 5647][]: Add ClipMode to ClipPath/ClipRRect and PhysicalShape layers

  [PR 5647][PR 5647]：为 ClipPath/ClipRRect 和 PhysicalShape 图层添加 ClipMode

* [PR 5670][]: Add anti-alias switch to canvas clip calls

  [PR 5670][PR 5670]：为 canvas 裁剪调用添加抗锯齿开关

* [PR 5853][]: Rename clip mode to clip behavior

  [PR 5853][PR 5853]：将 clip mode 重命名为 clip behavior

* [PR 5868][]: Rename clip to clipBehavior in compositing.dart

  [PR 5868][PR 5868]：在 compositing.dart 中将 clip 重命名为 clipBehavior

* [PR 5973][]: Call drawPaint instead of drawPath if there's clip

  [PR 5973][PR 5973]：如果存在裁剪，则调用 drawPaint 而不是 drawPath

* [PR 5952][]: Call drawPath without clip if possible

  [PR 5952][PR 5952]：尽可能在不裁剪的情况下调用 drawPath

* [PR 20205][]: Set default clipBehavior to Clip.none and update tests

  [PR 20205][PR 20205]：将默认 clipBehavior 设为 Clip.none 并更新测试

* [PR 20538][]: Expose clipBehavior to more Material Buttons

  [PR 20538][PR 20538]：向更多 Material 按钮暴露 clipBehavior

* [PR 20751][]: Add customBorder to InkWell so it can clip ShapeBorder

  [PR 20751][PR 20751]：为 InkWell 添加 customBorder，以便裁剪 ShapeBorder

* [PR 20752][]: Set the default clip to Clip.none again

  [PR 20752][PR 20752]：再次将默认裁剪设为 Clip.none

* [PR 21012][]: Add default-no-clip tests to more buttons

  [PR 21012][PR 21012]：为更多按钮添加默认不裁剪的测试

* [PR 21703][]: Default clipBehavior of ClipRect to hardEdge

  [PR 21703][PR 21703]：将 ClipRect 的默认 clipBehavior 设为 hardEdge

* [PR 21826][]: Missing default hardEdge clip for ClipRectLayer

  [PR 21826][PR 21826]：为 ClipRectLayer 补上默认的 hardEdge 裁剪

[PR 5420]:  {{site.repo.engine}}/pull/5420
[PR 5647]:  {{site.repo.engine}}/pull/5647
[PR 5670]:  {{site.repo.engine}}/pull/5670
[PR 5853]:  {{site.repo.engine}}/pull/5853
[PR 5868]:  {{site.repo.engine}}/pull/5868
[PR 5952]:  {{site.repo.engine}}/pull/5952
[PR 5973]:  {{site.repo.engine}}/pull/5937
[PR 18576]: {{site.repo.flutter}}/pull/18576
[PR 18616]: {{site.repo.flutter}}/pull/18616
[PR 20205]: {{site.repo.flutter}}/pull/20205
[PR 20538]: {{site.repo.flutter}}/pull/20538
[PR 20751]: {{site.repo.flutter}}/pull/20751
[PR 20752]: {{site.repo.flutter}}/pull/20752
[PR 21012]: {{site.repo.flutter}}/pull/21012
[PR 21703]: {{site.repo.flutter}}/pull/21703
[PR 21826]: {{site.repo.flutter}}/pull/21826

[`Clip`]: {{site.api}}/flutter/dart-ui/Clip.html
[Issue 13736]: {{site.repo.flutter}}/issues/13736
[Issue 18057]: {{site.repo.flutter}}/issues/18057
[Issue 21830]: {{site.repo.flutter}}/issues/21830
