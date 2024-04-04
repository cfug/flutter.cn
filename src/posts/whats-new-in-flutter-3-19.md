---
title: 使用 Flutter 3.19 更高效地开发
toc: true
keywords: Flutter 3, Flutter 3 新特性, Gemini API, Impeller, Windows Arm64
description: 借助 Gemini API、Impeller 更新以及 Windows Arm64 支持，变革应用的开发过程。
image:
    path: https://devrel.andfun.cn/devrel/posts/2024/04/02/7oSs8U.gif
---

我们已隆重推出全新的 Flutter 版本——Flutter 3.19。此版本引入了专为 Gemini 设计的新 Dart SDK、一个能让开发者对 Widget 动画实现精细化控制的全新 Widget，Impeller 更新带来的渲染性能提升、有助于实现深层链接的工具和对 Windows Arm64 的支持，以及更多丰富功能！

Flutter 社区持续展现出令人赞叹的实力，有 168 名社区成员合并了 1,429 个拉取请求 (pull request)，其中有 43 名社区成员提交了他们的首个 Flutter 拉取请求 (pull request)！

欢迎您继续阅读本篇文章，了解 Flutter 社区为这个最新版本带来的所有新功能和改进！

## **AI 集成**

### **Gemini Google AI Dart SDK 测试版发布**

Google AI Dart SDK 已发布测试版，这使得您能够利用 Google 最新的 Gemini 系列 AI 模型，在 Dart 或 Flutter 应用中构建生成式 AI 功能。目前 pub.dev 上已提供 [google_generative_ai](https://pub.dev/packages/google_generative_ai "google_generative_ai") package。如要详细了解如何使用 Google AI Dart SDK 进行开发，您可以参阅 [此博文](http://docs.google.com/flutter/harness-gemini-in-your-dart-and-flutter-apps-00573e560381 "此博文")，或者直接查阅 [Dart 快速入门](https://ai.google.dev/tutorials/dart_quickstart "Dart 快速入门") 教程。

![](https://devrel.andfun.cn/devrel/posts/2024/04/02/qgbYvO.jpg)

## **框架**

### **滚动优化**

以前在 Flutter 中，当您使用两只手指拖动时，滚动速度会是单指的两倍。现在，您可以使用 MultiTouchDragStrategy.latestPointer 来配置默认的 ScrollBehavior，实现与触摸点数量无关的滚动行为。若想了解有关此变更的更多信息，您可以参阅 [迁移指南](https://docs.flutter.dev/release/breaking-changes/multi-touch-scrolling "迁移指南")。

* 迁移指南 

我们还完成了 [`SingleChildScrollView`](https://github.com/flutter/flutter/pull/136871 "`SingleChildScrollView`") 和 [`ReorderableList`](https://github.com/flutter/flutter/pull/136828 "`ReorderableList`") 的错误修复，解决了多个报告的崩溃和意外行为问题。

我们还解决了一个关于二维滚动的问题，现在当您在任一方向进行滚动操作时，如果进行拖动或点按，滚动活动将按预期停止。

自上次发布以来，我们对 `two_dimensional_scrollables` package 中的 `TableView Widget` 也进行了更新。此次更新改善了其整体表现、增加了对合并单元格的支持，并且在 [Flutter 3.16 稳定版]( "Flutter 3.16 稳定版") 发布后，采用了更多二维滚动基础组件的新功能。

### **AnimationStyle**

得益于 Flutter 社区成员 [@TahaTesser](https://github.com/TahaTesser "@TahaTesser") 的 [贡献](https://github.com/flutter/flutter/pull/138721 "贡献")，Flutter 现在新增了一个名为 AnimationStyle 的 Widget。该 Widget 可让用户覆盖 `MaterialApp`、`ExpansionTile` 和 `PopupMenuButton` 等 Widget 中的默认动画行为，帮助开发者覆盖动画曲线和时长。

### **SegmentedButton.styleFrom**

Flutter 社区成员 [@AcarFurkan](https://github.com/AcarFurkan "@AcarFurkan") 添加了一个 `styleFrom` 静态实用方法，类似于其他按钮类型所提供的方法，能够快速创建 `SegmentedButton` 的 `ButtonStyle`，与其他分段按钮共享，或者用于配置应用的 `SegmentedButtonTheme`。

### **自适应开关**

这个自适应组件在 macOS 和 iOS 平台上的外观和风格就像原生控件，而在其他平台上则遵循 Material Design 的外观和风格。它并不依赖于 Cupertino 库，因此其 API 在所有平台上都是完全一致的。

想要了解详情，您可以参阅 [自适应开关拉取请求](https://github.com/flutter/flutter/pull/130425 "自适应开关拉取请求")，以及 Switch.adaptive 构造函数 [API 页面](https://api.flutter.dev/flutter/material/Switch/Switch.adaptive.html "API 页面") 上的实时示例。

### **SemanticsProperties 可访问性标识符**

`SemanticsProperties` 中新增了一个可访问性标识符，用于为原生可访问性层级中的语义节点提供标识符。在 Android 平台上，这个标识符会以 resource-id 的形式出现在可访问性层级结构中；在 iOS 平台上，该标识符会设置 `UIAccessibilityElement.accessibilityIdentifier`。感谢社区成员 [@bartekpacia](https://github.com/bartekpacia "@bartekpacia") 对这一涉及到 [引擎](https://github.com/flutter/engine/pull/47961 "引擎") 和 [框架](https://github.com/flutter/flutter/pull/138331 "框架") 层面的改变所做出的贡献。

### **增加了对文本 Widget 状态的访问权限**

我们在 `TextField` 和 `TextFormField` 中增加了对 `MaterialStatesController` 的支持，以便您监听 `MaterialState` 的变化情况。

### **UndoHistory 堆栈**

我们 [修复了](https://github.com/flutter/flutter/pull/138674 "修复了") 在日语键盘上撤销/重做历史记录可能会消失的 [问题](https://github.com/flutter/flutter/issues/130881 "问题")。现在您可以在条目被推送到 UndoHistory 堆栈之前对其进行修改。

## **引擎**

### **Impeller 进展**

**Android OpenGL 预览版**

发布 3.16 稳定版时，我们邀请了用户在支持 Vulkan 的 Android 设备上试用 Impeller，覆盖了市面上 77% 的 Android 设备。在过去的几个月里，我们已经将 Impeller 的 OpenGL 后端功能提升到了与 Vulkan 后端相同的水平，例如添加 [对 MSAA 的支持](https://github.com/flutter/engine/pull/47030 "对 MSAA 的支持")。这意味着 Flutter 应用能够在几乎所有 Android 设备上正确渲染，不过还有少数功能尚在开发，暂未完全支持，如自定义着色器和对外部纹理的全面支持等。

请各位 Flutter 开发者升级到最新稳定版。在 [启用 Impeller](https://docs.flutter.dev/perf/impeller#android "启用 Impeller") 后，如果遇到任何问题，欢迎您随时提交相关报告。当前阶段的反馈对于确保 Impeller 能在 Android 平台上取得成功，以及我们能够在今年晚些时候有把握地将其设为默认渲染器至关重要。由于 Android 硬件生态系统比 iOS 生态系统更加多样化，因此关于 Impeller 的最有效的反馈需要包含出现问题的具体设备型号和所使用的 Android 版本的详细信息。

此外，您还需注意，Impeller 的 Vulkan 后端在 [调试](https://docs.flutter.dev/testing/build-modes#debug "调试") build 中可提供比 Skia 后端更多的调试功能，且这些功能会产生额外的运行时消耗。因此，我们建议您通过 [配置文件](https://docs.flutter.dev/testing/build-modes#profile "配置文件") build 或 [发布](https://docs.flutter.dev/testing/build-modes#release "发布") build 提供关于 Impeller 性能的反馈。Bug 报告需要包含来自 DevTools 的时间线数据，以及在同一设备上与 Skia 后端的性能对比数据。最后，我们一如既往地感谢大家提供包含对可复现问题的小型案例加以说明等反馈。

**战略路线图**

在 Impeller 的 Android 预览阶段，继渲染保真度之后，我们主要关注的是性能。在性能持续逐步提升的同时，一些更大规模的改进工作也在进行中。我们预计通过利用 [Vulkan 子通道](https://github.com/flutter/flutter/issues/128911 "Vulkan 子通道") 技术，来极大地提高高级混合模式的性能。此外，我们还计划改变渲染策略，从一直以来在 CPU 上对每一个路径进行细分 (tessellating)，转向采用 [Stencil-then-cover](https://github.com/flutter/flutter/issues/137714 "Stencil-then-cover") 的方法，这将显著降低 Impeller 在 Android 和 iOS 上的 CPU 使用率。最后，我们希望新的 [高斯模糊](https://github.com/flutter/flutter/issues/131580 "高斯模糊") 实现能够达到与 Skia 实现相同的吞吐量，并且更符合 iOS 上的模糊惯用用法。

### **API 改进**

**字形信息**

在此次发布的版本中，`dart:ui` 的 `Paragraph` 对象新增了两个方法: `getClosestGlyphInfoForOffset` 和 `getGlyphInfoAt`，这两个方法分别可返回一个新类型 `GlyphInfo` 的对象。您可查看关于新类型 [GlyphInfo](https://main-api.flutter.dev/flutter/dart-ui/GlyphInfo-class.html "GlyphInfo") 的文档。

**GPU 跟踪**

在 Impeller 框架下，使用 Metal 的 iOS、macOS、模拟器环境中，以及支持 Vulkan 的 Android 设备中，Flutter 引擎现会在调试 build 和配置文件 build 中为时间轴上的每一帧报告 GPU 时间。这些 GPU 帧时间数据可以在 DevTools 的 "GPUTracer" 标题下进行查看。

![](https://devrel.andfun.cn/devrel/posts/2024/04/02/yRc55g.png)

请注意，由于不支持 Vulkan 的 Android 设备可能会错误报告其对于查询 GPU 时间的支持情况，因此，在这些设备上，Impeller 的 GPU 跟踪功能只能通过在 AndroidManifest.xml 文件中设置标志来启用。

```XML
<meta-data
  android:name="io.flutter.embedding.android.EnableOpenGLGPUTracing"
  android:value="true" />
```

### **性能优化**

**特化常量**

我们的团队为 Impeller 添加了 [特化常量支持](https://github.com/flutter/flutter/issues/119357 "特化常量支持")。通过在 Impeller 的着色器中利用这一功能，Flutter 引擎的未压缩二进制文件大小减少了 [将近 350 KB](https://flutter-flutter-perf.skia.org/e/?begin=1698877815&end=1702074996&queries=test%3Dhello_world_ios__compile&requestType=0&selected=commit%3D37892%26name%3D%252Carch%253Darm%252Cbranch%253Dmaster%252Cconfig%253Ddefault%252Cdevice_type%253DiPhone_11%252Cdevice_version%253Dnone%252Chost_type%253Dmac%252Csub_result%253Dflutter_framework_uncompressed_bytes%252Ctest%253Dhello_world_ios__compile%252C "将近 350 KB")。

**背景滤镜加速**

尽管仍有进步空间，但此版本包含一些针对 Impeller 的背景滤镜和模糊处理的显著性能改进。具体而言，开源社区贡献者 [@knopp](https://github.com/knopp "@knopp") [注意到](https://github.com/flutter/flutter/issues/131567#issuecomment-1678210475 "注意到") Impeller 错误地请求了读取屏幕纹理的功能。[移除这一功能后](https://github.com/flutter/engine/pull/47808 "移除这一功能后")，在我们的基准测试中，对于包含多个背景滤镜的场景，根据其复杂程度的不同，性能提升了 20% 至 70% 不等。

此外，Impeller 不再对每一个背景滤镜都 [无条件地存储模板缓冲区](https://github.com/flutter/engine/pull/47397 "无条件地存储模板缓冲区")。相反，它现在会记录任何影响剪辑的操作，并在为背景滤镜恢复保存层时，将这些操作重放到一个新的模板缓冲区中。

![](https://devrel.andfun.cn/devrel/posts/2024/04/02/u9wePi.png)

通过这一变化，我们在采用 Vulkan 后端运行 Impeller 的 Pixel 7 Pro 上，对动画高级混合模式进行基准测试时，平均 GPU 帧时间从 55 毫秒显著提高到了 16 毫秒。同时，90% 的光栅线程 CPU 时间也从大约 110 毫秒下降到了 22 毫秒。

## **Android**

### **深层链接 Web 验证器**

我们从开发者那里了解到，实现深层链接 (将用户从 Web URL 导航至移动应用中的特定页面) 一直以来都是一个实施难度较大且容易出错的任务。因此，我们首先创建了一个验证工具，以帮助开发者了解哪些链接配置不正确，并提供了实施指导。我们非常高兴地宣布，Flutter 深层链接验证器的早期版本现已推出！

在此早期版本中，Flutter 深层链接验证器支持对 Android 进行 Web 检查，这意味着该工具可以验证您 `assetlinks.json` 文件的设置是否正确。您可以打开 DevTools，点击进入 "**深层链接**" (Deep Links) 标签页，然后导入一个包含深层链接的 Flutter 项目。深层链接验证器会显示您 Web 文件的配置是否正确。您可以参阅深层链接验证工具的 [测试说明](https://docs.google.com/document/d/1fnWe8EpZleMtSmP0rFm2iulqS3-gA86z8u9IsnXjJak/edit?tab=t.0 "测试说明")，以了解详细信息。

希望这款工具能成为简化您深层链接实现过程的第一步。我们将持续致力于为 iOS 平台提供 Web 检查支持，并在 iOS 和 Android 两个平台上都提供应用内检查支持！

![](https://devrel.andfun.cn/devrel/posts/2024/04/02/L4Lh5X.png)

### **Share.invoke 支持**

Android 平台之前缺少文本字段和视图上的默认**分享**按钮，但在本次发布中我们已经将其添加进来。这是我们持续努力的见证，旨在确保每个平台上的所有默认上下文菜单按钮都可用。您可以通过 [PR #107578](https://github.com/flutter/flutter/issues/107578 "PR #107578") 持续关注进展情况。

### **Native Assets 功能**

如果您对 Flutter 与 Flutter 代码中其它语言函数的互操作性感兴趣，您现在可以在 Android 平台上通过 Native Assets 执行 FFI 调用。随时了解我们支持 Native Assets 功能的 [持续进展](https://github.com/flutter/flutter/issues/129757 "持续进展")。

### **纹理层混合组合 (TLHC) 模式**

Flutter 3.19 版本能够让 Google 地图和文本输入放大镜在 TLHC 模式下运行，这意味着您的应用将获得更好的性能表现。如果您正在使用 Google 地图，我们鼓励您测试这些变化，并向我们分享反馈！

这项工作不包括在框架或引擎层面的提交中，但您可以在 [PR 5408](https://github.com/flutter/packages/pull/5408 "PR 5408") 中查看相关内容，以及测试 TLHC 模式的步骤。

### **自定义系统范围内的文本选择工具栏按钮**

Android 应用可以添加自定义的文本选择菜单项，这些菜单项将会出现在所有文本选择菜单中，即用户长按文本时弹出的菜单。Flutter 的 TextField 选择菜单现已包含此功能。

## **iOS**

### **Flutter iOS 原生字体**

现在，Flutter 在 iOS 上的文本看起来更加紧凑且更接近原生风格。按照 Apple 的设计指南，iOS 上较小的字体应该排列得更为宽松以便在移动设备上阅读时更加舒适，而较大的字体则应设计得更为紧凑，以节省空间。在此之前，无论字号大小，我们都错误地采用了较为宽松的小字号样式。而现在，默认情况下 Flutter 将为较大的文本使用更为紧凑的字体样式。

![](https://devrel.andfun.cn/devrel/posts/2024/04/02/rhliZA.png)

### **DevTools**

**DevTools 更新**

此版本的一些 DevTools 亮点包括:

* 在 DevTools 中添加了一个新功能和屏幕，用于验证 Android 平台上的深层链接设置。
* 在 "**增强跟踪**" (Enhance Tracing) 菜单中添加了一个选项，用于跟踪平台渠道活动。这对于带有插件的应用很有帮助。![](https://devrel.andfun.cn/devrel/posts/2024/04/02/zITKLa.png)
* 性能和 CPU 分析器屏幕现在即使在没有连接任何应用的情况下也可访问。之前通过 DevTools 保存的性能数据或 CPU 配置文件，现在可以从这些屏幕上重新加载并查看。

* VS Code 中的 Flutter 侧边栏现在增加了新功能: 如果当前项目尚未启用新平台，用户可以直接启用新的平台。此外，侧边栏上的 DevTools 菜单现在提供一个选项，可让用户在外部浏览器窗口中打开 DevTools。

如要了解更多信息，您可以查看 DevTools [2.29.0](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.29.0 "2.29.0")、[2.30.0](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.30.0 "2.30.0") 和 [2.31.0](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.31.0 "2.31.0") 的版本说明。

## **桌面设备**

### **Windows Arm64 支持**

感谢社区成员 [@pbo-linaro](https://github.com/pbo-linaro "@pbo-linaro") 的不懈努力，Flutter 在 Windows 平台上现已初步支持 Arm64 架构。这一初始支持为 Flutter 应用能在 Windows Arm64 设备上更加高效且高性能地原生运行奠定了基础。尽管这项支持功能仍在开发阶段 (您可以在 GitHub 问题 [#62597](https://github.com/flutter/flutter/issues/62597 "#62597") 上跟踪进展)，但这标志着 Flutter 开发者为在更广泛的 Windows 设备上优化其运用的运行迈出了卓越的一步。

## **生态系统**

### **必须提供隐私清单**

Flutter 现在在 iOS 平台上包含了隐私清单，以满足 [即将出台的 Apple 要求](https://developer.apple.com/support/third-party-SDK-requirements/ "即将出台的 Apple 要求")。

### **Flutter 和 Dart Package 生态系统的进展**

如果您之前错过了相关信息，欢迎查看我们关于 F[lutter 和 Dart Package 生态系统进展](http://docs.google.com/flutter/progress-of-the-flutter-package-ecosystem-17cded9a0703 "lutter 和 Dart Package 生态系统进展") 的博客文章。

## **弃用和重大变更**

### **放弃对 Windows 7 和 Windows 8 的支持**

随着 Flutter 的不断发展，我们在 Dart 3.3 和 Flutter 3.19 版本终止了对 Windows 7 和 Windows 8 的支持，进而专注于最新的技术。这一调整符合 Microsoft 的战略，使我们能够在现代操作系统上进一步增强 Flutter 的功能。我们深知这可能需要开发者们做出相应的调整，并承诺将全力协助您顺利完成过渡。此举为在受支持的 Windows 版本上构建一个更安全、高效且功能丰富的开发环境奠定了基础。感谢您的理解和努力适应，在 Flutter 生态系统中，我们将继续携手创新，共同进步。

### **Impeller 抖动效果标志**

Flutter 3.16 稳定版的版本说明中指出，全局标志 `Paint.enableDithering` 已被 [移除](https://github.com/flutter/engine/pull/46745 "移除")。有关详细信息，您可以参阅官方网站上的 [重大变更公告](https://docs.flutter.dev/release/breaking-changes/paint-enableDithering "重大变更公告")。

### **放弃对 iOS 11 的支持**

由于调用特定网络 API 时会出现 [运行时崩溃](https://github.com/flutter/flutter/issues/136060 "运行时崩溃") 问题，Flutter 不再支持 iOS 11。这意味着针对 Flutter 3.16.6 及更高版本构建的应用将无法在此类设备上运行。

### **弃用自动渲染模式**

在此版本的 [重大变更](https://docs.flutter.dev/release/breaking-changes "重大变更") 中，我们宣布了一些已弃用的 API，这些 API 对 v3.16 之后的版本不再有效。如要查看所有受影响的 API 及其附加背景信息和迁移指南，您可以参阅 [此版本的弃用指南](https://docs.flutter.dev/release/breaking-changes/3-16-deprecations "此版本的弃用指南")。许多弃用的 API 都受到 [Flutter fix](https://docs.flutter.dev/development/tools/flutter-fix "Flutter fix") 的支持，包括 IDE 中的快速修复功能。您可以通过 dart fix 命令行工具来批量评估并应用修复。

非常感谢社区一如既往地 [为测试工作所做的贡献](https://github.com/flutter/tests/blob/master/README.md "为测试工作所做的贡献")，帮助我们识别以上重大变更。如要了解详情，您可以查看 [Flutter 的重大变更政策](https://github.com/flutter/flutter/wiki/Tree-hygiene#handling-breaking-changes "Flutter 的重大变更政策")。

在此次发布中，除了已支持的 flutter 和 flutter_test package 之外，flutter_driver package 也首次被纳入了弃用策略之中。

## **即刻体验**

我们特意在本文的开篇部分强调了贡献者的数量。Flutter 日益发展成一个强大且高效的工具套件，这证明了我们卓越的社区成员的奉献精神与辛勤努力。我们向每一个人表示由衷的感谢。

如要深入了解此版本的具体内容，您可以参阅 Flutter 3.19 的 [版本说明和更新日志](https://docs.flutter.dev/release/release-notes/release-notes-3.19.0 "版本说明和更新日志")，获取新增功能的详尽列表。

Flutter 3.19 以及 D[art 3.3](https://medium.com/dartlang/new-in-dart-3-3-extension-types-javascript-interop-and-more-325bf2bf6c13 "art 3.3") 已在稳定渠道中正式发布。开始使用最新版 Flutter 踏上全新开发旅程，就像运行 "flutter upgrade" 一样轻松。
