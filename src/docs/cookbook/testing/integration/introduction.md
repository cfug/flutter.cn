---
title: An introduction to integration testing
title: 集成测试介绍
short-title: Introduction
prev:
  title: Take a picture using the Camera
  path: /docs/cookbook/plugins/picture-using-camera
next:
  title: Performance profiling
  title: 性能分析
  path: /docs/cookbook/testing/integration/profiling
---

Unit tests and Widget tests are handy for testing individual classes, functions,
or Widgets. However, they generally don't test how individual pieces work
together as a whole or capture the performance of an application running on a
real device. These tasks are performed with *integration tests*.

Unit tests 和 Widget tests 在测试独立的类、函数或者组件时非常方便。然而，它们并不能够测试单独的模块形成的整体或者获取真实设备上应用运行状态。这些任务需要集成测试 *integration tests* 来处理。 

Integration tests work as a pair: first, deploy an instrumented application to a
real device or emulator and then "drive" the application from a separate test
suite, checking to make sure everything is correct along the way.

Integration tests 是成对出现的：首先，发布一个可测试应用程序到真是设备或者模拟器，然后，利用独立的测试套件去驱动应用程序，检查一切是否完好可用。

To create this test pair, we can use the
[flutter_driver]({{site.api}}/flutter/flutter_driver/flutter_driver-library.html)
package. It provides tools to create instrumented apps and drive those apps
from a test suite.

为了创建这个测试对，可以使用 [flutter_driver]({{site.api}}/flutter/flutter_driver/flutter_driver-library.html) 包。这个包提供了创建可测试应用的工具并支持从测试套件驱动应用程序。

In this recipe, we'll learn how to test a counter app. It will demonstrate
how to setup integration tests, how to verify specific text is displayed by the
app, how to tap on specific Widgets, and how to run integration tests.

在这个章节中，我们将会学习如何去测试一个计数器应用程序，包括如何设置集成测试 integration tests、如何验证指定文本能否在应用程序内正常显示、如何模拟点击指定组件和如何运行 integration tests。

### Directions

### 步骤

  1. Create an app to test

     创建一个应用程序用于测试

  2. Add the `flutter_driver` dependency

     添加 `flutter_driver` 依赖

  3. Create the test files

     创建测试文件

  4. Instrument the app

     安装测试应用程序

  5. Write the integration tests

     编写集成测试 integration tests
     
  6. Run the integration test

     运行集成测试 integration test

### 1. Create an app to test

### 1. 创建一个应用程序用于测试

First, we'll create an app that we can test! In this example, we'll test the
counter app produced by the `flutter create` command. This app allows
a user to tap on a button to increase a counter.

首先，我们需要创建一个应用程序用于测试。在这个示例中，我们将会测试一个由 `flutter create` 命令创建的计数器应用。这个应用程序允许用户点击按钮增加计数。

Furthermore, we'll also need to provide a
[`ValueKey`]({{site.api}}/flutter/foundation/ValueKey-class.html) to
the `Text` and `FloatingActionButton` Widgets. This allows us to identify
and interact with these specific Widgets inside the test suite.

此外，我们将会给 `Text` 组件和 `FloatingActionButton` 组件增加 [`ValueKey`]({{site.api}}/flutter/foundation/ValueKey-class.html) 属性。这将允许我们在测试套件中标识特定组件并进行交互。


```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Counter App',
      home: MyHomePage(title: 'Counter App Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

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
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              // Provide a Key to this specific Text Widget. This allows us
              // to identify this specific Widget from inside our test suite and
              // read the text.
              key: Key('counter'),
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // Provide a Key to this the button. This allows us to find this
        // specific button and tap it inside the test suite.
        key: Key('increment'),
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

### 2. Add the `flutter_driver` dependency

### 2. 添加 `flutter_driver` 依赖

Next, we'll need the `flutter_driver` package to write integration tests. We
can add the `flutter_driver` dependency to the `dev_dependencies` section of
our apps's `pubspec.yaml` file.

接着，我们需要用到 `flutter_driver` 包来编写 integration tests。因此，我们需要把 `flutter_driver` 依赖添加到应用`pubspec.yaml` 文件的 `dev_dependencies` 区域。

We also add the `test` dependency in order to use actual test functions and
assertions.

同时，我们也需要添加 `test` 依赖去使用实际的测试函数和断言。

```yaml
dev_dependencies:
  flutter_driver:
    sdk: flutter
  test: any
```

### 3. Create the test files

### 3. 创建测试文件

Unlike unit and widget tests, integration test suites do not run in the same
process as the app being tested. Therefore, we need to create two files that
reside in the same directory. By convention, the directory is named
`test_driver`.

和 unit tests 以及 widget tests 不一样的是，integration test 套件并不会和待测应用运行在同一个进程内。因此，我们需要同一个文件夹下创建两份文件。为了方便，我们把文件夹命名为 `test_driver`。

  1. The first file contains an "instrumented" version of the app. The
  instrumentation allows us to "drive" the app and record performance profiles
  from a test suite. This file can be given any name that makes sense. For this
  example, create a file called `test_driver/app.dart`.

     第一个文件包含了应用的 “待检测” 版本号。这个检测允许我们利用测试套件驱动应用并记录运行概况。这个文件可以被命名成任何名字。在本例中，创建了文件，命名为 `test_driver/app.dart`。

  2. The second file contains the test suite, which drives the app and verifies
  it works as expected. The test suite can also record performance profiles.
  The name of the test file must correspond to the name of the file that
  contains the instrumented app, with `_test` added at the end. Therefore,
  create a second file called `test_driver/app_test.dart`.

     第二个文件包含了测试套件，用于驱动应用程序并验证应用的运行状况是否与预期一致。测试套件也可以记录运行概况。这个测试文件的命名有严格要求，必须是待测应用的名称并在名称尾部加上 `_test`。因此，我们需要创建的第二个文件被命名成 `test_driver/app_test.dart`。

This leaves us with the following directory structure:

以下是我们的文件结构：

```
counter_app/
  lib/
    main.dart
  test_driver/
    app.dart
    app_test.dart
```


### 4. Instrument the app

### 4. 安装测试应用程序

Now, we can instrument the app. This will involve two steps:

现在，我们可以安装测试应用测序。这包含了两个步骤：

  1. Enable the flutter driver extensions

     让 flutter driver 的扩展可用

  2. Run the app

     运行应用程序

We will add this code inside the `test_driver/app.dart` file.

我们会在 `test_driver/app.dart` 文件中增加以下代码：

<!-- skip -->
```dart
import 'package:flutter_driver/driver_extension.dart';
import 'package:counter_app/main.dart' as app;

void main() {
  // This line enables the extension
  enableFlutterDriverExtension();

  // Call the `main()` function of your app or call `runApp` with any widget you
  // are interested in testing.
  app.main();
}
```

### 5. Write the tests

### 5. 编写集成测试文件

Now that we have an instrumented app, we can write tests for it! This
will involve four steps:

现在我们有了待测应用，我们可以为它编写测试文件了。这包含了四个步骤：

  1. Create
  [`SeralizableFinders`]({{site.api}}/flutter/flutter_driver/CommonFinders-class.html)
  to locate specific Widgets
 
     创建 [`SeralizableFinders`]({{site.api}}/flutter/flutter_driver/CommonFinders-class.html) 定位指定组件

  2. Connect to the app before our tests run in the `setUpAll` function

     在 `setUpAll` 函数中运行测试案例前，先与待测应用建立连接

  3. Test the important scenarios

     测试重要场景

  4. Disconnect from the app in the `teardownAll` function after our tests
  complete


     完成测试后，在 `teardownAll` 函数中与待测应用断开连接

```dart
// Imports the Flutter Driver API
import 'package:flutter_driver/flutter_driver.dart';
import 'package:test/test.dart';

void main() {
  group('Counter App', () {
    // First, define the Finders. We can use these to locate Widgets from the
    // test suite. Note: the Strings provided to the `byValueKey` method must
    // be the same as the Strings we used for the Keys in step 1.
    final counterTextFinder = find.byValueKey('counter');
    final buttonFinder = find.byValueKey('increment');

    FlutterDriver driver;

    // Connect to the Flutter driver before running any tests
    setUpAll(() async {
      driver = await FlutterDriver.connect();
    });

    // Close the connection to the driver after the tests have completed
    tearDownAll(() async {
      if (driver != null) {
        driver.close();
      }
    });

    test('starts at 0', () async {
      // Use the `driver.getText` method to verify the counter starts at 0.
      expect(await driver.getText(counterTextFinder), "0");
    });

    test('increments the counter', () async {
      // First, tap on the button
      await driver.tap(buttonFinder);

      // Then, verify the counter text has been incremented by 1
      expect(await driver.getText(counterTextFinder), "1");
    });
  });
}
```

### 6. Run the tests

### 6. 运行集成测试

Now that we have an instrumented app and a test suite, we can run the tests!
First, be sure to launch an Android Emulator, iOS Simulator, or connect your
computer to a real iOS / Android device.

我们有了待测应用和测试套件后，就可以运行测试了。首先，启动安卓模拟器或者 iOS 模拟器，或者直接把 iOS 或 Android 真机连接到你的电脑上。

Then, run the following command from the root of the project:

接着，在项目的根文件夹下运行下面的命令：

```
flutter drive --target=test_driver/app.dart
```

This command:

这个指令的作用：

  1. builds the `--target` app and installs it on the emulator / device

     创建 `--target` 目标应用并且把它安装在模拟器或真机中

  2. launches the app

     启动应用程序

  3. runs the `app_test.dart` test suite located in `test_driver/` folder

     运行位于 `test_driver/` 文件夹下的 `app_test.dart` 测试套件
