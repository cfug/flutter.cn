---
# title: Handling user input
title: Handling user input
# description: Learn how to handle user input in Flutter.
description: Learn how to handle user input in Flutter.
prev:
  title: State management
  path: /get-started/fundamentals/state-management
next:
  title: Networking and data
  path: /get-started/fundamentals/networking
---

Now that you know how to manage state in your
Flutter app, how can you let users interact
with your app and change its state?



既然你已经知道如何在 Flutter 应用中管理状态，
那么如何让用户与你的应用互动并更改其状态呢？

## Introduction to handling user input



## 处理用户输入简介

As a multi-platform UI framework,
there are many different ways for users
to interact with a Flutter app.
The resources in this section introduce
you to some of the common widgets used
for enabling user interaction within your app.



作为一个多平台 UI 框架，
用户与 Flutter 应用交互的方式有很多种。
本节中的资源将向你介绍一些常用的 Widget，
用于在应用中启用用户交互。

Some user input mechanisms, like [scrolling][],
have already been covered in [Layouts][].



一些用户输入机制，如[滚动][scrolling]，
已经在[布局][Layouts]中介绍过了。

:::secondary About design system support
Flutter ships with prebuilt components for two design systems as part of the SDK,
[Material][] and [Cupertino][].
For educational purposes, this page focuses on Material widgets, components that
are stylized according to the [Material 3 design language][] specifications.

The Flutter community on [pub.dev][], the package repository for Dart and Flutter,
create and support additional design languages such as [Fluent UI][], [macOS UI][],
and more. If the existing design system components don't quite fit what you need,
Flutter lets you build your own custom widgets,
which is covered at the end of this section.
No matter which design system you choose, the principals on this page apply.
:::



Flutter SDK 内置了两个设计系统的预构建组件：
[Material][] 和 [Cupertino][]。
出于教学目的，本页重点介绍 Material Widget，
这些组件是根据 [Material 3 设计语言][Material 3 design language]规范进行样式设计的。

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **Reference**:
> The [widget catalog][] has an inventory of commonly used widgets in the [Material][] and [Cupertino][] libraries.



[pub.dev][]（Dart 和 Flutter 的包仓库）上的 Flutter 社区
创建并支持其他设计语言，如 [Fluent UI][]、[macOS UI][] 等。
如果现有的设计系统组件不太符合你的需求，
Flutter 允许你构建自己的自定义 Widget，
这将在本节末尾介绍。
无论你选择哪种设计系统，本页上的原则都适用。
:::

Next, we'll cover a few of the Material widgets that support common
use cases for handling user input in your Flutter app.



> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **参考**：
> [Widget 目录][widget catalog]包含 [Material][] 和 [Cupertino][] 库中常用 Widget 的清单。

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



接下来，我们将介绍一些 Material Widget，
它们支持 Flutter 应用中处理用户输入的常见用例。

![A collection of Material 3 Buttons.](/assets/images/docs/fwe/user-input/material-buttons.png)



## 按钮

Buttons allow a user to initiate an action in the UI by clicking or tapping.
The Material library provides a variety of button types that are functionally similar,
but styled differently for various use cases, including:



按钮允许用户通过点击或轻触在 UI 中启动操作。
Material 库提供了多种功能相似的按钮类型，
但针对不同用例有不同的样式，包括：

- `ElevatedButton`: A button with some depth. Use elevated buttons to add
  dimension to otherwise mostly flat layouts.
- `FilledButton`: A filled button that should be used for
  important, final actions that complete a flow,
  like **Save**, **Join now**, or **Confirm**.
- `Tonal Button`: A middle ground button between
  `FilledButton` and `OutlinedButton`.
  They're useful in contexts where a lower-priority button requires more
  emphasis than an outline, like **Next**.
- `OutlinedButton`: A button with text and a visible border.
  These buttons contain actions that are important,
  but aren't the primary action in an app.
- `TextButton`: Clickable text, without a border.
  Since text buttons don't have visible borders,
  they must rely on their position
  relative to other content for context.
- `IconButton`: A button with an icon.
- `FloatingActionButton`: An icon button that hovers over
  content to promote a primary action.



- `ElevatedButton`：具有一定深度的按钮。使用凸起按钮为原本大部分平坦的布局增加层次感。
- `FilledButton`：填充按钮，应用于完成流程的重要、最终操作，
  如**保存**、**立即加入**或**确认**。
- `Tonal Button`：介于 `FilledButton` 和 `OutlinedButton` 之间的按钮。
  在低优先级按钮需要比轮廓更多强调的情况下很有用，如**下一步**。
- `OutlinedButton`：带有文本和可见边框的按钮。
  这些按钮包含重要的操作，但不是应用中的主要操作。
- `TextButton`：没有边框的可点击文本。
  由于文本按钮没有可见边框，它们必须依靠相对于其他内容的位置来提供上下文。
- `IconButton`：带有图标的按钮。
- `FloatingActionButton`：悬浮在内容上方的图标按钮，用于推广主要操作。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [FloatingActionButton (Widget of the Week)][]



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [FloatingActionButton（每周 Widget）][FloatingActionButton (Widget of the Week)]

There are usually 3 main aspects to constructing a button:
style, callback, and its child,
as seen in the following `ElevatedButton` sample code:



构建按钮通常有 3 个主要方面：样式、回调和子组件，
如以下 `ElevatedButton` 示例代码所示：

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



- 按钮的回调函数 `onPressed` 决定了点击按钮时发生什么，
  因此，这个函数是你更新应用状态的地方。
  如果回调为 `null`，按钮将被禁用，用户按下按钮时什么也不会发生。

- The button's `child`, which is displayed within the button's content area,
  is usually text or an icon that indicates the button's purpose.



- 按钮的 `child`（显示在按钮内容区域内）通常是指示按钮用途的文本或图标。

- Finally, a button's `style` controls its appearance: color, border, and so on.



- 最后，按钮的 `style` 控制其外观：颜色、边框等。

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



> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **练习**：
> 完成这个教程，学习如何构建一个「收藏」按钮：
> [为你的 Flutter 应用添加交互性][Add interactivity to your Flutter app]

<br>

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this tutorial that teaches you how to build a
> "favorite" button: [Add interactivity to your Flutter app][]



<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文档**：[`ElevatedButton`][] • [`FilledButton`][] • [`OutlinedButton`][] • [`TextButton`][] • [`IconButton`][] • [`FloatingActionButton`][]

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



有几个 Widget 支持文本输入。

### `SelectableText`



Flutter 的 `Text` Widget 在屏幕上显示文本，
但不允许用户高亮或复制文本。
`SelectableText` 显示一串_用户可选择的_文本。

Flutter's `Text` widget displays text on the screen,
but doesn't allow users to highlight or copy the text.
`SelectableText` displays a string of _user-selectable_ text.



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [SelectableText（每周 Widget）][SelectableText (Widget of the Week)]

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



`RichText` 让你可以在应用中显示富文本字符串。
`TextSpan` 与 `RichText` 类似，允许你使用不同的文本样式显示文本的各个部分。
它不是用于处理用户输入的，但如果你允许用户编辑和格式化文本，它会很有用。

[SelectableText (Widget of the Week)]: {{site.youtube-site}}/watch?v=ZSU3ZXOs6hc

### `RichText`



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Rich Text（每周 Widget）][Rich Text (Widget of the Week)]

`RichText` lets you display strings of rich text in your app.
`TextSpan`, similar to `RichText`, allows you to display parts of text with
different text styles. It's not for handling user input,
but is useful if you're allowing users edit and format text.



> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **代码**：
> [Rich Text Editor 代码][Rich Text Editor code]

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



`TextField` 让用户可以使用硬件或屏幕键盘在文本框中输入文本。

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **Code**:
> [Rich Text Editor code][]



`TextField` 有许多不同的属性和配置。以下是一些重点：

[Rich Text (Widget of the Week)]: {{site.youtube-site}}/watch?v=rykDVh-QFfw
[Rich Text Editor code]: {{site.github}}/flutter/samples/tree/main/simplistic_editor

### `TextField`



- `InputDecoration` 决定文本字段的外观，如颜色和边框。
- `controller`：`TextEditingController` 控制正在编辑的文本。
  为什么可能需要控制器？默认情况下，你的应用用户可以在文本字段中输入，
  但如果你想以编程方式控制 `TextField` 并清除其值，例如，你将需要一个 `TextEditingController`。
- `onChanged`：当用户更改文本字段的值时（例如插入或删除文本时）触发此回调函数。
- `onSubmitted`：当用户表示他们已完成编辑字段中的文本时触发此回调；
  例如，当文本字段获得焦点时按下「回车」键。

A `TextField` lets users enter text in text box using a hardware or
onscreen keyboard.



该类支持其他可配置属性，例如 `obscureText`（将输入的每个字母转换为圆点）
和 `readOnly`（阻止用户更改文本）。

`TextField`s have many different properties and configurations.
A few of the highlights:



> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **练习**：
> 完成这个 4 部分的 cookbook 系列，它将引导你创建文本字段、
> 获取其值并更新你的应用状态：
> 1. [创建和设置文本字段样式][Create and style a text field]
> 1. [获取文本字段的值][Retrieve the value of a text field]
> 1. [处理文本字段的更改][Handle changes to a text field]
> 1. [焦点和文本字段][Focus and text fields]

- `InputDecoration` determines the text field's appearance,
  such as color and border.
- `controller`: A `TextEditingController` controls the text being edited.
  Why might you need a controller?
  By default, your app's users can type
  into the text field, but if you want to programmatically control the `TextField`
  and clear its value, for example, you'll need a `TextEditingController`.
- `onChanged`: This callback function triggers when the user changes
  the text field's value, such as when inserting or removing text.
- `onSubmitted`: This callback is triggered when the user indicates that
  they are done editing the text in the field;
  for example, by tapping the "enter" key when the text field is in focus.



### 表单

The class supports other configurable properties, such as
`obscureText` that turns each letter into a `readOnly` circle as its entered and
`readOnly` which prevents the user from changing the text.



`Form` 是一个可选的容器，用于将多个表单字段 Widget（如 `TextField`）组合在一起。

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



每个单独的表单字段都应该包装在 `FormField` Widget 中，
并以 `Form` Widget 作为共同的祖先。
有一些便捷 Widget 会为你预先将表单字段 Widget 包装在 `FormField` 中。
例如，`TextField` 的 `Form` Widget 版本是 `TextFormField`。

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this 4-part cookbook series that walks
> you through how to create a text field,
> retrieve its value, and update your app state:
> 1. [Create and style a text field][]
> 1. [Retrieve the value of a text field][]
> 1. [Handle changes to a text field][]
> 1. [Focus and text fields][].



使用 `Form` 可以访问 `FormState`，
它允许你保存、重置和验证从该 `Form` 继承的每个 `FormField`。
你还可以提供一个 `GlobalKey` 来标识特定的表单，如以下代码所示：

[Create and style a text field]: /cookbook/forms/text-input
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[Handle changes to a text field]: /cookbook/forms/text-field-changes
[Focus and text fields]: /cookbook/forms/focus

### Form



> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **练习**：
> 完成本教程，学习如何[构建带有验证的表单][build a form with validation]。

`Form` is an optional container for grouping together multiple
form field widgets, such as `TextField`.



> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **演示**：
> [表单应用][Form app]

Each individual form field should be wrapped in a `FormField`
widget with the `Form` widget as a common ancestor.
Convenience widgets exist that pre-wrap form field widgets in a
`FormField` for you.
For example, the `Form` widget version of `TextField` is `TextFormField`.



> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **代码**：
> [表单应用代码][Form app code]

Using a `Form` provides access to a `FormState`,
which lets you save, reset, and validate each `FormField`
that descends from this `Form`.
You can also provide a `GlobalKey` to identify a specific form,
as shown in the following code:



<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文档**：[`TextField`][] • [`RichText`][] • [`SelectableText`][] • [`Form`][]

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



## 从一组选项中选择一个值

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this tutorial to learn how to [build a form with validation][].



为用户提供从多个选项中进行选择的方式。

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **Demo**:
> [Form app][]



`SegmentedButton` 允许用户从 2-5 个项目的小组中进行选择。

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **Code**:
> [Form app code][]



数据类型 `<T>` 可以是内置类型，如 `int`、`String`、`bool` 或枚举。
`SegmentedButton` 有几个相关属性：

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



- `segments`，一个 `ButtonSegment` 列表，每个代表用户可以选择的一个「分段」或选项。
   在视觉上，每个 `ButtonSegment` 可以有图标、文本标签或两者兼有。

Provide a way to users to select from several options.



- `multiSelectionEnabled` 指示是否允许用户选择多个选项。此属性默认为 false。

### SegmentedButton



- `selected` 标识当前选中的值。
   **注意：** `selected` 的类型是 `Set<T>`，所以如果你只允许用户选择一个值，
   该值必须作为只有单个元素的 `Set` 提供。

`SegmentedButton` allows users to select from a
minimal group of 2-5 items.



- `onSelectionChanged` 回调在用户选择任何分段时触发。
  它提供已选分段的列表，以便你可以更新应用状态。

The data type, `<T>`, can be a built-in type such as
`int`, `String`, `bool` or an enum.
A `SegmentedButton` has a few relevant properties:



- 其他样式参数允许你修改按钮的外观。
  例如，`style` 接受一个 `ButtonStyle`，提供了配置 `selectedIcon` 的方式。

- `segments`, a list of `ButtonSegment`s, where each represents a "segment"
   or option that the user can select.
   Visually, each `ButtonSegment` can have an icon, text label, or both.



### Chip（标签）

- `multiSelectionEnabled` indicates whether the user is allowed
   to select multiple options. This property defaults to false.



`Chip` 是一种紧凑的方式，用于在特定上下文中表示属性、文本、实体或操作。
针对特定用例存在专门的 `Chip` Widget：

- `selected` identifies the currently selected value(s).
   **Note:** `selected` is of type of `Set<T>`, so if you're only
   allowing users to select one value, that value must be
  provided as a`Set` with a single element.



- [InputChip][] 以紧凑的形式表示复杂的信息，如实体（人、地点或事物）或会话文本。
- [ChoiceChip][] 允许从一组选项中进行单选。选择标签包含相关的描述性文本或类别。
- [FilterChip][] 使用标签或描述性词语来过滤内容。
- [ActionChip][] 表示与主要内容相关的操作。

- The `onSelectionChanged` callback triggers when a user selects any segments.
  It provides a list of the selected segments so you can update your app state.



每个 `Chip` Widget 都需要一个 `label`。
它可以选择性地拥有一个 `avatar`（如图标或用户的头像）
和一个 `onDeleted` 回调，该回调显示一个删除图标，触发时会删除该标签。
`Chip` Widget 的外观也可以通过设置一些可选参数来自定义，
如 `shape`、`color` 和 `iconTheme`。

- Additional styling parameters allow you to modify the button's appearance.
  For example, `style` takes a `ButtonStyle`,
  providing a way to configure a `selectedIcon`.



你通常会使用 `Wrap`（一个在多个水平或垂直行中显示其子组件的 Widget），
以确保你的标签会换行而不会在应用边缘被截断。

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



### `DropdownMenu`（下拉菜单）

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



`DropdownMenu` 允许用户从选项菜单中选择一个选项，并将所选文本放入 `TextField` 中。
它还允许用户根据文本输入来过滤菜单项。

### Chip



配置参数包括以下内容：

`Chip` is a compact way of representing an
attribute, text, entity, or action for a specific context.
Specialized `Chip` widgets exist for specific use cases:



- `dropdownMenuEntries` 提供一个 `DropdownMenuEntry` 列表，描述每个菜单项。
  菜单可能包含文本标签、前导图标或尾随图标等信息。（这也是唯一必需的参数。）
- `TextEditingController` 允许以编程方式控制 `TextField`。
- `onSelected` 回调在用户选择选项时触发。
- `initialSelection` 允许你配置默认值。
- 还有其他参数可用于自定义 Widget 的外观和行为。

- [InputChip][] represents a complex piece of information,
  such as an entity (person, place, or thing), or
  conversational text, in a compact form.
- [ChoiceChip][] allows a single selection from a set of options.
  Choice chips contain related descriptive text or categories.
- [FilterChip][] uses tags or descriptive words to filter content.
- [ActionChip][] represents an action related to primary content.



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [DropdownMenu（每周 Widget）][DropdownMenu (Widget of the Week)]

Every `Chip` widget requires a `label`.
It can optionally have an `avatar` (such as an icon or a user's profile picture)
and an `onDeleted` callback, which shows a delete icon that
when triggered, deletes the chip.
A `Chip` widget's appearance can also be customized by setting a
number of optional parameters such as `shape`, `color`, and `iconTheme`.



### Slider（滑块）

You will typically use `Wrap`, a widget that displays its children in
multiple horizontal or vertical runs, to make sure your chips wrap and
don't get cut off at the edge of your app.



`Slider` Widget 允许用户通过移动指示器来调整值，例如音量条。

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



`Slider` Widget 的配置参数：

A `DropdownMenu` allows users to select a choice from a menu
of options and places the selected text into a `TextField`.
It also allows users to filter the menu items based on the text input.



- `value` 表示滑块的当前值
- `onChanged` 是移动滑块时触发的回调
- `min` 和 `max` 设置滑块允许的最小和最大值
- `divisions` 设置用户可以沿轨道移动滑块的离散间隔

Configuration parameters include the following:



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Slider、RangeSlider、CupertinoSlider（每周 Widget）][Slider, RangeSlider, CupertinoSlider (Widget of the Week)]

- `dropdownMenuEntries` provides a list of `DropdownMenuEntry`s that
  describes each menu item.
  The menu might contain information such as a text label, and
  a leading or trailing icon.
  (This is also the only required parameter.)
- `TextEditingController` allows programmatically controlling the `TextField`.
- The `onSelected` callback triggers when the user selects an option.
- `initialSelection` allows you to configure the default value.
- Additional parameters are also available for
  customizing the widget's look and behavior.



<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文档：** [`SegmentedButton`][] • [`DropdownMenu`][] • [`Slider`][] • [`Chip`][]

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



## 在值之间切换

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



你的 UI 可以通过多种方式允许在值之间切换。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [DropdownMenu (Widget of the Week)][]



### Checkbox、Switch 和 Radio

[DropdownMenu (Widget of the Week)]: {{site.youtube-site}}/watch?v=giV9AbM2gd8?si=E23hjg72cjMTe_mz

### Slider



提供切换单个值开关的选项。
这些 Widget 背后的功能逻辑是相同的，
因为所有 3 个都建立在 `ToggleableStateMixin` 之上，
尽管每个都提供略微不同的呈现方式：

The `Slider` widget lets a user adjust a value by moving an indicator,
such as a volume bar.



- `Checkbox` 是一个容器，为 false 时为空，为 true 时填充复选标记。
- `Switch` 有一个滑块，为 false 时在左侧，为 true 时滑动到右侧。
- `Radio` 与 `Checkbox` 类似，是一个容器，为 false 时为空，为 true 时被填充。

Configuration parameters for the `Slider` widget:



`Checkbox` 和 `Switch` 的配置包含：

- `value` represents the slider's current value
- `onChanged` is the callback that gets triggered when the handle is moved
- `min` and `max` establish minimum and maximum values allowed by the slider
- `divisions` establishes a discrete interval with which the user can move the
  handle along the track.



- 一个 `true` 或 `false` 的 `value`
- 以及一个 `onChanged` 回调，当用户切换 Widget 时触发

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



### Radio（单选按钮）

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [Slider, RangeSlider, CupertinoSlider (Widget of the Week)][]



`RadioGroup` 包含 `Radio` 按钮，允许用户在互斥的值之间进行选择。
当用户在组中选择一个单选按钮时，其他单选按钮将被取消选择。

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs:** [`SegmentedButton`][] • [`DropdownMenu`][] • [`Slider`][] • [`Chip`][]

[Slider, RangeSlider, CupertinoSlider (Widget of the Week)]: {{site.youtube-site}}/watch?v=ufb4gIPDmEss
[`SegmentedButton`]: {{site.api}}/flutter/material/SegmentedButton-class.html
[`DropdownMenu`]: {{site.api}}/flutter/material/DropdownMenu-class.html
[`Slider`]: {{site.api}}/flutter/material/Slider-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html

## Toggle between values



- 特定 `Radio` 按钮的 `value` 表示该按钮的值。
- `RadioGroup` 的选中值由 `groupValue` 参数标识。
- `RadioGroup` 有一个 `onChanged` 回调，像 `Switch` 和 `Checkbox` 一样，当用户点击时触发。

There are several ways that your UI can allow toggling between values.



#### 附加：CheckboxListTile 和 SwitchListTile

### Checkbox, Switch, and Radio



这些便捷 Widget 与复选框和开关 Widget 相同，但支持标签（作为 `ListTile`）。

Provide an option to toggle a single value on and off.
The functional logic behind these widgets are the same,
as all 3 are built on top of `ToggleableStateMixin`, though
each provides slight presentation differences.:



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [CheckboxListTile（每周 Widget）][CheckboxListTile (Widget of the Week)]

- `Checkbox` is a container that is empty when false or
  filled with a checkmark when true.
- `Switch` has a handle that is on the left when false and
  slides to the right when true.
- `Radio` is similar to a `Checkbox` in that it's a container that is
  empty when false, but filled in when true.



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [SwitchListTile（每周 Widget）][SwitchListTile (Widget of the Week)]

The configuration for `Checkbox` and `Switch` contain:



<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文档**：
[`Checkbox`][] • [`CheckboxListTile`][] • [`Switch`][] • [`SwitchListTile`][] •
[`Radio`][]

- a `value` that is `true` or `false`
- and an `onChanged` callback which is triggered when
  the user toggles the widget



## 选择日期或时间

### Checkbox



提供了 Widget 以便用户可以选择日期和时间。

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



有一组对话框使用户能够选择日期或时间，如以下各节所示。
除了不同的日期类型（日期使用 `DateTime`，时间使用 `TimeOfDay`）外，
这些对话框的功能类似，你可以通过提供以下内容来配置它们：

### Switch



- 默认的 `initialDate` 或 `initialTime`
- 或决定显示哪种选择器 UI 的 `initialEntryMode`

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



### DatePickerDialog（日期选择器对话框）

### Radio



此对话框允许用户选择一个日期或日期范围。
通过调用 `showDatePicker` 函数激活，该函数返回一个 `Future<DateTime>`，
所以不要忘记等待异步函数调用！

A `RadioGroup` contains `Radio` buttons that allow the user to
select between mutually exclusive values.
When the user selects a radio button in a group,
the other radio buttons are unselected.



### TimePickerDialog（时间选择器对话框）

- A particular `Radio` button's `value` represent that button's value.
- The selected value for a `RadioGroup` is identified by
  the `groupValue` parameter.
- `RadioGroup` has an `onChanged` callback that
  gets triggered when users click it, like `Switch` and `Checkbox`.



`TimePickerDialog` 是一个呈现时间选择器的对话框。
可以通过调用 `showTimePicker()` 函数来激活它。
与返回 `Future<DateTime>` 不同，
`showTimePicker` 返回的是 `Future<TimeOfDay>`。
同样，不要忘记等待函数调用！

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



<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文档：**
[`showDatePicker`][] • [`showTimePicker`][]

@override
  State<RadioExample> createState() => _RadioExampleState();
}



## 滑动与拖动

class _RadioExampleState extends State<RadioExample> {
  Character? _character = Character.musician;



`Dismissible` 是一个允许用户通过滑动来关闭的 Widget。
它有许多配置参数，包括：

void setCharacter(Character? value) {
    setState(() {
      _character = value;
    });
  }



- 一个 `child` Widget
- 一个当用户滑动时触发的 `onDismissed` 回调
- 样式参数，如 `background`
- 还需要包含一个 `key` 对象，以便它们可以与 Widget 树中的同级 `Dismissible` Widget 唯一区分开来

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



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Dismissible（每周 Widget）][Dismissible (Widget of the Week)]

#### Bonus: CheckboxListTile & SwitchListTile



> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **练习**：
> 完成本教程，学习如何使用 Dismissible Widget [实现滑动删除][implement swipe to dismiss]。

These convenience widgets are the same checkbox and switch widgets,
but support a label (as a `ListTile`).



<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文档：**
[`Dismissible`][]

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



## 寻找更多 Widget？

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [CheckboxListTile (Widget of the Week)][]



本页仅介绍了一些你可以在 Flutter 应用中用于处理用户输入的常见 Material Widget。
查看 [Material Widget 库][Material Widget library]和
[Material 库 API 文档][Material Library API docs]以获取完整的 Widget 列表。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [SwitchListTile (Widget of the Week)][]



> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **演示**：
> 查看 Flutter 的 [Material 3 Demo][]，了解 Material 库中可用的用户输入 Widget 精选示例。

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



如果 Material 和 Cupertino 库没有满足你需求的 Widget，
请查看 [pub.dev][] 以找到 Flutter 和 Dart 社区拥有和维护的包。
例如，[`flutter_slidable`][] 包提供了一个比上一节描述的
`Dismissible` Widget 更可定制的 `Slidable` Widget。

Widgets are provided so the user can select a date and time.



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [flutter_slidable（每周包）][flutter_slidable (Package of the Week)]

There is a set of dialogs that enable users to select a date or time,
as you'll see in the following sections.
With the exception of differing date types -
`DateTime` for dates vs `TimeOfDay` for time -
these dialogs function similarly, you can configure them by providing:



## 使用 GestureDetector 构建交互式 Widget

- a default `initialDate` or `initialTime`
- or an `initialEntryMode` that determines the picker UI that's displayed.



你是否已经搜遍了 Widget 库、pub.dev，询问了你的编程朋友，
仍然找不到符合你所寻找的用户交互的 Widget？
你可以构建自己的自定义 Widget，并使用 `GestureDetector` 使其具有交互性。

### DatePickerDialog



> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **练习**：
> 使用这个教程作为起点，创建你自己的_自定义_按钮 Widget，
> 使其能够[处理点击][handle taps]。

This dialog allows the user to select a date or a range of dates.
Activate by calling the `showDatePicker` function,
which returns a `Future<DateTime>`,
so don't forget to await the asynchronous function call!



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [GestureDetector（每周 Widget）][GestureDetector (Widget of the Week)]

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



> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **参考**：
> 查看[点击、拖动和其他手势][Taps, drags, and other gestures]，
> 其中解释了如何在 Flutter 中监听和响应手势。

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



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **附加视频**：
> 想知道 Flutter 的 `GestureArena` 如何将原始用户交互数据转换为
> 人类可识别的概念（如点击、拖动和捏合）吗？
> 观看这个视频：[GestureArena（解码 Flutter）][GestureArena (Decoding Flutter)]

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



### 不要忘记无障碍功能！

### TimePickerDialog



如果你正在构建自定义 Widget，
请使用 `Semantics` Widget 标注其含义。
它为屏幕阅读器和其他基于语义分析的工具提供描述和元数据。

`TimePickerDialog` is a dialog that presents a time picker.
It can be activated by calling the `showTimePicker()` function.
Instead of returning a `Future<DateTime>`,
`showTimePicker` instead returns a `Future<TimeOfDay>`.
Once again, don't forget to await the function call!



> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **视频**：
> [Semantics（每周 Flutter Widget）][Semantics (Flutter Widget of the Week)]

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



<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文档**：
[`GestureDetector`][] • [`Semantics`][]

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



## 测试

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



在你完成应用中的用户交互构建后，
不要忘记编写测试以确保一切按预期工作！

:::tip
Calling `showDatePicker()` and `showTimePicker()`
is equivalent to calling `showDialog()` with `DatePickerDialog()` and
`TimePickerDialog()`, respectively.
Internally, both functions use the `showDialog()` function with
their respective `Dialog` widgets.
To enable state restoration, you can also push
`DatePickerDialog()` and `TimePickerDialog()` directly
on to the `Navigator` stack.
:::

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs:**
[`showDatePicker`][] • [`showTimePicker`][]

[`showDatePicker`]: {{site.api}}/flutter/material/showDatePicker.html
[`showTimePicker`]: {{site.api}}/flutter/material/showTimePicker.html

## Swipe & slide



这些教程将引导你编写模拟应用中用户交互的测试：

### [`Dismissible`][]



> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **练习**：
> 按照[点击、拖动和输入文本][tap, drag, and enter text] cookbook 文章，
> 学习如何使用 `WidgetTester` 在应用中模拟和测试用户交互。

A `Dismissible` is a widget that enables users to dismiss it by swiping.
It has a number of configuration parameters, including:



> <span class="material-symbols" aria-hidden="true" translate="no">bookmark</span> **附加教程**：
> [处理滚动][handle scrolling] cookbook 教程向你展示如何通过使用 Widget 测试
> 滚动列表来验证 Widget 列表包含预期内容。

- A `child` widget
- An `onDismissed` callback that is triggered when the user swipes
- Styling parameters such as `background`
- It's important to include a `key` object as well so that they can be uniquely
  identified from sibling `Dismissible` widgets in the widget tree.



## 下一步：网络

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



本页是处理用户输入的介绍。
既然你已经知道如何处理应用用户的输入，
你可以通过添加外部数据使你的应用更加有趣。
在下一节中，你将学习如何通过网络为你的应用获取数据、
如何在 JSON 之间转换数据、身份验证以及其他网络功能。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [Dismissible (Widget of the Week)][]



## 反馈

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Complete this tutorial on how to [implement swipe to dismiss][] using the
> dismissible widget.



由于本网站的此部分正在不断发展，
我们[欢迎你的反馈][welcome your feedback]！

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs:**
[`Dismissible`][]

[Dismissible (Widget of the Week)]: {{site.youtube-site}}/watch?v=iEMgjrfuc58?si=f0S7IdaA9PIWIYvl
[Implement swipe to dismiss]: /cookbook/gestures/dismissible
[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html

## Looking for more widgets?

This page features just a few of the common Material widgets that
you can use for handling user input in your Flutter app.
Check out the [Material Widget library][] and
[Material Library API docs][] for a full list of widgets.

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **Demo**:
> See Flutter's [Material 3 Demo][] for a curated sample of user input widgets
> available in the Material library.

If the Material and Cupertino libraries don't have a widget that
does what you need, check out [pub.dev][] to find
Flutter & Dart community-owned and maintained packages.
For example, the [`flutter_slidable`][] package provides
a `Slidable` widget that is more customizable than
the `Dismissible` widget described in the previous section.

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [flutter_slidable (Package of the Week)][]

[Material Widget Library]: /ui/widgets/material
[Material Library API docs]: {{site.api}}/flutter/material/material-library.html
[Material 3 Demo]: https://github.com/flutter/samples/tree/main/material_3_demo

[`flutter_slidable`]: {{site.pub}}/packages/flutter_slidable
[flutter_slidable (Package of the Week)]: {{site.youtube-site}}/watch?v=QFcFEpFmNJ8

## Build interactive widgets with GestureDetector

Have you scoured the widget libraries, pub.dev, asked your coding friends,
and still can't find a widget that
fits the user interaction that you're looking for?
You can build your own custom widget and
make it interactive using `GestureDetector`.

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Use this recipe as a starting point to create your own _custom_ button widget
> that can [handle taps][].

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [GestureDetector (Widget of the Week)][]

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **Reference**:
> Check out [Taps, drags, and other gestures][] which explains how to listen
> for, and respond to, gestures in Flutter.

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Bonus Video**:
> Curious how Flutter's `GestureArena` turns raw user interaction data into
> human recognizable concepts like taps, drags, and pinches?
> Check out this video: [GestureArena (Decoding Flutter)][]

[handle taps]: /cookbook/gestures/handling-taps
[GestureDetector (Widget of the Week)]: {{site.youtube-site}}/watch?v=WhVXkCFPmK4
[Taps, drags, and other gestures]: /ui/interactivity/gestures#gestures
[GestureArena (Decoding Flutter)]: {{site.youtube-site}}/watch?v=Q85LBtBdi0U

### Don't forget about accessibility!

If you're building a custom widget,
annotate its meaning with the `Semantics` widget.
It provides descriptions and metadata to screen readers and
other semantic analysis-based tools.

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **Video**:
> [Semantics (Flutter Widget of the Week)][]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API Docs**:
[`GestureDetector`][] • [`Semantics`][]

[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html

## Testing

Once you have finished building user interactions
into your app, don't forget to write tests to
ensure that everything works as expected!

These tutorials walk you through writing tests that
simulate user interactions in your app:

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **Checkpoint**:
> Follow this [tap, drag, and enter text][] cookbook article and learn how to
> use `WidgetTester` to simulate and test user interactions in your app.

> <span class="material-symbols" aria-hidden="true" translate="no">bookmark</span> **Bonus Tutorial**:
> The [handle scrolling][] cookbook recipe shows you how to verify that
> lists of widgets contain the expected content by
> scrolling through the lists using widget tests.

[Semantics (Flutter Widget of the Week)]: {{site.youtube-site}}/watch?v=NvtMt_DtFrQ?si=o79BqAg9NAl8EE8_
[Tap, drag, and enter text]: /cookbook/testing/widget/tap-drag
[Handle scrolling]: /cookbook/testing/widget/scrolling

## Next: Networking

This page was an introduction to handling user input.
Now that you know how to handle input from app users,
you can make your app even more interesting by adding
external data. In the next section,
you'll learn how to fetch data for your app over a network,
how to convert data to and from JSON, authentication,
and other networking features.

## Feedback

As this section of the website is evolving,
we [welcome your feedback][]!

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="user-input"
