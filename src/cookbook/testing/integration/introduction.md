---
title: An introduction to integration testing
title: 集成测试介绍
description: Learn about integration testing in Flutter.
description: 了解 Flutter 中的集成测试。
short-title: Introduction
short-title: 介绍
prev:
  title: Take a picture using the camera
  title: 调用设备相机拍照
  path: /docs/cookbook/plugins/picture-using-camera
next:
  title: Performance profiling
  title: 性能调试
  path: /docs/cookbook/testing/integration/profiling
---

<?code-excerpt path-base="cookbook/testing/integration/introduction/"?>

Unit tests and widget tests are handy for testing individual classes,
functions, or widgets. However, they generally don't test how
individual pieces work together as a whole, or capture the performance
of an application running on a real device. These tasks are performed
with *integration tests*.

Unit tests 和 Widget tests 在测试独立的类、函数或者组件时非常方便。
然而，它们并不能够测试单独的模块形成的整体或者获取真实设备上应用运行状态。
这些任务需要集成测试 (**integration tests**) 来处理。 

Integration tests are written using the [integration_test][] package, provided
by the SDK. 

集成测试由 SDK 直接提供支持，使用 [integration_test][] 这个 package 实现。

In this recipe, learn how to test a counter app. It demonstrates
how to setup integration tests, how to verify specific text is displayed
by the app, how to tap specific widgets, and how to run integration tests.

在这个章节中，我们将会学习如何去测试一个计数器应用，
包括如何设置集成测试、
如何验证指定文本能否在应用内正常显示、
如何模拟点击指定组件和如何运行集成测试。

This recipe uses the following steps:

本教程将包含以下步骤：

  1. Create an app to test.

     创建一个应用用于测试；

  2. Add the `integration_test` dependency.

     添加 `integration_test` 依赖

  3. Create the test files.

     创建测试文件

  4. Write the integration tests.

     编写集成测试
     
  5. Run the integration test.

     运行集成测试

### 1. Create an app to test

### 1. 创建一个应用用于测试

First, create an app for testing. In this example,
test the counter app produced by the `flutter create`
command. This app allows a user to tap on a button
to increase a counter.

首先，我们需要创建一个应用用于测试。
在这个示例中，我们将会测试一个由 `flutter create` 命令创建的计数器应用。
这个应用允许用户点击按钮增加计数。

Furthermore, provide a [`ValueKey`][] to
the `Text` and `FloatingActionButton` widgets.
This allows identifying and interacting with these
specific widgets inside the test suite.

此外，我们将会给 `Text` 组件和 `FloatingActionButton`
组件增加 [`ValueKey`][] 属性。
通过这个我们将可以在测试套件中标识特定组件并进行交互。

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Counter App',
      home: MyHomePage(title: 'Counter App Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
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
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              // Provide a Key to this specific Text widget. This allows
              // identifying the widget from inside the test suite,
              // and reading the text.
              key: const Key('counter'),
              style: Theme.of(context).textTheme.headline4,
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

### 2. Add the `integration_test` dependency

### 2. 添加 `integration_test` 依赖

Next, use the `integration_test`, `flutter_driver`, and `flutter_test` packages
to write integration tests. Add these dependencies to the `dev_dependencies`
section of the app's `pubspec.yaml` file, specifying the Flutter SDK as the
location of the package.

接着，我们需要用到 `integration_test`、`flutter_driver` 和 `flutter_test` 
这三个 package 来编写集成测试，把这三个依赖添加到应用`pubspec.yaml` 文件的
`dev_dependencies` 区域。

```yaml
dev_dependencies:
  integration_test:
    sdk: flutter
  flutter_test:
    sdk: flutter
```

### 3. Create the test files

### 3. 创建测试文件

Create a new directory, `integration_test`, with an empty `app_test.dart` file:

创建一个名为 `integration_test` 的新文件夹，
并在文件夹中创建一个空的 `app_test.dart` 文件： 

```
counter_app/
  lib/
    main.dart
  integration_test/
    app_test.dart
```

### 4. Write the integration test

### 4. 编写集成测试文件

Now you can write tests. This involves three steps:

现在我们可以来写测试文件了，步骤如下列三项：

  1. Initialize `IntegrationTestWidgetsFlutterBinding`, a singleton service that
     executes tests on a physical device.

     初始化一个单例 `IntegrationTestWidgetsFlutterBinding`，
     这将用于在物理设备上执行测试；

  2. Interact and tests widgets using the `WidgetTester` class.

     使用 `WidgetTester` 类测试并与 widget 发生交互；

  3. Test the important scenarios.

     测试重要的应用场景。

<?code-excerpt "lib/integration_test/app_test.dart (IntegrationTest)"?>
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:introduction/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('end-to-end test', () {
    testWidgets('tap on the floating action button, verify counter',
        (WidgetTester tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Verify the counter starts at 0.
      expect(find.text('0'), findsOneWidget);

      // Finds the floating action button to tap on.
      final Finder fab = find.byTooltip('Increment');

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

### 5. Run the integration test

### 5. 运行集成测试

The process of running the integration tests varies depending on the platform
you are testing against. You can test against a mobile platform or the web.

集成测试的运行情况会根据需要进行测试的平台不同而不尽相同，
你可以针对移动平台或者 Web 平台进行测试。

#### 5a. Mobile

#### 5a. 移动平台

To test on a real iOS / Android device, first connect the device and run the
following command from the root of the project:

在 iOS 或 Android 平台进行真机测试的时候，
首先需要连接设备并在工程的根目录运行下面的命令：

```terminal
flutter test integration_test/app_test.dart
```

Or, you can specify the directory to run all integration tests:

或者你可以在指定目录下运行所有的集成测试：

```terminal
flutter test integration_test
```

This command runs the app and integration tests on the target device. For more
information, see the [Integration testing][] page.

这个命令可以在目标设备上运行应用并执行集成测试，更多相关信息，
请参阅文档：[集成测试][Integration testing] 页面。

#### 5b. Web

#### 5b. Web 平台

To get started testing in a web browser, [Download ChromeDriver][].

在网页浏览器里开始进行集成测试，首先要下载 [ChromeDriver][Download ChromeDriver]。

Next, create a new directory named `test_driver` containing a new file
named`integration_test.dart`:

接下来，新建一个文件夹，命名为 `test_driver`，并包含一个新的文件，命名为
`integration_test.dart`。

<?code-excerpt "lib/test_driver/integration_test.dart"?>
```dart
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() => integrationDriver();
```

Launch WebDriver, for example: 

运行 WebDriver，执行命令比如：

```terminal
chromedriver --port=4444
```

From the root of the project, run the following command:

在工程的根目录下，运行如下命令：

```terminal
flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/app_test.dart \
  -d web-server
```

[Download ChromeDriver]: https://chromedriver.chromium.org/downloads
[Download EdgeDriver]: https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
[Download GeckoDriver]: {{site.github}}/mozilla/geckodriver/releases
[flutter_driver]: {{site.api}}/flutter/flutter_driver/flutter_driver-library.html
[integration_test]: {{site.repo.flutter}}/tree/master/packages/integration_test
[Integration testing]: {{site.url}}/testing/integration-tests
[`SerializableFinders`]: {{site.api}}/flutter/flutter_driver/CommonFinders-class.html
[`ValueKey`]: {{site.api}}/flutter/foundation/ValueKey-class.html