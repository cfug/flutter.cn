---
# title: Impeller anti-aliasing
title: Impeller 抗锯齿
# description: How does Impeller perform anti-aliasing?
description: Impeller 如何进行抗锯齿？
ai-translated: true
---

Aliasing is the visual artifacts that result from drawing geometry to a grid of
pixels (rasterization). The artifacts show up as jagged or rough edges on
shapes. Impeller employs a couple techniques to smooth out the mapping to raster
graphics (anti-aliasing).

走样是把几何图形绘制到像素网格（光栅化）时产生的视觉瑕疵。
这些瑕疵表现为形状边缘的锯齿或粗糙。
Impeller 采用几种技术来平滑映射到光栅图形的过程（抗锯齿）。

## Techniques

## 技术

### Multisample anti-aliasing (MSAA)

### 多重采样抗锯齿 (MSAA)

[MSAA][] is a global anti-aliasing technique that operates on the whole contents
of the screen. It is an optimization over rendering the whole screen at a larger
scale and shrinking it down ([SSAA][]). Instead of doing the fragment operation
for each sub-sample, the calculation for the pixel is duplicated across the
sub-samples where a bounds check happens. This limits smoothing to edges. Mobile
phone GPUs have special hardware to optimize this process ( [Tiled
rendering][]). It comes in varying degrees of how many samples to consider.

[MSAA][MSAA] 是一种作用于整个屏幕内容的全局抗锯齿技术。
它优化了先以更大比例渲染整个屏幕再缩小的做法
（[SSAA][SSAA]）。
它不会对每个子采样都执行片段运算，
而是在发生边界检查的那些子采样上重复像素计算。
这样平滑就只作用于边缘。
手机 GPU 有专门硬件来优化此过程
（[分块渲染][Tiled rendering]）。
它按纳入考虑的采样数量分为不同等级。

On desktop and mobile 4x MSAA is used for all rendering calls.

在桌面端和移动端，所有渲染调用都使用 4 倍 MSAA。

### Signed distance fields ([SDFs][])

### 有符号距离场（[SDF][SDFs]）

Typically, hardware accelerated computer graphics define a series of points and
edges (a [mesh][]) and [shaders][]. Instead, SDF renders shapes in the fragment
shader program as signed distance fields. Since the shape is defined in the
fragment shader the edges can be smoothed at the fragment level instead of
relying on the rasterization of a mesh.

通常，硬件加速的计算机图形会定义一系列点和边
（即 [网格][mesh]）以及 [着色器][shaders]。
SDF 则在片段着色器程序中把形状渲染为有符号距离场。
由于形状定义在片段着色器里，
边缘可以在片段级别被平滑，
而不必依赖网格的光栅化。

On desktop, rendering with SDFs is enabled by default. On mobile platforms, SDFs
are an option that defaults to false.

在桌面端，使用 SDF 的渲染默认开启。
在移动平台上，SDF 是一项默认关闭的选项。

This technique is prioritized on desktop because SDF rendering puts more demand
on the GPU and Flutter supports older mobile phones. Also, the physical pixel
sizes on desktop computers are typically bigger than those of mobile phones. So
any imperfection will be more evident there.

这项技术在桌面端优先启用，
因为 SDF 渲染对 GPU 的要求更高，
而 Flutter 仍支持较旧的手机。
另外，桌面电脑的物理像素通常比手机更大，
任何瑕疵在那里都会更明显。

### Examples

### 示例

| <t>No AA</t><t>无抗锯齿</t> | <t>MSAA 4x</t><t>4 倍 MSAA</t> | <t>MSAA 4x + SDF</t><t>4 倍 MSAA + SDF</t> |
| ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| ![No AA](/assets/images/docs/perf/noaa.png) | ![MSAA 4x](/assets/images/docs/perf/msaa4.png) | ![MSAA 4x + SDF](/assets/images/docs/perf/msaa4sdf.png) |

## Working with anti-aliasing

## 使用抗锯齿

### SDFs with the FragmentShader API

### 通过 FragmentShader API 使用 SDF

Standard primitive shapes in Flutter are drawn by default with SDFs. If a
Flutter developer wants to define their own custom graphics with SDFs they can
do so with the [FragmentShader API][]. Using the [drawPath()][] is sufficient
for most use cases without resorting to high quality SDF rendering. Not all
drawn paths are guaranteed to result in SDF rendering though.

Flutter 中的标准基本形状默认使用 SDF 绘制。
如果开发者想用 SDF 定义自己的自定义图形，
可以使用 [FragmentShader API][FragmentShader API]。
对大多数用例来说，使用 [drawPath()][drawPath()] 就足够了，
不必借助高质量的 SDF 渲染。
不过，并非所有绘制路径都一定会走 SDF 渲染。

An example of rendering SDFs with the FragmentShader API can be found at
[`simple_sdf`][].

使用 FragmentShader API 渲染 SDF 的示例见
[`simple_sdf`][]。

### Enabling SDFs on iOS

### 在 iOS 上启用 SDF

SDFs can be enabled on iOS by adding a new field to the `Info.plist` for the
project.

在项目的 `Info.plist` 中新增一个字段，
即可在 iOS 上启用 SDF。

```xml
  <key>FLTEnableSDFs</key>
  <true/>
```

[MSAA]: https://en.wikipedia.org/wiki/Multisample_anti-aliasing
[SSAA]: https://en.wikipedia.org/wiki/Supersampling
[Tiled rendering]: https://en.wikipedia.org/wiki/Tiled_rendering
[SDFs]: https://en.wikipedia.org/wiki/Signed_distance_function
[mesh]: https://en.wikipedia.org/wiki/Polygon_mesh
[shaders]: https://en.wikipedia.org/wiki/Shader
[FragmentShader API]: /ui/design/graphics/fragment-shaders
[drawPath()]: {{site.api}}/flutter/dart-ui/Canvas/drawPath.html
[`simple_sdf`]: https://github.com/flutter/samples/tree/main/simple_sdf
