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

{% render docs/install/admonitions/install-dart.md %}

### Operating system

### 操作系统

Flutter supports developing on macOS {{site.devmin.macos}} or later.
This guide presumes your Mac runs the `zsh` as your default shell.

Flutter 支持在 macOS {{site.devmin.macos}} 或更高版本上开发。
本指南假定你的 Mac 默认运行 `zsh` shell。

{% include docs/install/reqs/macos/zsh-config.md target=include.target %}

{% include docs/install/reqs/macos/apple-silicon.md %}

### Development tools

### 开发工具

Download and install the following packages.

下载并安装以下软件包。

{% include docs/install/reqs/macos/software.md target=include.target %}

The developers of the preceding software provide support for those products.
To troubleshoot installation issues, consult that product's documentation.

上述软件的开发商为这些产品提供支持。
如果需要排除安装的问题，请查阅该产品的文档。

{% render docs/install/reqs/flutter-sdk/flutter-doctor-precedence.md %}

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

* [Visual Studio Code][] {{site.appmin.vscode}} or later
  with the [Flutter extension for VS Code][].

  [Visual Studio Code][] {{site.appmin.vscode}} 或更高版本
  使用 [Flutter extension for VS Code][]。

* [Android Studio][] {{site.appmin.android_studio}} or later
  with the [Flutter plugin for IntelliJ][].

  [Android Studio][] {{site.appmin.android_studio}} 或更高版本
  使用 [Flutter plugin for IntelliJ][]。

* [IntelliJ IDEA][] {{site.appmin.intellij_idea}} or later
  with both the [Flutter plugin for IntelliJ][] and
  the [Android plugin for IntelliJ][].

  [IntelliJ IDEA][] {{site.appmin.intellij_idea}} 或更高版本
  使用 [Flutter plugin for IntelliJ][] 和 [Android plugin for IntelliJ][]。

:::recommend

The Flutter team recommends installing
[Visual Studio Code][] {{site.appmin.vscode}} or later and the
[Flutter extension for VS Code][].
This combination simplifies installing the Flutter SDK.

Flutter 团队推荐安装 [Visual Studio Code][] {{site.appmin.vscode}} 
或更高版本并搭配 [Flutter extension for VS Code][]。
这样搭配可以简化 Flutter SDK 的安装。

:::

[Android Studio]: https://developer.android.com/studio/install
[IntelliJ IDEA]: https://www.jetbrains.com/help/idea/installation-guide.html
[Visual Studio Code]: https://code.visualstudio.com/docs/setup/mac
[Flutter extension for VS Code]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[Flutter plugin for IntelliJ]: https://plugins.jetbrains.com/plugin/9212-flutter
[Android plugin for IntelliJ]: https://plugins.jetbrains.com/plugin/22989-android
