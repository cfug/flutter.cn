---
title: Handling changes to a text field
title: 响应文本框内容的更改
prev:
  title: Focus on a Text Field
  title: Text Field 上的焦点
  path: /docs/cookbook/forms/focus
next:
  title: Retrieve the value of a text field
  title: 获取文本框的输入值
  path: /docs/cookbook/forms/retrieve-input
---

In some cases, it can be handy to run a callback function every time the text
in a text field changes. For example, we might want to build a search screen
with autocomplete functionality. In this case, we would want to update the
results as the user types.

在某些情境中，我们可能需要在每次文本框的文本内容变化时都调用回调函数。
例如，当构建一个有自动填充功能的搜索页面时，我们希望根据用户输入的内容来更新返回的结果。

How can we run a callback function every time the text changes? With Flutter,
we have two options:

  1. Supply an `onChanged` callback to a `TextField`
  2. Use a `TextEditingController`

那么如何每次在文本内容改变时调用回调函数呢？在Flutter中，我们提供了两种选择：

  1. 给 `TextField` 绑定 `onChanged` 回调
  2. 使用 `TextEditingController`



## 1. Supply an `onChanged` callback to a `TextField`

The simplest approach is to supply an
[`onChanged`]({{site.api}}/flutter/material/TextField/onChanged.html)
callback to a
[`TextField`]({{site.api}}/flutter/material/TextField-class.html).
Whenever the text changes, the callback will be invoked. One downside to this
approach is it does not work with `TextFormField` Widgets.

In this example, we will print the current value of the text field to the
console every time the text changes.

## 1.给 `TextField` 绑定  `onChanged`  回调

最简单的方法是给 [`TextField`]({{site.api}}/flutter/material/TextField-class.html) 绑定 `onChanged` 回调。每当文本内容改变时，回调函数会被触发。但这种方法有一个缺点，它不适用于 `TextFormField` 组件。

在下面的示例中，每次 text 的值改变，会在控制台中打印出当前文本框的值。

<!-- skip -->
```dart
TextField(
  onChanged: (text) {
    print("First text field: $text");
  },
);
```

## 2. Use a `TextEditingController`

A more powerful, but more elaborate approach, is to supply a
[`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html)
as the
[`controller`]({{site.api}}/flutter/material/TextField/controller.html)
property of the `TextField` or a `TextFormField`.

To be notified when the text changes, we can listen to the controller using its
[`addListener`]({{site.api}}/flutter/foundation/ChangeNotifier/addListener.html)
method.

## 2.使用 `TextEditingController`

另外一种更强大但是更复杂的方法是绑定 [`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html) 作为 `TextField` 和

 `TextFormField` 的 [`controller`]({{site.api}}/flutter/material/TextField/controller.html) 属性

想要在文本更改时收到通知，我们可以使用 [`addListener`]({{site.api}}/flutter/foundation/ChangeNotifier/addListener.html) 方法来监听控制器。



### Directions

-   Create a `TextEditingController`
-   Supply the `TextEditingController` to a `TextField`
    - Create a function to print the latest value
    - Listen to the controller for changes

### 步骤

- 创建一个 `TextEditingController`
- 将 `TextEditingController` 绑定到 `TextField`
  - 创建一个函数来打印最新值
  - 监听控制器的变化
    ​

### Create a `TextEditingController`

First, we'll need to create a `TextEditingController`. In the subsequent steps,
we will supply the `TextEditingController` to a `TextField`. Once we've wired
these two classes together, we can listen for changes to the text field!

### 创建一个 `TextEditingController`

首先，我们需要创建一个 `TextEditingController` ，然后将 `TextField` 绑定 `TextEditingController` 。一旦将这两个类绑定在一起，我们就可以监听文本框的改变了！



<!-- skip -->
```dart
// Define a Custom Form Widget
class MyCustomForm extends StatefulWidget {
  @override
  _MyCustomFormState createState() => _MyCustomFormState();
}

// Define a corresponding State class. This class will hold the data related to
// our Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller. We will use it to retrieve the current value
  // of the TextField!
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the Widget is removed from the Widget tree
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // We will fill this out in the next step!
  }
}
```

Note: Please remember to `dispose` the `TextEditingController` when it is no
longer needed. This will ensure we discard any resources used by the object.

注意：请在 `TextEditingController` 使用完毕时将其 `dispose` ，从而确保所有被这个对象所使用的资源被释放。



### Supply the `TextEditingController` to a `TextField`

In order to work, the `TextEditingController` must be supplied to either a
`TextField` or a `TextFormField`. Once it's wired up, we can begin listening
for changes to the text field.

### 给 `TextField` 绑定 `TextEditingController`

`TextEditingController` 必须绑定到 `TextField` 或者是 `TextFormField` 才能被正常的使用。一旦绑定，就能够开始监听文本框的变化。

<!-- skip -->
```dart
TextField(
  controller: myController,
);
```

### Create a function to print the latest value

Now, we'll need a function that should run every time the text changes! In this
example, we'll create a method that prints out the current value of the text
field.

This method will live inside our `_MyCustomFormState` class.

### 创建一个打印当前值的方法

现在，我们需要一个每当表单项变化都会运行的函数！在下面的示例中，我们会创建一个打印文本框当前值的方法。

这个方法将存在于 `_MyCustomFormState` 类中。



<!-- skip -->
```dart
_printLatestValue() {
  print("Second text field: ${myController.text}");
}
```

### Listen to the controller for changes

Finally, we need to listen to the `TextEditingController` and run the
`_printLatestValue` method whenever the text changes. We will use the
[`addListener`]({{site.api}}/flutter/foundation/ChangeNotifier/addListener.html)
method to achieve this task.

In this example, we will begin listening for changes when the
`_MyCustomFormState` class is initialized, and stop listening when the
`_MyCustomFormState` is disposed.

### 监听控制器的变化

最后，需要监听 `TextEditingController` 并且在 text 值变化时运行 `_printLatestValue` 方法。我们需要使用[`addListener`]({{site.api}}/flutter/foundation/ChangeNotifier/addListener.html)方法来实现这个功能。

下面的示例会在类 `_MyCustomFormState` 初始化的时候开始监听变化，dispose时停止监听。

<!-- skip -->
```dart
class _MyCustomFormState extends State<MyCustomForm> {
  @override
  void initState() {
    super.initState();

    // Start listening to changes
    myController.addListener(_printLatestValue);
  }
}
```

## Complete example

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Retrieve Text Input',
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
// our Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller. We will use it to retrieve the current value
  // of the TextField!
  final myController = TextEditingController();

  @override
  void initState() {
    super.initState();

    myController.addListener(_printLatestValue);
  }

  @override
  void dispose() {
    // Clean up the controller when the Widget is removed from the Widget tree
    // This also removes the _printLatestValue listener
    myController.dispose();
    super.dispose();
  }

  _printLatestValue() {
    print("Second text field: ${myController.text}");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Retrieve Text Input'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            TextField(
              onChanged: (text) {
                print("First text field: $text");
              },
            ),
            TextField(
              controller: myController,
            ),
          ],
        ),
      ),
    );
  }
}
```
