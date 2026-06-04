---
# title: Advanced scrolling and slivers
title: 高级滚动与 sliver
# description: Learn how to implement performant scrolling with slivers.
description: 学习如何使用 sliver 实现高性能滚动。
layout: tutorial
ai-translated: true
---

<?code-excerpt replace="/ *\/\/\s+ignore_for_file:[^\n]+\n//g;"?>

In this lesson, you'll learn about slivers,
which are special widgets that can take advantage of
Flutter's powerful and composable scrolling system.
Slivers enable you to create sophisticated scroll effects,
including collapsible headers, search integration, and custom scroll behaviors.
By the end of this section, you'll understand how to
use `CustomScrollView`, create navigation bars that collapse,
and organize content in scrollable sections.

在本课中，你将学习 sliver，
它们是能够利用
Flutter 强大且可组合的滚动系统的特殊 widget。
Sliver 让你能够创建复杂的滚动效果，
包括可折叠标题、搜索集成和自定义滚动行为。
在本节结束时，你将了解如何
使用 `CustomScrollView`、创建可折叠的导航栏，
以及在可滚动分区中组织内容。

<SummaryCard>
title: 你将完成的内容
items:
  - title: 理解 sliver 及其与 widget 的区别
    icon: view_day
  - title: 使用 CustomScrollView 构建可滚动布局
    icon: unfold_more
  - title: 创建带搜索的可折叠导航栏
    icon: search
  - title: 按字母顺序分区组织联系人
    icon: sort_by_alpha
</SummaryCard>

---

### Slivers and widgets

### Sliver 与 widget

Slivers are scrollable areas that can be composed together in a
`CustomScrollView` or other scroll views.
Think of slivers as building blocks that each
contribute a portion of the overall scrollable content.

Sliver 是可滚动区域，可以在
`CustomScrollView` 或其他滚动视图中组合在一起。
将 sliver 视为构建块，每个构建块
为整体可滚动内容贡献一部分。

While slivers and widgets are both fundamental Flutter concepts,
they serve different purposes and aren't interchangeable.

虽然 sliver 和 widget 都是 Flutter 的基本概念，
但它们用途不同，不能互换使用。

- **Widgets** are general UI building blocks that
  can be used anywhere in your widget tree.
- **Slivers** are specialized widgets designed specifically for
  scrollable layouts and have some constraints:

- **Widget** 是通用 UI 构建块，可以
  在 widget 树的任何位置使用。
- **Sliver** 是专为
  可滚动布局设计的专用 widget，并具有一些约束：

- Slivers can **only** be direct children of scroll views, such as
  `CustomScrollView` and `NestedScrollView`.
- Some scroll views **only** accept slivers as children.
  You can't pass regular widgets to `CustomScrollView.slivers`.
- To use regular widgets within a sliver context,
  wrap them in `SliverToBoxAdapter` or `SliverFillRemaining`.

- Sliver **只能**作为滚动视图的直接子级，例如
  `CustomScrollView` 和 `NestedScrollView`。
- 某些滚动视图**只**接受 sliver 作为子级。
  你不能将常规 widget 传递给 `CustomScrollView.slivers`。
- 要在 sliver 上下文中使用常规 widget，
  请用 `SliverToBoxAdapter` 或 `SliverFillRemaining` 包裹它们。

This architectural separation allows Flutter to
optimize scrolling performance while it maintains clear boundaries between
different types of UI components.

这种架构分离使 Flutter 能够
优化滚动性能，同时在
不同类型的 UI 组件之间保持清晰的边界。

### Add a basic sliver structure to contact groups

### 为联系人分组添加基本 sliver 结构

First, replace the placeholder content in your contact groups page.
To avoid duplicating code between the phone layout and the tablet sidebar,
you can create a private, reusable widget.

首先，替换联系人分组页面中的占位内容。
为避免在手机布局和平板侧边栏之间重复代码，
你可以创建一个私有的、可复用的 widget。

Update `lib/screens/contact_groups.dart` by
adding `_ContactGroupsView` to the bottom of the file.

通过将 `_ContactGroupsView` 添加到文件底部来
更新 `lib/screens/contact_groups.dart`。

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups_v1.dart (contact_groups_view)"?>
```dart
import 'package:flutter/cupertino.dart';

import '../data/contact_group.dart';
import '../main.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        debugPrint(list.toString());
      },
    );
  }
}

// ···
class _ContactGroupsView extends StatelessWidget {
  const _ContactGroupsView({required this.onListSelected, this.selectedListId});

  final int? selectedListId;
  final void Function(ContactGroup) onListSelected;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: CustomScrollView(
        slivers: [
          const CupertinoSliverNavigationBar(largeTitle: Text('Lists')),
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

此私有 widget 包含用于
显示联系人分组列表的共享 UI。
在小屏幕上，它将作为页面使用；在
大屏幕上，它将用于填充左侧列。

This widget introduces several slivers:

- `CupertinoSliverNavigationBar`:
  An opinionated navigation bar that collapses as the page scrolls.
- `SliverList`:
  A scrollable list of items.
- `SliverFillRemaining`:
  A sliver that takes up the remaining space in
  the scroll area, and whose child is a non-sliver widget.

此 widget 引入了多个 sliver：

- `CupertinoSliverNavigationBar`：
  一种有明确设计取向的导航栏，会随页面滚动而折叠。
- `SliverList`：
  可滚动的项目列表。
- `SliverFillRemaining`：
  占据滚动区域
  剩余空间的 sliver，其子级是非 sliver widget。

It accepts a callback function, `onListSelected`, to handle taps,
which makes it adaptable for both navigation and sidebar selection.

它接受回调函数 `onListSelected` 来处理点击，
这使其既适用于导航，也适用于侧边栏选择。

Now, update `ContactGroupsPage` in `lib/screens/contact_groups.dart` to use your new `_ContactGroupsView` widget:

现在，更新 `lib/screens/contact_groups.dart` 中的 `ContactGroupsPage` 以使用新的 `_ContactGroupsView` widget：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups_v1.dart (contact_groups_page)"?>
```dart
class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        debugPrint(list.toString());
      },
    );
  }
}
```

This structure keeps the `ContactGroupsPage` clean and
focused on its primary responsibility: navigation,
which you'll learn about in the next section of this tutorial.

此结构使 `ContactGroupsPage` 保持简洁，
并专注于其主要职责：导航，
你将在本教程的下一节中学习相关内容。

### Enhance the list with icons and visual elements

### 使用图标和视觉元素增强列表

Now, add icons and contact counts to make the list more informative.
Add this `_buildTrailing` helper method to your
`_ContactGroupsView` class in `lib/screens/contact_groups.dart`:

现在，添加图标和联系人数量以使列表更具信息量。
在 `lib/screens/contact_groups.dart` 中的
`_ContactGroupsView` 类里添加此 `_buildTrailing` 辅助方法：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups.dart (build_trailing)"?>
```dart
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

此辅助方法为每个列表项创建尾部内容。
它显示联系人数量和前进箭头。

Now, update the `CupertinoListSection` in `_ContactGroupsView` to
use icons and the trailing helper. Update the code within the
`ValueListenableBuilder.builder` callback in the `build` method:

现在，更新 `_ContactGroupsView` 中的 `CupertinoListSection` 以
使用图标和尾部辅助方法。更新 `build` 方法中
`ValueListenableBuilder.builder` 回调内的代码：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups.dart (cupertino_list_section)"?>
```dart
child: ValueListenableBuilder<List<ContactGroup>>(
  valueListenable: contactGroupsModel.listsNotifier,
  builder: (context, contactLists, child) {
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
```

The updated code now shows icons that differentiate between the
main "All iPhone" group and user-created groups, along with
contact counts and navigation indicators.

更新后的代码现在显示图标，用于区分
主要的「All iPhone」分组和用户创建的分组，同时还包含
联系人数量和导航指示器。

### Create advanced scrolling for contacts

### 为联系人创建高级滚动

Next, you'll implement the contacts list page.

接下来，你将实现联系人列表页面。

In the next lesson, you'll implement navigation for small screens.
To see your progress on the contacts list page in the meantime, first
update `lib/screens/adaptive_layout.dart` to display the contacts list page:

在下一课中，你将为小屏幕实现导航。
与此同时，要查看联系人列表页面的进度，请先
更新 `lib/screens/adaptive_layout.dart` 以显示联系人列表页面：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/adaptive_layout.dart"?>
```dart

import 'package:flutter/cupertino.dart';

import 'contacts.dart';

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
          return const ContactListsPage(listId: 0); // New, temporary
        }
      },
    );
  }

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
}
```

Update `lib/screens/contacts.dart` by adding `_ContactListView` to
the bottom of the file:

通过将 `_ContactListView` 添加到
文件底部来更新 `lib/screens/contacts.dart`：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts_v1.dart (contact_list_view)"?>
```dart
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
          final contactList = contactGroupsModel.findContactList(listId);

          return CustomScrollView(
            slivers: [
              CupertinoSliverNavigationBar(
                largeTitle: Text(contactList.title),
                automaticallyImplyLeading: automaticallyImplyLeading,
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

Now, update `ContactListsPage` to use this view:

现在，更新 `ContactListsPage` 以使用此视图：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts_v1.dart (contact_lists_page)"?>
```dart
class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(listId: listId);
  }
}
```

This basic implementation demonstrates how to use slivers with dynamic
data in a reusable component.

此基本实现演示了如何在可复用组件中
将 sliver 与动态数据一起使用。

### Add search integration with slivers

### 使用 sliver 添加搜索集成

Now, enhance the contacts page with integrated search functionality UI.
Update the `CustomScrollView` in `_ContactListView` to use the
`CupertinoSliverNavigationBar.search` constructor instead of the
default `CupertinoSliverNavigationBar` constructor:

现在，为联系人页面增强集成的搜索功能 UI。
更新 `_ContactListView` 中的 `CustomScrollView`，使用
`CupertinoSliverNavigationBar.search` 构造函数，而不是
默认的 `CupertinoSliverNavigationBar` 构造函数：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts_v2.dart (search)"?>
```dart
class _ContactListView extends StatelessWidget {
  // ···
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final contactList = contactGroupsModel.findContactList(listId);

          return CustomScrollView(
            slivers: [
              // Now using a search bar:
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

`CupertinoSliverNavigationBar.search` 构造函数提供
集成的搜索功能。当你向下滚动时，
搜索字段会平滑过渡到折叠的导航栏中。

### Create alphabetized contact sections

### 创建按字母分区的联系人区块

Real-world contact apps organize contacts alphabetically.
To do this, create sections for each letter.
Add the following widget to the bottom of your `contacts.dart` file.
This widget doesn't contain any slivers.

真实的联系人应用会按字母顺序组织联系人。
为此，为每个字母创建分区。
将以下 widget 添加到 `contacts.dart` 文件底部。
此 widget 不包含任何 sliver。

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts.dart (contact_list_section)"?>
```dart
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
                  padding: const EdgeInsets.all(0),
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

此 widget 创建你在 iOS 通讯录应用中
看到的熟悉的按字母分区。

### Use `SliverList` for the alphabetized sections

### 使用 `SliverList` 实现按字母分区

Now, replace the placeholder content in `_ContactListView` with
the alphabetized sections:

现在，将 `_ContactListView` 中的占位内容替换为
按字母分区：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts.dart (alphabetized)"?>
```dart
class _ContactListView extends StatelessWidget {
  // ···
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final contactList = contactGroupsModel.findContactList(listId);

          final contacts = contactList.alphabetizedContacts;

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
                    (initial) => ContactListSection(
                      lastInitial: initial,
                      contacts: contacts[initial]!,
                    ),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }
}
```

`SliverList.list` allows you to provide a list of widgets that
become part of the scrollable content. This is the simplest way to
add a list of normal widgets to a scrollable sliver area.

`SliverList.list` 允许你提供一组 widget，
它们成为可滚动内容的一部分。这是将
常规 widget 列表添加到可滚动 sliver 区域的最简单方式。

In the next lesson, you'll learn about stack-based navigation and
update the UI on small screens to navigate between
the contacts list view and the contacts view.

在下一课中，你将学习基于堆栈的导航，
并更新小屏幕上的 UI，以便在
联系人列表视图和联系人视图之间导航。

### Review

### 回顾

<SummaryCard>
title: 你完成的内容
subtitle: 以下是你本课构建与学习内容的摘要。
completed: true
items:
  - title: 理解了 sliver 及其与 widget 的区别
    icon: view_day
    details: >-
      Sliver 是用于可滚动布局的专用 widget。
      它们只能是 `CustomScrollView` 等滚动视图的直接子级。
      在 `CustomScrollView` 和其他 sliver 上下文中，常规 widget 必须
      用 `SliverToBoxAdapter` 或 `SliverFillRemaining` 包裹。
  - title: 使用 CustomScrollView 构建了可滚动布局
    icon: unfold_more
    details: >-
      `CustomScrollView` 让你能够将多个 sliver 组合在一起。
      你使用了 `CupertinoSliverNavigationBar`、`SliverFillRemaining`
      和 `SliverList` 来创建复杂的可滚动界面。
  - title: 创建了带搜索的可折叠导航栏
    icon: search
    details: >-
      你使用了 `CupertinoSliverNavigationBar.search` 构造函数来
      创建带有集成搜索功能的可折叠导航栏。
  - title: 按字母顺序分区组织了联系人
    icon: sort_by_alpha
    details: >-
      你创建了按姓氏首字母分组的 `ContactListSection` widget，
      然后使用 `SliverList.list` 将它们添加到可滚动区域。
      这复现了熟悉的 iOS 通讯录应用体验。
</SummaryCard>

### Test yourself

### 自测

<Quiz title="Sliver 测验">
- question: sliver 与常规 widget 的主要区别是什么？
  options:
    - text: Sliver 的渲染速度比常规 widget 更快。
      correct: false
      explanation: 两者都经过优化；区别在于用途和上下文。
    - text: Sliver 是专为可滚动布局设计的专用 widget，且只能是滚动视图的直接子级。
      correct: true
      explanation: Sliver 在 CustomScrollView 等滚动视图中工作；常规 widget 可在任何地方使用。
    - text: Sliver 可以有无限数量的子级。
      correct: false
      explanation: 某些 sliver（如 SliverList）可以有很多子级，但这不是它们的区别所在。
    - text: Sliver 会自动处理用户手势。
      correct: false
      explanation: 手势处理是独立的；sliver 关乎可滚动布局的组合。
- question: 如何在 CustomScrollView 的 slivers 列表中使用常规 widget？
  options:
    - text: 直接添加即可；CustomScrollView 接受任何 widget。
      correct: false
      explanation: CustomScrollView 只接受 sliver；常规 widget 必须被包裹。
    - text: 用 SliverToBoxAdapter 或 SliverFillRemaining 包裹它。
      correct: true
      explanation: 这些适配器将常规 widget 转换为 sliver，以便在 sliver 上下文中使用。
    - text: "通过调用 `.toSliver()` 将 widget 转换为 sliver。"
      correct: false
      explanation: "没有 `.toSliver()` 方法；你需要使用 SliverToBoxAdapter 等适配器 widget。"
    - text: "将其传递给 `child` 属性，而不是 `slivers`。"
      correct: false
      explanation: CustomScrollView 使用 slivers 属性；没有用于此目的的 child 属性。
</Quiz>
