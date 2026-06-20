---
# title: Debug Flutter apps from code
title: 通过输出代码的方式调试 Flutter 应用
# description: >
#   How to enable various debugging tools from
#   your code and at the command line.
description: >
  如何通过在代码中加入 log 输出。
tags: Flutter测试
keywords: Flutter调试,Flutter加log,Flutter输出
ai-translated: true
---

<?code-excerpt path-base="testing/code_debugging"?>

This guide describes which debugging features you can enable in your code.
For a full list of debugging and profiling tools, check out the
[Debugging][] page.

本指南说明可在代码中启用哪些调试功能。
完整的调试与分析工具列表请参阅 [调试][Debugging] 页面。

## Add logging to your application

## 为应用添加日志

The following list contains a few statements that you can use to log the
behavior of your application. You can view your logs in DevTools'
[Logging view][] or in your system console.

以下列出可用于记录应用行为的若干语句。
可在 DevTools 的 [日志视图][Logging view] 或系统控制台中查看日志。

*   [`print()`][]: Prints a `stdout` (standard output) message. Part of the
    `dart:io` library.

    [`print()`][]：打印一条 `stdout`（标准输出）消息。属于 `dart:io` library。

*   [`stderr.method_to_invoke()`][]: Prints a `stderr` (standard error) message.
    Replace `method_to_invoke()` with a method supported by the `stderr`
    property, such as `writeln()` or `write()`. Often used in a `try...catch`
    block. Part of the `dart:io` library.

    [`stderr.method_to_invoke()`][]：打印一条 `stderr`（标准错误）消息。
    将 `method_to_invoke()` 替换为 `stderr` 属性支持的方法，
    例如 `writeln()` 或 `write()`。常用于 `try...catch` 块中。
    属于 `dart:io` library。

    <?code-excerpt "lib/main.dart (stderr)"?>
    ```dart
    stderr.writeln('print me');
    ```

*   [`log()`][]: Includes greater granularity and more information in the
    logging output. Part of the `dart:developer` library.

    [`log()`][]：在日志输出中提供更细的粒度与更多信息。
    属于 `dart:developer` library。

*   [`debugPrint()`][]: If too much output results in discarded log lines, use
    this to keep those lines. Will print messages in release mode unless part
    of a debug mode check or an assert. Part of the `foundations` library.

    [`debugPrint()`][]：若输出过多导致日志行被丢弃，可用它保留这些行。
    除非处于 debug 模式检查或 assert 中，否则在 release 模式下也会打印消息。
    属于 `foundations` library。

### Example 1 {:.no_toc}

### 示例 1 {:.no_toc}

<?code-excerpt "lib/main.dart (log)"?>
```dart
import 'dart:developer' as developer;

void main() {
  developer.log('log me', name: 'my.app.category');

  developer.log('log me 1', name: 'my.other.category');
  developer.log('log me 2', name: 'my.other.category');
}
```

You can also pass app data to the log call.
The convention for this is to use the `error:` named
parameter on the `log()` call, JSON encode the object
you want to send, and pass the encoded string to the
error parameter.

你也可以向 log 调用传入应用数据。
惯例是在 `log()` 调用上使用 `error:` 命名参数，
对要发送的对象进行 JSON 编码，
并将编码后的字符串传给 error 参数。

### Example 2 {:.no_toc}

### 示例 2 {:.no_toc}

<?code-excerpt "lib/app_data.dart (pass-data)"?>
```dart
import 'dart:convert';
import 'dart:developer' as developer;

void main() {
  var myCustomObject = MyCustomObject();

  developer.log(
    'log me',
    name: 'my.app.category',
    error: jsonEncode(myCustomObject),
  );
}
```

DevTool's logging view interprets the JSON encoded error parameter
as a data object.
DevTool renders in the details view for that log entry.

DevTools 的日志视图将 JSON 编码的 error 参数解析为数据对象，并在该日志条目的详情视图中渲染。

## Set breakpoints

## 设置断点

You can set breakpoints in DevTools' [Debugger][] or
in the built-in debugger of your IDE.

你可以在 DevTools 的 [调试器][Debugger] 或 IDE 内置调试器中设置断点。

To set programmatic breakpoints:

要设置编程式断点：

1. Import the `dart:developer` package into the relevant file.

   在相关文件中 import `dart:developer` package。

1. Insert programmatic breakpoints using the `debugger()` statement.
   This statement takes an optional `when` argument.
   This boolean argument sets a break when the given condition resolves to true.

   使用 `debugger()` 语句插入编程式断点。该语句接受可选的 `when` 参数；
   当给定条件为 true 时，该布尔参数会触发断点。

   **Example 3** illustrates this.

   **示例 3** 演示了这一点。

### Example 3 {:.no_toc}

### 示例 3 {:.no_toc}

<?code-excerpt "lib/debugger.dart"?>
```dart
import 'dart:developer';

void someFunction(double offset) {
  debugger(when: offset > 30);
  // ...
}
```

## Debug app layers using flags

## 使用标志调试应用各层

Each layer of the Flutter framework provides a function to dump its
current state or events to the console using the `debugPrint` property.

Flutter 框架的每一层都提供函数，可通过 `debugPrint` 属性将当前状态或事件 dump 到控制台。

:::note
All of the following examples were run as macOS native apps on
a MacBook Pro M1. These will differ from any dumps your
development machine prints.

以下示例均在 MacBook Pro M1 上以 macOS 原生应用运行。
你的开发机打印的 dump 内容可能不同。
:::

:::tip
Each render object in any tree includes the first five
hexadecimal digits of its [`hashCode`][].
This hash serves as a unique identifier for that render object.

任意树中的每个 render object 都包含其 [`hashCode`][] 的前五位十六进制数字。
该哈希值作为该 render object 的唯一标识符。
:::

[`hashCode`]: {{site.api}}/flutter/rendering/TextSelectionPoint/hashCode.html

### Print the widget tree

### 打印 widget 树

To dump the state of the Widgets library,
call the [`debugDumpApp()`][] function.

要 dump Widgets library 的状态，请调用 [`debugDumpApp()`][] 函数。

1. Open your source file.

   打开源文件。

1. Import `package:flutter/rendering.dart`.

   import `package:flutter/rendering.dart`。

1. Call the [`debugDumpApp()`][] function from within the `runApp()` function.
   You need your app in debug mode.
   You cannot call this function inside a `build()` method
   when the app is building.

   在 `runApp()` 函数内调用 [`debugDumpApp()`][]。
   应用须处于 debug 模式。应用正在 build 时，
   不能在 `build()` 方法内调用此函数。

1. If you haven't started your app, debug it using your IDE.

   若尚未启动应用，请用 IDE 进行调试。

1. If you have started your app, save your source file.
   Hot reload re-renders your app.

   若已启动应用，保存源文件。热重载会重新渲染应用。

#### Example 4: Call `debugDumpApp()`

#### 示例 4：调用 `debugDumpApp()`

<?code-excerpt "lib/dump_app.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpApp();
          },
          child: const Text('Dump Widget Tree'),
        ),
      ),
    );
  }
}
```

This function recursively calls the `toStringDeep()` method starting with
the root of the widget tree. It returns a "flattened" tree.

该函数从 widget 树根节点起递归调用 `toStringDeep()` 方法，返回「扁平化」的树。

**Example 4** produces the following widget tree. It includes:

**示例 4** 会生成如下 widget 树，其中包括：

* All the widgets projected through their various build functions.

  通过各自 build 函数投射出来的所有 widget。

* Many widgets that don't appear in your app's source.
  The framework's widgets' build functions insert them during the build.

  许多未出现在应用源码中的 widget。框架 widget 的 build 函数在 build 过程中插入它们。

  The following tree, for example, shows [`_InkFeatures`][].
  That class implements part of the [`Material`][] widget.
  It doesn't appear anywhere in the code in **Example 4**.

  例如下面的树中出现了 [`_InkFeatures`][]。该类实现 [`Material`][] widget 的一部分，在 **示例 4** 的代码中并未出现。

<details>
<summary><strong><t>Expand to view the widget tree for Example 4</t><t>展开查看示例 4 的 widget 树</t></strong></summary>

{% render "docs/testing/trees/widget-tree.md" -%}

</details>

When the button changes from being pressed to being released,
this invokes the `debugDumpApp()` function.
It also coincides with the [`TextButton`][] object calling [`setState()`][]
and thus marking itself dirty.
This explains why a Flutter marks a specific object as "dirty".
When you review the widget tree, look for a line that resembles the following:

当按钮从按下变为释放时，会调用 `debugDumpApp()`。
此时 [`TextButton`][] 对象也会调用 [`setState()`][] 并将自身标记为 dirty。
这解释了 Flutter 为何将特定对象标为「dirty」。
查看 widget 树时，请寻找类似下面的一行：

```plaintext
└TextButton(dirty, dependencies: [MediaQuery, _InheritedTheme, _LocalizationsScope-[GlobalKey#5880d]], state: _ButtonStyleState#ab76e)
```

If you write your own widgets, override the
[`debugFillProperties()`][widget-fill] method to add information.
Add [DiagnosticsProperty][] objects to the method's argument
and call the superclass method.
The `toString` method uses this function to fill in the widget's description.

若编写自定义 widget，可重写 [`debugFillProperties()`][widget-fill] 方法以添加信息。
向方法参数添加 [DiagnosticsProperty][] 对象并调用超类方法。
`toString` 方法会用该函数填充 widget 的描述。

### Print the render tree

### 打印 render 树

When debugging a layout issue, the Widgets layer's tree might lack detail.
The next level of debugging might require a render tree.
To dump the render tree:

调试布局问题时，Widgets 层的树可能不够详细，下一层调试可能需要 render 树。要 dump render 树：

1. Open your source file.

   打开源文件。

1. Call the [`debugDumpRenderTree()`][] function.
   You can call this any time except during a layout or paint phase.
   Consider calling it from a [frame callback][] or an event handler.

   调用 [`debugDumpRenderTree()`][]。除 layout 或 paint 阶段外均可调用；
   可考虑在 [帧回调][frame callback] 或事件处理器中调用。

1. If you haven't started your app, debug it using your IDE.

   若尚未启动应用，请用 IDE 调试。

1. If you have started your app, save your source file.
   Hot reload re-renders your app.

   若已启动应用，保存源文件。热重载会重新渲染应用。

#### Example 5: Call `debugDumpRenderTree()`

#### 示例 5：调用 `debugDumpRenderTree()`

<?code-excerpt "lib/dump_render_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpRenderTree();
          },
          child: const Text('Dump Render Tree'),
        ),
      ),
    );
  }
}
```

When debugging layout issues, look at the `size` and `constraints` fields.
The constraints flow down the tree and the sizes flow back up.

调试布局时，请关注 `size` 和 `constraints` 字段。
constraints 沿树向下传递，size 向上回传。

<details>
<summary><strong><t>Expand to view the render tree for Example 5</t><t>展开查看示例 5 的 render 树</t></strong></summary>

{% render "docs/testing/trees/render-tree.md" -%}

</details>

In the render tree for **Example 5**:

**示例 5** 的 render 树中：

* The `RenderView`, or window size, limits all render objects up to and
  including [`RenderPositionedBox`][]`#dc1df` render object
  to the size of the screen.
  This example sets the size to `Size(800.0, 600.0)`

  `RenderView`（窗口尺寸）将直至 [`RenderPositionedBox`][]`#dc1df` render object 在内的所有 render object 限制为屏幕大小。
  本示例将尺寸设为 `Size(800.0, 600.0)`。

* The `constraints` property of each render object limits the size
  of each child. This property takes the [`BoxConstraints`][] render object as a value.
  Starting with the `RenderSemanticsAnnotations#fe6b5`, the constraint equals
  `BoxConstraints(w=800.0, h=600.0)`.

  每个 render object 的 `constraints` 属性限制其子节点尺寸。
  该属性取值为 [`BoxConstraints`][] render object。
  从 `RenderSemanticsAnnotations#fe6b5` 起，constraint 为 `BoxConstraints(w=800.0, h=600.0)`。

* The [`Center`][] widget created the `RenderPositionedBox#dc1df` render object
  under the `RenderSemanticsAnnotations#8187b` subtree.

  [`Center`][] widget 在 `RenderSemanticsAnnotations#8187b` 子树下创建了 `RenderPositionedBox#dc1df` render object。

* Each child under this render object has `BoxConstraints` with both
  minimum and maximum values. For example, `RenderSemanticsAnnotations#a0a4b`
  uses `BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)`.

  该 render object 下每个子节点都有带最小值与最大值的 `BoxConstraints`。
  例如 `RenderSemanticsAnnotations#a0a4b` 使用 `BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)`。

* All children of the `RenderPhysicalShape#8e171` render object use
  `BoxConstraints(BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0))`.

  `RenderPhysicalShape#8e171` render object 的所有子节点使用 
  `BoxConstraints(BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0))`。

* The child `RenderPadding#8455f` sets a `padding` value of
  `EdgeInsets(8.0, 0.0, 8.0, 0.0)`.
  This sets a left and right padding of 8 to all subsequent children of
  this render object.
  They now have new constraints:
  `BoxConstraints(40.0<=w<=784.0, 28.0<=h<=600.0)`.

  子节点 `RenderPadding#8455f` 将 `padding` 设为 `EdgeInsets(8.0, 0.0, 8.0, 0.0)`，
  为该 render object 之后所有子节点设置左右各 8 的 padding，
  它们的新 constraints 为：`BoxConstraints(40.0<=w<=784.0, 28.0<=h<=600.0)`。

This object, which the `creator` field tells us is
probably part of the [`TextButton`][]'s definition,
sets a minimum width of 88 pixels on its contents and a
specific height of 36.0. This is the `TextButton` class implementing
the Material Design guidelines regarding button dimensions.

`creator` 字段表明该对象可能属于 [`TextButton`][] 定义的一部分，
为其内容设置最小宽度 88 像素、高度 36.0。
这是 `TextButton` 类实现 Material Design 按钮尺寸规范的方式。

`RenderPositionedBox#80b8d` render object loosens the constraints again
to center the text within the button.
The [`RenderParagraph`][]#59bc2 render object picks its size based on
its contents.
If you follow the sizes back up the tree,
you see how the size of the text influences the width of all the boxes
that form the button.
All parents take their child's dimensions to size themselves.

`RenderPositionedBox#80b8d` render object 再次放宽 constraints，使文字在按钮内居中。
[`RenderParagraph`][]#59bc2 render object 根据内容确定尺寸。
若沿树向上追踪尺寸，可看到文字尺寸如何影响组成按钮的各个 box 的宽度；
所有父节点都根据子节点尺寸确定自身大小。

Another way to notice this is by looking at the `relayoutBoundary`
attribute of in the descriptions of each box.
This tells you how many ancestors depend on this element's size.

也可查看每个 box 描述中的 `relayoutBoundary` 属性，
它表示有多少祖先依赖该元素的尺寸。

For example, the innermost `RenderPositionedBox` line has a `relayoutBoundary=up13`.
This means that when Flutter marks the `RenderConstrainedBox` as dirty,
it also marks box's 13 ancestors as dirty because the new dimensions
might affect those ancestors.

例如最内层 `RenderPositionedBox` 行的 `relayoutBoundary=up13` 表示：
当 Flutter 将 `RenderConstrainedBox` 标为 dirty 时，
也会将该 box 的 13 个祖先标为 dirty，
因为新尺寸可能影响这些祖先。

To add information to the dump if you write your own render objects,
override [`debugFillProperties()`][render-fill].
Add [DiagnosticsProperty][] objects to the method's argument
then call the superclass method.

若编写自定义 render object，
可重写 [`debugFillProperties()`][render-fill] 为 dump 添加信息：
向方法参数添加 [DiagnosticsProperty][] 对象，再调用超类方法。

### Print the layer tree

### 打印 layer 树

To debug a compositing issue, use [`debugDumpLayerTree()`][].

调试合成问题时，请使用 [`debugDumpLayerTree()`][]。

#### Example 6: Call `debugDumpLayerTree()`

#### 示例 6：调用 `debugDumpLayerTree()`

<?code-excerpt "lib/dump_layer_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpLayerTree();
          },
          child: const Text('Dump Layer Tree'),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong><t>Expand to view the output of layer tree for Example 6</t><t>展开查看示例 6 的 layer 树输出</t></strong></summary>

{% render "docs/testing/trees/layer-tree.md" -%}

</details>

The `RepaintBoundary` widget creates:

`RepaintBoundary` widget 会创建：

1. A `RenderRepaintBoundary` RenderObject in the render tree
   as shown in the **Example 5** results.

   render 树中的 `RenderRepaintBoundary` RenderObject，如 **示例 5** 结果所示。

   ```plaintext
   ╎     └─child: RenderRepaintBoundary#f8f28
   ╎       │ needs compositing
   ╎       │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
   ╎       │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
   ╎       │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
   ╎       │   UnmanagedRestorationScope ← ⋯
   ╎       │ parentData: <none> (can use size)
   ╎       │ constraints: BoxConstraints(w=800.0, h=600.0)
   ╎       │ layer: OffsetLayer#e73b7
   ╎       │ size: Size(800.0, 600.0)
   ╎       │ metrics: 66.7% useful (1 bad vs 2 good)
   ╎       │ diagnosis: insufficient data to draw conclusion (less than five
   ╎       │   repaints)
   ```

1. A new layer in the layer tree as shown in the **Example 6**
   results.

   layer 树中的新 layer，如 **示例 6** 结果所示。

   ```plaintext
   ├─child 1: OffsetLayer#0f766
   │ │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
   │ │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
   │ │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
   │ │   UnmanagedRestorationScope ← ⋯
   │ │ engine layer: OffsetEngineLayer#1768d
   │ │ handles: 2
   │ │    offset: Offset(0.0, 0.0)
   ```

This reduces how much needs to be repainted.

这可减少需要重绘的范围。

### Print the focus tree

### 打印 focus 树

To debug a focus or shortcut issue, dump the focus tree
using the [`debugDumpFocusTree()`][] function.

调试 focus 或快捷键问题时，请用 [`debugDumpFocusTree()`][] 函数 dump focus 树。

The `debugDumpFocusTree()` method returns the focus tree for the app.

`debugDumpFocusTree()` 方法返回应用的 focus 树。

The focus tree labels nodes in the following way:

focus 树按以下方式标记节点：

* The focused node is labeled `PRIMARY FOCUS`.

  获得焦点的节点标记为 `PRIMARY FOCUS`。

* Ancestors of the focus nodes are labeled `IN FOCUS PATH`.

  focus 节点的祖先标记为 `IN FOCUS PATH`。

If your app uses the [`Focus`][] widget, use the [`debugLabel`][]
property to simplify finding its focus node in the tree.

若应用使用 [`Focus`][] widget，
可用 [`debugLabel`][] 属性便于在树中定位其 focus 节点。

You can also use the [`debugFocusChanges`][] boolean property to enable
extensive logging when the focus changes.

也可将 [`debugFocusChanges`][] 布尔属性设为 true，
在 focus 变化时输出详细日志。

#### Example 7: Call `debugDumpFocusTree()`

#### 示例 7：调用 `debugDumpFocusTree()`

<?code-excerpt "lib/dump_focus_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpFocusTree();
          },
          child: const Text('Dump Focus Tree'),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong><t>Expand to view the focus tree for Example 7</t><t>展开查看示例 7 的 focus 树</t></strong></summary>

{% render "docs/testing/trees/focus-tree.md" -%}

</details>

### Print the semantics tree

### 打印 semantics 树

The `debugDumpSemanticsTree()` function prints the semantic tree for the app.

`debugDumpSemanticsTree()` 函数会打印应用的 semantic 树。

The Semantics tree is presented to the system accessibility APIs.
To obtain a dump of the Semantics tree:

Semantics 树会提供给系统无障碍 API。
要获取 Semantics 树的 dump：

1. Enable accessibility using a system accessibility tool
   or the `SemanticsDebugger`

   使用系统无障碍工具或 `SemanticsDebugger` 启用无障碍。

1. Use the [`debugDumpSemanticsTree()`][] function.

   使用 [`debugDumpSemanticsTree()`][] 函数。

#### Example 8: Call `debugDumpSemanticsTree()`

#### 示例 8：调用 `debugDumpSemanticsTree()`

<?code-excerpt "lib/dump_semantic_tree.dart"?>
```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: Semantics(
          button: true,
          enabled: true,
          label: 'Clickable text here!',
          child: GestureDetector(
            onTap: () {
              debugDumpSemanticsTree();
              if (kDebugMode) {
                print('Clicked!');
              }
            },
            child: const Text('Click Me!', style: TextStyle(fontSize: 56)),
          ),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong><t>Expand to view the semantic tree for Example 8</t><t>展开查看示例 8 的 semantic 树</t></strong></summary>

{% render "docs/testing/trees/semantic-tree.md" -%}

</details>

### Print event timings

### 打印事件时序

If you want to find out where your events happen relative to the frame's
begin and end, you can set prints to log these events.
To print the beginning and end of the frames to the console,
toggle the [`debugPrintBeginFrameBanner`][]
and the [`debugPrintEndFrameBanner`][].

若想知道事件相对帧起止的位置，可设置 print 记录这些事件。
要将帧的开始与结束打印到控制台，
请切换 [`debugPrintBeginFrameBanner`][] 与 [`debugPrintEndFrameBanner`][]。


**The print frame banner log for Example 1**

**示例 1 的帧横幅日志**

```plaintext
I/flutter : ▄▄▄▄▄▄▄▄ Frame 12         30s 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

To print the call stack causing the current frame to be scheduled,
use the [`debugPrintScheduleFrameStacks`][] flag.

要打印导致当前帧被调度的调用栈，请使用 [`debugPrintScheduleFrameStacks`][] 标志。

## Debug layout issues

## 调试布局问题

To debug a layout problem using a GUI, set
[`debugPaintSizeEnabled`][] to `true`.
This flag can be found in the `rendering` library.
You can enable it at any time and affects all painting while `true`.
Consider adding it to the top of your `void main()` entry point.

要用 GUI 调试布局问题，将 [`debugPaintSizeEnabled`][] 设为 `true`。
该标志位于 `rendering` library，可随时启用，
为 `true` 时影响所有绘制。建议放在 `void main()` 入口顶部。

#### Example 9

#### 示例 9

See an example in the following code:

参见下面代码中的示例：

<?code-excerpt "lib/debug_flags.dart (debug-paint-size-enabled)"?>
```dart
// Add import to the Flutter rendering library.
import 'package:flutter/rendering.dart';

void main() {
  debugPaintSizeEnabled = true;
  runApp(const MyApp());
}
```

When enabled, Flutter displays the following changes to your app:

启用后，Flutter 会在应用中显示以下变化：

* Displays all boxes in a bright teal border.

  所有 box 显示亮青色边框。

* Displays all padding as a box with a faded blue fill and blue border
  around the child widget.

  所有 padding 显示为带淡蓝填充与蓝色边框的 box，包围子 widget。

* Displays all alignment positioning with yellow arrows.

  所有对齐定位显示黄色箭头。

* Displays all spacers in gray, when they have no child.

  无子节点的 spacer 显示为灰色。

The [`debugPaintBaselinesEnabled`][] flag
does something similar but for objects with baselines.
The app displays the baseline for alphabetic characters in bright green
and the baseline for ideographic characters in orange.
Alphabetic characters "sit" on the alphabetic baseline,
but that baseline "cuts" through the bottom of [CJK characters][cjk].
Flutter positions the ideographic baseline at the very bottom of the text line.

[`debugPaintBaselinesEnabled`][] 标志作用类似，但针对带 baseline 的对象。
应用以亮绿色显示字母字符的 baseline，以橙色显示表意字符的 baseline。
字母字符「坐」在字母 baseline 上，但该 baseline 会「切过」[CJK 字符][cjk]底部。
Flutter 将表意 baseline 放在文本行最底部。

The [`debugPaintPointersEnabled`][] flag turns on a special mode that
highlights any objects that you tap in teal.
This can help you determine if an object fails to hit test.
This might happen if the object falls outside the bounds of its parent
and thus not considered for hit testing in the first place.

[`debugPaintPointersEnabled`][] 标志开启特殊模式，
将你点击的对象高亮为青色，便于判断对象是否未通过 hit test——例如对象超出父级边界，
因而一开始就不参与 hit test。

If you're trying to debug compositor layers, consider using the following flags.

若要调试 compositor layer，可考虑以下标志：

* Use the [`debugPaintLayerBordersEnabled`][] flag to find the boundaries
  of each layer. This flag results in outlining each layer's bounds in orange.

  使用 [`debugPaintLayerBordersEnabled`][] 标志查看各 layer 边界；
  启用后每个 layer 的边界会以橙色描边。

* Use the [`debugRepaintRainbowEnabled`][] flag to display a repainted layer.
  Whenever a layer repaints, it overlays with a rotating set of colors.

  使用 [`debugRepaintRainbowEnabled`][] 标志显示重绘的 layer；
  layer 每次重绘时会叠加轮换的一组颜色。

Any function or method in the Flutter framework that starts with
`debug...` only works in [debug mode][].

Flutter 框架中凡以 `debug...` 开头的函数或方法仅在 [debug 模式][debug mode]下有效。

[cjk]: https://en.wikipedia.org/wiki/CJK_characters

## Debug animation issues

## 调试动画问题

:::note
To debug animations with the least effort, slow them down.
To slow down the animation,
click **Slow Animations** in DevTools' [Inspector view][].
This reduces the animation to 20% speed.
If you want more control over the amount of slowness,
use the following instructions.

最省力的动画调试方式是放慢动画。在 DevTools 的 [检查器视图][Inspector view] 中点击 **Slow Animations**，
动画会降至 20% 速度。
若需更精细地控制放慢程度，请按下列说明操作。
:::

Set the [`timeDilation`][] variable (from the `scheduler`
library) to a number greater than 1.0, for instance, 50.0.
It's best to only set this once on app startup. If you
change it on the fly, especially if you reduce it while
animations are running, it's possible that the framework
will observe time going backwards, which will probably
result in asserts and generally interfere with your efforts.

将（来自 `scheduler` library 的）[`timeDilation`][] 变量设为大于 1.0 的数，
例如 50.0。最好在应用启动时只设置一次。
若在运行时修改，尤其在动画播放时减小该值，
框架可能观察到时间倒流，通常会触发 assert 并干扰调试。

## Debug performance issues

## 调试性能问题

:::note
You can achieve similar results to some of these debug
flags using [DevTools][]. Some of the debug flags provide little benefit.
If you find a flag with functionality you would like to add to [DevTools][],
[file an issue][].

部分 debug 标志的效果可用 [DevTools][] 实现；
有些 debug 标志收益不大。
若发现某标志的功能应加入 [DevTools][]，请 [提交 issue][file an issue]。
:::

Flutter provides a wide variety of top-level properties and functions
to help you debug your app at various points along the
development cycle.
To use these features, compile your app in debug mode.

Flutter 在开发周期的各阶段提供大量顶层属性与函数，帮助你调试应用。
使用这些功能时，请在 debug 模式下编译应用。

The following list highlights some flags and one function from the
[rendering library][] for debugging performance issues.

下列列表突出 [rendering library][] 中用于调试性能问题的一些标志与一个函数。

[`debugDumpRenderTree()`][]
<br/> To dump the rendering tree to the console,
  call this function when not in a layout or repaint phase.

[`debugDumpRenderTree()`][]
<br/> 在非 layout 或 repaint 阶段调用此函数，将 rendering 树 dump 到控制台。

  To set these flags either:

  设置这些标志可：

  * Edit the framework code.

    编辑框架代码。

  * Import the module, set the value in your `main()` function,
    then hot restart.

    import 对应 module，在 `main()` 中设值，然后热重启。

[`debugPaintLayerBordersEnabled`][]
<br/> To display the boundaries of each layer, set this property to `true`.
  When set, each layer paints a box around its boundary.

[`debugPaintLayerBordersEnabled`][]
<br/> 将属性设为 `true` 可显示各 layer 边界；启用后每个 layer 会在边界周围绘制 box。

[`debugRepaintRainbowEnabled`][]
<br/> To display a colored border around each widget, set this property to `true`.
  These borders change color as the app user scrolls in the app.
  To set this flag, add `debugRepaintRainbowEnabled = true;` as a top-level
  property in your app.
  If any static widgets rotate through colors after setting this flag,
  consider adding repaint boundaries to those areas.

[`debugRepaintRainbowEnabled`][]
<br/> 将属性设为 `true` 可为每个 widget 显示彩色边框；用户滚动时边框会变色。
  在应用顶层添加 `debugRepaintRainbowEnabled = true;` 即可启用。
  若启用后某些静态 widget 仍轮换颜色，可考虑在这些区域添加 repaint boundary。

[`debugPrintMarkNeedsLayoutStacks`][]
<br/> To determine if your app creates more layouts than expected,
  set this property to `true`.
  This layout issue could happen on the timeline, on a profile,
  or from a `print` statement inside a layout method.
  When set, the framework outputs stack traces to the console
  to explain why your app marks each render object to be laid out.

[`debugPrintMarkNeedsLayoutStacks`][]
<br/> 将属性设为 `true` 可判断是否产生了超出预期的 layout。
  该问题可能出现在时间线、profile 或 layout 方法内的 `print` 中。
  启用后，框架会向控制台输出堆栈，说明为何将各 render object 标记为需要 layout。

[`debugPrintMarkNeedsPaintStacks`][]
<br/> To determine if your app paints more layouts than expected,
  set this property to `true`.

[`debugPrintMarkNeedsPaintStacks`][]
<br/> 将属性设为 `true` 可判断是否绘制了超出预期的 layout。

You can generate stack traces on demand as well.
To print your own stack traces, add the `debugPrintStack()`
function to your app.

你也可以按需生成堆栈。在应用中加入 `debugPrintStack()` 函数即可打印自定义堆栈。

### Trace Dart code performance

### 追踪 Dart 代码性能

:::note
You can use the DevTools [Timeline events tab][] to perform traces.
You can also import and export trace files into the Timeline view,
but only files generated by DevTools.

可使用 DevTools [Timeline 事件标签页][Timeline events tab] 进行追踪，
也可将 trace 文件导入/导出到 Timeline 视图，但仅支持 DevTools 生成的文件。
:::

To perform custom performance traces and measure wall or CPU time of arbitrary
segments of Dart code, use `dart:developer` [Timeline][] utilities.

要对任意 Dart 代码段做自定义性能追踪并测量墙上时间或 CPU 时间，
请使用 `dart:developer` 的 [Timeline][] 工具。

1. Open your source code.

   打开源代码。

1. Wrap the code you want to measure in `Timeline` methods.

   用 `Timeline` 方法包裹要测量的代码。

    <?code-excerpt "lib/perf_trace.dart"?>
    ```dart
    import 'dart:developer';
    
    void main() {
      Timeline.startSync('interesting function');
      // iWonderHowLongThisTakes();
      Timeline.finishSync();
    }
    ```

1. While connected to your app, open DevTools' [Timeline events tab][].

   在已连接应用时，打开 DevTools 的 [Timeline 事件标签页][Timeline events tab]。

1. Select the **Dart** recording option in the **Performance settings**.

   在 **Performance settings** 中选择 **Dart** 录制选项。

1. Perform the function you want to measure.

   执行要测量的函数。

To ensure that the runtime performance characteristics closely match that
of your final product, run your app in [profile mode][].

为确保运行时性能特征与最终产品接近，请在 [profile 模式][profile mode]下运行应用。

### Add performance overlay

### 添加性能叠加层

:::note
You can toggle display of the performance overlay on
your app using the **Performance Overlay** button in the
[Flutter inspector][]. If you prefer to do it in code,
use the following instructions.

可在 [Flutter 检查器][Flutter inspector]中用 **Performance Overlay** 按钮切换应用上的性能叠加层显示。
若更倾向在代码中设置，请按下列说明操作。
:::

To enable the `PerformanceOverlay` widget in your code,
set the `showPerformanceOverlay` property to `true` on the
[`MaterialApp`][], [`CupertinoApp`][], or [`WidgetsApp`][]
constructor:

要在代码中启用 `PerformanceOverlay` widget，
请在 [`MaterialApp`][]、[`CupertinoApp`][] 或 [`WidgetsApp`][] 构造函数上将 
`showPerformanceOverlay` 设为 `true`：

#### Example 10

#### 示例 10

<?code-excerpt "lib/performance_overlay.dart (show-overlay)"?>
```dart
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      showPerformanceOverlay: true,
      title: 'My Awesome App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'My Awesome App'),
    );
  }
}
```

(If you're not using `MaterialApp`, `CupertinoApp`,
or `WidgetsApp`, you can get the same effect by wrapping your
application in a stack and putting a widget on your stack that was
created by calling [`PerformanceOverlay.allEnabled()`][].)

（若未使用 `MaterialApp`、`CupertinoApp` 或 `WidgetsApp`，
可将应用包在 stack 中，
并在 stack 上放置由 [`PerformanceOverlay.allEnabled()`][] 创建的 widget，
效果相同。）

To learn how to interpret the graphs in the overlay,
check out [The performance overlay][] in
[Profiling Flutter performance][].

要了解如何解读叠加层中的图表，
请参阅 [分析 Flutter 性能][Profiling Flutter performance] 
中的 [性能叠加层][The performance overlay]。

## Add widget alignment grid

## 添加 widget 对齐网格

To add an overlay to a [Material Design baseline grid][] on your app to
help verify alignments, add the `debugShowMaterialGrid` argument in the
[`MaterialApp` constructor][].

要在应用上叠加 [Material Design 基线网格][Material Design baseline grid] 以校验对齐，
请在 [`MaterialApp` 构造函数][`MaterialApp` constructor] 中添加 `debugShowMaterialGrid` 参数。

To add an overlay to non-Material applications, add a [`GridPaper`][] widget.

对非 Material 应用，添加 [`GridPaper`][] widget。

[`_InkFeatures`]: {{site.api}}/flutter/material/InkFeature-class.html
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`debugDumpApp()`]: {{site.api}}/flutter/widgets/debugDumpApp.html
[`debugDumpFocusTree()`]: {{site.api}}/flutter/widgets/debugDumpFocusTree.html
[`debugDumpLayerTree()`]: {{site.api}}/flutter/rendering/debugDumpLayerTree.html
[`debugDumpRenderTree()`]: {{site.api}}/flutter/rendering/debugDumpRenderTree.html
[`debugDumpSemanticsTree()`]: {{site.api}}/flutter/rendering/debugDumpSemanticsTree.html
[`debugFocusChanges`]: {{site.api}}/flutter/widgets/debugFocusChanges.html
[`debugLabel`]: {{site.api}}/flutter/widgets/Focus/debugLabel.html
[`debugPaintBaselinesEnabled`]: {{site.api}}/flutter/rendering/debugPaintBaselinesEnabled.html
[`debugPaintLayerBordersEnabled`]: {{site.api}}/flutter/rendering/debugPaintLayerBordersEnabled.html
[`debugPaintPointersEnabled`]: {{site.api}}/flutter/rendering/debugPaintPointersEnabled.html
[`debugPaintSizeEnabled`]: {{site.api}}/flutter/rendering/debugPaintSizeEnabled.html
[`debugPrint()`]: {{site.api}}/flutter/widgets/debugPrint.html
[`debugPrintBeginFrameBanner`]: {{site.api}}/flutter/scheduler/debugPrintBeginFrameBanner.html
[`debugPrintEndFrameBanner`]: {{site.api}}/flutter/scheduler/debugPrintEndFrameBanner.html
[`debugPrintMarkNeedsLayoutStacks`]: {{site.api}}/flutter/rendering/debugPrintMarkNeedsLayoutStacks.html
[`debugPrintMarkNeedsPaintStacks`]: {{site.api}}/flutter/rendering/debugPrintMarkNeedsPaintStacks.html
[`debugPrintScheduleFrameStacks`]: {{site.api}}/flutter/scheduler/debugPrintScheduleFrameStacks.html
[`debugRepaintRainbowEnabled`]: {{site.api}}/flutter/rendering/debugRepaintRainbowEnabled.html
[`Focus`]: {{site.api}}/flutter/widgets/Focus-class.html
[`GridPaper`]: {{site.api}}/flutter/widgets/GridPaper-class.html
[`log()`]: {{site.api}}/flutter/dart-developer/log.html
[`Material`]: {{site.api}}/flutter/material/Material-class.html
[`MaterialApp` constructor]: {{site.api}}/flutter/material/MaterialApp/MaterialApp.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp/MaterialApp.html
[`PerformanceOverlay.allEnabled()`]: {{site.api}}/flutter/widgets/PerformanceOverlay/PerformanceOverlay.allEnabled.html
[`print()`]: {{site.api}}/flutter/dart-core/print.html
[`RenderParagraph`]: {{site.api}}/flutter/rendering/RenderParagraph-class.html
[`RenderPositionedBox`]: {{site.api}}/flutter/rendering/RenderPositionedBox-class.html
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
[`stderr.method_to_invoke()`]: {{site.api}}/flutter/dart-io/stderr.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`timeDilation`]: {{site.api}}/flutter/scheduler/timeDilation.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[debug mode]: /testing/build-modes#debug
[Debugger]: /tools/devtools/debugger
[Debugging]: /testing/debugging
[DevTools]: /tools/devtools
[DiagnosticsProperty]: {{site.api}}/flutter/foundation/DiagnosticsProperty-class.html
[file an issue]: {{site.github}}/flutter/devtools/issues
[Flutter inspector]: /tools/devtools/inspector
[frame callback]: {{site.api}}/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html
[Inspector view]: /tools/devtools/inspector
[Logging view]: /tools/devtools/logging
[Material Design baseline grid]: {{site.material}}/foundations/layout/understanding-layout/spacing
[profile mode]: /testing/build-modes#profile
[Profiling Flutter performance]: /perf/ui-performance
[render-fill]: {{site.api}}/flutter/rendering/Layer/debugFillProperties.html
[rendering library]: {{site.api}}/flutter/rendering/rendering-library.html
[The performance overlay]: /perf/ui-performance#the-performance-overlay
[Timeline events tab]: /tools/devtools/performance#timeline-events-tab
[Timeline]: {{site.dart.api}}/dart-developer/Timeline-class.html
[widget-fill]: {{site.api}}/flutter/widgets/Widget/debugFillProperties.html
