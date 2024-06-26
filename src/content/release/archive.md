---
# title: Flutter SDK archive
title: Flutter SDK 归档列表
# short-title: Releases
short-title: 版本列表
# description: "All current Flutter SDK releases: stable, beta, and master."
description: 所有 Flutter SDK 的版本列表，包括稳定版和主分支。
tags: 下载,SDK下载,Flutter版本
keywords: 构建渠道,Flutter SDK,SDK,中国镜像
toc: false
---

<style>
.scrollable-table {
  overflow-y: scroll;
  max-height: 20rem;
}
</style>

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

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="os-archive-tabs" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="windows-tab" href="#windows" role="tab" aria-controls="windows" aria-selected="true">Windows</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="macos-tab" href="#macos" role="tab" aria-controls="macos" aria-selected="false">macOS</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="linux-tab" href="#linux" role="tab" aria-controls="linux" aria-selected="false">Linux</a>
  </li>
</ul>

{% comment %} Tab panes {% endcomment -%}
<div id="sdk-archives" class="tab-content">

{% include docs/release/archive-release_os.md os="Windows" %}

{% include docs/release/archive-release_os.md os="macOS" %}

{% include docs/release/archive-release_os.md os="Linux" %}

</div>

## Master channel

Installation bundles are not available for master.
However, you can get the SDK directly from
[GitHub repo][] by cloning the master channel,
and then triggering a download of the SDK dependencies:

我们并没有对 master channel 的提供打包下载，
不过，你可以通过 `git clone` 我们在 
[Github 上 repo][GitHub repo] 的 master 分支来使用。

```console
$ git clone -b master https://github.com/flutter/flutter.git
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

[Flutter's channels]: {{site.repo.flutter}}wiki/Flutter-build-release-channels
[release notes]: /release/release-notes
[GitHub repo]: {{site.repo.flutter}}
[Installation bundles]: {{site.repo.flutter}}wiki/Flutter-Installation-Bundles
