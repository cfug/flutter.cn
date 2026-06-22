---
# title: Swift Package Manager for plugin authors
title: 面向插件作者的 Swift Package Manager
# description: How to add Swift Package Manager compatibility to iOS and macOS plugins
description: 如何为 iOS 和 macOS 插件添加 Swift Package Manager 兼容性
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

For information on how to turn SwiftPM off and on, visit
[Swift Package Manager for app developers][for-app-devs].

[for-app-devs]: /packages-and-plugins/swift-package-manager/for-app-developers

## How to add Swift Package Manager support to an existing Flutter plugin

## 如何为现有 Flutter 插件添加 Swift Package Manager 支持

This guide shows how to add Swift Package Manager support to a plugin that
already supports CocoaPods.
This ensures the plugin is usable by all Flutter projects.

本指南说明如何为已支持 CocoaPods 的插件添加 Swift Package Manager 支持，
确保所有 Flutter 项目都能使用该插件。

Flutter plugins should support _both_ Swift Package Manager and CocoaPods until
further notice.

在另行通知前，Flutter 插件应 **同时** 支持 Swift Package Manager 和 CocoaPods。

Swift Package Manager adoption will be gradual.
As of Flutter 3.44, plugins that don't support
CocoaPods aren't usable by projects that haven't
migrated to Swift Package Manager yet.
Plugins that don't support Swift Package Manager
can cause problems for projects that have migrated.
Please migrate your plugins as soon as possible.

Swift Package Manager 的采用将逐步推进。
从 Flutter 3.44 开始，
不支持 CocoaPods 的插件将无法用于尚未迁移到 Swift Package Manager 的项目。
不支持 Swift Package Manager 的插件会给已迁移的项目带来问题。
请尽快迁移你的插件。

<Tabs key="darwin-plugin-type">
<Tab name="Swift plugin">

{% render "docs/swift-package-manager/migrate-swift-plugin.md", site: site %}

</Tab>
<Tab name="Objective-C plugin">

{% render "docs/swift-package-manager/migrate-objective-c-plugin.md", site: site %}

</Tab>
</Tabs>

## (Optional, but recommended) Add plugin as local package in example app

## （可选但推荐）在示例应用中将插件添加为本地 package

If your plugin includes an example,
it is recommended to add the plugin as a local package in the example app.
This is not required, but provides better Xcode support when editing
the plugin's source code in the example app.
Visit [issue #179032](https://github.com/flutter/flutter/issues/179032).

若插件包含示例，建议在示例应用中将插件添加为本地 package。
非必须，但在示例应用中编辑插件源码时能提供更好的 Xcode 支持。
请参阅 [issue #179032](https://github.com/flutter/flutter/issues/179032)。

### Add plugin as local package

### 将插件添加为本地 package

1. In a terminal navigate to `my_plugin`.

   在终端中进入 `my_plugin`。

1. In Xcode, run the following command to open the example app's workspace,
   (replace `ios` with `macos` as appropriate): 

   在 Xcode 中运行以下命令打开示例应用的工作区
   （若插件面向 macOS，将 `ios` 替换为 `macos`）：

```bash
open example/ios/Runner.xcworkspace
```

1. Right click **Flutter** > **Add Files to "Runner"**.

   右键 **Flutter** > **Add Files to "Runner"**（添加文件到 Runner）。

   ![Add Files to Runner](/assets/images/docs/development/packages-and-plugins/swift-package-manager/add-files-to-runner.png)

1. Select `my_plugin/ios/my_plugin`
   (or `macos` or `darwin`, as appropriate).

   选择 `my_plugin/ios/my_plugin`（或根据插件支持的平台选择 `macos` 或 `darwin`）。

1. Make sure “Reference files in place” is selected
   (it should be the default), and click **Finish**.

   确保选中「Reference files in place」（引用文件位置，通常为默认），
   然后点击 **Finish**（完成）。

   ![Select Reference files in place](/assets/images/docs/development/packages-and-plugins/swift-package-manager/reference-files-in-place.png)

This adds the plugin as a local package,
but it's referenced by absolute path,
which isn't desirable for distribution.
To change it to a relative path, use the following instructions.

这样会将插件添加为本地 package，但会以绝对路径引用，不利于分发。要改为相对路径，请按以下步骤操作。

### Change to relative path

### 改为相对路径

1. Copy "Full Path" for plugin from the File Inspector.

   从文件检查器复制插件的「Full Path」（完整路径）。

   ![Copy Full Path](/assets/images/docs/development/packages-and-plugins/swift-package-manager/copy-full-path.png)

1. In terminal:
   `open -a Xcode example/ios/Runner.xcodeproj/project.pbxproj`

   在终端执行：
   `open -a Xcode example/ios/Runner.xcodeproj/project.pbxproj`

1. Find the following:

   找到以下内容：

   ```text
   path = [COPIED FULL PATH]; sourceTree = "<absolute>"  
   ```

   For example:

   例如：

   ```text
   path = /Users/username/path/to/my_plugin/ios/my_plugin; sourceTree = "<absolute>"
   ```

1. And replace with relative path:

   并替换为相对路径：

   ```text
   path = ../../ios/my_plugin; sourceTree = "<group>"
   ```
   (Adjust `ios` to `macos` or `darwin` as needed).

   （按需将 `ios` 调整为 `macos` 或 `darwin`）。

## How to update unit tests in a plugin's example app

## 如何更新插件示例应用中的单元测试

If your plugin has native XCTests,
you might need to update them to work with
Swift Package Manager if one of the following is true:

若插件有原生 XCTests，在以下任一情况下可能需要更新它们以配合 Swift Package Manager：

* You're using a CocoaPod dependency for the test.

  测试使用了 CocoaPod 依赖。

* Your plugin is explicitly set to `type: .dynamic` in its `Package.swift` file.

  插件在 `Package.swift` 中显式设为 `type: .dynamic`。

To update your unit tests:

要更新单元测试：

1. In Xcode, open your `example/ios/Runner.xcworkspace`.

   在 Xcode 中打开 `example/ios/Runner.xcworkspace`。

1. If you were using a CocoaPod dependency for tests, such as `OCMock`,
   you'll want to remove it from your `Podfile` file.

   若测试曾使用 CocoaPod 依赖（如 `OCMock`），请从 `Podfile` 中移除。

   ```ruby title="ios/Podfile" diff
     target 'RunnerTests' do
       inherit! :search_paths

   -   pod 'OCMock', '3.5'
     end
   ```

   Then in the terminal, run `pod install` in the `plugin_name_ios/example/ios`
   directory.

   然后在终端于 `plugin_name_ios/example/ios` 目录运行 `pod install`。

1. Navigate to **Package Dependencies** for the project.

   导航到项目的 **Package Dependencies**（package 依赖）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/package-dependencies.png" caption="The project's package dependencies" />

1. Click the **+** button and add any test-only dependencies by searching for
   them in the top right search bar.

   点击 **+** 按钮，在右上角搜索栏搜索并添加仅用于测试的依赖。

   <DashImage image="development/packages-and-plugins/swift-package-manager/search-for-ocmock.png" caption="Search for test-only dependencies" />

   :::note
   OCMock uses unsafe build flags and can only be used if targeted by commit.
   `fe1661a3efed11831a6452f4b1a0c5e6ddc08c3d` is the commit for the 3.9.3
   version.

   OCMock 使用不安全的构建标志，只能通过指定 commit 使用。
   `fe1661a3efed11831a6452f4b1a0c5e6ddc08c3d` 为 3.9.3 版本对应的 commit。
   :::

1. Ensure the dependency is added to the `RunnerTests` Target.

   确保依赖已添加到 `RunnerTests` Target。

   <DashImage image="development/packages-and-plugins/swift-package-manager/choose-package-products-test.png" caption="Ensure the dependency is added to the `RunnerTests` target" />

1. Click the **Add Package** button.

   点击 **Add Package**（添加 package）按钮。

1. If you've explicitly set your plugin's library type to `.dynamic` in its
   `Package.swift` file
   ([not recommended by Apple][library type recommendations]),
   you'll also need to add it as a dependency to the `RunnerTests` target.

   若在 `Package.swift` 中将插件库类型显式设为 `.dynamic`
   （[Apple 不推荐][library type recommendations]），
   还需将其添加为 `RunnerTests` target 的依赖。

   1. Ensure `RunnerTests` **Build Phases** has a **Link Binary With Libraries**
      build phase:

      确保 `RunnerTests` 的 **Build Phases**（构建阶段）包含
      **Link Binary With Libraries**（链接二进制与库）构建阶段：

      <DashImage image="development/packages-and-plugins/swift-package-manager/runner-tests-link-binary-with-libraries.png" caption="The `Link Binary With Libraries` Build Phase in the `RunnerTests` target" />

      If the build phase doesn't exist already, create one.
      Click the <Icon id="add" label="plus/add"></Icon> button and
      then click **New Link Binary With Libraries Phase**.

      若尚无该构建阶段，请创建：
      点击 <Icon id="add" label="plus/add"></Icon> 按钮，
      再点击 **New Link Binary With Libraries Phase**。

      <DashImage image="development/packages-and-plugins/swift-package-manager/add-runner-tests-link-binary-with-libraries.png" caption="Add `Link Binary With Libraries` Build Phase" />

   1. Navigate to **Package Dependencies** for the project.

      导航到项目的 **Package Dependencies**。

   1. Click the <Icon id="add" label="plus/add"></Icon> button.

      点击 <Icon id="add" label="plus/add"></Icon> 按钮。

   1. In the dialog that opens, click the **Add Local...** button.

      在打开的对话框中点击 **Add Local...** 按钮。

   1. Navigate to `plugin_name/plugin_name_ios/ios/plugin_name_ios` and click
      the **Add Package** button.

      导航到 `plugin_name/plugin_name_ios/ios/plugin_name_ios` 并点击 **Add Package** 按钮。

   1. Ensure that it's added to the `RunnerTests` target and click the
      **Add Package** button.

      确保已添加到 `RunnerTests` target 并点击 **Add Package** 按钮。

1. Ensure tests pass **Product > Test**.

   确保 **Product > Test**（测试）通过。

[library type recommendations]: {{site.apple-dev}}/documentation/packagedescription/product/library(name:type:targets:)
