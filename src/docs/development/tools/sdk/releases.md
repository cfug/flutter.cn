---
title: Flutter SDK releases
title: Flutter SDK 版本列表
short-title: Releases
short-title: 版本列表
description: All current Flutter SDK releases, both stable, dev, and master.
description: 所有 Flutter SDK 的版本列表，包括稳定版和开发版以及主分支。
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
most stable Flutter builds. See [Flutter’s channels][] for details.

Flutter 的 {{site.sdk.channel | capitalize }} channel 是相对稳定的发布版本，
查阅这个文档了解更多：[Flutter 的构建（发布）渠道 channels][Flutter’s channels]。

{{site.alert.note}}

  As of release 1.17 (stable), we've updated our release process,
  including changes to how we name releases and their download files.
  For details, see the "Updating our release process" section
  in the [Flutter Spring 2020 Update][] blog post.
  
  自 Flutter 1.17 稳定版开始，我们更新了发布流程，包括对下载文件的命名等。
  与此相关的更多信息，请参见我们官宣文章中的「版本发布流程更新」部分内容。
  
{{site.alert.end}}

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="editor-setup" role="tablist">
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
{% include_relative _os.md os="Windows" %}
{% include_relative _os.md os="macOS" %}
{% include_relative _os.md os="Linux" %}
</div>

## Master channel

Installation bundles are not available for master.
However, you can get the SDK directly from
[GitHub repo][] by cloning the master channel,
and then triggering a download of the SDK dependencies:

我们并没有对 master channel 的提供打包下载，
不过，你可以通过 `git clone` 我们在 
[Github 上 repo]({{site.repo.flutter}}) 的 master 分支来使用。

```terminal
$ git clone -b master https://github.com/flutter/flutter.git
$ ./flutter/bin/flutter --version
```

For additional details on how our installation bundles are structured,
see [Installation bundles][].

关于安装包结构的更多信息，请查看这个页面：
[Flutter 安装包结构][Installation bundles]。


[Flutter Spring 2020 Update]: {{site.medium}}/flutter/flutter-spring-2020-update-f723d898d7af
[Flutter’s channels]: {{site.repo.flutter}}/wiki/Flutter-build-release-channels
[Installation bundles]: {{site.repo.flutter}}/wiki/Flutter-Installation-Bundles
[GitHub repo]: {{site.repo.flutter}}
[Installation bundles]: {{site.repo.flutter}}/wiki/Flutter-Installation-Bundles
