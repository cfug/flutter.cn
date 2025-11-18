---
# title: Using Flutter in China
title: 在中国网络环境下使用 Flutter
# description: How to use, access, and learn about Flutter in China.
description: 如何中国使用、访问和了解 Flutter。
---

{% render "docs/china-notice-cn.md" %}

To speed the download and installation of Flutter in China,
consider using a [mirror site][] or _mirror_.

为加快 Flutter 在中国的下载以及安装速度，
请考虑使用 [镜像站点][mirror site] 和 **镜像**

:::important

Use mirror sites _only_ if you _trust_ the provider.
The Flutter team can't verify their reliability or security.

Flutter 团队无法验证它们的可靠性和安全性。
**只有** 在你 **信任** 提供商的情况下才使用镜像站点。

:::

[mirror site]: https://en.wikipedia.org/wiki/Mirror_site

## Use a Flutter mirror site

## 使用 Flutter 镜像站点

The [China Flutter User Group][] (CFUG) maintains a Simplified Chinese
Flutter website [https://flutter.cn](https://flutter.cn) and a mirror.
Other mirrors can be found at the [end of this guide](#known-trusted-community-run-mirror-sites).

[China Flutter User Group][] (CFUG) 维护着一个 Flutter 简体中文网站 
[https://flutter.cn](https://flutter.cn) 以及镜像。
其他镜像可在 [本文末尾](#known-trusted-community-run-mirror-sites) 找到。

[China Flutter User Group]: https://github.com/cfug

### Configure your machine to use a mirror site

### 配置你的机器使用镜像站点

To install or use Flutter in China, use a trustworthy Flutter mirror.
This requires setting two environment variables on your machine.

在中国安装和使用 Flutter，请使用可信的 Flutter 镜像。
这需要在你的机器上设置两个环境变量。

_All examples that follow presume that you are using the CFUG mirror._

_以下所有示例均假定你正在使用 CFUG 的镜像。_

To set your machine to use a mirror site:

设置你的机器使用镜像站点：

<Tabs key="china-setup-os">

<Tab name="Windows">

These steps require using PowerShell.

以下步骤需要使用 PowerShell。

 1. Open a new window in PowerShell to prepare to run shell commands.

    在 PowerShell 中打开新窗口，准备运行 shell 命令。

 1. Set `PUB_HOSTED_URL` to your mirror site.

    将 `PUB_HOSTED_URL` 设置为镜像站点。

    ```ps
    $ $env:PUB_HOSTED_URL="https://pub.flutter-io.cn"
    ```

 1. Set `FLUTTER_STORAGE_BASE_URL` to your mirror site.

    将 `FLUTTER_STORAGE_BASE_URL` 设置为镜像站点。

    ```ps
    $ $env:FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
    ```

 1. Download the Flutter archive from your preferred mirror site.

    从镜像站点下载 Flutter 压缩包。

    For CFUG, visit their [Flutter SDK archive][],
    and download the SDK for your platform and architecture.

    例如：要获取 CFUG 的 Flutter SDK，
    请访问 [Flutter SDK 归档列表][Flutter SDK archive]，
    并下载适用于你的平台和架构的 SDK。

 1. Create a folder where you can install Flutter. Then change into it.
    Consider a path like `$env:USERPROFILE\dev`.

    创建一个可以安装 Flutter 的文件夹，
    然后进入该文件夹。
    可以考虑类似 `$env:USERPROFILE\dev` 的路径。

    ```ps
    $ New-Item -Path "$env:USERPROFILE\dev" -ItemType Directory; cd "$env:USERPROFILE\dev"
    ```
 1. Extract the SDK from the zip archive file.

    从 zip 压缩文件中解压提取 SDK。

    This example assumes you downloaded the Windows version of the Flutter SDK.
    You'll need to replace the path to the archive with the
    path to the archive file and version you downloaded.

    本示例假定你下载了 Windows 版本的 Flutter SDK。
    你需要将以下路径替换为你下载的文件及其版本的路径。

    ```ps
    $ Expand-Archive .\flutter_windows_3.35.5-stable.zip
    ```

 1. Add Flutter to your `PATH` environment variable.

    将 Flutter 添加到你的 `PATH` 环境变量中。

    ```ps
    $ $env:PATH = $pwd.PATH + "\flutter\bin",$env:PATH -join ";"
    ```

 1. Begin developing with Flutter.

    开始使用 Flutter 进行开发。

    After following these steps,
    Flutter fetches packages and artifacts from `flutter-io.cn`
    in the current terminal window.

    完成上述步骤后，
    Flutter 将在当前终端窗口中，从 `flutter-io.cn` 获取 package 和构建产物。

    To set these values permanently across terminals,
    follow the instructions on adding [Flutter to your PATH][windows-path],
    also adding the `PUB_HOSTED_URL` and `FLUTTER_STORAGE_BASE_URL` variables.

    要在所有终端上永久设置这些值，
    请按照说明将 [Flutter 添加到 `PATH` 环境变量][windows-path]，
    同时还需要添加 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL` 环境变量。

{:.steps}

[windows-path]: /install/add-to-path#windows

</Tab>

<Tab name="macOS">

 1. Open a new window in your terminal to prepare to run shell commands.

    在终端中打开新窗口，准备运行 shell 命令。

 1. Set `PUB_HOSTED_URL` to your mirror site.

    将 `PUB_HOSTED_URL` 设置为镜像站点。

    ```console
    $ export PUB_HOSTED_URL="https://pub.flutter-io.cn"
    ```

 1. Set `FLUTTER_STORAGE_BASE_URL` to your mirror site.

    将 `FLUTTER_STORAGE_BASE_URL` 设置为镜像站点。

    ```console
    $ export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
    ```

 1. Download the Flutter archive from your preferred mirror site.

    从镜像站点下载 Flutter 压缩包。

    For CFUG, visit their [Flutter SDK archive][],
    and download the SDK for your platform and architecture.

    例如：要获取 CFUG 的 Flutter SDK，
    请访问 [Flutter SDK 归档列表][Flutter SDK archive]，
    并下载适用于你的平台和架构的 SDK。

 1. Create a folder where you can install Flutter. Then change into it.
    Consider a path like `~/dev`.

    创建一个可以安装 Flutter 的文件夹，
    然后进入该文件夹。
    可以考虑类似 `~/dev` 的路径。

    ```console
    $ mkdir ~/dev; cd ~/dev
    ```

 1. Extract the SDK from the zip archive file.

    从 zip 压缩文件中解压提取 SDK。

    This example assumes you downloaded the macOS version of the Flutter SDK.
    You'll need to replace the path to the archive with the
    path to the archive file and version you downloaded.

    本示例假定你下载了 macOS 版本的 Flutter SDK。
    你需要将以下路径替换为你下载的文件及其版本的路径。

    ```console
    $ unzip flutter_macos_3.35.5-stable.zip
    ```

 1. Add Flutter to your `PATH` environment variable.

    将 Flutter 添加到你的 `PATH` 环境变量中。

    ```console
    $ export PATH="$PWD/flutter/bin:$PATH"
    ```

 1. Begin developing with Flutter.

    开始使用 Flutter 进行开发。

    After following these steps,
    Flutter fetches packages and artifacts from `flutter-io.cn`
    in the current terminal window.

    完成上述步骤后，
    Flutter 将在当前终端窗口中，从 `flutter-io.cn` 获取 package 和构建产物。

    To set these values permanently across terminals,
    follow the instructions on adding [Flutter to your PATH][macos-path],
    also adding the `PUB_HOSTED_URL` and `FLUTTER_STORAGE_BASE_URL` variables.

    要在所有终端上永久设置这些值，
    请按照说明将 [Flutter 添加到 `PATH` 环境变量][macos-path]，
    同时还需要添加 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL` 环境变量。

{:.steps}

[macos-path]: /install/add-to-path#macos

</Tab>

<Tab name="Linux">

 1. Open a new window in your terminal to prepare to run shell commands.

    在终端中打开新窗口，准备运行 shell 命令。

 1. Set `PUB_HOSTED_URL` to your mirror site.

    将 `PUB_HOSTED_URL` 设置为镜像站点。

    ```console
    $ export PUB_HOSTED_URL="https://pub.flutter-io.cn"
    ```

 1. Set `FLUTTER_STORAGE_BASE_URL` to your mirror site.

    将 `FLUTTER_STORAGE_BASE_URL` 设置为镜像站点。

    ```console
    $ export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
    ```

 1. Download the Flutter archive from your preferred mirror site.

    从镜像站点下载 Flutter 压缩包。

    For CFUG, visit their [Flutter SDK archive][],
    and download the SDK for your platform and architecture.

    例如：要获取 CFUG 的 Flutter SDK，
    请访问 [Flutter SDK 归档列表][Flutter SDK archive]，
    并下载适用于你的平台和架构的 SDK。

 1. Create a folder where you can install Flutter. Then change into it.
    Consider a path like `~/dev`.

    创建一个可以安装 Flutter 的文件夹，
    然后进入该文件夹。
    可以考虑类似 `~/dev` 的路径。

    ```console
    $ mkdir ~/dev; cd ~/dev
    ```

 1. Extract the SDK from the tar archive file.

    从 tar 压缩文件中解压提取 SDK。

    This example assumes you downloaded the Linux version of the Flutter SDK.
    You'll need to replace the path to the archive with the
    path to the archive file and version you downloaded.

    本示例假定你下载了 Linux 版本的 Flutter SDK。
    你需要将以下路径替换为你下载的文件及其版本的路径。

    ```console
    $ tar -xf flutter_linux_3.35.5-stable.tar.xz
    ```

 1. Add Flutter to your `PATH` environment variable.

    将 Flutter 添加到你的 `PATH` 环境变量中。

    ```console
    $ export PATH="$PWD/flutter/bin:$PATH"
    ```

 1. Begin developing with Flutter.

    开始使用 Flutter 进行开发。

    After following these steps,
    Flutter fetches packages and artifacts from `flutter-io.cn`
    in the current terminal window.

    完成上述步骤后，
    Flutter 将在当前终端窗口中，从 `flutter-io.cn` 获取 package 和构建产物。

    To set these values permanently across terminals,
    follow the instructions on adding [Flutter to your PATH][linux-path],
    also adding the `PUB_HOSTED_URL` and `FLUTTER_STORAGE_BASE_URL` variables.

    要在所有终端上永久设置这些值，
    请按照说明将 [Flutter 添加到 `PATH` 环境变量][linux-path]，
    同时还需要添加 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL` 环境变量。

{:.steps}

[linux-path]: /install/add-to-path#linux

</Tab>

</Tabs>

[Flutter SDK archive]: https://docs.flutter.cn/install/archive/

### Download Flutter archives based on a mirror site

### 下载基于镜像站点的 Flutter SDK 压缩包

To download Flutter from the [SDK archive][] from a mirror,
replace `storage.googleapis.com` with the URL of your trusted mirror.
Use your mirror site in the browser or in other applications
like IDM or Thunder.
This should improve download speed.

需要从镜像中的 [SDK 版本列表][SDK archive] 下载 Flutter,
请将 `storage.googleapis.com` 替换为你信任的镜像站点 URL。
在浏览器或其他应用程序中使用镜像站点（如 IDM 或 Thunder）将提高下载速度。

[SDK archive]: /install/archive

The following example shows how to change the URL for Flutter's download site
from Google's archive to CFUG's mirror.

下面的示例展示了如何将下载 Flutter 的 URL， 
从 Google 更改为 CFUG 的镜像。

<Tabs key="china-setup-os">

<Tab name="Windows">

To download the x64, Windows version of the Flutter SDK,
you would change the original URL from:

要下载 Windows x64 版本的 Flutter SDK，
你需要将原始 URL：

```plaintext
[!https://storage.googleapis.com!]/flutter_infra_release/releases/stable/windows/flutter_windows_3.35.5-stable.zip
```

to the mirror URL:

改为镜像 URL：

```plaintext
[!https://storage.flutter-io.cn!]/flutter_infra_release/releases/stable/windows/flutter_windows_3.35.5-stable.zip
```

</Tab>

<Tab name="macOS">

To download the arm64, macOS version of the Flutter SDK,
you would change the original URL from:

要下载 macOS arm64 版本的 Flutter SDK，
你需要将原始 URL：

```plaintext
[!https://storage.googleapis.com!]/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.35.5-stable.zip
```

to the mirror URL:

改为镜像 URL：

```plaintext
[!https://storage.flutter-io.cn!]/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.35.5-stable.zip
```

</Tab>

<Tab name="Linux">

To download the Linux version of the Flutter SDK,
you would change the original URL from:

要下载 Linux 版本的 Flutter SDK，
你需要将原始 URL：

```plaintext
[!https://storage.googleapis.com!]/flutter_infra_release/releases/stable/linux/flutter_linux_3.35.5-stable.tar.xz
```

to the mirror URL:

改为镜像 URL：

```plaintext
[!https://storage.flutter-io.cn!]/flutter_infra_release/releases/stable/linux/flutter_linux_3.35.5-stable.tar.xz
```

</Tab>

</Tabs>

:::note

Not every mirror supports downloading artifacts using their direct URL.

并非所有镜像都支持直接从 URL 下载。

:::

## Configure your machine to publish your package

## 配置你的机器发布 package

To publish your packages to `pub.dev`,
you need to be able to access both Google Auth and the `pub.dev` site.

你需要能够访问 Google Auth 和 `pub.dev` 网站，
才能将 package 发布到 `pub.dev`。

{% comment %}
From <https://github.com/flutter/website/pull/9338#discussion_r1328077020>
{% endcomment %}

To enable access to `pub.dev`:

启用对 `pub.dev` 的访问：

<Tabs key="china-setup-os">

<Tab name="Windows">

 1. Configure a proxy.
    To configure a proxy, check out the
    [Dart documentation on proxies][].

    配置代理。
    要配置代理，请查阅 [Dart 关于代理的文档][Dart documentation on proxies]。

 1. Verify that your `PUB_HOSTED_URL` environment variable is either unset
    or empty.

    确认 `PUB_HOSTED_URL` 环境变量未设置或为空。

    ```ps
    $ echo $env:PUB_HOSTED_URL
    ```

    If this command returns any value, unset it.

    如果该指令返回任何值，则移除设置。

    ```ps
    $ Remove-Item $env:PUB_HOSTED_URL
    ```

</Tab>
<Tab name="macOS">

 1. Configure a proxy.
    To configure a proxy, check out the
    [Dart documentation on proxies][].

    配置代理。
    要配置代理，请查阅 [Dart 关于代理的文档][Dart documentation on proxies]。

 1. Verify that your `PUB_HOSTED_URL` environment variable is
    either unset or empty.

    确认 `PUB_HOSTED_URL` 环境变量未设置或为空。

    ```console
    $ echo $PUB_HOSTED_URL
    ```

    If this command returns any value, unset it.

    如果该指令返回任何值，则移除设置。

    ```console
    $ unset $PUB_HOSTED_URL
    ```

</Tab>
<Tab name="Linux">

 1. Configure a proxy.
    To configure a proxy, check out the
    [Dart documentation on proxies][].

    配置代理。
    要配置代理，请查阅 [Dart 关于代理的文档][Dart documentation on proxies]。

 1. Verify that your `PUB_HOSTED_URL` environment variable is
    either unset or empty.

    确认 `PUB_HOSTED_URL` 环境变量未设置或为空。

    ```console
    $ echo $PUB_HOSTED_URL
    ```

    If this command returns any value, unset it.

    如果该指令返回任何值，则移除设置。

    ```console
    $ unset $PUB_HOSTED_URL
    ```

</Tab>

</Tabs>

To learn more about publishing packages, check out the
[Dart documentation on publishing packages][].

了解关于发布 package 的更多信息，
请查阅 [关于发布 package 的 Dart 文档][Dart documentation on publishing packages]。

[Dart documentation on proxies]: {{site.dart-site}}/tools/pub/troubleshoot#pub-get-fails-from-behind-a-corporate-firewall
[Dart documentation on publishing packages]: {{site.dart-site}}/tools/pub/publishing

## Known, trusted community-run mirror sites

## 已知可信的社区镜像站点

The Flutter team can't guarantee the long-term availability of any mirrors.
You can use other mirrors if they become available.

Flutter 团队无法保证任何镜像的长期可用性。
如果其他镜像可用，你可以使用它们。

{% for mirror in mirrors %}

<hr>

### {{mirror.group}}

{% comment %}
[{{mirror.group}}][] maintains the `{{mirror.mirror}}` mirror.
It includes the Flutter SDK and pub packages.
{% endcomment %}

[{{mirror.group}}][] 维护着 `{{mirror.mirror}}` 镜像。
它包括 Flutter SDK 和 pub package。

#### Configure your machine to use this mirror

#### 配置你的机器使用镜像

To set your machine to use this mirror, use these commands.

请使用以下指令，设置你的机器使用该镜像。

On macOS, Linux, or ChromeOS:

在 macOS、Linux 或 ChromeOS 上：

```console
export PUB_HOSTED_URL={{mirror.urls.pubhosted}};
export FLUTTER_STORAGE_BASE_URL={{mirror.urls.flutterstorage}}
```

On Windows:

在 Windows 上：

```console
$env:PUB_HOSTED_URL="{{mirror.urls.pubhosted}}";
$env:FLUTTER_STORAGE_BASE_URL="{{mirror.urls.flutterstorage}}"
```

#### Get support for this mirror

#### 向镜像反馈

If you're running into issues that only occur when
using the `{{mirror.mirror}}` mirror, report the issue to their
[issue tracker]({{mirror.urls.issues}}).

如果你的问题仅在使用 `{{mirror.mirror}}` 镜像时才会出现，
请向他们的 [反馈]({{mirror.urls.issues}})。

{% endfor %}

{% for mirror in mirrors %}
[{{mirror.group}}]: {{mirror.urls.group}}
{% endfor %}

## Offer to host a new mirror site

## 主动提出托管新的镜像站点

If you're interested in setting up your own mirror,
contact [flutter-dev@googlegroups.com](mailto:flutter-dev@googlegroups.com)
for assistance.

如果你有兴趣建立自己的镜像，
请联系 [flutter-dev@googlegroups.com](mailto:flutter-dev@googlegroups.com) 寻求帮助。

## 社区运行的镜像站点

如下列表为目前在国内提供镜像的社区以及其镜像配置，
由于镜像的实现方式有所不同，可能会导致数据的滞后等问题。
我们制作了一个 [镜像可用性监控页面](https://stats.uptimerobot.com/JZK3ZTql79) 供参考。

### 其他已知问题

- 所有 Flutter 镜像目前均不支持/也不应支持上传 packages 到 pub.dev 网站。
  这个过程通常需要登录谷歌账号，而这将是一个无法绕开且复杂的挑战。
- [上海大学的镜像](https://mirrornews.shuosc.org/p/6d7146f9.html) 
  暂时只允许校内访问，故暂未展示，感谢上海大学 Linux 用户组的同学。
- 腾讯云开源镜像站使用 TUNA 开源脚本制作，每天同步一次，
  经测试，其数据延迟较大并尚未配置有效的回源策略，有待于社区成员进一步验证。
- 任何其他与镜像相关的问题，请通过
  [Issue 向我们反馈](https://github.com/cfug/flutter.cn/issues/new?template=2_mirror_issue.yml&title=&title=%5BMirror+issue%5D+使用+Flutter+中国镜像的问题)。
- 部分镜像的问题已经特别标识，待镜像修复之后移除。

## 致谢

本页面列出的镜像由提供者分别维护，我们确保上述列出的镜像提供方不会对数据进行恶意修改，
因为国内网络情况的复杂性和特殊性，我们无法保证镜像长期稳定性和访问速度，请谅解。

如果在镜像使用中有任何问题，欢迎通过邮件与我们联系：cfug-dev@googlegroups.com。
非常感谢所有帮助 Flutter 在国内维护社区基础设施建设资源的社区和公司，查看
[详细致谢名单](/about)。
