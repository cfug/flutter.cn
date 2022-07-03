---
title: "Binding to native iOS code using dart:ffi"
title: 在 iOS 原生代码中使用 dart:ffi
description: "To use C code in your Flutter program, use the dart:ffi library."
description: "在您的 Flutter 工程中，通过 dart:ffi 来使用 C 语言代码"
tags: 平台集成
keywords: dartffi
---

<?code-excerpt path-base="development/platform_integration"?>

Flutter mobile and desktop apps can use the
[dart:ffi][] library to call native C APIs.
_FFI_ stands for [_foreign function interface._][FFI]
Other terms for similar functionality include
_native interface_ and _language bindings._

Flutter 移动端和桌面应用都可以使用 [dart:ffi][] 库来调用本地的 C API。
**FFI** 代表 [**外部功能接口**][FFI]。
类似功能的其他术语包括**本地接口**和**语言绑定**。

{{site.alert.note}}

  This page describes using the `dart:ffi` library
  in iOS apps. For information on Android, see
  [Binding to native Android code using dart:ffi][android-ffi].
  For information in macOS, see
  [Binding to native macOS code using dart:ffi][macos-ffi].
  This feature is not yet supported for web plugins.

  本页面描述了在 iOS 应用中如何使用 `dart:ffi` 库。
  你还可以查看[在 Android 原生代码中使用 dart:ffi][android-ffi]，
  或是[在 macOS 原生代码中使用 dart:ffi][android-ffi]，
  该能力还未在 web 插件中实现。

{{site.alert.end}}


[android-ffi]: {{site.url}}/development/platform-integration/android/c-interop
[macos-ffi]: {{site.url}}/development/platform-integration/macos/c-interop
[dart:ffi]: {{site.dart.api}}/dev/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

Before your library or program can use the FFI library
to bind to native code, you must ensure that the
native code is loaded and its symbols are visible to Dart.
This page focuses on compiling, packaging,
and loading iOS native code within a Flutter plugin or app.

您必须首先确保本地代码已加载，并且其符号对 Dart 可见，
然后才能在库或程序使用 FFI 库绑定本地代码。
本页主要介绍如何在 Flutter 插件或应用程序中编译、打包和加载本地代码。

This tutorial demonstrates how to bundle C/C++
sources in a Flutter plugin and bind to them using
the Dart FFI library on iOS.
In this walkthrough, you'll create a C function
that implements 32-bit addition and then
exposes it through a Dart plugin named "native_add".

本教程演示了如何在 Flutter 插件中捆绑 C/C++ 源代码，
并使用 Android 和 iOS 上的 Dart FFI 库绑定它们。
在本示例中，您将创建一个实现 32 位的加法 C 函数，
然后通过名为 "native_add" 的 Dart 插件暴露它。

### Dynamic vs static linking

### 动态链接 vs 静态链接

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
并按需加载。
在 Android 上，动态链接库作为一组 `.so`（ELF 可执行与可链接格式）文件分发，
每个架构各有一个。
在 iOS 上，它是作为 `.framework` 文件夹分发的。

A dynamically linked library can be loaded into
Dart using `DynamicLibrary.open`.

动态链接库在 Dart 中可以通过 `DynamicLibrary.open` 加载。

API documentation is available from the Dart dev channel:
[Dart API reference documentation][].

Dart dev 频道中的 API 已经可用：
[Dart API 参考文档][Dart API reference documentation].

[Dart API reference documentation]: {{site.dart.api}}/dev/

## Step 1: Create a plugin

## 步骤 1：创建插件

If you already have a plugin, skip this step.

如果您已经有一个插件，跳过这步。

To create a plugin called "native_add",
do the following:

如果要创建一个名为 "native_add" 的插件，
您需要这么做：

```terminal
$ flutter create --platforms=android,ios --template=plugin native_add
$ cd native_add
```

{{site.alert.note}}
  You can exclude platforms from `--platforms` that you don't want
  to build to. However, you need to include the platform of 
  the device you are testing on.

  您可以使用 --platforms 来排除您不需要的平台。
  但是，您仍需要包含测试设备所需的平台。

{{site.alert.end}}

## Step 2: Add C/C++ sources

## 步骤 2：添加 C/C++ 源码

You need to inform the iOS build system about the
native code so the code can be compiled
and linked appropriately into the final application.

您需要让 iOS 构建系统知道本地代码的存在，
以便代码可以被编译并链接到最终的应用程序中。

Add the sources to the `ios` folder,
because CocoaPods doesn't allow including sources
above the `podspec` file.

您可以将源代码添加到 `ios` 文件夹，
因为 CocoaPods 不允许源码处于比 podspec 文件更高的目录层级，
但是 Gradle 允许您指向 `ios` 文件夹。
iOS 和 Android 不需要使用相同的源代码；
当然，您也可以将特定于 Android 的源代码添加到 `android` 文件夹
并修改 `CMakeLists.txt` 文件。

The FFI library can only bind against C symbols,
so in C++ these symbols must be marked `extern C`.
You should also add attributes to indicate that the
symbols are referenced from Dart,
to prevent the linker from discarding the symbols
during link-time optimization.

FFI 库只能与 C 符号绑定，因此在 C++ 中，这些符号添加 `extern C` 标记。
还应该添加属性来表明符号是需要被 Dart 引用的，
以防止链接器在优化链接时会丢弃符号。

For example,
to create a C++ file named `ios/Classes/native_add.cpp`,
use the following instructions. (Note that the template
has already created this file for you.) Start from the
root directory of your project:

作为示例，创建一个 C++ 文件，
路径为：`ios/Classes/native_add.cpp`。
（请注意，模板已经为您创建了此文件。）
在项目的根目录下中执行以下命令：

```bash
cat > ios/Classes/native_add.cpp << EOF
#include <stdint.h>

extern "C" __attribute__((visibility("default"))) __attribute__((used))
int32_t native_add(int32_t x, int32_t y) {
    return x + y;
}
EOF
```

On iOS, you need to tell Xcode to statically link the file:

在 iOS 中，您需要告诉 Xcode 如何静态链接这个文件：

 1. In Xcode, open `Runner.xcworkspace`.

    在 Xcode 中，打开 `Runner.xcworkspace`。

 2. Add the C/C++/Objective-C/Swift
    source files to the Xcode project.

    添加 C/C++/Objective-C/Swift 源码文件到 Xcode 工程中。
## Step 3: Load the code using the FFI library

## 步骤 3：在 FFI 库中读取代码

In this example, you can add the following code to
`lib/native_add.dart`. However the location of the
Dart binding code isn't important.

在示例中，您需要添加如下的代码到 `lib/native_add.dart`。
但是，Dart 在何处进行代码绑定并不重要。

First, you must create a `DynamicLibrary` handle to
the native code. The following example shows
how to create a handle for an iOS app OR an Android app:

首先，您需要创建一个 `DynamicLibrary` 来处理本地代码。
这一步在 iOS 和 Android 之间有所不同：

<?code-excerpt "lib/c_interop.dart (DynamicLibrary)"?>
```dart
import 'dart:ffi'; // For FFI
import 'dart:io'; // For Platform.isX

final DynamicLibrary nativeAddLib = Platform.isAndroid
    ? DynamicLibrary.open('libnative_add.so')
    : DynamicLibrary.process();
```

Note that on Android the native library is named
in `CMakeLists.txt`,
but on iOS it takes the plugin's name.

请注意，在 Android 上，
本地库的名称是定义在 `CMakeLists.txt` 中的（见上文），
但在 iOS 上，它将使用插件的名称。

With a handle to the enclosing library,
you can resolve the `native_add` symbol:

您可以通过使用库的句柄来解析 `native_add` 符号：

<?code-excerpt "lib/c_interop.dart (NativeAdd)"?>
```dart
final int Function(int x, int y) nativeAdd = nativeAddLib
    .lookup<NativeFunction<Int32 Function(Int32, Int32)>>('native_add')
    .asFunction();
```

Finally, you can call it. To demonstrate this within
the auto-generated "example" app (`example/lib/main.dart`):

现在，您可以调用它了。
在自动生成的 example 项目
（`example/lib/main.dart`）中演示它。

```nocode
// Inside of _MyAppState.build:
        body: Center(
          child: Text('1 + 2 == ${nativeAdd(1, 2)}'),
        ),
```

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
您还可以使用 [`DynamicLibrary.open`][]
来限制符号解析的范围，
但目前仍然不确定苹果的审查程序将如何处理两者的使用。

Symbols statically linked into the application binary
can be resolved using [`DynamicLibrary.executable`][] or
[`DynamicLibrary.process`][].

您可以使用 [`DynamicLibrary.executable`][]
或 [`DynamicLibrary.process`][]
解析静态链接到应用程序二进制文件的符号。

[`DynamicLibrary.executable`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

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

 1. Add the C/C++/Objective-C/Swift
    source files to the Xcode project.

    添加 C/C++/Objective-C/Swift 源码到 Xcode 工程中。

 1. Add the following prefix to the
    exported symbol declarations to ensure they
    are visible to Dart:

    将以下前缀添加到导出的符号声明中，以确保它们对 Dart 可见：

    **C/C++/Objective-C**

    ```objective-c
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

2. Add the framework file to the **Embedded Binaries**
   section.

   添加 framework 文件到 **Embedded Binaries** 区域中。

3. Also add it to the **Linked Frameworks & Libraries**
   section of the target in Xcode.

   同时将其添加到 Xcode 中目标的 **Linked Frameworks & Libraries** 部分。

#### Compiled (dynamic) library (macOS)

#### 已编译的（动态）库 (macOS)

To create add a closed source library to a [Flutter macOS Desktop][] app,
use the following instructions.

要添加一个闭源的库到 [Flutter macOS 桌面][Flutter macOS Desktop] 应用，
请按照如下说明：

1. Follow the instructions for Flutter desktop to create a Flutter desktop app.

   按照 Flutter 桌面的使用说明来创建 Flutter 桌面应用程序。

1. Open the `yourapp/macos/Runner.xcworkspace` in Xcode.

   在 Xcode 中打开 `yourapp/macos/Runner.xcworkspace`。

   1. Drag your precompiled library (`libyourlibrary.dylib`) into `Runner/Frameworks`.

      拖动您已经预编译的 `libyourlibrary.dylib` 到您的 `Runner/Frameworks`。

   1. Click `Runner` and go to the `Build Phases` tab.

      点击 `Runner` 然后进入 `Build Phases` 标签.

      1. Drag `libyourlibrary.dylib` into the `Copy Bundle Resources` list.

         拖动 `libyourlibrary.dylib` 到 `Copy Bundle Resources` 列表。

      1. Under `Embed Libraries`, check `Code Sign on Copy`.

         在 `Embed Libararies` 下，检查 `Code Sign on Copy`。

      1. Under `Link Binary With Libraries`, set status to `Optional`. (We use dynamic linking, no need to statically link.)

         在 `Link Binary With Libraries` 下，设置状态为 `Optional`。（咱们使用动态链接，不需要静态链接）

   1. Click `Runner` and go to the `General` tab.

      点击 `Runner` 然后进入 `General` 标签页。

      1. Drag `libyourlibrary.dylib` into the `Frameworks, Libararies and Embedded Content` list.

         拖动 `libyourlibrary.dylib` 到 `Frameworks, Libararies and Embedded Content` 列表中。

      1. Select `Embed & Sign`.

         选择 `Embed & Sign`。

   1. Click `Runner` and go to the `Build Settings` tab.

      点击 `Runner` 然后进入 `Build Settings` 标签页。

      1. In the `Search Paths` section configure the `Library Search Paths` to include the path where `libyourlibrary.dylib` is located.

         在 `Search Paths` 部分，配置 `Library Search Paths` 确保 `libyourlibrary.dylib` 的路径包括在内。

1. Edit `lib/main.dart`.

   编辑  `lib/main.dart` 文件。

   1. Use `DynamicLibrary.open('libyourlibrary.dylib')` to dynamically link to the symbols.

      使用 `DynamicLibrary.open('libyourlibrary.dylib')` 来动态链接符号表。

   1. Call your native function somewhere in a widget.

      在 widget 的某个地方调用您的本地代码。

1. Run `flutter run` and check that your native function gets called.

   运行 `flutter run` 然后检查您的本地方法的调用结果。

1. Run `flutter build macos` to build a selfcontained release version of your app.

   运行 `flutter build macos` 去构建一个自包含的 release 版本的应用。

[Flutter macOS Desktop]: {{site.url}}/desktop

#### Open-source third-party library

#### 开源的三方库

To create a Flutter plugin that includes both
C/C++/Objective-C _and_ Dart code,
use the following instructions:

要创建一个包含 C/C++/Objective-C **和** Dart 代码的 Flutter 插件，
请按照如下说明：

1. In your plugin project,
   open `ios/<myproject>.podspec`.

   在您的插件项目打开 `ios/<myproject>.podspec`.

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

   在您的插件目录打开 `ios/<myproject>.podspec`。

2. Add a `vendored_frameworks` field.
   See the [CocoaPods example][].

   添加 `vendored_frameworks` 字段。
   参考 [CocoaPods 示例][CocoaPods example]。

{{site.alert.warning}}

  **Do not** upload this plugin
  (or any plugin containing binary code) to pub.dev.
  Instead, this plugin should be downloaded
  from a trusted third-party,
  as shown in the CocoaPods example.

  **不要**将此插件
  （或任何包含二进制代码的插件）上载到 pub.dev。
  相反，应该从可信的第三方下载此插件。
  如 CocoaPods 示例所示。

{{site.alert.end}}

[CocoaPods example]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

## Stripping iOS symbols

### 删除的 iOS 符号表

When creating a release archive (IPA),
the symbols are stripped by Xcode.

当创建一个 release 档案（IPA）时，符号会被 Xcode 删除。

1. In Xcode, go to **Target Runner > Build Settings > Strip Style**.

   在 Xcode 中, 点击 **Target Runner > Build Settings > Strip Style**.

2. Change from **All Symbols** to **Non-Global Symbols**.

   将 **All Symbols** 修改为 **Non-Global Symbols**。
