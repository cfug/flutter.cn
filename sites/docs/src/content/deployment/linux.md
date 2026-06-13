---
# title: Build and release a Linux app to the Snap Store
title: 构建和发布为 Linux 应用到 Snap Store
# description: How to prepare for and release a Linux app to the Snap store.
description: 如何在 Snap store 发布一个 Linux 应用
shortTitle: Linux
tags: 发布, Linux
keywords: 发布Flutter应用为Linux应用
ai-translated: true
---

During a typical development cycle,
you test an app using `flutter run` at the command line,
or by using the **Run** and **Debug**
options in your IDE. By default,
Flutter builds a _debug_ version of your app.

在典型的开发周期中，你会在命令行使用 `flutter run` 来测试应用，
或者使用 IDE 中的 **Run** 和 **Debug** 选项。
默认情况下，Flutter 会构建应用的 **debug**（调试）版本。

When you're ready to prepare a _release_ version of your app,
for example to [publish to the Snap Store][snap] or an
[alternative channel](#additional-deployment-resources),
this page can help.

当你准备构建应用的 **release**（发布）版本时，例如要
[发布到 Snap Store][snap] 或某个
[其他渠道](#additional-deployment-resources)，本页能帮到你。

## Prerequisites

## 前提条件

To build and publish to the Snap Store, you need the
following components:

要构建并发布到 Snap Store，你需要以下组件：

* [Ubuntu][] OS, 18.04 LTS (or higher)

  [Ubuntu][] 操作系统，18.04 LTS（或更高版本）

* [Snapcraft][] command line tool

  [Snapcraft][] 命令行工具

* [LXD container manager][]

## Set up the build environment

## 搭建构建环境

Use the following instructions to set up your build environment.

请按以下说明搭建你的构建环境。

### Install snapcraft

### 安装 snapcraft

At the command line, run the following:

在命令行运行以下命令：

```console
$ sudo snap install snapcraft --classic
```

### Install LXD

### 安装 LXD

To install LXD, use the following command:

要安装 LXD，使用以下命令：

```console
$ sudo snap install lxd
```

LXD is required during the snap build process.
Once installed, LXD needs to be configured for use.
The default answers are suitable for most use cases.

snap 构建过程需要用到 LXD。安装完成后，还需对 LXD 进行配置。
默认答案适用于大多数使用场景。

```console
$ sudo lxd init
Would you like to use LXD clustering? (yes/no) [default=no]:
Do you want to configure a new storage pool? (yes/no) [default=yes]:
Name of the new storage pool [default=default]:
Name of the storage backend to use (btrfs, dir, lvm, zfs, ceph) [default=zfs]:
Create a new ZFS pool? (yes/no) [default=yes]:
Would you like to use an existing empty disk or partition? (yes/no) [default=no]:
Size in GB of the new loop device (1GB minimum) [default=5GB]:
Would you like to connect to a MAAS server? (yes/no) [default=no]:
Would you like to create a new local network bridge? (yes/no) [default=yes]:
What should the new bridge be called? [default=lxdbr0]:
What IPv4 address should be used? (CIDR subnet notation, "auto" or "none") [default=auto]:
What IPv6 address should be used? (CIDR subnet notation, "auto" or "none") [default=auto]:
Would you like LXD to be available over the network? (yes/no) [default=no]:
Would you like stale cached images to be updated automatically? (yes/no) [default=yes]
Would you like a YAML "lxd init" preseed to be printed? (yes/no) [default=no]:
```

On the first run, LXD might not be able to connect to its socket:

首次运行时，LXD 可能无法连接到它的 socket：

```console
An error occurred when trying to communicate with the 'LXD'
provider: cannot connect to the LXD socket
('/var/snap/lxd/common/lxd/unix.socket').
```

This means you need to add your username to the LXD
(lxd) group, so log out of your session and then log back in:

这意味着你需要将你的用户名加入 LXD（lxd）用户组，然后登出当前会话并重新登录：

```console
$ sudo usermod -a -G lxd <your username>
```

## Overview of snapcraft

## snapcraft 概览

The `snapcraft` tool builds snaps based on the instructions
listed in a `snapcraft.yaml` file.
To get a basic understanding of snapcraft and its
core concepts, take a look at the [Snap documentation][]
and the [Introduction to snapcraft][].
Additional links and information are listed at the
bottom of this page.

`snapcraft` 工具会根据 `snapcraft.yaml` 文件中列出的指令来构建 snap。
若想对 snapcraft 及其核心概念有基本的了解，请查阅
[Snap 文档][Snap documentation] 与 [snapcraft 简介][Introduction to snapcraft]。
本页底部还列出了更多链接与信息。

## Flutter snapcraft.yaml example

## Flutter snapcraft.yaml 示例

Place the YAML file in your Flutter
project under `<project root>/snap/snapcraft.yaml`.
(And remember that YAML files are sensitive to white space!)
For example:

将该 YAML 文件放在你 Flutter 项目的 `<project root>/snap/snapcraft.yaml` 路径下。
（并且记住，YAML 文件对空白字符很敏感！）例如：

```yaml
name: super-cool-app
version: 0.1.0
summary: Super Cool App
description: Super Cool App that does everything!

confinement: strict
base: core22
grade: stable

slots:
  dbus-super-cool-app: # adjust accordingly to your app name
    interface: dbus
    bus: session
    name: org.bar.super_cool_app # adjust accordingly to your app name and

apps:
  super-cool-app:
    command: super_cool_app
    extensions: [gnome] # gnome includes the libraries required by flutter
    plugs:
    - network
    slots:
      - dbus-super-cool-app
parts:
  super-cool-app:
    source: .
    plugin: flutter
    flutter-target: lib/main.dart # The main entry-point file of the application
```

The following sections explain the various pieces of the YAML file.

以下各节将解释该 YAML 文件的各个组成部分。

### Metadata

### 元数据

This section of the `snapcraft.yaml` file defines and
describes the application. The snap version is
derived (adopted) from the build section.

`snapcraft.yaml` 文件的这一部分用于定义和描述应用。snap 的版本号取自（沿用）构建部分。

```yaml
name: super-cool-app
version: 0.1.0
summary: Super Cool App
description: Super Cool App that does everything!
```

### Grade, confinement, and base

### Grade、confinement 与 base

This section defines how the snap is built.

这一部分定义 snap 的构建方式。

```yaml
confinement: strict
base: core22
grade: stable
```

**Grade**
<br/> Specifies the quality of the snap; this is relevant for
  the publication step later.

**Grade**
<br/> 指定 snap 的质量等级；这与后续的发布步骤相关。

**Confinement**
<br/> Specifies what level of system resource access the snap
  will have once installed on the end-user system.
  Strict confinement limits the application access to
  specific resources (defined by plugs in the `app` section).

**Confinement**
<br/> 指定 snap 安装到终端用户系统后所拥有的系统资源访问级别。
  strict（严格）限制会将应用的访问限制在特定资源上（由 `app` 部分中的 plug 定义）。

**Base**
<br/> Snaps are designed to be self-contained applications,
  and therefore, they require their own private core root
  filesystem known as `base`. The `base` keyword specifies
  the version used to provide the minimal set of common libraries,
  and mounted as the root filesystem for the application at runtime.

**Base**
<br/> snap 被设计为自包含的应用，因此它们需要拥有自己私有的核心根文件系统，即 `base`。
  `base` 关键字指定用于提供最小公共库集合的版本，并在运行时作为应用的根文件系统挂载。

### Apps

This section defines the application(s) that exist inside the snap.
There can be one or more applications per snap. This example
has a single application&mdash;super_cool_app.

这一部分定义 snap 内部存在的应用。每个 snap 可以有一个或多个应用。
本示例只有一个应用——super_cool_app。

```yaml
apps:
  super-cool-app:
    command: super_cool_app
    extensions: [gnome]
```

**Command**
<br/> Points to the binary, relative to the snap's root,
  and runs when the snap is invoked.

**Command**
<br/> 指向相对于 snap 根目录的二进制文件，在 snap 被调用时运行。

**Extensions**
<br/> A list of one or more extensions. Snapcraft extensions
  are reusable components that can expose sets of libraries
  and tools to a snap at build and runtime,
  without the developer needing to have specific knowledge
  of included frameworks. The `gnome` extension exposes
  the GTK 3 libraries to the Flutter snap. This ensures a
  smaller footprint and better integration with the system.

**Extensions**
<br/> 一个或多个扩展的列表。Snapcraft 扩展是可复用的组件，
  能在构建和运行时向 snap 暴露成组的库与工具，而开发者无需了解所含框架的具体细节。
  `gnome` 扩展会向 Flutter snap 暴露 GTK 3 库，从而确保更小的体积以及与系统更好的集成。

**Plugs**
<br/> A list of one or more plugs for system interfaces.
  These are required to provide necessary functionality
  when snaps are strictly confined. This Flutter snap needs
  access to the network.

**Plugs**
<br/> 一个或多个系统接口 plug 的列表。当 snap 处于严格限制状态时，需要这些 plug 来提供必要的功能。
  这个 Flutter snap 需要访问网络。

**DBus interface**
<br/> The [DBus interface][] provides a way for snaps to
  communicate over DBus. The snap providing the DBus
  service declares a slot with the well-known DBus name
  and which bus it uses. Snaps wanting to communicate
  with the providing snap's service declare a plug for
  the providing snap. Note that a snap declaration is
  needed for your snap to be delivered via the snap store
  and claim this well-known DBus name (simply upload the
  snap to the store and request a manual review and
  a reviewer will take a look).

**DBus interface**
<br/> [DBus 接口][DBus interface] 为 snap 提供了一种通过 DBus 通信的方式。
  提供 DBus 服务的 snap 会声明一个带有知名 DBus 名称及其所用总线的 slot。
  想要与提供方 snap 的服务通信的 snap，则为该提供方 snap 声明一个 plug。
  请注意，你的 snap 需要一份 snap 声明，才能通过 snap store 分发并占用这个知名 DBus 名称
  （只需将 snap 上传到商店并申请人工审核，审核人员便会查看）。

  When a providing snap is installed, snapd will
  generate security policy that will allow it to
  listen on the well-known DBus name on the specified
  bus. If the system bus is specified, snapd will also
  generate DBus bus policy that allows 'root' to own
  the name and any user to communicate with the
  service. Non-snap processes are allowed to
  communicate with the providing snap following
  traditional permissions checks. Other (consuming)
  snaps might only communicate with the providing
  snap by connecting the snaps' interface.

  当提供方 snap 被安装时，snapd 会生成安全策略，允许它在指定总线上监听该知名 DBus 名称。
  如果指定的是系统总线，snapd 还会生成 DBus 总线策略，允许 'root' 占用该名称，
  并允许任何用户与该服务通信。非 snap 进程可在通过传统权限检查后与提供方 snap 通信。
  其他（消费方）snap 则只能通过连接 snap 的接口来与提供方 snap 通信。

```plaintext
dbus-super-cool-app: # adjust accordingly to your app name
  interface: dbus
  bus: session
  name: dev.site.super_cool_app
```

### Parts

This section defines the sources required to
assemble the snap.

这一部分定义组装 snap 所需的来源。

Parts can be downloaded and built automatically using plugins.
Similar to extensions, snapcraft can use various plugins
(such as Python, C, Java, and Ruby) to assist in the
building process. Snapcraft also has some special plugins.

part 可以使用插件自动下载并构建。与扩展类似，snapcraft 可以使用各种插件
（如 Python、C、Java 和 Ruby）来辅助构建过程。snapcraft 还有一些特殊的插件。

**nil** plugin
<br/> Performs no action and the actual build process is
  handled using a manual override.

**nil** 插件
<br/> 不执行任何操作，实际的构建过程通过手动覆盖来处理。

**flutter** plugin
<br/> Provides the necessary Flutter SDK tools so you can
  use it without having to manually download and set up
  the build tools.

**flutter** 插件
<br/> 提供必要的 Flutter SDK 工具，让你无需手动下载和配置构建工具即可使用。

```yaml
parts:
  super-cool-app:
    source: .
    plugin: flutter
    flutter-target: lib/main.dart # The main entry-point file of the application
```

## Desktop file and icon

## 桌面文件与图标

Desktop entry files are used to add an application
to the desktop menu. These files specify the name and
icon of your application, the categories it belongs to,
related search keywords and more. These files have the
extension .desktop and follow the XDG Desktop Entry
Specification version 1.1.

桌面入口文件用于将应用添加到桌面菜单。这些文件指定应用的名称和图标、所属类别、
相关的搜索关键字等等。这些文件的扩展名为 .desktop，遵循 XDG Desktop Entry 规范 1.1 版。

### Flutter super-cool-app.desktop example

### Flutter super-cool-app.desktop 示例

Place the .desktop file in your Flutter project
under `<project root>/snap/gui/super-cool-app.desktop`.

将 .desktop 文件放在你 Flutter 项目的 `<project root>/snap/gui/super-cool-app.desktop` 路径下。

**Notice**: icon and .desktop file name must be the same as your app name in
yaml file!

**注意**：图标和 .desktop 文件名必须与 yaml 文件中你的应用名称一致！

For example:

例如：

```yaml
[Desktop Entry]
Name=Super Cool App
Comment=Super Cool App that does everything
Exec=super-cool-app
Icon=${SNAP}/meta/gui/super-cool-app.png # Replace name with your app name.
Terminal=false
Type=Application
Categories=Education; # Adjust accordingly your snap category.
```

Place your icon with .png extension in your Flutter
project under `<project root>/snap/gui/super-cool-app.png`.

将扩展名为 .png 的图标放在你 Flutter 项目的 `<project root>/snap/gui/super-cool-app.png` 路径下。

## Build the snap

## 构建 snap

Once the `snapcraft.yaml` file is complete,
run `snapcraft` as follows from the root directory
of the project.

`snapcraft.yaml` 文件完成后，从项目根目录按以下方式运行 `snapcraft`。

To use the Multipass VM backend:

要使用 Multipass 虚拟机后端：

```console
$ snapcraft
```

To use the LXD container backend:

要使用 LXD 容器后端：

```console
$ snapcraft --use-lxd
```

## Test the snap

## 测试 snap

Once the snap is built, you'll have a `<name>.snap` file
in your root project directory.

snap 构建完成后，你的项目根目录下会出现一个 `<name>.snap` 文件。

$ sudo snap install ./super-cool-app_0.1.0_amd64.snap --dangerous

## Publish

## 发布

You can now publish the snap.
The process consists of the following:

现在你可以发布该 snap 了。整个过程包含以下步骤：

1. Create a developer account at [snapcraft.io][], if you
   haven't already done so.

   若你尚未创建，请在 [snapcraft.io][] 创建一个开发者账号。

1. Register the app's name. Registration can be done
   either using the Snap Store Web UI portal, or from the
   command line, as follows:

   注册应用名称。注册可以通过 Snap Store 的 Web UI 门户完成，
   也可以通过命令行完成，如下：

   ```console
   $ snapcraft login
   $ snapcraft register
   ```

1. Release the app. After reading the next section
   to learn about selecting a Snap Store channel,
   push the snap to the store:

   发布应用。
   阅读下一节了解如何选择 Snap Store 渠道后，
   将 snap 推送到商店：

   ```console
   $ snapcraft upload --release=<channel> <file>.snap
   ```

### Snap Store channels

### Snap Store 渠道

The Snap Store uses channels to differentiate among
different versions of snaps.

Snap Store 使用渠道来区分 snap 的不同版本。

The `snapcraft upload` command uploads the snap file to
the store. However, before you run this command,
you need to learn about the different release channels.
Each channel consists of three components:

`snapcraft upload` 命令会将 snap 文件上传到商店。不过，在运行该命令之前，
你需要先了解不同的发布渠道。每个渠道由三个部分组成：

**Track**
<br/> All snaps must have a default track called latest.
  This is the implied track unless specified otherwise.

**Track**
<br/> 所有 snap 都必须有一个名为 latest 的默认 track（轨道）。除非另行指定，否则就是这个隐含的 track。

**Risk**
<br/> Defines the readiness of the application.
  The risk levels used in the snap store are:
  `stable`, `candidate`, `beta`, and `edge`.

**Risk**
<br/> 定义应用的成熟度。snap store 使用的 risk（风险）级别有：
  `stable`、`candidate`、`beta` 和 `edge`。

**Branch**
<br/> Allows creation of short-lived snap
  sequences to test bug-fixes.

**Branch**
<br/> 允许创建短期存在的 snap 序列，用于测试 bug 修复。

### Snap Store automatic review

### Snap Store 自动审核

The Snap Store runs several automated checks against
your snap. There might also be a manual review,
depending on how the snap was built, and if there are
any specific security concerns. If the checks pass
without errors, the snap becomes available in the store.

Snap Store 会对你的 snap 运行若干自动检查。根据 snap 的构建方式以及是否存在特定的安全顾虑，
还可能进行人工审核。如果检查无误通过，该 snap 便会在商店中上架。

## Additional snapcraft resources

## 更多 snapcraft 资源

You can learn more from the following links on the
[snapcraft.io][] site:

你可以从 [snapcraft.io][] 站点上的以下链接了解更多：

* [Channels][]

  [渠道 (Channels)][Channels]

* [Environment variables][]

  [环境变量 (Environment variables)][Environment variables]

* [Interface management][]

  [接口管理 (Interface management)][Interface management]

* [Parts environment variables][]

  [Parts 环境变量 (Parts environment variables)][Parts environment variables]

* [Releasing to the Snap Store][]

  [发布到 Snap Store (Releasing to the Snap Store)][Releasing to the Snap Store]

* [Snapcraft extensions][]

  [Snapcraft 扩展 (Snapcraft extensions)][Snapcraft extensions]

* [Supported plugins][]

  [支持的插件 (Supported plugins)][Supported plugins]

## Additional deployment resources

## 更多部署资源

### [fastforge][]

> An all-in-one Flutter application packaging and distribution tool,
providing you with a one-stop solution to meet various distribution needs.

> 一个集打包与分发于一体的 Flutter 应用工具，
为你提供满足各种分发需求的一站式解决方案。

Supports popular packaging formats like, appimage, deb, pacman, rpm, and more.

支持 appimage、deb、pacman、rpm 等常见的打包格式。

### [flatpak-flutter][]

> Flatpak manifest tooling for the offline build of Flutter apps.

> 用于离线构建 Flutter 应用的 Flatpak manifest 工具。

Supports Flatpak preparation for publishing on [Flathub][].

支持为在 [Flathub][] 上发布做 Flatpak 准备工作。

[Environment variables]: https://snapcraft.io/docs/environment-variables
[Flutter wiki]: {{site.repo.flutter}}/tree/main/docs
[Interface management]: https://snapcraft.io/docs/interface-management
[DBus interface]: https://snapcraft.io/docs/dbus-interface
[Introduction to snapcraft]: https://snapcraft.io/blog/introduction-to-snapcraft
[LXD container manager]: https://linuxcontainers.org/lxd/downloads/
[Multipass virtualization manager]: https://multipass.run/
[Parts environment variables]: https://snapcraft.io/docs/parts-environment-variables
[Releasing to the Snap Store]: https://snapcraft.io/docs/releasing-to-the-snap-store
[Channels]: https://docs.snapcraft.io/channels
[snap]: https://snapcraft.io/store
[Snap documentation]: https://snapcraft.io/docs
[Snapcraft]: https://snapcraft.io/snapcraft
[snapcraft.io]: https://snapcraft.io/
[Snapcraft extensions]: https://snapcraft.io/docs/snapcraft-extensions
[Supported plugins]: https://snapcraft.io/docs/supported-plugins
[Ubuntu]: https://ubuntu.com/download/desktop
[fastforge]: {{site.github}}/fastforgedev/fastforge
[flatpak-flutter]: {{site.github}}/TheAppgineer/flatpak-flutter
[Flathub]: https://flathub.org
