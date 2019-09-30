---
title: Upgrading Flutter
title: 升级你的 Flutter 版本
short-title: Upgrading
short-title: 升级
description: Upgrading Flutter
description: 升级你的 Flutter 版本
---

No matter which one of the Flutter [release channels][]
you follow, you can use the `flutter` command to upgrade your
Flutter SDK and the packages that your app depends on.

无论你使用哪个 [Flutter 发布渠道][release channels]，
你都可以使用 `flutter` 命令来更新 Flutter SDK 和 app 所依赖的 packages。

## One-time setup

## 一次性设置

For the `flutter` command to work correctly,
your app's `pubspec.yaml` file must require the Flutter SDK.

为了让 `flutter` 命令正确工作，你工程下的 `pubspec.yaml` 文件必须要求使用 Flutter SDK。

For example, the following snippet specifies that the
`flutter` and `flutter_test` packages require the Flutter SDK:

例如，下面的代码段指定了 `flutter` 和 `flutter_test` packages 依赖 Flutter SDK：

```yaml
name: hello_world
dependencies:
  flutter:
    sdk: flutter
dev_dependencies:
  flutter_test:
    sdk: flutter
```

{{site.alert.warning}}

  Don't use the `pub get` or `pub upgrade` commands to manage
  dependencies for Flutter apps.
  Instead, use `flutter pub get` or `flutter pub upgrade`.
  If you want to use pub manually, you can run it directly by
  setting the `FLUTTER_ROOT` environment variable.
  
  不要使用 `pub get` 或 `pub upgrade` 命令来管理 Flutter apps 的依赖，
  而是使用 `flutter pub get` 或 `flutter pub upgrade`。
  如果你想手动使用 pub，你可以通过设置 `FLUTTER_ROOT` 环境变量来直接运行。
  
{{site.alert.end}}

## Upgrading the Flutter SDK and packages

## 升级 Flutter SDK 和 packages

To update both the Flutter SDK and the packages that your app depends on,
use the `flutter upgrade` command from the root of your app
(the same directory that contains the `pubspec.yaml` file):

为了升级你 app 依赖的 Flutter SDK 和 packages，
在 app 根目录执行 `flutter upgrade` 命令
（与包含 `pubspec.yaml` 文件的目录相同）：

```terminal
$ flutter upgrade
```

This command first gets the most recent version of the Flutter SDK
that's available on your Flutter channel.
Then this command updates each package that your app depends on
to the most recent compatible version.

这个命令首先获取你的 Flutter 渠道可用的最新的 Flutter SDK 版本。
接着这个命令更新你 app 依赖的每一个 package，到最新的兼容版本。

If you want an even more recent version of the Flutter SDK,
switch to a less stable Flutter channel
and then run `flutter upgrade`.

如果你想使用一个更加新的 Flutter SDK 版本，
切换到不太稳定的 Flutter 渠道，并且运行 `flutter upgrade`。

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
  你可以从 [Flutter SDK archive][] 页面下载.
{{site.alert.end}}


## Upgrading packages only

## 仅更新 packages

If you've modified your `pubspec.yaml` file, or you want to update
only the packages that your app depends upon
(instead of both the packages and Flutter itself),
then use one of the `flutter pub` commands.

如果你已经修改了 `pubspec.yaml` 文件，或者你想仅仅更新你 app 依赖的 packages
（而不是同时更新 packages 和 Flutter SDK）
就使用 `flutter pub` 命令之一。

To get all the dependencies listed in the `pubspec.yaml` file,
without unnecessary updates, use the `get` command:

为了获取 `pubspec.yaml` 文件里列出的所有依赖，但排除不必要的更新，使用 `get` 命令：

```terminal
$ flutter pub get
```

To update to the _latest compatible versions_ of
all the dependencies listed in the `pubspec.yaml` file,
use the `upgrade` command:

为了更新 `pubspec.yaml` 文件里列出的所有依赖到 **最新的兼容版本** ，使用 `upgrade` 命令

```terminal
$ flutter pub upgrade
```

## Keeping informed

## 获得最新通知

We publish breaking change announcements to the
[Flutter announcements mailing list][flutter-announce].
You can also ask questions on the [Flutter dev mailing list][flutter-dev].
Aside from subscribing to receive announcements,
we'd love to hear from you!


## Selecting a specific version

## 选择特定版本

If you have a specific version of Flutter that you'd like to switch to,
you can use the `flutter version` command:

如果你想切换到特定版本的 Flutter，你可以使用 `flutter version` 命令：

```terminal
$ flutter version v1.9.1+hotfix.3
```

To pin packages to specific versions, specify their versions explicitly in the
`pubspec.yaml` file. For more details on the format of this file, see the
[pubspec.yaml] documentation on dart.dev.

要强制使用某版本的 package，请在 `pubspec.yaml` 文件中指明其版本。
有关此文件格式的更多详细信息，请参见 dart.dev 上的 [pubspec.yaml] 文档。

[Flutter SDK archive]: /docs/development/tools/sdk/archive
[release channels]: {{site.github}}/flutter/flutter/wiki/Flutter-build-release-channels
我们会将最新的 breaking change (重大改动) 通知到
[Flutter 通知邮件群组][flutter-announce]，
与此同时，你可以在 [Flutter 开发者邮件群组][flutter-dev]里向大家提问等。
我们希望得到你的反馈！

[Flutter SDK archive]: /docs/development/tools/sdk/releases
[Flutter release channel]: {{site.github}}/flutter/flutter/wiki/Flutter-build-release-channels
[mailing list]: {{site.groups}}/forum/#!forum/flutter-dev
[Flutter SDK 档案]: /docs/development/tools/sdk/releases
[Flutter SDK 归档列表]: /docs/development/tools/sdk/releases
[Flutter 发布渠道]: {{site.github}}/flutter/flutter/wiki/Flutter-build-release-channels
[邮件列表]: {{site.groups}}/forum/#!forum/flutter-dev
[release-channel]: {{site.github}}/flutter/flutter/wiki/Flutter-build-release-channels
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[flutter-dev]: {{site.groups}}/forum/#!forum/flutter-dev
[pubspec.yaml]: https://dart.dev/tools/pub/pubspec
