---
title: Adding an iOS App Clip target
title: 支持 iOS App Clip 
description: How to add an iOS 14 App Clip target to your Flutter project.
description: 如何为你的 Flutter 工程加入 iOS 14 的 App Clip。
---

{{site.alert.important}}
  This support is offered experimentally on Flutter version 1.22, may not be
  stable, and may change in the future.

  这个支持在 Flutter 1.22 版本中是试验性功能, 可能不稳定, 也许在未来会修改。
{{site.alert.end}}

This guide describes how to manually add another Flutter-rendering iOS App Clip
target to your existing Flutter project or [add-to-app][] project.

本指南介绍了如何手动添加另一个 Flutter 以渲染iOS App Clip, 并将它到您现有的Flutter项目或 [add-to-app][] 项目。

If you are interested in automatically integrating an App Clip into your iOS
app, see feature request [#65451][].

如果您有兴趣将App Clip自动集成到iOS应用中，请参阅功能请求 [#65451][].

{{site.alert.warning}}
  This is an advanced guide and is best intended for audience with a working
  knowledge of iOS development.

  这是一个高级指南，适合具有iOS开发工作知识的读者。
{{site.alert.end}}

{{site.alert.warning}}
  CocoaPods version 1.10.0.beta.1 or higher is required to run Flutter apps with
  plugins.

  需要CocoaPods 1.10.0.beta.1或更高版本才能运行带有插件的Flutter应用程序。
{{site.alert.end}}

To see a working sample, see the [App Clip sample][] on GitHub.

要查看示例，请参阅 GitHub 上的[App Clip sample] []。

## Step 1 - Open project

## 步骤一 - 打开项目

Open your iOS Xcode project, such as `ios/Runner.xcworkspace` for full-Flutter
apps.

打开你的 iOS Xcode 工程, 例如你的 flutter 项目中的 `ios/Runner.xcworkspace`

## Step 2 - Add an App Clip target

## 步骤 2 - 添加一个 App Clip 的 target

**2.1**

Click on your project in the Project Navigator to show the project settings.

点击你项目的 Project Navigator 来显示工程设置。

Press `+` at the bottom of the target list to add a new target.

点击 target 列表底部的 `+` 来添加一个新的 target。

{% include app-figure.md
image="development/platform-integration/ios-app-clip/add-target.png" %}

**2.2**

Select the `App Clip` type for your new target.

选择 `App Clip` 类型作为你的新 target。

{% include app-figure.md
image="development/platform-integration/ios-app-clip/add-app-clip.png" %}

**2.3**

Enter your new target detail in the dialog.

在对话框中输入的新 target 的详情。

Select `Storyboard` for Interface.

选择 `Storyboard` 作为界面。

Select `UIKit App Delegate` for Life Cycle.

选择 `UIKit App Delegate` 作为生命周期。

Select the same language as your original target for Language.

选择与你原来的 target 相同的语言。

(In other words, don't create a Swift App Clip target for an Objective-C
main target, and vice versa to simplify the setup.)

(换句话说，请勿为 Objective-C target 创建 Swift 类型的 App Clip target，反之亦然，以简化设置。)

{% include app-figure.md
image="development/platform-integration/ios-app-clip/app-clip-details.png" %}

**2.4**

In the following dialog, activate the new scheme for the new target.

在接下来的弹框中，为新的 target 激活（activate）一个新的 scheme。

{% include app-figure.md
image="development/platform-integration/ios-app-clip/activate-scheme.png" %}

## Step 3 - Remove unneeded files

**3.1**

In the Project Navigator, in the newly created App Clip group, delete
everything except `Info.plist` and `<app clip target>.entitlements`.

在项目浏览器的新创建的 App Clip 组中，删除除 Info.plist 和 `App Clip target.entitlements` 之外的所有内容。

{{site.alert.tip}}
  For add-to-app users, it's up to the reader to decide how much of this template
  to keep to invoke `FlutterViewController` or `FlutterEngine` APIs from this code
  later.

  对于 add-to-app 的用户，由读者决定以后保留多少模板来从此代码中调用 `FlutterViewController` 或 `FlutterEngine` API。
{{site.alert.end}}

{% include app-figure.md
image="development/platform-integration/ios-app-clip/clean-files.png" %}

Move files to trash.

移动文件到废纸篓。

**3.2**

If you don't use the `SceneDelegate.swift` file, remove the reference to it in
the `Info.plist`.

如果你不使用 `SceneDelegate.swift` 文件, 移除它在 `Info.plist` 中的引用。

Open the `Info.plist` file in the App Clip group. Delete the entire
dictionary entry for `Application Scene Manifest`.

打开 App clip 组中的 `Info.plist`。删除 `Application Scene Manifest` 字典。

{% include app-figure.md
image="development/platform-integration/ios-app-clip/scene-manifest.png" %}

## Step 4 - Share build configurations

## 步骤4 共享构建配置

This step isn't necessary for add-to-app projects since add-to-app projects
have their custom build configurations and versions.

对于 add-to-app 项目，此步骤不是必需的，因为 add-to-app 具有其自定义生成配置和版本。

**4.1**

Back in the project settings, select the project entry now rather than any
targets.

返回项目设置，现在选择 Project 条目，而不是 Targets 里的任何 target。

In the `Info` tab, under the `Configurations` expandable group, expand the
`Debug`, `Profile`, and `Release` entries.

在`info`标签中的`Configurations`可扩展组下，展开`Debug`，`Profile`和`Release`条目。

For each, select the same value from the drop-down menu for the App Clip
target as the entry selected for the normal app target.

对于每一个，从 App Clip 目标的下拉菜单中选择与为常规 app 目标选择的条目相同的值。

This gives your App Clip target access to Flutter's required build settings.

这使您的 App Clip 目标可以访问 Flutter 的必需构建设置。

{% include app-figure.md
image="development/platform-integration/ios-app-clip/configuration.png" %}

**4.2**

In the App Clip group's `Info.plist` file, set:

在 App Clip 组的 `Info.plist` 文件中，设置：

- `Build version string (short)` to `$(FLUTTER_BUILD_NAME)`
- `Bundle version` to `$(FLUTTER_BUILD_NUMBER)`

## Step 5 - Share code and assets

## 步骤 5 - 共享代码和资产

### Option 1 - Share everything

### 选项 1 - 共享所有东西

Assuming the intent is to show the same Flutter UI in the standard app as in
the App Clip, share the same code and assets.

假设目的是在标准应用程序中显示与 App Clip 中相同的 Flutter UI，并共享相同的代码和资产。

For each of the following: `Main.storyboard`, `Assets.xcassets`,
`LaunchScreen.storyboard`, `GeneratedPluginRegistrant.m`, and
`AppDelegate.swift` (and `Supporting Files/main.m` if using Objective-C),
select the file, then in the first tab of the inspector,
also include the App Clip target in the `Target Membership` checkbox group.

对于以下每一个: `Main.storyboard`, `Assets.xcassets`, `LaunchScreen.storyboard`, `GeneratedPluginRegistrant.m`, 和 `AppDelegate.swift` (和 `Supporting Files/main.m` 如果用 Objective-C), 选择文件, 并且在检查器中选择第一个标签, 还应该在 `Target Membership` 选中 `App Clip`.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/add-target-membership.png"
%}

### Option 2 - Customize Flutter launch for App Clip

### 选项 2 - 为 App Clip 自定义 Flutter 的启动器

In this case, do not delete everything listed in [Step 3](#step-3). Instead,
use the scaffolding and the [iOS add-to-app APIs] to perform a custom launch of
Flutter. For example to show a [custom Flutter route][].

在这个例子中，不需要删除在[步骤 3](#step-3)中的任何东西。
相对的，使用 [iOS add-to-app APIs] 的模板来自定义 Flutter 启动器。
可以参考示例 [自定义路由][custom Flutter route]。

## Step 6 - Add App Clip associated domains

## 步骤 6 - 添加 App Clip 的 关联域

This is a standard step for App Clip development. See the
[official Apple documentation][].

这是应用程序剪辑开发的标准步骤。查看[苹果官方文档][official Apple documentation]。

**6.1**

Open the `<app clip target>.entitlements` file. Add an `Associated Domains`
Array type. Add a row to the array with `appclips:<your bundle id>`.

打开 `<app clip target>.entitlements` 文件。添加 `Associated Domains` 数组类型。
添加一行 `appclips:<your bundle id>` 到数组中。

{% include app-figure.md
image="development/platform-integration/ios-app-clip/app-clip-entitlements.png"
%}

**6.2**

The same associated domains entitlement needs to be added to your main app as
well.

同样的相关域名权利也需要添加到你的主应用程序。

Copy the `<app clip target>.entitlements` file from your App Clip group to
your main app group and rename it to the same name as your main target
such as `Runner.entitlements`.

将 `<app clip target>.entitlements` 文件从应用程序剪辑组复制到主应用程序组，并将其重命名为与主目标相同的名称，例如 `Runner.entitlements`。

Open the file and delete the `Parent Application Identifiers` entry for the main
app's entitlement file (leave that entry for the App Clip's entitlement file).

打开文件并删除主应用程序授权文件的 `Parent Application Identifiers` 条目（将该条目保留为 App Clip 的授权文件）。

{% include app-figure.md
image="development/platform-integration/ios-app-clip/main-app-entitlements.png"
%}

**6.3**

Back in the project settings, select the main app's target, open the
`Build Settings` tab. Set the `Code Signing Entitlements` setting to the
relative path of the second entitlements file created for the main app.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/main-app-entitlements-setting.png"
%}

## Step 7 - Integrate Flutter

These steps are not necessary for add-to-app.

**7.1**

In your App Clip's target's project settings, open the `Build Settings` tab.

For setting `Framework Search Paths`, add 2 entries:

- `$(inherited)`
- `$(PROJECT_DIR)/Flutter`

In other words, the same as the main app target's build settings.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/app-clip-framework-search.png"
%}

**7.2**

For Swift target, set the `Objective-C Bridging Header` build setting to
`Runner/Runner-Bridging-Header.h`

In other words, the same as the main app target's build settings.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/bridge-header.png"
%}

**7.3**

Now open the `Build Phases` tab. Press the `+` sign and select
`New Run Script Phase`.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/new-build-phase.png"
%}

Drag that new phase to below the `Dependencies` phase.

Expand the new phase and add this line to the script content:

```bash
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" build
```

In other words, the same as the main app target's build phases.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/xcode-backend-build.png"
%}

This ensures that your Flutter Dart code is compiled when running the App Clip
target.

**7.4**

Press the `+` sign and select `New Run Script Phase` again. Leave it as the last
phase.

This time, add:

```bash
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" embed_and_thin
```

In other words, the same as the main app target's build phases.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/xcode-backend-embed.png"
%}

This ensures that your Flutter app and engine are embedded into the App Clip
bundle.

## Step 8 - Disable Bitcode

In the App Clip target's `Build Settings` tab, set the `Enable Bitcode` setting
to No.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/bitcode.png"
%}

## Step 9 - Integrate plugins

{{site.alert.warning}}
  CocoaPods version 1.10.0.beta.1 or higher is required to run Flutter apps with
  plugins.
{{site.alert.end}}

**9.1**

Open the `Podfile` for your Flutter project or add-to-app host project.

For full-Flutter apps, replace the following section:

```ruby
target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
end
```

with:

```ruby
use_frameworks!
use_modular_headers!
flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))

target 'Runner'
target '<name of your App Clip target>'
```

At the top of the file, also uncomment `platform :ios, '9.0'` and set the
version to the lowest of the 2 target's iOS Deployment Target.

For add-to-app, add to:

```ruby
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end
```

with:

```ruby
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end

target '<name of your App Clip target>'
  install_all_flutter_pods(flutter_application_path)
end
```

**9.2**

From the command line, enter your Flutter project directory.

`cd ios`

then

`pod install`.

## Run

You can now run your App Clip target from Xcode by selecting your App Clip
target from the scheme drop-down, selecting an iOS 14 device and pressing run.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/run-select.png"
%}

To test launching an App Clip from the beginning, also consult Apple's doc on
[Testing Your App Clip's Launch Experience][].

## Debugging, hot reload

Unfortunately `flutter attach` cannot auto-discover the Flutter session
in an App Clip due to networking permission restrictions.

In order to debug your App Clip and use functionalities like hot reload, you
must look for the Observatory URI from the console output in Xcode after
running.

{% include app-figure.md
image="development/platform-integration/ios-app-clip/observatory-uri.png"
%}

You must then copy paste it back into the `flutter attach` command to connect.

Such as

`flutter attach --debug-uri <copied URI>`


[add-to-app]: /docs/development/add-to-app
[#65451]: {{site.github}}/flutter/flutter/issues/65451
[official Apple documentation]: https://developer.apple.com/documentation/app_clips/creating_an_app_clip_with_xcode#3604097
[iOS add-to-app APIs]: /docs/development/add-to-app/ios/add-flutter-screen
[custom Flutter route]: /docs/development/add-to-app/ios/add-flutter-screen#route
[App Clip sample]: {{site.github}}/flutter/samples/ios_app_clip
[Testing Your App Clip's Launch Experience]: https://developer.apple.com/documentation/app_clips/testing_your_app_clip_s_launch_experience
