---
title: Writing custom platform-specific code
title: 撰写双端平台代码（插件编写实现）
short-title: Platform-specific code
short-title: 平台相关代码
description: Learn how to write custom platform-specific code in your app.
description: 学习如何撰写原生实现的代码。
---

This guide describes how to write custom platform-specific code. Some
platform-specific functionality is available through existing packages;
see [using packages](/docs/development/packages-and-plugins/using-packages).

Flutter uses a flexible system that allows you to call platform-specific APIs
whether available in Java or Kotlin code on Android,
or in Objective-C or Swift code on iOS.

Flutter's platform-specific API support does not rely on code generation,
but rather on a flexible message passing style:

* The Flutter portion of the app sends messages to its *host*,
  the iOS or Android portion of the app, over a platform channel.

* The *host* listens on the platform channel, and receives the message.
  It then calls into any number of platform-specific APIs&mdash;using
  the native programming language&mdash;and sends a response back to the
  *client*, the Flutter portion of the app.
 
{{site.alert.note}}
  This guide addresses using the platform channel mechanism if you need 
  to use the platform's APIs or libraries in Java/Kotlin/Objective-C or Swift.
  But you can also write platform-specific Dart code in your Flutter app
  by inspecting the
  [defaultTargetPlatform]({{site.api}}/flutter/foundation/defaultTargetPlatform.html)
  property. [Platform adaptations](/docs/resources/platform-adaptations)
  lists some platform-specific adaptations that Flutter automatically does
  for you in the framework.
{{site.alert.end}}

## Architectural overview: platform channels {#architecture}

Messages are passed between the client (UI) and host (platform) using platform
channels as illustrated in this diagram:

![Platform channels architecture](/images/PlatformChannels.png)

Messages and responses are passed asynchronously,
to ensure the user interface remains responsive.

On the client side, `MethodChannel` ([API][MethodChannel]) enables sending
messages that correspond to method calls. On the platform side, `MethodChannel`
on Android ([API][MethodChannelAndroid]) and `FlutterMethodChannel` on iOS
([API][MethodChanneliOS]) enable receiving method calls and sending back a
result. These classes allow you to develop a platform plugin with very little
'boilerplate' code.

*Note*: If desired, method calls can also be sent in the reverse direction,
with the platform acting as client to methods implemented in Dart.
A concrete example of this is the
[`quick_actions`]({{site.pub}}/packages/quick_actions) plugin.

[MethodChannel]: {{site.api}}/flutter/services/MethodChannel-class.html
[MethodChannelAndroid]: {{site.api}}/javadoc/io/flutter/plugin/common/MethodChannel.html
[MethodChanneliOS]: {{site.api}}/objcdoc/Classes/FlutterMethodChannel.html

### Platform channel data types support and codecs {#codec}

The standard platform channels use a standard message codec that supports
efficient binary serialization of simple JSON-like values, such as booleans,
numbers, Strings, byte buffers, and List and Maps of these (see
[`StandardMessageCodec`]({{site.api}}/flutter/services/StandardMessageCodec-class.html))
for details). The serialization and deserialization of these values to and from
messages happens automatically when you send and receive values.

The following table shows how Dart values are received on the platform side and vice versa:

| Dart        | Android             | iOS
|-------------|---------------------|----
| null        | null                | nil (NSNull when nested)
| bool        | java.lang.Boolean   | NSNumber numberWithBool:
| int         | java.lang.Integer   | NSNumber numberWithInt:
| int, if 32 bits not enough | java.lang.Long | NSNumber numberWithLong:
| double      | java.lang.Double    | NSNumber numberWithDouble:
| String      | java.lang.String    | NSString
| Uint8List   | byte[]   | FlutterStandardTypedData typedDataWithBytes:
| Int32List   | int[]    | FlutterStandardTypedData typedDataWithInt32:
| Int64List   | long[]   | FlutterStandardTypedData typedDataWithInt64:
| Float64List | double[] | FlutterStandardTypedData typedDataWithFloat64:
| List        | java.util.ArrayList | NSArray
| Map         | java.util.HashMap   | NSDictionary

<br>
## Example: Calling platform-specific iOS and Android code using platform channels {#example}

The following code demonstrates how to call a platform-specific API
to retrieve and display the current battery level.
It uses the Android `BatteryManager` API,
and the iOS `device.batteryLevel` API, via a single platform message,
`getBatteryLevel()`.

The example adds the platform-specific code inside the main app itself.
If you want to reuse the platform-specific code for multiple apps,
the project creation step is slightly different (see [developing
packages](/docs/development/packages-and-plugins/developing-packages#plugin)),
but the platform channel code is still written in the same way.

*Note*: The full, runnable source-code for this example is available in
[`/examples/platform_channel/`]({{site.github}}/flutter/flutter/tree/master/examples/platform_channel)
for Android with Java and iOS with Objective-C. For iOS with Swift, see
[`/examples/platform_channel_swift/`]({{site.github}}/flutter/flutter/tree/master/examples/platform_channel_swift).

### Step 1: Create a new app project {#example-project}

Start by creating a new app:

* In a terminal run: `flutter create batterylevel`

By default our template supports writing Android code using Java, or iOS code
using Objective-C. To use Kotlin or Swift, use the `-i` and/or `-a` flags:

* In a terminal run: `flutter create -i swift -a kotlin batterylevel`

### Step 2: Create the Flutter platform client {#example-client}

The app's `State` class holds the current app state.
Extend that to hold the current battery state.

First, construct the channel. Use a `MethodChannel` with a single
platform method that returns the battery level.

The client and host sides of a channel are connected through a channel name
passed in the channel constructor. All channel names used in a single app must
be unique; prefix the channel name with a unique 'domain
prefix', for example: `samples.flutter.dev/battery`.

<!-- skip -->
```dart
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
...
class _MyHomePageState extends State<MyHomePage> {
  static const platform = const MethodChannel('samples.flutter.dev/battery');

  // Get battery level.
}
```

Next, invoke a method on the method channel, specifying the concrete method
to call via the String identifier `getBatteryLevel`.
The call may fail&mdash;for example if the platform does not support the
platform API (such as when running in a simulator), so wrap the
`invokeMethod` call in a try-catch statement.

Use the returned result to update the user interface state in `_batteryLevel`
inside `setState`.

<!-- skip -->
```dart
  // Get battery level.
  String _batteryLevel = 'Unknown battery level.';

  Future<void> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final int result = await platform.invokeMethod('getBatteryLevel');
      batteryLevel = 'Battery level at $result % .';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '${e.message}'.";
    }

    setState(() {
      _batteryLevel = batteryLevel;
    });
  }
```

Finally, replace the `build` method from the template to contain a small user
interface that displays the battery state in a string,
and a button for refreshing the value.

<!-- skip -->
```dart
@override
Widget build(BuildContext context) {
  return Material(
    child: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          RaisedButton(
            child: Text('Get Battery Level'),
            onPressed: _getBatteryLevel,
          ),
          Text(_batteryLevel),
        ],
      ),
    ),
  );
}
```


### Step 3a: Add an Android platform-specific implementation using Java {#example-java}

*Note*: The following steps use Java. If you prefer Kotlin, skip to step
3b.

Start by opening the Android host portion of your Flutter app in Android Studio:

1. Start Android Studio

1. Select the menu item **File > Open...**

1. Navigate to the directory holding your Flutter app,
   and select the **android** folder inside it. Click **OK**.

1. Open the `MainActivity.java` file located in the **java** folder in the
   Project view.

Next, create a `MethodChannel` and set a `MethodCallHandler` inside the
`onCreate()` method. Make sure to use the same channel name as was used on the
Flutter client side.

```java
import io.flutter.app.FlutterActivity;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.MethodChannel.Result;

public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "samples.flutter.dev/battery";

    @Override
    public void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        GeneratedPluginRegistrant.registerWith(this);

        new MethodChannel(getFlutterView(), CHANNEL).setMethodCallHandler(
                new MethodCallHandler() {
                    @Override
                    public void onMethodCall(MethodCall call, Result result) {
                        // TODO
                    }
                });
    }
}
```

Add the Android Java code that uses the Android battery APIs to
retrieve the battery level. This code is exactly the same as you
would write in a native Android app.

First, add the needed imports at the top of the file:

```java
import android.content.ContextWrapper;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
```

Then add the following as a new method in the activity class,
below the `onCreate()` method:

```java
private int getBatteryLevel() {
  int batteryLevel = -1;
  if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
    BatteryManager batteryManager = (BatteryManager) getSystemService(BATTERY_SERVICE);
    batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
  } else {
    Intent intent = new ContextWrapper(getApplicationContext()).
        registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
    batteryLevel = (intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100) /
        intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
  }

  return batteryLevel;
}
```

Finally, complete the `onMethodCall()` method added earlier.
You need to handle a single platform method, `getBatteryLevel()`,
so test for that in the `call` argument. The implementation of
this platform method calls the Android code written
in the previous step, and returns a response for both
the success and error cases using the `response` argument.
If an unknown method is called, report that instead.

Remove the following code:

```java
public void onMethodCall(MethodCall call, Result result) {
    // TODO
}
```

And replace with the following:

```java
@Override
public void onMethodCall(MethodCall call, Result result) {
    if (call.method.equals("getBatteryLevel")) {
        int batteryLevel = getBatteryLevel();

        if (batteryLevel != -1) {
            result.success(batteryLevel);
        } else {
            result.error("UNAVAILABLE", "Battery level not available.", null);
        }
    } else {
        result.notImplemented();
    }
}
```

You should now be able to run the app on Android. If using the Android
Emulator, set the battery level in the Extended Controls panel
accessible from the **...** button in the toolbar.

### Step 3b: Add an Android platform-specific implementation using Kotlin {#example-kotlin}

*Note*: The following steps are similar to step 3a,
only using Kotlin rather than Java.

This step assumes that you created your project in [step 1.](#example-project)
using the `-a kotlin` option.

Start by opening the Android host portion of your Flutter app in Android Studio:

1. Start Android Studio

1. Select the menu item **File > Open...**

1. Navigate to the directory holding your Flutter app,
   and select the **android** folder inside it. Click **OK**.

1. Open the file `MainActivity.kt` located in the **kotlin** folder in the
   Project view. (Note: If editing with Android Studio 2.3,
   note that the **kotlin** folder is shown as if named **java**.)

Inside the `onCreate()` method, create a `MethodChannel` and call
`setMethodCallHandler()`. Make sure to use the same channel name as
was used on the Flutter client side.

```kotlin
import android.os.Bundle
import io.flutter.app.FlutterActivity
import io.flutter.plugin.common.MethodChannel

class MainActivity() : FlutterActivity() {
  private val CHANNEL = "samples.flutter.dev/battery"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    GeneratedPluginRegistrant.registerWith(this)
    MethodChannel(flutterView, CHANNEL).setMethodCallHandler { call, result ->
      // TODO
    }
  }
}
```

Add the Android Kotlin code that uses the Android battery APIs to
retrieve the battery level. This code is exactly the same as you
would write in a native Android app.

First, add the needed imports at the top of the file:

```kotlin
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
```

Next, add the following method in the `MainActivity` class,
below the `onCreate()` method:

```kotlin
  private fun getBatteryLevel(): Int {
    val batteryLevel: Int
    if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
      val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    } else {
      val intent = ContextWrapper(applicationContext).registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
      batteryLevel = intent!!.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100 / intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
    }

    return batteryLevel
  }
```

Finally, complete the `onMethodCall()` method added earlier. You need to
handle a single platform method, `getBatteryLevel()`, so test for that in the
`call` argument. The implementation of this platform method calls the
Android code written in the previous step, and returns a response for both
the success and error cases using the `response` argument.
If an unknown method is called, report that instead.

Remove the following code:

```kotlin
    MethodChannel(flutterView, CHANNEL).setMethodCallHandler { call, result ->
      // TODO
    }
```

And replace with the following:

```kotlin
    MethodChannel(flutterView, CHANNEL).setMethodCallHandler { call, result ->
      if (call.method == "getBatteryLevel") {
        val batteryLevel = getBatteryLevel()

        if (batteryLevel != -1) {
          result.success(batteryLevel)
        } else {
          result.error("UNAVAILABLE", "Battery level not available.", null)
        }
      } else {
        result.notImplemented()
      }
    }
```

You should now be able to run the app on Android. If using the Android
Emulator, set the battery level in the **Extended Controls** panel
accessible from the **...** button in the toolbar.

### Step 4a: Add an iOS platform-specific implementation using Objective-C {#example-objc}

*Note*: The following steps use Objective-C.
If you prefer Swift, skip to step 4b.

Start by opening the iOS host portion of the Flutter app in Xcode:

1. Start Xcode

1. Select the menu item **File > Open...**

1. Navigate to the directory holding your Flutter app, and select the **ios**
folder inside it. Click **OK**.

1. Make sure the Xcode projects builds without errors.

1. Open the file `AppDelegate.m`, located under **Runner > Runner**
   in the Project navigator.

Create a `FlutterMethodChannel` and add a handler inside the `application
didFinishLaunchingWithOptions:` method. Make sure to use the same channel name
as was used on the Flutter client side.

```objectivec
#import <Flutter/Flutter.h>
#import "GeneratedPluginRegistrant.h"

@implementation AppDelegate
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions {
  FlutterViewController* controller = (FlutterViewController*)self.window.rootViewController;

  FlutterMethodChannel* batteryChannel = [FlutterMethodChannel
                                          methodChannelWithName:@"samples.flutter.de/battery"
                                          binaryMessenger:controller];

  [batteryChannel setMethodCallHandler:^(FlutterMethodCall* call, FlutterResult result) {
    // TODO
  }];

  [GeneratedPluginRegistrant registerWithRegistry:self];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```

Next, add the iOS ObjectiveC code that uses the iOS battery APIs to
retrieve the battery level. This code is exactly the same as you
would write in a native iOS app.

Add the following method in the `AppDelegate` class, just before `@end`:

```objectivec
- (int)getBatteryLevel {
  UIDevice* device = UIDevice.currentDevice;
  device.batteryMonitoringEnabled = YES;
  if (device.batteryState == UIDeviceBatteryStateUnknown) {
    return -1;
  } else {
    return (int)(device.batteryLevel * 100);
  }
}
```

Finally, complete the `setMethodCallHandler()` method added earlier.
You need to handle a single platform method, `getBatteryLevel()`,
so test for that in the `call` argument. The implementation of
this platform method calls the iOS code written in the previous step,
and returns a response for both the success and error cases using
the `result` argument. If an unknown method is called, report that instead.

```objectivec
__weak typeof(self) weakSelf = self
[batteryChannel setMethodCallHandler:^(FlutterMethodCall* call, FlutterResult result) {
  if ([@"getBatteryLevel" isEqualToString:call.method]) {
    int batteryLevel = [weakSelf getBatteryLevel];

    if (batteryLevel == -1) {
      result([FlutterError errorWithCode:@"UNAVAILABLE"
                                 message:@"Battery info unavailable"
                                 details:nil]);
    } else {
      result(@(batteryLevel));
    }
  } else {
    result(FlutterMethodNotImplemented);
  }
}];
```

You should now be able to run the app on iOS. If using the iOS Simulator,
note that it does not support battery APIs,
and the app displays 'battery info unavailable'.

### Step 4b: Add an iOS platform-specific implementation using Swift {#example-swift}

*Note*: The following steps are similar to step 4a,
only using Swift rather than Objective-C.

This step assumes that you created your project in [step 1.](#example-project)
using the `-i swift` option.

Start by opening the iOS host portion of your Flutter app in Xcode:

1. Start Xcode

1. Select the menu item **File > Open...**

1. Navigate to the directory holding your Flutter app, and select the **ios**
folder inside it. Click **OK**.

Add support for Swift in the standard template setup that uses Objective-C:

1. **Expand Runner > Runner** in the Project navigator.

1. Open the file `AppDelegate.swift` located under **Runner > Runner**
   in the Project navigator.

Override the `application:didFinishLaunchingWithOptions:` function and create
a `FlutterMethodChannel` tied to the channel name
`samples.flutter.dev/battery`:

```swift
@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    let batteryChannel = FlutterMethodChannel(name: "samples.flutter.dev/battery",
                                              binaryMessenger: controller)
    batteryChannel.setMethodCallHandler({
      (call: FlutterMethodCall, result: FlutterResult) -> Void in
      // Handle battery messages.
    })

    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

Next, add the iOS Swift code that uses the iOS battery APIs to retrieve
the battery level. This code is exactly the same as you
would write in a native iOS app.

Add the following as a new method at the bottom of `AppDelegate.swift`:

```swift
private func receiveBatteryLevel(result: FlutterResult) {
  let device = UIDevice.current
  device.isBatteryMonitoringEnabled = true
  if device.batteryState == UIDeviceBatteryState.unknown {
    result(FlutterError(code: "UNAVAILABLE",
                        message: "Battery info unavailable",
                        details: nil))
  } else {
    result(Int(device.batteryLevel * 100))
  }
}
```

Finally, complete the `setMethodCallHandler()` method added earlier. You need
to handle a single platform method, `getBatteryLevel()`, so test for that in
the `call` argument. The implementation of this platform method calls
the iOS code written in the previous step. If an unknown method
is called, report that instead.

```swift
batteryChannel.setMethodCallHandler({
  [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
  guard call.method == "getBatteryLevel" else {
    result(FlutterMethodNotImplemented)
    return
  }
  self?.receiveBatteryLevel(result: result)
})
```

You should now be able to run the app on iOS. If using the iOS Simulator,
note that it does not support battery APIs,
and the app displays 'Battery info unavailable.'.

## Separate platform-specific code from UI code {#separate}

If you expect to use your platform-specific code in multiple Flutter apps,
it can be useful to separate the code into a platform plugin located
in a directory outside your main application. See [developing
packages](/docs/development/packages-and-plugins/developing-packages)
for details.

## Publish platform-specific code as a package {#publish}

To share your platform-specific code with other developers in the Flutter
ecosystem, see [publishing
packages](/docs/development/packages-and-plugins/developing-packages#publish).

## Custom channels and codecs

Besides the above mentioned `MethodChannel`, you can also use the more basic
[`BasicMessageChannel`][BasicMessageChannel], which supports basic,
asynchronous message passing using a custom message codec.
You can also use the specialized [`BinaryCodec`][BinaryCodec],
[`StringCodec`][StringCodec], and [`JSONMessageCodec`][JSONMessageCodec]
classes, or create your own codec.

[BasicMessageChannel]: {{site.api}}/flutter/services/BasicMessageChannel-class.html
[BinaryCodec]: {{site.api}}/flutter/services/BinaryCodec-class.html
[StringCodec]: {{site.api}}/flutter/services/StringCodec-class.html
[JSONMessageCodec]: {{site.api}}/flutter/services/JSONMessageCodec-class.html
