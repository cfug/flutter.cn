---
# title: Create a shimmer loading effect
title: 创建一个微光加载效果
# description: How to implement a shimmer loading effect.
description: 如何实现一个微光加载效果
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/effects/shimmer_loading"?>

Loading times are unavoidable in application development.
From a user experience (UX) perspective,
the most important thing is to show your users 
that loading is taking place. One popular approach
to communicate to users that data is loading is to
display a chrome color with a shimmer animation over 
the shapes that approximate the type of content that is loading.

在应用开发中，加载时间是不可避免的。
从用户体验 (UX) 的角度来看，
最重要的是向用户展示正在进行加载操作。
一种常见的方式是，
在近似加载内容形状的区域上，
显示带有微光动画的镀铬颜色覆盖层，
以此来告知用户数据正在加载。

The following animation shows the app's behavior:

下面的动画展示了应用程序的行为：

![Gif showing the UI loading](/assets/images/docs/cookbook/effects/UILoadingAnimation.gif){:.site-mobile-screenshot}

This recipe begins with the content widgets defined and positioned.
There is also a Floating Action Button (FAB) in the bottom-right
corner that toggles between a loading mode and a loaded mode
so that you can easily validate your implementation.

该示例从准备好的内容 widget 开始。
界面右下角还放置了一个浮动操作按钮 (FAB)，
用于切换正在加载和已加载的模式，
以便你可以轻松验证实现的效果。

## Draw the shimmer shapes

## 绘制微光效果的形状

The shapes that shimmer in this effect are independent
from the actual content that eventually loads.

在这个效果中，微光的形状是独立于最终加载的实际内容的。

Therefore, the goal is to display shapes that represent 
the eventual content as accurately as possible. 

因此，目标是尽可能准确地显示代表最终内容的形状。

Displaying accurate shapes is easy in situations where the
content has a clear boundary. For example, in this recipe,
there are some circular images and some rounded rectangle images.
You can draw shapes that precisely match the outlines 
of those images.

在内容有明确边界的情况下，
显示准确的形状很容易。
例如，在这个示例中，
有一些圆形图片和一些圆角矩形图片。
你可以绘制与这些图片轮廓完全匹配的形状。

On the other hand, consider the text that appears beneath the
rounded rectangle images. You won't know how many lines of
text exist until the text loads. 
Therefore, there is no point in trying to draw a rectangle
for every line of text. Instead, while the data is loading,
you draw a couple of very thin rounded rectangles that
represent the text that will appear. The shape and size 
doesn't quite match, but that is OK.

另一方面，考虑显示在圆角矩形图片下方的文本。
在文本加载之前，你不会知道有多少行文本。
因此，尝试为每行文本绘制一个矩形是没有意义的。
相反，当数据加载时，
你可以绘制几个非常细的圆角矩形来代表即将出现的文本。
形状和大小可能不完全匹配，
但这样做是可以的。

Start with the circular list items at the top of the screen.
Ensure that each `CircleListItem` widget displays a circle
with a color while the image is loading.

从屏幕顶部的圆形列表项开始。
确保每个 `CircleListItem` widget 在图片加载时显示一个有颜色的圆形。

<?code-excerpt "lib/main.dart (CircleListItem)"?>
```dart
class CircleListItem extends StatelessWidget {
  const CircleListItem({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: Container(
        width: 54,
        height: 54,
        decoration: const BoxDecoration(
          color: Colors.black,
          shape: BoxShape.circle,
        ),
        child: ClipOval(
          child: Image.network(
            'https://docs.flutter.dev/cookbook'
            '/img-files/effects/split-check/Avatar1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
```

As long as your widgets display some kind of shape,
you can apply the shimmer effect in this recipe.

只要你的 widget 显示某种形状，
你就可以在这个示例中应用微光效果。

Similar to the `CircleListItem` widgets,
ensure that the `CardListItem` widgets 
display a color where the image will appear.
Also, in the `CardListItem` widget, 
switch between the display of the text and
the rectangles based on the current loading status.

类似于 `CircleListItem` widget，
确保 `CardListItem` widget 在图片将出现的地方显示颜色。
同时，在 `CardListItem` widget 中，
根据当前的加载状态在文本和矩形的显示之间切换。

<?code-excerpt "lib/main.dart (CardListItem)"?>
```dart
class CardListItem extends StatelessWidget {
  const CardListItem({
    super.key,
    required this.isLoading,
  });

  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildImage(),
          const SizedBox(height: 16),
          _buildText(),
        ],
      ),
    );
  }

  Widget _buildImage() {
    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.black,
          borderRadius: BorderRadius.circular(16),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.network(
            'https://docs.flutter.dev/cookbook'
            '/img-files/effects/split-check/Food1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }

  Widget _buildText() {
    if (isLoading) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            width: 250,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ],
      );
    } else {
      return const Padding(
        padding: EdgeInsets.symmetric(horizontal: 8),
        child: Text(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do '
          'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ),
      );
    }
  }
}
```

Your UI now renders itself differently depending on
whether it's loading or loaded.
By temporarily commenting out the image URLs,
you can see the two ways your UI renders.

现在，你的 UI 会根据是否正在加载或已加载来呈现不同的效果。
通过暂时注释掉图像 URL，
你可以看到 UI 呈现的两种方式。


![Gif showing the shimmer animation](/assets/images/docs/cookbook/effects/LoadingShimmer.gif){:.site-mobile-screenshot}

The next goal is to paint all of the colored areas
with a single gradient that looks like a shimmer.

接下来的目标是将所有着色区域涂上一层看起来像微光效果的渐变。

## Paint the shimmer gradient

## 绘制微光渐变效果

The key to the effect achieved in this recipe is to use a widget 
called [`ShaderMask`][]. The `ShaderMask` widget, as the name suggests,
applies a shader to its child, but only in the areas where
the child already painted something. For example,
you'll apply a shader to only the black shapes that you 
configured earlier.

实现这一效果的关键是使用一个名为 [`ShaderMask`][] 的 widget。
顾名思义， `ShaderMask` widget 将着色器应用于其子 widget，
但仅限于子 widget 已经绘制了内容的区域。
例如，你将只对之前配置的黑色形状应用着色器。

Define a chrome-colored, linear gradient that gets applied to the 
shimmer shapes.

定义一个铬色的线性渐变，
将其应用于微光效果的形状。

<?code-excerpt "lib/main.dart (shimmerGradient)"?>
```dart
const _shimmerGradient = LinearGradient(
  colors: [
    Color(0xFFEBEBF4),
    Color(0xFFF4F4F4),
    Color(0xFFEBEBF4),
  ],
  stops: [
    0.1,
    0.3,
    0.4,
  ],
  begin: Alignment(-1.0, -0.3),
  end: Alignment(1.0, 0.3),
  tileMode: TileMode.clamp,
);
```

Define a new stateful widget called `ShimmerLoading`
that wraps a given `child` widget with a `ShaderMask`.
Configure the `ShaderMask` widget to apply the shimmer
gradient as a shader with a `blendMode` of `srcATop`.
The `srcATop` blend mode  replaces any color that your
`child` widget painted with the shader color.

定义一个新的 stateful widget，名为 `ShimmerLoading`，
它用 `ShaderMask` 包裹一个传入的 `child` widget。
配置 `ShaderMask` widget，
使微光渐变效果应用为着色器，
并将 `blendMode` 设置为 `srcATop`。
`srcATop` 混合模式会将 `child` widget 绘制的任何颜色替换为着色器颜色。

<?code-excerpt "lib/main.dart (ShimmerLoading)"?>
```dart
class ShimmerLoading extends StatefulWidget {
  const ShimmerLoading({
    super.key,
    required this.isLoading,
    required this.child,
  });

  final bool isLoading;
  final Widget child;

  @override
  State<ShimmerLoading> createState() => _ShimmerLoadingState();
}

class _ShimmerLoadingState extends State<ShimmerLoading> {
  @override
  Widget build(BuildContext context) {
    if (!widget.isLoading) {
      return widget.child;
    }

    return ShaderMask(
      blendMode: BlendMode.srcATop,
      shaderCallback: (bounds) {
        return _shimmerGradient.createShader(bounds);
      },
      child: widget.child,
    );
  }
}
```

Wrap your `CircleListItem` widgets with a `ShimmerLoading` widget.

用 `ShimmerLoading` widget 包裹你的 `CircleListItem` widget。

<?code-excerpt "lib/shimmer_loading_items.dart (buildTopRowItem)"?>
```dart
Widget _buildTopRowItem() {
  return ShimmerLoading(
    isLoading: _isLoading,
    child: const CircleListItem(),
  );
}
```

Wrap your `CardListItem` widgets with a `ShimmerLoading` widget.

用 `ShimmerLoading` widget 包裹你的 `CardListItem` widget。

<?code-excerpt "lib/shimmer_loading_items.dart (buildListItem)"?>
```dart
Widget _buildListItem() {
  return ShimmerLoading(
    isLoading: _isLoading,
    child: CardListItem(
      isLoading: _isLoading,
    ),
  );
}
```

When your shapes are loading, they now display
the shimmer gradient that is 
returned from the `shaderCallback`.

当你的形状正在加载时，
它们会显示从 `shaderCallback` 返回的微光渐变效果。

This is a big step in the right direction,
but there's a problem with this gradient display.
Each `CircleListItem` widget and each `CardListItem` widget 
displays a new version of the gradient.
For this recipe, the entire screen should 
look like one, big shimmering surface.
You solve this problem in the next step.

这是朝着正确方向迈出的重要一步，
但这个渐变显示存在一个问题。
每个 `CircleListItem` widget 和每个 `CardListItem` widget
都会显示各自独立的渐变效果。
对于这个示例，整个屏幕应该呈现为一个大而统一的微光表面。
你将在下一步解决这个问题。

## Paint one big shimmer

## 绘制大而统一的微光效果

To paint one big shimmer across the screen,
each `ShimmerLoading` widget needs 
to paint the same full-screen gradient based
on the position of that `ShimmerLoading`
widget on the screen. 

为了在整个屏幕上绘制大而统一的微光效果，
每个 `ShimmerLoading` widget 需要根据
该 `ShimmerLoading` widget 在屏幕上的位置绘制相同的全屏渐变。

To be more precise, rather than assume that the shimmer
should take up the entire screen,
there should be some area that shares the shimmer.
Maybe that area takes up the entire screen,
or maybe it doesn't. The way to solve this 
kind of problem in Flutter is to define another widget
that sits above all of the `ShimmerLoading` widgets
in the widget tree, and call it `Shimmer`. 
Then, each `ShimmerLoading` widget gets a reference
to the `Shimmer` ancestor
and requests the desired size and gradient to display.

更准确地说，不应该假设微光效果会占据整个屏幕，
而是应该有一个区域共享微光效果。
这个区域可能会占据整个屏幕，也可能不会。
解决这个问题的方式是在所有的 `ShimmerLoading` widget 上方
定义另一个 widget，称为 `Shimmer`。
然后，每个 `ShimmerLoading` widget 可以引用 `Shimmer` 祖先，
并请求显示所需的大小和渐变。

Define a new stateful widget called `Shimmer` that
takes in a [`LinearGradient`][] and provides descendants
with access to its `State` object.

定义一个新的 stateful widget，命名为 `Shimmer`，
它接收一个 [`LinearGradient`][] 
并允许后代 widget 访问其 `State` 对象。

<?code-excerpt "lib/main.dart (Shimmer)"?>
```dart
class Shimmer extends StatefulWidget {
  static ShimmerState? of(BuildContext context) {
    return context.findAncestorStateOfType<ShimmerState>();
  }

  const Shimmer({
    super.key,
    required this.linearGradient,
    this.child,
  });

  final LinearGradient linearGradient;
  final Widget? child;

  @override
  ShimmerState createState() => ShimmerState();
}

class ShimmerState extends State<Shimmer> {
  @override
  Widget build(BuildContext context) {
    return widget.child ?? const SizedBox();
  }
}
```

Add methods to the `ShimmerState` class in order
to provide access to the `linearGradient`,
the size of the `ShimmerState`'s `RenderBox`,
and look up the position of a descendant within the
`ShimmerState`'s `RenderBox`.

在 `ShimmerState` 类中添加方法，
以提供对 `linearGradient`、`ShimmerState` 的 `RenderBox` 的大小
以及查找 `ShimmerState` 的 `RenderBox` 中某个后代位置的访问权限。

<?code-excerpt "lib/shimmer_state.dart (ShimmerState)"?>
```dart
class ShimmerState extends State<Shimmer> {
  Gradient get gradient => LinearGradient(
        colors: widget.linearGradient.colors,
        stops: widget.linearGradient.stops,
        begin: widget.linearGradient.begin,
        end: widget.linearGradient.end,
      );

  bool get isSized =>
      (context.findRenderObject() as RenderBox?)?.hasSize ?? false;

  Size get size => (context.findRenderObject() as RenderBox).size;

  Offset getDescendantOffset({
    required RenderBox descendant,
    Offset offset = Offset.zero,
  }) {
    final shimmerBox = context.findRenderObject() as RenderBox;
    return descendant.localToGlobal(offset, ancestor: shimmerBox);
  }

  @override
  Widget build(BuildContext context) {
    return widget.child ?? const SizedBox();
  }
}
```

Wrap all of your screen's content with the `Shimmer` widget.

将屏幕上的所有内容都用 `Shimmer` widget 包裹起来。

<?code-excerpt "lib/main.dart (ExampleUiAnimationState)"?>
```dart
class _ExampleUiLoadingAnimationState extends State<ExampleUiLoadingAnimation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Shimmer(
        linearGradient: _shimmerGradient,
        child: ListView(
            // ListView Contents
            ),
      ),
    );
  }
}
```

Use the `Shimmer` widget within your
`ShimmerLoading` widget to paint the shared gradient.

在你的 `ShimmerLoading` widget 中使用 `Shimmer` widget 来绘制共享的渐变效果。

<?code-excerpt "lib/shimmer_loading_state_pt2.dart (ShimmerLoadingStatePt2)"?>
```dart
class _ShimmerLoadingState extends State<ShimmerLoading> {
  @override
  Widget build(BuildContext context) {
    if (!widget.isLoading) {
      return widget.child;
    }

    // Collect ancestor shimmer information.
    final shimmer = Shimmer.of(context)!;
    if (!shimmer.isSized) {
      // The ancestor Shimmer widget isn't laid
      // out yet. Return an empty box.
      return const SizedBox();
    }
    final shimmerSize = shimmer.size;
    final gradient = shimmer.gradient;
    final offsetWithinShimmer = shimmer.getDescendantOffset(
      descendant: context.findRenderObject() as RenderBox,
    );

    return ShaderMask(
      blendMode: BlendMode.srcATop,
      shaderCallback: (bounds) {
        return gradient.createShader(
          Rect.fromLTWH(
            -offsetWithinShimmer.dx,
            -offsetWithinShimmer.dy,
            shimmerSize.width,
            shimmerSize.height,
          ),
        );
      },
      child: widget.child,
    );
  }
}
```

Your `ShimmerLoading` widgets now display a shared
gradient that takes up all of the space within the
`Shimmer` widget.

你的 `ShimmerLoading` widget 现在显示了一个共享的渐变效果，
这个效果覆盖了 `Shimmer` widget 内部的所有空间。

## Animate the shimmer

## 给微光效果添加动画

The shimmer gradient needs to move in order to
give the appearance of a shimmering shine.

微光渐变效果需要通过移动来产生光泽感。

The `LinearGradient` has a property called `transform`
that can be used to transform the appearance of the gradient,
for example, to move it horizontally. 
The `transform` property accepts a `GradientTransform` instance.

`LinearGradient` 有一个名为 `transform` 的属性，
可以用来改变渐变的外观，例如，使其水平移动。
`transform` 属性接受一个 `GradientTransform` 实例。

Define a class called `_SlidingGradientTransform` that implements 
`GradientTransform` to achieve the appearance of horizontal sliding.

定义一个名为 `_SlidingGradientTransform` 的类，
来实现 `GradientTransform` 接口，以实现水平滑动的效果。

<?code-excerpt "lib/original_example.dart (sliding-gradient-transform)"?>
```dart
class _SlidingGradientTransform extends GradientTransform {
  const _SlidingGradientTransform({
    required this.slidePercent,
  });

  final double slidePercent;

  @override
  Matrix4? transform(Rect bounds, {TextDirection? textDirection}) {
    return Matrix4.translationValues(bounds.width * slidePercent, 0.0, 0.0);
  }
}
```

The gradient slide percentage changes over time
in order to create the appearance of motion.
To change the percentage, configure an
[`AnimationController`][] in the `ShimmerState` class.

渐变滑动百分比随时间变化，以创造运动的效果。
要改变百分比，请在 `ShimmerState` 类中配置一个 [`AnimationController`][]。

<?code-excerpt "lib/original_example.dart (shimmer-state-animation)" replace="/\/\/ code-excerpt-closing-bracket/}/g"?>
```dart
class ShimmerState extends State<Shimmer> with SingleTickerProviderStateMixin {
  late AnimationController _shimmerController;

  @override
  void initState() {
    super.initState();

    _shimmerController = AnimationController.unbounded(vsync: this)
      ..repeat(min: -0.5, max: 1.5, period: const Duration(milliseconds: 1000));
  }

  @override
  void dispose() {
    _shimmerController.dispose();
    super.dispose();
  }
}
```

Apply the `_SlidingGradientTransform` to the `gradient`
by using the `_shimmerController`'s `value` as the `slidePercent`.

将 `_shimmerController` 的 `value`
赋值给 `_SlidingGradientTransform` 的 `slidePercent`，
然后将 `_SlidingGradientTransform` 应用于 `gradient`。

<?code-excerpt "lib/original_example.dart (linear-gradient)"?>
```dart
LinearGradient get gradient => LinearGradient(
      colors: widget.linearGradient.colors,
      stops: widget.linearGradient.stops,
      begin: widget.linearGradient.begin,
      end: widget.linearGradient.end,
      transform:
          _SlidingGradientTransform(slidePercent: _shimmerController.value),
    );
```

The gradient now animates, but your individual
`ShimmerLoading` widgets don't repaint themselves
as the gradient changes. Therefore, it looks like nothing 
is happening.

渐变现在已经动画化了，
但你的单个 `ShimmerLoading` widget 在渐变变化时没有重新绘制自己。
因此，看起来什么也没有发生。

Expose the `_shimmerController` from `ShimmerState`
as a [`Listenable`][].

在 `ShimmerState` 中将 `_shimmerController` 暴露为一个 [`Listenable`][]。

<?code-excerpt "lib/original_example.dart (shimmer-changes)"?>
```dart
Listenable get shimmerChanges => _shimmerController;
```

In `ShimmerLoading`, listen for changes to the ancestor
`ShimmerState`'s `shimmerChanges` property,
and repaint the shimmer gradient.

在 `ShimmerLoading` 中，
监听祖先 `ShimmerState` 的 `shimmerChanges` 属性的变化，
并重新绘制微光渐变效果。

<?code-excerpt "lib/original_example.dart (shimmer-loading-state)" replace="/\/\/ code-excerpt-closing-bracket/}/g"?>
```dart
class _ShimmerLoadingState extends State<ShimmerLoading> {
  Listenable? _shimmerChanges;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_shimmerChanges != null) {
      _shimmerChanges!.removeListener(_onShimmerChange);
    }
    _shimmerChanges = Shimmer.of(context)?.shimmerChanges;
    if (_shimmerChanges != null) {
      _shimmerChanges!.addListener(_onShimmerChange);
    }
  }

  @override
  void dispose() {
    _shimmerChanges?.removeListener(_onShimmerChange);
    super.dispose();
  }

  void _onShimmerChange() {
    if (widget.isLoading) {
      setState(() {
        // Update the shimmer painting.
      });
    }
  }
}
```

Congratulations!
You now have a full-screen,
animated shimmer effect that turns 
on and off as the content loads.

恭喜！
你现在拥有了一个全屏的动画微光效果，
随着内容加载，它会打开或关闭。

## Interactive example

## 交互示例

<?code-excerpt "lib/original_example.dart" remove="code-excerpt-closing-bracket"?>
```dartpad title="Flutter shimmer loading hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleUiLoadingAnimation(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

const _shimmerGradient = LinearGradient(
  colors: [
    Color(0xFFEBEBF4),
    Color(0xFFF4F4F4),
    Color(0xFFEBEBF4),
  ],
  stops: [
    0.1,
    0.3,
    0.4,
  ],
  begin: Alignment(-1.0, -0.3),
  end: Alignment(1.0, 0.3),
  tileMode: TileMode.clamp,
);

class ExampleUiLoadingAnimation extends StatefulWidget {
  const ExampleUiLoadingAnimation({
    super.key,
  });

  @override
  State<ExampleUiLoadingAnimation> createState() =>
      _ExampleUiLoadingAnimationState();
}

class _ExampleUiLoadingAnimationState extends State<ExampleUiLoadingAnimation> {
  bool _isLoading = true;

  void _toggleLoading() {
    setState(() {
      _isLoading = !_isLoading;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Shimmer(
        linearGradient: _shimmerGradient,
        child: ListView(
          physics: _isLoading ? const NeverScrollableScrollPhysics() : null,
          children: [
            const SizedBox(height: 16),
            _buildTopRowList(),
            const SizedBox(height: 16),
            _buildListItem(),
            _buildListItem(),
            _buildListItem(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggleLoading,
        child: Icon(
          _isLoading ? Icons.hourglass_full : Icons.hourglass_bottom,
        ),
      ),
    );
  }

  Widget _buildTopRowList() {
    return SizedBox(
      height: 72,
      child: ListView(
        physics: _isLoading ? const NeverScrollableScrollPhysics() : null,
        scrollDirection: Axis.horizontal,
        shrinkWrap: true,
        children: [
          const SizedBox(width: 16),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
        ],
      ),
    );
  }

  Widget _buildTopRowItem() {
    return ShimmerLoading(
      isLoading: _isLoading,
      child: const CircleListItem(),
    );
  }

  Widget _buildListItem() {
    return ShimmerLoading(
      isLoading: _isLoading,
      child: CardListItem(
        isLoading: _isLoading,
      ),
    );
  }
}

class Shimmer extends StatefulWidget {
  static ShimmerState? of(BuildContext context) {
    return context.findAncestorStateOfType<ShimmerState>();
  }

  const Shimmer({
    super.key,
    required this.linearGradient,
    this.child,
  });

  final LinearGradient linearGradient;
  final Widget? child;

  @override
  ShimmerState createState() => ShimmerState();
}

class ShimmerState extends State<Shimmer> with SingleTickerProviderStateMixin {
  late AnimationController _shimmerController;

  @override
  void initState() {
    super.initState();

    _shimmerController = AnimationController.unbounded(vsync: this)
      ..repeat(min: -0.5, max: 1.5, period: const Duration(milliseconds: 1000));
  }

  @override
  void dispose() {
    _shimmerController.dispose();
    super.dispose();
  }

  LinearGradient get gradient => LinearGradient(
        colors: widget.linearGradient.colors,
        stops: widget.linearGradient.stops,
        begin: widget.linearGradient.begin,
        end: widget.linearGradient.end,
        transform:
            _SlidingGradientTransform(slidePercent: _shimmerController.value),
      );

  bool get isSized =>
      (context.findRenderObject() as RenderBox?)?.hasSize ?? false;

  Size get size => (context.findRenderObject() as RenderBox).size;

  Offset getDescendantOffset({
    required RenderBox descendant,
    Offset offset = Offset.zero,
  }) {
    final shimmerBox = context.findRenderObject() as RenderBox?;
    return descendant.localToGlobal(offset, ancestor: shimmerBox);
  }

  Listenable get shimmerChanges => _shimmerController;

  @override
  Widget build(BuildContext context) {
    return widget.child ?? const SizedBox();
  }
}

class _SlidingGradientTransform extends GradientTransform {
  const _SlidingGradientTransform({
    required this.slidePercent,
  });

  final double slidePercent;

  @override
  Matrix4? transform(Rect bounds, {TextDirection? textDirection}) {
    return Matrix4.translationValues(bounds.width * slidePercent, 0.0, 0.0);
  }
}

class ShimmerLoading extends StatefulWidget {
  const ShimmerLoading({
    super.key,
    required this.isLoading,
    required this.child,
  });

  final bool isLoading;
  final Widget child;

  @override
  State<ShimmerLoading> createState() => _ShimmerLoadingState();
}

class _ShimmerLoadingState extends State<ShimmerLoading> {
  Listenable? _shimmerChanges;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_shimmerChanges != null) {
      _shimmerChanges!.removeListener(_onShimmerChange);
    }
    _shimmerChanges = Shimmer.of(context)?.shimmerChanges;
    if (_shimmerChanges != null) {
      _shimmerChanges!.addListener(_onShimmerChange);
    }
  }

  @override
  void dispose() {
    _shimmerChanges?.removeListener(_onShimmerChange);
    super.dispose();
  }

  void _onShimmerChange() {
    if (widget.isLoading) {
      setState(() {
        // Update the shimmer painting.
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.isLoading) {
      return widget.child;
    }

    // Collect ancestor shimmer info.
    final shimmer = Shimmer.of(context)!;
    if (!shimmer.isSized) {
      // The ancestor Shimmer widget has not laid
      // itself out yet. Return an empty box.
      return const SizedBox();
    }
    final shimmerSize = shimmer.size;
    final gradient = shimmer.gradient;
    final offsetWithinShimmer = shimmer.getDescendantOffset(
      descendant: context.findRenderObject() as RenderBox,
    );

    return ShaderMask(
      blendMode: BlendMode.srcATop,
      shaderCallback: (bounds) {
        return gradient.createShader(
          Rect.fromLTWH(
            -offsetWithinShimmer.dx,
            -offsetWithinShimmer.dy,
            shimmerSize.width,
            shimmerSize.height,
          ),
        );
      },
      child: widget.child,
    );
  }
}

//----------- List Items ---------
class CircleListItem extends StatelessWidget {
  const CircleListItem({super.key});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: Container(
        width: 54,
        height: 54,
        decoration: const BoxDecoration(
          color: Colors.black,
          shape: BoxShape.circle,
        ),
        child: ClipOval(
          child: Image.network(
            'https://docs.flutter.dev/cookbook'
            '/img-files/effects/split-check/Avatar1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}

class CardListItem extends StatelessWidget {
  const CardListItem({
    super.key,
    required this.isLoading,
  });

  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildImage(),
          const SizedBox(height: 16),
          _buildText(),
        ],
      ),
    );
  }

  Widget _buildImage() {
    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.black,
          borderRadius: BorderRadius.circular(16),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.network(
            'https://docs.flutter.dev/cookbook'
            '/img-files/effects/split-check/Food1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }

  Widget _buildText() {
    if (isLoading) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            width: 250,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ],
      );
    } else {
      return const Padding(
        padding: EdgeInsets.symmetric(horizontal: 8),
        child: Text(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do '
          'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ),
      );
    }
  }
}
```



[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[cloning the example code]: {{site.github}}/flutter/codelabs
[issue 44152]: {{site.repo.flutter}}/issues/44152
[`LinearGradient`]: {{site.api}}/flutter/painting/LinearGradient-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`ShaderMask`]: {{site.api}}/flutter/widgets/ShaderMask-class.html
