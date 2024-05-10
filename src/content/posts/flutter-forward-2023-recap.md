---
title: 与 Flutter 共创未来 | Flutter Forward 活动精彩回顾
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2023/02/QXD8vj.jpg)

*作者 / Google 开发者框架和语言 (含 Flutter、Dart 和 Go) 产品经理 & 用户体验总监 Tim Sneath*

我们很高兴可以在 [Flutter Forward 活动](https://flutter.dev/events/flutter-forward "Flutter Forward 活动") 上分享我们对 Flutter 的愿景。Flutter Forward 是在肯尼亚内罗毕以线上直播方式举行的开发者活动，世界各地的开发者能够亲自参与或者远程相聚，探索 Flutter 的未来发展方向。

Flutter 是一个界面工具包，它让应用开发者只需编写一套代码，即可构建移动应用、Web 应用和桌面应用。你可以使用 Flutter 构建**精致美观**的应用，屏幕上的每一个像素尽在掌握。Flutter 具有如下独特优势:

* **快速** 。支持硬件加速图形和原生编译的机器代码，可充分发挥手机或电脑硬件的计算能力。
* **高效** 。支持有状态热重载等技术，让你可立即看到代码更改在应用中的实际效果。
* **可移植** 。使用一套源代码即可部署到多种平台，而不会出现意外情况。
* **开源** 。它是一个完全开源的工具包，你无需支付许可费，也不用为相关开发工具付费。

事实证明 Flutter 深受欢迎: 迄今为止已有超过 70 万款使用 Flutter 打造的应用上架。Flutter 的使用者中既有 [志存高远的小型初创公司](https://flutter.dev/showcase/so-vegan "志存高远的小型初创公司")，也不乏 [有关键需求的大型成熟企业](https://flutter.dev/showcase/credit-agricole "有关键需求的大型成熟企业")。Flutter 的价值还让 Google 内部团队受益，[Google 课堂](https://edu.google.com/workspace-for-education/classroom/ "Google 课堂") 等团队借助 Flutter 为移动和 Web 用户提供优质解决方案。我们还在其他开发者工具中添加了对 Flutter 的支持，这些工具包括 [Google Ads](https://developers.google.cn/admob/flutter/quick-start "Google Ads")、[Google Maps](https://codelabs.developers.google.com/codelabs/google-maps-in-flutter#0 "Google Maps")、[Google Pay](https://pub.flutter-io.cn/packages/pay "Google Pay")，当然还有 [Firebase](https://firebase.google.cn/docs/flutter/setup?platform=ios)。

<video controls width="690" height="480" src="{{site.flutter-files-cn}}/posts/images/2023/02/RKj6GN.mp4" poster="{{site.flutter-files-cn}}/posts/images/2023/02/UdtebS.jpg"></video>

△ Google 课堂与 Flutter

> 借助 Flutter，我们将同一功能的代码量缩减了 66%…这意味着各个平台上的 bug 数量减少，未来的技术负债也更低。
>
>
>
>
>
> Google 课堂软件工程师 Kenechi Ufondu

Flutter 的第一个版本提供了用于构建 Android 和 iOS 移动应用的界面工具包。在 [Flutter 3](https://flutter.cn/posts/introducing-flutter-3 "Flutter 3 正式发布") 中，我们拓展了所支持的平台，不仅稳定支持 [Windows](https://flutter.cn/posts/announcing-flutter-for-windows "Flutter 正式推出 Windows 平台支持")、macOS、Linux 和 [Web](https://mp.weixin.qq.com/s/6oSwvPsMy6r4AW90aostiA "Flutter Web 支持现已进入稳定版")，还新增了对嵌入式平台的支持。在此基础上，我们最新发布了稳定版本 Flutter 3.7，增加了许多新功能并做出了各种改进，包括引入新的 iOS 渲染引擎、增强对 Material 3 和 iOS 风格组件的支持、改善对国际化的支持、改进后台处理以及对开发者工具做出更新。

在此次活动中，我们的重点是 ***展望未来***，带你抢先了解我们对 Flutter 的下一波发力点: 突破性的图形性能、Web 应用和移动应用的无缝集成、对新兴架构的早期支持，以及持续关注开发者体验。希望我们展示的这些将在未来几个月内逐步推出的新功能，能让你对我们描绘的 Flutter 愿景充满期待: 让 Flutter 成为一个强大的工具包，助力开发者打造令人赏心悦目的优质用户体验，并灵活部署到诸多平台。

*特别说明: 我们在这里预先介绍的功能仍处于开发阶段，可能会在未来几个月发生重大变更。在现阶段展示这些功能旨在让早期采纳者有机会参与进来、做出贡献。*

![]({{site.flutter-files-cn}}/posts/images/2023/02/FaQLxh.png)

## **突破性的图形性能**

长期以来，由于涉及构建抽象层这个难题，跨平台框架一直需要在视觉方面做出妥协。Flutter 采用了一种不同于大多数框架的方法，借助自有渲染层，可在所有设备上提供硬件加速的图形和一致的视觉外观。今后，我们将着力发展 *突破性的图形性能*，扩大 Flutter 在这一领域的现有优势。

在 Flutter Forward 活动中，我们展示了 Flutter 的下一代渲染引擎 **[Impeller](https://github.com/flutter/flutter/wiki/Impeller "Impeller")** 取得的更多进展。Impeller 专为 Flutter 优化，提高图形管线方面的灵活性和控制力，并为我们带来了新的机会。Impeller 使用预编译的着色器，可减少运行时由着色器编译引起的丢帧，从而实现更加可预测的性能。它利用了 Metal 和 Vulkan 的基元类型，二者分别是 iOS 和 Android 中的现代底层图形 API。以及有效地运用了并发机制，将同一帧的工作负载分散到多个线程中。

![△ Impeller 为 Wonderous 这类要求较高的图形应用带来了丝般顺滑的性能。Wonderous 是一款带你探索世界奇观的精美应用，这里展示了它的最新版本，可根据不同的设备和外形规格调整其界面。你可前往 [https://wonderous.app](https://wonderous.app "wonderous.app") 下载该应用。]({{site.flutter-files-cn}}/posts/images/2023/02/a3Dk7v.png)

△ Impeller 为 Wonderous 这类要求较高的图形应用带来了丝般顺滑的性能。Wonderous 是一款带你探索世界奇观的精美应用，这里展示了它的最新版本，可根据不同的设备和外形规格调整其界面。你可前往 [https://wonderous.app](https://wonderous.app "wonderous.app") 下载该应用。

除了提供流畅的界面，在某些情况下，Impeller 还可以显著提高性能。下面这个视频中的 demo 就完美诠释了这一点。左侧是一个使用 SVG 剪切构建的万花筒应用，该应用使用了当前的默认渲染器。向下滚动页面时，渲染所用时间会超过每帧的预算，导致性能下降、帧率跌至 7-10 fps。右侧是同一个应用，但采用了 Impeller，能以 60 fps 的帧率流畅渲染。

<video controls width="690" height="480" src="{{site.flutter-files-cn}}/posts/images/2023/02/cLx9Wq.mp4" poster="{{site.flutter-files-cn}}/posts/images/2023/02/qPCYaj.jpg"></video>

△ 万花筒应用示例，展示了使用 Impeller 可提高图形性能

从头开始构建带来的一个好处是，Impeller 的架构可支持全新的使用用例。得益于新引入的 **对自定义着色器的支持**，我们已经有了一些 [令人惊叹的新 demo](https://twitter.com/reNotANumber/status/1599717360096620544 "令人惊叹的新 demo")，展示了与 Flutter widget 层次结构的无缝集成。此外，我们并未止步于移动端，还在 Web 端发布了对自定义着色器的早期支持。现在你可以使用同一套代码，在 iOS、Android 和浏览器中提供硬件加速的体验。

![Flutter 现在支持在 Web 端使用像素着色器，让你可实现各种炫酷的视觉效果。（图片提供者: [Erick Ghaumez](https://medium.com/u/21767146c3d4?source=post_page-----b94ce089f49c "Erick Ghaumez")）]({{site.flutter-files-cn}}/posts/images/2023/02/BNbAEb.png)

△ Flutter 现在支持在 Web 端使用像素着色器，让你可实现各种炫酷的视觉效果。（图片提供者: [Erick Ghaumez](https://medium.com/u/21767146c3d4?source=post_page-----b94ce089f49c "Erick Ghaumez")）

另外，我们已经着手开展 **使 Flutter 支持 3D 图形** 的早期工作。在主题演讲中，我们演示了你可以导入使用 [Blender](https://www.blender.org/ "Blender") 创建的模型，甚至可以利用热重载技术，在 Blender 中实时迭代模型，然后在正运行的应用中查看结果。虽然该功能还处于早期阶段，但我们对所实现的初始性能以及将 3D 集成到其他 Flutter 体验中的潜力满怀期待。

![△ 这个有趣的 Dash demo 展现了 Impeller 让 Flutter 能够渲染 3D 图形。]({{site.flutter-files-cn}}/posts/images/2023/02/kYeQ6b.png)

△ 这个有趣的 Dash demo 展现了 Impeller 让 Flutter 能够渲染 3D 图形。

支持 3D 图形和自定义着色器后，跨平台界面工具包可实现的图形性能达到了新高度。我们非常期待看到你充分利用这些新推出的功能。

## **Web 应用和移动应用的无缝集成**

尽管你可以完全用 Flutter 和 Dart 编写应用，但几乎所有重要的项目都会涉及调用原生平台的功能。在 Web 端，Flutter 可能会用作大型应用的一个嵌入式组件；在移动端，应用可能需要调用系统 API 或其他语言的代码。因此，我们的第二个发力点就是  *Web 应用和移动应用的无缝集成*。

在 Web 端，我们将会推出一项名为 **元素嵌入** 的新功能，可用于将 Flutter 内容添加到任何标准 Web <div> 中。以这种方式嵌入时，Flutter 就变成了一个 Web 组件，能与 Web DOM 良好集成，甚至支持使用 CSS 选择器和转换来设置父 Flutter 对象的样式。

此外，我们还对 [js](http://pub.flutter-io.cn/packages/js "js") 软件包进行了一些重大更改，以便在 **JavaScript 代码和 Dart 代码之间实现顺畅的互操作性**。利用 js，你可以通过 @JSExport 属性为 Dart 代码中的任何函数添加注释，然后从 JavaScript 代码中进行调用。

这两项新功能相结合，使得 Flutter 可在 Web 端解锁一些令人期待的新用例。我们在 Flutter Forward 活动中展示了一个 [概念验证 demo](https://flutter-forward-demos.web.app/#/ "概念验证 demo ")，你可以看到一个嵌入在 HTML 网页中的简单 Flutter 应用。使用 CSS，我们可以实现动画旋转效果；即使在旋转时，Flutter 内容也一直可供互动。该 demo 还展示了你可以使用 HTML 按钮和 JavaScript 事件处理脚本来改变 Flutter 的状态，反之亦然。我们认为，这项功能正式推出后，将在使用 Flutter 向现有 Web 应用增加互动方面，带来更多可能性。

![△ 利用 "元素嵌入" 功能，你可以将 Flutter 嵌入 <div> 元素中并使用 CSS 来设置其样式。]({{site.flutter-files-cn}}/posts/images/2023/02/tAcjsa.png)

△ 利用 "元素嵌入" 功能，你可以将 Flutter 嵌入 <div> 元素中并使用 CSS 来设置其样式。

在 Android 和 iOS 端，Flutter 一直支持使用平台渠道与系统 API 集成。通过这些渠道你可使用基于消息的方法，与用 Kotlin 或 Swift 等语言编写的代码进行通信。但这仍要求应用开发者通晓多种语言，并需要大量样板代码。

我们正着手研究 **一种新的系统互操作性方法**，以允许直接调用库。在 iOS 端，我们在此前所做 FFI 工作的基础上实现 C 语言互操作性，添加了对 Swift 和 Objective-C 库的支持。在 Android 端，我们使用 JNI 桥接到用 Kotlin 编写的 Jetpack 库。Dart 中新增了一个命令，可用于自动创建 binding 绑定以实现跨语言互操作，并相应地转换数据类。我们希望这项功能推出后，Flutter 开发者能够调用新的 Jetpack 或 iOS 库，而无需使用插件或学习不同的 API 语法，同时也极大地减轻插件开发者的工作。你可以 [查看我们的示例](https://github.com/flutter/samples/tree/main/experimental/pedometer) 了解详情。

## **对新兴架构的早期支持**

得益于 Dart 对诸多处理器架构的广泛支持，以及高度优化的 JavaScript 编译器，Flutter 已经可以在很多不同类型、不同外形规格的设备上运行。与此同时，也有一些优秀的新架构逐渐兴起，因此我们的第三个发力点就是 *对新兴架构的早期支持*。

[WebAssembly](https://webassembly.org/ "WebAssembly") 作为一种平台中立的二进制指令格式，如今发展已经日渐成熟，[在现代浏览器上获得了越来越多的支持](https://caniuse.com/wasm "在现代浏览器上获得了越来越多的支持")。令人兴奋的是，WebAssembly 使得 Web 平台向 JavaScript 之外的其他语言敞开了大门。近几个月来，我们与 Chrome 团队和其他 WebAssembly 合作伙伴携手，着力于对 Dart 等 [垃圾回收语言的早期支持](https://github.com/WebAssembly/gc "垃圾回收语言的早期支持")。Chrome 的最新开发版中提供了一个 flag 标志，用于开启这个新的 WebAssembly 扩展。在 Flutter Forward 活动中，我们公布了对 **从 Flutter 编译到 WebAssembly** 的早期支持，这使得我们可以进一步优化 Web 端的速度和代码体积。

吸引开发者关注的另一种平台架构是 [RISC-V](https://en.wikipedia.org/wiki/RISC-V "RISC-V")，这是一种为广泛使用而设计的开放式标准指令集架构 (ISA)。Android 团队最近 [在支持 RISC-V 方面的工作](https://www.youtube.com/watch?v=70O_RmTWP58 "他们在支持 RISC-V 方面所做的工作") 有所进展。我们也很高兴地宣布 **Dart 现在支持 RISC-V**，相关工作的目标是让 Flutter 能够在陆续上市的 RISC-V 设备上运行。尽管生产级 RISC-V 硬件仍处于起步阶段，但我们依然在 Flutter Forward 活动中展示了目前为止在 [ClockworkPi DevTerm Kit R-01](https://www.clockworkpi.com/product-page/devterm-kit-r01 "ClockworkPi DevTerm Kit R-01") 上取得的进展，它是一个运行 Linux 的自组装便携式终端设备。我们认为在嵌入式场景中，尤其应该支持 RISC-V，Flutter 可以在此情景中为各类需求提供强大的界面工具包。

![△ 一台正在运行 Dart 控制台应用的 ClockworkPi DevTerm R-01 (一款实验性 RISC-V 电脑)]({{site.flutter-files-cn}}/posts/images/2023/02/6mBeRT.png)

△ 一台正在运行 Dart 控制台应用的 ClockworkPi DevTerm R-01 (一款实验性 RISC-V 电脑)

## **持续关注开发者体验**

开发者生产力是上述一切的基础，Flutter 与生俱来的有状态热重载等功能赋予了它高效的属性。我们第四个也是最后一个发力点，就是将 *持续关注 Flutter 和 Dart 开发者体验*。

一直以来我们都在为推动 Dart 语言的健康发展做出努力。在 Flutter Forward 活动中，我们带大家抢鲜了解了一些重要的新 Dart 语言功能的初步进展。对 **records 和 patterns** 的早期支持现已登陆开发渠道，这两项新的增强功能协同运用可以发挥出良好效果。

![△ 一个简单的 records 和 patterns 示例，可返回和接收多个函数参数。]({{site.flutter-files-cn}}/posts/images/2023/02/jJMm1S.jpg)

△ 一个简单的 records 和 patterns 示例，可返回和接收多个函数参数。

此外，我们还 **正式发布了 Dart 3**，标志着我们将健全的空安全引入 Dart 语言的工作交出了圆满答卷。Dart 3 还移除了其他一些早已弃用的功能，更加现代化。我们已开始发布 Dart 3 的 Alpha 版本及对应的 Flutter 版本，方便开发者测试软件包和应用。如需详细了解 Dart 3，你可以参阅 [Dart 频道中发布的博文](https://medium.com/dart-lang/dart-3-alpha-f1458fb9d232 "Dart 频道中发布的博文")。

当然，我们也在着力提升 Flutter 的开发者体验。继去年我们 [在 I/O 大会上宣布推出的](https://flutter.cn/posts/announcing-the-flutter-casual-games-toolkit "Flutter 休闲游戏工具包发布") 休闲游戏工具包大获成功之后，我们发布了 [**新闻工具包** 的第一个版本](https://medium.com/flutter/announcing-the-flutter-news-toolkit-180a0d32c012 "新闻工具包的第一个版本")，这将加速新闻发布商和其他内容提供方的移动应用开发，让他们无需从头开始设计应用就能触达移动端用户。它包含了打造以新闻报道为中心的应用所需的一切功能，包括导航和搜索、身份验证、广告植入、通知、档案和订阅，同时纳入了根据 Google 新闻计划的研究成果确定的最佳实践。我们要分享三个使用该工具包构建应用的非洲早期采纳者的故事，他们分别是摩洛哥最著名的新闻网站之一 [Hespress](https://www.hespress.com/ "摩洛哥最著名的新闻网站之一 Hespress")、尼日利亚的热门体育网站 [Bold Sports](https://boldsportsng.com/ "尼日利亚的热门体育网站 Bold Sports") 以及肯尼亚历史最悠久的报纸 [《The Standard》](https://www.standardmedia.co.ke/ "肯尼亚历史最悠久的报纸 《The Standard》")。

<video controls wdith="690" height="480" src="{{site.flutter-files-cn}}/posts/images/2023/02/yHWQPt.mp4" poster="{{site.flutter-files-cn}}/posts/images/2023/02/2xmwUE.jpg"></video>

△ 观看三个非洲新闻发布商的故事，了解他们作为 Google 新闻工具包早期采纳者的体验。

## **携手前行**

衷心希望你能和我们一样，对 Flutter 的未来发展满怀期待。我们将继续着力提升核心开发者体验，同时进行一些基础性改进，让所有人都能顺畅地使用 Flutter 打造更出色的体验。

下图对我们的发展方向进行了总结:

![]({{site.flutter-files-cn}}/posts/images/2023/02/rmxfey.png)

除了自身拟定的开发方向，我们也很高兴看到 Flutter 生态系统继续蓬勃发展。例如，[FlutterFlow](https://flutterflow.io/ "FlutterFlow") 是一个用于开发原生移动应用的低代码构建工具，而 [Widgetbook](http://widgetbook.io/ "Widgetbook") 提供灵活的工具，供设计师和开发者协作开发用户界面。

最后，很高兴借此机会来到肯尼亚，领略了当地开发者的企业家精神和才华。非洲的 Flutter 社区充满活力；仅肯尼亚的 Flutter 用户群组就有超过 1,000 名开发者。我们很高兴 Flutter 能够为非洲的开发者带来新的机遇，让他们可以参与到快速增长的应用经济中。Klasha 就是诠释这一前景的优秀案例。这家公司借助 Flutter 快速进入市场，并解决了本地用户的问题。下面的视频介绍了他们使用 Flutter 的体验:

<video controls wdith="690" height="480" src="{{site.flutter-files-cn}}/posts/images/2023/02/a4nD2R.mp4" poster="{{site.flutter-files-cn}}/posts/images/2023/02/DrP6nP.jpg"></video>

△ Klasha ([https://klasha.com/](https://klasha.com/ "Klasha")) 的故事以及他们使用 Flutter 的体验。Klasha 是一家科技初创公司，其宗旨是让非洲消费者能够顺畅地买到世界各地的商品。
