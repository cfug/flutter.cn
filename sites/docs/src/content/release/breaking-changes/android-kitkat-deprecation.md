---
# title: Dropping support for Android KitKat
title: 停止支持 Android KitKat
# description: >-
#   Flutter is raising the minimum supported Android version from
#   KitKat (API 19) to Lollipop (API 21).
description: >-
  Flutter 将最低支持的 Android 版本从 KitKat (API 19)
  提高到 Lollipop (API 21)。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Flutter's minimum supported Android version is now Lollipop (API 21).
Beginning with Flutter's 3.22 stable release,
Flutter will no longer work on devices running Android KitKat (API 19).

Flutter 现在最低支持的 Android 版本是 Lollipop (API 21)。
从 Flutter 3.22 稳定版开始，Flutter
将无法在运行 Android KitKat (API 19) 的设备上工作。

## Context

## 上下文

The context, purpose, and description of this deprecation can be found in
the [go/rfc-android-k-deprecation][] design document.

此次弃用的背景、目的和说明，
见 [go/rfc-android-k-deprecation][] 设计文档。

## Migration guide

## 迁移指南

Flutter developers targeting Android will need to increase the
`minSdkVersion` in their `build.gradle` and `AndroidManifest.xml` files
from `19` to at least `21`.

面向 Android 的 Flutter 开发者需要把
`build.gradle` 和 `AndroidManifest.xml` 中的 `minSdkVersion`
从 `19` 提高到至少 `21`。

## Timeline

## 时间线

In stable release: 3.22

进入稳定版：3.22

[go/rfc-android-k-deprecation]: {{site.main-url}}/go/rfc-android-k-deprecation
