---
# title: Flutter SDK archive
title: Flutter SDK 归档列表
# shortTitle: Archive
shortTitle: 归档列表
# description: "All current Flutter SDK releases: stable, beta, and main."
description: 所有 Flutter SDK 的版本列表：稳定版 (stable)、beta 版和主分支 (main)。
tags: 下载,SDK下载,Flutter版本
keywords: 构建渠道,Flutter SDK,SDK,中国镜像
---

{% render "docs/china-notice.md" %}

## Overview

## 概览

The Flutter SDK archive is a collection of all previous versions of the
Flutter SDK. This archive is useful for developers who need to use an older
version of Flutter for compatibility reasons or to investigate bugs.

Flutter SDK 归档列表是 Flutter SDK 以前所有版本的集合。
对于出于兼容性原因或调查错误而需要使用旧版本 Flutter 的开发人员来说，该归档列表非常有用。

The archive includes Flutter SDKs for Windows, macOS, and Linux on the
following [channels][]:

该归档列表包括以下 [渠道 (channel)][channels] 的 Flutter SDK（Windows、macOS 和 Linux）：

*   **Stable channel**: This channel contains the
    most stable Flutter builds. Roughly every third beta version is promoted
    to the stable version. The stable channel is the recommended channel for
    new users and for production app releases.

    **Stable channel**：该渠道 (channel) 包含
    最稳定的 Flutter 版本。大概每三个 beta 版本就会提升到稳定 (stable) 版本。
    稳定渠道 (stable channel) 是新开发者和生产应用发布最推荐的渠道 (channel)。

*   **Beta channel**: This channel is the most recent version of Flutter that is
    available, but it is not yet stable. The beta branch is usually released
    on the first Wednesday of the month. A fix will typically end up in the
    beta channel about two weeks after it lands in the main channel.
    Releases are distributed as [installation bundles][].

    **Beta channel**：该渠道 (channel) 是 Flutter 的最新版本，但尚未稳定。
    beta 分支通常在每月的第一个星期三发布。
    一个修复通常会在 main channel 发布两周后进入 beta channel。
    beta channel 会以 [安装包][installation bundles] 的形式发布

*   **Main channel**: This channel has the newest features, but it hasn't been fully
    tested and might have some bugs. We don't recommend using it unless you're
    contributing to Flutter itself.

    **Main channel**：该渠道 (channel) 会有最新的特性，但尚未经过全面测试，
    可能会存在一些 Bug。我们不建议你使用它，除非你要为 Flutter 本身做出贡献。

The following information is available for each Flutter release in the
SDK archive:

SDK 归档列表中的每个 Flutter 版本都有以下信息：

*   **Flutter version**: The version number of the Flutter SDK
    (for example, 3.35.0, 2.10.5) follows a modified
    [calendar versioning][] scheme called _CalVer_.
    For more information, visit the [Flutter SDK versioning][] page.

    **Flutter 版本**：Flutter SDK 的版本号（例如 3.35.0、2.10.5）。
    该版本号遵循 [日历化版本 (CalVer)][calendar versioning] 规范，
    更多详细信息，请查看 [Flutter SDK 版本][Flutter SDK versioning]。

*   **Architecture**: The processor architecture the SDK is built for
    (for example, x64, arm64). This specifies the type of processor the SDK is
    compatible with.

    **架构**：SDK 适用的处理器架构（例如 x64、arm64）。
    这指定了 SDK 兼容的处理器类型。

*   **Ref**: The git commit hash that uniquely identifies the specific codebase
    used for that release.

    **Ref**：唯一标识该版本特定代码仓库的 git 提交哈希值 (hash)。

*   **Release Date**: The date when that particular Flutter version was
    officially released.

    **发布日期**：当前 Flutter 版本正式发布的日期。

*   **Dart version**: The corresponding version of the Dart SDK included in the
    Flutter SDK release.

    **Dart 版本**：Flutter SDK 中包含的 Dart SDK 的对应版本。

*   **Provenance**: Provides details about the build process and origin of the
    SDK, potentially including information about security attestations or
    build systems used. Results are returned as JSON.

    **出处/来源**：提供有关 SDK 构建过程和来源的详细信息，
    可能包括所适用的安全证明或构建系统的信息。
    结果以 JSON 格式返回。

[calendar versioning]: https://calver.org/
[Flutter SDK versioning]: {{site.repo.flutter}}/blob/main/docs/releases/Release-versioning.md

## Stable channel

<Tabs key="os-archive-tabs">
    <Tab name="Windows">
        <ArchiveTable os="Windows" channel="stable" />
    </Tab>
    <Tab name="macOS">
        <ArchiveTable os="macOS" channel="stable" />
    </Tab>
    <Tab name="Linux">
        <ArchiveTable os="Linux" channel="stable" />
    </Tab>
</Tabs>

## Beta channel

<Tabs key="os-archive-tabs">
    <Tab name="Windows">
        <ArchiveTable os="Windows" channel="beta" />
    </Tab>
    <Tab name="macOS">
        <ArchiveTable os="macOS" channel="beta" />
    </Tab>
    <Tab name="Linux">
        <ArchiveTable os="Linux" channel="beta" />
    </Tab>
</Tabs>

:::tip
To see what's changed in a beta release, compare the version tags on GitHub.

1. Find the version number (tag) you want to see (for example, `3.38.0-0.2.pre`).
2. Find the previous version number (for example, `3.38.0-0.1.pre`).
3. Go to the [GitHub compare page](https://github.com/flutter/flutter/compare).
4. Select the older tag for the `base` field and the newer tag for the `compare` field.

For example: [flutter/flutter@3.38.0-0.1.pre...3.38.0-0.2.pre](https://github.com/flutter/flutter/compare/3.38.0-0.1.pre...3.38.0-0.2.pre)
:::

<a id="master-channel" aria-hidden="true"></a>

## Main channel

[Installation bundles][] are not available for the `main` channel
(which was previously known as the `master` channel).
However, you can get the SDK directly from
[GitHub repo][] by cloning the main channel,
and then triggering a download of the SDK dependencies:

我们没有对 `main` channel
（以前是 `master` channel）
提供 [安装包][Installation bundles] 下载。
不过，你可以通过 `git clone` 
[Github 上 repo][GitHub repo] 的 main 分支来下载使用：

```console
$ git clone -b main https://github.com/flutter/flutter.git
$ ./flutter/bin/flutter --version
```

## More information

## 更多信息

To learn what's new in the major Flutter builds, check out the
[release notes][] page.

要了解 Flutter 主要版本的新内容，
请查看 [版本发行注记][release notes] 页。

For details on how our installation bundles are structured,
see [Installation bundles][].

关于安装包结构的更多信息，请查看这个页面：
[Flutter 安装包结构][Installation bundles]。

[channels]: {{site.repo.flutter}}/blob/main/docs/releases/Flutter-build-release-channels.md
[release notes]: /release/release-notes
[GitHub repo]: {{site.repo.flutter}}
[Installation bundles]: {{site.repo.flutter}}/blob/main/docs/infra/Flutter-Installation-Bundles.md
