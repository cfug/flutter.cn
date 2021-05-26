## Windows setup

## Windows 设置

{{site.alert.warning}}

  **Beta (Win32) and Dev (UWP)!**
  This area covers Windows desktop support,
  which is available in beta release (Win32)
  and alpha release (UWP).
  
  **Win32 的 Beta 支持和 UWP 的 Dev 版支持**
  本页涵盖的桌面支持，描述的是对 Windows (Win32) 的 Beta 支持，
  以及对 UWP 的 Alpha 支持。

  The Win32 variant still has notable feature gaps,
  including accessibility support, while the
  UWP variant is still in very active development.
  
  Beta 支持仍有较为明显的功能差距，包括无障碍功能的支持等。
  同时，Windows UWP 的 Alpha 版本仍在非常积极的开发中。

  You can try a beta snapshot of Win32 desktop support
  on the stable channel, or you can keep up
  with the latest changes to desktop on the
  `beta` channel. For Windows UWP you need
  to be on the `dev` channel.
  
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

### Additional Windows requirements

### 其他 Windows 需要的内容

For Windows desktop development, you need the following in addition to the Flutter SDK:

对于 Windows 桌面开发来说，除了 Flutter SDK 以外你还需要以下内容：

* [Visual Studio 2019][] (not to be confused with
  Visual Studio _Code_). For Win32 you need the
  "Desktop development with C++" workload installed,
  including all of its default components. For UWP
  you need the "Universal Windows Platform development"
  workload installed, with the optional UWP C++ tools.

  [Visual Studio 2019][]（请别把它与 Visual Studio _Code_ 搞混了）
  以及安装了 “Desktop development with C++” 工作负载，
  包括其所有默认组件

[Visual Studio 2019]: https://visualstudio.microsoft.com/downloads/

### Enable desktop support

### 启用桌面版支持

At the command line, perform the following command
to enable Win32 desktop support

在命令行中执行以下命令以开启 Win32 桌面端支持：

```terminal
$ flutter config --enable-windows-desktop
```

For Windows UWP desktop support perform the following commands to switch to
the `dev` channel, upgrade Flutter, and enable UWP.

```terminal
$ flutter channel dev
$ flutter upgrade
$ flutter config --enable-windows-uwp-desktop
```

For more information, see [Desktop support for Flutter][]

更多详情请查看 [Flutter 的桌面端支持][Desktop support for Flutter]

[Desktop support for Flutter]: /desktop
