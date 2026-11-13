---
# title: Get started developing with AI
title: 开始使用 AI 开发
# shortTitle: Get started
shortTitle: 入门
# description: >-
#   Learn how to set up and use AI agent plugins for Flutter and Dart
#   using your preferred coding assistant.
description: >-
  了解如何使用你偏好的编程助手，
  配置并使用面向 Flutter 与 Dart 的 AI 智能体插件。
ai-translated: true
---

AI coding assistants can accelerate your Flutter development workflow by
writing code, fixing errors, and building complete features.

AI 编程助手可以编写代码、修复错误并构建完整功能，
从而加快你的 Flutter 开发流程。

By default, general-purpose AI assistants might not have the latest context on
Flutter patterns, project diagnostics, or third-party packages. Installing the
official Flutter agent plugin equips your assistant with dedicated tools and
recipes tailored for Flutter and Dart development.

默认情况下，通用 AI 助手可能缺少 Flutter 模式、
项目诊断或第三方 package 的最新上下文。
安装官方 Flutter 智能体插件后，
助手会获得专为 Flutter 与 Dart 开发准备的工具和方法。

## How Flutter AI plugins work

## Flutter AI 插件如何工作

An **agent plugin** bundles the tools and knowledge that an AI assistant needs
to understand and modify your Flutter codebase.

**智能体插件** 把 AI 助手理解和修改
Flutter 代码库所需的工具与知识放在一起。

When you install an official Flutter agent plugin, it connects your assistant
to two core capabilities:

安装官方 Flutter 智能体插件后，
它会把助手连接到两项核心能力：

* **[Agent skills](/ai/tools#agent-skills)**: On-demand procedural guides from
  the official Flutter and Dart repositories that teach the assistant how to
  perform specific tasks, such as creating responsive layouts, managing state,
  or writing widget tests.

  **[智能体技能](/ai/tools#agent-skills)**：
  来自 Flutter 与 Dart 官方仓库的按需过程指南，
  教助手如何完成特定任务，
  例如创建响应式布局、管理状态或编写 widget 测试。

* **[Dart and Flutter MCP server](/ai/tools#dart-and-flutter-mcp-server)**:
  A Model Context Protocol (MCP) server that connects the assistant to the
  Dart SDK, giving it real-time access to analyzer diagnostics, symbol
  resolution, test runners, and runtime inspection.

  **[Dart 与 Flutter MCP 服务器](/ai/tools#dart-and-flutter-mcp-server)**：
  模型上下文协议 (MCP) 服务器，把助手连接到 Dart SDK，
  使其能实时获取分析器诊断、符号解析、测试运行器和运行时检查。

These tools work together automatically: the assistant uses MCP tools to query
live project state and static analysis, while using agent skills to guide its
coding strategies and best practices.

这些工具会自动配合：助手用 MCP 工具查询
实时项目状态和静态分析，
同时用智能体技能指导编码策略与最佳实践。

In addition to core Flutter plugins, you can also equip your assistant with
skills that are shipped directly by third-party `pub.dev`
packages using the [skills](/ai/package-skills) package.

除了核心 Flutter 插件，你还可以借助 [skills](/ai/package-skills) package，
为助手配备第三方 `pub.dev` package 直接附带的技能。

To learn more about the underlying architecture and capabilities of each tool,
check out [How Flutter AI tools work](/ai/tools).

要进一步了解各项工具的底层架构与能力，
请查阅 [Flutter AI 工具如何工作](/ai/tools)。

## Choose your AI coding agent

## 选择你的 AI 编程智能体

Select your agent below for instructions on how to install official plugins
and configure tools for Flutter development.

在下方选择你的智能体，查看如何安装官方插件
并为 Flutter 开发配置工具。

<Tabs key="ai-agent-tabs" wrapped="true">

<Tab name="Antigravity">

[Antigravity](
https://antigravity.google/docs/build-with-google/#dart-and-flutter)
is an agentic development platform by Google that includes the Antigravity
IDE, IDE extensions (for VS Code and other editors), and the Antigravity CLI.

[Antigravity](
https://antigravity.google/docs/build-with-google/#dart-and-flutter)
是 Google 的智能体开发平台，包含 Antigravity IDE、
面向 VS Code 及其他编辑器的 IDE 扩展，以及 Antigravity CLI。

**Antigravity IDE and extensions**

**Antigravity IDE 与扩展**

Equip the Antigravity IDE or Antigravity extension (such as in VS Code)
with official Dart and Flutter tools:

为 Antigravity IDE 或 Antigravity 扩展（例如在 VS Code 中）
配备官方 Dart 与 Flutter 工具：

1. Open **Settings** in Antigravity by clicking the gear icon or pressing
   <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>,</kbd>.

   点击齿轮图标，或按
   <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>,</kbd>，
   在 Antigravity 中打开 **设置**。

1. Click the **Customizations** tab.

   点击 **自定义** 标签页。

1. In the **Build with Google Plugins** section, click **Customize**.

   在 **Build with Google Plugins** 部分，点击 **自定义**。

1. Click **Download** next to the **Dart and Flutter** integration.

   在 **Dart and Flutter** 集成旁点击 **下载**。

To verify the installation, open the **Agent** panel
(<kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>) and ask the agent:

要验证安装，打开 **Agent** 面板
（<kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>），
然后询问智能体：

```text
Summarize the Dart and Flutter tools and skills available in this project.
```

**Antigravity CLI**

**Antigravity CLI 命令行**

The Antigravity CLI runs as the `agy` command in your terminal.

Antigravity CLI 在终端中以 `agy` 命令运行。

1. Configure the Dart and Flutter MCP server in your project's
   `.agents/mcp_config.json` file (or globally in
   `~/.gemini/config/mcp_config.json`):

   在项目的 `.agents/mcp_config.json` 文件中
   （或全局的 `~/.gemini/config/mcp_config.json` 中）
   配置 Dart 与 Flutter MCP 服务器：

   ```json
   {
     "mcpServers": {
       "dart": {
         "command": "dart",
         "args": ["mcp-server"]
       }
     }
   }
   ```

1. Install official Flutter and Dart skills into your workspace:

   把官方 Flutter 与 Dart 技能安装到工作区：

   ```bash
   # Install Flutter skills
   npx skills add flutter/agent-plugins --skill '*' --agent universal --yes

   # Install Dart skills
   npx skills add dart-lang/skills --skill '*' --agent universal --yes
   ```

1. Start an interactive session in your project root:

   在项目根目录启动交互式会话：

   ```bash
   agy
   ```

</Tab>

<Tab name="Claude Code">

[Claude Code](https://code.claude.com/) is an agentic coding assistant from
Anthropic that runs in your terminal.

[Claude Code](https://code.claude.com/) 是 Anthropic 推出的智能体编程助手，
在终端中运行。

**Install the official plugin**

**安装官方插件**

Equip Claude Code with official Flutter and Dart skills and MCP configuration:

为 Claude Code 配备官方 Flutter 与 Dart 技能以及 MCP 配置：

1. Add the marketplace for Claude Code plugins:

   添加 Claude Code 插件市场：

   ```bash
   claude plugin marketplace add flutter/agent-plugins
   ```

1. Install the Flutter and Dart plugin:

   安装 Flutter 与 Dart 插件：

   ```bash
   claude plugin install dart-flutter@dart-flutter
   ```

**Verify installation**

**验证安装**

Verify that the plugin is active in Claude Code:

验证插件已在 Claude Code 中启用：

```bash
claude plugin marketplace list
```

</Tab>

<Tab name="Cursor">

[Cursor](https://cursor.com/) is an AI-powered code editor built on top of
VS Code.

[Cursor](https://cursor.com/) 是基于 VS Code 构建的 AI 代码编辑器。

**Install the local plugin**

**安装本地插件**

You can install the official plugin bundle locally by copying it to your Cursor
plugins directory:

你可以把官方插件包复制到 Cursor 的插件目录，从而在本地安装：

1. Clone the repository:

   克隆仓库：

   ```bash
   git clone https://github.com/flutter/agent-plugins.git
   ```

1. Copy the repository to your local Cursor plugins folder:

   把仓库复制到本地 Cursor 插件文件夹：

   ```bash
   mkdir -p ~/.cursor/plugins/local
   cp -r agent-plugins ~/.cursor/plugins/local/dart-flutter
   ```

1. Restart Cursor. The editor automatically discovers the bundled skills and
   configures the Dart and Flutter MCP server.

   重启 Cursor。编辑器会自动发现附带的技能，
   并配置 Dart 与 Flutter MCP 服务器。

</Tab>

<Tab name="Codex">

[Codex](https://chatgpt.com/codex) is an agentic coding assistant designed for
terminal and IDE workflows.

[Codex](https://chatgpt.com/codex) 是面向终端与 IDE 工作流的智能体编程助手。

**Install the official plugin**

**安装官方插件**

Equip Codex with official Flutter and Dart skills and MCP configuration:

为 Codex 配备官方 Flutter 与 Dart 技能以及 MCP 配置：

1. Add the Dart and Flutter marketplace for Codex plugins:

   添加 Codex 插件的 Dart 与 Flutter 市场：

   ```bash
   codex plugin marketplace add flutter/agent-plugins
   ```

1. Install the Dart and Flutter plugin:

   安装 Dart 与 Flutter 插件：

   ```bash
   codex plugin add dart-flutter@dart-flutter
   ```

**Verify installation**

**验证安装**

Verify that the plugin is active in Codex:

验证插件已在 Codex 中启用：

```bash
codex plugin list
```

</Tab>

<Tab name="GitHub Copilot">

[GitHub Copilot](https://github.com/features/copilot) in VS Code supports
agentic coding, tool calling via MCP, and custom workspace instructions.

VS Code 中的 [GitHub Copilot](https://github.com/features/copilot)
支持智能体式编程、通过 MCP 调用工具，以及自定义工作区指令。

**Configure the MCP server**

**配置 MCP 服务器**

1. Ensure the **Model Context Protocol (MCP)** extension is enabled in VS Code.

   确保已在 VS Code 中启用 **模型上下文协议 (MCP)** 扩展。

1. Create or open `.vscode/mcp.json` in your workspace and add the Dart MCP
   server:

   在工作区中创建或打开 `.vscode/mcp.json`，并添加 Dart MCP 服务器：

   ```json
   {
     "servers": {
       "dart": {
         "command": "dart",
         "args": ["mcp-server"]
       }
     }
   }
   ```

**Install agent skills**

**安装智能体技能**

In your Flutter project root, install official skills using the universal flag:

在 Flutter 项目根目录，使用 universal 标志安装官方技能：

```bash
# Install Flutter skills
npx skills add flutter/agent-plugins --skill '*' --agent universal --yes

# Install Dart skills
npx skills add dart-lang/skills --skill '*' --agent universal --yes
```

</Tab>

<Tab name="Other">

If you're using another coding assistant (such as Windsurf, Zed, or Cline)
that supports the Model Context Protocol (MCP) or Agent Skills specification,
configure the tools manually.

如果你使用的是其他编程助手（例如 Windsurf、Zed 或 Cline），
并且它支持模型上下文协议 (MCP) 或 Agent Skills 规范，
请手动配置这些工具。

**Configure the MCP server**

**配置 MCP 服务器**

Most MCP-compatible clients use a standard JSON configuration format. Add the
following entry to your client's MCP configuration file:

大多数兼容 MCP 的客户端使用标准 JSON 配置格式。
请把以下条目添加到客户端的 MCP 配置文件：

```json
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": ["mcp-server"]
    }
  }
}
```

For client-specific setup guides, command-line arguments, and troubleshooting,
check out the [Dart and Flutter MCP server repository](
https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server).

如需特定客户端的设置指南、命令行参数和问题排查，
请查阅 [Dart 与 Flutter MCP 服务器仓库](
https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server)。

**Install agent skills**

**安装智能体技能**

Use the `skills` CLI to download skills into your workspace's standard
`.agents/skills` directory:

使用 `skills` CLI 把技能下载到工作区的标准
`.agents/skills` 目录：

```bash
# Install Flutter skills
npx skills add flutter/agent-plugins --skill '*' --agent universal --yes

# Install Dart skills
npx skills add dart-lang/skills --skill '*' --agent universal --yes
```

</Tab>

</Tabs>

## Next steps

## 后续步骤

* To learn more about how skills and tools interact, check out
  [How Flutter AI tools work](/ai/tools).

  要进一步了解技能与工具如何配合，请查阅
  [Flutter AI 工具如何工作](/ai/tools)。

* To publish or consume skills from dependencies, refer to
  [Package skills](/ai/package-skills).

  要发布或使用来自依赖的技能，请参阅
  [Package 技能](/ai/package-skills)。

* To give your assistant search access to official Flutter and Dart
  documentation, connect to the [Developer Knowledge MCP server](
  https://developers.google.com/knowledge/mcp).

  要让助手能够搜索官方 Flutter 与 Dart 文档，
  请连接到 [开发者知识 MCP 服务器](https://developers.google.com/knowledge/mcp)。

* To explore the official plugins, check out the
  [flutter/agent-plugins](https://github.com/flutter/agent-plugins) repository.

  要了解官方插件，请查阅
  [flutter/agent-plugins](https://github.com/flutter/agent-plugins) 仓库。
