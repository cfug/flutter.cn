---
title: Adding a splash screen to your mobile app
title: 向 Android 应用中添加闪屏页
short-title: Splash screens
short-title: 闪屏页
description: Learn how to add a splash screen to your mobile app.
description: 了解如何向你的 Android 应用添加一个闪屏页。
---

{% asset
development/ui/splash-screen/android-splash-screen/splash-screens_header.png
class="mw-100" alt="Add Splash Screen Header" %}

Splash screens (also known as launch screens) provide a simple initial
experience while your mobile app loads. They set the stage for your
application, while allowing time for the app engine to load and your
app to initialize. This guide teaches you how to use splash screens
appropriately on iOS and Android.

开启 Flutter 的体验需要短暂地等待 Dart 的初始化。
一个完整的 Flutter 应用还额外需要 Android 应用程序标准的初始化时间。
Flutter 支持在 Android 应用初始化的时候展示启动页，
并且还支持在你的 Flutter 初始化时展示闪屏页。
本指南展示如何在 Flutter 编写的 Android 应用中使用启动页和闪屏页。

## iOS launch screen

## iOS 启动页

All apps submitted to the Apple App Store
[must use an Xcode storyboard][] to
provide the app's launch screen.

所有应用在交付到 Apple 应用商店之前 [必须使用 Xcode storyboard][must use an Xcode storyboard] 以提供应用启动页面。

The default Flutter template includes an Xcode storyboard named
`LaunchScreen.storyboard` that can be customized as you see fit with
your own assets. By default, the storyboard displays a blank image,
but you can change this. To do so, open the Flutter app's Xcode project
by typing `open ios/Runner.xcworkspace` from the root of your app directory.
Then select `Runner/Assets.xcassets` from the Project Navigator and
drop in the desired images to the `LaunchImage` image set.

默认的 Flutter 模板包括一个名为 `LaunchScreen.storyboard` 的 Xcode storyboard，
可以根据您的选择进行定制你自己的资源。
默认情况下，storyboard 将显示空白图像，但你可以修改它。
请通过点击项目根目录下的 `open ios/Runner.xcworkspace` 
打开 Flutter 应用程序的 Xcode 项目。
然后从项目导航器中选择 `Runner/Assets.xcassets`，
并将所需图像拖拽至 `LaunchImage` 图像集中。

Apple provides detailed guidance for launch screens as
part of the [Human Interface Guidelines][].

Apple 在[人机接口指南][Human Interface Guidelines]部分中为发布启动页提供了详细的指南。

## Android launch screen

## Android 启动页

In Android, there are two separate screens that you can control:
a _launch screen_ shown while your Android app initializes,
and a _splash screen_ that displays while the Flutter experience
initializes.

{{site.alert.note}}

  For apps that embed one or more Flutter screens within an
  existing Android app, consider
  [pre-warming a `FlutterEngine`][] and reusing the
  same engine throughout your app to minimize wait
  time associated with initialization of the Flutter engine.

  使用一些策略来最小化 Flutter 初始化相关过程中的等待时间。
  考虑 [预热 FlutterEngine][pre-warming a FlutterEngine] 以及 
  [在整个应用中复用 FlutterEngine][re-using a FlutterEngine throughout your app] ，
  以避免大多数的等待时间。

{{site.alert.end}}

### Initializing the app

### 应用初始化

Every Android app requires initialization time while the
operating system sets up the app's process.
Android provides the concept of a [launch screen][] to
display a `Drawable` while the app is initializing.

当操作系统执行应用进程时，所有 Android app 都需要一定的初始化时间。
因此 Android 提供了 [launch screen][] 的概念，
它在应用初始化的时候显示 `Drawable`。

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
Therefore, it is recommended that the normal theme use a
solid background color that looks similar to the primary
background color of the Flutter UI.

此外，在 `styles.xml` 中定义一个普通主题，当启动页消失后，将其应用在 `FlutterActivity` 上。
普通主题的背景仅仅展示非常短暂的时间，比如当启动页消失后、方向改变或者 `Activity` 恢复期间。
因此对于普通主题的背景颜色，建议使用与 Flutter UI 主要背景颜色相似的纯色。

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
以指示 Flutter 在适当的时机从启动主题切换到普通主题。

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

现在，Android 应用程序在初始化时会展示对应的启动屏。

### The Flutter splash screen

### Flutter闪屏页

Each Flutter experience in an app requires a few moments
to initialize the Dart isolate that runs the code.
This means a user momentarily sees a blank screen
until Flutter renders its first frame. Flutter supports
an improved user experience by displaying an Android
`View` as a splash screen while Flutter initializes.

应用程序中的每种 Flutter 体验都需要一些时间以初始化运行代码的 Dart isolate。
这意味着用户将暂时地看到空白屏幕，直到 Flutter 渲染其第一帧为止。
为了提升用户体验，Flutter 提供了在其初始化时展示一个 Android `View` 作为闪屏页的方式。

Flutter supports two options for a splash screen.
The first option is to  display a `Drawable` of
your choice, which fades out after the initialization
is complete. The other option is to provide a custom
`SplashScreen` that is capable of displaying any
Android `View` content that you want.

针对 Flutter 的闪屏页，这里提供了两个可选项。
第一个可选项是展示一个你选择的 `Drawable`，
并在其初始化完成后淡出。
另外一个可选项是提供一个自定义的`闪屏页`，
它能够展示出任意你想要的 Android `View` 内容。

### Showing a Drawable splash screen

### 展示Drawable闪屏页

A `Drawable` splash screen can be configured for a
`FlutterActivity`, `FlutterFragment`, or `FlutterView`.

`Drawable` 闪屏页可被配置在 `FlutterActivity`、`FlutterFragment` 或者 `FlutterView` 中。

#### In a FlutterActivity

#### 在FlutterActivity中配置

To display a `Drawable` as a Flutter splash screen
in a `FlutterActivity`, add the following metadata
to the associated `FlutterActivity` in `AndroidManifest.xml`.

在 `FlutterActivity` 中将一个 `Drawable` 作为 Flutter 闪屏页进行展示，请将以下元数据
添加到 `AndroidManifest.xml` 中所关联的 `FlutterActivity` 中。

```xml
<meta-data
    android:name="io.flutter.embedding.android.SplashScreenDrawable"
    android:resource="@drawable/my_splash"
    />
```

To display a splash screen with the same visual as a launch screen,
reference the same `@drawable/launch_background` in the
`io.flutter.embedding.android.SplashScreenDrawable` `meta-data`.

为了将闪屏页展示出与启动页相同的效果，在 
`io.flutter.embedding.android.SplashScreenDrawable` 和 `meta-data`
中引用相同的 `@drawable/launch_background`。

#### In a FlutterFragment

#### 在FlutterFragment中配置

To display a `Drawable` as a Flutter splash screen in a
`FlutterFragment`, make `FlutterFragment` a subclass and override
`provideSplashScreen()`.

在 `FlutterFragment` 中将一个 `Drawable` 作为 Flutter 闪屏页进行展示，
创建一个 `FlutterFragment` 的子类并重写其 `provideSplashScreen()` 方法。

```java
public class MyFlutterFragment extends FlutterFragment {
    @Override
    protected SplashScreen provideSplashScreen() {
        // Load the splash Drawable.
        Drawable splash = getResources().getDrawable(R.drawable.my_splash);

        // Construct a DrawableSplashScreen with the loaded splash
        // Drawable and return it.
        return new DrawableSplashScreen(splash);
    }
}
```

### Creating a custom SplashScreen

### 创建一个自定义的闪屏页

Splash screens are a great branding opportunity.
Because of that, many apps implement unique,
highly customized splash experiences. To facilitate this,
Flutter allows you to display an arbitrary Android `View` as a splash
screen, and even allows you to control how that `View` transitions to
Flutter after Flutter renders its first frame.

闪屏页是一个非常好推广品牌的时机。因此，很多应用实现了独特且高度定制化的闪屏体验。
为方便起见，Flutter 允许你将任意的 Android `View` 作为显示屏进行展示，甚至可以
控制 Flutter 第一帧渲染完毕之后如何将 `View` 过渡到 Flutter。

#### Implement a custom splash View

#### 实现一个自定义闪屏View

First, define the custom `View` that should be displayed
as the splash screen. This `View` could display anything,
from a simple solid color to an animation.

首先，定义一个将被作为闪屏页展示的自定义 `View`。
该 `View` 可以展示任意内容，从简单的纯色到一个动画。

#### Implement the SplashScreen interface

#### 实现SplashScreen接口

With a custom `View` defined, implement the `SplashScreen` interface.

为已声明的自定义 `View` 实现 `SplashScreen` 接口。

This guide shows two approaches to a `SplashScreen`
implementation. First, the following is an example of a
`SplashScreen` that has no visual state and no transition
animation.

本指南展示了两种实现 `SplashScreen` 的方式。首先，下面是一个 `SplashScreen` 的示例，它既没
有视觉状态，也没有过渡动画。

```java
public class SimpleSplashScreen implements SplashScreen {
    @Override
    @Nullable
    public View createSplashView(
      @NonNull Context context,
      @Nullable Bundle savedInstanceState
    ) {
        // Return a new MySplashView without saving a reference, because it
        // has no state that needs to be tracked or controlled.
        return new MySplashView(context);
    }

    @Override
    public void transitionToFlutter(@NonNull Runnable onTransitionComplete) {
        // Immediately invoke onTransitionComplete because this SplashScreen
        // doesn't display a transition animation.
        //
        // Every SplashScreen *MUST* invoke onTransitionComplete at some point
        // for the splash system to work correctly.
        onTransitionComplete.run();
    }
}
```

The second example is a bit more sophisticated.
In this example, the custom `SplashScreen` keeps
a reference to its custom `View` and instructs the custom
`View` to transition away, passing the `onTransitionComplete`
callback to the custom `View` to invoke.

第二个示例更为复杂。在此示例中，自定义 `SplashScreen` 保留了对其自定义 `View` 的引用，并
指示自定义 `View` 的过渡效果，将 `onTransitionComplete` 回调传递给自定义 `View` 进行调用。

```java
public class SplashScreenWithTransition implements SplashScreen {
    private MySplashView mySplashView;

    @Override
    @Nullable
    public View createSplashView(
      @NonNull Context context,
      @Nullable Bundle savedInstanceState
    ) {
        // A reference to the MySplashView is retained so that it can be told
        // to transition away at the appropriate time.
        mySplashView = new MySplashView(context);
        return mySplashView;
    }

    @Override
    public void transitionToFlutter(@NonNull Runnable onTransitionComplete) {
        // Instruct MySplashView to animate away in whatever manner it wants.
        // The onTransitionComplete Runnable is passed to the MySplashView
        // to be invoked when the transition animation is complete.
        mySplashView.animateAway(onTransitionComplete);
    }
}
```

With custom splash screens, the sky is the limit.
But use the power you have with responsibility: a
splash screen that is too complex may frustrate your
users by adding to your app's load time.
UX Collective provides some good
tips on how to build a [dynamic yet performant splash screen][].

对于自定义的闪屏页而言，天空才是极限。实际上，你可以创建一个展示天空动画的闪屏页！享受这个
灵活的启动系统所带来的乐趣，并在社区中分享你的创作！

[dynamic yet performant splash screen]: https://uxdesign.cc/building-the-perfect-splash-screen-46e080395f06
[launch screen]: {{site.android-dev}}/topic/performance/vitals/launch-time#themed
[pre-warming a `FlutterEngine`]: /docs/development/add-to-app/android/add-flutter-fragment#using-a-pre-warmed-flutterengine
[must use an Xcode storyboard]: https://developer.apple.com/news/?id=03042020b
[Human Interface Guidelines]: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/launch-screen/
