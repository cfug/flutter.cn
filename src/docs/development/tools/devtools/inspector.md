---
title: Using the Flutter inspector
title: 使用 Flutter inspector 工具
description: Learn how to use the Flutter inspector to explore a Flutter app's widget tree.
description: 学习如何使用 Flutter inspector 来检查 Flutter 应用的 widget 树。
tags: Flutter开发工具,DevTools
keywords: Flutter inspector,widget 树
---

{{site.alert.note}}

  The inspector works with all Flutter applications.
  
  Flutter inspector 适用于所有 Flutter 应用。
  
{{site.alert.end}}

## What is it?

## 这是什么?

The Flutter widget inspector is a powerful tool for visualizing and
exploring Flutter widget trees. The Flutter framework uses widgets
as the [core building block][] for anything from controls
(such as text, buttons, and toggles),
to layout (such as centering, padding, rows, and columns).
The inspector helps you visualize and explore Flutter widget
trees, and can be used for the following:

Flutter widget inspector 是一个强大的工具，用于可视化和查看 widget 树。
Flutter 框架层使用 widgets 作为 [核心构建模块][core building block]
来处理从控件（例如文本、按钮和切换等）到布局（例如居中、填充、行和列等）的所有内容。
Flutter inspector 不仅可以帮助你可视化查看 Flutter widget 树，还有其他的作用：

* understanding existing layouts

  了解现有布局

* diagnosing layout issues

  诊断布局问题

![Screenshot of the Flutter inspector window]({% asset tools/devtools/inspector_screenshot.png @path %}){:width="100%"}

## Get started

## 开始使用

To debug a layout issue, run the app in [debug mode][] and
open the inspector by clicking the **Flutter Inspector**
tab on the DevTools toolbar.

要调试布局问题，请在 [Debug 模式][debug mode] 下运行应用程序，
然后点击 DevTools 工具栏上的 **Flutter inspector** 选项打开调试面板。

{{site.alert.note}}

  You can still access the Flutter inspector directly from
  Android Studio/IntelliJ, but you might prefer the
  more spacious view when running it from DevTools
  in a browser.
  
  你可以直接在 Android Studio/IntelliJ 中使用 Flutter inspector，
  但是你可能会更喜欢使用 DevTools 在浏览器中打开 Flutter inspector，这样你能得到更宽敞的视图。
  
{{site.alert.end}}

### Debugging layout issues visually

### 可视化地调试布局问题

The following is a guide to the features available in the
inspector's toolbar. When space is limited, the icon is
used as the visual version of the label.

下面是 Flutter inspector 工具栏中可用功能的指南。
当空间有限时，将直接使用图标展示。

<dl markdown="1">
<dt markdown="1">**Select widget mode** ![Select widget mode icon]({% asset tools/devtools/select-widget-mode-icon.png @path %}){:width="20px"}</dt>
<dd markdown="1">
<p>Enable this button in order to select
    a widget on the device to inspect it. For more information,
    see [Inspecting a widget](#inspecting-a-widget).</p>
<p>启用此按钮以在设备上选择 widget 进行查看。
    有关更多信息，请参考 [查看 widget](#inspecting-a-widget)。</p>
<dt markdown="1">**Refresh tree** ![Refresh tree icon]({% asset tools/devtools/refresh-tree-icon.png @path %}){:width="20px"}</dt>
<dd><p>Reload the current widget info</p>
    <p>重新加载当前 widget 的信息。</p>
    </dd>
<dt markdown="1">**Slow Animations** ![Slow animations icon]({% asset tools/devtools/slow-animations-icon.png @path %}){:width="20px"}</dt>
<dd><p>Slow down animations to enable visual inspection.</p>
    <p>减慢动画以启用视觉检查。</p>
    </dd>
<dt markdown="1">**Debug Paint** ![Debug paint mode icon]({% asset tools/devtools/debug-paint-mode-icon.png @path %}){:width="20px"}</dt>
<dd><p>Add visual debugging hints to the rendering
    that display borders, padding, alignment, and spacers.</p>
    <p>为渲染对象添加边框、填充、对齐和间隔等可视化的调试提示。</p>
    </dd>
<dt markdown="1">**Paint Baselines** ![Baseline painting icon]({% asset tools/devtools/paint-baselines-icon.png @path %}){:width="20px"}</dt>
<dd><p>Cause each RenderBox to paint a line at each
    of its text baselines.</p>
    <p>对于每个 RenderBox，在其每个文本基线处绘制一条线。</p>
    </dd>
<dt markdown="1">**Repaint Rainbow** ![Repaint rainbow icon]({% asset tools/devtools/repaint-rainbow-icon.png @path %}){:width="20px"}</dt>
<dd><p>Shows rotating colors on layers when repainting.</p>
    <p>重新绘制时在图层上依次显示不同的颜色。</p>
    </dd>
<dt markdown="1">**Invert Oversized Images** ![Invert oversized images icon]({% asset tools/devtools/invert_oversized_images_icon.png @path %}){:width="20px"}</dt>
<dd><p>Inverts oversized images in your running application.</p>
    <p>在运行的应用程序中反转过大的图像。</p>
    </dd>
</dl>

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
再次点击 **Select Widget Mode** 按钮则退出 widget 选择模式。

When debugging layout issues, the key fields to look at are the
`size` and `constraints` fields. The constraints flow down the tree,
and the sizes flow back up. For more information on how this works,
see [Understanding constraints][].

在调试布局问题时，要查看的关键字段是 `size` 和 `constraints`。
其中约束沿树结构向下传递，尺寸信息则向上返回。
想要了解更多信息，可以查看 [深入理解 Flutter 布局约束][Understanding constraints]。

## Flutter Layout Explorer

## Flutter 布局浏览器

The Flutter Layout Explorer helps you to better understand
Flutter layouts.

Flutter 布局浏览器可以帮助你更好地理解 Flutter 布局。

For an overview of what you can do with this tool, see
the Flutter Explorer video:

有关此工具的操作概述，观看 Flutter Explorer 的介绍视频：

<iframe width="560" height="315" src="https://www.youtube.com/embed/Jakrc3Tn_y4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You might also find the following step-by-step article useful:

下面详细介绍的文章可能对你有帮助：

* [How to debug layout issues with the Flutter Inspector][debug-article]

  [如何使用 Flutter Inspector 调试布局问题][debug-article]

[debug-article]: {{site.medium}}/flutter/how-to-debug-layout-issues-with-the-flutter-inspector-87460a7b9db

### Using the Layout Explorer

### 使用布局浏览器

From the Flutter Inspector, select a widget. The Layout Explorer
supports both [flex layouts][] and fixed size layouts, and has
specific tooling for both kinds.

从 Flutter Inspector 中，选择一个 widget。
布局浏览器支持 [弹性布局][flex layouts] 和固定大小的布局，并且针对它们配备了特定的工具。

#### Flex layouts

#### 弹性布局

When you select a flex widget (for example, [`Row`][], [`Column`][], [`Flex`][])
or a direct child of a flex widget, the flex layout tool will
appear in the Layout Explorer.

当你选择了一个弹性布局 widget（例如，[`Row`][]、[`Column`][]、[`Flex`][]）
或它的子 widget 时，弹性布局工具将显示在布局浏览器中。

The Layout Explorer visualizes how [`Flex`][] widgets and their
children are laid out. The explorer identifies the main axis
and cross axis, as well as the current alignment for each
(for example, start, end, and spaceBetween).
It also shows details like flex factor, flex fit, and layout
constraints.

布局浏览器会直观的显示 [`Flex`][] widgets 及其子元素的布局方式。
浏览器中还会显示主轴和交叉轴，以及每个轴当前的对齐方式（例如，start、end 和 spaceBetween）。
它还显示了诸如弹性系数、弹性适配和布局约束等详细信息。

Additionally, the explorer shows layout constraint violations
and render overflow errors. Violated layout constraints
are colored red, and overflow errors are presented in the
standard  "yellow-tape" pattern, as you might see on a running
device. These visualizations aim to improve understanding of
why overflow errors occur as well as how to fix them.

此外，浏览器中还会显示布局约束冲突和渲染溢出错误。
正如你在设备上看到的那样，违背布局约束的地方会被标记成红色，溢出错误以标准的「黄色条带」显示。
这些可视化的错误是为了让我们更好地理解溢出错误发生的原因，
并了解如何修复它们。

![The Layout Explorer showing errors and device inspector]({% asset tools/devtools/layout_explorer_errors_and_device.gif @path %}){:width="100%"}

Clicking a widget in the layout explorer mirrors
the selection on the on-device inspector. **Select Widget Mode**
needs to be enabled for this. To enable it,
click on the **Select Widget Mode** button in the inspector.

在 **Select Widget Mode** 模式下，点击布局浏览器中的 widget 会同步选择到设备上。
启用此模式，请点击调试面板中的 **Select Widget Mode** 按钮。

![The Select Widget Mode button in the inspector]({% asset tools/devtools/select_widget_mode_devtools_alpha.png @path %})

For some properties, like flex factor, flex fit, and alignment,
you can modify the value via dropdown lists in the explorer.
When modifying a widget property, you see the new value reflected
not only in the Layout Explorer, but also on the
device running your Flutter app. The explorer animates
on property changes so that the effect of the change is clear.
Widget property changes made from the layout explorer don't
modify your source code and are reverted on hot reload.

你可以在布局浏览器的下拉列表修改属性值，
例如弹性系数、弹性适配和对齐方式。
当修改 widget 的属性时，您会看到新的值同时在浏览器和运行 Flutter 应用程序的设备上生效。
浏览器通过动画使更改的效果清晰可见。
从布局浏览器中对 widget 属性的更改不会修改源代码，将在热重载时还原。

##### Interactive Properties

##### 交互属性

Layout Explorer supports modifying [`mainAxisAlignment`][],
[`crossAxisAlignment`][], and [`FlexParentData.flex`][].
In the future, we may add support for additional properties
such as [`mainAxisSize`][], [`textDirection`][], and
[`FlexParentData.fit`][].

布局资源管理器支持修改 [`mainAxisAlignment`][]、[`crossAxisAlignment`][] 和 [`FlexParentData.flex`][]。
将来，我们可能会添加对其他属性的支持，例如 [`mainAxisSize`][]、[`textDirection`][] 和 [`FlexParentData.fit`][].

###### mainAxisAlignment

![The Layout Explorer changing main axis alignment]({% asset tools/devtools/layout_explorer_main_axis_alignment.gif @path %}){:width="100%"}

Supported values:

支持属性：

* `MainAxisAlignment.start`
* `MainAxisAlignment.end`
* `MainAxisAlignment.center`
* `MainAxisAlignment.spaceBetween`
* `MainAxisAlignment.spaceAround`
* `MainAxisAlignment.spaceEvenly`


###### crossAxisAlignment

![The Layout Explorer changing cross axis alignment]({% asset tools/devtools/layout_explorer_cross_axis_alignment.gif @path %}){:width="100%"}

Supported values:

支持属性：

* `CrossAxisAlignment.start`
* `CrossAxisAlignment.center`
* `CrossAxisAlignment.end`
* `CrossAxisAlignment.stretch`


###### FlexParentData.flex

![The Layout Explorer changing flex factor]({% asset tools/devtools/layout_explorer_flex.gif @path %}){:width="100%"}

Layout Explorer supports 7 flex options in the UI
(null, 0, 1, 2, 3, 4, 5), but technically the flex
factor of a flex widget’s child can be any int.

布局浏览器支持设置 7 种弹性因子（null、0、1、2、3、4、5），
但从技术上讲，弹性 widget 子级的弹性因子可以是任何整数。

###### Flexible.fit

![The Layout Explorer changing fit]({% asset tools/devtools/layout_explorer_fit.gif @path %}){:width="100%"}

Layout Explorer supports the two different types of
[`FlexFit`][]: `loose` and `tight`.

布局浏览器支持两种不同类型的 [`FlexFit`][]：`loose` 和 `tight`。

#### Fixed size layouts

#### 固定大小布局

When you select a fixed size widget that is not a child
of a flex widget, fixed size layout information will appear
in the Layout Explorer. You can see size, constraint, and padding
information for both the selected widget and its nearest upstream
RenderObject.

当您选择一个固定大小的 widget 而不是弹性 widget 时，它的布局信息将显示在布局浏览器中。
你可以看到所选 widget 及其最近的上一级 RenderObject 的大小、约束和填充信息。

![The Layout Explorer fixed size tool]({% asset tools/devtools/layout_explorer_fixed_layout.png @path %})

## Details Tree

## 树的详细信息

Select the **Details Tree** tab to display the details tree for the
selected widget.

选择 **Details Tree** 标签展示选中 widget 的树结构的详细信息。

![The Details Tree tab]({% asset tools/devtools/details_tree_tab.png @path %})

From the details tree, you can gather useful information about a
widget's properties, render object, and children.

从树的详细信息中，你可以获取有关 widget 的属性、渲染对象和子节点等有用信息。

![The Details Tree view]({% asset tools/devtools/details_tree.png @path %})


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
如果没有它，widget 树中的组成某个节点的树结构会更深，并且更难理解运行时 widget 的层次结构如何与应用程序的 UI 相对应。

You can disable this feature by passing `--no-track-widget-creation` to
the `flutter run` command.

你可以通过在 `flutter run` 后面添加参数 `-no track widget creation` 来禁用此功能。

Here are examples of what your widget tree might look like
with and without track widget creation enabled.

下面是 widget 树在启用和不启用追踪 widget 创建下的示例。

Track widget creation enabled (default):

启用追踪 widget 创建（默认）：

![The widget tree with track widget creation enabled]({% asset tools/devtools/track_widget_creation_enabled.png @path %}){:width="100%"}

Track widget creation disabled (not recommended):

关闭追踪 widget 创建（不推荐）：

![The widget tree with track widget creation disabled]({% asset tools/devtools/track_widget_creation_disabled.png @path %}){:width="100%"}

This feature prevents otherwise-identical `const` Widgets from
being considered equal in debug builds. For more details, see
the discussion on [common problems when debugging][].

此功能可避免在调试构建中将其他相同的 `const` 的 Widgets 视为相同。
有关更多详细信息，请参阅关于 [调试时常见问题][common problems when debugging] 的讨论。

## Other resources

## 其他资源

For a demonstration of what's generally possible with the inspector,
see the [DartConf 2018 talk][] demonstrating the IntelliJ version
of the Flutter inspector.

有关 Flutter inspector 常用功能的演示，请参考 [DartConf 2018 talk][] 中基于 IntelliJ 上的演示。

[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[common problems when debugging]: /docs/testing/debugging#common-problems
[core building block]: /docs/development/ui/widgets-intro
[`crossAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/crossAxisAlignment.html
[DartConf 2018 talk]: https://www.youtube.com/watch?v=JIcmJNT9DNI
[debug mode]: /docs/testing/build-modes#debug
[Debugging Flutter apps]: /docs/testing/debugging
[DevTools written in Flutter]: /docs/development/tools/devtools/overview#how-do-i-try-devtools-written-in-flutter
[`Flex`]: {{site.api}}/flutter/widgets/Flex-class.html
[flex layouts]: {{site.api}}/flutter/widgets/Flex-class.html
[`FlexFit`]: {{site.api}}/flutter/widgets/FlexFit-class.html
[`FlexParentData.fit`]: {{site.api}}/flutter/rendering/FlexParentData/fit.html
[`FlexParentData.flex`]: {{site.api}}/flutter/rendering/FlexParentData/flex.html
[Flutter performance profiling]: /docs/perf/rendering/ui-performance
[`mainAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/mainAxisAlignment.html
[`mainAxisSize`]: {{site.api}}/flutter/widgets/Flex/mainAxisSize.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`textDirection`]: {{site.api}}/flutter/widgets/Flex/textDirection.html
[the performance overlay]: /docs/perf/rendering/ui-performance#the-performance-overlay
[Understanding constraints]: /docs/development/ui/layout/constraints
