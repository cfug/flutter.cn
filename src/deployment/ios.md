---
title: Build and release an iOS app
title: 构建和发布为 iOS 应用
short-title: iOS
description: How to release a Flutter app to the App Store.
description: 如何在 App Store 上发布一个 Flutter 应用。
short-title: iOS
tags: 发布, iOS
keywords: 上传App Store,发布Flutter应用
---

This guide provides a step-by-step walkthrough of releasing a
Flutter app to the [App Store][appstore] and [TestFlight][].

这个教程将为你提供关于如何将 Flutter App 发布到
[App Store][appstore_cn] 和 [TestFlight][testflight_cn] 的说明。

## Preliminaries

## 预先准备

Xcode is required to build and release your app. You
must use a device running macOS to follow this guide.

构建和发布一个 macOS 应用需要使用 Xcode，
你必须要有一个运行着 macOS 系统的设备来学习本指南文档。

Before beginning the process of releasing your app,
ensure that it meets
Apple's [App Review Guidelines][appreview].

在开始发布你的 app 的进程之前，
确保你已经看过了 Apple 的 [App Store 审核指南][appreview_cn]。

In order to publish your app to the App Store,
you must first enroll in the
[Apple Developer Program][devprogram].
You can read more about the various
membership options in Apple's
[Choosing a Membership][devprogram_membership] guide.

想要发布你的 app 到 App Store，
你需要注册 [Apple Developer Program][devprogram_cn]。
你可以在苹果的 [选择会员资格(开发者类型)][devprogram_membership_cn]
中查看到关于多种不同会员类型的选择。

## Register your app on App Store Connect

## 在 App Store Connect 上注册你的 App

Manage your app's life cycle on
[App Store Connect][appstoreconnect] (formerly iTunes Connect).
You define your app name and description, add screenshots,
set pricing, and manage releases to the App Store and TestFlight.

[App Store Connect][appstoreconnect_cn]
（曾经的 iTunes Connet）是你将会管理应用生命周期的地方。
你将会定义应用的名称和描述以及截图，设置价格，
并管理发布到 App Store 和 Testflight。

Registering your app involves two steps: registering a unique
Bundle ID, and creating an application record on App Store Connect.

注册你的 app 需要两步：登记唯一的套装 ID（Bundle ID），
并在你的 App Store Connect 中创建一个 app。

For a detailed overview of App Store Connect, see the
[App Store Connect][appstoreconnect_guide] guide.

关于更多 App Store Connect 的细节，
查看 [App Store Connect][appstoreconnect_guide_cn] 指南。

### Register a Bundle ID

### 登记套装 ID

Every iOS application is associated with a Bundle ID,
a unique identifier registered with Apple.
To register a Bundle ID for your app, follow these steps:

每一个 iOS 应用都与一个在 Apple 登记的唯一的套装 ID 关联。
要为你的应用登记一个套装 ID，请参考下面的步骤：

1. Open the [App IDs][devportal_appids] page of your developer account.

   在你的开发者账号页面打开 [App IDs][devportal_appids] 页面。

1. Click **+** to create a new Bundle ID.

   点击 **+** 来创建一个新的套装 ID。

1. Enter an app name, select **Explicit App ID**, and enter an ID.

   输入一个 App 名称，选择 **Explicit App ID**，然后输入一个 ID。

1. Select the services your app uses, then click **Continue**.

   选择你的 App 将要使用的服务，然后点击 **继续**

1. On the next page, confirm the details and click **Register**
   to register your Bundle ID.

   在下一页，确认细节并点击 **注册** 来注册你的 Bundle ID。

### Create an application record on App Store Connect

### 在 App Store Connect 创建一个应用记录

Register your app on App Store Connect:

在 App Store Connect 中注册你的应用：

Next, you'll register your app on App Store Connect:

接下来，你需要在 App Store Connect 注册你的应用：

1. Open [App Store Connect][appstoreconnect_login] in your browser.

   在你的浏览器里打开 [App Store Connect][appstoreconnect_login]。

1. On the App Store Connect landing page, click **My Apps**.

   在 App Store Connect 的落地页，点击 **My Apps**。

1. Click **+** in the top-left corner of the My Apps page,
   then select **New App**.

   在我的 app 页面的顶部左侧 ，点击 **+** ，然后选择 **New App**。

1. Fill in your app details in the form that appears.
   In the Platforms section, ensure that iOS is checked.
   Since Flutter does not currently support tvOS,
   leave that checkbox unchecked. Click **Create**.

   在出现的表单中填写你的 app 细节。在平台部分，确保 iOS 被选中。
   由于 Flutter 暂时不支持 tvOS，保持该选项为未选。点击 **Create**。

1. Navigate to the application details for your app and select
   **App Information** from the sidebar.

   跳转到你的应用详情，然后从侧边栏选择 **App Information** 。

1. In the General Information section, select the Bundle ID
   you registered in the preceding step.

   在基础信息部分，选择你在前一步注册的套装 ID。

For a detailed overview,
see [Add an app to your account][appstoreconnect_guide_register].

想要获取更多信息，可以看这个帮助页面 [添加 App 至您的帐户][appstoreconnect_guide_register_cn]。

## Review Xcode project settings

## 检查 Xcode 项目设置

This step covers reviewing the most important settings
in the Xcode workspace.
For detailed procedures and descriptions, see
[Prepare for app distribution][distributionguide_config].

在这一步，你需要在 Xcode 工作空间检查绝大多数重要设置。
关于更多的步骤和描述，查看 [为 App 分发做准备][distributionguide_config]。

Navigate to your target's settings in Xcode:

在 Xcode 中跳转到你的目标设置：

1. In Xcode, open `Runner.xcworkspace` in your app's `ios` folder.

   在 Xcode 中，打开你的 App 的 `ios` 目录中的 `Runner.xcworkspace`

1. To view your app's settings, select the **Runner** project in the Xcode
   project navigator. Then, in the main view sidebar, select the **Runner**
   target.

   想要看你的 app 设置，在 Xcode 的项目导航栏中选择 **Runner**

1. Select the **General** tab.

   选择 **General** tab

Verify the most important settings.

接下来，你需要验证最重要的配置：

In the **Identity** section:

在 **Identity** 部分：

`Display Name`
<br> The display name of your app.

`Display Name`
<br> The display name of your app.

`Display Name`
<br> 应用的名字。

`Bundle Identifier`
<br> The App ID you registered on App Store Connect.

`Bundle Identifier`
<br> 在 App Store Connect 注册的 App ID。

In the **Signing & Capabilities** section:

在 **Signing & Capabilities** 部分：

`Automatically manage signing`
<br> Whether Xcode should automatically manage app signing
  and provisioning.  This is set `true` by default, which should
  be sufficient for most apps. For more complex scenarios,
  see the [Code Signing Guide][codesigning_guide].

`Automatically manage signing`
<br> 是否需要 Xcode 自动管理 app 签名和设置。
这个默认被设置为 `true` ，对于绝大多数 App 来说都是适用的。
对于更复杂的场景，查看 [代码签名指南][codesigning_guide]。

`Team`
<br> Select the team associated with your registered Apple Developer
  account. If required, select **Add Account...**,
  then update this setting.

`Team`
<br> 选择关联到你注册的 Apple 开发者账户的团队。
如果需要，选择 **Add Account...**, 然后更新选项。

In the **Build Settings** section:

在 **Build Settings** 部分：

`iOS Deployment Target`
<br> The minimum iOS version that your app supports.
  Flutter supports iOS 9.0 and later. If your app or plugins
  include Objective-C or Swift code that makes use of APIs newer
  than iOS 9, update this setting to the highest required version.

`iOS Deployment Target`
<br> 设定你的应用可以支持到的最低的 iOS 版本。
Flutter 支持 iOS 9.0 及其之后的版本，如果你的应用包含了 iOS 9 不支持的
Objective-C 或 Swift 代码，请将这里一并设置为相应所需的最高版本。

The **General** tab of your project settings should resemble
the following:

你项目的 **General** tab 应该看起来像是这样的：

![Xcode Project Settings](/assets/images/docs/releaseguide/xcode_settings.png){:width="100%"}

For a detailed overview of app signing, see
[Create, export, and delete signing certificates][appsigning].

更多关于 App 签名新的介绍，查看文档
[创建, 导出, 和删除签名证书][appsigning]。

## Updating the app's deployment version

## 更新应用的开发版本

If you changed `Deployment Target` in your Xcode project,
open `ios/Flutter/AppframeworkInfo.plist` in your Flutter app
and update the `MinimumOSVersion` value to match.

如果你在 Xcode 工程里更改了 `Deployment Target`，
你需要打开 Flutter app 的 `ios/Flutter/AppframeworkInfo.plist`
文件并修改 `MinimumOSVersion` 值与之匹配。

## Updating the app's version number

## 更新应用版本号

The default version number of the app is `1.0.0`.
To update it, navigate to the `pubspec.yaml` file
and update the following line:

每个应用默认的初始版本号是 `1.0.0`。若要更新它，
请转到 `pubspec.yaml` 文件并更新以下内容：

`version: 1.0.0+1`

The version number is three numbers separated by dots,
such as `1.0.0` in the example above, followed by an optional
build number such as `1` in the example above, separated by a `+`.

版本号由三个点分隔的数字组成，例如上面样例中的 `1.0.0`。然后是可选的
构建号，例如上面样例中的 `1`，以 `+` 分隔。

Both the version and the build number may be overridden in Flutter's
build by specifying `--build-name` and `--build-number`,
respectively.

版本号与构建号都可以在 Flutter 打包时分别使用
`--build-name` 和 `--build-number` 重新指定。

In iOS, `build-name` uses `CFBundleShortVersionString`
while `build-number` uses `CFBundleVersion`.
Read more about iOS versioning at [Core Foundation Keys][]
on the Apple Developer's site.

在 iOS 中，当 `build-number` 用作 `CFBundleVersion` 的时候，
`build-name` 用作 `CFBundleShortVersionString`。
阅读关于 iOS 版本控制的更多信息请参考
Apple 开发者网站提供的 [Core Foundation Keys][]。

## Add an app icon

## 添加应用图标

When a new Flutter app is created, a placeholder icon set is created.
This step covers replacing these placeholder icons with your
app's icons:

当你创建一个新的 Flutter 应用时，则会创建一个默认的图标。
在这一步，你将使用你自己的图标替换占位图标：

1. Review the [iOS App Icon][appicon] guidelines.

   回顾 [iOS 的 App Icon][appicon] 指南。

1. In the Xcode project navigator, select `Assets.xcassets` in the
   `Runner` folder. Update the placeholder icons with your own app icons.

   在 Xcode 项目导航栏，选择 `Runner` 目录中的 `Assets.xcassets`，
   更新占位图标为你自己的 app 的图标。

1. Verify the icon has been replaced by running your app using
   `flutter run`.

   通过执行 `flutter run` 来验证你的图标是否已经被替换。

## Create a build archive with Xcode

## 创建一个构建归档 (build archive)

This step covers creating a build archive and uploading
your build to App Store Connect.

在这一步，你将创建一个构建归档，并上传到 App Store Connect。

During development, you've been building, debugging, and testing
with _debug_ builds. When you're ready to ship your app to users
on the App Store or TestFlight, you need to prepare a _release_ build.
At this point, you might consider [obfuscating your Dart code][]
to make it more difficult to reverse engineer. Obfuscating
your code involves adding a couple flags to your build command.

在开发过程中，你将会使用 **debug** 模式来完成构建、调试并测试。
当你准备好通过 App Store 或 TestFlight 交付你的 app 给用户时，
你需要准备一个 **release** 构建。
这时你也许想要 [混淆你的 Dart 代码][obfuscating your Dart code]
以加大反编译难度。混淆你的代码需要在 build 的时候添加一些标志，
并维护其他文件以消除反编译的堆栈跟踪。

In Xcode, configure the app version and build:

在 Xcode中，配置 app 的版本，并开始构建：

1. In Xcode, open `Runner.xcworkspace` in your app's `ios` folder.

   在 Xcode 中，打开你应用 `ios` 目录中的 `Runner.xcworkspace`

1. Select **Runner** in the Xcode project navigator, then select the
   **Runner** target in the settings view sidebar.

   在 Xcode 项目导航栏中选择 **Runner**，
   然后在设置界面侧边栏选择 **Runner** 目标。

1. In the Identity section, update the **Version** to the user-facing
   version number you wish to publish.

   在 Identity 部分，更新 **Version** 为你想要发布的用户可见的版本号。

1. In the Identity section, update the **Build** identifier to a unique
   build number used to track this build on App Store Connect.
   Each upload requires a unique build number.

   在 Identity 部分，更新 **Build** 标示为一个唯一的 Build 数字，
   用来在 App Store Connect 上追踪，每一个上传都需要一个独立的 Build 数字。

Finally, create a build archive and upload it to App Store Connect:

最后，创建一个构建归档并将其上传到 App Store Connect：

<ol markdown="1">
<li markdown="1">

Run `flutter build ipa` to produce a build archive.

运行 `flutter build ipa` 来生成一个构建归档

{{site.alert.note}}

  On versions of Flutter where `flutter build ipa`
  is unavailable, open Xcode and select **Product > Archive**.
  In the sidebar of the Xcode Organizer window, select your iOS app,
  then select the build archive you just produced.

  在无法使用命令 `flutter build ipa` 的 Flutter 版本里，
  打开 Xcode 并选择 **Product > Archive**，在 Xcode Organizer 窗口的侧栏，
  选择你的 iOS 应用，然后选择你刚生成的构建文档。
  
{{site.alert.end}}

</li>
<li markdown="1">

Open `build/ios/archive/MyApp.xcarchive` in Xcode.

在 Xcode 中打开 `build/ios/archive/MyApp.xcarchive`。

</li>
<li markdown="1">

Click the **Validate App** button. If any issues are reported,
address them and produce another build. You can reuse the same
build ID until you upload an archive.

点击 **Validate...** 按钮。如果报告了任何问题，记录下他们并重新开始一个新的构建。
在你上传一个归档前，可以一直使用同一个 Build ID。

</li>
<li markdown="1">

After the archive has been successfully validated, click
**Distribute App**. You can follow the status of your build in the
Activities tab of your app's details page on
[App Store Connect][appstoreconnect_login].

当这个归档校验成功以后，点击 **Upload to App Store...**。你可以在
[App Store Connect][appstoreconnect_login] 中应用详情页面的 Activities 标签页查看你的构建状态。

{{site.alert.note}}

  When you export your app at the end of **Distribute App**,
  Xcode will create a directory containing
  an IPA of your app and an `ExportOptions.plist` file.
  You can create new IPAs with the same options without launching
  Xcode by running
  `flutter build ipa --export-options-plist=path/to/ExportOptions.plist`.
  See `xcodebuild -h` for details about the keys in this property list.

  当你最后在 **Distribute App** 导出应用时，Xcode 将会创建一个含有你的应用 IPA 
  以及 `ExportOptions.plist` 文件的文件夹。
  你可以无需启动 Xcode，通过运命令
  `flutter build ipa --export-options-plist=path/to/ExportOptions.plist` 
  就可以创建新的 IPA。运行 `xcodebuild -h` 以查看该属性列表中 key 的详细信息。

{{site.alert.end}}

</li>
</ol>

You should receive an email within 30 minutes notifying you that
your build has been validated and is available to release to testers
on TestFlight. At this point you can choose whether to release
on TestFlight, or go ahead and release your app to the App Store.

当你的构建已经通过了校验，可以将你的构建通过 TestFlight
发布给你的测试人员或直接将其发布到 App Store 的时候，
你会在 30 分钟内收到一封信来提醒你。

For more details, see
[Upload an app to App Store Connect][distributionguide_upload].

更多信息可以查看
[上传一个 App 到 App Store Connect (Upload an app to App Store Connect)][distributionguide_upload]

## Create a build archive with Codemagic CLI tools

## 使用 Codemagic 命令行工具创建一个构建归档

This step covers creating a build archive and uploading
your build to App Store Connect using Flutter build commands
and [Codemagic CLI Tools][codemagic_cli_tools] executed in a terminal
in the Flutter project directory. This allows you to create a build archive
with full control of distribution certificates in a temporary keychain 
isolated from your login keychain.

该步骤包含了在 Flutter 项目的目录下，
通过终端使用 Flutter 构建命令和 [Codemagic 命令行工具][codemagic_cli_tools]，
构建归档并上传至 App Store 的教程。
该操作可以让你完全控制分发证书和临时钥匙串，将它们与登录的进行隔离。

<ol markdown="1">
<li markdown="1">

Install the Codemagic CLI tools:

安装 Codemagic 命令行工具：

```bash
pip3 install codemagic-cli-tools
```

</li>
<li markdown="1">

You'll need to generate an [App Store Connect API Key][appstoreconnect_api_key]
with App Manager access to automate operations with App Store Connect. To make
subsequent commands more concise, set the following environment variables from
the new key: issuer id, key id, and API key file.

你需要使用包含 App 管理权限的 App Store Connect 账号，生成一个
[App Store Connect API Key][appstoreconnect_api_key]。
为了使后续的命令更加简洁，你可以在环境变量中配置这些内容：
issuer id、key id 以及 API key 文件。

```bash
export APP_STORE_CONNECT_ISSUER_ID=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
export APP_STORE_CONNECT_KEY_IDENTIFIER=ABC1234567
export APP_STORE_CONNECT_PRIVATE_KEY=`cat /path/to/api/key/AuthKey_XXXYYYZZZ.p8`
```

</li>
<li markdown="1">

You need to export or create an iOS Distribution certificate to code sign and package a build archive.

你需要导出或者创建一个 iOS 分发证书，用来签名及归档构建。

If you have existing [certificates][devportal_certificates], you can export the
private keys by executing the following command for each certificate:

如果你已经有可用的 [证书][devportal_certificates]，你可以使用以下命令导出私钥：

```bash
openssl pkcs12 -in <certificate_name>.p12 -nodes -nocerts | openssl rsa -out cert_key
```

Or you can create a new private key by executing the following command:

你也可以使用以下命令创建新的私钥：

```bash
ssh-keygen -t rsa -b 2048 -m PEM -f cert_key -q -N ""
```

Later, you can have CLI tools automatically create a new iOS Distribution from the private key.

之后你便可以用命令行工具基于这个私钥创建新的 iOS 分发构建了。

</li>
<li markdown="1">

Set up a new temporary keychain to be used for code signing:

配置一个用于签名的临时钥匙串：

```bash
keychain initialize
```

{{site.alert.secondary}}

**Restore Login Keychain!**
After running `keychain initialize` you **must** run the following:<br>

**记得重置用于登录的钥匙串！**
执行完 `keychain initialize` 后，**必须** 执行以下命令：<br>

`keychain use-login`

This sets your login keychain as the default to avoid potential
authentication issues with apps on your machine.

该命令会将登录的钥匙串设为默认，以避免一些设备上潜在的认证问题。

{{site.alert.end}}

</li>
<li markdown="1">

Fetch the code signing files from App Store Connect:

从 App Store Connect 上获取签名文件：

```bash
app-store-connect fetch-signing-files $(xcode-project detect-bundle-id) \
    --platform IOS \
    --type IOS_APP_STORE \
    --certificate-key=@file:/path/to/cert_key \
    --create
```

Where `cert_key` is either your exported iOS Distribution certificate private key
or a new private key which automatically generates a new certificate. The certificate
will be created from the private key if it doesn't exist in App Store Connect.

其中，`cert_key` 是你导出的 iOS 分发证书的私钥，或者是自动生成新证书的新私钥。
如果 App Store Connect 中不存在这个证书，将会通过私钥创建。

</li>
<li markdown="1">

Now add the fetched certificates to your keychain:

将获取到的证书添加到你的钥匙串中：

```bash
keychain add-certificates
```

</li>
<li markdown="1">

Update the Xcode project settings to use fetched code signing profiles:

更新 Xcode 项目设定，使用获取到的签名配置：

```bash
xcode-project use-profiles
```

</li>
<li markdown="1">

Install Flutter dependencies:

获取 Flutter 依赖：

```bash
flutter packages pub get
```

</li>
<li markdown="1">

Install CocoaPods dependencies:

获取 CocoaPods 依赖：

```bash
find . -name "Podfile" -execdir pod install \;
```

</li>
<li markdown="1">

Build the Flutter the iOS project:

构建 Flutter 的 iOS 项目：

```bash
flutter build ipa --release \
    --export-options-plist=$HOME/export_options.plist
```

Note that `export_options.plist` is the output of the `xcode-project use-profiles` command.

注意 `export_options.plist` 路径来源于 `xcode-project use-profiles` 命令的输出。

</li>
<li markdown="1">

Publish the app to App Store Connect:

将应用发布到 App Store Connect：

```bash
app-store-connect publish \
    --path $(find $(pwd) -name "*.ipa")
```

</li>
<li markdown="1">

As mentioned earlier, don't forget to set your login keychain
as the default to avoid authentication issues
with apps on your machine:

如前文所示，记得将你的登录钥匙串设置为默认，
避免设备出现认证问题：

```bash
keychain use-login
```

</li>
</ol>

You should receive an email within 30 minutes notifying you that
your build has been validated and is available to release to testers
on TestFlight. At this point you can choose whether to release
on TestFlight, or go ahead and release your app to the App Store.

在 30 分钟内，你会收到一封邮件，提醒你构建已验证，可以在 TestFlight 上发布。
这时你可以选择在 TestFlight 上发布，或是直接在 App Store 上发布。

## Release your app on TestFlight

## 在 TestFlight 发布你的应用

[TestFlight][] allows developers to push their apps
to internal and external testers. This optional step
covers releasing your build on TestFlight.

1. Navigate to the TestFlight tab of your app's application
   details page on [App Store Connect][appstoreconnect_login].

   在 [App Store Connect][appstoreconnect_login]中，
   你的应用的详情页面跳转到 TestFlight Tab。

1. Select **Internal Testing** in the sidebar.

   在侧边栏选择 **Internal Testing**。

1. Select the build to publish to testers, then click **Save**.

   选择要发布给测试人员的构建，然后点击 **保存**。

1. Add the email addresses of any internal testers.
   You can add additional internal users in the **Users and Roles**
   page of App Store Connect,
   available from the dropdown menu at the top of the page.

   为每一个内部测试人员添加邮件。你可以在 App Store Connect 的
   **用户与角色** 页面添加额外的内部用户，
   他们将会出现在页面顶部的下拉菜单中。

For more details, see [Distribute an app using TestFlight]
[distributionguide_testflight].

关于更多信息，请查看
[使用 TestFlight 分发应用 (Distribute an app using TestFlight
(iOS, tvOS, watchOS))][distributionguide_testflight]。

## Release your app to the App Store

## 在 App Store 发布你的应用

When you're ready to release your app to the world,
follow these steps to submit your app for review and
release to the App Store:

当你准备发布你的 app 到这个世界时，跟随下面的步骤，来提交你的 App 去审核，并将其发布到 App Store。

1. Select **Pricing and Availability** from the sidebar of your app's
   application details page on
   [App Store Connect][appstoreconnect_login] and complete the
   required information.

   从你的 app 在 [App Store Connect][appstoreconnect_login]
   的页面中的侧边栏中选择 **Pricing and Availability**，然后完善所有的必填信息。

1. Select the status from the sidebar. If this is the first
   release of this app, its status is
   **1.0 Prepare for Submission**. Complete all required fields.

   从侧边栏选择状态。如果这是第一次发布这个 App，
   这个状态将会是 **1.0 Prepare for Submission**，填写所有需要填写的区域。

1. Click **Submit for Review**.

   点击 **提交审核**

Apple notifies you when their app review process is complete.
Your app is released according to the instructions you
specified in the **Version Release** section.

Apple 将会在他们的审核过程结束后提醒你。
你的 app 将会根据 **Version Release** 部分的介绍进行发布。

For more details, see
[Distribute an app through the App Store][distributionguide_submit].

关于更多细节，查看 [通过 App Store 分发一个 App][distributionguide_submit].

## Troubleshooting

## 故障排除

The [Distribute your app][distributionguide] guide provides a
detailed overview of the process of releasing an app to the App Store.

[分发你的应用][distributionguide] 指南，
提供了详细的发布应用到 App Store 过程的内容。


[appicon]: {{site.apple-dev}}/ios/human-interface-guidelines/icons-and-images/app-icon/
[appreview]: {{site.apple-dev}}/app-store/review/
[appsigning]: https://help.apple.com/xcode/mac/current/#/dev154b28f09
[appstore]: {{site.apple-dev}}/app-store/submissions/
[appstoreconnect]: {{site.apple-dev}}/support/app-store-connect/
[appstoreconnect_api_key]: https://appstoreconnect.apple.com/access/api
[appstoreconnect_guide]: {{site.apple-dev}}/support/app-store-connect/
[appstoreconnect_guide_register]: https://help.apple.com/app-store-connect/#/dev2cd126805
[appstoreconnect_login]: https://appstoreconnect.apple.com/
[codemagic_cli_tools]: {{site.github}}/codemagic-ci-cd/cli-tools
[codesigning_guide]: {{site.apple-dev}}/library/content/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html
[Core Foundation Keys]: {{site.apple-dev}}/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html
[devportal_appids]: {{site.apple-dev}}/account/ios/identifier/bundle
[devportal_certificates]: {{site.apple-dev}}/account/resources/certificates
[devprogram]: {{site.apple-dev}}/programs/
[devprogram_membership]: {{site.apple-dev}}/support/compare-memberships/
[distributionguide]: https://help.apple.com/xcode/mac/current/#/dev8b4250b57
[distributionguide_config]: https://help.apple.com/xcode/mac/current/#/dev91fe7130a
[distributionguide_submit]: https://help.apple.com/xcode/mac/current/#/dev067853c94
[distributionguide_testflight]: https://help.apple.com/xcode/mac/current/#/dev2539d985f
[distributionguide_upload]: https://help.apple.com/xcode/mac/current/#/dev442d7f2ca
[obfuscating your Dart code]: {{site.url}}/deployment/obfuscate
[TestFlight]: {{site.apple-dev}}/testflight/

[appreview_cn]: https://developer.apple.com/cn/app-store/review/
[appstore_cn]: https://developer.apple.com/cn/app-store/submissions/
[devprogram_cn]: https://developer.apple.com/cn/programs/
[devprogram_membership_cn]: https://developer.apple.com/cn/support/compare-memberships/
[appstoreconnect_cn]: https://developer.apple.com/cn/support/app-store-connect/
[appstoreconnect_guide_cn]: https://developer.apple.com/cn/support/app-store-connect/
[appstoreconnect_guide_register_cn]: https://help.apple.com/app-store-connect/?lang=zh-cn/dev2cd126805
[testflight_cn]: https://developer.apple.com/cn/testflight/
