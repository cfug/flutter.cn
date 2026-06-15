---
# title: Building Windows apps with Flutter
title: 使用 Flutter 构建 Windows 应用
# description: Platform-specific considerations for building for Windows with Flutter.
description: 使用 Flutter 为 Windows 构建应用时的平台相关注意事项。
# shortTitle: Windows development
shortTitle: Windows 开发
ai-translated: true
---

This page discusses considerations unique to building
Windows apps with Flutter, including shell integration
and distribution of Windows apps through the
Microsoft Store on Windows.

本页讨论使用 Flutter 构建 Windows 应用时的特有注意事项，
包括 shell 集成以及通过 Windows 上的 Microsoft Store 分发应用。

## Integrating with Windows

## 与 Windows 集成

The Windows programming interface combines traditional Win32 APIs,
COM interfaces and more modern Windows Runtime libraries.
As all these provide a C-based ABI,
you can call into the services provided by the operating
system using Dart's Foreign Function Interface library (`dart:ffi`).
FFI is designed to enable Dart programs to efficiently call into
C libraries. It provides Flutter apps with the ability to allocate
native memory with `malloc` or `calloc`, support for pointers,
structs and callbacks, and ABI types like `long` and `size_t`.

Windows 编程接口结合了传统 Win32 API、COM 接口以及更现代的 Windows Runtime 库。
由于它们均提供基于 C 的 ABI，你可以使用 Dart 的外部函数接口库（`dart:ffi`）调用操作系统提供的服务。
FFI 旨在使 Dart 程序高效调用 C 库，
为 Flutter 应用提供使用 `malloc` 或 `calloc` 分配原生内存、支持指针/结构体/回调，
以及 `long`、`size_t` 等 ABI 类型的能力。

For more information about calling C libraries from Flutter,
see [C interop using `dart:ffi`].

有关从 Flutter 调用 C 库的更多信息，请参阅 [使用 `dart:ffi` 的 C 互操作][C interop using `dart:ffi`]。

In practice, while it is relatively straightforward to call
basic Win32 APIs from Dart in this way,
it is easier to use a wrapper library that abstracts the
intricacies of the COM programming model.
The [win32 package] provides a library
for accessing thousands of common Windows APIs,
using metadata provided by Microsoft for consistency and correctness.
The package also includes examples of
a variety of common use cases,
such as WMI, disk management, shell integration,
and system dialogs.

实践中，虽然以这种方式从 Dart 调用基本 Win32 API 相对直接，
但使用封装 COM 编程模型复杂细节的包装库会更简单。
[win32 package] 提供可访问数千种常用 Windows API 的库，
并使用 Microsoft 提供的元数据以确保一致性与正确性。
该 package 还包含多种常见用例示例，
例如 WMI、磁盘管理、shell 集成和系统对话框。

A number of other packages build on this foundation,
providing idiomatic Dart access for the [Windows registry],
[gamepad support], [biometric storage],
[taskbar integration], and [serial port access], to name a few.

许多其他 package 在此基础上构建，
为 [Windows registry]、[gamepad support]、[biometric storage]、[taskbar integration]、[serial port access] 
等提供符合 Dart 习惯的访问方式。

More generally, many other [packages support Windows],
including common packages such as [`url_launcher`], [`shared_preferences`], [`file_selector`], and [`path_provider`].

更一般地，还有许多其他 [支持 Windows 的 package][packages support Windows]，
包括 [`url_launcher`]、[`shared_preferences`]、[`file_selector`] 和 [`path_provider`] 等常用 package。

[C interop using `dart:ffi`]: {{site.dart-site}}/guides/libraries/c-interop
[win32 package]: {{site.pub}}/packages/win32
[Windows registry]: {{site.pub}}/packages/win32_registry
[gamepad support]: {{site.pub}}/packages/win32_gamepad
[biometric storage]: {{site.pub}}/packages/biometric_storage
[taskbar integration]: {{site.pub-pkg}}/windows_taskbar
[serial port access]: {{site.pub}}/packages/serial_port_win32
[packages support Windows]: {{site.pub}}/packages?q=platform%3Awindows
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[`file_selector`]: {{site.pub-pkg}}/file_selector
[`path_provider`]: {{site.pub-pkg}}/path_provider

## Supporting Windows UI guidelines

## 遵循 Windows UI 指南

While you can use any visual style or theme you choose,
including Material, some app authors might wish to build
an app that matches the conventions of Microsoft's
[Fluent design system][]. The [fluent_ui][] package,
a [Flutter Favorite][], provides support for visuals
and common controls that are commonly found in
modern Windows apps, including navigation views,
content dialogs, flyouts, date
pickers, and tree view widgets.

你可以使用包括 Material 在内的任意视觉风格或主题；
部分应用作者可能希望构建符合 Microsoft [Fluent design system][] 惯例的应用。
[fluent_ui][] 包（[Flutter Favorite][]）为现代 Windows 应用中常见的视觉与控件提供支持，
包括导航视图、内容对话框、浮出层、日期选择器和树形视图 widget。

In addition, Microsoft offers [fluentui_system_icons][],
a package that provides easy access to thousands of
Fluent icons for use in your Flutter app.

此外，Microsoft 提供 [fluentui_system_icons][]，
可方便地在 Flutter 应用中使用数千个 Fluent 图标。

Lastly, the [bitsdojo_window][] package provides support
for "owner draw" title bars, allowing you to replace
the standard Windows title bar with a custom one
that matches the rest of your app.

最后，[bitsdojo_window][] 包支持“自绘”标题栏，
让你用与应用其余部分匹配的自定义标题栏替换标准 Windows 标题栏。

[Fluent design system]: https://docs.microsoft.com/en-us/windows/apps/design/
[fluent_ui]: {{site.pub}}/packages/fluent_ui
[Flutter Favorite]: /packages-and-plugins/favorites
[fluentui_system_icons]: {{site.pub}}/packages/fluentui_system_icons
[bitsdojo_window]: {{site.pub}}/packages/bitsdojo_window

## Customizing the Windows host application

## 自定义 Windows 宿主应用

When you create a Windows app, Flutter generates a
small C++ application that hosts Flutter.
This "runner app" is responsible for creating and sizing a
traditional Win32 window, initializing the Flutter
engine and any native plugins,
and running the Windows message loop
(passing relevant messages on to Flutter for further processing).

创建 Windows 应用时，Flutter 会生成承载 Flutter 的小型 C++ 应用。
该“runner 应用”负责创建并调整传统 Win32 窗口大小、初始化 Flutter 引擎与任何原生插件，
以及运行 Windows 消息循环（将相关消息传递给 Flutter 进一步处理）。

You can, of course, make changes to this code to suit your needs,
including modifying the app name and icon,
and setting the window's initial size and location.
The relevant code is in main.cpp,
where you will find code similar to the following:

当然，你可以根据需要修改此代码，包括更改应用名称与图标，以及设置窗口的初始大小与位置。
相关代码在 main.cpp 中，类似如下：

```cpp
Win32Window::Point origin(10, 10);
Win32Window::Size size(1280, 720);
if (!window.CreateAndShow(L"myapp", origin, size))
{
    return EXIT_FAILURE;
}
```

Replace `myapp` with the title you would like displayed in the
Windows caption bar, as well as optionally adjusting the
dimensions for size and the window coordinates.

将 `myapp` 替换为你希望在 Windows 标题栏中显示的标题，并可选择调整 size 的尺寸与窗口坐标。

To change the Windows application icon, replace the
`app_icon.ico` file in the `windows\runner\resources`
directory with an icon of your preference.

要更改 Windows 应用图标，请将 `windows\runner\resources` 目录中的 `app_icon.ico` 替换为你偏好的图标。

The generated Windows executable filename can be changed
by editing the `BINARY_NAME` variable in `windows/CMakeLists.txt`:

可通过编辑 `windows/CMakeLists.txt` 中的 `BINARY_NAME` 变量更改生成的 Windows 可执行文件名：

```cmake
cmake_minimum_required(VERSION 3.14)
project(windows_desktop_app LANGUAGES CXX)

# The name of the executable created for the application.
# Change this to change the on-disk name of your application.
set(BINARY_NAME "YourNewApp")

cmake_policy(SET CMP0063 NEW)
```

When you run `flutter build windows`,
the executable file generated in the
`build\windows\runner\Release` directory
will match the newly given name.

运行 `flutter build windows` 时，
`build\windows\runner\Release` 目录中生成的可执行文件将使用新名称。

Finally, further properties for the app executable
itself can be found in the `Runner.rc` file in the
`windows\runner` directory. Here you can change the
copyright information and application version that
is embedded in the Windows app, which is displayed
in the Windows Explorer properties dialog box.
To change the version number, edit the `VERSION_AS_NUMBER`
and `VERSION_AS_STRING` properties;
other information can be edited in the `StringFileInfo` block.

最后，应用可执行文件的更多属性位于 `windows\runner` 目录的 `Runner.rc` 文件中。
你可以在此更改嵌入 Windows 应用、并在 Windows 资源管理器属性对话框中显示的版权信息与应用版本。
要更改版本号，请编辑 `VERSION_AS_NUMBER` 与 `VERSION_AS_STRING` 属性；其他信息可在 `StringFileInfo` 块中编辑。

## Compiling with Visual Studio

## 使用 Visual Studio 编译

For most apps, it's sufficient to allow Flutter to
handle the compilation process using the `flutter run`
and `flutter build` commands. If you are making significant
changes to the runner app or integrating Flutter into an existing app,
you might want to load or compile the Flutter app in Visual Studio itself.

对大多数应用，使用 `flutter run` 与 `flutter build` 让 Flutter 处理编译即可。
若你对 runner 应用做了重大修改或将 Flutter 集成到现有应用中，
可能希望在 Visual Studio 中直接加载或编译 Flutter 应用。

Follow these steps:

请按以下步骤操作：

1. Run `flutter build windows` to create the `build\` directory.

   运行 `flutter build windows` 以创建 `build\` 目录。

1. Open the Visual Studio solution file for the Windows runner,
   which can now be found in the `build\windows` directory,
   named according to the parent Flutter app.

   打开 Windows runner 的 Visual Studio 解决方案文件；
   它现在位于 `build\windows` 目录中，名称与父 Flutter 应用一致。

1. In Solution Explorer, you will see a number of projects.
   Right-click the one that has the same name as the Flutter app,
   and choose **Set as Startup Project**.

   在解决方案资源管理器中你会看到多个项目。
   右键单击与 Flutter 应用同名的项目，
   选择 **Set as Startup Project**。

1. To generate the necessary dependencies,
   run **Build** > **Build Solution**

   要生成必要依赖，请运行 **Build** > **Build Solution**

   You can also press/
   <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>.

   你也可以使用快捷键：<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>。

   To run the Windows app from Visual Studio, go to **Debug** > **Start Debugging**.

   要从 Visual Studio 运行 Windows 应用，
   请转到 **Debug** > **Start Debugging**。

   You can also press <kbd>F5</kbd>.

   你也可以使用快捷键：<kbd>F5</kbd>。

1. Use the toolbar to switch between Debug and Release
   configurations as appropriate.

   使用工具栏在 Debug 与 Release 配置之间切换。

## Distributing Windows apps

## 分发 Windows 应用

There are various approaches you can use for
distributing your Windows application.
Here are some options:

分发 Windows 应用有多种方式，例如：

* Use tooling to construct an MSIX installer
  (described in the next section)
  for your application and distribute it through
  the Microsoft Windows App Store.
  You don't need to manually create a signing
  certificate for this option as it is
  handled for you.

  使用工具为你的应用构建 MSIX 安装程序（见下一节），
  并通过 Microsoft Windows 应用商店分发。
  此方式无需手动创建签名证书，由平台代为处理。

* Construct an MSIX installer and distribute
  it through your own website. For this
  option, you need to give your application a
  digital signature in the form of a
  `.pfx` certificate.

  构建 MSIX 安装程序并通过你自己的网站分发。
  此方式需要以 `.pfx` 证书形式为应用提供数字签名。

* Collect all of the necessary pieces
  and build your own zip file.

  收集所有必要文件并自行打包 zip。

### MSIX packaging

### MSIX 打包

[MSIX][], the new Windows application package format,
provides a modern packaging format and installer.
This format can either be used to ship applications
to the Microsoft Store on Windows, or you can
distribute app installers directly.

[MSIX][] 是新的 Windows 应用包格式，提供现代打包格式与安装程序。
该格式可用于将应用发布到 Windows 上的 Microsoft Store，也可直接分发安装程序。

The easiest way to create an MSIX distribution
for a Flutter project is to use the
[`msix` pub package][msix package].
For an example of using the `msix` package
from a Flutter desktop app,
see the [Desktop Photo Search][] sample.

为 Flutter 项目创建 MSIX 分发包的最简单方式是使用 [`msix` pub package][msix package]。
有关在 Flutter 桌面应用中使用 `msix` 包的示例，请参阅 [Desktop Photo Search][] 示例。

[MSIX]: https://docs.microsoft.com/en-us/windows/msix/overview
[msix package]: {{site.pub}}/packages/msix
[Desktop Photo Search]: {{site.repo.samples}}/tree/main/desktop_photo_search

#### Create a self-signed .pfx certificate for local testing

#### 创建用于本地测试的自签名 .pfx 证书

For private deployment and testing with the help
of the MSIX installer, you need to give your application a
digital signature in the form of a `.pfx` certificate.

借助 MSIX 安装程序进行私有部署与测试时，你需要以 `.pfx` 证书形式为应用提供数字签名。

For deployment through the Windows Store,
generating a `.pfx` certificate is not required.
The Windows Store handles creation and management
of certificates for applications
distributed through its store.

通过 Windows Store 部署时无需生成 `.pfx` 证书；
商店会处理通过其商店分发的应用的证书创建与管理。

Distributing your application by self hosting it on a
website requires a certificate signed by a
Certificate Authority known to Windows.

若通过自建网站分发应用，则需要由 Windows 认可的证书颁发机构签名的证书。

Use the following instructions to generate a
self-signed `.pfx` certificate.

使用以下说明生成自签名 `.pfx` 证书。

1. If you haven't already, download the [OpenSSL][]
   toolkit to generate your certificates.

   若尚未下载，请下载 [OpenSSL][] 工具包以生成证书。

1. Go to where you installed OpenSSL, for example,
   `C:\Program Files\OpenSSL-Win64\bin`.

   进入 OpenSSL 安装目录，例如 `C:\Program Files\OpenSSL-Win64\bin`。

1. Set an environment variable so that you can access
   `OpenSSL` from anywhere:<br>
   `"C:\Program Files\OpenSSL-Win64\bin"`

   设置环境变量以便从任意位置访问 `OpenSSL`：<br>
   `"C:\Program Files\OpenSSL-Win64\bin"`

1. Generate a private key as follows:<br>
   `openssl genrsa -out mykeyname.key 2048`

   按如下方式生成私钥：<br>
   `openssl genrsa -out mykeyname.key 2048`

1. Generate a certificate signing request (CSR)
   file using the private key:<br>
   `openssl req -new -key mykeyname.key -out mycsrname.csr`

   使用私钥生成证书签名请求 (CSR) 文件：<br>
   `openssl req -new -key mykeyname.key -out mycsrname.csr`

1. Generate the signed certificate (CRT) file using
   the private key and CSR file:<br>
   `openssl x509 -in mycsrname.csr -out mycrtname.crt -req -signkey mykeyname.key -days 10000`

   使用私钥与 CSR 文件生成已签名证书 (CRT) 文件：<br>
   `openssl x509 -in mycsrname.csr -out mycrtname.crt -req -signkey mykeyname.key -days 10000`

1. Generate the `.pfx` file using the private key and
   CRT file:<br>
   `openssl pkcs12 -export -out CERTIFICATE.pfx -inkey mykeyname.key -in mycrtname.crt`

   使用私钥与 CRT 文件生成 `.pfx` 文件：<br>
   `openssl pkcs12 -export -out CERTIFICATE.pfx -inkey mykeyname.key -in mycrtname.crt`

1. Install the `.pfx` certificate first on the local machine
   in `Certificate store` as
   `Trusted Root Certification Authorities`
   before installing the app.

   在安装应用前，请先将 `.pfx` 证书安装到本地计算机的 `Certificate store`（证书存储），
   作为 `Trusted Root Certification Authorities`（受信任的根证书颁发机构）。

[OpenSSL]: https://slproweb.com/products/Win32OpenSSL.html

### Building your own zip file for Windows

### 为 Windows 自行构建 zip 文件

The Flutter executable, `.exe`, can be found in your
project under `build\windows\runner\<build mode>\`.
In addition to that executable, you need the following:

Flutter 可执行文件 `.exe` 位于项目的 `build\windows\runner\<build mode>\` 下。
除该可执行文件外，你还需要：

* From the same directory:

  同一目录中：

  * all the `.dll` files

    所有 `.dll` 文件

  * the `data` directory

    `data` 目录

* The Visual C++ redistributables.
  You can use any of the methods shown in the
  [deployment example walkthroughs][] on the Microsoft site
  to ensure that end users have the C++ redistributables.
  If you use the `application-local` option, you need to copy:

  Visual C++ 可再发行组件。
  可使用 Microsoft 站点上的 [部署示例演练][deployment example walkthroughs] 中的任一方法，
  确保最终用户拥有 C++ 可再发行组件。
  若使用 `application-local` 选项，需要复制：

  * `msvcp140.dll`
  * `vcruntime140.dll`
  * `vcruntime140_1.dll`

  Place the DLL files in the directory next to the executable
  and the other DLLs, and bundle them together in a zip file.
  The resulting structure looks something like this:

  将 DLL 放在可执行文件与其他 DLL 旁的目录中，并一起打包为 zip。
  结果结构类似：

  ```plaintext
  Release
  │   flutter_windows.dll
  │   msvcp140.dll
  │   my_app.exe
  │   vcruntime140.dll
  │   vcruntime140_1.dll
  │
  └───data
  │   │   app.so
  │   │   icudtl.dat

  ...
  ```

At this point if desired it would be relatively simple to
add this folder to a Windows installer such as Inno Setup, WiX, etc.

此时若需要，可较容易地将该文件夹加入 Inno Setup、WiX 等 Windows 安装程序。

## Additional resources

## 其他资源

To learn how to build an `.exe` using Inno Setup to distribute
your Flutter desktop app for Windows, check out the step-by-step
[Windows packaging guide][windows_packaging_guide].

要了解如何使用 Inno Setup 构建 `.exe` 以分发 Windows 版 Flutter 桌面应用，
请参阅 [Windows packaging guide][windows_packaging_guide]。

[deployment example walkthroughs]: https://docs.microsoft.com/en-us/cpp/windows/deployment-examples
[windows_packaging_guide]: https://medium.com/@fluttergems/packaging-and-distributing-flutter-desktop-apps-the-missing-guide-part-2-windows-0b468d5e9e70
