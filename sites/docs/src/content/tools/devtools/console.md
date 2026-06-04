---
# title: Use the Debug console
title: 使用调试控制台
# description: Learn how to use the DevTools console.
description: 学习如何使用 DevTools 控制台。
ai-translated: true
---

The DevTools Debug console allows you to watch an
application's standard output (`stdout`),
evaluate expressions for a paused or running
app in debug mode, and analyze inbound and outbound
references for objects.

DevTools 调试控制台允许你查看应用的
标准输出（`stdout`）、
在调试模式下为已暂停或正在运行的应用求值表达式，
并分析对象的入站与出站引用。

:::note
This page is up to date for DevTools 2.23.0.
:::

:::note
本页内容适用于 DevTools 2.23.0。
:::

The Debug console is available from the [Inspector][],
[Debugger][], and [Memory][] views.

调试控制台可从 [Inspector][]（检查器）、
[Debugger][]（调试器）和 [Memory][]（内存）视图访问。

[Inspector]: /tools/devtools/inspector
[Debugger]:  /tools/devtools/debugger
[Memory]:    /tools/devtools/memory

## Watch application output

## 查看应用输出

The console shows the application's standard output (`stdout`):

控制台会显示应用的标准输出（`stdout`）：

![Screenshot of stdout in Console view](/assets/images/docs/tools/devtools/console-stdout.png)

## Explore inspected widgets

## 探索已检查的 widget

If you click a widget on the **Inspector** screen,
the variable for this widget displays in the **Console**:

如果你在 **Inspector**（检查器）界面中点击某个 widget，
该 widget 的变量会显示在 **Console**（控制台）中：

![Screenshot of inspected widget in Console view](/assets/images/docs/tools/devtools/console-inspect-widget.png){:width="100%"}

## Evaluate expressions

## 求值表达式

In the console, you can evaluate expressions for a paused
or running application, assuming that you are running
your app in debug mode:

在控制台中，你可以为已暂停或正在运行的应用求值表达式
（前提是应用在调试模式下运行）：

![Screenshot showing evaluating an expression in the console](/assets/images/docs/tools/devtools/console-evaluate-expressions.png)

To assign an evaluated object to a variable,
use `$0`, `$1` (through `$5`) in the form of `var x = $0`:

要将求值结果赋给变量，
可使用 `$0`、`$1`（至 `$5`），形式为 `var x = $0`：

![Screenshot showing how to evaluate variables](/assets/images/docs/tools/devtools/console-evaluate-variables.png){:width="100%"}

## Browse heap snapshot

## 浏览堆快照

To drop a variable to the console from a heap snapshot,
do the following:

要从堆快照将变量拖入控制台，请执行以下步骤：

1. Navigate to **Devtools > Memory > Diff Snapshots**.

   导航至 **Devtools > Memory > Diff Snapshots**（差异快照）。

1. Record a memory heap snapshot.

   记录内存堆快照。

1. Click on the context menu `[⋮]` to view the number of
   **Instances** for the desired **Class**.

   点击上下文菜单 `[⋮]`，查看所需 **Class**（类）的 **Instances**（实例）数量。

1. Select whether you want to store a single instance as
   a console variable, or whether you want to store _all_
   currently alive instances in the app.

   选择将单个实例存为控制台变量，还是将应用中 _所有_ 当前存活的实例存入控制台。

![Screenshot showing how to browse the heap snapshots](/assets/images/docs/tools/devtools/browse-heap-snapshot.png){:width="100%"}

The Console screen displays both live and static
inbound and outbound references, as well as field values:

控制台界面会显示实时与静态的入站、出站引用以及字段值：

![Screenshot showing inbound and outbound references in Console](/assets/images/docs/tools/devtools/console-references.png){:width="100%"}
