---
title: Taps, drags, and other gestures
title: 点击、拖动和其他手势
---

This document explains how to listen for, and respond to,
_gestures_ in Flutter. Examples of gestures include
taps, drags, and scaling.

本篇文档解释了如何在 Flutter 中监听和响应*手势*（点击，拖动和缩放）。

The gesture system in Flutter has two separate layers.  The first layer has raw
pointer events, which describe the location and movement of pointers (e.g.,
touches, mice, and styli) across the screen. The second layer has _gestures_,
which describe semantic actions that consist of one or more pointer movements.

Flutter 中的手势系统包括了两个分离的层面。第一层有原始指针事件，它描述了屏幕上指针（例如，触摸，鼠标和触控笔）的位置和移动。第二层有*手势*，它描述了由一个或多个指针移动组成的语义动作。

## Pointers

## 指针

Pointers represent raw data about the user's interaction with the device's
screen.  There are four types of pointer events:

指针代表用户与设备屏幕交互的原始数据。有四种类型的指针事件：

- [`PointerDownEvent`]({{site.api}}/flutter/gestures/PointerDownEvent-class.html)
  The pointer has contacted the screen at a particular location.
  
  [`PointerDownEvent`]({{site.api}}/flutter/gestures/PointerDownEvent-class.html) 指针接触到屏幕的特定位置。

- [`PointerMoveEvent`]({{site.api}}/flutter/gestures/PointerMoveEvent-class.html)
  The pointer has moved from one location on the screen to another.

  [`PointerMoveEvent`]({{site.api}}/flutter/gestures/PointerMoveEvent-class.html) 指针从屏幕上的一个位置移动到另一个位置。

- [`PointerUpEvent`]({{site.api}}/flutter/gestures/PointerUpEvent-class.html)
  The pointer has stopped contacting the screen.

  [`PointerUpEvent`]({{site.api}}/flutter/gestures/PointerUpEvent-class.html) 指针停止接触屏幕。

- [`PointerCancelEvent`]({{site.api}}/flutter/gestures/PointerCancelEvent-class.html)
  Input from this pointer is no longer directed towards this app.

  [`PointerCancelEvent`]({{site.api}}/flutter/gestures/PointerCancelEvent-class.html) 指针的输入事件不再指向该应用。

On pointer down, the framework does a _hit test_ on your app to determine which
widget exists at the location where the pointer contacted the screen. The
pointer down event (and subsequent events for that pointer) are then dispatched
to the innermost widget found by the hit test. From there, the events bubble up
the tree and are dispatched to all the widgets on the path from the innermost
widget to the root of the tree. There is no mechanism for canceling or stopping
pointer events from being dispatched further.

当指针按下时，框架将会对应用做一个*命中测试*，以确定指针与屏幕接触的位置存在哪个 widget。指针按下事件（包括指针的后续事件）将会被分发到由命中测试发现的最内部的 widget 上。从那里开始，这些事件会在 widget 树上进行向上冒泡，并从最内部 widget 分发到 widget 树的根路径上的所有 widget。没有用于取消或停止指针事件进一步分发的机制。

To listen to pointer events directly from the widgets layer, use a
[`Listener`]({{site.api}}/flutter/widgets/Listener-class.html)
widget. However, generally, consider using gestures (as discussed
below) instead.

要想直接从 widget 层监听指针事件，可以使用 [`Listener`]({{site.api}}/flutter/widgets/Listener-class.html)
widget。但是，一般来说，请考虑使用手势（如下所述）。

## Gestures

## 手势

Gestures represent semantic actions (e.g., tap, drag, and scale) that are
recognized from multiple individual pointer events, potentially even multiple
individual pointers. Gestures can dispatch multiple events, corresponding to the
lifecycle of the gesture (e.g., drag start, drag update, and drag end):

手势表示可以从多个单独指针事件（甚至是多个单独的指针）识别出的语义动作（比如，点击，拖动和缩放）。完整的手势可以分发多个事件，对应于手势的生命周期（例如，拖动开始，拖动更新和拖动结束）：

- Tap

  单击

  - `onTapDown` A pointer that might cause a tap has contacted the screen at a
    particular location.

    `onTapDown` 可能导致单击的指针已经与屏幕的特定位置接触。

  - `onTapUp` A pointer that will trigger a tap has stopped contacting the screen
    at a particular location.

    `onTapUp` 即将触发单击的指针停止与屏幕的特定位置接触。

  - `onTap` A tap has occurred.

    `onTap` 单击事件已经发生。

  - `onTapCancel` The pointer that previously triggered the `onTapDown` will not
    end up causing a tap.

    `onTapCancel` 指针先前触发了 `onTapDown` 但没有完成单击。

- Double tap

  双击

  - `onDoubleTap` The user has tapped the screen at the same location twice in
    quick succession.

    `onDoubleTap` 用户连续快速的在屏幕相同位置上点击两次。

- Long press

  长按

  - `onLongPress` A pointer has remained in contact with the screen at the same
    location for a long period of time.

    `onLongPress` 指针在屏幕的相同位置上长时间保持与屏幕接触。

- Vertical drag

  垂直拖动

  - `onVerticalDragStart` A pointer has contacted the screen and might begin to
    move vertically.
  
    `onVerticalDrafStart` 指针已经与屏幕接触并可能要开始垂直移动。

  - `onVerticalDragUpdate` A pointer that is in contact with the screen and
    moving vertically has moved in the vertical direction.

    `onVerticalDragUpdate` 指针已经与屏幕接触并已经在垂直方向上移动。

  - `onVerticalDragEnd` A pointer that was previously in contact with the screen
    and moving vertically is no longer in contact with the screen and was moving
    at a specific velocity when it stopped contacting the screen.

    `onVerticalDragEnd` 之前与屏幕接触并垂直移动的指针不再与屏幕接触，并且当它停止与屏幕接触时，正在以恒定速度移动。

- Horizontal drag

  水平拖动

  - `onHorizontalDragStart` A pointer has contacted the screen and might begin to
    move horizontally.

    `onHorizontalDragStart` 指针已经与屏幕接触并可能要开始水平移动。

  - `onHorizontalDragUpdate` A pointer that is in contact with the screen and
    moving horizontally has moved in the horizontal direction.

    `onHorizontalDragUpdate` 指针已经与屏幕接触并已经在水平方向上移动。

  - `onHorizontalDragEnd` A pointer that was previously in contact with the
    screen and moving horizontally is no longer in contact with the screen and
    was moving at a specific velocity when it stopped contacting the screen.

    `onHorizontalDragEnd` 之前与屏幕接触并垂直移动的指针不再与屏幕接触，并且当它停止与屏幕接触，正在以恒定速度移动。

- Pan

  手指移动

  - `onPanStart` A pointer has contacted the screen and might begin to move 
    horizontally or vertically. This callback causes a crash if 
    `onHorizontalDragStart` or `onVerticalDragStart` is set.

    `onPanStart` 指针已经与屏幕接触并可能要水平或垂直移动。如果设置了 `onHorizontalDragStart` 或者 `onVertacalDragStart`，该回调会导致崩溃。

  - `onPanUpdate`A pointer that is in contact with the screen and is moving 
    in the vertical or horizontal direction. This callback causes a crash if 
    `onHorizontalDragUpdate` or `onVerticalDragUpdate` is set.

    `onPanUpdate` 指针已经与屏幕接触并且已经在水平或垂直方向上移动。如果设置了 `onHorizontalDragUpdate` 或者 `onVertacalDragUpdate`，该回调会导致崩溃。

  - `onPanEnd` A pointer that was previously in contact with screen 
    is no longer in contact with the screen and is moving at a specific velocity
    when it stopped contacting the screen. This callback causes a crash if 
    `onHorizontalDragEnd` or `onVerticalDragEnd` is set.

    `onPanEnd` 先前与屏幕接触过的指针不再与屏幕接触，当它停止与屏幕接触时，正在以特定速度移动。如果设置了 `onHorizontalDragEnd` 或 `onVerticalDragEnd`，该回调会导致崩溃。

To listen to gestures from the widgets layer, use a
[`GestureDetector`]({{site.api}}/flutter/widgets/GestureDetector-class.html).

要想在 widget 层面监听手势，可以使用 [`GestureDetector`]({{site.api}}/flutter/widgets/GestureDetector-class.html)。

If you're using Material Components, many of those widgets already respond
to taps or gestures.
For example,
[IconButton]({{site.api}}/flutter/material/IconButton-class.html) and
[FlatButton]({{site.api}}/flutter/material/FlatButton-class.html)
respond to presses (taps), and
[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)
responds to swipes to trigger scrolling.
If you are not using those widgets, but you want the "ink splash" effect on a
tap, you can use
[`InkWell`]({{site.api}}/flutter/material/InkWell-class.html).

如果你使用的是 Material Components，那大多数 widget 已经对单击或手势做出了响应。例如，[IconButton]({{site.api}}/flutter/material/IconButton-class.html) 和
[FlatButton]({{site.api}}/flutter/material/FlatButton-class.html)
响应了按压事件，[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html) 响应滑动事件来触发滚动。如果你不使用这些 widget，但想要实现点击时的“墨水飞溅”效果，可以使用 [`InkWell`]({{site.api}}/flutter/material/InkWell-class.html)。

### Gesture disambiguation

### 手势冲突处理

At a given location on screen, there might be multiple gesture detectors. All
of these gesture detectors listen to the stream of pointer events as they flow
past and attempt to recognize specific gestures. The
[`GestureDetector`]({{site.api}}/flutter/widgets/GestureDetector-class.html)
widget decides which gestures to attempt to recognize based on which of its
callbacks are non-null.

在屏幕指定的位置上，可能会有多个手势监测器。所有这些手势监测器都在指针事件经过时监听指针事件流，并尝试识别特定的手势。[`GestureDetector`]({{site.api}}/flutter/widgets/GestureDetector-class.html) widget 根据哪个回调为非空，来决定尝试识别哪些手势。

When there is more than one gesture recognizer for a given pointer on the
screen, the framework disambiguates which gesture the user intends by having
each recognizer join the _gesture arena_. The gesture arena determines which
gesture wins using the following rules:

当屏幕上特定位置有多个手势识别器时，框架让每个识别器加入*手势竞技场*来处理冲突以确定用户想要的手势。手势竞技场使用以下规则来决定哪个手势获胜：

- At any time, a recognizer can declare defeat and leave the arena.  If there's
  only one recognizer left in the arena, that recognizer is the winner.

  任何时候，识别器都可以宣布失败并离开竞技场。如果竞技场最后只剩下一个识别器，那它就是最后赢家。

- At any time, a recognizer can declare victory, which causes it to win and all
  the remaining recognizers to lose.

  任何时候，识别器可以宣告胜利，那么它将会胜利并且所有剩下的识别器都会失败。

For example, when disambiguating horizontal and vertical dragging, both
recognizers enter the arena when they receive the pointer down event.  The
recognizers observe the pointer move events.  If the user moves the pointer more
than a certain number of logical pixels horizontally, the horizontal recognizer
will declare victory and the gesture will be interpreted as a horizontal drag.
Similarly, if the user moves more than a certain number of logical pixels
vertically, the vertical recognizer will declare victory.

例如，在解决水平和垂直拖动的冲突时，两个识别器在接收到指针点击事件时都会进入竞技场。识别器将会观察指针移动事件。如果用户在水平方向上移动超过一定大小的逻辑像素，那么水平识别器将会宣告胜利，并且该手势将会被解释为水平拖动。类似的，如果用户在垂直方向上移动超过一定大小的逻辑像素，垂直识别器将会宣告胜利。

The gesture arena is beneficial when there is only a horizontal (or vertical)
drag recognizer.  In that case, there will be only one recognizer in the arena
and the horizontal drag will be recognized immediately, which means the first
pixel of horizontal movement can be treated as a drag and the user will not need
to wait for further gesture disambiguation.

只有一个水平或垂直拖动识别器时，对于手势竞技场来说这是有利的。这种情况下，手势竞技场只有一个识别器，水平拖动将被立即识别，这意味着水平移动的第一个像素将被识别为拖动，而用户不需要等待进一步的手势冲突处理。