---
# title: User input & accessibility
title: 用户输入与无障碍
# description: >-
#   A truly adaptive app also handles differences
#   in how user input works and also programs
#   to help folks with accessibility issues.
description: >-
  真正自适应的应用还需处理用户输入方式的差异，
  并兼顾无障碍辅助功能。
ai-translated: true
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

It isn't enough to just adapt how your app looks,
you also have to support a variety of user inputs.
The mouse and keyboard introduce input types beyond those
found on a touch device, like scroll wheel, right-click,
hover interactions, tab traversal, and keyboard shortcuts.

仅适配应用外观不够，还需支持多种用户输入。
鼠标与键盘带来触控设备之外的输入类型，如滚轮、右键、悬停交互、Tab 遍历与键盘快捷键。

Some of these features work by default on Material
widgets. But, if you've created a custom widget,
you might need to implement them directly.

部分功能在 Material widget 上默认可用。
但若创建了自定义 widget，可能需要自行实现。

Some features that encompass a well-designed app,
also help users who work with assistive technologies.
For example, aside from being **good app design**,
some features, like tab traversal and keyboard shortcuts,
are _critical for users who work with assistive devices_.
In addition to the standard advice for
[creating accessible apps][], this page covers
info for creating apps that are both
adaptive _and_ accessible.

优秀应用设计的部分功能也有助使用辅助技术的用户。
例如，除属于 **良好应用设计** 外，Tab 遍历与键盘快捷键等对 **使用辅助设备的用户至关重要**。
除 [创建无障碍应用][creating accessible apps] 的标准建议外，
本页涵盖同时实现自适应 **与** 无障碍的信息。

[creating accessible apps]: /ui/accessibility

## Scroll wheel for custom widgets

## 自定义 widget 的滚轮

Scrolling widgets like `ScrollView` or `ListView`
support the scroll wheel by default, and because
almost every scrollable custom widget is built
using one of these, it works with those as well.

`ScrollView` 或 `ListView` 等滚动 widget 默认支持滚轮，
几乎所有可滚动自定义 widget 都基于它们构建，因此同样有效。

If you need to implement custom scroll behavior,
you can use the [`Listener`][] widget, which lets you
customize how your UI reacts to the scroll wheel.

若需实现自定义滚动行为，可使用 [`Listener`][] widget 自定义 UI 对滚轮的反应。

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (pointer-scroll)"?>
```dart
return Listener(
  onPointerSignal: (event) {
    if (event is PointerScrollEvent) print(event.scrollDelta.dy);
  },
  child: ListView(),
);
```

[`Listener`]: {{site.api}}/flutter/widgets/Listener-class.html

## Tab traversal and focus interactions

## Tab 遍历与焦点交互

Users with physical keyboards expect that they can use
the tab key to quickly navigate an application,
and users with motor or vision differences often rely
completely on keyboard navigation.

使用实体键盘的用户预期可用 Tab 键快速导航应用，
运动或视觉差异用户往往完全依赖键盘导航。

There are two considerations for tab interactions:
how focus moves from widget to widget, known as traversal,
and the visual highlight shown when a widget is focused.

Tab 交互需考虑两点：
焦点如何在 widget 间移动（遍历），以及 widget 获焦时的视觉高亮。

Most built-in components, like buttons and text fields,
support traversal and highlights by default.
If you have your own widget that you want included in
traversal, you can use the [`FocusableActionDetector`][] widget
to create your own controls. The [`FocusableActionDetector`][]
widget is helpful for combining focus, mouse input,
and shortcuts together in one widget. You can create
a detector that defines actions and key bindings,
and provides callbacks for handling focus and hover highlights.

按钮、文本字段等大多数内置 widget 默认支持遍历与高亮。
若希望自定义 widget 参与遍历，可用 [`FocusableActionDetector`][] 创建控件。
该 widget 便于在一个 widget 中组合焦点、鼠标输入与快捷键；
可创建定义 action 与键绑定的检测器，并提供处理焦点与悬停高亮的回调。

<?code-excerpt "lib/pages/focus_examples_page.dart (focusable-action-detector)"?>
```dart
class _BasicActionDetectorState extends State<BasicActionDetector> {
  bool _hasFocus = false;
  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      onFocusChange: (value) => setState(() => _hasFocus = value),
      actions: <Type, Action<Intent>>{
        ActivateIntent: CallbackAction<Intent>(
          onInvoke: (intent) {
            print('Enter or Space was pressed!');
            return null;
          },
        ),
      },
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          const FlutterLogo(size: 100),
          // Position focus in the negative margin for a cool effect
          if (_hasFocus)
            Positioned(
              left: -4,
              top: -4,
              bottom: -4,
              right: -4,
              child: _roundedBorder(),
            ),
        ],
      ),
    );
  }
}
```

[`Actions`]: {{site.api}}/flutter/widgets/Actions-class.html
[`Focus`]: {{site.api}}/flutter/widgets/Focus-class.html
[`FocusableActionDetector`]: {{site.api}}/flutter/widgets/FocusableActionDetector-class.html
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`Shortcuts`]: {{site.api}}/flutter/widgets/Shortcuts-class.html

### Controlling traversal order

### 控制遍历顺序

To get more control over the order that
widgets are focused on when the user tabs through,
you can use [`FocusTraversalGroup`][] to define sections
of the tree that should be treated as a group when tabbing.

要更精确控制用户 Tab 时 widget 的聚焦顺序，
可用 [`FocusTraversalGroup`][] 定义 Tab 时应作为一组处理的树片段。

For example, you might to tab through all the fields in
a form before tabbing to the submit button:

例如，可先 Tab 遍历表单所有字段，再 Tab 到提交按钮：

<?code-excerpt "lib/pages/focus_examples_page.dart (focus-traversal-group)"?>
```dart
return Column(
  children: [
    FocusTraversalGroup(child: MyFormWithMultipleColumnsAndRows()),
    SubmitButton(),
  ],
);
```

Flutter has several built-in ways to traverse widgets and groups,
defaulting to the `ReadingOrderTraversalPolicy` class.
This class usually works well, but it's possible to modify this
using another predefined `TraversalPolicy` class or by creating
a custom policy.

Flutter 有多种内置遍历 widget 与组的方式，默认使用 `ReadingOrderTraversalPolicy`。
该类通常表现良好，也可改用其他预定义 `TraversalPolicy` 或创建自定义策略。

[`FocusTraversalGroup`]: {{site.api}}/flutter/widgets/FocusTraversalGroup-class.html

## Keyboard accelerators

## 键盘加速器

In addition to tab traversal, desktop and web users are accustomed
to having various keyboard shortcuts bound to specific actions.
Whether it's the `Delete` key for quick deletions or
`Control+N` for a new document, be sure to consider the different
accelerators your users expect. The keyboard is a powerful
input tool, so try to squeeze as much efficiency from it as you can.
Your users will appreciate it!

除 Tab 遍历外，桌面与 Web 用户习惯将各种快捷键绑定到特定操作。
无论是 `Delete` 快速删除还是 `Control+N` 新建文档，务必考虑用户预期的加速器。
键盘是强大的输入工具，尽量榨取其效率，用户会感谢你！

Keyboard accelerators can be accomplished in a few ways in Flutter,
depending on your goals.

在 Flutter 中实现键盘加速器有多种方式，取决于你的目标。

If you have a single widget like a `TextField` or a `Button` that
already has a focus node, you can wrap it in a [`KeyboardListener`][]
or a [`Focus`][] widget and listen for keyboard events:

若单个 widget（如已有焦点节点的 `TextField` 或 `Button`）需处理快捷键，
可用 [`KeyboardListener`][] 或 [`Focus`][] 包裹并监听键盘事件：

<?code-excerpt "lib/pages/focus_examples_page.dart (focus-keyboard-listener)"?>
```dart
  @override
  Widget build(BuildContext context) {
    return Focus(
      onKeyEvent: (node, event) {
        if (event is KeyDownEvent) {
          print(event.logicalKey);
        }
        return KeyEventResult.ignored;
      },
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 400),
        child: const TextField(
          decoration: InputDecoration(border: OutlineInputBorder()),
        ),
      ),
    );
  }
}
```

To apply a set of keyboard shortcuts to a large section
of the tree, use the [`Shortcuts`][] widget:

要对树中较大部分应用一组键盘快捷键，请使用 [`Shortcuts`][] widget：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (shortcuts)"?>
```dart
// Define a class for each type of shortcut action you want
class CreateNewItemIntent extends Intent {
  const CreateNewItemIntent();
}

Widget build(BuildContext context) {
  return Shortcuts(
    // Bind intents to key combinations
    shortcuts: const <ShortcutActivator, Intent>{
      SingleActivator(LogicalKeyboardKey.keyN, control: true):
          CreateNewItemIntent(),
    },
    child: Actions(
      // Bind intents to an actual method in your code
      actions: <Type, Action<Intent>>{
        CreateNewItemIntent: CallbackAction<CreateNewItemIntent>(
          onInvoke: (intent) => _createNewItem(),
        ),
      },
      // Your sub-tree must be wrapped in a focusNode, so it can take focus.
      child: Focus(autofocus: true, child: Container()),
    ),
  );
}
```

The [`Shortcuts`][] widget is useful because it only
allows shortcuts to be fired when this widget tree
or one of its children has focus and is visible.

[`Shortcuts`][] 很有用，因为仅当该 widget 树或其子级有焦点且可见时才触发快捷键。

The final option is a global listener. This listener
can be used for always-on, app-wide shortcuts or for
panels that can accept shortcuts whenever they're visible
(regardless of their focus state). Adding global listeners
is easy with [`HardwareKeyboard`][]:

最后一种选择是全局监听器，可用于始终开启的应用级快捷键，
或面板可见时（无论焦点状态）接受快捷键。
用 [`HardwareKeyboard`][] 添加全局监听器很简单：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (hardware-keyboard)"?>
```dart
@override
void initState() {
  super.initState();
  HardwareKeyboard.instance.addHandler(_handleKey);
}

@override
void dispose() {
  HardwareKeyboard.instance.removeHandler(_handleKey);
  super.dispose();
}
```

To check key combinations with the global listener,
you can use the `HardwareKeyboard.instance.logicalKeysPressed` set.
For example, a method like the following can check whether any
of the provided keys are being held down:

用全局监听器检查键组合时，可使用 `HardwareKeyboard.instance.logicalKeysPressed` 集合。
例如，以下方法可检查是否按住所提供的任一键：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (keys-pressed)"?>
```dart
static bool isKeyDown(Set<LogicalKeyboardKey> keys) {
  return keys
      .intersection(HardwareKeyboard.instance.logicalKeysPressed)
      .isNotEmpty;
}
```

Putting these two things together,
you can fire an action when `Shift+N` is pressed:

将两者结合，可在按下 `Shift+N` 时触发操作：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (handle-key)"?>
```dart
bool _handleKey(KeyEvent event) {
  bool isShiftDown = isKeyDown({
    LogicalKeyboardKey.shiftLeft,
    LogicalKeyboardKey.shiftRight,
  });

  if (isShiftDown && event.logicalKey == LogicalKeyboardKey.keyN) {
    _createNewItem();
    return true;
  }

  return false;
}
```

One note of caution when using the static listener,
is that you often need to disable it when the user
is typing in a field or when the widget it's
associated with is hidden from view.
Unlike with `Shortcuts` or `KeyboardListener`,
this is your responsibility to manage. This can be especially
important when you're binding a Delete/Backspace accelerator for
`Delete`, but then have child `TextFields` that the user
might be typing in.

使用静态监听器时注意：用户正在字段中输入或关联 widget 不可见时，通常需禁用它。
与 `Shortcuts` 或 `KeyboardListener` 不同，这由你自行管理。
绑定 Delete/Backspace 加速器时尤其重要，若子级有用户可能正在输入的 `TextField`。

[`HardwareKeyboard`]: {{site.api}}/flutter/services/HardwareKeyboard-class.html
[`KeyboardListener`]: {{site.api}}/flutter/widgets/KeyboardListener-class.html

## Mouse enter, exit, and hover for custom widgets {:#custom-widgets}

## 自定义 widget 的鼠标进入、离开与悬停 {:#custom-widgets}

On desktop, it's common to change the mouse cursor
to indicate the functionality about the content the
mouse is hovering over. For example, you typically see
a hand cursor when you hover over a button,
or an `I` cursor when you hover over text.

在桌面上，常通过改变鼠标光标指示悬停内容的功能。
例如，悬停按钮时通常为手型光标，悬停文字时为 `I` 型光标。

Flutter's Material buttons handle basic focus states
for standard button and text cursors.
(A notable exception is if you change the default styling
of the Material buttons to set the `overlayColor` to transparent.)

Flutter 的 Material 按钮处理标准按钮与文字光标的基本焦点状态。
（例外：若将 Material 按钮默认样式的 `overlayColor` 设为透明。）

Implement a focus state for any custom buttons or
gesture detectors in your app.
If you change the default Material button styles,
test for keyboard focus states and
implement your own, if needed.

为应用中任何自定义按钮或手势检测器实现焦点状态。
若更改默认 Material 按钮样式，请测试键盘焦点状态并在需要时自行实现。

To change the cursor from within your custom widgets,
use [`MouseRegion`][]:

在自定义 widget 内更改光标，请使用 [`MouseRegion`][]：

<?code-excerpt "lib/pages/focus_examples_page.dart (mouse-region)"?>
```dart
// Show hand cursor
return MouseRegion(
  cursor: SystemMouseCursors.click,
  // Request focus when clicked
  child: GestureDetector(
    onTap: () {
      Focus.of(context).requestFocus();
      _submit();
    },
    child: Logo(showBorder: hasFocus),
  ),
);
```

`MouseRegion` is also useful for creating custom
rollover and hover effects:

`MouseRegion` 也适用于创建自定义 rollover 与悬停效果：

<?code-excerpt "lib/pages/focus_examples_page.dart (mouse-over)"?>
```dart
return MouseRegion(
  onEnter: (_) => setState(() => _isMouseOver = true),
  onExit: (_) => setState(() => _isMouseOver = false),
  onHover: (e) => print(e.localPosition),
  child: Container(
    height: 500,
    color: _isMouseOver ? Colors.blue : Colors.black,
  ),
);
```

For an example that changes the button style
to outline the button when it has focus,
check out the [button code for the Wonderous app][].
The app modifies the [`FocusNode.hasFocus`][]
property to check whether the button has focus
and, if so, adds an outline.

有关在获焦时为按钮添加轮廓样式的示例，
请参阅 [Wonderous 应用的按钮代码][button code for the Wonderous app]。
应用通过 [`FocusNode.hasFocus`][] 检查按钮是否获焦并添加轮廓。

[button code for the Wonderous app]: {{site.github}}/gskinnerTeam/flutter-wonderous-app/blob/8a29d6709668980340b1b59c3d3588f123edd4d8/lib/ui/common/controls/buttons.dart#L143
[`FocusNode.hasFocus`]: {{site.api}}/flutter/widgets/FocusNode/hasFocus.html

## Visual density

## 视觉密度

You might consider enlarging the "hit area"
of a widget to accommodate a touch screen, for example.

例如，你可能考虑扩大 widget 的「点击区域」以适配触摸屏。

Different input devices offer various levels of precision,
which necessitate differently-sized hit areas.
Flutter's `VisualDensity` class makes it easy to adjust the
density of your views across the entire application,
for example, by making a button larger
(and therefore easier to tap) on a touch device.

不同输入设备精度不同，需要不同尺寸的点击区域。
Flutter 的 `VisualDensity` 类便于在全应用调整视图密度，
例如在触控设备上让按钮更大（更易点击）。

When you change the `VisualDensity` for
your `MaterialApp`, `MaterialComponents`
that support it animate their densities to match.
By default, both horizontal and vertical densities
are set to 0.0, but you can set the densities to any
negative or positive value that you want.
By switching between different
densities, you can easily adjust your UI.

当你为 `MaterialApp` 更改 `VisualDensity` 时，
支持它的 `MaterialComponents` 会动画化其密度以匹配。
默认情况下，水平和垂直密度均设为 0.0，但你可以将密度设为任意负值或正值。
在不同密度之间切换，可轻松调整 UI。

![Adaptive scaffold](/assets/images/docs/ui/adaptive-responsive/adaptive_scaffold.webp){:width="100%"}

To set a custom visual density,
inject the density into your `MaterialApp` theme:

要设置自定义视觉密度，将密度注入 `MaterialApp` 主题：

<?code-excerpt "lib/main.dart (visual-density)"?>
```dart
double densityAmt = touchMode ? 0.0 : -1.0;
VisualDensity density = VisualDensity(
  horizontal: densityAmt,
  vertical: densityAmt,
);
return MaterialApp(
  theme: ThemeData(visualDensity: density),
  home: MainAppScaffold(),
  debugShowCheckedModeBanner: false,
);
```

To use `VisualDensity` inside your own views,
you can look it up:

在自有视图中使用 `VisualDensity` 时，可查找：

<?code-excerpt "lib/pages/adaptive_reflow_page.dart (visual-density-own-view)"?>
```dart
VisualDensity density = Theme.of(context).visualDensity;
```

Not only does the container react automatically to changes
in density, it also animates when it changes.
This ties together your custom components,
along with the built-in components,
for a smooth transition effect across the app.

容器不仅会自动响应密度变化，变化时还会动画，
将自定义与内置 widget 串联，在全应用实现平滑过渡。

As shown, `VisualDensity` is unit-less,
so it can mean different things to different views.
In the following example, 1 density unit equals 6 pixels,
but this is totally up to you to decide.
The fact that it is unit-less makes it quite versatile,
and it should work in most contexts.

如上所示，`VisualDensity` 无单位，对不同视图含义可不同。
以下示例中 1 密度单位等于 6 像素，但完全由你决定。
无单位使其相当灵活，在多数场景应能适用。

It's worth noting that the Material generally
use a value of around 4 logical pixels for each
visual density unit. For more information about the
supported components, see the [`VisualDensity`][] API.
For more information about density principles in general,
see the [Material Design guide][].

值得注意的是，Material 通常每个视觉密度单位约 4 逻辑像素。
有关受支持 widget 的更多信息，请参阅 [`VisualDensity`][] API。
有关密度原则的更多信息，请参阅 [Material Design 指南][Material Design guide]。

[Material Design guide]: {{site.material2}}/design/layout/applying-density.html#usage
[`VisualDensity`]: {{site.api}}/flutter/material/VisualDensity-class.html
