---
# title: Add a drawer to a screen
title: 在屏幕上添加一个 drawer
# description: How to implement a Material Drawer.
description: 如何实现一个 Material 风格的 Drawer。
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/design/drawer"?>

In apps that use Material Design,
there are two primary options for navigation: tabs and drawers.
When there is insufficient space to support tabs,
drawers provide a handy alternative.

在 Material Design 设计准则里，主要提供了两种导航方式：Tab 和 Drawer。
当没有足够的空间来支持 tab 导航时，drawer 提供了另一个方便的选择。

In Flutter, use the [`Drawer`][] widget in combination with a
[`Scaffold`][] to create a layout with a Material Design drawer.
This recipe uses the following steps:

在 Flutter中，我们可以将 [`Drawer`][] widget 与 [`Scaffold`][] 结合使用
来创建一个具有 Material Design 风格的 Drawer 布局。
请参见如下的步骤：

  1. Create a `Scaffold`.

     创建一个 `Scaffold`。

  2. Add a drawer.

     添加一个 drawer。

  3. Populate the drawer with items.

     向 drawer 中添加内容。

  4. Close the drawer programmatically.

     通过代码关闭 drawer。

## 1. Create a `Scaffold`

## 1. 创建一个 `Scaffold`

To add a drawer to the app, wrap it in a [`Scaffold`][] widget.
The `Scaffold` widget provides a consistent visual structure to apps that
follow the Material Design Guidelines.
It also supports special Material Design
components, such as Drawers, AppBars, and SnackBars.

为了向应用中添加一个 Drawer，我们需要将其放在 [`Scaffold`][] widget 中。
Scaffold Widget 为遵循 Material 设计守则的应用程序提供了一套统一的可视化结构。
它同样支持一些特殊的 Material Design 组件，例如 Drawer，AppBar 和 SnackBar 等。

In this example, create a `Scaffold` with a `drawer`:

在这个例子中，我们想要创建一个带有 `drawer` 的 `Scaffold`：

<?code-excerpt "lib/drawer.dart (DrawerStart)" replace="/null, //g"?>
```dart
Scaffold(
  appBar: AppBar(title: const Text('AppBar without hamburger button')),
  drawer: // Add a Drawer here in the next step.
);
```

## 2. Add a drawer

## 2. 添加一个 drawer

Now add a drawer to the `Scaffold`. A drawer can be any widget,
but it's often best to use the `Drawer` widget from the
[material library][],
which adheres to the Material Design spec.

我们现在可以在 `Scaffold` 上添加一个 drawer。虽然 drawer 可以是任何 widget，
但最好还是使用 [Material Library]({{site.api}}/flutter/material/material-library.html)
中的 `Drawer` widget，因为这样才符合 Material Design 设计规范。

<?code-excerpt "lib/drawer.dart (DrawerEmpty)" replace="/null, //g"?>
```dart
Scaffold(
  appBar: AppBar(title: const Text('AppBar with hamburger button')),
  drawer: Drawer(
    child: // Populate the Drawer in the next step.
  ),
);
```

## 3. Populate the drawer with items

## 3. 向 drawer 中添加内容

Now that you have a `Drawer` in place, add content to it.
For this example, use a [`ListView`][].
While you could use a `Column` widget,
`ListView` is handy because it allows users to scroll
through the drawer if the
content takes more space than the screen supports.

既然已经有了一个 `Drawer`，我们现在就可以向其中添加内容。
在这个例子中，我们将使用 [`ListView`][]。
虽然你也可以使用 `Column` widget，但是 `ListView` 在这种情况下将是更好的选择，
因为如果内容所占用的空间超出了屏幕的话，它将能够允许用户进行滚动。

Populate the `ListView` with a [`DrawerHeader`][]
and two [`ListTile`][] widgets.
For more information on working with Lists,
see the [list recipes][].

我们将使用 [`DrawerHeader`][] 和两个 [`ListTile`][] widget 填充 `ListView`。
有关使用 List 的更多信息，请参阅实用教程中的 [list recipes][]。

<?code-excerpt "lib/drawer.dart (DrawerListView)"?>
```dart
Drawer(
  // Add a ListView to the drawer. This ensures the user can scroll
  // through the options in the drawer if there isn't enough vertical
  // space to fit everything.
  child: ListView(
    // Important: Remove any padding from the ListView.
    padding: EdgeInsets.zero,
    children: [
      const DrawerHeader(
        decoration: BoxDecoration(color: Colors.blue),
        child: Text('Drawer Header'),
      ),
      ListTile(
        title: const Text('Item 1'),
        onTap: () {
          // Update the state of the app.
          // ...
        },
      ),
      ListTile(
        title: const Text('Item 2'),
        onTap: () {
          // Update the state of the app.
          // ...
        },
      ),
    ],
  ),
);
```

## 4. Open the drawer programmatically

## 4. 通过编程打开 drawer

Typically, you don't need to write any code to open a `drawer`,
Because when the `leading` widget is null, the default implementation in `AppBar` is `DrawerButton`.

通常情况下，你不需要编写任何代码来打开 `drawer`，
因为当 `leading` widget 为 null 时，
`AppBar` 默认实现的是 `DrawerButton`。

But if you want to have free control of the `drawer`.
You can do this by using the `Builder` call `Scaffold.of(context).openDrawer()`.

但是，如果你想自由控制 `drawer`。
你可以使用 `Builder` 调用 `Scaffold.of(context).openDrawer()` 来做到这一点。

<?code-excerpt "lib/drawer.dart (DrawerOpen)" replace="/null, //g"?>
```dart
Scaffold(
  appBar: AppBar(
    title: const Text('AppBar with hamburger button'),
    leading: Builder(
      builder: (context) {
        return IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {
            Scaffold.of(context).openDrawer();
          },
        );
      },
    ),
  ),
  drawer: Drawer(
    child: // Populate the Drawer in the last step.
  ),
);
```

## 5. Close the drawer programmatically

## 5. 通过编程关闭 drawer

After a user taps an item, you might want to close the drawer.
You can do this by using the [`Navigator`][].

我们经常需要在用户点击某个项目后就将 Drawer 关掉。
那么怎样才能做到这一点呢？请试试看 [`Navigator`][]。

When a user opens the drawer, Flutter adds the drawer to the navigation
stack. Therefore, to close the drawer, call `Navigator.pop(context)`.

当用户打开 Drawer 时，Flutter 会将 drawer widget 覆盖在当前的导航堆栈上。
因此，要关闭 drawer，我们可以通过调用 `Navigator.pop(context)` 来实现。

<?code-excerpt "lib/drawer.dart (CloseDrawer)"?>
```dart
ListTile(
  title: const Text('Item 1'),
  onTap: () {
    // Update the state of the app
    // ...
    // Then close the drawer
    Navigator.pop(context);
  },
),
```

## Interactive example

## 交互式样例

This example shows a [`Drawer`][] as it is used within a [`Scaffold`][] widget.
The [`Drawer`][] has three [`ListTile`][] items.
The `_onItemTapped` function changes the selected item's index
and displays the corresponding text in the center of the `Scaffold`.

该示例展示了如何在 [`Scaffold`][] 中使用 [`Drawer`][]。
[`Drawer`][] 中包含三个 [`ListTile`][]。
`_onItemTapped` 方法会改变当前选中的元素，并在 `Scaffold` 中央展示对应的文字。

:::note

For more information on implementing navigation,
check out the [Navigation][] section of the cookbook.

想要了解更多关于如何实现导航的信息，
查阅 [导航][Navigation] 文档。

:::

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter drawer hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const appTitle = 'Drawer Demo';

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: appTitle,
      home: MyHomePage(title: appTitle),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle = TextStyle(
    fontSize: 30,
    fontWeight: FontWeight.bold,
  );
  static const List<Widget> _widgetOptions = <Widget>[
    Text('Index 0: Home', style: optionStyle),
    Text('Index 1: Business', style: optionStyle),
    Text('Index 2: School', style: optionStyle),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        leading: Builder(
          builder: (context) {
            return IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
            );
          },
        ),
      ),
      body: Center(child: _widgetOptions[_selectedIndex]),
      drawer: Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(color: Colors.blue),
              child: Text('Drawer Header'),
            ),
            ListTile(
              title: const Text('Home'),
              selected: _selectedIndex == 0,
              onTap: () {
                // Update the state of the app
                _onItemTapped(0);
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Business'),
              selected: _selectedIndex == 1,
              onTap: () {
                // Update the state of the app
                _onItemTapped(1);
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('School'),
              selected: _selectedIndex == 2,
              onTap: () {
                // Update the state of the app
                _onItemTapped(2);
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/drawer.png" alt="抽屉样例" class="site-mobile-screenshot" />
</noscript>


[`Drawer`]: {{site.api}}/flutter/material/Drawer-class.html
[`DrawerHeader`]: {{site.api}}/flutter/material/DrawerHeader-class.html
[list recipes]: /cookbook#lists
[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[material library]: {{site.api}}/flutter/material/material-library.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[Navigation]: /cookbook#navigation
