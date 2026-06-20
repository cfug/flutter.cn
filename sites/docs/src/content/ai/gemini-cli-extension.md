---
# title: Flutter extension for Gemini CLI
title: 适用于 Gemini CLI 的 Flutter 扩展
sidenav: ai
# description: >
#   Learn how to use the Flutter extension for Gemini CLI
#   to make structured changes to your app at the command line
#   using the Dart and Flutter MCP server.
description: >
  了解如何使用适用于 Gemini CLI 的 Flutter 扩展，
  借助 Dart 与 Flutter MCP server 在命令行对应用进行结构化修改。
ai-translated: true
---

You might be familiar with Gemini CLI,
a command-line AI workflow tool that enables you
to interact with Gemini AI models without leaving
your development environment.
(If you aren't familiar with Gemini, you can learn more
by working through the [Hands on with Gemini][] codelab.)

你可能已熟悉 Gemini CLI——
一款命令行 AI 工作流工具，让你无需离开开发环境即可与 Gemini AI 模型交互。
（若尚不熟悉 Gemini，可通过 [Gemini 动手实验][Hands on with Gemini] codelab 了解。）

[Hands on with Gemini]: {{site.codelabs}}/gemini-cli-hands-on

AI agents are changing the way we build Flutter apps by
assisting with tasks like feature prototyping, code reviews,
as well as writing and running tests.
To use an AI agent effectively, you need to provide it with
context and access to tools to help it become a productive
Flutter coding assistant.
This is where the Flutter Extension for Gemini CLI comes in.
Gemini CLI extensions allow you to build integrations with
Gemini CLI and your tools,
and the Flutter extension expands on these capabilities.

AI 智能体正在改变我们构建 Flutter 应用的方式，
可协助功能原型、代码评审以及编写与运行测试等任务。
要有效使用 AI 智能体，需要为其提供上下文与工具访问，使其成为高效的 Flutter 编程助手。
这正是适用于 Gemini CLI 的 Flutter 扩展的用武之地。
Gemini CLI 扩展让你将 Gemini CLI 与自有工具集成，
Flutter 扩展则在此基础上扩展能力。

The Flutter Extension for Gemini CLI provides commands
to accelerate app development, follows explicit rules to
write high-quality code following Dart and Flutter best practices,
and runs tools from the Dart and Flutter MCP server to directly
access Dart and Flutter's developer tools. You spend less time
on setup and more time building high quality Flutter apps.

适用于 Gemini CLI 的 Flutter 扩展提供命令以加速应用开发，
遵循明确规则按 Dart 与 Flutter 最佳实践编写高质量代码，
并运行 Dart 与 Flutter MCP server 中的工具以直接访问 Dart 与 Flutter 开发者工具。
你可将更少时间花在搭建上，把更多时间用于构建高质量 Flutter 应用。

The following video showcases
[how to build multiplatform apps with Gemini CLI][gemini-cli-video]:

以下视频展示
[如何使用 Gemini CLI 构建多平台应用][gemini-cli-video]：

<iframe width="560" height="315" src="https://www.youtube.com/embed/RZPkE5sllck?si=szuMDq8uisH7OnVI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[gemini-cli-video]: https://youtu.be/RZPkE5sllck?si=lM0sGs-V6nx7Tw6T

## Prerequisites

## 前提条件

1. Install Gemini CLI 0.4.0 or later.
   You can do this with npm or brew, depending on your platform,
   preference, and system configuration.

   安装 Gemini CLI 0.4.0 或更高版本。
   可根据平台、偏好与系统配置使用 npm 或 brew 安装。

2. Install the Flutter SDK, which includes the Dart SDK.
   If Flutter is already installed,
   make sure that you have the latest versions of
   Flutter and Dart by running flutter upgrade.

   安装包含 Dart SDK 的 Flutter SDK。
   若已安装 Flutter，请运行 `flutter upgrade` 确保 Flutter 与 Dart 为最新版本。

3. Install Git and make sure it's available on your PATH.

   安装 Git 并确保其在 PATH 中可用。

## Get started

## 入门

:::experimental
The Flutter extension for Gemini CLI is in
alpha and is likely to change.

适用于 Gemini CLI 的 Flutter 扩展处于 alpha 阶段，可能会变更。
:::

Once the prerequisites are satisfied, install the Flutter
extension for Gemini CLI by using one of the following commands:

满足前提条件后，使用以下命令之一安装适用于 Gemini CLI 的 Flutter 扩展：

1. To install the current version, run the following:

   要安装当前版本，运行：

    ```console
    gemini extensions install https://github.com/gemini-cli-extensions/flutter
    ```

2. To install the current version and ensure that future
   updates are automatically installed, use the `auto-update` tag:

   要安装当前版本并确保未来更新自动安装，使用 `auto-update` 标签：

   ```console
   gemini extensions install https://github.com/gemini-cli-extensions/flutter.git --auto-update
   ```

After asking if you are sure you want to proceed,
you will see a message that the Flutter extension is installed and enabled.

确认是否继续后，你会看到 Flutter 扩展已安装并启用的消息。

3. You can manage the extension with the following commands:

   可使用以下命令管理扩展：

   - Update to the latest version:

     更新到最新版本：

      ```console
      gemini extensions update flutter
      ```

   - Uninstall the extension:

     卸载扩展：

      ```console
      gemini extensions uninstall flutter
      ```

## Available commands

## 可用命令

After installing the extension,
these commands are available when you open
a new Gemini CLI session:

安装扩展后，打开新的 Gemini CLI 会话时即可使用这些命令：

* `/create-app` - Guides you through bootstrapping a new
  Flutter project with best practices.

  `/create-app` — 引导你按最佳实践搭建新的 Flutter 项目。

* `/create-package` - Guides you through bootstrapping
  a new Dart package with best practices.

  `/create-package` — 引导你按最佳实践搭建新的 Dart package。

* `/modify` - Manages a structured modification session
  with automated planning.

  `/modify` — 管理带自动规划的结构化修改会话。

* `/commit` - Automates pre-commit checks and generates
  a descriptive commit message.

  `/commit` — 自动化提交前检查并生成描述性提交消息。

## Create an app

## 创建应用

You can create a new application using the `/create-app` command.
This command bootstraps a brand-new, production-ready Flutter app.
It goes beyond flutter create by asking for your app's purpose,
setting up recommended linter rules,
and generating detailed `DESIGN.md` and `IMPLEMENTATION.md`
files for your review before any code is written.

你可以使用 `/create-app` 命令创建新应用。
该命令会搭建全新的、可用于生产的 Flutter 应用。
它超越 `flutter create`：会询问应用目的、配置推荐的 linter 规则，
并在编写任何代码前生成详细的 `DESIGN.md` 与 `IMPLEMENTATION.md` 供你审阅。

```console
/create-app
```

The `DESIGN.md` file is a design document for the app;
it specifies the problems that the app solves and provides
technical details about how it will work. You can edit
this file before you continue with the implementation steps,
allowing you to guide Gemini to build the exact app that you're looking for.

`DESIGN.md` 是应用的设计文档；
它说明应用要解决的问题并提供工作原理的技术细节。你可以在继续实现步骤前编辑该文件，
以引导 Gemini 构建你期望的确切应用。

Once the design is ready, `/create-app` generates an
`IMPLEMENTATION.md` file, a step-by-step implementation plan,
so that it can iteratively work on feature implementation.
It keeps a record of its progress, so you can pause and restart.
By default, `/create-app` splits the plan up into 3–5 phases,
where each phase is a logical stopping point.
After each phase, Gemini will analyze and format the code,
run tests, and commit the changes. It also updates this file
after it completes a phase in the Journal section.

设计就绪后，`/create-app` 会生成 `IMPLEMENTATION.md`（分步实现计划），
以便迭代实现功能。它会记录进度，便于你暂停与恢复。
默认情况下，`/create-app` 将计划分为 3–5 个阶段，每阶段为逻辑停止点。
每阶段结束后，Gemini 会分析并格式化代码、运行测试并提交变更。
完成某阶段后，它还会在 Journal 部分更新该文件。

## Implement features from the plan

## 按计划实现功能

After you've set up your project, you're ready to implement
the features in your implementation plan using the generated
`IMPLEMENTATION.md` file. Each feature is implemented separately,
as outlined in this file. Once it finishes implementing a feature,
the Flutter extension will mark it as complete.

项目搭建完成后，即可使用生成的 `IMPLEMENTATION.md` 实现计划中的功能。
如该文件所述，各功能分别实现。功能实现完成后，Flutter 扩展会将其标为完成。

Before moving to the next phase, the extension asks for your approval.
You can enter the prompt "looks good" to start generating code.

进入下一阶段前，扩展会征求你的批准。
你可输入提示词「looks good」以开始生成代码。

## Modify

## 修改

To make changes to existing code, the `/modify` command
initiates a guided development session. It asks for your goals,
offers to create a new branch, and generates a `MODIFICATION_PLAN.md`
design doc outlining the proposed modifications and a phased implementation plan.

要对现有代码进行修改，`/modify` 命令会启动引导式开发会话。
它会询问你的目标、提议创建新分支，并生成 `MODIFICATION_PLAN.md` 设计文档，
概述拟议修改与分阶段实现计划。

```console
/modify
```

## Clean up and commit

## 清理并提交

The final step is to commit the changes using `/commit`.
This command prepares your changes before committing them with Git.
It automatically runs `dart fix` and `dart format`,
runs the analyzer and tests, and then generates a descriptive
commit message based on the changes for you to approve.

最后一步是使用 `/commit` 提交变更。
该命令在通过 Git 提交前准备变更：自动运行 `dart fix` 与 `dart format`、
运行分析器与测试，然后根据变更生成描述性提交消息供你批准。

## Fully loaded with best practices

## 内置最佳实践

Every interactive chat session includes rules containing
best practices for Flutter and Dart development.
These rules ensure that Gemini writes high-quality Dart and Flutter code,
interacts with MCP server tools correctly,
and follows best practices such as creating unit tests,
writing documentation, ensuring accessibility, and more.

每次交互式聊天会话都包含 Flutter 与 Dart 开发最佳实践规则。
这些规则确保 Gemini 编写高质量 Dart 与 Flutter 代码、
正确与 MCP server 工具交互，并遵循创建单元测试、编写文档、确保无障碍等最佳实践。

## Access to development tools with the Flutter and Dart MCP server

## 通过 Flutter 与 Dart MCP server 访问开发工具

The Dart and Flutter MCP server is automatically configured
when you install the Flutter Extension for Gemini CLI.
This allows Gemini CLI and other AI agents to perform common
development tasks. For example:

安装适用于 Gemini CLI 的 Flutter 扩展时会自动配置 Dart 与 Flutter MCP server。
这使 Gemini CLI 与其他 AI 智能体能够执行常见开发任务。例如：

* Analyze and fix errors in your project's code.

  分析并修复项目代码中的错误。

* Introspect and interact with your running application
  (such as trigger a hot reload, get the selected widget,
  fetch runtime errors).

  内省并与运行中的应用交互（如触发热重载、获取选中的 widget、获取运行时错误）。

* Search `pub.dev` for the best package for your use case.

  在 `pub.dev` 搜索最适合你场景的 package。

* Manage package dependencies in your `pubspec.yaml` file.

  管理 `pubspec.yaml` 中的 package 依赖。

* Run tests and analyze the results.

  运行测试并分析结果。

## Resources

## 资源

As previously mentioned, this extension is in alpha.
If you find a bug, please [file an issue][].

如前所述，本扩展处于 alpha 阶段。
若发现 bug，请 [提交 issue][file an issue]。

You also might want to check out the
[Gemini CLI extension][] repo.

你也可以查看 [Gemini CLI 扩展][Gemini CLI extension] 仓库。

[file an issue]: {{site.github}}/gemini-cli-extensions/flutter/issues
[Gemini CLI extension]: {{site.github}}/gemini-cli-extensions/flutter
