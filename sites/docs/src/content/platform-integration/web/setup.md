---
# title: Set up web development
title: 配置 Web 开发环境
# description: >-
#   Configure your development environment to
#   run, build, and deploy Flutter apps for the web platform.
description: >-
  配置开发环境，以便在 Web 平台上运行、构建和部署 Flutter 应用。
ai-translated: true
---

Learn how to set up your development environment
to run, build, and deploy Flutter apps for the web platform.

了解如何配置开发环境，以便在 Web 平台上运行、构建和部署 Flutter 应用。

:::note
If you haven't set up Flutter already,
[install Flutter][] first.

如果你尚未配置 Flutter，请先[安装 Flutter][install Flutter]。

If you've already installed Flutter,
ensure that it's [up to date][].

如果你已安装 Flutter，请确保其[为最新版本][up to date]。
:::

[install Flutter]: /install
[up to date]: /install/upgrade

## Install a web browser {: #install}
## 安装 Web 浏览器 {: #install}

To run and debug your Flutter app on the web,
[download and install Google Chrome][chrome-install]
or [install and use Microsoft Edge][edge-install].

要在 Web 上运行和调试 Flutter 应用，请[下载并安装 Google Chrome][chrome-install]，或[安装并使用 Microsoft Edge][edge-install]。

<details>
<summary>Expand for instructions for other browsers · 展开以查看其他浏览器的说明</summary>

If you want to debug your app in other web browsers,
you can use the `flutter run -d web-server` command,
and manually navigate to the specified URL in your preferred browser.

若要在其他 Web 浏览器中调试应用，可使用 `flutter run -d web-server` 命令，并在你偏好的浏览器中手动打开指定 URL。

Note that debugging support in the `web-server` mode is limited.

请注意，`web-server` 模式下的调试支持有限。

</details>


[chrome-install]: https://www.google.com/chrome/
[edge-install]: https://www.microsoft.com/edge

## Validate your setup {: #validate-setup}
## 验证你的配置 {: #validate-setup}

To ensure that you installed the browser successfully,
and that Flutter can find it,
run `flutter devices` in your preferred terminal.

为确保浏览器安装成功且 Flutter 能找到它，请在常用终端中运行 `flutter devices`。

You should at least see one connected device labeled
**Chrome (web)** or **Edge (web)**, similar to the following:

你应至少看到一台标记为 **Chrome (web)** 或 **Edge (web)** 的已连接设备，类似于：

```console highlightLines=4
$ flutter devices

Found 1 connected devices:
  Chrome (web)    • chrome • web-javascript • Google Chrome
```

If the command isn't found, or you don't see Chrome listed,
check out [Set up troubleshooting][troubleshoot].

若找不到该命令或未列出 Chrome，请参阅[配置故障排除][troubleshoot]。

[troubleshoot]: /install/troubleshoot

## Start developing for the web {: #start-developing}
## 开始为 Web 开发 {: #start-developing}

Now that you've set up web development for Flutter,
you can continue your Flutter learning journey while testing on the web
or begin expanding integration with the web.

你已为 Flutter 配置好 Web 开发，可以在 Web 上测试的同时继续学习 Flutter，或开始扩展与 Web 的集成。

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
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="A representation of Flutter on multiple devices.">
    </div>
    <div class="card-header">
      <span class="card-title">Build for the web</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/web/building">Build a web app with Flutter</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/initialization">Customize app initialization</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/wasm">Compile to Wasm</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/web-content-in-flutter">Integrate web content</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/embedding-flutter-web">Embed in another web app</a>
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
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="Flutter 在多设备上的示意图。">
    </div>
    <div class="card-header">
      <span class="card-title">为 Web 构建</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/web/building">使用 Flutter 构建 Web 应用</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/initialization">自定义应用初始化</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/wasm">编译为 Wasm</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/web-content-in-flutter">集成 Web 内容</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/embedding-flutter-web">嵌入到其他 Web 应用</a>
        </li>
      </ul>
    </div>
  </div>
</div>
