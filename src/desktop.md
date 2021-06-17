---
title: Flutter 桌面支持
description: 发布 Flutter 桌面的 Alpha 版本。
toc: true
tags: 文档
keywords: Flutter Desktop, Flutter 桌面版
---

Desktop support allows you to compile Flutter source code
to a native Windows, macOS, or Linux desktop app.
Flutter's desktop support also extends to plugins&mdash;you
can install existing plugins that support the Windows,
macOS, or Linux platforms, or you can create your own.

桌面支持可以让您的 Flutter 代码编译成 Windows、macOS 或 Linux 的原生桌面应用。
Flutter 的桌面支持也允许插件拓展&mdash;
您可以使用已经支持了 Windows、macOS 或 Linux 平台的插件，或者创建您自己的插件来实现功能。

{{site.alert.warning}}

  **Beta!**
  This page covers desktop support,
  which is available as a beta release for
  Windows (Win32), macOS and Linux. The Windows UWP
  support is available as an alpha release. Beta
  support still has notable feature gaps,
  including accessibility support. Meanwhile, the
  Windows UWP alpha release is still in
  very active development. You can try a beta
  snapshot of desktop support on the `stable`
  channel, or you can keep up with the latest
  changes to desktop on the `beta` channel. For
  Windows UWP you need to be on the `dev` channel.
  
  **测试版发布!**
  本页涵盖的桌面支持，描述的是包括
  Windows（Win32）、macOS 和 Linux 的 Beta 版支持，
  Windows 的 UWP 支持目前处于 Alpha 版本。
  Beta 支持仍有较为明显的功能差距，包括无障碍功能的支持等。
  同时，Windows UWP 的 Alpha 版本仍在非常积极的开发中。
  你可以在 `stable` 渠道尝试这个 Beta 版的桌面支持，
  或者可以切换到使用 `beta` 渠道，使用最新的桌面版支持。
  如果要跟进 Windows UWP 最新版，需要使用 `dev` 渠道。

  For more information, see the **Desktop**
  section in [What's new in Flutter 2][],
  a free article on Medium.

  更多有关 **桌面版** 的详细信息，请查看文章：
  [Flutter 2 带来了哪些更新][What's new in Flutter 2 CN]。

{{site.alert.end}}

[What's new in Flutter 2]: {{site.flutter-medium}}/whats-new-in-flutter-2-0-fe8e95ecc65
[What's new in Flutter 2 CN]: /posts/whats-new-in-flutter-2-0

{{site.alert.note}}

  To compile a desktop application, you must build it **on**
  the targeted platform: build a Windows application on Windows,
  a macOS application on macOS, and a Linux application on Linux.
  If you experience a problem that hasn’t yet been reported,
  please [file an issue][] and include
  "desktop:windows (win32)/windows (uwp)/macos/linux"
  (whichever platform is appropriate) in the title.

  要能够编译桌面应用，您必须**在特定的平台**上
  编译应用: 在 Windows 上构建 Windows 应用，在 macOS 上构建 macOS 应用，
  在 Linux 上构建 Linux 应用。
  如果您遇到了一个尚未被报告的问题，请 [创建一个 issue][file an issue]，
  其中标题包含 "desktop:windows (win32)/windows (uwp)/macos/linux" (所处的平台)。

{{site.alert.end}}

## Beta Snapshot in stable channel

## Stable 渠道包含了一份 Beta 渠道的桌面支持

To make it easier to try out desktop support for
Flutter, we are shipping a snapshot of Flutter's
desktop beta on the stable channel.
This means that you can easily try desktop support
without needing to switch to the Flutter beta channel.
However, the snapshot included in the stable channel
won't be updated until the next Flutter stable release.
If you want the latest version of desktop support,
you must switch to the Flutter beta channel.

为了让开发者更轻松尝试 Flutter 的桌面支持，我们在稳定版
构建渠道里打包了一份 Flutter 桌面支持的测试版构建渠道的快照。
您可以尝试 Flutter 桌面支持而无需切换到 Flutter 测试版构建渠道。
但在下个稳定版本发布之前，这个快照不会有更新。

[file an issue]: {{site.github}}/flutter/flutter/issues/new?title=[desktop]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-desktop&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_desktop%20version,+browser+version

## Requirements

## 要求

To create a Flutter application with desktop support,
you need the following software:

要创建一个支持桌面的 Flutter 应用，您需要以下的软件：

* Flutter SDK. See the
  [Flutter SDK][] installation instructions.
  
  Flutter SDK。查看 [Flutter SDK][] 安装说明。
  
* Optional: An IDE that supports Flutter.
  You can install [Android Studio][], [IntelliJ IDEA][],
  or [Visual Studio Code][] and
  [install the Flutter and Dart plugins][]
  to enable language support and tools for refactoring,
  running, debugging, and reloading your desktop app
  within an editor. See [setting up an editor][]
  for more details.

  可选项：一个支持 Flutter 的 IDE。您可以安装 [Android Studio][]、
  [IntelliJ IDEA][] 或 [Visual Studio Code][]，并且需要 
  [安装 Flutter 和 Dart 插件][install the Flutter and Dart plugins]。
  这些插件可以使 IDE 支持 Dart 语言，也为您提供了一些工具，
  如重构、允许、调试和重载桌面应用。详情请查看 [配置一个编辑器][setting up an editor]。

[Android Studio]: {{site.android-dev}}/studio/install
[Flutter SDK]: /docs/get-started/install
[install the Flutter and Dart plugins]: /docs/get-started/editor
[IntelliJ IDEA]: https://www.jetbrains.com/idea/download/
[setting up an editor]: /docs/get-started/editor
[Visual Studio Code]: /docs/development/tools/vs-code

### Additional Windows requirements

### Windows 的额外要求

For Windows desktop development,
you need the following in addition to the Flutter SDK:

要开发 Windows 桌面程序，除了 Flutter SDK，您还需要做以下准备:

* [Visual Studio 2019][] (not to be confused with
  Visual Studio _Code_). For Win32 you need the
  "Desktop development with C++" workload installed,
  including all of its default components. For UWP
  you need the "Universal Windows Platform development"
  workload installed, with the optional UWP C++ tools.

  [安装 Visual Studio 2019][Visual Studio 2019] (不要与 Visual Studio Code - VS Code 混淆)。
  Win 32 开发，请选择 [「使用 C++ 的桌面开发」工作负载](https://docs.microsoft.com/zh-cn/cpp/build/vscpp-step-0-installation?view=msvc-160#step-4---choose-workloads)，
  包括它所有的默认组件。
  UWP 开发，需要选择「通用 Windows 平台开发」工作负载，以及可选的 UWP C++ 工具。

[Visual Studio 2019]: https://visualstudio.microsoft.com/downloads/

### Additional macOS requirements

### macOS 的额外要求

For macOS desktop development,
you need the following in addition to the Flutter SDK:

要开发 macOS 桌面程序，除了 Flutter SDK，您还需要做以下准备:

* [Xcode][]

  [Xcode][]

* [CocoaPods][] if you use plugins

  如果使用插件，需要安装 [CocoaPods][]

[CocoaPods]: https://cocoapods.org/
[Xcode]: {{site.apple-dev}}/xcode/

### Additional Linux requirements

### Linux 的额外要求

For Linux desktop development,
you need the following in addition to the Flutter SDK:

要开发 Linux 桌面程序，除了 Flutter SDK，您还需要做以下准备:

* [Clang][]

  [Clang][]

* [CMake][]

  [CMake][]

* [GTK development headers][]

  [GTK development headers][]

* [Ninja build][]

  [Ninja build][]

* [pkg-config][]

  [pkg-config][]

* libblkid
* liblzma

  libblkid

The easiest way to install the Flutter SDK along with these
dependencies is by using [snapd][].
For more information, see [Installing snapd][].

安装 Flutter SDK 和这些依赖，最简单方式的方式是使用 [snapd][]。
更多详细信息，可以查看 [安装 snapd][Installing snapd]。

Once you have `snapd`, you can install Flutter
using the [Snap Store][], or at the command line:

安装 snapd 后，您就可以使用 [Snap Store][] 安装 Flutter，
也可以在命令行进行安装:

```terminal
$ sudo snap install flutter --classic
```

If `snapd` is unavailable on the Linux distro you're using,
you might use the following command:

如果您在使用的 Linux 发行版上无法使用 `snapd`，您可以使用下面的命令行:

```terminal
$ sudo apt-get install clang cmake ninja-build pkg-config libgtk-3-dev
```

[Clang]: https://clang.llvm.org/
[CMake]: https://cmake.org/
[GTK development headers]: https://developer.gnome.org/gtk3/3.2/gtk-getting-started.html
[Installing snapd]: https://snapcraft.io/docs/installing-snapd
[Ninja build]: https://ninja-build.org/
[pkg-config]: https://www.freedesktop.org/wiki/Software/pkg-config/
[Snap Store]: https://snapcraft.io/store
[snapd]: https://snapcraft.io/flutter

## Create a new project

## 创建一个新项目

You can use the following steps
to create a new project with desktop support.

您可以通过下列步骤，来创建一个支持桌面的新项目。

### Set up

### 配置

At the command line, perform the following commands to
make sure that you have the latest desktop support and that
it's enabled. If you see "flutter: command not found",
then make sure that you have installed the
[Flutter SDK][] and that it’s in your path.

在命令行中执行如下命令，来确保您使用了最新版可用的桌面支持。
如果您看到 “flutter: command not found”，
那么请确保您安装了 [Flutter SDK][]，并且配置在您的环境路径中。

```terminal
$ flutter config --enable-<platform>-desktop
```

Where _&lt;platform&gt;_ is `windows`, `macos`, or `linux`:

这里 **&lt;platform&gt;** 是 `windows`、`macos`、或 `linux`：

```terminal
$ flutter config --enable-windows-desktop
$ flutter config --enable-macos-desktop
$ flutter config --enable-linux-desktop
```

For Windows UWP desktop support perform the following commands to switch to
the `dev` channel, upgrade Flutter, and enable UWP.

若想进行 UWP 桌面开发，请执行以下命令切换到 `dev` 分支、升级 Flutter 并启用 UWP 支持。

```terminal
$ flutter channel dev
$ flutter upgrade
$ flutter config --enable-windows-uwp-desktop
```

To ensure that desktop _is_ enabled,
list the devices available.
You should see something like the following
(you'll see Windows, macOS, or Linux,
depending on which platform you are running on):

想要确保桌面 **已成功启用**，可以列出可用的设备。
您应该会看到如下的内容
（您将看到 Windows、macOS 或 Linux，这取决于您运行的是哪个平台）：

``` terminal
$ flutter devices
1 connected device:

Windows (desktop) • windows • windows-x64 • Microsoft Windows [Version 10.0.18362.1082]
macOS (desktop)   • macos   • darwin-x64  • macOS 11.2 20D64 darwin-x64
Linux (desktop)   • linux   • linux-x64   • Linux
```

You might also run `flutter doctor` to see if there are
any unresolved issues. It should look something like
the following on Windows:

您也可以运行 `flutter doctor` 来查看是否存在未解决的问题。
在 Windows 上您可能会看到如下内容:

```terminal
PS C:\> flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 2.0.6, on Microsoft Windows [Version 10.0.19042.804], locale en-AU)
[√] Android toolchain - develop for Android devices (Android SDK version 30.0.3)
[√] Chrome - develop for the web
[√] Visual Studio - develop for Windows (Visual Studio Community 2019 16.9.5)
[√] Android Studio (version 4.1.0)
[√] VS Code (version 1.56.2)
[√] Connected device (3 available)

! No issues found!
```

On macOS, you might see something like the following:

在 macOS 上，您可能会看到如下内容:

```terminal
$ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 2.0.6, on macOS 11.3.1 20E241 darwin-x64, locale en)
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.0)
[✓] Xcode - develop for iOS and macOS
[✓] Chrome - develop for the web
[✓] Android Studio (version 4.0)
[✓] VS Code (version 1.56.2)
[✓] Connected device (3 available)

• No issues found!
```

On Linux, you might see something like the following:

在 Linux 上，您可能会看到如下内容:

```terminal
$ flutter doctor 
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel beta, 1.27.0-1.0.pre, on Linux, locale en_AU.UTF-8)
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.3)
[✓] Chrome - develop for the web
[✓] Linux toolchain - develop for Linux desktop
[✓] Android Studio
[✓] Connected device (2 available)
```

If `flutter doctor` finds problems for a platform that
you don't want to develop for, you can ignore those warnings.
You don't have to install Android Studio and the Android SDK,
for example, if you're writing a Linux desktop app.

如果 `flutter doctor` 发现一些问题，而问题与您需要支持的平台无关，
您可以忽略这些警告。比如，如果您只是写 Linux 桌面程序，
您不必安装 Android Studio 和 Android SDK。

**After enabling desktop support, restart your IDE.**
You should now see **windows (desktop)**,
**macOS (desktop)**, or **linux (desktop)**
in the device pulldown.

**在开启桌面支持后，重启您的 IDE。**在设备下拉栏里，
您应该可以看到 **windows (desktop)**、**macOS (desktop)** 或 
**linux (desktop)**。

{{site.alert.note}}

  You only need to execute
  `flutter config --enable-<platform>-desktop`
  once.  You can always check the status of your configuration using
  the no-argument `flutter config` command.

  您只需要执行一次  `flutter config --enable-<platform>-desktop`。
  您之后可以使用不带参数的 `flutter config` 命令检查配置的状态。

{{site.alert.end}}

### Create and run

### 创建和运行

Creating a new project with desktop support is no different
than [creating a new Flutter project][] for other platforms.

创建一个桌面支持的新项目，与在其他平台 
[创建新的 Flutter 项目][creating a new Flutter project] 
没什么不同的地方。

Once you've configured your environment for desktop
support, you can create and run a desktop application
either in the IDE or from the command line.

一旦配置好了桌面支持的环境，
你可以通过 IDE 或命令行创建和运行桌面程序。

[creating a new Flutter project]: /docs/get-started/test-drive

#### Using an IDE

#### 使用 IDE

After you've configured your environment to support
desktop, make sure you restart the IDE if it was
already running.

在您配置好桌面支持的环境后，记得重启已经在运行的 IDE。

Create a new application in your IDE and it automatically
creates iOS, Android, web, and desktop versions of your app.
From the device pulldown, select **windows (desktop)**,
**macOS (desktop)**, or **linux (desktop)**
and run your application to see it launch on the desktop.

在您的 IDE 中创建新应用时，它会自动创建 iOS、 Android 和应用的桌面版本。
从设备的下拉选项中，选择 **windows (desktop)**、
**macOS (desktop)** 或 **linux (desktop)** 
然后运行您的应用，就会看到应用在桌面启动。

[web support]: /docs/get-started/web

#### From the command line

#### 使用命令行

To create a new application that includes desktop support
(in addition to mobile and web support), run the following commands,
substituting `myapp` with the name of your project:

想要创建一个包含桌面支持的新应用（除了支持移动和 Web），请运行下面的命令，
将 `myapp` 替换成您项目的名称：

```terminal
$ flutter create myapp
$ cd myapp
```
To launch your application from the command line,
enter one of the following commands from the top
of the package:

想要从命令行启动您的应用，可以在根目录执行以下命令之一：

```terminal
PS C:\> flutter run -d windows
$ flutter run -d macos
$ flutter run -d linux
```

{{site.alert.note}}
  If you do not supply the `-d` flag, `flutter run` will list
  the available targets to choose from.
{{site.alert.end}}

## Windows UWP

{{site.alert.warning}}

  **Alpha!**
  Flutter Windows UWP desktop support is an alpha release, 
  available on the `dev` channel. 

  **Alpha!**
  Flutter 对 Windows UWP 桌面开发的支持仍然在 alpha 阶段，仅在 `dev` 渠道可用。

{{site.alert.end}}

To get started with Windows UWP you need to be using Windows 10. 
You need to install Visual Studio (not Visual Studio _Code_) with the 
"Universal Windows Platform development" workload and the optional 
Windows UWP C++ tools. 

进行 Windows UWP 开发需要系统版本至少为 Windows 10。
你需要安装 Visual Studio（不是 Visual Studio **Code**），
并且添加「通用 Windows 平台开发」工作负载以及可选的 UWP C++ 工具。

To configure Flutter for Windows UWP development, 
perform the following commands to switch to
the `dev` channel, upgrade Flutter, and enable 
Windows UWP desktop support.

若想配置 Windows UWP 开发，
请执行以下命令切换到 `dev` 分支、升级 Flutter，
并启用 Windows UWP 桌面开发支持。

```terminal
PS C:\> flutter channel dev
PS C:\> flutter upgrade
PS C:\> flutter config --enable-windows-uwp-desktop
```

To create a new application, run the following commands:

执行以下命令创建新应用：

```terminal
PS C:\> flutter create myapp
PS C:\> cd myapp
```

Running Flutter with Windows UWP is complicated due to UWP's 
sandboxed runtime. You need to run an override for the sandbox 
to enable the injection of Dart code into the running UWP 
process to enable debugging and Hot Reload.

在 Windows UWP 环境下运行 Flutter 会有一些复杂，这是由 UWP 的沙盒环境决定的。
为了能正常进行调试和热重载，在开发时你需要对 UWP 进程的沙盒进行一些重载和注入操作。

The suggested approach during development is to first run
`flutter run -d winuwp` from the command line, which will
give you a command that you need to run from a PowerShell
with Administrator privileges.

在此推荐的方法是首次运行应用时，使用命令行运行 `flutter run -d winuwp`，
此时会提示你以管理员身份在 PowerShell 中运行命令：

```terminal
PS C:\myapp> flutter run -d winuwp
Launching lib\main.dart on Windows (UWP) in debug mode...
LINK : warning LNK4075: ignoring '/INCREMENTAL' due to '/OPT:ICF' specification [C:\src\flutter-projects\myapp\build\winuwp\runner_uwp\app.vcxproj]
C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Microsoft\VisualStudio\v16.0\AppxPackage\Microsoft.AppXPackage.Targets(3327,5): warning : APPX4001: Build property AppxBundlePlatforms is not explicitly set and is calculated based on currently building architecture. Use 'Create App Package' wizard or edit project file to set it. [C:\src\flutter-projects\myapp\build\winuwp\runner_uwp\app.vcxproj]
Building Windows UWP application...
Enable Flutter debugging from localhost.

Windows UWP apps run in a sandboxed environment. To enable Flutter debugging
and hot reload, you will need to enable inbound connections to the app from the
Flutter tool running on your machine. To do so:
  1. Launch PowerShell as an Administrator
  2. Enter the following command:
     checknetisolation loopbackexempt -is -n=[APP_CONTAINER_NAME]

Press "Y" once this is complete, or "N" to abort.:
```

Run this `checknetisolation` command as shown in a PowerShell
as Administrator. You can then leave this process running for
the length of your development session, restarting your UWP app
as required.

以管理员身份在 PowerShell 中运行如上 `checknetisolation` 的命令。
推荐你在开发过程中保持该命令的运行，执行后请重新运行应用。

```terminal
PS C:\> checknetisolation loopbackexempt -is -n=[APP_CONTAINER_NAME]

Network Isolation Debug Session started.
Reproduce your scenario, then press Ctrl-C when done.
```

Once you have this process running, you can deploy to
Windows UWP from within your IDE as normal, or run from
the command line as follows:

当该进程在运行时，你就可以正常地在 IDE 中或者执行以下命令运行应用，

```terminal
PS C:\myapp> flutter run -d winuwp
```

## Build a release app

## 创建 release 版本的应用

To generate a release build,
run one of the following commands:

要生成 release 版本，可以运行以下命令之一：

```terminal
PS C:\> flutter build windows
$ flutter build macos
$ flutter build linux
```

### Distribution

### 发布

**We don't recommend releasing a desktop
application until desktop support is stable,**
however, here is some information that you
might still find useful.

**一般来说，在桌面支持稳定之前，我们不建议发布桌面应用。**
不过，这里还有一些内容，可以帮助您在其他机器上使用当前构建进行测试。

#### Windows

There are various approaches you can use for
distributing your Windows application.
Here are some options:

你有多种方法发布你的 Windows 应用，以下是一些可以选择的方法：

* Use tooling to construct an MSIX installer
  (described in the next section)
  for your application and distribute it through
  the Microsoft Windows App Store.
  You don't need to manually create a signing
  certificate for this option as it is
  handled for you.

  通过工具为你的应用配置 MSIX 安装器（下一个章节会详细介绍），
  并将其分发到 Microsoft Windows 应用商店。
  你无需手动创建证书签名，该选项会默认帮你创建。

* Construct an MSIX installer and distribute
  it through your own website. For this
  option, you need to to give your application a
  digital signature in the form of a
  `.pfx` certificate.

  构建 MSIX 安装器并分发到你的网站。对于该选项来说，
  你需要手动在 `.pfx` 证书中给你的应用一个数字签名。

* Collect all of the necessary pieces
  and build your own zip file.

  整合所有关键部分，打成你自己的压缩包。

#### MSIX packaging

#### MSIX 打包

[MSIX][], Microsoft Windows' application package format,
provides a modern packaging experience to all Windows apps.
This format can either be used to ship applications
to Microsoft Windows' Apps store, or you can
distribute application installers directly.

[MSIX][] 是 Microsoft Windows 的应用打包格式，
它为所有 Windows 应用提供了现代化的打包体验。
该格式可以用于向 Microsoft Windows 应用商店分发应用，
也可以直接分发安装包。

The easiest way to create an MSIX distribution
for a Flutter project is to use the
[`msix` pub package][msix package].
For an example of using the `msix` package
from a Flutter desktop app,
see the [Desktop Photo Search][] sample.

一个为 Flutter 项目创建 MSIX 分发的简单方式是，使用 [`msix` pub 包][msix package]。
要查看使用 `msix` package 的 Flutter 桌面应用，请参考 [桌面照片搜索][Desktop Photo Search] 样例。

[MSIX]: https://docs.microsoft.com/en-us/windows/msix/overview
[msix package]: {{site.pub}}/packages/msix
[Desktop Photo Search]: {{site.github}}/flutter/samples/tree/master/experimental/desktop_photo_search

##### Create a self-signed .pfx certificate for local testing

##### 为本地测试创建一个自签名的 .pfx 证书

For private deployment and testing with the help
of the MSIX installer, you need to give your application a
digital signature in the form of a `.pfx` certificate.

对于使用 MSIX 进行私有部署以及测试来说，你需要在 `.pfx` 证书中给你的应用一个数字签名。

For deployment through the Windows Store,
generating a `.pfx` certificate is not required. 
The Windows Store handles creation and management
of certificates for applications 
distributed through its store.

对于通过 Windows 商店部署的应用来说，
无需生成 `.pfx` 证书。
Windows 商店会在分发时帮你的应用创建并管理证书。

Distributing your application by self hosting it on a
website requires a certificate signed by a
Certificate Authority known to Windows.

若要将你的应用分发到自己的网站，则需要一个 Windows 能够识别的证书签名。

Use the following instructions to generate a
self-signed `.pfx` certificate.

通过下面的介绍生成一个自签名的 `.pfx` 证书。

1. If you haven't already, download the [OpenSSL][]
   toolkit to generate your certificates.

   若你还未安装 [OpenSSL][] 工具以生成一个证书。

1. Go to where you installed OpenSSL, for example,
   `C:\Program Files\OpenSSL-Win64\bin`.

   打开 OpenSSL 的安装目录，例如 `C:\Program Files\OpenSSL-Win64\bin`。

1. Set an environment variable so that you can access
   `OpenSSL` from anywhere:<br>
   `"C:\Program Files\OpenSSL-Win64\bin"`

   设置环境变量，以便在任何地方都能够访问到 `OpenSSL`:<br>
   `"C:\Program Files\OpenSSL-Win64\bin"`

1. Generate a private key as follows:<br>
   `openssl genrsa -out mykeyname.key 2048`

   按照以下命令生成私钥:<br>
   `openssl genrsa -out mykeyname.key 2048`

1. Generate a certificate signing request (CSR)
   file using the private key:<br>
   `openssl req -new -key mykeyname.key -out mycsrname.csr`

   使用私钥生成一个自签名证书（CSR）:<br>
   `openssl req -new -key mykeyname.key -out mycsrname.csr`

1. Generate the signed certificate (CRT) file using
   the private key and CSR file:<br>
   `openssl x509 -in mycsrname.csr -out mycrtname.crt -req -signkey mykeyname.key -days 10000`

   使用私钥和 CSR 文件生成一个自签名的证书 (CRT) 文件:<br>
   `openssl x509 -in mycsrname.csr -out mycrtname.crt -req -signkey mykeyname.key -days 10000`

1. Generate the `.pfx` file using the private key and
   CRT file:<br>
   `openssl pkcs12 -export -out CERTIFICATE.pfx -inkey mykeyname.key -in mycrtname.crt`

   使用私钥与 CRT 文件生成 `.pfx` 文件:<br>
   `openssl pkcs12 -export -out CERTIFICATE.pfx -inkey mykeyname.key -in mycrtname.crt`

1. Install the `.pfx` certificate first on the local machine
   in `Certificate store` as
   `Trusted Root Certification Authorities`
   before installing the app.

   安装应用之前需要先在本地的 `Certificate store` 将 `.pfx` 证书设为
   `Trusted Root Certification Authorities`（信赖的根证书签名）。
      
[OpenSSL]: https://slproweb.com/products/Win32OpenSSL.html

##### Building your own zip file for Windows

##### 为 Windows 平台构建压缩包文件

The Flutter executable, `.exe`, can be found in your
project under `build\windows\runner\<build mode>\`.
In addition to that executable, you need the following:

您可以在项目中的 `build\windows\runner\<build mode>\` 
看到可执行文件。除了该可执行文件之外，您还需要以下内容:

* From the same directory:

  从相同的目录：
  
    * all the `.dll` files

      所有的 `.dll` 文件
      
    * the `data` directory

      `data` 文件夹

* The Visual C++ redistributables.
  You can use any of the methods shown in the
  [deployment example walkthroughs][] on the Microsoft site
  to ensure that end users have the C++ redistributables.
  If you use the `application-local` option, you need to copy:

  Visual C++ 发布包。您可以使用 Microsoft 站点上 
  [部署示例演练][deployment example walkthroughs] 所示的任何方法进行发布。
  如果您使用 `application-local` 选项, 需要拷贝:

    * `msvcp140.dll`

      `msvcp140.dll`

    * `vcruntime140.dll`

      `vcruntime140.dll`

    * `vcruntime140_1.dll`

      `vcruntime140_1.dll`
  
  These 3 files can be found in C:\Windows\System32 if installed on your PC.
  Place the DLL files in the directory next to the executable
  and the other DLLs, and bundle them together in a zip file.
  The resulting structure will look something a little like this:

  如果你安装了它们的话，可以在 C:\Windows\System32 目录下找到它们。
  将 DLL 文件放在可执行文件和其他 DLL 旁边的一个目录中，
  并将它们打包到一个 zip 文件中。
  返回的结构大概长这样：
  
  ```
  Release
  │   flutter_windows.dll
  │   msvcp140.dll
  │   myapp.exe
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

在这一点上，这将是相对简单的
将此文件夹添加到 Windows 安装程序的方法，如 Inno 设置、WiX 等。

[deployment example walkthroughs]: https://docs.microsoft.com/en-us/cpp/windows/deployment-examples?view=vs-2019

### macOS

To distribute your macOS application, you can either
[distribute it through the macOS App Store][], 
or you can distribute the `.app` itself,
perhaps from your own website.
As of macOS 10.14.5, you need to notarize
your macOS application before distributing 
it outside of the macOS App Store. 

要发布你的 macOS 软件，你可以选择
[将 app 提交至 Mac App Store][distribute it through the macOS App Store]，
或者直接生成 `.app` 文件，并在自己的网站上发布。
不过，从 macOS 10.14.5 开始，你需要对自己的 macOS 软件进行公证，然后才能在
macOS App Store 之外的渠道发布。

The first step in both of the above processes
involves working with your application inside of Xcode.
To be able to compile your application from inside of
Xcode you first need to build the application for release
using the `flutter build` command, then open the
Flutter macOS Runner application.

不论选择什么方式发布你的 macOS 软件，你都需要在 Xcode 中操作。
为了能够在 Xcode 内操作，你需要先使用 `flutter build` 命令生成所需的工程文件，
然后打开工程。

```bash
$ flutter build macos
$ open macos/Runner.xcworkspace
```

Once inside of Xcode, follow either Apple's
[documentation on notarizing macOS Applications][],
or [on distributing an application through the App Store][].
You should also read through the
[macOS-specific support](#macos-specific-support)
section below to understand how entitlements,
the App Sandbox, and the Hardened Runtime
impact your distributable application.

在 Xcode 里，请参考 Apple 的文档：
[在分发前对 macOS 软件进行公证][documentation on notarizing macOS Applications]
或 [将 app 提交至 Mac App Store][on distributing an application through the App Store]。
你也应该通读一下
[macOS 的额外要求](#macos-specific-support)，了解 Entitlements、App Sandbox 和
Hardened Runtime 是如何影响你打包的应用的。

[distribute it through the macOS App Store]: https://developer.apple.com/macos/submit/
[documentation on notarizing macOS Applications]: https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution
[on distributing an application through the App Store]: https://help.apple.com/xcode/mac/current/#/dev067853c94

### Linux

The executable binary can be found in your project under
`build/linux/<build mode>/bundle/`. Alongside your 
executable binary in the `bundle` directory there are
two directories:

您可以在您的项目下的 `build/linux/<构建模式>/bundle/` 路径下找到可执行文件。
同时在 `bundle` 目录下还有两个文件夹：

 * `lib` contains the required `.so` library files

   `lib` 包含必需的 `.so` 库文件

 * `data` contains the application's data assets,
    such as fonts or images

   `data` 包含应用的资源，例如字体和图片

In addition to these files, your application also
relies on various operating system libraries that
it's been compiled against.
You can see the full list by running `ldd`
against your application. For example,
assuming you have a Flutter desktop application
called `linux_desktop_test` you could inspect 
the system libraries it depends upon as follows:

除了这些文件之外，您的应用程序还依赖于针对您的应用程序进行编译的各种操作系统库。
您可以通过对应用运行 `ldd` 来查看完整的列表。
例如，假设您有一个名为 `linux_desktop_test` 的 Flutter 桌面应用，
您可以通过以下步骤查看相关的系统依赖：

```
$ flutter build linux --release
$ ldd build/linux/release/bundle/linux_desktop_test
```

To wrap up this application for distribution
you need to include everything in the `bundle` directory,
and make sure the Linux system you are installing
it upon has all of the system libraries required.
This may be as simple as:

如果您需要打包发布您的应用，您需要打包 `bundle` 下的所有文件，
并且确保您的 Linux 系统安装了所需的系统依赖。
简单来说：

```
$ sudo apt-get install libgtk-3-0 libblkid1 liblzma5
```

For information on publishing a Linux application
to the [Snap Store][], see
[Build and release a Linux application to the Snap Store][].

有关向 [Snap Store][] 发布 Linux 应用，请参见 
[构建发布一个 Linux桌面程序][Build and release a Linux application to the Snap Store]。

As the tooling solidifies, stay tuned for updates 
on other ways to distribute a Linux desktop app.

这些工具将不断进行完善，欢迎您持续关注 Linux 桌面应用的其他方式的更新信息。

[Build and release a Linux application to the Snap Store]: /docs/deployment/linux

## Add desktop support to an existing Flutter app

## 为已有的应用添加桌面支持

To add desktop support to an existing Flutter project,
run the following command in a terminal from the
root project directory:

想为已有的 Flutter 项目添加桌面支持，您可以从项目根目录在控制台运行下面命令：

```terminal
$ flutter create --platforms=windows,macos,linux .
```

This adds the necessary desktop files and directories
to your existing Flutter project.
To add only specific desktop platforms,
change the `platforms` list to include only
the platform(s) you want to add.

这将会在您的 Flutter 桌面项目中添加必要的已有文件和文件夹。
如果需要只添加特定平台桌面端的支持，修改 `platforms` 的值
为你想要支持的平台即可。

## macOS-specific support

## 针对 macOS 的支持

The following information applies only to 
macOS development.

以下信息仅适用于 macOS 开发。

### Entitlements and the App Sandbox

### 权限和 App Sandbox

macOS builds are configured by default to be signed,
and sandboxed with App Sandbox.
This means that if you want to confer specific
capabilities or services on your macOS app,
such as the following:

macOS 构建时使用默认的签名进行配置，并且通过 App Sandbox 进行沙盒化。
这意味着如果您想要在 macOS 应用中授予特定的权限或者服务，比如：

* Accessing the internet

  访问网络

* Capturing movies and images from the built-in camera 

  从内置摄像头捕捉影像和图像

* Accessing files

  访问文件

Then you must set up specific _entitlements_ in Xcode.
The following section tells you how to do this.

这时您必须在 Xcode 中设置特定的 **权限**。
下面的章节会告诉您如何去做。

#### Setting up entitlements

#### 设置权限

Managing sandbox settings is done in the
`macos/Runner/*.entitlements` files. When editing
these files, you shouldn't remove the original
`Runner-DebugProfile.entitlements` exceptions
(that support incoming network connections and JIT),
as they're necessary for the `debug` and `profile`
modes to function correctly.

在 `macos/Runner/*.entitlements` 文件中完成管理沙盒的设置。
当编辑这些文件时，您不应该删除原来的 `Runner-DebugProfile.entitlements` 
中的条款（它们会支持传入网络连接和 JIT），因为 `debug` 和 `profile` 
模式正常工作需要它们。

If you're used to managing entitlement files through
the **Xcode capabilities UI**, be aware that the capabilities
editor updates only one of the two files or,
in some cases, it creates a whole new entitlements
file and switches the project to use it for all configurations.
Either scenario causes issues. We recommend that you
edit the files directly. Unless you have a very specific
reason, you should always make identical changes to both files.

如果您习惯通过 **Xcode capabilities UI** 来管理权限文件，请注意 
capabilities 编辑器只更新两个文件中的一个，在某些情况下，
它会创建一个全新的权限文件，并且切换项目，使其应用于所有配置。
这些情况都会导致问题。我们建议您直接编辑这些文件。
除非有非常特殊的原因，否则您应该始终对两个文件进行相同的更改。

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

如果您保持 App Sandbox 可用（如果您计划在 [App Store][] 上发布应用，这是必需的），
当您添加某些插件或其他本地功能时，您需要管理应用的权限。例如，
使用 [`file_chooser`][] 插件需要添加 
`com.apple.security.files.user-selected.read-only` 或 
`com.apple.security.files.user-selected.read-write` 权限。
另一个通常使用到的权限是 `com.apple.security.network.client`，
如果您想要进行网络请求，那么必须添加它。

Without the `com.apple.security.network.client` entitlement,
for example, network requests will fail with a message such as:

假设您没有设置 `com.apple.security.network.client` 权限，
网络请求将会失败，并显示如下消息：

```terminal
flutter: SocketException: Connection failed
(OS Error: Operation not permitted, errno = 1),
address = example.com, port = 443
```

{{site.alert.secondary}}

  **Important:** The `com.apple.security.network.server`
  entitlement, which allows incoming network connections,
  is enabled by default only for `debug` and `profile`
  builds to enable communications between Flutter tools
  and a running app. If you need to allow incoming
  network requests in your application,
  you must add the `com.apple.security.network.server`
  entitlement to `Runner-Release.entitlements` as well,
  otherwise your application will work correctly for debug or
  profile testing, but will fail with release builds.

  **重要:** `com.apple.security.network.server` 权限会允许进入的网络连接，
  默认情况下只在 `debug` 和 `profile` 构建时可用，
  会让 Flutter 工具和运行中的应用之间能够进行通信。
  如果您需要在您的应用中允许传入的网络请求，
  您也必须将 `com.apple.security.network.server` 
  权限添加到 `Runner-Release.entitlements`中。
  否则，您的应用将在 debug 或 profile 测试时正常工作，
  但在 release 构建时将失败。

{{site.alert.end}}

For more information on these topics,
see [App Sandbox][] and [Entitlements][]
on the Apple Developer site.

关于这些话题的更多信息，
请参见 Apple Developer 网站上的 [App Sandbox][] 和 [Entitlements][]。

[App Sandbox]: {{site.apple-dev}}/documentation/security/app_sandbox
[App Store]: {{site.apple-dev}}/app-store/submissions/
[Entitlements]: {{site.apple-dev}}/documentation/bundleresources/entitlements
[`file_chooser`]: {{site.github}}/google/flutter-desktop-embedding/tree/master/plugins/file_chooser

### Hardened Runtime

If you choose to distribute your application outside
of the App Store, you need to notarize your application
for compatibility with macOS 10.15+.
This requires enabling the Hardened Runtime option.
Once you have enabled it, you need a valid signing
certificate in order to build.

如果您选择在 App Store 以外的地方发布您的应用，
您需要确认您的应用是否兼容 macOS 10.15 以上版本。
这需要启用 Hardened Runtime 选项。
当您启用它后，构建应用时，您需要一个有效的签名证书。

By default, the entitlements file allows JIT for
debug builds but, as with App Sandbox, you may
need to manage other entitlements.
If you have both App Sandbox and Hardened
Runtime enabled, you may need to add multiple
entitlements for the same resource.
For instance, microphone access would require both
`com.apple.security.device.audio-input` (for Hardened Runtime)
and `com.apple.security.device.microphone` (for App Sandbox).

默认情况下，权利文件允许 JIT 进行 debug 模式构建，但是，与 App Sandbox 一样，
您可能需要管理其他权限。如果你需要同时启用 App Sandbox 和 Hardened Runtime，
你需要为同一资源添加多个权限。例如，麦克风访问需要这两个权限：
`com.apple.security.device.audio-input`（对于 Hardened Runtime）和 
`com.apple.security.device.microphone`（对于 App Sandbox）。

For more information on this topic,
see [Hardened Runtime][] on the Apple Developer site.

有关这个话题的更多信息，参见 Apple Developer 网站上的 [Hardened Runtime][]。

[Hardened Runtime]: https://developer.apple.com/documentation/security/hardened_runtime

## Plugin support

## 插件支持

Flutter on the desktop supports using and creating plugins.

Flutter 在桌面支持中使用和创建插件。

### Using a plugin

### 使用插件

To use a plugin that supports desktop,
follow the steps for plugins in [using packages][].
Flutter automatically adds the necessary native code
to your project, as with iOS or Android.

想要使用支持桌面的插件，请遵循 [using packages][] 中的插件使用步骤。
和 iOS 或 Android 一样，Flutter 会在您的项目里自动添加必要的本地代码。

We recommend the following plugins,
which have been updated to work for desktop apps:

我们推荐以下插件，它们已经更新，可以在桌面应用中使用:

* [`url_launcher`][]

  [`url_launcher`][]

* [`shared_preferences`][]

  [`shared_preferences`][]

* [`path_provider`][]

  [`path_provider`][]

Use the following links to find all packages on pub.dev
that support desktop apps. These links lists _all_ packages,
not just plugin packages.
(Remember that _plugin packages_, or _plugins_,
provide an interface to platform-specific services.)

使用下面的链接，寻找 pub.dev 上所有支持桌面应用的包。
这些链接列出了 **所有** 的包，不仅是插件包。
（记住这点，**插件包** 或 **插件** 提供了一个平台特定的服务接口。）

* [Windows packages][]

  [Windows 包][Windows packages]

* [macOS packages][]

  [macOS 包][macOS packages]

* [Linux packages][]

  [Linux 包][Linux packages]

[Linux packages]: {{site.pub}}/flutter/packages?platform=linux
[macOS packages]: {{site.pub}}/flutter/packages?platform=macos
[`path_provider`]: {{site.pub}}/packages/path_provider
[`shared_preferences`]: {{site.pub}}/packages/shared_preferences
[`url_launcher`]: {{site.pub}}/packages/url_launcher
[using packages]: /docs/development/packages-and-plugins/using-packages
[windows packages]: {{site.pub}}/flutter/packages?platform=windows

### Writing a plugin

### 编写一个插件

When you start building your own plugins,
you’ll want to keep federation in mind.
Federation is the ability to define several
different packages, each targeted at a
different set of platforms, brought together
into a single plugin for ease of use by developers.
For example, the Windows implementation of the
`url_launcher` is really `url_launcher_windows`,
but a Flutter developer can simply add the
`url_launcher` package to their `pubspec.yaml`
as a dependency and the build process pulls in
the correct implementation based on the target platform.
Federation is handy because different teams with
different expertise can build plugin implementations
for different platforms.
You can add a new platform implementation to any
endorsed federated plugin on pub.dev,
so long as you coordinate this effort with the
original plugin author.

当您开始构建自己的插件时，您需要记住联合。联合是定义几个不同包的能力，
其中每个包都针对不同的平台，将它们合并到一个插件中，这样方便开发人员使用。
比如，Windows 实现的 `url_launcher`，实际是通过 `url_launcher_windows` 完成的，
但是 Flutter 开发者可以在 `pubspec.yaml` 中，
简单地添加 `url_launcher` 包作为依赖，在构建过程中会基于目标平台引入正确的实现。
联合非常方便，因为具有不同专长的不同团队，可以为不同的平台构建相应的插件实现。
与原插件作者协调之后，你可以为 pub.dev 上任何联合插件添加新的平台实现。

For more information, including information
about endorsed plugins, see the following resources:

想要了解更多信息，包括关于已支持的插件信息，请参阅以下资源:

* [Developing packages and plugins][], particularly the
  [Federated plugins][] section.
  
  [开发包和插件][Developing packages and plugins]，特别是 [联合插件][] 部分。
  
* [How to write a Flutter web plugin, part 2][],
  covers the structure of federated plugins and
  contains information applicable to desktop
  plugins.
  
  [如何写一个 Flutter web 插件，第 2 部分][How to write a Flutter web plugin, part 2]，
  介绍联合插件的结构，并包含适用于桌面插件的信息。
  
* [Modern Flutter Plugin Development][] covers
  recent enhancements to Flutter's plugin support.
  
  [现代 Flutter 插件开发][Modern Flutter Plugin Development] 介绍了最近对 Flutter 插件支持的增强。
  
* [Federated Plugin proposal][]

  [联合插件提议][Federated Plugin proposal]

[Developing packages and plugins]: /docs/development/packages-and-plugins/developing-packages
[Federated Plugin proposal]: /go/federated-plugins
[Federated plugins]: /docs/development/packages-and-plugins/developing-packages#federated-plugins
[How to write a Flutter web plugin, part 2]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[Modern Flutter Plugin Development]: {{site.medium}}/flutter/modern-flutter-plugin-development-4c3ee015cf5a

## Samples and codelabs

## 示例和 codelabs

[Write a Flutter desktop application][]
: A codelab that walks you through building
a desktop application that integrates the GitHub
GraphQL API with your Flutter app.

[写一个 Flutter 桌面程序][Write a Flutter desktop application]
：这个 codelab 会引导您通过使用 Flutter，来构建一个集成 GitHub GraphQL API 的桌面应用。

You can run the following samples as desktop apps,
as well as download and inspect the source code to
learn more about Flutter desktop support.

您可以运行下面的桌面应用案例，也可以下载并阅读源代码，
以了解更多关于 Flutter 桌面支持的信息。

Flutter Gallery [running web app][], [repo][flutter-gallery-repo]
<br> A samples project hosted on GitHub to help developers
  evaluate and use Flutter. The Gallery consists of a
  collection of Material design widgets, behaviors,
  and vignettes implemented with Flutter.
  You can clone the project and run Gallery as a desktop app
  by following the instructions provided in the [README][].

Flutter Gallery [线上运行的 Web 应用][flutter gallery cn]，[源代码仓库地址][flutter-gallery-repo]
<br>一个托管在 GitHub 上案例项目，可以用来帮助开发人员评估和使用 Flutter。
  Gallery 的构成部分有：Material design widgets 的集合、
  behaviors 和用 Flutter 实现的 vignettes。
  你可以克隆该项目，并按照 [README][] 中的说明，将 Gallery 作为桌面应用程序运行。

Flokk [announcement blogpost][gskinner-flokk-blogpost], [repo][gskinner-flokk-repo]
<br> A Google contacts manager that integrates with GitHub and Twitter. 
  It syncs with your Google account, imports your contacts,
  and allows you to manage them.

Flokk [官宣文章][gskinner-flokk-blogpost], [源代码仓库地址][gskinner-flokk-repo]
<br>一款集成了 GitHub 和 Twitter 的谷歌联系人管理器应用。
可以从你的 Google 账户同步数据，导入联系人信息，并管理它们。

[Photo Search app][]
: A sample application built as a desktop application that
  uses the following desktop-supported plugins:

[图片搜索应用][Photo Search app]
: 使用以下桌面支持插件构建的一个桌面应用案例。

  * [`file_chooser`][]
  * [`menubar`][]
  * [`url_launcher`][]

[`menubar`]: {{site.github}}/google/flutter-desktop-embedding/tree/master/plugins/menubar
[Photo Search app]: {{site.repo.organization}}/samples/tree/master/experimental/desktop_photo_search
[running web app]: https://gallery.flutter.dev
[flutter-gallery-repo]: {{site.github}}/flutter/gallery
[README]: {{site.github}}/flutter/gallery#flutter-gallery
[gskinner-flokk-repo]: {{site.github}}/gskinnerTeam/flokk
[gskinner-flokk-blogpost]: https://blog.gskinner.com/archives/2020/09/flokk-how-we-built-a-desktop-app-using-flutter.html
[running web app]: https://flutter.github.io/gallery/#/
[flutter gallery cn]: https://gallery.flutter.cn/#/
[Write a Flutter desktop application]: https://codelabs.developers.google.com/codelabs/flutter-github-graphql-client/index.html
