---
# title: Migrating from flutter_driver
title: 从 flutter_driver 迁移
# description: >-
#   Learn how to migrate existing flutter_driver tests to integration_test.
description: >-
  了解如何把现有的 flutter_driver 测试迁移到 integration_test。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

<?code-excerpt path-base="integration_test_migration/"?>

This page describes how to migrate an existing project using
`flutter_driver` to the `integration_test` package,
in order to run integration tests.

本页介绍如何把使用 `flutter_driver` 的现有项目
迁移到 `integration_test` package，以便运行集成测试。

Tests with `integration_test` use the same methods that are
used in [widget testing][].

`integration_test` 的测试使用与 [widget 测试][widget testing] 相同的方法。

For an introduction to the `integration_test` package,
check out the [Integration testing][] guide.

要了解 `integration_test` package，
请查阅 [集成测试][Integration testing] 指南。

## Starter example project

## 入门示例项目

The project in this guide is a small example desktop application with this
functionality:

本指南中的项目是一个小型示例桌面应用，功能如下：

* On the left, there's a list of plants that the user can scroll,
  tap and select.

  左侧是植物列表，用户可以滚动、点按并选择。

* On the right, there's a details screen that displays the plant name
  and species.

  右侧是详情界面，显示植物名称和物种。

* On app start, when no plant is selected, a text asking the user to select
  a plant is displayed

  应用启动时，如果没有选中植物，
  会显示一段文字，请用户选择一种植物。

* The list of plants is loaded from a local JSON file located in the
  `/assets` folder.

  植物列表从 `/assets` 文件夹中的本地 JSON 文件加载。

<img src='/assets/images/docs/integration-test/migration-1.png' alt="Starter project screenshot">

You can find the full code example in the [Example Project][] folder.

完整代码示例见 [示例项目][Example Project] 文件夹。

## Existing tests

## 现有测试

The project contains the three `flutter_driver` tests
performing the following checks:

项目包含三个 `flutter_driver` 测试，执行以下检查：

* Verifying the initial status of the app.

  验证应用的初始状态。

* Selecting the first item on the list of plants.

  选择植物列表中的第一项。

* Scrolling and selecting the last item on the list of plants.

  滚动并选择植物列表中的最后一项。

The tests are contained in the `test_driver` folder,
inside the `main_test.dart` file.

测试位于 `test_driver` 文件夹的 `main_test.dart` 文件中。

In this folder there's also a file named `main.dart`,
which contains a call to the method `enableFlutterDriverExtension()`.
This file won't be necessary anymore when using `integration_test`.

该文件夹中还有一个名为 `main.dart` 的文件，
其中调用了 `enableFlutterDriverExtension()` 方法。
使用 `integration_test` 之后，这个文件不再需要。

## Setup

## 配置

To start using the `integration_test` package,
add the `integration_test` to
your `pubspec.yaml` file if you haven't yet:

要开始使用 `integration_test` package，
如果还没有添加，请把它加入 `pubspec.yaml`：

```yaml
dev_dependencies:
  integration_test:
    sdk: flutter
```

Next, in your project, create a new directory
`integration_test/`, create your tests files there
with the format: `<name>_test.dart`.

接下来，在项目中新建目录 `integration_test/`，
并在其中按 `<name>_test.dart` 的格式创建测试文件。

## Test migration

## 测试迁移

This section contains different examples on how to migrate existing
`flutter_driver` tests to `integration_test` tests.

本节给出若干示例，说明如何把现有的
`flutter_driver` 测试迁移为 `integration_test` 测试。

### Example: Verifying a widget is displayed

### 示例：验证 widget 是否显示

When the app starts the screen on the right displays
a text asking the user to select one of the plants on the list.

应用启动时，右侧界面会显示一段文字，
请用户从列表中选择一种植物。

This test verifies that the text is displayed.

此测试验证这段文字已显示。

**flutter_driver**

**flutter_driver 测试**

In `flutter_driver`, the test uses `waitFor`,
which waits until the `finder` can locate the widget.
The test fail if the widget can't be found.

在 `flutter_driver` 中，测试使用 `waitFor`，
它会一直等到 `finder` 能定位到该 widget。
如果找不到 widget，测试就会失败。

<?code-excerpt "test_driver/main_test.dart (wait-for)"?>
```dart
test(
  'do not select any item, verify please select text is displayed',
  () async {
    // Wait for 'please select' text is displayed
    await driver.waitFor(find.text('Please select a plant from the list.'));
  },
);
```

**integration_test**

**integration_test 测试**

In `integration_test` you have to perform two steps:

在 `integration_test` 中需要执行两个步骤：

1. First load the main app widget using
   the `tester.pumpWidget` method.

   首先用 `tester.pumpWidget` 方法加载应用的主 widget。

2. Then, use `expect` with the matcher `findsOneWidget` to verify
   that the widget is displayed.

   然后用 `expect` 和匹配器 `findsOneWidget`
   验证该 widget 已显示。

<?code-excerpt "integration_test/main_test.dart (finds-one)"?>
```dart
testWidgets(
  'do not select any item, verify please select text is displayed',
  (tester) async {
    // load the PlantsApp widget
    await tester.pumpWidget(const PlantsApp());

    // wait for data to load
    await tester.pumpAndSettle();

    // Find widget with 'please select'
    final finder = find.text('Please select a plant from the list.');

    // Check if widget is displayed
    expect(finder, findsOneWidget);
  },
);
```

### Example: Tap actions

### 示例：点按操作

This test performs a tap action on the first item on the list,
which is a `ListTile` with the text "Alder".

此测试会点按列表中的第一项，
也就是文本为 "Alder" 的 `ListTile`。

After the tap, the test waits for the details to appear.
In this case, it waits for the widget with the text "Alnus" to
be displayed.

点按之后，测试会等待详情出现。
这里它等待文本为 "Alnus" 的 widget 显示出来。

Also , the test verifies that the text
"Please select a plant from the list."
is no longer displayed.

此外，测试还会验证文本
"Please select a plant from the list."
不再显示。

**flutter_driver**

**flutter_driver 测试**

In `flutter_driver`, use the `driver.tap` method to perform
a tap over a widget using a finder.

在 `flutter_driver` 中，使用 `driver.tap` 方法，
通过 finder 对 widget 执行点按。

To verify that a widget is not displayed,
use the `waitForAbsent` method.

要验证某个 widget 没有显示，
使用 `waitForAbsent` 方法。

<?code-excerpt "test_driver/main_test.dart (wait-for-absent)"?>
```dart
test('tap on the first item (Alder), verify selected', () async {
  // find the item by text
  final item = find.text('Alder');

  // Wait for the list item to appear.
  await driver.waitFor(item);

  // Emulate a tap on the tile item.
  await driver.tap(item);

  // Wait for species name to be displayed
  await driver.waitFor(find.text('Alnus'));

  // 'please select' text should not be displayed
  await driver.waitForAbsent(
    find.text('Please select a plant from the list.'),
  );
});
```

**integration_test**

**integration_test 测试**

In `integration_test`, use `tester.tap` to perform the tap actions.

在 `integration_test` 中，使用 `tester.tap` 执行点按。

After the tap action, you must call to `tester.pumpAndSettle` to wait
until the action has finished, and all the UI changes have happened.

点按之后，必须调用 `tester.pumpAndSettle`，
等到操作结束并且所有界面变化都已发生。

To verify that a widget is not displayed, use the same `expect`
function with the `findsNothing` matcher.

要验证某个 widget 没有显示，
同样使用 `expect` 函数，并配合 `findsNothing` 匹配器。

<?code-excerpt "integration_test/main_test.dart (finds-nothing)"?>
```dart
testWidgets('tap on the first item (Alder), verify selected', (tester) async {
  await tester.pumpWidget(const PlantsApp());

  // wait for data to load
  await tester.pumpAndSettle();

  // find the item by text
  final item = find.text('Alder');

  // assert item is found
  expect(item, findsOneWidget);

  // Emulate a tap on the tile item.
  await tester.tap(item);
  await tester.pumpAndSettle();

  // Species name should be displayed
  expect(find.text('Alnus'), findsOneWidget);

  // 'please select' text should not be displayed
  expect(find.text('Please select a plant from the list.'), findsNothing);
});
```

### Example: Scrolling

### 示例：滚动

This test is similar to the previous test,
but it scrolls down and taps the last item instead.

此测试与上一个测试类似，
但改为向下滚动并点按最后一项。

**flutter_driver**

**flutter_driver 测试**

To scroll down with `flutter_driver`,
use the `driver.scroll` method.

要用 `flutter_driver` 向下滚动，
使用 `driver.scroll` 方法。

You must provide the widget to perform the scrolling action,
as well as a duration for the scroll.

你必须提供要执行滚动的 widget，以及滚动的时长。

You also have to provide the total offset for the scrolling action.

你还需要提供滚动操作的总偏移量。

<?code-excerpt "test_driver/main_test.dart (scroll)"?>
```dart
test('scroll, tap on the last item (Zedoary), verify selected', () async {
  // find the list of plants, by Key
  final listFinder = find.byValueKey('listOfPlants');

  // Scroll to the last position of the list
  // a -100,000 pixels is enough to reach the bottom of the list
  await driver.scroll(
    listFinder,
    0,
    -100000,
    const Duration(milliseconds: 500),
  );

  // find the item by text
  final item = find.text('Zedoary');

  // Wait for the list item to appear.
  await driver.waitFor(item);

  // Emulate a tap on the tile item.
  await driver.tap(item);

  // Wait for species name to be displayed
  await driver.waitFor(find.text('Curcuma zedoaria'));

  // 'please select' text should not be displayed
  await driver.waitForAbsent(
    find.text('Please select a plant from the list.'),
  );
});
```

**integration_test**

**integration_test 测试**

With `integration_test`, can use the method `tester.scrollUntilVisible`.

使用 `integration_test` 时，可以使用 `tester.scrollUntilVisible` 方法。

Instead of providing the widget to scroll,
provide the item that you're searching for.
In this case, you're searching for the
item with the text "Zedoary",
which is the last item on the list.

不必提供要滚动的 widget，
而是提供你要查找的条目。
这里要查找文本为 "Zedoary" 的条目，
它是列表的最后一项。

The method searches for any `Scrollable` widget
and performs the scrolling action using the given offset.
The action repeats until the item is visible.

该方法会查找任意 `Scrollable` widget，
并按给定偏移量执行滚动。
这个操作会重复，直到该条目可见。

<?code-excerpt "integration_test/main_test.dart (scroll)"?>
```dart
testWidgets('scroll, tap on the last item (Zedoary), verify selected', (
  tester,
) async {
  await tester.pumpWidget(const PlantsApp());

  // wait for data to load
  await tester.pumpAndSettle();

  // find the item by text
  final item = find.text('Zedoary');

  // finds Scrollable widget and scrolls until item is visible
  // a 100,000 pixels is enough to reach the bottom of the list
  await tester.scrollUntilVisible(item, 100000);

  // assert item is found
  expect(item, findsOneWidget);

  // Emulate a tap on the tile item.
  await tester.tap(item);
  await tester.pumpAndSettle();

  // Wait for species name to be displayed
  expect(find.text('Curcuma zedoaria'), findsOneWidget);

  // 'please select' text should not be displayed
  expect(find.text('Please select a plant from the list.'), findsNothing);
});
```

[Integration testing]: /testing/integration-tests
[widget testing]: /testing/overview#widget-tests
[Example Project]: {{site.repo.this}}/tree/main/examples/integration_test_migration
