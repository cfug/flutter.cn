## Software requirements

## 软件要求

To write and compile Flutter code for {{include.target}},
you must have the following version of Windows and the listed
software packages.

要为 {{include.target}} 编写和编译 Flutter 代码，
你必须安装以下版本的 Windows 以及所列出的软件包。

### 操作系统

Flutter supports developing on 64-bit versions of Windows 10 and 11.

Flutter 支持在 64 位版本的 Windows 10 和 11 上进行开发。

### Development tools

### 开发工具

Download and install the Windows version of the following packages:

下载并安装以下软件包的 Windows 版本：

* [Git for Windows][] to manage Flutter versions and
  your own source code versioning.

  [Git for Windows][]：管理 Flutter 版本和你自己的源代码版本。

{% if include.target == 'desktop' -%}

* [Visual Studio 2022][] to debug and compile native C++ Windows code.
  Make sure to install the **Desktop development with C++** workload.
  This enables building Windows apps, including all of its default components.
  **Visual Studio** is an IDE separate from **[Visual Studio _Code_][]**.

  [Visual Studio 2022][] 调试和编译原生 C++ Windows 代码。
  确保安装 **Desktop development with C++**。
  这样就可以构建 Windows 应用以及所有默认组件。
  **Visual Studio** 是独立于 **[Visual Studio _Code_][]** 的 IDE。

{% elsif include.target == 'Android' -%}

* [Android Studio][] to debug and compile Java or Kotlin code for Android.

  [Android Studio][]：调试和编译 Android 的 Java 或 Kotlin 代码。

{% elsif include.target == 'Web' -%}

* [Google Chrome][] to debug JavaScript code for web apps.

  [Google Chrome][]：调试 Web 应用的 JavaScript 代码。

{% else -%}

* [Visual Studio 2022][] with the **Desktop development with C++** workload
  or [Build Tools for Visual Studio 2022][].
  This enables building Windows apps, including all of its default components.
  **Visual Studio** is an IDE separate from **[Visual Studio _Code_][]**.

  [Visual Studio 2022][] 安装 **Desktop development with C++**
  或者使用 [Visual Studio 2022 生成工具][Build Tools for Visual Studio 2022]。
  这样就可以构建 Windows 应用以及所有默认组件。
  **Visual Studio** 是独立于 **[Visual Studio _Code_][]** 的 IDE。

* [Android Studio][] to debug and compile Java or Kotlin code for Android.

  [Android Studio][]：调试和编译 Android 的 Java 或 Kotlin 代码。

* The latest version of [Google Chrome][] to debug JavaScript code for web apps.

  最新版本的 [Google Chrome][] 调试 Web 应用的 JavaScript 代码。

{% endif -%}

The developers of the preceding software provide support for those products.
To troubleshoot installation issues, consult that product's documentation.

上述软件的开发商为这些产品提供支持。
如果需要排查安装的问题，请查阅该产品的文档。

[Android Studio]: https://developer.android.com/studio/
[Visual Studio 2022]: https://learn.microsoft.com/visualstudio/install/install-visual-studio?view=vs-2022
[Build Tools for Visual Studio 2022]: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
[Google Chrome]: https://www.google.com/chrome/dr/download/
[Visual Studio _Code_]: https://code.visualstudio.com/

### Configure a text editor or IDE

### 配置文本编辑器或 IDE

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

* [IntelliJ IDEA][] with the [Flutter plugin for IntelliJ][].

  [IntelliJ IDEA][] 使用 [Flutter plugin for IntelliJ][]。

:::recommend

The Flutter team recommends installing
[Visual Studio Code][] and the [Flutter extension for VS Code][].
This combination simplifies installing the Flutter SDK.

Flutter 团队推荐安装 
[Visual Studio Code][] 并搭配 [Flutter extension for VS Code][]。
这样搭配可以简化 Flutter SDK 的安装。

:::

[IntelliJ IDEA]: https://www.jetbrains.com/help/idea/installation-guide.html
[Visual Studio Code]: https://code.visualstudio.com/docs/setup/windows
[Flutter extension for VS Code]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[Flutter plugin for IntelliJ]: https://plugins.jetbrains.com/plugin/9212-flutter
[Windows PowerShell]: https://docs.microsoft.com/powershell/scripting/install/installing-windows-powershell
[Git for Windows]: https://gitforwindows.org/
