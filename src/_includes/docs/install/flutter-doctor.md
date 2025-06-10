
## Check your development setup

## 检查你的开发配置

{% render docs/help-link.md, location:'win-doctor' %}

{% assign compiler = '' %}
{% assign compiler-cn = '' %}

{% case include.devos %}
{% when 'Windows' -%}
   {% assign terminal='PowerShell' %}
   {% assign prompt='PS C:\>' %}
{% when 'macOS' -%}
   {% assign terminal='Terminal' %}
   {% assign prompt='$' %}
{% else -%}
   {% assign terminal='shell' %}
   {% assign prompt='$' %}
{% endcase -%}

{% case include.target %}
{% when 'macOS','Windows','Linux' %}
{% assign work-target = include.target | append: ' desktop' %}
{% when 'desktop' %}
{% assign work-target = include.devos | append: ' desktop' %}
{% else %}
{% assign work-target = include.target | append: ' on ' | append: include.devos %}
{% endcase %}
{% case work-target %}
{% when 'macOS desktop','Web on macOS','iOS on macOS' %}
{% assign compiler = 'Xcode' %}
{% when 'Android on Windows','Android on macOS','Android on Linux' %}
{% assign compiler = 'Android Studio' %}
{% when 'Linux desktop','Web on Linux' %}
{% assign compiler = 'one of the Linux libraries' %}
{% when 'Windows desktop','Web on Windows' %}
{% assign compiler = 'Visual Studio' %}
{% endcase %}

{% case include.target %}
{% when 'macOS','Windows','Linux' %}
{% assign work-target-cn = include.target | append: ' 桌面端' %}
{% when 'desktop' %}
{% assign work-target-cn = include.devos | append: ' 桌面端' %}
{% else %}
{% assign work-target-cn = include.devos | append: ' 上的 ' | append: include.target %}
{% endcase %}
{% case work-target-cn %}
{% when 'macOS 桌面端','macOS 上的 Web','macOS 上的 iOS' %}
{% assign compiler-cn = 'Xcode' %}
{% when 'Windows 上的 Android','macOS 上的 Android','Linux 上的 Android' %}
{% assign compiler-cn = 'Android Studio' %}
{% when 'Linux 桌面端','Linux 上的 Web' %}
{% assign compiler-cn = 'Linux 库中的一个' %}
{% when 'Windows 桌面端','Windows 上的 Web' %}
{% assign compiler-cn = 'Visual Studio' %}
{% endcase %}

### Run Flutter doctor

### 运行 Flutter doctor

The `flutter doctor` command validates that all components of a
complete Flutter development environment for {{include.devos}}.

`flutter doctor` 指令将检查 {{include.devos}} 完整的 
Flutter 开发环境的所有组件。

1. Open {{terminal}}.

   打开 {{terminal}}。

1. To verify your installation of all the components,
   run the following command.

   要检查所有组件的安装情况，
   请运行以下指令。

   ```console
   {{prompt}} flutter doctor
   ```

As you chose to develop for {{include.target}},
you do not need _all_ components.
If you followed this guide, the command should output
`[✓]` for the tooling and platforms you set up.

由于你选择为 {{include.target}} 进行开发，
因此不需要 **所有** 组件。
如果你遵循本指南，该指令会将你设置完成的工具和平台输出 `[✓]`。

### Troubleshoot Flutter doctor issues

### 解决 Flutter doctor 的问题 

When the `flutter doctor` command returns an error, it could be for Flutter,
VS Code, {{compiler}}, the connected device, or network resources.

当 `flutter doctor` 指令返回错误时，
可能是 Flutter、VS Code、{{compiler-cn}}、连接的设备或者
网络资源出错。

If the `flutter doctor` command returns an error for any of these components,
run it again with the verbose flag.

如果 `flutter doctor` 指令返回这些组件中的任何一个错误，
请使用 verbose 标志再次运行。

```console
{{prompt}} flutter doctor -v
```

Check the output for other software you might need to install
or further tasks to perform.

查看输出结果，
了解可能需要安装的其他软件或者
需要执行的其他任务。

If you change the configuration of your Flutter SDK or its related components,
run `flutter doctor` _again_ to verify the installation.

如果你更改了 Flutter SDK 或其他相关组件的配置，
请 **再次运行** `flutter doctor` 来检查安装。

## Start developing {{work-target}} apps with Flutter

## 开始使用 Flutter 开发 {{work-target-cn}} 应用

**Congratulations.**
Having installed all prerequisites and the Flutter SDK,
you can start developing Flutter apps for {{work-target}}.

**恭喜你。**
在安装完成所有必要条件和 Flutter SDK 后，
你就可以开始开发适用于 {{work-target-cn}} 的 Flutter 应用了。

To continue on your learning journey, consult the following guides:

如果你要继续学习之旅，请参考以下指南：

- [Learn how to write your first Flutter app][codelab]

  [学习如何编写第一个 Flutter 应用][codelab]

- [Flutter fundamentals docs][fundamentals]

  [Flutter 基础知识文档][fundamentals]

[codelab]: /get-started/codelab/
[fundamentals]: /get-started/fundamentals/
