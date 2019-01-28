---
title: An introduction to unit testing
title: 单元测试介绍
short-title: Introduction
---
我们如何保证 app 在增加了新特性或者改变了现有功能之后还能正常工作呢？答案是写测试！

使用单元测试可轻松地验证单个函数、方法或类的行为。[`test`]({{site.pub-pkg}}/test) 包提供了写单测的核心框架，[`flutter_test`]({{site.api}}/flutter/flutter_test/flutter_test-library.html) 包则提供了额外的功能来测试 Widget。

本篇文档只展示了 `test` 包所提供的核心特性。关于测试包的更多内容，可移步至 [测试包文档](https://github.com/dart-lang/test/blob/master/README.md).

## 使用步骤

  1. 添加 `test` 或 `flutter_test` 依赖
  2. 创建一个测试文件
  3. 创建一个要测试的类
  4. 为创建的类写一个 `test`
  5. 整合多个测试到一个 `group`
  6. 执行测试

## 1. 添加测试依赖

如果 Dart 包没有依赖 Flutter，可以导入 `test` 包。Test 包提供了编写测试所需要的核心功能。如果我们写的包可以被 web、服务端和 Flutter app 所使用，那这种方式是最佳的。

```yaml
dev_dependencies:
  test: <latest_version>
```

如果我们写的包只用于 Flutter app，或者我们要写 Widget 的测试，那么可以依赖 `flutter_test` 而不是 `test`。因为 `flutter_test` 包含 `test`，并且还提供了额外功能用于测试 Widget。

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
```

## 2.创建测试文件

本例中，我们会创建两个文件：`counter.dart` 和 `couter_test.dart`。

`counter.dart` 文件包含一个将要测试的类，并且位于 `lib` 文件夹。`counter_test.dart` 文件将包含测试本身，位于 `test` 文件夹。

通常，测试文件应位于 `test` 文件夹下，并且这个文件夹要放在 Flutter 应用或包的根目录下。

创建完成之后，文件目录结构如下：

```
counter_app/
  lib/
    counter.dart
  test/
    counter_test.dart
```

## 3. 创建一个要测试的类

下一步，我们需要一个“单元”来测试。记住：“单元”是一个抽象的名称，它表示一个函数、方法或者类。本例中，我们会在 `lib/counter.dart` 文件中创建一个 `Counter` 类。它负责增加或减少一个从 `0` 开始的 `value`。

<!-- skip -->
```dart
class Counter {
  int value = 0;

  void increment() => value++;

  void decrement() => value--;
}
```

**注意:** 为了简化内容，本教程没有遵守“测试驱动开发”的写法。如果你擅长那种开发模式，当然可以选择用那种方式来写。

## 4. 为创建的类写一个测试

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

## 5. 整合多个测试到一个 `group`

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

### 6. 执行测试

现在 `Counter` 类和它的测试都有了，开始执行测试！

#### 用 IntelliJ 或 VSCode 执行测试

IntelliJ 和 VSCode 的 Flutter 插件支持执行测试。用这种方式执行测试是最好的，因为它可以提供最快的反馈闭环，而且还支持断点调试。

  * **IntelliJ**
    1. 打开文件 `counter_test.dart`
    2. 选择菜单 `Run`
    3. 点击选项 `Run 'tests in counter_test.dart'`
    4. *或者，也可以使用快捷键!*
  * **VSCode**
    1. 打开文件 `counter_test.dart`
    2. 选择菜单 `Debug`
    3. 点击选项 `Start Debugging`
    4. *或者，也可以使用快捷键!*

#### 在终端执行测试

我们也可以打开终端，进入工程根目录后输入如下命令来执行测试：

```terminal
flutter test test/counter_test.dart
```
