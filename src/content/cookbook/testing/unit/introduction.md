---
# title: An introduction to unit testing
title: 单元测试介绍
# description: How to write unit tests.
description: 如何编写单元测试。
# shortTitle: Introduction
shortTitle: 介绍
tags: cookbook, 实用教程, 测试
keywords: 单元测试,test package,flutter_test,IDE
---

<?code-excerpt path-base="cookbook/testing/unit/counter_app"?>

How can you ensure that your app continues to work as you
add more features or change existing functionality?
By writing tests.

我们如何保证 app 在增加了新特性或者改变了现有功能之后还能正常工作呢？答案是写测试！

Unit tests are handy for verifying the behavior of a single function,
method, or class. The [`test`][] package provides the
core framework for writing unit tests, and the [`flutter_test`][]
package provides additional utilities for testing widgets.

使用单元测试可轻松地验证单个函数、方法或类的行为。
[`test`][]这个 package 提供了写单测的核心框架，
[`flutter_test`][] package 则提供了额外的功能来测试 widget。

This recipe demonstrates the core features provided by the `test` package
using the following steps:

本教程将会为大家演示 `test` package 的用法，内容如下：

  1. Add the `test` or `flutter_test` dependency.

     将 `test` 或者 `flutter_test` 加入依赖；

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


For more information about the test package,
see the [test package documentation][].

关于 package 测试的更多内容，
可移步至 [test package 的文档][test package documentation]。

## 1. Add the test dependency

## 1. 添加测试依赖

The `test` package provides the core functionality for
writing tests in Dart. This is the best approach when
writing packages consumed by web, server, and Flutter apps.

如果 Dart package 没有依赖 Flutter，可以导入 `test` package。
Test package 提供了编写测试所需要的核心功能。
当我们写的 package 需要被 web、服务端和 Flutter app 使用时，
这是最佳的方式。

To add the `test` package as a dev dependency,
run `flutter pub add`:

运行 `flutter pub add` 将 `test` 添加为依赖：

```console
$ flutter pub add dev:test
```

## 2. Create a test file

## 2. 创建测试文件

In this example, create two files: `counter.dart` and `counter_test.dart`.

本例中，我们会创建两个文件：`counter.dart` 和 `counter_test.dart`。

The `counter.dart` file contains a class that you want to test and
resides in the `lib` folder. The `counter_test.dart` file contains
the tests themselves and lives inside the `test` folder.

`counter.dart` 文件包含一个位于 `lib` 文件夹的待测试类，
而位于 `test` 文件夹的 `counter_test.dart` 文件将包含测试本身。

In general, test files should reside inside a `test` folder
located at the root of your Flutter application or package.
Test files should always end with `_test.dart`,
this is the convention used by the test runner when searching for tests.

通常测试文件应位于放置在 Flutter 应用或包的根目录下的 `test` 文件夹。
测试文件通常以 `_test.dart` 命名，这是 test runner 寻找测试文件的惯例。

When you're finished, the folder structure should look like this:

创建完成后，文件目录结构如下：

```plaintext
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

下一步，我们需要一个「单元」来测试。记住：「单元」是一个抽象的名称，
它可以表示一个函数、方法或者类。
本例中，我们会在 `lib/counter.dart` 文件中创建一个 `Counter` 类。
它负责增加或减少一个从 `0` 开始的 `value`。

<?code-excerpt "lib/counter.dart"?>
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

**注意：** 为了简化内容，本教程没有遵守「测试驱动开发」的写法。
如果你擅长那种开发模式，当然可以选择用那种方式来写。

## 4. Write a test for our class

## 4. 为创建的类写一个测试

Inside the `counter_test.dart` file, write the first unit test. Tests are
defined using the top-level `test` function, and you can check if the results
are correct by using the top-level `expect` function.
Both of these functions come from the `test` package.

我们将在 `counter_test.dart` 文件中写第一个测试。
使用顶级函数 `test` 来定义，
可通过执行顶级函数 `expect` 来检查结果正确与否。
这两个函数都来自 `test` 这个 package。

<?code-excerpt "test/counter_test.dart"?>
```dart
// Import the test package and Counter class
import 'package:counter_app/counter.dart';
import 'package:test/test.dart';

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

If you want to run a series of related tests,
use the `flutter_test` package [`group`][] function to categorize the tests.
Once put into a group, you can call `flutter test` on all tests in
that group with one command.

如果你想运行多个有关联或者一个系列的测试，
可以使用 `test` package 提供的 [`group`][] 函数将他们整合到一起。
你可以用 `flutter test` 运行同一个组的所有测试。

<?code-excerpt "test/group.dart"?>
```dart
import 'package:counter_app/counter.dart';
import 'package:test/test.dart';

void main() {
  group('Test start, increment, decrement', () {
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

## 6. Run the tests

## 6. 执行测试

Now that you have a `Counter` class with tests in place,
you can run the tests.

现在 `Counter` 类和它的测试都有了，开始执行测试！

### Run tests using IntelliJ or VSCode

### 用 IntelliJ 或 VSCode 执行测试

The Flutter plugins for IntelliJ and VSCode support running tests.
This is often the best option while writing tests because it provides the
fastest feedback loop as well as the ability to set breakpoints.

IntelliJ 和 VSCode 的 Flutter 插件支持执行测试。
用这种方式执行测试是最好的，因为它可以提供最快的反馈闭环，
而且还支持断点调试。

- **IntelliJ**

  1. Open the `counter_test.dart` file

     打开文件 `counter_test.dart`

  1. Go to **Run** > **Run 'tests in counter_test.dart'**.
     You can also press the appropriate keyboard shortcut for your platform.

     前往 **Run** > **Run 'tests in counter_test.dart'**。
     你也可以用键盘快捷键运行测试。

- **VSCode**

  1. Open the `counter_test.dart` file

     打开文件 `counter_test.dart`

  1. Go to **Run** > **Start Debugging**.
     You can also press the appropriate keyboard shortcut for your platform.

     前往 **Run** > **Start Debugging**。
     你也可以用键盘快捷键运行测试。

### Run tests in a terminal

### 在终端执行测试

To run the all tests from the terminal,
run the following command from the root of the project:

你也可以打开终端，在工程根目录输入以下命令来执行所有测试：

```console
flutter test test/counter_test.dart
```

To run all tests you put into one `group`,
run the following command from the root of the project:

你可以运行以下命令执行所以放在指定 `group` 里的测试：

```console
flutter test --plain-name "Test start, increment, decrement"
```

This example uses the `group` created in **section 5**.

该例子使用的是在 **第 5 小节** 创建的 `group`。

To learn more about unit tests, you can execute this command:

你可以执行下面的命令获得更多有关单元测试的帮助：

```console
flutter test --help
```

[`group`]: {{site.api}}/flutter/flutter_test/group.html
[`flutter_test`]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
[`test`]: {{site.pub-pkg}}/test
[test package documentation]: {{site.pub}}/packages/test
