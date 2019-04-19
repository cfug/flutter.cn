---
title: Focus on a Text Field
title: Text Field 上的焦点
prev:
  title: Create and style a text field
  title: 文本框的创建和设定
  path: /docs/cookbook/forms/text-input
next:
  title: Handling changes to a text field
  title: 响应文本框内容的更改
  path: /docs/cookbook/forms/text-field-changes
---

When a text field is selected and accepting input, it is said to have "focus."
Generally, users can focus text fields by tapping on them, and developers
can focus text fields using the tools described in this recipe.

当一个文本区字段被选择并接受输入时，它被称为获得“焦点”。 通常，用户可以通过点击文本字段来聚焦文本字段，开发人员可以使用此文章中描述的工具来聚焦文本字段。

Managing focus is a fundamental tool for creating forms with an intuitive
flow. For example, say we have a search screen with a text field. When
the user navigates to the search screen, we can focus the search term text field.
This allows the user to start typing as soon as the screen
is visible, without needing to manually tap on the text field!

管理焦点是使用直观流程创建表单的基本工具。 例如，假设我们有一个带有文本字段的搜索屏幕。 当用户导航到搜索屏幕时，我们可以聚焦搜索词文本字段。 这允许用户在屏幕可见时立即开始输入，而无需手动点击文本字段！

In this recipe, we'll learn how to focus a text field as soon as it's visible
as well as how to focus a text field when a button is tapped.

在本文中，我们将学习如何在文本字段可见时将其聚焦，以及在点击按钮时如何聚焦文本字段。

## Focus a text field as soon as it's visible

## 一旦文本字段可见，就将其聚焦

In order to focus a text field as soon as it's visible, we can use the
`autofocus` property.

为了在文本字段可见时将其聚焦，我们可以使用 `autofocus` 属性。

<!-- skip -->
```dart
TextField(
  autofocus: true,
);
```

For more information on handling input and creating text fields, please see the
[Forms section of the cookbook](/docs/cookbook#forms).

有关处理输入和创建文本字段的更多信息，请参阅 [Forms section of the cookbook](/docs/cookbook#forms)。

## Focus a text field when a button is tapped

## 点击按钮时聚焦文本字段

Rather than immediately focusing a specific text field, we might need to focus a
text field at a later point in time. In this example, we'll see how to focus a
text field after the user presses a button. In the real world, you may also need
to focus a specific text field in response to an api call or a validation error.

我们可能需要在稍后的某个时间点聚焦文本字段，而不是立即聚焦特定的文本字段。 在这个例子中，我们将看到在用户按下按钮后如何聚焦文本字段。 在现实世界中，您可能还需要聚焦特定的文本字段以响应 api 调用或验证错误。

### Directions

## 步骤

  1. Create a `FocusNode`

     创建一个 `FocusNode`

  2. Pass the `FocusNode` to a `TextField`

     将 `FocusNode` 传递给 `TextField`   

  3. Focus the `TextField` when a button is tapped

     点击按钮时，将 `TextField` 聚焦

### 1. Create a `FocusNode`

### 1. 创建一个 `FocusNode`

First, we'll need to create a
[`FocusNode`]({{site.api}}/flutter/widgets/FocusNode-class.html).
We will use the `FocusNode` to identify a specific `TextField` in Flutter's
"focus tree." This will allow us to focus the `TextField` in the next steps.

首先，我们需要创建一个 [`FocusNode`]({{site.api}}/flutter/widgets/FocusNode-class.html)。 我们将使用 `FocusNode` 来识别Flutter的“焦点树”中的特定`TextField`。 这将允许我们能够在接下来的步骤中聚焦 `TextField`。

Since focus nodes are long-lived objects, we need to manage the lifecycle
using a `State` class. To do so, create the `FocusNode` instance inside the
`initState` method of a `State` class, and clean them up inside the `dispose`
method.

由于焦点节点是长寿命对象，我们需要使用 `State` 类来管理生命周期。 为此，在 `State` 类的 `initState` 方法中创建 `FocusNode` 实例，并在 `dispose` 方法中清理它们。

<!-- skip -->
```dart
// Define a Custom Form Widget
class MyCustomForm extends StatefulWidget {
  @override
  _MyCustomFormState createState() => _MyCustomFormState();
}

// Define a corresponding State class. This class will hold the data related to
// the form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Define the focus node. To manage the lifecycle, create the FocusNode in
  // the initState method, and clean it up in the dispose method
  FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();

    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed
    myFocusNode.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // We will fill this out in the next step!
  }
}
```

### 2. Pass the `FocusNode` to a `TextField`

### 2. 将 `FocusNode` 传递给 `TextField` 

Now that we have our `FocusNode`, we can pass it to a specific `TextField` in
the `build` method.

既然我们有了 `FocusNode`，我们可以将它传递给 `build` 方法中的特定 `TextField`。

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

### 3. Focus the `TextField` when a button is tapped

### 3. 点击按钮时，将 `TextField` 聚焦

Finally, we'll want to focus the text field when the user taps a floating
action button! We'll use the
[`requestFocus`]({{site.api}}/flutter/widgets/FocusScopeNode/requestFocus.html)
method to achieve this task.

最后，当用户点击浮动操作按钮时，我们将要聚焦文本字段！ 我们将使用 [`requestFocus`]({{site.api}}/flutter/widgets/FocusScopeNode/requestFocus.html) 方法来完成此任务。

<!-- skip -->
```dart
FloatingActionButton(
  // When the button is pressed, ask Flutter to focus our text field using
  // myFocusNode.
  onPressed: () => FocusScope.of(context).requestFocus(myFocusNode),
);
```

## Complete example

## 一个完整的示例

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

// Define a Custom Form Widget
class MyCustomForm extends StatefulWidget {
  @override
  _MyCustomFormState createState() => _MyCustomFormState();
}

// Define a corresponding State class. This class will hold the data related to
// the form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Define the focus node. To manage the lifecycle, create the FocusNode in
  // the initState method, and clean it up in the dispose method
  FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();

    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed
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
            // The first text field will be focused as soon as the app starts
            TextField(
              autofocus: true,
            ),
            // The second text field will be focused when a user taps on the
            // FloatingActionButton
            TextField(
              focusNode: myFocusNode,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the button is pressed, ask Flutter to focus our text field using
        // myFocusNode.
        onPressed: () => FocusScope.of(context).requestFocus(myFocusNode),
        tooltip: 'Focus Second Text Field',
        child: Icon(Icons.edit),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

![Text Field Focus Demo](/images/cookbook/focus.gif){:.site-mobile-screenshot}
