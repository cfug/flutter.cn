<div class="tab-pane active" id="androidstudio" role="tabpanel" aria-labelledby="androidstudio-tab" markdown="1">

## Create the app {#create-app}

## 创建应用 {#create-app}

 1. Select **File > New Flutter Project**.

    打开 **文件 > 新建 Flutter 项目**.
    
 1. Select **Flutter application** as the project type, and press **Next**.

    选择 **Flutter 应用程序** 作为项目类型， 然后点 **下一步**

 1. Make sure that the **Flutter SDK Path** text field specifies the
    location of the SDK. Install the SDK if you haven't yet done so.

    确认 **Flutter SDK 路径** 区域所示路径是正确的 SDK 路径。
    如果你还没有安装 SDK，需要先进行安装。
    
 1. Enter a project name (for example, `myapp`), and press **Next**.

    输入项目名称(比如 'myapp'), 然后点击**下一步**。
    
 1. Click **Finish**.
    
    点击 **完成**。
    
 1. Wait for Android Studio to install the SDK, and create the project.
    
    待 Android Studio 安装 SDK 后，创建项目。

The above commands create a Flutter project directory called `myapp` that
contains a simple demo app that uses [Material Components][].

上面的步骤会创建一个叫做 myapp 的 Flutter 项目目录，
里面会包含一个用到 [Material 组件][] 的简单的示例程序。

{% include_relative _main-code-note.md  %}

## Run the app
## 运行程序

 1. Locate the main Android Studio toolbar:<br>
    
    找到 Android Studio 的工具条:<br>
    ![Main IntelliJ toolbar][]{:.mw-100}

 1. In the **target selector**, select an Android device for running the app.
    If none are listed as available, select **Tools> Android > AVD Manager** and
    create one there. For details, see [Managing AVDs][].

    在 **目标选择器**， 选择一个 Android 设备来运行程序。
    如果列表里没有可用设备，选择 **工具 > Android > AVD Manager
    然后在这个窗口中创建一个新的虚拟机。更多详细介绍，参见[管理 AVDs][]。
    
 1. Click the run icon in the toolbar, or invoke the menu item **Run > Run**.

    点击工具栏中的 Run 图标，或者在菜单中选择 **Run > Run**。

{% capture save_changes -%}
  {% comment %}: invoke **Save All**, or click **Hot Reload** {% endcomment -%}
  : 选择 **Save All**，或者点击**热重载** <i class="material-icons align-bottom">offline_bolt</i>.
  {% comment %} Or, as an alternative:
    {% asset 'get-started/hot-reload-button.png' alt='looks like a lightning bolt' %}.
  {% endcomment -%}
{% endcapture %}

{% capture ide_profile -%}
  to invoke the menu item **Run > Profile** in the IDE, or
  
  点击 IDE 的菜单项目 **Run > Profile**，或者
{% endcapture %}

{% include_relative _try-hot-reload.md save_changes=save_changes %}
{% include run-profile.md ide_profile=ide_profile %}

[Main IntelliJ toolbar]: {% asset tools/android-studio/main-toolbar.png @path %}
[Managing AVDs]: {{site.android-dev}}/studio/run/managing-avds
[Material Components]: {{site.material}}/guidelines
[管理 AVDs]: {{site.android-dev}}/studio/run/managing-avds
[Material 组件]: {{site.material}}/guidelines
</div>
