---
title: Flutter Web 支持现已进入稳定版
toc: true
---

![](https://devrel.andfun.cn/devrel/posts/2021/03/90973fe9e93f5.png)

*作者 / Mariam Hasnany, Product Manager, Flutter*

我们对 Flutter 的愿景是成为一个可移植的 UI 框架，在全平台上构建精美的应用体验。做为 [Flutter 2](https://zhuanlan.zhihu.com/p/355308562) 发布内容的一部分，Flutter 的 web 支持已经抵达稳定版里程碑。

Flutter 的首个版本支持 iOS 和 Android，开发者们已经用它在移动应用商店发布了超过 15 万个应用。现在，随着 web 支持的加入，这些应用可以触达更广泛的受众，同时也开辟了在 web 上建立交互体验的新途径。

在此次初始版本的 web 支持中，我们主要关注三个应用场景:

* **渐进式 web 应用 (Progressive web apps, PWA)**，兼具 web 的高覆盖面与桌面应用的强大功能。
* **单页应用 (Single page apps, SPA)**，只需一次加载，并与互联网服务动态互传数据。
* **将现有 Flutter 移动应用拓展到 web**，在两个平台共享代码。

这篇文章介绍了我们迄今为止的工作成果，并分享了几个案例，意在帮助开发者在自己的应用中活用 Flutter 对 web 的支持。

![](https://devrel.andfun.cn/devrel/posts/2021/03/80f8ccc90315b.png)

> △ [iRobot Education](https://edu.irobot.com/the-latest/building-a-coding-experience-for-all) 使用 Flutter 开发了 [iRobot Coding](https://code.irobot.com/) 应用，通过此 web 应用向大众提供编程学习体验

## **Web 之旅**

如今的 web 平台比以往任何时候都要丰富多彩，开发者可以使用的工具包括: [硬件加速的 2D 和 3D 图形](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)，[离线功能和安装体验](https://web.dev/progressive-web-apps/)，以及 [对底层操作系统和硬件的访问](https://web.dev/fugu-status/) 等。在 web 这个底层平台上已经建立起了 [种类](https://vuejs.org/)[繁多](https://angular.io/)[的](https://flask.palletsprojects.com/)[框架](https://reactjs.org/)，因此，开发者在创建 web 应用时拥有极大的灵活性。

Flutter 是用 [Dart](https://dart.cn/) 编写的，而 Dart 能编译成 JavaScript，所以我们的下一步自然就是要探讨支持 web 平台的可能性。这符合我们的愿景，也就是提供一个可移植的框架，方便你在任何能描绘像素的地方构建出精美的 UI。

我们的方法是，建立一个在所有平台上都能使用的一致的工具包 (而不是建立两个有着各种微妙差异的独立框架)，以确保开发者的代码运行时不会出现意外。

![](https://devrel.andfun.cn/devrel/posts/2021/03/edb077dfd7dda.png)

Flutter 框架由 [一系列层结构](https://flutter.cn/docs/resources/technical-overview#layer-cakes-are-delicious) 组成，其中包含:

* **框架**，用于为 widget、动画和手势等常见的习惯用法提供抽象
* **引擎**，使用公开的系统 API 在目标设备上进行渲染

框架本身采用 Dart 编写，大约 70 万行 Flutter 框架核心代码在所有平台上相同: 包括移动端、桌面端和现在的 web 端。对于你的代码来说也是这样，我们使用 Dart 开发编译器 ([dartdevc](https://dart.cn/tools/dartdevc)) 或 Dart 部署编译器 ([dart2js](https://dart.cn/tools/dart2js)) 将你的代码编译成 JavaScript，这些 JavaScript 代码可以托管在服务器上。

由于 Dart 拥有将 Flutter 框架 (以及开发者的应用代码) 编译成 JavaScript 的能力，我们对 web 的支持工作就变成了用映射 web 平台 API 的代码来取代移动应用所使用的底层 C++ 渲染引擎。Flutter 并不会简单地将 widget 移植为 HTML 里的等价组件，Flutter 的 web 引擎为开发者提供了两种渲染器: 一个是针对尺寸和兼容性进行优化的 HTML 渲染器，另一个则是使用 WebAssembly 和 WebGL 通过 Skia 绘图命令向浏览器画布进行渲染的 CanvasKit 渲染器。

我们对 Flutter 的要求是，提供一种针对 web 平台进行开发的新方式，在现有基础上提供新见解，为所有人提供更棒的 web 体验。

## **发布生产环境可用的稳定版本**

自从 [web 支持的测试版](https://mp.weixin.qq.com/s/LyAtbiYYM6PEbxLoLD7OYA) 在一年前发布以来，我们已经了解了很多早期采用者的使用情况，并已与部分客户合作，他们现在已经将自己的 Flutter web 应用投入生产。

在此期间，我们对架构进行了重大改进，增加了一些功能，以便扩展和优化 Flutter 的 web 支持，新增内容主要集中在四个方面: **性能**、**web 专属功能**、**桌面硬件适配**，以及**插件**。

![](https://devrel.andfun.cn/devrel/posts/2021/03/f76550f48d532.png)

### **性能**

自推出早期版本至今，性能是提升最显著的。在开发过程中，我们对 web 上各种渲染技术的性能和准确性特征有了更深入的了解。

我们最早的工作是基于 DOM 的 HTML。在这种渲染模式中，Flutter 的 web 引擎会将每个生成的 Flutter 场景转换为 HTML、CSS 或 Canvas，并以 HTML 元素树的形式在页面上渲染为一帧。虽然 HTML 渲染器能够最大限度地兼容各种浏览器，且其代码体积较小，但 HTML 渲染器的重绘性能不太适合 Rive (使用 Flutter 构建而成，用于创建动态图像的协作工具) 这种图形密集型应用。

![](https://devrel.andfun.cn/devrel/posts/2021/03/3b7b18f434f16.png)

> △ [Rive](https://rive.app/) 是一款创建自定义动画的工具，该团队已使用 web 版 Flutter 重新构建应用，并发布了测试版

为了提供高效渲染密集图形所需的保真度，我们开始尝试使用 [CanvasKit](https://skia.org/user/modules/canvaskit)，它可使用 [WebAssembly](https://webassembly.org/) 和 [WebGL](https://www.khronos.org/webgl/) 通过 Skia 绘制命令在浏览器中进行渲染。我们发现 CanvasKit 渲染器的性能、保真度和准确度都更加理想，请看 Flutter 社区中才华横溢的德国开发者 [Felix Blaschke](https://github.com/felixblaschke) 的 [Flutter Plasma](https://flutterplasma.dev/) 演示——用 CanvasKit 创造的惊艳特效。

![](https://devrel.andfun.cn/devrel/posts/2021/03/c68e7a88df8ad.png)

> △ [Flutter Plasma](https://flutterplasma.dev/) 是由 Felix Blaschke 创建的演示，可在 Safari、Firefox、Edge 和 Chrome 上运行

不同的渲染器在不同场景下各有优势，因此 Flutter 同时支持以下两种渲染模式:

* **HTML 渲染器**: 结合了 HTML 元素、CSS、Canvas 和 SVG。该渲染模式的下载文件体积较小。
* **CanvasKit 渲染器**: 渲染效果与 Flutter 移动和桌面端完全一致，性能更好，widget 密度更高，但增加了约 2MB 的下载文件体积。

为了针对每个设备的特性优化你的 Flutter web 应用，渲染模式默认设置为自动。这意味着你的应用将在移动浏览器上使用 HTML 渲染器运行，在桌面浏览器上使用 CanvasKit 渲染器运行。

你还可以使用 --web-renderer html 或 --web-renderer canvaskit 来明确选择使用何种渲染器。如需了解详细信息，请参阅 [官方文档](https://flutter.cn/docs/development/tools/web-renderers)。

### **Web 专属功能**

在浏览器中运行的 Flutter 应用给人的感觉应该像 web 应用一样。所以我们为 Flutter 添加了一些功能，帮助你发挥 web 的优势。

Web 有很多优势，尤其是在全球的覆盖率。将你现有的 Flutter 应用带到 web 上的原因之一就是接触应用商店以外的用户。为了做到这一点，我们添加了 [自定义 URL 策略](https://flutter.cn/docs/development/ui/navigation/url-strategies)，以确保你的用户只需点击 URL，就可以从任何地方访问你的应用。有了这个功能，你就可以控制地址栏中显示的 URL，以及你的应用在 web 上的路由。

![](https://devrel.andfun.cn/devrel/posts/2021/03/abd6aee377a66.png)

> △ Flutter Plasma 演示的 Showroom 页面，实际上就是一个基于 Flutter 自定义 URL 策略的 [url_strategy](https://pub.flutter-io.cn/packages/url_strategy) 插件示例

当用户在 web 上导航时，超链接也至关重要。url_launcher package 中的一个新的 [link](https://pub.flutter-io.cn/documentation/url_launcher/latest/link/Link-class.html) widget 使用户能够通过深链接直达你应用内的锚点或外部网站。你可以在相关的 widget 上使用 link，包括按钮、内联文本、图像，并指定链接是在同一个标签页还是新标签页中打开。

对于任何应用来说，文本渲染都是不可或缺的。开发文本布局系统，是构建 Flutter web 支持所面临的重大挑战之一。由于 web 缺乏直接文本布局 API，Flutter 必须通过触发 [layout()](https://api.flutter.cn/flutter/dart-ui/Paragraph/layout.html) 来对 [Parapraph](https://api.flutter.cn/flutter/dart-ui/Paragraph-class.html) 执行各种测量操作。有时，这些测量的代价相当高昂，所以我们添加了 [基于 Canvas 的文本测量](https://github.com/flutter/flutter/issues/33523)，此测量方式可同时支持纯文本与富文本。现在，Flutter 可以在 web 上高效地完成精细测量，进而完成正确的绘制任务，比如正确地高亮显示所选文本。

与文本进行交互同样重要，其重要性不亚于快速准确地渲染文本。通过 SelectableText 和 EditableText widget，你不仅可以选中 Flutter web 应用中的文本，还可以执行复制粘贴操作。此外，表单文本字段现已支持 [自动填充](https://api.flutter.cn/flutter/widgets/AutofillGroup-class.html)，浏览器能够存储数据以便将来填充使用。

Flutter 2 特别适合实现渐进式 web 应用 (PWA)。我们建议开发者使用 PWA，通过 Chrome 的 [Project Fugu](https://web.dev/fugu-status/)，以安全和可信的方式，弥合移动端和 web 端应用之间的差异。

![](https://devrel.andfun.cn/devrel/posts/2021/03/0c26286d00f1c.png)

> △ 发票管理应用 [Invoice Ninja](https://www.invoiceninja.com/) 推出的 PWA 应用与他们现有的 Flutter 移动应用使用相同的代码库

在创建 Flutter Web 应用时，我们会提供 PWA web [清单文件](https://developer.mozilla.org/en-US/docs/Web/Manifest)，以及用来设置 service worker (工作线程) 的代码。清单文件提供了关于应用应该如何运行的元数据，包括图标和应用标题等信息。[Service workers](https://developers.google.cn/web/ilt/pwa/introduction-to-service-worker) 可以实现资源的缓存和应用的离线运行。当你在浏览器中以 PWA 的形式运行 Flutter 应用时，你可以将其作为移动或桌面应用安装到你的设备上。

### **适配各类桌面设备**

尽管浏览器的形态大小各异，我们都希望提供美好的 Flutter web 体验。由于 Flutter 最初是为移动应用设计而成，因此 Flutter web 应用已经对移动浏览器的手势和滚动物理效果提供了很好的支持。但桌面浏览器 UI 的呈现和使用有所不同，所以我们对 Flutter 进行了相应的更新。

比如，用户希望应用在桌面浏览器中运行时能够显示滚动条，以便通过鼠标或键盘进行控制。我们为桌面设备添加了 [可自定义的交互式滚动条](https://files.flutter-io.cn/flutter-design-docs/Updating_Scrollbars_(PUBLICLY_SHARED).docx)，这意味着我们可为滚动条使用 [主题](https://api.flutter.cn/flutter/material/ScrollbarTheme-class.html)，显示滚动条轨道，而且还可以拖动滑块。我们还扩展了 [PrimaryScrollController](https://api.flutter.cn/flutter/widgets/PrimaryScrollController-class.html)，便于用户 [使用键盘快捷键进行滚动](https://files.flutter-io.cn/flutter-design-docs/Fallback_ScrollAction_(PUBLICLY_SHARED).docx)，也省去了你使用自定义滚动视图的工作。

![](https://devrel.andfun.cn/devrel/posts/2021/03/72812bd5afb8b.jpg)

> △ [Spica Technologies](https://spicatech.co.uk/) 为 [Zurich Insurance](https://www.zurich.com/) 构建的物业管理解决方案，这是用 Flutter web 为商务和桌面设备用户构建应用的杰出示例

此外，由于鼠标指针能进行互动的内容密度大于触摸设备，我们提升了 [默认内容密度](https://github.com/flutter/flutter/issues/43350)。我们还在框架中添加了支持各种平台的 [系统鼠标光标](https://github.com/flutter/flutter/issues/60641) 合集。

最后，为让 Flutter web 支持所有用户，我们还扩展了 Flutter 的 web 语义功能来支持 Windows、macOS 和 chromeOS 系统上的无障碍功能。为了在 web 上实现无障碍体验，我们在 [RenderObject](https://api.flutter.dev/flutter/rendering/RenderObject-class.html) DOM 树之外平行生成了一个类似的 DOM 树，叫 [SemanticsNode](https://api.flutter.dev/flutter/semantics/SemanticsNode-class.html) 树。SemanticsNode 树可将标记、操作、标签和其他语义属性转换成 [ARIA 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)。现在，你可以通过 [Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1)、[VoiceOver](https://www.apple.com/accessibility/vision/)、[TalkBack](https://support.google.com/accessibility/android/answer/6007100?hl=en) 或 [ChromeVox](https://support.google.com/chromebook/answer/7031755?hl=en#:~:text=You%20can%20turn%20ChromeVox%20on,then%20ChromeVox%20will%20start%20speaking.) 屏幕阅读器来使用 Flutter web 应用。

### **Flutter web 对插件的支持**

最后，我们为那些最常用的插件带来了 web 支持，使你能够将自己的 Flutter 应用带到 web 平台。借助 [Flutter 插件](https://pub.flutter-io.cn/)，你的代码可与所运行平台的原生开发库进行互操作。在 web 上运行 Flutter 应用时，你可以通过插件访问现有的 JavaScript 库。

自测试版发布以来，我们在社区的帮助下为以下插件添加了 web 支持:

* [image_picker](https://pub.flutter-io.cn/packages/image_picker_for_web)
* [google_maps](https://pub.flutter-io.cn/packages/google_maps)
* [firebase_analytics](https://pub.flutter-io.cn/packages/firebase_analytics)
* [firebase_storage](https://pub.flutter-io.cn/packages/firebase_storage)
* [connectivity](https://pub.flutter-io.cn/packages/experimental_connectivity_web)
* [cloud_firestore](https://pub.flutter-io.cn/packages/cloud_firestore)
* [cloud_functions](https://pub.flutter-io.cn/packages/cloud_functions)
* [cross_file](https://pub.flutter-io.cn/packages/cross_file)

## **展望未来**

几年前，我们还没办法在 web 上以可接受的质量和性能提供 Flutter。然而，web 新技术的出现和平台的不断进步，使我们得以尽情释放底层设备的潜力。在支持 web 之后，Flutter 得以涵盖互联网上的每一台设备，让用户在所有现代浏览器和设备上都能获得一致的体验。

这个版本的相当一部分内容来自早期 web 用户的反馈信息和社区提交的 issue，这里我们要再次感谢大家的贡献！今后，我们的首要目标是快速处理大家的反馈，并及时解决 issue，以便大家专注于在所有目标平台上发布高质量的 Flutter 应用。

![](https://devrel.andfun.cn/devrel/posts/2021/03/7e72a89aa6bc5.png)

> △ [Moi Mobiili](https://www.moi.fi/) 是一家现代移动虚拟网络运营商，最近使用 Flutter 推出了他们的 web 应用

性能的提升永无止境。我们的目标是减少代码体积，提高帧率表现 (fps)。如今，每个 Flutter web 应用都只会下载它必需的引擎代码。我们正在研究缓存部分逻辑的可能性，以减少启动时间和下载文件体积。我们最近在 Flutter Gallery 演示应用中尝试使用延迟库来减少代码体积，相信很快就能同大家分享我们的进展。

在未来几个月内，我们还准备继续完善下列领域:

* 虽然 CanvasKit 很稳定，但还有一些边界用例存在问题，比如特殊字符的 [字体回退](https://github.com/flutter/flutter/issues/74741)，以及对 [跨域资源共享 (CORS) ](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 图像的相应支持等。
* PWA 目前 [只缓存了资源的一个子集](https://github.com/flutter/flutter/issues/75861)，完全的离线支持仍然需要 [额外的手动步骤](https://github.com/flutter/flutter/issues/70101)，才能正常适配 CanvasKit。
* 文本渲染和功能，比如对样式设置较为复杂的文本的选取，仍是我们要继续努力解决的功能之一。
* 我们也会继续努力改善插件生态系统，让 Google 发布的 package 在移动端和 web 端更加统一。

![](https://devrel.andfun.cn/devrel/posts/2021/03/be293ff0f6829.png)

> △ [Simplebet](https://simplebet.io/) 通过 Flutter 的 web 支持，在 Fanduel 现有的移动应用套件中构建了高度互动的嵌入式 NFL 和 NBA 投注体验

## **即刻开始使用 Flutter web**

借助 Dart 的可移植性、Web 平台的强大功能，以及 Flutter 框架的灵活性，你现在可以用同一套代码库，构建用于 iOS、Android 以及浏览器的应用。

如果你已经开发了 Flutter web 应用，现在就可以在 [稳定渠道](https://github.com/flutter/flutter/wiki/Flutter-build-release-channels#stable) 中进行构建。如果你刚开始学习构建 Flutter web 应用，请移步官方文档访问我们的 [入门 codelab 课程](https://flutter.cn/docs/get-started/codelab-web)，以及 Flutter Engage 上的 [web 演讲]({{site.bili.video}}/BV1Jv411h7x6)。构建 web 应用时，如果你发现了任何问题，请随时 [前往 GitHub 提交给我们](https://goo.gle/flutter_web_issue)。

我们非常期待看到你使用 Flutter web 所构建的精彩应用！