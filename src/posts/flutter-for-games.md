---
title: 使用 Flutter 打造引人入胜的休闲游戏体验
toc: true
keywords: Games
description: 与你分享 Flutter 在构建游戏方面的最新进展与成果，期待与开发者们齐力构建 Flutter 游戏开发的繁荣生态系统。
image:
    path: https://img-s1.andfun.cn/devrel/posts/2024/05/07/jcYkIr.png
---

*作者 / Zoey Fan*

去年，[Flutter 休闲游戏工具包进行了一次重大更新](https://medium.com/flutter/building-your-next-casual-game-with-flutter-716ef457e440)。近期在旧金山举办的 [游戏开发者大会 (GDC)](https://gdconf.com/) 上，Flutter [首次亮相](https://schedule.gdconf.com/session/google-developer-summit-building-multiplatform-games-with-flutter-presented-by-google/90307)。GDC 是游戏行业的顶级专业盛会，致力于帮助游戏开发者不断提升开发技能。欢迎你继续阅读，了解开发者利用 Flutter 构建游戏的进展，以及 Flutter 游戏开发的未来发展方向。

![△ Flutter for Games 宣传图](https://img-s1.andfun.cn/devrel/posts/2024/05/07/jcYkIr.png)

△ Flutter for Games 宣传图

自 [Flutter 休闲游戏工具包](http://flutter.dev/games) 推出以来，Flutter 已在游戏开发领域取得了显著进步。在过去一年内，借助 Flutter 开发的全新手游已经超过了 15,000 款。

事实证明，对于各种规模的游戏开发者而言，Flutter 都是一种极具吸引力的选择，它不仅能帮助 [Tatsuya](https://github.com/tty215) 这样的游戏开发新手利用空闲时间打造 [《Tinies Merge》](https://play.google.com/store/apps/details?id=com.ttydev.tiniesmerge&hl=cn)，使其在 [Google Play 的 Indie Games Festival](https://android-developers-jp.googleblog.com/2023/07/IndieGamesFestival2023.html) 上跻身 20 强，也能为全球下载量破亿的 [《Trivia Crack》](https://play.google.com/store/apps/details?id=com.etermax.preguntados.lite&hl=cn) 等人气游戏背后的团队赋能。

## **为何选择 Flutter 构建游戏？**

Flutter 在开发 2D 休闲游戏方面极具优势，尤其适合开发界面驱动型或回合制游戏。由于是开源性质，Flutter 无需用户支付许可费，非常便于对游戏机制进行深度控制，并且支持访问内容丰富的插件生态系统。Flutter 的 "热重载" 功能可加快开发速度，同时其优化引擎可确保在各种设备乃至浏览器上流畅运行。Flutter 能够一次构建并在 iOS、Android、Web 端、桌面设备以及 [Google Play 游戏电脑版](https://play.google.com/googleplaygames) 等诸多平台跨平台部署，助力你的游戏轻松覆盖更多平台。如果你是游戏开发者，请别忽视 Flutter 的巨大潜能；不妨尝试使用 Flutter 开发你的下一款游戏，并帮助我们触达更多开发者！

## **2024 年及未来: 齐力构建 Flutter 游戏开发生态系统**

2024 年，我们致力于帮助你利用 Flutter 打造令人惊艳的休闲游戏体验。我们将重点专注:

* **简化开发流程** : 我们将为你提供更多游戏开发资源 (比如模板、插件集成和深入指南)，帮助你加速工作流程并释放 Flutter 的游戏开发潜能。

* **触达更多用户** : 我们正在努力使 Web 端和其他平台上的 Flutter 游戏部署更加流畅，帮助你的作品吸引更多用户。

* **为未来发展夯实基础** : 虽然 2D 移动游戏支持是我们的工作重点，我们也正热衷于在研究 [Flutter GPU](https://github.com/flutter/flutter/wiki/Flutter-GPU) 的过程中不断积极探索 3D 能力。你可以关注我们的一些 [早期实验](https://github.com/bdero/flutter-scene-example/tree/gdc2024)，了解我们取得的阶段性成果。

## **向社区致以诚挚感谢**

我们想向社区致以诚挚的感谢与敬意。社区始终如一的坚定支持和非凡贡献是 Flutter 得以在游戏开发领域实现显著增长的关键。

我们对大家的不懈努力深感钦佩，值此机会也想对这些卓越的贡献深表感谢，包括但绝不限于:

* 感谢 [Luan Nico](https://github.com/luanpotter)、[Lukas Klingsbo](https://github.com/spydon)、[Erick Zanardo](https://github.com/erickzanardo)、[Renan Araujo](https://github.com/renancaraujo)、[Arron Washington](https://github.com/radicaled)、[Pasha Stetsenko](https://github.com/st-pasha)、[Jochum van der Ploeg](https://github.com/wolfenrain)、[Fernando Ultremare](https://github.com/feroult)、[DevKage](https://github.com/ufrshubham) ([Flame](https://flame-engine.org/))，你在 Flame 引擎及其相关项目上的辛苦付出对 Flutter 游戏开发而言极具变革意义。

* 感谢 [Rafael Barbosa](https://github.com/RafaelBarbosatec) ([Bonfire](https://bonfire-engine.github.io/#/))，你开发的功能强大、用途广泛的游戏引擎是制作 RPG 风格游戏的绝佳工具。

* 感谢 [Filip Hráček](https://github.com/filiph)，你制作的模板和教程为许多游戏开发新手提供了优秀的启蒙资源。

* 感谢 [Jeff Ward](https://github.com/fuzzybinary)，你将 Dart 嵌入到其他游戏引擎中的做法开拓了许多激动人心的可能性。

* 感谢 @VeryGoodVentures 的优秀团队成员: 大家打造的精美游戏和乐于分享最佳实践的精神为所有人树立了榜样。

* 感谢 [Abedalkareem Omreyh](https://github.com/Abedalkareem) ([游戏服务](https://pub.dev/packages/games_services))、[August](https://github.com/Gustl22)、[subhash279](https://github.com/subhash279) ([音频播放器](https://pub.dev/packages/audioplayers))、[Marco Bavagnoli](https://github.com/alnitak) ([Flutter SoLoud](https://pub.dev/packages/flutter_soloud)) 以及**无数其他**创建了基础软件包的开发者们，大家奠定的坚固基石使得利用 Flutter 开发复杂且引人入胜的游戏成为可能。

与这个群英荟萃的庞大社区相较而言，上述名单只是冰山一角。对于我们难以在此文章中逐一罗列名字的所有优秀开发者们: 请接受我们由衷的谢意，感谢大家的杰出贡献让 Flutter 游戏开发社区充满活力！

同时，我们还要向使用 Flutter 发布了游戏的开发者致以最衷心的感谢。大家的创意和激情鼓舞我们不断突破极限，促使 Flutter 成为面向全球开发者的更强大的工具。

Flutter 作为游戏开发平台的旅程才刚刚开始。我们将齐心协力与社区共同成长，倾听与重视你的反馈，努力打造你所需的工具。

我们热切期待看到你用 Flutter 构建的杰作！
