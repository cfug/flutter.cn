---
# title: Merged threads on Linux
title: Linux 上的线程合并
# description: >-
#   Learn about the threading changes on Linux in Flutter 3.39.
description: 了解 Flutter 3.39 中 Linux 平台的线程变更。
ai-translated: true
---

## Summary

## 概要

Flutter 3.39 merges the UI and platform threads by default on Linux.

Flutter 3.39 在 Linux 上默认合并 UI 线程与平台线程。

## Context

## 背景

Originally, Flutter had separate threads to produce UI frames and
to interact with the native platform.

最初，Flutter 使用独立的线程来生成 UI 帧，并与原生平台交互。

The split-thread design prevented Flutter apps and plugins from using Dart FFI
to interoperate with native APIs that must be called on the platform thread.

线程分离的设计让 Flutter 应用和插件无法通过 Dart FFI
调用必须在平台线程上执行的原生 API。

## Description of change

## 变更说明

Flutter version 3.39 merges the UI and platform threads by default on Linux.

Flutter 3.39 在 Linux 上默认合并 UI 线程与平台线程。

This mirrors all the other platforms, whose threads were merged by default in
Flutter 3.29 (iOS and Android) and 3.35 (macOS and Windows).

这与其他平台保持一致：iOS 和 Android 在 Flutter 3.29 中默认合并线程，
macOS 和 Windows 则在 3.35 中默认合并。

## Migration guide

## 迁移指南

Merged threads shouldn't affect your app.

合并线程不应影响你的应用。

If you suspect merged threads have caused regressions to your app,
please reach out on [Issue 150525][].

如果你怀疑合并线程导致应用出现回归，
请在 [Issue 150525][] 中反馈。

## Timeline

## 时间线

Landed in version: 3.39.0-0.1.pre<br>
合入版本：3.39.0-0.1.pre<br>
In stable release: 3.41

进入稳定版：3.41

## References

## 参考资料

Relevant issue:

相关 issue：

* [Issue 150525][]

Relevant PRs:

相关 PR：

* [PR 176759][]

[Issue 150525]: {{site.repo.flutter}}/issues/150525
[PR 176759]: {{site.repo.flutter}}/pull/176759
