---
title: Null safety in Flutter
title: Flutter 中的空安全
description: Find out how to use non-nullable types in your Flutter code.
description: 学习如何在你的 Flutter 代码中使用非空类型
---

Flutter 2 supports null safety.
You can migrate your Flutter packages to use non-nullable types like this:

自 Flutter 2 起，Flutter 开始支持空安全。
你可以将你的 Flutter package 代码迁移，以使用非空类型，如下所示：

<?code-excerpt "basics/lib/main.dart (MyApp)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  final int anInt = 3; // Cannot be null.
  final int? aNullableInt = null; // Can be null.

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nullable Fields Demo',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Nullable Fields Demo'),
        ),
        body: Center(
          child: Column(
            children: [
              Text('anInt is $anInt.'),
              Text('aNullableInt is $aNullableInt.'),
            ],
          ),
        ),
      ),
    );
  }
}
```

For an instructor-led, free video workshop, check out the
following:

你可以观看由讲师带来的免费学习工坊的视频：

<iframe width="560" height="315" src="https://player.bilibili.com/player.html?aid=888693780&bvid=BV1tK4y1u76N&cid=354814166&page=1" title="Bilibili video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Resources

## 资源

To learn more about null safety,
read these pages:

你可以阅读以下内容，进一步学习空安全

* [Sound null safety][]:
  The null safety homepage.
  Has basic information, with links to everything else you might need.

  [健全的空安全][Sound null safety]：
  空安全的首页。它包括空安全的基础信息，以及你可能需要的其他所有内容的链接。

* [Understanding null safety][]:
  A deep dive into null safety, written by Dart engineer Bob Nystrom.

  [深入理解空安全][Understanding null safety]：
  对于空安全的深入解析，由 Dart 工程师 Bob Nystrom 撰写。

When you're ready to start migrating your packages to null safety,
check out these pages:

如果你即将开始迁移你的 package 至空安全，你可以阅读以下内容：

* [Migrating to null safety][]:
  Instructions for converting your packages to null safety.

  [迁移至空安全][]：
  将你的 package 转换为空安全的指南。

* [Unsound null safety][]:
  Conceptual and practical information about mixed-mode programs,
  in which only some libraries are null safe.

  [非健全的空安全][Unsound null safety]：
  混合空安全模式的概念性内容和部分内容，只有部分依赖处于空安全模式。

* [FAQ][]:
  Questions that have come up during migration to null safety.

  [空安全常见问题][FAQ]：
  迁移至空安全时遇到的问题。

## Known issues

## 已知的问题

Not all parts of the Flutter SDK support null safety yet,
as some parts still need additional work to
[migrate to null safety]({{site.dart-site}}/null-safety/migration-guide).

Flutter SDK 中的部分内容尚未支持空安全，
它们仍然需要一些 [迁移至空安全]({{site.dart-site}}/null-safety/migration-guide)
的额外工作。

We're currently aware of the following issues:
目前我们已经明确了以下的问题：

  * Migration of the pub.dev packages owned by the Flutter team
    is in progress. See pub.dev for
    [the current list]({{site.pub}}/packages?q=publisher%3Aflutter.dev&null-safe=1).
    We expect the majority of packages to be migrated in the coming weeks;
    the only exceptions we expect are the legacy `integration_tests` package,
    which is deprecated in favor of the version in the Flutter SDK itself
    (though see below), and some of the packages in
    <https://github.com/flutter/packages/tree/master/packages>
    which might take longer to be migrated.

    pub.dev 上 Flutter 团队的 packages 正在进行迁移。你可以查看
    [已迁移的 packages 列表]({{site.pub}}/packages?q=publisher%3Aflutter.dev&null-safe=1)。
    我们的计划是在未来几周将主要的 packages 迁移完成，唯一遗留的例外是 `integration_tests`，
    该 package 已被废弃，取而代之的是 Flutter SDK 本身的工具（见下文）。
    部分在 <https://github.com/flutter/packages/tree/master/packages> 的 package
    可能需要更长的时间进行迁移。

  * Integration testing with
    [`flutter_driver`](/docs/cookbook/testing/integration/introduction) and 
    the version of `integration_test` in the Flutter SDK.

    使用 [`flutter_driver`](/docs/cookbook/testing/integration/introduction)
    进行集成测试，以及 Flutter SDK 中的 `integration_test` 的对应版本进行测试。

      * Currently, these methods do not support null safety on the host
        side of the test. You can drive a null-safe application, but the test
        itself won't use null-safe Dart.

        目前这些测试的方式，均未支持以空安全的方式在测试环境上运行。
        你可以运行空安全的应用，但测试本身不会使用 Dart 的空安全。

      * Depending on the `flutter_driver` and `integration_test` packages
        will limit your ability to pick up some already migrated dependencies
        such as `args`, `archive`, and `crypto`,
        since these packages themselves depend on the non-migrated versions.

        当你的项目依赖 `flutter_driver` 和 `integration_test` 时，
        你可能无法升级 `args`、`archive` 和 `crypto` 至已经迁移为空安全的版本，
        因为它们本身已经依赖了非空安全的版本（将导致版本冲突）。

    We expect to have this resolved in the first half of 2021.

    我们计划在 2021 年上半年解决该问题。

If you are interested in seeing the latest updates before they
reach the beta and stable branches,
and are willing to live on the bleeding edge,
consider using dev builds (`flutter channel dev`).

如果你对还未合并到 beta 和 stable 渠道的新改动感兴趣，
并且愿意走在开发的前沿，可以考虑使用 dev 渠道 (`flutter channel dev`)。

[Migrating to null safety]: {{site.dart-site}}/null-safety/migration-guide
[FAQ]: {{site.dart-site}}/null-safety/faq
[Sound null safety]: {{site.dart-site}}/null-safety
[Understanding null safety]: {{site.dart-site}}/null-safety/understanding-null-safety
[Unsound null safety]: {{site.dart-site}}/null-safety/unsound-null-safety
