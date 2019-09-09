---
title: Animate a widget using a physics simulation
title: Widget 的物理模拟动画效果
prev:
  title: Animate a page route transition
  title: 为页面切换加入动画效果
  path: /docs/cookbook/animation/page-route-animation
next:
  title: Animate the properties of a container
  title: Container 里的动画渐变效果
  path: /docs/cookbook/animation/animated-container
---

Physics simulations can make app interactions feel realistic and interactive.
For example, you might want to animate a widget to act as if it were attached to
a spring or falling with gravity.

物理模拟能够让应用富有真实感和更好的交互性。
例如，你可能会为一个 widget 添加动画，
让它看起来就像安着弹簧，或是在随重力下落。

This recipe demonstrates how to move a widget from a dragged point back to the
center using a spring simulation.

这个指南演示了如何将 widget 从拖动的点移回到中心，
并使用弹簧模拟效果。

This recipe uses these steps:

这个演示将进行下面几步：

1. Set up an animation controller

   创建一个动画控制器

2. Move the widget using gestures

   使用手势移动 widget

3. Animate the widget

   对 widget 进行动画

4. Calculate the velocity to simulate a springing motion

   计算速度以模拟弹跳运动

## Step 1: Set up an animation controller

## 第一步：创建一个动画控制器

Start with a stateful widget called `DraggableCard`:

首先，创建一个叫做 `DraggableCard` 的 stateful widget：

```dart
import 'package:flutter/material.dart';

main() {
  runApp(MaterialApp(home: PhysicsCardDragDemo()));
}

class PhysicsCardDragDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: DraggableCard(
        child: FlutterLogo(
          size: 128,
        ),
      ),
    );
  }
}

class DraggableCard extends StatefulWidget {
  final Widget child;
  DraggableCard({this.child});

  @override
  _DraggableCardState createState() => _DraggableCardState();
}

class _DraggableCardState extends State<DraggableCard> {
  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      child: Card(
        child: widget.child,
      ),
    );
  }
}
```

Make the `_DraggableCardState` class extend from
[SingleTickerProviderStateMixin][].  Then construct an [AnimationController][] in
`initState` and set `vsync` to `this`.

让 `_DraggableCardState` 类继承至 [SingleTickerProviderStateMixin][]。
然后在 `initState` 中构造一个 [AnimationController][]，并将其 `vsync` 属性设为 `this`。

{{site.alert.note}}

  Extending `SingleTickerProviderStateMixin` allows the state object to be a
  `TickerProvider` for the `AnimationController`. For more information, see the
  documentation for [TickerProvider][].
  
  继承的 `SingleTickerProviderStateMixin` 让 state 对象为 `AnimationController` 
  提供了 `TickerProvider` 的能力。要获得更多信息，请查看 [TickerProvider][] 文档。
  
{{site.alert.end}}

```dart
class _DraggableCardState extends State<DraggableCard>
    with SingleTickerProviderStateMixin {
  AnimationController _controller;

  @override
  void initState() {
    _controller =
        AnimationController(vsync: this, duration: Duration(seconds: 1));
    super.initState();
  }


  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  //...
```

## Step 2: Move the widget using gestures

## 第二步：使用手势移动 widget

Make the widget move when it's dragged, and add an [Alignment][] field to the
`_DraggableCardState` class:

让 widget 获得拖拽能力，并为 `_DraggableCardState` 类添加一个 [Alignment][] 范围。

```dart
Alignment _dragAlignment = Alignment.center;
```

Add a [GestureDetector][] that handles the `onPanDown`, `onPanUpdate`, and
`onPanEnd` callbacks. To adjust the alignment, use a [MediaQuery][] to get the
size of the widget, and divide by 2. (This converts units of "pixels dragged" to
coordinates that [Align][] uses.) Then, set the `Align` widget's `alignment` to
`_dragAlignment`:

添加一个 [GestureDetector][] 来捕获 `onPanDown`， `onPanUpdate` 以及 `onPanEnd` 回掉。
为了调整对齐方式，请使用 [MediaQuery][] 来获得 Widget 的大小，然后除以 2。
（这会将“拖动的像素”单位转为 [Align][] 使用的坐标。）然后，
将 `Align` widget 的 `alignmnt` 属性设为 `_dragAlignment`。

```dart
@override
Widget build(BuildContext context) {
  var size = MediaQuery.of(context).size;
  return GestureDetector(
    onPanDown: (details) {},
    onPanUpdate: (details) {
      setState(() {
        _dragAlignment += Alignment(
          details.delta.dx / (size.width / 2),
          details.delta.dy / (size.height / 2),
        );
      });
    },
    onPanEnd: (details) {},
    child: Align(
      child: Card(
        child: widget.child,
      ),
    ),
  );
}
```

## Step 3: Animate the widget

## 第三步：对 widget 进行动画

When the widget is released, it should spring back to the center.

当一个 widget 被释放，它应该就会弹回中心。

Add an `Animation<Alignment>` field and an `_runAnimation` method. This
method defines a `Tween` that interpolates between the point the widget was
dragged to, to the point in the center.

添加一个 `Animation<Alignment>`，以及 `_runAnimation` 方法。
此方法定义了一个 `Tween`，它在 widget 被拖动到的点之间插入到中心点。

```dart
  Animation<Alignment> _animation;

  void _runAnimation() {
    _animation = _controller.drive(
      AlignmentTween(
        begin: _dragAlignment,
        end: Alignment.center,
      ),
    );
   _controller.reset();
   _controller.forward();
  }
```

Next, update `_dragAlignment` when the `AnimationController` produces a
value:

接下来，当 `AnimationController` 产生一个值时，更新 `_dragAlignment`：

```dart
@override
void initState() {
  super.initState();
  _controller = AnimationController(vsync: this, duration: Duration(seconds: 1));
  _controller.addListener(() {
    setState(() {
      _dragAlignment = _animation.value;
    });
  });
}
```

Next, make the `Align` widget use the `_dragAlignment` field:

下一步，让 `Align` 小部件使用 `_dragAlignment` 字段：

```dart
child: Align(
  alignment: _dragAlignment,
  child: Card(
    child: widget.child,
  ),
),
```


Finally, update the `GestureDetector` to manage the animation controller:

最后，更新 `GestureDetector` 来管理动画控制器：

```dart
onPanDown: (details) {
 _controller.stop();
},
onPanUpdate: (details) {
 setState(() {
   _dragAlignment += Alignment(
     details.delta.dx / (size.width / 2),
     details.delta.dy / (size.height / 2),
   );
 });
},
onPanEnd: (details) {
 _runAnimation();
},
```

## Step 4: Calculate the velocity to simulate a springing motion

## 第四步：计算速度以模拟弹跳运动

The last step is to do a little math, to calculate the velocity of the widget
after it's finished being dragged. This is so that the widget realistically
continues at that speed before being snapped back. (The `_runAnimation` method
already sets the direction by setting the animation's start and end alignment.)

最后一步时做一些简单的数学计算，计算小部件被拖动完成之后的速度。
这样小部件在被快速恢复之前实际上以该速度继续运动。
（`_runAnimation` 方法已经通过设置动画的开始和结束对齐方式来设置方向。）

First, import the `physics` package:

首先，引入 `physics` 包：

```dart
import 'package:flutter/physics.dart';
```

The `onPanEnd` callback provides a [DragEndDetails][] object. This object
provides the velocity of the pointer when it stopped contacting the screen. The
velocity is in pixels per second, but the `Align` widget doesn't use pixels. It
uses coordinate values between [-1.0, -1.0] and [1.0, 1.0], where [0.0, 0.0]
represents the center. The `size` calculated in step 2 is used to convert pixels
to coordinate values in this range.

`onPanEnd` 回调提供了一个 [DragEndDetails][] 对象。
此对象提供指针停止接触屏幕时的速度。速度以每秒像素为单位，
但 `Align` widget 不使用像素。
它使用 [-1.0，-1.0] 和 [1.0,1.0] 之间的坐标值，
其中 [0.0,0.0] 表示中心。在步骤 2 中计算的 `size` 用于将像素转换为该范围内的坐标值。

Finally, `AnimationController` has an `animateWith()` method that can be given a
[SpringSimulation][]:

最后，`AnimationController` 有一个 `animateWith()` 
方法可以产生 [SpringSimulation][]:

```dart
void _runAnimation(Offset pixelsPerSecond, Size size) {
  _animation = _controller.drive(
    AlignmentTween(
      begin: _dragAlignment,
      end: Alignment.center,
    ),
  );
  // Calculate the velocity relative to the unit interval, [0,1],
  // used by the animation controller.
  final unitsPerSecondX = pixelsPerSecond.dx / size.width;
  final unitsPerSecondY = pixelsPerSecond.dy / size.height;
  final unitsPerSecond = Offset(unitsPerSecondX, unitsPerSecondY);
  final unitVelocity = unitsPerSecond.distance;

  const spring = SpringDescription(
    mass: 30,
    stiffness: 1,
    damping: 1,
  );

  final simulation = SpringSimulation(spring, 0, 1, -unitVelocity);

  _controller.animateWith(simulation);
}
```

Don't forget to call `_runAnimation()`  with the velocity and size:

不要忘记调用 `_runAnimation()`，并传入速度和大小：

```dart
onPanEnd: (details) {
  _runAnimation(details.velocity.pixelsPerSecond, size);
},
```

{{site.alert.note}}

  Now that the animation controller uses a simulation it's `duration` argument
  is no longer required.
  
  既然动画控制器使用了模拟，就不再需要指定 `duration` 参数。
  
{{site.alert.end}}

## Complete Example

## 一个完整的例子

```dart
import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';

main() {
  runApp(MaterialApp(home: PhysicsCardDragDemo()));
}

class PhysicsCardDragDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: DraggableCard(
        child: FlutterLogo(
          size: 128,
        ),
      ),
    );
  }
}

/// A draggable card that moves back to [Alignment.center] when it's
/// released.
class DraggableCard extends StatefulWidget {
  final Widget child;
  DraggableCard({this.child});

  @override
  _DraggableCardState createState() => _DraggableCardState();
}

class _DraggableCardState extends State<DraggableCard>
    with SingleTickerProviderStateMixin {
  AnimationController _controller;

  /// The alignment of the card as it is dragged or being animated.
  ///
  /// While the card is being dragged, this value is set to the values computed
  /// in the GestureDetector onPanUpdate callback. If the animation is running,
  /// this value is set to the value of the [_animation].
  Alignment _dragAlignment = Alignment.center;

  Animation<Alignment> _animation;

  /// Calculates and runs a [SpringSimulation].
  void _runAnimation(Offset pixelsPerSecond, Size size) {
    _animation = _controller.drive(
      AlignmentTween(
        begin: _dragAlignment,
        end: Alignment.center,
      ),
    );
    // Calculate the velocity relative to the unit interval, [0,1],
    // used by the animation controller.
    final unitsPerSecondX = pixelsPerSecond.dx / size.width;
    final unitsPerSecondY = pixelsPerSecond.dy / size.height;
    final unitsPerSecond = Offset(unitsPerSecondX, unitsPerSecondY);
    final unitVelocity = unitsPerSecond.distance;

    const spring = SpringDescription(
      mass: 30,
      stiffness: 1,
      damping: 1,
    );

    final simulation = SpringSimulation(spring, 0, 1, -unitVelocity);

    _controller.animateWith(simulation);
  }

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);

    _controller.addListener(() {
      setState(() {
        _dragAlignment = _animation.value;
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return GestureDetector(
      onPanDown: (details) {
        _controller.stop();
      },
      onPanUpdate: (details) {
        setState(() {
          _dragAlignment += Alignment(
            details.delta.dx / (size.width / 2),
            details.delta.dy / (size.height / 2),
          );
        });
      },
      onPanEnd: (details) {
        _runAnimation(details.velocity.pixelsPerSecond, size);
      },
      child: Align(
        alignment: _dragAlignment,
        child: Card(
          child: widget.child,
        ),
      ),
    );
  }
}
```

![Demo showing a widget being dragged and snapped back to the center](/images/cookbook/animation-physics-card-drag.gif){:.site-mobile-screenshot}

[Align]: {{site.api}}/flutter/widgets/Align-class.html
[Alignment]: {{site.api}}/flutter/painting/Alignment-class.html
[AnimationController]: {{site.api}}/flutter/animation/AnimationController-class.html
[GestureDetector]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[SingleTickerProviderStateMixin]: {{site.api}}/flutter/widgets/SingleTickerProviderStateMixin-mixin.html
[TickerProvider]: {{site.api}}/flutter/scheduler/TickerProvider-class.html
[MediaQuery]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[DragEndDetails]: {{site.api}}/flutter/gestures/DragEndDetails-class.html
[SpringSimulation]: {{site.api}}/flutter/physics/SpringSimulation-class.html
