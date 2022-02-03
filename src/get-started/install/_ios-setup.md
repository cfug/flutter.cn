## iOS setup

## 设置 iOS 开发环境

### Install Xcode

### 安装 Xcode

To develop Flutter apps for iOS, you need a Mac with Xcode installed.

开发 iOS 平台上的 Flutter 应用，你需要一个安装了 Xcode 的 Mac 设备。

 1. Install the latest stable version of Xcode
    (using [web download][] or the [Mac App Store][]).

    通过 [直接下载][web download] 或者通过 [Mac App Store][]
    来安装最新稳定版 Xcode；

 1. Configure the Xcode command-line tools to use the
    newly-installed version of Xcode by
    running the following from the command line:

    配置 Xcode 命令行工具以使用新安装的 Xcode 版本。
    从命令行中运行以下命令：

    ```terminal
    $ sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
    $ sudo xcodebuild -runFirstLaunch
    ```

    This is the correct path for most cases,
    when you want to use the latest version of Xcode.
    If you need to use a different version,
    specify that path instead.

    当你安装了最新版本的 Xcode，大部分情况下，上面的路径都是一样的。
    但如果你安装了不同版本的 Xcode，你可能要更改一下上述命令中的路径。

1. Make sure the Xcode license agreement is signed by
    either opening Xcode once and confirming or running
    `sudo xcodebuild -license` from the command line.
 
    运行一次 Xcode 或者通过输入命令 `sudo xcodebuild -license`
    来确保已经同意 Xcode 的许可协议。

Versions older than the latest stable version may still work,
but are not recommended for Flutter development.
Using old versions of Xcode to target bitcode is not
supported, and is likely not to work.

旧版本可能也能够正常工作，但是不建议在 Flutter 开发环境中使用。
旧版本的 Xcode 不支持定位代码，还可能无法正常工作。

With Xcode, you’ll be able to run Flutter apps on
an iOS device or on the simulator.

安装了 Xcode 之后，你就可以在 iOS 真机或者模拟器上运行 Flutter 应用了。

### Set up the iOS simulator

### 配置 iOS 模拟器

To prepare to run and test your Flutter app on the iOS simulator,
follow these steps:

如果想要在 iOS 模拟器中运行和测试 Flutter 应用，按照以下步骤即可：

 1. On your Mac, find the Simulator via Spotlight or
    by using the following command:

    在你的 Mac 中，通过 Spotlight 或者以下命令来运行模拟器：

    ```terminal
    $ open -a Simulator
    ```

 2. Make sure your simulator is using a 64-bit device
    (iPhone 5s or later).  You can check the device by viewing the settings in
    the simulator's **Hardware > Device** or **File > Open Simulator** menus.

    通过模拟器菜单中的 **Hardware > Device** 或者 **File > Open Simulator** 
    选项检查当前模拟器是否是 64 位机型（iPhone 5S 或之后的机型）。

 3. Depending on your development machine's screen size,
    simulated high-screen-density iOS devices
    might overflow your screen. Grab the corner of the
    simulator and drag it to change the scale. You can also
    use the **Window > Physical Size** or **Window > Pixel Accurate**
    options if your computer's resolution is high enough.
    * If you are using a version of Xcode older
    than 9.1, you should instead set the device scale
    in the **Window > Scale** menu.

    根据你当前开发机器的屏幕尺寸，
    模拟器模拟出来的高密度屏幕的设备可能会溢出你的屏幕，
    你可以调整模拟器的边角来拖动改变比例，
    如果你的开发机分辨率很高的话，也可以通过菜单中的
    **Window > Physical Size** or **Window > Pixel Accurate**
    选项来更改模拟器的缩放比例。
    * 如果你只用 Xcode 版本低于 9.1，调整模拟器比例的菜单选项应该是
    **Window > Scale**。


### Create and run a simple Flutter app

### 创建并运行一个简单的 Flutter 应用

To create your first Flutter app and test your setup,
follow these steps:

通过以下步骤来创建你的第一个 Flutter 应用并进行测试：

 1. Create a new Flutter app by running the following from the
    command line:

    通过运行以下命令来创建一个新的 Flutter 应用：
 
    ```terminal
    $ flutter create my_app
    ```

 2. A `my_app` directory is created, containing Flutter's starter app.
    Enter this directory:

    上述命令创建了一个 `my_app` 的目录，
    包含了 Flutter 初始的应用模版，切换路径到这个目录内：
 
    ```terminal
    $ cd my_app
    ```

 3. To launch the app in the Simulator,
    ensure that the Simulator is running and enter:

    确保模拟器已经处于运行状态，输入以下命令来启动应用：

    ```terminal
    $ flutter run
    ```

### Deploy to iOS devices

To deploy your Flutter app to a physical iOS device
you'll need to set up physical device deployment in Xcode
and an Apple Developer account. If your app is using Flutter plugins,
you will also need the third-party CocoaPods dependency manager.

如果你想把 Flutter 应用部署到 iOS 的真机上，
你还需要一些别的工具和一个 Apple 开发者账号。
另外，你还需要在 Xcode 上针对你的机器做一些设置。

<ol markdown="1">
<li markdown="1">

You can skip this step if your apps do not depend on
[Flutter plugins][] with native iOS code.
[Install and set up CocoaPods][] by running the following commands:

如果你的应用不依赖 [Flutter plugins][] 与原生 iOS 代码交互，你可以跳过这一步。
通过运行以下命令 [安装和设置CocoaPods][Install and set up CocoaPods]。

```terminal
$ sudo gem install cocoapods
```
{{site.alert.note}}

  The default version of Ruby requires `sudo` to install the CocoaPods gem.
  If you are using a Ruby Version manager, you may need to run without `sudo`.
  
  Ruby的默认版本需要 root 权限 `sudo` 来安装 CocoaPods gem，
  如果你使用的是 Ruby Version 管理器，可能就无需 root 权限。
  
{{site.alert.end}}

</li>

<li markdown="1">

Follow the Xcode signing flow to provision your project:

按照下面 Xcode 签名流程来配置你的项目:

   {: type="a"}
   1. Open the default Xcode workspace in your project by
      running `open ios/Runner.xcworkspace` in a terminal
      window from your Flutter project directory.

      通过在命令行中于你当前 Flutter 项目目录下运行
      `open ios/Runner.xcworkspace` 命令来打开默认的 Xcode 工程。
      
   1. Select the device you intend to deploy to in the device
      drop-down menu next to the run button.

      在运行按钮的下拉列表里选择你想要部署到的设备；

   1. Select the `Runner` project in the left navigation panel.

      在左侧的导航面板中选择 `Runner` 项目；
     
   1. In the `Runner` target settings page,
      make sure your Development Team is selected
      under **Signing & Capabilities > Team**.

      在 `Runner` 项目的设置页面，请确保勾选你的开发团队。
      在不同的 Xcode 版本里，这一部分的操作界面不同：

      When you select a team,
      Xcode creates and downloads a Development Certificate,
      registers your device with your account,
      and creates and downloads a provisioning profile (if needed).
      
      当选择了一个团队之后，Xcode 会创建和下载一个 开发证书，
      并在你的账户里为你的社保注册，
      并在需要的时候创建和下载一个配置文件。

      * To start your first iOS development project,
        you might need to sign into
        Xcode with your Apple ID. ![Xcode account add][]{:.mw-100}
        Development and testing is supported for any Apple ID.
        Enrolling in the Apple Developer Program is required to
        distribute your app to the App Store.
        For details about membership types,
        see [Choosing a Membership][].
        
        在开始你的第一个 iOS 项目开发之前，
        你需要先在 Xcode 中登陆你的 Apple 开发者账号
        ![Xcode account add][]{:.mw-100}
        任何 Apple ID 都可以进行开发和测试。
        如果想将应用上架 App Store，你需要加入 Apple Developer Program，
        你可以在 [Choosing a Membership][] 页面中查看详细的说明。

      <a name="trust"></a>
      * The first time you use an attached physical device for iOS
        development, you need to trust both your Mac and the
        Development Certificate on that device.
        Select `Trust` in the dialog prompt when
        first connecting the iOS device to your Mac.
        
        当你第一次将设备连接到开发机用于开发时，
        你需要分别在 Mac 和开发机上进行信任设备的操作。
        当你第一次连接时，会有个弹窗，点击 `Trust` 即可。

        ![Trust Mac][]{:.mw-100}

        Then, go to the Settings app on the iOS device,
        select **General > Device Management**
        and trust your Certificate.
        For first time users, you may need to select
        **General > Profiles > Device Management** instead.
        
        然后在 iOS 开发机上进入 Settings 应用，
        选择 **General > Device Management** 然后信任相应的证书。
        对于首次打开的用户，请选择 
        **General > Profiles > Device Management**。

      * If automatic signing fails in Xcode, verify that the project's
        **General > Identity > Bundle Identifier** value is unique.
        
        如果 Xcode 的自动签名失败了，你可以检查以下项目中
        **General > Identity > Bundle Identifier** 里的值是否是唯一的。
        
        ![Check the app's Bundle ID][]{:.mw-100}

</li>

<li markdown="1">

Start your app by running `flutter run`
or clicking the Run button in Xcode.

执行 `flutter run` 命令，或者在 Xcode 里点击运行，
来运行你的应用。

</li>
</ol>

[Check the app's Bundle ID]: {{site.url}}/assets/images/docs/setup/xcode-unique-bundle-id.png
[Choosing a Membership]: {{site.apple-dev}}/support/compare-memberships
[Mac App Store]: https://itunes.apple.com/us/app/xcode/id497799835
[Flutter plugins]: {{site.url}}/development/packages-and-plugins/developing-packages#types
[Install and set up CocoaPods]: https://guides.cocoapods.org/using/getting-started.html#installation
[Trust Mac]: {{site.url}}/assets/images/docs/setup/trust-computer.png
[web download]: {{site.apple-dev}}/xcode/
[Xcode account add]: {{site.url}}/assets/images/docs/setup/xcode-account.png
