---
title: Dependabot 开始支持 pub package 版本检测
toc: true
---

![](https://files.flutter-io.cn/posts/flutter-cn/2022/pub-beta-support-for-dependabot-version-updates/pub-dependabot-hero.png)

今年年初，我们发布了 [Flutter 2022 产品路线图](https://flutter.cn/posts/flutter-2022-roadmap)，其中「基础设施建设」这部分提到：2022 年 Flutter 团队将增加对供应链的安全的投入，目的是达到符合基础设施 SLSA 4 级别中描述的要求。

## 供应链安全

大多数开源项目依赖了数百个开源依赖项<sup>[[1]](https://go2.gdsub.com/ospd "GitHub 文档 - 供应链安全: 大多数开源项目依赖了数百个开源依赖项")</sup>，随着更多开源项目被更广泛地使用，这些依赖项给其使用者们带来了安全隐患：如果我们使用的开源项目的依赖项受到攻击和破坏该怎么办？这将让你的直接用户 (软件的最终使用者) 蒙受供应链攻击带来的风险。

供应链攻击是一种新兴的、针对软件开发者和供应商的安全威胁<sup>[[2]](https://go2.gdsub.com/scad "Microsoft 文档 - 供应链攻击: 供应链攻击是一种新兴的、针对软件开发者和供应商的安全威胁")</sup>，攻击者会通过寻找不安全的网络协议、不受保护的服务器以及不安全的代码等安全漏洞并更改代码，导致使用它的程序在构建和更新的过程中被加入隐藏的恶意代码。

为了确保依赖项供应链的安全性，开发者们需要确保所有依赖项和工具定期更新到最新稳定版本，因为这些新的版本通常会包含最新功能和已知漏洞的安全修补程序。依赖项包括依赖的代码、使用的二进制文件、使用的工具以及其他组件等<sup>[[3]](https://docs.microsoft.com/zh-cn/nuget/concepts/security-best-practices#dependency-versions "Microsoft 文档 - 关于安全软件供应链的最佳做法")</sup>。在 GitHub 上托管的开源代码可以使用 GitHub 提供的代码扫描功能来查找项目中的安全漏洞和错误，并使用 Dependabot 维护项目的依赖项，以确保项目自动更新到依赖项的最新版本。

## 启用 package 版本检测

对 Dart package 的支持可以回溯至 19 年 4 月初，当时的 Flutter 刚刚发布到 [v1.2 稳定版](https://flutter.cn/posts/launching-flutter-12-at-mobile-world)；同年 5 月，Dependabot 被 GitHub 收购并免费为开发者提供服务。有一位社区成员在 [dependabot-core#2166](https://github.com/dependabot/dependabot-core/issues/2166 "GitHub 议题: dependabot-core#2166") 这个议题 (issue) 中发起提问，希望 Dependabot 加入对 Flutter / Dart 的支持。通过 Dependabot 与 Dart 团队的共同努力，包括后期为 Flutter 命令行工具加入了一些对 package 版本检测等功能，最后在今年 3 月 22 日开启封闭测试，并于 4 月 5 日进行公开的 beta 测试。

目前，Dependabot 版本更新对 pub package 生态的支持已进入测试阶段，开发者们可以使用 Dependabot 为他们的 Flutter 或 Dart 项目加入 package 的更新检测。目前仅支持已发布到 pub.dev 网站上的 package。

如果想在自己的 Dart 或 Flutter 仓库测试 Dependabot 版本更新检测，需要创建 `.github/dependabot.yml` 文件并添加如下内容：

```yaml
version: 2
enable-beta-ecosystems: true
updates:
  - package-ecosystem: "pub"
    directory: "/"
    schedule:
      interval: "weekly"
```

请确保这两个参数设定: `package-ecosystem: "pub"` 以及 `enable-beta-ecosystems: true`。

## 已知限制

目前的 pub package 版本检测支持仍处于测试阶段，并包含了一些已知的限制，例如 [Dependabot 安全更新](https://docs.github.com/cn/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates "GitHub 文档 - Dependabot 安全更新功能说明") 目前尚不支持，将在未来发布的版本中加入对其的支持。

其他已知的限制：

- 不支持更新以 git 方式引用的依赖
- 如果在 dependabot 中配置忽略新版本检测，将不会进行任何更新
- 不支持检测私享和自定义 pub 发布的 package

开发者们可以在 [GitHub 官方的反馈讨论](https://github.com/github/feedback/discussions/14200 "提出反馈: Dependabot 开始支持 pub package 检测") 里提出建议或 vote +1，也可以在 [dependabot-core](https://go2.gdsub.com/pub-issues-dependabot "在 dependabot-core 仓库提交关于 pub 支持的议题") 仓库提交议题来帮助团队排查问题。

## 致谢

- 消息源: GitHub 博客 - [pub beta support for Dependabot version updates](https://github.blog/changelog/2022-04-05-pub-beta-support-for-dependabot-version-updates/)
- 编辑: CFUG 本地化团队 Alex, Luke
- 制图: Lynn
