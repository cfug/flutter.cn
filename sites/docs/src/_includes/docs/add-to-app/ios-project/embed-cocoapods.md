### Use CocoaPods and the Flutter SDK {:#method-a .no_toc}

### 使用 CocoaPods 与 Flutter SDK {:#method-a .no_toc}

#### Approach {:#method-a-approach}

#### 方法 {:#method-a-approach}

This first method uses CocoaPods to embed the Flutter modules.
CocoaPods manages dependencies for Swift projects,
including Flutter code and plugins.
Each time Xcode builds the app,
CocoaPods embeds the Flutter modules.

第一种方法使用 CocoaPods 嵌入 Flutter 模块。
CocoaPods 管理 Swift 项目的依赖，包括 Flutter 代码与 plugin。
每次 Xcode 构建 app 时，CocoaPods 都会嵌入 Flutter 模块。

This allows rapid iteration with the most up-to-date
version of your Flutter module without running additional
commands outside of Xcode.

这样你可以在 Xcode 之外无需运行额外命令，即可用 Flutter 模块的最新版本快速迭代。

To learn more about CocoaPods,
consult the [CocoaPods getting started guide][].

要了解更多 CocoaPods 信息，请参阅 [CocoaPods 入门指南][CocoaPods getting started guide]。

#### Watch the video

#### 观看视频

If watching a video helps you learn,
this video covers adding Flutter to an iOS app:

若观看视频有助于学习，本视频介绍如何将 Flutter 添加到 iOS app：

<YouTubeEmbed id="IIcrfrTshTs" title="Step by step on how to add Flutter to an existing iOS app"></YouTubeEmbed>

#### Requirements {:#method-a-reqs}

#### 要求 {:#method-a-reqs}

Every developer working on your project must have a local version
of the Flutter SDK and CocoaPods installed.

参与项目的每位开发者都必须在本地安装 Flutter SDK 和 CocoaPods。

#### Example project structure {:#method-a-structure}

#### 示例项目结构 {:#method-a-structure}

This section assumes that your existing app and
the Flutter module reside in sibling directories.
If you have a different directory structure,
adjust the relative paths.
The example directory structure resembles the following:

本节假定现有 app 与 Flutter 模块位于同级目录。
若目录结构不同，请调整相对路径。
示例目录结构如下：

<FileTree>

- my_flutter/
   - .ios/
   - Flutter/
      - podhelper.rb
- MyApp/
   - Podfile

</FileTree>

#### Update your Podfile

#### 更新你的 Podfile

Add your Flutter modules to your Podfile configuration file.
This section presumes you called your Swift app `MyApp`.

将 Flutter 模块添加到你的 Podfile 配置文件。
本节假定你的 Swift app 名为 `MyApp`。

1. _(Optional)_ If your existing app lacks a `Podfile` config file,
   navigate to the root of your app directory.
   Use the `pod init` command to create the `Podfile` file.

   1. _（可选）_ 若现有 app 没有 `Podfile` 配置文件，请进入 app 目录根目录，使用 `pod init` 命令创建 `Podfile` 文件。

   :::tip
   If the `pod init` command errors,
   check that you're on the latest version of CocoaPods.
   :::

   :::tip
   若 `pod init` 命令报错，请确认你使用的是最新版 CocoaPods。
   :::

1. Update your `Podfile` config file.

   1. 更新你的 `Podfile` 配置文件。

   1. Add the following lines after the `platform` declaration.

      1. 在 `platform` 声明之后添加以下行。

      ```ruby title="MyApp/Podfile"
      flutter_application_path = '../my_flutter'
      load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')
      ```

   1. For each [Podfile target][] that needs to embed Flutter,
      add a call to the
      `install_all_flutter_pods(flutter_application_path)` method.
      Add these calls after the settings in the previous step.

      1. 对于每个需要嵌入 Flutter 的 [Podfile target][]，添加对 `install_all_flutter_pods(flutter_application_path)` 方法的调用。在上一步设置之后添加这些调用。

      ```ruby title="MyApp/Podfile"
      target 'MyApp' do
        install_all_flutter_pods(flutter_application_path)
      end
      ```

   1. In the `Podfile`'s `post_install` block,
      add a call to `flutter_post_install(installer)`.
      This block should be the last block in the `Podfile` config file.

      1. 在 `Podfile` 的 `post_install` 块中，添加对 `flutter_post_install(installer)` 的调用。该块应是 `Podfile` 配置文件中的最后一个块。

      ```ruby title="MyApp/Podfile"
      post_install do |installer|
        flutter_post_install(installer) if defined?(flutter_post_install)
      end
      ```

To review an example `Podfile`, consult this [Flutter Podfile sample][].

要查看 `Podfile` 示例，请参阅此 [Flutter Podfile 示例][Flutter Podfile sample]。

#### Embed your frameworks

#### 嵌入你的 framework

At build time, Xcode packages your Dart code, each Flutter plugin,
and the Flutter engine into their own `*.xcframework` bundles.
CocoaPod's `podhelper.rb` script then embeds these
`*.xcframework` bundles into your project.

构建时，Xcode 会将 Dart 代码、每个 Flutter plugin 以及 Flutter engine 分别打包为各自的 `*.xcframework` bundle。
随后 CocoaPods 的 `podhelper.rb` 脚本将这些 `*.xcframework` bundle 嵌入你的项目。

* `Flutter.xcframework` contains the Flutter engine.

* `Flutter.xcframework` 包含 Flutter engine。

* `App.xcframework` contains the compiled Dart code for this project.

* `App.xcframework` 包含本项目的已编译 Dart 代码。

* `<plugin>.xcframework` contains one Flutter plugin.

* `<plugin>.xcframework` 包含一个 Flutter plugin。

To embed the Flutter engine, your Dart code, and your Flutter plugins
into your iOS app, complete the following procedure.

要将 Flutter engine、Dart 代码和 Flutter plugin 嵌入 iOS app，请完成以下步骤。

1. Refresh your Flutter plugins.

   1. 刷新 Flutter plugin。

   If you change the Flutter dependencies in the `pubspec.yaml` file,
   run `flutter pub get` in your Flutter module directory.
   This refreshes the list of plugins that the `podhelper.rb` script reads.

   若更改了 `pubspec.yaml` 中的 Flutter 依赖，请在 Flutter 模块目录中运行 `flutter pub get`。
   这会刷新 `podhelper.rb` 脚本读取的 plugin 列表。

   ```console
   flutter pub get
   ```

1. Embed the plugins and frameworks with CocoaPods.

   1. 使用 CocoaPods 嵌入 plugin 与 framework。

   1. Navigate to your iOS app project at `/path/to/MyApp/MyApp`.

      1. 进入 iOS app 项目目录 `/path/to/MyApp/MyApp`。

   1. Use the `pod install` command.

      1. 使用 `pod install` 命令。

      ```console
      pod install
      ```

   Your iOS app's **Debug** and **Release** build configurations embed
   the corresponding [Flutter components for that build mode][build-modes].

   iOS app 的 **Debug** 与 **Release** 构建配置会嵌入对应[该构建模式的 Flutter 组件][build-modes]。

1. Build the project.

   1. 构建项目。

   1. Open `MyApp.xcworkspace` in Xcode.

      1. 在 Xcode 中打开 `MyApp.xcworkspace`。

      Verify that you're opening `MyApp.xcworkspace` and
      not opening `MyApp.xcodeproj`.
      The `.xcworkspace` file has the CocoaPod dependencies,
      the `.xcodeproj` doesn't.

      请确认打开的是 `MyApp.xcworkspace`，而不是 `MyApp.xcodeproj`。
      `.xcworkspace` 文件包含 CocoaPods 依赖，`.xcodeproj` 则没有。

   1. Select **Product** > **Build** or press <kbd>Cmd</kbd> + <kbd>B</kbd>.

      1. 选择 **Product** > **Build**，或按 <kbd>Cmd</kbd> + <kbd>B</kbd>。

#### Set LLDB Init File

#### 设置 LLDB Init File

:::warning
Set your scheme to use Flutter's LLDB Init File. Without this file, debugging
on an iOS 26 or later device may crash.

请将 scheme 设置为使用 Flutter 的 LLDB Init File。没有此文件时，在 iOS 26 及更高版本设备上调试可能会崩溃。
:::

1. Generate Flutter LLDB files.

   1. 生成 Flutter LLDB 文件。

   1. Within your flutter application, run the following:

      1. 在 Flutter 应用中运行以下命令：

   ```console
   flutter build ios --config-only
   ```

   This will generate the LLDB files in the `.ios/Flutter/ephemeral` directory.

   这会在 `.ios/Flutter/ephemeral` 目录中生成 LLDB 文件。

1. Set the LLDB Init File.

   1. 设置 LLDB Init File。

   1. Go to **Product > Scheme > Edit Scheme**.

      1. 前往 **Product > Scheme > Edit Scheme**。

   1. Select the **Run** section in the left side bar.

      1. 在左侧边栏选择 **Run** 部分。

   1. Set the **LLDB Init File** using the same relative path to your Flutter
      application as you put in your Podfile in the **Update your Podfile**
      section.

      1. 设置 **LLDB Init File**，使用与 **Update your Podfile**（更新你的 Podfile）一节中 Podfile 相同的、指向 Flutter 应用的相对路径。

      ```console
      $(SRCROOT)/../my_flutter/.ios/Flutter/ephemeral/flutter_lldbinit
      ```

      If your scheme already has an **LLDB Init File**, you can add Flutter's
      LLDB file to it. The path to Flutter's LLDB Init File must be relative
      to the location of your project's LLDB Init File.

      若 scheme 已有 **LLDB Init File**，可将 Flutter 的 LLDB 文件加入其中。Flutter LLDB Init File 的路径必须相对于项目 LLDB Init File 的位置。

      For example, if your LLDB file is located at `/path/to/MyApp/.lldbinit`,
      you would add the following:

      例如，若 LLDB 文件位于 `/path/to/MyApp/.lldbinit`，可添加以下内容：

      ```console
      command source --relative-to-command-file "../my_flutter/.ios/Flutter/ephemeral/flutter_lldbinit"
      ```

[build-modes]: /testing/build-modes
[CocoaPods getting started guide]: https://guides.cocoapods.org/using/using-cocoapods.html
[Podfile target]: https://guides.cocoapods.org/syntax/podfile.html#target
[Flutter Podfile sample]: https://github.com/flutter/samples/blob/main/add_to_app/plugin/ios_using_plugin/Podfile
