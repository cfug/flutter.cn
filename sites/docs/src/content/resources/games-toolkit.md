---
# title: Casual Games Toolkit
title: 休闲游戏工具包
# description: >-
#   Learn about free & open source multiplatform 2D game development in Flutter.
description: >-
  了解在 Flutter 中进行免费开源多平台 2D 游戏开发。
showBreadcrumbs: false
ai-translated: true
---

The Flutter Casual Games Toolkit pulls together new and existing resources
so you can accelerate development of games on mobile platforms.

Flutter 休闲游戏工具包整合新旧资源，帮助你在移动平台上加速游戏开发。

This page outlines where you can find these available resources.

本页概述这些可用资源的位置。

## Why Flutter for games?

## 为何用 Flutter 做游戏？

The Flutter framework can create performant apps for six target platforms
from the desktop to mobile devices to the web.

Flutter 框架可为从桌面、移动设备到 Web 的六个目标平台创建高性能应用。

With Flutter's benefits of cross-platform development, performance, and
open source licensing, it makes a great choice for games.

凭借跨平台开发、性能和开源许可等优势，Flutter 非常适合做游戏。

Casual games fall into two categories: turn-based games
and real-time games.
You might be familiar with both types of games,
though perhaps you didn't think about them in quite this way.

休闲游戏分为两类：回合制游戏和实时游戏。你可能熟悉这两类游戏，只是未必这样划分。

_Turn-based games_ cover games meant for a mass market with
simple rules and gameplay.
This includes board games, card games, puzzles, and strategy games.
These games respond to simple user input,
like tapping on a card or entering a number or letter.
These games are well suited for Flutter.

**回合制游戏** 面向大众市场，规则与玩法简单，包括棋类、卡牌、益智和策略游戏。
它们响应轻触卡牌或输入数字、字母等简单输入，很适合用 Flutter。

_Real-time games_ cover games with a series of actions that
require real-time responses.
These include endless runner games, racing games, and so on.
You might want to create a game with advanced features like collision detection,
camera views, game loops, and the like.
These types of games could use an open source game engine like the
[Flame game engine][] built using Flutter.

**实时游戏** 需要实时响应一系列操作，包括无尽跑酷、赛车等。
你可能想实现碰撞检测、镜头、游戏循环等高级特性，
这类游戏可使用基于 Flutter 构建的开源引擎，如 [Flame game engine][]。

## What's included in the toolkit

## 工具包包含什么

The Casual Games Toolkit provides the following free resources.

休闲游戏工具包提供以下免费资源。

* A repository that includes three game templates that provide
  a starting point for building a casual game.

  一个仓库，包含三个游戏模板，作为构建休闲游戏的起点。

  1. A [base game template][basic-template]
     that includes the basics for:

     [基础游戏模板][basic-template]，包含：

     * Main menu

       主菜单

     * Navigation

       导航

     * Settings

       设置

     * Level selection

       关卡选择

     * Player progress

       玩家进度

     * Play session management

       游戏会话管理

     * Sound

       音效

     * Themes

       主题

  1. A [card game template][card-template]
     that includes everything in the base template plus:

     [卡牌游戏模板][card-template]，包含基础模板全部内容，另加：

     * Drag and drop

       拖放

     * Game state management

       游戏状态管理

     * Multiplayer integration hooks

       多人集成钩子

  1. An [endless runner template][runner-template] created in partnership
     with the open source game engine, Flame. It implements:

     与开源引擎 Flame 合作创建的 [无尽跑酷模板][runner-template]，实现：

     * A FlameGame base template

       FlameGame 基础模板

     * Player steering

       玩家操控

     * Collision detection

       碰撞检测

     * Parallax effects

       视差效果

     * Spawning

       生成

     * Different visual effects

       多种视觉效果

  1. A sample game built on top of the endless runner template,
     called SuperDash. You can play the game on iOS, Android,
     or [web][], [view the open source code repo][], or
     [read how the game was created in 6 weeks][].

     基于无尽跑酷模板的示例游戏 SuperDash。
     可在 iOS、Android 或 [web][] 上游玩，[查看开源代码仓库][view the open source code repo]，
     或 [阅读本游戏如何在 6 周内创建][read how the game was created in 6 weeks]。

* Developer guides for integrating needed services.

  集成所需服务的开发者指南。

* A link to a [Flame Discord][game-discord] channel.
  If you have a Discord account, use this [direct link][discord-direct].

  [Flame Discord][game-discord] 频道链接。
  若有 Discord 账号，可使用此 [直接链接][discord-direct]。

The included game templates and cookbook recipes make certain choices
to accelerate development.
They include specific packages, like `provider`, `google_mobile_ads`,
`in_app_purchase`, `audioplayers`, `crashlytics`, and `games_services`.
If you prefer other packages, you can change the code to use them.

包含的游戏模板和 cookbook 实用教程为加速开发做了特定选择，
使用 `provider`、`google_mobile_ads`、`in_app_purchase`、`audioplayers`、`crashlytics`、`games_services` 等 package。
若你偏好其他 package，可修改代码替换。

The Flutter team understands that monetization might be a future consideration.
Cookbook recipes for advertising and in-app purchases have been added.

Flutter 团队理解变现可能是未来考量，已添加广告与应用内购买的 cookbook 实用教程。

As explained on the [Games][] page,
you can leverage up to $900 in offers when you integrate Google services,
such as [Cloud, Firebase][], and [Ads][], into your game.

如 [Games][] 页所述，将 [Cloud, Firebase][] 和 [Ads][] 等 Google 服务集成到游戏中，
最高可利用约 $900 优惠。

:::important
You must connect your Firebase and GCP accounts to use credits for
Firebase services and verify your business email during sign up to earn
an additional $100 on top of the normal $300 credit.
For the Ads offer, [check your region's eligibility][].

必须关联 Firebase 与 GCP 账号才能使用 Firebase 服务抵扣；
注册时验证企业邮箱可在常规 $300 抵扣外再获 $100。
Ads 优惠请 [查看你所在地区的资格][check your region's eligibility]。
:::

## Get started

## 入门

Are you ready? To get started:

准备好了吗？按以下步骤开始：

1. If you haven't done so, [install Flutter][].

   若尚未安装，请 [安装 Flutter][install Flutter]。

1. [Clone the games repo][game-repo].

   [克隆游戏仓库][game-repo]。

1. Review the `README` file for the first type of game you want to create.

   查看你想创建的第一类游戏对应的 `README` 文件。

   * [basic game][basic-template-readme]

     [基础游戏][basic-template-readme]

   * [card game][card-template-readme]

     [卡牌游戏][card-template-readme]

   * [runner game][runner-template-readme]

     [跑酷游戏][runner-template-readme]

1. [Join the Flame community on Discord][game-discord]
   (use the [direct link][discord-direct] if you already
   have a Discord account).

   [加入 Flame Discord 社区][game-discord]（若已有 Discord 账号可使用 [直接链接][discord-direct]）。

1. Review the codelabs and cookbook recipes.

   查阅 codelab 与 cookbook 实用教程。

   * Build a [multiplayer game][multiplayer-recipe] with Cloud Firestore.

     使用 Cloud Firestore 构建 [多人游戏][multiplayer-recipe]。

   * Build a [word puzzle][] with Flutter.

     用 Flutter 构建 [填字游戏][word puzzle]。

   * Make your games more engaging
     with [leaderboards and achievements][leaderboard-recipe].

     通过 [排行榜与成就][leaderboard-recipe] 提升游戏吸引力。

   * Monetize your games with [in-game ads][ads-recipe]
     and [in-app purchases][iap-recipe].

     用 [游戏内广告][ads-recipe] 和 [应用内购买][iap-recipe] 变现。

   * Add user authentication flow to your game with
     [Firebase Authentication][firebase-auth].

     用 [Firebase Authentication][firebase-auth] 为游戏添加用户认证流程。

   * Collect analytics about crashes and errors inside your game
     with [Firebase Crashlytics][firebase-crashlytics].

     用 [Firebase Crashlytics][firebase-crashlytics] 收集游戏内崩溃与错误分析。

1. Set up accounts on AdMob, Firebase, and Cloud, as needed.

   按需设置 AdMob、Firebase 和 Cloud 账号。

1. Write your game!

   编写你的游戏！

1. Deploy to both the Google Play and Apple stores.

   部署到 Google Play 和 Apple 商店。

[word puzzle]: {{site.codelabs}}/codelabs/flutter-word-puzzle

## Example games

## 示例游戏

For Google I/O 2022, both the Flutter team
and Very Good Ventures created new games.

在 Google I/O 2022，Flutter 团队与 Very Good Ventures 都发布了新游戏。

* VGV created the [I/O Pinball game][pinball-game] using the Flame engine.
  To learn about this game,
  check out [I/O Pinball Powered by Flutter and Firebase][] on Medium
  and [play the game][pinball-game] in your browser.

  VGV 使用 Flame 引擎创建 [I/O Pinball game][pinball-game]。
  在 Medium 阅读 [I/O Pinball Powered by Flutter and Firebase][]，
  并在浏览器 [试玩][pinball-game]。

* The Flutter team created [I/O Flip][flip-game], a virtual [CCG].
  To learn more about I/O Flip,
  check out [How It's Made: I/O FLIP adds a twist to a classic card game with generative AI][flip-blog]
  on the Google Developers blog and [play the game][flip-game] in your browser.

  Flutter 团队创建虚拟 [CCG] [I/O Flip][flip-game]。
  在 Google Developers 博客阅读 
  [How It's Made: I/O FLIP adds a twist to a classic card game with generative AI][flip-blog]，
  并在浏览器 [试玩][flip-game]。

## Other resources

## 其他资源

Once you feel ready to go beyond these games templates,
investigate other resources that our community recommended.

当你准备超越这些游戏模板时，可探索社区推荐的其他资源。

<table class="table table-striped">
<tr>
<th><t>Feature</t><t>功能</t></th>
<th><t>Resources</t><t>资源</t></th>
</tr>

<tr>
<td>Animation and sprites</td>
<td>

<Icon id="book_5" title="Cookbook recipe"></Icon> [Special effects][]<br>
<Icon id="handyman" title="Desktop tool"></Icon> [Spriter Pro][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [rive][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [spritewidget][]

</td>
</tr>

<tr>
<td>动画与精灵图</td>
<td>

<Icon id="book_5" title="Cookbook recipe"></Icon> [Special effects][]<br>
<Icon id="handyman" title="Desktop tool"></Icon> [Spriter Pro][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [rive][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [spritewidget][]

</td>
</tr>

<tr>
<td>App review</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [app_review][]

</td>
</tr>

<tr>
<td>应用评价</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [app_review][]

</td>
</tr>

<tr>
<td>Audio</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [audioplayers][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [flutter_soloud][]<br>

</td>
</tr>

<tr>
<td>音频</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [audioplayers][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [flutter_soloud][]<br>

</td>
</tr>

<tr>
<td>Authentication</td>
<td>

<Icon id="science" title="Codelab"></Icon> [User Authentication using Firebase][firebase-auth]

</td>
</tr>

<tr>
<td>认证</td>
<td>

<Icon id="science" title="Codelab"></Icon> [User Authentication using Firebase][firebase-auth]

</td>
</tr>

<tr>
<td>Cloud services</td>
<td>

<Icon id="science" title="Codelab"></Icon> [Add Firebase to your Flutter game][]

</td>
</tr>

<tr>
<td>云服务</td>
<td>

<Icon id="science" title="Codelab"></Icon> [Add Firebase to your Flutter game][]

</td>
</tr>

<tr>
<td>Debugging</td>
<td>

<Icon id="quick_reference_all" title="Guide"></Icon> [Firebase Crashlytics overview][firebase-crashlytics]<br>
<Icon id="package_2" title="Flutter package"></Icon> [firebase_crashlytics][]

</td>
</tr>

<tr>
<td>调试</td>
<td>

<Icon id="quick_reference_all" title="Guide"></Icon> [Firebase Crashlytics overview][firebase-crashlytics]<br>
<Icon id="package_2" title="Flutter package"></Icon> [firebase_crashlytics][]

</td>
</tr>

<tr>
<td>Drivers</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [win32_gamepad][]

</td>
</tr>

<tr>
<td>驱动</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [win32_gamepad][]

</td>
</tr>

<tr>
<td>Game assets<br>and asset tools</td>
<td>

<Icon id="photo_album" title="Game assets"></Icon> [CraftPix][]<br>
<Icon id="photo_album" title="Game assets"></Icon> [Game Developer Studio][]<br>
<Icon id="handyman" title="Desktop tool"></Icon> [GIMP][]

</td>
</tr>

<tr>
<td>游戏资源<br>与资源工具</td>
<td>

<Icon id="photo_album" title="Game assets"></Icon> [CraftPix][]<br>
<Icon id="photo_album" title="Game assets"></Icon> [Game Developer Studio][]<br>
<Icon id="handyman" title="Desktop tool"></Icon> [GIMP][]

</td>
</tr>

<tr>
<td>Game engines</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [Flame][flame-pkg]<br>
<Icon id="package_2" title="Flutter package"></Icon> [Bonfire][bonfire-pkg]<br>
<Icon id="package_2" title="Flutter package"></Icon> [forge2d][]

</td>
</tr>

<tr>
<td>游戏引擎</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [Flame][flame-pkg]<br>
<Icon id="package_2" title="Flutter package"></Icon> [Bonfire][bonfire-pkg]<br>
<Icon id="package_2" title="Flutter package"></Icon> [forge2d][]

</td>
</tr>

<tr>
<td>Game features</td>
<td>

<Icon id="book_5" title="Cookbook recipe"></Icon> [Add achievements and leaderboards to your game][leaderboard-recipe]<br>
<Icon id="book_5" title="Cookbook recipe"></Icon> [Add multiplayer support to your game][multiplayer-recipe]

</td>
</tr>

<tr>
<td>游戏功能</td>
<td>

<Icon id="book_5" title="Cookbook recipe"></Icon> [Add achievements and leaderboards to your game][leaderboard-recipe]<br>
<Icon id="book_5" title="Cookbook recipe"></Icon> [Add multiplayer support to your game][multiplayer-recipe]

</td>
</tr>

<tr>
<td>Game services integration</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [games_services][game-svc-pkg]

</td>
</tr>

<tr>
<td>游戏服务集成</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [games_services][game-svc-pkg]

</td>
</tr>

<tr>
<td>Level editor</td>
<td>

<Icon id="handyman" title="Desktop tool"></Icon> [Tiled][]

</td>
</tr>

<tr>
<td>关卡编辑器</td>
<td>

<Icon id="handyman" title="Desktop tool"></Icon> [Tiled][]

</td>
</tr>

<tr>
<td>Monetization</td>
<td>

<Icon id="book_5" title="Cookbook recipe"></Icon> [Add advertising to your Flutter game][ads-recipe]<br>
<Icon id="science" title="Codelab"></Icon> [Add AdMob ads to a Flutter app][]<br>
<Icon id="science" title="Codelab"></Icon> [Add in-app purchases to your Flutter app][iap-recipe]<br>
<Icon id="science" title="Codelab"></Icon> [Gaming UX and Revenue Optimizations for Apps][] (PDF)<br>

</td>
</tr>

<tr>
<td>变现</td>
<td>

<Icon id="book_5" title="Cookbook recipe"></Icon> [Add advertising to your Flutter game][ads-recipe]<br>
<Icon id="science" title="Codelab"></Icon> [Add AdMob ads to a Flutter app][]<br>
<Icon id="science" title="Codelab"></Icon> [Add in-app purchases to your Flutter app][iap-recipe]<br>
<Icon id="science" title="Codelab"></Icon> [Gaming UX and Revenue Optimizations for Apps][] (PDF)<br>

</td>
</tr>

<tr>
<td>Persistence</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [shared_preferences][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [sqflite][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [cbl_flutter][] (Couchbase Lite)<br>

</td>
</tr>

<tr>
<td>持久化</td>
<td>

<Icon id="package_2" title="Flutter package"></Icon> [shared_preferences][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [sqflite][]<br>
<Icon id="package_2" title="Flutter package"></Icon> [cbl_flutter][] (Couchbase Lite)<br>

</td>
</tr>

<tr>
<td>Special effects</td>
<td>

<Icon id="api" title="API documentation"></Icon> [Paint API][]<br>
<Icon id="book_5" title="Cookbook recipe"></Icon> [Special effects][]

</td>
</tr>

<tr>
<td>特效</td>
<td>

<Icon id="api" title="API documentation"></Icon> [Paint API][]<br>
<Icon id="book_5" title="Cookbook recipe"></Icon> [Special effects][]

</td>
</tr>

<tr>
<td>User Experience</td>
<td>

<Icon id="quick_reference_all" title="Guide"></Icon> [Best practices for optimizing Flutter web loading speed][]

</td>
</tr>

<tr>
<td>用户体验</td>
<td>

<Icon id="quick_reference_all" title="Guide"></Icon> [Best practices for optimizing Flutter web loading speed][]

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
[install Flutter]: /install
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
[firebase-crashlytics]: {{site.firebase}}/docs/crashlytics/get-started?platform=flutter
[ads-recipe]: /cookbook/plugins/google-mobile-ads
[iap-recipe]: {{site.codelabs}}/codelabs/flutter-in-app-purchases#0
[leaderboard-recipe]: /cookbook/games/achievements-leaderboard
[multiplayer-recipe]: /cookbook/games/firestore-multiplayer
[firebase-auth]: {{site.firebase}}/codelabs/firebase-auth-in-flutter-apps#0
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
[spritewidget]: {{site.pub-pkg}}/spritewidget
[sqflite]: {{site.pub-pkg}}/sqflite
[win32_gamepad]: {{site.pub-pkg}}/win32_gamepad
[read how the game was created in 6 weeks]: {{site.flutter-blog}}/how-we-built-the-new-super-dash-demo-in-flutter-and-flame-in-just-six-weeks-9c7aa2a5ad31
[view the open source code repo]: {{site.github}}/flutter/super_dash
[web]: https://superdash.flutter.dev/
[Tiled]: https://www.mapeditor.org/
[flutter_soloud]: {{site.pub-pkg}}/flutter_soloud
[Best practices for optimizing Flutter web loading speed]: {{site.flutter-blog}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c

## Other resources

## 其他资源

Check out the following videos:

请观看以下视频：

* [Building multiplatform games with Flutter][gdc-talk], a talk
  given at the [Game Developer Conference (GDC)][] 2024.

  [使用 Flutter 构建多平台游戏][gdc-talk]，[Game Developer Conference (GDC)][] 2024 演讲。

* [How to build a physics-based game with Flutter and Flame's Forge2D][forge2d-video],
  from Google I/O 2024.

  [如何使用 Flutter 与 Flame 的 Forge2D 构建物理游戏][forge2d-video]，来自 Google I/O 2024。

[Game Developer Conference (GDC)]: https://gdconf.com/
[forge2d-video]: {{site.youtube-site}}/watch?v=nsnQJrYHHNQ
[gdc-talk]: {{site.youtube-site}}/watch?v=7mG_sW40tsw
