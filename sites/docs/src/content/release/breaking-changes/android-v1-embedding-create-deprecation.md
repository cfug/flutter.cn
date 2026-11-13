---
# title: Android v1 embedding app and plugin creation deprecation
title: 弃用基于 Android v1 embedding 创建应用和插件
# description: Gradual deprecation of the Android v1 embedding.
description: 逐步弃用 Android v1 embedding。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `flutter create` templates for apps and plugins
no longer create Android wrapping based on the
v1 Android embedding as part of our gradual
Android v1 embedding deprecation process described in our
[Android Migration Summary][].

作为 [Android 迁移摘要][Android Migration Summary] 中所述的
Android v1 embedding 逐步弃用流程的一部分，
应用和插件的 `flutter create` 模板
不再基于 v1 Android embedding 创建 Android 封装。

Application projects using the v1 Android embedding
are encouraged to migrate following the steps described in
[Upgrading pre 1.12 Android projects][].

使用 v1 Android embedding 的应用项目，
建议按照 [升级 1.12 之前的 Android 项目][Upgrading pre 1.12 Android projects]
中的步骤迁移。

Plugins targeting the v1 Android embedding are encouraged
to migrate following the instructions in
[Supporting the new Android plugins APIs][].

面向 v1 Android embedding 的插件，
建议按照 [支持新的 Android 插件 API][Supporting the new Android plugins APIs]
中的说明迁移。

[Android Migration Summary]: /go/android-migration-summary
[Upgrading pre 1.12 Android projects]: {{site.repo.flutter}}/blob/main/docs/platforms/android/Upgrading-pre-1.12-Android-projects.md
[Supporting the new Android plugins APIs]: /release/breaking-changes/plugin-api-migration

## Context

## 背景

In Flutter version 1.12, we launched a v2 set of
Android APIs based on the [`io.flutter.embedding`][]
package in order to enable the [add-to-app][] workflow
on Android.

在 Flutter 1.12 中，我们发布了一套基于
[`io.flutter.embedding`][] package 的 v2 Android API，
以便在 Android 上支持 [添加到现有应用][add-to-app] 工作流。

Over time, we gradually deprecated the older
v1 Android embeddings based on the
[`io.flutter.app`][] package.

此后，我们逐步弃用了基于 [`io.flutter.app`][] package 的
旧版 v1 Android embedding。

As of Q2 2020, only 26% of applications used the v1 embeddings.

截至 2020 年第二季度，只有 26% 的应用仍在使用 v1 embedding。

Since the v2 embeddings were strongly established over
the 7 months since the launch of Flutter v1.12,
we disabled the creation of new app and plugin
projects using the v1 embeddings.

自 Flutter v1.12 发布后的 7 个月里，v2 embedding 已经稳固确立，
因此我们禁止再用 v1 embedding 创建新的应用和插件项目。

[add-to-app]: /add-to-app
[`io.flutter.embedding`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/embedding/
[`io.flutter.app`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/app/.

## Description of change

## 变更说明

The `flutter config` command no longer has a
toggleable `enable-android-embedding-v2`
flag (which defaulted to true since v1.12).
All projects created with `flutter create`
and `flutter create -t plugin` exclusively use the
Android v2 embedding.

`flutter config` 命令不再提供可切换的
`enable-android-embedding-v2` 标志
（自 v1.12 起该标志默认为 true）。
用 `flutter create` 和 `flutter create -t plugin` 创建的所有项目
都只使用 Android v2 embedding。

Existing v1 applications continue to work.

现有的 v1 应用仍然可以工作。

Existing v1 applications consuming plugins now receive
a warning prompt to migrate to v2 embedding.

使用插件的现有 v1 应用现在会收到警告，
提示迁移到 v2 embedding。

Existing v1 applications consuming a plugin that targets
only the v2 embedding won't build and must migrate.
This has been the case since v1.12. However,
the likelihood of encountering this increases as
plugin developers create and publish v2 only plugins.

如果现有 v1 应用使用的插件只面向 v2 embedding，
就无法构建，必须迁移。
自 v1.12 起就是如此。
不过，随着插件开发者创建并发布仅支持 v2 的插件，
遇到这种情况的可能性会增加。

Existing v2 applications continue to work with or without
plugins.

现有的 v2 应用无论是否使用插件，都可以继续工作。

Existing v2 applications consuming plugins that only
target the v1 embedding continue to receive a warning prompt.
The likelihood of encountering this decreases
as plugin developers create and publish v2 plugins.

使用只面向 v1 embedding 的插件的现有 v2 应用，
仍会收到警告提示。
随着插件开发者创建并发布 v2 插件，
遇到这种情况的可能性会降低。

## Migration guide

## 迁移指南

For more information,
see [Upgrading pre 1.12 Android projects][].

更多信息请参阅
[升级 1.12 之前的 Android 项目][Upgrading pre 1.12 Android projects]。

## Timeline

## 时间线

Landed in version: 1.20.0-8.0<br>
In stable release: 1.22

合入版本：1.20.0-8.0<br>
进入稳定版：1.22
