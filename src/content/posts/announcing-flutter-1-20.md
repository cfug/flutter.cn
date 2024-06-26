---
title: Flutter 1.20 正式发布
description: 性能改进、移动端自动填充、全新 widget 以及更多内容！
toc: true
---

![]({{site.flutter-files-cn}}posts/images/2020/08/bbbf90037ad95.png)

作者 / Chris Sells, Product Manager, Flutter developer experience

我们对 Flutter 的愿景是提供一个可移植的工具包，让你无论在任何屏幕上都能随心所欲地绘制像素，打造出美好的体验。每次更新，我们都着力确保 Flutter 能够在所有支持的平台上运行流畅、界面美观、开发高效而且保持开放性。通过稳定版渠道发布的 Flutter 1.20 在上述四个方面都进展颇多。

首先是运行流畅，我们从最底层的渲染引擎到 Dart 语言本身都实现了多项性能改进。

为了让你构建出更美观的 Flutter 应用，此版本提供了多项界面改进，包括期待已久的自动填充支持、支持平移和缩放的新 widget 布局方式、新的鼠标光标支持、旧版本中人气 Material widget（如时间和日期选择器）的更新，以及为桌面和移动端 Flutter 应用中的关于（About）界面带来了全新的响应式许可（license）展示页面。

为了进一步提高开发效率，我们更新了 [Visual Studio Code 的 Flutter 扩展](https://dartcode.org/)，将 Dart DevTools 直整合进 IDE，在你移动文件时会帮你自动更新导入语句，并提供了一组新的元数据用于构建你自己的工具。

得益于 Flutter 的开放性和来自社区的出色贡献，此版本包含了全球 359 名贡献者（其中包括来自 Flutter 社区的 270 名贡献者）的 3,029 个合并 PR，关闭了 5,485 个 issue。因此本次更新的 Flutter 版本也是目前为止拥有最多贡献者的版本。在这里特别感谢在社区中贡献了 28 个 PR的 [CareF](https://github.com/CareF)，贡献了 26 个 PR 的 [AyushBherwani1998](https://github.com/AyushBherwani1998)（包括他用于 Google Summer of Code 项目的 10 个 Flutter 示例），以及贡献了 13 个 PR 的 [a14n](https://github.com/a14n)（其中一大部分用于支持 Flutter 的空安全性，有关该主题的更多信息即将到来！）。Flutter 的诞生离不开社区贡献者们的广泛支持。谢谢大家！

Flutter 每一个新版本的发布都伴随着使用量的增长和更迅猛的发展态势。事实上，在 4 月份我们曾 [报道过](https://flutter.cn/posts/flutter-spring-2020-update) Google Play 商店中 Flutter 应用的数量已经达到 50,000，月度新增应用数量峰值更是高达 10,000。现在，短短三个月后，Google Play 中的 Flutter 应用数量已经超过 90,000。增长最快的当属印度，那里已经是 Flutter 开发者最多的地区，开发者数量在过去六个月中翻了一番，这与 [Google 在该地区增加的投资](https://www.businessinsider.com/google-alphabet-india-health-agriculture-education-tech-ai-sundar-pichai-2020-7) 密切相关。最后，如果没有 Dart 语言，Flutter 也不会成为现在的 Flutter。这里分享一个好消息：在 IEEE 的 [开发语言榜单](https://spectrum.ieee.org/static/interactive-the-top-programming-languages-2020) 中，Dart 相比去年上升了 4 位，在榜单的前 50 种语言中排名第 12。

## Flutter 和 Dart 的性能改进

Flutter 团队一直在寻找缩减应用大小和延迟的新方法。对于大小，[此版本修复了在进行图标字体摇树（tree-shaking）操作时的工具性能问题](https://github.com/flutter/flutter/pull/55417)，并在你构建非 web 应用时默认进行 [字体摇树操作](https://github.com/flutter/flutter/pull/56633)。图标字体摇树操作会移除应用中未使用的图标，从而缩减其大小。在对 Flutter Gallery 应用进行该操作后，我们发现 [应用大小缩减了 100kb](https://github.com/flutter/flutter/pull/49737)。现在，在构建移动版应用的发布版本时该操作会默认执行。目前仅限于 TrueType 字体，但在未来版本中将取消这个限制。

此版本带来的另一项性能改进是使用预热阶段减少动画初始显示时的卡顿。以下为卡顿改进的动画示例（半速播放）。

![]({{site.flutter-files-cn}}posts/images/2020/08/455f666234c9d.gif)

△ 使用和不使用 SkSL 预热的动画

如果 Flutter 应用在首次运行时的动画出现卡顿，那么 Skia Shading Language 着色器将在应用构建中提供预编译，将速度提高 2 倍以上。
如果你想使用此高级功能，请参见 flutter 文档中的 [SkSL 预热页面](https://docs.flutter.cn/perf/shader)。

最后，在针对桌面环境的优化中，我们进一步完善了对鼠标的支持。在此版本，我们 [重构了鼠标点击测试系统](https://github.com/flutter/flutter/pull/59883)，带来了许多曾因性能问题受阻的架构优势。在基于 web 的微型基准测试中，重构使性能提高了多达 15 倍！这意味着，你可以在保证性能的前提下，获得更好、更一致、更准确的点击测试结果：实现双赢！

有了更好、更快、更强大的鼠标点击测试，我们又增加了鼠标光标支持，这也是桌面端最受期待的功能之一。一些常用的 widget 将默认显示主流光标，你也可以从支持的光标列表中指定其他光标。

![]({{site.flutter-files-cn}}posts/images/2020/08/86c0af8ecf3d3.gif)

△ 鼠标在 Android 既有的 widget 上悬停时切换显示光标

此版本 Flutter 基于 2.9 版 Dart 构建，采用基于状态的全新双通 UTF-8 解码器，解码原语在 Dart VM 中优化，部分利用了 SIMD 指令。UTF-8 是目前互联网上最常用的字符编码方法。在接收大型网络响应时，快速对其进行解码至关重要。在 UTF-8 解码基准测试中，我们在低端 ARM 设备上测得的性能得到了全面改进：英语文本提升至近 200%，中文文本提升至 400%。

## 移动端文本字段自动填充

一段时间以来，呼声最高的 Flutter 功能之一就是为 Flutter 应用中的文本自动填充提供 Android 和 iOS 的底层支持。通过 [PR 52126](https://github.com/flutter/flutter/pull/52126)，我们很高兴地宣布该支持已经实现，如果操作系统已经搜集到可供自动填充的信息，你的用户无需再重新输入了。

![]({{site.flutter-files-cn}}posts/images/2020/08/04693616a125a.gif)

△ 自动填充

再告诉你一个好消息，我们已经开始着手在 web 端实现这一功能。

## 用于常见交互模式的全新 widget

此版本引入了一个新的 widget：InteractiveViewer。InteractiveViewer 旨在为你的应用构建常见交互，如平移、缩放和拖放，甚至在可调节大小的窗口中也可实现这些交互，请参见下面这个 [简单的围棋示例](https://github.com/justinmc/flutter-go)。

![]({{site.flutter-files-cn}}posts/images/2020/08/1926f95f7fd40.gif)

△　InteractiveViewer 的缩放、平移、调整大小与拖放

请查看 [API 文档](https://api.flutter.cn/flutter/widgets/InteractiveViewer-class.html)，了解如何将 InteractiveViewer 集成到你自己的应用中，你也可以在 DartPad 中快速进行体验。另外，如果你想了解 InteractiveViewer 的设计和开发经历，可以观看 ChicagoFlutter 发布的[演讲视频](https://www.youtube.com/watch?v=ChFa0A72Uto)。

有兴趣在 Flutter 应用中加入更多类似 InteractiveViewer 的交互？欢迎了解一下我们在这一版本 [对拖放功能所做的增强](https://github.com/monkeyswarm/DragTargetDetailsExample)。具体来说，如果你想知道拖拽的“放置”操作发生在目标 widget（始终对 Draggable 对象可用）上的精确位置，现在你可以通过 DragTarget 的 onAcceptDetails 方法获得该信息。

![]({{site.flutter-files-cn}}posts/images/2020/08/89b6c425a5767.gif)

△ 接收拖放目标详情信息演示

你可以通过这个 [示例](https://github.com/monkeyswarm/DragTargetDetailsExample)了解详细信息，未来版本还将在拖动过程中提供这些信息，以便 DragTarget 在拖动操作期间更轻松地提供可视化的更新。

## Material Slider / RangeSlider / TimePicker / DatePicker Widget 更新：

除了新添加的 widget，此版本还包含许多既有 widget 的更新，以匹配 [最新的 Material 指南](https://material-io.cn/components/sliders)。其中包括 Slider 和 RangeSlider。更多信息参见 [Slider widget 的更新](https://medium.com/flutter/whats-new-with-the-slider-widget-ce48a22611a3)。

![]({{site.flutter-files-cn}}posts/images/2020/08/163a04b7ec35d.png)

△ 新版 Material Slider

![]({{site.flutter-files-cn}}posts/images/2020/08/4b39c88d13982.png)

△ 新版 Material RangeSlider

更新的 DatePicker 新添了紧凑型设计以及对日期范围的支持。

![]({{site.flutter-files-cn}}posts/images/2020/08/9b72841cf6b9a.gif)

△ 新版 DatePicker

最后，TimePicker 也有了全新的视觉风格。

![]({{site.flutter-files-cn}}posts/images/2020/08/aa761b870a116.png)

△ 新版 TimePicker

如果你想上手操作，请试试 [使用 Flutter 构建的趣味网络演示](https://flutter-time-picker.firebaseapp.com/#/)。

## 响应式许可页面

此版本的另一个更新是 AboutDialog 中提供的新的响应式许可页面。

![]({{site.flutter-files-cn}}posts/images/2020/08/f46d9adbfbdba.png)

△ 新的许可页面

社区贡献者 [TonicArtos](https://github.com/TonicArtos) 的 [PR 57588](https://github.com/flutter/flutter/pull/57588) 遵循 Material 指南进行更新，外观更加精美，更易于导航，并且在平板电脑、桌面设备和手机上都一样好用。谢谢 TonicArtos！由于每个 Flutter 应用都应显示其所用 package 的许可，如此一来每个 Flutter 应用都获得了改进！

## 发布插件所需的新 pubspec.yaml 格式

当然，Flutter 不仅是 widget (在 Flutter 里: Everything is a Widget)，它也是一个工具。今天这个版本中带来的更新实在太多，无法一一提及。下面是一些亮点：

首先是一则声明：如果你是 Flutter 插件作者，发布插件时将不再支持使用旧的 pubspec.yaml 格式。在使用旧格式文件执行 pub publish 时会收到以下错误消息：

![]({{site.flutter-files-cn}}posts/images/2020/08/439e46e8de177.png)

△ 插件发布时使用旧 pubspec 格式后收到的错误消息

旧格式不能指定插件支持的平台，自 Flutter 1.12 起已弃用。现在，发布新的插件或更新插件时需要使用 [新的 pubspec.yaml 格式](https://docs.flutter.cn/development/packages-and-plugins/developing-packages#plugin-platforms)。

对于插件的用户，开发工具在当下和可预见的将来仍然能理解旧 pubspec 格式。在可预见的将来，pub.dev 上所有使用旧 pubspec.yaml 格式的既有插件可继续在 Flutter 应用中使用。

## 功能预览：在 Visual Studio Code 中嵌入 Dart DevTools

此版本最大的工具更新是 Visual Studio Code 扩展，它提供了一项新功能的预览，使你能够将 Dart DevTools 界面直接嵌入编程工作区。

![]({{site.flutter-files-cn}}posts/images/2020/08/1bb7686b6aee2.png)

△ 预览功能：在 Visual Studio Code 中嵌入 Dart DevTools 的 Layout Explorer

使用新的 `dart.previewEmbeddedDevTools` 设置启用此功能。在上面的屏幕截图中，Flutter Widget Inspector 直接嵌入 Visual Studio Code，但是启用新设置后，你可以使用状态栏上的 Dart DevTools 菜单嵌入其他你偏好的页面。

![]({{site.flutter-files-cn}}posts/images/2020/08/e483d4839aed8.png)

通过此菜单选择要显示的页面。

![]({{site.flutter-files-cn}}posts/images/2020/08/3a9be4183f989.gif)

该功能仍处于预览状态，如果你遇到任何问题，请 [在这里提交反馈](https://github.com/Dart-Code/Dart-Code/issues)。

## 网络监测功能更新

最新版本 Dart DevTools 带有更新的 Network 页面，可以实现网络套接字分析。

![]({{site.flutter-files-cn}}posts/images/2020/08/f2570ba7c41dd.png)

△ Dart DevTools 的 Network 页面上的套接字连接时间、状态和内容类型

现在，Network 页面添加了应用进行网络调用的时间、状态和内容类型等信息。详细信息界面也有额外改进，以提供 websocket 或 http 请求中数据的概览。我们还为这个页面制定了更多计划，包括加入 HTTP 请求/响应正文和 gRPC 流量监测。

## 在文件重命名时更新导入语句

Visual Studio Code 的另一个新功能是当文件被移动或重命名时自动更新导入语句。

![]({{site.flutter-files-cn}}posts/images/2020/08/3a9be4183f989.gif)

△ 在 Visual Studio Code 中移动 Dart 文件会更新导入语句

该功能目前仅适用于单个文件，暂不支持多个文件或文件夹（即将到来！）。

## 面向每个工具制造者的工具元数据

还有一项为 Flutter 工具开发者提供的更新。我们在 GitHub 上创建了一个新项目，来捕获和发布有关 Flutter 框架本身的元数据。它提供以下机器可读数据文件：

* 当前所有 Flutter widget 的 [目录](https://github.com/flutter/tools_metadata/blob/master/resources/catalog/widgets.json)（有 395 个！）
* Flutter 框架中 [颜色名称到颜色值的映射](https://github.com/flutter/tools_metadata/tree/master/resources/colors)，支持 Material 和 Cupertino 颜色集
* Material 和 Cupertino 图标的 [图标元数据](https://github.com/flutter/tools_metadata/tree/master/resources/icons)，包括图标名称和预览图标

这与我们在 Android Studio / IntelliJ 和 VS Code 扩展中的元数据相同；我们认为这对你构建自己的工具会有所帮助。实际上，此元数据使 IntelliJ 系列 IDE 的功能可以显示 Flutter 代码中使用的颜色：

![]({{site.flutter-files-cn}}posts/images/2020/08/ca7d24a599cd8.png)

与此相关的是 IntelliJ 和 Android Studio 中的一项新功能，该功能可为 Color.fromARGB() 和 Color.fromRGBO() 显示色块：

![]({{site.flutter-files-cn}}posts/images/2020/08/5c8d5b3dcd271.png)

特别感谢 [dratushnyy](https://github.com/dratushnyy) 在 GitHub 上为 IntelliJ 中的颜色预览做出的贡献！

## 平台互操作的类型安全平台通道

为了回应插件作者在用户调研中的普遍需求，最近，我们一直以 [插件](https://docs.flutter.cn/development/packages-and-plugins/developing-packages) 和 [Add-to-App](https://docs.flutter.cn/development/add-to-app) （部分使用了 Flutter 的应用）为对象，探求如何才能让 Flutter 与宿主平台之间的通信更安全、更轻松。为了满足这一需求，我们创建了命令行工具 [Pigeon](https://pub.flutter-io.cn/packages/pigeon)，使用 Dart 语法在平台通道上生成类型安全的消息代码，无需添加其他运行时依赖项。你无需在平台通道上手动匹配方法字符串和序列化参数，就可以调用 Java/Objective-C/Kotlin/Swift 类方法，并通过直接调用 Dart 方法传递非原始类型数据对象（反之亦然）。

![]({{site.flutter-files-cn}}posts/images/2020/08/607007baf455d.png)

Pigeon 虽然处于预发布阶段，但已经足够成熟，我们已经将其用于 [video_player](https://pub.flutter-io.cn/packages/video_player) 插件。如果你有兴趣测试 Pigeon 供自己使用，请参见更新的 [平台通道文档](https://docs.flutter.cn/development/platform-integration/platform-channels#pigeon) 以及此 [示例项目](https://github.com/flutter/samples/tree/master/add_to_app/flutter_module_books)。

## 还有众多工具更新，不胜枚举

截至 Flutter 1.20 发布，众多工具的版本也全新亮相，我们无法在此列出所有内容，请查看它们的更新公告：

* [VS Code 扩展 v3.13](https://groups.google.com/g/flutter-announce/c/TlN12RemsYw)
* [VS Code 扩展 v3.12](https://groups.google.com/g/flutter-announce/c/8tSufvaRJUg)
* [VS Code 扩展 v3.11](https://groups.google.com/g/flutter-announce/c/gM0bqO7NFA0)
* [Flutter IntelliJ 插件 M46 版](https://groups.google.com/g/flutter-announce/c/8C2v2ueXjts)
* [Flutter IntelliJ 插件 M47 版](https://groups.google.com/g/flutter-announce/c/6SF3PG_XB8g/m/6mAY7eC_AAAJ)
* [Flutter IntelliJ 插件 M48 版](https://groups.google.com/g/flutter-announce/c/i9NTk5o9rZQ)
* [我们用 Flutter 写了一套全新的 Flutter 开发者工具](https://mp.weixin.qq.com/s/4mcFo3z8DhCDkEMX7IPmww)

## 重要改动 (Breaking Changes)

与往常一样，我们尽力将重要改动（breaking changes）的数量维持在较低水平。以下是 Flutter 1.20 版本中的重要改动列表。

* [55336](https://github.com/flutter/flutter/pull/55336)：将 tabSemanticsLabel 添加到 CupertinoLocalizations - 迁移 [指南 PR](https://docs.flutter.cn/release/breaking-changes/cupertino-tab-bar-localizations)
* [55977](https://github.com/flutter/flutter/pull/55977)：[将 clipBehavior 添加至具有 clipRect 的 widget]({{site.flutter-files-cn}}flutter-design-docs/Clip_Behavior.docx)
* [55998](https://github.com/flutter/flutter/pull/55998)：[为 Navigator 的 TransitionDelegate 新加入了 isWaitingForExitingDecision 判断。](https://groups.google.com/forum/#!searchin/flutter-announce/55998%7Csort:date/flutter-announce/yoq2VGi94q8/8pTsRL28AQAJ)	
* [56582](https://github.com/flutter/flutter/pull/56582)：[更新 Cupertino 中的 Tab 语义，使其与 Material 相同](https://docs.flutter.cn/release/breaking-changes/cupertino-tab-bar-localizations#migration-guide)
* [57065](https://github.com/flutter/flutter/pull/57065)：移除 NestedScrollView 重叠管理条中被弃用的子参数	
* [58392](https://github.com/flutter/flutter/pull/58392)：确保在 iOS 里的系统行为一致性，为 CupertinoActivityIndicator 加入 progress 参数

## 总结

希望你和我们一样喜爱这一版本。从很多角度来看，这都是 Flutter 迄今为止规模最大的版本发布。其中包含性能的显著提升、新增并更新了许多 widget，以及对工具做出的诸多改进，考虑到文章篇幅我们只能着重介绍部分亮点。我们要向大家致谢，感谢不断壮大的社区贡献者群体，让每一个 Flutter 版本都比先前功能更丰富、运行更流畅、性能更强大。敬请期待更多内容，包括 [空安全](http://dart.cn/null-safety)支持、新版本的 Ads、Maps 和 WebView 插件，以及正在构建的更多工具支持。（也欢迎大家阅读 Bob Nystrom 的文章以深入 [了解空安全](https://dart.cn/null-safety/understanding-null-safety)）

Flutter 和工具已经全新升级，你会打造出怎样精彩的 Flutter 作品呢？
