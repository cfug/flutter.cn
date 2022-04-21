## Linux setup

## Linux 体系

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

### Additional Linux requirements

### 其他 Linux 需要的内容

For Linux desktop development,
you need the following in addition to the Flutter SDK:

对于开发 Linux 桌面端应用来说，除了 Flutter SDK 以外你还需要以下内容：

* [Clang][]
* [CMake][]
* [GTK development headers][]
* [Ninja build][]
* [pkg-config][]
* [liblzma-dev][] This might be necessary

  [liblzma-dev][] 可能是必需的

Run the following command

运行以下命令进行安装：

```terminal
$ sudo apt-get install clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev
```

[Clang]: https://clang.llvm.org/
[CMake]: https://cmake.org/
[GTK development headers]: https://developer.gnome.org/gtk3/3.2/gtk-getting-started.html
[Installing snapd]: https://snapcraft.io/docs/installing-snapd
[Ninja build]: https://ninja-build.org/
[pkg-config]: https://www.freedesktop.org/wiki/Software/pkg-config/
[liblzma-dev]: https://packages.debian.org/sid/liblzma-dev

### Enable desktop support

### 开启桌面端支持

At the command line, perform the following command to enable desktop support

在命令行中执行以下命令以开启桌面端支持

```terminal
$ flutter config --enable-linux-desktop
```

For more information, see [Desktop support for Flutter][]

更多详情请查看 [Flutter 的桌面端支持][Desktop support for Flutter]

[Desktop support for Flutter]: {{site.main_url}}/desktop