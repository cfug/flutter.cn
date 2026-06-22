Migrating to SwiftPM requires updating the
`ios/Runner.xcodeproj/project.pbxproj` and
`ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme` files.

迁移到 SwiftPM，需要更新
`ios/Runner.xcodeproj/project.pbxproj`和
`ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme` 文件。

### Step 1: Add FlutterGeneratedPluginSwiftPackage package dependency {:.no_toc}

### 步骤 1：添加 FlutterGeneratedPluginSwiftPackage package 依赖 {:.no_toc}

1. In Xcode, open `ios/Runner.xcworkspace`.

   在 Xcode 中打开 `ios/Runner.xcworkspace`。

1. Navigate to **Package Dependencies** for the project.

   导航到项目的 **Package Dependencies**（package 依赖）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/package-dependencies.png" caption="The project's package dependencies" />

1. Click the <Icon id="add" label="add/plus"></Icon> button.

   点击 <Icon id="add" label="add/plus"></Icon> 按钮。

1. In the dialog that opens, click **Add Local...**.

   在打开的对话框中，点击 **Add Local...**（添加本地…）。

1. Navigate to `ios/Flutter/ephemeral/Packages/FlutterGeneratedPluginSwiftPackage`
   and click **Add Package**.

   导航到 `ios/Flutter/ephemeral/Packages/FlutterGeneratedPluginSwiftPackage`，
   然后点击 **Add Package**（添加 Package）。

1. Ensure that it's added to the `Runner` target and click **Add Package**.

   确保已添加到 `Runner` 目标，然后点击 **Add Package**（添加 Package）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/choose-package-products.png" caption="Ensure that the package is added to the `Runner` target" />

1. Ensure that `FlutterGeneratedPluginSwiftPackage` was added to **Frameworks,
   Libraries, and Embedded Content**.

   确保 `FlutterGeneratedPluginSwiftPackage` 已添加到 **Frameworks,
   Libraries, and Embedded Content**（框架、库与嵌入内容）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-generated-framework.png" caption="Ensure that `FlutterGeneratedPluginSwiftPackage` was added to **Frameworks, Libraries, and Embedded Content**" />

### Step 2: Add Run Prepare Flutter Framework Script Pre-action {:.no_toc}

### 步骤 2：添加 Run Prepare Flutter Framework Script 预操作 {:.no_toc}

**The following steps must be completed for each flavor.**

**以下步骤必须针对每个 flavor 完成。**

1. Go to **Product > Scheme > Edit Scheme**.

   前往 **Product > Scheme > Edit Scheme**。

1. Expand the **Build** section in the left sidebar.

   在左侧边栏中展开 **Build** 部分。

1. Click **Pre-actions**.

   点击 **Pre-actions**。

1. Click the <Icon id="add" label="add/plus"></Icon> button and
   select **New Run Script Action** from the menu.

   点击 <Icon id="add" label="add/plus"></Icon> 按钮，
   从菜单中选择 **New Run Script Action**（新建运行脚本操作）。

1. Click the **Run Script** title and change it to:

   点击 **Run Script**（运行脚本）标题并将其改为：

   ```plaintext
   Run Prepare Flutter Framework Script
   ```

1. Change the **Provide build settings from** to the `Runner` app.

   将 **Provide build settings from**（提供构建设置来源）改为 `Runner` 应用。

1. Input the following in the text box:

   在文本框中输入以下内容：

   ```sh
   "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" prepare
   ```

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-flutter-pre-action.png" caption="Add **Run Prepare Flutter Framework Script** build pre-action" />

### Step 3: Run app {:.no_toc}

### 步骤 3：运行应用 {:.no_toc}

1. In Xcode, run the app.

   在 Xcode 中运行应用。

1. Ensure that  **Run Prepare Flutter Framework Script** runs as a pre-action
   and that `FlutterGeneratedPluginSwiftPackage` is a target dependency.

   确保 **Run Prepare Flutter Framework Script** 作为预操作运行，
   且 `FlutterGeneratedPluginSwiftPackage` 是目标依赖项。

   <DashImage image="development/packages-and-plugins/swift-package-manager/flutter-pre-action-build-log.png" caption="Ensure **Run Prepare Flutter Framework Script** runs as a pre-action" />

1. Ensure that the app runs on the command line with `flutter run`.

   确保应用在命令行中可通过 `flutter run` 运行。

[turn on Swift Package Manager]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-turn-on-swift-package-manager
[file an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml
