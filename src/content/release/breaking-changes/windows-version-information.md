---
title: Migrate a Windows project to set version information
title: 迁移 Windows 项目以支持设置版本信息
description: How to update a Windows project to set version information
description: 如何迁移 Windows 项目以支持设置版本信息
---

Flutter 3.3 added support for setting the Windows app's version from
the `pubspec.yaml` file or through the `--build-name` and `--build-number`
build arguments. For more information, refer to the
[Build and release a Windows app][] documentation.

Flutter 3.3 新增了一项功能支持，
你可以通过 `pubspec.yaml` 文件或者
使用 `--build-name` 和 `--build-number` 指令构建参数
来设置 Windows 应用程序的版本。
更多信息，请参阅 [构建和发布为 Windows 应用][Build and release a Windows app] 文档。

Projects created before Flutter version 3.3 need to be migrated
to support versioning.

在 Flutter 3.3 版本之前创建的项目需要通过迁移来支持版本管理。

## Migration steps

## 迁移步骤

Your project can be updated using these steps:

你的项目可以通过这些步骤进行迁移：

1. Verify you are on Flutter version 3.3 or newer using `flutter --version`

   使用 `flutter --version` 指令，确认你的 Flutter 是 3.3 或更高的版本

2. If needed, use `flutter upgrade` to update to the latest version of the
   Flutter SDK

   如果可以的话，请使用 `flutter upgrade` 指令，更新 Flutter SDK 到最新版本

3. Backup your project, possibly using git or some other version control system

   备份你的项目，请尽量使用 git 或一些其他的版本控制系统

4. Delete the `windows/runner/CMakeLists.txt` and `windows/runner/Runner.rc`
   files

   确保备份完成后，删除 `windows/runner/CMakeLists.txt` 和 `windows/runner/Runner.rc` 文件

5. Run `flutter create --platforms=windows .`

   运行 `flutter create --platforms=windows .` 指令

6. Review the changes to your `windows/runner/CMakeLists.txt` and
   `windows/runner/Runner.rc` files

   检查 `windows/runner/CMakeLists.txt` 和 `windows/runner/Runner.rc` 文件的改动

7. Verify your app builds using `flutter build windows`

   运行 `flutter build windows` 指令，验证应用程序的构建情况

:::note

Follow the [run loop migration guide][] if the build fails
with the following error message:

如果构建失败并显示以下报错信息，
请遵循 [Windows 事件循环迁移指南][run loop migration guide] 来解决问题：

```console
flutter_window.obj : error LNK2019: unresolved external symbol "public: void __cdecl RunLoop::RegisterFlutterInstance(class flutter::FlutterEngine *)" (?RegisterFlutterInstance@RunLoop@@QEAAXPEAVFlutterEngine@flutter@@@Z) referenced in function "protected: virtual bool __cdecl FlutterWindow::OnCreate(void)" (?OnCreate@FlutterWindow@@MEAA_NXZ)
```

:::

## Example

## 示例

[PR 721][] shows the migration work for the
[Flutter Gallery][] app.

[PR 721][] 展示了 [Flutter Gallery][] 应用程序的迁移工作。

[Build and release a Windows app]: /deployment/windows#updating-the-apps-version-number
[run loop migration guide]: /release/breaking-changes/windows-run-loop
[PR 721]: {{site.repo.gallery-archive}}/pull/721/files
[Flutter Gallery]: {{site.gallery-archive}}