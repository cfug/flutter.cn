## Windows setup

## Windows 设置

{{site.alert.warning}}

  **Windows support!**
  As of Flutter 2.10, Windows support is available
  on the `stable` channel! For more information, see
  [Announcing Flutter for Windows][], a free article
  on Medium.

  **Windows 支持！**
  自 Flutter 2.10 起，Windows 的支持已进入 `stable` 渠道！
  你可以查看
  [用 Flutter 构建 Windows 桌面应用程序][Announcing Flutter for Windows]
  文章了解更多信息。

{{site.alert.end}}

[Announcing Flutter for Windows]: {{site.flutter-medium}}announcing-flutter-for-windows-6979d0d01fed

### Additional Windows requirements

### 其他 Windows 需要的内容

{% render docs/help-link.md, location:'win-desktop' %}

For Windows desktop development,
you need the following in addition to the Flutter SDK:

对于 Windows 桌面开发而言，除了 Flutter SDK 以外你还需要以下内容：

* [Visual Studio 2022][] or [Visual Studio Build Tools 2022][]
  When installing Visual Studio or only the Build Tools,
  you need the "Desktop development with C++" workload installed
  for building windows, including all of its default components. 

[Visual Studio 2022][] 或 [Visual Studio 2022 生成工具][Visual Studio Build Tools 2022]
在选择安装 Visual Studio 时或只安装生成工具的时候，
你需要选择「使用 C++ 的桌面开发」，包括其所有默认组件，
以安装必要的 C++ 工具链和 Windows SDK 的头文件。

:::note

**Visual Studio** is different than Visual Studio _Code_.

请注意区分 **Visual Studio** 与 Visual Studio **Code**。

:::

For more information, see [Building Windows apps][].

更多详情请查看
[构建基于 Flutter 的 Windows 应用程序][Building Windows apps]。

[Building Windows apps]: /platform-integration/windows/building
[Visual Studio 2022]: https://visualstudio.microsoft.com/downloads/
[Visual Studio Build Tools 2022]: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
