---
title: Retrieve the value of a text field
title: 获取文本框的输入值
prev:
  title: Handle changes to a text field
  title: 响应文本框内容的更改
  path: /docs/cookbook/forms/text-field-changes
next:
  title: Add Material touch ripples
  title: 添加点按涟漪效果 (Material Design)
  path: /docs/cookbook/gestures/ripples
---

In this recipe,
learn how to retrieve the text a user has entered into a text field
using the following steps:

这个章节讲解的是如何获取文本框的输入值。

## Directions

## 步骤

  1. Create a `TextEditingController`.
     
     创建一个  `TextEditingController`

  2. Supply the `TextEditingController` to a `TextField`.
     
     把 `TextEditingController` 应用到 `TextField` 上

  3. Display the current value of the text field.

     展示文本框当前值  

## 1. Create a `TextEditingController`

## 1. 创建 `TextEditingController`

To retrieve the text a user has entered into a text field, create a
[`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html)
and supply it to a `TextField` or `TextFormField`.

为了获取文本框输入值，需要创建一个 [`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html)。在后续步骤中，这个 `TextEditingController` 将会被应用到 `TextField` 上。

Once a `TextEditingController` is supplied to a `TextField` or `TextFormField`,
we can use it to retrieve the text a user has typed into that text field.

`TextEditingController` 被应用于 `TextField` 或者 `TextFormField` 后，就可以使用它来获取文本框输入值。

{{site.alert.secondary}}

  **Important:** Call `dispose` of the `TextEditingController` when
  you've finished using it. This ensures that you discard any resources
  used by the object.
  
  **记住:**当不再使用 `TextEditingController` 时，请销毁它以确保相关的资源得到释放。
  
{{site.alert.end}}


<!-- skip -->
```dart
// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  @override
  _MyCustomFormState createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds the data related to the Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next step.
  }
}
```

## 2. Supply the `TextEditingController` to a `TextField`

## 2. 把 `TextEditingController` 应用到 `TextField` 上

Now that you have a `TextEditingController`, wire it up
to a text field using the `controller` property:

创建完 `TextEditingController`，就可以使用 `controller` 属性完成 text field 绑定。

<!-- skip -->
```dart
TextField(
  controller: myController,
);
```

## 3. Display the current value of the text field

## 3. 展示文本框当前值

After supplying the `TextEditingController` to the text field,
begin reading values. Use the
[`text()`]({{site.api}}/flutter/widgets/TextEditingController/text.html)
method provided by the `TextEditingController` to retrieve the
String that the user has entered into the text field.

在 `TextEditingController` 作用于文本框后，就可以开始取值了。通过 `TextEditingController` 提供的 [`text()`]({{site.api}}/flutter/widgets/TextEditingController/text.html) 方法，就能够获取到文本框输入值了。

The following code displays an alert dialog with the current
value of the text field when the user taps a floating action button.

在下面的示例中，用户点击浮层按钮，将会触发弹出一个对话框，对话框获取并显示文本框的当前值。

<!-- skip -->
```dart
FloatingActionButton(
  // When the user presses the button, show an alert dialog containing the
  // text that the user has entered into the text field.
  onPressed: () {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          // Retrieve the text the user has entered by using the
          // TextEditingController.
          content: Text(myController.text),
        );
      },
    );
  },
  tooltip: 'Show me the value!',
  child: Icon(Icons.text_fields),
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
      title: 'Retrieve Text Input',
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
// This class holds the data related to the Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Retrieve Text Input'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: TextField(
          controller: myController,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog containing
        // the text that the user has entered into the text field.
        onPressed: () {
          return showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                // Retrieve the text the that user has entered by using the
                // TextEditingController.
                content: Text(myController.text),
              );
            },
          );
        },
        tooltip: 'Show me the value!',
        child: Icon(Icons.text_fields),
      ),
    );
  }
}
```

![Retrieve Text Input Demo](/images/cookbook/retrieve-input.gif){:.site-mobile-screenshot}

![获取文本输入示例](/images/cookbook/retrieve-input.gif){:.site-mobile-screenshot}
