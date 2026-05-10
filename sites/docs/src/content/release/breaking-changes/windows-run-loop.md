---
# title: Migrate a Windows project to the idiomatic run loop
title: 将工程迁移到更有利于 Windows 的事件循环系统
# description: How to update a Windows project to use the idiomatic run loop
description: 学习如何将你的 Windows 工程升级为使用更好的 Windows 事件循环策略
---

{% render "docs/breaking-changes.md" %}

Flutter 2.5 replaced Windows apps' run loop with an idiomatic
Windows message pump to reduce CPU usage.

Flutter 2.5 开始使用更有利于 Windows 的事件循环系统来降低 CPU 使用率。

Projects created before Flutter version 2.5 need to be
migrated to get this improvement. You should follow the
migration steps below if the `windows/runner/run_loop.h`
file exists in your project.

在 Flutter 2.5 版本之前创建的项目需要进行迁移来获得这种改进。
如果你的项目中存在 `windows/runner/run_loop.h` 文件，
你应该遵循下面的迁移步骤。

## Migration steps

## 迁移步骤

:::note

As part of this migration, you must recreate your Windows project,
which clobbers any custom changes to the
files in the `windows/runner` folder.  The following steps
include instructions for this scenario.

作为迁移步骤之一，你必须重新创建你的 Windows 项目，
这将会抹除掉 `windows/runner` 文件夹中所有文件的自定义修改。
下面的步骤将会对这种情况进行说明。

:::

Your project can be updated using these steps:

你的项目可以通过这些步骤进行迁移：

1. Verify you are on Flutter version 2.5 or newer using `flutter --version`

   使用 `flutter --version` 指令，确认你的 Flutter 是 2.5 或更高的版本；

2. If needed, use `flutter upgrade` to update to the latest version of the
   Flutter SDK

   如果可以的话，使用 `flutter upgrade` 指令，更新 Flutter SDK 到最新版本；

3. Backup your project with git (or your preferred version control system),
   since you need to reapply any local changes you've made (if any) to your
   project in a later step

   使用 git（或你习惯的版本控制系统）备份你的项目，
   因为你需要在后面的步骤中，
   重新应用之前在本地做的所有自定义修改（如果有的话）；

4. Delete all files under the `windows/runner` folder

   确保备份完成后，删除 `windows/runner` 文件夹下所有文件；

5. Run `flutter create --platforms=windows .` to recreate the Windows project

   运行 `flutter create --platforms=windows .` 指令，重建 Windows 项目；

6. Review the changes to files in the `windows/runner` folder

   检查 `windows/runner` 文件夹中文件的改动；

7. Reapply any custom changes made to the files in the
   `windows/runner` folder prior to this migration

   重新应用你备份的 `windows/runner` 文件夹中所有文件之前做的自定义修改；

8. Verify that your app builds using `flutter build windows`

   使用 `flutter build windows` 指令，验证应用程序的构建情况。
