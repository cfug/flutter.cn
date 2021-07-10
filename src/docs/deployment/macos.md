---
title: Build and release a macOS app
title: 构建和发布为 macOS 应用
description: How to release a Flutter app to the macOS App Store.
description: 如何在 macOS 的 App Store 上发布一个 Flutter 应用。
short-title: macOS
short-title: macOS
---

This guide provides a step-by-step walkthrough of releasing a
Flutter app to the [App Store][appstore].

本教程将指导开发者如何在 [App Store][appstore] 上发布 Flutter 应用程序。

## Preliminaries

## 预备工作

Before beginning the process of releasing your app,
ensure that it meets
Apple's [App Review Guidelines][appreview].

在开始发布应用程序之前，
请确保它符合苹果的 [应用程序审查指南][appreview]。

In order to publish your app to the App Store,
you must first enroll in the
[Apple Developer Program][devprogram].
You can read more about the various
membership options in Apple's
[Choosing a Membership][devprogram_membership] guide.

为了将应用程序发布到 App Store，
你必须先注册 [苹果开发者计划][devprogram]。
可以在 Apple 的 [选择会员资格][devprogram_membership] 指南中阅读更多关于各种会员资格的信息。

## Register your app on App Store Connect

## 在 App Store Connect 上注册你的应用程序

Manage your app's life cycle on
[App Store Connect][appstoreconnect] (formerly iTunes Connect).
You define your app name and description, add screenshots,
set pricing, and manage releases to the App Store and TestFlight.

在 [App Store Connect][appstoreconnect]（以前叫 iTunes Connect）上管理应用程序的生命周期。
你可以定义应用程序的名称和描述、添加屏幕截图、
设置定价以及管理应用程序商店和 TestFlight 的发布。

Registering your app involves two steps: registering a unique
Bundle ID, and creating an application record on App Store Connect.

注册应用程序包括两个步骤：注册唯一的 Bundle ID，
以及在 App Store Connect 上创建应用程序记录。

For a detailed overview of App Store Connect, see the
[App Store Connect][appstoreconnect_guide] guide.

有关 App Store Connect 的详细概述，
请参阅 [App Store Connect][appstoreconnect_guide]。

### Register a Bundle ID

### 注册 Bundle ID

Every macOS application is associated with a Bundle ID,
a unique identifier registered with Apple.
To register a Bundle ID for your app, follow these steps:

每个 macOS 应用程序都与一个 Bundle ID 关联，
Bundle ID 是在 Apple 注册的唯一标识。
要为应用程序注册 Bundle ID，请执行以下步骤：

1. Open the [App IDs][devportal_appids] page of your developer account.
1. 打开开发者帐户的 [App IDs][devportal_appids] 页面。
1. Click **+** to create a new Bundle ID.
1. 点击 **+** 创建一个新的 Bundle ID。
1. Enter an app name, select **Explicit App ID**, and enter an ID.
1. 输入应用程序名称，选择 **显式 App ID**，然后输入 ID。
1. Select the services your app uses, then click **Continue**.
1. 选择应用程序使用的服务，然后点击 **下一步**。
1. On the next page, confirm the details and click **Register**
   to register your Bundle ID.
1. 在下一页中，确认应用的详细信息，然后点击 **注册** 来注册你的 Bundle ID。

### Create an application record on App Store Connect

### 在 App Store Connect 上创建应用程序记录

Register your app on App Store Connect:

在 App Store Connect 上注册你的应用程序：

1. Open [App Store Connect][appstoreconnect_login] in your browser.
1. 在浏览器中打开 [App Store Connect][appstoreconnect_login]。
1. On the App Store Connect landing page, click **My Apps**.
1. 在 App Store Connect 登录页上，点击我的应用。
1. Click **+** in the top-left corner of the My Apps page,
   then select **New App**.
1. 点击 **我的应用程序** 页面左上角的 **+**，然后选择 **新建应用程序**。
1. Fill in your app details in the form that appears.
   In the Platforms section, ensure that iOS is checked.
   Since Flutter does not currently support tvOS,
   leave that checkbox unchecked. Click **Create**.
1. 在表单中填写应用程序详细信息。
   在平台部分，请确保选中了 iOS。
   由于 Flutter 目前不支持 tvOS，所以不要选中该项。点击 **创建**。
1. Navigate to the application details for your app and select
   **App Information** from the sidebar.
1. 从侧边栏中选择 **应用程序信息**，可以查看应用程序的详细信息。
1. In the General Information section, select the Bundle ID
   you registered in the preceding step.
1. 在常规信息中，选择在上一步中注册的 Bundle ID。

For a detailed overview,
see [Add an app to your account][appstoreconnect_guide_register].

更详细的介绍，请参阅 [将应用程序添加到您的帐户][appstoreconnect_guide_register]]

## Review Xcode project settings

## 检查 Xcode 项目设置

This step covers reviewing the most important settings
in the Xcode workspace.
For detailed procedures and descriptions, see
[Prepare for app distribution][distributionguide_config].

这一步包括检查 Xcode 工作区中最重要的设置。
更详细的过程和说明，请参阅 [准备应用程序分发][distributionguide_config]。

Navigate to your target's settings in Xcode:

在 Xcode 中配置目标：

1. In Xcode, open `Runner.xcworkspace` in your app's `ios` folder.

   在 Xcode 中，打开应用程序 `ios` 文件夹中的 `Runner.xcworkspace`。
1. To view your app's settings, select the **Runner** project in the Xcode
   project navigator. Then, in the main view sidebar, select the **Runner**
   target.
1. 要查看应用程序的设置，请在 Xcode 导航栏中选择 **Runner** 项目。
   然后，在主视图侧栏中，选择 **Runner** 目标。   
1. Select the **General** tab.
1. 选择 **常规** 选项。

Verify the most important settings.

确认最重要的设置。

In the **Identity** section:

在 **标识** 部分：

`App Category`
: The app category under which your app will be listed on the Mac App Store. This cannot be none.

`App Category（应用类别）`
<br> 你的应用将出现在 Mac App Store 中的哪个类别，此项不能为空。

`Bundle Identifier` 
: The App ID you registered on App Store Connect.

`Bundle Identifier`
<br> 你在 App Store Connect 注册的应用程序 ID。

In the **Deployment info** section:

在 **部署信息** 部分：

`Deployment Target`
: The minimum macOS version that your app supports. Flutter supports macOS 10.11 and later.

`Deployment Target（部署目标）`
<br> 应用程序支持的最低 macOS 版本。Flutter 支持 macOS 10.11 及更高版本。


In the **Signing & Capabilities** section:

在 **签名和功能** 部分：

`Automatically manage signing`
: Whether Xcode should automatically manage app signing
  and provisioning.  This is set `true` by default, which should
  be sufficient for most apps. For more complex scenarios,
  see the [Code Signing Guide][codesigning_guide].

`Automatically manage signing（自动管理签名）`
<br> Xcode 是否自动管理应用程序签名和配置。
  默认为 `true`，这对于大多数应用程序来说应该足够。
  更复杂的场景，请参阅 [代码签名指南][codesigning_guide]。

`Team`
: Select the team associated with your registered Apple Developer
  account. If required, select **Add Account...**,
  then update this setting.

`Team（团队）`
<br> 选择与你注册的 Apple 开发者帐户关联的团队。
  如果需要，请选择 **添加账户...**，然后更新此设置。

The **General** tab of your project settings should resemble
the following:

项目设置的 **常规** 选项应类似于以下内容：

![Xcode Project Settings](/images/releaseguide/macos_xcode_settings.png){:width="100%"}

For a detailed overview of app signing, see
[Create, export, and delete signing certificates][appsigning].

有关应用程序签名的详细概述，请参阅 [创建、导出和删除签名证书][appsigning]。

## Updating the app's version number

## 更新应用程序的版本号

The default version number of the app is `1.0.0`.
To update it, navigate to the `pubspec.yaml` file
and update the following line:

应用程序的默认版本号为 `1.0.0`。
如需更新版本号，在 `pubspec.yaml` 文件中更新以下位置：

`version: 1.0.0+1`

The version number is three numbers separated by dots,
such as `1.0.0` in the example above, followed by an optional
build number such as `1` in the example above, separated by a `+`.

版本号是三个用点分隔的数字，如上面示例中的 `1.0.0`，
后面用 `+` 分隔的是可选的内部版本号，如上面示例中的 `1`。

Both the version and the build number may be overridden in Flutter's
build by specifying `--build-name` and `--build-number`,
respectively.

版本号和内部版本号都可以在 Flutter 构建时，
通过指定 `--build name` 和 `--build number` 进行覆盖。

In macOS, `build-name` uses `CFBundleShortVersionString`
while `build-number` uses `CFBundleVersion`.
Read more about iOS versioning at [Core Foundation Keys][]
on the Apple Developer's site.

在 macOS 中，`build-name` 使用 `CFBundleShortVersionString`，
而 `build-number` 使用 `CFBundleVersion`。
在苹果开发者的网站上，查看更多关于 iOS 版本的 [Core Foundation Keys][Core Foundation Keys] 。

## Add an app icon

## 添加应用程序图标

When a new Flutter app is created, a placeholder icon set is created.
This step covers replacing these placeholder icons with your
app's icons:

创建一个新的 Flutter 应用程序时，会创建一个占位图标集。
此步骤包含如何用应用程序的图标替换这些占位图标：

1. Review the [macOS App Icon][appicon] guidelines.
1. 查看 [macOS 应用程序图标][appicon] 指南。
1. In the Xcode project navigator, select `Assets.xcassets` in the
   `Runner` folder. Update the placeholder icons with your own app icons.
1. 在 Xcode 项目导航栏的 `Runner` 文件夹中选择 `Assets.xcassets`。
   用你自己的应用程序图标更新占位图标。
1. Verify the icon has been replaced by running your app using
   `flutter run -d macos`.
1. 使用 `flutter run -d macos` 运行应用程序，验证图标是否已被替换。

## Create a build archive

## 创建构建存档

This step covers creating a build archive and uploading
your build to App Store Connect.

此步骤包含创建构建存档并将其上传到 App Store Connect。

During development, you've been building, debugging, and testing
with _debug_ builds. When you're ready to ship your app to users
on the App Store or TestFlight, you need to prepare a _release_ build.
At this point, you might consider [obfuscating your Dart code][]
to make it more difficult to reverse engineer. Obfuscating
your code involves adding a couple flags to your build command.

开发阶段，你已经在 _debug_ 模式下完成应用的构建、调试和测试。
当你准备好在 App Store 或 TestFlight 上向用户发布应用时，你需要准备一个 _release_ 版产物。
此时，你可以考虑 [混淆你的 Dart 代码][obfuscating your Dart code] 让逆向工程变得更加困难。
混淆你的代码需要向构建命令添加两个标志。

In Xcode, configure the app version and build:

在 Xcode 中，配置应用程序版本和内部版本：

1. In Xcode, open `Runner.xcworkspace` in your app's `macos` folder.
1. 在 Xcode 中，打开应用程序 `macos` 文件夹中的 `Runner.xcworkspace`。
1. Select **Runner** in the Xcode project navigator, then select the
   **Runner** target in the settings view sidebar.
1. 在 Xcode 项目导航栏中选择 **Runner**，然后在设置侧栏中选择 **Runner** 目标。
1. In the Identity section, update the **Version** to the user-facing
   version number you wish to publish.
1. 在标识部分，将 **版本** 更新为要发布的版本号。
1. In the Identity section, update the **Build** identifier to a unique
   build number used to track this build on App Store Connect.
   Each upload requires a unique build number.
1. 在标识部分，将 **构建标识** 更新为在 App Store Connect 上可以跟踪此生成的唯一生成串。
   每次上传都需要一个唯一的构建标识。

Finally, create a build archive and upload it to App Store Connect:

最后，创建一个构建存档并将其上传到 App Store Connect：

<ol markdown="1">
<li markdown="1">

Open Xcode and select **Product > Archive**. Run `flutter build macos` to produce a build archive.

打开 Xcode 并选择 **项目 > 存档**。运行 `flutter build macos` 生成构建存档。

</li>
<li markdown="1">

Click the **Validate App** button. If any issues are reported,
address them and produce another build. You can reuse the same
build ID until you upload an archive.

点击 **验证应用程序** 按钮。如果报告了任何问题，
请解决并再次构建。在上传存档之前，可以重用相同的构建 ID。

</li>
<li markdown="1">

After the archive has been successfully validated, click
**Distribute App**. You can follow the status of your build in the
Activities tab of your app's details page on
[App Store Connect][appstoreconnect_login].

成功验证存档后，点击 **分发应用程序**。
你可以在 [App Store Connect][appstoreconnect_login] 上的应用程序详细信息页的活动标签下查看构建状态。

</li>
</ol>

You should receive an email within 30 minutes notifying you that
your build has been validated and is available to release to testers
on TestFlight. At this point you can choose whether to release
on TestFlight, or go ahead and release your app to the App Store.

你应该会在 30 分钟内收到一封邮件。告知你的构建已经过验证，
可以在 TestFlight 上发布给测试人员。
此时，你可以选择在 TestFlight 上发布，或者继续将应用程序发布到应用程序商店。

For more details, see
[Upload an app to App Store Connect][distributionguide_upload].

更多详细信息，请参阅 [将应用程序上传到 App Store Connect][distributionguide_upload]。

## Distribute to registered devices

## 分发到已注册的设备

[TestFlight][] is not available for distributing macOS apps
to internal and external testers. See [distribution guide][distributionguide_macos] 
to prepare an archive for distribution to designated Mac computers.

[TestFlight][] 不可用于向内部和外部的测试人员分发 macOS 应用。
请参阅 [分发指南][distributionguide_macos]，
准备一个归档文件，以便分发到指定的 Mac 设备。

## Release your app to the App Store

## 将应用程序发布到应用程序商店

When you're ready to release your app to the world,
follow these steps to submit your app for review and
release to the App Store:

当你准备向全世界发布应用程序时，
请按照以下步骤提交应用程序以供审阅并发布到应用程序商店：

1. Select **Pricing and Availability** from the sidebar of your app's
   application details page on
   [App Store Connect][appstoreconnect_login] and complete the
   required information.
1. 在 [App Store Connect][appstoreconnect_login] 
   应用程序详情页的侧栏中选择 **定价和可用性**，并完善相关信息。
1. Select the status from the sidebar. If this is the first
   release of this app, its status is
   **1.0 Prepare for Submission**. Complete all required fields.
1. 从侧边栏中选择状态。
   如果这是应用程序的第一个版本，
   则其状态为 **1.0 准备提交**。填写所有必填字段。  
1. Click **Submit for Review**.
1. 点击 **提交审核**。

Apple notifies you when their app review process is complete.
Your app is released according to the instructions you
specified in the **Version Release** section.

苹果会在你的应用程序审核完成后通知你。
应用程序是按照你在 **版本发布** 说明中发布的。

For more details, see
[Distribute an app through the App Store][distributionguide_submit].

更多详细信息，请参阅 [通过应用程序商店分发应用程序][distributionguide_submit].

## Troubleshooting

## 故障排除

The [Distribute your app][distributionguide] guide provides a
detailed overview of the process of releasing an app to the App Store.

[分发你的应用程序][distributionguide] 指南详细概述了将应用程序发布到应用商店的过程。

[appicon]: https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/app-icon/
[appreview]: https://developer.apple.com/app-store/review/
[appsigning]: https://help.apple.com/xcode/mac/current/#/dev154b28f09
[appstore]: https://developer.apple.com/app-store/submissions/
[appstoreconnect]: https://developer.apple.com/support/app-store-connect/
[appstoreconnect_guide]: https://developer.apple.com/support/app-store-connect/
[appstoreconnect_guide_register]: https://help.apple.com/app-store-connect/#/dev2cd126805
[appstoreconnect_login]: https://appstoreconnect.apple.com/
[codesigning_guide]: https://developer.apple.com/library/content/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html
[Core Foundation Keys]: https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html
[devportal_appids]: https://developer.apple.com/account/ios/identifier/bundle
[devprogram]: https://developer.apple.com/programs/
[devprogram_membership]: https://developer.apple.com/support/compare-memberships/
[distributionguide]: https://help.apple.com/xcode/mac/current/#/dev8b4250b57
[distributionguide_config]: https://help.apple.com/xcode/mac/current/#/dev91fe7130a
[distributionguide_macos]: https://help.apple.com/xcode/mac/current/#/dev295cc0fae
[distributionguide_submit]: https://help.apple.com/xcode/mac/current/#/dev067853c94
[distributionguide_upload]: https://help.apple.com/xcode/mac/current/#/dev442d7f2ca
[obfuscating your Dart code]: /docs/deployment/obfuscate
[TestFlight]: https://developer.apple.com/testflight/
