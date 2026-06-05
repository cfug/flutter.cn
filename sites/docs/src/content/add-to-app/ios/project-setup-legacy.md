---
# title: Integrate a Flutter module into your iOS project (Legacy)
title: 将 Flutter 模块集成到 iOS 项目（旧版）
# shortTitle: Integrate Flutter (Legacy)
shortTitle: 集成 Flutter（旧版）
# description: Learn how to integrate a Flutter module into your existing iOS project.
description: 了解如何将 Flutter 模块集成到你现有的 iOS 项目中。
tags: Flutter混合工程,add2app
keywords: iOS,项目集成,CocoaPods
ai-translated: true
---

:::warning

As of Flutter 3.44, Swift Package Manager (SwiftPM) replaces CocoaPods
as the default dependency manager for iOS and macOS Flutter apps.
CocoaPods is officially in maintenance mode,
and its registry will permanently [become read-only on December 2, 2026][].

自 Flutter 3.44 起，Swift Package Manager（SwiftPM）取代 CocoaPods，成为 iOS 与 macOS Flutter 应用的默认依赖管理器。CocoaPods 已正式进入维护模式，其 registry 将于 2026 年 12 月 2 日永久 [变为只读][become read-only on December 2, 2026]。

This guide is preserved for reference only, and will not receive ongoing maintenance.
Please migrate to using Swift Package Manager using the [updated integration guide][].

本指南仅作参考保留，不会持续维护。请使用 [更新的集成指南][updated integration guide] 迁移到 Swift Package Manager。

:::

Flutter UI components can be incrementally added into your existing iOS
application as embedded frameworks.
To embed Flutter in your existing application,
consider one of the following three methods.

可将 Flutter UI 组件以嵌入 framework 的方式逐步添加到你现有的 iOS 应用中。要将 Flutter 嵌入现有应用，可考虑以下三种方法之一。

| Embedding Method | Methodology | Benefit |
|---|---|---|
| Use CocoaPods _(Recommended)_ | Install and use the Flutter SDK and CocoaPods. Flutter compiles the `flutter_module` from source each time Xcode builds the iOS app. | Least complicated method to embed Flutter into your app. |
| Use [iOS frameworks][] | Create iOS frameworks for Flutter components, embed them into your iOS, and update your existing app's build settings. | Doesn't require every developer to install the Flutter SDK and CocoaPods on their local machines. |
| Use iOS frameworks and CocoaPods | Embed the frameworks for your iOS app and the plugins in Xcode, but distribute the Flutter engine as a CocoaPods podspec. | Provides an alternative to distributing the large Flutter engine (`Flutter.xcframework`) library. |

| 嵌入方式 | 方法 | 优势 |
|---|---|---|
| 使用 CocoaPods _（推荐）_ | 安装并使用 Flutter SDK 与 CocoaPods。每次 Xcode 构建 iOS 应用时，Flutter 从源码编译 `flutter_module`。 | 将 Flutter 嵌入应用的最简单方式。 |
| 使用 [iOS frameworks][] | 为 Flutter 组件创建 iOS framework，嵌入 iOS 应用，并更新现有应用的构建设置。 | 不要求每位开发者在本地安装 Flutter SDK 与 CocoaPods。 |
| 使用 iOS frameworks 与 CocoaPods | 在 Xcode 中嵌入 iOS 应用与插件的 frameworks，但以 CocoaPods podspec 分发 Flutter 引擎。 | 为分发大型 Flutter 引擎（`Flutter.xcframework`）库提供替代方案。 |

{:.table .table-striped}

[iOS frameworks]: {{site.apple-dev}}/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html

When you add Flutter to your existing iOS app,
it [increases the size of your iOS app][app-size].

将 Flutter 添加到现有 iOS 应用时，会 [增大 iOS 应用体积][app-size]。

For examples using an app built with UIKit,
see the iOS directories in the [add_to_app code samples][].
For an example using SwiftUI, consult the iOS directory in [News Feed App][].

使用 UIKit 构建的应用示例，请参阅 [add_to_app 代码示例][add_to_app code samples] 中的 iOS 目录。SwiftUI 示例请参阅 [News Feed App][] 中的 iOS 目录。

## Development system requirements

## 开发系统要求

Flutter requires the latest version of Xcode and [CocoaPods][].

Flutter 需要最新版本的 Xcode 与 [CocoaPods][]。

## Create a Flutter module

## 创建 Flutter 模块

To embed Flutter into your existing application with any method,
create a Flutter module first.
Use the following command to create a Flutter module.

使用任一方式将 Flutter 嵌入现有应用前，须先创建 Flutter 模块。使用以下命令创建：

```console
$ cd /path/to/my_flutter
$ flutter create --template module my_flutter
```

Flutter creates module project under `/path/to/my_flutter/`.
If you use the [CocoaPods method][], save the module
in the same parent directory as your existing iOS app.

Flutter 会在 `/path/to/my_flutter/` 下创建模块项目。若使用 [CocoaPods 方式][CocoaPods method]，请将模块保存在与现有 iOS 应用相同的父目录中。

[CocoaPods method]: /add-to-app/ios/project-setup-legacy/?tab=embed-using-cocoapods

From the Flutter module directory,
you can run the same `flutter` commands you would in any other Flutter project,
like `flutter run` or `flutter build ios`.
You can also run the module in [VS Code][] or
[Android Studio/IntelliJ][] with the Flutter and Dart plugins.
This project contains a single-view example version of your module
before embedding it in your existing iOS app.
This helps when testing the Flutter-only parts of your code.

在 Flutter 模块目录中，可运行与其他 Flutter 项目相同的 `flutter` 命令，例如 `flutter run` 或 `flutter build ios`。也可在安装了 Flutter 与 Dart 插件的 [VS Code][] 或 [Android Studio/IntelliJ][] 中运行模块。该项目包含嵌入现有 iOS 应用前的单视图示例版本，便于测试代码中仅 Flutter 的部分。

## Organize your module

## 组织模块结构

The `my_flutter` module directory structure resembles a typical Flutter app.

`my_flutter` 模块目录结构类似典型 Flutter 应用。

<FileTree>

- my_flutter/
  - .ios/
    - Runner.xcworkspace
    - Flutter/
      - podhelper.rb
  - lib/
    - main.dart
  - test/
  - pubspec.yaml

</FileTree>

Your Dart code should be added to the `lib/` directory.
Your Flutter dependencies, packages, and plugins must be added to the
`pubspec.yaml` file.

Dart 代码应放在 `lib/` 目录。Flutter 依赖、package 与插件须添加到 `pubspec.yaml`。

The `.ios/` hidden subfolder contains an Xcode workspace where
you can run a standalone version of your module.
This wrapper project bootstraps your Flutter code.
It contains helper scripts to facilitate building frameworks or
embedding the module into your existing application with CocoaPods.

隐藏的 `.ios/` 子文件夹包含 Xcode workspace，可单独运行模块。该包装项目引导 Flutter 代码，并包含辅助脚本，便于构建 framework 或通过 CocoaPods 将模块嵌入现有应用。

:::note

* Add custom iOS code to your own existing application's
  project or to a plugin, not to the module's `.ios/`
  directory. Changes made in your module's `.ios/`
  directory don't appear in your existing iOS project
  using the module, and might be overwritten by Flutter.

* Exclude the `.ios/` directory from source control as
  it's autogenerated.

* Before building the module on a new machine,
  run `flutter pub get` in the `my_flutter` directory.
  This regenerates the `.ios/` directory before building
  the iOS project that uses the Flutter module.

  将自定义 iOS 代码添加到你现有应用的项目或插件中，而非模块的 `.ios/` 目录。在模块 `.ios/` 目录中的更改不会出现在使用该模块的现有 iOS 项目中，且可能被 Flutter 覆盖。

* 将 `.ios/` 目录排除在版本控制之外，因其为自动生成。

* 在新机器上构建模块前，在 `my_flutter` 目录运行 `flutter pub get`，以在使用 Flutter 模块的 iOS 项目构建前重新生成 `.ios/` 目录。

:::

## Embed a Flutter module in your iOS app

## 将 Flutter 模块嵌入 iOS 应用

After you have developed your Flutter module,
you can embed it using the methods described
in the table at the top of the page.

开发完 Flutter 模块后，可使用页面顶部表格中的方法进行嵌入。

You can run in **Debug** mode on a simulator or a real device,
and **Release** mode on a real device.

可在模拟器或真机上以 **Debug** 模式运行，在真机上以 **Release** 模式运行。

:::note
Learn more about [Flutter's build modes][build modes of Flutter].

To use Flutter debugging features such as hot reload,
consult [Debugging your add-to-app module][].

了解更多关于 [Flutter 构建模式][build modes of Flutter] 的信息。

要使用热重载等 Flutter 调试功能，
请参阅 [调试 add-to-app 模块][Debugging your add-to-app module]。
:::

<Tabs key="darwin-deps">
<Tab name="Use CocoaPods">

{% render "docs/add-to-app/ios-project/embed-cocoapods.md" %}

</Tab>
<Tab name="Use frameworks">

{% render "docs/add-to-app/ios-project/embed-frameworks.md" %}

</Tab>
<Tab name="Use frameworks and CocoaPods">

{% render "docs/add-to-app/ios-project/embed-split.md" %}

</Tab>
</Tabs>


## Set local network privacy permissions

## 设置本地网络隐私权限

{% render "docs/add-to-app/ios-project/local-network-privacy-permissions.md" %}

## Mitigate known issue with Apple Silicon Macs

## 缓解 Apple Silicon Mac 上的已知问题

On [Macs running Apple Silicon][apple-silicon],
the host app builds for an `arm64` simulator.
While Flutter supports `arm64` simulators, some plugins might not.
If you use one of these plugins, you might see a compilation error like
**Undefined symbols for architecture arm64**.
If this occurs,
exclude `arm64` from the simulator architectures in your host app.

在 [运行 Apple Silicon 的 Mac][apple-silicon] 上，宿主应用会为 `arm64` 模拟器构建。Flutter 支持 `arm64` 模拟器，但部分插件可能不支持。若使用这类插件，可能看到类似 **Undefined symbols for architecture arm64** 的编译错误。若出现此情况，请在宿主应用中从模拟器架构中排除 `arm64`。

1. In the **Project Navigator**, click on your project.

1. 在 **Project Navigator** 中点击项目。

1. Click the **Build Settings** tab.

1. 点击 **Build Settings** 标签页。

1. Click **All** and **Combined** sub-tabs.

1. 点击 **All** 与 **Combined** 子标签页。

1. Under **Architectures**, click on **Excluded Architectures**.

1. 在 **Architectures** 下点击 **Excluded Architectures**。

1. Expand to see the available build configurations.

1. 展开以查看可用构建配置。

1. Click **Debug**.

1. 点击 **Debug**。

1. Click the **+** (plus sign).

1. 点击 **+**（加号）。

1. Select **iOS Simulator**.

1. 选择 **iOS Simulator**。

1. Double-click in the value column for **Any iOS Simulator SDK**.

1. 双击 **Any iOS Simulator SDK** 的值列。

1. Click the **+** (plus sign).

1. 点击 **+**（加号）。

1. Type `arm64` in the **Debug > Any iOS Simulator SDK** dialog box.

   <DashImage image="development/add-to-app/ios/project-setup/excluded-archs.png" caption="Add `arm64` as an excluded architecture for your app" />

1. 在 **Debug > Any iOS Simulator SDK** 对话框中输入 `arm64`。

   <DashImage image="development/add-to-app/ios/project-setup/excluded-archs.png" caption="Add `arm64` as an excluded architecture for your app" />

1. Press <kbd>Esc</kbd> to close this dialog box.

1. 按 <kbd>Esc</kbd> 关闭对话框。

1. Repeat these steps for the **Release** build mode.

1. 对 **Release** 构建模式重复上述步骤。

1. Repeat for any iOS unit test targets.

1. 对所有 iOS 单元测试 target 重复操作。

## Next steps

## 后续步骤

You can now [add a Flutter screen][] to your existing iOS app.

你现在可以 [向现有 iOS 应用添加 Flutter 屏幕][add a Flutter screen]。

[add_to_app code samples]: {{site.repo.samples}}/tree/main/add_to_app
[add a Flutter screen]: /add-to-app/ios/add-flutter-screen
[Android Studio/IntelliJ]: /tools/android-studio
[build modes of Flutter]: /testing/build-modes
[CocoaPods]: https://cocoapods.org/
[app-size]: /resources/faq#how-big-is-the-flutter-engine
[VS Code]: /tools/vs-code
[News Feed app]: https://github.com/flutter/put-flutter-to-work/tree/022208184ec2623af2d113d13d90e8e1ce722365
[Debugging your add-to-app module]: /add-to-app/debugging/
[apple-silicon]: https://support.apple.com/en-us/116943
[become read-only on December 2, 2026]: https://blog.cocoapods.org/CocoaPods-Specs-Repo/
[updated integration guide]: /add-to-app/ios/project-setup
