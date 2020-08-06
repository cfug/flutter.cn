---
title: Chrome OS install
title: 在 Chrome OS 上安装和配置 Flutter 开发环境
description: How to install on Chrome OS.
description: 如何在 Chrome OS 上安装 Flutter。
short-title: Chrome OS
next:
  title: Set up an editor
  titie: 编辑工具设定
  path: /docs/get-started/editor
---

{% assign os = 'linux' -%}

## System requirements

## 系统要求

To install and run Flutter, your development environment
must meet these minimum requirements:

要安装并运行 Flutter，你的开发环境必须满足如下最低配置要求：

* **Operating Systems**: Chrome OS (64-bit) with [Linux (Beta)][] turned on

  **操作系统**：64 位的 Chrome OS 系统（需开启 [Linux (Beta)][] 功能）

* **Disk Space**: 600 MB (does not include disk space for IDE/tools).

  **磁盘空间**：600 MB （不包括 IDE/tools 所占的空间）
  
* **Tools**: Flutter depends on these command-line
  tools being available in your environment.
  
  **工具**：Flutter 需要环境中安装如下命令行工具
  
  * `bash`
  * `curl`
  * `git` 2.x
  * `mkdir`
  * `rm`
  * `unzip`
  * `which`
  * `xz-utils`
* **Shared libraries**: Flutter `test` command depends on
  this library being available in your environment.

  **共享库**：Flutter 的 `test` 命令依赖下面的库

  * `libGLU.so.1` - provided by mesa packages such as `libglu1-mesa` on
     Ubuntu/Debian
    
    `libGLU.so.1` - 由 mesa 包提供，比如在 Ubuntu/Debian
    系统上对应的包是 `libglu1-mesa`

{% include_relative _get-sdk-chromeos.md %}

{% include_relative _path-linux-chromeos.md %}

{% include_relative _android-setup-chromeos.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。

## Flutter & Chrome OS tips & tricks

## Flutter 和 Chrome OS 的小技巧

For the current versions of Chrome OS, only certain ports from
Crostini are exposed to the rest of the environments.
Here’s an example of how to launch
Flutter DevTools for an Android app with ports
that will work:

对于当前版本的 Chrome OS，只有 Crostini 的几个端口对环境开放。
下面这个示例讲解了如何在可用端口上启动 Flutter DevTools:

```terminal
$ flutter pub global run devtools -p 8000
$ cd path/to/your/app
$ flutter run --observatory-port=8080
```

Then, navigate to http://127.0.0.1:8000/#
in your Chrome browser and enter the URL to your
application. The last `flutter run` command you
just ran should output a URL similar to the format
of `http://127.0.0.1:8080/auth_code=/`. Use this URL
and select "Connect" to start the Flutter DevTools
for your Android app.

然后在你的 Chrome 浏览器里打开 URL: http://127.0.0.1:8000/#，
上面最后一个 `flutter run` 命令会输出一个类似 `http://127.0.0.1:8080/auth_code=/`
的 URL，使用这个 URL 并选择 "Connect" 来启动
适用于 Android 应用的 Flutter DevTools。


#### Flutter Chrome OS lint analysis

#### Chrome OS 上的 Flutter lint 分析

The Flutter team is adding Chrome OS specific
Lint Analysis checks that are available to make
sure that the app that you're building is going
to work well on Chrome OS. It looks for things
like required hardware in your Android Manifest
that aren’t available on Chrome OS devices,
permissions that imply requests for unsupported
hardware, as well as other properties or code
that would bring a lesser experience on these devices.

Flutter 团队在 Chrome OS 中添加了 Lint Analysis 检查，
用于保证所构建的应用程序在 Chrome OS 上运行正常。
它会检查在 AndroidManifest 里是否存在所需的硬件是 Chrome OS 设备上所不支持的，
是否向不支持的硬件请求了权限，以及是否存在会降低体验效果的代码。

To activate these,
you need to create a new analysis_options.yaml file to include these options.

要启用上述的功能特性，你需要创建一个新的或者更新你现有的
analysis_options.yaml 文件，使其包含如下选项：

(If you have an existing analysis_options.yaml file, you can update it)

（如果你已经有一个 analysis_options.yaml，直接更新它的内容即可）

```yaml
include: package:flutter/analysis_options_user.yaml
analyzer:
 optional-checks:
   chrome-os-manifest-checks
```

To run these from the command line, use the following command:

从命令行运行下面的内容：

```terminal
$ flutter analyze
```

Sample output for this command might look like:

运行后的输出如下：

```terminal
Analyzing ...
warning • This hardware feature is not supported on Chrome OS •
android/app/src/main/AndroidManifest.xml:4:33 • unsupported_chrome_os_hardware
```

This functionality is still under development,
but check back for instructions on how you can make
this functionality work with your Chrome OS
targeted Flutter app.

目前该功能仍然处于开发阶段，不过你可以在未来返回
来根据本文档的内容在 Chrome OS 上开发 Flutter 应用程序。

[Linux (Beta)]: https://support.google.com/chromebook/answer/9145439
