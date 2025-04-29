---
# title: Create a staggered menu animation
title: 创建一个交错效果的侧边栏菜单
# description: How to implement a staggered menu animation.
description: 如何实现一个交错效果的侧边栏菜单
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/effects/staggered_menu_animation"?>

A single app screen might contain multiple animations.
Playing all of the animations at the same time can be
overwhelming. Playing the animations one after the other
can take too long. A better option is to stagger the animations. 
Each animation begins at a different time,
but the animations overlap to create a shorter duration.
In this recipe, you build a drawer menu with animated 
content that is staggered and has a button that pops
in at the bottom.

一个应用的单个屏幕可能包含多个动画。
所有动画同时播放可能会显得过于混乱。
而依次播放动画又可能花费太长时间。
更好的选择是错开动画的播放时间。
每个动画在不同的时间开始，
但这些动画会重叠播放，从而缩短整体持续时间。
在这个示例中，你将构建一个带有动画内容的抽屉菜单，
动画会交错播放，并且底部会有一个弹出的按钮。

The following animation shows the app's behavior:

以下动画展示了应用的行为：

![Staggered Menu Animation Example](/assets/images/docs/cookbook/effects/StaggeredMenuAnimation.webp){:.site-mobile-screenshot}

## Create the menu without animations

## 创建没有动画的菜单

The drawer menu displays a list of titles,
followed by a Get started button at 
the bottom of the menu.

抽屉菜单显示了一系列标题，
菜单底部有一个 “Get started” 按钮。

Define a stateful widget called `Menu`
that displays the list and button 
in static locations.

定义一个名为 `Menu` 的 stateful widget，
该 widget 在固定位置显示列表和按钮。

<?code-excerpt "lib/step1.dart (step1)"?>
```dart
class Menu extends StatefulWidget {
  const Menu({super.key});

  @override
  State<Menu> createState() => _MenuState();
}

class _MenuState extends State<Menu> {
  static const _menuTitles = [
    'Declarative Style',
    'Premade Widgets',
    'Stateful Hot Reload',
    'Native Performance',
    'Great Community',
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Stack(
        fit: StackFit.expand,
        children: [_buildFlutterLogo(), _buildContent()],
      ),
    );
  }

  Widget _buildFlutterLogo() {
    // TODO: We'll implement this later.
    return Container();
  }

  Widget _buildContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        ..._buildListItems(),
        const Spacer(),
        _buildGetStartedButton(),
      ],
    );
  }

  List<Widget> _buildListItems() {
    final listItems = <Widget>[];
    for (var i = 0; i < _menuTitles.length; ++i) {
      listItems.add(
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 36, vertical: 16),
          child: Text(
            _menuTitles[i],
            textAlign: TextAlign.left,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w500),
          ),
        ),
      );
    }
    return listItems;
  }

  Widget _buildGetStartedButton() {
    return SizedBox(
      width: double.infinity,
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            shape: const StadiumBorder(),
            backgroundColor: Colors.blue,
            padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 14),
          ),
          onPressed: () {},
          child: const Text(
            'Get Started',
            style: TextStyle(color: Colors.white, fontSize: 22),
          ),
        ),
      ),
    );
  }
}
```

## Prepare for animations

## 为动画做好准备

Control of the animation timing requires an
`AnimationController`.

控制动画时序需要一个 `AnimationController`。

Add the `SingleTickerProviderStateMixin`
to the `MenuState` class. Then, declare and
instantiate an `AnimationController`.

将 `SingleTickerProviderStateMixin` 添加到 `MenuState` 类中。
然后，声明并实例化一个 `AnimationController`。

<?code-excerpt "lib/step2.dart (animation-controller)" plaster="none"?>
```dart
class _MenuState extends State<Menu> with SingleTickerProviderStateMixin {
  late AnimationController _staggeredController;

  @override
  void initState() {
    super.initState();

    _staggeredController = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _staggeredController.dispose();
    super.dispose();
  }
}
```

The length of the delay before every animation is
up to you. Define the animation delays,
individual animation durations, and the total 
animation duration.

每个动画之前的延迟时长由你决定。
定义动画延迟、单个动画持续时间和总动画持续时间。


<?code-excerpt "lib/animation_delays.dart (delays)" plaster="none"?>
```dart
class _MenuState extends State<Menu> with SingleTickerProviderStateMixin {
  static const _initialDelayTime = Duration(milliseconds: 50);
  static const _itemSlideTime = Duration(milliseconds: 250);
  static const _staggerTime = Duration(milliseconds: 50);
  static const _buttonDelayTime = Duration(milliseconds: 150);
  static const _buttonTime = Duration(milliseconds: 500);
  final _animationDuration =
      _initialDelayTime +
      (_staggerTime * _menuTitles.length) +
      _buttonDelayTime +
      _buttonTime;
}
```

In this case, all the animations are delayed by 50 ms.
After that, list items begin to appear.
Each list item's appearance is delayed by 50 ms after the 
previous list item begins to slide in.
Each list item takes 250 ms to slide from right to left.
After the last list item begins to slide in,
the button at the bottom waits another 150 ms to pop in.
The button animation takes 500 ms.

在这个示例中，所有动画都延迟了 50 毫秒。
随后，列表项开始出现。
每个列表项的出现会比上一个列表项开始向左滑入延迟 50 毫秒。
每个列表项从右向左滑入需要 250 毫秒。
在最后一个列表项开始向左滑入之后，
底部的按钮会再等待 150 毫秒弹出。
按钮动画需要 500 毫秒。

With each delay and animation duration defined,
the total duration is calculated so that it can be
used to calculate the individual animation times.

在定义每个延迟和动画持续时间后，
计算出总持续时间，以便用于计算各个动画的时间。

The desired animation times are shown in the following diagram:

所需的动画时间如下图所示：

![Animation Timing Diagram](/assets/images/docs/cookbook/effects/TimingDiagram.png){:.site-mobile-screenshot}

To animate a value during a subsection of a larger animation,
Flutter provides the `Interval` class.
An `Interval` takes a start time percentage and an end 
time percentage. That `Interval` can then be used to
animate a value between those start and end times,
instead of using the entire animation's start and 
end times. For example, given an animation that takes 1 second, 
an interval from 0.2 to 0.5 would start at 200 ms
(20%) and end at 500 ms (50%). 

为了在一个较大的动画中，对某些动画值进行分段处理，
Flutter 提供了 `Interval` 类。
`Interval` 接受一个开始时间百分比和一个结束时间百分比。
然后，可以使用该 `Interval` 在开始和结束时间之间对值进行动画处理，
而不是使用整个动画的开始和结束时间。
例如，对于一个持续 1 秒的动画，
Interval(0.2, 0.5) 将在 200 毫秒（20%）开始，并在 500 毫秒（50%）结束。

Declare and calculate each list item's `Interval` and the 
bottom button `Interval`.

声明并且计算每个列选项的 `Interval` 和底部按钮的 `Interval`。

<?code-excerpt "lib/step3.dart (step3)" plaster="none"?>
```dart
class _MenuState extends State<Menu> with SingleTickerProviderStateMixin {
  final List<Interval> _itemSlideIntervals = [];
  late Interval _buttonInterval;

  @override
  void initState() {
    super.initState();

    _createAnimationIntervals();

    _staggeredController = AnimationController(
      vsync: this,
      duration: _animationDuration,
    );
  }

  void _createAnimationIntervals() {
    for (var i = 0; i < _menuTitles.length; ++i) {
      final startTime = _initialDelayTime + (_staggerTime * i);
      final endTime = startTime + _itemSlideTime;
      _itemSlideIntervals.add(
        Interval(
          startTime.inMilliseconds / _animationDuration.inMilliseconds,
          endTime.inMilliseconds / _animationDuration.inMilliseconds,
        ),
      );
    }

    final buttonStartTime =
        Duration(milliseconds: (_menuTitles.length * 50)) + _buttonDelayTime;
    final buttonEndTime = buttonStartTime + _buttonTime;
    _buttonInterval = Interval(
      buttonStartTime.inMilliseconds / _animationDuration.inMilliseconds,
      buttonEndTime.inMilliseconds / _animationDuration.inMilliseconds,
    );
  }
}
```

## Animate the list items and button

## 对列表项和按钮进行动画处理

The staggered animation plays as soon as the menu becomes visible.

交错动画会在菜单可见时立即播放

Start the animation in `initState()`.

在 `initState()` 中启动播放。

<?code-excerpt "lib/step4.dart (init-state)"?>
```dart
@override
void initState() {
  super.initState();

  _createAnimationIntervals();

  _staggeredController = AnimationController(
    vsync: this,
    duration: _animationDuration,
  )..forward();
}
```

Each list item slides from right to left and
fades in at the same time.

每个列表项从右到左滑动的同时逐渐淡入。

Use the list item's `Interval` and an `easeOut`
curve to animate the opacity and translation
values for each list item.

使用列表项的 `Interval` 和 `easeOut` 曲线 (curve) 
来为每个列表项的不透明度和位移值进行动画处理。

<?code-excerpt "lib/step4.dart (build-list-items)"?>
```dart
List<Widget> _buildListItems() {
  final listItems = <Widget>[];
  for (var i = 0; i < _menuTitles.length; ++i) {
    listItems.add(
      AnimatedBuilder(
        animation: _staggeredController,
        builder: (context, child) {
          final animationPercent = Curves.easeOut.transform(
            _itemSlideIntervals[i].transform(_staggeredController.value),
          );
          final opacity = animationPercent;
          final slideDistance = (1.0 - animationPercent) * 150;

          return Opacity(
            opacity: opacity,
            child: Transform.translate(
              offset: Offset(slideDistance, 0),
              child: child,
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 36, vertical: 16),
          child: Text(
            _menuTitles[i],
            textAlign: TextAlign.left,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w500),
          ),
        ),
      ),
    );
  }
  return listItems;
}
```

Use the same approach to animate the opacity and
scale of the bottom button. This time, use an
`elasticOut` curve to give the button a springy effect.

使用相同的方法来为底部按钮的不透明度和缩放比例进行动画处理。
这次，使用 `elasticOut` 曲线 (curve) 为按钮提供弹性效果。

<?code-excerpt "lib/step4.dart (build-get-started)"?>
```dart
Widget _buildGetStartedButton() {
  return SizedBox(
    width: double.infinity,
    child: Padding(
      padding: const EdgeInsets.all(24),
      child: AnimatedBuilder(
        animation: _staggeredController,
        builder: (context, child) {
          final animationPercent = Curves.elasticOut.transform(
            _buttonInterval.transform(_staggeredController.value),
          );
          final opacity = animationPercent.clamp(0.0, 1.0);
          final scale = (animationPercent * 0.5) + 0.5;

          return Opacity(
            opacity: opacity,
            child: Transform.scale(scale: scale, child: child),
          );
        },
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            shape: const StadiumBorder(),
            backgroundColor: Colors.blue,
            padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 14),
          ),
          onPressed: () {},
          child: const Text(
            'Get Started',
            style: TextStyle(color: Colors.white, fontSize: 22),
          ),
        ),
      ),
    ),
  );
}
```

Congratulations!
You have an animated menu where the appearance of each 
list item is staggered, followed by a bottom button that
pops into place.

恭喜！
你有了一个动画菜单，
每个列表项都是交错出现的，
接着底部的按钮会弹出显示。

## Interactive example

## 交互示例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter staggered menu animation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleStaggeredAnimations(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

class ExampleStaggeredAnimations extends StatefulWidget {
  const ExampleStaggeredAnimations({super.key});

  @override
  State<ExampleStaggeredAnimations> createState() =>
      _ExampleStaggeredAnimationsState();
}

class _ExampleStaggeredAnimationsState extends State<ExampleStaggeredAnimations>
    with SingleTickerProviderStateMixin {
  late AnimationController _drawerSlideController;

  @override
  void initState() {
    super.initState();

    _drawerSlideController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
  }

  @override
  void dispose() {
    _drawerSlideController.dispose();
    super.dispose();
  }

  bool _isDrawerOpen() {
    return _drawerSlideController.value == 1.0;
  }

  bool _isDrawerOpening() {
    return _drawerSlideController.status == AnimationStatus.forward;
  }

  bool _isDrawerClosed() {
    return _drawerSlideController.value == 0.0;
  }

  void _toggleDrawer() {
    if (_isDrawerOpen() || _isDrawerOpening()) {
      _drawerSlideController.reverse();
    } else {
      _drawerSlideController.forward();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: _buildAppBar(),
      body: Stack(children: [_buildContent(), _buildDrawer()]),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: const Text('Flutter Menu', style: TextStyle(color: Colors.black)),
      backgroundColor: Colors.transparent,
      elevation: 0.0,
      automaticallyImplyLeading: false,
      actions: [
        AnimatedBuilder(
          animation: _drawerSlideController,
          builder: (context, child) {
            return IconButton(
              onPressed: _toggleDrawer,
              icon:
                  _isDrawerOpen() || _isDrawerOpening()
                      ? const Icon(Icons.clear, color: Colors.black)
                      : const Icon(Icons.menu, color: Colors.black),
            );
          },
        ),
      ],
    );
  }

  Widget _buildContent() {
    // Put page content here.
    return const SizedBox();
  }

  Widget _buildDrawer() {
    return AnimatedBuilder(
      animation: _drawerSlideController,
      builder: (context, child) {
        return FractionalTranslation(
          translation: Offset(1.0 - _drawerSlideController.value, 0.0),
          child: _isDrawerClosed() ? const SizedBox() : const Menu(),
        );
      },
    );
  }
}

class Menu extends StatefulWidget {
  const Menu({super.key});

  @override
  State<Menu> createState() => _MenuState();
}

class _MenuState extends State<Menu> with SingleTickerProviderStateMixin {
  static const _menuTitles = [
    'Declarative style',
    'Premade widgets',
    'Stateful hot reload',
    'Native performance',
    'Great community',
  ];

  static const _initialDelayTime = Duration(milliseconds: 50);
  static const _itemSlideTime = Duration(milliseconds: 250);
  static const _staggerTime = Duration(milliseconds: 50);
  static const _buttonDelayTime = Duration(milliseconds: 150);
  static const _buttonTime = Duration(milliseconds: 500);
  final _animationDuration =
      _initialDelayTime +
      (_staggerTime * _menuTitles.length) +
      _buttonDelayTime +
      _buttonTime;

  late AnimationController _staggeredController;
  final List<Interval> _itemSlideIntervals = [];
  late Interval _buttonInterval;

  @override
  void initState() {
    super.initState();

    _createAnimationIntervals();

    _staggeredController = AnimationController(
      vsync: this,
      duration: _animationDuration,
    )..forward();
  }

  void _createAnimationIntervals() {
    for (var i = 0; i < _menuTitles.length; ++i) {
      final startTime = _initialDelayTime + (_staggerTime * i);
      final endTime = startTime + _itemSlideTime;
      _itemSlideIntervals.add(
        Interval(
          startTime.inMilliseconds / _animationDuration.inMilliseconds,
          endTime.inMilliseconds / _animationDuration.inMilliseconds,
        ),
      );
    }

    final buttonStartTime =
        Duration(milliseconds: (_menuTitles.length * 50)) + _buttonDelayTime;
    final buttonEndTime = buttonStartTime + _buttonTime;
    _buttonInterval = Interval(
      buttonStartTime.inMilliseconds / _animationDuration.inMilliseconds,
      buttonEndTime.inMilliseconds / _animationDuration.inMilliseconds,
    );
  }

  @override
  void dispose() {
    _staggeredController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Stack(
        fit: StackFit.expand,
        children: [_buildFlutterLogo(), _buildContent()],
      ),
    );
  }

  Widget _buildFlutterLogo() {
    return const Positioned(
      right: -100,
      bottom: -30,
      child: Opacity(opacity: 0.2, child: FlutterLogo(size: 400)),
    );
  }

  Widget _buildContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        ..._buildListItems(),
        const Spacer(),
        _buildGetStartedButton(),
      ],
    );
  }

  List<Widget> _buildListItems() {
    final listItems = <Widget>[];
    for (var i = 0; i < _menuTitles.length; ++i) {
      listItems.add(
        AnimatedBuilder(
          animation: _staggeredController,
          builder: (context, child) {
            final animationPercent = Curves.easeOut.transform(
              _itemSlideIntervals[i].transform(_staggeredController.value),
            );
            final opacity = animationPercent;
            final slideDistance = (1.0 - animationPercent) * 150;

            return Opacity(
              opacity: opacity,
              child: Transform.translate(
                offset: Offset(slideDistance, 0),
                child: child,
              ),
            );
          },
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 36, vertical: 16),
            child: Text(
              _menuTitles[i],
              textAlign: TextAlign.left,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w500),
            ),
          ),
        ),
      );
    }
    return listItems;
  }

  Widget _buildGetStartedButton() {
    return SizedBox(
      width: double.infinity,
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: AnimatedBuilder(
          animation: _staggeredController,
          builder: (context, child) {
            final animationPercent = Curves.elasticOut.transform(
              _buttonInterval.transform(_staggeredController.value),
            );
            final opacity = animationPercent.clamp(0.0, 1.0);
            final scale = (animationPercent * 0.5) + 0.5;

            return Opacity(
              opacity: opacity,
              child: Transform.scale(scale: scale, child: child),
            );
          },
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              shape: const StadiumBorder(),
              backgroundColor: Colors.blue,
              padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 14),
            ),
            onPressed: () {},
            child: const Text(
              'Get started',
              style: TextStyle(color: Colors.white, fontSize: 22),
            ),
          ),
        ),
      ),
    );
  }
}
```
