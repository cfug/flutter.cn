After the app build completes, you'll see the starter app on your device.

当应用编译完成后，就可以在设备上运行这个起步应用了。

{% include app-figure.md img-class="site-mobile-screenshot border"
    path-prefix="get-started" platform="iOS" image="starter-app.png"
    caption="Starter app" %}

## Try hot reload

## 尝试热重载 (hot reload)

Flutter offers a fast development cycle with _Stateful Hot Reload_, the ability to reload
the code of a live running app without restarting or losing app state.
Make a change to app source, tell your IDE or command-line tool that you
want to hot reload, and see the change in your simulator, emulator, or device.

Flutter 通过 **热重载** 提供快速开发周期，该功能支持应用程序在运行状态下重载代码
而无需重新启动应用程序或者丢失程序运行状态。
修改一下代码，然后告诉IDE或者命令行工具你需要热重载，
然后看一下模拟器或者设备上应用的变化

 1. Open `lib/main.dart`.
 
    打开 `lib/main.dart`。
    
 1. Change the string

    修改字符串

    {% prettify dart %}
      'You have [[strike]]pushed[[/strike]] the button this many times'
    {% endprettify %}

    to
    
    改为
    
    {% prettify dart %}
      'You have [!clicked!] the button this many times'
    {% endprettify %}

    {{site.alert.important}}
    
      Do _not_ stop your app. Let your app run.
      
      **不要** 停止应用。保持应用处于运行状态。
      
    {{site.alert.end}}

 1. Save your changes {{include.save_changes}}
    
    保存修改 {{include.save_changes_zhcn}}

You'll see the updated string in the running app almost immediately.

你会发现修改后的字符串几乎马上出现在正在运行的应用程序上。
