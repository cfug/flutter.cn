---
title: 2020 春季速递：Flutter 势头正盛
toc: true
---

文 / Patrick Sosinski & Tim Sneath

在过去的几个月中，
Google Flutter 团队的工程师、产品经理、UX 研究人员、技术作者和开发者关系工程师们
都遭遇了不少的挑战。
和大家一样，在这特殊时期，我们也都忙于应对不同以往的日常工作。
不过，Flutter 作为一个开源项目，我们能够使用各种公开可用的工具继续进行开发。
在如今的形势下，我们不但需要适应新的工作环境所带来的限制和挑战，
也需要照顾身边的家人。幸运的是，我们依然在不断取得进展，
并推进这个春天积压下来的工作，
更学会了如何身处办公室之外继续完善 Flutter！
衷心希望大家也能不断进步，平安健康。

![flutter-developers](https://files.flutter-io.cn/posts/flutter-cn/2020/flutter-spring-2020-update/flutter-developers.png){:width="85%"}

## Flutter 势头正盛

我们继续见证 Flutter 使用者的快速增长。自发布以来的 16 个月内，已有 **200 万开发者使用 Flutter** 。即便是在如今这种前所未有的情况下，3 月份也迎来了 10% 的月度增长，现在每个月有近 50 万开发者使用 Flutter。

这里还想和大家分享几个有趣的数据:

* 开发者使用的操作系统：60% 的开发者人使用 Windows 系统进行开发，27% 的人使用 macOS，13% 的人使用 Linux。
* 开发者所在的团队：35% 的开发者人在初创公司工作，26% 的人是企业开发者，19% 的人是独立开发者，7% 的人在设计机构工作。
* 开发者使用的 Flutter 版本：78% 的 Flutter 开发者使用稳定版本，11% 使用 beta 版，11% 使用 dev 或 master 版本。
* Flutter 使用者数量排名前五的地区是印度、中国、美国、欧盟和巴西。
* 在 Play Store 中发布的 Flutter 应用约有 5 万个，仅在最近一个月就有近 1 万个应用上传。
* Flutter 应用中使用最多的 framework package 是 `http`、`shared_preferences`、`intl`、`meta`、`path_provider` 和 `pedantic`。
* Flutter 应用中使用最多的第三方 package 是 `provider`、`rxdart`、`cached_network_image`、`sqflite`、`font_awesome_flutter` 和 `flutter_launcher_icons`。

## Flutter 在企业中的应用

Flutter 的企业用户增长迅速。我们的研究结果持续表明，
跨平台构建高度品牌个性化体验的能力，是大公司选择 Flutter 的关键因素。
最近的一个例子是 [Nubank](https://nubank.com.br/en/)，
它是亚洲以外最大的数字银行，拥有超过 2,000 万用户。
在对各种应用开发选项进行了 
[详细的调查和分析后](https://cdn.nubank.com.br/mobile/taskforce/nubank-mobile-architecture-task-force-mission-report.pdf)，
Nubank 选择了 Flutter，并在此后将其前端开发团队统一在同一个框架内，
这也使得他们能在 iOS 和 Android 上同时发布新功能。

请观看他们的 [开发者故事](https://www.bilibili.com/video/BV1zi4y1t77J/)，了解他们如何用 Flutter 的优势改进团队开发体验以及打造跨平台优质应用:

企业用户普遍要求使用专业组件。我们正在与 [SyncFusion](https://www.syncfusion.com/) 合作，
他们的 Essential Studio 产品现在包含了一系列
[高质量的 Flutter 组件](https://www.syncfusion.com/flutter-widgets)，
包括图表、PDF 编辑和条码生成器等。
在 [2020.1 版本](https://www.businesswire.com/news/home/20200421005174/en/Syncfusion-Introduces-New-Flutter-Widgets-Web-Compatibility)
发布后，他们的所有组件都支持 Web、iOS 和 Android 三个平台，
而且还提供了 [Web 版的演示](https://flutter.syncfusion.com/#/)。

## 版本发布流程更新

最后，在展望下一个稳定版发布的同时，我们想分享一些对版本发布流程的改动，
我们认为这些改动将进一步提高发布的稳定性和可预测性。

现在的发布流程设计比较简洁，对维护的要求也比较低。
在我们团队规模还不大，框架也比较新的时候，这个流程就相当适合 Flutter，
但以目前的规模而言，我们遇到了一些影响 Flutter 贡献者和开发者的问题，包括:

* 不清楚发布版本何时构建，因此也不清楚里面包含哪些代码
* 缺乏对分支的测试，导致发布的热修复版本出现回退

从 4 月发布的 Flutter 开始，我们将转向包含 beta 版和稳定版的分支模式，
并提供稳定期。现在我们将在月初发布 beta 版分支，
并拣选 (cherry-pick)* 修正关键问题来 "稳定" 这个版本。
大约每一个季度，当前的 beta 版分支会被提升为稳定版。
如有必要，我们将继续在这个版本上进行热修复。
我们的基础设施现在支持针对分支进行测试，这意味着我们可以验证拣选修正的问题，
并根据严重程度接纳一些修复请求。

** 拣选 (cherry-pick): 指从一组既定的对象中挑选出最合适/最佳的。*

我们还借此机会同步了 Flutter 和 [Dart 的发布流程和渠道](https://dart.cn/get-dart#about-release-channels-and-version-strings)。
因此，Dart 现在也增加了一个 beta 版渠道，
并将在未来与 Flutter 同步发布 
(例如，Flutter 的 beta 版将包含 Dart 的 beta 版)。

如果您已经基于稳定渠道发布了 Flutter 应用，
我们鼓励您在 beta 版上测试您的应用，
并在发现问题时上报，以便改善稳定版本的品质。
您也可以按照 Flutter wiki 上新发布的 [Flutter 拣选流程](https://github.com/flutter/flutter/wiki/Flutter-Cherrypick-Process)，
将稳定渠道上的回退或阻塞 bug 的严重性进行升级。

我们认为这个新的流程既能强化用户对发布品质和可预测性的信心，又能更容易地将热修复传递到稳定渠道。

### 版本命名变更

作为新的分支模式的一部分，我们对版本发布的命名方式做了一些调整。
完整的技术细节可以在 Flutter wiki 上的 Flutter 构建发布渠道页面找到，
其要点如下:

**非稳定的发布版本** 将在版本字符串中用 ".pre" 表示 "预发布" 。给定一个 "x.y.z-n.m.pr" 的版本字符串，每次从 master 构建一个新的 dev 渠道版本，"n" 的数值递增。

* 1.18.0-1.0.pre <- master 版本升至 1.18 后的第一个 dev 版本
* 1.18.0-2.0.pre <- 从最近的 master 版本构建出的下一个 dev 版本

**Beta 版** 将从上面的 dev 版本构建出来。当我们对其中一个版本进行拣选修正时，"m" 数值会递增。例如，如果我们将 master 的第 15 个 dev 版本作为 1.18 beta 版，那么版本编号看起来会是这样:

* 1.18.0-15.0.pre <- 最初的 beta RC，和进入 dev 的版本相同
* 1.18.0-15.1.pre <- (目前) beta 分支的后续构建，包含拣选结果
* 1.18.0-15.2.pre <- 第二个后续构建

**稳定版** 的版本号为 X.Y.0。后续的热修复版本，如有必要，将增加补丁号 (X.Y.1、X.Y.2 等)。

* 1.18.0-15.4.pre <- 分支中最后的 beta 版本
* 1.18.0 <- 稳定版本，和 1.18.0-15.4.pre 内容一致
* 1.18.1 <- 1.18.0 的热修复版本

## 下一步

我们的 **下一个稳定版本** 将采用这个全新的版本模型。

我们之前提到过 [Codepen 对 Flutter 的支持](announcing-codepen-support-for-flutter.html)，以下是我们最喜欢的几个作品及其作者:

* [Twitter clone](https://codepen.io/mkiisoft/pen/KKdgdad) (mkiisoft)
* [Generative abstract art](https://codepen.io/rx-labz/pen/WNQoNem) (rxlabz)
* [Chakra animation](https://codepen.io/tahatesser/pen/GRpqbRY) (tahatesser)
* [Rotating carousel](https://codepen.io/joshuadeguzman/pen/jObrzJB) (joshuadeguzman)
* [Nougat animation](https://codepen.io/phillywiggins/pen/gOaPNPY) (phillywiggins)
* [Double pendulum](https://codepen.io/abhilas-csc/pen/qBOZKPj) (abhilas-csc)
 
![codepen support flutter](https://files.flutter-io.cn/posts/flutter-cn/2020/flutter-spring-2020-update/codepen-plus-flutter.png){:width="85%"}

如果您正在寻找 Flutter 学习资源，我们现在在网上提供免费的 Flutter 入门课程。
这个由 Angela Yu 主讲的长达 10 小时的课程内含教程和代码实验室，
可以助您开启 Flutter 之旅。

请您持续关注 Flutter 每周的推送更新。
值此非常时期，请继续注意保持社交距离，祝大家身体健康！

原文: [Flutter Spring 2020 Update](https://medium.com/flutter/flutter-spring-2020-update-f723d898d7af) /
中文发布：谷歌开发者公众号