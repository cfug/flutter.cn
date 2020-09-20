---
title: Flutter inspector
title: Flutter inspector
description: A brief overview of Flutter's widget inspector.
description: Flutter 的 widget inspector 概览。
tags: SDK,Flutter SDK,开发工具
keywords: widget检查器,布局,debug
---

The Flutter widget inspector is a powerful tool for visualizing and exploring
Flutter widget trees.

Flutter widget 检查器是一个用于探索和可视化 Flutter widget 树的强大的工具。

{{site.alert.note}}
  While you can still access the Flutter inspector from Android Studio, it
  is now part of the new [Dart DevTools](https://flutter.github.io/devtools).
  You can find more up-to-date docs on the 
  [DevTools wiki](https://flutter.github.io/devtools/inspector)

  虽然你仍可以从 Android Studio 访问 Flutter 检查器，
  但它现在属于新 [Dart DevTools](https://flutter.github.io/devtools) 的一部分。
  你可以在 [DevTools wiki](https://flutter.github.io/devtools/inspector) 
  上找到更多最新相关文档。
{{site.alert.end}}

The Flutter framework uses widgets as [the core building
block](/docs/development/ui/widgets-intro) for anything from controls (text,
buttons, toggles, etc.) to layout (centering, padding, rows, columns, etc.).
The inspector is powerful tool for visualizing and exploring Flutter
these widget trees. It can be helpful when:

Flutter 框架使用 widget 作为从控件
（文本，按钮，切换等）到布局（居中，填充，行，列等）
的任何内容的[核心构建块](/docs/development/ui/widgets-intro)。
检查器是可视化和探索 Flutter 这些 widget 树的强大工具。
在以下情况它非常有用：

* Understanding existing layouts

  理解现有布局

* Diagnosing layout issues

  诊断布局问题

![IntelliJ Flutter inspector window]({% asset tools/android-studio/visual-debugging.png @path %})

## Getting started with the inspector

## 检查器入门

The inspector is currently available in [the Flutter
plugin](/docs/get-started/editor) for Android Studio, or IntelliJ IDEA.

检查器现在已经可以在 Android Studio 以及 IntelliJ IDEA 中的 [Flutter
插件](/docs/get-started/editor) 中获取。

To start click "Select widget" on the Flutter inspector toolbar, and then click
on the device to select a widget. The selected widget is then highlighted
on the device and in the widget tree.

要开始检查，请单击 Flutter 检查器工具栏上的“Select widget”，
然后单击设备以选择一个 widget。
被选中的 widget 将会在设备以及 widget 树中高亮显示。

![Select Demo]({% asset tools/android-studio/inspector_select_example.gif @path %})

You can then browse around the interactive widget tree in the IDE to view
nearby widgets and see their field values. If you are trying to debug a layout
issue, then the Widget layer’s tree might be insufficiently detailed. In that
case, click the Render Tree tab to view the render tree corresponding to the
same location in the tree. When debugging layout issues, the key fields to look
at are the `size` and `constraints` fields. The constraints flow down the tree,
and the sizes flow back up.

然后，你可以浏览 IDE 中的交互式 widget 树，
以查看附近的 widget 并查看其字段值。
如果你正在尝试调试布局问题，那么 Widget 图层的树可能还不够详细。
在这种情况下，单击“Render Tree”选项卡以查看与树中相同位置所对应的渲染树。
在调试布局问题时，关键要检查 `size` 和 `constraints` 字段。
约束向 widget 树的下方传递，而大小则会传递回来。

![Switch Trees]({% asset tools/android-studio/switch_inspector_tree.gif @path %})

For a more complete demonstration of the inspector, see the
[DartConf 2018 talk](https://www.youtube.com/watch?v=JIcmJNT9DNI).

有关检查器的更完整演示，[请参阅 DartConf 2018 演讲](https://www.youtube.com/watch?v=JIcmJNT9DNI)。

## Feedback

## 反馈

If you have suggestions, or encounter issues,
[file an issue in our tracker]({{site.github}}/flutter/flutter-intellij/issues/new?labels=inspector)!

如果您遇到了问题或有任何建议，请
[在我们的跟踪器中提出问题]({{site.github}}/flutter/flutter-intellij/issues/new?labels=inspector)！
