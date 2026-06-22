---
# title: Set up Flutter flavors for iOS and macOS
title: 为 iOS 和 macOS 配置 Flutter flavor
shortTitle: Flavors (iOS and macOS)
# description: >
#   How to create Flutter flavors for an iOS or macOS app.
description: >
  如何为 iOS 或 macOS 应用创建 Flutter flavor。
ai-translated: true
---

This guide shows you how to create Flutter flavors for an
iOS or macOS app.

本指南介绍如何为 iOS 或 macOS 应用创建 Flutter flavor。

## Overview

## 概览

A Flutter flavor is basically a collection of settings that
define how a specific version of your app should be built
and run. For example, a flavor could determine which icon,
app name, API key, feature flag, and logging level is
associated with a specific version of your app.

Flutter flavor 本质上是一组设置，定义应用的特定版本应如何构建和运行。例如，flavor 可决定特定版本关联的图标、应用名称、API 密钥、功能开关和日志级别。

If you want to create Flutter flavors for an iOS app, you'll
need to do so in Xcode. Xcode does not have a concept called
"flavor". Instead, you'll need to set up something called a
scheme and attach custom configurations to it.

若要为 iOS 应用创建 Flutter flavor，需在 Xcode 中操作。Xcode 没有名为「flavor」的概念，你需要设置 scheme 并为其附加自定义配置。

The following illustrates an example of two Flutter flavors
(staging, production) as Xcode schemes with custom Xcode
configurations assigned to them:

下图示例展示两个 Flutter flavor（staging、production）作为 Xcode scheme，并分配了自定义 Xcode 配置：

<table class="table table-striped">
  <thead>
    <tr>
      <th>Scheme</th>
      <th><t>Configurations for the scheme</t><t>该 scheme 的配置</t></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>staging</td>
      <td>
        Debug-staging<br>
        Profile-staging<br>
        Release-staging<br>
      </td>
    </tr>
    <tr>
      <td>production</td>
      <td>
        Debug-production<br>
        Profile-production<br>
        Release-production<br>
      </td>
    </tr>
  </tbody>
</table>

## Configure Xcode schemes

## 配置 Xcode scheme

The following steps show how to configure two Xcode schemes
called `staging` and `production` for your Flutter iOS
project. You can also use these steps to set up a
macOS project by replacing any reference to `iOS`
with `macOS`.

以下步骤说明如何为 Flutter iOS 项目配置名为 `staging` 和 `production` 的两个 Xcode scheme。
也可将 `iOS` 替换为 `macOS` 来配置 macOS 项目。

For a seamless workflow, we've started with a
new Flutter project called `flavors_example`, but you can
always start with an existing project.

为流程顺畅，我们从名为 `flavors_example` 的新 Flutter 项目开始，你也可以从现有项目入手。

1.  Create a new Flutter project called `flavors_example`.

    创建一个名为 `flavors_example` 的新 Flutter 项目。

    ```console title="console"
    $ flutter create flavors_example
    ```

1.  Open the default Xcode workspace for the iOS version of
    the `flavors_example` project.

    为 `flavors_example` 项目的 iOS 版本打开默认的 Xcode workspace。

    ```console title="console"
    $ cd flavors_example && open ios/Runner.xcworkspace
    ```

1.  Open the `flavors_example` project in the
    Xcode project navigator:

    在 Xcode 项目导航器中打开 `flavors_example` 项目：

    * Open the **project navigator**
      (**View** > **Navigators** > **Project**).

      打开 **project navigator**（**View** > **Navigators** > **Project**）。

    * In the **project navigator**, at the top, select
      **Runner**.

      在 **project navigator** 顶部选择 **Runner**。

1.  Create schemes in Xcode:

    在 Xcode 中创建 scheme：

    * Open the **New Scheme** window
      (**Product > Scheme > New Scheme**).

      打开 **New Scheme** 窗口（**Product > Scheme > New Scheme**）。

    * In the **Target** field, select **Runner**.

      在 **Target** 字段中选择 **Runner**。

    * In the **Name** box, enter `staging`.

      在 **Name** 框中输入 `staging`。

    * Click **Okay** to add the new scheme.

      点击 **Okay** 添加新 scheme。

    * Repeat the previous steps for a scheme called
      `production`.

      对名为 `production` 的 scheme 重复上述步骤。

    * When finished, check to make sure that you
      have the following schemes:

      完成后，检查确认你已拥有以下 scheme：

      ![Schemes for Flutter flavors](/assets/images/docs/flavors/flavors-ios-schemes.png){:width="100%"}

    :::note
    By default the new schemes are shared. The schemes must
    be shared for Flutter flavors to work properly. To
    double-check that sharing is enabled, open the
    **Manage Schemes** window
    (**Product > Scheme > Manage Schemes**) and make sure
    that the **Shared** checkbox to the right of your new
    scheme is checked.

    默认情况下新 scheme 是共享的。scheme 必须共享，Flutter flavor 才能正常工作。
    要再次确认已启用共享，请打开 **Manage Schemes** 窗口（**Product > Scheme > Manage Schemes**），
    确保新 scheme 右侧的 **Shared** 复选框已勾选。
    :::

1.  Create configurations for the schemes in Xcode:

    在 Xcode 中为这些 scheme 创建配置：

    * In the **project navigator**, select **Runner**.

      在 **project navigator** 中选择 **Runner**。

    * In the main window under **PROJECT**, select
      **Runner**.

      在主窗口的 **PROJECT** 下选择 **Runner**。

    * Open the **Info tab** if it isn’t open.

      若 **Info tab** 未打开，请将其打开。

    * Go to the **Configurations** section and add new
      `Debug` configurations.

      进入 **Configurations** 部分，添加新的 `Debug` 配置。

      * Click **+**, select
        **Duplicate "Debug" configuration**, and name the
        new configuration `Debug-staging`.

        点击 **+**，选择 **Duplicate "Debug" configuration**，
        并将新配置命名为 `Debug-staging`。

      * Click **+**, select
        **Duplicate "Debug" configuration**, and name the
        new configuration `Debug-production`.

        点击 **+**，选择 **Duplicate "Debug" configuration**，
        并将新配置命名为 `Debug-production`。

    * Repeat the previous step for the
      `Release` configurations and the
      `Profile` configurations.

      对 `Release` 配置和 `Profile` 配置重复上一步骤。

    * When finished, check to make sure that you
      have the following configurations:

      完成后，检查确认你已拥有以下配置：

      ![Scheme configurations for Flutter flavors](/assets/images/docs/flavors/flavors-ios-scheme-configurations.png){:width="100%"}

    :::note
    The scheme name (example: `staging`) that is appended to
    a configuration name must be lowercase if you want to
    use it with the Flutter CLI command.

    若要与 Flutter CLI 配合，追加到配置名的 scheme 名称（如 `staging`）须为小写。
    :::

    :::note
    Your configurations should be based on your
    `Debug.xcconfig`, `Profile.xcconfig`,
    and `Release.xcconfig` files, not the
    `Pods-Runner.xcconfig` file. You can check this by
    expanding the configuration names in Xcode.

    配置应基于 `Debug.xcconfig`、`Profile.xcconfig`、`Release.xcconfig`，而非 `Pods-Runner.xcconfig`。
    可在 Xcode 中展开配置名检查。
    :::

1.  Assign the configurations to the schemes in Xcode:

    在 Xcode 中将配置分配给这些 scheme：

    * Open the **Manage Schemes** window
      (**Product > Scheme > Manage Schemes**).

      打开 **Manage Schemes** 窗口（**Product > Scheme > Manage Schemes**）。

    * Select the `staging` scheme and edit it.

      选择 `staging` scheme 并进行编辑。

    * In the following tabs, update the
      **Build Configuration** field as follows:

      在以下各个 tab 中，按如下方式更新 **Build Configuration** 字段：

      * **Run**: `Debug-staging`
      * **Test**: `Debug-staging`
      * **Profile**: `Profile-staging`
      * **Analyze**: `Debug-staging`
      * **Archive**: `Release-staging`

    * Click **Close**.

      点击 **Close**。

    * Repeat the previous steps for the `production` scheme.

      对 `production` scheme 重复上述步骤。

1.  If you are working with a pre-existing Flutter project
    that has at least one Podfile, update it. For more
    information, see [Update Podfiles][].

    如果你使用的是已有的、至少包含一个 Podfile 的 Flutter 项目，请更新它。
    更多信息请参阅 [更新 Podfile][Update Podfiles]。

1.  To make sure that you've set up everything correctly,
    run your app on the new schemes in Xcode. You won't see
    any differences because the configuration settings
    haven't changed, but you do want to make sure that the
    app can run.

    为确保一切设置正确，请在 Xcode 中用这些新 scheme 运行你的应用。
    由于配置设置尚未改变，你不会看到任何差异，但你需要确认应用可以正常运行。

    * Select the `staging` scheme
      (**Product > Schemes > staging**).

      选择 `staging` scheme（**Product > Schemes > staging**）。

    * To the right of `staging` in the toolbar,
      select the iOS device you want to test against. In
      the following example, the device is `iPhone 16 Pro`.

      在工具栏中 `staging` 右侧，选择你想要测试的 iOS 设备。
      在以下示例中，设备为 `iPhone 16 Pro`。

      ![Run a Flutter flavor](/assets/images/docs/flavors/flavors-ios-test-scheme.png){:width="100%"}

    * Run the app scheme (**Product > Run**).

      运行该应用 scheme（**Product > Run**）。

    * Repeat the previous steps for the `production` scheme.

      对 `production` scheme 重复上述步骤。

1.  If everything runs, you're ready to customize your
    configurations. For more information, see
    [Customize configurations][].

    如果一切都能运行，你就可以开始自定义配置了。更多信息请参阅
    [自定义配置][Customize configurations]。

[Update Podfiles]: #update-podfiles
[Customize configurations]: #customize-configurations

## Launch an Xcode scheme

## 启动 Xcode scheme

After you've created the schemes for an iOS app in
Xcode, you can launch a specific scheme through Xcode or
Flutter. You can also use these steps to launch a macOS
project by replacing any reference to `iOS` with `macOS`.

在 Xcode 中为 iOS 应用创建 scheme 后，可通过 Xcode 或 Flutter 启动特定 scheme。将 `iOS` 替换为 `macOS` 也可用于 macOS 项目。

### Use the flavor flag (Flutter CLI)

### 使用 flavor 标志（Flutter CLI）

You can launch an Xcode scheme in `Debug` mode with the
Flutter CLI using the following steps:

可使用 Flutter CLI 按以下步骤以 `Debug` 模式启动 Xcode scheme：

1.  In your IDE, start the iOS simulator.

    在 IDE 中启动 iOS 模拟器。

1.  In the console, navigate to the
    `flavors_example` directory and enter the following
    command:

    在控制台中进入 `flavors_example` 目录，并输入以下命令：

    ```console title="console"
    $ flutter run --flavor <xcode_scheme_name>
    ```

    * `<xcode_scheme_name>`: Replace this with the name of
      your Xcode scheme (for example, `staging` or
      `production`).

      `<xcode_scheme_name>`：替换为你的 Xcode scheme 名称（例如 `staging` 或 `production`）。

    Example:

    示例：

    ```console title="console"
    $ flutter run --flavor staging
    ```

### Access the current flavor

### 访问当前 flavor

1.  **Import the services library:**
    To access the `appFlavor` constant, add the following import to your Dart file:

    **导入 services 库：**
    要访问 `appFlavor` 常量，在 Dart 文件中添加以下 import：

    ```dart
    import 'package:flutter/services.dart';
    ```

1.  **Check the flavor value:**
    Use the `appFlavor` constant in your application logic (often in `main()`) to handle flavor-specific configurations:

    **检查 flavor 值：**
    在应用逻辑（通常在 `main()` 中）使用 `appFlavor` 常量处理 flavor 特定的配置：

    ```dart
    void main() {
      // appFlavor will match the name of the Xcode scheme
      if (appFlavor == 'production') {
        // Logic for production environment
        Config.apiUrl = 'https://api.flavors_example.com';
      } else if (appFlavor == 'staging') {
        // Logic for staging environment
        Config.apiUrl = 'https://staging.api.flavors_example.com';
      }

      runApp(const MyApp());
    }
    ```

    :::note
The value of `appFlavor` matches the name of the Xcode scheme you defined (for example, `staging` or `production`). If no flavor is specified during the build, `appFlavor` returns `null`.

`appFlavor` 的值与你定义的 Xcode scheme 名称一致（如 `staging` 或 `production`）。构建时未指定 flavor 则 `appFlavor` 返回 `null`。
    :::

### Use the run command (Xcode)

### 使用 run 命令（Xcode）

You can launch a specific scheme in Xcode using the
following steps:

可按以下步骤在 Xcode 中启动特定 scheme：

1.  Select the scheme you want to test
    (**Product > Schemes > Choose scheme**).

    选择你想要测试的 scheme（**Product > Schemes > Choose scheme**）。

1.  Next to the scheme name in the toolbar, select the
    device you want to test against.

    在工具栏中 scheme 名称旁边，选择你想要测试的设备。

1.  Run the scheme for your app
    (**Product > Run**).

    为你的应用运行该 scheme（**Product > Run**）。

## Customize configurations

## 自定义配置

After you've added Xcode schemes, you can customize them for
your iOS app. You can also use these steps to configure a
macOS project by replacing any reference to `iOS` with
`macOS`.

添加 Xcode scheme 后，可为 iOS 应用自定义。将 `iOS` 替换为 `macOS` 也可配置 macOS 项目。

### Create distinct app display names {: #create_a_distinct_app_display_name }

### 创建不同的应用显示名称 {: #create_a_distinct_app_display_name }

If you have multiple schemes, a distinct app name can
quickly identify which scheme your deployed app is using.

若有多个 scheme，不同的应用名称可快速识别已部署应用使用的 scheme。

<img src="/assets/images/docs/flavors/flavors-ios-app-names.png" alt="Rename a Flutter flavor" width="50%">

The following steps show how to add distinct app display
names in Xcode for two schemes called `staging` and
`production` in a project called `flavors_example`.

以下步骤说明如何在名为 `flavors_example` 的项目中，为 `staging` 和 `production` 两个 scheme 在 Xcode 中添加不同的应用显示名称。

1.  Create user-defined settings in Xcode:

    在 Xcode 中创建用户自定义设置：

    * Open the **project navigator**
      (**View > Navigators > Project**).

      打开 **project navigator**（**View > Navigators > Project**）。

    * In the **project navigator**, at the top, select
      **Runner**.

      在 **project navigator** 顶部选择 **Runner**。

    * In the main window under **TARGETS**, select
      **Runner**.

      在主窗口的 **TARGETS** 下选择 **Runner**。

    * Open the **Build Settings** tab.

      打开 **Build Settings** tab。

    * To the left of the Basic tab, click **+** and select
      **Add User-Defined Setting**.

      在 Basic tab 左侧，点击 **+** 并选择 **Add User-Defined Setting**。

    * Create a setting named `APP_DISPLAY_NAME`.

      创建一个名为 `APP_DISPLAY_NAME` 的设置。

    * Expand the **APP_DISPLAY_NAME** setting.

      展开 **APP_DISPLAY_NAME** 设置。

    * Assign the following values to the following keys:

      为以下键分配对应的值：

      * **Debug-production**: `Flavors prod`
      * **Debug-staging**: `Flavors staging`
      * **Profile-production**: `Flavors prod`
      * **Profile-staging**: `Flavors staging`
      * **Release-production**: `Flavors prod`
      * **Release-staging**: `Flavors staging`

1.  Update `Info.plist` in Xcode:

    在 Xcode 中更新 `Info.plist`：

    * In the project navigator, select
      **Runner > Runner > Info** to open
      `flavor_test/ios/Runner/Info.plist`.

      在项目导航器中，选择 **Runner > Runner > Info** 以打开
      `flavor_test/ios/Runner/Info.plist`。

    * Under **Information Property List**, find the
      following key and update the value for it:

      在 **Information Property List** 下，找到以下键并更新其值：

      * **Key**: `CFBundleDisplayName`
      * **Value**: `$(APP_DISPLAY_NAME)`

1.  Launch the app for each scheme (`staging`, `production`)
    and check to make sure that the app display name has
    changed for each. To launch a scheme, see the steps in
    [Launch an Xcode scheme][].

    为每个 scheme（`staging`、`production`）启动应用，确认每个 scheme 的应用显示名称都已改变。
    要启动某个 scheme，请参阅 [启动 Xcode scheme][Launch an Xcode scheme] 中的步骤。

[Launch an Xcode scheme]: #launch-an-xcode-scheme

### Create distinct icons

### 创建不同的图标

If you have multiple schemes, a distinct icon for each
configuration can help you quickly identify which scheme
your deployed app is using.

若有多个 scheme，为各配置使用不同图标有助于快速识别已部署应用使用的 scheme。

<img src="/assets/images/docs/flavors/flavors-ios-icons.png" alt="Rename a Flutter flavor" width="50%">

The following steps show how to add a distinct icon in
Xcode for two schemes called `staging` and `production` in
an iOS project called `flavors_example`.

以下步骤说明如何在名为 `flavors_example` 的 iOS 项目中，为 `staging` 和 `production` 两个 scheme 在 Xcode 中添加不同图标。

1.  Prepare your icons:

    准备你的图标：

    * Design your staging icon and production icon in the
      design tool of your choice.

      用你喜欢的设计工具设计 staging 图标和 production 图标。

    * Generate versions of the staging icon and production
      icon in the sizes that you need. Save them in
      PNG format.

      生成你所需尺寸的 staging 图标和 production 图标，并以 PNG 格式保存。

      :::note
      You can use a tool like [App Icon Generator][]
      to generate the versions of your icons.

      可使用 [App Icon Generator][] 等工具生成各尺寸图标。
      :::

1.  Add the icons to your Xcode project:

    将图标添加到你的 Xcode 项目：

    * Open the **project navigator**
      (**View > Navigators > Project**).

      打开 **project navigator**（**View > Navigators > Project**）。

    * In the **project navigator**, select
      **Runner > Runner > Assets** to open the
      **Assets** window.

      在 **project navigator** 中，选择 **Runner > Runner > Assets** 以打开
      **Assets** 窗口。

    * Complete the following steps for the staging icon:

      对 staging 图标完成以下步骤：

      * Click **+  > iOS > iOS App icon**.

        点击 **+  > iOS > iOS App icon**。

      * Name the icon `AppIcon-staging`.

        将图标命名为 `AppIcon-staging`。

      * Drag your staging icons into the
        **AppIcon-staging** window and make sure the icons
        are assigned to the correct sizes.

        将你的 staging 图标拖入 **AppIcon-staging** 窗口，
        并确保这些图标已分配到正确的尺寸。

    * Repeat the previous step for the production icon.

      对 production 图标重复上一步骤。

1.  Connect the icons to your schemes:

    将图标关联到你的 scheme：

    * Open the **project navigator**.

      打开 **project navigator**。

    * In the main window under **TARGETS**, select
      **Runner**.

      在主窗口的 **TARGETS** 下选择 **Runner**。

    * Open the **General** tab if it's not already open.

      若 **General** tab 尚未打开，请将其打开。

    * Go to the **Apps Icons and Launch Screen** section and
      expand it.

      进入 **Apps Icons and Launch Screen** 部分并展开它。

    * To the right of the **App icon** field, click
      **+** and update the fields as follows:

      在 **App icon** 字段右侧，点击 **+** 并按如下方式更新各字段：

      * **Debug-staging**: `AppIcon-staging`
      * **Profile-staging**: `AppIcon-staging`
      * **Release-staging**: `AppIcon-staging`
      * **Debug-production**: `AppIcon-production`
      * **Profile-production**: `AppIcon-production`
      * **Release-production**: `AppIcon-production`

1.  Launch the app for each scheme (`staging`, `production`)
    and check to make sure that the app icon has
    changed for each. To launch a scheme, see the steps in
    [Launch an Xcode scheme][].

    为每个 scheme（`staging`、`production`）启动应用，确认每个 scheme 的应用图标都已改变。
    要启动某个 scheme，请参阅 [启动 Xcode scheme][Launch an Xcode scheme] 中的步骤。

[Launch an Xcode scheme]: #launch-an-xcode-scheme
[App Icon Generator]: https://www.appicon.co/

### Add distinct bundle identifiers

### 添加不同的 bundle identifier

A bundle identifier is a unique identifier for your
application on Apple's platforms. If you are using multiple
Xcode schemes as Flutter flavors, you can have Apple treat
each scheme as a separate application. To do this, you need
to assign a different bundle identifier to each scheme.
This allows you to test new features or bug fixes in one
version of the app (for example `staging`) without affecting
another version of the app (for example, `production`).

bundle identifier 是应用在 Apple 平台上的唯一标识。
若将多个 Xcode scheme 用作 Flutter flavor，
可让 Apple 将每个 scheme 视为独立应用，
需为每个 scheme 分配不同的 bundle identifier，
这样可在某一版本（如 `staging`）测试新功能或修复而不影响另一版本（如 `production`）。

The following steps show how to set a unique
bundle identifier for two Xcode schemes called `staging`
and `production` in an iOS project called `flavors_example`.

以下步骤说明如何在名为 `flavors_example` 的 iOS 项目中
为 `staging` 和 `production` 两个 Xcode scheme 设置唯一的 bundle identifier。

1.  In Xcode, open the **project navigator**
    (**View > Navigators > Project**).

    在 Xcode 中打开 **project navigator**（**View > Navigators > Project**）。

1.  In the main window under **TARGETS**, select
    **Runner**.

    在主窗口的 **TARGETS** 下选择 **Runner**。

1.  Open the **Build Settings** tab.

    打开 **Build Settings** tab。

1.  Navigate to the **Packaging** section.

    进入 **Packaging** 部分。

1.  Expand the **Product Bundle Identifier** setting to
    see the different build configurations.

    展开 **Product Bundle Identifier** 设置，查看不同的构建配置。

1.  For each scheme's build configuration, set the
    desired bundle identifier. For example:

    为每个 scheme 的构建配置设置所需的 bundle identifier。例如：

    *   Debug-staging, Profile-staging, Release-staging:

        `com.example.flavorsExample.staging`

    *   Debug, Profile, Release, Debug-production,
        Profile-production, Release-production:

        `com.example.flavorsExample`

1.  Ensure that these bundle identifiers are included in
    your App ID and your App ID is [registered in your Apple Developer account][].

    确保这些 bundle identifier 已包含在你的 App ID 中，并且你的 App ID 已
    [在你的 Apple Developer 账号中注册][registered in your Apple Developer account]。

[registered in your Apple Developer account]: {{site.apple-dev}}/help/account/identifiers/register-an-app-id/

### Bundle assets

### 打包资源

If you have assets that are only used in a specific flavor
in your app, you can configure them to only be bundled into
your app when launching that flavor. This prevents your
app bundle size from being bloated by unused assets. To
bundle assets for each flavor, add the `flavors` subfield
to the `assets` field in your project's pubspec. To learn
more, see the [`assets` field][] in
[Flutter pubspec options][].

若资源仅在应用的特定 flavor 中使用，可配置为仅在该 flavor 启动时打包，避免未使用资源增大包体积。为每个 flavor 打包资源，请在项目 pubspec 的 `assets` 字段添加 `flavors` 子字段。详见 [Flutter pubspec options][] 中的 [`assets` field][]。

[`assets` field]: /tools/pubspec#assets
[Flutter pubspec options]: /tools/pubspec

### Update Podfiles

### 更新 Podfile

If you are creating new Xcode schemes for a Flutter iOS
project and you have an iOS Podfile in an existing
Flutter project, you must update the Flutter iOS Podfile to
match the changes you made in Xcode.

若为 Flutter iOS 项目创建新 Xcode scheme 且现有 Flutter 项目有 iOS Podfile，必须更新 Flutter iOS Podfile 以匹配 Xcode 中的更改。

The following steps show how to update your iOS Podfile to
include two new Xcode schemes called `staging` and
`production` in a Flutter project called `flavors_example`.
You can also use these steps to update a macOS
project by replacing any reference to `iOS` with `macOS`.

以下步骤说明如何在名为 `flavors_example` 的 Flutter 项目中
更新 iOS Podfile 以包含 `staging` 和 `production` 两个新 Xcode scheme。
将 `iOS` 替换为 `macOS` 也可用于 macOS 项目。

1. In your IDE, open the `ios/Podfile` file.

   在你的 IDE 中打开 `ios/Podfile` 文件。

1. Make the following updates and save your changes.

   做出以下更新并保存改动。

    ```ruby title="flavors_example/ios/Podfile"
    project 'Runner', {
      ...
      'Debug' => :debug,
      'Debug-staging' => :debug,
      'Debug-production' => :debug,
      'Profile' => :release,
      'Profile-staging' => :release,
      'Profile-production' => :release,
      'Release' => :release,
      'Release-staging' => :release,
      'Release-production' => :release,
      ...
    ```

### Add unique build settings

### 添加唯一构建设置

You can use [build settings][] to govern your iOS build
process from compilation and linking to debugging and
distribution. One way that you can use build settings
with Flutter flavors is to assign those build settings
to Xcode build configurations. For example, you might want
to assign different API URLs to  `Debug-staging` and
`Debug-production`. For example:

可使用 [build settings][]（构建设置）管理从编译、链接到调试和分发的 iOS 构建流程。
将构建设置用于 Flutter flavor 的一种方式是为 Xcode 构建配置分配这些设置，
例如为 `Debug-staging` 和 `Debug-production` 分配不同的 API URL。例如：

```plaintext title="debug-staging-settings.xcconfig"
# Debug-staging build settings
API_BASE_URL = staging.flavors.com/api
```

```plaintext title="debug-production-settings.xcconfig"
# Debug-production build settings
API_BASE_URL = flavors.com/api
```

If you would like to add additional build settings for
a specific build configuration, see Apple's
[Adding a build configuration file to your project][].

若要为特定构建配置添加更多构建设置，
请参阅 Apple 的 [Adding a build configuration file to your project][]（向项目添加构建配置文件）。

[build settings]: {{site.apple-dev}}/documentation/xcode/build-settings-reference/
[Adding a build configuration file to your project]: {{site.apple-dev}}/documentation/xcode/adding-a-build-configuration-file-to-your-project

### Add additional customizations

### 添加更多自定义项

This document contains a few common Xcode scheme
configurations, but there are many more that you can apply.
To learn about them, see
[Customizing the build schemes for a project][].

本文档包含若干常见 Xcode scheme 配置，还可应用更多配置。
详见 [Customizing the build schemes for a project][]（自定义项目的构建 scheme）。

[Customizing the build schemes for a project]: {{site.apple-dev}}/documentation/xcode/customizing-the-build-schemes-for-a-project

## More information

## 更多信息

For more information on creating and using flavors, check
out the following resources:

有关创建和使用 flavor 的更多信息，请参阅以下资源：

* [How to set up Flutter & Firebase with Multiple Flavors
  using the FlutterFire CLI][flutterfire-cli]

  [使用 FlutterFire CLI 配置多 Flavor 的 Flutter 与 Firebase][flutterfire-cli]

* [Build flavors in Flutter (Android and iOS) with different
  Firebase projects per flavor Flutter Ready to Go][flavors-firebase]

  [Flutter 中按 flavor 使用不同 Firebase 项目的构建 flavor（Android 与 iOS）][flavors-firebase]

[flutterfire-cli]: https://codewithandrea.com/articles/flutter-firebase-multiple-flavors-flutterfire-cli/
[flavors-firebase]: {{site.medium}}/@animeshjain/build-flavors-in-flutter-android-and-ios-with-different-firebase-projects-per-flavor-27c5c5dac10b
