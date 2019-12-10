---
title: Focus and text fields
title: 焦点和文本框
prev:
  title: Retrieve the value of a text field
  title: 获取文本框的输入值
  path: /docs/cookbook/forms/retrieve-input
next:
  title: Add Material touch ripples
  title: 添加点按涟漪效果 (Material Design)
  path: /docs/cookbook/gestures/ripples
---

When a text field is selected and accepting input,
it is said to have "focus."
Generally, users shift focus to a text field by tapping,
and developers shift focus to a text field programmatically by
using the tools described in this recipe.

当一个文本框（输入框）被选中并接受输入时，
被称为获得了“焦点”。通常情况下，用户能够通过点击文本框以使其聚焦，
开发人员也可以使用本文所描述的方法来让文本框得到焦点。

Managing focus is a fundamental tool for creating forms with an intuitive
flow. For example, say you have a search screen with a text field.
When the user navigates to the search screen,
you can set the focus to the text field for the search term.
This allows the user to start typing as soon as the screen
is visible, without needing to manually tap the text field.

管理焦点是一种直观地创建表单流程的基本方法。
例如，假设我们有一个带有文本框的搜索页面。当用户导航到搜索页面时，
我们可以聚焦文本框的搜索项。
这将允许用户在搜索页面可见时能够立即开始输入，而无需手动点击文本框。

In this recipe, learn how to give the focus to a text field as soon
as it's visible,
as well as how to give focus to a text field when a button is tapped.

在本文中，我们将学习如何聚焦到文本框上，以及点击按钮时聚焦文本框。

## Focus a text field as soon as it's visible

## 一旦文本框可见，就将其聚焦

To give focus to a text field as soon as it's visible,
use the `autofocus` property.

为了在文本框可见时将其聚焦，我们可以使用 `autofocus` 属性。

<!-- skip -->
```dart
TextField(
  autofocus: true,
);
```

For more information on handling input and creating text fields,
see the [Forms][] section of the cookbook.

有关处理输入和创建文本框的更多信息，请参阅
[实用教程的 Forms 部分](/docs/cookbook#forms)。

## Focus a text field when a button is tapped

## 点击按钮时聚焦文本框

Rather than immediately shifting focus to a specific text field,
you might need to give focus to a text field at a later point in time.
In the real world, you might also need to give focus to a specific
text field in response to an API call or a validation error.
In this example, give focus to a text field after the user
presses a button using the following steps:

我们也可能需要在之后的某个时间点聚焦特定的文本框，而不是立即聚焦它。
在这个例子中，我们将看到在用户按下按钮后如何聚焦文本框。
在实际开发中，您还可能需要聚焦特定的文本框以响应 api 调用或错误校验。

### Directions

### 步骤

  1. Create a `FocusNode`.

     创建一个 `FocusNode`

  2. Pass the `FocusNode` to a `TextField`.

     将 `FocusNode` 传递给 `TextField`   

  3. Focus the `TextField` when a button is tapped.

     通过点击按钮聚焦 `TextField`

### 1. Create a `FocusNode`

### 1. 创建一个 `FocusNode`

First, create a [`FocusNode`][].
Use the `FocusNode` to identify a specific `TextField` in Flutter's
"focus tree." This allows you to give focus to the `TextField`
in the next steps.

首先，我们需要创建一个 [`FocusNode`][]。
我们将使用 `FocusNode` 来识别 Flutter 的“focus tree”中的特定的 `TextField`。
这将允许我们能够在接下来的步骤中聚焦 `TextField`。

Since focus nodes are long-lived objects, manage the lifecycle
using a `State` object. Use the following instructions to create
a `FocusNode` instance inside the `initState()` method of a
`State` class, and clean it up in the `dispose()` method:

由于 focus node 是长寿命对象，我们需要使用 `State` 类来管理生命周期。
为此，需要在 `State` 类的 `initState` 方法中创建 `FocusNode` 实例，
并在 `dispose` 方法中清除它们。

<!-- skip -->
```dart
// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  @override
  _MyCustomFormState createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds data related to the form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Define the focus node. To manage the lifecycle, create the FocusNode in
  // the initState method, and clean it up in the dispose method.
  FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();

    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    myFocusNode.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next step.
  }
}
```

### 2. Pass the `FocusNode` to a `TextField`

### 2. 将 `FocusNode` 传递给 `TextField` 

Now that you have a `FocusNode`,
pass it to a specific `TextField` in the `build()` method.

现在已经有了 `FocusNode`，我们可以将这个 `TextField` 传递给 `build()` 方法。

<!-- skip -->
```dart
class _MyCustomFormState extends State<MyCustomForm> {
  // Code to create the Focus node...

  @override
  Widget build(BuildContext context) {
    return TextField(
      focusNode: myFocusNode,
    );
  }
}
```

### 3. Give focus to the `TextField` when a button is tapped

### 3. 通过点击按钮聚焦 `TextField`

Finally, focus the text field when the user taps a floating
action button. Use the [`requestFocus()`][] method to perform
this task.

最后，当用户点击 floating action button 时，我们将要聚焦文本框！
为此我们将要使用 [`requestFocus()`][] 方法来完成此操作。

<!-- skip -->
```dart
FloatingActionButton(
  // When the button is pressed, give focus to the text field using
  // myFocusNode.
  onPressed: () => FocusScope.of(context).requestFocus(myFocusNode),
);
```

## Complete example

## 完整样例

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Text Field Focus',
      home: MyCustomForm(),
    );
  }
}

// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  @override
  _MyCustomFormState createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds data related to the form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Define the focus node. To manage the lifecycle, create the FocusNode in
  // the initState method, and clean it up in the dispose method.
  FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();

    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    myFocusNode.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Text Field Focus'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // The first text field is focused on as soon as the app starts.
            TextField(
              autofocus: true,
            ),
            // The second text field is focused on when a user taps the
            // FloatingActionButton.
            TextField(
              focusNode: myFocusNode,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the button is pressed,
        // give focus to the text field using myFocusNode.
        onPressed: () => FocusScope.of(context).requestFocus(myFocusNode),
        tooltip: 'Focus Second Text Field',
        child: Icon(Icons.edit),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

![Text Field Focus Demo](/images/cookbook/focus.gif){:.site-mobile-screenshot}



[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html
[Forms]: /docs/cookbook#forms
[`requestFocus()`]: {{site.api}}/flutter/widgets/FocusNode/requestFocus.html
