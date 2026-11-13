---
# title: New Buttons and Button themes
title: 新的按钮与按钮主题
# description: The basic material button classes have been replaced.
description: 基础 Material 按钮类已被替换。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A new set of basic material button widgets and themes have been added
to Flutter. The original classes have been deprecated and will
eventually be removed. The overall goal is to make buttons more
flexible, and easier to configure via constructor parameters or
themes.

Flutter 新增了一组基础 Material 按钮 widget 和主题。
原来的类已弃用，最终会被移除。
总体目标是让按钮更灵活，
也更容易通过构造函数参数或主题来配置。

The `FlatButton`, `RaisedButton` and `OutlineButton` widgets have been
replaced by `TextButton`, `ElevatedButton`, and `OutlinedButton`
respectively. Each new button class has its own theme:
`TextButtonTheme`, `ElevatedButtonTheme`, and
`OutlinedButtonTheme`. The original `ButtonTheme` class is no longer
used. The appearance of buttons is specified by a `ButtonStyle`
object, instead of a large set of widget parameters and
properties. This is roughly comparable to the way that the appearance
of text is defined with a `TextStyle` object. The new button themes
are also configured with a `ButtonStyle` object. A `ButtonStyle` is
itself just a collection of visual properties. Many of these
properties are defined with `MaterialStateProperty`, which means that
their value can depend on the button's state.

`FlatButton`、`RaisedButton` 和 `OutlineButton` widget
已分别被 `TextButton`、`ElevatedButton` 和 `OutlinedButton` 取代。
每个新按钮类都有自己的主题：
`TextButtonTheme`、`ElevatedButtonTheme` 和 `OutlinedButtonTheme`。
原来的 `ButtonTheme` 类不再使用。
按钮的外观由一个 `ButtonStyle` 对象指定，
不再靠一大组 widget 参数和属性。
这大致相当于用 `TextStyle` 对象定义文本外观。
新的按钮主题同样用 `ButtonStyle` 对象配置。
`ButtonStyle` 本身只是一组视觉属性。
其中许多属性用 `MaterialStateProperty` 定义，
因此它们的值可以随按钮状态变化。


## Context

## 上下文

Rather than try and evolve the existing button classes and their theme
in-place, we have introduced new replacement button widgets and
themes. In addition to freeing us from the backwards compatibility
labyrinth that evolving the existing classes in-place would entail,
the new names sync Flutter back up with the Material Design spec,
which uses the new names for the button components.

我们没有就地演进现有的按钮类及其主题，
而是引入了新的替代按钮 widget 和主题。
这样一来，既不必陷入就地演进旧类所带来的向后兼容迷宫，
新名称也让 Flutter 重新与 Material Design 规范对齐。
该规范对按钮组件使用的就是这些新名称。

| <t>Old Widget</t><t>旧 widget</t> | <t>Old Theme</t><t>旧主题</t> | <t>New Widget</t><t>新 widget</t> | <t>New Theme</t><t>新主题</t> |
|-----------------|---------------|------------------|-----------------------|
| `FlatButton`    | `ButtonTheme` | `TextButton`     | `TextButtonTheme`     |
| `RaisedButton`  | `ButtonTheme` | `ElevatedButton` | `ElevatedButtonTheme` |
| `OutlineButton` | `ButtonTheme` | `OutlinedButton` | `OutlinedButtonTheme` |

{:.table .table-striped .nowrap}

The new themes follow the "normalized" pattern that Flutter adopted
for new Material widgets about a year ago. Theme properties and widget
constructor parameters are null by default. Non-null theme properties
and widget parameters specify an override of the component's default
value. Implementing and documenting default values is the sole
responsibility of the button component widgets. The defaults
themselves are based primarily on the overall Theme's colorScheme and
textTheme.

新主题遵循 Flutter 大约一年前为新 Material widget 采用的「规范化」模式。
主题属性和 widget 构造函数参数默认为 null。
非 null 的主题属性和 widget 参数表示覆盖组件的默认值。
实现并文档化默认值完全由按钮组件 widget 负责。
这些默认值主要基于整体 Theme 的 colorScheme 和 textTheme。

Visually, the new buttons look a little different, because they match
the current Material Design spec and because their colors are
configured in terms of the overall Theme's ColorScheme. There are
other small differences in padding, rounded corner radii, and the
hover/focus/pressed feedback.

从视觉上看，新按钮略有不同，
因为它们符合当前的 Material Design 规范，
而且颜色按整体 Theme 的 ColorScheme 来配置。
内边距、圆角半径以及悬停、聚焦、按下时的反馈也有一些小差异。

Many applications will be able to just substitute the new class names
for the old ones. Apps with golden image tests or with buttons whose
appearance has been configured with constructor parameters or with the
original `ButtonTheme` may need to consult the migration guide and the
introductory material that follows.

许多应用只需把旧类名换成新类名。
带有黄金图像测试的应用，
或者用构造函数参数或原来的 `ButtonTheme` 配置过按钮外观的应用，
可能需要查阅迁移指南以及后面的介绍材料。

## API Change: ButtonStyle instead of individual style properties

## API 变更：用 ButtonStyle 替代单独的样式属性

Except for simple use cases, the APIs of the new button classes are
not compatible with the old classes. The visual attributes of the new
buttons and themes are configured with a single `ButtonStyle` object,
similar to how a `TextField` or a `Text` widget can be configured with a
`TextStyle` object. Most of the `ButtonStyle` properties are defined with
`MaterialStateProperty`, so that a single property can represent
different values depending on the button's pressed/focused/hovered/etc
state.

除了简单用法，新按钮类的 API 与旧类不兼容。
新按钮和主题的视觉属性由单个 `ButtonStyle` 对象配置，
类似于用 `TextStyle` 对象配置 `TextField` 或 `Text` widget。
`ButtonStyle` 的大多数属性用 `MaterialStateProperty` 定义，
因此单个属性可以根据按钮的按下、聚焦、悬停等状态表示不同的值。

A button's `ButtonStyle` doesn't define the button's visual properties,
it defines overrides of the buttons default visual properties,
where the default properties are computed by the button widget
itself. For example, to override a `TextButton`'s default foreground
(text/icon) color for all states, one could write:

按钮的 `ButtonStyle` 并不定义按钮的视觉属性，
而是定义对按钮默认视觉属性的覆盖。
默认属性由按钮 widget 自己计算。
例如，要在所有状态下覆盖 `TextButton` 的默认前景（文本或图标）颜色，
可以这样写：

```dart
TextButton(
  style: ButtonStyle(
    foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
  ),
  onPressed: () { },
  child: Text('TextButton'),
)
```

This kind of override is common; however, in many cases what's also
needed are overrides for the overlay colors that the text button uses
to indicate its hovered/focus/pressed state.  This can be done by
adding the `overlayColor` property to the `ButtonStyle`.

这种覆盖很常见；不过很多情况下，
还需要覆盖文本按钮用来表示悬停、聚焦、按下状态的叠层颜色。
可以把 `overlayColor` 属性加到 `ButtonStyle` 上。

```dart
TextButton(
  style: ButtonStyle(
    foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
    overlayColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.hovered))
          return Colors.blue.withOpacity(0.04);
        if (states.contains(MaterialState.focused) ||
            states.contains(MaterialState.pressed))
          return Colors.blue.withOpacity(0.12);
        return null; // Defer to the widget's default.
      },
    ),
  ),
  onPressed: () { },
  child: Text('TextButton')
)
```

A color `MaterialStateProperty` only needs to return a value for the
colors whose default should be overridden. If it returns null, the
widget's default will be used instead. For example, to just override
the text button's focus overlay color:

颜色型 `MaterialStateProperty` 只需要为应当覆盖默认值的那些颜色返回值。
如果返回 null，就会改用 widget 的默认值。
例如，只覆盖文本按钮的聚焦叠层颜色：

```dart
TextButton(
  style: ButtonStyle(
    overlayColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.focused))
          return Colors.red;
        return null; // Defer to the widget's default.
      }
    ),
  ),
  onPressed: () { },
  child: Text('TextButton'),
)
```

### The `styleFrom()` ButtonStyle utility methods

### `styleFrom()`：ButtonStyle 工具方法

The Material Design spec defines buttons' foreground and overlay colors in
terms of the color scheme's primary color. The primary color is
rendered at different opacities, depending on the button's state. To
simplify creating a button style that includes all of the properties
that depend on color scheme colors, each button class includes a
static styleFrom() method which constructs a `ButtonStyle` from a simple
set of values, including the `ColorScheme` colors it depends on.

Material Design 规范用配色方案的 primary 颜色来定义按钮的前景色和叠层颜色。
primary 颜色会按按钮状态以不同的不透明度绘制。
为了简化创建依赖配色方案颜色的全部属性的按钮样式，
每个按钮类都包含一个静态的 styleFrom() 方法。
它根据一组简单的值构造 `ButtonStyle`，其中包括所依赖的 `ColorScheme` 颜色。

This example creates a button that overrides its foreground color, as
well as its overlay color, using the specified primary color and the
opacities from the Material Design spec.

这个示例用指定的 primary 颜色和 Material Design 规范中的不透明度，
创建了一个覆盖前景色和叠层颜色的按钮。

```dart
TextButton(
  style: TextButton.styleFrom(
    foregroundColor: Colors.blue,
  ),
  onPressed: () { },
  child: Text('TextButton'),
)
```

The `TextButton` documentation indicates that the foreground color when
the button is disabled is based on the color scheme's `disabledForegroundColor`
color. To override that as well, using styleFrom():

`TextButton` 的文档指出，按钮禁用时的前景色
基于配色方案的 `disabledForegroundColor` 颜色。
若要一并覆盖它，可以使用 styleFrom()：

```dart
TextButton(
  style: TextButton.styleFrom(
    foregroundColor: Colors.blue,
    disabledForegroundColor: Colors.red,
  ),
  onPressed: null,
  child: Text('TextButton'),
)
```

Using the `styleFrom()` method is the preferred way to create a
`ButtonStyle` if you're trying to create a Material Design
variation. The most flexible approach is defining a `ButtonStyle`
directly, with `MaterialStateProperty` values for the states whose
appearance you want to override.

如果要做 Material Design 的变体，
优先使用 `styleFrom()` 方法来创建 `ButtonStyle`。
最灵活的做法是直接定义 `ButtonStyle`，
并为想要覆盖外观的状态提供 `MaterialStateProperty` 值。

## ButtonStyle defaults

## ButtonStyle 的默认值

Widgets like the new button classes _compute_ their default values
based on the overall theme's `colorScheme` and `textTheme` as well as
button's current state. In a few cases they also consider if the
overall theme's color scheme is light or dark.  Each button has a
protected method that computes its default style as needed. Although
apps won't call this method directly, its API doc explains what all
of the defaults are.  When a button or button theme specifies
`ButtonStyle`, only the button style's non-null properties override the
computed defaults. The button's `style` parameter overrides non-null
properties specified by the corresponding button theme. For example if
`foregroundColor` property of a `TextButton`'s style is non-null, it
overrides the same property for the `TextButtonTheme`'s style.

新按钮类这类 widget 会根据整体主题的 `colorScheme`、`textTheme`
以及按钮的当前状态 **计算** 默认值。
少数情况下还会考虑整体主题的配色方案是浅色还是深色。
每个按钮都有一个受保护的方法，按需计算默认样式。
应用不会直接调用这个方法，但它的 API 文档说明了全部默认值。
当按钮或按钮主题指定 `ButtonStyle` 时，
只有按钮样式中非 null 的属性会覆盖计算出的默认值。
按钮的 `style` 参数会覆盖对应按钮主题所指定的非 null 属性。
例如，如果 `TextButton` 样式的 `foregroundColor` 属性非 null，
它会覆盖 `TextButtonTheme` 样式中的同一属性。

As explained earlier, each button class includes a static method
called `styleFrom` which constructs a ButtonStyle from a simple set of
values, including the `ColorScheme` colors it depends on. In many common
cases, using `styleFrom` to create a one-off `ButtonStyle` that
overrides the defaults, is simplest. This is particularly true when
the custom style's objective is to override one of the color scheme
colors, like `primary` or `onPrimary` that the default style depends
on.  For other cases you can create a `ButtonStyle` object
directly. Doing so enables you to control the value of visual
properties, like colors, for all of the button's possible states -
like pressed, hovered, disabled, and focused.

如前所述，每个按钮类都包含名为 `styleFrom` 的静态方法，
它根据一组简单的值构造 ButtonStyle，其中包括所依赖的 `ColorScheme` 颜色。
在许多常见情况下，用 `styleFrom` 创建一次性的 `ButtonStyle` 来覆盖默认值最为简单。
当自定义样式的目的是覆盖默认样式所依赖的某个配色方案颜色
（例如 `primary` 或 `onPrimary`）时，尤其如此。
其他情况下可以直接创建 `ButtonStyle` 对象。
这样就能控制按钮所有可能状态的视觉属性（例如颜色），
包括按下、悬停、禁用和聚焦。


## Migration guide

## 迁移指南

Use the following information to migrate your buttons to the
new API.

请根据下面的信息把按钮迁移到新 API。

### Restoring the original button visuals

### 恢复原来的按钮外观

In many cases it's possible to just switch from the old button class
to the new one.  That's assuming that the small changes in size/shape
and the likely bigger change in colors, aren't a concern.

很多情况下，直接从旧按钮类换成新按钮类即可。
前提是尺寸和形状上的小变化，以及颜色上可能更大的变化，都不构成问题。

To preserve the original buttons' appearance in these cases, one can
define button styles that match the original as closely as you
like. For example, the following style makes a `TextButton` look
like a default `FlatButton`:

若要在这些情况下保留原来按钮的外观，
可以定义尽可能接近原样的按钮样式。
例如，下面的样式让 `TextButton` 看起来像默认的 `FlatButton`：

```dart
final ButtonStyle flatButtonStyle = TextButton.styleFrom(
  foregroundColor: Colors.black87,
  minimumSize: Size(88, 36),
  padding: EdgeInsets.symmetric(horizontal: 16),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(2)),
  ),
);

TextButton(
  style: flatButtonStyle,
  onPressed: () { },
  child: Text('Looks like a FlatButton'),
)
```

Similarly, to make an `ElevatedButton` look like a default `RaisedButton`:

同样，要让 `ElevatedButton` 看起来像默认的 `RaisedButton`：

```dart
final ButtonStyle raisedButtonStyle = ElevatedButton.styleFrom(
  foregroundColor: Colors.black87,
  backgroundColor: Colors.grey[300],
  minimumSize: Size(88, 36),
  padding: EdgeInsets.symmetric(horizontal: 16),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(2)),
  ),
);
ElevatedButton(
  style: raisedButtonStyle,
  onPressed: () { },
  child: Text('Looks like a RaisedButton'),
)
```

The `OutlineButton` style for `OutlinedButton` is a little more
complicated because the outline's color changes to the primary color
when the button is pressed. The outline's appearance is defined by a
`BorderSide` and you'll use a `MaterialStateProperty` to define the pressed
outline color:

`OutlinedButton` 对应的 `OutlineButton` 样式稍微复杂一些，
因为按下按钮时轮廓颜色会变成 primary 颜色。
轮廓外观由 `BorderSide` 定义，
你需要用 `MaterialStateProperty` 来定义按下时的轮廓颜色：

```dart
final ButtonStyle outlineButtonStyle = OutlinedButton.styleFrom(
  foregroundColor: Colors.black87,
  minimumSize: Size(88, 36),
  padding: EdgeInsets.symmetric(horizontal: 16),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(2)),
  ),
).copyWith(
  side: MaterialStateProperty.resolveWith<BorderSide?>(
    (Set<MaterialState> states) {
      if (states.contains(MaterialState.pressed)) {
        return BorderSide(
          color: Theme.of(context).colorScheme.primary,
          width: 1,
        );
      }
      return null;
    },
  ),
);

OutlinedButton(
  style: outlineButtonStyle,
  onPressed: () { },
  child: Text('Looks like an OutlineButton'),
)
```

To restore the default appearance for buttons throughout an
application, you can configure the new button themes in the
application's theme:

要在整个应用中恢复按钮的默认外观，
可以在应用主题中配置新的按钮主题：

```dart
MaterialApp(
  theme: ThemeData.from(colorScheme: ColorScheme.light()).copyWith(
    textButtonTheme: TextButtonThemeData(style: flatButtonStyle),
    elevatedButtonTheme: ElevatedButtonThemeData(style: raisedButtonStyle),
    outlinedButtonTheme: OutlinedButtonThemeData(style: outlineButtonStyle),
  ),
)
```

To restore the default appearance for buttons in part of an
application you can wrap a widget subtree with `TextButtonTheme`,
`ElevatedButtonTheme`, or `OutlinedButtonTheme`. For example:

要在应用的一部分中恢复按钮的默认外观，
可以用 `TextButtonTheme`、`ElevatedButtonTheme` 或 `OutlinedButtonTheme`
包裹一个 widget 子树。例如：

```dart
TextButtonTheme(
  data: TextButtonThemeData(style: flatButtonStyle),
  child: myWidgetSubtree,
)
```

### Migrating buttons with custom colors

### 迁移带有自定义颜色的按钮

The following sections cover use of the following `FlatButton`,
`RaisedButton`, and `OutlineButton` color parameters:

下面几节介绍 `FlatButton`、`RaisedButton` 和 `OutlineButton` 的这些颜色参数：

```dart
textColor
disabledTextColor
color
disabledColor
focusColor
hoverColor
highlightColor*
splashColor
```

The new button classes do not support a separate highlight color
because it's no longer part of the Material Design.

新按钮类不支持单独的高亮颜色，
因为 Material Design 中已不再包含它。

#### Migrating buttons with custom foreground and background colors

#### 迁移带有自定义前景色和背景色的按钮

Two common customizations for the original button classes are a custom
foreground color for `FlatButton`, or custom foreground and background
colors for `RaisedButton`.  Producing the same result with the new
button classes is simple:

旧按钮类有两种常见自定义：
为 `FlatButton` 设置自定义前景色，
或为 `RaisedButton` 设置自定义前景色和背景色。
用新按钮类得到同样的结果很简单：

```dart
FlatButton(
  textColor: Colors.red, // foreground
  onPressed: () { },
  child: Text('FlatButton with custom foreground/background'),
)

TextButton(
  style: TextButton.styleFrom(
    foregroundColor Colors.red,
  ),
  onPressed: () { },
  child: Text('TextButton with custom foreground'),
)
```

In this case the `TextButton`'s foreground (text/icon) color as well as
its hovered/focused/pressed overlay colors will be based on
`Colors.red`. By default, the `TextButton`'s background fill color is
transparent.

此时 `TextButton` 的前景（文本或图标）颜色，
以及悬停、聚焦、按下时的叠层颜色，都会基于 `Colors.red`。
默认情况下，`TextButton` 的背景填充色是透明的。

Migrating a `RaisedButton` with custom foreground and background colors:

迁移带有自定义前景色和背景色的 `RaisedButton`：

```dart
RaisedButton(
  color: Colors.red, // background
  textColor: Colors.white, // foreground
  onPressed: () { },
  child: Text('RaisedButton with custom foreground/background'),
)

ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.red,
    foregroundColor: Colors.white,
  ),
  onPressed: () { },
  child: Text('ElevatedButton with custom foreground/background'),
)
```

In this case the button's use of the color scheme's primary color is
reversed relative to the `TextButton`: primary is button's background
fill color and `onPrimary` is the foreground (text/icon) color.

此时按钮对配色方案 primary 颜色的用法与 `TextButton` 相反：
primary 是按钮的背景填充色，`onPrimary` 是前景（文本或图标）颜色。

#### Migrating buttons with custom overlay colors

#### 迁移带有自定义叠层颜色的按钮

Overriding a button's default focused, hovered, highlighted, or splash
colors is less common. The `FlatButton`, `RaisedButton`, and `OutlineButton`
classes have individual parameters for these state-dependent
colors. The new `TextButton`, `ElevatedButton`, and `OutlinedButton` classes
use a single `MaterialStateProperty<Color>` parameter instead. The new
buttons allow one to specify state-dependent values for all of the
colors, the original buttons only supported specifying what's now
called the "overlayColor".

覆盖按钮默认的聚焦、悬停、高亮或水波纹颜色不太常见。
`FlatButton`、`RaisedButton` 和 `OutlineButton` 类
为这些随状态变化的颜色提供了各自的参数。
新的 `TextButton`、`ElevatedButton` 和 `OutlinedButton` 类
则改用单个 `MaterialStateProperty<Color>` 参数。
新按钮可以为所有颜色指定随状态变化的值，
旧按钮只支持指定现在称为「overlayColor」的那一项。

```dart
FlatButton(
  focusColor: Colors.red,
  hoverColor: Colors.green,
  splashColor: Colors.blue,
  onPressed: () { },
  child: Text('FlatButton with custom overlay colors'),
)

TextButton(
  style: ButtonStyle(
    overlayColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.focused))
          return Colors.red;
        if (states.contains(MaterialState.hovered))
            return Colors.green;
        if (states.contains(MaterialState.pressed))
            return Colors.blue;
        return null; // Defer to the widget's default.
    }),
  ),
  onPressed: () { },
  child: Text('TextButton with custom overlay colors'),
)
```

The new version is more flexible although less compact. In the
original version, the precedence of the different states is
implicit (and undocumented) and fixed, in the new version, it's
explicit.  For an app that specified these colors frequently, the
easiest migration path would be to define one or more `ButtonStyles`
that match the example above - and just use the style parameter - or
to define a stateless wrapper widget that encapsulated the three color
parameters.

新版本更灵活，但没那么紧凑。
在旧版本中，不同状态的优先级是隐式的（而且没有文档）、也是固定的；
在新版本中，优先级是显式的。
如果应用经常指定这些颜色，最省事的迁移方式是
定义一个或多个与上面示例匹配的 `ButtonStyle`，然后只用 style 参数；
或者定义一个无状态包装 widget，把这三个颜色参数封装起来。

#### Migrating buttons with custom disabled colors

#### 迁移带有自定义禁用颜色的按钮

This is a relatively rare customization.  The `FlatButton`,
`RaisedButton`, and `OutlineButton` classes have `disabledTextColor` and
`disabledColor` parameters that define the background and foreground
colors when the button's `onPressed` callback is null.

这是相对少见的自定义。
`FlatButton`、`RaisedButton` 和 `OutlineButton` 类有
`disabledTextColor` 和 `disabledColor` 参数，
用来定义按钮的 `onPressed` 回调为 null 时的背景色和前景色。

By default, all of the buttons use the color scheme's `disabledForegroundColor`
color, with opacity 0.38 for the disabled foreground color. Only
`ElevatedButton` has a non-transparent background color and its default
value is the `disabledForegroundColor` color with opacity 0.12. So in many cases
one can just use the `styleFrom` method to override the disabled colors:

默认情况下，所有按钮都使用配色方案的 `disabledForegroundColor` 颜色，
禁用前景色的不透明度为 0.38。
只有 `ElevatedButton` 的背景色不是透明的，
其默认值是不透明度为 0.12 的 `disabledForegroundColor` 颜色。
因此很多情况下，直接用 `styleFrom` 方法覆盖禁用颜色即可：

```dart
RaisedButton(
  disabledColor: Colors.red.withOpacity(0.12),
  disabledTextColor: Colors.red.withOpacity(0.38),
  onPressed: null,
  child: Text('RaisedButton with custom disabled colors'),
),

ElevatedButton(
  style: ElevatedButton.styleFrom(disabledForegroundColor: Colors.red),
  onPressed: null,
  child: Text('ElevatedButton with custom disabled colors'),
)
```

For complete control over the disabled colors, one must define the
`ElevatedButton`'s style explicitly, in terms of
`MaterialStateProperties`:

若要完全控制禁用颜色，必须用 `MaterialStateProperties`
显式定义 `ElevatedButton` 的样式：

```dart
RaisedButton(
  disabledColor: Colors.red,
  disabledTextColor: Colors.blue,
  onPressed: null,
  child: Text('RaisedButton with custom disabled colors'),
)

ElevatedButton(
  style: ButtonStyle(
    backgroundColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled))
          return Colors.red;
        return null; // Defer to the widget's default.
    }),
    foregroundColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled))
          return Colors.blue;
        return null; // Defer to the widget's default.
    }),
  ),
  onPressed: null,
  child: Text('ElevatedButton with custom disabled colors'),
)
```

As with the previous case, there are obvious ways to make the new
version more compact in an app where this migration comes up often.

和前一种情况一样，如果应用里经常遇到这次迁移，
显然可以把新版本写得更紧凑。

#### Migrating buttons with custom elevations

#### 迁移带有自定义海拔的按钮

This is also a relatively rare customization. Typically, only
`ElevatedButton`s (originally called `RaisedButtons`)
include elevation changes. For elevations that are proportional
to a baseline elevation (per the Material Design specification),
one can override all of them quite simply.

这也是相对少见的自定义。
通常只有 `ElevatedButton`（原来叫 `RaisedButton`）会改变海拔。
对于按基准海拔成比例变化的海拔（依照 Material Design 规范），
可以很简单地一并覆盖。

By default, a disabled button's elevation is 0, and the remaining
states are defined relative to a baseline of 2:

默认情况下，禁用按钮的海拔是 0，其余状态相对于基准值 2 来定义：

```dart
disabled: 0
hovered or focused: baseline + 2
pressed: baseline + 6
```

So to migrate a `RaisedButton` for which all elevations have been
defined:

因此，要迁移一个已经定义了全部海拔的 `RaisedButton`：

```dart
RaisedButton(
  elevation: 2,
  focusElevation: 4,
  hoverElevation: 4,
  highlightElevation: 8,
  disabledElevation: 0,
  onPressed: () { },
  child: Text('RaisedButton with custom elevations'),
)

ElevatedButton(
  style: ElevatedButton.styleFrom(elevation: 2),
  onPressed: () { },
  child: Text('ElevatedButton with custom elevations'),
)
```

To arbitrarily override just one elevation, like the pressed
elevation:

若要任意覆盖某一个海拔，例如按下时的海拔：

```dart
RaisedButton(
  highlightElevation: 16,
  onPressed: () { },
  child: Text('RaisedButton with a custom elevation'),
)

ElevatedButton(
  style: ButtonStyle(
    elevation: MaterialStateProperty.resolveWith<double?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.pressed))
          return 16;
        return null;
      }),
  ),
  onPressed: () { },
  child: Text('ElevatedButton with a custom elevation'),
)
```

#### Migrating buttons with custom shapes and borders

#### 迁移带有自定义形状和边框的按钮

The original `FlatButton`, `RaisedButton`, and `OutlineButton` classes all
provide a shape parameter which defines both the button's shape and
the appearance of its outline. The corresponding new classes and their
themes support specifying the button's shape and its border
separately, with `OutlinedBorder shape` and `BorderSide side` parameters.

原来的 `FlatButton`、`RaisedButton` 和 `OutlineButton` 类
都提供 shape 参数，同时定义按钮的形状和轮廓外观。
对应的新类及其主题支持分别指定按钮的形状和边框，
参数是 `OutlinedBorder shape` 和 `BorderSide side`。

In this example the original `OutlineButton` version specifies the same
color for border in its highlighted (pressed) state as for other
states.

在这个示例中，原来的 `OutlineButton` 版本
为高亮（按下）状态指定了与其他状态相同的边框颜色。

```dart
OutlineButton(
  shape: StadiumBorder(),
  highlightedBorderColor: Colors.red,
  borderSide: BorderSide(
    width: 2,
    color: Colors.red
  ),
  onPressed: () { },
  child: Text('OutlineButton with custom shape and border'),
)

OutlinedButton(
  style: OutlinedButton.styleFrom(
    shape: StadiumBorder(),
    side: BorderSide(
      width: 2,
      color: Colors.red
    ),
  ),
  onPressed: () { },
  child: Text('OutlinedButton with custom shape and border'),
)
```

Most of the new `OutlinedButton` widget's style parameters, including
its shape and border, can be specified with `MaterialStateProperty`
values, which is to say that they can have different values depending
on the button's state. To specify a different border color when the
button is pressed, do the following:

新 `OutlinedButton` widget 的大多数样式参数，包括形状和边框，
都可以用 `MaterialStateProperty` 值来指定，
也就是说它们可以根据按钮状态取不同的值。
要在按钮按下时指定不同的边框颜色，可以这样做：

```dart
OutlineButton(
  shape: StadiumBorder(),
  highlightedBorderColor: Colors.blue,
  borderSide: BorderSide(
    width: 2,
    color: Colors.red
  ),
  onPressed: () { },
  child: Text('OutlineButton with custom shape and border'),
)

OutlinedButton(
  style: ButtonStyle(
    shape: MaterialStateProperty.all<OutlinedBorder>(StadiumBorder()),
    side: MaterialStateProperty.resolveWith<BorderSide>(
      (Set<MaterialState> states) {
        final Color color = states.contains(MaterialState.pressed)
          ? Colors.blue
          : Colors.red;
        return BorderSide(color: color, width: 2);
      }
    ),
  ),
  onPressed: () { },
  child: Text('OutlinedButton with custom shape and border'),
)
```

## Timeline

## 时间线

Landed in version: 1.20.0-0.0.pre<br>
合入版本：1.20.0-0.0.pre<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`ButtonStyle`][]
* [`ButtonStyleButton`][]
* [`ElevatedButton`][]
* [`ElevatedButtonTheme`][]
* [`ElevatedButtonThemeData`][]
* [`OutlinedButton`][]
* [`OutlinedButtonTheme`][]
* [`OutlinedButtonThemeData`][]
* [`TextButton`][]
* [`TextButtonTheme`][]
* [`TextButtonThemeData`][]

Relevant PRs:

相关 PR：

* [PR 59702: New Button Universe][]

  [PR 59702：新的按钮体系][PR 59702: New Button Universe]

* [PR 73352: Deprecated obsolete Material classes: FlatButton, RaisedButton, OutlineButton][]

  [PR 73352：弃用过时的 Material 类：FlatButton、RaisedButton、OutlineButton][PR 73352: Deprecated obsolete Material classes: FlatButton, RaisedButton, OutlineButton]


[`ButtonStyle`]: {{site.api}}/flutter/material/ButtonStyle-class.html
[`ButtonStyleButton`]: {{site.api}}/flutter/material/ButtonStyleButton-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`ElevatedButtonTheme`]: {{site.api}}/flutter/material/ElevatedButtonTheme-class.html
[`ElevatedButtonThemeData`]: {{site.api}}/flutter/material/ElevatedButtonThemeData-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[`OutlinedButtonTheme`]: {{site.api}}/flutter/material/OutlinedButtonTheme-class.html
[`OutlinedButtonThemeData`]: {{site.api}}/flutter/material/OutlinedButtonThemeData-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`TextButtonTheme`]: {{site.api}}/flutter/material/TextButtonTheme-class.html
[`TextButtonThemeData`]: {{site.api}}/flutter/material/TextButtonThemeData-class.html

[PR 59702: New Button Universe]: {{site.repo.flutter}}/pull/59702
[PR 73352: Deprecated obsolete Material classes: FlatButton, RaisedButton, OutlineButton]: {{site.repo.flutter}}/pull/73352
