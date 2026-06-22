---
# title: Antigravity CLI
title: Antigravity CLI
shortTitle: CLI
sidenav: ai
# description: Learn how to use the Antigravity CLI for Dart and Flutter.
description: 了解如何将 Antigravity CLI 用于 Dart 和 Flutter。
ai-translated: true
---

## Introduction

## 简介

[Antigravity CLI][] (using the executable command `agy`)
is a terminal-based interface (TUI)
for the **Antigravity 2.0** agentic coding assistant.
It connects directly to your workspace
and leverages the **Dart and Flutter MCP server**
to help you build, modify, test, and release Flutter applications
from the command line.

[Antigravity CLI][Antigravity CLI]（使用可执行命令 `agy`）
是一个基于终端的界面 (TUI)，
用于 **Antigravity 2.0** 智能编程助手。
它直接连接到你的工作区，
并利用 **Dart 和 Flutter MCP 服务器**，
帮助你从命令行构建、修改、测试和发布 Flutter 应用。

The Antigravity CLI replaces the legacy Gemini CLI.

Antigravity CLI 取代了旧版 Gemini CLI。

[Antigravity CLI]: https://antigravity.google/docs/cli

## Installation

## 安装

Install the Antigravity CLI on your machine by running the
appropriate command for your platform:

通过运行适用于你平台的相应命令，在你的机器上安装 Antigravity CLI：

<Tabs key="install-antigravity-cli">
<!-- <Tab name="macOS / Linux"> -->
<Tab name="macOS / Linux">

```bash
curl -fsSL https://antigravity.google/install.sh | bash
```

</Tab>
<!-- <Tab name="Windows (PowerShell)"> -->
<Tab name="Windows (PowerShell)">

```powershell
irm https://antigravity.google/install.ps1 | iex
```

</Tab>
<!-- <Tab name="Windows (Command Prompt)"> -->
<Tab name="Windows (命令提示符)">

```cmd
winget install Google.AntigravityCLI
```

</Tab>
</Tabs>

After installation, verify that the tool is available on your path by running:

安装后，通过运行以下命令验证该工具是否在你的路径中可用：

```console
$ agy --version
agy version 2.0.0
```

## Migration from Gemini CLI

## 从 Gemini CLI 迁移

If you previously used the Gemini CLI or Gemini CLI extension for Flutter,
migrating to the Antigravity CLI is straightforward.

如果你之前使用过 Gemini CLI 或 Gemini CLI 的 Flutter 扩展，
迁移到 Antigravity CLI 会非常简单。

### Automatic migration

### 自动迁移

The first time you run `agy` in your terminal,
the tool checks for existing Gemini configuration files
(such as `~/.gemini/config/mcp_config.json`
or legacy environment variables).
If found, the tool asks if you would like to
automatically migrate your settings,
preferences, and API configuration.

当你第一次在终端中运行 `agy` 时，
该工具会检查现有的 Gemini 配置文件
（例如 `~/.gemini/config/mcp_config.json`
或旧版环境变量）。
如果找到，该工具会询问你是否希望
自动迁移你的设置、
偏好和 API 配置。

### Manual migration

### 手动迁移

If you want to migrate your plugins and history manually,
or if you skipped the automated setup,
run the import plugin tool command:

如果你想手动迁移你的插件和历史记录，
或者你跳过了自动设置，
运行导入插件工具命令：

```bash
agy plugin import gemini
```

This command parses your local Gemini configuration
and copies its configurations over to your active Antigravity profile.

此命令会解析你的本地 Gemini 配置，
并将其配置复制到你当前的 Antigravity 配置文件中。

## Workspace configuration and rules

## 工作区配置和规则

Like the legacy Gemini CLI tool,
Antigravity CLI respects custom development guidelines
and configurations stored in your workspace directory:

与旧版 Gemini CLI 工具一样，
Antigravity CLI 遵循自定义开发指南
以及存储在你的工作区目录中的配置：

- **Local rules**: You can place rules files in your project directory
  (such as `.agents/skills/` or `AGENTS.md`)
  to instruct the agent on specific coding style guidelines
  or architectural patterns.
  Note that Antigravity CLI also supports backward compatibility
  with the legacy `GEMINI.md` file;
  however, we recommend renaming it to `AGENTS.md`.

  **本地规则**：你可以在项目目录中放置规则文件
  （例如 `.agents/skills/` 或 `AGENTS.md`），
  以指导代理遵循特定的编码风格指南
  或架构模式。
  请注意，Antigravity CLI 也支持向后兼容
  旧版 `GEMINI.md` 文件；
  但是，我们建议将其重命名为 `AGENTS.md`。

- **Global configuration**: Antigravity CLI stores global settings
  and configured MCP servers in `~/.antigravity/`
  (e.g., `~/.antigravity/mcp_config.json`).

  **全局配置**：Antigravity CLI 将全局设置
  和配置的 MCP 服务器存储在 `~/.antigravity/` 中
  （例如 `~/.antigravity/mcp_config.json`）。
