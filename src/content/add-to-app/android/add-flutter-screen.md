---
# title: Add a Flutter screen to an Android app
title: 在 Android 应用中添加 Flutter 页面
# short-title: Add a Flutter screen
short-title: 添加一个 Flutter 页面
# description: >
#   Learn how to add a single Flutter screen to your existing Android app.
description: 了解如何在你现有的 Android 应用中添加单个 Flutter 页面。
---

This guide describes how to add a single Flutter screen to an
existing Android app. A Flutter screen can be added as a normal,
opaque screen, or as a see-through, translucent screen.
Both options are described in this guide.

本指南讲述了如何在一个现有的 Android 应用中添加单个 Flutter 页面。
添加到应用中的单个 Flutter 页面可以是不透明的普通页面，也可以是透明的页面。
这两种页面的使用都会在本指南中提到。

## Add a normal Flutter screen

## 添加一个普通的 Flutter 页面

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-screen/add-single-flutter-screen_header.png'
class="mw-100" alt="Add Flutter Screen Header">

### Step 1: Add FlutterActivity to AndroidManifest.xml

### 步骤 1：在 AndroidManifest.xml 中添加 FlutterActivity

Flutter provides [`FlutterActivity`][] to display a Flutter
experience within an Android app. Like any other [`Activity`][],
`FlutterActivity` must be registered in your
`AndroidManifest.xml`. Add the following XML to your
`AndroidManifest.xml` file under your `application` tag:

Flutter 提供了 [`FlutterActivity`][]，用于在 Android 应用内部展示一个 Flutter 的交互界面。
和其他的 [`Activity`][] 一样，`FlutterActivity` 必须在项目的 `AndroidManifest.xml` 文件中注册。
将下边的 XML 代码添加到你的 `AndroidManifest.xml` 文件中的 `application` 标签内：

```xml
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  />
```

The reference to `@style/LaunchTheme` can be replaced
by any Android theme that want to apply to your `FlutterActivity`.
The choice of theme dictates the colors applied to
Android's system chrome, like Android's navigation bar, and to
the background color of the `FlutterActivity` just before
the Flutter UI renders itself for the first time.

上述代码中的 `@style/LaunchTheme` 可以替换为想要在你的
`FlutterActivity` 中使用的其他 Android 主题。
主题的选择决定 Android 系统展示框架所使用的颜色，
例如 Android 的导航栏，以及 Flutter UI 自身的第一次渲染前 `FlutterActivity` 的背景色。

### Step 2: Launch FlutterActivity

### 步骤 2：加载 FlutterActivity

With `FlutterActivity` registered in your manifest file,
add code to launch `FlutterActivity` from whatever point
in your app that you'd like. The following example shows
`FlutterActivity` being launched from an `OnClickListener`.

在你的清单文件中注册了 `FlutterActivity` 之后，
根据需要，你可以在应用中的任意位置添加打开 `FlutterActivity` 的代码。
下边的代码展示了如何在 `OnClickListener` 的点击事件中打开 `FlutterActivity`。

:::note

Make sure to use the following import:

确保使用如下的语句导入：

<!--skip-->
```java
import io.flutter.embedding.android.FlutterActivity;
```

:::

{% samplecode "default-activity-launch", "Kotlin,Java" %}
{% sample "Kotlin" %}

```kotlin title="ExistingActivity.kt"
myButton.setOnClickListener {
  startActivity(
    FlutterActivity.createDefaultIntent(this)
  )
}
```

{% endsample %}
{% sample "Java" %}

```java title="ExistingActivity.java"
myButton.setOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    startActivity(
      FlutterActivity.createDefaultIntent(currentActivity)
    );
  }
});
```

{% endsample %}
{% endsamplecode %}

The previous example assumes that your Dart entrypoint
is called `main()`, and your initial Flutter route is '/'.
The Dart entrypoint can't be changed using `Intent`,
but the initial route can be changed using `Intent`.
The following example demonstrates how to launch a
`FlutterActivity` that initially renders a custom
route in Flutter.

上述的例子假定了你的 Dart 代码入口是调用 `main()`，并且你的 Flutter 初始路由是 '/'。
Dart 代码入口不能通过 `Intent` 改变，但是初始路由可以通过 `Intent` 来修改。
下面的例子讲解了如何打开一个自定义 Flutter 初始路由的 `FlutterActivity`。

{% samplecode "custom-activity-launch", "Kotlin,Java" %}
{% sample "Kotlin" %}

```kotlin title="ExistingActivity.kt"
myButton.setOnClickListener {
  startActivity(
    FlutterActivity
      .withNewEngine()
      .initialRoute("/my_route")
      .build(this)
  )
}
```

{% endsample %}
{% sample "Java" %}

```java title="ExistingActivity.java"
myButton.addOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    startActivity(
      FlutterActivity
        .withNewEngine()
        .initialRoute("/my_route")
        .build(currentActivity)
      );
  }
});
```

{% endsample %}
{% endsamplecode %}

Replace `"/my_route"` with your desired initial route.

可以用你想要的初始路由替换掉 `"/my_route"`。

The use of the `withNewEngine()` factory method
configures a `FlutterActivity` that internally create
its own [`FlutterEngine`][] instance. This comes with a
non-trivial initialization time. The alternative approach
is to instruct `FlutterActivity` to use a pre-warmed,
cached `FlutterEngine`, which minimizes Flutter's
initialization time. That approach is discussed next.

工厂方法 `withNewEngine()` 可以用于配置一个 `FlutterActivity`，
它会在内部创建一个属于自己的 `FlutterEngine` 实例，这会有一个明显的初始化时间。
另外一种可选的做法是让
`FlutterActivity` 使用一个预热且缓存的 `FlutterEngine`，
这可以最小化 Flutter 初始化的时间。
这种方式接下来会讨论到。

### Step 3: (Optional) Use a cached FlutterEngine

### 步骤 3：（可选）使用缓存的 FlutterEngine

Every `FlutterActivity` creates its own `FlutterEngine`
by default. Each `FlutterEngine` has a non-trivial
warm-up time. This means that launching a standard
`FlutterActivity` comes with a brief delay before your Flutter
experience becomes visible. To minimize this delay,
you can warm up a `FlutterEngine` before arriving at
your `FlutterActivity`, and then you can use
your pre-warmed `FlutterEngine` instead.

每一个 `FlutterActivity` 默认会创建它自己的 `FlutterEngine`。
每一个 `FlutterEngine` 会有一个明显的预热时间。
这意味着加载一个标准的 `FlutterActivity` 时，
在你的 Flutter 交互页面可见之前会有一个短暂的延迟。
想要最小化这个延迟时间，你可以在抵达你的 `FlutterActivity` 之前，
初始化一个 `FlutterEngine`，然后使用这个已经预热好的 `FlutterEngine`。

To pre-warm a `FlutterEngine`, find a reasonable
location in your app to instantiate a `FlutterEngine`.
The following example arbitrarily pre-warms a
`FlutterEngine` in the `Application` class:

要预热一个 `FlutterEngine`，
可以在你的应用中找一个合理的地方实例化一个 `FlutterEngine`。
下面的这个例子是在 `Application` 类中预先初始化一个 `FlutterEngine`：

{% samplecode "prewarm-engine", "Kotlin,Java" %}
{% sample "Kotlin" %}

```kotlin title="MyApplication.kt"
class MyApplication : Application() {
  lateinit var flutterEngine : FlutterEngine

  override fun onCreate() {
    super.onCreate()

    // Instantiate a FlutterEngine.
    flutterEngine = FlutterEngine(this)

    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.dartExecutor.executeDartEntrypoint(
      DartExecutor.DartEntrypoint.createDefault()
    )

    // Cache the FlutterEngine to be used by FlutterActivity.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine)
  }
}
```

{% endsample %}
{% sample "Java" %}

```java title="MyApplication.java"
public class MyApplication extends Application {
  public FlutterEngine flutterEngine;
  
  @Override
  public void onCreate() {
    super.onCreate();
    // Instantiate a FlutterEngine.
    flutterEngine = new FlutterEngine(this);

    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.getDartExecutor().executeDartEntrypoint(
      DartEntrypoint.createDefault()
    );

    // Cache the FlutterEngine to be used by FlutterActivity.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine);
  }
}
```

{% endsample %}
{% endsamplecode %}

The ID passed to the [`FlutterEngineCache`][] can be whatever you want.
Make sure that you pass the same ID to any `FlutterActivity`
or [`FlutterFragment`][] that should use the cached `FlutterEngine`.
Using `FlutterActivity` with a cached `FlutterEngine`
is discussed next.

传给 [`FlutterEngineCache`][] 的 ID 可以是你想要的任何名称。
确保 `FlutterActivity` 或 [`FlutterFragment`][] 在使用缓存的
`FlutterEngine` 时，传递了同样的 ID。
基于缓存的 `FlutterEngine` 来使用 `FlutterActivity` 会在后续讨论到。

:::note

To warm up a `FlutterEngine`, you must execute a Dart
entrypoint. Keep in mind that the moment
`executeDartEntrypoint()` is invoked,
your Dart entrypoint method begins executing.
If your Dart entrypoint invokes `runApp()`
to run a Flutter app, then your Flutter app behaves as if it
were running in a window of zero size until this
`FlutterEngine` is attached to a `FlutterActivity`,
`FlutterFragment`, or `FlutterView`. Make sure that your app
behaves appropriately between the time you warm it up and
the time you display Flutter content.

要预热一个 `FlutterEngine`，你必须执行一个 Dart 入口。
切记当 `executeDartEntrypoint()` 方法调用时，你的 Dart 入口方法就会开始执行。
如果你的 Dart 入口调用了 `runApp()` 来运行一个 Flutter 应用，
那么你的 Flutter 应用会像是运行在一个大小为零的窗口中，
直至 `FlutterEngine` 附属到一个 `FlutterActivity`，`FlutterFragment` 或 `FlutterView`。
请确保你的应用在开始预热到你展示 Flutter 内容中间的这段时间里表现正常。

:::

With a pre-warmed, cached `FlutterEngine`, you now need
to instruct your `FlutterActivity` to use the cached
`FlutterEngine` instead of creating a new one.
To accomplish this, use `FlutterActivity`'s `withCachedEngine()`
builder:

要使用预热且缓存的 `FlutterEngine` 时，
让你的 `FlutterActivity` 从缓存中获取 `FlutterEngine`，而不是创建一个新的。
可以使用 `FlutterActivity` 的 `withCachedEngine()` 方法来实现：

{% samplecode "cached-engine-activity-launch", "Kotlin,Java" %}
{% sample "Kotlin" %}

```kotlin title="ExistingActivity.kt"
myButton.setOnClickListener {
  startActivity(
    FlutterActivity
      .withCachedEngine("my_engine_id")
      .build(this)
  )
}
```

{% endsample %}
{% sample "Java" %}

```java title="ExistingActivity.java"
myButton.addOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    startActivity(
      FlutterActivity
        .withCachedEngine("my_engine_id")
        .build(currentActivity)
      );
  }
});
```

{% endsample %}
{% endsamplecode %}

When using the `withCachedEngine()` factory method,
pass the same ID that you used when caching the desired
`FlutterEngine`.

当使用 `withCachedEngine()` 方法时，传递你缓存对应 `FlutterEngine` 时用的相同 ID。

Now, when you launch `FlutterActivity`,
there is significantly less delay in
the display of Flutter content.

现在，当你加载 `FlutterActivity` 时，在展示 Flutter 内容前的延迟会明显降低。

:::note

When using a cached `FlutterEngine`, that `FlutterEngine` outlives any
`FlutterActivity` or `FlutterFragment` that displays it. Keep in
mind that Dart code begins executing as soon as you pre-warm the
`FlutterEngine`, and continues executing after the destruction of your
`FlutterActivity`/`FlutterFragment`. To stop executing and clear resources,
obtain your `FlutterEngine` from the `FlutterEngineCache` and destroy the
`FlutterEngine` with `FlutterEngine.destroy()`.

当使用一个缓存的 `FlutterEngine` 时，
`FlutterEngine` 会比展示它的 `FlutterActivity` 或 `FlutterFragment` 存活得更久。
切记，Dart 代码会在你预热 `FlutterEngine` 时就开始执行，
并且在你的 `FlutterActivity` 或 `FlutterFragment` 销毁后继续运行。
要停止代码运行和清理相关资源，可以从 `FlutterEngineCache` 中获取你的 `FlutterEngine`，
然后使用 `FlutterEngine.destroy()` 来销毁 `FlutterEngine`。

:::

:::note

Runtime performance isn't the only reason that you might
pre-warm and cache a `FlutterEngine`.
A pre-warmed `FlutterEngine` executes Dart code independent
from a `FlutterActivity`, which allows such a `FlutterEngine`
to be used to execute arbitrary Dart code at any moment.
Non-UI application logic can be executed in a `FlutterEngine`,
like networking and data caching, and in background behavior
within a `Service` or elsewhere. When using a `FlutterEngine`
to execute behavior in the background, be sure to adhere to all
Android restrictions on background execution.

运行时的性能考量并不是你会预热和缓存一个 `FlutterEngine` 的唯一原因。
一个预热的 `FlutterEngine` 会独立于 `FlutterActivity` 执行 Dart 代码，
即一个 `FlutterEngine` 可以在任意时刻用于执行任意代码。
非 UI 的应用逻辑可以在 `FlutterEngine` 中执行，
例如网络请求和数据缓存，以及在 `Service` 中或其他地方的后台行为。
当使用 `FlutterEngine` 在后台执行任务时，确保满足 Android 对于后台执行的所有限制。

:::

:::note

Flutter's debug/release builds have drastically different
performance characteristics. To evaluate the performance
of Flutter, use a release build.

Flutter 的 debug 与 release 构建体现了完全不同的性能。
评估 Flutter 的性能表现时，请使用 release 构建版本。

:::

#### Initial route with a cached engine

#### 为缓存的 FlutterEngine 设置初始路由

{% include docs/add-to-app/android-initial-route-cached-engine.md %}

## Add a translucent Flutter screen

## 添加一个透明主题的 FlutterActivity

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-screen/add-single-flutter-screen-transparent_header.png'
class="mw-100" alt="Add Flutter Screen With Translucency Header">

Most full-screen Flutter experiences are opaque.
However, some apps would like to deploy a Flutter
screen that looks like a modal, for example,
a dialog or bottom sheet. Flutter supports translucent
`FlutterActivity`s out of the box.

大部分的全屏 Flutter 交互页面是不透明的。
但是，一些应用可能会发布一个类似模态框的 Flutter 页面，
例如，一个对话框或者底部工作表。
Flutter 默认支持透明的 `FlutterActivity`。

To make your `FlutterActivity` translucent,
make the following changes to the regular process of
creating and launching a `FlutterActivity`.

要将你的 `FlutterActivity` 设置为透明，
在创建和加载 `FlutterActivity` 的常规步骤中做如下的变更。

### Step 1: Use a theme with translucency

### 步骤 1：使用透明的主题

Android requires a special theme property for `Activity`s that render
with a translucent background. Create or update an Android theme with the
following property:

Android 需要一个特殊的主题属性来让 `Activity` 以一个透明的背景渲染。
使用如下属性来创建或者修改一个 Android 主题：

```xml
<style name="MyTheme" parent="@style/MyParentTheme">
  <item name="android:windowIsTranslucent">true</item>
</style>
```

Then, apply the translucent theme to your `FlutterActivity`.

然后，将透明主题应用到你的 `FlutterActivity`。

```xml
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/MyTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  />
```

Your `FlutterActivity` now supports translucency.
Next, you need to launch your `FlutterActivity`
with explicit transparency support.

现在你的 `FlutterActivity` 已经支持透明化。
下一步，你需要在打开 `FlutterActivity` 时显式启用透明模式。

### Step 2: Start FlutterActivity with transparency

### 步骤 2：启动透明的 FlutterActivity

To launch your `FlutterActivity` with a transparent background,
pass the appropriate `BackgroundMode` to the `IntentBuilder`:

要打开透明背景的 `FlutterActivity`，
需要把对应的 `BackgroundMode` 传递给 `IntentBuilder`：

{% samplecode "transparent-activity-launch", "Kotlin,Java" %}
{% sample "Kotlin" %}

```kotlin title="ExistingActivity.kt"
// Using a new FlutterEngine.
startActivity(
  FlutterActivity
    .withNewEngine()
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(this)
);

// Using a cached FlutterEngine.
startActivity(
  FlutterActivity
    .withCachedEngine("my_engine_id")
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(this)
);
```

{% endsample %}
{% sample "Java" %}

```java title="ExistingActivity.java"
// Using a new FlutterEngine.
startActivity(
  FlutterActivity
    .withNewEngine()
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(context)
);

// Using a cached FlutterEngine.
startActivity(
  FlutterActivity
    .withCachedEngine("my_engine_id")
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(context)
);
```

{% endsample %}
{% endsamplecode %}

You now have a `FlutterActivity` with a transparent background.

现在你的 `FlutterAcivity` 的背景已经是透明的了。

:::note

Make sure that your Flutter content also includes a
translucent background. If your Flutter UI paints a
solid background color, then it still appears as
though your `FlutterActivity` has an opaque background.

确保你的 Flutter 内容也有一个透明的背景。
如果你的 Flutter UI 绘制了一个特定的背景颜色，
那么你的 `FlutterActivity` 依旧看起来会是有一个不透明的背景。

:::

[`FlutterActivity`]: {{site.api}}javadoc/io/flutter/embedding/android/FlutterActivity.html
[`Activity`]: {{site.android-dev}}reference/android/app/Activity
[`FlutterEngine`]: {{site.api}}javadoc/io/flutter/embedding/engine/FlutterEngine.html
[`FlutterEngineCache`]: {{site.api}}javadoc/io/flutter/embedding/engine/FlutterEngineCache.html
[`FlutterFragment`]: {{site.api}}javadoc/io/flutter/embedding/android/FlutterFragment.html
