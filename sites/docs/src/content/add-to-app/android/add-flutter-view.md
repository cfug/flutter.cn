---
# title: Add a Flutter View to an Android app
title: 向 Android 应用添加 Flutter View
# shortTitle: Integrate via FlutterView
shortTitle: 通过 FlutterView 集成
# description: Learn how to perform advanced integrations via Flutter Views.
description: 了解如何通过 Flutter View 进行高级集成。
tags: Flutter混合工程,add2app
keywords: Android,FlutterView
ai-translated: true
---

:::warning
Integrating via a [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
is advanced usage and requires manually creating custom, application specific
bindings.

通过 [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 集成属于高级用法，需要手动创建与应用相关的自定义绑定。
:::

Integrating via a [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
requires a bit more work than via FlutterActivity and FlutterFragment previously
described.

通过 [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 集成比前文介绍的 FlutterActivity 和 FlutterFragment 方式需要更多工作。

Fundamentally, the Flutter framework on the Dart side requires access to various
activity-level events and lifecycles to function. Since the FlutterView (which
is an [android.view.View]({{site.android-dev}}/reference/android/view/View.html))
can be added to any activity which is owned by the developer's application
and since the FlutterView doesn't have access to activity level events, the
developer must bridge those connections manually to the [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html).

从根本上说，Dart 侧的 Flutter 框架需要访问各种 activity 级别的事件与生命周期才能正常工作。由于 FlutterView（它是一个 [android.view.View]({{site.android-dev}}/reference/android/view/View.html)）可以添加到开发者应用拥有的任意 activity 中，而 FlutterView 无法访问 activity 级别的事件，因此开发者必须手动将这些连接桥接到 [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)。

How you choose to feed your application's activities' events to the FlutterView
will be specific to your application.

你如何将应用的 activity 事件传递给 FlutterView，取决于你的应用本身。

## A sample

## 示例

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-view/add-view-sample.webp' alt="Add Flutter View sample video">

Unlike the guides for FlutterActivity and FlutterFragment, the FlutterView
integration could be better demonstrated with a sample project.

与 FlutterActivity 和 FlutterFragment 的指南不同，FlutterView 集成更适合用示例项目来演示。

A sample project is at [https://github.com/flutter/samples/tree/main/add_to_app/android_view]({{site.repo.samples}}/tree/main/add_to_app/android_view)
to document a simple FlutterView integration where FlutterViews are used
for some of the cells in a RecycleView list of cards as seen in the gif above.

示例项目位于 [https://github.com/flutter/samples/tree/main/add_to_app/android_view]({{site.repo.samples}}/tree/main/add_to_app/android_view)，演示了简单的 FlutterView 集成：在 RecycleView 卡片列表的部分 cell 中使用 FlutterView，如上方 gif 所示。

## General approach

## 通用做法

The general gist of the FlutterView-level integration is that you
must recreate the various interactions between your Activity, the
[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
and the
[`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)
present in the [`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
in your own application's code.
The connections made in the
[`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
are done automatically when using a
[`FlutterActivity`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html)
or a
[`FlutterFragment`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html),
but since the [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
in this case is being added to an `Activity` or `Fragment` in your application,
you must recreate the connections manually.
Otherwise, the [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
won't render anything or have other missing functionalities.

FlutterView 级别集成的要点是：你必须在自己的应用代码中重现 Activity、[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 与 [`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html) 之间在 [`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java) 中的各种交互。[`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java) 中的连接在使用 [`FlutterActivity`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html) 或 [`FlutterFragment`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html) 时会自动完成；但本场景下 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 被添加到你应用中的 `Activity` 或 `Fragment`，因此你必须手动重建这些连接。否则 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 将无法渲染任何内容，或缺少其他功能。

A sample
[`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt)
class shows one such possible implementation of an application-specific
connection between an `Activity`, a
[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
and a [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html).

示例 [`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt) 类展示了一种可能的实现：在 `Activity`、[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 与 [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html) 之间建立应用特定的连接。

### APIs to implement

### 需要实现的 API

The absolute minimum implementation needed for Flutter
to draw anything at all is to:

要让 Flutter 至少能绘制任何内容，最低限度的实现包括：

* Call [`attachToFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#attachToFlutterEngine-io.flutter.embedding.engine.FlutterEngine-)
  when the
  [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
  is added to a resumed `Activity`'s view hierarchy and is visible; and
* Call [`appIsResumed`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html#appIsResumed--)
  on the [`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)'s
  `lifecycleChannel` field when the `Activity` hosting the
  [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
  is visible.

  当 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 被添加到已 resumed 的 `Activity` 视图层级且可见时，调用 [`attachToFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#attachToFlutterEngine-io.flutter.embedding.engine.FlutterEngine-)；以及
* 当承载 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 的 `Activity` 可见时，在 [`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html) 的 `lifecycleChannel` 字段上调用 [`appIsResumed`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html#appIsResumed--)。

The reverse
[`detachFromFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#detachFromFlutterEngine--)
and other lifecycle methods on the
[`LifecycleChannel`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html)
class must also be called to not leak resources when the
`FlutterView` or `Activity` is no longer visible.

当 `FlutterView` 或 `Activity` 不再可见时，还必须调用反向的 [`detachFromFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#detachFromFlutterEngine--) 以及 [`LifecycleChannel`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html) 类上的其他生命周期方法，以避免资源泄漏。

In addition, see the remaining implementation in the
[`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt)
demo class or in the
[`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
to ensure a correct functioning of other features such as clipboards,
system UI overlay, plugins, and so on.

此外，请参阅 [`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt) 演示类或 [`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java) 中的其余实现，以确保剪贴板、系统 UI 叠加层、插件等其他功能正常工作。

## Content-sized views

## 按内容自适应尺寸的 View

Usually, a [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 
needs fixed dimensions either through its own dimensions or by matching a 
parent's dimensions.  This can be seen in the [sample project]({{site.repo.samples}}/tree/main/add_to_app/android_view/android_view).
However, it's now possible to allow `FlutterView` to size itself
based on its content. By using, `content_wrap` for either the height
or the width a `FlutterView` can size itself, as shown in the [content sized sample project]({{site.repo.samples}}/tree/main/add_to_app/android_view/content_sizing_android_view).

通常，[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 需要通过自身尺寸或匹配父级尺寸来固定大小，如 [示例项目]({{site.repo.samples}}/tree/main/add_to_app/android_view/android_view) 所示。不过，现在可以让 `FlutterView` 根据内容自行确定尺寸：对高度或宽度使用 `content_wrap`，`FlutterView` 即可自适应，如 [按内容定尺寸示例项目]({{site.repo.samples}}/tree/main/add_to_app/android_view/content_sizing_android_view) 所示。

* To _enable_ Content-sized view when deploying your app,
  add the following setting to your project's
  `AndroidManifest.xml` file under the `<application>` tag:
  
  在部署应用时 _启用_ 按内容自适应尺寸的 View，请在项目 `AndroidManifest.xml` 的 `<application>` 标签下添加以下设置：

```xml
<meta-data
  android:name="io.flutter.embedding.android.EnableContentSizing"
  android:value="true" />
```

### Restrictions

### 限制

Since content-sized Flutter views require your Flutter app to be able to size itself,
some widgets are not supported.

由于按内容定尺寸的 Flutter View 要求 Flutter 应用能够自行确定尺寸，部分 widget 不受支持。

* A widget with unbounded size, like a `ListView`.
* A widget that defers to its child for the size, like `LayoutBuilder`.

  尺寸无界的 widget，例如 `ListView`。
* 将尺寸委托给子 widget 的 widget，例如 `LayoutBuilder`。

In practice, this means that quite a few common widgets are not supported,
such as `ScaffoldBuilder`, `CupertinoTimerPicker`,
or any widget that internally relies on a `LayoutBuilder`.
When in doubt, you can use an `UnconstrainedBox` to test the usability of
a widget for a content-sized view, as shown in the following example:

实践中，这意味着不少常用 widget 不受支持，例如 `ScaffoldBuilder`、`CupertinoTimerPicker`，或任何内部依赖 `LayoutBuilder` 的 widget。如有疑问，可用 `UnconstrainedBox` 测试某 widget 是否适用于按内容定尺寸的 View，如下例所示：

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context)
  => MaterialApp(home: MyPage());
}

class MyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: UnconstrainedBox(
          // TODO: Edit this line to check if a widget
          // can cause problems with content-sized views.
          child: Text('This works!'),
          // child: Column(children: [Column(children: [Expanded(child: Text('This blows up!'))])]),
          // child: ListView(children: [Text('This blows up!')]),
        )
    );
  }
}
```
