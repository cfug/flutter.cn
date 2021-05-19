## Windows setup

## Windows 体系

{{site.alert.warning}}

  **Beta!**
  This area covers desktop support,
  which is available as a beta release.
  Beta support still has notable feature gaps,
  including accessibility support.
  You can try a beta snapshot of desktop support
  on the stable channel, or you can keep up
  with the latest changes to desktop on the
  beta channel.
  For more information, see the **Desktop**
  section in [What's new in Flutter 2][],
  a free article on Medium.

  **正式进入 Beta 版本!**
  该部分包含了桌面端的支持已经正式发布 beta 版本。
  即便是 Beta 版本，仍还是缺少一些功能支持，例如无障碍功能。
  你可以在 stable channnel 上尝试 beta 桌面版支持，
  或者也可以在 beta channel 上获得最新桌面版的更新。
  更多有关**桌面版**的详细信息，请查看 Medium 上这篇
  [Flutter 2 带来了哪些更新][What's new in Flutter 2] 文章。

{{site.alert.end}}

[What's new in Flutter 2]: {{site.flutter-medium}}/whats-new-in-flutter-2-0-fe8e95ecc65

### Additional Windows requirements

### 其他 Windows 需要的内容

For Windows desktop development, you need the following in addition to the Flutter SDK:

对于 Windows 桌面开发来说，除了 Flutter SDK 以外你还需要以下内容：

* [Visual Studio 2019][] (not to be confused with
  Visual Studio _Code_) with the
  "Desktop development with C++" workload installed,
  including all of its default components

  [Visual Studio 2019][]（请别把它与 Visual Studio _Code_ 搞混了）
  以及安装了 “Desktop development with C++” 工作负载，
  包括其所有默认组件

[Visual Studio 2019]: https://visualstudio.microsoft.com/downloads/

### Enable desktop support

### 开启桌面端支持

At the command line, perform the following command to enable desktop support

在命令行中执行以下命令以开启桌面端支持

```terminal
$ flutter config --enable-windows-desktop
```

For more information, see [Desktop support for Flutter][]

更多详情请查看 [Flutter 的桌面端支持][Desktop support for Flutter]

[Desktop support for Flutter]: https://flutter.dev/desktop