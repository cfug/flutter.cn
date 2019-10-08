---
title: Create and style a text field
title: 文本框的创建和设定
prev:
  title: Build a form with validation
  title: 构建一个有验证判断的表单
  path: /docs/cookbook/forms/validation
next:
  title: Handle changes to a text field
  title: 响应文本框内容的更改
  path: /docs/cookbook/forms/text-field-changes
---

Text fields allow users to type text into an app.
They are used to build forms,
send messages, create search experiences, and more.
In this recipe, explore how to create and style text fields.

文本框作为一个接收用户输入的组件，被广泛应用于表单构建、即时通讯、搜索等场景中。

Flutter provides two text fields:
[`TextField`]({{site.api}}/flutter/material/TextField-class.html)
and [`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html).

Flutter 提供了两个开箱即用的文本框组件：[`TextField`]({{site.api}}/flutter/material/TextField-class.html) 和 [`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html)。

## `TextField`

## `文本框`

[`TextField`]({{site.api}}/flutter/material/TextField-class.html)
is the most commonly used text input widget.

[`TextField`]({{site.api}}/flutter/material/TextField-class.html) 是最常用的文本输入组件。

By default, a `TextField` is decorated with an underline.
You can add a label, icon, inline hint text, and error text by supplying an
[`InputDecoration`]({{site.api}}/flutter/material/InputDecoration-class.html)
as the [`decoration`]({{site.api}}/flutter/material/TextField/decoration.html)
property of the `TextField`. To remove the decoration entirely (including the
underline and the space reserved for the label), set the `decoration` to null.

`TextField` 组件的默认样式是带有下划线的装饰样式。如果需要自定义装饰样式（添加标签、图标、提示文本和错误文本），可以将 [`InputDecoration`]({{site.api}}/flutter/material/InputDecoration-class.html) 应用到 `TextField` 的 [`decoration`]({{site.api}}/flutter/material/TextField/decoration.html) 属性上。如果需要完全移除下划线和标签预留空间，可以将 `decoration` 属性设置为 null。

<!-- skip -->
```dart
TextField(
  decoration: InputDecoration(
    border: InputBorder.none,
    hintText: 'Enter a search term'
  ),
);
```

To retrieve the value when it changes, see the [Handle changes to a text
field](/docs/cookbook/forms/text-field-changes/) recipe.

要在内容发生变化时收到此内容，请参见 [响应文本框内容的更改](/docs/cookbook/forms/text-field-changes/)。

## `TextFormField`

## `表单文本框`

[`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html)
wraps a `TextField` and integrates it with the enclosing
[`Form`]({{site.api}}/flutter/widgets/Form-class.html). This provides
additional functionality, such as validation and integration with other
[`FormField`]({{site.api}}/flutter/widgets/FormField-class.html)
widgets.

[`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html) 内部封装了一个 `TextField` 并被集成在表单组件 [`Form`]({{site.api}}/flutter/widgets/Form-class.html) 中。如果需要对文本输入进行验证或者需要与其他表单组件 [`FormField`]({{site.api}}/flutter/widgets/FormField-class.html) 交互联动，可以考虑使用 `TextFormField`。

<!-- skip -->
```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Enter your username'
  ),
);
```

For more information on input validation, see the
[Building a form with validation](/docs/cookbook/forms/validation/) recipe.

查看章节 [构建一个有验证判断的表单](/docs/cookbook/forms/validation/) 获取更多关于输入验证的内容。
