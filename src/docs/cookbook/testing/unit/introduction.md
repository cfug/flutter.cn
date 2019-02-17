---
title: An introduction to unit testing
title: 单元测试介绍
short-title: Introduction
---

How can we ensure that our apps continue to work as we add more features or
change existing functionality? By writing tests!

我们如何保证 app 在增加了新特性或者改变了现有功能之后还能正常工作呢？答案是写测试！

Unit tests are handy for verifying the behavior of a single function, method, or
class. The [`test`]({{site.pub-pkg}}/test) package provides the
core framework for writing unit tests, and the
[`flutter_test`]({{site.api}}/flutter/flutter_test/flutter_test-library.html)
package provides additional utilities for testing Widgets.

使用单元测试可轻松地验证单个函数、方法或类的行为。[`test`]({{site.pub-pkg}}/test) 包提供了写单测的核心框架，
[`flutter_test`]({{site.api}}/flutter/flutter_test/flutter_test-library.html) 包则提供了额外的功能来测试 Widget。

This recipe demonstrates the core features provided by the `test` package. For
more information about the test package, please see the
[test package documentation](https://github.com/dart-lang/test/blob/master/README.md).

本篇文档只展示了 `test` 包所提供的核心特性。关于测试包的更多内容，
可移步至 [测试包文档](https://github.com/dart-lang/test/blob/master/README.md).


## Directions

## 使用步骤

  1. Add the `test` or `flutter_test` dependency
     
     添加 `test` 或 `flutter_test` 依赖

  2. Create a test file

     创建一个测试文件

  3. Create a class to test

     创建一个要测试的类     

  4. Write a `test` for our class

     为创建的类写一个 `test`

  5. Combine multiple tests in a `group`

     整合多个测试到一个 `group`

  6. Run the tests

     执行测试

## 1. Add the test dependency

## 1. 添加测试依赖

If we're working on a Dart package that does not depend on Flutter, we
can import the `test` package. The test package provides the core functionality
for writing tests in Dart. This is the best approach when writing packages that
will be consumed by web, server, and Flutter apps.

如果 Dart 包没有依赖 Flutter，可以导入 `test` 包。Test 包提供了编写测试所需要的核心功能。
如果我们写的包可以被 web、服务端和 Flutter app 所使用，那这种方式是最佳的。


```yaml
dev_dependencies:
  test: <latest_version>
```

If we're working on a package that will only be used for Flutter apps, or if
we need to write Widget tests, we can depend on the `flutter_test` package
instead. It will also include everything from the `test` package, as well as
additional utilities for testing Widgets.

如果我们写的包只用于 Flutter app，或者我们要写 Widget 的测试，
那么可以依赖 `flutter_test` 而不是 `test`。
因为 `flutter_test` 包含 `test`，并且还提供了额外功能用于测试 Widget。


```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
```


## 2. Create a test file

## 2. 创建测试文件

In this example, we'll create two files: `counter.dart` and `counter_test.dart`.

本例中，我们会创建两个文件：`counter.dart` 和 `couter_test.dart`。

The `counter.dart` file will contain a class we want to test and will reside in
the `lib` folder. The `counter_test.dart` file will contain the tests
themselves and will live inside the `test` folder!

`counter.dart` 文件包含一个将要测试的类，并且位于 `lib` 文件夹。`counter_test.dart` 文件将包含测试本身，位于 `test` 文件夹。

In general, test files should reside inside a `test` folder located at the root
of your Flutter application or package.

通常，测试文件应位于 `test` 文件夹下，并且这个文件夹要放在 Flutter 应用或包的根目录下。

When we're finished, our folder structure should look like this:

创建完成之后，文件目录结构如下：

```
counter_app/
  lib/
    counter.dart
  test/
    counter_test.dart
```

## 3. Create a class to test

## 3. 创建一个要测试的类

Next, we'll need a "unit" to test. Remember: "unit" is a fancy name for a
function, method or class. In this example, we'll create a `Counter` class
inside the `lib/counter.dart` file. It will be responsible for incrementing and
decrementing a `value` starting at `0`.

下一步，我们需要一个“单元”来测试。记住：“单元”是一个抽象的名称，它表示一个函数、方法或者类。
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
development, you can always go that route!

**注意：** 为了简化内容，本教程没有遵守“测试驱动开发”的写法。如果你擅长那种开发模式，当然可以选择用那种方式来写。

## 4. Write a test for our class

## 4. 为创建的类写一个测试

Inside the `counter_test.dart` file, we can write our first unit test! Tests are
defined using the top-level `test` function, and we can check if the results are
correct by using the top-level `expect` function. Both of these functions come
from the `test` package.

我们将在 `counter_test.dart` 文件中写第一个测试。测试由顶级函数 `test` 来定义，检查结果是否正确可通过顶级函数 `expect` 来执行。这两个函数都来自 `test` 包。

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

If we have several tests which are related to one another, it can be handy
to combine them using the `group` function provided by the `test` package.

如果多个测试之间互相关联，可以使用 `test` 包提供的 `group` 函数方便地将他们整合到一起。

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

Now that we have a `Counter` class with tests in place, we can run the tests!

现在 `Counter` 类和它的测试都有了，开始执行测试！

#### Run tests using IntelliJ or VSCode

#### 用 IntelliJ 或 VSCode 执行测试

The Flutter plugins for IntelliJ and VSCode support running tests. This is often
the best option while writing tests because it provides the fastest feedback
loop as well as the ability to set breakpoints.

IntelliJ 和 VSCode 的 Flutter 插件支持执行测试。用这种方式执行测试是最好的，因为它可以提供最快的反馈闭环，而且还支持断点调试。


  * **IntelliJ**
    1. Open the `counter_test.dart` file

       打开文件 `counter_test.dart`

    2. Select the `Run` menu
       
       选择菜单 `Run`

    3. Click the `Run 'tests in counter_test.dart'` option

       点击选项 `Run 'tests in counter_test.dart'`

    4. *Alternatively, use the appropriate keyboard shortcut for your platform!*

       *或者，也可以使用快捷键!*

  * **VSCode**
    1. Open the `counter_test.dart` file

       打开文件 `counter_test.dart`

    2. Select the `Debug` menu

       选择菜单 `Debug`

    3. Click the `Start Debugging` option

       点击选项 `Start Debugging`

    4. *Alternatively, use the appropriate keyboard shortcut for your platform!*

       *或者，也可以使用快捷键!*

#### Run tests in a terminal

#### 在终端执行测试

We can also use a terminal to run our tests by executing the following
command from the root of the project:

我们也可以打开终端，进入工程根目录后输入如下命令来执行测试：

```
flutter test test/counter_test.dart
```
