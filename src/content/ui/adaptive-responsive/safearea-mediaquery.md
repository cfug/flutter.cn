---
# title: SafeArea & MediaQuery
title: SafeArea 与 MediaQuery
# description: >-
#   Learn how to use SafeArea and MediaQuery
#   to create an adaptive app.
description: >-
  了解如何使用 SafeArea 和 MediaQuery
  来创建自适应应用。
---

This page discusses how and when to use the
`SafeArea` and `MediaQuery` widgets.

本页面讨论了如何以及何时使用
`SafeArea` 和 `MediaQuery` widget。

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

当你在最新的设备上运行应用时，
可能会遇到部分 UI 被设备屏幕上的缺口遮挡的情况。
你可以使用 [`SafeArea`][] widget 来解决这个问题，
它会对子 widget 进行内缩以避免被遮挡
（例如刘海和摄像头挖孔），
同时也会避开操作系统 UI
（例如 Android 上的状态栏），
以及物理显示屏的圆角区域。

If you don't want this behavior,
the `SafeArea` widget allows you to
disable padding on any of its four sides.
By default, all four sides are enabled.

如果你不需要这种行为，
`SafeArea` widget 允许你
禁用其四个方向中任意一侧的内边距。
默认情况下，四个方向都是启用的。

It's generally recommended to wrap the body of a
`Scaffold` widget in `SafeArea` as a good place to start,
but you don't always need to put it this high in the
`Widget` tree.

通常建议将 `Scaffold` widget 的 `body` 包裹在
`SafeArea` 中作为一个良好的起点，
但你并不总是需要将它放在 widget 树中这么高的位置。

For example, if you purposefully want your app to stretch
under the cutouts, you can move the `SafeArea` to wrap
whatever content makes sense,
and let the rest of the app take up the full screen.

例如，如果你有意让应用延伸到屏幕缺口下方，
你可以将 `SafeArea` 移到需要保护的内容外层进行包裹，
让应用的其他部分占据整个屏幕。

Using `SafeArea` ensures that your app content won't be
cut off by physical display features or operating system UI,
and sets your app up for success even as new devices with
different shapes and styles of cutouts enter the market.

使用 `SafeArea` 可以确保你的应用内容不会被
物理显示特性或操作系统 UI 所遮挡，
并且即使市场上出现具有不同形状和样式缺口的新设备，
你的应用也能从容应对。

How does `SafeArea` do so much in a small amount of code?
Behind the scenes it uses the `MediaQuery` object.

`SafeArea` 是如何用这么少的代码做到这些的呢？
在幕后，它使用了 `MediaQuery` 对象。

[`SafeArea`]: {{site.api}}/flutter/widgets/SafeArea-class.html

## MediaQuery

## MediaQuery

As discussed in the [SafeArea](#safearea) section,
`MediaQuery` is a powerful widget for creating
adaptive apps. Sometimes you'll use `MediaQuery`
directly, and sometimes you'll use `SafeArea`,
which uses `MediaQuery` behind the scenes.

如 [SafeArea](#safearea) 部分所述，
`MediaQuery` 是一个功能强大的 widget，
用于创建自适应应用。有时你会直接使用 `MediaQuery`，
有时你会使用 `SafeArea`，
而 `SafeArea` 在幕后使用了 `MediaQuery`。

`MediaQuery` provides lots of information,
including the app's current window size.
It exposes accessibility settings like high contrast mode
and text scaling, or if the user is using an accessibility
service like TalkBack or VoiceOver.
`MediaQuery` also contains info about the features
of your device's display, such as having a hinge or a fold.

`MediaQuery` 提供了大量信息，
包括应用当前的窗口尺寸。
它还提供了无障碍设置，如高对比度模式
和文字缩放，以及用户是否正在使用
TalkBack 或 VoiceOver 等无障碍服务。
`MediaQuery` 还包含有关设备显示屏特性的信息，
例如是否有铰链或折叠屏。

`SafeArea` uses the data from `MediaQuery` to figure out
how much to inset its child `Widget`.
Specifically, it uses the `MediaQuery` padding property,
which is basically the amount of the display that's
partially obscured by system UI, display notches, or status bar.

`SafeArea` 使用来自 `MediaQuery` 的数据来确定
其子 Widget 需要内缩多少。
具体来说，它使用 `MediaQuery` 的 padding 属性，
该属性本质上表示显示屏被系统 UI、刘海或状态栏
部分遮挡的区域大小。

So, why not use `MediaQuery` directly?

那么，为什么不直接使用 `MediaQuery` 呢？

The answer is that `SafeArea` does one clever thing
that makes it beneficial to use over just raw `MediaQueryData`.
Specifically, it modifies the `MediaQuery` exposed
to `SafeArea`'s children to make it appear as if the
padding added to `SafeArea` doesn't exist.
This means that you can nest `SafeArea`s,
and only the topmost one will apply the padding
needed to avoid the notches as system UI.

答案是 `SafeArea` 做了一件巧妙的事情，
使得它比直接使用原始的 `MediaQueryData` 更有优势。
具体来说，它会修改暴露给 `SafeArea` 子 Widget 的 `MediaQuery`，
使其看起来好像 `SafeArea` 添加的内边距并不存在。
这意味着你可以嵌套多个 `SafeArea`，
而只有最外层的那个会应用所需的内边距
来避开刘海和系统 UI。

As your app grows and you move widgets around,
you don't have to worry about having too much
padding applied if you have multiple `SafeArea`s,
whereas you would have issues if using
`MediaQueryData.padding` directly.

随着应用的增长和 widget 的移动，
如果你使用了多个 `SafeArea`，
不必担心会应用过多的内边距，
而如果直接使用 `MediaQueryData.padding`
则会遇到这个问题。

You _can_ wrap the body of a `Scaffold` widget
with a `SafeArea`, but you don't _have_ to put it this high
in the widget tree.
The `SafeArea` just needs to wrap the contents
that would cause information loss if cut off by the
hardware features mentioned earlier.

你*可以*将 `Scaffold` widget 的 `body` 用 `SafeArea` 包裹，
但你并*不一定*要把它放在 widget 树中这么高的位置。
`SafeArea` 只需要包裹那些如果被前面提到的硬件特性遮挡
就会导致信息丢失的内容即可。

For example, if you purposefully want your app to stretch
under the cutouts, you can move the `SafeArea` to wrap
whatever content makes sense,
and let the rest of the app take up the full screen.
A side note is that this is what the `AppBar` widget
does by default, which is how it goes underneath the
system status bar. This is also why wrapping the body
of a `Scaffold` in a `SafeArea` is recommended,
instead of wrapping the whole `Scaffold` itself.

例如，如果你有意让应用延伸到屏幕缺口下方，
你可以将 `SafeArea` 移到需要保护的内容外层进行包裹，
让应用的其他部分占据整个屏幕。
附带说明一下，这正是 `AppBar` widget 默认的行为方式，
这也是它能够延伸到系统状态栏下方的原因。
这也是为什么建议将 `Scaffold` 的 `body` 包裹在 `SafeArea` 中，
而不是包裹整个 `Scaffold` 本身的原因。

`SafeArea` ensures that your app content won't be
cut off in a generic way and sets your app up
for success even as new devices with different
shapes and styles of cutouts enter the market.

`SafeArea` 以一种通用的方式确保你的应用内容不会被遮挡，
并且即使市场上出现具有不同形状和样式缺口的新设备，
你的应用也能从容应对。
