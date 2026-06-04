---
# title: Contribute to Flutter
title: 为 Flutter 贡献
# shortTitle: Contribute
shortTitle: 贡献
# description: >-
#   Learn about contributing to the Flutter project and its surrounding ecosystem.
description: >-
  了解如何为 Flutter 项目及其周边生态贡献。
showBreadcrumbs: false
ai-translated: true
---

![Dash and her friends excited for your contribution](/assets/images/dash/dash-contribute.png){:height="160px" style="float: right;"}

If you would like to contribute to the
Flutter project and its surrounding ecosystem,
we're happy to have your help!

若你希望为 Flutter 项目及其周边生态贡献，我们欢迎你的帮助！

Flutter is an open-source project that thrives on community contributions.
No matter whether you're fixing a bug, proposing a new feature,
improving documentation, or helping others in the community,
your efforts are valuable and appreciated.

Flutter 是依赖社区贡献的开源项目。无论你是在修复 bug、提出新功能、改进文档，还是帮助社区中的其他人，你的努力都很有价值，我们深表感谢。

This page provides a non-exhaustive overview of how you can get involved.
If you need help contributing or would like more suggestions on getting started,
consider reaching out on the [Flutter contributors Discord][].

本页概览参与方式（非穷尽列表）。若你需要贡献方面的帮助或更多入门建议，可在 [Flutter 贡献者 Discord][Flutter contributors Discord] 上联系。

:::important
Before beginning your journey of contributing to Flutter,
please make sure to read and follow Flutter's [Code of conduct][].

Also, learn more about Flutter's [culture of inclusivity][] and [core values][].
:::

:::important
在开始为 Flutter 贡献之前，
请务必阅读并遵守 Flutter 的 [行为准则][Code of conduct]。

同时，了解更多关于 Flutter [包容文化][culture of inclusivity] 与 [核心价值观][core values] 的信息。
:::

[Flutter contributors Discord]: {{site.main-url}}/chat
[Code of conduct]: {{site.repo.flutter}}/blob/main/CODE_OF_CONDUCT.md
[culture of inclusivity]: https://flutter.dev/culture
[core values]: {{site.repo.flutter}}/blob/main/docs/about/Values.md

<div class="card-grid">
  <a class="card outlined-card" href="#develop-with-flutter">
    <div class="card-header">
      <span class="card-title">Use Flutter</span>
    </div>
    <div class="card-content">
      <p>Create your own apps with Flutter and provide valuable feedback.</p>
    </div>
  </a>
  <a class="card outlined-card" href="#contribute-code">
    <div class="card-header">
      <span class="card-title">Contribute code</span>
    </div>
    <div class="card-content">
      <p>Contribute directly to the code underlying Flutter.</p>
    </div>
  </a>
  <a class="card outlined-card" href="#write-documentation">
    <div class="card-header">
      <span class="card-title">Write docs</span>
    </div>
    <div class="card-content">
      <p>Enhance the Flutter learning experience by writing documentation.</p>
    </div>
  </a>
  <a class="card outlined-card" href="#triage-issues">
    <div class="card-header">
      <span class="card-title">Triage issues</span>
    </div>
    <div class="card-content">
      <p>Ensure Flutter contributors can make the most impact.</p>
    </div>
  </a>
  <a class="card outlined-card" href="#strengthen-the-package-ecosystem">
    <div class="card-header">
      <span class="card-title">Develop packages</span>
    </div>
    <div class="card-content">
      <p>Strengthen the Dart and Flutter package ecosystem.</p>
    </div>
  </a>
  <a class="card outlined-card" href="#support-the-community">
    <div class="card-header">
      <span class="card-title"><span>Support the community</span></span>
    </div>
    <div class="card-content">
      <p>Help other Flutter developers benefit from your expertise.</p>
    </div>
  </a>
</div>

## Develop with Flutter

## 使用 Flutter 开发

Even just using Flutter and providing feedback is a valuable contribution!

即便只是使用 Flutter 并提供反馈，也是宝贵的贡献！

### Provide feedback

### 提供反馈

Sharing your feedback and experiences helps the Flutter team
understand and prioritize developer needs and pain points.

分享反馈与经验有助于 Flutter 团队理解并优先处理开发者需求与痛点。

You can provide valuable feedback through many avenues, including:

你可以通过多种途径提供有价值的反馈，包括：

- Upvoting existing issues

  If you're experiencing an issue that has already been reported,
  consider upvoting it to help the Flutter team understand its importance.

  Avoid otherwise empty thumbs up, +1, or similar comments.
  However, if you have additional information,
  such as reproduction steps or additional version information,
  do consider providing those details in a new comment.

  为现有 issue 点赞

  若你遇到的问题已被报告，可考虑点赞以帮助 Flutter 团队了解其重要性。

  避免仅发表空的点赞、+1 或类似评论。
  不过，若有额外信息（如复现步骤或版本信息），请在新评论中提供。

- Reporting new bugs

  If you experience a bug with Flutter that hasn't yet been reported,
  do [open a new issue][] with reproduction information.

  报告新 bug

  若遇到尚未报告的 Flutter bug，请附带复现信息 [新建 issue][open a new issue]。

- Requesting features

  If there's a feature you think Flutter should add or implement
  but hasn't yet been suggested, do [open a new issue][] with
  all relevant information as well as your use case.

  请求功能

  若有你认为 Flutter 应添加但尚未被提出的功能，请附带所有相关信息与你的用例 [新建 issue][open a new issue]。

- Partaking in surveys

  Occasionally, the Flutter team will run developer surveys and studies.
  To help understand pain points and improve the Flutter developer experience,
  consider responding with as much feedback and details as possible.

  To sign up for future UX research studies,
  visit [flutter.dev/research-signup][uxr-signup].

  参与调查

  Flutter 团队偶尔会开展开发者调查与研究。
  为帮助了解痛点并改进开发者体验，请尽量提供详尽的反馈与细节。

  若要报名未来的 UX 研究，请访问 [flutter.dev/research-signup][uxr-signup]。

- Discussing proposals

  Major changes to Flutter are often discussed through [design documents][].
  Consider reading and providing feedback on proposals that are
  relevant to you or your apps.

  To find current design docs and proposals,
  check out [issues with the `design doc` label][design-doc-issues] on
  the GitHub issue database.

  讨论提案

  Flutter 的重大变更常通过 [设计文档][design documents] 讨论。
  请阅读并就与你或你的应用相关的提案提供反馈。

  要查找当前设计文档与提案，请在 GitHub issue 数据库中查看 [带 `design doc` 标签的 issue][design-doc-issues]。

- Reviewing pull requests

  If you're familiar with a particular area of Flutter
  or a solution to a particular issue is important to you,
  consider reviewing open pull requests, trying them with your app,
  and providing any relevant feedback.

  审查 pull request

  若你熟悉 Flutter 的某一领域，或某 issue 的解决方案对你很重要，
  可考虑审查开放的 pull request，在你的应用中试用，并提供相关反馈。

[open a new issue]: {{site.repo.flutter}}/issues/new
[uxr-signup]: {{site.main-url}}/research-signup
[design documents]: {{site.repo.flutter}}/blob/main/docs/contributing/Design-Documents.md
[design-doc-issues]: {{site.repo.flutter}}/issues?q=is%3Aopen+is%3Aissue+label%3A%22design+doc%22

### Try out the beta channel

### 试用 beta 渠道

To help ensure Flutter's stability and improve upcoming features,
help test upcoming releases before they reach the stable channel.

为帮助确保 Flutter 稳定性并改进即将推出的功能，请在版本进入 stable 渠道之前测试即将发布的版本。

Consider testing releases on the `beta` channel,
both for general development and for testing compatibility with your apps.

建议在 `beta` 渠道上测试版本，既用于日常开发，也用于检验与应用兼容性。

Any feedback you have or regressions you encounter,
make sure to [report them][report-bugs] to the Flutter team.

请将任何反馈或遇到的回归 [报告给 Flutter 团队][report-bugs]。

To get started,
[switch][switch-channels] to the [`beta` channel][beta-channel] today
and account for any [necessary migrations][].

入门请立即 [切换][switch-channels] 到 [`beta` 渠道][beta-channel]，并处理任何 [必要迁移][necessary migrations]。

[switch-channels]: /install/upgrade#change-channels
[beta-channel]: /install/upgrade#the-beta-channel
[report-bugs]: {{site.github}}/flutter/flutter/issues/new/choose
[necessary migrations]: /release/breaking-changes

## Contribute code

## 贡献代码

Directly improve Flutter's codebase and related tools.

直接改进 Flutter 代码库及相关工具。

### Flutter framework

### Flutter 框架

Found a bug in a built-in widget, have an idea for a new one,
love adding tests, or just interested in the internals of Flutter?
Consider contributing to the Flutter framework itself
and improving the core of Flutter for everyone.

在内置 widget 中发现 bug、有新 widget 想法、喜欢添加测试，或对 Flutter 内部机制感兴趣？可考虑为 Flutter 框架本身贡献，为所有人改进 Flutter 核心。

To learn about contributing to the Flutter framework,
check out the Flutter [contribution guide][framework-contribute].

要了解如何为 Flutter 框架贡献，请参阅 Flutter [贡献指南][framework-contribute]。

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### Flutter engine

### Flutter 引擎

Interested in implementing the primitives and platform integrations
that underlay Flutter or have a knack for graphics programming?
Consider contributing to the Flutter engine and
making Flutter even more portable, performant, and powerful.

有兴趣实现 Flutter 底层的原语与平台集成，或擅长图形编程？可考虑为 Flutter 引擎贡献，使 Flutter 更具可移植性、性能与能力。

To learn about contributing to the Flutter engine,
check out the Flutter [contribution guide][framework-contribute]
and how to [Set up the engine development environment][engine-setup].

要了解如何为 Flutter 引擎贡献，请参阅 Flutter [贡献指南][framework-contribute] 以及如何 [配置引擎开发环境][engine-setup]。

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[engine-setup]: {{site.repo.flutter}}/blob/main/docs/engine/contributing/Setting-up-the-Engine-development-environment.md

### Flutter packages

### Flutter package

Contribute to first-party packages that are
maintained by the Flutter team.
The first-party packages provide essential functionality for apps
as well as encapsulate various platform-specific functionality.

为 Flutter 团队维护的第一方 package 贡献。第一方 package 为应用提供核心功能，并封装多种平台特定功能。

To learn about contributing to the first-party packages,
check out the Flutter [contribution guide][framework-contribute]
as well as the packages-specific [contribution guide][packages-contribute].

要了解如何为第一方 package 贡献，请参阅 Flutter [贡献指南][framework-contribute] 以及 package 专用的 [贡献指南][packages-contribute]。

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[packages-contribute]: {{site.repo.packages}}/blob/main/CONTRIBUTING.md

### DevTools

### DevTools

Contributing to the [Dart and Flutter DevTools][] is a
great place to begin contributing due to its relatively low-cost setup.
Enhance and fixes can greatly impact the developer experience
for Flutter developers and perhaps help you develop your own apps.

由于设置成本相对较低，为 [Dart 与 Flutter DevTools][Dart and Flutter DevTools] 贡献是很好的入门方式。增强与修复可显著影响 Flutter 开发者的开发体验，也可能帮助你开发自己的应用。

To get started, check out
the [DevTools `CONTRIBUTING.md` guide][devtools-contribute].

入门请参阅 [DevTools `CONTRIBUTING.md` 指南][devtools-contribute]。

[Dart and Flutter DevTools]: /tools/devtools
[devtools-contribute]: {{site.repo.organization}}/devtools/blob/master/CONTRIBUTING.md

### Site infrastructure

### 站点基础设施

Fix bugs, improve accessibility, or add features to the
Dart and Flutter websites.

修复 bug、改进无障碍功能，或为 Dart 与 Flutter 网站添加功能。

If you're familiar with web development or site generation,
contributing to the Dart and Flutter websites can be a great avenue
to improve the learning experience of Flutter developers.

若你熟悉 Web 开发或站点生成，为 Dart 与 Flutter 网站贡献可显著改善 Flutter 开发者的学习体验。

Depending on your interests,
you might want to contribute to:

根据兴趣，你可能希望贡献于：

- The pub.dev site

  pub.dev 站点

  - **Live site:** [`pub.dev`]({{site.pub}})

    **线上站点：** [`pub.dev`]({{site.pub}})

  - **Repository:** [`dart-lang/pub-dev`]({{site.github}}/dart-lang/pub-dev)

    **仓库：** [`dart-lang/pub-dev`]({{site.github}}/dart-lang/pub-dev)

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/pub-dev/blob/master/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/pub-dev/blob/master/CONTRIBUTING.md)

- The Flutter documentation site

  Flutter 文档站点

  - **Live site:** [`docs.flutter.dev`]({{site.url}})

    **线上站点：** [`docs.flutter.dev`]({{site.url}})

  - **Repository:** [`flutter/website`]({{site.repo.this}})

    **仓库：** [`flutter/website`]({{site.repo.this}})

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.github}}/flutter/website/blob/main/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/flutter/website/blob/main/CONTRIBUTING.md)

- The Dart documentation site

  Dart 文档站点

  - **Live site:** [`dart.dev`]({{site.dart-site}})

    **线上站点：** [`dart.dev`]({{site.dart-site}})

  - **Repository:** [`dart-lang/site-www`]({{site.github}}/dart-lang/site-www)

    **仓库：** [`dart-lang/site-www`]({{site.github}}/dart-lang/site-www)

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/site-www/blob/main/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/site-www/blob/main/CONTRIBUTING.md)

- DartPad

  DartPad

  - **Live site:** [`dartpad.dev`]({{site.dartpad}})

    **线上站点：** [`dartpad.dev`]({{site.dartpad}})

  - **Repository:** [`dart-lang/dart-pad`]({{site.github}}/dart-lang/dart-pad)

    **仓库：** [`dart-lang/dart-pad`]({{site.github}}/dart-lang/dart-pad)

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dart-pad/blob/main/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dart-pad/blob/main/CONTRIBUTING.md)

- The `dartdoc` tool

  `dartdoc` 工具

  - **Live site:** [`api.flutter.dev`]({{site.api}})

    **线上站点：** [`api.flutter.dev`]({{site.api}})

  - **Repository:** [`dart-lang/dartdoc`]({{site.github}}/dart-lang/dartdoc)

    **仓库：** [`dart-lang/dartdoc`]({{site.github}}/dart-lang/dartdoc)

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dartdoc/blob/main/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dartdoc/blob/main/CONTRIBUTING.md)

### Dart SDK

### Dart SDK

Contribute to the Dart language and surrounding tooling,
improving the client-optimized language that
forms the foundation of Flutter's excellent developer experience.

为 Dart 语言及周边工具贡献，改进构成 Flutter 出色开发者体验基础的客户端优化语言。

Dart's contribution workflow is slightly different,
so if you're interested, make sure to check out its
[contribution][dart-contribute] and [building][dart-build] guides.

Dart 的贡献流程略有不同，若感兴趣请务必查阅其 [贡献][dart-contribute] 与 [构建][dart-build] 指南。

[dart-contribute]: {{site.github}}/dart-lang/sdk/blob/main/CONTRIBUTING.md
[dart-build]: {{site.github}}/dart-lang/sdk/blob/main/docs/Building.md

### Code samples

### 代码示例

Improve or add samples demonstrating Flutter features,
helping developers that prefer to learn by example.

改进或添加演示 Flutter 功能的示例，帮助偏好通过示例学习的开发者。

You can always share your own samples or templates,
or you can contribute to Flutter-maintained samples:

你可以分享自己的示例或模板，也可以为 Flutter 维护的示例贡献：

- Full project samples

  完整项目示例

  - **Location:** [`flutter/samples`]({{site.repo.samples}})

    **位置：** [`flutter/samples`]({{site.repo.samples}})

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.repo.samples}}/blob/main/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.repo.samples}}/blob/main/CONTRIBUTING.md)

- API doc samples

  API 文档示例

  - **Location:** [`flutter/flutter/packages/flutter`]({{site.repo.flutter}}/tree/main/packages/flutter)

    **位置：** [`flutter/flutter/packages/flutter`]({{site.repo.flutter}}/tree/main/packages/flutter)

  - **Contribution guide:** [`README.md`]({{site.repo.flutter}}/tree/main/dev/snippets)

    **贡献指南：** [`README.md`]({{site.repo.flutter}}/tree/main/dev/snippets)

- Website code snippets

  网站代码片段

  - **Location:** [`flutter/website/examples`]({{site.repo.this}}/tree/main/examples)

    **位置：** [`flutter/website/examples`]({{site.repo.this}}/tree/main/examples)

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.repo.this}}/blob/main/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.repo.this}}/blob/main/CONTRIBUTING.md)

- Flutter repo samples

  Flutter 仓库示例

  - **Location:** [`flutter/flutter/examples`]({{site.repo.flutter}}/tree/main/examples)

    **位置：** [`flutter/flutter/examples`]({{site.repo.flutter}}/tree/main/examples)

  - **Contribution guide:** [`CONTRIBUTING.md`]({{site.repo.flutter}}/blob/main/CONTRIBUTING.md)

    **贡献指南：** [`CONTRIBUTING.md`]({{site.repo.flutter}}/blob/main/CONTRIBUTING.md)

## Write documentation

## 编写文档

Contributing to Flutter documentation, no matter the form,
is one of the most impactful ways you can help Flutter.

无论以何种形式为 Flutter 文档贡献，都是你能帮助 Flutter 的最有影响力的方式之一。

### Flutter API docs

### Flutter API 文档

The API docs are heavily relied on by many Flutter developers,
both online and in their code editors.

许多 Flutter 开发者在线上及其代码编辑器中大量依赖 API 文档。

Whether you're interested in writing new docs, updating existing ones,
adding relevant code snippets, or even creating new visuals like diagrams,
your contribution to the API docs will be
appreciated by every Flutter developer.

无论你希望撰写新文档、更新现有文档、添加相关代码片段，还是创建图表等新视觉材料，你对 API 文档的贡献都会受到每位 Flutter 开发者的感谢。

To get started, check out
the [Flutter SDK contribution guide][flutter-contribute],
particularly its section on [API documentation][flutter-api-contribute]

入门请参阅 [Flutter SDK 贡献指南][flutter-contribute]，尤其是其中关于 [API 文档][flutter-api-contribute] 的部分。

[flutter-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[flutter-api-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md#api-documentation

### Documentation website

### 文档网站

Consider contributing to this very site,
guiding developers as they learn and explore Flutter.

可考虑为本站点贡献，在开发者学习与探索 Flutter 时提供指引。

To learn about contributing to the Flutter documentation website,
check out the website's [contribution documentation][website-contribute].

要了解如何为 Flutter 文档网站贡献，请参阅网站的 [贡献文档][website-contribute]。

You can also contribute to the [Dart website][],
enhancing the documentation for the client-optimized language
that forms the foundation of Flutter.
To learn how to contribute,
check out the [`dart-lang/site-www` contribution docs][dart-dev-contribute].

你也可以为 [Dart 网站][Dart website] 贡献，增强构成 Flutter 基础的客户端优化语言的文档。要了解如何贡献，请参阅 [`dart-lang/site-www` 贡献文档][dart-dev-contribute]。

[website-contribute]: {{site.repo.this}}/blob/main/CONTRIBUTING.md
[Dart website]: {{site.dart-site}}
[dart-dev-contribute]: {{site.github}}/dart-lang/site-www/tree/main?tab=readme-ov-file#getting-started

## Triage issues

## 分类 issue

Help the Flutter team by triaging incoming bug reports and feature requests.

通过分类 incoming 的 bug 报告与功能请求来帮助 Flutter 团队。

There are plenty of ways to help in [Flutter's issue database][flutter-issues],
including but not limited to:

在 [Flutter 的 issue 数据库][flutter-issues] 中有很多帮助方式，包括但不限于：

- Determining issue validity

  判断 issue 是否有效

- Ensuring actionability

  确保可执行性

- Documenting affected versions

  记录受影响版本

- Adding reproduction steps

  添加复现步骤

- Identifying duplicate or resolved issues

  识别重复或已解决的 issue

- Solving or redirecting support queries

  解决或转接支持类问题

To get started helping with issues,
read about [helping out in the issue database][issue-contribute] and
learn about Flutter's approach to
[issue triage][] and [issue hygiene][issue hygiene].

入门请阅读 [在 issue 数据库中提供帮助][issue-contribute]，并了解 Flutter 对 [issue 分类][issue triage] 与 [issue 规范][issue hygiene] 的做法。

[flutter-issues]: {{site.repo.flutter}}/issues
[issue-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md#helping-out-in-the-issue-database
[issue triage]: {{site.repo.flutter}}/blob/main/docs/triage/README.md
[issue hygiene]: {{site.repo.flutter}}/tree/main/docs/contributing/issue_hygiene

## Strengthen the package ecosystem

## 强化 package 生态

Help grow and support the collection of
available Dart and Flutter packages on [pub.dev](https://pub.dev/).

帮助在 [pub.dev](https://pub.dev/) 上发展并支持可用的 Dart 与 Flutter package 集合。

### Contribute to packages you use

### 为你使用的 package 贡献

To give back to packages you depend on and potentially even help your own apps,
find packages you rely on and contribute back to them.

为所依赖的 package 回馈，并可能惠及你自己的应用：找到你依赖的 package 并为其贡献。

To contribute to a package,
navigate to its page on the [pub.dev site][]
and find the repository linked in the page's sidenav.

要为某个 package 贡献，请访问其在 [pub.dev 站点][pub.dev site] 上的页面，并在页面侧边栏导航中找到链接的仓库。

Before contributing, do make sure to
follow each package's contribution guide,
discuss your contribution with the maintainers, and
keep in mind Flutter's [Code of conduct][].

贡献前请务必遵循各 package 的贡献指南、与维护者讨论你的贡献，并牢记 Flutter 的 [行为准则][Code of conduct]。

[pub.dev site]: {{site.pub}}
[Code of conduct]: {{site.repo.flutter}}/blob/main/CODE_OF_CONDUCT.md

### Open source reusable functionality from your app

### 将应用中的可复用功能开源

If you've built a cool, generic widget or utility in your app,
consider extracting it into a package and publishing it to pub.dev.

若你在应用中构建了很棒的通用 widget 或工具，可考虑将其提取为 package 并发布到 pub.dev。

To get started, learn about
[Creating Dart packages][] and [Developing Flutter packages][].
Then, when you're ready to publish your package to the [pub.dev site][],
follow the guide and best practices on [Publishing packages][].

入门请学习 [创建 Dart package][Creating Dart packages] 与 [开发 Flutter package][Developing Flutter packages]。准备发布到 [pub.dev 站点][pub.dev site] 时，请遵循 [发布 package][Publishing packages] 指南与最佳实践。

[Creating Dart packages]: {{site.dart-site}}/tools/pub/create-packages
[Developing Flutter packages]: /packages-and-plugins/developing-packages
[pub.dev site]: {{site.pub}}
[Publishing packages]: {{site.dart-site}}/tools/pub/publishing

### Add Dart or Flutter support to popular SDKs

### 为流行 SDK 添加 Dart 或 Flutter 支持

Create or contribute to packages that wrap native SDKs or web APIs.

创建或贡献封装原生 SDK 或 Web API 的 package。

Before creating a new package,
first try to find any existing wrappers that you
could use or contribute to on the [pub.dev site][].

创建新 package 前，请先在 [pub.dev 站点][pub.dev site] 上查找可复用或贡献的现有封装。

Depending on the SDK and platform,
you might need to [Write platform-specific code][],
use [JS interop][], wrap a REST API using [`package:http`][],
or reimplement the required functionality in Dart.

根据 SDK 与平台，你可能需要 [编写平台特定代码][Write platform-specific code]、使用 [JS 互操作][JS interop]、用 [`package:http`][] 封装 REST API，或在 Dart 中重新实现所需功能。

If you're planning to create a new package, learn about
[Creating Dart packages][] and [Developing Flutter packages][].
Then, when you're ready to publish your package to the [pub.dev site][],
follow the guide and best practices on [Publishing packages][].

若计划创建新 package，请学习 [创建 Dart package][Creating Dart packages] 与 [开发 Flutter package][Developing Flutter packages]。准备发布到 [pub.dev 站点][pub.dev site] 时，请遵循 [发布 package][Publishing packages] 指南与最佳实践。

[pub.dev site]: {{site.pub}}
[Write platform-specific code]: /platform-integration/platform-channels
[JS interop]: {{site.dart-site}}/interop/js-interop
[`package:http`]: {{site.pub-pkg}}/http

## Support the community

## 支持社区

Help other developers learn Flutter and
succeed as they build their own apps.

帮助其他开发者学习 Flutter，并在构建自己的应用时取得成功。

### Help other developers

### 帮助其他开发者

Share your Flutter knowledge and expertise
to help your fellow Flutter developers succeed.

分享你的 Flutter 知识与经验，帮助 fellow Flutter 开发者成功。

This can take many forms from starting a Flutter help channel in your company
to answering questions on public forums.

形式多种多样，从在公司内开设 Flutter 帮助频道，到在公共论坛回答问题。

Some common locations Flutter developers look for help include:

Flutter 开发者常寻求帮助的场所包括：

- [Stack Overflow](https://stackoverflow.com/questions/tagged/flutter)
- [Flutter Dev Discord](https://discord.com/invite/rflutterdev)
- [Dart Community Discord](https://discord.com/invite/Qt6DgfAWWx)
- [r/FlutterDev on Reddit](https://www.reddit.com/r/FlutterDev)
- [GitHub issues]({{site.repo.flutter}}/issues)
- [Flutter Forum](https://forum.itsallwidgets.com/)

- [Stack Overflow](https://stackoverflow.com/questions/tagged/flutter)
- [Flutter Dev Discord](https://discord.com/invite/rflutterdev)
- [Dart Community Discord](https://discord.com/invite/Qt6DgfAWWx)
- [r/FlutterDev on Reddit](https://www.reddit.com/r/FlutterDev)
- [GitHub issues]({{site.repo.flutter}}/issues)
- [Flutter Forum](https://forum.itsallwidgets.com/)

### Host events

### 举办活动

Connect with other Flutter enthusiasts and
organize local, national, and even virtual events.
Events can be anything, from study groups and simple meetups,
to workshops and hackathons.

与其他 Flutter 爱好者联系，组织本地、全国乃至线上活动。活动形式多样，从学习小组、简单聚会，到工作坊与黑客松。

For inspiration and support,
check out existing [Flutter events][],
learn more about the [Flutter community][], and
explore the [Flutter Meetup Network][].

获取灵感与支持，可查看现有 [Flutter 活动][Flutter events]、了解更多 [Flutter 社区][Flutter community] 信息，并探索 [Flutter Meetup Network][Flutter Meetup Network]。

[Flutter events]: {{site.main-url}}/events
[Flutter community]: {{site.main-url}}/community
[Flutter Meetup Network]: https://www.meetup.com/pro/flutter/

### Post about Flutter

### 发布 Flutter 相关内容

Share your insights and projects with the wider Flutter community.

与更广泛的 Flutter 社区分享你的见解与项目。

There are endless options for sharing about Flutter
and connecting with the developer community.
Some common outlets include:

分享 Flutter 并与开发者社区建立联系的方式无穷无尽。常见渠道包括：

- Blog posts

  博客文章

- Video tutorials

  视频教程

- Short-form posts

  短文

- Forum threads

  论坛帖子

- GitHub discussions

  GitHub 讨论

- Link aggregation boards

  链接聚合板

Post or share about whatever you're passionate about,
but if you're not sure what to post,
consider posting about topics that developers often ask about.

发布你热衷的任何内容；若不确定发什么，可考虑开发者常问的主题。

If the platform you're posting on supports tagging posts,
consider adding the `#Flutter` and `#FlutterDev` hashtags
to help other developers find your content.

若发布平台支持标签，可添加 `#Flutter` 与 `#FlutterDev` 标签，便于其他开发者发现你的内容。
