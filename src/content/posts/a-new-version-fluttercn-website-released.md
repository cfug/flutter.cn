---
title: 新版 Flutter 中文开发者网站发布
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2021/12/VAmVaC.jpg){:max-width="90%"}

Develop as One，2021 年 Google 开发者大会 (Google Developer Summit) 于上个月顺利举办，包含众多最新 Google 技术产品更新的线上演讲，干货满满。

![]({{site.flutter-files-cn}}/posts/images/2021/12/QIL1S6.jpg)

在 11 月 16 日上午进行的主题演讲中提到，目前国内的开发者数量有 500 万以上，约占全球开发者数量的五分之一，中国的游戏开发商在头部的海外游戏市场份额超过 23%，排名第一，应用和游戏开发仍是一个值得持续投入并且拥有更广阔前景空间的市场。

Flutter 在这其中也扮演了相当重要的角色。首先是头部厂商采纳，我们看到**字节跳动有 70 多款应用正在使用 Flutter**，腾讯在其 **企业微信** 和 **PUBG 手游**上也使用 Flutter 构建新的功能，以及今年早些时候提到的贝壳找房也在 **用 Flutter 构建一些核心功能**。其次，不断完善的 Flutter 产品已经成为了开发者们不可或缺的「秘密武器」——3 年前正式发布的时候，我们将其定义为「便携式的 UI 工具包」，到现在进化成「**一个为环境计算打造的 UI 平台**」，开发者们只需要写一套代码，便可为所有屏幕构建精美应用，包括移动端、Web 端、桌面端和嵌入式设备平台。最后，**全球的 Flutter 开发者数量达 300 万以上**，当你开始写下 Flutter 的第一行 Hello World! 的时候，你也就加入成为全球大家庭中的一员。

在此次开发者大会上，Flutter 团队也公布和回顾了一些近期的更新，包括：

* Flutter 的桌面端支持在近期所做出了的大量改进，下一步计划是 Windows 端的无障碍功能优化和改进；
* Flutter Web 的 **CanvasKit 渲染器稳定版已发布**，可以通过 `flutter run -d chrome --web-renderer canvaskit` 使用；
* Flutter 版的 **谷歌移动广告插件正式发布 1.0 版本** (支持空安全)，支持加入 AdMob 和 Ad Manager 广告，并支持各种广告形式，包括横幅广告、插页式广告、激励视频广告和原生广告。正式版也加入了广告中介的 beta 支持，通过 pub 命令 `flutter pub add google_mobile_ads` 即可开始使用；
* 介绍和回顾了其他有关使用 Flutter 进行盈利的插件，包括使用应用内购买的 `in_app_purchase` 插件、集成使用多种付款方式的 `pay` 插件，都能帮助你更好的通过 Flutter 盈利。

## DartPad 和 Flutter 网站更新

DartPad 是一个开源的线上编译和运行 Flutter / Dart 代码的平台，它可以帮助你 **方便的学习和实验 Dart 编程语言特性**，也可以将程序的最小可复现代码 **分享给其他开发者一起交流讨论**，我们也制作了大量可交互的 Codelab，其中就内嵌了 DartPad，让你学习起来更方便、更直观、更有趣。

Pub.dev 上的 Dart package 和插件是 Flutter 生态中非常重要的组成部分，这些开箱即用的插件可以大大提高开发效率。今天，我们 **正式为 DartPad 加入了 package 的支持**，第一阶段我们支持了一组比较流行的 package，可以在 DartPad 右下角的图标上看到：

![DartPad 支持导入 package 了]({{site.flutter-files-cn}}/posts/images/2021/12/pMrooB.jpg)

如果你想提名更多希望我们支持的 package，可以在 DartPad 的 Issue 区提出或者点赞让我们看到：https://github.com/dart-lang/dart-pad/issues
与此同时，由中国 Flutter 社区维护的 DartPad.cn 也支持了这项新的功能，国内的开发者可以使用 DartPad.cn 访问和体验。

![Flutter 中文开发者网站 - flutter.cn]({{site.flutter-files-cn}}/posts/images/2021/12/VAmVaC.jpg)

Flutter 网站也在今天正式发布全新的设计，新版的网站更专注从视觉和文字上突出 Flutter 的特性，包括在各种平台上使用 Flutter 构建应用的优势以及上手文档和参考资料、Flutter 开发的学习资料合集，也介绍了 Flutter 生态上的优势和强大的社区，还有关于通过 Flutter 盈利的教程和其他开发者的成功故事等。

在中国社区成员们的共同努力下，我们于近期「清扫」了一批没有翻译的文档，伴随官网此次改版，我们也同时跟进发布了中文版的本地化页面（确切的说是比 flutter.dev 更早发布了 ;-P）点击阅读原文直达。希望我们为大家提供的这些中文开发者资源能够帮助你更好的使用 Flutter。

## Google 开发者大会上的 Flutter 演讲视频

在本次大会在主题演讲中，Flutter 产品经理 Zoey 为大家带来了 Flutter 相关的更新和介绍（从视频的 51 分 20 秒 开始）:

<iframe width="560" height="315" frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=p0041ce57pe" allowFullScreen="true"></iframe>

也有四个与 Flutter 相关的专题演讲：

1. Google 产品经理 Kevin Moore: 使用 Flutter 构建自适应跨平台应用

<iframe width="560" height="315" frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=f0041nmx1l2" allowFullScreen="true"></iframe>

Flutter 现已支持移动、桌面、Web 等多达 6 个平台。了解相关最佳实践，让你的应用在良好适配每个平台的同时，实现最大程度的代码复用。

2. Google 软件工程师钱冠霖: Flutter 的 Deferred Components

<iframe width="560" height="315" frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=h0041b043ig" allowFullScreen="true"></iframe>

应用体积是开发者最大的顾虑之一。学习如何使用 Flutter 的延迟加载组件，让你实现在运行时下载预编译的代码和资源。

3. Google 软件工程师 Justin McCandless: 利用延迟加载提升 Flutter 应用性能

<iframe width="560" height="315" frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=m0041hexsmo" allowFullScreen="true"></iframe>

了解如何通过延迟加载内容来优化性能，它的局限性，以及 Flutter 如何让你默认即可实现更流畅的用户体验。

4. Google 软件工程师 Bob Nystrom: 为何要使用「空安全」

<iframe width="560" height="315" frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=l0041a7jxo6" allowFullScreen="true"></iframe>

「空安全」是一项新推出的基本语言功能，由多人共同开发。在这里，其中一位开发者将向你介绍如何利用该功能改善 Dart 代码编写体验、防止出错以及怎样生成更小且更快的二进制文件。

感谢 Flutter 团队和社区成员们的帮助，希望 Flutter 可以更好的助力你获得成功！
