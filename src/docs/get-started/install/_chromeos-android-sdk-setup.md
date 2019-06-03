## Android setup (without Android Studio)

## Android 安装（无需 Android Studio）

### Install Java

### 安装 Java

```terminal
$ sudo apt update
$ sudo apt install default-jre
$ sudo apt install default-jdk
```

### Install the Android SDK's

### 安装 Android SDK

Download the [Android SDK tools]({{site.android-dev}}/studio/#downloads) and 
select the “Command Line Tools only” option.

下载 [Android SDK tools]({{site.android-dev}}/studio/#downloads)，然后勾选 “Command Line Tools only” 选项。

Drag and drop the downloaded zip into your Linux Files folder through the 
Chrome OS Files app. This moves it to the home directory, notated as $TOOLS_PATH 
going forward (`~/`).

通过 Chrome OS Files 应用程序将下载的 zip 文件拖到 Linux Files 文件夹。本操作会将该文件添加到家目录下，相对路径用 $TOOLS_PATH 表示家目录下的目录（`~/`）。

Unzip the tools and then add it to your path.

解压缩下载的工具并且将解压缩的文件添加到路径中。

```terminal
$ unzip ~/sdk-tools-linux*
$ export PATH="$PATH:$TOOLS_PATH/tools/bin"
```

Navigate to where you'd like to keep the SDK packages ($PLATFORM_PATH in these snippets) and download the SDK packages using the sdkmanager tool (version numbers here are 
the latest at time of publishing):

将 SDK 包放置到你熟悉的路径下（对应的路径变量是 $PLATFORM_PATH）。然后使用 sdkmanager 工具下载 SDK 包 （这里的版本号是最新的发布版本）：

```terminal
$ sdkmanager "build-tools;28.0.3" "emulator" "tools" "platform-tools" 
"platforms;android-28" "extras;google;google_play_services" 
"extras;google;webdriver" "system-images;android-28;google_apis_playstore;x86_64"
```

Add the Android platform tools to your path (you should find this where you 
ran the sdkmanager command: $PLATFORM_PATH):

将 Android 平台工具添加到你的路径下（和 sdkmanager 所处的路径一致，也就是 $PLATFORM_PATH）：

```terminal
$ export PATH="$PATH:$PLATFORM_PATH/platform-tools
```

Set the ANDROID_HOME variable to where you unzipped sdk-tools before (aka 
your $TOOLS_PATH):

将 ANDROID_HOME 设置为你之前解压缩 sdk-tools 的路径（也是你的 $TOOLS_PATH 路径）：

```terminal
$ export ANDROID_HOME="$TOOLS_PATH"
```

Now, run flutter doctor to accept the android-licenses:

现在，你可以运行 flutter doctor 来获取 android-licenses：

```terminal
$ flutter doctor --android-licenses
```