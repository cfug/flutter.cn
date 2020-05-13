---
title: Upgrading Flutter
title: 升级你的 Flutter 版本
short-title: Upgrading
short-title: 升级
description: How to upgrade Flutter.
description: 如何升级你的 Flutter 版本
---

No matter which one of the Flutter [release channels][]
you follow, you can use the `flutter` command to upgrade your
Flutter SDK or the packages that your app depends on.

无论你使用哪个 [Flutter 发布渠道][release channels]，
你都可以使用 `flutter` 命令来更新 Flutter SDK 和应用所依赖的 packages。

## Upgrading the Flutter SDK

## 升级 Flutter SDK

To update both the Flutter SDK use the `flutter upgrade` command:

如果要升级 Flutter SDK 的话，请使用 `flutter upgrade` 命令：

```terminal
$ flutter upgrade
```

This command gets the most recent version of the Flutter SDK
that's available on your current Flutter channel.

这个命令首先获取你的 Flutter 渠道可用的最新的 Flutter SDK 版本。
接着这个命令更新你 app 依赖的每一个 package，到最新的兼容版本。

If you want an even more recent version of the Flutter SDK,
switch to a less stable Flutter channel
and then run `flutter upgrade`.

如果你想使用一个更加新的 Flutter SDK 版本，按照下面的步骤切换
到相应的渠道 (channel)，接着再运行 `flutter upgrade`。

## Switching Flutter channels

## 切换 Flutter 发布渠道

Flutter has four [release channels][]:
**stable**, **beta**, **dev**, and **master**.
We recommend using the **{{site.sdk.channel}}** channel
unless you need a more recent release.

Flutter 有 [4个发布渠道][release channels]，分别是 
**stable**, **beta**, **dev**, 和 **master**。
我们推荐使用 **{{site.sdk.channel}}** 渠道
除非你需要更加新的版本。

To view your current channel, use the following command:

要查看你当前使用的哪个渠道，使用下面的命令：

```terminal
$ flutter channel
```

To change to another channel, use `flutter channel <channel-name>`.
Once you've changed your channel, use `flutter upgrade`
to download the Flutter SDK and dependent packages.
For example:

要切换到其它渠道，使用 `flutter channel <channel-name>`。
当你切换了渠道以后，使用 `flutter upgrade` 下载 Flutter SDK 和依赖的 packages。
例如：

```terminal
$ flutter channel dev
$ flutter upgrade
```

{{site.alert.note}}

  If you need a specific version of the Flutter SDK,
  you can download it from the [Flutter SDK archive][].
  
  如果你需要某个特定的 Flutter SDK 版本,
  你可以从 [SDK 归档][Flutter SDK archive] 页面下载.
  
{{site.alert.end}}


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

```terminal
$ flutter pub upgrade
```

To identify out-of-date package dependencies and get advice
on how to update them, use the `outdated` command. For details, see
the Dart [`pub outdated` documentation](https://dart.dev/tools/pub/cmd/pub-outdated).

如果需要自动判断那些过时了的 package 依赖以及获取更新建议，
现在你可以使用 `outdated` 命令。更多相关的信息，
请参考 Dart 文档中关于 [`pub outdated`](https://dart.cn/tools/pub/cmd/pub-outdated) 的说明。

```terminal
$ flutter pub outdated
```

## Keeping informed

## 获得最新通知

We publish breaking change announcements to the
[Flutter announcements mailing list][flutter-announce].
You can also ask questions on the [Flutter dev mailing list][flutter-dev].
Aside from subscribing to receive announcements,
we'd love to hear from you!

我们将在 [Flutter 通知邮件列表][flutter-announce] 上发布重大更改的公告。
你也可以在 [Flutter 开发邮件列表][flutter-dev] 上提问！
除了订阅接收公告外我们很乐意听取您的意见！

## Selecting a specific version

## 选择特定版本

If you have a specific version of Flutter that you'd like to switch to,
you can use the `flutter version` command:

如果想切换到特定版本的 Flutter，
你可以使用 `flutter version` 命令：

```terminal
$ flutter version v1.9.1+hotfix.3
```


[Flutter SDK archive]: /docs/development/tools/sdk/archive
[release channels]: {{site.github}}/flutter/flutter/wiki/Flutter-build-release-channels
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[flutter-dev]: {{site.groups}}/forum/#!forum/flutter-dev
[pubspec.yaml]: https://dart.dev/tools/pub/pubspec