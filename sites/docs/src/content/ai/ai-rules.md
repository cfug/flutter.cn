---
# title: AI rules for Flutter and Dart
title: Flutter 与 Dart 的 AI 规则
# sidenav: ai
sidenav: ai
# shortTitle: AI rules
shortTitle: AI 规则
# description: >-
#   Learn how to add AI rules to tools that accelerate your
#   development workflow.
description: >-
  了解如何为加速开发工作流的工具添加 AI 规则。
ai-translated: true
---

This guide covers how you can leverage AI rules to
streamline your Flutter and Dart development.

本指南介绍如何利用 AI 规则简化 Flutter 与 Dart 开发。

:::note Agent skills
While rules configure the default behavior for all tasks,
you can use [Agent skills](/ai/agent-skills) to give the AI specific tools
and instructions for discrete tasks.
:::

:::note Agent skills
规则配置所有任务的默认行为，
你可以使用 [Agent skills](/ai/agent-skills) 为离散任务向 AI 提供特定工具与指令。
:::

## Overview

## 概述

AI-powered editors use rules files to provide context and
instructions to an underlying LLM. These files help you:

AI 驱动的编辑器使用规则文件为底层 LLM 提供上下文与指令。这些文件帮助你：

*   Customize AI behavior to your team's needs.

    按团队需求自定义 AI 行为。

*   Enforce project best practices for code style and
    design.

    落实项目在代码风格与设计方面的最佳实践。

*   Provide critical project context to the AI.

    向 AI 提供关键项目上下文。

The Flutter project provides several versions of the rules file to accommodate
different tool limits:

Flutter 项目提供规则文件的多个版本，以适配不同工具限制：

*   [`rules.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md):
    The comprehensive master rule set.
*   [`rules.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md)：
    完整的主规则集。
*   [`rules_10k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_10k.md):
    A condensed version (<10k chars) for tools with stricter context limits.
*   [`rules_10k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_10k.md)：
    精简版（<10k 字符），适用于上下文限制更严格的工具。
*   [`rules_4k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_4k.md):
    A highly concise version (<4k chars) for limited contexts.
*   [`rules_4k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_4k.md)：
    高度精简版（<4k 字符），适用于有限上下文。
*   [`rules_1k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_1k.md):
    An ultra-compact version (<1k chars) for very strict limits.
*   [`rules_1k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_1k.md)：
    超紧凑版（<1k 字符），适用于非常严格的限制。

<a class="filled-button" style="margin-bottom: 0.5rem;" href="https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md" download>
  <Icon id="download" />
  <span>Download the Flutter and Dart rules template / 下载 Flutter 与 Dart 规则模板</span>
</a>

## Device & editor specific limits

## 设备与编辑器特定限制

Different AI coding assistants and tools have varying limits for their "rules"
or "custom instructions" files. *Last updated: 2026-01-05.*

不同 AI 编程助手与工具对「规则」或「自定义指令」文件有不同限制。*最后更新：2026-01-05。*

| Tool / Product | Rules file / Feature | Limit (soft / hard) | Documentation |
|:---|:---|:---|:---|
| 工具 / 产品 | 规则文件 / 功能 | 限制（软 / 硬） | 文档 |
| Antigravity (Google) | `.agent/rules/<rule-name>.md` | 12,000 chars (Hard) | [Configure rules][antigravity] |
| Antigravity (Google) | `.agent/rules/<rule-name>.md` | 12,000 字符（硬限制） | [Configure rules][antigravity] |
| Claude Code | `CLAUDE.md` | No Hard Limit | [Claude Code Docs](https://code.claude.com/docs/en/memory) |
| Claude Code | `CLAUDE.md` | 无硬限制 | [Claude Code Docs](https://code.claude.com/docs/en/memory) |
| Cursor | `AGENTS.md` | No Hard Limit | [Cursor Docs](https://cursor.com/docs/context/rules) |
| Cursor | `AGENTS.md` | 无硬限制 | [Cursor Docs](https://cursor.com/docs/context/rules) |
| Gemini CLI | `GEMINI.md` | 1M+ Tokens (Context) | [Gemini CLI Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/long-context) |
| Gemini CLI | `GEMINI.md` | 100 万+ token（上下文） | [Gemini CLI Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/long-context) |
| GitHub Copilot | `.github/copilot-instructions.md` | ~4k chars | [GitHub Copilot Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |
| GitHub Copilot | `.github/copilot-instructions.md` | 约 4k 字符 | [GitHub Copilot Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |
| JetBrains AI (Junie) | `.junie/guidelines.md` | No Hard Limit | [JetBrains AI Docs](https://www.jetbrains.com/help/junie/get-started-with-junie.html) |
| JetBrains AI (Junie) | `.junie/guidelines.md` | 无硬限制 | [JetBrains AI Docs](https://www.jetbrains.com/help/junie/get-started-with-junie.html) |
| VS Code | `.instructions.md` | Unknown | [Configure instructions][vs-code] |
| VS Code | `.instructions.md` | 未知 | [Configure instructions][vs-code] |

{:.table .table-striped}

:::note Support is evolving
Support for rules files is still evolving.
Please check the documentation for your specific development environment for
the most up-to-date naming conventions and instructions.
:::

:::note 支持仍在演进
规则文件支持仍在演进。
请查阅你所用开发环境的文档，获取最新的命名约定与说明。
:::

[copilot]: https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_use-a-githubcopilotinstructionsmd-file
[claude]: https://www.anthropic.com/engineering/claude-code-best-practices#1-customize-your-setup
[cursor]: https://cursor.com/docs/context/rules
[firebase]: https://firebase.google.com/docs/studio/set-up-gemini#custom-instructions
[gemini-cli]: https://geminicli.com/docs/cli/gemini-md
[antigravity]: https://antigravity.google/docs/rules-workflows
[junie]: https://www.jetbrains.com/help/junie/customize-guidelines.html
[vs-code]: https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_use-instructionsmd-files
[windsurf]: https://docs.windsurf.com/windsurf/cascade/memories#rules

## Create rules for your editor

## 为你的编辑器创建规则

You can adapt our Flutter and Dart rules template for your
specific environment. To do so, follow these steps:

你可以将 Flutter 与 Dart 规则模板适配到自己的环境。按以下步骤操作：

1.  Download the Flutter and Dart rules template:
    <a href="https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md" download><code>rules.md</code></a>

1.  下载 Flutter 与 Dart 规则模板：
    <a href="https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md" download><code>rules.md</code></a>

1.  In an LLM like [Gemini][], attach the
    `rules.md` file that you downloaded in
    the last step.

1.  在 [Gemini][] 等 LLM 中，附上一步下载的 `rules.md` 文件。

1.  Provide a prompt to reformat the file for your desired
    editor.

1.  提供提示词，将文件重新格式化为目标编辑器所需格式。

    Example prompt:

    示例提示词：

    ```text
    Convert the attached rules.md file
    into a guidelines.md file for Gemini CLI. Make sure
    to use the styles required for a guidelines.md file.
    ```

    ```text
    将附带的 rules.md 文件转换为适用于 Gemini CLI 的 guidelines.md 文件。
    确保使用 guidelines.md 文件所需的样式。
    ```

1.  Review the LLM's output and make any necessary
    adjustments.

1.  审阅 LLM 输出并进行必要调整。

1.  Follow your environment's instructions to add the new
    rules file. This may involve adding to an existing file
    or creating a new one.

1.  按环境说明添加新规则文件。可能需要追加到现有文件或创建新文件。

1.  Verify that your AI assistant is using the new rules to
    guide its responses.

1.  验证 AI 助手是否使用新规则来指导其回复。

[Gemini]: https://gemini.google.com/
