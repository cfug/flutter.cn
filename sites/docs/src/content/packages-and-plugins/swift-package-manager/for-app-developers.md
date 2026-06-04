---
# title: Swift Package Manager for app developers
title: 面向应用开发者的 Swift Package Manager
# description: How to use Swift Package Manager for native iOS or macOS dependencies
description: 如何使用 Swift Package Manager 管理 iOS 或 macOS 原生依赖
ai-translated: true
---

:::warning
Flutter is migrating to [Swift Package Manager][] to manage iOS and macOS native
dependencies.
Flutter's support of Swift Package Manager is under development.
If you find a bug in Flutter's Swift Package Manager support,
[open an issue][].
Swift Package Manager support is [off by default][].
Flutter continues to support CocoaPods.
:::

:::warning
Flutter 正在迁移到 [Swift Package Manager][] 以管理 iOS 和 macOS 原生依赖。
Flutter 对 Swift Package Manager 的支持仍在开发中。
若发现 Flutter 的 Swift Package Manager 支持存在 bug，
请 [open an issue][]（提交 issue）。
Swift Package Manager 支持默认 [off by default][]（关闭）。
Flutter 仍继续支持 CocoaPods。
:::

Flutter's Swift Package Manager integration has several benefits:

Flutter 的 Swift Package Manager 集成带来多项好处：

1. **Provides access to the Swift package ecosystem**.
   Flutter plugins can use the growing ecosystem of [Swift packages][].

1. **可访问 Swift 包生态**。Flutter 插件可使用不断增长的 [Swift packages][]（Swift 包）生态。

1. **Simplifies Flutter installation**.
   Xcode includes Swift Package Manager.
   You don't need to install Ruby and CocoaPods if your project uses
   Swift Package Manager.

2. **简化 Flutter 安装**。Xcode 已包含 Swift Package Manager。若项目使用 Swift Package Manager，则无需安装 Ruby 和 CocoaPods。

[Swift Package Manager]: https://www.swift.org/documentation/package-manager/
[off by default]: #how-to-turn-on-swift-package-manager
[Swift packages]: https://swiftpackageindex.com/
[open an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml

{% render "docs/swift-package-manager/how-to-enable-disable.md", site: site %}

## How to add Swift Package Manager integration

## 如何添加 Swift Package Manager 集成

### Add to a Flutter app

### 添加到 Flutter 应用

<Tabs key="darwin-platform">
<Tab name="iOS project">

{% render "docs/swift-package-manager/migrate-ios-project.md", site: site %}

</Tab>
<Tab name="macOS project">

{% render "docs/swift-package-manager/migrate-macos-project.md", site: site %}

</Tab>
</Tabs>

### Add to a Flutter app _manually_

### 手动添加到 Flutter 应用

<Tabs key="darwin-platform">
<Tab name="iOS project">

{% render "docs/swift-package-manager/migrate-ios-project-manually.md", site: site %}

</Tab>
<Tab name="macOS project">

{% render "docs/swift-package-manager/migrate-macos-project-manually.md", site: site %}

</Tab>
</Tabs>

### Add to an existing app (add-to-app)

### 添加到现有应用（add-to-app）

Flutter's Swift Package Manager support doesn't work with add-to-app scenarios.

Flutter 的 Swift Package Manager 支持不适用于 add-to-app 场景。

To keep current on status updates, consult [flutter#146957][].

要了解状态更新，请参阅 [flutter#146957][]。

[flutter#146957]: https://github.com/flutter/flutter/issues/146957

### Add to a custom Xcode target

### 添加到自定义 Xcode target

Your Flutter Xcode project can have custom [Xcode targets][] to build additional
products, like frameworks or unit tests.
You can add Swift Package Manager integration to these custom Xcode targets.

Flutter Xcode 项目可有自定义 [Xcode targets][] 以构建框架或单元测试等产品。你可以为这些自定义 Xcode target 添加 Swift Package Manager 集成。

Follow the steps in
[How to add Swift Package Manager integration to a project _manually_][manualIntegration].

请按照
[How to add Swift Package Manager integration to a project _manually_][manualIntegration]（如何手动为项目添加 Swift Package Manager 集成）中的步骤操作。

In [Step 1][manualIntegrationStep1], list item 6 use your custom target instead
of the `Flutter` target.

在 [Step 1][manualIntegrationStep1] 的第 6 项中，使用你的自定义 target 而非 `Flutter` target。

In [Step 2][manualIntegrationStep2], list item 6 use your custom target instead
of the `Flutter` target.

在 [Step 2][manualIntegrationStep2] 的第 6 项中，使用你的自定义 target 而非 `Flutter` target。

[Xcode targets]: https://developer.apple.com/documentation/xcode/configuring-a-new-target-in-your-project
[manualIntegration]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-add-swift-package-manager-integration-to-a-flutter-app-manually
[manualIntegrationStep1]: /packages-and-plugins/swift-package-manager/for-app-developers/#step-1-add-fluttergeneratedpluginswiftpackage-package-dependency
[manualIntegrationStep2]: /packages-and-plugins/swift-package-manager/for-app-developers/#step-2-add-run-prepare-flutter-framework-script-pre-action

## How to remove Swift Package Manager integration

## 如何移除 Swift Package Manager 集成

To add Swift Package Manager integration, the Flutter CLI migrates your project.
This migration updates your Xcode project to add Flutter plugin dependencies.

添加 Swift Package Manager 集成时，Flutter CLI 会迁移你的项目，更新 Xcode 项目以添加 Flutter 插件依赖。

To undo this migration:

要撤销此迁移：

1. [Turn off Swift Package Manager][].

1. [Turn off Swift Package Manager][]（关闭 Swift Package Manager）。

1. Clean your project:

1. 清理项目：

   ```sh
   flutter clean
   ```

1. Open your app (`ios/Runner.xcworkspace` or `macos/Runner.xcworkspace`) in
   Xcode.

1. 在 Xcode 中打开应用（`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. Navigate to **Package Dependencies** for the project.

1. 导航到项目的 **Package Dependencies**（包依赖）。

1. Click the `FlutterGeneratedPluginSwiftPackage` package, then click
   the <Icon id="remove" label="remove/minus"></Icon> button.

1. 点击 `FlutterGeneratedPluginSwiftPackage` 包，再点击
   <Icon id="remove" label="remove/minus"></Icon> 按钮。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-package.png" caption="The `FlutterGeneratedPluginSwiftPackage` to remove" />

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-package.png" caption="要移除的 `FlutterGeneratedPluginSwiftPackage`" />

1. Navigate to **Frameworks, Libraries, and Embedded Content** for the `Runner`
   target.

1. 导航到 `Runner` target 的 **Frameworks, Libraries, and Embedded Content**（框架、库与嵌入内容）。

1. Click `FlutterGeneratedPluginSwiftPackage`, then click
   the <Icon id="remove" label="remove/minus"></Icon> button.

1. 点击 `FlutterGeneratedPluginSwiftPackage`，再点击
   <Icon id="remove" label="remove/minus"></Icon> 按钮。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-framework.png" caption="The `FlutterGeneratedPluginSwiftPackage` to remove" />

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-framework.png" caption="要移除的 `FlutterGeneratedPluginSwiftPackage`" />

1. Go to **Product > Scheme > Edit Scheme**.

1. 前往 **Product > Scheme > Edit Scheme**（编辑 Scheme）。

1. Expand the **Build** section in the left side bar.

1. 展开左侧边栏的 **Build**（构建）部分。

1. Click **Pre-actions**.

1. 点击 **Pre-actions**（预操作）。

1. Expand **Run Prepare Flutter Framework Script**.

1. 展开 **Run Prepare Flutter Framework Script**。

1. Click the <Icon id="delete" label="delete/trash"></Icon> button.

1. 点击 <Icon id="delete" label="delete/trash"></Icon> 按钮。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-flutter-pre-action.png" caption="The build pre-action to remove" />

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-flutter-pre-action.png" caption="要移除的构建预操作" />

[Turn off Swift Package Manager]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-turn-off-swift-package-manager

## How to use a Swift Package Manager Flutter plugin that requires a higher OS version

## 如何使用需要更高 OS 版本的 Swift Package Manager Flutter 插件

If a Swift Package Flutter Manager plugin requires a higher OS version than
the project, you might get an error like this:

若 Swift Package Manager Flutter 插件要求的 OS 版本高于项目，你可能会看到类似错误：

```plaintext
Target Integrity (Xcode): The package product 'plugin_name_ios' requires minimum platform version 14.0 for the iOS platform, but this target supports 12.0
```

To use the plugin:

要使用该插件：

1. Open your app (`ios/Runner.xcworkspace` or `macos/Runner.xcworkspace`) in
   Xcode.

1. 在 Xcode 中打开应用（`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. Increase your app's target **Minimum Deployments**.

1. 提高应用 target 的 **Minimum Deployments**（最低部署版本）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/minimum-deployments.png" caption="The target's **Minimum Deployments** setting" />

   <DashImage image="development/packages-and-plugins/swift-package-manager/minimum-deployments.png" caption="target 的 **Minimum Deployments** 设置" />

1. If you updated your iOS app's **Minimum Deployments**,
   regenerate the iOS project's configuration files:

1. 若你更新了 iOS 应用的 **Minimum Deployments**，
   请重新生成 iOS 项目配置文件：

   ```sh
   flutter build ios --config-only
   ```

1. If you updated your macOS app's **Minimum Deployments**,
   regenerate the macOS project's configuration files:

1. 若你更新了 macOS 应用的 **Minimum Deployments**，
   请重新生成 macOS 项目配置文件：

   ```sh
   flutter build macos --config-only
   ```
