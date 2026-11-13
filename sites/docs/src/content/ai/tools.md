---
# title: How Flutter AI tools work
title: Flutter AI 工具如何工作
# shortTitle: How AI tools work
shortTitle: AI 工具如何工作
# description: >-
#   Learn how agent skills, the Dart and Flutter MCP server, and package skills
#   interact to assist your development workflow.
description: >-
  了解智能体技能、Dart 与 Flutter MCP 服务器以及 package 技能
  如何配合，以协助你的开发流程。
ai-translated: true
---

Flutter and Dart provide an integrated suite of tools designed to help AI
coding assistants understand your codebase, follow best practices, and execute
development tasks accurately.

Flutter 与 Dart 提供一套集成工具，
帮助 AI 编程助手理解你的代码库、遵循最佳实践，
并准确地执行开发任务。

## Tooling ecosystem overview

## 工具体系概览

The Flutter AI tooling ecosystem consists of four complementary components:

Flutter AI 工具体系由四个互补组件组成：

1. **Agent skills**: Task-oriented blueprints that teach assistants how to
   perform specific workflows (such as creating responsive layouts or writing
   tests).

   **智能体技能**：面向任务的蓝图，教助手如何执行特定工作流
   （例如创建响应式布局或编写测试）。

2. **Dart and Flutter MCP server**: A Model Context Protocol (MCP) server
   exposing real-time SDK diagnostics, symbol resolution, and runtime
   introspection to assistants.

   **Dart 与 Flutter MCP 服务器**：模型上下文协议 (MCP) 服务器，
   向助手提供实时 SDK 诊断、符号解析和运行时自省。

3. **Developer Knowledge MCP server**: A cloud-hosted documentation search
   server giving assistants direct access to official Flutter and Dart docs.

   **开发者知识 MCP 服务器**：云端文档搜索服务器，
   让助手可以直接访问官方 Flutter 与 Dart 文档。

4. **Package skills**: Skills published directly inside third-party `pub.dev`
   packages, giving assistants instant expertise on specific libraries.

   **Package 技能**：直接发布在第三方 `pub.dev` package 中的技能，
   让助手立刻掌握特定库的用法。

---

## Agent skills

## 智能体技能

[Agent skills](https://agentskills.io/) provide a standardized way to equip AI
assistants with procedural domain expertise.

[智能体技能](https://agentskills.io/) 提供了一种标准化方式，
为 AI 助手配备过程性的领域专业知识。

### Progressive disclosure

### 渐进式披露

Skills use **progressive disclosure** to conserve model context:

技能使用 **渐进式披露** 来节省模型上下文：

* **Discovery phase**: The assistant initially reads only skill metadata (name
  and short description) from the `.agents/skills` directory.

  **发现阶段**：助手最初只从 `.agents/skills` 目录
  读取技能元数据（名称和简短描述）。

* **Execution phase**: When the assistant determines a skill is relevant to
  your prompt, it loads the complete instructions (`SKILL.md`) and supporting
  reference scripts.

  **执行阶段**：当助手判断某项技能与你的提示相关时，
  它会加载完整说明（`SKILL.md`）以及配套的参考脚本。

### Official skills repositories

### 官方技能仓库

* [**flutter/agent-plugins**](https://github.com/flutter/agent-plugins):
  Provides skills for Flutter development, including widget construction,
  declarative navigation, responsive design, and state management.

  [**flutter/agent-plugins**](https://github.com/flutter/agent-plugins)：
  提供 Flutter 开发技能，包括 widget 构建、
  声明式导航、响应式设计和状态管理。

* [**dart-lang/skills**](https://github.com/dart-lang/skills): Provides skills
  for Dart development, including unit test authoring, dependency resolution,
  and static analysis remediation.

  [**dart-lang/skills**](https://github.com/dart-lang/skills)：
  提供 Dart 开发技能，包括编写单元测试、
  依赖解析和静态分析问题修复。

---

## Dart and Flutter MCP server

## Dart 与 Flutter MCP 服务器

The [Dart and Flutter MCP server](
https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server)
implements the open Model Context Protocol (MCP), connecting AI assistants to
live Dart SDK and Flutter tooling over standard I/O (stdio).

[Dart 与 Flutter MCP 服务器](
https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server)
实现了开放的模型上下文协议 (MCP)，
通过标准输入输出 (stdio) 把 AI 助手连接到
正在运行的 Dart SDK 与 Flutter 工具。

Key capabilities provided by the MCP server include:

MCP 服务器提供的关键能力包括：

* **Static analysis & diagnostics**: Inspect and fix analyzer errors and
  warnings across your project.

  **静态分析与诊断**：检查并修复整个项目中的分析器错误和警告。

* **Symbol resolution**: Resolve symbols to their definitions, signatures, and
  documentation.

  **符号解析**：把符号解析到其定义、签名和文档。

* **Runtime introspection**: Query the state of a running Flutter application
  during active debugging sessions.

  **运行时自省**：在正在进行的调试会话中，
  查询运行中的 Flutter 应用的状态。

* **Package management**: Search [pub.dev](https://pub.dev) and manage
  dependencies in `pubspec.yaml`.

  **Package 管理**：搜索 [pub.dev](https://pub.dev)，
  并管理 `pubspec.yaml` 中的依赖。

* **Testing & formatting**: Execute unit and widget tests and format code using
  `dart format` rules.

  **测试与格式化**：运行单元测试和 widget 测试，
  并按 `dart format` 规则格式化代码。

---

## Developer Knowledge MCP server

## 开发者知识 MCP 服务器

While the local Dart and Flutter MCP server focuses on local codebase analysis
and runtime debugging, you can also equip your assistant with search access to
official online documentation.

本地的 Dart 与 Flutter MCP 服务器专注于本地代码库分析和运行时调试，
你还可以为助手配备对官方在线文档的搜索能力。

The [Developer Knowledge MCP server](
https://developers.google.com/knowledge/mcp)
connects AI assistants to Google's developer documentation corpus, including
[docs.flutter.dev](https://docs.flutter.dev),
[dart.dev](https://dart.dev), and official API references. This allows
assistants to retrieve up-to-date guides, migration notes, and API references
directly during conversation.

[开发者知识 MCP 服务器](https://developers.google.com/knowledge/mcp)
把 AI 助手连接到 Google 的开发者文档库，包括
[docs.flutter.dev](https://docs.flutter.dev)、
[dart.dev](https://dart.dev) 以及官方 API 参考。
助手因此可以在对话中直接获取最新指南、迁移说明和 API 参考。

---

## Package skills

## Package 技能

In addition to core Flutter skills, library authors can bundle official skills
directly inside their packages on [pub.dev](https://pub.dev).

除了核心 Flutter 技能，库作者还可以把官方技能
直接打包进 [pub.dev](https://pub.dev) 上的 package。

When you add a dependency to your project, you can discover and install its
skills using the `skills` CLI:

当你向项目添加依赖后，可以用 `skills` CLI
发现并安装它的技能：

```bash
dart run skills@ get
```

To learn how to install or publish package skills, check out
[Package skills](/ai/package-skills).

要了解如何安装或发布 package 技能，请查阅
[Package 技能](/ai/package-skills)。

---

## When to use what

## 如何选用

Use the following mental model to understand how different AI mechanisms
interact:

可以按下面的方式理解不同 AI 机制如何配合：

| <t>Mechanism</t><t>机制</t> | <t>Scope and behavior</t><t>范围与行为</t> | <t>Best suited for</t><t>最适合</t> |
| :--- | :--- | :--- |
| **Agent skill** | On demand | Multi-step recipes, patterns |
| **智能体技能** | 按需 | 多步骤方法、模式 |
| **Dart MCP server** | Local SDK tools | Diagnostics, tests, runtime |
| **Dart MCP 服务器** | 本地 SDK 工具 | 诊断、测试、运行时 |
| **Developer Knowledge MCP** | Online search | Live docs, API references |
| **开发者知识 MCP** | 在线搜索 | 最新文档、API 参考 |
| **Package skill** | From dependencies | Library APIs, code generation |
| **Package 技能** | 来自依赖 | 库 API、代码生成 |

{:.table .table-striped}

## Next steps

## 后续步骤

* Follow the [Get started with AI](/ai/get-started) guide to install official
  plugins in your editor.

  按照 [AI 入门](/ai/get-started) 指南，
  在编辑器中安装官方插件。

* Learn how to consume and publish [Package skills](/ai/package-skills).

  了解如何使用和发布 [Package 技能](/ai/package-skills)。
