The concept of an initial route is available when configuring a
`FlutterActivity` or a `FlutterFragment` with a new `FlutterEngine`.

在配置带有新 `FlutterEngine` 的 `FlutterActivity` 或 `FlutterFragment` 时，可以使用 initial route（初始路由）这一概念。
However, `FlutterActivity` and `FlutterFragment` don't offer the
concept of an initial route when using a cached engine.

但是，在使用缓存 engine 时，`FlutterActivity` 和 `FlutterFragment` 不提供 initial route 这一概念。
This is because a cached engine is expected to already be
running Dart code, which means it's too late to configure the
initial route.

这是因为缓存 engine 预期已经在运行 Dart 代码，这意味着配置 initial route 为时已晚。

Developers that would like their cached engine to begin
with a custom initial route can configure their cached
`FlutterEngine` to use a custom initial route just before
executing the Dart entrypoint. The following example
demonstrates the use of an initial route with a cached engine:

希望缓存 engine 以自定义 initial route 开始的开发者，可以在执行 Dart entrypoint 之前，为缓存的 `FlutterEngine` 配置自定义 initial route。以下示例演示了如何在缓存 engine 中使用 initial route：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyApplication.kt"
class MyApplication : Application() {
  lateinit var flutterEngine : FlutterEngine
  override fun onCreate() {
    super.onCreate()
    // Instantiate a FlutterEngine.
    flutterEngine = FlutterEngine(this)
    // Configure an initial route.
    flutterEngine.navigationChannel.setInitialRoute("your/route/here");
    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.dartExecutor.executeDartEntrypoint(
      DartExecutor.DartEntrypoint.createDefault()
    )
    // Cache the FlutterEngine to be used by FlutterActivity or FlutterFragment.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine)
  }
}
```

</Tab>
<Tab name="Java">

```java title="MyApplication.java"
public class MyApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    // Instantiate a FlutterEngine.
    flutterEngine = new FlutterEngine(this);
    // Configure an initial route.
    flutterEngine.getNavigationChannel().setInitialRoute("your/route/here");
    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.getDartExecutor().executeDartEntrypoint(
      DartEntrypoint.createDefault()
    );
    // Cache the FlutterEngine to be used by FlutterActivity or FlutterFragment.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine);
  }
}
```

</Tab>
</Tabs>

By setting the initial route of the navigation channel, the associated
`FlutterEngine` displays the desired route upon initial execution of the
`runApp()` Dart function.

通过设置 navigation channel 的 initial route，关联的 `FlutterEngine` 会在首次执行 `runApp()` Dart 函数时显示所需路由。

Changing the initial route property of the navigation channel
after the initial execution of `runApp()` has no effect.
Developers who would like to use the same `FlutterEngine`
between different `Activity`s and `Fragment`s and switch
the route between those displays need to set up a method channel and
explicitly instruct their Dart code to change `Navigator` routes.

在首次执行 `runApp()` 之后更改 navigation channel 的 initial route 属性不会生效。如果开发者希望在不同的 `Activity` 和 `Fragment` 之间复用同一个 `FlutterEngine`，并在这些界面之间切换路由，则需要设置 method channel，并显式指示 Dart 代码更改 `Navigator` 路由。
