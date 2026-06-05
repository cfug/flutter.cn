---
# title: Dart and Flutter MCP server
title: Dart 与 Flutter MCP 服务器
# sidenav: ai
sidenav: ai
# shortTitle: MCP server
shortTitle: MCP 服务器
# description: >
#   Learn about the Dart and Flutter MCP server tool that
#   exposes Dart and Flutter tools to compatible
#   AI-assistant clients and agents.
description: >
  了解 Dart 与 Flutter MCP 服务器工具，
  它向兼容的 AI 助手客户端与智能体暴露 Dart 与 Flutter 工具。
ai-translated: true
---

This guide discusses the Dart and Flutter MCP server.

本指南介绍 Dart 与 Flutter MCP 服务器。

:::experimental
The Dart and Flutter MCP server is experimental and likely to evolve quickly.
The following instructions require Dart 3.9 or later.
:::

:::experimental
Dart 与 Flutter MCP 服务器处于实验阶段，可能会快速演进。
以下说明需要 Dart 3.9 或更高版本。
:::

## Overview

## 概述

The [Dart and Flutter MCP server][]
exposes Dart and Flutter development tool actions to
compatible AI-assistant clients. MCP (model context protocol)
is a protocol that enables communication between development tools
and AI assistants, allowing the assistants to understand the
context of the code and perform actions on behalf of the developer.

[Dart 与 Flutter MCP 服务器][Dart and Flutter MCP server]
向兼容的 AI 助手客户端暴露 Dart 与 Flutter 开发工具操作。
MCP（model context protocol，模型上下文协议）使开发工具与 AI 助手能够通信，
让助手理解代码上下文并代表开发者执行操作。

The Dart and Flutter MCP server can work with any MCP client that
supports standard I/O (stdio) as the transport medium.
To access all the features of the Dart and Flutter MCP server,
an MCP client must support [Tools][] and [Resources][].
For the best development experience with the Dart and Flutter MCP server,
an MCP client should also support [Roots][].

Dart 与 Flutter MCP 服务器可与任何以标准 I/O（stdio）为传输介质的 MCP 客户端配合。
要访问其全部功能，MCP 客户端须支持 [Tools][] 与 [Resources][]。
为获得最佳开发体验，MCP 客户端还应支持 [Roots][]。

If you are using a client that claims it
supports roots but doesn't actually set them,
pass `--force-roots-fallback` flag to enable tools for managing the roots.

若客户端声称支持 roots 却未实际设置，
请传入 `--force-roots-fallback` 标志以启用管理 roots 的工具。

The Dart and Flutter MCP server provides a growing list of tools that
grant AI assistants deep insights into your project.
Here is an overview of a few things it can do:

Dart 与 Flutter MCP 服务器提供不断增长的工具列表，
为 AI 助手提供对项目的深入洞察。它能做的一些事包括：

*  Analyze and fix errors in your project's code.

   分析并修复项目代码中的错误。

*  Resolve symbols to elements to ensure their existence and
   fetch documentation and signature information for them.

   将符号解析为元素以确认其存在，并获取文档与签名信息。

*  Introspect and interact with your running application.

   内省并与运行中的应用交互。

*  Search the [pub.dev site]({{site.pub}}) for the best package for a use case.

   在 [pub.dev 站点]({{site.pub}}) 搜索最适合场景的软件包。

*  Manage package dependencies in your `pubspec.yaml` file.

   管理 `pubspec.yaml` 中的软件包依赖。

*  Run tests and analyze the results.

   运行测试并分析结果。

*  Format code with the same formatter and config as
   [`dart format`][] and the Dart analysis server.

   使用与 [`dart format`][] 及 Dart 分析服务器相同的格式化器与配置格式化代码。

[Tools]: https://modelcontextprotocol.io/docs/concepts/tools
[Resources]: https://modelcontextprotocol.io/docs/concepts/resources
[Roots]: https://modelcontextprotocol.io/docs/concepts/roots
[Dart and Flutter MCP server]: https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server
[`dart format`]: {{site.dart-site}}/tools/dart-format

## Set up your MCP client

## 设置 MCP 客户端

Run the server with the `dart mcp-server` command,
which must be configured in your preferred client.

使用 `dart mcp-server` 命令运行服务器，并须在你偏好的客户端中配置。

This section provides instructions for setting up the
Dart and Flutter MCP server with popular tools such as
Antigravity, Gemini CLI, Cursor, and GitHub Copilot.

本节说明如何在 Antigravity、Gemini CLI、Cursor、GitHub Copilot 等常用工具中设置 Dart 与 Flutter MCP 服务器。

### Antigravity

### Antigravity

To configure Google [Antigravity][] to use the Dart and Flutter MCP server,
you can either install it from the list of available servers or
[connect it as a custom MCP server][antigravity-mcp].

要配置 Google [Antigravity][] 使用 Dart 与 Flutter MCP 服务器，
可从可用服务器列表安装，或[将其连接为自定义 MCP 服务器][antigravity-mcp]。

1.  Navigate to or open the **Agent** side panel.

    导航到或打开 **Agent** 侧边面板。

    If it's closed, open it by either:

    若已关闭，可通过以下方式打开：

    - Pressing <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>.

      按 <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>。

    - Going to **View**
      <span aria-label="and then">></span> **Open View...**
      <span aria-label="and then">></span> **Agent**.

      依次进入 **View**
      <span aria-label="and then">></span> **Open View...**
      <span aria-label="and then">></span> **Agent**。

1.  In the upper right of the **Agent** panel,
    click the **Additional options** (`...`) menu button.

    在 **Agent** 面板右上角，点按 **Additional options**（`...`）菜单按钮。

1.  Select **MCP Servers**.

    选择 **MCP Servers**。

1.  In the upper right of the **Agent** panel,
    click **Manage MCP Servers**.

    在 **Agent** 面板右上角，点按 **Manage MCP Servers**。

From here, you can choose to install the MCP server from
[the built-in MCP store](#antigravity-mcp-store-install) or by
[configuring it manually](#antigravity-mcp-manual-install).

此后可从[内置 MCP 商店](#antigravity-mcp-store-install)安装，或通过[手动配置](#antigravity-mcp-manual-install)。

[Antigravity]: https://antigravity.google/
[antigravity-mcp]: https://antigravity.google/docs/mcp#connecting-custom-mcp-servers

#### Install from the MCP store {: #antigravity-mcp-store-install}

#### 从 MCP 商店安装 {: #antigravity-mcp-store-install}

1.  In the list of available MCP servers,
    find or search for **Dart** and click **Install**.

    在可用 MCP 服务器列表中查找或搜索 **Dart**，然后点按 **Install**。

#### Connect manually {: #antigravity-mcp-manual-install}

#### 手动连接 {: #antigravity-mcp-manual-install}

1.  In the upper right of the **Manage MCPs** editor view,
    click **View raw config**.

    在 **Manage MCPs** 编辑器视图右上角，点按 **View raw config**。

1.  Add the following `dart-mcp-server` entry to the `mcpServers` map:

    在 `mcpServers` 映射中添加以下 `dart-mcp-server` 条目：

    ```json title="mcp_config.json" highlightLines=3-10
    {
      "mcpServers": {
        "dart-mcp-server": {
          "command": "dart",
          "args": [
            "mcp-server"
          ],
          "env": {}
        }
      }
    }
    ```

#### Install extensions

#### 安装扩展

It is also recommended to install the Dart and Flutter extensions:

建议同时安装 Dart 与 Flutter 扩展：

1.  Open the **Extensions** view by either:

    通过以下方式打开 **Extensions** 视图：

    - Pressing <kbd>Shift</kbd> +
      <kbd class="special-key">Cmd/Ctrl</kbd> +
      <kbd>P</kbd>.

      按 <kbd>Shift</kbd> +
      <kbd class="special-key">Cmd/Ctrl</kbd> +
      <kbd>P</kbd>。

    - Going to **View**
      <span aria-label="and then">></span> **Extensions**.

      依次进入 **View**
      <span aria-label="and then">></span> **Extensions**。

1.  In the **Search Extensions** input box, enter **Flutter**.

    在 **Search Extensions** 输入框中输入 **Flutter**。

1.  From the list of extensions, select **Flutter**.

    在扩展列表中选择 **Flutter**。

1.  In the **Extension: Flutter** view that opens,
    click the **Install** button.

    在打开的 **Extension: Flutter** 视图中点按 **Install** 按钮。

    This installs both the Dart and Flutter extensions.

    这将同时安装 Dart 与 Flutter 扩展。

To learn more about the Dart and Flutter extensions,
check out [Develop Flutter apps in VS Code][].

有关 Dart 与 Flutter 扩展的更多信息，请参阅 [在 VS Code 中开发 Flutter 应用][Develop Flutter apps in VS Code]。

[Develop Flutter apps in VS Code]: /tools/vs-code

### Gemini CLI

### Gemini CLI

To configure the [Gemini CLI][] to use the Dart and Flutter MCP server,
add a Dart entry to the `mcpServers` section of the Gemini config.

要配置 [Gemini CLI][] 使用 Dart 与 Flutter MCP 服务器，
在 Gemini 配置的 `mcpServers` 部分添加 Dart 条目。

-  To enable the server for all projects on your device,
   edit the `~/.gemini/settings.json` file in your home directory.

   要为设备上所有项目启用服务器，请编辑主目录中的 `~/.gemini/settings.json`。

-  To enable the server for a specific project,
   edit the `.gemini/settings.json` file in the project's root directory.

   要为特定项目启用服务器，请编辑项目根目录中的 `.gemini/settings.json`。

```json title=".gemini/settings.json"
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": [
        "mcp-server"
      ]
    }
  }
}
```

For more information, check out the official Gemini CLI
documentation for [setting up MCP servers][].

更多信息请参阅 Gemini CLI 关于[设置 MCP 服务器][setting up MCP servers] 的官方文档。

[Gemini CLI]: https://geminicli.com/
[setting up MCP servers]: https://geminicli.com/docs/tools/mcp-server/#how-to-set-up-your-mcp-server

### Gemini Code Assist in VS Code

### VS Code 中的 Gemini Code Assist

[Gemini Code Assist][]'s [Agent mode][] integrates the
Gemini CLI to provide a powerful AI agent directly in your IDE.
If you haven't set up Gemini Code Assist or its agent mode yet,
follow its [Before you begin instructions][gca-setup] to get started.

[Gemini Code Assist][] 的 [Agent mode][] 集成 Gemini CLI，
在 IDE 中直接提供强大的 AI 智能体。
若尚未设置 Gemini Code Assist 或其 agent 模式，
请遵循其[开始前的说明][gca-setup]入门。

To configure Gemini Code Assist to use the Dart and Flutter MCP server,
follow the instructions to [configure the Gemini CLI][].

要配置 Gemini Code Assist 使用 Dart 与 Flutter MCP 服务器，
请遵循[配置 Gemini CLI][configure the Gemini CLI] 的说明。

You can verify the MCP server has been configured
properly by typing `/mcp` in the chat window in Agent mode.

可在 Agent 模式的聊天窗口中输入 `/mcp` 验证 MCP 服务器是否已正确配置。

For more information see the official Gemini Code Assist
documentation for [using agent mode][].

更多信息请参阅 Gemini Code Assist 关于[使用 agent 模式][using agent mode] 的官方文档。

[gca-setup]: https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer#before-you-begin
[Gemini Code Assist]: https://codeassist.google/
[Agent mode]: https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer
[configure the Gemini CLI]: #gemini-cli
[using agent mode]: https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer#before-you-begin

### GitHub Copilot in VS Code

### VS Code 中的 GitHub Copilot

:::note
Support for the Dart and Flutter MCP server in VS Code requires
v3.116 or later of the [Dart Code extension][].

在 VS Code 中使用 Dart 与 Flutter MCP 服务器需要
[Dart Code 扩展][Dart Code extension] v3.116 或更高版本。
:::

By default, the Dart extension uses the
[VS Code MCP API][] to register the Dart and Flutter MCP server, as well
as a tool to provide the URI for the active Dart Tooling Daemon.

默认情况下，Dart 扩展使用 [VS Code MCP API][]
注册 Dart 与 Flutter MCP 服务器，并提供获取活动 Dart Tooling Daemon URI 的工具。

Explicitly enable or disable the Dart and Flutter MCP server by
configuring the `dart.mcpServer` setting in your VS Code settings.

通过在 VS Code 设置中配置 `dart.mcpServer` 显式启用或禁用 Dart 与 Flutter MCP 服务器。

To change this globally, update your user settings:

要全局更改，请更新用户设置：

1.  In VS Code, click **View > Command Palette** and then
    search for **Preferences: Open User Settings (JSON)**.

    在 VS Code 中点按 **View > Command Palette**，
    搜索 **Preferences: Open User Settings (JSON)**。

1.  Add the following setting:

    添加以下设置：

    ```json
    "dart.mcpServer": true
    ```

If you'd like this setting to apply only to a specific workspace,
add the entry to your workspace settings:

若仅希望对特定工作区生效，请将条目添加到工作区设置：

1.  In VS Code, click **View > Command Palette** and then
    search for **Preferences: Open Workspace Settings (JSON)**.

    在 VS Code 中点按 **View > Command Palette**，
    搜索 **Preferences: Open Workspace Settings (JSON)**。

1.  Add the following setting:

    添加以下设置：

    ```json
    "dart.mcpServer": true
    ```

For more information, see the official VS Code
documentation for [enabling MCP support][].

更多信息请参阅 VS Code 关于[启用 MCP 支持][enabling MCP support] 的官方文档。

[Dart Code extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
[VS Code MCP API]: https://code.visualstudio.com/api/extension-guides/mcp
[enabling MCP support]: https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_enable-mcp-support-in-vs-code

### Cursor

### Cursor

The easiest way to configure the Dart and Flutter MCP server with
Cursor is by clicking the **Add to Cursor** button:

在 Cursor 中配置 Dart 与 Flutter MCP 服务器最简便的方式是点按 **Add to Cursor** 按钮：

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=dart&config=eyJjb21tYW5kIjoiZGFydCBtY3Atc2VydmVyIn0%3D){:.light-mode-visible}
[![Add to Cursor](https://cursor.com/deeplink/mcp-install-light.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=dart&config=eyJjb21tYW5kIjoiZGFydCBtY3Atc2VydmVyIn0%3D){:.dark-mode-visible}

Alternatively, you can configure the server manually:

也可手动配置服务器：

1.  Go to **Cursor > Settings > Cursor Settings > Tools & Integrations**.

    进入 **Cursor > Settings > Cursor Settings > Tools & Integrations**。

1.  Click **Add Custom MCP** or **New MCP Server**
    depending on whether you already have other MCP servers configured.

    根据是否已配置其他 MCP 服务器，点按 **Add Custom MCP** 或 **New MCP Server**。

1.  Edit the `.cursor/mcp.json` file in your local project
    (configuration will only apply to this project) or
    edit the global `~/.cursor/mcp.json` file in your home directory
    (configuration will apply for all projects) to
    configure the Dart and Flutter MCP server:

    编辑本地项目中的 `.cursor/mcp.json`（仅对本项目生效），
    或编辑主目录中的全局 `~/.cursor/mcp.json`（对所有项目生效），
    以配置 Dart 与 Flutter MCP 服务器：

    ```json title=".cursor/mcp.json"
    {
      "mcpServers": {
        "dart": {
          "command": "dart",
          "args": [
            "mcp-server"
          ]
        }
      }
    }
    ```

For more information, see the official Cursor
documentation for [installing MCP servers][].

更多信息请参阅 Cursor 关于[安装 MCP 服务器][installing MCP servers] 的官方文档。

[installing MCP servers]: https://docs.cursor.com/context/model-context-protocol#installing-mcp-servers

### OpenCode

### OpenCode

To configure [OpenCode][] to use the Dart and Flutter MCP server,
add the `dart-mcp-server` entry to your OpenCode configuration.

要配置 [OpenCode][] 使用 Dart 与 Flutter MCP 服务器，
在 OpenCode 配置中添加 `dart-mcp-server` 条目。

OpenCode configuration is typically found in `~/.opencode/config.json`
or in your project's `opencode key` configuration.

OpenCode 配置通常位于 `~/.opencode/config.json`
或项目的 `opencode key` 配置中。

```json title="~/.opencode/config.json"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "dart-mcp-server": {
      "type": "local",
      "command": [
        "dart",
        "mcp-server"
      ],
      "enabled": true,
      "environment": {}
    }
  }
}
```

[OpenCode]: https://opencode.ai/

### Claude Code

### Claude Code

To configure Claude Code to use the Dart and Flutter MCP server
for the current project, use the `claude mcp add` CLI command:

要为当前项目配置 Claude Code 使用 Dart 与 Flutter MCP 服务器，
请使用 `claude mcp add` CLI 命令：

```console
$ claude mcp add --transport stdio dart -- dart mcp-server
```

To learn more about configuring MCP servers in Claude Code,
check out their documentation on [Installing MCP servers][claude-install].

要了解在 Claude Code 中配置 MCP 服务器的更多内容，
请参阅其关于[安装 MCP 服务器][claude-install] 的文档。

[claude-install]: https://code.claude.com/docs/en/mcp#installing-mcp-servers

### Codex CLI

### Codex CLI

To configure the Codex CLI to use the Dart and Flutter MCP server
for the current project, use the `codex mcp add` CLI command:

要为当前项目配置 Codex CLI 使用 Dart 与 Flutter MCP 服务器，
请使用 `codex mcp add` CLI 命令：

```console
$ codex mcp add dart -- dart mcp-server --force-roots-fallback
```

To learn more about configuring MCP servers in the Codex CLI,
check out their documentation on [Connecting to MCP servers][codex-connect].

要了解在 Codex CLI 中配置 MCP 服务器的更多内容，
请参阅其关于[连接到 MCP 服务器][codex-connect] 的文档。

[codex-connect]: https://developers.openai.com/codex/mcp

## Use your MCP client

## 使用 MCP 客户端

Once you've set up the Dart and Flutter MCP server with a client,
the Dart and Flutter MCP server enables the client to not only reason
about your project's context but also to take action with tools.

配置好客户端后，Dart 与 Flutter MCP 服务器不仅能让客户端推理项目上下文，
还能通过工具采取行动。

The [Large Language Model (LLM)][LLM] decides which tools to use and when,
so you can focus on describing your goal in natural language.
Let's see this in action with a couple of examples using
GitHub Copilot's Agent mode in VS Code.

[大语言模型（LLM）][LLM] 决定使用哪些工具及何时使用，
你只需用自然语言描述目标。
下面通过 VS Code 中 GitHub Copilot 的 Agent 模式示例说明。

[LLM]: https://developers.google.com/machine-learning/resources/intro-llms

### Fix a runtime layout error in a Flutter app

### 修复 Flutter 应用中的运行时布局错误

We've all been there: you build a beautiful UI, run the app,
and are greeted by the infamous yellow-and-black stripes of
a RenderFlex overflow error.
Instead of manually debugging the widget tree, you can now
ask your AI assistant for help with a prompt similar to the following:

我们都遇到过：做好漂亮 UI、运行应用后，
却看到 RenderFlex 溢出错误那标志性的黄黑条纹。
现在无需手动调试 widget 树，可用类似以下的提示词向 AI 助手求助：

> Check for and fix static and runtime analysis issues.
> Check for and fix any layout issues.

> 检查并修复静态与运行时分析问题。
> 检查并修复所有布局问题。

Behind the scenes, the AI agent uses the Dart and Flutter MCP server's tools to:

幕后，AI 智能体使用 Dart 与 Flutter MCP 服务器的工具：

*  See the error: It uses a tool to get the current runtime errors
   from the running application.

   查看错误：使用工具从运行中的应用获取当前运行时错误。

*  Inspect the UI: It accesses the Flutter widget tree to understand
   the layout that is causing the overflow.

   检查 UI：访问 Flutter widget 树以了解导致溢出的布局。

*  Apply a fix: Armed with this context, it applies a fix and
   checks once more for any remaining errors.

   应用修复：结合上下文应用修复并再次检查是否仍有错误。

You can then keep or undo the code changes.

随后你可保留或撤销代码变更。

### Add new functionality with package search

### 通过软件包搜索添加新功能

Imagine you need to add a chart to your app.
Which package should you use? How do you add it and write the boilerplate?
The Dart and Flutter MCP server can streamline this entire process with
a prompt similar to the following:

假设你要为应用添加图表。
该用哪个软件包？如何添加并编写样板代码？
Dart 与 Flutter MCP 服务器可用类似以下的提示词简化整个流程：

> Find a suitable package to add a line chart that
> maps the number of button presses over time.

> 查找合适的软件包，添加折线图以映射按钮按下次数随时间的变化。

The AI agent now acts as a true assistant:

AI 智能体现在真正成为助手：

*  Find the right tool: It uses the `pub_dev_search` tool to
   find popular and highly-rated charting libraries.

   找到合适工具：使用 `pub_dev_search` 工具查找流行且高评分的图表库。

*  Manage dependencies: After you confirm its choice,
   such as [`package:fl_chart`][],
   it uses a tool to add the package as a dependency.

   管理依赖：在你确认选择（如 [`package:fl_chart`][]）后，使用工具将软件包添加为依赖。

*  Generate the code: It generates the new widget code,
   complete with boilerplate for a line chart that it places in the UI.
   It even self-corrects syntax errors introduced during the process.
   You can customize further from there.

   生成代码：生成含折线图样板的新 widget 代码并放入 UI，
   甚至能自行纠正过程中引入的语法错误。你可在此基础上继续定制。

What used to be a multi-step process of research,
reading documentation, editing `pubspec.yaml`, and
writing the appropriate code in your app,
is now a single request.

以往需要调研、阅读文档、编辑 `pubspec.yaml` 并在应用中编写代码的多步流程，
现在只需一次请求。

[`package:fl_chart`]: {{site.pub-pkg}}/fl_chart

## Provide feedback

## 提供反馈

If you encounter any issues or have feedback about the
Dart and Flutter MCP server, file an issue on the
[`dart-lang/ai` issue tracker][ai-issues].

若遇到问题或对 Dart 与 Flutter MCP 服务器有反馈，
请在 [`dart-lang/ai` issue 跟踪器][ai-issues] 上提交 issue。

[ai-issues]: https://github.com/dart-lang/ai/issues
