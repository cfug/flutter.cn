---
title: 了解 Flutter 开发者们的 IDE 使用情况
toc: true
keywords: IDE, Android Studio, VS Code
description: 本文中的见解来自 2022 年第二季度开发者调研，由 JaYoung Lee 和 Ander Dobo 整理撰文。
image:
    path: https://files.flutter-io.cn/posts/images/2022/10/PEE2bR.png
---

*作者 / JaYoung Lee, UX Researcher at Google*

Google 的 Flutter 团队负责构建和维护 Android Studio (基于 IntelliJ-IDEA) 和 Visual Studio Code (VS Code) 的支持。我们将代码补全、语法高亮、widget 编辑辅助、运行和调试等功能集成到这些 IDE 插件中，用于 Flutter 应用开发。Flutter 开发者们从一开始就有在使用这两种 IDE，Android Studio 以前比 VS Code 更受欢迎，不过 VS Code 近期在 Flutter 开发中的热度一直在稳步增加，最近甚至超过了 Android Studio，如下文图中所示。

为了更好地理解 Flutter 开发者在选择 IDE 时的想法，Flutter UX 团队在 2022 年 5 月开展了针对此课题的特别调研。

在后文中，"Android Studio" 同时代表 "Android Studio" 和 "IntelliJ-IDEA"。

![△ 图 1. 从 2021 年 8 月到 2022 年 7 月，使用每个 IDE 的 Flutter 开发者数量。图中可以看出 VS Code 在过去几个月中变得更受欢迎。](https://files.flutter-io.cn/posts/images/2022/10/3CRi1T.png)

△ 图 1. 从 2021 年 8 月到 2022 年 7 月，使用每个 IDE 的 Flutter 开发者数量。图中可以看出 VS Code 在过去几个月中变得更受欢迎。

## **我们对 IDE 的现有了解**

除了知道 Flutter 开发者在 2022 年初时使用 Android Studio 和 VS Code 的人数各占一半之外，我们根据之前的调研，对开发者的选择有了更深入的了解。

**Flutter 开发者倾向于使用他们熟悉的 IDE**

在 2019 年第三季度，我们曾询问 Flutter 开发者为什么更喜欢他们使用最多的 IDE。最常见的回答是: 这个 IDE "我更熟悉"。

![△ 图 2. 根据 2019 年第三季度的调研，80% 的 Android Studio 用户和 61% 的 VS Code 用户表示，他们选择 IDE 是因为对其更熟悉。](https://files.flutter-io.cn/posts/images/2022/10/eRDu2m.png)

△ 图 2. 根据 2019 年第三季度的调研，80% 的 Android Studio 用户和 61% 的 VS Code 用户表示，他们选择 IDE 是因为对其更熟悉。

**VS Code 用户看重在 IDE 中体验到的速度**

上图 (图 2) 中另外值得一提的是，68% 的 VS Code 用户选择该 IDE 是因为它比其他 IDE 更快，而只有 15% 的 Android Studio 用户如此认为。在一个开放式问题中，VS Code 用户表示他们喜欢该 IDE 是因为它虽轻量却具有多种扩展程序。

**VS Code 用户对 Flutter 的 IDE 支持更满意**

我们还询问了对 Flutter 的 IDE 支持的满意度，VS Code 用户对此更为满意。(我们记录了开发者从 IDE 打开调研问卷时是在使用哪个 IDE。当开发者单击问卷链接时，我们会告知他们将对此信息进行记录。)

![△ 图 3. 有 93.3% 的 VS Code 用户对 Flutter 的 IDE 支持感到满意，只有 85.9% 的 Android Studio 用户对此感到满意。](https://files.flutter-io.cn/posts/images/2022/10/c3qTBb.png)

△ 图 3. 有 93.3% 的 VS Code 用户对 Flutter 的 IDE 支持感到满意，只有 85.9% 的 Android Studio 用户对此感到满意。

当然，Android Studio 的设计目的，是作为面向 Android 开发的完全集成的 IDE，因此它提供更丰富的功能集。开发者们有提到，在 Android Studio 中处理原生 Android 代码和使用重构等便利功能很容易。在本文的下一节中，我们将深入探讨开发者们的偏好，以及为什么尽管 Android Studio 有这些优点，开发者对在其中进行 Flutter 开发时仍不太满意。

## **2022 年第二季度调研结果总结**

上一节的结果让我们不禁好奇，为什么 Flutter 开发者更乐意使用 VS Code 支持，而不是 Android Studio 支持。我们想了解 Flutter 开发者真正喜欢 VS Code 的哪些方面。

为了解这一点，我们询问了将主要 IDE 从一个换成另一个 (既包括从 Android Studio 换成 VS Code，也包括从 VS Code 换成 Android Studio) 的开发者一组问题。我们相信这些开发者可以很好地从他们的视角告诉我们每种 IDE 的独特价值。

首先，有更多的 Flutter 开发者从 Android Studio 换成 VS Code。

![△ 图 4. 更多开发者将主要 IDE 从 Android Studio (蓝色) 换成 VS Code (青色)，反向改换的人则很少。](https://files.flutter-io.cn/posts/images/2022/10/MUECW1.png)

△ 图 4. 更多开发者将主要 IDE 从 Android Studio (蓝色) 换成 VS Code (青色)，反向改换的人则很少。

如下图所示，转用 VS Code 的人喜欢它的性能 (82%) 和易用性 (63%)。另一方面，转用 Android Studio 的人喜欢它的功能 (51%)、与 Flutter 工具的集成 (39%) 以及与原生平台的集成 (27%)。

![△ 图 5. 转用其他 IDE 的理由。](https://files.flutter-io.cn/posts/images/2022/10/QMEE8p.png)

△ 图 5. 转用其他 IDE 的理由。

仍然有大约 23% 的 Flutter 开发者同时使用 VS Code 和 Android Studio。当询问他们为什么使用多个 IDE 时，最常见的回答是，VS Code 用户需要使用 Android Studio 和 Xcode 来实现特定于原生设备的功能，例如模拟器设置、构建配置、发布需求 (例如密钥生成和签名)，以及开发 Flutter + 原生混合式应用。

![△ 图 6. 22.5% 的 Flutter 开发者同时使用 VS Code 和 Android Studio。](https://files.flutter-io.cn/posts/images/2022/10/p11WTQ.png)

△ 图 6. 22.5% 的 Flutter 开发者同时使用 VS Code 和 Android Studio。

我们从调研中还了解到，不同国家或地区的 Flutter 开发者偏好不同的 IDE。尽管大多数 Flutter 开发者更偏好 VS Code，但中国的开发者相较于 VSCode (23%) 还是更偏好 Android Studio (56%)。我们发现这很有趣——Flutter 在全球范围内都有被广泛采用，但又往往处于不同的开发环境中。无论你来自哪个国家或地区，如果你有任何围绕这一倾向的故事，欢迎和我们分享。

![△ 图 7. 不同国家或地区的 IDE 使用偏好。图表中各个国家或地区至少包含 100 名受访者。](https://files.flutter-io.cn/posts/images/2022/10/QGB3Ob.png)

△ 图 7. 不同国家或地区的 IDE 使用偏好。图表中各个国家或地区至少包含 100 名受访者。

## **结论**

我们的目标是提供实用且完整的开发体验，最大限度地减少大家开始使用 Flutter 时的不便之处，并最大限度地提高开发者的工作效率。我们将基于上述以及未来的调研结果，为今后 Flutter 的 IDE 支持和文档提供路线图。我们会先对官方网站的上手指南文档进行小幅更新，以更好地反映上文提到的 IDE 偏好和使用模式。

我们从此次及其他调研中获取的诸多宝贵见解将确保我们聚焦于正确的领域，从而持续改进 Flutter 开发者体验。再次感谢参与调研的每一位开发者！如果你有兴趣参与未来的 [用户调研](https://flutter.dev/research-signup)，欢迎在官网上进行注册。我们将在下个季度和大家分享第三季度的调研结果，请保持关注！
