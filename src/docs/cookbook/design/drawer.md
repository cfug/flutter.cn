---
title: Add a Drawer to a screen
title: 在屏幕上添加一个 Drawer
prev:
  title: Fade a Widget in and out
  title: Widget 的淡入淡出效果
  path: /docs/cookbook/animation/opacity-animation
next:
  title: Displaying SnackBars
  title: 显示 SnackBars
  path: /docs/cookbook/design/snackbars
---

In apps that employ Material Design, there are two primary options for
navigation: tabs and drawers. When there is insufficient space to support tabs,
Drawers provide a handy alternative.

在 Material Design 设计准则里，主要提供了两种导航方式：tab 和 drawer。 当没有足够的空间来支持 tab 导航时，drawer 提供了一个方便的选择。

In Flutter, we can use the [`Drawer`]({{site.api}}/flutter/material/Drawer-class.html)
Widget in combination with a [`Scaffold`]({{site.api}}/flutter/material/Scaffold-class.html)
to create a layout with a Material Design Drawer.

在Flutter中，我们可以将 [`Drawer`]({{site.api}}/flutter/material/Drawer-class.html) 小部件与 [`Scaffold`]({{site.api}}/flutter/material/Scaffold-class.html) 结合使用来创建一个具有 Material Design 风格的 drawer 布局。

## Directions

## 步骤

  1. Create a `Scaffold`

     创建一个 `Scaffold`

  2. Add a drawer

     添加一个 drawer

  3. Populate the drawer with items

     向 drawer 中添加内容

  4. Close the drawer programmatically

     通过代码关闭 drawer

## 1. Create a `Scaffold`

## 1. 创建一个 `Scaffold`

In order to add a Drawer to our app, we'll need to wrap it in a
[Scaffold]({{site.api}}/flutter/material/Scaffold-class.html)
Widget. The Scaffold Widget provides a consistent visual structure to apps that
follow the Material Design Guidelines. It also supports special Material Design
components, such as Drawers, AppBars, and SnackBars.

为了向应用中添加一个 Drawer，我们需要将其放在 [Scaffold]({{site.api}}/flutter/material/Scaffold-class.html) 小部件中。 Scaffold 小部件为遵循 Material 设计守则的应用程序提供了一套统一的可视化结构。它同样支持一些特殊的 Material Design 组件，例如 Drawer，AppBar 和 SnackBar 等。

In this case, we'll want to create a `Scaffold` with a `drawer`:

在这个例子中，我们想要创建一个带有 `drawer` 的 `Scaffold`：

<!-- skip -->
```dart
Scaffold(
  drawer: // We'll add our Drawer here in the next step!
);
```

## 2. Add a drawer

## 2. 添加一个 drawer

We can now add a drawer to our `Scaffold`. A drawer could be any Widget, but
it's often best to use the `Drawer` widget from the
[material library]({{site.api}}/flutter/material/material-library.html),
which adheres to the Material Design spec.

我们现在可以在 `Scaffold` 上添加一个 drawer。虽然 drawer 可以是任何小部件，但最好还是使用 [material library]({{site.api}}/flutter/material/material-library.html) 中的 `Drawer` 小部件，因为这样才符合 Material Design 设计规范。

<!-- skip -->
```dart
Scaffold(
  drawer: Drawer(
    child: // We'll populate the Drawer in the next step!
  )
);
```

## 3. Populate the drawer with items

## 3. 向 drawer 中添加内容

Now that we have a `Drawer` in place, we can add content to it. In this example,
we will use a [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html).
While we could use a `Column` Widget, `ListView` is handy in this situation
because it will allow users to scroll through the drawer if the content takes up
more space than the screen supports.

既然已经有了一个 `Drawer`，我们现在就可以向其中添加内容。在这个例子中，我们将使用 [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)。虽然你也可以使用 `Column` 小部件，但是 `ListView` 在这种情况下将是更好的选择，因为如果内容所占用的空间超出了屏幕的话，它将能够允许用户进行滚动。

We will populate the `ListView` with a
[`DrawerHeader`]({{site.api}}/flutter/material/DrawerHeader-class.html)
and two [`ListTile`]({{site.api}}/flutter/material/ListTile-class.html)
Widgets. For more information on working with Lists, please see the
[list recipes](/docs/cookbook#lists).

我们将使用 [`DrawerHeader`]({{site.api}}/flutter/material/DrawerHeader-class.html) 和两个 [`ListTile`]({{site.api}}/flutter/material/ListTile-class.html) 小部件填充 `ListView`。有关使用列表的更多信息，请参阅 [list recipes](/docs/cookbook#lists)。

<!-- skip -->
```dart
Drawer(
  // Add a ListView to the drawer. This ensures the user can scroll
  // through the options in the Drawer if there isn't enough vertical
  // space to fit everything.
  child: ListView(
    // Important: Remove any padding from the ListView.
    padding: EdgeInsets.zero,
    children: <Widget>[
      DrawerHeader(
        child: Text('Drawer Header'),
        decoration: BoxDecoration(
          color: Colors.blue,
        ),
      ),
      ListTile(
        title: Text('Item 1'),
        onTap: () {
          // Update the state of the app
          // ...
        },
      ),
      ListTile(
        title: Text('Item 2'),
        onTap: () {
          // Update the state of the app
          // ...
        },
      ),
    ],
  ),
);
```

## 4. Close the drawer programmatically

## 4. 通过代码关闭 drawer

After a user taps on an item, we often want to close the drawer. How can we
achieve this? Using the [Navigator]({{site.api}}/flutter/widgets/Navigator-class.html)!

当用户点击某个部件后，我们经常需要要关闭 drawer。那么怎样才能做到这一点呢？请使用 [Navigator]({{site.api}}/flutter/widgets/Navigator-class.html)！

When a user opens the Drawer, Flutter adds the drawer to the navigation stack under the hood. Therefore, to close the drawer, we can call `Navigator.pop(context)`.

当用户打开 drawer 时，Flutter 会将 drawer 小部件覆盖在当前的导航堆栈上。 因此，要关闭 drawer，我们可以调用 `Navigator.pop（context）`。

<!-- skip -->
```dart
ListTile(
  title: Text('Item 1'),
  onTap: () {
    // Update the state of the app
    // ...
    // Then close the drawer
    Navigator.pop(context);
  },
),
```

## Complete example

## 一个完整的例子

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  final appTitle = 'Drawer Demo';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      home: MyHomePage(title: appTitle),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(child: Text('My Page!')),
      drawer: Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the Drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Text('Drawer Header'),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ListTile(
              title: Text('Item 1'),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: Text('Item 2'),
              onTap: () {
                // Update the state of the app
                // ...
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

![Drawer Demo](/images/cookbook/drawer.png){:.site-mobile-screenshot}
