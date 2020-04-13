## iOS setup

## 设置 iOS 开发环境

### Install Xcode

### 安装 Xcode

To develop Flutter apps for iOS, you need a Mac with Xcode installed.

开发 iOS 平台上的 Flutter 应用，你需要一个安装了 Xcode 的 Mac 设备。

 1. Install the latest stable version of Xcode
    (using [web download][] or the [Mac App Store][]).

    通过 [直接下载](https://developer.apple.com/xcode/)
    或者[Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835)
    来安装最新稳定版 Xcode；

 2. Configure the Xcode command-line tools to use the newly-installed
    version of Xcode by
    running the following from the command line:

    通过在命令行中运行以下命令来配置 Xcode command-line tools:

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

 3. Make sure the Xcode license agreement is signed by either opening
    Xcode once and confirming or running
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

 1. On your Mac, find the Simulator via Spotlight or by using the
    following command:

    在你的 Mac 中，通过 Spotlight 或者以下命令来运行模拟器：

    ```terminal
    $ open -a Simulator
    ```

 2. Make sure your simulator is using a 64-bit device 
   (iPhone 5s or later) by checking the settings in 
   the simulator's **Hardware > Device** menu.

    通过模拟器菜单中的 **Hardware > Device** 选项检查当前模拟器是否是 64 位机型
    （iPhone 5S 或之后的机型）。

 3. Depending on your development machine's screen size,
    simulated high-screen-density iOS devices
    might overflow your screen. Set the device scale under the
    **Window > Scale** menu in the simulator.

    根据你当前开发机器的屏幕尺寸，
    模拟器模拟出来的高密度屏幕的设备可能会占满你的屏幕，
    你可以通过菜单中的 **Window > Scale** 选项来更改模拟器的缩放比例。

### Create and run a simple Flutter app

### 创建并运行一个简单的 Flutter 应用


To create your first Flutter app and test your setup, follow these steps:

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

### 部署到 iOS 真机上

To deploy your Flutter app to a physical iOS device you need the third-party
CocoaPods dependency manager and an Apple Developer account. You'll also need
to set up physical device deployment in Xcode.

如果你想把 Flutter 应用部署到 iOS 的真机上，
你还需要一些别的工具和一个 Apple 开发者账号。
另外，你还需要在 Xcode 上针对你的机器做一些设置。

 1. Install and set up CocoaPods by running the following commands:
    
    通过下面的代码安装和设置 CocoaPods:
 

    ```terminal
    $ sudo gem install cocoapods
    $ pod setup
    ```

 1. Follow the Xcode signing flow to provision your project:

    按照下面 Xcode 签名流程来配置你的项目:

     {: type="a"}
     1. Open the default Xcode workspace in your project by running `open
        ios/Runner.xcworkspace` in a terminal window from your Flutter project
        directory.

        通过在命令行中于你当前 Flutter 项目目录下运行
        `open ios/Runner.xcworkspace` 命令来打开默认的 Xcode 工程。

     1. Select the device you intend to deploy to in the device drop-down
        menu next to the run button.
        
        在运行按钮的下拉列表里选择你想要部署到的设备；

     1. Select the `Runner` project in the left navigation panel.

        在左侧的导航面板中选择 `Runner` 项目；

     1. In the `Runner` target settings page,
        make sure your Development Team is selected.
        The UI varies depending on your version of Xcode.
        
        在 `Runner` 项目的设置页面，请确保勾选你的开发团队。
        在不同的 Xcode 版本里，这一部分的操作界面不同：       
        
        * For Xcode 10, look under **General > Signing > Team**.
          
          在 Xcode 10 版本中，请在这里设置：**General > Signing > Team**
          
        * For Xcode 11 and newer, look under
        **Signing & Capabilities > Team**.
          
          在 Xcode 11 版本以后，请在这里设置 **Signing & Capabilities > Team**

        在 `Runner` 项目的设置页面中，确保 **General > Signing > Team** 选项下的 
        Development Team 选中状态。

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

          Then, go to the Settings app on the iOS device, select **General >
          Device Management** and trust your Certificate.
          
          然后在 iOS 开发机上进入 Settings 应用，
          选择 **General > Device Management** 然后信任相应的证书。


        * If automatic signing fails in Xcode, verify that the project's
          **General > Identity > Bundle Identifier** value is unique.
          
          如果 Xcode 的自动签名失败了，你可以检查以下项目中
          **General > Identity > Bundle Identifier** 里的值是否是唯一的。
          
          ![Check the app's Bundle ID][]{:.mw-100}

 5. Start your app by running `flutter run`.

    执行 `flutter run` 命令来运行你的应用。

[Check the app's Bundle ID]: /images/setup/xcode-unique-bundle-id.png
[Choosing a Membership]: https://developer.apple.com/support/compare-memberships
[Mac App Store]: https://itunes.apple.com/us/app/xcode/id497799835
[Trust Mac]: /images/setup/trust-computer.png
[web download]: https://developer.apple.com/xcode/
[Xcode account add]: /images/setup/xcode-account.png
