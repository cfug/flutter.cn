---
# title: New APIs for Android plugins that render to a Surface
title: 为渲染到 Surface 的 Android 插件提供的新 API
# description: >-
#   Adds a new API, SurfaceProducer, to the Android embedding API, which
#   opaquely handles the creation and management of a `Surface` for plugins.
#   For Impeller, use of this API is recommended.
description: >-
  Android embedding API 新增了 SurfaceProducer。
  它会为插件不透明地创建并管理 `Surface`。
  使用 Impeller 时，建议采用此 API。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The Android embedder for Flutter introduces a new API, [`SurfaceProducer`][],
which allows plugins to render to a `Surface` without needing to manage what
the backing implementation is. Plugins using the older
[`createSurfaceTexture`][] API will continue to work with [Impeller][] after the
_next_ stable release, but are recommended to migrate to the new API.

Flutter 的 Android 嵌入器引入了新 API [`SurfaceProducer`][]。
插件可以渲染到 `Surface`，而不必管理底层实现是什么。
使用旧的 [`createSurfaceTexture`][] API 的插件，
在 **下一个** 稳定版之后仍可与 [Impeller][] 配合使用，
但建议迁移到新 API。

## Background

## 背景

An Android [`SurfaceTexture`][] is a backing implementation for a [`Surface`][]
that uses an [OpenGLES][] texture as the backing store.

Android 的 [`SurfaceTexture`][] 是 [`Surface`][] 的一种底层实现，
它使用 [OpenGLES][] 纹理作为后备存储。

For example, a plugin might display frames from a _camera_ plugin:

例如，插件可能会显示来自 **相机** 插件的帧：

![Flowchart](https://camo.githubusercontent.com/cdb52c5d371b4f1d5573b650a0eddb0871e5e8be1012d290e008f41bc71b2580/68747470733a2f2f736f757263652e616e64726f69642e636f6d2f7374617469632f646f63732f636f72652f67726170686963732f696d616765732f636f6e74696e756f75735f636170747572655f61637469766974792e706e67)

In newer versions of the Android API (>= 29), Android introduced a
backend-agnostic [`HardwareBuffer`][], which coincides with the minimum version
that Flutter will attempt to use the [Vulkan][] renderer. The Android embedding
API needed to be updated to support a more generic `Surface` creation API that
doesn't rely on OpenGLES.

在较新的 Android API（>= 29）中，Android 引入了与后端无关的
[`HardwareBuffer`][]。
这恰好也是 Flutter 会尝试使用 [Vulkan][] 渲染器的最低版本。
Android embedding API 需要更新，
以支持更通用、不依赖 OpenGLES 的 `Surface` 创建 API。

## Migration guide

## 迁移指南

If you are using the older [`createSurfaceTexture`][] API, you should migrate to
the new [`createSurfaceProducer`][] API. The new API is more flexible and allows
the Flutter engine to opaquely pick the best implementation for the current
platform and API level.

如果使用的是旧的 [`createSurfaceTexture`][] API，
应当迁移到新的 [`createSurfaceProducer`][] API。
新 API 更灵活，让 Flutter 引擎可以根据当前平台和 API 级别，
不透明地选择最佳实现。

1. Instead of creating a `SurfaceTextureEntry`, create a `SurfaceProducer`:

   不再创建 `SurfaceTextureEntry`，改为创建 `SurfaceProducer`：

   ```java diff
   - TextureRegistry.SurfaceTextureEntry entry = textureRegistry.createSurfaceTexture();
   + TextureRegistry.SurfaceProducer producer = textureRegistry.createSurfaceProducer();
   ```

1. Instead of creating a `new Surface(...)`, call [`getSurface()`][] on the
   `SurfaceProducer`:

   不再 `new Surface(...)`，改为在 `SurfaceProducer` 上调用 [`getSurface()`][]：

   ```java diff
   - Surface surface = new Surface(entry.surfaceTexture());
   + Surface surface = producer.getSurface();
   ```

In order to conserve memory when the application is suspended in the background,
Android and Flutter _may_ destroy a surface when it is no longer visible. To
ensure that the surface is recreated when the application is resumed, you should
use the provided [`setCallback`][] method to listen to surface lifecycle events:

为了在应用挂起进入后台时节省内存，
Android 和 Flutter **可能** 会在 Surface 不再可见时销毁它。
为了确保应用恢复时重新创建 Surface，
应当使用提供的 [`setCallback`][] 方法监听 Surface 的生命周期事件：

```java
surfaceProducer.setCallback(
   new TextureRegistry.SurfaceProducer.Callback() {
      @Override
      public void onSurfaceAvailable() {
         // Do surface initialization here, and draw the current frame.
      }

      @Override
      public void onSurfaceCleanup() {
         // Do surface cleanup here, and stop drawing frames.
      }
   }
);
```

A full example of using this new API can be found in [PR 6989][] for the
`video_player_android` plugin.

`video_player_android` 插件的 [PR 6989][] 中有使用此新 API 的完整示例。

:::version-note
If you're using Flutter 3.26 or earlier,
override `onSurfaceCreated` instead of `onSurfaceAvailable`.
However, note that Flutter invokes `onSurfaceCreated` even when
the original surface isn't destroyed.

如果使用的是 Flutter 3.26 或更早版本，
请重写 `onSurfaceCreated`，而不是 `onSurfaceAvailable`。
不过请注意，即使原来的 Surface 没有被销毁，
Flutter 也会调用 `onSurfaceCreated`。

If you're using Flutter 3.28 or earlier,
override `onSurfaceDestroyed` instead of `onSurfaceCleanup`.
However, note that Flutter invokes `onSurfaceDestroyed` after
the surface is destroyed and becomes invalid,
so it doesn't provide time to stop rendering beforehand.

如果使用的是 Flutter 3.28 或更早版本，
请重写 `onSurfaceDestroyed`，而不是 `onSurfaceCleanup`。
不过请注意，Flutter 会在 Surface 已销毁并失效之后
才调用 `onSurfaceDestroyed`，
因此没有时间事先停止渲染。
:::

## Note on camera previews

## 关于相机预览的说明

If your plugin implements a camera preview, your migration might also require
fixing the rotation of that preview. This is because `Surface`s produced by the
`SurfaceProducer` might not contain the transformation information that Android
libraries need to correctly rotate the preview automatically.

如果插件实现了相机预览，迁移时可能还需要修正预览的旋转。
这是因为 `SurfaceProducer` 生成的 `Surface`
可能不包含 Android 库自动正确旋转预览所需的变换信息。

In order to correct the rotation, you need to rotate the preview with
respect to the camera sensor orientation and the device orientation according
to the equation:

要修正旋转，需要根据相机传感器方向和设备方向，
按下面的公式旋转预览：

```plaintext
rotation = (sensorOrientationDegrees - deviceOrientationDegrees * sign + 360) % 360
```

where `deviceOrientationDegrees` is counterclockwise degrees and `sign` is 1 for
front-facing cameras and -1 for back-facing cameras.

其中 `deviceOrientationDegrees` 是逆时针角度，
前置相机的 `sign` 为 1，后置相机为 -1。

To calculate this rotation,

要计算这一旋转：

- Use [`SurfaceProducer.handlesCropAndRotation`][] to check if the underlying
  `Surface` handles rotation (if `false`, you may need to handle the rotation).

  使用 [`SurfaceProducer.handlesCropAndRotation`][] 检查底层 `Surface`
  是否处理旋转（若为 `false`，你可能需要自行处理旋转）。

- Retrieve the sensor orientation degrees by retrieving the value of
  [`CameraCharacteristics.SENSOR_ORIENTATION`][].

  读取 [`CameraCharacteristics.SENSOR_ORIENTATION`][] 的值，
  取得传感器方向的角度。

- Retrieve the device orientation degrees in one of the ways that the
  [Android orientation calculation documentation][] details.

  按 [Android 方向计算文档][Android orientation calculation documentation]
  中的某种方式，取得设备方向的角度。

To apply this rotation, you can use a [`RotatedBox`][] widget.

要应用此旋转，可以使用 [`RotatedBox`][] widget。

For more information on this calculation, check out the
[Android orientation calculation documentation][]. For a full example of making
this fix, check out [this `camera_android_camerax` PR][].

关于此计算的更多说明，请查阅
[Android 方向计算文档][Android orientation calculation documentation]。
完整的修复示例请查看
[此 `camera_android_camerax` PR][this `camera_android_camerax` PR]。

## Timeline

## 时间线

Landed in version: 3.22<br>
In stable release: 3.24

合入版本：3.22<br>
进入稳定版：3.24

:::note
This feature landed in Flutter 3.22, but it wasn't functional.
Plugins that migrate to this API should
set `3.24` as a minimum version constraint.

此功能在 Flutter 3.22 合入，但当时并不能正常工作。
迁移到此 API 的插件应当把最低版本约束设为 `3.24`。
:::

In Flutter 3.27,
`onSurfaceCreated` was deprecated in favor of `onSurfaceAvailable` and
`SurfaceProducer.handlesCropAndRotation` was added.

在 Flutter 3.27 中，
`onSurfaceCreated` 已弃用，改为 `onSurfaceAvailable`，
并新增了 `SurfaceProducer.handlesCropAndRotation`。

In Flutter 3.29,
`onSurfaceDestroyed` was deprecated in favor of `onSurfaceCleanup`.

在 Flutter 3.29 中，
`onSurfaceDestroyed` 已弃用，改为 `onSurfaceCleanup`。

## References

## 参考资料

API documentation:

API 文档：

- [`SurfaceProducer`][]
- [`createSurfaceProducer`][]
- [`createSurfaceTexture`][]

Relevant issues:

相关 issue：

- [Issue 139702][]
- [Issue 145930][]

Relevant PRs:

相关 PR：

- [PR 51061][], which tests the new API in the engine tests.

  [PR 51061][]，在引擎测试中测试此新 API。

- [PR 6456][], which migrates the `video_player` plugin to use the new API.

  [PR 6456][]，将 `video_player` 插件迁移为使用新 API。

- [PR 6461][], which migrates the `camera_android` plugin to use the new API.

  [PR 6461][]，将 `camera_android` 插件迁移为使用新 API。

- [PR 6989][], which adds a full example of
  using the new API in the `video_player_android` plugin.

  [PR 6989][]，在 `video_player_android` 插件中
  添加了使用新 API 的完整示例。

- [PR 160937][], which adds `onSurfaceCleanup` and
  deprecates `onSurfaceDestroyed`.

  [PR 160937][]，新增 `onSurfaceCleanup`，
  并弃用 `onSurfaceDestroyed`。

[Impeller]: /perf/impeller
[OpenGLES]: https://www.khronos.org/opengles/
[Vulkan]: https://source.android.com/docs/core/graphics/arch-vulkan
[`HardwareBuffer`]: https://developer.android.com/reference/android/hardware/HardwareBuffer
[`Surface`]: https://developer.android.com/reference/android/view/Surface
[`SurfaceProducer`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html
[`SurfaceProducer.handlesCropAndRotation`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html#handlesCropAndRotation()
[`SurfaceTexture`]: https://source.android.com/docs/core/graphics/arch-st
[`createSurfaceProducer`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html#createSurfaceProducer()
[`createSurfaceTexture`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html#createSurfaceTexture()
[`getSurface()`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html#getSurface()
[`setCallback`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html#setCallback(io.flutter.view.TextureRegistry.SurfaceProducer.Callback)
[`CameraCharacteristics.SENSOR_ORIENTATION`]: {{site.android-dev}}/reference/android/hardware/camera2/CameraCharacteristics#SENSOR_ORIENTATION
[`RotatedBox`]: {{site.api}}/flutter/widgets/RotatedBox-class.html
[Android orientation calculation documentation]: {{site.android-dev}}/media/camera/camera2/camera-preview#orientation_calculation
[this `camera_android_camerax` PR]: {{site.repo.packages}}/pull/7044
[Issue 139702]: {{site.repo.flutter}}/issues/139702
[Issue 145930]: {{site.repo.flutter}}/issues/145930
[PR 51061]: {{site.repo.engine}}/pull/51061
[PR 6456]: {{site.repo.packages}}/pull/6456
[PR 6461]: {{site.repo.packages}}/pull/6461
[PR 6989]: {{site.repo.packages}}/pull/6989
[PR 160937]: {{site.repo.flutter}}/pull/160937
