---
title: Taps, drags, and other gestures
title: 点击、拖动和其他手势
---

This document explains how to listen for, and respond to,
_gestures_ in Flutter. Examples of gestures include
taps, drags, and scaling.

这个章节将会讲解如何监听和响应 Flutter 的手势操作 _gestures_。典型的手势操作包括点击、拖动和缩放。

The gesture system in Flutter has two separate layers.  The first layer has raw
pointer events, which describe the location and movement of pointers (e.g.,
touches, mice, and styli) across the screen. The second layer has _gestures_,
which describe semantic actions that consist of one or more pointer movements.

Flutter 中的手势有两个不同的层次：第一层是原始的指针指向事件，描述了屏幕上由触摸板、鼠标、指示笔等触发的指针的位置和移动。第二层包含 **gestures**，描述了由上述一个或多个指针移动组成的具有特殊语义的操作。


## Pointers

## 指针

Pointers represent raw data about the user's interaction with the device's
screen.  There are four types of pointer events:

Pointer 代表的是人机界面交互的原始数据。一共有四种指针事件：

- [`PointerDownEvent`][]
  The pointer has contacted the screen at a particular location.

  [`PointerDownEvent`][] 指针在特定位置与屏幕接触

- [`PointerMoveEvent`][]
  The pointer has moved from one location on the screen to another.
 
  [`PointerMoveEvent`][] 指针从屏幕的一个位置移动到另外一个位置 

- [`PointerUpEvent`][]
  The pointer has stopped contacting the screen.

  [`PointerUpEvent`][] 指针与屏幕停止接触

- [`PointerCancelEvent`][]
  Input from this pointer is no longer directed towards this app.

  [`PointerCancelEvent`][] 指针的输入已经不再指向此应用

On pointer down, the framework does a _hit test_ on your app to determine which
widget exists at the location where the pointer contacted the screen. The
pointer down event (and subsequent events for that pointer) are then dispatched
to the innermost widget found by the hit test. From there, the events bubble up
the tree and are dispatched to all the widgets on the path from the innermost
widget to the root of the tree. There is no mechanism for canceling or stopping
pointer events from being dispatched further.

在指针下落事件中，框架做了一个 **hit test** 的操作确定与屏幕发生接触的位置上有哪些组件以及分发给最内部的组件去响应。事件会沿着组件树从这个最内部的组件向组件树的根部冒泡分发。并且不存在用于取消或停止指针事件进行进一步分发的机制。

To listen to pointer events directly from the widgets layer, use a
[`Listener`][] widget. However, generally,
consider using gestures (as discussed below) instead.

使用 [`Listener`]({{site.api}}/flutter/widgets/Listener-class.html) 可以在组件层直接监听指针事件。然而，一般情况下，请考虑使用下面的 gestures 替代。

## Gestures

## 手势

Gestures represent semantic actions (e.g., tap, drag, and scale) that are
recognized from multiple individual pointer events, potentially even multiple
individual pointers. Gestures can dispatch multiple events, corresponding to the
lifecycle of the gesture (e.g., drag start, drag update, and drag end):

Gesture 代表的是语义操作（比如点击、拖动、缩放）。通常由一系列单独的指针事件组成，甚至是一系列单独的指针组成。Gesture 可以分发多种事件，对应着手势的生命周期（比如开始拖动、拖动更新、结束拖动）。

**Tap**

**点击**

`onTapDown` 
: A pointer that might cause a tap has contacted the screen at a
    particular location.

`onTapDown` 
: 指针在发生接触的屏幕的特定位置可能引发点击事件。

`onTapUp` 
: A pointer that will trigger a tap has stopped contacting the screen
    at a particular location.

`onTapUp` 
: 指针使在屏幕的特定位置触发的点击事件停止。

`onTap` 
: A tap has occurred.

`onTap` 
: 点击事件已经发生。

`onTapCancel` 
: The pointer that previously triggered the `onTapDown` will not
    end up causing a tap.

`onTapCancel` 
: 指针已经触发了 `onTapDown`，但是最终不会形成一个点击事件。

**Double tap**

**双击** 

`onDoubleTap` 
: The user has tapped the screen at the same location twice in
    quick succession.

`onDoubleTap` 
: 用户在屏幕的相同位置上快速点击了两次。

**Long press**

**长按**

`onLongPress` 
: A pointer has remained in contact with the screen at the same
    location for a long period of time.

`onLongPress` 
: 指针在屏幕的相同位置上保持接触持续一长段时间。

**Vertical drag**

**纵向拖动**

`onVerticalDragStart` 
: A pointer has contacted the screen and might begin to
    move vertically.

`onVerticalDragStart` 
: 指针和屏幕产生接触并可能开始纵向移动。

`onVerticalDragUpdate` 
: A pointer that is in contact with the screen and
    moving vertically has moved in the vertical direction.

`onVerticalDragUpdate` 
: 指针和屏幕产生接触，在纵向上发生移动并保持移动。

`onVerticalDragEnd` 
: A pointer that was previously in contact with the screen
    and moving vertically is no longer in contact with the screen and was moving
    at a specific velocity when it stopped contacting the screen.

`onVerticalDragEnd` 
: 指针先前和屏幕产生了接触，以特定速度纵向移动，并且此后不会在屏幕接触上发生纵向移动。

**Horizontal drag**

**横向拖动**

`onHorizontalDragStart` 
: A pointer has contacted the screen and might begin to
    move horizontally.

`onHorizontalDragStart` 
: 指针和屏幕产生接触并可能开始横向移动。

`onHorizontalDragUpdate` 
: A pointer that is in contact with the screen and
    moving horizontally has moved in the horizontal direction.

`onHorizontalDragUpdate` 
: 指针和屏幕产生接触，在横向上发生移动并保持移动。

`onHorizontalDragEnd` 
: A pointer that was previously in contact with the
    screen and moving horizontally is no longer in contact with the screen and
    was moving at a specific velocity when it stopped contacting the screen.

`onHorizontalDragEnd` 
: 指针先前和屏幕产生了接触，以特定速度横向移动，并且此后不会在屏幕接触上发生横向移动。

**Pan**

**移动**

`onPanStart` 
: A pointer has contacted the screen and might begin to move 
    horizontally or vertically. This callback causes a crash if 
    `onHorizontalDragStart` or `onVerticalDragStart` is set.

`onPanStart` 
: 指针和屏幕产生接触并可能开始横向移动或者纵向移动。如果设置了 `onHorizontalDragStart` 或者 `onVerticalDragStart`，该回调方法会引发崩溃。

`onPanUpdate` 
: A pointer that is in contact with the screen and is moving 
    in the vertical or horizontal direction. This callback causes a crash if 
    `onHorizontalDragUpdate` or `onVerticalDragUpdate` is set.

`onPanUpdate` 
: 指针和屏幕产生接触，在横向或者纵向上发生移动并保持移动。如果设置了 `onHorizontalDragUpdate` 或者 `onVerticalDragUpdate`，该回调方法会引发崩溃。

`onPanEnd` 
: A pointer that was previously in contact with screen 
    is no longer in contact with the screen and is moving at a specific velocity
    when it stopped contacting the screen. This callback causes a crash if 
    `onHorizontalDragEnd` or `onVerticalDragEnd` is set.


    `onPanEnd` 指针先前和屏幕产生了接触，并且以特定速度移动，此后不再在屏幕接触上发生移动。如果设置了 `onHorizontalDragEnd` 或者 `onVerticalDragEnd`，该回调方法会引发崩溃。

### Adding gesture detection to widgets

### 为 widgets 添加手势检测

To listen to gestures from the widgets layer, use a
[`GestureDetector`][].

从组件层监听手势，需要用到 [`GestureDetector`][]。

If you're using Material Components, many of those widgets already respond
to taps or gestures.
For example,
[IconButton][] and
[FlatButton][]
respond to presses (taps), and
[`ListView`][]
responds to swipes to trigger scrolling.
If you are not using those widgets, but you want the
"ink splash" effect on a tap, you can use [`InkWell`][].

如果使用 Material 风格的组件，其中的许多组件都能够支持响应点击或者手势事件。比如 [IconButton][] 和 [FlatButton][] 响应了按压事件（点击事件），[`ListView`][] 响应了滚动事件。如果使用了上述组件，你也可以使用 [`InkWell`][] 来实现点击的“水波纹”效果。

### Gesture disambiguation

### 手势消歧处理

At a given location on screen, there might be multiple gesture detectors. All
of these gesture detectors listen to the stream of pointer events as they flow
past and attempt to recognize specific gestures. The
[`GestureDetector`][]
widget decides which gestures to attempt to recognize based on which of its
callbacks are non-null.

在屏幕的指定位置上，可能有多个手势捕捉器。所有的手势捕捉器监听了指针输入流事件并判断出特定手势。[`GestureDetector`][] widget 能够基于手势的回调是否非空决定是否应该尝试去识别该手势。

When there is more than one gesture recognizer for a given pointer on the
screen, the framework disambiguates which gesture the user intends by having
each recognizer join the _gesture arena_. The gesture arena determines which
gesture wins using the following rules:

当屏幕上的指定指针有多个手势识别器时，框架会通过给每个手势识别器加入 **gesture arena** 来处理手势消歧。gesture arena，也称作手势竞技场，会利用下述规则确定哪个手势在竞争中胜出：

- At any time, a recognizer can declare defeat and leave the arena.  If there's
  only one recognizer left in the arena, that recognizer is the winner.

  在任何时候，识别器都可以宣告失败并离开竞技场。如果竞技场中只有一个识别器，那么这个识别器就是胜者。

- At any time, a recognizer can declare victory, which causes it to win and all
  the remaining recognizers to lose.

  在任何时候，任何识别器都可以宣告胜利，这将导致这个识别器胜出，其他识别器失败。

For example, when disambiguating horizontal and vertical dragging, both
recognizers enter the arena when they receive the pointer down event.  The
recognizers observe the pointer move events.  If the user moves the pointer more
than a certain number of logical pixels horizontally, the horizontal recognizer
will declare victory and the gesture will be interpreted as a horizontal drag.
Similarly, if the user moves more than a certain number of logical pixels
vertically, the vertical recognizer will declare victory.

比如，当纵向拖动和横向拖动需要处理消歧，当指南针下落事件发生时，纵向和横向识别器都会进入竞技场，观测指针移动事件。如果用户在横向上移动超过了特定像素，横向识别器会宣告胜利，手势也会被当作横向拖动处理。同样的，如果用户在纵向上移动超过了特定的像素，纵向识别器会宣告胜利。

The gesture arena is beneficial when there is only a horizontal (or vertical)
drag recognizer.  In that case, there will be only one recognizer in the arena
and the horizontal drag will be recognized immediately, which means the first
pixel of horizontal movement can be treated as a drag and the user will not need
to wait for further gesture disambiguation.

手势竞技场在仅有一个横向（或者纵向）拖动识别器的时候是非常高效的。在此示例中，竞技场中只有一个横向识别器，横向拖动就能够被立即识别到，这意味着横向移动从第一个像素开始就能够被立即处理成横向拖动手势，而并不需要等待进一步的手势消歧处理。

[`FlatButton`]: {{site.api}}/flutter/material/FlatButton-class.html
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`InkWell`]: {{site.api}}/flutter/material/InkWell-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`Listener`]: {{site.api}}/flutter/widgets/Listener-class.html
[`PointerCancelEvent`]: {{site.api}}/flutter/gestures/PointerCancelEvent-class.html
[`PointerDownEvent`]: {{site.api}}/flutter/gestures/PointerDownEvent-class.html
[`PointerMoveEvent`]: {{site.api}}/flutter/gestures/PointerMoveEvent-class.html
[`PointerUpEvent`]: {{site.api}}/flutter/gestures/PointerUpEvent-class.html
