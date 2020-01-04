---
title: "Binding to native code using dart:ffi"
title: 使用 dart:ffi 调用原生代码
description: "To use C code in your Flutter program, use the dart:ffi library (currently in beta)."
description: "在你的 Flutter 工程里使用 C 语言代码，可以通过 dart:ffi 库来实现（Beta 测试版）"
---

Flutter mobile can use the [dart:ffi][] library
to call native C APIs. _FFI_ stands for
[_foreign function interface._][FFI]
Other terms for similar functionality include
_native interface_ and _language bindings._

移动版 Flutter 可以使用 dart：ffi 库来调用原生 C API。
**FFI** 代表 [_foreign function interface._][FFI]。
类似功能的其他术语包括**原生界面**和**语言绑定**。

Before your library or program can use the FFI library
to bind to native code, you must ensure that the
native code is loaded and its symbols are visible to Dart.
This page focuses on compiling, packaging,
and loading native code within a Flutter plugin or app.

在你的库或程序可以使用FFI库绑定到原生代码之前，
必须确保已加载原生代码，并且 Dart 可以看到其符号。
此页面着重于在 Flutter 插件或 app 内编译，打包以及加载原生代码。 

This tutorial demonstrates how to bundle C/C++
sources in a Flutter plugin and bind to them using
the Dart FFI library on both Android and iOS.
In this walkthrough, you'll create a C function
that implements 32-bit addition and then
exposes it through a Dart plugin named "native_add".

本教程演示了如何在 Flutter 插件中捆绑 C/C ++ 源
并使用 Android 和 iOS 上的 Dart FFI 库将其绑定。
在本演示中，您将创建一个实现 32 位加法的 C 函数，
然后通过名为 "native_add" 的 Dart 插件将它公开。

{{ site.alert.note }}

  The dart:ffi library is [in beta][ffi issue],
  and breaking API changes might still happen.
  
  dart：ffi 库处于 [测试中][ffi issue]，可能仍会发生 API 的重大更改。

  Using the feature requires a Flutter 1.10.x
  dev channel build. To switch to the dev channel and
  upload the latest dev version, do the following:
  
  使用此功能需要 Flutter 1.10.x 的开发通道构建。
  要切换至开发通道，并上传最新的开发版本，
  请进行以下操作：

  ```terminal
  $ flutter channel dev
  $ flutter upgrade
  ```
  For more information on Flutter's channels,
  see [Upgrading Flutter][].
  
  更多 Flutter 渠道的信息，请参阅 [Upgrading Flutter][]。
{{ site.alert.end }}

### Dynamic vs static linking

### 动态与静态链接对比

A native library can be linked into an app either
dynamically or statically. A statically linked library
is embedded into the app's executable image,
and is loaded when the app starts.

可以将原生库以动态或静态链接到 app。
静态链接库嵌入到 app 的可执行映像中，
并在 app 启动时加载。

Symbols from a statically linked library can be
loaded using `DynamicLibrary.executable` or
`DynamicLibrary.process`.

可以使用 `DynamicLibrary.executable` 或 `DynamicLibrary.process` 
加载来自静态链接库的符号。

A dynamically linked library, by contrast, is distributed
in a separate file or folder within the app,
and loaded on-demand. On Android, a dynamically
linked library is distributed as a set of `.so` (ELF)
files, one for each architecture. On iOS,
it's distributed as a `.framework` folder.

相反，动态链接库分布在 app 内的单独文件或文件夹中，
并按需加载。在 Android 系统中，
动态链接库以一组 `.so` (ELF) 文件的形式分布，
每种架构一个。在 iOS 系统中，
它作为 `.framework` 文件夹分布。

A dynamically linked library can be loaded into
Dart via `DynamicLibrary.open`.

动态链接库可以通过 `DynamicLibrary.open` 加载到 Dart。

API documentation is available from the Dart dev channel:
[Dart API reference documentation][].

可以从 Dart 的开发道获得 API 文档：[Dart API reference documentation][]。

## Step 1: Create a plugin

## 步骤1：创建插件

If you already have a plugin, skip this step.

如果你已经有插件，跳过此步骤。

To create a plugin called "native_add",
do the following:

进行以下操作，以创建名为 "native_add" 的插件：

```terminal
$ flutter create --template=plugin native_add
$ cd native_add
```

## Step 2: Add C/C++ sources

## 步骤2：增加C/C++源

You need to inform both the Android and iOS build
systems about the native code so the code can be compiled
and linked appropriately into the final application.

需要通知 Android 及 iOS 的构建系统有关原生代码的信息，
以使代码可以被编译，并以适当方式连接到最终的应用程序中。

You add the sources to the `ios` folder,
because CocoaPods doesn't allow including sources
above the podspec file, but Gradle allows you to point
to the `ios` folder. It's not required to use the same
sources for both iOS and Android;
you may, of course, add Android-specific sources
to the `android` folder and modify `CMakeLists.txt`
appropriately.

可将源添加到 `ios` 的文件夹中，
因为 CocoaPods 不允许在 podspec 文件上方包含源，
但是 Gradle 允许你指向 `ios` 的文件夹。
iOS 和 Android 系统无需使用相同的源；
完全可以添加 Android 系统专用的源到 `android` 的文件夹，
并适当地修改 `CMakeLists.txt`。

The FFI library can only bind against C symbols,
so in C++ these symbols must be marked `extern C`.
You should also add attributes to indicate that the
symbols are referenced from Dart,
to prevent the linker from discarding the symbols
during link-time optimization.

FFI 库只能绑定 C 语言符号，
因此在 C ++ 言中，这些符号必须标记为 `extern C`。
还应添加属性以指示从 Dart 引用了这些符号，
以防止链接程序在链接优化时废弃这些符号。

For example,
to create a C++ file named `ios/Classes/native_add.cpp`,
use the following instructions. (Note that the template
has already created this file for you.) Start from the
root directory of your project:

例如，
要创建名为 `ios/Classes/native_add.cpp` 的 C ++ 文件，
请使用以下说明。（请注意，模板已为你创建了该文件。）
从项目的根目录开始：

```bash
cat > ios/Classes/native_add.cpp << EOF
#include <stdint.h>

extern "C" __attribute__((visibility("default"))) __attribute__((used))
int32_t native_add(int32_t x, int32_t y) {
    return x + y;
}
EOF
```

On iOS, you need to tell xcode to statically link the file:

在 iOS 系统中，你需要通过以下步骤来告知 Xcode 进行静态文件链接：

 1. In Xcode, open `Runner.xcworkspace`.
 
    在 Xcode 中，打开 `Runner.xcworkspace`。
 
 1. Add the C/C++/Objective-C/Swift
    source files to the Xcode project.
    
    将 C/C++/Objective-C/Swift 源文件添加到 Xcode 项目中。

On Android, you need to create a `CMakeLists.txt` file
to define how the sources should be compiled and point
Gradle to it. From the root of your project directory,
use the following instructions

在 Android 系统中，
您需要创建 `CMakeLists.txt` 文件来定义如何编译源并将 Gradle 指向该文件。
在项目目录的根目录中，按照以下说明进行操作

```bash
cat > android/CMakeLists.txt << EOF
cmake_minimum_required(VERSION 3.4.1)  # for example

add_library( native_add

             # Sets the library as a shared library.
             SHARED

             # Provides a relative path to your source file(s).
             ../ios/Classes/native_add.cpp )
EOF
```

Finally, add an `externalNativeBuild` section to
`android/build.gradle`. For example:

最后，在 `android/build.gradle` 中添加一个
`externalNativeBuild` 的分区。 例如：

```nocode
android {
  // ...
  externalNativeBuild {
    // Encapsulates your CMake build configurations.
    cmake {
      // Provides a relative path to your CMake build script.
      path "CMakeLists.txt"
    }
  }
  // ...
}
```

## Step 3: Load the code using the FFI library

## 步骤3：使用FFI库加载代码

In this example, you can add the following code to
`lib/native_add.dart`. However the location of the
Dart binding code is not important.

在本例中，
您可将以下代码添加到 `lib/native_add.dart` 中。
然而，Dart 绑定代码的位置并不重要。

First, you must create a `DynamicLibrary` handle to
the native code. This step varies between iOS and Android:

首先，必须为原生代码创建一个 `DynamicLibrary` 句柄。
这一步在 iOS 和 Android 系统之间有所不同:

```dart
import 'dart:ffi';  // For FFI
import 'dart:io';   // For Platform.isX

final DynamicLibrary nativeAddLib =
  Platform.isAndroid
    ? DynamicLibrary.open("libnative_add.so")
    : DynamicLibrary.process();
```

Note that on Android the native library is named
in `CMakeLists.txt` (see above),
but on iOS it takes the plugin's name.

注意，在 Android 系统中，
本地库的名称是在 `CMakeLists.txt` 中命名的(见上)，
但在 iOS 系统中它使用的是插件的名字。

With a handle to the enclosing library,
you can resolve the `native_add` symbol:

有了这一封闭库的句柄，
您可以解析 `native_add` 符号:

<!-- skip -->
```dart
final int Function(int x, int y) nativeAdd =
  nativeAddLib
    .lookup<NativeFunction<Int32 Function(Int32, Int32)>>("native_add")
    .asFunction();
```

Finally, you can call it. To demonstrate this within
the auto-generated "example" app (`example/lib/main.dart`):

最后，您可对其进行调用。
要在自动生成的“示例” app (`example/lib/main.dart`) 中演示这一点:

```nocode
// Inside of _MyAppState.build:
        body: Center(
          child: Text('1 + 2 == ${nativeAdd(1, 2)}'),
        ),
```

## Other use cases

## 其他用例

### iOS and macOS

### iOS 和 macOS 系统

Dynamically linked libraries are automatically loaded by
the dynamic linker when the app starts. Their constituent
symbols can be resolved using [`DynamicLibrary.process`][].
You can also get a handle to the library with
[`DynamicLibrary.open`][] to restrict the scope of
symbol resolution, but it's unclear how Apple's
review process handles this.

启动应用程序时，
动态链接程序会自动加载动态链接库。 
动态链接库的组成符号可使用 [`DynamicLibrary.process`][] 进行解析。
您还可以通过 [`DynamicLibrary.open`][] 获取库的句柄以限制符号解析的范围，
但是目前尚不清楚苹果的审查过程如何处理该点。

Symbols statically linked into the application binary
can be resolved using [`DynamicLibrary.executable`][] or
[`DynamicLibrary.process`][].

静态链接至应用程序二进制文件中的符号可通过
 [`DynamicLibrary.executable`][] 或者
[`DynamicLibrary.process`][] 进行解析。

#### Platform library

### 平台库

To link against a platform library,
use the following instructions:

要链接到平台库，请使用以下说明：

1. In Xcode, open `Runner.xcworkspace`.

   在 Xcode 中，打开 `Runner.xcworkspace`。

2. Select the target platform.

   选择目标平台。

3. Click **+** in the **Linked Frameworks and Libraries**
   section.
   
   单击**链接的框架和库**部分中的 **+**。

4. Select the system library to link against.

   选择要链接的系统库。

#### First-party library

### 第一方库

A first-party native library can be included either
as source or as a (signed) `.framework` file.
It's probably possible to include statically linked
archives as well, but it requires testing.

可将第一方本地库作为源代码或(已签名的)
`.framework` 文件包含在内。
测试后的静态链接存档或也如此。

#### Source code

### 源代码

To link directly to source code,
use the following instructions:

要直接链接到源代码，请使用以下说明：

 1. In Xcode, open `Runner.xcworkspace`.
 
    在 Xcode 中，打开 `Runner.xcworkspace`。
 
 2. Add the C/C++/Objective-C/Swift
    source files to the Xcode project.
    
    将 C/C++/Objective-C/Swift 源文件添加到 Xcode 项目。
 
 3. Add the following prefix to the
    exported symbol declarations to ensure they
    are visible to Dart:
    
    在导出的符号声明中添加以下前缀，以确保其对 Dart 可见：

    **C/C++/Objective-C**

    ```objective-c
    extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
    ```

    **Swift**

    ```swift
    @_cdecl("myFunctionName")
    ```

#### Compiled (dynamic) library

### 编译（动态）库

To link to a compiled dynamic library,
use the following instructions:

要链接到已编译的动态库，请使用以下说明：

1. If a properly signed `Framework` file is present,
   open `Runner.xcworkspace`.
   
   若存在正确签名的 `Framework` 文件，则打开 `Runner.xcworkspace`。

2. Add the framework file to the **Embedded Binaries**
   section.

   将框架文件添加至**嵌入式二进制**分区。
   
3. Also add it to the **Linked Frameworks & Libraries**
   section of the target in Xcode.
   
   并将其添加到 Xcode 中目标的**链接框架和库**分区。

#### Open-source third-party library

### 开源第三方库

To create a Flutter plugin that includes both
C/C++/Objective-C _and_ Dart code,
use the following instructions:

要创建同时包含 C/C++/Objective-C **和** Dart
代码的 Flutter 插件，请使用以下说明：

1. In your plugin project,
   open `ios/<myproject>.podspec`.
   
   在您的插件项目中打开 `ios / <myproject> .podspec`。

2. Add the native code to the `source_files`
   field.
   
   将原生代码添加到 `source_files` 字段。

The native code is then statically linked into
the application binary of any app that uses
this plugin.

然后，将原生代码静态链接到
使用此插件的任何应用程序的
应用程序二进制文件中。

#### Closed-source third-party library
### 闭源第三方库

To create a Flutter plugin that includes Dart
source code, but distribute the C/C++ library
in binary form, use the following instructions:

要创建包含 Dart 源代码
但以二进制形式分发 C/C++ 库的 Flutter 插件，
请使用以下说明：

1. In your plugin project,
   open `ios/<myproject>.podspec`.
   
   在您的插件项目中，打开 `ios / <myproject> .podspec`。

2. Add a `vendored_frameworks` field.
   See the [CocoaPods example][].

   添加一个`vendored_frameworks`字段。请参见 [CocoaPods 示例][]。


**Do not** upload this plugin
(or any plugin containing binary code)
to Pub. Instead, this plugin should be downloaded
from a trusted third-party,
as shown in the CocoaPods example.

**禁止**上传此插件（或任何包含二进制代码的插件）至 Pub。
应如 CocoaPods 示例所示，从受信任的第三方下载此插件。

### Android

### Android

#### Platform library

### 平台库

To link against a platform library,
use the following instructions:

使用以下指南链接到平台库：

 1. Find the desired library in the [Android NDK Native APIs][]
    list in the Android docs. This lists stable native APIs.
  
    在 Android 文档内的 [Android NDK Native APIs][] 的列表里找到所需的库，该列表列出了稳定的原生 API。
 
 2. Load the library using [`DynamicLibrary.open`][].
 
    使用 [`DynamicLibrary.open`][] 加载库。例如加载 OpenGL ES (v3)：
 
    For example, to load OpenGL ES (v3):
    <!-- skip -->
    ```dart
    DynamicLibrary.open('libGLES_v3.so');
    ```

You might need to update the Android manifest
file of the app or plugin if indicated by
the documentation.

如文档指示，
可能需要更新 app 或插件的 Android 清单文件。

#### First-party library

### 第三方库

The process for including native code in source
code or binary form is the same for an app or
plugin.

在源代码或二进制形式包含原生代码的
过程与 app 或插件相同。

#### Open-source third-party
### 开源第三方

Follow the [Add C and C++ code to your project][]
instructions in the Android docs to
add native code and support for the native
code toolchain (either CMake or `ndk-build`).

按照  [Add C and C++ code to your project][] Android 文档中的说明，
添加本机代码并支持本机代码工具链（CMake 或 `ndk-build`）

#### Closed-source third-party library

### 封闭源码第三方库

To create a Flutter plugin that includes Dart
source code, but distribute the C/C++ library
in binary form, use the following instructions:

遵照以下指示来创建包含 Dart 源代码，
但以二进制形式分布 C/C++ 库的 Flutter 插件：

1. Open the `android/build.gradle` file for your
   project.
   
   打开项目的 `android/build.gradle` 文件。

2. Add the AAR artifact as a dependency.
   **Don't** include the artifact in your
   Flutter package. Instead, it should be
   downloaded from a repository, such as
   JCenter.
   
   将 AAR 工件添加为依赖项。**不要**在 Flutter 软件包中包含工件。而应从诸如 JCenter 之类的存储库中下载工件。

### Web
### 网页


Plugins are not yet supported for web apps.

网页 app 尚不支持插件。


[Add C and C++ code to your project]: {{site.android-dev}}/studio/projects/add-native-code

[项目中添加 C and C++ 代码]: {{site.android-dev}}/studio/projects/add-native-code

[Android NDK Native APIs]: {{site.android-dev}}/ndk/guides/stable_apis

[Android NDK的原生API]: {{site.android-dev}}/ndk/guides/stable_apis

[CocoaPods example]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

[CocoaPods例子]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

[Dart API reference documentation]: {{site.dart.api}}/dev/

[Dart API参考文件]: {{site.dart.api}}/dev/

[dart:ffi]: {{site.dart.api}}/dev/dart-ffi/dart-ffi-library.html

[dart:ffi]: {{site.dart.api}}/dev/dart-ffi/dart-ffi-library.html

[`DynamicLibrary.executable`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html

[`DynamicLibrary.executable`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html

[`DynamicLibrary.open`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.open.html

[`DynamicLibrary.open`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.open.html

[`DynamicLibrary.process`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

[`DynamicLibrary.process`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

[ffi issue]: {{site.github}}/dart-lang/sdk/issues/34452

[ffi issue]: {{site.github}}/dart-lang/sdk/issues/34452

[Upgrading Flutter]: /docs/development/tools/sdk/upgrading


[Flutter 更新]: /docs/development/tools/sdk/upgrading
