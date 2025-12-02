---
title: 为 Flutter 做贡献
shortTitle: Contribute
description: >-
  Learn about contributing to the Flutter project and its surrounding ecosystem.
showBreadcrumbs: false
---

![Dash 和她的朋友们为你的贡献感到兴奋](/assets/images/dash/dash-contribute.png){:height="160px" style="float: right;"}

如果你想为 Flutter 项目及其周边生态系统做出贡献，
我们很高兴得到你的帮助！

Flutter 是一个依靠社区贡献而蓬勃发展的开源项目。
无论你是修复 bug、提出新功能、改进文档，
还是在社区中帮助他人，
你的努力都是有价值的，我们非常感谢。

本页面提供了如何参与的概述（但不是全部）。
如果你在贡献时需要帮助或想要更多入门建议，
请考虑在 [Flutter 贡献者 Discord][Flutter contributors Discord] 上联系我们。

:::important
在开始为 Flutter 贡献之前，
请务必阅读并遵守 Flutter 的[行为准则][Code of conduct]。

此外，了解更多关于 Flutter 的[包容性文化][culture of inclusivity]和[核心价值观][core values]。
:::

[Flutter contributors Discord]: {{site.main-url}}/chat
[Code of conduct]: {{site.repo.flutter}}/blob/main/CODE_OF_CONDUCT.md
[culture of inclusivity]: https://flutter.dev/culture
[core values]: {{site.repo.flutter}}/blob/main/docs/about/Values.md

<div class="card-grid">
  <a class="card outlined-card" href="#develop-with-flutter">
    <div class="card-header">
      <span class="card-title">使用 Flutter</span>
    </div>
    <div class="card-content">
      <p>使用 Flutter 创建你自己的应用并提供宝贵的反馈。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#contribute-code">
    <div class="card-header">
      <span class="card-title">贡献代码</span>
    </div>
    <div class="card-content">
      <p>直接为 Flutter 底层代码做贡献。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#write-documentation">
    <div class="card-header">
      <span class="card-title">编写文档</span>
    </div>
    <div class="card-content">
      <p>通过编写文档来增强 Flutter 学习体验。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#triage-issues">
    <div class="card-header">
      <span class="card-title">分类 issue</span>
    </div>
    <div class="card-content">
      <p>确保 Flutter 贡献者能够产生最大的影响。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#strengthen-the-package-ecosystem">
    <div class="card-header">
      <span class="card-title">开发 package</span>
    </div>
    <div class="card-content">
      <p>加强 Dart 和 Flutter package 生态系统。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#support-the-community">
    <div class="card-header">
      <span class="card-title"><span>支持社区</span></span>
    </div>
    <div class="card-content">
      <p>帮助其他 Flutter 开发者从你的专业知识中受益。</p>
    </div>
  </a>
</div>

## 使用 Flutter 进行开发

即使只是使用 Flutter 并提供反馈也是一种有价值的贡献！

### 提供反馈

分享你的反馈和经验可以帮助 Flutter 团队
理解并优先考虑开发者的需求和痛点。

你可以通过多种途径提供有价值的反馈，包括：

- 为现有 issue 投票

  如果你遇到的问题已经被报告，
  请考虑为其投票，帮助 Flutter 团队了解其重要性。

  避免发表空洞的点赞、+1 或类似评论。
  但是，如果你有额外的信息，
  例如复现步骤或额外的版本信息，
  请考虑在新评论中提供这些详细信息。
- 报告新 bug

  如果你遇到了尚未被报告的 Flutter bug，
  请[提交新 issue][open a new issue] 并附上复现信息。
- 请求功能

  如果你认为 Flutter 应该添加或实现某个功能，
  但尚未有人建议，请[提交新 issue][open a new issue]，
  附上所有相关信息以及你的用例。
- 参与调查

  Flutter 团队会不定期进行开发者调查和研究。
  为了帮助了解痛点并改善 Flutter 开发者体验，
  请考虑尽可能详细地提供反馈和细节。

  要注册参加未来的 UX 研究，
  请访问 [flutter.dev/research-signup][uxr-signup]。
- 讨论提案

  对 Flutter 的重大更改通常通过[设计文档][design documents]进行讨论。
  请考虑阅读并对与你或你的应用相关的提案提供反馈。

  要查找当前的设计文档和提案，
  请查看 GitHub issue 数据库中[带有 `design doc` 标签的 issue][design-doc-issues]。
- 审查 pull request

  如果你熟悉 Flutter 的某个特定领域，
  或者某个特定问题的解决方案对你很重要，
  请考虑审查开放的 pull request，用你的应用测试它们，
  并提供任何相关反馈。

[open a new issue]: {{site.repo.flutter}}/issues/new
[uxr-signup]: {{site.main-url}}/research-signup
[design documents]: {{site.repo.flutter}}/blob/main/docs/contributing/Design-Documents.md
[design-doc-issues]: {{site.repo.flutter}}/issues?q=is%3Aopen+is%3Aissue+label%3A%22design+doc%22

### 尝试 beta 渠道

为了帮助确保 Flutter 的稳定性并改进即将推出的功能，
请在新版本到达 stable 渠道之前帮助测试。

请考虑在 `beta` 渠道上测试版本，
无论是用于一般开发还是测试与你的应用的兼容性。

如果你有任何反馈或遇到回归问题，
请务必[报告给][report-bugs] Flutter 团队。

要开始使用，
请立即[切换][switch-channels]到 [`beta` 渠道][beta-channel]，
并处理任何[必要的迁移][necessary migrations]。

[switch-channels]: /install/upgrade#change-channels
[beta-channel]: /install/upgrade#the-beta-channel
[report-bugs]: {{site.github}}/flutter/flutter/issues/new/choose
[necessary migrations]: /release/breaking-changes

## 贡献代码

直接改进 Flutter 的代码库和相关工具。

### Flutter 框架

在内置 widget 中发现了 bug，有新 widget 的想法，
喜欢添加测试，或者只是对 Flutter 的内部实现感兴趣？
请考虑为 Flutter 框架本身做贡献，
为所有人改进 Flutter 的核心。

要了解如何为 Flutter 框架做贡献，
请查看 Flutter [贡献指南][framework-contribute]。

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### Flutter 引擎

对实现构成 Flutter 基础的原语和平台集成感兴趣，
或者擅长图形编程？
请考虑为 Flutter 引擎做贡献，
让 Flutter 更加便携、高性能和强大。

要了解如何为 Flutter 引擎做贡献，
请查看 Flutter [贡献指南][framework-contribute]
以及如何[设置引擎开发环境][engine-setup]。

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[engine-setup]: {{site.repo.flutter}}/blob/main/engine/src/flutter/docs/contributing/Setting-up-the-Engine-development-environment.md

### Flutter package

为 Flutter 团队维护的第一方 package 做贡献。
第一方 package 为应用提供基本功能，
并封装各种平台特定的功能。

要了解如何为第一方 package 做贡献，
请查看 Flutter [贡献指南][framework-contribute]
以及 package 特定的[贡献指南][packages-contribute]。

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[packages-contribute]: {{site.repo.packages}}/blob/main/CONTRIBUTING.md

### DevTools

为 [Dart 和 Flutter DevTools][Dart and Flutter DevTools] 做贡献
是一个很好的起点，因为其设置成本相对较低。
增强和修复可以极大地影响 Flutter 开发者的开发体验，
也许还能帮助你开发自己的应用。

要开始使用，请查看
[DevTools `CONTRIBUTING.md` 指南][devtools-contribute]。

[Dart and Flutter DevTools]: /tools/devtools
[devtools-contribute]: {{site.repo.organization}}/devtools/blob/master/CONTRIBUTING.md

### 网站基础设施

修复 bug、改善无障碍访问或为 Dart 和 Flutter 网站添加功能。

如果你熟悉 Web 开发或网站生成，
为 Dart 和 Flutter 网站做贡献是改善
Flutter 开发者学习体验的好途径。

根据你的兴趣，你可能想要为以下内容做贡献：

- pub.dev 网站
  - **在线网站：** [`pub.dev`]({{site.pub}})
  - **仓库：** [`dart-lang/pub-dev`]({{site.github}}/dart-lang/pub-dev)
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/pub-dev/blob/master/CONTRIBUTING.md)
- Flutter 文档网站
  - **在线网站：** [`docs.flutter.dev`]({{site.url}})
  - **仓库：** [`flutter/website`]({{site.repo.this}})
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/flutter/website/blob/main/CONTRIBUTING.md)
- Dart 文档网站
  - **在线网站：** [`dart.dev`]({{site.dart-site}})
  - **仓库：** [`dart-lang/site-www`]({{site.github}}/dart-lang/site-www)
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/site-www/blob/main/CONTRIBUTING.md)
- DartPad
  - **在线网站：** [`dartpad.dev`]({{site.dartpad}})
  - **仓库：** [`dart-lang/dart-pad`]({{site.github}}/dart-lang/dart-pad)
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dart-pad/blob/main/CONTRIBUTING.md)
- `dartdoc` 工具
  - **在线网站：** [`api.flutter.dev`]({{site.api}})
  - **仓库：** [`dart-lang/dartdoc`]({{site.github}}/dart-lang/dartdoc)
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dartdoc/blob/main/CONTRIBUTING.md)

### Dart SDK

为 Dart 语言及其周边工具做贡献，
改进这门为客户端优化的语言，
它是 Flutter 出色开发者体验的基础。

Dart 的贡献工作流程略有不同，
所以如果你有兴趣，请务必查看其
[贡献][dart-contribute]和[构建][dart-build]指南。

[dart-contribute]: {{site.github}}/dart-lang/sdk/blob/main/CONTRIBUTING.md
[dart-build]: {{site.github}}/dart-lang/sdk/blob/main/docs/Building.md

### 代码示例

改进或添加演示 Flutter 功能的示例，
帮助喜欢通过示例学习的开发者。

你可以随时分享你自己的示例或模板，
或者你可以为 Flutter 维护的示例做贡献：

- 完整项目示例
  - **位置：** [`flutter/samples`]({{site.repo.samples}})
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.repo.samples}}/blob/main/CONTRIBUTING.md)
- API 文档示例
  - **位置：** [`flutter/flutter/packages/flutter`]({{site.repo.flutter}}/tree/main/packages/flutter)
  - **贡献指南：** [`README.md`]({{site.repo.flutter}}/tree/main/dev/snippets)
- 网站代码片段
  - **位置：** [`flutter/website/examples`]({{site.repo.this}}/tree/main/examples)
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.repo.this}}/blob/main/CONTRIBUTING.md)
- Flutter 仓库示例
  - **位置：** [`flutter/flutter/examples`]({{site.repo.flutter}}/tree/main/examples)
  - **贡献指南：** [`CONTRIBUTING.md`]({{site.repo.flutter}}/blob/main/CONTRIBUTING.md)

## 编写文档

为 Flutter 文档做贡献，无论以何种形式，
都是帮助 Flutter 最有影响力的方式之一。

### Flutter API 文档

API 文档被许多 Flutter 开发者大量依赖，
无论是在线还是在他们的代码编辑器中。

无论你是对编写新文档、更新现有文档、
添加相关代码片段，还是创建新的视觉效果（如图表）感兴趣，
你对 API 文档的贡献都会受到每位 Flutter 开发者的感谢。

要开始使用，请查看
[Flutter SDK 贡献指南][flutter-contribute]，
特别是其中关于 [API 文档][flutter-api-contribute]的部分。

[flutter-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[flutter-api-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md#api-documentation

### 文档网站

考虑为这个网站做贡献，
在开发者学习和探索 Flutter 时为他们提供指导。

要了解如何为 Flutter 文档网站做贡献，
请查看网站的[贡献文档][website-contribute]。

你也可以为 [Dart 网站][Dart website]做贡献，
增强这门为客户端优化的语言的文档，
它是 Flutter 的基础。
要了解如何贡献，
请查看 [`dart-lang/site-www` 贡献文档][dart-dev-contribute]。

[website-contribute]: {{site.repo.this}}/blob/main/CONTRIBUTING.md
[Dart website]: {{site.dart-site}}
[dart-dev-contribute]: {{site.github}}/dart-lang/site-www/tree/main?tab=readme-ov-file#getting-started

## 分类 issue

通过分类传入的 bug 报告和功能请求来帮助 Flutter 团队。

在 [Flutter 的 issue 数据库][flutter-issues]中有很多帮助的方式，
包括但不限于：

- 确定 issue 有效性
- 确保可操作性
- 记录受影响的版本
- 添加复现步骤
- 识别重复或已解决的 issue
- 解决或重定向支持查询

要开始帮助处理 issue，
请阅读[在 issue 数据库中提供帮助][issue-contribute]，
并了解 Flutter 的
[issue 分类][issue triage]和 [issue 管理][issue hygiene]方法。

[flutter-issues]: {{site.repo.flutter}}/issues
[issue-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md#helping-out-in-the-issue-database
[issue triage]: {{site.repo.flutter}}/blob/main/docs/triage/README.md
[issue hygiene]: {{site.repo.flutter}}/tree/main/docs/contributing/issue_hygiene

## 加强 package 生态系统

帮助增长和支持 [pub.dev](https://pub.dev/) 上可用的
Dart 和 Flutter package 集合。

### 为你使用的 package 做贡献

为了回馈你依赖的 package 并可能帮助你自己的应用，
找到你依赖的 package 并为它们做贡献。

要为 package 做贡献，
请导航到 [pub.dev 网站][pub.dev site]上的页面，
并找到页面侧边导航中链接的仓库。

在贡献之前，请务必
遵循每个 package 的贡献指南，
与维护者讨论你的贡献，
并牢记 Flutter 的[行为准则][Code of conduct]。

[pub.dev site]: {{site.pub}}
[Code of conduct]: {{site.repo.flutter}}/blob/main/CODE_OF_CONDUCT.md

### 从你的应用开源可复用功能

如果你在应用中构建了一个很酷的通用 widget 或工具，
请考虑将其提取为 package 并发布到 pub.dev。

要开始，请了解
[创建 Dart package][Creating Dart packages] 和[开发 Flutter package][Developing Flutter packages]。
然后，当你准备好将 package 发布到 [pub.dev 网站][pub.dev site]时，
请遵循[发布 package][Publishing packages] 的指南和最佳实践。

[Creating Dart packages]: {{site.dart-site}}/tools/pub/create-packages
[Developing Flutter packages]: /packages-and-plugins/developing-packages
[pub.dev site]: {{site.pub}}
[Publishing packages]: {{site.dart-site}}/tools/pub/publishing

### 为流行的 SDK 添加 Dart 或 Flutter 支持

创建或为封装原生 SDK 或 Web API 的 package 做贡献。

在创建新 package 之前，
首先尝试在 [pub.dev 网站][pub.dev site]上
找到你可以使用或贡献的现有封装。

根据 SDK 和平台，
你可能需要[编写平台特定代码][Write platform-specific code]、
使用 [JS 互操作][JS interop]、使用 [`package:http`][] 封装 REST API，
或在 Dart 中重新实现所需的功能。

如果你计划创建新 package，请了解
[创建 Dart package][Creating Dart packages] 和[开发 Flutter package][Developing Flutter packages]。
然后，当你准备好将 package 发布到 [pub.dev 网站][pub.dev site]时，
请遵循[发布 package][Publishing packages] 的指南和最佳实践。

[pub.dev site]: {{site.pub}}
[Write platform-specific code]: /platform-integration/platform-channels
[JS interop]: {{site.dart-site}}/interop/js-interop
[`package:http`]: {{site.pub-pkg}}/http

## 支持社区

帮助其他开发者学习 Flutter，
并在他们构建自己的应用时取得成功。

### 帮助其他开发者

分享你的 Flutter 知识和专业技能，
帮助你的 Flutter 开发者同伴取得成功。

这可以采取多种形式，从在你的公司开设 Flutter 帮助频道，
到在公共论坛上回答问题。

Flutter 开发者通常寻求帮助的一些常见地点包括：

- [Stack Overflow](https://stackoverflow.com/questions/tagged/flutter)
- [Flutter Dev Discord](https://discord.com/invite/rflutterdev)
- [Dart Community Discord](https://discord.com/invite/Qt6DgfAWWx)
- [Reddit 上的 r/FlutterDev](https://www.reddit.com/r/FlutterDev)
- [GitHub issues]({{site.repo.flutter}}/issues)
- [Flutter 论坛](https://forum.itsallwidgets.com/)

### 举办活动

与其他 Flutter 爱好者建立联系，
组织本地、全国甚至虚拟活动。
活动可以是任何形式，从学习小组和简单的聚会，
到工作坊和黑客马拉松。

为了获得灵感和支持，
请查看现有的 [Flutter 活动][Flutter events]，
了解更多关于 [Flutter 社区][Flutter community]的信息，
并探索 [Flutter Meetup 网络][Flutter Meetup Network]。

[Flutter events]: {{site.main-url}}/events
[Flutter community]: {{site.main-url}}/community
[Flutter Meetup Network]: https://www.meetup.com/pro/flutter/

### 发布关于 Flutter 的内容

与更广泛的 Flutter 社区分享你的见解和项目。

关于分享 Flutter 和与开发者社区建立联系有无数的选择。
一些常见的渠道包括：

- 博客文章
- 视频教程
- 短文章
- 论坛帖子
- GitHub 讨论
- 链接聚合板块

发布或分享你热衷的任何内容，
但如果你不确定要发布什么，
请考虑发布开发者经常询问的主题。

如果你发布的平台支持标记帖子，
请考虑添加 `#Flutter` 和 `#FlutterDev` 标签，
以帮助其他开发者找到你的内容。
