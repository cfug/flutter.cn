---
# title: Stack-based navigation
title: 基于栈的导航
# description: Learn how to navigate from one page to another in a Flutter app.
description: 学习如何在 Flutter 应用中从一个页面导航到另一个页面。
layout: tutorial
ai-translated: true
---

Learn to navigate between screens with Navigator.push and implement
adaptive navigation patterns for different screen sizes.

学习使用 Navigator.push 在屏幕之间导航，
并为不同屏幕尺寸实现自适应导航模式。

<SummaryCard>
title: 你将完成的内容
items:
  - title: 使用 Navigator.push 在屏幕之间导航
    icon: open_in_new
  - title: 使用 CupertinoPageRoute 实现 iOS 风格转场
    icon: swipe_right
  - title: 为每种屏幕尺寸创建不同的导航模式
    icon: devices
</SummaryCard>

---

### Introduction

### 简介

Now that you understand slivers and scrolling,
you can implement navigation between screens.
In this lesson,
you'll update the small-screen view such that when a contact group is tapped,
it navigates to the contact list for that group.

既然你已理解 sliver 与滚动，
就可以实现屏幕之间的导航。
在本课中，
你将更新小屏视图，使得点击联系人分组时，
会导航到该分组的联系人列表。

First, revert changes in the adaptive layout widget so that it
displays the `ContactGroupsPage` by default on small screens.

首先，还原自适应布局 widget 中的更改，
使其在小屏上默认显示 `ContactGroupsPage`。

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/adaptive_layout.dart (reverted-state)"?>
```dart
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
          return const ContactGroupsPage(); // Reverted
        }
      },
    );
  }
  // ···
}
```

### Add navigation to contact groups

### 为联系人分组添加导航

The `ContactGroupsPage` already uses a `_ContactGroupsView`
and provides it with a callback.
That callback needs to be updated to navigate when a group is tapped,
rather than printing the group to the console.

`ContactGroupsPage` 已使用 `_ContactGroupsView`
并为其提供了回调。
需要更新该回调，使得点击分组时进行导航，
而不是将分组打印到控制台。

Ensure that the `onListSelected` callback and imports in
`lib/screens/contact_groups.dart` are implemented as follows:

确保 `lib/screens/contact_groups.dart` 中的
`onListSelected` 回调和 import 实现如下：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/contact_groups.dart (contact_groups_page)"?>
```dart title="lib/screens/contact_groups.dart"
import 'contacts.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      onListSelected: (list) => Navigator.of(context).push(
        CupertinoPageRoute<void>(
          title: list.title,
          builder: (context) => ContactListsPage(listId: list.id),
        ),
      ),
    );
  }
}
```

This small code block contains the most important new information on this page.

这一小段代码包含本页最重要的新信息。

`Navigator.of(context)` retrieves the
nearest `Navigator` widget from the widget tree.
The `push` method adds a new route to the navigator's stack, and
displays the widget returned from the `builder` property.

`Navigator.of(context)` 从 widget 树中获取最近的 `Navigator` widget。
`push` 方法向 Navigator 的栈添加新路由，
并显示 `builder` 属性返回的 widget。

This is the most basic implementation of using stack-based navigation,
where new screens are pushed on top of the current screen.
To navigate back to the previous screen, you'd use the `Navigator.pop` method.

这是使用基于栈的导航的最基本实现，
新屏幕被 push 到当前屏幕之上。
要返回上一屏幕，可使用 `Navigator.pop` 方法。

`CupertinoPageRoute` creates iOS-style page transitions with
the following features:

`CupertinoPageRoute` 创建 iOS 风格的页面转场，具有以下特性：

- A slide-in animation from the right.

  从右侧滑入的动画。

- Automatic back button support.

  自动支持返回按钮。

- Proper title handling.

  正确的标题处理。

- Swipe-to-go-back gesture support.

  支持滑动返回手势。

### Create the sidebar component for large screens

### 为大屏创建侧边栏组件

For large screens, you need a sidebar that doesn't navigate but
instead updates the main content area.
Thanks to the refactoring in the previous step,
creating this component is more straightforward.
Add this widget to the bottom of `lib/screens/contact_groups.dart`:

对于大屏，你需要一个不进行导航、
而是更新主内容区域的侧边栏。
得益于上一步的重构，
创建该组件更加直接。
将此 widget 添加到 `lib/screens/contact_groups.dart` 底部：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/contact_groups.dart (contact_groups_sidebar)"?>
```dart
/// A sidebar component for selecting contact groups on large screens.
class ContactGroupsSidebar extends StatelessWidget {
  const ContactGroupsSidebar({
    super.key,
    required this.selectedListId,
    required this.onListSelected,
  });

  final int selectedListId;
  final void Function(int) onListSelected;

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: selectedListId,
      onListSelected: (list) => onListSelected(list.id),
    );
  }
}
```

This sidebar component reuses the `_ContactGroupsView` and
provides a different callback. Instead of navigating,
it calls `onListSelected` with the ID of the tapped list.
It also passes the `selectedListId` to `_ContactGroupsView` so that
the selected item can be highlighted.

该侧边栏组件复用 `_ContactGroupsView` 并
提供不同的回调。它不进行导航，
而是用被点击列表的 ID 调用 `onListSelected`。
它还将 `selectedListId` 传给 `_ContactGroupsView`，
以便高亮显示选中项。

### Create the detail view for large screens

### 为大屏创建详情视图

For the large screen layout, you need a detail view that
doesn't show navigation controls. Just like the sidebar,
this can be recreated by reusing the `_ContactListView`.
Add this widget to the bottom of your `contacts.dart` file:

对于大屏布局，你需要一个不显示
导航控件的详情视图。与侧边栏一样，
可以通过复用 `_ContactListView` 来重新创建。
将此 widget 添加到你的 `contacts.dart` 文件底部：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/contacts.dart (contact_list_detail)"?>
```dart
class ContactListDetail extends StatelessWidget {
  const ContactListDetail({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(listId: listId, automaticallyImplyLeading: false);
  }
}
```

The detail view reuses `_ContactListView` and sets
the `automaticallyImplyLeading` parameter to `false` to
hide the back button, as navigation is handled by the sidebar.

详情视图复用 `_ContactListView`，并将
`automaticallyImplyLeading` 参数设为 `false` 以
隐藏返回按钮，因为导航由侧边栏处理。

### Connect the sidebar to the adaptive layout

### 将侧边栏连接到自适应布局

Now, connect the sidebar to your adaptive layout.
Update your `adaptive_layout.dart` file to import the necessary files and
update the large screen layout:

现在，将侧边栏连接到你的自适应布局。
更新 `adaptive_layout.dart` 文件以导入必要文件并更新大屏布局：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/adaptive_layout.dart (imports)"?>
```dart
import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';
import 'contacts.dart';
```

Then update the `_buildLargeScreenLayout` method:

然后更新 `_buildLargeScreenLayout` 方法：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/adaptive_layout.dart (build_large_screen)"?>
```dart
Widget _buildLargeScreenLayout() {
  return CupertinoPageScaffold(
    backgroundColor: CupertinoColors.extraLightBackgroundGray,
    child: SafeArea(
      child: Row(
        children: [
          SizedBox(
            width: 320,
            child: ContactGroupsSidebar(
              selectedListId: selectedListId,
              onListSelected: _onContactListSelected,
            ),
          ),
          Container(width: 1, color: CupertinoColors.separator),
          Expanded(child: ContactListDetail(listId: selectedListId)),
        ],
      ),
    ),
  );
}
```

This code creates the classic menu-detail layout where the sidebar
controls the content of the detail area.

这段代码创建经典的菜单-详情布局，侧边栏
控制详情区域的内容。

### Test the adaptive navigation behavior

### 测试自适应导航行为

Hot reload your app and test the navigation:

热重载应用并测试导航：

**Small screens (<600px width):**

**小屏（宽度 < 600px）：**

- Tap contact groups to navigate to contact details.

  点击联系人分组以导航到联系人详情。

- Use the back button or a swipe gesture to return.

  使用返回按钮或滑动手势返回。

- This is a classic stack-based navigation flow.

  这是经典的基于栈的导航流程。

**Large screens (>600px width):**

**大屏（宽度 > 600px）：**

- Click contact groups in the sidebar to update the detail view.

  在侧边栏中点击联系人分组以更新详情视图。

- There is no navigation stack. The selection updates the content area.

  没有导航栈。选择会更新内容区域。

- This is a master-detail interface pattern.

  这是主从 (master-detail) 界面模式。

The app automatically chooses the
appropriate navigation pattern based on screen size.
This provides an optimal experience on both phones and tablets.

应用会根据屏幕尺寸自动选择
合适的导航模式。
这在手机和平板上都能提供最佳体验。

:::note
If you resize the app from a small screen to a large screen while on
a contact detail page, and then press the back button,
you might see a `Hero` tag exception.
This happens because the `Navigator` still holds the pushed small-screen
route while the large-screen layout simultaneously renders the detail view,
causing duplicate widgets (like the navigation bar) in the widget tree during transition.
This is an expected edge case for this simple architecture and can be ignored
for the purpose of this learning pathway.

如果你在小屏上处于联系人详情页时将应用从小屏放大到大屏，然后按返回键，
你可能会看到 `Hero` tag 异常。
这是因为 `Navigator` 仍持有已 push 的小屏
路由，而大屏布局同时渲染详情视图，
在转场期间导致 widget 树中出现重复 widget（例如导航栏）。
对于这一简单架构，这是预期的边界情况，在本学习路径中可以忽略。
:::

### Review

### 回顾


<SummaryCard>
title: 你已完成的内容
subtitle: 以下是你本课构建与学习内容的摘要。
completed: true
items:
  - title: 使用 Navigator.push 在屏幕之间导航
    icon: open_in_new
    details: >-
      `Navigator.of(context).push` 向导航栈添加新路由。
      这是基于栈的导航的基础，屏幕
      彼此叠加上去，通过 pop 返回。
  - title: 使用 CupertinoPageRoute 实现 iOS 风格转场
    icon: swipe_right
    details: >-
      `CupertinoPageRoute` 提供原生 iOS 导航特性支持：
      从右侧滑入的动画、自动返回按钮、
      正确的标题处理，以及滑动返回手势支持。
  - title: 实现了自适应导航模式
    icon: devices
    details: >-
      你为小屏和大屏设置了不同的导航模式。
      小屏使用基于栈的导航，点击
      分组会 push 新屏幕。
      大屏使用主从模式，选择
      分组会更新详情面板而无需导航。
  - title: 完成了 Rolodex 应用
    icon: celebration
    details: >-
      你已构建完整的 iOS 风格联系人应用，具备
      自适应布局、高级滚动、
      带搜索的可折叠标题和响应式导航。
      这些都是生产应用中常用的模式！
</SummaryCard>

### Test yourself

### 自测

<Quiz title="导航测验">
- question: "`Navigator.of(context).push` 的作用是什么？"
  options:
    - text: 用新屏幕替换当前屏幕。
      correct: false
      explanation: "push 会添加到栈；`pushReplacement` 才会替换当前屏幕。"
    - text: 向导航栈添加新路由，显示在当前屏幕之上。
      correct: true
      explanation: push 将新路由添加到栈，使用户可以返回上一屏幕。
    - text: 从导航栈移除当前屏幕。
      correct: false
      explanation: "那是 `pop` 的作用；push 会添加新屏幕。"
    - text: 在当前屏幕上方打开对话框。
      correct: false
      explanation: "对话框使用 `showDialog`；Navigator.push 用于导航到全屏界面。"
- question: "`Navigator.of(context).pop()` 的作用是什么？"
  options:
    - text: 关闭整个应用。
      correct: false
      explanation: pop 仅移除当前路由；不会关闭应用。
    - text: 从导航栈移除当前路由，返回上一屏幕。
      correct: true
      explanation: pop 从栈顶移除路由，露出其下的屏幕。
    - text: 清除所有路由并显示主屏幕。
      correct: false
      explanation: 那需要 popUntil 或 pushAndRemoveUntil；pop 仅移除栈顶路由。
    - text: 用新数据刷新当前屏幕。
      correct: false
      explanation: pop 用于返回导航；要刷新需使用 setState 或其他状态管理。
</Quiz>
