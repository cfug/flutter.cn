---
title: Implement swipe to dismiss
title: 实现「滑动清除」效果
prev:
  title: Handle taps
  title: 捕获和处理点击动作
  path: /docs/cookbook/gestures/handling-taps
next:
  title: Display images from the internet
  title: 显示网络上的远程图片
  path: /docs/cookbook/images/network-image
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

The "swipe to dismiss" pattern is common in many mobile apps.  For example,
when writing an email app, you might want to allow a user to swipe away
email messages to delete them from a list.

“滑动清除”在许多移动应用中都很常见。
比如，我们在写一个邮件应用，我们会想让用户能够滑动删除列表中的邮件消息。
用户操作时，我们可能需要把这封邮件从收件箱移动到垃圾箱。

Flutter makes this task easy by providing the
[`Dismissible`][] widget.
Learn how to implement swipe to dismiss with the following steps:

Flutter 提供了[`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html) Widget 来轻松地实现这个需求。

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

首先，我们创建一个列表，列表项是能够滑动清除的。至于如何创建列表的更多细节，
请参考 [长列表的处理](/docs/cookbook/lists/long-lists/) 文档。

### Create a data source

### 创建一个数据源

In this example,
you want 20 sample items to work with.
To keep it simple, generate a list of strings.

在我们的例子中，我们需要 20 个样本项来实现列表。为简单起见，我们会生成一个字符串列表。

<!-- skip -->
```dart
final items = List<String>.generate(20, (i) => "Item ${i + 1}");
```

### Convert the data source into a list

### 将数据源转换成一个 List

Display each item in the list on screen. Users won't
be able to swipe these items away just yet.

首先，我们简单地在屏幕上展示列表中的每一项。用户现在还无法滑动清除它们。

<!-- skip -->
```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(title: Text('${items[index]}'));
  },
);
```

## 2. Wrap each item in a Dismissible widget

## 2. 把每一项打包一个 Dismissible Widget

In this step,
give users the ability to swipe an item off the list by using the
[`Dismissible`][] widget.

在这个步骤中，用户可以通过使用 [`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html) 来删除列表中的某项。

After the user has swiped away the item,
remove the item from the list and display a snackbar.
In a real app, you might need to perform more complex logic,
such as removing the item from a web service or database.

在用户将某一项滑出屏幕后，我们需要将那一项从列表中删除并显示一个 Snackbar。
在真实的应用中，你可能需要执行更复杂的逻辑，比如从网页服务或数据库中删除此项。

Update the `itemBuilder()` function to return a `Dismissible` widget:

我们可以通过更新 `itemBuilder()` 函数来返回一个`Dismissible` Widget:


<!-- skip -->
```dart
Dismissible(
  // Each Dismissible must contain a Key. Keys allow Flutter to
  // uniquely identify widgets.
  
  // 每个Dismissible实例都必须包含一个Key。Key让Flutter能够对Widgets做唯一标识。
  
  key: Key(item),
  
  // Provide a function that tells the app
  // what to do after an item has been swiped away.
  
  // 我们还需要提供一个函数，告诉应用，在项目被移出后，要做什么。
  onDismissed: (direction) {
  
    // Remove the item from the data source.
    // 从数据源中移除项目
    setState(() {
      items.removeAt(index);
    });

    // Show a snackbar. This snackbar could also contain "Undo" actions.    
    // 展示一个 snackbar！这个snackbar也可以包含“撤销”动作。
    Scaffold
        .of(context)
        .showSnackBar(SnackBar(content: Text("$item dismissed")));
  },
  child: ListTile(title: Text('$item')),
);
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

顾名思义，我们的应用允许用户将列表项滑出列表，但是应用可能没有向用户给出视觉提示，
告诉他们操作时发生了什么。要给出提示，表明我们正在删除列表项，就需要在他们将列表项
滑出屏幕的时候，展示一个“滞留”提示。这个例子中，我们使用了一个红色背景！

To add the indicator,
provide a `background` parameter to the `Dismissible`.

出于这个目的，我们为 `Dismissible` 设置了一个 `background` 参数。

<!-- skip -->
```dart
Dismissible(
  // Show a red background as the item is swiped away.
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

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

// MyApp is a StatefulWidget. This allows updating the state of the
// widget when an item is removed.

// MyApp是一个StatefulWidget。这样，我们就能够在列表项被移除的时候，更新Widget的状态。

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  MyAppState createState() {
    return MyAppState();
  }
}

class MyAppState extends State<MyApp> {
  final items = List<String>.generate(20, (i) => "Item ${i + 1}");

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
              // uniquely identify widgets.
              // 每个Dismissible实例都必须包含一个Key。Key让Flutter能够对Widgets做唯一标识。
              key: Key(item),
              // Provide a function that tells the app
              // what to do after an item has been swiped away.
              // 我们还需要提供一个函数，告诉应用，在项目被移出后，要做什么。
              onDismissed: (direction) {
                // Remove the item from the data source.
                // 从数据源中移除项目
                setState(() {
                  items.removeAt(index);
                });

                // Then show a snackbar.
                // 展示一个 snackbar！
                Scaffold.of(context)
                    .showSnackBar(SnackBar(content: Text("$item dismissed")));
              },
              // Show a red background as the item is swiped away.
              // 列表项被滑出时，显示一个红色背景(Show a red background as the item is swiped away)
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

<noscript>
  <img src="/images/cookbook/dismissible.gif" alt="Dismissible Demo" class="site-mobile-screenshot" />
</noscript>


[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html
[Working with long lists]: /docs/cookbook/lists/long-lists
