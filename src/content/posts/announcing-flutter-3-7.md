---
title: Flutter 3.7 正式发布
description: Flutter 3.7 正式发布
toc: true
---

文/ Kevin Chisholm，Flutter & Dart TPM

新年伊始，由 Flutter 3.7 正式版来「打头阵」！我们与整个 Flutter 社区们继续在 Flutter 3.7 中优化了框架，包括创建自定义菜单栏和层叠式菜单、更好的国际化工具支持、新的调试工具以及其他功能和特性等。

![]({{site.flutter-files-cn}}/posts/images/2023/01/36024c875a435.jpg)

新的稳定版里，我们在持续改进一些特性，例如全局文本选择、Impeller 渲染速度、DevTools 以及一直以来都在优化的性能。让我们一起来快速探索 Flutter 3.7 的新特性吧！

## 增强对 Material 3 的支持

在 Flutter 3.7 中，以下的 widget 已经进行了 Material 3 的适配：

-  [`Badge`](https://api.flutter.cn/flutter/material/Badge-class.html)
-  [`BottomAppBar`](https://api.flutter.cn/flutter/material/BottomAppBar-class.html)
-  [`Filled`](https://api.flutter.cn/flutter/material/FilledButton-class.html) and [`Filled Tonal`](https://api.flutter.cn/flutter/material/FilledButton/FilledButton.tonal.html) buttons
-  [`SegmentedButton`](https://api.flutter.cn/flutter/material/SegmentedButton-class.html)
-  [`Checkbox`](https://api.flutter.cn/flutter/material/Checkbox-class.html)
-  [`Divider`](https://api.flutter.cn/flutter/material/Divider-class.html)
-  [`Menus`](https://api.flutter.cn/flutter/material/MenuBar-class.html)
-  [`DropdownMenu`](https://api.flutter.cn/flutter/material/DropdownMenu-class.html)
-  [`Drawer`](https://api.flutter.cn/flutter/material/Drawer-class.html) and [`NavigationDrawer`](https://api.flutter.cn/flutter/material/NavigationDrawer-class.html)
-  [`ProgressIndicator`](https://api.flutter.cn/flutter/material/ProgressIndicator-class.html)
-  [`Radio`](https://api.flutter.cn/flutter/material/Radio-class.html) buttons
-  [`Slider`](https://api.flutter.cn/flutter/material/Slider-class.html)
-  [`SnackBar`](https://api.flutter.cn/flutter/material/SnackBar-class.html)
-  [`TabBar`](https://api.flutter.cn/flutter/material/TabBar-class.html)
-  [`TextFields`](https://api.flutter.cn/flutter/material/TextField-class.html) and [`InputDecorator`](https://api.flutter.cn/flutter/material/InputDecorator-class.html)
-  [`Banner`](https://api.flutter.cn/flutter/widgets/Banner-class.html)

你可以直接在应用中的 [`ThemeData`](https://api.flutter.cn/flutter/material/ThemeData-class.html) 里设置 [`useMaterial3`](https://api.flutter.cn/flutter/material/ThemeData/useMaterial3.html) 来启用 Material 3。只有在完整的颜色方案下才能展现出 Material 3 最完整的细节，你可以使用新的 [Material 主题构建器](https://m3.material-io.cn/theme-builder#/custom) 生成你的主题配置，也可以通过 Flutter [`ThemeData`](https://api.flutter.cn/flutter/material/ThemeData-class.html) 构造中的 `colorSchemeSeed` (颜色种子) 自动生成一整套的主题：

```dart
MaterialApp(
  theme: ThemeData(
     useMaterial3: true,
    colorSchemeSeed: Colors.green,
  ),
  // …
);
```

若想了解 Flutter 在 Material 3 上的支持进度，你可以在 GitHub 上查看 [flutter #91605 号议题](https://github.com/flutter/flutter/issues/91605)。

你也可以尝试 [Material 3 示例](https://flutter-experimental-m3-demo.web.app/#/)，其中展示了所有主题的特性。

![]({{site.flutter-files-cn}}/posts/images/2023/01/edc093ab9959d.gif)

## 菜单栏和级联菜单

Flutter 现在可以创建菜单栏和级联菜单了。

在 macOS 上，你可以使用 `PlatformMenuBar` widget 来创建菜单栏，你的菜单栏将由 macOS 系统来渲染，而不是使用 Flutter。

此外，对于所有其他的平台，你可以定义一个 [Material Design 菜单](https://m3.material-io.cn/components/menus/overview)，它提供了级联菜单栏 ([`MenuBar`](https://api.flutter.cn/flutter/material/MenuBar-class.html))，或者使用由 UI 界面元素触发的  ([`MenuAnchor`](https://api.flutter.cn/flutter/material/MenuAnchor-class.html)) 来创建一个级联菜单。这些菜单都是完全可自定义的，其中的菜单项可以是自定义的 widget，也可以使用新的菜单项 widget: ([`MenuItemButton`](https://api.flutter.cn/flutter/material/MenuItemButton-class.html) 和 [`SubmenuButton`](https://api.flutter.cn/flutter/material/SubmenuButton-class.html))。

![]({{site.flutter-files-cn}}/posts/images/2023/01/f15288d8fe378.png)

## Impeller 预览版

Flutter 团队很高兴能 [在稳定版渠道上](https://github.com/flutter/engine/tree/main/impeller#try-impeller-in-flutter) 为大家带来 iOS 平台的 [Impeller 渲染引擎](https://github.com/flutter/engine/tree/main/impeller) 预览。我们认为 Impeller 的性能已经达到甚至超越了大部分现有应用上的 Skia 渲染。在图像保真方面，Impeller 也已覆盖了大部分除极端条件以外的应用场景。我们希望能够在之后的稳定版本中将 Impeller 作为 iOS 平台的默认渲染引擎，如果你在体验时有任何问题，请继续 [在 GitHub 上提交 Impeller 的相关反馈](https://github.com/flutter/flutter/issues)。

尽管我们对 iOS 上 Impeller 满足现有应用的渲染需求有足够的自信，但仍然有部分 API 需要进行补充。你可以在 [Flutter wiki 文档](https://github.com/flutter/flutter/wiki/Impeller#status) 上看到目前 Impeller 的进度。用户及开发者在使用时可能会注意到 Impeller 与 Skia 之间的渲染细节区别，这些区别可能是 BUG，当你遇到时请记得 [提交反馈](https://github.com/flutter/flutter/issues) 帮助我们定位并修复它。

Impeller 的进展飞速离不开社区贡献者的支持。尤其是 [ColdPaleLight](https://github.com/ColdPaleLight)、[guoguo338](https://github.com/guoguo338)、[JsouLiang](https://github.com/JsouLiang) 以及 [magicianA](https://github.com/magicianA) 这些开发者，在此次发布版本的 Impeller 的 291 次提交中有 31 次 (>12%) 是他们提交的。非常感谢他们的帮助！

我们也在继续推进 Vulkan 作为 Impeller 的渲染后端 (在一些老的设备上会降级到 OpenGL)，但是 Android Impeller 尚未准备好进行公开预览。我们会在未来的发布中分享更多正在积极进行的 Impeller 开发进程，包括桌面和 Web 平台的支持。

若你感兴趣，可以关注 GitHub 上的 [Impeller 项目板](https://github.com/orgs/flutter/projects/21) 来跟进开发进度。

## iOS 发布校验

当你在构建一个发布版本的 iOS 应用时，Flutter 会为你提供 [项目设置检查清单](https://docs.flutter.cn/deployment/ios#review-xcode-project-settings) 来确保你的应用已经准备好发布到 App Store。

现在 `flutter build ipa` 命令会校验项目的一部分设置，并且在清单中告知你在发布前进行更改。

![]({{site.flutter-files-cn}}/posts/images/2023/01/e51530946f812.png)

## 开发者工具更新

在本次发布中，开发工具也带来了新的特性和体验优化。DevTools 的内存调试工具已经完成了一轮全面的调整。我们带来了三个新的选项卡：**Profile**、**Trace** 和 **Diff**，它们包含了先前的所有内存调试功能，也添加了更多利于调试的操作。现在你可以按照类或者内存类型对当前的内存分配进行分析，可以在运行时分析哪些代码调用了哪些部分的内存，也可以对比两个不同时间点的内存快照之间的差异来了解内存使用的细节。

![]({{site.flutter-files-cn}}/posts/images/2023/01/0498c7b2659ab.png)

以上的这些内存特性已经在 [文档](https://docs.flutter.cn/development/tools/devtools/memory) 中进行了介绍，若你感兴趣可以前往了解更多细节。

性能页面也有一些值得注意的新功能，该页面现在在顶部新增了 **Frame Analysis** (帧分析) 选项卡，它能够提供在 Flutter 中详细追踪大量消耗的某些帧和操作的一些建议。

![]({{site.flutter-files-cn}}/posts/images/2023/01/b5ab5668cac60.png)

除了以上的新功能，本次更新还有其他的问题修复和优化改进，包括查看器 (Inspector)、网络记录器的 CPU 记录器的问题修复。你可以查看下面的 DevTools 更新日志了解更多细节。

- [Flutter DevTools 2.17.0 发行注记](https://docs.flutter.cn/development/tools/devtools/release-notes/release-notes-2.17.0)
- [Flutter DevTools 2.18.0 发行注记](https://docs.flutter.cn/development/tools/devtools/release-notes/release-notes-2.18.0)
- [Flutter DevTools 2.19.0 发行注记](https://docs.flutter.cn/development/tools/devtools/release-notes/release-notes-2.19.0)
- [Flutter DevTools 2.20.0 发行注记](https://docs.flutter.cn/development/tools/devtools/release-notes/release-notes-2.20.0)

## 自定义上下文菜单

从新版本开始，你可以在 Flutter 应用的任意位置创建自定义的上下文菜单，也可以自定义内置的上下文菜单。

举例来说，你可以在用户选中邮件地址时，为文本框默认的选择菜单添加「发送邮件」的按钮 ([代码地址](https://github.com/flutter/samples/blob/main/experimental/context_menus/lib/email_button_page.dart))。[`contextMenuBuilder`](https://master-api.flutter-io.cn/flutter/cupertino/CupertinoTextField/contextMenuBuilder.html) 参数也已经添加到现有包含上下文菜单的 widget 中。你可以在 `contextMenuBuilder` 中返回任何你想返回的 widget，也包括平台自适应的上下文菜单。

![]({{site.flutter-files-cn}}/posts/images/2023/01/ffb979eb8fa7d.gif)

这一新特性也可以用于文本选择以外的场景。例如，你可以为一个 `Image` widget 的右键和长按操作添加「保存」按钮 ([代码地址](https://github.com/flutter/samples/blob/main/experimental/context_menus/lib/image_page.dart))。你也可以使用 [`ContextMenuController`](https://api.flutter.cn/flutter/widgets/ContextMenuController-class.html) 在应用内的任意位置展示平台默认或者自定义的上下文菜单。

![]({{site.flutter-files-cn}}/posts/images/2023/01/0332c5f7dcc77.gif)

若想查看完整的示例，前往 [Flutter 示例代码仓库](https://github.com/flutter/samples/tree/main/experimental/context_menus) 了解更多。

## CupertinoListSection 和 CupertinoListTile widget

Cupertino 系列 widget 迎来了两位新成员： [`CupertinoListSection`](https://github.com/flutter/flutter/pull/78732) 和[`CupertinoListTile`](https://github.com/flutter/flutter/pull/78732)，可用于展示 iOS 风格的滚动列表内容。它们是 Cupertino 版本的 `ListView` 和 `ListTile`。

![]({{site.flutter-files-cn}}/posts/images/2023/01/3835e17a8e8ba.png)

![]({{site.flutter-files-cn}}/posts/images/2023/01/708e171743d27.png)

## 滑动优化

此次版本发布中也包含了众多 [滑动相关的问题](https://github.com/flutter/flutter/issues?page=1&q=is%3Aissue+is%3Aclosed+closed%3A2022-07-11..2022-11-30+label%3A%22f%3A+scrolling%22+reason%3Acompleted) 修复，包括触控板的交互优化以及在滑动组件中文本选择时的行为。

值得注意的是，macOS 的应用现在可以通过 [新物理滑动特性](https://github.com/flutter/flutter/pull/108298) 来体验与其有更高匹配度的滑动体验。

新的 [`AnimatedGrid`](https://github.com/flutter/flutter/pull/112982) 和 `SliverAnimatedGrid` 可以用于为新增和移除的内容展示动画。

![]({{site.flutter-files-cn}}/posts/images/2023/01/8f8ba42208951.gif)

最后，我们 [修复了](https://github.com/flutter/flutter/pull/108706) 自 Flutter 迁移至健全的空安全以来的一个问题，该问题影响了所有包含 `itemBuilder` 参数的滑动 widget (例如 `ListView`)。在迁移至空安全时，`itemBuilder` 的类型迁移至了 `IndexedWidgetBuilder`，即不允许返回 `null`，而在以前 `null` 可以用来代表列表已经到了底部等。该参数现已修改为 `NullableIndexedWidgetBuilder`。感谢 @rrousselGit 发现并修复了这个问题！

## 国际化工具和文档

Flutter 对国际化的支持已经焕然一新！我们对 `gen-l10n` 进行了重写以支持下述特性：

- 描述性的语法错误
- 嵌套或多个复数、选择和占位的消息内容

![]({{site.flutter-files-cn}}/posts/images/2023/01/93b17a42072f8.png)

更多内容可以了解已经更新的 [Flutter 应用里的国际化](https://docs.flutter.cn/development/accessibility-and-localization/internationalization) 文档。

## 全局的选择优化

`SelectionArea` 现在已支持键盘操作。你可以通过键盘快捷键 `Shift+→` 等快捷键进行选择。

## 后台 isolate

现在 [平台通道](https://docs.flutter.cn/development/platform-integration/platform-channels) 可以在 [任意 isolate](https://docs.flutter.cn/development/packages-and-plugins/background-processes) 中进行调用。先前平台通道只能在主 isolate 中进行调用。优化后会让插件和混合开发调用 isolate 和宿主平台代码更加简单。更多内容可以阅读 [撰写平台代码](https://docs.flutter.cn/development/platform-integration/platform-channels) 文档以及 [介绍后台 isolate 通道](https://medium.com/flutter/introducing-background-isolate-channels-7a299609cad8) 文章。

## 文本放大镜

在 Android 和 iOS 上进行文本选择时会出现的放大镜现在也会在 Flutter 中出现了。它已经添加至了所有的文本选择，但是你也可以通过 [`magnifierConfiguration`](https://api.flutter.cn/flutter/material/TextField/magnifierConfiguration.html) 禁用或者自定义。

![]({{site.flutter-files-cn}}/posts/images/2023/01/c375f8ae339e9.gif)

![]({{site.flutter-files-cn}}/posts/images/2023/01/bde08a1b5a13a.gif)

## 插件代码迁移至 Swift

Apple 整将它们的代码迁移至 Swift，我们也希望能为开发者构建 Swift 插件的示例和指导。[quick_actions](https://pub.flutter-io.cn/packages/quick_actions) 已经从 Objective-C 迁移至了 Swift，也可以作为 Swift 插件的最佳实践。如果你对帮助 Flutter 迁移第一方插件至 Swift 感兴趣，请参考 [wiki 中的 Swift 迁移部分](https://github.com/flutter/flutter/wiki/Contributing-to-Plugins-and-Packages#swift-migration-for-1p-plugins)。

**给 iOS 开发者准备的资源**

我们新发布了一系列为 iOS 开发者准备的资源，包括：

- [给 SwiftUI 开发者的 Flutter 指南](https://docs.flutter.cn/get-started/flutter-for/swiftui-devs)
- [给 Swift 开发者的 Dart 指南](https://dart.dev/guides/language/coming-from/swift-to-dart)
- [给 Swift 开发者的 Flutter 并发开发指南](https://docs.flutter.cn/resources/dart-swift-concurrency)
- [将 Flutter 添加到现有的 SwiftUI 应用中](https://docs.flutter.cn/development/add-to-app/ios/add-flutter-screen)
- [为 Flutter 创建多渠道](https://docs.flutter.cn/deployment/flavors) (针对 Android 和 iOS)

## 废弃 Bitcode

从 Xcode 14 开始，watchOS 和 tvOS 的应用不再需要 bitcode，并且 App Store 也不再接收带 bitcode 的应用提交。因此，Flutter 也移除了 bitcode 的支持。

Bitcode 在 Flutter 应用中默认是关闭的，所以这也不应该会影响太多开发者的项目。但是，如果你曾经为你的项目手动启用过 bitcode，请尽快在升级到 Xcode 14 后关闭 bitcode。你可以使用 Xcode 打开 `ios/Runner.xcworkspace` 找到 **Enable Bitcode** 设置为 **No**，混合开发项目需要在宿主项目中禁用。

![]({{site.flutter-files-cn}}/posts/images/2023/01/bda59d271dcb8.png)

## iOS 平台视图应用 BackdropFilter

我们为 iOS 原生视图添加了可以渲染高斯模糊的特性，现在嵌套在 `BackdropFilter` 中的 `UiKitView` 可以正确的渲染高斯模糊了。

![]({{site.flutter-files-cn}}/posts/images/2023/01/991e1cff34251.png)

你可以查看相应的 [设计文档]({{site.flutter-files-cn}}/flutter-design-docs/Flutter_iOS_PlatformView_BackdropFilter.pdf) 了解更多。

## 内存管理

此次发布的版本对内存管理做了一些改进，这些改进的共同作用是减少由 GC 暂停引起的卡顿、减少由于分配速度和后台 GC 线程引起的 CPU 占用，并且降低内存占用。

例如，我们扩展了现有手动释放某些 `dart:ui` Dart 对象的本地资源的实践。先前在 Dart VM 垃圾回收 Dart 对象前，本地资源都将被 Flutter 引擎持有。通过对用户应用程序和我们的 benchmarks 分析，我们认为这种策略很多时候无法避免不合适的 GC 和过度使用内存。因此在此次更新中 Flutter 引擎添加了 API ，用于显式释放由 `Vertices`、`Paragraph` 和 `ImageShader` 对象持有的本地资源。

![]({{site.flutter-files-cn}}/posts/images/2023/01/2435f5771a7c2.png)

在我们迁移到此 API 的 Flutter 框架的 benchmarks 中，将 90% 的帧构建时间减少了 30% 以上，最终用户将体验到更流畅的动画和更少的卡顿。

此外，Flutter 引擎 [不再上报](https://github.com/flutter/engine/pull/35473) Dart VM 中的 GPU 图像的大小。如上所述，当这些图像资源不再被需要时已由框架手动释放，如果这时继续按照 GPU 内存大小的 GC 策略上报至 Dart，会导致不必要的堆内存压力并进一步触发无效的 GC。类似的方法同样应用到了 Flutter 引擎中，用于回收 `dart:ui` 原生对象的 [隐式内存占用](https://github.com/flutter/engine/pull/35813)。

![]({{site.flutter-files-cn}}/posts/images/2023/01/9635c0a4f4bf6.png)

在我们的测试中，此更改省去了 widget 创建 GPU 常驻图像构建帧时的同步 GC 工作。

本次版本发布中，Flutter 引擎在动态更新应用状态至 Dart VM 方面有所进步。具体来说，Flutter 现在会使用 Dart VM 中 [RAIL 风格](https://web.dev/rail/) 的 [API](https://github.com/dart-lang/sdk/commit/c6a1eb1b61844b2d733f9e2f4c7754f1920325d7)，让 [路由转场时渲染延迟更低](https://github.com/flutter/flutter/pull/110600)，即让堆内存在转场时保持增长而不是进行 GC，避免造成动画的卡顿。目前这项改动不会带来太大的性能优化，但未来我们会将这项改进拓展到其他方法上，消除由 GC 带来的卡顿影响。此外，我们还修复了向 Dart VM 报告 Flutter 引擎已经闲置的 [一处逻辑错误](https://github.com/flutter/engine/pull/37737)，也减少了 GC 带来的卡顿。最后，在 Flutter 视图不再展示时，也会 [通知 Dart VM](https://github.com/flutter/engine/pull/37539) 进行处理，进一步优化了 Flutter 视图未显示时的内存占用。

## 放弃对 macOS 10.11 到 10.13 版本的支持

我们在 [Flutter 3.3 发布的文章](https://mp.weixin.qq.com/s/-AYFnatRYNARGTxhzSY9Lg) 中提到过，Flutter 将不再支持 macOS 的 10.11 和 10.12 版本，自上个版本发布以来，通过进一步的 [分析发现](https://github.com/flutter/flutter/issues/114445)，放弃对 macOS 10.13 的支持也不会造成太大影响，带来的收效却是可以帮助大幅简化代码库。这意味着，使用 Flutter 3.7 以及后续版本构建的桌面端应用程序将不能再在 macOS 10.11、10.12、10.13 版本中运行，Flutter 对 macOS 的最低10点要求版本提升至 macOS Mojave 10.14。

至此，Flutter 构建的 iOS 和 macOS 应用都已经包含了 Metal 的支持，OpenGL 后端渲染引擎已经从 iOS 和 macOS 嵌入器层被移除，移除后，压缩后的 Flutter 引擎体积降低了大约 100KB。

## 将 toImageSync 新增至 dart:ui 中

本次版本发布，将 `Picture.toImageSync` 和 `Scene.toImageSync` 方法直接加入到了 `dart:ui`，类似于 `Picture.toImage` 以及 `Scene.toImage.` 这样的异步方法，Picture.toImageSync 会直接返回一个 `Picture` 转 Image 的一个句柄，并在后台异步对 Image 进行光栅化。

当 GPU context 可用时，图像会在 GPU 中常驻，这意味着与 `toImage` 生成的图像相比它的绘制速度会更快。(toImage 生成的图像也可以实现 GPU 常驻，但目前还未实现)。

新的 `toImageSync` API 支持的例子：

- 快速捕捉一张昂贵的栅格化图片，以便跨多帧重复使用。
- 应用在图片的多路过滤器上
- 应用在自定义着色器上

一个例子是，Flutter 框架现已使用这个 API 以优化 Android 上的页面切换动画的性能，几乎减少了帧光栅化一半的时间且减少了卡顿，而且在支持这些刷新率的机器上动画可以达到 90 / 120 FPS。

## 自定义着色器支持的改进

本次发行版包含了许多关于 Flutter 对自定义着色器片段的优化支持。Flutter SDK 现已内置了一个着色器编译器，能够将 `pubspec.yaml` 文件中列出的 GSGL 着色器编译为目标平台的正确的平台特定对应的格式。此外，自定义着色器能够在开发阶段方便的执行 hot reload。自定义着色器目前已经在 iOS 上对 Skia 以及 Impeller 都支持了。

我们为社区中分享的样例感到印象深刻，期待能够未来能有更多关于 Flutter 中的自定义着色器的创意。

- [https://twitter.com/reNotANumber/status/1599717360096620544](https://twitter.com/reNotANumber/status/1599717360096620544)
- [https://twitter.com/reNotANumber/status/1599810391625719810](https://twitter.com/reNotANumber/status/1599810391625719810)
- [https://twitter.com/wolfenrain/status/1600242975937687553](https://twitter.com/wolfenrain/status/1600242975937687553)
- [https://twitter.com/iamjideguru/status/1598308434608283650](https://twitter.com/iamjideguru/status/1598308434608283650)
- [https://twitter.com/rxlabz/status/1609975128758026247](https://twitter.com/rxlabz/status/1609975128758026247)
- [https://twitter.com/RealDevOwl/status/1528357506795421698](https://twitter.com/RealDevOwl/status/1528357506795421698)
- [https://twitter.com/TakRutvik/status/1601380047599808513](https://twitter.com/TakRutvik/status/1601380047599808513)
- [https://twitter.com/wolfenrain/status/1600601043477401606](https://twitter.com/wolfenrain/status/1600601043477401606)

请参阅 [文档网站上的文档](https://docs.flutter.cn/development/ui/advanced/shaders) 以及 pub.dev 上的 
[`flutter_shaders`](https://pub.flutter-io.cn/packages/flutter_shaders) package 了解更多。

## 字体资源支持热重载

在过去，将新的字体资源加入到 `pubspec.yaml` 文件的时候会需要重新构建应用后才能查看，不像其他资源可以直接热重载生效，现如今，字体清单文件的修改 (包括添加新字体) 后，也可以直接热重载到应用中立刻可见了。

## 减少 iOS 设备上动画效果的卡顿

有两项重要的来自社区成员 luckysmg 的贡献，帮助减少了 iOS 设备上动画效果的卡顿。特别是在 iOS 手势交互期间在主线程上添加一个虚拟的 `CADisplayLink` 以强制设定最大刷新率。此外，键盘动画也通过 `CADisplayLink` 设定了与 Flutter 引擎里 animator 相同的刷新率。由于新加入了这些变化，用户可以在 120Hz 的 iOS 设备上感受到更一致和流畅的动画效果。

## 结语

还是那句话，如果没有 Flutter 社区中优秀、热情贡献者们，Flutter 不会像现在这样优秀，在我们未来持续进行的这段旅程中，我们希望你可以知道，没有你们，我们无法做出这样的优秀成绩。感恩每一位贡献者！

我们的发展势头依旧，请期待未来的更新！

## 致谢

感谢来自 CFUG 社区的 Alex、Luke、迷鹿、鑫磊 对本文的翻译和审校
