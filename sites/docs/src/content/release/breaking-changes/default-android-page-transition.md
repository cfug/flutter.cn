---
# title: The default page transition on Android is now PredictiveBackPageTransitionsBuilder
title: Android 上的默认页面转场现为 PredictiveBackPageTransitionsBuilder
# description: >-
#   Android's default page transition has been updated to match the
#   platform and to support predictive back.
description: >-
  Android 的默认页面转场已更新，以匹配平台并支持预测性返回。
ai-translated: true
---

## Summary

## 概要

The default page transition on Android has been updated from
[`ZoomPageTransitionsBuilder`][] to [`PredictiveBackPageTransitionsBuilder`][].
When not using predictive back, this falls back to
[`FadeForwardsPageTransitionsBuilder`][].

Android 上的默认页面转场已从
[`ZoomPageTransitionsBuilder`][`ZoomPageTransitionsBuilder`]
更新为
[`PredictiveBackPageTransitionsBuilder`][`PredictiveBackPageTransitionsBuilder`]。
未使用预测性返回时，会回退到
[`FadeForwardsPageTransitionsBuilder`][`FadeForwardsPageTransitionsBuilder`]。

## Context

## 上下文

Android has been rolling out a feature called predictive back, where performing
a back gesture allows the user to peek at the previous route or app and possibly
cancel the navigation. Flutter added support for this with the [`PopScope`][]
widget followed by [`PredictiveBackPageTransitionsBuilder`][].

Android 正在推出名为预测性返回的功能。
执行返回手势时，用户可以预览上一个路由或应用，并可能取消这次导航。
Flutter 先通过 [`PopScope`][`PopScope`] widget 支持了这一功能，
随后又加入了
[`PredictiveBackPageTransitionsBuilder`][`PredictiveBackPageTransitionsBuilder`]。

In the meantime, Android also updated its default page transition. Flutter added
support for this with [`FadeForwardsPageTransitionsBuilder`][].

与此同时，Android 也更新了默认页面转场。
Flutter 通过
[`FadeForwardsPageTransitionsBuilder`][`FadeForwardsPageTransitionsBuilder`]
增加了相应支持。

## Description of change

## 改动说明

With this change, [`PredictiveBackPageTransitionsBuilder`][] has replaced
[`ZoomPageTransitionsBuilder`][] as the default page transition on Android.
During a normal page transition without a predictive back gesture, users
see the new [`FadeForwardsPageTransitionsBuilder`][] as the default page
transition. When using a predictive back gesture, the page animates along
with the gesture and allows canceling or committing to the back navigation.

此次改动之后，
[`PredictiveBackPageTransitionsBuilder`][`PredictiveBackPageTransitionsBuilder`]
取代 [`ZoomPageTransitionsBuilder`][`ZoomPageTransitionsBuilder`]，
成为 Android 上的默认页面转场。
在没有预测性返回手势的普通页面转场中，
用户看到的默认转场是新的
[`FadeForwardsPageTransitionsBuilder`][`FadeForwardsPageTransitionsBuilder`]。
使用预测性返回手势时，页面会随手势一起动画，
并可以取消或确认返回导航。

In this example, no page transition is explicitly given, so the
[default]({{site.repo.flutter}}/blob/e983e4bd81f29b17215057fa5c9f46f96cbaf183/packages/flutter/lib/src/material/page_transitions_theme.dart#L806-L813)
is set to [`PredictiveBackPageTransitionsBuilder`][] in the theme on Android.

在这个示例中没有显式指定页面转场，
因此 Android 上主题中的
[默认值]({{site.repo.flutter}}/blob/e983e4bd81f29b17215057fa5c9f46f96cbaf183/packages/flutter/lib/src/material/page_transitions_theme.dart#L806-L813)
会被设为
[`PredictiveBackPageTransitionsBuilder`][`PredictiveBackPageTransitionsBuilder`]。

```dart
MaterialApp(
  theme: ThemeData(
    brightness: Brightness.light,
  ),
  home: const PageOne(),
);
```

## Migration guide

## 迁移指南

If you want to keep your app's page transition on the old
[`ZoomPageTransitionsBuilder`][], you can simply set your page transition
explicitly in your app's theme. Keep in mind that you will not be able to
support predictive back route transitions.

如果希望应用的页面转场保持为旧的
[`ZoomPageTransitionsBuilder`][`ZoomPageTransitionsBuilder`]，
只需在应用主题中显式设置页面转场。
请注意，这样将无法支持预测性返回的路由转场。

Code before migration:

迁移之前的代码：

```dart
return MaterialApp(
  theme: ThemeData(
    brightness: Brightness.light,
    // pageTransitionsTheme is the default.
  ),
  home: const MyFirstScreen(),
);
```

Code after migration:

迁移之后的代码：

```dart
MaterialApp(
  theme: ThemeData(
    // pageTransitionsTheme is explicitly set to the old transition on Android.
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: {
        TargetPlatform.android: ZoomPageTransitionsBuilder(),
      },
    ),
  ),
  home: const MyFirstScreen(),
);
```

One side effect of changing the default transition is that the duration that it
takes to transition between pages has increased from 300ms to 450ms. This might
cause breakages in tests that depend on the previous transition duration.
Fortunately, it's possible to use [`TransitionDurationObserver`][] to keep tests
independent of whatever page transition is used.

更改默认转场的一个副作用是，页面之间的转场时长从 300ms 增加到 450ms。
依赖之前转场时长的测试可能会因此失败。
好在可以使用 [`TransitionDurationObserver`][`TransitionDurationObserver`]，
让测试不依赖具体使用了哪种页面转场。

Code before migration:

迁移之前的代码：

```dart
testWidgets('example', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through the whole transition, hardcoded to 300ms.
  await tester.tap(find.text('Next'));
  await tester.pump(const Duration(milliseconds: 300));

  expect(find.text('Page 1'), findsNothing);
  expect(find.text('Page 2'), findsOneWidget);
});
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('example', (WidgetTester tester) async {
  final TransitionDurationObserver observer = TransitionDurationObserver();

  await tester.pumpWidget(
    MaterialApp(
      navigatorObservers: <NavigatorObserver>[observer],
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through the whole transition independent of the duration.
  await tester.tap(find.text('Next'));
  await observer.pumpPastTransition(tester);

  expect(find.text('Page 1'), findsNothing);
  expect(find.text('Page 2'), findsOneWidget);
});
```

It's even possible to write tests that need to pump part of the way through a
page transition without depending on the exact duration.

即使测试需要把页面转场推进到中途，
也可以不依赖确切的时长。

Code before migration:

迁移之前的代码：

```dart
testWidgets('example', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through half of the transition with a hardcoded value.
  await tester.tap(find.text('Back'));
  await tester.pump(const Duration(milliseconds: 150));

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsOneWidget);
});
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('example', (WidgetTester tester) async {
  final TransitionDurationObserver observer = TransitionDurationObserver();

  await tester.pumpWidget(
    MaterialApp(
      navigatorObservers: <NavigatorObserver>[observer],
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through half of the transition independent of the duration.
  await tester.tap(find.text('Back'));
  await tester.pump(observer.transitionDuration ~/ 2);

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsOneWidget);
});
```

## Timeline

## 时间线

Landed in version: 3.37.0-0.0.pre<br>
合入版本：3.37.0-0.0.pre<br>
In stable release: 3.38.0

进入稳定版：3.38.0

## References

## 参考资料

API documentation:

API 文档：

* [`ZoomPageTransitionsBuilder`][]
* [`PredictiveBackPageTransitionsBuilder`][]
* [`FadeForwardsPageTransitionsBuilder`][]
* [`PopScope`][]
* [`TransitionDurationObserver`][]

Relevant issues:

相关 issue：

* [Android predictive back route transitions][]

  [Android 预测性返回的路由转场][Android predictive back route transitions]

Relevant PRs:

相关 PR：

* [Predictive back route transitions by default][]

  [默认使用预测性返回的路由转场][Predictive back route transitions by default]

[`FadeForwardsPageTransitionsBuilder`]: {{site.api}}/flutter/material/FadeForwardsPageTransitionsBuilder-class.html
[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[`PredictiveBackPageTransitionsBuilder`]: {{site.api}}/flutter/material/PredictiveBackPageTransitionsBuilder-class.html
[`TransitionDurationObserver`]: {{site.api}}/flutter/flutter_test/TransitionDurationObserver-class.html
[`ZoomPageTransitionsBuilder`]: {{site.api}}/flutter/material/ZoomPageTransitionsBuilder-class.html

[Android predictive back route transitions]: {{site.repo.flutter}}/issues/131961
[Predictive back route transitions by default]: {{site.repo.flutter}}/pull/165832
