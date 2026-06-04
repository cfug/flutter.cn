---
# title: Validate deep links
title: 验证深度链接
# description: Learn how to validate deep links in your app.
description: 学习如何验证应用中的深度链接。
ai-translated: true
---

:::note
As of release 3.27, the deep link validator tool
works for _both_ Android and iOS.

To see a demo of the deep link validator,
check out the Google I/O 2024 video,
[No more broken links: Deep linking success in Flutter][].
:::

:::note
自 3.27 版本起，深度链接验证工具
同时适用于 Android 和 iOS。

要观看深度链接验证工具的演示，
请参阅 Google I/O 2024 视频
[No more broken links: Deep linking success in Flutter][]（Flutter 深度链接成功之道：告别失效链接）。
:::

[No more broken links: Deep linking success in Flutter]: {{site.youtube-site}}/watch?v=d7sZL6h1Elw

The deep link view validates any deep links
that are defined in your app.

深度链接视图会验证应用中定义的所有深度链接。

To use this feature, open DevTools,
click into the **Deep Links** tab,
and import a Flutter project that contains deep links.

要使用此功能，请打开 DevTools，
进入 **Deep Links**（深度链接）标签页，
并导入包含深度链接的 Flutter 项目。

![Screenshot of the Deep Link Validator](/assets/images/docs/tools/devtools/deep-link-validator.png){:width="100%"}

This tool helps you identify and troubleshoot any errors
in your mobile deep link setup,
from website configuration to manifest files.
DevTools provides instructions on how to fix any issues,
making the implementation process easier.

该工具可帮助你在移动端深度链接配置中
（从网站配置到清单文件）识别并排查错误。
DevTools 会提供修复问题的说明，使实现过程更简单。
