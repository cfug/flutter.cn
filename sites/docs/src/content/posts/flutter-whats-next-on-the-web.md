---
title: Flutter Web 近期的重要更新
description: Flutter Web 近期的重要更新
toc: true
---

_我们的发布重点优先关注在性能、开发者体验以及 Web 集成上_

2021 年 3 月 [Flutter Web 支持已进入稳定版](/posts/flutter-web-support-hits-the-stable-milestone)，那么，下一步是什么？

在我们对用户调研的研究中发现，有超过 10％ 的 Flutter 项目目标是发布到 Web 平台。因此，目前我们会专注于提升第一个 Web 稳定版的质量，并使更多开发者能够将 Flutter Web 应用投入到生产环境。

根据 Flutter 每个季度的调查结果和我们通过 Issue、开发者面谈、社交媒体渠道中听取到的信息，我们确立了这些优先事项。我们刚刚收到了第三季度的调查结果，大家的反馈与我们的计划不谋而合。

本文提供了详细的路线图和每个优先事项对应的工作计划。有些特性可能会跨越几个季度的时间来完成，使用放大镜符号 🔍 标识的特性代表它们仍需进一步调查之后才能给出一个解决方案。

让 Flutter 应用在 Web 上表现得自然是一件很重要的事，这包括诸如滚动行为、文本功能、闪屏、超链接、搜索引擎优化和其他 Web 应用特有的功能。

## RTL 文本

此前，Flutter 没有在 Web 上对从右到左 (RTL) 的语言 (如阿拉伯语和希伯来语) 提供完整的支持。虽然框架本身支持 RTL 文本，但 Web 引擎忽略了 LTR 和 RTL 之间的区别，从而产生了未定义的行为。

近期发布的 [Flutter 2.5 稳定版](/posts/whats-new-in-flutter-2-5) 增加了对 RTL 的基础支持，Flutter Web 应用已经支持了 RTL 语言的所有主要场景。大部分与基础支持相关的问题已经得到了解决，并且我们正在计划修复剩余的问题。

- [对文本编辑实现 RTL 支持](https://github.com/flutter/flutter/issues/32239) (已修复)
- [Web 上的 RTL 文本渲染故障](https://github.com/flutter/flutter/issues/69396) (已修复)
- [带有 TextDirection.rtl 的 TextField 在 Web 上光标错位](https://github.com/flutter/flutter/issues/78550) (计划)
- [在 RTL 应用程序中，RichText 中的 InlineSpans 重叠了](https://github.com/flutter/flutter/issues/82136) (已修复)

## 滚动行为

虽然 Flutter 2 对滚动做出了 [一些改进](https://github.com/flutter/flutter/pulls?q=is%3Apr+is%3Aclosed+is%3Amerged+label%3A%22f%3A+scrolling%22)，来支持桌面浏览器上的滚动行为 (如滚动条支持)，但在浏览器或运行 Web 应用的操作系统上，滚动行为依然在某些情况下没有达到预期。

虽然其中一些行为依赖于 Flutter 的桌面端支持，但我们计划在这个路线图中，解决一些物理滚动属性和滚动条的问题，问题如下所示。我们还计划展开对触控板支持的研究。

- [PageScrollPhysics 出现奇怪的行为](https://github.com/flutter/flutter/issues/35687)
- [在 (无限) 列表 Widget 中没有滚动条](https://github.com/flutter/flutter/issues/41434)
- [Mac 桌面的滚动物理应该保持范围](https://github.com/flutter/flutter/issues/85579)
- [让滚动条避免阻塞 Sliver 和媒体查询的内边距](https://github.com/flutter/flutter/issues/13253)
- [MaterialScrollBehavior.buildScrollbar 需要更新](https://github.com/flutter/flutter/issues/87739)

🔍 研究对 [触控板的支持](https://github.com/flutter/flutter/issues/23604)

## 应用加载 API

有些 Web 应用倾向于在加载或进行一些自定义体验的时候，通过闪屏页、加载指示器或落地页来实现这个体验。目前在 Flutter Web 应用内并没有显示正在加载或实现自定义体验的简单方法，并且当用于渲染的 CanvasKit 体积较大时，这将会变成比较棘手的问题。

我们正专注于为应用启动周期提供一个显式 API，可以用来预装应用，控制应用的加载周期，并创建闪屏页或加载指示器。

- [增加在 Web 上对闪屏页的支持](https://github.com/flutter/flutter/issues/48468)

无障碍是我们的首要任务之一；我们旨在为你提供必需的工具以构建可访问的 Web 应用，且应用在最常见的屏幕阅读器上运行良好。

Flutter 2.2 对无障碍支持进行了极大的改进。从那时开始，我们就听到了一些终端用户的担忧，他们试图用屏幕阅读器 (如 [JAWS](https://www.freedomscientific.com/products/software/jaws/)) 来浏览他们的 Web 应用。

在该路线图中，我们将专注于桌面浏览器 [支持的屏幕阅读器](https://docs.flutter.cn/development/accessibility-and-localization/accessibility#screen-readers) 的问题，同时，我们还将继续研究如何提高我们整体无障碍支持。

- [使用回车键时未能触发按钮的点击](https://github.com/flutter/flutter/issues/83812)
- [方向键和 B 键不更新屏幕阅读器的焦点](https://github.com/flutter/flutter/issues/83809)

我们将始终优先考虑性能，以改善 Flutter Web 应用的用户体验。目前我们的主要目标是改善滚动卡顿，并加快 Web 应用的初始加载速度。

## 滚动时的卡顿

我们近期的季度调查数据显示，滚动卡顿是首要的性能问题报告之一。我们的目标是无论在手机上使用手势，还是在桌面上使用鼠标 / 键盘，都确保 Flutter Web 应用能流畅滚动，但这也取决于 Web 应用期望用户滚动内容的类型和数量。

在未来几个月里，我们将专注于改善由于图像解码造成的卡顿，也同时将继续研究滚动的性能问题，以找到我们可以改善的其他用例。

- [将图像解码转移到 Web Worker](https://github.com/flutter/flutter/issues/63397)
- 降低 [在 CanvasKit 渲染引擎中使平台视图的成本](https://github.com/flutter/flutter/issues/71884)

## 捆绑 CanvasKit (离线支持)

目前，用 CanvasKit 渲染的 Flutter Web 应用需要额外的手动步骤，才能作为渐进式 Web 应用 (PWA) 离线工作。为了在离线模式下完全作为 PWA 工作，并确保应用符合严格的内容安全策略，我们需要捆绑 CanvasKit 和备选字体。

我们将首先捆绑 CanvasKit，然后捆绑字体，并添加必要的工具以启用离线模式。

- [CanvasKit 的后端不应该依赖于不稳定的谷歌字体](https://github.com/flutter/flutter/issues/85793)
- [支持捆绑的 CanvasKit 而不是通过 CDN](https://github.com/flutter/flutter/issues/70101)

## CanvasKit 的下载大小

CanvasKit 的性能优于基于 DOM 的方法，因此它是我们在桌面浏览器上的默认渲染器。然而，下载应用所需的时间会影响初始加载性能 (以及在 Web 上运行的 Flutter 应用的 Lighthouse 得分)。

在该路线图中，我们将研究如何减少 CanvasKit 的下载大小，以努力提高初始加载性能。我们希望确保终端用户的设备或浏览器不会处理大量的有效载荷。

- 🔍 [改善 CanvasKit 的下载大小](https://github.com/flutter/flutter/issues/89616)
- 🔍 [找到一个大小合适的表情符号备选字体](https://github.com/flutter/flutter/issues/76248)

提升浏览器代码集成的能力，有利于 Web 平台优势的发挥。Flutter Web 应用有两种方式与 HTML 集成。1) 在 Flutter Web 应用中使用 HTML 平台视图，或 2) 将 Flutter 作为内容集嵌入现有的 Web 应用 (类似于 Web 的附加应用)。目前前者已经可用且需要改进，而后者将是一个新功能，需要进一步设计和开发。

## 用自定义元素嵌入 (add2app)

今天，将 Flutter Web 应用嵌入现有网站 / Web 应用的唯一方法是通过 iframe。虽然这在某些场景下是可行的，但对于那些慢慢将其 Web 应用迁移到 Flutter 的开发者来说，这并不是一个理想解决方案。

在该路线图中，我们将研究并设计一款定制的解决方案，使你能够嵌入 Flutter Web 应用，类似于在移动端 add2app 的场景。

🔍 [渲染自定义元素内的应用](https://github.com/flutter/flutter/issues/32329)

Flutter 的生态系统包括了用于开发的功能，但目前仍然缺乏 Web 的功能支持，如插件、调试、热重载等。为了让你在 Web 端有一个良好的开发者体验，我们将继续缩减移动端和 Web 端之间的差距。

## 相机插件

自最初的 Web 稳定版本发布以来，相机插件一直是呼声最高的插件之一；许多人发现，在将 Flutter 移动应用引入 Web 时，同步差距是一个主要的问题。

在 [Flutter 2.5 稳定版](/posts/whats-new-in-flutter-2-5) ，我们提供了这个[插件](https://pub.dev/packages/camera_web)的早期版本，可以初始化相机，显示相机预览，并拍摄照片。我们收到反馈后将会对这个插件进行改进。

- 为 [Web 增加相机支持](https://github.com/flutter/flutter/issues/45297) (已修复，一些 PR 待定)。

以上是对目前我们在 Web 上路线图的概述，[GitHub 问题列表](https://github.com/flutter/flutter/issues?q=is%3Aopen+is%3Aissue+label%3Aplatform-web+) 依然是我们正在处理的问题来源。
我们可能会根据了解到的情况和开发者们的反馈来增加、延长或推迟功能。

我们非常重视开发者们的反馈，并感谢大家一如既往的支持。

_感谢 flutter.cn 社区成员 (@AlexV525、@Vadaski、@MeandNi) 以及 Lynn 对本文的审校和贡献。_
