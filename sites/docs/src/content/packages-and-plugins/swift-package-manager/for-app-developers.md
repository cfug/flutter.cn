---
# title: Swift Package Manager for app developers
title: 面向应用开发者的 Swift Package Manager
# description: How to use Swift Package Manager for native iOS or macOS dependencies
description: 如何使用 Swift Package Manager 管理 iOS 或 macOS 原生依赖
ai-translated: true
---

:::note
As of the 3.44 release, Flutter uses [Swift Package Manager][]
to manage iOS and macOS native dependencies.
Flutter continues to support CocoaPods in maintenance mode,
however, the CocoaPods registry permanently becomes
[read-only on December 2, 2026][cocoapods].

自 Flutter 3.44 起，Flutter 使用 [Swift Package Manager][]，
来管理 iOS 和 macOS 的原生依赖项。
CocoaPods 已正式进入维护模式，
其注册表将 [于 2026 年 12 月 2 日永久变为只读][cocoapods]。
:::

[cocoapods]: https://blog.cocoapods.org/CocoaPods-Specs-Repo/
[Swift Package Manager]: https://www.swift.org/documentation/package-manager/

## How to turn on Swift Package Manager

## 如何启用 Swift Package Manager

As of the 3.44 release, Flutter's Swift Package Manager (SwiftPM)
support is on by default.
Upgrading Flutter and running your app automatically adds SwiftPM integration.
This makes your project download the Swift packages that
your Flutter plugins depend on.
To use an older Flutter version,
you might need to [remove Swift Package Manager integration][removeSPM]
from the app.

自 3.44 版本起，Flutter 默认启用 Swift Package Manager (SwiftPM) 支持。
升级 Flutter 并运行应用会自动添加 SwiftPM 集成，
这会让你的项目下载 Flutter 插件所依赖的 Swift package。
若要使用较旧版本的 Flutter，
你可能需要从应用中 [移除 Swift Package Manager 集成][removeSPM]。

Note that Flutter falls back to CocoaPods for dependencies that don't
yet support Swift Package Manager.

注意，对于尚不支持 Swift Package Manager 的依赖项，
Flutter 会回退到使用 CocoaPods。

[Optional] To check if your project is using SwiftPM:

[可选] 检查你的项目是否正在使用 SwiftPM：

1. In Xcode, run the app.

   在 Xcode 中运行应用。

1. Ensure that  **Run Prepare Flutter Framework Script** runs as a pre-action
   and that `FlutterGeneratedPluginSwiftPackage` is a target dependency.

   确保 **Run Prepare Flutter Framework Script** 作为 pre-action 运行，
   且 `FlutterGeneratedPluginSwiftPackage` 是一个 target 依赖项。

   <DashImage image="development/packages-and-plugins/swift-package-manager/flutter-pre-action-build-log.png" caption="Ensure **Run Prepare Flutter Framework Script** runs as a pre-action" />

If you previously disabled SwiftPM, you might need to enable it with
`flutter config --enable-swift-package-manager`.

如果你之前禁用过 SwiftPM，
可能需要使用 `flutter config --enable-swift-package-manager` 来启用。

If automatic migration works for you, that's it!
You are done with this page.

如果自动迁移对你有效，那就大功告成了！
本页内容到此结束。

## How to add Swift Package Manager integration manually

## 如何手动添加 Swift Package Manager 集成

When you upgrade to Flutter 3.44 or later and run
your app, SwiftPM integration is automatically added. You only need
these instructions if problems occurred and you need to manually
add SwiftPM integration to your project.

当你升级到 Flutter 3.44 或更高版本并运行应用时，
SwiftPM 集成会自动添加。只有当出现问题、
你需要手动为项目添加 SwiftPM 集成时，才需要参考这些说明。

Most developers do not need to do this.

大多数开发者无需这样做。

If you experience a problem automatically migrating your
project to SwiftPM, please [file an issue][].
Include the error message and, if possible,
include a copy of the following files in your issue:

如果在将项目自动迁移到 SwiftPM 的过程中遇到问题，
请 [提交一个 issue][file an issue]。
请附上错误信息，如有可能，
还请在 issue 中附上以下文件的副本：

* `ios/Runner.xcodeproj/project.pbxproj`
* `ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme`
   (or the xcsheme for the flavor used)

   `ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme`
  （或所用 flavor 对应的 xcscheme）

<Tabs key="darwin-platform">
<!-- <Tab name="iOS project"> -->
<Tab name="iOS 项目">

{% render "docs/swift-package-manager/migrate-ios-project-manually.md", site: site %}

</Tab>
<!-- <Tab name="macOS project"> -->
<Tab name="macOS 项目">

{% render "docs/swift-package-manager/migrate-macos-project-manually.md", site: site %}

</Tab>
</Tabs>

[file an issue]: {{site.github}}/flutter/flutter/issues/new?template=02_bug.yml

### Add to an existing app (add-to-app)

### 添加到现有应用 (add-to-app)

To use SwiftPM, consult one of the following pages, as appropriate:

要使用 SwiftPM，请根据需要参阅以下页面之一：

* [Integrate a Flutter app into your iOS project][ios-add-2-app]

  [将 Flutter 应用集成到你的 iOS 项目][ios-add-2-app]

* [Integrate a Flutter app into your macOS project][macos-add-2-app]

  [将 Flutter 应用集成到你的 macOS 项目][macos-add-2-app]

[ios-add-2-app]:   /add-to-app/ios/project-setup
[macos-add-2-app]: /add-to-app/macos/project-setup

### Add to a custom Xcode target

### 添加到自定义 Xcode target

Your Flutter Xcode project can have custom [Xcode targets][] to build additional
products, like frameworks or unit tests.
You can add Swift Package Manager integration to these custom Xcode targets.

Flutter Xcode 项目可有自定义 [Xcode targets][] 以构建框架或单元测试等产品。
你可以为这些自定义 Xcode target 添加 Swift Package Manager 集成。

Follow the steps in
[How to add Swift Package Manager integration][manualIntegration].

请按照 [如何添加 Swift Package Manager 集成][manualIntegration] 中的步骤操作。

In [Step 1][] for list item 6,
use your custom target instead of the `Flutter` target.

在 [步骤 1][Step 1] 的第 6 项中，使用你的自定义 target，而非 `Flutter` target。

In [Step 2][] for list item 6,
use your custom target instead of the `Flutter` target.

在 [步骤 2][Step 2] 的第 6 项中，使用你的自定义 target，而非 `Flutter` target。

[Xcode targets]: {{site.apple-dev}}/documentation/xcode/configuring-a-new-target-in-your-project
[manualIntegration]: #how-to-add-swift-package-manager-integration-manually
[Step 1]: #step-1-add-fluttergeneratedpluginswiftpackage-package-dependency
[Step 2]: #step-2-add-run-prepare-flutter-framework-script-pre-action

## How to remove Swift Package Manager integration

## 如何移除 Swift Package Manager 集成

When your app is modified to support SwiftPM,
the Xcode project is updated to add Flutter plugin dependencies.

添加 Swift Package Manager 集成时，Flutter CLI 会迁移你的项目，
更新 Xcode 项目以添加 Flutter 插件依赖。

To undo this migration:

要撤销此迁移：

1. [Turn off Swift Package Manager][].

   [关闭 Swift Package Manager][Turn off Swift Package Manager]。

1. Clean your project:

   清理项目：

   ```sh
   flutter clean
   ```

1. Open your app (`ios/Runner.xcworkspace` or `macos/Runner.xcworkspace`) in
   Xcode.

   在 Xcode 中打开应用（`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. Navigate to **Package Dependencies** for the project.

   导航到项目的 **Package Dependencies**（Package 依赖）。

1. Click the `FlutterGeneratedPluginSwiftPackage` package, then click
   the <Icon id="remove" label="remove/minus"></Icon> button.

   点击 `FlutterGeneratedPluginSwiftPackage` package，再点击
   <Icon id="remove" label="remove/minus"></Icon> 按钮。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-package.png" caption="The `FlutterGeneratedPluginSwiftPackage` to remove" />

1. Navigate to **Frameworks, Libraries, and Embedded Content** for the `Runner`
   target.

   导航到 `Runner` target 的 **Frameworks, Libraries, and Embedded Content**（框架、库与嵌入内容）。

1. Click `FlutterGeneratedPluginSwiftPackage`, then click
   the <Icon id="remove" label="remove/minus"></Icon> button.

   点击 `FlutterGeneratedPluginSwiftPackage`，再点击
   <Icon id="remove" label="remove/minus"></Icon> 按钮。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-framework.png" caption="The `FlutterGeneratedPluginSwiftPackage` to remove" />

1. Go to **Product > Scheme > Edit Scheme**.

   前往 **Product > Scheme > Edit Scheme**。

1. Expand the **Build** section in the left sidebar.

   展开左侧边栏的 **Build** 部分。

1. Click **Pre-actions**.

   点击 **Pre-actions**。

1. Expand **Run Prepare Flutter Framework Script**.

   展开 **Run Prepare Flutter Framework Script**。

1. Click the <Icon id="delete" label="delete/trash"></Icon> button.

   点击 <Icon id="delete" label="delete/trash"></Icon> 按钮。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-flutter-pre-action.png" caption="The build pre-action to remove" />

[Turn off Swift Package Manager]: #how-to-turn-off-swift-package-manager

## How to use a Swift Package Manager Flutter plugin that requires a higher OS version

## 如何使用需要更高 OS 版本的 Swift Package Manager Flutter 插件

If a Swift Package Flutter Manager plugin requires a higher OS version than
the project, you might get an error like this:

若 Swift Package Manager Flutter 插件要求的 OS 版本高于项目，
你可能会看到类似错误：

```plaintext
Target Integrity (Xcode): The package product 'plugin_name_ios' requires minimum platform version 14.0 for the iOS platform, but this target supports 12.0
```

To use the plugin:

要使用该插件：

1. Open your app (`ios/Runner.xcworkspace` or `macos/Runner.xcworkspace`) in
   Xcode.

   在 Xcode 中打开应用（`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. Increase your app's target **Minimum Deployments**.

   提高应用 target 的 **Minimum Deployments**（最低部署版本）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/minimum-deployments.png" caption="The target's **Minimum Deployments** setting" />

1. If you updated your iOS app's **Minimum Deployments**,
   regenerate the iOS project's configuration files:

   若你更新了 iOS 应用的 **Minimum Deployments**，
   请重新生成 iOS 项目配置文件：

   ```sh
   flutter build ios --config-only
   ```

1. If you updated your macOS app's **Minimum Deployments**,
   regenerate the macOS project's configuration files:

   若你更新了 macOS 应用的 **Minimum Deployments**，
   请重新生成 macOS 项目配置文件：

   ```sh
   flutter build macos --config-only
   ```

## How to turn off Swift Package Manager

## 如何关闭 Swift Package Manager

In general, don't do this. Remember that
the CocoaPods registry becomes read-only on December 2, 2026
and disabling SwiftPM won't be allowed in the future.

一般情况下，请不要这样做。请记住，
CocoaPods 注册表将于 2026 年 12 月 2 日变为只读，
今后将不再允许禁用 SwiftPM。

Disabling Swift Package Manager causes Flutter to use CocoaPods for all
dependencies. However, SwiftPM remains integrated with your project.
To remove Swift Package Manager integration completely from your project,
follow the [How to remove Swift Package Manager integration][removeSPM]
instructions.

禁用 Swift Package Manager 会让 Flutter 对所有依赖项都使用 CocoaPods。
不过，SwiftPM 仍会保持与项目的集成。
若要将 Swift Package Manager 集成从项目中彻底移除，
请按照 [如何移除 Swift Package Manager 集成][removeSPM] 中的说明操作。

### Turn off SwiftPM for a single project

### 为单个项目关闭 SwiftPM

In the project's `pubspec.yaml` file, under the `flutter` section,
set `enable-swift-package-manager` to `false` in the `config` subsection.

在项目的 `pubspec.yaml` 文件中，于 `flutter` 部分下的 `config` 子部分里，
将 `enable-swift-package-manager` 设为 `false`。

```yaml title="pubspec.yaml"
# The following section is specific to Flutter packages.
flutter:
  config:
    enable-swift-package-manager: false
```

This turns off Swift Package Manager for all contributors to this project.

这会为该项目的所有贡献者关闭 Swift Package Manager。

### Turn off SwiftPM globally for all projects

### 为所有项目全局关闭 SwiftPM

Run the following command:

运行以下命令：

```sh
flutter config --no-enable-swift-package-manager
```

This turns off Swift Package Manager for the current user.

这会为当前用户关闭 Swift Package Manager。

If a project is incompatible with Swift Package Manager,
all contributors need to run this command.

如果某个项目与 Swift Package Manager 不兼容，
所有贡献者都需要运行此命令。

[removeSPM]: #how-to-remove-swift-package-manager-integration
