---
# title: Build and release a Windows desktop app
title: 构建和发布为 Windows 应用
# description: How to release a Flutter app to the Microsoft Store.
description: 如何发布一个 Flutter 应用到 Microsoft Store。
shortTitle: windows
---

One convenient approach to distributing Windows apps
is the [Microsoft Store][microsoftstore].
This guide provides a step-by-step walkthrough
of packaging and deploying a Flutter app in this way.

发布 Windows 桌面应用程序的便捷方法是将其发布至
[微软应用商店][microsoftstore]，本指南提供了
将 Flutter 应用发布到 [微软应用商店][microsoftstore]
的分步操作指南。

:::note

You are not required to publish Windows apps through the
Microsoft Store, particularly if you prefer more control
over the distribution experience or don't want to deal
with the certification process. The Microsoft documentation
includes more information about traditional installation
approaches, including [Windows Installer][msidocs].

通过微软应用商店发布 Windows 桌面应用程序并非必选项，
尤其是当你希望掌握更多对发布体验方面的控制权，
亦或是你不想处理认证过程。
微软提供的文档包括了关于使用 [Windows Installer][msidocs]
进行传统安装的更多内容。

:::


## Preliminaries

## 预先准备

Before beginning the process of releasing
a Flutter Windows desktop app to the Microsoft Store,
first confirm that it satisfies [Microsoft Store Policies][storepolicies].

在开始发布 Flutter Windows 桌面应用程序之前，
有必要确认你的应用满足 [微软应用商店政策][storepolicies]。

Also, you must join the
[Microsoft Partner Network][microsoftpartner] to be able to submit apps.

提交应用前加入 [微软合作伙伴网络][microsoftpartner] 也是必要的。

## Set up your application in the Partner Center

## 在合作伙伴中心申请应用

Manage an application's life cycle in the
[Microsoft Partner Center][microsoftpartner].

在 [微软合作伙伴中心][microsoftpartner] 中管理一个应用程序的生命周期。

First, reserve the application name and
ensure that the required rights to the name exist.
Once the name is reserved, the application
will be provisioned for services (such as
push notifications), and you can start adding add-ons.

首先，有必要预约应用名称，并且确定有使用这个名称的权利。
一旦名称确定可用，则该应用程序将可以提供推送通知等服务，并且可以开始添加扩展功能。

Options such as pricing, availability,
age ratings, and category have to be
configured together with the first submission
and are automatically retained
for the subsequent submissions.

类似于价格、可用性、年龄等级和类别等选项必须在第一次提交时一并配置，
这些选项在后续提交时将自动保留。

## Packaging and deployment

## 打包并部署

In order to publish an application to Microsoft Store,
you must first package it.
The valid formats are **.msix**, **.msixbundle**,
**.msixupload**, **.appx**, **.appxbundle**,
**.appxupload**, and **.xap**.

应用程序发布到微软商店前必须要打包。
有效的格式是 **.msix**、**.msixbundle**、**.msixupload**、**.appx**、
**.appxbundle**、**.appxupload** 和 **.xap**。

### Manual packaging and deployment

### 手动打包和部署

Check out [MSIX packaging][msix packaging] to learn about packaging 
Flutter Windows Desktop applications.

查看 [MSIX 打包][msix packaging]，学习如何打包 Flutter Windows 桌面应用程序。

Note that each product has a unique identity, which the Store assigns.

请注意，每个产品都有一个唯一的 ID，这是应用商店分配的。

If the package is being built manually, it is necessary to include its 
identity details manually during the packaging. The essential information
can be retrieved from the Partner Center:

如果应用包是手动构建的，在打包过程中必须手动添加 ID 详情。
这些基本信息可以从合作伙伴中心检索到。

1. In the Partner Center, navigate to the application.

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
you can automate the build, package, versioning,
and deployment process using CI/CD tooling after having submitted
the application to the Microsoft Store for the first time.

除了手动创建和部署软件包外，在第一次提交应用程序到微软商店后，
还可以使用持续集成/持续部署 (CI/CD) 工具自动化构建、打包、版本管理、和部署应用程序。

#### Codemagic CI/CD

#### Codemagic 持续集成/持续部署 (CI/CD)

[Codemagic CI/CD][codemagic] uses the
[`msix` pub package][msix package] to package 
Flutter Windows Desktop applications. 

[Codemagic 持续集成/持续部署 (CI/CD)][codemagic]
使用 [Pub 上的 `msix` package][msix package]
来打包 Flutter Windows 桌面应用程序。

For Flutter applications, use either the
[Codemagic Workflow Editor][cmworkfloweditor]
or [codemagic.yaml][cmyaml]
to package the application and deploy it
to the Microsoft Partner Center.
Additional options (such as the list of
capabilities and language resources
contained in the package)
can be configured using this package.

对于 Flutter 应用程序，无论是 [Codemagic Workflow Editor][cmworkfloweditor] 还是 [codemagic.yaml][cmyaml]
都可以用来打包应用程序并部署到微软合作伙伴中心。
其他选项（如软件包中包含的功能列表和语言资源）可以使用上述的软件包进行配置。

For publishing, Codemagic uses the
[Partner Center submission API][partnercenterapi];
so, Codemagic requires
[associating the Azure Active Directory
and Partner Center accounts][azureadassociation].

对于发布应用来说，Codemagic 使用 [合作伙伴中心提交 API][partnercenterapi]；
因此，Codemagic 需要 [关联 Azure Active Directory 和合作伙伴中心账户][azureadassociation]。

#### GitHub Actions CI/CD

#### 使用 GitHub Actions CI/CD

GitHub Actions can use the
[Microsoft Dev Store CLI](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/overview)
to package applications into an MSIX and publish them to the Microsoft Store.
The [setup-msstore-cli](https://github.com/microsoft/setup-msstore-cli)
GitHub Action installs the cli so that the Action can use it for packaging
and publishing.

GitHub Actions 可以使用 
[Microsoft Dev Store CLI](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/overview) 
将应用程序打包为 MSIX 并将其发布到 Microsoft Store。
[setup-msstore-cli](https://github.com/microsoft/setup-msstore-cli)
GitHub Action 安装了 cli，这样 Action 就可以用它进行打包和发布。

As packaging the MSIX uses the
[`msix` pub package][msix package], the project's `pubspec.yaml`
must contain an appropriate `msix_config` node.

由于 MSIX 的打包使用 [`msix` pub package][msix package]，
所以项目的 `pubspec.yaml` 必须包含一个合适的 `msix_config` 节点。

You must create an Azure AD directory from the Dev Center with
[global administrator permission](https://azure.microsoft.com/documentation/articles/active-directory-assign-admin-roles/).

你必须从 Dev Center 创建一个具有
[全局管理员权限](https://azure.microsoft.com/documentation/articles/active-directory-assign-admin-roles/)
的 Azure AD 目录。

The GitHub Action requires environment secrets from the partner center.
`AZURE_AD_TENANT_ID`, `AZURE_AD_ClIENT_ID`, and `AZURE_AD_CLIENT_SECRET`
are visible on the Dev Center following the instructions for the
[Windows Store Publish Action](https://github.com/marketplace/actions/windows-store-publish#obtaining-your-credentials).
You also need the `SELLER_ID` secret, which can be found in the Dev Center
under **Account Settings** > **Organization Profile** > **Legal Info**.

GitHub Action 需要从合作伙伴中心获取环境秘钥。
`AZURE_AD_TENANT_ID`，`AZURE_AD_ClIENT_ID` 和 `AZURE_AD_CLIENT_SECRET`
在遵循 [Windows Store Publish Action](https://github.com/marketplace/actions/windows-store-publish#obtaining-your-credentials)
的说明后，可以在 Dev Center 上看到。
你还需要 `SELLER_ID` 秘钥，
可以在 Dev Center 的 **帐户设置** > **组织简介** > **法律信息** 下找到。

The application must already be present in the Microsoft Dev Center with at
least one complete submission, and `msstore init` must be run once within
the repository before the Action can be performed. Once complete, running
[`msstore package .`](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/package-command)
and
[`msstore publish`](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/publish-command)
in a GitHub Action packages the
application into an MSIX and uploads it to a new submission on the dev center.

应用程序必须已经在 Microsoft Dev Center 上有至少一个完整的提交，
且必须在仓库中运行一次 `msstore init`，Action 才能执行。
完成后，在 GitHub Action 中运行 [`msstore package`](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/package-command)
和 [`msstore publish`](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/publish-command)
将应用程序打包为 MSIX 并将其上传到 dev center 的一个新提交上。

The steps necessary for MSIX publishing resemble the following

下面摘录了进行 MSIX 发布所需的步骤:

```yaml
- uses: microsoft/setup-msstore-cli@v1

- name: Configure the Microsoft Store CLI
  run: msstore reconfigure --tenantId ${{ secrets.AZURE_AD_TENANT_ID }} --clientId ${{ secrets.AZURE_AD_ClIENT_ID }} --clientSecret ${{ secrets.AZURE_AD_CLIENT_SECRET }} --sellerId ${{ secrets.SELLER_ID }}

- name: Install Dart dependencies
  run: flutter pub get

- name: Create MSIX package
  run: msstore package .

- name: Publish MSIX to the Microsoft Store
  run: msstore publish -v
```

## Updating the app's version number

## 更新应用程序的版本号

For apps published to the Microsoft Store,
the version number must be set during the
packaging process.

对于发布到微软商店的 Flutter 桌面版应用，
版本号必须在打包过程中设置，而不能通过
`pubspec.yaml` 或命令行参数设置。

The default version number of the app is `1.0.0.0`.

默认的应用版本号为 `1.0.0.0`。

:::note

Microsoft Store apps are not allowed to have a
Version with a revision number other than zero.
Therefore, the last number of the version must
remain zero for all releases.
Ensure that you follow Microsoft's
[versioning guidelines][windowspackageversioning].

请注意，微软商店的应用程序不允许出现
有一个修订版本号（第四段）不为零的版本。
因此，在所有的版本中，版本的最后一个数字必须保持为零。
请注意遵循微软的 [版本指南][windowspackageversioning]。 

:::

For apps not published to the Microsoft Store, you
can set the app's executable's file and product versions.
The executable's default file version is `1.0.0.1`,
and its default product version is `1.0.0+1`. To update these,
navigate to the `pubspec.yaml` file and update the
following line:

对于还没有发布到微软商店的应用程序，
你可以设置应用程序的可执行程序和产品的版本。
可执行程序的默认版本是 `1.0.0.1`，
产品的默认版本是 `1.0.0+1`。
要设置这些内容，请找到 `pubspec.yaml` 并更新这一行：

```yaml
version: 1.0.0+1
```

The build name is three numbers separated by dots,
followed by an optional build number that is separated
by a `+`. In the example above, the build name is `1.0.0`
and the build number is `1`.

构建版本名称是三个点隔开的数字，
后面是一个可选的构建编号，用 `+` 隔开。
在上面的例子中，构建版本名称是 `1.0.0`，构建编号是 `1`。

The build name becomes the first three numbers of the
file and product versions, while the build number becomes
the fourth number of the file and product versions.

可执行程序和产品的版本：由构建版本名称（前三个数字）和构建编号（第四个数字）组成。

Both the build name and number can be overridden in
`flutter build windows` by specifying `--build-name` and
`--build-number`, respectively.

在 `flutter build windows` 时，
可以通过 `--build-name` 和 `--build-number` 分别指定构建版本名称和构建编号。

:::note

Flutter projects created before Flutter 3.3
need to be updated to set the executable's version
information. For more information,
refer to the [version migration guide][].

在 Flutter 3.3 版本之前创建的 Flutter 项目需要更新后才能设置可执行程序的版本信息。
更多信息，请查看 [版本信息迁移指南][version migration guide]。

:::

## Add app icons

## 添加应用图标

To update the icon of a Flutter Windows
desktop application before packaging use the
following instructions:

在打包前更新 Flutter Windows 桌面应用程序的图标：

1. In the Flutter project, navigate to
   **windows\runner\resources**.

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

To update the application image in the Store listing,
navigate to the Store listing step of the submission
and select Store logos.
From there, you can upload the logo with
the size of 300 x 300 pixels.

要更新商店列表中的应用程序图标，请导航到提交的商店列表并选择商店 logo。
在那里可以上传尺寸为 300 x 300 像素的图片。

All uploaded images are retained for subsequent submissions.

所有上传的图片将被保留，以便于以后提交使用。

## Validating the application package

## 验证应用程序包

Before publication to the Microsoft Store,
first validate the application package locally.

在发布到微软商店之前，建议先在本地验证应用程序包。

[Windows App Certification Kit][windowsappcertification] is a tool that is 
included in the Windows Software Development Kit (SDK).

[Windows 应用认证工具包][windowsappcertification] 是一个包含在 Windows 软件开发工具包（SDK）中的工具。

To validate the application:

验证应用程序：

1. Launch Windows App Cert Kit.

   启动 Windows 应用认证工具包。

2. Select the Flutter Windows desktop package
   (**.msix**, **.msixbundle**, etc.).

   选择 Flutter Windows 桌面应用程序包
   （**.msix**、**.msixbundle** 等）。

3. Choose a destination for the test report.

   选择测试报告的输出目录。

The report may contain important warnings and information, 
even if the certification passes. 

即使认证通过，报告也可能包含重要警告和信息。

[azureadassociation]: https://docs.microsoft.com/windows/uwp/publish/associate-azure-ad-with-partner-center
[cmworkfloweditor]: https://docs.codemagic.io/flutter-publishing/publishing-to-microsoft-store/
[cmyaml]: https://docs.codemagic.io/yaml-publishing/microsoft-store/
[codemagic]: https://codemagic.io/start/
[microsoftstore]: https://www.microsoft.com/store/apps/windows
[msidocs]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[microsoftpartner]: https://partner.microsoft.com/
[msix package]: {{site.pub}}/packages/msix
[msix packaging]: /platform-integration/windows/building#msix-packaging
[partnercenterapi]: https://docs.microsoft.com/azure/marketplace/azure-app-apis
[storepolicies]: https://docs.microsoft.com/windows/uwp/publish/store-policies/
[visualstudiopackaging]: https://docs.microsoft.com/windows/msix/package/packaging-uwp-apps
[visualstudiosubmission]: https://docs.microsoft.com/windows/msix/package/packaging-uwp-apps#automate-store-submissions
[windowspackageversioning]: https://docs.microsoft.com/windows/uwp/publish/package-version-numbering
[windowsappcertification]: https://docs.microsoft.com/windows/uwp/debug-test-perf/windows-app-certification-kit
[version migration guide]: /release/breaking-changes/windows-version-information
