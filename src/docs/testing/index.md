---
title: Testing Flutter apps
title: 测试 Flutter 应用
---

The more features your app has, the harder it is to test manually.
Automated tests help ensure that your app performs correctly before
you publish it, while retaining your feature and bug fix velocity.

通常一个应用的功能越多，手工测试就越困难。自动化测试在发布之前运行，有助于保证我们应用的稳定性和功能的完整性，并且可以快速修复问题。

Automated testing falls into a few categories:

自动化测试可分为以下几类：

- A [_unit test_](#unit-tests) tests a single function, method, or class. 
    
  [**单元测试**](#unit-tests) 测试单一的函数，方法或类。

- A [_widget test_](#widget-tests) (in other UI frameworks referred to as _component test_) tests
  a single widget. 

  [**Widget 测试**](#widget-tests)（在其他 UI 框架中指 **组件测试**）测试单一的 widget 。

- An [_integration test_](#integration-tests)
  tests a complete app or a large part of an app.

  [**集成测试**](#integration-tests) 测试一个完整的应用或者一个应用的大部分功能。
  
Generally speaking, a well-tested app has many unit and widget tests, tracked by
[code coverage](https://en.wikipedia.org/wiki/Code_coverage), plus enough
integration tests to cover all the important use cases. This advice is based on
the fact that there are trade-offs between different kinds of testing, seen
below.

一般来说，在自动化测试方面做的比较好的应用会有许多单元测试和 widget 测试，并且使用 [代码覆盖率](https://en.wikipedia.org/wiki/Code_coverage) 进行追踪，还会有足够的集成测试来覆盖所有的重要使用场景。这样做是因为不同类型的测试之间需要权衡，如下所示：

|                      | <t>Unit</t><t>单元测试</t> | <t>Widget</t><t>Widget 测试</t> | <t>Integration</t><t>集成测试</t> |
|----------------------|--------|--------|-------------|
| **Confidence**       | Low    | Higher | Highest     |
| **置信度**            | 低    | 较高 | 最高     |
| **Maintenance cost** | Low    | Higher | Highest     |
| **维护成本**           | 低    | 较高 | 最高     |
| **Dependencies**     | Few    | More   | Most        |
| **依赖程度**              | 少    | 较多   | 最多        |
| **Execution speed**  | Quick  | Slower | Slowest     |
| **执行速度**           | 快  | 较慢 | 最慢     |
{:.table.table-striped} 


## Unit tests

## 单元测试

A _unit test_ tests a single function, method, or class. The goal of a unit test
is to verify the correctness of a unit of logic under a variety of conditions.
External dependencies of the unit under test are generally [mocked
out](/cookbook/testing/mocking). Unit tests generally don't read from or write
to disk, render to screen, or receive user actions from outside the process
running the test.

**单元测试** 测试单一的函数，方法或类。
单元测试的目标是验证逻辑单元在各种条件下的正确性。
被测试单元的外部依赖通常需要 [模拟](/cookbook/testing/mocking)。
单元测试通常不会读写磁盘，将数据渲染到屏幕，也不会从运行测试进程的外部去接收用户的操作。

### Recipes

### 更多信息

{% include testing_toc.md type='unit' %} 

## Widget tests

## Widget测试

A _widget test_ (in other UI frameworks referred to as _component test_)
tests a single widget. The goal of a widget test is to verify that the
widget's UI looks and interacts as expected. Testing a widget involves
multiple classes and requires a test environment that provides the
appropriate widget lifecycle context.

**Widget 测试**（在其他 UI 框架中指 **组件测试**）是用来测试单一的 widget，widget 测试的目标是验证 widget 的 UI 表现和交互行为是否符合预期。测试一个 widget 涉及多个类，并且测试环境需要提供具有 widget 生命周期的上下文。

For example, the Widget being tested should be able to receive and 
respond to user actions and events, perform layout, and instantiate child 
widgets. A widget test is therefore more comprehensive than a unit test.
However, like a unit test, a widget test's environment is replaced with
an implementation much simpler than a full-blown UI system.

例如，被测试的 widget 可以接收和响应用户操作和事件，进行布局，并实例化子 widget 。所以，widget 测试比单元测试更全面。但是，就像单元测试一样，widget 测试环境实现上比成熟的 UI 系统简单得多。

### Recipes

### 更多信息

{% include testing_toc.md type='widget' %} 

## Integration tests

## 集成测试

An _integration test_ tests a complete app or a large part of an app. The goal
of an integration test is to verify that all the widgets and services being
tested work together as expected. Furthermore, you can use integration
tests to verify your app's performance.

**集成测试** 测试一个完整的应用或者一个应用的大部分功能。集成测试的目标是验证正在测试的所有 widget 和服务是否按照预期的方式一起工作。此外，还可以使用集成测试来验证应用的性能。

Generally, an _integration test_ runs on a real device or an OS emulator, such
as iOS Simulator or Android Emulator. The app under test is typically isolated
from the test driver code to avoid skewing the results.

通常情况下，一个 **集成测试** 运行在真机或 OS 模拟器上，如 iOS 模拟器 (iOS Simulator) 或 Android 模拟器 (Android Emulator) 。测试中的应用通常与测试驱动程序代码隔离，以避免结果出现偏差。

### Recipes

### 更多信息

{% include testing_toc.md type='integration' %}
  
## Continuous integration services

## 持续集成服务

Continuous integration (CI) services allow you to run your tests automatically
when pushing new code changes. This provides timely feedback on whether the code
changes work as expected and do not introduce bugs.

持续集成 (CI) 服务允许我们在推送新代码（代码变更）时自动运行测试。当代码变更后，会立即收到关于代码是否仍按预期工作、是否引入新问题的反馈。

For information on running tests on various continuous integration services,
see the following: 

有关各种持续集成服务的信息，参考如下：

* [Continuous Delivery using fastlane with
  Flutter](/docs/deployment/fastlane-cd/)

  [Flutter 里的持续部署](/docs/deployment/cd/#fastlane)

* [Test Flutter apps on
  Travis]({{site.flutter-medium}}/test-flutter-apps-on-travis-3fd5142ecd8c)

  [使用 Travis 测试 Flutter 应用]({{site.flutter-medium}}/test-flutter-apps-on-travis-3fd5142ecd8c)

* [GitLab Continuous Integration
  (GitLab CI/CD)](https://docs.gitlab.com/ee/ci/README.html#doc-nav).
  You'll need to create and configure a `.gitlab-ci.yml` file. You can 
  [find an example](https://raw.githubusercontent.com/brianegan/flutter_redux/master/.gitlab-ci.yml)
  in the [flutter_redux library]({{site.github}}/brianegan/flutter_redux).

  [GitLab 持续集成（GitLab CI/CD）](https://docs.gitlab.com/ee/ci/README.html#doc-nav)。需要创建，并且配置 `.gitlab-ci.yml` 文件。可以在 [flutter_redux 库]({{site.github}}/brianegan/flutter_redux)中[找到例子](https://raw.githubusercontent.com/brianegan/flutter_redux/master/.gitlab-ci.yml)。


* [Codemagic CI/CD for Flutter](https://blog.codemagic.io/getting-started-with-codemagic/)
  
  [Flutter 中的 Codemagic 持续集成/持续交付](https://blog.codemagic.io/getting-started-with-codemagic/)

* [Flutter CI/CD with Bitrise](https://devcenter.bitrise.io/getting-started/getting-started-with-flutter-apps/)
  
  [使用 Bitrise 进行 Flutter 持续集成/持续交付](https://devcenter.bitrise.io/getting-started/getting-started-with-flutter-apps/)
