---
# title: Bind to native code using FFI
title: 使用 FFI 绑定原生代码
# description: To use native code in your Flutter program, use the dart:ffi library with the package_ffi template.
description: 若要在 Flutter 程序中使用原生代码，请使用 dart:ffi 库及 package_ffi 模板。
ai-translated: true
---

Flutter apps can use the [dart:ffi][] library to call native APIs. _FFI_ stands
for [_foreign function interface_][FFI]. Other terms for similar functionality
include _native interface_ and _language bindings._

Flutter 应用可以使用 [dart:ffi][] 库调用原生 API。_FFI_ 表示
[_foreign function interface_][FFI]（外部函数接口）。功能相近的其他说法还包括
_原生接口_ 和 _语言绑定_。

Since Flutter 3.38, the recommended way to bind to native code is to use the
`flutter create --template=package_ffi` command. This template uses
[build hooks][] to configure the native build in a
`build.dart` script, and no longer requires OS-specific build files. This
approach works for both Flutter and Dart standalone projects.

自 Flutter 3.38 起，推荐通过
`flutter create --template=package_ffi` 命令绑定原生代码。该模板使用
[build hooks][] 在
`build.dart` 脚本中配置原生构建，不再需要面向各操作系统的专用构建文件。此方式同时适用于 Flutter 与独立的 Dart 项目。

If you need to use the Flutter Plugin API, or if you need to configure a Google
Play services runtime on Android, use the standard plugin template (`flutter create
--template=plugin`).

若你需要使用 Flutter Plugin API，或在 Android 上配置 Google
Play services 运行时，请使用标准插件模板（`flutter create
--template=plugin`）。

[build hooks]: https://dart.dev/tools/hooks
[dart:ffi]: {{site.dart.api}}/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

## Create an FFI package

## 创建 FFI 包

To create an FFI package, run the following command:

要创建 FFI 包，请运行以下命令：

```console
$ flutter create --template=package_ffi native_add
$ cd native_add
```

This creates a package with the following specialized content:

这将创建一个包含以下专用内容的包：

- **`lib/native_add.dart`**: The Dart code that defines the API of the package.

  **`lib/native_add.dart`**：定义该包 API 的 Dart 代码。

- **`lib/native_add_bindings_generated.dart`**: The generated Dart bindings
  for the native code.

  **`lib/native_add_bindings_generated.dart`**：为原生代码生成的 Dart 绑定。

- **`src/native_add.c`**: The native C source code.

  **`src/native_add.c`**：原生 C 源代码。

- **`src/native_add.h`**: The C header file for the native code.

  **`src/native_add.h`**：原生代码的 C 头文件。

- **`hook/build.dart`**: A script that is run by the Flutter SDK to compile the
  native code.

  **`hook/build.dart`**：由 Flutter SDK 运行以编译原生代码的脚本。

- **`ffigen.yaml`**: The configuration file for [`package:ffigen`][] to generate
  the Dart bindings.

  **`ffigen.yaml`**：供 [`package:ffigen`][] 生成 Dart 绑定的配置文件。

- **`pubspec.yaml`**: The package definition, which enables the `build.dart`
  hook.

  **`pubspec.yaml`**：包定义文件，用于启用 `build.dart` hook。

[`package:ffigen`]: {{site.pub-pkg}}/ffigen

## The native code

## 原生代码

The native code is located in `src/native_add.c` and `src/native_add.h`. The C
function `sum` is defined in the `.c` file and its signature is in the header
file. The function is marked to be exported so that it can be called from Dart.

原生代码位于 `src/native_add.c` 与 `src/native_add.h`。C 函数 `sum` 定义在 `.c` 文件中，其签名在头文件中。该函数被标记为导出，以便从 Dart 调用。

## The build hook

## 构建 hook

The native code is compiled and bundled with your app automatically. This is
done by the `hook/build.dart` script, which is a [build hook][build hooks].

原生代码会自动编译并打包进你的应用。这由 `hook/build.dart` 脚本完成，它是一个 [build hook][build hooks]。

This means you no longer need to write OS-specific build files (like
`CMakeLists.txt` for Linux/Windows, `.podspec` for iOS/macOS, or `build.gradle`
for Android) to compile your native code.

这意味着你不再需要编写面向各操作系统的构建文件（例如 Linux/Windows 的 `CMakeLists.txt`、iOS/macOS 的 `.podspec`，或 Android 的 `build.gradle`）来编译原生代码。

The build hook uses `package:native_toolchain_c` to compile the C code into a
dynamic library. You can customize this file to build other native languages or
to download pre-compiled binaries.

构建 hook 使用 `package:native_toolchain_c` 将 C 代码编译为动态库。你可以自定义该文件以构建其他原生语言，或下载预编译二进制文件。

## The Dart code

## Dart 代码

The Dart code defines the public API of the package.

Dart 代码定义该包的公共 API。

### Generating the bindings

### 生成绑定

To bind to the native code, the template uses [`package:ffigen`][] to generate
bindings from the header file (`src/native_add.h`). The generation is configured
in `ffigen.yaml`.

要绑定原生代码，模板使用 [`package:ffigen`][] 从头文件（`src/native_add.h`）生成绑定。生成配置在 `ffigen.yaml` 中。

This generates `lib/native_add_bindings_generated.dart`.

这将生成 `lib/native_add_bindings_generated.dart`。

### Calling the native function

### 调用原生函数

The generated bindings in `lib/native_add_bindings_generated.dart` contain
`@Native() external` functions. These functions are automatically resolved at
runtime against the code asset outputted by the build hook (which runs at build
time). This means there is no OS-specific logic required for `dlopen`-ing the
dynamic libraries, making the Dart code truly cross-platform.

`lib/native_add_bindings_generated.dart` 中的生成绑定包含
`@Native() external` 函数。这些函数在运行时自动解析为构建 hook（在构建时运行）输出的 code asset。这意味着无需为 `dlopen` 动态库编写面向各操作系统的逻辑，使 Dart 代码真正跨平台。

The main library file `lib/native_add.dart` exposes these functions. Your app
can then call these functions by importing `package:native_add/native_add.dart`.

主库文件 `lib/native_add.dart` 对外暴露这些函数。你的应用随后可通过导入 `package:native_add/native_add.dart` 调用它们。

## Testing

## 测试

The generated package includes a unit test in `test/native_add_test.dart` that
shows how to test the native function.

生成的包在 `test/native_add_test.dart` 中包含单元测试，演示如何测试原生函数。

## Other use cases

## 其他用例

### System libraries

### 系统库

To link against a system library, you modify the `build.dart` hook to specify
the linking mode. Instead of compiling source code, you create a `CodeAsset` and
set its `linkMode`.

要链接系统库，请修改 `build.dart` hook 以指定链接模式。不再编译源代码，而是创建 `CodeAsset` 并设置其 `linkMode`。

For many system libraries on Android, iOS, Linux, and macOS, you can use
`LookupInProcess()` to find symbols in the main process.

在 Android、iOS、Linux 和 macOS 上，对许多系统库可使用
`LookupInProcess()` 在主进程中查找符号。

For Windows, you often use `DynamicLoadingSystem()` and provide the name of the
DLL.

在 Windows 上，通常使用 `DynamicLoadingSystem()` 并提供
DLL 名称。

Here is an example `build.dart` that links against system libraries to get the
host name:

以下是一个链接系统库以获取主机名的 `build.dart` 示例：

```dart
// hook/build.dart
import 'package:hooks/hooks.dart';
import 'package:code_assets/code_assets.dart';

void main(List<String> args) async {
  await build(args, (input, output) async {
    final targetOS = input.target.os;
    switch (targetOS) {
      case OS.android || OS.iOS || OS.linux || OS.macOS:
        output.assets.code.add(
          CodeAsset(
            package: 'host_name',
            name: 'src/third_party/unix.dart',
            linkMode: LookupInProcess(),
          ),
        );
      case OS.windows:
        output.assets.code.add(
          CodeAsset(
            package: 'host_name',
            name: 'src/third_party/windows.dart',
            linkMode: DynamicLoadingSystem(Uri.file('ws2_32.dll')),
          ),
        );
      default:
        throw Exception('Unsupported target os: $targetOS');
    }
  });
}
```

The Dart files (`unix.dart`, `windows.dart`) would then contain the `external`
functions that use the symbols from these system libraries.

随后 Dart 文件（`unix.dart`、`windows.dart`）将包含使用这些系统库符号的 `external` 函数。

#### Bundling `libc++_shared.so` on Android

#### 在 Android 上打包 `libc++_shared.so`

Although `libc++_shared.so` ships with the Android NDK,
it isn't a system library.
If your app or package uses the [C++ standard library][libcpp-support],
or includes [multiple shared libraries][shared-libraries] that depend on it,
your app needs to bundle `libc++_shared.so`.

尽管 `libc++_shared.so` 随 Android NDK 提供，
它并非系统库。
若你的应用或包使用 [C++ 标准库][libcpp-support]，
或包含依赖它的 [多个共享库][shared-libraries]，
你的应用需要打包 `libc++_shared.so`。

To bundle the library in your app,
add a dependency on [`package:android_libcpp_shared`][libcpp-shared],
which uses its own build hook to bundle `libc++_shared.so`
from the locally installed NDK for each target architecture.

要在应用中打包该库，
请添加对 [`package:android_libcpp_shared`][libcpp-shared] 的依赖；
该包使用自己的 build hook，从本地安装的 NDK 为各目标架构打包 `libc++_shared.so`。

[libcpp-support]: {{site.android-dev}}/ndk/guides/cpp-support#cs
[shared-libraries]: {{site.android-dev}}/ndk/guides/cpp-support#shared_runtimes
[libcpp-shared]: {{site.pub}}/packages/android_libcpp_shared

### Closed-source libraries

### 闭源库

You can also use build hooks to link against pre-compiled, closed-source
libraries. The recommended approach is to download the pre-compiled binaries at
build time and verify their integrity with a file hash.

你也可以使用 build hook 链接预编译的闭源库。推荐做法是在构建时下载预编译二进制文件，并通过文件哈希校验其完整性。

In your `build.dart` hook, you would:
1.  Download the library from a URL.
2.  Verify the hash of the downloaded file.
3.  Place the library in the build output directory.
4.  Create a `CodeAsset` with `DynamicLoading` pointing to the library.

在 `build.dart` hook 中，你需要：
1.  从 URL 下载库。
2.  校验已下载文件的哈希。
3.  将库放入构建输出目录。
4.  创建指向该库的 `DynamicLoading` 的 `CodeAsset`。

Here is a simplified example of the `CodeAsset` creation:

以下是创建 `CodeAsset` 的简化示例：

```dart
// hook/build.dart
import 'package:hooks/hooks.dart';
import 'package:code_assets/code_assets.dart';

void main(List<String> args) async {
  await build(args, (input, output) async {
    // 1. Download the library from a URL.
    // 2. Verify the hash of the downloaded file.
    // 3. Place the library in the build output directory.
    
    output.assets.code.add(
      CodeAsset(
        package: input.packageName,
        name: 'src/my_lib.dart', // Dart file with bindings
        linkMode: DynamicLoadingBundled(),
        file: input.outputDirectory.resolve('my_lib.so'),
      ),
    );
  });
}
```
You would need to handle different architectures and platforms by having
different versions of your pre-compiled library.

你需要为不同架构和平台准备不同版本的预编译库。

For more examples, see the [code_assets package
examples](https://pub.dev/packages/code_assets/example).

更多示例请参阅 [code_assets 包示例](https://pub.dev/packages/code_assets/example)。

## Dynamic library naming guidelines

## 动态库命名指南

When implementing `build.dart` hooks for packages that bundle code assets, it
is critical to ensure consistent naming of your dynamic libraries across all
target architectures and SDKs.

为打包 code asset 的包实现 `build.dart` hook 时，
务必在所有目标架构和 SDK 上为动态库保持一致的命名。

On Apple platforms (iOS and macOS), dynamic libraries are bundled into
frameworks. Flutter's build system relies on these names to generate metadata
and package distributable formats like XCFrameworks.

在 Apple 平台（iOS 和 macOS）上，动态库被打包进
framework。Flutter 的构建系统依赖这些名称生成元数据，
并打包 XCFrameworks 等可分发格式。

### Consistency across architectures

### 跨架构一致性

For a given asset ID, your hook will be invoked multiple times, once per
architecture. Your hook must produce the same filename regardless of the target
architecture (for example, `arm64` vs. `x64`).

对于给定的 asset ID，你的 hook 会被多次调用，每个架构一次。无论目标架构如何（例如 `arm64` 与 `x64`），hook 必须生成相同的文件名。

*   **Why?** Within a single SDK build, Flutter combines architecture-specific
    binaries into a single universal (fat) binary using `lipo`. If architectures
    have different filenames, the tool will pick one non-deterministically and
    issue a warning. Furthermore, error messages at runtime will be confusing
    for your users if dynamic libraries are renamed.

    **原因？** 在单次 SDK 构建中，Flutter 使用 `lipo` 将各架构的二进制合并为单个通用（fat）二进制。若各架构文件名不同，工具会非确定性地选取其一并发出警告。此外，若动态库被重命名，运行时错误信息会让用户困惑。

*   **Recommended action**: Avoid adding architecture suffixes to your
    filenames (for example, use `libsqlite3.dylib` instead of
    `libsqlite3_arm64.dylib`). Instead, write the file to
    `input.outputDirectory` (which is unique per architecture) or to an
    architecture-specific subdirectory of `input.outputDirectoryShared` (for
    example, `input.outputDirectoryShared.resolve('$architecture/')`).

    **建议做法**：避免在文件名中添加架构后缀（例如使用 `libsqlite3.dylib` 而非 `libsqlite3_arm64.dylib`）。改为将文件写入 `input.outputDirectory`（每个架构唯一），或写入 `input.outputDirectoryShared` 下按架构划分的子目录（例如 `input.outputDirectoryShared.resolve('$architecture/')`）。

### Consistency across SDKs (iOS)

### 跨 SDK 一致性（iOS）

When building for iOS, your hook will be invoked multiple times with different
values for the SDK and architecture. Both physical device (`iphoneos`) and
simulator (`iphonesimulator`) invocations must produce the same framework name
for the same asset ID.

为 iOS 构建时，你的 hook 会针对不同的 SDK 和架构被多次调用。真机（`iphoneos`）与模拟器（`iphonesimulator`）的调用必须为同一 asset ID 生成相同的 framework 名称。

*   **Why?** Flutter uses `xcodebuild -create-xcframework` to combine these
    outputs. Xcode requires that all platform slices within an XCFramework
    share the same framework name to allow seamless linking. If filenames
    differ, the Flutter tool cannot create a correct XCFramework, and commands
    like `flutter build ios-framework` will fail.

    **原因？** Flutter 使用 `xcodebuild -create-xcframework` 合并这些输出。Xcode 要求 XCFramework 内所有平台 slice 共享同一 framework 名称以实现无缝链接。若文件名不同，Flutter 工具无法创建正确的 XCFramework，`flutter build ios-framework` 等命令会失败。

*   **Recommended action**: Do not use suffixes like `_sim` or `_simulator` for
    the simulator build. The XCFramework structure already handles the platform
    separation internally (for example,
    `MyLib.xcframework/ios-arm64_x86_64-simulator/MyLib.framework`). Instead,
    write the file to `input.outputDirectory` (which is unique per SDK) or to an
    SDK-specific subdirectory of `input.outputDirectoryShared`.

    **建议做法**：模拟器构建不要使用 `_sim` 或 `_simulator` 等后缀。XCFramework 结构已在内部处理平台分离（例如 `MyLib.xcframework/ios-arm64_x86_64-simulator/MyLib.framework`）。改为将文件写入 `input.outputDirectory`（每个 SDK 唯一），或写入 `input.outputDirectoryShared` 下按 SDK 划分的子目录。

### Consistency in the set of assets

### asset 集合的一致性

Your hook must produce the same set of Asset IDs across all SDKs for a given
target platform.

对于给定目标平台，你的 hook 必须在所有 SDK 上生成相同的 Asset ID 集合。

*   **Why?** Apple's build system and App Store validation require that all
    frameworks included in an application are compatible with the target
    device. If you produce an asset for the simulator (`iphonesimulator`) but
    not for the physical device (`iphoneos`), the resulting XCFramework will
    contain a slice that has no counterpart for the device. This can lead to
    build failures or Apple rejecting the application for including
    simulator-only binaries in a device build.

    **原因？** Apple 的构建系统与 App Store 校验要求应用内所有 framework 与目标设备兼容。若你为模拟器（`iphonesimulator`）生成 asset 但未为真机（`iphoneos`）生成，得到的 XCFramework 会包含在设备上无对应项的 slice。这可能导致构建失败，或 Apple 因设备构建包含仅模拟器二进制而拒绝应用。

*   **Recommended action**: Ensure that your `build.dart` hook logic handles
    all supported SDKs consistently. If you produce an asset for one SDK, you
    must produce a corresponding asset for all other SDKs for that platform.
    For SDK-specific code, you can use stub implementations for other SDKs.

    **建议做法**：确保 `build.dart` hook 逻辑一致处理所有受支持的 SDK。若为一个 SDK 生成 asset，必须为该平台所有其他 SDK 生成对应 asset。对于 SDK 专用代码，可为其他 SDK 使用桩实现。
