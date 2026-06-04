---
# title: SafeArea & MediaQuery
title: SafeArea 与 MediaQuery
# description: >-
#   Learn how to use SafeArea and MediaQuery
#   to create an adaptive app.
description: >-
  了解如何使用 SafeArea 与 MediaQuery
  创建自适应应用。
ai-translated: true
---

This page discusses how and when to use the
`SafeArea` and `MediaQuery` widgets.

本页讨论如何以及何时使用 `SafeArea` 与 `MediaQuery` widget。

## SafeArea

## SafeArea

When running your app on the latest devices,
you might encounter bits of the UI being blocked
by cutouts on the device's screen.
You can fix this with the [`SafeArea`][] widget,
which insets its child widget to avoid intrusions
(like notches and camera cutouts),
as well as operating system UI
(such as the status bar on Android),
or by rounded corners of the physical display.

在最新设备上运行应用时，UI 部分可能被屏幕挖孔遮挡。可用 [`SafeArea`][] widget 修复，它会内嵌子 widget 以避免侵入（如刘海与相机挖孔）、操作系统 UI（如 Android 状态栏）或物理屏幕圆角。

If you don't want this behavior,
the `SafeArea` widget allows you to
disable padding on any of its four sides.
By default, all four sides are enabled.

若不需要此行为，`SafeArea` 允许禁用任一侧的内边距。默认四侧均启用。

It's generally recommended to wrap the body of a
`Scaffold` widget in `SafeArea` as a good place to start,
but you don't always need to put it this high in the
`Widget` tree.

通常建议将 `Scaffold` widget 的 body 包在 `SafeArea` 中作为起点，但不必总放在 `Widget` 树如此高的位置。

For example, if you purposefully want your app to stretch
under the cutouts, you can move the `SafeArea` to wrap
whatever content makes sense,
and let the rest of the app take up the full screen.

例如，若有意让应用延伸到挖孔下方，可将 `SafeArea` 移到包裹合适内容的位置，其余部分占满全屏。

Using `SafeArea` ensures that your app content won't be
cut off by physical display features or operating system UI,
and sets your app up for success even as new devices with
different shapes and styles of cutouts enter the market.

使用 `SafeArea` 可确保应用内容不被物理显示特性或操作系统 UI 裁切，并为日后各种挖孔形状的新设备做好准备。

How does `SafeArea` do so much in a small amount of code?
Behind the scenes it uses the `MediaQuery` object.

`SafeArea` 如何用少量代码做到这些？背后它使用 `MediaQuery` 对象。

[`SafeArea`]: {{site.api}}/flutter/widgets/SafeArea-class.html

## MediaQuery

## MediaQuery

As discussed in the [SafeArea](#safearea) section,
`MediaQuery` is a powerful widget for creating
adaptive apps. Sometimes you'll use `MediaQuery`
directly, and sometimes you'll use `SafeArea`,
which uses `MediaQuery` behind the scenes.

如 [SafeArea](#safearea) 节所述，`MediaQuery` 是创建自适应应用的强大 widget。有时直接使用 `MediaQuery`，有时使用背后依赖 `MediaQuery` 的 `SafeArea`。

`MediaQuery` provides lots of information,
including the app's current window size.
It exposes accessibility settings like high contrast mode
and text scaling, or if the user is using an accessibility
service like TalkBack or VoiceOver.
`MediaQuery` also contains info about the features
of your device's display, such as having a hinge or a fold.

`MediaQuery` 提供大量信息，包括应用当前窗口尺寸。它暴露高对比度、文字缩放等无障碍设置，或用户是否使用 TalkBack、VoiceOver 等无障碍服务。`MediaQuery` 还包含设备显示特性信息，例如是否有铰链或折叠。

`SafeArea` uses the data from `MediaQuery` to figure out
how much to inset its child `Widget`.
Specifically, it uses the `MediaQuery` padding property,
which is basically the amount of the display that's
partially obscured by system UI, display notches, or status bar.

`SafeArea` 使用 `MediaQuery` 数据计算子 `Widget` 的内嵌量，具体使用 `MediaQuery` 的 padding 属性，即被系统 UI、显示挖孔或状态栏部分遮挡的显示区域量。

So, why not use `MediaQuery` directly?

那么，为何不直接使用 `MediaQuery`？

The answer is that `SafeArea` does one clever thing
that makes it beneficial to use over just raw `MediaQueryData`.
Specifically, it modifies the `MediaQuery` exposed
to `SafeArea`'s children to make it appear as if the
padding added to `SafeArea` doesn't exist.
This means that you can nest `SafeArea`s,
and only the topmost one will apply the padding
needed to avoid the notches as system UI.

答案是 `SafeArea` 做了一件事，使其比裸用 `MediaQueryData` 更有利：它修改暴露给 `SafeArea` 子级的 `MediaQuery`，使 `SafeArea` 添加的内边距看似不存在。这意味着可嵌套 `SafeArea`，仅最外层应用避开挖孔与系统 UI 所需的内边距。

As your app grows and you move widgets around,
you don't have to worry about having too much
padding applied if you have multiple `SafeArea`s,
whereas you would have issues if using
`MediaQueryData.padding` directly.

随着应用增长和 widget 移动，多个 `SafeArea` 时不必担心内边距过多；若直接使用 `MediaQueryData.padding` 则会有问题。

You _can_ wrap the body of a `Scaffold` widget
with a `SafeArea`, but you don't _have_ to put it this high
in the widget tree.
The `SafeArea` just needs to wrap the contents
that would cause information loss if cut off by the
hardware features mentioned earlier.

你 _可以_ 用 `SafeArea` 包裹 `Scaffold` 的 body，但不必 _必须_ 放在 widget 树如此高的位置。`SafeArea` 只需包裹若被前述硬件特性裁切会导致信息丢失的内容。

For example, if you purposefully want your app to stretch
under the cutouts, you can move the `SafeArea` to wrap
whatever content makes sense,
and let the rest of the app take up the full screen.
A side note is that this is what the `AppBar` widget
does by default, which is how it goes underneath the
system status bar. This is also why wrapping the body
of a `Scaffold` in a `SafeArea` is recommended,
instead of wrapping the whole `Scaffold` itself.

例如，若有意让应用延伸到挖孔下，可将 `SafeArea` 移到包裹合适内容的位置，其余占满全屏。顺带说明，`AppBar` widget 默认如此，因而可延伸到系统状态栏下方。这也是建议用 `SafeArea` 包裹 `Scaffold` body 而非整个 `Scaffold` 的原因。

`SafeArea` ensures that your app content won't be
cut off in a generic way and sets your app up
for success even as new devices with different
shapes and styles of cutouts enter the market.

`SafeArea` 以通用方式确保应用内容不被裁切，并为日后各种挖孔形状的新设备做好准备。
