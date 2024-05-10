---
title: XD to Flutter 2.0 现已发布！
toc: true
---

![](https://files.flutter-io.cn/posts/images/2021/05/JEUpoL.jpg)

Flutter 是 Google 的开源 UI 工具包。利用它，只需一套代码库，就能开发出适合移动设备、桌面设备、嵌入式设备以及 web 等多个平台的精美应用。过去几年，对于想要打造多平台应用的开发者来说，Flutter 已成为他们的首选。但设计师们需要的是一个视觉工具来建立原型和构建 Flutter UI，而不是精雕细琢 Dart 源代码，于是 [XD to Flutter](https://github.com/AdobeXD/xd-to-flutter-plugin) 应运而生！

此插件的首个预览版推出已近一年。这期间，我们一直在通过一些小更新对它进行优化和改进；如今，继去年夏天 1.0 版的重大发布之后，我们推出了此插件的 2.0 版以配合 Flutter 2 的发布。

## **等等，什么是 XD to Flutter？**

顾名思义，[XD to Flutter](https://youtu.be/raG7NjM0p0k) 插件是一个功能强大、易于使用的工具，可将你的 [Adobe XD](https://www.adobe.com/products/xd.html) 设计导出为简洁、有效的 Flutter 代码。你可以从自己的设计中复制特定视觉元素的代码，导出各种可再利用的 Widgets，甚至可以将一些视图整个导出。

这意味着，利用 XD to Flutter 插件，你只需点击一个按钮，即可让你的设计在任意设备上运行。此插件虽不能为你完成整个应用的编码，但可让你有个极好的开端。

XD to Flutter 由 [gskinner](https://gskinner.com/) 与 Adobe 联合开发，作为 Adobe XD 本身的插件发布，因此，你可将它用于你正在打造的任何现有的 Adobe XD 设计。

## **太棒了！有哪些新功能？**

最初发布的 XD to Flutter 版本非常有助于输出设计中所有不同的视觉元素，比如矢量图形、图片、富文本、背景模糊效果、混合模式、阴影及其他类似元素，只可惜输出结果是静态的，且不够灵活。

尽管抓取图标或文本样式不费什么功夫，但我们仍希望它能发挥更大功效。XD 不仅可让设计师创建动态 UI，还提供有自适应布局、可滚动区域、堆栈及网格之类的工具；我们希望此插件能支持上述每一种功能，而在 2.0 版中，我们取得了许多进展。

**响应式调整尺寸**

XD to Flutter 支持 XD 的响应式布局功能，你可将元素 "固定" 在其所属父元素内，并精确控制其调整尺寸的方式。

![Adobe XD 中的响应式设计](https://files.flutter-io.cn/posts/images/2021/05/2oeEuB.png)

> Adobe XD 中的响应式设计

![Flutter 中的响应式设计](https://files.flutter-io.cn/posts/images/2021/05/T0Kwo6.gif)

> Flutter 中的响应式设计

Flutter 使用 [adobe_xd](https://pub.dev/packages/adobe_xd) 开源软件包中的自定义 Pinned 布局 Widget 实现了这一功能，开发者可直接在其项目中使用。

![Pinned Widget 代码示例](https://files.flutter-io.cn/posts/images/2021/05/nzmZOr.jpg)

> Pinned Widget 代码示例

**堆栈和滚动组**

"堆栈" 和 "滚动组" 让开发者可以运用一些新的方式来在 Adobe XD 中动态布局屏幕内容。通过 XD 中的 "堆栈"，你可以将一堆形形色色的元素以横向或纵向列表排列，元素之间可以有不同的间距；相较于与其同名的 `Stack` Widget，"堆栈" 更类似于 Flutter 中的 `Flex` Widget。

如你所料，利用 "滚动组"，可直接在你的设计内定义一个区域来横向或纵向滚动一大组内容。

XD to Flutter 2.0 版对这些功能都支持，可将它们转换成常见的 Flutter Widget (`Column`、`Row` 以及 `SingleChildScrollView`)。你甚至可以将某个堆栈放入一个滚动组内，从而轻松创建一个滚动项列表。

![XD (左) 和 Flutter (右) 中的堆栈和滚动组](https://files.flutter-io.cn/posts/images/2021/05/GRBLhW.gif)

> XD (左) 和 Flutter (右) 中的堆栈和滚动组

**内边距和背景元素**

另一项新功能是背景元素，也就是说，你可以指定一个视觉元素作为另一组元素的背景。背景元素可以和内边距配对使用，以界定背景的边缘与其内容之间的距离。

Flutter 导出工具使用 `Stack` Widget 将背景元素分层放置在内容之后，而后者则放置在一个 `Padding` Widget 内。

![XD (左) 和 Flutter 中的内边距和背景](https://files.flutter-io.cn/posts/images/2021/05/RIaeJC.gif)

> XD (左) 和 Flutter 中的内边距和背景

**Flutter 2 和空安全机制**

正是有了上述布局功能，才能成就响应式更强的 UI，也增强了 Flutter 2 对桌面设备和 web 等平台的支持。

Flutter 2 还引入了健全的空安全机制 ，这一语言特性可帮助开发者先行捕捉不可为空的变量却为空的问题，避免其在应用中引发问题。XD to Flutter 2.0 版包含一个新设置 "Export Null Safe Code" (导出空安全代码)；导出时选中该设置，可确保生成的代码未来可用。

![](https://files.flutter-io.cn/posts/images/2021/05/mEFck0.png)

> "Export Null Safe Code" 设置和输出

**听起来不错啊！怎样开始使用？**

无论你是要使用它来复制某个构思精妙的渐变效果的代码，还是要导出完全响应式、参数化、交互式的 Widget，都非常简单，不过是加入到成千上万已经在使用 XD to Flutter 插件的创意专业人才大军而已。

你只需从 Adobe XD 的 "Plugin" (插件) 菜单选择 "Browse Plugins…" (浏览插件)，然后搜索 "Flutter" (奇怪的是，搜索 "XD to Flutter" 不起作用)，或前往 [adobe.com/go/xd_to_flutter](https://adobe.com/go/xd_to_flutter)，即可安装此插件。

![](https://files.flutter-io.cn/posts/images/2021/05/r9kl7p.png)

安装好后，从插件面板中打开 XD to Flutter 面板，点按 "Need help" (需要帮助？) 链接，可查阅 [plugin documentation](https://github.com/AdobeXD/xd-to-flutter-plugin/blob/master/README.md) (插件帮助文档)。

我们一直专注于打造可在任何平台上实际运行的精美应用，Flutter 2 就是我们在这一框架上迈出的可喜一步。[gskinner](https://gskinner.com/) 的各团队非常开心能够与 Adobe 和 Google 合作，共同确保 XD to Flutter 进一步简化将设计转换成可运行产品的过程。
