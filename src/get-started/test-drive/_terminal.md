<div class="tab-pane" id="terminal" role="tabpanel" aria-labelledby="terminal-tab" markdown="1">

## Create the app  {#create-app}

## 创建应用程序

Use the `flutter create` command to create a new project:

使用 `flutter create` 命令来创建新的工程：

```terminal
$ flutter create myapp
$ cd myapp
```

It is also possible to pass other arguments to `flutter create`,
such as the project name (*pubspec.yml*), the organization name,
or to specify the programming language used for the native platform:

```terminal
$ flutter create --project-name myapp --org dev.flutter --android-language java --ios-language objc myapp
$ cd myapp
```

The command creates a Flutter project directory called `myapp` that
contains a simple demo app that uses [Material Components][].

该命令会创建一个名为 `myapp`，里面包含一个简单的示例程序，
里面用到了 [Material 组件][Material Components]

{% include_relative _main-code-note.md %}

## Run the app

## 运行程序

 1. Check that an Android device is running. If none are shown, follow the
    device-specific instructions on the [Install][] page for your OS.

    检查一下 Android 设备是否已经正常运行。
    如果程序未显示，请在 [安装][Install] 页面里，
    根据你的操作系统按照设备相关说明进行操作。

    ```terminal
    $ flutter devices
    ```

 1. Run the app with the following command:

    使用下面指令运行应用程序：

    ```terminal
    $ flutter run
    ```

{% capture save_changes -%}
.

1. Type <kbd>r</kbd> in the terminal window.

   在命令行窗口输入 <kbd>r</kbd>

{% endcapture %}

{% include_relative _try-hot-reload.md save_changes=save_changes %}
{% include docs/run-profile.md %}

[trusted your computer]: {{site.url}}/get-started/install/macos#trust

</div>

