---
title: Build and release a Windows desktop app
title: 构建和发布为 Windows 应用
description: How to release a Flutter app to the Microsoft Store.
description: 如何发布一个 Flutter 应用到 Microsoft Store。
short-title: windows
---

This guide provides a step-by-step walkthrough of releasing a
Flutter app to the [Microsoft Store][microsoftstore].

本指南提供了将 Flutter 应用发布到 [微软应用商店][microsoftstore] 的分步操作指南。

## Preliminaries

## 预先准备

Before beginning the process of releasing 
a Flutter Windows Desktop app, it is necessary
to confirm that it satisfies [Microsoft Store Policies][storepolicies].

在开始发布 Flutter Windows 桌面应用程序之前，
有必要确认其满足 [微软应用商店政策][storepolicies]。

Joining the [Microsoft Partner Network][microsoftpartner] is also required.

加入 [微软合作伙伴网络][microsoftpartner] 也是必要的。

## Set up your application in the Partner Center
## 在合作伙伴中心申请应用

Manage an application's life cycle in the [Microsoft Partner Center][microsoftpartner].

在 [微软合作伙伴中心][microsoftpartner] 中管理一个应用程序的生命周期。

First off, it is necessary to reserve the application name and ensure that the 
required rights to the name exist. Once the name is reserved, the application 
will be provisioned for services such as push notifications, and it is possible
to start adding add-ons.

首先，有必要预约应用名称，并且确定有使用这个名字的权利。
一旦名称确定可用，则该应用程序将可以提供推送通知等服务，并且可以开始添加扩展功能。

Options such as pricing, availability, age ratings, and category have to be 
configured together with the first submission and are automatically retained 
for the subsequent submissions.

比如价格、可用性、年龄等级和类别等选项必须在第一次提交时一并配置，这些选项在后续提交时将自动保留。

## Packaging and deployment
## 打包并部署

In order to publish an application to Microsoft Store,
it first has to be packaged. The valid formats are **.msix**, **.msixbundle**,
**.msixupload**, **.appx**, **.appxbundle**, **.appxupload**, and **.xap**.

为了将一个应用程序发布到微软商店，它首先必须被打包。
有效的格式是 **.msix**，**.msixbundle**，**.msixupload**，**.appx**，
**.appxbundle**，**.appxupload**，和 **.xap**。

### Manual packaging and deployment
### 手动打包和部署

Check out [MSIX packaging][msix packaging] to learn about packaging 
Flutter Windows Desktop applications.

查看 [MSIX 打包][msix packaging]，学习如何打包  Flutter Windows 桌面应用程序。

Note that each product has a unique identity, which the Store assigns.

请注意，每个产品都有一个唯一的 ID，这是应用商店分配的。

If the package is being built manually, it is necessary to include its 
identity details manually during the packaging. The essential information
can be retrieved from the Partner Center:

如果应用包是手动构建的，在打包过程中必须手动包括其 ID 详情。
基本信息可以从合作伙伴中心检索到。

1. Navigate to the application in the Partner Center.

   在合作伙伴中心中，导航到应用程序。

2. Select **Product management**.

   选择 **Product management**。

3. Retrieve the package identity name, publisher, 
and publisher display name by clicking on **Product identity**.

   点击 **Product identity**，检查应用包的 ID，发布者，发布者的显示名称。

After manually packaging the application, it will also have to be 
manually submitted to the [Microsoft Partner Center][microsoftpartner].
This can be done by creating a new submission, navigating to **Packages**, 
and uploading the created application package.

在手动打包应用程序后，还需要手动提交应用程序包到 [微软合作伙伴中心][microsoftpartner]。
这个步骤可以通过创建新的提交来完成，导航到 **Packages**，并上传创建的应用程序包。

### Continuous deployment
### 持续部署

In addition to manually creating and deploying the package, 
it is possible to automate the build, package, versioning, 
and deployment process using CI/CD tooling after having submitted
the application to the Microsoft Store for the first time.

除了手动创建和部署软件包外，在第一次提交应用程序到微软商店后，
还可以使用 持续集成/持续交付 工具自动化构建，打包，版本管理，和部署应用程序。

#### Codemagic CI/CD

#### Codemagic 持续集成/持续交付

[Codemagic CI/CD][codemagic] uses the [`msix` pub package][msix package] to package 
Flutter Windows Desktop applications. 

[Codemagic 持续集成/持续交付][codemagic] 使用 [`msix` pub package][msix package]
来打包 Flutter Windows 桌面应用程序。

For Flutter applications, either the [Codemagic Workflow Editor][cmworkfloweditor] or [codemagic.yaml][cmyaml] 
can be used to package the application and deploy to Microsoft Partner Center.
Additional options (such as the list of capabilites and language resources 
contained in the package) can be configured using the aforementioned package.

对于 Flutter 应用程序，无论是 [Codemagic Workflow Editor][cmworkfloweditor] 还是 [codemagic.yaml][cmyaml]
都可以用来打包应用程序并部署到微软合作伙伴中心。
其他选项（如软件包中包含的功能列表和语言资源）可以使用上述的软件包进行配置。

For publishing, Codemagic uses the [Partner Center submission API][partnercenterapi]; thus,
Codemagic requires [associating the Azure Active Directory and Partner Center accounts][azureadassociation].

对于发布应用来说，Codemagic 使用 [合作伙伴中心提交API][partnercenterapi]；因此，Codemagic 需要 [关联 Azure Active Directory 和合作伙伴中心账户][azureadassociation]。

## Updating the app's version number
## 更新应用程序的版本号

With Flutter Windows Desktop, the version number must be set during the 
packaging process and can not be set via the `pubspec.yaml` 
or command line arguments. 

对于 Flutter Windows 桌面版来说，版本号必须在打包过程中设置，
不能通过 `pubspec.yaml` 或命令行参数设置。

The default version number of the app is `1.0.0.0`.

默认的应用版本号为 `1.0.0.0`。

Note that applications are not allowed to have a Version with a revision number
other than zero. Thus, the last number of the version must remain zero for all
releases. Take note to follow Microsoft's [versioning guidelines][windowspackageversioning].

请注意，应用程序不允许有一个修订版本号（第四段）不为零的版本。
因此，在所有的版本中，版本的最后一个数字必须保持为零。请注意遵循微软的 [版本指南][windowspackageversioning]。

## Add app icons
## 添加应用图标

To update the icon of a Flutter Windows Desktop application before packaging:

在打包前更新 Flutter Windows 桌面应用程序的图标：

1. Navigate to **windows\runner\resources** in the Flutter project.

   导航到 Flutter 项目中的 **windows\runner\resources** 目录。

2. Replace the **app_icon.ico** with the wanted icon.

   替换 **app_icon.ico** 为想要的图标。

3. If the name of the icon is other than **app_icon.ico**, proceed to
change the **IDI_APP_ICON** value in the **windows\runner\Runner.rc** file to
point to the new path.

   如果图标文件的名称不是 **app_icon.ico**，
   请将 **windows\runner\Runner.rc** 文件中的 **IDI_APP_ICON** 值指向新的路径。

When packaging with the [`msix` pub package][msix package], the logo path can
also be configured inside the `pubspec.yaml` file.

在使用 [`msix` pub package][msix package] 打包时，
可以在 `pubspec.yaml` 文件中配置 logo 路径。

To update the application image in the Store listing, navigate to 
the Store listing step of the submission and select Store logos. 
There it is possible to upload the logo with the size of 300 x 300 pixels.

要更新商店列表中的应用程序图标，请导航到提交的商店列表并选择商店 logo。
在那里可以上传尺寸为 300 x 300 像素的图片。

All uploaded images are retained for subsequent submissions.

所有上传的图片将被保留，以便于以后提交使用。

## Validating the application package
## 验证应用程序包

Before publication to the Microsoft Store, validating the application
package locally first is recommended. 

在发布到微软商店之前，建议先在本地验证应用程序包。

[Windows App Certification Kit][windowsappcertification] is a tool that is 
included in the Windows Software Development Kit (SDK).

[Windows应用认证工具包][windowsappcertification] 是一个包含在 Windows 软件开发工具包（SDK）中的工具。

To validate the application:

验证应用程序：

1. Launch Windows App Cert Kit.

   启动 Windows 应用认证工具包。

2. Select the Flutter Windows Desktop package (**.msix**, **.msixbundle** etc).

   选择 Flutter Windows 桌面应用程序包（**.msix**，**.msixbundle** 等）。

3. Choose a destination for the test report.

   选择测试报告的输出目录。

The report may contain important warnings and information, 
even if the certification passes. 

即使认证通过，报告也可能包含重要警告和信息。

[azureadassociation]: https://docs.microsoft.com/en-us/windows/uwp/publish/associate-azure-ad-with-partner-center
[cmworkfloweditor]: https://docs.codemagic.io/flutter-publishing/publishing-to-microsoft-store/
[cmyaml]: https://docs.codemagic.io/yaml-publishing/microsoft-store/
[codemagic]: https://codemagic.io/start/
[microsoftstore]: https://www.microsoft.com/en-us/store/apps/windows/
[microsoftpartner]: https://partner.microsoft.com/en-GB/
[msix package]: {{site.pub}}/packages/msix
[msix packaging]: {{site.url}}/desktop#msix-packaging
[partnercenterapi]: https://docs.microsoft.com/en-us/azure/marketplace/azure-app-apis
[storepolicies]: https://docs.microsoft.com/en-us/windows/uwp/publish/store-policies/
[visualstudiopackaging]: https://docs.microsoft.com/en-us/windows/msix/package/packaging-uwp-apps
[visualstudiosubmission]: https://docs.microsoft.com/en-us/windows/msix/package/packaging-uwp-apps#automate-store-submissions
[windowspackageversioning]: https://docs.microsoft.com/en-us/windows/uwp/publish/package-version-numbering
[windowsappcertification]: https://docs.microsoft.com/en-us/windows/uwp/debug-test-perf/windows-app-certification-kit