---
title: Flutter Development on a Pixelbook
title: 在 Pixelbook 上开发 Flutter 应用
---

文 / Tim Sneath，谷歌 Dart & Flutter 产品组产品经理

译 / 王鑫磊, CFUG 社区译者，贡献者，博客 [xinlei.dev](https://xinlei.dev)

原文：[ProAndroidDev Medium 专栏](https://proandroiddev.com/flutter-development-on-a-pixelbook-dde984a3fc1e)

## Newly added features in Chrome OS that let you develop and test a Flutter application without a simulator or emulator.

## Chrome OS 的新特性能够让您无需模拟器就能开发并测试 Flutter 应用程序。

> Note: this article was updated in January 2019 to match newer ChromeOS builds. But as Google continues to work on making this easier, it’s possible that you’ll see minor changes from what is shown here. Please leave a note or a comment if you see anything that’s unclear or broken in the latest builds, and I’ll fix it.
>
> 提示：本文已在 2019 年 1 月更新以匹配较新版本的 ChromeOS。然而，随着 Google 在持续不断对其优化，你可能会看到一些部分与本文描述内容有微小的差异。如果你在本文的最新版本中看到任何不清楚或错误的内容，请留下备注或评论，我会修正它。

In a somewhat underrated talk at Google I/O 2018, [Emilie Roberts](https://medium.com/@emilieroberts) announced some cool new Chrome OS features that make [a Pixelbook to do Android development](https://developer.android.google.cn/topic/arc/studio). With the new [Linux on Chromebooks](https://blog.google/products/chromebooks/linux-on-chromebooks/) feature, you can now [run Android Studio directly on a Pixelbook](https://developer.android.google.cn/topic/arc/studio), [debug over a wi-fi connection to an Android device](https://developer.android.google.cn/studio/command-line/adb#wireless) or even run the resultant Android app locally on the Pixelbook. This is all thanks to the [Crostini](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md) project, which provides a containerized Linux instance on the device.

在 Google I/O 2018 演讲中，[Emilie Roberts](https://medium.com/@emilieroberts) 介绍了 Chrome OS 中一些很酷的新特性，主题是[在 Pixelbook 上进行 Android 开发](https://developer.android.google.cn/topic/arc/studio) 。借助 [Linux on Chromebooks](https://blog.google/products/chromebooks/linux-on-chromebooks/) 这一新功能，你现在可以[直接在 Pixelbook 上运行 Android Studio](https://developer.android.google.cn/topic/arc/studio)，并[通过 Wi-Fi 连接调试 Android 设备](https://developer.android.google.cn/studio/command-line/adb#wireless)，甚至可以在 Pixelbook 上直接运行生成的 Android 应用程序。这一切都得感谢  [Crostini](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md) 计划，它为设备提供了一个 Linux 容器实例。

What is even more cool is that all this works just as well with Flutter, which means you can do all your development on-device without even needing an emulator to test your app out. While a little experimental, it makes Pixelbook a fascinating device for any Flutter developer who isn’t bought into the Apple ecosystem.

更酷的是这一切都能在 Flutter 上表现得同样出色。这意味着你可以直接在设备上进行所有开发，甚至不需要模拟器来测试你的应用程序。虽然这有一点实验性质，但它对于那些不需要加入苹果生态系统的 Flutter 开发者来说变得相当有吸引力。

Here’s a screenshot of this working, taken directly from a Pixelbook running Visual Studio Code locally and connected through the [Android Device Bridge](https://developer.android.google.cn/studio/command-line/adb) to a Flutter app also running locally. This is not an emulator — the Flutter app is being executed directly on the Pixelbook (check out the target platform in the bottom-right corner of the Visual Studio Code status bar).

下面的截图来自一台正在运行 Visual Studio Code 的 Pixelbook，而且通过 [Android Device Bridge](https://developer.android.google.cn/studio/command-line/adb) 连接的 Flutter 应用程序同样也运行在本地。这可不是什么模拟器——Flutter 应用能够在 Pixelbook 上直接运行（请看 Visual Studio代码状态栏右下角的目标平台）。

![Flutter running locally on a Pixelbook, connected with hot reload to Visual Studio Code](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/flutter_dev_env_on_pixelbook.png){:width="85%"}

In the rest of this article, I’m going to provide step-by-step instructions to get this running on your own device. Linux on Chromebook support is ‘beta-quality’ for now, and it requires one of [the supported devices for Crostini](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md#Supported-Now), including [Pixelbook](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md#Supported-Now). Your mileage may vary; things may break, and of course the performance characteristics of ChromeOS devices will be very different to those of a typical iPhone or Android device. And we’re not guaranteeing that every Flutter scenario will work at this stage. Enough caveats? :)

接下来我将在这篇文章中分步说明如何在你自己的设备上运行它。Linux on Chromebook 支持现在已经进入 beta 阶段，但它需要[一台支持 Crostini 的设备](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md#Supported-Now)，包括 [Pixelbook](https://store.google.com/product/google_pixelbook)。 但也可能会出现一些失灵的情况，这都因人而异。当然，ChromeOS 设备的性能特征将与典型的 iPhone 或 Android 设备的性能特征相差较大。我们也不能保证每个 Flutter 场景都能在这个平台上正确运行。这算是一个足够的警告了吧 ；）

## Getting the basics installed

## 基础的环境安装

For the full experience of debugging Flutter, you’ll currently need your device to be in [developer mode](http://www.chromium.org/chromium-os/chromiumos-design-docs/developer-mode), which removes some of the sandbox protections that would be available to a typical consumer and enables you to sideload untrusted applications that aren’t on the Play Store. On a Pixelbook, you can enter developer mode by holding down the `Esc` and `Refresh` keys while you press the power button. The system will reboot into the recovery screen (which prompts you to insert a USB stick). Ignore the text on the screen and hit Ctrl+D, which will initiate the process after a further warning.

要获得 Flutter 完整的调试功能，目前你需要将你的设备设为[开发者模式](http://www.chromium.org/chromium-os/chromiumos-design-docs/developer-mode)，这样就可以移除一些为典型消费者使用的沙箱保护措施，并让你的设备支持不受 Play 商店信任的应用程序。在 Pixelbook 上，你可以在按下电源（Esc）按钮的同时按住 Refresh 键进入开发者模式。系统将重新启动并进入恢复页面（他会提示你插入U盘）。你只需要忽略这段文字并按住 Ctrl + D 即可，这将会在一段警告后进入该模式。

Since this support is evolving, it’s not a bad idea to [switch your device to the beta channel](https://support.google.com/chromebook/answer/1086915?hl=en) for Chrome OS, which will give you the latest bits (at the time of writing in January 2019, this was 71.0.3578.94, but this changes regularly). Once you’ve changed the channel, you will need to let Chrome OS download and install the latest bits from that channel, and then reboot.

由于这种支持正在不断发展，[将设备切换到 Chrome OS 的 beta 频道](https://support.google.com/chromebook/answer/1086915?hl=en) 并不是一个坏主意，它将会为你提供最新的信息（在 2019 年 1 月时它是 71.0.3578.94，但它会定期更新）。当你切换频道后，你需要让 Chrome OS 下载并安装该频道的最新版本，然后重启。

Once you’ve rebooted with the latest channel bits, you’ll see a new entry in the Settings app that offers the chance to install Linux support on your Chromebook:

当你使用最新的频道重启后，你会在"设置"中看到一个新的条目，该条目可以让你在 Chromebook 上安装 Linux 支持。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/turn_on_linux_env_on_cb.png){:width="85%"}

When you turn this on, ChromeOS will offer to download and activate the Linux container:

在你打开开启它之后，ChromeOS 将会弹出下载并激活 Linux 容器的窗口。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/turn_on_linux_env_on_cb_processing.png){:width="85%"}

On my machine, this took a couple of minutes to complete; when finished, there was a shiny new Terminal app icon on the app launcher, which I promptly pinned to my taskbar.

我的机器花费了几分钟的时间来完成它。完成后，你会看到应用程序启动器上有一个闪亮的新终端应用程序图标，我立即把它固定到任务栏。

## Installing Flutter

## 安装 Flutter

Now for the fun bits. Launch the terminal, and use apt to make sure you have the very latest Linux bits by running `sudo apt update && sudo apt upgrade`.

现在该来讲点有趣的事了。打开终端，然后使用 apt 进行检查，确保你正在使用较新版本的 Linux。你可以运行 `sudo apt update && sudo apt upgrade` 这个命令来完成这项操作。

Let’s also install some other utilities and dependencies you’ll need at various points during the next steps:

我们还将在接下来的步骤中安装一些您需要的其他工具包和依赖项。

`$ sudo apt install libglu1-mesa lib32stdc++6`

Because you’re running in a container, the easiest way to download into the container instance in current builds is to just use `wget`. (You can download them using Chrome and [then transfer them through an SSH tunnel](https://developer.android.google.cn/topic/arc/studio#mount_linux_files), but that’s a little more laborious.) It’s easier to download and install Flutter with the following commands:

由于你正在运行一个容器，在当前版本中下载到容器实例的最简单方法是使用 `wget`（你也可以使用 Chrome 下载它们并通过 SSH 隧道发送它们，但那会更加复杂）。你能够通过以下命令很轻松地下载并安装 Flutter。

```
$ curl -O https://storage.flutter-io.cn/flutter_infra/releases/stable/linux/flutter_linux_v1.5.4-hotfix.2-stable.tar.xz 
$ tar xf flutter_linux_v1.5.4-hotfix.2-stable.tar.xz
$ export PATH=`pwd`/flutter/bin:$PATH
```

Now you should be able to run `flutter doctor` and it should give you a clean bill of health for Flutter itself, even though it will complain about a lack of tooling or devices at this stage.

现在你应该可以运行 `flutter doctor` 命令了，它会为 Flutter 提供一个干净的运行环境，即使它会在这个阶段抱怨缺乏必要的工具或设备。

## Installing Visual Studio Code and Android Studio

## 安装 Visual Studio Code 和 Android Studio

Now it’s time to install an IDE or two. Both of the primary supported IDEs for Flutter (Android Studio and Visual Studio Code) work perfectly well within the Chrome OS Linux support. Regardless of whether you plan to use Android Studio as your IDE, however, you’re going to want to install it so that you have the Android build tools.

现在，是时候安装一两个 IDE 了。Flutter 主要支持的两个 IDE （Android Studio 和 Visual Studio Code）都在 Chrome OS Linux 支持版上运行得相当完美。但是，无论你是否计划将Android Studio 作为 IDE，你都需要安装它以便拥有 Android 的构建工具。

[Android Studio can be downloaded directly](https://developer.android.google.cn/studio/) from the website, but because Linux runs in a separate container than the Chrome browser, you’ll have to manually move it before you can access it from your terminal. Hold down the Shift key while dragging to move it from the Downloads directory to the Linux files node (which represents the home `~` directory in the Linux container).

你能够在官网上直接下载 [Android Studio](https://developer.android.google.cn/studio/)，但是由于 Linux 运行在与 Chrome 浏览器不同的容器中，所以你必须手动移动它才能在终端进行访问。拖住时同时按住 Shift 健，将其从 Download 目录移动到 Linux 文件节点中（它在 Linux 容器中代表了 home `~` 目录）。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/download_android_sdk_to_linux_env.png){:width="85%"}

Then you can run the following to extract and install Android Studio:

然后，你就可以运行以下内容来解压缩并安装 Android Studio：

```
$ unzip android-studio.zip
$ sudo mv ~/android-studio /usr/local/
$ cd /usr/local/android-studio/bin
$ ./studio.sh
```

You’ll see a dialog like the following:

你将会看到下面这样的弹窗：

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/start_page_as_on_cb.png)

Click through the remaining setup steps (I didn’t bother selecting the Android Virtual Device, because, y’know, we don’t need it!). When the IDE launches, start a new blank project (accepting the defaults). We’re going to add a launch icon to make it easier to get back to Android Studio, so go to Tools / Create Desktop Entry.

点击剩下的设置步骤（我没有为选择 Android 虚拟设备而烦恼，因为你知道的，我们不再需要它了！）。当 IDE 启动时，创建一个新的空白项目（使用默认设定即可）。为了更加轻松地返回 Android Studio，我们将添加一个启动图标，所以请转到 Tools / Create Desktop 项。

Now we can install the Flutter plug-in for Android Studio, to add tools and integration for the IDE. Go to File / Settings, choose the Plugins node, and click Browse repositories… Search for the Flutter plugin, as shown below, and press the Install button.

现在我们能够为 Android Studio 安装 Flutter 插件了。要安装这些工具和集成，请跳到 File / Settings 并选择 Plugin 节点，然后点击 **Browse repositories** 。在这里搜索 Flutter 插件，如下所示，然后点击 Install 按钮。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/install_flutter_plugin_on_as.png){:width="85%"}

One last step at this point — make sure you’ve accepted all the Android licenses by running the following:

这部分的最后一步——通过运行以下命令以确保你已同意所有 Android 许可证：

`$ flutter doctor --android-licenses`

For Visual Studio Code, you can download and install with the following instructions, which download the Visual Studio Code package and install it with all needed dependencies (the `go.microsoft.com` URL automatically redirects to the latest version):

对于 Visual Studio Code，你可以按照以下说明下载并安装。这将会下载 Visual Studio Code 包及必要的依赖并安装（go.microsoft.com URL会自动重定向到最新版本）。

```
$ curl -L -o vscode.deb https://go.microsoft.com/fwlink/?LinkID=760868
$ sudo apt install ./vscode.deb
```

Lastly, open Visual Studio Code and install the [Flutter extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter).

最后打开 Visual Studio Code 安装 [Flutter 扩展](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter)。

You’re mostly there! Running `flutter doctor -v` should now show that everything is set, except that there are no connected devices. We’ll fix that in the final step.

你马上就要完成了！运行 `flutter doctor -v`，现在应该显示所有设置都已完成，除了 ` no connected devices` 这项，我们将会在最后解决这个问题。

## Configuring the Pixelbook as a developer device

## 将 Pixelbook 配置为开发者设备

We need to take care of a few things so that the Pixelbook is itself recognized by Android as a development device.

我们需要处理一些事情，以便让 Pixelbook 被 Android 识别为开发设备。

First up is to modify the Chrome OS firewall to [allow incoming ADB connections from the Linux side of the house](https://developer.android.google.cn/topic/arc/#configure-the-firewall). From a Chrome window, press Control+Alt+T to start the Chrome OS terminal and then type `shell` to start a shell within the terminal. If `shell` doesn’t work, then chances are you forgot to set your device into developer mode as described earlier.

首先是修改 Chrome OS 的防火墙，以[允许来自 Linux 端传入 ADB 链接](https://developer.android.google.cn/topic/arc/#configure-the-firewall)。在一个 Chrome 窗口中点击 Control+Alt+T 来开启 Chrome OS 的终端，然后输入 `shell` 来启动一个终端中的 shell。如果 `shell` 不起作用，那么你可能是忘记了将设备设为开发者模式，我们前面提到过这一点。

Now run a few `sudo` commands:

现在，运行一些 `sudo` 命令： 

```
chronos@localhost / $ sudo crossystem dev_boot_signed_only=0
chronos@localhost / $ sudo /usr/libexec/debugd/helpers/dev_features_rootfs_verification
chronos@localhost / $ sudo reboot
```

After the system reboots, you’ll need one last command:

在系统重启后，你只需要运行这最后一个命令：

``` 
chronos@localhost / $ sudo /usr/libexec/debugd/helpers/dev_features_ssh
```

Next up is to turn on Android developer mode. You might think we’ve already done this right at the beginning, but we’ve only set the Pixelbook itself into developer mode: the Android side requires the same magic invocation that you may be used to from phones. The setting is a bit buried: from the Settings app, select the Google Play Store menu and then choose Manage Android preferences:

接下来是打开 Android 开发者模式。你也许会想，我们最开始不是已经完成这一步了吗？但是我们仅仅是设置 Pixelbook 自身为开发者模式：安卓端需要使用你也许用过的手机上相同的魔术开关。这个设置隐藏的有点深：从设置应用中选择 Google Play Store 菜单，然后选择管理 Android 偏好设置（Manage Android preferences）：

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/manage_android_pref_on_cb.png){:width="85%"}

This will launch a separate Settings app for the hosted Android environment, where you’ll find the About device page:

这将会为 Android 托管环境打开另一个设置应用，你可以在其中找到"关于设备"（**About device**）页面。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/android_env_on_cb_about_page.png)

Tap the build number seven times: that’s the magic incantation that unlocks the Developer Options screen and will let you turn on ADB debugging:

连续点击 build number 7 次：这是解锁开发者选项屏幕的神奇咒语，可让你打开 ADB 调试：

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/turn_on_dev_mode_android_on_cb.png){:width="85%"}

Now you can at last set up an ADB connection to the local device that Flutter can reach. You’ll find adb in the following location, assuming you unzipped Android Studio from your home directory: $/Android/Sdk/platform-tools/adb

现在，你终于可以建立 Flutter 能够访问的本地设备的 ADB 连接。假设你是在主目录下解压 Android Studio，那么你会在以下位置找到 `adb` ：`$/Android/Sdk/platform-tools/adb`

Run the following command to connect to the local Android instance:

执行以下命令，以连接到本地 Android 实例：

`$ adb connect 100.115.92.2:5555`

## Putting all the pieces together

## 汇总

With luck, `flutter doctor` should give you a clean bill of health. You can now create and run a Flutter app, for instance:

幸运的话，`flutter doctor` 会给你一个干净健康的环境。你现在可以创建并运行 Flutter 应用了！例如：

```
$ flutter create testapp
$ cd testapp
$ flutter run
```

and after Gradle has built the APK and deployed it you should see a fullscreen window pop up with the sample app running.

等 Gradle 编译完 APK 并将其安装后，你将会看到一个全屏的正在运行样例应用代码的窗口跳出来。

![A simple Flutter app running in full-screen mode on a Pixelbook.](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-development-on-a-pixelbook/flutter_starter_app_on_cb.png){:width="85%"}

Like any other Android app running on a Pixelbook, you can restore the window from maximized, at which point the app will look very similar to how it would look if running on a phone: except it’s running directly on your Pixelbook!

与其他在 Pixelbook 上运行的 Android 应用程序一样，你可以从最大化的窗口恢复为正常大小，这时候应用程序将会看上去和手机上运行的外观非常相似：除了它是直接运行在你的 Pixelbook 上的！

## Recommendations and Caveats

## 建议及注意事项

You’ll probably want to adjust the screen DPI settings a little to get more real estate. Some apps respond better than others to this; in particular, I found that a couple of the Android Studio dialogs were way too small for the given DPI setting.

您可能希望稍微调整屏幕 DPI 设置以获得更多空间。有些应用程序在这方面上比其他应用程序响应更好;特别是我发现一些 Android Studio 对话框对于给定的 DPI 设置来说太小了。

However, in general, this seems very useful, particularly if you’re willing to live on the edge as the various teams finish building out these features. And if you’ve got a Pixelbook and have been waiting for a way to learn Flutter or try building apps, it’s well worth giving this a go! Have fun and let us know how you get on: you’ll find the team on Twitter at [@FlutterDev](https://twitter.com/flutterdev).

然而总的来说，这似乎非常有用，特别是如果你愿意使用这些由各个团队完成的最新特性的话。如果你有 Pixelbook 并一直在等待一个学习 Flutter 或尝试构建应用的方法的话，它绝对值得你试一试！祝你玩得开心，欢迎告诉我们你的故事：你可以在 Twitter 上的 [@flutterio](https://twitter.com/flutterio) 中找到我们团队。
