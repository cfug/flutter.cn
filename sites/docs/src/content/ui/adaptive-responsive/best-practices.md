---
# title: Best practices for adaptive design
title: 自适应设计最佳实践
# description: >-
#   Summary of some of the best practices for adaptive design.
# shortTitle: Best practices
description: >-
  自适应设计部分最佳实践摘要。
shortTitle: 最佳实践
ai-translated: true
---

Recommended best practices for adaptive design include:

自适应设计的推荐最佳实践包括：

## Design considerations

## 设计考量

### Break down your widgets

### 拆分 widget

While designing your app, try to break down large,
complex widgets into smaller, simpler ones.

设计应用时，尽量将大型、复杂的 widget 拆分为更小、更简单的 widget。

Refactoring widgets can reduce the complexity of
adopting an adaptive UI by sharing core pieces of code.
There are other benefits as well:

重构 widget 可通过共享核心代码降低采用自适应 UI 的复杂度，还有其他好处：

* On the performance side, having lots of small `const`
  widgets improves rebuild times over having large,
  complex widgets.
* Flutter can reuse `const` widget instances,
  while a larger complex widget has to be set up
  for every rebuild.
* From a code health perspective, organizing your UI
  into smaller bite sized pieces helps keep the complexity
  of each `Widget` down. A less-complex `Widget` is more readable,
  easier to refactor, and less likely to have surprising behavior.

* 在性能方面，大量小型 `const` widget 比大型复杂 widget 更能缩短重建时间。
* Flutter 可复用 `const` widget 实例，而较大的复杂 widget 每次重建都需重新设置。
* 从代码健康角度看，将 UI 组织成更小的片段有助于降低每个 `Widget` 的复杂度。复杂度较低的 `Widget` 更易读、更易重构，也更少出现意外行为。

To learn more, check out the 3 steps of
adaptive design in [General approach][].

要了解更多，请参阅 [General approach][] 中的自适应设计三步法。

[General approach]: /ui/adaptive-responsive/general

### Design to the strengths of each form factor

### 针对各形态优势进行设计

Beyond screen size, you should also spend time
considering the unique strengths and weaknesses
of different form factors. It isn't always ideal
for your multiplatform app to offer identical
functionality everywhere. Consider whether it makes
sense to focus on specific capabilities,
or even remove certain features, on some device categories.

除屏幕尺寸外，你还应花时间考虑不同形态的独特优势与劣势。多平台应用并非在所有地方提供完全相同功能总是理想选择。考虑是否在某些设备类别上聚焦特定能力，甚至移除某些功能。

For example, mobile devices are portable and have cameras,
but they aren't well suited for detailed creative work.
With this in mind, you might focus more on capturing content
and tagging it with location data for a mobile UI,
but focus on organizing or manipulating that content
for a tablet or desktop UI.

例如，移动设备便携且带相机，但不适合精细创意工作。据此，移动 UI 可更侧重内容采集与位置标记，平板或桌面 UI 则侧重组织或编辑该内容。

Another example is leveraging the web's extremely low barrier
for sharing. If you're deploying a web app,
decide which [deep links][] to support,
and design your navigation routes with those in mind.

另一例是利用 Web 极低的分享门槛。若部署 Web 应用，决定支持哪些[深度链接][deep links]，并据此设计导航路由。

The key takeaway here is to think about what each
platform does best and see if there are unique capabilities
you can leverage.

要点是思考各平台最擅长什么，以及能否利用独特能力。

[deep links]: /ui/navigation/deep-linking

### Solve touch first

### 先解决触控

Building a great touch UI can often be more difficult
than a traditional desktop UI due, in part,
to the lack of input accelerators like right-click,
scroll wheel, or keyboard shortcuts.

构建出色的触控 UI 往往比传统桌面 UI 更难，部分原因是缺少右键、滚轮或键盘快捷键等输入加速器。

One way to approach this challenge is to focus initially
on a great touch-oriented UI. You can still do most of
your testing using the desktop target for its iteration speed.
But, remember to switch frequently to a mobile device to
verify that everything feels right.

一种应对方式是先聚焦出色的触控导向 UI。你仍可用桌面目标做大部分测试以加快迭代，但请经常切换到移动设备验证体验是否合适。

After you have the touch interface polished, you can tweak
the visual density for mouse users, and then layer on all
the additional inputs. Approach these other inputs as
accelerator—alternatives that make a task faster.
The important thing to consider is what a user expects
when using a particular input device,
and work to reflect that in your app.

触控界面打磨好后，可为鼠标用户调整视觉密度，再叠加其他输入。将这些输入视为加速器——让任务更快的替代方式。重要的是考虑用户使用特定输入设备时的预期，并在应用中体现。

## Implementation details

## 实现细节

### Don't lock the orientation of your app.

### 不要锁定应用方向。

An adaptive app should look good on windows of
different sizes and shapes. While locking an app
to portrait mode on phones can help narrow the scope
of a minimum viable product, it can increase the
effort required to make the app adaptive in the future.

自适应应用应在不同尺寸和形状的窗口上表现良好。在手机上锁定竖屏有助于缩小最小可行产品范围，但会增加日后实现自适应的工作量。

For example, the assumption that phones will only
render your app in a full screen portrait mode is
not a guarantee. Multi window app support is becoming common,
and foldables have many use cases that work best with
multiple apps running side by side.

例如，手机仅以全屏竖屏渲染应用并非必然。多窗口应用支持日益普遍，折叠屏也有许多适合多应用并排的场景。

If you absolutely must lock your app in portrait mode (but don't),
use the `Display` API instead of something like `MediaQuery`
to get the physical dimensions of the screen.

若必须锁定竖屏（但最好不要），请使用 `Display` API 而非 `MediaQuery` 等方式获取屏幕物理尺寸。

To summarize:

总结如下：

  * Locked screens can be [an accessibility issue][] for some users
  * Android large format tiers require portrait and landscape
    support at the [lowest level][].
  * Android devices can [override a locked screen][]
  * Apple guidelines say [aim to support both orientations][]

  * 锁定屏幕可能对部分用户构成[无障碍问题][an accessibility issue]
  * Android 大屏分级在[最低层级][lowest level]要求支持竖屏与横屏
  * Android 设备可[覆盖锁定屏幕][override a locked screen]
  * Apple 指南建议[尽量支持两种方向][aim to support both orientations]

[an accessibility issue]: https://www.w3.org/WAI/WCAG21/Understanding/orientation.html
[aim to support both orientations]: https://www.w3.org/WAI/WCAG21/Understanding/orientation.html
[lowest level]:  {{site.android-dev}}/docs/quality-guidelines/large-screen-app-quality#T3-8
[override a locked screen]: {{site.android-dev}}/guide/topics/large-screens/large-screen-compatibility-mode#per-app_overrides

### Avoid device orientation-based layouts

### 避免基于设备方向的布局

Avoid using `MediaQuery`'s orientation field
or `OrientationBuilder` near the top of your widget tree
to switch between different app layouts. This is
similar to the guidance of not checking device types
to determine screen size. The device's orientation also
doesn't necessarily inform you of how much space your
app window has.

避免在 widget 树顶部附近使用 `MediaQuery` 的 orientation 字段或 `OrientationBuilder` 在不同应用布局间切换。这与不要通过设备类型判断屏幕尺寸的建议类似。设备方向也未必告诉你应用窗口有多少空间。

Instead, use `MediaQuery`'s `sizeOf` or `LayoutBuilder`,
as discussed in the [General approach][] page.
Then use adaptive breakpoints like the ones that
[Material][] recommends.

请改用 `MediaQuery` 的 `sizeOf` 或 `LayoutBuilder`，如 [General approach][] 页所述。然后使用 [Material][] 推荐的自适应断点等。

[General approach]: /ui/adaptive-responsive/general#
[Material]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

### Don't gobble up all of the horizontal space

### 不要占满全部横向空间

Apps that use the full width of the window to
display boxes or text fields don't play well
when these apps run on large screens.

在大屏上运行时，用窗口全宽显示方框或文本字段的应用体验不佳。

To learn how to avoid this,
check out [Layout with GridView][].

要了解如何避免，请参阅 [Layout with GridView][]。

[Layout with GridView]: /ui/adaptive-responsive/large-screens#layout-with-gridview

### Avoid checking for hardware types

### 避免检查硬件类型

Avoid writing code that checks whether the device you're
running on is a "phone" or a "tablet", or any other type
of device when making layout decisions.

避免在布局决策时编写代码判断运行设备是「手机」「平板」或其他类型。

What space your app is actually given to render in
isn't always tied to the full screen size of the device.
Flutter can run on many different platforms,
and your app might be running in a resizeable window on ChromeOS,
side by side with another app on tablets in a multi-window mode,
or even in a picture-in-picture on phones.
Therefore, device type and app window size aren't
really strongly connected.

应用实际获得的渲染空间未必与设备全屏尺寸挂钩。Flutter 可在多种平台运行，应用可能在 ChromeOS 的可调整窗口、平板多窗口并排，甚至手机画中画中运行。因此设备类型与应用窗口尺寸并无强关联。

Instead, use `MediaQuery` to get the size of the window
your app is currently running in.

请改用 `MediaQuery` 获取应用当前运行窗口的尺寸。

This isn't only helpful for UI code.
To learn how abstracting out device
capabilities can help your business logic code,
check out the 2022 Google I/O talk,
[Flutter lessons for federated plugin development][].

这不仅对 UI 代码有帮助。要了解抽象设备能力如何帮助业务逻辑，请参阅 2022 Google I/O 演讲 [Flutter lessons for federated plugin development][]。

[Flutter lessons for federated plugin development]: {{site.youtube-site}}/watch?v=GAnSNplNpCA

### Support a variety of input devices

### 支持多种输入设备

Apps should support basic mice, trackpads,
and keyboard shortcuts. The most common user
flows should support keyboard navigation
to ensure accessibility. In particular,
your app follow accessible best practices
for keyboards on large devices.

应用应支持基本鼠标、触控板和键盘快捷键。最常见用户流程应支持键盘导航以确保无障碍。尤其在大屏设备上，应用应遵循键盘相关的无障碍最佳实践。

The Material library provides widgets with
excellent default behavior for touch, mouse,
and keyboard interaction.

Material 库提供的 widget 在触控、鼠标和键盘交互方面有出色的默认行为。

To learn how to add this support to custom widgets,
check out [User input & accessibility][].

要了解如何为自定义 widget 添加此类支持，请参阅 [User input & accessibility][]。

[User input & accessibility]: /ui/adaptive-responsive/input

### Restore List state

### 恢复 List 状态

To maintain the scroll position in a list
that doesn't change its layout when the
device's orientation changes,
use the [`PageStorageKey`][] class.
[`PageStorageKey`][] persists the
widget state in storage after the widget is
destroyed and restores state when recreated.

要在设备方向改变时布局不变的列表中保持滚动位置，请使用 [`PageStorageKey`][] 类。[`PageStorageKey`][] 在 widget 销毁后将状态持久化，并在重建时恢复。

You can see an example of this in the [Wonderous app][],
where it stores the list's state in the
`SingleChildScrollView` widget.

可在 [Wonderous app][] 中查看示例，它在 `SingleChildScrollView` widget 中保存列表状态。

If the `List` widget changes its layout
when the device's orientation changes,
you might have to do a bit of math ([example][])
to change the scroll position on screen rotation.

若 `List` widget 在方向改变时改变布局，屏幕旋转时可能需要一些计算（[示例][example]）来调整滚动位置。

[example]: {{site.github}}/gskinnerTeam/flutter-wonderous-app/blob/34e49a08084fbbe69ed67be948ab00ef23819313/lib/ui/screens/collection/widgets/_collection_list.dart#L39
[`PageStorageKey`]: {{site.api}}/flutter/widgets/PageStorageKey-class.html
[Wonderous app]: {{site.github}}/gskinnerTeam/flutter-wonderous-app/blob/8a29d6709668980340b1b59c3d3588f123edd4d8/lib/ui/screens/wonder_events/widgets/_events_list.dart#L64

## Save app state

## 保存应用状态

Apps should retain or restore [app state][]
as the device rotates, changes window size,
or folds and unfolds.
By default, an app should maintain state.

应用应在设备旋转、窗口尺寸变化或折叠/展开时保留或恢复[应用状态][app state]。默认情况下，应用应维持状态。

If your app loses state during device configuration,
verify that the plugins and native extensions
that your app uses support the
device type, such as a large screen.
Some native extensions might lose state when the
device changes position.

若应用在设备配置变更时丢失状态，请确认所用插件和原生扩展是否支持该设备类型（例如大屏）。部分原生扩展在设备姿态变化时可能丢失状态。

For more information on a real-world case
where this occurred, check out
[Problem: Folding/unfolding causes state loss][state-loss]
in [Developing Flutter apps for Large screens][article],
a free article on Medium.

有关此类真实案例的更多信息，请参阅 Medium 免费文章 [Developing Flutter apps for Large screens][article] 中的 [Problem: Folding/unfolding causes state loss][state-loss]。

[app state]: {{site.android-dev}}/jetpack/compose/state#store-state
[article]: {{site.flutter-blog}}/developing-flutter-apps-for-large-screens-53b7b0e17f10
[state-loss]: {{site.flutter-blog}}/developing-flutter-apps-for-large-screens-53b7b0e17f10#:~:text=Problem%3A%20Folding/Unfolding%20causes%20state%2Dloss
