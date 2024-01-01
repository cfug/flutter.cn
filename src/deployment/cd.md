---
title: Continuous delivery with Flutter
title: Flutter 里的持续部署
description: >
  How to automate continuous building and releasing of your Flutter app.
description: 如何自动的持续编译构建和发布你的 Flutter 应用。
tags: CI/CD,持续部署,发布应用
keywords: fastlane
---

Follow continuous delivery best practices with Flutter to make sure your
application is delivered to your beta testers and validated on a frequent basis
without resorting to manual workflows.

通过 Flutter 持续交付的最佳实践，
确保您的应用程序交付给您的 Beta 版本测试人员并能够频繁予以验证，
而无需借助手动工作流程。

## CI/CD Options

## CI/CD 选择

There are a number of continuous integration (CI) and continuous delivery (CD)
options available to help automate the delivery of your application.

有许多持续集成 (CI) 和持续交付 (CD) 的工具，帮助自动发布你的应用。

### All-in-one options with built-in Flutter functionality

### 内置 Flutter 的多合一 (All-in-one) 选择：

* [Codemagic][]
* [Bitrise][]
* [Appcircle][]

### Integrating fastlane with existing workflows

### 使用 Fastlane 与现有工作流程集成

You can use fastlane with the following tooling:

你可以通过下面的工具使用 fastlane：

* [GitHub Actions][]
  * Example: Flutter Gallery's [Github Actions workflows][]

    样例：Flutter Galley 的 [GitHub Actions 工作流][Github Actions workflows]

  * Example: [Github Action in Flutter Project][]

    样例：[适用于 Flutter 项目的 GitHub Actions][Github Action in Flutter Project]

* [Cirrus][]
* [Travis][]
* [GitLab][]
* [CircleCI][]
   * [Building and deploying Flutter apps with Fastlane][]

This guide shows how to set up fastlane and then integrate it with 
your existing testing and continuous integration (CI) workflows. 
For more information, see "Integrating fastlane with existing workflow".

这份指南展示了如何让设置 fastlane 以及
将其集成到现有应用的测试和持续集成 (CI) 工作流当中去。
更多相关的内容，请参考上面这部分的内容。

## fastlane

[fastlane][] is an open-source tool suite to automate releases and deployments 
for your app.

[fastlane][] 是一个开源工具套件，帮助你自动的打包正式版以及部署你的应用。

### Local setup

### 本地设置

It's recommended that you test the build and deployment process locally before
migrating to a cloud-based system. You could also choose to perform continuous
delivery from a local machine.

建议在迁移到基于云计算的系统之前，先在本地测试其构建和部署流程。
您还可以使用本地机器执行连续交付。

1. Install fastlane `gem install fastlane` or `brew install fastlane`.
Visit the [fastlane docs][fastlane] for more info.

   安装 fastlane `gem install fastlane` 或 `brew install fastlane`。
   访问 [fastlane docs][fastlane] 以获得更多信息。

1. Create an environment variable named `FLUTTER_ROOT`,
    and set it to the root directory of your Flutter SDK.
    (This is required for the scripts that deploy for iOS.)

   创建一个名为 `FLUTTER_ROOT` 的环境变量，并将其设置为 Flutter SDK 的根目录。（这是为 iOS 部署的脚本所必需的。）
    
1. Create your Flutter project, and when ready, make sure that your project builds via

   创建您的 Flutter 项目，准备就绪后，确保通过如下途径构建项目：

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) `flutter build appbundle`; and
    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) `flutter build ipa`.

1. Initialize the fastlane projects for each platform.

   初始化各平台的 fastlane 项目：

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) In your `[project]/android`
    directory, run `fastlane init`.

      ![Android]({{site.url}}/assets/images/docs/cd/android.png)：在 `[project]/android` 目录中，
      运行 `fastlane init` 命令。

    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) In your `[project]/ios` directory,
    run `fastlane init`.

      ![iOS]({{site.url}}/assets/images/docs/cd/ios.png)：
      在 `[project]/ios` 目录下，运行 `fastlane init` 命令。

1. Edit the `Appfile`s to ensure they have adequate metadata for your app.

   编辑 `Appfile` 以确保它有应用程序的基本数据配置：

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) Check that `package_name` in
    `[project]/android/fastlane/Appfile` matches your package name in AndroidManifest.xml.

      ![Android]({{site.url}}/assets/images/docs/cd/android.png) 检查在 `[project]/android/fastlane/Appfile` 
      文件中的 `package_name` 是否匹配在 AndroidManifest.xml 中的包名。

    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) Check that `app_identifier` in
    `[project]/ios/fastlane/Appfile` also matches Info.plist's bundle identifier. Fill in
    `apple_id`, `itc_team_id`, `team_id` with your respective account info.

      ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) 检查在 `[project]/ios/fastlane/Appfile` 中的
      `app_identifier` 是否匹配 Info.plist 文件中的 bundle identifier。
      将相应的 `apple_id`、`itc_team_id` 和 `team_id` 输入进去。

1. Set up your local login credentials for the stores.

   设置应用商店的本地登录凭据。

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) Follow the [Supply setup steps][]
    and ensure that `fastlane supply init` successfully syncs data from your
    Play Store console. _Treat the .json file like your password and do not check
    it into any public source control repositories._

      ![Android]({{site.url}}/assets/images/docs/cd/android.png) 按照 [Supply setup steps][] 文档操作，
      并且确保 `fastlane supply init` 成功同步了
      你在 Google Play 商店控制台中的数据。
      **.json 文件与密码一样重要，切勿将其公开在任何公共源代码控制存储库。**

    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) Your iTunes Connect username is already
    in your `Appfile`'s `apple_id` field. Set the `FASTLANE_PASSWORD` shell
    environment variable with your iTunes Connect password. Otherwise, you'll be
    prompted when uploading to iTunes/TestFlight.

      ![iOS]({{site.url}}//assets/images/docs/cd/ios.png)  iTunes Connect 用户名已经存在于您的
      `Appfile` 的 `apple_id` 字段中，
      你需要将你的 iTunes 密码设置到 `FASTLANE_PASSWORD` 这个环境变量里。
      否则，上传到 iTunes/TestFlight时会提示你。

1. Set up code signing.

   设置代码签名：

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) Follow the [Android app signing steps][].

      ![Android]({{site.url}}/assets/images/docs/cd/android.png) 参考文档 [为应用签名][Android app signing steps]。

    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) On iOS, create and sign using a
      distribution certificate instead of a development certificate when you're
      ready to test and deploy using TestFlight or App Store.

      ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) 在iOS上，
      当您准备使用 TestFlight 或 App Store 进行测试和部署时，
      使用分发证书而不是开发证书进行创建和签名。

        * Create and download a distribution certificate in your
          [Apple Developer Account console][].

          在 [Apple Developer Account console][] 创建并下载一个分发证书。

        * `open [project]/ios/Runner.xcworkspace/` and select the distribution
          certificate in your target's settings pane.

          打开 `[project]/ios/Runner.xcworkspace/` 在你的项目设置里选择一个分发证书。

1. Create a `Fastfile` script for each platform.

   给每个不同的平台创建一个 `Fastfile` 脚本。

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) On Android, follow the
      [fastlane Android beta deployment guide][].
      Your edit could be as simple as adding a `lane` that calls
      `upload_to_play_store`.
      Set the `aab` argument to `../build/app/outputs/bundle/release/app-release.aab`
      to use the app bundle `flutter build` already built.

      ![Android]({{site.url}}/assets/images/docs/cd/android.png) 在 Android 上按照
      [fastlane Android beta deployment guide][] 指引操作。
      你可以简单的编辑一下文件，加一个名叫 `upload_to_play_store` 的 `lane`。
      为了使用 `flutter build` 命令编译 `aab`，
      要把 `apk` 参数设置为 `../build/app/outputs/bundle/release/app-release.aab`。

    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) On iOS, follow the
      [fastlane iOS beta deployment guide][].
      You can specify the archive path to avoid rebuilding the project. For example:

      ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) 在 iOS 上，按照
      [fastlane iOS beta 部署指南][fastlane iOS beta deployment guide] 指引操作。
      你可以指定 archive 的路径以避免重复构建。例如：

      ```ruby
      build_app(
        skip_build_archive: true,
        archive_path: "../build/ios/archive/Runner.xcarchive",
      )
      upload_to_testflight
      ```

You're now ready to perform deployments locally or migrate the deployment
process to a continuous integration (CI) system.

你现在已准备好在本地执行部署或将部署过程迁移到持续集成（CI）系统。

### Running deployment locally

### 在本地运行部署

1. Build the release mode app.

   构建发布模式的应用：

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) `flutter build appbundle`.
    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) `flutter build ipa`.

1. Run the Fastfile script on each platform.

   在每个平台上运行 Fastfile 脚本。

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) `cd android` then
    `fastlane [name of the lane you created]`.
    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) `cd ios` then
    `fastlane [name of the lane you created]`.

### Cloud build and deploy setup

### 云构建和部署设置

First, follow the local setup section described in 'Local setup' to make sure
the process works before migrating onto a cloud system like Travis.

首先，按照“本地设置”中描述的本地设置部分，确保在迁移到 Travis 等云系统之前，该过程有效。

The main thing to consider is that since cloud instances are ephemeral and
untrusted, you won't be leaving your credentials like your Play Store service
account JSON or your iTunes distribution certificate on the server.

需要考虑的主要事项是，由于云实例是短暂且不可信的，
因此你不能在服务器上保留你的凭据，
如 Play Store 服务帐户 JSON 或 iTunes 分发证书。

Continuous Integration (CI) systems generally support encrypted environment 
variables to store private data. You can pass these environment variables 
using `--dart-define MY_VAR=MY_VALUE` while building the app.

持续集成 (CI) 系统通常支持加密的环境变量来存储私有数据。
你可以使用 `--dart-define MY_VAR=MY_VALUE` 在构建应用时传递环境变量。

**Take precaution not to re-echo those variable values back onto the console in
your test scripts**. Those variables are also not available in pull requests
until they're merged to ensure that malicious actors cannot create a pull
request that prints these secrets out. Be careful with interactions with these
secrets in pull requests that you accept and merge.

**采取预防措施，不要在测试脚本中将这些变量值重新回显到控制台。**
在合并之前，这些变量在拉取请求中也不可用，
以确保恶意行为者无法创建打印这些密钥的拉取请求。
在接受和合并的 pull 请求中，请注意与这些密钥。

1. Make login credentials ephemeral.

   暂时性登录凭据。

    * ![Android]({{site.url}}/assets/images/docs/cd/android.png) On Android:

      ![Android]({{site.url}}/assets/images/docs/cd/android.png 在 Android 上：

        * Remove the `json_key_file` field from `Appfile` and store the string
          content of the JSON in your CI system's encrypted variable. 
          Read the environment variable directly in your `Fastfile`.

          从 `Appfile` 中删除 `json_key_file` 并将其存储在 CI 系统的加密变量里。
          从 `Fastfile` 中直接读取这些环境变量。

          ```
          upload_to_play_store(
            ...
            json_key_data: ENV['<variable name>']
          )
          ```
        * Serialize your upload key (for example, using base64) and save it as
          an encrypted environment variable. You can deserialize it on your CI
          system during the install phase with

          序列化您的上传密钥（例如，使用 base64）并将其另存为加密环境变量。
          可以可以在安装阶段在 CI 系统上对其进行反序列化

          ```bash
          echo "$PLAY_STORE_UPLOAD_KEY" | base64 --decode > [path to your upload keystore]
          ```
    * ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) On iOS:

      ![iOS]({{site.url}}/assets/images/docs/cd/ios.png) 在 iOS 上:

        * Move the local environment variable `FASTLANE_PASSWORD` to use
          encrypted environment variables on the CI system.

          将本地环境变量 `FASTLANE_PASSWORD` 转而使用 CI 系统的加密的环境变量。

        * The CI system needs access to your distribution certificate.
          fastlane's [Match][] system is
          recommended to synchronize your certificates across machines.

          CI 系统需要有权限拿到你的分发证书。建议使用fastlane 的 [Match][] 系统在不同的机器上同步你的证书。

2. It's recommended to use a Gemfile instead of using an indeterministic
   `gem install fastlane` on the CI system each time to ensure the fastlane
   dependencies are stable and reproducible between local and cloud machines.
   However, this step is optional.

   建议每次使用 Gemfile 而不是 `gem install fastlane` 以避免其在 CI 系统上使用的不确定性 ，
   以确保 fastlane 依赖关系在本地和云计算机之间稳定且可重现。但是，此步骤是可选的。

    * In both your `[project]/android` and `[project]/ios` folders, create a
      `Gemfile` containing the following content:

      在 `[project]/android` 和 `[project]/ios` 文件夹中，创建一个 `Gemfile` 包含以下内容：

        ```
        source "https://rubygems.org"

        gem "fastlane"
        ```
    * In both directories, run `bundle update` and check both `Gemfile` and
      `Gemfile.lock` into source control.

      在两个目录中，运行 `bundle update` 并将两者的 `Gemfile` 和 `Gemfile.lock` 文件纳入源代码管理。

    * When running locally, use `bundle exec fastlane` instead of `fastlane`.

      当你在本地运行的时候,请使用 `bundle exec fastlane` 而不是 `fastlane`。

3. Create the CI test script such as `.travis.yml` or `.cirrus.yml` in your
   repository root.

   在你的仓库根目录创建一个 CI 测试脚本，
   例如: `.travis.yml` 或 `.cirrus.yml`。

    * See [fastlane CI documentation][] for CI specific setup.

      有关特定于 CI 的设置，请参见 [fastlane CI 文档][fastlane CI documentation]。

    * Shard your script to run on both Linux and macOS platforms.

      分开你的脚本以便能在 Linux 和 macOS 两个平台运行。

    * During the setup phase of the CI task, do the following:

      在 CI 的设置阶段，执行下列内容：

         * Ensure Bundler is available using `gem install bundler`.

           通过执行 `gem install bundler` 确保 Bundler 可用。

         * Run `bundle install` in `[project]/android` or `[project]/ios`.

           在 `[project]/android` 或 `[project]/ios` 目录下分别运行 `bundle install`命令。

         * Make sure the Flutter SDK is available and set in `PATH`.

           确保 Flutter SDK 已经正确了设置在了 `PATH` 环境变量中。

         * For Android, ensure the Android SDK is available and the `ANDROID_SDK_ROOT`
           path is set.

           在 Android 平台上，请确保已经设置正确的 `ANDROID_SDK_ROOT` 环境变量。

         * For iOS, you might have to specify a dependency on Xcode
           (for example, `osx_image: xcode9.2`).

           在 iOS 平台上，你需要为 Xcode 指定依赖 (比如: `osx_image: xcode9.2`)

    * In the script phase of the CI task:
    
      在 CI 任务的脚本阶段：
      
         * Run `flutter build appbundle` or
           `flutter build ios --release --no-codesign`,
           depending on the platform.

           根据平台的不同可以运行 `flutter build appbundle` 或者
           `flutter build ios --release --no-codesign`。
   
         * `cd android` or `cd ios`

           然后执行 `cd android` 或 `cd ios` 命令。

         * `bundle exec fastlane [name of the lane]`

           最后执行 `bundle exec fastlane [name of the lane]` 命令。

## Xcode Cloud

[Xcode Cloud][] is a continuous integration and delivery service for building,
testing, and distributing apps and frameworks for Apple platforms.

[Xcode Cloud][] 是一项为分发 Apple 平台的持续构建集成并交付，以及测试分发的服务。

### Requirements

### 需要准备的

* Xcode 13.4.1 or higher.

  Xcode 13.4.1 或更高版本。

* Be enrolled in the [Apple Developer Program][].

  加入 [Apple 开发者计划][Apple Developer Program]。

### Custom build script

### 自定义构建脚本

Xcode Cloud recognizes [custom build scripts][] that can be 
used to perform additional tasks at a designated time. It also includes a set
of [predefined environment variables][], such as `$CI_WORKSPACE`, which is the
location of your cloned repository.

Xcode Cloud 可以识别 [自定义的构建脚本][custom build scripts] 用于在特定阶段执行额外的任务。
同时它还包含了一系列 [预定义的环境变量][predefined environment variables]，
例如用于你 clone 仓库地址的 `$CI_WORKSPACE`。

{{site.alert.note}}

  The temporary build environment that Xcode Cloud uses includes tools that are
  part of macOS and Xcode&mdash;for example, Python&mdash;and additionally Homebrew to
  support installing third-party dependencies and tools.

  Xcode Cloud 使用的临时构建环境工具是 macOS 和 Xcode 的一部分（例如 Python），
  另外还有 Homebrew 以支持安装第三方依赖项和工具。

{{site.alert.end}}

#### Post-clone script

#### Post-clone 脚本

Leverage the post-clone custom build script that runs after
Xcode Cloud clones your Git repository using the following instructions:

利用 post-clone 运行的自定义构建脚本
Xcode Cloud 按照以下说明克隆你的 Git 仓库：

Create a file at `ios/ci_scripts/ci_post_clone.sh` and add the content below.

在 `ios/ci_scripts/ci_post_clone.sh` 创建一个文件，然后添加下面的内容。

<?code-excerpt "deployment/xcode_cloud/ci_post_clone.sh"?>
```sh
#!/bin/sh

# Fail this script if any subcommand fails.
set -e

# The default execution directory of this script is the ci_scripts directory.
cd $CI_PRIMARY_REPOSITORY_PATH # change working directory to the root of your cloned repo.

# Install Flutter using git.
git clone https://github.com/flutter/flutter.git --depth 1 -b stable $HOME/flutter
export PATH="$PATH:$HOME/flutter/bin"

# Install Flutter artifacts for iOS (--ios), or macOS (--macos) platforms.
flutter precache --ios

# Install Flutter dependencies.
flutter pub get

# Install CocoaPods using Homebrew.
HOMEBREW_NO_AUTO_UPDATE=1 # disable homebrew's automatic updates.
brew install cocoapods

# Install CocoaPods dependencies.
cd ios && pod install # run `pod install` in the `ios` directory.

exit 0
```

This file should be added to your git repository and marked as executable.

该文件需要加入 git 仓库管理，并给予可执行权限。

```terminal
$ git add --chmod=+x ios/ci_scripts/ci_post_clone.sh
```

### Workflow configuration

### 工作流配置

An [Xcode Cloud workflow][] defines the steps performed in the CI/CD process
when your workflow is triggered.

[Xcode Cloud workflow][] 定义了你工作流触发时 CI/CD 处理进程的执行步骤。

{{site.alert.note}}

  This requires that your project is already initialized with Git
  and linked to a remote repository.

  你需要保证项目已经进行 Git 初始化，并关联到远端仓库。

{{site.alert.end}}

To create a new workflow in Xcode, use the following instructions:

要在 Xcode 中创建一个工作流，请参考以下步骤：

1. Choose **Product > Xcode Cloud > Create Workflow** to open the
   **Create Workflow** sheet.

   选择 **Product > Xcode Cloud > Create Workflow** 以打开 **Create Workflow** 菜单。

2. Select the product (app) that the workflow should be attached to, then click
   the **Next** button.

   选择工作流需要作用的生产应用，然后点击 **Next** 按钮。

3. The next sheet displays an overview of the default workflow provided by Xcode,
    and can be customized by clicking the **Edit Workflow** button.

   下一步，菜单将会展示一个 Xcode 提供的默认工作流的浮层，
   然后可以通过点击 **Edit Workflow** 按钮进行定制。

#### Branch changes

#### 变更分支

By default Xcode suggests the Branch Changes condition that starts a new build
for every change to your Git repository's default branch.

默认 Xcode 建议每次分支变更后都为你仓库的默认分支开始一个全新的构建。

For your app's iOS variant, it's reasonable that you would want Xcode Cloud to
trigger your workflow after you've made changes to your flutter packages, or
modified either the Dart or iOS source files within the `lib\` and `ios\`
directories.

对于你应用的 iOS 变体，你通常会希望 Xcode Cloud 在对你的
Flutter packages 修改了 `lib\` 中的 Dart 或 `ios\` 中的 iOS 源文件目录之后，
触发你的工作流。

This can be achieved by using the following Files and Folders conditions:

这可以通过使用下列文件和文件夹条件来实现：

![Xcode Workflow Branch Changes]({{site.url}}/assets/images/docs/releaseguide/xcode_workflow_branch_changes.png){:width="100%"}

### Next build number

### 下次构建的构建版本数字

Xcode Cloud defaults the build number for new workflows to `1` and increments
it per successful build. If you're using an existing app with a higher build
number, you'll need to configure Xcode Cloud to use the correct build number
for it's builds by simply specifying the `Next Build Number` in your iteration.

Xcode Cloud 对于新的工作流来说默认的构建版本数字是 `1`，
然后在每次成功构建后递增。如果你已经在一个已有应用中，
使用了一个更高的构建版本数字，你需要配置 Xcode Cloud 使用正确的构建版本数字，
只需要简单通过指定 `Next Build Number` 用于迭代即可。

Check out [Setting the next build number for Xcode Cloud builds][] for more
information.

你可以在 [设置 Xcode Cloud 构建下一次的构建版本数字][Setting the next build number for Xcode Cloud builds]
查看更多信息。

[Android app signing steps]: {{site.url}}/deployment/android#signing-the-app
[Appcircle]: https://appcircle.io/blog/guide-to-automated-mobile-ci-cd-for-flutter-projects-with-appcircle/
[Apple Developer Account console]: {{site.apple-dev}}/account/ios/certificate/
[Bitrise]: https://devcenter.bitrise.io/en/getting-started/getting-started-with-flutter-apps
[CI Options and Examples]: #reference-and-examples
[Cirrus]: https://cirrus-ci.org
[Cirrus script]: {{site.repo.flutter}}/blob/master/.cirrus.yml
[Codemagic]: https://blog.codemagic.io/getting-started-with-codemagic/
[fastlane]: https://docs.fastlane.tools
[fastlane Android beta deployment guide]: https://docs.fastlane.tools/getting-started/android/beta-deployment/
[fastlane CI documentation]: https://docs.fastlane.tools/best-practices/continuous-integration
[fastlane iOS beta deployment guide]: https://docs.fastlane.tools/getting-started/ios/beta-deployment/
[Flutter Gallery Project]: {{site.repo.gallery}}
[Github Action in Flutter Project]: {{site.github}}/nabilnalakath/flutter-githubaction
[GitHub Actions]: {{site.github}}/features/actions
[Github Actions workflows]: {{site.repo.gallery}}/tree/main/.github/workflows
[GitLab]: https://docs.gitlab.com/ee/ci/README.html#doc-nav
[CircleCI]: https://circleci.com
[Building and deploying Flutter apps with Fastlane]: https://circleci.com/blog/deploy-flutter-android
[Match]: https://docs.fastlane.tools/actions/match/
[Supply setup steps]: https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply
[Travis]: https://travis-ci.org/
[Apple Developer Program]: {{site.apple-dev}}/programs
[Xcode Cloud]: {{site.apple-dev}}/xcode-cloud
[Xcode Cloud workflow]: {{site.apple-dev}}/documentation/xcode/xcode-cloud-workflow-reference
[custom build scripts]: {{site.apple-dev}}/documentation/xcode/writing-custom-build-scripts
[predefined environment variables]: {{site.apple-dev}}/documentation/xcode/environment-variable-reference
[Setting the next build number for Xcode Cloud builds]: {{site.apple-dev}}/documentation/xcode/setting-the-next-build-number-for-xcode-cloud-builds#Set-the-next-build-number-to-a-custom-value
