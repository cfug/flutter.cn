---
title: Tap, drag, and enter text
title: 点击、拖拽事件和文本输入
prev:
  title: Find widgets
  title: 定位到目标 widgets
  path: /docs/cookbook/testing/widget/finders
---

{% assign api = site.api | append: '/flutter' -%}

Many widgets not only display information, but also respond
to user interaction. This includes buttons that can be tapped,
and [`TextField`]({{api}}/material/TextField-class.html)
for entering text.

我们构建的大部分 Widget 不仅仅需要展示信息，还需要响应用户交互。常见的交互有用户点击按钮、在屏幕上拖动组件和在 [`TextField`]({{api}}/material/TextField-class.html) 中输入文本。

To test these interactions, you need a way to simulate them
in the test environment. For this purpose, use the
[`WidgetTester`]({{api}}/flutter_test/WidgetTester-class.html)
class provided by the
[`flutter_test`]({{api}}/flutter_test/flutter_test-library.html)
library.

为了测试这些交互，我们需要在测试环境中模拟上述场景，可以借助 [`flutter_test`]({{api}}/flutter_test/flutter_test-library.html) 库中的 [`WidgetTester`]({{api}}/flutter_test/WidgetTester-class.html) 类来实现。

The `WidgetTester` provides methods for entering text, tapping, and dragging.

`WidgetTester` 提供了文本输入、点击、拖动的相关方法：

  * [`enterText`]({{api}}/flutter_test/WidgetTester/enterText.html)
  * [`tap`]({{api}}/flutter_test/WidgetController/tap.html)
  * [`drag`]({{api}}/flutter_test/WidgetController/drag.html)

In many cases, user interactions update the state of the app. In the test
environment, Flutter doesn't automatically rebuild widgets when the state
changes. To ensure that the widget tree is rebuilt after simulating a user
interaction, call the
[`pump()`]({{api}}/flutter_test/WidgetTester/pump.html) or
[`pumpAndSettle()`]({{api}}/flutter_test/WidgetTester/pumpAndSettle.html)
methods provided by the `WidgetTester`.
This recipe uses the following steps:

在很多情况下，用户交互会更新应用状态。在测试环境中，Flutter 在状态发生改变的时候并不会自动重建 Widget。为了保证模拟用户交互实现后，Widget 树能重建，一定要调用 `WidgetTester` 提供的 [`pump`]({{api}}/flutter_test/WidgetTester/pump.html) 或者 [`pumpAndSettle`]({{api}}/flutter_test/WidgetTester/pumpAndSettle.html)。

### Directions

### 步骤

  1. Create a widget to test.
     
     创建待测 Widget

  2. Enter text in the text field.

     在文本区输入文本

  3. Ensure tapping a button adds the todo.

     点击按钮，增加待办清单项

  4. Ensure swipe-to-dismiss removes the todo.

     滑动删除待办清单项

### 1. Create a widget to test

### 1. 创建待测 Widget

For this example,
create a basic todo app that tests three features:

在这个示例中，我们将会创建一个简单的待办清单应用。其中有三个主要的功能点需要测试：

  1. Entering text into a `TextField`.

     往 `TextField` 中输入文本

  2. Tapping a `FloatingActionButton` to add the text to a list of todos.

     点击 `FloatingActionButton`，把文本加入到待办清单列表

  3. Swiping-to-dismiss toe remove the item from the list.

     滑动移除列表中的待办清单项

To keep the focus on testing,
this recipe won't provide a detailed guide on how to build the todo app.
To learn more about how this app is built,
see the relevant recipes: 

为了聚焦在测试上，本章节并不会提供如何构建一个待办清单应用的具体教程。如果想要知道这个应用是如何构建的，请参考以下章节：

  * [Create and style a text field](/docs/cookbook/forms/text-input)

    [文本框的创建和设定](/docs/cookbook/forms/text-input)

  * [Handle taps](/docs/cookbook/gestures/handling-taps)

    [捕获和处理点击动作](/docs/cookbook/gestures/handling-taps)

  * [Create a basic list](/docs/cookbook/lists/basic-list)

    [基础列表](/docs/cookbook/lists/basic-list)

  * [Implement swipe to dismiss](/docs/cookbook/gestures/dismissible)

    [实现「滑动清除」效果](/docs/cookbook/gestures/dismissible)

```dart
class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  static const _appTitle = 'Todo List';
  final todos = <String>[];
  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _appTitle,
      home: Scaffold(
        appBar: AppBar(
          title: Text(_appTitle),
        ),
        body: Column(
          children: [
            TextField(
              controller: controller,
            ),
            Expanded(
              child: ListView.builder(
                itemCount: todos.length,
                itemBuilder: (BuildContext context, int index) {
                  final todo = todos[index];

                  return Dismissible(
                    key: Key('$todo$index'),
                    onDismissed: (direction) => todos.removeAt(index),
                    child: ListTile(title: Text(todo)),
                    background: Container(color: Colors.red),
                  );
                },
              ),
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              todos.add(controller.text);
              controller.clear();
            });
          },
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```

### 2. Enter text in the text field

### 2. 在文本区输入文本

Now that you have a todo app, begin writing the test.
Start by entering text into the `TextField`.

我们有了一个待办清单项应用以后，就可以开始编写测试用例了。在本示例中，我们会先测试在文本区输入文本。

Accomplish this task by:

完成这项任务，需要做到：

  1. Building the widget in the test environment.

     在测试环境创建 Widget

  2. Using the
     [`enterText()`]({{api}}/flutter_test/WidgetTester/enterText.html)
     method from the `WidgetTester`.

     使用 `WidgetTester` 中的 [`enterText`]({{api}}/flutter_test/WidgetTester/enterText.html) 方法

<!-- skip -->
```dart
testWidgets('Add and remove a todo', (WidgetTester tester) async {
  // Build the widget
  await tester.pumpWidget(TodoList());

  // Enter 'hi' into the TextField.
  await tester.enterText(find.byType(TextField), 'hi');
});
```

{{site.alert.note}}

  This recipe builds upon previous widget testing recipes.
  To learn the core concepts of widget testing,
  see the following recipes:

  这个章节的内容建立在前面的 widget 测试的相关章节上，
  请参考如下章节，获取关于 Widget 测试的更多内容：

  * [Introduction to widget testing](/docs/cookbook/testing/widget)

    [Widget 测试介绍](/docs/cookbook/testing/widget)

  * [Finding widgets in a widget test](finders)
  
    [Widget 测试介绍](finders)

{{site.alert.end}}

### 3. Ensure tapping a button adds the todo

### 3. 点击按钮，增加待办清单项

After entering text into the `TextField`, ensure that tapping
the `FloatingActionButton` adds the item to the list.

在 `TextField` 中输入文本后，需要确保能够点击 `FloatingActionButton`，将文本作为清淡项加入列表中。

This involves three steps:

这包含了三个步骤：

 1. Tap the add button using the
    [`tap()`]({{api}}/flutter_test/WidgetController/tap.html)
    method.

    使用 [`tap`]({{api}}/flutter_test/WidgetController/tap.html) 方法模拟点击按钮

 2. Rebuild the widget after the state has changed using the
    [`pump()`]({{api}}/flutter_test/TestWidgetsFlutterBinding/pump.html)

    使用 [`pump`]({{api}}/flutter_test/TestWidgetsFlutterBinding/pump.html) 方法确保应用状态发生改变时可以重建 Widget

 3. Ensure that the list item appears on screen.

    确保列表清单项展现在屏幕上

<!-- skip -->
```dart
testWidgets('Add and remove a todo', (WidgetTester tester) async {
  // Enter text code...

  // Tap the add button.
  await tester.tap(find.byType(FloatingActionButton));

  // Rebuild the widget after the state has changed.
  await tester.pump();

  // Expect to find the item on screen.
  expect(find.text('hi'), findsOneWidget);
});
```

### 4. Ensure swipe-to-dismiss removes the todo

### 4. 滑动删除待办清单项

Finally, ensure that performing a swipe-to-dismiss action on the todo
item removes it from the list. This involves three steps:

最后，我们需要确保滑动删除的操作能够正常地从列表中移除清单项。这包含了三个步骤：

  1. Use the
     [`drag()`]({{api}}/flutter_test/WidgetController/drag.html)
     method to perform a swipe-to-dismiss action.

     使用 [`drag`]({{api}}/flutter_test/WidgetController/drag.html) 方法模拟滑动删除操作。

  2. Use the
     [`pumpAndSettle()`]({{api}}/flutter_test/WidgetTester/pumpAndSettle.html)
     method to continually rebuild the widget tree until the dismiss
     animation is complete.

     使用 [`pumpAndSettle`]({{api}}/flutter_test/WidgetTester/pumpAndSettle.html) 方法使 Widget 树保持重建更新，直到消除的动画完成。

  3. Ensure that the item no longer appears on screen.

     确保上述清单项不会再出现在屏幕上

<!-- skip -->
```dart
testWidgets('Add and remove a todo', (WidgetTester tester) async {
  // Enter text and add the item...

  // Swipe the item to dismiss it.
  await tester.drag(find.byType(Dismissible), Offset(500.0, 0.0));

  // Build the widget until the dismiss animation ends.
  await tester.pumpAndSettle();

  // Ensure that the item is no longer on screen.
  expect(find.text('hi'), findsNothing);
});
```

### Complete example

### 完整示例

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Add and remove a todo', (WidgetTester tester) async {
    // Build the widget.
    await tester.pumpWidget(TodoList());

    // Enter 'hi' into the TextField.
    await tester.enterText(find.byType(TextField), 'hi');

    // Tap the add button.
    await tester.tap(find.byType(FloatingActionButton));

    // Rebuild the widget with the new item.
    await tester.pump();

    // Expect to find the item on screen.
    expect(find.text('hi'), findsOneWidget);

    // Swipe the item to dismiss it.
    await tester.drag(find.byType(Dismissible), Offset(500.0, 0.0));

    // Build the widget until the dismiss animation ends.
    await tester.pumpAndSettle();

    // Ensure that the item is no longer on screen.
    expect(find.text('hi'), findsNothing);
  });
}

class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  static const _appTitle = 'Todo List';
  final todos = <String>[];
  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _appTitle,
      home: Scaffold(
        appBar: AppBar(
          title: Text(_appTitle),
        ),
        body: Column(
          children: [
            TextField(
              controller: controller,
            ),
            Expanded(
              child: ListView.builder(
                itemCount: todos.length,
                itemBuilder: (BuildContext context, int index) {
                  final todo = todos[index];

                  return Dismissible(
                    key: Key('$todo$index'),
                    onDismissed: (direction) => todos.removeAt(index),
                    child: ListTile(title: Text(todo)),
                    background: Container(color: Colors.red),
                  );
                },
              ),
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              todos.add(controller.text);
              controller.clear();
            });
          },
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```
