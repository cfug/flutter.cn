---
# title: "Binding to native iOS code using dart:ffi"
title: "在 iOS 中使用 dart:ffi 调用本地代码"
# description: "To use C code in your Flutter program, use the dart:ffi library."
description: "在你的 Flutter 工程中，通过 dart:ffi 来使用 C 语言代码"
tags: "平台集成"
keywords: "dartffi"
---

<?code-excerpt path-base="platform_integration"?>

Flutter mobile and desktop apps can use the
[dart:ffi][] library to call native C APIs.
_FFI_ stands for [_foreign function interface._][FFI]
Other terms for similar functionality include
_native interface_ and _language bindings._

Flutter 移动版可以使用 [dart:ffi][] 库来调用本地的 C API。
**FFI** 代表 [**外部功能接口**][FFI]。
类似功能的其他术语包括**本地接口**和**语言绑定**。

:::note

This page describes using the `dart:ffi` library
in iOS apps. For information on Android, see
[Binding to native Android code using dart:ffi][android-ffi].
For information in macOS, see
[Binding to native macOS code using dart:ffi][macos-ffi].
This feature is not yet supported for web plugins.

本文描述的是在 iOS 应用中使用 `dart:ffi` 库。
你可以阅读 [在 Android 中使用 dart:ffi 调用本地代码][android-ffi]
或 [在 macOS 中使用 dart:ffi 调用本地代码][macos-ffi]。
Web 插件暂不支持调用本地代码。

:::

[android-ffi]: /platform-integration/android/c-interop
[macos-ffi]: /platform-integration/macos/c-interop
[dart:ffi]: {{site.dart.api}}/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

Before your library or program can use the FFI library
to bind to native code, you must ensure that the
native code is loaded and its symbols are visible to Dart.
This page focuses on compiling, packaging,
and loading iOS native code within a Flutter plugin or app.

你必须首先确保本地代码已加载，并且其符号对 Dart 可见，
然后才能在库或程序使用 FFI 库绑定本地代码。
本页主要介绍如何在 Flutter 插件或应用程序中编译、打包和加载 iOS 原生代码。

This tutorial demonstrates how to bundle C/C++
sources in a Flutter plugin and bind to them using
the Dart FFI library on iOS.

本教程演示了如何在 Flutter 插件中捆绑 C/C++ 源代码，
并在 iOS 上使用 Dart FFI 库绑定和使用。

In this walkthrough, you'll create a C function
that implements 32-bit addition and then
exposes it through a Dart plugin named "native_add".

在本示例中，你将创建一个实现 32 位的加法 C 函数，
然后通过名为 "native_add" 的 Dart 插件暴露它。

## Dynamic vs static linking

## 动态链接 vs 静态链接

A native library can be linked into an app either
dynamically or statically. A statically linked library
is embedded into the app's executable image,
and is loaded when the app starts.

本地库可以动态或静态地链接到应用程序中。
一个静态链接库会被嵌入到应用程序的可执行映像中，
并在应用程序启动时加载。

Symbols from a statically linked library can be
loaded using `DynamicLibrary.executable` or
`DynamicLibrary.process`.

静态链接中的符号可以使用 `DynamicLibrary.executable`
或 `DynamicLibrary.process` 来加载.

A dynamically linked library, by contrast, is distributed
in a separate file or folder within the app,
and loaded on-demand. On iOS, the dynamically linked
library is distributed as a `.framework` folder.

相比之下，动态链接库则分布在应用程序中的单独的文件或文件夹中，
并按需加载。在 iOS 上，它是作为 `.framework` 文件夹分发的。

A dynamically linked library can be loaded into
Dart using `DynamicLibrary.open`.

动态链接库在 Dart 中可以通过 `DynamicLibrary.open` 加载。

API documentation is available from the
[Dart API reference documentation][].

请查看 API 文档：
[Dart API 参考文档][Dart API reference documentation].

[Dart API reference documentation]: {{site.dart.api}}

## Create an FFI plugin

## 创建 FFI 插件

To create an FFI plugin called "native_add",
do the following:

如果要创建一个名为 "native_add" 的插件，
你需要这么做：

```console
$ flutter create --platforms=android,ios,macos,windows,linux --template=plugin_ffi native_add
$ cd native_add
```

:::note

You can exclude platforms from `--platforms` that you don't want
to build to. However, you need to include the platform of
the device you are testing on.

你可以使用 `--platforms` 来排除你不需要的平台。
但是，你仍需要包含测试设备所需的平台。

:::

This will create a plugin with C/C++ sources in `native_add/src`.
These sources are built by the native build files in the various
os build folders.

C/C++ 源代码会被创建至 `native_add/src`。
这些源代码在不同平台构建时会生成在不同平台的构建文件夹。

The FFI library can only bind against C symbols,
so in C++ these symbols are marked `extern "C"`.

FFI 库只能绑定 C 语言的符号，所以 C++ 语言的符号会被标记为 `extern "C"`。

You should also add attributes to indicate that the
symbols are referenced from Dart,
to prevent the linker from discarding the symbols
during link-time optimization.
`__attribute__((visibility("default"))) __attribute__((used))`.

FFI 库只能与 C 符号绑定，因此在 C++ 中，
这些符号添加 `extern C` 标记。
还应该添加属性来表明符号是需要被 Dart 引用的，
以防止链接器在优化链接时会丢弃符号。
`__attribute__((visibility("default"))) __attribute__((used))`.

On iOS, the `native_add/ios/native_add.podspec` links the code.

在 iOS 上 `native_add/android/build.gradle` 负责关联这些代码。

The native code is invoked from dart in `lib/native_add_bindings_generated.dart`.

原生代码会从 `lib/native_add_bindings_generated.dart` 被 Dart 调用。

The bindings are generated with [package:ffigen]({{site.pub-pkg}}/ffigen).

代码由 [package:ffigen](https://pub.flutter-io.cn/packages/ffigen) 生成。

## Other use cases

## 其他的用例

### iOS and macOS

### iOS 和 macOS

Dynamically linked libraries are automatically loaded by
the dynamic linker when the app starts. Their constituent
symbols can be resolved using [`DynamicLibrary.process`][].
You can also get a handle to the library with
[`DynamicLibrary.open`][] to restrict the scope of
symbol resolution, but it's unclear how Apple's
review process handles this.

动态链接库在应用程序启动时由动态链接器自动加载。
它们的组成符号可以用 [`DynamicLibrary.process`][]。
你还可以使用 [`DynamicLibrary.open`][]
来限制符号解析的范围，
但目前仍然不确定苹果的审查程序将如何处理两者的使用。

Symbols statically linked into the application binary
can be resolved using [`DynamicLibrary.executable`][] or
[`DynamicLibrary.process`][].

你可以使用 [`DynamicLibrary.executable`][]
或 [`DynamicLibrary.process`][]
解析静态链接到应用程序二进制文件的符号。

[`DynamicLibrary.executable`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

#### Platform library

#### 平台库

To link against a platform library,
use the following instructions:

要链接到平台库，
请按照如下说明：

1. In Xcode, open `Runner.xcworkspace`.

   在 Xcode 中，打开 `Runner.xcworkspace`。

1. Select the target platform.

   选择目标设备。

1. Click **+** in the **Linked Frameworks and Libraries**
   section.

   在 **Linked Frameworks and Libraries** 中点击 **+**。

1. Select the system library to link against.

   选择要链接的系统库。

#### First-party library

#### 第一方库

A first-party native library can be included either
as source or as a (signed) `.framework` file.
It's probably possible to include statically linked
archives as well, but it requires testing.

第一方本地库可以作为源文件或（已签名的）`.framework` 文件被包含在内。
它也可能包括静态链接的档案，但需要测试。

#### Source code

#### 源码

To link directly to source code,
use the following instructions:

要直接链接到源代码，请按照如下说明：

 1. In Xcode, open `Runner.xcworkspace`.

    在 Xcode 中，打开 `Runner.xcworkspace`。

 2. Add the C/C++/Objective-C/Swift
    source files to the Xcode project.

    添加 C/C++/Objective-C/Swift 源码到 Xcode 工程中。

 3. Add the following prefix to the
    exported symbol declarations to ensure they
    are visible to Dart:

    将以下前缀添加到导出的符号声明中，以确保它们对 Dart 可见：

    **C/C++/Objective-C**

    ```objc
    extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
    ```

    **Swift**

    ```swift
    @_cdecl("myFunctionName")
    ```

#### Compiled (dynamic) library

#### 已编译的动态库

To link to a compiled dynamic library,
use the following instructions:

要链接到已编译过的动态库，请按照如下说明：

1. If a properly signed `Framework` file is present,
   open `Runner.xcworkspace`.

   如果存在已进行签名的 `Framework` 文件，请打开 `Runner.xcworkspace`。

1. Add the framework file to the **Embedded Binaries**
   section.

   添加 framework 文件到 **Embedded Binaries** 区域中。

1. Also add it to the **Linked Frameworks & Libraries**
   section of the target in Xcode.
   
   同时将其添加到 Xcode 中目标的
   **Linked Frameworks & Libraries** 部分。

#### Open-source third-party library

#### 开源的三方库

To create a Flutter plugin that includes both
C/C++/Objective-C _and_ Dart code,
use the following instructions:

要创建一个包含 C/C++/Objective-C **和** Dart 代码的 Flutter 插件，
请按照如下说明：

1. In your plugin project,
   open `ios/<myproject>.podspec`.

   在你的插件项目打开 `ios/<myproject>.podspec`.

1. Add the native code to the `source_files`
   field.

   添加本地代码到 `source_files` 字段。

The native code is then statically linked into
the application binary of any app that uses
this plugin.

本地代码会被静态链接到任何使用这个插件的应用二进制中。

#### Closed-source third-party library

#### 闭源三方库

To create a Flutter plugin that includes Dart
source code, but distribute the C/C++ library
in binary form, use the following instructions:

要创建包含 Dart 源代码，
但 C/C++ 部分是以二进制形式分发的库的 Flutter 插件，
请按照如下说明：

1. In your plugin project,
   open `ios/<myproject>.podspec`.

   在你的插件目录打开 `ios/<myproject>.podspec`。

1. Add a `vendored_frameworks` field.
   See the [CocoaPods example][].

   添加 `vendored_frameworks` 字段。
   参考 [CocoaPods 示例][CocoaPods example]。

:::warning

**Do not** upload this plugin
(or any plugin containing binary code) to pub.dev.
Instead, this plugin should be downloaded
from a trusted third-party,
as shown in the CocoaPods example.

**不要**将此插件
（或任何包含二进制代码的插件）上载到 pub.dev。
相反，应该从可信的第三方下载此插件。
如 CocoaPods 示例所示。

:::

[CocoaPods example]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

## Stripping iOS symbols

## 精简 iOS 符号表

When creating a release archive (IPA),
the symbols are stripped by Xcode.

当创建一个 release 档案（IPA）时，符号会被 Xcode 删除。

1. In Xcode, go to **Target Runner > Build Settings > Strip Style**.

   在 Xcode 中, 点击 **Target Runner > Build Settings > Strip Style**.

2. Change from **All Symbols** to **Non-Global Symbols**.

   将 **All Symbols** 修改为 **Non-Global Symbols**。

{% include docs/resource-links/ffi-video-resources.md %}