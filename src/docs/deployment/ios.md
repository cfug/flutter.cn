---
title: Preparing an iOS App for Release
title: 打包和发布到 iOS 平台
short-title: iOS
short-title: iOS
---
	
This guide provides a step-by-step walkthrough of releasing a Flutter app to
the [App Store][appstore] and [TestFlight][testflight].

这个教程将为你提供关于如何将 Flutter App 发布到 [App Store][appstore_cn] 和 [TestFlight][testflight_cn] 的说明。

For information on obfuscating Dart code, see [Obfuscating Dart
Code][].

关于混淆 Dart 代码的更多信息，你可以看 [混淆 Dart 代码][Obfuscating Dart Code]

## Preliminaries

## 预先准备

Before beginning the process of releasing your app, ensure that it meets
Apple's [App Review Guidelines][appreview].

在开始发布你的 app 的进程之前，确保你已经看过了 Apple 的 [App Store 审核指南][appreview_cn]。

In order to publish your app to the App Store, you'll need to enroll in the
[Apple Developer Program][devprogram]. You can read more about the various
membership options in Apple's
[Choosing a Membership][devprogram_membership] guide.

想要发布你的 app 到 App Store，你需要注册 [Apple Developer Program][devprogram_cn]。你可以在苹果的 [选择会员资格(开发者类型)][devprogram_membership_cn] 中查看到关于多种不同会员类型的选择。

## Register your app on App Store Connect

## 在 App Store Connect 上注册你的 App

[App Store Connect][appstoreconnect] (formerly iTunes Connect) is where you'll
manage your app's life cycle. You will define your app name and description,
add screenshots, set pricing, and manage releases to the App Store
and TestFlight.

[App Store Connect][appstoreconnect_cn]（曾经的 iTunes Connet）是你将会管理应用生命周期的地方。
你将会定义应用的名称和描述以及截图，设置价格，并管理发布到 App Store 和 Testflight。

Registering your app involves two steps: registering a unique Bundle ID, and
creating an application record on App Store Connect.

注册你的 app 需要两步：登记唯一的套装 ID（Bundle ID），并在你的 App Store Connect 中创建一个 app。

For a detailed overview of App Store Connect, see the [App Store Connect][appstoreconnect_guide]
guide.

关于更多 App Store Connect 的细节，查看 [App Store Connect][appstoreconnect_guide_cn] 指南。

### Register a Bundle ID

### 登记套装 ID 

Every iOS application is associated with a Bundle ID, a unique identifier
registered with Apple. To register a Bundle ID for your app, follow these
steps:

每一个 iOS 应用都与一个在 Apple 登记的唯一的套装 ID 关联。
要为你的应用登记一个套装 ID，请参考下面的步骤：

1. Open the [App IDs][devportal_appids] page of your developer account.

   在你的开发者账号页面打开 [App IDs][devportal_appids] 页面。

1. Click **+** to create a new Bundle ID.

   点击 **+** 来创建一个新的套装 ID。

1. Enter an app name, select **Explicit App ID**, and enter an ID.  

   输入一个 App 名称，选择 **Explicit App ID**，然后输入一个 ID。

1. Select the services your app will use, then click **Continue**. 
    
   选择你的 App 将要使用的服务，然后点击 **继续**

1. On the next page, confirm the details and click **Register** to register
   your Bundle ID.  
   
   在下一页，确认细节并点击 **注册** 来注册你的 Bundle ID。

### Create an application record on App Store Connect

### 在 App Store Connect 创建一个应用记录

Next, you'll register your app on App Store Connect:

接下来，你需要在 App Store Connect 注册你的应用：

1. Open [App Store Connect][appstoreconnect_login] in your browser.  
    
   在你的浏览器里打开 [App Store Connect][appstoreconnect_login]。
    
1. On the App Store Connect landing page, click **My Apps**. 

   在 App Store Connect 的落地页，点击 **My Apps**。

1. Click **+** in the top-left corner of the My Apps page, then select
   **New App**.  
   
   在我的 app 页面的顶部左侧 ，点击 **+** ，然后选择 **New App**。

1. Fill in your app details in the form that appears. In the Platforms section,
   ensure that iOS is checked. Since Flutter does not currently support tvOS,
   leave that checkbox unchecked. Click **Create**. 
   
   在出现的表单中填写你的 app 细节。在平台部分，确保 iOS 被选中。
   由于 Flutter 暂时不支持 tvOS，保持该选项为未选。点击 **Create**。
   
1. Navigate to the application details for your app and select **App
   Information** from the sidebar.  
   
   跳转到你的应用详情，然后从侧边栏选择 **App Information** 。
   
1. In the General Information section, select the Bundle ID you registered in
   the preceding step. 
   
   在基础信息部分，选择你在前一步注册的套装 ID。

For a detailed overview,
see [Add an app to your account][appstoreconnect_guide_register].

想要获取更多信息，可以看这个帮助页面 [添加 App 至您的帐户][appstoreconnect_guide_register_cn]。

## Review Xcode project settings

## 检查 Xcode 项目设置

In this step, you'll review the most important settings in the Xcode workspace.
For detailed procedures and descriptions, see [Prepare for app distribution]
[distributionguide_config].

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

Next, you'll verify the most important settings.

接下来，你需要验证最重要的配置：

In the **Identity** section:

在 **Identity** 部分：

`Display Name` 
:the name of the app to be displayed on the home screen and elsewhere.
    
 这个 App 将会在主屏幕以及其他地方展示的名字。
    
`Bundle Identifier:` the App ID you registered on App Store Connect.
    
 你在 App Store Connect 注册的 App ID。

In the **Signing** section:

在 Signing 部分：

`Automatically manage signing` 
: whether Xcode should automatically manage 
app signing and provisioning. This is set `true` by default, which should be sufficient for most apps. For more complex scenarios, see the [Code Signing Guide][codesigning_guide].

`Automatically manage signing` 是否需要 Xcode 自动管理 app 签名和设置。
这个默认被设置为 `true` ，对于绝大多数 App 来说都是适用的。对于更复杂的场景，查看 [代码签名指南][codesigning_guide]。
    
`Team:` select the team associated with your registered Apple Developer account. If required, select **Add Account...**, then update this setting.
    
`Team`：选择关联到你注册的 Apple 开发者账户的团队。如果需要，选择 **Add Account...**, 然后更新选项。

In the **Deployment Info** section:

在 Development 部分：

`Deployment Target:`
: The minimum iOS version that your app will support.
  Flutter supports iOS 8.0 and later. If your app includes
  Objective-C or Swift code that makes use of APIs that
  were unavailable in iOS 8, update this setting appropriately.

`Deployment Target:` 你的 App 将会支持的最低版本的 iOS。
    Flutter 支持 iOS 8.0 及以后的版本。
    如果你的 App 包含使用了iOS 8 不支持的 API 的 Objective-C 或 Swift 代码，请设置到合适的版本。

The **General** tab of your project settings should resemble
the following:

你项目的 General tab 应该看起来像是这样的：

![Xcode Project Settings](/images/releaseguide/xcode_settings.png){:width="100%"}

For a detailed overview of app signing, see
[Create, export, and delete signing certificates][appsigning].

更多关于 App 签名新的介绍，查看 [创建, 导出, 和删除签名证书][appsigning]

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

版本号与构建号都可以在 Flutter 打包时分别使用 `--build-name` 和 `--build-number` 重新指定。

In iOS, `build-name` uses `CFBundleShortVersionString`
while `build-number` uses `CFBundleVersion`.
Read more about iOS versioning at [Core Foundation Keys][]
on the Apple Developer's site.

在 iOS 中，当 `build-number` 用作 `CFBundleVersion` 的时候，
`build-name` 用作 `CFBundleShortVersionString`。
阅读关于 iOS 版本控制的更多信息请参考 Apple 开发者网站提供的 [Core Foundation Keys][]。

## Add an App Icon

## 添加应用图标

When a new Flutter app is created, a placeholder icon set is created. In this
step, you'll replace these placeholder icons with your app's icons:

当你创建一个新的 Flutter 应用时，则会创建一个默认的图标。
在这一步，你将使用你自己的图标替换占位图标：

1. Review the [iOS App Icon][appicon] guidelines. 

   回顾 [iOS 的 App Icon][appicon] 指南。

1. In the Xcode project navigator, select `Assets.xcassets` in the `Runner`
   folder. Update the placeholder icons with your own app icons. 
   
   在 Xcode 项目导航栏，选择 `Runner` 目录中的 `Assets.xcassets`，
   更新占位图标为你自己的 app 的图标。
   
1. Verify the icon has been replaced by running your app using `flutter run`. 
   
   通过执行 `flutter run` 来验证你的图标是否已经被替换。

## Create a build archive

## 创建一个构建归档(build archive)

In this step, you'll create a build archive and upload your build to App Store
Connect.

在这一步，你将创建一个构建归档，并上传到 App Store Connect。

During development, you've been building, debugging, and testing with *debug*
builds. When you're ready to ship your app to users on the App Store or
TestFlight, you'll need to prepare a *release* build.

在开发过程中，你将会使用 *debug* 模式来完成构建、调试并测试。
当你准备好通过 App Store 或 TestFlight 交付你的 app 给用户时，你需要准备一个 *release* 构建。

On the command line, follow these steps in your application directory:

在命令行中你的应用目录下执行如下步骤：

1. Run `flutter build ios` to create a release build (`flutter build` defaults to `--release`).
   
   执行 `flutter build ios` 来创建一个 release 构建 (`flutter build` 默认指向 `--release`)。
   
1. To ensure that Xcode refreshes the release mode configuration, close and
   re-open your Xcode workspace. For Xcode 8.3 and later, this step is not
   required. 
   
   为了确保 Xcode 刷新了发布模式的配置，关闭并重新打开你的 Xcode。
   对于 Xcode 8.3 及以后版本，这一步不是必须的。

In Xcode, configure the app version and build:

在 Xcode中，配置 app 的版本，并开始构建：

1. In Xcode, open `Runner.xcworkspace` in your app's `ios` folder. 

   在 Xcode 中，打开你应用 `ios` 目录中的 `Runner.xcworkspace`
   
1. Select **Product > Scheme > Runner**. 

   选择 **Product > Scheme > Runner**
   
1. Select **Product > Destination > Generic iOS Device**. 

   选择 **Product > Destination > Generic iOS Device**
   
1. Select **Runner** in the Xcode project navigator, then select the **Runner**
   target in the settings view sidebar.  
   
   在 Xcode 项目导航栏中选择 **Runner**，然后在设置界面侧边栏选择 **Runner** 目标。
   
1. In the Identity section, update the **Version** to the user-facing
   version number you wish to publish. 
   
   在 Identity 部分，更新 **Version** 为你想要发布的用户可见的版本号。
   
1. In the Identity section, update the **Build** identifier to a unique
   build number used to track this build on App Store Connect. Each upload requires a
   unique build number. 
   
   在 Identity 部分，更新 **Build** 标示为一个唯一的 Build 数字，用来在 App Store Connect 上追踪。
   每一个上传都需要一个独立的 Build 数字。

Finally, create a build archive and upload it to App Store Connect:

最后，创建一个构建归档并将其上传到 App Store Connect：

1. Select **Product > Archive** to produce a build archive. 

   选择 **Product > Archive** 来生成一个构建归档 
   
1. In the sidebar of the Xcode Organizer window, select your iOS app, then
   select the build archive you just produced. 
   
   在 Xcode 组织界面的侧边栏中，选择你的 iOS app，然后选择你刚刚的生成的构建归档。
   
1. Click the **Validate...** button. If any issues are reported, address them
   and produce another build. You can reuse the same build ID until you upload
   an archive. 
   
   点击 **Validate...** 按钮。如果报告了任何问题，记录下他们并重新开始一个新的构建。
   你可以使用同一个 Build ID 直到你上传了一个归档。
   
1. After the archive has been successfully validated, click **Upload to App
   Store...**. You can follow the status of your build in the Activities
   tab of your app's details page on [App Store Connect][appstoreconnect_login].  
   
   当这个归档校验成功以后，点击 **Upload to App Store...**。你可以在
   [App Store Connect][appstoreconnect_login] 中应用详情页面的 Activities 标签页查看你的构建状态。

You should receive an email within 30 minutes notifying you that your build has
been validated and is available to release to testers on TestFlight. At this
point you can choose whether to release on TestFlight, or go ahead and release
your app to the App Store.

当你的构建已经通过了校验，可以将你的构建通过 Testfligh
发布给你的测试人员或直接将其发布到 App Store 的时候，你会在 30 分钟内收到一封信来提醒你。

For more details, see [Upload an app to App Store Connect][distributionguide_upload].

更多信息可以查看
[上传一个 App 到 App Store Connect (Upload an app to App Store Connect)][distributionguide_upload]

## Release your app on TestFlight

## 发布你的 app 到 TestFlight

[TestFlight][testflight] allows developers to push their apps to internal and
external testers. In this optional step, you'll release your build on
TestFlight.

[TestFlight][testflight] 允许开发者发布他们的 app 给内部或外部的测试人员。
这个步骤为可选，接下来的内容将引导你将发布你的构建到 TestFlight。

1. Navigate to the TestFlight tab of your app's application details page on
   [App Store Connect][appstoreconnect_login]. 
   
   在 [App Store Connect][appstoreconnect_login]中，你的应用的详情页面跳转到 TestFlight Tab。
   
1. Select **Internal Testing** in the sidebar. 

   在侧边栏选择 **Internal Testing**。
   
1. Select the build to publish to testers, then click **Save**. 
   
   选择要发布给测试人员的构建，然后点击 **保存**。
   
1. Add the email addresses of any internal testers. You can add additional
   internal users in the **Users and Roles** page of App Store Connect, available from
   the dropdown menu at the top of the page. 
   
   为每一个内部测试人员添加邮件。你可以在 App Store Connect 的**用户与角色**页面添加额外的内部用户，
   他们将会出现在页面顶部的下拉菜单中。

For more details, see [Distribute an app using TestFlight]
[distributionguide_testflight].

关于更多信息，请查看
[使用 TestFlight 分发应用 (Distribute an app using TestFlight (iOS, tvOS, watchOS)
)][distributionguide_testflight]。

## Release your app to the App Store

## 发布你的 app 到 App Store

When you're ready to release your app to the world, follow these steps to
submit your app for review and release to the App Store:

当你准备发布你的 app 到这个世界时，跟随下面的步骤，来提交你的 App 去审核，并将其发布到 App Store。

1. Select **Pricing and Availability** from the sidebar of your app's
   application details page on [App Store Connect][appstoreconnect_login] and
   complete the required information.  
   
   从你的 app 在 [App Store Connect][appstoreconnect_login]
   的页面中的侧边栏中选择 **Pricing and Availability**，然后完善所有的必填信息。
   
1. Select the status from the sidebar. If this is the first release of this
   app, its status will be **1.0 Prepare for Submission**. Complete all
   required fields. 
   
   从侧边栏选择状态。如果这是第一次发布这个 App，
   这个状态将会是 **1.0 Prepare for Submission**，填写所有需要填写的区域。
   
1. Click **Submit for Review**. 

   点击 **提交审核**

Apple will notify you when their app review process is complete.
Your app will be released according to the instructions you
specified in the **Version Release** section.

Apple 将会在他们的审核过程结束后提醒你。
你的 app 将会根据 **Version Release** 部分的介绍进行发布。

For more details, see
[Distribute an app through the App Store][distributionguide_submit].

关于更多细节，查看 [通过 App Store 分发一个 App][distributionguide_submit].

Now that you’ve created your app, attract more users with Google Ads.
App campaigns use machine learning to drive more installs and make
the most of your budget.

当你创建了应用之后，你可以通过 Google Ads 吸引更多用户，
Google Ads 平台可以通过机器学习帮助你以非常高的性价比吸引到更多用户。

1. Create your ad&mdash;we’ll help create your ad from your app
   information

   创建广告&mdash;我们会根据您的应用信息帮您制作广告。
   另外，您还可以添加图片和视频。

1. Choose your budget&mdash;set your target cost-per-install
   (tCPI) and daily budget cap

   决定推广预算&mdash;对于以提高应用安装量为主要目标的广告系列，
   您需要为其设置应用安装出价，也就是“目标每次安装费用”，同时设置每日推广支出预算。

1. Select your location&mdash;let us know where you’d like your ads
   to run

   选择目标地区&mdash;让我们知道你希望触达哪些区域的用户。

1. Decide what action you want users to take&mdash;choose installs,
   in-app actions, or target return on ad spend (ROAS)

   设定用户行动&mdash;决定你希望用户要做什么，
   比如安装，应用内操作或者目标广告支出回报率 (ROAS)。

[Get $75 app advertising credit when you spend $25.][]

[获取 75 美元的赠金（当你消费 25 美金后）][Get $75 app advertising credit when you spend $25.]

## Troubleshooting

## 故障排除

The [Distribute your app][distributionguide] guide provides a detailed overview of
the process of releasing an app to the App Store.

[分发你的 app][distributionguide] 指南提供了一个详细的关于发布一个 App 到 App Store 过程的内容。

[appicon]: https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/app-icon/
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
[distributionguide_submit]: https://help.apple.com/xcode/mac/current/#/dev067853c94
[distributionguide_testflight]: https://help.apple.com/xcode/mac/current/#/dev2539d985f
[distributionguide_upload]: https://help.apple.com/xcode/mac/current/#/dev442d7f2ca
[Get $75 app advertising credit when you spend $25.]: https://ads.google.com/lp/appcampaigns/?modal_active=none&subid=ww-ww-et-aw-a-flutter1!o2#?modal_active=none
[Obfuscating Dart Code]: {{site.github}}/flutter/flutter/wiki/Obfuscating-Dart-Code
[testflight]: https://developer.apple.com/testflight/

[appreview_cn]: https://developer.apple.com/cn/app-store/review/
[appstore_cn]: https://developer.apple.com/cn/app-store/submissions/
[devprogram_cn]: https://developer.apple.com/cn/programs/
[devprogram_membership_cn]: https://developer.apple.com/cn/support/compare-memberships/
[appstoreconnect_cn]: https://developer.apple.com/cn/support/app-store-connect/
[appstoreconnect_guide_cn]: https://developer.apple.com/cn/support/app-store-connect/
[appstoreconnect_guide_register_cn]: https://help.apple.com/app-store-connect/?lang=zh-cn/dev2cd126805
[testflight_cn]: https://developer.apple.com/cn/testflight/
