---
# title: Supported deployment platforms
title: 支持的部署平台
shortTitle: Supported platforms
# description: The platforms that Flutter supports by platform version.
description: Flutter 按平台版本支持的平台列表。
showBreadcrumbs: false
ai-translated: true
---

As of Flutter {{site.documentedFlutterVersion}},
Flutter supports deploying apps on the following combinations of
hardware architectures and operating system versions.
These combinations are called _platforms_.

截至 Flutter {{site.documentedFlutterVersion}}，
Flutter 支持在以下硬件架构与操作系统版本组合上部署应用。
这些组合称为 **platforms（平台）**。

Flutter categorizes platforms as follows:

Flutter 将平台分为以下几类：

* **Supported**: The platforms and versions that the Flutter team supports.

  **Supported（支持）**：Flutter 团队支持的平台与版本。

* **CI-tested**: The Flutter team tests these platforms on every commit.

  **CI-tested（CI 测试）**：Flutter 团队在每个提交上测试这些平台。

* **Unsupported**: The Flutter team doesn't test or support these platforms.

  **Unsupported（不支持）**：Flutter 团队不测试也不支持这些平台。

Based on these categories,
Flutter supports deploying to the following platforms.

根据上述分类，Flutter 支持部署到以下平台。

## Mobile platforms

## 移动平台

<PlatformsGrid>
  <PlatformCard
    name="Android"
    icon="mobile"
    arch="x64, Arm32, Arm64"
    supported="24 to 37"
    ci-tested="24 to 37"
    unsupported="23 and earlier"
    deploy-to-link="/deployment/android"
  />
  <PlatformCard
    name="iOS"
    icon="mobile"
    arch="Arm64"
    supported="15 to 27"
    ci-tested="18 and 26"
    unsupported="14 and earlier"
    deploy-to-link="/deployment/ios"
  />
</PlatformsGrid>

## Desktop platforms

## 桌面平台

:::warning macOS Intel (x64) 终止相关支持
<!-- macOS Intel (x64) deprecation -->

Flutter is phasing out support for Intel-based Macs.
macOS Tahoe (26) is the last release for Intel-based Macs.
macOS Golden Gate (27) requires Apple Silicon.
For details on the timeline and impact,
refer to the [macOS Intel deprecation strategy][].

Flutter 将逐步停止对基于 Intel 的 Mac 的支持。
macOS Tahoe (26) 是面向基于 Intel 的 Mac 的最后一个版本。
macOS Golden Gate (27) 要求使用 Apple Silicon。
相关时间表和影响的详细信息，请查看 
[macOS Intel 弃用策略][macOS Intel deprecation strategy]。

[macOS Intel deprecation strategy]: {{site.main-url}}/go/macos-intel-deprecation
:::

<PlatformsGrid>
  <PlatformCard
    name="Windows"
    icon="desktop_windows"
    arch="x64, Arm64"
    supported="10, 11"
    ci-tested="10"
    unsupported="8 and earlier"
    deploy-to-link="/deployment/windows"
  />
  <PlatformCard
    name="macOS"
    icon="laptop_mac"
    arch="x64, Arm64"
    supported="Monterey (12) to Golden Gate (27)"
    ci-tested="Sequoia (15) and Tahoe (26)"
    unsupported="Big Sur (11) and earlier"
    deploy-to-link="/deployment/macos"
  />
  <PlatformCard
    name="Debian (Linux)"
    icon="computer"
    arch="x64, Arm64"
    deploy-to="Linux"
    supported="10 to 13"
    ci-tested="12"
    unsupported="9 and earlier"
    deploy-to-link="/deployment/linux"
  />
  <PlatformCard
    name="Ubuntu (Linux)"
    icon="computer"
    arch="x64, Arm64"
    deploy-to="Linux"
    supported="20.04 LTS to 24.04 LTS"
    ci-tested="22.04 LTS"
    unsupported="25.10 and earlier non-LTS"
    deploy-to-link="/deployment/linux"
  />
</PlatformsGrid>

## Web platforms

## Web 平台

:::version-note

In Flutter 3.50 and later,
apps built with `--wasm` use WebAssembly in
Firefox and WebKit-based browsers (Safari and all browsers on iOS)
only if you [enable them in your app's `wasmAllowList`][wasm-compatibility].

在 Flutter 3.50 及更高版本中，
使用 `--wasm` 构建的应用仅在 [`wasmAllowList` 中启用了相关功能][wasm-compatibility] 的时候，
才会在 Firefox 和基于 WebKit 的浏览器
（Safari 和 iOS 上所有浏览器）中使用 WebAssembly。

:::

<PlatformsGrid>
  <PlatformCard
    name="Chrome"
    icon="language"
    arch="JavaScript, WebAssembly"
    deploy-to="web"
    supported="[Latest 2](https://chromereleases.googleblog.com/search/label/Stable%20updates)"
    ci-tested="145"
    unsupported="95 and earlier"
    deploy-to-link="/deployment/web"
  />
  <PlatformCard
    name="Firefox"
    icon="language"
    arch="JavaScript, WebAssembly (147+ with opt-in)"
    deploy-to="web"
    supported="[Latest 2](https://www.mozilla.org/en-US/firefox/releases/)"
    ci-tested="148"
    unsupported="98 and earlier"
    deploy-to-link="/deployment/web"
  />
  <PlatformCard
    name="Safari"
    icon="language"
    arch="JavaScript, WebAssembly (26.2+ with opt-in)"
    deploy-to="web"
    supported="15.6 and newer"
    ci-tested="26"
    unsupported="15.5 and earlier"
    deploy-to-link="/deployment/web"
  />
  <PlatformCard
    name="Edge"
    icon="language"
    arch="JavaScript, WebAssembly"
    deploy-to="web"
    supported="[Latest 2](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel)"
    ci-tested="145"
    unsupported="95 and earlier"
    deploy-to-link="/deployment/web"
  />
</PlatformsGrid>

[wasm-compatibility]: /platform-integration/web/wasm#learn-more-about-browser-compatibility

## Previous Flutter versions

To learn about support for previous versions of Flutter,
consult the following resources:

*   [Flutter SDK release notes][].
    Find breaking changes and support updates listed by release.
*   [Supported platforms page history][supported-platforms-history].
    To find historical support matrices,
    view previous versions of this page.

[Flutter SDK release notes]: /release/release-notes
[supported-platforms-history]: {{site.repo.this}}/commits/main/sites/docs/src/content/reference/supported-platforms.md
