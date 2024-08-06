---
title: Flutter 3.24 更新详解
toc: true
---

![](https://img-s2.andfun.cn/devrel/posts/2024/08/54348384c0bf3.png)

欢迎了解最新的 Flutter 更新！Flutter 3.24 包含了令人兴奋的新功能和增强，可以提升你的应用开发体验。本次发布的亮点包括 Flutter GPU 预览版，它可以直接在 Flutter 中实现高级图形和 3D 场景渲染。Web 应用现在可以嵌入多个 Flutter 视图，增强了应用的多功能性。此外，我们还添加了视频广告变现支持，帮助你最大化收入。

过去几个月，Flutter 社区异常活跃，共有 852 个框架提交和 615 个引擎提交。我们很高兴欢迎 49 名新的贡献者，他们为这个版本的实现做出了贡献。正是你们的奉献和热情推动着 Flutter 不断向前发展。

现在就来了解 Flutter 社区为这个最新版本带来的所有新功能和增强吧！

## Flutter 框架

### 新的 Sliver 组件

这个版本添加了新的 Sliver 组件，可以组合使用以实现动态应用栏行为:

- SliverFloatingHeader
- PinnedHeaderSliver  
- SliverResizingHeader

你可以使用这些新的 Sliver 组件来创建在用户滚动时浮动、保持固定或调整大小的头部。这些新的 Sliver 与现有的 `SliverPersistentHeader` 和 `SliverAppBar` 类似，但 API 更简单，可以组合使用以实现更好的效果。

这些新的 Sliver 还附带了新的示例代码。例如，`PinnedHeaderSliver` 的 API 文档中有一个示例，重新创建了类似 iOS 设置应用的应用栏效果:

![](https://img-s2.andfun.cn/devrel/posts/2024/08/e842bae66bf85.gif)

### Cupertino 库的更新

在这个版本中，我们改进了 `CupertinoActionSheet` 的保真度。现在在操作表的按钮上滑动手指会提供触觉反馈。按钮的字体大小和粗细现在与原生对应部分匹配。

![](https://img-s2.andfun.cn/devrel/posts/2024/08/e9d493139bfb3.gif)

我们还为 `CupertinoButton` 添加了新的聚焦属性，你现在可以自定义禁用状态下 `CupertinoTextField` 的颜色。

Cupertino 库正在进行全面更新，未来的版本中会有更多改进！

### TreeView 

`two_dimensional_scrollables` package 发布了 `TreeView` widget，以及几个配套类，用于构建可以在所有方向滚动的高性能树形结构。package 中的示例应用也更新了几个新的使用 `TableView` 和 `TreeView` widgets 的示例。

![](https://img-s2.andfun.cn/devrel/posts/2024/08/303bfd3271e04.gif)

框架中还添加了 `TreeSliver`，用于在单维滚动中构建树形结构。`TreeView` 和 `TreeSliver` 的 API 是匹配的，方便你根据用例选择适合的方案。

### CarouselView

这个版本包含了 Material Design 轮播组件:CarouselView。CarouselView 实现了"未限制"布局:一个可滚动的项目列表，滚动到容器边缘，前导和尾随项目在滚出视图和滚入视图时可以动态改变大小。

![](https://img-s2.andfun.cn/devrel/posts/2024/08/b803f1723643b.gif)

### 更多 widget 功能

这个版本包含了一些工作，将核心 widget 逻辑从 Material 库移到 Widgets 库中，以便更通用使用。这包括:

- [`Feedback`](https://github.com/flutter/flutter/pull/148523) widget，提供了对设备触觉和音频反馈的简单访问，响应轻触、长按等手势。
- [`ToggleableStateMixin`](https://github.com/flutter/flutter/pull/148272) 和 [`ToggleablePainter`](https://github.com/flutter/flutter/pull/148272)，用于构建复选框、开关、单选按钮等切换 widget 的基类。

### AnimationStatus 的增强枚举功能

在社区成员 [@nate-thegrate](https://github.com/nate-thegrate) 的出色贡献中，为 [`AnimationStatus`](https://api.flutter.cn/flutter/animation/AnimationStatus.html) 添加了增强的枚举功能，包括以下 getter:

- isDismissed
- isCompleted  
- isRunning
- isForwardOrCompleted

其中一些 getter 已经在 `Animation` 子类中存在，如 `AnimationController` 和 `CurvedAnimation`。现在所有这些状态 getter 除了在 `AnimationStatus` 中可用，在 `Animation` 子类中也可用。最后，为 `AnimationController` 添加了 [`toggle`](https://api.flutter.cn/flutter/animation/AnimationController/toggle.html) 方法来切换动画方向。

### SelectionArea 的更新

Flutter 的 [`SelectionArea`](https://api.flutter.cn/flutter/material/SelectionArea-class.html) 现在支持更多与鼠标三击和触摸设备上双击相关的原生手势。默认情况下，`SelectionArea` 和 `SelectableRegion` widgets 使用这些新手势。

三击
- 三击 + 拖动:以段落块为单位扩展选择。
- 三击:选择点击位置的段落块。

![](https://img-s2.andfun.cn/devrel/posts/2024/08/95483979f7dba.gif)

双击
- 双击 + 拖动:以单词块为单位扩展选择(在原生 Android/Fuchsia/iOS 和 iOS web 上支持)。  
- 双击:选择点击位置的单词(在原生 Android/Fuchsia/iOS 和 Android/Fuchsia web 上支持)。

![](https://img-s2.andfun.cn/devrel/posts/2024/08/549b16fa8dc4f.gif)

## 引擎

### Impeller

**改进性能和保真度**

为了即将在稳定版中移除 iOS 上的 Impeller 选择退出选项，团队一直在努力改进 Impeller 的性能和保真度。例如，一系列对文本渲染的改进大大提高了 emoji 滚动的性能，消除了滚动大量 emoji 时的卡顿，这是对 Impeller 文本渲染能力的绝佳压力测试。

此外，通过解决一系列问题，我们在这个版本中也大大改进了 Impeller 的文本渲染保真度。特别是，文本粗细、间距和字距现在都与旧版渲染器的保真度相匹配。

![改进前（间距不正确，字体粗细也比预期的轻）](https://img-s2.andfun.cn/devrel/posts/2024/08/9e7ebac7eb802.png)

⬆️ ⬇️ 对比

![改进后](https://img-s2.andfun.cn/devrel/posts/2024/08/bec1e7e580ef2.png)

![改进前：（“vergelijken”中的间距不正确）](https://img-s2.andfun.cn/devrel/posts/2024/08/70ac5040977df.png)

![改进后](https://img-s2.andfun.cn/devrel/posts/2024/08/8421dad937376.png)

**Android 上的 Impeller 预览版本**

在这个版本中，我们继续将 Android 上的 Impeller 设定为“预览版本”。由于 Android 14 中的一个 bug 影响了 Impeller 用于平台视图的 API，我们延长了预览期。Android 团队已经修复了这个 bug，但许多已部署的设备在可预见的将来仍将运行未修复的 Android 版本。解决这些问题意味着需要额外的 API 迁移，因此需要额外的稳定版本周期。出于谨慎考虑，为确保 Flutter 应用能在尽可能广泛的设备上工作，我们将推迟到今年晚些时候的稳定版本中将 Impeller 设为默认渲染器。

随着 Impeller 在 Android 上的预览继续进行 3.24 稳定周期，我们请求 Flutter 开发者升级到最新的稳定版本，并在启用 Impeller 时提交发现的任何缺陷问题。这个阶段的反馈对确保 Impeller 在 Android 上的成功至关重要，也让我们能够在今年晚些时候的版本中有信心将其设为默认渲染器。Android 硬件生态系统比 iOS 生态系统更加多样化。因此，关于 Impeller 最有帮助的反馈应该包括发生问题的具体设备和 Android 版本的详细信息。

### 改进了缩小图像的默认设置

在这个版本中，图像的默认 `FilterQuality` 从 `FilterQuality.low` 改为了 `FilterQuality.medium`。当一个大图像比其目标矩形小很多时(这是一种常见场景)，`FilterQuality.low` 会导致图像看起来更 "像素化"，渲染速度也比 `FilterQuality.medium` 慢。展望未来，团队还在探索为各种 `FilterQuality` 级别提供更合适的名称。

### Flutter GPU 预览

Flutter 通过 Flutter GPU 引入了渲染能力的重大更新，现已在主渠道上提供。这个低级图形 API 允许开发者使用 Dart 代码和 GLSL 着色器创建自定义渲染器，而无需任何原生平台代码。

Flutter GPU 扩展了 Flutter 的直接渲染能力，实现高级图形和 3D 场景。它需要 Impeller 渲染后端，目前支持 iOS、macOS 和 Android。尽管处于早期预览阶段，但 Flutter GPU 最终旨在支持所有 Flutter 平台。

该 API 允许完全控制渲染通道附件、顶点阶段和向 GPU 上传数据。这种灵活性对于创建从 2D 角色动画到复杂 3D 场景的复杂渲染解决方案至关重要。

开发者可以通过切换到主渠道并将 `flutter_gpu` package 添加到项目中来开始使用 Flutter GPU。接下来的几个月将看到更多功能和稳定性改进，像 `flutter_scene` 这样的高级渲染库将简化这些高级功能的使用。

要深入了解 Flutter GPU 并了解如何在项目中利用它，请查看详细的 [Flutter GPU 博客文章](https://medium.com/flutter/getting-started-with-flutter-gpu-f33d497b7c11)。无论你是创建游戏还是复杂图形，Flutter 的新 GPU 功能都使其成为你的产品的强大选择。

## Web

### 多视图嵌入

Flutter web 应用现在可以利用多视图嵌入，允许开发者同时将内容渲染到多个 HTML 元素中。这个功能被称为“嵌入模式”或“多视图”，为将 Flutter 视图集成到现有 web 应用中提供了灵活性。

在多视图模式下，Flutter web 应用在启动时不会立即渲染。相反，它会等待主机应用使用 `addView` 方法添加第一个"视图"。主机应用可以动态添加或删除这些视图，Flutter 会相应地调整其 widget。

要启用多视图模式，在 `flutter_bootstrap.js` 文件中的 `initializeEngine` 方法中设置 `multiViewEnabled: true`。然后可以从 JavaScript 管理视图，将它们添加到指定的 HTML 元素中，并根据需要删除它们。每次添加和删除视图都会触发 Flutter 内部的更新，允许动态内容渲染。

这个功能对于将 Flutter 集成到需要多个独立 Flutter 视图的复杂 web 应用中特别有用。它还支持每个视图的自定义初始化数据，实现个性化配置和交互式体验。

要深入了解如何在 Flutter web 应用中实现多视图嵌入，请查看[详细文档](https://docs.flutter.cn/platform-integration/web/embedding-flutter-web)。

## 变现

### 视频广告变现支持

我们推出了一个 [互动式媒体广告 (IMA) 插件](https://pub.flutter-io.cn/packages/interactive_media_ads)，以支持 Flutter 移动应用上的插播视频广告变现。新的 IMA 插件在现有的主要支持展示广告格式的 [Google 移动广告 (GMA)](https://pub.flutter-io.cn/packages/google_mobile_ads) 插件之上提供了新的广告变现机会。

插播视频视频广告通常在视频内容播放前 (前贴片广告)、期间 (中贴片广告) 或之后(后贴片广告)向用户展示。一些插播视频广告也可以跳过。

![](https://img-s2.andfun.cn/devrel/posts/2024/08/209ee815c2e92.gif)

**Flutter IMA 优势**:

- 无缝地在 Flutter 应用的视频播放器内容中变现。例如，当应用用户点击视频内容上的播放时，你现在可以实现 Flutter IMA 插件，在开始视频内容之前先向用户展示 15 秒的广告。
- 利用原生 IMA SDK 的相同优势，包括访问优质 Google 广告需求和行业标准合规性(如 IAB VAST — 交互式广告局视频广告服务模板)。

初始发布版本目前支持 Android 和 iOS 平台上的前贴片视频广告。中贴片广告支持将很快推出。我们鼓励开始在 Flutter 应用的视频内容上探索新的 IMA 插件。如果有任何问题或疑虑，请在 [GitHub](https://github.com/flutter/flutter/issues?q=is%3Aissue+is%3Aopen+label%3A%22p%3A+interactive_media_ads%22) 上告诉我们。

资源: [插件指南](https://pub.flutter-io.cn/packages/interactive_media_ads)、[示例应用](https://pub.flutter-io.cn/packages/interactive_media_ads/example)、[Git 仓库](https://github.com/flutter/packages/tree/main/packages/interactive_media_ads)

## iOS

### Swift Package Manager 初步支持

目前，Flutter 使用 CocoaPods 来管理原生 iOS 或 macOS 依赖。

Flutter 3.24 增加了对 Swift Package Manager 的早期支持。这带来了几个好处，包括:

1. 访问 Swift package 生态系统。Flutter 插件将能够利用不断增长的 [Swift package 生态系统](https://swiftpackageindex.com/)！
2. 简化 Flutter 安装。Swift Package Manager 与 Xcode 捆绑在一起。将来，开发者无需安装 Ruby 和 CocoaPods 就可以在 Apple 平台上使用 Flutter。

我们鼓励插件作者尝试为插件 [添加 Swift Package Manager 支持](https://docs.flutter.cn/packages-and-plugins/swift-package-manager/for-plugin-authors#how-to-add-swift-package-manager-support-to-an-existing-flutter-plugin)，并提供使用体验反馈。

如果对 Flutter 对 Swift Package Manager 的支持有反馈，请 [提交问题](https://github.com/flutter/flutter/issues/new/choose)。

## 生态系统

### Shared Preferences 插件更新

我们为 [shared_preferences](https://pub.flutter-io.cn/packages/shared_preferences) 插件添加了两个新的 `API:SharedPreferencesAsync` 和 `SharedPreferencesWithCache`。最显著的变化是 Android 实现使用 Preferences DataStore 而不是 Shared Preferences。

用户可以使用 `SharedPreferencesAsync` 直接调用平台获取设备上保存的最新首选项，代价是异步和比使用缓存版本稍慢。这对于可以由其他系统或 isolate 更新的首选项很有用，这会使缓存过时。

`SharedPreferencesWithCache` 构建在 `SharedPreferencesAsync` 之上，允许用户同步访问首选项的本地缓存副本。这类似于旧的 API，但现在可以使用不同参数多次实例化。

这些新 API 旨在未来取代当前的 SharedPreferences API。但是，这是生态系统中使用最广泛的插件之一，我们知道生态系统切换到新 API 需要时间。

### 2024 年欧洲 Flutter 和 Dart Package 生态系统峰会

![](https://img-s2.andfun.cn/devrel/posts/2024/08/64ac53908b4e7.png)

作为 2024 年欧洲 Fluttercon 的一部分，我们举办了第一次面对面的 Flutter 和 Dart Package 生态系统峰会。这是继 2023 年 8 月举行的首次虚拟峰会之后的延续。你可以在 [这里](https://docs.google.com/document/d/e/2PACX-1vRFLdpIJYO5YPARcyUT1FYPzwkFb1hxh_agqnCXxsyirXocLZS5jobs3xFV5ZGpSQHLHZiBzqbJlXNV/pub) 查看讨论会的总结要点。

我们很高兴地宣布，下一次峰会将于 2024 年 9 月 20 日在纽约市的 [美国 Fluttercon](https://flutterconusa.dev/) 举行！如果你是一个 package 作者或贡献者，并且将参加 2024 年美国 Fluttercon，请 [注册](https://rsvp.withgoogle.com/events/flutter-package-ecosystem-summit-usa-2024) 以预留你在峰会中的位置。

本峰会汇集了 package 作者和维护者，就以下主题进行了非会议式的讨论:

- 第 1 场: 原生互操作的过去、现在和未来
- 第 2 场: 可持续的 package 维护模式  
- 第 3 场: 解决 package 生态系统碎片化

我们相信峰会，特别是作为更广泛的 Flutter 和 Dart 活动的一部分，是社区之间进行开放讨论的宝贵平台，可以揭示关键挑战并集思广益解决方案。我们期待未来与社区合作举办更多此类峰会。

## DevTools 和 IDE

这个版本包含了对 Flutter DevTools 工具套件的一些令人兴奋的改进。

如果你曾经想知道你的 Flutter 应用是否构建了超出预期的 Widget 数量，DevTools Performance 工具中的一个新功能可以帮助你。使用新的 Rebuild Stats 功能，你可以捕获有关应用中或甚至特定 Flutter 帧中 widget 构建次数的信息。

![DevTools Performance 工具跟踪重建统计的屏幕截图](https://img-s2.andfun.cn/devrel/posts/2024/08/f8e43515f881f.png)

我们为 Network profiler 和 Flutter Deep Links 工具等工具添加了改进和关键 bug 修复，并进行了一些总体改进，以在你从 IDE 中使用 DevTools 时提供更好的体验。说到 IDE，你知道可以直接在 IDE 中使用每个 DevTools 工具吗?

![DevTools 屏幕在 VS Code 窗口中打开](https://img-s2.andfun.cn/devrel/posts/2024/08/ce2a270876253.png)

![DevTools 屏幕在 Android Studio 工具窗口中打开](https://img-s2.andfun.cn/devrel/posts/2024/08/d60f73a33c768.png)

这个版本包括对 VS Code 中 Flutter 侧边栏的改进，让你更容易访问所需的工具。升级到最新版本的 VS Code 以及 Flutter 和 Dart 扩展以访问改进的侧边栏。

![Flutter 侧边栏可自适应并缩放以适应工作区](https://img-s2.andfun.cn/devrel/posts/2024/08/edba074e157d1.gif)

这个版本还包括对 [DevTools 扩展框架](https://docs.flutter.cn/tools/devtools/extensions) 的一些重大改进。现在，当你在调试 Dart 或 Flutter 测试时，甚至当你没有调试任何内容而只是在 IDE 中编写代码时，你都可以使用 DevTools 扩展(由某个 package 依赖提供的工具)。因此，如果你想为这些用户场景之一使用工具(或构建一个！)，现在就可以了。

要了解 Flutter 3.24 中包含的所有更新的更多信息，请查看 DevTools [2.35.0](https://docs.flutter.cn/tools/devtools/release-notes/release-notes-2.35.0)、[2.36.0](https://docs.flutter.cn/tools/devtools/release-notes/release-notes-2.36.0) 和 [2.37.2](https://docs.flutter.cn/tools/devtools/release-notes/release-notes-2.37.2) 的发行说明。

## 破坏性改动

本次发布中的破坏性改动包括对 [Navigator 的 pages API ](https://docs.flutter.cn/release/breaking-changes/navigator-and-page-api)(导航页面 API) 的修改、[PopScope 中泛型类型的变化](https://docs.flutter.cn/release/breaking-changes/popscope-with-result) (将 `onPopInvoked` 方法替换为 `onPopInvokedWithResult`)、[Flutter Web 的默认渲染器的变更](https://docs.flutter.cn/platform-integration/web/renderers)，以及一些新的废弃声明。你可以在 [破坏性改动页面](https://docs.flutter.cn/release/breaking-changes) 上查看完整的迁移指南。

一如既往，我们非常感谢社区提供 [测试用例](https://github.com/flutter/tests/blob/master/README.md) —— 这些测试用例帮助我们识别这些破坏性改动。要了解更多信息，请查看 Flutter 的破坏性改动处理政策。

## 结语

Flutter 成功的核心是你 - 我们优秀的社区。没有你们无数的贡献和不懈的热情，这个版本就无法实现。我们由衷地感谢你们。

为了详细了解这个版本所取得的具体成果，我们邀请你查看发布说明和变更日志，以获取 Flutter 3.24 中新增内容的完整列表。

现在，Flutter 3.24 以及 Dart 3.5 已经在稳定渠道上可用了。开始使用最新版本的 Flutter 就像运行 `flutter upgrade` 一样简单。我们迫不及待地想看到你们的创作！