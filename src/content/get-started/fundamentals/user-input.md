---
title: Handling user input
title: 处理用户输入
description: Learn how to handle user input in Flutter.
description: 学习如何在 Flutter 中处理用户输入。
prev:
  title: State management
  title: 状态管理
  path: /get-started/fundamentals/state-management
next:
  title: Networking and data
  title: 网络和数据
  path: /get-started/fundamentals/networking
---

Now that you know how to manage state in your
Flutter app, how can you let users interact
with your app and change its state?

现在你已经知道如何在 Flutter 应用中管理状态了，
那么如何让用户与你的应用进行交互并改变其状态呢？

## Introduction to handling user input

## 处理用户输入简介

As a multi-platform UI framework,
there are many different ways for users
to interact with a Flutter app.
The resources in this section introduce
you to some of the common widgets used
for enabling user interaction within your app.

作为一个多平台 UI 框架，
用户可以通过多种不同的方式与 Flutter 应用进行交互。
本节中的资源将向你介绍一些常用的组件，
这些组件用于在应用中启用用户交互。

Some user input mechanisms, like [scrolling][],
have already been covered in [Layouts][].

一些用户输入机制，比如 [滚动][scrolling]，
已经在 [布局][Layouts] 中介绍过了。

:::secondary About design system support
Flutter ships with prebuilt components for two design systems as part of the SDK,
[Material][] and [Cupertino][].
For educational purposes, this page focuses on Material widgets, components that
are stylized according to the [Material 3 design language][] specifications.

关于设计系统的支持
Flutter 在 SDK 中预置了两个设计系统的组件，
[Material][] 和 [Cupertino][]。
出于教学目的，本页面重点介绍 Material 组件，
这些组件按照 [Material 3 设计语言][Material 3 design language] 规范进行样式设计。

The Flutter community on [pub.dev][], the package repository for Dart and Flutter,
create and support additional design languages such as [Fluent UI][], [macOS UI][],
and more. If the existing design system components don't quite fit what you need,
Flutter lets you build your own custom widgets,
which is covered at the end of this section.
No matter which design system you choose, the principals on this page apply.

在 [pub.dev][] 上的 Flutter 社区（Dart 和 Flutter 的 package 仓库），
创建并支持其他设计语言，如 [Fluent UI][]、[macOS UI][] 等。
如果现有的设计系统组件不太符合你的需求，
Flutter 允许你构建自己的自定义组件，
这将在本节末尾介绍。
无论你选择哪个设计系统，本页面的原则都适用。
:::

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **Reference**:
> The [widget catalog][] has an inventory of commonly used widgets in the [Material][] and [Cupertino][] libraries.

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **参考**：
> [组件目录][widget catalog] 列出了 [Material][] 和 [Cupertino][] 库中常用的组件清单。

Next, we'll cover a few of the Material widgets that support common
use cases for handling user input in your Flutter app.

接下来，我们将介绍一些 Material 组件，
它们支持 Flutter 应用中处理用户输入的常见用例。

[scrolling]: /get-started/fundamentals/layout#scrolling-widgets
[pub.dev]: {{site.pub}}
[Layouts]: /get-started/fundamentals/layout
[Material]: /ui/widgets/material
[Material 3 design language]: https://m3.material.io/
[Cupertino]: /ui/widgets/cupertino
[widget catalog]: /ui/widgets#design-systems
[Fluent UI]: {{site.pub}}/packages/fluent_ui
[macOS UI]: {{site.pub}}/packages/macos_ui

## Buttons

## 按钮

![A collection of Material 3 Buttons.](/assets/images/docs/fwe/user-input/material-buttons.png)

Buttons allow a user to initiate an action in the UI by clicking or tapping.
The Material library provides a variety of button types that are functionally similar,
but styled differently for various use cases, including:

按钮允许用户通过点击或轻触在 UI 中启动一个操作。
Material 库提供了多种按钮类型，它们在功能上相似，
但针对不同的用例采用了不同的样式，包括：

- `ElevatedButton`: A button with some depth. Use elevated buttons to add
  dimension to otherwise mostly flat layouts.

  `ElevatedButton`：带有一定深度的按钮。使用凸起按钮为原本扁平的布局增加层次感。

- `FilledButton`: A filled button that should be used for
  important, final actions that complete a flow,
  like **Save**, **Join now**, or **Confirm**.

  `FilledButton`：填充按钮，应用于重要的、完成流程的最终操作，
  例如 **保存**、**立即加入** 或 **确认**。

- `Tonal Button`: A middle ground button between
  `FilledButton` and `OutlinedButton`.
  They're useful in contexts where a lower-priority button requires more
  emphasis than an outline, like **Next**.

  `Tonal Button`：介于 `FilledButton` 和 `OutlinedButton` 之间的按钮。
  它们在需要比轮廓按钮更突出但优先级较低的上下文中很有用，例如 **下一步**。

- `OutlinedButton`: A button with text and a visible border.
  These buttons contain actions that are important,
  but aren't the primary action in an app.

  `OutlinedButton`：带有文本和可见边框的按钮。
  这些按钮包含重要的操作，
  但不是应用中的主要操作。

- `TextButton`: Clickable text, without a border.
  Since text buttons don't have visible borders,
  they must rely on their position
  relative to other content for context.

  `TextButton`：可点击的文本，没有边框。
  由于文本按钮没有可见的边框，
  它们必须依靠相对于其他内容的位置来提供上下文。

- `IconButton`: A button with an icon.

  `IconButton`：带有图标的按钮。

- `FloatingActionButton`: An icon button that hovers over
  content to promote a primary action.

  `FloatingActionButton`：悬浮在内容上方的图标按钮，用于推广主要操作。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [FloatingActionButton (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [FloatingActionButton (每周 Widget)][FloatingActionButton (Widget of the Week)]

There are usually 3 main aspects to constructing a button:
style, callback, and its child,
as seen in the following `ElevatedButton` sample code:

构建按钮通常有 3 个主要方面：
样式、回调函数和子组件，
如下面的 `ElevatedButton` 示例代码所示：


{% comment %}
TODO(khanhnwin):
 WidgetStateProperty and styling in the design section of
FWE. Of course, a button's appearance can be dependent on its state.
You can style a button based on its state using `WidgetStateProperty`.
{% endcomment %}

- A button's callback function, `onPressed`,
  determines what happens when the button is clicked,
  therefore, this function is where you update your app state.
  If the callback is  `null`, the button is disabled and
  nothing happens when a user presses the button.

  按钮的回调函数 `onPressed`，
  决定了当按钮被点击时会发生什么，
  因此，这个函数是你更新应用状态的地方。
  如果回调函数为 `null`，按钮将被禁用，
  用户按下按钮时不会发生任何事情。

- The button's `child`, which is displayed within the button's content area,
  is usually text or an icon that indicates the button's purpose.

  按钮的 `child`，显示在按钮的内容区域内，
  通常是指示按钮用途的文本或图标。

- Finally, a button's `style` controls its appearance: color, border, and so on.

  最后，按钮的 `style` 控制其外观：颜色、边框等。


{% render "docs/code-and-image.md",
image:"fwe/user-input/ElevatedButton.webp",
caption: "This figure shows an ElevatedButton with the text \"Enabled\" being clicked."
alt: "A GIF of an elevated button with the text 'Enabled'"
code:"
```dart
int count = 0;

@override
Widget build(BuildContext context) {
  return ElevatedButton(
    style: ElevatedButton.styleFrom(
      textStyle: const TextStyle(fontSize: 20),
    ),
    onPressed: () {
      setState(() {
        count += 1;
      });
    },
    child: const Text('Enabled'),
  );
}
```
" %}


<br>

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this tutorial that teaches you how to build a
> "favorite" button: [Add interactivity to your Flutter app][]

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **检查点**：
> 完成这个教程，学习如何构建一个「收藏」按钮：[为 Flutter 应用添加交互][Add interactivity to your Flutter app]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs**: [`ElevatedButton`][] • [`FilledButton`][] • [`OutlinedButton`][] • [`TextButton`][] • [`IconButton`][] • [`FloatingActionButton`][]

[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`FilledButton`]: {{site.api}}/flutter/material/FilledButton-class.html
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[FloatingActionButton (Widget of the Week)]: {{site.youtube-site}}/watch/2uaoEDOgk_I?si=MQZcSp24oRaS_kiY
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[Add interactivity to your Flutter app]: /ui/interactivity

## Text

## 文本

Several widgets support text input.

有几个组件支持文本输入。

### `SelectableText`

`SelectableText` 可选择文本

Flutter's `Text` widget displays text on the screen,
but doesn't allow users to highlight or copy the text.
`SelectableText` displays a string of _user-selectable_ text.

Flutter 的 `Text` 组件在屏幕上显示文本，
但不允许用户高亮或复制文本。
`SelectableText` 显示一串 _用户可选择_ 的文本。

{% render "docs/code-and-image.md",
image:"fwe/user-input/SelectableText.webp",
caption: "This figure shows a cursor highlighting a portion of a string of text."
alt: 'A GIF of a cursor highlighting two lines of text from a paragraph.'
code:"
```dart
@override
Widget build(BuildContext context) {
  return const SelectableText('''
Two households, both alike in dignity,
In fair Verona, where we lay our scene,
From ancient grudge break to new mutiny,
Where civil blood makes civil hands unclean.
From forth the fatal loins of these two foes''');
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [SelectableText (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [SelectableText (每周 Widget)][SelectableText (Widget of the Week)]

[SelectableText (Widget of the Week)]: {{site.youtube-site}}/watch?v=ZSU3ZXOs6hc

### `RichText`

`RichText` 富文本

`RichText` lets you display strings of rich text in your app.
`TextSpan`, similar to `RichText`, allows you to display parts of text with
different text styles. It's not for handling user input,
but is useful if you're allowing users edit and format text.

`RichText` 让你在应用中显示富文本字符串。
`TextSpan` 与 `RichText` 类似，允许你用不同的文本样式显示文本的各个部分。
它不是用来处理用户输入的，
但如果你允许用户编辑和格式化文本，它会很有用。

{% render "docs/code-and-image.md",
image:"fwe/user-input/RichText.png",
caption: "This figure shows a string of text formatted with different text styles."
alt: 'A screenshot of the text "Hello bold world!" with the word "bold" in bold font.'
code:"
```dart
@override
Widget build(BuildContext context) {
  return RichText(
    text: TextSpan(
      text: 'Hello ',
      style: DefaultTextStyle.of(context).style,
      children: const <TextSpan>[
        TextSpan(text: 'bold', style: TextStyle(fontWeight: FontWeight.bold)),
        TextSpan(text: ' world!'),
      ],
    ),
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [Rich Text (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Rich Text (每周 Widget)][Rich Text (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **Code**:
> [Rich Text Editor code][]

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **代码**：
> [富文本编辑器代码][Rich Text Editor code]

[Rich Text (Widget of the Week)]: {{site.youtube-site}}/watch?v=rykDVh-QFfw
[Rich Text Editor code]: {{site.github}}/flutter/samples/tree/main/simplistic_editor

### `TextField`

`TextField` 文本输入框

A `TextField` lets users enter text in text box using a hardware or
onscreen keyboard.

`TextField` 允许用户使用硬件键盘或屏幕键盘在文本框中输入文本。

`TextField`s have many different properties and configurations.
A few of the highlights:

`TextField` 有许多不同的属性和配置。
以下是一些重点：

- `InputDecoration` determines the text field's appearance,
  such as color and border.

  `InputDecoration` 决定文本框的外观，例如颜色和边框。

- `controller`: A `TextEditingController` controls the text being edited.
  Why might you need a controller?
  By default, your app's users can type
  into the text field, but if you want to programmatically control the `TextField`
  and clear its value, for example, you'll need a `TextEditingController`.

  `controller`：`TextEditingController` 控制正在编辑的文本。
  为什么需要控制器？
  默认情况下，你的应用用户可以在文本框中输入，
  但如果你想以编程方式控制 `TextField`，
  例如清除其值，你就需要一个 `TextEditingController`。

- `onChanged`: This callback function triggers when the user changes
  the text field's value, such as when inserting or removing text.

  `onChanged`：当用户更改文本框的值时（例如插入或删除文本时），
  会触发此回调函数。

- `onSubmitted`: This callback is triggered when the user indicates that
  they are done editing the text in the field;
  for example, by tapping the "enter" key when the text field is in focus.

  `onSubmitted`：当用户表示完成对文本框中文本的编辑时，
  会触发此回调函数；
  例如，在文本框获得焦点时轻触「回车」键。

The class supports other configurable properties, such as
`obscureText` that turns each letter into a `readOnly` circle as its entered and
`readOnly` which prevents the user from changing the text.

该类支持其他可配置的属性，例如
`obscureText`（在输入时将每个字母转换为圆圈）和
`readOnly`（防止用户更改文本）。

{% render "docs/code-and-image.md",
image:"fwe/user-input/TextField.webp",
caption: "This figure shows text being typed into a TextField with a selected border and label."
alt: "A GIF of a text field with the label 'Mascot Name', purple focus border and the phrase 'Dash the hummingbird' being typed in."
code:"
```dart
final TextEditingController _controller = TextEditingController();

@override
Widget build(BuildContext context) {
  return TextField(
    controller: _controller,
    decoration: const InputDecoration(
      border: OutlineInputBorder(),
      labelText: 'Mascot Name',
    ),
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this 4-part cookbook series that walks
> you through how to create a text field,
> retrieve its value, and update your app state:
> 1. [Create and style a text field][]
> 1. [Retrieve the value of a text field][]
> 1. [Handle changes to a text field][]
> 1. [Focus and text fields][].

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **检查点**：
> 完成这个包含 4 个部分的实用教程系列，
> 它将引导你如何创建文本框、获取其值以及更新应用状态：
> 1. [创建和设置文本框样式][Create and style a text field]
> 1. [获取文本框的值][Retrieve the value of a text field]
> 1. [处理文本框的更改][Handle changes to a text field]
> 1. [焦点和文本框][Focus and text fields]。

[Create and style a text field]: /cookbook/forms/text-input
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[Handle changes to a text field]: /cookbook/forms/text-field-changes
[Focus and text fields]: /cookbook/forms/focus

### Form

### 表单

`Form` is an optional container for grouping together multiple
form field widgets, such as `TextField`.

`Form` 是一个可选的容器，用于将多个表单字段组件（如 `TextField`）组合在一起。

Each individual form field should be wrapped in a `FormField`
widget with the `Form` widget as a common ancestor.
Convenience widgets exist that pre-wrap form field widgets in a
`FormField` for you.
For example, the `Form` widget version of `TextField` is `TextFormField`.

每个单独的表单字段都应该包装在 `FormField` 组件中，
并以 `Form` 组件作为共同的祖先。
存在一些便捷组件，可以为你预先将表单字段组件包装在 `FormField` 中。
例如，`TextField` 的 `Form` 组件版本是 `TextFormField`。

Using a `Form` provides access to a `FormState`,
which lets you save, reset, and validate each `FormField`
that descends from this `Form`.
You can also provide a `GlobalKey` to identify a specific form,
as shown in the following code:

使用 `Form` 可以访问 `FormState`，
它允许你保存、重置和验证从此 `Form` 派生的每个 `FormField`。
你还可以提供一个 `GlobalKey` 来识别特定的表单，
如下面的代码所示：

```dart
final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

@override
Widget build(BuildContext context) {
  return Form(
    key: _formKey,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        TextFormField(
          decoration: const InputDecoration(
            hintText: 'Enter your email',
          ),
          validator: (String? value) {
            if (value == null || value.isEmpty) {
              return 'Please enter some text';
            }
            return null;
          },
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: ElevatedButton(
            onPressed: () {
              // Validate returns true if the form is valid, or false otherwise.
              if (_formKey.currentState!.validate()) {
                // Process data.
              }
            },
            child: const Text('Submit'),
          ),
        ),
      ],
    ),
  );
}
```

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this tutorial to learn how to [build a form with validation][].

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **检查点**：
> 完成此教程以学习如何 [构建带验证的表单][Build a form with validation]。

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **Demo**:
> [Form app][]

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **演示**：
> [表单应用][Form app]

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **Code**:
> [Form app code][]

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **代码**：
> [表单应用代码][Form app code]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs**: [`TextField`][] • [`RichText`][] • [`SelectableText`][] • [`Form`][]

[Build a form with validation]: /cookbook/forms/validation
[Form app]: https://github.com/flutter/samples/tree/main/form_app/
[Form app code]: {{site.github}}/flutter/samples/tree/main/form_app
[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`RichText`]: {{site.api}}/flutter/widgets/RichText-class.html
[`SelectableText`]: {{site.api}}/flutter/material/SelectableText-class.html

## Select a value from a group of options

## 从一组选项中选择一个值

Provide a way to users to select from several options.

为用户提供从多个选项中进行选择的方法。

### SegmentedButton

### 分段按钮

`SegmentedButton` allows users to select from a
minimal group of 2-5 items.

`SegmentedButton` 允许用户从 2 到 5 个项目的最小组中进行选择。

The data type, `<T>`, can be a built-in type such as
`int`, `String`, `bool` or an enum.
A `SegmentedButton` has a few relevant properties:

数据类型 `<T>` 可以是内置类型，如 `int`、`String`、`bool` 或枚举。
`SegmentedButton` 有几个相关的属性：

- `segments`, a list of `ButtonSegment`s, where each represents a "segment"
   or option that the user can select.
   Visually, each `ButtonSegment` can have an icon, text label, or both.

   `segments`，一个 `ButtonSegment` 列表，
   其中每个代表用户可以选择的「段」或选项。
   在视觉上，每个 `ButtonSegment` 可以有图标、文本标签或两者都有。

- `multiSelectionEnabled` indicates whether the user is allowed
   to select multiple options. This property defaults to false.

   `multiSelectionEnabled` 指示是否允许用户选择多个选项。
   此属性默认为 false。

- `selected` identifies the currently selected value(s).
   **Note:** `selected` is of type of `Set<T>`, so if you're only
   allowing users to select one value, that value must be
  provided as a`Set` with a single element.

  `selected` 标识当前选定的值。
  **注意**：`selected` 的类型为 `Set<T>`，
  因此如果你只允许用户选择一个值，
  则该值必须作为包含单个元素的 `Set` 提供。

- The `onSelectionChanged` callback triggers when a user selects any segments.
  It provides a list of the selected segments so you can update your app state.

  当用户选择任何段时，会触发 `onSelectionChanged` 回调。
  它提供所选段的列表，以便你可以更新应用状态。

- Additional styling parameters allow you to modify the button's appearance.
  For example, `style` takes a `ButtonStyle`,
  providing a way to configure a `selectedIcon`.

  其他样式参数允许你修改按钮的外观。
  例如，`style` 接受 `ButtonStyle`，
  提供配置 `selectedIcon` 的方法。

{% render "docs/code-and-image.md",
image:"fwe/user-input/segmented-button.webp",
caption: "This figure shows a SegmentedButton, each segment with an icon and
text representing its value."
alt: "A GIF of a SegmentedButton with 4 segments: Day, Week, Month, and Year.
Each has a calendar icon to represent its value and a text label.
Day is first selected, then week and month, then year."
code:"

```dart
enum Calendar { day, week, month, year }

// StatefulWidget...
Calendar calendarView = Calendar.day;

@override
Widget build(BuildContext context) {
  return SegmentedButton<Calendar>(
    segments: const <ButtonSegment<Calendar>>[
      ButtonSegment<Calendar>(
          value: Calendar.day,
          label: Text('Day'),
          icon: Icon(Icons.calendar_view_day)),
      ButtonSegment<Calendar>(
          value: Calendar.week,
          label: Text('Week'),
          icon: Icon(Icons.calendar_view_week)),
      ButtonSegment<Calendar>(
          value: Calendar.month,
          label: Text('Month'),
          icon: Icon(Icons.calendar_view_month)),
      ButtonSegment<Calendar>(
          value: Calendar.year,
          label: Text('Year'),
          icon: Icon(Icons.calendar_today)),
    ],
    selected: <Calendar>{calendarView},
    onSelectionChanged: (Set<Calendar> newSelection) {
      setState(() {
        // By default, there is only a single segment that can be
        // selected at a time, so its value is always the first
        calendarView = newSelection.first;
      });
    },
  );
}
```
" %}


### Chip

### 纸片

`Chip` is a compact way of representing an
attribute, text, entity, or action for a specific context.
Specialized `Chip` widgets exist for specific use cases:

`Chip` 是一种紧凑的方式，用于在特定上下文中表示属性、文本、实体或操作。
针对特定用例存在专门的 `Chip` 组件：

- [InputChip][] represents a complex piece of information,
  such as an entity (person, place, or thing), or
  conversational text, in a compact form.

  [InputChip][] 以紧凑的形式表示复杂的信息，
  例如实体（人、地点或事物）或对话文本。

- [ChoiceChip][] allows a single selection from a set of options.
  Choice chips contain related descriptive text or categories.

  [ChoiceChip][] 允许从一组选项中进行单选。
  选择纸片包含相关的描述性文本或类别。

- [FilterChip][] uses tags or descriptive words to filter content.

  [FilterChip][] 使用标签或描述性词语来过滤内容。

- [ActionChip][] represents an action related to primary content.

  [ActionChip][] 表示与主要内容相关的操作。

Every `Chip` widget requires a `label`.
It can optionally have an `avatar` (such as an icon or a user's profile picture)
and an `onDeleted` callback, which shows a delete icon that
when triggered, deletes the chip.
A `Chip` widget's appearance can also be customized by setting a
number of optional parameters such as `shape`, `color`, and `iconTheme`.

每个 `Chip` 组件都需要一个 `label`。
它可以选择性地包含一个 `avatar`（例如图标或用户的个人资料图片）
和一个 `onDeleted` 回调，该回调显示一个删除图标，
触发时会删除纸片。
`Chip` 组件的外观也可以通过设置一些可选参数（如 `shape`、`color` 和 `iconTheme`）进行自定义。

You will typically use `Wrap`, a widget that displays its children in
multiple horizontal or vertical runs, to make sure your chips wrap and
don't get cut off at the edge of your app.

你通常会使用 `Wrap`，
这是一个在多个水平或垂直行中显示其子组件的组件，
以确保你的纸片换行且不会在应用边缘被截断。

{% render "docs/code-and-image.md",
image:"fwe/user-input/chip.png",
caption: "This figure shows two rows of Chip widgets, each containing a circular
leading profile image and content text."
alt: "A screenshot of 4 Chips split over two rows with a leading circular
profile image with content text."
code:"
```dart
@override
Widget build(BuildContext context) {
  return const SizedBox(
    width: 500,
    child: Wrap(
      alignment: WrapAlignment.center,
      spacing: 8,
      runSpacing: 4,
      children: [
        Chip(
          avatar: CircleAvatar(
              backgroundImage: AssetImage('assets/images/dash_chef.png')),
          label: Text('Chef Dash'),
        ),
        Chip(
          avatar: CircleAvatar(
              backgroundImage:
                  AssetImage('assets/images/dash_firefighter.png')),
          label: Text('Firefighter Dash'),
        ),
        Chip(
          avatar: CircleAvatar(
              backgroundImage: AssetImage('assets/images/dash_musician.png')),
          label: Text('Musician Dash'),
        ),
        Chip(
          avatar: CircleAvatar(
              backgroundImage: AssetImage('assets/images/dash_artist.png')),
          label: Text('Artist Dash'),
        ),
      ],
    ),
  );
}
```
" %}

[InputChip]: {{site.api}}/flutter/material/InputChip-class.html
[ChoiceChip]: {{site.api}}/flutter/material/ChoiceChip-class.html
[FilterChip]: {{site.api}}/flutter/material/FilterChip-class.html
[ActionChip]: {{site.api}}/flutter/material/ActionChip-class.html


### `DropdownMenu`

`DropdownMenu` 下拉菜单

A `DropdownMenu` allows users to select a choice from a menu
of options and places the selected text into a `TextField`.
It also allows users to filter the menu items based on the text input.

`DropdownMenu` 允许用户从选项菜单中选择一个选项，
并将所选文本放入 `TextField` 中。
它还允许用户根据文本输入过滤菜单项。

Configuration parameters include the following:

配置参数包括以下内容：

- `dropdownMenuEntries` provides a list of `DropdownMenuEntry`s that
  describes each menu item.
  The menu might contain information such as a text label, and
  a leading or trailing icon.
  (This is also the only required parameter.)

  `dropdownMenuEntries` 提供一个 `DropdownMenuEntry` 列表，
  描述每个菜单项。
  菜单可能包含文本标签以及前导或尾随图标等信息。
  （这也是唯一必需的参数。）

- `TextEditingController` allows programmatically controlling the `TextField`.

  `TextEditingController` 允许以编程方式控制 `TextField`。

- The `onSelected` callback triggers when the user selects an option.

  当用户选择选项时，会触发 `onSelected` 回调。

- `initialSelection` allows you to configure the default value.

  `initialSelection` 允许你配置默认值。

- Additional parameters are also available for
  customizing the widget's look and behavior.

  还提供了其他参数用于自定义组件的外观和行为。

{% render "docs/code-and-image.md",
image:"fwe/user-input/dropdownmenu.webp",
caption: "This figure shows a DropdownMenu widget with 5 value options. Each
option's text color is styled to represent the color value."
alt: "A GIF the DropdownMenu widget that is selected, it displays 5 options:
Blue, Pink, Green, Orange, and Grey. The option text is displayed in the color
of its value."
code:"
```dart
enum ColorLabel {
  blue('Blue', Colors.blue),
  pink('Pink', Colors.pink),
  green('Green', Colors.green),
  orange('Orange', Colors.orange),
  grey('Grey', Colors.grey);

  const ColorLabel(this.label, this.color);
  final String label;
  final Color color;
}

// StatefulWidget...
@override
Widget build(BuildContext context) {
  return DropdownMenu<ColorLabel>(
    initialSelection: ColorLabel.green,
    controller: colorController,
    // requestFocusOnTap is enabled/disabled by platforms when it is null.
    // On mobile platforms, this is false by default. Setting this to true will
    // trigger focus request on the text field and virtual keyboard will appear
    // afterward. On desktop platforms however, this defaults to true.
    requestFocusOnTap: true,
    label: const Text('Color'),
    onSelected: (ColorLabel? color) {
      setState(() {
        selectedColor = color;
      });
    },
    dropdownMenuEntries: ColorLabel.values
      .map<DropdownMenuEntry<ColorLabel>>(
          (ColorLabel color) {
            return DropdownMenuEntry<ColorLabel>(
              value: color,
              label: color.label,
              enabled: color.label != 'Grey',
              style: MenuItemButton.styleFrom(
                foregroundColor: color.color,
              ),
            );
      }).toList(),
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [DropdownMenu (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [DropdownMenu (每周 Widget)][DropdownMenu (Widget of the Week)]

[DropdownMenu (Widget of the Week)]: {{site.youtube-site}}/watch?v=giV9AbM2gd8?si=E23hjg72cjMTe_mz

### Slider

### 滑块

The `Slider` widget lets a user adjust a value by moving an indicator,
such as a volume bar.

`Slider` 组件允许用户通过移动指示器（例如音量条）来调整值。

Configuration parameters for the `Slider` widget:

`Slider` 组件的配置参数：

- `value` represents the slider's current value

  `value` 表示滑块的当前值

- `onChanged` is the callback that gets triggered when the handle is moved

  `onChanged` 是移动滑柄时触发的回调

- `min` and `max` establish minimum and maximum values allowed by the slider

  `min` 和 `max` 建立滑块允许的最小值和最大值

- `divisions` establishes a discrete interval with which the user can move the
  handle along the track.

  `divisions` 建立一个离散的间隔，用户可以沿着轨道移动滑柄。


{% render "docs/code-and-image.md",
image:"fwe/user-input/slider.webp",
caption: "This figure shows a slider widget with a value ranging from 0.0 to 5.0
broken up into 5 divisions. It shows the current value as a label as the dial
is dragged."
alt: "A GIF of a slider that has the dial dragged left to right in increments
of 1, from 0.0 to 5.0"
code:"
```dart
double _currentVolume = 1;

@override
Widget build(BuildContext context) {
  return Slider(
    value: _currentVolume,
    max: 5,
    divisions: 5,
    label: _currentVolume.toString(),
    onChanged: (double value) {
      setState(() {
        _currentVolume = value;
      });
    },
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [Slider, RangeSlider, CupertinoSlider (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Slider、RangeSlider、CupertinoSlider (每周 Widget)][Slider, RangeSlider, CupertinoSlider (Widget of the Week)]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs:** [`SegmentedButton`][] • [`DropdownMenu`][] • [`Slider`][] • [`Chip`][]

[Slider, RangeSlider, CupertinoSlider (Widget of the Week)]: {{site.youtube-site}}/watch?v=ufb4gIPDmEss
[`SegmentedButton`]: {{site.api}}/flutter/material/SegmentedButton-class.html
[`DropdownMenu`]: {{site.api}}/flutter/material/DropdownMenu-class.html
[`Slider`]: {{site.api}}/flutter/material/Slider-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html

## Toggle between values

## 在值之间切换

There are several ways that your UI can allow toggling between values.

有几种方法可以让你的 UI 允许在值之间切换。

### Checkbox, Switch, and Radio

### 复选框、开关和单选按钮

Provide an option to toggle a single value on and off.
The functional logic behind these widgets are the same,
as all 3 are built on top of `ToggleableStateMixin`, though
each provides slight presentation differences.:

提供一个选项来打开和关闭单个值。
这些组件背后的功能逻辑是相同的，
因为所有 3 个组件都构建在 `ToggleableStateMixin` 之上，
尽管每个组件在呈现上略有不同：

- `Checkbox` is a container that is empty when false or
  filled with a checkmark when true.

  `Checkbox` 是一个容器，当为 false 时为空，
  当为 true 时填充复选标记。

- `Switch` has a handle that is on the left when false and
  slides to the right when true.

  `Switch` 有一个手柄，当为 false 时在左侧，
  当为 true 时滑动到右侧。

- `Radio` is similar to a `Checkbox` in that it's a container that is
  empty when false, but filled in when true.

  `Radio` 与 `Checkbox` 类似，
  它是一个容器，当为 false 时为空，
  但当为 true 时被填充。

The configuration for `Checkbox` and `Switch` contain:

`Checkbox` 和 `Switch` 的配置包含：

- a `value` that is `true` or `false`

  一个 `true` 或 `false` 的 `value`

- and an `onChanged` callback which is triggered when
  the user toggles the widget

  以及一个 `onChanged` 回调，当用户切换组件时触发

### Checkbox

### 复选框

{% render "docs/code-and-image.md",
image:"fwe/user-input/checkbox.webp",
caption: "This figure shows a checkbox being checked and unchecked."
alt: "A GIF that shows a pointer clicking a checkbox
and then clicking again to uncheck it."
code:"
```dart
bool isChecked = false;

@override
Widget build(BuildContext context) {
  return Checkbox(
    checkColor: Colors.white,
    value: isChecked,
    onChanged: (bool? value) {
      setState(() {
        isChecked = value!;
      });
    },
  );
}
```
" %}

### Switch

### 开关

{% render "docs/code-and-image.md",
image:"fwe/user-input/Switch.webp",
caption: "This figure shows a Switch widget that is toggled on and off."
alt: "A GIF of a Switch widget that is toggled on and off. In its off state,
it is gray with dark gray borders. In its on state,
it is red with a light red border."
code:"
```dart
bool light = true;

@override
Widget build(BuildContext context) {
  return Switch(
    // This bool value toggles the switch.
    value: light,
    activeThumbColor: Colors.red,
    onChanged: (bool value) {
      // This is called when the user toggles the switch.
      setState(() {
        light = value;
      });
    },
  );
}
```
" %}

### Radio

### 单选按钮

A `RadioGroup` contains `Radio` buttons that allow the user to
select between mutually exclusive values.
When the user selects a radio button in a group,
the other radio buttons are unselected.

`RadioGroup` 包含 `Radio` 按钮，
允许用户在互斥的值之间进行选择。
当用户在组中选择一个单选按钮时，
其他单选按钮将被取消选择。

- A particular `Radio` button's `value` represent that button's value.

  特定 `Radio` 按钮的 `value` 表示该按钮的值。

- The selected value for a `RadioGroup` is identified by
  the `groupValue` parameter.

  `RadioGroup` 的选定值由 `groupValue` 参数标识。

- `RadioGroup` has an `onChanged` callback that
  gets triggered when users click it, like `Switch` and `Checkbox`.

  `RadioGroup` 有一个 `onChanged` 回调，
  当用户点击它时触发，类似于 `Switch` 和 `Checkbox`。

{% render "docs/code-and-image.md",
image:"fwe/user-input/Radio.webp",
caption: "This figure shows a column of ListTiles containing a radio button and
label, where only one radio button can be selected at a time."
alt: "A GIF of 4 ListTiles in a column, each containing a leading Radio button
and title text. The Radio buttons are selected in order from top to bottom."
code:"
```dart
enum Character { musician, chef, firefighter, artist }

class RadioExample extends StatefulWidget {
  const RadioExample({super.key});

  @override
  State<RadioExample> createState() => _RadioExampleState();
}

class _RadioExampleState extends State<RadioExample> {
  Character? _character = Character.musician;

  void setCharacter(Character? value) {
    setState(() {
      _character = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return RadioGroup(
      groupValue: _character,
      onChanged: setCharacter,
      child: Column(
        children: <Widget>[
          ListTile(
            title: const Text('Musician'),
            leading: Radio<Character>(value: Character.musician),
          ),
          ListTile(
            title: const Text('Chef'),
            leading: Radio<Character>(value: Character.chef),
          ),
          ListTile(
            title: const Text('Firefighter'),
            leading: Radio<Character>(value: Character.firefighter),
          ),
          ListTile(
            title: const Text('Artist'),
            leading: Radio<Character>(value: Character.artist),
          ),
        ],
      ),
    );
  }
}
```
" %}

#### Bonus: CheckboxListTile & SwitchListTile

#### 额外内容：CheckboxListTile 和 SwitchListTile

These convenience widgets are the same checkbox and switch widgets,
but support a label (as a `ListTile`).

这些便捷组件与复选框和开关组件相同，
但支持标签（作为 `ListTile`）。

{% render "docs/code-and-image.md",
image:"fwe/user-input/SpecialListTiles.webp",
caption: "This figure shows a column containing a CheckboxListTile and
a SwitchListTile being toggled."
alt: "A ListTile with a leading icon, title text, and a trailing checkbox being
checked and unchecked. It also shows a ListTile with a leading icon, title text
and a switch being toggled on and off."
code:"
```dart
double timeDilation = 1.0;
bool _lights = false;

@override
Widget build(BuildContext context) {
  return Column(
    children: [
      CheckboxListTile(
        title: const Text('Animate Slowly'),
        value: timeDilation != 1.0,
        onChanged: (bool? value) {
          setState(() {
            timeDilation = value! ? 10.0 : 1.0;
          });
        },
        secondary: const Icon(Icons.hourglass_empty),
      ),
      SwitchListTile(
        title: const Text('Lights'),
        value: _lights,
        onChanged: (bool value) {
          setState(() {
            _lights = value;
          });
        },
        secondary: const Icon(Icons.lightbulb_outline),
      ),
    ],
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [CheckboxListTile (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [CheckboxListTile (每周 Widget)][CheckboxListTile (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [SwitchListTile (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [SwitchListTile (每周 Widget)][SwitchListTile (Widget of the Week)]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs**:
[`Checkbox`][] • [`CheckboxListTile`][] • [`Switch`][] • [`SwitchListTile`][] •
[`Radio`][]

[CheckboxListTile (Widget of the Week)]: {{site.youtube-site}}/watch?v=RkSqPAn9szs
[SwitchListTile (Widget of the Week)]: {{site.youtube-site}}/watch?v=0igIjvtEWNU

[`Checkbox`]: {{site.api}}/flutter/material/Checkbox-class.html
[`CheckboxListTile`]: {{site.api}}/flutter/material/CheckboxListTile-class.html
[`Switch`]: {{site.api}}/flutter/material/Switch-class.html
[`SwitchListTile`]: {{site.api}}/flutter/material/SwitchListTile-class.html
[`Radio`]: {{site.api}}/flutter/material/Radio-class.html

## Select a date or time

## 选择日期或时间

Widgets are provided so the user can select a date and time.

提供了组件以便用户可以选择日期和时间。

There is a set of dialogs that enable users to select a date or time,
as you'll see in the following sections.
With the exception of differing date types -
`DateTime` for dates vs `TimeOfDay` for time -
these dialogs function similarly, you can configure them by providing:

有一组对话框允许用户选择日期或时间，
正如你将在以下部分中看到的。
除了日期类型不同（日期使用 `DateTime`，时间使用 `TimeOfDay`）之外，
这些对话框的功能类似，你可以通过提供以下内容进行配置：

- a default `initialDate` or `initialTime`

  默认的 `initialDate` 或 `initialTime`

- or an `initialEntryMode` that determines the picker UI that's displayed.

  或一个 `initialEntryMode`，用于确定显示的选择器 UI。

### DatePickerDialog

### 日期选择器对话框

This dialog allows the user to select a date or a range of dates.
Activate by calling the `showDatePicker` function,
which returns a `Future<DateTime>`,
so don't forget to await the asynchronous function call!

此对话框允许用户选择日期或日期范围。
通过调用 `showDatePicker` 函数来激活，
它返回一个 `Future<DateTime>`，
所以不要忘记等待异步函数调用！

{% render "docs/code-and-image.md",
image:"fwe/user-input/DatePicker.webp",
caption: "This figure shows a DatePicker that is displayed when the
'Pick a date' button is clicked."
alt: "A GIF of a pointer clicking a button that says 'Pick a date',
then shows a date picker. The date Friday, August 30 is selected and the 'OK'
button is clicked."
code:"
```dart
DateTime? selectedDate;

@override
Widget build(BuildContext context) {
  var date = selectedDate;

  return Column(children: [
    Text(
      date == null
          ? "You haven't picked a date yet."
          : DateFormat('MM-dd-yyyy').format(date),
    ),
    ElevatedButton.icon(
      icon: const Icon(Icons.calendar_today),
      onPressed: () async {
        var pickedDate = await showDatePicker(
          context: context,
          initialEntryMode: DatePickerEntryMode.calendarOnly,
          initialDate: DateTime.now(),
          firstDate: DateTime(2019),
          lastDate: DateTime(2050),
        );

        setState(() {
          selectedDate = pickedDate;
        });
      },
      label: const Text('Pick a date'),
    )
  ]);
}
```
" %}

### TimePickerDialog

### 时间选择器对话框

`TimePickerDialog` is a dialog that presents a time picker.
It can be activated by calling the `showTimePicker()` function.
Instead of returning a `Future<DateTime>`,
`showTimePicker` instead returns a `Future<TimeOfDay>`.
Once again, don't forget to await the function call!

`TimePickerDialog` 是一个呈现时间选择器的对话框。
可以通过调用 `showTimePicker()` 函数来激活它。
`showTimePicker` 返回 `Future<TimeOfDay>`，
而不是返回 `Future<DateTime>`。
再次提醒，不要忘记等待函数调用！

{% render "docs/code-and-image.md",
image:"fwe/user-input/TimePicker.webp",
caption: "This figure shows a TimePicker that is displayed when the
'Pick a time' button is clicked."
alt: "A GIF of a pointer clicking a button that says 'Pick a time', then shows
 a time picker. The time picker shows a circular clock as the cursor moves the
 hour hand, then minute hand, selects PM, then the 'OK' button is clicked."
code:"
```dart
TimeOfDay? selectedTime;

@override
Widget build(BuildContext context) {
  var time = selectedTime;

  return Column(children: [
    Text(
      time == null ? "You haven't picked a time yet." : time.format(context),
    ),
    ElevatedButton.icon(
      icon: const Icon(Icons.calendar_today),
      onPressed: () async {
        var pickedTime = await showTimePicker(
          context: context,
          initialEntryMode: TimePickerEntryMode.dial,
          initialTime: TimeOfDay.now(),
        );

        setState(() {
          selectedTime = pickedTime;
        });
      },
      label: const Text('Pick a time'),
    )
  ]);
}
```
" %}

:::tip
Calling `showDatePicker()` and `showTimePicker()`
is equivalent to calling `showDialog()` with `DatePickerDialog()` and
`TimePickerDialog()`, respectively.
Internally, both functions use the `showDialog()` function with
their respective `Dialog` widgets.
To enable state restoration, you can also push
`DatePickerDialog()` and `TimePickerDialog()` directly
on to the `Navigator` stack.

调用 `showDatePicker()` 和 `showTimePicker()`
等同于分别使用 `DatePickerDialog()` 和 `TimePickerDialog()` 调用 `showDialog()`。
在内部，这两个函数都使用 `showDialog()` 函数及其各自的 `Dialog` 组件。
要启用状态恢复，你还可以直接将 `DatePickerDialog()` 和 `TimePickerDialog()` 推送到 `Navigator` 栈上。
:::

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs:**
[`showDatePicker`][] • [`showTimePicker`][]

[`showDatePicker`]: {{site.api}}/flutter/material/showDatePicker.html
[`showTimePicker`]: {{site.api}}/flutter/material/showTimePicker.html

## Swipe & slide

## 滑动和滑行

### [`Dismissible`][]

可滑动消除

A `Dismissible` is a widget that enables users to dismiss it by swiping.
It has a number of configuration parameters, including:

`Dismissible` 是一个允许用户通过滑动来消除它的组件。
它有许多配置参数，包括：

- A `child` widget

  一个 `child` 组件

- An `onDismissed` callback that is triggered when the user swipes

  当用户滑动时触发的 `onDismissed` 回调

- Styling parameters such as `background`

  样式参数，例如 `background`

- It's important to include a `key` object as well so that they can be uniquely
  identified from sibling `Dismissible` widgets in the widget tree.

  包含一个 `key` 对象也很重要，
  这样它们就可以在组件树中从同级 `Dismissible` 组件中唯一标识。

{% render "docs/code-and-image.md",
image:"fwe/user-input/Dismissible.webp",
caption: "This figure shows a list of Dismissible widgets that each contain a
ListTile. Swiping across the ListTile reveals a green background and makes the tile
disappear."
alt: "A screenshot of three widgets, spaced evenly from each other."
code:"
```dart
List<int> items = List<int>.generate(100, (int index) => index);

@override
Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    padding: const EdgeInsets.symmetric(vertical: 16),
    itemBuilder: (BuildContext context, int index) {
      return Dismissible(
        background: Container(
          color: Colors.green,
        ),
        key: ValueKey<int>(items[index]),
        onDismissed: (DismissDirection direction) {
          setState(() {
            items.removeAt(index);
          });
        },
        child: ListTile(
          title: Text(
            'Item ${items[index]}',
          ),
        ),
      );
    },
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [Dismissible (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Dismissible (每周 Widget)][Dismissible (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this tutorial on how to [implement swipe to dismiss][] using the
> dismissible widget.

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **检查点**：
> 完成这个关于如何使用可滑动消除组件 [实现滑动消除][Implement swipe to dismiss] 的教程。

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs:**
[`Dismissible`][]

[Dismissible (Widget of the Week)]: {{site.youtube-site}}/watch?v=iEMgjrfuc58?si=f0S7IdaA9PIWIYvl
[Implement swipe to dismiss]: /cookbook/gestures/dismissible
[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html

## Looking for more widgets?

## 寻找更多组件？

This page features just a few of the common Material widgets that
you can use for handling user input in your Flutter app.
Check out the [Material Widget library][] and
[Material Library API docs][] for a full list of widgets.

本页面仅介绍了一些常见的 Material 组件，
你可以使用它们在 Flutter 应用中处理用户输入。
查看 [Material 组件库][Material Widget library] 和
[Material 库 API 文档][Material Library API docs] 以获取完整的组件列表。

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **Demo**:
> See Flutter's [Material 3 Demo][] for a curated sample of user input widgets
> available in the Material library.

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **演示**：
> 查看 Flutter 的 [Material 3 演示][Material 3 Demo]，
> 了解 Material 库中可用的用户输入组件的精选示例。

If the Material and Cupertino libraries don't have a widget that
does what you need, check out [pub.dev][] to find
Flutter & Dart community-owned and maintained packages.
For example, the [`flutter_slidable`][] package provides
a `Slidable` widget that is more customizable than
the `Dismissible` widget described in the previous section.

如果 Material 和 Cupertino 库没有满足你需求的组件，
请查看 [pub.dev][] 以找到 Flutter 和 Dart 社区拥有和维护的 package。
例如，[`flutter_slidable`][] package 提供了一个 `Slidable` 组件，
它比上一节中描述的 `Dismissible` 组件更可定制。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [flutter_slidable (Package of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [flutter_slidable (每周 Package)][flutter_slidable (Package of the Week)]

[Material Widget Library]: /ui/widgets/material
[Material Library API docs]: {{site.api}}/flutter/material/material-library.html
[Material 3 Demo]: https://github.com/flutter/samples/tree/main/material_3_demo

[`flutter_slidable`]: {{site.pub}}/packages/flutter_slidable
[flutter_slidable (Package of the Week)]: {{site.youtube-site}}/watch?v=QFcFEpFmNJ8

## Build interactive widgets with GestureDetector

## 使用 GestureDetector 构建交互式组件

Have you scoured the widget libraries, pub.dev, asked your coding friends,
and still can't find a widget that
fits the user interaction that you're looking for?
You can build your own custom widget and
make it interactive using `GestureDetector`.

你是否搜索了组件库、pub.dev，询问了你的编程朋友，
但仍然找不到符合你所寻找的用户交互的组件？
你可以构建自己的自定义组件，
并使用 `GestureDetector` 使其具有交互性。

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Use this recipe as a starting point to create your own _custom_ button widget
> that can [handle taps][].

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **检查点**：
> 使用此教程作为起点，创建你自己的可以 [处理点击][handle taps] 的 _自定义_ 按钮组件。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [GestureDetector (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [GestureDetector (每周 Widget)][GestureDetector (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **Reference**:
> Check out [Taps, drags, and other gestures][] which explains how to listen
> for, and respond to, gestures in Flutter.

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **参考**：
> 查看 [轻触、拖动和其他手势][Taps, drags, and other gestures]，
> 其中解释了如何在 Flutter 中监听和响应手势。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Bonus Video**:
> Curious how Flutter's `GestureArena` turns raw user interaction data into
> human recognizable concepts like taps, drags, and pinches?
> Check out this video: [GestureArena (Decoding Flutter)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **额外视频**：
> 好奇 Flutter 的 `GestureArena` 如何将原始用户交互数据转换为
> 人类可识别的概念（如轻触、拖动和捏合）？
> 查看此视频：[GestureArena (解码 Flutter)][GestureArena (Decoding Flutter)]

[handle taps]: /cookbook/gestures/handling-taps
[GestureDetector (Widget of the Week)]: {{site.youtube-site}}/watch?v=WhVXkCFPmK4
[Taps, drags, and other gestures]: /ui/interactivity/gestures#gestures
[GestureArena (Decoding Flutter)]: {{site.youtube-site}}/watch?v=Q85LBtBdi0U

### Don't forget about accessibility!

### 不要忘记可访问性！

If you're building a custom widget,
annotate its meaning with the `Semantics` widget.
It provides descriptions and metadata to screen readers and
other semantic analysis-based tools.

如果你正在构建自定义组件，
请使用 `Semantics` 组件注释其含义。
它为屏幕阅读器和其他基于语义分析的工具提供描述和元数据。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [Semantics (Flutter Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Semantics (每周 Flutter Widget)][Semantics (Flutter Widget of the Week)]


<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs**:
[`GestureDetector`][] • [`Semantics`][]

[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html

## Testing

## 测试

Once you have finished building user interactions
into your app, don't forget to write tests to
ensure that everything works as expected!

一旦你完成了在应用中构建用户交互，
不要忘记编写测试以确保一切都按预期工作！

These tutorials walk you through writing tests that
simulate user interactions in your app:

这些教程将引导你编写在应用中模拟用户交互的测试：

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Follow this [tap, drag, and enter text][] cookbook article and learn how to
> use `WidgetTester` to simulate and test user interactions in your app.

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **检查点**：
> 遵循这篇 [轻触、拖动和输入文本][Tap, drag, and enter text] 实用教程文章，
> 学习如何使用 `WidgetTester` 在应用中模拟和测试用户交互。

> <span class="material-symbols" aria-hidden="true" translate="no">bookmark</span> **Bonus Tutorial**:
> The [handle scrolling][] cookbook recipe shows you how to verify that
> lists of widgets contain the expected content by
> scrolling through the lists using widget tests.

> <span class="material-symbols" aria-hidden="true" translate="no">bookmark</span> **额外教程**：
> [处理滚动][Handle scrolling] 实用教程展示了如何通过使用组件测试滚动列表来验证组件列表是否包含预期的内容。

[Semantics (Flutter Widget of the Week)]: {{site.youtube-site}}/watch?v=NvtMt_DtFrQ?si=o79BqAg9NAl8EE8_
[Tap, drag, and enter text]: /cookbook/testing/widget/tap-drag
[Handle scrolling]: /cookbook/testing/widget/scrolling

## Next: Networking

## 下一步：网络

This page was an introduction to handling user input.
Now that you know how to handle input from app users,
you can make your app even more interesting by adding
external data. In the next section,
you'll learn how to fetch data for your app over a network,
how to convert data to and from JSON, authentication,
and other networking features.

本页面是处理用户输入的介绍。
现在你知道如何处理来自应用用户的输入了，
你可以通过添加外部数据使你的应用更有趣。
在下一节中，
你将学习如何通过网络为你的应用获取数据、
如何在 JSON 之间转换数据、身份验证
以及其他网络功能。

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

随着网站这一部分的发展，
我们 [欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="user-input"
