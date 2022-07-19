---
title: Xcode Migration
title: Xcode 迁移
description: How to migrate existing Flutter iOS projects to Xcode 11.4.
description: 如何迁移旧版的 Flutter iOS 项目至新版 Xcode。
tags: Flutter开发,部署
keywords: Xcode 11.4
---

{{site.alert.note}}

  You might be directed to this page if Flutter detects that your project
  doesn't support Xcode 11.4 or higher.

  如果 Flutter 检测到你的项目不支持 Xcode 11.4 及以上的版本，
  可能会提示你查看该页面。

{{site.alert.end}}

To develop Flutter apps for iOS, you need a Mac with Xcode installed.
Xcode 11.4 changed the way frameworks are linked and embedded,
and you may [see the following errors when switching between
iOS devices and simulators:][errors]

你需要一台安装了 Xcode 的 Mac 来开发 iOS 的 Flutter 应用。
Xcode 11.4 变更了很多库的链接和集成方式，你可能会在
[iOS 真机和模拟器之间切换时遇到以下两个错误][errors]：

```
Building for iOS, but the linked and embedded framework 'App.framework' was built for iOS Simulator.
```

or

或者

```
Building for iOS Simulator, but the linked and embedded framework 'App.framework' was built for iOS.
```

Flutter v1.15.3 and later automatically migrates your Xcode project.

Flutter 1.15.3 及以上的版本会自动迁移你的 Xcode 项目。

If you need to manually upgrade your project, use the following steps:

你可以手动执行以下步骤进行迁移：

<ol markdown="1">
<li markdown="1">

From the Flutter app directory, open `ios/Runner.xcworkspace` in Xcode.

在 Flutter 应用目录下，使用 Xcode 打开 `ios/Runner.xcworkspace`。

</li>
<li markdown="1">

In the **Navigator** pane, locate the
**Flutter** group and remove `App.framework`
and `Flutter.framework`.

在 **Navigator** 面板，定位到 **Flutter** 组别并移除
`App.framework` 和 `Flutter.framework`。

{% include docs/app-figure.md image="development/ios-project-migration/navigator.png" alt="Remove Frameworks in Xcode Navigator" %}
</li>

<li markdown="1">

In the Runner target build settings
 **Build Phases > Link Binary With Libraries**
confirm `App.framework` and `Flutter.framework`
are no longer present. Also confirm
in **Build Phases > Embed Frameworks**.

在 Runner 目标的构建设置 (build settings) 的
**Build Phases > Link Binary With Libraries**
和 **Build Phases > Embed Frameworks**
中确认 `App.framework` 和 `Flutter.framework`
已经不存在。

{% include docs/app-figure.md image="development/ios-project-migration/framework-build-phase.png" alt="Confirm Frameworks Removed from Build Phases" %}
</li>

<li markdown="1">

Change the Runner target build settings
**Build Phases > Thin Binary** script as follows:

修改 Runner 目标构建设置的 **Build Phases > Thin Binary**
构建命令为以下内容：

```sh
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" embed
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" thin
```
{% include docs/app-figure.md image="development/ios-project-migration/script-phase.png" alt="Update Thin Binary Script Build Phase" %}
</li>

<li markdown="1">

In the Runner target **Build Settings >
Other Linker Flags** (`OTHER_LDFLAGS`)
add `$(inherited) -framework Flutter`.

在 Runner 目标的
**Build Settings > Other Linker Flags** (`OTHER_LDFLAGS`)
中添加 `$(inherited) -framework Flutter`。

{% include docs/app-figure.md image="development/ios-project-migration/linker-arguments.png" alt="Update Other Linker Arguments Build Setting" %}
</li>
</ol>

{{site.alert.tip}}

  If you are using Flutter plugins, you can now delete the line
  `install! 'cocoapods', :disable_input_output_paths => true` from `ios/Podfile`
  to improve compilation time. Flutter projects created after v1.15.4 will not
  contain this line.

  如果你的项目使用了 Flutter 插件，你可以从 `ios/Podfile` 中
  删除 `install! 'cocoapods', :disable_input_output_paths => true`
  来改善构建时间。
  自 Flutter 1.15.4 版本以后创建的项目不会包含这一行。

{{site.alert.end}}

[errors]: {{site.repo.flutter}}/issues/50568
