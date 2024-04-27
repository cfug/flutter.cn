---
# title: Deprecated Splash Screen API Migration
title: 从已弃用的闪屏页 API 迁移
# description: How to migrate from Manifest/Activity defined splash screen.
description: 如何将 Manifest/Activity 定义的闪屏页进行迁移。
---

Prior to Flutter 2.5, Flutter apps could add a splash
screen by defining it within the metadata of their application manifest file
(`AndroidManifest.xml`), by implementing [`provideSplashScreen`][] within
their [`FlutterActivity`][], or both. This would display momentarily in between
the time after the Android launch screen is shown and when Flutter has
drawn the first frame. This approach is now deprecated as of Flutter 2.5.
Flutter now automatically keeps the Android launch screen displayed
until it draws the first frame.

在 Flutter 2.5 版本之前，Flutter 应用程序可以通过定义 manifest 文件 (`AndroidManifest.xml`) 
中的元数据，或在其 [`FlutterActivity`][] 中实现 [`provideSplashScreen`][]，
再或者两者兼顾使用，来添加闪屏页。
闪屏页会在 Android 启动页显示后，Flutter 首帧绘制前短暂显示。
从 Flutter 2.5 版本起，这种方式已被弃用。
Flutter 现在会自动保持显示 Android 启动页，直至首帧绘制。

To migrate from defining a custom splash screen to just defining a custom
launch screen for your application, follow the steps that correspond
to how your application's custom splash screen was defined
prior to the 2.5 release.

请按照 Flutter 2.5 版本之前自定义应用程序闪屏页相应的操作步骤，
将自定义的闪屏页迁移到只用自定义应用程序的启动页。

**Custom splash screen defined in [`FlutterActivity`][]**

**在 [`FlutterActivity`][] 中自定义闪屏页**

1. Locate your application's implementation of `provideSplashScreen()`
   within its `FlutterActivity` and **delete it**. This implementation should involve
   the construction of your application's custom splash screen
   as a `Drawable`. For example:

   在应用程序的 `FlutterActivity` 中找到 `provideSplashScreen()` 方法的实现并 **将其删除**。
   该方法应该包括了将应用程序的自定义闪屏页构建成一个 `Drawable` 的实现。
   例如：

   ```java
   @Override
   public SplashScreen provideSplashScreen() {
       // ...
       return new DrawableSplashScreen(
           new SomeDrawable(
               ContextCompat.getDrawable(this, R.some_splash_screen)));
   }
   ```

2. Use the steps in the section directly following to ensure that your
   `Drawable` splash screen (`R.some_splash_screen` in the previous example)
   is properly configured as your application's custom launch screen.

   请按照接下来章节中的步骤，确保你的 `Drawable` 闪屏页
   （上个步骤示例中的 `R.some_splash_screen`）
   已正确配置为应用程序的自定义启动页。

**Custom splash screen defined in Manifest**

**在 Manifest 中自定义闪屏页**

1. Locate your application's `AndroidManifest.xml` file.
   Within this file, find the `activity` element.
   Within this element, identify the `android:theme` attribute
   and the `meta-data` element that defines
   a splash screen as an
   `io.flutter.embedding.android.SplashScreenDrawable`,
   and update it. For example:

   在应用程序的 `AndroidManifest.xml` 文件中找到 `activity` 元素。
   在此元素中，找到 `android:theme` 属性以及
   定义闪屏页为 `io.flutter.embedding.android.SplashScreenDrawable` 
   的 `meta-data` 元素，以便在后续的步骤中进行更新。
   例如：

   ```xml
   <activity
       // ...
       android:theme="@style/SomeTheme">
     // ...
     <meta-data
         android:name="io.flutter.embedding.android.SplashScreenDrawable"
         android:resource="@drawable/some_splash_screen"
         />
   </activity>
   ```

2. If the `android:theme` attribute isn't specified, add the attribute and
   [define a launch theme][] for your application's launch screen.

   如果未指定 `android:theme` 属性，请添加该属性
   并为应用程序的启动页 [定义启动主题][define a launch theme]

3. Delete the `meta-data` element, as Flutter no longer
   uses that, but it can cause a crash.

   删除 `meta-data` 元素，因为 Flutter 不再使用该元素，
   如果保留它可能会导致崩溃。

4. Locate the definition of the theme specified by the `android:theme` attribute
   within your application's `style` resources. This theme specifies the
   launch theme of your application. Ensure that the `style` attribute configures the
   `android:windowBackground` attribute with your custom splash screen. For example:

   在应用程序的 `style` 资源中找到由 `android:theme` 属性指定的主题。
   该主题指定了应用程序的启动主题。
   请确保 `style` 将 `android:windowBackground` 属性配置为你的自定义闪屏页。
   例如：

   ```xml
   <resources>
       <style
           name="SomeTheme"
           // ...
           >
           <!-- Show a splash screen on the activity. Automatically removed when
                Flutter draws its first frame -->
           <item name="android:windowBackground">@drawable/some_splash_screen</item>
       </style>
   </resources>
   ```

[`provideSplashScreen`]: {{site.api}}/javadoc/io/flutter/embedding/android/SplashScreenProvider.html#provideSplashScreen--
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[define a launch theme]:  /platform-integration/android/splash-screen
