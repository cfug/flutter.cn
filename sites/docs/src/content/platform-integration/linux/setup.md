---
# title: Set up Linux development
title: 配置 Linux 开发环境
# description: >-
#   Configure your development environment to
#   run, build, and deploy Flutter apps for Linux desktop.
description: >-
  配置开发环境，以便在 Linux 桌面上运行、构建和部署 Flutter 应用。
ai-translated: true
---

Learn how to set up your development environment
to run, build, and deploy Flutter apps for the Linux desktop platform.

了解如何配置开发环境，以便在 Linux 桌面平台上运行、构建和部署 Flutter 应用。

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

To run and debug desktop Flutter apps on Linux,
download and install the prerequisite packages.

要在 Linux 上运行和调试桌面 Flutter 应用，请下载并安装必备软件包。

Using your preferred package manager or mechanism,
install the latest versions of the following packages:

使用你偏好的包管理器或方式，安装以下软件包的最新版本：

- `clang`
- `cmake`
- `ninja-build`
- `pkg-config`
- `libgtk-3-dev`
- `libstdc++-12-dev`

On Debian-based distros with `apt-get`, such as Ubuntu,
install these packages using the following commands:

在基于 Debian、使用 `apt-get` 的发行版（如 Ubuntu）上，可使用以下命令安装这些包：

```console
$ sudo apt-get update -y && sudo apt-get upgrade -y
$ sudo apt-get install -y clang cmake ninja-build pkg-config libgtk-3-dev libstdc++-12-dev
```

## Validate your setup {: #validate-setup}
## 验证你的配置 {: #validate-setup}

 1. <h3>Check for toolchain issues</h3>

    <h3>检查工具链问题</h3>

    To check for any issues with your Linux development setup,
    run the `flutter doctor` command in your preferred terminal:

    要检查 Linux 开发配置是否存在问题，请在常用终端中运行 `flutter doctor` 命令：

    ```console
    $ flutter doctor -v
    ```

    If you see any errors or tasks to complete
    under the **Linux toolchain** section,
    complete and resolve them, then
    run `flutter doctor -v` again to verify any changes.

    若在 **Linux toolchain** 部分看到错误或待完成任务，请完成并解决它们，然后再次运行 `flutter doctor -v` 以验证更改。

 1. <h3>Check for Linux devices</h3>

    <h3>检查 Linux 设备</h3>

    To ensure Flutter can find and connect to your Linux device correctly,
    run `flutter devices` in your preferred terminal:

    为确保 Flutter 能正确找到并连接你的 Linux 设备，请在常用终端中运行 `flutter devices`：

    ```console
    $ flutter devices
    ```

    If you set everything up correctly,
    there should be at least one entry with the platform marked as **linux**.

    若一切配置正确，应至少有一条平台标记为 **linux** 的条目。

 1. <h3>Troubleshoot setup issues</h3>

    <h3>排查配置问题</h3>

    If you need help resolving any setup issues,
    check out [Install and setup troubleshooting][].

    若需要解决配置问题，请参阅[安装与配置故障排除][Install and setup troubleshooting]。

    If you still have issues or questions,
    reach out on one of the Flutter [community][] channels.

    若仍有问题或疑问，可通过 Flutter [社区][community] 渠道联系。

{: .steps}

[Install and setup troubleshooting]: /install/troubleshoot
[community]: {{site.main-url}}/community

## Start developing for Linux {: #start-developing}
## 开始为 Linux 开发 {: #start-developing}

Congratulations!
Now that you've set up Linux desktop development for Flutter,
you can continue your Flutter learning journey while testing on Linux
or begin expanding integration with Linux.

恭喜！
你已为 Flutter 配置好 Linux 桌面开发，可以在 Linux 上测试的同时继续学习 Flutter，或开始扩展与 Linux 的集成。

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
      <span class="card-title">Build for Linux</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/linux/building">Build a Linux app</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/linux">Release a Linux app</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/platform-channels">Write Linux-specific code</a>
        </li>
        <li>
          <a class="text-button" href="https://pub.dev/packages?q=platform%3Alinux+is%3Aplugin">Flutter plugins for Linux</a>
        </li>
        <li>
          <a class="text-button" href="https://github.com/ubuntu-flutter-community/yaru_tutorial">Design Ubuntu-themed apps</a>
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
      <span class="card-title">为 Linux 构建</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/linux/building">构建 Linux 应用</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/linux">发布 Linux 应用</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/platform-channels">编写 Linux 专用代码</a>
        </li>
        <li>
          <a class="text-button" href="https://pub.dev/packages?q=platform%3Alinux+is%3Aplugin">适用于 Linux 的 Flutter 插件</a>
        </li>
        <li>
          <a class="text-button" href="https://github.com/ubuntu-flutter-community/yaru_tutorial">设计 Ubuntu 主题应用</a>
        </li>
      </ul>
    </div>
  </div>
</div>
