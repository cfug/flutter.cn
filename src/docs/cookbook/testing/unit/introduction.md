---
title: An introduction to unit testing
title: 单元测试介绍
short-title: Introduction
prev:
  title: Perform scrolling
  title: 列表滚动
  path: /docs/cookbook/testing/integration/scrolling
next:
  title: Mock dependencies using Mockito
  title: 使用 Mockito 模拟依赖关系
  path: /docs/cookbook/testing/unit/mocking
---

How can you ensure that your app continues to work as you add more features or
change existing functionality? By writing tests.

我们如何保证 app 在增加了新特性或者改变了现有功能之后还能正常工作呢？答案是写测试！

Unit tests are handy for verifying the behavior of a single function,
method, or class. The [`test`]({{site.pub-pkg}}/test) package provides the
core framework for writing unit tests, and the
[`flutter_test`]({{site.api}}/flutter/flutter_test/flutter_test-library.html)
package provides additional utilities for testing widgets.

使用单元测试可轻松地验证单个函数、方法或类的行为。[`test`]({{site.pub-pkg}}/test) 这个 package 提供了写单测的核心框架，
[`flutter_test`]({{site.api}}/flutter/flutter_test/flutter_test-library.html)
包则提供了额外的功能来测试 widget。

This recipe demonstrates the core features provided by the `test` package
using the following steps:

本教程将会为大家演示 `test` package 的用法，内容如下：

  1. Add the `test` or `flutter_test` dependency.
     
     将 `test` 或者 `flutter_test`加入依赖；

  2. Create a test file.
     
     创建测试文件；

  3. Create a class to test.
     
     创建一个要测试的类；
     
  4. Write a `test` for our class.
     
     为创建的类写一个测试；

  5. Combine multiple tests in a `group`.
     
     整合多个测试到一个 `group`；

  6. Run the tests.
     
     执行测试。
     

使用单元测试可轻松地验证单个函数、方法或类的行为。[`test`]({{site.pub-pkg}}/test) 包提供了写单测的核心框架，
[`flutter_test`]({{site.api}}/flutter/flutter_test/flutter_test-library.html) 包则提供了额外的功能来测试 Widget。

For more information about the test package, see the
[test package
documentation]({{site.github}}/dart-lang/test/blob/master/README.md).

关于测试包的更多内容，可移步至 [测试包文档](https://github.com/dart-lang/test/blob/master/README.md).

## 1. Add the `test` or `flutter_test` dependency

## 1. 添加测试依赖 —— 将 `test` 或者 `flutter_test`加入依赖文件

If you're working on a Dart package that does not depend on Flutter,
you can import the `test` package. The test package provides the core
functionality for writing tests in Dart. This is the best approach when
writing packages consumed by web, server, and Flutter apps.

如果 Dart 包没有依赖 Flutter，可以导入 `test` 包。Test 包提供了编写测试所需要的核心功能。
当我们写的包需要被 web、服务端和 Flutter app 使用时，这是最佳的方式。

```yaml
dev_dependencies:
  test: <latest_version>
```

## 2. Create a test file

## 2. 创建测试文件

In this example, create two files: `counter.dart` and `counter_test.dart`.

本例中，我们会创建两个文件：`counter.dart` 和 `couter_test.dart`。

The `counter.dart` file contains a class that you want to test and
resides in the `lib` folder. The `counter_test.dart` file contains
the tests themselves and lives inside the `test` folder.

`counter.dart` 文件包含一个位于 `lib` 文件夹的待测试类,而位于 `test` 文件夹的`counter_test.dart` 文件将包含测试本身，。

In general, test files should reside inside a `test` folder located at the root
of your Flutter application or package.

通常测试文件应位于放置在 Flutter 应用或包的根目录下的 `test` 文件夹。

When you're finished, the folder structure should look like this:

创建完成后，文件目录结构如下：

```
counter_app/
  lib/
    counter.dart
  test/
    counter_test.dart
```

## 3. Create a class to test

## 3. 创建一个要测试的类

Next, you need a "unit" to test. Remember: "unit" is another name for a
function, method, or class. For this example, create a `Counter` class
inside the `lib/counter.dart` file. It is responsible for incrementing
and decrementing a `value` starting at `0`.

下一步，我们需要一个“单元”来测试。记住：“单元”是一个抽象的名称，它可以表示一个函数、方法或者类。
本例中，我们会在 `lib/counter.dart` 文件中创建一个 `Counter` 类。它负责增加或减少一个从 `0` 开始的 `value`。


<!-- skip -->
```dart
class Counter {
  int value = 0;

  void increment() => value++;

  void decrement() => value--;
}
```

**Note:** For simplicity, this tutorial does not follow the "Test Driven
Development" approach. If you're more comfortable with that style of
development, you can always go that route.

**注意：** 为了简化内容，本教程没有遵守“测试驱动开发”的写法。如果你擅长那种开发模式，当然可以选择用那种方式来写。

## 4. Write a test for our class

## 4. 为创建的类写一个测试

Inside the `counter_test.dart` file, write the first unit test. Tests are
defined using the top-level `test` function, and you can check if the results
are correct by using the top-level `expect` function.
Both of these functions come from the `test` package.

我们将在 `counter_test.dart` 文件中写第一个测试。使用顶级函数 `test` 来定义，可通过执行顶级函数 `expect` 来检查结果正确与否。这两个函数都来自 `test` 包。

<!-- skip -->
```dart
// Import the test package and Counter class
import 'package:test/test.dart';
import 'package:counter_app/counter.dart';

void main() {
  test('Counter value should be incremented', () {
    final counter = Counter();

    counter.increment();

    expect(counter.value, 1);
  });
}
```

## 5. Combine multiple tests in a `group`

## 5. 整合多个测试到一个 `group`

If you have several tests that are related to one another, 
combine them using the `group` function provided by the `test` package.

如果多个测试之间互相关联，可以使用 `test` 包提供的 `group` 函数将他们整合到一起。

<!-- skip -->
```dart
import 'package:test/test.dart';
import 'package:counter_app/counter.dart';

void main() {
  group('Counter', () {
    test('value should start at 0', () {
      expect(Counter().value, 0);
    });

    test('value should be incremented', () {
      final counter = Counter();

      counter.increment();

      expect(counter.value, 1);
    });

    test('value should be decremented', () {
      final counter = Counter();

      counter.decrement();

      expect(counter.value, -1);
    });
  });
}
```

### 6. Run the tests

### 6. 执行测试

Now that you have a `Counter` class with tests in place, you can run the tests.

现在 `Counter` 类和它的测试都有了，开始执行测试！

#### Run tests using IntelliJ or VSCode

#### 用 IntelliJ 或 VSCode 执行测试

The Flutter plugins for IntelliJ and VSCode support running tests.
This is often the best option while writing tests because it provides the
fastest feedback loop as well as the ability to set breakpoints.

IntelliJ 和 VSCode 的 Flutter 插件支持执行测试。用这种方式执行测试是最好的，因为它可以提供最快的反馈闭环，而且还支持断点调试。


  * **IntelliJ**

    1. Open the `counter_test.dart` file

       打开文件 `counter_test.dart`

    2. Select the `Run` menu
       
       选择菜单 `Run`

    3. Click the `Run 'tests in counter_test.dart'` option

       点击选项 `Run 'tests in counter_test.dart'`

    4. *Alternatively, use the appropriate keyboard shortcut for your platform.*

       *或者，也可以使用系统快捷键!*

  * **VSCode**

    1. Open the `counter_test.dart` file

       打开文件 `counter_test.dart`

    2. Select the `Debug` menu

       选择菜单 `Debug`

    3. Click the `Start Debugging` option

       点击选项 `Start Debugging`

    4. *Alternatively, use the appropriate keyboard shortcut for your platform.*

       *或者，也可以使用系统快捷键!*

#### Run tests in a terminal

#### 在终端执行测试

You can also use a terminal to run the tests by executing the following
command from the root of the project:

我们也可以打开终端，在工程根目录输入以下命令来执行测试：

```
flutter test test/counter_test.dart
```
