---
title: Debugging Flutter apps programmatically
title: 添加输出代码的方式调试 Flutter 应用
description: How to enable various debugging tools from your code and at the command line.
description: 如何通过在代码中加入 log 输出。
tags: Flutter测试
keywords: Flutter调试,Flutter加log,Flutter输出
---

This doc describes debugging features that you can enable in code.
For a full list of debugging and profiling tools, see the
[Debugging][] page.

这篇文章描述了如何在代码中启用调试功能。
如果想了解整个调试和分析工具，可参见 [Debugging][] 页面.

## Logging

## 日志输出

{{site.alert.note}}

  You can view logs in DevTools' [Logging view][]
  or in your system console. This sections
  shows how to set up your logging statements.

  您可以在 DevTools 的 [Logging view][] 或系统控制台查看日志。 
  本节将展示如何设置日志的相关语句。

{{site.alert.end}}

You have two options for logging for your application.
The first is to use `stdout` and `stderr`.
Generally, this is done using `print()` statements,
or by importing `dart:io` and invoking methods on
`stderr` and `stdout`. For example:

在应用中有两种日志输出方式。第一种方式是使用 `stdout` 和 `stderr`。
通常，我们使用 `print()` 语句或者通过引入 `dart:io` 
并且调用 `stderr` 与 `stdout` 中的方法。如下：

<!-- skip -->
```dart
stderr.writeln('print me');
```

If you output too much at once, then Android sometimes
discards some log lines. To avoid this, use [`debugPrint()`][],
from Flutter's `foundation` library. This is a wrapper around `print`
that throttles the output to a level that avoids being dropped by
Android's kernel.

如果您一次输出太多，Android 有时可能会丢失一些日志行。
可以使用 Flutter 的 `foundation` 包中的 [`debugPrint()`][] 方法来避免这个问题。
它封装了 `print` 方法，通过控制输出的等级，从而避免输出内容被 Android 的内核丢弃。

The other option for application logging is to use the
`dart:developer` [`log()`][] function. This allows you to include a
bit more granularity and information in the logging output.
Here's an example:

另一种应用日志输出的方式是使用 `dart:developer` 中的 [`log()`][] 方法。
通过这种方式，您可以在输出日志中包含更精细化的信息。如下面这个示例：

<!-- skip -->
```dart
import 'dart:developer' as developer;

void main() {
  developer.log('log me', name: 'my.app.category');

  developer.log('log me 1', name: 'my.other.category');
  developer.log('log me 2', name: 'my.other.category');
}
```

You can also pass application data to the log call.
The convention for this is to use the `error:` named
parameter on the `log()` call, JSON encode the object
you want to send, and pass the encoded string to the
error parameter.

您也可以在打印日志时传入应用数据。
通常，在调用 `log()` 时也会使用命名参数 `error:`，
您可以通过 JSON 编码想要传入的对象，并将编码后的字符串传给 error 参数。

<!-- skip -->
```dart
import 'dart:convert';
import 'dart:developer' as developer;

void main() {
  var myCustomObject = ...;

  developer.log(
    'log me',
    name: 'my.app.category',
    error: jsonEncode(myCustomObject),
  );
}
```

If viewing the logging output in DevTool's logging view,
the JSON encoded error param is interpreted as a data object
and rendered in the details view for that log entry.

如果在 DevTool 的 logging 页面中查看日志输出情况，
JSON 编码的错误参数会被解释为一个数据对象，并呈现在该日志条目的 details 视图中。

## Setting breakpoints

## 设置断点

{{site.alert.note}}

  You can set breakpoints in DevTools' [Debugger][], or
  in the built-in debugger of your IDE. If you want to
  set breakpoints programmatically, use the following
  instructions.

  您可以在 DevTools 的 [Debugger][] 页面或在 IDE 的内置调试器中设置断点。
  如果您想要以编程方式设置断点，可以使用下面的指令。

{{site.alert.end}}

You can insert programmatic breakpoints using the
`debugger()` statement. To use this, you have to
import the `dart:developer` package at the top of
the relevant file.

您可以使用 `debugger()` 语句插入编程式断点。在此之前，
您需要在相关文件顶部引入 `dart:developer` 包。

The `debugger()` statement takes an optional `when`
argument that you can specify to only break when a
certain condition is true, as in the following example:

`debugger()` 语句有一个可选参数 `when`，
用来指定该断点触发的特定条件，如下这个示例：

<!-- skip -->
```dart
import 'dart:developer';

void someFunction(double offset) {
  debugger(when: offset > 30.0);
  // ...
}
```

## Debug flags: application layers

## Debug 标识： 应用程序层

{% comment %}  DevTool's doesn't currently print the render tree.
{{site.alert.note}}

  If you use [DevTools][] and its [Flutter inspector][] to
  view a visual layout of the render tree, you probably won't
  need to use these text-based dump tools.

  如果您使用 [DevTools][] 和它的 [Flutter inspector][] 来查看渲染树的可视布局，
  可能不需要使用这些基于文本的转储工具。

{{site.alert.end}}
{% endcomment %}

Each layer of the Flutter framework provides a function to dump its
current state or events to the console (using `debugPrint`).

Flutter 框架的每个 layer 都提供了一个函数，
用来将其当前状态或事件转储到控制台（使用 `debugPrint`）。

### Widget tree

### Widget 树

To dump the state of the Widgets library, call [`debugDumpApp()`][].
You can call this more or less any time that the application is not in
the middle of running a build sphae (in other words, not anywhere inside a
`build()` method), if the app has built at least once and is in debug mode
(in other words, any time after calling `runApp()`).

可以通过调用 [`debugDumpApp()`][] 方法转储 widget 库的状态，
如果应用已至少构建了一次，并且正处于调试模式时（`runApp()` 调用后的任何时间）。
只要应用不在运行构建阶段，您可以调用随意该方法（也就是说，不能在 `build()` 方法中使用它）。

For example, the following application:

如下面这个应用：

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
        child: TextButton(
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

The previous app outputs something like the following
(the precise details vary by the version of the framework,
the size of the device, and so forth):

上面应用的输出内容如下（具体细节因框架版本、设备大小等会有所差异）：

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
I/flutter ( 6559):                                               └TextButton()
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
you call `toStringDeep()` on the root of the widget tree.)
You'll see a lot of widgets in there that don't appear in your
application's source, because they are inserted by the framework's
widgets' build functions. For example,
[`InkFeature`][] is an implementation detail of the [`Material`][] widget.

这是一个「被拉平的树」，通过它们的各种 build 函数，显示出所有 widget 信息。
（如果您调用根 widget 的 `toStringDeep()` 方法，就会得到这棵树。）
您会看到很多 widget ，虽然它们没出现在应用的源码中，但却出现在这颗树中，
因为它们是由框架中 widget 的 build 函数插入的。
比如，[`Material`][] widget 的实现细节中就包括了 [`_InkFeature`][] 。

Since the `debugDumpApp()` call is invoked when the button changes
from being pressed to being released, it coincides with the
[`TextButton`][] object calling [`setState()`][]
and thus marking itself dirty. That is why, when you look at the dump you
should see that specific object marked as "dirty". You can also see what
gesture listeners have been registered; in this case, a single
GestureDetector is listed, and it is listening only to a "tap" gesture
("tap" is the output of a `TapGestureDetector`'s `toStringShort`
function).

当按钮被点击响应时，`debugDumpApp()` 方法被调用，
由于该方法与 [`TextButton`][] 对象调用 [`setState()`][] 相一致，
因此 TextButton 对应的元素会被标记为 dirty。
这就是为什么在查看转储信息时，您会看到被标记为「dirty」的特定对象。
您也可以看到已经被注册的手势监听器；在这个案例中，列出了一个 GestureDetector，
它只监听「tap」手势（这里「tap」是 `TapGestureDetector` 的 `toStringShort` 函数输出的）。

If you write your own widgets, you can add information by overriding
[`debugFillProperties()`][widget-fill]. Add [DiagnosticsProperty][]
objects to the method's argument, and call the superclass method.
This function is what the `toString` method uses to fill in the
widget's description.

对于您自定义的 widget，可以通过重写 [`debugFillProperties()`][widget-fill] 方法添加信息。
为方法中的参数添加 [DiagnosticsProperty][] 对象，并调用父类方法。
该方法在 widget 调用 `toString` 方法时会被填充到其描述信息中。

### Render tree

### Render 树

If you are trying to debug a layout issue, then the Widgets layer's
tree might be insufficiently detailed. In that case, you can dump the
rendering tree by calling [`debugDumpRenderTree()`][].
As with `debugDumpApp()`, you can call this more or less any time
except during a layout or paint phase. As a general rule,
calling it from a [frame callback][]
or an event handler is the best solution.

如果您试图调试一个布局问题，那么 Widget 层的树可能不够详细。
在这种情况下，您可以通过调用 [`debugDumpRenderTree()`][] 转储 Render 树信息。
和 `debugDumpApp()` 一样，除了在布局或绘制阶段，可以在任何时候调用它。
一般来说，最好在 [frame callback][] 或事件处理中调用它。

To call `debugDumpRenderTree()`, you need to add `import
'package:flutter/rendering.dart';` to your source file.

想要调用 `debugDumpRenderTree()` 方法，您需要在源码文件中添加 
`import 'package:flutter/rendering.dart';`。

The output for the previous tiny example would look something like
the following:

前面的小案例输出结构如下所示：

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
I/flutter ( 6559):            ╎                     │ creator: ConstrainedBox ← MaterialButton ← TextButton ← Center ←
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
I/flutter ( 6559):            ╎                       │   TextButton ← Center ← DefaultTextStyle ← ⋯
I/flutter ( 6559):            ╎                       │ parentData: <none>
I/flutter ( 6559):            ╎                       │ constraints: BoxConstraints(88.0<=w<=411.4, h=36.0)
I/flutter ( 6559):            ╎                       │ size: Size(98.0, 36.0)
I/flutter ( 6559):            ╎                       │
I/flutter ( 6559):            ╎                       └─child: RenderPointerListener relayoutBoundary=up3
I/flutter ( 6559):            ╎                         │ creator: Listener ← _GestureSemantics ← RawGestureDetector ←
I/flutter ( 6559):            ╎                         │   GestureDetector ← InkWell ← IconTheme ← DefaultTextStyle ←
I/flutter ( 6559):            ╎                         │   AnimatedDefaultTextStyle ← ConstrainedBox ← MaterialButton ←
I/flutter ( 6559):            ╎                         │   TextButton ← Center ← ⋯
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

This is the output of the root `RenderObject` object's
`toStringDeep()` function.

这是根节点 `RenderObject` 对象的 `toStringDeep()` 方法的输出结果。

When debugging layout issues, the key fields to look at are the
`size` and `constraints` fields. The constraints flow down the tree,
and the sizes flow back up.

在调试布局问题时，主要需要关注 `size` 和 `constraints` 两个字段。
constraint 沿树向下传递，而 size 则向上追溯。

For example, in the previous dump you can see that the window size,
`Size(411.4, 683.4)`, is used to force all the boxes down to the
[`RenderPositionedBox`][] to be the size of the screen, with
constraints of `BoxConstraints(w=411.4, h=683.4)`.
The `RenderPositionedBox`, which the dump says was created by a
[`Center`][] widget (as described by the `creator` field),
sets its child's constraints to a loose version of this:
`BoxConstraints(0.0<=w<=411.4, 0.0<=h<=683.4)`. The child, a
[`RenderPadding`][], further inserts these constraints to ensure
there is room for the padding, and thus the [`RenderConstrainedBox`][]
has a loose constraint of `BoxConstraints(0.0<=w<=395.4,
0.0<=h<=667.4)`. This object, which the `creator` field tells us is
probably part of the [`TextButton`][]'s definition,
sets a minimum width of 88 pixels on its contents and a
specific height of 36.0. (This is the `TextButton` class implementing
the Material Design guidelines regarding button dimensions.)

比如，从上面转储信息中可以看出窗口尺寸是 `Size(411.4, 683.4)`，
它用于强制 [`RenderPositionedBox`][] 之前的所有 box 为屏幕尺寸，
其约束为 `BoxConstraints(w=411.4, h=683.4)`。
从转储文件可以看出 `RenderPositionedBox` 是由 [`Center`][] widget 创建的
（可以从 `creator` 字段的描述看出来），并将其 child 的约束条件变得松散：
约束范围是 `BoxConstraints(0.0<=w<=411.4, 0.0<=h<=683.4)`。
其后代的 [`RenderPadding`][] 进一步插入这些约束来确保留出空间作为内边距，
因此 [`RenderConstrainedBox`][] 有一个宽松的约束，该约束为：
`BoxConstraints(0.0<=w<=395.4,0.0<=h<=667.4)`。
`creator` 字段告诉我们，这个对象很可能是 [`TextButton`][] 定义的一部分，
它内容的最小宽度为 88 像素，具体高度为 36.0。（ `TextButton` 是 Material Design 中按钮尺寸标准的实现。）

The inner-most `RenderPositionedBox` loosens the constraints again,
this time to center the text within the button. The
[`RenderParagraph`][] picks its size based on its contents.
If you now follow the sizes back up the chain,
you'll see how the text's size is what influences the
width of all the boxes that form the button, as they all take their
child's dimensions to size themselves.

最内部的 `RenderPositionedBox` 再次放松了约束，这次是把文本放在了按钮的中间。
[`RenderParagraph`][] 可以根据其内容确定自身大小。
如果您现在沿着这条链路往回追溯渲染对象的尺寸大小，
您就会看到在文本的大小是如何影响按钮边框大小的形成过程，
因为它们都会根据子组件的尺寸自行调整大小。

Another way to notice this is by looking at the "relayoutSubtreeRoot"
part of the descriptions of each box, which essentially tells you how
many ancestors depend on this element's size in some way.
Thus the `RenderParagraph` has a `relayoutSubtreeRoot=up8`,
meaning that when the `RenderParagraph` is dirtied,
eight ancestors also have to be dirtied because they might be
affected by the new dimensions.

注意到这点的另一种方式为：查看每个 box 的「relayoutSubtreeRoot」部分，
它本质上在告诉您，在某种程度上有多少祖先在依赖于这个元素的尺寸。
因此，`RenderParagraph` 有 `relayoutSubtreeRoot=up8`，
这意味着当 `RenderParagraph` 被标为 dirty 时，8 个祖先也会被标为 dirty，
因为它们可能会受到新尺寸的影响。

If you write your own render objects, you can add information to the
dump by overriding [`debugFillProperties()`][render-fill].
Add [DiagnosticsProperty][]
objects to the method's argument, and call the superclass method.

对于您自己写的 render 对象，可以通过重写 [`debugFillProperties()`][widget-fill] 
方法为转储数据添加信息。在方法中的参数中添加 [DiagnosticsProperty][] 对象，并调用父类方法即可。

### Layer tree

### Layer 树

If you are trying to debug a compositing issue, you can use
[`debugDumpLayerTree()`][].
For the previous example, it would output:

如果您在尝试调试一个合成问题，您可以使用 [`debugDumpLayerTree()`][]。
在前面案例中调用这个方法，会输出如下结果：

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

这是根 `Layer` 对象调用 `toStringDeep` 方法时的输出结果。

The transform at the root is the transform that applies the device
pixel ratio; in this case, a ratio of 3.5 device pixels for every
logical pixel.

根结点的 transform 是设备像素比率的变换；在该示例中，每个逻辑像素对应 3.5 个设备像素。

The `RepaintBoundary` widget, which creates a `RenderRepaintBoundary`
in the render tree, creates a new layer in the layer tree. This is
used to reduce how much needs to be repainted.

`RepaintBoundary` widget 在 render 树中创建了一个 `RenderRepaintBoundary`，
并在 layer 树中创建了一个新的层。这可以用来减少需要重绘的次数。

### Semantics tree

### Semantics 树

You can also obtain a dump of the Semantics tree
(the tree presented to the system accessibility APIs) using
[`debugDumpSemanticsTree()`][].  To use this,
you have to have first enable accessibility, for example, by
enabling a system accessibility tool or the `SemanticsDebugger`.

您也可以使用 [`debugDumpSemanticsTree()`][] 获得 Semantics 树
（该树提供了系统的 accessibility API）的转储信息。想要使用它，
首先必须启用 accessibility，例如，通过启用系统 accessibility 工具或 `SemanticsDebugger`。

For the previous example, it would output the following:

在前面案例中调用这个方法，会输出如下结果：

```
I/flutter : SemanticsNode(0; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  ├SemanticsNode(1; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  │ └SemanticsNode(2; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4); canBeTapped)
I/flutter :  └SemanticsNode(3; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :    └SemanticsNode(4; Rect.fromLTRB(0.0, 0.0, 82.0, 36.0); canBeTapped; "Dump App")
```

<!-- this tree is bad, see {{site.github}}/flutter/flutter/issues/2476 -->

### Scheduling

To find out where your events happen relative to the frame's
begin/end, you can toggle the [`debugPrintBeginFrameBanner`][]
and the [`debugPrintEndFrameBanner`][] booleans to print the
beginning and end of the frames to the console.

如果您想要找到事件触发对应的开始或结束帧，可以将 [`debugPrintBeginFrameBanner`][] 
和 [`debugPrintEndFrameBanner`][] 这两个布尔值切换为 true，在控制台中打印开始和结束帧的信息。

For example:

比如：

```
I/flutter : ▄▄▄▄▄▄▄▄ Frame 12         30s 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

The [`debugPrintScheduleFrameStacks`][] flag can also be used
to print the call stack causing the current frame to be scheduled.

当前帧被调度时，[`debugPrintScheduleFrameStacks`][] 标志也可以用来打印调用堆栈信息。


## Debug flags: layout

## 调试标志：布局

You can also debug a layout problem visually, by setting
[`debugPaintSizeEnabled`][] to `true`.
This is a boolean from the `rendering` library. It can be
enabled at any time and affects all painting while it is true.
The easiest way to set it is at the top of your `void main()`
entry point. See an example in the following code:

通过将 [`debugPaintSizeEnabled`][] 设置为 true，您也可以可视地调试布局问题。
该布尔值在 `rendering` 库中，可以在任何时候被启用，
并且当其为 true 时，会影响界面上所有的绘制。
最简单的方式是在程序顶部入口 `void main()`中设置它，如下案例代码所示：

<!-- skip -->
```dart
//add import to rendering library
import 'package:flutter/rendering.dart';

void main() {
  debugPaintSizeEnabled=true;
  runApp(MyApp());
}
```

When it is enabled, all boxes get a bright teal border,
padding (from widgets like `Padding`) is shown in faded
blue with a darker blue box around the child, alignment
(from widgets like `Center` and `Align`) is shown with
yellow arrows, and spacers (from widgets like
`Container` when they have no child) are shown in gray.

当它被启用时，所有的 box 都会有明亮的蓝绿色边框，内边距（来自于 widgets，比如 `Padding`）
显示为淡蓝色，并在 child 周围有一个深蓝色的 box，对齐方式（来自于 widgets，比如 `Center` 和 `Align`）
显示为黄色箭头，还有间隔（来自于 widgets，比如当 `Container` 没有 child 时）显示灰色。

The [`debugPaintBaselinesEnabled`][] flag
does something similar but for objects with baselines.
The alphabetic baseline is shown in bright green and the
ideographic baseline in orange.

`debugPaintBaselinesEnabled`][] 标志和它类似，但只针对于带有基线的对象。
alphabetic 基线用亮绿色显示，ideographic 基线用橙色显示。

The [`debugPaintPointersEnabled`][] flag turns on a
special mode whereby any objects that are being tapped
get highlighted in teal. This can help you determine
whether an object is somehow failing to correctly hit
test (which might happen if, for instance, it is actually
outside the bounds of its parent and thus not
being considered for hit testing in the first place).

[`debugPaintPointersEnabled`][] 标志会打开一个特殊模式，任何被选中的对象都会以蓝绿色高亮显示。
这可以帮助您确定对象是否会以某种方式未能正确命中测试（这是可能会发生的，例如，
实际上它在父节点的边界之外，因此一开始就不用考虑进行命中测试）。

If you're trying to debug compositor layers, for example
to determine whether and where to add `RepaintBoundary`
widgets, you can use the [`debugPaintLayerBordersEnabled`][]
flag, which outlines each layer's bounds in orange,
or the [`debugRepaintRainbowEnabled`][] flag,
which causes layers to be overlayed with a rotating set of
colors whenever they are repainted.

如果您试图调试合成层，比如要确定是否应该在某处添加 `RepaintBoundary` widget，
您可以使用 [`debugPaintLayerBordersEnabled`][] 标志，来用为每个 layer 的边界显示橙色边框，
或使用 [`debugRepaintRainbowEnabled`][] 标志，这会使得每当重新绘制图层时，
边框的颜色就会被一组轮转的颜色覆盖。

All of these flags only work in [debug mode][].
In general, anything in the Flutter framework that starts with
"`debug...`" only works in debug mode.

上面所有的标志都只在 [调试模式][debug mode] 下生效。一般来说，Flutter 
框架中以「`debug...`」开头的都只能在调试模式下工作。

## Debugging animations

## 调试动画

{{site.alert.note}}

  The easiest way to debug animations is to slow them down.
  You can do this using the **Slow Animations** button in
  DevTools' [Inspector view][], which slows down the
  animation by 5x. If you want more control over the
  amount of slowness, use the following instructions.

  调试动画最简单的方法是放慢它们的速度。您可以在 DevTools 的 [Inspector view][] 
  通过 **Slow Animations** 按钮来实现动画慢放，这会使动画速度降低 5 倍。
  如果您希望控制更多的慢速程度，请参考下面的说明。

{{site.alert.end}}

Set the [`timeDilation`][] variable (from the `scheduler`
library) to a number greater than 1.0, for instance, 50.0.
It's best to only set this once on app startup. If you
change it on the fly, especially if you reduce it while
animations are running, it's possible that the framework
will observe time going backwards, which will probably
result in asserts and generally interfere with your efforts.

将 [`timeDilation`][] 变量（来自 `scheduler` 库）设置为大于 1.0 的数字，例如，50.0。
该操作最好在应用启动时只执行一次。如果您动态地改变，尤其是在动画运行时减少它时，
框架可能会观察到时间倒退，这可能会导致断言失败，通常这会让您徒劳无功。

## Debug flags: performance

## 调试标志：性能

{{site.alert.note}}

  You can achieve similar results to some of these debug
  flags using [DevTools][]. Some of the debug flags aren't
  particularly useful. If you find a flag that has
  functionality you would like to see added to [DevTools][],
  please [file an issue][].

  您可以使用 [DevTools][] 实现和这些调试标志类似的结果。有些调试标记不是特别有用。
  如果您发现一个标志，并想把该功能添加到 [DevTools][]，请 [提出一个 issue][file an issue]。

{{site.alert.end}}

Flutter provides a wide variety of debug flags and functions
to help you debug your app at various points along the
development cycle. To use these features, you must compile
in debug mode.  The following list, while not complete,
highlights some of flags (and one function) from the
[rendering library][] for debugging performance issues.

Flutter 提供了各种各样的调试标志和功能，来帮助您在开发周期的不同阶段调试应用。
想要使用这些特性，必须在调试模式下编译。下面的列表虽然不完整，
但是突出显示了 [rendering library][] 中用于调试性能问题的一些标志（以及一个函数）。

You can set these flags either by editing the framework code,
or by importing the module and setting the value in your
`main()` method, following by a hot restart.

您可以通过修改框架的代码来设置这些标志，或者将模块导入，
并在 `main()` 方法中设置标志值，然后热重启。

<dl markdown="1">
<dt markdown="1">[`debugDumpRenderTree()`][]</dt>
<dd markdown="1">
<p markdown="1">Call this function when not in a layout or repaint
   phase to dump the rendering tree to the console.
   (Pressing **t** from `flutter run` calls this command.)
   Search for "RepaintBoundary" to see diagnostics
   on how useful a boundary is.</p>
<p markdown="1">当不在布局或重新绘制阶段时，调用此函数将 render 树转储到控制台。
  （可以从 `flutter run`  按下 **t** 调用此命令。）
  通过搜索其中的「RepaintBoundary」可以查看关于边界的有用诊断信息。</p>
<dt markdown="1">[`debugPaintLayerBordersEnabled`][]</dt>
<dd markdown="1">PENDING
<dt markdown="1">[`debugRepaintRainbowEnabled`][]</dt>
<dd markdown="1">
<p markdown="1">You can enable this flag in the Flutter
    inspector by selecting the **Repaint Rainbow** button.
    If any static widgets are rotating through the colors of the rainbow
    (for example, a static header), those areas are candidates for adding
    repaint boundaries.</p>
<p markdown="1">您可以通过点击 **Repaint Rainbow** 按钮，
    在 Flutter inspector 中启用此标志。
    如果任何静态 widget 在彩虹七颜色之间轮转（比如一个静态标题），
    那么这些区域就可能需要添加重新绘制边界进行优化。</p>
<dt markdown="1">[`debugPrintMarkNeedsLayoutStacks`][]</dt>
<dd markdown="1">
<p markdown="1">Enable this flag if you're seeing more layouts
    than you expect (for example, on the timeline, on a profile,
    or from a `print` statement inside a layout method).
    Once enabled, the console is flooded with stack traces
    showing why each render object is being marked dirty for
    layout. You can use the `debugPrintStack()` method from the
    `services` library to print your own stack traces on demand,
    if this kind of approach is useful to you.</p>
<p markdown="1">如果您看到的布局比预期的要多
    （比如，在 timeline 、profile 或者一个布局方法中的 `print` 语句中)，
    可以启用这个标志。一旦启用，控制台将会充满堆栈跟踪，
    来显示在布局时每个渲染对象被标记为 dirty 的原因。
    如果有需要的话，您可以使用 `services` 库中的 `debugPrintStack()` 方法
    按需打印出堆栈的跟踪信息。</p>
<dt markdown="1">[`debugPrintMarkNeedsPaintStacks`][]</dt>
<dd markdown="1">
<p markdown="1">Similar to `debugPrintMarkNeedsLayoutStacks`,
    but for excess painting. You can use the `debugPrintStack()`
    method from the `services` library to print your own stack
    traces on demand, if this kind of approach is useful to you.</p>
<p markdown="1">它和 `debugPrintMarkNeedsLayoutStacks` 类似，
    但用于多余的绘制。如果有需要的话，您可以使用 `services` 库中的
    `debugPrintStack()` 方法按需打印出堆栈的跟踪信息。</p>

### Tracing Dart code performance

### 跟踪 Dart 代码性能

{{site.alert.note}}

  You can use the DevTools [Timeline view][] to perform traces.
  You can also import and export trace files into the Timeline view,
  but only files generated by DevTools.

  您可以使用 DevTools 中的 [Timeline view][] 来执行跟踪。
  您还可以将跟踪文件导入和导出到 Timeline view 中，但这只支持由 DevTools 生成的文件。

{{site.alert.end}}

To perform custom performance traces programmatically and
measure wall/CPU time of arbitrary segments of Dart code
similar to what would be done on Android with [systrace][],
use `dart:developer` [Timeline][] utilities to wrap the
code you want to measure such as:

想要以编程方式执行自定义性能跟踪和测量任意代码片段的 wall/CPU 时间，
这类似于在 Android 上使用 [systrace][]，您可以使用 `dart:developer` 包中的 
[Timeline][] 类提供的一些静态方法包裹您想测量的代码，比如:

<!-- skip -->
```dart
import 'dart:developer';

Timeline.startSync('interesting function');
// iWonderHowLongThisTakes();
Timeline.finishSync();
```

Then open your app's Observatory's timeline page, check the 'Dart'
recording option and perform the function you want to measure.

然后打开您应用观测台的 timeline 页面，勾选 “Dart” 记录选项，并执行您想要测量的方法。

Refreshing the page displays the chronological timeline records
of your app in Chrome's [tracing tool][].

在 Chrome 的 [跟踪工具][tracing tool] 中刷新页面，展示您应用的 timeline 时序记录。

Be sure to run your app in [profile mode][] to ensure that the
runtime performance characteristics closely match that of your
final product.

确保以 [分析模式][profile mode] 运行您的应用，来确保运行时的性能表现与您的最终产品相近。

## Performance overlay

## 性能浮层

{{site.alert.note}}

  You can toggle display of the performance overlay on
  your app using the **Performance Overlay** button in the
  [Flutter inspector][]. If you prefer to do it in code,
  use the following instructions.

  您可以使用 [Flutter inspector][] 中的 **Performance Overlay** 按钮，来切换显示的应用的性能浮层。
  如果您更喜欢用代码来完成它，请参考下面的说明。

{{site.alert.end}}

You can programmatically enable the PerformanceOverlay widget by
setting the `showPerformanceOverlay` property to `true` on the
[`MaterialApp`][], [`CupertinoApp`][], or [`WidgetsApp`][]
constructor:

您可以通过编程方式启用 PerformanceOverlay widget，在 [`MaterialApp`][]、[`CupertinoApp`][] 
或 [`WidgetsApp`][] 构造函数中，将 `showPerformanceOverlay` 属性设置为 `true` 即可。

<!-- skip -->
{% prettify dart %}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      [[highlight]]showPerformanceOverlay: true,[[/highlight]]
      title: 'My Awesome App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'My Awesome App'),
    );
  }
}
{% endprettify %}

(If you're not using `MaterialApp`, `CupertinoApp`,
or `WidgetsApp`, you can get the same effect by wrapping your
application in a stack and putting a widget on your stack that was
created by calling [`PerformanceOverlay.allEnabled()`][].)

（如果您没有使用 `MaterialApp`、`CupertinoApp` 或 `WidgetsApp`，可以通过将应用包装在一个 Stack 中，
并通过调用 [`PerformanceOverlay.allEnabled()`][] 来创建一个 widget，来获得相同的效果。）

For information on how to interpret the graphs in the overlay,
see [The performance overlay][] in
[Profiling Flutter performance][].

有关如何解释浮层中的图形的信息，可以参见 [Flutter 性能分析][Profiling Flutter performance] 中的 [性能图层][The performance overlay]。

## Widget alignment grid

## Widget 对齐网格

You can programmatically overlay a
[Material Design baseline grid][] on top of your app to
help verify alignments by using the
`debugShowMaterialGrid` argument in the
[`MaterialApp` constructor][].

您可以通过编程的方式将 [Material Design 基线网格][Material Design baseline grid] 覆盖在应用的顶层来辅助对齐校验，
通过使用 [`MaterialApp` 构造函数][`MaterialApp` constructor] 中的 `debugShowMaterialGrid` 参数进行设置。

In non-Material applications, you can achieve a similar
effect by using a [`GridPaper`][] widget directly.

在非 Material 应用中，您可以通过直接使用 [`GridPaper`][] widget 来达到类似的效果。

[`GridPaper`]: {{site.api}}/flutter/widgets/GridPaper-class.html
[Material Design]: {{site.material}}/design/introduction
[`MaterialApp` constructor]: {{site.api}}/flutter/material/MaterialApp/MaterialApp.html
[Material Design baseline grid]: {{site.material}}/design/layout/spacing-methods.html#baseline
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp/MaterialApp.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`PerformanceOverlay.allEnabled()`]: {{site.api}}/flutter/widgets/PerformanceOverlay/PerformanceOverlay.allEnabled.html
[tracing tool]: https://www.chromium.org/developers/how-tos/trace-event-profiling-tool
[systrace]: {{site.android-dev}}/studio/profile/systrace
[Timeline]: {{site.dart.api}}/stable/dart-developer/Timeline-class.html
[`timeDilation`]: {{site.api}}/flutter/scheduler/timeDilation.html
[`debugPrintMarkNeedsLayoutStacks`]: {{site.api}}/flutter/rendering/debugPrintMarkNeedsLayoutStacks.html
[`debugPrintMarkNeedsPaintStacks`]: {{site.api}}/flutter/rendering/debugPrintMarkNeedsPaintStacks.html
[`debugRepaintRainbowEnabled`]: {{site.api}}/flutter/rendering/debugRepaintRainbowEnabled.html
[`debugPaintLayerBordersEnabled`]: {{site.api}}/flutter/rendering/debugPaintLayerBordersEnabled.html
[`debugPaintPointersEnabled`]: {{site.api}}/flutter/rendering/debugPaintPointersEnabled.html
[`debugPaintBaselinesEnabled`]: {{site.api}}/flutter/rendering/debugPaintBaselinesEnabled.html
[`debugPaintSizeEnabled`]: {{site.api}}/flutter/rendering/debugPaintSizeEnabled.html
[`debugPrintScheduleFrameStacks`]: {{site.api}}/flutter/scheduler/debugPrintScheduleFrameStacks.html
[`debugPrintBeginFrameBanner`]: {{site.api}}/flutter/scheduler/debugPrintBeginFrameBanner.html
[`debugPrintEndFrameBanner`]: {{site.api}}/flutter/scheduler/debugPrintEndFrameBanner.html
[`debugDumpSemanticsTree()`]: {{site.api}}/flutter/rendering/debugDumpSemanticsTree.html
[`debugDumpRenderTree()`]: {{site.api}}/flutter/rendering/debugDumpRenderTree.html
[`debugDumpLayerTree()`]: {{site.api}}/flutter/rendering/debugDumpLayerTree.html
[`debugDumpApp()`]: {{site.api}}/flutter/widgets/debugDumpApp.html
[`debugPrint()`]: {{site.api}}/flutter/foundation/debugPrint.html
[`RenderParagraph`]: {{site.api}}/flutter/rendering/RenderParagraph-class.html
[`RenderPositionedBox`]: {{site.api}}/flutter/rendering/RenderPositionedBox-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`RenderPadding`]: {{site.api}}/flutter/rendering/RenderPadding-class.html
[`RenderConstrainedBox`]: {{site.api}}/flutter/rendering/RenderConstrainedBox-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[frame callback]: {{site.api}}/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html
[render-fill]: {{site.api}}/flutter/rendering/Layer/debugFillProperties.html
[widget-fill]: {{site.api}}/flutter/widgets/Widget/debugFillProperties.html
[DiagnosticsProperty]: {{site.api}}/flutter/foundation/DiagnosticsProperty-class.html
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
[`InkFeature`]: {{site.api}}/flutter/material/InkFeature-class.html
[`Material`]: {{site.api}}/flutter/material/Material-class.html
[Flutter's modes]: /docs/testing/build-modes
[profile mode]: /docs/testing/build-modes#profile
[debug mode]: /docs/testing/build-modes#debug
[release mode]: /docs/testing/build-modes#release
[DevTools]: /docs/development/tools/devtools
[Flutter inspector]: /docs/development/tools/devtools/inspector
[Logging view]: /docs/development/tools/devtools/logging
[Flutter enabled IDE/editor]: /docs/get-started/editor
[`log()`]: {{site.api}}/flutter/dart-developer/log.html
[Timeline view]: /docs/development/tools/devtools/timeline
[Debugger]: /docs/development/tools/devtools/debugger
[Inspector view]: /docs/development/tools/devtools/inspector
[The performance overlay]: /docs/perf/rendering/ui-performance#the-performance-overlay
[Profiling Flutter performance]: /docs/perf/rendering/ui-performance
[Debugging]: /docs/testing/debugging
[file an issue]: {{site.github}}/flutter/devtools/issues
[rendering library]: {{site.api}}/flutter/rendering/rendering-library.html
