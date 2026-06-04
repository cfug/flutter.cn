Once you [turn on Swift Package Manager][], the Flutter CLI tries to migrate
your project the next time you run your app using the CLI.
This migration updates your Xcode project to use Swift Package Manager to
add Flutter plugin dependencies.

[开启 Swift Package Manager][Turn on Swift Package Manager] 后，Flutter CLI 会在你下次使用 CLI
运行应用时尝试迁移你的项目。
此次迁移会更新你的 Xcode 项目，使其通过 Swift Package Manager
添加 Flutter 插件依赖。

To migrate your project:

要迁移你的项目：

1. [Turn on Swift Package Manager][].

   [开启 Swift Package Manager][Turn on Swift Package Manager]。

1. Run the macOS app using the Flutter CLI.

   使用 Flutter CLI 运行 macOS 应用。

   If your macOS project doesn't have Swift Package Manager integration yet, the
   Flutter CLI tries to migrate your project and outputs something like:

   如果你的 macOS 项目尚未集成 Swift Package Manager，
   Flutter CLI 会尝试迁移你的项目，并输出类似以下内容：

   ```console
   $ flutter run -d macos
   Adding Swift Package Manager integration...
   ```

   The automatic iOS migration modifies the
   `macos/Runner.xcodeproj/project.pbxproj` and
   `macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme` files.

   自动 iOS 迁移会修改
   `macos/Runner.xcodeproj/project.pbxproj` 和
   `macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme` 文件。

1. If the Flutter CLI's automatic migration fails, follow the steps in
   [add Swift Package Manager integration manually][manualIntegration].

   如果 Flutter CLI 的自动迁移失败，请按照
   [手动添加 Swift Package Manager 集成][manualIntegration] 中的步骤操作。

[Optional] To check if your project is migrated:

[可选] 检查你的项目是否已迁移：

1. Run the app in Xcode.

   在 Xcode 中运行应用。

1. Ensure that  **Run Prepare Flutter Framework Script** runs as a pre-action
   and that `FlutterGeneratedPluginSwiftPackage` is a target dependency.

   确保 **Run Prepare Flutter Framework Script** 作为预操作运行，
   且 `FlutterGeneratedPluginSwiftPackage` 是目标依赖项。

   <DashImage image="development/packages-and-plugins/swift-package-manager/flutter-pre-action-build-log.png" caption="Ensure **Run Prepare Flutter Framework Script** runs as a pre-action" />

   确保 **Run Prepare Flutter Framework Script** 作为预操作运行。

[Turn on Swift Package Manager]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-turn-on-swift-package-manager
[manualIntegration]: /packages-and-plugins/swift-package-manager/for-app-developers/#add-to-a-flutter-app-manually
