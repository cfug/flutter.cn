---
title: Integration testing
title: 集成测试
description: Learn how to write integration tests
description: 学习如何撰写集成测试
tags: 测试,Flutter Test,集成测试
---

<?code-excerpt path-base="testing/integration_tests/how_to"?>

This page describes how to use the [`integration_test`][] package to run
integration tests. Tests written using this package have the following
properties:

本篇描述了如何使用 [`integration_test`][] package 来运行集成测试。
使用该 package 编写的测试具有以下特性：
 
* Compatibility with the `flutter drive` command,
  for running tests on a physical device or emulator.

  兼容 `flutter drive` 指令，
  用于在真机或模拟器上运行测试。

* The ability to be run on [Firebase Test Lab][],
  enabling automated testing on a variety of devices.

  能够通过 [Firebase Test Lab][] 在各种设备上进行自动化测试。

* Compatibility with [flutter_test][] APIs,
  enabling tests to be written in a similar style as [widget tests][] 

  兼容 [flutter_test][] API，
  能够使用类似 [widget 测试][widget tests] 的风格进行编写。

:::note

The `integration_test` package is part of the Flutter SDK itself.
To use it, make sure that you update your app's pubspec file
to include this package as one of your `dev_dependencies`.
For an example, see the [Project setup](#project-setup) section below.

Flutter SDK 本身自带 `integration_test` package。
要使用它，请确保你的应用程序 pubspec 文件 `dev_dependencies` 中引入了它。
请查看 [项目设置](#project-setup) 的示例。

:::

## Overview

## 概览

**Unit tests, widget tests, and integration tests**

**单元测试、Widget 测试和集成测试**

There are three types of tests that Flutter supports.
A **unit** test verifies the behavior of a method or class.
A **widget test** verifies the behavior of Flutter widgets
without running the app itself. An **integration test** (also
called end-to-end testing or GUI testing) runs the full app.

Flutter 支持三种类型的测试。
**单元测试** 验证一个方法或类的行为。
**Widget 测试** 无需运行应用程序就可以验证 Flutter widget 的行为。
**集成测试**（又名端到端测试或 GUI 测试）运行整个应用程序。

**Hosts and targets**

**宿主和目标设备**

During development, you are probably writing the code
on a desktop computer, called the **host** machine,
and running the app on a mobile device, browser,
or desktop application, called the **target** device.
(If you are using a web
browser or desktop application,
the host machine is also the target device.)

在开发过程中，**宿主** 就是你的编码平台，应用程序在 **目标** 设备上运行，
就像你在台式电脑上编写代码，并在移动设备、浏览器或者桌面程序上运行你的应用程序，
（如果你使用的是 web 浏览器或桌面应用程序，宿主也是目标设备）

**integration_test**

**integration_test package**

Tests written with the `integration_test` package can:

用 `integration_test` package 编写的测试可以：
 
1. Run directly on the target device, allowing you to test on
   multiple Android or iOS devices using Firebase Test Lab.

   直接在目标设备上运行，
   允许使用 Firebase Test Lab 在多个 Android/iOS 设备上进行测试。

2. Run using `flutter test integration_test`.

   使用 `flutter test integration_test` 指令运行。

3. Use `flutter_test` APIs, making integration tests more
   like writing [widget tests][].

   使用 `flutter_test` API，
   让集成测试编写风格更像 [Widget 测试][widget tests]。

**Migrating from flutter_driver**

**从 flutter_driver 迁移**

Existing projects using `flutter_driver` can be migrated to
`integration_test` by following the [Migrating from flutter_drive][]
guide.

现在还在使用 `flutter_driver` 的项目可以通过以下方式迁移到 `integration_test`，
请查看 [从 flutter_driver 迁移][Migrating from flutter_drive] 指南。

## Project setup

## 项目设置

Add `integration_test` and `flutter_test` to your `pubspec.yaml` file:

在你的 `pubspec.yaml` 文件中加入 `integration_test` 和 `flutter_test`：

```console
$ flutter pub add 'dev:flutter_test:{"sdk":"flutter"}'  'dev:integration_test:{"sdk":"flutter"}'
"flutter_test" is already in "dev_dependencies". Will try to update the constraint.
Resolving dependencies... 
  collection 1.17.2 (1.18.0 available)
+ file 6.1.4 (7.0.0 available)
+ flutter_driver 0.0.0 from sdk flutter
+ fuchsia_remote_debug_protocol 0.0.0 from sdk flutter
+ integration_test 0.0.0 from sdk flutter
  material_color_utilities 0.5.0 (0.8.0 available)
  meta 1.9.1 (1.10.0 available)
+ platform 3.1.0 (3.1.2 available)
+ process 4.2.4 (5.0.0 available)
  stack_trace 1.11.0 (1.11.1 available)
  stream_channel 2.1.1 (2.1.2 available)
+ sync_http 0.3.1
  test_api 0.6.0 (0.6.1 available)
+ vm_service 11.7.1 (11.10.0 available)
+ webdriver 3.0.2
Changed 9 dependencies!
```

In your project, create a new directory
`integration_test` with a new file, `<name>_test.dart`:

在你的项目中，创建一个 `integration_test` 目录，
新目录中创建一个新文件 `<name>_test.dart`：

<?code-excerpt "integration_test/counter_test.dart (initial)" plaster="none"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:how_to/main.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  testWidgets('tap on the floating action button, verify counter',
      (tester) async {
    // Load app widget.
    await tester.pumpWidget(const MyApp());

    // Verify the counter starts at 0.
    expect(find.text('0'), findsOneWidget);

    // Finds the floating action button to tap on.
    final fab = find.byKey(const Key('increment'));

    // Emulate a tap on the floating action button.
    await tester.tap(fab);

    // Trigger a frame.
    await tester.pumpAndSettle();

    // Verify the counter increments by 1.
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}
```

:::note

Only use `testWidgets` to declare your tests.
Otherwise, Flutter could report errors incorrectly.

只能使用 `testWidgets` 来声明你的测试，
否则错误将无法正确抛出。

:::

If you are looking for more examples, take a look at the [testing_app][] of
the [samples][] repository.

如果你想了解更多示例，
请查看 [samples][] 中的 [testing_app][]。

### Directory structure

### 目录结构

```yaml
lib/
  ...
integration_test/
  foo_test.dart
  bar_test.dart
test/
  # Other unit tests go here.
```

See also:

另见：

 * [integration_test usage][]

## Running using the flutter command

## 使用 Flutter 指令运行测试

These tests can be launched with the
`flutter test` command, where `<DEVICE_ID>`:
is the optional device ID or pattern displayed
in the output of the `flutter devices` command:

这些测试可以用 `flutter test` 指令运行，
其中 `<DEVICE_ID>`：是可选项，可以通过 `flutter devices` 指定设备 ID 或显示模式：

```console
$ flutter test integration_test/foo_test.dart -d <DEVICE_ID>
```

This runs the tests in `foo_test.dart`. To run all tests in this directory on
the default device, run:

上面的指令将运行 `foo_test.dart` 中的测试。
要在默认设备上运行该目录下的所有测试，请运行：

```console
$ flutter test integration_test
```

### Running in a browser

### 在浏览器中运行测试

[Download and install ChromeDriver][chromedriver]
and run it on port 4444:

[下载安装 ChromeDriver][chromedriver] 
并在 4444 端口运行：

```console
$ chromedriver --port=4444
```

To run tests with `flutter drive`, create a new directory containing a new file,
`test_driver/integration_test.dart`:

为了使用 `flutter drive` 进行测试，请创建一个新的目录，
其中包含一个新的文件 `test_driver/integration_test.dart`：

<?code-excerpt "test_driver/integration_test.dart"?>
```dart
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() => integrationDriver();
```

Then add `IntegrationTestWidgetsFlutterBinding.ensureInitialized()` in your
`integration_test/<name>_test.dart` file:

然后将 `IntegrationTestWidgetsFlutterBinding.ensureInitialized()` 添加到
你的 `integration_test/<name>_test.dart` 文件中：

<?code-excerpt "integration_test/counter_test.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:how_to/main.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized(); // NEW

  testWidgets('tap on the floating action button, verify counter',
      (tester) async {
    // Load app widget.
    await tester.pumpWidget(const MyApp());

    // Verify the counter starts at 0.
    expect(find.text('0'), findsOneWidget);

    // Finds the floating action button to tap on.
    final fab = find.byKey(const Key('increment'));

    // Emulate a tap on the floating action button.
    await tester.tap(fab);

    // Trigger a frame.
    await tester.pumpAndSettle();

    // Verify the counter increments by 1.
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}
```

In a separate process, run `flutter_drive`:

最后在一个独立的进程中，运行 `flutter_drive`：

```console
$ flutter drive \
   --driver=test_driver/integration_test.dart \
   --target=integration_test/counter_test.dart \
   -d web-server
```

To learn more, see the
[Running Flutter driver tests with web][] wiki page.

了解更多信息，请查看 [Running Flutter driver tests with web][] 指南。

## Testing on Firebase Test Lab

## 在 Firebase Test Lab 进行测试

You can use the Firebase Test Lab with both Android
and iOS targets.

你可以通过 Firebase Test Lab 同时使用 Android 和 iOS 目标设备进行测试。

### Android setup

### Android 设置

Follow the instructions in the [Android Device Testing][]
section of the README.

请遵循 `integration_test` README 中的 [Android Device Testing][] 进行设置。

### iOS setup

### iOS 设置

Follow the instructions in the [iOS Device Testing][]
section of the README.

请遵循 `integration_test` README 中的 [iOS Device Testing][] 进行设置。

### Test Lab project setup

### Firebase Test Lab 项目设置

Go to the [Firebase Console][],
and create a new project if you don't have one
already. Then navigate to **Quality > Test Lab**:

进入 [Firebase 控制台][Firebase Console],
如果你还没有新的项目，就创建一个新项目。
然后导航菜单到 **Quality > Test Lab**:

<img src='/assets/images/docs/integration-test/test-lab-1.png' class="mw-100" alt="Firebase Test Lab Console">

### Uploading an Android APK

### 上传 Android APK

Create an APK using Gradle:

使用 Gradle 构建一个 APK：

```console
$ pushd android
# flutter build generates files in android/ for building the app
flutter build apk
./gradlew app:assembleAndroidTest
./gradlew app:assembleDebug -Ptarget=integration_test/<name>_test.dart
$ popd
```

Where `<name>_test.dart` is the file created in the
**Project Setup** section.

上面指令中的 `<name>_test.dart` 是在刚才 **项目设置** 创建的文件。

:::note

To use `--dart-define` with `gradlew`, you must `base64` encode
all parameters, and pass them to gradle in a comma separated list:

要在 `gradlew` 中使用 `--dart-define`，你必须对所有参数进行 `base64` 编码，
并将它们作为逗号分隔的列表传递给 gradle：

```console
./gradlew project:task -Pdart-defines="{base64(key=value)},[...]"
```

:::

Drag the "debug" APK from
`<flutter_project_directory>/build/app/outputs/apk/debug`
into the **Android Robo Test** target on the web page.
This starts a Robo test and allows you to run
other tests:

将 `<flutter_project_directory>/build/app/outputs/apk/debug` 内
打包完成的 "debug" APK 文件上传到网页上的 **Android Robo Test**。
这将启动一个 Robo 测试，并允许你运行其他测试：

<img src='/assets/images/docs/integration-test/test-lab-2.png' class="mw-100" alt="Firebase Test Lab upload">

Click **Run a test**,
select the **Instrumentation** test type and drag
the following two files:

点击 **Run a test**,
选择 **Instrumentation** 测试类型，
并上传以下两个文件
 
 * `<flutter_project_directory>/build/app/outputs/apk/debug/<file>.apk`
 * `<flutter_project_directory>/build/app/outputs/apk/androidTest/debug/<file>.apk`

<img src='/assets/images/docs/integration-test/test-lab-3.png' class="mw-100" alt="Firebase Test Lab upload two APKs">

If a failure occurs,
you can view the output by selecting the red icon:

如果发生故障，
你可以通过选择红色图标查看输出内容：

<img src='/assets/images/docs/integration-test/test-lab-4.png' class="mw-100" alt="Firebase Test Lab test results">

### Uploading an Android APK from the command line

### 通过指令上传 Android APK

See the [Firebase Test Lab section of the README][]
for instructions on uploading the APKs from the command line.

关于通过指令上传 APK 的说明，
请查看 `integration_test` README 中的 [Firebase Test Lab][Firebase Test Lab section of the README]。

### Uploading Xcode tests

### 上传 Xcode 测试

See the [Firebase TestLab iOS instructions][]
for details on how to upload the .zip file
to the Firebase TestLab section of the Firebase Console.

了解如何将 .zip 文件上传到 Firebase 控制台的 Firebase Test Lab，
请查看 [Firebase TestLab iOS instructions][]。

### Uploading Xcode tests from the command line

### 通过指令上传 Xcode 测试

See the [iOS Device Testing][] section in the README
for instructions on how to upload the .zip file
from the command line.

关于如何通过指令上传 .zip 文件的说明，
请查看 `integration_test` README 中的 [iOS Device Testing][]。

[Android Device Testing]: {{site.repo.flutter}}/tree/main/packages/integration_test#android-device-testing
[chromedriver]: https://googlechromelabs.github.io/chrome-for-testing/
[Firebase Console]: http://console.firebase.google.com/
[Firebase Test Lab]: {{site.firebase}}/docs/test-lab
[Firebase Test Lab section of the README]: {{site.repo.flutter}}/tree/main/packages/integration_test#firebase-test-lab
[Firebase TestLab iOS instructions]: {{site.firebase}}/docs/test-lab/ios/firebase-console
[flutter_test]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
[`integration_test`]: {{site.repo.flutter}}/tree/main/packages/integration_test#integration_test
[integration_test usage]: {{site.repo.flutter}}/tree/main/packages/integration_test#usage
[iOS Device Testing]: {{site.repo.flutter}}/tree/main/packages/integration_test#ios-device-testing
[Migrating from flutter_drive]: /release/breaking-changes/flutter-driver-migration
[Running Flutter driver tests with web]: {{site.repo.flutter}}/wiki/Running-Flutter-Driver-tests-with-Web
[samples]: {{site.repo.samples}}
[testing_app]: {{site.repo.samples}}/tree/main/testing_app/integration_test
[widget tests]: /testing/overview#widget-tests
