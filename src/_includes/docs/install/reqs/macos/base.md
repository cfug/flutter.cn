{% case include.target %}
{% when 'mobile-ios' %}
{% assign v-target = "iOS" %}
{% when 'mobile-android' %}
{% assign v-target = "Android" %}
{% else %}
{% assign v-target = include.target %}
{% endcase %}

## Software requirements

## 软件要求

To write and compile Flutter code for {{v-target}},
install the following packages.

要为 {{v-target}} 编写和编译 Flutter 代码，
请安装以下软件包。

### Operating system

### 操作系统

Flutter supports developing on macOS 12 (Monterey) or later.
This guide presumes your Mac runs the `zsh` as your [default shell][zsh-mac].

Flutter 支持在 macOS 12 (Monterey) 或更高版本上开发。
本指南假定你的 Mac [默认运行 `zsh` shell][zsh-mac]。

Some Flutter components require the
[Rosetta 2 translation process][need-rosetta].
If you're developing on an [Apple Silicon][] (ARM) Mac,
install [Rosetta 2][rosetta]:

有些 Flutter 组件需要通过 Rosetta 2 来转换适配（[详情][need-rosetta]）。
如果你在 [Apple silicon][] (ARM) Mac 上进行开发，
请运行以下指令来安装 [Rosetta 2][rosetta]。

```console
$ sudo softwareupdate --install-rosetta --agree-to-license
```

[zsh-mac]: https://support.apple.com/en-us/102360
[Apple Silicon]: https://support.apple.com/en-us/HT211814
[rosetta]: https://support.apple.com/en-us/HT211861
[need-rosetta]: {{site.repo.this}}/pull/7119#issuecomment-1124537969

### Development tools

### 开发工具

Download and install the following packages.

下载并安装以下软件包。

{% case include.target %}
{% when 'desktop','iOS' %}

* [Xcode][] to debug and compile native Swift or Objective-C code.
  The Xcode installation also includes Git to manage Flutter versions
  and your own source code versioning.

  [Xcode][]：调试和编译原生 Swift 或 ObjectiveC 原生代码。
  Xcode 安装会包含 Git，用于管理 Flutter 版本和你的源代码。

* [CocoaPods][] to compile and enable Flutter plugins in your native apps.

  [CocoaPods][]：在原生应用中编译并启用 Flutter 插件。

{% when 'Android' %}

* [Android Studio][] to debug and compile Java or Kotlin code for Android.
  Flutter requires the full version of Android Studio.

  [Android Studio][]：调试和编译 Android 的 Java 或 Kotlin 代码。
  Flutter 需要使用完整版本的 Android Studio。

* [Git][] to manage Flutter versions and your own source code versioning.
  To check if you have `git` installed,
  type `git version` in your Terminal.
  If you need to install `git`, run `xcode-select --install`.

  [Git][]：管理 Flutter 版本和你自己的源代码版本。
  如果需要检查是否安装了 `git`，
  请在终端中输入 `git version`。
  如果需要安装 `git`，
  请输入 `xcode-select --install`。

{% when 'Web' -%}

* [Google Chrome][] to debug JavaScript code for web apps.

  [Google Chrome][]：调试 Web 应用的 JavaScript 代码。

* [Git][] to manage Flutter versions and your own source code versioning.
  To check if you have `git` installed,
  type `git version` in your Terminal.
  If you need to install `git`, run `xcode-select --install`.

  [Git][]：管理 Flutter 版本和你自己的源代码版本。
  如果需要检查是否安装了 `git`，
  请在终端中输入 `git version`。
  如果需要安装 `git`，
  请输入 `xcode-select --install`。

{% endcase %}

The developers of the preceding software provide support for those products.
To troubleshoot installation issues, consult that product's documentation.

上述软件的开发商为这些产品提供支持。
如果需要排除安装的问题，请查阅该产品的文档。

[Git]: https://formulae.brew.sh/formula/git
[Android Studio]: https://developer.android.com/studio/
[Xcode]: {{site.apple-dev}}/xcode/
[CocoaPods]: https://cocoapods.org/
[Google Chrome]: https://www.google.com/chrome/

### Text editor or integrated development environment

### 文本编辑器或集成开发环境 (IDE)

You can build apps with Flutter using any text editor or
integrated development environment (IDE) combined with
Flutter's command-line tools.

你可以使用任意文本编辑器或集成开发环境 (IDE)，
并结合 Flutter 的命令行工具，
来使用 Flutter 构建应用程序。

Using an IDE with a Flutter extension or plugin provides code completion,
syntax highlighting, widget editing assists, debugging, and other features.

使用带有 Flutter 扩展或插件的 IDE 会提供
代码自动补全、语法高亮、widget 编写辅助、调试以及其他功能。

Popular options include:

以下是热门的扩展插件：

* [Visual Studio Code][] with the [Flutter extension for VS Code][].

  [Visual Studio Code][] 使用 [Flutter extension for VS Code][]。

* [Android Studio][] with the [Flutter plugin for IntelliJ][].

  [Android Studio][] 使用 [Flutter plugin for IntelliJ][]。

* [IntelliJ IDEA][] with both
  the [Flutter plugin for IntelliJ][] and the [Android plugin for IntelliJ][].

  [IntelliJ IDEA][] 使用 [Flutter plugin for IntelliJ][] 和 [Android plugin for IntelliJ][]。

:::recommend

The Flutter team recommends installing
[Visual Studio Code][] and the [Flutter extension for VS Code][].
This combination simplifies installing the Flutter SDK.

Flutter 团队推荐安装 [Visual Studio Code][] 
并搭配 [Flutter extension for VS Code][]。
这样搭配可以简化 Flutter SDK 的安装。

:::

[IntelliJ IDEA]: https://www.jetbrains.com/help/idea/installation-guide.html
[Visual Studio Code]: https://code.visualstudio.com/docs/setup/mac
[Flutter extension for VS Code]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[Flutter plugin for IntelliJ]: https://plugins.jetbrains.com/plugin/9212-flutter
[Android plugin for IntelliJ]: https://plugins.jetbrains.com/plugin/22989-android
