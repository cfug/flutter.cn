---
# title: Deprecated API removed after v3.19
title: v3.19 之后移除的已弃用 API
# description: >-
#   After reaching end of life, the following deprecated APIs
#   were removed from Flutter.
description: 下列已弃用 API 在到达生命周期终点后，已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
3.19 stable release have been removed.


根据 Flutter 的 [弃用政策][Deprecation Policy]，
在 3.19 稳定版之后到达生命周期终点的已弃用 API
已被移除。

All affected APIs have been compiled into this
primary source to aid in migration.
To further aid your migration, check out this
[quick reference sheet][].

所有受影响的 API 都汇总在这篇主要文档中，方便你迁移。
如需进一步帮助，请查看这份 [快速参考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-19

## Changes

## 变更

This section lists the deprecations by the package and affected class.

本节按 package 与受影响的类列出弃用项。

### `TextTheme`

### `TextTheme` 类

Package: flutter
Supported by Flutter Fix: yes

包：flutter
Flutter Fix 支持：是

Several `TextStyle` properties of `TextTheme` were deprecated in v3.1 to support new
stylings from the Material Design specification. They
are listed in the following table alongside the appropriate replacement in the
new API.

`TextTheme` 的若干 `TextStyle` 属性已在 v3.1 中弃用，
以支持 Material Design 规范中的新样式。
下表列出了这些属性，以及新 API 中对应的替换项。

| <t>Deprecation</t><t>弃用项</t> | <t>New API</t><t>新 API</t> |
|---|---|
| headline1	| displayLarge |
| headline1	| displayLarge |
| headline2	| displayMedium |
| headline2	| displayMedium |
| headline3	| displaySmall |
| headline3	| displaySmall |
| headline4	| headlineMedium |
| headline4	| headlineMedium |
| headline5	| headlineSmall |
| headline5	| headlineSmall |
| headline6	| titleLarge |
| headline6	| titleLarge |
| subtitle1	| titleMedium |
| subtitle1	| titleMedium |
| subtitle2	| titleSmall |
| subtitle2	| titleSmall |
| bodyText1	| bodyLarge |
| bodyText1	| bodyLarge |
| bodyText2	| bodyMedium |
| bodyText2	| bodyMedium |
| caption	  | bodySmall |
| caption	  | bodySmall |
| button	  | labelLarge |
| button	  | labelLarge |
| overline	| labelSmall |
| overline	| labelSmall |

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
// TextTheme
// Base constructor
TextTheme(
  headline1: headline1Style,
  headline2: headline2Style,
  headline3: headline3Style,
  headline4: headline4Style,
  headline5: headline5Style,
  headline6: headline6Style,
  subtitle1: subtitle1Style,
  subtitle2: subtitle2Style,
  bodyText1: bodyText1Style,
  bodyText2: bodyText2Style,
  caption: captionStyle,
  button: buttonStyle,
  overline: overlineStyle,
);

// copyWith
TextTheme.copyWith(
  headline1: headline1Style,
  headline2: headline2Style,
  headline3: headline3Style,
  headline4: headline4Style,
  headline5: headline5Style,
  headline6: headline6Style,
  subtitle1: subtitle1Style,
  subtitle2: subtitle2Style,
  bodyText1: bodyText1Style,
  bodyText2: bodyText2Style,
  caption: captionStyle,
  button: buttonStyle,
  overline: overlineStyle,
);

// Getters
TextStyle style;
style = textTheme.headline1,
style = textTheme.headline2,
style = textTheme.headline3,
style = textTheme.headline4,
style = textTheme.headline5,
style = textTheme.headline6,
style = textTheme.subtitle1,
style = textTheme.subtitle2,
style = textTheme.bodyText1,
style = textTheme.bodyText2,
style = textTheme.caption,
style = textTheme.button,
style = textTheme.overline,
```

Code after migration:

迁移后的代码：

```dart
// TextTheme
// Base constructor
TextTheme(
  displayLarge: headline1Style,
  displayMedium: headline2Style,
  displaySmall: headline3Style,
  headlineMedium: headline4Style,
  headlineSmall: headline5Style,
  titleLarge: headline6Style,
  titleMedium: subtitle1Style,
  titleSmall: subtitle2Style,
  bodyLarge: bodyText1Style,
  bodyMedium: bodyText2Style,
  bodySmall: captionStyle,
  labelLarge: buttonStyle,
  labelSmall: overlineStyle,
);

TextTheme.copyWith(
  displayLarge: headline1Style,
  displayMedium: headline2Style,
  displaySmall: headline3Style,
  headlineMedium: headline4Style,
  headlineSmall: headline5Style,
  titleLarge: headline6Style,
  titleMedium: subtitle1Style,
  titleSmall: subtitle2Style,
  bodyLarge: bodyText1Style,
  bodyMedium: bodyText2Style,
  bodySmall: captionStyle,
  labelLarge: buttonStyle,
  labelSmall: overlineStyle,
);

TextStyle style;
style = textTheme.displayLarge;
style = textTheme.displayMedium;
style = textTheme.displaySmall;
style = textTheme.headlineMedium;
style = textTheme.headlineSmall;
style = textTheme.titleLarge;
style = textTheme.titleMedium;
style = textTheme.titleSmall;
style = textTheme.bodyLarge;
style = textTheme.bodyMedium;
style = textTheme.bodySmall;
style = textTheme.labelLarge;
style = textTheme.labelSmall;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`TextTheme`][]

Relevant PRs:

相关 PR：

* Deprecated in [#109817][]

  在 [#109817][] 中弃用

* Removed in [#139255][]

  在 [#139255][] 中移除

[`TextTheme`]: {{site.api}}/flutter/material/TextTheme-class.html

[#109817]: {{site.repo.flutter}}/pull/109817
[#139255]: {{site.repo.flutter}}/pull/139255

---

### `ThemeData`

### `ThemeData` 类

Package: flutter
Supported by Flutter Fix: yes

包：flutter
Flutter Fix 支持：是

Several `Color` properties of `ThemeData` were deprecated in v3.3 to support new stylings
from the Material Design specification. These colors were `errorColor`, `backgroundColor`,
 `bottomAppBarColor`, and `toggleableActiveColor`. The first two are replaced by
 properties of the `ThemeData.colorScheme`, while `bottomAppBarColor` is replaced by the
 color of the component theme, `BottomAppBarTheme`. The `toggleableActiveColor` was no
 longer used by the framework and was removed.

`ThemeData` 的若干 `Color` 属性已在 v3.3 中弃用，
以支持 Material Design 规范中的新样式。
这些颜色包括 `errorColor`、`backgroundColor`、
`bottomAppBarColor` 和 `toggleableActiveColor`。
前两项由 `ThemeData.colorScheme` 的属性取代，
`bottomAppBarColor` 由组件主题 `BottomAppBarTheme` 的颜色取代。
框架已不再使用 `toggleableActiveColor`，因此将其移除。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
var myTheme = ThemeData(
  //...
  errorColor: Colors.red,
  backgroundColor: Colors.blue,
  bottomAppBarColor: Colors.purple,
  toggleableActiveColor: Colors.orange,
  //...
);
var errorColor = myTheme.errorColor;
var backgroundColor = myTheme.backgroundColor;
var bottomAppBarColor = myTheme.bottomAppBarColor;
var toggleableActiveColor = myTheme.toggleableActiveColor;
```

Code after migration:

迁移后的代码：

```dart
var myTheme = ThemeData(
  //...
  colorScheme: ColorScheme(
    /// ...
    error: Colors.red,
    background: Colors.blue,
  ),
  bottomAppBarTheme: BottomAppBarTheme(
    color: Colors.purple,
  ),
  //...
);
var errorColor = myTheme.colorScheme.error;
var backgroundColor = myTheme.colorScheme.background;
var bottomAppBarColor = myTheme.bottomAppBarTheme.color;
var toggleableActiveColor = Colors.orange;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`ThemeData`][]
* [`ColorScheme`][]
* [`BottomAppBarTheme`][]

Relevant PRs:

相关 PR：

* Deprecated in [#110162][], [#111080][], and [#97972][]

  在 [#110162][]、[#111080][] 和 [#97972][] 中弃用

* Removed in [#144178][], [#144080][], [#144079][], and [#144078][]

  在 [#144178][]、[#144080][]、[#144079][] 和 [#144078][] 中移除

[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html
[`BottomAppBarTheme`]: {{site.api}}/flutter/material/BottomAppBarTheme-class.html

[#110162]: {{site.repo.flutter}}/pull/110162
[#111080]: {{site.repo.flutter}}/pull/111080
[#97972]: {{site.repo.flutter}}/pull/97972
[#144178]: {{site.repo.flutter}}/pull/144178
[#144080]: {{site.repo.flutter}}/pull/144080
[#144079]: {{site.repo.flutter}}/pull/144079
[#144078]: {{site.repo.flutter}}/pull/144078

---

### `CupertinoContextMenu.previewBuilder`

### `CupertinoContextMenu.previewBuilder` 属性

Package: flutter
Supported by Flutter Fix: yes

包：flutter
Flutter Fix 支持：是

The `previewBuilder` was replaced by the `builder` of `CupertinoContextMenu` after
v3.4. By adding `builder`, the entirety of the animation executed by the context
menu is covered, the second half of which was performed by `previewBuilder`, and
delineated by `CupertinoContextMenu.animationOpensAt`.

v3.4 之后，`CupertinoContextMenu` 的 `builder` 取代了 `previewBuilder`。
加入 `builder` 后，上下文菜单执行的整段动画都会被覆盖。
后半段动画原先由 `previewBuilder` 完成，
并以 `CupertinoContextMenu.animationOpensAt` 为分界。


**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
CupertinoContextMenu(
  previewBuilder: (BuildContext context, Animation<double> animation, Widget child) {
    return FittedBox(
      fit: BoxFit.cover,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(64.0 * animation.value),
        child: Image.asset('assets/photo.jpg'),
      ),
    );
  },
  actions: <Widget>[
    CupertinoContextMenuAction(
      child: const Text('Action one'),
      onPressed: () {},
    ),
  ],
  child: FittedBox(
    fit: BoxFit.cover,
    child: Image.asset('assets/photo.jpg'),
  ),
);
```

Code after migration:

迁移后的代码：

```dart
CupertinoContextMenu(
  actions: <Widget>[
    CupertinoContextMenuAction(
      child: const Text('Action one'),
      onPressed: () {},
    ),
  ],
  builder: (BuildContext context, Animation<double> animation) {
    final Animation<BorderRadius?> borderRadiusAnimation = BorderRadiusTween(
      begin: BorderRadius.circular(0.0),
      end: BorderRadius.circular(CupertinoContextMenu.kOpenBorderRadius),
    ).animate(
      CurvedAnimation(
        parent: animation,
        curve: Interval(
          CupertinoContextMenu.animationOpensAt,
          1.0,
        ),
      ),
    );

    final Animation<Decoration> boxDecorationAnimation = DecorationTween(
      begin: const BoxDecoration(
        color: Color(0xFFFFFFFF),
        boxShadow: <BoxShadow>[],
      ),
      end: BoxDecoration(
        color: Color(0xFFFFFFFF),
        boxShadow: CupertinoContextMenu.kEndBoxShadow,
      ),
    ).animate(
      CurvedAnimation(
        parent: animation,
        curve: Interval(
          0.0,
          CupertinoContextMenu.animationOpensAt,
        )
      )
    );

    return Container(
      decoration: animation.value < CupertinoContextMenu.animationOpensAt
        ? boxDecorationAnimation.value
        : null,
      child: FittedBox(
        fit: BoxFit.cover,
        child: ClipRRect(
          borderRadius: borderRadiusAnimation.value ?? BorderRadius.circular(0.0),
          child: SizedBox(
            height: 150,
            width: 150,
            child: Image.asset('assets/photo.jpg'),
          ),
        ),
      )
    );
   }
 )
```

**References**

**参考资料**

API documentation:

API 文档：

* [`CupertinoContextMenu`][]

Relevant PRs:

相关 PR：

* Deprecated in [#110616][]

  在 [#110616][] 中弃用

* Removed in [#143990][]

  在 [#143990][] 中移除

[`CupertinoContextMenu`]: {{site.api}}/flutter/cupertino/CupertinoContextMenu-class.html

[#110616]: {{site.repo.flutter}}/pull/110616
[#143990]: {{site.repo.flutter}}/pull/143990

---

### `Scrollbar.showTrackOnHover`

### `Scrollbar.showTrackOnHover` 属性

Package: flutter
Supported by Flutter Fix: yes

包：flutter
Flutter Fix 支持：是

The `showTrackOnHover` property of `Scrollbar`, and its associated component theme,
`ScrollbarThemeData.showTrackOnHover`, were replaced by the stateful property
`ScrollbarThemeData.trackVisibility` after v3.4. By utilizing `trackVisibility`,
all permutations of state can factor into revealing the scrollbar track, not
just hover.

v3.4 之后，`Scrollbar` 的 `showTrackOnHover` 属性
及其组件主题 `ScrollbarThemeData.showTrackOnHover`
已由有状态属性 `ScrollbarThemeData.trackVisibility` 取代。
借助 `trackVisibility`，各种状态组合都可以决定是否显示滚动条轨道，
而不仅是悬停。


**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
Scrollbar(
  showTrackOnHover: true,
  child: //...
);
ScrollbarThemeData(
  showTrackOnHover: true,
);
```

Code after migration:

迁移后的代码：

```dart
Scrollbar(
  child: //...
);
ScrollbarThemeData(
  // This will always show the track for any state.
  trackVisibility: MaterialStateProperty<bool>.all(true),
);
// Or
ScrollbarThemeData(
  // Only show on hover.
  trackVisibility: (Set<MaterialState> states) => states.contains(MaterialState.hovered),
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`Scrollbar`][]
* [`ScrollbarThemeData`][]
* [`MaterialState`][]
* [`MaterialStateProperty`][]

Relevant PRs:

相关 PR：

* Deprecated in [#111706][]

  在 [#111706][] 中弃用

* Removed in [#144180][]

  在 [#144180][] 中移除

[`Scrollbar`]: {{site.api}}/flutter/material/Scrollbar-class.html
[`ScrollbarThemeData`]: {{site.api}}/flutter/material/ScrollbarThemeData-class.html
[`MaterialState`]: {{site.api}}/flutter/material/MaterialState-class.html
[`MaterialStateProperty`]: {{site.api}}/flutter/material/MaterialStateProperty-class.html

[#111706]: {{site.repo.flutter}}/pull/111706
[#144180]: {{site.repo.flutter}}/pull/144180

---

### `KeepAliveHandle.release` method

### `KeepAliveHandle.release` 方法

Package: flutter
Supported by Flutter Fix: no

包：flutter
Flutter Fix 支持：否

The `release` method of `KeepAliveHandle` was removed and replaced by calling
`dispose` after v3.3. This change was made because `release` was found to often
be called without then calling `dispose`, leading to memory leaks. The `dispose`
method executes the same functionality as `release` did now.

v3.3 之后，`KeepAliveHandle` 的 `release` 方法已移除，改为调用 `dispose`。
之所以这样改，是因为人们经常调用 `release` 后没有接着调用 `dispose`，
从而导致内存泄漏。
现在 `dispose` 方法会执行原先 `release` 的功能。


**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
KeepAliveHandle handle = KeepAliveHandle();
handle.release();
handle.dispose();
```

Code after migration:

迁移后的代码：

```dart
KeepAliveHandle handle = KeepAliveHandle();
handle.dispose();
```

**References**

**参考资料**

API documentation:

API 文档：

* [`KeepAliveHandle`][]

Relevant PRs:

相关 PR：

* Deprecated in [#108384][]

  在 [#108384][] 中弃用

* Removed in [#143961][]

  在 [#143961][] 中移除

[`KeepAliveHandle`]: {{site.api}}/flutter/widgets/KeepAliveHandle-class.html

[#108384]: {{site.repo.flutter}}/pull/108384
[#143961]: {{site.repo.flutter}}/pull/143961

---

### `InteractiveViewer.alignPanAxis`

### `InteractiveViewer.alignPanAxis` 属性

Package: flutter
Supported by Flutter Fix: yes

包：flutter
Flutter Fix 支持：是

The `alignPanAxis` property of `InteractiveViewer` was removed and replaced with
`panAxis` after v3.3. This change was made to enable more modes of panning in
`InteractiveViewer`.

v3.3 之后，`InteractiveViewer` 的 `alignPanAxis` 属性已移除，
并由 `panAxis` 取代。
这样改是为了让 `InteractiveViewer` 支持更多平移模式。


**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
InteractiveViewer(
  alignPanAxis: true,
);
```

Code after migration:

迁移后的代码：

```dart
InteractiveViewer(
  panAxis: PanAxis.aligned,
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`InteractiveViewer`][]
* [`PanAxis`][]

Relevant PRs:

相关 PR：

* Deprecated in [#109014][]

  在 [#109014][] 中弃用

* Removed in [#142500][]

  在 [#142500][] 中移除

[`InteractiveViewer`]: {{site.api}}/flutter/widgets/InteractiveViewer-class.html
[`PanAxis`]: {{site.api}}/flutter/widgets/PanAxis.html

[#109014]: {{site.repo.flutter}}/pull/109014
[#142500]: {{site.repo.flutter}}/pull/142500

---

### `MediaQuery.boldTextOverride`

### `MediaQuery.boldTextOverride` 方法

Package: flutter
Supported by Flutter Fix: yes

包：flutter
Flutter Fix 支持：是

The `boldTextOverride` method of `MediaQuery` was removed and replaced with
`boldTextOf` after v3.5. This change was made as part of larger refactor of
`MediaQuery`, most notably reducing the number of rebuilds that would be
triggered by widgets that depend on it.

v3.5 之后，`MediaQuery` 的 `boldTextOverride` 方法已移除，
并由 `boldTextOf` 取代。
这项改动是更大范围 `MediaQuery` 重构的一部分，
最主要的效果是减少依赖它的 widget 触发的重建次数。


**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
MediaQuery.boldTextOverride(context);
```

Code after migration:

迁移后的代码：

```dart
MediaQuery.boldTextOf(context)
```

**References**

**参考资料**

API documentation:

API 文档：

* [`MediaQuery`][]

Relevant PRs:

相关 PR：

* Deprecated in [#114459][]

  在 [#114459][] 中弃用

* Removed in [#143960][]

  在 [#143960][] 中移除

[`MediaQuery`]: {{site.api}}/flutter/widgets/MediaQuery-class.html

[#114459]: {{site.repo.flutter}}/pull/114459
[#143960]: {{site.repo.flutter}}/pull/143960

---

### Renamed builder typedefs for `AnimatedList`

### `AnimatedList` 的 builder typedef 已重命名

Package: flutter
Supported by Flutter Fix: no

包：flutter
Flutter Fix 支持：否

With the addition of `AnimatedGrid`, `AnimatedList` was refactored to share a common base
class. The previously named `AnimatedListItemBuilder` and `AnimatedListRemovedItemBuilder`
were renamed to better reflect the classes they could be used with after v3.5.
Rename any references to `AnimatedItemBuilder` and `AnimatedRemovedItemBuilder`.

随着 `AnimatedGrid` 的加入，`AnimatedList` 被重构为与之共享同一个基类。
v3.5 之后，原先的 `AnimatedListItemBuilder` 和
`AnimatedListRemovedItemBuilder` 已重命名，
以便更好地体现它们可以配合哪些类使用。
请把相关引用重命名为 `AnimatedItemBuilder` 和 `AnimatedRemovedItemBuilder`。

**References**

**参考资料**

API documentation:

API 文档：

* [`AnimatedGrid`][]
* [`AnimatedList`][]
* [`AnimatedItemBuilder`][]
* [`AnimatedRemovedItemBuilder`][]

Relevant PRs:

相关 PR：

* Deprecated in [#113793][]

  在 [#113793][] 中弃用

* Removed in [#143974][]

  在 [#143974][] 中移除

[`AnimatedGrid`]: {{site.api}}/flutter/widgets/AnimatedGrid-class.html
[`AnimatedList`]: {{site.api}}/flutter/widgets/AnimatedList-class.html
[`AnimatedItemBuilder`]: {{site.api}}/flutter/widgets/AnimatedItemBuilder.html
[`AnimatedRemovedItemBuilder`]: {{site.api}}/flutter/widgets/AnimatedRemovedItemBuilder.html

[#113793]: {{site.repo.flutter}}/pull/113793
[#143974]: {{site.repo.flutter}}/pull/143974

---

### `FlutterDriver.enableAccessibility`

### `FlutterDriver.enableAccessibility` 方法

Package: flutter_driver
Supported by Flutter Fix: yes

包：flutter_driver
Flutter Fix 支持：是

The `enableAccessibility` method of `flutterDriver` was deprecated in v2.3. It
was removed and replaced with `setSemantics`. This change made is possible to
enable or disable accessibility, rather than only enable it.

`flutterDriver` 的 `enableAccessibility` 方法已在 v2.3 中弃用。
现已移除，并由 `setSemantics` 取代。
这样不仅可以启用无障碍功能，也可以关闭它。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
FlutterDriver driver = FlutterDriver.connectedTo(
  // ...
);
driver.enableAccessibility();
```

Code after migration:

迁移后的代码：

```dart
FlutterDriver driver = FlutterDriver.connectedTo(
  // ...
);
driver.setSemantics(true);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`FlutterDriver`][]

Relevant PRs:

相关 PR：

* Deprecated in [#82939][]

  在 [#82939][] 中弃用

* Removed in [#143979][]

  在 [#143979][] 中移除

[`FlutterDriver`]: {{site.api}}/flutter/flutter_driver/FlutterDriver-class.html

[#82939]: {{site.repo.flutter}}/pull/82939
[#143979]: {{site.repo.flutter}}/pull/143979

---

### `TimelineSummary.writeSummaryToFile`

### `TimelineSummary.writeSummaryToFile` 方法

Package: flutter_driver
Supported by Flutter Fix: yes

包：flutter_driver
Flutter Fix 支持：是

The `writeSummaryToFile` method of `TimelineSummary` was deprecated in v2.1. It
was removed and replaced with `writeTimelineToFile`.

`TimelineSummary` 的 `writeSummaryToFile` 方法已在 v2.1 中弃用。
现已移除，并由 `writeTimelineToFile` 取代。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
TimelineSummary summary = TimelineSummary.summarize(
  myTimeline,
);
summary.writeSummaryToFile(
  traceName,
  pretty: true,
);
```

Code after migration:

迁移后的代码：

```dart
TimelineSummary summary = TimelineSummary.summarize(
  myTimeline,
);
summary.writeTimelineToFile(
  traceName,
  pretty: true,
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`TimelineSummary`][]

Relevant PRs:

相关 PR：

* Deprecated in [#79310][]

  在 [#79310][] 中弃用

* Removed in [#143983][]

  在 [#143983][] 中移除

[`TimelineSummary`]: {{site.api}}/flutter/flutter_driver/TimelineSummary-class.html

[#79310]: {{site.repo.flutter}}/pull/79310
[#143983]: {{site.repo.flutter}}/pull/143983

### `Android Platform Views on API 22 and below `

### API 22 及更低版本上的 Android 平台视图

Supported by Flutter Fix: no

Flutter Fix 支持：否

As of Flutter 3.0 platform views require api 23 or higher. In Flutter 3.19 we now throw UnsupportedOperationException
when using platform views on android devices running api level 22 and below.

自 Flutter 3.0 起，平台视图要求 API 23 或更高版本。
在 Flutter 3.19 中，若在运行 API 级别 22 及更低版本的
Android 设备上使用平台视图，现在会抛出 `UnsupportedOperationException`。

**Migration guide**

**迁移指南**

Set minimum api level to 23 (or higher) or check the android api level before displaying a platform view.

将最低 API 级别设为 23（或更高），
或者在显示平台视图之前检查 Android API 级别。

---

The [previously announced][] deprecations for context menus, relating to `ToolbarOptions`
as well as parts of `TextSelectionController` and `SelectableRegionState` were not
removed this cycle, to allow more time for migration.
Expect these deprecations to be removed in the next cycle, which will
be announced again when the time comes.

本周期没有移除 [此前公布][previously announced] 的上下文菜单相关弃用项。
这些弃用涉及 `ToolbarOptions`，
以及 `TextSelectionController` 和 `SelectableRegionState` 的部分 API，
以便留出更多迁移时间。
这些弃用项预计会在下一个周期移除，到时会再次公布。

[previously announced]: https://groups.google.com/g/flutter-announce/c/8XjXpUKlnf8

---

## Timeline

## 时间线

In stable release: 3.22.0

进入稳定版：3.22.0
