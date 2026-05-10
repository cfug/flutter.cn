---
title: Flutter 2025 年产品路线图发布
description: Flutter 2025 年产品路线图发布
toc: true
---

> 每一年 Google Flutter 团队都会发布一份产品路线图，包括 Flutter 框架和 Dart 编程语言，让开发者能够了解官方团队的优先事项，并据此做出自己的计划安排。
>
>
>
> 产品路线图也会随着客户反馈和新兴市场机会的变化而不断发展。开发者们可以通过每季度的调查问卷以及 GitHub 上 issue 的反馈来推进这些工作的优先级。
>
>
>
> 原文:https://github.com/flutter/flutter/blob/master/docs/roadmap/Roadmap.md

![](https://img-s2.andfun.cn/devrel/posts/2025/04/4835c77c0418a.png)

这份路线图是我们希望实现的愿景目标，主要由我们这些在 Google 任职、从事 Flutter 项目的成员整理而成。值得注意的是，目前社区中的非 Google 贡献者数量已经超过了 Google 内部开发者，因此这并不是涵盖所有未来发展方向的完整列表。

正如在整个软件行业中常见的那样，准确预测工程进度总是具有挑战性的，尤其是对于一个开源项目来说更是如此。因此，请将这份路线图视为我们的“意图声明”，而非完成工作的承诺。

## ♿ 无障碍支持（Accessibility）

在 2024 年，我们完成了多个移动平台（iOS 和 Android）上关键无障碍场景的验证。

2025 年，我们计划将重点转向 Web 平台上的无障碍支持。

## ⚡ 性能（Performance）

我们会继续聚焦于 Impeller 引擎带来的质量和性能提升：

* 在 iOS 上，我们计划 **彻底迁移到 Impeller** ，引入的变化包括 **移除 Skia 后端** 。

* 在 Android 上，我们将优先关注运行 **Android API 等级 29 (Android 10) 及以上的设备** ，并计划在这些设备上默认启用 Impeller。考虑到 2024 年旧设备上存在的问题，目前我们仍将保留对 Skia 的支持。

## 📱 移动端（Android 和 iOS）

* **iOS** : 持续适配即将发布的 iOS 19 与 Xcode 17，完成对 Swift Package Manager（SwiftPM）的支持，并计划在 2025 年晚些时候将其设为默认选项。

* **Cupertino 支持** : 持续改进 Cupertino 组件，使其更贴合 Apple 的 Human Interface Guidelines。

* **Android** : 探索 Android 16 的主要新特性，并将 Gradle 构建脚本从 Groovy 迁移至 Kotlin，提升构建工具的单元测试覆盖率。

* **平台互操作性** : 持续开展实验性工作，支持从 Dart 直接调用原生平台代码，包括：

  * iOS 上的 Objective-C 和 Swift；

  * Android 上的 Java 和 Kotlin；

  * 特别是主线程限定 API 的调用支持。

## 🌍 Web 端

2024 年我们在 Web 性能和质量方面取得了重大进展，包括应用体积缩小、多线程利用提升以及更快的加载速度。

2025 年，我们将继续深化以下方面的能力：

* 无障碍支持；

* 文本输入体验；

* 国际化文本渲染；

* 应用体积和整体性能；

* 平台集成能力；

* 使用 WebAssembly (Wasm) 编译进一步提升性能。

我们已经完成了支持 JS 与 Wasm 编译的新 Dart JS 互操作机制。接下来，我们计划在 2025 年正式移除旧版 HTML 与 JS 库（请关注破坏性变更公告）。

此外，Web 平台的热重载（Hot Reload）也已取得显著进展，预计将在 2025 年正式推出。

## 🖥️ 桌面端（Windows / macOS / Linux）

2025 年，Google Flutter 团队将继续专注于移动和 Web 平台的支持。

与此同时，Canonical Flutter 团队将继续负责桌面平台的研发，包括：

* 多窗口支持改进；
* 无障碍功能；
* 键盘输入与文本输入体验；
* 焦点控制机制；
* 窗口管理 API 的持续推进。

## 🧱 核心框架（Core Framework）

我们正在研究一系列框架层面的调整，目标是减少 Flutter Widget 代码中不必要的冗长写法，提高开发效率。

## 🧠 工具链与 AI（Tooling and AI）

我们将继续整合 AI 解决方案，为开发者提供核心编程任务的智能辅助。

我们也会持续投资于 Flutter 的工具链，包括：

* Flutter DevTools；
* VS Code 插件；
* Android Studio / IntelliJ 插件；
* Google IDX。

此外，我们还将继续优化开发体验中的 “编辑-刷新” 循环（Edit-Refresh Cycle）。

## 🔤 Dart 编程语言

* 2024 年，我们确定不再推进 Dart 宏（macro）特性的支持。
* 2025 年，我们将致力于提升 `build_runner` 的代码生成支持能力。
* 同时，我们也会探索更好的 Dart 序列化 / 反序列化方式。
* 还计划发布一个或多个正在设计流程中的 Dart 语言特性。

## 🧰 Dart 编译器与工具链

我们计划重构 Dart 分析器（analyzer）与前端编译器，使它们可以共享更多底层实现。这将有助于：

* 更快地支持新语言特性；
* 提升编译性能；
* 提高整体稳定性。

我们还将探索跨平台 AOT 编译能力，例如：在 macOS 开发机上编译 Linux 平台的 Dart AOT 可执行文件。

## 📦 发布计划（Releases）

* 2025 年我们仍将保持每年发布 **4 个稳定版本** 和 **12 个测试版** 的节奏（与 2024 年一致）。
* 为了提升版本的可预测性和稳定性，我们将进一步扩大测试覆盖率。
* 同时也会增强我们快速发布热修复 / 补丁版本的能力。

## 🚫 非目标方向（Non-goals）

目前我们仍不打算为以下功能提供官方支持：

* **代码热更新（Code Push）：**
推荐关注社区解决方案 shorebird.dev。

* **UI 热更新 / 服务端驱动 UI（Server-driven UI）：**
推荐使用 rfw 包。

* **新增支持平台：**
我们暂无计划扩展 Flutter 的官方支持平台列表。
