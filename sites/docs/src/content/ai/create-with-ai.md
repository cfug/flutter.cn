---
# title: Create with AI
title: 使用 AI 创建
# sidenav: ai
sidenav: ai
# description: >
#   Learn how to use AI to build Flutter apps, from powerful SDKs that integrate
#   AI features directly into your app to tools that accelerate your development
#   workflow.
description: >
  了解如何使用 AI 构建 Flutter 应用：从将 AI 功能直接集成到应用中的强大 SDK，
  到加速开发工作流的工具。
ai-translated: true
---

This guide covers how you can leverage AI tools to build AI-powered
features for your Flutter apps and streamline your
Flutter and Dart development.

本指南介绍如何利用 AI 工具为 Flutter 应用构建 AI 驱动功能，
并简化 Flutter 与 Dart 开发流程。

AI can be used for building AI-powered apps with Flutter
and for accelerating your development workflow.

AI 既可用于用 Flutter 构建 AI 驱动应用，
也可用于加速开发工作流。

You can integrate AI-powered features like natural language understanding
and content generation directly into your Flutter app
using powerful SDKs, like the Firebase SDK for Generative AI.

你可以使用 Firebase 生成式 AI SDK 等强大 SDK，
将自然语言理解与内容生成等 AI 功能直接集成到 Flutter 应用中。

You can also use AI tools, such as Gemini Code Assist and Gemini CLI,
to help with code generation and scaffolding.

你还可以使用 Gemini Code Assist、Gemini CLI 等 AI 工具，
辅助代码生成与项目脚手架搭建。

These tools are powered by the Dart and Flutter MCP server,
which provides AI with a rich context about your codebase.

这些工具由 Dart 与 Flutter MCP 服务器驱动，
为 AI 提供关于代码库的丰富上下文。

The Flutter Extension for Gemini CLI makes it easy to leverage official rules,
the MCP server, and custom commands for building your app.

适用于 Gemini CLI 的 Flutter 扩展便于你使用官方规则、
MCP 服务器与自定义命令来构建应用。

Additionally, rules files help fine-tune the AI's behavior
and enforce project-specific best practices.

此外，规则文件有助于微调 AI 行为，
并落实项目特定的最佳实践。

## Build AI-powered experiences with Flutter

## 使用 Flutter 构建 AI 驱动体验

Using AI in your Flutter app unlocks new user experiences that allow your app to
support natural language understanding and content generation.

在 Flutter 应用中使用 AI 可解锁新用户体验，
使应用支持自然语言理解与内容生成。

To get started building AI-powered experiences in Flutter, check out these
resources:

要在 Flutter 中开始构建 AI 驱动体验，请参阅以下资源：

* [Firebase AI Logic Showcase][] - An application that demonstrates Firebase
  AI Logic capabilities through a series of interactive demos.

  [Firebase AI Logic Showcase][] — 通过一系列交互式演示展示 Firebase AI Logic 能力的应用。

* [Firebase AI Logic][] - The official Firebase SDK for using generative AI
  features directly in Flutter. Compatible with the Gemini Developer API or
  Vertex AI. To get started, check out the
  [official documentation][firebase-ai-logic-docs].

  [Firebase AI Logic][] — 在 Flutter 中直接使用生成式 AI 功能的官方 Firebase SDK。
  兼容 Gemini Developer API 或 Vertex AI。入门请参阅
  [官方文档][firebase-ai-logic-docs]。

* [Genkit Dart][] - An open-source framework for building AI-powered
  features in Dart and Flutter with support for multiple model providers,
  type-safe schemas, and built-in observability. To get started, check out the
  [quickstart guide][genkit-dart-quickstart].

  [Genkit Dart][] — 在 Dart 与 Flutter 中构建 AI 功能的开源框架，
  支持多种模型提供商、类型安全 schema 与内置可观测性。入门请参阅
  [快速入门指南][genkit-dart-quickstart]。

* [Flutter AI Toolkit][] - A sample app with pre-built widgets to help you build
  AI-powered features in Flutter.

  [Flutter AI Toolkit][] — 附带预构建 widget 的示例应用，帮助你在 Flutter 中构建 AI 功能。

[Firebase AI Logic]: {{site.firebase}}/docs/ai-logic
[Firebase AI Logic Showcase]: {{site.github}}/flutter/demos/tree/main/firebase_ai_logic_showcase
[firebase-ai-logic-docs]: {{site.firebase}}/docs/ai-logic/get-started
[Genkit Dart]: https://genkit.dev
[genkit-dart-quickstart]: https://genkit.dev/docs/dart/get-started
[Flutter AI Toolkit]: /ai/ai-toolkit

## AI development tools

## AI 开发工具

AI isn't only a feature in your app, but can also be a powerful assistant in
your development workflow.  Tools like [Antigravity][],
[Gemini Code Assist][], [Gemini CLI][], [Claude Code][],
[Cursor][], and [Windsurf][] can help you write code faster, understand complex
concepts, and reduce boilerplate.

AI 不仅是应用中的功能，也可成为开发工作流中的得力助手。
[Antigravity][]、[Gemini Code Assist][]、[Gemini CLI][]、[Claude Code][]、
[Cursor][] 与 [Windsurf][] 等工具能帮你更快写代码、理解复杂概念并减少样板代码。

[Antigravity]: /ai/coding-assistants
[Gemini Code Assist]: /ai/coding-assistants
[Gemini CLI]: /ai/coding-assistants
[Claude Code]: https://www.claude.com/product/claude-code
[Cursor]: https://cursor.com/
[Windsurf]: https://windsurf.com/

### GenUI SDK for Flutter {: #genui }

### 适用于 Flutter 的 GenUI SDK {: #genui }

The GenUI SDK transforms text-based conversations into rich,
interactive experiences. Essentially, it acts as an orchestration layer
that coordinates the flow of information between your user, your
Flutter widgets, and an AI agent.

GenUI SDK 将基于文本的对话转化为丰富的交互体验。
本质上，它作为编排层，协调用户、Flutter widget 与 AI 智能体之间的信息流。

<YouTubeEmbed id="nWr6eZKM6no" title="Getting started with GenUI"></YouTubeEmbed>

:::experimental
The `genui` package is in
alpha and is likely to change.
:::

:::experimental
`genui` 软件包处于 alpha 阶段，可能会发生变化。
:::

To learn more, visit the [GenUI SDK for Flutter][] documentation.

了解更多请访问 [适用于 Flutter 的 GenUI SDK][GenUI SDK for Flutter] 文档。

[GenUI SDK for Flutter]: /ai/genui

### Genkit Dart

### Genkit Dart

[Genkit Dart](https://genkit.dev) is an open-source, model-agnostic framework
for building AI-powered applications in Dart and Flutter.
It provides a structured way to integrate AI features into your app
with support for multiple model providers, including
Google Gemini, Anthropic Claude, and OpenAI.

[Genkit Dart](https://genkit.dev) 是用于在 Dart 与 Flutter 中构建 AI 应用的开源、与模型无关的框架。
它提供结构化方式将 AI 功能集成到应用中，
并支持 Google Gemini、Anthropic Claude、OpenAI 等多种模型提供商。

Key features include:

主要特性包括：

*   **Model-agnostic API**: Switch between AI providers with minimal code changes.

    **与模型无关的 API**：以最少代码变更在不同 AI 提供商之间切换。

*   **Type-safe schemas**: Define strongly-typed inputs and outputs for AI
    interactions using the [`schemantic`](https://pub.dev/packages/schemantic) package.

    **类型安全 schema**：使用 [`schemantic`](https://pub.dev/packages/schemantic) 软件包为 AI 交互定义强类型输入与输出。

*   **Flows**: Testable, observable, and deployable functions that wrap
    AI logic with typed inputs and outputs.

    **Flows**：可测试、可观测、可部署的函数，以类型化输入输出封装 AI 逻辑。

*   **Tools**: Define functions that models can invoke to fetch live data
    or perform actions.

    **Tools**：定义模型可调用的函数以获取实时数据或执行操作。

*   **Developer UI**: A built-in web UI for testing prompts, viewing execution
    traces, and debugging flows.

    **开发者 UI**：内置 Web UI，用于测试提示词、查看执行轨迹与调试 flow。

Genkit Dart supports multiple deployment architectures for Flutter,
including running AI logic entirely in the app,
calling backend flows from Flutter, or proxying model requests
through a Genkit backend.

Genkit Dart 支持 Flutter 的多种部署架构，
包括在应用内完全运行 AI 逻辑、从 Flutter 调用后端 flow，
或通过 Genkit 后端代理模型请求。

To get started, check out the
[Genkit Dart quickstart](https://genkit.dev/docs/dart/get-started).

入门请参阅 [Genkit Dart 快速入门](https://genkit.dev/docs/dart/get-started)。

### Antigravity

### Antigravity

[Antigravity](https://antigravity.google/) is an in-IDE AI agent that can read and write code, run
terminal commands, and help you build complex features. Some of its capabilities
include:

[Antigravity](https://antigravity.google/) 是一款 IDE 内的 AI 智能体，可以读写代码、运行终端命令，并帮助你构建复杂功能。部分能力包括：

*   **Agentic capabilities**: Unlike chat-based assistants, Antigravity can
    proactively edit files and run terminal commands to complete tasks.

    **智能体能力**：与基于聊天的助手不同，Antigravity 可主动编辑文件并运行终端命令以完成任务。

*   **Complex reasoning**: It can plan and execute multi-step workflows which
    makes it suitable for larger refactors or feature implementations.

    **复杂推理**：它能规划并执行多步工作流，适合较大规模的重构或功能实现。

*   **Verification**: It can run tests and verify its own changes to ensure
    correctness.

    **验证**：它能运行测试并验证自身修改，以确保正确性。

<YouTubeEmbed
  id="YY2w2JEX2xk"
  title="Flutter + Antigravity in 10 minutes">
</YouTubeEmbed>

To learn more, check out the [AI Coding Assistants](/ai/coding-assistants) guide.

了解更多请参阅 [AI 编程助手](/ai/coding-assistants) 指南。

### Gemini Code Assist

### Gemini Code Assist

[Gemini Code Assist](https://codeassist.google/) is an AI-powered collaborator available for IDEs like
Visual Studio Code, JetBrains IDEs, and Android Studio. It has a deep
understanding of your project's codebase and can help you with:

[Gemini Code Assist](https://codeassist.google/) 是适用于 Visual Studio Code、JetBrains IDE、Android Studio 等 IDE 的 AI 协作工具。它深度理解项目代码库，可帮助你：

* **Code completion and generation**: It suggests and generates entire blocks of
  code based on the context of what you're writing.

  **代码补全与生成**：根据你正在编写的内容的上下文建议并生成完整代码块。

* **In-editor chat**: You can ask questions about your code, Flutter concepts,
  or best practices directly within your IDE.

  **编辑器内聊天**：你可以在 IDE 内直接询问代码、Flutter 概念或最佳实践相关问题。

* **Debugging and explanation**: If you encounter an error, you can ask Gemini
  Code Assist to explain it and suggest a fix.

  **调试与解释**：遇到错误时，可请 Gemini Code Assist 解释并建议修复方案。

To learn more, check out the [AI Coding Assistants](/ai/coding-assistants) guide.

了解更多请参阅 [AI 编程助手](/ai/coding-assistants) 指南。

### Gemini CLI

### Gemini CLI

The [Gemini CLI](https://geminicli.com/) is a command-line AI workflow tool. It allows you to interact
with Gemini models for a variety of tasks without leaving your development
environment. You can use it to:

[Gemini CLI](https://geminicli.com/) 是一款命令行 AI 工作流工具。你无需离开开发环境即可与 Gemini 模型交互以完成多种任务。你可以用它：

* Quickly scaffold a new Flutter widget, Dart function, or a complete app.

  快速搭建新的 Flutter widget、Dart 函数或完整应用。

* Use MCP server tools, such as the Dart and Flutter MCP server

  使用 MCP 服务器工具，例如 Dart 与 Flutter MCP 服务器

* Automate tasks like committing and pushing changes to a Git repository

  自动化提交并将变更推送到 Git 仓库等任务

To get started, visit the [Gemini CLI](https://geminicli.com/) website, or try this
[Gemini CLI codelab][].

入门请访问 [Gemini CLI](https://geminicli.com/) 网站，或尝试这篇 [Gemini CLI codelab][]。

[Gemini CLI codelab]: https://codelabs.developers.google.cn/gemini-cli-hands-on

#### Flutter extension for Gemini CLI

#### 适用于 Gemini CLI 的 Flutter 扩展

The [Flutter extension for Gemini CLI][flutter-extension] combines the
[Dart and Flutter MCP server][dart-mcp-dart-docs] with rules and commands.
It uses the default set of [AI rules for Flutter and Dart][],
adds commands like `/create-app` and `/modify` to make
structured changes to your app, and automatically configures the
[Dart and Flutter MCP server][dart-mcp-dart-docs].

[适用于 Gemini CLI 的 Flutter 扩展][flutter-extension] 将
[Dart 与 Flutter MCP 服务器][dart-mcp-dart-docs] 与规则和命令结合。
它使用默认的 [Flutter 与 Dart AI 规则][AI rules for Flutter and Dart]，
并添加 `/create-app`、`/modify` 等命令以对应用进行结构化修改，
同时自动配置 [Dart 与 Flutter MCP 服务器][dart-mcp-dart-docs]。

You can install it by running the following command:

运行以下命令即可安装：

```bash
gemini extensions install https://github.com/gemini-cli-extensions/flutter
```

To learn more, check out
[Flutter extension for Gemini CLI](/ai/gemini-cli-extension).

了解更多请参阅
[适用于 Gemini CLI 的 Flutter 扩展](/ai/gemini-cli-extension)。

[flutter-extension]: {{site.github}}/gemini-cli-extensions/flutter
[dart-mcp-dart-docs]: /ai/mcp-server
[AI rules for Flutter and Dart]: /ai/ai-rules

### Dart and Flutter MCP server

### Dart 与 Flutter MCP 服务器

To provide assistance during Flutter development, AI tools
need to communicate with Dart and Flutter's developer tools.
The Dart and Flutter MCP server facilitates this communication.
The MCP (model context protocol) specification outlines how
development tools can share the context of a user's code with an AI model,
which allows the AI to better understand and interact with the code.

要在 Flutter 开发中提供辅助，AI 工具需要与 Dart 与 Flutter 开发者工具通信。
Dart 与 Flutter MCP 服务器促成这一通信。
MCP（model context protocol，模型上下文协议）规范说明开发工具如何与 AI 模型共享用户代码上下文，
从而使 AI 更好地理解并与代码交互。

The Dart and Flutter MCP server unlocks the full potential of your AI assistant
by connecting it directly to your development environment. It enables the AI to:

Dart 与 Flutter MCP 服务器将 AI 助手直接连接到开发环境，释放其全部潜力。它使 AI 能够：

*   **Introspect the widget tree**: Visualize and debug layout issues in your running app.

    **内省 widget 树**：可视化并调试运行中应用的布局问题。

*   **Manage dependencies**: Search pub.dev for packages and add them to your project.

    **管理依赖**：在 pub.dev 搜索软件包并添加到项目。

*   **Control the runtime**: Trigger hot reloads and restarts to see changes instantly.

    **控制运行时**：触发热重载与重启以即时查看变更。

*   **Fix complex errors**: Analyze static and runtime errors with deep context.

    **修复复杂错误**：结合深度上下文分析静态与运行时错误。

This bridges the gap between the AI's natural language understanding,
and Dart and Flutter's suite of developer tools.

这在 AI 的自然语言理解与 Dart、Flutter 开发者工具套件之间架起桥梁。

To get started, check out the official documentation for the
[Dart and Flutter MCP server][dart-mcp-dart-docs].

入门请参阅
[Dart 与 Flutter MCP 服务器][dart-mcp-dart-docs] 官方文档。

### Rules for Flutter and Dart

### Flutter 与 Dart 规则

You can use a rules file with AI-powered editors to provide
context and instructions to an underlying LLM. To get
started, visit the [AI rules for Flutter and Dart][] guide.

你可以在 AI 驱动的编辑器中使用规则文件，
为底层 LLM 提供上下文与指令。入门请参阅
[Flutter 与 Dart AI 规则][AI rules for Flutter and Dart] 指南。
