---
title: Creating responsive and adaptive apps
title: 创建响应式和自适应的应用
description: It's important to create apps, whether for mobile or web, so that they are responsive to size and orientation changes.
description: 创建用于移动端和 Web 的应用非常重要，它们能够响应尺寸和旋转方向的变化。
short-title: 响应式且自适应
---

{% include docs/yt_shims.liquid %}

One of Flutter's primary goals is to create a framework
that allows you to develop apps from a single codebase
that look and feel great on any platform.

Flutter 的首要目标，是构建一个可以使用单一代码来源，
开发在所有平台上都有着良好的视觉和体验的应用的框架。

This means that your app might appear on screens of
many different sizes, from a watch, to a foldable
phone with two screens, to a high def monitor.

这意味着你的应用可能会在不同大小的屏幕上使用，
从智能手表，到可折叠的双屏设备，再到高清显示器。

Two terms that describe concepts for this
scenario are _adaptive_ and _responsive_. Ideally,
you'd want your app to be _both_ but what,
exactly, does this mean?
These terms are similar, but they are not the same.

通常这样的考量被分为两种概念：**自适应** 和 **响应式**。
理想条件下，你的应用应该两者兼具，但是它们究竟代表了什么？
这两种概念有些类似，但并不是同一种含义。

## The difference between an adaptive and a responsive app

## 自适应应用和响应式应用的区别

_Adaptive_ and _responsive_ can be viewed as separate
dimensions of an app: you can have an adaptive app
that is not responsive, or vice versa. And, of course,
an app can be both, or neither.

**自适应** 和 **响应式** 可以看作应用里的两种维度：
你的应用可能是自适应的，但不是响应式的，又或是反行其道。
当然，你的应用可能既自适应又为响应式，也可能两者均未实现。

**Responsive**
<br> Typically, a _responsive_ app has had its layout
  tuned for the available screen size. Often this
  means (for example), re-laying out the UI if the
  user resizes the window, or changes the device's
  orientation. This is especially necessary when
  the same app can run on a variety of devices,
  from a watch, phone, tablet, to a laptop or
  desktop computer.

**响应式**
<br> 通常来说，一个 **响应式** 应用的布局会根据可用的屏幕大小而调整。
  常见的场景是在用户重新调整窗口大小或旋转屏幕时，重新布局 UI。
  对于需要在多种设备（手表、手机、平板、笔记本或台式机）上运行的应用而言，
  这是必要的要素。

**Adaptive**
<br> _Adapting_ an app to run on different device types,
  such as mobile and desktop, requires dealing
  with mouse and keyboard input, as well as
  touch input. It also means there are different
  expectations about the app's visual density,
  how component selection works
  (cascading menus vs bottom sheets, for example),
  using platform-specific features (such as
  top-level windows), and more.

**自适应**
<br> 应用以 **自适应** 的方式在不同的设备上（移动端和桌面端）运行，
  需要同时处理鼠标、键盘和触控输入。
  这也意味着应用的视觉密度、组件的选择（层级菜单或底部抽屉）、
  平台特定的行为（例如置顶的窗口）等内容将在不同的平台上有一定的差异。

Learn more in the following 5-minute video:

通过以下 5 分钟的视频了解更多：

<iframe width="560" height="315" src="{{yt-embed}}/HD5gYnspYzk?si=dsA37QUjHBb2Zh_-" title="Learn the difference between adaptive and responsive Flutter apps" {{yt-set}}></iframe>

[Adaptive vs Responsive][]

[自适应与响应式][Adaptive vs Responsive]

## Creating a responsive Flutter app

## 构建一个响应式的 Flutter 应用

Flutter allows you to create apps that self-adapt
to the device's screen size and orientation.

Flutter 让你能够构建自动适配屏幕大小和旋转方向的应用。

There are two basic approaches to creating Flutter
apps with responsive design:

构建响应式设计的 Flutter 应用，有以下两种较为基础的方式：

**Use the [`LayoutBuilder`][] class**
<br> From its [`builder`][] property, you get a
  [`BoxConstraints`][] object.
  Examine the constraint's properties to decide what to
  display. For example, if your [`maxWidth`][] is greater than
  your width breakpoint, return a [`Scaffold`][] object with a
  row that has a list on the left. If it's narrower,
  return a [`Scaffold`][] object with a drawer containing that
  list. You can also adjust your display based on the
  device's height, the aspect ratio, or some other property.
  When the constraints change (for example,
  the user rotates the phone, or puts your app into a tile UI
  on Android), the build function runs.

**使用 [`LayoutBuilder`][] 类**
<br> 通过它的 [`builder`][] 属性，你可以得到一个 [`BoxConstraints`][] 对象。
  你可以检查约束里的属性，来决定如何进行显示。
  例如，如果约束里的 [`maxWidth`][] 超过了你的宽度分界点，
  你可以返回一个 [`Scaffold`][]，它包含一列内容，左侧是一个列表。
  如果约束更小，则返回一个列表在抽屉里的 [`Scaffold`][]。
  你也可以根据你的设备高度、屏幕的比例或者其他的属性，来调整你的显示。
  当约束改变时（例如用户旋转了手机，或是在 Android 上将应用放置到 tile UI 中）
  构建方法会运行。

**Use the [`MediaQuery.of()`][] method in your build functions**
<br> This gives you the size, orientation, etc, of your current app.
  This is more useful if you want to make decisions based on the
  complete context rather than on just the size of your particular
  widget. Again, if you use this, then your build function automatically
  runs if the user somehow changes the app's size.

**在构建方法中使用 [`MediaQuery.of()`][] 方法**
<br> 这个方法可以获取到当前应用（基于上下文）的尺寸、旋转方向等信息。
  如果你需要基于完整的上下文信息进行布局决策，
  而不是基于特定的 widget，这个方法将非常有用。
  同样的，如果应用的尺寸发生了改变，构建方法也会自动执行。

Other useful widgets and classes for creating a responsive UI:

以下是其他有助于构建响应式界面的 widget：

* [`AspectRatio`][]
* [`CustomSingleChildLayout`][]
* [`CustomMultiChildLayout`][]
* [`FittedBox`][]
* [`FractionallySizedBox`][]
* [`LayoutBuilder`][]
* [`MediaQuery`][]
* [`MediaQueryData`][]
* [`OrientationBuilder`][]

### Other resources

### 更多资源

For more information, here are a few resources,
including contributions from the Flutter community:

想了解更多信息，以下是一些来自社区贡献的资源：

* [Developing for Multiple Screen Sizes and Orientations in
  Flutter][] by Deven Joshi

  [使用 Flutter 开发兼顾多种屏幕尺寸和旋转的应用][Developing
  for Multiple Screen Sizes and Orientations in Flutter]，
  由 Deven Joshi 撰写

* [Build Responsive UIs in Flutter][] by Raouf Rahiche

  [使用 Flutter 构建响应式界面][Build Responsive UIs in Flutter]，
  由 Raouf Rahiche 撰写

* [Making Cross-platform Flutter Landing Page Responsive][]
  by Priyanka Tyagi

  [构建响应式的 Flutter 跨平台的登录页][Making Cross-platform
  Flutter Landing Page Responsive]，由 Priyanka Tyagi 撰写

* [How to make flutter app responsive according to different screen
  size?][], a question on StackOverflow

  [如何根据不同的屏幕大小构建响应式的 Flutter 应用？][How to make
  flutter app responsive according to different screen size?]，
  在 StackOverflow 上的一个问题。

[`AspectRatio`]: {{site.api}}/flutter/widgets/AspectRatio-class.html
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
[Build Responsive UIs in Flutter]: {{site.medium}}/flutter-community/build-responsive-uis-in-flutter-fd450bd59158
[`builder`]: {{site.api}}/flutter/widgets/LayoutBuilder/builder.html
[`CustomMultiChildLayout`]: {{site.api}}/flutter/widgets/CustomMultiChildLayout-class.html
[`CustomSingleChildLayout`]: {{site.api}}/flutter/widgets/CustomSingleChildLayout-class.html
[Developing for Multiple Screen Sizes and Orientations in Flutter]: {{site.medium}}/flutter-community/developing-for-multiple-screen-sizes-and-orientations-in-flutter-fragments-in-flutter-a4c51b849434
[`FittedBox`]: {{site.api}}/flutter/widgets/FittedBox-class.html

[`FractionallySizedBox`]: {{site.api}}/flutter/widgets/FractionallySizedBox-class.html
[How to make flutter app responsive according to different screen size?]: {{site.so}}/questions/49704497/how-to-make-flutter-app-responsive-according-to-different-screen-size
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[Making Cross-platform Flutter Landing Page Responsive]: {{site.medium}}/flutter-community/making-cross-platform-flutter-landing-page-responsive-7fffe0655970
[`maxWidth`]: {{site.api}}/flutter/rendering/BoxConstraints/maxWidth.html
[`MediaQuery`]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[`MediaQuery.of()`]: {{site.api}}/flutter/widgets/MediaQuery/of.html
[`MediaQueryData`]: {{site.api}}/flutter/widgets/MediaQueryData-class.html
[`OrientationBuilder`]: {{site.api}}/flutter/widgets/OrientationBuilder-class.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html

## Creating an adaptive Flutter app

## 创建自适应的 Flutter 应用

Learn more about creating an adaptive Flutter app with
[Building adaptive apps][], written by the gskinner team.

你可以阅读由 gskinner 团队撰写的 [构建自适应的应用][Building adaptive apps]
了解更多关于构建自适应应用的内容。

You might also check out the following episodes
of The Boring Show:

你也可以观看下面几期关于自适应布局的 The Boring Show：

<iframe style="max-width: 100%" width="560" height="315" src="{{yt-embed}}/n6Awpg1MO6M" title="Learn about adaptative layouts on the Boring Show" {{yt-set}}></iframe>
[Adaptive layouts][]

<iframe style="max-width: 100%" width="560" height="315" src="{{yt-embed}}/eikOZzfc0l4" title="Continue to learn about adaptative layouts on the Boring Show" {{yt-set}}></iframe>
[Adaptive layouts, part 2][]

For an excellent example of an adaptive app,
check out Flutter Folio, a scrapbooking app created
in collaboration with gskinner and the Flutter team:

想要尝试精美的自适应应用，可以下载由 gskinner 和 Flutter
团队共建的剪贴板应用 Flutter Folio：

<iframe style="max-width: 100%" width="560" height="315" src="{{yt-embed}}/yytBENOnF0w" title="Watch a demonstration of the Flutter Folio app" {{yt-set}}></iframe>

The [Folio source code][] is also available on GitHub.
Learn more on the [gskinner blog][].

[Folio 应用的源代码][Folio source code] 也可以在 GitHub 找到，
你可以阅读 [gskinner 的博客][gskinner blog] 了解更多内容。

### Other resources

### 更多资源

You can learn more about creating platform adaptive apps
in the following resources:

你可以在以下的资源中了解更多关于如何构建自适应平台应用的内容：

* [Platform-specific behaviors and adaptations][], a page on this site.

  [不同平台操作体验的差异和适配][Platform-specific behaviors and adaptations]，
  站内的另一篇文档。

* [Designing truly adaptive user interfaces][] a blog post and video by
  Aloïs Deniel, presented at the Flutter Vikings 2020 conference.

  [设计真正能够自适应的用户交互][Designing truly adaptive user interfaces]，
  由 Aloïs Deniel 在 2020 年的 FlutterViking 会议上发布的文章和视频。

* The [Flutter gallery app][] ([repo][]) has been written as an
  adaptive app.

  以自适应应用为目标编写的
  [Flutter Gallery 应用][Flutter gallery app]（[源代码仓库][repo]）。

[Adaptive layouts]: {{yt-watch}}?v=n6Awpg1MO6M&t=694s
[Adaptive layouts, part 2]: {{yt-watch}}?v=eikOZzfc0l4&t=11s
[Adaptive vs Responsive]: {{site.youtube-site}}/HD5gYnspYzk?si=5ItDD7UjXvGCRM0K
[Building adaptive apps]: {{site.url}}/ui/layout/responsive/building-adaptive-apps

[Designing truly adaptive user interfaces]: https://www.aloisdeniel.com/blog/designing-truly-adaptative-user-interfaces
[Flutter gallery app]: {{site.gallery}}
[Folio source code]: {{site.github}}/gskinnerTeam/flutter-folio
[gskinner blog]: https://blog.gskinner.com/
[Platform-specific behaviors and adaptations]: {{site.url}}/platform-integration/platform-adaptations
[repo]: {{site.repo.gallery}}
