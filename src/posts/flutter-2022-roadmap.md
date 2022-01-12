---
title: Flutter 2022 产品路线图发布
toc: true
---

为了提高产品透明度，每年年初 Flutter 团队都会发布今年度的产品路线图，以帮助使用 Flutter 的团队和开发者们根据这些优先事项制定计划。

![](https://files.flutter-io.cn/posts/flutter-cn/2022/flutter-roadmap-2022/flutter-2022-roadmap.jpg)

2022 年 Flutter 团队将重点通过关注以下几个领域和方向针对产品进行研发和改进，包括开发者体验、桌面端、Web 端、框架和引擎、Dart 编程语言、卡顿，并计划于今年停止对 32 位 iOS 设备的支持，并增加对软件供应链安全方面的投入，以达到 SLSA 4 级 (用户可以高度确信该软件没有被篡改)。

## 重点关注

### 开发者体验

作为一款面向开发者的工具，我们最关注的就是开发者体验。我们的目标是创建一款开发者们热爱的 SDK，这将会在很多方面有所体现。包括创建实现通用业务场景的 widget、厘清现有的 API 并引入新的 API 以更便捷的方式实现常见的设计模式、改善错误信息提示、改进开发者工具和 IDE 插件、创建新的 Lint 规则、修复框架和引擎的 bug、改进 API 文档、创建更有用的示例代码，以及在 Web 上实现热重载 (Hot Reload) 和改进 Dart-to-JS 场景的堆栈跟踪等。

### 桌面端

2022 年我们计划将 Flutter 的桌面端支持推进到稳定版本。我们会把重点放在测试上，并在平台可用之后进行公布——首先是 [Windows 平台](https://github.com/flutter/flutter/projects/209)，然后是 [Linux 平台](https://github.com/flutter/flutter/projects/216)，然后是 [macOS 平台](https://github.com/flutter/flutter/projects/215)。这项工作的重要部分是扩增回归测试套件，以让我们有充分的信心将 Flutter 带到桌面端平台而无需破坏现有的代码。

### Web 端

2022 年我们计划提升 Flutter Web 的性能、插件质量、无障碍特性和多浏览器一致性的体验，与此同时，我们也在计划让 Flutter 应用更方便的嵌入其他页面。

### 框架和引擎

为了提高 Android 平台的还原度，我们将 [更新 Material 库以支持 Material Design 3](https://github.com/flutter/flutter/issues/91605)。也为了提高 Web 平台的还原度，我们计划实现跨组件的文本选择，这些更新都不局限于某个平台。

我们计划提升不同平台上的文本编辑体验，例如提高桌面端文本编辑协议的还原度，以及 iPadOS 上手势识别的集成。

对于桌面和 Web 端，我们将提供菜单 (包括上下文菜单和菜单栏) 的解决方案，包括与操作系统相关的集成 (特别是与 macOS 相关)。

最后，我们计划尝试支持基于单一 Isolate 渲染到多个窗口的特性，这个特性受到桌面端平台的启发，但其应用可以不仅限于桌面端平台。

### Dart 编程语言

2022 年我们计划放缓并以稳定的速度发展 Dart 编程语言特性，我们预计会给 Dart 编程语言引入一个新的特性，有可能是静态元编程 (static metaprogramming)，我们将根据对这个特性对 Dart 编程语言的改善做出决定，也同时会对 Dart 编程语言进行改进，包括可能改进 package 导入的语法等。

我们还计划扩增 Dart 编程语言的编译工具链以支持编译为 Wasm，不过这可能会要看 WasmGC 规范的支持时间。

### 卡顿

[2021 年我们着手解决了很多关于卡顿的问题](https://files.flutter-io.cn/flutter-design-docs/Jank_in_Flutter.pdf)，但最后的结论是，我们可能需要完全重新思考该如何使用着色器 (shader)，正因如此，我们也一直在重写图形渲染的后端。2022 年，我们打算将 iOS 上的 Flutter 迁移到这个新的架构上，然后根据在这方面的经验，将这个方案移植到其他平台。此外，我们还将实现其他性能方面的改进以及性能自省特性，例如 [新的 DisplayList 系统](https://github.com/flutter/flutter/issues/85737) 所实现的功能。

## 计划弃用

我们计划在 2022 年放弃对 32 位 iOS 设备的支持，详见 [RFC 文档](https://files.flutter-io.cn/flutter-design-docs/RFC_Move_32-bit_iOS_to_Best_Effort_Tier.pdf)。

## 基础设施建设

2022 年我们将增加对供应链的安全的投入，目的是达到符合基础设施 SLSA 4 级别中描述的要求。

>> 近年来，软件供应链安全 (Supply Chain Security) 成为常被提及的话题，因为软件开发的复杂性，在源码、构建、发布等过程中都可能会存在很多威胁。一些不怀好意的人可能会通过发布二次打包后的开发工具或一些命名相似的软件包，或在一些依赖的软件包中加入恶意代码等方式对应用的供应链安全产生威胁。
>> 
>> SLSA (Supply-chain Levels for Software Artifacts) 是一个针对软件供应链的安全规范框架，目的是为了防止软件被篡改、提高完整性，其内部版本由 Google 自 2013 年开始使用，v0.1 版于 2021 年 9 月中旬公开发布，由 Intel、Linux 基金会、VMWare、Google、CNCF 等多家机构组成的委员会共同领导，SLSA 1 为最基础的要求等级，SLSA 4 为最高等级要求，了解更多请访问 slsa.dev 网站。

希望这份 2022 产品路线图可以更好的帮助你构建 Flutter 应用，让你的业务更上一层楼！

*Flutter 产品路线图原文: https://github.com/flutter/flutter/wiki/Roadmap*
