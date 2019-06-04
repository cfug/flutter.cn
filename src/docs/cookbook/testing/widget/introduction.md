---
title: An introduction to widget testing
title: Widget 测试介绍
short-title: Introduction
prev:
  title: Mock dependencies using Mockito
  title: 使用 Mockito 模拟依赖关系
  path: /docs/cookbook/testing/unit/mocking
next:
  title: Finding widgets
  title: 定位到目标 widgets
  path: /docs/cookbook/testing/widget/finders
---

{% assign api = site.api | append: '/flutter' -%}

In the [introduction to unit testing](/docs/cookbook/testing/unit/introduction) recipe, we
learned how to test Dart classes using the `test` package. In order to test
Widget classes, we'll need a few additional tools provided by the
[`flutter_test`]({{api}}/flutter_test/flutter_test-library.html)
package, which ships with the Flutter SDK.

在[单元测试介绍](/docs/cookbook/testing/unit/introduction) 部分，我们学习了使用 `test` 包测试 Dart 类的方法。
为了测试 Widget 类，我们需要使用 [`flutter_test`]({{api}}/flutter_test/flutter_test-library.html) 包提供的额外工具，
这些工具是跟 Flutter SDK 一起发布的。

The `flutter_test` package provides the following tools for testing Widgets:

`flutter_test` 包提供了以下工具用于测试 Widget：

  * The [`WidgetTester`]({{api}}/flutter_test/WidgetTester-class.html),
  which allows us to build and interact with Widgets in a test environment.
  
  * [`WidgetTester`]({{api}}/flutter_test/WidgetTester-class.html)，使用该工具可在测试环境下建立 Widget 并与其交互。
  
  * The [`testWidgets`]({{api}}/flutter_test/testWidgets.html)
  function. This function will automatically create a new `WidgetTester` for
  each test case, and is used in place of the normal `test` function.
  
  * [`testWidgets`]({{api}}/flutter_test/testWidgets.html) 函数，此函数会自动为每个测试创建一个 `WidgetTester`，用来代替普通的 `test` 函数。
     
  * [`Finder`]({{api}}/flutter_test/Finder-class.html)
  classes. These allow us to search for Widgets in the test environment.
  
  * [`Finder`]({{api}}/flutter_test/Finder-class.html) 类，允许我们在测试环境下查找 Widget。
    
  * Widget-specific [`Matcher`]({{api}}/package-matcher_matcher/Matcher-class.html)
  constants, which help us verify whether a `Finder` locates a Widget or
  multiple Widgets in the test environment.
  
  * Widget-specific [`Matcher`]({{api}}/package-matcher_matcher/Matcher-class.html) 常量，该常量在测试环境下帮助我们验证 `Finder` 是否定位到一个或多个 Widgets。

If this sounds overwhelming, don't worry! We'll see how all of these pieces fit
together throughout this recipe.

如果觉得太复杂，别担心！让我们通过示例把这些内容整合起来。

### Directions

### 步骤：

  1. Add the `flutter_test` dependency
  
     添加一个 `flutter_test` 依赖
     
  2. Create a Widget to test
  
     创建一个测试用的 Widget
  
  3. Create a `testWidgets` test
  
     创建一个 `testWidgets` 测试方法
     
  4. Build the Widget using the `WidgetTester`
  
     使用 `WidgetTester` 建立 Widget
     
  5. Search for our Widget using a `Finder`
  
     使用 `Finder` 查找 Widget
     
  6. Verify our Widget is working using a `Matcher`
  
     使用 `Matcher` 验证 Widget 是否正常工作

### 1. Add the `flutter_test` dependency

### 一. 添加一个 `flutter_test` 依赖

Before we can begin writing tests, we'll need to include the `flutter_test`
dependency in the `dev_dependencies` section of our `pubspec.yaml` file. If
you create a new Flutter project with the command line tools or code editor,
this dependency should already be in place!

我们开始编写测试之前，需要先给 `pubspec.yaml` 文件的 `dev_dependencies` 段添加 `flutter_test` 依赖。如果使用命令行或编译器新建一个 Flutter 项目，那么依赖已经默认添加了。

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
```

### 2. Create a Widget to test

### 二. 创建一个测试用的 Widget

Next, we'll need to create a Widget that we can test! For this recipe, we'll
create a Widget that displays a `title` and `message`.

接下来，我们需要创建一个可以测试的 Widget！在此例中，我们创建了一个 Widget 显示一个`标题`和`信息`。

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

Now that we have a Widget to test, we can begin writing our first test! To get
started, we'll use the
[`testWidgets`]({{api}}/flutter_test/testWidgets.html)
function provided by the `flutter_test` package to define a test. The
`testWidgets` function will allow us to define a Widget test and will create a
`WidgetTester` for us to work with.

现在我们有了一个可以测试的 Widget，可以开始编写第一个测试了！第一步，我们用 `flutter_test` 包提供的 [`testWidgets`]({{api}}/flutter_test/testWidgets.html) 函数定义一个测试。`testWidgets` 函数可以定义一个 Widget 测试并创建一个可以使用的 `WidgetTester`。

Our test will verify that `MyWidget` displays a given title and message.

我们的测试会验证 `MyWidget` 是否显示给定的标题和信息。

<!-- skip -->
```dart
void main() {
  // Define a test. The TestWidgets function will also provide a WidgetTester
  // for us to work with. The WidgetTester will allow us to build and interact
  // with Widgets in the test environment.
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    // Test code will go here!
  });
}
```

### 4. Build the Widget using the `WidgetTester`

### 四. 使用 `WidgetTester` 建立 Widget

Next, we'll want to build `MyWidget` inside the test environment. To do so, we
can use the
[`pumpWidget`]({{api}}/flutter_test/WidgetTester/pumpWidget.html)
method provided by the `WidgetTester`. The `pumpWidget` method will build and
render the Widget we provide.

下一步，为了在测试环境中建立 `MyWidget`，我们可以使用 `WidgetTester` 提供的 [`pumpWidget`]({{api}}/flutter_test/WidgetTester/pumpWidget.html) 方法。`pumpWidget` 方法会建立并渲染我们提供的 Widget。

In this case, we'll create a `MyWidget` instance that displays "T" as the title
and "M" as the message.

在这个示例中，我们将创建一个显示标题“T”和信息“M”的 `MyWidget` 示例。

<!-- skip -->
```dart
void main() {
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    // Create the Widget tell the tester to build it
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));
  });
}
```

#### Note

#### 备注

After the initial call to `pumpWidget`, the `WidgetTester` provides additional
ways to rebuild the same Widget. This is useful if you're working with a
`StatefulWidget` or animations.

初次调用 `pumpWidget` 之后，`WidgetTester` 会提供其他方式来重建相同的 Widget。这对使用 `StatefulWidget` 或者动画会非常有用。

For example, if we tap a button, and this button calls `setState`, Flutter will
not automatically rebuild your Widget in the test environment. We need to use
one of the following methods to ask Flutter to build our Widget once again.

例如，如果我们点击调用 `setState` 的按钮，在测试环境中，Flutter 并不会自动重建你的 Widget。我们需要用以下列举的方法来让 Flutter 再一次建立我们的 Widget。

  - [tester.pump()]({{api}}/flutter_test/TestWidgetsFlutterBinding/pump.html)
  : Triggers a rebuild of the Widget after a given duration.
  
  - [tester.pump()]({{api}}/flutter_test/TestWidgetsFlutterBinding/pump.html)：在一段给定时间后重建 Widget。
    
  - [tester.pumpAndSettle()]({{api}}/flutter_test/WidgetTester/pumpAndSettle.html)
  : Repeatedly calls pump with the given duration until there are no longer any frames scheduled. This essentially waits for all animations to complete.
  
  - [tester.pumpAndSettle()]({{api}}/flutter_test/WidgetTester/pumpAndSettle.html)：在给定期间内不断重复调用 pump 直到完成所有绘制帧。一般需要等到所有动画全部完成。

These methods provide fine-grained control over the build lifecycle, which is
particularly useful while testing.

这些方法在构建周期中保证细粒度控制，这在测试中非常有用。

### 5. Search for our Widget using a `Finder`

### 五. 使用 `Finder` 查找 Widget

Now that we've built our Widget in the test environment, we'll want to search
through the Widget tree for the `title` and `message` Text Widgets using a
`Finder`. This will allow us to verify that we're displaying these Widgets
correctly!

现在让我们在测试环境中建立 Widget。我们需要用 `Finder` 通过 Widget 树来查找 `标题` 和 `信息` Text Widgets。这样可以验证这些 Widgets 是否正确显示。

In this case, we'll use the top-level [`find`]({{api}}/flutter_test/find-constant.html)
method provided by the `flutter_test` package to create our `Finders`. Since we
know we're looking for `Text` widgets, we can use the
[`find.text`]({{api}}/flutter_test/CommonFinders-class.html)
method.

在这个示例中，我们使用 `flutter_test` 包提供的顶级 [`find`]({{api}}/flutter_test/find-constant.html) 方法来创建我们的 `Finders`。因为我们要查找的是 `Text` widgets，所以可以使用 [`find.text`]({{api}}/flutter_test/CommonFinders-class.html) 方法。

For more information about `Finder` classes, please see the
[Finding Widgets in a Widget Test](/docs/cookbook/testing/widget/finders)
recipe.

关于 `Finder`classes 的更多信息，请参阅 [Finding Widgets in a Widget Test](/docs/cookbook/testing/widget/finders) 章节。

<!-- skip -->
```dart
void main() {
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));

    // Create our Finders
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');
  });
}
```

### 6. Verify our Widget is working using a `Matcher`

### 六. 使用 `Matcher` 验证 Widget 是否正常工作

Finally, we can verify the title and message `Text` Widgets appear on screen
using the `Matcher` constants provided by `flutter_test`. `Matcher` classes are
a core part of the `test` package, and provide a common way to verify a given
value meets our expectations.

最后，让我们来用 `flutter_test` 提供的 `Matcher` 常量验证 `Text` Widgets 显示的标题和信息。`Matcher` 类是 `test` 包里的核心部分，它提供一种通用方法来验证给定值是否符合我们的预期。

In this case, we want to ensure our Widgets appear on screen exactly one time.
Therefore, we can use the
[`findsOneWidget`]({{api}}/flutter_test/findsOneWidget-constant.html)
`Matcher`.

在这个示例中，我们要确保 Widget 只在屏幕中出现一次。因此，可以使用 [`findsOneWidget`]({{api}}/flutter_test/findsOneWidget-constant.html)
`Matcher`。

<!-- skip -->
```dart
void main() {
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');

    // Use the `findsOneWidget` matcher provided by flutter_test to verify our
    // Text Widgets appear exactly once in the Widget tree
    expect(titleFinder, findsOneWidget);
    expect(messageFinder, findsOneWidget);
  });
}
```

#### Additional Matchers

#### 其他的 Matchers

In addition to `findsOneWidget`, `flutter_test` provides additional matchers for
common cases.

除了 `findsOneWidget`，`flutter_test` 还为常见情况提供了其他的 matchers。

  * [findsNothing]({{api}}/flutter_test/findsNothing-constant.html)
  : verifies that no Widgets are found
  
  * [findsNothing]({{api}}/flutter_test/findsNothing-constant.html)：验证没有可被查找的 Widgets。
    
  * [findsWidgets]({{api}}/flutter_test/findsWidgets-constant.html)
  : verifies one or more Widgets are found
  
  * [findsWidgets]({{api}}/flutter_test/findsWidgets-constant.html)：验证一个或多个 Widgets 被找到。
    
  * [findsNWidgets]({{api}}/flutter_test/findsNWidgets.html)
  : verifies a specific number of Widgets are found
  
  * [findsNWidgets]({{api}}/flutter_test/findsNWidgets.html)：验证特定数量的 Widgets 被找到

### Complete example

### 完整示例：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  // Define a test. The TestWidgets function will also provide a WidgetTester
  // for us to work with. The WidgetTester will allow us to build and interact
  // with Widgets in the test environment.
  testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
    // Create the Widget tell the tester to build it
    await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));

    // Create our Finders
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');

    // Use the `findsOneWidget` matcher provided by flutter_test to verify our
    // Text Widgets appear exactly once in the Widget tree
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
 
