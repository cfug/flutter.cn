---
title: Use the app size tool
title: 使用应用体积工具
description: Learn how to use the DevTools app size tool.
description: 学习如何使用 DevTools 中的应用体积工具。
---

## What is it?

## 这是什么?

The app size tool allows you to analyze the total size of your app.
You can view a single snapshot of "size information"
using the [Analysis tab][], or compare two different
snapshots of "size information" using the [Diff tab][].

应用程序体积工具可让你分析应用的总体积。 
你可以使用 [Analysis 标签][Analysis tab] 来查看「体积信息」的单个快照，
或使用 [Diff 标签][Diff tab] 比较使用「体积信息」的两个不同快照。

### What is "size information"?

### 什么是“体积信息”？

"Size information" contains size data for Dart code,
native code, and non-code elements of your app,
like the application package, assets and fonts. A "size
information" file contains data for the total picture
of your application size.

「体积信息」包含 Dart 代码、原生代码和非代码部分（比如应用包，资源和字体）。
一个「体积信息」文件包含你应用的所有图片数据。

### Dart size information

### Dart 体积信息

The Dart AOT compiler performs tree-shaking on your code
when compiling your application (profile or release mode
only&mdash;the AOT compiler is not used for debug builds,
which are JIT compiled). This means that the compiler
attempts to optimize your app's size by removing
pieces of code that are unused or unreachable.

Dart AOT 编译器会在编译应用程序时对代码进行摇树优化
（仅限 profile 或 release 模式 -
AOT 编译器不用于 debug 生成，debug 模式是 JIT 编译的）。
这意味着，编译器会尝试删除未使用或无法访问的代码，对应用体积进行优化。

After the compiler optimizes your code as much as it can,
the end result can be summarized as the collection of packages,
libraries, classes, and functions that exist in the binary output,
along with their size in bytes. This is the Dart portion of
"size information" we can analyze in the app size tool to further
optimize Dart code and track down size issues.

当编译器尽全力优化你的代码后，
产出的二进制文件会包含依赖、库、类和函数的集合，
以及他们的体积（以字节为单位）。
这是我们可以在应用体积工具中分析的 Dart 部分的「体积信息」,
有了这些信息，我们便可以进一步优化 Dart 代码，并且跟踪体积问题。

## How to use it

## 如何使用

If DevTools is already connected to a running application,
navigate to the "App Size" tab.

如果 DevTools 已经连接到了一个正在运行的应用，点击 "App Size" 标签。

![Screenshot of app size tab](/assets/images/docs/tools/devtools/app_size_tab.png)

If DevTools is not connected to a running application,
you can access the tool from the landing page
that appears once you have launched
DevTools (see [launch instructions][]).

如果 DevTools 未连接到应用，你可以从启动 DevTools 后出现的登录页访问该工具
（查看 [启动说明][launch instructions]）。

![Screenshot of app size access on landing page](/assets/images/docs/tools/devtools/app_size_access_landing_page.png){:width="100%"}

## Analysis tab

## 分析标签页

The analysis tab allows you to inspect a single snapshot
of size information.  You can view the hierarchical structure
of the size data using the treemap and table,
and you can view code attribution data
(for example, why a piece of code is included in your compiled
application) using the dominator tree and call graph.

「分析」标签页允许你检查体积信息的单个快照。
你可以看到层次结构的树状图和表格，
并且可以使用 "dominator tree" 和 "call graph" 看到代码的属性数据
（例如：为什么编译后的应用程序中包含一段代码）。

![Screenshot of app size analysis](/assets/images/docs/tools/devtools/app_size_analysis.png){:width="100%"}

### Loading a size file

### 读取一个体积文件

When you open the Analysis tab, you'll see instructions
to load an app size file. Drag and drop an app size
file into the dialog, and click "Analyze Size".

当你打开分析标签页时，你可以看到加载一个体积文件的使用说明。
拖动一个尺寸文件到弹框中，并点击 "Analyze Size"。

![Screenshot of app size analysis loading screen](/assets/images/docs/tools/devtools/app_size_load_analysis.png){:width="100%"}

See [Generating size files][] below for information on
generating size files.

查看 [生成体积文件][Generating size files] 可以得到有关生成尺寸文件的信息。

### Treemap and table

### 树状图和表格

The treemap and table show the hierarchical data for your app's size.

树状图和表格可以查看你的应用体积的结构化数据。

#### Use the treemap

#### 使用树状图

A treemap is a visualization for hierarchical data.
The space is broken up into rectangles,
where each rectangle is sized and ordered by some quantitative
variable (in this case, size in bytes).
The area of each rectangle is proportional to the size
the node occupies in the compiled application. Inside
of each rectangle (call one A), there are additional
rectangles that exist one level deeper in the data
hierarchy (children of A).

树状图是数据结构的可视化表示。
在视图中，空间被分解成矩形，
其中每个矩形的体积和顺序由一些定量变量决定 (在本例中，体积以字节为单位)。
每个矩形的面积与节点在编译后的应用程序中所占的大小成比例关系。
在每个矩形（称为 A）的内部，
还有更多的矩形存在于数据层次结构的更深层（A 的子级）。

To drill into a cell in the treemap, select the cell.
This re-roots the tree so that the selected cell becomes
the visual root of the treemap.

要查看树状图中的单元格的详情，请选择这个单元格。
这将重新确定树的根节点，以便选中的单元格作为树状图中新的根节点。

To navigate back, or up a level, use the breadcrumb
navigator at the top of the treemap.

如果要后退或向上导航，请使用树映射顶部的面包屑导航。

![Screenshot of treemap breadcrumb navigator](/assets/images/docs/tools/devtools/treemap_breadcrumbs.png){:width="100%"}

### Dominator tree and call graph

### 支配树和调用图

This section of the page shows code size attribution data
(for example, why a piece of code is included in your
compiled application). This data is visible
in the form of a dominator tree as well as a call graph.

这个部分显示了代码的体积属性信息（例如：为什么编译后的应用程序中包含一段代码）。
这些数据以支配树和调用图的形式呈现。

#### Use the dominator tree

#### 使用支配树

A [dominator tree][] is a tree where each node's
children are those nodes it immediately dominates.
A node `a` is said to "dominate" a node `b` if
every path to `b` must go through `a`.

[支配树](https://zh.wikipedia.org/wiki/%E6%94%AF%E9%85%8D_(%E5%9C%96%E8%AB%96)) 是一个树形结构的图表，
其子节点可以立刻被支配。
如果通往 `b` 的每条路径都必经节点 `a`，
那么我们可以说：节点 `a` 支配了节点 `b`。

[dominator tree]: https://en.wikipedia.org/wiki/Dominator_(graph_theory)

To put it in context of app size analysis,
imagine `package:a` imports both `package:b` and `package:c`,
and both `package:b` and `package:c` import `package:d`.

把它放在应用程序大小分析的上下文中，
想象一下 `package:a` 导入了 `package:b` 和 `package:c`，
并且 `package:b` 和 `package:c` 都导入了 `package:d`。

```plaintext
package:a
|__ package:b
|   |__ package:d
|__ package:c
    |__ package:d
```

In this example, `package:a` dominates `package:d`,
so the dominator tree for this data would look like:

在这个例子中，`package:a` 支配 `package:d`，所以这个支配树看起来像是这样：

```plaintext
package:a
|__ package:b
|__ package:c
|__ package:d
```

This information is helpful for understanding why certain
pieces of code are present in your compiled application.
For example, if you are analyzing your app size and find
an unexpected package included in your compiled app, you can
use the dominator tree to trace the package to its root source.

这些信息对于你而言，可以帮助你理解编译后的应用程序中为何出现某些代码片段。
例如，如果你正在分析应用程序的体积，并发现编译后的应用程序中包含意外的包，
则可以使用支配树来跟踪包到其根源。

![Screenshot of code size dominator tree](/assets/images/docs/tools/devtools/app_size_dominator_tree.png){:width="100%"}

#### Use the call graph

#### 使用调用图

A call graph provides similar information to the dominator
tree in regards to helping you understand why code exists
in a compiled application. However, instead of showing
the one-to-many dominant relationships between nodes of code
size data like the dominator tree, the call graph shows the many-to-many
relationships that existing between nodes of code size data.

调用图提供了与支配树相似的信息，
帮助你理解编译后的应用程序中为何出现某些代码片段。
它并不像支配树一样提供了一对多的代码体积数据节点，
而是展示了代码体积数据的节点之间存在的多对多关系。

Again, using the following example:

我们再来看下面这个例子：

```plaintext
package:a
|__ package:b
|   |__ package:d
|__ package:c
    |__ package:d
```

The call graph for this data would link `package:d`
to its direct callers, `package:b` and `package:c`,
instead of its "dominator", `package:a`.

此数据的调用图会将直接调用者 `package：b` 和 `package：c` 与 `package：d` 链接到一起，
而不是它的「支配者」 `package：a`。

```plaintext
package:a --> package:b -->
                              package:d
package:a --> package:c -->
```

This information is useful for understanding the
fine-grained dependencies of between pieces of your code
(packages, libraries, classes, functions).

这些信息对于理解代码片段（包、库、类和函数）之间的细粒度依赖关系非常有用。

![Screenshot of code size call graph](/assets/images/docs/tools/devtools/app_size_call_graph.png){:width="100%"}

#### Should I use the dominator tree or the call graph?

#### 我应该使用支配树还是调用图？

Use the dominator tree if you want to understand the
*root* cause for why a piece of code is included in your
application. Use the call graph if you want to understand
all the call paths to and from a piece of code.

如果你想理解应用程序中包含一段代码的 **根本** 原因，请使用支配树。
如果你想理解一段代码之间的所有调用路径，请使用调用图。

A dominator tree is an analysis or slice of call graph data,
where nodes are connected by "dominance" instead of
parent-child hierarchy. In the case where a parent node
dominates a child, the relationship in the call graph and the
dominator tree would be identical, but this is not always the case.

支配树是调用图数据的分析或切片，其中节点是通过「支配」而不是父子层次结构连接。
在父节点支配子节点的情况下，调用图和支配树中的关系是相同的，但情况并非总是如此。

In the scenario where the call graph is complete
(an edge exists between every pair of nodes),
the dominator tree would show the that `root` is the
dominator for every node in the graph.
This is an example where the call graph would give
you a better understanding around why a piece of code is
included in your application.

在调用图完成的情况下（每对节点之间存在一条边），
支配树将显示出 `root` 是图中每个节点的支配者。
调用图可以让你更好地理解为什么在应用程序中包含一段代码。

## Diff tab

## 差异标签页

The diff tab allows you to compare two snapshots of
size information. The two size information files
you are comparing should be generated from two different
versions of the same app; for example,
the size file generated before and after
changes to your code. You can visualize the
difference between the two data sets
using the treemap and table.

diff 标签页让你可以比较体积信息的两个快照。
你要比较的两个体积信息文件应该从同一个应用程序的两个不同版本生成，
例如，在更改代码之前和之后生成的体积文件。
你可以使用树状图和表格可视化两个数据集之间的差异。

![Screenshot of app size diff](/assets/images/docs/tools/devtools/app_size_diff.png){:width="100%"}

### Loading size files

### 读取体积文件

When you open the **Diff** tab,
you'll see instructions to load "old" and "new" size
files. Again, these files need to be generated from
the same application. Drag and drop these files into
their respective dialogs, and click **Analyze Diff**.

当你打开 **Diff** 标签页时，你将看到加载「旧」和「新」大小文件的使用说明。
同样，这些文件需要从同一个应用程序生成。
将这些文件拖放到各自的对话框中，然后单击 **Analyze Diff**。

![Screenshot of app size diff loading screen](/assets/images/docs/tools/devtools/app_size_load_diff.png){:width="100%"}

See [Generating size files][] below for information
on generating these files.

查看 [生成体积文件][Generating size files] 可以得到有关生成这些文件的信息。

### Treemap and table

### 树状图和表格

In the diff view, the treemap and tree table show
only data that differs between the two imported size files.

在差异视图中, 这个树状图和表格只会显示导入的两个文件中的差异数据。

For questions about using the treemap, see [Use the treemap][] above.

关于树状图的问题，可以查看 [使用树状图][Use the treemap]。

## Generating size files

## 生成尺寸文件

To use the app size tool, you'll need to generate a
Flutter size analysis file. This file contains size
information for your entire application (native code,
Dart code, assets, fonts, etc.), and you can generate it using the
`--analyze-size` flag:

要使用应用体积工具，你需要生成一个 flutter 体积分析文件。
此文件包含整个应用程序的体积信息（本机代码、Dart 代码、资源和字体等），
你可以使用 `--analyze size` 标志生成它：

```console
flutter build <your target platform> --analyze-size
```

This builds your application, prints a size summary
to the command line, and prints a line
telling you where to find the size analysis file.

这会构建你的应用并输出尺寸的摘要到命令行，
同时告诉你在哪里找到体积分析文件。

```console
flutter build apk --analyze-size --target-platform=android-arm64
...
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
app-release.apk (total compressed)                               6 MB
...
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
A summary of your APK analysis can be found at: build/apk-code-size-analysis_01.json
```

In this example, import the `build/apk-code-size-analysis_01.json`
file into the app size tool to analyze further.
For more information, see [App Size Documentation][].

在这个示例中，想要进行更进一步的分析，
可以导入 `build/apk-code-size-analysis_01.json` 文件到体积分析工具。
更多信息，可以查看 [应用体积尺寸文档][App Size Documentation]。

## Other resources

## 其他资源

To learn how to perform a step-by-step size analysis of
the Wonderous App using DevTools, check out the
[App Size Tool tutorial][app-size-tutorial]. Various strategies
to reduce an app's size are also discussed.

若你想要了解对应用（例如 Wonderous）进行包体积分析的详细步骤，
可以阅读 [应用体积工具介绍][app-size-tutorial]。
教程内也讨论了多种减少包体积的方法。

[Use the treemap]: #use-the-treemap
[Generating size files]: #generating-size-files
[Analysis tab]: #analysis-tab
[Diff tab]: #diff-tab
[launch instructions]: /tools/devtools/overview#install-devtools
[App Size Documentation]: /perf/app-size#breaking-down-the-size
[app-size-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-app-size-tool-part-3-of-8-9be6e9ec42a2
