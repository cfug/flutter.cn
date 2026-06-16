---
# title: Create a new Flutter app
title: 创建新的 Flutter 应用
shortTitle: Create a new app
# description: >-
#   Learn how to bootstrap a new Flutter application from
#   your command-line, different editors, and even in the cloud.
description: >-
  了解如何从命令行、不同编辑器甚至云端引导创建新的 Flutter 应用。
showBreadcrumbs: false
ai-translated: true
---

This page provides step-by-step instructions on how to
bootstrap a new Flutter app in your preferred development environment.

本页提供在你首选开发环境中引导创建新 Flutter 应用的分步说明。

To create a new Flutter app, first [set up Flutter][flutter-setup], then
choose your preferred environment and follow the corresponding instructions.

要创建新 Flutter 应用，请先 [配置 Flutter][flutter-setup]，
然后选择首选环境并遵循相应说明。

<div class="card-grid">
  <a class="card outlined-card" href="#vs-code">
    <div class="card-header">
      <span class="card-title">VS Code</span>
    </div>
    <div class="card-content">
      <p>Create a new Flutter app without leaving VS Code.</p>
      <p>无需离开 VS Code 即可创建新的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#android-studio">
    <div class="card-header">
      <span class="card-title">Android Studio</span>
    </div>
    <div class="card-content">
      <p>Create a new Flutter app without leaving Android Studio.</p>
      <p>无需离开 Android Studio 即可创建新的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#intellij">
    <div class="card-header">
      <span class="card-title">IntelliJ</span>
    </div>
    <div class="card-content">
      <p>Create a new Flutter app without leaving your IntelliJ-based IDE.</p>
      <p>无需离开基于 IntelliJ 的 IDE，即可创建新的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#antigravity">
    <div class="card-header">
      <span class="card-title">Antigravity</span>
    </div>
    <div class="card-content">
      <p>For agentic coding support, create a new Flutter app in Antigravity.</p>
      <p>如果需要代理编码支持，请在 Antigravity 中创建一个新的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#terminal">
    <div class="card-header">
      <span class="card-title"><t>Terminal</t><t>终端</t></span>
    </div>
    <div class="card-content">
      <p>For maximum flexibility, create a new Flutter app from the command line.</p>
      <p>如果需要更灵活，可以通过命令行创建一个新的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app#get-started">
    <div class="card-header">
      <span class="card-title">
        <span>Add to app</span><span>将 Flutter 添加到现有应用程序</span>
        <Icon id="open_in_new" size="1rem" />
      </span>
    </div>
    <div class="card-content">
      <p>Create a new Flutter module to embed in an existing app.</p>
      <p>创建一个新的 Flutter module，将其嵌入到现有的应用中。</p>
    </div>
  </a>
</div>

## VS Code

To create a Flutter app with [VS Code][] and other Code OSS-based editors,
you first need to [install Flutter][flutter-setup] and
[set up VS Code][vscode-setup] for Flutter development.
Then follow these steps:

要使用 [VS Code][] 及其他基于 Code OSS 的编辑器创建 Flutter 应用，
请先 [安装 Flutter][flutter-setup] 并为 Flutter 开发 [配置 VS Code][vscode-setup]。
然后按以下步骤操作：

 1. <h3>Launch VS Code</h3>

    <h3>启动 VS Code</h3>

    Open VS Code or your preferred Code OSS-based editor.

    打开 VS Code 或你首选的基于 Code OSS 的编辑器。

 1. <h3>Open the command palette</h3>

    <h3>打开命令面板</h3>

    Go to **View** <span aria-label="and then">></span> **Command Palette** or
    press <kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>P</kbd>.

    前往 **View** <span aria-label="and then">></span> **Command Palette**，
    或按 <kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>P</kbd>。

 1. <h3>Find the Flutter commands</h3>

    <h3>查找 Flutter 命令</h3>

    In the command palette, start typing `flutter:`.
    VS Code should surface commands from the Flutter plugin.

    在命令面板中输入 `flutter:`，VS Code 应显示 Flutter 插件命令。

 1. <h3>Run the new project command</h3>

    <h3>运行新建项目命令</h3>

    Select the **Flutter: New Project** command.
    Your OS or VS Code might ask for access to your documents,
    agree to continue to the next step.

    选择 **Flutter: New Project** 命令；
    系统或 VS Code 可能请求文档访问权限，同意以继续。

 1. <h3>Choose a template</h3>

    <h3>选择模板</h3>

    VS Code should prompt you with **Which Flutter template?**.
    Depending on what type of Flutter project you want to create,
    choose the corresponding template.
    For a new Flutter app, choose **Application**.

    VS Code 会提示 **Which Flutter template?**；
    根据项目类型选择模板，新建应用选 **Application**。

 1. <h3>Select a project location</h3>

    <h3>选择项目位置</h3>

    A file dialog should appear.
    Select or create the parent directory where
    you want the project to be created.
    Don't create the project folder itself, the Flutter tool does so.
    To confirm your selection,
    click **Select a folder to create the project in**.

    将出现文件对话框；选择或创建父目录（勿自行创建项目文件夹）。
    点击 **Select a folder to create the project in** 确认。

 1. <h3>Enter a project name</h3>

    <h3>输入项目名称</h3>

    VS Code should prompt you to enter a name for your new project.
    Enter a name for your app that follows the `lowercase_with_underscores`
    naming convention, following the [Effective Dart][package-name] guidelines.
    To confirm your selection, press <kbd>Enter</kbd>.

    VS Code 会提示输入项目名称；
    按 `lowercase_with_underscores` 与 [Effective Dart][package-name] 输入名称，按 <kbd>Enter</kbd> 确认。

 1. <h3>Wait for project initialization</h3>

    <h3>等待项目初始化</h3>

    Based on the information you entered,
    VS Code uses `flutter create` to bootstrap your app.
    Progress is often surfaced as a notification in the bottom right
    and can also be accessed from the **Output** panel.

    VS Code 根据输入用 `flutter create` 引导应用；进度常在右下角通知或 **Output** 面板显示。

 1. <h3>Run your app</h3>

    <h3>运行你的应用</h3>

    Your new app should now be created and open in VS Code.
    To try your new app,
    follow the steps to [run and debug][vscode-run] in VS Code.

    新应用应已在 VS Code 中打开；试运行请按 [运行与调试][vscode-run] 步骤操作。

{:.steps}

You've successfully created a new Flutter app in VS Code!
If you need more help with developing Flutter in VS Code,
check out the [VS Code for Flutter reference][vscode-more].

你已在 VS Code 中成功创建新的 Flutter 应用！更多帮助请参阅 [VS Code 的 Flutter 参考][vscode-more]。

[VS Code]: https://code.visualstudio.com/
[vscode-setup]: /tools/vs-code#installation-and-setup
[vscode-run]: /tools/vs-code#running-and-debugging
[vscode-more]: /tools/vs-code

## Android Studio

To create a Flutter app with Android Studio,
you first need to [install Flutter][flutter-setup] and
[set up Android Studio][as-setup] for Flutter development.
Then follow these steps:

要使用 Android Studio 创建 Flutter 应用，请先 [安装 Flutter][flutter-setup] 并 [配置 Android Studio][as-setup]，然后按以下步骤操作：

 1. <h3>Launch Android Studio</h3>

    <h3>启动 Android Studio</h3>

    Open Android Studio with the Dart and Flutter plugins installed.

    打开已安装 Dart 与 Flutter 插件的 Android Studio。

 1. <h3>Begin project creation</h3>

    <h3>开始创建项目</h3>

    If you're on the IDE welcome dialog that says **Welcome to Android Studio**,
    find and click the **New Flutter Project** button in the center.

    若在显示 **Welcome to Android Studio** 的欢迎对话框，点击中央的 **New Flutter Project** 按钮。

    If you already have a project open, either close it or
    go to **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Flutter Project...**.

    若已有打开的项目，可关闭或前往 **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Flutter Project...**。

 1. <h3>Choose a project type</h3>

    <h3>选择项目类型</h3>

    In the **New Project** dialog, under **Generators** in the left panel,
    select **Flutter**.

    在 **New Project** 对话框左侧 **Generators** 下选择 **Flutter**。

 1. <h3>Verify Flutter SDK setup</h3>

    <h3>验证 Flutter SDK 配置</h3>

    At the top of the right panel, ensure the **Flutter SDK path** value matches
    the location of the Flutter SDK you'd like to develop with.
    If not, update it by choosing or specifying the correct one.

    在右侧面板顶部确保 **Flutter SDK path** 与欲使用的 Flutter SDK 位置一致，否则请选择或指定正确路径。

 1. <h3>Configure your project</h3>

    <h3>配置你的项目</h3>

    Click **Next** to continue to project configuration.
    Multiple configuration options should appear.

    点击 **Next** 继续项目配置，将出现多个配置选项。

    In the **Project name** field, enter a name for your app that
    follows the `lowercase_with_underscores` naming convention,
    following the [Effective Dart][package-name] guidelines.

    在 **Project name** 字段输入符合 `lowercase_with_underscores` 规范的应用名称，遵循 [Effective Dart][package-name] 指南。

    If you're not creating an application,
    select another template from the **Project type** dropdown.

    若并非创建 application，从 **Project type** 下拉框选择其他模板。

    If you're creating an app that you might publish in the future,
    set the **Organization** field [to your company domain][as-set-org].

    若未来可能发布应用，将 **Organization** 字段 [设为公司域名][as-set-org]。

    The other fields can be kept as is or
    configured according to your project's needs.

    其他字段可保持默认或按项目需要配置。

 1. <h3>Finish project creation</h3>

    <h3>完成项目创建</h3>

    Once you've completed the configuration of your project,
    click **Create** to begin project initialization.

    完成项目配置后，点击 **Create** 开始初始化。

 1. <h3>Wait for workspace initialization</h3>

    <h3>等待工作区初始化</h3>

    Android Studio will now initialize your workspace,
    bootstrap your project file structure,
    and retrieve your app's dependencies.
    This might take a while and can be tracked at the bottom of the window.

    Android Studio 将初始化工作区、引导项目结构并获取依赖，可能耗时，可在窗口底部查看进度。

 1. <h3>Run your app</h3>

    <h3>运行你的应用</h3>

    Your new app should now be created and open in Android Studio.
    To try your new app,
    follow the steps to [run and debug][as-run] in Android Studio.

    新应用应已创建并在 Android Studio 中打开；试运行请按 [运行与调试][as-run] 步骤操作。

{:.steps}

You've successfully created a new Flutter app in Android Studio!
If you need more help with developing Flutter in Android Studio,
check out the [Android Studio for Flutter reference][as-more].

你已在 Android Studio 中成功创建新的 Flutter 应用！
更多帮助请参阅 [Android Studio 的 Flutter 参考][as-more]。

[as-setup]: /tools/android-studio#installation-and-setup
[as-set-org]: /tools/android-studio#set-the-company-domain
[as-run]: /tools/android-studio#running-and-debugging
[as-more]: /tools/android-studio

## IntelliJ

To create a Flutter app with IntelliJ or other JetBrains IDEs,
you first need to [install Flutter][flutter-setup] and
[set up IntelliJ][ij-setup] for Flutter development.
Then follow these steps:

要使用 IntelliJ 或其他 JetBrains IDE 创建 Flutter 应用，
请先 [安装 Flutter][flutter-setup] 并 [配置 IntelliJ][ij-setup]，
然后按以下步骤操作：

 1. <h3>Launch IntelliJ</h3>

    <h3>启动 IntelliJ</h3>

    Open IntelliJ IDEA or your preferred IntelliJ-based IDE by JetBrains
    that has the Dart and Flutter plugins installed.

    打开已安装 Dart 与 Flutter 插件的 IntelliJ IDEA 或你首选的 JetBrains 旗下基于 IntelliJ 的 IDE。

 1. <h3>Begin project creation</h3>

    <h3>开始创建项目</h3>

    If you're on the IDE welcome dialog that says **Welcome to IntelliJ IDEA**,
    find and click the **New Project** button in the upper right corner.

    若在 **Welcome to IntelliJ IDEA** 欢迎对话框，点击右上角 **New Project** 按钮。

    If you already have a project open, either close it or
    go to **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Project...**.

    若已有打开的项目，可关闭或前往 **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Project...**。

 1. <h3>Choose a project type</h3>

    <h3>选择项目类型</h3>

    In the **New Project** dialog, under **Generators** in the left panel,
    select **Flutter**.

    在 **New Project** 对话框左侧 **Generators** 下选择 **Flutter**。

 1. <h3>Verify Flutter SDK setup</h3>

    <h3>验证 Flutter SDK 配置</h3>

    At the top of the right panel, ensure the **Flutter SDK path** value matches
    the location of the Flutter SDK you'd like to develop with.
    If not, update it by choosing or specifying the correct one.

    在右侧面板顶部确保 **Flutter SDK path** 与欲使用的 Flutter SDK 位置一致，否则请选择或指定正确路径。

 1. <h3>Configure your project</h3>

    <h3>配置你的项目</h3>

    Click **Next** to continue to project configuration.
    Multiple configuration options should appear.

    点击 **Next** 继续项目配置，将出现多个配置选项。

    In the **Project name** field, enter a name for your app that
    follows the `lowercase_with_underscores` naming convention,
    following the [Effective Dart][package-name] guidelines.

    在 **Project name** 字段输入符合 `lowercase_with_underscores` 规范的应用名称，
    遵循 [Effective Dart][package-name] 指南。

    If you're not creating an application,
    select another template from the **Project type** dropdown.

    若并非创建 application，从 **Project type** 下拉框选择其他模板。

    If you're creating an app that you might publish in the future,
    set the **Organization** field [to your company domain][ij-set-org].

    若未来可能发布应用，将 **Organization** 字段 [设为公司域名][ij-set-org]。

    The other fields can be kept as is or
    configured according to your project's needs.

    其他字段可保持默认或按项目需要配置。

 1. <h3>Finish project creation</h3>

    <h3>完成项目创建</h3>

    Once you've completed the configuration of your project,
    click **Create** to begin project initialization.

    完成项目配置后，点击 **Create** 开始初始化。

 1. <h3>Wait for workspace initialization</h3>

    <h3>等待工作区初始化</h3>

    IntelliJ will now initialize your workspace,
    bootstrap your project file structure,
    and retrieve your app's dependencies.
    This might take a while and can be tracked at the bottom of the window.

    IntelliJ 将初始化工作区、引导项目结构并获取依赖，可能耗时，可在窗口底部查看进度。

 1. <h3>Run your app</h3>

    <h3>运行你的应用</h3>

    Your new app should now be created and open in IntelliJ.
    To try your new app,
    follow the steps to [run and debug][ij-run] in IntelliJ.

    新应用应已在 IntelliJ 中创建并打开；试运行请按 [运行与调试][ij-run] 步骤操作。

{:.steps}

You've successfully created a new Flutter app in IntelliJ!
If you need more help with developing Flutter in IntelliJ,
check out the [IntelliJ for Flutter reference][ij-more].

你已在 IntelliJ 中成功创建新的 Flutter 应用！
更多帮助请参阅 [IntelliJ 的 Flutter 参考][ij-more]。

[ij-setup]: /tools/android-studio#installation-and-setup
[ij-more]: /tools/android-studio
[ij-run]: /tools/android-studio#running-and-debugging
[ij-set-org]: /tools/android-studio#set-the-company-domain

<a id="project-idx" aria-hidden="true"></a>

## Antigravity

To create a Flutter app with Antigravity, you first need
to install and set up Antigravity as described on the
[Antigravity tools page](/tools/antigravity).
Then follow these steps:

要使用 Antigravity 创建 Flutter 应用，
请先按 [Antigravity 工具页面](/tools/antigravity) 的说明安装并配置 Antigravity。
然后按以下步骤操作：

 1. <h3>Open Antigravity and create a Workspace</h3>

    <h3>打开 Antigravity 并创建工作区</h3>

    Launch the Antigravity IDE and create a new,
    sandboxed workspace for your project using the Agent Manager.

    启动 Antigravity IDE，使用 Agent Manager 为你的项目创建一个新的沙盒化工作区。

 1. <h3>Use the Agent Manager</h3>

    <h3>使用 Agent Manager</h3>

    Switch to the Agent Manager interface,
    which is where you interact with the AI agents by using chat.

    切换到 Agent Manager 界面，你将在这里通过聊天与 AI agent 交互。

 1. <h3>Write detailed prompts</h3>

    <h3>编写详细的提示词</h3>

    Communicate your app requirements to the agent using detailed,
    structured prompts, much like providing instructions to a junior developer.
    For example, "Create a new Flutter project named my_app.
    Add a home screen with a list of items and a floating action button".

    使用详细、结构化的提示词向 agent 传达你的应用需求，就像给初级开发者下达指令一样。
    例如：「Create a new Flutter project named my_app.
    Add a home screen with a list of items and a floating action button」。

 1. <h3>Review and approve the plan</h3>

    <h3>审查并批准计划</h3>

    The AI agent will generate a detailed implementation plan,
    including folder structure, dependencies, and steps.
    You can review this plan and click **Proceed** or
    provide feedback to make changes.

    AI agent 会生成详细的实现计划，包括文件夹结构、依赖和步骤。
    你可以审查该计划并点击 **Proceed**，或提供反馈以做出修改。

 1. <h3>Authorize actions</h3>

    <h3>授权操作</h3>

    The agent will ask for permission before running terminal commands
    (like `flutter pub add` or `flutter create`) or accessing the browser/emulator.
    Review and **Accept** these actions to allow the agent to build the app.

    agent 在运行终端命令（如 `flutter pub add` 或 `flutter create`）或访问浏览器/模拟器前会请求许可。
    审查并 **Accept** 这些操作，以允许 agent 构建应用。

 1. <h3>Iterate and refine</h3>

    <h3>迭代与优化</h3>

    Once the initial app is generated,
    you can provide further prompts to add features,
    refine the UI, implement logic, or add persistence
    (for example, "Add local storage using shared_preferences").

    初始应用生成后，你可以提供更多提示词来添加功能、优化 UI、实现逻辑或添加持久化
    （例如：「Add local storage using shared_preferences」）。

 1. <h3>Test the app</h3>

    <h3>测试应用</h3>

    Use the integrated emulator or connect a physical device
    to test the app. The agent can even run tests and provide
    video walkthroughs of the functionality.

    使用集成模拟器或连接实体设备来测试应用。
    agent 甚至可以运行测试并提供功能的视频演示。

 1. <h3>Verify code in the editor</h3>

    <h3>在编辑器中验证代码</h3>

    You can switch to the standard code editor view at any time 
    to inspect the generated Dart and Flutter files,
    ensuring the code quality meets your standards.

    你可以随时切换到标准代码编辑器视图，
    检查生成的 Dart 和 Flutter 文件，确保代码质量符合你的标准。

{:.steps}

## Terminal

## 终端

To create a Flutter app in your terminal,
you first need to install and [set up Flutter][flutter-setup].
Then follow these steps:

要在终端中创建 Flutter 应用，请先安装并 [配置 Flutter][flutter-setup]。
然后按以下步骤操作：

 1. <h3>Open your terminal</h3>

    <h3>打开终端</h3>

    Open your preferred method to access the command line,
    such as Terminal on macOS or PowerShell on Windows.

    打开你首选的命令行访问方式，例如 macOS 上的 Terminal 或 Windows 上的 PowerShell。

 1. <h3>Navigate to the desired directory</h3>

    <h3>导航到目标目录</h3>

    Ensure your current working directory
    is the desired parent directory for your new app.
    Don't create the project folder, the `flutter` tool will do so.

    确保当前工作目录是新应用所需的父目录。不要自行创建项目文件夹，`flutter` 工具会创建它。

 1. <h3>Configure project creation</h3>

    <h3>配置项目创建</h3>

    In your terminal, type out the `flutter create` command and
    pass in any desired flags and options to configure your project.
    For example, to create an app with a minimal `main.dart` file,
    you can add the `--empty` option:

    在终端中输入 `flutter create` 命令，并传入所需的标志和选项来配置项目。
    例如，要创建一个带有极简 `main.dart` 文件的应用，可以添加 `--empty` 选项：

    ```console
    $ flutter create --empty
    ```

    To learn about the available creation options,
    run `flutter create --help` in another terminal window.

    要了解可用的创建选项，请在另一个终端窗口运行 `flutter create --help`。

 1. <h3>Enter a project name</h3>

    <h3>输入项目名称</h3>

    As the only non-option argument to `flutter create`,
    specify the directory and default name for your application.
    The name should follow the `lowercase_with_underscores` naming convention,
    following the [Effective Dart][package-name] guidelines.

    作为 `flutter create` 唯一的非选项参数，指定应用的目录和默认名称。
    名称应遵循 `lowercase_with_underscores` 命名规范，符合 [Effective Dart][package-name] 指南。

    For example, if you wanted to create an app named `my_app`:

    例如要创建名为 `my_app` 的应用：

    ```console
    $ flutter create my_app
    ```

 1. <h3>Execute the configured command</h3>

    <h3>执行配置好的命令</h3>

    To create a project with your specified configuration,
    run the command you built in the previous step.

    要按指定配置创建项目，运行你在上一步构建的命令。

 1. <h3>Wait for project initialization</h3>

    <h3>等待项目初始化</h3>

    The `flutter` tool will now bootstrap your project's file structure
    and retrieve any necessary dependencies.
    This might take a while.

    `flutter` 工具将引导项目的文件结构并获取所有必要依赖。这可能需要一些时间。

 1. <h3>Navigate into the project directory</h3>

    <h3>进入项目目录</h3>

    Now that your project has been created,
    you can navigate to it in your terminal or your preferred editor.
    For example, with a bash shell and a project named `my_app`:

    项目创建完成后，你可以在终端或首选编辑器中进入它。
    例如，使用 bash shell 且项目名为 `my_app`：

    ```console
    $ cd my_app
    ```

 1. <h3>Run your app</h3>

    <h3>运行你的应用</h3>

    To try your new app,
    run the `flutter run` command in your terminal and
    respond to its prompts to select an output device.

    要试用新应用，在终端运行 `flutter run` 命令，并根据提示选择输出设备。

{:.steps}

You've successfully created a new Flutter app in your terminal!
If you need help configuring your project or with the `flutter` CLI tool,
check out the [Flutter CLI reference][cli-reference].

你已在终端中成功创建新的 Flutter 应用！
若在配置项目或使用 `flutter` CLI 工具时需要帮助，
请参阅 [Flutter CLI 参考][cli-reference]。

[cli-reference]: /reference/flutter-cli

[flutter-setup]: /install
[package-name]: {{site.dart-site}}/effective-dart/style#do-name-packages-and-file-system-entities-using-lowercase-with-underscores
