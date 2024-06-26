---
title: Flutter 3.3 更新详解
toc: true
keywords: Flutter 3, Flutter 3 新特性
description: 文字处理、性能提升和其他改进和更新，为开发者们带来一个更好用的 Flutter 3.3！
image:
    path: https://files.flutter-io.cn/posts/images/2022/08/6c1eaf86b5694.png
---

*作者 / Kevin Jamaul Chisholm, Technical Program Manager for Dart and Flutter at Google*

Flutter 3 是我们正式为全平台提供支持的一个重量级里程碑，距离它的发布仅过去了三个月，今天让我们有请 Flutter 3.3 正式版！近三个月我们并没有放慢更新迭代的速度——自 Flutter 3 发布以来，我们已经为 Flutter 合并了 5687 个拉取请求。

本次更新带来了 Flutter Web 平台、桌面端平台、文本处理的性能和其他更新内容。

同时我们也会介绍 go\_router package、DevTools \(开发者工具\) 和 VS Code 扩展相关的更新内容。与我们一起阅读详细了解它们吧！

## 框架更新

### 全局选择

到现在为止，Flutter 在 Web 上的文本选择交互仍然没有达到预期。与 Flutter 应用不同，原生的 Web 应用会将每个节点构建为树形结构。在传统的 Web 应用中你可以轻松用拖动手势来选择网页上的节点，这在 Flutter Web 应用中无法轻松达成。

从今天起，一切都发生了变化。我们引入了 `SelectionArea` widget，它的子 widget 现已可以进行随意选择！

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image6.gif)

只需使用 `SelectionArea` 包裹住路由显示的内容 \(例如 `Scaffold`\)，Flutter 会替你处理好一切，你便可以享受到这项强力的新特性。

想要更全面深入地了解这个绝妙的新功能，请访问 [SelectionArea API 页面](https://api.flutter-io.cn/flutter/material/SelectionArea-class.html)。

### 触控板操作

Flutter 3.3 优化了针对触控板的支持。Flutter 不仅提供了更丰富且顺滑的控制，同时也减少了几种特定情况的误触。若你想了解误触的示例，你可以查看 [Flutter 实用教程](https://docs.flutter.cn/cookbook) 页面。将页面滚动到底部的 DartPad，并跟随以下步骤进行操作：

1.  缩小窗口让上半部分出现滚动条
2.  将指针悬停在上半部分
3.  使用触控板进行滚动
4.  在 Flutter 3.3 以前，使用触控板滚动会拖动元素，因为 Flutter 将模拟的手势事件进行了下发
5.  从 Flutter 3.3 开始，使用触控板滚动会正确地滚动列表，因为 Flutter 会传递「滚动」事件，卡片不会识别这些事件，而列表会进行对应的处理

想了解更多信息，请访问 [Flutter 触控板手势](<{{site.flutter-files-cn}}flutter-design-docs/Flutter_Trackpad_Gestures_(PUBLICLY%20SHARED).pdf) 的设计文档，并且查看以下的拉取请求：

* PR 89944: [在框架中支持触控板手势](https://github.com/flutter/flutter/pull/89944)
* PR 31591: [iPad 上的触控版手势](https://github.com/flutter/engine/pull/31591)
* PR 34060: [ChromeOS/Android 触控板手势](https://github.com/flutter/engine/pull/34060)
* PR 31594: [Win32 的触控板手势](https://github.com/flutter/engine/pull/31594)
* PR 31592: [Linux 的触控板手势](https://github.com/flutter/engine/pull/31592)
* PR 31593: [Mac 上的触控板手势](https://github.com/flutter/engine/pull/31593)

### 随手写功能

感谢来自社区成员 [fbcouch](https://github.com/fbcouch) 的出彩贡献。Flutter 现在支持在 iPadOS 上使用 Apple Pencil 进行 [随手写](http://support.apple.com/zh-cn/guide/ipad/ipad355ab2a7/ipados) 输入。这项功能已默认在 `CupertinoTextField`、`TextField` 和 `EditableText` 上启用。只需要将 Flutter 升级到 3.3 就可以为你的用户带来这项新功能。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image7.gif)

### 文本输入

为了优化富文本编辑的支持，本次更新我们增加了从底层平台的 `TextInputPlugin` 接收更加精细化的更新的能力。以前 `TextInputClient` 只能传递新的编辑状态，而不能细分新旧状态之间的变化量，`TextEditingDelta` 和 `DeltaTextInputClient` 填充了这部分的信息差。通过访问这些变化量，你可以为输入区域构建自定义的样式，这个区域会在你输入时展开和收缩。想要了解更多信息，你可以查看 [富文本编辑器示例](https://flutter.github.io/samples/rich_text_editor.html)。

## Material Design 3 支持

Flutter 团队持续地在整合更多 Material Design 3 的组件到 Flutter 中。本次更新包括了[IconButton](https://api.flutter.dev/flutter/material/IconButton-class.html) 的中等和扩大样式。

想要跟踪 Material Design 3 的整合进度，你可以在 GitHub 上查看 [将 Material 3 带到 Flutter](https://github.com/flutter/flutter/issues/91605)。

### IconButton 示例

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image9.png)

### Chip 示例

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image5.png)

### 中型和大型 AppBar 示例

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image8.gif)

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image3.gif)

## 桌面端平台

### Windows

在先前构建 Windows 桌面应用时，应用的版本只能在文件中进行设置。这样的行为与其他平台上设置版本的行为并不一致。

现在 Windows 桌面应用的版本可以通过 `pubspec.yaml` 和构建参数进行设置。它有助于当你的应用推送了更新时，在应用中为你的用户提供应用更新功能。

想要了解更多关于设置 Windows 桌面应用版本的内容，请查看 [文档](https://docs.flutter.cn/deployment/windows%23updating-the-apps-version-number)。Flutter 3.3 前创建的项目需要手动进行调整才能使用这项功能。

## Packages 更新

### go\_router 发布

当你的应用包含复杂的导航需求时，它可能会让你晕头转向。为了扩展 Flutter 的导航 API，团队发布了新版本的 [go\_router package](https://pub.flutter-io.cn/packages/go_router)，让你在所有平台的路由逻辑设计变得更加简洁。

go\_router package 由 Flutter 团队进行维护，通过声明式和基于 URL 的 API 让导航和 deep links 的处理变得更加轻松。最新的 5.0 版本让应用可以通过异步代码进行重定向，其中还包含了一些 [破坏性改动]({{site.flutter-files-cn}}flutter-design-docs/[Draft]Go_Router%205.0%20migration%20guide%20(PUBLICLY%20SHARED).docx)。

更多内容请查看官方文档：[路由和导航](https://docs.flutter.cn/development/ui/navigation)。

## VS Code 插件增强

VS Code 的 Flutter 扩展也带来了添加依赖的更新。你可以使用 `Dart: Add Dependency` 命令加上逗号一次性添加多个依赖。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image1.gif)

你可以查看以下内容了解自上一个 Flutter 稳定版本发布以来所有 VS Code 的 Flutter 插件的更新：

* [VS Code extensions v3.46](https://groups.google.com/g/flutter-announce/c/u1iSDMtKMVg)
* [VS Code extensions v3.44](https://groups.google.com/g/flutter-announce/c/x4m9o93-Dng)
* [VS Code extensions v3.42](https://groups.google.com/g/flutter-announce/c/45Wsk5pISx4)

## Flutter 开发者工具更新

自上次 Flutter 发布稳定版以来，DevTools 同样也包含数次更新，包括数据表格展示的用户体验和性能的提升，还有在滚动事件的长列表时减少卡顿 \([#4175](https://github.com/flutter/devtools/pull/4175)。

以下是自 Flutter 3.0 以来 DevTools 各个版本更新的公告内容：

* [Flutter DevTools 2.16.0 发行注记](https://docs.flutter.cn/development/tools/devtools/release-notes/release-notes-2.16.0)
* [Flutter DevTools 2.15.0 发行注记](https://docs.flutter.cn/development/tools/devtools/release-notes/release-notes-2.15.0)
* [Flutter DevTools 2.14.0 发行注记](https://docs.flutter.cn/development/tools/devtools/release-notes/release-notes-2.14.0)

## 性能改进

### Raster 缓存改善

本次更新提升了加载资源图片的性能，减少了图片数据的拷贝和 Dart 垃圾回收 \(GC\) 的压力。先前在加载资源图片时，`ImageProvider` 需要复制多次压缩的数据。首先，打开图片时数据会被拷贝至原生的堆内存并向 Dart 暴露出结构数组。然后，数据会在结构数组转换至内置存储的 `ui.ImmutableBuffer` 时被再次拷贝。

随着 [新增的 ui.ImmutableBuffer.fromAsset 的引入](https://github.com/flutter/engine/pull/32999)。这个加载过程同时也会更加快速，因为它会绕过之前方法通道所需的额外调度的开销。特别是在我们的基准测试中，图片的加载速度提升为原先的 2 倍左右。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image2.png)

更多相关信息，请查看官方文档：[添加 ImageProvider.loadBuffer](https://docs.flutter.cn/release/breaking-changes/image-provider-load-buffer)。

## 框架稳定性

### 禁用 iOS 内存指针压缩

在 Flutter 2.10 稳定版的发布中，我们为 iOS 启用了 Dart 的内存指针压缩优化。但是，Yeatse 在 GitHub 上[提醒我们这项优化中包含了我们并未预料到的后果](https://github.com/flutter/flutter/issues/105183)。Dart 通过为堆保持一个大的虚拟内存来实现指针压缩。由于 iOS 上允许的总虚拟内存少于其他平台，因此其他例如 Flutter 插件之类的组件可持有的虚拟内存便减少了。

虽然禁用了指针压缩会增加 Dart 对象消费的内存，但是它也恢复了 Flutter 应用可用的非 Dart 部分的内存，总体来说是更合适的方案。

应用可以增加最大虚拟内存的分配量，但这项操作仅在较新的 iOS 版本上可用，并不适用于其他 Flutter 支持的 iOS 设备版本。当我们能够在所有位置使用这项优化时，我们会重新进行评估。

## API 改进

### PlatformDispatcher.onError

在先前的版本中，你需要手动配置一个自定义的 Zone 来捕获应用的所有异常和错误。然而，自定义的 Zone 并不适用于 Dart 核心库中的一些优化，会减慢应用的启动时间。在本次更新中，你可以通过设置 PlatformDispatcher.onError 回调来捕获所有的错误和异常，代替自定义的 Zone。更多内容请查看已经更新的官方文档：[在 Flutter 里处理错误](https://docs.flutter.cn/testing/errors)。

### FragmentProgram 更新

用 GLSL  编写的并且在 `pubspec.yaml` 的 `shader:` 部分声明的片段着色器 \(Fragment shader\) 现在会自动编译成引擎可以正确识别的格式，并且自动绑定为应用的资源。有了这项改动，开发者无需再使用三方工具编译着色器。在未来，引擎的 FragmentProgram API 可能只能接受来自 Flutter 的工具构建。目前我们还没应用这项更改，但如 [FragmentProgram API 改进支持的设计文档]({{site.flutter-files-cn}}flutter-design-docs/FragmentProgram_Support_Improvements%20(PUBLICLY_SHARED).pdf) 中所计划的，有可能在未来实行。

想要了解更多内容，你可以查看这个 [Flutter 着色器示例](https://github.com/zanderso/fragment_shader_example)。

### 布局小数处理

在先前的版本中，Flutter 引擎会将合成层精准地对齐像素，用于提升 Flutter 在旧款 iPhone \(32 位\) 上的渲染性能。而在我们添加桌面平台的支持后，我们注意到这项操作会导致肉眼可见的抖动，因为桌面平台的是设备像素比通常会更低。例如在较低的 DPR 设备上，提示会在渐入时产生的明显抖动。在确定更新的 iPhone 设备并不需要这项优化后，我们已[从 Flutter 引擎中将其移除](https://github.com/flutter/flutter/issues/103909)，来改善桌面端的渲染保真度。

此外我们还发现，将这些像素对齐移除后，先前在黄金镜像测试 \(golden image test\) 时候出现的细微渲染差异也变得更稳定了。

### 停止支持 32 位 iOS

在我们发布 Flutter 3.0 时曾经提到，由于使用量的减少，3.0 版本是最后一个支持 32 位 iOS 设备以及 iOS 9 和 10 的版本。这个改动将会影响  iPhone 4S、iPhone 5、 iPhone 5C 以及第 2、3、4 代 iPad 设备。Flutter 3.3 稳定版以及之后的稳定版将不再支持 32 位 iOS 设备以及 iOS 9 \& 10。这意味着使用 Flutter 3.3 及之后构建的应用将不能再上述设备上运行。

### macOS 10.11 和 10.12 的支持进入尾声

在即将到来的 2022 第四季度的正式版发行计划中，我们将放弃对 macOS 版本 10.11 和 10.12 的支持。这意味着在此之后的 Flutter SDK 稳定版将不能在这些版本上运行，Flutter 最低支持的 macOS 版将上升为 10.13 High Sierra。

### 停止支持 Bitcode

[即将发布的 Xcode 14 将不再支持提交含有 Bitcode 的 iOS 应用](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes)，这个版本的 Xcode 会对开启了 bitcode 的项目发出警告。因此 Flutter 将会在未来的稳定发行版中移除对 bitcode 的支持。我们不希望影响到很多的开发者，因此默认情况下，Flutter 将不会开启 bitcode。然而，如果你手动在 Xcode 项目中开启了 bitcode，请尽快在升级到 Xcode 14 之后关闭它。

你可以打开 `ios/Runner.xcworkspace` 并在 build setting 中将 Enable Bitcode 设置为 No 以关闭它。混合开发应用可以在宿主工程的 Xcode 项目中关闭它。

![]({{site.flutter-files-cn}}posts/flutter-cn/2022/whats-new-in-flutter-3-3/image4.png)

你可以查阅 [Apple 文档](https://help.apple.com/xcode/mac/11.0/index.html?localePath%3Den.lproj%23/devde46df08a) 了解更多关于 bitcode 分发的内容。

## 结语

Google Flutter 团队非常感谢社区中的每一位成员们为了让 Flutter 的体验变得更好所付出的所有努力，我们期待在已完成的工作上继续努力，并且我们始终重视我们最重要最宝贵的财富——社区中的每一位成员！

---

> **原文链接**: 
>
> https://medium.com/flutter/whats-new-in-flutter-3-3-893c7b9af1ff
>
> **本地化**: CFUG 团队: @AlexV525、@chenglu、@Vadaski、@Nayuta403
>
> **中文链接**: https://flutter.cn/posts/whats-new-in-flutter-3-3
