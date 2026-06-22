---
# title: Build Linux apps with Flutter
title: 使用 Flutter 构建 Linux 应用
# description: Platform-specific considerations when building for Linux with Flutter.
description: 使用 Flutter 为 Linux 构建应用时的平台相关注意事项。
# shortTitle: Linux development
shortTitle: Linux 开发
ai-translated: true
---

This page discusses considerations unique to building
Linux apps with Flutter, including shell integration
and preparation of apps for distribution.

本页讨论使用 Flutter 构建 Linux 应用时的特有注意事项，
包括 shell 集成以及为分发做准备。

## Integrate with Linux

## 与 Linux 集成

The Linux programming interface,
comprising library functions and system calls,
is designed around the C language and ABI.
Fortunately, Dart provides the `dart:ffi` package,
which enables Dart programs to call into C libraries.

Linux 编程接口由库函数和系统调用组成，围绕 C 语言与 ABI 设计。
幸运的是，Dart 提供了 `dart:ffi` package，使 Dart 程序能够调用 C 库。

Foreign Function Interfaces (FFI) allow Flutter apps to perform the
following with native libraries:

外部函数接口 (FFI) 允许 Flutter 应用通过原生库执行以下操作：

* allocate native memory with `malloc` or `calloc`

  使用 `malloc` 或 `calloc` 分配原生内存

* support pointers, structs, and callbacks

  支持指针、结构体与回调

* support Application Binary Interface (ABI) types like `long` and `size_t`

  支持 `long`、`size_t` 等应用程序二进制接口 (ABI) 类型

To learn more about calling C libraries from Flutter,
consult [C interop using `dart:ffi`][].
To bundle and bind your own native C or C++ code with your app,
see [Bind to native code using FFI][].

要了解如何从 Flutter 调用 C 库，请参阅 [使用 `dart:ffi` 的 C 互操作][C interop using `dart:ffi`]。
要了解如何将你自己的原生 C 或 C++ 代码与应用打包并绑定，请参阅 [使用 FFI 绑定到原生代码][Bind to native code using FFI]。

Many apps benefit from using a package that wraps the underlying library
calls in a more convenient, idiomatic Dart API.
[Canonical has built a series of packages][Canonical]
with a focus on enabling Dart and Flutter on Linux,
including support for desktop notifications,
dbus, network management, and Bluetooth.

许多应用受益于使用将底层库调用封装为更便捷、符合 Dart 习惯的 API 的 package。
[Canonical 构建了一系列 package][Canonical]，专注于在 Linux 上启用 Dart 与 Flutter，
包括对桌面通知、dbus、网络管理和 Bluetooth 的支持。

In general, many other [packages support creating Linux apps][support-linux],
including common packages such as [`url_launcher`],
[`shared_preferences`], [`file_selector`], and [`path_provider`].

一般而言，还有许多其他[支持创建 Linux 应用的 package][support-linux]，
包括 [`url_launcher`]、[`shared_preferences`]、[`file_selector`] 和 [`path_provider`] 等常用 package。

[C interop using `dart:ffi`]: {{site.dart-site}}/guides/libraries/c-interop
[Bind to native code using FFI]: /platform-integration/bind-native-code
[Canonical]: {{site.pub}}/publishers/canonical.com/packages
[support-linux]: {{site.pub}}/packages?q=platform%3Alinux
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[`file_selector`]: {{site.pub-pkg}}/file_selector
[`path_provider`]: {{site.pub-pkg}}/path_provider

## Prepare Linux apps for distribution

## 为 Linux 应用分发做准备

The executable binary can be found in your project under
`build/linux/x64/<build mode>/bundle/`.
Alongside your executable binary in the `bundle` directory,
you can find two directories:

可执行二进制文件位于项目的 `build/linux/x64/<build mode>/bundle/` 下。
在 `bundle` 目录中，可执行文件旁还有两个目录：

* `lib` contains the required `.so` library files

  `lib` 包含所需的 `.so` 库文件

* `data` contains the application's data assets, such as fonts or images

  `data` 包含应用的数据资源，例如字体或图片

In addition to these files, your application also relies on various
operating system libraries against which it's been compiled.
To see the full list of libraries,
use the `ldd` command on your application's directory.

除这些文件外，应用还依赖编译时链接的各类操作系统库。
要查看完整库列表，请对应用目录运行 `ldd` 命令。

For example, to create a new Flutter desktop application called
`linux_desktop_test`, build it, and inspect its system library dependencies,
run the following commands:

例如，要创建名为 `linux_desktop_test` 的新 Flutter 桌面应用、构建它并检查其系统库依赖，
请运行以下命令：

```console
$ flutter create linux_desktop_test
$ cd linux_desktop_test
$ flutter build linux --release
$ ldd build/linux/x64/release/bundle/linux_desktop_test
```

To wrap up this application for distribution,
include everything in the `bundle` directory
and verify the target Linux system has all required system libraries.

要打包该应用以便分发，请包含 `bundle` 目录中的全部内容，
并确认目标 Linux 系统已安装所有必需的系统库。

This might only require using the following command.

可能只需使用以下命令：

```console
$ sudo apt-get install libgtk-3-0 libblkid1 liblzma5
```

To learn how to publish a Linux application to the [Snap Store],
consult [Build and release a Linux application to the Snap Store][].

要了解如何将 Linux 应用发布到 [Snap Store]，
请参阅[构建并将 Linux 应用发布到 Snap Store][Build and release a Linux application to the Snap Store]。

## Additional resources

## 其他资源

To learn how to create Linux Debian (`.deb`) and RPM (`.rpm`)
builds of your Flutter desktop app,
consult the step-by-step [Linux packaging guide][linux_packaging_guide].

要了解如何为 Flutter 桌面应用创建 Linux Debian（`.deb`）与 RPM（`.rpm`）构建，
请参阅分步 [Linux 打包指南][linux_packaging_guide]。

[Snap Store]: https://snapcraft.io/store
[Build and release a Linux application to the Snap Store]: /deployment/linux
[linux_packaging_guide]: https://medium.com/@fluttergems/packaging-and-distributing-flutter-desktop-apps-the-missing-guide-part-3-linux-24ef8d30a5b4
