---
# title: Create an expandable FAB
title: 创建一个点击展开的 FAB
# description: How to implement a FAB that expands to multiple buttons when tapped.
description: 如何实现一个可以点击展开为好几个按钮的浮动按钮。
---

<?code-excerpt path-base="cookbook/effects/expandable_fab"?>

A Floating Action Button (FAB) is a round button that
floats near the bottom right of a content area.
This button represents the primary action for the
corresponding content, but sometimes, there is no primary action.
Instead, there are a few critical actions that the user might take.
In this case, you could create an expandable FAB like the one shown
in the following figure. When pressed, this expandable FAB spawns
multiple, other action buttons. Each button corresponds to one of
those critical actions.

浮动操作按钮 (FAB) 是一个悬浮在内容区域右下角附近的圆形按钮。
此按钮表示相关内容的主要操作，但有时可能没有明确的主要操作，而是有几个关键操作可供用户选择。
在这种情况下，你可以创建一个可展开的 FAB，如下所示。
当按下时，这个可展开的 FAB 会展开出多个其他操作按钮，每个按钮对应着一个关键操作。

The following animation shows the app's behavior:

下面的动画展示了应用会怎么做：

![Expanding and collapsing the FAB](/assets/images/docs/cookbook/effects/ExpandingFAB.webp){:.site-mobile-screenshot}

## Create an ExpandableFab widget

## 创建一个 ExpandableFab widget

Start by creating a new stateful widget called `ExpandableFab`.
This widget displays the primary FAB and coordinates the expansion
and collapse of the other action buttons. The widget takes
in parameters for whether or not the `ExpandedFab` begins in
the expanded position, what the maximum distance of each action button is,
and a list of children. You'll use the list later to provide
the other action buttons.

首先，创建一个名为 `ExpandableFab` 的 StatefulWidget，
它会显示主要的 FAB，并负责协调其他操作按钮的展开与收起。
该 widget 接收以下参数：`ExpandableFab` 是否以展开状态开始、每个操作按钮的最大距离、
以及一个子 widget 列表。稍后你会使用该列表生成其他操作按钮。

<?code-excerpt "lib/excerpt1.dart (ExpandableFab)"?>
```dart
@immutable
class ExpandableFab extends StatefulWidget {
  const ExpandableFab({
    super.key,
    this.initialOpen,
    required this.distance,
    required this.children,
  });

  final bool? initialOpen;
  final double distance;
  final List<Widget> children;

  @override
  State<ExpandableFab> createState() => _ExpandableFabState();
}

class _ExpandableFabState extends State<ExpandableFab> {
  @override
  Widget build(BuildContext context) {
    return const SizedBox();
  }
}
```

## FAB cross-fade

## FAB 交叉淡入淡出

The `ExpandableFab` displays a blue edit button when collapsed
and a white close button when expanded. When expanding and collapsing,
these two buttons scale and fade between one another.

当收起时，`ExpandableFab` 显示一个蓝色的编辑按钮；当展开时，则会显示一个白色的关闭按钮。
在展开和收起的过程中，这两个按钮通过缩放和淡入淡出的动画相互过渡。

Implement the expand and collapse cross-fade between the two different FABs.

实现两个不同 FAB 之间展开和收起时的交叉淡入淡出动画。

<?code-excerpt "lib/excerpt2.dart (ExpandableFabState)"?>
```dart
class _ExpandableFabState extends State<ExpandableFab> {
  bool _open = false;

  @override
  void initState() {
    super.initState();
    _open = widget.initialOpen ?? false;
  }

  void _toggle() {
    setState(() {
      _open = !_open;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox.expand(
      child: Stack(
        alignment: Alignment.bottomRight,
        clipBehavior: Clip.none,
        children: [_buildTapToCloseFab(), _buildTapToOpenFab()],
      ),
    );
  }

  Widget _buildTapToCloseFab() {
    return SizedBox(
      width: 56,
      height: 56,
      child: Center(
        child: Material(
          shape: const CircleBorder(),
          clipBehavior: Clip.antiAlias,
          elevation: 4,
          child: InkWell(
            onTap: _toggle,
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Icon(Icons.close, color: Theme.of(context).primaryColor),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTapToOpenFab() {
    return IgnorePointer(
      ignoring: _open,
      child: AnimatedContainer(
        transformAlignment: Alignment.center,
        transform: Matrix4.diagonal3Values(
          _open ? 0.7 : 1.0,
          _open ? 0.7 : 1.0,
          1.0,
        ),
        duration: const Duration(milliseconds: 250),
        curve: const Interval(0.0, 0.5, curve: Curves.easeOut),
        child: AnimatedOpacity(
          opacity: _open ? 0.0 : 1.0,
          curve: const Interval(0.25, 1.0, curve: Curves.easeInOut),
          duration: const Duration(milliseconds: 250),
          child: FloatingActionButton(
            onPressed: _toggle,
            child: const Icon(Icons.create),
          ),
        ),
      ),
    );
  }
}
```

The open button sits on top of the close button within a `Stack`,
allowing for the visual appearance of a cross-fade as the top button
appears and disappears.

打开按钮在关闭按钮之上，位于 `Stack` 中，
它会让顶部的按钮在出现和消失的时候呈现出交叉淡入淡出的视觉效果。

To achieve the cross-fade animation, the open button uses an
`AnimatedContainer` with a scale transform and an `AnimatedOpacity`.
The open button scales down and fades out when the `ExpandableFab`
goes from collapsed to expanded. Then, the open button scales up
and fades in when the `ExpandableFab` goes from expanded to collapsed.

为了实现交叉淡入淡出动画，打开按钮使用了带缩放变换的 `AnimatedContainer` 和 `AnimatedOpacity`。
当 `ExpandableFab` 从收起状态变为展开状态时，打开按钮会缩小并淡出，
相反，当 `ExpandableFab` 从展开状态变为收起状态时，打开按钮则会放大并淡入。

You'll notice that the open button is wrapped with an
`IgnorePointer` widget. This is because the open button always exists,
even when it's transparent. Without the `IgnorePointer`,
the open button always receives the tap event,
even when the close button is visible.

你会注意到打开按钮被包裹在一个 `IgnorePointer` widget里，
这是因为该按钮即使是透明的也一直存在。
若不使用 `IgnorePointer`，打开按钮会在任何时候都接收点击事件，即使关闭按钮可见。

## Create an ActionButton widget

## 创建一个 ActionButton widget

Each of the buttons that expand from the `ExpandableFab`
have the same design. They're  blue circles with white icons.
More precisely, the button background color is the `ColorScheme.secondary`
color, and the icon color is `ColorScheme.onSecondary`.

从 `ExpandableFab` 展开的每个按钮有相同的外观设计，都是带有白色图标的蓝色圆形。
更准确的来说，这些按钮的背景颜色为 `ColorScheme.secondary`，
而图标的颜色则为 `ColorScheme.onSecondary`。

Define a new stateless widget called `ActionButton` to display
these round buttons.

定义一个名为 `ActionButton` 的 Stateless widget，用来显示这些圆形按钮。

<?code-excerpt "lib/main.dart (ActionButton)"?>
```dart
@immutable
class ActionButton extends StatelessWidget {
  const ActionButton({super.key, this.onPressed, required this.icon});

  final VoidCallback? onPressed;
  final Widget icon;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Material(
      shape: const CircleBorder(),
      clipBehavior: Clip.antiAlias,
      color: theme.colorScheme.secondary,
      elevation: 4,
      child: IconButton(
        onPressed: onPressed,
        icon: icon,
        color: theme.colorScheme.onSecondary,
      ),
    );
  }
}
```

Pass a few instances of this new `ActionButton` widget into your
`ExpandableFab`.

将几个 `ActionButton` widget 的实例传入你的 `ExpandableFab` 中。

<?code-excerpt "lib/main.dart (FloatingActionButton)"?>
```dart
floatingActionButton: ExpandableFab(
  distance: 112,
  children: [
    ActionButton(
      onPressed: () => _showAction(context, 0),
      icon: const Icon(Icons.format_size),
    ),
    ActionButton(
      onPressed: () => _showAction(context, 1),
      icon: const Icon(Icons.insert_photo),
    ),
    ActionButton(
      onPressed: () => _showAction(context, 2),
      icon: const Icon(Icons.videocam),
    ),
  ],
),
```

## Expand and collapse the action buttons

## 展开并收起操作按钮

The child `ActionButton`s should fly out from under the open
FAB when expanded. Then, the child `ActionButton`s should
fly back under the open FAB when collapsed.
This motion requires explicit (x,y) positioning of each
`ActionButton` and an `Animation` to choreograph changes to
those (x,y) positions over time.

当展开时，子 `ActionButton` 应该从打开的 FAB 下方弹出；
当收起时，子 `ActionButton` 应该返回到打开的 FAB 下方。
这个运动需要对每个 `ActionButton` 进行显式的 (x,y) 定位，
并用一个 `Animation` 来协调这些 (x,y) 位置随时间的变化。

Introduce an `AnimationController` and an `Animation` to
control the rate at which the various `ActionButton`s expand and collapse.

引入一个 `AnimationController` 和一个 `Animation`，以控制各个 `ActionButton` 展开和收起的速度。

<?code-excerpt "lib/excerpt3.dart (ExpandableFabState3)" replace="/\/\/ code-excerpt-closing-bracket/}/g"?>
```dart
class _ExpandableFabState extends State<ExpandableFab>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _expandAnimation;
  bool _open = false;

  @override
  void initState() {
    super.initState();
    _open = widget.initialOpen ?? false;
    _controller = AnimationController(
      value: _open ? 1.0 : 0.0,
      duration: const Duration(milliseconds: 250),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      curve: Curves.fastOutSlowIn,
      reverseCurve: Curves.easeOutQuad,
      parent: _controller,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggle() {
    setState(() {
      _open = !_open;
      if (_open) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    });
  }
  }
```

Next, introduce a new stateless widget called `_ExpandingActionButton`,
and configure this widget to animate and position an individual `ActionButton`. The `ActionButton` is provided as a generic `Widget` called `child`.

接下来，引入一个名为 `_ExpandingActionButton` 的 StatelessWidget，
并将其配置为对单个 `ActionButton` 播放动画和定位。
`ActionButton` 会作为一个名为 `child` 的通用型 `Widget` 传入。

<?code-excerpt "lib/excerpt3.dart (ExpandingActionButton)"?>
```dart
@immutable
class _ExpandingActionButton extends StatelessWidget {
  const _ExpandingActionButton({
    required this.directionInDegrees,
    required this.maxDistance,
    required this.progress,
    required this.child,
  });

  final double directionInDegrees;
  final double maxDistance;
  final Animation<double> progress;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: progress,
      builder: (context, child) {
        final offset = Offset.fromDirection(
          directionInDegrees * (math.pi / 180.0),
          progress.value * maxDistance,
        );
        return Positioned(
          right: 4.0 + offset.dx,
          bottom: 4.0 + offset.dy,
          child: Transform.rotate(
            angle: (1.0 - progress.value) * math.pi / 2,
            child: child!,
          ),
        );
      },
      child: FadeTransition(opacity: progress, child: child),
    );
  }
}
```

The most important part of `_ExpandingActionButton` is the
`Positioned` widget, which positions the `child` at a specific (x,y)
coordinate within the surrounding `Stack`.
The `AnimatedBuilder` causes the `Positioned` widget to rebuild
every time the animation changes. The `FadeTransition` widget
orchestrates the appearance and disappearance of each
`ActionButton` as they expand and collapse, respectively.

`_ExpandingActionButton` 最重要的部分是 `Positioned` widget，
它将 `child` 定位在周围 `Stack` 中的特定 (x,y) 坐标上。
`AnimatedBuilder` 会在动画每次变化时让 `Positioned` widget 重新构建。
`FadeTransition` widget 负责在每个 `ActionButton` 展开和收起时分别控制它们的出现与消失。

:::note
The use of a `Positioned` widget within `_ExpandingActionButton`
implies that `_ExpandingActionButton` can only be used as a direct
child of a `Stack`. This is due to the explicit relationship
between `Positioned` and `Stack`.

在 `_ExpandingActionButton` 中使用 `Positioned` 小部件意味着它只能作为 `Stack` 的直接子 widget 使用。
这是由 `Positioned` 与 `Stack` 之间的显式关联所决定的。
:::

Finally, use the new `_ExpandingActionButton` widget
within the `ExpandableFab` to complete the exercise.

最后，在 `ExpandableFab` 中使用新的 `_ExpandingActionButton` widget 以完成该练习。

<?code-excerpt "lib/excerpt4.dart (ExpandableFabState4)" replace="/\/\/ code-excerpt-closing-bracket/}/g"?>
```dart
class _ExpandableFabState extends State<ExpandableFab>
    with SingleTickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    return SizedBox.expand(
      child: Stack(
        alignment: Alignment.bottomRight,
        clipBehavior: Clip.none,
        children: [
          _buildTapToCloseFab(),
          ..._buildExpandingActionButtons(),
          _buildTapToOpenFab(),
        ],
      ),
    );
  }

  List<Widget> _buildExpandingActionButtons() {
    final children = <Widget>[];
    final count = widget.children.length;
    final step = 90.0 / (count - 1);
    for (
      var i = 0, angleInDegrees = 0.0;
      i < count;
      i++, angleInDegrees += step
    ) {
      children.add(
        _ExpandingActionButton(
          directionInDegrees: angleInDegrees,
          maxDistance: widget.distance,
          progress: _expandAnimation,
          child: widget.children[i],
        ),
      );
    }
    return children;
  }
  }
```

Congratulations! You now have an expandable FAB.

恭喜！你现在有了一个可展开的 FAB。

## Interactive example

## 互动实例

Run the app:

运行这个应用：

* Click the FAB in the lower-right corner,
  represented with an Edit icon.
  It fans out to 3 buttons and is itself replaced by
  a close button, represented by an **X**.

  点击右下角带有编辑图标的 FAB。
  它会展开成 3 个按钮，并被一个展示为 **X** 形状的关闭按钮替换。

* Click the close button to see the expanded
  buttons fly back to the original FAB and
  the **X** is replaced by the Edit icon.

  点击关闭按钮，可以看到展开的按钮变回到原来的 FAB，**X** 形状被编辑图标替换。

* Expand the FAB again, and click on any
  of the 3 satellite buttons to see a dialog
  representing that button's action.

  再次展开 FAB，然后点击三个像卫星的按钮中的任意一个，即可看到显示按下按钮对应操作的对话框。


<!-- start dartpad -->

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter expandable floating action button hands-on example in DartPad" run="true"
import 'dart:math' as math;

import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleExpandableFab(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

@immutable
class ExampleExpandableFab extends StatelessWidget {
  static const _actionTitles = ['Create Post', 'Upload Photo', 'Upload Video'];

  const ExampleExpandableFab({super.key});

  void _showAction(BuildContext context, int index) {
    showDialog<void>(
      context: context,
      builder: (context) {
        return AlertDialog(
          content: Text(_actionTitles[index]),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('CLOSE'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Expandable Fab')),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(vertical: 8),
        itemCount: 25,
        itemBuilder: (context, index) {
          return FakeItem(isBig: index.isOdd);
        },
      ),
      floatingActionButton: ExpandableFab(
        distance: 112,
        children: [
          ActionButton(
            onPressed: () => _showAction(context, 0),
            icon: const Icon(Icons.format_size),
          ),
          ActionButton(
            onPressed: () => _showAction(context, 1),
            icon: const Icon(Icons.insert_photo),
          ),
          ActionButton(
            onPressed: () => _showAction(context, 2),
            icon: const Icon(Icons.videocam),
          ),
        ],
      ),
    );
  }
}

@immutable
class ExpandableFab extends StatefulWidget {
  const ExpandableFab({
    super.key,
    this.initialOpen,
    required this.distance,
    required this.children,
  });

  final bool? initialOpen;
  final double distance;
  final List<Widget> children;

  @override
  State<ExpandableFab> createState() => _ExpandableFabState();
}

class _ExpandableFabState extends State<ExpandableFab>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _expandAnimation;
  bool _open = false;

  @override
  void initState() {
    super.initState();
    _open = widget.initialOpen ?? false;
    _controller = AnimationController(
      value: _open ? 1.0 : 0.0,
      duration: const Duration(milliseconds: 250),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      curve: Curves.fastOutSlowIn,
      reverseCurve: Curves.easeOutQuad,
      parent: _controller,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggle() {
    setState(() {
      _open = !_open;
      if (_open) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox.expand(
      child: Stack(
        alignment: Alignment.bottomRight,
        clipBehavior: Clip.none,
        children: [
          _buildTapToCloseFab(),
          ..._buildExpandingActionButtons(),
          _buildTapToOpenFab(),
        ],
      ),
    );
  }

  Widget _buildTapToCloseFab() {
    return SizedBox(
      width: 56,
      height: 56,
      child: Center(
        child: Material(
          shape: const CircleBorder(),
          clipBehavior: Clip.antiAlias,
          elevation: 4,
          child: InkWell(
            onTap: _toggle,
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Icon(Icons.close, color: Theme.of(context).primaryColor),
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _buildExpandingActionButtons() {
    final children = <Widget>[];
    final count = widget.children.length;
    final step = 90.0 / (count - 1);
    for (
      var i = 0, angleInDegrees = 0.0;
      i < count;
      i++, angleInDegrees += step
    ) {
      children.add(
        _ExpandingActionButton(
          directionInDegrees: angleInDegrees,
          maxDistance: widget.distance,
          progress: _expandAnimation,
          child: widget.children[i],
        ),
      );
    }
    return children;
  }

  Widget _buildTapToOpenFab() {
    return IgnorePointer(
      ignoring: _open,
      child: AnimatedContainer(
        transformAlignment: Alignment.center,
        transform: Matrix4.diagonal3Values(
          _open ? 0.7 : 1.0,
          _open ? 0.7 : 1.0,
          1.0,
        ),
        duration: const Duration(milliseconds: 250),
        curve: const Interval(0.0, 0.5, curve: Curves.easeOut),
        child: AnimatedOpacity(
          opacity: _open ? 0.0 : 1.0,
          curve: const Interval(0.25, 1.0, curve: Curves.easeInOut),
          duration: const Duration(milliseconds: 250),
          child: FloatingActionButton(
            onPressed: _toggle,
            child: const Icon(Icons.create),
          ),
        ),
      ),
    );
  }
}

@immutable
class _ExpandingActionButton extends StatelessWidget {
  const _ExpandingActionButton({
    required this.directionInDegrees,
    required this.maxDistance,
    required this.progress,
    required this.child,
  });

  final double directionInDegrees;
  final double maxDistance;
  final Animation<double> progress;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: progress,
      builder: (context, child) {
        final offset = Offset.fromDirection(
          directionInDegrees * (math.pi / 180.0),
          progress.value * maxDistance,
        );
        return Positioned(
          right: 4.0 + offset.dx,
          bottom: 4.0 + offset.dy,
          child: Transform.rotate(
            angle: (1.0 - progress.value) * math.pi / 2,
            child: child!,
          ),
        );
      },
      child: FadeTransition(opacity: progress, child: child),
    );
  }
}

@immutable
class ActionButton extends StatelessWidget {
  const ActionButton({super.key, this.onPressed, required this.icon});

  final VoidCallback? onPressed;
  final Widget icon;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Material(
      shape: const CircleBorder(),
      clipBehavior: Clip.antiAlias,
      color: theme.colorScheme.secondary,
      elevation: 4,
      child: IconButton(
        onPressed: onPressed,
        icon: icon,
        color: theme.colorScheme.onSecondary,
      ),
    );
  }
}

@immutable
class FakeItem extends StatelessWidget {
  const FakeItem({super.key, required this.isBig});

  final bool isBig;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 24),
      height: isBig ? 128 : 36,
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.all(Radius.circular(8)),
        color: Colors.grey.shade300,
      ),
    );
  }
}
```
