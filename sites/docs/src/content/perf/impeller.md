---
# title: Impeller rendering engine
title: Impeller 渲染引擎
# description: What is Impeller and how to enable it?
description: 什么是 Impeller，如何启用？
ai-translated: true
---

:::note
As of the 3.27 release, Impeller is the default
rendering engine for both iOS and Android API 29+.
To see _detailed_ info on where Impeller is currently supported,
check out the [Can I use Impeller?][] page.
:::

:::note
自 3.27 版本起，Impeller 是 iOS 以及 Android API 29+ 的默认渲染引擎。
要了解 Impeller 当前支持的 _详细_ 信息，
请参阅 [Can I use Impeller?][] 页面。
:::

[Can I use Impeller?]: {{site.main-url}}/go/can-i-use-impeller

## What is Impeller?

## 什么是 Impeller？

Impeller provides a new rendering runtime for Flutter.
Impeller precompiles a [smaller, simpler set of shaders][]
at engine-build time so they don't compile at runtime.

Impeller 为 Flutter 提供新的渲染运行时。Impeller 在引擎构建时预编译 [smaller, simpler set of shaders][]（更小、更简单的着色器集），避免在运行时编译。

[smaller, simpler set of shaders]: {{site.repo.flutter}}/issues/77412

For a video introduction to Impeller, check out the following
talk from Google I/O 2023.

要了解 Impeller 的视频介绍，可观看 Google I/O 2023 的以下演讲。

<YouTubeEmbed id="vd5NqS01rlA" title="Introducing Impeller, Flutter's new rendering engine"></YouTubeEmbed>

Impeller has the following objectives:

Impeller 的目标包括：

* **Predictable performance**:
  Impeller compiles all shaders and reflection offline at build time.
  It builds all pipeline state objects upfront.
  The engine controls caching and caches explicitly.

  **可预测的性能**：Impeller 在构建时离线编译所有着色器与反射，预先构建所有管线状态对象，由引擎显式控制缓存。

* **Instrumentable**:
  Impeller tags and labels all graphics resources,
  such as textures and buffers.
  It can capture and persist animations to disk without affecting
  per-frame rendering performance.


  **可观测**：Impeller 为纹理、缓冲区等图形资源打标签，可在不影响每帧渲染性能的情况下捕获动画并持久化到磁盘。

* **Portable**:
  Flutter doesn't tie Impeller to a specific client-rendering API.
  You can author shaders once and convert them to backend-specific
  formats, as necessary.


  **可移植**：Flutter 不将 Impeller 绑定到特定客户端渲染 API，可一次编写着色器并按需转换为后端格式。

* **Leverages modern graphics APIs**:
  Impeller uses, but doesn't depend on, features available in
  modern APIs like Metal and Vulkan.


  **利用现代图形 API**：Impeller 使用 Metal、Vulkan 等现代 API 的特性，但不依赖它们。

* **Leverages concurrency**:
  Impeller can distribute single-frame workloads across multiple
  threads, if necessary.


  **利用并发**：必要时 Impeller 可将单帧工作负载分布到多个线程。

## Availability

## 可用性

Where can you use Impeller? For _detailed_ info, check out
the [Can I use Impeller?][] page.

在哪里可以使用 Impeller？_详细_ 信息请参阅 [Can I use Impeller?][] 页面。

### iOS

### iOS 平台

Impeller is the **only supported** rendering engine on iOS with
no ability to switch to Skia.

Impeller 是 iOS 上 **唯一支持** 的渲染引擎，无法切换回 Skia。

### Android

### Android 平台

Impeller is **available and enabled by default on Android API 29+**.
On devices running lower versions of Android or don't support Vulkan,
Impeller falls back to the legacy OpenGL renderer.
No action on your part is necessary for this fallback behavior.

Impeller 在 **Android API 29+ 上默认可用并已启用**。在较低 Android 版本或不支持 Vulkan 的设备上，Impeller 会回退到旧版 OpenGL 渲染器。你无需为此回退行为做任何操作。

* To _disable_ Impeller when debugging,
  pass `--no-enable-impeller` to the `flutter run` command.

* 调试时 _禁用_ Impeller，向 `flutter run` 传入 `--no-enable-impeller`。

  ```console
  flutter run --no-enable-impeller
  ```

* To _disable_ Impeller when deploying your app,
  add the following setting to your project's
  `AndroidManifest.xml` file under the `<application>` tag:

* 部署应用时 _禁用_ Impeller，在项目的 `AndroidManifest.xml` 中 `<application>` 标签下添加以下设置：

```xml
<meta-data
    android:name="io.flutter.embedding.android.EnableImpeller"
    android:value="false" />
```

### Web

### Web 平台

Flutter on the web offers [two renderers][] --
`canvaskit` and `skwasm` -- which both currently use Skia.
They might use Impeller in the future.

Flutter Web 提供 [two renderers][]（两种渲染器）——`canvaskit` 和 `skwasm`——目前均使用 Skia，未来可能使用 Impeller。

[two renderers]: /platform-integration/web/renderers#renderers

### macOS

### macOS 平台

You can try out Impeller for macOS behind a flag.
In a future release, the ability to opt-out of
using Impeller will be removed.

可通过标志在 macOS 上试用 Impeller。未来版本将移除选择不使用 Impeller 的选项。

To enable Impeller on macOS when debugging,
pass `--enable-impeller` to the `flutter run` command.

macOS 调试时启用 Impeller，向 `flutter run` 传入 `--enable-impeller`。

```console
flutter run --enable-impeller
```

To enable Impeller on macOS when deploying your app,
add the following tags under the top-level
`<dict>` tag in your app's `Info.plist` file.

macOS 部署时启用 Impeller，在应用 `Info.plist` 顶层 `<dict>` 标签下添加以下内容：

```xml
  <key>FLTEnableImpeller</key>
  <true />
```

### Bugs and issues

### Bug 与 issue

The team continues to improve Impeller support.
If you encounter performance or fidelity issues
with Impeller on any platform,
file an issue in the [GitHub tracker][file-issue].
Prefix the issue title with `[Impeller]` and
include a small reproducible test case.

团队持续改进 Impeller 支持。若在任何平台上遇到 Impeller 的性能或保真度问题，请在 [GitHub tracker][file-issue] 提交 issue，标题以 `[Impeller]` 为前缀，并附上可复现的小型测试用例。

Please include the following information when
submitting an issue for Impeller:

提交 Impeller 相关 issue 时请包含以下信息：

* The device you are running on,
  including the chip information.

* 运行设备，包括芯片信息。

* Screenshots or recordings of any visible issues.

* 任何可见问题的截图或录屏。

* An [export of the performance trace][].
  Zip the file and attach it to the GitHub issue.

* [export of the performance trace][]（性能跟踪导出）。将文件 zip 后附在 GitHub issue 中。

[export of the performance trace]:/tools/devtools/performance#import-and-export
[file-issue]: {{site.github}}/flutter/flutter/issues/new/choose
[Impeller project board]: {{site.github}}/orgs/flutter/projects/21

## Architecture

## 架构

To learn more details about Impeller's design and architecture,
check out the [README.md][] file in the source tree.

要了解 Impeller 设计与架构的更多细节，请参阅源码树中的 [README.md][] 文件。

[README.md]: {{site.repo.flutter}}/blob/main/engine/src/flutter/impeller/README.md

## Additional information

## 更多信息

* [Frequently asked questions][impeller-faq]

* [常见问题][impeller-faq]

* [Impeller's coordinate system][impeller-coords]

* [Impeller 坐标系][impeller-coords]

* [How to set up Xcode for GPU frame captures with metal][impeller-xcode-capture]

* [如何使用 Xcode 通过 Metal 进行 GPU 帧捕获][impeller-xcode-capture]

* [Learning to read GPU frame captures][impeller-read-capture]

* [学习阅读 GPU 帧捕获][impeller-read-capture]

* [How to enable metal validation for command line apps][impeller-metal-validation]

* [如何为命令行应用启用 Metal 验证][impeller-metal-validation]

* [How Impeller works around the lack of uniform buffers in Open GL ES 2.0][impeller-ubo-gles2]

* [Impeller 如何应对 Open GL ES 2.0 缺少 uniform buffer 的问题][impeller-ubo-gles2]

* [Guidance for writing efficient shaders][impeller-shader-optimization]

* [编写高效着色器的指南][impeller-shader-optimization]

* [How color blending works in Impeller][impeller-blending]

* [Impeller 中的颜色混合原理][impeller-blending]

[impeller-faq]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/faq.md
[impeller-coords]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/coordinate_system.md
[impeller-xcode-capture]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/xcode_frame_capture.md
[impeller-read-capture]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/read_frame_captures.md
[impeller-metal-validation]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/metal_validation.md
[impeller-ubo-gles2]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/ubo_gles2.md
[impeller-shader-optimization]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/shader_optimization.md
[impeller-blending]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/blending.md
