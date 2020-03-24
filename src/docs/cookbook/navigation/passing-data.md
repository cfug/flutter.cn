---
title: Send data to a new screen
title: 传递数据到新页面
description: How to pass data to a new route.
description: 如何向新路由传递数据。
prev:
  title: Return data from a screen
  title: 从一个页面回传数据
  path: /docs/cookbook/navigation/returning-data
next:
  title: Fetch data from the internet
  title: 获取网络数据
  path: /docs/cookbook/networking/fetch-data
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

Often, you not only want to navigate to a new screen,
but also pass data to the screen as well.
For example, you might want to pass information about
the item that's been tapped.

在开发的过程中，我们经常需要在跳转到新页面的时候，
能同时传递一些数据。比如，传递用户点击的元素信息。

Remember: Screens are Just widgets.
In this example, create a list of todos.
When a todo is tapped, navigate to a new screen (widget) that
displays information about the todo.
This recipe uses the following steps:

还记得么，全屏的界面也只是 widget。在这个例子中，我们会创建一个待办事项列表，
当某个事项被点击的时候，会跳转到新的一屏 (widget)，
在新的一屏显示待办事项的详细信息。

## Directions

## 步骤

  1. Define a todo class.

     定义一个描述待办事项的数据类

  2. Display a list of todos.

     用列表 (List Widget) 显示待办事项

  3. Create a detail screen that can display information about a todo.

     创建一个显示待办事项详细信息的界面

  4. Navigate and pass data to the detail screen.

     传递数据并跳转到待办事项详细信息界面

## 1. Define a todo class

## 1. 定义一个描述待办事项的数据类

First, you need a simple way to represent todos. For this example,
create a class that contains two pieces of data: the title and description.

首先，我们需要一个简单的方式来描述待办事项。
我们创建一个类叫做 `Todo`，包含 `title` 和 `description` 两个成员变量。

<!-- skip -->
```dart
class Todo {
  final String title;
  final String description;

  Todo(this.title, this.description);
}
```

## 2. Create a list of todos

## 2. 创建待办事项列表

Second, display a list of todos. In this example, generate
20 todos and show them using a ListView.
For more information on working with lists,
see the [Use lists][] recipe.

第二步，我们需要显示一个待办事项列表，
生成 20 条待办事项并用 `ListView` 显示。
如果你想了解更多关于列表显示的内容，
请阅读文档 [`基础列表`][Use lists]。

### Generate the list of todos

### 生成待办事项列表

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

### Display the list of todos using a ListView

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

So far, so good.
This generates 20 todos and displays them in a ListView.

到目前为止， 我们生成了 20 条待办事项， 并用 `ListView` 把它显示出来了。

## 3. Create a detail screen to display information about a todo

## 3. 创建一个显示待办事项详细信息的界面

Now, create the second screen. The title of the screen contains the
title of the todo, and the body of the screen shows the description.

现在，我们来创建第二个全屏的界面，
界面的标题是待办事项的标题，
界面下面显示待办事项的描述信息。

Since the detail screen is a normal `StatelessWidget`,
require the user to enter a `Todo` in the UI.
Then, build the UI using the given todo.

这个界面是一个 `StatelessWidget`，创建的时需要传递 `Todo` 对象给它，
它就可以使用传给他的 `Todo` 对象来构建 UI 。

<!-- skip -->
```dart
class DetailScreen extends StatelessWidget {
  // 声明一个成员变量来保存 Todo 对象 (Declare a field that holds the Todo)
  final Todo todo;

  // 构造函数需要 Todo 对象 (In the constructor, require a Todo)
  DetailScreen({Key key, @required this.todo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 使用 Todo 对象构建 UI (Use the Todo to create the UI)
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

## 4. Navigate and pass data to the detail screen

## 4. 传递数据并跳转到待办事项详细信息界面

With a `DetailScreen` in place,
you're ready to perform the Navigation.
In this example, navigate to the `DetailScreen` when a user
taps a todo in the list. Pass the todo to the `DetailScreen`.

上面写完了 `DetailScreen` ，现在该执行界面跳转啦！
我们想让用户在点击列表中的某个待办事项时跳转到 `DetailScreen` 界面，
同时能传递点击的这条代办事项对象（`Todo` 对象） 。

To capture the user's tap, write an [`onTap()`][]
callback for the `ListTile` widget. Within the `onTap()` callback,
use the [`Navigator.push()`][] method.

想要实现这些，我们来编写 `ListTile` widget 的 `onTap()` 回调函数，
继续使用 [`Navigator.push()`][] 方法。

<!-- skip -->
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(todos[index].title),
      // When a user taps the ListTile, navigate to the DetailScreen.
      // Notice that you're not only creating a DetailScreen, you're
      // also passing the current todo to it.
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

### Interactive example

### 交互式样例

### Interactive example

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
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
            // When a user taps the ListTile, navigate to the DetailScreen.
            // Notice that you're not only creating a DetailScreen, you're
            // also passing the current todo through to it.
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
  // Declare a field that holds the Todo.
  final Todo todo;

  // In the constructor, require a Todo.
  DetailScreen({Key key, @required this.todo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Use the Todo to create the UI.
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

## Alternatively, pass the arguments using RouteSettings

## 或者使用 RouteSettings 传递参数

Repeat the first two steps.

重复前面两个步骤。

### Create a detail screen to extract the arguments

### 创建一个详情页以提取参数

Next, create a detail screen that extracts and displays
the title and description from the `Todo`. 
To access the `Todo`, use the `ModalRoute.of()` method.
This method returns the current route with the arguments.

接下来，创建一个详情页用于提取并显示来自 `Todo` 页面的标题和描述信息。
为了访问 `Todo` 页面，请使用 `ModalRoute.of()` 方法。
它将会返回带有参数的当前路由。

<!-- skip -->
```dart
class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Todo todo = ModalRoute.of(context).settings.arguments;

    // Use the Todo to create the UI.
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

### Navigate and pass the arguments to the detail screen

### 导航并向详情页传递参数

Finally, navigate to the `DetailScreen` when a user taps
a `ListTile` widget using `Navigator.push()`.
Pass the arguments as part of the `RouteSettings`.
The `DetailScreen` extracts these arguments.

最后，当用户点击 `ListTile` widget 时，
使用 `Navigator.push()` 导航到 `DetailScreen`。
将参数作为 `RouteSettings` 的一部分进行传递，
`DetailScreen` 将会提取这些参数。

<!-- skip -->
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(todos[index].title),
      // When a user taps the ListTile, navigate to the DetailScreen.
      // Notice that you're not only creating a DetailScreen, you're
      // also passing the current todo through to it.
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => DetailScreen(),
            // Pass the arguments as part of the RouteSettings. The
            // DetailScreen reads the arguments from these settings.
            settings: RouteSettings(
              arguments: todos[index],
            ),
          ),
        );
      },
    );
  },
),
```

### Complete example

### 完整样例

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
            // When a user taps the ListTile, navigate to the DetailScreen.
            // Notice that you're not only creating a DetailScreen, you're
            // also passing the current todo through to it.
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => DetailScreen(),
                  // Pass the arguments as part of the RouteSettings. The
                  // DetailScreen reads the arguments from these settings.
                  settings: RouteSettings(
                    arguments: todos[index],
                  ),
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
  @override
  Widget build(BuildContext context) {
    final Todo todo = ModalRoute.of(context).settings.arguments;

    // Use the Todo to create the UI.
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

<noscript>
  <img src="/images/cookbook/passing-data.gif" alt="Passing Data Demo" class="site-mobile-screenshot" />
</noscript>


[`Navigator.push()`]: {{site.api}}/flutter/widgets/Navigator/push.html
[`onTap()`]: {{site.api}}/flutter/material/ListTile/onTap.html
[Use lists]: /docs/cookbook/lists/basic-list
