---
# title: Merged threads on macOS and Windows
title: macOS 与 Windows 上的线程合并
# description: >-
#   Learn about threading changes on macOS and Windows in Flutter 3.35.
description: >-
  了解 Flutter 3.35 在 macOS 与 Windows 上的线程改动。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Flutter 3.35 merges the UI and platform threads by default on macOS and Windows.

Flutter 3.35 在 macOS 和 Windows 上默认合并 UI 线程与平台线程。

## Context

## 上下文

Originally, Flutter had separate threads to produce UI frames and to
interact with the native platform.

起初，Flutter 用不同的线程来生成 UI 帧，以及与原生平台交互。

The split-thread design prevented Flutter apps and plugins from using Dart FFI
to interoperate with native APIs that must be called on the platform thread.

线程分离之后，Flutter 应用和插件无法通过 Dart FFI
调用必须在平台线程上执行的原生 API。

## Description of change

## 改动说明

Flutter 3.35 merges the UI and platform threads by default on macOS and Windows.

Flutter 3.35 在 macOS 和 Windows 上默认合并 UI 线程与平台线程。

This mirrors iOS and Android, whose threads were merged by default in
Flutter 3.29.

这与 iOS 和 Android 一致。
这两个平台的线程已在 Flutter 3.29 中默认合并。

## Migration guide

## 迁移指南

Merged threads should not affect your app.

线程合并不应影响你的应用。

If you suspect merged threads has regressed your app, please reach out on
[Issue 150525][].

如果你怀疑线程合并导致应用出现回退，请在 [Issue 150525][Issue 150525] 上反馈。

## Timeline

## 时间线

Landed in version: 3.33.0-0.0.pre<br>
合入版本：3.33.0-0.0.pre<br>
In stable release: 3.35

进入稳定版：3.35

## References

## 参考资料

Relevant issue:

相关 issue：

* [Issue 150525][]

Relevant PRs:

相关 PR：

* [PR 166536][]
* [PR 167472][]

[Issue 150525]: {{site.repo.flutter}}/issues/150525
[PR 166536]: {{site.repo.flutter}}/pull/166536
[PR 167472]: {{site.repo.flutter}}/pull/167472
