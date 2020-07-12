---
title: Set up an editor
title: 编辑工具设定
description: Configuring an IDE for Flutter.
description: 为 Flutter 配置 IDE 环境。
prev:
  title: Install
  title: 安装和环境配置
  path: /docs/get-started/install
next:
  title: Test drive
  title: 开发体验初探
  path: /docs/get-started/test-drive
toc: false
---

You can build apps with Flutter using any text editor combined with our
command-line tools. However, we recommend using one of our editor
plugins for an even better experience.
These plugins provide you with code completion, syntax
highlighting, widget editing assists, run & debug support, and more.

你可以使用任意文本编辑器，结合我们的命令行工具来开发 Flutter 应用。
然而，我们推荐使用我们的编辑器插件以获取更好的开发体验。这些插件提供了代码补全、
代码高亮、widget 辅助编辑的功能，以及为项目的运行和调试提供支持等。

Follow the steps below to add an editor plugin for Android Studio,
IntelliJ, VS Code, or Emacs. If you want to use a different editor,
that's OK, skip ahead to the [next step: Test drive][].

参考以下步骤为 Android Studio、IntelliJ 或者 VS Code 添加编辑器插件。
如果你想使用其他的编辑器，请直接打开
[下一节: 开发体验初探][next step: Test drive]，
来查看使用其他文本编辑器配合命令行工具来创建和运行 Flutter 应用。

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="editor-setup" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="androidstudio-tab" href="#androidstudio" role="tab" aria-controls="androidstudio" aria-selected="true">Android Studio and IntelliJ</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="vscode-tab" href="#vscode" role="tab" aria-controls="vscode" aria-selected="false">Visual Studio Code</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="emacs-tab" href="#emacs" role="tab" aria-controls="emacs" aria-selected="false">Emacs</a>
  </li>
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">

<div class="tab-pane active" id="androidstudio" role="tabpanel" aria-labelledby="androidstudio-tab" markdown="1">

## Install Android Studio

## 安装 Android Studio

Android Studio offers a complete, integrated IDE experience for Flutter.

Android Studio 为 Flutter 提供了一个完整的集成开发环境。

* [Android Studio][], version 3.0 or later

  [Android Studio](https://developer.android.google.cn/studio)，3.0 或之后的版本

Alternatively, you can also use IntelliJ:

同时, 你也可以使用 IntelliJ：

* [IntelliJ IDEA Community][], version 2017.1 or later

  [IntelliJ IDEA Community][]， 2017.1 或之后的版本

* [IntelliJ IDEA Ultimate][], version 2017.1 or later

  [IntelliJ IDEA Ultimate][]， 2017.1 或之后的版本

## Install the Flutter and Dart plugins

## 安装 Flutter 和 Dart 插件

To install these:

安装过程如下：

 1.  Start Android Studio.
    
    打开 Android Studio。

 1. Open plugin preferences (**Configure > Plugins** as of
     v3.6.3.0 or later).

    打开插件设置（在 v3.6.3.0 以上的系统打开 **Configure > Plugins**）。

 1. Select the Flutter plugin and
     click **Install**.

    然后选择 Flutter 插件并点击 **安装**。

 1. Click **Yes** when prompted to install the Dart plugin.

    当弹出安装 Dart 插件提示时，点击 **Yes**。

 1. Click **Restart** when prompted.

    当弹出重新启动提示时，点击 **Restart**。

{{site.alert.note}}

  Prior to v3.6.3.0, access plugin preferences as follows:
   
  v3.6.3.0 之前的版本请按照下面这样访问插件设置： 
   
   1. Open plugin preferences (**Preferences > Plugins** on macOS,
      **File > Settings > Plugins** on Windows & Linux).

      打开插件设置（macOS 系统打开 **Preferences > Plugins**，
      Windows 和 Linux 系统打开 **File > Settings > Plugins**）

   1. Select **Marketplace**,  select the Flutter plugin and click
      **Install**.

      选择 **Marketplace**，然后选择 Flutter 插件并点击 **安装**。

{{site.alert.end}}

    

</div>
<div class="tab-pane" id="vscode" role="tabpanel" aria-labelledby="vscode-tab" markdown="1">

## Install VS Code

## 安装 VS Code

VS Code is a light-weight editor with Flutter app execution and debug support.

VS Code 是一个可以运行和调试 Flutter 的轻量级编辑器。

* [VS Code][], latest stable version

  [VS Code][]，最新稳定版本

## Install the Flutter and Dart plugins

## 安装 Flutter 和 Dart 插件

 1. Start VS Code.

    打开 VS Code。

 1. Invoke **View > Command Palette...**.

    打开 **查看 > 命令面板…**。

 1. Type "install", and select **Extensions: Install Extensions**.

    输入 "install"，然后选择 **扩展: 安装扩展**。

 1. Type "flutter" in the extensions search field, select **Flutter** in the list,
    and click **Install**. This also installs the required Dart plugin.

    在扩展搜索输入框中输入 "flutter"，然后在列表中选择 **Flutter** 并单击 **安装**。
    此过程中会自动安装必需的 Dart 插件。

 1. Click **Reload to Activate** to reload VS Code.

    点击 **重新加载** 以重新启动 VS Code。

## Validate your setup with the Flutter Doctor

## 通过 Flutter Doctor 命令验证是否安装成功

 1. Invoke **View > Command Palette...**.

    打开 **查看 > 命令面板…**。

 1. Type "doctor", and select the **Flutter: Run Flutter Doctor**.

    输入 "doctor"，选择 **Flutter: Run Flutter Doctor**。

 1. Review the output in the **OUTPUT** pane for any issues. Make sure to select Flutter from the dropdown in the different Output Options.

    打开 **输出 (OUTPUT)** 面板查看是否有错误，
    确保在不同的输出选项 (Output Options) 的下拉列表中选择了 Flutter。

</div>
<div class="tab-pane" id="emacs" role="tabpanel" aria-labelledby="emacs-tab" markdown="1">

## Install Emacs

Emacs is a lightweight editor with support for Flutter and Dart.

* [Emacs][], latest stable version

## Install the lsp-dart package

For information on how to install and use the package, see the [lsp-dart documentation][].

</div>
</div>{% comment %} End: Tab panes. {% endcomment -%}

## Next step

## 下一节

Take Flutter for a test drive: create a first project, run it, and experience
"hot reload".

开发体验初探：创建第一个项目，运行并体验“热重载”。

[Android Studio]: {{site.android-dev}}/studio
[IntelliJ IDEA Community]: https://www.jetbrains.com/idea/download/
[IntelliJ IDEA Ultimate]: https://www.jetbrains.com/idea/download/
[next step: Test drive]: /docs/get-started/test-drive
[VS Code]: https://code.visualstudio.com/
[Emacs]: https://www.gnu.org/software/emacs/download.html
[lsp-dart documentation]: https://emacs-lsp.github.io/lsp-dart/

