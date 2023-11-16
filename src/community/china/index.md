---
title: Using Flutter in China
title: 在中国网络环境下使用 Flutter
description: How to use, access, and learn about Flutter in China.
description: 如何中国使用、访问和了解 Flutter。
toc: true
os-list: [Windows, macOS, Linux, ChromeOS]
---

{% assign flutter-sdk = 'flutter_opsys_v3.13.0-stable.' %}
{% capture sdk-path -%}flutter_infra_release/releases/stable/opsys/{{flutter-sdk}}{%- endcapture %}

{% include docs/china-notice-cn.md %}

To speed the download and installation of Flutter in China,
consider using a [mirror site][] or _mirror_.

为加快 Flutter 在中国的下载以及安装速度，
请考虑使用 [镜像站点][mirror site] 和 _镜像_

{{site.alert.important}}

  Use mirror sites _only_ if you _trust_ the provider.
  The Flutter team can't verify their reliability or security.

  Flutter 团队无法验证它们的可靠性和安全性。
  _只有_ 在你 _信任_ 提供商的情况下才使用镜像站点。

{{site.alert.end}}

[mirror site]: https://en.wikipedia.org/wiki/Mirror_site

## Use a Flutter mirror site

## 使用 Flutter 镜像站点

The [China Flutter User Group][] (CFUG) maintains a Simplified Chinese
Flutter website [https://flutter.cn](https://flutter.cn) and a mirror.
Other mirrors can be found at the [end of this guide](#known-trusted-community-run-mirror-sites).

[China Flutter User Group][] (CFUG) 维护着一个 Flutter 简体中文网站 
[https://flutter.cn](https://flutter.cn) 以及镜像。
其他镜像可在 [本文末尾](#known-trusted-community-run-mirror-sites) 找到。

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
{% include_relative _os-settings.md ref-os=os sdk=flutter-sdk %}
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

[SDK archive]: {{site.url}}/release/archive

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
{% include_relative _download-urls.md ref-os=os filepath=sdk-path %}
{% endfor -%}
</div>

{{site.alert.note}}

  Not every mirror supports downloading artifacts using their direct URL.

  并非所有镜像都支持直接从 URL 下载。

{{site.alert.end}}

## Configure your machine to publish your package

## 配置你的机器发布 package

To publish your packages to `pub.dev`,
you need to be able to access both Google Auth and the `pub.dev` site.

你需要能够访问 Google Auth 和 `pub.dev` 网站，
才能将 package 发布到 `pub.dev`。

{% comment %}
From https://github.com/flutter/website/pull/9338#discussion_r1328077020
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
{% include_relative _pub-settings.md os="Windows" filepath=path %}
{% include_relative _pub-settings.md os="macOS" filepath=path %}
{% include_relative _pub-settings.md os="Linux" filepath=path %}
{% include_relative _pub-settings.md os="ChromeOS" filepath=path %}
</div>

To learn more about publishing packages, check out the
[Dart documentation on publishing packages][].

了解关于发布 package 的更多信息，
请查阅 [关于发布 package 的 Dart 文档][Dart documentation on publishing packages]。

[Dart documentation on proxies]: {{site.dart-site}}/tools/pub/troubleshoot#pub-get-fails-from-behind-a-corporate-firewall

[Dart documentation on publishing packages]: {{site.dart-site}}/tools/pub/publishing

## Known, trusted community-run mirror sites

## 已知可信的社区镜像站点

The Flutter team can't guarantee long-term availability of any mirrors.
You can use other mirrors if they become available.

Flutter 团队无法保证任何镜像的长期可用性。
如果其他镜像可用，你可以使用它们。

{% for mirror in site.data.mirrors %}

<hr>

### {{mirror.group}}

[{{mirror.group}}][] maintains the `{{mirror.mirror}}` mirror.
It includes the Flutter SDK and pub packages.

[{{mirror.group}}][] 维护着 `{{mirror.mirror}}` 镜像。
它包括 Flutter SDK 和 pub package。

#### Configure your machine to use this mirror
{:.no_toc}

#### 配置你的机器使用镜像
{:.no_toc}

To set your machine to use this mirror, use these commands.

请使用以下指令，设置你的机器使用该镜像。

On macOS, Linux, or ChromeOS:

macOS、Linux 或 ChromeOS：

```terminal
export PUB_HOSTED_URL={{mirror.urls.pubhosted}};
export FLUTTER_STORAGE_BASE_URL={{mirror.urls.flutterstorage}}
```

On Windows:

Windows：

```terminal
$env:PUB_HOSTED_URL="{{mirror.urls.pubhosted}}";
$env:FLUTTER_STORAGE_BASE_URL="{{mirror.urls.flutterstorage}}"
```

#### Get support for this mirror
{:.no_toc}

#### 向镜像反馈
{:.no_toc}

If you're running into issues that only occur when
using the `{{mirror.mirror}}` mirror, report the issue to their
[issue tracker]({{mirror.urls.issues}}).

如果你的问题仅在使用 `{{mirror.mirror}}` 镜像时才会出现，
请向他们的 [反馈]({{mirror.urls.issues}})。

{% endfor %}

{% for mirror in site.data.mirrors %}
[{{mirror.group}}]: {{mirror.urls.group}}
{% endfor %}

## Offer to host a new mirror site

## 主动提出托管新的镜像站点

If you're interested in setting up your own mirror,
contact [flutter-dev@googlegroups.com](mailto:flutter-dev@googlegroups.com)
for assistance.

如果你有兴趣建立自己的镜像，
请联系 [flutter-dev@googlegroups.com](mailto:flutter-dev@googlegroups.com) 寻求帮助。
