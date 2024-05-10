---
title: Flutter 2.8 正式发布
toc: true
---

文/ Tim Sneath，Flutter & Dart 产品经理

Flutter 已经更新到 2.8 正式版，发布了多项新特性和改进以不断改善移动和 Web 端的开发体验，同时也正在将桌面端的支持推向稳定版。

![]({{site.flutter-files-cn}}/posts/flutter-cn/2021/announcing-flutter-2-8/flutter-2-8-hero.png)

Flutter 为应用开发带来了革新：只要一套代码库，即可构建、测试和发布适用于移动、Web、桌面和嵌入式平台的精美应用——开发者只需专注于他们希望构建的产品和服务，而无需首要考虑发布到哪些平台；作为一个高性能、高生产力的开发框架，Flutter 也可以帮助开发者们缩短产品开发周期；一套代码库，针对多个平台。

## 新特性和改进: 更快速、更高效

这次正式版主要关注的是 **移动平台性能**。理想情况下，出色的性能应该是「标配」，但在实践中，所有大型或复杂业务的应用都需要针对硬件和系统 API 库进行优化。这包括但不仅限于比如应用启动，可能会受限于网络带宽和其他代码初始化的消耗，内存消耗，可能会受制于部分内存有限的设备，以及图形渲染性能等。我们也一直在借助内部的大型应用比如 Google Pay 对 Flutter 的使用来提高 Flutter 的性能表现，并提供更好的工具来调试和分析应用性能。为你的工程升级到 Flutter 2.8 正式版，你的应用应该会有更少的内存占用以及更快的启动速度。

最新的更新也包含了更方便的 **应用接入后端服务** 的特性，比如使用 Firebase 和 Google Cloud。我们也为应用可以加入 Google Ads 提供了稳定版的支持，并对相机插件和 Web 插件内嵌提供了大量更新。与此同时发布的还有 Dart 2.15 正式版，增加了对并发性能的重大改进，也添加了新的语言特性，比如构造函数拆分和枚举类型的增强，也进行了性能优化，使得运行时内存降低了 10%。

![现在你的应用可以通过使用一个简单的 Flutter widget 来完成多平台用户登录功能了]({{site.flutter-files-cn}}/posts/flutter-cn/2021/announcing-flutter-2-8/sign-in-widget.png)

另一个重要话题和资源投入是「提升开发者效率」，得力于 Flutter 的有状态热重载 (stateful hot reload) 等特性，我们始终专注于为开发者创建一个紧凑的内部循环迭代流程，我们正在开始探索封装出一些更高级的功能让开发者们更快速和高效的使用，你也能在未来的版本里看到我们针对这个目标的改进。比如在此次正式版发布里，我们添加了一个使用 Firebase 处理身份验证的 widget，使用的时候无须担心任何特殊的用例，比如两步验证、密码重置的操作，也不用操心使用 Google、Apple、Twitter 和 Facebook 账号登录时的复杂情况。将这些特性和服务直接构建在 Flutter 的核心基础中，将有可能为应用开发带来革新，将高效开发和低代码方案相结合，应用在 Flutter 这个灵活和强大的 UI 框架上。

## 使用基于 Flutter 的游戏开发框架 Flame

对于大部分开发者来说，Flutter 是一个应用框架。不过使用 Flutter 进行休闲小游戏开发的生态也在不断发展，这些小游戏借助 Flutter 实现硬件图形加速。

今天我们也同时庆祝 Flame 框架 (flame-engine.org) 的 1.0 版正式发布，这是一个使用基于 Flutter 的模块化 2D 游戏引擎，Flame 提供了快速构建游戏所需要的全部内容，除了游戏循环 (game loop) 之外，也提供了核心元素比如组件系统 (Flame 里称之为 FCS)、精灵动画和图像、碰撞检测、世界相机、效果系统以及手势和输入支持等。

Flame 是模块化的，它也可以使用其他库或 package 进行扩展，比如使用 River 进行动画效果处理、使用 audioplayers 这个 package 进行音乐播放和声音特效，使用 Forge2D (一个类似 Box2D 的物理引擎)、Tiled (瓦片地图编辑器)、Fire Atlas (Spritesheet 和精灵动画编辑器) 等。Flame 以及其广泛的生态系统，共同为休闲或者 2D 游戏提供了一套强大的服务。


![三款使用 Flame 构建的游戏示例：Tomb Toad、Gravity Runner 和 Bonfire]({{site.flutter-files-cn}}/posts/flutter-cn/2021/announcing-flutter-2-8/flame-game-demo.png)

Flame 由 [Blue Fire 团队](https://dev.to/blue-fire/fireslime-is-now-blue-fire-405g "Blue Fire 团队") 创造，这是一个专注于为 Flutter 和 Dart 构建开源 package 和插件的团队。我们很高兴能与他们一起合作，如果你对游戏开发感兴趣，我们鼓励你去试试看 Flame。

## Flutter 的发展势头正旺

Flutter 的持续增长、发展势头以及工具和生态的繁荣的令人感叹。今年的 I/O 大会上，我们注意到 Play 商店以及拥有超过 20 万款应用使用了 Flutter，六个月后，这个数字几近翻了一番，达到 37.5 万+ 款！

![在所有屏幕上大放异彩，Flutter 支持 Android、iOS、iPadOS、Web、Windows、macOS 和 Linux]({{site.flutter-files-cn}}/posts/flutter-cn/2021/announcing-flutter-2-8/flutter-platform.png)


不仅在 Android 平台，据独立移动分析公司 [AppAnnie](https://www.appannie.com/cn/ "AppAnnie") 的信息，iOS 平台头部品牌和大型应用诸如 [BMW](https://itunes.apple.com/app/id1519457734 "BMW")、[eBay](https://itunes.apple.com/app/id1456156090 "eBay")、[WeChat](https://apps.apple.com/us/app/wechat/id414478124 "WeChat")、[SHEIN](https://apps.apple.com/us/app/shein-online-fashion/id878577184 "SHEIN")、[Philips Hue](https://apps.apple.com/app/id1055281310 "Philips Hue")、 [Norton](https://apps.apple.com/app/id1278474169 "Norton")、[trip.com](https://apps.apple.com/app/id681752345 "trip.com") 和 [Greggs](https://apps.apple.com/gb/app/greggs/id1098233626 "Greggs") 里也都使用了 Flutter。在 Web 平台，我们也通过一些类似 [FlutterFlow](https://flutterflow.io/ "FlutterFlow") 和 [Rive](https://rive.app/ "Rive") 等设计工具为应用带去更好的体验。桌面端，Ubuntu 的工程团队也正继续使用 Flutter 构建各种新的体验，包括新的安装程序和固件更新程序。甚至包括 [绝地求生](https://apps.apple.com/us/app/pubg-mobile-arcane/id1330123889 "绝地求生") 这样的大型游戏，也称 Flutter 能够很好的适应各种 UI 屏幕。

生态系统的构建绝非一日之事，由各个机构和社区独立调研得出：[Statista](https://www.statista.com/statistics/869224/worldwide-software-developer-working-hours/ "Statista")、[JetBrains](https://www.jetbrains.com/lp/devecosystem-2021/miscellaneous/#Technology_which-cross-platform-mobile-frameworks-do-you-use-two-years "JetBrains")、[SlashData](https://www.slashdata.co/reports/?category=mobile-desktop "SlashData") 和 [Stack Overflow](https://insights.stackoverflow.com/trends?tags=flutter%2Creact-native%2Ccordova%2Cxamarin "Stack Overflow")，Flutter 现在已经成为最受欢迎的多平台工具包，这同时离不开日益增长的 package 和插件库的生态以及各种工具集的支持。

## 回首和展望

这一年同样艰难，而且我们的工程团队也一直在忙碌。除了把 2.8 推入正式版本，我们还重写了开发者工具，推出空安全和 Web 支持，完成了原生代码的 FFI 支持，加入了对 Material You 的支持，并努力提升性能和质量。我们将近解决和关闭了总共 2 万个 issue，也 [更新了新版的 Flutter 网站](https://mp.weixin.qq.com/s/JOm2-TBh4m3nJZKWbfjoug)。过去的几个月我们花费了大量的精力来整理我们的工程基础建设，用以提高工程师的生产力以及扩大测试范围等。

展望 2022，首先是希望能够真正走出去与大家见面，我们也正在向核心开发者体验方面投入更多，比如增强编程语言，文档更新以及抽象出更多高级功能，让 Flutter 可以更易于构建复杂应用，我们还将把桌面端支持推进到稳定版本，并进一步增加 Web 端的特性。除此之外，我们还计划与扩大其他平台的互操作性以适配更新的屏幕。我们一直在路上！

## 怀念和致敬

我们想把 Flutter 2.8 版本献给社区的 Kevin Gray，他是一名来自 VGV 团队的工程师，但是 [于一周之前不幸去世](https://verygood.ventures/blog/remembering-our-friend-and-teammate-kevin-gray "于一周之前不幸去世")。一开始 Kevin 就对 Flutter 的成功做了很多重要贡献，他是很多早期 Flutter demo 背后的开发者，包括 Flutter 的第一个客户 Hamilton 应用，用 Flutter 开发了第一个桌面演示 slides 的应用，开发了第一个在 Google I/O 主题演讲中展示的 Flutter 应用。Kevin 是一位有才华、有爱心、风趣和善良的人，我们在公开纪念他，并让所有人都知道他的影响，如果没有他，Flutter 将不会是现在的这个样子。我们想念你，谢谢你为 Flutter 做出的一切。

Kevin 一直在支持一项公益事业「国际计划 (Plan International)」，CFUG 社区以 Kevin 的名义向这个项目捐助 $280，以感谢他对 Flutter 的支持和贡献。





























