---
title: GitHub 供应链安全已支持 Dart 开发者生态
toc: true
keywords: GitHub, Dart, 供应链安全
description: 通过 Dart 和 GitHub 团队的共同努力，自 10 月 7 日起，GitHub 的 Advisory Database (安全咨询数据库)、Dependency Graph (依赖项关系图) 和 Dependabot (依赖更新机器人) 开始支持 Dart 开发者生态，这也意味着 GitHub 为 Dart 和 Flutter 应用的供应链安全提供了全面支持。
image:
    path: https://files.flutter-io.cn/posts/images/2022/10/39fdff31f85d9.png
---

文/ Michael Thomsen，Dart 产品经理

通过 Dart 和 GitHub 团队的共同努力，自 10 月 7 日起，GitHub 的 Advisory Database (安全咨询数据库)、Dependency Graph (依赖项关系图) 和 Dependabot (依赖更新机器人) 开始支持 Dart 开发者生态，这也意味着 GitHub 为 Dart 和 Flutter 应用的供应链安全提供了全面支持:

- GitHub 的 Advisory Database (安全咨询数据库) 为漏洞报告者和项目维护者之间提供了一个协作平台，漏洞报告者和项目维护者可以共同合作，在漏洞被公开之前私密讨论并修复漏洞。
- Dependency Graph (依赖项关系图) 主要是分析 Dart / Flutter 项目的 pubspec.yaml 和 pubspec.lock 文件来确定项目依赖关系。
- Dependabot 是 GitHub 收购并免费开放的一个检测依赖项安全性的工具，一旦你依赖的 Dart package 版本发现新漏洞时，Dependabot 就可以发出通知并自动创建拉取请求 (Pull Request)，将 package 版本升级到没有漏洞的版本。查看过往推文: [Dependabot 开始支持 pub package 版本检测](https://flutter.cn/posts/pub-beta-support-for-dependabot-version-updates) 了解更多。

Dart 产品经理 Michael Thomsen 表示：通过与 GitHub 团队的合作，Dart 开发者们可以在新的漏洞影响到客户之前发现和解决问题；GitHub 的高级产品经理 Courtney Claessens 也提到说，在供应链安全侧全面支持 Dart，不仅是对开源社区、开发者的支持，更能够帮助数百万使用 Dart 应用的用户们。

![Dependabot 会检测 package 的更新并创建拉取请求以请求更新到最新版本](https://files.flutter-io.cn/posts/images/2022/10/18646812c0ce1.jpg)

![Dependency Graph (依赖项关系图) 会展示出项目所依赖的其他 package](https://files.flutter-io.cn/posts/images/2022/10/813aca34d90a0.jpg)

## 发布 package 到 pub.dev 的安全最佳实践

作为 package 开发者或维护者，当你将 package 发布到 pub.dev 的时候，这里有两条最佳实践的建议:
1. 使用 GitHub 的安全公告功能在你的代码仓库中创建新的安全公告，GitHub 会将这个纳入其 Advisory Database (安全咨询数据库) 中。
1. 为你的 GitHub 代码仓库配置安全策略，详细说明用户可以用什么样的方式报告安全问题。

![为发布到 pub.dev 上的 package 创建安全公告 (Ecosystem 选择 Pub)](https://files.flutter-io.cn/posts/images/2022/10/ebd6c66d2ea67.jpg)

上述提到的这些安全策略和功能均已面向所有用户发布 (私有仓库也只需要加入一点的额外配置)，快去试试吧，保护自己的代码安全，刻不容缓。

## 延伸阅读

- [在代码仓库中创建新的安全公告](https://docs.github.com/cn/code-security/repository-security-advisories/creating-a-repository-security-advisory)
- [关于安全漏洞的协调披露](https://docs.github.com/cn/code-security/repository-security-advisories/about-coordinated-disclosure-of-security-vulnerabilities)
