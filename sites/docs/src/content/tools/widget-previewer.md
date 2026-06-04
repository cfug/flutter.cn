---
# title: Flutter Widget Previewer
title: Flutter Widget 预览器
# description: >-
#   Learn how to use the Flutter Widget Previewer to see your
#   widgets render in real-time, separate from your full app.
description: >-
  学习如何使用 Flutter Widget 预览器，
  在全应用之外实时查看 widget 渲染效果。
ai-translated: true
---

In this guide, you will learn how to use the
Flutter Widget Previewer.

本指南将介绍如何使用 Flutter Widget 预览器。

## Overview

## 概览

With the Flutter Widget Previewer, you can see your widgets
render in real-time, separate from a full app, in the
Chrome browser. To start the previewer, show a widget
in it, and customize a preview, see the following sections.

借助 Flutter Widget 预览器，你可以在 Chrome 浏览器中
在全应用之外实时查看 widget 渲染。
要启动预览器、在其中展示 widget 并自定义预览，请参阅以下各节。

:::version-note
The Flutter Widget Preview requires Flutter version 3.35 or
higher. IDE support requires Flutter version 3.38 or higher.

Please be aware that this is an **experimental feature**
available in the Flutter stable channel. The APIs are not
stable and _will change_. This guide is for the current
early access version, and you should expect future updates
to introduce breaking changes.
:::

:::version-note
Flutter Widget Preview 需要 Flutter 3.35 或更高版本。IDE 支持需要 Flutter 3.38 或更高版本。

请注意，这是 Flutter stable 渠道中的 **experimental feature**（实验性功能）。
API 尚不稳定，_将会变更_。本指南针对当前早期访问版本，未来更新可能引入破坏性变更。
:::

## Opening the previewer

## 打开预览器

### IDEs

### IDE

As of Flutter 3.38, Android Studio, Intellij, and Visual
Studio Code automatically start the Flutter Widget Previewer
on launch.

自 Flutter 3.38 起，Android Studio、Intellij 和 Visual Studio Code
在启动时会自动启动 Flutter Widget 预览器。

#### Android Studio and Intellij

#### Android Studio 与 Intellij

To open the Widget Previewer in Android Studio or Intellij, open
the "Flutter Widget Preview" tab in the sidebar:

在 Android Studio 或 Intellij 中打开 Widget 预览器：在侧边栏打开 "Flutter Widget Preview" 标签页：

![Flutter Widget Previewer in Android Studio](/assets/images/docs/tools/widget-previewer/android-studio.png "Android Studio")

#### Visual Studio Code

#### Visual Studio Code

To open the Widget Previewer in Visual Studio Code, open the
"Flutter Widget Preview" tab in the sidebar:

在 Visual Studio Code 中打开 Widget 预览器：在侧边栏打开 "Flutter Widget Preview" 标签页：

![Flutter Widget Previewer in Visual Studio Code](/assets/images/docs/tools/widget-previewer/vscode.png "Visual Studio Code")

### Command line

### 命令行

To start the Flutter Widget Previewer, navigate to your
Flutter project's root directory and run the following
command in your terminal. This will launch a local server
and open a Widget Preview environment in Chrome that
automatically updates based on changes to your project.

要启动 Flutter Widget 预览器，请进入 Flutter 项目根目录，
在终端运行以下命令。这会启动本地服务器，
并在 Chrome 中打开会根据项目变更自动更新的 Widget Preview 环境。

```shell
flutter widget-preview start
```

## Preview a widget

## 预览 widget

After you've started the previewer, to look at a widget,
you must use the [`@Preview`][] annotation defined in
`package:flutter/widget_previews.dart`. This annotation
can be applied to:

启动预览器后，要查看 widget，必须使用
`package:flutter/widget_previews.dart` 中定义的 [`@Preview`][] 注解。该注解可应用于：

- **Top-level functions** that return a `Widget` or
  `WidgetBuilder`.
- **Static methods** within a class that return a `Widget` or
  `WidgetBuilder`.
- **Public Widget constructors and factories** with no
  required arguments.

- 返回 `Widget` 或 `WidgetBuilder` 的 **顶层函数**。
- 返回 `Widget` 或 `WidgetBuilder` 的类内 **静态方法**。
- 无必需参数的 **公共 Widget 构造函数和工厂**。

Here is a basic example of how to use the
`@Preview` annotation to preview a `Text` widget:

以下是使用 `@Preview` 注解预览 `Text` widget 的基本示例：

```dart
import 'package:flutter/widget_previews.dart';
import 'package:flutter/material.dart'; // For Material widgets

@Preview(name: 'My Sample Text')
Widget mySampleText() {
  return const Text('Hello, World!');
}
```

![Sample widget in Flutter Widget Previewer](/assets/images/docs/tools/widget-previewer/widget-previewer.png "Example widget")

Each preview instance provides various controls for
interacting with the previewed widget. From left to right:

每个预览实例提供多种控件，用于与预览中的 widget 交互。从左到右：

- **Zoom in:** Magnifies the widget in the preview.

- **放大：** 放大预览中的 widget。

- **Zoom out:** Reduces the magnification of the widget in
  the preview.

- **缩小：** 减小预览中的放大倍数。

- **Reset zoom:** Returns the widget preview to its
  default zoom level.

- **重置缩放：** 将 widget 预览恢复为默认缩放级别。

- **Toggle between light and dark mode:** Switches the
  preview's theme between a light and dark color scheme.

- **切换浅色/深色模式：** 在浅色与深色配色方案之间切换预览主题。

- **Perform a hot restart for the individual preview:**
  Restarts only the specific widget preview,
  allowing changes to be applied quickly without
  restarting the entire application.

- **对单个预览执行热重启：** 仅重启该 widget 预览，
  可快速应用更改而无需重启整个应用。

For the case where global state has been modified
(for example, a static initializer has been changed), the
entire widget previewer can be told to hot restart using the
button at the bottom right of the environment.

若已修改全局状态（例如静态初始化器已更改），
可使用环境右下角的按钮让整个 widget 预览器热重启。

### Filter previews by selected file

### 按所选文件筛选预览

When viewing previews within an IDE, the widget previewer is
configured to filter the set of previews based on the currently
selected file:

在 IDE 中查看预览时，widget 预览器会按当前所选文件筛选预览集：

![Filter by previews selected file in Flutter Widget Previewer](/assets/images/docs/tools/widget-previewer/filter-by-file.gif "Filter previews by selected file")

To disable this behavior, toggle the "Filter previews by selected file"
option at the bottom left of the environment.

要禁用此行为，请切换环境左下角的 "Filter previews by selected file"（按所选文件筛选预览）选项。

## Customize a preview

## 自定义预览

The [`@Preview`][] annotation has several parameters you can
use to customize the preview:

[`@Preview`][] 注解提供多个参数，可用于自定义预览：

- **`name`**: A descriptive name for the preview.

- **`name`**：预览的描述性名称。

- **`group`**: A name used to group related previews together
  in the widget previewer.

- **`group`**：在 widget 预览器中将相关预览分组在一起的名称。

- **`size`**: Artificial size constraints using a
  `Size` object.

- **`size`**：使用 `Size` 对象施加的人工尺寸约束。

- **`textScaleFactor`**: A custom font scale.

- **`textScaleFactor`**：自定义字体缩放。

- **`wrapper`**: A function that wraps your previewed
  widget in a specific widget tree (for example, to inject
  application state into the widget tree with an
  `InheritedWidget`).

- **`wrapper`**：将预览 widget 包裹在特定 widget 树中的函数（例如通过 `InheritedWidget` 向 widget 树注入应用状态）。

- **`theme`**: A function to provide Material and
  Cupertino theming data.

- **`theme`**：提供 Material 与 Cupertino 主题数据的函数。

- **`brightness`**: The initial theme brightness.

- **`brightness`**：初始主题亮度。

- **`localizations`**: A function to apply a localization
  configuration.

- **`localizations`**：应用本地化配置的函数。

## Create custom preview annotations

## 创建自定义预览注解

To reduce the amount of boilerplate needed to define previews with
a common set of properties, the [`Preview`][] annotation class can be
extended to create custom preview annotations tailored for your project.

为减少使用一组通用属性定义预览所需的样板代码，可扩展 [`Preview`][] 注解类，
为项目创建定制的自定义预览注解。

Here's an example of a custom preview annotation that provides
theming data:

以下示例提供主题数据的自定义预览注解：

```dart
final class MyCustomPreview extends Preview {
  const MyCustomPreview({
    super.name,
    super.group,
    super.size,
    super.textScaleFactor,
    super.wrapper,
    super.brightness,
    super.localizations,
  }) : super(theme: MyCustomPreview.themeBuilder);

  static PreviewThemeData themeBuilder() {
    return PreviewThemeData(
      materialLight: ThemeData.light(),
      materialDark: ThemeData.dark(),
    );
  }
}
```

Extending the [`Preview`][] annotation class also allows for overriding
the [`Preview.transform()`][] method. This method is invoked by the widget previewer
and can be used to modify the preview at runtime, allowing for preview
configurations that would not otherwise be possible in a `const` context:

扩展 [`Preview`][] 注解类还可重写 [`Preview.transform()`][] 方法。
widget 预览器会调用此方法，在运行时修改预览，
从而实现 `const` 上下文中无法实现的预览配置：

```dart
final class TransformativePreview extends Preview {
  const TransformativePreview({
    super.name,
    super.group,
    super.size,
    super.textScaleFactor,
    super.wrapper,
    super.brightness,
    super.localizations,
  });

  // Note: this is no longer public or static as it's injected
  // at runtime when transform() is invoked.
  PreviewThemeData _themeBuilder() {
    return PreviewThemeData(
      materialLight: ThemeData.light(),
      materialDark: ThemeData.dark(),
    );
  }

  @override
  Preview transform() {
    final originalPreview = super.transform();
    // Create's a PreviewBuilder that can be used to modify
    // the preview contents.
    final builder = originalPreview.toBuilder();
    builder
      ..name = 'Transformed - ${originalPreview.name}'
      ..theme = _themeBuilder;

    // Return the updated Preview instance.
    return builder.toPreview();
  }
}
```

## Creating multiple preview configurations

## 创建多种预览配置

Creating multiple previews with different configurations can be as
simple as applying multiple [`@Preview`][] annotations to a single
function or constructor:

为同一函数或构造函数应用多个 [`@Preview`][] 注解，
即可轻松创建多种不同配置的预览：

```dart
@Preview(
  group: 'Brightness',
  name: 'Example - light',
  brightness: Brightness.light,
)
@Preview(
  group: 'Brightness',
  name: 'Example - dark',
  brightness: Brightness.dark,
)
Widget buttonPreview() => const ButtonShowcase();
```

![Multiple previews in Flutter Widget Previewer](/assets/images/docs/tools/widget-previewer/multi-preview.png "Multiple preview example")

To simplify creating multiple previews with common configurations, you
can extend the [`MultiPreview`][] to create a custom annotation that creates
multiple previews. The following [`MultiPreview`][] creates
the same two previews as the previous example:

要简化使用通用配置创建多个预览，可扩展 [`MultiPreview`][] 创建会生成多个预览的自定义注解。
以下 [`MultiPreview`][] 会创建与上一示例相同的两项预览：

```dart
/// Creates light and dark mode previews.
final class MultiBrightnessPreview extends MultiPreview {
  const MultiBrightnessPreview();

  @override
  List<Preview> get previews => const [
        Preview(
          group: 'Brightness',
          name: 'Example - light',
          brightness: Brightness.light,
        ),
        Preview(
          group: 'Brightness',
          name: 'Example - dark',
          brightness: Brightness.dark,
        ),
      ];
}

@MultiBrightnessPreview()
Widget buttonPreview() => const ButtonShowcase();
```

Like [`Preview`][], [`MultiPreview`][] also provides a
[`MultiPreview.transform()`][] method to perform transformations
on each preview at runtime:

与 [`Preview`][] 类似，[`MultiPreview`][] 也提供 [`MultiPreview.transform()`][] 方法，
在运行时对每个预览进行变换：

```dart
/// Creates light and dark mode previews.
final class MultiBrightnessPreview extends MultiPreview {
  const MultiBrightnessPreview({required this.name});

  final String name;

  @override
  List<Preview> get previews => const [
        Preview(brightness: Brightness.light),
        Preview(brightness: Brightness.dark),
      ];

  @override
  List<Preview> transform() {
    final previews = super.transform();
    return previews.map((preview) {
      final builder = preview.toBuilder()
        ..group = 'Brightness'
        // Building names based on values provided to the annotation
        // isn't possible within a constant constructor. However,
        // there's no such restriction when building a Preview at
        // runtime.
        ..name = '$name - ${preview.brightness!.name}';
      return builder.toPreview();
    }).toList();
  }
}

@MultiBrightnessPreview(name: 'Example')
Widget buttonPreview() => const ButtonShowcase();
```

## Restrictions and limitations

## 限制与约束

The Flutter Widget Previewer has certain restrictions you
should be aware of:

使用 Flutter Widget 预览器时应注意以下限制：

- **Public callback names**: All callback arguments provided to
  preview annotations must be public and constant.
  This is required for the previewer's code generation
  implementation to work correctly.

- **公共回调名称**：提供给预览注解的所有回调参数必须是 public 且为 constant。
  预览器的代码生成实现需要如此才能正常工作。

- **Unsupported APIs**: Native plugins and any APIs from
  the `dart:io` or `dart:ffi` libraries are not supported.
  This is because the widget previewer is built with
  Flutter Web, which doesn't have access to the underlying
  native platform APIs. While web plugins might work when
  using Chrome, there is no guarantee that they will work
  within other environments, such as when embedded in
  IDEs.

  Widgets with transitive dependencies on `dart:io` or `dart:ffi` will
  load correctly, but all APIs from these libraries will throw an
  exception when invoked.

  See the [Dart documentation on conditional imports] for details
  on how to structure your application to cleanly support
  platform-specific libraries when targeting multiple platforms.

- **不支持的 API**：不支持原生插件以及 `dart:io` 或 `dart:ffi` 库中的任何 API。
  因为 widget 预览器基于 Flutter Web 构建，无法访问底层原生平台 API。
  在 Chrome 中 Web 插件可能可用，但不保证在其他环境（例如嵌入 IDE 时）也能工作。

  对 `dart:io` 或 `dart:ffi` 有传递依赖的 widget 可以正常加载，
  但调用这些库中的 API 时会抛出异常。

  有关如何在面向多平台时整洁地支持平台特定库，请参阅 [Dart documentation on conditional imports][]（Dart 条件导入文档）。

- **Asset paths**: When using `fromAsset` APIs from
  `dart:ui` to load resources, you must use
  **package-based paths** instead of direct local paths.
  This ensures that the assets can be correctly located
  and loaded within the previewer's web environment. For
  example, use `'packages/my_package_name/assets/my_image.png'`
  instead of `'assets/my_image.png'`.

- **资源路径**：使用 `dart:ui` 的 `fromAsset` API 加载资源时，
  必须使用 **基于 package 的路径**，而非直接本地路径。
  这样资源才能在预览器的 Web 环境中正确定位和加载。
  例如使用 `'packages/my_package_name/assets/my_image.png'`，
  而不是 `'assets/my_image.png'`。

- **Unconstrained widgets**: Unconstrained widgets are
  automatically constrained to approximately half the
  height and width of the widget previewer. This behavior
  is likely to change in the future, so constraints should
  be applied using the `size` parameter when possible.

- **无约束 widget**：无约束 widget 会自动约束为约为 widget 预览器高度和宽度的一半。
  此行为未来可能变更，因此尽可能使用 `size` 参数施加约束。

- **Multi-project support in IDEs**: The widget previewer
  currently only supports displaying previews contained
  within a single project or Pub workspace. We're actively
  investigating options to support IDE sessions with multiple
  Flutter projects ([#173550][]).

- **IDE 中的多项目支持**：widget 预览器目前仅支持显示单个项目或 Pub 工作区内的预览。
  我们正在积极研究支持包含多个 Flutter 项目的 IDE 会话的方案 ([#173550][])。

[`@Preview`]: {{site.api}}/flutter/widget_previews/Preview-class.html
[`Preview`]: {{site.api}}/flutter/widget_previews/Preview-class.html
[`Preview.transform()`]: {{site.api}}/flutter/widget_previews/Preview/transform.html
[`MultiPreview`]: {{site.api}}/flutter/widget_previews/MultiPreview-class.html
[`MultiPreview.transform()`]: {{site.api}}/flutter/widget_previews/MultiPreview/transform.html
[Dart documentation on conditional imports]: {{site.dart-site}}/tools/pub/create-packages#conditionally-importing-and-exporting-library-files
[#166431]: https://github.com/flutter/flutter/issues/166431
[#173550]: https://github.com/flutter/flutter/issues/173550
