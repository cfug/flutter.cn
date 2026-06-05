---
# title: LayoutBuilder and adaptive layouts
title: LayoutBuilder 与自适应布局
# description: Learn how to use the LayoutBuilder widget.
description: 学习如何使用 LayoutBuilder widget。
layout: tutorial
ai-translated: true
---

<?code-excerpt replace="/ *\/\/\s+ignore_for_file:[^\n]+\n//g;"?>

Learn how to create layouts that adapt to different screen widths.

学习如何创建能够适应不同屏幕宽度的布局。

<SummaryCard>
title: 你将完成的内容
items:
  - title: 使用 LayoutBuilder 创建响应式布局
    icon: fit_screen
  - title: 检测屏幕尺寸以选择不同布局
    icon: devices
  - title: 为大屏幕构建侧边栏与详情布局
    icon: view_sidebar
</SummaryCard>

---

### Introduction

### 简介

Modern apps need to work well on screens of all sizes.
On this page, you'll learn how to create layouts that
adapt to different screen widths.
This app shows a sidebar on large screens and
a navigation-based UI on small screens.
Specifically, this app handles two screen sizes:

现代应用需要在各种尺寸的屏幕上都能良好运行。
在本页中，你将学习如何创建能够
适应不同屏幕宽度的布局。
此应用在大屏幕上显示侧边栏，
在小屏幕上使用基于导航的 UI。
具体而言，此应用处理两种屏幕尺寸：

- **Large screens (tablets, desktop)**:
  Shows contact groups and contact details side-by-side.
- **Small screens (phones)**:
  Uses navigation to move between contact groups and details.


  **大屏幕（平板、桌面）**：
  并排显示联系人分组和联系人详情。
  使用导航在联系人分组和详情之间切换。

### Create the contact groups page

### 创建联系人分组页面

First, create the basic structure of the `ContactGroupsPage` widget
for your contact groups screen.
Create `lib/screens/contact_groups.dart` and add
the following basic structure:

首先，为联系人分组屏幕创建 `ContactGroupsPage` widget 的基本结构。
创建 `lib/screens/contact_groups.dart` 并添加
以下基本结构：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/contact_groups.dart"?>
```dart
import 'package:flutter/cupertino.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(child: Text('Contact Groups will go here')),
    );
  }
}
```

### Create the contacts page

### 创建联系人页面

Similarly, create `lib/screens/contacts.dart` to eventually
display individual contacts:

同样，创建 `lib/screens/contacts.dart` 以最终
显示各个联系人：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/contacts.dart"?>
```dart
import 'package:flutter/cupertino.dart';

class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(child: Text('Lists of contacts will go here')),
    );
  }
}
```

The `ContaactsListPage` widget and `ContactGroupsPage` widget are
placeholder pages that are needed to implement the adaptive layout
widget, which you'll do next.

`ContaactsListPage` widget 和 `ContactGroupsPage` widget 是
实现自适应布局 widget 所需的占位页面，
你将在下一步完成该布局。

### Build the adaptive layout foundation

### 构建自适应布局基础

Create `lib/screens/adaptive_layout.dart`
and start with the following basic structure:

创建 `lib/screens/adaptive_layout.dart`，
并以以下基本结构开始：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v1.dart"?>
```dart
import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  @override
  Widget build(BuildContext context) {
    return const ContactGroupsPage(); // Temporary placeholder
  }
}
```

This is a `StatefulWidget` because the adaptive layout eventually
manages which contact group is currently selected.

这是一个 `StatefulWidget`，因为自适应布局最终需要
管理当前选中的联系人分组。

Next, add the screen size detection logic to `lib/screens/adaptive_layout.dart`:

接下来，在 `lib/screens/adaptive_layout.dart` 中添加屏幕尺寸检测逻辑：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v2.dart"?>
```dart
import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isLargeScreen = constraints.maxWidth > largeScreenMinWidth;

        if (isLargeScreen) {
          return const Text('Large screen layout'); // Temporary
        } else {
          return const ContactGroupsPage();
        }
      },
    );
  }
}
```

The `LayoutBuilder` widget provides information about
the parent's size constraints.
In the `builder` callback, you receive a`BoxConstraints` object that
tells you the maximum available width and height.

`LayoutBuilder` widget 提供有关
父级尺寸约束的信息。
在 `builder` 回调中，你会收到一个 `BoxConstraints` 对象，
它会告知你最大可用宽度和高度。

By checking if `constraints.maxWidth > largeScreenMinWidth`,
you can decide which layout to show.
The 600-pixel threshold is a common breakpoint that
separates phone-sized screens from tablet-sized screens.

通过检查 `constraints.maxWidth > largeScreenMinWidth`，
你可以决定显示哪种布局。
600 像素的阈值是常用的断点，
用于区分手机尺寸屏幕与平板尺寸屏幕。

### Update the main app

### 更新主应用

Update `main.dart` to use the adaptive layout,
so you can see your changes:

更新 `main.dart` 以使用自适应布局，
这样你就能看到更改效果：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/main.dart"?>
```dart
import 'package:flutter/cupertino.dart';

import 'data/contact_group.dart';
import 'screens/adaptive_layout.dart';

final contactGroupsModel = ContactGroupsModel();

void main() {
  runApp(const RolodexApp());
}

class RolodexApp extends StatelessWidget {
  const RolodexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Rolodex',
      theme: CupertinoThemeData(
        barBackgroundColor: CupertinoDynamicColor.withBrightness(
          color: Color(0xFFF9F9F9),
          darkColor: Color(0xFF1D1D1D),
        ),
      ),
      home: AdaptiveLayout(),
    );
  }
}
```

If you're running in Chrome, you can resize the browser window to
see layout changes.

如果你在 Chrome 中运行，可以调整浏览器窗口大小以
查看布局变化。

### Add list selection functionality

### 添加列表选择功能

The large screen layout needs to track which contact group is selected.
Update the state object in `lib/screens/adaptive_layout.dart` with the following code:

大屏幕布局需要跟踪选中的联系人分组。
在 `lib/screens/adaptive_layout.dart` 中使用以下代码更新状态对象：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v3.dart"?>
```dart

import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  int selectedListId = 0;

  void _onContactListSelected(int listId) {
    setState(() {
      selectedListId = listId;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isLargeScreen = constraints.maxWidth > largeScreenMinWidth;

        if (isLargeScreen) {
          return const Text('Large screen layout');
        } else {
          return const ContactGroupsPage();
        }
      },
    );
  }
}
```

The `selectedListId` variable tracks the currently selected contact group,
and `_onContactListSelected` updates this value when the user makes a choice.

`selectedListId` 变量跟踪当前选中的联系人分组，
`_onContactListSelected` 在用户做出选择时更新此值。

### Build the large screen layout

### 构建大屏幕布局

Now, implement the side-by-side layout for large screens in `lib/screens/adaptive_layout.dart`.
First, replace the temporary text with a widget that
contains the proper layout.

现在，在 `lib/screens/adaptive_layout.dart` 中实现大屏幕的并排布局。
首先，将临时文本替换为包含
正确布局的 widget。

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v4.dart"?>
```dart

import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  int selectedListId = 0;

  void _onContactListSelected(int listId) {
    setState(() {
      selectedListId = listId;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isLargeScreen = constraints.maxWidth > largeScreenMinWidth;

        if (isLargeScreen) {
          return _buildLargeScreenLayout();
        } else {
          // For small screens, use the original, navigation-style approach.
          return const ContactGroupsPage();
        }
      },
    );
  }

  Widget _buildLargeScreenLayout() {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: SafeArea(child: Row(children: [Text('Sidebar'), Text('Details')])),
    );
  }
}
```

The large screen layout uses a `Row` to
place the sidebar and details side-by-side.
`SafeArea` ensures that the content doesn't overlap with
system UI elements like the status bar.

大屏幕布局使用 `Row` 将
侧边栏和详情并排放置。
`SafeArea` 确保内容不会与
状态栏等系统 UI 元素重叠。

Now, set the sizes of the two panels and
add a visual divider in `lib/screens/adaptive_layout.dart`:

现在，在 `lib/screens/adaptive_layout.dart` 中
设置两个面板的尺寸并添加视觉分隔线：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout.dart (panel-and-divider)"?>
```dart
Widget _buildLargeScreenLayout() {
  return CupertinoPageScaffold(
    backgroundColor: CupertinoColors.extraLightBackgroundGray,
    child: SafeArea(
      child: Row(
        children: [
          const SizedBox(width: 320, child: Text('Sidebar placeholder')),
          Container(width: 1, color: CupertinoColors.separator),
          const Expanded(child: Text('Details placeholder')),
        ],
      ),
    ),
  );
}
```

This layout creates the following:

此布局创建以下内容：

- A fixed-width sidebar (320 pixels) for contact groups.
- A 1-pixel divider between the panels.
- A details panel that uses an `Expanded` widget to take the remaining space.

- 用于联系人分组的固定宽度侧边栏（320 像素）。
- 面板之间的 1 像素分隔线。
- 使用 `Expanded` widget 占据剩余空间的详情面板。

### Test the adaptive layout

### 测试自适应布局

Hot reload your app and test the responsive behavior.
If you're running in Chrome, you can resize the browser window to
see the layout change:

热重载应用并测试响应式行为。
如果你在 Chrome 中运行，可以调整浏览器窗口大小以
查看布局变化：

- **Wide window (> 600px)**:
  Shows placeholder text for the sidebar and details side-by-side.
- **Narrow window (< 600px)**:
  Shows only the contact groups page.


  **宽窗口（> 600px）**：
  并排显示侧边栏和详情的占位文本。
  仅显示联系人分组页面。

Both the sidebar and main content area show placeholder text for now.

目前侧边栏和主内容区域都显示占位文本。

In the next lesson, you'll implement slivers to fill in
the contact list content.

在下一课中，你将实现 sliver 以填充
联系人列表内容。

### Review

### 回顾

<SummaryCard>
title: 你完成的内容
subtitle: 以下是你本课构建与学习内容的摘要。
completed: true
items:
  - title: 使用 LayoutBuilder 创建了响应式布局
    icon: fit_screen
    details: >-
      `LayoutBuilder` 在其 builder 回调中提供父级的尺寸约束。
      通过检查 `constraints.maxWidth`，
      你可以根据可用空间决定显示哪种布局。
  - title: 检测屏幕尺寸以选择不同布局
    icon: devices
    details: >-
      你使用 600 像素断点来
      区分手机尺寸屏幕与平板尺寸屏幕。
      这一常用阈值帮助你的应用调整 UI，
      以便在每种设备上提供最佳体验。
  - title: 为大屏幕构建了侧边栏与详情布局
    icon: view_sidebar
    details: >-
      在大屏幕上，你使用 `Row` 并排显示固定宽度侧边栏和
      `Expanded` 详情面板。
      这一经典模式可以最大化平板和桌面上的屏幕空间。
</SummaryCard>

### Test yourself

### 自测

<Quiz title="自适应布局测验">
- question: LayoutBuilder 向其 builder 回调提供哪些信息？
  options:
    - text: 设备的操作系统和屏幕方向。
      correct: false
      explanation: LayoutBuilder 提供尺寸约束，而非操作系统或方向信息。
    - text: 父级的尺寸约束，包括最大宽度和高度。
      correct: true
      explanation: LayoutBuilder 的 builder 会收到 BoxConstraints，告知你来自父级的可用空间。
    - text: 当前的主题颜色和排版。
      correct: false
      explanation: 主题数据来自 Theme.of(context)，而非 LayoutBuilder。
    - text: widget 树中子 widget 的数量。
      correct: false
      explanation: LayoutBuilder 提供布局约束，而非 widget 树信息。
- question: 在大屏幕布局中，可以使用哪个 widget 将侧边栏和详情面板并排放置？
  options:
    - text: Column
      correct: false
      explanation: Column 垂直排列 widget，而非并排。
    - text: Row
      correct: true
      explanation: Row 水平排列其子级，非常适合将侧边栏和详情面板并排放置。
    - text: Stack
      correct: false
      explanation: Stack 将 widget 层叠在一起，而非并排。
    - text: ListView
      correct: false
      explanation: ListView 用于可滚动列表，而非并排布局。
</Quiz>
