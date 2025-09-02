---
# title: Adding an iOS App Clip target
title: 添加 iOS App Clip target
# description: How to add an iOS App Clip target to your Flutter project.
description: 如何为你的 Flutter 工程添加 iOS App Clip target。
---

:::important

Targeting iOS 16 increases the uncompressed IPA payload size limit
to 15MB. Depending on the size of your app, you might hit the limit. ([#71098][]).

针对 iOS 16 未压缩 IPA 有效负载的大小限制增加至 15MB。
根据应用的大小，你可能会遇到限制。([#71098][])。

:::

This guide describes how to manually add another
Flutter-rendering iOS App Clip target to your
existing Flutter project or [add-to-app][] project.

这个指南介绍了如何手动添加另一个使用 Flutter 来渲染的 iOS App Clip target, 
并将它集成到你现有的 Flutter 项目或 [add-to-app][] 项目。

[#71098]: {{site.repo.flutter}}/issues/71098
[add-to-app]: /add-to-app

:::warning

This is an advanced guide and is best intended
for audience with a working knowledge of iOS development.

这是一个高级指南，适合具有 iOS 开发工作经验的读者。

:::

To see a working sample, see the [App Clip sample][] on GitHub.

要查看完整可用的示例，请参阅 GitHub 上的 [App Clip 示例][App Clip sample]。

[App Clip sample]: {{site.repo.samples}}/tree/main/ios_app_clip

## Step 1 - Open project

## 步骤 1 - 打开项目

Open your iOS Xcode project, such as
`ios/Runner.xcworkspace` for full-Flutter apps.

打开你的 iOS Xcode 工程，例如你的纯 Flutter 项目中的 `ios/Runner.xcworkspace`。

## Step 2 - Add an App Clip target

## 步骤 2 - 添加一个 App Clip 的 target

**2.1**

Click on your project in the Project Navigator to show
the project settings.

点击你项目的 Project Navigator 来显示工程设置。

Press **+** at the bottom of the target list to add a new target.

点击 target 列表底部的 **+** 来添加一个新的 target。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/add-target.png" %}

**2.2**

Select the **App Clip** type for your new target.

为你的新 target 选择 `App Clip` 类型。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/add-app-clip.png" %}

**2.3**

Enter your new target detail in the dialog.

在对话框为你的新 target 输入详情。

Select the same language as your original target for **Language**.

选择与你原来的 target 相同的 **编程语言**。

(In other words, to simplify the setup,
don't create a Swift App Clip target for
an Objective-C main target, and vice versa.)

(换句话说，请勿为 Objective-C target 创建 Swift 类型的 App Clip target，
反之亦然，以简化设置。)

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/app-clip-details.png" %}

**2.4**

In the following dialog,
activate the new scheme for the new target.

在接下来的对话框中，
为新的 target 激活 (activate) 一个新的 scheme。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/activate-scheme.png" %}

**2.5**

Back in the project settings, open the **Build Phases** tab.
Drag **Embedded App Clips** to above **Thin Binary**.

返回项目设置，
打开 **Build Phases** 选项卡。
将 **Embedded App Clips** 拖动至 **Thin Binary** 上方。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/embedded-app-clips.png" %}

<a id="step-3"></a>
## Step 3 - Remove unneeded files

## 步骤 3 - 移除不需要的文件

**3.1**

In the Project Navigator, in the newly created App Clip group,
delete everything except `Info.plist` and
`<app clip target>.entitlements`.

在项目 Project Navigator 的新创建的 App Clip 组中，
将除了 `Info.plist` 和 `App Clip target.entitlements` 以外的所有内容删除。

:::tip

For add-to-app users, it's up to the reader to decide
how much of this template to keep to invoke
`FlutterViewController` or `FlutterEngine` APIs
from this code later.

对于 add-to-app 的用户，
由读者决定以后保留多少模板来从此代码中调用 
`FlutterViewController` 或 `FlutterEngine` API。

:::

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/clean-files.png" %}

Move files to trash.

移动文件到废纸篓。

**3.2**

If you don't use the `SceneDelegate.swift` file,
remove the reference to it in the `Info.plist`.

如果你不使用 `SceneDelegate.swift` 文件，移除在 `Info.plist` 中对应的引用。

Open the `Info.plist` file in the App Clip group.
Delete the entire dictionary entry for
**Application Scene Manifest**.

打开 App Clip 组中的 `Info.plist`。
删除 `Application Scene Manifest` 字典条目。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/scene-manifest.png" %}

## Step 4 - Share build configurations

## 步骤 4 -  共享构建配置

This step isn't necessary for add-to-app projects
since add-to-app projects have their custom build
configurations and versions.

对于 add-to-app 项目，此步骤不是必需的，
因为 add-to-app 有自己的自定义构建配置和版本。

**4.1**

Back in the project settings,
select the project entry now rather than any targets.

返回项目设置，现在选择 Project 条目，
而不是 Targets 里的任何 target。

In the **Info** tab, under the **Configurations**
expandable group, expand the
**Debug**, **Profile**, and **Release** entries.

在 **Info** 选项卡页中的 **Configurations** 可扩展组下，
展开 **Debug**、**Profile** 和 **Release** 条目。

For each, select the same value from the drop-down menu
for the App Clip target as the entry selected for the
normal app target.

每一个 App Clip target 的下拉菜单的值都应该与常规应用 target 中的值相同。

This gives your App Clip target access to Flutter's
required build settings.

这使你的 App Clip target 可以访问 Flutter 所需的构建设置。

Set **iOS Deployment Target** to at least **16.0** to take advantage of the
15MB size limit.

将 **iOS Deployment Target** 至少设置为 **16.0**，
这样设置后的大小限制将会提高至 15MB。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/configuration.png" %}

**4.2**

In the App Clip group's `Info.plist` file, set:

在 App Clip 组的 `Info.plist` 文件中，设置：

* `Build version string (short)` to `$(FLUTTER_BUILD_NAME)`
* `Bundle version` to `$(FLUTTER_BUILD_NUMBER)`

## Step 5 - Share code and assets

## 步骤 5 - 共享代码和资源

### Option 1 - Share everything

### 选项 1 - 共享所有东西

Assuming the intent is to show the same Flutter UI
in the standard app as in the App Clip,
share the same code and assets.

假设你的目标是在 App Clip 中显示与普通应用相同的 Flutter UI，
并共享相同的代码和资源。

For each of the following: `Main.storyboard`, `Assets.xcassets`,
`LaunchScreen.storyboard`, `GeneratedPluginRegistrant.m`, and
`AppDelegate.swift` (and `Supporting Files/main.m` if using Objective-C),
select the file, then in the first tab of the inspector,
also include the App Clip target in the `Target Membership`
checkbox group.

对于以下每一个文件： `Main.storyboard`、 `Assets.xcassets`、
`LaunchScreen.storyboard`、`GeneratedPluginRegistrant.m` 和 
`AppDelegate.swift`，
（如果你是 Objective-C 还应该包括 `Supporting Files/main.m`）
选择文件并且在检查器中选择第一个选项卡，
并且在 `Target Membership` 选中 `App Clip`。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/add-target-membership.png" %}

### Option 2 - Customize Flutter launch for App Clip

### 选项 2 - 为 App Clip 自定义 Flutter 的启动器

In this case, do not delete everything listed in [Step 3](#step-3).
Instead, use the scaffolding and the [iOS add-to-app APIs][]
to perform a custom launch of Flutter.
For example to show a [custom Flutter route][].

在这个例子中，不需要删除在 [步骤 3](#step-3) 中的任何东西。
相对的，使用 [iOS add-to-app APIs][] 的模板来自定义 Flutter 启动器。
可以参考示例 [自定义 Flutter 路由][custom Flutter route]。

[custom Flutter route]: /add-to-app/ios/add-flutter-screen#route
[iOS add-to-app APIs]: /add-to-app/ios/add-flutter-screen

## Step 6 - Add App Clip associated domains

## 步骤 6 - 添加 App Clip 的关联域名

This is a standard step for App Clip development.
See the [official Apple documentation][].

这是一个 App Clip 开发的标准步骤。
请查看 [苹果官方文档][official Apple documentation]。

[official Apple documentation]: {{site.apple-dev}}/documentation/app_clips/creating_an_app_clip_with_xcode#3604097

**6.1**

Open the `<app clip target>.entitlements` file.
Add an `Associated Domains` Array type.
Add a row to the array with `appclips:<your bundle id>`.

打开 `<app clip target>.entitlements` 文件。
添加 `Associated Domains` 数组。
添加一行 `appclips:<your bundle id>` 到数组中。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/app-clip-entitlements.png" %}

**6.2**

The same associated domains entitlement needs to be added
to your main app, as well.

同样的相关域名权利也需要添加到你的主应用程序中。

Copy the `<app clip target>.entitlements` file from your
App Clip group to your main app group and rename it to
the same name as your main target
such as `Runner.entitlements`.

将 `<app clip target>.entitlements` 
文件从 App Clip 组复制到主应用程序组，
并将其重命名为与主目标相同的名称，
例如 `Runner.entitlements`。

Open the file and delete the `Parent Application Identifiers`
entry for the main app's entitlement file
(leave that entry for the App Clip's entitlement file).

打开文件并删除主应用程序授权文件的 `Parent Application Identifiers` 
条目（将该条目保留为 App Clip 的授权文件）。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/main-app-entitlements.png" %}

**6.3**

Back in the project settings, select the main app's target,
open the **Build Settings** tab.
Set the **Code Signing Entitlements** setting to the
relative path of the second entitlements file
created for the main app.

返回项目设置，选择主应用 target，
打开 `Build Settings` 选项卡。
设置 `Code Signing Entitlements` 的值为
主应用创建的第二个授权文件的相对路径。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/main-app-entitlements-setting.png" %}

## Step 7 - Integrate Flutter

## 步骤 7 - 整合 Flutter

These steps are not necessary for add-to-app.

add-to-app 不需要这些步骤。

**7.1**

For the Swift target,
set the `Objective-C Bridging Header`
build setting to `Runner/Runner-Bridging-Header.h`

如果是 Swift target，设置 `Objective-C Bridging Header` 构建配置
为 `Runner/Runner-Bridging-Header.h`。

In other words, the same as the main app target's build settings.

换句话说，与主应用程序 target 的构建设置相同。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/bridge-header.png" %}

**7.2**

Now open the **Build Phases** tab. Press the **+** sign
and select **New Run Script Phase**.

现在打开 `Build Phases` 选项卡。点击 `+` 并且选择 `New Run Script Phase`。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/new-build-phase.png" %}

Drag that new phase to below the **Dependencies** phase.

拖动新的 phase 到 `Dependencies` phase。

Expand the new phase and add this line to the script content:

展开新 phase 并将以下内容添加到脚本：

```bash
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" build
```

Uncheck **Based on dependency analysis**.

取消选中 **Based on dependency analysis**。

In other words,
the same as the main app target's build phases.

简单来说，与主应用程序 target 的构建设置相同。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/xcode-backend-build.png" %}

This ensures that your Flutter Dart code is compiled
when running the App Clip target.

**7.3**

Press the **+** sign and select **New Run Script Phase** again.
Leave it as the last phase.

再次点击 `+` 并且选择 `New Run Script Phase`。
这是最后一个 phase。

This time, add:

这次添加如下内容：

```bash
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" embed_and_thin
```

Uncheck **Based on dependency analysis**.

In other words,
the same as the main app target's build phases.

简单来说，与主应用程序 target 的构建设置相同。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/xcode-backend-embed.png" %}

This ensures that your Flutter app and engine are embedded
into the App Clip bundle.

这将确保你的 Flutter 应用程序和引擎嵌入到 App Clip bundle 中。

## Step 8 - Integrate plugins

## Step 8 - 整合插件

**8.1**

Open the `Podfile` for your Flutter project
or add-to-app host project.

在你的 Flutter 项目
或是 add-to-app 的宿主项目中打开 `Podfile` 文件。

For full-Flutter apps, replace the following section:

如果是完整的 Flutter 项目，替换下面这段代码：

```ruby
target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
end
```

with:

为：

```ruby
use_frameworks!
use_modular_headers!
flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))

target 'Runner'
target '<name of your App Clip target>'
```

At the top of the file,
also uncomment `platform :ios, '13.0'` and set the
version to the lowest of the two target's iOS
Deployment Target.

在文件的开始，需要把 `platform :ios, '13.0'` 的注释（开头的 #）删除，
并且为你的 2 个 target 设置最低可运行的 iOS 系统版本。

For add-to-app, add to:

如果是 add-to-app，紧跟下面的代码：

```ruby
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end
```

with:

添加：

```ruby
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end

target '<name of your App Clip target>'
  install_all_flutter_pods(flutter_application_path)
end
```

**8.2**

From the command line,
enter your Flutter project directory
and then install the pod:

在命令行中，目前工作目录需要是你的 Flutter 项目目录，然后安装 pod：

```console
cd ios
pod install
```

## Run

## 运行

You can now run your App Clip target from Xcode by
selecting your App Clip target from the scheme drop-down,
selecting an iOS 16 or higher device and pressing run.

你现在可以在 Xcode 的 scheme 下拉中选择并运行你的 App Clip target 了，
选择一个 iOS 16 或更高版本的设备并点击运行。

{% render docs/app-figure.md, image:"development/platform-integration/ios-app-clip/run-select.png" %}

To test launching an App Clip from the beginning,
also consult Apple's doc on
[Testing Your App Clip's Launch Experience][testing].

要从头测试 App Clip 的启动，你也可以查看苹果公司的文档
[测试你的 App Clip 的启动体验][testing]。

[testing]: {{site.apple-dev}}/documentation/app_clips/testing_your_app_clip_s_launch_experience

## Debugging, hot reload

## 调试和热重载

Unfortunately `flutter attach` cannot auto-discover the Flutter session
in an App Clip due to networking permission restrictions.

不幸的是，由于网络权限的原因，`flutter attach` 
无法在 App clip 中自动发现 Flutter 会话。

You must then copy and paste it back into the
`flutter attach` command to connect.

你需要复制粘贴它们到 `flutter attach` 来连接。

For example:

例如：

```console
flutter attach --debug-uri <copied URI>
```
