---
title: 借助 Flutter 顺畅地开发多平台应用
toc: true
---

{% include docs/bili_shims.liquid %}

![](https://devrel.andfun.cn/devrel/posts/2021/04/VdWBeY.png)

Flutter 已于近期发布了 [Flutter 2](https://flutter.cn/posts/announcing-flutter-2)，Flutter 和 Dart 的产品总监 Tim Sneath 在 2021 年三月上旬举办的 [Flutter Engage](https://flutter.cn/posts/flutter-engage-event-recap) 活动中表示，Flutter 致力于成为多平台 UI 工具包，为了 "彻底改变开发者眼中的应用构建方式，让他们从期望打造的体验来入手进行开发，而无需优先考虑目标平台"。

在最新版发布前，美观、快速、开放且高效是 Flutter 的四大关键特性，为用户构建跨平台应用提供了极大便利。随着 Flutter 2 的发布，其又新增了一项关键特性: *可移植性*，对于 Flutter 来说，这可谓是一项重大的里程碑式进展，意味着 Flutter 现在可以利用单一代码库，为移动端、web 端、桌面设备和嵌入式设备上的原生应用提供稳定支持。Flutter 是首款真正意义上专为环境计算世界而设计的界面平台。

在本文中，我们将探索 "可移植性" 这项关键特性对 Flutter 有何意义并讨论其支持 web 应用和多屏设备类型的功能，以及丰田如何将 Flutter 应用至其车辆的信息娱乐系统。

## **移动应用向 web 应用的跨越**

Flutter 起初是一个用于构建精美 iOS 和 Android 应用的 UI 框架。然而，Flutter 一以贯之的愿景是提供可移植的框架，帮助开发者为任意平台上的用户构建原生编译应用。由于几乎每台设备都安装有 web 浏览器，Flutter 也自然将下一个目标定为 web 端。

Flutter 2 可为 web 提供具有生产质量的支持，这意味着你可以利用单一代码库，为 iOS、Android 和 web 浏览器构建精美的高性能应用。目前的重点是开发 web 应用，即可安装的渐进式 web 应用 (PWA)，以及内容丰富的交互式单页应用 (SPA)，而非现在所看到的静态内容网站。这些可帮助 Flutter 开发者无缝衔接，从当前的移动应用扩展至 web 应用的全新用户群体。

有了 Flutter 2，就如同为你的应用进行了一次免费升级。Web 只是另一个设备目标而已，运行 Flutter Create，将自动生成一个带有索引 HTML 文件的 web 目录，可以随时在你喜爱的浏览器中运行。

与移动应用一样，web 应用也有 2 个编译器。*dev_compiler* 适用于开发阶段，而 *dart2js* 则适用于部署阶段。将开发和部署阶段的编译器分开，一方面可优化开发周期生产力，另一方面则可优化正式应用的性能，使其快速运行。Flutter 支持以原生机器代码编译应用，这意味着你在发布已完工的应用时，无需再在虚拟机或 JavaScript 解释器中完成这步操作。

![](https://devrel.andfun.cn/devrel/posts/2021/04/SjbcQq.png)

Flutter 的 *dev_compiler* 具有与 JIT 编译相同的智能功能。因此，该命令只会重新编译受变动影响的代码，并堆积增量，从而确保开发循环快速进行。但是，与移动端支持热重载 (记住应用的状态) 不同，在 web 应用中，你需要手动启动热重载，并重建应用状态。

就像与以 Flutter 构建的移动应用一样，插件的存在使得应用能够与平台的原生库通信。许多 pub.dev 中现有的 Flutter 插件都已支持 web 应用。在 web 端运行 Flutter 应用时，你可以通过这些插件访问 JavaScript 库。如需查看某一插件是否受支持，只需前往 pub.dev 并搜索该插件即可。插件下方的标签会显示该插件所支持的平台。

![](https://devrel.andfun.cn/devrel/posts/2021/04/4OS8ol.png)

> 资料来源: [pub.flutter-io.cn/packages?q=url_launcher](https://pub.flutter-io.cn/packages?q=url_launcher)

如果你希望更新某个插件以使其适用于 web 应用，你可以参阅以下文章，了解如何为现有的插件项目加入平台的支持:

[https://flutter.cn/docs/development/packages-and-plugins/developing-packages#add-support-for-platforms-in-an-existing-plugin-project
](https://flutter.cn/docs/development/packages-and-plugins/developing-packages#add-support-for-platforms-in-an-existing-plugin-project)

虽然你可以针对 web 应用使用与移动应用一致的代码，但你还需要针对用户体验进行优化。你可以使用约束条件添加动态布局特性，以增强用户体验，例如，如果浏览器可以提供更多的屏幕空间，你可以将单列布局扩展至双列。

类似的，你可能还会考虑添加 web 专用的导航功能，例如滚动条，以及鼠标或键盘交互。为了在网页中提供更好的浏览体验，你还可以隐藏滚动条中的 ListView，并在将鼠标悬于某个 widget 之上时，显示鼠标光标。此外，你还可以使用快捷键 widget 在你的应用中添加键盘快捷键。

如需了解详情，你可以访问 [flutter.cn/web](https://flutter.cn/web)。

### **支持可折叠设备和双屏设备**

如前所述，Flutter 专为环境计算世界设计而成。现在的屏幕种类繁多，已不仅局限于移动端、web 端和桌面端屏幕。从可穿戴式设备到家用设备、智能家电，甚至再到可折叠设备和双屏设备，这些设备已越来越多地出现在我们日常生活中。用户可以使用这些设备创作内容、玩游戏、看视频、打字、阅读或浏览网页，既然这些设备能够满足用户的需求，那么这些全新的设备类型就有助于提高生产力。

同时，这些设备类型意味着你将有机会探索全新的场景和用户体验。在两个屏幕上运行应用，可带来更多屏幕空间用于显示内容和与用户互动。当在两个屏幕上适配 Flutter 应用时，你可以使用双屏设计模式，例如列表详情视图、配套窗格，或采取其他用于调整应用 UI 的方法。

可折叠的设备类型也使得这些设备中的应用可以和其他应用互相分享内容。例如，为你的应用添加拖放功能后，你可以在并排运行的应用间互相移动内容。

在 [Flutter Engage](https://flutter.cn/posts/flutter-engage-event-recap) 活动中，[Microsoft 宣布]({{bili-video}}/bv1g64y117Jo) 正在与 Google 合作，使 Flutter 支持可折叠设备。Microsoft 将提供代码，使 Flutter 应用把握这些新机会，在 Surface Duo 设备和三星等制造商生产的设备上大展拳脚。

有了 [Flutter 2](https://flutter.cn/posts/whats-new-in-flutter-2-0)，所有 Flutter widgets 均将支持可折叠设备。例如，在你使用对话框时，应用能感知到其位于折叠设备上，将内容显示在右边或左边的窗格中。

![](https://devrel.andfun.cn/devrel/posts/2021/04/7msNxm.png)

你也可以使用全新的双窗格 widget 来放置资源。借助此 widget，你可以在左侧或右侧窗格中放置资源。同时，该 widget 也能正确显示于单屏幕手机或平板类设备上。双窗格 widget 可轻松支持全新的设备类型。

## **丰田借助 Flutter 打造的车载用户体验**

[Flutter 2](https://flutter.cn/posts/whats-new-in-flutter-2-0) 可以帮助开发者构建出适用于移动端、web 端、桌面端，甚至是新兴设备类型的精美应用，但这只是 Flutter 灵活性的冰山一角。想要成为真正的可移植性平台，支持发布应用至客户所在的任意平台，Flutter 还需要为嵌入式设备提供支持。丰田已于近日宣布，其车辆的信息娱乐系统未来将由 Flutter 提供动力支持，届时，Flutter 将为全球最大的汽车制造商之一带来最佳的数字化体验。

来自丰田北美汽车公司 (Toyota Motor North America) 总工程师 Daniel Hall 在 [Flutter Engage 活动](https://flutter.cn/posts/flutter-engage-event-recap) 中介绍了此次合作以及 [选择 Flutter 的原因]({{bili-video}}/bv1g64y117Jo):

* 丰田的客户期望享受到高性能车载用户体验，使之与丰田汽车的整体质量相符。Flutter 的渲染引擎可在受限的环境下提供优异性能，且其自带的 AOT 编译功能可为丰田提供其在车载技术中所追求的一致性特色。
* 在 Flutter 的助力下，丰田提供的车载用户体验可以与客户期待在智能手机中获得的体验相媲美。丰田相信 Flutter 的跨平台机制所包含的触控机制能使其适应任何运行环境。这种跨平台机制可帮助丰田规避许多嵌入式系统都会遇到的问题，如性能迟滞，用户体验差等。
* 丰田也被 Flutter 的开发者体验所吸引。虽然丰田只是在针对单一目标平台发布其应用，但该应用可支持在桌面端进行热重载并向 iOS 和 Android 系统的平板电脑传输内容，这些功能已证明其有助于提升实体和数字用户体验。随着这种更快的迭代周期的出现，丰田可以更早、更频繁地收集和整合客户的反馈，有助于创造最佳用户体验。

借助 Flutter 的嵌入器 API，丰田在其由 Linux 驱动的汽车级信息娱乐系统中发挥了这项技术的优势。Flutter 引擎架构通过交叉编译引擎并将其封装于嵌入器内的方式，使自身得以轻松地嵌入目标环境。嵌入器 API 易于使用，可以帮助丰田将 Flutter 应用与车载系统融为一体。

借助 Dart 的语言设计和 Flutter SDK 的软件设计，丰田已开发出诸多内部工具，并通过在丰田的设计流程中运用这些工具，使其得以提高 Flutter 的开发者人机工程学。丰田的目标是打造如下的工作流: 利用设计工具生成代码并运行，然后立即验证软件。例如，Flutter 会将声明式 UI 和代码用作配置，在这种方法的助力下，丰田能够高效地运行生成于设计过程中的代码，而无需经历复杂且混乱的中间环节。

在开发这些丰田专用工具时，Flutter 的开源原则和规模日益壮大的开发者社区对丰田的成功起到了至关重要的作用。丰田相信，若没有这种庞大的开放性生态系统的支持，便无法将 Flutter 扩展至自己的车载用例中。

丰田将与开源软件方的合作视为对其车载用户体验的一次积极投资，并期待自身可以在开源的 Flutter 社区中有所作为。

## **Flutter: 为所有平台构建精美应用**

Flutter 可支持汽车、web 浏览器、笔记本电脑、手机、桌面设备、平板电脑和智能家居设备，可谓是真正意义上的可移植性 UI 工具包，其内置成熟的 SDK，可以让你随时随地满足用户需求。Flutter 现可在你的重点目标平台上运行，并可支持与你钟爱的 Google SDK 和服务结合使用。Flutter 集精美而迅捷的用户体验与高效的开发环境于一身，使其可以探索内容并进行迭代，Google 提供的所有开源代码加之遍布世界的众多开发者社区，为 Flutter 在过去几年的指数级发展作出了贡献。没有其他平台可与之媲美。
