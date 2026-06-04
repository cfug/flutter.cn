---
# title: Set up Windows development
title: 配置 Windows 开发环境
# description: >-
#   Configure your development environment to
#   run, build, and deploy Flutter apps for Windows.
description: >-
  配置开发环境，以便在 Windows 上运行、构建和部署 Flutter 应用。
ai-translated: true
---

Learn how to set up your development environment
to run, build, and deploy Flutter apps for the Windows desktop platform.

了解如何配置开发环境，以便在 Windows 桌面平台上运行、构建和部署 Flutter 应用。

:::note
If you haven't set up Flutter already,
visit and follow [Install Flutter][] first.

如果你尚未配置 Flutter，请先访问并遵循[安装 Flutter][Install Flutter]。

If you've already installed Flutter,
ensure that it's [up to date][].

如果你已安装 Flutter，请确保其[为最新版本][up to date]。
:::

[Install Flutter]: /install
[up to date]: /install/upgrade

## Set up tooling {: #set-up-tooling}
## 配置工具链 {: #set-up-tooling}

With [Visual Studio][vs], you can run Flutter apps on Windows as well as
compile and debug native C and C++ code.

借助 [Visual Studio][vs]，你可以在 Windows 上运行 Flutter 应用，并编译和调试原生 C 与 C++ 代码。

Note that **Visual Studio** is an IDE separate from **Visual Studio _Code_**
and only supported on Windows.

请注意，**Visual Studio** 是与 **Visual Studio _Code_** 不同的 IDE，且仅在 Windows 上受支持。

1. <h3>Install Visual Studio</h3>

   <h3>安装 Visual Studio</h3>

   If you haven't done so already,
   follow the Microsoft guide to
   [install and set up Visual Studio][vs].

   若尚未安装，请按 Microsoft 指南[安装并配置 Visual Studio][vs]。

   If you've already installed Visual Studio,
   [update it to the latest version][vs-update].

   若已安装 Visual Studio，请[更新到最新版本][vs-update]。

1. <h3>Set up Visual Studio workloads</h3>

   <h3>配置 Visual Studio 工作负载</h3>

   When the Visual Studio installer prompts you to choose workloads,
   select and install the **Desktop development with C++** workload.

   当 Visual Studio 安装程序提示选择工作负载时，请选择并安装 **使用 C++ 的桌面开发** 工作负载。

   If you already installed Visual Studio,
   follow the Microsoft guide to
   [Modify Visual Studio workloads][vs-modify].

   若已安装 Visual Studio，请按 Microsoft 指南[修改 Visual Studio 工作负载][vs-modify]。

   :::tip
   If installing with the command line,
   the ID of the **Desktop development with C++** workload is
   `Microsoft.VisualStudio.Workload.NativeDesktop`.
   :::

   :::tip
   若通过命令行安装，**使用 C++ 的桌面开发** 工作负载的 ID 为 `Microsoft.VisualStudio.Workload.NativeDesktop`。
   :::

{: .steps}

[vs]: https://visualstudio.microsoft.com/
[vs-install]: https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio
[vs-update]: https://learn.microsoft.com/en-us/visualstudio/install/update-visual-studio
[vs-modify]: https://learn.microsoft.com/en-us/visualstudio/install/modify-visual-studio

## Validate your setup {: #validate-setup}
## 验证你的配置 {: #validate-setup}

1. <h3>Check for toolchain issues</h3>

   <h3>检查工具链问题</h3>

   To check for any issues with your Windows development setup,
   run the `flutter doctor` command in your preferred terminal:

   要检查 Windows 开发配置是否存在问题，请在常用终端中运行 `flutter doctor` 命令：

   ```console
   $ flutter doctor -v
   ```

   If you see any errors or tasks to complete under the
   **Windows version** and **Visual Studio - develop Windows apps** sections,
   complete and resolve them, then
   run `flutter doctor -v` again to verify any changes.

   若在 **Windows version** 与 **Visual Studio - develop Windows apps** 部分看到错误或待完成任务，请完成并解决它们，然后再次运行 `flutter doctor -v` 以验证更改。

1. <h3>Check for Windows devices</h3>

   <h3>检查 Windows 设备</h3>

   To ensure Flutter can find and connect to your Windows device correctly,
   run `flutter devices` in your preferred terminal:

   为确保 Flutter 能正确找到并连接你的 Windows 设备，请在常用终端中运行 `flutter devices`：

   ```console
   $ flutter devices
   ```

   If you've set everything up correctly,
   there should be at least one entry with the platform marked as **windows**.

   若一切配置正确，应至少有一条平台标记为 **windows** 的条目。

1. <h3>Troubleshoot setup issues</h3>

   <h3>排查配置问题</h3>

   If you need help resolving any setup issues,
   check out [installation and setup troubleshooting][troubleshoot].
   Depending on your issue,
   also check out Microsoft's guide on
   [Visual Studio troubleshooting][vs-troubleshoot].

   若需要解决配置问题，请参阅[安装与配置故障排除][troubleshoot]。视问题而定，也可查阅 Microsoft 的 [Visual Studio 故障排除][vs-troubleshoot] 指南。

   If you still have issues or questions,
   reach out on one of the Flutter [community][] channels.

   若仍有问题或疑问，可通过 Flutter [社区][community] 渠道联系。

{: .steps}

[troubleshoot]: /install/troubleshoot
[vs-troubleshoot]: https://learn.microsoft.com/en-us/troubleshoot/developer/visualstudio/installation/troubleshoot-installation-issues
[community]: {{site.main-url}}/community

## Start developing for Windows {: #start-developing}
## 开始为 Windows 开发 {: #start-developing}

Congratulations!
Now that you've set up Windows desktop development for Flutter,
you can continue your Flutter learning journey while testing on Windows
or begin expanding integration with Windows.

恭喜！
你已为 Flutter 配置好 Windows 桌面开发，可以在 Windows 上测试的同时继续学习 Flutter，或开始扩展与 Windows 的集成。

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash helping you explore Flutter learning resources.">
    </div>
    <div class="card-header">
      <span class="card-title">Continue learning Flutter</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/learn/pathway">Learn the fundamentals</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">Explore Flutter widgets</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">Check out samples</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-desktop.svg" height="160" aria-hidden="true" alt="An outline of Flutter desktop support.">
    </div>
    <div class="card-header">
      <span class="card-title">Build for Windows</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/windows/building">Build a Windows app</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/windows">Deploy to windows</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/platform-channels">Write Windows-specific code</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/windows/building#customizing-the-windows-host-application">Customize the app window</a>
        </li>
        <li>
          <a class="text-button" href="https://pub.dev/packages/win32">Access Win32 APIs with Dart</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash 帮助你探索 Flutter 学习资源。">
    </div>
    <div class="card-header">
      <span class="card-title">继续学习 Flutter</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/learn/pathway">学习基础知识</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter widget</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">查看示例</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-desktop.svg" height="160" aria-hidden="true" alt="Flutter 桌面支持示意图。">
    </div>
    <div class="card-header">
      <span class="card-title">为 Windows 构建</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/windows/building">构建 Windows 应用</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/windows">部署到 Windows</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/platform-channels">编写 Windows 专用代码</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/windows/building#customizing-the-windows-host-application">自定义应用窗口</a>
        </li>
        <li>
          <a class="text-button" href="https://pub.dev/packages/win32">使用 Dart 访问 Win32 API</a>
        </li>
      </ul>
    </div>
  </div>
</div>
