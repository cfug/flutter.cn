---
# title: Implement swipe to dismiss
title: 实现「滑动清除」效果
# description: How to implement swiping to dismiss or delete.
description: 如何实现滑动取消或清除效果。
tags: cookbook, 实用教程, 手势
keywords: 滑动清除
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/gestures/dismissible"?>

The "swipe to dismiss" pattern is common in many mobile apps.
For example, when writing an email app,
you might want to allow a user to swipe away
email messages to delete them from a list.

“滑动清除”在许多移动应用中都很常见。
比如，我们在写一个邮件应用，我们会想让用户能够滑动删除列表中的邮件消息。
用户操作时，我们可能需要把这封邮件从收件箱移动到垃圾箱。

Flutter makes this task easy by providing the
[`Dismissible`][] widget.
Learn how to implement swipe to dismiss with the following steps:

Flutter 提供了 [`Dismissible`][] Widget 来轻松地实现这个需求。
我们一起看一下如下的步骤：

## Directions

## 步骤

  1. Create a list of items.

     创建项目列表

  2. Wrap each item in a `Dismissible` widget.

     把每一项打包成一个 `Dismissible` Widget

  3. Provide "leave behind" indicators.

     提供“滞留”提示

## 1. Create a list of items

## 1. 创建项目列表

First, create a list of items. For detailed
instructions on how to create a list,
follow the [Working with long lists][] recipe.

首先，我们创建一个列表，列表项是能够滑动清除的。
至于如何创建列表的更多细节，请参考
[长列表的处理][Working with long lists] 文档。

### Create a data source

### 创建一个数据源

In this example,
you want 20 sample items to work with.
To keep it simple, generate a list of strings.

在我们的例子中，我们需要 20 个样本项来实现列表。
为简单起见，我们会生成一个字符串列表。

<?code-excerpt "lib/main.dart (Items)"?>
```dart
final items = List<String>.generate(20, (i) => 'Item ${i + 1}');
```

### Convert the data source into a list

### 将数据源转换成一个 List

Display each item in the list on screen. Users won't
be able to swipe these items away just yet.

首先，我们简单地在屏幕上展示列表中的每一项，
用户现在还无法滑动清除它们。

<?code-excerpt "lib/step1.dart (ListView)" replace="/^body: //g;/^\),$/)/g"?>
```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index]),
    );
  },
)
```

## 2. Wrap each item in a Dismissible widget

## 2. 把每一项打包一个 Dismissible Widget

In this step,
give users the ability to swipe an item off the list by using the
[`Dismissible`][] widget.

在这个步骤中，用户可以通过使用 [`Dismissible`][] 来删除列表中的某项。

After the user has swiped away the item,
remove the item from the list and display a snackbar.
In a real app, you might need to perform more complex logic,
such as removing the item from a web service or database.

在用户将某一项滑出屏幕后，我们需要将那一项从列表中删除并显示一个 Snackbar。
在真实的应用中，你可能需要执行更复杂的逻辑，比如从网页服务或数据库中删除此项。

Update the `itemBuilder()` function to return a `Dismissible` widget:

我们可以通过更新 `itemBuilder()` 函数来返回一个 `Dismissible` widget:

<?code-excerpt "lib/step2.dart (Dismissible)"?>
```dart
itemBuilder: (context, index) {
  final item = items[index];
  return Dismissible(
    // Each Dismissible must contain a Key. Keys allow Flutter to
    // uniquely identify widgets.
    key: Key(item),
    // Provide a function that tells the app
    // what to do after an item has been swiped away.
    onDismissed: (direction) {
      // Remove the item from the data source.
      setState(() {
        items.removeAt(index);
      });

      // Then show a snackbar.
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('$item dismissed')));
    },
    child: ListTile(
      title: Text(item),
    ),
  );
},
```

## 3. Provide "leave behind" indicators

## 3. 提供“滞留”提示

As it stands,
the app allows users to swipe items off the list, but it doesn't
give a visual indication of what happens when they do.
To provide a cue that items are removed,
display a "leave behind" indicator as they
swipe the item off the screen. In this case,
the indicator is a red background.

顾名思义，我们的应用允许用户将列表项滑出列表，
但是应用可能没有向用户给出视觉提示，告诉他们操作时发生了什么。
要给出提示，表明我们正在删除列表项，就需要在他们将列表项
滑出屏幕的时候，展示一个“滞留”提示。这个例子中，我们使用了一个红色背景。

To add the indicator,
provide a `background` parameter to the `Dismissible`.

出于这个目的，我们为 `Dismissible`
设置了一个 `background` 参数。

```dart diff
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text('$item dismissed')));
  },
+ // Show a red background as the item is swiped away.
+ background: Container(color: Colors.red),
  child: ListTile(
    title: Text(item),
  ),
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Swipe to Dismiss hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

// MyApp is a StatefulWidget. This allows updating the state of the
// widget when an item is removed.
class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  MyAppState createState() {
    return MyAppState();
  }
}

class MyAppState extends State<MyApp> {
  final items = List<String>.generate(20, (i) => 'Item ${i + 1}');

  @override
  Widget build(BuildContext context) {
    const title = 'Dismissing Items';

    return MaterialApp(
      title: title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView.builder(
          itemCount: items.length,
          itemBuilder: (context, index) {
            final item = items[index];
            return Dismissible(
              // Each Dismissible must contain a Key. Keys allow Flutter to
              // uniquely identify widgets.
              key: Key(item),
              // Provide a function that tells the app
              // what to do after an item has been swiped away.
              onDismissed: (direction) {
                // Remove the item from the data source.
                setState(() {
                  items.removeAt(index);
                });

                // Then show a snackbar.
                ScaffoldMessenger.of(context)
                    .showSnackBar(SnackBar(content: Text('$item dismissed')));
              },
              // Show a red background as the item is swiped away.
              background: Container(color: Colors.red),
              child: ListTile(
                title: Text(item),
              ),
            );
          },
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/dismissible.gif" alt="Dismissible Demo" class="site-mobile-screenshot" />
</noscript>


[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html
[Working with long lists]: /cookbook/lists/long-lists
