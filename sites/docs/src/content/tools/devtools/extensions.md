---
# title: DevTools extensions
title: DevTools 扩展
# description: Learn how to use and build DevTools extensions.
description: 学习如何使用和构建 DevTools 扩展。
ai-translated: true
---

## What are DevTools extensions?

## 什么是 DevTools 扩展？

[DevTools extensions][]
are developer tools provided by third-party packages that are
tightly integrated into the DevTools tooling suite.
Extensions are distributed as part of a pub package,
and they are dynamically loaded into DevTools when
a user is debugging their app.

[DevTools extensions][]（DevTools 扩展）
是由第三方包提供的开发者工具，与 DevTools 工具套件紧密集成。
扩展作为 pub 包的一部分分发，
并在用户调试应用时动态加载到 DevTools 中。

[DevTools extensions]: {{site.pub-pkg}}/devtools_extensions

## Use a DevTools extension

## 使用 DevTools 扩展

If your app depends on a package that provides a
DevTools extension, the extension automatically
shows up in a new tab when you open DevTools.

如果你的应用依赖提供 DevTools 扩展的包，
打开 DevTools 时扩展会自动显示在新标签页中。

### Configure extension enablement states

### 配置扩展启用状态

You need to manually enable the extension before it loads
for the first time. Make sure the extension is provided by
a source you trust before enabling it.

首次加载前你需要手动启用扩展。启用前请确认扩展来自你信任的来源。

When you open the extension for the first time, you'll see a prompt to enable
the extension:

首次打开扩展时，你会看到启用扩展的提示：

![Screenshot of extension enablement prompt](/assets/images/docs/tools/devtools/extension_enable_prompt.png)

You can modify the setting at any time from the DevTools Extensions dialog:

你可以随时在 DevTools Extensions（扩展）对话框中修改该设置：

![Screenshot of DevTools Extensions dialog button](/assets/images/docs/tools/devtools/extension_dialog_button.png)

![Screenshot of extension enablement dialog](/assets/images/docs/tools/devtools/extension_dialog.png)

:::note
If the extension requires connecting to a running application,
you won't see the enablement prompt or enablement settings until
DevTools is connected to a running app.
:::

:::note
如果扩展需要连接到正在运行的应用，
在 DevTools 连接到运行中的应用之前，
你不会看到启用提示或启用设置。
:::

Extension enablement states are stored in a `devtools_options.yaml`
file in the root of the user's project
(similar to `analysis_options.yaml`).

扩展启用状态存储在用户项目根目录的 `devtools_options.yaml` 文件中
（类似于 `analysis_options.yaml`）。

```yaml
description: This file stores settings for Dart & Flutter DevTools.
documentation: https://docs.flutter.dev/tools/devtools/extensions#configure-extension-enablement-states
extensions:
  - provider: true
  - shared_preferences: true
  - foo: false
```

This file stores per-project
(or optionally, per user) settings for DevTools.

该文件存储 DevTools 的按项目（或可选的按用户）设置。

If this file is **checked into source control**,
the specified options are configured for the project.
This means that anyone who pulls a project's
source code and works on the project uses the same settings.

如果该文件 **已纳入源代码管理**，
则指定选项会按项目配置。
这意味着拉取项目源码并在其上工作的所有人使用相同设置。

If this file is **omitted from source control**,
for example by adding `devtools_options.yaml`
as an entry in the `.gitignore` file, then the specified
options are configured separately for each user.
Since each user or contributor to the project
uses a local copy of the `devtools_options.yaml`
file in this case, the specified options might
differ between project contributors.

如果该文件 **未纳入源代码管理**，
例如在 `.gitignore` 中加入 `devtools_options.yaml`，
则指定选项会按用户分别配置。
由于每位用户或贡献者在此情况下使用本地的 `devtools_options.yaml` 副本，
指定选项可能在贡献者之间有所不同。

## Build a DevTools extension

## 构建 DevTools 扩展

For an in-depth guide on how to build a DevTools extension, visit
[Build custom tooling in Flutter and Dart DevTools][build-extensions]

有关如何构建 DevTools 扩展的深入指南，请访问
[Build custom tooling in Flutter and Dart DevTools][build-extensions]（在 Flutter 与 Dart DevTools 中构建自定义工具）

You might also check out the following video:

你也可以观看以下视频：

<YouTubeEmbed id="gOrSc4s4RWY"
  title="Building DevTools extensions | Flutter Build Show"></YouTubeEmbed>

[build-extensions]: /tools/devtools/custom-tool
