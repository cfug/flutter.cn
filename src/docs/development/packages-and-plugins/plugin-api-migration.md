---
title: Supporting the new Android plugins APIs
title: 支持新的 Android 的 API
description: How to update a plugin using the old APIs to support the new APIs。
description: 如何升级旧 API 的插件以支持新的 API。
---

{{site.alert.note}}
  You might be directed to this page if the framework detects that
  your app uses a plugin based on the old Android APIs.

  如果我们检测到您的应用项目中使用的插件正在使用旧的 Android APIs ，
  会提示您前往本页面。
{{site.alert.end}}

_If you don't write or maintain an Android Flutter plugin,
you can skip this page._

_如果您并非亲自开发或维护一个 Flutter 的 Android 插件，
您可以跳过本页面。_

As of the 1.12 release,
new plugin APIs are available for the Android platform.
The old APIs based on [`PluginRegistry.Registrar`][]
won't be immediately deprecated,
but we encourage you to migrate to the new APIs based on
[`FlutterPlugin`][].

自 1.12 版本发布后，
Android 平台已可以使用新的 Android 插件 API 。
基于 [`PluginRegistry.Registrar`][] 的 API 不会立刻废弃，
但我们鼓励您向基于 [`FlutterPlugin`][] 的 API 进行迁移。

The new API has the advantage of providing a cleaner set of accessors for
lifecycle dependent components compared to the old APIs. For instance
[`PluginRegistry.Registrar.activity()`][] could return null if
Flutter isn't attached to any activities.

相较旧的 API 而言，新版 API 的优点是为生命周期的相关组件提供了
更简洁清晰的访问方式。例如，在使用旧的 [`PluginRegistry.Registrar.activity()`][]
时，如果 Flutter 尚未附加到任何 activites ，可能会返回 null 。

In other words, plugins using the old API may produce undefined
behaviors when embedding Flutter into an Android app.
Most of the [Flutter plugins][] provided by the flutter.dev
team have been migrated already. (Learn how to become a
[verified publisher][] on pub.dev!) For an example of
a plugin that uses the new APIs, see the
[battery package][].

换句话说，在使用旧的 API 进行 Flutter 嵌入 Android 应用时，
可能会产生意外的行为。
Flutter 开发团队提供的大部分 [Flutter 插件][Flutter plugins] 已经完成了迁移。
（了解如何成为[认证的发布者][verified publisher]）
作为参考， [battery package][] 已经迁移到新版 API 。

## Upgrade steps

## 升级步骤

The following instructions outline the steps for supporting the new API:

以下的步骤简要说明了如何支持新版 API ：

1. Update the main plugin class (`*Plugin.java`) to implement the
   [`FlutterPlugin`][] interface. For more complex plugins,
   you can separate the `FlutterPlugin` and `MethodCallHandler`
   into two classes. See the next section, [Basic plugin][],
   for more details on accessing app resources with
   the latest version (v2) of embedding.
   
   将插件的主类文件 (`*Plugin.java`) 实现 [`FlutterPlugin`][] 接口。
   对于稍微复杂的插件，您可以将 `FlutterPlugin` 与 `MethodCallHandler`
   拆分到不同的类中。如需更多关于如何使用新版 API 获取资源的内容，请参考下一节
   [基础插件][Basic plugin] 。
   <br><br>
   Also, note that the plugin should still contain the static
   `registerWith()` method to remain compatible with apps that
   don't use the v2 Android embedding.
   (See [Upgrading pre 1.12 Android projects][] for details.)
   The easiest thing to do (if possible) is move the logic from
   `registerWith()` into a private method that both
   `registerWith()` and `onAttachedToEngine()` can call.
   Either `registerWith()` or `onAttachToEngine()` will be called,
   not both.
   
   同时需要注意的是，插件仍需保留静态的 `registerWith()` 方法，从而适配不兼容
   v2 版本嵌入的应用。 (查看 [Upgrading pre 1.12 Android projects][] 获取更多信息)
   <br><br>
   In addition, you should document all non-overridden public members
   within the plugin. In an add-to-app scenario,
   these classes are accessible to a developer and
   require documentation.
   
   此外，所有不可覆盖的公开成员都应该使用文档标注。在嵌入开发的场景下，这些可见内容
   通常需要包含文档。

1. (Optional) If your plugin needs an `Activity` reference,
   also implement the [`ActivityAware`][] interface.
   
   （可选）如果您的插件需要 `Activity` 的引用，请同时实现 [`ActivityAware`][] 接口。

1. (Optional) If your plugin is expected to be held in a
   background Service at any point in time, implement the
   [`ServiceAware`][] interface.
   
   （可选）如果您的插件需要随时保持一个后台 Service ，请实现 [`ServiceAware`][] 接口。

1. Update the example app's `MainActivity.java` to use the
   v2 embedding `FlutterActivity`. For details, see
   [Upgrading pre 1.12 Android projects][].
   You may have to make a public constructor for your plugin class
   if one didn't exist already. For example:
   
   使用 `FlutterActivity` 将示例应用中的 `MainActivity.java`
   迁移到 v2 版本嵌入。
   更多信息请查看 [Upgrading pre 1.12 Android projects][] 。
   如果您的插件类尚不存在，则必须添加一个公有构造函数。例如：

   <!--code-excerpt "MainActivity.java" title-->
   ```java
    package io.flutter.plugins.firebasecoreexample;

    import io.flutter.embedding.android.FlutterActivity;
    import io.flutter.embedding.engine.FlutterEngine;
    import io.flutter.plugins.firebase.core.FirebaseCorePlugin;

    public class MainActivity extends FlutterActivity {
      // You can keep this empty class or remove it. Plugins on the new embedding
      // now automatically registers plugins.
    }
    ```

1. (Optional) If you removed `MainActivity.java`, update the
   `<plugin_name>/example/android/app/src/main/AndroidManifest.xml`
   to use `io.flutter.embedding.android.FlutterActivity`.
   For example:
   
   （可选）如果您移除了 `MainActivity.java` ，请更新
   `<plugin_name>/example/android/app/src/main/AndroidManifest.xml`
   以使用 `io.flutter.embedding.android.FlutterActivity` 。例如：

    <!--code-excerpt "AndroidManifest.xml" title-->
    ```xml
     <activity android:name="io.flutter.embedding.android.FlutterActivity"
            android:theme="@style/LaunchTheme"
   android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
                android:name="io.flutter.app.android.SplashScreenUntilFirstFrame"
                android:value="true" />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    ```

1. (Optional) Create an `EmbeddingV1Activity.java` file]
   that uses the v1 embedding for the example project
   in the same folder as `MainActivity` to
   keep testing the v1 embedding's compatibility
   with your plugin. Note that you have to manually
   register all the plugins instead of using
   `GeneratedPluginRegistrant`.  For example:
   
   （可选）在 `MainActivity.java` 同级目录下创建一个 
   `EmbeddingV1Activity.java` 文件，使用 v1 版本嵌入以
   持续测试您的项目对 v1 版本嵌入的兼容性。例如：

    <!--code-excerpt "EmbeddingV1Activity.java" title-->
    ```java
    package io.flutter.plugins.batteryexample;

    import android.os.Bundle;
    import dev.flutter.plugins.e2e.E2EPlugin;
    import io.flutter.app.FlutterActivity;
    import io.flutter.plugins.battery.BatteryPlugin;

    public class EmbeddingV1Activity extends FlutterActivity {
      @Override
      protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        BatteryPlugin.registerWith(registrarFor("io.flutter.plugins.battery.BatteryPlugin"));
        E2EPlugin.registerWith(registrarFor("dev.flutter.plugins.e2e.E2EPlugin"));
      }
    }
    ```

1.  Add `<meta-data android:name="flutterEmbedding" android:value="2"/>`
    to the `<plugin_name>/example/android/app/src/main/AndroidManifest.xml`.
    This sets the example app to use the v2 embedding.
    
    将 `<meta-data android:name="flutterEmbedding" android:value="2"/>`
    添加至 `<plugin_name>/example/android/app/src/main/AndroidManifest.xml` 。
    这会让示例应用使用 v2 版本的嵌入。

1. (Optional) If you created an `EmbeddingV1Activity`
   in the previoous step, add the `EmbeddingV1Activity` to the
   `<plugin_name>/example/android/app/src/main/AndroidManifest.xml` file.
   For example:
   
   （可选）如果上步您创建了 `EmbeddingV1Activity` ，
   将 `EmbeddingV1Activity`
   添加至 `<plugin_name>/example/android/app/src/main/AndroidManifest.xml` 文件。
   例如：

    <!--code-excerpt "AndroidManifest.xml" title-->
    ```xml
    <activity
        android:name=".EmbeddingV1Activity"
        android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale"
        android:hardwareAccelerated="true"
        android:windowSoftInputMode="adjustResize">
    </activity>
    ```

## Testing your plugin

## 测试您的插件

The remaining steps address testing your plugin, which we encourage,
but aren't required.

剩下的步骤让您可以测试您的插件，我们鼓励您这样做，但这并不是必需的。

1. Update `<plugin_name>/example/android/app/build.gradle`
   to replace references to `android.support.test` with `androidx.test`:
   
   替换 `<plugin_name>/example/android/app/build.gradle` 文件中
   `android.support.test` 的引用为 `androidx.test` ：

    <!--code-excerpt "build.gradle" title-->
    ```groovy
    defaultConfig {
      ...
      testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
      ...
    }
    ```

    <!--code-excerpt "build.gradle" title-->
    ```groovy
    dependencies {
    ...
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test:rules:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
    ...
    }
    ```

1. Add tests files for `MainActivity` and `EmbeddingV1Activity`
   in `<plugin_name>/example/android/app/src/androidTest/java/<plugin_path>/`.
   You will need to create these directories. For example:
   
   在 `<plugin_name>/example/android/app/src/androidTest/java/<plugin_path>/` 
   路径下添加针对 `MainActivity` 和 `EmbeddingV1Activity` 的测试文件，
   并且您需要创建该目录。例如：

    <!--code-excerpt "MainActivityTest.java" title-->
    ```java
    package io.flutter.plugins.firebase.core;

    import androidx.test.rule.ActivityTestRule;
    import dev.flutter.plugins.e2e.FlutterRunner;
    import io.flutter.plugins.firebasecoreexample.MainActivity;
    import org.junit.Rule;
    import org.junit.runner.RunWith;

    @RunWith(FlutterRunner.class)
    public class MainActivityTest {
      // Replace `MainActivity` with `io.flutter.embedding.android.FlutterActivity` if you removed `MainActivity`.
      @Rule public ActivityTestRule<MainActivity> rule = new ActivityTestRule<>(MainActivity.class);
    }
    ```

    <!--code-excerpt "EmbeddingV1ActivityTest.java" title-->
    ```java
    package io.flutter.plugins.firebase.core;

    import androidx.test.rule.ActivityTestRule;
    import dev.flutter.plugins.e2e.FlutterRunner;
    import io.flutter.plugins.firebasecoreexample.EmbeddingV1Activity;
    import org.junit.Rule;
    import org.junit.runner.RunWith;

    @RunWith(FlutterRunner.class)
    public class EmbeddingV1ActivityTest {
      @Rule
      public ActivityTestRule<EmbeddingV1Activity> rule =
          new ActivityTestRule<>(EmbeddingV1Activity.class);
    }
    ```

1. Add `e2e` and `flutter_driver` dev_dependencies to
   `<plugin_name>/pubspec.yaml` and
   `<plugin_name>/example/pubspec.yaml`.
   
   在 `<plugin_name>/pubspec.yaml` 和
   `<plugin_name>/example/pubspec.yaml` 中的
   dev_dependencies 下添加 `e2e` 和 `flutter_driver`。

    <!--code-excerpt "pubspec.yaml" title-->
    ```yaml
    e2e: ^0.2.1
    flutter_driver:
      sdk: flutter
    ```

1. Update minimum Flutter version of environment in
   `<plugin_name>/pubspec.yaml`. All plugins moving
   forward will set the minimum version to 1.12.13+hotfix.6
   which is the minimum version for which we can guarantee support.
   For example:
   
   更新 `<plugin_name>/pubspec.yaml` 中 Flutter 版本的最低限制。
   所有已迁移的插件都将会设置最低版本为我们保证支持的最低版本
   1.12.13+hotfix.6 。例如：

    <!--code-excerpt "pubspec.yaml" title-->
    ```yaml
    environment:
      sdk: ">=2.0.0-dev.28.0 <3.0.0"
      flutter: ">=1.12.13+hotfix.6 <2.0.0"
    ```

1. Create a simple test in `<plugin_name>/test/<plugin_name>_e2e.dart`.
   For the purpose of testing the PR that adds the v2 embedding support,
   we're trying to test some very basic functionality of the plugin.
   This is a smoke test to ensure that the plugin properly registers
   with the new embedder. For example:
   
   在 `<plugin_name>/test/<plugin_name>_e2e.dart` 中创建一个简单的测试。
   为了测试添加了 v2 版本嵌入支持的 PR ，我们将尝试测试一些插件的基础功能。
   这是一个确保插件正确注册到新的嵌入器的烟雾测试。例如：

    <!-- skip -->
    ```dart
    import 'package:flutter_test/flutter_test.dart';
    import 'package:battery/battery.dart';
    import 'package:e2e/e2e.dart';

    void main() {
      E2EWidgetsFlutterBinding.ensureInitialized();

      testWidgets('Can get battery level', (WidgetTester tester) async {
        final Battery battery = Battery();
        final int batteryLevel = await battery.batteryLevel;
        expect(batteryLevel, isNotNull);
      });
    }
    ```

1. Test run the e2e tests locally. In a terminal,
   do the following:
   
   本地运行 e2e 测试。在终端中执行以下内容：

    ```sh
    cd <plugin_name>/example
    flutter build apk
    cd android
    ./gradlew app:connectedAndroidTest -Ptarget=`pwd`/../../test/<plugin_name>_e2e.dart
    ```

## Basic plugin

## 基础插件

To get started with a Flutter Android plugin in code,
start by implementing `FlutterPlugin`.

要开始开发一个新的 Flutter Android 插件，请从 `FlutterPlugin` 的实现开始。

```java
public class MyPlugin implements FlutterPlugin {
  @Override
  public void onAttachedToEngine(@NonNull FlutterPluginBinding binding) {
    // TODO: your plugin is now attached to a Flutter experience.
  }

  @Override
  public void onDetachedFromEngine(@NonNull FlutterPluginBinding binding) {
    // TODO: your plugin is no longer attached to a Flutter experience.
  }
}
```

As shown above, your plugin may or may not be associated with
a given Flutter experience at any given moment in time.
You should take care to initialize your plugin's behavior
in `onAttachedToEngine()`, and then cleanup your plugin's
references in `onDetachedFromEngine()`.

如上述代码所示，您的插件在任意时刻都可能与 Flutter 的体验有关或无关。
您需要特别注意，在 `onAttachedToEngine()` 进行初始化，并且在
`onDetachedFromEngine()` 中进行清理插件的各种引用。

The FlutterPluginBinding provides your plugin with a few
important references:

FlutterPluginBinding 为您的插件提供了几个重要的引用：

**binding.getFlutterEngine()**
: Returns the `FlutterEngine` that your plugin is attached to,
  providing access to components like the `DartExecutor`,
  `FlutterRenderer`, and more.

: 返回插件附加到的 `FlutterEngine` ，提供了诸如 `DartExecutor` 、
  `FlutterRenderer` 等内容的获取。

**binding.getApplicationContext()**
: Returns the Android application's `Context` for the running app.

: 返回当前运行的安卓应用的 Application `Context` 。

## UI/Activity plugin

## UI/Activity 插件

If your plugin needs to interact with the UI,
such as requesting permissions, or altering Android UI chrome,
then you need to take additional steps to define your plugin.
You must implement the `ActivityAware` interface.

如果您的插件需要与 UI 进行交互，例如请求权限或更改 Android UI ，
那么您就需要一些附加步骤来构建您的插件。
您必须实现 `ActivityAware` 接口。

```java
public class MyPlugin implements FlutterPlugin, ActivityAware {
  //...normal plugin behavior is hidden...

  @Override
  public void onAttachedToActivity(ActivityPluginBinding activityPluginBinding) {
    // TODO: your plugin is now attached to an Activity
  }

  @Override
  public void onDetachedFromActivityForConfigChanges() {
    // TODO: the Activity your plugin was attached to was
    // destroyed to change configuration.
    // This call will be followed by onReattachedToActivityForConfigChanges().
  }

  @Override
  public void onReattachedToActivityForConfigChanges(ActivityPluginBinding activityPluginBinding) {
    // TODO: your plugin is now attached to a new Activity
    // after a configuration change.
  }

  @Override
  public void onDetachedFromActivity() {
    // TODO: your plugin is no longer associated with an Activity.
    // Clean up references.
  }
}
```

To interact with an `Activity`, your `ActivityAware` plugin must
implement appropriate behavior at 4 stages. First, your plugin
is attached to an `Activity`. You can access that `Activity` and
a number of its callbacks through the provided `ActivityPluginBinding`.

若需要与 `Activity` 交互，您已经实现 `ActivityAware` 的插件需要
在 4 个不同的阶段实现不同的行为。
首先，确保您的插件已经附加至 `Activity` 。
您可以通过提供的 `ActivityPluginBinding` 获取到 `Activity` 及一些回调。

Since `Activity`s can be destroyed during configuration changes,
you must cleanup any references to the given `Activity` in
`onDetachedFromActivityForConfigChanges()`,
and then re-establish those references in
`onReattachedToActivityForConfigChanges()`.

由于 `Activity` 有可能在配置变化时被销毁，您必须在
`onDetachedFromActivityForConfigChanges()` 方法中
清理所有与 `Activity` 有关的引用，接着在 
`onReattachedToActivityForConfigChanges()` 中重新建立它们。

Finally, in `onDetachedFromActivity()` your plugin should clean
up all references related to `Activity` behavior and return to
a non-UI configuration.

最后，在 `onDetachedFromActivity()` 中清理所有与 `Activity`
有关的引用并返回与 UI 无关的配置。


[`ActivityAware`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityAware.html
[Basic plugin]: #basic-plugin
[battery package]: {{site.github}}/flutter/plugins/tree/master/packages/battery
[Flutter plugins]: {{site.pub}}/flutter.dev/packages
[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`PluginRegistry.Registrar`]: {{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html
[`PluginRegistry.Registrar.activity()`]: {{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html#activity--
[`ServiceAware`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/service/ServiceAware.html
[Upgrading pre 1.12 Android projects]: /go/android-project-migration
[verified publisher]: {{site.dart-site}}/tools/pub/verified-publishers
