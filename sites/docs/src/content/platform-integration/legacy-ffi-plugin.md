---
# title: Bind to native code using the legacy FFI plugin template
title: 使用旧版 FFI plugin 模板绑定到原生代码
# description: >-
#   Use the legacy plugin_ffi template and dart:ffi to bind to
#   native C code in your Flutter plugin or app.
description: >-
  在 Flutter plugin 或应用中，使用旧版的 plugin_ffi 模板和 dart:ffi 
  与原生 C 代码进行绑定。
ai-translated: true
---

:::warning

This page documents the legacy `plugin_ffi` approach to C interop.

本页面介绍了旧版 `plugin_ffi` 的 C 语言互操作方法。

Since Flutter 3.38, we recommend using the `package_ffi` template with
[build hooks][] for C interop.

自 Flutter 3.38 起，我们建议使用 `package_ffi` 模板和
[构建 hook][build hooks] 进行 C 语言互操作。

However, the legacy FFI plugin template (`plugin_ffi`) documented here is
still useful if you need to:

然而，如果需要以下操作，此处记录的旧版 FFI plugin 模板 (`plugin_ffi`) 仍然有用：

- Access the Flutter Plugin API.

  访问 Flutter Plugin API。

- Use static linking (on iOS and macOS).

  使用静态链接（在 iOS 和 macOS 上）。

- Configure a Google Play services runtime on Android.

  在 Android 上配置 Google Play services 运行时。

:::

Flutter mobile and desktop apps can
use the [`dart:ffi`][] library to call native C APIs.
_FFI_ stands for [_foreign function interface._][FFI]
Other terms for similar functionality include
_native interface_ and _language bindings._

Flutter 移动和桌面应用可以使用 [`dart:ffi`][] 库调用原生 C API。
**FFI** 代表 [**foreign function interface（外部函数接口）**][FFI]。
类似功能的其他术语包括
**原生接口 (native interface)** 和 **语言绑定 (language bindings)**。

[build hooks]: /platform-integration/bind-native-code
[`dart:ffi`]: {{site.dart.api}}/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

Before your library or program can
use the FFI library to bind to native code,
you must ensure that the native code is
loaded and its symbols are visible to Dart.
This page focuses on compiling, packaging,
and loading native code within a Flutter plugin or app.

在你的库或程序可以使用 FFI 库绑定到原生代码之前，
你必须确保原生代码已加载并且其 Symbols 符号对 Dart 可见。
本页面重点介绍在 Flutter plugin 或应用中编译、打包、
和加载原生代码。

This tutorial demonstrates how to bundle C/C++ sources
in a Flutter plugin and bind to them using the Dart FFI library.
In this walkthrough, you'll create a C function that
implements 32-bit addition and then exposes it through
a Dart plugin named `native_add`.

本教程演示了如何在 Flutter plugin 中捆绑 C/C++ 源码
并使用 Dart FFI 库绑定它们。
在本演练中，你将创建一个实现 32 位加法的 C 函数，
然后通过名为 `native_add` 的 Dart plugin 公开它。

## Dynamic versus static linking

## 动态链接与静态链接

A native library can be linked into an app either
dynamically or statically. A statically linked library
is embedded into the app's executable image,
and is loaded when the app starts.

原生库可以动态或静态地链接到应用中。
静态链接库嵌入到应用的执行映像中，
并在应用启动时加载。

Symbols from a statically linked library can be
loaded using [`DynamicLibrary.executable`][] or
[`DynamicLibrary.process`][].

可以使用 [`DynamicLibrary.executable`][] 或
[`DynamicLibrary.process`][] 加载静态链接库中的 Symbols 符号。

A dynamically linked library, by contrast, is distributed
in a separate file or folder within the app,
and loaded on-demand. The distribution format depends on
the platform:

相比之下，动态链接库以单独的文件或文件夹形式分发在应用内，
并按需加载。分发格式取决于
平台：

- On Android, a dynamically linked library is distributed as a
  set of `.so` (ELF) files, one for each architecture.
  Only dynamic libraries are supported,
  because the main executable is the JVM,
  which Flutter doesn't link to statically.

  在 Android 上，动态链接库以一组 `.so` (ELF) 文件形式分发，每个架构一个。
  只支持动态库，
  因为主可执行文件是 JVM，
  而 Flutter 不会静态链接到它。

- On iOS and macOS, the dynamically linked library is
  distributed as a `.framework` folder.

  在 iOS 和 macOS 上，动态链接库以 `.framework` 文件夹形式分发。

A dynamically linked library can be loaded into
Dart using [`DynamicLibrary.open`][].

可以使用 [`DynamicLibrary.open`][] 将动态链接库加载到
Dart 中。

[`DynamicLibrary.executable`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

## Create an FFI plugin

## 创建 FFI plugin

To create an FFI plugin called `native_add`,
use `flutter create` with the `plugin_ffi` template:

要创建名为 `native_add` 的 FFI plugin，
请使用 `flutter create` 和 `plugin_ffi` 模板：

```console
$ flutter create --platforms=android,ios,macos,windows,linux --template=plugin_ffi native_add
```

:::note

You can exclude platforms from `--platforms` that you don't want to build to.
However, you need to include the platform of the device you are testing on.

你可以从 `--platforms` 中排除你不想构建到的平台。
但是，你需要包含你正在测试的设备的平台。

:::

This creates a plugin with C/C++ sources in `native_add/src`.
These sources are built by the native build files in the
various OS build folders.

这会在 `native_add/src` 中创建一个包含 C/C++ 源码的 plugin。
这些源码由各个操作系统构建文件夹中的原生构建文件构建。

The FFI library can only bind against C symbols,
so in C++ these symbols are marked `extern "C"`.

FFI 库只能绑定 C Symbols 符号，
因此在 C++ 中，这些 Symbols 符号被标记为 `extern "C"`。

You should also add attributes to indicate that the
symbols are referenced from Dart,
to prevent the linker from discarding the symbols
during link-time optimization:
`__attribute__((visibility("default"))) __attribute__((used))`.

你还应该添加属性来指示这些
Symbols 符号是从 Dart 引用的，
以防止链接器在链接时优化期间丢弃这些 Symbols 符号：
`__attribute__((visibility("default"))) __attribute__((used))`。

The platform-specific build file links the code:

平台特定的构建文件链接代码：

- On Android, `native_add/android/build.gradle`.

  在 Android 上，`native_add/android/build.gradle`。

- On iOS, `native_add/ios/native_add.podspec`.

  在 iOS 上，`native_add/ios/native_add.podspec`。

- On macOS, `native_add/macos/native_add.podspec`.

  在 macOS 上，`native_add/macos/native_add.podspec`。

- On Linux, `native_add/linux/CMakeLists.txt`.

  在 Linux 上，`native_add/linux/CMakeLists.txt`。

- On Windows, `native_add/windows/CMakeLists.txt`.

  在 Windows 上，`native_add/windows/CMakeLists.txt`。

The native code is invoked from
Dart in `lib/native_add_bindings_generated.dart`.

原生代码从
Dart 中的 `lib/native_add_bindings_generated.dart` 调用。

The bindings are generated with [`package:ffigen`][].

绑定是使用 [`package:ffigen`][] 生成的。

[`package:ffigen`]: {{site.pub-pkg}}/ffigen

## Other use cases

## 其他用例

### iOS

The dynamic linker automatically loads
dynamically linked libraries when the app starts.
Their constituent symbols can be resolved using [`DynamicLibrary.process`][].
You can also get a handle to the library with [`DynamicLibrary.open`][] to
restrict the scope of symbol resolution, but it's
unclear how Apple's review process handles this.

动态链接器在应用启动时自动加载
动态链接库。
它们的组成 Symbols 符号可以使用 [`DynamicLibrary.process`][] 解析。
你还可以使用 [`DynamicLibrary.open`][] 获取库的 handle 以
限制 Symbols 符号解析的范围，但 Apple 的审核流程如何处理这一点尚不清楚。

Symbols statically linked into the application binary can be
resolved using [`DynamicLibrary.executable`][] or [`DynamicLibrary.process`][].

静态链接到应用二进制文件中的 Symbols 符号可以使用
[`DynamicLibrary.executable`][] 或 [`DynamicLibrary.process`][] 解析。

#### Platform library {:#ios-platform-library}

#### 平台库 {:#ios-platform-library}

To link against a platform library,
use the following instructions:

要链接到平台库，
请使用以下说明：

1.  In Xcode, open `Runner.xcworkspace`.

   在 Xcode 中，打开 `Runner.xcworkspace`。

1.  Select the target platform.

   选择目标平台。

1.  Click **+** in the **Linked Frameworks and Libraries** section.

   在 **Linked Frameworks and Libraries** 部分中点击 **+**。

1.  Select the system library to link against.

   选择要链接的系统库。

#### First-party library {:#ios-first-party-library}

#### 第一方库 {:#ios-first-party-library}

A first-party native library can be included either
as source or as a (signed) `.framework` file.
It's probably possible to include statically linked
archives as well, but it requires testing.

第一方原生库可以作为源码或作为（签名）`.framework` 文件包含。
可能也可以包含静态链接的
归档文件，但这需要测试。

#### Source code {:#ios-source-code}

#### 源码 {:#ios-source-code}

To link directly to source code,
use the following instructions:

要直接链接到源码，
请使用以下说明：

1.  In Xcode, open `Runner.xcworkspace`.

   在 Xcode 中，打开 `Runner.xcworkspace`。

1.  Add the C/C++/Objective-C/Swift
    source files to the Xcode project.

   将 C/C++/Objective-C/Swift
   源码文件添加到 Xcode 项目中。

1.  Add the following prefix to the exported symbol declarations to
    ensure they are visible to Dart:

   将以下前缀添加到导出的 Symbol 符号声明中，以
   确保它们对 Dart 可见：

    **C/C++/Objective-C:**

    ```objc
    extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
    ```

    **Swift:**

    ```swift
    @_cdecl("myFunctionName")
    ```

#### Compiled (dynamic) library {:#ios-compiled-dynamic-library}

#### 已编译（动态）库 {:#ios-compiled-dynamic-library}

To link to a compiled dynamic library,
use the following instructions:

要链接到已编译的动态库，
请使用以下说明：

1.  If a properly signed `Framework` file is present,
    open `Runner.xcworkspace`.

   如果存在正确签名的 `Framework` 文件，请打开 `Runner.xcworkspace`。

1.  Add the framework file to the
    **Frameworks, Libraries, and Embedded Content** section of
    the target in Xcode.

   将 framework 文件添加到 Xcode 中目标下的 **Frameworks, Libraries, and Embedded Content** 部分。

1.  Under the **Embed** column, select **Embed & Sign**.

   在 **Embed** 列下，选择 **Embed & Sign**。

#### Open-source third-party library {:#ios-open-source-third-party-library}

#### 开源第三方库 {:#ios-open-source-third-party-library}

To create a Flutter plugin that includes both
C/C++/Objective-C _and_ Dart code,
use the following instructions:

要创建一个同时包含 C/C++/Objective-C **和** Dart 代码的 Flutter plugin，请使用以下说明：

1.  In your plugin project, open `ios/<myproject>.podspec`.

   在你的 plugin 项目中，打开 `ios/<myproject>.podspec`。

1.  Add the native code to the `source_files` field.

   将原生代码添加到 `source_files` 字段。

The native code is then statically linked into
the application binary of any app that uses this plugin.

然后，原生代码会静态链接到任何使用此 plugin 的应用程序二进制文件中。

#### Closed-source third-party library {:#ios-closed-source-third-party-library}

#### 闭源第三方库 {:#ios-closed-source-third-party-library}

To create a Flutter plugin that includes Dart source code,
but distribute the C/C++ library in binary form,
use the following instructions:

要创建一个包含 Dart 源代码，但以二进制形式分发 C/C++ 库的 Flutter plugin，请使用以下说明：

1.  In your plugin project, open `ios/<myproject>.podspec`.

   在你的 plugin 项目中，打开 `ios/<myproject>.podspec`。

1.  Add a `vendored_frameworks` field.
    See the [CocoaPods example][].

   添加一个 `vendored_frameworks` 字段。请参阅 [CocoaPods 示例][CocoaPods example]。

:::warning

**Do not** upload this plugin
(or any plugin containing binary code) to pub.dev.
Instead, this plugin should be downloaded
from a trusted third-party,
as shown in the CocoaPods example.

**不要** 将此 plugin（或任何包含二进制代码的 plugin）上传到 pub.dev。
相反，此 plugin 应从受信任的第三方下载，如 CocoaPods 示例所示。

:::

[CocoaPods example]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

#### Stripping symbols {:#ios-stripping-symbols}

#### 剥离 Symbols 符号 {:#ios-stripping-symbols}

When creating a release build, Xcode strips the symbols.

创建发布版本时，Xcode 会剥离 Symbols 符号。

1.  In Xcode, select the **Runner** target,
    then go to **Build Settings > Strip Style**.

   在 Xcode 中，选择 **Runner** 目标，然后转到 **Build Settings > Strip Style**。

1.  Change from **All Symbols** to **Non-Global Symbols**.

   从 **All Symbols** 更改为 **Non-Global Symbols**。

### macOS

The dynamic linker automatically loads
dynamically linked libraries when the app starts.
Their constituent symbols can be resolved using [`DynamicLibrary.process`][].
You can also get a handle to the library with [`DynamicLibrary.open`][] to
restrict the scope of symbol resolution, but it's
unclear how Apple's review process handles this.

动态链接器会在应用启动时自动加载动态链接库。
它们的组成 Symbols 符号可以使用 [`DynamicLibrary.process`][] 解析。
你也可以使用 [`DynamicLibrary.open`][] 获取库的句柄来限制 Symbols 符号解析的范围，
但目前尚不清楚 Apple 的审核流程如何处理这种情况。

Symbols statically linked into the application binary can be
resolved using [`DynamicLibrary.executable`][] or [`DynamicLibrary.process`][].

静态链接到应用程序二进制文件中的 Symbols 符号可以使用 [`DynamicLibrary.executable`][] 或 
[`DynamicLibrary.process`][] 解析。

#### Platform library {:#macos-platform-library}

#### 平台库 {:#macos-platform-library}

To link against a platform library,
use the following instructions:

要链接到平台库，请使用以下说明：

1.  In Xcode, open `Runner.xcworkspace`.

   在 Xcode 中，打开 `Runner.xcworkspace`。

1.  Select the target platform.

   选择目标平台。

1.  Click **+** in the **Linked Frameworks and Libraries** section.

   在 **Linked Frameworks and Libraries** 部分中点击 **+**。

1.  Select the system library to link against.

   选择要链接的系统库。

#### First-party library {:#macos-first-party-library}

#### 第一方库 {:#macos-first-party-library}

A first-party native library can be included either
as source or as a (signed) `.framework` file.
It's probably possible to include statically linked
archives as well, but it requires testing.

第一方原生库可以作为源代码或 (已签名的) `.framework` 文件包含在内。
可能也可以包含静态链接的归档文件，但这需要测试。

#### Source code {:#macos-source-code}

#### 源代码 {:#macos-source-code}

To link directly to source code,
use the following instructions:

要直接链接到源代码，请使用以下说明：

1.  In Xcode, open `Runner.xcworkspace`.

   在 Xcode 中，打开 `Runner.xcworkspace`。

1.  Add the C/C++/Objective-C/Swift
    source files to the Xcode project.

   将 C/C++/Objective-C/Swift 源文件添加到 Xcode 项目中。

1.  Add the following prefix to the exported symbol declarations to
    ensure they are visible to Dart:

   将以下前缀添加到导出的 Symbols 符号声明中，以确保它们对 Dart 可见：

    **C/C++/Objective-C:**

    ```objc
    extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
    ```

    **Swift:**

    ```swift
    @_cdecl("myFunctionName")
    ```

#### Compiled (dynamic) library {:#macos-compiled-dynamic-library}

#### 编译后的 (动态) 库 {:#macos-compiled-dynamic-library}

To link to a compiled dynamic library,
use the following instructions:

要链接到编译后的动态库，请使用以下说明：

1.  If a properly signed `Framework` file is present,
    open `Runner.xcworkspace`.

   如果存在正确签名的 `Framework` 文件，请打开 `Runner.xcworkspace`。

1.  Add the framework file to the
    **Frameworks, Libraries, and Embedded Content** section of
    the target in Xcode.

   将 framework 文件添加到 Xcode 中目标下的 **Frameworks, Libraries, and Embedded Content** 部分。

1.  Under the **Embed** column, select **Embed & Sign**.

   在 **Embed** 列下，选择 **Embed & Sign**。

#### Compiled (dynamic) library, closed source {:#macos-compiled-dynamic-library-closed-source}

#### 编译后的 (动态) 库，闭源 {:#macos-compiled-dynamic-library-closed-source}

To add a closed source library to a
[Flutter macOS Desktop][] app,
use the following instructions:

要将闭源库添加到 [Flutter macOS 桌面][Flutter macOS Desktop] 应用中，请使用以下说明：

1.  Follow the instructions for Flutter desktop to
    create a Flutter desktop app.

   按照 Flutter 桌面版的说明创建一个 Flutter 桌面应用。

1.  Open the `yourapp/macos/Runner.xcworkspace` in Xcode.

   在 Xcode 中打开 `yourapp/macos/Runner.xcworkspace`。

    1.  Drag your precompiled library (`libyourlibrary.dylib`)
        into `Runner/Frameworks`.

       将你的预编译库 (`libyourlibrary.dylib`) 拖到 `Runner/Frameworks` 中。

    1.  Click `Runner` and go to the `Build Phases` tab.

       点击 `Runner` 并转到 `Build Phases` 选项卡。

        1.  Drag `libyourlibrary.dylib` into the `Copy Bundle Resources` list.

           将 `libyourlibrary.dylib` 拖到 `Copy Bundle Resources` 列表中。

        1.  Under `Embed Libraries`, check `Code Sign on Copy`.

           在 `Embed Libraries` 下，勾选 `Code Sign on Copy`。

        1.  Under `Link Binary With Libraries`,
            set status to `Optional`. (We use dynamic linking,
            no need to statically link.)

           在 `Link Binary With Libraries` 下，将状态设置为 `Optional`。(我们使用动态链接，无需静态链接。)

    1.  Click `Runner` and go to the `General` tab.

       点击 `Runner` 并转到 `General` 选项卡。

        1.  Drag `libyourlibrary.dylib` into the
            **Frameworks, Libraries, and Embedded Content** list.

           将 `libyourlibrary.dylib` 拖到 **Frameworks, Libraries, and Embedded Content** 列表中。

        1.  Select **Embed & Sign**.

           选择 **Embed & Sign**。

    1.  Click **Runner** and go to the **Build Settings** tab.

       点击 **Runner** 并转到 **Build Settings** 选项卡。

        1.  In the **Search Paths** section configure the
            **Library Search Paths** to include the path
            where `libyourlibrary.dylib` is located.

           在 **Search Paths** 部分中，配置 **Library Search Paths** 以包含 `libyourlibrary.dylib` 所在的路径。

1.  Edit `lib/main.dart`.

   编辑 `lib/main.dart`。

    1.  Use `DynamicLibrary.open('libyourlibrary.dylib')` to
        dynamically link to the symbols.

       使用 `DynamicLibrary.open('libyourlibrary.dylib')` 动态链接到 Symbols 符号。

    1.  Call your native function somewhere in a widget.

       在 widget 中的某个地方调用你的原生函数。

1.  Run `flutter run` and check that your native function gets called.

   运行 `flutter run` 并检查你的原生函数是否被调用。

1.  Run `flutter build macos` to build a
    self-contained release version of your app.

   运行 `flutter build macos` 来构建一个
   独立的发布版本的应用。

[Flutter macOS Desktop]: /platform-integration/macos/building

#### Stripping symbols {:#macos-stripping-symbols}

#### 剥离 Symbols 符号 {:#macos-stripping-symbols}

When creating a release build, Xcode strips the symbols.

当创建发布版本时，Xcode 会剥离 Symbols 符号。

1.  In Xcode, select the **Runner** target,
    then go to **Build Settings > Strip Style**.

   在 Xcode 中，选择 **Runner** 目标，
   然后前往 **Build Settings > Strip Style**。

1.  Change from **All Symbols** to **Non-Global Symbols**.

   从 **All Symbols** 更改为 **Non-Global Symbols**。

### Android

#### Platform library {:#android-platform-library}

#### 平台库 {:#android-platform-library}

To link against a platform library,
use the following instructions:

要链接到平台库，
请使用以下说明：

1.  Find the desired library in the [Android NDK Native APIs][]
    list in the Android docs. This lists stable native APIs.

   在 Android 文档的 [Android NDK Native APIs][]
   列表中找到所需的库。此列表包含稳定的原生 API。

1.  Load the library using [`DynamicLibrary.open`][].
    For example, to load OpenGL ES (v3):

   使用 [`DynamicLibrary.open`][`DynamicLibrary.open`] 加载库。
   例如，加载 OpenGL ES (v3)：

    ```dart
    DynamicLibrary.open('libGLES_v3.so');
    ```

You might need to update the Android manifest file of the
app or plugin if indicated by the documentation.

如果文档中有所指示，你可能需要更新应用或 plugin 的
Android manifest 文件。

[Android NDK Native APIs]: {{site.android-dev}}/ndk/guides/stable_apis

#### First-party library {:#android-first-party-library}

#### 第一方库 {:#android-first-party-library}

The process for including native code in
source code or binary form is the same for an app or plugin.

以源代码或二进制形式包含原生代码的
过程对于应用或 plugin 来说是相同的。

#### Open-source third-party library {:#android-open-source-third-party-library}

#### 开源第三方库 {:#android-open-source-third-party-library}

Follow the [Add C and C++ code to your project][]
instructions in the Android docs to
add native code and support for the native
code toolchain (either CMake or `ndk-build`).

遵循 Android 文档中 [将 C 和 C++ 代码添加到你的项目][Add C and C++ code to your project]
的说明，以添加原生代码并支持原生
代码工具链（无论是 CMake 还是 `ndk-build`）。

[Add C and C++ code to your project]: {{site.android-dev}}/studio/projects/add-native-code

#### Closed-source third-party library {:#android-closed-source-third-party-library}

#### 闭源第三方库 {:#android-closed-source-third-party-library}

To create a Flutter plugin that includes Dart source code,
but distribute the C/C++ library in binary form,
use the following instructions:

要创建一个包含 Dart 源代码，
但以二进制形式分发 C/C++ 库的 Flutter plugin，
请使用以下说明：

1.  Open the `android/build.gradle` file for your project.

   打开你项目的 `android/build.gradle` 文件。

1.  Add the AAR artifact as a dependency.
    **Don't** include the artifact in your Flutter package.
    Instead, it should be downloaded from a repository, such as Maven Central.

   将 AAR artifact 添加为依赖项。
   **不要** 将 artifact 包含在你的 Flutter package 中。
   相反，它应该从仓库（例如 Maven Central）下载。

#### Android APK size (shared object compression)

#### Android APK 大小（共享对象压缩）

[Android guidelines][] in general recommend
distributing native shared objects uncompressed
because that actually saves on device space.
Shared objects can be directly loaded from the APK instead of
unpacking them on the device into a temporary location and then loading.
APKs are additionally packed in transit&mdash;that's
why you should be looking at download size.

[Android 指南][Android guidelines] 通常建议
分发未压缩的原生共享对象，
因为这实际上节省了设备空间。
共享对象可以直接从 APK 加载，而不是
在设备上解压到临时位置再加载。
APK 在传输过程中还会额外打包&mdash;这就是
为什么你应该关注下载大小。

By default, Flutter APKs compress `libflutter.so` and `libapp.so`,
which leads to a smaller APK size but a larger on-device size.
To control whether native libraries are stored compressed and extracted at
install time, set the Android Gradle plugin's `useLegacyPackaging` option.
For current recommendations, see the [Android guidelines][].

默认情况下，Flutter APK 会压缩 `libflutter.so` 和 `libapp.so`，
这会导致 APK 文件更小，但设备上的文件更大。
要控制原生库是否在安装时压缩和提取，
请设置 Android Gradle plugin 的 `useLegacyPackaging` 选项。
有关当前建议，请参阅 [Android 指南][Android guidelines]。

[Android guidelines]: {{site.android-dev}}/topic/performance/reduce-apk-size#extract-false

## Other resources

## 其他资源

To learn more about C interoperability, check out these videos:

要了解更多关于 C 互操作性的信息，请查看这些视频：

- [C interoperability with Dart FFI][]

  [Dart FFI 的 C 互操作性][C interoperability with Dart FFI]

- [How to Use Dart FFI to Build a Retro Audio Player][]

  [如何使用 Dart FFI 构建复古音频播放器][How to Use Dart FFI to Build a Retro Audio Player]

[C interoperability with Dart FFI]: {{site.yt.watch}}?v=2MMK7YoFgaA
[How to Use Dart FFI to Build a Retro Audio Player]: {{site.yt.watch}}?v=05Wn2oM_nWw
