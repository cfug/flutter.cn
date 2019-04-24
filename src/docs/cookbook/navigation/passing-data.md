---
title: Send data to a new screen
title: 传递数据到新页面
prev:
  title: Return data from a screen
  title: 从一个页面回传数据
  path: /docs/cookbook/navigation/returning-data
next:
  title: Fetch data from the internet
  title: 获取网络数据
  path: /docs/cookbook/networking/fetch-data
---

Oftentimes, we not only want to navigate to a new screen, but also pass some
data to the screen as well. For example, we often want to pass information about
the item we tapped on.

在开发的过程中，我们经常需要在跳转到新页面的时候，能同时传递一些数据。比如，传递用户点击的元素信息。

Remember: Screens are Just Widgets&trade;. In this example, we'll create a List
of Todos. When a todo is tapped on, we'll navigate to a new screen (Widget) that
displays information about the todo.

还记得么，全屏的界面也只是 Widget。在这个例子中，我们会创建一个待办事项列表， 当某个事项被点击的时候，会跳转到新的一屏 (Widget)，在新的一屏显示待办事项的详细信息。

## Directions

## 步骤

  1. Define a Todo class

     定义一个描述待办事项的数据类

  2. Display a List of Todos

     用列表 (List Widget) 显示待办事项

  3. Create a Detail Screen that can display information about a todo

     创建一个显示待办事项详细信息的界面

  4. Navigate and pass data to the Detail Screen

     传递数据并跳转到待办事项详细信息界面

## 1. Define a Todo class

## 1. 定义一个描述待办事项的数据类

First, we'll need a simple way to represent Todos. For this example, we'll
create a class that contains two pieces of data: the title and description.

首先，我们需要一个简单的方式来描述待办事项。我们创建一个类叫做 `Todo`，包含 `title` 和`description` 两个成员变量。

<!-- skip -->
```dart
class Todo {
  final String title;
  final String description;

  Todo(this.title, this.description);
}
```

## 2. Create a List of Todos

## 2. 创建待办事项列表

Second, we'll want to display a list of Todos. In this example, we'll generate
20 todos and show them using a ListView. For more information on working with
Lists, please see the [`Basic List`](/docs/cookbook/lists/basic-list/) recipe.

第二步，我们需要显示一个待办事项列表，生成 20 条待办事项并用 `ListView` 显示。如果你想了解更多关于列表显示的内容，请阅读文档 [`基础列表`](/docs/cookbook/lists/basic-list)。

### Generate the List of Todos

### 生成待办事项

<!-- skip -->
```dart
final todos = List<Todo>.generate(
  20,
  (i) => Todo(
        'Todo $i',
        'A description of what needs to be done for Todo $i',
      ),
);
```

### Display the List of Todos using a ListView

### 用 `ListView` 显示待办事项列表

<!-- skip -->
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(todos[index].title),
    );
  },
);
```

So far, so good. We'll generate 20 Todos and display them in a ListView!

到目前为止， 我们生成了 20 条待办事项， 并用 `ListView` 把它显示出来了。

## 3. Create a Detail Screen that can display information about a todo

## 3. 创建一个显示待办事项详细信息的界面

Now, we'll create our second screen. The title of the screen will contain the
title of the todo, and the body of the screen will show the description.

现在，我们来创建第二个全屏的界面， 界面的标题是待办事项的标题， 界面下面显示待办事项的描述信息。

Since it's a normal `StatelessWidget`, we'll simply require that users creating
the Screen pass through a `Todo`! Then, we'll build a UI using the given Todo.

这个界面是一个 `StatelessWidget`，创建的时需要传递 `Todo` 对象给它， 它就可以使用传给他的 `Todo` 对象来构建 UI 。

<!-- skip -->
```dart
class DetailScreen extends StatelessWidget {
  // 声明一个成员变量来保存 Todo 对象 (Declare a field that holds the Todo)
  final Todo todo;

  // 构造函数需要 Todo 对象 (In the constructor, require a Todo)
  DetailScreen({Key key, @required this.todo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 使用 Todo 对象构建 UI (Use the Todo to create our UI)
    return Scaffold(
      appBar: AppBar(
        title: Text(todo.title),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Text(todo.description),
      ),
    );
  }
}
```

## 4. Navigate and pass data to the Detail Screen

## 4. 传递数据并跳转到待办事项详细信息界面

With our `DetailScreen` in place, we're ready to perform the Navigation! In our
case, we'll want to Navigate to the `DetailScreen` when a user taps on a Todo in
our List. When we do so, we'll also want to pass the Todo to the `DetailScreen`.

上面写完了 `DetailScreen` ， 现在该执行界面跳转啦！ 我们想让用户在点击列表中的某个待办事项时跳转到 `DetailScreen` 界面，同时能传递点击的这条代办事项对象 (`Todo` 对象) 。

To achieve this, we'll write an
[`onTap`]({{site.api}}/flutter/material/ListTile/onTap.html)
callback for our `ListTile` Widget. Within our `onTap` callback, we'll once
again employ the [`Navigator.push`]({{site.api}}/flutter/widgets/Navigator/push.html)
method.

想要实现这些， 我们来编写 `ListTile` widget 的 `onTap` 回调函数， 继续使用 [`Navigator.push`]({{site.api}}/flutter/widgets/Navigator/push.html) 方法。

<!-- skip -->
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(todos[index].title),
      // When a user taps on the ListTile, navigate to the DetailScreen.
      // Notice that we're not only creating a DetailScreen, we're
      // also passing the current todo to it!
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => DetailScreen(todo: todos[index]),
          ),
        );
      },
    );
  },
);
```

## Complete example

## 完整代码

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class Todo {
  final String title;
  final String description;

  Todo(this.title, this.description);
}

void main() {
  runApp(MaterialApp(
    title: 'Passing Data',
    home: TodosScreen(
      todos: List.generate(
        20,
        (i) => Todo(
              'Todo $i',
              'A description of what needs to be done for Todo $i',
            ),
      ),
    ),
  ));
}

class TodosScreen extends StatelessWidget {
  final List<Todo> todos;

  TodosScreen({Key key, @required this.todos}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Todos'),
      ),
      body: ListView.builder(
        itemCount: todos.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(todos[index].title),
            // When a user taps on the ListTile, navigate to the DetailScreen.
            // Notice that we're not only creating a DetailScreen, we're
            // also passing the current todo through to it!
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => DetailScreen(todo: todos[index]),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  // Declare a field that holds the Todo
  final Todo todo;

  // In the constructor, require a Todo
  DetailScreen({Key key, @required this.todo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Use the Todo to create our UI
    return Scaffold(
      appBar: AppBar(
        title: Text(todo.title),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Text(todo.description),
      ),
    );
  }
}
```

![Passing Data Demo](/images/cookbook/passing-data.gif){:.site-mobile-screenshot}
