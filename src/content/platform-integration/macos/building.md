---
# title: Building macOS apps with Flutter
title: 使用 Flutter 开发 macOS 应用
# description: Platform-specific considerations for building for macOS with Flutter.
description: 使用 Flutter 构建 macOS 应用时，平台侧的一些关注点
toc: true
# short-title: macOS development
short-title: macOS 开发
---

This page discusses considerations unique to building
macOS apps with Flutter, including shell integration
and distribution of macOS apps through the Apple Store.

本文章讨论了使用 Flutter 构建 macOS 应用的特有考虑因素，
包括 shell 集成和在 Apple Store 上分发应用。

## Integrating with macOS look and feel

## 适应 macOS 的外观及界面风格

While you can use any visual style or theme you choose
to build a macOS app, you might want to adapt your app
to more fully align with the macOS look and feel.
Flutter includes the [Cupertino] widget set,
which provides a set of widgets for
the current iOS design language.
Many of these widgets, including sliders,
switches and segmented controls,
are also appropriate for use on macOS.

尽管你可以选用任何样式或主题来构建 macOS 应用，
但是也许你会更希望应用的界面风格尽可能地对齐 macOS 的设计语言。
Flutter 提供了一套符合当前 iOS 设计风格语言的 [Cupertino][] 组件集。
其中许多的组件，例如滑块 (Sliders)，开关 (Switches)，
分段控制器 (Segmented controls)，在 macOS 上依然适用。

Alternatively, you might find the [macos_ui][]
package a good fit for your needs.
This package provides widgets and themes that
implement the macOS design language,
including a `MacosWindow` frame and scaffold,
toolbars, pulldown and
pop-up buttons, and modal dialogs.

此外，[macos_ui][] package 同样能满足你的需求。
此 package 提供了采用 macOS 设计语言的组件和主题，
包括一个 `MacosWindow` 框架、脚手架 (Scaffold)、
工具栏 (Toolbar)、下拉和弹出按钮以及模态 (modal) 对话框。

[Cupertino]: /ui/widgets/cupertino
[macos_ui]: {{site.pub}}/packages/macos_ui

## Building macOS apps

## 构建 macOS 应用

To distribute your macOS application, you can either
[distribute it through the macOS App Store][],
or you can distribute the `.app` itself,
perhaps from your own website.
As of macOS 10.14.5, you need to notarize
your macOS application before distributing
it outside of the macOS App Store.

你既可通过 [macOS 的 App Store][distribute it through the macOS App Store]，
也可直接在你的网站提供 `.app` 程序文件下载，以分发你的应用。
对于 macOS 10.14.5 及之后的版本，
在外部分发 macOS 应用之前，你需要对其进行公证。

The first step in both of the above processes
involves working with your application inside of Xcode.
To be able to compile your application from inside of
Xcode you first need to build the application for release
using the `flutter build` command, then open the
Flutter macOS Runner application.

无论采用上方何种方案，你都需要在 Xcode 中对应用进行处理。
首先你需要使用 `flutter build` 命令构建发布版本的应用，
然后在 Xcode 中打开 Flutter macOS 目录下 Runner (Runner.xcworkspace)，
才能在 Xcode 中编译你的应用。

```bash
flutter build macos
open macos/Runner.xcworkspace
```

Once inside of Xcode, follow either Apple's
[documentation on notarizing macOS Applications][], or
[on distributing an application through the App Store][].
You should also read through the
[macOS-specific support](#entitlements-and-the-app-sandbox)
section below to understand how entitlements,
the App Sandbox, and the Hardened Runtime
impact your distributable application.

在 Xcode 中打开应用后，请参考 Apple 官网指南
[在分发前对 macOS 软件进行公证][documentation on notarizing macOS Applications]
或 [使用 App Store 分发应用程序][on distributing an application through the App Store]。
除此之外，你还需要阅读 [授权和应用沙盒](#entitlements-and-the-app-sandbox) 部分，
了解授权机制、沙盒和强化版运行时会如何影响分发的应用程序。

[Build and release a macOS app][] provides a more detailed
step-by-step walkthrough of releasing a Flutter app to the
App Store.

[构建和发布为 macOS 应用][Build and release a macOS app] 文档提供了将 Flutter 应用发布至 App Store 的详细步骤。

[distribute it through the macOS App Store]: {{site.apple-dev}}/macos/submit/
[documentation on notarizing macOS Applications]:{{site.apple-dev}}/documentation/xcode/notarizing_macos_software_before_distribution
[on distributing an application through the App Store]: https://help.apple.com/xcode/mac/current/#/dev067853c94
[Build and release a macOS app]: /deployment/macos

## Entitlements and the App Sandbox

## 授权和应用沙盒

macOS builds are configured by default to be signed,
and sandboxed with App Sandbox.
This means that if you want to confer specific
capabilities or services on your macOS app,
such as the following:

默认情况下，macOS 构建已签名并使用 App Sandbox 进行沙盒化。
这意味着如果你想要在 macOS 应用中配置特定的功能或服务，例如：

* Accessing the internet

  访问网络

* Capturing movies and images from the built-in camera

  使用内置相机拍摄图片或视频

* Accessing files

  访问文件

Then you must set up specific _entitlements_ in Xcode.
The following section tells you how to do this.

你必须要在 Xcode 中指定 **授权文件 (entitlements)**。
接下来的章节，会告诉你如何实现。

### Setting up entitlements

### 配置授权

Managing sandbox settings is done in the
`macos/Runner/*.entitlements` files. When editing
these files, you shouldn't remove the original
`Runner-DebugProfile.entitlements` exceptions
(that support incoming network connections and JIT),
as they're necessary for the `debug` and `profile`
modes to function correctly.

`macos/Runner/*.entitlements` 文件管理了沙盒的相关配置。
当你编辑这些文件时，请不要删除原始的 `Runner-DebugProfile.entitlements`
（支持传入网络连接和 JIT），因为调试和性能模式的正常运行需要它们。

If you're used to managing entitlement files through
the **Xcode capabilities UI**, be aware that the capabilities
editor updates only one of the two files or,
in some cases, it creates a whole new entitlements
file and switches the project to use it for all configurations.
Either scenario causes issues. We recommend that you
edit the files directly. Unless you have a very specific
reason, you should always make identical changes to both files.

如果你习惯于通过 **Xcode capabilities（功能）界面** 管理授权文件，
请注意它仅会更新两个文件中的一个。
而在某些情况下，它会创建一个新的授权文件，并使用其切换项目的所有配置。
这两种情况都会导致一些问题，因此我们建议你直接编辑这些文件。
除非有明确的需求，否则你应该同步修改这两个文件。

If you keep the App Sandbox enabled (which is required if you
plan to distribute your application in the [App Store][]),
you need to manage entitlements for your application
when you add certain plugins or other native functionality.
For instance, using the [`file_chooser`][] plugin
requires adding either the
`com.apple.security.files.user-selected.read-only` or
`com.apple.security.files.user-selected.read-write` entitlement.
Another common entitlement is
`com.apple.security.network.client`,
which you must add if you make any network requests.

如果你打算在 [App Store][] 分发你的应用，你需要启用应用沙盒功能，
此时如果你需要添加某些插件或其他原生功能，则需编辑你的应用授权。
例如，使用 [`file_chooser`][] 插件需要添加 `com.apple.security.files.user-selected.read-only`
或 `com.apple.security.files.user-selected.read-write` 授权。
另一个常见的授权为 `com.apple.security.network.client`，是你的应用访问网络所必需的。

Without the `com.apple.security.network.client` entitlement,
for example, network requests fail with a message such as:

如果没有 `com.apple.security.network.client` 授权，
则网络请求会失败并返回如下的信息：

```console
flutter: SocketException: Connection failed
(OS Error: Operation not permitted, errno = 1),
address = example.com, port = 443
```

:::important

The `com.apple.security.network.server`
entitlement, which allows incoming network connections,
is enabled by default only for `debug` and `profile`
builds to enable communications between Flutter tools
and a running app. If you need to allow incoming
network requests in your application,
you must add the `com.apple.security.network.server`
entitlement to `Runner-Release.entitlements` as well,
otherwise your application will work correctly for debug or
profile testing, but will fail with release builds.

默认情况下，允许传入网络请求的 `com.apple.security.network.server` 授权，
只在调试和性能模式下启用，
这是为了让 Flutter tools 能和运行中的应用进行通信。
如果你需要允许应用的传入网络请求，则必须在 `Runner-Release.entitlements` 中添加
`com.apple.security.network.server` 授权，
否则你的应用仅可在调试和性能模式下正常工作，在发布版本中则无法正常使用。

:::

For more information on these topics,
see [App Sandbox][] and [Entitlements][]
on the Apple Developer site.

你可以阅读 Apple 开发者官网的 [应用沙盒][App Sandbox] 和
[授权][Entitlements] 文档，以获取关于此章节的更多信息。

[App Sandbox]: {{site.apple-dev}}/documentation/security/app_sandbox
[App Store]: {{site.apple-dev}}/app-store/submissions/
[Entitlements]: {{site.apple-dev}}/documentation/bundleresources/entitlements
[`file_chooser`]: {{site.github}}/google/flutter-desktop-embedding/tree/master/plugins/file_chooser

## Hardened Runtime

## 强化版运行时

If you choose to distribute your application outside
of the App Store, you need to notarize your application
for compatibility with macOS 10.15+.
This requires enabling the Hardened Runtime option.
Once you have enabled it, you need a valid signing
certificate in order to build.

如果你不打算使用 App Store 分发应用，
你则需要对你的应用进行公证，以与 macOS 10.15+ 兼容。
这便要求启用强化版运行时。
一旦启用，你就需要一个有效的签名证书来编译构建应用。

By default, the entitlements file allows JIT for
debug builds but, as with App Sandbox, you might
need to manage other entitlements.
If you have both App Sandbox and Hardened
Runtime enabled, you might need to add multiple
entitlements for the same resource.
For instance, microphone access would require both
`com.apple.security.device.audio-input` (for Hardened Runtime)
and `com.apple.security.device.microphone` (for App Sandbox).

默认情况下，授权文件支持 JIT 调试构建，
但是在使用应用沙盒时，你可能需要管理其他授权文件。
如果你同时启用应用沙盒和强化版运行时，你可能需要为同一资源添加多个授权。
例如，麦克风访问权限同时要求 `com.apple.security.device.audio-input` (用于强化版运行时)
和 `com.apple.security.device.microphone` (用于应用沙盒)。

For more information on this topic,
see [Hardened Runtime][] on the Apple Developer site.

你可以阅读 Apple 开发者官网的 [强化版运行时][Hardened Runtime] 文档，
以获取关于此章节的更多信息。

[Hardened Runtime]: {{site.apple-dev}}/documentation/security/hardened_runtime
