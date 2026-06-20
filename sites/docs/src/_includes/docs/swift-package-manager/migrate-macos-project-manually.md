Once you [turn on Swift Package Manager][], the Flutter CLI tries to migrate
your project to use Swift Package Manager the next time you run your app
using the CLI.

[开启 Swift Package Manager][turn on Swift Package Manager] 后，
Flutter CLI 会在你下次使用 CLI 运行应用时尝试将项目迁移为使用 Swift Package Manager。

However, the Flutter CLI tool might be unable to migrate your project
automatically if there are unexpected modifications.

不过，如果存在意外的修改，Flutter CLI 工具可能无法自动迁移你的项目。

If the automatic migration fails, use the steps below to add Swift Package
Manager integration to a project manually.

如果自动迁移失败，请使用以下步骤手动为项目添加 Swift Package Manager 集成。

Before migrating manually, [file an issue][]; this helps the Flutter team
improve the automatic migration process.
Include the error message and, if possible, include a copy of
the following files in your issue:

在手动迁移之前，请 [提交 issue][file an issue]；
这有助于 Flutter 团队改进自动迁移流程。
请在 issue 中包含错误信息，并尽可能附上以下文件的副本：

* `macos/Runner.xcodeproj/project.pbxproj`

* `macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme`
  (or the xcscheme for the flavor used)

  `macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme`
  （或所用 flavor 对应的 xcscheme）

### Step 1: Add FlutterGeneratedPluginSwiftPackage Package Dependency {:.no_toc}

### 步骤 1：添加 FlutterGeneratedPluginSwiftPackage 包依赖 {:.no_toc}

1. Open your app (`macos/Runner.xcworkspace`) in Xcode.

   在 Xcode 中打开你的应用（`macos/Runner.xcworkspace`）。

1. Navigate to **Package Dependencies** for the project.

   导航到项目的 **Package Dependencies**（包依赖）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/package-dependencies.png" caption="The project's package dependencies" />

1. Click the <Icon id="add" label="add/plus"></Icon> button.

   点击 <Icon id="add" label="add/plus"></Icon> 按钮。

1. In the dialog that opens, click the **Add Local...**.

   在打开的对话框中，点击 **Add Local...**（添加本地…）。

1. Navigate to `macos/Flutter/ephemeral/Packages/FlutterGeneratedPluginSwiftPackage`
   and click the **Add Package**.

   导航到 `macos/Flutter/ephemeral/Packages/FlutterGeneratedPluginSwiftPackage`，
   然后点击 **Add Package**（添加包）。

1. Ensure that it's added to the Runner Target and click **Add Package**.

   确保已添加到 Runner 目标，然后点击 **Add Package**（添加包）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/choose-package-products.png" caption="Ensure that the package is added to the `Runner` target" />

1. Ensure that `FlutterGeneratedPluginSwiftPackage` was added to **Frameworks,
   Libraries, and Embedded Content**.

   确保 `FlutterGeneratedPluginSwiftPackage` 已添加到 **Frameworks,
   Libraries, and Embedded Content**（框架、库与嵌入内容）。

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-generated-framework.png" caption="Ensure that `FlutterGeneratedPluginSwiftPackage` was added to **Frameworks, Libraries, and Embedded Content**" />

### Step 2: Add Run Prepare Flutter Framework Script Pre-Action {:.no_toc}

### 步骤 2：添加 Run Prepare Flutter Framework Script 预操作 {:.no_toc}

**The following steps must be completed for each flavor.**

**以下步骤必须针对每个 flavor 完成。**

1. Go to **Product > Scheme > Edit Scheme**.

   前往 **Product > Scheme > Edit Scheme**（产品 > 方案 > 编辑方案）。

1. Expand the **Build** section in the left side bar.

   在左侧边栏中展开 **Build**（构建）部分。

1. Click **Pre-actions**.

   点击 **Pre-actions**（预操作）。

1. Click the <Icon id="add" label="add/plus"></Icon> button
   and select **New Run Script Action** from the menu.

   点击 <Icon id="add" label="add/plus"></Icon> 按钮，
   从菜单中选择 **New Run Script Action**（新建运行脚本操作）。

1. Click the **Run Script** title and change it to:

   点击 **Run Script**（运行脚本）标题并将其改为：

   ```plaintext
   Run Prepare Flutter Framework Script
   ```

1. Change the **Provide build settings from** to the `Runner` target.

   将 **Provide build settings from**（提供构建设置来源）改为 `Runner` 目标。

1. Input the following in the text box:

   在文本框中输入以下内容：

   ```sh
   "$FLUTTER_ROOT"/packages/flutter_tools/bin/macos_assemble.sh prepare
   ```

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-flutter-pre-action.png" caption="Add **Run Prepare Flutter Framework Script** build pre-action" />

### Step 3: Run app {:.no_toc}

### 步骤 3：运行应用 {:.no_toc}

1. Run the app in Xcode.

   在 Xcode 中运行应用。

1. Ensure that  **Run Prepare Flutter Framework Script** runs as a pre-action
   and that `FlutterGeneratedPluginSwiftPackage` is a target dependency.

   确保 **Run Prepare Flutter Framework Script** 作为预操作运行，
   且 `FlutterGeneratedPluginSwiftPackage` 是目标依赖项。

   <DashImage image="development/packages-and-plugins/swift-package-manager/flutter-pre-action-build-log.png" caption="Ensure `Run Prepare Flutter Framework Script` runs as a pre-action" />

1. Ensure that the app runs on the command line with `flutter run`.

   确保应用在命令行中可通过 `flutter run` 运行。

[turn on Swift Package Manager]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-turn-on-swift-package-manager
[file an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml
