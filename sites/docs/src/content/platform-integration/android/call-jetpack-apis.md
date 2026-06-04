---
# title: "Calling JetPack APIs"
title: "调用 Jetpack API"
# description: "Use the latest Android APIs from your Dart code"
description: "从 Dart 代码使用最新的 Android API"
ai-translated: true
---

<?code-excerpt path-base="platform_integration"?>

Flutter apps running on Android can always make use of the
latest APIs on the first day they are released on Android, no
matter what. This page outlines available ways to invoke
Android-specific APIs.

在 Android 上运行的 Flutter 应用始终可以在 Android 发布最新 API 的当天就使用它们，无一例外。本页概述调用 Android 专用 API 的可用方式。

## Use an existing solution

## 使用现有方案

In most scenarios, you can use a plugin (as shown in the next section)
to invoke native APIs without writing any custom boilerplate or
glue code yourself.

在大多数场景下，你可以使用插件（如下一节所示）调用原生 API，而无需自己编写自定义样板或胶水代码。

### Use a plugin

### 使用插件

Using a plugin is often the easiest way to access native
APIs, regardless of where your Flutter app is running. To
use plugins, visit [pub.dev][pub] and search for
the topic you need. Most native features, including accessing
common hardware like GPS, the camera, or step counters are
supported by robust plugins.

使用插件通常是访问原生 API 最简便的方式，无论你的 Flutter 应用运行在哪里。要使用插件，请访问 [pub.dev][pub] 并搜索你需要的主题。大多数原生功能（包括访问 GPS、相机、计步器等常见硬件）都有成熟的插件支持。

For complete guidance on adding plugins to your Flutter app,
see the [Using packages documentation][packages].

有关向 Flutter 应用添加插件的完整指南，
请参阅[使用 package 文档][packages]。

[packages]: /packages-and-plugins/using-packages
[pub]: {{site.pub}}

Not all native features are supported by plugins, especially
immediately after their release. In any scenario where
your desired native feature is not covered by a package on
[pub.dev][pub], continue on to the following sections.

并非所有原生功能都有插件支持，尤其是在刚发布时。若你需要的原生功能在
[pub.dev][pub] 上没有对应 package，请继续阅读以下章节。

## Creating a custom solution

## 创建自定义方案

Not all scenarios and APIs will be supported by
existing solutions; but luckily, you can always add whatever
support you need. The next sections describe two different
ways to call native code from Dart.

并非所有场景和 API 都有现成方案支持；但幸运的是，你始终可以按需添加所需支持。以下章节介绍从 Dart 调用原生代码的两种方式。

:::note
Neither solution below is inherently better or worse than
existing plugins, because all plugins use one of the following
two options.

以下两种方案本身并不优于或劣于现有插件，因为所有插件都使用下列两种方式之一。
:::

### Call native code directly via FFI

### 通过 FFI 直接调用原生代码

The most direct and efficient way to invoke native APIs is by
calling the API directly, via FFI. This links your Dart executable
to any specified native code at compile-time, allowing you to
call it directly from the UI thread through a small amount of glue
code. In most cases, [ffigen][ffigen] or [jnigen][jnigen] are
helpful in writing this glue code.

调用原生 API 最直接、最高效的方式是通过 FFI 直接调用 API。这会在编译时将你的 Dart 可执行文件链接到指定的原生代码，使你可通过少量胶水代码在 UI 线程直接调用。在大多数情况下，[ffigen][ffigen] 或 [jnigen][jnigen] 有助于编写这类胶水代码。

For complete guidance on directly calling native code from
your Flutter app, see the [FFI documentation][ffi].

有关从 Flutter 应用直接调用原生代码的完整指南，请参阅 [FFI 文档][ffi]。

In the coming months, the Dart team hopes to make this process
easier with direct support for calling native APIs using the
FFI approach, but without any need for the developer to write
glue code.

未来数月内，Dart 团队希望借助 FFI 方式直接支持调用原生 API，且开发者无需编写胶水代码。

[ffi]: {{site.dart-site}}/interop/c-interop
[ffigen]: {{site.pub}}/packages/ffigen
[jnigen]: {{site.pub}}/packages/jnigen


### Add a MethodChannel

### 添加 MethodChannel

[`MethodChannel`][methodchannels-api-docs]s are an alternate
way Flutter apps can invoke arbitrary native code.
Unlike the FFI solution described in the previous step,
MethodChannels are always asynchronous, which
might or might not matter to you, depending on your use case. As
with FFI and direct calls to native code, using a `MethodChannel`
requires a small amount of glue code to translate your Dart objects
into native objects, and then back again. In most cases,
[`pkg:pigeon`][pigeon] is helpful in writing this glue code.

[`MethodChannel`][methodchannels-api-docs] 是 Flutter 应用调用任意原生代码的另一种方式。与上一步介绍的 FFI 方案不同，MethodChannel 始终为异步，是否重要取决于你的用例。与 FFI 及直接调用原生代码一样，使用 `MethodChannel` 需要少量胶水代码将 Dart 对象转换为原生对象，再转换回来。在大多数情况下，[`pkg:pigeon`][pigeon] 有助于编写这类胶水代码。

For complete guidance on adding MethodChannels to your Flutter
app, see the [`MethodChannel`s documentation][methodchannels].

有关向 Flutter 应用添加 MethodChannel 的完整指南，请参阅 [`MethodChannel` 文档][methodchannels]。

[methodchannels]: /platform-integration/platform-channels
[methodchannels-api-docs]: {{site.api}}/flutter/services/MethodChannel-class.html
[pigeon]: {{site.pub}}/packages/pigeon
