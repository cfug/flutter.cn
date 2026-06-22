Replace `plugin_name` throughout this guide with the name of your plugin.
The example below uses `ios`, replace `ios` with `macos` or `darwin`, as applicable.

在本指南全文将 `plugin_name` 替换为你的插件名称。
以下示例使用 `ios`，请酌情将 `ios` 替换为 `macos` 或 `darwin`。

1. Ensure that you are using Flutter 3.44 or later. This enables SwiftPM by default.

   请确保你运行的是 Flutter 3.44 或更高版本。
   该版本默认启用了 SwiftPM。

1. Start by creating a directory under the `ios`, `macos`, and/or `darwin`
   directories.
   Name this new directory the name of the platform package.

   首先在 `ios`、`macos` 和/或 `darwin`
   目录下创建一个目录。
   将该新目录命名为平台 package 的名称。

   <FileTree>

   - plugin_name/
     - ios/
       - ...
       - **plugin_name/**
   
   </FileTree>

1. Within this new directory, create the following files/directories:

   在此新目录中，创建以下文件/目录：

   - `Package.swift` (file)

     `Package.swift`（文件）

   - `Sources` (directory)

     `Sources`（目录）

   - `Sources/plugin_name` (directory)

     `Sources/plugin_name`（目录）

   Your plugin should look like:

   你的插件结构应如下所示：

   <FileTree>

   - plugin_name/
     - ios/
       - ...
       - plugin_name/
         - **Package.swift**
         - **Sources/**
           - **plugin_name/**

   </FileTree>

1. Use the following template in the `Package.swift` file:

   在 `Package.swift` 文件中使用以下模板：

   ```swift title="Package.swift"
   // swift-tools-version: 5.9
   // The swift-tools-version declares the minimum version of Swift required to build this package.

   import PackageDescription

   let package = Package(
       // TODO: Update your plugin name.
       name: "plugin_name",
       platforms: [
           // TODO: Update the platforms your plugin supports.
           // If your plugin only supports iOS, remove `.macOS(...)`.
           // If your plugin only supports macOS, remove `.iOS(...)`.
           .iOS("13.0"),
           .macOS("10.15")
       ],
       products: [
           // TODO: Update your library and target names.
           // If the plugin name contains "_", replace with "-" for the library name.
           .library(name: "plugin-name", targets: ["plugin_name"])
       ],
       dependencies: [
           .package(name: "FlutterFramework", path: "../FlutterFramework")
       ],
       targets: [
           .target(
               // TODO: Update your target name.
               name: "plugin_name",
               dependencies: [
                   .product(name: "FlutterFramework", package: "FlutterFramework")
               ],
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (e.g. if it uses any required reason APIs), update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   // .process("PrivacyInfo.xcprivacy"),

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ]
           )
       ]
   )
   ```

1. Update the [supported platforms][] in your `Package.swift` file.

   在 `Package.swift` 文件中更新 [支持的平台][supported platforms]。

   ```swift title="Package.swift"
       platforms: [
           // TODO: Update the platforms your plugin supports.
           // If your plugin only supports iOS, remove `.macOS(...)`.
           // If your plugin only supports macOS, remove `.iOS(...)`.
           [!.iOS("13.0"),!]
           [!.macOS("10.15")!]
       ],
   ```

   [supported platforms]: {{site.apple-dev}}/documentation/packagedescription/supportedplatform

1. Update the package, library, and target names in your `Package.swift` file.

   在 `Package.swift` 文件中更新 package、库和目标名称。

   ```swift title="Package.swift"
   let package = Package(
       // TODO: Update your plugin name.
       name: [!"plugin_name"!],
       platforms: [
           .iOS("13.0"),
           .macOS("10.15")
       ],
       products: [
           // TODO: Update your library and target names.
           // If the plugin name contains "_", replace with "-" for the library name
           .library(name: [!"plugin-name"!], targets: [[!"plugin_name"!]])
       ],
       dependencies: [],
       targets: [
           .target(
               // TODO: Update your target name.
               name: [!"plugin_name"!],
               dependencies: [],
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (e.g. if it uses any required reason APIs), update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   // .process("PrivacyInfo.xcprivacy"),

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ]
           )
       ]
   )
   ```

   :::note
   If the plugin name contains `_`, the library name must be a `-` separated
   version of the plugin name.

   如果插件名称包含 `_`，库名称必须是插件名称用 `-` 分隔
   后的形式。
   :::

1. If your plugin has a [`PrivacyInfo.xcprivacy` file][], move it to
   `ios/plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy` and uncomment
   the resource in the `Package.swift` file.

   如果你的插件有 [`PrivacyInfo.xcprivacy` 文件][`PrivacyInfo.xcprivacy` file]，请将其移动到
   `ios/plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy`，并在
   `Package.swift` 文件中取消注释该资源。

   ```swift title="Package.swift"
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (e.g. if it uses any required reason APIs), update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   [!.process("PrivacyInfo.xcprivacy"),!]

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ],
   ```

1. Move any resource files from `ios/Assets` to
   `ios/plugin_name/Sources/plugin_name` (or a subdirectory).
   Add the resource files to your `Package.swift` file, if applicable.
   For more instructions, visit
   [Bundling resources with a Swift package][].

[Bundling resources with a Swift package]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package

   将 `ios/Assets` 中的资源文件移动到
   `ios/plugin_name/Sources/plugin_name`（或其子目录）。
   如适用，将资源文件添加到 `Package.swift` 文件中。
   更多说明请参阅
   [https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package](https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package)。

1. Move all files from `ios/Classes` to `ios/plugin_name/Sources/plugin_name`.

   将 `ios/Classes` 中的所有文件移动到 `ios/plugin_name/Sources/plugin_name`。

1. Add the `FlutterFramework` as a dependency and update Dart and Flutter versions.

   将 FlutterFramework 添加为依赖并更新 Dart 和 Flutter 版本。

   Update `Package.swift` to include `FlutterFramework`:

   更新 `Package.swift` 以包含 `FlutterFramework`：

   ```swift title="Package.swift"
   dependencies: [
       [!.package(name: "FlutterFramework", path: "../FlutterFramework")!]
   ],
   targets: [
       .target(
           // TODO: Update your target name.
           name: "plugin_name",
           dependencies: [
               [!.product(name: "FlutterFramework", package: "FlutterFramework")!]
           ],
   ```

   In `pubspec.yaml`, update versions to:

   在 `pubspec.yaml` 中，将版本更新为：

   ```yaml title="pubspec.yaml"
   environment:
     sdk: ^3.11.0
     flutter: ">=3.41.0"
   ```

1. The `ios/Assets`, `ios/Resources`, and `ios/Classes` directories should now
   be empty and can be deleted.

   `ios/Assets`、`ios/Resources` 和 `ios/Classes` 目录现在应为空，可以删除。

1. If your plugin uses [Pigeon][], update your Pigeon input file.

   如果你的插件使用 [Pigeon][]，请更新 Pigeon 输入文件。

   ```dart title="pigeons/messages.dart" diff
     kotlinOptions: KotlinOptions(),
     javaOut: 'android/app/src/main/java/io/flutter/plugins/Messages.java',
     javaOptions: JavaOptions(),
   - swiftOut: 'ios/Classes/messages.g.swift',
   + swiftOut: 'ios/plugin_name/Sources/plugin_name/messages.g.swift',
     swiftOptions: SwiftOptions(),
   ```

1. Update your `Package.swift` file with any customizations you might need.

   根据需要进行自定义，更新 `Package.swift` 文件。

   1. In Xcode, open the `ios/plugin_name/` directory.

      在 Xcode 中打开 `ios/plugin_name/` 目录。

   1. In Xcode, open your `Package.swift` file.
      Verify Xcode doesn't produce any warnings or errors for this file.

      在 Xcode 中打开 `Package.swift` 文件。
      确认 Xcode 不会对此文件产生警告或错误。

      :::tip
      If Xcode doesn't show any files, quit Xcode (**Xcode > Quit Xcode**) and
      reopen.

      如果 Xcode 未显示任何文件，请退出 Xcode（**Xcode > Quit Xcode**）并
      重新打开。

      If Xcode doesn't update after you make a change, try clicking
      **File > Packages > Reset Package Caches**.

      如果更改后 Xcode 未更新，请尝试点击
      **File > Packages > Reset Package Caches**。
      :::

   1. If your `ios/plugin_name.podspec` file has [CocoaPods `dependency`][]s,
      add the corresponding [Swift Package Manager dependencies][] to your
      `Package.swift` file.

      如果 `ios/plugin_name.podspec` 文件包含 [CocoaPods `dependency`][]，
      请将对应的 [Swift Package Manager 依赖][Swift Package Manager dependencies] 添加到
      `Package.swift` 文件。

   1. If your package must be linked explicitly `static` or `dynamic`
      ([not recommended by Apple][]), update the [Product][] to define the
      type:

      如果 package 必须显式以 `static` 或 `dynamic` 链接
      （[Apple 不推荐][not recommended by Apple]），请更新 [Product][] 以定义
      类型：

      ```swift title="Package.swift"
      products: [
          .library(name: "plugin-name", type: .static, targets: ["plugin_name"])
      ],
      ```

   1. Make any other customizations. For more information on how to write a
      `Package.swift` file, visit [`PackageDescription`][].

      进行其他自定义。有关如何编写
      `Package.swift` 文件的更多信息，请参阅
      [https://developer.apple.com/documentation/packagedescription](https://developer.apple.com/documentation/packagedescription)。

      :::tip
      If you add targets to your `Package.swift` file, use unique names.
      This avoids conflicts with targets from other packages.

      如果向 `Package.swift` 文件添加目标，请使用唯一名称。
      这可避免与其他 package 中的目标冲突。
      :::

[`PackageDescription`]: {{site.apple-dev}}/documentation/packagedescription

1. Update your `ios/plugin_name.podspec` to point to new paths.

   更新 `ios/plugin_name.podspec`，使其指向新路径。

   ```ruby title="ios/plugin_name.podspec" diff
   - s.source_files = 'Classes/**/*.swift'
   - s.resource_bundles = {'plugin_name_privacy' => ['Resources/PrivacyInfo.xcprivacy']}
   + s.source_files = 'plugin_name/Sources/plugin_name/**/*.swift'
   + s.resource_bundles = {'plugin_name_privacy' => ['plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy']}
   ```

1. Update loading of resources from bundle to use [`Bundle.module`][].

   更新从 bundle 加载资源的方式，改用 [`Bundle.module`][]。

   ```swift
   #if SWIFT_PACKAGE
        let settingsURL = Bundle.module.url(forResource: "image", withExtension: "jpg")
   #else
        let settingsURL = Bundle(for: Self.self).url(forResource: "image", withExtension: "jpg")
   #endif
   ```

   :::note
   `Bundle.module` only works if there are resources
   [defined in the `Package.swift` file][Bundling resources] or
   [automatically included by Xcode][Xcode resource detection].
   Otherwise, using `Bundle.module` results in an error.

   仅当存在资源时，`Bundle.module` 才有效
   （在 [`Package.swift` 文件中定义][Bundling resources] 或
   [由 Xcode 自动包含][Xcode resource detection]）。
   否则，使用 `Bundle.module` 会导致错误。
   :::

1. If your `.gitignore` doesn't include `.build/` and `.swiftpm/` directories,
   you'll want to update your `.gitignore` to include:

   如果 `.gitignore` 未包含 `.build/` 和 `.swiftpm/` 目录，
   你需要更新 `.gitignore` 以包含：

    ```text title=".gitignore"
    .build/
    .swiftpm/
    ```

    Commit your plugin's changes to your version control system.

    将插件的更改提交到版本控制系统。

1. Verify the plugin still works with CocoaPods.

   验证插件在 CocoaPods 下仍能正常工作。

   1. Turn off Swift Package Manager.

      关闭 Swift Package Manager：

      ```sh
      flutter config --no-enable-swift-package-manager
      ```

   1. Navigate to the plugin's example app.

      进入插件的示例应用目录。

      ```sh
      cd path/to/plugin/example/
      ```

   1. Ensure the plugin's example app builds and runs.

      确保插件的示例应用能构建并运行。

      ```sh
      flutter run
      ```

   1. Navigate to the plugin's top-level directory.

      进入插件的顶层目录。

      ```sh
      cd path/to/plugin/
      ```

   1. Run CocoaPods validation lints.

      运行 CocoaPods 验证 lint：

      ```sh
      pod lib lint ios/plugin_name.podspec  --configuration=Debug --skip-tests --use-modular-headers --use-libraries
      ```

      ```sh
      pod lib lint ios/plugin_name.podspec  --configuration=Debug --skip-tests --use-modular-headers
      ```

1. Verify the plugin works with Swift Package Manager.

   验证插件在 Swift Package Manager 下能正常工作。

   1. Turn on Swift Package Manager.

      开启 Swift Package Manager：

       ```sh
       flutter config --enable-swift-package-manager
       ```

   1. Navigate to the plugin's example app.

      进入插件的示例应用目录。

      ```sh
      cd path/to/plugin/example/
      ```

   1. Ensure the plugin's example app builds and runs.

      确保插件的示例应用能构建并运行。

      ```sh
      flutter run
      ```

      :::note
      Using the Flutter CLI to run the plugin's example app with the
      Swift Package Manager feature turned on migrates the project to add
      Swift Package Manager integration.

      在开启 Swift Package Manager 功能的情况下，
      使用 Flutter CLI 运行插件的示例应用会迁移项目以添加 Swift Package Manager 集成。

      This raises the example app's Flutter SDK requirement to version 3.24 or
      higher.

      这会将示例应用的 Flutter SDK 要求提高到 3.24 或更高版本。

      If you'd like to run the example app using an older Flutter SDK version,
      do not commit the migration's changes to your version control system.
      If needed, you can always
      [undo the Swift Package Manager migration][removeSPM].

      如果你想使用较旧的 Flutter SDK 版本运行示例应用，
      请勿将迁移产生的更改提交到版本控制系统。
      如有需要，你始终可以
      [撤销 Swift Package Manager 迁移][removeSPM]。
      :::

   1. In Xcode, open the plugin's example app.
      Ensure that **Package Dependencies** shows in the left
      **Project Navigator**.

      在 Xcode 中打开插件的示例应用。
      确保左侧 **Project Navigator**（项目导航器）中显示 **Package Dependencies**（Package 依赖）。

1. Verify tests pass.

   验证测试通过。

   * **If your plugin has native unit tests (XCTest), make sure you also
     [update unit tests in the plugin's example app][].**

     **如果你的插件有原生单元测试（XCTest），请确保你也
     [更新了插件示例应用中的单元测试][update unit tests in the plugin's example app]。**

   * Follow instructions for [testing plugins][].

     按照 [测试插件][testing plugins] 说明操作。

[`PrivacyInfo.xcprivacy` file]: {{site.apple-dev}}/documentation/bundleresources/privacy_manifest_files
[Pigeon]: https://pub.dev/packages/pigeon
[CocoaPods `dependency`]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Swift Package Manager dependencies]: {{site.apple-dev}}/documentation/packagedescription/package/dependency
[not recommended by Apple]: {{site.apple-dev}}/documentation/packagedescription/product/library(name:type:targets:)
[Product]: {{site.apple-dev}}/documentation/packagedescription/product
[`Bundle.module`]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package#Access-a-resource-in-code
[Bundling resources]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package#Explicitly-declare-or-exclude-resources
[Xcode resource detection]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package#:~:text=Xcode%20detects%20common%20resource%20types%20for%20Apple%20platforms%20and%20treats%20them%20as%20a%20resource%20automatically
[removeSPM]: /packages-and-plugins/swift-package-manager/for-app-developers#how-to-remove-swift-package-manager-integration
[update unit tests in the plugin's example app]: /packages-and-plugins/swift-package-manager/for-plugin-authors/#how-to-update-unit-tests-in-a-plugins-example-app
[testing plugins]: /testing/testing-plugins
