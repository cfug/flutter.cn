---
# title: Check app functionality with an integration test
title: 通过集成测试检查应用的功能
# description: Learn how to write integration tests
description: 学习如何编写集成测试
tags: 测试,Flutter Test,集成测试
ai-translated: true
---

<?code-excerpt path-base="testing/integration_tests/how_to"?>

## Introduction

## 介绍

This guide describes how to run integration tests with your Flutter app. With
it, you'll learn how to do the following:

本指南说明如何为 Flutter 应用运行集成测试。你将学习如何：

* Set up integration tests.

  设置集成测试。

* Verify if an app displays specific text.

  验证应用是否显示特定文本。

* Tap specific widgets.

  点击特定 widget。

* Run integration tests.

  运行集成测试。

The guide references the `counter_app` project that comes with
Flutter and the Flutter [`integration_test`][] package. The
`integration_test` package lets you:

本指南引用 Flutter 自带的 `counter_app` 项目以及 Flutter [`integration_test`][] package。
`integration_test` package 可以：

* Use the `flutter drive` command to run tests on a physical device or emulator.

  使用 `flutter drive` 命令在真机或模拟器上运行测试。

* Run on [Firebase Test Lab][], to automate testing on a variety of devices.

  在 [Firebase Test Lab][] 上运行，在多种设备上自动化测试。

* Use [flutter_test][] APIs to write tests in a style similar to
  [widget tests][].

  使用 [flutter_test][] API，以类似 [widget 测试][widget tests] 的风格编写测试。

## Create a new app to test

## 创建待测新应用

Integration testing requires an app to test.
This example uses the built-in **Counter App** example
that Flutter produces when you run the `flutter create` command.
The counter app allows a user to tap on a button to increase a counter.

集成测试需要待测应用。本示例使用运行 `flutter create` 时 Flutter 生成的内置 **计数器应用**。
计数器应用允许用户点击按钮增加计数。

1. To create an instance of the built-in Flutter app,
   run the following command in your terminal:

   要在终端中创建内置 Flutter 应用实例，请运行：

   ```console
   $ flutter create counter_app
   ```

1. Change into the `counter_app` directory.

   进入 `counter_app` 目录。

1. Open `lib/main.dart` in your preferred IDE.

   在你偏好的 IDE 中打开 `lib/main.dart`。

1. Add a `key` parameter to the `floatingActionButton()` widget
   with an instance of a `Key` class with a string value of `increment`.

   为 `floatingActionButton()` widget 添加 `key` 参数，使用字符串值为 `increment` 的 `Key` 类实例。

   ```dart
    floatingActionButton: FloatingActionButton(
      [!key: const ValueKey('increment'),!]
      onPressed: _incrementCounter,
      tooltip: 'Increment',
      child: const Icon(Icons.add),
    ),
   ```

1. Save your `lib/main.dart` file.

   保存 `lib/main.dart` 文件。

After these changes,
the `lib/main.dart` file should resemble the following code.

完成上述修改后，`lib/main.dart` 应类似以下代码。

<?code-excerpt "lib/main.dart"?>
```dart title="lib/main.dart"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Counter App',
      home: MyHomePage(title: 'Counter App Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // Provide a Key to this button. This allows finding this
        // specific button inside the test suite, and tapping it.
        key: const Key('increment'),
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## Add the `integration_test` dependency

## 添加 `integration_test` 依赖

You need to add the testing packages to your new app.

需要为新建应用添加测试 package。

To add `integration_test` and `flutter_test` packages as
`dev_dependencies` using `sdk: flutter`, run following command.

要使用 `sdk: flutter` 将 `integration_test` 与 `flutter_test` package 添加为 `dev_dependencies`，
请运行：

```console
$ flutter pub add "dev:integration_test:{sdk: flutter}"
```

Output:

输出：

```console
Building flutter tool...
Resolving dependencies...
Got dependencies.
Resolving dependencies...
+ file 7.0.0
+ flutter_driver 0.0.0 from sdk flutter
+ fuchsia_remote_debug_protocol 0.0.0 from sdk flutter
+ integration_test 0.0.0 from sdk flutter
...
  test_api 0.6.1 (0.7.1 available)
  vm_service 13.0.0 (14.2.1 available)
+ webdriver 3.0.3
Changed 8 dependencies!
7 packages have newer versions incompatible with dependency constraints.
Try `flutter pub outdated` for more information.
```

Updated `pubspec.yaml` file:

更新后的 `pubspec.yaml` 文件：

```yaml title="pubspec.yaml"
# ...
dev_dependencies:
  # ... added dependencies
  flutter_test:
    sdk: flutter
  flutter_lints: ^6.0.0
  [!integration_test:!]
    [!sdk: flutter!]
# ...
```

## Create the integration test files

## 创建集成测试文件

Integration tests reside in a separate directory inside
your Flutter project.

集成测试位于 Flutter 项目内的独立目录中。

1. Create a new directory named `integration_test`.

   新建名为 `integration_test` 的目录。

1. Add empty file named `app_test.dart` in that directory.

   在该目录中添加名为 `app_test.dart` 的空文件。

The resulting directory tree should resemble the following:

最终目录树应类似：

```plaintext
counter_app/
  lib/
    main.dart
  integration_test/
    app_test.dart
```

## Write the integration test

## 编写集成测试

The integration test file consists of a Dart code file
with dependencies on `integration_test`, `flutter_test`,
and your app's Dart file.

集成测试文件是由依赖 `integration_test`、`flutter_test` 以及应用 Dart 文件的 Dart 代码文件组成。

1. Open your `integration_test/app_test.dart` file in your preferred IDE.

   在你偏好的 IDE 中打开 `integration_test/app_test.dart`。

1. Copy the following code and paste it into your
   `integration_test/app_test.dart` file.
   The last import should point to the `main.dart` file
   of your `counter_app`.
   (This `import` points to the example app called `introduction`.)

   将以下代码复制并粘贴到 `integration_test/app_test.dart`。最后一个 import 应指向 `counter_app` 的 `main.dart`。
   （此 `import` 指向名为 `introduction` 的示例应用。）

    <?code-excerpt "integration_test/counter_test.dart (initial)" replace="/introduction/counter_app/g"?>
    ```dart title="integration_test/counter_test.dart"
    import 'package:flutter/material.dart';
    import 'package:flutter_test/flutter_test.dart';
    import 'package:how_to/main.dart';
    import 'package:integration_test/integration_test.dart';
    
    void main() {
      IntegrationTestWidgetsFlutterBinding.ensureInitialized();
    
      group('end-to-end test', () {
        testWidgets('tap on the floating action button, verify counter', (
          tester,
        ) async {
          // Load app widget.
          await tester.pumpWidget(const MyApp());
    
          // Verify the counter starts at 0.
          expect(find.text('0'), findsOneWidget);
    
          // Finds the floating action button to tap on.
          final fab = find.byKey(const ValueKey('increment'));
    
          // Emulate a tap on the floating action button.
          await tester.tap(fab);
    
          // Trigger a frame.
          await tester.pumpAndSettle();
    
          // Verify the counter increments by 1.
          expect(find.text('1'), findsOneWidget);
        });
      });
    }
    ```

This example goes through three steps:

本示例分三步：

1. Initialize `IntegrationTestWidgetsFlutterBinding`.
   This singleton service executes tests on a physical device.

   初始化 `IntegrationTestWidgetsFlutterBinding`。该单例服务在物理设备上执行测试。

2. Interact and test widgets using the `WidgetTester` class.

   使用 `WidgetTester` 类与 widget 交互并测试。

3. Test the important scenarios.

   测试重要场景。

## Run integration tests

## 运行集成测试

The integration tests that run vary depending on the
platform on which you test.

运行的集成测试因测试平台而异。

* To test a desktop platform, use the command line or a CI system.

  在桌面平台上测试，请使用命令行或 CI 系统。

* To test a mobile platform, use the command line or Firebase Test Lab.

  在移动平台上测试，请使用命令行或 Firebase Test Lab。

* To test in a web browser, use the command line.

  在 Web 浏览器中测试，请使用命令行。

---

### Test on a desktop platform

### 在桌面平台上测试

<details markdown="1">
<summary><t>Expand if you test Linux apps using a CI system</t><t>若使用 CI 系统测试 Linux 应用请展开</t></summary>

To test a Linux app, your CI system must invoke an X server first.
In the GitHub Action, GitLab Runner, or similar configuration file,
set the integration test to work _with_ the `xvfb-run` tool.

测试 Linux 应用时，CI 系统须先启动 X server。
在 GitHub Action、GitLab Runner 或类似配置文件中，
将集成测试配置为与 `xvfb-run` 工具配合使用。

Doing this invokes an X Window system into which Flutter can
launch and test your Linux app.

这样会启动 X Window 系统，Flutter 可在其中启动并测试 Linux 应用。

As an example using GitHub Actions, your `jobs.setup.steps` should
include a step resembling the following:

以 GitHub Actions 为例，`jobs.setup.steps` 应包含类似下面的步骤：

### Example workflow

### 示例工作流

```yaml
      - name: Run Integration Tests
        uses: username/xvfb-action@v1.1.2
        with:
          run: flutter test integration_test -d linux -r github
```

This starts the integration test within an X Window.

这样会先在 X Window 中启动集成测试。

If you don't configure your integration in this way,
Flutter returns an error.

若未如此配置集成测试，Flutter 会返回错误。

```console
Building Linux application...
Error waiting for a debug connection: The log reader stopped unexpectedly, or never started.
```

</details>

To test on a macOS, Windows, or Linux platform,
complete the following tasks.

在 macOS、Windows 或 Linux 平台上测试，请完成以下任务。

1. Run the following command from the root of the project.

   在项目根目录运行：

   ```console
   $ flutter test integration_test/app_test.dart
   ```

1. If offered a choice of platform to test,
   choose the desktop platform.
   Type `1` to choose the desktop platform.

   若提示选择测试平台，请选择桌面平台。输入 `1` 选择桌面平台。

Based on platform, the command result should resemble the following output.

根据平台，命令结果应类似以下输出。

<Tabs key="dev-os">
<Tab name="Windows">

{% render "docs/test/integration/windows-example.md" %}

</Tab>
<Tab name="macOS">

{% render "docs/test/integration/macos-example.md" %}

</Tab>
<Tab name="Linux">

{% render "docs/test/integration/linux-example.md" %}

</Tab>
</Tabs>

---

### Test on an Android device

### 在 Android 设备上测试

To test on a real Android device,
complete the following tasks.

在真实 Android 设备上测试，请完成以下任务。

1.  Connect the Android device.

    连接 Android 设备。

1.  Run the following command from the root of the project.

    在项目根目录运行：

    ```console
    $ flutter test integration_test/app_test.dart
    ```

    The result should resemble the following output.

    结果应类似以下输出。

    ```console
    $ flutter test integration_test/app_test.dart
    00:04 +0: loading /path/to/counter_app/integration_test/app_test.dart
    00:15 +0: loading /path/to/counter_app/integration_test/app_test.dart
    00:18 +0: loading /path/to/counter_app/integration_test/app_test.dart   2,387ms
    Installing build/app/outputs/flutter-apk/app.apk...  612ms
    00:21 +1: All tests passed!
    ```

1.  Verify that the test removed the Counter App when it finished.
    If not, subsequent tests fail. If needed, press on the app and choose
    **Remove App** from the context menu.

    确认测试结束后已移除计数器应用。否则后续测试会失败。
    必要时长按应用，在上下文菜单中选择 **Remove App**。

---

### Test on an iOS device

### 在 iOS 设备上测试

To test on a real iOS device, complete the following tasks.

在真实 iOS 设备上测试，请完成以下任务。

1. Connect the iOS device.

   连接 iOS 设备。

1. Run the following command from the root of the project.

   在项目根目录运行：

   ```console
   $ flutter test integration_test/app_test.dart
   ```

   The result should resemble the following output.

   结果应类似以下输出。

   ```console
   $ flutter test integration_test/app_test.dart
   00:04 +0: loading /path/to/counter_app/integration_test/app_test.dart
   00:15 +0: loading /path/to/counter_app/integration_test/app_test.dart
   00:18 +0: loading /path/to/counter_app/integration_test/app_test.dart   2,387ms
   Xcode build done.                                           13.5s
   00:21 +1: All tests passed!
   ```

1. Verify that the test removed the Counter App when it finished.
   If not, subsequent tests fail. If needed, press on the app and choose
   **Remove App** from the context menu.

   确认测试结束后已移除计数器应用。否则后续测试会失败。
   必要时长按应用，在上下文菜单中选择 **Remove App**。

---

### Test in a web browser

### 在 Web 浏览器中测试

{% comment %}
TODO(ryjohn): Add back after other WebDriver versions are supported:
https://github.com/flutter/flutter/issues/90158

To test for web,
determine which browser you want to test against
and download the corresponding web driver:

* Chrome: Download [ChromeDriver][]
* Firefox: [Download GeckoDriver][]
* Safari: Safari can only be tested on a Mac;
  the SafariDriver is already installed on Mac machines.
* Edge [Download EdgeDriver][]
{% endcomment -%}

To test in a web browser, perform the following steps.

在 Web 浏览器中测试，请按以下步骤操作。

1. Install [ChromeDriver][] into the directory of your choice.

   将 [ChromeDriver][] 安装到你选择的目录。

   ```console
   $ npx @puppeteer/browsers install chromedriver@stable
   ```

   To simplify the install, this command uses the
   [`@puppeteer/browsers`][puppeteer] Node library.

   为简化安装，该命令使用 [`@puppeteer/browsers`][puppeteer] Node library。

   [puppeteer]: https://www.npmjs.com/package/@puppeteer/browsers

1. Add the path to ChromeDriver to your `$PATH` environment variable.

   将 ChromeDriver 路径加入 `$PATH` 环境变量。

1. Verify the ChromeDriver install succeeded.

   验证 ChromeDriver 安装成功。

   ```console
   $ chromedriver --version
   ChromeDriver 124.0.6367.60 (8771130bd84f76d855ae42fbe02752b03e352f17-refs/branch-heads/6367@{#798})
   ```

1. In your `counter_app` project directory,
   create a new directory named `test_driver`.

   在 `counter_app` 项目目录中新建 `test_driver` 目录。

   ```console
   $ mkdir test_driver
   ```

1. In this directory, create a new file named `integration_test.dart`.

   在该目录中新建 `integration_test.dart` 文件。

1. Copy the following code and paste it into your `integration_test.dart` file.

   将以下代码复制并粘贴到 `integration_test.dart` 文件。

   <?code-excerpt "test_driver/integration_test.dart"?>
   ```dart title="test_driver/integration_test.dart"
   import 'package:integration_test/integration_test_driver.dart';
   
   Future<void> main() => integrationDriver();
   ```

1. Launch `chromedriver` as follows:

   按以下方式启动 `chromedriver`：

   ```console
   $ chromedriver --port=4444
   ```

1. From the root of the project, run the following command:

   在项目根目录运行：

   ```console
   $ flutter drive \
     --driver=test_driver/integration_test.dart \
     --target=integration_test/app_test.dart \
     -d chrome
   ```

   The response should resemble the following output:

   响应应类似以下输出：

   ```console
   Resolving dependencies...
     leak_tracker 10.0.0 (10.0.5 available)
     leak_tracker_flutter_testing 2.0.1 (3.0.5 available)
     leak_tracker_testing 2.0.1 (3.0.1 available)
     material_color_utilities 0.8.0 (0.11.1 available)
     meta 1.11.0 (1.14.0 available)
     test_api 0.6.1 (0.7.1 available)
     vm_service 13.0.0 (14.2.1 available)
   Got dependencies!
   7 packages have newer versions incompatible with dependency constraints.
   Try `flutter pub outdated` for more information.
   Launching integration_test/app_test.dart on Chrome in debug mode...
   Waiting for connection from debug service on Chrome...             10.9s
   This app is linked to the debug service: ws://127.0.0.1:51523/3lofIjIdmbs=/ws
   Debug service listening on ws://127.0.0.1:51523/3lofIjIdmbs=/ws
   00:00 +0: end-to-end test tap on the floating action button, verify counter
   00:01 +1: (tearDownAll)
   00:01 +2: All tests passed!
   All tests passed.
   Application finished.
   ```

   To run this as a headless test, run `flutter drive`
   with `-d web-server` option:

   要以无头方式运行，请对 `flutter drive` 使用 `-d web-server` 选项：

   ```console
   $ flutter drive \
     --driver=test_driver/integration_test.dart \
     --target=integration_test/app_test.dart \
     -d web-server
   ```

To learn more, see the
[Running Flutter driver tests with web][] wiki page.

更多信息请参阅 [Running Flutter driver tests with web][] wiki 页面。

---

### Test in Firebase Test Lab (Android)

### 在 Firebase Test Lab 中测试 (Android)

You can use Firebase Test Lab to test Android targets.

可使用 Firebase Test Lab 测试 Android 目标。

#### Android setup

#### Android 设置

Follow the instructions in the [Android Device Testing][]
section of the README.

请遵循 README 中的 [Android Device Testing][] 章节说明。

#### Test Lab project setup

#### Test Lab 项目设置

1. Launch your [Firebase Console][].

   打开 [Firebase Console][]。

1. Create a new Firebase project if necessary.

   如有需要，创建新的 Firebase 项目。

1. Navigate to **Quality > Test Lab**.

   导航至 **Quality > Test Lab**。

   <img src='/assets/images/docs/integration-test/test-lab-1.png' alt="Firebase Test Lab Console">

#### Upload an Android APK

#### 上传 Android APK

Complete the following steps to upload an Android APK.

完成以下步骤以上传 Android APK。

1.  Create an APK using Gradle.

    使用 Gradle 创建 APK。

    ```console
    // Go to the Android directory which contains the gradlew script
    $ pushd android

    // Build a debug APK for Flutter with gradlew
    // Note that a standard --release build will not include package:integration_test
    $ flutter build apk --debug

    // Build an Android test APK
    $ ./gradlew app:assembleAndroidTest

    // Build a debug APK by passing in an integration test
    $ ./gradlew app:assembleDebug -Ptarget=integration_test/<name>_test.dart
    ```

    *  `<name>_test.dart`: The file created in the **Project Setup** section.

       `<name>_test.dart`：在 **Project Setup** 章节创建的文件。

  1.  If needed, pass parameters into the integration test as a comma-separated
      list. Encode all parameters as `base64`.

      如有需要，以逗号分隔列表向集成测试传入参数，并将所有参数编码为 `base64`。

      ```console
      $ ./gradlew project:task -Pdart-defines="{base64 (key=value)}[, ...]"
      ```

      * `(key=value)}[, ...]`: Replace this with a comma-separated list of
        key value pairs.

        `(key=value)}[, ...]`：替换为逗号分隔的键值对列表。

  1.  Return to your previous directory.

      返回之前的目录。

      ```console
      $ popd
      ```

For additional instructions, see the
[Firebase Test Lab section of the README][].

更多说明请参阅 README 的 [Firebase Test Lab 章节][Firebase Test Lab section of the README]。

#### Start Robo test

#### 启动 Robo 测试

To use Robo test to run integration tests, complete the following steps.

要使用 Robo 测试运行集成测试，请完成以下步骤。

1.  Drag the debug APK from
    `<flutter_project_directory>/build/app/outputs/apk/debug`
    into the **Android Robo Test** target on the web page. For example:

    将 debug APK 从 `<flutter_project_directory>/build/app/outputs/apk/debug` 拖到网页上的 **Android Robo Test** 目标。例如：

    <img src='/assets/images/docs/integration-test/test-lab-2.png' alt="Firebase Test Lab upload">

1.  Click **Run a test**.

    点击 **Run a test**。

1.  Select the **Instrumentation** test type.

    选择 **Instrumentation** 测试类型。

1.  Add the App APK to the **App APK or AAB** box.

    将 App APK 添加到 **App APK or AAB** 框。

    `<flutter_project_directory>/build/app/outputs/apk/debug/<file>.apk`

1.  Add the Test APK to the **Test APK** box.

    将 Test APK 添加到 **Test APK** 框。

    `<flutter_project_directory>/build/app/outputs/apk/androidTest/debug/<file>.apk`

    <img src='/assets/images/docs/integration-test/test-lab-3.png' alt="Firebase Test Lab upload two APKs">

1.  If a failure occurs, click the red icon to view the output:

    若失败，点击红色图标查看输出：

    <img src='/assets/images/docs/integration-test/test-lab-4.png' alt="Firebase Test Lab test results">

---

### Test in Firebase Test Lab (iOS)

### 在 Firebase Test Lab 中测试 (iOS)

You can use Firebase Test Lab to test iOS targets.

可使用 Firebase Test Lab 测试 iOS 目标。

#### iOS setup

#### iOS 设置

Follow the [iOS Device Testing instructions][].

请遵循 [iOS Device Testing instructions][]。

#### Test Lab project setup

#### Test Lab 项目设置

1. Launch your [Firebase Console][].

   打开 [Firebase Console][]。

1. Create a new Firebase project if necessary.

   如有需要，创建新的 Firebase 项目。

1. Navigate to **Quality > Test Lab**.

   导航至 **Quality > Test Lab**。

   <img src='/assets/images/docs/integration-test/test-lab-1.png' alt="Firebase Test Lab Console">

#### Upload Xcode tests through the Firebase Console

#### 通过 Firebase Console 上传 Xcode 测试

To learn how to upload tests from a ZIP file, using the
Firebase Test Lab Console, consult the [Firebase Test Lab iOS instructions][].

要了解如何通过 Firebase Test Lab Console 从 ZIP 文件上传测试，请参阅 [Firebase Test Lab iOS instructions][]。

#### Upload Xcode tests to Firebase Console with the command line

#### 通过命令行将 Xcode 测试上传到 Firebase Console

To learn how to upload tests from a ZIP file from the command line to the
Firebase Test Lab Console, consult the [iOS Device Testing instructions][].

要了解如何从命令行将 ZIP 中的测试上传到 Firebase Test Lab Console，
请参阅 [iOS Device Testing instructions][]。

[`integration_test`]: {{site.repo.flutter}}/tree/main/packages/integration_test#integration_test
[Android Device Testing]: {{site.repo.flutter}}/tree/main/packages/integration_test#android-device-testing
[ChromeDriver]: https://googlechromelabs.github.io/chrome-for-testing/
[Download EdgeDriver]: https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
[Download GeckoDriver]: {{site.github}}/mozilla/geckodriver/releases
[Firebase Console]: https://console.firebase.google.com/
[Firebase Test Lab section of the README]: {{site.repo.flutter}}/tree/main/packages/integration_test#firebase-test-lab
[Firebase Test Lab]: {{site.firebase}}/docs/test-lab
[Firebase Test Lab iOS instructions]: {{site.firebase}}/docs/test-lab/ios/firebase-console
[flutter_test]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
[Integration testing]: /testing/integration-tests
[iOS Device Testing instructions]: {{site.repo.flutter}}/tree/main/packages/integration_test#ios-device-testing
[Running Flutter driver tests with web]: {{site.repo.flutter}}/blob/main/docs/contributing/testing/Running-Flutter-Driver-tests-with-Web.md
[widget tests]: /testing/overview#widget-tests
[flutter_driver]: {{site.api}}/flutter/flutter_driver/flutter_driver-library.html
[integration_test usage]: {{site.repo.flutter}}/tree/main/packages/integration_test#usage
[samples]: {{site.repo.samples}}
[testing_app]: {{site.repo.samples}}/tree/main/testing_app/integration_test
[testWidgets]: {{site.api}}/flutter/flutter_test/testWidgets.html
