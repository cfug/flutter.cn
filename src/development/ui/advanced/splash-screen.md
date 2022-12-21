---
title: Adding a splash screen to your mobile app
title: 向应用添加闪屏页
short-title: Splash screens
short-title: 闪屏页
description: Learn how to add a splash screen to your mobile app.
description: 了解如何向你的应用添加一个闪屏页。
tags: 用户界面,Flutter UI
keywords: 闪屏页,启动页,Loading图,应用商店
---

<img src='/assets/images/docs/development/ui/splash-screen/android-splash-screen/splash-screens_header.png'
class="mw-100" alt="Add Splash Screen Header">

Splash screens (also known as launch screens)
provide a simple initial experience while your
mobile app loads. They set the stage for your
application, while allowing time for the app
engine to load and your app to initialize.
This guide teaches you how to use splash screens
appropriately on iOS and Android.

闪屏页（也称为启动页）是你的应用在启动时给用户的第一印象。
它们就像是你的应用的基础，同时允许你在它展示的时间里，
加载你的引擎和初始化你的应用。
本指南将展示如何在 Flutter 编写的移动应用中恰当地使用闪屏页。

{{site.alert.note}}

  For more information on implementing splash screens
  on web and desktop platforms, see the
  [Customizing web app initialization guide][].

  有关在 Web 和桌面平台上实现启动画面 (闪屏页) 的更多信息，请参阅 
  [自定义 Web 应用程序初始化指南][Customizing web app initialization guide]。

{{site.alert.end}}

## iOS launch screen

## iOS 启动页

All apps submitted to the Apple App Store
[must use an Xcode storyboard][] to
provide the app's launch screen.

所有应用在交付到 Apple 应用商店之前
[必须使用 Xcode storyboard][must use an Xcode storyboard]
以提供应用启动页面。

The default Flutter template includes an Xcode
storyboard named `LaunchScreen.storyboard`
that can be customized as you see fit with
your own assets. By default,
the storyboard displays a blank image,
but you can change this. To do so,
open the Flutter app's Xcode project
by typing `open ios/Runner.xcworkspace`
from the root of your app directory.
Then select `Runner/Assets.xcassets`
from the Project Navigator and
drop in the desired images to the `LaunchImage` image set.

默认的 Flutter 模板包括一个名为
`LaunchScreen.storyboard` 的 Xcode storyboard，
可以根据您的选择进行定制你自己的资源。
默认情况下，storyboard 将显示空白图像，但你可以修改它。
在项目根目录下执行 `open ios/Runner.xcworkspace` 
打开 Flutter 应用程序的 Xcode 项目。
然后从项目导航器中选择 `Runner/Assets.xcassets`，
并将所需图像拖拽至 `LaunchImage` 图像集中。

Apple provides detailed guidance for launch screens as
part of the [Human Interface Guidelines][].

Apple 在 [人机接口指南][Human Interface Guidelines]
部分中为发布启动页提供了详细的指南。

## Android launch screen

## Android 启动页

{{site.alert.warning}}

  If you are experiencing a crash from implementing a splash screen, you
  might need to migrate your code. See detailed instructions in the
  [Deprecated Splash Screen API Migration guide][].

  如果你在实现闪屏页的时候遇到崩溃的情况，你可能需要迁移一下代码了。
  请在 [这个文档][Deprecated Splash Screen API Migration guide] 里了解更多。

{{site.alert.end}}

In Android, there are two separate screens that you can control:
a _launch screen_ shown while your Android app initializes,
and a _splash screen_ that displays while the Flutter experience
initializes.

在 Android 中，你有两个可以分开控制的页面：
在 Android 应用初始化时的 **启动页**，
以及在 Flutter 初始化时的 **闪屏页**。

{{site.alert.note}}

  As of Flutter 2.5, the launch and splash screens have been
  consolidated—Flutter now only implements the Android launch screen,
  which is displayed until the framework draws the first frame.
  This launch screen can act as both an Android launch screen and an
  Android splash screen via customization, and thus, is referred to
  as both terms. For example of such customization, see the
  [Android splash screen sample app][].

  从 Flutter 2.5 开始，启动屏幕和闪屏页已经被合并。
  Flutter 现在只会实现 Android 启动屏幕，
  它会一直显示到框架绘制的第一帧。

  If, prior to 2.5, you used `flutter create` to create an app,
  and you run the app on 2.5 or later, it can cause the app to crash.
  For more info, see the [Deprecated Splash Screen API Migration guide][].

  如果在 2.5 版本之前使用 `flutter create` 命令创建了应用，
  并且在 2.5 或 2.5 以上的版本运行这个应用，这将会导致应用崩溃。
  更多详细信息，请参考文档
  [已弃用的闪屏页 API 迁移][Deprecated Splash Screen API Migration guide]。

{{site.alert.end}}

{{site.alert.note}}
  For apps that embed one or more Flutter screens within an
  existing Android app, consider
  [pre-warming a `FlutterEngine`][] and reusing the
  same engine throughout your app to minimize wait
  time associated with initialization of the Flutter engine.

  对于集成了多个 Flutter 内容的 Android 应用，可以考虑
  [预热 `FlutterEngine`][pre-warming a `FlutterEngine`]
  以及在整个应用中复用同一个 Flutter 引擎，
  以减少初始化的等待时间。

{{site.alert.end}}

### Initializing the app

### 应用初始化

Every Android app requires initialization time while the
operating system sets up the app's process.
Android provides the concept of a [launch screen][] to
display a `Drawable` while the app is initializing.

所有 Android 应用在操作系统准备应用进程时都需要一定的初始化时间。
因此 Android 提供了 [启动界面][launch screen] 的概念，
在应用初始化的时候显示 `Drawable`。

The default Flutter project template includes a definition
of a launch theme and a launch background. You can customize
this by editing `styles.xml`, where you can define a theme
whose `windowBackground` is set to the
`Drawable` that should be displayed as the launch screen.

默认的 Flutter 项目模板定义了启动主题和启动背景。
你可以在 `styles.xml` 中自定义一个主题，
将一个 `Drawable` 配置给该主题的 `windowBackground`，
它将作为启动页被展示。

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/launch_background</item>
</style>
```

### Define a normal theme

### 定义一个普通主题

In addition, `style.xml` defines a _normal theme_
to be applied to `FlutterActivity` after the launch
screen is gone. The normal theme background only shows
for a very brief moment after the splash screen disappears,
and during orientation change and `Activity` restoration.
Therefore, it's recommended that the normal theme use a
solid background color that looks similar to the primary
background color of the Flutter UI.

此外，在 `styles.xml` 中定义一个 **普通主题**，
当启动页消失后，它会应用在 `FlutterActivity` 上。
普通主题的背景仅仅展示非常短暂的时间，
例如，当启动页消失后、设备方向改变或者 `Activity` 恢复期间。
因此建议普通主题的背景颜色使用与 Flutter UI 主要背景颜色相似的纯色。

```xml
<style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/normal_background</item>
</style>
```

### Set up the FlutterActivity in AndroidManifest.xml

### 在 AndroidManifest.xml 中配置 FlutterActivity

In `AndroidManifest.xml`, set the `theme` of
`FlutterActivity` to the launch theme. Then,
add a metadata element to the desired `FlutterActivity`
to instruct Flutter to switch from the launch theme
to the normal theme at the appropriate time.

在 `AndroidManifest.xml` 中，
将 `FlutterActivity` 的 `theme` 设置为启动主题，
将元数据元素添加到所需的 `FlutterActivity`，
以知会 Flutter 在适当的时机从启动主题切换到普通主题。

```xml
<activity
    android:name=".MyActivity"
    android:theme="@style/LaunchTheme"
    // ...
    >
    <meta-data
        android:name="io.flutter.embedding.android.NormalTheme"
        android:resource="@style/NormalTheme"
        />
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
```

The Android app now displays the desired launch screen
while the app initializes.

如此一来，Android 应用程序就会在在初始化时展示对应的启动页面。

### Android S

See [Android Splash Screens][] first on how to configure your launch screen on
Android S.

请先查看 [Android 闪屏页面][Android Splash Screens]
了解如何在 Android S 上配置闪屏页。

As of Android S, you must use the new splash screen API in your `styles.xml` file.
Consider creating an alternate resource file for Android 12 and higher.
Also make sure that your background image is in line with the icon guidelines,
see [Android Splash Screens][] for more details.

从 Android S 开始，你必须在你的 `styles.xml` 文件中使用新的闪屏 API 了。
你需要考虑为 Android 12 和更高版本创建一个备用的资源文件，还要确保你的背景图片符合图标指南。
查看文档 [Android 闪屏页面][Android Splash Screens] 了解更多。

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowSplashScreenBackground">@color/bgColor</item>
    <item name="android:windowSplashScreenAnimatedIcon">@drawable/launch_background</item>
</style>
```

Make sure neither `io.flutter.embedding.android.SplashScreenDrawable` is set in
your manifest, nor is `provideSplashScreen` implemented, as these APIs are
deprecated. Doing so will cause the Android launch screen to fade smoothly into
the Flutter when the app is launched and you may experience a crash.

确保 `io.flutter.embedding.android.SplashScreenDrawable`
未在 manifest 中设置，且 `provideSplashScreen` 也没有具体实现，
这些 API 已被废弃。
如此一来 Android 的闪屏页可以在应用启动时平滑过渡到 Flutter。

Some apps may want to continue showing the last frame of the Android launch
screen in Flutter. For example, this preserves the illusion of a single frame
while additional loading continues in Dart. To achieve this, the following
Android APIs may be helpful:

某些应用可能希望在 Flutter 中继续显示 Android 闪屏页的最后一帧。
例如，保持一帧的展示，同时 Dart 继续加载其他内容。
想达到这样的效果，以下 API 可能有帮助：

{% samplecode android-splash-alignment %}
{% sample Java %}
<!--code-excerpt "MainActivity.java" title-->
```java
import android.os.Build;
import android.os.Bundle;
import android.window.SplashScreenView;
import androidx.core.view.WindowCompat;
import io.flutter.embedding.android.FlutterActivity;

public class MainActivity extends FlutterActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Aligns the Flutter view vertically with the window.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            // Disable the Android splash screen fade out animation to avoid
            // a flicker before the similar frame is drawn in Flutter.
            getSplashScreen()
                .setOnExitAnimationListener(
                    (SplashScreenView splashScreenView) -> {
                        splashScreenView.remove();
                    });
        }

        super.onCreate(savedInstanceState);
    }
}
```
{% sample Kotlin %}
<!--code-excerpt "MainActivity.kt" title-->
```kotlin
import android.os.Build
import android.os.Bundle
import androidx.core.view.WindowCompat
import io.flutter.embedding.android.FlutterActivity

class MainActivity : FlutterActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Aligns the Flutter view vertically with the window.
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      // Disable the Android splash screen fade out animation to avoid
      // a flicker before the similar frame is drawn in Flutter.
      splashScreen.setOnExitAnimationListener { splashScreenView -> splashScreenView.remove() }
    }

    super.onCreate(savedInstanceState)
  }
}
```
{% endsamplecode %}

Then, you can reimplement the first frame in Flutter that shows elements of your
Android launch screen in the same positions on screen.
For an example of this, see the [Android splash screen sample app][].

然后你可以重新实现 Flutter 的第一帧，将元素摆放在与 Android 闪屏页相同的位置。
关于这个的示例，请参考 [Android 闪屏页示例应用][Android splash screen sample app]。

[Android Splash Screens]: {{site.android-dev}}/about/versions/12/features/splash-screen
[launch screen]: {{site.android-dev}}/topic/performance/vitals/launch-time#themed
[pre-warming a `FlutterEngine`]: {{site.url}}/development/add-to-app/android/add-flutter-fragment#using-a-pre-warmed-flutterengine
[`provideSplashScreen`]: {{site.api}}/javadoc/io/flutter/embedding/android/SplashScreenProvider.html#provideSplashScreen--
[must use an Xcode storyboard]: {{site.apple-dev}}/news/?id=03042020b
[Human Interface Guidelines]: {{site.apple-dev}}/design/human-interface-guidelines/ios/visual-design/launch-screen/
[Android splash screen sample app]: {{site.github}}/flutter/samples/tree/main/android_splash_screen
[Deprecated Splash Screen API Migration guide]: {{site.url}}/development/platform-integration/android/splash-screen-migration
[Customizing web app initialization guide]: {{site.url}}/development/platform-integration/web/initialization
