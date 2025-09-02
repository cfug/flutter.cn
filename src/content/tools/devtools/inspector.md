---
# title: Use the Flutter inspector
title: 使用 Flutter inspector 工具
# description: Learn how to use the Flutter inspector to explore a Flutter app's widget tree.
description: 学习如何使用 Flutter inspector 来检查 Flutter 应用的 widget 树。
tags: Flutter开发工具,DevTools
keywords: Flutter inspector,widget 树
---

<?code-excerpt path-base="visual_debugging/"?>

:::note

The inspector works with all Flutter applications.

Flutter inspector 适用于所有 Flutter 应用。

:::

For information on how to locate DevTools screens in different IDEs,
check out the [DevTools overview](/tools/devtools).

有关如何在不同 IDE 中找到 DevTools 的信息，
请查阅 [DevTools 概览](/tools/devtools)。

## What is it?

## 这是什么？

The Flutter widget inspector is a powerful tool for visualizing and
exploring Flutter widget trees. The Flutter framework uses widgets
as the core building block for anything from controls
(such as text, buttons, and toggles),
to layout (such as centering, padding, rows, and columns).
The inspector helps you visualize and explore Flutter widget
trees, and can be used for the following:

Flutter widget inspector 是一个强大的工具，用于可视化和查看 widget 树。
Flutter 框架层使用 widgets 作为核心构建模块来处理从控件
（例如文本、按钮和切换等）到布局（例如居中、填充、行和列等）的所有内容。
Flutter inspector 不仅可以帮助你可视化查看 Flutter widget 树，还有其他的作用：

* understanding existing layouts

  了解现有布局

* diagnosing layout issues

  诊断布局问题

![Screenshot of the Flutter inspector window](/assets/images/docs/tools/devtools/inspector_screenshot.png){:width="100%"}

## The new Flutter inspector {:#new}

## 新的 Flutter inspector

As part of Flutter 3.29, the new Flutter inspector is enabled by default. However, it can be disabled from the [inspector settings dialog][].

新的 Flutter inspector 作为 Flutter 3.29 版本的一部分，已经默认启用了。
不过，你还可以通过 [inspector 设置对话框][inspector settings dialog] 来禁用它。

[inspector settings dialog]: #inspector-settings
[legacy inspector]: /tools/devtools/legacy-inspector
[filing a bug]: https://github.com/flutter/devtools/issues/new 

### Debugging layout issues visually

### 可视化地调试布局问题

The following is a guide to the features available in the
inspector's toolbar. When space is limited, the icon is
used as the visual version of the label.

下面是 Flutter inspector 工具栏中可用功能的指南。
当空间有限时，将直接使用图标展示。

![Select widget mode button](/assets/images/docs/tools/devtools/select-widget-mode-button.png)
**Select widget mode**
<br/> Enable this button in order to select
  a widget on the device to inspect it. To learn more,
  check out [Inspecting a widget](#inspecting-a-widget).

![Select widget mode button](/assets/images/docs/tools/devtools/select-widget-mode-button.png)
**选择 widget 模式**
<br/> 启用此按钮以在设备上选择 widget 进行查看。
  有关更多信息，请参考 [查看 widget](#inspecting-a-widget)。

![Show implementation widgets button](/assets/images/docs/tools/devtools/show-implementation-widgets-button.png)
**Show implementation widgets**
<br/> Enable this button in to show implementation widgets in the widget tree. To learn more,
  check out [Use the Widget Tree](#use-the-widget-tree).

![Show implementation widgets button](/assets/images/docs/tools/devtools/show-implementation-widgets-button.png)
**显示 widget 的实现情况**
<br/> 启用此按钮以在 widget 树中显示 widget 的实现情况。
  有关更多信息，请参考 [使用 widget 树](#use-the-widget-tree)。

![Refresh tree icon](/assets/images/docs/tools/devtools/refresh-tree-icon.png){:.theme-icon width="20px"} **Refresh tree**
<br/> Reload the current widget info.

![Refresh tree icon](/assets/images/docs/tools/devtools/refresh-tree-icon.png){:.theme-icon width="20px"} **刷新树**
<br/> 重新加载当前 widget 的信息。

![Slow animations icon](/assets/images/docs/tools/devtools/slow-animations-icon.png){:.theme-icon width="20px"} **[Slow animations][]**
<br/> Run animations 5 times slower to help fine-tune them.

![Slow animations icon](/assets/images/docs/tools/devtools/slow-animations-icon.png){:.theme-icon width="20px"} **[慢速动画][Slow animations]**
<br/> 以五分之一的速度运行动画以便对它们进行优化。

![Show guidelines mode icon](/assets/images/docs/tools/devtools/debug-paint-mode-icon.png){:.theme-icon width="20px"} **[Show guidelines][]**
<br/> Overlay guidelines to assist with fixing layout issues.

![Show guidelines mode icon](/assets/images/docs/tools/devtools/debug-paint-mode-icon.png){:.theme-icon width="20px"} **[显示引导线][Show guidelines]**
<br/> 覆盖一层引导线以帮助调整布局问题。

![Show baselines icon](/assets/images/docs/tools/devtools/paint-baselines-icon.png){:.theme-icon width="20px"} **[Show baselines][]**
<br/> Show baselines, which are used for aligning text.
  Can be useful for checking if text is aligned.

![Show baselines icon](/assets/images/docs/tools/devtools/paint-baselines-icon.png){:.theme-icon width="20px"} **[显示基线][Show baselines]**
<br/> 针对文字对齐展示文字的基线。对检查文字是否对齐有帮助。

![Highlight repaints icon](/assets/images/docs/tools/devtools/repaint-rainbow-icon.png){:.theme-icon width="20px"} **[Highlight repaints][]**
<br/> Show borders that change color when elements repaint.
  Useful for finding unnecessary repaints.

![Highlight repaints icon](/assets/images/docs/tools/devtools/repaint-rainbow-icon.png){:.theme-icon width="20px"} **[高亮重绘制内容][Highlight repaints]**
<br/> 元素重新绘制时，会依次显示不同颜色的边框。
  用于查找不必要的重绘。

![Highlight oversized images icon](/assets/images/docs/tools/devtools/invert_oversized_images_icon.png){:.theme-icon width="20px"} **[Highlight oversized images][]**
<br/> Highlights images that are using too much memory
  by inverting colors and flipping them.

![Highlight oversized images icon](/assets/images/docs/tools/devtools/invert_oversized_images_icon.png){:.theme-icon width="20px"} **[高亮尺寸过大的图片][Highlight oversized images]**
<br/> 在运行的应用程序中高亮并反转消耗过多内存的图像。

[Slow animations]: #slow-animations
[Show guidelines]: #show-guidelines
[Show baselines]: #show-baselines
[Highlight repaints]: #highlight-repaints
[Highlight oversized images]: #highlight-oversized-images

## Inspecting a widget

## 检查一个 widget

You can browse the interactive widget tree to view nearby
widgets and see their field values.

你可以浏览 widget 树并查看其附近的 widgets 和它们的属性值。

To locate individual UI elements in the widget tree,
click the **Select Widget Mode** button in the toolbar.
This puts the app on the device into a "widget select" mode.
Click any widget in the app's UI; this selects the widget on the
app's screen, and scrolls the widget tree to the corresponding node.
Toggle the **Select Widget Mode** button again to exit
widget select mode.

要在 widget 树中找到单个 UI 元素，
请点击工具栏中的 **Select Widget Mode** 按钮。
这将使设备上的应用程序进入「widget select」模式。
点击应用界面上的任何 widget，将选中 widget 并将 widget 树滚动到对应的节点。
再次点击 **Select Widget Mode** 按钮则退出「widget select」模式。

When debugging layout issues, the key fields to look at are the
`size` and `constraints` fields. The constraints flow down the tree,
and the sizes flow back up. For more information on how this works,
see [Understanding constraints][].

在调试布局问题时，要查看的关键字段是 `size` 和 `constraints`。
其中约束沿树结构向下传递，尺寸信息则向上返回。
想要了解更多信息，可以查看 [深入理解 Flutter 布局约束][Understanding constraints]。

## Flutter Widget Tree

## Flutter Widget 树

The Flutter Widget Tree allows you to visualize, understand and navigate your app's Widget tree. 

Flutter Widget 树允许你可视化、了解以及浏览你的应用 Widget 树。

![Image of Flutter inspector with Widget Tree highlighted](/assets/images/docs/tools/devtools/inspector-widget-tree.png){:width="100%"}

### Use the Widget Tree

### 使用 Widget 树

#### Viewing widgets created in your project

#### 查看项目中创建的 Widget

By default, the Flutter Widget Tree includes all the widgets created in your root
project's directory.

默认情况下，Flutter Widget 树包括在你的根项目目录下创建的所有 Widget。

The parent-children relationships of the widgets are represented by a single vertical line (if the parent widget only has a single child) or through 
indentation (if the parent widget has multiple children.)

Widget 的父子关系用一条垂直线表示（如果父 Widget 只有一个子 Widget），
或者通过缩进表示（如果父 Widget 有多个子 Widget）。

For example, for the following section of a widget tree:

例如，以下 Widget 树的内容：

![Image of widget tree section](/assets/images/docs/tools/devtools/widget-tree.png){:width="100%"}

* `Padding` has a single child `Row`

  `Padding` 有一个子 Widget `Row`

* `Row` has three children: `Icon`, `SizedBox`, and `Flexible`

  `Row` 有三个子 Widget：`Icon`、`SizedBox` 和 `Flexible`

* `Flexible` has a single child `Column`

  `Flexible` 有一个子 Widget `Column`

* `Column` has four children: `Text`, `Text`, `SizedBox`, and `Divider`

  `Column` 有四个子 Widget：`Text`、`Text`、`SizedBox` 和 `Divider`

#### Viewing all widgets

To instead view all the widgets in your widget tree, including
those that were created outside of your project, toggle on "Show implementation widgets". 

The implementation widgets are shown in a lighter font than the widgets created in your project,
thereby visually distinguishing them. They are also hidden behind collapsible groups
which can be expanded via the inline expand buttons.

For example, here is the same section of a widget tree as above with implementation widgets shown:

![Image of widget tree section showing implementation widgets](/assets/images/docs/tools/devtools/widget-tree-with-implementation-widgets.png){:width="100%"}

* `Icon` has five implementation widgets collapsed beneath it
* Both `Text` widgets have `RichText` implementation widget children
* `Divider` has nine implementation widgets collapsed beneath it

## Flutter Widget Explorer

The Flutter Widget Explorer helps you to better understand
the inspected widget.

![Image of Flutter inspector with Widget Explorer highlighted](/assets/images/docs/tools/devtools/inspector-widget-explorer.png){:width="100%"}

### Use the Widget Explorer

From the Flutter inspector, select a widget. The Widget Explorer will be shown on the right side of the window.

Depending on the selected widget, the Widget Explorer will include one or more of the following:

* Widget properties tab
* Flex explorer tab
* Render object tab

#### Widget properties tab

![Image of widget properties tab](/assets/images/docs/tools/devtools/widget-properties-tab.png){:width="100%"}

The properties tab shows you mini-view of your widget layout, including
width, height, and padding, along with a list of properties on that widget.

These properties include whether or not the value matches the default value
for the property argument.

#### Render object tab

![Image of render object tab](/assets/images/docs/tools/devtools/render-object-tab.png){:width="100%"}

The render object tab displays all the properties set on the render object of the
selected Flutter widget.

#### Flex explorer tab

#### Flex explorer 选项卡

![Image of flex explorer tab](/assets/images/docs/tools/devtools/flex-explorer-tab.png){:width="100%"}

When you select a flex widget (for example, [`Row`][], [`Column`][], [`Flex`][])
or a direct child of a flex widget, the flex explorer tool will
appear in the Widget Explorer.

当你选择了一个弹性布局 flex widget（例如，[`Row`][]、[`Column`][]、[`Flex`][]）
或它的子 widget 时，Flex explorer 工具将显示在 Widget Explorer 中。

The flex explorer tool visualizes how [`Flex`][] widgets and their
children are laid out. The explorer identifies the main axis
and cross axis, as well as the current alignment for each
(for example, start, end, and spaceBetween).
It also shows details like flex factor, flex fit, and layout
constraints.

Flex explorer 工具会直观的显示 [`Flex`][] widget 及其子元素的布局方式。
explorer 中还会显示主轴和交叉轴，以及每个轴当前的对齐方式（例如，start、end 和 spaceBetween）。
它还显示了诸如弹性系数、弹性适配和布局约束等详细信息。

Additionally, the explorer shows layout constraint violations
and render overflow errors. Violated layout constraints
are colored red, and overflow errors are presented in the
standard "yellow-tape" pattern, as you might see on a running
device. These visualizations aim to improve understanding of
why overflow errors occur as well as how to fix them.

此外，explorer 中还会显示布局约束冲突和渲染溢出错误。
正如你在设备上看到的那样，违背布局约束的地方会被标记成红色，溢出错误以标准的「黄色条带」显示。
这些可视化的错误是为了让我们更好地理解溢出错误发生的原因，
并了解如何修复它们。

![The flex explorer showing errors and device inspector](/assets/images/docs/tools/devtools/layout_explorer_errors_and_device.webp){:width="100%"}

Clicking a widget in the flex explorer mirrors
the selection on the on-device inspector. **Select Widget Mode**
needs to be enabled for this. To enable it,
click on the **Select Widget Mode** button in the inspector.

在 **Select Widget Mode** 模式下，点击 Flex explorer 中的 widget 会同步选择到设备上。
启用此模式，请点击调试面板中的 **Select Widget Mode** 按钮。

![The Select Widget Mode button in the inspector](/assets/images/docs/tools/devtools/select-widget-mode-button.png)

For some properties, like flex factor, flex fit, and alignment,
you can modify the value via dropdown lists in the explorer.
When modifying a widget property, you see the new value reflected
not only in the flex explorer, but also on the
device running your Flutter app. The explorer animates
on property changes so that the effect of the change is clear.
Widget property changes made from the layout explorer don't
modify your source code and are reverted on hot reload.

你可以在 explorer 的下拉列表修改属性值，
例如弹性系数、弹性适配和对齐方式。
当修改 widget 的属性时，你会看到新的值同时在 Flex explorer 和运行 Flutter 应用程序的设备上生效。
explorer 通过动画使更改的效果清晰可见。
从 Layout explorer 中对 widget 属性的更改不会修改源代码，将在热重载时还原。

##### Interactive Properties

##### 交互属性

The flex explorer supports modifying [`mainAxisAlignment`][],
[`crossAxisAlignment`][], and [`FlexParentData.flex`][].
In the future, we may add support for additional properties
such as [`mainAxisSize`][], [`textDirection`][], and
[`FlexParentData.fit`][].

Flex explorer 支持修改 [`mainAxisAlignment`][]、[`crossAxisAlignment`][] 和 [`FlexParentData.flex`][]。
将来，我们可能会添加对其他属性的支持，例如 [`mainAxisSize`][]、[`textDirection`][] 和 [`FlexParentData.fit`][].

###### mainAxisAlignment

![The flex explorer changing main axis alignment](/assets/images/docs/tools/devtools/layout_explorer_main_axis_alignment.webp){:width="100%"}

Supported values:

支持属性：

- `MainAxisAlignment.start`
- `MainAxisAlignment.end`
- `MainAxisAlignment.center`
- `MainAxisAlignment.spaceBetween`
- `MainAxisAlignment.spaceAround`
- `MainAxisAlignment.spaceEvenly`

###### crossAxisAlignment

![The flex explorer changing cross axis alignment](/assets/images/docs/tools/devtools/layout_explorer_cross_axis_alignment.webp){:width="100%"}

Supported values:

支持属性：

- `CrossAxisAlignment.start`
- `CrossAxisAlignment.center`
- `CrossAxisAlignment.end`
- `CrossAxisAlignment.stretch`

###### FlexParentData.flex

![The flex explorer changing flex factor](/assets/images/docs/tools/devtools/layout_explorer_flex.webp){:width="100%"}

The flex explorer supports 7 flex options in the UI
(null, 0, 1, 2, 3, 4, 5), but technically the flex
factor of a flex widget's child can be any int.

Flex explorer 支持设置 7 种弹性因子（null、0、1、2、3、4、5），
但从技术上讲，弹性 widget 子级的弹性因子可以是任何整数。

###### Flexible.fit

![The flex explorer changing fit](/assets/images/docs/tools/devtools/layout_explorer_fit.webp){:width="100%"}

The flex explorer supports the two different types of
[`FlexFit`][]: `loose` and `tight`.

Flex explorer 支持两种不同类型的 [`FlexFit`][]：`loose` 和 `tight`。

## Visual debugging

## 调试视觉效果

The Flutter Inspector provides several options for visually debugging your app.

![Inspector visual debugging options](/assets/images/docs/tools/devtools/visual_debugging_options.png){:width="100%"}

Flutter Inspector 提供了多种以可视化方式调试应用的方式。
以下是在 Flutter DevTools 中的 inspector 可用的选项：

### Slow animations

### 慢速动画

When enabled, this option runs animations 5 times slower for easier visual
inspection.
This can be useful if you want to carefully observe and tweak an animation that
doesn't look quite right.

启用时，动画将以约五分之一的原有速度运行，方便对视觉效果进行检查。
当你想要仔细地观察并调试看起来不正常的动画时，这个选项会非常有用。

This can also be set in code:

你也可以使用代码设置：

<?code-excerpt "lib/slow_animations.dart"?>
```dart
import 'package:flutter/scheduler.dart';

void setSlowAnimations() {
  timeDilation = 5.0;
}
```

This slows the animations by 5x.

这会让动画时长增加 5 倍（速度减慢 5 倍）。

#### See also

#### 更多内容

The following links provide more info.

以下的链接提供了更多细节内容。

* [Flutter documentation: timeDilation property]({{site.api}}/flutter/scheduler/timeDilation.html)

  [Flutter 文档：timeDilation 属性]({{site.api}}/flutter/scheduler/timeDilation.html) 

以下的录屏展示了动画减速前后的对比。

![Screen recording showing normal animation speed](/assets/images/docs/tools/devtools/debug-toggle-slow-animations-disabled.webp)
![Screen recording showing slowed animation speed](/assets/images/docs/tools/devtools/debug-toggle-slow-animations-enabled.webp)

### Show guidelines

### 显示引导线

This feature draws guidelines over your app that display render boxes, alignments,
paddings, scroll views, clippings and spacers.

该功能会在你的应用顶层绘制引导线，展示绘制区域、对齐、间距、滚动视图、裁剪和空位填充。

This tool can be used for better understanding your layout. For instance,
by finding unwanted padding or understanding widget alignment.

这个工具能帮助你更加了解你的布局。例如查找不需要的填充或者理解 widget 的对齐方式。

You can also enable this in code:

你也可以通过代码启用：

<?code-excerpt "lib/layout_guidelines.dart"?>
```dart
import 'package:flutter/rendering.dart';

void showLayoutGuidelines() {
  debugPaintSizeEnabled = true;
}
```

#### Render boxes

#### RenderBox

Widgets that draw to the screen create a [render box][], the
building blocks of Flutter layouts. They're shown with a bright blue border:

绘制在屏幕上的 widgets 会创建一个 [RenderBox][render box]，
它是 Flutter 布局的基础构建。
这些 RenderBox 会加上一个浅蓝色的边框：

![Screenshot of render box guidelines](/assets/images/docs/tools/devtools/debug-toggle-guideline-render-box.png)

#### Alignments

#### 对齐方式

Alignments are shown with yellow arrows. These arrows show the vertical
and horizontal offsets of a widget relative to its parent.
For example, this button's icon is shown as being centered by the four arrows:

对齐方式将以黄色箭头展示。
这些箭头会显示出垂直和竖屏方向上 widget 相对其父布局的偏移。
例如，这个按钮图标有四个箭头表示它被居中展示：

![Screenshot of alignment guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-alignment.png)

#### Padding

#### 间距

Padding is shown with a semi-transparent blue background:

间距会以半透明的蓝色背景显示：

![Screenshot of padding guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-padding.png)

#### Scroll views

#### 滚动视图

Widgets with scrolling contents (such as list views) are shown with green arrows:

包含滚动内容的 widget（例如 ListView）会展示绿色的箭头：

![Screenshot of scroll view guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-scroll.png)

#### Clipping

#### 裁剪

Clipping, for example when using the [ClipRect widget][], are shown
with a dashed pink line with a scissors icon:

使用了诸如 [ClipRect Widget][] 进行裁剪的内容，会以粉红色的虚线加一个剪刀图标展示：

[ClipRect widget]: {{site.api}}/flutter/widgets/ClipRect-class.html

![Screenshot of clip guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-clip.png)

#### Spacers

#### 空位填充

Spacer widgets are shown with a grey background,
such as this `SizedBox` without a child:

空位填充的 widgets 会以灰色背景展示，例如没有 child 的 `SizedBox`：

![Screenshot of spacer guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-spacer.png)

### Show baselines

### 显示基线

This option makes all baselines visible.
Baselines are horizontal lines used to position text.

该选项会显示所有的基线。
基线是水平的用来定位文字的线。

This can be useful for checking whether text is precisely aligned vertically.
For example, the text baselines in the following screenshot are slightly misaligned:

在检查文字是否垂直对齐时，基线会非常有用。
例如，下图中文字的基线稍微有一些错位：

![Screenshot with show baselines enabled](/assets/images/docs/tools/devtools/debug-toggle-guidelines-baseline.png)

The [Baseline][] widget can be used to adjust baselines.

[Baseline][] widget 可以用来调整基线。

[Baseline]: {{site.api}}/flutter/widgets/Baseline-class.html

A line is drawn on any [render box][] that has a baseline set;
alphabetic baselines are shown as green and ideographic as yellow.

在设置了基线的 [RenderBox][render box] 上，都会显示一条线。
字母的基线以绿色展示，而符号的基线以黄色展示。

You can also enable this in code:

你也可以通过代码启用：

<?code-excerpt "lib/show_baselines.dart"?>
```dart
import 'package:flutter/rendering.dart';

void showBaselines() {
  debugPaintBaselinesEnabled = true;
}
```

### Highlight repaints

### 高亮重绘制内容

This option draws a border around all [render boxes][]
that changes color every time that box repaints.

该选项会为所有的 [RenderBox][render boxes] 绘制一层边框，
在它们重新绘制时改变颜色。

[render boxes]: {{site.api}}/flutter/rendering/RenderBox-class.html

This rotating rainbow of colors is useful for finding parts of your app
that are repainting too often and potentially harming performance.

以彩虹色谱循环的颜色，有利于你找到应用中频繁重绘导致性能消耗过大的部分。

For example, one small animation could be causing an entire page
to repaint on every frame.
Wrapping the animation in a [RepaintBoundary widget][] limits
the repainting to just the animation.

例如，一个小动画可能会导致整个页面一直在重绘。
将动画使用 [RepaintBoundary widget][] 嵌套，可以保证动画只会导致其本身重绘。

[RepaintBoundary widget]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html

Here the progress indicator causes its container to repaint:

下面是一个进度指示器导致其容器重绘的例子：

<?code-excerpt "lib/highlight_repaints.dart (everything-repaints)"?>
```dart
class EverythingRepaintsPage extends StatelessWidget {
  const EverythingRepaintsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repaint Example')),
      body: const Center(child: CircularProgressIndicator()),
    );
  }
}
```

![Screen recording of a whole screen repainting](/assets/images/docs/tools/devtools/debug-toggle-guidelines-repaint-1.webp)

Wrapping the progress indicator in a `RepaintBoundary` causes
only that section of the screen to repaint:

将进度指示器使用 `RepaintBoundary` 包裹，
可以将重绘范围缩小至它本身占有的区域。

<?code-excerpt "lib/highlight_repaints.dart (area-repaints)"?>
```dart
class AreaRepaintsPage extends StatelessWidget {
  const AreaRepaintsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repaint Example')),
      body: const Center(
        child: RepaintBoundary(child: CircularProgressIndicator()),
      ),
    );
  }
}
```

![Screen recording of a just a progress indicator repainting](/assets/images/docs/tools/devtools/debug-toggle-guidelines-repaint-2.webp)

`RepaintBoundary` widgets have tradeoffs. They can help with performance,
but they also have an overhead of creating a new canvas,
which uses additional memory.

`RepaintBoundary` widget 也有一些额外的消耗。
它们对性能有一定的帮助，但也会在创建额外的绘制画布时增加一定的内存消耗。

You can also enable this option in code:

你也可以通过代码启用：

<?code-excerpt "lib/highlight_repaints.dart (toggle)"?>
```dart
import 'package:flutter/rendering.dart';

void highlightRepaints() {
  debugRepaintRainbowEnabled = true;
}
```

### Highlight oversized images

### 高亮尺寸过大的图片

This option highlights images that are too large by both inverting their colors
and flipping them vertically:

该选项会将尺寸过大的图片高亮表示，并且进行垂直翻转及色调反转：

![A highlighted oversized image](/assets/images/docs/tools/devtools/debug-toggle-guidelines-oversized.png)

The highlighted images use more memory than is required;
for example, a large 5MB image displayed at 100 by 100 pixels.

被高亮的图片使用了过多的内存。
例如一张 5MB 大小的图片以 100x100 像素展示。

Such images can cause poor performance, especially on lower-end devices
and when you have many images, as in a list view,
this performance hit can add up.
Information about each image is printed in the debug console:

这样的图片会导致性能低下，在低端设备上尤为明显，
而当你在诸如列表中有大量这样的图片时，性能的下降会叠加。
调试控制台窗口中会打印每个图片的信息：

```console
dash.png has a display size of 213×392 but a decode size of 2130×392, which uses an additional 2542KB.
```

Images are deemed too large if they use at least 128KB more than required.

超过 128KB 的图片会被视为过大。

#### Fixing images

#### 调整图片

Wherever possible, the best way to fix this problem is resizing
the image asset file so it's smaller.

在可能的情况下，最好的办法是调整图片资源的大小，让它变得更小。

If this isn't possible, you can use the `cacheHeight` and `cacheWidth`
parameters on the `Image` constructor:

如果该方法不可行，你可以使用 `Image` 构造里的
`cacheHeight` 和 `cacheWidth` 参数：

<?code-excerpt "lib/oversized_images.dart (resized-image)"?>
```dart
class ResizedImage extends StatelessWidget {
  const ResizedImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Image.asset('dash.png', cacheHeight: 213, cacheWidth: 392);
  }
}
```

This makes the engine decode this image at the specified size,
and reduces memory usage (decoding and storage is still more expensive
than if the image asset itself was shrunk).
The image is rendered to the constraints of the layout or width and height
regardless of these parameters.

这样的方法可以让引擎以指定的大小解析图片，减少内存的消耗
（解析开销和空间占用相较图片调整图片本身仍然较大）。
无论如何设置参数，图片依然会以布局限制或大小进行渲染。

This property can also be set in code:

该属性同样可以使用代码设置：

<?code-excerpt "lib/oversized_images.dart (toggle)"?>
```dart
void showOversizedImages() {
  debugInvertOversizedImages = true;
}
```

#### More information

#### 更多内容

You can learn more at the following link:

以下的链接提供了更多细节内容：

- [Flutter documentation: debugInvertOversizedImages]({{site.api}}/flutter/painting/debugInvertOversizedImages.html)

  [Flutter 文档：debugInvertOversizedImages]({{site.api}}/flutter/painting/debugInvertOversizedImages.html)

[render box]: {{site.api}}/flutter/rendering/RenderBox-class.html

## Track widget creation

## 追踪 widget 创建

Part of the functionality of the Flutter inspector is based on
instrumenting the application code in order to better understand
the source locations where widgets are created. The source
instrumentation allows the Flutter inspector to present the
widget tree in a manner similar to how the UI was defined
in your source code. Without it, the tree of nodes in the
widget tree are much deeper, and it can be more difficult to
understand how the runtime widget hierarchy corresponds to
your application's UI.

Flutter inspector 的部分功能是基于检测应用程序的源码，以便更好地理解创建 widget 的源位置。
Flutter inspector 可以以类似于在源代码中定义 UI 的方式呈现 widget 树。
如果没有它，widget 树中的组成某个节点的树结构会更深，
并且更难理解运行时 widget 的层次结构如何与应用程序的 UI 相对应。

You can disable this feature by passing `--no-track-widget-creation` to
the `flutter run` command.

你可以通过在 `flutter run` 后面添加参数 `-no track widget creation` 来禁用此功能。

Here are examples of what your widget tree might look like
with and without track widget creation enabled.

下面是 widget 树在启用和不启用追踪 widget 创建下的示例。

Track widget creation enabled (default):

启用追踪 widget 创建（默认）：

![The widget tree with track widget creation enabled](/assets/images/docs/tools/devtools/track_widget_creation_enabled.png){:width="100%"}

Track widget creation disabled (not recommended):

关闭追踪 widget 创建（不推荐）：

![The widget tree with track widget creation disabled](/assets/images/docs/tools/devtools/track_widget_creation_disabled.png){:width="100%"}

This feature prevents otherwise-identical `const` Widgets from
being considered equal in debug builds. For more details, see
the discussion on [common problems when debugging][].

此功能可避免在调试构建中将其他相同的 `const` 的 Widgets 视为相同。
有关更多详细信息，请参阅关于 [调试时常见问题][common problems when debugging] 的讨论。

## Inspector settings

## 设置 Inspector

![The Flutter Inspector Settings dialog](/assets/images/docs/tools/devtools/flutter-inspector-settings.png){:width="100%"}

### Enable hover inspection

### 启用 hover 检测 (Enable hover inspection)

Hovering over any widget displays its properties and values.

将鼠标悬停在任意 widget 上，
会显示该 widget 的属性和值。

Toggling this value enables or disables the hover inspection functionality.

你可以切换 **Enable hover inspection** 
启用或禁用 hover 检测功能。

### Enable widget tree auto-refreshing

When enabled, the widget tree automatically refreshes after
a hot-reload or a navigation event. 

### Use legacy inspector

When enabled, use the [legacy inspector][] instead of the new inspector. 

:::note
The [legacy inspector][] will be removed in a future release.
Let us know if there are issues preventing you from using the new inspector by [filing a bug][].
:::

[legacy inspector]: /tools/devtools/legacy-inspector

### Package directories

By default, DevTools limits the widgets displayed in the widget tree to those created 
in the project's root directory. To see all widgets, including those created outside
of a the project's root directory, toggle on [Show implementation widgets][]

In order to include other widgets in the default widget tree, a parent directory of theirs must
be added to the Package Directories.

要在默认 widget 树中包含其他 widget，
必须在 Package Directories 中添加它们的父目录。

For example, consider the following directory structure:

例如，以下目录结构：

```plaintext
project_foo
  pkgs
    project_foo_app
    widgets_A
    widgets_B
```

Running your app from `project_foo_app` displays only widgets from
`project_foo/pkgs/project_foo_app` in the widget inspector tree.

从 `project_foo_app` 运行应用时，
只会在 widget inspector 树中
显示 `project_foo/pkgs/project_foo_app` 的 widget。

To show widgets from `widgets_A` in the widget tree,
add `project_foo/pkgs/widgets_A` to the package directories.

如果需要在 widget 树中显示 `widgets_A` 的 widget，
请在 Package Directories 中添加 `project_foo/pkgs/widgets_A`。

To display _all_ widgets from your project root in the widget tree,
add `project_foo` to the package directories.

如果需要在 widget 树中显示项目根目录下的 **所有** widget，
请在 Package Directories 中添加 `project_foo`。

Changes to your package directories persist the next time the
widget inspector is opened for the app.

你对 Package Directories 的更改是一直存在的，
下次打开应用程序的 widget inspector 时依旧生效，

[Show implementation widgets]: #debugging-layout-issues-visually

## Other resources

## 其他资源

For a demonstration of what's generally possible with the inspector,
see the [DartConf 2018 talk][] demonstrating the IntelliJ version
of the Flutter inspector.

有关 Flutter inspector 常用功能的演示，请参考 [DartConf 2018 talk][]
中基于 IntelliJ 上的演示。

To learn how to visually debug layout issues
using DevTools, check out a guided
[Flutter Inspector tutorial][inspector-tutorial].

想要学习如何使用 DevTools 以可视化的方式调试布局问题，
可以阅读 [Flutter 布局检查器教程][inspector-tutorial]。

[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[common problems when debugging]: /testing/debugging
[`crossAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/crossAxisAlignment.html
[DartConf 2018 talk]: {{site.bili.video}}/BV1h4411575y/
[debug mode]: /testing/build-modes#debug
[`Flex`]: {{site.api}}/flutter/widgets/Flex-class.html
[flex layouts]: {{site.api}}/flutter/widgets/Flex-class.html
[`FlexFit`]: {{site.api}}/flutter/rendering/FlexFit.html
[`FlexParentData.fit`]: {{site.api}}/flutter/rendering/FlexParentData/fit.html
[`FlexParentData.flex`]: {{site.api}}/flutter/rendering/FlexParentData/flex.html
[`mainAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/mainAxisAlignment.html
[`mainAxisSize`]: {{site.api}}/flutter/widgets/Flex/mainAxisSize.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`textDirection`]: {{site.api}}/flutter/widgets/Flex/textDirection.html
[Understanding constraints]: /ui/layout/constraints
[inspector-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-flutter-inspector-part-2-of-8-bbff40692fc7
