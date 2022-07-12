---
title: "Binding to native Android code using dart:ffi"
title: "Android 上使用 dart:ffi 调用本地代码"
description: "To use C code in your Flutter program, use the dart:ffi library."
description: "在你的 Flutter 工程中，通过 dart:ffi 来使用 C 语言代码"
tags: "平台集成"
keywords: "dartffi"
---

<?code-excerpt path-base="development/platform_integration"?>

Flutter mobile and desktop apps can use the
[dart:ffi][] library to call native C APIs.
_FFI_ stands for [_foreign function interface._][FFI]
Other terms for similar functionality include
_native interface_ and _language bindings._

Flutter 移动版可以使用 [dart:ffi][] 库来调用本地的 C API。
**FFI** 代表 [**外部功能接口**][FFI]。
类似功能的其他术语包括**本地接口**和**语言绑定**。

{{site.alert.note}}

  This page describes using the `dart:ffi` library
  in Android apps. For information on iOS, see
  [Binding to native iOS code using dart:ffi][ios-ffi].
  For information in macOS, see
  [Binding to native macOS code using dart:ffi][macos-ffi].
  This feature is not yet supported for web plugins.

  本文描述的是在 Android 应用中使用 `dart:ffi` 库。
  你可以阅读 [在 iOS 中使用 dart:ffi 调用本地代码][ios-ffi]
  或 [在 macOS 中使用 dart:ffi 调用本地代码][macos-ffi]。
  Web 插件暂不支持调用本地代码。

{{site.alert.end}}


[ios-ffi]: {{site.url}}/development/platform-integration/ios/c-interop
[dart:ffi]: {{site.dart.api}}/dev/dart-ffi/dart-ffi-library.html
[macos-ffi]: {{site.url}}/development/platform-integration/macos/c-interop
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

Before your library or program can use the FFI library
to bind to native code, you must ensure that the
native code is loaded and its symbols are visible to Dart.
This page focuses on compiling, packaging,
and loading Android native code within a Flutter plugin or app.

你必须首先确保本地代码已加载，并且其符号对 Dart 可见，
然后才能在库或程序使用 FFI 库绑定本地代码。
本页主要介绍如何在 Flutter 插件或应用程序中编译、打包和加载本地代码。

This tutorial demonstrates how to bundle C/C++
sources in a Flutter plugin and bind to them using
the Dart FFI library on both Android and iOS.
In this walkthrough, you'll create a C function
that implements 32-bit addition and then
exposes it through a Dart plugin named "native_add".

本教程演示了如何在 Flutter 插件中捆绑 C/C++ 源代码，
并使用 Android 和 iOS 上的 Dart FFI 库绑定它们。
在本示例中，你将创建一个实现 32 位的加法 C 函数，
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
loaded using [`DynamicLibrary.executable`][] or
[`DynamicLibrary.process`][].

静态链接中的符号可以使用 [`DynamicLibrary.executable`][]
或 [`DynamicLibrary.process`][] 来加载。

A dynamically linked library, by contrast, is distributed
in a separate file or folder within the app,
and loaded on-demand. On Android, a dynamically
linked library is distributed as a set of `.so` (ELF)
files, one for each architecture.

相比之下，动态链接库则分布在应用程序中的单独的文件或文件夹中，
并按需加载。在 Android 上，动态链接库作为一组
`.so`（ELF 可执行与可链接格式）文件分发，每个架构各有一个。

A dynamically linked library can be loaded into
Dart via [`DynamicLibrary.open`][].

动态链接库在 Dart 中可以通过 [`DynamicLibrary.open`][] 加载。

API documentation is available from the Dart dev channel:
[Dart API reference documentation][].

Dart dev 频道中的 API 已经可用：
[Dart API 参考文档][Dart API reference documentation].

[Dart API reference documentation]: {{site.dart.api}}/dev/
[`DynamicLibrary.executable`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dev/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

## Step 1: Create a plugin

## 步骤 1：创建插件

If you already have a plugin, skip this step.

如果你已经有一个插件，跳过这步。

To create a plugin called "native_add",
do the following:

如果要创建一个名为 "native_add" 的插件，
你需要这么做：

```terminal
$ flutter create --platforms=android,ios --template=plugin native_add
$ cd native_add
```

{{ site.alert.note }}

  You can exclude platforms from --platforms that you don't want
  to build to. However, you need to include the platform of 
  the device you are testing on.

  你可以使用 --platforms 来排除你不需要的平台。
  但是，你仍需要包含测试设备所需的平台。

{{ site.alert.end }}

## Step 2: Add C/C++ sources

## 步骤 2：添加 C/C++ 源码

You need to inform the Android build system about
the native code so the code can be compiled
and linked appropriately into the final application.

你需要让 Android 和 iOS 构建系统知道本地代码的存在，
以便代码可以被编译并链接到最终的应用程序中。

You can add Android-specific sources
to the `android` folder and modify `CMakeLists.txt`
appropriately.
Also, Gradle allows you to point to the `ios` folder,
if that helps, but it's not required to use the same
sources for both iOS and Android;

你可以将特定于 Android 的源代码添加到 `android` 文件夹
并修改 `CMakeLists.txt` 文件。
同时，你可以在 Gradle 中指向 `ios` 文件夹，这样的话就
可以为 iOS 和 Android 设定不同的资源。

The FFI library can only bind against C symbols,
so in C++ these symbols must be marked `extern C`.
You should also add attributes to indicate that the
symbols are referenced from Dart,
to prevent the linker from discarding the symbols
during link-time optimization.

FFI 库只能与 C 符号绑定，因此在 C++ 中，
这些符号添加 `extern C` 标记。
还应该添加属性来表明符号是需要被 Dart 引用的，
以防止链接器在优化链接时会丢弃符号。

On Android, you need to create a `CMakeLists.txt` file
to define how the sources should be compiled and point
Gradle to it. From the root of your project directory,
use the following instructions:

在 Android 中，你需要创建一个 `CMakeLists.txt` 
文件用来定义如何编译源文件，同时告诉 Gradle 如何去定位它们。
在项目根目录下，运行如下代码：

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

最后，添加一个 `externalNativeBuild` 到你的
`android/build.gradle` 文件中。示例如下：

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

## 步骤 3：在 FFI 库中读取代码

In this example, you can add the following code to
`lib/native_add.dart`. However the location of the
Dart binding code is not important.

在示例中，你需要添加如下的代码到 `lib/native_add.dart`。
但是，Dart 在何处进行代码绑定并不重要。

First, you must create a `DynamicLibrary` handle to
the native code. The following example shows
how to create a handle for an iOS app OR an Android app:

首先，你需要创建一个 `DynamicLibrary` 来处理本地代码。
下面的例子为你展示了如何在 iOS 和 Android 上操作：

<?code-excerpt "lib/c_interop.dart (DynamicLibrary)"?>
```dart
import 'dart:ffi'; // For FFI
import 'dart:io'; // For Platform.isX

final DynamicLibrary nativeAddLib = Platform.isAndroid
    ? DynamicLibrary.open('libnative_add.so')
    : DynamicLibrary.process();
```

Note that on Android the native library is named
in `CMakeLists.txt` (see above),
but on iOS it takes the plugin's name.

请注意，在 Android 上，
本地库的名称是定义在 `CMakeLists.txt` 中的（见上文），
但在 iOS 上，它将使用插件的名称。

With a handle to the enclosing library,
you can resolve the `native_add` symbol:

你可以通过使用库的句柄来解析 `native_add` 符号：

<?code-excerpt "lib/c_interop.dart (NativeAdd)"?>
```dart
final int Function(int x, int y) nativeAdd = nativeAddLib
    .lookup<NativeFunction<Int32 Function(Int32, Int32)>>('native_add')
    .asFunction();
```

Finally, you can call it. To demonstrate this within
the auto-generated "example" app (`example/lib/main.dart`):

现在，你可以调用它了。在自动生成的 "example" 项目
（`example/lib/main.dart`）中演示它。

```nocode
// Inside of _MyAppState.build:
        body: Center(
          child: Text('1 + 2 == ${nativeAdd(1, 2)}'),
        ),
```

## Other use cases

## 其他的用例

### Platform library

#### 平台库

To link against a platform library,
use the following instructions:

要链接到平台库，请按照如下说明：

 1. Find the desired library in the [Android NDK Native APIs][]
    list in the Android docs. This lists stable native APIs.

    在 Android 文档的 [Android NDK Native APIs][] 列表中找到所需的库。
    它列出了稳定的本地 API。

 1. Load the library using [`DynamicLibrary.open`][].
    For example, to load OpenGL ES (v3):

    使用 [`DynamicLibrary.open`][] 加载库。
    示例：加载 OpenGL ES (v3)：

    <!-- skip -->
    ```dart
    DynamicLibrary.open('libGLES_v3.so');
    ```

You might need to update the Android manifest
file of the app or plugin if indicated by
the documentation.

如果文档中有说明，
你还需要根据说明更新 Android 应用程序或插件的清单文件。

[Android NDK Native APIs]: {{site.android-dev}}/ndk/guides/stable_apis

#### First-party library

#### 第一方库

The process for including native code in source
code or binary form is the same for an app or
plugin.

对于应用程序或插件，以源代码或二进制形式包含本机代码的过程是相同的。

#### Open-source third-party

#### 开源三方库

Follow the [Add C and C++ code to your project][]
instructions in the Android docs to
add native code and support for the native
code toolchain (either CMake or `ndk-build`).

遵循 Android 文档中的
[添加 C 和 C++ 代码到项目][Add C and C++ code to your project]
来添加本地代码和对本地代码工具链的支持（CMake 或 `ndk-build`）。

[Add C and C++ code to your project]: {{site.android-dev}}/studio/projects/add-native-code

#### Closed-source third-party library

#### 闭源三方库

To create a Flutter plugin that includes Dart
source code, but distribute the C/C++ library
in binary form, use the following instructions:

要创建包含 Dart 源代码，但以二进制形式分发 C/C++ 库的 Flutter 插件，
请按照如下说明：

1. Open the `android/build.gradle` file for your
   project.

   打开你项目的 `android/build.gradle` 文件。

1. Add the AAR artifact as a dependency.
   **Don't** include the artifact in your
   Flutter package. Instead, it should be
   downloaded from a repository, such as
   JCenter.

   添加 aar 工件添加为依赖。
   **不要**在你的 Flutter package 中导入工件。
   对应的，它需要在一个仓库中下载，比如 JCenter。

## Android APK size (shared object compression)

## Android APK 尺寸（共享对象压缩）

[Android guidelines][] in general recommend
distributing native shared objects uncompressed
because that actually saves on device space.
Shared objects can be directly loaded from the APK
instead of unpacking them on device into a
temporary location and then loading.
APKs are additionally packed in transit&mdash;that's
why you should be looking at download size.

[Android 指南][Android guidelines] 通常建议分发未压缩的本地共享对象，
因为这种做法实际上可以节省设备空间。
共享对象可以直接从 APK 加载，
而不是将它们解压到设备上的临时位置然后再加载。
APK 是在传输过程中额外打包的 -
这就是为什么你应该查看下载的文件尺寸。

Flutter APKs by default don't follow these guidelines
and compress `libflutter.so` and `libapp.so`&mdash;this
leads to smaller APK size but larger on device size.

Flutter APK 文件默认情况下
不遵循这些指导原则来压缩 `libflutter.so` 和 `libapp.so`，
这会导致 APK 体积更小，但在设备上体积更大。

Shared objects from third parties can change this default
setting with `android:extractNativeLibs="true"` in their
`AndroidManifest.xml` and stop the compression of `libflutter.so`,
`libapp.so`, and any user-added shared objects.
To re-enable compression, override the setting in
`your_app_name/android/app/src/main/AndroidManifest.xml`
in the following way.

来自第三方的共享库可以使用其 `AndroidManifest.xml`
中的 `android:extractNativeLibs="true"` 更改此默认设置，
来停止压缩 `libflutter.so`、`libapp.so` 和任何用户添加的共享库。
要重新启用压缩，请按照如下方式重写你的
`your_app_name/android/app/src/main/AndroidManifest.xml` 文件。

```diff
@@ -1,5 +1,6 @@
 <manifest xmlns:android="http://schemas.android.com/apk/res/android"
-    package="com.example.your_app_name">
+    xmlns:tools="http://schemas.android.com/tools"
+    package="com.example.your_app_name" >
     <!-- io.flutter.app.FlutterApplication is an android.app.Application that
          calls FlutterMain.startInitialization(this); in its onCreate method.
          In most cases you can leave this as-is, but you if you want to provide
          additional functionality it is fine to subclass or reimplement
          FlutterApplication and put your custom class here. -->
@@ -8,7 +9,9 @@
     <application
         android:name="io.flutter.app.FlutterApplication"
         android:label="your_app_name"
-        android:icon="@mipmap/ic_launcher">
+        android:icon="@mipmap/ic_launcher"
+        android:extractNativeLibs="true"
+        tools:replace="android:extractNativeLibs">
```

[Android guidelines]: {{site.android-dev}}/topic/performance/reduce-apk-size#extract-false

