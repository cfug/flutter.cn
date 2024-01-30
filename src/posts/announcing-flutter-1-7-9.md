---
title: Flutter 1.7 版正式发布
toc: true
---

{% include docs/bili_shims.liquid %}

文 / Tim Sneath，谷歌 Dart & Flutter 产品组产品经理

今天，我们非常高兴地向大家宣布又一个正式版本的发布 —— Flutter 1.7，这是继上次 I/O 时众多重要功能发布以来的一次小更新。Flutter 1.7 包含了对 AndroidX 的支持，满足了 Play 商店近期对应用提出的要求，包含了一些新的和增强过的组件，修复了开发者们提出的 bug 等。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/announcing-1-7.png){:width="95%"}

如果你已经安装，并使用默认稳定构建渠道 (stable channel) 的 Flutter，要升级到 1.7 版本，只需要运行 `flutter upgrade` 即可。同时，你可以在 [这个文档里]({{site.url}}/get-started/install) 查看如何新安装 Flutter。

## 支持 AndroidX

[AndroidX](https://developer.android.google.cn/jetpack/androidx)  是 Android 团队用于在 Jetpack 中开发、测试、打包和发布库以及对其进行版本控制的开源项目，帮助 Android 应用通过最新的组件保持更新而无需牺牲向后兼容性。目前 AndroidX 已经稳定，很多 Flutter packages 已经更新和支持它，Flutter 现在可以支持 [创建一个 AndroidX 项目 (new Flutter project with AndroidX)](https://github.com/flutter/flutter/pull/31028) 了，这也减少了与 Android 生态系统集成所你需要做的工作。

当创建 Flutter 项目的时候，你可以通过添加 `--androidx` 来确保生成的项目文件支持 AndroidX，
更多关于将项目迁移到 AndroidX 的相关信息，
请访问 [官方文档]({{site.url}}/development/androidx-migration#how-do-i-migrate-my-existing-app-plugin-or-host-editable-module-project-to-androidx) 上的说明。
我们也在积极努力为使用了 AndroidX 和 Android 混合库的应用带去 AndroidX 或 Jetifier 的支持，
也会将其作为 add-to-app 的中的一项来支持，接下来的文章中会为大家带来更多相关的内容。

## 支持 Android App Bundles 和 64 位的 Android 应用

从 2019 年 8 月 1 日开始，为了 target 到 Android Pie 版本，开发者们在 Google Play 上发布的应用 [必须支持 64 位架构](https://developer.android.google.cn/distribute/best-practices/develop/64-bit)。Flutter 一直都支持生成 64 位的 Android 应用，在 1.7 版本里，我们加入了对 [Android App Bundles](https://developer.android.google.cn/guide/app-bundle) 的支持，开发者们可以在一次提交里同时 target 到 64 位和 32 位。可通过阅读 [这篇文档]({{site.url}}/deployment/android) 了解到如何分别生成 32 位和 64 位到应用等更多内容。

## 新一批的 widget 和框架的增强功能

我们希望你的应用在任何平台上都可以看起来平滑自然，我们会持续在平台相关的 widgets 上投入。

如下所示了一个名为 [RangeSlider](https://github.com/flutter/flutter/pull/31681) 的 widget，帮助你在单个滑块儿上选择一组值：

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/rangeslider-widget.gif){:width="95%"}

RangeSlider widget 支持连续或者分散的效果

[更新之后](https://github.com/flutter/flutter/pull/31275) 的 [SnackBar](https://github.com/flutter/flutter/pull/31275) 支持了最新的 Material 规范，文档里增加了许多 [样例代码](https://github.com/flutter/flutter/pull/34679) 。

[Cupertino]({{site.url}}/development/ui/widgets/cupertino) 是用来构建精美的 iOS 体验的 widgets 库，我们对其进行了大量的更新。特别提出的是，我们提高了 [CupertinoPicker](https://github.com/flutter/flutter/pull/31464) 和  [CupertinoDateTimePicker](https://github.com/flutter/flutter/pull/31464) widget 的保真度，并增加了对非英语语言本地化的支持。

我们提升了 iOS 上的 [文本选择和编辑体验]({{site.url}}/resources/platform-adaptations#text-editing)。此外，我们新增了一个 [示例](https://github.com/flutter/samples/tree/master/platform_design)，关于如何使用同一份代码库，调整不同平台的操作体验和适配。

文本渲染有了很大的提升，支持了丰富的 [排版样式](https://api.flutter.dev/flutter/painting/TextStyle/fontFeatures.html)：包括数字表格式对齐、旧式风格数字 (tabular and old-style numbers)、斜线零 (slashed zeros)、样式集 (stylistic sets)，如这个示例应用截图所示：

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/openType-font.png){:width="95%"}

有了 OpenType 的字体支持，你可以用 Flutter 进行复杂的文字排版了

最后，我们加入了对 [游戏控制器](https://github.com/flutter/flutter/pull/33868) 的支持，会有更好玩的应用出现吗？

## 初心不忘

整个团队付出很多努力推出了 Flutter 1.7 正式版，我们解决了开发者们在 GitHub 上提出的 [1250 多个问题](https://github.com/flutter/flutter/issues?q=is%3Aissue+is%3Aclosed+closed%3A2019-04-22..2019-06-21+sort%3Areactions-%2B1-desc) 。

随着 Flutter 的快速增长，我们看到大家向我们报告了很多新的问题。为了保证项目过程的透明，我们一直在通过 GitHub 运行着这一套错误报告系统，但一些相对较小的项目，目前这个流程工作的并不是非常顺利。虽然我们在不想关 issue 关闭上有一些新的进展，但是过去几个月我们的 issue 还是增长的非常明显。我们也在努力增加这方面的资源配置，可以帮助我们更快的区分 bug，关闭及合并相同的 issue，以及将一些提问引导到 [StackOverflow](https://stackoverflow.com/questions/tagged/flutter)。

在近期的开发者调查里，很多开发者希望我们在文档和错误信息方面有更持续的投入。一个关键部分是能够在 VSCode 和 Android Studio 里更结构化的输出错误信息，我们已经在着手 [这方面的工作](https://github.com/flutter/flutter/pull/34684)。

我们也修复了崩溃率最高的 bug，Flutter 工具的写权限问题。Flutter 现在可以更优雅的处理写权限导致的崩溃问题，会又一个明晰的指示关于如何解决。

文档方面，我们会持续增加示例代码。与此同时，你也可以通过 Flutter create 命令直接创建示例文档，如下是命令：

```flutter create --sample=widgets.Form.1 mysample```

如果通过这种方式创建示例，你将在文档中的 Sample in the App 这一栏看到：

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/sample-at-docs.png){:width="95%"}

我们也会持续把每周 Flutter widgets 视频嵌入到文档中，在开发者们浏览各种 widget 的时候可以得到更全面的理解。

还有一些幕后的设施建设工作正在进行，以便 Flutter app 更好的在 macOS 和 Windows 平台运行。比如支持一些较为重要的平台操作，比如右键和一些特别的平台基建工作（比如 [MSBuild](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2019) 等）。不过，这些非移动平台的支持目前还没有在稳定构建渠道 (stable channel) 发布。

最后，当你在苹果电脑上开发 Flutter 应用的时候，我们支持了 [新的 Xcode 构建系统](https://github.com/flutter/flutter/pull/33684)，这个对新的应用是默认开启的，也同时方便 [支持现有的应用](https://github.com/flutter/flutter/issues/20685#issuecomment-509731873)。

## 不断壮大的 Flutter 社区

一如既往，我们非常高兴看到 Flutter 在受众群体和应用场景上继续持续增长，同时我们也欣赏各种不同的 Flutter 使用方式。自 I/O 以来，Flutter 团队致力于全球范围内的各项活动：从中国的 [GMTC](https://gmtc2019.geekbang.org/) 到纽约和墨西哥的交流会和演讲等，面对面对大家交流 Flutter 应用开发是一件特别棒的事情。


之前我们提到过 [Reflectly](https://www.forbes.com/sites/heatherfarmbrough/2018/05/01/reflectly-wants-to-be-an-adidas-of-the-mind/#572291294204)，它是一个丹麦的公司，他们在 iOS 和 Android 平台开发了非常有吸引力的应用程序。他们的应用程序被美国 iPhone 应用商店评为当日最佳应用。这也证明了 Flutter 的真正潜力远远超过实现体验流畅的应用（同时可以帮助开发者获得成功）。

<iframe width="560" height="315" src="{{bili-embed}}?aid=56686514&cid=99031924&page=1&autoplay=false" {{bili-set-short}}> </iframe>

在柏林的  [WeAreDevelopers](https://events.wearedevelopers.com/) 大会中，[BMW 发布了他们基于 Flutter 的应用](https://youtu.be/80pRyn7fZRk?t=1234)，目前已经在开发中。下面这段描述来自 Guy Duncan，他是 BMW 集团互联公司的 CTO：

> 通过结合 Dart 和 Flutter，我们实现了第一个真正跨平台的移动工具包；我们认为它打破了原有的游戏规则，可以平衡数字交互和物联网的功能特性。
> 通过使用主流的工具链、自动化工具和现代化的编程模式，我们可以优化循环时延、安全性、商业应用特性的推送成本。

除了应用程序，整个开源社区所涉及的众多 [资源](https://flutterx.com/)，[插件](https://pub.flutter-io.cn/flutter)， [Flutter 社区活动](https://flutterevents.com/) 和 [Meetup](https://www.meetup.com/topics/flutter/) 也使得 Flutter 变得格外生机勃勃。
我们会持续关注大家基于 Flutter 所实现的各种有趣的应用，同时也非常荣幸和大家一起分享其中的乐趣。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/flutter-bag.jpeg){:width="95%"}

Photo credit: [@damian2048](https://twitter.com/damian2048)
