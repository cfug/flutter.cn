{% case include.target %}
{% when 'mobile-ios' %}
{% assign v-target = "iOS" %}
{% when 'mobile-android' %}
{% assign v-target = "Android" %}
{% else %}
{% assign v-target = include.target %}
{% endcase %}

{% render docs/install/admonitions/install-in-order.md %}

## Verify system requirements

## 系统要求

To install and run Flutter,
your {{include.os}} environment must meet the following hardware
and software requirements.

在安装和运行 Flutter 前，
你的 {{include.os}} 环境必须满足以下要求：

### Hardware requirements

### 硬件要求

Your {{include.os}} Flutter development environment must meet the following
minimal hardware requirements.

你的 {{include.os}} Flutter 开发环境必须满足以下最低硬件要求。

<div class="table-wrapper">

|  <t>Requirement</t><t>要求</t>   |                      <t>Minimum</t><t>最低</t>                       |    <t>Recommended</t><t>推荐</t>      |
|:-----------------------------|:------------------------------------------------------------------------:|:-------------------:|
| CPU Cores                    | 4                                                                        | 8                   |
| CPU 核心数                    | 4                                                                        | 8                   |
| Memory in GB                 | 8                                                                        | 16                  |
| 内存 (GB)                    | 8                                                                        | 16                  |
| Display resolution in pixels | WXGA (1366 x 768)                                                        | FHD (1920 x 1080)   |
| 显示器分辨率（像素）          | WXGA (1366 x 768)                                                        | FHD (1920 x 1080)   |
| <t>Free disk space in GB</t><t>可用磁盘空间 (GB)</t> | {% include docs/install/reqs/macos/storage.md target=include.target %}

{:.table .table-striped}

</div>

### Software requirements

### 软件要求

To write and compile Flutter code for {{v-target}},
install the following packages.

要为 {{v-target}} 编写和编译 Flutter 代码，
请安装以下软件包。

#### Operating system

#### 操作系统

Flutter supports macOS {{site.devmin.macos}} or later.
This guide presumes your Mac runs the `zsh` as your default shell.

Flutter 支持 macOS {{site.devmin.macos}} 或更高版本。
本指南假定你的 Mac 默认运行 `zsh` shell。

{% include docs/install/reqs/macos/zsh-config.md target=include.target %}

{% include docs/install/reqs/macos/apple-silicon.md %}

#### Development tools

#### 开发工具

Download and install the following packages.

下载并安装以下软件包。

{% include docs/install/reqs/macos/software.md target=include.target %}

The developers of the preceding software provide support for those products.
To troubleshoot installation issues, consult that product's documentation.

上述软件的开发商为这些产品提供支持。
如果需要排除安装的问题，请查阅该产品的文档。

{% render docs/install/reqs/flutter-sdk/flutter-doctor-precedence.md %}

#### Text editor or integrated development environment

#### 文本编辑器或集成开发环境 (IDE)

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
