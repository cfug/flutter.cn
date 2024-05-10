---
title: 无限可能 — Flutter 2 重点更新一览
toc: true
---

我们非常高兴在本周发布了 [Flutter 2](https://mp.weixin.qq.com/s/tJe2ScLgKWFTybpBtDl2TA)。自 Flutter 1.0 发布至今已有两年多的时间，在如此短暂的时间内，我们解决了 24,541 个 issue，合并了来自 765 个贡献者的 17,039 个 PR。自九月发布 [Flutter 1.22](https://mp.weixin.qq.com/s/k71z0Kihuz34Ol2O7j1WrA) 以来，我们已解决 5,807 个 issue，合并了来自 298 个贡献者的 4,091 个 PR。在此特别感谢广大的贡献者，将业余时间慷慨地投入到 Flutter 项目的优化中。Flutter 2 的杰出贡献者有 [xu-baolin](https://github.com/xu-baolin) (贡献了 46 个 PR)、[a14n](https://github.com/a14n) (贡献了 32 个 PR；专注于为 Flutter 引入空安全) 和 [hamdikahloun](https://github.com/hamdikahloun) (贡献了 20 个 PR；优化了一系列 Flutter 插件)。然而，为 Flutter 项目做出贡献的不只有开发者，还有我们负责评审 1,525 个 PR 的众多 PR 评审员，其中包括 [hamdikahloun](https://github.com/hamdikahloun) (身兼数职！)、[CareF](https://github.com/CareF) 和 [YazeedAlKhalaf](https://github.com/YazeedAlKhalaf) (年仅 16 岁！) 等人。Flutter 是真正的社区合力之作，如果没有问题反馈者、PR 贡献者和代码评审员，版本 2 便无法问世，是你们带来了这一新版本。

Flutter 2 的发布也带来了许多振奋人心的内容。你可以阅读图文《[Flutter 2 正式发布！](https://mp.weixin.qq.com/s/tJe2ScLgKWFTybpBtDl2TA)》，快速了解 Flutter 2 和 [Dart 2.12](https://medium.com/dartlang/announcing-dart-2-12-499a6e689c87) 中的新增功能，以及我们的客户及合作伙伴是如何使用 Flutter 2 的。我们将在下周的图文中为大家详细介绍如何在生产环境中使用 [Flutter web 稳定版](https://medium.com/flutter/web-post-d6b84e83b425) 并发挥其优势。

下面我们一起来详细了解下 Flutter 2 的新增功能吧！

## Web

从现在开始，Flutter web 的支持已经从 Beta 版过渡到稳定阶段。随着首个稳定版本的发布，Flutter 通过对 web 平台的支持，将代码的复用性提升到了一个新高度。现在，当你平稳运行 Flutter 应用时，可以将 web 作为一个新的适配方向。

![]({{site.flutter-files-cn}}/posts/images/2021/03/6547ec1e75755.png)

> 作为一家致力于通过数字化实现卓越运营的现代移动虚拟网络运营商，[Moi Mobiili](https://www.moi.fi/) 选择使用 Flutter 构建其 Mun Moi 客户经理应用，并在近期发布了其 web 版应用。

借助 web 平台的诸多优势，Flutter 为构建丰富的交互式 web 应用奠定了基础。我们的首要重点是提升性能并优化渲染。除了 HTML 渲染引擎外，我们还新增了一个基于 CanvasKit 的渲染引擎，以及一些如 [Link Widget](https://pub.flutter-io.cn/documentation/url_launcher/latest/link/Link-class.html) 等特定于 web 的功能，以确保你的应用能够像 web 应用一样在浏览器中稳定运行。

有关此 [Flutter web 稳定版](https://medium.com/flutter/web-post-d6b84e83b425) 的更多详情，请参阅 Flutter web 发布文章:

## 空安全

健全的空安全是对 Dart 语言的重要补充，它通过区分可空类型和不可空类型来进一步加强类型系统。这使开发者能够防止 null error 崩溃，这也是导致应用崩溃的常见原因。通过将空检查合并到类型系统中，可以在开发期间捕获这些错误，从而防止生产环境中的崩溃。在包含 Dart 2.12 的 Flutter 2 中，健全的空安全得到了充分的支持。要了解更多细节，请参阅 [Dart 2.12 发布文章](https://medium.com/dartlang/announcing-dart-2-12-499a6e689c87):

pub.dev 已经发布了 [超过 1,000 个空安全 package](https://pub.flutter-io.cn/packages?q=&null-safe=1)，包括来自 [Dart](https://pub.flutter-io.cn/packages?q=publisher%3Adart.dev&sort=popularity&null-safe=1)、[Flutter](https://pub.flutter-io.cn/packages?q=publisher%3Aflutter.dev&sort=popularity&null-safe=1)、[Firebase](https://pub.flutter-io.cn/packages?q=publisher%3Afirebase.google.com&sort=popularity&null-safe=1) 和 [Material](https://pub.flutter-io.cn/packages?q=publisher%3Amaterial.io&sort=popularity&null-safe=1) 团队发布的数百个 package。如果你也是 package 的作者，请参阅 [迁移指南](https://dart.cn/null-safety/migration-guide) 并着手迁移事项。

## 桌面设备

在新版本中，Flutter 对桌面设备的支持已经进入稳定版本的前期准备阶段。也就是说，你现在可以尝试将其作为你 Flutter 应用的部署目标: 把它看作最终稳定版发布前的预览，最终稳定版本将于今年晚些时候发布。

Flutter 桌面版经过一系列大大小小的优化，才达到现在的质量。我们率先从文本编辑入手，确保其在每个支持平台上都能令 [文本选择点](https://github.com/flutter/flutter/pull/71756) 等基本功能获得如原生般的顺畅运行体验，并能够 [在键盘事件经过处理后将其取消](https://github.com/flutter/flutter/issues/33521)。在鼠标输入方面，我们也已确保，当处理触摸输入以及在 [Material](https://github.com/flutter/flutter/pull/74286) 和 [Cupertino](https://github.com/flutter/flutter/pull/73882) 设计语言的 TextField 和 TextFormField 中添加内置上下文菜单，并 [在 ReorderableListView 上提供抓取控点](https://github.com/flutter/flutter/pull/74299) 时，使用高精度定点设备的拖放事件将立即开始，没有任何延迟。另外，内置的上下文菜单已经添加至以 Material 和 Cupertino 为设计语言的 TextField 及 TextFormField widget 中，ReorderableListView widget 添加了抓取控点功能。

![]({{site.flutter-files-cn}}/posts/images/2021/03/a362da9373a9e.gif)

> ReorderableListView 现已支持抓取控点，便于鼠标轻松拖动

开发者可以使用 ReorderableListView 轻松移动项目，但用户需要长按项目以启用拖动操作。该设计在移动设备上很合理，但很少有桌面平台的用户会想到用鼠标长按某个项目来移动它，所以新版本提供了一个适用于鼠标或触摸输入的抓取控点。按照同样的思路，对于因平台而异的惯用功能，新版本提供了一个 [经过升级的滚动条](https://github.com/flutter/flutter/pull/71664)，可使其与桌面平台完美适配。

![]({{site.flutter-files-cn}}/posts/images/2021/03/8f412222d985f.gif)

> 新版本中的滚动条 widget 已适配桌面平台

更新后的 Scrollbar Widget 为桌面平台提供了预期的相同交互功能，例如支持拇指拖动、点击滚动条空白区域进行上下翻页，以及将鼠标悬停在滚动条的任何部位以显示一个轨道等。此外，由于滚动条可以通过 [新增的 ScrollbarTheme](https://api.flutter.dev/flutter/material/ScrollbarTheme-class.html) 类设定主题，你可以根据你的应用对其外观和感觉进行个性化设计。

对于其他桌面平台的特定功能，本版本还为 Flutter 应用启用了命令行参数处理，这样一来，你可以通过在 Windows 文件资源管理器中双击鼠标等简单操作来打开应用中的文件。此外，我们还努力使 [Windows](https://github.com/flutter/engine/pull/23701) 和 [macOS](https://github.com/flutter/engine/pull/23924) 上的大小调整操作变得更加流畅，并面向全球用户推出了输入法 (IME) 支持。

![]({{site.flutter-files-cn}}/posts/images/2021/03/62d569de4af28.gif)

> Flutter 桌面现支持输入法直接输入

我们还提供了更新的 [文档](https://flutter.cn/desktop#create-a-new-project)，以指导你做好准备，将应用部署到相应的操作系统商店中。你不妨参考一下，如发现有任何遗漏，请反馈给我们。

试用 Flutter 桌面 Beta 版时，你可以按需切换到 beta 渠道来进行访问，并按照 [Flutter 文档上的说明](https://flutter.cn/desktop#create-a-new-project) 设置目标平台的配置标记。此外，我们还在稳定渠道中新增了 Beta 版的快照。当你使用 "flutter config" 启用其中一个桌面配置设置 (如 enable-macos-desktop 时)，你可以直接尝试使用桌面 Beta 版功能，而无需再经历前往 Beta 渠道、获取完整的 Beta 版及构建工具等漫长的过程。你不妨亲自尝试一下，或把桌面支持作为一个简单的 "Flutter 模拟器"，非常好用。

然而，如果你选择继续通过稳定渠道使用桌面 Beta 版，那么你将无法像切换到 Beta 或开发渠道时那样快速获取新功能或错误修复，因此，如果你以 Windows、macOS 或 Linux 为明确目标，我们建议你切换到更新速度更快的渠道。

在开发稳定版 Flutter 桌面支持过程中，我们深知未来还有很多工作要做，包括支持原生顶级菜单集成、提供如同独立平台一样的文本编辑体验和无障碍功能支持，以及一般漏洞修复和性能增强。如果你认为桌面平台在投入生产之前仍然有一些地方需要完善，望 [不吝赐教](http://github.com/flutter/flutter/issues)！

## 平台自适应应用示例: Flutter Folio

现在 Flutter 已可在三个平台 (Android、iOS 和 web) 上为生产环境的应用提供支持，还有三个平台仍处于测试阶段 (Windows、macOS 和 Linux)，那么问题来了: 如何开发一款应用，可以良好适应多种不同屏幕规格 (大、中、小屏幕)、不同输入模式 (触控、键盘和鼠标) 和不同惯用设备 (移动、web 和桌面)？为了给自己以及各地的广大 Flutter 开发者解决这个问题，[Flutter Folio 应用应运而生](https://youtu.be/x4xZkdlADWo)。

你可将 Folio 视作一个简单的示例应用，帮助你在多个平台上利用单一代码库良好地运行应用。"良好运行" 是指它能在大、中、小屏幕上正常显示，并能利用触控、键盘和鼠标输入，还可适应不同平台的风格，例如使用 web 上的链接、使用桌面设备上的菜单等等。我们将此类应用称为 "平台自适应应用"，因为这类应用能良好地适应所运行的任何平台。

如需查看如何使应用自适应平台，请参阅 [Folio 的源代码](https://github.com/gskinnerTeam/flutter-folio)。未来，希望能有更为深入地探讨此主题的文档和 codelabs 出现。你还可以阅读和观看 Aloïs Deniel 关于该主题的 [博文和视频](https://aloisdeniel.com/#/posts/adaptative-ui)。

## Google Mobile Ads 发布 Beta 版

除了发布 Flutter 桌面 Beta 版外，我们也非常高兴地发布了 Google Mobile Ads SDK for Flutter 的公开 Beta 版。这是一个全新插件，除了原有的叠加格式 (叠加横幅、插页和激励视频广告)，我们还在其中新增了内联横幅及原生广告。另外，我们还在此插件中提供了 Ad Manager 和 Admob 支持，无论你是何种规模的发布商，这款插件都能满足你的需求。

![]({{site.flutter-files-cn}}/posts/images/2021/03/2d7174f7a14d8.jpg)

在公开发布 Beta 之前，我们邀请了一些客户参与试用这款插件。许多客户都使用了这些新增的广告格式成功地发布了应用。例如，Sua Musica (拉丁美洲最大的独立艺术家音乐平台，拥有超过 15,000 位认证音乐人和一千万活跃用户) 使用了 Google Mobile Ads SDK for Flutter 插件发布了新的应用。其广告展示量增加了 350%，点击率增加了 43%，千次展示收益上涨了 13%。

你此刻就可使用该 [插件]([https://pub.flutter-io.cn/packages/google_mobile_ads](https://pub.flutter-io.cn/packages/google_mobile_ads)) 了。在刚结束的 [Flutter Engage](https://zhuanlan.zhihu.com/p/355036482) 上，Andrew 和 Zoey 围绕《[如何通过 Flutter 应用获利](https://v.qq.com/x/page/a323184ybj7.html)》介绍了一些 Flutter 应用创收策略，以及如何在 Flutter 应用中加载广告，你可以查看下方视频了解详细内容。此外，我们在 flutter.dev 上创建了一个新的 [Ads 页面](https://flutter.cn/ads)，方便你查找所需资源，如 [插件使用指南](https://developers.google.cn/admob/flutter)，[内联横幅和原生广告](https://codelabs.developers.google.com/codelabs/admob-inline-ads-in-flutter) codelab，以及[叠加横幅，插页和激励视频广告](https://codelabs.developers.google.com/codelabs/admob-ads-in-flutter#0) codelab，欢迎你随时查看。更多信息请查看 [如何通过 Flutter 应用获利](https://v.qq.com/x/page/a323184ybj7.html) 视频。

## 新增 iOS 功能

在不断提高对其他平台支持的同时，我们并没有将 iOS 抛诸脑后。事实上，新版本提供了 178 个与 iOS 相关的合并 PR，其中包括将状态恢复 (State Restoration) 引入 iOS 的 [23495](https://github.com/flutter/engine/pull/23495)，应开发者需求——不用打开 Xcode 就可以直接从命令行建立 IPA 的 [67781](https://github.com/flutter/flutter/pull/67781)，以及更新 CocoaPods 版本以配合最新工具的 [69809](https://github.com/flutter/flutter/pull/69809)。此外，我们还在 Cupertino 设计语言实现中添加了一些 iOS 小部件。

新增的 [CupertinoSearchTextField](https://api.flutter.cn/flutter/cupertino/CupertinoSearchTextField-class.html) 为 iOS 提供了搜索栏 UI。

![]({{site.flutter-files-cn}}/posts/images/2021/03/a62ac8b91dd58.jpg)

[CupertinoFormSection](https://api.flutter.cn/flutter/cupertino/CupertinoFormSection-class.html)、[CupertinoFormRow](https://api.flutter.cn/flutter/cupertino/CupertinoFormRow-class.html) 和 [CupertinoTextFormFieldRow](https://api.flutter.cn/flutter/cupertino/CupertinoTextFormFieldRow-class.html) 等 widgets 则利用 iOS 的视觉美学简化了验证表单字段的生成。

![]({{site.flutter-files-cn}}/posts/images/2021/03/2c7bc09f2c6c5.png)

除了为 iOS 新增功能以外，我们也在持续寻求 iOS 和 Flutter 在着色器和动画方面的 [整体性能优化](https://github.com/flutter/flutter/issues/60267#issuecomment-762786388)。iOS 仍然是 Flutter 的首要平台，我们将继续致力于为大家带来重要的新功能和性能提升。

## 新增 Widget: Autocomplete 和 ScaffoldMessenger

新版 Flutter 新增了两个 Widget，分别是 [AutocompleteCore](https://github.com/flutter/flutter/pull/62927) 和 ScaffoldMessenger。AutocompleteCore 是在你的 Flutter 应用中实现自动补全功能所需的基础功能。

![]({{site.flutter-files-cn}}/posts/images/2021/03/e40d0f6eccfcd.gif)

开发者对为 Flutter 增加 Autocomplete 功能的呼声很高，所以我们在新版本中提供了此功能。你现在即可使用，如果你想了解该功能的设计理念，请参阅 [设计文档](https://docs.google.com/document/d/1fV4FDNdcza1ITU7hlgweCDUZdWyCqd-rjz_J7K2KkfY/)。

同样，[ScaffoldMessenger](https://github.com/flutter/flutter/pull/64101) 可用于处理许多与消息提示 Snackbar 相关的问题，例如，它可以轻松创建 Snackbar 消息以响应 AppBar 操作、创建可在 Scaffold 转换之间持久保存的 Snackbar 消息，并能够在异步操作完成时显示 Snackbar 消息，即使用户已导航至使用不同 Scaffold 的页面时也不例外。

![]({{site.flutter-files-cn}}/posts/images/2021/03/aed84cb7b2ce7.gif)

你只需写一行代码，即可将所有这些更加便捷的新功能收入囊中。从现在开始，你可以使用此行代码来显示你的 Snackbar 消息:

```dart
final messenger = ScaffoldMessenger.of(context);
messenger.showSnackBar(SnackBar(content: Text(‘I can fly.’)));
```

如你所想，其中原理不止于此，你可以观看 Kate Lovett 发布的 [关于 ScaffoldMessenger 的精彩视频](https://www.youtube.com/watch?v=sYG7HAGu_Eg) 了解详情。

## 通过 "添加到应用" 功能创建多个 Flutter

在和许多 Flutter 开发者聊天的过程中，我们得知大多数人并非是从零开发一个全新应用，而是会通过将 Flutter 添加到现有的 iOS 和 Android 应用中来进行使用。我们将此功能称为 [混合编程 (Add-to-App)](https://docs.flutter.cn/development/add-to-app)，你可以通过这种方法，在保留现有原生代码库的同时，在两个移动平台间重复使用 Flutter 代码。然而，我们有时听到采用此方法的开发者们表示，他们不知如何摆脱只能将第一个画面集成到 Flutter 的限制。Flutter 和原生页面交织导致导航状态难以维护，而且在视图级别集成多个 Flutter 会占用大量内存。

过去，额外 Flutter 实例的内存占用量与第一个 Flutter 实例相同。在 Flutter 2 中，我们将创建额外 Flutter 引擎的静态内存占用量降低了约 99%，使每个实例的占用量大约为 180kB。

![]({{site.flutter-files-cn}}/posts/images/2021/03/81b71e6e83d2d.gif)

提供该支持的新增 API 目前尚处于预览状态，在 [我们的文档里](https://docs.flutter.cn/development/add-to-app/multiple-flutters)，你可以找到通过使用这种新模式的说明和 [示例项目](https://github.com/flutter/samples/tree/master/add_to_app/multiple_flutters)。随着这一变化的出现，我们强烈建议你在原生应用中创建多个 Flutter 引擎实例。

## Flutter Fix

当任何成熟的框架聚集了拥有庞大代码库的用户时，我们往往需要避免对框架 API 进行任何更改，以避免破坏日益增多的代码。随着超过 50 万的 Flutter 开发者分布在越来越多的平台，Flutter 2 很快就会踏入这一行列。然而，随着时间的推移，为了持续改进 Flutter，我们希望能够对 API 进行重大更改。现在的问题是，如何在不影响开发者的前提下继续改进 Flutter API。

我们为此推出了 [Flutter Fix](https://docs.flutter.cn/development/tools/flutter-fix)。

Flutter Fix 是一系列功能的组合。首先，我们为 dart 命令行工具新增了一个名为 "dart fix" 的命令行选项，你可借此寻找弃用 API 列表的所在位置，并了解如何更新调用这些 API 的代码。其次，Flutter Fix 本身就是个列表，自版本 2 开始便与 Flutter SDK 绑定。另外，Flutter Fix 也是一组针对 Visual Studio Code、IntelliJ 和 Android Studio IDE 的新 Flutter 扩展程序，你可借此找到已弃用 API 的相同列表，单击鼠标，轻点旁边的小灯泡图标即可更改代码，完成快速修复。

举个例子，比如你的应用具有下面一行代码:

![]({{site.flutter-files-cn}}/posts/images/2021/03/8c4cb573969e2.jpg)

> 使用已弃用的函数创建 Flutter widget

因为这个函数已经弃用，请使用下面的参数代替:

![]({{site.flutter-files-cn}}/posts/images/2021/03/78d1c0bbae193.jpg)

> 替换已弃用的函数并创建 Flutter widget

即使你熟悉和了解很多 Flutter 中已弃用的内容，代码中需要修改的内容越多，就越难修复所有的内容，也就越容易出现错误。人类并不擅长这种重复性的工作，但计算机不一样。通过下面的命令，你可以看到我们如何在你的整个项目中进行问题修复:

```console
$ dart fix --dry-run
```

如想批量应用它们，你亦可以通过以下代码轻松实现:

```console
$ dart fix --apply
```

或者，如果你希望以交互方式在你喜欢的 IDE 中应用这些修复，也可以实现。

![]({{site.flutter-files-cn}}/posts/images/2021/03/a12a132d45d16.png)

多年来，我们一直在标记已弃用的旧 API，现在我们制定了一个策略，明确 [何时真正移除弃用的 API](https://medium.com/flutter/deprecation-lifetime-in-flutter-e4d76ee738ad)，而我们率先将其应用到了 Flutter 2 之中。尽管我们尚未捕捉到所有弃用 API，并将其以数据形式提供给 Flutter Fix，但我们会不断从之前弃用的 API 中获取更多内容，并在未来持续加入新的重大更改。我们的目标是尽全力将 Flutter API 打造的尽善尽美，同时保持代码的及时更新。

## Flutter DevTools

为了明确 DevTools 是用于调试 Flutter 应用的工具，现在我们已将其命名为 Flutter DevTools。此外，我们还做了很多工作，让其可以成为与 Flutter 2 成熟度与质量相匹配的版本。

其中有一个新功能，可在你尚未启动 Flutter DevTools 2 时帮你锁定问题，那就是你的 IDE 能够发现常见的异常，并在 DevTools 中提出这个异常，以助你开展调试。例如，下面显示你的应用中抛出了一个溢出异常，系统在 Visual Studio Code 中提供了一个在 DevTools 中调试此问题的选项。

![]({{site.flutter-files-cn}}/posts/images/2021/03/608e8fe5872ec.png)

> Flutter IDE 扩展的溢出异常提示通知

按下该按钮，你即可利用 DevTools 中的 Flutter Inspector 检查引发问题的 Widget，以便进行修复。我们今天的操作只是为了解决溢出异常，但这种处理方法适用于 DevTools 可以解决的各种常见异常。

在 DevTools 开始运行后，你可通过标签上的新错误标识帮助自己追踪应用中出现的具体问题。

![]({{site.flutter-files-cn}}/posts/images/2021/03/0dd3177d5686b.png)

> DevTools 中的红点可以帮助提醒应用中存在的错误部分

DevTools 的另一个新功能是能够轻松发现所显示的分辨率低于其实际分辨率的图像，这有助于追踪应用过大和内存占用过多等情况。若要启用此功能，请在 Flutter Inspector 中启用 Invert Oversized Images。

![]({{site.flutter-files-cn}}/posts/images/2021/03/045ae1f47d21f.png)

> 启用 "反转超大尺寸图像 (Invert Oversized Images)" 选项，以突出显示异常图像

现在，当图像的实际分辨率明显大于其显示大小时，系统就会将其倒置，以便你在应用中轻松找到它。

![]({{site.flutter-files-cn}}/posts/images/2021/03/4dc22b9b72fb5.png)

> "反转超大图像" 的操作示例

此外，为响应大量用户的要求，除了在 Flutter Inspector 的 Layout Explorer 中显示有关弹性布局的详细信息外，我们还添加了显示固定布局的功能，可便于你调试各种布局。

![]({{site.flutter-files-cn}}/posts/images/2021/03/b11256af35d94.png)

> 新的 Layout Explorer 显示了 fixed 和 flex layout 的布局细节

其功能还远不止如此。以下是对 Flutter DevTools 2 其他一些新增功能的总结:

* 为 Flutter 帧图添加了平均 FPS 信息和易用性改进
* 用红色的错误标签在网络分析器中调用失败的网络请求
* 新的内存视图图表更快、更小、更简单易用，其中包含用于在特定时间描述活动的悬浮卡片
* 在 "Logging (日志库)" 选项卡中新增了搜索和筛选功能
* 从 DevTools 启动之前开始跟踪日志，以便在启动后可以看到完整的日志记录
* 将 "Performance" 视图重命名为 "CPU Profiler"，以便更清楚地表示其功能
* 为 CPU Profiler 帧图添加了时间网格
* 将 "Timeline" 视图重命名为 "Performance"，以便更清楚地表示其功能

当然这并不是全部。想了解所有相关更改，建议你查阅下列公告:

* [DevTools 0.9.4](https://groups.google.com/g/flutter-announce/c/mx_hBxuXM9Q/m/Kjy9dqS3AAAJ)
* [DevTools 0.9.5](https://groups.google.com/g/flutter-announce/c/mNqTNPUwBKw/m/_1qyXwTBAQAJ)
* [DevTools 0.9.6](https://groups.google.com/g/flutter-announce/c/Ta5HR39P3go/m/2a43w7iSCwAJ)
* [DevTools 0.9.7](https://groups.google.com/g/flutter-announce/c/IJ97oJ2HpxM/m/909J9Kl8AQAJ)
* [DevTools 2.0](https://groups.google.com/g/flutter-announce/c/0xQhJR4nQbI)

## Android Studio/IntelliJ Extension

我们也为 IntelliJ 系列 IDE 的 Flutter 插件添加了一些适用于 Flutter 2 的新功能。首先，我们在其中新增了一个项目向导，该向导与 IntelliJ 中的新向导风格一致。

![]({{site.flutter-files-cn}}/posts/images/2021/03/e239fc16e88ab.png)

![]({{site.flutter-files-cn}}/posts/images/2021/03/41eb9c6d72ccc.png)

此外，如果你正在 Linux 上使用 IntelliJ 或 Android Studio，针对 [安装自 Snap Store 的 Flutter SDK](https://snapcraft.io/flutter) 进行编程，那么系统便会将 Flutter snap 路径添加到已知的 SDK 路径列表中。这使得 Flutter snap 用户可以更轻松地在 "Settings (设置)" 中配置 Flutter SDK。感谢 Marcus Tomlinson 对此作出的贡献！

![]({{site.flutter-files-cn}}/posts/images/2021/03/231b9293873b0.png)

> 通过 Snap 安装 Flutter SDK，可以更轻松的在 Linux 上使用 Android Studio

你可以从最近更新公告中了解更多有用信息:

* [IntelliJ Plugin M51](https://groups.google.com/g/flutter-announce/c/w65rD73R83Q/m/gV5p0qf2AAAJ)
* [IntelliJ Plugin M52](https://groups.google.com/g/flutter-announce/c/tQqqMOIg6V0/m/wj7Kbv4-AgAJ)
* [IntelliJ Plugin M53](https://groups.google.com/g/flutter-announce/c/V335xbsPWUs/m/14LSp05kAQAJ)
* [IntelliJ Plugin M54](https://groups.google.com/g/flutter-announce/c/-jYDrwG7PmA)

## Visual Studio Code 扩展

适用于 Visual Studio Code 的 Flutter 扩展也针对 Flutter 2 进行了优化，我们首先引入了一些测试增强功能，例如重新运行失败测试的能力。

![]({{site.flutter-files-cn}}/posts/images/2021/03/7b6ddc9b0f723.png)

经过两年的逐步发展，对 Dart 的 LSP (语言服务器协议) 支持已经成为在 Flutter 扩展中将 Dart 分析器集成到 Visual Studio Code 中的默认方式。LSP 支持为 Flutter 开发带来了许多改进，包括在当前的 Dart 文件中应用特定的所有修复，以及能够补全代码以生成完整函数调用 (包括括号和所需参数) 的能力。

![]({{site.flutter-files-cn}}/posts/images/2021/03/d2ba55aae416d.gif)

![]({{site.flutter-files-cn}}/posts/images/2021/03/dcd04901b23b0.gif)

LSP 支持不仅限于 Dart，它还支持 pubspec.yaml 及 analysis_options.yaml 文件中的代码补全。

![]({{site.flutter-files-cn}}/posts/images/2021/03/dcd04901b23b0.gif)

这仅仅是近期 Visual Studio Code 适用于 Flutter 的部分扩展更新。你可以阅读下列公告，了解全部更新内容:

* [Visual Studio Code 插件 v3.16](https://dartcode.org/releases/v3-16/)
* [Visual Studio Code 插件 v3.17](https://dartcode.org/releases/v3-17/)
* [Visual Studio Code 插件 v3.18](https://dartcode.org/releases/v3-18/)
* [Visual Studio Code 插件 v3.19](https://dartcode.org/releases/v3-19/)
* [Visual Studio Code 插件 v3.20](https://dartcode.org/releases/v3-20/)

## DartPad 升级到支持 Flutter 2

如果不提 DartPad，那我们的工具更新就不能算完整，DartPad 现已更新并支持 Flutter 2。

![]({{site.flutter-files-cn}}/posts/images/2021/03/20cfd09d4ec0a.png)

> DartPad 已经升级到支持 Flutter 2 了

现在，无需离开喜欢的浏览器，你就可以体验新的 Flutter 空安全版本。

## 生态系统更新

Flutter 开发体验不仅包括框架和工具；还包括为 Flutter 应用提供的各种软件包和插件。自上一次 Flutter 稳定版本发布以来，这方面也发生了很多变化。例如，我们已在摄像头和视频播放器插件之间合并了将近 30 个 PR，从而大大提高了两者的质量。如果你在过去使用这两种产品时曾遇到过问题，那么你应该再尝试一次，你会发现它们比以前更加强大。

另外，如果你是 Firebase 用户，我非常高兴地宣布热门插件的产品质量已经得到了提高并可投入生产，同时我们还为这些插件提供了空安全支持以及针对 Android、iOS、web 和 macOS 的 [全套参考文档和常用教程](http://firebase.flutter.dev)。这些插件包括:

* Core
* Authentication
* Cloud Firestore
* Cloud Functions
* Cloud Messaging
* Cloud Storage
* Crashlytics

如果你正在寻找应用的崩溃报告，你可以考虑使用 Sentry，其已经发布了 [适用于 Flutter 应用的新 SDK](https://blog.sentry.io/2021/03/03/with-flutter-and-sentry-you-can-put-all-your-eggs-in-one-repo/)。

![Sentry 崩溃报告工具已经支持 Flutter]({{site.flutter-files-cn}}/posts/images/2021/03/7d5f73ad3037b.jpg)

> Sentry 崩溃报告工具已经支持 Flutter

在 Flutter 应用中使用 Sentry 的 SDK，你可以在 Android、iOS 或原生平台上发生错误时收到实时通知。查阅 [Sentry 文档](https://docs.sentry.io/platforms/flutter/) 了解更多详细信息。

另外，如果你尚未了解过 [Flutter 社区中的 "Plus" 插件](http://plus.fluttercommunity.dev/)，你也可着手尝试。Flutter 团队最初开发的许多热门插件均由此衍生而来，我们已在 Plus 插件中添加了空安全支持和对其它平台的支持，并已着手开始解决 flutter/plugins 库中的相应问题。这些插件包括:

* Android Alarm+
* Android Intent+
* Battery+
* Connectivity+
* Device Info+
* Network Info+
* Package Info+
* Sensors+
* Share+

目前，与 Flutter 兼容的 package 和插件数量超过 15,000 个，这会让人很难找到那些值得优先考虑的软件包和插件。因此，我们发布了 Pub 分值 (静态分析评分)、人气排名、喜爱度，若软件包质量出众，我们会为其打上 "[Flutter Favorite](https://docs.flutter.cn/development/packages-and-plugins/favorites)" 的特殊标记。为与 Flutter 2 适配，我们已在 Favorite 列表中添加了几个新软件包:

* animated_text_kit
* bottom_navy_bar
* chopper
* font_awesome_flutter
* flutter_local_notifications
* just_audio

祝贺这些软件包的作者！如果你尚未了解这些软件包或 [列表中的其它软件包](https://pub.flutter-io.cn/flutter/favorites)，建议你着手开始了解。

最后同样也是很重要的一点，如果软件包作者或用户有兴趣了解最新版本的软件包是否适用于最新版本的 Flutter，可以查看 Codemagic 的新 pub.green 网站以了解详情。

![]({{site.flutter-files-cn}}/posts/images/2021/03/59ffdf68da593.jpg)

Codemagic 发布了一个网站 pub.green 用来展示 package 和近期 Flutter 版本的兼容性结果

你可在 [pub.green](http://pub.green/) 网站上测试 pub.dev 上可用的 Flutter 和 Dart 软件与不同 Flutter 版本的兼容性。了解更多信息，推荐查阅 [CodeMagic 团队的公告博文](https://blog.codemagic.io/pub-green/)。

## 重大变更

我们为 Flutter 2 做了如下重大变更，你可利用 "dart fix" 命令自动缓解其中的许多内容:

* [61366 继续对 clipBehavior 进行重大变更](https://github.com/flutter/flutter/pull/61366)
* [66700 将默认 FittedBox 的 clipBehavior 更改为无](https://github.com/flutter/flutter/pull/66700)
* [68905 从 Cupertino 颜色 API 中移除 nullOk 参数](https://github.com/flutter/flutter/pull/68905)
* [69808 从 Scaffold.of 和 ScaffoldMessenger.of 中移除 nullOk 参数，为两者创建 maybeOf](https://github.com/flutter/flutter/pull/68908)
* [68910 从 Router.of 中移除 nullOk 参数，使其返回非空值](https://github.com/flutter/flutter/pull/68910)
* [68911 在 Localizations 中加入 maybeLocaleOf 方法](https://github.com/flutter/flutter/pull/68911)
* [68736 从Media.queryOf 中移除 nullOK 参数](https://github.com/flutter/flutter/pull/68736)
* [68917 从 Focus.of, FocusTraversalOrder.of 和 FocusTraversalGroup.of 中移除 nullOK](https://github.com/flutter/flutter/pull/68917)
* [68921 从 Shortcuts.of, Actions.find, and Actions.handler 中移除 nullOK](https://github.com/flutter/flutter/pull/68921)
* [68925 从 AnimatedList.of 和 SliverAnimatedList.of 中移除 nullOK](https://github.com/flutter/flutter/pull/68925)
* [69620 从 BuildContext 中删除已弃用的方法](https://github.com/flutter/flutter/pull/69620)
* [72017 删除已弃用的 CupertinoTextThemeData.brightness](https://github.com/flutter/flutter/pull/72017)
* [72395 删除已弃用的 [PointerEnterEvent, PointerExitEvent].fromHoverEvent](https://github.com/flutter/flutter/pull/72395)
* [72532 删除已弃用的 showDialog.child](https://github.com/flutter/flutter/pull/72532)
* [72890 删除已弃用的 Scaffold.resizeToAvoidBottomPadding](https://github.com/flutter/flutter/pull/72890)
* [72893 删除已弃用的 WidgetsBinding.[deferFirstFrameReport, allowFirstFrameReport]](https://github.com/flutter/flutter/pull/72893)
* [72901 删除已弃用的 StatefulElement.inheritFromElement](https://github.com/flutter/flutter/pull/72901)
* [72903 删除已弃用的元素方法](https://github.com/flutter/flutter/pull/72903)
* [73604 删除已弃用的 CupertinoDialog](https://github.com/flutter/flutter/pull/73604)
* [73745 从 Cupertino[Sliver]NavigationBar 中删除已弃用的 actionsForegroundColor](https://github.com/flutter/flutter/pull/73745)
* [73746 删除已弃用的 ButtonTheme.bar](https://github.com/flutter/flutter/pull/73746)
* [73747 删除 Span 弃用项](https://github.com/flutter/flutter/pull/73747)
* [73748 删除已弃用的 RenderView.scheduleInitialFrame](https://github.com/flutter/flutter/pull/73748)
* [73749 删除已弃用的 Layer.findAll](https://github.com/flutter/flutter/pull/73749)
* [75657 在 Localizations.localeOf 移除残留的 nullOK 参数](https://github.com/flutter/flutter/pull/74657)
* [74680 从 Actions.invoke 移除 nullOK 参数，并添加 Actions.maybeInvoke 方法](https://github.com/flutter/flutter/pull/74680)

## 总结

最后，我想代表 Google Flutter 团队全体成员向开发者们说一句谢谢！感谢你们在过去的两年里推出了超过 15 万款 Flutter 应用，我们整理了一些团队喜欢的 Flutter 应用，在 [Flutter Engage 主题演讲](https://zhuanlan.zhihu.com/p/355036482) 上播放了这段视频，献给各位开发者和社区。

![]({{site.flutter-files-cn}}/posts/images/2021/03/638471b80bffd.jpg)

如果没有各位开发者们对自己构建的 Flutter 应用的持续支持和热忱，这个具备全球活力的开发者社区就不可能成为现实，我们非常期待看到你接下来的作品！
