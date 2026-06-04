---
# title: Google Antigravity
title: Google Antigravity
# shortTitle: Antigravity
shortTitle: Antigravity
# description: Learn about the Antigravity agentic coding assistant.
description: 了解 Antigravity 智能体编程助手。
ai-translated: true
---

## Introduction

## 简介

[Antigravity][ag] is a powerful agentic coding assistant
and IDE for building apps, including Flutter apps.
You can pair with Antigravity to solve your
coding tasks, create new codebases, modify existing ones,
and answer questions.

[Antigravity][ag] 是一款强大的智能体编程助手和 IDE，可用于构建应用（包括 Flutter 应用）。
你可以与 Antigravity 结对，完成编码任务、创建新代码库、修改现有代码库并回答问题。

[ag]: https://antigravity.google/

To learn some of what Antigravity is capable of,
watch this talk from Google I/O 2026.

要了解 Antigravity 的部分能力，可观看 Google I/O 2026 的这场演讲。

<YouTubeEmbed id="UNdQhnpm8GY"
  title="Vibe once, run anywhere with Google Antigravity and Flutter"></YouTubeEmbed>

## Installation and setup {: #setup}

## 安装与配置 {: #setup}

Install the latest version of Antigravity for your platform by visiting
the [Antigravity site](https://antigravity.google/download).

请访问 [Antigravity 网站](https://antigravity.google/download) 为你的平台安装最新版 Antigravity。

 1. <h3>Open Antigravity</h3>

    1. <h3>打开 Antigravity</h3>

    When opening Antigravity for the first time,
    a **How do you want to use Antigravity** screen displays and
    provides some radio buttons and pulldown menus
    for customizing your use of the tool.

    首次打开 Antigravity 时，会显示 **How do you want to use Antigravity**（你想如何使用 Antigravity）界面，
    并提供单选按钮和下拉菜单，用于自定义你对该工具的使用方式。

    We recommend that you select **Review-driven development**.
    This means that Antigravity asks you to approve each command
    that it wants to run.

    我们建议你选择 **Review-driven development**（评审驱动开发）。
    这意味着 Antigravity 在想要运行每条命令前都会请你批准。

    You can change this setting at any time to give Antigravity
    more or less control. Even if you select **Agent driven development**,
    which allows Antigravity to directly run commands without approval,
    you can specify certain commands that will _always_ ask
    for your approval, such as the `rm` command to remove files.

    你可以随时更改此设置，以给予 Antigravity 更多或更少的控制权。
    即使你选择了 **Agent driven development**（智能体驱动开发），
    允许 Antigravity 不经批准直接运行命令，
    你也可以指定某些命令 _始终_ 需要你的批准，例如用于删除文件的 `rm` 命令。

 1. <h3>Install the Dart and Flutter extensions</h3>

    1. <h3>安装 Dart 和 Flutter 扩展</h3>

    Open the **Extensions** menu in the left nav and search for Dart.
    The search results bring up both the Dart and Flutter extensions.
    Click the **Install** button for Dart and then do the same
    for Flutter.

    在左侧导航中打开 **Extensions**（扩展）菜单并搜索 Dart。
    搜索结果会同时列出 Dart 和 Flutter 扩展。
    点击 Dart 的 **Install**（安装）按钮，然后对 Flutter 执行相同操作。

 1. <h3>Set up any MCP servers that you use</h3>

    1. <h3>配置你使用的 MCP 服务器</h3>

    1.  Navigate to or open the **Agent** side panel.

        1.  导航到或打开 **Agent**（智能体）侧边栏。

        If it's closed, open it by either:

        如果它已关闭，可通过以下任一方式打开：

        * Pressing <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>.
        * Going to **View**
          <span aria-label="and then">></span> **Open View...**
          <span aria-label="and then">></span> **Agent**.

        * 按 <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>。
        * 依次选择 **View**（视图）
          <span aria-label="and then">></span> **Open View...**（打开视图…）
          <span aria-label="and then">></span> **Agent**（智能体）。

        In the upper right of the **Agent** panel,
        click the **Additional options** (`...`) menu button.

        在 **Agent** 面板右上角，点击 **Additional options**（更多选项）（`...`）菜单按钮。

    1.  Select **MCP Servers**.

        1.  选择 **MCP Servers**（MCP 服务器）。

    1.  In the upper right of the **Agent** panel,
        click **Manage MCP Servers**.

        1.  在 **Agent** 面板右上角，点击 **Manage MCP Servers**（管理 MCP 服务器）。

        The **MCP Store** screen appears and you can search for Dart,
        which is likely already in the list.
        Click **Install**.

        会出现 **MCP Store**（MCP 商店）界面，你可以搜索 Dart（它可能已在列表中）。
        点击 **Install**（安装）。

        After installing any servers that you want,
        view them by clicking the **Manage MCP Servers** button
        and click **View raw config** to access your JSON manifest.

        安装所需的服务器后，点击 **Manage MCP Servers** 按钮查看它们，
        并点击 **View raw config**（查看原始配置）以访问 JSON 清单。

 1. <h3>Get started developing</h3>

    1. <h3>开始开发</h3>

    For these tips and more that show some of Antigravity's benefits,
    watch the following 10-minute [Flutter + Antigravity video][ag-video]:

    要了解这些技巧以及更多 Antigravity 的优势，可观看以下 10 分钟的 [Flutter + Antigravity 视频][ag-video]：

    <YouTubeEmbed id="YY2w2JEX2xk"
      title="Flutter + Antigravity in 10 minutes"></YouTubeEmbed>

    For a walkthrough on creating a new Flutter app in Antigravity,
    visit [Create a new Flutter app][].
    To learn more about the development features enabled by
    the Dart and Flutter extensions,
    check out [How to develop Flutter apps in VS Code][vs-code].

    有关在 Antigravity 中创建新 Flutter 应用的演练，请访问 [Create a new Flutter app][]（创建新的 Flutter 应用）。
    要了解 Dart 和 Flutter 扩展所启用的开发功能，
    请参阅 [How to develop Flutter apps in VS Code][vs-code]（如何在 VS Code 中开发 Flutter 应用）。

{:.steps}

## Agentic Hot Reload {: #agentic-hot-reload}

## 智能体热重载 {: #agentic-hot-reload}

If you are using Antigravity in Agent mode,
the agent can automatically hot reload your running application
when you prompt it to modify your app.
This enables a hands-free, "prompt-to-reload" workflow
that reduces context switching and development latency.

如果你在智能体模式下使用 Antigravity，
当你提示它修改应用时，智能体可以自动热重载正在运行的应用。
这实现了免手操作的「提示即重载」工作流，
减少上下文切换并降低开发延迟。

[ag-video]: {{site.youtube-site}}/watch?v=YY2w2JEX2xk&t=1s
[Create a new Flutter app]: /reference/create-new-app#antigravity
[vs-code]: /tools/vs-code
