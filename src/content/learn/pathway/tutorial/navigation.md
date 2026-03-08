---
# title: Stack-based navigation
title: 基于栈的导航
# description: Learn how to navigate from one page to another in a Flutter app.
description: 学习如何在 Flutter 应用中从一个页面导航到另一个页面。
layout: tutorial
---

Learn to navigate between screens with Navigator.push and implement adaptive navigation patterns for different screen sizes.

学习使用 Navigator.push 在页面之间进行导航，并为不同屏幕尺寸实现自适应的导航模式。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Navigate between screens with Navigator.push
    icon: open_in_new
  - title: Use CupertinoPageRoute for iOS-style transitions
    icon: swipe_right
  - title: Create different navigation patterns for each screen size
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

现在你已经理解了 sliver 和滚动机制，
可以开始实现页面之间的导航了。
在本课中，
你将更新小屏幕视图，使得当用户点击联系人分组时，
能够导航到该分组的联系人列表。

First, revert changes in the adaptive layout widget so that it
displays the `ContactGroupsPage` by default on small screens.

首先，还原自适应布局 widget 中的更改，使其在小屏幕上默认显示 `ContactGroupsPage`。

```dart title="lib/screens/adaptive_layout.dart"
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
}
```

### Add navigation to contact groups

### 为联系人分组添加导航

The `ContactGroupsPage` already uses a `_ContactGroupsView`
and provides it with a callback.
That callback needs to be updated to navigate when a group is tapped,
rather than printing the group to the console.

`ContactGroupsPage` 已经使用了 `_ContactGroupsView` 并为其提供了一个回调。
该回调需要更新为在点击分组时执行导航，而不是将分组信息打印到控制台。

Ensure that the `onListSelected` callback in
`lib/screens/contact_groups.dart` is implemented as follows:

确保 `lib/screens/contact_groups.dart` 中的 `onListSelected` 回调实现如下：

```dart title="lib/screens/contact_groups.dart"
class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      onListSelected: (list) => Navigator.of(context).push(
        CupertinoPageRoute(
          title: list.title,
          builder: (context) => ContactListsPage(listId: list.id),
        ),
      ),
    );
  }
}
```

This small code block contains the most important new information on this page.

这段简短的代码包含了本页面最重要的新知识。

`Navigator.of(context)` retrieves the
nearest `Navigator` widget from the widget tree.
The `push` method adds a new route to the navigator's stack, and
displays the widget returned from the `builder` property.

`Navigator.of(context)` 从 widget 树中获取最近的 `Navigator` widget。
`push` 方法会向 Navigator 的栈中添加一个新路由，
并显示 `builder` 属性返回的 widget。

This is the most basic implementation of using stack-based navigation,
where new screens are pushed on top of the current screen.
To navigate back to the previous screen, you'd use the `Navigator.pop` method.

这是基于栈的导航最基本的实现方式，
新页面被 push 到当前页面之上。
要返回上一个页面，可以使用 `Navigator.pop` 方法。

`CupertinoPageRoute` creates iOS-style page transitions with
the following features:

`CupertinoPageRoute` 创建具有以下特性的 iOS 风格页面过渡效果：

- A slide-in animation from the right.
  从右侧滑入的动画。
- Automatic back button support.
  自动支持返回按钮。
- Proper title handling.
  正确的标题处理。
- Swipe-to-go-back gesture support.
  支持滑动返回手势。

### Create the sidebar component for large screens

### 为大屏幕创建侧边栏组件

For large screens, you need a sidebar that doesn't navigate but
instead updates the main content area.
Thanks to the refactoring in the previous step,
creating this component is more straightforward.
Add this widget to the bottom of `lib/screens/contact_groups.dart`:

对于大屏幕，你需要一个不进行导航而是更新主内容区域的侧边栏。
得益于上一步的重构，创建这个组件会更加简单。
将以下 widget 添加到 `lib/screens/contact_groups.dart` 文件底部：

```dart title="lib/screens/contact_groups.dart"
// ...

/// A sidebar component for selecting contact groups, designed for large screens.
class ContactGroupsSidebar extends StatelessWidget {
  const ContactGroupsSidebar({
    super.key,
    required this.selectedListId,
    required this.onListSelected,
  });

  final int selectedListId;
  final Function(int) onListSelected;

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

这个侧边栏组件复用了 `_ContactGroupsView` 并提供了不同的回调。
它不会进行导航，而是使用被点击列表的 ID 调用 `onListSelected`。
同时它还将 `selectedListId` 传递给 `_ContactGroupsView`，
以便高亮显示选中的项目。

### Create the detail view for large screens

### 为大屏幕创建详情视图

For the large screen layout, you need a detail view that
doesn't show navigation controls. Just like the sidebar,
this can be recreated by reusing the `_ContactListView`.
Add this widget to the bottom of your `contacts.dart` file:

对于大屏幕布局，你需要一个不显示导航控件的详情视图。
与侧边栏类似，可以通过复用 `_ContactListView` 来创建。
将以下 widget 添加到 `contacts.dart` 文件底部：

```dart title="lib/screens/contacts.dart"
// ...

/// A detail view component for showing contacts in a specific list.
class ContactListDetail extends StatelessWidget {
  const ContactListDetail({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(
      listId: listId,
      automaticallyImplyLeading: false,
    );
  }
}
```

The detail view reuses `_ContactListView` and sets
the `automaticallyImplyLeading` parameter to `false` to
hide the back button, as navigation is handled by the sidebar.

详情视图复用了 `_ContactListView`，并将
`automaticallyImplyLeading` 参数设置为 `false` 以隐藏返回按钮，
因为导航由侧边栏处理。

### Connect the sidebar to the adaptive layout

### 将侧边栏连接到自适应布局

Now, connect the sidebar to your adaptive layout.
Update your `adaptive_layout.dart` file to import the necessary files and
update the large screen layout:

现在，将侧边栏连接到你的自适应布局中。
更新 `adaptive_layout.dart` 文件，导入必要的文件并更新大屏幕布局：

```dart title="lib/screens/adaptive_layout.dart"
import 'package:flutter/cupertino.dart';
import 'package:rolodex/screens/contact_groups.dart';
import 'package:rolodex/screens/contacts.dart';
```

Then update the `_buildLargeScreenLayout` method:

然后更新 `_buildLargeScreenLayout` 方法：

```dart title="lib/screens/adaptive_layout.dart"
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
          Container(
            width: 1,
            color: CupertinoColors.separator,
          ),
          Expanded(
            child: ContactListDetail(listId: selectedListId),
          ),
        ],
      ),
    ),
  );
}
```

This code creates the classic menu-detail layout where the sidebar
controls the content of the detail area.

这段代码创建了经典的菜单-详情布局，其中侧边栏控制详情区域的内容。

### Test the adaptive navigation behavior

### 测试自适应导航行为

Hot reload your app and test the navigation:

热重载你的应用并测试导航功能：

**Small screens (<600px width):**

**小屏幕（宽度 <600px）：**

- Tap contact groups to navigate to contact details.
  点击联系人分组以导航到联系人详情。
- Use the back button or a swipe gesture to return.
  使用返回按钮或滑动手势返回。
- This is a classic stack-based navigation flow.
  这是经典的基于栈的导航流程。

**Large screens (>600px width):**

**大屏幕（宽度 >600px）：**

- Click contact groups in the sidebar to update the detail view.
  点击侧边栏中的联系人分组以更新详情视图。
- There is no navigation stack. The selection updates the content area.
  没有导航栈。选择操作会更新内容区域。
- This is a master-detail interface pattern.
  这是主从界面模式。

The app automatically chooses the
appropriate navigation pattern based on screen size.
This provides an optimal experience on both phones and tablets.

应用会根据屏幕尺寸自动选择合适的导航模式。
这为手机和平板电脑都提供了最佳体验。

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Navigated between screens with Navigator.push
    icon: open_in_new
    details: >-
      `Navigator.of(context).push` adds a new route to the navigation stack.
      This is the foundation of stack-based navigation, where screens are
      pushed on top of each other and popped to go back.
  - title: Used CupertinoPageRoute for iOS-style transitions
    icon: swipe_right
    details: >-
      `CupertinoPageRoute` provides support for native iOS navigation features:
      slide-in animations from the right, automatic back buttons,
      proper title handling, and swipe-to-go-back gesture support.
  - title: Implemented adaptive navigation patterns
    icon: devices
    details: >-
      You set up different navigation patterns for small and large screens.
      Small screens use stack-based navigation where
      tapping a group pushes a new screen.
      Large screens use a master-detail pattern where selecting
      a group updates the detail panel without navigation.
  - title: Completed the Rolodex app
    icon: celebration
    details: >-
      You've built a complete iOS-style contacts app with
      adaptive layouts, advanced scrolling,
      collapsible headers with search, and responsive navigation.
      These are common patterns used in production apps!
</SummaryCard>

### Test yourself

### 自测

<Quiz title="Navigation Quiz">
- question: "What does `Navigator.of(context).push` do?"
  options:
    - text: Replaces the current screen with a new one.
      correct: false
      explanation: "Push adds to the stack; `pushReplacement` replaces the current screen."
    - text: Adds a new route to the navigation stack, displaying it on top of the current screen.
      correct: true
      explanation: Push adds the new route to the stack, allowing users to go back to the previous screen.
    - text: Removes the current screen from the navigation stack.
      correct: false
      explanation: "That's what `pop` does; push adds a new screen."
    - text: Opens a dialog box over the current screen.
      correct: false
      explanation: "Dialogs use `showDialog`; Navigator.push navigates to a full screen."
- question: "What does `Navigator.of(context).pop()` do?"
  options:
    - text: Closes the entire app.
      correct: false
      explanation: Pop only removes the current route; it doesn't close the app.
    - text: Removes the current route from the navigation stack, returning to the previous screen.
      correct: true
      explanation: Pop removes the top route from the stack, revealing the screen beneath it.
    - text: Clears all routes and shows the home screen.
      correct: false
      explanation: That would require popUntil or pushAndRemoveUntil; pop removes only the top route.
    - text: Refreshes the current screen with new data.
      correct: false
      explanation: Pop navigates back; to refresh, you'd use setState or other state management.
</Quiz>
