---
title: Flutter Cocoon 已达到 SLSA 2 级标准的要求
toc: true
keywords: Cocoon, SLSA2
description: 
image:
    path: https://files.flutter-io.cn/posts/images/2022/10/c4f9568a65b61.jpg
---

文/ Jesse Seales, Dart 和 Flutter 安全工作组工程师

今年年初，我们发布了 [Flutter 2022 产品路线图](https://flutter.cn/posts/flutter-2022-roadmap)，其中「基础设施建设」这部分提到：2022 年 Flutter 团队将增加对供应链的安全的投入，目的是达到符合基础设施 SLSA 4 级别中描述的要求。4 月份下旬，Dart 团队与 GitHub 合作，[Dependabot 开始支持 pub.dev 上的 package 版本检测](https://flutter.cn/posts/pub-beta-support-for-dependabot-version-updates)。

Cocoon 是一个管理 Flutter Infra CI 的工具应用，我们已经实现了提升到 SLSA 2 级标准所要求的内容，将身份识别和访问管理 (Identity and Access Management, IAM) 权限降低到所需的最低权限，并对部分应用权限管理实施了基础设施即代码 (Infrastructure as code, IaC) 的策略。

>> 身份识别和访问管理 (IAM) 是一种安全权限措施，主要用于访问敏感技术资源时，为不同需要的人授权不同的权限。基础设施即代码 (IaC) 的核心思路是通过代码而不是用手动的方式和流程来管理项目的基础设施。

## 亮点

Cocoon 不仅可以管理 Flutter Infra CI，还可以将多个 CI 服务与 GitHub 集成，使得团队在 GitHub 上开发变得更容易。Cocoon 通过了 SLSA 2 级的要求，这意味着 Cocoon 已经解决了 SLSA 1 和 2 级别中所有的安全问题。Google 的开源安全团队已经验证并审核了 Cocoon 具备 SLSA 2 级标准的要求。

![](https://files.flutter-io.cn/posts/images/2022/10/99938ae2c6677.png)

我们为 `docs-flutter-dev`、`master-docs-flutter-dev` 和 `flutter-dashboard` 实施了额外的安全强化措施，使用基础设施即代码 (IaC) 系统实现身份识别和访问管理 (IAM)。这几个项目非常重要，他们为 Flutter 提供开发文档以及 Flutter 构建状态的仪表盘等。在 IaC 系统的管理下，安全权限的更改需要改动代码，没有批准则无法进行任何改动。也就是说，安全权限的改变是要通过版本控制系统来修改代码的，并且需要提供改变的理由。现有的 IAM 权限将会被减弱以遵循最小权限原则 (Principle of least privilege)。

## 优势

- 为 Cocoon 实现 SLSA 2 级的要求内容，意味 Cocoon 的供应链具有「针对特定威胁的额外抵御能力」；
- Cocoon 的自动构建流程为 flutter-dashboard 和 auto-submit 提供了源代码出处和防篡改的构建证明，这有助于加强构建流程中使用多种工具的安全性，如 Google Cloud Platform、Cloudbuild、App Engine 和 Artifact Registry；
- 整体看，我们已经为 Cocoon 解决了所有级别要求中 83% 的内容，并已经敲定了为了满足每个 SLSA 级别的合规性工作，我们也做好 Cocoon 迈向 SLSA 4 级要求的准备。

## 经验总结和最佳实践

1. 通过 Google Cloud Build 服务，我们仅做了相对较小的改动就提升了 Cocoon 构建过程中的供应链安全性，因为元数据验证会在 Cloud Build 过程中自动验证。
1. 通过代码来管理和调整 IAM 权限会带来很多额外的好处，并且可以使首次访问权限的授权变得更简单。
1. 提高或“升级” SLSA 的不同等级规范有时需要根据应用的构建流程等因素做出不同的投入。在争取达到最高级别 (SLSA 4) 的过程中会需要做很多不同于其他等级 (比如 SLSA 2 级) 的更改。

## 展望下一步

这将是 Flutter 和 Dart 走向更高 SLSA 级别要求的开始，我们希望可以将其中的收获实践到更多的应用中，同时也希望开始为 `flutter/flutter` 这样更复杂的代码库进行 SLSA 2 级以上的改造工作，同时也希望 Cocoon 应用可以达到更高水平的 SLSA 合规等级。
