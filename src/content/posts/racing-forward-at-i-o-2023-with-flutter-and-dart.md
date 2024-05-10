---
title: 在 I/O 看未来 | Flutter 和 Dart 最新进展
toc: true
---

![](https://files.flutter-io.cn/posts/images/2023/07/21/Adqvxc.png)

*作者 / Google 开发者框架和语言 (含 Flutter、Dart 和 Go) 产品经理/用户体验总监 Tim Sneath*

今年的 [Google I/O 大会](https://mp.weixin.qq.com/s/_FdkBIy3GDxSK--ZZosirA) 在位于加利福尼亚州山景城的总部附近举办，我们怀着无比激动的心情面向全球直播了这场盛会！

就在三个多月前，我们在肯尼亚内罗毕举行的 [Flutter Forward 大会](https://flutter.cn/posts/flutter-forward-2023-recap) 上为 Flutter 和 Dart 推出了一个大胆的新路线图。在此次 I/O 大会上，我们将通过介绍四个主题领域的最新动态，来分享我们在实现这一愿景方面取得的进展，这四个主题分别为: 突破性的图形性能、与 Web 应用和平台的无缝集成、对新兴架构的支持，以及对开发者体验的关注。

![](https://files.flutter-io.cn/posts/images/2023/07/21/04KBGl.png)

你可能已经了解到，Flutter 是一个界面工具包，它让应用开发者只需编写一套代码，即可构建移动应用、Web 应用、桌面应用和嵌入式设备应用。你可以使用 Flutter 构建精致**美观**的应用，完全掌控屏幕上的每一个像素。Flutter 具有如下独特优势:

* **快速** 。支持硬件加速图形和原生编译的机器代码，可充分利用设备的各种功能。
* **高效** 。支持有状态热重载等技术，让你可立即看到代码更改在应用中的实际效果。
* **可移植** 。使用一套源代码即可部署到多种平台，而不会出现意外情况。
* **开源** 。它是一个完全开源的工具包，你无需支付许可费，也不用为相关开发工具付费。

## **Flutter 持续发展**

在 Google 乃至整个行业中，Flutter 的使用量都在持续增长。在 Google，我们的团队已经在移动、Web 和桌面平台上部署了 Flutter 应用，示例包括:

* Android 的最新应用 "[Nearby Share" 适配 Windows](https://www.android.com/better-together/nearby-share-app/)。这款应用使用 Flutter 构建，允许在 Windows 和 Android 设备之间无线分享照片和文档。

* [全新的 Play 管理中心应用](https://play.google.com/store/apps/details?id=com.google.android.apps.playconsole)。这款应用目前已发布公开 Beta 版，开发者可以通过它查看应用统计信息并回复应用评价。

* [Google Cloud 移动应用](https://cloud.google.com/blog/products/management-tools/google-cloud-mobile-app-with-uptime-checks)。这款应用让你可以通过全新的 Flutter 赋能体验来监控自己的服务。

* [Google 课堂练习集](https://workspaceupdates.googleblog.com/2023/04/practice-sets-for-google-classroom.html)。这是一款在线新工具，用于创建和分发交互式作业，为学生提供实时反馈和帮助。

我们在 [Flutter Forward 大会上宣布](https://www.youtube.com/watch?v=JVJF_M9bgj4) 团队正在使用 Flutter 构建新版本的 Google 课堂移动应用。新版本现已开始在 iOS 上推出，Android 应用更新版本中的新功能也即将推出。此版本的 Google 课堂使用最新的 Flutter 技术，包括我们最新的 Impeller 图形渲染引擎，可保证界面快速响应、不卡顿。

通过在 Flutter 中重写 Google 课堂，我们提升了 Google 课堂的性能。该应用的新版本比旧版本的冷启动时间更短，你可以观看下面这则对比视频了解详情:

<video controls width="690" height="480" src="https://files.flutter-io.cn/posts/images/2023/07/21/469PWC.mp4" poster="https://files.flutter-io.cn/posts/images/2023/07/21/ZkFYLQ.png"></video>

我们正在持续投入资源开发 package，以便将你的 Flutter 应用运用到 Google 开发者生态系统的其他方面。这包括对原生广告的 [Google Ads 支持](https://medium.com/flutter/2023-google-mobile-ads-updates-for-flutter-16b603df9ec9) 进行了重大更新；[新增了 Firebase 对 Windows 平台的支持，并改善了 Firebase 对 Web 的支持](https://github.com/firebase/flutterfire)；同时还新增了对 [更深入的 Android 互操作性](https://io.google/2023/program/2f02692d-9a41-49c0-8786-1a22b7155628/) 的实验性支持。

由于 Flutter 支持在六大平台 (Android、iOS、Web、Windows、macOS 和 Linux)上使用，**现在已有超过一百万款已发布的应用在使用 Flutter**。这些应用来自世界各地，从法国铁路的火车旅行应用 [SNCF Connect](https://play.google.com/store/apps/details?id=com.vsct.vsc.mobile.horaireetresa.android&hl=en_US&gl=US) 到 Apple App of the Day 获奖应用 [SO VEGAN](https://apps.apple.com/us/app/so-vegan/id1572826611)；从 [Rive 开发的用于创建动画图形的超快桌面应用](https://rive.app/downloads) 到培养亲密关系的 [Agapé](https://www.getdailyagape.com/) 移动和平板电脑应用；从采用全新设计的精美 [Global Citizen 应用](https://www.globalcitizen.org/en/content/new-global-citizen-app-impact-activism-every-day/) 到 [最新的 Ubuntu Linux 安装程序](https://9to5linux.com/first-look-at-ubuntu-23-04s-brand-new-desktop-installer-written-in-flutter)，种类繁多。很高兴这些应用让 Flutter 的价值得到了证明！

## **Impeller 带来的突破性图形性能**

我们期待通过 Flutter 为开发者和设计人员提供强大的功能，以实现令人惊叹的图形体验。在过去的几年里，我们一直在重建图形渲染架构以提高速度和性能，现在终于取得了成果，我们将这款新引擎命名为 *Impeller*。

> "我们期待通过 Flutter 为开发者和设计人员提供强大的功能，从而实现令人惊叹的图形体验。"

自从在 iOS 上引入 Impeller 以来，我们不断扩大测试范围并加深与早期采纳者的合作，以验证生产质量并进一步调整性能。随着现下 Flutter 3.10 的发布，我们很高兴地宣布: [Impeller 现在将在 iOS 设备上默认开启](https://github.com/flutter/flutter/issues/122223)，只需迁移到最新版本的 Flutter 即可大幅提升应用的性能。

与此同时，我们也将注意力转向为 Android 应用添加预览支持。正如 iOS 上的 Impeller 使用底层 Metal API 一样，Android 的 Impeller 实现建立在 [Vulkan](https://www.vulkan.org/) 之上。Vulkan 可提供低阶 API 以在底层图形硬件上进行快速渲染。虽然绝大多数 [现代 Android 设备](https://developer.android.google.cn/about/dashboards#Vulkan) 都支持 Vulkan，但我们仍将支持较旧设备机型的向后兼容模式。我们将在即将发布的博文中分享适用于 Android 的 Impeller 的早期预览版，以及有关 Impeller 技术基础的更多详细信息。

## **与 Web 应用的无缝集成**

正如我们在 [Flutter Forward 大会](https://flutter.cn/posts/flutter-forward-2023-recap) 上介绍的那样，我们的目标与大多数现有的 Web 框架有所不同。我们为 Web 构建的 Flutter 的实现方式表明，Flutter 明显 *不是* 为了设计成通用的 Web 框架。已经有很多现有的 Web 框架，如 Angular 和 React，在这一领域表现的非常出色。然而，Flutter 是第一个围绕 [CanvasKit](https://skia.org/docs/user/modules/canvaskit/) 和 [WebAssembly](https://webassembly.org/) (这两个技术特别适合用于打造复杂的应用体验) 等新兴 Web 技术进行架构设计的框架。

> "Flutter 是第一个围绕 CanvasKit 和 WebAssembly 等新兴网络技术进行架构设计的框架。"

自最初 [Flutter 推出 Windows 平台支持](https://flutter.cn/posts/announcing-flutter-for-windows) 以来，我们一直在努力提高其性能、可用性和互操作性。

影响感知性能的一个主要因素是 *加载时间*，即从用户请求页面到页面可交互所用的时间间隔。在此版本中，我们取得了飞跃性的进展，这要归功于在所有浏览器上缩减了 CanvasKit 的大小，并对基于 Chromium 的浏览器进行了其他方面的优化。在 Flutter 3.10 中，CanvasKit 的大小缩减到 1.5MB (之前版本中的大小为 2.7MB)。图标字体也去除了未使用的字形，在大多数情况下，其大小缩减至原来的百分之一。得益于这些优化，我们使用模拟数据线连接将默认计数器应用的加载时间缩短了 42%。

正如 Flutter Forward 大会上预告的那样，我们现在 [支持在现有 HTML 网页中嵌入 Flutter 内容](https://flutter-forward-demos.web.app/#/)，而不是让 Flutter 占据整个页面。此外，Flutter 也不需要使用内嵌框架。在 Flutter 3.10 中，我们引入了*元素嵌入*功能。借助该功能，你可以像在页面上集成任何其他 CSS 元素一样集成 Flutter 内容。例如，你可以应用复杂的 CSS 过渡和转换。若想开始体验，不妨试试这些使用 [JavaScript](https://github.com/flutter/samples/tree/main/web_embedding/element_embedding_demo) 或将 Flutter 封装在 [Angular 组件](https://github.com/flutter/samples/tree/main/web_embedding/ng-flutter) 中的示例应用。

Flutter 3.10 继续专注于发展突破性的图形性能，还支持 Web 上的 [fragment 着色器](https://docs.flutter.dev/development/ui/advanced/shaders)。自定义着色器可用于提供超出 Flutter SDK 所提供的丰富图形效果。着色器是一种使用类似于 Dart 的小型语言 (称为 [GLSL](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL))) 编写的程序，它会在用户的 GPU 上执行。如需了解更多信息，请查看我们 [关于着色器的文档](https://docs.flutter.dev/ui/advanced/shaders) 以及 [新发布的 Codelab](https://codelabs.developers.google.com/codelabs/flutter-next-gen-uis#0)。

## **借助 WebAssembly 实现对新架构的早期支持**

[WebAssembly](https://webassembly.org/) (通常缩写为 Wasm) 作为适用于 [现代浏览器](https://caniuse.com/wasm) 而无关平台的二进制指令格式已经日渐成熟。在 Web 应用上，Flutter 一直使用 Wasm 来分发 CanvasKit 运行时，而 Dart 框架和应用代码历来都被编译为 JavaScript。我们将感兴趣的目标从 JavaScript 转向 Wasm 已经有一段时间了。然而，直到最近，Wasm 仍然缺乏对 Dart 等垃圾回收语言的原生支持。

因此，在过去的一年里，我们与 WebAssembly 生态系统中的多个团队合作，将垃圾回收引入标准之中。这是通过名为 [WasmGC](https://github.com/WebAssembly/gc/blob/main/proposals/gc/Overview.md) 的新扩展程序实现的，该扩展程序现在在基于 Chromium 的浏览器和 Firefox 浏览器中具有近乎稳定的实现。

WebAssembly 具有将原生代码的性能带到 Web 的潜力，这一点让我们兴奋不已。Dart 的 JavaScript 编译器已在 Google 的数百万行代码中使用，已经生成了执行速度快、优化良好的 JavaScript。然而，切换到 Wasm 将为我们提供原生代码的效率和 JavaScript 的可移植性，这将进一步提高我们在 Web 上的性能。在一些早期的基准测试中，我们看到执行速度提高到原来的 3 倍，而执行速度的提升会转化为更丰富的基于 Web 的体验。此外，借助 Wasm 我们能够与用其他语言 (如 Kotlin 和 C++) 编写的代码更轻松地集成在一起。

> "WebAssembly 具有将原生代码的性能带到 Web 的潜力，这一点让我们兴奋不已。"

在翘首以盼浏览器支持变得更加普遍的同时，我们在预发布渠道中引入了对将 Flutter 应用编译为 WebAssembly 的预览支持。我们希望你能在自己的应用中试用该功能，并尽早与我们分享反馈。如需了解详情，你可以访问 [flutter.dev/wasm](https://flutter.dev/wasm)。

## **对开发者体验的持续关注**

一方面我们希望通过前面列出的突破性的图形性能和更丰富的网络支持让更多用户满意，另一方面我们也在这个版本中为提升开发者的速度和效率进行了许多改进。并且 [我们详细的技术文档记录了对 Flutter 本身的数百项改进](https://medium.com/flutter/whats-new-in-flutter-3-10-b21db2c38c73)，这将引起目前 Flutter 开发者的极大兴趣。

但在这个版本中，对核心开发者体验最显著的改进是 **发布了 [Dart 3](https://dart.cn)，包含在 Flutter 3.10 中**。

Dart 3 完成了为 Dart 生态系统带来可靠的空安全 (null safety) 的漫长旅程。编写空安全代码可以防止因未经检查就使用未初始化的值而产生的一整类编程 bug。虽然我们从 Dart 2.0 开始就支持空安全代码，但现在已经关闭了传统的 "不安全" 模式。作为一个生态系统，我们已经为此准备了一段时间，排名前 1,000 的 packages 中有 99% 都支持空安全，现在是进行过渡的最佳时机。

> "Dart 3 完成了为 Dart 生态系统带来可靠的空安全的漫长旅程。"

Dart 3 引入了许多其他新功能，包括记录、模式和类修饰符，这将提高 Dart 代码的可读性和流畅性。欢迎前往 [Dart 3 博客](https://medium.com/dartlang/announcing-dart-3-53f065a10635)，了解更多信息和示例。Flutter 本身已经在利用这些新的 Dart 3 功能，因此随着这些功能的推出，你会看到我们自己的代码库得到了改进。我们相信你会喜欢在自己的代码中使用这些功能。

## **SLSA 和软件供应链安全**

在当今时代，我们不得不采取措施来防止对关键软件基础设施的威胁。因此，除了前面列出的功能外，我们的工程团队还将安全方面的投入列为 [今年的工作重点](https://medium.com/flutter/flutter-in-2023-strategy-and-roadmap-60efc8d8b0c7)。这项投入涵盖安全测试、自动化和供应链安全。

> "我们的团队已将安全方面的投入列为工作重点。"

我们将通过开展以下工作，进一步增强企业采用 Flutter 的信心:

* 开源安全基金会 (OpenSSF) [最佳实践计划](https://bestpractices.coreinfrastructure.org/en) 是帮助项目遵守安全和漏洞管理最佳实践的实用基准。很高兴地宣布，我们已经达成了这个计划合格水平的 [全部合格要求](https://bestpractices.coreinfrastructure.org/en/projects/5631)，并继续努力朝着符合 [白银级](https://bestpractices.coreinfrastructure.org/en/projects/5631?criteria_level=1) 和 [黄金级](https://bestpractices.coreinfrastructure.org/en/projects/5631?criteria_level=2) 标准的方向前进。

* Flutter 还在所有 Flutter 关键库上启用了 [OpenSSF Scorecards](https://securityscorecards.dev/) 和 [Dependabot](https://github.com/dependabot/dependabot-core)。OpenSSF Scorecards 是一种静态分析工具，用于检查你的库对最佳实践的遵守程度，并在这些实践没有被遵守时发现问题。Dependabot 可监控项目依赖项中是否存在漏洞，并创建拉取请求以便在必要时更新它们。利用这些工具，Flutter 团队已经在我们的网站和 Codelab 中发现并解决了 300 多个漏洞。

* Flutter 和 Dart SDK 以及这些 SDK 的发布工作流程最近已达到 [SLSA L1](https://slsa.dev/spec/v1.0/levels#build-l1) 等级。SLSA (软件制品的供应链等级) 框架可帮助开源项目保持强大的供应链安全性。达到 SLSA L1 等级是朝着保护 Flutter 开发者日常使用的工具迈出的重要一步。

* 最后，我们对基础架构进行了多项安全改进，包括迁移到更安全的构建和测试环境，同时限制对这些环境的访问。此外，我们还改进了 Flutter 框架和引擎工件的日志记录和审核功能，为我们的工件提供了卓越的保护。这些改进让 Flutter 团队更深入地了解我们生成的工件在构建流程中的处理方式。

## **一个凝聚了开发者全员智慧的开源项目**

此版本中还包含数以千计的其他更新，我们希望这些内容会让现有的 Flutter 开发者满意。但值得注意的是，这些贡献者中有相当一部分是 Google 以外的开发者，贡献内容包括开发新功能；改进文档；开发软件包，将 Flutter 扩展到我们从未想象到的领域；提交可重现的问题报告和功能请求，为我们提供了有关如何改进 Flutter 的新视角。

Flutter 不只是一个 *Google* 项目，而是一个*全员参与*的项目。我们非常感谢社区的多样性和热情参与，让 Flutter 蜕变至此。很高兴能与你一起完成这一使命，Flutter 将迈向更加光明的未来！

<video controls width="690" height="480" src="https://files.flutter-io.cn/posts/images/2023/07/21/HSILcX.mp4" poster="https://files.flutter-io.cn/posts/images/2023/07/21/jUxloC.png"></video>

Betterment 开发者故事: 使用 Flutter 规模化构建理财应用
