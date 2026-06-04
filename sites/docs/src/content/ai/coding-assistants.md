---
# title: AI Coding Assistants
title: AI 编程助手
# sidenav: ai
sidenav: ai
# description: >
#   Learn how to use AI-powered coding assistants like Antigravity and Gemini CLI
#   to accelerate your Flutter development.
description: >
  了解如何使用 Antigravity、Gemini CLI 等 AI 编程助手来加速 Flutter 开发。
ai-translated: true
---

AI tools are not only features in your app,
but can also be powerful assistants in your development workflow.

AI 工具不仅是应用中的功能，
也可以成为你开发流程中的得力助手。

Tools like Antigravity and Gemini CLI can help you write code faster,
understand complex concepts, and reduce boilerplate.

Antigravity、Gemini CLI 等工具能帮你更快写代码、
理解复杂概念，并减少样板代码。

## Antigravity

## Antigravity

[Antigravity](https://antigravity.google/) is an in-IDE AI agent that can read and write code, run terminal commands, and help you build complex features. Some of its capabilities include:

[Antigravity](https://antigravity.google/) 是一款 IDE 内的 AI 智能体，可以读写代码、运行终端命令，并帮助你构建复杂功能。部分能力包括：

*   **Agentic capabilities**: Unlike chat-based assistants, Antigravity can proactively edit files and run terminal commands to complete tasks.

    **智能体能力**：与基于聊天的助手不同，Antigravity 可主动编辑文件并运行终端命令以完成任务。

*   **Complex reasoning**: It can plan and execute multi-step workflows which makes it suitable for larger refactors or feature implementations.

    **复杂推理**：它能规划并执行多步工作流，适合较大规模的重构或功能实现。

*   **Verification**: It can run tests and verify its own changes to ensure correctness.

    **验证**：它能运行测试并验证自身修改，以确保正确性。

<YouTubeEmbed
  id="YY2w2JEX2xk"
  title="Flutter + Antigravity in 10 minutes">
</YouTubeEmbed>

## Gemini CLI

## Gemini CLI

The [Gemini CLI](https://geminicli.com/) is a command-line AI workflow tool. It allows you to interact with Gemini models for a variety of tasks without leaving your development environment. You can use it to:

[Gemini CLI](https://geminicli.com/) 是一款命令行 AI 工作流工具。你无需离开开发环境即可与 Gemini 模型交互以完成多种任务。你可以用它：

* Quickly scaffold a new Flutter widget, Dart function, or a complete app.

  快速搭建新的 Flutter widget、Dart 函数或完整应用。

* Use MCP server tools, such as the Dart and Flutter MCP server.

  使用 MCP 服务器工具，例如 Dart 与 Flutter MCP 服务器。

* Automate tasks like committing and pushing changes to a Git repository.

  自动化提交并将变更推送到 Git 仓库等任务。

To get started, visit the [Gemini CLI](https://geminicli.com/) website, or try this [Gemini CLI codelab](https://codelabs.developers.google.com/gemini-cli-hands-on).

入门请访问 [Gemini CLI](https://geminicli.com/) 网站，或尝试这篇 [Gemini CLI 动手实验](https://codelabs.developers.google.com/gemini-cli-hands-on)。

## Flutter extension for Gemini CLI

## 适用于 Gemini CLI 的 Flutter 扩展

The [Flutter extension for Gemini CLI]({{site.github}}/gemini-cli-extensions/flutter) combines the [Dart and Flutter MCP server]({{site.dart-site}}/tools/mcp-server) with rules and commands. It uses the default set of [AI rules for Flutter and Dart](/ai/ai-rules), adds commands like `/create-app` and `/modify` to make structured changes to your app, and automatically configures the [Dart and Flutter MCP server]({{site.dart-site}}/tools/mcp-server).

[适用于 Gemini CLI 的 Flutter 扩展]({{site.github}}/gemini-cli-extensions/flutter) 将 [Dart 与 Flutter MCP 服务器]({{site.dart-site}}/tools/mcp-server) 与规则和命令结合。它使用默认的 [Flutter 与 Dart AI 规则](/ai/ai-rules)，并添加 `/create-app`、`/modify` 等命令以对应用进行结构化修改，同时自动配置 [Dart 与 Flutter MCP 服务器]({{site.dart-site}}/tools/mcp-server)。

You can install it by running the following command:

运行以下命令即可安装：

```bash
gemini extensions install https://github.com/gemini-cli-extensions/flutter
```

To learn more, check out [Flutter extension for Gemini CLI](/ai/gemini-cli-extension).

了解更多请参阅 [适用于 Gemini CLI 的 Flutter 扩展](/ai/gemini-cli-extension)。
