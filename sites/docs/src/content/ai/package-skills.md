---
# title: Package skills
title: Package 技能
# description: >-
#   Learn how to bundle and consume agent skills in Dart and Flutter packages.
description: >-
  了解如何在 Dart 与 Flutter package 中打包并使用智能体技能。
ai-translated: true
---

Package skills allow library authors to distribute AI instructions alongside
their code on [pub.dev](https://pub.dev). When developers add your package to
their project, their AI coding assistant can discover and use your package's
official skills.

Package 技能让库作者可以在 [pub.dev](https://pub.dev) 上
把 AI 指令和代码一起分发。
当开发者把你的 package 加入项目后，
他们的 AI 编程助手就能发现并使用该 package 的官方技能。

## For app developers: Consuming package skills

## 面向应用开发者：使用 package 技能

When you add a package that includes skills, your coding assistant can access
expert guidance tailored specifically to that library's APIs, patterns, and
code generation workflows.

当你添加一个包含技能的 package 时，
编程助手就能获得专门针对该库 API、模式和代码生成流程的专家指导。

### Discover and install skills from dependencies

### 从依赖中发现并安装技能

To scan your project dependencies and install available package skills, run:

要扫描项目依赖并安装可用的 package 技能，请运行：

```bash
dart run skills@ get
```

The `skills` CLI scans your dependencies for bundled `skills/` directories,
presents the skills discovered, and lets you choose which skills to install.
Subsequent runs are incremental—displaying only new, updated, or removed
skills.

`skills` CLI 会扫描依赖中附带的 `skills/` 目录，
展示发现的技能，并让你选择要安装哪些。
后续运行是增量式的，只显示新增、更新或移除的技能。

To automatically install all discovered skills without interactive prompts, use
the `--all` flag:

要在没有交互提示的情况下自动安装所有发现的技能，
请使用 `--all` 标志：

```bash
dart run skills@ get --all
```

### Install external skills

### 安装外部技能

You can also install standalone skills from external Git repositories using the
`add` command:

你也可以用 `add` 命令，
从外部 Git 仓库安装独立技能：

```bash
dart run skills@ add https://github.com/my-org/custom-ai-skills.git
```

---

## For package authors: Publishing skills

## 面向 package 作者：发布技能

Package authors can publish skills directly in their `pub.dev` package
releases to teach AI assistants how to use their libraries correctly.

Package 作者可以把技能直接放进 `pub.dev` 上的 package 发布中，
从而教 AI 助手如何正确使用他们的库。

### Add skills to your package repository

### 向 package 仓库添加技能

1. Create a `skills/` directory in the root of your package repository.

   在 package 仓库根目录创建 `skills/` 目录。

2. Inside `skills/`, create a subdirectory prefixed with your package name (for
   example, `skills/my-package-network/`).

   在 `skills/` 中创建一个以 package 名称作为前缀的子目录
   （例如 `skills/my-package-network/`）。

3. Add a `SKILL.md` file containing YAML frontmatter (`name`, `description`)
   and step-by-step markdown instructions.

   添加 `SKILL.md` 文件，其中包含 YAML front matter
   （`name`、`description`）以及分步 Markdown 说明。

4. Verify that the `skills/` directory is not excluded in your `.pubignore`
   file.

   确认 `.pubignore` 文件没有排除 `skills/` 目录。

5. Publish your package to `pub.dev`.

   把 package 发布到 `pub.dev`。

### Example `SKILL.md` structure

### `SKILL.md` 结构示例

```markdown
---
name: my_package-error-handling
description: >-
  Use when making network requests with my_package to ensure safe patterns.
---

# Error handling guidelines

## Best practices
* Always wrap network operations in a try/catch block.
* Catch `NetworkException` specifically to handle retries and diagnostics.
* Provide fallback UI state in the event of a timeout.

## Example
1. Call `MyClient.fetchData()`.
2. Catch `NetworkException` and log `e.context`.
3. Return a fallback UI model.
```

---

## Next steps

## 后续步骤

* To explore the underlying specification, check out
  [agentskills.io](https://agentskills.io/).

  要了解底层规范，请查阅
  [agentskills.io](https://agentskills.io/)。

* To file issues or give feedback on Dart skills tooling, visit the
  [dart-lang/ai repository](https://github.com/dart-lang/ai).

  要提交 issue 或反馈 Dart 技能工具，请访问
  [dart-lang/ai 仓库](https://github.com/dart-lang/ai)。
