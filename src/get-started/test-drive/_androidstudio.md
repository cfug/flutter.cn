<div class="tab-pane" id="androidstudio" role="tabpanel" aria-labelledby="androidstudio-tab" markdown="1">

## Create the app {#create-app}

## 创建应用 {#create-app}

1. Open the IDE and select **New Flutter Project**.

   打开 IDE 并选中 **New Flutter Project**。

2. Select **Flutter**, verify the Flutter SDK path with the SDK's location.
   Then click **Next**.

   选择 **Flutter**，验证 Flutter SDK 的路径。完成后选择 **Next**。

3. Enter a project name (for example, `my_app`).

   输入项目名称（例如 `my_app`）。

4. Select **Application** as the project type.
   Then click **Next**.

   选择 **Application** 的项目类型，
   完成后选择 **Next**。

5. Click **Finish**.

   点击 **完成**。

6. Wait for Android Studio to create the project.

   等待 Android Studio 完成项目的创建。

{% include_relative _package-name.md  %}

The above commands create a Flutter project directory
called `my_app` that contains a simple demo app that
uses [Material Components][].

上述步骤会创建名为 `my_app` 的 Flutter 项目的文件夹，
它是一个使用了 [Material 组件][Material Components] 的简单 demo。

{% include_relative _main-code-note.md  %}

## Run the app

## 运行应用

 1. Locate the main Android Studio toolbar:<br>
    ![Main IntelliJ toolbar][]{:.mw-100}

    定位到 Android Studio 的工具栏：<br>
    ![Main IntelliJ toolbar][]{:.mw-100}

 1. In the **target selector**, select an Android device for running the app.
    If none are listed as available,
    select **Tools > AVD Manager** and create one there.
    For details, see [Managing AVDs][].

    在 **target selector** 中，选择一个用于运行应用的 Android 设备。
    如果列表为空，选择 **Tools > AVD Manager** 创建一个虚拟机。
    更多细节可以参考 [管理 AVD 虚拟机][Managing AVDs]。

 1. Click the run icon in the toolbar, or invoke the menu item **Run > Run**.

    点击工具栏中的运行按钮，或者点击菜单栏中的 **Run > Run**。

{% capture save_changes -%}
  : invoke **Save All**, or click **Hot Reload**
  {% include_relative _hot-reload-icon.md %}.
{% endcapture %}

{% capture ide_profile -%}
  to invoke the menu item **Run > Profile** in the IDE, or
{% endcapture %}

{% include_relative _try-hot-reload.md save_changes=save_changes %}
{% include docs/run-profile.md ide_profile=ide_profile %}

[Main IntelliJ toolbar]: {{site.url}}/assets/images/docs/tools/android-studio/main-toolbar.png
[Managing AVDs]: {{site.android-dev}}/studio/run/managing-avds
[Material Components]: {{site.material}}/components

</div>
