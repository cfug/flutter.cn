---
# title: Trackpad gestures can trigger GestureRecognizer
title: 触控板手势可以触发 GestureRecognizer
# description: >
#   Trackpad gestures on most platforms now send `PointerPanZoom` sequences and
#   can trigger pan, drag, and scale `GestureRecognizer` callbacks.
description: >
  在大多数平台上，触控板手势现在会发送 `PointerPanZoom` 序列，
  并能触发平移、拖动和缩放 `GestureRecognizer` 回调。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Trackpad gestures on most platforms now send `PointerPanZoom` sequences and
can trigger pan, drag, and scale `GestureRecognizer` callbacks.

在大多数平台上，触控板手势现在会发送 `PointerPanZoom` 序列，
并能触发平移、拖动和缩放 `GestureRecognizer` 回调。

## Context

## 上下文

Scrolling on Flutter Desktop prior to version 3.3.0 used `PointerScrollEvent`
messages to represent discrete scroll deltas. This system worked well for mouse
scroll wheels, but wasn't a good fit for trackpad scrolling. Trackpad scrolling
is expected to cause momentum, which depends not only on the scroll deltas, but
also the timing of when fingers are released from the trackpad.
In addition, trackpad pinching-to-zoom could not be represented.

在 3.3.0 之前，Flutter 桌面端的滚动使用 `PointerScrollEvent`
消息来表示离散的滚动增量。这套系统很适合鼠标滚轮，
但不适合触控板滚动。触控板滚动应当产生惯性，
这不仅取决于滚动增量，还取决于手指离开触控板的时机。
此外，触控板的双指捏合缩放也无法表示。

Three new `PointerEvent`s have been introduced: `PointerPanZoomStartEvent`,
`PointerPanZoomUpdateEvent`, and `PointerPanZoomEndEvent`.
Relevant `GestureRecognizer`s have been updated to register interest in
trackpad gesture sequences, and will emit `onDrag`, `onPan`, and/or
`onScale` callbacks in response to movements
of two or more fingers on the trackpad.

新增了三个 `PointerEvent`：`PointerPanZoomStartEvent`、
`PointerPanZoomUpdateEvent` 和 `PointerPanZoomEndEvent`。
相关 `GestureRecognizer` 已更新，会登记对触控板手势序列的兴趣，
并在触控板上两根或更多手指移动时
发出 `onDrag`、`onPan` 和/或 `onScale` 回调。

This means both that code designed only for touch interactions might trigger upon
trackpad interaction, and that code designed to handle all desktop scrolling
might now only trigger upon mouse scrolling, and not trackpad scrolling.

这意味着两方面：只为触摸交互设计的代码可能会在触控板交互时触发，
而为处理所有桌面滚动而设计的代码现在可能只在鼠标滚动时触发，
触控板滚动则不会触发。

## Description of change

## 改动说明

The Flutter engine has been updated on all possible platforms to recognize
trackpad gestures and send them to the framework as `PointerPanZoom` events
instead of as `PointerScrollSignal` events. `PointerScrollSignal` events will
still be used to represent scrolling on a mouse wheel.

Flutter 引擎已在所有可行的平台上更新，
以识别触控板手势，并把它们作为 `PointerPanZoom` 事件
而不是 `PointerScrollSignal` 事件发送给框架。
`PointerScrollSignal` 事件仍用于表示鼠标滚轮滚动。

Depending on the platform and specific trackpad model, the new system might not
be used, if not enough data is provided to the Flutter engine by platform APIs.
This includes on Windows, where trackpad gesture support is dependent on the
trackpad's driver, and the Web platform, where not enough data is provided by
browser APIs, and trackpad scrolling must still
use the old `PointerScrollSignal` system.

取决于平台和具体的触控板型号，如果平台 API 提供给 Flutter 引擎的数据不足，
可能不会使用这套新系统。
这包括 Windows（触控板手势支持取决于触控板驱动），
以及 Web 平台（浏览器 API 提供的数据不足，
触控板滚动仍必须使用旧的 `PointerScrollSignal` 系统）。

Developers should be prepared to receive both types of events and
ensure their apps or packages handle them in the appropriate manner.

开发者应准备好同时接收这两类事件，
并确保应用或 package 以恰当的方式处理它们。

`Listener` now has three new callbacks: `onPointerPanZoomStart`,
`onPointerPanZoomUpdate`, and `onPointerPanZoomEnd` which can
be used to observe trackpad scrolling and zooming events.

`Listener` 现在有三个新回调：`onPointerPanZoomStart`、
`onPointerPanZoomUpdate` 和 `onPointerPanZoomEnd`，
可用于观察触控板的滚动与缩放事件。

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerSignal: (PointerSignalEvent event) {
        if (event is PointerScrollEvent) {
          debugPrint('mouse scrolled ${event.scrollDelta}');
        }
      },
      onPointerPanZoomStart: (PointerPanZoomStartEvent event) {
        debugPrint('trackpad scroll started');
      },
      onPointerPanZoomUpdate: (PointerPanZoomUpdateEvent event) {
        debugPrint('trackpad scrolled ${event.panDelta}');
      },
      onPointerPanZoomEnd: (PointerPanZoomEndEvent event) {
        debugPrint('trackpad scroll ended');
      },
      child: Container()
    );
  }
}
```

`PointerPanZoomUpdateEvent` contains a `pan` field to represent the cumulative
pan of the current gesture, a `panDelta` field to represent the difference in
pan since the last event, a `scale` event to represent the cumulative zoom
of the current gesture, and a `rotation` event to
represent the cumulative rotation (in radians) of the current gesture.

`PointerPanZoomUpdateEvent` 包含一个 `pan` 字段，表示当前手势的累计平移；
一个 `panDelta` 字段，表示自上次事件以来的平移差值；
一个 `scale` 字段，表示当前手势的累计缩放；
以及一个 `rotation` 字段，表示当前手势的累计旋转（以弧度为单位）。

`GestureRecognizer`s now have methods to all the trackpad events from one
continuous trackpad gesture. Calling the `addPointerPanZoom` method on a
`GestureRecognizer` with a `PointerPanZoomStartEvent` will cause the recognizer
to register its interest in that trackpad interaction, and resolve conflicts
between multiple `GestureRecognizer`s that could potentially respond to the
gesture.

`GestureRecognizer` 现在有方法可以接收同一次连续触控板手势的全部触控板事件。
用 `PointerPanZoomStartEvent` 调用 `GestureRecognizer` 的
`addPointerPanZoom` 方法，会让识别器登记对该触控板交互的兴趣，
并解决多个可能响应该手势的 `GestureRecognizer` 之间的冲突。

The following example shows the proper use of `Listener` and `GestureRecognizer`
to respond to trackpad interactions.

下面的示例展示了如何正确使用 `Listener` 和 `GestureRecognizer`
来响应触控板交互。

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      onPointerPanZoomStart: recognizer.addPointerPanZoom,
      child: Container()
    );
  }
}
```

When using `GestureDetector`, this is done automatically, so code such as the
following example will issue its gesture update callbacks in response to both
touch and trackpad panning.

使用 `GestureDetector` 时，这会自动完成，
因此下面这样的代码会在触摸平移和触控板平移时都发出手势更新回调。

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanStart: (details) {
        debugPrint('onStart');
      },
      onPanUpdate: (details) {
        debugPrint('onUpdate');
      },
      onPanEnd: (details) {
        debugPrint('onEnd');
      }
      child: Container()
    );
  }
}
```

## Migration guide

## 迁移指南

Migration steps depend on whether you want each gesture interaction in your
app to be usable via a trackpad, or whether it should be restricted to only
touch and mouse usage.

迁移步骤取决于你是否希望应用中的每种手势交互都能通过触控板使用，
还是应当仅限于触摸和鼠标。

### For gesture interactions suitable for trackpad usage

### 适合触控板使用的手势交互

#### Using `GestureDetector`

#### 使用 `GestureDetector`

No change is needed, `GestureDetector` automatically processes trackpad
gesture events and triggers callbacks if recognized.

无需更改，`GestureDetector` 会自动处理触控板手势事件，
并在识别后触发回调。

#### Using `GestureRecognizer` and `Listener`

#### 使用 `GestureRecognizer` 与 `Listener`

Ensure that `onPointerPanZoomStart` is passed through to
each recognizer from the `Listener`.
The `addPointerPanZoom` method of `GestureRecognizer must be called
for it to show interest and start tracking each trackpad gesture.

请确保把 `onPointerPanZoomStart` 从 `Listener` 传递给每个识别器。
必须调用 `GestureRecognizer` 的 `addPointerPanZoom` 方法，
它才会表示兴趣并开始跟踪每个触控板手势。

Code before migration:

迁移之前的代码：

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      child: Container()
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      onPointerPanZoomStart: recognizer.addPointerPanZoom,
      child: Container()
    );
  }
}
```

#### Using raw `Listener`

#### 使用原始 `Listener`

The following code using PointerScrollSignal will no longer be called upon all
desktop scrolling. `PointerPanZoomUpdate` events should be captured to receive
trackpad gesture data.

下面使用 PointerScrollSignal 的代码将不再在所有桌面滚动时被调用。
应当捕获 `PointerPanZoomUpdate` 事件来接收触控板手势数据。

Code before migration:

迁移之前的代码：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerSignal: (PointerSignalEvent event) {
        if (event is PointerScrollEvent) {
          debugPrint('scroll wheel event');
        }
      }
      child: Container()
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerSignal: (PointerSignalEvent event) {
        if (event is PointerScrollEvent) {
          debugPrint('scroll wheel event');
        }
      },
      onPointerPanZoomUpdate: (PointerPanZoomUpdateEvent event) {
        debugPrint('trackpad scroll event');
      }
      child: Container()
    );
  }
}
```

Please note: Use of raw `Listener` in this way could
cause conflicts with other gesture interactions as it
doesn't participate in the gesture disambiguation arena.

请注意：以这种方式使用原始 `Listener`
可能与其他手势交互冲突，
因为它不参与手势消歧竞技场。

### For gesture interactions not suitable for trackpad usage

### 不适合触控板使用的手势交互

#### Using `GestureDetector`

#### 使用 `GestureDetector` 排除触控板

If using Flutter 3.3.0, `RawGestureDetector` could be used
instead of `GestureDetector` to ensure each `GestureRecognizer` created
by the `GestureDetector` has `supportedDevices` set to
exclude `PointerDeviceKind.trackpad`.
Starting in version 3.4.0, there is a `supportedDevices` parameter
directly on `GestureDetector`.

如果使用 Flutter 3.3.0，可以用 `RawGestureDetector`
代替 `GestureDetector`，以确保 `GestureDetector` 创建的每个
`GestureRecognizer` 都把 `supportedDevices` 设为排除
`PointerDeviceKind.trackpad`。
从 3.4.0 起，`GestureDetector` 上直接有 `supportedDevices` 参数。

Code before migration:

迁移之前的代码：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanStart: (details) {
        debugPrint('onStart');
      },
      onPanUpdate: (details) {
        debugPrint('onUpdate');
      },
      onPanEnd: (details) {
        debugPrint('onEnd');
      }
      child: Container()
    );
  }
}
```

Code after migration (Flutter 3.3.0):

迁移之后的代码（Flutter 3.3.0）：

```dart
// Example of code after the change.
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RawGestureDetector(
      gestures: {
        PanGestureRecognizer:
            GestureRecognizerFactoryWithHandlers<PanGestureRecognizer>(
          () => PanGestureRecognizer(
            supportedDevices: {
              PointerDeviceKind.touch,
              PointerDeviceKind.mouse,
              PointerDeviceKind.stylus,
              PointerDeviceKind.invertedStylus,
              // Do not include PointerDeviceKind.trackpad
            }
          ),
          (recognizer) {
            recognizer
              ..onStart = (details) {
                debugPrint('onStart');
              }
              ..onUpdate = (details) {
                debugPrint('onUpdate');
              }
              ..onEnd = (details) {
                debugPrint('onEnd');
              };
          },
        ),
      },
      child: Container()
    );
  }
}
```

Code after migration: (Flutter 3.4.0):

迁移之后的代码：（Flutter 3.4.0）：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      supportedDevices: {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
        PointerDeviceKind.stylus,
        PointerDeviceKind.invertedStylus,
        // Do not include PointerDeviceKind.trackpad
      },
      onPanStart: (details) {
        debugPrint('onStart');
      },
      onPanUpdate: (details) {
        debugPrint('onUpdate');
      },
      onPanEnd: (details) {
        debugPrint('onEnd');
      }
      child: Container()
    );
  }
}
```

#### Using `RawGestureRecognizer`

#### 使用 `RawGestureRecognizer`

Explicitly ensure that `supportedDevices`
doesn't include `PointerDeviceKind.trackpad`.

请显式确保 `supportedDevices` 不包含 `PointerDeviceKind.trackpad`。

Code before migration:

迁移之前的代码：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RawGestureDetector(
      gestures: {
        PanGestureRecognizer:
            GestureRecognizerFactoryWithHandlers<PanGestureRecognizer>(
          () => PanGestureRecognizer(),
          (recognizer) {
            recognizer
              ..onStart = (details) {
                debugPrint('onStart');
              }
              ..onUpdate = (details) {
                debugPrint('onUpdate');
              }
              ..onEnd = (details) {
                debugPrint('onEnd');
              };
          },
        ),
      },
      child: Container()
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
// Example of code after the change.
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RawGestureDetector(
      gestures: {
        PanGestureRecognizer:
            GestureRecognizerFactoryWithHandlers<PanGestureRecognizer>(
          () => PanGestureRecognizer(
            supportedDevices: {
              PointerDeviceKind.touch,
              PointerDeviceKind.mouse,
              PointerDeviceKind.stylus,
              PointerDeviceKind.invertedStylus,
              // Do not include PointerDeviceKind.trackpad
            }
          ),
          (recognizer) {
            recognizer
              ..onStart = (details) {
                debugPrint('onStart');
              }
              ..onUpdate = (details) {
                debugPrint('onUpdate');
              }
              ..onEnd = (details) {
                debugPrint('onEnd');
              };
          },
        ),
      },
      child: Container()
    );
  }
}
```

#### Using `GestureRecognizer` and `Listener`

#### 使用 `GestureRecognizer` 与 `Listener` 排除触控板

After upgrading to Flutter 3.3.0, there won't be a change in behavior, as
`addPointerPanZoom` must be called on each `GestureRecognizer` to allow
it to track gestures. The following code won't receive pan gesture callbacks
when the trackpad is scrolled:

升级到 Flutter 3.3.0 之后，行为不会改变，
因为必须在每个 `GestureRecognizer` 上调用 `addPointerPanZoom`，
它才会跟踪手势。下面的代码在触控板滚动时不会收到平移手势回调：

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      // recognizer.addPointerPanZoom is not called
      child: Container()
    );
  }
}
```

## Timeline

## 时间线

Landed in version: 3.3.0-0.0.pre<br>
合入版本：3.3.0-0.0.pre<br>
In stable release: 3.3.0

进入稳定版：3.3.0

## References

## 参考资料

API documentation:

API 文档：

* [`GestureDetector`][]
* [`RawGestureDetector`][]
* [`GestureRecognizer`][]

Design document:

设计文档：

* [Flutter Trackpad Gestures][]

  [Flutter 触控板手势][Flutter Trackpad Gestures]

Relevant issues:

相关 issue：

* [Issue 23604][]

Relevant PRs:

相关 PR：

* [Support trackpad gestures in framework][]

  [在框架中支持触控板手势][Support trackpad gestures in framework]

* [iPad trackpad gestures][]

  [iPad 触控板手势][iPad trackpad gestures]

* [Linux trackpad gestures][]

  [Linux 触控板手势][Linux trackpad gestures]

* [Mac trackpad gestures][]

  [Mac 触控板手势][Mac trackpad gestures]

* [Win32 trackpad gestures][]

  [Win32 触控板手势][Win32 trackpad gestures]

* [ChromeOS/Android trackpad gestures][]

  [ChromeOS/Android 触控板手势][ChromeOS/Android trackpad gestures]

[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`GestureRecognizer`]: {{site.api}}/flutter/gestures/GestureRecognizer-class.html
[`RawGestureDetector`]: {{site.api}}/flutter/widgets/RawGestureDetector-class.html
[Flutter Trackpad Gestures]: https://docs.google.com/document/d/1oRvebwjpsC3KlxN1gOYnEdxtNpQDYpPtUFAkmTUe-K8
[Issue 23604]: {{site.repo.flutter}}/issues/23604
[Support trackpad gestures in framework]: {{site.repo.flutter}}/pull/89944
[iPad trackpad gestures]: {{site.repo.engine}}/pull/31591
[Linux trackpad gestures]: {{site.repo.engine}}/pull/31592
[Mac trackpad gestures]: {{site.repo.engine}}/pull/31593
[Win32 trackpad gestures]: {{site.repo.engine}}/pull/31594
[ChromeOS/Android trackpad gestures]: {{site.repo.engine}}/pull/34060
