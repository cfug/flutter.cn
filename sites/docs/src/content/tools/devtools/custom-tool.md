---
# title: Build custom tooling in Flutter and Dart DevTools
title: 在 Flutter 与 Dart DevTools 中构建自定义工具
breadcrumb: DevTools
# description:
description: 学习如何在 DevTools 中构建自定义开发者工具。
ai-translated: true
---

Have you ever wanted to build developer tooling for Dart and Flutter
but didn’t know where to start?
Or maybe you didn’t want to go through all the work of establishing
a connection to a running Dart or Flutter application to access debugging data?
Then, even if you did create a development tool,
how would you deploy it or give users easy access to it?
You can create developer tooling without all these hurdles.

你是否曾想为 Dart 与 Flutter 构建开发者工具却不知从何入手？
或者不想花费大量精力去连接正在运行的 Dart 或 Flutter 应用以访问调试数据？
即便你创建了开发工具，又如何部署或让用户便捷访问？
你可以绕过这些障碍来创建开发者工具。

With the Dart & Flutter DevTools extensions framework,
you can easily build developer tooling that is tightly
integrated with the existing DevTools tooling suite.
Extensions are built using Flutter web and leverage existing
frameworks and utilities from DevTools to simplify
the developer tool authoring experience.

借助 Dart 与 Flutter DevTools 扩展框架，
你可以轻松构建与现有 DevTools 工具套件紧密集成的开发者工具。
扩展使用 Flutter web 构建，并复用 DevTools 中的框架与工具，
简化开发者工具的编写体验。

![Example DevTools extension for `package:foo`](/assets/images/docs/tools/devtools/custom-devtools-extension.png)

## How do DevTools extensions work?

## DevTools 扩展如何工作？

Extensions are shipped as part of a pub package.
You can add a DevTools extension to an existing pub package,
or you can create a new package that provides a DevTools extension only.
In both these scenarios,
the end-user must list a dependency on the package providing
the DevTools extension in order to see the extension in DevTools.

扩展作为 pub 包的一部分发布。
你可以向现有 pub 包添加 DevTools 扩展，
或创建仅提供 DevTools 扩展的新包。
在这两种情况下，
最终用户必须依赖提供 DevTools 扩展的包，才能在 DevTools 中看到该扩展。

For example, imagine we have some `package:foo`,
and this package provides a DevTools extension.
When a user depends on `package:foo` in their app,
they automatically get access to the DevTools extension
provided by this package. When DevTools detects the
`package:foo` extension is available, based on information
from the user’s app or from their IDE,
a new tab "Foo" will be added to DevTools that contains
the developer tools provided by `package:foo`.

例如，假设有 `package:foo`，该包提供 DevTools 扩展。
当用户在应用中依赖 `package:foo` 时，
会自动获得该包提供的 DevTools 扩展访问权限。
当 DevTools 根据用户应用或 IDE 的信息检测到
`package:foo` 扩展可用时，
会在 DevTools 中新增名为 "Foo" 的标签页，其中包含 `package:foo` 提供的开发者工具。

![Diagram showing how a DevTools extension works](/assets/images/docs/tools/devtools/how-devtools-extension-works.png)

Some examples of packages that have added a DevTools extension
to an existing package are [`package:shared_preferences`][],
[`package:provider`][], [`package:patrol`][], and [`package:drift`][].

已在现有包中添加 DevTools 扩展的包示例包括
[`package:shared_preferences`][]、[`package:provider`][]、[`package:patrol`][] 和 [`package:drift`][]。

[`package:drift`]: {{site.pub-pkg}}/drift
[`package:patrol`]: {{site.pub-pkg}}/patrol
[`package:provider`]: {{site.pub-pkg}}/provider
[`package:shared_preferences`]: {{site.pub-pkg}}/shared_preferences

## What types of tools are supported?

## 支持哪些类型的工具？

With the DevTools extensions framework you can build
many types of tools, including:

借助 DevTools 扩展框架，你可以构建多种工具，包括：

* Companion tools for existing packages.
* New tools that are shipped as their own package.
* Tools that interact with a running application.
* Tools that interact with project files opened in the IDE.
* Tools that interact with the Analysis server.

* 现有包的配套工具。
* 作为独立包发布的新工具。
* 与正在运行的应用交互的工具。
* 与 IDE 中打开的项目文件交互的工具。
* 与分析服务器（Analysis server）交互的工具。

The DevTools Extensions framework comes with out-of-the-box
features that make distributing your extension to users seamless.
For example, users can:

DevTools 扩展框架提供开箱即用的功能，使向用户分发扩展变得顺畅。例如，用户可以：

* Use your tool from DevTools in the browser.
* Use your tool embedded directly in their IDE.
* Discover and open your tool from Dart and Flutter supported IDEs.

* 在浏览器的 DevTools 中使用你的工具。
* 在 IDE 中直接嵌入使用你的工具。
* 从支持 Dart 与 Flutter 的 IDE 中发现并打开你的工具。

Next, learn how to write a DevTools extension.

接下来，学习如何编写 DevTools 扩展。

---

## Write a DevTools extension

## 编写 DevTools 扩展

Before you get started, you need:

开始之前，你需要：

* Flutter SDK >= 3.17 & Dart SDK >= 3.2.
* A [pub][] package that (in your opinion) needs
  a custom DevTools extension.

* Flutter SDK >= 3.17 与 Dart SDK >= 3.2。
* 一个（在你看来）需要自定义 DevTools 扩展的 [pub][] 包。

[pub]: {{site.pub}}

### Set up your package hierarchy

### 设置包目录结构

You will provide either a standalone extension or
a companion extension.

你将提供独立扩展或配套扩展。

#### Standalone extension

#### 独立扩展

For a standalone extension (that isn't being shipped
as part of an existing pub package),
your extension can include source code in the same package
that the extension is shipped with. This simplifies development,
and since users of your package will add your package as a dev_dependency,
the size of your package won't affect the user's app size.
Your package structure will look like the following:

对于独立扩展（不作为现有 pub 包的一部分发布），
扩展可与扩展同包包含源码，简化开发；
由于用户会将你的包添加为 dev_dependency，
包体积不会影响用户应用大小。
包结构如下所示：

```yaml
my_new_tool
  extension/
    devtools/
      build/
        ...  # pre-compiled output of the Flutter web app under lib/
      config.yaml
  lib/  # source code for your extension Flutter web app
    src/
      ...
```

Since the extension is built as a Flutter web app,
use `flutter create` to generate the package:

由于扩展以 Flutter web 应用形式构建，
请使用 `flutter create` 生成包：

```console
flutter create --template app --platforms web my_new_tool
```

Next, use the `my_new_tool` package to configure your extension
in the next step.

接下来，在下一步中使用 `my_new_tool` 包配置扩展。

#### Companion extensions

#### 配套扩展

For a companion extension (that is shipped as part of an existing pub package),
consider placing your extension source code outside of your pub package.
This keeps your package size as small as possible, to avoid inflating
the size of user apps that depend on your package.
Here is the recommended package structure:

对于作为现有 pub 包一部分发布的配套扩展，
建议将扩展源码放在 pub 包之外，
以尽量减小包体积，避免增大依赖该包的用户应用体积。
推荐包结构如下：

```yaml
foo/  # formerly the repository root of your pub package
  packages/
    foo/  # your pub package
      extension/
        devtools/
          build/
            ...  # pre-compiled output of foo_devtools_extension/lib
          config.yaml
    foo_devtools_extension/
      lib/  # source code for your extension Flutter web app
```

## Configure your extension

## 配置扩展

In the Dart package that provides the DevTools extension to users,
add a top-level extension directory:

在向用户提供 DevTools 扩展的 Dart 包中，
添加顶层 `extension` 目录：

```yaml
foo/
  extension/
  lib/
  ...
```

Under the `extension` directory,
create the following structure **exactly as shown**:

在 `extension` 目录下，
**完全按所示** 创建以下结构：

```yaml
extension/
  devtools/
    build/
    config.yaml
```

The `config.yaml` file contains metadata that DevTools
needs to load the extension:

`config.yaml` 文件包含 DevTools 加载扩展所需的元数据：

```yaml
name: foo
version: 0.0.1
issueTracker: <link_to_your_issue_tracker.com>
materialIconCodePoint: '0xe0b1'
requiresConnection: true  # optional field - defaults to true
```

Copy the `config.yaml` file content as shown and
paste it into the `config.yaml` file you just created in your package.
**It's important that you use the exact file name and field names as shown,
or else your extension might fail to load in DevTools**.

按所示复制 `config.yaml` 内容，
粘贴到你刚在包中创建的 `config.yaml` 文件中。
**务必使用所示的确切文件名和字段名，否则扩展可能无法在 DevTools 中加载**。

For each key, fill in the appropriate value for your package.

为每个键填写适合你包的值。

* `name`: The package name for this DevTools extension.
  The value of this field is used in the extension page title bar. [**required**]
* `version`: The version of your DevTools extension.
  This version number should evolve over time as you ship new features for your extension.
  The value of this field is used in the extension page title bar. [**required**]
* `issueTracker`: The URL for your issue tracker.
  When a user clicks the **Report an issue** link in the DevTools UI,
  they are directed to this URL. [**required**]

* `name`：此 DevTools 扩展的包名。该字段值用于扩展页面标题栏。[**required**]（必填）
* `version`：DevTools 扩展的版本号。随你发布新功能应逐步演进。该字段值用于扩展页面标题栏。[**required**]（必填）
* `issueTracker`：问题跟踪器 URL。用户在 DevTools UI 中点击 **Report an issue**（报告问题）链接时会跳转到此 URL。[**required**]（必填）

![DevTools extension screen title bar](/assets/images/docs/tools/devtools/devtools-extension-screen-title-bar.png){:width="80%"}

* `materialIconCodePoint`: Corresponds to the codepoint value of an icon
  from [`material/icons.dart`][]. This icon is used for the extension’s tab
  in the top-level DevTools tab bar. [**required**]

![DevTools extension tab icon](/assets/images/docs/tools/devtools/devtools-extension-tab-icon.png){:width="12%"}

* `materialIconCodePoint`：对应 [`material/icons.dart`][] 中图标的 codepoint 值。该图标用于顶层 DevTools 标签栏中的扩展标签。[**required**]（必填）

![DevTools extension tab icon](/assets/images/docs/tools/devtools/devtools-extension-tab-icon.png){:width="12%"}

* `requiresConnection`: Indicates whether the extension requires a connected Dart
  or Flutter app to use. This is an optional field that will default
  to `true` if unspecified. [**optional**]

* `requiresConnection`：指示扩展是否需要已连接的 Dart 或 Flutter 应用才能使用。此为可选字段，未指定时默认为 `true`。[**optional**]（可选）

For the most up-to-date documentation on the `config.yaml` spec,
visit [extension_config_spec.md][].

有关 `config.yaml` 规范的最新文档，请访问 [extension_config_spec.md][]。

[extension_config_spec.md]: {{site.github}}/flutter/devtools/blob/master/packages/devtools_extensions/extension_config_spec.md
[`material/icons.dart`]: {{site.github}}/flutter/flutter/blob/master/packages/flutter/lib/src/material/icons.dart

## Build your extension

## 构建扩展

Use the following steps to build an extension.

按以下步骤构建扩展。

### Create the Flutter web app

### 创建 Flutter web 应用

:::note
Skip this step if you are building a standalone extension,
since you already did this when you set up your package hierarchy.
:::

:::note
若构建的是独立扩展，可跳过此步，因为在设置包目录结构时已完成。
:::

From the directory where you want your extension source code to live,
run the following command, replacing `foo_devtools_extension` with
`<your_package_name>_devtools_extension`:

在希望放置扩展源码的目录中运行以下命令，
将 `foo_devtools_extension` 替换为 `<your_package_name>_devtools_extension`：

```console
flutter create --template app --platforms web foo_devtools_extension
```

### Add the `package:devtools_extensions` dependency

### 添加 `package:devtools_extensions` 依赖

```console
flutter pub add devtools_extensions
```

You will likely also want to add a dependency on [`package:devtools_app_shared`][],
which contains shared services, utilities, and UI components to use
while building your extension.
Visit [`devtools_app_shared/example`][] for sample usages.

你可能还需要依赖 [`package:devtools_app_shared`][]，
其中包含构建扩展时可用的共享服务、工具与 UI 组件。
示例用法见 [`devtools_app_shared/example`][]。

```console
flutter pub add devtools_app_shared
```

[`package:devtools_app_shared`]: {{site.pub-pkg}}/devtools_app_shared
[`devtools_app_shared/example`]: {{site.github}}/flutter/devtools/tree/master/packages/devtools_app_shared/example

### Add the `DevToolsExtension` widget

### 添加 `DevToolsExtension` widget

In `lib/main.dart`, add the following imports:

在 `lib/main.dart` 中添加以下导入：

```dart
import 'package:devtools_extensions/devtools_extensions.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const FooDevToolsExtension());
}

class FooDevToolsExtension extends StatelessWidget {
  const FooDevToolsExtension({super.key});

  @override
  Widget build(BuildContext context) {
    return const DevToolsExtension(
      child: Placeholder(), // Build your extension here
    );
  }
}
```

The `DevToolsExtension` widget automatically initializes all extensions
required to interact with DevTools.
From anywhere in your extension web app, you can access the following globals:

`DevToolsExtension` widget 会自动初始化与 DevTools 交互所需的全部扩展。
在扩展 web 应用的任意位置，可访问以下全局对象：

* `extensionManager`: a manager for interacting with DevTools or the extensions framework.
* `serviceManager`: a manager for interacting with the connected vm service, if present.
* `dtdManager`: a manager for interacting with the Dart Tooling Daemon, if present.

* `extensionManager`：用于与 DevTools 或扩展框架交互的管理器。
* `serviceManager`：用于与已连接的 vm service 交互的管理器（若存在）。
* `dtdManager`：用于与 Dart Tooling Daemon 交互的管理器（若存在）。

## Debug your extension

## 调试扩展

When developing and maintaining your DevTools extension,
you’ll want to run, debug, and test your extension Flutter web app.
You have a couple of different options for this, outlined below.

开发与维护 DevTools 扩展时，
你需要运行、调试和测试扩展的 Flutter web 应用。
下面概述了几种可选方式。

### Option A: Use the Simulated DevTools Environment (recommended for development)

### 选项 A：使用模拟 DevTools 环境（推荐用于开发）

For debugging purposes,
you will likely want to use the "simulated DevTools environment".
This is a simulated environment that allows you to build your extension
without having to develop it as an embedded iFrame in DevTools.
Running your extension this way will wrap your extension with an environment
that simulates the DevTools-to-DevTools extension connection.
It also gives you access to hot restart and a faster development cycle.

调试时，你可能希望使用「simulated DevTools environment」（模拟 DevTools 环境）。
该模拟环境让你在不将扩展作为 DevTools 内嵌 iFrame 开发的情况下构建扩展。
以此方式运行会用模拟 DevTools 与扩展连接的环境包裹扩展，
并提供热重启与更快的开发周期。

![Debugging an extension with the Simulated DevTools Environment](/assets/images/docs/tools/devtools/devtools-extension-debugger.png)

1. _Your DevTools extension._
2. _The VM service URI for a test app that your DevTools extension will interact with.
   This app should depend on your extension’s parent package (`package:foo` in this example)._
3. _Buttons to perform actions that a user may trigger from DevTools._
4. _Logs showing the messages that will be sent between your extension and DevTools._

1. _你的 DevTools 扩展。_
2. _扩展将与之交互的测试应用的 VM service URI。该应用应依赖扩展的父包（本例为 `package:foo`）。_
3. _用于执行用户可能从 DevTools 触发的操作的按钮。_
4. _显示扩展与 DevTools 之间将发送消息的日志。_

The simulated environment is enabled by the environment parameter `use_simulated_environment`.
To run your extension web app with this flag enabled,
add a configuration to your `launch.json` file in VS code:

模拟环境由环境参数 `use_simulated_environment` 启用。
要在启用该标志的情况下运行扩展 web 应用，
请在 VS Code 的 `launch.json` 中添加配置：

```json
{
    ...
    "configurations": [
        ...
        {
            "name": "foo_devtools_extension + simulated environment",
            "cwd": "packages/foo_devtools_extension",
            "request": "launch",
            "type": "dart",
            "args": [
                "--dart-define=use_simulated_environment=true"
            ],
        },
    ]
}
```

or launch your app from the command line with the added flag:

或在命令行带该标志启动应用：

```console
flutter run -d chrome -dart-define=use_simulated_environment=true
```

### Option B: Use a real DevTools environment

### 选项 B：使用真实 DevTools 环境

Once you develop your extension to a point where you are ready
to test your changes in a real DevTools environment,
you need to perform a series of setup steps:

当扩展开发到可在真实 DevTools 环境中测试变更的阶段时，
需要执行一系列设置步骤：

<ol>
<li>Develop your extension to a point where you are ready to test
    your changes in a real DevTools environment.
    Build your flutter web app and copy the built assets from
    `your_extension_web_app/build/web` to your pub package's
    `extension/devtools/build directory`.

    将扩展开发到可在真实 DevTools 环境中测试变更的阶段。
    构建 Flutter web 应用，并将构建产物从
    `your_extension_web_app/build/web` 复制到 pub 包的
    `extension/devtools/build` 目录。

    Use the `build_and_copy` command from `package:devtools_extensions`
    to help with this step.

    可使用 `package:devtools_extensions` 的 `build_and_copy` 命令完成此步。

    ```console
    cd your_extension_web_app;
    flutter pub get;
    dart run devtools_extensions build_and_copy --source=. --dest=path/to/your_pub_package/extension/devtools
    ```

:::note
    If you are using the recommended package structure for adding an extension
    to an existing pub package,
    the value for `--dest` should be `../your_pub_package/extension/devtools`.
:::

:::note
    若使用向现有 pub 包添加扩展的推荐包结构，
    `--dest` 的值应为 `../your_pub_package/extension/devtools`。
:::

    To ensure that your extension is setup properly for loading in DevTools,
    run the `validate` command from `package:devtools_extensions`.
    The `--package` argument should point to the root of the Dart package
    that this extension will be published with.

    为确保扩展在 DevTools 中正确加载，请运行 `package:devtools_extensions` 的 `validate` 命令。
    `--package` 参数应指向将与此扩展一起发布的 Dart 包根目录。

    ```console
    cd your_extension_web_app;
    flutter pub get;
    dart run devtools_extensions validate --package=path/to/your_pub_package
    ```
</li>

<li>Prepare a test environment with a dependency on your pub package
    that is providing the extension.

    准备测试环境，并依赖提供该扩展的 pub 包。

    In the Dart or Flutter project where you are adding a dependency on your package,
    add a [`path`][] dependency that points to your local package source code
    (the package that contains the `extension/devtools/` directory with your
    extension's assets). Once you have done this, run `pub get` on the package.

    在要添加对你包依赖的 Dart 或 Flutter 项目中，
    添加指向本地包源码的 [`path`][] 依赖
    （包含带扩展资源的 `extension/devtools/` 目录的包）。
    完成后在该包上运行 `pub get`。

    * **If your extension requires a running application**,
      then you’ll need to run the app that depends on your extension.
    * **If your extension does not require a running application**,
      then you will need to open the test Dart or Flutter project
      that depends on your package in a supported IDE
      (VS Code or IntelliJ / Android Studio).


      **若扩展需要正在运行的应用**，
      则需运行依赖该扩展的应用。
      则需在支持的 IDE（VS Code 或 IntelliJ / Android Studio）中
      打开依赖你包的测试 Dart 或 Flutter 项目。

[`path`]: {{site.dart-site}}/tools/pub/dependencies#path-packages
</li>

<li>Start DevTools

    启动 DevTools

    Use one of the following ways to start DevTools:

    可使用以下任一方式启动 DevTools：

    * **If your extension requires a running application**,
      you can open DevTools either from the URI that was printed
      to the command line when you ran the test app,
      or from the IDE where you ran your test app.
    * **If your extension does not require a running application**,
      you can open your Dart or Flutter project that depends on your package
      in a supported IDE (VS Code or IntelliJ / Android Studio).
      Open DevTools from the IDE to view your extension in the browser.
    * **If you need local or unreleased changes from DevTools**,
      you’ll need to build and run DevTools from source.
      See the DevTools [CONTRIBUTING.md][] for a guide on how to do this.
      You’ll need to build DevTools with the server and the
      front end to test extensions ([instructions][]).


      **若扩展需要正在运行的应用**，
      可从运行测试应用时命令行打印的 URI 打开 DevTools，
      或从运行测试应用的 IDE 打开。
      可在支持的 IDE 中打开依赖你包的 Dart 或 Flutter 项目，
      从 IDE 打开 DevTools 在浏览器中查看扩展。
      需从源码构建并运行 DevTools。
      请参阅 DevTools [CONTRIBUTING.md][]。
      需同时构建服务器与前端以测试扩展（[instructions][]）。

</li>

<li>Connect your test app to DevTools if it is not connected already,
    and you should see a tab in the DevTools app bar for your extension.
    The enabled or disabled state of your extension is managed by DevTools,
    which is exposed from an **Extensions** menu in DevTools,
    available from the action buttons in the upper right corner of the screen.

    若测试应用尚未连接，请将其连接到 DevTools，
    你应能在 DevTools 应用栏中看到扩展标签页。
    扩展的启用/禁用状态由 DevTools 管理，
    可通过屏幕右上角操作按钮中的 **Extensions**（扩展）菜单访问。

</li>
</ol>

Once you've opened DevTools,
a tab in the DevTools app bar should appear for your extension.
The enabled or disabled state of your extension is managed by DevTools,
which is exposed from an "Extensions" menu,
available from the action buttons in the upper right corner of the screen.

打开 DevTools 后，应用栏中应出现扩展标签页。
扩展的启用/禁用状态由 DevTools 管理，
可通过屏幕右上角操作按钮中的 "Extensions"（扩展）菜单访问。

![DevTools Extensions menu button](/assets/images/docs/tools/devtools/devtools-extensions-menu-button.png){:width="80%"}

![DevTools Extensions menu](/assets/images/docs/tools/devtools/devtools-extensions-menu.png)

[CONTRIBUTING.md]: {{site.github}}/flutter/devtools/tree/master/packages/devtools_extensions
[instructions]: {{site.github}}/flutter/devtools/blob/master/CONTRIBUTING.md#development-devtools-server--devtools-flutter-web-app

## Publish your package with a DevTools extension

## 发布带有 DevTools 扩展的包

For a package to provide a DevTools extension to its users,
it must be published with the expected content in the
`your_pub_package/extension/devtools/` directory
(as described in the preceding setup instructions).

包要向用户提供 DevTools 扩展，
必须在 `your_pub_package/extension/devtools/` 目录中包含预期内容后发布
（如前述设置说明所述）。

<ol>
<li>Ensure the `extension/devtools/config.yaml` file exists
    and is configured per the specifications above.
    You can run the `validate` command from
    `package:devtools_extensions` to verify.

    确保 `extension/devtools/config.yaml` 存在且按上述规范配置。
    可运行 `package:devtools_extensions` 的 `validate` 命令验证。

 ```console
 cd your_extension_web_app;
 flutter pub get;
 dart run devtools_extensions validate --package=path/to/pkg_providing_your_extension_assets
 ```
</li>

<li>Use the `build_and_copy` command provided by
    `package:devtools_extensions` to build your extension
    and copy the output to the `extension/devtools` directory:

    使用 `package:devtools_extensions` 提供的 `build_and_copy` 命令
    构建扩展并将输出复制到 `extension/devtools` 目录：

    ```console
    cd your_extension_web_app;
    flutter pub get;
    dart run devtools_extensions build_and_copy --source=. --dest=path/to/your_pub_package/extension/devtools
    ```
</li>
</ol>

Then, publish your package on [`pub.dev`][]:

然后在 [`pub.dev`][] 上发布包：

```console
flutter pub publish
```

When running `pub publish`,
you will see a warning if you do not have the `config.yaml` file
and a non-empty `build` directory as required.

运行 `pub publish` 时，
若缺少必需的 `config.yaml` 或非空的 `build` 目录，会看到警告。

For additional guidance around publishing your package,
visit the `package:devtools_extensions` [publishing guide][].

有关发布包的更多说明，请参阅 `package:devtools_extensions` 的 [publishing guide][]（发布指南）。

[`pub.dev`]: {{site.pub}}
[publishing guide]: {{site.pub-pkg}}/devtools_extensions#publish-your-package-with-a-devtools-extension

---

That’s it! Now,
when a user depends on the latest version of your package,
they will automatically get access to the tools you provide
in your DevTools extension.

就是这样！当用户依赖你包的最新版本时，
会自动获得你在 DevTools 扩展中提供的工具。

You might find the following links useful:

以下链接可能对你有帮助：

* For the latest info on this feature,
  visit the [DevTools Extensions README][] on GitHub.
* For issues and feature requests,
  [file an issue][] on the DevTools issue tracker.
* For general support and access to the community of DevTools extension authors,
  check out the [#devtools-extension-authors][extensions-discord] Discord channel
  (you will first need to join the [Flutter Discord server][]).

* 有关此功能的最新信息，请访问 GitHub 上的 [DevTools Extensions README][]。
* 问题与功能请求请在 DevTools 问题跟踪器上 [file an issue][]（提交 issue）。
* 一般支持与 DevTools 扩展作者社区，请查看 [#devtools-extension-authors][extensions-discord] Discord 频道
  （需先加入 [Flutter Discord server][]）。

[DevTools Extensions README]: {{site.github}}/flutter/devtools/blob/master/packages/devtools_extensions/README.md
[extensions-discord]: https://discord.com/channels/608014603317936148/1159561514072690739
[file an issue]: {{site.github}}/flutter/devtools/issues
[Flutter Discord server]: {{site.github}}/flutter/flutter/wiki/Chat
