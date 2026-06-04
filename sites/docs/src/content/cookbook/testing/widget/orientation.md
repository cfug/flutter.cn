---
# title: Test orientation
title: 测试屏幕方向
# description: How to test if an app is in portrait or landscape mode.
description: 如何测试应用处于竖屏还是横屏模式。
ai-translated: true
---

In Flutter, you can build different layouts depending on a given
[orientation][]. For example, you could present data in two columns if the app
is in portrait mode, and three columns if in landscape mode.
Additionally, you can create tests that check if the correct number of columns
are being shown for each orientation.

在 Flutter 中，你可以根据给定的 [orientation][] 构建不同布局。
例如，应用在竖屏模式下用两列展示数据，横屏模式下用三列。
此外，你还可以编写测试，检查每种方向下是否显示了正确数量的列。

In this recipe, you can learn how check if the orientation of an app is
`portrait` or `landscape`, and also how many columns are displayed for each
orientation.

在本食谱中，你将学习如何检查应用方向是 `portrait` 还是 `landscape`，
以及每种方向下显示多少列。

This recipe uses the following steps:

本食谱使用以下步骤：

  1.  Create an app that updates the layout of the content,
      based on the orientation.
  
      创建一个根据方向更新内容布局的应用。
  
  1.  Create an orientation test group.
  
      创建方向测试组。
  
  1.  Create a portrait orientation test.
  
      创建竖屏方向测试。
  
  1.  Create a landscape orientation test.
  
      创建横屏方向测试。
  
  1.  Run the tests.
  
      运行测试。

## 1. Create an app that updates based on orientation

## 1. 创建根据方向更新的应用

Create a Flutter app that changes how many columns are shown when an
app is in portrait or landscape mode:

创建一个 Flutter 应用，在竖屏或横屏模式下显示不同数量的列：

1.  Create a new Flutter project called `orientation_tests`.

    创建名为 `orientation_tests` 的新 Flutter 项目。

    ```console
    flutter create orientation_tests
    ```

2.  Follow the steps in [Update the UI based on orientation][] to
    set up the project.

    按照 [根据方向更新 UI][Update the UI based on orientation] 中的步骤配置项目。

## 2. Create an orientation test group

## 2. 创建方向测试组

After you've set up your `orientation_tests` project, complete these steps to
group your future orientation tests:

配置好 `orientation_tests` 项目后，完成以下步骤以组织后续的方向测试：

1.  In your Flutter project, open `test/widget_test.dart`.

    在 Flutter 项目中打开 `test/widget_test.dart`。

1.  Replace the existing contents with the following:

    将现有内容替换为以下内容：

    <?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart (scaffolding)"?>
    ```dart title="widget_test.dart"
    import 'package:flutter/material.dart';
    import 'package:flutter_test/flutter_test.dart';
    import 'package:orientation_tests/main.dart';
    
    void main() {
      group('Orientation', () {
        // ···
      });
    }
    ```

## 3. Create a portrait orientation test

## 3. 创建竖屏方向测试

Add the portrait orientation test to the `Orientation` group.
This test makes sure that the orientation is `portrait` and that
only `2` columns of data appear in the app:

将竖屏方向测试添加到 `Orientation` 组。
该测试确保方向为 `portrait`，且应用中只显示 `2` 列数据：

1.  In `test/widget_test.dart`, replace `...` inside of the `Orientation` group
    with the following test:

    在 `test/widget_test.dart` 中，将 `Orientation` 组内的 `...` 替换为以下测试：

    <?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart (portrait-mode-test)"?>
    ```dart title="widget_test.dart"
    // Check if portrait mode displays correctly.
    testWidgets('Displays 2 columns in portrait mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());
    
      // Change to portrait.
      tester.view.physicalSize = const Size(600, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();
    
      // Verify initial orientation is portrait.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.portrait);
    
      // Verify there are only 2 columns in portrait mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 2);
    });
    ```

## 4. Create a landscape orientation test

## 4. 创建横屏方向测试

Add the landscape orientation test to the `Orientation` group.
This test makes sure that the orientation is `landscape` and that
only `3` columns of data appear in the app:

将横屏方向测试添加到 `Orientation` 组。
该测试确保方向为 `landscape`，且应用中只显示 `3` 列数据：

1.  In `test/widget_test.dart`, inside of the `Orientation` group,
    add the following test after the landscape test:

    在 `test/widget_test.dart` 的 `Orientation` 组内，
    在竖屏测试之后添加以下测试：

    <?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart (landscape-mode-test)"?>
    ```dart title="widget_test.dart"
    // Check if landscape mode displays correctly.
    testWidgets('Displays 3 columns in landscape mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());
    
      // Change to landscape.
      tester.view.physicalSize = const Size(800, 600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();
    
      // Verify initial orientation is landscape.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.landscape);
    
      // Verify there are only 3 columns in landscape mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 3);
    });
    ```

## 5. Run the tests

## 5. 运行测试

Run the tests using the following command from the root of the project:

在项目根目录运行以下命令执行测试：

```console
flutter test test/widget_test.dart
```

## Complete example

## 完整示例

<?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart"?>
```dart title="widget_test.dart"
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:orientation_tests/main.dart';

void main() {
  group('Orientation', () {
    // Check if portrait mode displays correctly.
    testWidgets('Displays 2 columns in portrait mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());

      // Change to portrait.
      tester.view.physicalSize = const Size(600, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();

      // Verify initial orientation is portrait.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.portrait);

      // Verify there are only 2 columns in portrait mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 2);
    });

    // Check if landscape mode displays correctly.
    testWidgets('Displays 3 columns in landscape mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());

      // Change to landscape.
      tester.view.physicalSize = const Size(800, 600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();

      // Verify initial orientation is landscape.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.landscape);

      // Verify there are only 3 columns in landscape mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 3);
    });
  });
}
```

<?code-excerpt "cookbook/testing/widget/orientation_tests/lib/main.dart"?>
```dart title="main.dart"
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Orientation Demo';

    return const MaterialApp(
      title: appTitle,
      home: OrientationList(title: appTitle),
    );
  }
}

class OrientationList extends StatelessWidget {
  final String title;

  const OrientationList({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: OrientationBuilder(
        builder: (context, orientation) {
          return GridView.count(
            // Create a grid with 2 columns in portrait mode, or
            // 3 columns in landscape mode.
            crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
            // Generate 100 widgets that display their index in the list.
            children: List.generate(100, (index) {
              return Center(
                child: Text(
                  'Item $index',
                  style: TextTheme.of(context).headlineLarge,
                ),
              );
            }),
          );
        },
      ),
    );
  }
}
```

[orientation]: {{site.api}}/flutter/widgets/Orientation.html
[Update the UI based on orientation]: /cookbook/design/orientation
