---
title: Flutter Windows 桌面端支持进入稳定版
toc: true
---

Flutter 创建伊始，我们就致力于打造一个能够构建精美的、可高度定制的、并且可以编译为机器码的跨平台应用解决方案，以充分发挥设备底层硬件的全部图形渲染能力。今天，Flutter 对 Windows 生产版本的正式支持是对这一愿景实现的重要标志。它使 Windows 开发者也能享受到移动开发的相同生产力和功能。

![用 Flutter 构建 Windows 桌面应用程序]({{site.flutter-files-cn}}/posts/images/2022/02/908c66b003640.jpg)

Flutter 的目标是在任何平台上为你提供出色的构建体验，并且我们想要打造的是：只需要使用同一套核心框架和工具完成这个目标。通过 Flutter，你可以自由打造 **优美** 的使用体验，使你的品牌和设计脱颖而出；它还拥有 **极高** 的执行速度，因为它会被直接编译为机器码；而通过支持有状态的热重载功能以提供交互式的体验，让你可以在应用运行时直接看到代码更改后的结果，从而获得 **生产力** 提升。Flutter 是开放的，成千上万的贡献者参与到核心框架的构建，或是通过 package 和插件生态系统对其进行扩展。

<highlight>截止目前，已经有近 50 万个应用程序使用 Flutter 进行构建</highlight>

迄今为止，我们看到这股趋势已经超出了我们的预期。包括一些大公司例如 [Betterment](https://verygood.ventures/success-stories/betterment "Betterment 使用 Flutter 的案例")、宝马以及字节跳动等，还有 Google 内部三十多个团队都使用了 Flutter。根据 Statista 以及 SlashData 的统计，Flutter 在 2021 年已经成为了最流行的跨端 UI 工具包。

![]({{site.flutter-files-cn}}/posts/images/2022/02/531f089d347f9.png)

我们自己的数据也能支持这一点，在 2021 年四个季度的开发者调查中，有 92% 的 Flutter 开发者对我们提供的工具表示满意。（对于另外 8% 的人，我们正在倾听你的反馈，希望也能得到你的满意）。

这其中共同的需求之一就是对 Windows 的支持，

> 今天，我们很高兴的宣布，我们此次发布的 Flutter 稳定版中，已经全面支持构建 Windows 桌面端应用程序了！

## Windows 与 Flutter

几年前，我们为 Flutter 制定了一个宏大的愿景，即从 iOS 和 Android 的移动端应用上扩展到其他平台，其中就包括 Web 端和**桌面端**。

Flutter 的核心部分是跨平台的：从可移植的硬件加速的 Skia 图形渲染引擎，到 Flutter 的渲染系统的核心单元，例如动画、主题、文本输入以及国际化，Flutter 提供了上百个 widgets。

然而桌面端并不只是移动应用运行在一个更大的屏幕上这么简单，它们从设计上来说就很不一样。从输入设备角度来看，桌面端有键盘和鼠标，它们会在显示器上运行多个可变大小的窗口。而对于辅助功能 (Accessibility)、输入法、视觉样式等关键内容都有不同的规则约束。并且它们还和底层操作系统中不同的 API 进行集成：桌面应用支持从系统的文件选择器到设备硬件再到 Windows 注册表等数据存储的所有内容。

所以当我们把 Flutter 带到 Windows 上时，我们也需要为它进行定制。

正如我们对 Android 和 iOS 的支持那样，对 Windows 的实现也包括了 Dart 框架以及 C++ 的引擎。Windows 与 Flutter 通过承载了 Flutter 引擎的 **嵌入层(Embedder)** 进行通信，翻译以及发送 Windows 都是 **嵌入层** 的职责范围。Flutter 与 Windows 共同将你的 UI 绘制到屏幕上，处理窗口大小调整和 DPI 更改等事件，并与已有的 Windows (如输入法编辑器) 配合使用。

![Flutter 在 Windows 平台的架构]({{site.flutter-files-cn}}/posts/images/2022/02/3ccad9b79b6d5.jpg)

在 Windows 上，Flutter 使用了一套完全相同的 Dart 代码，但是能够使用 Windows 的 API。

你的应用能够使用 Flutter 框架的全部功能，在 Windows 上，它还可以直接通过 Dart 的 C 互操作层或使用用 C++ 编写的平台插件与 Win32、COM 和 Windows 运行时 API 进行通信。我们还适配了许多常用插件以包含对 Windows 的支持，包括`camera`，`file_picker`和`shared_preferences`。更重要的是，社区已经添加了各种其他 package 对 Windows 的支持，涵盖了从 Windows 任务栏集成到串行端口访问的全部内容。

![目前已经有上百个 package 为通过 Flutter 构建 Windows 应用程序提供了适配。]({{site.flutter-files-cn}}/posts/images/2022/02/8eff674e59263.jpg)

要完全为 Windows 的 UI 进行定制，你也可以使用例如像是 [fluent_ui](https://pub.flutter-io.cn/packages/fluent_ui "使用 fluent_ui package 实现具有 Microsoft Fluent 设计美学的设计") 以及 [flutter_acrylic](https://pub.flutter-io.cn/packages/flutter_acrylic "使用 flutter_acrylic package 实现具有 Microsoft Fluent 设计美学的设计") 这样的 package 创造具有 Microsoft Fluent 设计美学的应用。而且使用 [msix](https://pub.dev/packages/msix "使用 msix 工具打包发布 Windows 桌面应用程序") 工具能将你的应用包装进安装器，这样就可以上传到 Windows 上的 Microsoft Store。

总的来说，这促进了在 Window 平台上创建应用程序。以极快的速度在 Windows 上运行的同时还能转到其他桌面或者移动应用以及 web 平台上运行。让我们来看看到目前为止的一些早期样例：

![一些使用 Flutter 构建的 Windows 应用程序的早期社区示例，特别展示来自深圳团队的一款应用。]({{site.flutter-files-cn}}/posts/images/2022/02/8f17446cb2052.png)

## Microsoft 与 Flutter

我们曾询问过 Windows 团队是否愿意分享一些对 Flutter 支持的话。这是微软公司 Windows 开发者平台副总裁 Kevin Gallo 的评论：

>"我们很高兴看到 Flutter 增加了对创建 Windows 应用程序的支持。Windows 是一个开放的平台，我们欢迎所有开发人员。我们很高兴看到 Flutter 开发人员将他们的体验带到 Windows 上，并发布到 Microsoft Store。对 Windows 的支持是 Flutter 社区的一大步，我们迫不及待地想看看你能为 Windows 带来哪些令人惊叹的应用！

事实上，许多 Microsoft 的团队也都为今天的发布做出了很大贡献。我们特别想要感谢 Fluent design 团队对于支持 Windows 上 Flutter 应用的图标做出的贡献。他们高质量的 [fluentui_system_icons](https://pub.dev/packages/fluentui_system_icons "Fluent design 团队开发的 fluentui_system_icons package") package 已经加入到 Flutter Favorite 项目中了。

同时，Microsoft 围绕 Windows 可访问性所做的投入也给我们留下了深刻的印象，非常感谢该团队的帮助，以确保 Flutter 从第一天起就能够为屏幕阅读器提供支持。将无障碍功能视为额外的需求是错误的。正如 [Microsoft 包容性设计工具包](https://www.microsoft.com/design/inclusive "Microsoft 包容性设计工具包") 中的这张图片所示，我们必须要关注提供永久、临时或不同情境下需求的体验。

![]({{site.flutter-files-cn}}/posts/images/2022/02/a6687ec76191d.jpg)

下面的视频演示了 Flutter 如何集成 Windows 讲述人 (Windows Narrator) 功能。出于本视频的目的，我们特意模糊了屏幕，让你了解此功能对需要它的用户的价值。

插入视频

Windows 讲述人是一个为 Windows 打造的屏幕阅读器，它同样能够在 Flutter 应用中良好的运行。

## Windows 开发生态工具集

我们的开发工具合作伙伴们也开始为 Windows 桌面端应用程序开发增加支持，比如：

* [FlutterFlow](https://flutterflow.io/ "低代码、拖拽式生成 Flutter 应用的工具 FlutterFlow 官网") 是低代码、拖拽式生成 Flutter 应用的工具，FlutterFlow 今天正式宣布支持了 Windows 平台，同时还宣布了一些帮助 Flutter 开发者建立桌面应用的很多功能。
* Realm 是一个快速的本地数据存储服务。[今天发布的最新版本支持使用 Flutter 构建Windows 桌面端应用程序](https://www.mongodb.com/developer/article/introducing-realm-flutter-sdk "Realm 今天宣布支持使用 Flutter 构建Windows 桌面端应用程序")，他们使用 Dart FFI 快速访问底层数据库，并增加了他们对 iOS 和Android 等移动平台的现有支持。
* Nevercode 团队更新了他们的 [Codemagic CI/CD tool](https://flutterci.com/ "Nevercode 开发的 Codemagic CI/CD 工具") 工具并开始支持 Windows 桌面端，你可以在云端测试和构建 Windows 应用，并将其发布到 Microsoft Store。
* [Syncfusion](https://www.syncfusion.com/flutter-widgets "Syncfusion 官网的 Flutter widget 介绍界面") 更新了工具套件以充分发挥在 Windows 平台的优势。如果你在使用他们提供的服务，你会发现他们的数据可视化组件，比如树状图、线性规、火花图表，日历组件甚至是 PDF 和 Excel 生成组件都已经支持了 Flutter，Syncfusion Flutter widget 是用 Dart 原生构建的。
* 近期，[Rive](https://rive.app/ "创建交互式矢量动画的工具 Rive 官网") 宣布推出其流行的图形工具套件的 Windows 版本，它能够让设计人员和开发人员创建交互式矢量动画，这些动画可以使用状态机实时响应代码。即将推出的 Windows 版本的应用程序提供了惊人的性能和更低的内存占用，并将很快将在 Microsoft Store 中提供下载。

![]({{site.flutter-files-cn}}/posts/images/2022/02/7d6b68e9aaec4.jpg)

看到围绕着 Flutter 的建立的成熟生态，我们非常激动，在你开始使用 Flutter 构建 Windows 应用的时候，我们鼓励你多尝试一下生态里的这些合作伙伴的服务和工具。

## Flutter 2.10 中的 Windows 平台支持

作为 Flutter 2.10 正式版的一部分，Flutter 已经可以为 Windows 平台构建应用程序提供稳定的、具备生产质量的支持，Flutter 2.10 还包含诸多其他新特性和性能改进以及错误修复，在今天的另一篇推文中已经详细介绍。

在未来几个月里，我们会发布更多为 macOS 和 Linux 平台提供稳定版支持的消息，让你可以通过 Flutter 为更全的桌面平台、Web 平台和移动端平台构建精美应用！

再次感谢大家对 Flutter 的支持，期待看到你为 Windows 平台构建的精彩应用程序！

![]({{site.flutter-files-cn}}/posts/images/2022/02/56b3f56c8b099.jpg)

- 如果你想将上面这个图片当作桌面背景，请点击点击这个链接下载原图: {{site.flutter-files-cn}}/images/branding/desktop/dash2022_4k.png

## 致谢

- 原文: Announcing Flutter for Windows
- 链接: https://medium.com/flutter/announcing-flutter-for-windows-6979d0d01fed
- 翻译: Vadaski
- 审校: Luke
- 制图: Lynn
