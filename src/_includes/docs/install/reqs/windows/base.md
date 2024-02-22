{{site.alert.important}}

  Perform this guide in sequence. Skipping steps can cause errors.

  请按顺序完成本指南。跳过步骤可能会导致错误。

{{site.alert.end}}

## System requirements

## 系统要求

To install and run Flutter,
your {{include.os}} environment must meet these requirements:

在安装和运行 Flutter 前，
你的 {{include.os}} 环境必须满足以下要求：

### Hardware requirements

### 硬件要求

Your {{include.os}} Flutter development environment must meet the following
minimal hardware requirements.

你的 {{include.os}} Flutter 开发环境必须满足以下最低硬件要求。

<div class="table-wrapper" markdown="1">
|  <t>Requirement</t><t>要求</t>   |                      <t>Minimum</t><t>最低</t>                       |    <t>Recommended</t><t>推荐</t>      |
|:-----------------------------|:------------------------------------------------------------------------:|:-------------------:|
| x86_64 CPU Cores             | 4                                                                        | 8                   |
| x86_64 CPU 核心数             | 4                                                                        | 8                   |
| Memory in GB                 | 8                                                                        | 16                  |
| 内存 (GB)                    | 8                                                                        | 16                  |
| Display resolution in pixels | WXGA (1366 x 768)                                                        | FHD (1920 x 1080)   |
| 显示器分辨率（像素）          | WXGA (1366 x 768)                                                        | FHD (1920 x 1080)   |
| Free disk space in GB        | {% include docs/install/reqs/windows/storage.md target=include.target %}
| 可用磁盘空间 (GB)             | {% include docs/install/reqs/windows/storage.md target=include.target %}
</div>

### Software requirements

### 软件要求

To write and compile Flutter code for {{include.target}},
you must have the following version of Windows and the listed
software packages.

要为 {{include.target}} 编写和编译 Flutter 代码，
你必须安装以下版本的 Windows 以及所列出的软件包。

#### Operating system
{:.no_toc}

#### 操作系统
{:.no_toc}

Flutter supports {{site.devmin.windows}} or later.
These versions of Windows should include the required
[Windows PowerShell][] {{site.appmin.powershell}} or later.

Flutter 支持 {{site.devmin.windows}} 或更高版本。
这些版本的 Windows 必须包含 
[Windows PowerShell][] {{site.appmin.powershell}} 
或更高版本。

#### Development tools
{:.no_toc}

#### 开发工具
{:.no_toc}

Download and install the Windows version of the following packages:

下载并安装以下软件包的 Windows 版本：

* [Git for Windows][] {{site.appmin.git_win}} or later to manage source code.

  [Git for Windows][] {{site.appmin.git_win}} 或更高的版本来管理源代码。

{% include docs/install/reqs/windows/software.md target=include.target %}

The developers of the preceding software provide support for those products.
To troubleshoot installation issues, consult that product's documentation.

上述软件的开发商为这些产品提供支持。
如果需要排除安装的问题，请查阅该产品的文档。

{% include docs/install/reqs/flutter-sdk/flutter-doctor-precedence.md %}

## Configure a text editor or IDE

## 配置文本编辑器或 IDE

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
  使用 [Flutter plugin for IntelliJ][].

* [IntelliJ IDEA][] {{site.appmin.intellij_idea}} or later
  with the [Flutter plugin for IntelliJ][].

  [IntelliJ IDEA][] {{site.appmin.intellij_idea}} 或更高版本
  使用 [Flutter plugin for IntelliJ][].

{{site.alert.recommend}}

  The Flutter team recommends installing [Visual Studio Code][]
  {{site.appmin.vscode}} or later and the [Flutter extension for VS Code][].
  This combination simplifies installing the Flutter SDK.

  Flutter 团队推荐安装 [Visual Studio Code][] {{site.appmin.vscode}} 
  或更高版本并搭配 [Flutter extension for VS Code][]。
  这样搭配可以简化 Flutter SDK 的安装。

{{site.alert.end}}

[Android Studio]: https://developer.android.com/studio/install
[IntelliJ IDEA]: https://www.jetbrains.com/help/idea/installation-guide.html
[Visual Studio Code]: https://code.visualstudio.com/docs/setup/windows
[Flutter extension for VS Code]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[Flutter plugin for IntelliJ]: https://plugins.jetbrains.com/plugin/9212-flutter
[Windows PowerShell]: https://docs.microsoft.com/powershell/scripting/install/installing-windows-powershell
[Git for Windows]: https://gitforwindows.org/
