---
title: Dart 2.16 现已发布
toc: true
---

*文 / Michael Thomsen, Dart 产品经理*

## Dart 2.16 正式发布

Dart 2.16 正式版已于上周发布。尽管没有新的语言特性加入，但本次版本发布包含了数个问题修复 (包括对安全漏洞的修复)，发布 Dart package 的时候也可以指定支持的平台，pub.dev 网站也更新了全新的搜索界面。

![](https://devrel.andfun.cn/devrel/posts/2022/02/d7ae376ac7664.png)

与 [Flutter 2.10](https://mp.weixin.qq.com/s/FgMu6-O_wMkwxp2yxiW2Ew) 一同发布的 Dart 2.16，仍然在将旧的命令行工具迁移到新的 dart 命令行工具。这个版本中，`dartdoc`和 `dartanalyzer` 已被弃用，分别对应新的命令是 `dart doc` 和 `dart analyze`。`dartdoc`、`dartanalyzer` 和 `pub` 这三个命令计划在 Dart 2.17 中彻底移除。

| 历史命令                            | 替代的 dart 命令 | 弃用版本 | 停用版本 |
|-------------------------------------|------------------|-------------|-----------------|
| stagehand                           | dart create    | 2.14        | 2.14           |
| dartfmt                             | dart format      | 2.14        | 2.15            |
| dart2native                         | dart compile exe | 2.14        | 2.15            |
| dart2js                             | dart compile js  | 2.17        | 2.18            |
| dartdevc                            | none             | 2.17        | 2.18            |
| dartanalyzer                        | dart analyze     | 2.16        | 2.17            |
| package:analyzer_cli                        | dart analyze     | 2.16        | 2.17            |
| dartdoc                             | dart doc       | 2.16        | 2.17            |
| pub                                 | dart pub         | 2.15        | 2.17            |

查看所有计划弃用的命令的更多说明，请参考 [Dart SDK 仓库的 Issue #46100](https://github.com/dart-lang/sdk/issues/46100 "Dart SDK 仓库的 Issue #46100")。 

Dart 2.16 也包含了一个安全漏洞的修复，以及两个破坏性改动：

- `dart:io` 中的 HttpClient API 现在可以设置 `authroization`、`www-authenticate`、`cookie`和`cookie2`这些请求头信息。在 Dart 2.16 之前，SDK 中重定向逻辑的实现有一个漏洞，当跨域重定向发生时，这些请求头 (可能包含敏感信息) 会被发送，在 Dart 2.16 中这些请求头已被移除，你可以阅读 [CVE-2022–0451](https://github.com/dart-lang/sdk/security/advisories/GHSA-c8mh-jj22-xg5h "CVE-2022–0451") 了解更多细节。
- `dart:io`中的 `Directory.rename` API 调整了在 Windows 平台上的行为：与目标名称一致的目录不会被删除 (issue [#47653](https://github.com/dart-lang/sdk/issues/47653 "Dart SDK 仓库的 Issue #47653"))。
- 在 Dart 1.x 中遗留的 `Platform.packageRoot` 和 `Isolate.packageRoot` 已被移除 (issue [#47769](https://github.com/dart-lang/sdk/issues/47769 "Dart SDK 仓库的 Issue #47769"))，它们在 Dart 2.x 中不起作用。

想要了解更多关于 Dart 2.16 的改动，可以查阅 [更新日志](https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md#2160 "Dart 2.16 详细更新日志")。

## 在 pub.dev 上声明 package 支持的平台

Dart 的设计思想包含了可移植性，因此我们会尽量让代码能够在更多平台上运行。然而，开发者们偶尔可能会在 pub.dev 上创建或分享仅为一个或几个平台设计的 package。你可能有一个依赖于特定操作系统上 API 的 package，或者它使用了像 `dart:ffi` 这类只能在 native 平台而不能在 Web 平台上使用的库等。

在 Dart 2.16 版本中，你可以在 pubspec 手动声明 package 支持的平台。例如，如果你的 package 只支持 Windows 和 macOS，那么就可以在 `pubspec.yaml` 这样声明:

```
name: mypackage  
version: 1.0.0

platforms:  
  windows:  
  macos:

dependencies:
```

当你正在开发一个 Dart package，而它支持的平台与 pub.dev 自动识别的不同时，可以在新的 `platforms` 标签处手动声明。如果你正在开发和分享包含特定平台代码的 Flutter 插件 (例如，Kotlin 或 Swift)，[Flutter plugin 标签](https://docs.flutter.cn/development/packages-and-plugins/developing-packages#plugin-platforms "Flutter plugin 标签") 可以指定支持的平台。

## pub.dev 新的搜索体验

响应开发者的请求，我们对于在 pub.dev 上的搜索提供了更好的支持。此次更改的主要目的是帮助你区分和搜索支持的平台。以下是新的搜索界面预览:

![Pub.dev 的搜索界面，侧边栏包含 Platforms、SDKs 和高级选项](https://devrel.andfun.cn/devrel/posts/2022/02/35e594d3f2d5c.jpg)

新的搜索界面在左侧有一个搜索筛选栏，你可以用它限制搜索范围:

- **Platforms (平台)**: 选择一个或多个平台，搜索结果仅会包含支持所选平台的 package；
- **SDKs**: 选择 Dart 或 Flutter 将结果限制为支持 Dart SDK 或 Flutter SDK 的 package；
- **Advanced (高级选项)**: 额外的搜索选项，例如筛选出被标记为 Flutter Favorite 的 packages。

## 空安全进展

从一年前我们在 [Dart 2.12](https://mp.weixin.qq.com/s/OA0bTnR9o4eN_hyxTqaayA) 中正式发布了健全的空安全开始，社区以及 Dart 生态向空安全迁移的速度令人震撼：截止到上周，排名前 250 的 package 已经 100% 支持了空安全，排名前 1000 的 pacakge 也已经有 96% 的比例支持了空安全！谢谢所有为空安全贡献的 package 作者们！

应用迁移到空安全的迁移进度也十分乐观，这里指应用以及其所有的依赖都支持空安全。根据我们的统计，71% 的 Flutter tool 都运行在健全的空安全模式下了，如果你还没有开始，现在已经可以行动啦！

## 即将到来的内容

我们希望 pub.dev 的搜索界面更新对你有帮助，同时欢迎随时 [提出反馈](https://github.com/dart-lang/pub-dev/issues/ "向 pub.deb 提出建议和反馈")。2022 年二季度我们计划发布下一个 Dart SDK 版本，并且，我们还在跟进一些 [令人兴奋的语言特性](https://github.com/dart-lang/language/projects/1 "Dart 语言新特性计划看板")，希望能在今年晚些时候发布。

## 致谢
- 原文: Dart 2.16: Improved tooling and platform handling
- 链接: https://medium.com/dartlang/dart-2-16-improved-tooling-and-platform-handling-dd87abd6bad1
- 翻译 / 审校: CFUG 团队 Alex、加康、迷鹿
- 制图: Lynn
