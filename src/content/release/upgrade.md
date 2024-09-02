---
# title: Upgrading Flutter
title: 升级你的 Flutter 版本
# short-title: Upgrading
short-title: 升级
# description: How to upgrade Flutter.
description: 如何升级你的 Flutter 版本
tags: 升级,下载,Flutter版本
keywords: 中国镜像,升级Flutter
---

No matter which one of the Flutter release channels
you follow, you can use the `flutter` command to upgrade your
Flutter SDK or the packages that your app depends on.

不管你使用的是哪个 Flutter 发布渠道，
你都可以使用 `flutter` 命令来升级你的
Flutter SDK 或者你的应用所依赖的 packages。

## Upgrading the Flutter SDK

## 升级 Flutter SDK

To update the Flutter SDK use the `flutter upgrade` command:

如果要升级 Flutter SDK 的话，请使用 `flutter upgrade` 命令：

```console
$ flutter upgrade
```

This command gets the most recent version of the Flutter SDK
that's available on your current Flutter channel.

这个命令首先获取你的 Flutter 渠道可用的最新的 Flutter SDK 版本。
接着这个命令更新你 app 依赖的每一个 package，到最新的兼容版本。

If you are using the **stable** channel
and want an even more recent version of the Flutter SDK,
switch to the **beta** channel using `flutter channel beta`,
and then run `flutter upgrade`.

如果你使用的是 **stable** 渠道，
并且想要一个更新的 Flutter SDK 版本，
可以使用 `flutter channel beta` 命令切换到 **beta** 渠道，
然后再运行 `flutter upgrade` 命令。

### Keeping informed

### 保持关注

We publish [migration guides][] for known breaking changes.

我们会发布 [迁移指南][migration guides] 来告知你已知的破坏性变更。

We send announcements regarding these changes to the
[Flutter announcements mailing list][flutter-announce].

我们会将这些变更的公告发送到 [Flutter 公告邮件列表][flutter-announce]。

To avoid being broken by future versions of Flutter,
consider submitting your tests to our [test registry][].

为了避免你的应用被未来的 Flutter 版本破坏，
可以考虑将你的测试提交到我们的 [测试注册表][test registry]。


## Switching Flutter channels

## 切换 Flutter 渠道

Flutter has two release channels:
**stable** and **beta**.

Flutter 有两个发布渠道：**stable** 和 **beta**。

### The **stable** channel

### **stable** 渠道

We recommend the **stable** channel for new users
and for production app releases.
The team updates this channel about every three months.
The channel might receive occasional hot fixes
for high-severity or high-impact issues.

我们推荐新用户和生产环境使用 **stable** 渠道。
Flutter 团队会每三个月更新一次这个渠道。
这个渠道可能会偶尔收到高优先级或者高影响力问题的热修复。

The continuous integration for the Flutter team's plugins and packages
includes testing against the latest **stable** release.

Flutter 团队的插件和 packages 的持续集成包括
针对最新的 **stable** 版本的测试。

The latest documentation for the **stable** branch
is at: <https://api.flutter.dev>

**stable** 分支的最新文档在：<https://api.flutter-io.cn>。

### The **beta** channel

### **beta** 渠道

The **beta** channel has the latest stable release.
This is the most recent version of Flutter that we have heavily tested.
This channel has passed all our public testing,
has been verified against test suites for Google products that use Flutter,
and has been vetted against [contributed private test suites][test registry].
The **beta** channel receives regular hot fixes
to address newly discovered important issues.

**beta** 渠道有最新的稳定版本。
这是我们最近测试过的 Flutter 版本。
这个渠道已经通过了我们所有的公开测试，
已经通过了使用 Flutter 的 Google 产品的测试套件的验证，
并且已经通过了 [贡献的私有测试套件][test registry] 的审核。
**beta** 渠道会定期收到热修复来解决新发现的重要问题。

The **beta** channel is essentially the same as the **stable** channel
but updated monthly instead of quarterly.
Indeed, when the **stable** channel is updated,
it is updated to the latest **beta** release.

**beta** 渠道本质上和 **stable** 渠道是一样的，
只是更新频率是每月一次，而不是每季度一次。
实际上，当 **stable** 渠道更新时，
它会更新到最新的 **beta** 版本。

### Other channels

### 其他渠道

We currently have one other channel, **master**.
People who [contribute to Flutter][] use this channel.

我们目前还有一个渠道，**master**。
[所有的 Flutter 贡献者][contribute to Flutter] 都会将代码交到这个渠道。

This channel is not as thoroughly tested as
the **beta** and **stable** channels.

这个渠道没有 **beta** 和 **stable** 渠道测试得那么彻底。

We do not recommend using this channel as
it is more likely to contain serious regressions.

我们不推荐使用这个渠道，因为它更有可能包含严重的回归问题。

The latest documentation for the **master** branch
is at: <https://main-api.flutter.dev>

**master** 分支的最新文档在： <https://main-api.flutter-io.cn>。

### Changing channels

### 切换渠道

To view your current channel, use the following command:

要查看你当前使用的哪个渠道，使用下面的命令：

```console
$ flutter channel
```

To change to another channel, use `flutter channel <channel-name>`.
Once you've changed your channel, use `flutter upgrade`
to download the latest Flutter SDK and dependent packages for that channel.
For example:

要切换到其它渠道，使用 `flutter channel <channel-name>`。
当你切换了渠道以后，使用 `flutter upgrade` 下载 Flutter SDK 和依赖的 packages。
例如：

```console
$ flutter channel beta
$ flutter upgrade
```

:::note

If you need a specific version of the Flutter SDK,
you can download it from the [Flutter SDK archive][].

如果你需要某个特定的 Flutter SDK 版本,
你可以从 [SDK 版本][Flutter SDK archive] 页面下载.

:::

## Switching to a specific Flutter version

## 切换到特定的 Flutter 版本

To switch to a specific Flutter version:

通过以下步骤切换到特定的 Flutter 版本：

1. Find your desired **Flutter version** on the [Flutter SDK archive][].

   在 [Flutter SDK 归档列表][Flutter SDK archive] 中找到所需的 **Flutter 版本**。

1. Navigate to the Flutter SDK:

   在命令中进入你的 Flutter SDK 路径：

   ```console
   $ cd /path/to/flutter
   ```

   :::tip

   You can find the Flutter SDK's path using `flutter doctor --verbose`.

   你可以使用 `flutter doctor --verbose` 查找 Flutter SDK 的路径。

   :::

1. Use `git checkout` to switch to your desired **Flutter version**:

   使用 `git checkout` 切换到所需的 **Flutter 版本**：

   ```console
   $ git checkout <Flutter version>
   ```


## Upgrading packages

## 仅更新 packages

If you've modified your `pubspec.yaml` file, or you want to update
only the packages that your app depends upon
(instead of both the packages and Flutter itself),
then use one of the `flutter pub` commands.

如果你修改了 `pubspec.yaml` 文件，
或者想仅更新项目依赖的 packages，
而不是同时更新 packages 和 Flutter SDK，
可以选择使用下面提到的 `flutter pub` 命令。

To update to the _latest compatible versions_ of
all the dependencies listed in the `pubspec.yaml` file,
use the `upgrade` command:

为了把 `pubspec.yaml` 文件里列出的所有依赖
更新到 **最新的兼容版本** ，可以使用使用 `upgrade` 命令：

```console
$ flutter pub upgrade
```

To update to the _latest possible version_ of
all the dependencies listed in the `pubspec.yaml` file,
use the `upgrade --major-versions` command:

为了把 `pubspec.yaml` 文件里列出的所有依赖
更新到 **最新的版本** ，可以使用使用 `upgrade --major-versions` 命令：

```console
$ flutter pub upgrade --major-versions
```

This also automatically update the constraints
in the `pubspec.yaml` file.

这个命令也会自动更新 `pubspec.yaml` 文件中的约束条件。

To identify out-of-date package dependencies and get advice
on how to update them, use the `outdated` command. For details, see
the Dart [`pub outdated` documentation]({{site.dart-site}}/tools/pub/cmd/pub-outdated).

如果需要自动判断那些过时了的 package 依赖以及获取更新建议，
现在你可以使用 `outdated` 命令。更多相关的信息，
请参考 Dart 文档中关于 [`pub outdated`]({{site.dart-site}}/tools/pub/cmd/pub-outdated) 的说明。

```console
$ flutter pub outdated
```

[Flutter SDK archive]: /release/archive
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[pubspec.yaml]: {{site.dart-site}}/tools/pub/pubspec
[test registry]: {{site.repo.organization}}/tests
[contribute to Flutter]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[migration guides]: /release/breaking-changes
