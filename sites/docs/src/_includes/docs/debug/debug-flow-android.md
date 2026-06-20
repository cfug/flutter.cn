#### Build the Android version of the Flutter app in the Terminal

#### 在终端中构建 Flutter app 的 Android 版本

To generate the needed Android platform dependencies,
run the `flutter build` command.

要生成所需的 Android 平台依赖，请运行 `flutter build` 命令。

```console
flutter build appbundle --debug
```

```console
Running Gradle task 'bundleDebug'...                               27.1s
✓ Built build/app/outputs/bundle/debug/app-debug.aab.
```


<Tabs key="android-debug-flow">
<!-- <Tab name="Start from VS Code"> -->
<Tab name="从 VS Code 开始">

#### Start debugging with VS Code first {:#from-vscode-to-android-studio}

#### 先从 VS Code 开始调试 {:#from-vscode-to-android-studio}

If you use VS Code to debug most of your code, start with this section.

若你主要用 VS Code 调试代码，请从本节开始。

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

#### Attach to the Flutter process in Android Studio

#### 在 Android Studio 中附加到 Flutter 进程

{% render "docs/debug/debug-android-attach-process.md" %}

</Tab>
<!-- <Tab name="Start from Android Studio"> -->
<Tab name="从 Android Studio 开始">

#### Start debugging with Android Studio first {:#from-android-studio}

#### 先从 Android Studio 开始调试 {:#from-android-studio}

If you use Android Studio to debug most of your code, start with this section.

若你主要用 Android Studio 调试代码，请从本节开始。

{% render "docs/debug/debug-flow-androidstudio-as-start.md" %}

{% render "docs/debug/debug-android-attach-process.md" %}

</Tab>
</Tabs>
