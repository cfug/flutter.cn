---
title: Flutter compatibility policy
title: Flutter 兼容性策略
description: How Flutter approaches the question of breaking changes.
description: Flutter 团队如何处理重要改动 (breaking changes) 的问题。
---

The Flutter team tries to balance the need for API stability with the
need to keep evolving APIs to fix bugs, improve API ergonomics,
and provide new features in a coherent manner.

Flutter 团队努力平衡对 API 稳定性的需求和对 API 保持研发以修复 bug ，提升其使用体验的需求。
并且我们会通过一种连贯的方式来提供新特性。

To this end, we have created a test registry where you can provide
unit tests for your own applications or libraries that we run
on every change to help us track changes that would break
existing applications. Our commitment is that we won't make any
changes that break these tests without working with the developers of
those tests to (a) determine if the change is sufficiently valuable,
and (b) provide fixes for the code so that the tests continue to pass.

为此，我们已经创建了一个测试集合。你可以在这里针对每一个更改，为你的应用或库提供单元测试，以帮助我们追踪那些对现存应用造成破坏的改动。我们承诺，与这些测试的开发者进行合作以确定以下两点之前，将不会做出任何破坏这些测试的改动。
（1）决定改动是否足够有价值；（2）提供对代码的修复方案使得这些测试能够继续通过。 

If you would like to provide tests as part of this program, please
submit a PR to the [flutter/tests repository][]. The README.md file on
that repository describes the process in detail.

作为计划的一部分，如果你想要为其提供测试，请向 [flutter/tests repository][] 提交 PR 。这个仓库中的 README.md 文件描述了具体流程。

## Announcements and migration guides

## 公告和迁移指南

If we do make a breaking change (defined as a change that caused one
or more of these submitted tests to require changes), we will announce
the change on our [flutter-announce][]
mailing list as well as in our release notes.

如果我们确实发布了一项重要改动（定义为：会导致一个或更多已提交的测试需要变化的改动），我们将通过 [flutter-announce][]  邮箱列表公布，并且同时写在发布版说明上。

We provide a list of [guides for migrating code][] affected by
breaking changes.

我们提供一个受重要改动影响的 [迁移代码指南][] 列表。

## Deprecation policy

## 废弃政策

We will, on occasion, deprecate certain APIs rather than outright
break them overnight. This is independent of our compatibility policy
which is exclusively based on whether submitted tests fail, as
described above.

我们将会不定期的指明废弃一些确定的API，而不是一夜之间就让他们不可使用。这将独立于我们的兼容性政策，只基于已提交的测试是否失败，就如同之前描述的那样。

## Dart and other libraries used by Flutter

## Dart 和其它被 Flutter 使用的库

The Dart language itself has a separate breaking-change policy,
[documented on the Dart wiki][].

Dart 语言本身有一个另外的重要改动政策， [记录在 Dart wiki 中][] 。

In general, the Flutter team does not currently have any commitment
regarding breaking changes for other dependencies. For example,
it's possible that a new version of Flutter using a new version of Skia
(the graphics engine used by Flutter) or Harfbuzz (the font shaping
engine used by Flutter) would have changes that affect contributed
tests. Such changes would not necessarily be accompanied by a
migration guide.

大体上讲，关于其它依赖的重要改动， Flutter 团队目前没有做出任何承诺。例如，有可能 Flutter 的一个新版本使用了新版本的 Skia （ Flutter 使用的图形引擎）或者 Harfbuzz （ Flutter 使用的字体形状引擎），将会产生影响到已提交测试的改动。这一类的改动不一定会被写入迁移指南。

[documented on the Dart wiki]: {{site.github}}/dart-lang/sdk/blob/master/docs/process/breaking-changes.md

[记录在 Dart wiki 中]: {{site.github}}/dart-lang/sdk/blob/master/docs/process/breaking-changes.md

[flutter/tests repository]: {{site.github}}/flutter/tests
[flutter-announce]: https://groups.google.com/forum/#!forum/flutter-announce

[guides for migrating code]: /docs/release/breaking-changes

[迁移代码指南]: /docs/release/breaking-changes