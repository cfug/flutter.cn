---
# title: List with spaced items
title: 等间距列表项
# description: How to create a list with spaced or expanded items
description: 如何创建等间距或扩展的列表项
ai-translated: true
---

<?code-excerpt path-base="cookbook/lists/spaced_items/"?>

Perhaps you want to create a list where all list items
are spaced evenly, so that the items take up the visible space.
For example, the four items in the following image are spaced evenly,
with "Item 0" at the top, and "Item 3" at the bottom.

你也许想创建一个列表，让所有列表项均匀分布，
从而占满可见空间。例如，下图中的四个列表项均匀分布，
「Item 0」在顶部，「Item 3」在底部。

![Spaced items](/assets/images/docs/cookbook/spaced-items-1.png){:.site-mobile-screenshot}

At the same time, you might want to allow users
to scroll through the list when the list of items won't fit,
maybe because a device is too small, a user resized a window,
or the number of items exceeds the screen size.

同时，当列表项放不下时（例如设备太小、用户调整了窗口大小，
或列表项数量超出屏幕），你可能还希望允许用户滚动浏览列表。

![Scrollable items](/assets/images/docs/cookbook/spaced-items-2.png){:.site-mobile-screenshot}

Typically, you use [`Spacer`][] to tune the spacing between widgets,
or [`Expanded`][] to expand a widget to fill the available space.
However, these solutions are not possible inside scrollable widgets,
because they need a finite height constraint.

通常你会用 [`Spacer`][] 调整 widget 之间的间距，
或用 [`Expanded`][] 让 widget 占满可用空间。
但在可滚动 widget 内部无法使用这些方案，
因为它们需要有限的高度约束。

This recipe demonstrates how to use [`LayoutBuilder`][] and [`ConstrainedBox`][]
to space out list items evenly when there is enough space, and to allow
users to scroll when there is not enough space,
using the following steps:

本食谱演示如何用 [`LayoutBuilder`][] 和 [`ConstrainedBox`][]，
在空间足够时均匀分布列表项，在空间不足时允许用户滚动，
步骤如下：

  1. Add a [`LayoutBuilder`][] with a [`SingleChildScrollView`][].
  
     添加带 [`SingleChildScrollView`][] 的 [`LayoutBuilder`][]。
  
  2. Add a [`ConstrainedBox`][] inside the [`SingleChildScrollView`][].
  
     在 [`SingleChildScrollView`][] 内添加 [`ConstrainedBox`][]。
  
  3. Create a [`Column`][] with spaced items.
  
     创建带等间距列表项的 [`Column`][]。

## 1. Add a `LayoutBuilder` with a `SingleChildScrollView`

## 1. 添加带 `SingleChildScrollView` 的 `LayoutBuilder`

Start by creating a [`LayoutBuilder`][]. You need to provide
a `builder` callback function with two parameters:

首先创建 [`LayoutBuilder`][]。你需要提供一个带两个参数的 `builder` 回调函数：

  1. The [`BuildContext`][] provided by the [`LayoutBuilder`][].
  
     [`LayoutBuilder`][] 提供的 [`BuildContext`][]。
  
  2. The [`BoxConstraints`][] of the parent widget.
  
     父 widget 的 [`BoxConstraints`][]。

In this recipe, you won't be using the [`BuildContext`][],
but you will need the [`BoxConstraints`][] in the next step.

在本食谱中你不会用到 [`BuildContext`][],
但下一步会用到 [`BoxConstraints`][]。

Inside the `builder` function, return a [`SingleChildScrollView`][].
This widget ensures that the child widget can be scrolled,
even when the parent container is too small.

在 `builder` 函数中返回 [`SingleChildScrollView`][]。
该 widget 确保子 widget 可滚动，
即使父容器太小也是如此。

<?code-excerpt "lib/spaced_list.dart (builder)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(child: Placeholder());
  },
);
```

## 2. Add a `ConstrainedBox` inside the `SingleChildScrollView`

## 2. 在 `SingleChildScrollView` 内添加 `ConstrainedBox`

In this step, add a [`ConstrainedBox`][]
as the child of the [`SingleChildScrollView`][].

在本步中，将 [`ConstrainedBox`][] 作为 [`SingleChildScrollView`][] 的子 widget 添加。

The [`ConstrainedBox`][] widget imposes additional constraints to its child.

[`ConstrainedBox`][] widget 会为其子 widget 施加额外约束。

Configure the constraint by setting the `minHeight` parameter to be
the `maxHeight` of the [`LayoutBuilder`][] constraints.

将 `minHeight` 参数设为 [`LayoutBuilder`][] 约束的 `maxHeight` 来配置约束。

This ensures that the child widget
is constrained to have a minimum height equal to the available
space provided by the [`LayoutBuilder`][] constraints,
namely the maximum height of the [`BoxConstraints`][].

这确保子 widget 的最小高度等于 [`LayoutBuilder`][] 约束提供的可用空间，
即 [`BoxConstraints`][] 的最大高度。

<?code-excerpt "lib/spaced_list.dart (constrainedBox)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: constraints.maxHeight),
        child: Placeholder(),
      ),
    );
  },
);
```

However, you don't set the `maxHeight` parameter,
because you need to allow the child to be larger
than the [`LayoutBuilder`][] size,
in case the items don't fit the screen.

但不要设置 `maxHeight` 参数，
因为当列表项放不下屏幕时，你需要允许子 widget 大于 [`LayoutBuilder`][] 的尺寸。

## 3. Create a `Column` with spaced items

## 3. 创建带等间距列表项的 `Column`

Finally, add a [`Column`][] as the child of the [`ConstrainedBox`][].

最后，将 [`Column`][] 作为 [`ConstrainedBox`][] 的子 widget 添加。

To space the items evenly,
set the `mainAxisAlignment` to `MainAxisAlignment.spaceBetween`.

要均匀分布列表项，将 `mainAxisAlignment` 设为 `MainAxisAlignment.spaceBetween`。

<?code-excerpt "lib/spaced_list.dart (column)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: constraints.maxHeight),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ItemWidget(text: 'Item 1'),
            ItemWidget(text: 'Item 2'),
            ItemWidget(text: 'Item 3'),
          ],
        ),
      ),
    );
  },
);
```

Alternatively, you can use the [`Spacer`][] widget
to tune the spacing between the items,
or the [`Expanded`][] widget, if you want one widget to take more space than others.

或者，你可以用 [`Spacer`][] widget 调整列表项之间的间距，
或用 [`Expanded`][] widget 让某个 widget 占用比其他项更多的空间。

For that, you have to wrap the [`Column`] with an [`IntrinsicHeight`][] widget,
which forces the [`Column`][] widget to size itself to a minimum height,
instead of expanding infinitely.

为此，你需要用 [`IntrinsicHeight`][] widget 包裹 [`Column`]，
它会强制 [`Column`][] 按最小高度确定自身尺寸，而不是无限扩展。

<?code-excerpt "lib/spaced_list.dart (intrinsic)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: constraints.maxHeight),
        child: IntrinsicHeight(
          child: Column(
            children: [
              ItemWidget(text: 'Item 1'),
              Spacer(),
              ItemWidget(text: 'Item 2'),
              Expanded(child: ItemWidget(text: 'Item 3')),
            ],
          ),
        ),
      ),
    );
  },
);
```

:::tip
Play around with different devices, resizing the app,
or resizing the browser window, and see how the item list adapts
to the available space.

在不同设备上试试、调整应用大小或调整浏览器窗口大小，
观察列表项如何适应可用空间。
:::

## Interactive example

## 交互式样例

This example shows a list of items that are spaced evenly within a column.
The list can be scrolled up and down when the items don't fit the screen.
The number of items is defined by the variable `items`,
change this value to see what happens when the items won't fit the screen.

本示例展示在 `Column` 内均匀分布的列表项。
当列表项放不下屏幕时，列表可以上下滚动。
列表项数量由变量 `items` 定义，修改该值可观察列表项放不下屏幕时的表现。

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Spaced Items hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const SpacedItemsList());

class SpacedItemsList extends StatelessWidget {
  const SpacedItemsList({super.key});

  @override
  Widget build(BuildContext context) {
    const items = 4;

    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        cardTheme: CardThemeData(color: Colors.blue.shade50),
      ),
      home: Scaffold(
        body: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: List.generate(
                    items,
                    (index) => ItemWidget(text: 'Item $index'),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class ItemWidget extends StatelessWidget {
  const ItemWidget({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: SizedBox(height: 100, child: Center(child: Text(text))),
    );
  }
}
```

[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
[`BuildContext`]: {{site.api}}/flutter/widgets/BuildContext-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`ConstrainedBox`]: {{site.api}}/flutter/widgets/ConstrainedBox-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`IntrinsicHeight`]: {{site.api}}/flutter/widgets/IntrinsicHeight-class.html
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html
[`Spacer`]: {{site.api}}/flutter/widgets/Spacer-class.html
