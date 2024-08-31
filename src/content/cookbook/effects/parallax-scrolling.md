---
title: Create a scrolling parallax effect
description: How to implement a scrolling parallax effect.
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/effects/parallax_scrolling"?>

When you scroll a list of cards (containing images,
for example) in an app, you might notice that those
images appear to scroll more slowly than the rest of the
screen. It almost looks as if the cards in the list
are in the foreground, but the images themselves sit
far off in the distant background. This effect is
known as parallax.

In this recipe, you create the parallax effect by building
a list of cards (with rounded corners containing some text).
Each card also contains an image.
As the cards slide up the screen,
the images within each card slide down.

The following animation shows the app's behavior:

![Parallax scrolling](/assets/images/docs/cookbook/effects/ParallaxScrolling.gif){:.site-mobile-screenshot}

## Create a list to hold the parallax items

To display a list of parallax scrolling images,
you must first display a list.

Create a new stateless widget called `ParallaxRecipe`.
Within `ParallaxRecipe`, build a widget tree with a
`SingleChildScrollView` and a `Column`, which forms
a list.

<<<<<<< Updated upstream
=======
创建一个新的 stateless widget，
名为 `ParallaxRecipe`。
在 `ParallaxRecipe` 中，
构建一个包含 `SingleChildScrollView` 和 `Column` 的 widget 树，
这样就形成了一个列表。

>>>>>>> Stashed changes
<?code-excerpt "lib/excerpt1.dart (ParallaxRecipe)"?>
```dart
class ParallaxRecipe extends StatelessWidget {
  const ParallaxRecipe({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
      child: Column(
        children: [],
      ),
    );
  }
}
```

## Display items with text and a static image

<<<<<<< Updated upstream
=======
## 显示带有文本和静态图片的列表项

>>>>>>> Stashed changes
Each list item displays a rounded-rectangle background
image, representing one of seven locations in the world.
Stacked on top of that background image is the
name of the location and its country,
positioned in the lower left. Between the
background image and the text is a dark gradient,
which improves the legibility
of the text against the background.

<<<<<<< Updated upstream
=======
每个列表项显示一个圆角矩形背景图片，
代表世界上的七个地点之一。
在该背景图片的左下角叠加了地点名称及其所在国家。
在背景图片和文字之间有一个深色渐变层，
以提高文字在背景上的可读性。

>>>>>>> Stashed changes
Implement a stateless widget called `LocationListItem`
that consists of the previously mentioned visuals.
For now, use a static `Image` widget for the background.
Later, you'll replace that widget with a parallax version.

<<<<<<< Updated upstream
=======
实现一个名为 `LocationListItem` 的 stateless widget，
该 widget 包含之前提到的视觉效果。
现在，使用一个静态的 `Image` widget 作为背景。
稍后，你将用视差版本的 widget 替换这个静态图片 widget。

>>>>>>> Stashed changes
<?code-excerpt "lib/excerpt2.dart (LocationListItem)"?>
```dart
@immutable
class LocationListItem extends StatelessWidget {
  const LocationListItem({
    super.key,
    required this.imageUrl,
    required this.name,
    required this.country,
  });

  final String imageUrl;
  final String name;
  final String country;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            children: [
              _buildParallaxBackground(context),
              _buildGradient(),
              _buildTitleAndSubtitle(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildParallaxBackground(BuildContext context) {
    return Positioned.fill(
      child: Image.network(
        imageUrl,
        fit: BoxFit.cover,
      ),
    );
  }

  Widget _buildGradient() {
    return Positioned.fill(
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.transparent, Colors.black.withOpacity(0.7)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.6, 0.95],
          ),
        ),
      ),
    );
  }

  Widget _buildTitleAndSubtitle() {
    return Positioned(
      left: 20,
      bottom: 20,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            country,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
```

Next, add the list items to your `ParallaxRecipe` widget.

<?code-excerpt "lib/excerpt3.dart (ParallaxRecipeItems)"?>
```dart
class ParallaxRecipe extends StatelessWidget {
  const ParallaxRecipe({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          for (final location in locations)
            LocationListItem(
              imageUrl: location.imageUrl,
              name: location.name,
              country: location.place,
            ),
        ],
      ),
    );
  }
}
```

You now have a typical, scrollable list of cards
that displays seven unique locations in the world.
In the next step, you add a parallax effect to the
background image.

<<<<<<< Updated upstream
=======
现在，你有了一个常见的可滚动卡片列表，
展示了世界上七个独特的地点。
在下一步中，你将为背景图片添加视差效果。

>>>>>>> Stashed changes
## Implement the parallax effect

A parallax scrolling effect is achieved by slightly
pushing the background image in the opposite direction
of the rest of the list. As the list items slide up
the screen, each background image slides slightly downward.
Conversely, as the list items slide down the screen,
each background image slides slightly upward.
Visually, this results in parallax.

<<<<<<< Updated upstream
=======
视差滚动效果通过轻微地将背景图片推向
与列表其余部分相反的方向来实现。
当列表项向上滑动时，每个背景图片会轻微向下滑动。
相反，当列表项向下滑动时，
每个背景图片会轻微向上滑动。
从视觉上看，这就产生了视差效果。

>>>>>>> Stashed changes
The parallax effect depends on the list item's
current position within its ancestor `Scrollable`.
As the list item's scroll position changes, the position
of the list item's background image must also change.
This is an interesting problem to solve. The position
of a list item within the `Scrollable` isn't
available until Flutter's layout phase is complete.
This means that the position of the background image
must be determined in the paint phase, which comes after
the layout phase. Fortunately, Flutter provides a widget
called `Flow`, which is specifically designed to give you
control over the transform of a child widget immediately
before the widget is painted. In other words,
you can intercept the painting phase and take control
to reposition your child widgets however you want.

<<<<<<< Updated upstream
=======
视差效果依赖于列表项在其祖先 `Scrollable` 中的当前位置。
随着列表项的滚动位置变化，
列表项的背景图片位置也必须随之变化。
这是一个有趣的问题，
因为在 Flutter 的布局阶段完成之前，
无法获取列表项在 `Scrollable` 中的位置。
这意味着背景图片的位置必须在绘制阶段确定，
而绘制阶段在布局阶段之后进行。
幸运的是，Flutter 提供了一个名为 `Flow` 的 widget，
专门设计用于在 widget 被绘制之前立即控制子 widget 的变换。
换句话说，你可以拦截绘制阶段并控制子 widget 的位置，
以便按照你的需求重新定位。

>>>>>>> Stashed changes
:::note
To learn more, check out this short
Widget of the Week video on the `Flow` widget:

<<<<<<< Updated upstream
=======
要了解更多信息，
请观看这段关于 `Flow` widget (Flutter widget of the week) 的简短视频：

>>>>>>> Stashed changes
{% ytEmbed 'NG6pvXpnIso', 'Flow | Flutter widget of the week' %}
:::

:::note
In cases where you need control over what a child paints,
rather than where a child is painted,
consider using a [`CustomPaint`][] widget.

<<<<<<< Updated upstream
In cases where you need control over the layout,
painting, and hit testing, consider defining a
custom [`RenderBox`][].
=======
如果你需要控制子 widget 绘制内容，
而不是子 widget 的绘制位置时，
可以考虑使用 [`CustomPaint`][] widget。

In cases where you need control over the layout,
painting, and hit testing, consider defining a
custom [`RenderBox`][].

如果你需要控制布局、绘制和点击测试时，
可以考虑自定义一个 [`RenderBox`][]。

>>>>>>> Stashed changes
:::

Wrap your background `Image` widget with a
[`Flow`][] widget.

<<<<<<< Updated upstream
=======
用 [`Flow`][] widget 包裹你的背景 `Image` widget。

>>>>>>> Stashed changes
<?code-excerpt "lib/excerpt4.dart (BuildParallaxBackground)" replace="/\n    delegate: ParallaxFlowDelegate\(\),//g"?>
```dart
Widget _buildParallaxBackground(BuildContext context) {
  return Flow(
    children: [
      Image.network(
        imageUrl,
        fit: BoxFit.cover,
      ),
    ],
  );
}
```

Introduce a new `FlowDelegate` called `ParallaxFlowDelegate`.

<?code-excerpt "lib/excerpt4.dart (BuildParallaxBackground)"?>
```dart
Widget _buildParallaxBackground(BuildContext context) {
  return Flow(
    delegate: ParallaxFlowDelegate(),
    children: [
      Image.network(
        imageUrl,
        fit: BoxFit.cover,
      ),
    ],
  );
}
```

<?code-excerpt "lib/excerpt4.dart (parallax-flow-delegate)" replace="/\n    return constraints;//g"?>
```dart
class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate();

  @override
  BoxConstraints getConstraintsForChild(int i, BoxConstraints constraints) {
    // TODO: We'll add more to this later.
  }

  @override
  void paintChildren(FlowPaintingContext context) {
    // TODO: We'll add more to this later.
  }

  @override
  bool shouldRepaint(covariant FlowDelegate oldDelegate) {
    // TODO: We'll add more to this later.
    return true;
  }
}
```

A `FlowDelegate` controls how its children are sized
and where those children are painted. In this case,
your `Flow` widget has only one child: the background image.
That image must be exactly as wide as the `Flow` widget.

<<<<<<< Updated upstream
=======
`FlowDelegate` 控制其子 widget 的大小和绘制位置。
在本教程中，
你的 `Flow` widget 只有一个子 widget：背景图片。
该图片的宽度必须与 `Flow` widget 的宽度完全一致。

>>>>>>> Stashed changes
Return tight width constraints for your background image child.

<?code-excerpt "lib/main.dart (TightWidth)"?>
```dart
@override
BoxConstraints getConstraintsForChild(int i, BoxConstraints constraints) {
  return BoxConstraints.tightFor(
    width: constraints.maxWidth,
  );
}
```

Your background images are now sized appropriately,
but you still need to calculate the vertical position
of each background image based on its scroll
position, and then paint it.

There are three critical pieces of information that
you need to compute the desired position of a
background image:

* The bounds of the ancestor `Scrollable`
<<<<<<< Updated upstream
=======

  祖先 `Scrollable` 的边界

>>>>>>> Stashed changes
* The bounds of the individual list item
* The size of the image after it's scaled down
   to fit in the list item

<<<<<<< Updated upstream
To look up the bounds of the `Scrollable`,
you pass a `ScrollableState` into your `FlowDelegate`.

=======
  图片缩放后的尺寸（为了适应列表项）

To look up the bounds of the `Scrollable`,
you pass a `ScrollableState` into your `FlowDelegate`.

要获取 `Scrollable` 的边界，
可以将 `ScrollableState` 传递给你的 `FlowDelegate`。

>>>>>>> Stashed changes
To look up the bounds of your individual list item,
pass your list item's `BuildContext` into your `FlowDelegate`.

To look up the final size of your background image,
assign a `GlobalKey` to your `Image` widget,
and then you pass that `GlobalKey` into your
`FlowDelegate`.

<<<<<<< Updated upstream
Make this information available to `ParallaxFlowDelegate`.

=======
要获取背景图片最终的尺寸，
可以为 `Image` widget 分配一个 `GlobalKey`，
然后将该 `GlobalKey` 传递给你的 `FlowDelegate`。

Make this information available to `ParallaxFlowDelegate`.

将这些信息提供给 `ParallaxFlowDelegate`。

>>>>>>> Stashed changes
<?code-excerpt "lib/excerpt5.dart (global-key)" plaster="none"?>
```dart
@immutable
class LocationListItem extends StatelessWidget {
  final GlobalKey _backgroundImageKey = GlobalKey();

  Widget _buildParallaxBackground(BuildContext context) {
    return Flow(
      delegate: ParallaxFlowDelegate(
        scrollable: Scrollable.of(context),
        listItemContext: context,
        backgroundImageKey: _backgroundImageKey,
      ),
      children: [
        Image.network(
          imageUrl,
          key: _backgroundImageKey,
          fit: BoxFit.cover,
        ),
      ],
    );
  }
}
```

<?code-excerpt "lib/excerpt5.dart (parallax-flow-delegate-gk)" plaster="none"?>
```dart
class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate({
    required this.scrollable,
    required this.listItemContext,
    required this.backgroundImageKey,
  });

  final ScrollableState scrollable;
  final BuildContext listItemContext;
  final GlobalKey backgroundImageKey;
}
```

Having all the information needed to implement
parallax scrolling, implement the `shouldRepaint()` method.

<?code-excerpt "lib/main.dart (ShouldRepaint)"?>
```dart
@override
bool shouldRepaint(ParallaxFlowDelegate oldDelegate) {
  return scrollable != oldDelegate.scrollable ||
      listItemContext != oldDelegate.listItemContext ||
      backgroundImageKey != oldDelegate.backgroundImageKey;
}
```

Now, implement the layout calculations for the parallax effect.

First, calculate the pixel position of a list
item within its ancestor `Scrollable`.

<?code-excerpt "lib/excerpt5.dart (paint-children)" plaster="none"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
      listItemBox.size.centerLeft(Offset.zero),
      ancestor: scrollableBox);
}
```

Use the pixel position of the list item to calculate its
percentage from the top of the `Scrollable`.
A list item at the top of the scrollable area should
produce 0%, and a list item at the bottom of the
scrollable area should produce 100%.

<?code-excerpt "lib/excerpt5.dart (paint-children-2)"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
      listItemBox.size.centerLeft(Offset.zero),
      ancestor: scrollableBox);

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction =
      (listItemOffset.dy / viewportDimension).clamp(0.0, 1.0);
  // ···
}
```

Use the scroll percentage to calculate an `Alignment`.
At 0%, you want `Alignment(0.0, -1.0)`,
and at 100%, you want `Alignment(0.0, 1.0)`.
These coordinates correspond to top and bottom
alignment, respectively.

<?code-excerpt "lib/excerpt5.dart (paint-children-3)" plaster="none"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
      listItemBox.size.centerLeft(Offset.zero),
      ancestor: scrollableBox);

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction =
      (listItemOffset.dy / viewportDimension).clamp(0.0, 1.0);

  // Calculate the vertical alignment of the background
  // based on the scroll percent.
  final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);
}
```

Use `verticalAlignment`, along with the size of the
list item and the size of the background image,
to produce a `Rect` that determines where the
background image should be positioned.

<?code-excerpt "lib/excerpt5.dart (paint-children-4)" plaster="none"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
      listItemBox.size.centerLeft(Offset.zero),
      ancestor: scrollableBox);

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction =
      (listItemOffset.dy / viewportDimension).clamp(0.0, 1.0);

  // Calculate the vertical alignment of the background
  // based on the scroll percent.
  final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

  // Convert the background alignment into a pixel offset for
  // painting purposes.
  final backgroundSize =
      (backgroundImageKey.currentContext!.findRenderObject() as RenderBox)
          .size;
  final listItemSize = context.size;
  final childRect =
      verticalAlignment.inscribe(backgroundSize, Offset.zero & listItemSize);
}
```

Using `childRect`, paint the background image with
the desired translation transformation.
It's this transformation over time that gives you the
parallax effect.

<<<<<<< Updated upstream
=======
使用 `childRect`，根据所需的平移变换绘制背景图片。
正是这种随时间推移的变换效果产生了视差效果。

>>>>>>> Stashed changes
<?code-excerpt "lib/excerpt5.dart (paint-children-5)" plaster="none" ?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
      listItemBox.size.centerLeft(Offset.zero),
      ancestor: scrollableBox);

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction =
      (listItemOffset.dy / viewportDimension).clamp(0.0, 1.0);

  // Calculate the vertical alignment of the background
  // based on the scroll percent.
  final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

  // Convert the background alignment into a pixel offset for
  // painting purposes.
  final backgroundSize =
      (backgroundImageKey.currentContext!.findRenderObject() as RenderBox)
          .size;
  final listItemSize = context.size;
  final childRect =
      verticalAlignment.inscribe(backgroundSize, Offset.zero & listItemSize);

  // Paint the background.
  context.paintChild(
    0,
    transform:
        Transform.translate(offset: Offset(0.0, childRect.top)).transform,
  );
}
```

You need one final detail to achieve the parallax effect.
The `ParallaxFlowDelegate` repaints when the inputs change,
but the `ParallaxFlowDelegate` doesn't repaint every time
the scroll position changes.

<<<<<<< Updated upstream
=======
你还需要一个最后的细节来实现视差效果。
`ParallaxFlowDelegate` 在参数发生变化时会重新绘制，
但它不会在每次滚动位置变化时都重新绘制。

>>>>>>> Stashed changes
Pass the `ScrollableState`'s `ScrollPosition` to
the `FlowDelegate` superclass so that the `FlowDelegate`
repaints every time the `ScrollPosition` changes.

<<<<<<< Updated upstream
=======
将 `ScrollableState` 的 `ScrollPosition` 
传递给 `FlowDelegate` 的父类，
以便在 `ScrollPosition` 每次变化时，
`FlowDelegate` 都会重新绘制。

>>>>>>> Stashed changes
<?code-excerpt "lib/main.dart (SuperScrollPosition)" replace="/;\n/;\n}/g"?>
```dart
class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate({
    required this.scrollable,
    required this.listItemContext,
    required this.backgroundImageKey,
  }) : super(repaint: scrollable.position);
}
```

Congratulations!
You now have a list of cards with parallax,
scrolling background images.

## Interactive example

Run the app:

* Scroll up and down to observe the parallax effect.

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter parallax scrolling hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

const Color darkBlue = Color.fromARGB(255, 18, 32, 47);

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark().copyWith(scaffoldBackgroundColor: darkBlue),
      debugShowCheckedModeBanner: false,
      home: const Scaffold(
        body: Center(
          child: ExampleParallax(),
        ),
      ),
    );
  }
}

class ExampleParallax extends StatelessWidget {
  const ExampleParallax({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          for (final location in locations)
            LocationListItem(
              imageUrl: location.imageUrl,
              name: location.name,
              country: location.place,
            ),
        ],
      ),
    );
  }
}

class LocationListItem extends StatelessWidget {
  LocationListItem({
    super.key,
    required this.imageUrl,
    required this.name,
    required this.country,
  });

  final String imageUrl;
  final String name;
  final String country;
  final GlobalKey _backgroundImageKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            children: [
              _buildParallaxBackground(context),
              _buildGradient(),
              _buildTitleAndSubtitle(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildParallaxBackground(BuildContext context) {
    return Flow(
      delegate: ParallaxFlowDelegate(
        scrollable: Scrollable.of(context),
        listItemContext: context,
        backgroundImageKey: _backgroundImageKey,
      ),
      children: [
        Image.network(
          imageUrl,
          key: _backgroundImageKey,
          fit: BoxFit.cover,
        ),
      ],
    );
  }

  Widget _buildGradient() {
    return Positioned.fill(
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.transparent, Colors.black.withOpacity(0.7)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.6, 0.95],
          ),
        ),
      ),
    );
  }

  Widget _buildTitleAndSubtitle() {
    return Positioned(
      left: 20,
      bottom: 20,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            country,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}

class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate({
    required this.scrollable,
    required this.listItemContext,
    required this.backgroundImageKey,
  }) : super(repaint: scrollable.position);


  final ScrollableState scrollable;
  final BuildContext listItemContext;
  final GlobalKey backgroundImageKey;

  @override
  BoxConstraints getConstraintsForChild(int i, BoxConstraints constraints) {
    return BoxConstraints.tightFor(
      width: constraints.maxWidth,
    );
  }

  @override
  void paintChildren(FlowPaintingContext context) {
    // Calculate the position of this list item within the viewport.
    final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
    final listItemBox = listItemContext.findRenderObject() as RenderBox;
    final listItemOffset = listItemBox.localToGlobal(
        listItemBox.size.centerLeft(Offset.zero),
        ancestor: scrollableBox);

    // Determine the percent position of this list item within the
    // scrollable area.
    final viewportDimension = scrollable.position.viewportDimension;
    final scrollFraction =
        (listItemOffset.dy / viewportDimension).clamp(0.0, 1.0);

    // Calculate the vertical alignment of the background
    // based on the scroll percent.
    final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

    // Convert the background alignment into a pixel offset for
    // painting purposes.
    final backgroundSize =
        (backgroundImageKey.currentContext!.findRenderObject() as RenderBox)
            .size;
    final listItemSize = context.size;
    final childRect =
        verticalAlignment.inscribe(backgroundSize, Offset.zero & listItemSize);

    // Paint the background.
    context.paintChild(
      0,
      transform:
          Transform.translate(offset: Offset(0.0, childRect.top)).transform,
    );
  }

  @override
  bool shouldRepaint(ParallaxFlowDelegate oldDelegate) {
    return scrollable != oldDelegate.scrollable ||
        listItemContext != oldDelegate.listItemContext ||
        backgroundImageKey != oldDelegate.backgroundImageKey;
  }
}

class Parallax extends SingleChildRenderObjectWidget {
  const Parallax({
    super.key,
    required Widget background,
  }) : super(child: background);

  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderParallax(scrollable: Scrollable.of(context));
  }

  @override
  void updateRenderObject(
      BuildContext context, covariant RenderParallax renderObject) {
    renderObject.scrollable = Scrollable.of(context);
  }
}

class ParallaxParentData extends ContainerBoxParentData<RenderBox> {}

class RenderParallax extends RenderBox
    with RenderObjectWithChildMixin<RenderBox>, RenderProxyBoxMixin {
  RenderParallax({
    required ScrollableState scrollable,
  }) : _scrollable = scrollable;

  ScrollableState _scrollable;

  ScrollableState get scrollable => _scrollable;

  set scrollable(ScrollableState value) {
    if (value != _scrollable) {
      if (attached) {
        _scrollable.position.removeListener(markNeedsLayout);
      }
      _scrollable = value;
      if (attached) {
        _scrollable.position.addListener(markNeedsLayout);
      }
    }
  }

  @override
  void attach(covariant PipelineOwner owner) {
    super.attach(owner);
    _scrollable.position.addListener(markNeedsLayout);
  }

  @override
  void detach() {
    _scrollable.position.removeListener(markNeedsLayout);
    super.detach();
  }

  @override
  void setupParentData(covariant RenderObject child) {
    if (child.parentData is! ParallaxParentData) {
      child.parentData = ParallaxParentData();
    }
  }

  @override
  void performLayout() {
    size = constraints.biggest;

    // Force the background to take up all available width
    // and then scale its height based on the image's aspect ratio.
    final background = child!;
    final backgroundImageConstraints =
        BoxConstraints.tightFor(width: size.width);
    background.layout(backgroundImageConstraints, parentUsesSize: true);

    // Set the background's local offset, which is zero.
    (background.parentData as ParallaxParentData).offset = Offset.zero;
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    // Get the size of the scrollable area.
    final viewportDimension = scrollable.position.viewportDimension;

    // Calculate the global position of this list item.
    final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
    final backgroundOffset =
        localToGlobal(size.centerLeft(Offset.zero), ancestor: scrollableBox);

    // Determine the percent position of this list item within the
    // scrollable area.
    final scrollFraction =
        (backgroundOffset.dy / viewportDimension).clamp(0.0, 1.0);

    // Calculate the vertical alignment of the background
    // based on the scroll percent.
    final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

    // Convert the background alignment into a pixel offset for
    // painting purposes.
    final background = child!;
    final backgroundSize = background.size;
    final listItemSize = size;
    final childRect =
        verticalAlignment.inscribe(backgroundSize, Offset.zero & listItemSize);

    // Paint the background.
    context.paintChild(
        background,
        (background.parentData as ParallaxParentData).offset +
            offset +
            Offset(0.0, childRect.top));
  }
}

class Location {
  const Location({
    required this.name,
    required this.place,
    required this.imageUrl,
  });

  final String name;
  final String place;
  final String imageUrl;
}

const urlPrefix =
    'https://docs.flutter.dev/cookbook/img-files/effects/parallax';
const locations = [
  Location(
    name: 'Mount Rushmore',
    place: 'U.S.A',
    imageUrl: '$urlPrefix/01-mount-rushmore.jpg',
  ),
  Location(
    name: 'Gardens By The Bay',
    place: 'Singapore',
    imageUrl: '$urlPrefix/02-singapore.jpg',
  ),
  Location(
    name: 'Machu Picchu',
    place: 'Peru',
    imageUrl: '$urlPrefix/03-machu-picchu.jpg',
  ),
  Location(
    name: 'Vitznau',
    place: 'Switzerland',
    imageUrl: '$urlPrefix/04-vitznau.jpg',
  ),
  Location(
    name: 'Bali',
    place: 'Indonesia',
    imageUrl: '$urlPrefix/05-bali.jpg',
  ),
  Location(
    name: 'Mexico City',
    place: 'Mexico',
    imageUrl: '$urlPrefix/06-mexico-city.jpg',
  ),
  Location(
    name: 'Cairo',
    place: 'Egypt',
    imageUrl: '$urlPrefix/07-cairo.jpg',
  ),
];
```

[`CustomPaint`]: {{site.api}}/flutter/widgets/CustomPaint-class.html
[`Flow`]: {{site.api}}/flutter/widgets/Flow-class.html
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
