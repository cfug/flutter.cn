---
title: Inside Flutter
title: Flutter 工作原理
---

This document describes the inner workings of the Flutter toolkit that make
Flutter’s API possible. Because Flutter widgets are built using aggressive
composition, user interfaces built with Flutter have a large number of
widgets.  To support this workload, Flutter uses sublinear algorithms for
layout and building widgets as well as data structures that make tree
surgery efficient and that have a number of constant-factor optimizations.
With some additional details, this design also makes it easy for developers
to create infinite scrolling lists using callbacks that build exactly those
widgets that are visible to the user.

本文档解释了使 Flutter API 正常工作的 Flutter 工具包内部工作原理。由于 Flutter widget
是以积极组合的形式构建的，所以使用 Flutter 构建的用户界面含有大量 widget。为了支撑这些负载，
Flutter 使用线性算法、操作高效且具有大量恒定因子优化的树形结构来布局和构建
widget。通过一些额外的机制，该设计也允许开发者利用回调（用于构建用户可见的 widget）来轻松创建无限滚动列表。

## Aggressive composability
## 积极可组合性

One of the most distinctive aspects of Flutter is its _aggressive
composability_. Widgets are built by composing other widgets,
which are themselves built out of progressively more basic widgets.
For example, `Padding` is a widget rather than a property of other widgets.
As a result, user interfaces built with Flutter consist of many,
many widgets.

积极可组合性是 Flutter 最为独特的一个特性。Widget 通过组合其他 widget 的方式进行构建，并且这些
widget 自身由更基础的 widget 构建。比如，`Padding` 是一个 widget 而非其他 widget
的属性。因此，使用 Flutter 创建的用户界面是由多个 widget 组成的。

The widget building recursion bottoms out in `RenderObjectWidgets`,
which are widgets that create nodes in the underlying _render_ tree.
The render tree is a data structure that stores the geometry of the user
interface, which is computed during _layout_ and used during _painting_ and
_hit testing_. Most Flutter developers do not author render objects directly
but instead manipulate the render tree using widgets.

Widget 通过递归底层的 RenderObjectWidget 来进行构建，RenderObjectWidget 是在底层渲染树中创建节点的的
widget。渲染树是用来存储用户界面几何信息（**布局**期间计算、**绘制**及**命中测试**期间使用）的数据结构。大多数
Flutter 开发者无需直接创建这些对象，而是使用 widget 来操纵渲染树。

In order to support aggressive composability at the widget layer,
Flutter uses a number of efficient algorithms and optimizations at
both the widget and render tree layers, which are described in the
following subsections.

为了支持 widget 层的积极可组合性，Flutter 在 widget 和树渲染层使用了大量的高效算法和优化措施，这些将在下面小节中进行介绍。

### Sublinear layout
### 次线性布局

With a large number of widgets and render objects, the key to good
performance is efficient algorithms. Of paramount importance is the
performance of _layout_, which is the algorithm that determines the
geometry (for example, the size and position) of the render objects.
Some other toolkits use layout algorithms that are O(N²) or worse
(for example, fixed-point iteration in some constraint domain).
Flutter aims for linear performance for initial layout, and _sublinear
layout performance_ in the common case of subsequently updating an
existing layout. Typically, the amount of time spent in layout should
scale more slowly than the number of render objects.

使用大量 widget 及渲染对象并保持高性能的关键是使用高效的算法。
其中最重要的是确定渲染对象几何空间（比如大小和位置）的**布局**算法的性能。其他一些工具包使用
O(N²) 或更糟糕的布局算法（例如，约束域中的不动点迭代）。Flutter
的目标在于布局初始化的线性性能，及一般情况下更新现有布局的`次线性布局性能`。通常情况下，布局所花费的时间应该比对象渲染要多得多。

Flutter performs one layout per frame, and the layout algorithm works
in a single pass. _Constraints_ are passed down the tree by parent
objects calling the layout method on each of their children.
The children recursively perform their own layout and then return
_geometry_ up the tree by returning from their layout method. Importantly,
once a render object has returned from its layout method, that render
object will not be visited again<sup><a href="#a1">1</a></sup>
until the layout for the next frame. This approach combines what might
otherwise be separate measure and layout passes into a single pass and,
as a result, each render object is visited _at most
twice_<sup><a href="#a2">2</a></sup> during layout: once on the way
down the tree, and once on the way up the tree.

Flutter 对每一帧执行一次布局操作，且布局算法仅在一次传递中完成。**约束**信息通过父节点调用每个子节点的布局方法向下传递。
子节点递归执行自身的布局操作，并在它们的布局方法中返回**几何**信息以便将其添加到渲染树中。
需要注意的是，一旦渲染对象从布局中返回，该对象将不会被再次访问 <sup><a href="#a1">1</a></sup>，直到下一帧布局的执行。
该策略将可能存在的单独测量和布局传递合并为单次传递，因此，每个渲染对象在布局过程中**最多**被访问**两次**
<sup><a href="#a2">2</a></sup> ：一次在树的向下传递过程中，一次在树的向上传递过程中。

Flutter has several specializations of this general protocol.
The most common specialization is `RenderBox`, which operates in
two-dimensional, cartesian coordinates. In box layout, the constraints
are a min and max width and a min and max height. During layout,
the child determines its geometry by choosing a size within these bounds.
After the child returns from layout, the parent decides the child's
position in the parent's coordinate system<sup><a href="#a3">3</a></sup>.
Notice that the child's layout cannot depend on the child's position
because the child's position is not determined until after the child
returns from layout. As a result, the parent is free to reposition
the child without needing to recompute the child's layout.

针对这个通用协议，Flutter 拥有多种实现。最常用的是 `RenderBox`，它以二维的笛卡尔坐标进行运算。
在盒子布局中，约束是最小最大宽度及最小最大高度。在布局过程中，子节点通过选择这些边界内的大小来确定其几何信息。
子节点在布局中返回后，由父节点确定该子节点在父坐标系中的位置 <sup><a href="#a3">3</a></sup>。
注意，子节点的布局并不取决于它的位置，这是因为它的位置直到它从布局中返回后才确定。
因此父节点可以在无需重新计算子节点布局的情况下重新定位子节点的位置信息。

More generally, during layout, the _only_ information that flows from
parent to child are the constraints and the _only_ information that
flows from child to parent is the geometry. These invariants can reduce
the amount of work required during layout:

更广泛地讲，在布局期间，从父节点流向子节点的**唯一**信息是约束信息，从子节点流向父节点的**唯一**信息是几何信息。
通过这些不变量可减少布局期间所需的工作量：

* If the child has not marked its own layout as dirty, the child can
  return immediately from layout, cutting off the walk, as long as the
  parent gives the child the same constraints as the child received
  during the previous layout.

  如果父节点对子节点使用与上一次布局中相同的约束，且子节点没有将自己的布局标记为脏，
  那么该节点可立即从布局中返回，以切断布局的向下传递。

* Whenever a parent calls a child's layout method, the parent indicates
  whether it uses the size information returned from the child. If,
  as often happens, the parent does not use the size information,
  then the parent need not recompute its layout if the child selects
  a new size because the parent is guaranteed that the new size will
  conform to the existing constraints.

  当父节点调用子节点的布局方法时，父节点会指示它是否使用从子节点返回的大小信息。
  如果父节点经常不使用此信息，即使子节点重新选择了大小，父节点依旧无需重新计算其布局，
  这是因为父节点需要保证新的大小符合现有约束。

* _Tight_ constraints are those that can be satisfied by exactly one
  valid geometry. For example, if the min and max widths are equal to
  each other and the min and max heights are equal to each other,
  the only size that satisfies those constraints is one with that
  width and height. If the parent provides tight constraints,
  then the parent need not recompute its layout whenever the child
  recomputes its layout, even if the parent uses the child's size
  in its layout, because the child cannot change size without new
  constraints from its parent.

  **严格**约束是指恰好由一个有效几何满足的约束。比如，如果最小最大宽度彼此相等，
  且最小最大高度彼此相等，那么满足这些约束的唯一大小便是具有该宽度及高度的大小。
  如果父节点提供了严格约束，即便父节点在布局中使用了子节点的大小，在子节点重新计算布局时，
  父节点的布局也无需重新计算，这是因为子节点在没有父节点新约束的情况下无法更改其大小。

* A render object can declare that it uses the constraints provided
  by the parent only to determine its geometry. Such a declaration
  informs the framework that the parent of that render object does
  not need to recompute its layout when the child recomputes its layout
  _even if the constraints are not tight_ and _even if the parent's
  layout depends on the child's size_, because the child cannot change
  size without new constraints from its parent.

  渲染对象可以声明仅使用父节点提供的约束来确定其几何信息。
  此类声明通知框架：**即便约束为非严格约束，以及父节点的布局取决于子节点的大小，**
  该渲染对象父节点的布局在子节点的布局重新计算时仍无需重新计算，这是因为子节点在没有父节点新约束的情况下无法更改其大小。

As a result of these optimizations, when the render object tree contains
dirty nodes, only those nodes and a limited part of the subtree around
them are visited during layout.

这些优化措施的效果是，当渲染对象包含脏节点时，在布局过程中，只有这些节点以及它们周围子树的有限节点才允许被访问。

### Sublinear widget building
### 次线性 widget 构建

Similar to the layout algorithm, Flutter's widget building algorithm
is sublinear. After being built, the widgets are held by the _element
tree_, which retains the logical structure of the user interface.
The element tree is necessary because the widgets themselves are
_immutable_, which means (among other things), they cannot remember their
parent or child relationships with other widgets. The element tree also
holds the _state_ objects associated with stateful widgets.

Flutter 使用类似于布局的次线性算法来构建 widget。widget 构建完成后，它们将被保留了用户页面逻辑结构的
**element 树**保存。element 树是非常有必要的，这是因为 widget
自身是**不可变的**，这意味着（其他情况除外），它们无法记住父（或子）节点与其他 widget 的关系。element
还保存了与 stateful widget 相关联的 **state** 对象。

In response to user input (or other stimuli), an element can become dirty,
for example if the developer calls `setState()` on the associated state
object. The framework keeps a list of dirty elements and jumps directly
to them during the _build_ phase, skipping over clean elements. During
the build phase, information flows _unidirectionally_ down the element
tree, which means each element is visited at most once during the build
phase.  Once cleaned, an element cannot become dirty again because,
by induction, all its ancestor elements are also
clean<sup><a href="#a4">4</a></sup>.

由于用户输入（或来自其他地方的响应），比如开发者在关联的 state 对象上调用了 `setState()`
方法，element 可能会变脏。框架维护了一个脏 element 列表，使得**构建**过程可跳过干净的
element，直接跳转到脏的 element。构建过程中，信息在 element 树中向下**单向**传递，这意味着该阶段中每个
element 最多会被访问一次。一个 element 一旦被清洗，它将不会再次变脏，这是因为通过归纳，它所有的祖先
element 也都是干净的 <sup><a href="#a4">4</a></sup>。

Because widgets are _immutable_, if an element has not marked itself as
dirty, the element can return immediately from build, cutting off the walk,
if the parent rebuilds the element with an identical widget. Moreover,
the element need only compare the object identity of the two widget
references in order to establish that the new widget is the same as
the old widget. Developers exploit this optimization to implement the
_reprojection_ pattern, in which a widget includes a prebuilt child
widget stored as a member variable in its build.

由于 widget 是**不可变的**，因此父节点使用相同的 widget 来重新构建
element，如果 element 没有将自己标记为脏，那么该 element
可立即从构建中返回，以切断构建的向下传递。另外，element 只需比较两个 widget
所引用的对象标识来确定新 widget 与旧 widget 是否相同。开发者可利用该优化实现**投影**模式，即 widget
包含了被存储为成员变量、在构建过程中预先构建的子 widget。

During build, Flutter also avoids walking the parent chain using
`InheritedWidgets`. If widgets commonly walked their parent chain,
for example to determine the current theme color, the build phase
would become O(N²) in the depth of the tree, which can be quite
large due to aggressive composition. To avoid these parent walks,
the framework pushes information down the element tree by maintaining
a hash table of `InheritedWidget`s at each element. Typically, many
elements will reference the same hash table, which changes only at
elements that introduce a new `InheritedWidget`.

构建过程中，Flutter 同时使用 `InheritedWidgets` 来避免父链的遍历。如果 widget
经常遍历它们的父链，比如确定当前的主题颜色，那么构建阶段树的深底将变为 O(N²)，由于
Flutter 的积极可组合性，其数量可能非常巨大。为了避免这些父链的遍历，框架通过 `InheritedWidget`
在每个 element 中维护的哈希表来向下传递 element 树中的信息。通常情况下，多个 element
引用相同的哈希表，并且该表仅在 element 引入新的 `InheritedWidget` 时改变。

### Linear reconciliation
### 线性协调

Contrary to popular belief, Flutter does not employ a tree-diffing
algorithm. Instead, the framework decides whether to reuse elements by
examining the child list for each element independently using an O(N)
algorithm. The child list reconciliation algorithm optimizes for the
following cases:

不同于传统做法，Flutter 没有使用树差异比较算法。相反，框架通过使用 O(N) 算法独立地检查每个
element 的子节点来决定是否重用该 element。子列表协调算法针对以下情况进行了优化：

* The old child list is empty.
  旧的子列表为空。
* The two lists are identical.
  两个列表完全相同。
* There is an insertion or removal of one or more widgets in exactly
  one place in the list.
  在列表的某个位置插入或删除一个或多个 widget。
* If each list contains a widget with the same key, the two widgets are
  matched.
  如果每个列表包含相同 key 的 widget，则匹配这两个 widget。

The general approach is to match up the beginning and end of both child
lists by comparing the runtime type and key of each widget,
potentially finding a non-empty range in the middle of each list
that contains all the unmatched children. The framework then places
the children in the range in the old child list into a hash table
based on their keys. Next, the framework walks the range in the new
child list and queries the hash table by key for matches. Unmatched
children are discarded and rebuilt from scratch whereas matched children
are rebuilt with their new widgets.

通常的策略是比较每个 widget 的运行时类型和 key
来匹配子列表的头部及底部，这可能在包含所有不匹配的子节点的每个列表中间找到非空范围。
然后，框架将旧的子列表中的子项放入基于其 key 的哈希表中。接下来，框架遍历新子列表的范围，并根据
key 对哈希表进行查询匹配。无法匹配的子项将会被丢弃并从头开始重建，匹配到的子项则使用它们新的
widget 进行重建。

### Tree surgery
### 树结构优化

Reusing elements is important for performance because elements own
two critical pieces of data: the state for stateful widgets and the
underlying render objects. When the framework is able to reuse an element,
the state for that logical part of the user interface is preserved
and the layout information computed previously can be reused,
often avoiding entire subtree walks. In fact, reusing elements is
so valuable that Flutter supports _non-local_ tree mutations that
preserve state and layout information.

重用 element 对性能非常重要，这是因为 element 拥有两份关键数据：stateful widget
的状态对象及底层的渲染对象。当框架能够重用 element 时，用户界面的逻辑状态信息是不变的，
并且可以重用之前计算的布局信息，这通常可以避免遍历整棵子树。事实上，重用 element
是非常有价值的，因为 Flutter 支持**全局**树更新，以此保留状态和布局信息。

Developers can perform a non-local tree mutation by associating a `GlobalKey`
with one of their widgets. Each global key is unique throughout the
entire application and is registered with a thread-specific hash table.
During the build phase, the developer can move a widget with a global
key to an arbitrary location in the element tree. Rather than building
a fresh element at that location, the framework will check the hash
table and reparent the existing element from its previous location to
its new location, preserving the entire subtree.

开发者可通过将 `GlobalKey` 与其中一个 widget 相关联来实施全局树更新。每个全局 key
在整个应用中都是唯一的，并使用特定于线程的哈希表进行注册。在构建过程中，开发者可以使用全局 key
将 widget 移动到 element 树的任意位置。框架将不会在该位置上重新构建 element，而是检查哈希表并将现有的
element 从之前的位置移动到新的位置，从而保留整棵子树。

The render objects in the reparented subtree are able to preserve
their layout information because the layout constraints are the only
information that flows from parent to child in the render tree.
The new parent is marked dirty for layout because its child list has
changed, but if the new parent passes the child the same layout
constraints the child received from its old parent, the child can
return immediately from layout, cutting off the walk.

重新构建的子树中的渲染对象能够保留它们的布局信息，这是因为布局约束是渲染树从父节点传递到子节点的唯一信息。
子列表发生变化后，父节点将会被标记为脏，但如果新的父节点传递给子节点的布局约束与该子节点从旧的父节点接收到的相同，
那么子节点可立即从布局中返回，从而切断布局的向下传递。

Global keys and non-local tree mutations are used extensively by
developers to achieve effects such as hero transitions and navigation.

开发者广泛使用全局 key 和全局树更新来实现 hero transition 及导航等效果。

### Constant-factor optimizations
### 恒定因子优化

In addition to these algorithmic optimizations, achieving aggressive
composability also relies on several important constant-factor
optimizations. These optimizations are most important at the leaves of
the major algorithms discussed above.

除了上述算法优化，实现积极可组合还需依赖几个重要的恒定因子优化。这些优化对于上面所讨论的主要算法是非常重要的。

* **Child-model agnostic.** Unlike most toolkits, which use child lists,
  Flutter’s render tree does not commit to a specific child model.
  For example, the `RenderBox` class has an abstract `visitChildren()`
  method rather than a concrete _firstChild_ and _nextSibling_ interface.
  Many subclasses support only a single child, held directly as a member
  variable, rather than a list of children. For example, `RenderPadding`
  supports only a single child and, as a result, has a simpler layout
  method that takes less time to execute.

  **子模型无关。**与大多数使用子列表的工具包不同，Flutter 渲染树不会记住一个特定的子模型。比如，类
  `RenderBox` 存在一个抽象的 `visitChildren()` 方法，而非具体的 **firstChild** 和
  **nextSibling** 接口。许多子类仅支持直接作为其成员变量的单个子项，而非子项列表。比如，由于
  `RenderPadding` 仅支持单个子节点，因此它拥有一个更为简单、高效的布局方法。

* **Visual render tree, logical widget tree.** In Flutter, the render
  tree operates in a device-independent, visual coordinate system,
  which means smaller values in the x coordinate are always towards
  the left, even if the current reading direction is right-to-left.
  The widget tree typically operates in logical coordinates, meaning
  with _start_ and _end_ values whose visual interpretation depends
  on the reading direction. The transformation from logical to visual
  coordinates is done in the handoff between the widget tree and the
  render tree. This approach is more efficient because layout and
  painting calculations in the render tree happen more often than the
  widget-to-render tree handoff and can avoid repeated coordinate conversions.

  **视觉渲染树、 widget 逻辑树。** 在 Flutter 中，渲染树在与设备无关的视觉坐标系中运行，这意味着即使
  x 轴的读取方向是从右到左，其左侧的值依旧小于右侧。widget
  树通常在逻辑坐标中运行，这意味着拥有**开始**和**结束**值的视觉解释取决于读取方向。逻辑坐标到视觉坐标的转换是在
  widget 树和渲染树之间的切换中完成的。这种方法更为高效的原因是，渲染树中的布局和绘制计算比
  widget 到渲染树的切换更加频繁，并且可以避免重复的坐标转换。

* **Text handled by a specialized render object.** The vast majority
  of render objects are ignorant of the complexities of text. Instead,
  text is handled by a specialized render object, `RenderParagraph`,
  which is a leaf in the render tree. Rather than subclassing a
  text-aware render object, developers incorporate text into their
  user interface using composition. This pattern means `RenderParagraph`
  can avoid recomputing its text layout as long as its parent supplies
  the same layout constraints, which is common, even during tree surgery.

  **通过专门的渲染对象处理文本。** 大多数渲染对象都不清楚文本的复杂性。相反，文本是由专门的渲染对象 `RenderParagraph`
  进行处理，它是渲染树中的一个叶子节点。开发者使用组合形式将文本并入到用户界面中，而非使用文本感知渲染对象进行子类化。该模式意味着
  `RenderParagraph` 可避免文本布局在父节点提供相同布局约束下的重复计算，这是非常常见的，即使在树优化期间也是如此。

* **Observable objects.** Flutter uses both the model-observation and
  the reactive paradigms. Obviously, the reactive paradigm is dominant,
  but Flutter uses observable model objects for some leaf data structures.
  For example, _Animations_ notify an observer list when their value changes.
  Flutter hands off these observable objects from the widget tree to the
  render tree, which observes them directly and invalidates only the
  appropriate stage of the pipeline when they change. For example,
  a change to an _Animation<Color>_ might trigger only the paint phase
  rather than both the build and paint phases.

  **可观察对象。** Flutter 使用模型观察及响应设计模式。显而易见，响应模式占主导地位，但
  Flutter 在某些叶子节点的数据结构上使用了可观察对象。比如 **Animation**
  会在值发生变化时通知观察者列表。Flutter 将这些可观察对象从 widget
  树转移到渲染树中，渲染树直接监听这些对象，并在它们改变时仅让管道的相关阶段无效。比如，更改
  **Animation\<Color\>** 可能只触发绘制阶段，而非整个构建和绘制阶段。

Taken together and summed over the large trees created by aggressive
composition, these optimizations have a substantial effect on performance.

总的来说，这些优化对通过积极组合方式产生的大型树结构的性能产生了重大影响。

## Infinite scrolling
## 无限滚动

Infinite scrolling lists are notoriously difficult for toolkits.
Flutter supports infinite scrolling lists with a simple interface
based on the _builder_ pattern, in which a `ListView` uses a callback
to build widgets on demand as they become visible to the user during
scrolling. Supporting this feature requires _viewport-aware layout_
and _building widgets on demand_.

对于工具包来说，实现无限滚动列表是非常困难的。Flutter
支持基于**构造器**模式实现的简单无限滚动列表界面，其中 `ListView` 使用回调按需构建
widget，即它们只在滚动过程中才对用户可见。该功能需要**视窗感知布局**及**按需构建 widget**的支持。

### Viewport-aware layout
### 视窗感知布局

Like most things in Flutter, scrollable widgets are built using
composition. The outside of a scrollable widget is a `Viewport`,
which is a box that is "bigger on the inside," meaning its children
can extend beyond the bounds of the viewport and can be scrolled into
view. However, rather than having `RenderBox` children, a viewport has
`RenderSliver` children, known as _slivers_, which have a viewport-aware
layout protocol.

同 Flutter 中的大多数东西一样，可滚动的 widget 是基于组合模式构建的。可滚动 widget 的外部是一个
`Viewport`，这是一个拥有更大内部空间的盒子，这意味着它的子节点可以超出视窗口的边界并滚动到可视区域中。
但是，视窗口没有 `RenderBox` 子节点，而是拥有被称为 **sliver**，实现了视窗感知协议的
`RenderSliver` 子节点。

The sliver layout protocol matches the structure of the box layout
protocol in that parents pass constraints down to their children and
receive geometry in return. However, the constraint and geometry data
differs between the two protocols. In the sliver protocol, children
are given information about the viewport, including the amount of
visible space remaining. The geometry data they return enables a
variety of scroll-linked effects, including collapsible headers and
parallax.

sliver 布局协议中父节点向下传递给子节点的约束信息及接收到的几何信息的结构与盒子布局相同。
但约束和几何数据在两个协议之间不同。在 sliver 协议中，子节点接收到的是关于视窗口的信息，
这其中包含剩余的可见空间量。它们返回的几何数据支持各种滚动链接效果，包括可折叠标题及视差。

Different slivers fill the space available in the viewport in different
ways. For example, a sliver that produces a linear list of children lays
out  each child in order until the sliver either runs out of children or
runs out of space. Similarly, a sliver that produces a two-dimensional
grid of children fills only the portion of its grid that is visible.
Because they are aware of how much space is visible, slivers can produce
a finite number of children even if they have the potential to produce
an unbounded number of children.

不同的 sliver 以不同的方式填充视窗口中的可用空间。比如，生成线性子列表的 sliver 按顺序排列每个子节点，
直到 sliver 中无任何子节点或可用空间。同理，生成二维子节点网格的 sliver 仅填充网格中的可见区域。
由于它们知道还有多大的可见空间，sliver 可以生成有限的子节点，即使它们可能生成无限的子节点。

Slivers can be composed to create bespoke scrollable layouts and effects.
For example, a single viewport can have a collapsible header followed
by a linear list and then a grid. All three slivers will cooperate through
the sliver layout protocol to produce only those children that are actually
visible through the viewport, regardless of whether those children belong
to the header, the list, or the grid.

可组合 sliver 来创建特定的滚动布局和效果。比如，单个视窗口可以有一个折叠标题、一个线性列表和一个网格。
所有这些 sliver 将按照 sliver 布局协议进行协作，只生成那些在视窗口实际可见的子节点，
而不管这些子节点是否属于标题、列表或网格。

### Building widgets on demand
### 按需构建 widget

If Flutter had a strict _build-then-layout-then-paint_ pipeline,
the foregoing would be insufficient to implement an infinite scrolling
list because the information about how much space is visible through
the viewport is available only during the layout phase. Without
additional machinery, the layout phase is too late to build the
widgets necessary to fill the space. Flutter solves this problem
by interleaving the build and layout phases of the pipeline. At any
point in the layout phase, the framework can start building new
widgets on demand _as long as those widgets are descendants of the
render object currently performing layout_.

如果 Flutter 拥有一个严格的**从构建到布局，再到绘制**的管道，那么前面的内容将不足以实现无限滚动列表，
这是因为只有在布局阶段才能通过视窗口获取可用的空间信息。如果没有额外的机制，在布局阶段构建用于填充空间的
widget 已经太迟了。Flutter 使用将管道的构建与布局交叉在一起的方式来解决这个问题。在布局阶段的任意时刻，
**只要这些 widget 是当前布局的渲染对象的子节点**，框架就可以按需构建新的 widget。

Interleaving build and layout is possible only because of the strict
controls on information propagation in the build and layout algorithms.
Specifically, during the build phase, information can propagate only
down the tree. When a render object is performing layout, the layout
walk has not visited the subtree below that render object, which means
writes generated by building in that subtree cannot invalidate any
information that has entered the layout calculation thus far. Similarly,
once layout has returned from a render object, that render object will
never be visited again during this layout, which means any writes
generated by subsequent layout calculations cannot invalidate the
information used to build the render object’s subtree.

只有严格控制构建及布局中消息传播的算法，才能实现构建和布局的交叉执行。
也就是说，在构建过程中，消息只能沿构建树向下传递。当渲染对象进行布局时，
布局遍历过程中并没有访问该渲染对象的子树，这意味通过子树构建的写入无法使到目前为止已进入布局计算过程的任何信息失效。
无独有偶，一旦布局从渲染对象中返回，在当前布局过程中，该渲染对象将永远不会被再次访问，
这意味后续布局计算生成的任何写入都不会使用于构建渲染对象的子树的信息失效。

Additionally, linear reconciliation and tree surgery are essential
for efficiently updating elements during scrolling and for modifying
the render tree when elements are scrolled into and out of view at
the edge of the viewport.

此外，线性协调及树结构优化对于在滚动过程中有效更新 element，以及当 element
在视窗口边缘滚动进出视图期间修改渲染树至关重要。

## API Ergonomics
## 人机工程 API

Being fast only matters if the framework can actually be used effectively.
To guide Flutter's API design towards greater usability, Flutter has been
repeatedly tested in extensive UX studies with developers. These studies
sometimes confirmed pre-existing design decisions, sometimes helped guide
the prioritization of features, and sometimes changed the direction of the
API design. For instance, Flutter's APIs are heavily documented; UX
studies confirmed the value of such documentation, but also highlighted
the need specifically for sample code and illustrative diagrams.

速度只有在框架能够被有效使用时才有意义。为了引导设计更高可用性的 Flutter API，Flutter
已经在与开发者进行的广泛用户体验研究中进行了反复测试。这些研究有时证实了已有的设计决策，
有时有助于引导功能的优先级，有时会改变 API 的设计方向。比如，Flutter 的 API
记录很多，用户体验的研究不仅证实了这些文档的价值，也同时强调了示例代码及说明性图表的重要性。

This section discusses some of the decisions made in Flutter's API design
in aid of usability.

本节将要讨论 Flutter API 设计中为提高可用性所做的一些决策。

### Specializing APIs to match the developer's mindset
### 与开发者思维模式相匹配的专项 API

The base class for nodes in Flutter's `Widget`, `Element`, and `RenderObject`
trees does not define a child model. This allows each node to be
specialized for the child model that is applicable to that node.

Flutter 中 `Widget`、`Element` 和 `RenderObject`
的基类节点不定义子类模型。该机制允许每个节点对适用于该节点的子模型进行定制化。

Most `Widget` objects have a single child `Widget`, and therefore only expose
a single `child` parameter. Some widgets support an arbitrary number of
children, and expose a `children` parameter that takes a list.
Some widgets don't have any children at all and reserve no memory,
and have no parameters for them. Similarly, `RenderObjects` expose APIs
specific to their child model. `RenderImage` is a leaf node, and has no
concept of children. `RenderPadding` takes a single child, so it has storage
for a single pointer to a single child. `RenderFlex` takes an arbitrary
number of children and manages it as a linked list.

大多数 `Widget` 对象都有一个子 `Widget` 对象，因此它只暴露了一个 `child` 参数。一些 widget
支持任意数量的子节点，并暴露了一个获取子节点列表的 `children` 参数。有些 widget
无任何子节点、不保留内存且无任何参数。同样的，`RenderObjects` 暴露特定于子模型的 API。`RenderImage`
是一个没有子节点的叶子节点。`RenderPadding` 只持有一个子节点，因此它有一个指向单个子节点的指针存储空间。`RenderFlex`
接受任意数量的子节点，并通过链表对其进行管理。

In some rare cases, more complicated child models are used. The
`RenderTable` render object's constructor takes an array of arrays of
children, the class exposes getters and setters that control the number
of rows and columns, and there are specific methods to replace
individual children by x,y coordinate, to add a row, to provide a
new array of arrays of children, and to replace the entire child list
with a single array and a column count. In the implementation,
the object does not use a linked list like most render objects but
instead uses an indexable array.

在一些罕见情况下，将使用更复杂的子类模型。 渲染对象 `RenderTable`
的构造函数需要使用二维数组来存储子节点，所以该类暴露了用于控制行和列数量的 getter 及 setter
方法，还有一些可以用 x、y 轴坐标来替换单个子节点的特殊方法，可通过提供一个新的子节点数组来添加新行，
并用单个数组及列的个数来替换整个子节点列表。该对象并不像大多数渲染对象那样使用链表，而是使用可索引数组来实现。

The `Chip` widgets and `InputDecoration` objects have fields that match
the slots that exist on the relevant controls. Where a one-size-fits-all
child model would force semantics to be layered on top of a list of
children, for example, defining the first child to be the prefix value
and the second to be the suffix, the dedicated child model allows for
dedicated named properties to be used instead.

`Chip` widget 和 `InputDecoration` 对象具有与其控制中的插槽相匹配的字段。
如果一个通用子模型将强制语义定义在子列表之上，比如将第一个子节点定义为前缀，
第二个子节点定义为后缀，那么专用子模型允许使用特有的命名属性。

This flexibility allows each node in these trees to be manipulated in
the way most idiomatic for its role. It's rare to want to insert a cell
in a table, causing all the other cells to wrap around; similarly,
it's rare to want to remove a child from a flex row by index instead
of by reference.

这种灵活性允许树中的每个子节点以其最常用的方式操作它的角色。很少有人想要在表格中插入一个单元格，
从而导致其他所有单元格被环绕；同样的，很少有人想要通过索引而不是通过引用从 flex
行中删除子项。

The `RenderParagraph` object is the most extreme case: it has a child of
an entirely different type, `TextSpan`. At the `RenderParagraph` boundary,
the `RenderObject` tree transitions into being a `TextSpan` tree.

`RenderParagraph` 对象是最极端的情况：它有一个完全不同类型的子节点，`TextSpan`。在 `RenderParagraph`
的边界，`RenderObject` 树会被转换为 `TextSpan` 树。

The overall approach of specializing APIs to meet the developer's
expectations is applied to more than just child models.

专门用于满足开发者期望的 API 的一切方法不仅适用于子模型。

Some rather trivial widgets exist specifically so that developers
will find them when looking for a solution to a problem. Adding a
space to a row or column is easily done once one knows how, using
the `Expanded` widget and a zero-sized `SizedBox` child, but discovering
that pattern is unnecessary because searching for `space`
uncovers the `Spacer` widget, which uses `Expanded` and `SizedBox` directly
to achieve the effect.

专门存在一些琐碎的 widget，以便开发者在寻找问题解决方案时能够发现并使用它们。一旦知道如何使用 `Expanded`
和大小为零的 `SizedBox` 子部件，就可以轻松地为行或列添加空格，但你会发现这种模式是没有必要的，因为搜索
`space` 所找到的 `Spacer`，它是直接使用 `Expanded` 和 `SizedBox` 来达到同样的效果的。

Similarly, hiding a widget subtree is easily done by not including the
widget subtree in the build at all. However, developers typically expect
there to be a widget to do this, and so the `Visibility` widget exists
to wrap this pattern in a trivial reusable widget.

同理，可以通过在构建过程中不包含 widget 子树来轻松隐藏 widget 子树。但开发者通常希望有一个
widget 来执行该操作，因此 `Visibility` 的存在便是将此模式封装在一个简单的可重用 widget 中。

### Explicit arguments
### 明确的参数

UI frameworks tend to have many properties, such that a developer is
rarely able to remember the semantic meaning of each constructor
argument of each class. As Flutter uses the reactive paradigm,
it is common for build methods in Flutter to have many calls to
constructors. By leveraging Dart's support for named arguments,
Flutter's API is able to keep such build methods clear and understandable.

UI 框架往往拥有大量的属性，因此很少有开发者能够记住每个类的每个构造函数参数的作用。由于 Flutter
使用响应式编程范式，因此在 Flutter 中，构建方法通常会对构造函数进行多次调用。通过利用 Dart
的命名参数，Flutter 中的 API 能够使这些构建方法保持清晰易懂。

This pattern is extended to any method with multiple arguments,
and in particular is extended to any boolean argument, so that isolated
`true` or `false` literals in method calls are always self-documenting.
Furthermore, to avoid confusion commonly caused by double negatives
in APIs, boolean arguments and properties are always named in the
positive form (for example, `enabled: true` rather than `disabled: false`).

该模式已被扩展到任何具有多个参数（尤其是具有 boolean 类型参数）的方法，因此独立的 `true`
或 `false` 值在方法调用中总是自我描述的。此外，为避免 API 中通常由双重否定所造成的困惑，boolean
类型的参数和属性始终以肯定的形式命名（比如，使用 `enabled: true` 而非 `disabled: false`）。

### Paving over pitfalls
### 参数陷阱

A technique used in a number of places in the Flutter framework is to
define the API such that error conditions don't exist. This removes
entire classes of errors from consideration.

在 Flutter 框架中被大量使用的一项技术是定义不存在错误条件的 API。这样可以避免考虑整个错误类别。

For example, interpolation functions allow one or both ends of the
interpolation to be null, instead of defining that as an error case:
interpolating between two null values is always null, and interpolating
from a null value or to a null value is the equivalent of interpolating
to the zero analog for the given type. This means that developers
who accidentally pass null to an interpolation function will not hit
an error case, but will instead get a reasonable result.

比如插值函数允许插值的一端或两端为空，而不是将其定义为错误：两个空值之间的插值永远为空，
并且从空值或空值插值等效于对指定类型进行零模拟插值。这意味着不小心将 null
传递给插值函数的开发者不会遇到错误，而是会得到一个合理结果。

A more subtle example is in the `Flex` layout algorithm. The concept of
this layout is that the space given to the flex render object is
divided among its children, so the size of the flex should be the
entirety of the available space. In the original design, providing
infinite space would fail: it would imply that the flex should be
infinitely sized, a useless layout configuration. Instead, the API
was adjusted so that when infinite space is allocated to the flex
render object, the render object sizes itself to fit the desired
size of the children, reducing the possible number of error cases.

一个更加微妙的例子是 `Flex` 布局算法。该布局给予 flex 渲染对象的空间被它的子节点所划分。因此
flex 的大小应该是整个可用空间。在最初的设计中提供无限空间将导致失败：这意味着 flex
应该是无限大且无用的布局设置。然而，通过对 API 的改造，在为 flex
对象提供无限空间时，渲染对象会调整自身大小来满足所需子节点的大小，从而减少可能出现的错误次数。

The approach is also used to avoid having constructors that allow
inconsistent data to be created. For instance, the `PointerDownEvent`
constructor does not allow the `down` property of `PointerEvent` to
be set to `false` (a situation that would be self-contradictory);
instead, the constructor does not have a parameter for the `down`
field and always sets it to `true`.

该方法也可用于避免使用允许创建不符合逻辑的数据的构造函数。例如，`PointerDownEvent`
的构造函数不允许将 `PointerEvent` 的 `down` 属性设置为
`false`（这种情况是自相矛盾的）；相反，构造函数没有关于字段 `down`
的参数，且将值始终设置为 `true`。

In general, the approach is to define valid interpretations for all
values in the input domain. The simplest example is the `Color` constructor.
Instead of taking four integers, one for red, one for green,
one for blue, and one for alpha, each of which could be out of range,
the default constructor takes a single integer value, and defines
the meaning of each bit (for example, the bottom eight bits define the
red component), so that any input value is a valid color value.

一般情况下，该方法用于为输入域中的所有值定义有效的解释。最简单的例子是 `Color`
的构造函数。相对于接受四个整型参数（分别用于表示红色、绿色、蓝色和 alpha），其中任何一个都可能超出范围，
它的默认构造函数仅接受一个整数值，并定义每位的含义（例如，低八位代表红色），以便任何输入都是有效的颜色值。

A more elaborate example is the `paintImage()` function. This function
takes eleven arguments, some with quite wide input domains, but they
have been carefully designed to be mostly orthogonal to each other,
such that there are very few invalid combinations.

一个更复杂的例子是 `paintImage()` 函数。该函数需要 11 个参数，其中一些具有相当宽泛的输入域，
但它们都经过精心设计且大部分都能够彼此相交，因此很少出现无效组合。

### Reporting error cases aggressively
### 主动报告错误

Not all error conditions can be designed out. For those that remain,
in debug builds, Flutter generally attempts to catch the errors very
early and immediately reports them. Asserts are widely used.
Constructor arguments are sanity checked in detail. Lifecycles are
monitored and when inconsistencies are detected they immediately
cause an exception to be thrown.

并非所有的错误都能被设计出来。对于那些遗漏的错误，在 debug 版本中，Flutter
通常会尝试尽早捕获并立即报告。它使用了大量的断言，对构造函数参数进行了详细的完整性检查，
并监视其生命周期，一旦检测到不一致，它们会立即引发异常，

In some cases, this is taken to extremes: for example, when running
unit tests, regardless of what else the test is doing, every `RenderBox`
subclass that is laid out aggressively inspects whether its intrinsic
sizing methods fulfill the intrinsic sizing contract. This helps catch
errors in APIs that might otherwise not be exercised.

这在某些情况下是极端情况：比如，在执行单元测试时，无论测试用例正在做什么，每个 `RenderBox`
子类都会主动地检查其内部大小调整方法是否满足内部大小调整契约。这有助于捕获 API
中可能无法执行的错误。

When exceptions are thrown, they include as much information as
is available. Some of Flutter's error messages proactively probe the
associated stack trace to determine the most likely location of the
actual bug. Others walk the relevant trees to determine the source
of bad data. The most common errors include detailed instructions
including in some cases sample code for avoiding the error, or links
to further documentation.

当异常抛出时，它们会包含尽可能多的信息。Flutter 中的一些错误会主动探测相关的堆栈跟踪信息，
以确定实际错误最可能发生的位置。其他错误则通过相关树来确定坏数据的来源。
最常见的错误包含详细说明（在某些情况下会包含避免错误的示例代码），或指向其他文档的链接。

### Reactive paradigm
### 响应式

Mutable tree-based APIs suffer from a dichotomous access pattern:
creating the tree's original state typically uses a very different
set of operations than subsequent updates. Flutter's rendering layer
uses this paradigm, as it is an effective way to maintain a persistent tree,
which is key for efficient layout and painting. However, it means
that direct interaction with the rendering layer is awkward at best
and bug-prone at worst.

可变的基于树结构的 API 受二元访问模式的影响：创建树的原始状态通常使用与后续更新完全不同的操作集。Flutter
的渲染层使用了这种范式，因为它是维护持久树的有效方法，是高效布局和绘制的关键所在。
但这也意味着，与渲染层的直接交互是十分笨拙的，甚至极其容易出错。

Flutter's widget layer introduces a composition mechanism using the
reactive paradigm to manipulate the underlying rendering tree.
This API abstracts out the tree manipulation by combining the tree
creation and tree mutation steps into a single tree description (build)
step, where, after each change to the system state, the new configuration
of the user interface is described by the developer and the framework
computes the series of tree mutations necessary to reflect this new
configuration.

Flutter 在 widget 层引入了一个使用响应式来操作底层渲染树的组合机制。该 API
通过将树的创建和更新步骤整合到一个单一的树结构描述（构建）中，从而将树操作抽象出来，
这包括：每次系统状态更新之后，开发者用于描述用户界面的新配置；框架对于新配置所需要进行的一系列树更新计算。

### 插值

Since Flutter's framework encourages developers to describe the interface
configuration matching the current application state, a mechanism exists
to implicitly animate between these configurations.

由于 Flutter 鼓励开发者描述与当前应用状态相匹配的界面配置，因此存在一种在这些配置之间执行隐式的动画机制。

For example, suppose that in state S<sub>1</sub> the interface consists
of a circle, but in state S<sub>2</sub> it consists of a square.
Without an animation mechanism, the state change would have a jarring
interface change. An implicit animation allows the circle to be smoothly
squared over several frames.

例如，假设界面在状态 S<sub>1</sub> 由一个圆形组成，在状态 S<sub>2</sub>
时由一个正方形组成。如果没有动画机制，状态更改将导致不和谐的界面更改。
隐式动画则允许界面在几个帧的时间里由圆形平滑地过渡到正方形。

Each feature that can be implicitly animated has a stateful widget that
keeps a record of the current value of the input, and begins an animation
sequence whenever the input value changes, transitioning from the current
value to the new value over a specified duration.

每个可执行隐式动画的特性都包含一个 stateful widget，它用于记录输入的当前值，并在输入值改变时开始执行动画序列，
并在指定的持续时间内从当前值转换为新值。

This is implemented using `lerp` (linear interpolation) functions using
immutable objects. Each state (circle and square, in this case)
is represented as an immutable object that is configured with
appropriate settings (color, stroke width, etc) and knows how to paint
itself. When it is time to draw the intermediate steps during the animation,
the start and end values are passed to the appropriate `lerp` function
along with a _t_ value representing the point along the animation,
where 0.0 represents the `start` and 1.0 represents the `end`,
and the function returns a third immutable object representing the
intermediate stage.

这是使用不可变对象的 `lerp`（线性插值）函数来实现的。
每个状态（这里为圆形和正方形）代表一个配置中包含恰当设置（比如颜色、笔划宽度等）且知道如何绘制自己的不可变对象。
在动画绘制中间步骤时，开始和结束值连同表示动画中点的 **t** 值一并传递给 `lerp`函数。其中 0.0
代表开始，1.0 代表结束，并且该方法返回表示中间阶段的第三个不可变对象。

For the circle-to-square transition, the `lerp` function would return
an object representing a "rounded square" with a radius described as
a fraction derived from the _t_ value, a color interpolated using the
`lerp` function for colors, and a stroke width interpolated using the
`lerp` function for doubles. That object, which implements the
same interface as circles and squares, would then be able to paint
itself when requested to.

对于从圆形到正方形的转换，`lerp` 函数将返回一个圆角正方形对象，其半径被描述为从 **t**
值导出的分数，使用 `lerp` 函数进行插值计算的颜色，以及使用 `lerp`
函数进行双倍插值计算的笔划宽度。该对象与圆形、正方形一样具有相同的接口实现，并且可以在请求时进行自我绘制。

This technique allows the state machinery, the mapping of states to
configurations, the animation machinery, the interpolation machinery,
and the specific logic relating to how to paint each frame to be
entirely separated from each other.

该技术允许状态机、状态到配置的映射、动画和插值机制以及与如何绘制每一桢完全分离的特定逻辑。

This approach is broadly applicable. In Flutter, basic types like
`Color` and `Shape` can be interpolated, but so can much more elaborate
types such as `Decoration`, `TextStyle`, or `Theme`. These are
typically constructed from components that can themselves be interpolated,
and interpolating the more complicated objects is often as simple as
recursively interpolating all the values that describe the complicated
objects.

在 Flutter 中，该机制得到了广泛应用。无论是像 `Color` 和 `Shape` 这样的基本类型，还是像
`Decoration`，`TextStyle` 或 `Theme` 这样更为复杂的类型，都是可以进行插值处理的。
它们通常是由可插入组件构成的，并且插入更复杂的对象通常就像递归插入描述复杂对象的所有值一样简单。

Some interpolatable objects are defined by class hierarchies. For example,
shapes are represented by the `ShapeBorder` interface, and there exists a
variety of shapes, including `BeveledRectangleBorder`, `BoxBorder`,
`CircleBorder`, `RoundedRectangleBorder`, and `StadiumBorder`. A single
`lerp` function cannot have a priori knowledge of all the possible types,
and therefore the interface instead defines `lerpFrom` and `lerpTo` methods,
which the static `lerp` method defers to. When told to interpolate from
a shape A to a shape B, first B is asked if it can `lerpFrom` A, then,
if it cannot, A is instead asked if it can `lerpTo` B. (If neither is
possible, then the function returns A from values of `t` less than 0.5,
and returns B otherwise.)

一些插值对象由类层次结构定义。比如，形状由 `ShapeBorder` 接口表示，并且存在多种形状类型，包括：
`BeveledRectangleBorder`、`BoxBorder`、`CircleBorder`、`RoundedRectangleBorder`
和 `StadiumBorder`。单一的 `lerp` 函数并不能了解所有可能的类型信息，因此接口定义
了 `lerpFrom` 和 `lerpTo` 方法以替代静态的 `lerp` 方法。当被告知从形状 A 切换到 B
时，将首选询问 B 是否 `lerpFrom` A，如其答案为否，则询问 A 是否可以
`lerpTo` B（如两者的答案均为否，如果 `t` 的值小于 0.5 则返回 A，否则返回 B）。

This allows the class hierarchy to be arbitrarily extended, with later
additions being able to interpolate between previously-known values
and themselves.

这允许类层次结构的任意扩展，后续新增的能够在先前已知值与它们之间进行插值处理。

In some cases, the interpolation itself cannot be described by any of
the available classes, and a private class is defined to describe the
intermediate stage. This is the case, for instance, when interpolating
between a `CircleBorder` and a `RoundedRectangleBorder`.

在某些情况下，插值本身不能被任何可用的类描述，并且定义类一个私有类来描述中间状态。比如在
`CircleBorder` 和 `RoundedRectangleBorder` 之间进行插值时就是如此。

This mechanism has one further added advantage: it can handle interpolation
from intermediate stages to new values. For example, half-way through
a circle-to-square transition, the shape could be changed once more,
causing the animation to need to interpolate to a triangle. So long as
the triangle class can `lerpFrom` the rounded-square intermediate class,
the transition can be seamlessly performed.

该机制的另外一个优点是：它可以处理从中间态到新值的插值。
比如，在圆形到正方形过渡的中途，形状可能再次改变，导致动画需要插值到一个三角形。只要该三角形类是
`lerpFrom` 圆形到正方形的中间类，就可以无缝进行转换。

## Conclusion
## 结论

Flutter’s slogan, "everything is a widget," revolves around building
user interfaces by composing widgets that are, in turn, composed of
progressively more basic widgets. The result of this aggressive
composition is a large number of widgets that require carefully
designed algorithms and data structures to process efficiently.
With some additional design, these data structures also make it
easy for developers to create infinite scrolling lists that build
widgets on demand when they become visible.

Flutter 一切都是 widget 的口号是围绕着通过组合 widget 来构建用户界面，widget
又由更为基础的 widget 构成。这种积极组合的结果是需要精心设计的算法和数据结构才能有效处理大量的
widget。通过一些额外的机制，这些数据结构还能使开发者轻松构建无限滚动列表，以便在 widget
可见时进行按需构建。

---
**Footnotes:**

**脚注：**

<sup><a name="a1">1</a></sup> For layout, at least. It may be revisited
  for painting, for building the accessibility tree if necessary,
  and for hit testing if necessary.

<sup><a name="a1">1</a></sup> 至少对于布局来说。它可能会重新审视绘制、在必要时构建辅助功能树、
  以及必要时的命中测试。

<sup><a name="a2">2</a></sup> Reality, of course, is a bit more
  complicated. Some layouts involve intrinsic dimensions or baseline
  measurements, which do involve an additional walk of the relevant subtree
  (aggressive caching is used to mitigate the potential for quadratic
  performance in the worst case). These cases, however, are surprisingly
  rare. In particular, intrinsic dimensions are not required for the
  common case of shrink-wrapping.

<sup><a name="a2">2</a></sup> 现实情况当然更复杂一些。有些布局涉及内部维度及基线测量，
  这涉及到相关子树的额外遍历（在最坏的情况下，使用积极缓存来降低潜在的二次性能）。
  但是，这些情况非常罕见。特别是在常见的 shrink-wrapping 情况下，根本不需要内部尺寸。

<sup><a name="a3">3</a></sup> Technically, the child's position is not
  part of its RenderBox geometry and therefore need not actually be
  calculated during layout. Many render objects implicitly position
  their single child at 0,0 relative to their own origin, which
  requires no computation or storage at all. Some render objects
  avoid computing the position of their children until the last
  possible moment (for example, during the paint phase), to avoid
  the computation entirely if they are not subsequently painted.

<sup><a name="a3">3</a></sup> 严格来说，子节点的位置不是其 RenderBox
  几何体的一部分，因此无需在布局期间进行实际计算。许多渲染对象隐式地将它们的单个子节点相对于它们自身的原点定位在
  0,0 处，这根本不需要进行计算或存储。一些渲染对象避免计算它们子节点的位置直到最后可能需要的时刻（比如，
  在绘制过程中），以避免以后没有被绘制时的计算。

<sup><a name="a4">4</a></sup>  There exists one exception to this rule.
  As discussed in the [Building widgets on demand](#building-widgets-on-demand)
  section, some widgets can be rebuilt as a result of a change in layout
  constraints. If a widget marked itself dirty for unrelated reasons in
  the same frame that it also is affected by a change in layout constraints,
  it will be updated twice. This redundant build is limited to the
  widget itself and does not impact its descendants.

<sup><a name="a4">4</a></sup>  该规则有一个例外。正如[按需构建 widget](#building-widgets-on-demand)
  中所描述的，由于布局约束的变化，一些 widget 可以被重建。如果 widget
  在同一帧中因与此无关的原因被标记为脏，同时也由于它受布局约束的影响，该 widget
  将会被构建两次。该次冗余构建仅限于 widget 自身，并不会影响其后代节点。

<sup><a name="a5">5</a></sup> A key is an opaque object optionally
  associated with a widget whose equality operator is used to influence
  the reconciliation algorithm.

<sup><a name="a5">5</a></sup> 键是一个可选的与 widget 相关联的不透明对象，它的相等操作符用于影响协调算法。

<sup><a name="a6">6</a></sup>  For accessibility, and to give applications
  a few extra milliseconds between when a widget is built and when it
  appears on the screen, the viewport creates (but does not paint)
  widgets for a few hundred pixels before and after the visible widgets.

<sup><a name="a6">6</a></sup>  对于可访问性，并在 widget
  构建及在窗口显示的过程中为应用提供几毫米的时间，视窗口会在可见 widget
  的前后为几百个像素构建（但不进行绘制）widget。

<sup><a name="a7">7</a></sup>  This approach was first made popular by
  Facebook's React library.

<sup><a name="a7">7</a></sup>  该方法首次在 Facebook 的 React 框架中得到了广泛使用。

<sup><a name="a8">8</a></sup>  In practice, the _t_ value is allowed
  to extend past the 0.0-1.0 range, and does so for some curves. For
  example, the "elastic" curves overshoot briefly in order to represent
  a bouncing effect. The interpolation logic typically can extrapolate
  past the start or end as appropriate. For some types, for example,
  when interpolating colors, the _t_ value is effectively clamped to
  the 0.0-1.0 range.

<sup><a name="a8">8</a></sup>  实际上，允许 **t** 值超过 0.0-1.0
  的范围，这同样适用于某些曲线。比如 elastic 缓动曲线通过短暂的过冲来表示弹跳效应。
  插值逻辑通常可以在适当情况下推算出起始或结束点。对于某些类型，比如在插入颜色时，**t**
  值被有效地固定到 0.0-1.0 的范围。
