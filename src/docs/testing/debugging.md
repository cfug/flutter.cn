---
title: Debugging Flutter apps
title: 调试 Flutter 应用
---

There are a wide variety of tools and features to help debug Flutter
applications.

有很多工具和特性可以帮助调试 Flutter 应用程序。

{{site.alert.note}}

  If your app's UI isn't running as smoothly as you expect,
  check out [Flutter Performance Profiling](ui-performance).
  
  如果你的应用程序的 UI 运行得不如你预期的那么流畅，看看 [Flutter Performance Profiling](ui-performance).
{{site.alert.end}}

## The Dart Analyzer

## Dart 分析器

Before running your applications, test your code with `flutter analyze`. This
tool (which is a wrapper around the `dartanalyzer` tool) analyzes your code
and helps you find possible mistakes. If you're using a
[Flutter enabled IDE/editor](/docs/get-started/editor/),
this is already happening for you.

在运行应用程序前，请运行 `flutter analyze` 来测试你的代码。这个工具（它是 `dartanalyzer` 工具的一个包装）将分析
你的代码并帮助你发现可能的错误。如果你正在使用 [Flutter enabled IDE/editor](/docs/get-started/editor/)，那么它应该已经启动了。

The Dart analyzer makes heavy use of type annotations that you put in
your code to help track problems down. You are encouraged to use them
everywhere (avoiding `var`, untyped arguments, untyped list literals,
etc) as this is the quickest and least painful way of tracking down
problems.

Dart分析器大量使用了代码中的类型注释来帮助追踪问题。我们鼓励您在任何地方使用它们（避免var、无类型的参数、无类型的列表文字等），因为这是最快和最不痛苦的追踪问题方式。

## Dart Observatory (statement-level single-stepping debugger and profiler)

## Dart Observatory (语句级的单步调试和分析器)

If you started your application using `flutter run`, then,
while it is running, you can open the Web page at the Observatory URL printed
to the console (e.g., `Observatory listening on http://127.0.0.1:8100/`), to
connect to your application directly with a statement-level single-stepping
debugger. If you're using a [Flutter enabled IDE/editor](/docs/get-started/editor/),
you can also debug your application using its built-in debugger.

如果您是使用 `flutter run` 启动应用程序，那么当它运行时，您可以根据控制台打印出来的 Observatory URL 打开一个
Web页面（例如，`Observatory listening on http://127.0.0.1:8100/`）， 直接使用语句级单步调试器连接到您的应用程序。
如果您使用的是 [Flutter enabled IDE/editor](/docs/get-started/editor/)，则还可以使用其内置的调试器来调试您的应用程序。

Observatory also supports profiling, examining the heap, etc. For more
information on Observatory, see
[Observatory's documentation](https://dart-lang.github.io/observatory/).

Observatory 同时支持分析、检查堆等。有关 Observatory 的更多信息请参考 [Observatory's documentation](https://dart-lang.github.io/observatory/)。

If you use Observatory for profiling, make sure to run your
application in profile mode, by passing `--profile` to the `flutter
run` command. Otherwise, the main thing that appears on your
profile is the debug asserts verifying the framework's various
invariants (see "Debug mode assertions" below).

如果您使用 Observatory 进行分析，请确保通过 `--profile` 选项来运行 `flutter
run` 命令来运行应用程序。 否则，你的分析中将出现的主要事情就是调试断言，以验证框架的各种不变量（请参阅下面的“调试模式断言”）。

### `debugger()` statement

### `debugger()` 语句

When using the Dart Observatory (or another Dart debugger integrated into
a Flutter enabled IDE/editor), you can insert programmatic breakpoints
using the `debugger()` statement. To use this, you have to put `import
'dart:developer';` at the top of the relevant file.

当使用 Dart Observatory（或另一个已经集成到支持　Flutter 的IDE/编辑器中的调试器）时，可以使用 `debugger()` 语句。
使用 `debugger()` 语句， 你可以插入程序断点。要使用这个，你必须添加  `import
'dart:developer';` 到相关文件顶部。

The `debugger()` statement takes an optional `when` argument which you
can specify to only break when a certain condition is true, as in:

`debugger()` 语句采用一个可选 `when` 参数，您可以指定只有在特定条件为真时中断，如下所示：

<!-- import 'dart:developer'; -->
<!-- skip -->
```dart
void someFunction(double offset) {
  debugger(when: offset > 30.0);
  // ...
}
```

## `print` and `debugPrint` with `flutter logs`

The Dart `print()` function outputs to the system console, which
you can view using `flutter logs` (which is basically a wrapper around
`adb logcat`).

Dart 的 `print()` 功能将输出到系统控制台，您可以使用 `flutter logs` 查看它（基本上是一个 `adb logcat` 的包装）。

If you output too much at once, then Android sometimes discards some
log lines. To avoid this, you can use
[`debugPrint()`]({{site.api}}/flutter/foundation/debugPrint.html),
from Flutter's `foundation` library. This is a wrapper around `print` which throttles
the output to a level that avoids being dropped by Android's kernel.

如果你一次输出太多，那么 Android 有时会丢弃一些日志行。为了避免这种情况，您可以使用 Flutter的 `foundation` 库中的 [`debugPrint()`]({{site.api}}/flutter/foundation/debugPrint.html) 。这是一个 `print` 的封装，它将输出限制在一个避免被Android内核丢弃的级别。

Many classes in the Flutter framework have useful `toString`
implementations. By convention, these output a single line usually
including the `runtimeType` of the object, typically in the form
`ClassName(more information about this instance...)`. Some classes
that are used in trees also have `toStringDeep`, which returns a
multiline description of the entire subtree from that point. Some
classes that have particularly ~~verbose~~ helpful `toString`
implementations have a corresponding `toStringShort` which returns
only the type or some other very brief (one or two word) description
of the object.

Flutter 框架中的许多类都有 `toString` 实现。按照惯例，这些输出通常包括对象的 `runtimeType` 单行输出，比较典型的是以 `ClassName(more information about this instance...)` 这种方式。 树中使用的一些类也具有 `toStringDeep`，从该点返回整个子树的多行描述。已一些具有特别详细信息的 `toString` 实现的类会实现一个 `toStringShort`，它只返回对象的类型或其他非常简短的（一个或两个单词）描述。

## Debug mode assertions

## 调试模式断言

During development, you are highly encouraged to use Flutter's "debug"
mode. This is the default if you use `flutter run` or the bug icon
in Android Studio. Some tools support assert statements through the
command-line flag `--enable-asserts`.
In this mode, Dart assert statements are enabled, and the Flutter
framework evaluates the argument to each assert statement encountered during
execution, throwing an exception if the result is false. This allows
developers to enable or disable invariant checking, such that the associated
performance cost is only paid during debugging sessions.

在开发过程中，强烈建议您使用 Flutter 的 "debug" 模式。 如果您使用 `flutter run` 或 在 Android Studio 中点击 bug 图标运行程序，这是默认设置。一些工具通过命令行 `--enable-asserts` 标志支持断言。在这种模式下，Dart assert 语句被启用，并且 Flutter 框架使用它来评估运行时遇到的每个断言语句，如果结果为false则抛出异常。这允许开发者启用或禁用不变量检查，这样只在调试期间才会有一些性能成本。

When an invariant is violated, it's reported to the console, with
some context information to help track down the source of the
problem.

当一个不可变的规则被违反时，它被报告给控制台，并带有一些上下文信息来帮助追踪问题的根源。

To turn off debug mode, and use release mode, run your application
using `flutter run --release`. This also turns off the Observatory
debugger. An in-between mode that turns off all the debugging aids
_except_ the Observatory, known as "profile mode", is available also,
using `--profile` instead of `--release`.

要关闭调试模式并使用发布模式，请使用 `flutter run --release` 运行您的应用程序。 这也关闭了 Observatory 调试器。一个中间模式可以关闭除 Observatory 之外所有调试辅助工具的，称为 "profile mode" ，用 `--profile` 替代 `--release` 即可。

For more information, see [Flutter's modes](/docs/testing/build-modes).

更多的信息，请参阅 [Flutter's modes](/docs/testing/build-modes)。

## Debugging application layers

## 调试应用程序层

Each layer of the Flutter framework provides a function to dump its
current state or events to the console (using `debugPrint`).

Flutter框架的每一层都提供了将其当前状态或事件 dump 到控制台（使用 `debugPrint`）的功能。

### Widget layer

### Widget 层

To dump the state of the Widgets library, call
[`debugDumpApp()`]({{site.api}}/flutter/widgets/debugDumpApp.html).
You can call this more or less any time that the application is not in
the middle of running a build phase (i.e. anywhere not inside a
`build()` method), so long as the application has built at least once
(i.e. any time after calling `runApp()`).

要 dump Widgets库的状态，请调用 [`debugDumpApp()`]({{site.api}}/flutter/widgets/debugDumpApp.html)。 只要应用程序已经构建了至少一次（即在调用 `runApp()` 之后的任何时间），您可以在应用程序未处于构建阶段（即，不在 `build()` 方法内调用 ）的任何时间调用此方法。

For example, this application:

例如, 这个应用程序:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: AppHome(),
    ),
  );
}

class AppHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: FlatButton(
          onPressed: () {
            debugDumpApp();
          },
          child: Text('Dump App'),
        ),
      ),
    );
  }
}
```

...outputs something like this (the precise details vary by
the version of the framework, the size of the device, and so forth):

…会输出这样的内容（精确的细节会根据框架的版本、设备的大小等等而变化）：

```
I/flutter ( 6559): WidgetsFlutterBinding - CHECKED MODE
I/flutter ( 6559): RenderObjectToWidgetAdapter<RenderBox>([GlobalObjectKey RenderView(497039273)]; renderObject: RenderView)
I/flutter ( 6559): └MaterialApp(state: _MaterialAppState(1009803148))
I/flutter ( 6559):  └ScrollConfiguration()
I/flutter ( 6559):   └AnimatedTheme(duration: 200ms; state: _AnimatedThemeState(543295893; ticker inactive; ThemeDataTween(ThemeData(Brightness.light Color(0xff2196f3) etc...) → null)))
I/flutter ( 6559):    └Theme(ThemeData(Brightness.light Color(0xff2196f3) etc...))
I/flutter ( 6559):     └WidgetsApp([GlobalObjectKey _MaterialAppState(1009803148)]; state: _WidgetsAppState(552902158))
I/flutter ( 6559):      └CheckedModeBanner()
I/flutter ( 6559):       └Banner()
I/flutter ( 6559):        └CustomPaint(renderObject: RenderCustomPaint)
I/flutter ( 6559):         └DefaultTextStyle(inherit: true; color: Color(0xd0ff0000); family: "monospace"; size: 48.0; weight: 900; decoration: double Color(0xffffff00) TextDecoration.underline)
I/flutter ( 6559):          └MediaQuery(MediaQueryData(size: Size(411.4, 683.4), devicePixelRatio: 2.625, textScaleFactor: 1.0, padding: EdgeInsets(0.0, 24.0, 0.0, 0.0)))
I/flutter ( 6559):           └LocaleQuery(null)
I/flutter ( 6559):            └Title(color: Color(0xff2196f3))
I/flutter ( 6559):             └Navigator([GlobalObjectKey<NavigatorState> _WidgetsAppState(552902158)]; state: NavigatorState(240327618; tracking 1 ticker))
I/flutter ( 6559):              └Listener(listeners: down, up, cancel; behavior: defer-to-child; renderObject: RenderPointerListener)
I/flutter ( 6559):               └AbsorbPointer(renderObject: RenderAbsorbPointer)
I/flutter ( 6559):                └Focus([GlobalKey 489139594]; state: _FocusState(739584448))
I/flutter ( 6559):                 └Semantics(container: true; renderObject: RenderSemanticsAnnotations)
I/flutter ( 6559):                  └_FocusScope(this scope has focus; focused subscope: [GlobalObjectKey MaterialPageRoute<void>(875520219)])
I/flutter ( 6559):                   └Overlay([GlobalKey 199833992]; state: OverlayState(619367313; entries: [OverlayEntry@248818791(opaque: false; maintainState: false), OverlayEntry@837336156(opaque: false; maintainState: true)]))
I/flutter ( 6559):                    └_Theatre(renderObject: _RenderTheatre)
I/flutter ( 6559):                     └Stack(renderObject: RenderStack)
I/flutter ( 6559):                      ├_OverlayEntry([GlobalKey 612888877]; state: _OverlayEntryState(739137453))
I/flutter ( 6559):                      │└IgnorePointer(ignoring: false; renderObject: RenderIgnorePointer)
I/flutter ( 6559):                      │ └ModalBarrier()
I/flutter ( 6559):                      │  └Semantics(container: true; renderObject: RenderSemanticsAnnotations)
I/flutter ( 6559):                      │   └GestureDetector()
I/flutter ( 6559):                      │    └RawGestureDetector(state: RawGestureDetectorState(39068508; gestures: tap; behavior: opaque))
I/flutter ( 6559):                      │     └_GestureSemantics(renderObject: RenderSemanticsGestureHandler)
I/flutter ( 6559):                      │      └Listener(listeners: down; behavior: opaque; renderObject: RenderPointerListener)
I/flutter ( 6559):                      │       └ConstrainedBox(BoxConstraints(biggest); renderObject: RenderConstrainedBox)
I/flutter ( 6559):                      └_OverlayEntry([GlobalKey 727622716]; state: _OverlayEntryState(279971240))
I/flutter ( 6559):                       └_ModalScope([GlobalKey 816151164]; state: _ModalScopeState(875510645))
I/flutter ( 6559):                        └Focus([GlobalObjectKey MaterialPageRoute<void>(875520219)]; state: _FocusState(331487674))
I/flutter ( 6559):                         └Semantics(container: true; renderObject: RenderSemanticsAnnotations)
I/flutter ( 6559):                          └_FocusScope(this scope has focus)
I/flutter ( 6559):                           └Offstage(offstage: false; renderObject: RenderOffstage)
I/flutter ( 6559):                            └IgnorePointer(ignoring: false; renderObject: RenderIgnorePointer)
I/flutter ( 6559):                             └_MountainViewPageTransition(animation: AnimationController(⏭ 1.000; paused; for MaterialPageRoute<void>(/))➩ProxyAnimation➩Cubic(0.40, 0.00, 0.20, 1.00)➩Tween<Offset>(Offset(0.0, 1.0) → Offset(0.0, 0.0))➩Offset(0.0, 0.0); state: _AnimatedState(552160732))
I/flutter ( 6559):                              └SlideTransition(animation: AnimationController(⏭ 1.000; paused; for MaterialPageRoute<void>(/))➩ProxyAnimation➩Cubic(0.40, 0.00, 0.20, 1.00)➩Tween<Offset>(Offset(0.0, 1.0) → Offset(0.0, 0.0))➩Offset(0.0, 0.0); state: _AnimatedState(714726495))
I/flutter ( 6559):                               └FractionalTranslation(renderObject: RenderFractionalTranslation)
I/flutter ( 6559):                                └RepaintBoundary(renderObject: RenderRepaintBoundary)
I/flutter ( 6559):                                 └PageStorage([GlobalKey 619728754])
I/flutter ( 6559):                                  └_ModalScopeStatus(active)
I/flutter ( 6559):                                   └AppHome()
I/flutter ( 6559):                                    └Material(MaterialType.canvas; elevation: 0; state: _MaterialState(780114997))
I/flutter ( 6559):                                     └AnimatedContainer(duration: 200ms; has background; state: _AnimatedContainerState(616063822; ticker inactive; has background))
I/flutter ( 6559):                                      └Container(bg: BoxDecoration())
I/flutter ( 6559):                                       └DecoratedBox(renderObject: RenderDecoratedBox)
I/flutter ( 6559):                                        └Container(bg: BoxDecoration(backgroundColor: Color(0xfffafafa)))
I/flutter ( 6559):                                         └DecoratedBox(renderObject: RenderDecoratedBox)
I/flutter ( 6559):                                          └NotificationListener<LayoutChangedNotification>()
I/flutter ( 6559):                                           └_InkFeature([GlobalKey ink renderer]; renderObject: _RenderInkFeatures)
I/flutter ( 6559):                                            └AnimatedDefaultTextStyle(duration: 200ms; inherit: false; color: Color(0xdd000000); family: "Roboto"; size: 14.0; weight: 400; baseline: alphabetic; state: _AnimatedDefaultTextStyleState(427742350; ticker inactive))
I/flutter ( 6559):                                             └DefaultTextStyle(inherit: false; color: Color(0xdd000000); family: "Roboto"; size: 14.0; weight: 400; baseline: alphabetic)
I/flutter ( 6559):                                              └Center(alignment: Alignment.center; renderObject: RenderPositionedBox)
I/flutter ( 6559):                                               └FlatButton()
I/flutter ( 6559):                                                └MaterialButton(state: _MaterialButtonState(398724090))
I/flutter ( 6559):                                                 └ConstrainedBox(BoxConstraints(88.0<=w<=Infinity, h=36.0); renderObject: RenderConstrainedBox relayoutBoundary=up1)
I/flutter ( 6559):                                                  └AnimatedDefaultTextStyle(duration: 200ms; inherit: false; color: Color(0xdd000000); family: "Roboto"; size: 14.0; weight: 500; baseline: alphabetic; state: _AnimatedDefaultTextStyleState(315134664; ticker inactive))
I/flutter ( 6559):                                                   └DefaultTextStyle(inherit: false; color: Color(0xdd000000); family: "Roboto"; size: 14.0; weight: 500; baseline: alphabetic)
I/flutter ( 6559):                                                    └IconTheme(color: Color(0xdd000000))
I/flutter ( 6559):                                                     └InkWell(state: _InkResponseState<InkResponse>(369160267))
I/flutter ( 6559):                                                      └GestureDetector()
I/flutter ( 6559):                                                       └RawGestureDetector(state: RawGestureDetectorState(175370983; gestures: tap; behavior: opaque))
I/flutter ( 6559):                                                        └_GestureSemantics(renderObject: RenderSemanticsGestureHandler relayoutBoundary=up2)
I/flutter ( 6559):                                                         └Listener(listeners: down; behavior: opaque; renderObject: RenderPointerListener relayoutBoundary=up3)
I/flutter ( 6559):                                                          └Container(padding: EdgeInsets(16.0, 0.0, 16.0, 0.0))
I/flutter ( 6559):                                                           └Padding(renderObject: RenderPadding relayoutBoundary=up4)
I/flutter ( 6559):                                                            └Center(alignment: Alignment.center; widthFactor: 1.0; renderObject: RenderPositionedBox relayoutBoundary=up5)
I/flutter ( 6559):                                                             └Text("Dump App")
I/flutter ( 6559):                                                              └RichText(renderObject: RenderParagraph relayoutBoundary=up6)
```

This is the "flattened" tree, showing all the widgets projected
through their various build functions. (This is the tree you obtain if
you call `toStringDeep` on the root of the widget tree.) You'll see a
lot of widgets in there that don't appear in your application's
source, because they are inserted by the framework's widgets' build
functions. For example,
[`InkFeature`]({{site.api}}/flutter/material/InkFeature-class.html)
is an implementation detail of the
[`Material`]({{site.api}}/flutter/material/Material-class.html)
widget.

这是一个“扁平化”的树，显示了所有通过各自构建函数创建的widget（如果你在 widget 树的根中调用 `toStringDeep`，这是你获得的树）。你会看到很多在你的应用源代码中没有出现的 widget，因为它们被框架的 widget 的 build() 函数插入的。例如，[`InkFeature`]({{site.api}}/flutter/material/InkFeature-class.html) 是 [`Material`]({{site.api}}/flutter/material/Material-class.html) 的一个实现细节 。

Since the `debugDumpApp()` call is invoked when the button changes
from being pressed to being released, it coincides with the
[`FlatButton`]({{site.api}}/flutter/material/FlatButton-class.html)
object calling
[`setState()`]({{site.api}}/flutter/widgets/State/setState.html)
and thus marking itself dirty. That is why, when you look at the dump you
should see that specific object marked as "dirty". You can also see what
gesture listeners have been registered; in this case, a single
GestureDetector is listed, and it is listening only to a "tap" gesture
("tap" is the output of a `TapGestureDetector`'s `toStringShort`
function).

由于 `debugDumpApp()` 当按钮从被按下变为被释放时被调用，[`FlatButton`]({{site.api}}/flutter/material/FlatButton-class.html) 对象同时调用 [`setState()`]({{site.api}}/flutter/widgets/State/setState.html)，所以它将自己标记为脏。 这就是为什么如果你看转储，你会看到特定的对象标记为 "dirty"。您还可以查看已注册了哪些手势监听器; 在这种情况下，一个单一的 GestureDetector 被列出，并且监听 "tap" 手势（"tap" 是 `TapGestureDetector` 的 `toStringShort` 函数输出的）

If you write your own widgets, you can add information by overriding
[`debugFillProperties()`]({{site.api}}/flutter/widgets/Widget/debugFillProperties.html).
Add [DiagnosticsProperty]({{site.api}}/flutter/foundation/DiagnosticsProperty-class.html)
objects to the method's argument, and call the superclass method.
This function is what the `toString` method uses to fill in the
widget's description.

如果您编写自己的 widget，则可以通过覆盖 [`debugFillProperties()`]({{site.api}}/flutter/widgets/Widget/debugFillProperties.html) 来添加信息。 将 [DiagnosticsProperty]({{site.api}}/flutter/foundation/DiagnosticsProperty-class.html) 对象作为方法参数，并调用父类方法。 该函数是 `toString` 方法用来填充小部件描述信息的。

### Rendering layer
### 渲染层

If you are trying to debug a layout issue, then the Widgets layer's
tree might be insufficiently detailed. In that case, you can dump the
rendering tree by calling
[`debugDumpRenderTree()`]({{site.api}}/flutter/rendering/debugDumpRenderTree.html).
As with `debugDumpApp()`, you can call this more or less any time
except during a layout or paint phase. As a general rule, calling it
from a [frame
callback]({{site.api}}/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html)
or an event handler is the best solution.

如果您尝试调试布局问题，那么 Widgets 层的树可能不够详细。在这种情况下，您可以通过调用 [`debugDumpRenderTree()`]({{site.api}}/flutter/rendering/debugDumpRenderTree.html) dump 渲染树。 正如 `debugDumpApp()`，除布局或绘制阶段外，您可以随时调用此函数。作为一般规则，从 [frame
callback]({{site.api}}/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html) 回调， 或事件处理器中调用它是最佳解决方案。

To call `debugDumpRenderTree()`, you need to add `import
'package:flutter/rendering.dart';` to your source file.

要调用 `debugDumpRenderTree()`，您需要添加 `import

'package:flutter/rendering.dart';` 到您的源文件。

The output for the tiny example above would look something like this:

上面这个小例子的输出结果如下所示：

```
I/flutter ( 6559): RenderView
I/flutter ( 6559):  │ debug mode enabled - android
I/flutter ( 6559):  │ window size: Size(1080.0, 1794.0) (in physical pixels)
I/flutter ( 6559):  │ device pixel ratio: 2.625 (physical pixels per logical pixel)
I/flutter ( 6559):  │ configuration: Size(411.4, 683.4) at 2.625x (in logical pixels)
I/flutter ( 6559):  │
I/flutter ( 6559):  └─child: RenderCustomPaint
I/flutter ( 6559):    │ creator: CustomPaint ← Banner ← CheckedModeBanner ←
I/flutter ( 6559):    │   WidgetsApp-[GlobalObjectKey _MaterialAppState(1009803148)] ←
I/flutter ( 6559):    │   Theme ← AnimatedTheme ← ScrollConfiguration ← MaterialApp ←
I/flutter ( 6559):    │   [root]
I/flutter ( 6559):    │ parentData: <none>
I/flutter ( 6559):    │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):    │ size: Size(411.4, 683.4)
I/flutter ( 6559):    │
I/flutter ( 6559):    └─child: RenderPointerListener
I/flutter ( 6559):      │ creator: Listener ← Navigator-[GlobalObjectKey<NavigatorState>
I/flutter ( 6559):      │   _WidgetsAppState(552902158)] ← Title ← LocaleQuery ← MediaQuery
I/flutter ( 6559):      │   ← DefaultTextStyle ← CustomPaint ← Banner ← CheckedModeBanner ←
I/flutter ( 6559):      │   WidgetsApp-[GlobalObjectKey _MaterialAppState(1009803148)] ←
I/flutter ( 6559):      │   Theme ← AnimatedTheme ← ⋯
I/flutter ( 6559):      │ parentData: <none>
I/flutter ( 6559):      │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):      │ size: Size(411.4, 683.4)
I/flutter ( 6559):      │ behavior: defer-to-child
I/flutter ( 6559):      │ listeners: down, up, cancel
I/flutter ( 6559):      │
I/flutter ( 6559):      └─child: RenderAbsorbPointer
I/flutter ( 6559):        │ creator: AbsorbPointer ← Listener ←
I/flutter ( 6559):        │   Navigator-[GlobalObjectKey<NavigatorState>
I/flutter ( 6559):        │   _WidgetsAppState(552902158)] ← Title ← LocaleQuery ← MediaQuery
I/flutter ( 6559):        │   ← DefaultTextStyle ← CustomPaint ← Banner ← CheckedModeBanner ←
I/flutter ( 6559):        │   WidgetsApp-[GlobalObjectKey _MaterialAppState(1009803148)] ←
I/flutter ( 6559):        │   Theme ← ⋯
I/flutter ( 6559):        │ parentData: <none>
I/flutter ( 6559):        │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):        │ size: Size(411.4, 683.4)
I/flutter ( 6559):        │ absorbing: false
I/flutter ( 6559):        │
I/flutter ( 6559):        └─child: RenderSemanticsAnnotations
I/flutter ( 6559):          │ creator: Semantics ← Focus-[GlobalKey 489139594] ← AbsorbPointer
I/flutter ( 6559):          │   ← Listener ← Navigator-[GlobalObjectKey<NavigatorState>
I/flutter ( 6559):          │   _WidgetsAppState(552902158)] ← Title ← LocaleQuery ← MediaQuery
I/flutter ( 6559):          │   ← DefaultTextStyle ← CustomPaint ← Banner ← CheckedModeBanner ←
I/flutter ( 6559):          │   ⋯
I/flutter ( 6559):          │ parentData: <none>
I/flutter ( 6559):          │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):          │ size: Size(411.4, 683.4)
I/flutter ( 6559):          │
I/flutter ( 6559):          └─child: _RenderTheatre
I/flutter ( 6559):            │ creator: _Theatre ← Overlay-[GlobalKey 199833992] ← _FocusScope ←
I/flutter ( 6559):            │   Semantics ← Focus-[GlobalKey 489139594] ← AbsorbPointer ←
I/flutter ( 6559):            │   Listener ← Navigator-[GlobalObjectKey<NavigatorState>
I/flutter ( 6559):            │   _WidgetsAppState(552902158)] ← Title ← LocaleQuery ← MediaQuery
I/flutter ( 6559):            │   ← DefaultTextStyle ← ⋯
I/flutter ( 6559):            │ parentData: <none>
I/flutter ( 6559):            │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            │ size: Size(411.4, 683.4)
I/flutter ( 6559):            │
I/flutter ( 6559):            ├─onstage: RenderStack
I/flutter ( 6559):            ╎ │ creator: Stack ← _Theatre ← Overlay-[GlobalKey 199833992] ←
I/flutter ( 6559):            ╎ │   _FocusScope ← Semantics ← Focus-[GlobalKey 489139594] ←
I/flutter ( 6559):            ╎ │   AbsorbPointer ← Listener ←
I/flutter ( 6559):            ╎ │   Navigator-[GlobalObjectKey<NavigatorState>
I/flutter ( 6559):            ╎ │   _WidgetsAppState(552902158)] ← Title ← LocaleQuery ← MediaQuery
I/flutter ( 6559):            ╎ │   ← ⋯
I/flutter ( 6559):            ╎ │ parentData: not positioned; offset=Offset(0.0, 0.0)
I/flutter ( 6559):            ╎ │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎ │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎ │
I/flutter ( 6559):            ╎ ├─child 1: RenderIgnorePointer
I/flutter ( 6559):            ╎ │ │ creator: IgnorePointer ← _OverlayEntry-[GlobalKey 612888877] ←
I/flutter ( 6559):            ╎ │ │   Stack ← _Theatre ← Overlay-[GlobalKey 199833992] ← _FocusScope
I/flutter ( 6559):            ╎ │ │   ← Semantics ← Focus-[GlobalKey 489139594] ← AbsorbPointer ←
I/flutter ( 6559):            ╎ │ │   Listener ← Navigator-[GlobalObjectKey<NavigatorState>
I/flutter ( 6559):            ╎ │ │   _WidgetsAppState(552902158)] ← Title ← ⋯
I/flutter ( 6559):            ╎ │ │ parentData: not positioned; offset=Offset(0.0, 0.0)
I/flutter ( 6559):            ╎ │ │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎ │ │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎ │ │ ignoring: false
I/flutter ( 6559):            ╎ │ │ ignoringSemantics: implicitly false
I/flutter ( 6559):            ╎ │ │
I/flutter ( 6559):            ╎ │ └─child: RenderSemanticsAnnotations
I/flutter ( 6559):            ╎ │   │ creator: Semantics ← ModalBarrier ← IgnorePointer ←
I/flutter ( 6559):            ╎ │   │   _OverlayEntry-[GlobalKey 612888877] ← Stack ← _Theatre ←
I/flutter ( 6559):            ╎ │   │   Overlay-[GlobalKey 199833992] ← _FocusScope ← Semantics ←
I/flutter ( 6559):            ╎ │   │   Focus-[GlobalKey 489139594] ← AbsorbPointer ← Listener ← ⋯
I/flutter ( 6559):            ╎ │   │ parentData: <none>
I/flutter ( 6559):            ╎ │   │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎ │   │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎ │   │
I/flutter ( 6559):            ╎ │   └─child: RenderSemanticsGestureHandler
I/flutter ( 6559):            ╎ │     │ creator: _GestureSemantics ← RawGestureDetector ← GestureDetector
I/flutter ( 6559):            ╎ │     │   ← Semantics ← ModalBarrier ← IgnorePointer ←
I/flutter ( 6559):            ╎ │     │   _OverlayEntry-[GlobalKey 612888877] ← Stack ← _Theatre ←
I/flutter ( 6559):            ╎ │     │   Overlay-[GlobalKey 199833992] ← _FocusScope ← Semantics ← ⋯
I/flutter ( 6559):            ╎ │     │ parentData: <none>
I/flutter ( 6559):            ╎ │     │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎ │     │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎ │     │
I/flutter ( 6559):            ╎ │     └─child: RenderPointerListener
I/flutter ( 6559):            ╎ │       │ creator: Listener ← _GestureSemantics ← RawGestureDetector ←
I/flutter ( 6559):            ╎ │       │   GestureDetector ← Semantics ← ModalBarrier ← IgnorePointer ←
I/flutter ( 6559):            ╎ │       │   _OverlayEntry-[GlobalKey 612888877] ← Stack ← _Theatre ←
I/flutter ( 6559):            ╎ │       │   Overlay-[GlobalKey 199833992] ← _FocusScope ← ⋯
I/flutter ( 6559):            ╎ │       │ parentData: <none>
I/flutter ( 6559):            ╎ │       │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎ │       │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎ │       │ behavior: opaque
I/flutter ( 6559):            ╎ │       │ listeners: down
I/flutter ( 6559):            ╎ │       │
I/flutter ( 6559):            ╎ │       └─child: RenderConstrainedBox
I/flutter ( 6559):            ╎ │           creator: ConstrainedBox ← Listener ← _GestureSemantics ←
I/flutter ( 6559):            ╎ │             RawGestureDetector ← GestureDetector ← Semantics ← ModalBarrier
I/flutter ( 6559):            ╎ │             ← IgnorePointer ← _OverlayEntry-[GlobalKey 612888877] ← Stack ←
I/flutter ( 6559):            ╎ │             _Theatre ← Overlay-[GlobalKey 199833992] ← ⋯
I/flutter ( 6559):            ╎ │           parentData: <none>
I/flutter ( 6559):            ╎ │           constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎ │           size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎ │           additionalConstraints: BoxConstraints(biggest)
I/flutter ( 6559):            ╎ │
I/flutter ( 6559):            ╎ └─child 2: RenderSemanticsAnnotations
I/flutter ( 6559):            ╎   │ creator: Semantics ← Focus-[GlobalObjectKey
I/flutter ( 6559):            ╎   │   MaterialPageRoute<void>(875520219)] ← _ModalScope-[GlobalKey
I/flutter ( 6559):            ╎   │   816151164] ← _OverlayEntry-[GlobalKey 727622716] ← Stack ←
I/flutter ( 6559):            ╎   │   _Theatre ← Overlay-[GlobalKey 199833992] ← _FocusScope ←
I/flutter ( 6559):            ╎   │   Semantics ← Focus-[GlobalKey 489139594] ← AbsorbPointer ←
I/flutter ( 6559):            ╎   │   Listener ← ⋯
I/flutter ( 6559):            ╎   │ parentData: not positioned; offset=Offset(0.0, 0.0)
I/flutter ( 6559):            ╎   │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎   │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎   │
I/flutter ( 6559):            ╎   └─child: RenderOffstage
I/flutter ( 6559):            ╎     │ creator: Offstage ← _FocusScope ← Semantics ←
I/flutter ( 6559):            ╎     │   Focus-[GlobalObjectKey MaterialPageRoute<void>(875520219)] ←
I/flutter ( 6559):            ╎     │   _ModalScope-[GlobalKey 816151164] ← _OverlayEntry-[GlobalKey
I/flutter ( 6559):            ╎     │   727622716] ← Stack ← _Theatre ← Overlay-[GlobalKey 199833992] ←
I/flutter ( 6559):            ╎     │   _FocusScope ← Semantics ← Focus-[GlobalKey 489139594] ← ⋯
I/flutter ( 6559):            ╎     │ parentData: <none>
I/flutter ( 6559):            ╎     │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎     │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎     │ offstage: false
I/flutter ( 6559):            ╎     │
I/flutter ( 6559):            ╎     └─child: RenderIgnorePointer
I/flutter ( 6559):            ╎       │ creator: IgnorePointer ← Offstage ← _FocusScope ← Semantics ←
I/flutter ( 6559):            ╎       │   Focus-[GlobalObjectKey MaterialPageRoute<void>(875520219)] ←
I/flutter ( 6559):            ╎       │   _ModalScope-[GlobalKey 816151164] ← _OverlayEntry-[GlobalKey
I/flutter ( 6559):            ╎       │   727622716] ← Stack ← _Theatre ← Overlay-[GlobalKey 199833992] ←
I/flutter ( 6559):            ╎       │   _FocusScope ← Semantics ← ⋯
I/flutter ( 6559):            ╎       │ parentData: <none>
I/flutter ( 6559):            ╎       │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎       │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎       │ ignoring: false
I/flutter ( 6559):            ╎       │ ignoringSemantics: implicitly false
I/flutter ( 6559):            ╎       │
I/flutter ( 6559):            ╎       └─child: RenderFractionalTranslation
I/flutter ( 6559):            ╎         │ creator: FractionalTranslation ← SlideTransition ←
I/flutter ( 6559):            ╎         │   _MountainViewPageTransition ← IgnorePointer ← Offstage ←
I/flutter ( 6559):            ╎         │   _FocusScope ← Semantics ← Focus-[GlobalObjectKey
I/flutter ( 6559):            ╎         │   MaterialPageRoute<void>(875520219)] ← _ModalScope-[GlobalKey
I/flutter ( 6559):            ╎         │   816151164] ← _OverlayEntry-[GlobalKey 727622716] ← Stack ←
I/flutter ( 6559):            ╎         │   _Theatre ← ⋯
I/flutter ( 6559):            ╎         │ parentData: <none>
I/flutter ( 6559):            ╎         │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎         │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎         │ translation: Offset(0.0, 0.0)
I/flutter ( 6559):            ╎         │ transformHitTests: true
I/flutter ( 6559):            ╎         │
I/flutter ( 6559):            ╎         └─child: RenderRepaintBoundary
I/flutter ( 6559):            ╎           │ creator: RepaintBoundary ← FractionalTranslation ←
I/flutter ( 6559):            ╎           │   SlideTransition ← _MountainViewPageTransition ← IgnorePointer ←
I/flutter ( 6559):            ╎           │   Offstage ← _FocusScope ← Semantics ← Focus-[GlobalObjectKey
I/flutter ( 6559):            ╎           │   MaterialPageRoute<void>(875520219)] ← _ModalScope-[GlobalKey
I/flutter ( 6559):            ╎           │   816151164] ← _OverlayEntry-[GlobalKey 727622716] ← Stack ← ⋯
I/flutter ( 6559):            ╎           │ parentData: <none>
I/flutter ( 6559):            ╎           │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎           │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎           │ metrics: 83.3% useful (1 bad vs 5 good)
I/flutter ( 6559):            ╎           │ diagnosis: this is a useful repaint boundary and should be kept
I/flutter ( 6559):            ╎           │
I/flutter ( 6559):            ╎           └─child: RenderDecoratedBox
I/flutter ( 6559):            ╎             │ creator: DecoratedBox ← Container ← AnimatedContainer ← Material
I/flutter ( 6559):            ╎             │   ← AppHome ← _ModalScopeStatus ← PageStorage-[GlobalKey
I/flutter ( 6559):            ╎             │   619728754] ← RepaintBoundary ← FractionalTranslation ←
I/flutter ( 6559):            ╎             │   SlideTransition ← _MountainViewPageTransition ← IgnorePointer ←
I/flutter ( 6559):            ╎             │   ⋯
I/flutter ( 6559):            ╎             │ parentData: <none>
I/flutter ( 6559):            ╎             │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎             │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎             │ decoration:
I/flutter ( 6559):            ╎             │   <no decorations specified>
I/flutter ( 6559):            ╎             │ configuration: ImageConfiguration(bundle:
I/flutter ( 6559):            ╎             │   PlatformAssetBundle@367106502(), devicePixelRatio: 2.625,
I/flutter ( 6559):            ╎             │   platform: android)
I/flutter ( 6559):            ╎             │
I/flutter ( 6559):            ╎             └─child: RenderDecoratedBox
I/flutter ( 6559):            ╎               │ creator: DecoratedBox ← Container ← DecoratedBox ← Container ←
I/flutter ( 6559):            ╎               │   AnimatedContainer ← Material ← AppHome ← _ModalScopeStatus ←
I/flutter ( 6559):            ╎               │   PageStorage-[GlobalKey 619728754] ← RepaintBoundary ←
I/flutter ( 6559):            ╎               │   FractionalTranslation ← SlideTransition ← ⋯
I/flutter ( 6559):            ╎               │ parentData: <none>
I/flutter ( 6559):            ╎               │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎               │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎               │ decoration:
I/flutter ( 6559):            ╎               │   backgroundColor: Color(0xfffafafa)
I/flutter ( 6559):            ╎               │ configuration: ImageConfiguration(bundle:
I/flutter ( 6559):            ╎               │   PlatformAssetBundle@367106502(), devicePixelRatio: 2.625,
I/flutter ( 6559):            ╎               │   platform: android)
I/flutter ( 6559):            ╎               │
I/flutter ( 6559):            ╎               └─child: _RenderInkFeatures
I/flutter ( 6559):            ╎                 │ creator: _InkFeature-[GlobalKey ink renderer] ←
I/flutter ( 6559):            ╎                 │   NotificationListener<LayoutChangedNotification> ← DecoratedBox
I/flutter ( 6559):            ╎                 │   ← Container ← DecoratedBox ← Container ← AnimatedContainer ←
I/flutter ( 6559):            ╎                 │   Material ← AppHome ← _ModalScopeStatus ← PageStorage-[GlobalKey
I/flutter ( 6559):            ╎                 │   619728754] ← RepaintBoundary ← ⋯
I/flutter ( 6559):            ╎                 │ parentData: <none>
I/flutter ( 6559):            ╎                 │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎                 │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎                 │
I/flutter ( 6559):            ╎                 └─child: RenderPositionedBox
I/flutter ( 6559):            ╎                   │ creator: Center ← DefaultTextStyle ← AnimatedDefaultTextStyle ←
I/flutter ( 6559):            ╎                   │   _InkFeature-[GlobalKey ink renderer] ←
I/flutter ( 6559):            ╎                   │   NotificationListener<LayoutChangedNotification> ← DecoratedBox
I/flutter ( 6559):            ╎                   │   ← Container ← DecoratedBox ← Container ← AnimatedContainer ←
I/flutter ( 6559):            ╎                   │   Material ← AppHome ← ⋯
I/flutter ( 6559):            ╎                   │ parentData: <none>
I/flutter ( 6559):            ╎                   │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):            ╎                   │ size: Size(411.4, 683.4)
I/flutter ( 6559):            ╎                   │ alignment: Alignment.center
I/flutter ( 6559):            ╎                   │ widthFactor: expand
I/flutter ( 6559):            ╎                   │ heightFactor: expand
I/flutter ( 6559):            ╎                   │
I/flutter ( 6559):            ╎                   └─child: RenderConstrainedBox relayoutBoundary=up1
I/flutter ( 6559):            ╎                     │ creator: ConstrainedBox ← MaterialButton ← FlatButton ← Center ←
I/flutter ( 6559):            ╎                     │   DefaultTextStyle ← AnimatedDefaultTextStyle ←
I/flutter ( 6559):            ╎                     │   _InkFeature-[GlobalKey ink renderer] ←
I/flutter ( 6559):            ╎                     │   NotificationListener<LayoutChangedNotification> ← DecoratedBox
I/flutter ( 6559):            ╎                     │   ← Container ← DecoratedBox ← Container ← ⋯
I/flutter ( 6559):            ╎                     │ parentData: offset=Offset(156.7, 323.7)
I/flutter ( 6559):            ╎                     │ constraints: BoxConstraints(0.0<=w<=411.4, 0.0<=h<=683.4)
I/flutter ( 6559):            ╎                     │ size: Size(98.0, 36.0)
I/flutter ( 6559):            ╎                     │ additionalConstraints: BoxConstraints(88.0<=w<=Infinity, h=36.0)
I/flutter ( 6559):            ╎                     │
I/flutter ( 6559):            ╎                     └─child: RenderSemanticsGestureHandler relayoutBoundary=up2
I/flutter ( 6559):            ╎                       │ creator: _GestureSemantics ← RawGestureDetector ← GestureDetector
I/flutter ( 6559):            ╎                       │   ← InkWell ← IconTheme ← DefaultTextStyle ←
I/flutter ( 6559):            ╎                       │   AnimatedDefaultTextStyle ← ConstrainedBox ← MaterialButton ←
I/flutter ( 6559):            ╎                       │   FlatButton ← Center ← DefaultTextStyle ← ⋯
I/flutter ( 6559):            ╎                       │ parentData: <none>
I/flutter ( 6559):            ╎                       │ constraints: BoxConstraints(88.0<=w<=411.4, h=36.0)
I/flutter ( 6559):            ╎                       │ size: Size(98.0, 36.0)
I/flutter ( 6559):            ╎                       │
I/flutter ( 6559):            ╎                       └─child: RenderPointerListener relayoutBoundary=up3
I/flutter ( 6559):            ╎                         │ creator: Listener ← _GestureSemantics ← RawGestureDetector ←
I/flutter ( 6559):            ╎                         │   GestureDetector ← InkWell ← IconTheme ← DefaultTextStyle ←
I/flutter ( 6559):            ╎                         │   AnimatedDefaultTextStyle ← ConstrainedBox ← MaterialButton ←
I/flutter ( 6559):            ╎                         │   FlatButton ← Center ← ⋯
I/flutter ( 6559):            ╎                         │ parentData: <none>
I/flutter ( 6559):            ╎                         │ constraints: BoxConstraints(88.0<=w<=411.4, h=36.0)
I/flutter ( 6559):            ╎                         │ size: Size(98.0, 36.0)
I/flutter ( 6559):            ╎                         │ behavior: opaque
I/flutter ( 6559):            ╎                         │ listeners: down
I/flutter ( 6559):            ╎                         │
I/flutter ( 6559):            ╎                         └─child: RenderPadding relayoutBoundary=up4
I/flutter ( 6559):            ╎                           │ creator: Padding ← Container ← Listener ← _GestureSemantics ←
I/flutter ( 6559):            ╎                           │   RawGestureDetector ← GestureDetector ← InkWell ← IconTheme ←
I/flutter ( 6559):            ╎                           │   DefaultTextStyle ← AnimatedDefaultTextStyle ← ConstrainedBox ←
I/flutter ( 6559):            ╎                           │   MaterialButton ← ⋯
I/flutter ( 6559):            ╎                           │ parentData: <none>
I/flutter ( 6559):            ╎                           │ constraints: BoxConstraints(88.0<=w<=411.4, h=36.0)
I/flutter ( 6559):            ╎                           │ size: Size(98.0, 36.0)
I/flutter ( 6559):            ╎                           │ padding: EdgeInsets(16.0, 0.0, 16.0, 0.0)
I/flutter ( 6559):            ╎                           │
I/flutter ( 6559):            ╎                           └─child: RenderPositionedBox relayoutBoundary=up5
I/flutter ( 6559):            ╎                             │ creator: Center ← Padding ← Container ← Listener ←
I/flutter ( 6559):            ╎                             │   _GestureSemantics ← RawGestureDetector ← GestureDetector ←
I/flutter ( 6559):            ╎                             │   InkWell ← IconTheme ← DefaultTextStyle ←
I/flutter ( 6559):            ╎                             │   AnimatedDefaultTextStyle ← ConstrainedBox ← ⋯
I/flutter ( 6559):            ╎                             │ parentData: offset=Offset(16.0, 0.0)
I/flutter ( 6559):            ╎                             │ constraints: BoxConstraints(56.0<=w<=379.4, h=36.0)
I/flutter ( 6559):            ╎                             │ size: Size(66.0, 36.0)
I/flutter ( 6559):            ╎                             │ alignment: Alignment.center
I/flutter ( 6559):            ╎                             │ widthFactor: 1.0
I/flutter ( 6559):            ╎                             │ heightFactor: expand
I/flutter ( 6559):            ╎                             │
I/flutter ( 6559):            ╎                             └─child: RenderParagraph relayoutBoundary=up6
I/flutter ( 6559):            ╎                               │ creator: RichText ← Text ← Center ← Padding ← Container ←
I/flutter ( 6559):            ╎                               │   Listener ← _GestureSemantics ← RawGestureDetector ←
I/flutter ( 6559):            ╎                               │   GestureDetector ← InkWell ← IconTheme ← DefaultTextStyle ← ⋯
I/flutter ( 6559):            ╎                               │ parentData: offset=Offset(0.0, 10.0)
I/flutter ( 6559):            ╎                               │ constraints: BoxConstraints(0.0<=w<=379.4, 0.0<=h<=36.0)
I/flutter ( 6559):            ╎                               │ size: Size(66.0, 16.0)
I/flutter ( 6559):            ╎                               ╘═╦══ text ═══
I/flutter ( 6559):            ╎                                 ║ TextSpan:
I/flutter ( 6559):            ╎                                 ║   inherit: false
I/flutter ( 6559):            ╎                                 ║   color: Color(0xdd000000)
I/flutter ( 6559):            ╎                                 ║   family: "Roboto"
I/flutter ( 6559):            ╎                                 ║   size: 14.0
I/flutter ( 6559):            ╎                                 ║   weight: 500
I/flutter ( 6559):            ╎                                 ║   baseline: alphabetic
I/flutter ( 6559):            ╎                                 ║   "Dump App"
I/flutter ( 6559):            ╎                                 ╚═══════════
I/flutter ( 6559):            ╎
I/flutter ( 6559):            └╌no offstage children

```

This is the output of the root `RenderObject` object's `toStringDeep`
function.

这是根 `RenderObject` 对象的 `toStringDeep` 函数的输出。

When debugging layout issues, the key fields to look at are the `size`
and `constraints` fields. The constraints flow down the tree, and the
sizes flow back up.

当调试布局问题时，关键要看的是 `size` 和 `constraints` 字段。约束沿着树向下传递，尺寸向上传递。

For example, in the dump above you can see that the window size,
`Size(411.4, 683.4)`, is used to force all the boxes down to the
[`RenderPositionedBox`]({{site.api}}/flutter/rendering/RenderPositionedBox-class.html)
to be the size of the screen, with constraints of
`BoxConstraints(w=411.4, h=683.4)`. The `RenderPositionedBox`, which
the dump says was created by a
[`Center`]({{site.api}}/flutter/widgets/Center-class.html)
widget (as described by the `creator` field), sets its child's
constraints to a loose version of this: `BoxConstraints(0.0<=w<=411.4,
0.0<=h<=683.4)`. The child, a
[`RenderPadding`]({{site.api}}/flutter/rendering/RenderPadding-class.html),
further inserts these constraints to ensure there is room for the
padding, and thus the
[`RenderConstrainedBox`]({{site.api}}/flutter/rendering/RenderConstrainedBox-class.html)
has a loose constraint of `BoxConstraints(0.0<=w<=395.4,
0.0<=h<=667.4)`. This object, which the `creator` field tells us is
probably part of the
[`FlatButton`]({{site.api}}/flutter/material/FlatButton-class.html)'s
definition, sets a minimum width of 88 pixels on its contents and a
specific height of 36.0. (This is the `FlatButton` class implementing
the Material Design guidelines regarding button dimensions.)

例如，在上面的 dump 中，您可以看到窗口大小，`Size(411.4, 683.4)`，它用于强制 [`RenderPositionedBox`]({{site.api}}/flutter/rendering/RenderPositionedBox-class.html) 下的所有渲染框到屏幕的大小， 约束条件为 `BoxConstraints(w=411.4, h=683.4)`。从 `RenderPositionedBox` 的 dump 中看到是由 [`Center`]({{site.api}}/flutter/widgets/Center-class.html) widget创建的（如 `creator` 字段所描述的）， 设置其孩子的约束为：`BoxConstraints(0.0<=w<=411.4,
0.0<=h<=683.4)`。一个子 widget [`RenderPadding`]({{site.api}}/flutter/rendering/RenderPadding-class.html) 进一步插入这些约束以添加 padding，因此 [`RenderConstrainedBox`]({{site.api}}/flutter/rendering/RenderConstrainedBox-class.html) 具有约束 `BoxConstraints(0.0<=w<=395.4,
0.0<=h<=667.4)`。该 `creator` 字段告诉我们的这个对象可能是其 [`FlatButton`]({{site.api}}/flutter/material/FlatButton-class.html) 定义的一部分，它在其内容上设置最小宽度为88像素，并且设置高度为36.0像素（这是 Material Design 设计规范中 `FlatButton` 类的尺寸标准）。

The inner-most `RenderPositionedBox` loosens the constraints again,
this time to center the text within the button. The
[`RenderParagraph`]({{site.api}}/flutter/rendering/RenderParagraph-class.html)
picks its size based on its contents. If you now follow the sizes back
up the chain, you'll see how the text's size is what influences the
width of all the boxes that form the button, as they all take their
child's dimensions to size themselves.

最内部  `RenderPositionedBox`再次松开约束，这次是将按钮中的文本居中。 在 [`RenderParagraph`]({{site.api}}/flutter/rendering/RenderParagraph-class.html) 中基于它的内容来决定其大小。 如果您现在按照size链继续往下查看，您会看到文本的大小是如何影响其按钮的框的宽度的，它们都是根据孩子的尺寸自行调整大小。

Another way to notice this is by looking at the "relayoutSubtreeRoot"
part of the descriptions of each box, which essentially tells you how
many ancestors depend on this element's size in some way. Thus the
`RenderParagraph` has a `relayoutSubtreeRoot=up8`, meaning that when
the `RenderParagraph` is dirtied, eight ancestors also have to be
dirtied because they might be affected by the new dimensions.

另一种需要注意的是每个盒子描述的 "relayoutSubtreeRoot" 部分，它告诉你有多少祖先以某种方式依赖于这个元素的大小。 因此，`RenderParagraph` 有一个 `relayoutSubtreeRoot=up8`，这意味着当 `RenderParagraph` 被标及为 ”dirty” 时，它的八个祖先也必须被标记为 ”dirty”，因为它们可能受到新尺寸的影响。

If you write your own render objects, you can add information to the
dump by overriding
[`debugFillProperties()`]({{site.api}}/flutter/rendering/Layer/debugFillProperties.html).
Add [DiagnosticsProperty]({{site.api}}/flutter/foundation/DiagnosticsProperty-class.html)
objects to the method's argument, and call the superclass method.

如果您编写自己的渲染对象，则可以通过覆盖 [`debugFillProperties()`]({{site.api}}/flutter/rendering/Layer/debugFillProperties.html) 将信息添加到 dump。 将 [DiagnosticsProperty]({{site.api}}/flutter/foundation/DiagnosticsProperty-class.html) 对象作为方法的参数，并调用父类方法。

### Layers

### 层

If you are trying to debug a compositing issue, you can use
[`debugDumpLayerTree()`]({{site.api}}/flutter/rendering/debugDumpLayerTree.html).
For the example above, it would output:

如果您尝试调试合成问题，则可以使用 [`debugDumpLayerTree()`]({{site.api}}/flutter/rendering/debugDumpLayerTree.html)。对于上面的例子，它会输出：

```
I/flutter : TransformLayer
I/flutter :  │ creator: [root]
I/flutter :  │ offset: Offset(0.0, 0.0)
I/flutter :  │ transform:
I/flutter :  │   [0] 3.5,0.0,0.0,0.0
I/flutter :  │   [1] 0.0,3.5,0.0,0.0
I/flutter :  │   [2] 0.0,0.0,1.0,0.0
I/flutter :  │   [3] 0.0,0.0,0.0,1.0
I/flutter :  │
I/flutter :  ├─child 1: OffsetLayer
I/flutter :  │ │ creator: RepaintBoundary ← _FocusScope ← Semantics ← Focus-[GlobalObjectKey MaterialPageRoute(560156430)] ← _ModalScope-[GlobalKey 328026813] ← _OverlayEntry-[GlobalKey 388965355] ← Stack ← Overlay-[GlobalKey 625702218] ← Navigator-[GlobalObjectKey _MaterialAppState(859106034)] ← Title ← ⋯
I/flutter :  │ │ offset: Offset(0.0, 0.0)
I/flutter :  │ │
I/flutter :  │ └─child 1: PictureLayer
I/flutter :  │
I/flutter :  └─child 2: PictureLayer
```

This is the output of calling `toStringDeep` on the root `Layer` object.

这是在根 `Layer` 对象调用 `toStringDeep` 输出的。

The transform at the root is the transform that applies the device
pixel ratio; in this case, a ratio of 3.5 device pixels for every
logical pixel.

根的变换是应用设备像素比的变换; 在这种情况下，每个逻辑像素代表3.5个设备像素。

The `RepaintBoundary` widget, which creates a `RenderRepaintBoundary`
in the render tree, creates a new layer in the layer tree. This is
used to reduce how much needs to be repainted.

`RepaintBoundary` widget在渲染树的层中创建了一个 `RenderRepaintBoundary`。这用于减少需要重绘的需求量。

### Semantics

### 语义

You can also obtain a dump of the Semantics tree (the tree presented
to the system accessibility APIs) using
[`debugDumpSemanticsTree()`]({{site.api}}/flutter/rendering/debugDumpSemanticsTree.html).
To use this, you have to have first enable accessibility, e.g. by
enabling a system accessibility tool or the `SemanticsDebugger`
(discussed below).

您还可以调用 [`debugDumpSemanticsTree()`]({{site.api}}/flutter/rendering/debugDumpSemanticsTree.html) 来
获得语义树（呈现给系统可访问性API的树），要使用此功能，必须有第一个 accessibility，例如启用系统 accessibility 或 `SemanticsDebugger`（下面讨论）。

For the example above, it would output:

```
I/flutter : SemanticsNode(0; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  ├SemanticsNode(1; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  │ └SemanticsNode(2; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4); canBeTapped)
I/flutter :  └SemanticsNode(3; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :    └SemanticsNode(4; Rect.fromLTRB(0.0, 0.0, 82.0, 36.0); canBeTapped; "Dump App")
```

<!-- this tree is bad, see {{site.github}}/flutter/flutter/issues/2476 -->

### Scheduling

### 调度

To find out where your events happen relative to the frame's begin/end, you can toggle the [`debugPrintBeginFrameBanner`]({{site.api}}/flutter/scheduler/debugPrintBeginFrameBanner.html) and the [`debugPrintEndFrameBanner`]({{site.api}}/flutter/scheduler/debugPrintEndFrameBanner.html) booleans to print the beginning and end of the frames to the console.

要找出你的事件相对于帧的开始/结束的位置，你可以切换 [`debugPrintBeginFrameBanner`]({{site.api}}/flutter/scheduler/debugPrintBeginFrameBanner.html) 和 [`debugPrintEndFrameBanner`]({{site.api}}/flutter/scheduler/debugPrintEndFrameBanner.html) 布尔值来打印出帧的开始和结束信息。

For example:

例如：

```
I/flutter : ▄▄▄▄▄▄▄▄ Frame 12         30s 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

[`debugPrintScheduleFrameStacks`]({{site.api}}/flutter/scheduler/debugPrintScheduleFrameStacks.html)
can also be used to print the call stack causing the current frame to be
scheduled.

[`debugPrintScheduleFrameStacks`]({{site.api}}/flutter/scheduler/debugPrintScheduleFrameStacks.html) 也可以被用来打印
导致当前帧被调度的堆栈信息。

## Visual debugging

## 可视化调试

You can also debug a layout problem visually, by setting
[`debugPaintSizeEnabled`]({{site.api}}/flutter/rendering/debugPaintSizeEnabled.html)
to `true`. This is a boolean from the `rendering` library. It can be
enabled at any time and affects all painting while it is true. The
easiest way to set it is at the top of your `void main()` entry point. See code below:

您也可以通过设置 [`debugPaintSizeEnabled`]({{site.api}}/flutter/rendering/debugPaintSizeEnabled.html) 为 true 来调试布局问题。
这是一个来自 `rendering` 库的布尔值。它可以在任何时候被启用，并在其为 true 时影响绘制。设置它的最简单方法是在 `void main()` 入口，请看以下代码：

<!-- skip -->
```dart
//add import to rendering library
import 'package:flutter/rendering.dart';

void main() {
  debugPaintSizeEnabled=true;
  runApp(MyApp());
}
```

When it is enabled, all boxes get a bright teal border, padding (from
widgets like `Padding`) is shown in faded blue with a darker blue box
around the child, alignment (from widgets like `Center` and `Align`)
is shown with yellow arrows, and spacers (from widgets like
`Container` when they have no child) are shown in gray.

当它被启用时，所有的 boxes 都会得到一个明亮的深青色边框，padding（来自 widget 如 `Padding`）显示为浅蓝色，
其 child 周围有一个深蓝色 box， alignment（来自 widget 如 `Center` 和 `Align`）显示为黄色箭头. 
spacers（如没有任何子节点的 `Container`）以灰色显示。

The
[`debugPaintBaselinesEnabled`]({{site.api}}/flutter/rendering/debugPaintBaselinesEnabled.html)
does something similar but for objects with baselines. The alphabetic
baseline is shown in bright green and the ideographic baseline in
orange.

[`debugPaintBaselinesEnabled`]({{site.api}}/flutter/rendering/debugPaintBaselinesEnabled.html) 可以做类似的事情，但对于具有基线的对象，文字基线以绿色显示，ideographic 基线以橙色显示。

The
[`debugPaintPointersEnabled`]({{site.api}}/flutter/rendering/debugPaintPointersEnabled.html)
flag turns on a special mode whereby any objects that are being tapped
get highlighted in teal. This can help you determine whether an object
is somehow failing to correctly hit test (which might happen if, for
instance, it is actually outside the bounds of its parent and thus not
being considered for hit testing in the first place).

[`debugPaintPointersEnabled`]({{site.api}}/flutter/rendering/debugPaintPointersEnabled.html) 标志打开一个特殊模式，任何正在点击的对象都会以深青色突出显示。这可以帮助您确定某个对象是否由于某种原因没有正确地 hit test（例如，如果它实际上超出了其父项的范围，首先不会考虑通过  hit testing）。

If you're trying to debug compositor layers, for example to determine
whether and where to add `RepaintBoundary` widgets, you can use the
[`debugPaintLayerBordersEnabled`]({{site.api}}/flutter/rendering/debugPaintLayerBordersEnabled.html)
flag, which outlines each layer's bounds in orange, or the
[`debugRepaintRainbowEnabled`]({{site.api}}/flutter/rendering/debugRepaintRainbowEnabled.html)
flag, which causes layers to be overlayed with a rotating set of
colors whenever they are repainted.

如果您尝试调试合成图层，例如以确定是否以及在何处添加 `RepaintBoundary` widgets，你可以使用 [`debugPaintLayerBordersEnabled`]({{site.api}}/flutter/rendering/debugPaintLayerBordersEnabled.html) 标志，该标志用橙色或轮廓线标出每个层的边界，或者 [`debugRepaintRainbowEnabled`]({{site.api}}/flutter/rendering/debugRepaintRainbowEnabled.html) 标志，该标志导致只要他们重绘时，这会使该层被一组旋转色所覆盖。

All of these flags only work in debug mode. In general, anything in
the Flutter framework that starts with "`debug...`" only works in
debug mode.

所有这些 flags 只能在 debug mode 下工作。通常 Flutter 框架中以 "`debug...`" 开头的任何内容都只能在调试模式下工作。

## Debugging animations

## 调试动画

The easiest way to debug animations is to slow them down. To do that,
set the
[`timeDilation`]({{site.api}}/flutter/scheduler/timeDilation.html)
variable (from the `scheduler` library) to a number greater than 1.0,
for instance, 50.0. It's best to only set this once on app startup. If
you change it on the fly, especially if you reduce it while animations
are running, it's possible that the framework will observe time going
backwards, which will probably result in asserts and generally
interfere with your efforts.

调试动画最简单的方法是减慢它们的速度。为此，请将 [`timeDilation`]({{site.api}}/flutter/scheduler/timeDilation.html)）变量 (from the `scheduler` library) 设置为大于 1.0 的数字，例如 50.0。 最好在应用程序启动时只设置一次。如果您在运行中更改它，尤其是在动画运行时将其值减小，则框架有可能观察到时间向后走，这可能会导致断言并且通常会干扰您的工作。

## Debugging performance problems

## 调试性能问题

To see why your application is causing relayouts or repaints, you can
set the
[`debugPrintMarkNeedsLayoutStacks`]({{site.api}}/flutter/rendering/debugPrintMarkNeedsLayoutStacks.html)
and
[`debugPrintMarkNeedsPaintStacks`]({{site.api}}/flutter/rendering/debugPrintMarkNeedsPaintStacks.html)
flags, respectively. These log a stack trace to the console any
time a render box is asked to relayout and repaint. You can use the
`debugPrintStack()` method from the `services` library to print your
own stack traces on demand, if this kind of approach is useful to you.

要了解为什么您的应用程序被重新布局或被重新绘制，您可以分别设置 [`debugPrintMarkNeedsLayoutStacks`]({{site.api}}/flutter/rendering/debugPrintMarkNeedsLayoutStacks.html) 和 [`debugPrintMarkNeedsPaintStacks`]({{site.api}}/flutter/rendering/debugPrintMarkNeedsPaintStacks.html) 标志，每当一个 render box 被要求重新布局和重新绘制时，这些
都会将堆栈跟踪记录到控制台。如果这种方法对您有用，您可以使用 `services` 库中的 `debugPrintStack()` 方法按需打印 stack traces。

### Measuring app startup time

### 测量 app 启动时间

To gather detailed information about the time it takes for your Flutter app to start, you can run
the `flutter run` command with the `trace-startup` and `profile` options.

要收集有关 Flutter 应用程序启动所需时间的详细信息，可以在运行 `flutter run` 时使用 `trace-startup` 和 `profile` 选项。

```
$ flutter run --trace-startup --profile
```
The trace output is saved as a JSON file called `start_up_info.json` under the `build` directory
of your Flutter project. The output lists the elapsed time from app startup to these trace
events (captured in microseconds):

跟踪输出被保存到 Flutter 工程目录在 `build` 目录下，一个名为 `start_up_info.json` 的 JSON 文件中。
输出列出了从应用程序启动到这些跟踪事件（以微秒捕获）所用的时间：

+ Time to enter the Flutter engine code.
  
  进入 Flutter 引擎时
  
+ Time to render the first frame of the app.

  展示应用第一帧时

+ Time to initialize the Flutter framework.

  初始化Flutter框架时

+ Time to complete the Flutter framework initialization.

  完成Flutter框架初始化时

For example:

例如：

```
{
  "engineEnterTimestampMicros": 96025565262,
  "timeToFirstFrameMicros": 2171978,
  "timeToFrameworkInitMicros": 514585,
  "timeAfterFrameworkInitMicros": 1657393
}
```

### Tracing any Dart code performance

### 跟踪 Dart 代码性能

To perform custom performance traces and measure wall/CPU time of
arbitrary segments of Dart code similar to what would be done on Android
with [systrace]({{site.android-dev}}/studio/profile/systrace),
use `dart:developer`'s
[Timeline]({{site.dart.api}}/stable/dart-developer/Timeline-class.html)
utilities to wrap the code you want to measure such as:

要执行自定义性能跟踪和测量 Dart 任意代码段的 wall/CPU 时间，类似于在 Android 上用 [systrace]({{site.android-dev}}/studio/profile/systrace) 执行的操作。使用 `dart:developer` 的 
[Timeline]({{site.dart.api}}/stable/dart-developer/Timeline-class.html) 工具来包含你想测量的代码，就像：

<!-- import 'dart:developer'; -->
<!-- skip -->
```dart
Timeline.startSync('interesting function');
// iWonderHowLongThisTakes();
Timeline.finishSync();
```

Then open your app's Observatory's timeline page, check the 'Dart'
recording option and perform the function you want to measure.

然后打开你的应用程序中 Observatory 的 timeline 页面，选中 'Dart' 记录选项，然后执行你想测量的功能。

Refreshing the page displays the chronological timeline records
of your app in Chrome's [tracing tool](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

刷新页面将在 Chrome 的 [tracing tool](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) 中显示应用
按照时间顺讯排列的 timeline 记录。

Be sure to `flutter run` your app with the `--profile` flag to ensure
that the runtime performance characteristics closely matches that of your
final product.

请确保通过 `--profile` 选项来运行 `flutter run` 命令来运行应用程序，以获得语最终产品最接近的运行时性能特征。

## PerformanceOverlay

To get a graphical view of the performance of your application, set
the `showPerformanceOverlay` argument of the
[`MaterialApp`]({{site.api}}/flutter/material/MaterialApp/MaterialApp.html)
constructor to true. The
[`WidgetsApp`]({{site.api}}/flutter/widgets/WidgetsApp-class.html)
constructor has a similar argument. (If you're not using `MaterialApp`
or `WidgetsApp`, you can get the same effect by wrapping your
application in a stack and putting a widget on your stack that was
created by calling
[`PerformanceOverlay.allEnabled()`]({{site.api}}/flutter/widgets/PerformanceOverlay/PerformanceOverlay.allEnabled.html).)

要想获得一个你的应用程序的性能视图，将 [`MaterialApp`]({{site.api}}/flutter/material/MaterialApp/MaterialApp.html) 构造函数的
`showPerformanceOverlay` 参数设为 true。
[`WidgetsApp`]({{site.api}}/flutter/widgets/WidgetsApp-class.html) 构造函数也有类似的参数（如果你没有使用 `MaterialApp`
或 `WidgetsApp`，你可以通过将你的应用程序包裹在一个通过 [`PerformanceOverlay.allEnabled()`]({{site.api}}/flutter/widgets/PerformanceOverlay/PerformanceOverlay.allEnabled.html) 创建的 stack 里来获得同样的效果）。

This shows two graphs. The top one is the time spent by the GPU
thread, the bottom one is the time spent by the CPU thread. The white
lines across the graphs show 16ms increments along the vertical axis;
if the graph ever goes over one of these lines then you are running at
less than 60Hz. The horizontal axis represents frames. The graph is
only updated when your application paints, so if it is idle the graph
stops moving.

这将显示两个图表。第一个是 GPU 线程花费的时间，最后一个是 CPU 线程花费的时间。 图中的白线以 16ms 增量沿纵轴显示; 
如果图超过这些线之一，那么说明运行频率低于 60Hz。横轴代表帧。 该图仅在应用程序绘制时更新，因此如果它处于空闲状态，该图将停止移动。

This should always be done in release mode, since in debug mode
performance is intentionally sacrificed in exchange for expensive
asserts that are intended to aid development, and thus the results
are misleading.

这应该总是在 release 模式下完成的，因为在 debug 模式下会故意牺牲性能来换取有助于开发调试的功能，如 assert，因此结果将会产生误导。

## Material grid

When developing applications that implement [Material
Design]({{site.material}}/design/introduction),
it can be helpful to overlay a [Material Design baseline
grid]({{site.material}}/design/layout/spacing-methods.html#baseline)
over the application to help verify alignments. To that end, the
[`MaterialApp`
constructor]({{site.api}}/flutter/material/MaterialApp/MaterialApp.html)
has a `debugShowMaterialGrid` argument which, when set to `true` in debug
mode, overlays such a grid.

You can also overlay such a grid on non-Material applications by using
the
[`GridPaper`]({{site.api}}/flutter/widgets/GridPaper-class.html)
widget directly.

当开发实现了 [MaterialDesign]({{site.material}}/design/introduction) 的应用程序时，将 [Material Design baseline
grid]({{site.material}}/design/layout/spacing-methods.html#baseline) 覆盖在应用程序上可能有助于验证对齐。
为此， [`MaterialApp`
constructor]({{site.api}}/flutter/material/MaterialApp/MaterialApp.html) 有一个 `debugShowMaterialGrid` 参数，
当在 debug 模式下设为 `true` 的时候，覆盖一个这样的网格。

您也可以使用 [`GridPaper`]({{site.api}}/flutter/widgets/GridPaper-class.html) 为 非 Material 应用程序覆盖一个这样的网格。

## Common problems

## 常见问题

{% comment %}
Rewrite the following when we have a larger collection of problems.
{% endcomment %}
The following is a problem that some have encountered on MacOS.

下面是一些在 MacOS 上遇到的问题。

### "Too many open files" exception (MacOS)

### "句柄数超出系统限制" 异常 (MacOS)

The default limit for Mac OS on how many files it can have open at a
time is rather low.  If you run into this limit,
increase the number of available
file handlers using the `ulimit` command:

Mac OS 在同一时间可以打开多少句柄的默认限制数相当低。如果你达到这个极限，
可以用 `ulimit` 命令增加可用句柄的数量：

```
ulimit -S -n 2048
```

If you use Travis or Cirrus for testing, increase the number of
available file handlers that they can open by adding the same line to
flutter/.travis.yml, or flutter/.cirrus.yml, respectively.

如果您使用 Travis 或 Cirrus 进行测试，请通过在 flutter/.travis.yml 或 flutter/.cirrus.yml 中增加同样的命令来
增加它们可以打开的句柄数量。
