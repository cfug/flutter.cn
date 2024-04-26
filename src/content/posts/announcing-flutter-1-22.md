---
title: Flutter 1.22 发布 — 支持 iOS 14 和 Android 11，以及更多新功能
toc: true
---

![](https://devrel.andfun.cn/devrel/posts/2021/05/1s8wc0.jpg)

*作者 / Chris Sells, Product Manager, Flutter developer experience*

我们很高兴推出支持 iOS 14 和 Android 11 的最新版 Flutter。Flutter 1.22 基于之前的版本更上一层楼，继续助力开发者基于一个代码库为多个平台打造快速、美观的用户体验。我们的季度稳定版本中囊括了最新功能、性能改进和问题修复，且适用于多样的生产环境。

由于本季度是新版移动操作系统的发布季，因此这一版本侧重于确保 Flutter 能够有效支持 Android 11 和 iOS 14。针对这两种操作系统的更新涉及大量的底层工作，以符合最新版 SDK 的规范，并确保所有功能都能通过我们广泛的测试套件中的测试。针对 iOS 14，此版本包含了对新版 Xcode 12 和新图标的支持，以及对 iOS 14 的新功能轻 App (App Clips) 的预览支持。针对 Android 11，此更新支持新的屏幕类型 (如挖孔屏和瀑布屏)，以及在调出软键盘时可以提供更流畅的动画效果。

此版本的发布距我们 1.20 版本的发布仅有两个月时间，因此发布间隔比大多数版本都短。但在如此有限的时间内，我们解决了 3,024 个议题 (issue)，并且合并了来自 197 位贡献者的 1,944 个 PR。其中有 114 位 (58%) 来自社区，并贡献了 271 个 PR。[a14n](https://github.com/a14n) 是最突出的个人贡献者，他再次以 20 个 PR 登上我们的杰出贡献者名单榜首，他贡献的大多数 PR 旨在支持 Flutter 中的空安全 (敬请期待更多即将发布的更新)。

除了对新版移动操作系统的支持以外，我们还有很多其他消息要与你分享，包括针对 Android 呼声最高的功能之一 "状态恢复" 的预览、一整套新的 Material 按钮、可与热重载配合使用的全新国际化与本地化支持、新版 Navigator、稳定版 Platform Views (Google Maps 和 WebView 插件的基础)，以及可以在代码中设置的开关，用以改善高刷新率显示屏设备上的滚动效果。我们还提供了一款新工具，可用于剖析应用大小并确保你所构建的插件仅支持你要支持的平台。

## **支持 iOS 14**

每当厂商发布新版移动操作系统时，我们都会对其进行彻底测试，以查找会影响 Flutter 及其工具的兼容性问题或变更。

为了适配 iOS 14，我们对 Flutter 进行了多项更改，以确保其功能可以满足开发者的需求:

* Xcode 12 需要 iOS 9.0 或更高版本，因此我们的默认模板的默认系统版本从 8.0 提高到 9.0
* iOS 14 带来的崩溃和字体渲染问题已在 Flutter 1.22 中得到修复
* 自 Flutter 1.20.4 起，部署到物理设备的问题已得到解决
* 应用访问剪贴板时会显示相关使用通知，这项新策略在 Flutter 应用中曾引发虚假通知，该问题已在 Flutter 1.20.4 中得到修复
* 禁止在 iOS 14 设备上运行调试应用，但在调试过程中运行应用除外
* 针对本地调试的 Flutter 应用，有关网络安全的新策略会使 iOS 14 显示一次性确认对话框 (仅针对开发中的应用，不适用于已发布的 Flutter 应用)

综上所述，要使你的 Flutter 应用适配 iOS 14，我们强烈建议你立即使用 Flutter 1.22 重新构建应用，然后将其发布至 App Store，以确保你的 iOS 14 用户获得最佳体验。

有关 Flutter 适配 iOS 14 的更多详细信息，包括一些 Add-to-App (将 Flutter 集成至现有应用)、深链接和通知考量因素，请参阅 [Flutter 的 iOS 14 文档](https://docs.flutter.cn/development/ios-14)。

希望我们在工具和 SDK 支持方面所做的工作能够帮助你专注于最关键的任务: 充分利用 iOS 14 的新特性。

其中一项特性就是更新了对 iOS 新版 SF Symbols 字体的支持，为此，我们也相应地更新了 [cupertino_icon package](https://pub.flutter-io.cn/packages/cupertino_icons)。将 cupertino_icons 依赖项更新到新的 1.0 主版本后，现有的 CupertinoIcons 调用将自动映射为新样式。如果将 cupertino_icons 1.0 与 Flutter 1.22 结合使用，那么通过 [CupertinoIcons API](https://api.flutter.cn/flutter/cupertino/CupertinoIcons-class.html)，你将能够获得约 900 个新图标。

![](https://devrel.andfun.cn/devrel/posts/2021/05/xYace4.png)

你可以在 [cupertino_icons](https://flutter.github.io/cupertino_icons/) 预览页面中查看完整的图标列表，也可以参阅 flutter.dev 上的 [迁移详情页](https://docs.flutter.cn/release/breaking-changes/cupertino-icons-1.0.0)。

针对 iOS 14，你可以使用 Flutter 尝试的另一项功能是 [App Clips](https://developer.apple.com/app-clips/)，它是 iOS 14 的一项新增功能，支持以快速、免安装的方式执行 10MB 以下的轻量版本应用。在 Flutter 1.22 版中，我们提供了使用 Flutter 构建轻 App 的功能预览。

![](https://devrel.andfun.cn/devrel/posts/2021/05/ZHcXNl.png)

> △ 使用 Flutter 构建的轻 App 体验

有关如何使用 Flutter 构建轻 App 的更多详细信息，请参阅技 [术文档](https://docs.flutter.cn/development/platform-integration/ios-app-clip)。你也可以参考这一简单的 [示例项目](https://github.com/flutter/samples/tree/master/ios_app_clip)。

## **Android 11**

此版本 Flutter 的发布与 [Android 11 的发布](https://zhuanlan.zhihu.com/p/228405882) 时间也刚好契合。我们更新了 Flutter 框架和引擎，以支持最新版 Android 系统中引入的两项新特性。

第一，Flutter 现在可以提供安全边衬区，以支持 Android 设备的异形屏幕，包括刘海屏、挖孔屏和瀑布屏。

![](https://devrel.andfun.cn/devrel/posts/2021/05/opMphv.png)

通过使用 [MediaQuery](https://api.flutter.cn/flutter/widgets/MediaQuery-class.html) 和 [SafeArea](https://api.flutter.cn/flutter/widgets/SafeArea-class.html) API，你可以确保将活动的界面和交互元素放置在设备显示屏的无遮挡区域内。另外，你需要避免在瀑布屏边缘区域内设置手势检测，从而避免误触问题。

第二，Flutter 应用内显示软件键盘时的动画已经可以与 Android 11 实现同步。

![](https://devrel.andfun.cn/devrel/posts/2021/05/uLpxxk.gif)

> △ 请注意左侧悬浮操作按钮 (FAB) 的同步位移

Issue [#19279](https://github.com/flutter/flutter/issues/19279) 由来己久，即系统键盘的显示/隐藏动画与 Flutter 的边衬区一直无法同步。这一问题在 Android 11 中已得到解决。

这里做一则关于 Android 嵌入 API 的说明。去年，随着 Flutter 1.12 版的发布，我们推出了一套适用于 Android 系统的新版 Flutter 引擎和 Flutter 插件 API。我们打造了这些 API 的 v2 版本，以更好地支持 Android 平台的 Add-to-App 用户。一年后，我们有超过 80% 的 Android 插件使用了新版 Android API。自 1.22 起，我们将弃用较旧的 v1 版本 API。

如果你仍在使用 Android v1 API，那么将存在如下问题:

* 新创建的插件将不再适配 v1 API
* Flutter 工具的 —no-enable-android-embedding-v2 配置标记已移除，现已作为默认行为
* 仍在使用 v1 API 的旧版应用在构建时会显示弃用警告，并提供 [支持新版 Android 插件 API 的文档](https://docs.flutter.cn/development/packages-and-plugins/plugin-api-migration) 入口。

同时，如果你仍有基于 v1 Android API 的 Flutter 应用，该应用仍然可以运行。但是，你可能会逐渐遇到仅适用于 v2 API 的新版插件，v1 Android API 则无法使用。有关更多详细信息，请参阅 [重大变更文档](https://docs.flutter.cn/release/breaking-changes/android-v1-embedding-create-deprecation)。

## **更加丰富的按钮样式**

![](https://docs.flutter.cn/release/breaking-changes/android-v1-embedding-create-deprecation)

> △ 一整套新的 Material Design 按钮

现有的 Flutter 按钮虽然美观，但 [并不易用](https://files.flutter-io.cn/flutter-design-docs/material-button-system-updates.pdf)，尤其是在需要自定义主题时。此外，Material 规范也已经扩充包含了许多全新样式的按钮。

为使 Flutter 紧随 Material 指南的变更步伐，我们很高兴地宣布 Flutter 1.22 中加入了一整套全新的按钮。

相比就地尝试和改进现有的按钮类及其主题，[这个 PR](https://github.com/flutter/flutter/pull/59702) 引入了新的替换按钮 widget 和主题。这项提议不但使我们免于因维护既有类而踏入向后兼容性的迷宫，还使 Flutter 遵守了 [Material Design 指南](https://material.io/components/buttons/) 中对按钮组件的全新命名规则。

![](https://devrel.andfun.cn/devrel/posts/2021/05/Hm9x4W.png)

新主题遵循 Flutter 最近对新 Material widget 采用的 "规范化" 模式。如果你想通过示例来上手体验，可以参见 DartPad 中的这个绝佳 [示例](https://dartpad.cn/e560e1c2e4455ad53aac245079ccdcf2)。这并不属于重大变更，因为 FlatButton、OutlineButton、RaisedButton、ButtonBar、ButtonBarTheme 和 ButtonTheme的语义并未发生改变。你可以根据喜好将旧按钮与新按钮混合搭配使用。

## **新的国际化和本地化支持**

自发布以来，Flutter 就提供了对应用进行国际化 (i18n) 和本地化 (l10n) 所需的核心功能。但在最新版本中，我们将推荐的最佳做法直接整合进了工具当中，甚至实现了热重载支持，可以在你添加新的本地化信息时更新你的应用。

![](https://devrel.andfun.cn/devrel/posts/2021/05/8QezMC.gif)

如果你想了解有关 Flutter 本地化支持的更多详细信息，包括本地化的消息，以及含参数、日期、数字和货币的消息，请阅读 Flutter [国际化用户指南](https://files.flutter-io.cn/flutter-design-docs/i18n-user-guide.pdf)。

此外，如果你对国际化和本地化感兴趣，那么你可能同样有兴趣了解旧的纯文本 ASCII 无法支持的字符串，例如 Unicode 和表情符号 (emoji)。最近，Dart 团队发布了 characters package，可以帮助开发者处理 Unicode (扩展) 字形集。这个 package 可解决诸如如何将类似于 "A 🇬🇧 text in English" 的字符串正确地缩短至前 15 个字符一类的问题。使用 String 类时，缩短的结果是 "A 🇬🇧 text in"，仅含 12 个用户可感知字符。而使用 [characters package](https://pub.flutter-io.cn/packages/characters) 则会得到正确的结果: "A 🇬🇧 text in Eng"。

基于 [PR59267](https://github.com/flutter/flutter/pull/59267)，Flutter 将使用 characters package 来正确处理这些复杂字符。例如，当使用具有 maxLength 限制的 TextField 时，诸如 👨‍👩‍👦 ‍‍ 的字符现在可以正确地计为单个字符。另外，基于 [PR59620](https://github.com/flutter/flutter/pull/59620)，characters package 在 Flutter 所在的项目中均自动可用，无需手动添加。希望这种方案可以使处理来自所有语言区域的各种字符串变得更加容易。有关 characters package 的更多详细信息，请参阅《[如何正确处理 Dart 字符串](https://medium.com/dartlang/dart-string-manipulation-done-right-5abd0668ba3e)》。

## **可正式使用的 Google Maps 和 WebView 插件**

Flutter 团队在将某项功能标记为 "生产就绪" 前会非常谨慎，并亲自完成全面的测试。对于 [google_maps_flutter](https://pub.flutter-io.cn/packages/google_maps_flutter) 和 [webview_flutter](https://pub.flutter-io.cn/packages/webview_flutter) 插件而言，决断因素一直是底层的 [Platform Views](https://docs.flutter.cn/development/platform-integration/platform-views) 实现，该实现支持将 Android 和 iOS 系统的原生界面组件托管在 Flutter 应用中。我们很高兴地宣布，我们在此版本的 Flutter 中对框架的基础进行了充分强化，足以将这两个插件标记为 "生产就绪"。

![](https://devrel.andfun.cn/devrel/posts/2021/05/8kusLr.gif)

> △ 托管 flutter.dev 的 webview_flutter 插件

在 Flutter 1.22 中，我们新增了备选的 Platform Views 实现，修复了 [Android 视图所有已知的键盘和无障碍问题](https://github.com/flutter/flutter/issues/61133)。此外，该版本还支持 Android API 19 及更高级别 (此前曾要求 API 级别 20)。我们还在 iOS 上进行了线程改进，使 Platform Views 更为高效可靠 (并且你不再需要将 `io.flutter.embedded_views_preview` 标记添加到 iOS Info.plist 中)。

[webview_flutter](https://pub.flutter-io.cn/packages/webview_flutter) 插件支持新的 Android Platform Views 模式，但目前需要 [手动启用](https://github.com/flutter/plugins/blob/master/packages/webview_flutter/README.md#android)。当该功能在更广泛的社区中得到更多使用后，我们会在未来版本中默认启用它。

Google Maps 和 WebView 插件已经从 Platform Views 的改进中受益。如果你想使用 Platform Views 来托管 iOS 或 Android 中的原生界面组件，可以前往 [这里](https://docs.flutter.cn/development/platform-integration/platform-views) 了解相关方法。

## **Navigator 2.0**

如果你曾在 Flutter 应用中使用过 [导航](https://docs.flutter.cn/development/ui/navigation)，那么你可能已经注意到核心数据结构 (即用户所浏览的页面堆栈) 是对你隐藏的。要对其进行管理，你需调用 Navigator.pop() 或 Navigator.push()。举例来说，假设你想在首页上显示一系列 widget，用户点按一个 widget 后转到呈现该颜色的详细信息页面 (如下图所示)。

![](https://devrel.andfun.cn/devrel/posts/2021/05/XmAMxs.png)

这两个屏幕可以采用如下方式实现:

```Dart
class ColorListScreen extends StatelessWidget {
 final List<Color> colors;
 final void Function(Color color) onTapped;
 ColorListScreen({this.colors, this.onTapped});
 
 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: Text('Colors')),
       body: Column(
         children: [
           // you can see and decide on every color in this list
           for (final color in colors)
             Expanded(
               child: GestureDetector(
                 child: Container(color: color),
                 onTap: () => onTapped(color),
               ),
             )
         ],
       ),
     );
}
 
class ColorScreen extends StatelessWidget {
 final Color color;
 const ColorScreen({this.color});
 
 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: Text('Color')),
       body: Container(color: color),
     );
}
```

使用最简单的 Navigator 1.0 做法，即可通过看起来非常简单的方式在这两个屏幕之间导航:

```Dart
class _ColorAppState extends State<ColorApp> {
 List<Color> _colors = [Colors.red, Colors.green, Colors.blue];
 
 @override
 Widget build(BuildContext context) => MaterialApp(
       title: 'Color App',
       home: Builder(
         builder: (context) => ColorListScreen(
           colors: _colors,
           // the Navigator manages the list of pages itself; you can only push and pop
           onTapped: (color) => Navigator.push(
             context,
             MaterialPageRoute(builder: (context) => ColorScreen(color: color)),
           ),
         ),
       ),
     );
}
```

只需调用 `Navigator.push()` 即可将某一页面推入首页的上方，从而创建包含两个页面的堆栈。但与通过 `ColorListScreen` 的 build 方法创建的一系列 `Containers` 不同的是，该堆栈将对你隐藏。而且由于堆栈被隐藏，在其他场景中将难以对其进行管理，例如处理由原生嵌入、网址或 Android intent 等提供的初始路由中包含的深链接。管理同一页面的不同排列形成的嵌套路由时也十分困难。

通过使页面堆栈可见，Navigator 2.0 有效解决了上述乃至更多问题。以下是在相同的 `ColorListScreen` 和 `ColorScreen` 之间导航的新示例:

```
class _ColorAppState extends State<ColorApp> {
 Color _selectedColor;
 List<Color> _colors = [Colors.red, Colors.green, Colors.blue];
 
 @override
 Widget build(BuildContext context) => MaterialApp(
       title: 'Color App',
       home: Navigator(
           // you can see and decide on every page in this list
         pages: [
           MaterialPage(
             child: ColorListScreen(
               colors: _colors,
               onTapped: (color) => setState(() => _selectedColor = color),
             ),
           ),
           if (_selectedColor != null) MaterialPage(child: ColorScreen(color: _selectedColor)),
         ],
         onPopPage: (route, result) {
           if (!route.didPop(result)) return false;
           setState(() => _selectedColor = null);
           return true;
         },
       ),
     );
}
```

该应用显式创建了 `Navigator`，并为其提供了代表完整堆栈的页面列表。我们创建一个空的 `_selectedColor` 来表示尚未选择任何颜色，因此我们最初不显示 `ColorScreen`。当用户选择一种颜色时，我们将照常调用 s`etState()` 以向 Flutter 指示你需要再次调用 `build()` 方法，进而创建顶部为 `ColorScreen` 的堆栈。

你可以在 `OnPopPage` 回调中更新状态，例如，如果用户执行了 pop (弹出栈顶元素) 操作，则表示他们已 "取消选择" 当前颜色，因此我们不再需要显示该页面。

Navigator 2.0 看起来与 Flutter 的其余部分相似，这种设计是有意为之——此版本为声明式导航，而不同于 Navigator 1.0 版本的命令式导航。这种设计旨在统一导航与 Flutter 的其余部分之间的模型，以便在解决问题的同时添加新的功能。实际上，本例较为简略，只能对 Navigator 2.0 提供粗浅的说明。如需了解详细信息，强烈推荐你参阅有关 Flutter 中的声明式导航和路由的这篇 [文章](https://medium.com/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade)。

另外，你对 Navigator 1.0 的现有使用仍将有效，在短期内不会被移除。如果你喜欢该模型，则可以一如既往地使用该版本。但如果你试用了 Navigator 2.0，我们相信你会喜欢上这一全新版本。

## **预览: 适用于 Android 的状态恢复**

此版本支持 [Android 的状态恢复](https://developer.android.google.cn/topic/libraries/architecture/saving-states) (State Restoration)，欢迎大家试用这一新增功能。这是我们的 [热门功能之一](https://github.com/flutter/flutter/issues/6827)，获得了 217 次点赞！

对于不熟悉状态恢复需求的用户: 移动操作系统可能会终止后台应用以回收资源供前台应用使用。发生这种情况时，操作系统会通知该应用即将被终止以便其快速保存界面状态，从而在用户切换回该应用时能够恢复。正确实现该操作后，既能为用户提供无缝体验，也可以更好地利用设备资源。Flutter 此前尚不支持状态恢复，因为在不具备框架支持的情况下很难正确地实现状态恢复。正因如此，我们很高兴能够在 Android 平台中提供此功能的基础实现。

下面是一个恢复 Flutter Counter 应用状态的非常简单的 [示例](https://api.flutter.cn/flutter/widgets/RestorationMixin-mixin.html#widgets.RestorationMixin.1):

```
class CounterState extends State<RestorableCounter> with RestorationMixin {
    @override
    String get restorationId => widget.restorationId;

    RestorableInt _counter = RestorableInt(0);

    @override
    void restoreState(RestorationBucket oldBucket) => registerForRestoration(_counter, 'count');

    void _incrementCounter() => setState(() => _counter.value++);

    @override
    Widget build(BuildContext context) => Scaffold(
        body: Center(child: Text('${_counter.value}')),
        floatingActionButton: FloatingActionButton(onPressed: _incrementCounter),
    );
}
```

简而言之，每个 widget 都有一个存储分区，该存储分区使用唯一 ID 注册到 [RestorationMixin](https://api.flutter.cn/flutter/widgets/RestorationMixin-mixin.html)。通过使用 [RestorableProperty](https://master-api.flutter-io.cn/flutter/widgets/RestorableProperty-class.html) 类型 (如此例使用的 RestorableInt) 存储特定于界面的数据，并向状态恢复功能注册该数据，即可在 Android 终止应用前自动存储数据，并在应用恢复运行时恢复数据，就是这么简单。所有以 Restoration* 类型存储的数据 (如 RestorableInt、RestorableString 和 RestorableTextEditingController，不胜枚举) 都能被恢复。而且，如果我们未能覆盖你想要恢复的类型，你也可以通过扩展 [RestorableProperty<T>](https://api.flutter.cn/flutter/widgets/RestorableProperty-class.html) 来创建自己的类型。

![](https://devrel.andfun.cn/devrel/posts/2021/05/ZUSUID.png)

为了自动测试状态恢复，我们 [为 WidgetTester 添加了一个新的 restartAndRestore API](https://api.flutter.cn/flutter/flutter_test/WidgetTester/restartAndRestore.html)。要进行手动测试，最简单的方法是在 Android 设备上启动已启用状态恢复功能的 Flutter 应用，在 Android 的开发者设置中打开 "Don’t keep activities"，运行 Flutter 应用并将其置于后台，然后再切换回该应用。此时，Android 已终止并恢复你的应用，届时你可以检查是否一切正常。

虽然我们很高兴为你提供状态恢复的预览版本，但还有更多工作待完成。例如，状态恢复不仅适用于 Android，iOS 应用也将从中受益。此外，我们也在致力于更新 Flutter widget，以在恢复时保持其状态。我们已经在 Scrollable 类中提供了支持，例如 ListView 和 SingleChildScrollView (用于记住用户的滚动位置) 和 TextFields (用于恢复用户输入的文本)，并且我们计划将这些支持扩展至其他 widget。

但是，我们目前尚未为导航 (包括 Navigator 1.0 和 2.0) 添加关键恢复支持，这也是我们暂时称其为预览版本的原因。这意味着应用暂时无法恢复用户所在位置。该功能的测试版即将在 Flutter 的下一个稳定版本中正式发布。

## **预览: 在输入频率与显示刷新率不匹配情况下提供平滑的滚动效果**

Flutter 团队与 Google 内部合作伙伴密切合作，在输入频率与显示刷新率不同的情况下显著提高了滚动性能。例如，Pixel 4 输入频率为 120hz，而显示屏刷新率为 90hz。在滚动屏幕画面时，这种不匹配会导致性能下降。使用新的 resamplingEnabled 标记，你可以利用我们在 Flutter 中实现的性能改进解决此问题:

```
void main() {
    GestureBinding.instance.resamplingEnabled = true;
    run(MyApp());
}
```

启用此标记后，滚动屏幕画面时的掉帧率最多可以降低 97%，具体取决于所涉及的频率差。在确定这一配置能够提供最佳体验后，我们计划在未来的版本中默认启用此标记。

## **全新的统一 Dart 开发者工具**

与往常一样，对 Flutter 的更新不仅限于引擎和框架，还包括工具方面的更新。Flutter 1.22 中包含新版 Dart (2.10)，以及非常实用的新 dart 命令行工具。

Dart 之前有许多小巧的开发者工具 (例如，用于格式化的 dartfmt 和用于代码分析的 `dartanalyzer`)。Dart 2.10 中新提供了统一的 dart 开发者工具，与 flutter 工具非常相似。

![](https://devrel.andfun.cn/devrel/posts/2021/05/ngscrA.png)

自新版 Flutter 1.22 SDK 起，<flutter-sdk>/bin 文件夹 (可能在你的 PATH 位置) 中将同时包含 flutter 和 dart 命令。有关更多详细信息，请参阅 [Dart 2.10](https://medium.com/dartlang/announcing-dart-2-10-350823952bd5) 的发布文章。

## **应用体积分析工具**

Flutter 1.22 还带来了新的输出应用体积分析的实用工具。此工具可以帮助分析 Flutter 并判断应用尺寸构成是否随时间变化。

你可以通过将 `--analyze-size` 标记传递给以下任何命令来使用该工具收集分析所需的数据:

* flutter build apk

* flutter build appbundle

* flutter build ios

* flutter build linux

* flutter build macos

* flutter build windows

在构建 Flutter 输出工件时使用此标记将打印工件大小及组成的摘要。其中包括原生代码、资源，甚至包括已编译的 Dart 代码的软件包级细分情况。

![](https://devrel.andfun.cn/devrel/posts/2021/05/C8RTHd.png)

> △ Flutter Gallery 发布版本 APK 的细分示例

此摘要有助于快速识别应用软件包中的尺寸热点。此外，收集到的数据还可作为 JSON 文件用于 Dart DevTools，你可以按照 [Flutter 文档上的说明](https://docs.flutter.cn/development/tools/devtools/app-size) 进一步浏览应用的内容、查明大小问题以及比较两个不同 JSON 文件之间的差异。加载 JSON 文件后会出现一个界面，其中提供了应用尺寸情况的树状图。

![](https://devrel.andfun.cn/devrel/posts/2021/05/GedErZ.png)

> △ Dart DevTools 中的 APK 细分示例

更多有关你可以使用应用尺寸工具执行的操作，请参阅文档: [使用应用尺寸工具](https://docs.flutter.cn/development/tools/devtools/app-size)。

## **预览: 在 DevTools 中更新了 Network 页面**

此版本中的另一项 DevTools 预览功能是，用户能够在 **Network** 标签中查看 HTTP 和 HTTPs 响应正文。

![](https://devrel.andfun.cn/devrel/posts/2021/05/xx7qFb.png)

要启用此功能，请确保通过 flutter channel dev 和 flutter upgrade 命令进入 Flutter dev 渠道。

此外，对于网络流量较大的应用，我们提供了搜索和筛选功能。

![](https://devrel.andfun.cn/devrel/posts/2021/05/10HBMU.png)

有关 **Network** 标签的文档，请参阅 [使用网络视图  (Network View)](https://docs.flutter.cn/development/tools/devtools/network) 的说明。

## **IntelliJ 中托管的 DevTools Inspector 标签**

一段时间以来，我们一直在维护着某些 Flutter 工具的两个副本，例如 IntelliJ 中的 **Inspector** 窗格和 Dart DevTools 中的 **Inspector** 标签。这不仅降低开发速度，因为我们必须维护两个代码库，也造成某些功能 (例如 Layout Explorer) 尚未能纳入到 IntelliJ 插件当中。因此，为了同时解决这两个问题，我们现在提供直接在 IntelliJ 内部托管 Dart DevTools 的 Inspector 标签的功能。

![](https://devrel.andfun.cn/devrel/posts/2021/05/AWpL8g.png)

请注意新出现的 Layout Explorer，你可以在代码旁使用该功能。要启用此选项，请使用 **Preferences** > **Languages & Frameworks** > **Flutter** > **Enable embedded DevTools inspector**。

## **Visual Studio Code 中的输出链接得到改进**

对于所有 Flutter 开发者而言，在终端或堆栈分析结果中查看错误输出并继续解决问题都是一项必不可少的例行工作。在 Visual Studio Code 的最新版本 Flutter 扩展中，现已能够正确解析这些链接，使你可以直接在输出结果中使用它们。

![](https://devrel.andfun.cn/devrel/posts/2021/05/krDNo3.png)

这项功能看似微不足道，却已获得了非常积极的初步反馈。

与往常一样，我们在工具方面的变更不胜枚举，谨建议你参阅以下发布内容来了解相关详细信息:

* [Dart DevTools - 0.9.0](https://groups.google.com/g/flutter-announce/c/UxMv8MzE_uo/m/ED539pi2AAAJ)
* [Dart DevTools - 0.9.1](https://groups.google.com/g/flutter-announce/c/y27h86ATFJM)
* [Dart DevTools - 0.9.3](https://groups.google.com/g/flutter-announce/c/24LppkXdMtM)
* [Flutter IntelliJ Plugin M48.1 版本](https://groups.google.com/g/flutter-announce/c/nvgDi3RLAUE/m/Fx4Ze0vrBAAJ)
* [Flutter IntelliJ Plugin M49 版本](https://groups.google.com/g/flutter-announce/c/-ZMKRIBRtGU)
* [Flutter IntelliJ Plugin M50 版本](https://groups.google.com/g/flutter-announce/c/u0zU6zv3o44/m/2y0JsX1_AwAJ)
* [VS Code 扩展程序 v3.14.0](https://groups.google.com/g/flutter-announce/c/8e8e-ZrgySY)
* [VS Code 扩展程序 v3.15.0](https://dartcode.org/releases/v3-15/)

## **精彩案例: EasyA**

[EasyA](https://easya.io/) 是一款订阅应用，为适龄学生搭建了通过即时通讯与优秀教师沟通的平台，该应用使用 Flutter 编写。这款应用近日被 Apple 推荐为 [每日精选应用](https://apps.apple.com/gb/story/id1527472788)。

![](https://devrel.andfun.cn/devrel/posts/2021/05/IvM3sF.png)

> 今年年初，学校纷纷启动了在线课程，我们需要快速发布这款教学应用来为学生提供帮助。Flutter 惊人的开发速度使我们能够针对 iOS 和 Android 平台实现优秀的设计，而且还支持发布到 web 平台，这有助于我们及时应对停课的局面！这在以前是无法想象的。由于 Flutter 支持同时针对所有三个平台进行开发，我们能够高效地共享代码，并最为充分地利用我们的小型开发团队。
>
>
>
>
>
> — Phil Kwok，EasyA 联合创始人

## **重大变更**

与往常一样，我们试图将重大变更的数量降至最低。Flutter 1.22 版本的重大变更列表如下:

* [56413](https://github.com/flutter/flutter/pull/56413) - [如果指定的 Rect 已经可见，则阻止 viewport.showOnScreen 滚动窗口](https://docs.google.com/document/d/1BZhxy176uUnqOCnXdnHM1XetS9mw9WIyUAOE-dgVdUM/edit?usp=sharing)。
* [62395](https://github.com/flutter/flutter/pull/62395) - [gen_l10n] 默认生成合成软件包。
* [62588](https://github.com/flutter/flutter/pull/62588) - 进一步减少构建路线。

## **总结**

Flutter 1.22 稳定版在上一版本发布之后很快问世，其中包含了诸多新特性，本篇文章未能一一列举。我们希望此版本可以帮助你为 iOS 和 Android 开发出优秀的应用，我们对你将在应用商店中发布的产品充满期待！感谢你的支持——Flutter，为开发者而打造。
