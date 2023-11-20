---
title: Automatic platform adaptations
title: 自动适配不同平台操作体验
description: Learn more about Flutter's platform adaptiveness.
description: 了解更多 Flutter 的平台适配机制。
tags: Flutter参考资料
keywords: 平台适配,研究,Flutter Android,Flutter iOS,Flutter跨平台
---

{{site.alert.note}}

  As of the Flutter 3.16 release, Material 3
  replaces Material 2 as the default theme
  on all Flutter apps that use Material.

  从 Flutter 3.16 版本开始，
  Material 3 取代了 Material 2，
  成为所有使用 Material 的 Flutter 应用的
  默认主题。

{{site.alert.end}}

## Adaptation philosophy

## 适配哲学

In general, two cases of platform adaptiveness exist:

平台适配通常有两种情形：

1. Things that are behaviors of the OS environment
   (such as text editing and scrolling) and that
   would be 'wrong' if a different behavior took place.

   操作系统所特有的操作体验（例如文本编辑和滚动）。
   如果操作体验与操作系统不一致，则通常会被认为是“错误的”。

2. Things that are conventionally implemented in apps using
   the OEM's SDKs (such as using parallel tabs on iOS or
   showing an [android.app.AlertDialog][] on Android).

   使用 OEM 提供的 SDK 实现的功能体验
   （例如 iOS 常使用的选项卡，
   Android 使用 [android.app.AlertDialog][] 显示一个提示窗口）。

This article mainly covers the automatic adaptations
provided by Flutter in case 1 on Android and iOS.

本文囊括了 Flutter 为解决情形 1 而提供的覆盖 Android 和 iOS 的自动适配。

For case 2, Flutter bundles the means to produce the
appropriate effects of the platform conventions but doesn't
adapt automatically when app design choices are needed.
For a discussion, see [issue #8410][] and the
[Material/Cupertino adaptive widget problem definition][].

对于情形 2，Flutter 提供了一些工具可以生成符合平台习惯的体验，
但是不会根据平台自动适配，需要根据 App 设计来手工选择。
更多有关的讨论，请访问 [issue #8410][] 和这个文档
[定义 Material/Cupertino widget 适配问题][Material/Cupertino adaptive widget problem definition]

For an example of an app using different information
architecture structures on Android and iOS but sharing
the same content code, see the [platform_design code samples][].

如果一个应用需要在 Android 和 iOS 不同架构上使用相同的代码，
请参阅 [platform_design 这份代码示例][platform_design code samples]。

{{site.alert.info}}

Preliminary guides addressing case 2 
are being added to the UI components section. 
You can request additional guides by commenting on [issue #8427][].

本文档的 UI 组件部分正在添加有关情形 2 的指南。
如果你有更多的需求，请在 [issue #8427][] 中留言让我们知道。

{{site.alert.end}}

## Page navigation

## 页面导航

Flutter provides the navigation patterns seen on Android
and iOS and also automatically adapts the navigation animation
to the current platform.

Flutter 分别为 Android 和 iOS 提供了各自平台的导航模式，
并根据当前平台自动适配导航转场动画。

### Navigation transitions

### 导航转场动画

On **Android**, the default [`Navigator.push()`][] transition
is modeled after [`startActivity()`][],
which generally has one bottom-up animation variant.

**Android** 平台，默认提供的 [`Navigator.push()`][] 
转场动画模仿了 [`startActivity()`][] 的动画，
即一种自下而上的动画效果。

On **iOS**:

**iOS** 平台：

* The default [`Navigator.push()`][] API produces an
  iOS Show/Push style transition that animates from
  end-to-start depending on the locale's RTL setting.
  The page behind the new route also parallax-slides
  in the same direction as in iOS.

  iOS 的 [`Navigator.push()`][] API 提供了 iOS 上的
  Show 转场动画（也被称为 Push 转场动画），
  即根据语言的方向设置，执行一种从后到前的滚动动画效果。
  在显示新页面的时候，原来的页面也会沿着相同的方向进行视差滚动。

* A separate bottom-up transition style exists when
  pushing a page route where [`PageRoute.fullscreenDialog`][]
  is true. This represents iOS's Present/Modal style
  transition and is typically used on fullscreen modal pages.

  当显示一个页面，且 [`PageRoute.fullscreenDialog`][] 是 true 的时候，
  iOS 提供了另外一种自下而上的动画效果。
  这个动画通常被用在展示全屏模态页，
  也被称为 iOS 上的 Present 转场动画或 Modal 转场动画。


<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 12px;" src="/assets/images/docs/platform-adaptations/navigation-android.gif" class="figure-img img-fluid" alt="An animation of the bottom-up page transition on Android" />
        <figcaption class="figure-caption">
<!--           <span><t>Android page transition</t><t>Android 转场动画</t></span> -->
           <span>Android 转场动画</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 22px;" src="/assets/images/docs/platform-adaptations/navigation-ios.gif" class="figure-img img-fluid" alt="An animation of the end-start style push page transition on iOS" />
        <figcaption class="figure-caption">
<!--           <span><t>iOS push transition</t><t>iOS Push 转场动画</t></span> -->
          <span>iOS Push 转场动画</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 22px;" src="/assets/images/docs/platform-adaptations/navigation-ios-modal.gif" class="figure-img img-fluid" alt="An animation of the bottom-up style present page transition on iOS" />
        <figcaption class="figure-caption">
<!--           <span><t>iOS present transition</t><t>iOS Present 转场动画</t></span> -->
          <span>iOS Present 转场动画</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Platform-specific transition details

### 不同平台的转场动画细节

On **Android**, Flutter uses the [`ZoomPageTransitionsBuilder`][] animation.
When the user taps on an item, the UI zooms in to a screen that features that item.
When the user taps to go back, the UI zooms out to the previous screen.

**Android** 平台上，Flutter 使用 [`ZoomPageTransitionsBuilder`][] 转场动画。
当用户进行了路由跳转，界面会缩放至下一个页面。
当用户返回上一页时，界面会缩放回上一个页面。

On **iOS** when the push style transition is used,
Flutter's bundled [`CupertinoNavigationBar`][]
and [`CupertinoSliverNavigationBar`][] nav bars
automatically animate each subcomponent to its corresponding
subcomponent on the next or previous page's
`CupertinoNavigationBar` or `CupertinoSliverNavigationBar`.

当在 **iOS** 平台上使用 Push 转场特效的时候，
Flutter 内置的 [`CupertinoNavigationBar`][]
和 [`CupertinoSliverNavigationBar`][]
会自动的给当前页下一页的子组件使用正确的动画效果
（`CupertinoNavigationBar` 或者 `CupertinoSliverNavigationBar`）。

<div class="container">
  <div class="row">
    <div class="col-sm">
      <figure class="figure text-center">
      <object style="border-radius: 12px; height: 400px;" class="figure-img img-fluid" height="400" width="185" alt="An animation of the page transition on Android" data="/assets/images/docs/platform-adaptations/android-zoom-animation.png"></object>
        <figcaption class="figure-caption">
          Android
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img style="border-radius: 22px;" src="/assets/images/docs/platform-adaptations/navigation-ios-nav-bar.gif" class="figure-img img-fluid" alt="An animation of the nav bar transitions during a page transition on iOS" />
        <figcaption class="figure-caption">
          iOS Nav Bar
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Back navigation

### 返回导航

On **Android**,
the OS back button, by default, is sent to Flutter
and pops the top route of the [`WidgetsApp`][]'s Navigator.

**Android** 平台，通常操作系统的返回按钮触发的事件会发给 Flutter，
并弹出  [`WidgetsApp`][] 路由的最顶端。

On **iOS**,
an edge swipe gesture can be used to pop the top route.

**iOS** 平台，从屏幕边缘的轻扫手势会弹出路由的最顶端。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 12px;" src="/assets/images/docs/platform-adaptations/navigation-android-back.gif" class="figure-img img-fluid" alt="A page transition triggered by the Android back button" />
        <figcaption class="figure-caption">
          Android back button
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img style="border-radius: 22px;" src="/assets/images/docs/platform-adaptations/navigation-ios-back.gif" class="figure-img img-fluid" alt="A page transition triggered by an iOS back swipe gesture" />
        <figcaption class="figure-caption">
          iOS back swipe gesture
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## Scrolling

## 滚动

Scrolling is an important part of the platform's
look and feel, and Flutter automatically adjusts
the scrolling behavior to match the current platform.

滚动是不同平台提供独有体验非常重要的一环，
Flutter 会根据当前的平台自动适配滚动体验。

### Physics simulation

### 物理仿真

Android and iOS both have complex scrolling physics
simulations that are difficult to describe verbally.
Generally, iOS's scrollable has more weight and
dynamic friction but Android has more static friction.
Therefore iOS gains high speed more gradually but stops
less abruptly and is more slippery at slow speeds.

Android 和 iOS 平台都提供了非常复杂的滚动物理仿真，
因而很难用语言来描述。通常来说，
iOS 的滚动通常提供更多的分量和动态的阻力；
而 Android 则更多的使用静态的阻力。
所以，iOS 随着滚动慢慢的达到高速，且不会突然的停止，
而且在慢速的时候显得更顺滑。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/scroll-soft.gif" class="figure-img img-fluid rounded" alt="A soft fling where the iOS scrollable slid longer at lower speed than Android" />
        <figcaption class="figure-caption">
          Soft fling comparison
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/scroll-medium.gif" class="figure-img img-fluid rounded" alt="A medium force fling where the Android scrollable reached speed faster and stopped more abruptly after reaching a longer distance" />
        <figcaption class="figure-caption">
          Medium fling comparison
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/scroll-strong.gif" class="figure-img img-fluid rounded" alt="A strong fling where the Android scrollable reach speed faster and reached significantly more distance" />
        <figcaption class="figure-caption">
          Strong fling comparison
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Overscroll behavior

### 滚动边界行为

On **Android**,
scrolling past the edge of a scrollable shows an
[overscroll glow indicator][] (based on the color
of the current Material theme).

**Android** 平台，滚动达到边界的时候，会显示
[滚动灰色指示][overscroll glow indicator]
（具体颜色根据 Material 主题而有所不同）。

On **iOS**, scrolling past the edge of a scrollable
[overscrolls][] with increasing resistance and snaps back.

**iOS** 平台，滚动达到边界的时候，会显示一个 [滚动边界][overscrolls] 的弹簧效果。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/scroll-overscroll.gif" class="figure-img img-fluid rounded" alt="Android and iOS scrollables being flung past their edge and exhibiting platform specific overscroll behavior" />
        <figcaption class="figure-caption">
          Dynamic overscroll comparison
        </figcaption>
      </figure>
    </div>
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/scroll-static-overscroll.gif" class="figure-img img-fluid rounded" alt="Android and iOS scrollables being overscrolled from a resting position and exhibiting platform specific overscroll behavior" />
        <figcaption class="figure-caption">
          Static overscroll comparison
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Momentum

### 动量

On **iOS**,
repeated flings in the same direction stacks momentum
and builds more speed with each successive fling.
There is no equivalent behavior on *Android*.

**iOS** 平台，不停的按相同方向滚动会产生动量叠加，
从而连续滚动速度会越来越快。在 *Android* 平台上没有对应的行为。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/scroll-momentum-ios.gif" class="figure-img img-fluid rounded" alt="Repeated scroll flings building momentum on iOS" />
        <figcaption class="figure-caption">
          iOS scroll momentum
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Return to top

### 返回顶部

On **iOS**,
tapping the OS status bar scrolls the primary
scroll controller to the top position.
There is no equivalent behavior on **Android**.

**iOS** 平台，点击操作系统的状态栏，主要的滚动条控制器会滚动到顶部。 **Android** 没有对应的行为。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 22px;" src="/assets/images/docs/platform-adaptations/scroll-tap-to-top-ios.gif" class="figure-img img-fluid" alt="Tapping the status bar scrolls the primary scrollable back to the top" />
        <figcaption class="figure-caption">
          iOS status bar tap to top
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## Typography

## 排版

When using the Material package,
the typography automatically defaults to the
font family appropriate for the platform.
Android uses the Roboto font.
iOS uses the San Francisco font.

当使用 Material package 的时候，排版会根据平台自动使用对应的字体。
Android 平台会使用 Roboto 字体，
而 iOS 则会使用系统自带的 San Francisco 字体。

When using the Cupertino package, the [default theme][]
uses the San Francisco font.

当使用 Cupertino 包的时候，[默认主题][default theme] 
会使用 San Francisco 字体。

The San Francisco font license limits its usage to
software running on iOS, macOS, or tvOS only.
Therefore a fallback font is used when running on Android
if the platform is debug-overridden to iOS or the
default Cupertino theme is used.

San Francisco 字体的授权限制了它只能被用在运行于
iOS、macOS 和 tvOS 平台上的软件。
因此当运行在 Android 平台的时候，
即使强制覆盖系统平台为 iOS 或者使用 Cupertino 默认主题，
都会使用对应的替代字体。

You might choose to adapt the text styling of Material 
widgets to match the default text styling on iOS. 
You can see widget-specific examples in the 
[UI Component section][].

你可以选择将 Material widgets 的文本样式适配到 iOS 的默认文本样式。
你可以在 [UI 组件部分][UI Component section] 看到特定组件的例子。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/typography-android.png" class="figure-img img-fluid rounded" alt="Roboto font on Android" />
        <figcaption class="figure-caption">
          Roboto on Android
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/typography-ios.png" class="figure-img img-fluid rounded" alt="San Francisco font on iOS" />
        <figcaption class="figure-caption">
          San Francisco on iOS
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## Iconography

## 图标

When using the Material package,
certain icons automatically show different
graphics depending on the platform.
For instance, the overflow button's three dots
are horizontal on iOS and vertical on Android.
The back button is a simple chevron on iOS and
has a stem/shaft on Android.

当使用 Material 包的时候，根据平台不同，图标的具体样式会有差别。
举例来说，更多按钮的图标，Android 上是竖直的三个点而 iOS 是横着的三个点；
退回按钮，iOS 是一个简单的 V 型标记，而 Android 平台，V 型标记有个短横线。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/iconography-android.png" class="figure-img img-fluid rounded" alt="Android appropriate icons" />
        <figcaption class="figure-caption">
          Icons on Android
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/iconography-ios.png" class="figure-img img-fluid rounded" alt="iOS appropriate icons" />
        <figcaption class="figure-caption">
          Icons on iOS
        </figcaption>
      </figure>
    </div>
  </div>
</div>

The material library also provides a set of platform-adaptive icons through [`Icons.adaptive`].

## Haptic feedback

## 触摸反馈

The Material and Cupertino packages automatically
trigger the platform appropriate haptic feedback in
certain scenarios.

Material 和 Cupertino 包在特定场景下都会自动触发符合平台特点的触摸反馈。

For instance,
a word selection via text field long-press triggers a 'buzz'
vibrate on Android and not on iOS.

例如，在文本输入框控件里面长按选中单词会在 Android 设备上会触发震动，而 iOS 不会。

Scrolling through picker items on iOS triggers a
'light impact' knock and no feedback on Android.

在 iOS 滚动选择器项目列表，会触发一个很轻的敲击音效，而 Android 则不会。

## Text editing

## 文本编辑

Flutter also makes the below adaptations while editing
the content of text fields to match the current platform.

Flutter 会根据当前平台来适配正确的文本编辑体验。

### Keyboard gesture navigation

### 键盘手势导航

On **Android**,
horizontal swipes can be made on the soft keyboard's <kbd>space</kbd> key
to move the cursor in Material and Cupertino text fields.

**Android** 平台，
在虚拟键盘空格键上可以通过左右轻扫来移动光标，
Material 和 Cupertino 的文本输入框控件都支持该特性。

On **iOS** devices with 3D Touch capabilities,
a force-press-drag gesture could be made on the soft
keyboard to move the cursor in 2D via a floating cursor.
This works on both Material and Cupertino text fields.

**iOS** 设备提供了 3D Touch 兼容，
通过在虚拟键盘上使用长按并拖拽手势可以任意方向移动光标。
Material 和 Cupertino 都对这个功能提供了支持。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/text-keyboard-move-android.gif" class="figure-img img-fluid rounded" alt="Moving the cursor via the space key on Android" />
        <figcaption class="figure-caption">
          Android space key cursor move
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/text-keyboard-move-ios.gif" class="figure-img img-fluid rounded" alt="Moving the cursor via 3D Touch drag on the keyboard on iOS" />
        <figcaption class="figure-caption">
          iOS 3D Touch drag cursor move
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Text selection toolbar

### 文本选中工具栏

With **Material on Android**,
the Android style selection toolbar is shown when
a text selection is made in a text field.

在 **Android** 平台上使用 **Material**，在文本输入框里面选中文本会显示一个 Android 风格的文本选中工具栏。

With **Material on iOS** or when using **Cupertino**,
the iOS style selection toolbar is shown when a text
selection is made in a text field.

在 **iOS** 平台上使用 **Material** 或者在两个平台上都使用 **Cupertino**，在文本输入框里面选中文本会展示一个 iOS 风格的文本选中工具栏。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/text-toolbar-android.png" class="figure-img img-fluid rounded" alt="Android appropriate text toolbar" />
        <figcaption class="figure-caption">
          Android text selection toolbar
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/text-toolbar-ios.png" class="figure-img img-fluid rounded" alt="iOS appropriate text toolbar" />
        <figcaption class="figure-caption">
          iOS text selection toolbar
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Single tap gesture

### 点击手势

With **Material on Android**,
a single tap in a text field puts the cursor at the
location of the tap.

在 **Android** 平台使用 **Material**，在文本控件中点击会移动光标到点击处。

A collapsed text selection also shows a draggable
handle to subsequently move the cursor.

同时，光标会有一个可移动的把手，随后可以通过这个把手移动光标。

With **Material on iOS** or when using **Cupertino**,
a single tap in a text field puts the cursor at the
nearest edge of the word tapped.

在 **iOS** 平台使用 **Material** 或者在两个平台都使用 **Cupertino**，在文本空间中点击，会把光标移动到点击处最近的单词末尾。

Collapsed text selections don't have draggable handles on iOS.

在 iOS 平台上，光标是没有把手的。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/text-single-tap-android.gif" class="figure-img img-fluid rounded" alt="Moving the cursor to the tapped position on Android" />
        <figcaption class="figure-caption">
          Android tap
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/text-single-tap-ios.gif" class="figure-img img-fluid rounded" alt="Moving the cursor to the nearest edge of the tapped word on iOS" />
        <figcaption class="figure-caption">
          iOS tap
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Long-press gesture

### 长按手势

With **Material on Android**,
a long press selects the word under the long press.
The selection toolbar is shown upon release.

在 **Android** 平台使用 **Material**，在单词上长按会选中单词，并在释放长按的时候显示文本选中工具栏。

With **Material on iOS** or when using **Cupertino**,
a long press places the cursor at the location of the
long press. The selection toolbar is shown upon release.

在 **iOS** 平台使用 **Material** 或者在两个平台都使用 **Cupertino**，长按会把光标放置到长按的位置，并在释放长按的时候显示文本选中工具栏。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/text-long-press-android.gif" class="figure-img img-fluid rounded" alt="Selecting a word via long press on Android" />
        <figcaption class="figure-caption">
          Android long press
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/text-long-press-ios.gif" class="figure-img img-fluid rounded" alt="Selecting a position via long press on iOS" />
        <figcaption class="figure-caption">
          iOS long press
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Long-press drag gesture

### 长按并拖放手势

With **Material on Android**,
dragging while holding the long press expands the words selected.

在 **Android** 平台上使用 **Material**，长按并拖拽会选中更多单词。

With **Material on iOS** or when using **Cupertino**,
dragging while holding the long press moves the cursor.

在 **iOS** 平台使用 **Material** 或者在两个平台都使用 **Cupertino**，长按并拖拽会移动光标。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/text-long-press-drag-android.gif" class="figure-img img-fluid rounded" alt="Expanding word selection via long press drag on Android" />
        <figcaption class="figure-caption">
          Android long press drag
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/text-long-press-drag-ios.gif" class="figure-img img-fluid rounded" alt="Moving the cursor via long press drag on iOS" />
        <figcaption class="figure-caption">
          iOS long press drag
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Double tap gesture

### 双击手势

On both Android and iOS,
a double tap selects the word receiving the
double tap and shows the selection toolbar.

Android 和 iOS 平台上，
双击选中一个单词都会收到双击手势事件，
并显示文本选中工具栏。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/text-double-tap-android.gif" class="figure-img img-fluid rounded" alt="Selecting a word via double tap on Android" />
        <figcaption class="figure-caption">
          Android double tap
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/text-double-tap-ios.gif" class="figure-img img-fluid rounded" alt="Selecting a word via double tap on iOS" />
        <figcaption class="figure-caption">
          iOS double tap
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## UI components

This section includes preliminary recommendations on how to adapt 
Material widgets to deliver a natural and compelling experience on iOS. 
Your feedback is welcomed on [issue #8427][]. 

### Widgets with .adaptive() constructors

Several widgets support `.adaptive()` constructors. 
The following table lists these widgets.
Adaptive constructors substitute the corresponding Cupertino components 
when the app is run on an iOS device. 

Widgets in the following table are used primarily for input, 
selection, and to display system information. 
Because these controls are tightly integrated with the operating system,
users have been trained to recognize and respond to them.
Therefore, we recommend that you follow platform conventions. 


| Material Widget | Cupertino Widget | Adaptive Constructor |
|---|---|---|---|---|
|<img width=160 src="/assets/images/docs/platform-adaptations/m3-switch.png" class="figure-img img-fluid rounded" alt="Switch in Material 3" /><br/>`Switch`|<img src="/assets/images/docs/platform-adaptations/hig-switch.png" class="figure-img img-fluid rounded" alt="Switch in HIG" /><br/>`CupertinoSwitch`|[`Switch.adaptive()`][]|
|<img src="/assets/images/docs/platform-adaptations/m3-slider.png" width =160 class="figure-img img-fluid rounded" alt="Slider in Material 3" /><br/>`Slider`|<img src="/assets/images/docs/platform-adaptations/hig-slider.png"  width =160  class="figure-img img-fluid rounded" alt="Slider in HIG" /><br/>`CupertinoSlider`|[`Slider.adaptive()`][]|
|<img src="/assets/images/docs/platform-adaptations/m3-progress.png" width = 100 class="figure-img img-fluid rounded" alt="Circular progress indicator in Material 3" /><br/>`CircularProgressIndicator`|<img src="/assets/images/docs/platform-adaptations/hig-progress.png" class="figure-img img-fluid rounded" alt="Activity indicator in HIG" /><br/>`CupertinoActivityIndicator`|[`CircularProgressIndicator.adaptive()`][]|
| <img src="/assets/images/docs/platform-adaptations/m3-checkbox.png" class="figure-img img-fluid rounded" alt=" Checkbox in Material 3" /> <br/>`Checkbox`| <img src="/assets/images/docs/platform-adaptations/hig-checkbox.png" class="figure-img img-fluid rounded" alt="Checkbox in HIG" /> <br/> `CupertinoCheckbox`|[`Checkbox.adaptive()`][]|
|<img src="/assets/images/docs/platform-adaptations/m3-radio.png" class="figure-img img-fluid rounded" alt="Radio in Material 3" /> <br/>`Radio`|<img src="/assets/images/docs/platform-adaptations/hig-radio.png" class="figure-img img-fluid rounded" alt="Radio in HIG" /><br/>`CupertinoRadio`|[`Radio.adaptive()`][]|

### Top app bar and navigation bar

Since Android 12, the default UI for top app 
bars follows the design guidelines defined in [Material 3][mat-appbar]. 
On iOS, an equivalent component called "Navigation Bars" 
is defined in [Apple's Human Interface Guidelines][hig-appbar] (HIG). 

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/mat-appbar.png" 
        class="figure-img img-fluid rounded" alt=" Top App Bar in Material 3 " />
        <figcaption class="figure-caption">
          Top App Bar in Material 3 
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/hig-appbar.png" 
        class="figure-img img-fluid rounded" alt="Navigation Bar in Human Interface Guidelines" />
        <figcaption class="figure-caption">
          Navigation Bar in Human Interface Guidelines
        </figcaption>
      </figure>
    </div>
  </div>
</div>

Certain properties of app bars in Flutter apps should be adapted, 
like system icons and page transitions. 
These are already automatically adapted when using 
the Material `AppBar` and `SliverAppBar` widgets. 
You can also further customize the properties of these widgets to better 
match iOS platform styles, as shown below. 

```dart
// Map the text theme to iOS styles
TextTheme cupertinoTextTheme = TextTheme(
    headlineMedium: CupertinoThemeData()
        .textTheme
        .navLargeTitleTextStyle
         // fixes a small bug with spacing
        .copyWith(letterSpacing: -1.5),
    titleLarge: CupertinoThemeData().textTheme.navTitleTextStyle)
...

// Use iOS text theme on iOS devices
ThemeData(
      textTheme: Platform.isIOS ? cupertinoTextTheme : null,
      ...
)
...

// Modify AppBar properties
AppBar(
        surfaceTintColor: Platform.isIOS ? Colors.transparent : null,
        shadowColor: Platform.isIOS ? CupertinoColors.darkBackgroundGray : null,
        scrolledUnderElevation: Platform.isIOS ? .1 : null,
        toolbarHeight: Platform.isIOS ? 44 : null,
        ...
      ),

```

But, because app bars are displayed alongside 
other content in your page, it's only recommended to adapt the styling 
so long as its cohesive with the rest of your application. You can see 
additional code samples and a further explanation in 
[the GitHub discussion on app bar adaptations][appbar-post]. 

### Bottom navigation bars

Since Android 12, the default UI for bottom navigation 
bars follow the design guidelines defined in [Material 3][mat-navbar]. 
On iOS, an equivalent component called "Tab Bars" 
is defined in [Apple's Human Interface Guidelines][hig-tabbar] (HIG). 

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/mat-navbar.png" 
        class="figure-img img-fluid rounded" alt="Bottom Navigation Bar in Material 3 " />
        <figcaption class="figure-caption">
          Bottom Navigation Bar in Material 3 
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/hig-tabbar.png" 
        class="figure-img img-fluid rounded" alt="Tab Bar in Human Interface Guidelines" />
        <figcaption class="figure-caption">
         Tab Bar in Human Interface Guidelines
        </figcaption>
      </figure>
    </div>
  </div>
</div>

Since tab bars are persistent across your app, they should match your
own branding. However, if you choose to use Material's default 
styling on Android, you might consider adapting to the default iOS
tab bars.

To implement platform-specific bottom navigation bars, 
you can use Flutter's `NavigationBar` widget on Android 
and the `CupertinoTabBar` widget on iOS. 
Below is a code snippet you can 
adapt to show a platform-specific navigation bars.

```dart
final Map<String, Icon> _navigationItems = {
    'Menu': Platform.isIOS ? Icon(CupertinoIcons.house_fill) : Icon(Icons.home),
    'Order': Icon(Icons.adaptive.share),
  };

...

Scaffold(
  body: _currentWidget,
  bottomNavigationBar: Platform.isIOS
          ? CupertinoTabBar(
              currentIndex: _currentIndex,
              onTap: (index) {
                setState(() => _currentIndex = index);
                _loadScreen();
              },
              items: _navigationItems.entries
                  .map<BottomNavigationBarItem>(
                      (entry) => BottomNavigationBarItem(
                            icon: entry.value,
                            label: entry.key,
                          ))
                  .toList(),
            )
          : NavigationBar(
              selectedIndex: _currentIndex,
              onDestinationSelected: (index) {
                setState(() => _currentIndex = index);
                _loadScreen();
              },
              destinations: _navigationItems.entries
                  .map<Widget>((entry) => NavigationDestination(
                        icon: entry.value,
                        label: entry.key,
                      ))
                  .toList(),
            ));
```
### Text fields

Since Android 12, text fields follow the
[Material 3][m3-text-field] (M3) design guidelines. 
On iOS, Apple's [Human Interface Guidelines][hig-text-field] (HIG) define
an equivalent component. 

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/m3-text-field.png" 
        class="figure-img img-fluid rounded" alt="Text Field in Material 3" />
        <figcaption class="figure-caption">
          Text Field in Material 3
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/hig-text-field.png" 
        class="figure-img img-fluid rounded" alt="Text Field in Human Interface Guidelines" />
        <figcaption class="figure-caption">
          Text Field in HIG
        </figcaption>
      </figure>
    </div>
  </div>
</div>

Since text fields require user input,  
their design should follow platform conventions. 

To implement a platform-specific `TextField` 
in Flutter, you can adapt the styling of the 
Material `TextField`.

```dart
Widget _createAdaptiveTextField() {
  final _border = OutlineInputBorder(
    borderSide: BorderSide(color: CupertinoColors.lightBackgroundGray),
  );

  final iOSDecoration = InputDecoration(
    border: _border,
    enabledBorder: _border,
    focusedBorder: _border,
    filled: true,
    fillColor: CupertinoColors.white,
    hoverColor: CupertinoColors.white,
    contentPadding: EdgeInsets.fromLTRB(10, 0, 0, 0),
  );

  return Platform.isIOS
      ? SizedBox(
          height: 36.0,
          child: TextField(
            decoration: iOSDecoration,
          ),
        )
      : TextField();
}
```

To learn more about adapting text fields, check out 
[the GitHub discussion on text fields][text-field-post].
You can leave feedback or ask questions in the discussion.

### Alert dialog

Since Android 12, the default UI of alert dialogs 
(also known as a "basic dialog") follows the design guidelines 
defined in [Material 3][m3-dialog] (M3). 
On iOS, an equivalent component called "alert" is defined in Apple's 
[Human Interface Guidelines][hig-alert] (HIG).

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="/assets/images/docs/platform-adaptations/m3-alert.png" 
        class="figure-img img-fluid rounded" alt="Basic Dialog in Material 3" />
        <figcaption class="figure-caption">
          Basic Dialog in M3
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="/assets/images/docs/platform-adaptations/cupertino-alert.png" 
        class="figure-img img-fluid rounded" alt="Alert in Human Interface Guidelines" />
        <figcaption class="figure-caption">
          Alert in HIG
        </figcaption>
      </figure>
    </div>
  </div>
</div>

Since alert dialogs are often tightly integrated with the operating system, 
their design generally needs to follow the platform conventions. 
This is especially important when a dialog is used to request user input 
about security, privacy, and destructive operations (e.g., deleting files 
permanently). As an exception, a branded alert dialog design can be used on 
non-critical user flows to highlight specific information or messages.

To implement platform-specific alert dialogs, 
you can use Flutter's `AlertDialog` widget on Android 
and the `CupertinoAlertDialog` widget on iOS. Below is a code snippet you can 
adapt to show a platform-specific alert dialog.

```dart
void _showAdaptiveDialog(
  context, {
  required Text title,
  required Text content,
  required List<Widget> actions,
}) {
  Platform.isIOS || Platform.isMacOS
      ? showCupertinoDialog<String>(
          context: context,
          builder: (BuildContext context) => CupertinoAlertDialog(
            title: title,
            content: content,
            actions: actions,
          ),
        )
      : showDialog(
          context: context,
          builder: (BuildContext context) => AlertDialog(
            title: title,
            content: content,
            actions: actions,
          ),
        );
}
```

To learn more about adapting alert dialogs, check out 
[the GitHub discussion on dialog adaptations][alert-post].
You can leave feedback or ask questions in the discussion.


[issue #8410]: {{site.repo.flutter}}/issues/8410#issuecomment-468034023
[android.app.AlertDialog]: {{site.android-dev}}/reference/android/app/AlertDialog.html
[`ZoomPageTransitionsBuilder`]: {{site.api}}/flutter/material/ZoomPageTransitionsBuilder-class.html
[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html
[default theme]: {{site.repo.flutter}}/blob/master/packages/flutter/lib/src/cupertino/text_theme.dart
[Material/Cupertino adaptive widget problem definition]: http://bit.ly/flutter-adaptive-widget-problem
[`Navigator.push()`]: {{site.api}}/flutter/widgets/Navigator/push.html
[overscroll glow indicator]: {{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html
[overscrolls]: {{site.api}}/flutter/widgets/BouncingScrollPhysics-class.html
[`PageRoute.fullscreenDialog`]: {{site.api}}/flutter/widgets/PageRoute-class.html
[platform_design code samples]: {{site.github}}/flutter/samples/tree/main/platform_design
[`Icons.adaptive`]: {{site.api}}/flutter/material/PlatformAdaptiveIcons-class.html
[slides and clip-reveals up]: {{site.api}}/flutter/material/OpenUpwardsPageTransitionsBuilder-class.html
[slides up and fades in]: {{site.api}}/flutter/material/FadeUpwardsPageTransitionsBuilder-class.html
[`startActivity()`]: {{site.android-dev}}/reference/android/app/Activity.html#startActivity(android.content.Intent
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[issue #8427]: {{site.repo.this}}/issues/8427
[m3-dialog]: https://m3.material.io/components/dialogs/overview
[hig-alert]: https://developer.apple.com/design/human-interface-guidelines/components/presentation/alerts/
[alert-post]: {{site.repo.uxr}}/discussions/92
[appbar-post]: {{site.repo.uxr}}/discussions/93
[mat-appbar]: https://m3.material.io/components/top-app-bar/overview
[hig-appbar]: https://developer.apple.com/design/human-interface-guidelines/components/navigation-and-search/navigation-bars/
[`Checkbox.adaptive()`]: {{site.api}}/flutter/material/Checkbox/Checkbox.adaptive.html
[`Radio.adaptive()`]: {{site.api}}/flutter/material/Radio/Radio.adaptive.html
[`Switch.adaptive()`]: {{site.api}}/flutter/material/Switch/Switch.adaptive.html
[`Slider.adaptive()`]: {{site.api}}/flutter/material/Slider/Slider.adaptive.html
[`CircularProgressIndicator.adaptive()`]: {{site.api}}/flutter/material/CircularProgressIndicator/CircularProgressIndicator.adaptive.html
[UI Component section]: {{site.api}}/platform-integration/platform-adaptations/#ui-components
[mat-navbar]: https://m3.material.io/components/navigation-bar/overview
[hig-tabbar]: https://developer.apple.com/design/human-interface-guidelines/components/navigation-and-search/tab-bars/
[text-field-post]: {{site.repo.uxr}}/discussions/95 
[m3-text-field]: https://m3.material.io/components/text-fields/overview
[hig-text-field]: https://developer.apple.com/design/human-interface-guidelines/text-fields
