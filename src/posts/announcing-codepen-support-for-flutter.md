---
title: CodePen 现已支持 Flutter
description: 我们很高兴宣布 CodePen 现已提供 Flutter 支持。
---

文/ Zoey Fan, Flutter 产品经理

我们很高兴宣布 [CodePen](http://codepen.io/) 现已提供
[Flutter 支持](https://codepen.io/flutter)。
作为世界领先的社交开发环境，CodePen 为数百万开发者和设计师
带去了出众的前端开发与社交体验。
长久以来，CodePen 一直是网页开发者们共享设计方案、前沿技术与创意灵感的交流平台。
在引入 Flutter 支持后，CodePen 将惠及更多的开发者，
为他们提供学习、分享和推广创意的绝佳机会。

> " CodePen 一直是 Flutter 和 Dart 语言的忠实粉丝。我们很高兴看到 Flutter 对移动和 web 平台的支持。Flutter 社区的发展速度令人惊叹，为此，我们特别为 Flutter 定制了一款 CodePen 编辑器。Flutter 现已成为 CodePen 大家庭的重要成员之一。十分期待各位开发者在 CodePen 上创造出色的 Flutter 作品。"
—— CodePen 联合创始人 Alex Vazquez

自诞生第一天起，Flutter 就一直是开发者们挥洒灵感的创意平台。
成长至今，Flutter 的设计功能也收获了越来越多的认可，
例如，我们在 Flutter Interact 大会上宣布与 Adobe 和 SuperNova 结成合作伙伴；
Flutter 被 Fast Company 评选为
[十年来最具影响力的设计理念](https://www.fastcompany.com/90442092/the-14-most-important-design-ideas-of-the-decade-according-to-the-experts )
之一等等。
现在，基于 CodePen 的 Flutter 编译环境也与大家见面了。
创意工作者们可通过 CodePen 寻找 Flutter 艺术灵感，
打造独具魅力的 Flutter 作品，并向全世界展现别出心裁的 Flutter 创意！

CodePen 上的 Flutter 编辑器和 DartPad 采用的是同一套后端服务，
即 [dart-services](https://github.com/dart-lang/dart-services)。
[DartPad](https://dartpad.cn) 是一款由 Flutter 及 Dart 团队联合开发的在线编辑器，
它已在近期的一次更新中添加了 Flutter 支持。
在构建 DartPad 的过程中，我们希望把它设计成一款实用的学习工具，
用于帮助开发者掌握 Flutter 和 Dart，
并与其他人分享代码片段。此外，我们还特别开源了dart-services，
这样一来，CodePen 或其它网站便能根据特定情况对其进行修改，
从而满足新场景或用户的定制需求。

DartPad 允许您在代码中快速测试想法或与其他开发者分享代码片段，
此外，它对于重现 (和提交) 错误也十分有用。
CodePen 除了拥有这些功能之外，还让您有机会加入活力满满的设计师社区。
您可以在社区里分享、评论、推广和尝试您的设计创意，
并收获其他设计师的建议与反馈。
如果以人类大脑来作类比，
CodePen 上的 Flutter 编辑器相当于激发创意表达与设计灵感的 "右脑"，
而 DartPad 则更像是您的 "左脑"，
它会在您需要快速测试想法或者用代码实现某个技术概念的时候发挥作用。

![codepen-demo](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-codepen-support-for-flutter/codepen-demo.gif){:width="95%"}

## CodePen 上的 Flutter 编辑器

接下来，我们将带您快速了解一下 CodePen 上的 Flutter 编辑器。
您可以通过以下两种方式创建一个新的 Flutter 画笔 
(CodePen 将代码片段命名为 "Pen", 即 "画笔"): 
[从零开始](https://codepen.io/pen/editor/flutter) 或者
[基于现有模板](https://codepen.io/topic/flutter/templates)。
十分感谢 Flutter 社区的积极贡献，
包括 @aednlaxer, @ayushnishad, @diegoveloper, @divyanshub024, @egorbelibov, @gskinnerTeam, @mkiisoft, @orestesgaolin, @SlaxXxX 
在内的众多杰出开发者为我们提供了丰富的精美模板。

首先为您介绍的是 ["GooeyEdge" 模板](https://codepen.io/zoeyfan/pen/ExVaXGK)。
正如下图所示，界面的左边是 Flutter 代码，
右边则是 Flutter 网页的输出样式。
您只需用鼠标拖动素材边框，便可查看该设计的互动效果。

![GooeyEdge-demo](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-codepen-support-for-flutter/Gooey-edge-animation.gif){:width="95%"}

另外，您还可以对 Flutter 代码进行修改并查看相应的输出效果。
例如，如果我们把页面控制图标的颜色从 "白色" 改成 "蓝色" (第 326 行代码)，
短短几秒钟后，您便能看到更新后的颜色。
CodePen 会为您自动重新编译修改后的代码。
您只需更新一下代码，等待几秒钟，就可以看到新的输出。

![页面控制图标的颜色变为蓝色](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-codepen-support-for-flutter/page-control-indicator.png){:width="95%"}

接下来让我们看看如果出现语法错误会发生什么。
假设我不小心删除了第一行代码末尾的分号，编辑器会立即显示一条红色的警告信息，
提醒我代码中含有语法错误。这些警告信息可帮助您轻松地发现并更正错误。

![出现语法错误时的警告信息](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-codepen-support-for-flutter/debug-codepen.png)

## 社交功能

CodePen 最值得称道的就是其丰富的社交和社区功能。
当您创建新画笔或者发现社区内的 Flutter 画笔后，
您可以保存、收藏、添加到合集、分享至社交平台，
甚至可以通过复刻项目以创建自己的版本。

![社交功能](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-codepen-support-for-flutter/social1.png){:width="90%"}

![社区分享](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-codepen-support-for-flutter/social2.png){:width="90%"}

## 上手体验

我们希望 [CodePen](https://codepen.io/flutter) 上的 Flutter 编辑器能够成为您玩转创意的新天地，
让您尽情构建和展示 Flutter 动画、想法、插图等丰富内容。

原文: [Announcing CodePen support for Flutter](https://medium.com/flutter/announcing-codepen-support-for-flutter-bb346406fe50) /
中文发布：谷歌开发者公众号