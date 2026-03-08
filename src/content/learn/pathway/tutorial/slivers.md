---
#title: Advanced scrolling and slivers
title: 高级滚动与 sliver
#description: Learn how to implement performant scrolling with slivers.
description: 学习如何使用 sliver 实现高性能滚动。
layout: tutorial
---

In this lesson, you'll learn about slivers,
which are special widgets that can take advantage of
Flutter's powerful and composable scrolling system.
Slivers enable you to create sophisticated scroll effects,
including collapsible headers, search integration, and custom scroll behaviors.
By the end of this section, you'll understand how to
use `CustomScrollView`, create navigation bars that collapse,
and organize content in scrollable sections.

在本课程中，你将学习 sliver——
一种能够充分利用 Flutter 强大且可组合的滚动系统的特殊 widget。
Sliver 使你能够创建复杂的滚动效果，
包括可折叠的头部、搜索集成以及自定义滚动行为。
在本节结束时，你将了解如何使用 `CustomScrollView`、
创建可折叠的导航栏，以及在可滚动区域中组织内容。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Understand slivers and how they differ from widgets
    icon: view_day
  - title: Build scrollable layouts with CustomScrollView
    icon: unfold_more
  - title: Create collapsible navigation bars with search
    icon: search
  - title: Organize contacts in alphabetized sections
    icon: sort_by_alpha
</SummaryCard>

---

### Slivers and widgets

### Sliver 和 widget

Slivers are scrollable areas that can be composed together in a
`CustomScrollView` or other scroll views.
Think of slivers as building blocks that each
contribute a portion of the overall scrollable content.

Sliver 是可以在 `CustomScrollView` 或其他滚动视图中组合使用的可滚动区域。
可以将 sliver 理解为构建块，每个 sliver 都贡献了整体可滚动内容的一部分。

While slivers and widgets are both fundamental Flutter concepts,
they serve different purposes and aren't interchangeable.

虽然 sliver 和 widget 都是 Flutter 的基本概念，
但它们有着不同的用途，且不可互换。

- **Widgets** are general UI building blocks that
  can be used anywhere in your widget tree.
  **Widget** 是通用的 UI 构建块，
  可以在 widget 树的任何位置使用。
- **Slivers** are specialized widgets designed specifically for
  scrollable layouts and have some constraints:
  **Sliver** 是专门为可滚动布局设计的特殊 widget，
  并且有一些约束：

- Slivers can **only** be direct children of scroll views, such as
  `CustomScrollView` and `NestedScrollView`.
  Sliver **只能**作为滚动视图的直接子级，例如
  `CustomScrollView` 和 `NestedScrollView`。
- Some scroll views **only** accept slivers as children.
  You can't pass regular widgets to `CustomScrollView.slivers`.
  某些滚动视图**只**接受 sliver 作为子级。
  你不能将普通 widget 传递给 `CustomScrollView.slivers`。
- To use regular widgets within a sliver context,
  wrap them in `SliverToBoxAdapter` or `SliverFillRemaining`.
  要在 sliver 上下文中使用普通 widget，
  请将它们包裹在 `SliverToBoxAdapter` 或 `SliverFillRemaining` 中。

This architectural separation allows Flutter to
optimize scrolling performance while it maintains clear boundaries between
different types of UI components.

这种架构上的分离使 Flutter 能够优化滚动性能，
同时在不同类型的 UI 组件之间保持清晰的边界。

### Add a basic sliver structure to contact groups

### 为联系人分组添加基本的 sliver 结构

First, replace the placeholder content in your contact groups page.
To avoid duplicating code between the phone layout and the tablet sidebar,
you can create a private, reusable widget.

首先，替换联系人分组页面中的占位内容。
为了避免在手机布局和平板侧边栏之间重复代码，
你可以创建一个私有的、可复用的 widget。

Update `lib/screens/contact_groups.dart` by
adding `_ContactGroupsView` to the bottom of the file.

更新 `lib/screens/contact_groups.dart`，
在文件底部添加 `_ContactGroupsView`。

```dart title="lib/screens/contact_groups.dart"
// New imports
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/main.dart';

// ... ContactGroupsPage widget ...

// New
class _ContactGroupsView extends StatelessWidget {
  const _ContactGroupsView({
    required this.onListSelected,
    this.selectedListId,
  });

  final int? selectedListId;
  final Function(ContactGroup) onListSelected;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: CustomScrollView(
        slivers: [
          const CupertinoSliverNavigationBar(
            largeTitle: Text('Lists'),
          ),
          SliverFillRemaining(
            child: ValueListenableBuilder<List<ContactGroup>>(
              valueListenable: contactGroupsModel.listsNotifier,
              builder: (context, contactLists, child) {
                return CupertinoListSection.insetGrouped(
                  header: const Text('iPhone'),
                  children: [
                    for (final ContactGroup contactList in contactLists)
                      CupertinoListTile(
                        title: Text(contactList.label),
                        onTap: () => onListSelected(contactList),
                      ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

This private widget contains the shared UI for
displaying the list of contact groups.
On small screens, it will be used as a page, and on
large screens it will be used to fill the left column.

这个私有 widget 包含了用于显示联系人分组列表的共享 UI。
在小屏幕上，它将作为一个页面使用；
在大屏幕上，它将用于填充左侧栏。

This widget introduces several slivers:

这个 widget 引入了几种 sliver：

- `CupertinoSliverNavigationBar`:
  An opinionated navigation bar that collapses as the page scrolls.
  `CupertinoSliverNavigationBar`：
  一个自带样式的导航栏，会随着页面滚动而折叠。
- `SliverList`:
  A scrollable list of items.
  `SliverList`：
  一个可滚动的列表项。
- `SliverFillRemaining`:
  A sliver that takes up the remaining space in
  the scroll area, and whose child is a non-sliver widget.
  `SliverFillRemaining`：
  一个占据滚动区域剩余空间的 sliver，
  其子级是非 sliver widget。

It accepts a callback function, `onListSelected`, to handle taps,
which makes it adaptable for both navigation and sidebar selection.

它接受一个回调函数 `onListSelected` 来处理点击事件，
这使它既适用于导航，也适用于侧边栏选择。

Now, update `ContactGroupsPage` to use your new `_ContactGroupsView` widget:

现在，更新 `ContactGroupsPage` 以使用新的 `_ContactGroupsView` widget：

```dart title="lib/screens/contact_groups.dart"
class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        // TODO: Implement navigation lesson.
        debugPrint(list.toString());
      },
    );
  }
}
// ... _ContactGroupsView from above
```

This structure keeps the `ContactGroupsPage` clean and
focused on its primary responsibility: navigation,
which you'll learn about in the next section of this tutorial.

这种结构使 `ContactGroupsPage` 保持简洁，
并专注于其主要职责：导航——
你将在本教程的下一节中学习相关内容。

### Enhance the list with icons and visual elements

### 使用图标和视觉元素增强列表

Now, add icons and contact counts to make the list more informative.
Add this `_buildTrailing` helper method to your `_ContactGroupsView` class:

现在，添加图标和联系人计数，使列表更具信息量。
将以下 `_buildTrailing` 辅助方法添加到 `_ContactGroupsView` 类中：

```dart title="lib/screens/contact_groups.dart"
// Inside _ContactGroupsView:

Widget _buildTrailing(List<Contact> contacts, BuildContext context) {
  final TextStyle style = CupertinoTheme.of(
    context,
  ).textTheme.textStyle.copyWith(color: CupertinoColors.systemGrey);

  return Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Text(contacts.length.toString(), style: style),
      const Icon(
        CupertinoIcons.forward,
        color: CupertinoColors.systemGrey3,
        size: 18,
      ),
    ],
  );
}
```

This helper creates the trailing content for each list item.
It shows the contact count and a forward arrow.

这个辅助方法为每个列表项创建尾部内容，
显示联系人数量和一个前进箭头。

Now, update the `CupertinoListSection` in `_ContactGroupsView` to
use icons and the trailing helper. Update the code within the
`ListenableBuilder.builder` callback in the `build` method:

现在，更新 `_ContactGroupsView` 中的 `CupertinoListSection`，
使用图标和尾部辅助方法。更新 `build` 方法中
`ListenableBuilder.builder` 回调内的代码：

```dart title="lib/screens/contact_groups.dart"
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact.dart';
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/main.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        // TODO: Implement navigation lesson.
        debugPrint(list.toString());
      },
    );
  }
}

class _ContactGroupsView extends StatelessWidget {
  const _ContactGroupsView({
    required this.onListSelected,
    this.selectedListId,
  });

  final int? selectedListId;
  final Function(ContactGroup) onListSelected;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: CustomScrollView(
        slivers: [
          const CupertinoSliverNavigationBar(
            largeTitle: Text('Lists'),
          ),
          SliverFillRemaining(
            child: ValueListenableBuilder<List<ContactGroup>>(
              valueListenable: contactGroupsModel.listsNotifier,
              builder: (context, contactLists, child) {

                // New from here:
                const groupIcon = Icon(
                  CupertinoIcons.group,
                  weight: 900,
                  size: 32,
                );

                const pairIcon = Icon(
                  CupertinoIcons.person_2,
                  weight: 900,
                  size: 24,
                );

                return CupertinoListSection.insetGrouped(
                  header: const Text('iPhone'),
                  children: [
                    for (final ContactGroup contactList in contactLists)
                      CupertinoListTile(
                        leading: contactList.id == 0 ? groupIcon : pairIcon,
                        title: Text(contactList.label),
                        trailing: _buildTrailing(contactList.contacts, context),
                        onTap: () => onListSelected(contactList),
                      ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTrailing(List<Contact> contacts, BuildContext context) {
    //...
  }
}
```

The updated code now shows icons that differentiate between the
main "All iPhone" group and user-created groups, along with
contact counts and navigation indicators.

更新后的代码现在会显示图标来区分主要的"All iPhone"分组
和用户创建的分组，同时还显示联系人数量和导航指示器。

### Create advanced scrolling for contacts

### 为联系人创建高级滚动效果

Now, work on the contacts page. Just like before,
you'll create a private, reusable view to avoid code duplication.

现在，开始处理联系人页面。和之前一样，
你将创建一个私有的、可复用的视图以避免代码重复。

In the next lesson, you'll implement navigation for small screens.
To see your progress on the contacts list page in the meantime,
update `AdaptiveLayout` to display the contacts list page:

在下一课中，你将实现小屏幕的导航功能。
在此期间，为了查看联系人列表页面的进展，
请更新 `AdaptiveLayout` 以显示联系人列表页面：

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
          return const ContactsListPage(listId: 0); // New, temporary
        }
      },
    );
  }
}
```

Update `lib/screens/contacts.dart` by adding `_ContactListView` to
the bottom of the file:

更新 `lib/screens/contacts.dart`，
在文件底部添加 `_ContactListView`：

```dart title="lib/screens/contacts.dart"
class _ContactListView extends StatelessWidget {
  const _ContactListView({
    required this.listId,
    this.automaticallyImplyLeading = true,
  });

  final int listId;
  final bool automaticallyImplyLeading;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final ContactGroup contactList =
              contactGroupsModel.findContactList(listId);

          return CustomScrollView(
            slivers: [
              CupertinoSliverNavigationBar(
                largeTitle: Text(contactList.title),
                automaticallyImplyLeading: automaticallyImplyLeading,
              ),
              SliverFillRemaining(
                child: Center(
                  child: Text(
                      '${contactList.contacts.length} contacts in ${contactList.label}'),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
```

Now, update `ContactListsPage` to use this view:

现在，更新 `ContactListsPage` 以使用此视图：

```dart title="lib/screens/contacts.dart"
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/main.dart';

class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(listId: listId);
  }
}

// ... _ContactListView from above.
```

This basic implementation demonstrates how to use slivers with dynamic
data in a reusable component.

这个基本实现展示了如何在可复用的组件中将 sliver 与动态数据结合使用。

### Add search integration with slivers

### 为 sliver 添加搜索集成

Now, enhance the contacts page with integrated search functionality UI.
Update the `CustomScrollView` in `_ContactListView` to use the
`CupertinoSliverNavigationBar.search` constructor instead of the
default `CupertinoSliverNavigationBar` constructor:

现在，通过集成搜索功能 UI 来增强联系人页面。
更新 `_ContactListView` 中的 `CustomScrollView`，使用
`CupertinoSliverNavigationBar.search` 构造函数代替
默认的 `CupertinoSliverNavigationBar` 构造函数：

```dart
class _ContactListView extends StatelessWidget {
  const _ContactListView({
    required this.listId,
  });

  final int listId;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final ContactGroup contactList = contactGroupsModel.findContactList(
            listId,
          );

          return CustomScrollView(
            slivers: [
              // New
              CupertinoSliverNavigationBar.search(
                largeTitle: Text(contactList.title),
                searchField: const CupertinoSearchTextField(
                  suffixIcon: Icon(CupertinoIcons.mic_fill),
                  suffixMode: OverlayVisibilityMode.always,
                ),
              ),
              SliverFillRemaining(
                child: Center(
                  child: Text(
                    '${contactList.contacts.length} contacts in ${contactList.label}',
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

```

The `CupertinoSliverNavigationBar.search` constructor provides
integrated search functionality. As you scroll down,
the search field smoothly transitions into the collapsed navigation bar.

`CupertinoSliverNavigationBar.search` 构造函数提供了
集成的搜索功能。当你向下滚动时，
搜索框会平滑地过渡到折叠的导航栏中。

### Create alphabetized contact sections

### 创建按字母排序的联系人分区

Real-world contact apps organize contacts alphabetically.
To do this, create sections for each letter.
Add the following widget to the bottom of your `contacts.dart` file.
This widget doesn't contain any slivers.

现实中的联系人应用会按字母顺序组织联系人。
为此，需要为每个字母创建分区。
将以下 widget 添加到 `contacts.dart` 文件的底部。
这个 widget 不包含任何 sliver。

```dart title="lib/screens/contacts.dart"
// ...

class ContactListSection extends StatelessWidget {
  const ContactListSection({
    super.key,
    required this.lastInitial,
    required this.contacts,
  });

  final String lastInitial;
  final List<Contact> contacts;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsetsDirectional.fromSTEB(20, 0, 20, 0),
      child: Column(
        children: [
          const SizedBox(height: 15),
          Align(
            alignment: AlignmentDirectional.bottomStart,
            child: Text(
              lastInitial,
              style: const TextStyle(
                color: CupertinoColors.systemGrey,
                fontSize: 15,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          CupertinoListSection(
            backgroundColor: CupertinoColors.systemBackground,
            dividerMargin: 0,
            additionalDividerMargin: 0,
            topMargin: 4,
            children: [
              for (final Contact contact in contacts)
                CupertinoListTile(
                  padding: EdgeInsets.all(0),
                  title: Text('${contact.firstName} ${contact.lastName}'),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
```

This widget creates the familiar alphabetized sections that
you see in the iOS Contacts app.

这个 widget 创建了你在 iOS 通讯录应用中看到的熟悉的字母分区样式。

### Use `SliverList` for the alphabetized sections

### 使用 `SliverList` 展示按字母排序的分区

Now, replace the placeholder content in `_ContactListView` with
the alphabetized sections:

现在，用按字母排序的分区替换 `_ContactListView` 中的占位内容：

```dart title="lib/screens/contacts.dart"
// Inside _ContactListView's builder:

final AlphabetizedContactMap contacts = contactList.alphabetizedContacts;

return CustomScrollView(
  slivers: [
    CupertinoSliverNavigationBar.search(
      largeTitle: Text(contactList.title),
      automaticallyImplyLeading: automaticallyImplyLeading,
      searchField: const CupertinoSearchTextField(
        suffixIcon: Icon(CupertinoIcons.mic_fill),
        suffixMode: OverlayVisibilityMode.always,
      ),
    ),
    SliverList.list(
      children: [
        const SizedBox(height: 20),
        ...contacts.keys.map(
          (String initial) => ContactListSection(
            lastInitial: initial,
            contacts: contacts[initial]!,
          ),
        ),
      ],
    ),
  ],
);
```

`SliverList.list` allows you to provide a list of widgets that
become part of the scrollable content. This is the simplest way to
add a list of normal widgets to a scrollable sliver area.

`SliverList.list` 允许你提供一组 widget，
使其成为可滚动内容的一部分。这是将普通 widget 列表
添加到可滚动 sliver 区域的最简单方式。

In the next lesson, you'll learn about stack-based navigation and
update the UI on small screens to navigate between
the contacts list view and the contacts view.

在下一课中，你将学习基于栈的导航，
并更新小屏幕上的 UI，以便在联系人列表视图和联系人视图之间导航。

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Understood slivers and how they differ from widgets
    icon: view_day
    details: >-
      Slivers are specialized widgets for scrollable layouts.
      They can only be direct children of scroll views like `CustomScrollView`.
      In `CustomScrollView` and other sliver contexts, regular widgets must be
      wrapped in `SliverToBoxAdapter` or `SliverFillRemaining`.
  - title: Built scrollable layouts with CustomScrollView
    icon: unfold_more
    details: >-
      `CustomScrollView` lets you compose multiple slivers together.
      You used `CupertinoSliverNavigationBar`, `SliverFillRemaining`,
      and `SliverList` to create sophisticated scrollable interfaces.
  - title: Created collapsible navigation bars with search
    icon: search
    details: >-
      You used the `CupertinoSliverNavigationBar.search` constructor to
      create a collapsible navigation bar with integrated search functionality.
  - title: Organized contacts in alphabetized sections
    icon: sort_by_alpha
    details: >-
      You created `ContactListSection` widgets grouped by last name initial,
      then used `SliverList.list` to add them to the scrollable area.
      This mirrors the familiar iOS Contacts app experience.
</SummaryCard>

### Test yourself

### 自测

<Quiz title="Slivers Quiz">
- question: What is the key difference between slivers and regular widgets?
  options:
    - text: Slivers are faster to render than regular widgets.
      correct: false
      explanation: Both are optimized; the difference is their purpose and context.
    - text: Slivers are specialized widgets designed for scrollable layouts and can only be direct children of scroll views.
      correct: true
      explanation: Slivers work within scroll views like CustomScrollView; regular widgets can be used anywhere.
    - text: Slivers can have an unlimited number of children.
      correct: false
      explanation: Some slivers like SliverList can have many children, but that's not what distinguishes them.
    - text: Slivers automatically handle user gestures.
      correct: false
      explanation: Gesture handling is separate; slivers are about scrollable layout composition.
- question: How do you use a regular widget inside a CustomScrollView's slivers list?
  options:
    - text: Just add it directly; CustomScrollView accepts any widget.
      correct: false
      explanation: CustomScrollView only accepts slivers; regular widgets must be wrapped.
    - text: Wrap it in a SliverToBoxAdapter or SliverFillRemaining.
      correct: true
      explanation: These adapters convert regular widgets into slivers so they can be used in sliver contexts.
    - text: "Convert the widget to a sliver by calling `.toSliver()` on it."
      correct: false
      explanation: "There's no `.toSliver()` method; you use adapter widgets like SliverToBoxAdapter."
    - text: "Pass it to the `child` property instead of `slivers`."
      correct: false
      explanation: CustomScrollView uses the slivers property; there's no child property for this purpose.
</Quiz>
