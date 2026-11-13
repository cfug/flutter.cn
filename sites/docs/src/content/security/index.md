---
# title: Security
title: Flutter 的安全性说明
tags: 站点资源
keywords: Flutter安全问题汇报,安全性
# description: >-
#   An overview of the Flutter's team philosophy and processes for security.
description: Flutter 团队关于安全的考量和处理流程的综述
showBreadcrumbs: false
ai-translated: true
---

The Flutter team takes the security of Flutter and the applications
created with it seriously. This page describes how to report any
vulnerabilities you might find, and lists best practices to minimize
the risk of introducing a vulnerability.

Flutter 团队认真对待 Flutter 以及用它创建的应用的安全。
本页说明如何报告你可能发现的漏洞，
并列出降低引入漏洞风险的最佳实践。

## Security philosophy

## 安全理念

Flutter security strategy is based on five key pillars:

Flutter 的安全策略基于五个关键支柱：

* **Identify**: Track and prioritize key security risks by
  identifying core assets, key threats, and vulnerabilities.

  **识别**：找出核心资产、主要威胁和漏洞，
  据此跟踪关键安全风险并排定优先级。

* **Detect**: Detect and identify vulnerabilities using
  techniques and tools like vulnerability scanning,
  static application security testing, and fuzzing.

  **检测**：使用漏洞扫描、静态应用安全测试和模糊测试等
  技术与工具来发现并确认漏洞。

* **Protect**: Eliminate risks by mitigating known
  vulnerabilities and protect critical assets against source threats.

  **防护**：处理已知漏洞以消除风险，
  并保护关键资产不受威胁来源的影响。

* **Respond**: Define processes to report, triage, and
  respond to vulnerabilities or attacks.

  **响应**：定好流程，用来报告、分类并处理漏洞或攻击。

* **Recover**: Build capabilities to contain and recover
  from an incident with minimal impact.

  **恢复**：能把事件控制住并恢复过来，
  把影响压到最小。

## Reporting vulnerabilities

## 报告漏洞

Before reporting a security vulnerability found
by a static analysis tool,
consider checking our list of [known false positives][].

在报告静态分析工具发现的安全漏洞之前，
请先查看我们的 [已知误报][known false positives] 列表。

Report security vulnerabilities to
[https://g.co/vulnz](https://g.co/vulnz) and include
a description of the issue, the steps you took to create
the issue, affected versions, and if known, mitigations
for the issue. We use g.co/vulnz for our intake, and do
coordination and disclosure on GitHub (including using GitHub
Security Advisory). The Google Security Team will respond
within 5 working days of your report on g.co/vulnz.

请将安全漏洞报告到
[https://g.co/vulnz](https://g.co/vulnz)，并附上
问题描述、你复现问题的步骤、受影响的版本，
以及已知的缓解措施（如果有）。
我们使用 g.co/vulnz 接收报告，
并在 GitHub 上进行协调与披露
（包括使用 GitHub 安全公告）。
Google 安全团队会在你于 g.co/vulnz 提交报告后的
5 个工作日内回复。

You may also reach out to the team via our public Discord
chat channels; however, please also make sure to make
vulnerability reports to g.co/vulnz, and avoid revealing
information about vulnerabilities in public if that could
put users at risk.

你也可以通过我们的公开 Discord 聊天频道联系团队；
不过，请同时务必把漏洞报告提交到 g.co/vulnz，
并且如果公开漏洞信息可能让用户面临风险，
请避免在公开场合披露。

You should expect a close collaboration as we work to resolve
the security vulnerability you have reported. Please reach out
to security@flutter.dev only if you do not receive a response
to a g.co/vulnz report within the above mentioned 5 working days.

在我们处理你报告的安全漏洞时，
请期待双方密切协作。
只有在上述 5 个工作日内没有收到
对 g.co/vulnz 报告的回复时，
才请联系 security@flutter.dev。

For more details on how we handle security vulnerabilities,
see our [security policy][].

要进一步了解我们如何处理安全漏洞，
请参阅我们的 [安全政策][security policy]。

[Discord chat channels]: {{site.repo.flutter}}/blob/main/docs/contributing/Chat.md
[known false positives]: /reference/security-false-positives
[security policy]: {{site.repo.flutter}}/security/policy

##  Flagging existing issues as security-related

## 将现有 issue 标记为与安全相关

If you believe that an existing GitHub issue is security-related,
we ask that you both report the issue to g.co/vulnz and send an
email to security@flutter.dev. The email should include the
GitHub issue ID and a short description of why it should be
handled according to this security policy.

如果你认为某个现有的 GitHub issue 与安全相关，
请同时把该问题报告到 g.co/vulnz，
并发送邮件到 security@flutter.dev。
邮件应包含 GitHub issue ID，
以及简要说明为何应按本安全政策处理。

Security reports are not tracked explicitly in the GitHub issue
database. We use GitHub's security advisory feature to track
open security reports.

安全报告不会在 GitHub issue 数据库中单独跟踪。
我们使用 GitHub 的安全公告功能来跟踪未解决的安全报告。

## Supported versions

## 受支持的版本

We commit to publishing security updates for the version of
Flutter currently on the `stable` branch.

我们承诺为当前位于 `stable` 分支的 Flutter 版本
发布安全更新。

## Expectations

## 预期

We treat security reports equivalent to a P0 priority level.
This means that we attempt to fix them as quickly as possible.
Depending on our release schedule, we will release either a
new beta or a stable hotfix for any major security report
found in the most recent stable version of our SDK, whichever
is most expedient.

我们把安全报告视为与 P0 优先级同等重要。
这意味着我们会尽快修复它们。
根据发布计划，对于在 SDK 最新 stable 版本中发现的
任何重大安全报告，我们会发布新的 beta
或 stable 热修复，以更及时的那种为准。

Any vulnerability reported for flutter websites like
docs.flutter.dev doesn't require a release and will be
fixed in the website itself.

针对 docs.flutter.dev 等 Flutter 网站报告的漏洞
不需要随 SDK 发布，会直接在网站上修复。

## Bug Bounty programs

## 漏洞赏金计划

Non-Google teams that use or contribute to Flutter are also
welcome to include Flutter within the scope of their bug
bounty programs. To have your program listed, please
contact `security@flutter.dev`.

使用或参与 Flutter 的非 Google 团队，
也欢迎把 Flutter 纳入其漏洞赏金计划的范围。
若希望列出你的计划，请联系 `security@flutter.dev`。

Google considers Flutter to be in scope for the
[Google Open Source Software Vulnerability Reward Program][google-oss-vrp].

Google 将 Flutter 纳入
[Google 开源软件漏洞奖励计划][google-oss-vrp] 的范围。

[google-oss-vrp]: https://bughunters.google.com/open-source-security

## Receiving security updates

## 接收安全更新

The best way to receive security updates is to subscribe to the
[flutter-announce][] mailing list or watch updates to the
[Discord channel][]. We also announce security updates in the
technical release blog post.

接收安全更新的最佳方式是订阅
[flutter-announce][flutter-announce] 邮件列表，
或关注 [Discord 频道][Discord channel] 的更新。
我们也会在技术版本博客文章中宣布安全更新。

[Discord channel]: https://discord.gg/BS8KZyg
[flutter-announce]: {{site.groups.flutter-announce}}

## Best practices

## 最佳实践

* **Keep current with the latest Flutter SDK releases.**
  We regularly update Flutter, and these updates might fix security
  defects discovered in previous versions.

  **及时跟进最新的 Flutter SDK 版本。**
  我们会定期更新 Flutter，这些更新可能会修复
  先前版本中发现的安全缺陷。

* **Keep your application's dependencies up to date.**
  Make sure you [upgrade your package dependencies][]
  to keep the dependencies up to date.
  Avoid pinning to specific versions
  for your dependencies and, if you do, make sure you check
  periodically to see if your dependencies have had security updates,
  and update the pin accordingly.

  **保持应用依赖为最新。**
  请 [升级 package 依赖][upgrade your package dependencies]，
  让依赖保持最新。
  避免把依赖固定到特定版本；如果确实固定了，
  请定期检查依赖是否有安全更新，
  并相应更新所固定的版本。

* **Keep your copy of Flutter up to date.**
  Private, customized versions of Flutter tend
  to fall behind the current version and might not
  include important security fixes and enhancements.
  Instead, routinely update your copy of Flutter.
  If you're making changes to improve Flutter,
  be sure to update your fork and consider sharing your
  changes with the community.

  **保持你的 Flutter 副本为最新。**
  私有的定制版 Flutter 往往会落后于当前版本，
  并且可能缺少重要的安全修复和增强。
  请改为定期更新你的 Flutter 副本。
  如果你正在修改 Flutter 以改进它，
  请务必更新你的 fork，并考虑把改动分享给社区。

[upgrade your package dependencies]: /install/upgrade
