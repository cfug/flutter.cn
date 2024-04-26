---
title: Flutter compatibility policy
title: Flutter 兼容性策略
description: How Flutter approaches the question of breaking changes.
description: Flutter 团队如何处理破坏性改动 (breaking changes) 的问题。
---

The Flutter team tries to balance the need for API stability with the
need to keep evolving APIs to fix bugs, improve API ergonomics,
and provide new features in a coherent manner.

Flutter 团队努力平衡对 API 稳定性的需求和对 API 持续研发以修复 bug，提升其人机工程学体验的需求。
并且我们会通过一种连贯的方式来提供新特性。

To this end, we have created a test registry where you can provide
unit tests for your own applications or libraries that we run
on every change to help us track changes that would break
existing applications. Our commitment is that we won't make any
changes that break these tests without working with the developers of
those tests to (a) determine if the change is sufficiently valuable,
and (b) provide fixes for the code so that the tests continue to pass.

为此，我们已经创建了一个测试登记。你可以在这里针对每个改动为你的应用或库提供单元测试，
以帮助我们追踪对现存应用造成破坏的那些改动。
我们承诺，与这些测试的开发者进行合作以确定以下两点之前，将不会有任何改动破坏这些测试。
（1）决定改动是否足够有价值；（2）提供对代码的修复方案使得这些测试能够继续通过。

If you would like to provide tests as part of this program, please
submit a PR to the [flutter/tests repository][]. 
The [README][flutter-tests-readme] on that repository describes 
the process in detail.

作为该计划的一部分，如果你想要提供一些测试方案，
请向 [flutter/tests repository][] 提交 PR。
这个仓库中的 [README][flutter-tests-readme] 文件描述了具体流程。

[flutter/tests repository]: {{site.github}}/flutter/tests
[flutter-tests-readme]: {{site.github}}/flutter/tests#adding-more-tests

## Announcements and migration guides

## 公告和迁移指南

If we do make a breaking change (defined as a change that caused one
or more of these submitted tests to require changes), we will announce
the change on our [flutter-announce][]
mailing list as well as in our release notes.

如果我们确实发布了一项破坏性改动（定义为：会导致一个或更多已提交的测试需要变化的改动），
我们将通过 [flutter-announce][] 邮件列表公布，并且同时写在发布版说明上。

We provide a list of [guides for migrating code][] affected by
breaking changes.

我们提供一个受破坏性改动影响的
[迁移代码指南][guides for migrating code] 列表。

[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[guides for migrating code]: /release/breaking-changes

## Deprecation policy

## 废弃政策

We will, on occasion, deprecate certain APIs rather than outright
break them overnight. This is independent of our compatibility policy
which is exclusively based on whether submitted tests fail, as
described above.

我们将会不定期的废弃一些确定的 API，而不是直接让他们不可用。
这将独立于我们的兼容性政策，只基于已提交的测试是否失败，就如同之前描述的那样。

Deprecated APIs are removed after a migration grace period. This grace
period is one calendar year after being released on the stable channel,
or after 4 stable releases, whichever is longer.

已经废弃的 API 将会在一个宽限周期后移除。
以发布至稳定版本时开始至一个日历年，
或是 4 个稳定版本的发布为一个宽限周期，以时间最长的为准。

When a deprecation does reach end of life, we follow the same procedures
listed above for making breaking changes in removing the deprecated API.

当已经废弃的 API 到达了弃用期限时，我们会依照同上的步骤移除废弃的 API。

## Dart and other libraries used by Flutter

## Dart 和其它被 Flutter 使用的库

The Dart language itself has a [separate breaking-change policy][],
with announcements on [Dart announce][].

Dart 编程语言有 [自己的破坏性改动和弃用政策][separate breaking-change policy]，
并会在 [Dart 编程语言通知邮件列表][Dart announce] 里公布。

In general, the Flutter team doesn't currently have any commitment
regarding breaking changes for other dependencies.
For example, it's possible that a new version of
Flutter using a new version of Skia
(the graphics engine used by some platforms on Flutter)
or Harfbuzz (the font shaping engine used by Flutter)
would have changes that affect contributed tests.
Such changes wouldn't necessarily be accompanied by a
migration guide.

总而言之，关于其它依赖的破坏性改动，Flutter 团队目前没有做出任何承诺。
例如，有可能 Flutter 的一个新版本使用了新版本的 Skia（Flutter 使用的图形引擎）
或者 Harfbuzz（Flutter 使用的字体形状引擎），将会影响到已提交测试的改动。
这一类的改动不一定会被写入迁移指南。

[separate breaking-change policy]: {{site.github}}/dart-lang/sdk/blob/main/docs/process/breaking-changes.md
[Dart announce]: {{site.groups}}/a/dartlang.org/g/announce
