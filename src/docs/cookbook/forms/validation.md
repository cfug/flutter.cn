---
title: Build a form with validation
title: 构建一个有验证判断的表单
prev:
  title: Work with tabs
  title: 使用 tabs
  path: /docs/cookbook/design/tabs
next:
  title: Create and style a text field
  title: 文本框的创建和设定
  path: /docs/cookbook/forms/text-input
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

Apps often require users to enter information into a text field.
For example, you might require users to log in with an email address
and password combination.

应用程序通常会要求用户在文本框中输入信息。例如，我们可能正在开发一个应用程序，该应用程序就需要用户输入邮箱和密码登录。

To make apps secure and easy to use, check whether the
information the user has provided is valid. If the user has correctly filled
out the form, process the information. If the user submits incorrect
information, display a friendly error message letting them know what went
wrong.

为了让应用程序更为安全易用，我们通常都需要验证用户输入的信息是否有效。
如果用户输入了正确的信息，就可以针对该信息进行后续处理。
如果用户输入了错误的信息，就需要在相关的输入区域展示一条输入信息出错的提示，以便用户更正输入。

In this example, learn how to add validation to a form that has
a single text field using the following steps:

你可以通过以下步骤，在下面的例子中学习如何为表单中的文本输入框加入验证判断的功能：

  1. Create a `Form` with a `GlobalKey`.
     
     创建表单 `Form`，并以 `GlobalKey` 作为唯一性标识

  2. Add a `TextFormField` with validation logic.

     添加带验证逻辑的 `TextFormField` 到表单中

  3. Create a button to validate and submit the form.
     
     创建按钮以验证和提交表单

## 1. Create a `Form` with a `GlobalKey`

## 1. 创建表单 `Form`，并以 `GlobalKey` 作为唯一性标识

First, create a [`Form`][].
The `Form` widget acts as a container for grouping
and validating multiple form fields.

首先，我们需要创建一个表单组件 [`Form`][] 作为容器承载和验证多个表单域。

When creating the form, provide a [`GlobalKey`][].
This uniquely identifies the `Form`,
and allows validation of the form in a later step.

当我们创建表单 `Form` 的时候，需要提供一个 [`GlobalKey`][]。
`GlobalKey` 唯一标识了这个表单 `Form`，
在后续的表单验证步骤中，也起到了关键的作用。

<!-- skip -->
```dart
// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Define a corresponding State class.
// This class holds data related to the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a `GlobalKey<FormState>`,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
              // Add TextFormFields and RaisedButton here.
        ]
     )
    );
  }
}
```

{{site.alert.tip}}

  Using a `GlobalKey` is the recommended way to access a form.
  However, if you have a more complex widget tree,
  you can use the [`Form.of()`][] method to
  access the form within nested widgets.
  
  一般情况下，推荐使用 `GlobalKey` 来访问一个表单。
  嵌套组件且组件树比较复杂的情况下，
  可以使用 [`Form.of()`][] 方法访问表单。

{{site.alert.end}}

## 2. Add a `TextFormField` with validation logic

## 2. 添加带验证逻辑的 `TextFormField` 到表单中

Although the `Form` is in place,
it doesn't have a way for users to enter text.
That's the job of a [`TextFormField`][].
The `TextFormField` widget renders a material design text field
and can display validation errors when they occur.

尽管在前面步骤中，已经创建出表单 `Form` 了，
但我们此时还需要提供一个 [`TextFormField`][] 让用户输入文本信息。
`TextFormField` 是遵循 material 设计风格的文本输入框，
并且能够在输入验证不通过时显示错误提醒。

Validate the input by providing a `validator()` function to the
`TextFormField`. If the user's input isn't valid,
the `validator` function returns a `String` containing
an error message.
If there are no errors, the validator must return null.

通过给 `TextFormField` 加入 `validator()` 函数可以验证输入是否正确。
`validator` 函数会校验用户输入的信息，
如果信息有误，会返回包含出错原因的字符串 `String`。
如果信息无误，则不返回。

For this example, create a `validator` that ensures the
`TextFormField` isn't empty. If it is empty,
return a friendly error message.

在下面的实例中，我们会在 `TextFormField` 中加入一个 `validator` 验证函数，
它的功能是判断用户输入的文本是否为空，
如果为空，就返回「请输入文本」的友情提示。

<!-- skip -->
```dart
TextFormField(
  // The validator receives the text that the user has entered.
  validator: (value) {
    if (value.isEmpty) {
      return 'Please enter some text';
    }
    return null;
  },
);
```

## 3. Create a button to validate and submit the form

## 3. 创建按钮以验证和提交表单

Now that you have a form with a text field,
provide a button that the user can tap to submit the information.

在创建完表单以及文本框后，还需要提供一个按钮让用户提交表单。

When the user attempts to submit the form, check if the form is valid.
If it is, display a success message.
If it isn't (the text field has no content) display the error message.

当用户提交表单后，我们会预先检查表单信息是否有效。
如果文本框有内容，表单有效，则会显示正确信息。
如果文本框没有输入任何内容，表单无效，会在文本框区域展示错误提示。

<!-- skip -->
```dart
RaisedButton(
  onPressed: () {
    // Validate returns true if the form is valid, otherwise false.
    if (_formKey.currentState.validate()) {
      // If the form is valid, display a snackbar. In the real world,
      // you'd often call a server or save the information in a database.

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

To validate the form, use the `_formKey` created in
step 1. You can use the `_formKey.currentState()`
method to access the [`FormState`][],
which is automatically created by Flutter when building a `Form`.

为了验证表单，我们需要使用到步骤 1 中的 `_formKey`。
使用 `_formKey.currentState()` 方法去访问 [`FormState`][]，
而 `FormState` 是在创建表单 `Form` 时 Flutter 自动生成的。

The `FormState` class contains the `validate()` method.
When the `validate()` method is called, it runs the `validator()`
function for each text field in the form.
If everything looks good, the `validate()` method returns `true`.
If any text field contains errors, the `validate()` method
rebuilds the form to display any error messages and returns `false`.

`FormState` 类包含了 `validate()` 方法。当 `validate()` 方法被调用的时候，
会遍历运行表单中所有文本框的 `validator()` 函数。
如果所有 `validator()` 函数验证都通过，`validate()` 方法返回 `true`。
如果有某个文本框验证不通过，就会在那个文本框区域显示错误提示，
同时 `validate()` 方法返回 `false`。

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
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

// Create a Form widget.
class MyCustomForm extends StatefulWidget {
  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Create a corresponding State class.
// This class holds data related to the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
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
              return null;
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: RaisedButton(
              onPressed: () {
                // Validate returns true if the form is valid, or false
                // otherwise.
                if (_formKey.currentState.validate()) {
                  // If the form is valid, display a Snackbar.
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

<noscript>
  <img src="/images/cookbook/form-validation.gif" alt="Form Validation Demo（表单验证示例）" class="site-mobile-screenshot" />
</noscript>


[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`Form.of()`]: {{site.api}}/flutter/widgets/Form/of.html
[`FormState`]: {{site.api}}/flutter/widgets/FormState-class.html
[`GlobalKey`]: {{site.api}}/flutter/widgets/GlobalKey-class.html
[`TextFormField`]: {{site.api}}/flutter/material/TextFormField-class.html
