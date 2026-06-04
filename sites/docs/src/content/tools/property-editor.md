---
# title: Flutter Property Editor
title: Flutter 属性编辑器
# description: Learn how to use the Flutter Property Editor to view and modify the properties of your widgets.
description: 学习如何使用 Flutter 属性编辑器查看和修改 widget 的属性。
ai-translated: true
---

:::note
The Flutter Property Editor requires Flutter version 3.32 or higher.
:::

:::note
Flutter 属性编辑器需要 Flutter 3.32 或更高版本。
:::

## What is it?

## 这是什么？

The Flutter Property Editor is a powerful IDE-tool that lets you view and modify
widget properties directly from a visual interface.

Flutter 属性编辑器是一款强大的 IDE 工具，让你通过可视化界面直接查看和修改 widget 属性。

It allows you to quickly discover and modify your widgets' existing and
available constructor arguments, eliminating the need to jump-to-definition or
manually edit the source code. Furthermore, its integration with the Flutter
inspector and hot reload enables you to view changes in real time, speeding up
UI development and iteration.

你可以快速发现并修改 widget 现有及可用的构造函数参数，
无需跳转到定义或手动编辑源码。此外，它与 Flutter 检查器和热重载集成，
可实时查看变更，加快 UI 开发与迭代。

![Flutter Property Editor](/assets/images/docs/tools/devtools/property-editor-text-widget.png){:width="500px"}

## How to access the Flutter Property Editor

## 如何访问 Flutter 属性编辑器

1.  Open the Flutter Property Editor in your supported IDE ([VS Code][],
    [Android Studio/IntelliJ][]).

    1.  在支持的 IDE（[VS Code][]、[Android Studio/IntelliJ][]）中打开 Flutter 属性编辑器。

2.  Locate a [widget constructor invocation][] in your Flutter code.

    2.  在 Flutter 代码中定位 [widget constructor invocation][]（widget 构造函数调用）。

3.  Move your cursor anywhere inside the widget constructor invocation.

    3.  将光标移到 widget 构造函数调用内的任意位置。

    For example, in the following `build` method, place your cursor anywhere
    between the `T` of `Text` and the ending parenthesis `)` after
    `TextOverflow.clip`:

    例如，在以下 `build` 方法中，将光标放在 `Text` 的 `T` 与 `TextOverflow.clip` 之后右括号 `)` 之间的任意位置：

    ```dart
    @override
    Widget build(BuildContext context) {
        return Text(
            'Hello World!',
            overflow: TextOverflow.clip,
        );
    }
    ```

4.  The Flutter Property Editor panel automatically updates to display the
    properties of the widget at your cursor location.

    4.  Flutter 属性编辑器面板会自动更新，显示光标处 widget 的属性。

[VS Code]: /tools/vs-code#property-editor
[Android Studio/IntelliJ]: /tools/android-studio#property-editor
[widget constructor invocation]: /learn/pathway/tutorial/widget-fundamentals

### Runtime usage

### 运行时使用

#### Integration with the Flutter inspector

#### 与 Flutter 检查器集成

The Flutter Property Editor can be used in conjunction with the
[Flutter inspector][] to inspect your widgets simultaneously in both tools.

Flutter 属性编辑器可与 [Flutter inspector][]（Flutter 检查器）配合使用，在两个工具中同时检查 widget。

1.  From your preferred IDE, run and debug your Flutter application.
    * [VS Code instructions][]
    * [Android Studio/IntelliJ instructions][]

    1.  在你偏好的 IDE 中运行并调试 Flutter 应用。
    * [VS Code instructions][]（VS Code 说明）
    * [Android Studio/IntelliJ instructions][]（Android Studio/IntelliJ 说明）

2.  Open the [Flutter inspector][] in your IDE.

    2.  在 IDE 中打开 [Flutter inspector][]。

You can then use the Flutter inspector to load a widget in the Flutter Property Editor by either:

然后你可以通过以下任一方式，用 Flutter 检查器在 Flutter 属性编辑器中加载 widget：

1. Selecting a widget in tree:
    * Click on a widget in the [inspector's widget tree][].

    1. 在树中选择 widget：
    * 在 [inspector's widget tree][]（检查器的 widget 树）中点击 widget。

2. Selecting a widget in your app:
    * Enable ["Select Widget Mode"][] in the inspector.
    * Click on a widget in your running application.

    2. 在应用中选择 widget：
    * 在检查器中启用 ["Select Widget Mode"][]（选择 widget 模式）。
    * 在正在运行的应用中点击 widget。

Both actions will automatically:
- Jump to the widget's declaration in your source code.
- Load the selected widget in the Flutter Property Editor.

两种操作都会自动：
- 跳转到源码中该 widget 的声明。
- 在 Flutter 属性编辑器中加载所选 widget。

[VS Code instructions]: /tools/devtools/vscode/#run-and-debug
[Android Studio/IntelliJ instructions]: /tools/devtools/android-studio/#run-and-debug
[Flutter inspector]: /tools/devtools/inspector
[inspector's widget tree]: /tools/devtools/inspector#flutter-widget-tree
["Select Widget Mode"]: /tools/devtools/inspector#inspecting-a-widget

#### Integration with hot reload

#### 与热重载集成

The Flutter Property Editor can be used in conjunction
with hot reload to view changes in real time.

Flutter 属性编辑器可与热重载配合，实时查看变更。

1. From your preferred IDE, enable autosave and hot reloads on save.

    1. 在你偏好的 IDE 中启用自动保存与保存时热重载。

    **VS Code**

    Add the following to your `.vscode/settings.json` file:

    将以下内容添加到你的 `.vscode/settings.json` 文件：

    ```json
    "files.autoSave": "afterDelay",
    "dart.flutterHotReloadOnSave": "all",
    ```

    **Android Studio and IntelliJ**

    * Open `Settings > Tools > Actions on Save` and select
     `Configure autosave options`.
        - Check the option to `Save files if the IDE is idle for X seconds`.
        - **Recommended:** Set a small delay duration. For example, 2 seconds.

    * 打开 `Settings > Tools > Actions on Save`（设置 > 工具 > 保存时操作），选择 `Configure autosave options`（配置自动保存选项）。
        - 勾选 `Save files if the IDE is idle for X seconds`（IDE 空闲 X 秒后保存文件）。
        - **Recommended:**（推荐：）设置较短延迟，例如 2 秒。

    * Open `Settings > Languages & Frameworks > Flutter`.
        - Check the option to `Perform hot reload on save`.

    * 打开 `Settings > Languages & Frameworks > Flutter`（设置 > 语言与框架 > Flutter）。
        - 勾选 `Perform hot reload on save`（保存时执行热重载）。

2.  Run and debug your Flutter application.
    * [VS Code instructions][]
    * [Android Studio/IntelliJ instructions][]

    2.  运行并调试 Flutter 应用。
    * [VS Code instructions][]
    * [Android Studio/IntelliJ instructions][]

3.  Any changes you make from the Flutter Property Editor are automatically
    reflected in your running app.

    3.  你在 Flutter 属性编辑器中所做的更改会自动反映到正在运行的应用中。

## Feature set

## 功能集

The Flutter Property Editor comes equipped with several features designed to
speed up the development process.

Flutter 属性编辑器配备多项功能，旨在加快开发流程。

### Viewing widget documentation

### 查看 widget 文档

When a widget is selected in the Flutter Property Editor, its documentation is
displayed at the top. This allows you to quickly read the widget documentation,
without needing to jump-to-definition or search online.

在 Flutter 属性编辑器中选中 widget 时，其文档会显示在顶部。
你可以快速阅读 widget 文档，无需跳转到定义或在线搜索。

By default, the widget documentation is truncated. Click on "Show more" to
expand the widget documentation.

默认情况下 widget 文档会被截断。点击 "Show more"（显示更多）可展开文档。

:::tip
To see the documentation for your app's custom widgets in the Flutter Property
Editor, make sure to follow the [Dart style guide][].
:::

:::tip
要在 Flutter 属性编辑器中查看应用自定义 widget 的文档，请遵循 [Dart style guide][]（Dart 风格指南）。
:::

![Flutter Property Editor gif displaying the documentation for a Text widget](/assets/images/docs/tools/devtools/property-editor-documentation.gif)

[Dart style guide]: {{site.dart-site}}/effective-dart/documentation

### Editing widget properties

### 编辑 widget 属性

The Flutter Property Editor contains input fields tailored to the type of each
constructor argument.

Flutter 属性编辑器为每个构造函数参数的类型提供对应的输入字段。

- **string, double, and int properties:**
    * These are represented by text input fields.
    * Simply type the new value into the field.
    * Press ••Tab•• or ••Enter•• to apply the edit directly to your source code.

- **string、double 和 int 属性：**
    * 以文本输入框表示。
    * 在字段中输入新值即可。
    * 按 ••Tab•• 或 ••Enter•• 将编辑直接应用到源码。

- **boolean and enum properties:**
    * These are represented by dropdown menus.
    * Click the dropdown to see the available options (`true`/`false` for
      booleans, or the various enum values).
    * Select the desired value from the list to apply it to your code.

- **boolean 和 enum 属性：**
    * 以下拉菜单表示。
    * 点击下拉菜单查看可用选项（布尔值为 `true`/`false`，或各 enum 值）。
    * 从列表中选择所需值以应用到代码。

- **object properties (for example, `TextStyle`, `EdgeInsets`, `Color`):**
    * Currently not supported. The Flutter Property Editor does not yet allow
      direct editing of complex object properties. You will need to edit these
      directly in your source code.

- **object 属性（例如 `TextStyle`、`EdgeInsets`、`Color`）：**
    * 目前不支持。Flutter 属性编辑器尚不允许直接编辑复杂对象属性，需在源码中直接编辑。

### Understanding the property inputs

### 理解属性输入

Each property input in the Flutter Property Editor is accompanied by information
to help you understand its usage.

Flutter 属性编辑器中每个属性输入都附带信息，帮助你理解其用法。

- **Type and name:** The **type** (for example, `StackFit`) and the **name**
  (for example, `fit`) of the constructor parameter are displayed as a label
  for each input field.

    ![Type and name label for a property input](/assets/images/docs/tools/devtools/property-editor-name-type.png){:width="500px"}

- **类型和名称：** 每个输入字段的标签会显示构造函数参数的 **type**（类型，例如 `StackFit`）和 **name**（名称，例如 `fit`）。

    ![Type and name label for a property input](/assets/images/docs/tools/devtools/property-editor-name-type.png){:width="500px"}

- **Info tooltip (ⓘ):**
    * Hovering over the info icon next to a property input displays a tooltip.
    * The information in the tooltip includes:
        * The default value of the property, if one is defined in the widget's constructor.
        * Any documentation for that property.

    ![Info tooltip for a property input](/assets/images/docs/tools/devtools/property-editor-tooltip.png){:width="600px"}

- **信息工具提示 (ⓘ)：**
    * 将指针悬停在属性输入旁的信息图标上会显示工具提示。
    * 工具提示信息包括：
        * 若 widget 构造函数中定义了默认值，则显示该属性的默认值。
        * 该属性的任何文档。

    ![Info tooltip for a property input](/assets/images/docs/tools/devtools/property-editor-tooltip.png){:width="600px"}

* **"Set" and "default" labels:**
    * The **"set"** label appears next to an input if the property has been
      explicitly set in your source code. This means there is a corresponding
      argument provided in the widget constructor call.
    * The **"default"** label appears next to an input if the current property
      value matches the default parameter value as defined in the widget.

    :::tip
    If a property input has both a "set" and a "default" label, it means you
    have explicitly provided a value in your code, but this value is the same as
    the widget's default value for that property. In such cases, you can safely
    remove this argument from your code to make it more concise, as the widget
    will use the default value anyway.
    :::

    !["Set" and "default" labels for a property input](/assets/images/docs/tools/devtools/property-editor-labels.png){:width="500px"}

* **"Set" 和 "default" 标签：**
    * 若属性已在源码中显式设置，输入旁会显示 **"set"** 标签，表示 widget 构造函数调用中提供了对应参数。
    * 若当前属性值与 widget 中定义的默认参数值一致，输入旁会显示 **"default"** 标签。

    :::tip
    若属性输入同时带有 "set" 和 "default" 标签，表示你在代码中显式提供了值，但该值与 widget 对该属性的默认值相同。此时可以安全地从代码中移除此参数以简化代码，widget 仍会使用默认值。
    :::

    !["Set" and "default" labels for a property input](/assets/images/docs/tools/devtools/property-editor-labels.png){:width="500px"}

### Filtering properties

### 筛选属性

For widgets with many properties, the filter bar can help to quickly locate
properties of interest.

对于属性较多的 widget，筛选栏可帮助快速定位感兴趣的属性。

* **Filter by text:**
    * Simply type into the filter bar. The list of properties will dynamically
      update to show only those that match your input.
    * You can filter by a property's name, its current value, or its type. For
      example:
        * Typing "main" would filter to `mainAxisAlignment`, `mainAxisSize`, or
          other properties with "main" in their name.
        * Typing "true" would filter to all boolean properties currently set to
          `true`.
        * Typing "double" would filter to all properties of type `double`.

    ![Filter input with filtering by text highlighted](/assets/images/docs/tools/devtools/property-editor-filter-text.png){:width="500px"}

* **按文本筛选：**
    * 在筛选栏中输入即可。属性列表会动态更新，仅显示匹配项。
    * 可按属性名称、当前值或类型筛选。例如：
        * 输入 "main" 会筛选到 `mainAxisAlignment`、`mainAxisSize` 或名称含 "main" 的其他属性。
        * 输入 "true" 会筛选到当前设为 `true` 的所有布尔属性。
        * 输入 "double" 会筛选到所有 `double` 类型属性。

    ![Filter input with filtering by text highlighted](/assets/images/docs/tools/devtools/property-editor-filter-text.png){:width="500px"}

* **Filter by "set" properties:**
    * Use the filter menu button to open the filter options. Check "Only
      include properties that are set in the code."
    * This hides all properties that have not been explicitly set in your
      code, allowing you to focus only on the properties you have explicitly set.

    ![Filter input with filter menu button highlighted](/assets/images/docs/tools/devtools/property-editor-filter-menu-button.png){:width="500px"}

* **按「已设置」属性筛选：**
    * 使用筛选菜单按钮打开筛选选项，勾选 "Only include properties that are set in the code."（仅包含代码中已设置的属性）。
    * 这会隐藏代码中未显式设置的所有属性，让你只关注已显式设置的属性。

    ![Filter input with filter menu button highlighted](/assets/images/docs/tools/devtools/property-editor-filter-menu-button.png){:width="500px"}

* **Filter with a regex:**
    * The regex toggle (an `*` icon button) allows you to toggle on regex mode
      for the filter input.
    * When enabled, your filter text will be interpreted as a regular
      expression.

    ![Filter input with regex toggle highlighted](/assets/images/docs/tools/devtools/property-editor-filter-regex-toggle.png){:width="500px"}

* **使用正则表达式筛选：**
    * 正则切换按钮（`*` 图标按钮）可为筛选输入开启正则模式。
    * 启用后，筛选文本会按正则表达式解析。

    ![Filter input with regex toggle highlighted](/assets/images/docs/tools/devtools/property-editor-filter-regex-toggle.png){:width="500px"}

* **Clear the current filter:**
    * The clear button (an `X` icon button) clears out any active filters,
      displaying all properties of the widget again.

    ![Filter input with clear button highlighted](/assets/images/docs/tools/devtools/property-editor-filter-clear-button.png){:width="500px"}

* **清除当前筛选：**
    * 清除按钮（`X` 图标按钮）会清除所有活动筛选，再次显示 widget 的全部属性。

    ![Filter input with clear button highlighted](/assets/images/docs/tools/devtools/property-editor-filter-clear-button.png){:width="500px"}
