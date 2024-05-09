---
# title: DevTools release notes
title: 开发者工具 (DevTools) 发行注记
# short-title: DevTools release notes
short-title: DevTools 发行注记
# description: Learn about the latest changes in Dart and Flutter DevTools.
description: Flutter 和 Dart DevTools 的最新发布内容
toc: false
---

This page summarizes the changes in official stable releases of DevTools.
To view a complete list of changes, check out the
[DevTools git log]({{site.repo.organization}}/devtools/commits/master).

本篇链接的是 Flutter 和 Dart DevTools 的公告和发行注记。
如果你想查看完整的变更内容，你可以查看
[DevTools 的 git 记录](https://github.com/flutter/devtools/commits/master)。

The Dart and Flutter SDKs include DevTools.
To check your current version of DevTools,
run the following on your command line:

Dart 和 Flutter 也内置了 DevTools。
你可以运行以下命令查看其版本：

```console
$ dart devtools --version
```

### Release notes

{% comment %}
When adding the release notes for a new DevTools release,
make sure to add the version number as an entry to the list
found at `/src/_data/devtools_releases.yml`.
{% endcomment -%}

{% assign releases = devtools_releases.releases %}

{% for release in releases -%}
* [{{release}} release notes](/tools/devtools/release-notes/release-notes-{{release}})
{% endfor -%}
