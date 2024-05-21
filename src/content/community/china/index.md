---
# title: Using Flutter in China
title: 在中国网络环境下使用 Flutter
# description: How to use, access, and learn about Flutter in China.
description: 如何中国使用、访问和了解 Flutter。
toc: true
os-list: [Windows, macOS, Linux, ChromeOS]
---

{% assign flutter-sdk = 'flutter_opsys_v3.13.0-stable.' %}
{% capture sdk-path -%}flutter_infra_release/releases/stable/opsys/{{flutter-sdk}}{%- endcapture %}

{% render docs/china-notice-cn.md %}

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

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="china-os-tabs" role="tablist">
{% for os in page.os-list %}
{% assign id = os | downcase -%}
  <li class="nav-item">
    <a class="nav-link {%- if id == 'windows' %} active {% endif %}" id="{{id}}-tab" href="#{{id}}" role="tab" aria-controls="{{id}} {{id}}-dl {{id}}-pub" aria-selected="true">{{os}}</a>
  </li>
{% endfor -%}
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">
{% for os in page.os-list %}
{% include docs/community/china/os-settings.md ref-os=os sdk=flutter-sdk %}
{% endfor -%}
</div>

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

[SDK archive]: /release/archive

The following example shows how to change the URL for Flutter's download site
from Google's archive to CFUG's mirror.

下面的示例展示了如何将下载 Flutter 的 URL， 
从 Google 更改为 CFUG 的镜像。

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="china-os-dl-tabs" role="tablist">
{% for os in page.os-list %}
{% assign id = os | downcase -%}
  <li class="nav-item">
    <a class="nav-link {%- if id == 'windows' %} active {% endif %}" id="{{id}}-dl-tab" href="#{{id}}-dl" role="tab" aria-controls="{{id}} {{id}}-dl {{id}}-pub" aria-selected="true">{{os}}</a>
  </li>
{% endfor -%}
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">
{% for os in page.os-list %}
{% include docs/community/china/download-urls.md ref-os=os filepath=sdk-path %}
{% endfor -%}
</div>

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

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="china-os-pub-tabs" role="tablist">
{% for os in page.os-list %}
{% assign id = os | downcase -%}
  <li class="nav-item">
    <a class="nav-link {%- if id == 'windows' %} active {% endif %}" id="{{id}}-pub-tab" href="#{{id}}-pub" role="tab" aria-controls="{{id}} {{id}}-pub" aria-selected="true">{{os}}</a>
  </li>
{% endfor -%}
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">
{% include docs/community/china/pub-settings.md os="Windows" filepath=path %}
{% include docs/community/china/pub-settings.md os="macOS" filepath=path %}
{% include docs/community/china/pub-settings.md os="Linux" filepath=path %}
{% include docs/community/china/pub-settings.md os="ChromeOS" filepath=path %}
</div>

To learn more about publishing packages, check out the
[Dart documentation on publishing packages][].

了解关于发布 package 的更多信息，
请查阅 [关于发布 package 的 Dart 文档][Dart documentation on publishing packages]。

[Dart documentation on publishing packages]: {{site.dart-site}}/tools/pub/publishing

## Known, trusted community-run mirror sites

## 已知可信的社区镜像站点

The Flutter team can't guarantee long-term availability of any mirrors.
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
