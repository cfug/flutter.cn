---
title: Chrome OS install
title: 在 Chrome OS 上安装和配置 Flutter 开发环境
short-title: Chrome OS
# js: [{defer: true, url: /assets/archive.js}]
next:
  title: Set up an editor
  titie: 编辑工具设定
  path: /docs/get-started/editor
---

{% assign os = 'linux' -%}

## System requirements

## 系统要求

To install and run Flutter, your development environment must meet these 
minimum requirements:

要安装并运行 Flutter，你的开发环境必须满足如下最低配置要求：

- **Operating Systems**: Linux (64-bit)

  **操作系统**：Linux (64-bit )
  
- **Disk Space**: 600 MB (does not include disk space for IDE/tools).

  **磁盘空间**：600 MB （不包括 IDE/tools 所占的空间）
  
- **Tools**: Flutter depends on these command-line tools being available 
  in your environment.
  
  **工具**：Flutter 需要环境中安装如下命令行工具
  
  - `bash`
  - `curl`
  - `git` 2.x
  - `mkdir`
  - `rm`
  - `unzip`
  - `which`
  - `xz-utils`
- **Shared libraries**: Flutter `test` command depends on this library being 
 available in your environment.

  **共享库**：Flutter 的 `test` 命令依赖下面的库
  
  - `libGLU.so.1` - provided by mesa packages such as `libglu1-mesa` on
     Ubuntu/Debian
    
    `libGLU.so.1` - 由 mesa 包提供，比如在 Ubuntu/Debian 系统上对应的包是 `libglu1-mesa`

For the best experience right now, you should put your
Chrome OS Device into developer mode (this is necessary
to push apps on the Chrome OS Device).  For more information,
see [how to enable developer mode on your Chromebook][].

目前为了最佳体验，你需要把 Chrome OS 设备设置为开发者模式（因为需要向 Chrome OS 设备推送应用程序）。如果想了解更多详细信息，请参考 [how to enable developer mode on you Chromebook](https://www.androidcentral.com/how-enable-developer-mode-chrome-os)。

{% include_relative _get-sdk.md %}

{% include_relative _path-linux-chromeos.md %}

{% include_relative _chromeos-android-sdk-setup.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。

## Flutter & Chrome OS tips & tricks

## Flutter 和 Chrome OS 的小技巧

Wondering how to run your app? On Chrome OS,
you can either connect your phone
or push directly to the Android container on device. 
To do that you must enable Developer mode on your machine,
and then connect to the local container with ADB:

如何运行应用程序？在 Chrome OS 上，
你可以直接连接你的手机设备（目前只支持开发者频道的版本）
或者直接推送到设备的 Android 容器中。
你需要打开设备的开发者模式，然后通过 ADB 连接到本地容器中：

```terminal
$ adb connect 100.115.92.2:5555
```

Want to build your first app optimized for Chrome OS?
Clone the flutter-samples repo and build our specific Chrome
OS Best Practices example:

如何为 Chrome OS 构建你的第一个应用程序呢？
克隆代码仓库 flutter-samples，然后直接编译我们的 Chrome OS Best Practices：


```terminal
$ git clone https://github.com/flutter/samples
$ cd samples/chrome-os-best-practices
$ flutter run
```

Wondering how to access your favorite F-Key shortcuts
on the Chrome OS keyboard?

在 Chrome OS 的键盘上如何进入使用 F-Key 功能键？

* Press the search key along with 1 through = to access F1–F12.
 
  按住搜索按钮和数字 1 到 = 按钮来对应 F1 到 F12。

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

Then, navigate to http://localhost:8000/?port=8080
in your Chrome browser.

然后在浏览器中打开地址 http://localhost:8000/?port=8080

#### Flutter Chrome OS lint analysis

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


[how to enable developer mode on your Chromebook]: https://www.androidcentral.com/how-enable-developer-mode-chrome-os

目前该功能仍然处于开发阶段，不过你可以在未来返回来根据本文档的内容在 Chrome OS 上开发 Flutter 应用程序。