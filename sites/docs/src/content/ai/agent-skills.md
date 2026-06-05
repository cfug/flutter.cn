---
# title: Agent skills for Flutter and Dart
title: Flutter 与 Dart 的 Agent Skills
# sidenav: ai
sidenav: ai
# shortTitle: Agent skills
shortTitle: Agent skills
# description: >-
#   Learn how to give AI agents new capabilities and expertise
#   using Agent Skills.
description: >-
  了解如何使用 Agent Skills 为 AI 智能体赋予新能力与专业知识。
ai-translated: true
---

This guide covers how to enhance your AI agents and coding assistants
with domain-specific capabilities using Agent Skills.

本指南介绍如何使用 Agent Skills 为 AI 智能体与编程助手增强领域特定能力。

## Overview

## 概述

AI agents can write Flutter and Dart code, but they sometimes are unaware of
tools and best practices that professional developers use.

AI 智能体可以编写 Flutter 与 Dart 代码，但有时不了解专业开发者使用的工具与最佳实践。

[Agent Skills](https://agentskills.io/) help solve this problem by providing a
standardized way to give your AI agent a set of task-oriented blueprints to
follow. By giving the agent actual domain expertise and repeatable workflows,
you drastically reduce mistakes and can enforce consistent patterns.

[Agent Skills](https://agentskills.io/) 通过标准化方式为 AI 智能体提供面向任务的蓝图集合来解决这一问题。
为智能体提供真正的领域专业知识与可重复工作流，可大幅减少错误并落实一致的模式。

To understand how Agent Skills fit into your workflow, consider how they compare
to other AI capabilities:

要理解 Agent Skills 如何融入工作流，可将其与其他 AI 能力对比：

*   **Rules files:** While [rules files](/ai/ai-rules) configure the agent's
    general behavior across all tasks, Agent Skills give the AI step-by-step
    instructions for one specific job.

  **规则文件：** [规则文件](/ai/ai-rules) 配置智能体在所有任务中的一般行为，
    而 Agent Skills 为某一具体工作提供分步指令。
*   **Model Context Protocol (MCP):** The [Dart and Flutter MCP
    server](/ai/mcp-server) gives your agent access to specialized tools. If MCP
    provides the raw machinery, an Agent Skill provides the professional
    know-how to operate that machinery correctly.

  **Model Context Protocol (MCP)：** [Dart 与 Flutter MCP 服务器](/ai/mcp-server) 为智能体提供专用工具访问。
    若 MCP 提供原始机制，Agent Skill 则提供正确操作该机制的专业知识。

Skills use what we call "progressive disclosure," which is similar to deferred
loading in Flutter. Instead of loading every single instruction into the context
window up front, the agent only reads the metadata first. It pulls in the heavy,
detailed instructions only when it actually needs them for the task at hand.

Skills 使用我们称为「渐进式披露」的机制，类似 Flutter 中的延迟加载。
智能体不会一次性将全部指令载入上下文窗口，而是先只读取元数据，
仅在当前任务实际需要时才拉取详尽指令。

## Official repositories

## 官方仓库

The Dart and Flutter teams maintain official repositories packed with skills
tailored specifically for our frameworks.

Dart 与 Flutter 团队维护面向本框架定制的官方 Skills 仓库。

*   **[dart-lang/skills](https://github.com/dart-lang/skills)**: Provides skills
    for Dart development. Use these to generate unit tests, resolve package
    dependencies, and fix static analysis errors.

  **[dart-lang/skills](https://github.com/dart-lang/skills)**：提供 Dart 开发相关 skills。
    可用于生成单元测试、解决软件包依赖并修复静态分析错误。
*   **[flutter/skills](https://github.com/flutter/skills)**: Provides skills for
    Flutter development. These skills help the AI build responsive layouts, wire
    up declarative routing, and implement JSON serialization.

  **[flutter/skills](https://github.com/flutter/skills)**：提供 Flutter 开发相关 skills。
    这些 skills 帮助 AI 构建响应式布局、接入声明式路由并实现 JSON 序列化。

## Getting started

## 入门

By default, compatible AI agents discover Agent Skills within the
`.agents/skills` directory of your project workspace.

默认情况下，兼容的 AI 智能体会在项目工作区的 `.agents/skills` 目录中发现 Agent Skills。

To easily download and manage skills in that folder, you can use the `skills`
CLI tool. It's distributed through npm, so you'll need
[Node.js](https://nodejs.org/) installed to run it with `npx`.

要方便地下载并管理该文件夹中的 skills，可使用 `skills` CLI 工具。
它通过 npm 分发，因此需要安装 [Node.js](https://nodejs.org/) 才能用 `npx` 运行。

To install the official Flutter skills:

安装官方 Flutter skills：

```bash
npx skills add flutter/skills --skill '*' --agent universal
```

To install the official Dart skills:

安装官方 Dart skills：

```bash
npx skills add dart-lang/skills --skill '*' --agent universal
```

Running these commands automatically creates the `.agents/skills` directory and
downloads the requested skills into your project.

运行这些命令会自动创建 `.agents/skills` 目录，
并将请求的 skills 下载到项目中。

For more details on available skills, updating, and contributing, see the
[Dart skills repository](https://github.com/dart-lang/skills) and the
[Flutter skills repository](https://github.com/flutter/skills).

有关可用 skills、更新与贡献的更多详情，请参阅
[Dart skills 仓库](https://github.com/dart-lang/skills) 与
[Flutter skills 仓库](https://github.com/flutter/skills)。

:::tip
Once you've added skills to your project, try asking your AI agent to review
the `.agents/skills` directory. You can ask, "Which of my installed skills
can help me with [your current task]?" or "Summarize the capabilities of the
skills I have available."
:::

:::tip
将 skills 添加到项目后，可请 AI 智能体查看 `.agents/skills` 目录。
你可以问：「我安装的哪些 skills 能帮助我完成 [你当前的任务]？」
或「总结我可用 skills 的能力。」
:::
