---
title: Flutter Engage China 开发者常见问题解答 — 上篇
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2021/04/84565efef718e.jpg)

再次感谢大家对 [Flutter Engage China 活动](https://flutter.cn/posts/flutter-engage-china-event-recap) 的关注和积极参与！我们在活动前后收到了很多来自开发者的反馈和问题，Flutter 团队和演讲嘉宾在直播 Q&A 环节中也针对部分问题在第一时间给出回复。现在我们将一些开发者关心的问题和回复整理出来分享给大家，希望对你有所帮助。由于问题数量较多，我们会分为上下两期发布。你也可以观看 Flutter Engage China 视频回顾精彩内容:

**➡️[点击这里观看直播回顾视频](https://www.bilibili.com/medialist/play/ml1214246458/BV1hh411D7mV)⬅️**


## **如何更好地解决跟平台硬件交互的问题？**

*回答者: 于潇，Google Flutter 移动端团队负责人*

和硬件 API 交互最好的方法是通过 [平台通道](https://docs.flutter.cn/development/platform-integration/platform-channels) (Platform Channel) 和平台的 SDK 进行交互。在这之上也有 [Pigeon](https://pub.flutter-io.cn/packages/pigeon) 之类的插件可供大家使用，它可以生成针对所有语言的终点 (endpoint)，从而简化平台通道代码的编写过程。

如果硬件有 C++ 的驱动的话，也可以使用 [外部函数接口](https://docs.flutter.cn/development/platform-integration/c-interop) (FFI)，通过 FFI 调用 C++ 的 SDK 来使用硬件层的能力。

## **Flutter 在开发效率方面有哪些优势？**

*回答者: 刘森森，阿里巴巴 UC 客户端团队*

Flutter 的开发效率很高，从阿里巴巴和 UC 多个团队的实际应用情况来看，主要体现在以下几点:

* **Flutter 具备非常良好的研发体验** ，可以说是非常接近 web 了: 包括提供了设备的热重载功能，在 IDE 里也能提供可视化布局，这些都非常便于开发和迭代。
* **Flutter 内置了很多符合现代化 UI 设计的 widget** ，使得开发团队能很容易地开发出 UI 表现力很好的 Flutter 页面。
* **Flutter 跨平台的一致性非常强大** 。

从开发者们实际落地使用的效果来看，单客户端的开发者使用 Flutter 就可以覆盖多端的研发任务。在 UC 团队里，前端的开发者也能深度参与 Flutter 的业务开发。另外 Flutter 在互操作上也很灵活，比如提供了 FFI、平台通道、外接纹理等做法，让开发团队可以更容易地为 Flutter 提供现有的原生组件，为组件研发的速度带来了非常大的提升。

在团队正式使用 Flutter 之前，建议大家把 Flutter 融入到现有的研发工作流程里，包括开发、测试、集成等各个阶段，并为开发者们进行一些常规的 Flutter 技能培训，这些做法可以大幅提升 Flutter 落地的效率。

总的来说，Flutter 对比传统的 Android 和 iOS 研发效率有质的飞跃。

## **Flutter 适合做游戏开发吗？**

*回答者: 樊舟颖 (Zoey)，Google Flutter 产品经理*

Flutter 的初衷并不是为游戏而创作的，也就是说，游戏的应用场景并不是 Flutter 一开始所考虑的。但是我们在过去的一年到一年半里，发现确实有越来越多的游戏开发者开始使用 Flutter，而且在 Play Store 里获得了非常大的下载量。

就我们观察到的情况而言，强调性能和图像表现，或者需要用到很多重力感应等特殊组件的游戏大部分还是会用 Unity 这样的引擎来开发。但是一些休闲游戏，比如字谜、猜图、连连看，我们有看到越来越多的人在使用 Flutter 开发。

后续我们会通过用户问卷调查，了解游戏开发者使用 Flutter 的话主要有哪些需求。

## **Flutter 1 升级到 2 后有很多 API 都过时了，有好的方法快速从 1 转 2 么？**

*回答者: 董韬，Google Flutter 用户体验研究负责人*

Flutter 2.0 版本的发布是一个比较主要的升级，从 release note 来看有大概 12 个重大变更 (breaking changes)。我们团队对 API 的更改一直抱持非常谨慎的态度。毕竟我们也了解开发者需要去更新到新的版本，这个过程中会碰到一些障碍。但我们也会不断改进 API，来让 Flutter 本身更加好用、易用。

如果在升级 Flutter 的过程中碰到 API 变更的问题，这里有两个建议:

* 请考虑使用我们在 2.0 版本中同时发布的 [Flutter Fix](https://docs.flutter.cn/development/tools/flutter-fix) 工具。这个工具有命令行，也有和 IDE 进行集成，可以帮助大家更方便地自动进行 API 升级。
* 建议大家放心及时地升级 Flutter 版本。如果你从一个相邻的版本升级到一个新的版本，那么需要更改的代码一般是比较少的。

## **Flutter 的渲染默认不是平台的主线程，那在渲染的时候会不会由于线程优先级问题而影响流畅度？如果出现流畅度问题，该如何解决？**

*回答者: 于潇，Google Flutter 移动端团队负责人*

线程优先级确实有可能导致问题。在 Android 上我们是有改变 "背景" 线程的优先级的，但在 iOS 上目前还没有。请继续关注我们在这方面的探讨: [https://github.com/flutter/flutter/issues/65752](https://github.com/flutter/flutter/issues/65752)

## **除了 Ubuntu，其他 Linux 版本 (如 Red Hat) 要定制开发底层解析 Flutter 引擎吗？**

*回答者: 董韬，Google Flutter 用户体验研究负责人*

Flutter 对 Linux 的支持其实是不仅限于 Ubuntu 的。只要你使用的 Linux 是 64 位的，就可以安装和使用 Flutter 去开发 App。具体可以参考 [Flutter 官方的 Linux 安装说明](https://docs.flutter.cn/get-started/install/linux)。

Ubuntu 则更方便了一些，提供了一个官方的 Flutter 安装工具。另外 Ubuntu 也开始用 Flutter 开发一些内置的 App。

## **希望官方插件尽快解决现有的 issue，期待 Flutter 生态越来越好！**

*回答者: 杨天航 (Chris)，Google Flutter 团队工程师*

谢谢提出这个问题的同学。我们在去年的时候，由于各种原因，把主要的工作重点放在了基础设施的建设上，包括稳定性这些方面。今年我们的工作重点之一就是解决 issue，包括对 pull request 的审核等。大概在一个月前，我们大大增加了每周整理 issue 和 PR 的时间，增加为去年的 4 倍以上。

另外，我们目前还在跟一些公司和团队进行合作，比如 Baseflow，Invertase，以及和社区进一步加大合作，从而进一步提高 Flutter 插件的质量。

・・・

以上就是 Flutter Engage China 开发者常见问题解答 (上篇) 的内容，也请大家继续关注下篇内容。
