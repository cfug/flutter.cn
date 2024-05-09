<div class="tab-pane active" id="vscode" role="tabpanel" aria-labelledby="vscode-tab">

### Create your sample Flutter app {:#create-app-vs-code}

1. Open the Command Palette.

   Go to **View** <span aria-label="and then">></span> **Command Palette** or
   press <kbd>{{special}}</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>.

1. Type `flutter`

1. Select the **Flutter: New Project**.

1. When prompted for **Which Flutter Project**, select **Application**.

1. Create or select the parent directory for the new project folder.

1. When prompted for a **Project Name**, enter `test_drive`.

1. Press <kbd>Enter</kbd>.

1. Wait for project creation to complete.

1. Open the `lib` directory, then the `main.dart`.

   To learn what each code block does, check out the comments in that Dart file.

The previous commands create a Flutter project directory called `test_drive` that
contains a simple demo app that uses [Material Components][].

### Run your sample Flutter app

Run your example application on your desktop platform, in the Chrome web browser, in an iOS simulator, or
Android emulator.

:::note
Though you can deploy your app to the web,
the web target doesn't support
hot reload at this time.
:::

1. Open the Command Palette.

   Go to **View** <span aria-label="and then">></span> **Command Palette** or
   press <kbd>{{special}}</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>.

1. Type `flutter`

1. Select the **Flutter: Select Device**.

   If no devices are running, this command prompts you to enable a device.

1. Select a target device from **Select Device** prompt.

1. After you select a target, start the app.
   Go to **Run** <span aria-label="and then">></span>
   **Start Debugging** or press <kbd>F5</kbd>.

1. Wait for the app to launch.

   You can watch the launch progress in the **Debug Console** view.

{% capture save_changes -%}
  : invoke **Save All**, or click **Hot Reload**
  {% include docs/install/test-drive/hot-reload-icon.md %}.
{% endcapture %}

{% include docs/install/test-drive/try-hot-reload.md save_changes=save_changes ide="VS Code" %}

[Material Components]: {{site.material}}/components

</div>
