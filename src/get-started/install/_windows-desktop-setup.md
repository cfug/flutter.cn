## Windows setup

## Windows 设置

{{site.alert.warning}}
  **Beta (Win32) and Alpha (UWP)!**
  This area covers Windows desktop support,
  which is available in beta release (Win32)
  and alpha release (UWP).
  
  **Win32 的 Beta 支持和 UWP 的 Alpha 版支持**
  本页涵盖的桌面支持，描述的是对 Windows (Win32) 的 Beta 支持，
  以及对 UWP 的 Alpha 支持。

  The UWP variant is community supported.

  Windows UWP 是由社区 (非官方) 提供支持的。

  You can try a beta snapshot of Win32 desktop support
  on the stable channel, or you can keep up
  with the latest changes to desktop on the
  `beta` channel. For Windows UWP you need
  to be on the `master` channel.

  你可以在 `stable` 渠道尝试这个 Beta 版的桌面支持，
  或者可以切换到使用 `beta` 渠道，使用最新的桌面版支持。
  如果要跟进 Windows UWP 最新版，需要使用 `master` 渠道。

  For more information, see the **Desktop**
  section in [What's new in Flutter 2.2][],
  a free article on Medium.

  更多有关 **桌面版** 的详细信息，请查看文章：
  [Flutter 2.2 带来了哪些更新][What's new in Flutter 2.2 CN]。
  
{{site.alert.end}}

[What's new in Flutter 2.2]: {{site.flutter-medium}}/whats-new-in-flutter-2-2-fd00c65e2039
[What's new in Flutter 2.2 CN]: {{site.url}}/posts/whats-new-in-flutter-2-2

### Additional Windows requirements

### 其他 Windows 需要的内容

For Windows desktop development,
you need the following in addition to the Flutter SDK:

对于 Windows 桌面开发来说，除了 Flutter SDK 以外你还需要以下内容：

* [Visual Studio 2022][] for Flutter 2.9 beta and newer,
  [Visual Studio 2019][] for Flutter 2.8.1 and older.
  Note, Visual Studio is different to Visual Studio _Code_.
  For Win32 you need the "Desktop development with C++" 
  workload installed, including all of its default components. 
  For UWP you need the "Universal Windows Platform development"
  workload installed, with the optional UWP C++ tools.

  Flutter 2.9 Beta 和更新的版本使用 [Visual Studio 2022][]，
  2.8.1 和之前的版本使用 [Visual Studio 2019][]
  （请别把它与 Visual Studio **Code** 搞混了）
  做 Win32 开发的话，你需要安装 “Desktop development with C++” 
  工作负载，包括其所有默认组件。
  如果是 UWP 开发的话，你需要安装 "Universal Windows Platform development"
  工作负载，包括可选的 UWP C++ 工具。

[Visual Studio 2022]: https://visualstudio.microsoft.com/zh-hans/downloads/
[Visual Studio 2019]: https://visualstudio.microsoft.com/zh-hans/vs/older-downloads/

### Enable desktop support

### 启用桌面版支持

At the command line,
perform the following command to enable Win32 desktop support:

在命令行中执行以下命令以开启 Win32 桌面端支持：

```terminal
$ flutter config --enable-windows-desktop
```

For Windows UWP desktop support perform the following commands to switch to
the `master` channel, upgrade Flutter, and enable UWP.

Windows UWP 桌面支持需要先升级到 `dev` 发布渠道，然后启用 UWP。

```terminal
$ flutter channel master
$ flutter upgrade
$ flutter config --enable-windows-uwp-desktop
```

For more information, see [Desktop support for Flutter][]

更多详情请查看 [Flutter 的桌面端支持][Desktop support for Flutter]

[Desktop support for Flutter]: {{site.main_url}}/desktop
