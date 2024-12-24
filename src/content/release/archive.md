---
# title: Flutter SDK archive
title: Flutter SDK 归档列表
# short-title: Archive
short-title: 归档列表
# description: "All current Flutter SDK releases: stable, beta, and main."
description: 所有 Flutter SDK 的版本列表：稳定版 (stable)、beta 版和主分支 (main)。
tags: 下载,SDK下载,Flutter版本
keywords: 构建渠道,Flutter SDK,SDK,中国镜像
toc: false
---

The {{site.sdk.channel | capitalize }} channel contains the
most stable Flutter builds.
To learn more, check out [Flutter's channels][].

Flutter 的 {{site.sdk.channel | capitalize }} channel 是相对稳定的发布版本，
查阅这个文档了解更多：[Flutter 的构建（发布）渠道 channels][Flutter's channels]。

{% render docs/china-notice.md %}

To learn what's new in the major Flutter releases,
check out the [release notes][] page.

你可以查看 [版本更新日志][release notes] 了解
Flutter 主要更新的内容。

:::note Note on provenance
[provenance](https://slsa.dev/provenance)
describes how software artifacts are built, including
what the download contains and who created it.
To view provenance in a more readable format
and where nothing is downloaded, run the following
command using the provenance file URL from a release (you might need to 
download [jq](https://stedolan.github.io/jq/) to easily parse the JSON).

```console
curl [provenance URL] | jq -r .payload | base64 -d | jq
```
:::


{% tabs "os-archive-tabs" %}
{% tab "Windows" %}

{% include docs/release/archive-release_os.md os="Windows" %}

{% endtab %}
{% tab "macOS" %}

{% include docs/release/archive-release_os.md os="macOS" %}

{% endtab %}
{% tab "Linux" %}

{% include docs/release/archive-release_os.md os="Linux" %}

{% endtab %}
{% endtabs %}

<a id="master-channel" aria-hidden="true"></a>

## Main channel

Installation bundles are not available for the `main` channel
(which was previously known as the `master` channel).
However, you can get the SDK directly from
[GitHub repo][] by cloning the main channel,
and then triggering a download of the SDK dependencies:

我们没有对 `main` channel
（以前是 `master` channel）
提供打包下载。
不过，你可以通过 `git clone` 
[Github 上 repo][GitHub repo] 的 main 分支来下载使用：

```console
$ git clone -b main https://github.com/flutter/flutter.git
$ ./flutter/bin/flutter --version
```

For additional details on how our installation bundles are structured,
see [Installation bundles][].

关于安装包结构的更多信息，请查看这个页面：
[Flutter 安装包结构][Installation bundles]。

We will post a Weibo message with each Flutter releases and the merged PR,
please follow us on Weibo: [Flutter Community](https://weibo.com/u/6723427904)!

每次新版本发布以及 Flutter 主 repo 有新 PR 合并的时候，
我们会在社区微博上发布一条信息，欢迎关注
[Flutter 社区](https://weibo.com/u/6723427904) 微博账号！

[Flutter's channels]: {{site.repo.flutter}}/blob/main/docs/releases/Flutter-build-release-channels.md
[release notes]: /release/release-notes
[GitHub repo]: {{site.repo.flutter}}
[Installation bundles]: {{site.repo.flutter}}/blob/main/docs/infra/Flutter-Installation-Bundles.md
