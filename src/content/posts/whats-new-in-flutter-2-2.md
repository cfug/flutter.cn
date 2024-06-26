---
title: Flutter 2.2 更新详解
toc: true
---

![]({{site.flutter-files-cn}}posts/images/2021/05/fHLvPr.jpg)

[Flutter 2.2 版](https://flutter.cn/posts/announcing-flutter-2-2?t=1)已正式发布！要获取新版本，你只需切换到 stable 渠道并更新目前安装的 Flutter，或前往 [docs.flutter.cn/get-started](https://docs.flutter.cn/get-started) 从头开始安装。

虽然与 2.0 版只相隔数月，2.2 版还是满载大量改进。此版本共计纳入了框架、引擎和插件库等方面的 2,456 个 PR 并解决了 3,105 个问题。我们要特此鸣谢为此版本贡献了大量 PR 和 PR review 的整个 Flutter 社区，包括 PR 贡献最多 (17) 的 [Abhishek01039](https://github.com/Abhishek01039) 和 PR review 贡献最多 (9) 的 [xu-baolin](https://github.com/xu-baolin)。衷心感谢所有开发者对 Flutter 2.2 顺利发布稳定版做出的贡献。没有大家的支持，我们将无法做到。

每个新的 Flutter 稳定版都会带来诸如性能提升、新功能、bug 修复等一系列变化，并会提供一些尚未试用于生产环境的试验性功能，希望你能帮助我们验证这些功能能否正常工作并满足你的需求。此外，新版本还会包含一系列相关工具的更新和来自 Flutter 社区的更新。坦白讲，如今 Flutter 每个新版本的内容都非常丰富，不可能在一篇文章中巨细无遗地详述，因此下面我们将着重为你介绍一些主要亮点。

## **Flutter 2.2 稳定版更新**

此版本在 Flutter 2 的基础上做了诸多改进，其中不但有面向 Android、iOS 和 web 平台的更新，还有新的 Material 图标、文本处理方式的改进、滚动条行为的变化、TextSpan widget 的鼠标光标支持，以及用一份代码适配多个平台方面的新指南。这些功能皆已发布稳定版，可供你在正式版应用中使用。同时，所有这些功能都是在 [新版 Dart](https://flutter.cn/posts/announcing-dart-2-13) 的基础上构建而成。

**Dart 2.13**

随 Flutter 2.2 版一起发布的还有 [Dart 2.13 版](https://flutter.cn/posts/announcing-dart-2-13)。此 Dart 版本包含众多新功能，其中之一是新的类型别名，该功能让你可为类型创建别名，就像为函数创建别名一样:

```dart
// Type alias for functions (existing)
typedef ValueChanged<T> = void Function(T value);

// Type alias for classes (new!)
typedef StringList = List<String>;

// Rename classes in a non-breaking way (new!)
@Deprecated("Use NewClassName instead")
typedef OldClassName<T> = NewClassName<T>;
```

有了类型别名，你可为长而复杂的类型赋予简短易懂的名称，并以不会破坏代码的方式重命名你的类。Dart 2.13 版还包含其他多项更新，你可以在我们之前的推文 [Dart 2.13 版本发布](https://flutter.cn/posts/announcing-dart-2-13) 中了解详情。

**Flutter web 更新**

作为 Flutter 稳定版最新支持的平台，web 平台在此版本也有多项改进。

首先，我们借助新的 service worker 加载机制优化了缓存行为，并修复了 `main.dart.js` 的重复下载问题。在旧版 Flutter web 中，service worker 会在后台下载应用更新，用户在此期间可照常使用应用的旧版本。更新下载完毕后，用户要多次刷新浏览器页面后才会看到相应更新。在 Flutter 2.2 版中，当新的 service worker 检测到更新后，用户需要先等待更新下载完毕才能使用应用，但届时他们无需再次手动刷新页面即可看到更新内容。

要启用此项变更，你需要重新生成你的 Flutter 应用的 `index.html`。具体来说，请保存你的修改、删除 `index.html` 文件，然后在项目目录中运行 `flutter create` . 以重新生成该文件。

我们还对两个 web 渲染器都做了改进。在 HTML 渲染器上，我们添加了对 [字体特性](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) 的支持，以启用 [`FontFeature`](https://api.flutter-io.cn/flutter/dart-ui/FontFeature-class.html) 设置并使用 canvas API 渲染文本，从而使鼠标悬停处的文本能够显示在适当的位置。在 HTML 和 CanvasKit 渲染器上，我们新增了对着色器遮罩 (shader masks) 和 [`computeLineMetrics`](https://api.flutter-io.cn/flutter/painting/TextPainter/computeLineMetrics.html) 的支持，以解决 Flutter web 应用和移动应用两者不一致的问题。例如，开发者现在可以通过 [不透明度遮罩](https://api.flutter-io.cn/flutter/widgets/Opacity-class.html) 使用着色器遮罩实现淡出转场，并像在移动应用中一样使用 `computeLineMetrics`。

无障碍功能不但是 Flutter web 的一大重点，也是整个 Flutter 的一个重心所在。按照设计，是通过构建 `SemanticsNode` 树来实现无障碍功能。Flutter web 应用的用户启用无障碍功能后，我们会生成一个与 `RenderObject` DOM 树并行的 DOM 树，并将语义属性转换为 Aira。在此版本中，我们改进了语义节点位置，消除了移动应用和 web 应用在使用转换 (transform) 时的不一致，这意味着在使用转换对 widget 进行样式设置时，焦点框会正确地显示在元素上方。如需直观了解其实际效果，你可以观看 Material Design 无障碍项目负责人 Victor Tsaran 的视频，了解他如何对 [Flutter Gallery App 使用 VoiceOver]({{site.flutter-files-cn}}posts/images/2021/05/yFhscX.mp4)。

<video controls width="640px" height="480px" src="{{site.flutter-files-cn}}posts/images/2021/05/yFhscX.mp4"></video>

我们现在还提供一个适用于性能分析 (profile) 和发布 (release) 模式的命令行 flag，以供开发者访问语义节点调试树，并直观查看系统为其 web 应用创建的语义节点，从而对应用的无障碍功能进行调试。

要为你的 Flutter web 应用启用此功能，请运行以下命令:

```console
$ flutter run -d chrome --profile \
  --dart-define=FLUTTER_WEB_DEBUG_SHOW_SEMANTICS=true
```

激活该 flag 后，你将能够在各个 widget 上方看到你的语义节点，从而进行调试并检查语义元素的位置是否符合预期。如果你发现这类问题，欢迎向我们 [提交 bug 报告](https://goo.gle/flutter_web_issue)。

虽然在核心无障碍功能的支持方面已经取得了长足进步，但我们仍在这个领域不断改进。在 [2.2 稳定版](https://flutter.cn/posts/announcing-flutter-2-2?t=1) 之后的 master 和 dev 渠道 build 中，我们新增了一个 API，供开发者以编程方式为其应用 [自动启用无障碍功能](https://github.com/flutter/engine/pull/25830)，同时我们正在着手解决 [在屏幕阅读器中使用 Tab 键](https://github.com/flutter/engine/pull/25797) 的问题。

最后但也同样重要的是，最新版的 Flutter DevTools 现在还支持为你的 Flutter web 应用使用布局浏览器。

![]({{site.flutter-files-cn}}posts/images/2021/05/5Ux1TW.png)

你现在可以在 web 应用中使用你所熟悉的布局调试工具，这与移动应用和桌面应用别无二致。

**iOS 页面转场和增量式安装**

对于 iOS 平台，此版本将动画帧的渲染时间缩减了 75%，[使 Cupertino 主题中页面转场更流畅](https://github.com/flutter/flutter/pull/75670)。在低端手机上的缩减比例甚至可能更高。我们不仅改善了最终用户可感知到的性能，还一直在想方设法提升开发性能。

在此版本中，我们实现了开发过程中的 [增量式 iOS 安装](https://github.com/flutter/flutter/pull/77756)。基准测试结果显示，iOS 应用的更新版本安装时间缩短了 40%，这也就缩短了你的应用变更测试周期。

**使用 Flutter 构建平台自适应应用**

随着 Flutter 稳定版逐步支持更多平台，你在设计应用时不仅需要考虑兼容不同的设备类型 (如手机、平板电脑和桌面电脑)，还需要考虑支持不同的输入方式 (触摸与键鼠)，以及适配各个平台上的不同使用习惯 (例如在导航时是使用抽屉式导航栏还是系统菜单)。如果应用能够根据不同目标平台的细节差异做出相应调整，我们就称之为平台自适应应用。

如果你想初步了解在构建平台自适应应用时要考虑哪些因素，请观看 Kevin Moore 关于 "[构建平台自适应应用](https://events.google.com/io/session/868dfd56-7f8c-49ee-84ad-ac69a23ba19d?lng=en)" 的视频。如需详细了解，你可以阅读 [Flutter 文档中关于平台自适应应用的指南](https://docs.flutter.cn/development/ui/layout/building-adaptive-apps)。

最后，如需参考遵循这些指南编写出的多平台应用示例。我们建议你看看 gSkinner 打造的 [Flokk](https://flutter.gskinner.com/flokk) 和 [Flutter Folio](https://flutter.gskinner.com/folio) 应用。你既可以下载 [Flokk](https://github.com/gskinnerTeam/flokk) 和 [Folio](https://github.com/gskinnerTeam/flutter-folio) 的源代码，也可以从各个应用商店下载 [Flokk](https://flutter.gskinner.com/flokk/#g-download) 和 [Folio](https://flutter.gskinner.com/folio/#g-download) 应用，还可以直接在浏览器中运行它们。另一个优秀示例是 [用于创建指南本身的应用](https://www.youtube.com/watch?v=8YUIrIGGc3Y)。

Flutter 平台自适应应用指南的 UX 部分以新的 [Material 大屏幕指南](https://material.io/blog/material-design-for-large-screens) 为基础。Material 团队在新发布的这一指南中，根据大屏幕的特性，修订了多篇主要的布局文章，调整了多个组件，并更新了 Design Kit。

![]({{site.flutter-files-cn}}posts/images/2021/05/oXdq99.png)

Flutter 的目标始终是让应用可以走得更高更远，而不仅是能够在多个平台上正常运行。不做到让你的应用能够良好适配所有目标平台，我们不会停下脚步。Flutter 能够为你提供所需支持，让你的应用不但能够覆盖多个目标平台，而且能够针对不同的屏幕尺寸、输入方式以及各平台的不同使用习惯而做出适当的调整。

[**更多 Material 图标**](https://github.com/flutter/flutter/pull/76607)

说起 Material 指南，此版本还纳入了两个独立的 PR，向 Flutter 中添加了更多 [Material 图标](https://github.com/flutter/flutter/pull/78311)。我们可爱的吉祥物 Dash 现在也有专属的图标了！

![]({{site.flutter-files-cn}}posts/images/2021/05/U8KghW.png)
![]({{site.flutter-files-cn}}posts/images/2021/05/3nWtj6.png)

加上这些新图标，可供你的应用使用的 Material 图标总数现已突破 7,000 大关。如果你在这海量图标中寻找所需图标时遇到了困难，可以访问 [fonts.google.com/icons](https://fonts.google.com/icons)，按类别和名称来搜索图标。

找到理想的图标后，你可以在新的 "Flutter" 标签页中查看有关如何使用该图标的说明。你也可以单独下载这个图标，将其用作应用中的独立资源。在你的 Flutter 应用中加入 Dash 的可爱形象从未如此简单。

![通过名称搜索 Material 图标]({{site.flutter-files-cn}}posts/images/2021/05/BmOCBD.png)

通过名称搜索 Material 图标

**改进文本处理方式**

随着我们持续改进 Flutter 以使其能够更好地适配各个平台的具体特性，我们正逐步涉足一些在移动设备上不突出但在桌面设备上很重要的新领域，其中之一就是文本处理。在此版本中，我们着手对文本输入的处理方式进行重构，以实现下述功能: 在按键事件于 widget 层次结构内传播的过程中将其取消，以及能够完全自定义与文本操作相关联的按键。

由于现在能够取消按键事件，Flutter 按下空格键和箭头键时不会再触发滚动事件，从而让用户获享更直观的体验。你还可以使用此功能来实现在一个按键事件传播到你应用中的父级 widget 之前对其进行处理。另一个例子是，你可以在你的 Flutter 应用中实现用 Tab 键在 TextField 和按钮之间跳转，一切都可按预期正常运作:

```dart
import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
 @override
 Widget build(BuildContext context) => MaterialApp(
       title: 'Flutter Text Editing Fun',
       home: HomePage(),
     );
}

class HomePage extends StatelessWidget {
 @override
 Widget build(BuildContext context) => Scaffold(
       body: Column(
         children: [
           TextField(),
           OutlinedButton(onPressed: () {}, child: const Text('Press Me')),
         ],
       ),
     );
}
```

![Flutter 2.2 可在按键事件于 widget 层次结构内向上传播的过程中将其取消；例如，你可以将 TAB 键用于将焦点从 TextField 切换到其他元素]({{site.flutter-files-cn}}posts/images/2021/05/0YgCDW.png)

Flutter 2.2 可在按键事件于 widget 层次结构内向上传播的过程中将其取消；例如，你可以将 TAB 键用于将焦点从 TextField 切换到其他元素

自定义文本操作让你可以实现对 TextField 中的 Enter 按键事件进行特殊处理，例如，使 Enter 键在聊天客户端中触发消息发送操作，同时让用户可以按 Ctrl+Enter 键来换行。此类文本操作 [让 Flutter 本身也能够提供不同的按键设置](https://github.com/flutter/flutter/pull/75032)，从而使文本编辑行为与主机操作系统相一致，例如在 Windows 和 Linux 上使用 Ctrl+C 复制文本，而在 macOS 上使用 Cmd+C。

下面就是一个这样的例子，它覆盖了默认的向左箭头按键操作，并为退格键和删除键设置了新的操作:

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
 @override
 Widget build(BuildContext context) => MaterialApp(
       title: 'Flutter TextField Key Binding Demo',
       home: Scaffold(body: UnforgivingTextField()),
     );
}

/// A text field that clears itself if the user tries to back up or correct
/// something.
class UnforgivingTextField extends StatefulWidget {
 @override
 State<UnforgivingTextField> createState() => _UnforgivingTextFieldState();
}

class _UnforgivingTextFieldState extends State<UnforgivingTextField> {
 // The text editing controller used to clear the text field.
 late TextEditingController controller;

 @override
 void initState() {
   super.initState();
   controller = TextEditingController();
 }

 @override
 Widget build(BuildContext context) => Shortcuts(
       shortcuts: <LogicalKeySet, Intent>{
         // This overrides the left arrow key binding that the text field normally
         // has in order to move the cursor back by a character. The default is
         // created by the MaterialApp, which has a DefaultTextEditingShortcuts
         // widget in it.
         LogicalKeySet(LogicalKeyboardKey.arrowLeft): const ClearIntent(),

         // This binds the delete and backspace keys to also clear the text field.
         // You can bind any key, not just those already bound in
         // DefaultTextEditingShortcuts.
         LogicalKeySet(LogicalKeyboardKey.delete): const ClearIntent(),
         LogicalKeySet(LogicalKeyboardKey.backspace): const ClearIntent(),
       },
       child: Actions(
         actions: <Type, Action<Intent>>{
           // This binds the intent that indicates clearing a text field to the
           // action that does the clearing.
           ClearIntent: ClearAction(controller: controller),
         },
         child: Center(child: TextField(controller: controller)),
       ),
     );
}

/// An intent that is bound to ClearAction.
class ClearIntent extends Intent {
 const ClearIntent();
}

/// An action that is bound to ClearIntent that clears the TextEditingController
/// passed to it.
class ClearAction extends Action<ClearIntent> {
 ClearAction({required this.controller});

 final TextEditingController controller;

 @override
 Object? invoke(covariant ClearIntent intent) {
   controller.clear();
 }
}
```

![一个糟糕的 TextField 示例，按下左箭头键或 ESC 键会清除文本]({{site.flutter-files-cn}}posts/images/2021/05/hpCWg7.png)

一个糟糕的 TextField 示例，按下左箭头键或 ESC 键会清除文本

在这方面，我们的确还有很多工作要做，但我们将不遗余力赋予开发者对文本编辑操作的完全控制权。目标是在 Flutter 桌面版达到稳定时，最终用户将无法区分 Flutter 应用中的文本编辑功能与主机操作系统中的其他应用有什么差别。

**自动滚动行为**

我们一直致力于让 Flutter 应用的表现与各个平台上最优秀的应用如出一辙，为此，我们在这个版本中对滚动条又做了进一步优化。在滚动条的显示方式上，Android 和 iOS 将完全相同，即默认不显示滚动条。但在桌面应用中，只要内容大于容器，通常就会自动显示滚动条。这就要求你添加一个类型为 `Scrollbar` 的父级 widget。为了在移动设备和桌面设备上都实现正确的行为，此版本会在需要时自动添加一个 `Scrollbar`。

以下是一段不含 Scrollbar 的代码:

```dart
import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
 @override
 Widget build(BuildContext context) => MaterialApp(
       title: 'Automatic Scrollbars',
       home: HomePage(),
     );
}

class HomePage extends StatelessWidget {
 @override
 Widget build(BuildContext context) => Scaffold(
       body: ListView.builder(
         itemCount: 100,
         itemBuilder: (context, index) => Text('Item $index'),
       ),
     );
}
```

上述代码在桌面平台上运行时，将会显示一个滚动条:

![]({{site.flutter-files-cn}}posts/images/2021/05/t8U8U6.png)

如果你不喜欢滚动条的外观或不想让滚动条一直显示，可以设置 [`ScrollBarTheme`](https://api.flutter-io.cn/flutter/material/ThemeData/scrollbarTheme.html)。如果你不喜欢该默认行为，可以在应用层级或具体实例层级通过设置 [`ScrollBehavior`](https://api.flutter-io.cn/flutter/widgets/ScrollBehavior-class.html) 来对其进行更改。如需详细了解新的默认滚动条行为以及如何迁移代码以遵循新的最佳实践，请参阅 [Flutter 官方文档](https://docs.flutter.cn/release/breaking-changes/default-desktop-scrollbars)。

**TextSpan 上的鼠标指针**

在之前的 Flutter 版本中，你可以在任何 widget 上添加一个鼠标指针 (例如用手型指针来表示元素可供点击)。实际上，Flutter 会在大部分情况下替你添加此类鼠标指针，例如在所有按钮上添加手型鼠标指针。不过，如果你是用多个不同样式的 TextSpan 来实现一段富文本，而且其长度可能长到需要换行，那就没办法给它添加鼠标指针了，这是因为 `TextSpan` 不属于 `widget`，不能用于界定鼠标指针的视效范围。但现在不一样了！在新版本中，如果你的 `TextSpan` 具备手势识别器 (GestureRecognizer)，系统将自动为其设置鼠标指针:

```dart
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart' as urlLauncher;

void main() => runApp(App());

class App extends StatelessWidget {
 static const title = 'Flutter App';
 @override
 Widget build(BuildContext context) => MaterialApp(
       title: title,
       home: HomePage(),
     );
}

class HomePage extends StatelessWidget {
 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: Text(App.title)),
       body: Center(
         child: RichText(
           text: TextSpan(
             style: TextStyle(fontSize: 48),
             children: [
               TextSpan(
                 text: 'This is not a link, ',
                 style: TextStyle(color: Colors.black),
               ),
               TextSpan(
                 text: 'but this is',
                 style: TextStyle(color: Colors.blue),
                 recognizer: TapGestureRecognizer()
                   ..onTap = () {
                     urlLauncher.launch('https://flutter.dev');
                   },
               ),
             ],
           ),
         ),
       ),
     );
}
```

现在你可以自由使用任意换行的 TextSpan，只要其具备手势识别器，系统即会为其设置适当的鼠标指针。

![]({{site.flutter-files-cn}}posts/images/2021/05/fnraQI.png)

在此版本中，`TextSpan` 除了支持 `mouseCursor`，还支持 `onEnter` 和 `onExit`。这些改进看似细小，对用户体验的影响却大，能让 Flutter 应用提供更贴近用户预期的使用体验。

## **Flutter 2.2 中新的预览版功能**

除了适用于生产环境的新功能，Flutter 2.2 还搭载了多项新的预览版功能，包括 iOS 着色器编译性能改进、Android 延迟加载组件支持、Flutter 桌面平台更新以及 Sony 贡献的 ARM64 Linux 主机支持。欢迎你体验这些功能，并 [在遇到问题时向我们报告](http://github.com/flutter/flutter/issues)。

**iOS 着色器编译改进**

在图形渲染领域，"着色器" 指的是一个在终端用户设备可用的 GPU 上编译并运行的程序。Flutter 自诞生伊始就在底层的 Skia 图形库中使用着色器，从而在色彩、阴影、动画等方面实现高质量图形效果的同时达成可媲美原生代码的优越性能。得益于 Flutter API 的灵活性，着色器能够以 JIT 方式即时生成和编译，并与需要它们的帧工作负载同步。不过，当着色器的编译耗时超出相应帧的时间预算，就会导致用户感受到卡顿。

为了避免这类卡顿，Flutter 让你可以在训练运行期间缓存着色器，并将其打包到应用中，然后于 Flutter 引擎启动时的第一帧之前对其进行编译。这样一来，这些预先编译的着色器就不必在帧工作负载期间进行编译，也就不会造成卡顿。不过，Skia 一开始只针对 OpenGL 实现了此功能。

这就导致，我们因 Apple 废弃 OpenGL 而在 iOS 上默认启用 Metal 后端后，基准测试测得的最差帧时间数值有所增长，用户报告卡顿的情况也有所增多。经过调查，我们发现此类卡顿往往由下列因素造成: 着色器编译时间增加、Skia 为 Metal 后端生成的着色器数量增多，以及未能在多次运行之间对编译后的着色器进行缓存并因而导致应用在后续运行时仍然出现卡顿。

到目前为止，在 iOS 上杜绝此类卡顿的唯一方式就是对场景和动画进行简化，而这不是一个理想的解决方案。

为解决这个问题，我们已在 dev 渠道中发布 [Skia 针对 Metal 新增对着色器预热的支持](https://github.com/flutter/flutter/issues/79298) 这一预览版功能。Flutter 现在会通过 Skia 在第一个帧工作负载开始之前对捆绑的着色器进行编译。

![应用启动期间的预编译操作的跟踪记录]({{site.flutter-files-cn}}posts/images/2021/05/6E40Xj.png)

应用启动期间的预编译操作的跟踪记录

不过，此解决方案存在一些不足之处:

* 相比 OpenGL 后端，Skia 仍会为 Metal 后端生成更多的着色器。
* 最终将着色器编译为机器码的操作仍然与帧工作负载同步发生，但这好过在帧渲染时段内执行所有着色器生成和编译操作。
* 最终生成的机器码会在应用首次运行后得到缓存，直到设备被重新启动。

如果你希望在自己的应用中使用此新功能，可以参考
[Flutter 官方文档](https://docs.flutter.cn/perf/shader#how-to-use-sksl-warmup) 上的说明进行操作。

我们将持续改进此实现方案。在 Android 和 iOS 上，它目前有几个缺点:

* 由于捆绑了着色器，应用的部署体积更大。
* 由于需要预编译捆绑的着色器，应用启动延时更长。
* 对开发者体验可能存在负面影响。

其中，我们最为重视最后一点。我们认为开发者不应该需要执行训练运行，也不应该在应用体积和启动延时方面承担代价。因此，我们还在继续探索是否有不依赖此实现方案的其他方法来消除着色器编译卡顿以及其他类型的卡顿。我们正在与 Skia 团队携手合作，降低 Flutter 请求产生的着色器数量，并探讨在 Flutter 引擎中捆绑少量静态定义的着色器的可行性。

你可以关注 [Flutter 代码库中的相关项目](https://github.com/flutter/flutter/projects/188) 了解相关进展。

**Android 延迟加载组件: 可下载的 AOT 代码和资源**

在 Android 平台上，此版本利用 Dart 的分拆式 AOT 编译功能来 [让 Flutter 应用能够在运行时下载内含预先编译的代码和资源的模块](https://github.com/flutter/flutter/pull/76192)。我们将这种可安装的分拆模块称为 "延迟加载组件"。由于可在需要时才下载代码和资源，应用的初始安装体积显著缩小。例如，我们实现了一个特殊版本的 Flutter Gallery 应用，将其中所有案例和 demo 都设为延迟加载，从而将初始安装体积缩减了 46%。

![在 Flutter Gallery 应用中下载 Crane 案例]({{site.flutter-files-cn}}posts/images/2021/05/TJQbmZ.gif)

在 Flutter Gallery 应用中下载 Crane 案例

如果在构建应用时启用延迟加载组件，Dart 会将那些单独用 `deferred` 关键字导入的代码编译到独立的共享库中，并将这些库与相关资源一起打包为延迟加载组件。

该功能还处于早期预览阶段，目前只支持 Android。你可以在 Flutter 官方文档上新的 [延迟加载组件](https://docs.flutter.cn/perf/deferred-components) 页面中了解如何实现此类组件。此页面还链接到了 Flutter wiki 上的一个页面，后者详细介绍了此功能的工作原理。如果发现问题，请通过 [Flutter 问题跟踪器](http://github.com/flutter/flutter/issues) 告知我们。

**Flutter Windows UWP alpha 版**

此版本 Flutter 的另一项更新针对的是桌面平台: 对 Windows UWP 的支持现已在 dev 渠道中进入 alpha 版阶段 (2.2 稳定版之后)。借助 UWP，你的 Flutter 应用将可以覆盖 Xbox 等无法运行标准 Windows 应用的设备。如需试用此功能，请先 [满足 UWP 前置条件](https://flutter.cn/desktop#windows-uwp)，然后切换到 dev 渠道并启用 UWP 支持。

```console
$ flutter channel dev
$ flutter upgrade
$ flutter config — enable-windows-uwp-desktop
```

启用后，创建的 Flutter 应用会包含一个新的 `winuwp` 文件夹，以便你在 UWP 容器中构建和运行你的应用:

```console
$ flutter create uwp_fun
$ cd uwp_fun
$ flutter pub get
$ flutter run -d winuwp
```

由于构建的是在 Windows 沙盒环境中运行的 Windows UWP 应用，你需要在开发期间对应用的防火墙进行 localhost 穿透设置，以实现热重载和调试器断点等功能。为此，你可以按照 [Flutter 桌面文档页面](http://flutter.cn/desktop/#windows-uwp) 上的说明使用 *checknetisolation* 进行操作。完成相关操作后，你就可以在 Windows 上以 UWP 应用的形式运行你喜爱的 Flutter 应用了。

![在 Windows UWP 容器中运行你喜爱的 Flutter 应用]({{site.flutter-files-cn}}posts/images/2021/05/KxCQcf.png)

在 Windows UWP 容器中运行你喜爱的 Flutter 应用

当然，你也可以运行一些更丰富有趣的 UWP 应用，例如这个 [视频]({{site.flutter-files-cn}}posts/images/2021/05/q5hepO.mp4) 中在 Xbox 上运行的 Flutter 应用。

<video controls width="640px" height="480px" src="{{site.flutter-files-cn}}posts/images/2021/05/q5hepO.mp4"></video>

我们要特此致谢 [clarkezone](https://github.com/clarkezone)，从我加入 Flutter 团队时起，他就一直投身于实现这项功能。如需详细了解 Windows UWP alpha 版支持，请参阅 [官方文档](http://flutter.cn/desktop/#windows-uwp)。

**Sony 贡献的 ARM64 Linux 主机支持**

这项杰出贡献来自于 Flutter 社区的 Sony 软件工程师 [HidenoriMatsubayashi](https://github.com/HidenoriMatsubayashi)。他提交的 [ARM64 Linux 目标支持](https://github.com/flutter/flutter/pull/61221) 这条 PR 让你可以在 ARM64 Linux 机器上构建和运行 Flutter 应用。

![在 ARM64 Linux 机器上运行你喜爱的 Flutter 应用]({{site.flutter-files-cn}}posts/images/2021/05/tpaxju.png)

在 ARM64 Linux 机器上运行你喜爱的 Flutter 应用

我们很高兴看到 Flutter 社区将 Flutter 移植到超乎 Google 团队想象的平台。HidenoriMatsubayashi，感激不尽！

## **Flutter 生态系统和工具更新**

Flutter 引擎和框架只是整体体验的一部分，package 生态系统和工具方面的更新对 Flutter 开发者的体验来说同样重要。我们在这个领域也有几项很棒的更新与你分享。

在生态系统端，我们发布了多个 Flutter Favorite package，并更新了 Flutter 的 Firebase 支持插件集 FlutterFire。FlutterFire 现在还支持新的 Firebase App Check 预览版，让 Flutter 开发者自第一天起就可受益于这个产品。

在工具端，Flutter DevTools 做了多项更新以方便你优化应用的内存使用方式，还为 Provider package 提供了一个标签页。适用于 VS Code 和 Android Studio/IntelliJ 的 IDE 插件也有重大更新。此外，如果你是 Flutter 相关内容的创作者，我们还提供了一种全新方式让你将 DartPad 集成到你的创作流程中。

最后，Flutter 现在有了一个新的低代码 (low-code) 应用设计和构建工具，名为 FlutterFlow。该工具在 web 上运行，本身也是使用 Flutter 构建而成。

**Flutter Favorite 更新**

在此版本中，得益于 Flutter 生态系统委员会 (FEC) 的辛勤工作，我们增加了 24 个 Flutter Favorite 认证 package，堪称有史以来步伐最大的一次扩张。这些新出炉的 Flutter Favorites package 包括:

* [**FlutterFire package**](http://firebase.flutter.dev) **(正式版)** : `cloud_firestore`、`cloud_functions`、`firebase_auth`、`firebase_core`、`firebase_crashlytics`、`firebase_messaging` 和 `firebase_storage` 
* [**Flutter Community "plus"**](http://plus.fluttercommunity.dev) package: `android_alarm_manager_plus`、`android_intent_plus`、`battery_plus`、`connectivity_plus`、`device_info_plus`、`network_info_plus`、`package_info_plus`、`sensors_plus` 和 `share_plus`
* [**googleapis**](https://pub.flutter-io.cn/packages/googleapis) **package**
* [**win32** **package**](https://pub.flutter-io.cn/packages/win32)
* [**Intl**](https://pub.flutter-io.cn/packages/intl) 和 [**characters**](https://pub.flutter-io.cn/packages/characters) **package**
* [**Sentry**](https://pub.flutter-io.cn/packages/sentry_flutter) **package**: sentry 和 sentry_flutter 
* [**infinite_scroll_pagination**](https://pub.flutter-io.cn/packages/infinite_scroll_pagination) 和 [**flutter_native_splash**](https://pub.flutter-io.cn/packages/flutter_native_splash) **package**

所有这些 package 都已支持空 (null) 安全特性，并尽可能支持 Android、iOS 和 web 平台。其中有一些例外，例如 `firebase_crashlytics` 没有适用于 web 平台的底层 SDK，而 `android_alarm_manager_plus` 则是专为 Android 平台设计。

Flutter Community "plus" package 在 Flutter 团队官方 package 的基础上提供了更多特性。例如，Google 的 Flutter 团队提供的 [battery package](https://pub.flutter-io.cn/packages/battery) 可以追溯到初版 Flutter 发布之前，它现在具备空安全特性，但只支持 Android 和 iOS 平台。与此相对，[Flutter Community battery_plus package](https://pub.flutter-io.cn/packages/battery_plus) 则支持全部 6 个 Flutter 平台，包括 web、Windows、macOS 和 Linux。该套件内置的全部 9 个 "plus" package 都获得了 Flutter Favorite 认可，这是标志着整个 Flutter 社区迈向成熟的重大一步。Flutter 项目已经远远不止是 Google 工程团队独力奋战。你应尽快将你的代码迁移至 "plus" package。在未来几周中，Google 的相关 package 将会更新，建议你进行迁移。

googleapis 插件为 185 个 [Google API](https://developers.google.cn/api-client-library) 提供了自动生成的 Dart 封装，供你在客户端或服务器端的 Dart 应用 (包括你的 Flutter 应用) 中使用。如需进一步了解此 package，你可以观看其作者关于使用 Google API 为你的 Flutter 应用赋能的 [I/O 大会演讲](https://events.google.com/io/session/7f706716-0de0-4a9e-bad3-581afe8ef360)。

win32 package 堪称一件工程杰作，它使用 [Dart FFI](https://dart.cn/guides/libraries/c-interop) 封装了大部分常用 Win32 API 接口，让 Dart 代码无需依赖 C 编译器或 Windows SDK 即可使用这些 API。随着 Flutter 在 Windows 平台上越来越受关注，win32 package 成为了许多热门插件的关键依赖项，其中包括最热门 Flutter package 之一的 [path_provider](https://pub.flutter-io.cn/packages/path_provider)。为了挑战极限，其作者 [timsneath](https://github.com/timsneath) 创下了一些惊人壮举，例如使用纯 Win32 和纯 Dart 来实现 [notepad](https://github.com/timsneath/win32/tree/main/example/notepad) (记事本)、[snake](https://github.com/timsneath/win32/blob/main/example/snake.dart) (贪吃蛇) 和 [tetris](https://github.com/timsneath/win32/tree/main/example/tetris) (俄罗斯方块)。

![仅使用 Dart FFI 和 Win32 接口实现的在 Windows 平台运行的俄罗斯方块游戏]({{site.flutter-files-cn}}posts/images/2021/05/86UACo.png)

仅使用 Dart FFI 和 Win32 接口实现的在 Windows 平台运行的俄罗斯方块游戏

如果你有在 Windows 上进行任何 Dart 或 Flutter 开发，win32 package 值得你一探究竟。

**FlutterFire 更新和 Firebase App Check**

作为 Flutter 的 Firebase 支持插件集，FlutterFire 已跻身最热门 Flutter 插件之列。为了让该插件集的正式版能够与 Flutter 2 一道发布并在随后对其持续进行改进，其主要贡献者 Invertase 团队做了许多出色的工作。自 FlutterFire 的首个正式版发布之后，Invertase 将未解决问题的数量降低了 79%，并将待处理 PR 的数量降低了 88%。他们不仅在正式版插件的开发上成绩斐然，还成功将所有 Beta 版插件都支持了空安全机制，同时让这些插件在你可能遇到的各种核心上都能正常构建和运行。

Invertase 还在继续为 FlutterFire 插件增添更多功能，包括在新版 Flutter 中对 Cloud Firebase 集成做的多项更新:

* 用于读写数据的 [Typesafe API](https://firebase.flutter.dev/docs/firestore/usage/#typing-collectionreference-and-documentreference)
* 支持 [Firebase Local Emulator Suite](https://firebase.flutter.dev/docs/storage/usage/#emulator-usage)
* 利用 [data bundles](https://firebase.flutter.dev/docs/firestore/usage#data-bundles) 优化你的数据查询

FlutterFire 现在还支持 Firebase 新推出的 beta 版产品 [Firebase App Check](https://firebase.google.cn/docs/app-check)。Firebase App Check 可帮助你保护 Cloud Storage 等后端资源，使其不受付费欺诈或钓鱼攻击等滥用行为的侵害。有了 App Check，运行你的 Flutter 应用的设备会通过一个应用身份证明提供方来证明应用实例的正当身份，并可检查应用是否运行在未受篡改的可信设备上。一旦你启用 App Check，相应证明信息会附加到你的应用向 Firebase 后端资源发出的每一个请求中。要了解详情，请参阅 [FlutterFire App Check 文档](https://firebase.flutter.dev/docs/app-check/overview)。

**Flutter DevTools 更新**

此版本的 Flutter DevTools 带来了多项重大更新，包括内存跟踪方面的两项改进和一个 Provider 插件专属的新标签页。

内存跟踪方面的第一项改进: 跟踪对象的内存分配位置。这有助于找出导致内存泄漏的代码。

![Flutter DevTools 内存标签页分配栈轨迹]({{site.flutter-files-cn}}posts/images/2021/05/bi1jDH.png)

Flutter DevTools 内存标签页分配栈轨迹

第二项改进: 向内存时间轴中注入自定义信息。这让你可以根据应用的具体情况添加标注，例如标出内存密集型工作的开始点和结束点，以验证是否适当地执行了清理。

![Flutter DevTools 时间轴标签页自定义内存事件]({{site.flutter-files-cn}}posts/images/2021/05/xQYYra.png)

Flutter DevTools 时间轴标签页自定义内存事件

随着 Flutter 应用的体积逐步增长，我们将继续努力为 Flutter 开发者提供所需的工具，助其跟踪和修复内存泄漏和其他各种运行时问题。

你需要排查的问题并不仅仅是那些与 Flutter 框架相关的运行时问题，有时还有与所依赖 package 相关的问题。随着 pub.dev 上的 Flutter 兼容 package 数量突破 15,000 大关，你的应用使用的 package 数量也很可能随之增长。有鉴于此，Flutter DevTools 中新加入了一个实验性的 **Provider** 标签页，由 [provider package](http://pub.flutter-io.cn/packages/provider) 本身及其他很多出色软件的开发者 [Remi Roussel](https://github.com/rrousselGit) 倾力打造。如果你运行的是最新版 Flutter，在你对一个包含 provider 插件的 Flutter 应用进行调试时，**Provider** 标签页就会自动显示。

![实战演示: Flutter DevTools Provider 标签页]({{site.flutter-files-cn}}posts/images/2021/05/Q04qlm.gif)

实战演示: Flutter DevTools Provider 标签页

Provider 标签页会向你展示每个 provider 的相关数据，并会实时反映你在应用运行过程中做出的更改。很棒吧？不仅如此，它还可以让你直接更改这些数据，从而对应用的边角案例进行测试。太赞了！

在协力 Remi 开发此标签页的过程中，我们也学到了一些宝贵经验，知道了该如何更好地为具有类似需求的 package 作者服务。你可以了解 [Remi 是如何构建出 Provider 标签页的](https://invertase.io/blog/how-to-flutter-devtool-plugin)，还可以通过 [Flutter DevTools](https://docs.google.com/document/d/1BWX8YQ962Vsx-EUDuDHRG7RX94fJlZSDRu299YRwasE/) 插件提案了解我们当前的改进思路。欢迎向我们提供反馈；同时，如果你在 Flutter DevTools 新增更多标签页方面也有自己的想法，我们也很期待听到你的高见。

上述改进只是此版本 Flutter DevTools 众多改进中的几项。如需完整列表，请查看下列公告:

* [Flutter DevTools 2.1 版本说明](https://groups.google.com/g/flutter-announce/c/tCreMfJaJFU/m/38p1BBeiCAAJ)
* [Flutter DevTools 2.2.1 版本说明](https://groups.google.com/g/flutter-announce/c/t8opLnUyiFQ/m/dJth-jKxAAAJ)
* [Flutter DevTools 2.2.3 版本说明](https://groups.google.com/g/flutter-announce/c/t8opLnUyiFQ/m/YX5Ds_q0AgAJ)

**IDE 插件更新**

在此版本中，针对 Flutter 的 Visual Studio Code 和 IntelliJ/Android Studio IDE 扩展也得到了更新。例如，Visual Studio Code 扩展现在支持两项额外的 Dart 代码重构: 内联函数和内联本地变量。

![实战演示: 新的 "内联函数" Dart 重构]({{site.flutter-files-cn}}posts/images/2021/05/bBJcfx.gif)

实战演示: 新的 "内联函数" Dart 重构

在 Android Studio/IntelliJ 扩展中，我们新增了一个在控制台中输出所有堆栈轨迹的选项。

![你现在可以输出所有堆栈轨迹，而不仅限于第一条]({{site.flutter-files-cn}}posts/images/2021/05/KKLGup.png)

你现在可以输出所有堆栈轨迹，而不仅限于第一条

如果项目中某个问题的根源是在另一个 package，以前相关轨迹不会纳入到输出中，这项新功能就可以派上大用场。但随之而来的一个问题是，该如何让轨迹信息更易于梳理解读？我们已经有了一些想法，欢迎关注后续相关改动。

如需此版本中 IDE 扩展的完整变更列表，请查看下列公告:

* [VS Code 扩展 v3.21](https://groups.google.com/g/flutter-announce/c/gNtKp9c1glU/m/SZYTuwcQBwAJ)
* [VS Code 扩展 v3.22](https://groups.google.com/g/flutter-announce/c/1XR7baYZOVI/m/y6MGYrGhAAAJ)
* [Flutter IntelliJ 插件 M55 版本](https://groups.google.com/g/flutter-announce/c/tYwFDPAtLu0/m/FrsntcNNBwAJ)
* [Flutter IntelliJ 插件 M56 版本](https://groups.google.com/g/flutter-announce/c/EkgiAO4p3UM/m/P32ZXXKfAAAJ)

**DartPad 随堂实践**

为了确保 Flutter 开发者社区蓬勃发展的同时让相关文档也能跟上脚步，Dart 和 Flutter 团队始终在想方设法改进和拓展相关培训内容的制作方法。在此版本中，我们为 DartPad 添加了一个新的分步式界面，让开发者在学习讲师主导的课程/讲座时可以方便地随堂动手实践。

![实战演示: DartPad 课程/讲座随堂实践]({{site.flutter-files-cn}}posts/images/2021/05/rOt9q7.png)

实战演示: DartPad 课程/讲座随堂实践

通过将实践指引直接加入到 DartPad 中，我们在今年的 I/O 大会实现了 [引导式讲座体验](https://events.google.com/io/program/content?4=topic_flutter&5=type_workshop)。不过，此功能并非专为我们自己的需求而开发，如果你要在自己的 Dart 或 Flutter 课程/讲座中使用该工具，可以按 [DartPad 培训内容创作指南](https://github.com/dart-lang/dart-pad/wiki/Workshop-Authoring-Guide) 中的说明操作。请勿将此功能与 [在 Gist 中通过 DartPad 分享代码](https://github.com/dart-lang/dart-pad/wiki/Sharing-Guide) 和 [在你的网站上嵌入 DartPad](https://github.com/dart-lang/dart-pad/wiki/Embedding-Guide) 这两项功能相混淆，后两者已经推出了一段时间。

我们希望所有 Dart 和 Flutter 内容作者都能够为其受众带去丰富的互动式体验。欢迎试用并 [向我们提供反馈](https://github.com/dart-lang/dart-pad/issues)。

**社区聚焦: FlutterFlow**

FlutterFlow 是一个 "低代码" (low code) 应用设计和开发工具，用于在浏览器中构建应用。它提供了一个 "所见即所得" 环境，让你可根据实际 Firebase 数据来设计横跨多个页面的应用布局。此工具的目标是让你能够轻松执行大部分常见操作，并尽量减少你自己需要编写的代码量。实际上，在一次演示中，演示者不到一个小时就使用此工具构建出了一个包含多个页面、可帮助用户游览大都会艺术博物馆的完整移动应用，整个过程没有写一行代码。你可以在 YouTube 上观看整个过程的 [视频记录]({{site.flutter-files-cn}}posts/images/2021/05/ilIETB.mp4)。

<video controls width="640px" height="480px" src="{{site.flutter-files-cn}}posts/images/2021/05/ilIETB.mp4"></video>

## **对兼容性有影响的重大变更**

一如既往，我们会尽量避免进行影响兼容性的重大变更。在此版本中，此类变更仅限于移除下面这些已废弃的组件:

* [73750](https://github.com/flutter/flutter/pull/73750) 移除已废弃的 BinaryMessages
* [73751](https://github.com/flutter/flutter/pull/73751) 移除已废弃的 TypeMatcher 类

你可以 [在 flutter.cn 上找到这些变更对应的迁移指南](https://docs.flutter.cn/release/breaking-changes/1-22-deprecations).

## **结语**

Google Flutter 团队全体同仁谨此向大家致以诚挚谢意！我们要感谢 Flutter 社区的每一个人，Flutter 取得的成绩离不开大家的每一份贡献。如今，Play 商店中有超过八分之一的新应用是采用 Flutter 构建而成，仅在 Play 商店就收录了多达 20 万款 Flutter 应用。Flutter 的迅猛发展势头出人意表。世界各地大大小小的应用团队都使用 Flutter 进行开发，为诸多平台上的用户打造优质体验。谢谢大家选择 Flutter！

![]({{site.flutter-files-cn}}posts/images/2021/05/KTpWHI.png)

最后，以免你错过，不要忘了体验下在本次 I/O 大会推出的 [I/O Photo Booth web 应用](https://photobooth.flutter.cn/#/)，它是由 Flutter 和 Firebase 构建而成的 web 应用，让你可以和 Dash 合拍萌萌的大头照。我们还 [开放了其源代码](https://github.com/flutter/photobooth)，方便你进一步了解 Flutter web 最佳实践、相机插件 web 支持以及如何使用 Cloud Functions 函数来生成自定义社交内容。机不可失，赶紧一睹为快吧！
