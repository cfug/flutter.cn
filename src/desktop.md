---
title: Flutter 桌面支持
description: 发布 Flutter 桌面的 Alpha 版本。
toc: true
tags: 文档
keywords: Flutter Desktop, Flutter 桌面版
---

Desktop support allows you to compile Flutter source code
to a native Windows, macOS, or Linux desktop app. Flutter's desktop
support also extends to plugins&mdash;you can install 
existing plugins that support the macOS or Linux platforms,
or you can create your own.

桌面支持可以让您的 Flutter 代码编译成
Windows、 macOS、 或 Linux 本地的桌面应用。
Flutter 的桌面支持也允许插件拓展&mdash;
您可以使用已经支持了 macOS 或 Linux 平台的插件，
或者创建您自己的插件来实现功能。

{{site.alert.warning}}

  **Alpha!**
  This page covers desktop support,
  which is available as alpha-quality
  features in the Flutter dev channel.
  Support still has notable feature gaps,
  including accessibility support.

  **预览版!**
  本页涵盖的桌面支持，
  只能是在 Flutter dev 渠道的预览版特性。
  桌面支持仍然存在显著的特性差距，
  包括易访问性支持。

{{site.alert.end}}

{{site.alert.note}}

  To compile a desktop app, you must build the app **on**
  the targeted platform: build a Windows app on Windows,
  a macOS app on macOS, and a Linux app on Linux.
  If you experience a problem that hasn’t yet been reported,
  please file an issue and include
  "desktop:macos/linux/windows"
  (whichever platform is appropriate) in the title.

  为了能够编译桌面应用，您必须**在**目标平台上
  编译应用: 在 Windows 上构建 Windows 应用，
  在 macOS 上构建 macOS 应用，
  在 Linux 上构建 Linux 应用。
  如果您遇到了一个尚未被报告的问题，
  请 [创建一个 issue][file an issue]，其中标题包含 
  "desktop:macos/linux/windows" (所处的平台)

{{site.alert.end}}

[file an issue]: {{site.github}}/flutter/flutter/issues/new?title=desktop:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-desktop&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_desktop%20version,+browser+version

## Requirements

## 要求

To create a Flutter app with desktop support, you need the
following software:

为了创建一个支持桌面的 Flutter 应用，
您需要以下的软件：

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

  可选项：一个支持 Flutter 的 IDE。
  您可以安装 [Android Studio][]、[IntelliJ IDEA][] 
  或 [Visual Studio Code][]，并且需要
  [安装 Flutter 和 Dart 插件][install the Flutter and Dart plugins]。
  它们可以让 IDE 支持 Dart 语言，
  也为您提供了一些工具，如重构、允许、调试
  和重载桌面应用。
  详情请查看 [设置一个编辑器][setting up an editor]。 

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

为了可以开发 Windows 桌面程序，
除了 Flutter SDK，您还需要以下准备:

* [Visual Studio 2019][] (not to be confused with Visual Studio Code)
  with the "Desktop development with C++" workload installed,
  including all of its default components

  [Visual Studio 2019][]（不要与 Visual Studio Code混淆）
  安装了 “Desktop development with C++” 的工作负载，
  包括它所有的默认组件。

[Visual Studio 2019]: https://visualstudio.microsoft.com/downloads/

### Additional macOS requirements

### macOS 的额外要求

For macOS desktop development,
you need the following in addition to the Flutter SDK:

为了可以开发 macOS 桌面程序，
除了 Flutter SDK，您还需要以下准备:

* [Xcode][]

  [Xcode][]

* [CocoaPods][] if you use plugins

  如果使用插件，需要安装 [CocoaPods][]

[CocoaPods]: https://cocoapods.org/
[Xcode]: https://developer.apple.com/xcode/

### Additional Linux requirements

### Linux 的额外要求

For Linux desktop development,
you need the following in addition to the Flutter SDK:

为了可以开发 Linux 桌面程序，
除了 Flutter SDK，您还需要以下准备:

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

  libblkid

The easiest way to install the Flutter SDK along with these
dependencies is by using [snapd][].
For more information, see [Installing snapd][].

安装 Flutter SDK 和这些依赖，
最简单方式的方式是使用 [snapd][]。
更多详细信息，可以查看 [安装 snapd][Installing snapd]。

Once you have `snapd`, you can install Flutter using the [Snap Store][],
or at the command line:

当您拥有snapd，
您就可以使用 [Snap Store][] 安装 Flutter，
也可以在命令行进行安装:

```terminal
$ sudo snap install flutter --classic
```

If `snapd` is unavailable on the Linux distro you're using,
you might use the following command:

如果您在使用的 Linux 发行版上无法使用 snapd，
您可以使用下面的命令行:

```terminal
$ sudo apt-get install clang cmake ninja-build pkg-config libgtk-3-dev libblkid-dev
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

您可以通过下列步骤，
来创建一个支持桌面的新项目。

### Set up

### 设置

At the command line, perform the following commands to
make sure that you have the latest desktop support and that
it's enabled. If you see "flutter: command not found",
then make sure that you have installed the
[Flutter SDK][] and that it’s in your path.

在命令行，中执行如下命令，
以保证您有最新的桌面支持，并且它是可用的。
如果您看到 “flutter: command not found”，
那么请确保您安装了 [Flutter SDK][]，
并且它在您的环境路径中。

```terminal
$ flutter channel dev
$ flutter upgrade
$ flutter config --enable-<platform>-desktop
```

Where _&lt;platform&gt;_ is `windows`, `macos`, or `linux`:

这里 **&lt;platform&gt;** 是 `windows`、 `macos`、 或 `linux`：

```terminal
$ flutter config --enable-windows-desktop
$ flutter config --enable-macos-desktop
$ flutter config --enable-linux-desktop
```

To ensure that desktop _is_ installed,
list the devices available.
You should see something like the following
(you'll see Windows, macOS, or Linux,
depending on which platforms you've enabled):

为了确保桌面**是**安装成功的，
可以列出可用的设备。
您应该会看到如下的内容
（您将看到 Windows、macOS 或 Linux，
这取决于您启用的是哪个平台）：


``` terminal
$ flutter devices
1 connected device:

Windows (desktop) • windows • windows-x64 • Microsoft Windows [Version 10.0.18362.1082]
macOS (desktop) • macos • darwin-x64 • Mac OS X 10.15.5 19F101
Linux (desktop) • linux • linux-x64 • Linux
```

You might also run `flutter doctor` to see if there are
any unresolved issues. It should look something like
the following on Windows:

您可能也要运行 `flutter doctor` 来查看
是否存在未解决的问题。在 Windows 上
您可能会看到如下内容:

```terminal
[✓] Flutter (Channel master, 1.22.0-10.0.pre.196, on Microsoft Windows [Version 10.0.18362.1082], locale en-US)
[✓] Visual Studio - develop for Windows (Visual Studio Professional 2019 16.6.2)
[✓] VS Code (version 1.48.2)
[✓] Connected device (1 available)
```

On macOS, you might see something like the following:

在 macOS 上，您可能会看到如下内容:

```terminal
[✓] Flutter (Channel master, 1.18.0-10.0.pre, on Mac OS X 10.15.4 19E287, locale
    en-US)
[✓] Xcode - develop for iOS and macOS (Xcode 11.2)
[✓] Chrome - develop for the web
[✓] VS Code (version 1.44.2)
[✓] Connected device (3 available)
```

On Linux, you might see something like the following:

在 macOS 上，您可能会看到如下内容:

```terminal
$ flutter doctor
[✓] Flutter (Channel master, 1.20.0-1.0.pre.132, on Linux, locale en_US.UTF-8)
[✓] Linux toolchain - develop for Linux desktop
[✓] VS Code (version 1.33.1)
[✓] Connected device (1 available)
```

If `flutter doctor` finds problems for a platform you don't
support, you can ignore those warnings. You don't have
to install Android Studio and the Android SDK,
for example, if you're writing a Linux desktop app.

如果 `flutter doctor` 发现一些问题，
而问题与您需要支持的平台无关，
您可以忽略这些警告。比如，如果您只是
写 Linux 桌面程序，您不必安装
Android Studio 和 Android SDK。

**After enabling desktop support, restart your IDE.**
You should now see **windows (desktop)**, **macOS (desktop)**, or 
**linux (desktop)** in the device pulldown.

**在开启桌面支持后，重启您的 IDE。**
在设备下拉栏里，您应该可以看到
 **windows (desktop)**、**macOS (desktop)** 或 **linux (desktop)**。

{{site.alert.note}}

  You only need to execute `flutter config --enable-<platform>-desktop`
  once.  You can always check the status of your configuration using
  the no-argument `flutter config` command.

  您只需要执行一次 
  `flutter config --enable-<platform>-desktop`。
  您总是可以使用不带参数的 `flutter config` 
  命令检查配置的状态。

{{site.alert.end}}

### Create and run

### 创建和运行

Creating a new project with desktop support is no different
than [creating a new Flutter project][] for other platforms.

创建一个桌面支持的新项目，与在其他平台 
[创建新的 Flutter 项目][creating a new Flutter project] 
没什么不同的地方。

Once you've configured your environment for desktop
support, you can create and run a desktop app either
in the IDE or from the command line.

一旦您配置好了桌面支持的环境，
您在 IDE 或命令行里都可以
创建和运行桌面程序。

[creating a new Flutter project]: /docs/get-started/test-drive

#### IDE

#### IDE

After you've configured your environment to support
desktop, make sure you restart the IDE if it was
already running.

在您配置好桌面支持的环境后，
如果 IDE 已经在运行中，
您需要确保重启 IDE。

Create a new app in your IDE and it automatically
creates iOS, Android, and desktop versions of your app.
(And web, too, if you've enabled [web support][].)
From the device pulldown, select **windows (desktop)**,
**macOS (desktop)**, or **linux (desktop)**
and run your app to see it launch on the desktop.

在您的 IDE 中创建新应用时，
它会自动创建 iOS、 Android 和应用的桌面版本。
（如果您开启过 [web 支持][web support]，
对于 web，也是一样的。）
重设备的下拉选项中，选择 **windows (desktop)**、
**macOS (desktop)**、或 **linux (desktop)** 
然后运行您的应用，会看到它在桌面启动。

[web support]: /docs/get-started/web

#### Command line

#### 命令行

To create a new app that includes desktop support
(in addition to mobile support), run the following commands,
substituting `myapp` with the name of your project:

为了创建一个包含桌面支持的新应用
（除了移动支持），运行下面的命令，
将 `myapp` 替换成您项目的名称：

```terminal
$ flutter create myapp
$ cd myapp
```
To launch your app from the command line,
enter one of the following commands from the top
of the package:

为了能够从命令行启动您的应用，
从根目录执行以下命令之一：

```terminal
$ flutter run -d windows
$ flutter run -d macos
$ flutter run -d linux
```

{{site.alert.note}}

  If there aren't any other connected devices,
  the `-d <platform>` tag is optional.

  如果没有其他的连接设备，
  这里 `-d <platform>` 标记是可选的。

{{site.alert.end}}

### Build a release app

### 创建 release 版本的应用

To generate a release build run one of the following commands:

要生成 release 版本，可以运行以下命令之一：

```terminal
$ flutter build windows
$ flutter build macos
$ flutter build linux
```

### Distribution

### 发布

**In general, we don't recommend releasing a desktop app until
desktop support is stable.**
There are not yet full instructions, or tooling support,
for making distributable applications. However,
here is some information about how to use the current
build output on other machines for testing purposes.

**一般来说，在桌面支持稳定之前，
我们不建议发布桌面应用。**
目前还没有完整的说明，或工具支持，
用于制作可分发的应用程序。然而，
这里有一些信息，关于如何在其他机器上
使用当前构建进行测试。

#### Windows

#### Windows

The executable can be found in your project under
`build\windows\runner\<build mode>\`.
In addition to that executable, you need the following:

您可以在项目中的 
`build\windows\runner\<build mode>\` 
看到可执行文件。
除了该可执行文件之外，您还需要以下内容:

* From the same directory:

  从相同的目录
  
    * all the `.dll` files

      所有的 `.dll` 文件
      
    * the `data` directory

      `data` 文件夹

* The Visual C++ redistributables.
  You can use any of the methods shown in the
  [deployment example walkthroughs][] on the Microsoft site.
  If you use the `application-local` option, you need to copy:

  Visual C++ 发布包。
  您可以使用 Microsoft 站点上 
  [部署示例演练][deployment example walkthroughs] 
  所示的任何方法。
  如果您使用 `application-local` 选项, 需要拷贝:

    * `msvcp140.dll`

      `msvcp140.dll`

    * `vcruntime140.dll`

      `vcruntime140.dll`

    * `vcruntime140_1.dll`

      `vcruntime140_1.dll`

Place the DLL files in a directory next to the executable
and the other DLLs, and bundle them together in a zip file.

将 DLL 文件放在可执行文件和其他 DLL 
旁边的一个目录中，并将它们打包到一个 zip 文件中。

[deployment example walkthroughs]: https://docs.microsoft.com/en-us/cpp/windows/deployment-examples?view=vs-2019

#### macOS

#### macOS

The `.app` is self-contained, and can be distributed as-is.

`.app` 是自包含的，可以按原样发布。

#### Linux

#### Linux

For information on publishing a Linux app to the
[Snap Store][], see
[Build and release a Linux desktop app][].

关于向 [Snap Store][] 发布 Linux 应用的信息，
请参见[构建发布一个Linux桌面程序] 
[Build and release a Linux desktop app]。

As the tooling solidifies, stay tuned for updates on other ways
to distribute a Linux desktop app.

随着工具的完善，请继续关注发布 Linux 
桌面应用的其他方式的更新信息。

[Build and release a Linux desktop app]: /docs/deployment/linux

## Add desktop support to an existing app

## 为已有的应用添加桌面支持

To add desktop support to an existing project,
run the following command in a terminal from the
root project directory:

想为已有的项目添加桌面支持，您可以
从项目根目录在控制台运行下面命令：

```terminal
$ flutter create .
```

This adds the necessary files and directories to your
Flutter project.

这将会在您的 Flutter 项目中
添加必要的文件和文件夹。

## macOS-specific support

## 具体的 macOS 支持

The following information applies only to macOS development.

以下信息仅适用于 macOS 开发。

### Entitlements and the App Sandbox

### 权限和 App Sandbox

macOS builds are configured by default to be signed,
and sandboxed with App Sandbox.
This means that if you want to confer specific
capabilities or services on your macOS app,
such as the following:

macOS 构建时使用默认的签名进行配置，
并且通过 App Sandbox 进行沙盒化。
这意味着如果您想要在 macOS 应用中
授予特定的权限或者服务，比如下面：

* Accessing the internet

  访问网络

* Capturing movies and images from the built-in camera 

  从内置摄像头捕捉影像和图像

* Accessing files

  访问文件

Then you must set up specific _entitlements_ in Xcode.
The following section tells you how to do this.

这时您必须在 Xcode 中
设置特定的 **权限**。
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

在 `macos/Runner/*.entitlements` 文件中
完成管理沙盒的设置。当编辑
这些文件时，您不应该删除原来的 
`Runner-DebugProfile.entitlements` 中
的条款（它们会支持传入网络连接和 JIT），
因为 `debug` 和 `profile` 模式
正常工作需要它们。

If you're used to managing entitlement files through
the **Xcode capabilities UI**, be aware that the capabilities
editor updates only one of the two files or,
in some cases, it creates a whole new entitlements
file and switches the project to use it for all configurations.
Either scenario causes issues. We recommend that you
edit the files directly. Unless you have a very specific
reason, you should always make identical changes to both files.

如果您习惯通过 **Xcode capabilities UI** 
来管理权限文夹，请注意，
capabilities 编辑器只更新两个文件中的一个，
在某些情况下，它会创建一个全新的权限 
文件，并且切换项目，使其应用于所有配置。

If you keep the App Sandbox enabled (which is required if you
plan to distribute your app in the [App Store][]), you need to manage
entitlements for your application when you add certain plugins
or other native functionality. For instance, using the
[`file_chooser`][] plugin requires adding either the
`com.apple.security.files.user-selected.read-only` or
`com.apple.security.files.user-selected.read-write` entitlement.
Another common entitlement is `com.apple.security.network.client`,
which you must add if you make any network requests.

如果您保持 App Sandbox 可用（如果您计划
在 [App Store][] 上发布应用，这是必需的。）
当您添加某些插件或其他本地功能时，
您需要管理应用的权限。例如，使用 
[`file_chooser`][] 插件需要添加 
`com.apple.security.files.user-selected.read-only` 或 
`com.apple.security.files.user-selected.read-write` 权限。
另一个通常使用到的权限是 
`com.apple.security.network.client`，
如果您想要进行网络请求，那么必须添加它。

Without the `com.apple.security.network.client` entitlement,
for example, network requests will fail with a message such as:

例如，没有 `com.apple.security.network.client` 
权限，网络请求将会失败，并显示如下消息:

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
  otherwise your app will work correctly for debug or
  profile testing, but will fail with release builds.

  **重要:** `com.apple.security.network.server` 
  权限会允许进入的网络连接，
  默认情况下只在 `debug` 和 `profile` 
  构建时可用，会让 Flutter 工具
  和运行中的应用之间能够进行通信。
  如果您需要在您的应用中
  允许传入的网络请求，
  您也必须将 `com.apple.security.network.server` 
  权限添加到 `Runner-Release.entitlements`中。
  否则，您的应用将在 debug 或 profile 
  测试时正常工作，但在 release 构建时将失败。

{{site.alert.end}}

For more information on these topics,
see [App Sandbox][] and [Entitlements][]
on the Apple Developer site.

关于这些话题的更多信息，
请参见 Apple Developer 网站上的 
[App Sandbox][] 和 [Entitlements][]。

[App Sandbox]: https://developer.apple.com/documentation/security/app_sandbox
[App Store]: https://developer.apple.com/app-store/submissions/
[Entitlements]: https://developer.apple.com/documentation/bundleresources/entitlements
[`file_chooser`]: {{site.github}}/google/flutter-desktop-embedding/tree/master/plugins/file_chooser

### Hardened runtime

### Hardened runtime

If you choose to distribute your application outside
of the App Store, you need to notarize your application
for compatibility with macOS 10.15+.
This requires enabling the Hardened Runtime option.
Once you have enabled it, you need a valid signing
certificate in order to build.

如果您选择在 App Store 之外
发布您的应用，您需要确认您的应用
是否兼容 macOS 10.15 以上版本。
这需要启用 Hardened Runtime 选项。
当您启用它后，构建应用时，您需要
一个有效的签名证书。

By default, the entitlements file allows JIT for debug builds but,
as with App Sandbox, you may need to manage other entitlements.
If you have both App Sandbox and Hardened Runtime enabled,
you may need to add multiple entitlements for the same resource.
For instance, microphone access would require both
`com.apple.security.device.audio-input` (for Hardened Runtime)
and `com.apple.security.device.microphone` (for App Sandbox).

默认情况下，权利文件允许 JIT 进行 
debug 模式构建，但是，与 App Sandbox 
一样，您可能需要管理其他权利。

For more information on this topic,
see [Hardened Runtime][] on the Apple Developer site.

有关这个主题的更多信息，
参见 Apple Developer 网站上的 
[Hardened Runtime][]。

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

想要使用支持桌面的插件，
请遵循 [using packages][] 
中的插件使用步骤。
和 iOS 或 Android 一样，Flutter 会
在您的项目里自动添加必要的本地代码。

We recommend the following plugins, which have been
updated to work for desktop apps:

我们推荐以下插件，它们已经
更新，可以在桌面应用中使用:

* [`url_launcher`][]

  [`url_launcher`][]

* [`shared_preferences`][]

  [`shared_preferences`][]

* [`path_provider`][]

  [`path_provider`][]

Use the following links to find all packages on pub.dev
that support desktop apps. These links lists _all_ packages,
not just plugin packages. (Remember that _plugin packages_,
or _plugins_, provide an interface to platform-specific services.)

使用下面的链接，寻找 pub.dev 上
所有支持桌面应用的包。这些链接列出了
**所有**的包，不仅是插件包。（记住这点，
**插件包**或**插件**提供了
一个平台特定的服务接口。）

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

### 写一个插件

When you start building your own plugins,
you’ll want to keep federation in mind.
Federation is the ability to define several different packages,
each targeted at a different set of platforms,
brought together into a single plugin for ease of use by developers.
For example, the Windows implementation of the `url_launcher` is really
`url_launcher_windows`, but a Flutter developer can simply add the
`url_launcher` package to their `pubspec.yaml` as a dependency and the
build process pulls in the correct implementation based on the target platform.
Federation is handy because different teams with different expertise
can build plugin implementations for different platforms.
You can add a new platform implementation to any
endorsed federated plugin on pub.dev, so long as you coordinate
this effort with the original plugin author.

当您开始构建自己的插件时，
您需要记住联合。
联合是定义几个不同包的能力，
其中每个包都针对不同的平台，
将它们合并到一个插件中，这样方便开发人员使用。

比如，Windows 实现的`url_launcher`，
实际是通过 `url_launcher_windows` 完成的，
但是 Flutter 开发者可以在 `pubspec.yaml` 中，
简单地添加 `url_launcher` 包作为依赖，
在构建过程中会基于目标平台引入正确的实现。
联合非常方便，因为具有不同专长的不同团队，
可以为不同的平台构建相应的插件实现。

For more information, including information about endorsed plugins,
see the following resources:

想要了解更多信息，包括关于
已支持的插件信息，请参阅以下资源:

* [Developing packages and plugins][], particularly the
  [Federated plugins][] section.
  
  [开发包和插件][Developing packages and plugins] 
  特别是 [联合插件][] 部分。
  
* [How to write a Flutter web plugin, part 2][],
  covers the structure of federated plugins and
  contains information applicable to desktop
  plugins.
  
  [如何写一个 Flutter web 插件，第 2 部分]
  [How to write a Flutter web plugin, part 2]，
  介绍联合插件的结构，并
  包含适用于桌面插件的信息。
  
* [Modern Flutter Plugin Development][] covers
  recent enhancements to Flutter's plugin support.
  
  [现代 Flutter 插件开发][Modern Flutter Plugin Development]
  介绍了最近对 Flutter 插件支持的增强。
  
* [Federated Plugin proposal][]

  [联合插件提议][Federated Plugin proposal]

[Developing packages and plugins]: /docs/development/packages-and-plugins/developing-packages
[Federated Plugin proposal]: /go/federated-plugins
[Federated plugins]: /docs/development/packages-and-plugins/developing-packages#federated-plugins
[How to write a Flutter web plugin, part 2]: https://medium.com/flutter/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[Modern Flutter Plugin Development]: {{site.medium}}/flutter/modern-flutter-plugin-development-4c3ee015cf5a

## Samples and codelabs

## 示例和 codelabs

[Write a Flutter desktop application][]
: A codelab that walks you through building
a desktop app that integrates the GitHub
GraphQL API with your Flutter app.

[写一个 Flutter 桌面程序][Write a Flutter desktop application]
：这个 codelab 会引导您通过使用 Flutter，
来构建一个集成 GitHub GraphQL API 桌面应用。

You can run the following samples as desktop apps,
as well as download and inspect the source code to
learn more about Flutter desktop support.

您可以运行下面的桌面应用案例，
也可以下载并检查源代码，以了解
更多关于 Flutter 桌面支持的信息。

Flutter Gallery [running web app][], [repo][]
: A samples project hosted on GitHub to help developers
  evaluate and use Flutter. The Gallery consists of a
  collection of Material design widgets, behaviors,
  and vignettes implemented with Flutter.
  You can clone the project and run Gallery as a desktop app
  by following the instructions provided in the [README][].

Flutter Gallery [运行 web 应用]
[running web app]，[仓库地址][repo]：
一个托管在 GitHub 上案例项目，
可以用来帮助开发人员评估和使用 Flutter。
Gallery 的构成部分有：Material design 
widgets 的集合、behaviors 
和用 Flutter 实现的 vignettes。

[Photo Search app][]
: A sample app built as a desktop application that
  uses the following desktop-supported plugins:

[图片搜索应用][Photo Search app]：
一个使用以下桌面支持插件构建的
桌面应用案例。

  * [`file_chooser`][]

    [`file_chooser`][]

  * [`menubar`][]

    [`menubar`][]

  * [`url_launcher`][]

    [`url_launcher`][]

[`menubar`]: {{site.github}}/google/flutter-desktop-embedding/tree/master/plugins/menubar
[Photo Search app]: {{site.repo.organization}}/samples/tree/master/experimental/desktop_photo_search
[README]: {{site.github}}/flutter/gallery#flutter-gallery
[repo]: {{site.github}}/flutter/flutter/tree/master/dev/integration_tests/flutter_gallery
[running web app]: https://flutter.github.io/gallery/#/
[Write a Flutter desktop application]: https://codelabs.developers.google.com/codelabs/flutter-github-graphql-client/index.html

