---
title: 借助 Flutter 跨平台特性连接 10 亿玩家 | Flutter 开发者故事
toc: true
keywords: Flutter开发者故事, PUBG MOBILE
description: PUBG MOBILE 游戏自带的社区功能丰富，用户群庞大，如何确保各个平台的玩家都能有最棒的体验？
image:
    path: https://devrel.andfun.cn/devrel/posts/2023/02/lVFv2g.jpg
---

{% include docs/bili_shims.liquid %}

> _由光子工作室及 Krafton 联合研发的 PUBG MOBILE 依然保持着_[_极高的人气_](https://101.dev/t/google-play-2022/823)_，目前全球有 10 亿玩家，日活跃 5,000 万 (不包括中国大陆地区)。从游戏策划伊始，团队就打算为各个平台的玩家们打造功能完善的社区模块。_

在 PUBG MOBILE 中，玩家们被空投到一个荒岛上，孤身奋战或与队友合作，努力与对手周旋，幸存到最后赢得胜利。想要在这个游戏里 "吃鸡"，玩家的敏捷反应和大局意识都很重要——而对负责开发游戏内社区模块的团队来说，这两点正好也是他们成功的秘诀。

<iframe width="690" height="480" src="{{bili-embed}}?aid=393503978&bvid=BV1sd4y1H7G7&cid=985504987&page=1&autoplay=false" {{bili-set-short}}> </iframe>

△ PUBG MOBILE 如何连接 10 亿玩家 | Flutter 开发者故事
    
**全平台一盘棋，大局意识很重要**

负责 PUBG MOBILE 游戏社区模块的团队规模并不是很大，但服务的玩家群体却十分庞大，这也让团队对任何能提高效率的开发技术都十分敏感。2020 年下半年，当团队着手为社区模块寻找解决方案时，就在着眼寻找合适的 [跨平台解决方案](https://flutter.cn/multi-platform): 他们需要让社区模块能很方便地覆盖 Android 和 iOS 平台。

> _我们测试的很多解决方案都存在这样那样的限制，但这些限制在 Flutter 中则不存在: 即便在引入了复杂的业务逻辑后，Flutter 的性能表现仍然十分优秀。_
> 
> 胡明春，PUBG MOBILE 开发团队高级工程师

![](https://devrel.andfun.cn/devrel/posts/2023/02/SvqNgV.gif)

△ Flutter 打造的社区模块一直能保持稳定的帧率

团队选择 Flutter 的另一个原因是它能很方便地 [和现有的游戏进行整合](https://flutter.cn/docs/development/add-to-app)。这也让社区模块在开发层面不至于和其他模块 "高度耦合"，让团队能专注打造社区功能本身。

> _Flutter 可以很轻松地和现有的游戏进行整合，基本上照着官方文档操作就行，用不了多少时间。_
> 
> 张海鹏，PUBG MOBILE 开发团队高级工程师

**大幅降低代码量，敏捷开发很重要**

"一次编写，到处运行" 是 Flutter 跨平台特性带来的 "福利" 之一。除去一些平台特定的功能外，团队可以**只用一个代码库就覆盖 Android 和 iOS 两个平台**。这样做的另一个好处是能**确保平台之间功能的一致性**，在高强度迭代时这个好处更是非常重要。

> _自从采用 Flutter 后，我们发现可以将前端所需的 **开发工作量减少 80%**！_
> 
> 程建，PUBG MOBILE 开发团队高级工程师

![](https://devrel.andfun.cn/devrel/posts/2023/02/Dqcz3s.png)

△ 一次编写，到处运行

如果正在阅读本文的读者还没有体验过 Flutter 带来的这些优势，那也许还会心存顾虑: Flutter 好学吗？

正好我们也能从团队的反馈中找到答案:

> _我们在 Java、Kotlin 和 Objective-C 方面有着坚实的基础，这让 Dart 语言的学习成本很低。_
> 
> 张海鹏，PUBG MOBILE 开发团队高级工程师

**用跨平台连接更多玩家**

> _游戏中的社区模块一直很受用户欢迎。统计数据表明，每月有近千万玩家使用社区模块在游戏中分享屏幕录像等内容。_
> 
> 汪增灏，PUBG MOBILE 开发团队高级产品经理

![](https://devrel.andfun.cn/devrel/posts/2023/02/rZVjEk.gif)

△ PUBG MOBILE 丰富的社区功能由 Flutter 打造

展示战利品、时装、精彩录屏……玩家们一次次精彩的对抗，也是一段段难忘的时光。社区功能的存在，是让这些时光得以留存，让玩家们彼此相连，让快乐从一个人传递给更多的人。

节省代码、平台统一、性能优秀、易于上手，则是 Flutter 带给开发者们的快乐。跨平台的游戏社区体验，毫无疑问是 PUBG MOBILE 游戏在成功路上的重要一环。

"用上 Flutter，今晚吃鸡！"
