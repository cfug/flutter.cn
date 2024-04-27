---
# title: Adding a splash screen to your Android app
title: 向 Android 应用添加启动页（闪屏页）
# short-title: Splash screens
short-title: 启动页（闪屏页）
# description: Learn how to add a splash screen to your Android app.
description: 了解如何向你的 Android 应用添加一个启动页。
tags: 用户界面,Flutter UI
keywords: 启动页,闪屏页,Loading图,应用商店
---

<img src='/assets/images/docs/development/ui/splash-screen/android-splash-screen/splash-screens_header.png'
class="mw-100" alt="A graphic outlining the launch flow of an app including a splash screen">

Splash screens (also known as launch screens) provide 
a simple initial experience while your Android app loads. 
They set the stage for your application, 
while allowing time for the app engine 
to load and your app to initialize.

闪屏页（也称为启动页）是你的应用在启动时给用户的第一印象。
它们就像是你的应用的基础，同时允许你在它展示的时间里，
加载你的引擎和初始化你的应用。
本指南将展示如何在 Flutter 编写的移动应用中恰当地使用闪屏页。

## Overview

## Android 启动页

:::warning

If you are experiencing a crash from implementing a splash screen, you
might need to migrate your code. See detailed instructions in the
[Deprecated Splash Screen API Migration guide][].

如果你在实现闪屏页的时候遇到崩溃的情况，你可能需要迁移一下代码了。
请在 [这个文档][Deprecated Splash Screen API Migration guide] 里了解更多。

:::

In Android, there are two separate screens that you can control:
a _launch screen_ shown while your Android app initializes,
and a _splash screen_ that displays while the Flutter experience
initializes.

在 Android 中，你有两个可以分开控制的页面：
在 Android 应用初始化时的 **启动页**，
以及在 Flutter 初始化时的 **闪屏页**。

:::note

As of Flutter 2.5, the launch and splash screens have been
consolidated—Flutter now only implements the Android launch screen,
which is displayed until the framework draws the first frame.
This launch screen can act as both an Android launch screen and an
Android splash screen via customization, and thus, is referred to
as both terms. For example of such customization, check out the
[Android splash screen sample app][].

从 Flutter 2.5 开始，启动屏幕和闪屏页已经被合并。
Flutter 现在只会实现 Android 启动屏幕，
它会一直显示到框架绘制的第一帧。
这个启动屏幕既可以作为 Android 的启动屏幕，
也可以通过定制作为 Android 的闪屏，因此，它被称为这两个术语。
例如，要查看这种定制的例子，请查看 [Android 闪屏示例应用][Android splash screen sample app]。

If, prior to 2.5, you used `flutter create` to create an app,
and you run the app on 2.5 or later, the app might crash.
For more info, see the [Deprecated Splash Screen API Migration guide][].

如果在 2.5 版本之前使用 `flutter create` 命令创建了应用，
并且在 2.5 或 2.5 以上的版本运行这个应用，这将会导致应用崩溃。
更多详细信息，请参考文档
[已弃用的闪屏页 API 迁移][Deprecated Splash Screen API Migration guide]。

:::

:::note

For apps that embed one or more Flutter screens within an
existing Android app, consider
[pre-warming a `FlutterEngine`][] and reusing the
same engine throughout your app to minimize wait
time associated with initialization of the Flutter engine.

对于集成了多个 Flutter 内容的 Android 应用，可以考虑
[预热 `FlutterEngine`][pre-warming a `FlutterEngine`]
以及在整个应用中复用同一个 Flutter 引擎，
以减少初始化的等待时间。

:::

## Initializing the app

### 应用初始化

Every Android app requires initialization time while the
operating system sets up the app's process.
Android provides the concept of a [launch screen][] to
display a `Drawable` while the app is initializing.

所有 Android 应用在操作系统准备应用进程时都需要一定的初始化时间。
因此 Android 提供了 [启动界面][launch screen] 的概念，
在应用初始化的时候显示 `Drawable`。

A `Drawable` is an Android graphic.
To learn how to add a `Drawable` to your
Flutter project in Android Studio,
check out [Import drawables into your project][drawables]
in the Android developer documentation.

`Drawable` 是一种 Android 图形图像处理。
要了解如何在 Android Studio 中
为 Flutter 添加 `Drawable`，
请查阅 Android 开发者文档：[将可绘制对象导入项目中][drawables]

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

In addition, `styles.xml` defines a _normal theme_
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

[drawables]: {{site.android-dev}}/studio/write/resource-manager#import

## Set up the FlutterActivity in AndroidManifest.xml

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

## Android 12

To configure your launch screen on Android 12,
check out [Android Splash Screens][].

请先查看 [Android 闪屏页面][Android Splash Screens]
了解如何在 Android 12 上配置闪屏页。

As of Android 12, you must use the new splash screen
API in your `styles.xml` file.
Consider creating an alternate resource file for Android 12 and higher.
Also make sure that your background image is in line with
the icon guidelines;
check out [Android Splash Screens][] for more details.

从 Android 12 开始，你必须在你的 `styles.xml` 文件中使用新的闪屏 API 了。
你需要考虑为 Android 12 和更高版本创建一个备用的资源文件，还要确保你的背景图片符合图标指南。
查看文档 [Android 闪屏页面][Android Splash Screens] 了解更多。

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowSplashScreenBackground">@color/bgColor</item>
    <item name="android:windowSplashScreenAnimatedIcon">@drawable/launch_background</item>
</style>
```

Make sure that
`io.flutter.embedding.android.SplashScreenDrawable` is
**not** set in your manifest, and that `provideSplashScreen`
is **not** implemented, as these APIs are deprecated.
Doing so causes the Android launch screen to fade smoothly
into the Flutter when the
app is launched and the app might crash.

确保 `io.flutter.embedding.android.SplashScreenDrawable`
未在 manifest 中设置，且 `provideSplashScreen` 也没有具体实现，
这些 API 已被废弃。
如此一来 Android 的闪屏页可以在应用启动时平滑过渡到 Flutter。

Some apps might want to continue showing the last frame of
the Android launch screen in Flutter. For example,
this preserves the illusion of a single frame
while additional loading continues in Dart.
To achieve this, the following
Android APIs might be helpful:

某些应用可能希望在 Flutter 中继续显示 Android 闪屏页的最后一帧。
例如，保持一帧的展示，同时 Dart 继续加载其他内容。
想达到这样的效果，以下 API 可能有帮助：

{% samplecode "android-splash-alignment", "Kotlin,Java" %}
{% sample "Kotlin" %}

```kotlin title="MainActivity.kt"
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

{% endsample %}
{% sample "Java" %}

```java title="MainActivity.java"
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

{% endsample %}
{% endsamplecode %}

Then, you can reimplement the first frame in Flutter
that shows elements of your Android launch screen in
the same positions on screen.
For an example of this, check out the
[Android splash screen sample app][].

然后你可以重新实现 Flutter 的第一帧，将元素摆放在与 Android 闪屏页相同的位置。
关于这个的示例，请参考 [Android 闪屏页示例应用][Android splash screen sample app]。

[Android Splash Screens]: {{site.android-dev}}/about/versions/12/features/splash-screen
[launch screen]: {{site.android-dev}}/topic/performance/vitals/launch-time#themed
[pre-warming a `FlutterEngine`]: /add-to-app/android/add-flutter-fragment#using-a-pre-warmed-flutterengine
[Android splash screen sample app]: {{site.repo.samples}}/tree/main/android_splash_screen
[Deprecated Splash Screen API Migration guide]: /release/breaking-changes/splash-screen-migration
[Customizing web app initialization guide]: /platform-integration/web/initialization
