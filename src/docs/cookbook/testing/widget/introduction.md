---
title: An introduction to widget testing
title: Widget 测试介绍
description: Learn more about widget testing in Flutter.
description: 了解更多 Flutter 的 widget 测试。
short-title: Introduction
prev:
  title: Mock dependencies using Mockito
  title: 使用 Mockito 模拟依赖关系
  path: /docs/cookbook/testing/unit/mocking
next:
  title: Find widgets
  title: 定位到目标 widgets
  path: /docs/cookbook/testing/widget/finders
---

{% assign api = site.api | append: '/flutter' -%}

In the [introduction to unit testing][] recipe,
you learned how to test Dart classes using the `test` package.
To test widget classes, you need a few additional tools provided by the
[`flutter_test`][] package, which ships with the Flutter SDK.

在 [单元测试介绍][introduction to unit testing] 部分，
我们学习了使用 `test` 这个 package 测试 Dart 类的方法。
为了测试 widget 类，我们需要使用 [`flutter_test`][] package 提供的额外工具，
这些工具是跟 Flutter SDK 一起发布的。

The `flutter_test` package provides the following tools for
testing widgets:

`flutter_test` package 提供了以下工具用于 widget 的测试：

  * The [`WidgetTester`][] allows building and interacting
    with widgets in a test environment.
  
    [`WidgetTester`][]，使用该工具可在测试环境下建立 widget 并与其交互。
  
  * The [`testWidgets()`][] function automatically
    creates a new `WidgetTester` for each test case,
    and is used in place of the normal `test()` function.
  
    [`testWidgets()`][] 函数，此函数会自动为每个测试创建一个 `WidgetTester`，
    用来代替普通的 `test` 函数。
     
  * The [`Finder`][] classes allow searching for widgets
    in the test environment.
  
    [`Finder`][] 类，可以方便我们在测试环境下查找 widgets。
    
  * Widget-specific [`Matcher`][] constants help verify
   whether a `Finder` locates a widget or
    multiple widgets in the test environment.
  
    Widget-specific [`Matcher`][] 常量，
    该常量在测试环境下帮助我们验证 `Finder` 是否定位到一个或多个 widgets。

If this sounds overwhelming, don't worry. Learn how all of these pieces fit
together throughout this recipe, which uses the following steps:

如果觉得太复杂，别担心！让我们通过下面这些步骤把这些内容整合起来。

### Directions

### 步骤：

  1. Add the `flutter_test` dependency.
  
     添加一个 `flutter_test` 依赖
     
  2. Create a widget to test.
  
     创建一个测试用的 widget
  
  3. Create a `testWidgets` test.
  
     创建一个 `testWidgets` 测试方法
     
  4. Build the widget using the `WidgetTester`.
  
     使用 `WidgetTester` 建立 widget
     
  5. Search for the widget using a `Finder`.
  
     使用 `Finder` 查找 widget
     
  6. Verify the widget using a `Matcher`.
  
     使用 `Matcher` 验证 widget 是否正常工作

### 1. Add the `flutter_test` dependency

### 一. 添加一个 `flutter_test` 依赖

Before writing tests, include the `flutter_test`
dependency in the `dev_dependencies` section of the `pubspec.yaml` file.
If creating a new Flutter project with the command line tools or
a code editor, this dependency should already be in place.

我们开始编写测试之前，需要先给 `pubspec.yaml` 文件的 `dev_dependencies` 段
添加 `flutter_test` 依赖。如果使用命令行或编译器新建一个 Flutter 项目，
那么依赖已经默认添加了。

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
```

### 2. Create a widget to test

### 二. 创建一个测试用的 Widget

Next, create a widget for testing. For this recipe,
create a widget that displays a `title` and `message`.

接下来，我们需要创建一个可以测试的 widget！在此例中，
我们创建了一个 widget 显示一个 `标题 (title)` 和 `信息 (message)`。

<!-- skip -->
```dart
class MyWidget extends StatelessWidget {
  final String title;
  final String message;

  const MyWidget({
    Key key,
    @required this.title,
    @required this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Center(
          child: Text(message),
        ),
      ),
    );
  }
}
```

### 3. Create a `testWidgets` test

### 三. 创建一个 `testWidgets` 测试方法

With a widget to test, begin by writing your first test.
Use the [`testWidgets()`][] function provided by the
`flutter_test` package to define a test.
The `testWidgets` function allows you to define a
widget test and creates a `WidgetTester` to work with.

现在我们有了一个可以测试的 widget，可以开始编写第一个测试了！
第一步，我们用 `flutter_test` 这个 package 提供的
[`testWidgets()`][] 函数定义一个测试。
`testWidgets` 函数可以定义一个 widget 测试并创建一个可以使用的 `WidgetTester`。

This test verifies that `MyWidget` displays a given title and message.

我们的测试会验证 `MyWidget` 是否显示给定的标题和信息。

<!-- skip -->
```dart
void main() {
  // Define a test. The TestWidgets function also provides a WidgetTester
  // to work with. The WidgetTester allows you to build and interact
  // with widgets in the test environment.
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    // Test code goes here.
  });
}
```

### 4. Build the widget using the `WidgetTester`

### 四. 使用 `WidgetTester` 建立 Widget

Next, build `MyWidget` inside the test environment by using the
[`pumpWidget()`][] method provided by `WidgetTester`.
The `pumpWidget` method builds and renders the provided widget.

下一步，为了在测试环境中建立 `MyWidget`，我们可以使用 `WidgetTester` 提供的
[`pumpWidget()`][]方法，`pumpWidget` 方法会建立并渲染我们提供的 widget。

Create a `MyWidget` instance that displays "T" as the title
and "M" as the message.

在这个示例中，我们将创建一个显示标题“T”和信息“M”的 `MyWidget` 示例。

<!-- skip -->
```dart
void main() {
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    // Create the widget by telling the tester to build it.
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));
  });
}
```

#### Note

#### 备注

After the initial call to `pumpWidget()`, the `WidgetTester` provides
additional ways to rebuild the same widget. This is useful if you're
working with a `StatefulWidget` or animations.

初次调用 `pumpWidget()` 之后，`WidgetTester` 会提供其他方式来重建相同的 widget。
这对使用 `StatefulWidget` 或者动画会非常有用。

For example, tapping a button calls `setState()`, but Flutter won't
automatically rebuild your widget in the test environment.
Use one of the following methods to ask Flutter to rebuild the widget.

例如，如果我们点击调用 `setState()` 的按钮，在测试环境中，Flutter 
并不会自动重建你的 widget。我们需要用以下列举的方法来让 Flutter
再一次建立我们的 widget。

[`tester.pump()`][]
<br> Triggers a rebuild of the widget after a given duration.

[`tester.pump()`][]
<br> 在一段给定时间后重建 widget。

[`tester.pumpAndSettle()`][]
<br> Repeatedly calls pump with the given duration until
  there are no longer any frames scheduled.
  This essentially waits for all animations to complete.
  
[`tester.pumpAndSettle()`][]
<br> 在给定期间内不断重复调用 pump 直到完成所有绘制帧。一般需要等到所有动画全部完成。

These methods provide fine-grained control over the build lifecycle,
which is particularly useful while testing.

这些方法在构建周期中保证细粒度控制，这在测试中非常有用。

### 5. Search for our widget using a `Finder`

### 五. 使用 `Finder` 查找 widget

With a widget in the test environment, search
through the widget tree for the `title` and `message`
Text widgets using a `Finder`. This allows verification that
the widgets are being displayed correctly.

现在让我们在测试环境中建立 widget。我们需要用 `Finder` 通过 widget 树来查找
`标题` 和 `信息` Text widgets，这样可以验证这些 Widgets 是否正确显示。

For this purpose, use the top-level [`find()`][]
method provided by the `flutter_test` package to create the `Finders`.
Since you know you're looking for `Text` widgets, use the
[`find.text()`][] method.

为了实现这个目的，我们使用 `flutter_test` 这个 package 提供的顶级
[`find()`][] 方法来创建我们的 `Finders`。因为我们要查找的是 `Text` widgets，
所以可以使用 [`find.text()`][] 方法。

For more information about `Finder` classes, see the
[Finding widgets in a widget test][] recipe.

关于 `Finder` classes 的更多信息，
请参阅 [定位到目标 Widgets][Finding widgets in a widget test] 章节。

<!-- skip -->
```dart
void main() {
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));

    // Create the Finders.
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');
  });
}
```

### 6. Verify the widget using a `Matcher`

### 六. 使用 `Matcher` 验证 widget 是否正常工作

Finally, verify the title and message `Text` widgets appear on screen
using the `Matcher` constants provided by `flutter_test`.
`Matcher` classes are a core part of the `test` package,
and provide a common way to verify a given
value meets expectations.

最后，让我们来用 `flutter_test` 提供的 `Matcher` 常量验证 `Text` widgets
显示的标题和信息。`Matcher` 类是 `test` 包里的核心部分，
它提供一种通用方法来验证给定值是否符合我们的预期。

Ensure that the widgets appear on screen exactly one time.
For this purpose, use the [`findsOneWidget`][] `Matcher`.

在这个示例中，我们要确保 Widget 只在屏幕中出现一次。
因此，可以使用 [`findsOneWidget`][] `Matcher`。

<!-- skip -->
```dart
void main() {
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');

    // Use the `findsOneWidget` matcher provided by flutter_test to verify
    // that the Text widgets appear exactly once in the widget tree.
    expect(titleFinder, findsOneWidget);
    expect(messageFinder, findsOneWidget);
  });
}
```

#### Additional Matchers

#### 其他的 Matchers

In addition to `findsOneWidget`, `flutter_test` provides additional
matchers for common cases.

除了 `findsOneWidget`，`flutter_test` 还为常见情况提供了其他的 matchers。

[`findsNothing`][]
<br> Verifies that no widgets are found.

[`findsNothing`][]
<br> 验证没有可被查找的 widgets。

[`findsWidgets`][]
<br> Verifies that one or more widgets are found.

[`findsWidgets`][]
<br>验证一个或多个 widgets 被找到。

[`findsNWidgets`][]
<br> Verifies that a specific number of widgets are found.

[`findsNWidgets`][]
<br>验证特定数量的 widgets 被找到。

### Complete example

### 完整样例

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  // Define a test. The TestWidgets function also provides a WidgetTester
  // to work with. The WidgetTester allows building and interacting
  // with widgets in the test environment.
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    // Create the widget by telling the tester to build it.
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));

    // Create the Finders.
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');

    // Use the `findsOneWidget` matcher provided by flutter_test to
    // verify that the Text widgets appear exactly once in the widget tree.
    expect(titleFinder, findsOneWidget);
    expect(messageFinder, findsOneWidget);
  });
}

class MyWidget extends StatelessWidget {
  final String title;
  final String message;

  const MyWidget({
    Key key,
    @required this.title,
    @required this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Center(
          child: Text(message),
        ),
      ),
    );
  }
}
```


[`find()`]: {{api}}/flutter_test/find-constant.html
[`find.text()`]: {{api}}/flutter_test/CommonFinders-class.html
[`findsNothing`]: {{api}}/flutter_test/findsNothing-constant.html
[`findsOneWidget`]: {{api}}/flutter_test/findsOneWidget-constant.html
[`findsNWidgets`]: {{api}}/flutter_test/findsNWidgets.html
[`findsWidgets`]: {{api}}/flutter_test/findsWidgets-constant.html
[`Finder`]: {{api}}/flutter_test/Finder-class.html
[Finding widgets in a widget test]: /docs/cookbook/testing/widget/finders
[`flutter_test`]: {{api}}/flutter_test/flutter_test-library.html
[introduction to unit testing]: /docs/cookbook/testing/unit/introduction
[`Matcher`]: {{api}}/package-matcher_matcher/Matcher-class.html
[`pumpWidget()`]: {{api}}/flutter_test/WidgetTester/pumpWidget.html
[`tester.pump()`]: {{api}}/flutter_test/TestWidgetsFlutterBinding/pump.html
[`tester.pumpAndSettle()`]: {{api}}/flutter_test/WidgetTester/pumpAndSettle.html
[`testWidgets()`]: {{api}}/flutter_test/testWidgets.html
[`WidgetTester`]: {{api}}/flutter_test/WidgetTester-class.html
