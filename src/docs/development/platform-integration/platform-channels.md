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
see [using packages][].

本指南介绍了如何编写自定义的平台相关代码，
某些平台相关功能可通过已有的软件包获得，具体细节可查看：
[在 Flutter 里使用 Packages][using packages]。

Flutter uses a flexible system that allows you to call
platform-specific APIs whether available in Kotlin or
Java code on Android, or in Swift or Objective-C code on iOS.

Flutter 使用了灵活的系统，它允许你调用相关平台的 API，
无论是 Android 中的 Java 或 Kotlin 代码，
还是 iOS 中的 Objective-C 或 Swift 代码。

{{site.alert.note}}
  The information in this page is valid for most
  plugins, except for any web plugin implemented
  as a [federated plugin][]. Federated plugins
  don't use platform channels.
{{site.alert.end}}

Flutter's platform-specific API support does not rely on code generation,
but rather on a flexible message passing style:

Flutter 的平台相关 API 支持不依赖于代码生成，而是依赖于灵活的消息传递：

* The Flutter portion of the app sends messages to its *host*,
  the iOS or Android portion of the app, over a platform channel.

  应用程序中的 Flutter 部分通过平台通道向其宿主（应用程序中的 iOS 或 Android 部分）发送消息。

* The *host* listens on the platform channel, and receives the message.
  It then calls into any number of platform-specific APIs&mdash;using
  the native programming language&mdash;and sends a response back to the
  *client*, the Flutter portion of the app.

  **宿主**监听平台通道并接收消息。然后，它使用原生编程语言来调用任意数量的相关平台
  API，并将响应发送回**客户端**（即应用程序中的 Flutter 部分）。

{{site.alert.note}}

  This guide addresses using the platform channel mechanism if you need
  to use the platform's APIs or libraries in Java, Kotlin, Objective-C, or Swift.
  But you can also write platform-specific Dart code in your Flutter app
  by inspecting the [defaultTargetPlatform][] property.
  [Platform adaptations][] lists some platform-specific adaptations
  that Flutter automatically does for you in the framework.

  如果你需要在 Java/Kotlin/Objective-C 或 Swift 中使用平台的 API
  或库，本指南将使用平台通道机制。但你也可以通过检查 Flutter 应用程序中的
  [defaultTargetPlatform][] 属性来编写相关平台的 Dart 代码。
  [不同平台操作体验的差异和适配][Platform adaptations] 文档中列出了
  Flutter 框架自动为你执行的一些相关平台适配。
{{site.alert.end}}

## Architectural overview: platform channels {#architecture}

## 架构概述：平台通道 {#architecture}

Messages are passed between the client (UI)
and host (platform) using platform
channels as illustrated in this diagram:

消息使用平台通道在客户端（UI）和宿主（平台）之间传递，如下图所示：

![Platform channels architecture](/images/PlatformChannels.png)

Messages and responses are passed asynchronously,
to ensure the user interface remains responsive.

消息和响应以异步的形式进行传递，以确保用户界面能够保持响应。

{{site.alert.note}} 
  
  Even though Flutter sends messages to and from Dart asynchronously,
  whenever you invoke a channel method, you must invoke that method on the
  platform's main thread. See the [section on threading][]
  for more information.
  
  Flutter 是通过 Dart 异步发送消息的。
  即便如此，当你调用一个平台方法时，也需要在主线程上做调用。
  在 [这里][section on threading] 查看更多。
  
{{site.alert.end}}

On the client side, [`MethodChannel`][] enables sending
messages that correspond to method calls. On the platform side,
`MethodChannel` on Android ([`MethodChannelAndroid`][]) and
`FlutterMethodChannel` on iOS ([`MethodChanneliOS`][])
enable receiving method calls and sending back a
result. These classes allow you to develop a platform plugin with very little
'boilerplate' code.

客户端 `MethodChannel`（[API][MethodChannel]）允许发送与方法调用相对应的消息。
平台方面，在 Android 的 `MethodChannel`（[API][MethodChannelAndroid]）及 iOS
的 `FlutterMethodChannel`（[API][MethodChanneliOS]）上接收方法调用并返回结果。
这些类允许你使用非常少的 **样板** 代码来开发平台插件。

*Note*: If desired, method calls can also be sent in the reverse direction,
with the platform acting as client to methods implemented in Dart.
A concrete example of this is the [`quick_actions`][] plugin.

**注意**：如果需要，方法调用也可以反向发送，由平台充当客户端来调用 Dart
实现的方法。一个具体的例子是 [`quick_actions`][] 插件。

### Platform channel data types support and codecs {#codec}

### 平台通道数据类型及编解码器 {#codec}

The standard platform channels use a standard message codec that supports
efficient binary serialization of simple JSON-like values, such as booleans,
numbers, Strings, byte buffers, and Lists and Maps of these
(see [`StandardMessageCodec`][]) for details).
The serialization and deserialization of these values to and from
messages happens automatically when you send and receive values.

标准平台通道使用标准消息编解码器，它支持简单的类似 JSON
值的高效二进制序列化，例如布尔值、数字、字符串、字节缓冲区及这些类型的列表和映射
（详情请参阅 [`StandardMessageCodec`][]）。
当你发送和接收值时，它会自动对这些值进行序列化和反序列化。

The following table shows how Dart values are received on the
platform side and vice versa:

下表展示了如何在平台端接收 Dart 值，反之亦然：

| Dart                       | Java                | Kotlin      | OC                                             | Swift                                   |
| -------------------------- | ------------------- | ----------- | ---------------------------------------------- | --------------------------------------- |
| null                       | null                | null        | nil (NSNull when nested)                       | nil                                     |
| bool                       | java.lang.Boolean   | Boolean     | NSNumber numberWithBool:                       | NSNumber(value: Bool)                   |
| int                        | java.lang.Integer   | Int         | NSNumber numberWithInt:                        | NSNumber(value: Int32)                  |
| int, if 32 bits not enough | java.lang.Long      | Long        | NSNumber numberWithLong:                       | NSNumber(value: Int)                    |
| double                     | java.lang.Double    | Double      | NSNumber numberWithDouble:                     | NSNumber(value: Double)                 |
| String                     | java.lang.String    | String      | NSString                                       | String                                  |
| Uint8List                  | byte[]              | ByteArray   | FlutterStandardTypedData typedDataWithBytes:   | FlutterStandardTypedData(bytes: Data)   |
| Int32List                  | int[]               | IntArray    | FlutterStandardTypedData typedDataWithInt32:   | FlutterStandardTypedData(int32: Data)   |
| Int64List                  | long[]              | LongArray   | FlutterStandardTypedData typedDataWithInt64:   | FlutterStandardTypedData(int64: Data)   |
| Float64List                | double[]            | DoubleArray | FlutterStandardTypedData typedDataWithFloat64: | FlutterStandardTypedData(float64: Data) |
| List                       | java.util.ArrayList | List        | NSArray                                        | Array                                   |
| Map                        | java.util.HashMap   | HashMap     | NSDictionary                                   | Dictionary                              |

<br>
## Example: Calling platform-specific iOS and Android code using platform channels {#example}

## 示例: 通过平台通道调用平台的 iOS 和 Android 代码 {#example}

The following code demonstrates how to call a platform-specific API
to retrieve and display the current battery level.
It uses the Android `BatteryManager` API,
and the iOS `device.batteryLevel` API, via a single platform message,
`getBatteryLevel()`.

以下代码演示了如何调用平台相关 API 来检索并显示当前的电池电量。它通过平台消息 `getBatteryLevel()`
来调用 Android 的 `BatteryManager` API 及 iOS 的 `device.batteryLevel` API。

The example adds the platform-specific code inside the main app itself.
If you want to reuse the platform-specific code for multiple apps,
the project creation step is slightly different
(see [developing packages][plugins]), but the platform channel code
is still written in the same way.

该示例在主应用程序中添加平台相关代码。如果想要将该代码重用于多个应用程序，那么项目的创建步骤将略有差异
（查看 [Flutter Packages 的开发和提交](/docs/development/packages-and-plugins/developing-packages#plugin)），
但平台通道代码仍以相同方式编写。

*Note*: The full, runnable source-code for this example is available in
[`/examples/platform_channel/`][] for Android with Java and
iOS with Objective-C. For iOS with Swift,
see [`/examples/platform_channel_swift/`][].

**注意**：可在
[`/examples/platform_channel/`]({{site.github}}/flutter/flutter/tree/master/examples/platform_channel)
中获得使用 Java 实现的 Android 及使用 Objective-C 实现的 iOS 的该示例完整可运行的代码。对于用
Swift 实现的 iOS 代码，请参阅
[`/examples/platform_channel_swift/`]({{site.github}}/flutter/flutter/tree/master/examples/platform_channel_swift)。

### Step 1: Create a new app project {#example-project}

### 第一步：创建一个新的应用项目 {#example-project}

Start by creating a new app:

首先创建一个新的应用：

* In a terminal run: `flutter create batterylevel`

  在终端中运行：`flutter create batterylevel`

By default our template supports writing Android code using Kotlin,
or iOS code using Swift. To use Java or Objective-C,
use the `-i` and/or `-a` flags:

默认情况下，我们的模板使用 Kotlin 编写 Android 或使用 Swift 编写 iOS 代码。要使用
Java 或 Objective-C，请使用 `-i` 和/或 `-a` 标志：

* In a terminal run: `flutter create -i swift -a kotlin batterylevel`

  在终端中运行：`flutter create -i swift -a kotlin batterylevel`

### Step 2: Create the Flutter platform client {#example-client}

### 第二步：创建 Flutter 平台客户端 {#example-client}

The app's `State` class holds the current app state.
Extend that to hold the current battery state.

应用程序的 `State` 类保持当前应用的状态。扩展它以保持当前的电池状态。

First, construct the channel. Use a `MethodChannel` with a single
platform method that returns the battery level.

首先，构建通道。在返回电池电量的单一平台方法中使用 `MethodChannel`。

The client and host sides of a channel are connected through a channel name
passed in the channel constructor. All channel names used in a single app must
be unique; prefix the channel name with a unique 'domain
prefix', for example: `samples.flutter.dev/battery`.

通道的客户端和宿主端通过传递给通道构造函数的通道名称进行连接。
一个应用中所使用的所有通道名称必须是唯一的；
使用唯一的 **域前缀** 为通道名称添加前缀，比如：`samples.flutter.dev/battery`。

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
to call using the String identifier `getBatteryLevel`.
The call might fail&mdash;for example if the platform does not support the
platform API (such as when running in a simulator), so wrap the
`invokeMethod` call in a try-catch statement.

接下来，在方法通道上调用方法（指定通过 String 标识符 `getBatteryLevel`
调用的具体方法）。调用可能会失败&mdash;比如，如果平台不支持此平台
API（比如在模拟器中运行），所以将 `invokeMethod` 调用包裹在 try-catch 语句中。

Use the returned result to update the user interface state in `_batteryLevel`
inside `setState`.

在 `setState` 中使用返回结果来更新 `_batteryLevel` 内的用户界面状态。

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

最后，将模板中的 `build` 方法替换为包含以字符串形式
显示电池状态、并包含一个用于刷新该值的按钮的小型用户界面。

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

### Step 3: Add an Android platform-specific implementation

### Step 3a: Add an Android platform-specific implementation using Java {#example-java}

### 步骤 3a: 使用 Java 添加 Android 平台的实现 {#example-java}

*Note*: The following steps use Java. If you prefer Kotlin, skip to step
3b.

**注意**：以下步骤使用 Java。如果你更喜欢 Kotlin，请跳至步骤 3b。

{% samplecode android-channel %}

{% sample Java %}

Start by opening the Android host portion of your Flutter app in Android Studio:

首先在 Android Studio 中打开 Flutter 应用的 Android 宿主部分：

1. Start Android Studio

   启动 Android Studio

1. Select the menu item **File > Open...**

   选择菜单项 **File > Open...**

1. Navigate to the directory holding your Flutter app,
   and select the **android** folder inside it. Click **OK**.

   导航到包含 Flutter 应用的目录，然后选择其中的 **android** 文件夹。点击 **OK**。

1. Open the `MainActivity.java` file located in the **java** folder in the
   Project view.

   在项目视图中打开 **java** 文件夹下的 `MainActivity.java` 文件。

Next, create a `MethodChannel` and set a `MethodCallHandler`
inside the `configureFlutterEngine()` method.
Make sure to use the same channel name as was used on the
Flutter client side.

接下来，在 `configureFlutterEngine()` 方法中创建一个 `MethodChannel` 并设置一个
`MethodCallHandler`。确保使用的通道名称与 Flutter 客户端使用的一致。

<!--code-excerpt "MainActivity.java" title-->
```java
import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {
  private static final String CHANNEL = "samples.flutter.dev/battery";

  @Override
  public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
    new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
        .setMethodCallHandler(
          (call, result) -> {
            // Note: this method is invoked on the main thread.
            // TODO
          }
        );
  }
}
```

Add the Android Java code that uses the Android battery APIs to
retrieve the battery level. This code is exactly the same as you
would write in a native Android app.

添加使用 Android battery API 来检索电池电量的 Android Java 代码。
该代码与你在原生 Android 应用中编写的代码完全相同。

First, add the needed imports at the top of the file:

首先在文件头部添加所需的依赖：
<!--code-excerpt "MainActivity.java" title-->
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
below the `configureFlutterEngine()` method:

然后在 Activity 类中的 `onCreate()` 方法下方添加以下新方法：
<!--code-excerpt "MainActivity.java" title-->
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

Finally, complete the `setMethodCallHandler()` method added earlier.
You need to handle a single platform method, `getBatteryLevel()`,
so test for that in the `call` argument. The implementation of
this platform method calls the Android code written
in the previous step, and returns a response for both
the success and error cases using the `result` argument.
If an unknown method is called, report that instead.

最后，完成前面添加的 `onMethodCall()` 方法，
你需要处理单个平台方法 `getBatteryLevel()`，所以在参数 `call` 中对其进行验证。
该平台方法的实现是调用上一步编写的 Android 代码，并使用 `result` 参数来返回
成功和错误情况下的响应。如果调用了未知方法，则报告该方法。

Remove the following code:

移除以下代码：
<!--code-excerpt "MainActivity.java" title-->
```java
          (call, result) -> {
            // Note: this method is invoked on the main thread.
            // TODO
          }
```

And replace with the following:

并替换成以下内容：
<!--code-excerpt "MainActivity.java" title-->
```java
          (call, result) -> {
            // Note: this method is invoked on the main thread.
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

{% sample Kotlin %}

Start by opening the Android host portion of your Flutter app in Android Studio:

首先在 Android Studio 中打开 Flutter 应用的 Android 宿主部分：

1. Start Android Studio

   启动 Android Studio

1. Select the menu item **File > Open...**

   选择菜单项 **File > Open...**

1. Navigate to the directory holding your Flutter app,
   and select the **android** folder inside it. Click **OK**.

   导航到包含 Flutter 应用的目录，然后选择其中的 **android** 文件夹。点击 **OK**。

1. Open the file `MainActivity.kt` located in the **kotlin** folder in the
   Project view. (Note: If editing with Android Studio 2.3,
   note that the **kotlin** folder is shown as if named **java**.)

   在项目视图中打开 **kotlin** 文件夹下的 `MainActivity.kt` 文件（注意：如果使用
   Android Studio 2.3 进行编辑，请注意 **kotlin** 目录的显示名称为 **java**）。

Inside the `configureFlutterEngine()` method, create a `MethodChannel` and call
`setMethodCallHandler()`. Make sure to use the same channel name as
was used on the Flutter client side.

在 `configureFlutterEngine()` 方法中创建一个 `MethodChannel` 并调用
`setMethodCallHandler()`。确保使用的通道名称与 Flutter 客户端使用的一致。
<!--code-excerpt "MyActivity.kt" title-->
```kotlin
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
  private val CHANNEL = "samples.flutter.dev/battery"

  override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      call, result ->
      // Note: this method is invoked on the main thread.
      // TODO
    }
  }
}
```

Add the Android Kotlin code that uses the Android battery APIs to
retrieve the battery level. This code is exactly the same as you
would write in a native Android app.

添加使用 Android battery API 来检索电池电量的 Android Kotlin 代码。该代码与你在原生
Android 应用中编写的代码完全相同。

First, add the needed imports at the top of the file:

首先在文件头部添加所需的依赖：
<!--code-excerpt "MyActivity.kt" title-->
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
below the `configureFlutterEngine()` method:

然后在 `MainActivity` 类中的 `configureFlutterEngine()` 方法下方添加以下新方法：
<!--code-excerpt "MyActivity.kt" title-->
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

Finally, complete the `setMethodCallHandler()` method added earlier. You need to
handle a single platform method, `getBatteryLevel()`, so test for that in the
`call` argument. The implementation of this platform method calls the
Android code written in the previous step, and returns a response for both
the success and error cases using the `result` argument.
If an unknown method is called, report that instead.

最后，完成前面添加的 `onMethodCall()` 方法。
你需要处理单个平台方法 `getBatteryLevel()`，所以在参数 `call` 中对其进行验证。
该平台方法的实现是调用上一步编写的 Android 代码，并使用 `result` 参数来返回成功
和错误情况下的响应。如果调用了未知方法，则报告该方法。

Remove the following code:

删除以下代码：
<!--code-excerpt "MyActivity.kt" title-->
```kotlin
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      call, result ->
      // Note: this method is invoked on the main thread.
      // TODO
    }
```

And replace with the following:

并替换成以下内容：
<!--code-excerpt "MyActivity.kt" title-->
```kotlin
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      // Note: this method is invoked on the main thread.
      call, result ->
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
{% endsamplecode %}

You should now be able to run the app on Android. If using the Android
Emulator, set the battery level in the Extended Controls panel
accessible from the **...** button in the toolbar.

现在你应该可以在 Android 中运行该应用。如果使用了 Android
模拟器，请在**扩展控件**面板中设置电池电量，可从工具栏中的 **...** 按钮访问。

### Step 4a: Add an iOS platform-specific implementation

### 步骤 4a：添加 iOS 平台的实现

{% samplecode ios-channel %}
{% sample Objective-C %}

Start by opening the iOS host portion of the Flutter app in Xcode:

首先在 Xcode 中打开 Flutter 应用的 iOS 宿主部分：

1. Start Xcode.

   启动 Xcode

1. Select the menu item **File > Open...**.

   选择菜单项 **File > Open...**

1. Navigate to the directory holding your Flutter app, and select the **ios**
folder inside it. Click **OK**.

   导航到包含 Flutter 应用的目录，然后选择其中的 **ios** 文件夹。点击 **OK**。

1. Make sure the Xcode projects builds without errors.

   确保 Xcode 项目构建没有错误。

1. Open the file `AppDelegate.m`, located under **Runner > Runner**
   in the Project navigator.

   打开项目导航 **Runner > Runner** 下的 `AppDelegate.m` 文件。

Create a `FlutterMethodChannel` and add a handler inside the `application
didFinishLaunchingWithOptions:` method. Make sure to use the same channel name
as was used on the Flutter client side.

在 `application didFinishLaunchingWithOptions:` 方法中创建一个 `FlutterMethodChannel`
并添加一个处理程序。确保使用的通道名称与 Flutter 客户端使用的一致。

<!--code-excerpt "AppDelegate.m" title-->
```objectivec
#import <Flutter/Flutter.h>
#import "GeneratedPluginRegistrant.h"

@implementation AppDelegate
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions {
  FlutterViewController* controller = (FlutterViewController*)self.window.rootViewController;

  FlutterMethodChannel* batteryChannel = [FlutterMethodChannel
                                          methodChannelWithName:@"samples.flutter.dev/battery"
                                          binaryMessenger:controller.binaryMessenger];

  [batteryChannel setMethodCallHandler:^(FlutterMethodCall* call, FlutterResult result) {
    // Note: this method is invoked on the UI thread.
    // TODO
  }];

  [GeneratedPluginRegistrant registerWithRegistry:self];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```

Next, add the iOS ObjectiveC code that uses the iOS battery APIs to
retrieve the battery level. This code is exactly the same as you
would write in a native iOS app.

接下来添加使用 iOS battery API 来检索电池电量的 iOS Objective-C 代码。该代码与你在原生
iOS 应用中编写的代码完全相同。

Add the following method in the `AppDelegate` class, just before `@end`:

在 `AppDelegate` 类中的 `@end` 之前添加以下方法：

<!--code-excerpt "AppDelegate.m" title-->
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

最后，完成前面添加的 `setMethodCallHandler()` 方法。
你需要处理单个平台方法 `getBatteryLevel()`，所以在参数`call` 中对其进行验证。
该平台方法的实现是调用上一步编写的 iOS 代码，并使用 `result` 参数来返回成功
和错误情况下的响应。如果调用了未知方法，则报告该方法。

<!--code-excerpt "AppDelegate.m" title-->
```objectivec
__weak typeof(self) weakSelf = self;
[batteryChannel setMethodCallHandler:^(FlutterMethodCall* call, FlutterResult result) {
  // Note: this method is invoked on the UI thread.
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

现在你应该可以在 iOS 中运行该应用。如果使用了 iOS 模拟器，注意它并不支持
battery API，并且应用会显示 'battery info unavailable'。

### Step 4b: Add an iOS platform-specific implementation using Swift {#example-swift}

### 步骤 4b：使用 Swift 添加 iOS 平台的实现 {#example-swift}

*Note*: The following steps are similar to step 4a,
only using Swift rather than Objective-C.

**注意**：以下步骤与 4a 类似，唯一的区别是使用了 Swift 而非 Objective-C。

This step assumes that you created your project in [step 1.](#example-project)
using the `-i swift` option.

此步骤假设你在第一步中使用 `-i swift` 选项创建了项目。

{% sample Swift %}
Start by opening the iOS host portion of your Flutter app in Xcode:

首先在 Xcode 中打开 Flutter 应用的 iOS 宿主部分：

1. Start Xcode.

   启动 Xcode

1. Select the menu item **File > Open...**.

   选择菜单项 **File > Open...**

1. Navigate to the directory holding your Flutter app, and select the **ios**
folder inside it. Click **OK**.

   导航到包含 Flutter 应用的目录，然后选择其中的 **ios** 文件夹。点击 **OK**。

Add support for Swift in the standard template setup that uses Objective-C:

在使用 Objective-C 的标准模板设置中添加对 Swift 的支持：

1. **Expand Runner > Runner** in the Project navigator.

   在项目导航中展开 **Expand Runner > Runner**。

1. Open the file `AppDelegate.swift` located under **Runner > Runner**
   in the Project navigator.

   打开项目导航 `Runner > Runner` 下的 `AppDelegate.swift` 文件。

Override the `application:didFinishLaunchingWithOptions:` function and create
a `FlutterMethodChannel` tied to the channel name
`samples.flutter.dev/battery`:

重写 `application:didFinishLaunchingWithOptions:` 方法并创建一个绑定了通道名称
`samples.flutter.dev/battery` 的 `FlutterMethodChannel`：

<!--code-excerpt "AppDelegate.swift" title-->
```swift
@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    let batteryChannel = FlutterMethodChannel(name: "samples.flutter.dev/battery",
                                              binaryMessenger: controller.binaryMessenger)
    batteryChannel.setMethodCallHandler({
      (call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in
      // Note: this method is invoked on the UI thread.
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

接下来添加使用 iOS battery API 来检索电池电量的 iOS Swift 代码。该代码与你在原生
iOS 应用中编写的代码完全相同。

Add the following as a new method at the bottom of `AppDelegate.swift`:

在 `AppDelegate.swift` 末尾添加以下新方法：

<!--code-excerpt "AppDelegate.swift" title-->
```swift
private func receiveBatteryLevel(result: FlutterResult) {
  let device = UIDevice.current
  device.isBatteryMonitoringEnabled = true
  if device.batteryState == UIDevice.BatteryState.unknown {
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

最后，完成前面添加的 `setMethodCallHandler()` 方法。
你需要处理单个平台方法 `getBatteryLevel()`，所以在参数 `call` 中对其进行验证。
该平台方法的实现是调用上一步编写的 iOS 代码。
如果调用了未知方法，则报告该方法。

<!--code-excerpt "AppDelegate.swift" title-->
```swift
batteryChannel.setMethodCallHandler({
  [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
  // Note: this method is invoked on the UI thread.
  guard call.method == "getBatteryLevel" else {
    result(FlutterMethodNotImplemented)
    return
  }
  self?.receiveBatteryLevel(result: result)
})
```
{% endsamplecode %}

You should now be able to run the app on iOS. If using the iOS Simulator,
note that it does not support battery APIs,
and the app displays 'battery info unavailable'.

现在你应该可以在 iOS 中运行该应用。如果使用了 iOS 模拟器，注意它并不支持
battery API，并且应用会显示 'battery info unavailable'。

## Separate platform-specific code from UI code {#separate}

## 从 UI 代码中分离平台相关代码 {#separate}

If you expect to use your platform-specific code in multiple Flutter apps,
it can be useful to separate the code into a platform plugin located
in a directory outside your main application.
See [developing packages][] for details.

如果你想要在多个 Flutter 应用中使用你的平台相关代码，则将代码分离为位于主应用目录之外的平台插件会很有用。相关细节查看
[Flutter Packages 的开发和提交][developing packages]。

## Publish platform-specific code as a package {#publish}

## 将平台相关代码作为 Package 进行提交 {#publish}

To share your platform-specific code with other developers
in the Flutter ecosystem, see [publishing packages][].

与 Flutter 生态中的其他开发者共享你的平台相关代码，可查看 [提交 package][publishing packages]。

## Custom channels and codecs

## 自定义通道和编解码器

Besides the above mentioned `MethodChannel`,
you can also use the more basic
[`BasicMessageChannel`][], which supports basic,
asynchronous message passing using a custom message codec.
You can also use the specialized [`BinaryCodec`][],
[`StringCodec`][], and [`JSONMessageCodec`][]
classes, or create your own codec.

除了上面提到的 `MethodChannel`，你还可以使用更基础的
[`BasicMessageChannel`][BasicMessageChannel]，
它支持使用自定义的消息编解码器进行基本的异步消息传递。你还可以使用专门的
[`BinaryCodec`][BinaryCodec]，[`StringCodec`][StringCodec] 和
[`JSONMessageCodec`][JSONMessageCodec] 类，或创建自己的编解码器。

You might also check out an example of a custom codec
in the [`cloud_firestore`][] plugin,
which is able to serialize and deserialize many more
types than the default types.

## Channels and Platform Threading

Invoke all channel methods on the platform's main thread when writing code on
the platform side. On Android, this thread is sometimes called the "main
thread", but it is technically defined as [the UI thread][].
Annotate methods that need to be run on the UI thread with `@UiThread`.
On iOS, this thread is officially referred to as [the main thread][].

### Jumping to the UI thread in Android

To comply with channels' UI thread requirement, you may need to jump from a
background thread to Android's UI thread to execute a channel method. In
Android this is accomplished by `post()`ing a `Runnable` to Android's UI
thread `Looper`, which causes the `Runnable` to execute on the main thread
at the next opportunity.

In Java:

```java
new Handler(Looper.getMainLooper()).post(new Runnable() {
  @Override
  public void run() {
    // Call the desired channel message here.
  }
});
```

In Kotlin:

```kotlin
Handler(Looper.getMainLooper()).post {
  // Call the desired channel message here.
}
```

### Jumping to the main thread in iOS

To comply with channel's main thread requirement, you may need to jump from a
background thread to iOS's main thread to execute a channel method. In iOS this
is accomplished by executing a [block][] on the main [dispatch queue][]:

In Objective-C:

```objectivec
dispatch_async(dispatch_get_main_queue(), ^{
  // Call the desired channel message here.
});
```

In Swift:

```swift
DispatchQueue.main.async {
  // Call the desired channel message here.
}
```

[`BasicMessageChannel`]: {{site.api}}/flutter/services/BasicMessageChannel-class.html
[`BinaryCodec`]: {{site.api}}/flutter/services/BinaryCodec-class.html
[block]: https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithBlocks/WorkingwithBlocks.html
[`cloud_firestore`]: {{site.github}}/FirebaseExtended/flutterfire/blob/master/packages/cloud_firestore/cloud_firestore_platform_interface/lib/src/method_channel/utils/firestore_message_codec.dart
[defaultTargetPlatform]: {{site.api}}/flutter/foundation/defaultTargetPlatform.html
[developing packages]: /docs/development/packages-and-plugins/developing-packages
[plugins]: /docs/development/packages-and-plugins/developing-packages#plugin
[dispatch queue]: https://developer.apple.com/documentation/dispatch/dispatchqueue
[`/examples/platform_channel/`]: {{site.github}}/flutter/flutter/tree/master/examples/platform_channel
[`/examples/platform_channel_swift/`]: {{site.github}}/flutter/flutter/tree/master/examples/platform_channel_swift
[federated plugin]: /docs/development/packages-and-plugins/developing-packages#federated-plugins
[`JSONMessageCodec`]: {{site.api}}/flutter/services/JSONMessageCodec-class.html
[`MethodChannel`]: {{site.api}}/flutter/services/MethodChannel-class.html
[`MethodChannelAndroid`]: {{site.api}}/javadoc/io/flutter/plugin/common/MethodChannel.html
[`MethodChanneliOS`]: {{site.api}}/objcdoc/Classes/FlutterMethodChannel.html
[Platform adaptations]: /docs/resources/platform-adaptations
[publishing packages]: /docs/development/packages-and-plugins/developing-packages#publish
[`quick_actions`]: {{site.pub}}/packages/quick_actions
[section on threading]: #channels-and-platform-threading
[`StandardMessageCodec`]: {{site.api}}/flutter/services/StandardMessageCodec-class.html
[`StringCodec`]: {{site.api}}/flutter/services/StringCodec-class.html
[the main thread]: https://developer.apple.com/documentation/uikit?language=objc
[the UI thread]: https://developer.android.com/guide/components/processes-and-threads#Threads
[using packages]: /docs/development/packages-and-plugins/using-packages

