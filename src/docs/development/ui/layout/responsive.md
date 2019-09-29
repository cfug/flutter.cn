---
title: Creating responsive apps
title: 创建响应式应用
short-title: Responsive
short-title: 响应式
---

A responsive app lays out its UI according to the
size and shape of the screen or window.
This is especially necessary when the same app
can run on a variety of devices, from a watch, phone,
tablet, to a laptop or desktop computer. When the user
resizes the window on a laptop or desktop,
or changes the orientation of the phone or tablet,
the app should respond by rearranging the UI accordingly.

响应式应用指的是应用的 UI 会随着屏幕或窗口的改变而改变，
当同一个应用需要运行在不同种类的设备的时候
（比如手表、手机、平板、笔记本或台式机电脑），
当用户在笔记本或台式机上调整窗口大小，
或者改变了手机或者平板的方向时，
你的应用都需要相应的重新调整界面来做出响应。

Flutter allows you to create apps that self-adapt
to the device's screen size and orientation.

有了 Flutter，你就可以创建一个自适应屏幕大小和方向的应用。

There are two basic approaches to creating Flutter
apps with responsive design:

如下两种方法可以帮助你使用 Flutter 创建响应式应用：

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
  in Nougat), the build function runs.
  
**使用 [`LayoutBuilder`][] 类**
<br> 通过它的 [`builder`][] 属性你能得到一个 [`BoxConstraints`][]对象，
  通过检查 constraints 的属性来确定要显示的内容。
  例如，如果你的 [`maxWidth`][]（最大宽度）大于你的宽度断点，
  它会返回一个包含剧左的列表的 [`Scaffold`][] 对象。
  如果它更窄，则会通过返回包含一个抽屉（drawer）的[`Scaffold`][] 对象。
  同时你可以根据设备的高度、宽高比或者其他属性调整 UI 显示，
  当 constraints 发生变化时候，比如用户旋转手机或者应用分屏时，
  build 函数都会执行。

**Use the [`MediaQuery.of()`][] method in your build functions**
<br> This gives you the size, orientation, etc, of your current app.
  This is more useful if you want to make decisions based on the
  complete context rather than on just the size of your particular
  widget. Again, if you use this, then your build function automatically
  runs if the user somehow changes the app's size.
  
**在 build 函数里使用 [`MediaQuery.of()`][] 方法**
<br> 这个方法将会提供应用当前的显示大小，方向等，如果你希望根据 context 来决定
  而不是根据特点 widget 大小来做应用的改变，使用这个方法将会更有用。
  同样的，当用户以某种方式改变应用大小的时候，build 函数会自动执行。

Other useful widgets for creating a responsive UI:

与创建响应式应用有关的非常有用的 widgets:

* [`AspectRatio`][]
* [`CustomSingleChildLayout`][]
* [`CustomMultiChildLayout`][]
* [`FittedBox`][]
* [`FractionallySizedBox`][]
* [`LayoutBuilder`][]
* [`MediaQuery`][]
* [`MediaQueryData`][]
* [`OrientationBuilder`][]

For more information, here are a few resources,
including contributions from the Flutter community:

更多信息，请查阅这些来自社区提供的资料：

* [MediaQuery (Flutter Widget of the Week video)](https://www.youtube.com/watch?v=A3WrA4zAaPw)

  每周 Flutter Widget 系列视频之 [MediaQuery](https://www.youtube.com/watch?v=A3WrA4zAaPw)
  
* [Developing for Multiple Screen Sizes and Orientations in
  Flutter]({{site.medium}}/flutter-community/developing-for-multiple-screen-sizes-and-orientations-in-flutter-fragments-in-flutter-a4c51b849434)
  by Deven Joshi
  
  Deven Joshi 写的文章：[Flutter 应用开发：为多屏幕尺寸和不同屏幕方向]({{site.medium}}/flutter-community/developing-for-multiple-screen-sizes-and-orientations-in-flutter-fragments-in-flutter-a4c51b849434)
  
* [Build Responsive UIs in
  Flutter]({{site.medium}}/flutter-community/build-responsive-uis-in-flutter-fd450bd59158)
  by Raouf Rahiche

  Raouf Rahiche 的文章 [在 Flutter 里构建响应式应用]({{site.medium}}/flutter-community/build-responsive-uis-in-flutter-fd450bd59158)
  
* [Making Cross-platform Flutter Landing Page
  Responsive]({{site.medium}}/flutter-community/making-cross-platform-flutter-landing-page-responsive-7fffe0655970)
  by Priyanka Tyagi

  Priyanka Tyagi 的文章：[开发跨平台的响应式应用]({{site.medium}}/flutter-community/making-cross-platform-flutter-landing-page-responsive-7fffe0655970)
  
* [How to make flutter app responsive according to different screen
  size?][],
  a question on StackOverflow

  来自 StackOverflow 的问答 [如何根据不同屏幕大小构建 Flutter 应用？][How to make flutter app responsive according to different screen size?]

[`AspectRatio`]: {{site.api}}/flutter/widgets/AspectRatio-class.html
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
[`CustomMultiChildLayout`]: {{site.api}}/flutter/widgets/CustomMultiChildLayout-class.html
[`CustomSingleChildLayout`]: {{site.api}}/flutter/widgets/CustomSingleChildLayout-class.html
[`FittedBox`]: {{site.api}}/flutter/widgets/FittedBox-class.html
[`FractionallySizedBox`]: {{site.api}}/flutter/widgets/FractionallySizedBox-class.html
[How to make flutter app responsive according to different screen size?]: https://stackoverflow.com/questions/49704497/how-to-make-flutter-app-responsive-according-to-different-screen-size
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`MediaQuery`]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[`MediaQuery.of()`]: {{site.api}}/flutter/widgets/MediaQuery/of.html
[`MediaQueryData`]: {{site.api}}/flutter/widgets/MediaQueryData-class.html
[`OrientationBuilder`]: {{site.api}}/flutter/widgets/OrientationBuilder-class.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`builder`]: {{site.api}}/flutter/widgets/LayoutBuilder/builder.html
[`maxWidth`]: {{site.api}}/flutter/rendering/BoxConstraints/maxWidth.html