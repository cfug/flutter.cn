## Linux setup

## Linux 安装

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
