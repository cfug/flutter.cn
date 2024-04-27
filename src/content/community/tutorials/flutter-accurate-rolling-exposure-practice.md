---
title: 实现一个精准滑动埋点
toc: true
---

文/ Vadaski，CFUG 社区成员，滴滴国际化研发工程师

## 前言

今天的这篇文章要介绍的内容，是我们经常会用到的一个场景：**埋点**。
为了对行为特征的数据进行量化分析，优化产品，
我们常常需要在特定的时机上报数据埋点，想必大家都对它比较熟悉。
而曝光埋点则是其中的一个高频使用场景。

## 🥲 滑动埋点的痛

在 Flutter 中，我们通常会在 `initState` 这个生命周期上报曝光埋点，这在一般的使用场景下当然是没有问题的。然而在滑动场景下这个解决方案就不 work 了，我们来看看。

![listview_track.gif](https://files.flutter-io.cn/posts/community/tutorial/images/listview_track.gif)

很明显，我们把本来没有展示的 widget 也给打印出来了。如果这样做，埋点上报不准确，将会给业务带来不可恢复的损失。

## 🤯 ScrollView 加载机制

为什么会出现这种情况呢？在查阅了源码之后，我们发现所有的 `ScrollView` 都是在一个可视区域 `Viewport` 当中进行绘制，为了让滑动更加流畅，通常 `ScrollView` 都会在可视区域之外加载一部分，也就是 `cacheExtent`。落入该缓存区域的项目即使在屏幕上尚不可见，也会进行布局。这时候 `initState` 就被执行了。 `ListView` 作为 `ScrollView` 的子类同样也使用了这个机制。

那么很自然我们能够想到一个最简单的解决方案：把预加载机制给禁用掉不就可以了嘛。


```dart
ListView.builder(
  cacheExtent: 0,
  itemCount: 40,
  itemBuilder: (context, index) {
    return Item(index: index);
  },
),
```

![no_cache_extent.gif](https://files.flutter-io.cn/posts/community/tutorial/images/no_cache_extent.gif)

好了，本文到此结束，你学会了吗。😏

## 🤔 新的问题

开个玩笑，相信大家很容易就能够联想到，这样做大概率会产生性能问题。在我们真实业务中，会考虑到支持的最差的设备性能，以及业务的复杂性，肯定不是这样简单的取消掉预加载就能够解决的。

在做测试的时候，会发现如果去掉缓存机制，平均帧率会下降 5-10 帧左右，
还是在比较好的一加手机上的测试结果，这当然是不能接受的。
(更何况本身在 1.x 版本 的 Flutter 下 ListView 性能就有一些问题。)

所以我们想要的是一套 `Flutter` 上的高准确率的用户行为埋点方案，而且不要影响到 `ScrollView` 的性能。

## 🤨 破局

想清楚了需求，就有了一半的思路。在我们查阅了业界现有的资料后，发现闲鱼技术已经分享了一个比较好的解题思路：[# 揭秘！一个高准确率的Flutter埋点框架如何设计](https://juejin.cn/post/6844903864479514631#comment)。
奈何这个方案也没有开源的计划，那就只有自己来写一个吧。这个问题应该如何解呢？

在前面我们提到过，每一个 `ScrollView` 都会有一个自己的 `ViewPort` 来决定自己的绘制范围，这个 `ViewPort` 最后会生成一个 `RenderObjectElement`，这样就可以单独渲染这个区域，把影响返回控制到最小。那么问题现在就变成了我们想要计算一个 Item 什么时候进入到 ViewPort 中。

**一个复杂的问题需要把它抽象成更简单的问题然后逐步求解**，我们不妨先把 item 看成一个点，看看要计算一个 Item 是否在 Viewport 内需要哪些信息。

很容易能够想到和滑动的偏移量 (Scroll Offset)，以及 Viewport 在滑动方向上的长度 (Viewport Length)，
还有 item 自身的信息，也就是当前 item 距离滑动起始点的距离 (Exposure Offset) 相关。

![简易关键变量.jpg](https://files.flutter-io.cn/posts/community/tutorial/images/simple_key_variable.jpg)

想象一下滑动的样子，一个 Item 从 `ViewPort` 的右边滑入，进入 `ViewPort`，被用户看到，然后再从 `ViewPort` 的左边划出，这一系列过程。我们可以把这个过程抽象为下面的四个状态：
- **Item 在 `ViewPort` 右侧不可视范围内**：(Scroll Offset + ViewPort Length < Exposure Offset)
- **Item 进入 `ViewPort` 右侧**：(Scroll Offset + ViewPort Length > Exposure Offset)
- **Item 在 ViewPort 中**
- **Item 在 `ViewPort` 左侧不可视范围内**：(Exposure Offset < Scroll Offset)


对于从左边划入右边则是这几个状态：

- **Item 在 `ViewPort` 左侧不可视范围内**：(Exposure Offset < Scroll Offset)
- **Item 进入 `ViewPort` 左侧**：(Exposure Offset > Scroll Offset)
- **Item 在 ViewPort 中**
- **Item 在 `ViewPort` 右侧不可视范围内**：(Scroll Offset + ViewPort Length < Exposure Offset)

通过观察可以发现，Item 从左边划入和从右边划入它的判断时机是不一样的，所以我们需要区分两种滑动情况。

下面我们把 Item 自身的宽度 (Item Width）也带上，再使用上面得出的结论来进行计算。

> 我们这里暂时认为 Item 完全划入 ViewPort 才算一次曝光。

![关键变量.jpg](https://files.flutter-io.cn/posts/community/tutorial/images/key_variable.jpg)

- **Item 在 `ViewPort` 右侧不可视范围内**：(Scroll Offset + ViewPort Length < Exposure Offset)
- **Item 进入 `ViewPort` 右侧**：(Scroll Offset + ViewPort Length > Exposure Offset)
- **Item 在 ViewPort 中**
- **Item 在 `ViewPort` 左侧不可视范围内**：(Exposure Offset + Item Width < Scroll Offset)


对于从左边划入右边则是这几个状态：

- **Item 在 `ViewPort` 左侧不可视范围内**：(Exposure Offset + Item Width < Scroll Offset)
- **Item 进入 `ViewPort` 左侧**：(Exposure Offset + Item Width > Scroll Offset)
- **Item 在 ViewPort 中**
- **Item 在 `ViewPort` 右侧不可视范围内**：(Scroll Offset + ViewPort Length < Exposure Offset)

## 🧩 如何获取这些信息

知道了解法之后，接下来就只需要寻找这些拼图的碎片就行了。

### Item 大小信息

这块比较简单，我们都知道可以通过 Widget 的 `BuildContext` 拿到它所对应的 `RenderObject`，通过它去拿当前 Item 的长度和宽度。

```dart
// 这里命名为曝光坑位的大小，对于不同滑动方向，我们需要用不同方向的长度。
final exposurePitSize = (context.findRenderObject() as RenderBox).size;
```
这里的 context 是我们想要判断是否曝光的 Item 的 context，如果你对这个概念还不太清楚，可以去看看这篇 [深入理解BuildContext](https://juejin.cn/post/6844903777565147150)。

> 注意：不是每个 `Widget` 都会创建一个 `RenderObject`，只有 `RenderObjectWidget` 才会创建 `RenderObject`。 `ListView` 会默认帮每一个 Item 添加一个 `RepaintBoundary`，这个 `Widget` 是一个 `SingleChildRenderObjectWidget`，所以每一个 Item 其实都会有一个它所对应的 `RenderObject`。 

```dart
// SliverChildListDelegate 的 build 方法
if (addRepaintBoundaries) child = RepaintBoundary(child: child);
```
### ViewPort 大小信息

我们在进行曝光判断的时候，肯定是在每一个 Item 中进行的，而 `ViewPort` 则是存在于 `ListView` 这一层级，所以我们需要从祖先的节点中找到它，幸运的是，Flutter 已经为我们提供了这个方法。
```dart
static RenderAbstractViewport? of(RenderObject? object) {
  while (object != null) {
    if (object is RenderAbstractViewport)
      return object;
    object = object.parent as RenderObject?;
  }
  return null;
}
```
我们刚刚已经拿到了 Item 对应的渲染对象，`RenderAbstractViewport.of` 可以通过这个 `RenderObject` 向上寻找祖先节点，直到发现离它最近一个节点的 `RenderAbstractViewport` 就能拿到我们想要的 `ViewPort` 信息了。

```dart
Size? getViewPortSize(BuildContext context) {
  final RenderObject? box = context.findRenderObject();
  final RenderAbstractViewport? viewport = RenderAbstractViewport.of(box);
  assert(() {
    if (viewport != null) {
      debugPrint('Please make sure you have a `ScrollView` in ancestor');
      return false;
    }
    return true;
  });
  final Size? size = viewport?.paintBounds.size;
  return size;
}
```
### Item 相对 ViewPort 的滑动起始点的距离

在 `RenderAbstractViewport` 的另一个方法 `getOffsetToReveal`，中，我们可以获得当前的 `RenderObject` 相对于这个 ViewPort 滑动的起始位置。

```dart
double getExposureOffset(BuildContext context) {
  final RenderObject? box = context.findRenderObject();
  final RenderAbstractViewport? viewport = RenderAbstractViewport.of(box);

  if (viewport == null || box == null || !box.attached) {
    return 0.0;
  }

  // box 为当前 Item 的 RenderObject
  // alignment 为 0 的时候获得距离起点的相对偏移量
  // 为 1 的时候获得距离终点的相对偏移量。
  final RevealedOffset offsetRevealToTop =
      viewport.getOffsetToReveal(box, 0.0, rect: Rect.zero);
  return offsetRevealToTop.offset;
}
```

### 滑动距离

要获得滑动距离通常有两种方式：
- 通过 `ScrollController` 获得。
- 利用 Scrollable Widget 的 `Notification` 机制。

每次编写代码的时候都必须得写 `ScrollController` 看上去有些麻烦，所以我们选择了`Notification` 这种方式。(它也更加通用)

#### Scroll Notification

Scrollable Widget 将会向其其祖先通知有关滚动变化信息，而这些信息能够使用 `NotificationListener` 来捕获到。目前有下面几种 `Notification`:

- `ScrollStartNotification`：滚动开始时发起 `Notification`。
- `ScrollUpdateNotification`：滚动进行时不断发起 `Notification`。(频率很高)
- `ScrollEndNotification`：滚动结束时发起 `Notification`。
- `UserScrollNotification`：当用户改变滚动方向时，发起通知。(通常在不同方向的 ScrollView 互相嵌套时会出现)

我们这里使用 `NotificationListener` 来获取 滑动的信息。

```dart
Widget buildNotificationWidget(BuildContext context, Widget child) {
  return NotificationListener<ScrollNotification>(
    onNotification: (scrollNotification) {
      // 这里就能获取到滚动信息
    },
    child: ScrollView,
  );
}
```

#### 解决信息共享问题

看到这里，似乎我们要的拼图都凑齐了，但是总感觉哪里不对劲？🧐

如果你敏锐的话，想必已经发现我们现在这样的设计根本没法在一个地方拿到全部信息。

![数据获取位置不一致.jpg](https://files.flutter-io.cn/posts/community/tutorial/images/tree.jpg)

Scroll Notification 仅会向祖先节点发起 Notification 通知，也就是说，我们在 Item 层级是拿不到的！

如果我们想要在 Item 中进行埋点曝光判定，就必须要获取到更高的祖先节点中的 scrollNotification。

当然解法肯定有很多，共享状态的方法在状态管理中是一个常见的 Case，但是为了滑动埋点曝光就引入一个状态管理库似乎有些得不偿失，所以还不如使用 Flutter 最原始的 Inherit 机制来实现数据的共享。

##### 什么是 Inherit 机制

要理解 Inherit 机制，首先你需要了解 Flutter 的三棵树，
这个网上的解释文章已经有很多了，我就不再赘述，
感兴趣的可以看看 [迷鹿](https://juejin.cn/user/4309694831660711)
的这篇 [Widget、Element、Render是如何形成树结构？](https://juejin.cn/post/6921493845330886670)。

简单来说，Inherit 机制是一种能够在 Flutter 中自顶向下共享数据的方式，我们知道 Flutter 是通过树形结构来构建视图的，而其中的 `InheritedWidget` 则是能够让它的数据能够被所有子节点中的 Widget 访问到。

它的原理也是很简单，每个 Element 都持有了一个叫做 `Map<Type, InheritedElement>? _inheritedWidgets` 的 `Map` 的引用，当我们的 Element 在挂载到 Element Tree 的时候 (执行 `mount` 操作的时候会调用 `_updateInheritance`)，将会把 parent 中保存的 `_InheritedWidget` 引用自己也给留一份。

```dart
void _updateInheritance() {
  assert(_lifecycleState == _ElementLifecycle.active);
  _inheritedWidgets = _parent?._inheritedWidgets;
}
```

而 `InheritedWidget` 创建的 Element 则会在 mount 的时候把自己给塞到这个 map 当中，这样就完成了自顶向下的数据共享了。

```dart
@override
void _updateInheritance() {
  assert(_lifecycleState == _ElementLifecycle.active);
  final Map<Type, InheritedElement>? incomingWidgets = _parent?._inheritedWidgets;
  if (incomingWidgets != null)
    _inheritedWidgets = HashMap<Type, InheritedElement>.from(incomingWidgets);
  else
    _inheritedWidgets = HashMap<Type, InheritedElement>();
  _inheritedWidgets![widget.runtimeType] = this;
}
```

基于此，我们就可以完成对于滑动埋点曝光的计算了，可喜可贺。

## 拿来吧你

像我们这样有经验的开发者，看到这样好的文章，第一时间那一定是想要~~自己实践一下~~

> 直接拿来吧你

所以为了各位宝贵的 (滑水/唠嗑/带娃/...) 时间，这款滑动埋点方案已经登陆了 [Pub 仓库](https://pub.flutter-io.cn/packages/flutter_exposure)，各位可以放心食用了。

目前已经支持的有：

- 懒曝光模式：仅当滚动结束时再曝光。
- 曝光比例：可以控制 Item 展现多大的范围算是一次曝光。
- 追踪 Item 何时离开可视范围：可以获取到曝光时长。
- 支持所有 ScrollView：包括 `ListView`、`GridView`、`CustomScrollView` 等等。

这个项目我会一直维护下去 (毕竟自己也要用)，
如果你想了解该项目的最新进展，
可以关注该项目的 [GitHub](https://github.com/Vadaski/flutter_exposure)，
或者有需要增加的功能需求，也欢迎通过 [邮箱](mailto:xinlei966@gmail.com) 与我联系～

Pub 地址：https://pub.flutter-io.cn/packages/flutter_exposure

Github 地址：https://github.com/Vadaski/flutter_exposure

邮箱：xinlei966@gmail.com

## 写在最后

这个解决方案其实是在去年公司里就用到了，一直没有来得及开源。
在这里也感谢 [闲鱼技术](https://juejin.cn/post/6955304605190357005) 提供的宝贵思路，
最近凑了一些零零碎碎的时间把它给完成了，把趁着国庆第一天写完了这篇文章，
希望大家能通过我的分享有一点点收获～

我是鑫磊，和你一起快乐学习 Flutter 的工程师，大家国庆快乐，我们之后再见👋
