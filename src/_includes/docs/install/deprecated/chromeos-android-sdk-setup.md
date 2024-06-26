## Android setup (without Android Studio)

## Android 安装（无需 Android Studio）

### Install Java

### 安装 Java

```console
$ sudo apt update
$ sudo apt install default-jre
$ sudo apt install default-jdk
```

### Install the Android SDKs

### 安装 Android SDK

Download the [Android SDK tools][] and
select the "Command Line Tools only" option.

下载 [Android SDK tools][]，
然后勾选 “Command Line Tools only” 选项。

Drag and drop the downloaded zip into your Linux Files folder through the
ChromeOS Files app. This moves the file to the home directory,
and is referred to as $TOOLS_PATH going forward (`~/`).

通过 ChromeOS 文件应用，
把下载好的 zip 文件拖放到你的 Linux 文件文件夹中。
这个操作会把文件移动到主目录，接下来会被称为 $TOOLS_PATH（`~/`）。

Unzip the tools and then add it to your path.

解压缩下载的工具并且将解压缩的文件添加到路径中。

```console
$ unzip ~/sdk-tools-linux*
$ export PATH="$PATH:$TOOLS_PATH/tools/bin"
```

Navigate to where you'd like to keep the SDK packages
($PLATFORM_PATH in these snippets) and download the SDK
packages using the sdkmanager tool (version numbers here are
the latest at time of publishing):

将 SDK 包放置到你熟悉的路径下（对应的路径变量是 $PLATFORM_PATH）。
然后使用 sdkmanager 工具下载 SDK 包 （这里的版本号是最新的发布版本）：

```console
$ sdkmanager "build-tools;28.0.3" "emulator" "tools" "platform-tools" "platforms;android-28" "extras;google;google_play_services" "extras;google;webdriver" "system-images;android-28;google_apis_playstore;x86_64"
```

Add the Android platform tools to your path (you should find this where you
ran the sdkmanager command: $PLATFORM_PATH):

将 Android 平台工具添加到你的路径下
（和 sdkmanager 所处的路径一致，也就是 $PLATFORM_PATH）：

```console
$ export PATH="$PATH:$PLATFORM_PATH/platform-tools"
```

Set the `ANDROID_SDK_ROOT` variable to where you unzipped sdk-tools before (aka
your $TOOLS_PATH):

将 `ANDROID_SDK_ROOT` 设置为你之前解压缩 sdk-tools 的路径
（也是你的 $TOOLS_PATH 路径）：

```console
$ export ANDROID_SDK_ROOT="$TOOLS_PATH"
```

Now, run flutter doctor to accept the android-licenses:

现在，你可以运行 flutter doctor 来获取 android-licenses：

```console
$ flutter doctor --android-licenses
```

[Android SDK tools]: {{site.android-dev}}studio/#downloads
