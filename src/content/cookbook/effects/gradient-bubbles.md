---
# title: Create gradient chat bubbles
title: 创建一个渐变色的对话气泡
# description: How to implement gradient chat bubbles.
description: 如何实现一个带有渐变色的对话气泡
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/effects/gradient_bubbles"?>

{% include docs/deprecated.md %}

Traditional chat apps display messages in chat bubbles
with solid color backgrounds. Modern chat apps display
chat bubbles with gradients that are based 
on the bubbles' position on the screen.
In this recipe, you'll modernize the chat UI by implementing
gradient backgrounds for the chat bubbles.

传统的对话应用程序会以实心颜色背景显示对话气泡，
而现代对话应用程序则根据气泡在屏幕上的位置显示带有渐变色的背景。
在本教程中，您将通过为聊天气泡实现带有渐变色的背景来使对话界面更加现代化。

The following animation shows the app's behavior:

下面的动画展示了应用程序的行为：

![Scrolling the gradient chat bubbles](/assets/images/docs/cookbook/effects/GradientBubbles.gif){:.site-mobile-screenshot}

## Understand the challenge

## 理解挑战

The traditional chat bubble solution probably uses a
`DecoratedBox` or a similar widget to paint a rounded
rectangle behind each chat message. That approach is 
great for a solid color or even for a gradient that
repeats in every chat bubble. However, modern,
full-screen, gradient bubble backgrounds require 
a different approach. The full-screen gradient,
combined with bubbles scrolling up and down the screen,
requires an approach that allows you to make painting 
decisions based on layout information.

传统的对话气泡解决方案可能使用了 `DecoratedBox` 
或类似的 widget 来在每条对话消息后面绘制一个圆角矩形。
这种方法对于实心颜色或每个对话气泡都重复的带有渐变色的背景非常适用。
然而，现代全屏的带有渐变色的气泡背景则需要一种不同的方法。
全屏渐变结合气泡在屏幕上的上下滚动，要求在绘制时基于布局信息做出决策。

Each bubble's gradient requires knowledge of the
bubble's location on the screen. This means that
the painting behavior requires access to layout information.
Such painting behavior isn't possible with typical widgets 
because widgets like `Container` and `DecoratedBox`
make decisions about background colors before layout occurs,
not after. In this case, because you require custom painting
behavior, but you don't require custom layout behavior 
or custom hit test behavior, a [`CustomPainter`][] is
a great choice to get the job done. 

每个气泡的渐变需要了解气泡在屏幕上的位置。
这意味着绘制行为需要访问布局信息。
典型的 widget 无法实现这样的绘制行为，
因为像 `Container` 和 `DecoratedBox` 这样的 widget 
在布局发生之前就已经决定了背景颜色，而不是之后。
在这种情况下，由于你只需要自定义绘制行为，
而不需要自定义布局或点击测试行为，
使用 [`CustomPainter`][] 是完成该任务的绝佳选择。

:::note

In cases where you need control over the child layout,
but you don't need control over the painting or hit testing,
consider using a [`Flow`][] widget.

如果你需要控制子 widget 的布局，但不需要控制绘制或点击测试，
建议使用 [`Flow`][] widget。

In cases where you need control over the layout,
painting, _and_ hit testing, 
consider defining a custom [`RenderBox`][].

如果你需要控制布局、绘制 _以及_ 点击测试，
建议定义一个自定义的 [`RenderBox`][]。

:::

## Replace original background widget

## 替换原先的背景 widget 

Replace the widget responsible for drawing the
background with a new stateless widget called
`BubbleBackground`. Include a `colors` property to 
represent the full-screen gradient that should be
applied to the bubble.

将负责绘制背景的 widget 替换为
一个名为 `BubbleBackground` 的新的 stateless widget。
添加一个 `colors` 属性，用于表示应该应用于气泡的全屏渐变。

<?code-excerpt "lib/bubble_background.dart (BubbleBackground)" replace="/return //g"?>
```dart
BubbleBackground(
  // The colors of the gradient, which are different
  // depending on which user sent this message.
  colors: message.isMine
      ? const [Color(0xFF6C7689), Color(0xFF3A364B)]
      : const [Color(0xFF19B7FF), Color(0xFF491CCB)],
  // The content within the bubble.
  child: DefaultTextStyle.merge(
    style: const TextStyle(
      fontSize: 18.0,
      color: Colors.white,
    ),
    child: Padding(
      padding: const EdgeInsets.all(12),
      child: Text(message.text),
    ),
  ),
);
```

## Create a custom painter

## 创建一个自定义画板

Next, introduce an implementation for `BubbleBackground`
as a stateless widget. For now, define the `build()`
method to return a `CustomPaint` with a `CustomPainter`
called `BubblePainter`. `BubblePainter` is used to paint 
the bubble gradients.

接下来，为 `BubbleBackground` 引入一个 stateless widget 的实现。
目前，定义 `build()` 方法以返回一个带有 `CustomPainter` 的 `CustomPaint`，
该 `CustomPainter` 被称为 `BubblePainter`。
`BubblePainter` 用于绘制气泡的渐变效果。

<?code-excerpt "lib/bubble_painter_empty.dart (BubblePainterEmpty)"?>
```dart
@immutable
class BubbleBackground extends StatelessWidget {
  const BubbleBackground({
    super.key,
    required this.colors,
    this.child,
  });

  final List<Color> colors;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: BubblePainter(
        colors: colors,
      ),
      child: child,
    );
  }
}

class BubblePainter extends CustomPainter {
  BubblePainter({
    required List<Color> colors,
  }) : _colors = colors;

  final List<Color> _colors;

  @override
  void paint(Canvas canvas, Size size) {
    // TODO:
  }

  @override
  bool shouldRepaint(BubblePainter oldDelegate) {
    // TODO:
    return false;
  }
}
```

## Provide access to scrolling information

## 提供对滚动信息的访问

The `CustomPainter` requires the information necessary
to determine where its bubble is within the `ListView`'s bounds,
also known as the `Viewport`. Determining the location requires
a reference to the ancestor `ScrollableState` 
and a reference to the `BubbleBackground`'s
`BuildContext`. Provide each of those to the `CustomPainter`.

`CustomPainter` 需要获取信息来确定其气泡在 `ListView` 边界内的位置，
这也被称为 `Viewport`。
确定位置需要一个对祖先 `ScrollableState` 的引用，
以及 `BubbleBackground` 的 `BuildContext`。
将这些引用提供给 `CustomPainter`。

<?code-excerpt "lib/bubble_painter.dart (ScrollableContext)" replace="/painter: //g"?>
```dart
BubblePainter(
  colors: colors,
  bubbleContext: context,
  scrollable: ScrollableState(),
),
```

<?code-excerpt "lib/bubble_painter.dart (bp-without-paint)" plaster="none"?>
```dart
class BubblePainter extends CustomPainter {
  BubblePainter({
    required ScrollableState scrollable,
    required BuildContext bubbleContext,
    required List<Color> colors,
  })  : _scrollable = scrollable,
        _bubbleContext = bubbleContext,
        _colors = colors;

  final ScrollableState _scrollable;
  final BuildContext _bubbleContext;
  final List<Color> _colors;

  @override
  bool shouldRepaint(BubblePainter oldDelegate) {
    return oldDelegate._scrollable != _scrollable ||
        oldDelegate._bubbleContext != _bubbleContext ||
        oldDelegate._colors != _colors;
  }
}
```

## Paint a full-screen bubble gradient

## 绘制一个带有渐变色的全屏气泡

The `CustomPainter` now has the desired gradient colors,
a reference to the containing `ScrollableState`,
and a reference to this bubble's `BuildContext`.
This is all the information that the `CustomPainter` needs to 
paint the full-screen bubble gradients.
Implement the `paint()` method to calculate the position
of the bubble, configure a shader with the given colors, 
and then use a matrix translation to offset the shader
based on the bubble's position within the `Scrollable`.

现在，`CustomPainter` 拥有所需的渐变颜色、包含它的 `ScrollableState` 的引用
以及该气泡的 `BuildContext` 引用。
这些信息足以让 `CustomPainter` 绘制带有渐变色的全屏气泡。
实现 `paint()` 方法，计算气泡的位置，使用给定的颜色配置一个着色器（shader），
然后使用矩阵平移根据气泡在 `Scrollable` 中的位置来偏移着色器。

<?code-excerpt "lib/bubble_background.dart (BubblePainter)"?>
```dart
class BubblePainter extends CustomPainter {
  BubblePainter({
    required ScrollableState scrollable,
    required BuildContext bubbleContext,
    required List<Color> colors,
  })  : _scrollable = scrollable,
        _bubbleContext = bubbleContext,
        _colors = colors;

  final ScrollableState _scrollable;
  final BuildContext _bubbleContext;
  final List<Color> _colors;

  @override
  bool shouldRepaint(BubblePainter oldDelegate) {
    return oldDelegate._scrollable != _scrollable ||
        oldDelegate._bubbleContext != _bubbleContext ||
        oldDelegate._colors != _colors;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final scrollableBox = _scrollable.context.findRenderObject() as RenderBox;
    final scrollableRect = Offset.zero & scrollableBox.size;
    final bubbleBox = _bubbleContext.findRenderObject() as RenderBox;

    final origin =
        bubbleBox.localToGlobal(Offset.zero, ancestor: scrollableBox);
    final paint = Paint()
      ..shader = ui.Gradient.linear(
        scrollableRect.topCenter,
        scrollableRect.bottomCenter,
        _colors,
        [0.0, 1.0],
        TileMode.clamp,
        Matrix4.translationValues(-origin.dx, -origin.dy, 0.0).storage,
      );
    canvas.drawRect(Offset.zero & size, paint);
  }
}
```

Congratulations! You now have a modern, chat bubble UI.

恭喜！现在你已经完成了一个现代化的对话气泡 UI。

:::note

Each bubble's gradient changes as the user
scrolls because the `BubbleBackground` widget
invokes `Scrollable.of(context)`. This method 
sets up an implicit dependency on the ancestor
`ScrollableState`, which causes the `BubbleBackground`
widget to rebuild every time the user scrolls 
up or down. See the [`InheritedWidget`][] documentation
for more information about these types of dependencies.

每个气泡的渐变色效果会随着用户滚动而变化，
因为 `BubbleBackground` widget 调用了 `Scrollable.of(context)`。
此方法会在祖先 `ScrollableState` 上建立一个隐式依赖关系，
这会导致每次用户上下滚动时，`BubbleBackground` widget 都会重新构建。
有关这些依赖关系的更多信息，请参阅 [`InheritedWidget`][] 文档。

:::

## Interactive example

## 交互示例

Run the app:

运行应用程序：

* Scroll up and down to observe the gradient effect.

  上下滑动来观察渐变色效果。
  
* Chat bubbles located at the bottom of the screen
  have a darker gradient color than the ones at the top.

  位于屏幕底部的带有渐变色效果的对话气泡比顶部更深。

<!-- start dartpad -->
<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter graident bubbles hands-on example in DartPad" run="true"
import 'dart:math';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

void main() {
  runApp(const App(home: ExampleGradientBubbles()));
}

@immutable
class App extends StatelessWidget {
  const App({super.key, this.home});

  final Widget? home;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Chat',
      theme: ThemeData.dark(useMaterial3: true),
      home: home,
    );
  }
}

@immutable
class ExampleGradientBubbles extends StatefulWidget {
  const ExampleGradientBubbles({super.key});

  @override
  State<ExampleGradientBubbles> createState() => _ExampleGradientBubblesState();
}

class _ExampleGradientBubblesState extends State<ExampleGradientBubbles> {
  late final List<Message> data;

  @override
  void initState() {
    super.initState();
    data = MessageGenerator.generate(60, 1337);
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF4F4F4F),
      ),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Flutter Chat'),
        ),
        body: ListView.builder(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          reverse: true,
          itemCount: data.length,
          itemBuilder: (context, index) {
            final message = data[index];
            return MessageBubble(
              message: message,
              child: Text(message.text),
            );
          },
        ),
      ),
    );
  }
}

@immutable
class MessageBubble extends StatelessWidget {
  const MessageBubble({
    super.key,
    required this.message,
    required this.child,
  });

  final Message message;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final messageAlignment =
        message.isMine ? Alignment.topLeft : Alignment.topRight;

    return FractionallySizedBox(
      alignment: messageAlignment,
      widthFactor: 0.8,
      child: Align(
        alignment: messageAlignment,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 6.0, horizontal: 20.0),
          child: ClipRRect(
            borderRadius: const BorderRadius.all(Radius.circular(16.0)),
            child: BubbleBackground(
              colors: [
                if (message.isMine) ...const [
                  Color(0xFF6C7689),
                  Color(0xFF3A364B),
                ] else ...const [
                  Color(0xFF19B7FF),
                  Color(0xFF491CCB),
                ],
              ],
              child: DefaultTextStyle.merge(
                style: const TextStyle(
                  fontSize: 18.0,
                  color: Colors.white,
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: child,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

@immutable
class BubbleBackground extends StatelessWidget {
  const BubbleBackground({
    super.key,
    required this.colors,
    this.child,
  });

  final List<Color> colors;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: BubblePainter(
        scrollable: Scrollable.of(context),
        bubbleContext: context,
        colors: colors,
      ),
      child: child,
    );
  }
}

class BubblePainter extends CustomPainter {
  BubblePainter({
    required ScrollableState scrollable,
    required BuildContext bubbleContext,
    required List<Color> colors,
  })  : _scrollable = scrollable,
        _bubbleContext = bubbleContext,
        _colors = colors,
        super(repaint: scrollable.position);

  final ScrollableState _scrollable;
  final BuildContext _bubbleContext;
  final List<Color> _colors;

  @override
  void paint(Canvas canvas, Size size) {
    final scrollableBox = _scrollable.context.findRenderObject() as RenderBox;
    final scrollableRect = Offset.zero & scrollableBox.size;
    final bubbleBox = _bubbleContext.findRenderObject() as RenderBox;

    final origin =
        bubbleBox.localToGlobal(Offset.zero, ancestor: scrollableBox);
    final paint = Paint()
      ..shader = ui.Gradient.linear(
        scrollableRect.topCenter,
        scrollableRect.bottomCenter,
        _colors,
        [0.0, 1.0],
        TileMode.clamp,
        Matrix4.translationValues(-origin.dx, -origin.dy, 0.0).storage,
      );
    canvas.drawRect(Offset.zero & size, paint);
  }

  @override
  bool shouldRepaint(BubblePainter oldDelegate) {
    return oldDelegate._scrollable != _scrollable ||
        oldDelegate._bubbleContext != _bubbleContext ||
        oldDelegate._colors != _colors;
  }
}

enum MessageOwner { myself, other }

@immutable
class Message {
  const Message({
    required this.owner,
    required this.text,
  });

  final MessageOwner owner;
  final String text;

  bool get isMine => owner == MessageOwner.myself;
}

class MessageGenerator {
  static List<Message> generate(int count, [int? seed]) {
    final random = Random(seed);
    return List.unmodifiable(List<Message>.generate(count, (index) {
      return Message(
        owner: random.nextBool() ? MessageOwner.myself : MessageOwner.other,
        text: _exampleData[random.nextInt(_exampleData.length)],
      );
    }));
  }

  static final _exampleData = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'In tempus mauris at velit egestas, sed blandit felis ultrices.',
    'Ut molestie mauris et ligula finibus iaculis.',
    'Sed a tempor ligula.',
    'Test',
    'Phasellus ullamcorper, mi ut imperdiet consequat, nibh augue condimentum nunc, vitae molestie massa augue nec erat.',
    'Donec scelerisque, erat vel placerat facilisis, eros turpis egestas nulla, a sodales elit nibh et enim.',
    'Mauris quis dignissim neque. In a odio leo. Aliquam egestas egestas tempor. Etiam at tortor metus.',
    'Quisque lacinia imperdiet faucibus.',
    'Proin egestas arcu non nisl laoreet, vitae iaculis enim volutpat. In vehicula convallis magna.',
    'Phasellus at diam a sapien laoreet gravida.',
    'Fusce maximus fermentum sem a scelerisque.',
    'Nam convallis sapien augue, malesuada aliquam dui bibendum nec.',
    'Quisque dictum tincidunt ex non lobortis.',
    'In hac habitasse platea dictumst.',
    'Ut pharetra ligula libero, sit amet imperdiet lorem luctus sit amet.',
    'Sed ex lorem, lacinia et varius vitae, sagittis eget libero.',
    'Vestibulum scelerisque velit sed augue ultricies, ut vestibulum lorem luctus.',
    'Pellentesque et risus pretium, egestas ipsum at, facilisis lectus.',
    'Praesent id eleifend lacus.',
    'Fusce convallis eu tortor sit amet mattis.',
    'Vivamus lacinia magna ut urna feugiat tincidunt.',
    'Sed in diam ut dolor imperdiet vehicula non ac turpis.',
    'Praesent at est hendrerit, laoreet tortor sed, varius mi.',
    'Nunc in odio leo.',
    'Praesent placerat semper libero, ut aliquet dolor.',
    'Vestibulum elementum leo metus, vitae auctor lorem tincidunt ut.',
  ];
}
```

## Recap

## 回顾

The fundamental challenge when painting based on the
scroll position, or the screen position in general,
is that the painting behavior must occur after the
layout phase is complete. `CustomPaint` is a unique
widget that allows you to execute custom painting
behaviors after the layout phase is complete.
If you execute the painting behaviors after the layout phase, 
then you can base your painting decisions on the layout
information, such as the position of the `CustomPaint`
widget within a `Scrollable` or within the screen.

根据滚动位置或屏幕位置进行绘制的基本挑战在于，
绘制行为必须在布局阶段完成后进行。
`CustomPaint` 是一个独特的 widget，
它允许在布局阶段完成后执行自定义绘制行为。
如果在布局阶段之后执行绘制行为，则可以基于布局信息做出绘制决策，
例如 `CustomPaint` widget 在 `Scrollable` 或屏幕中的位置。

[cloning the example code]: {{site.github}}/flutter/codelabs
[`CustomPainter`]: {{site.api}}/flutter/rendering/CustomPainter-class.html
[`Flow`]: {{site.api}}/flutter/widgets/Flow-class.html
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Issue 44152]: {{site.repo.flutter}}/issues/44152
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
