---
title: Continuous delivery with Flutter
title: Flutter 里的持续部署
description: How to automate continuous building and releasing of your Flutter app.
description: 如何自动的持续编译构建和发布你的 Flutter 应用。
---

Follow continuous delivery best practices with Flutter to make sure your
application is delivered to your beta testers and validated on a frequent basis
without resorting to manual workflows.

通过 Flutter 持续交付的最佳实践，
确保您的应用程序交付给您的 Beta 版本测试人员并能够频繁予以验证，而无需借助手动工作流程。

## fastlane

This guide shows how to integrate [fastlane](https://docs.fastlane.tools), an
open-source tool suite, with your existing testing and continuous integration
(CI) workflows (for example, Travis or Cirrus).

本指南介绍了如何将开源工具套件 fastlane
与您现有的测试和持续集成（CI）工作流程（比如 Travis 或 Cirrus）整合在一起。

### Local setup

It's recommended that you test the build and deployment process locally before
migrating to a cloud-based system. You could also choose to perform continuous
delivery from a local machine.

建议在迁移到基于云计算的系统之前，先在本地测试其构建和部署流程。
您还可以使用本地机器执行连续交付。

1. Install fastlane `gem install fastlane` or `brew cask install fastlane`.

   安装 fastlane `gem install fastlane` 或 `brew cask install fastlane`。

1. Create your Flutter project, and when ready, make sure that your project builds via
   
   创建您的 Flutter 项目，准备就绪后，确保通过如下途径构建项目：

    * ![Android](/images/cd/android.png) `flutter build apk --release`;
    * ![iOS](/images/cd/ios.png) `flutter build ios --release --no-codesign`.
1. Initialize the fastlane projects for each platform.

   初始化各平台的 fastlane 项目：

    * ![Android](/images/cd/android.png) In your `[project]/android`
    directory, run `fastlane init`.
      
      ![Android](/images/cd/android.png)：在 `[project]/android` 目录中，
      运行 `fastlane init` 命令。
    
    * ![iOS](/images/cd/ios.png) In your `[project]/ios` directory,
    run `fastlane init`.
       
      ![iOS](/images/fastlane-cd/ios.png)：
      在 `[project]/ios` 目录下，运行 `fastlane init` 命令。
    
1. Edit the `Appfile`s to ensure they have adequate metadata for your app.
   
   编辑 `Appfile` 以确保它有应用程序的基本数据配置：

    * ![Android](/images/cd/android.png) Check that `package_name` in
    `[project]/android/Appfile` matches your package name in AndroidManifest.xml.
    
      ![Android](/images/fastlane-cd/android.png) 检查在 `[project]/android/Appfile` 文件中的 `package_name` 是否匹配在 AndroidManifest.xml 中的包名。
    
    * ![iOS](/images/cd/ios.png) Check that `app_identifier` in
    `[project]/ios/Appfile` also matches Info.plist's bundle identifier. Fill in
    `apple_id`, `itc_team_id`, `team_id` with your respective account info.
    
      ![iOS](/images/fastlane-cd/ios.png) 检查在 `[project]/ios/Appfile` 中的  `app_identifier` 是否匹配 Info.plist 文件中的 bundle identifier.
    
1. Set up your local login credentials for the stores.

   设置应用商店的本地登录凭据。
   
    * ![Android](/images/cd/android.png) Follow the [Supply setup steps](https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply)
    and ensure that `fastlane supply init` successfully syncs data from your
    Play Store console. _Treat the .json file like your password and do not check
    it into any public source control repositories._
    
      ![Android](/images/fastlane-cd/android.png) 按照
      [Supply setup steps](https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply) 操作，并且确保 `fastlane supply init` 成功同步Google Play商店控制台中的数据。
      将 .json 文件视为你的密码，不要将其检入任何公共源代码控制存储库。
    
    * ![iOS](/images/cd/ios.png) Your iTunes Connect username is already
    in your `Appfile`'s `apple_id` field. Set the `FASTLANE_PASSWORD` shell
    environment variable with your iTunes Connect password. Otherwise, you'll be
    prompted when uploading to iTunes/TestFlight.
    
      ![iOS](/images/fastlane-cd/ios.png)首先在你 `Appfile` 文件的的 `apple_id` 字段中设置好 iTunes 用户名。将你的 iTunes 密码作为 `FASTLANE_PASSWORD` 字段设置为shell环境变量。否则，上传到 iTunes/TestFlight时会提示你。    
    
1. Set up code signing.
   
   设置代码签名。
   
    * ![Android](/images/cd/android.png) On Android, there are two
    signing keys: deployment and upload. The end-users download the .apk signed
    with the 'deployment key'. An 'upload key' is used to authenticate the .apk
    uploaded by developers onto the Play Store and is re-signed with the
    deployment key once in the Play Store.
    
      ![Android](/images/fastlane-cd/android.png) 在 Android 上有两种签名 key：
      发布签名和上传签名。最终用户下载的 .apk 文件使用发布签名。
      上传签名提供给开发者上传到 Google Play 商店的认证。
      上传后，Google Play 商店会重新使用 发布签名对 .apk 文件签名。

        * It's highly recommended to use the automatic cloud managed signing for
        the deployment key. For more information, see the [official Play Store documentation](https://support.google.com/googleplay/android-developer/answer/7384423?hl=en).
        
          强烈建议使用自动化的云端管理发布签名。更多信息请查看
          [Google Play 官方说明](https://support.google.com/googleplay/android-developer/answer/7384423?hl=zh-CN)。
        
        * Follow the [key generation 
        steps]({{site.android-dev}}/studio/publish/app-signing#sign-apk)
        to create your upload key.
        
          按照 [密钥生成步骤]({{site.android-dev}}/studio/publish/app-signing#sign-apk)
          创建你自己的上传签名。
        
        * Configure gradle to use your upload key when building your app in
        release mode by editing `android.buildTypes.release` in
        `[project]/android/app/build.gradle`.
        
          配置 gradle：通过设置 `[project]/android/app/build.gradle` 文件下的  
          `android.buildTypes.release`，当编译的时候在 release 模式下使用你自己的上传签名。
        
    * ![iOS](/images/cd/ios.png) On iOS, create and sign using a
    distribution certificate instead of a development certificate when you're
    ready to test and deploy using TestFlight or App Store.
    
      ![iOS](/images/fastlane-cd/ios.png) 在iOS上，当您准备使用 TestFlight 或 App Store 进行测试和部署时，使用分发证书而不是开发证书进行创建和签名。

        * Create and download a distribution certificate in your [Apple Developer Account console](https://developer.apple.com/account/ios/certificate/).
        
          在 [Apple Developer Account console](https://developer.apple.com/account/ios/certificate/) 创建并下载一个分发证书。
        
        * `open [project]/ios/Runner.xcworkspace/` and select the distribution
        certificate in your target's settings pane.
        
          打开 `[project]/ios/Runner.xcworkspace/` 在你的项目设置里选择一个分发证书。
          
1. Create a `Fastfile` script for each platform.

   给每个不同的平台创建一个 `Fastfile` 脚本。
   
    * ![Android](/images/cd/android.png) On Android, follow the
    [fastlane Android beta deployment guide](https://docs.fastlane.tools/getting-started/android/beta-deployment/).
    Your edit could be as simple as adding a `lane` that calls `upload_to_play_store`.
    Set the `apk` argument to `../build/app/outputs/apk/release/app-release.apk`
    to use the apk `flutter build` already built.
    
      ![Android](/images/fastlane-cd/android.png) 在 Android 上按照
      [fastlane Android beta deployment guide](https://docs.fastlane.tools/getting-started/android/beta-deployment/) 指引操作。你可以简单的编辑一下文件，加一个名叫
      `upload_to_play_store` 的 `lane`。为了使用 `flutter build` 命令编译 apk，
      要把 `apk` 参数设置为 `../build/app/outputs/apk/release/app-release.apk`。
    
    * ![iOS](/images/cd/ios.png) On iOS, follow the [fastlane iOS beta deployment guide](https://docs.fastlane.tools/getting-started/ios/beta-deployment/).
    Your edit could be as simple as adding a `lane` that calls `build_ios_app` with
    `export_method: 'app-store'` and `upload_to_testflight`. On iOS an extra
    build is required since `flutter build` builds an .app rather than archiving
    .ipas for release.
    
       ![iOS](/images/fastlane-cd/ios.png) 在 iOS 上，按照 [fastlane iOS beta 部署指南](https://docs.fastlane.tools/getting-started/ios/beta-deployment/) 指引操作。
      你可以简单编辑一下文件，加一个名叫 `build_ios_app` 的 `lane`，并且同时调用 `export_method: 'app-store'` 和 `upload_to_testflight`。
      在 iOS 上只有当要编译成 .app 的时候才会用到 `flutter build`，其他情况用不到。

You're now ready to perform deployments locally or migrate the deployment
process to a continuous integration (CI) system.

你现在已准备好在本地执行部署或将部署过程迁移到持续集成（CI）系统。

### Running deployment locally

## 在本地运行部署

1. Build the release mode app.

   构建发布模式应用程序。
   
    * ![Android](/images/cd/android.png) `flutter build apk --release`.
    * ![iOS](/images/cd/ios.png) `flutter build ios --release --no-codesign`.
    
    No need to sign now since fastlane will sign when archiving.
    
    这个时候不用签名，接下来 fastlane 会自动签名。
    
1. Run the Fastfile script on each platform.

   在每个平台上运行 Fastfile 脚本。

    * ![Android](/images/cd/android.png) `cd android` then
    `fastlane [name of the lane you created]`.
    * ![iOS](/images/cd/ios.png) `cd ios` then
    `fastlane [name of the lane you created]`.

### Cloud build and deploy setup

## 云构建和部署设置

First, follow the local setup section described in 'Local setup' to make sure
the process works before migrating onto a cloud system like Travis.

首先，按照“本地设置”中描述的本地设置部分，确保在迁移到 Travis 等云系统之前，该过程有效。

The main thing to consider is that since cloud instances are ephemeral and
untrusted, you won't be leaving your credentials like your Play Store service
account JSON or your iTunes distribution certificate on the server.

需要考虑的主要事项是，由于云实例是短暂且不可信的，因此你不能在服务器上保留你的凭据，如 Play Store 服务帐户 JSON 或 iTunes 分发证书。

Continuous Integration (CI) systems, such as
[Cirrus](https://cirrus-ci.org/guide/writing-tasks/#encrypted-variables)
generally support encrypted environment variables to store private data.

诸如 [Cirrus](https://cirrus-ci.org/guide/writing-tasks/#encrypted-variables) 
之类的持续集成（CI）系统通常支持加密的环境变量来存储私有数据。

**Take precaution not to re-echo those variable values back onto the console in
your test scripts**. Those variables are also not available in pull requests
until they're merged to ensure that malicious actors cannot create a pull
request that prints these secrets out. Be careful with interactions with these
secrets in pull requests that you accept and merge.

**采取预防措施，不要在测试脚本中将这些变量值重新回显到控制台。**
在合并之前，这些变量在拉取请求中也不可用，以确保恶意行为者无法创建打印这些密钥的拉取请求。
在接受和合并的 pull 请求中，请注意与这些密钥。

1. Make login credentials ephemeral.

   暂时性登录凭据。
   
    * ![Android](/images/cd/android.png) On Android:
    
      ![Android](/images/fastlane-cd/android.png) 在 Android 上：
      
        * Remove the `json_key_file` field from `Appfile` and store the string
        content of the JSON in your CI system's encrypted variable. Use the
        `json_key_data` argument in `upload_to_play_store` to read the
        environment variable directly in your `Fastfile`.
        
          从  `Appfile` 里删除 `json_key_file` 并且在你的 CI 系统里的环境变量。
          在  `upload_to_play_store` 里使用 `json_key_data` 参数从环境变量读取到`Fastfile`。
        
        * Serialize your upload key (for example, using base64) and save it as
        an encrypted environment variable. You can deserialize it on your CI
        system during the install phase with
        
        序列化您的上传密钥（例如，使用base64）并将其另存为加密环境变量。
         可以可以在安装阶段在 CI 系统上对其进行反序列化

        ```bash
        echo "$PLAY_STORE_UPLOAD_KEY" | base64 --decode > /home/cirrus/[directory # 在 gradle 中定义的文件夹和文件名].keystore
        ```
    * ![iOS](/images/cd/ios.png) On iOS:
    
      ![iOS](/images/fastlane-cd/ios.png) 在 iOS 上:
      
        * Move the local environment variable `FASTLANE_PASSWORD` to use
        encrypted environment variables on the CI system.
        
          将本地环境变量 `FASTLANE_PASSWORD` 转而使用 CI 系统的加密的环境变量。
        
        * The CI system needs access to your distribution certificate. fastlane's
        [Match](https://docs.fastlane.tools/actions/match/) system is
        recommended to synchronize your certificates across machines.
        
          CI 系统需要有权限拿到你的分发证书。建议使用fastlane 的 [Match](https://docs.fastlane.tools/actions/match/) 系统在不同的机器上同步你的证书。

2. It's recommended to use a Gemfile instead of using an indeterministic
`gem install fastlane` on the CI system each time to ensure the fastlane
dependencies are stable and reproducible between local and cloud machines. However, this step is optional.
   
   建议每次使用 Gemfile 而不是 `gem install fastlane` 以避免其在 CI 系统上使用的不确定性 ，以确保 fastlane 依赖关系在本地和云计算机之间稳定且可重现。但是，此步骤是可选的。

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

   在你的仓库根目录创建一个 CI 测试脚本，例如： `.travis.yml` 或 `.cirrus.yml`。
   
    * Shard your script to run on both Linux and macOS platforms.
    
      分开你的脚本以便能在 Linux 和 macOS 两个平台运行。
      
    * Remember to specify a dependency on Xcode for macOS (for example
    `osx_image: xcode9.2`).
    
      请记住为 macOS 指定具体版本的 Xcode（例如 osx_image: xcode9.2）。
      
    * See [fastlane CI documentation][] for CI specific setup.
    
      有关特定于 CI 的设置，请参见 [fastlane CI 文档][]。

    * During the setup phase, depending on the platform, make sure that:
    
      在设置阶段，根据平台，确保以下几点：
      
         * Bundler is available using `gem install bundler`.
         
           Bundler 可以使用 `gem install bundler`。
            
         * For Android, make sure the Android SDK is available and the `ANDROID_HOME`
         path is set.
           
           对于 Android 平台， 请确保已经设置正确的 `ANDROID_HOME` 环境变量。
         
         * Run `bundle install` in `[project]/android` or `[project]/ios`.
           
           在 `[project]/android` 或 `[project]/ios` 目录下分别运行 `bundle install`命令。
         
         * Make sure the Flutter SDK is available and set in `PATH`.
    * In the script phase of the CI task:
    
           确保 Flutter SDK 已经正确了设置在了 `PATH` 环境变量中
         
         * Run `flutter build apk --release` or `flutter build ios --release --no-codesign` depending on the platform.
         
           根据平台的不同可以运行 `flutter build apk --release` 或 `flutter build ios --release --no-codesign`
   
         * `cd android` or `cd ios`.
         
           然后执行 `cd android` 或 `cd ios` 命令。
           
         * `bundle exec fastlane [name of the lane]`.
         
           最后执行 `bundle exec fastlane [name of the lane]` 命令。

### Reference

### 参考

The [Flutter Gallery in the Flutter
repo]({{site.github}}/flutter/flutter/tree/master/examples/flutter_gallery)
uses fastlane for continuous deployment. See the source for a working example
of fastlane in action. Also see the Flutter framework repository's
[Cirrus script]({{site.github}}/flutter/flutter/blob/master/.cirrus.yml).

[Flutter repo 里的示例应用 Flutter Gallery]({{site.github}}/flutter/flutter/tree/master/examples/flutter_gallery) 使用 fastlane 连续部署。
有关 fastlane 实际运行示例，请参阅源代码。另请参阅 Flutter 框架仓库库的 [Cirrus 脚本]({{site.github}}/flutter/flutter/blob/master/.cirrus.yml)。

[fastlane CI documentation]: https://docs.fastlane.tools/best-practices/continuous-integration

[fastlane CI 文档]: https://docs.fastlane.tools/best-practices/continuous-integration

## Other services

## 其他服务

The following are some other options available to help automate the delivery of your application.

其他关于如何进行持续交付的服务：

* [GitLab Continuous Integration
  (GitLab CI/CD)](https://docs.gitlab.com/ee/ci/README.html#doc-nav).
  You'll need to create and configure a `.gitlab-ci.yml` file. You can 
  [find an example](https://raw.githubusercontent.com/brianegan/flutter_redux/master/.gitlab-ci.yml)
  in the [flutter_redux library]({{site.github}}/brianegan/flutter_redux).
  
  [GitLab 的持续交付集成 (GitLab CI/CD)](https://docs.gitlab.com/ee/ci/README.html#doc-nav).
  你需要创建一个 `.gitlab-ci.yml` 的配置文件，你可以在 [flutter_redux library]({{site.github}}/brianegan/flutter_redux) 这个 repo 找到[例子](https://raw.githubusercontent.com/brianegan/flutter_redux/master/.gitlab-ci.yml)。
  
* [Codemagic CI/CD for Flutter](https://blog.codemagic.io/getting-started-with-codemagic/)
  
  [使用 Codemagic 为 Flutter 应用加入持续交付](https://blog.codemagic.io/getting-started-with-codemagic/)
  
* [Flutter CI/CD with Bitrise](https://devcenter.bitrise.io/getting-started/getting-started-with-flutter-apps/)
   
  [使用 Bitrise 为 Flutter 应用加入持续交付](https://devcenter.bitrise.io/getting-started/getting-started-with-flutter-apps/)
