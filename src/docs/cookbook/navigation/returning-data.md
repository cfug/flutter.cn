---
title: Return data from a screen
title: 从一个页面回传数据
prev:
  title: Pass arguments to a named route
  title: 给特定的 route 传参
  path: /docs/cookbook/navigation/navigate-with-arguments
next:
  title: Send data to a new screen
  title: 传递数据到新页面
  path: /docs/cookbook/navigation/passing-data
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

In some cases, you might want to return data from a new screen.
For example, say you push a new screen that presents two options to a user.
When the user taps an option, you want to inform the first screen
of the user's selection so that it can act on that information.

在某些场景下，我们需要在回退到上一屏时同时返回一些数据。
比如，我们跳转到新的一屏，有两个选项让用户选择，
当用户点击某个选项后会返回到第一屏，同时在第一屏可以知道用户选择的信息。

You can do this with the [`Navigator.pop()`][]
method using the following steps:

你可以使用 [`Navigator.pop()`][] 来进行以下步骤：

## Directions

## 步骤

  1. Define the home screen

     创建主屏界面

  2. Add a button that launches the selection screen

     添加按钮，点击时跳转到选择界面

  3. Show the selection screen with two buttons

     在选择界面显示两个按钮

  4. When a button is tapped, close the selection screen

     当任意一个按钮被点击，关闭选择界面回退到主屏界面

  5. Show a snackbar on the home screen with the selection

     在主屏界面显示 snackbar ，展示选中的项目

## 1. Define the home screen

## 1. 创建主屏界面

The home screen displays a button. When tapped,
it launches the selection screen.

主屏界面显示一个按钮，当点击按钮时跳转到选择界面。

<!-- skip -->
```dart
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Returning Data Demo'),
      ),
      // Create the SelectionButton widget in the next step.
      body: Center(child: SelectionButton()),
    );
  }
}
```

## 2. Add a button that launches the selection screen

## 2. 添加按钮，点击时跳转到选择界面

Now, create the SelectionButton, which does the following:

接下来，我们创建 SelectionButton 按钮，它有两个功能：

  * Launches the SelectionScreen when it's tapped.

    点击时跳转到选择界面

  * Waits for the SelectionScreen to return a result.

    等待选择界面给它返回结果

<!-- skip -->
```dart
class SelectionButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: () {
        _navigateAndDisplaySelection(context);
      },
      child: Text('Pick an option, any option!'),
    );
  }

  // A method that launches the SelectionScreen and awaits the
  // result from Navigator.pop.
  _navigateAndDisplaySelection(BuildContext context) async {
    // Navigator.push returns a Future that completes after calling
    // Navigator.pop on the Selection Screen.
    final result = await Navigator.push(
      context,
      // Create the SelectionScreen in the next step.
      MaterialPageRoute(builder: (context) => SelectionScreen()),
    );
  }
}
```

## 3. Show the selection screen with two buttons

## 3. 在选择界面显示两个按钮

Now, build a selection screen that contains two buttons.
When a user taps a button,
that app closes the selection screen and lets the home
screen know which button was tapped.

现在来构建选择界面，它包含两个按钮，
当任意一个按钮被点击的时候，关闭选择页面回退到主屏界面，
并让主屏界面知道哪个按钮被点击了。

This step defines the UI.
The next step adds code to return data.

这一步我们来定义 UI，在下一步完成数据的返回。

```dart
class SelectionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Pick an option'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: RaisedButton(
                onPressed: () {
                  // 在这里返回 "Yep" (Pop here with "Yep"...)
                },
                child: Text('Yep!'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: RaisedButton(
                onPressed: () {
                  // 在这里返回 "Nope" (Pop here with "Nope")
                },
                child: Text('Nope.'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
```

## 4. When a button is tapped, close the selection screen

## 4. 当任意一个按钮被点击，关闭选择界面回退到主屏界面

Now, update the `onPressed()` callback for both of the buttons.
To return data to the first screen,
use the [`Navigator.pop()`][] method,
which accepts an optional second argument called `result`.
Any result is returned to the `Future` in the SelectionButton.

接下来我们来更新两个按钮的 `onPressed()` 回调函数，
使用 [`Navigator.pop()`][] 回退界面并返回数据给主屏界面。
`Navigator.pop()` 方法可以接受第二个参数 `result`，它是可选的，
如果传递了 `result`，数据将会通过 `Future` 方法的返回值传递。

### Yep button

### Yep 按钮

<!-- skip -->
```dart
RaisedButton(
  onPressed: () {
    // The Yep button returns "Yep!" as the result.
    Navigator.pop(context, 'Yep!');
  },
  child: Text('Yep!'),
);
```

### Nope button

### Nope 按钮

<!-- skip -->
```dart
RaisedButton(
  onPressed: () {
    // The Nope button returns "Nope!" as the result.
    Navigator.pop(context, 'Nope!');
  },
  child: Text('Nope!'),
);
```

## 5. Show a snackbar on the home screen with the selection

## 5. 在主屏界面显示一个 snackbar，展示选中的项目

Now that you're launching a selection screen and awaiting the result,
you'll want to do something with the information that's returned.

现在，我们跳转到选择界面并等待返回结果，当结果返回时我们可以做些事情。

In this case, show a snackbar displaying the result by using the
`_navigateAndDisplaySelection()` method in `SelectionButton`:

在本例中，我们用一个 snackbar 显示结果，
我们来更新 `SelectionButton` 类中的 `_navigateAndDisplaySelection()` 方法。

<!-- skip -->
```dart
_navigateAndDisplaySelection(BuildContext context) async {
  final result = await Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => SelectionScreen()),
  );

  // After the Selection Screen returns a result, hide any previous snackbars
  // and show the new result.
  // 等选择界面返回结果，先隐藏之前的 snackbars，结果显示在新的 snackbars 里  (After the Selection Screen returns a result, hide any previous snackbars and show the new result!)
  Scaffold.of(context)
    ..removeCurrentSnackBar()
    ..showSnackBar(SnackBar(content: Text("$result")));
}
```

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Returning Data',
    home: HomeScreen(),
  ));
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Returning Data Demo'),
      ),
      body: Center(child: SelectionButton()),
    );
  }
}

class SelectionButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: () {
        _navigateAndDisplaySelection(context);
      },
      child: Text('Pick an option, any option!'),
    );
  }

  // A method that launches the SelectionScreen and awaits the result from
  // Navigator.pop.
  _navigateAndDisplaySelection(BuildContext context) async {
    // Navigator.push returns a Future that completes after calling
    // Navigator.pop on the Selection Screen.
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SelectionScreen()),
    );

    // After the Selection Screen returns a result, hide any previous snackbars
    // and show the new result.
    Scaffold.of(context)
      ..removeCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text("$result")));
  }
}

class SelectionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Pick an option'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: RaisedButton(
                onPressed: () {
                  // Close the screen and return "Yep!" as the result.
                  Navigator.pop(context, 'Yep!');
                },
                child: Text('Yep!'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: RaisedButton(
                onPressed: () {
                  // Close the screen and return "Nope!" as the result.
                  Navigator.pop(context, 'Nope.');
                },
                child: Text('Nope.'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/images/cookbook/returning-data.gif" alt="Returning data demo" class="site-mobile-screenshot" />
</noscript>


[`Navigator.pop()`]: {{site.api}}/flutter/widgets/Navigator/pop.html
