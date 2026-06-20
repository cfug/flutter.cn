---
# title: Launching a Jetpack Compose activity from your Flutter application
title: 从 Flutter 应用启动 Jetpack Compose Activity
# shortTitle: Native Android activities
shortTitle: 原生 Android Activity
# description: >-
#   Learn how to launch native Android activities in your Flutter app.
description: >-
  了解如何在你的 Flutter 应用中启动原生 Android Activity。
ai-translated: true
---

<?code-excerpt path-base="platform_integration/compose_activities"?>

Native Android activities allow you to launch
fullscreen UIs that are entirely run by and on the Android platform.
You will only write Kotlin code in those views (though they might
pass messages to and receive messages from your Dart code) and
you will have access to the full breadth of native Android functionality.

原生 Android Activity 让你启动完全由 Android 平台运行且在其上运行的全屏 UI。
你只需在这些视图中编写 Kotlin 代码（尽管它们可能与 Dart 代码收发消息），并可使用原生 Android 功能的全部能力。

Adding this functionality requires making several changes to
your Flutter app and its internal, generated Android app.
On the Flutter side, you will need to create a new
platform method channel and call its `invokeMethod` method.
On the Android side, you will need to register a matching native `MethodChannel`
to receive the signal from Dart and then launch a new activity.
Recall that all Flutter apps (when running on Android) exist within
an Android activity that is completely consumed by the Flutter app.
Thus, as you will see in the code sample, the job of the
native `MethodChannel` callback is to launch a second activity.

添加此功能需要对你的 Flutter 应用及其内部生成的 Android 应用进行多处修改。
在 Flutter 侧，你需要创建新的平台 method channel 并调用其 `invokeMethod` 方法。
在 Android 侧，你需要注册匹配的原生 `MethodChannel` 以接收来自 Dart 的信号，然后启动新的 Activity。
请记住，所有 Flutter 应用（在 Android 上运行时）都存在于被 Flutter 应用完全占用的 Android Activity 中。
因此，如代码示例所示，原生 `MethodChannel` 回调的任务是启动第二个 Activity。

:::note
This page discusses how to launch native Android activities
within a Flutter app.
If you'd like to host native Android views in your Flutter app,
check out [Hosting native Android views][].

本页讨论如何在 Flutter 应用内启动原生 Android Activity。
若要在 Flutter 应用中托管原生 Android 视图，
请参阅 [托管原生 Android 视图][Hosting native Android views]。
:::

[Hosting native Android views]: /platform-integration/android/platform-views

Not all Android activities use Jetpack Compose, but
this tutorial assumes you want to use Compose.

并非所有 Android Activity 都使用 Jetpack Compose，但本教程假定你想使用 Compose。

## On the Dart side

## 在 Dart 侧

On the Dart side, create a method channel and invoke it from
a specific user interaction, like tapping a button.

在 Dart 侧，创建 method channel，并在特定用户交互（如点击按钮）时调用它。

<?code-excerpt "lib/launch_compose_activity_example_1.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

// SECTION 1: START COPYING HERE
const platformMethodChannel = MethodChannel(
  // Note: You can change this string value, but it must match
  // the `CHANNEL` attribute in the next step.
  'com.example.flutter_android_activity',
);
// SECTION 1: END COPYING HERE

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  // SECTION 2: START COPYING HERE
  void _launchAndroidActivity() {
    platformMethodChannel.invokeMethod(
      // Note: You can change this value, but it must match
      // the `call.method` value in the next section.
      'launchActivity',

      // Note: You can pass any primitive data types you like.
      // To pass complex types, use package:pigeon to generate
      // matching Dart and Kotlin classes that share serialization logic.
      {'message': 'Hello from Flutter'},
    );
  }
  // SECTION 2: END COPYING HERE

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: const Center(child: Text('Hello World!')),
        floatingActionButton: FloatingActionButton(
          // SECTION 3: Call `_launchAndroidActivity` somewhere.
          onPressed: _launchAndroidActivity,

          // SECTION 3: End
          tooltip: 'Launch Android activity',
          child: const Icon(Icons.launch),
        ),
      ),
    );
  }
}
```

There are 3 important values that must match across your Dart and Kotlin code:

Dart 与 Kotlin 代码中有 3 个重要值必须一致：

 1. The channel name (in this sample, the value is
    `"com.example.flutter_android_activity"`).

    channel 名称（本示例中为 `"com.example.flutter_android_activity"`）。

 2. The method name (in this sample, the value is `"launchActivity"`).

    方法名称（本示例中为 `"launchActivity"`）。

 3. The structure of the data which Dart passes and
    the structure of the data which Kotlin expects to receive.
    In this case, the data is a map with a single `"message"` key.

    Dart 传递的数据结构与 Kotlin 期望接收的数据结构。
    本例中，数据为仅含 `"message"` 键的 map。


## On the Android side

## 在 Android 侧

You must make changes to 4 files in the generated Android app to
ready it for launching fresh Compose activities.

你必须修改生成 Android 应用中的 4 个文件，以便启动新的 Compose Activity。

The first file requiring modifications is `android/app/build.gradle`.

第一个需要修改的文件是 `android/app/build.gradle`。

 1. Add the following to the existing `android` block:

    在现有 `android` 块中添加以下内容：

    <Tabs key="android-build-features">
    <Tab name="Kotlin">

    ```kotlin title="android/app/build.gradle.kts"
    android {
      // Begin adding here
      buildFeatures {
        compose = true
      }
      composeOptions {
        // https://developer.android.com/jetpack/androidx/releases/compose-kotlin
        kotlinCompilerExtensionVersion = "1.4.8"
      }
      // End adding here
    }
    ```

    </Tab>
    <Tab name="Groovy">

    ```groovy title="android/app/build.gradle"
    android {
      // Begin adding here
      buildFeatures {
        compose true
      }
      composeOptions {
        // https://developer.android.com/jetpack/androidx/releases/compose-kotlin
        kotlinCompilerExtensionVersion = "1.4.8"
      }
      // End adding here
    }
    ```

    </Tab>
    </Tabs>

    Visit the [developer.android.com][] link in the code snippet and
    adjust `kotlinCompilerExtensionVersion`, as necessary.
    You should only need to do this if you
    receive errors during `flutter run` and those errors tell you
    which versions are installed on your machine.

    访问代码片段中的 [developer.android.com][] 链接，
    并按需调整 `kotlinCompilerExtensionVersion`。
    仅当你在 `flutter run` 期间收到错误且错误提示你机器上已安装的版本时，才需要这样做。

    [developer.android.com]: {{site.android-dev}}/jetpack/androidx/releases/compose-kotlin

 2. Next, add the following block at the bottom of the file, at the root level:

    接下来，在文件底部根级别添加以下块：

    <Tabs key="android-dependencies">
    <Tab name="Kotlin">

    ```kotlin title="android/app/build.gradle.kts"
    dependencies {
        implementation("androidx.core:core-ktx:1.10.1")
        implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.6.1")
        implementation("androidx.activity:activity-compose")
        implementation(platform("androidx.compose:compose-bom:2024.06.00"))
        implementation("androidx.compose.ui:ui")
        implementation("androidx.compose.ui:ui-graphics")
        implementation("androidx.compose.ui:ui-tooling-preview")
        implementation("androidx.compose.material:material")
        implementation("androidx.compose.material3:material3")
        testImplementation("junit:junit:4.13.2")
        androidTestImplementation("androidx.test.ext:junit:1.1.5")
        androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
        androidTestImplementation(platform("androidx.compose:compose-bom:2024.06.00"))
        androidTestImplementation("androidx.compose.ui:ui-test-junit4")
        androidTestImplementation("androidx.compose.ui:ui-test-junit4")
        debugImplementation("androidx.compose.ui:ui-tooling")
        debugImplementation("androidx.compose.ui:ui-test-manifest")
    }
    ```

    </Tab>
    <Tab name="Groovy">

    ```groovy title="android/app/build.gradle"
    dependencies {
        implementation "androidx.core:core-ktx:1.10.1"
        implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.6.1"
        implementation "androidx.activity:activity-compose"
        implementation platform("androidx.compose:compose-bom:2024.06.00")
        implementation "androidx.compose.ui:ui"
        implementation "androidx.compose.ui:ui-graphics"
        implementation "androidx.compose.ui:ui-tooling-preview"
        implementation "androidx.compose.material:material"
        implementation "androidx.compose.material3:material3"
        testImplementation "junit:junit:4.13.2"
        androidTestImplementation "androidx.test.ext:junit:1.1.5"
        androidTestImplementation "androidx.test.espresso:espresso-core:3.5.1"
        androidTestImplementation platform("androidx.compose:compose-bom:2023.08.00")
        androidTestImplementation "androidx.compose.ui:ui-test-junit4"
        debugImplementation "androidx.compose.ui:ui-tooling"
        debugImplementation "androidx.compose.ui:ui-test-manifest"
    }
    ```

    </Tab>
    </Tabs>

    The second file requiring modifications is `android/build.gradle`.

    第二个需要修改的文件是 `android/build.gradle`。

 1. Add the following buildscript block at the top of the file:

    在文件顶部添加以下 buildscript 块：

    <Tabs key="android-buildscript">
    <Tab name="Kotlin">

    ```kotlin title="android/build.gradle.kts"
    buildscript {
        dependencies {
            // Replace with the latest version.
            classpath("com.android.tools.build:gradle:8.1.1")
        }
        repositories {
            google()
            mavenCentral()
        }
    }
    ```

    </Tab>
    <Tab name="Groovy">

    ```groovy title="android/build.gradle"
    buildscript {
        dependencies {
            // Replace with the latest version.
            classpath 'com.android.tools.build:gradle:8.1.1'
        }
        repositories {
            google()
            mavenCentral()
        }
    }
    ```

    </Tab>
    </Tabs>

    The third file requiring modifications is
    `android/app/src/main/AndroidManifest.xml`.

    第三个需要修改的文件是 `android/app/src/main/AndroidManifest.xml`。

 1. In the root application block, add the following `<activity>` declaration:

    在根 application 块中添加以下 `<activity>` 声明：

    ```xml title="android/app/src/main/AndroidManifest.xml"
    <manifest xmlns:android="http://schemas.android.com/apk/res/android">
        <application
            android:label="flutter_android_activity"
            android:name="${applicationName}"
            android:icon="@mipmap/ic_launcher">

           // START COPYING HERE
            <activity android:name=".SecondActivity" android:exported="true" android:theme="@style/LaunchTheme"></activity>
           // END COPYING HERE

           <activity android:name=".MainActivity" …></activity>
          …
    </manifest>
    ```

    The fourth and final code requiring modifications is
    `android/app/src/main/kotlin/com/example/flutter_android_activity/MainActivity.kt`.
    Here you'll write Kotlin code for your desired Android functionality.

    第四处也是最后一处需要修改的代码是
    `android/app/src/main/kotlin/com/example/flutter_android_activity/MainActivity.kt`。
    在此编写实现所需 Android 功能的 Kotlin 代码。

 1. Add the necessary imports at the top of the file:

    在文件顶部添加必要的 import：

    :::note
    Your imports might vary if library versions have changed or
    if you introduce different Compose classes when
    you write your own Kotlin code.
    Follow your IDE's hints for the correct imports you require.

    若库版本已变更，或在你编写自己的 Kotlin 代码时引入了不同的 Compose 类，import 可能有所不同。
    请按 IDE 提示添加所需的正确 import。
    :::

    ```kotlin title="MainActivity.kt"
    package com.example.flutter_android_activity

    import android.content.Intent
    import android.os.Bundle
    import androidx.activity.ComponentActivity
    import androidx.activity.compose.setContent
    import androidx.compose.foundation.layout.Column
    import androidx.compose.foundation.layout.fillMaxSize
    import androidx.compose.material3.Button
    import androidx.compose.material3.MaterialTheme
    import androidx.compose.material3.Surface
    import androidx.compose.material3.Text
    import androidx.compose.ui.Modifier
    import androidx.core.app.ActivityCompat
    import io.flutter.embedding.android.FlutterActivity
    import io.flutter.embedding.engine.FlutterEngine
    import io.flutter.plugin.common.MethodCall
    import io.flutter.plugin.common.MethodChannel
    import io.flutter.plugins.GeneratedPluginRegistrant
    ```

 1. Modify the generated `MainActivity` class by adding a
    `CHANNEL` field and a `configureFlutterEngine` method:

    通过添加 `CHANNEL` 字段和 `configureFlutterEngine` 方法修改生成的 `MainActivity` 类：

     ```kotlin  title="MainActivity.kt"
     class MainActivity: FlutterActivity() {
         // This value must match the `MethodChannel` name in your Dart code.
         private val CHANNEL = "com.example.flutter_android_activity"

         override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
             GeneratedPluginRegistrant.registerWith(flutterEngine)

             MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
                 call: MethodCall, result: MethodChannel.Result ->
                     when (call.method) {
                         // Note: This must match the first parameter passed to
                         // `platformMethodChannel.invokeMethod` in your Dart code.
                         "launchActivity" -> {
                             try {
                                 // Takes an object, in this case a String.
                                 val message = call.arguments
                                 val intent = Intent(this@MainActivity, SecondActivity::class.java)
                                 intent.putExtra("message", message.toString())
                                 startActivity(intent)
                             } catch (e: Exception){}
                                 result.success(true)
                             }
                             else -> {}
                     }
             }
         }
     }
     ```

 1. Add a second `Activity` to the bottom of the file, which you
    referenced in the previous changes to `AndroidManifest.xml`:

    在文件底部添加第二个 `Activity`，即你在先前对 `AndroidManifest.xml` 修改中引用的 Activity：

    ```kotlin  title="MainActivity.kt"
    class SecondActivity : ComponentActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)

            setContent {
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    Column {
                        Text(text = "Second Activity")
                        // Note: This must match the shape of the data passed from your Dart code.
                        Text("" + getIntent()?.getExtras()?.getString("message"))
                        Button(onClick = {  finish() }) {
                            Text("Exit")
                        }
                    }
                }
            }
        }
    }
    ```

These steps show how to launch a native Android activity from a Flutter app,
which can sometimes be an easy way to connect to specific Android functionality.

这些步骤演示如何从 Flutter 应用启动原生 Android Activity，
有时这是连接特定 Android 功能的简便方式。
