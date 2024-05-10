---
title: Flutter Engage China 开发者常见问题解答 — 下篇
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2021/04/14dcfcd1d2a09.jpg)

再次感谢大家对 [Flutter Engage China 活动](https://flutter.cn/posts/flutter-engage-china-event-recap) 的关注和积极参与！我们在活动前后收到了很多来自开发者的反馈和问题，Flutter 团队和演讲嘉宾在直播 Q&A 环节中也针对部分问题在第一时间给出回复。现在我们将一些开发者关心的问题和回复整理出来分享给大家，希望对你有所帮助。由于问题数量较多，我们分为上下两期发布，上期的内容已经发布，欢迎大家 [前往回顾](https://flutter.cn/posts/flutter-engage-china-developers-qa-part-1)。你也可以观看 Flutter Engage China 视频回顾精彩内容:

[**➡️点击这里查看直播回顾视频⬅️**](https://www.bilibili.com/medialist/play/ml1214246458/BV1hh411D7mV)

* Bilibili 视频合集链接 [https://www.bilibili.com/medialist/play/ml1214246458/BV1hh411D7mV](https://www.bilibili.com/medialist/play/ml1214246458/BV1hh411D7mV)


## **为什么 Flutter SDK 集成的内容这么少，写个简单的控件都需要依赖第三方插件，不能多扩展一下控件功能吗？**

*回答者: 杨天航 (Chris)，Google Flutter 团队工程师*

在一开始决定哪些内容应该集成到 SDK 里的时候，我们主要考虑这么三个因素:

* **降低二进制文件尺寸** 。
* **希望框架里的 API 在不同平台上比较统一** 。所以如果我们在框架或引擎里加入一些控件的功能的话，会让我们无法去统一 API。
* **让 Flutter 框架非常模块化** ，中间有很多模块，很多层级，这样我们可以很容易地进行替换。假如我们把视频播放器控件建立在 Flutter 引擎和框架里，那就很难避免大部分的 Flutter 应用只能选择我们提供的视频播放器 API 的局面。这样其实很不方便，尤其对于那些有不同需求的应用。如果是以现在插件的形式提供视频播放器的话，大家都可以找到合适的解决方案。不同的团队也可以建立自己的插件，这无疑会让大家有更多选择的余地。

## **Flutter 包体积如何缩减？**

*回答者: 董韬，Google Flutter 用户体验研究负责人*

我们一直在针对这个问题做优化工作。包的精简主要包括两个方面的工作: 第一个方面是 Flutter 团队为全球所有用户做的全局优化。第二个方面是每个 App 团队在自己的 App 内部做的优化。

从第一个方面来讲，我们去年对大的编译过程做了很多优化，主要是在 iOS 端。iOS 端产物的体积已经有了比较显著的缩小。目前来看，想要进一步缩小包产物的话，需要更多的由开发者根据自己 App 的实际情况做一些取舍，以及对 Flutter 引擎做一定的定制。

我们最近也推出了一款工具，在 Dart DevTools 里面，叫做 [Code Size Analysis](https://docs.flutter.cn/development/tools/devtools/app-size#analysis-tab)，这个工具可以帮大家可视化包里具体有哪些内容，每个内容占用了多少空间。有的时候你可能会发现，有一些资源或者有一些依赖的库占用了过多的空间。这个工具也会帮你解析 Flutter 引擎里面具体的产物是什么，如果你有计划去对 Flutter 引擎进行定制的话，这些都会是很好的参考数据。

*回答者: 袁辉辉，字节跳动 Flutter 技术负责人*

我简单从 App 团队的角度来做一些补充。App 团队想缩小包体积的话，有三个可以做的优化。一个是压缩，主要是我们在代码端和数据端，可以对数据做一些压缩。二是裁剪，你可以看看哪些模块是不使用的，比如说你是国内使用的 App，那就并不需要国际化的一些功能模块，就可以裁剪掉。三是系统级的优化，比如说大的编译由 O3 变 Oz，或者是做指令集头部的一些精简，把 code source map 这样的东西去掉，以及做一些混淆，到了线上之后再通过后台平台还原回来，能使用的手段其实很多的。

我们接下来会加大对外的技术输出，后续我们会把这些技巧再梳理一下分享给大家。

## **类似微博那种大量音频、视频，以及文本和图片混排导致的性能问题该怎样解决？**

*回答者: 刘森森，阿里巴巴 UC 客户端团队*

这个问题其实可以理解为在这种复杂卡片的场景下，在列表做惯性滚动的时候出现的一些性能问题。这个问题非常典型，实际上在应用层有很多优化手段可以去做。

首先我们可以使用 Flutter 提供的性能分析工具来定位问题，去发现是否在写法上面存在着一些可以优化的地方。比如在列表滚动的时候，是否存在 widget 构建的次数过多，或者构建的层级过深的问题，导致 UI 线程出现卡顿。我们也可以使用 Flutter 提供的 [RepaintBoundary](https://api.flutter-io.cn/flutter/widgets/RepaintBoundary-class.html)，来减少重绘的范围。并且检查是否使用到了 ClipPath 或者 BackdropFilter 这种可能会对 Raster 线程造成一定影响的操作，是否可以尽量去避免。

在优化完写法后，可以去评估使用 SurfaceView 作为 FlutterView 渲染的实现。SurfaceView 从原理上来讲比 TextureView 的性能更好，因为它有独立的渲染管线。从实际测试的效果来看，SurfaceView 的帧率平均有 2~4 帧的提升。它的问题可能存在于混合开发的场景，由于它跟 AndroidView 不兼容，会导致黑屏等兼容性问题。我的建议是，如果是开发一个完整的 Flutter App 的话，优先选用 SurfaceView；如果做混合栈开发的话，需要评估 SurfaceView 是否存在导致兼容性问题的场景，然后尽量去使用 SurfaceView。

如果前两步都没有发现问题的话，可以使用我分享的分帧渲染的思路，也可以减少 UI 和 Raster 线程的绘制耗时。

<iframe width="560" height="315" src="{{site.bili.embed}}?aid=247451014&bvid=BV1wv411h7Ni&cid=318242333&page=1&autoplay=false" {{site.bili.set-short}}> </iframe>

回到引擎层面上，UC 这边做的一些优化也会以 PR 的形式回馈到社区，大家可以关注我们的进展。

## **教育培训领域的应用适合使用 Flutter 吗？**

*回答者: 袁辉辉，字节跳动 Flutter 技术负责人*

教育这一块的话，我们在字节内部其实用 Flutter 比较多的就是我们的教育领域产品。我有了解到，很多公司会针对一款教育产品，按照课程进行拆分，比如数学、英语、思维，都会拆分出一个个独立的 App，这个开发的工作量是非常大的。在刚进入一个新的行业时，人员招聘可能一下子跟不上来，这个时候其实我们会很在乎一个技术能不能让研发效率实现快速提升，这时 Flutter 就是一个比较好的选择。

昨天我还跟我们公司外的教育公司聊到 Flutter。他们现在有一款大的 App，想要拆成很多个教育子方向的 App，可能会裂变成 3 个、5 个甚至 10 个，但是他们团队可能 Android 和 iOS 端加在一起也只有几个开发小伙伴。聊下来的结果就是，Flutter 是一个很好的切入方式。我觉得不光是教育行业，其实对于一些新 (领域) 的 App，如果你比较注重研发效率，用 Flutter 都是一个不错的选择。

## **高延迟渲染管线如何分帧，是否使用 Isolate 分线程？**

*回答者: 刘森森，阿里巴巴 UC 客户端团队*

高延迟渲染管线，其实它的分帧还是以 16 毫秒为周期输出的，就是一个 Vsync 周期，这一点是没有改变的。实现起来的话，主要是把原本必须在一个 Vsync 周期完成的任务增大到了两个 Vsync 周期，由于 UI 线程和 Raster 线程是并行的，从而增大了输出的吞吐量，Raster 线程始终是每一个 Vsync 周期输出一帧。大家可以结合 Android 的 DoubleBuffer 去理解，会更容易一些。在线程方面，我们没有新建，而是在原本的 UI 线程和 Raster 线程上去操作的。这些改动只是在引擎层，上层不用去做什么。

## **请问 Flutter 在汽车系统上做了哪些工作？丰田采用 Flutter 开发的车机系统会及时开源吗？**

*回答者: 樊舟颖 (Zoey)，Google Flutter 产品经理*

上次在 [Flutter Engage 活动](https://flutter.cn/posts/announcing-flutter-2) 上，我们邀请丰田来讲解了一些他们现在 Flutter 的部署规划。丰田现在还没有公布具体的计划，以及是否开源。如果大家有这个需求的话，我们会和丰田聊一聊，向他们提出这方面的建议。但我们不是丰田，不能代表他们来做出决定，如果他们后续有相关的开源计划的话，我们会和大家分享。

. . .

以上就是 Flutter Engage China 开发者常见问题解答 (下篇) 的内容，大家也可以随时回顾之前发布的 [上篇内容](https://flutter.cn/posts/flutter-engage-china-developers-qa-part-1)。如果你有任何疑问或者建议，欢迎大家 [GitHub](https://github.com/flutter) 积极分享你的反馈与想法.

