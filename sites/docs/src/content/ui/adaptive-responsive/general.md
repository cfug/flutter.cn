---
# title: General approach to adaptive apps
title: 自适应应用的一般方法
# description: >-
#   General advice on how to approach making your Flutter app adaptive.
# shortTitle: General approach
description: >-
  如何让 Flutter 应用具备自适应能力的一般建议。
shortTitle: 一般方法
ai-translated: true
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

So, just _how_ do you approach taking an app
designed for conventional mobile devices,
and make it beautiful on a wide range
of devices? What steps are required?

那么，究竟 _如何_ 将面向常规移动设备设计的应用，做得在多种设备上都出色？需要哪些步骤？

Google engineers, who have experience doing this
very thing for large apps, recommend the
following 3-step approach.

有大型应用实战经验的 Google 工程师推荐以下三步法。

## Step 1: Abstract

## 步骤 1：抽象

![Step 1: Abstract info common to any UI widget](/assets/images/docs/ui/adaptive-responsive/abstract.png)

First, identify the widgets that you plan to
make dynamic. Analyze the constructors for those
widgets and abstract out the data that you can share.

首先，确定计划做成动态的 widget。分析这些 widget 的构造函数，抽象出可共享的数据。

Common widgets that require adaptability are:

常见需要自适应的 widget 包括：

* Dialogs, both fullscreen and modal
* Navigation UI, both rail and bottom bar
* Custom layout, such as "is the UI area taller or wider?"

* 对话框，全屏与模态
* 导航 UI，rail 与底部栏
* 自定义布局，例如「UI 区域更高还是更宽？」

For example, in a `Dialog` widget, you can share
the info that contains the _content_ of the dialog.

例如，在 `Dialog` widget 中，可共享包含对话框 _内容_ 的信息。

Or, perhaps you want to switch between a
`NavigationBar` when the app window is small,
and a `NavigationRail` when the app window is large.
These widgets would likely share a list of
navigable destinations. In this case,
you might create a `Destination` widget to hold
this info, and specify the `Destination` as having both
an icon and a text label.

或者，应用窗口较小时用 `NavigationBar`，较大时用 `NavigationRail`。这些 widget 可能共享可导航目的地列表。此时可创建 `Destination` widget 保存该信息，并指定 `Destination` 同时包含图标与文本标签。

Next, you will evaluate your screen size to decide
on how to display your UI.

接下来，评估屏幕尺寸以决定如何显示 UI。

## Step 2: Measure

## 步骤 2：测量

![Step 2: How to measure screen size](/assets/images/docs/ui/adaptive-responsive/measure.png)

You have two ways to determine the size of your display area:
`MediaQuery` and `LayoutBuilder`.

有两种方式确定显示区域尺寸：`MediaQuery` 与 `LayoutBuilder`。

### MediaQuery

### MediaQuery

In the past, you might have used `MediaQuery.of` to
determine the size of the device's screen.
However, devices today feature screens
with a wide variety of sizes and shapes,
and this test can be misleading.

过去你可能用 `MediaQuery.of` 判断设备屏幕尺寸。但如今设备屏幕尺寸与形状多样，该判断可能误导。

For example, maybe your app currently occupies a
small window on a large screen. If you use the
`MediaQuery.of` method and conclude the screen to be small
(when, in fact, the app displays in a tiny window on a large screen),
and you've portrait locked your app, it causes the
app's window to lock to the center of the
screen, surrounded with black.
This is hardly an ideal UI on a large screen.

例如，应用可能只占大屏上的小窗口。若用 `MediaQuery.of` 得出屏幕很小（实则大屏上的小窗口），且应用锁定竖屏，会导致应用窗口锁定在屏幕中央并带黑边，在大屏上绝非理想 UI。

:::note
The Material Guidelines encourage you to never
_portrait lock_ your app (by disabling landscape mode).
However, if you feel you really must,
then at least define the portrait mode to work
in top-down mode as well as bottom up.

Material 指南鼓励你永远不要 _锁定竖屏_（禁用横屏）。但若你确实必须，至少让竖屏同时支持自上而下与自下而上模式。
:::

Keep in mind that `MediaQuery.sizeOf` returns the
current size of the app's entire screen and
not just a single widget.

请记住，`MediaQuery.sizeOf` 返回的是应用整个屏幕的当前尺寸，而非单个 widget。

You have two ways to measure your screen space.
You can use either `MediaQuery.sizeOf` or `LayoutBuilder`,
depending on whether you want the size of the whole
app window, or more local sizing.

测量屏幕空间有两种方式：根据你需要整个应用窗口尺寸还是更局部的尺寸，使用 `MediaQuery.sizeOf` 或 `LayoutBuilder`。

If you want your widget to be fullscreen,
even when the app window is small,
use `MediaQuery.sizeOf` so you can choose the
UI based on the size of the app window itself.
In the previous section, you want to base the
sizing behavior on the entire app's window,
so you would use `MediaQuery.sizeOf`.

若希望 widget 全屏显示（即使应用窗口很小），请用 `MediaQuery.sizeOf`，以便根据应用窗口尺寸选择 UI。上一节中，你希望基于整个应用窗口决定尺寸行为，因此应使用 `MediaQuery.sizeOf`。

:::secondary Why use `MediaQuery.sizeOf` instead of `MediaQuery.of`?
Previous advice recommended that you use the `of` method of
`MediaQuery` to obtain the app window's dimensions.
Why has this advice changed?
The short answer is **for performance reasons.**

`MediaQuery` contains a lot of data, but if you're
only interested in the size property, it's more
efficient to use the `sizeOf` method. Both methods
return the size of the app window in logical pixels
(also known as _density independent pixels_).
The logical pixel dimensions generally works best as its
roughly the same visual size across all devices.
The `MediaQuery` class has other specialized functions
for each of its individual properties for the same reason.

此前建议使用 `MediaQuery` 的 `of` 方法获取应用窗口尺寸。为何建议已变？简而言之：**出于性能。**

`MediaQuery` 包含大量数据，但若你只关心 size 属性，使用 `sizeOf` 更高效。两种方法均返回应用窗口的逻辑像素尺寸（亦称 _密度无关像素_）。逻辑像素在各设备上视觉尺寸大致相同，通常最合适。出于同样原因，`MediaQuery` 类对其各属性也有专门函数。
:::

Requesting the size of the app window from inside
the `build` method, as in `MediaQuery.sizeOf(context)`,
causes the given `BuildContext` to rebuild any time
the size property changes.

在 `build` 方法内请求应用窗口尺寸（如 `MediaQuery.sizeOf(context)`）会在 size 属性变化时使该 `BuildContext` 重建。

### LayoutBuilder

### LayoutBuilder

`LayoutBuilder` accomplishes a similar goal as
`MediaQuery.sizeOf`, with some distinctions.

`LayoutBuilder` 与 `MediaQuery.sizeOf` 目标类似，但有区别。

Rather than providing the size of the app's window,
`LayoutBuilder` provides the layout constraints from
the parent `Widget`. This means that you get
sizing information based on the specific spot
in the widget tree where you added the `LayoutBuilder`.
Also, `LayoutBuilder` returns a `BoxConstraints`
object instead of a `Size` object,
so you are given the valid width
and height ranges (minimum and maximum) for the content,
rather than just a fixed size.
This can be useful for custom widgets.

`LayoutBuilder` 不提供应用窗口尺寸，而提供父 `Widget` 的布局约束。即根据你在 widget 树中添加 `LayoutBuilder` 的位置获取尺寸信息。此外，`LayoutBuilder` 返回 `BoxConstraints` 而非 `Size`，因此给出内容有效的宽高范围（最小与最大），而非固定尺寸，这对自定义 widget 很有用。

For example, imagine a custom widget, where you want
the sizing to be based on the space specifically
given to that widget, and not the app window in general.
In this scenario, use `LayoutBuilder`.

例如，自定义 widget 希望尺寸基于分配给该 widget 的空间，而非整个应用窗口，此时请用 `LayoutBuilder`。

## Step 3: Branch

## 步骤 3：分支

![Step 3: Branch the code based on the desired UI](/assets/images/docs/ui/adaptive-responsive/branch.png)

At this point, you must decide what sizing breakpoints to use
when choosing what version of the UI to display.
For example, the [Material layout][] guidelines suggest using
a bottom nav bar for windows less than 600 logical pixels wide,
and a nav rail for those that are 600 pixels wide or greater.
Again, your choice shouldn't depend on the _type_ of device,
but on the device's available window size.

此时，你必须决定在选择显示哪版 UI 时使用哪些尺寸断点。例如，[Material layout][] 指南建议窗口宽度小于 600 逻辑像素时使用底部导航栏，600 像素及以上使用导航 rail。再次强调，选择不应依赖设备 _类型_，而应依赖设备可用窗口尺寸。

[Material layout]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

To work through an example that switches between a
`NavigationRail` and a `NavigationBar`, check out
the [Building an animated responsive app layout with Material 3][codelab].

要了解在 `NavigationRail` 与 `NavigationBar` 之间切换的示例，请参阅 [Building an animated responsive app layout with Material 3][codelab] Codelab。

[codelab]: {{site.codelabs}}/codelabs/flutter-animated-responsive-layout

The next page discusses how to ensure that your
app looks best on large screens and foldables.

下一页讨论如何确保应用在大屏与折叠屏上表现最佳。
