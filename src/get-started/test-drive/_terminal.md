<div class="tab-pane" id="terminal" role="tabpanel" aria-labelledby="terminal-tab" markdown="1">

## Create the app {#create-app}

## 创建应用 {#create-app}

Use the `flutter create` command to create a new project:

使用 `flutter create` 命令来创建新的工程：

```terminal
$ flutter create my_app
$ cd my_app
```

It is also possible to pass other arguments to `flutter create`,
such as the project name (*pubspec.yml*), the organization name,
or to specify the programming language used for the native platform:

你可以在运行 `flutter create` 时传递其他参数，例如项目名 (**pubspec.yaml**)、
组织名或者指定原生平台使用的语言：

```terminal
$ flutter create --project-name my_app --org dev.flutter --android-language java --ios-language objc my_app
$ cd my_app
```

The command creates a Flutter project directory called `my_app` that
contains a simple demo app that uses [Material Components][].

该命令会创建一个名为 `myapp`，里面包含一个简单的示例应用，
里面用到了 [Material 组件][Material Components]。

{% include_relative _main-code-note.md %}

## Run the app

## 运行应用

 1. Check that an Android device is running.
   If none are shown, follow the device-specific instructions
   on the [Install][] page for your OS.

    检查一下 Android 设备是否已经正常运行。
    如果应用未显示，请在 [安装][Install] 页面里，
    根据你的操作系统按照设备相关说明进行操作。

   ```terminal
   $ flutter devices
   ```

 1. Run the app with the following command:

    使用下面指令运行应用：

   ```terminal
   $ flutter run
   ```

{% capture save_changes -%}.
{% endcapture %}

 1. Type <kbd>r</kbd> in the terminal window.

    在命令行窗口输入 <kbd>r</kbd>

{% include_relative _try-hot-reload.md save_changes=save_changes %}
{% include docs/run-profile.md %}

[trusted your computer]: {{site.url}}/get-started/install/macos#trust

</div>

