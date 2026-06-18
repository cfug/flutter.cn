---
# title: Display a Cupertino sheet
title: 显示 Cupertino sheet
# description: >-
#   How to implement a Cupertino sheet to display messages and content.
description: >-
  如何实现 Cupertino sheet 以显示消息和内容。
ai-translated: true
---

<?code-excerpt path-base="cookbook/design/cupertino_sheets/"?>

A Cupertino sheet is an iOS-style modal bottom sheet
used to present content or options.
It slides up from the bottom of the screen
and can be pulled down to dismiss.

Cupertino sheet 是一种 iOS 风格的模态底部 sheet，用于展示内容或选项。它从屏幕底部滑入，可下拉关闭。

In Flutter, this is the job of [`showCupertinoSheet`][].
This recipe implements a Cupertino sheet using the following steps:

在 Flutter 中，这由 [`showCupertinoSheet`][] 负责。
本实用教程通过以下步骤实现 Cupertino sheet：

  1. Create a `CupertinoApp` or `MaterialApp`.

     创建 `CupertinoApp` 或 `MaterialApp`。

  2. Display the sheet content.

     显示 sheet 内容。

## 1. Create a `CupertinoApp`

## 1. 创建 `CupertinoApp`

When creating apps that follow the iOS design guidelines,
you can use `CupertinoApp`.
The following example provides a button in the center of the screen
that triggers the modal.

创建遵循 iOS 设计规范的应用时，你可以使用 `CupertinoApp`。以下示例在屏幕中央提供一个按钮，用于触发模态界面。

<?code-excerpt "lib/main.dart (CupertinoSheetDemo)"?>
```dart
class CupertinoSheetDemo extends StatelessWidget {
  const CupertinoSheetDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'CupertinoSheet Demo',
      home: CupertinoSheetPage(),
    );
  }
}
```

## 2. Display the sheet content

## 2. 显示 sheet 内容

With the basic app structure in place, display the sheet.
To show it, call `showCupertinoSheet` and provide a `scrollableBuilder`
that returns the content for the sheet, such as a `SingleChildScrollView`.

基本应用结构就绪后，显示 sheet。
要展示它，请调用 `showCupertinoSheet` 并提供 `scrollableBuilder`，返回 sheet 的内容，
例如 `SingleChildScrollView`。

<?code-excerpt "lib/main.dart (ShowCupertinoSheet)"?>
```dart
showCupertinoSheet(
  context: context,
  scrollableBuilder: (context, scrollController) {
    return SingleChildScrollView(
      controller: scrollController,
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const SizedBox(height: 100),
            const Text('This is a Cupertino sheet'),
            const SizedBox(height: 20),
            CupertinoButton(
              child: const Text('Close'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  },
);
```

## Interactive example

## 交互式示例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter CupertinoSheet hands-on example in DartPad" run="true"
import 'package:flutter/cupertino.dart';

void main() => runApp(const CupertinoSheetDemo());

class CupertinoSheetDemo extends StatelessWidget {
  const CupertinoSheetDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'CupertinoSheet Demo',
      home: CupertinoSheetPage(),
    );
  }
}

class CupertinoSheetPage extends StatelessWidget {
  const CupertinoSheetPage({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('CupertinoSheet Demo'),
      ),
      child: Center(
        child: CupertinoButton.filled(
          onPressed: () {
            showCupertinoSheet(
              context: context,
              scrollableBuilder: (context, scrollController) {
                return SingleChildScrollView(
                  controller: scrollController,
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        const SizedBox(height: 100),
                        const Text('This is a Cupertino sheet'),
                        const SizedBox(height: 20),
                        CupertinoButton(
                          child: const Text('Close'),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          },
          child: const Text('Show Sheet'),
        ),
      ),
    );
  }
}
```

[`showCupertinoSheet`]: {{site.api}}/flutter/cupertino/showCupertinoSheet.html
