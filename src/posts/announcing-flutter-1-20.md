-----
title: Announcing Flutter 1.20
title: Flutter 1.20 来啦！规模最大的版本发布都有哪些更新？
-----

Performance improvements, mobile autofill, a new widget and more!

性能改进、移动端自动填充、全新 widget 以及更多内容！

![](https://devrel.andfun.cn/devrel/posts/2020/08/bbbf90037ad95.png){:width="95%"}

Chris Sells

作者 / Chris Sells, Product Manager, Flutter developer experience

Our ongoing vision with Flutter is to provide a portable toolkit for building stunning experiences wherever you might want to paint pixels on the screen. With every release, we continue to push towards ensuring that Flutter is fast, beautiful, productive and open for every platform we support. In Flutter 1.20, which is released today to our stable channel, Flutter has improvements for every one of these four pillars.

我们对 Flutter 的愿景是提供一个可移植的工具包，让您无论在任何屏幕上都能随心所欲地绘制像素，打造出美好的体验。每次更新，我们都着力确保 Flutter 能够在所有支持的平台上运行流畅、界面美观、开发高效而且保持开放性。通过稳定版渠道发布的 Flutter 1.20 在上述四个方面都进展颇多。

In the category of fast, we’ve got multiple performance improvements, from the lowest levels of the rendering engine and in the Dart language itself.

首先是运行流畅，我们从最底层的渲染引擎到 Dart 语言本身都实现了多项性能改进。

To enable you to build Flutter apps that are ever more beautiful, this release has several UI enhancements, including the long-awaited support for autofill, a new way to layer your widgets to support pan and zoom, new mouse cursor support, updates to old favorite Material widgets (such as the time and date pickers), and a whole new responsive license page for the About box in your desktop and mobile form-factor Flutter apps.

为了让您构建出更美观的 Flutter 应用，此版本提供了多项界面改进，包括期待已久的自动填充支持、支持平移和缩放的新 widget 布局方式、新的鼠标光标支持、旧版本中人气 Material widget（如时间和日期选择器）的更新，以及为桌面和移动端 Flutter 应用中的关于（About）界面带来了全新的响应式许可（license）展示页面。

To make sure that you continue to be more productive, we’ve got updates to the [Flutter extension for Visual Studio Code](https://dartcode.org/) that brings Dart DevTools directly into your IDE, automatically updating your import statements as you move your files around and a new set of metadata for building your own tools.

为了进一步提高开发效率，我们更新了 [Visual Studio Code 的 Flutter 扩展](https://dartcode.org/)，将 Dart DevTools 直整合进 IDE，在您移动文件时会帮您自动更新导入语句，并提供了一组新的元数据用于构建您自己的工具。

And it’s because of Flutter’s openness and amazing community contributors that this release includes 3,029 merged PRs and 5,485 closed issues from 359 contributors from around the world, including 270 contributors from the Flutter community at large. In fact, this marks the largest number of contributors we’ve ever had for a Flutter release. Special shoutout to community contributor [CareF](https://github.com/CareF) for 28 PRs, [AyushBherwani1998](https://github.com/AyushBherwani1998) for 26 PRs, including 10 to the Flutter samples as part of his Google Summer of Code project, and [a14n](https://github.com/a14n) for 13 PRs, many of which are in service of landing null safety for Flutter (more on that topic soon!). We couldn’t create Flutter without a broad team of community contributors, so thank you!

得益于 Flutter 的开放性和来自社区的出色贡献，此版本包含了全球 359 名贡献者（其中包括来自 Flutter 社区的 270 名贡献者）的 3,029 个合并 PR，关闭了 5,485 个 issue。因此本次更新的 Flutter 版本也是目前为止拥有最多贡献者的版本。在这里特别感谢在社区中贡献了 28 个 PR的 [CareF](https://github.com/CareF)，贡献了 26 个 PR 的 [AyushBherwani1998](https://github.com/AyushBherwani1998)（包括他用于 Google Summer of Code 项目的 10 个 Flutter 示例），以及贡献了 13 个 PR 的 [a14n](https://github.com/a14n)（其中一大部分用于支持 Flutter 的空安全性，有关该主题的更多信息即将到来！）。Flutter 的诞生离不开社区贡献者们的广泛支持。谢谢大家！

Each new release of Flutter brings with it increased usage and momentum. In fact, in April, [we reported](https://medium.com/flutter/flutter-spring-2020-update-f723d898d7af) that the number of Flutter apps in the Google Play store had reached 50,000, with a peak rate of 10,000 new apps/month. Now, just over three months later, there are more than 90,000 Flutter apps in Google Play. We’re seeing a lot of this growth in India, which is now the #1 region for Flutter developers, having doubled in the last six months, which aligns well with [Google’s increased investment](https://www.businessinsider.com/google-alphabet-india-health-agriculture-education-tech-ai-sundar-pichai-2020-7) in that region. And finally, Flutter isn’t Flutter without Dart, so it’s great to see the that [the IEEE has reported that Dart has moved up 4 slots since last year to be #12](https://spectrum.ieee.org/static/interactive-the-top-programming-languages-2020) in the top 50 languages that they track.

Flutter 每一个新版本的发布都伴随着使用量的增长和更迅猛的发展态势。事实上，在 4 月份我们曾[报道过](https://mp.weixin.qq.com/s/DS8lAkqtK_Qp37o8ISlthA) Google Play 商店中 Flutter 应用的数量已经达到 50,000，月度新增应用数量峰值更是高达 10,000。现在，短短三个月后，Google Play 中的 Flutter 应用数量已经超过 90,000。增长最快的当属印度，那里已经是 Flutter 开发者最多的地区，开发者数量在过去六个月中翻了一番，这与 [Google 在该地区增加的投资](https://www.businessinsider.com/google-alphabet-india-health-agriculture-education-tech-ai-sundar-pichai-2020-7)密切相关。最后，如果没有 Dart 语言，Flutter 也不会成为现在的 Flutter。这里分享一个好消息：在 IEEE 的[开发语言榜单](https://spectrum.ieee.org/static/interactive-the-top-programming-languages-2020)中，Dart 相比去年上升了 4 位，在榜单的前 50 种语言中排名第 12。

# Performance improvements for Flutter and Dart

# Flutter 和 Dart 的性能改进

On the Flutter team, we’re always looking for new ways to decrease the size and latency of your app. As an example of the former, this release fixes [a tooling performance issue with icon font tree shaking](https://github.com/flutter/flutter/pull/55417) and [makes font tree shaking the default behavior](https://github.com/flutter/flutter/pull/56633) when building your non-web apps. Icon font tree shaking removes the icons that you’re not using in your app, thus reducing the size. Using this against the Flutter Gallery app, we found that it [reduced the app size by 100kb](https://github.com/flutter/flutter/pull/49737). Now you get this behavior by default in your mobile apps when you’re doing a release build. It’s currently restricted to TrueType Fonts, but that restriction will be lifted in future releases.

Flutter 团队一直在寻找缩减应用大小和延迟的新方法。对于大小，[此版本修复了在进行图标字体摇树（tree-shaking）操作时的工具性能问题](https://github.com/flutter/flutter/pull/55417)，并在您构建非 web 应用时默认进行[字体摇树操作](https://github.com/flutter/flutter/pull/56633)。图标字体摇树操作会移除应用中未使用的图标，从而缩减其大小。在对 Flutter Gallery 应用进行该操作后，我们发现[应用大小缩减了 100kb](https://github.com/flutter/flutter/pull/49737)。现在，在构建移动版应用的发布版本时该操作会默认执行。目前仅限于 TrueType 字体，但在未来版本中将取消这个限制。

Another performance improvement we’ve made in this release reduces jank in the initial display of your animation using a warm-up phase. You can see an example of the jank improvement in this animation (slowed down to half speed).

此版本带来的另一项性能改进是使用预热阶段减少动画初始显示时的卡顿。以下为卡顿改进的动画示例（半速播放）。

![](https://devrel.andfun.cn/devrel/posts/2020/08/455f666234c9d.gif){:width="95%"}

animation without and with the SkSL warm-up

△ 使用和不使用 SkSL 预热的动画

If a Flutter app has janky animations during the first run, the Skia Shading Language shader provides for pre-compilation as part of your app’s build that can speed it up by more than 2x. If you’d like to take advantage of this advanced functionality, see [the SkSL warm-up page](https://flutter.dev/docs/perf/rendering/shader) on flutter.dev.

如果 Flutter 应用在首次运行时的动画出现卡顿，那么 Skia Shading Language 着色器将在应用构建中提供预编译，将速度提高 2 倍以上。如果您想使用此高级功能，请参见 flutter 文档中的 [SkSL 预热页面](https://flutter.cn/docs/perf/rendering/shader)。

And finally, as we optimize for desktop form-factors, we continue to refine our mouse support. In this release, we’ve [refactored the mouse hit testing system](https://github.com/flutter/flutter/pull/59883) to provide a number of architectural advantages that were blocked due to performance issues. The refactoring enables us to improve the performance by as much as 15x in our web-based microbenchmarks! What this means to you is that you get better, more consistent, and more accurate hit testing w/o giving up performance: win-win!

最后，在针对桌面环境的优化中，我们进一步完善了对鼠标的支持。在此版本，我们[重构了鼠标点击测试系统](https://github.com/flutter/flutter/pull/59883)，带来了许多曾因性能问题受阻的架构优势。在基于 web 的微型基准测试中，重构使性能提高了多达 15 倍！这意味着，您可以在保证性能的前提下，获得更好、更一致、更准确的点击测试结果：实现双赢！

With this better, faster, stronger mouse hit testing, we’ve added support for mouse cursors — one of the most upvoted features for desktop. Several commonly used widgets will display the cursors you expect by default, or you can specify another from the list of supported cursors.

有了更好、更快、更强大的鼠标点击测试，我们又增加了鼠标光标支持，这也是桌面端最受期待的功能之一。一些常用的 widget 将默认显示主流光标，您也可以从支持的光标列表中指定其他光标。

![](https://devrel.andfun.cn/devrel/posts/2020/08/86c0af8ecf3d3.gif){:width="95%"}

new mouse cursors over existing widgets on Android

△ 鼠标在 Android 既有的 widget 上悬停时切换显示光标

This release of Flutter is built on the 2.9 release of Dart. This features a new state-based, two-pass UTF-8 decoder with decoding primitives optimized in the Dart VM, partially taking advantage of SIMD instructions. UTF-8 is by far the most widely used character encoding method on the internet, and being able to decode it quickly is critical when receiving large network responses. In our UTF-8 decoding benchmarks we have seen improvements across the board from nearly 200% for English texts to 400% for Chinese texts on low-end ARM devices.

此版本 Flutter 基于 2.9 版 Dart 构建，采用基于状态的全新双通 UTF-8 解码器，解码原语在 Dart VM 中优化，部分利用了 SIMD 指令。UTF-8 是目前互联网上最常用的字符编码方法。在接收大型网络响应时，快速对其进行解码至关重要。在 UTF-8 解码基准测试中，我们在低端 ARM 设备上测得的性能得到了全面改进：英语文本提升至近 200%，中文文本提升至 400%。

# Autofill for mobile text fields

# 移动端文本字段自动填充

One of the #1 most requested Flutter features for a while has been to support the underlying Android and iOS support for text autofill in Flutter programs. With [PR 52126](https://github.com/flutter/flutter/pull/52126), we’re pleased to say that the wait is over — no more asking your users to re-enter data that the OS has already gathered for them.

一段时间以来，呼声最高的 Flutter 功能之一就是为 Flutter 应用中的文本自动填充提供 Android 和 iOS 的底层支持。通过 [PR 52126](https://github.com/flutter/flutter/pull/52126)，我们很高兴地宣布该支持已经实现，如果操作系统已经搜集到可供自动填充的信息，您的用户无需再重新输入了。

![](https://devrel.andfun.cn/devrel/posts/2020/08/04693616a125a.gif){:width="95%"}

Autofill in action

△ 自动填充

You’ll be pleased to hear that we’ve already started adding this functionality for the web, as well.

再告诉您一个好消息，我们已经开始着手在 web 端实现这一功能。

# A new widget for common patterns of interaction

# 用于常见交互模式的全新 widget

This release introduces a new widget, the InteractiveViewer. The InteractiveViewer is designed for building common kinds of interactivity into your app, like pan, zoom, and drag ’n’ drop, even in the face of resizing, which [this simple Go board sample](https://github.com/justinmc/flutter-go) demonstrates.

此版本引入了一个新的 widget：InteractiveViewer。InteractiveViewer 旨在为您的应用构建常见交互，如平移、缩放和拖放，甚至在可调节大小的窗口中也可实现这些交互，请参见下面这个[简单的围棋示例](https://github.com/justinmc/flutter-go)。

![](https://devrel.andfun.cn/devrel/posts/2020/08/1926f95f7fd40.gif){:width="95%"}

Zooming, panning, resizing, dragging and dropping with the InteractiveViewer

△　InteractiveViewer 的缩放、平移、调整大小与拖放

To see how to integrate the InteractiveViewer into your own app, [check out the API documentation](https://api.flutter.dev/flutter/widgets/InteractiveViewer-class.html) where you can play with it in DartPad. Also, if you’d like to hear about how the InteractiveViewer was designed and developed, you can [see a presentation by the author for Chicago Flutter on YouTube](https://www.youtube.com/watch?v=ChFa0A72Uto).

请查看 [API 文档](https://api.flutter.cn/flutter/widgets/InteractiveViewer-class.html)，了解如何将 InteractiveViewer 集成到您自己的应用中，您也可以在 DartPad 中快速进行体验。另外，如果您想了解 InteractiveViewer 的设计和开发经历，可以观看 ChicagoFlutter 发布的[演讲视频](https://www.youtube.com/watch?v=ChFa0A72Uto)。

If you’re interested in adding the kind of interactivity to your Flutter app that InteractiveViewer enables, then you’ll probably also be happy to hear that we’ve [added more capabilities to drag ’n’ drop](https://github.com/monkeyswarm/DragTargetDetailsExample) in this release. Specifically, if you’d like to know precisely where the drop happened on the target widget (it’s always been available to the Draggable object itself), now you can get that information with the DragTarget onAcceptDetails method.

有兴趣在 Flutter 应用中加入更多类似 InteractiveViewer 的交互？欢迎了解一下我们在这一版本[对拖放功能所做的增强](https://github.com/monkeyswarm/DragTargetDetailsExample)。具体来说，如果您想知道拖拽的“放置”操作发生在目标 widget（始终对 Draggable 对象可用）上的精确位置，现在您可以通过 DragTarget 的 onAcceptDetails 方法获得该信息。

![](https://devrel.andfun.cn/devrel/posts/2020/08/89b6c425a5767.gif){:width="95%"}

New drag target accept details in action

△ 接收拖放目标详情信息演示

Check out [this sample](https://github.com/monkeyswarm/DragTargetDetailsExample) for the details and look forward to a future release that will make this information available during the drag as well so that the DragTarget can more easily provide visual updates during a drag operation.

您可以通过这个[示例](https://github.com/monkeyswarm/DragTargetDetailsExample)了解详细信息，未来版本还将在拖动过程中提供这些信息，以便 DragTarget 在拖动操作期间更轻松地提供可视化的更新。

# Updated Material Slider, RangeSlider, TimePicker, and DatePicker

# Widget 更新：

# Material Slider / RangeSlider / TimePicker / DatePicker

In addition to new widgets, this release includes a number of updated widgets to match [the latest Material guidelines](https://material.io/components/sliders). These include Slider and RangeSlider. For more information, see [What’s new with the Slider widget?](https://medium.com/flutter/whats-new-with-the-slider-widget-ce48a22611a3)

除了新添加的 widget，此版本还包含许多既有 widget 的更新，以匹配[最新的 Material 指南](https://material.io/components/sliders)。其中包括 Slider 和 RangeSlider。更多信息参见 [Slider widget 的更新](https://medium.com/flutter/whats-new-with-the-slider-widget-ce48a22611a3)。

![](https://devrel.andfun.cn/devrel/posts/2020/08/163a04b7ec35d.png){:width="95%"}

updated Material Slider

△ 新版 Material Slider

![](https://devrel.andfun.cn/devrel/posts/2020/08/4b39c88d13982.png){:width="95%"}

Updated Material RangeSlider

△ 新版 Material RangeSlider

DatePicker has been updated to include a new compact design as well as support for date ranges.

更新的 DatePicker 新添了紧凑型设计以及对日期范围的支持。

updated DatePicker![](https://devrel.andfun.cn/devrel/posts/2020/08/9b72841cf6b9a.gif){:width="95%"}

△ 新版 DatePicker

And finally, TimePicker has a completely new style.

最后，TimePicker 也有了全新的视觉风格。

![](https://devrel.andfun.cn/devrel/posts/2020/08/aa761b870a116.png){:width="95%"}

updated TimePicker

△ 新版 TimePicker

If you’d like to play around with it, here’s [a fun web demo built with Flutter](https://flutter-time-picker.firebaseapp.com/#/).

如果您想上手操作，请试试[使用 Flutter 构建的趣味网络演示](https://flutter-time-picker.firebaseapp.com/#/)。

# Responsive Licenses page

# 响应式许可页面

Another update this release is the new responsive licenses page available from the AboutDialog.

此版本的另一个更新是 AboutDialog 中提供的新的响应式许可页面。

![](https://devrel.andfun.cn/devrel/posts/2020/08/f46d9adbfbdba.png){:width="95%"}

new licenses page

△ 新的许可页面

[PR 57588](https://github.com/flutter/flutter/pull/57588), from community contributor [TonicArtos](https://github.com/TonicArtos), is not only updated to match Material guidelines, making it just plain nice to look at, but it’s easier to navigate and designed to work as well on tablets and desktops as on phones. Thanks, TonicArtos! Since every Flutter app should be showing the licenses for the packages they’re using, you just made every Flutter app better!

社区贡献者 [TonicArtos](https://github.com/TonicArtos) 的 [PR 57588](https://github.com/flutter/flutter/pull/57588) 遵循 Material 指南进行更新，外观更加精美，更易于导航，并且在平板电脑、桌面设备和手机上都一样好用。谢谢 TonicArtos！由于每个 Flutter 应用都应显示其所用 package 的许可，如此一来每个 Flutter 应用都获得了改进！

# New pubspec.yaml format required for publishing plugins

# 发布插件所需的新 pubspec.yaml 格式

Of course, Flutter isn’t just the widgets; it’s also the tooling and this release comes with too many updates to mention. However, here are some of the highlights.

当然，Flutter 不仅是 widget (在 Flutter 里: Everything is a Widget)，它也是一个工具。今天这个版本中带来的更新实在太多，无法一一提及。下面是一些亮点：

First and foremost, a public service announcement: if you’re a Flutter plugin author, then the legacy pubspec.yaml format is no longer supported for publishing plugins. If you try, you’ll get the following error message when executing pub publish:

首先是一则声明：如果您是 Flutter 插件作者，发布插件时将不再支持使用旧的 pubspec.yaml 格式。在使用旧格式文件执行 pub publish 时会收到以下错误消息：

![](https://devrel.andfun.cn/devrel/posts/2020/08/439e46e8de177.png){:width="95%"}

Legacy pubspec format error message upon plugin publication

△ 插件发布时使用旧 pubspec 格式后收到的错误消息

The old format did not support specifying which platforms your plugins support, and has been deprecated since Flutter 1.12. [The new pubspec.yaml format](https://flutter.dev/docs/development/packages-and-plugins/developing-packages#plugin-platforms) is now required for publishing new or updated plugins.

旧格式不能指定插件支持的平台，自 Flutter 1.12 起已弃用。现在，发布新的插件或更新插件时需要使用[新的 pubspec.yaml 格式](https://flutter.cn/docs/development/packages-and-plugins/developing-packages#plugin-platforms)。

For clients of plugins, the tools still understand the old pubspec format and will for the foreseeable future. All existing plugins on pub.dev using the legacy pubspec.yaml format will continue to work with Flutter apps for the foreseeable future.

对于插件的用户，开发工具在当下和可预见的将来仍然能理解旧 pubspec 格式。在可预见的将来，pub.dev 上所有使用旧 pubspec.yaml 格式的既有插件可继续在 Flutter 应用中使用。

# Preview of embedded Dart DevTools in Visual Studio Code

# 功能预览：

# 在 Visual Studio Code 中嵌入 Dart DevTools

The biggest tooling update in this release comes to the Visual Studio Code extension, which provides a preview of a new feature to enable you to bring Dart DevTools screens directly into your coding workspace.

此版本最大的工具更新是 Visual Studio Code 扩展，它提供了一项新功能的预览，使您能够将 Dart DevTools 界面直接嵌入编程工作区。

![](https://devrel.andfun.cn/devrel/posts/2020/08/1bb7686b6aee2.png){:width="95%"}

Preview of Layout Explorer from Dart DevTools embedded into Visual Studio Code

△ 预览功能：在 Visual Studio Code 中嵌入 Dart DevTools 的 Layout Explorer

Enable this feature with the new dart.previewEmbeddedDevTools setting. The above screenshot shows the Flutter Widget Inspector embedded directly into Visual Studio Code but with this new setting enabled, you can choose your favorite page embed using the Dart DevTools menu on the status bar.

使用新的 dart.previewEmbeddedDevTools 设置启用此功能。在上面的屏幕截图中，Flutter Widget Inspector 直接嵌入 Visual Studio Code，但是启用新设置后，您可以使用状态栏上的 Dart DevTools 菜单嵌入其他您偏好的页面。

![](https://devrel.andfun.cn/devrel/posts/2020/08/e483d4839aed8.png){:width="95%"}

This menu allows you to choose which pages to show.

通过此菜单选择要显示的页面。

![](https://devrel.andfun.cn/devrel/posts/2020/08/3a9be4183f989.gif){:width="95%"}

This feature is still in preview, so [let us know if you have any trouble with it](https://github.com/Dart-Code/Dart-Code/issues).

该功能仍处于预览状态，如果您遇到任何问题，请[在这里提交反馈](https://github.com/Dart-Code/Dart-Code/issues)。

# Updates to network tracking

# 网络监测功能更新

The latest version of Dart DevTools comes with an updated version of the Network page that enables web socket profiling.

最新版本 Dart DevTools 带有更新的 Network 页面，可以实现网络套接字分析。

![](https://devrel.andfun.cn/devrel/posts/2020/08/f2570ba7c41dd.png){:width="95%"}

Timing, status and content type of socket connections on the Network page of Dart DevTools

△ Dart DevTools 的 Network 页面上的套接字连接时间、状态和内容类型

The Network page now adds timing information to the network calls from your app, along with other information like status and content type. Additional improvements have been made to the details UI to provide an overview of the data in a websocket or http request. We’ve also got more plans for this page to include HTTP request/response bodies and monitoring gRPC traffic.

现在，Network 页面添加了应用进行网络调用的时间、状态和内容类型等信息。详细信息界面也有额外改进，以提供 websocket 或 http 请求中数据的概览。我们还为这个页面制定了更多计划，包括加入 HTTP 请求/响应正文和 gRPC 流量监测。

# Updating import statements on file rename

# 在文件重命名时更新导入语句

Another new feature for Visual Studio Code is updating imports on rename, which automatically updates import statements when files are moved or renamed.

Visual Studio Code 的另一个新功能是当文件被移动或重命名时自动更新导入语句。

![](https://devrel.andfun.cn/devrel/posts/2020/08/3a9be4183f989.gif){:width="95%"}

moving Dart files in Visual Studio Code updates the import statements

△ 在 Visual Studio Code 中移动 Dart 文件会更新导入语句

This feature currently only works for single files and not multiple files or folders, but that support is coming soon.

该功能目前仅适用于单个文件，暂不支持多个文件或文件夹（即将到来！）。

# Tooling metadata for every tool builder

# 面向每个工具制造者的工具元数据

One more update to mention is for people building Flutter tooling. We’ve created a new project on GitHub to capture and publish metadata about the Flutter framework itself. It provides machine-readable data files for the following:

还有一项为 Flutter 工具开发者提供的更新。我们在 GitHub 上创建了一个新项目，来捕获和发布有关 Flutter 框架本身的元数据。它提供以下机器可读数据文件：

* a [catalog](https://github.com/flutter/tools_metadata/blob/master/resources/catalog/widgets.json) of all of the current Flutter widgets (395 widgets!)

	当前所有 Flutter widget 的[目录](https://github.com/flutter/tools_metadata/blob/master/resources/catalog/widgets.json)（有 395 个！）

* a [mapping of Flutter framework color names to color values](https://github.com/flutter/tools_metadata/tree/master/resources/colors), for both the Material and Cupertino color sets

	Flutter 框架中[颜色名称到颜色值的映射](https://github.com/flutter/tools_metadata/tree/master/resources/colors)，支持 Material 和 Cupertino 颜色集

* [Icon metadata](https://github.com/flutter/tools_metadata/tree/master/resources/icons) for Material and Cupertino icons, including icon names and preview icons

	Material 和 Cupertino 图标的[图标元数据](https://github.com/flutter/tools_metadata/tree/master/resources/icons)，包括图标名称和预览图标


This is the same metadata that we use for the Android Studio / IntelliJ and VS Code extensions ourselves; we thought you might find it useful when building your own tools. In fact, this metadata enables the feature in the IntelliJ family of IDEs to show the color being used in your Flutter code:

这与我们在 Android Studio / IntelliJ 和 VS Code 扩展中的元数据相同；我们认为这对您构建自己的工具会有所帮助。实际上，此元数据使 IntelliJ 系列 IDE 的功能可以显示 Flutter 代码中使用的颜色：

![](https://devrel.andfun.cn/devrel/posts/2020/08/ca7d24a599cd8.png){:width="95%"}

Related to that is a new feature in IntelliJ and Android Studio that displays color blocks for Color.fromARGB() and Color.fromRGBO():

与此相关的是 IntelliJ 和 Android Studio 中的一项新功能，该功能可为 Color.fromARGB() 和 Color.fromRGBO() 显示色块：

![](https://devrel.andfun.cn/devrel/posts/2020/08/5c8d5b3dcd271.png){:width="95%"}

Special thanks to [dratushnyy](https://github.com/dratushnyy) on GitHub for contributing improvements to the color previews in IntelliJ!

特别感谢 [dratushnyy](https://github.com/dratushnyy) 在 GitHub 上为 IntelliJ 中的颜色预览做出的贡献！

# Typesafe platform channels for platform interop

# 平台互操作的类型安全平台通道

In response to popular demand from plugin authors in our user surveys, recently we’ve been experimenting on how to make communication between Flutter and the host platform safer and easier for [plugins](https://flutter.dev/docs/development/packages-and-plugins/developing-packages) and [Add-to-App](https://flutter.dev/docs/development/add-to-app). To address this need, we created [Pigeon](https://pub.dev/packages/pigeon), a command-line tool that uses Dart syntax to generate type-safe messaging code on top of platform channels without adding additional runtime dependencies. With Pigeon, instead of manually matching method strings on platform channels and serializing arguments, you can invoke Java/Objective-C/Kotlin/Swift class methods and pass non-primitive data objects by directly calling Dart methods (and vice versa).

为了回应插件作者在用户调研中的普遍需求，最近，我们一直以[插件](https://flutter.cn/docs/development/packages-and-plugins/developing-packages)和 [Add-to-App](https://flutter.cn/docs/development/add-to-app) （部分使用了 Flutter 的应用）为对象，探求如何才能让 Flutter 与宿主平台之间的通信更安全、更轻松。为了满足这一需求，我们创建了命令行工具 [Pigeon](https://pub.flutter-io.cn/packages/pigeon)，使用 Dart 语法在平台通道上生成类型安全的消息代码，无需添加其他运行时依赖项。您无需在平台通道上手动匹配方法字符串和序列化参数，就可以调用 Java/Objective-C/Kotlin/Swift 类方法，并通过直接调用 Dart 方法传递非原始类型数据对象（反之亦然）。

![](https://devrel.andfun.cn/devrel/posts/2020/08/607007baf455d.png){:width="95%"}

While still in prerelease, Pigeon has become mature enough that we’re using it ourselves in the [video_player](https://pub.dev/packages/video_player) plugin. If you’d interested in testing out Pigeon for your own uses, see the updated the [platform channel documentation](https://flutter.dev/docs/development/platform-integration/platform-channels#pigeon) as well as this [sample project](https://github.com/flutter/samples/tree/master/add_to_app/flutter_module_books).

Pigeon 虽然处于预发布阶段，但已经足够成熟，我们已经将其用于 [video_player](https://pub.flutter-io.cn/packages/video_player) 插件。如果您有兴趣测试 Pigeon 供自己使用，请参见更新的[平台通道文档](https://flutter.cn/docs/development/platform-integration/platform-channels#pigeon)以及此[示例项目](https://github.com/flutter/samples/tree/master/add_to_app/flutter_module_books)。

# Too many tooling updates to list

# 还有众多工具更新，不胜枚举

So much great stuff has happened to the tools in the Flutter 1.20 timeframe that we can’t list it all here. However, you might want to take a look at the update announcements themselves:

截至 Flutter 1.20 发布，众多工具的版本也全新亮相，我们无法在此列出所有内容，请查看它们的更新公告：

* [VS Code extensions v3.13](https://groups.google.com/g/flutter-announce/c/TlN12RemsYw)

	[VS Code 扩展 v3.13](https://groups.google.com/g/flutter-announce/c/TlN12RemsYw)

* [VS Code extensions v3.12](https://groups.google.com/g/flutter-announce/c/8tSufvaRJUg)

	[VS Code 扩展 v3.12](https://groups.google.com/g/flutter-announce/c/8tSufvaRJUg)

* [VS Code extensions v3.11](https://groups.google.com/g/flutter-announce/c/gM0bqO7NFA0)

	[VS Code 扩展 v3.11](https://groups.google.com/g/flutter-announce/c/gM0bqO7NFA0)

* [Flutter IntelliJ Plugin M46 Release](https://groups.google.com/g/flutter-announce/c/8C2v2ueXjts)

	[Flutter IntelliJ 插件 M46 版](https://groups.google.com/g/flutter-announce/c/8C2v2ueXjts)

* [Flutter IntelliJ Plugin M47 Release](https://groups.google.com/g/flutter-announce/c/6SF3PG_XB8g/m/6mAY7eC_AAAJ)

	[Flutter IntelliJ 插件 M47 版](https://groups.google.com/g/flutter-announce/c/6SF3PG_XB8g/m/6mAY7eC_AAAJ)

* [Flutter IntelliJ Plugin M48 Release](https://groups.google.com/g/flutter-announce/c/i9NTk5o9rZQ)

	[Flutter IntelliJ 插件 M48 版](https://groups.google.com/g/flutter-announce/c/i9NTk5o9rZQ)

* [New tools for Flutter developers, built in Flutter](https://medium.com/flutter/new-tools-for-flutter-developers-built-in-flutter-a122cb4eec86)

	[我们用 Flutter 写了一套全新的 Flutter 开发者工具](https://mp.weixin.qq.com/s/4mcFo3z8DhCDkEMX7IPmww)


# Breaking Changes

# 重要改动 (Breaking Changes)

As ever, we try to keep the number of breaking changes low. Here’s the list from the Flutter 1.20 release.

与往常一样，我们尽力将重要改动（breaking changes）的数量维持在较低水平。以下是 Flutter 1.20 版本中的重要改动列表。

* [55336](https://github.com/flutter/flutter/pull/55336) Adding tabSemanticsLabel to CupertinoLocalizations — [Migration guide PR](https://github.com/flutter/website/pull/3996)

	[55336](https://github.com/flutter/flutter/pull/55336)：将 tabSemanticsLabel 添加到 CupertinoLocalizations - 迁移[指南 PR](https://flutter.cn/docs/release/breaking-changes/cupertino-tab-bar-localizations)

* [55977](https://github.com/flutter/flutter/pull/55977) [Add clipBehavior to widgets with clipRect](https://flutter.dev/go/clip-behavior)

	[55977](https://github.com/flutter/flutter/pull/55977)：[将 clipBehavior 添加至具有 clipRect 的 widget](https://files.flutter-io.cn/sources/flutter-design-docs/Clip_Behavior.docx)

* [55998](https://github.com/flutter/flutter/pull/55998) [Fixes the navigator pages update crashes when there is still route wa…](https://groups.google.com/forum/#!searchin/flutter-announce/55998%7Csort:date/flutter-announce/yoq2VGi94q8/8pTsRL28AQAJ)

	[55998](https://github.com/flutter/flutter/pull/55998)：[为 Navigator 的 TransitionDelegate 新加入了 isWaitingForExitingDecision 判断。](https://groups.google.com/forum/#!searchin/flutter-announce/55998%7Csort:date/flutter-announce/yoq2VGi94q8/8pTsRL28AQAJ)	
* [56582](https://github.com/flutter/flutter/pull/56582) [Update Tab semantics in Cupertino to be the same as Material](https://flutter.dev/docs/release/breaking-changes/cupertino-tab-bar-localizations#migration-guide)

	[56582](https://github.com/flutter/flutter/pull/56582)：[更新 Cupertino 中的 Tab 语义，使其与 Material 相同](https://flutter.cn/docs/release/breaking-changes/cupertino-tab-bar-localizations#migration-guide)

* [57065](https://github.com/flutter/flutter/pull/57065) Remove deprecated child parameter for NestedScrollView’s overlap managing slivers

	[57065](https://github.com/flutter/flutter/pull/57065)：移除 NestedScrollView 重叠管理条中被弃用的子参数	

* [58392](https://github.com/flutter/flutter/pull/58392) iOS mid-drag activity indicator

	[58392](https://github.com/flutter/flutter/pull/58392)：确保在 iOS 里的系统行为一致性，为 CupertinoActivityIndicator 加入 progress 参数


# Summary

# 总结

Hopefully, you’re as excited about this release as we are. From many angles, this is Flutter’s biggest release yet. With performance improvements, new and updated widgets, and tooling improvements, we can only hit the highlights. We want to thank you, the strong and growing set of community contributors that enables every Flutter release to be bigger, faster, and stronger than the one before. And there’s more to come, with support for [null safety](http://dart.dev/null-safety), a new version of the Ads, Maps, and WebView plugins, and more tooling support in the works. (In fact, you might be interested in Bob Nystrom’s deep dive on [Understanding null safety](https://dart.dev/null-safety/understanding-null-safety).)

希望您和我们一样喜爱这一版本。从很多角度来看，这都是 Flutter 迄今为止规模最大的版本发布。其中包含性能的显著提升、新增并更新了许多 widget，以及对工具做出的诸多改进，考虑到文章篇幅我们只能着重介绍部分亮点。我们要向大家致谢，感谢不断壮大的社区贡献者群体，让每一个 Flutter 版本都比先前功能更丰富、运行更流畅、性能更强大。敬请期待更多内容，包括[空安全](http://dart.cn/null-safety)支持、新版本的 Ads、Maps 和 WebView 插件，以及正在构建的更多工具支持。（也欢迎大家阅读 Bob Nystrom 的文章以深入[了解空安全](https://dart.cn/null-safety/understanding-null-safety)）

With all of this extra power in Flutter and the tools, what are you going to build?

Flutter 和工具已经全新升级，您会打造出怎样精彩的 Flutter 作品呢？

当然，如果您有任何 Flutter 相关的问题或者反馈，记得在微信留言区找我们~