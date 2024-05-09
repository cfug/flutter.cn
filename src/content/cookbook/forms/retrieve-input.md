---
# title: Retrieve the value of a text field
title: 获取文本框的输入值
# description: How to retrieve text from a text field.
description: 如何获取文本框输入的文字
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/forms/retrieve_input"?>

In this recipe,
learn how to retrieve the text a user has entered into a text field
using the following steps:

这个章节讲解的是如何获取文本框的输入值。

  1. Create a `TextEditingController`.
     
     创建一个  `TextEditingController`

  2. Supply the `TextEditingController` to a `TextField`.
     
     把 `TextEditingController` 应用到 `TextField` 上

  3. Display the current value of the text field.

     展示文本框当前值  

## 1. Create a `TextEditingController`

## 1. 创建 `TextEditingController`

To retrieve the text a user has entered into a text field,
create a [`TextEditingController`][]
and supply it to a `TextField` or `TextFormField`.

为了获取文本框输入值，需要创建一个 [`TextEditingController`][]。
在后续步骤中，这个 `TextEditingController` 将会被应用到 `TextField` 上。

Once a `TextEditingController` is supplied to a `TextField` or `TextFormField`,
we can use it to retrieve the text a user has typed into that text field.

`TextEditingController` 被应用于 `TextField` 或者 `TextFormField` 后，
就可以使用它来获取文本框输入值。

:::important

Call `dispose` of the `TextEditingController` when
you've finished using it. This ensures that you discard any resources
used by the object.

当不再使用 `TextEditingController` 时，
请调用 `dispose` 销毁它以确保相关的资源得到释放。

:::

<?code-excerpt "lib/starter.dart (Starter)" remove="return Container();"?>
```dart
// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
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

创建完 `TextEditingController`，
就可以使用 `controller` 属性完成 text field 绑定。

<?code-excerpt "lib/step2.dart (TextFieldController)"?>
```dart
return TextField(
  controller: myController,
);
```

## 3. Display the current value of the text field

## 3. 展示文本框当前值

After supplying the `TextEditingController` to the text field,
begin reading values. Use the [`text()`][]
method provided by the `TextEditingController` to retrieve the
String that the user has entered into the text field.

在 `TextEditingController` 作用于文本框后，就可以开始取值了。
通过 `TextEditingController` 提供的 [`text()`][] 方法，
就能够获取到文本框输入值了。

The following code displays an alert dialog with the current
value of the text field when the user taps a floating action button.

在下面的示例中，用户点击浮层按钮，
将会触发弹出一个对话框，对话框获取并显示文本框的当前值。

<?code-excerpt "lib/step3.dart (FloatingActionButton)" replace="/^floatingActionButton\: //g"?>
```dart
FloatingActionButton(
  // When the user presses the button, show an alert dialog containing
  // the text that the user has entered into the text field.
  onPressed: () {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          // Retrieve the text that the user has entered by using the
          // TextEditingController.
          content: Text(myController.text),
        );
      },
    );
  },
  tooltip: 'Show me the value!',
  child: const Icon(Icons.text_fields),
),
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Retrieve Text Input',
      home: MyCustomForm(),
    );
  }
}

// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
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
        title: const Text('Retrieve Text Input'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: TextField(
          controller: myController,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog containing
        // the text that the user has entered into the text field.
        onPressed: () {
          showDialog(
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
        child: const Icon(Icons.text_fields),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/retrieve-input.gif" alt="Retrieve Text Input Demo" class="site-mobile-screenshot" />
</noscript>


[`text()`]: {{site.api}}/flutter/widgets/TextEditingController/text.html
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
