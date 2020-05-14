---
title: 所见即所得: Adobe XD 的 Flutter 插件
description: 我们很高兴宣布 CodePen 现已提供 Flutter 支持。
---

文/ Tim Sneath, Product Manager for Flutter and Dart, Google

Flutter 希望成为任您挥洒创意的画布。
凭借在 iOS 和 Android 上的原生性能体验、
对屏幕上每个像素点的精确控制
以及通过有状态热重载实现的快速迭代能力，
我们希望释放设计师和开发者的潜力，
打造不受技术限制的精美体验。

在去年的 Flutter Interact 大会中，我们将焦点转向了那些使用 Flutter 进行探索和实验的创作者们。比如数字艺术家 Robert Felker，他使用 Flutter 通过生成算法 (generative algorithm) 构建了 [空灵的视觉效果和形式](https://v.youku.com/v_show/id_XNDQ2ODg0OTYxMg==.html)。我们还介绍了来自 [gskinner](https://flutter.gskinner.com/) 等创意机构的作品，他们用一件件充满创意的作品，展示了 Flutter 在表现形式方面的无限可能。另外，我们也了解到 Adobe 在 Flutter 方面的投入: 他们展示了一款 Adobe XD 插件的早期原型，让大家可以直接从 XD 中导出 Flutter 代码。

![generative-artwork](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-adobe-xd-support-for-flutter/generative-artwork.png){:width="90%"}

△ Flutter 为创意提供了极富表现力的舞台，创造者可以尽情呈现优美、原生的体验，且不再受传统技术的束缚。(由 Flutter 绘制的生成艺术，Robert Felker 作品)

今天 **我们很高兴和 Adobe 共同宣布，Adobe XD Flutter 导出插件现在正式开放早期体验** ，欢迎大家踊跃参与测试。[Adobe XD](https://www.adobe.com/products/xd.html) 是一款 UI/UX 设计和协作工具，帮助团队创造和分享网站、应用、语音界面以及游戏等内容的设计方案。作为业界知名的 [Adobe Creative Cloud](https://www.adobe.com/creativecloud.html) 套件中的一员，XD 让创作者们可以将矢量绘图、文字、图像、小交互和动画资源共冶一炉，打造出可以交互的原型，来预览软件产品实际的运行效果。随着 Flutter 导出功能的加入，XD 原型现在可以在几分钟内转变成可用的 Flutter 代码，创意想法和产品开发的间隔被进一步缩短。Adobe XD 支持 Windows 和 macOS 系统，并且提供了[免费的入门计划](https://www.adobe.com/products/xd/compare-plans.html)，方便大家快速上手。

![flutter-plugin](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-adobe-xd-support-for-flutter/flutter-plugin.png){:width="90%"}

△ 使用插件即可轻松从 Adobe XD 导出到 Flutter


## 从 Adobe XD 中导出 Flutter 代码

在 XD 中使用 Flutter 插件很简单。您可以导出一个单独的绘图对象或组件，也可以导出整个画板 (artboard)。具体做法如下:

首先，安装 Flutter 导出插件。在 Adobe XD 中，选择 *插件* > *发现插件* ( *Plugins* > *Discover Plugins* )，然后搜索 Flutter。安装完成后，选择 *插件* > *Flutter* > *UI 面板* ( *Plugins* > *Flutter* > *UI Panel* )，即可显示上图中的 UI 面板。

现在将 [adobe_xd package](https://pub.flutter-io.cn/packages/adobe_xd) 添加到您的 Flutter 项目中，只需将其包含在您的 pubspec.yaml 文件中即可。这个 package 提供了帮助函数，用来减少生成的 XD 代码中的样板代码。

要导出单个元素，只需选择您想导出至 Flutter 的单个 widget，然后点击 UI 面板中的 *复制所选项* ( *Copy Selected* ) 按钮。这会将元素对应的 Dart 代码复制到您的剪贴板中，您可以基于这些代码打造有状态或无状态的 widget:

![flutter-plugin](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-adobe-xd-support-for-flutter/export-demo.png){:width="90%"}

△ 导出的代码可以整合进现有的项目中，而且更新时不需要调整其他文件

另一种方法是导出整个项目。假设您已经有了一个 Flutter 应用，并且您想把内容添加到这个应用里 (包括 pubspec.yaml 中对 adobe_xd package 的引用)，您只需从 UI 面板中选择 *插件* > *Flutter* > *导出全部 Widget* ( *Plugins* > *Flutter* > *Export All Widgets* )，然后设置想要的附加选项即可。

这个操作会在项目的 lib/ 子文件夹中创建一系列的类，您可以直接使用。您也可以继续调整 XD 原型，然后用 ⇧⌘F (在 Windows 上是 Ctrl+Shift+F) 再次导出，如果您在 Visual Studio Code 中打开了 Dart 的 "[在 Save Watcher 上使用热重载](https://dartcode.org/docs/settings/#dartpreviewhotreloadonsavewatcher)" 选项，那么当您重新导出 widget 时，您的应用将自动重新加载它们。

![flutter-plugin](https://files.flutter-io.cn/posts/flutter-cn/2020/announcing-adobe-xd-support-for-flutter/live-demo.png){:width="90%"}

△ 从 XD 快速转出代码的功能，使得从原型到应用之间的路径又多了一条

作为早期体验的预览版，这个插件现在也有一些限制，请阅读 [发布说明](https://github.com/AdobeXD/xd-to-flutter-plugin/blob/master/README.md#using-this-plugin) 了解详情。值得注意的是，响应式布局目前还不能使用，尚需等待新的 XD API 完成。不过请放心，当这些新功能上线时，您会自动获得插件更新。

> Adobe 致力于帮助那些设计和打造应用的团队，简化让他们颇为困扰的设计-开发流程。今天我们很高兴推出这个全新工具的早期体验版，它诞生自我们与 Flutter 的合作，旨在消除设计-开发流程中含糊的沟通环节，提高决策速度，便于团队更快地将新体验推向市场。
—— Vijay Vachani, Adobe Creative Cloud 平台与生态资深总监

请访问 Adobe 的 [XD Flutter 导出插件页面](https://github.com/AdobeXD/xd-to-flutter-plugin) 了解更多信息。我们期待看到您用它创建的作品！

原文：[Announcing Adobe XD support for Flutter](https://medium.com/flutter/announcing-adobe-xd-support-for-flutter-4b3dd55ff40e) 
中文发布：谷歌开发者公众号


