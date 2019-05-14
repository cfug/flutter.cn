---
title: Implement Swipe to Dismiss
title: 实现「滑动清除」效果
prev:
  title: Handling Taps
  title: 捕获和处理点击动作
  path: /docs/cookbook/gestures/handling-taps
next:
  title: Display images from the internet
  title: 显示网络上的远程图片
  path: /docs/cookbook/images/network-image
---

The "Swipe to dismiss" pattern is common in many mobile apps. For example, if
we're writing an email app, we might want to allow our users to swipe away email
messages in a list. When they do, we'll want to move the item from the Inbox to
the Trash.

“滑动清除”在许多移动应用中都很常见。
比如，我们在写一个邮件应用，我们会想让用户能够滑动删除列表中的邮件消息。
用户操作时，我们可能需要把这封邮件从收件箱移动到垃圾箱。

Flutter makes this task easy by providing the
[`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html) Widget.

Flutter 提供了[`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html)Widget 来轻松地实现这个需求。

## Directions

## 步骤

  1. Create List of Items

     创建项目列表

  2. Wrap each item in a `Dismissible` Widget

     把每一项打包成一个 `Dismissible` Widget

  3. Provide "Leave Behind" indicators

     提供“滞留”提示

## 1. Create List of Items

## 1. 创建项目列表

First, we'll create a list of items we can swipe away. For more detailed
instructions on how to create a list, please follow the [Working with long
lists](/docs/cookbook/lists/long-lists/) recipe.

首先，我们创建一个列表，列表项是能够滑动清除的。至于如何创建列表的更多细节，
请参考[长列表的处理](/docs/cookbook/lists/long-lists/)文档。

### Create a Data Source

### 创建一个数据源

In our example, we'll want 20 sample items to work with. To keep it simple,
we'll generate a List of Strings.

在我们的例子中，我们需要 20 个样本项来实现列表。为简单起见，我们会生成一个字符串列表。

<!-- skip -->
```dart
final items = List<String>.generate(20, (i) => "Item ${i + 1}");
```

### Convert the data source into a List

### 将数据源转换成一个 List

At first, we'll simply display each item in the List on screen. Users will
not be able to swipe away with these items just yet!

首先，我们简单地在屏幕上展示列表中的每一项。用户现在还无法滑动清除它们！

<!-- skip -->
```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(title: Text('${items[index]}'));
  },
);
```

## 2. Wrap each item in a Dismissible Widget

## 2. 把每一项打包一个 Dismissible Widget

Now that we're displaying a list of items, we'll want to give our users the
ability to swipe each item off the list!

既然我们已经展示了一个列表，我们还要让用户能够将每一项滑出列表！

After the user has swiped away the item, we'll need to run some code to remove
the item from the list and display a Snackbar. In a real app, you might need to
perform more complex logic, such as removing the item from a web service or
database.

在用户将某一项滑出屏幕后，我们需要运行一些代码，将那一项从列表中删除并显示一个 Snackbar。
在真实的应用中，你可能需要执行更复杂的逻辑，比如从网页服务或数据库中删除此项。

This is where the
[`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html)
Widget comes into play! In our example, we'll update our `itemBuilder` function
to return a `Dismissible` Widget.

此时，就轮到[`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html)
Widget 登场了！在我们的例子中，还要更新`itemBuilder`函数并返回一个`Dismissible` Widget。

<!-- skip -->
```dart
Dismissible(
  // Each Dismissible must contain a Key. Keys allow Flutter to
  // uniquely identify Widgets.

  // 每个Dismissible实例都必须包含一个Key。Key让Flutter能够对Widgets做唯一标识。
  key: Key(item),
  // We also need to provide a function that will tell our app
  // what to do after an item has been swiped away.

  // 我们还需要提供一个函数，告诉应用，在项目被移出后，要做什么。
  onDismissed: (direction) {
    // Remove the item from our data source.

    // 从数据源中移除项目
    setState(() {
      items.removeAt(index);
    });
    // Show a snackbar! This snackbar could also contain "Undo" actions.

    // 展示一个 snackbar！这个snackbar也可以包含“撤销”动作。
    Scaffold
        .of(context)
        .showSnackBar(SnackBar(content: Text("$item dismissed")));
  },
  child: ListTile(title: Text('$item')),
);
```

## 3. Provide "Leave Behind" indicators

## 3. 提供“滞留”提示

As it stands, our app allows users to swipe items off the List, but it might
not give them a visual indication of what happens when they do. To provide a cue
that we're removing items, we'll display a "Leave Behind" indicator as they
swipe the item off the screen. In this case, a red background!

顾名思义，我们的应用允许用户将列表项滑出列表，但是应用可能没有向用户给出视觉提示，
告诉他们操作时发生了什么。要给出提示，表明我们正在删除列表项，就需要在他们将列表项
滑出屏幕的时候，展示一个“滞留”提示。这个例子中，我们使用了一个红色背景！

For this purpose, we'll provide a `background` parameter to the `Dismissible`.

出于这个目的，我们为`Dismissible`设置了一个`background`参数。

<!-- skip -->
```dart
Dismissible(
  // Show a red background as the item is swiped away
  
  // 列表项被滑出时，显示一个红色背景
  background: Container(color: Colors.red),
  key: Key(item),
  onDismissed: (direction) {
    setState(() {
      items.removeAt(index);
    });

    Scaffold
        .of(context)
        .showSnackBar(SnackBar(content: Text("$item dismissed")));
  },
  child: ListTile(title: Text('$item')),
);
```

## Complete example

## 完整代码

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

// MyApp is a StatefulWidget. This allows us to update the state of the
// Widget whenever an item is removed.

// MyApp是一个StatefulWidget。这样，我们就能够在列表项被移除的时候，更新Widget的状态。
class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  MyAppState createState() {
    return MyAppState();
  }
}

class MyAppState extends State<MyApp> {
  final items = List<String>.generate(3, (i) => "Item ${i + 1}");

  @override
  Widget build(BuildContext context) {
    final title = 'Dismissing Items';

    return MaterialApp(
      title: title,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: ListView.builder(
          itemCount: items.length,
          itemBuilder: (context, index) {
            final item = items[index];

            return Dismissible(
              // Each Dismissible must contain a Key. Keys allow Flutter to
              // uniquely identify Widgets.

              // 每个Dismissible实例都必须包含一个Key。Key让Flutter能够对Widgets做唯一标识。
              key: Key(item),
              // We also need to provide a function that tells our app
              // what to do after an item has been swiped away.

              // 我们还需要提供一个函数，告诉应用，在项目被移出后，要做什么。
              onDismissed: (direction) {
                // Remove the item from our data source.

                // 从数据源中移除项目
                setState(() {
                  items.removeAt(index);
                });

                // Then show a snackbar!

                // 展示一个 snackbar！
                Scaffold.of(context)
                    .showSnackBar(SnackBar(content: Text("$item dismissed")));
              },
              // Show a red background as the item is swiped away

              // 列表项被滑出时，显示一个红色背景
              background: Container(color: Colors.red),
              child: ListTile(title: Text('$item')),
            );
          },
        ),
      ),
    );
  }
}
```

![Dismissible Demo](/images/cookbook/dismissible.gif){:.site-mobile-screenshot}
