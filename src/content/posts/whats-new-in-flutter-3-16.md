---
title: 了解 Flutter 3.16 功能更新
toc: true
---

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/QUKao8.png)

*作者 / Kevin Chisholm*

我们在季度 Flutter 稳定版发布会上带来了 Flutter 3.16，此版本包含诸多更新: Material 3 成为新的默认主题、为 Android 带来 Impeller 的预览版、允许添加适用于 DevTools 的扩展程序等等，以及同步推出 Flutter 休闲游戏工具包重大更新！

* Flutter 休闲游戏工具包重大更新

https://medium.com/flutter/building-your-next-casual-game-with-flutter-716ef457e440

自上次发布以来，仅仅三个月，我们便收到了 145 名社区成员合并提出的 928 个拉取请求 (pull request)，其中有 40 名社区成员在 Flutter 上首次提交了他们的编写！

欢迎你继续阅读本篇文章，了解 Flutter 社区为这个最新版本带来的所有新功能和改进！

## **框架**

**Material 3 成为新的默认设计语言**

Material 库已更新至 3.10 版本 (2023 年 5 月)，以匹配最新的 Material Design 规范。更改包括新的组件、组件主题以及更新的组件视觉效果。在 3.16 版本之前，这些更改在 useMaterial3 主题标志旁显示为 "选择加入"；自此版本起，useMaterial3 默认为 true。([#130764](https://github.com/flutter/flutter/pull/130764))

虽然你仍然可以通过在 MaterialApp 主题中设定 useMaterial3: false 从而选择退出 M3 版本的 Material 库，但 Material 2 最终还是会被弃用和删除。此外，一些 widgets 不仅需要更新，还需要全新的实现方式。因此，当你的界面以 Material 3 形式运行时，可能看起来有点奇怪。要解决此问题，你可以手动迁移到新的 widgets，例如 [NavigationBar](https://api.flutter.dev/flutter/material/NavigationBar-class.html)。你可以在 GitHub 上的 [Material 3 umbrella issue](https://github.com/flutter/flutter/issues/91605) 查看更多详情。

通过 [演示应用](https://flutter.github.io/samples/material_3.html)，你可以试用所有组件。演示版支持切换 useMaterial3，以便你针对更改进行比较。

Material 3 组件的外观主要由 [ThemeData.colorScheme] 和 [ThemeData.textTheme] 的值决定。ColorScheme.fromSeed() 是 Material 3 配色方案的首选方式，可以生成既美观又符合无障碍对比度要求的深色和浅色方案。你还可以使用 ColorScheme.fromImageProvider，以根据图像中的主色调生成配色方案。如果你想进一步自定义 Material 3 组件的外观，可以将组件主题添加到 ThemeData，例如 [ThemeData.segmentedButtonTheme](https://api.flutter.dev/flutter/material/SegmentedButtonThemeData-class.html) 或 [ThemeData.snackBarTheme](https://api.flutter.dev/flutter/material/SnackBarThemeData-class.html)。非空组件主题属性会覆盖组件的 API 文档中指定的默认值。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/K8Yv1S.gif)

## **支持 Material 3 动效**

对 Material 3 动效的改进包括新增 Easing 和 Durations 类。Material 2 曲线被重命名后包含了 "legacy" 提示，最终将被弃用和删除。([#129942](https://github.com/flutter/flutter/pull/129942))

**在编辑菜单中添加其他选项**

在原生 iOS 系统上，用户现在可以选择文本并启动提供多种标准服务的共享菜单。在此版本中，我们添加了查找、搜索和共享选项。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/1xdYTo.gif)

**用于指定全局文本缩放系数的 TextScaler**

为了支持 Android 14 中为视障人士提供帮助的 [非线性字体缩放功能](https://blog.google/products/android/android-14/#:~:text=Also%2C%20you%20can%20improve%20readability,rate%20than%20smaller%20font%20size.)，我们使用新的 [TextScaler](https://api.flutter.dev/flutter/painting/TextScaler-class.html) 类替代 Text.textScaleFactor 属性。([#128522](https://github.com/flutter/flutter/pull/128522))

**SelectionArea 更新**

Flutter 的 SelectionArea 经过更新，可支持与使用鼠标单击或双击以及触屏设备上长按相关的原生手势。你可以在默认情况下通过 SelectionArea 和 SelectableRegion 使用这些新手势:

* 单击: 在点击位置设置折叠的选项。
* 双击: 选择点击位置的字词。
* 双击 + 拖动: 扩展所选词块。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/WNxsJW.gif)

* 长按 + 拖动: 扩展所选词块。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/DV15eS.gif)

**可在焦点 widget 上操作的菜单项**

此版本支持在使用菜单项时清除焦点更改: FocusManager 的 applyFocusChangesIfNeeded 函数现在可用于恢复菜单焦点——当用户单击菜单项时，焦点会返回至菜单打开之前焦点所在的项目。([#130536](https://github.com/flutter/flutter/pull/130536))

**iOS、macOS 中菜单项快捷方式的**

**自动重新排序**

Mac 平台上的 Flutter 应用现在会按照《Apple 人机界面指南》对菜单中的快捷方式修饰符进行排序。([#129309](https://github.com/flutter/flutter/pull/129309))

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/6X7zcv.png)

△ 排序前

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/SpqOqx.png)

△ 排序后

**MatrixTransition 动画**

新的 MatrixTransition widget 可用于变换转场动画。根据当前动画值，你可以提供应用于子 widget 的矩阵变换，也可以查看 [DartPad 中示例](https://dartpad.dev/?channel=beta&id=c82be58209035722f2cc7d78da855329) 的实现效果。([#131084](https://github.com/flutter/flutter/pull/131084))

**PaintPattern 已添加到 flutter_test**

在 flutter_test package 中，新的 PaintPattern 类允许你验证 CustomPainter 和 Decoration (在单元测试中使用) 等 widget 对画布进行的绘制调用。

以前，验证颜色和矩形是否绘制正确需要使用 golden 文件，但你现在可以使用 PaintPattern。以下是验证 `MyWidget` 是否在画布上绘制了圆圈的示例:

```Dart
expect(
  find.byType(MyWidget),
  paints
    ..circle(
      x: 10,
      y: 10,
      radius: 20,
      color: const Color(0xFFF44336),
    ),
);
// Multiple paint calls can even be chained together.
expect(
  find.byType(MyWidget),
  paints
    ..circle(
      x: 10,
      y: 10,
      radius: 20,
      color: const Color(0xFFF44336),
    ),
    ..image(
      image: MyImage,
      x: 20,
      y: 20,
    ),
);
```

此 API 以前深藏于框架测试文件，我们注意到一些开发者发现它非常有用并将其复制到了自己的项目中。如果该 API 也适用于你的项目，你可以在升级到 Flutter 3.16 后从项目中删除该副本。

**滚动更新**

在 Flutter 3.13 首次发布二维滚动基础后，此次 3.16 版本带来了更多功能和优化，2D 基础现在支持 `KeepAlive` widget，以及默认的焦点遍历和隐式滚动。在此基础之上构建的 2D 滚动 widget 将自动采用此支持。有关在 2D 基础上构建的综合指南，你可以观看 [最新一集的《Flutter Build Show》](https://www.youtube.com/watch?v=ppEdTo-VGcg)。

3.13 版本发布后不久，[two_dimensional_scrollables](https://pub.flutter-io.cn/packages/two_dimensional_scrollables) package 也随之发布。此 package 由 Flutter 团队维护，包含首个基于框架基础构建的 2D 滚动 widget — TableView。自首次发布以来，我们添加了更多装饰和样式支持，并修复了其他问题。

## **引擎**

**Impeller**

**Android**

在此版本中，我们很高兴地与你分享，Impeller 已在 Android 上准备就绪，可用于在稳定渠道上收集预览版反馈。自今年早些时候，团队一直在努力为 Impeller 开发 Vulkan 后端，此次预览版包括收集 Impeller 在支持 Vulkan 的设备上表现的相关反馈。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/aI8i0b.png)

△ 这张图表显示了在过去一年里，在对 Impeller 的 Vulkan 后端上运行的 Flutter Gallery 进行的转换性能基准测试中，99% 帧时间、90% 帧时间和平均帧光栅化时间都有所改善，由于卡顿更少、稳态帧率更高，用户可以直观地看到这些改善。在此测试结束时，由于我们从 Samsung S10 设备改用 Pixel 7 Pro 设备，导致数据大幅下降。尽管如此，趋势和整体结果仍然鼓舞人心。

在不支持 Vulkan 的设备上，预计 Impeller 表现不佳。我们计划在未来几个月内为 Impeller 的 OpenGL 后端提供完备功能，以及在未来的稳定版本中征集有关 Impeller 在这些设备上的表现的反馈意见。

要在支持 Vulkan 的 Android 设备上试用 Impeller，Flutter 开发者可以将 `— enable-impeller` 标志传递给 `flutter run`，或将以下设置添加到 `<application>` 标签下的项目 `AndroidManifest.xml` 文件中:

```
<meta-data
  android:name="io.flutter.embedding.android.EnableImpeller"
  android:value="true" />
```

为了确定设备是否支持 Vulkan，你需要对 Impeller 进行 [Impeller repo docs](https://github.com/flutter/engine/blob/main/impeller/docs/android.md#rendering-backend-selection) 中讨论的测试。一般来说，在运行 Android API 级别 29 或更高版本的 64 位操作系统的设备上，Impeller 使用的是 Vulkan 后端。用户还可以按照 [检查是否支持 Vulkan](https://docs.vulkan.org/guide/latest/checking_for_support.html#_android) 中的建议从而确定设备是否支持 Vulkan。

虽然迄今为止，我们对在 Impeller 的 Vulkan 后端上取得的进展比较满意，但预览阶段仍有一些已知问题:

* 由于平台视图尚未实现，因此包含平台视图的框架效果不佳。
* 自定义着色器尚未实现。
* 有关 [已知错误](https://github.com/orgs/flutter/projects/21/views/1?filterQuery=-status:%22%E2%9C%85+Done%22+status:%22%F0%9F%90%9E+Bugs%22) 和 [缺失功能](https://github.com/orgs/flutter/projects/21/views/11) 的完整列表，你可以参阅 GitHub 的 Impeller [项目板](https://github.com/orgs/flutter/projects/21) 中的最新信息。我们已在 3.17 beta 版中修复了一些问题，你也可以试用新版本。

我们对尝试在支持 Vulkan 的 Android 设备上取得的 Impeller 保真度和性能进展感到满意。然而，与 iOS 相比，Android 硬件生态系统更加多样化，因此我们预计 Android 的预览版试用期比 iOS 更长，然后才能将其作为稳定渠道上的默认后端。基于上述原因，关于 Impeller 的最实用反馈应包括发生问题的具体设备和 Android 版本的详细信息。

此外，Impeller 的 Vulkan 后端在 "调试" 版本中启用了超出 Skia 使用范围的额外调试功能，这些功能会产生额外的运行时开销。因此，有关 Impeller 性能的反馈务必来自配置文件或发布版本，并且应包括来自 DevTools 的时间轴以及与同一设备上的 Skia 后端的比较。我们非常感谢每一个包含可复现的小型测试用例的反馈。

**Impeller 性能、保真度和稳定性**

除了关注 Vulkan 后端，自今年年初以来，团队还对 Impeller 中的文本性能进行了许多改进，这对 Android 和 iOS 都有好处。特别是我们改进了 Impeller 字形图集的管理以及在引擎的界面和光栅线程中划分文本工作负载的方式。因此，用户会注意到，即使处理繁重的文本工作负载，发生卡顿的情况也会减少。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/CIjXNP.png)

△ 这张图表显示了在使用 Impeller 的 iPhone 11 上进行的其中一项大量文本基准测试中，99% 帧时间、90% 帧时间和平均帧光栅化时间均有减少 (以毫秒为单位)。特别是，90% 帧时间和平均帧光栅化时间几乎减半。

团队还一直在努力改进 Android 和 iOS 的保真度和稳定性，特别是用户报告的内容。在此稳定版本发布的三个月中，团队已经针对 Flutter/引擎 repo 提交了 209 个与 Impeller 相关的内容，解决了 217 个问题，其中包括 42 个有关保真度、稳定性或性能问题的用户报告。

**引擎性能**

为了在采用异构多处理的移动设备上提供更好的性能支持，我们 [修改了引擎](https://github.com/flutter/engine/pull/45673)，以便注重性能的线程 (例如，界面和光栅线程) 可适应设备更强大的内核。我们观察到，这一变化对一系列基准和设备产生了积极影响。在某些情况下，这种改善十分显著，99% 帧时间或 90% 帧时间至少减半。我们预计，经过此次更改后，无论在 Android 上使用 Skia 后端还是 Impeller 后端，用户都会注意到卡顿情况有所减少。在 iOS 设备上，因为更强大的内核和更弱的内核之间的差异较小，所以效果并不太明显。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/k6NG07.png)

△ 这张图表显示了，我们几乎所有 Android 基准和设备的最差帧时间、99% 帧时间、90% 帧时间以及平均帧构建时间和帧光栅化时间都有所改善。

**API 和保真度改善**

**Impeller 性能叠加**

在以前的版本中，Flutter 的 [性能叠加](https://docs.flutter.dev/perf/ui-performance#the-performance-overlay) 功能未在 Impeller 中显示。此版本修复了该问题，性能叠加在 Impeller 启用后 [将会正确显示](https://github.com/flutter/engine/pull/45259)。

**抖动现在会正确显示**

在此版本中，Paint.enableDithering 属性被设置为 true，并且根据 [Flutter 的弃用策略](https://docs.flutter.dev/release/compatibility-policy#deprecation-policy) 已被弃用。抖动现在默认启用 (不再支持开发者可配置的抖动)，你将不会再遇到渐变问题。你可以参阅 docs.flutter.dev 中的 [重大变更页面](https://docs.flutter.dev/release/breaking-changes/paint-enableDithering) 了解有关此更改的完整说明和迁移指南。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/bQgAjF.png)

△ 之前

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/B5Hf62.png)

△ 之后

## **游戏**

**Flutter 游戏工具包**

过去几年，休闲游戏开发社区不断发展壮大。从简单而有趣的解谜游戏到更复杂的街机游戏，数以万计使用 Flutter 开发的游戏得以发布。深受喜爱的游戏包括 Etermax 的 [Trivia Crack](https://triviacrack.com/)、Lotum 的 [4 Pics 1 Word](https://flutter.cn/showcase/lotum) (猜词游戏)、Dong Digital 的 [Brick Mania](https://play.google.com/store/apps/details?id=net.countrymania.brick&hl=en) (街机游戏)、Onrizon 的 [StopotS](https://play.google.com/store/apps/details?id=com.gartic.StopotS&hl=en) (分类游戏)、我们为 I/O 大会开发的 [复古弹球游戏](https://pinball.flutter.dev/) 以及在社交和菜单屏幕中使用 Flutter 的 [PUBG](https://flutter.dev/showcase/pubg-mobile) 手游等。

![](https://docs.flutter.dev/release/breaking-changes/paint-enableDithering)

为了帮助游戏开发者提高工作效率，我们对 Flutter 的 [休闲游戏工具包](http://flutter.cn) 进行了重大更新。此次更新包括提供一系列新资源，可帮助开发者利用更多特定类型的模板把游戏从概念走向发布，例如纸牌游戏、无尽跑酷游戏以及 Google Play 游戏服务、应用内购买、广告、成就、crashlytics 和多人游戏支持等服务集成。

## **Web**

**Chrome DevTools 中的 Flutter 时间轴事件**

Flutter 时间轴事件现在显示在 Chrome DevTools 的性能面板中。([#130132](https://github.com/flutter/flutter/issues/130132))

你可以查看 [Web 应用的调试性能](https://docs.flutter.dev/perf/web-performance) 了解更多详细信息。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/UPNvzF.png)

## **Android**

**鼠标滚轮支持**

在 [优化 Wonderous 以符合 Android 的大屏指南要求](https://medium.com/flutter/developing-flutter-apps-for-large-screens-53b7b0e17f10) 时，我们发现了一个问题，鼠标滚轮在平板电脑或可折叠设备上表现不佳。这导致出现了一个 [普遍现象](https://github.com/flutter/flutter/issues/82973)，用户必须大幅移动滚轮才能让屏幕响应。

通过此版本更新，使用鼠标在 Flutter 视图上的滚动速度与在 Android 设备上的滚动速度得以匹配。([44724](https://github.com/flutter/engine/pull/44724))

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/ETOSTV.gif)

之前

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/7otNUZ.gif)

之后

**预测性返回导航**

Android 14 版本包含预测性返回手势功能，允许你在设备上使用返回手势 "查看" 当前屏幕后面的主屏幕。此更新也为 Flutter 带来了预测性返回手势！你可以查看 [迁移指南](https://docs.flutter.dev/release/breaking-changes/android-predictive-back#migration-guide) 了解详情。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/4KhBuj.gif)

## **iOS**

**应用扩展**

Flutter 现在可用于定位某些 [iOS 应用扩展](https://developer.apple.com/app-extensions/)。这意味着可以使用 Flutter widget 为某些类型的 iOS 应用扩展绘制界面。这并不适用于所有类型的应用扩展，因为 API (例如，主屏幕 widget) 或内存可能存在限制。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/4KhBuj.gif)

你可以访问 docs.flutter.dev 中的 [添加 iOS 应用扩展](https://docs.flutter.dev/platform-integration/ios/app-extensions) 了解详情并查看有关如何定位 "共享" 扩展的示例。

## **Package 生态系统**

**新的 Flutter Favorite 内容**

我们已重新启动 [Flutter Favorite](https://docs.flutter.dev/packages-and-plugins/favorites) 项目！在此周期中，Flutter 生态系统委员会将 [flame](https://pub.flutter-io.cn/packages/flame)、[flutter_animate](https://pub.flutter-io.cn/packages/flutter_animate)、[flutter_rust_bridge](https://pub.flutter-io.cn/packages/flutter_rust_bridge)、[riverpod](https://pub.flutter-io.cn/packages/riverpod)、[video_player](https://pub.flutter-io.cn/packages/video_player)、[macos_ui](https://pub.flutter-io.cn/packages/macos_ui) 和 [fpdart](https://pub.flutter-io.cn/packages/fpdart) package 指定为新的 Flutter Favorite。

敬请你持续关注更新的 Flutter Favorite 内容。你可以向委员会发送电子邮件消息 (电子邮件地址: [flutter-committee@googlegroups.com](mailto:flutter-committee@googlegroups.com))，来提名 package 或插件成为潜在的未来 Flutter Favorite，还可以提醒委员会注意任何其他问题。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/nU9Tlr.png)

**首届 package 生态系统网络峰会**

8 月，我们举办了首届 package 生态系统网络峰会，超过 50 名非 Google 员工和 Google 员工贡献者通过 [pub.dev](https://pub.dev/) 参与了本次峰会。我们的目标是将贡献者们聚集在一起，开展非会议式的讨论，让大家交流计划、传授经验、互相学习并在社区中分享想法。会后调查显示，大家对会议的满意度为 100%。我们计划在未来与社区合作，举办类似的 package 生态系统 (面对面和网络) 活动。

**基于 Cloud 的 Google 地图样式**

利用 Google Maps Platform，你可以在 Google Cloud Console 的 "地图样式" 页面中自定义地图样式，而无需在每次更改样式时更新应用代码，即可享受自定义体验。

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/y6WCzC.png)

如果你想要在 Flutter 中使用此功能，只需使用控制台中设置的地图 ID 即可引用地图:

```
GoogleMap(
       onMapCreated: _onMapCreated,
       initialCameraPosition: const CameraPosition(
         target: _kMapCenter,
         zoom: 7.0,
       ),
       key: _key,
       cloudMapId: _mapId
);
```

**CameraX 改进**

在 3.10 稳定版中，我们对 Flutter 相机插件添加了初步的 CameraX 支持。[CameraX](https://developer.android.google.cn/training/camerax) 是一款 Jetpack 库，可简化向 Android 应用添加丰富相机功能的流程。

在此版本中，我们添加了使用相机的应用所需的大部分功能。CameraX 解决了 Camera2 插件实现方式中存在的许多问题。

我们建议你使用 CameraX 插件。如果你选择启用，可以将以下行添加到 pubspec.yaml 文件中。

```
Dependencies:
camera: ^0.10.4 # Or try the latest camera version
camera_android_camerax: ^0.5.0
```

我们计划在未来版本中将 CameraX 作为默认实现方式，期待你的反馈。

**macOS 视频播放器**

我们为 [视频播放器插件](https://pub.flutter-io.cn/packages/video_player) 添加了 macOS 支持，允许开发者在 widget 表面播放视频。

* 视频播放器插件 

你可以在 [pub.dev](https://pub.dev/) 中搜索 [视频播放器插件](https://pub.flutter-io.cn/packages/video_player) 了解详情。

## **DevTools**

**DevTools 扩展**

新的 [DevTools 扩展框架](https://pub.flutter-io.cn/packages/devtools_extensions) 支持:

* package 作者可以直接在 DevTools 中为 package 构建自定义工具。
* package 作者可以利用 DevTools 中的现有框架和实用程序编写功能强大的工具。
* 正在使用 DevTools 调试应用的 Dart 和 Flutter 开发者可以访问特定于其用例的工具 (取决于其应用的依赖项以及哪些依赖项提供 DevTools 扩展)。

感谢 [Provider](https://pub.flutter-io.cn/packages/provider)、[Drift](https://pub.flutter-io.cn/packages/drift) 和 [Patrol](https://pub.flutter-io.cn/packages/patrol) 的 package 作者，这个生态系统已经在构建中，你可以立即使用这些 package 的 DevTools 拓展！

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/YQrBwi.png)

Provider

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/q8T64M.png)

Patrol

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/GLAYKW.png)

Drift

你可以查看 [Kenzie Davisson](https://medium.com/@kenzieschmoll) 撰写的 [Dart 和 Flutter DevTools 扩展公告](https://medium.com/flutter/dart-flutter-devtools-extensions-c8bc1aaf8e5f)，深入了解 DevTools 扩展。

**DevTools 更新**

此版本的 DevTools 有以下亮点:

* 添加了对 DevTools 扩展的支持
* 添加了新的 "主" 屏幕，显示已连接应用的摘要

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/pJ15aW.png)

其他改进包括:

* 整体性能
* 热重启的稳健性
* 文本选择及复制行为
* 网络性能分析器响应查看器的优化

你可以查看 DevTools [2.26.1](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.26.1)、[2.27.0](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.27.0) 和 [2.28.1](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.28.1) 的版本说明了解详情。

**VS Code 界面可检测性**

感谢 Flutter 社区成员 [DanTup](https://github.com/DanTup) 的出色工作， Flutter VS Code 扩展现已配备 Flutter 侧边栏，你可以轻松:

* 打开 Flutter DevTools 屏幕
* 查看处于活跃状态的调试会话
* 查看可用设备
* 创建新项目
* 热重载和重启
* 运行 Flutter Doctor -v

……

![](https://devrel.andfun.cn/devrel/posts/2024/01/07/mZAXNH.jpg)

## **弃用和重大变更**

此版本中的重大变更包括 v 3.13 版本后过期并被弃用的 API。如果你想查看所有受影响的 API 以及其他背景信息和迁移指南，你可以参阅 [此版本的弃用指南](https://docs.flutter.dev/release/breaking-changes/3-13-deprecations)。其中的许多 API 都受 [Flutter Fix](https://docs.flutter.dev/development/tools/flutter-fix) 支持，包括 IDE 中的快速修复，你也可以使用 dart fix 命令评估和应用批量修复。

非常感谢社区一如既往地 [提供测试](https://github.com/flutter/tests/blob/master/README.md)，帮助我们推进了以上重大变更。如需了解详情，你可以查看 [Flutter 的重大变更政策](https://github.com/flutter/flutter/wiki/Tree-hygiene#handling-breaking-changes)。

在下个版本中，我们计划将弃用政策的适用范围扩展到除已支持的 package (flutter 和 flutter_test) 之外的 flutter_driver package。

## **即刻体验**

我们特意在本文的开篇部分列出了贡献者的数量。大家 (卓越社区) 的共同努力，让 Flutter 在当下成为轻松易用且能提高工作效率的工具包。再次谢谢大家。

有关此版本中包含的 PR 完整列表，你可以查看 [版本说明和更新日志](https://docs.flutter.dev/release/release-notes)。

Flutter 3.16 目前已发布至稳定渠道，包括 [Dart 3.2](https://flutter.cn/posts/announcing-dart-3-2)，你只需单击 [flutter upgrade](https://docs.flutter.dev/release/upgrade) 即可开始使用这些最新的更新。
