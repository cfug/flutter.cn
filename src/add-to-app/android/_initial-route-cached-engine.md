The concept of an initial route is available when configuring a
`FlutterActivity` or a `FlutterFragment` with a new `FlutterEngine`.
However, `FlutterActivity` and `FlutterFragment` don't offer the
concept of an initial route when using a cached engine.
This is because a cached engine is expected to already be
running Dart code, which means it's too late to configure the
initial route.

当配置一个使用新 `FlutterEngine` 的 `FlutterActivity` 或者 `FlutterFragment` 时，
会使用到初始路由的概念。但是，使用缓存中的 Flutter 引擎时，
`FlutterActivity` 或者 `FlutterFragment` 则没有涉及初始路由的概念。
这是因为被缓存的引擎理论上已经执行了 Dart 代码，在这时配置初始路由已经太迟了。

Developers that would like their cached engine to begin
with a custom initial route can configure their cached
`FlutterEngine` to use a custom initial route just before
executing the Dart entrypoint. The following example
demonstrates the use of an initial route with a cached engine:

开发者如果想要让缓存中的引擎从自定义的初始路由开始运行，
那么可以执行 Dart 入口前，为缓存的 `FlutterEngine` 配置自定义的初始路由。
如下面这个例子：

{% samplecode cached-engine-with-initial-route %}
{% sample Java %}
<?code-excerpt title="MyApplication.java"?>
```java
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
{% sample Kotlin %}
<?code-excerpt title="MyApplication.kt"?>
```kotlin
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
{% endsamplecode %}

By setting the initial route of the navigation channel, the associated
`FlutterEngine` displays the desired route upon initial execution of the
`runApp()` Dart function.

通过设置导航通道中的初始路由，
会让关联的 `FlutterEngine` 在 `runApp()` 方法首次执行后，
展示已配置的路由页面。

Changing the initial route property of the navigation channel
after the initial execution of `runApp()` has no effect.
Developers who would like to use the same `FlutterEngine`
between different `Activity`s and `Fragment`s and switch
the route between those displays need to set up a method channel and
explicitly instruct their Dart code to change `Navigator` routes.

在 `runApp()` 的首次执行之后，修改导航通道中的初始路由属性是不会生效的。
想要在不同的 `Activity` 和 `Fragment` 之间使用同一个 `FlutterEngine`，
并且在其展示时切换不同的路由，开发者需要设置一个方法通道，
来显式地通知他们的 Dart 代码切换 `Navigator` 路由。

