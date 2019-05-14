---
title: Building a form with validation
title: 构建一个有验证判断的表单
prev:
  title: Working with Tabs
  path: /docs/cookbook/design/tabs
next:
  title: Create and style a text field
  path: /docs/cookbook/forms/text-input
---

Apps often require users to enter information into a text field. For
example, we might be working on an app that requires our users to log in with an
email address and password combination.

应用程序通常会要求用户在文本框中输入信息。例如，我们可能正在开发一个应用程序，该应用程序就需要用户输入邮箱和密码登录。

In order to make our apps secure and easy to use, we can check whether the
information the user has provided is valid. If the user has correctly filled
out the form, we can process the information. If the user submits incorrect
information, we can display a friendly error message letting them know what went
wrong.

为了让应用程序更为安全易用，我们通常都需要验证用户输入的信息是否有效。
如果用户输入了正确的信息，就可以针对该信息进行后续处理。
如果用户输入了错误的信息，就需要在相关的输入区域展示一条输入信息出错的提示，以便用户更正输入。

In this example, we'll see how to add validation to a form with a single
text field.

在下面的例子中，将演示如何为表单中的文本输入框加入验证判断的功能。

## Directions

## 步骤

  1. Create a `Form` with a `GlobalKey`
     
     创建表单 `Form`，并以 `GlobalKey` 作为唯一性标识

  2. Add a `TextFormField` with validation logic

     添加带验证逻辑的 `TextFormField` 到表单中

  3. Create a button to validate and submit the form
     
     创建按钮以验证和提交表单

## 1. Create a `Form` with a `GlobalKey`

## 1. 创建表单 `Form`，并以 `GlobalKey` 作为唯一性标识

First, we'll need a [`Form`]({{site.api}}/flutter/widgets/Form-class.html)
to work with. The `Form` Widget acts as a container to group and validate
multiple form fields.

首先，我们需要创建一个表单组件 [`Form`]({{site.api}}/flutter/widgets/Form-class.html) 作为容器承载和验证多个表单域。

When we create the form, we'll also need to provide a
[`GlobalKey`]({{site.api}}/flutter/widgets/GlobalKey-class.html).
This will uniquely identify the `Form` that we're working with, and will allow
us to validate the form in a later step.

当我们创建表单 `Form` 的时候，需要提供一个 [`GlobalKey`]({{site.api}}/flutter/widgets/GlobalKey-class.html)。`GlobalKey` 唯一标识了这个表单 `Form`，在后续的表单验证步骤中，也起到了关键的作用。

<!-- skip -->
```dart
// Define a Custom Form Widget
class MyCustomForm extends StatefulWidget {
  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Define a corresponding State class. This class will hold the data related to
// the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that will uniquely identify the Form widget and allow
  // us to validate the form
  //
  // Note: This is a `GlobalKey<FormState>`, not a GlobalKey<MyCustomFormState>!
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey we created above
    return Form(
      key: _formKey,
      child: // We'll build this out in the next steps!
    );
  }
}
```

{{site.alert.tip}}
Using a `GlobalKey` is the recommended way to access a form. However, if you
have a more complex widget tree, you can use the
[`Form.of`]({{site.api}}/flutter/widgets/Form/of.html) method to
access the form within nested widgets.

一般情况下，推荐使用 `GlobalKey` 来访问一个表单。
嵌套组件且组件树比较复杂的情况下，可以使用 [`Form.of`]({{site.api}}/flutter/widgets/Form/of.html) 方法访问表单。

{{site.alert.end}}

## 2. Add a `TextFormField` with validation logic

## 2. 添加带验证逻辑的 `TextFormField` 到表单中

We have our `Form` in place, but we haven't provided a way for our users to
enter text! This is the job of a
[`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html).
The `TextFormField` Widget renders a material design text input and knows how to
display validation errors when they occur.

在前面步骤中，已经创建出表单 `Form` 了，此时还需要提供一个 [`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html) 让用户输入文本信息。`TextFormField` 是遵循 material 设计风格的文本输入框，并且能够在输入验证不通过时显示错误提醒。

How can we validate the input? By providing a `validator` function to the
`TextFormField`. If there is an error with the information the user has
provided, the `validator` function must return a `String` containing
an error message. If there are no errors, the function should not return
anything.

那我们该如何去验证输入是否正确呢？只需要给 `TextFormField` 加入 `validator` 函数就可以了。`validator` 函数会校验用户输入的信息，如果信息有误，会返回包含出错原因的字符串 `String`。如果信息无误，则不返回。

In this example, we will create a `validator` that ensures the `TextFormField`
isn't empty. If it is empty, we will return a friendly error message!

在下面的实例中，我们会在 `TextFormField` 中加入一个 `validator` 验证函数，它的功能是判断用户输入的文本是否为空，如果为空，就返回「请输入文本」的友情提示。

<!-- skip -->
```dart
TextFormField(
  // The validator receives the text the user has typed in
  validator: (value) {
    if (value.isEmpty) {
      return 'Please enter some text';
    }
  },
);
```

## 3. Create a button to validate and submit the form

## 3. 创建按钮以验证和提交表单

Now that we have a form with a text field, we'll need to provide a button the
user can tap to submit the information.

在创建完表单以及文本框后，还需要提供一个按钮让用户提交表单。

When the user attempts to submit the form, we'll need to check if the form is
valid. If it is, we will show a success message. If the text field has no
content, we'll want to display the error message.

当用户提交表单后，我们会预先检查表单信息是否有效。如果文本框没有输入任何内容，表单无效，会在文本框区域展示错误提示。如果文本框有内容，表单有效，则会展示验证通过的 SnackBar。

<!-- skip -->
```dart
RaisedButton(
  onPressed: () {
    // Validate will return true if the form is valid, or false if
    // the form is invalid.
    if (_formKey.currentState.validate()) {
      // If the form is valid, display a snackbar. In the real world, you'd
      // often want to call a server or save the information in a database
      Scaffold
          .of(context)
          .showSnackBar(SnackBar(content: Text('Processing Data')));
    }
  },
  child: Text('Submit'),
);
```

### How does this work?

### 实现原理

In order to validate the form, we'll need to use the `_formKey` created in
step 1. We can use the `_formKey.currentState` method to access the
[`FormState`]({{site.api}}/flutter/widgets/FormState-class.html),
which is automatically created by Flutter when we build a `Form`.

为了验证表单，我们需要使用到步骤1中的 `_formKey`。使用 `_formKey.currentState` 方法去访问 [`FormState`]({{site.api}}/flutter/widgets/FormState-class.html)，而 `FormState` 是在创建表单 `Form` 时 Flutter 自动生成的。

The `FormState` class contains the `validate` method. When the `validate` method
is called, it will run the `validator` function for each text field in the form.
If everything looks good, the method returns `true`. If any text field contains
errors, it will display the error message for each invalid text field and return
`false`.

`FormState` 类包含了 `validate` 方法。当 `validate` 方法被调用的时候，会遍历运行表单中所有文本框的 `validator` 函数。如果所有 `validator` 函数验证都通过，`validate` 方法返回 `true`。如果有某个文本框验证不通过，就会在那个文本框区域显示错误提示，同时 `validate` 方法返回 `false`。

## Complete example

## 完整示例

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appTitle = 'Form Validation Demo';

    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(
          title: Text(appTitle),
        ),
        body: MyCustomForm(),
      ),
    );
  }
}

// Create a Form Widget
class MyCustomForm extends StatefulWidget {
  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Create a corresponding State class. This class will hold the data related to
// the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that will uniquely identify the Form widget and allow
  // us to validate the form
  //
  // Note: This is a GlobalKey<FormState>, not a GlobalKey<MyCustomFormState>!
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey we created above
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TextFormField(
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter some text';
              }
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: RaisedButton(
              onPressed: () {
                // Validate will return true if the form is valid, or false if
                // the form is invalid.
                if (_formKey.currentState.validate()) {
                  // If the form is valid, we want to show a Snackbar
                  Scaffold.of(context)
                      .showSnackBar(SnackBar(content: Text('Processing Data')));
                }
              },
              child: Text('Submit'),
            ),
          ),
        ],
      ),
    );
  }
}
```

![Form Validation Demo](/images/cookbook/form-validation.gif){:.site-mobile-screenshot}

![表单验证示例](/images/cookbook/form-validation.gif){:.site-mobile-screenshot}
