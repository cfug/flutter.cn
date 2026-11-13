---
# title: Windows build path changed to add the target architecture
title: Windows 构建路径变更为包含目标架构
# description: >-
#   In preparation for supporting Windows on Arm64,
#   the Windows build path was updated to include the target architecture.
description: >-
  为支持 Windows on Arm64 做准备，
  Windows 构建路径已更新为包含目标架构。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Built executables for Flutter Windows apps are now located in architecture
dependent folders.

Flutter Windows 应用构建出的可执行文件，
现在位于与架构对应的文件夹中。

## Context

## 背景

In preparation for supporting Windows on Arm64, the Windows build path was
updated to add the build's target architecture.

为支持 Windows on Arm64 做准备，
Windows 构建路径已更新，加入了构建的目标架构。

Previously, Flutter builds for Windows assumed an x64 target architecture.

先前，Flutter 的 Windows 构建假定目标架构为 x64。

## Migration guide

## 迁移指南

You may need to update your infrastructure to use the new Flutter Windows
build path.

你可能需要更新基础设施，以使用新的 Flutter Windows 构建路径。

Example build path before the migration:

迁移前的构建路径示例：

```plaintext
build\windows\runner\Release\hello_world.exe
```

Example build path after the migration if targeting x64:

若目标为 x64，迁移后的构建路径示例：

```plaintext
build\windows\x64\runner\Release\hello_world.exe
```

Example build path after the migration if targeting Arm64:

若目标为 Arm64，迁移后的构建路径示例：

```plaintext
build\windows\arm64\runner\Release\hello_world.exe
```

If you use [`package:msix`][], update to version 3.16.7 or newer.

如果你使用 [`package:msix`][]，请更新到 3.16.7 或更高版本。

[`package:msix`]: {{site.pub-pkg}}/msix

## Timeline

## 时间线

Landed in version: 3.15.0-0.0.pre<br>
In stable release: 3.16

合入版本：3.15.0-0.0.pre<br>
进入稳定版：3.16

## References

## 参考资料

Design document:

设计文档：

* [flutter.dev/go/windows-arm64][]

Relevant pull requests:

相关 PR：

* [Introduce architecture subdirectory for Windows build][]

  [为 Windows 构建引入架构子目录][Introduce architecture subdirectory for Windows build]

[flutter.dev/go/windows-arm64]: {{site.main-url}}/go/windows-arm64
[Introduce architecture subdirectory for Windows build]: {{site.repo.flutter}}/pull/131843
