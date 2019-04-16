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

在使用 Material Design 的应用程序中，有两个主要选择用于导航：标签和抽屉。 当没有足够的空间来支持标签时，抽屉提供了一个方便的选择。

In Flutter, we can use the [`Drawer`]({{site.api}}/flutter/material/Drawer-class.html)
Widget in combination with a [`Scaffold`]({{site.api}}/flutter/material/Scaffold-class.html)
to create a layout with a Material Design Drawer.

在Flutter中，我们可以将 [`Drawer`]({{site.api}}/flutter/material/Drawer-class.html) 小部件与 [`Scaffold`]({{site.api}}/flutter/material/Scaffold-class.html) 结合使用来创建一个带有Material Design Drawer的布局。

## Directions

  1. Create a `Scaffold`
  2. Add a drawer
  3. Populate the drawer with items
  4. Close the drawer programmatically

## 步骤
  1. 创建一个 `Scaffold`
  2. 添加一个抽屉
  3. 使用小部件填充抽屉
  4. 以编程的方式关闭抽屉

## 1. Create a `Scaffold`

## 1. 创建一个 `Scaffold`

In order to add a Drawer to our app, we'll need to wrap it in a
[Scaffold]({{site.api}}/flutter/material/Scaffold-class.html)
Widget. The Scaffold Widget provides a consistent visual structure to apps that
follow the Material Design Guidelines. It also supports special Material Design
components, such as Drawers, AppBars, and SnackBars.

为了向我们的应用添加抽屉，我们需要将其包装在 [Scaffold]({{site.api}}/flutter/material/Scaffold-class.html) 小部件中。 Scaffold Widget 为遵循 Material Design Guidelines 的应用程序提供一致的可视化结构。 它还支持一些特殊的Material Design组件，例如Drawers，AppBars和SnackBars。

In this case, we'll want to create a `Scaffold` with a `drawer`:

这样，我们就可以创建一个带有 `drawer` 的 `Scaffold` ：

<!-- skip -->
```dart
Scaffold(
  drawer: // We'll add our Drawer here in the next step!
);
```

## 2. Add a drawer

## 2. 添加一个抽屉

We can now add a drawer to our `Scaffold`. A drawer could be any Widget, but
it's often best to use the `Drawer` widget from the
[material library]({{site.api}}/flutter/material/material-library.html),
which adheres to the Material Design spec.

我们现在可以在我们的 `Scaffold` 上添加一个抽屉。抽屉可以是任何小部件，但最好使用 [material library]({{site.api}}/flutter/material/material-library.html) 中的 `Drawer` 小部件，它符合 Material Design 的设计规范。

<!-- skip -->
```dart
Scaffold(
  drawer: Drawer(
    child: // We'll populate the Drawer in the next step!
  )
);
```

## 3. Populate the drawer with items

## 3. 使用小部件填充抽屉

Now that we have a `Drawer` in place, we can add content to it. In this example,
we will use a [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html).
While we could use a `Column` Widget, `ListView` is handy in this situation
because it will allow users to scroll through the drawer if the content takes up
more space than the screen supports.

既然我们有了一个'抽屉'，我们就可以向其中添加内容。在这个例子中，我们将使用 [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)。虽然我们也可以使用 `Column` 小部件，但是 `ListView` 在这种情况下是更好的选择，因为如果内容占用的空间比屏幕支持的更多，它将允许用户滚动抽屉。

We will populate the `ListView` with a
[`DrawerHeader`]({{site.api}}/flutter/material/DrawerHeader-class.html)
and two [`ListTile`]({{site.api}}/flutter/material/ListTile-class.html)
Widgets. For more information on working with Lists, please see the
[list recipes](/docs/cookbook#lists).

我们将使用 [`Drawer Header`]({{site.api}}/flutter/material/DrawerHeader-class.html) 和两个 [`ListTile`]({{site.api}}/flutter/material/ListTile-class.html) 小部件填充 `ListView` 。 有关使用列表的更多信息，请参阅 [list recipes](/docs/cookbook#lists)。

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

## 4. 以编程的方式关闭抽屉

After a user taps on an item, we often want to close the drawer. How can we
achieve this? Using the [Navigator]({{site.api}}/flutter/widgets/Navigator-class.html)!

用户点击某个部件后，我们经常要关闭抽屉。 我们怎样才能做到这一点？ 使用 [Navigator]({{site.api}}/flutter/widgets/Navigator-class.html)！

When a user opens the Drawer, Flutter adds the drawer to the navigation
stack under the hood. Therefore, to close the drawer, we can call
`Navigator.pop(context)`.

当用户打开抽屉时，Flutter将抽屉小部件盖在当前导航堆栈上。 因此，要关闭抽屉，我们可以调用 `Navigator.pop（context）`。

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

## 完整示例

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
