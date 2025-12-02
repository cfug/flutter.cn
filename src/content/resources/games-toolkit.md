---
title: 休闲游戏工具包
description: >-
  Learn about free & open source multiplatform 2D game development in Flutter.
showBreadcrumbs: false
---

Flutter 休闲游戏工具包整合了新的和现有的资源，
让你能够加速移动平台上的游戏开发。

:::recommend
查看最新的 [Flutter 3.22 游戏更新和资源](#updates)！
:::

本页面概述了你可以在哪里找到这些可用资源。

## 为什么选择 Flutter 来开发游戏？

Flutter 框架可以为六个目标平台创建高性能应用，
从桌面端到移动设备再到 Web。

凭借 Flutter 跨平台开发、高性能和开源许可的优势，
它是开发游戏的绝佳选择。

休闲游戏分为两类：回合制游戏和实时游戏。
你可能对这两种类型的游戏都很熟悉，
尽管你可能没有以这种方式去思考它们。

**回合制游戏** 涵盖面向大众市场的游戏，
具有简单的规则和玩法。
这包括棋盘游戏、纸牌游戏、益智游戏和策略游戏。
这些游戏响应简单的用户输入，
比如点击一张牌或输入一个数字或字母。
这些游戏非常适合用 Flutter 开发。

**实时游戏** 涵盖需要实时响应一系列动作的游戏。
这包括无尽奔跑游戏、赛车游戏等。
你可能想要创建一个具有高级功能的游戏，
如碰撞检测、摄像机视角、游戏循环等。
这些类型的游戏可以使用开源游戏引擎，
比如使用 Flutter 构建的 [Flame 游戏引擎][Flame game engine]。

## 工具包包含什么

休闲游戏工具包提供以下免费资源。

* 一个仓库，包含三个新的游戏模板，
  为构建休闲游戏提供起点。

  1. [基础游戏模板][basic-template]，
     包含以下基础功能：

     * 主菜单
     * 导航
     * 设置
     * 关卡选择
     * 玩家进度
     * 游戏会话管理
     * 声音
     * 主题

  1. [纸牌游戏模板][card-template]，
     包含基础模板中的所有内容，以及：

     * 拖放功能
     * 游戏状态管理
     * 多人游戏集成钩子

  1. [无尽奔跑模板][runner-template]，
     与开源游戏引擎 Flame 合作创建。它实现了：

     * FlameGame 基础模板
     * 玩家控制
     * 碰撞检测
     * 视差效果
     * 生成系统
     * 不同的视觉效果

  1. 一个基于无尽奔跑模板构建的示例游戏，
     名为 SuperDash。你可以在 iOS、Android
     或 [Web][web] 上玩这个游戏，[查看开源代码仓库][view the open source code repo]，
     或[阅读游戏是如何在 6 周内创建的][read how the game was created in 6 weeks]。

* 用于集成所需服务的开发者指南。
* [Flame Discord][game-discord] 频道的链接。
  如果你有 Discord 账号，可以使用这个[直接链接][discord-direct]。

包含的游戏模板和实用教程做出了某些选择以加速开发。
它们包含特定的 package，如 `provider`、`google_mobile_ads`、
`in_app_purchase`、`audioplayers`、`crashlytics` 和 `games_services`。
如果你更喜欢其他 package，可以更改代码来使用它们。

Flutter 团队理解变现可能是未来的考虑因素。
已添加广告和应用内购买的实用教程。

正如 [Games][] 页面所解释的，
当你将 Google 服务（如 [Cloud、Firebase][Cloud, Firebase]
和 [Ads][]）集成到游戏中时，你可以获得高达 900 美元的优惠。

:::important
你必须连接你的 Firebase 和 GCP 账号才能使用 Firebase 服务的积分，
并在注册时验证你的企业邮箱，以在正常的 300 美元积分之外
额外获得 100 美元。
对于广告优惠，请[检查你所在地区的资格][check your region's eligibility]。
:::

## 开始使用

准备好了吗？开始吧：

1. 如果你还没有安装，请先[安装 Flutter][install Flutter]。
1. [克隆游戏仓库][game-repo]。
1. 查看你想要创建的第一种游戏类型的 `README` 文件。

   * [基础游戏][basic-template-readme]
   * [纸牌游戏][card-template-readme]
   * [奔跑游戏][runner-template-readme]

1. [加入 Discord 上的 Flame 社区][game-discord]
   （如果你已有 Discord 账号，请使用[直接链接][discord-direct]）。
1. 查看 codelab 和实用教程。

   * {{recipeIcon}} 使用 Cloud Firestore 构建[多人游戏][multiplayer-recipe]。
   * {{codelab}} 使用 Flutter 构建[文字谜题][word puzzle]。—**新增**
   * {{codelab}} 使用 Flutter 和 Flame 构建 [2D 物理游戏][2D physics game]。—**新增**
   * {{codelab}} 使用 SoLoud 为你的 Flutter 游戏[添加声音和音乐][Add sound and music]。—**新增**
   * {{recipeIcon}} 通过[排行榜和成就][leaderboard-recipe]
     让你的游戏更具吸引力。
   * 通过 {{recipeIcon}}[游戏内广告][ads-recipe]
     和 {{codelab}}[应用内购买][iap-recipe]实现游戏变现。
   * 使用 {{recipeIcon}} [Firebase Authentication][firebase-auth]
     为你的游戏添加用户身份验证流程。
   * 使用 {{recipeIcon}} [Firebase Crashlytics][firebase-crashlytics]
     收集游戏中的崩溃和错误分析数据。

1. 根据需要在 AdMob、Firebase 和 Cloud 上设置账号。
1. 编写你的游戏！
1. 部署到 Google Play 和 Apple 应用商店。

[Add sound and music]: {{site.codelabs}}/codelabs/flutter-codelab-soloud
[2D physics game]: {{site.codelabs}}/codelabs/flutter-flame-forge2d
[word puzzle]: {{site.codelabs}}/codelabs/flutter-word-puzzle

## 示例游戏

在 Google I/O 2022 上，Flutter 团队和
Very Good Ventures 都创建了新游戏。

* VGV 使用 Flame 引擎创建了 [I/O Pinball 游戏][pinball-game]。
  要了解这个游戏，
  请查看 Medium 上的 [I/O Pinball Powered by Flutter and Firebase][]，
  并在浏览器中[玩这个游戏][pinball-game]。

* Flutter 团队创建了 [I/O Flip][flip-game]，一款虚拟 [CCG]。
  要了解更多关于 I/O Flip 的信息，
  请查看 Google 开发者博客上的
  [How It's Made: I/O FLIP adds a twist to a classic card game with generative AI][flip-blog]，
  并在浏览器中[玩这个游戏][flip-game]。

## 其他资源

当你准备好超越这些游戏模板时，
可以探索我们社区推荐的其他资源。

{% assign pkgIcon = '<span class="material-symbols" aria-label="Package" translate="no">package_2</span>' %}
{% assign apiIcon = '<span class="material-symbols" aria-label="API documentation" translate="no">api</span>' %}
{% assign docIcon = '<span class="material-symbols" aria-label="Guide" translate="no">quick_reference_all</span>' %}
{% assign codelab = '<span class="material-symbols" aria-label="Codelab" translate="no">science</span>' %}
{% assign engine = '<span class="material-symbols" aria-label="Game engine" translate="no">manufacturing</span>' %}
{% assign toolIcon = '<span class="material-symbols" aria-label="Desktop application" translate="no">handyman</span>' %}
{% assign recipeIcon = '<span class="material-symbols" aria-label="Cookbook recipe" translate="no">book_5</span>' %}
{% assign assetsIcon = '<span class="material-symbols" aria-label="Game assets" translate="no">photo_album</span>' %}

:::secondary
{{pkgIcon}} Flutter package<br>
{{apiIcon}} API 文档<br>
{{codelab}} Codelab<br>
{{recipeIcon}} 实用教程<br>
{{toolIcon}} 桌面应用<br>
{{assetsIcon}} 游戏资源<br>
{{docIcon}} 指南<br>
:::

<table class="table table-striped">
<tr>
<th>功能</th>
<th>资源</th>
</tr>

<tr>
<td>动画和精灵图</td>
<td>

{{recipeIcon}} [Special effects][]<br>
{{toolIcon}} [Spriter Pro][]<br>
{{pkgIcon}} [rive][]<br>
{{pkgIcon}} [spriteWidget][]

</td>
</tr>

<tr>
<td>应用评价</td>
<td>

{{pkgIcon}} [app_review][]

</td>
</tr>

<tr>
<td>音频</td>
<td>

{{pkgIcon}} [audioplayers][]<br>
{{pkgIcon}} [flutter_soloud][]—**NEW**<br>
{{codelab}}  [Add sound and music to your Flutter game with SoLoud][]—**NEW**

</td>
</tr>

<tr>
<td>身份验证</td>
<td>

{{codelab}} [User Authentication using Firebase][firebase-auth]

</td>
</tr>

<tr>
<td>云服务</td>
<td>

{{codelab}} [Add Firebase to your Flutter game][]

</td>
</tr>

<tr>
<td>调试</td>
<td>

{{docIcon}} [Firebase Crashlytics overview][firebase-crashlytics]<br>
{{pkgIcon}} [firebase_crashlytics][]

</td>
</tr>

<tr>
<td>驱动</td>
<td>

{{pkgIcon}} [win32_gamepad][]

</td>
</tr>

<tr>
<td>游戏资源<br>和资源工具</td>
<td>

{{assetsIcon}} [CraftPix][]<br>
{{assetsIcon}} [Game Developer Studio][]<br>
{{toolIcon}} [GIMP][]

</td>
</tr>

<tr>
<td>游戏引擎</td>
<td>

{{pkgIcon}} [Flame][flame-pkg]<br>
{{pkgIcon}} [Bonfire][bonfire-pkg]<br>
{{pkgIcon}} [forge2d][]

</td>
</tr>

<tr>
<td>游戏功能</td>
<td>

{{recipeIcon}} [Add achievements and leaderboards to your game][leaderboard-recipe]<br>
{{recipeIcon}} [Add multiplayer support to your game][multiplayer-recipe]

</td>
</tr>

<tr>
<td>游戏服务集成</td>
<td>

{{pkgIcon}} [games_services][game-svc-pkg]

</td>
</tr>

<tr>
<td>遗留代码</td>
<td>

{{codelab}} [Use the Foreign Function Interface in a Flutter plugin][]

</td>
</tr>

<tr>
<td>关卡编辑器</td>
<td>

{{toolIcon}} [Tiled][]

</td>
</tr>

<tr>
<td>变现</td>
<td>

{{recipeIcon}} [Add advertising to your Flutter game][ads-recipe]<br>
{{codelab}}  [Add AdMob ads to a Flutter app][]<br>
{{codelab}}  [Add in-app purchases to your Flutter app][iap-recipe]<br>
{{docIcon}} [Gaming UX and Revenue Optimizations for Apps][] (PDF)

</td>
</tr>

<tr>
<td>持久化</td>
<td>

{{pkgIcon}} [shared_preferences][]<br>
{{pkgIcon}} [sqflite][]<br>
{{pkgIcon}} [cbl_flutter][] (Couchbase Lite)<br>

</td>
</tr>

<tr>
<td>特效</td>
<td>

{{apiIcon}} [Paint API][]<br>
{{recipeIcon}} [Special effects][]

</td>
</tr>

<tr>
<td>用户体验</td>
<td>

{{codelab}} [Build next generation UIs in Flutter][]<br>
{{docIcon}} [Best practices for optimizing Flutter web loading speed][]—**NEW**

</td>
</tr>
</table>

[Ads]: https://ads.google.com/intl/en_us/home/flutter/#!/
[Air Hockey]: https://play.google.com/store/apps/details?id=com.ignacemaes.airhockey
[CCG]: https://en.wikipedia.org/wiki/Collectible_card_game
[Cloud, Firebase]: https://cloud.google.com/free
[Flame game engine]: https://flame-engine.org/
[Games]: {{site.main-url}}/games
[I/O Pinball Powered by Flutter and Firebase]: {{site.medium}}/flutter/di-o-pinball-powered-by-flutter-and-firebase-d22423f3f5d
[install Flutter]: /get-started
[Tomb Toad]: https://play.google.com/store/apps/details?id=com.crescentmoongames.tombtoad
[basic-template-readme]: {{site.repo.games}}/blob/main/templates/basic/README.md
[basic-template]: {{site.repo.games}}/tree/main/templates/basic
[card-template-readme]: {{site.repo.games}}/blob/main/templates/card/README.md
[card-template]: {{site.repo.games}}/tree/main/templates/card
[check your region's eligibility]: https://www.google.com/intl/en/ads/coupons/terms/flutter/
[discord-direct]: https://discord.com/login?redirect_to=%2Fchannels%2F509714518008528896%2F788415774938103829
[firebase_crashlytics]: {{site.pub}}/packages/firebase_crashlytics
[flame-pkg]: {{site.pub}}/packages/flame
[flip-blog]: {{site.google-blog}}/2023/05/how-its-made-io-flip-adds-twist-to.html
[flip-game]: https://flip.withgoogle.com/#/
[game-discord]: https://discord.gg/qUyQFVbV45
[game-repo]: {{site.repo.games}}
[pinball-game]: https://pinball.flutter.dev/#/
[runner-template-readme]: {{site.repo.games}}/blob/main/templates/endless_runner/README.md
[runner-template]: {{site.repo.games}}/tree/main/templates/endless_runner

[Add AdMob ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-ads-in-flutter
[Build next generation UIs in Flutter]: {{site.codelabs}}/codelabs/flutter-next-gen-uis
[firebase-crashlytics]: {{site.firebase}}/docs/crashlytics/get-started?platform=flutter
[ads-recipe]: /cookbook/plugins/google-mobile-ads
[iap-recipe]: {{site.codelabs}}/codelabs/flutter-in-app-purchases#0
[leaderboard-recipe]: /cookbook/games/achievements-leaderboard
[multiplayer-recipe]: /cookbook/games/firestore-multiplayer
[firebase-auth]: {{site.firebase}}/codelabs/firebase-auth-in-flutter-apps#0
[Use the Foreign Function Interface in a Flutter plugin]: {{site.codelabs}}/codelabs/flutter-ffigen
[bonfire-pkg]: {{site.pub}}/packages/bonfire
[CraftPix]: https://craftpix.net
[Add Firebase to your Flutter game]: {{site.firebase}}/docs/flutter/setup
[GIMP]: https://www.gimp.org
[Game Developer Studio]: https://www.gamedeveloperstudio.com
[Gaming UX and Revenue Optimizations for Apps]: {{site.main-url}}/go/games-revenue
[Paint API]: {{site.api}}/flutter/dart-ui/Paint-class.html
[Special effects]: /cookbook/effects
[Spriter Pro]: https://store.steampowered.com/app/332360/Spriter_Pro/
[app_review]: {{site.pub-pkg}}/app_review
[audioplayers]: {{site.pub-pkg}}/audioplayers
[cbl_flutter]: {{site.pub-pkg}}/cbl_flutter
[firebase_crashlytics]: {{site.pub-pkg}}/firebase_crashlytics
[forge2d]: {{site.pub-pkg}}/forge2d
[game-svc-pkg]: {{site.pub-pkg}}/games_services
[rive]: {{site.pub-pkg}}/rive
[shared_preferences]: {{site.pub-pkg}}/shared_preferences
[spriteWidget]: {{site.pub-pkg}}/spritewidget
[sqflite]: {{site.pub-pkg}}/sqflite
[win32_gamepad]: {{site.pub-pkg}}/win32_gamepad
[read how the game was created in 6 weeks]: {{site.flutter-blog}}/how-we-built-the-new-super-dash-demo-in-flutter-and-flame-in-just-six-weeks-9c7aa2a5ad31
[view the open source code repo]: {{site.github}}/flutter/super_dash
[web]: https://superdash.flutter.dev/
[Tiled]: https://www.mapeditor.org/
[flutter_soloud]: {{site.pub-pkg}}/flutter_soloud
[SoLoud codelab]: {{site.codelabs}}/codelabs/flutter-codelab-soloud

## Flutter 3.22 游戏工具包更新 {:#updates}

以下 codelab 和指南是为 Flutter 3.22 版本添加的：

**低延迟、高性能声音**
: 我们与 Flutter 社区（[@Marco Bavagnoli][]）合作，
  启用了 SoLoud 音频引擎。
  这个免费且可移植的引擎提供了许多游戏所必需的
  低延迟和高性能声音。
  为了帮助你入门，请查看新的 codelab，
  [使用 SoLoud 为你的 Flutter 游戏添加声音和音乐][Add sound and music to your Flutter game with SoLoud]，
  专门介绍如何为游戏添加声音和音乐。

**文字谜题游戏**
: 查看新的 codelab，
  [使用 Flutter 构建文字谜题][Build a word puzzle with Flutter]，
  专注于构建文字谜题游戏。
  这个类型非常适合探索 Flutter 的 UI 功能，
  这个 codelab 深入介绍了如何使用 Flutter 的后台处理
  来轻松生成大型纵横字谜风格的交错单词网格，
  同时不影响用户体验。

**Forge 2D 物理引擎**
: 新的 Forge2D codelab，
  [使用 Flutter 和 Flame 构建 2D 物理游戏][Build a 2D physics game with Flutter and Flame]，
  指导你在 Flutter 和 Flame 游戏中
  使用类似 Box2D 的 2D 物理模拟（称为 [Forge2D][]）
  来制作游戏机制。

**优化 Flutter Web 游戏的加载速度**
: 在快节奏的 Web 游戏世界中，
  加载缓慢的游戏是一个主要的阻碍因素。
  玩家期望即时满足，
  会很快放弃加载不及时的游戏。
  因此，我们发布了一份指南，
  [优化 Flutter Web 加载速度的最佳实践][Best practices for optimizing Flutter web loading speed]，
  由 [Cheng Lin][] 撰写，
  帮助你优化 Flutter Web 游戏和应用
  以实现闪电般的加载速度。

[@Marco Bavagnoli]: {{site.github}}/alnitak
[Add sound and music to your Flutter game with SoLoud]: {{site.codelabs}}/codelabs/flutter-codelab-soloud
[Best practices for optimizing Flutter web loading speed]: {{site.flutter-blog}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c
[Build a word puzzle with Flutter]: {{site.codelabs}}/codelabs/flutter-word-puzzle
[Build a 2D physics game with Flutter and Flame]: {{site.codelabs}}/codelabs/flutter-flame-forge2d
[Cheng Lin]: {{site.medium}}/@mhclin113_26002
[Forge2D]: {{site.pub-pkgs}}/forge2d

## 其他新资源

查看以下视频：

* [使用 Flutter 构建多平台游戏][gdc-talk]，
  在 [游戏开发者大会 (GDC)][Game Developer Conference (GDC)] 2024 上的演讲。
* [如何使用 Flutter 和 Flame 的 Forge2D 构建物理游戏][forge2d-video]，
  来自 Google I/O 2024。

[Game Developer Conference (GDC)]: https://gdconf.com/
[forge2d-video]: {{site.youtube-site}}/watch?v=nsnQJrYHHNQ
[gdc-talk]: {{site.youtube-site}}/watch?v=7mG_sW40tsw
