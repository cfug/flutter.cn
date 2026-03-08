---
#title: LayoutBuilder and adaptive layouts
title: LayoutBuilder 与自适应布局
#description: Learn how to use the LayoutBuilder widget.
description: 学习如何使用 LayoutBuilder widget。
layout: tutorial
---

Learn how to create layouts that adapt to different screen widths.

学习如何创建能够适配不同屏幕宽度的布局。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Create responsive layouts with LayoutBuilder
    icon: fit_screen
  - title: Detect screen size to choose different layouts
    icon: devices
  - title: Build a sidebar and detail layout for large screens
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

现代应用需要在各种尺寸的屏幕上都能良好运行。在本页中，你将学习如何创建能够适配不同屏幕宽度的布局。这个应用会在大屏幕上显示侧边栏，在小屏幕上使用基于导航的界面。具体来说，这个应用处理两种屏幕尺寸：

- **Large screens (tablets, desktop)**:
  Shows contact groups and contact details side-by-side.
  **大屏幕（平板、桌面端）**：
  并排显示联系人分组和联系人详情。
- **Small screens (phones)**:
  Uses navigation to move between contact groups and details.
  **小屏幕（手机）**：
  使用导航在联系人分组和详情之间切换。

### Create the contact groups page

### 创建联系人分组页面

First, create the basic structure of the `ContactGroupsPage` widget
for your contact groups screen.
Create `lib/screens/contact_groups.dart` and add
the following basic structure:

首先，为联系人分组页面创建 `ContactGroupsPage` widget 的基本结构。创建 `lib/screens/contact_groups.dart` 并添加以下基本结构：

```dart
import 'package:flutter/cupertino.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(
        child: Text('Contact Groups will go here'),
      ),
    );
  }
}
```

### Create the contacts page

### 创建联系人页面

Similarly, create `lib/screens/contacts.dart` to eventually
display individual contacts:

类似地，创建 `lib/screens/contacts.dart` 来最终展示单个联系人：

```dart
import 'package:flutter/cupertino.dart';

class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(
        child: Text('Lists of contacts will go here'),
      ),
    );
  }
}
```

The `ContaactsListPage` widget and `ContactGroupsPage` widget are
placeholder pages that are needed to implement the adaptive layout
widget, which you'll do next.

`ContaactsListPage` widget 和 `ContactGroupsPage` widget 是占位页面，用于实现自适应布局 widget，你将在下一步完成这项工作。

### Build the adaptive layout foundation

### 构建自适应布局基础

Create `lib/screens/adaptive_layout.dart`
and start with the following basic structure:

创建 `lib/screens/adaptive_layout.dart` 并从以下基本结构开始：

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

这里使用 `StatefulWidget`，因为自适应布局最终需要管理当前选中的联系人分组。

Next, add the screen size detection logic:

接下来，添加屏幕尺寸检测逻辑：

```dart
import 'package:flutter/cupertino.dart';
import 'contact_groups.dart';

// New
const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  @override
  Widget build(BuildContext context) {
    // Replace from here
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

`LayoutBuilder` widget 提供了关于父级尺寸约束的信息。在 `builder` 回调中，你会收到一个 `BoxConstraints` 对象，它会告诉你可用的最大宽度和高度。

By checking if `constraints.maxWidth > largeScreenMinWidth`,
you can decide which layout to show.
The 600-pixel threshold is a common breakpoint that
separates phone-sized screens from tablet-sized screens.

通过检查 `constraints.maxWidth > largeScreenMinWidth`，你可以决定显示哪种布局。600 像素的阈值是一个常用的断点，用于区分手机尺寸和平板尺寸的屏幕。

### Update the main app

### 更新主应用

Update `main.dart` to use the adaptive layout,
so you can see your changes:

更新 `main.dart` 以使用自适应布局，这样你就可以看到变更效果：

```dart
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/screens/adaptive_layout.dart';

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
      home: AdaptiveLayout(), // New
    );
  }
}
```

If you're running in Chrome, you can resize the browser window to
see layout changes.

如果你正在 Chrome 中运行，可以调整浏览器窗口大小来查看布局变化。

### Add list selection functionality

### 添加列表选择功能

The large screen layout needs to track which contact group is selected.
Update the state object with the following code:

大屏幕布局需要追踪当前选中的联系人分组。使用以下代码更新 state 对象：

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
  // New
  int selectedListId = 0;

  // New
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

`selectedListId` 变量追踪当前选中的联系人分组，`_onContactListSelected` 在用户做出选择时更新该值。

### Build the large screen layout

### 构建大屏幕布局

Now, implement the side-by-side layout for large screens.
First, replace the temporary text with a widget that
contains the proper layout.

现在，实现大屏幕的并排布局。首先，将临时文本替换为包含正确布局的 widget。

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
          return _buildLargeScreenLayout(); // New
        } else {
          // For small screens, use the original, navigation-style approach.
          return const ContactGroupsPage();
        }
      },
    );
  }

  // New
  Widget _buildLargeScreenLayout() {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: SafeArea(
        child: Row(
          children: [
            // Contact groups list:
            Text('Sidebar'),
            // List detail view:
            Text('Details'),
          ],
        ),
      ),
    );
  }
}
```

The large screen layout uses a `Row` to
place the sidebar and details side-by-side.
`SafeArea` ensures that the content doesn't overlap with
system UI elements like the status bar.

大屏幕布局使用 `Row` 将侧边栏和详情面板并排放置。`SafeArea` 确保内容不会与状态栏等系统界面元素重叠。

Now, set the sizes of the two panels and add a visual divider:

现在，设置两个面板的尺寸并添加一个视觉分隔线：

```dart
Widget _buildLargeScreenLayout() {
  return CupertinoPageScaffold(
    backgroundColor: CupertinoColors.extraLightBackgroundGray,
    child: SafeArea(
      child: Row(
        children: [
          // Contact groups list:
          SizedBox(
            width: 320,
            child: Text('Sidebar placeholder'), // Temporary
          ),
          // Divider:
          Container(
            width: 1,
            color: CupertinoColors.separator,
          ),
          // List detail view:
          Expanded(
            child: Text('Details placeholder'), // Temporary
          ),
        ],
      ),
    ),
  );
}
```

This layout creates the following:

这个布局创建了以下内容：

- A fixed-width sidebar (320 pixels) for contact groups.
  一个固定宽度的侧边栏（320 像素），用于显示联系人分组。
- A 1-pixel divider between the panels.
  面板之间的 1 像素分隔线。
- A details panel that uses an `Expanded` widget to take the remaining space.
  一个使用 `Expanded` widget 占据剩余空间的详情面板。

### Test the adaptive layout

### 测试自适应布局

Hot reload your app and test the responsive behavior.
If you're running in Chrome, you can resize the browser window to
see the layout change:

热重载你的应用并测试响应式行为。如果你正在 Chrome 中运行，可以调整浏览器窗口大小来查看布局变化：

- **Wide window (> 600px)**:
  Shows placeholder text for the sidebar and details side-by-side.
  **宽窗口（> 600px）**：
  并排显示侧边栏和详情的占位文本。
- **Narrow window (< 600px)**:
  Shows only the contact groups page.
  **窄窗口（< 600px）**：
  仅显示联系人分组页面。

Both the sidebar and main content area show placeholder text for now.

目前侧边栏和主内容区域都显示占位文本。

In the next lesson, you'll implement slivers to fill in
the contact list content.

在下一课中，你将实现 sliver 来填充联系人列表内容。

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Created responsive layouts with LayoutBuilder
    icon: fit_screen
    details: >-
      `LayoutBuilder` provides the parent's size constraints in
      its builder callback. By checking `constraints.maxWidth`,
      you can decide which layout to show based on available space.
  - title: Detected screen size to choose different layouts
    icon: devices
    details: >-
      You used a 600-pixel breakpoint to
      distinguish phone-sized screens from tablet-sized screens.
      This common threshold helps your app adapt its UI to
      provide the best experience on each device.
  - title: Built a sidebar and detail layout for large screens
    icon: view_sidebar
    details: >-
      On large screens, you displayed a fixed-width sidebar and
      an `Expanded` detail panel side-by-side using a `Row`.
      This classic pattern maximizes screen real estate on tablets and desktops.
</SummaryCard>

### Test yourself

### 自测

<Quiz title="Adaptive Layout Quiz">
- question: What information does LayoutBuilder provide to its builder callback?
  options:
    - text: The device's operating system and screen orientation.
      correct: false
      explanation: LayoutBuilder provides size constraints, not OS or orientation info.
    - text: The parent's size constraints, including maximum width and height.
      correct: true
      explanation: LayoutBuilder's builder receives BoxConstraints that tell you the available space from the parent.
    - text: The current theme colors and typography.
      correct: false
      explanation: Theme data comes from Theme.of(context), not LayoutBuilder.
    - text: The number of child widgets in the tree.
      correct: false
      explanation: LayoutBuilder provides layout constraints, not widget tree information.
- question: In a large screen layout, which widget can be used to place a sidebar and details panel side-by-side?
  options:
    - text: Column
      correct: false
      explanation: Column arranges widgets vertically, not side-by-side.
    - text: Row
      correct: true
      explanation: Row arranges its children horizontally, making it ideal for placing a sidebar and details panel side-by-side.
    - text: Stack
      correct: false
      explanation: Stack overlaps widgets on top of each other, not side-by-side.
    - text: ListView
      correct: false
      explanation: ListView is for scrollable lists, not for side-by-side layout.
</Quiz>
