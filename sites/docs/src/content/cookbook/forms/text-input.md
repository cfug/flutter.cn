---
# title: Create and style a text field
title: 文本框的创建和设定
# description: How to implement a text field.
description: 如何实现一个文本框。
tags: cookbook, 实用教程, 表格交互
keywords: 文本框,实现,Flutter搜索框
---

<?code-excerpt path-base="cookbook/forms/text_input/"?>

Text fields allow users to type text into an app.
They are used to build forms,
send messages, create search experiences, and more.
In this recipe, explore how to create and style text fields.

文本框作为一个接收用户输入的组件，被广泛应用于表单构建、即时通讯、搜索等场景中。

Flutter provides two Material Design text fields:
[`TextField`][] and [`TextFormField`][].

Flutter 提供了两个 Material Design 的文本框组件：
[`TextField`][] 和 [`TextFormField`][]。

## `TextField`

## `文本框`

[`TextField`][] is the most commonly used text input widget.

[`TextField`][] 是最常用的文本输入 widget。

By default, a `TextField` is decorated with an underline.
You can add a label, icon, inline hint text, and error text by supplying an
[`InputDecoration`][] as the [`decoration`][]
property of the `TextField`.
To remove the decoration entirely (including the
underline and the space reserved for the label),
set the `decoration` to `null`.

`TextField` 组件的默认样式是带有下划线的装饰样式。
如果需要自定义装饰样式（添加标签、图标、提示文本和错误文本），
可以将 [`InputDecoration`][] 应用到 `TextField` 的 [`decoration`][] 属性上。
如果需要完全移除下划线和标签预留空间，可以将 `decoration` 属性设置为 `null`。

<?code-excerpt "lib/main.dart (TextField)" replace="/^child\: //g"?>
```dart
TextField(
  decoration: InputDecoration(
    border: OutlineInputBorder(),
    hintText: 'Enter a search term',
  ),
),
```

<noscript>
  <img src="/assets/images/docs/cookbook/text-input.png" alt="Text Input Demo" />
</noscript>

To retrieve the value when it changes,
consult the [Handle changes to a text field][] recipe.

要在内容发生变化时收到此内容，请参见 
[响应文本框内容的更改][Handle changes to a text field]。

## `TextFormField`

## `表单文本框`

[`TextFormField`][] wraps a `TextField` and integrates it
with the enclosing [`Form`][].
This provides additional functionality,
such as validation and integration with other
[`FormField`][] widgets.

[`TextFormField`][] 内部封装了一个 `TextField`
并被集成在表单 widget [`Form`][] 中。
如果需要对文本输入进行验证或者需要与其他表单 widget [`FormField`][] 交互联动，
可以考虑使用 `TextFormField`。

<?code-excerpt "lib/main.dart (TextFormField)" replace="/^child\: //g"?>
```dart
TextFormField(
  decoration: const InputDecoration(
    border: UnderlineInputBorder(),
    labelText: 'Enter your username',
  ),
),
```

## Interactive example

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter text input hands-on example in DartPad" run="true"
// DartPad doesn't support `material_ui` yet,
// so this example imports Material from the Flutter SDK.
// To run locally, depend on `material_ui` and use this import instead:
// import 'package:material_ui/material_ui.dart';
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Form Styling Demo';
    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(appTitle)),
        body: const MyCustomForm(),
      ),
    );
  }
}

class MyCustomForm extends StatelessWidget {
  const MyCustomForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 16),
          child: TextField(
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              hintText: 'Enter a search term',
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
          child: TextFormField(
            decoration: const InputDecoration(
              border: UnderlineInputBorder(),
              labelText: 'Enter your username',
            ),
          ),
        ),
      ],
    );
  }
}
```

To learn more about input validation,
consult the [Build a form with validation][] recipe.

查看章节 [构建一个有验证判断的表单][Build a form with validation]
获取更多关于输入验证的内容。

[Build a form with validation]: /cookbook/forms/validation
[`decoration`]: {{site.material_ui}}/TextField/decoration.html
[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`FormField`]: {{site.api}}/flutter/widgets/FormField-class.html
[Handle changes to a text field]: /cookbook/forms/text-field-changes
[`InputDecoration`]: {{site.material_ui}}/InputDecoration-class.html
[`TextField`]: {{site.material_ui}}/TextField-class.html
[`TextFormField`]: {{site.material_ui}}/TextFormField-class.html
