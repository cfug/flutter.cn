---
title: Platform specific behaviors and adaptations
title: 不同平台操作体验的差异和适配
---

## Adaptation philosophy

## 适配哲学

There are generally 2 cases of platform adaptiveness:

平台适配通常有两种情形：

1. Things that are behaviors of the OS environment (such as text editing and
   scrolling) and that would be 'wrong' if a different behavior took place.

   操作系统所特有的操作体验（例如文本编辑和滚动）。如果操作体验与操作系统不一致，则通常会被认为是“错误的”。

2. Things that are conventionally implemented in apps using the OEM's SDKs
   (such as using parallel tabs on iOS or showing an
   [android.app.AlertDialog](https://developer.android.google.cn/reference/android/app/AlertDialog.html)
   on Android).

   使用 OEM 提供的 SDK 实现的功能体验（例如 iOS 常使用的选项卡，Android 使用 [android.app.AlertDialog](https://developer.android.google.cn/reference/android/app/AlertDialog.html) 显示一个提示窗口）。

This article mainly covers the automatic adaptations provided by Flutter
in case 1 on Android and iOS.

本文囊括了 Flutter 为解决情形 1 而提供的覆盖 Android 和 iOS 的自动适配。

For case 2, Flutter bundles the means to produce the appropriate effects of
the platform conventions but does not adapt automatically when app design
choices are needed. For a discussion, see [#8410](https://github.com/flutter/flutter/issues/8410#issuecomment-468034023).

对于情形 2，Flutter 提供了一些工具可以生成符合平台习惯的体验，但是不会根据平台自动适配，需要根据 App 设计来手工选择。更多有关的讨论，请访问 [#8410](https://github.com/flutter/flutter/issues/8410#issuecomment-468034023)。

## Page navigation

## 页面导航

Flutter provides the navigation patterns seen on Android and iOS and also
automatically adapts the navigation animation to the current platform.

Flutter 分别为 Android 和 iOS 提供了各自平台的导航模式，并根据当前平台自动适配导航转场动画。

### Navigation transitions

### 导航转场动画

On **Android**, the default
[Navigator.push]({{site.api}}/flutter/widgets/Navigator/push.html)
transition is modeled after
[startActivity()](https://developer.android.google.cn/reference/android/app/Activity.html#startActivity(android.content.Intent)),
which generally has one bottom-up animation variant.

**Android** 平台，默认提供的 [Navigator.push]({{site.api}}/flutter/widgets/Navigator/push.html) 转场动画模仿了 [startActivity()](https://developer.android.google.cn/reference/android/app/Activity.html#startActivity(android.content.Intent)) 的动画，即一种自下而上的动画效果。

On **iOS**:

**iOS** 平台：

* The default
  [Navigator.push]({{site.api}}/flutter/widgets/Navigator/push.html)
  API produces an iOS Show/Push style transition which animates from
  end-to-start depending on the locale's RTL setting. The page behind the new
  route also parallax-slides in the same direction as in iOS.

  iOS 的 [Navigator.push]({{site.api}}/flutter/widgets/Navigator/push.html) API 提供了 iOS 上的 Show 转场动画（也被成为 Push 转场动画），即根据语言的方向设置，执行一种从后到前的滚动动画效果。在显示新页面的时候，原来的页面也会沿着相同的方向进行视差滚动。

* A separate bottom-up transition style exists when pushing a page route where
 [PageRoute.fullscreenDialog]({{site.api}}/flutter/widgets/PageRoute-class.html)
  is true. This represents iOS's Present/Modal style transition and is
  typically used on fullscreen modal pages.

  当显示一个页面，且 [PageRoute.fullscreenDialog]({{site.api}}/flutter/widgets/PageRoute-class.html) 是 true 的时候，iOS 提供了另外一种自下而上的动画效果。这个动画通常被用在展示全屏模态页，也被成为 iOS 上的 Present 转场动画或 Modal 转场动画。


<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 12px;" src="../../images/platform-adaptations/navigation-android.gif" class="figure-img img-fluid" alt="An animation of the bottom-up page transition on Android" />
        <figcaption class="figure-caption">
          <span>Android page transition</span><span>Android 转场动画</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 22px;" src="../../images/platform-adaptations/navigation-ios.gif" class="figure-img img-fluid" alt="An animation of the end-start style push page transition on iOS" />
        <figcaption class="figure-caption">
          <span>iOS push transition</span><span>iOS Push 转场动画</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 22px;" src="../../images/platform-adaptations/navigation-ios-modal.gif" class="figure-img img-fluid" alt="An animation of the bottom-up style present page transition on iOS" />
        <figcaption class="figure-caption">
          <span>iOS present transition</span><span>iOS Present 转场动画</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Platform-specific transition details

### 不同平台的转场动画细节

On **Android**, 2 page transition animation styles exist depending on your OS
version:

**Android** 平台上，根据你的操作系统版本差异，有两种不通的转场动画：

* Pre API 28 uses a bottom-up animation that [slides up and fades
  in]({{site.api}}/flutter/material/FadeUpwardsPageTransitionsBuilder-class.html).

  API 28 版本之前的系统，提供了一种自下而上 [滚动并淡出]({{site.api}}/flutter/material/FadeUpwardsPageTransitionsBuilder-class.html) 的动画效果。

* On API 28 and later, the bottom-up animation [slides and clip-reveals
  up]({{site.api}}/flutter/material/OpenUpwardsPageTransitionsBuilder-class.html).

  API 28 和以后的系统，则提供了另外一种自下而上 [滚动并反向翻转]({{site.api}}/flutter/material/OpenUpwardsPageTransitionsBuilder-class.html) 的动画效果。

On **iOS** when the push style transition is used, Flutter's bundled
[CupertinoNavigationBar]({{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html)
and [CupertinoSliverNavigationBar]({{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html)
nav bars automatically animate each subcomponent to its corresponding
subcomponent on the next or previous page's CupertinoNavigationBar or
CupertinoSliverNavigationBar.

当在 **iOS** 平台上使用 Push 转场特效的时候，Flutter 内置的 [CupertinoNavigationBar]({{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html) 和 [CupertinoSliverNavigationBar]({{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html) 会自动的给当前页和下一页的子组件使用正确的动画效果。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 12px;" src="../../images/platform-adaptations/navigation-android.gif" class="figure-img img-fluid" alt="An animation of the page transition on Android pre-Android P" />
        <figcaption class="figure-caption">
          <span>Android Pre-P</span><span>Android P 以前</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img style="border-radius: 12px;" src="../../images/platform-adaptations/navigation-android-p.gif" class="figure-img img-fluid" alt="An animation of the page transition on Android on Android P" />
        <figcaption class="figure-caption">
          <span>Android Post-P</span><span>Android P 以后</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img style="border-radius: 22px;" src="../../images/platform-adaptations/navigation-ios-nav-bar.gif" class="figure-img img-fluid" alt="An animation of the nav bar transitions during a page transition on iOS" />
        <figcaption class="figure-caption">
          <span>iOS Nav Bar</span><span>iOS 导航栏</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Back navigation

### 返回导航

On **Android**, the OS back button, by default, is sent to Flutter and pops the
top route of the
[WidgetsApp]({{site.api}}/flutter/widgets/WidgetsApp-class.html)'s
Navigator.

**Android** 平台，通常操作系统的返回按钮触发的事件会发给 Flutter，并弹出 [WidgetsApp]({{site.api}}/flutter/widgets/WidgetsApp-class.html) 路由的最顶端。

On **iOS**, an edge swipe gesture can be used to pop the top route.

**iOS** 平台，从屏幕边缘的轻扫手势会弹出路由的最顶端。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 12px;" src="../../images/platform-adaptations/navigation-android-back.gif" class="figure-img img-fluid" alt="A page transition triggered by the Android back button" />
        <figcaption class="figure-caption">
          <span>Android back button</span><span>Android 返回按钮</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img style="border-radius: 22px;" src="../../images/platform-adaptations/navigation-ios-back.gif" class="figure-img img-fluid" alt="A page transition triggered by an iOS back swipe gesture" />
        <figcaption class="figure-caption">
          <span>iOS back swipe gesture</span><span>iOS 轻扫返回手势</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## Scrolling

## 滚动

Scrolling is an important part of the platform's look and feel, and Flutter
automatically adjusts the scrolling behavior to match the current platform.

滚动是不通平台提供独有体验非常重要的一环，Flutter 会根据当前的平台自动适配滚动体验。

### Physics simulation

### 物理仿真

Android and iOS both have complex scrolling physics simulations that are
difficult to describe verbally. Generally, iOS's scrollable has more weight and
dynamic friction but Android has more static friction. Therefore iOS gains high
speed more gradually but stops less abruptly and is more slippery at
slow speeds.

Android 和 iOS 平台都提供了非常复杂的滚动物理仿真，因而很难用语言来描述。通常来说，iOS 的滚动通常提供更多的分量和动态的阻力；而 Android 则更多的使用静态的阻力。所以，iOS 随着滚动慢慢的达到高速，且不会突然的停止，而且在慢速的时候显得更顺滑。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/scroll-soft.gif" class="figure-img img-fluid rounded" alt="A soft fling where the iOS scrollable slid longer at lower speed than Android" />
        <figcaption class="figure-caption">
          <span>Soft fling comparison</span><span>突然慢慢滚动的效果比较</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/scroll-medium.gif" class="figure-img img-fluid rounded" alt="A medium force fling where the Android scrollable reached speed faster and stopped more abruptly after reaching a longer distance" />
        <figcaption class="figure-caption">
          <span>Medium fling comparison</span>突然较快的滚动效果比较<span></span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/scroll-strong.gif" class="figure-img img-fluid rounded" alt="A strong fling where the Android scrollable reach speed faster and reached significantly more distance" />
        <figcaption class="figure-caption">
          <span>Strong fling comparison</span><span>突然强烈的滚动效果比较</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Overscroll behavior

### 滚动边界行为

On **Android**, scrolling past the edge of a scrollable shows an
[overscroll glow indicator]({{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html)
(based on the color of the current Material theme).

**Android** 平台，滚动达到边界的时候，会显示 [滚动灰色指示]({{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html)（具体颜色根据 Material 主题而有所不同）。

On **iOS**, scrolling past the edge of a scrollable
[overscrolls]({{site.api}}/flutter/widgets/BouncingScrollPhysics-class.html)
with increasing resistance and snaps back.

**iOS** 平台，滚动达到边界的时候，会显示一个 [滚动边界]({{site.api}}/flutter/widgets/BouncingScrollPhysics-class.html) 的弹簧效果。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/scroll-overscroll.gif" class="figure-img img-fluid rounded" alt="Android and iOS scrollables being flung past their edge and exhibiting platform specific overscroll behavior" />
        <figcaption class="figure-caption">
          <span>Dynamic overscroll comparison</span><span>动态滚动边界效果比较</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/scroll-static-overscroll.gif" class="figure-img img-fluid rounded" alt="Android and iOS scrollables being overscrolled from a resting position and exhibiting platform specific overscroll behavior" />
        <figcaption class="figure-caption">
          <span>Static overscroll comparison</span><span>静态滚动边界效果比较</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Momentum

### 动量

On **iOS**, repeated flings in the same direction stacks momentum and
builds more speed with each successive fling. There is no equivalent
behavior on *Android*.

**iOS** 平台，不停的按相同方向滚动会产生动量叠加，从而连续滚动速度会越来越快。在 *Android* 平台上没有对应的行为。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/scroll-momentum-ios.gif" class="figure-img img-fluid rounded" alt="Repeated scroll flings building momentum on iOS" />
        <figcaption class="figure-caption">
          <span>iOS scroll momentum</span><span>iOS 滚动动量</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Return to top

### 返回顶部

On **iOS**, tapping the OS status bar scrolls the primary scroll controller
to the top position. There is no equivalent behavior on **Android**.

**iOS** 平台，点击操作系统的状态栏，主要的滚动条控制器会滚动到顶部。 **Android** 没有对应的行为。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img style="border-radius: 22px;" src="../../images/platform-adaptations/scroll-tap-to-top-ios.gif" class="figure-img img-fluid" alt="Tapping the status bar scrolls the primary scrollable back to the top" />
        <figcaption class="figure-caption">
          <span>iOS status bar tap to top</span><span>iOS 点击状态栏返回顶部</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## Typography

## 排版

When using the Material package, the typography automatically defaults to the
font family appropriate for the platform. On Android, the Roboto font is used.
On iOS, the OS's San Francisco font family is used.

当使用 Material 包的时候，排版会根据平台自动使用对应的字体。Android 平台会使用 Roboto 字体，而 iOS 则会使用系统自带的 San Francisco 字体。

When using the Cupertino package, the [default
theme](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/text_theme.dart)
always uses the San Francisco font.

当使用 Cupertino 包的时候，[默认主题](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/text_theme.dart) 会一直使用 San Francisco 字体。

The San Francisco font license limits its usage to software running on iOS,
macOS, or tvOS only. Therefore a fallback font is used when running on Android
if the platform is debug-overridden to iOS or the default Cupertino theme is
used.

San Francisco 字体的授权限制了它只能被用在运行于 iOS、macOS 和 tvOS 平台上的软件。因此当运行在 Android 平台的时候，即使强制覆盖系统平台为 iOS 或者使用 Cupertino 默认主题，都会使用对应的替代字体。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/typography-android.png" class="figure-img img-fluid rounded" alt="Roboto font on Android" />
        <figcaption class="figure-caption">
          <span>Roboto on Android</span><span>Android 平台 Robot 字体</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/typography-ios.png" class="figure-img img-fluid rounded" alt="San Francisco font on iOS" />
        <figcaption class="figure-caption">
          <span>San Francisco on iOS</span><span>iOS 平台 San Francisco 字体</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## Iconography

## 图标

When using the Material package, certain icons automatically show different
graphics depending on the platform. For instance, the overflow button's 3 dots
are vertical on iOS and horizontal on Android. The back button is a simple
chevron on iOS and has a stem/shaft on Android.

当使用 Material 包的时候，根据平台不通，图标的具体样式会有差别。举例来说，更多按钮的图标，Android 上是竖直的三个点而 iOS 是横着的三个点；退回按钮，iOS 是一个简单的 V 型标记，而 Android 平台，V 型标记有个短横线。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/iconography-android.png" class="figure-img img-fluid rounded" alt="Android appropriate icons" />
        <figcaption class="figure-caption">
          <span>Icons on Android</span><span>Android 平台图标</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/iconography-ios.png" class="figure-img img-fluid rounded" alt="iOS appropriate icons" />
        <figcaption class="figure-caption">
          <span>Icons on iOS</span><span>iOS 平台图标</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

## Haptic feedback

## 触摸反馈

The Material and Cupertino packages automatically trigger the platform
appropriate haptic feedback in certain scenarios.

Material 和 Cupertino 包在特定场景下都会自动触发符合平台特点的触摸反馈。

For instance, a word selection via text field long-press triggers a 'buzz'
vibrate on Android and not on iOS.

例如，在文本输入框控件里面长按选中单词会在 Android 设备上会触发震动，而 iOS 不会。

Scrolling through picker items on iOS triggers a 'light impact' knock and
no feedback on Android.

在 iOS 滚动选择器项目列表，会触发一个很轻的敲击音效，而 Android 则不会。

## Text editing

## 文本编辑

Flutter also makes the below adaptations while editing the content of text
fields to match the current platform.

Flutter 会根据当前平台来适配正确的文本编辑体验。

### Keyboard gesture navigation

### 键盘手势导航

On **Android**, horizontal swipes can be made on the soft keyboard's spacebar
to move the cursor in Material and Cupertino text fields.

**Android** 平台，在虚拟键盘空格键上可以通过左右轻扫来移动光标，Material 和 Cupertino 的文本输入框控件都支持该特性。

On **iOS** devices with 3D Touch capabilities, a force-press-drag gesture,
could be made on the soft keyboard to move the cursor in 2D via a floating
cursor. This works on both Material and Cupertino text fields.

**iOS** 设备提供了 3D Touch 兼容，通过在虚拟键盘上使用长按并拖拽手势可以任意方向移动光标。Material 和 Cupertino 都对这个功能提供了支持。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/text-keyboard-move-android.gif" class="figure-img img-fluid rounded" alt="Moving the cursor via the space key on Android" />
        <figcaption class="figure-caption">
          <span>Android space key cursor move</span><span>Android 通过空格键移动光标</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/text-keyboard-move-ios.gif" class="figure-img img-fluid rounded" alt="Moving the cursor via 3D Touch drag on the keyboard on iOS" />
        <figcaption class="figure-caption">
          <span>iOS 3D Touch drag cursor move</span><span>iOS 通过 3D Touch 拖拽移动光标</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Text selection toolbar

### 文本选中工具栏

With **Material on Android**, the Android style selection toolbar is shown when
a text selection is made in a text field.

在 **Android** 平台上使用 **Material**，在文本输入框里面选中文本会显示一个 Android 风格的文本选中工具栏。

With **Material on iOS** or when using **Cupertino**, the iOS style selection
toolbar is shown when a text selection is made in a text field.

在 **iOS** 平台上使用 **Material** 或者在两个平台上都使用 **Cupertino**，在文本输入框里面选中文本会展示一个 iOS 风格的文本选中工具栏。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/text-toolbar-android.png" class="figure-img img-fluid rounded" alt="Android appropriate text toolbar" />
        <figcaption class="figure-caption">
          <span>Android text selection toolbar</span><span>Android 文本选中工具栏</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/text-toolbar-ios.png" class="figure-img img-fluid rounded" alt="iOS appropriate text toolbar" />
        <figcaption class="figure-caption">
          <span>iOS text selection toolbar</span><span>iOS 文本选中工具栏</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Single tap gesture

### 点击手势

With **Material on Android**, a single tap in a text field puts the cursor at
the location of the tap.

在 **Android** 平台使用 **Material**，在文本控件中点击会移动光标到点击处。

A collapsed text selection also shows a draggable handle to subsequently move
the cursor.

同时，光标会有一个可移动的把手，随后可以通过这个把手移动光标。

With **Material on iOS** or when using **Cupertino**, a single tap in a text
field puts the cursor at the nearest edge of the word tapped.

在 **iOS** 平台使用 **Material** 或者在两个平台都使用 **Cupertino**，在文本空间中点击，会把光标移动到点击处最近的单词末尾。

Collapsed text selections don't have draggable handles on iOS.

在 iOS 平台上，光标是没有把手的。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/text-single-tap-android.gif" class="figure-img img-fluid rounded" alt="Moving the cursor to the tapped position on Android" />
        <figcaption class="figure-caption">
          <span>Android tap</span><span>Android 点击</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/text-single-tap-ios.gif" class="figure-img img-fluid rounded" alt="Moving the cursor to the nearest edge of the tapped word on iOS" />
        <figcaption class="figure-caption">
          <span>iOS tap</span><span>iOS 点击</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Long-press gesture

### 长按手势

With **Material on Android**, a long press selects the word under the long
press. The selection toolbar is shown upon release.

在 **Android** 平台使用 **Material**，在单词上长按会选中单词，并在释放长按的时候显示文本选中工具栏。

With **Material on iOS** or when using **Cupertino**, a long press places the
cursor at the location of the long pres. The selection toolbar is shown upon
release.

在 **iOS** 平台使用 **Material** 或者在两个平台都使用 **Cupertino**，长按会把光标放置到长按的位置，并在释放长按的时候显示文本选中工具栏。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/text-long-press-android.gif" class="figure-img img-fluid rounded" alt="Selecting a word via long press on Android" />
        <figcaption class="figure-caption">
          <span>Android long press</span><span>Android 长按</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/text-long-press-ios.gif" class="figure-img img-fluid rounded" alt="Selecting a position via long press on iOS" />
        <figcaption class="figure-caption">
          <span>iOS long press</span><span>iOS 长按</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Long-press drag gesture

### 长按并拖放手势

With **Material on Android**, dragging while holding the long press expands
the words selected.

在 **Android** 平台上使用 **Material**，长按并拖拽会选中更多单词。

With **Material on iOS** or when using **Cupertino**, dragging while holding
the long press moves the cursor.

在 **iOS** 平台使用 **Material** 或者在两个平台都使用 **Cupertino**，长按并拖拽会移动光标。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/text-long-press-drag-android.gif" class="figure-img img-fluid rounded" alt="Expanding word selection via long press drag on Android" />
        <figcaption class="figure-caption">
          <span>Android long press drag</span><span>Android 长按并拖放</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/text-long-press-drag-ios.gif" class="figure-img img-fluid rounded" alt="Moving the cursor via long press drag on iOS" />
        <figcaption class="figure-caption">
          <span>iOS long press drag</span><span>iOS 长按并拖放</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

### Double tap gesture

### 双击手势

On both Android and iOS, a double tap selects the word receiving the
double tap and shows the selection toolbar.

Android 和 iOS 平台上，双击选中一个单词都会收到双击手势事件，并显示文本选中工具栏。

<div class="container">
  <div class="row">
    <div class="col-sm text-center">
      <figure class="figure">
        <img src="../../images/platform-adaptations/text-double-tap-android.gif" class="figure-img img-fluid rounded" alt="Selecting a word via double tap on Android" />
        <figcaption class="figure-caption">
          <span>Android double tap</span><span>Android 双击</span>
        </figcaption>
      </figure>
    </div>
    <div class="col-sm">
      <figure class="figure text-center">
        <img src="../../images/platform-adaptations/text-double-tap-ios.gif" class="figure-img img-fluid rounded" alt="Selecting a word via double tap on iOS" />
        <figcaption class="figure-caption">
          <span>iOS double tap</span><span>iOS 双击</span>
        </figcaption>
      </figure>
    </div>
  </div>
</div>
