---
title: Deep linking
description: Navigate to routes when the app receives a new URL
---

Flutter supports deep linking on iOS, Android, and web browsers. Opening a URL displays that screen in your app. With the following
steps, you can launch and display routes by using named routes (either with the
[`routes`][routes] parameter or [`onGenerateRoute`][onGenerateRoute]), or by
using the [`Router`][Router] widget.

If you're running the app in a web browser, there's no additional setup
required. Route paths are handled in the same way as an iOS or Android deep
link. By default, web apps read the deep link path from the url fragment using
the pattern: `/#/path/to/app/screen`, but this can be changed by [configuring
the URL strategy] for your app.

To follow along, clone the [Navigation and Routing][router-sample] in
flutter/samples.

## Enable deep linking on Android

Add a metadata tag and [intent filter][] to `AndroidManifest.xml`
inside the `<activity> `tag with the `".MainActivity"` name:

```
<!-- Deep linking -->
<meta-data android:name="flutter_deeplinking_enabled" android:value="true" />
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="http" android:host="flutterbooksample.com" />
    <data android:scheme="https" />
</intent-filter>
```

A full restart is required to apply these changes.

## Test on Android emulator
To test with an Android emulator, give the `adb` command an intent where the
host name matches the name defined in `AndroidManifest.xml`:

```
adb shell am start -a android.intent.action.VIEW \
    -c android.intent.category.BROWSABLE \
    -d "http://flutterbooksample.com/book/1"
```

For more details, see the [Verify Android App Links][verify-android-links]
documentation in the Android docs.

## Enable deep linking on iOS
Add two new keys to `Info.plist` in the ios/Runner directory:

```
<key>FlutterDeepLinkingEnabled</key>
<true/>
<key>CFBundleURLTypes</key>
<array>
    <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>flutterbooksample.com</string>
    <key>CFBundleURLSchemes</key>
    <array>
    <string>customscheme</string>
    </array>
    </dict>
</array>
```

The `CFBundleURLName` is a unique URL used to distinguish your app from others
that use the same scheme. The scheme (`customscheme://`)  can also be unique.

A full restart is required to apply these changes.

## Test on iOS simulator
Use the `xcrun` command to test on the iOS Simulator:

```
xcrun simctl openurl booted customscheme://flutterbooksample.com/book/1 
```

## Migrating from plugin-based deep linking

If you have written a plugin to handle deep links, as described in ["Deep Links
and Flutter applications" on Medium][plugin-linking], it will continue to work
until you opt-in to this behavior by adding `FlutterDeepLinkingEnabled` to
`Info.plist` or `flutter_deeplinking_enabled` to `AndroidManifest.xml`,
respectively.

## Behavior

The behavior varies slightly based on the platform and whether the app is
launched and running.

<div class="table-wrapper" markdown="1">
| Platform / Scenario      | Using Navigator                                                     | Using Router                                                                                                                                                                                        |
|--------------------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| iOS (not launched)       | App gets initialRoute ("/") and a short time after gets a pushRoute | App gets initialRoute ("/") and a short time after uses the RouteInformationParser to parse the route and call RouterDelegate.setNewRoutePath, which configures the Navigator with the corresponding Page. |
| Android - (not launched) | App gets initialRoute containing the route ("/deeplink")            | App gets initialRoute ("/deeplink") and passes it to the RouteInformationParser to parse the route and call RouterDelegate.setNewRoutePath, which configures the Navigator with the corresponding Pages.   |
| iOS (launched)           | pushRoute is called                                                 | Path is parsed, and the Navigator is configured with a new set of Pages.                                                                                                                                   |
| Android (launched)       | pushRoute is called                                                 | Path is parsed, and the Navigator is configured with a new set of Pages.                                                                                                                                   |
{:.table.table-striped}
</div>

When using the [`Router`][Router] widget, your app has the ability to replace the
current set of pages when a new deep link is opened while the app is running.

## See also

[Learning Flutter’s new navigation and routing system][] provides an introduction to the Router system.

[Learning Flutter’s new navigation and routing system]: https://medium.com/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[switching-channels]: {{site.url}}/development/tools/sdk/upgrading#switching-flutter-channels
[routes]: {{site.api}}/flutter/material/MaterialApp/routes.html
[onGenerateRoute]: {{site.api}}/flutter/material/MaterialApp/onGenerateRoute.html
[Router]: {{site.api}}/flutter/widgets/Router-class.html
[Navigator 2.0]: {{site.flutter-medium}}/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[intent filter]: {{site.android-dev}}/guide/components/intents-filters
[plugin-linking]: {{site.medium}}/flutter-community/deep-links-and-flutter-applications-how-to-handle-them-properly-8c9865af9283
[verify-android-links]: {{site.android-dev}}/training/app-links/verify-site-associations
[router-sample]: {{site.repo.samples}}/tree/main/navigation_and_routing

[configuring the URL strategy]: {{site.url}}/development/ui/navigation/url-strategies
