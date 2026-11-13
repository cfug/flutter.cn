---
# title: OpenGL ES render-to-texture content is stored top-down
title: OpenGL ES 的渲染到纹理内容改为自上而下存储
# description: >-
#   Impeller's OpenGL ES backend now stores render-to-texture content
#   top-down, matching Metal and Vulkan, which can affect fragment shaders
#   and Flutter GPU apps that compensated for the previous bottom-up
#   orientation.
description: >-
  Impeller 的 OpenGL ES 后端现在自上而下存储渲染到纹理的内容，
  与 Metal 和 Vulkan 一致。
  这可能影响为先前自下而上方向做过补偿的片段着色器
  和 Flutter GPU 应用。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Impeller's OpenGL ES backend now stores render-to-texture content
top-down, the same as the Metal and Vulkan backends.
A fragment shader or Flutter GPU app that sampled a render-target texture
on OpenGL ES and added a vertical flip to compensate for the old
bottom-up orientation now renders that content upside down.

Impeller 的 OpenGL ES 后端现在自上而下存储渲染到纹理的内容，
与 Metal 和 Vulkan 后端相同。
如果片段着色器或 Flutter GPU 应用在 OpenGL ES 上
采样渲染目标纹理，并加了垂直翻转来补偿旧的自下而上方向，
现在会把该内容渲染成上下颠倒。

## Background

## 背景

The OpenGL ES backend previously stored render-to-texture content
bottom-up, unlike the Metal and Vulkan backends.
The renderer carried that orientation difference through every texture
sample as a per-sampler Y-coordinate scale.
Impeller now absorbs the difference once, at the vertex stage, so
render-target textures are stored top-down on every backend.

OpenGL ES 后端以前自下而上存储渲染到纹理的内容，
与 Metal 和 Vulkan 后端不同。
渲染器把这种方向差异带到每次纹理采样中，
作为每个采样器的 Y 坐标缩放。
Impeller 现在在顶点阶段一次性吸收这一差异，
因此每个后端都以自上而下的方式存储渲染目标纹理。

This change is invisible to the framework and to Flutter's 2D rendering.
Application code can only observe the old orientation through the
`FragmentShader` API and through Flutter GPU,
the experimental `flutter_gpu` package,
where a shader samples a render-target texture directly.

此变更对框架和 Flutter 的 2D 渲染不可见。
应用代码只能通过 `FragmentShader` API 和 Flutter GPU
（实验性的 `flutter_gpu` package）观察到旧的方向，
因为着色器会直接采样渲染目标纹理。

## Migration guide

## 迁移指南

Shaders written for OpenGL ES often flipped the
Y coordinate inside an `IMPELLER_TARGET_OPENGLES` block to make
render-target textures match the other backends.
Render-target textures are now top-down on every backend,
so that flip is no longer needed.

为 OpenGL ES 编写的着色器常常在 `IMPELLER_TARGET_OPENGLES` 块中
翻转 Y 坐标，使渲染目标纹理与其他后端一致。
现在每个后端的渲染目标纹理都是自上而下的，
因此不再需要这次翻转。

Code before migration:

迁移之前的代码：

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#ifdef IMPELLER_TARGET_OPENGLES
  uv.y = 1.0 - uv.y;
#endif
  fragColor = texture(u_texture, uv);
}
```

If the shader only needs to run on a Flutter release that
includes this change, remove the flip.

如果着色器只需要在包含此变更的 Flutter 版本上运行，请移除这次翻转。

Code after migration:

迁移之后的代码：

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
  fragColor = texture(u_texture, uv);
}
```

To keep one source working across releases, guard the flip with the
`IMPELLER_OPENGLES_UNFLIPPED_DEPRECATED` macro.
That macro is only defined on releases that store render-target textures
top-down, so the flip still runs on older releases that need it.

若要让同一份源码跨版本可用，
请用 `IMPELLER_OPENGLES_UNFLIPPED_DEPRECATED` 宏保护这次翻转。
该宏只在自上而下存储渲染目标纹理的版本中定义，
因此在仍需要翻转的旧版本上，翻转依然会执行。

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#if defined(IMPELLER_TARGET_OPENGLES) && !defined(IMPELLER_OPENGLES_UNFLIPPED_DEPRECATED)
  uv.y = 1.0 - uv.y;
#endif
  fragColor = texture(u_texture, uv);
}
```

## Timeline

## 时间线

Landed in version: 3.46.0-0.1.pre<br>
合入版本：3.46.0-0.1.pre<br>
In stable release: 3.47

进入稳定版：3.47

## References

## 参考资料

GitHub issue:

GitHub issue：

* [Issue 186554][]

Relevant PRs:

相关 PR：

* [PR 186556][]
* [PR 187316][]

[Issue 186554]: {{site.repo.flutter}}/issues/186554
[PR 186556]: {{site.repo.flutter}}/pull/186556
[PR 187316]: {{site.repo.flutter}}/pull/187316
