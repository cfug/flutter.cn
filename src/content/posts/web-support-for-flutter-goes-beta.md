---
title: 欢迎体验 Beta 版 Flutter web 支持
toc: true
---

*作者 / Mariam Hasnany, 产品经理, Flutter*

我们很高兴宣布 Flutter web 支持已顺利迭代至 Beta 版本！

## **为什么我们要把 Flutter 带向 web 平台？**

开发者经常需要构建可以在移动和 web 两个平台上运行的应用。我们想要帮助你设计和构建出自己想要的效果，将心中的奇思妙想变为现实，让你知道 Flutter 能够让你的应用在任何地方流畅运行！开发者们都希望学习一套可在多个平台上灵活使用的技术。Flutter web 支持允许你使用同一套代码，更快地发布功能，并且在不同设备上实现一致的用户体验。此外，强大的 web 端 Dart 编译器和便携性出众的 Flutter 框架可大大简化你的开发工作，让你使用 Flutter 轻松打造出精美的交互式 web 体验。

## **比预览版更出色**

我们在今年的 I/O 大会上发布了 web 支持的 [技术预览版](https://mp.weixin.qq.com/s/trNhd1CI1gBBDtmVGdeI6g)，并在 7 月推出了 [早期使用者计划](https://medium.com/flutter/flutter-for-web-early-adopter-program-now-open-9f1fb146e4c4)，这段时间以来，我们一直在努力改进 web 支持，力求更好地满足来自 Google 内部团队和外部开发者的需求。

**Beta 版能为你带来什么？**

随着 Flutter 1.12 的发布，Flutter web 支持也从技术预览版顺利迭代至 beta 版。当你在 beta 渠道内启用 web 支持后，新创建的 Flutter 项目不仅包含了 Android 和 iOS 应用，其中新增的 web / directory 还提供了丰富的工具，帮助你在浏览器中编译和运行同一个项目。

随着 Flutter web 支持逐渐稳定，它已经准备好迎接新的挑战，欢迎更具探索精神的开发者们前来开启更多的使用场景。目前，团队的开发工作已进入下一个阶段，我们将继续引入变更，并从无障碍支持、测试覆盖等多个方面进一步优化 web 支持。

## **探索使用场景**

在 Flutter web 支持的开发过程中，我们尤为关注部分使用场景。我们认为这些场景特别能够体现 Flutter 的优势所在。我们相信现有的功能已足够帮助开发者构建丰富的交互式 web 体验。在与早期使用者合作的过程中，我们还针对下列使用场景验证与优化了 web 支持。

**多平台互连的独立应用**

Flutter 允许开发者使用同一套代码实现移动和 web 的跨平台体验。我们的一位早期使用者 [Journey](https://startyourjourney.io/) 就利用 Flutter 开发了一个多平台应用。

![]({{site.flutter-files-cn}}posts/images/2021/05/vMoskP.png)

> △ 社交应用 Journey 最近刚发布了一个使用 Flutter 开发的跨平台应用

Journey 的创始人 Luke O’Brien 给予了 Flutter 很高的评价: "我大概从 4 个月前开始开发 Journey，起初我只想做一个 Android 版本的最简可行产品。没想到后来竟然发现了 Flutter，当时我就觉得它特别棒，于是我就决定试着用一下。这绝对是我做过最正确的决定。Flutter 为我们缩短了至少一半的开发时间，现在我们已经发布了 Android、iOS 和 web 三个版本的应用，用户增长量多了整整一倍。从萌生想法到产品落地，Flutter 在这个过程中起到了十分关键的作用。"

**内嵌式交互内容**

第二个使用场景在网站中内嵌一个小程序。这类程序通常功能丰富且以数据为中心，但是它们并不需要提供导航服务或者其它应用级别的复杂功能，比如说，你可以为现有网站添加一个新的汽车配置器、填字游戏或者交互式的可视化数据，这些都是该场景下比较典型的用例。我们的另一位早期使用者 [AEI Studio](https://studio.aei.dev/showcase/) 就开发了一系列聊天机器人并在 web 版的聊天对话框中内嵌了 Flutter，从而实现了动画，键盘文本输入等多项交互功能。

![]({{site.flutter-files-cn}}posts/images/2021/05/2bGkk6.png)

> △ Weatherbot 是 AEI Studio 旗下的一款聊天机器人，

它的网页版对话框就内嵌了 Flutter

**精简版 Lite 应用**

尽管 Flutter 本身的移动端运行时 (mobile runtime) 现可提供更为流畅的体验，但有时候用户依旧会觉得安装步骤太繁琐，因而放弃尝试新应用。如果为现有的 Flutter 应用配备一个轻量级 web 体验，岂不两全其美？大部分用户依旧集中在移动版上，精简版 web 应用则通过相同的工具、框架、UI 组件和业务逻辑提供相关功能，只不过会在丰富程度上进行适当缩减。

**辅助应用**

辅助应用是指用 Flutter 构建的，且为主要的移动版应用提供支持的 web 体验。比如说，你可以使用 Flutter 构建一个 web 应用，管理员或内部用户可以通过这个应用为现有的 Flutter 移动版应用进行内容创作或后台管理。尽管此类 web 应用相对较为独立，但它依旧可以复用移动应用的大量代码。

## **找到适合你的插件！**

插件是 Flutter 一个比较独特的优势，开发者可以通过插件访问运行平台的原生库。当你在 web 平台上运行 Flutter 应用时，你可以调用现有 JS 库中的所有内容。我们在后台完成了所有 JS 互操作代码，确保这些插件在移动和 web 平台上均能正常工作。我们已成功实现了请求最多的几个插件，让它们能够在 web 应用和原生应用中提供一致的使用体验。从现在开始，你也可以像 [Ben Hagan](https://github.com/cbenhagen) 和 [Hadrien Lejard](https://github.com/lejard-h) 一样 [编写自己的插件](https://medium.com/flutter/how-to-write-a-flutter-web-plugin-5e26c689ea1)，他们曾分别为 video_player 和 sentry 包开发过插件。下列几个包均有更新:

* [shared_preferences](https://pub.dev/packages/shared_preferences)
* [firebase_core](https://pub.dev/packages/firebase_core)
* [firebase_auth](https://pub.dev/packages/firebase_auth)
* [google_sign_in](https://pub.dev/packages/google_sign_in)
* [url_launcher](https://pub.dev/packages/url_launcher)
* [video_player](https://pub.dev/packages/video_player)
* [sentry](https://pub.dev/packages/sentry)

此外，我们还为 pub.dev 包库添加了新平台的标签管理和过滤功能。

首先，我们在每个包的详情页面中列明了它所支持的平台，让开发者可以更轻松地判别这个包是否提供 web 支持。

![]({{site.flutter-files-cn}}posts/images/2021/05/taG3uH.png)

> △ pub.dev 包的详情页面显示了关于 SDK 和平台兼容性的标签

搜索 UI 也新增了若干过滤器，方便开发者找到提供 web 支持的包。我们基于新的 [平台清单标签](https://flutter.dev/docs/development/packages-and-plugins/developing-packages#plugin-platforms) 开发了该功能，你可通过 Flutter 1.12 获取这些标签。

![]({{site.flutter-files-cn}}posts/images/2021/05/UxFyg9.png)

> △ pub.dev 的搜索 UI 添加了对 SDK 和平台的过滤器支持

## **向稳定版迈进**

我们在 Beta 版中取得了一定的进展，但仍有许多工作亟待完成。除了进一步提高 web 支持的性能表现之外，我们也在积极推进无障碍体验、浏览器兼容性等方面的工作。

**无障碍**

Flutter 通过 Android TalkBack 和 iOS VoiceOver 为移动浏览器提供无障碍支持。目前，我们已经为多个平台的辅助技术实现了多项特性，其中包括: UI 遍历、遍历顺序以及丰富的 UI 交互提示，例如可点击区域、标签、可编辑区域、渐增操作、图片、活动区域和可检查项目。此外，我们还在研究如何为桌面端浏览器添加读屏支持。

**浏览器支持**

Flutter 的支持范围已从一开始的移动平台扩展至桌面平台，使得桌面应用的 UX 设计风格也可通过 Flutter 框架实现。Flutter 将继续优化对桌面浏览器的支持，并为用户提供更加流畅的无缝体验。接下来，我们计划为 Chrome、Edge、Firefox 和 Safari 四款浏览器 (移动版和桌面版) 提供支持和测试。

**测试覆盖**

从技术预览版开始，我们就一直在扩大框架和 Flutter web 引擎的测试覆盖范围。Chrome 目前已支持运行自动测试，Safari 仍需手动进行测试。我们还有许多测试工作需要完成，未经测试的场景可能会出现回归错误。

**体验、贡献与分享**

欢迎各位开发者立即上手体验 Flutter web 支持！请前往 [flutter.dev/web](https://flutter.dev/web) 开启你的 web 之旅，尽情探索示例、文档等精彩内容。如果你之前已经使用过 web 支持，不妨尝试一下我们的 [beta 渠道](https://github.com/flutter/flutter/wiki/Flutter-build-release-channels)。

Flutter 插件的数量已突破 1,800 个，但是其中大部分仅提供 iOS 或 Android 支持。如果你想为 web 支持贡献自己的一份力量，帮助我们缩小 web 与移动平台之间的距离，欢迎你为现有插件添加 web 支持或开发新的插件。请阅读 [《Flutter web 插件开发指南》](https://medium.com/flutter/how-to-write-a-flutter-web-plugin-5e26c689ea1) 进一步了解技术细节与开发方法。

## **结语**

我们已通过 beta 渠道开放了最新的 Flutter web 支持，与此同时，我们离最终稳定版的发布也越来越近，希望你能喜欢这个 beta 版本，同时感受到我们对 Flutter 的热情与付出。

欢迎大家向我们 [提交反馈](https://flutter.dev/community) 并参与 #Flutter 话题讨论，与我们分享你在 Flutter 方面的项目进展。期待你通过 Flutter 打造出精美的交互式 web 体验！
