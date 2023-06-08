---
title: Migrating from flutter_driver
title: 从 flutter_driver 迁移
description: Learn how to migrate existing flutter_driver tests to integration_test.
description: 了解如何将现有的 flutter_driver 测试迁移到 integration_test。
---

<?code-excerpt path-base="integration_test_migration/"?>

This page describes how to migrate an existing project using
`flutter_driver` to the `integration_test` package,
in order to run integration tests.

本篇介绍了如何将使用 `flutter_driver` 的项目
迁移到 `integration_test`，
以便进行集成测试。

Tests with `integration_test` use the same methods that are
used in [widget testing][].

`integration_test` 的测试使用与 [widget 测试][widget testing] 中相同的方法。

For an introduction to the `integration_test` package,
check out the [Integration testing][] guide.

关于 `integration_test` 的介绍，
请查阅 [集成测试][Integration testing] 指南。

## Starter example project

## 起始示例项目

The project in this guide is a small example desktop application with this
functionality:

本指南中的项目是一个小型的桌面应用示例，
具有以下功能：

* On the left, there's a list of plants that the user can scroll,
  tap and select.

  在左侧，用户可以滚动、点击、选择植物列表。

* On the right, there's a details screen that displays the plant name
  and species.

  在右侧，显示植物名称和品种的信息。

* On app start, when no plant is selected, a text asking the user to select
  a plant is displayed

  在应用程序启动时，如果没有选择植物，
  就会显示一段要求用户选择植物的文本。

* The list of plants is loaded from a local JSON file located in the
  assets folder.

  植物列表的数据是从 assets 文件夹中的本地 JSON 文件加载的。

<img src='/assets/images/docs/integration-test/migration-1.png'
class="mw-100" 
alt="Starter project screenshot">

You can find the full code example in the [Example Project][] folder.

你可以在 [示例项目][Example Project] 文件夹中找到完整的代码示例。

## Existing tests

## 现有的测试

The project contains the three `flutter_driver` tests
performing the following checks:

该项目包含三个 `flutter_driver` 测试，
执行以下检查：

* Verifying the initial status of the app.

  验证应用程序的初始状态。

* Selecting the first item on the list of plants.

  选中植物列表上的第一个植物。

* Scrolling and selecting the last item on the list of plants.

  滚动并选中植物列表上的最后一个植物。

The tests are contained in the `test_driver` folder,
inside the `main_test.dart` file.

这些测试代码在 `test_driver` 文件夹内的 `main_test.dart` 中。

In this folder there's also a file named `main.dart`,
which contains a call to the method `enableFlutterDriverExtension()`.
This file won't be necessary anymore when using `integration_test`.

在该文件夹中还有一个名为 `main.dart` 的文件，
它包含了对 `enableFlutterDriverExtension()` 方法的调用。
当使用 `integration_test` 后，这个文件就不再需要了。

## Setup

## 配置

To start using the `integration_test` package,
add the `integration_test` to
your pubspec.yaml file if you haven't yet:

开始使用 `integration_test` 前，
请将 `integration_test` 引入你的 pubspec.yaml 文件：

```yaml
dev_dependencies:
  integration_test:
    sdk: flutter
```

Next, in your project, create a new directory
`integration_test/`, create your tests files there 
with the format: `<name>_test.dart`.

接下来，在你的项目中，创建一个新的目录 `integration_test/`，
在这里面创建你的测试文件，
格式为：`<name>_test.dart`。

## Test migration

## 迁移测试

This section contains different examples on how to migrate existing
`flutter_driver` tests to `integration_test` tests.

本节包含如何将现有 `flutter_driver` 测试迁移到 `integration_test` 测试
的各种示例。

### Example: Verifying a widget is displayed

### 示例：验证一个 widget 是否显示

When the app starts the screen on the right displays 
a text asking the user to select one of the plants on the list.

当应用程序启动时，右侧显示一段文本，
要求用户选择列表中的一种植物。

This test verifies that the text is displayed.

该测试验证了文本是否显示。

**flutter_driver**

In `flutter_driver`, the test uses `waitFor`,
which waits until the `finder` can locate the widget.
The test fail if the widget can't be found.

在 `flutter_driver` 中进行测试，
使用 `waitFor` 等待 `finder` 找到需要验证的 widget。
如果找不到 widget，测试就会失败。

<?code-excerpt "test_driver/main_test.dart (Test1)"?>
```dart
test('do not select any item, verify please select text is displayed',
    () async {
  // Wait for 'please select' text is displayed
  await driver.waitFor(find.text('Please select a plant from the list.'));
});
```

**integration_test**

In `integration_test` you have to perform two steps:

在 `integration_test` 中进行测试，你必须执行以下两步：

1. First load the main app widget using
   the `tester.pumpWidget` method.

   首先使用 `tester.pumpWidget` 方法
   加载主应用程序的 widget。

2. Then, use `expect` with the matcher `findsOneWidget` to verify
   that the widget is displayed.

   最后使用 `expect` 匹配 `findsOneWidget` 来验证
   该 widget 是否显示。

<?code-excerpt "integration_test/main_test.dart (Test1)"?>
```dart
testWidgets('do not select any item, verify please select text is displayed',
    (tester) async {
  // load the PlantsApp widget
  await tester.pumpWidget(const PlantsApp());

  // wait for data to load
  await tester.pumpAndSettle();

  // Find widget with 'please select'
  final finder = find.text('Please select a plant from the list.');

  // Check if widget is displayed
  expect(finder, findsOneWidget);
});
```

### Example: Tap actions

### 示例：点击操作

This test performs a tap action on the first item on the list,
which is a `ListTile` with the text "Alder".

该测试对列表中的第一项进行了点击操作，
该项是一个带有 “Alder” 文本的 `ListTile`。

After the tap, the test waits for the details to appear.
In this case, it waits for the widget with the text "Alnus" to
be displayed.

点击之后，测试等待详细内容的出现。
在本示例中，它等待显示带有 “Alnus” 文本的 widget。

Also , the test verifies that the text
"Please select a plant from the list."
is no longer displayed. 

此外，该测试还验证了消失后的 “Please select a plant from the list.” 文本。

**flutter_driver**

In `flutter_driver`, use the `driver.tap` method to perform
a tap over a widget using a finder.

在 `flutter_driver` 中进行测试，
使用 `driver.tap` 方法来点击指定的 widget。

To verify that a widget is not displayed,
use the `waitForAbsent` method.

使用 `waitForAbsent` 方法验证 widget 是否不存在。

<?code-excerpt "test_driver/main_test.dart (Test2)"?>
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
  await driver
      .waitForAbsent(find.text('Please select a plant from the list.'));
});
```

**integration_test**

In `integration_test`, use `tester.tap` to perform the tap actions.

在 `integration_test` 中进行测试，
使用 `tester.tap` 执行点击操作。

After the tap action, you must call to `tester.pumpAndSettle` to wait
until the action has finished, and all the UI changes have happened.

在点击操作之后，
你必须调用 `tester.pumpAndSettle` 进行等待，
直到所有操作和所有的 UI 变化都完成。

To verify that a widget is not displayed, use the same `expect`
function with the `findsNothing` matcher.

验证一个 widget 是否不存在，
同样使用 `expect` 函数与 `findsNothing` 进行匹配。

<?code-excerpt "integration_test/main_test.dart (Test2)"?>
```dart
testWidgets('tap on the first item (Alder), verify selected',
    (tester) async {
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

该测试与之前的测试类似，
不同的是它需要向下滚动并点击最后一项。

**flutter_driver**

To scroll down with `flutter_driver`,
use the `driver.scroll` method.

在 `flutter_driver` 要向下滚动，
请使用 `driver.scroll` 方法。

You must provide the widget to perform the scrolling action,
as well as a duration for the scroll.

你必须提供执行滚动操作的 widget，
以及滚动的持续时间。

You also have to provide the total offset for the scrolling action. 

你还需要提供滚动操作的总偏移量。

<?code-excerpt "test_driver/main_test.dart (Test3)"?>
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
  await driver
      .waitForAbsent(find.text('Please select a plant from the list.'));
});
```

**integration_test**

With `integration_test`, can use the method `tester.scrollUntilVisible`.

在 `integration_test` 要向下滚动，
可以使用 `tester.scrollUntilVisible` 方法。

Instead of providing the widget to scroll,
provide the item that you're searching for.
In this case, you're searching for the
item with the text "Zedoary",
which is the last item on the list.

需要注意的是，该方法中不要提供需要滚动的 widget，
而是提供你要寻找的项。
在本示例中，你要寻找的是文本为 “Zedoary” 的项，
它是列表中的最后一项。

The method searches for any `Scrollable` widget
and performs the scrolling action using the given offset.
The action repeats until the item is visible.

该方法会寻找任何 `Scrollable` widget，
并使用给定的偏移量执行滚动操作。
该操作会重复进行，直到寻找的项可见。

<?code-excerpt "integration_test/main_test.dart (Test3)"?>
```dart
testWidgets('scroll, tap on the last item (Zedoary), verify selected',
    (tester) async {
  await tester.pumpWidget(const PlantsApp());

  // wait for data to load
  await tester.pumpAndSettle();

  // find the item by text
  final item = find.text('Zedoary');

  // finds Scrollable widget and scrolls until item is visible
  // a 100,000 pixels is enough to reach the bottom of the list
  await tester.scrollUntilVisible(
    item,
    100000,
  );

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

[Integration testing]: {{site.url}}/testing/integration-tests
[widget testing]: {{site.url}}/testing#widget-tests
[Example Project]: {{site.repo.this}}/tree/{{site.branch}}/examples/integration_test_migration
