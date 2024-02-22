---
title: Using the Flutter inspector
title: 使用 Flutter inspector 工具
description: Learn how to use the Flutter inspector to explore a Flutter app's widget tree.
description: 学习如何使用 Flutter inspector 来检查 Flutter 应用的 widget 树。
tags: Flutter开发工具,DevTools
keywords: Flutter inspector,widget 树
---

{% include docs/bili_shims.liquid %}

<?code-excerpt path-base="../examples/visual_debugging/"?>

{{site.alert.note}}

  The inspector works with all Flutter applications.
  
  Flutter inspector 适用于所有 Flutter 应用。

{{site.alert.end}}

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

![Screenshot of the Flutter inspector window]({{site.url}}/assets/images/docs/tools/devtools/inspector_screenshot.png){:width="100%"}

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
<dt>
<p markdown="1">![Select widget mode icon]({{site.url}}/assets/images/docs/tools/devtools/select-widget-mode-icon.png){:width="20px"} **Select widget mode**</p>
<p markdown="1">![Select widget mode icon]({{site.url}}/assets/images/docs/tools/devtools/select-widget-mode-icon.png){:width="20px"} **选择 widget 模式**</p>
</dt>
<dd markdown="1">
<p markdown="1">Enable this button in order to select
    a widget on the device to inspect it. For more information,
    see [Inspecting a widget](#inspecting-a-widget).</p>
<p markdown="1">启用此按钮以在设备上选择 widget 进行查看。
    有关更多信息，请参考 [查看 widget](#inspecting-a-widget)。</p>
</dd>
<dt>
<p markdown="1">![Refresh tree icon]({{site.url}}/assets/images/docs/tools/devtools/refresh-tree-icon.png){:width="20px"} **Refresh tree**</p>
<p markdown="1">![Refresh tree icon]({{site.url}}/assets/images/docs/tools/devtools/refresh-tree-icon.png){:width="20px"} **刷新树**</p>
</dt>
<dd>
<p>Reload the current widget info</p>
<p>重新加载当前 widget 的信息。</p>
</dd>
<dt>
<p markdown="1">![Slow animations icon]({{site.url}}/assets/images/docs/tools/devtools/slow-animations-icon.png){:width="20px"} **[Slow Animations]**</p>
<p markdown="1">![Slow animations icon]({{site.url}}/assets/images/docs/tools/devtools/slow-animations-icon.png){:width="20px"} **[慢速动画][Slow Animations]**</p>
</dt>
<dd>
<p>Run animations 5 times slower to help fine-tune them.</p>
<p>以五分之一的速度运行动画以便对它们进行优化。</p>
</dd>
<dt>
<p markdown="1">![Show guidelines mode icon]({{site.url}}/assets/images/docs/tools/devtools/debug-paint-mode-icon.png){:width="20px"} **[Show guidelines][]**</p>
<p markdown="1">![Show guidelines mode icon]({{site.url}}/assets/images/docs/tools/devtools/debug-paint-mode-icon.png){:width="20px"} **[显示引导线][Show guidelines]**</p>
</dt>
<dd>
<p>Overlay guidelines to assist with fixing layout issues.</p>
<p>覆盖一层引导线以帮助调整布局问题。</p>
</dd>
<dt>
<p markdown="1">![Show baselines icon]({{site.url}}/assets/images/docs/tools/devtools/paint-baselines-icon.png){:width="20px"} **[Show baselines][]**</p>
<p markdown="1">![Show baselines icon]({{site.url}}/assets/images/docs/tools/devtools/paint-baselines-icon.png){:width="20px"} **[显示基线][Show baselines]**</p>
</dt>
<dd>
<p>Show baselines, which are used for aligning text.
    Can be useful for checking if text is aligned.</p>
<p>针对文字对齐展示文字的基线。对检查文字是否对齐有帮助。</p>
</dd>
<dt>
<p markdown="1">![Highlight repaints icon]({{site.url}}/assets/images/docs/tools/devtools/repaint-rainbow-icon.png){:width="20px"} **[Highlight repaints][]**</p>
<p markdown="1">![Highlight repaints icon]({{site.url}}/assets/images/docs/tools/devtools/repaint-rainbow-icon.png){:width="20px"} **[高亮重绘制内容][Highlight repaints]**</p>
</dt>
<dd>
<p>Shows rotating colors on layers when repainting.</p>
<p>重新绘制时在图层上依次显示不同的颜色。</p>
</dd>
<dt>
<p markdown="1">![Highlight oversized images icon]({{site.url}}/assets/images/docs/tools/devtools/invert_oversized_images_icon.png){:width="20px"} **[Highlight oversized images][]**</p>
<p markdown="1">![Highlight oversized images icon]({{site.url}}/assets/images/docs/tools/devtools/invert_oversized_images_icon.png){:width="20px"} **[高亮尺寸过大的图片][Highlight oversized images]**</p>
</dt>
<dd>
<p>Highlights images that are using too much memory
    by inverting colors and flipping them.</p>
<p>在运行的应用程序中高亮并反转消耗过多内存的图像。</p>
</dd>

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

## Flutter Layout Explorer

## Flutter 布局浏览器

The Flutter Layout Explorer helps you to better understand
Flutter layouts.

Flutter 布局浏览器可以帮助你更好地理解 Flutter 布局。

For an overview of what you can do with this tool, see
the Flutter Explorer video:

有关此工具的操作概述，观看 Flutter Explorer 的介绍视频：

<iframe width="560" height="315" src="{{site.yt.embed}}/Jakrc3Tn_y4" title="Learn about the Layout Explorer in Flutter DevTools" {{site.yt.set}}></iframe>

You might also find the following step-by-step article useful:

下面详细介绍的文章可能对你有帮助：

* [How to debug layout issues with the Flutter Inspector][debug-article]

  [如何使用 Flutter Inspector 调试布局问题][debug-article]

[debug-article]: {{site.flutter-medium}}/how-to-debug-layout-issues-with-the-flutter-inspector-87460a7b9db

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

![The Layout Explorer showing errors and device inspector]({{site.url}}/assets/images/docs/tools/devtools/layout_explorer_errors_and_device.gif){:width="100%"}

Clicking a widget in the layout explorer mirrors
the selection on the on-device inspector. **Select Widget Mode**
needs to be enabled for this. To enable it,
click on the **Select Widget Mode** button in the inspector.

在 **Select Widget Mode** 模式下，点击布局浏览器中的 widget 会同步选择到设备上。
启用此模式，请点击调试面板中的 **Select Widget Mode** 按钮。

![The Select Widget Mode button in the inspector]({{site.url}}/assets/images/docs/tools/devtools/select_widget_mode_button.png)

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
当修改 widget 的属性时，你会看到新的值同时在浏览器和运行 Flutter 应用程序的设备上生效。
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

![The Layout Explorer changing main axis alignment]({{site.url}}/assets/images/docs/tools/devtools/layout_explorer_main_axis_alignment.gif){:width="100%"}

Supported values:

支持属性：

* `MainAxisAlignment.start`
* `MainAxisAlignment.end`
* `MainAxisAlignment.center`
* `MainAxisAlignment.spaceBetween`
* `MainAxisAlignment.spaceAround`
* `MainAxisAlignment.spaceEvenly`

###### crossAxisAlignment

![The Layout Explorer changing cross axis alignment]({{site.url}}/assets/images/docs/tools/devtools/layout_explorer_cross_axis_alignment.gif){:width="100%"}

Supported values:

支持属性：

* `CrossAxisAlignment.start`
* `CrossAxisAlignment.center`
* `CrossAxisAlignment.end`
* `CrossAxisAlignment.stretch`

###### FlexParentData.flex

![The Layout Explorer changing flex factor]({{site.url}}/assets/images/docs/tools/devtools/layout_explorer_flex.gif){:width="100%"}

Layout Explorer supports 7 flex options in the UI
(null, 0, 1, 2, 3, 4, 5), but technically the flex
factor of a flex widget's child can be any int.

布局浏览器支持设置 7 种弹性因子（null、0、1、2、3、4、5），
但从技术上讲，弹性 widget 子级的弹性因子可以是任何整数。

###### Flexible.fit

![The Layout Explorer changing fit]({{site.url}}/assets/images/docs/tools/devtools/layout_explorer_fit.gif){:width="100%"}

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

当你选择一个固定大小的 widget 而不是弹性 widget 时，它的布局信息将显示在布局浏览器中。
你可以看到所选 widget 及其最近的上一级 RenderObject 的大小、约束和填充信息。

![The Layout Explorer fixed size tool]({{site.url}}/assets/images/docs/tools/devtools/layout_explorer_fixed_layout.png){:width="100%"}

## Visual debugging

## 调试视觉效果

The Flutter Inspector provides several options for visually debugging your app.

![Inspector visual debugging options]({{site.url}}/assets/images/docs/tools/devtools/visual_debugging_options.png){:width="100%"}

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

![Screen recording showing normal animation speed]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-slow-animations-disabled.gif)
![Screen recording showing slowed animation speed]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-slow-animations-enabled.gif)

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

![Screenshot of render box guidelines]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guideline-render-box.png)

#### Alignments

#### 对齐方式

Alignments are shown with yellow arrows. These arrows show the vertical
and horizontal offsets of a widget relative to its parent.
For example, this button's icon is shown as being centered by the four arrows:

对齐方式将以黄色箭头展示。
这些箭头会显示出垂直和竖屏方向上 widget 相对其父布局的偏移。
例如，这个按钮图标有四个箭头表示它被居中展示：

![Screenshot of alignment guidelines]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-alignment.png)

#### Padding

#### 间距

Padding is shown with a semi-transparent blue background:

间距会以半透明的蓝色背景显示：

![Screenshot of padding guidelines]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-padding.png)

#### Scroll views

#### 滚动视图

Widgets with scrolling contents (such as list views) are shown with green arrows:

包含滚动内容的 widget（例如 ListView）会展示绿色的箭头：

![Screenshot of scroll view guidelines]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-scroll.png)

#### Clipping

#### 裁剪

Clipping, for example when using the [ClipRect widget][], are shown
with a dashed pink line with a scissors icon:

使用了诸如 [ClipRect Widget][] 进行裁剪的内容，会以粉红色的虚线加一个剪刀图标展示：

[ClipRect widget]: {{site.api}}/flutter/widgets/ClipRect-class.html

![Screenshot of clip guidelines]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-clip.png)

#### Spacers

#### 空位填充

Spacer widgets are shown with a grey background,
such as this `SizedBox` without a child:

空位填充的 widgets 会以灰色背景展示，例如没有 child 的 `SizedBox`：

![Screenshot of spacer guidelines]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-spacer.png)

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

![Screenshot with show baselines enabled]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-baseline.png)

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

<?code-excerpt "lib/highlight_repaints.dart (EverythingRepaints)"?>
```dart
class EverythingRepaintsPage extends StatelessWidget {
  const EverythingRepaintsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repaint Example')),
      body: const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
```

![Screen recording of a whole screen repainting]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-repaint-1.gif)

Wrapping the progress indicator in a `RepaintBoundary` causes
only that section of the screen to repaint:

将进度指示器使用 `RepaintBoundary` 包裹，
可以将重绘范围缩小至它本身占有的区域。

<?code-excerpt "lib/highlight_repaints.dart (AreaRepaints)"?>
```dart
class AreaRepaintsPage extends StatelessWidget {
  const AreaRepaintsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repaint Example')),
      body: const Center(
        child: RepaintBoundary(
          child: CircularProgressIndicator(),
        ),
      ),
    );
  }
}
```

![Screen recording of a just a progress indicator repainting]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-repaint-2.gif)

`RepaintBoundary` widgets have tradeoffs. They can help with performance,
but they also have an overhead of creating a new canvas,
which uses additional memory.

`RepaintBoundary` widget 也有一些额外的消耗。
它们对性能有一定的帮助，但也会在创建额外的绘制画布时增加一定的内存消耗。

You can also enable this option in code:

你也可以通过代码启用：

<?code-excerpt "lib/highlight_repaints.dart (Toggle)"?>
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

![A highlighted oversized image]({{site.url}}/assets/images/docs/tools/devtools/debug-toggle-guidelines-oversized.png)

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

<?code-excerpt "lib/oversized_images.dart (ResizedImage)"?>
```dart
class ResizedImage extends StatelessWidget {
  const ResizedImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'dash.png',
      cacheHeight: 213,
      cacheWidth: 392,
    );
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

<?code-excerpt "lib/oversized_images.dart (Toggle)"?>
```dart
void showOversizedImages() {
  debugInvertOversizedImages = true;
}
```

#### More information

#### 更多内容

You can learn more at the following link:

以下的链接提供了更多细节内容：

* [Flutter documentation: debugInvertOversizedImages]({{site.api}}/flutter/painting/debugInvertOversizedImages.html)

  [Flutter 文档：debugInvertOversizedImages]({{site.api}}/flutter/painting/debugInvertOversizedImages.html)

[render box]: {{site.api}}/flutter/rendering/RenderBox-class.html

## Details Tree

## 树的详细信息

Select the **Widget Details Tree** tab to display the details tree for the
selected widget. From here, you can gather useful information about a
widget's properties, render object, and children.

选择 **Widget Details Tree** 标签来显示选中 widget 的详细信息树。
从这里，你可以收集关于 widget 属性、渲染对象和子节点的有用信息。

![The Details Tree view]({{site.url}}/assets/images/docs/tools/devtools/inspector_details_tree.png){:width="100%"}

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

![The widget tree with track widget creation enabled]({{site.url}}/assets/images/docs/tools/devtools/track_widget_creation_enabled.png){:width="100%"}

Track widget creation disabled (not recommended):

关闭追踪 widget 创建（不推荐）：

![The widget tree with track widget creation disabled]({{site.url}}/assets/images/docs/tools/devtools/track_widget_creation_disabled.png){:width="100%"}

This feature prevents otherwise-identical `const` Widgets from
being considered equal in debug builds. For more details, see
the discussion on [common problems when debugging][].

此功能可避免在调试构建中将其他相同的 `const` 的 Widgets 视为相同。
有关更多详细信息，请参阅关于 [调试时常见问题][common problems when debugging] 的讨论。

## Inspector settings

## 设置 Inspector

![The Flutter Inspector Settings dialog]({{site.url}}/assets/images/docs/tools/devtools/flutter_inspector_settings.png){:width="100%"}

### Enable hover inspection

### 启用 hover 检测 (Enable hover inspection)

Hovering over any widget displays its properties and values.

将鼠标悬停在任意 widget 上，
会显示该 widget 的属性和值。

Toggling this value enables or disables the hover inspection functionality.

你可以切换 **Enable hover inspection** 
启用或禁用 hover 检测功能。

### Package directories

### Package 目录 (Package Directories)

By default, DevTools limits the widgets displayed in the widget tree
to those from the project's root directory, and those from Flutter. This
filtering only applies to the widgets in the Inspector Widget Tree (left side
of the Inspector) -- not the Widget Details Tree (right side of the Inspector
in the same tab view as the Layout Explorer). In the Widget Details Tree, you
will be able to see all widgets in the tree from all packages.

默认情况下，DevTools 会根据项目根目录中的 widget 和 Flutter 中的 widget，
限制 widget 树中的显示。
这种过滤仅适用于 Inspector Widget Tree（Inspector 左侧）中的 widget -- 
不适用于 Widget Details Tree
（Inspector 右侧，与 Layout Explorer 处于同一选项卡视图中）。
在 Widget Details Tree 中，你可以看见树中所有 package 的 widget。

In order to show other widgets, a parent directory of theirs must be added to the Package Directories.

要显示其他 widget，必须在 Package Directories 中添加它们的父目录。

For example, consider the following directory structure:

例如，以下目录结构：

```
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
[common problems when debugging]: {{site.url}}/testing/debugging#common-problems
[`crossAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/crossAxisAlignment.html
[DartConf 2018 talk]: {{bili-video}}/BV1h4411575y/
[debug mode]: {{site.url}}/testing/build-modes#debug
[`Flex`]: {{site.api}}/flutter/widgets/Flex-class.html
[flex layouts]: {{site.api}}/flutter/widgets/Flex-class.html
[`FlexFit`]: {{site.api}}/flutter/rendering/FlexFit.html
[`FlexParentData.fit`]: {{site.api}}/flutter/rendering/FlexParentData/fit.html
[`FlexParentData.flex`]: {{site.api}}/flutter/rendering/FlexParentData/flex.html
[`mainAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/mainAxisAlignment.html
[`mainAxisSize`]: {{site.api}}/flutter/widgets/Flex/mainAxisSize.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`textDirection`]: {{site.api}}/flutter/widgets/Flex/textDirection.html
[Understanding constraints]: {{site.url}}/ui/layout/constraints
[inspector-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-flutter-inspector-part-2-of-8-bbff40692fc7
