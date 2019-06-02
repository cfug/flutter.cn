---
title: Flutter for React Native developers

title: 给 React Native 开发者的 Flutter 指南

description: Learn how to apply React Native developer knowledge when building Flutter apps.

description: 学习如何把 React Native 的开发经验应用到 Flutter 应用的开发中。
---

This document is for React Native (RN) developers looking to apply their
existing RN knowledge to build mobile apps with Flutter. If you understand
the fundamentals of the RN framework then you can use this document as a
way to get started learning Flutter development.

本文面向希望基于现有的 React Native 的知识结构使用 Flutter 开发移动端应用的开发者。如果你已经对 RN 的框架有所了解，那么你可以通过这个文档入门 Flutter 开发。

This document can be used as a cookbook by jumping around and finding
questions that are most relevant to your needs.

本文可以当做查询手册使用，里面涉及到的问题基本上可以满足需求。

## Introduction to Dart for JavaScript Developers

## 针对 JavaScript 开发者的 Dart 介绍

Like React Native, Flutter uses reactive-style views. However, while RN
transpiles to native widgets, Flutter compiles all the way to native code.
Flutter controls each pixel on the screen, which avoids performance problems
caused by the need for a JavaScript bridge.

和 React Native 一样，Flutter 使用 reactive 风格的视图。然而，RN 需要被转译为本地对应的控件，而 Flutter 是直接编译成本地原生代码。Flutter 可以控制屏幕上的每一个像素，如此可以避免由于使用 JavaScript Bridge 导致的性能问题。

Dart is an easy language to learn and offers the following features:

Dart 学习起来非常简单而且有如下特性：

* Provides an open-source, scalable programming language for building web,
  server, and mobile apps.

* 它针对 web 服务和移动应用开发提供了一种开源的，可扩展的编程语言。

* Provides an object-oriented, single inheritance language that uses a C-style
  syntax that is AOT-compiled into native.

* 它提供了一种面向对象的单继承语言，使用 C 语言风格的语法并且可通过 AOT 编译为本地代码。

* Transcompiles optionally into JavaScript.

* 可转译为 JavaScript 代码。

* Supports interfaces and abstract classes.

* 支持接口和抽象类。

A few examples of the differences between JavaScript and Dart are described
below.

下面的几个例子解释了 JavaScript 和 Dart 的区别。

### Entry point

### 入口函数

JavaScript doesn't have a pre-defined entry function—you define the entry point.

JavaScript 并没有预定义的入口函数。

```js

// JavaScript
function startHere() {
  // Can be used as entry point
  //这里可以当做入口函数
}
```
In Dart, every app must have a top-level `main()` function that serves as the
entry point to the app.

在 Dart 里，每个应用程序必须有一个最顶级的 `main()` 函数，该函数作为应用程序的入口函数。

<!-- skip -->
```dart
// Dart
main() {
}
```

Try it out in [DartPad]({{site.dartpad}}/0df636e00f348bdec2bc1c8ebc7daeb1).

可以在这里查看效果 [DartPad]({{site.dartpad}}/0df636e00f348bdec2bc1c8ebc7daeb1)。

### Printing to the console

### 在控制台打印输出

To print to the console in Dart, use `print()`.

在 Dart 中如果需要在控制台进行输出，调用 `print()`。

```js
// JavaScript
console.log("Hello world!");
```

<!-- skip -->
```dart
// Dart
print('Hello world!');
```

Try it out in
[DartPad]({{site.dartpad}}/cf9e652f77636224d3e37d96dcf238e5).

可以在这里查看效果 [DartPad]({{site.dartpad}}/cf9e652f77636224d3e37d96dcf238e5)。

### Variables

### 变量

Dart is type safe—it uses a combination of static type checking and runtime
checks to ensure that a variable’s value always matches the variable’s static
type. Although types are mandatory, some type annotations are optional because
Dart performs type inference.

Dart 是类型安全的，它结合静态类型检查和运行时检查来保证变量的值总是和变量的静态类型相匹配。虽然类型是语法要求，有些类型标注也并不是必须要填的，因为 Dart 使用类型推断。

#### Creating and assigning variables

#### 创建变量并赋值

In JavaScript, variables cannot be typed.

在 JavaScript 中，变量是无法指定类型的。

In [Dart]({{site.dart-site}}/dart-2), variables must either be explicitly
typed or the type system must infer the proper type automatically.

在 [Dart]({{site.dart-site}}/dart-2) 中，变量要么被显式定义类型，要么系统会自动判断变量的类型。

```js
// JavaScript
var name = "JavaScript";
```

<!-- skip -->
```dart
// Dart
String name = 'dart'; // Explicitly typed as a string.

String name = 'dart'; // 显式声明为字符串。

var otherName = 'Dart'; // Inferred string.

var otherName = 'Dart'; // 推断为字符串。

// Both are acceptable in Dart.

// 两种定义方式在 Dart 中都可以。
```

Try it out in
[DartPad]({{site.dartpad}}/3f4625c16e05eec396d6046883739612).

可以在这里查看效果 [DartPad]({{site.dartpad}}/3f4625c16e05eec396d6046883739612)。

For more information, see [Dart's Type
System]({{site.dart-site}}/guides/language/sound-dart).

如果想了解更多相关信息，请转向该页面 [Dart's Type
System]({{site.dart-site}}/guides/language/sound-dart)。

#### Default value

#### 默认值

In JavaScript, uninitialized variables are `undefined`.

在 JavaScript 中， 未初始化的变量是 'undefined'。

In Dart, uninitialized variables have an initial value of `null`. Because
numbers are objects in Dart, even uninitialized variables with numeric types
have the value `null`.

在 Dart 中，未初始化的变量会有一个初始值 `null`。因为数字在 Dart 是对象，甚至未初始化的数字类型的变量也会是 `null`。

```js
// JavaScript
var name; // == undefined
```

<!-- skip -->
```dart
// Dart
var name; // == null
int x; // == null
```

Try it out in
[DartPad]({{site.dartpad}}/57ec21faa8b6fe2326ffd74e9781a2c7).

可以在这里查看效果 [DartPad]({{site.dartpad}}/57ec21faa8b6fe2326ffd74e9781a2c7)。


For more information, see the documentation on
[variables]({{site.dart-site}}/guides/language/language-tour#variables).

如果想了解更多详细内容，请查看这个文档 [variables]({{site.dart-site}}/guides/language/language-tour#variables)。

### Checking for null or zero

### 检查 null　或者零值。

In JavaScript, values of 1 or any non-null objects are treated as true.

在 JavaScript 中，1 或者任何非空对象都相当于 true。

```js
// JavaScript
var myNull = null;
if (!myNull) {
  console.log("null is treated as false");
}
var zero = 0;
if (!zero) {
  console.log("0 is treated as false");
}
```
In Dart, only the boolean value `true` is treated as true.

在 Dart 中，只有布尔类型值 `true` 才是 true。

<!-- skip -->
```dart
// Dart
var myNull = null;
if (myNull == null) {
  print('use "== null" to check null');
}
var zero = 0;
if (zero == 0) {
  print('use "== 0" to check zero');
}
```

Try it out in
[DartPad]({{site.dartpad}}/c85038ad677963cb6dc943eb1a0b72e6).

可以在这里查看效果 [DartPad]({{site.dartpad}}/c85038ad677963cb6dc943eb1a0b72e6)。

### Functions

### 函数

Dart and JavaScript functions are generally similar. The primary difference is
the declaration.

Dart 和 JavaScript 中的函数很相似。最大的区别是声明格式。

```js
// JavaScript
function fn() {
  return true;
}
```

<!-- skip -->
```dart
// Dart
fn() {
  return true;
}
// can also be written as
bool fn() {
  return true;
}
```

Try it out in
[DartPad]({{site.dartpad}}/5454e8bfadf3000179d19b9bc6be9918).

可以在这里查看效果 [DartPad]({{site.dartpad}}/5454e8bfadf3000179d19b9bc6be9918)。

For more information, see the documentation on
[functions]({{site.dart-site}}/guides/language/language-tour#functions).

如果想了解更多相关信息，请转向该页面 [functions]({{site.dart-site}}/guides/language/language-tour#functions)。

### Asynchronous programming

### 异步编程

#### Futures

#### Futures

Like JavaScript, Dart supports single-threaded execution. In JavaScript,
the Promise object represents the eventual completion (or failure)
of an asynchronous operation and its resulting value.

和 JavaScript 类似，Dart 支持单线程。在 JavaScript 中， Promise 对象代表异步操作的完成或者失败。

Dart uses [`Future`]({{site.dart-site}}/tutorials/language/futures)
objects to handle this.

Dart 使用 [`Future`]({{site.dart-site}}/tutorials/language/futures) 对象来实现该机制。

```js
// JavaScript
_getIPAddress = () => {
  const url="https://httpbin.org/ip";
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson.origin);
    })
    .catch(error => {
      console.error(error);
    });
};
```

<!-- skip -->
```dart
// Dart
_getIPAddress() {
  final url = 'https://httpbin.org/ip';
  HttpRequest.request(url).then((value) {
      print(json.decode(value.responseText)['origin']);
  }).catchError((error) => print(error));
}
```

Try it out in
[DartPad]({{site.dartpad}}/5a0017d09b6823d0248d965b93133e2e).

可以在这里查看效果 [DartPad]({{site.dartpad}}/5a0017d09b6823d0248d965b93133e2e)。

For more information, see the documentation on
[Futures]({{site.dart-site}}/tutorials/language/futures).

如果想了解更多相关信息，请参考 [Futures]({{site.dart-site}}/tutorials/language/futures) 的相关文档。

#### `async` and `await`

#### `async` 和 `await`

The `async` function declaration defines an asynchronous function.

`async` 函数声明定义了一个异步函数。

In JavaScript, the `async` function returns a `Promise`. The `await` operator is
used to wait for a `Promise`.

在 JavaScript 中， `async` 函数返回一个 `Promise`。`await` 操作符用于等待 `Promise`。

```js
// JavaScript
async _getIPAddress() {
  const url="https://httpbin.org/ip";
  const response = await fetch(url);
  const json = await response.json();
  const data = await json.origin;
  console.log(data);
}
```

In Dart, an `async` function returns a `Future`, and the body of the function is
scheduled for execution later. The `await` operator is used to wait for a
`Future`.

在 Dart 中，`async` 函数返回一个 `Future`，而函数体会在未来执行。`await` 操作符用于等待 `Future`。

<!-- skip -->
```dart
// Dart
_getIPAddress() async {
  final url = 'https://httpbin.org/ip';
  var request = await HttpRequest.request(url);
  String ip = json.decode(request.responseText)['origin'];
  print(ip);
}
```

Try it out in
[DartPad]({{site.dartpad}}/04bb4334985107cddcd021322398c918).

可以在这里查看效果 [DartPad]({{site.dartpad}}/04bb4334985107cddcd021322398c918)。

For more information, see the documentation for [`async` and
`await`]({{site.dart-site}}/guides/language/language-tour#asynchrony-support).

如果想了解更多相关信息，请参考 [`async` and
`await`]({{site.dart-site}}/guides/language/language-tour#asynchrony-support) 的相关文档。

## The basics

## 基本知识##

### How do I create a Flutter app?

### 如何创建一个 Flutter 应用？

To create an app using React Native, you would run `create-react-native-app`
from the command line.

如果要使用 React Native 创建应用，你需要在命令行里运行 `create-react-native-app`。

{% prettify %}
$ create-react-native-app <projectname>
{% endprettify%}

To create an app in Flutter, do one of the following:

要在 Flutter 中创建应用，完成下面其中一项即可：

* Use the `flutter create` command from the command line. Make sure that the
  Flutter SDK is in your PATH.

* 在命令行中运行命令 `flutter create`。不过要提前确认 Flutter SDK 已经在系统环境变量 PATH 中定义。

* Use an IDE with the Flutter and Dart plugins installed.

* 使用带有 Flutter 和 Dart 插件的 IDE。

{% prettify %}
$ flutter create <projectname>
{% endprettify%}

For more information, see [Getting Started](/docs/get-started), which
walks you through creating a button-click counter app. Creating a Flutter
project builds all the files that you need to run a sample app on both Android
and iOS devices.

如果想要了解更多内容，详见 [Getting Started](/docs/get-started)，在该页面会手把手教你创建一个点击按钮进行计数的应用。创建一个 Flutter 项目就可以构建 Android 和 iOS 设备上运行应用所需的所有文件。

### How do I run my app?

### 我如何运行应用呢？

In React Native, you would run `npm run` or `yarn run` from the project
 directory.

在 React Native, 你可以在项目文件夹中运行 `npm run` 或者 `yarn run`。

 You can run Flutter apps in a couple of ways:

 你可以通过如下几个途径运行 Flutter 应用程序：

 * Use `flutter run` from the project's root directory.

 * 在项目根目录运行 `flutter run`。

 * Use the "run" option in an IDE with the Flutter and Dart plugins.

 * 在带有 Flutter 和 Dart 插件的 IDE 中使用 "run" 选项。

 Your app runs on a connected device, the iOS simulator, or the Android emulator.

 你的应用程序会在已连接的设备、iOS 模拟器或者 Android 模拟器上运行。

For more information, see the Flutter [Getting Started](/docs/get-started) documentation.

如果想了解更多相关信息，可以参考 Flutter 的 [Getting Started](/docs/get-started) 相关文档。

### How do I import widgets?

### 如何导入控件

In React Native, you need to import each required component.

在 React Native 中，你需要导入每一个所需的组件。

```js
//React Native
import React from "react";
import { StyleSheet, Text, View } from "react-native";
```

In Flutter, to use widgets from the Material Design library, import the `material.dart` package. To use iOS style widgets, import the Cupertino library. To use a more basic widget set, import the Widgets library. Or, you can write your own widget library and import that.

在 Flutter 中，如果要使用 Material Design 库里的控件，导入 `material.dart` 包。如果要使用 iOS 风格的控件，导入 Cupertino 库。如果要使用更加基本的控件，导入 Widget 库。或者，你可以实现自己的控件库并导入。

<!-- skip -->
```dart
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/my_widgets.dart';
```
Whichever widget package you import, Dart pulls in only the widgets that are
 used in your app.

无论你导入哪个库，Dart 仅仅引用你应用中用到的控件。

For more information, see the [Flutter Widgets Catalog](/docs/development/ui/widgets).

如果想了解更多相关信息，可以参考 [Flutter Widgets Catalog](/docs/development/ui/widgets)。


### What is the equivalent of the React Native "Hello world!" app in Flutter?

### 在 Flutter 里有没有类似 React Native 中 "Hello world!" 应用程序？

In React Native, the `HelloWorldApp` class extends `React.Component` and
implements the render method by returning a view component.

在 React Native，`HelloWorldApp` 继承自 `React.Component` 并且通过返回 view 对象实现了 render 方法。

```js
// React Native
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
```

In Flutter, you can create an identical "Hello world!" app using the `Center` and `Text` widgets from the core widget library. The `Center` widget becomes the root of the widget tree and has one child, the `Text` widget.

在 Flutter 中，你可以使用核心控件库中的 `Center` 和 `Text` 控件创建对应的 "Hello world!" 应用程序。`Center` 控件是控件树中的根，而且只有 `Text` 一个子控件。

<!-- skip -->
```dart
// Flutter
import 'package:flutter/material.dart';

void main() {
  runApp(
    Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}

```

The following images show the Android and iOS UI for the basic Flutter
"Hello world!" app.

下面的图片展示了 Android 和 iOS 中的基本 Flutter "Hello world!" 应用程序的界面。

{% include android-ios-figure-pair.md image="react-native/hello-world-basic.png" alt="Hello world app" class="border" %}

Now that you've seen the most basic Flutter app, the next section shows how to
take advantage of Flutter's rich widget libraries to create a modern, polished
app.

现在大家已经明白了最基本的 Flutter 应用，接下来会告诉大家如何利用 Flutter 丰富的控件库来创建主流的华丽的应用程序。

### How do I use widgets and nest them to form a widget tree?

### 我如何使用控件并且把它们封装起来组成一个控件树？

In Flutter, almost everything is a widget.

在 Flutter 中，几乎任何元素都是控件。

Widgets are the basic building blocks of an app's user interface. You compose
widgets into a hierarchy, called a widget tree. Each widget nests inside a
parent widget and inherits properties from its parent. Even the application
object itself is a widget. There is no separate “application” object. Instead,
the root widget serves this role.

控件是构建应用软件用户界面的基本元素。你可以将控件按照一定的层次组合，成为控件树。每个控件内嵌在父控件中，并且继承了父控件的属性。甚至应用程序本身就是一个控件。并没有一个独立的应用程序对象。反而 root 控件充当了这个角色。

A widget can define:

一个控件可以定义：

* A structural element—like a button or menu

* 一个结构化的元素 - 类似按钮或者菜单

* A stylistic element—like a font or color scheme

* 一个风格化的元素 - 类似字体或者颜色方案

* An aspect of layout—like padding or alignment

* 布局元素 - 类似填充区或者对齐元素

The following example shows the "Hello world!" app using widgets from the
Material library. In this example, the widget tree is nested inside the
`MaterialApp` root widget.

下面的示例展示了使用 Material 库里控件实现的 "Hello world!" 应用程序。在这个示例中，该控件树是包含在 `MaterialApp` root 控件里的。


<!-- skip -->
```dart
// Flutter
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello world'),
        ),
      ),
    );
  }
}

```


The following images show "Hello world!" built from Material Design widgets. You get more functionality for free than in the basic "Hello world!" app.

下面的图片为大家展示了通过 Material Design 控件所实现的 "Hello world!" 应用。你可以免费获得比 "Hello world!" 应用更多的功能。

{% include android-ios-figure-pair.md image="react-native/hello-world.png" alt="Hello world app" %}

When writing an app, you'll use two types of widgets:

当编写应用代码的时候，你将用到下述两种控件：

[StatelessWidget]({{site.api}}/flutter/widgets/StatelessWidget-class.html) or
 [StatefulWidget]({{site.api}}/flutter/widgets/StatefulWidget-class.html).
A StatelessWidget is just what it sounds like—a
 widget with no state. A StatelessWidget is created once, and never changes its
  appearance. A StatefulWidget dynamically changes state based on data
   received, or user input.

无状态控件 (StatelessWidget) 就像它的名字一样，是一个没有状态的控件。无状态控件一旦创建，就不会改变。而有状态控件 (StatefulWidget) 会基于接收到的数据或者用户输入的数据动态改变状态。

The important difference between stateless and stateful widgets is that
 StatefulWidgets have a State object that stores state data and carries it over
  across tree rebuilds, so it's not lost.

无状态控件和有状态控件之间的主要区别是有状态控件包含一个 State 对象，会缓存状态数据，并且控件树的重构也会携带该数据。因此状态不会丢失。

In simple or basic apps it's easy to nest widgets, but as the code base gets
larger and the app becomes complex, you should break deeply nested widgets into
functions that return the widget or smaller classes. Creating separate functions
and widgets allows you to reuse the components within the app.

在简单的或者基本的应用程序中，封装控件非常简单，但是随着代码量的增加并且应用程序的功能变得更加复杂，你应该将层级复杂的控件封装到函数中或者稍小一些的类。创建独立的函数和控件可以让你更好地复用应用中组件。

### How do I create reusable components?

### 如何创建可复用的组件？

In React Native, you would define a class to create a reusable component and then use
`props` methods to set or return properties and values of the selected elements.
In the example below, the `CustomCard` class is defined and then used inside a
parent class.

在 React Native 中，你可以定义一个类来创建一个可复用的组件然后使用 `props` 方法来设置或者返回属性或者所选元素的值。在下面的示例中，`CustomCard` 类在父类中被定义和调用。

```js
// React Native
class CustomCard extends React.Component {
  render() {
    return (
      <View>
        <Text> Card {this.props.index} </Text>
        <Button
          title="Press"
          onPress={() => this.props.onPress(this.props.index)}
        />
      </View>
    );
  }
}

// Usage
<CustomCard onPress={this.onPress} index={item.key} />
```

In Flutter, define a class to create a custom widget and then reuse the
widget. You can also define and call a function that returns a reusable widget
as shown in the `build` function in the following example.

在 Flutter 中，定义一个类来创建一个自定义控件然后复用这个控件。你可以定义并且调用函数来返回一个可复用的控件，正如下面示例中 `build` 函数所示的那样。

{% prettify dart %}

// Flutter
class CustomCard extends StatelessWidget {
  [[highlight]]CustomCard({@required this.index, @required [[/highlight]]
     [[highlight]]this.onPress});[[/highlight]]

  final index;
  final Function onPress;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          Text('Card $index'),
          FlatButton(
            child: const Text('Press'),
            onPressed: this.onPress,
          ),
        ],
      )
    );
  }
}
    ...
// Usage
CustomCard(
  [[highlight]]index: index,[[/highlight]]
  [[highlight]]onPress: () { [[/highlight]]
    print('Card $index');
  },
)
    ...

{% endprettify %}

In the previous example, the constructor for the `CustomCard` class uses Dart's curly brace syntax `{ }` to indicate named [optional
parameters]({{site.dart-site}}/guides/language/language-tour#optional-parameters).

在之前的示例，`CustomCard` 类的构造函数使用 Dart 的曲括号 `{ }` 来表示可选参数 [optional
parameters]({{site.dart-site}}/guides/language/language-tour#optional-parameters)。

To require these fields, either remove the curly braces from the constructor, or
add `@required` to the constructor.

如果将这些参数设定为必填参数，要么从构造函数中删掉曲括号，或者在构造函数中加上 `@required`。

The following screenshots show an example of the reusable CustomCard class.

下面的截图展示了可复用的 CustomCard 类的示例。

{% include android-ios-figure-pair.md image="react-native/custom-cards.png" alt="Custom cards" class="border" %}


## Project structure and resources

## 项目结构和资源

### Where do I start writing the code?

### 该从哪开始写代码呢？

Start with the `main.dart` file. It's autogenerated when you create a
Flutter app.

从 `main.dart` 文件开始。当你创建 Flutter 应用的时候会自动生成这个文件。

<!-- skip -->
```dart
// Dart
void main(){
 print("Hello, this is the main function.");
}
```

In Flutter, the entry point file is `’projectname’/lib/main.dart` and execution
starts from the `main` function.

在 Flutter 中，入口文件是 `’projectname’/lib/main.dart` 而程序执行是从 `main` 函数开始的。

### How are files structured in a Flutter app?

### Flutter 应用程序中的文件是如何组织的？

When you create a new Flutter project, it builds the following directory structure. You can customize it later, but this is where you start.

当你创建一个新的 Flutter 工程的时候，它会创建如下所示的文件夹结构。你可以自定义这个结构，不过这是整个开发的起点。

```
┬
└ projectname
  ┬
  ├ android      - Contains Android-specific files.
  ├ build        - Stores iOS and Android build files.
  ├ ios          - Contains iOS-specific files.
  ├ lib          - Contains externally accessible Dart source files.
    ┬
    └ src        - Contains additional source files.
    └ main.dart  - The Flutter entry point and the start of a new app.
                   This is generated automatically when you create a Flutter
                    project.
                   It's where you start writing your Dart code.
  ├ test         - Contains automated test files.
  └ pubspec.yaml - Contains the metadata for the Flutter app.
                   This is equivalent to the package.json file in React Native.
```

```
┬
└ projectname
  ┬
  ├ android      - 包含 Android 相关文件。
  ├ build        - 存储 iOS 和 Android 构建文件。
  ├ ios          - 包含 iOS 相关文件。
  ├ lib          - 包含外部可访问 Dart 源文件。
    ┬
    └ src        - 包含附加源文件。
    └ main.dart  - Flutter 程序入口和新应用程序的起点。
                   当你创建 Flutter 工程的时候会自动生成这些文件。

                   你从这里开始写 Dart 代码
  ├ test         - 包含自动测试文件。
  └ pubspec.yaml - 包含 Flutter 应用程序的元数据。
                   这个文件相当于 React Native 里的 package.json 文件。
```

### Where do I put my resources and assets and how do I use them?

### 我该把资源文件放到哪并且如何调用呢？

A Flutter resource or asset is a file that is bundled and deployed with your app
and is accessible at runtime. Flutter apps can include the following asset
types:

一个 Flutter 资源就是打包到你应用程序里的一个文件并且在程序运行的时候可以访问。Flutter 应用程序可以包含下述几种资源类型：

* Static data such as JSON files

* 静态数据  比如 JSON 文件

* Configuration files

* 配置文件

* Icons and images (JPEG, PNG, GIF, Animated GIF, WebP, Animated WebP, BMP,
  and WBMP)

* 图标和图片 (JPEG, PNG, GIF, Animated GIF, WebP, Animated WebP, BMP, and WBMP)

Flutter uses the `pubspec.yaml` file, located at the root of your project, to
identify assets required by an app.

Flutter 使用 `pubspec.yaml` 文件来确定应用程序中的资源。该文件在工程的根目录。

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

The `assets` subsection specifies files that should be included with the app.
Each asset is identified by an explicit path relative to the `pubspec.yaml`
file, where the asset file is located. The order in which the assets are
declared does not matter. The actual directory used (`assets` in this case) does
not matter. However, while assets can be placed in any app directory, it's a
best practice to place them in the `assets` directory.

`assets` 确定了需要包含在应用程序中的文件。每个资源都会在 `pubspec.yaml` 中定义所存储的相对路径。资源定义的顺序没有特殊要求。实际的文件夹（在这里指 `assets` ）也没影响。但是，由于资源可以放置于程序的任何目录，所以放在 `assets` 文件夹是比较好的。

During a build, Flutter places assets into a special archive called the *asset
bundle*, which apps read from at runtime. When an asset’s path is specified in
the assets section of `pubspec.yaml`, the build process looks for any files with
the same name in adjacent subdirectories. These files are also included in the
asset bundle along with the specified asset. Flutter uses asset variants when
choosing resolution-appropriate images for your app.

在构建期间，Flutter 会将资源放到一个称为 *asset bundle* 的归档文件中，应用程序可以在运行时访问该文件。当一个资源在 `pubspec.yaml` 中被声明时，构建进程会查询和这个文件相关的子文件夹路径。这些文件也会被包含在 asset bundle 中。当你为应用程序选择和屏幕显示分辨率相关的图片时，Flutter 会使用 asset variants。

In React Native, you would add a static image by placing the image file in a
source code directory and referencing it.

在 React Native，你可以在源码文件夹中通过添加文件来增加一个静态图片并且在代码中引用它。

```js
<Image source={require("./my-icon.png")} />
```

In Flutter, add a static image to your app using the `AssetImage` class in a
widget’s build method.

在 Flutter 中，如果要增加静态图片的话就在控件的 build 方法中使用 `AssetImage` 类。

<!-- skip -->
```dart
image: AssetImage('assets/background.png'),
```

For more information, see [Adding Assets and Images in
Flutter](/docs/development/ui/assets-and-images).

如果想了解更多相关信息，请参考 [Adding Assets and Images in
Flutter](/docs/development/ui/assets-and-images)。

### How do I load images over a network?

### 如何在网络中加载图片？

In React Native, you would specify the `uri` in the `source` prop of the `Image`
component and also provide the size if needed.

在 React Native，你可以在 `Image` 的 `source` 属性中设置 `uri` 和所需的尺寸。

In Flutter, use the `Image.network` constructor to include an image from a URL.

在 Flutter 中，使用 `Image.network` 构造函数来实现通过地址加载图片的操作。

<!-- skip -->
```dart
// Flutter
body: Image.network(
          'https://flutter.io/images/owl.jpg',
```

### How do I install packages and package plugins?

### 我如何安装依赖包和包插件？

Flutter supports using shared packages contributed by other developers to the
Flutter and Dart ecosystems. This allows you to quickly build your app without
having to develop everything from scratch. Packages that contain
platform-specific code are known as package plugins.

Flutter 支持使用开发者向 Flutter 和 Dart 生态系统贡献的代码包。这样可以使大量开发者快速构建应用程序而无需重复造车轮。而平台相关的代码包就被称为包插件。

In React Native, you would use `yarn add {package-name}` or `npm install --save
{package-name}` to install packages from the command line.

在 React Native 中，你可以在命令行中运行 `yarn add {package-name}` 或者 `npm install --save
{package-name}` 来安装代码包。

In Flutter, install a package using the following instructions:

在 Flutter 中，安装代码包需要按照如下的步骤：

1. Add the package name and version to the `pubspec.yaml` dependencies section.
The example below shows how to add the `google_sign_in` Dart package to the
`pubspec.yaml` file. Check your spaces when working in the YAML file because
**white space matters**!

1. 在 `pubspec.yaml` 的 dependencies 区域添加包名和版本。下面的例子向大家展示了如何将 `google_sign_in` 的 Dart 包添加到 `pubspec.yaml` 中。一定要检查一下 YAML 文件中的空格。因为 **空格很重要**!

```yaml
dependencies:
  flutter:
    sdk: flutter
  google_sign_in: ^3.0.3
```

2. Install the package from the command line by using `flutter packages get`.
   If using an IDE, it often runs `flutter packages get` for you, or it might
   prompt you to do so.

2. 在命令行中输入 `flutter packages get` 来安装代码包。如果使用 IDE，它自己会运行 `flutter packages get`，或者它会提示你是不是要运行该命令。

3. Import the package into your app code as shown below:

3. 向下面代码一样在程序中引用代码包：

<!-- skip -->
```dart
import 'package:flutter/cupertino.dart';
```

For more information, see [Using
Packages](/docs/development/packages-and-plugins/using-packages) and
[Developing Packages &
Plugins](/docs/development/packages-and-plugins/developing-packages).

如果想了解更多相关信息，请参考 [Using
Packages](/docs/development/packages-and-plugins/using-packages) and
[Developing Packages &
Plugins](/docs/development/packages-and-plugins/developing-packages)。

You can find many packages shared by Flutter developers in the [Flutter
Packages]({{site.pub}}/flutter/) section of
the [Pub site]({{site.pub}}).

你可以找到很多 Flutter 开发者分享的代码包，就在 [Flutter
Packages]({{site.pub}}/flutter/) 的 [Pub site]({{site.pub}}).

## Flutter widgets

## Flutter 控件

In Flutter, you build your UI out of widgets that describe what their view
should look like given their current configuration and state.

在 Flutter 中，你可以基于控件打造你自己的 UI，通过控件当前的设置和状态会呈现相应的页面效果。

Widgets are often composed of many small, single-purpose widgets that are nested
to produce powerful effects. For example, the Container widget consists of
several widgets responsible for layout, painting, positioning, and sizing.
Specifically, the `Container` widget includes the `LimitedBox`,
`ConstrainedBox`, `Align`, `Padding`, `DecoratedBox`, and `Transform` widgets.
Rather than subclassing `Container` to produce a customized effect, you can
compose these and other simple widgets in new and unique ways.

控件常常通过很多小的，单一功能的控件组成，通过这样的封装往往能够实现很棒的效果。比如， Container 控件包含多种控件，分别负责布局、绘图、位置变化和尺寸变化。准确的说，`Container` 控件包括 `LimitedBox`,
`ConstrainedBox`, `Align`, `Padding`, `DecoratedBox`, 和 `Transform` 控件。与其继承 `Container` 来实现自定义效果，不如直接修改这些控件来实现效果。

The `Center` widget is another example of how you can control the layout. To
center a widget, wrap it in a `Center` widget and then use layout
widgets for alignment, row, columns, and grids. These layout widgets do not have
a visual representation of their own. Instead, their sole purpose is to control
some aspect of another widget’s layout. To understand why a widget renders in a
certain way, it’s often helpful to inspect the neighboring widgets.

`Center` 控件是另一个用于控制布局的示例。如果要居中一个控件，就把它封装到 `Center` 控件中，然后使用布局控件来进行对齐，行、列和网格。这些布局控件并不可见。而他们的作用就是控制其它控件的布局。如果想搞清楚为什么一个控件会有这样的效果，有效的方法是研究它临近的控件。

For more information, see the [Flutter Technical
Overview](/docs/resources/technical-overview).

如果想了解更多相关信息，请参考 [Flutter Technical
Overview](/docs/resources/technical-overview)。

For more information about the core widgets from the Widgets package, see
[Flutter Basic Widgets](/docs/development/ui/widgets/basics), the
[Flutter Widget Catalog](/docs/development/ui/widgets), or the
[Flutter Widget Index](/docs/reference/widgets).

如果想了解更多关于 Widgets 包中的核心控件，请参考 [Flutter Basic Widgets](/docs/development/ui/widgets/basics), the
[Flutter Widget Catalog](/docs/development/ui/widgets), or the
[Flutter Widget Index](/docs/reference/widgets)。

## Views

## 视图

### What is the equivalent of the `View` container?

### 与 `View` 等价容器的是什么？

In React Native, `View` is a container that supports layout with `Flexbox`,
style, touch handling, and accessibility controls.

在 React Native 中， `View` 是支持 `Flexbox` 布局、风格化、触摸事件处理和访问性控制的容器。

In Flutter, you can use the core layout widgets in the Widgets library, such
as  [Container]({{site.api}}/flutter/widgets/Container-class.html),
[Column]({{site.api}}/flutter/widgets/Column-class.html),
[Row]({{site.api}}/flutter/widgets/Row-class.html),
and [Center]({{site.api}}/flutter/widgets/Center-class.html).

在 Flutter 中，你可以使用 Widgets 库中的核心布局控件，比如 [Container]({{site.api}}/flutter/widgets/Container-class.html),
[Column]({{site.api}}/flutter/widgets/Column-class.html)，
[Row]({{site.api}}/flutter/widgets/Row-class.html)，
和 [Center]({{site.api}}/flutter/widgets/Center-class.html)。

For more information, see the [Layout Widgets](/docs/development/ui/widgets/layout) catalog.

如果想了解更多相关信息，请参考 [Layout Widgets](/docs/development/ui/widgets/layout) catalog。

### What is the equivalent of `FlatList` or `SectionList`?

### 和 `FlatList` 或者 `SectionList` 相对应的是什么？

A `List` is a scrollable list of components arranged vertically.

`List` 是一个可以滚动的纵向排列的组件列表。

In React Native, `FlatList` or `SectionList` are used to render simple or
sectioned lists.

在 React Native 中，`FlatList` 或者 `SectionList` 用于渲染简单的或者分组的列表。

```js
// React Native
<FlatList
  data={[ ... ]}
  renderItem={({ item }) => <Text>{item.key}</Text>}
/>
```

[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)
is Flutter's most commonly used scrolling widget. The default constructor
takes an explicit list of children.
[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)
is most appropriate for a small number of widgets. For a large or infinite list,
use `ListView.builder`, which builds its children on demand and only builds
those children that are visible.

[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html) 是 Flutter 最常用的滑动控件。默认构造函数需要一个数据列表的参数。
[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html) 非常适合用于少量子控件的列表。如果列表的元素比较多，可以使用 `ListView.builder`，它会按需构建子项并且只创建可见的子项。


<!-- skip -->
```dart
// Flutter
var data = [ ... ];
ListView.builder(
  itemCount: data.length,
  itemBuilder: (context, int index) {
    return Text(
      data[index],
    );
  },
)
```

{% include android-ios-figure-pair.md image="react-native/flatlist.gif" alt="Flat list" class="border" %}

To learn how to implement an infinite scrolling list, see the
[Write Your First Flutter App,
Part 1]({{site.codelabs}}/codelabs/first-flutter-app-pt1) codelab.

如果要了解如何实现无限滑动列表，请参考 [Write Your First Flutter App,
Part 1]({{site.codelabs}}/codelabs/first-flutter-app-pt1) codelab。

### How do I use a Canvas to draw or paint?

### 如何使用 Canvas 绘图？

In React Native, canvas components aren't present so third party libraries like `react-native-canvas` are used.

在 React Native 中，canvas 组件是不可见的，所以需要使用类似 `react-native-canvas` 这样的组件。

```js
// React Native
handleCanvas = canvas => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "skyblue";
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, 2 * Math.PI);
  ctx.fillRect(150, 100, 300, 300);
  ctx.stroke();
};

render() {
  return (
    <View>
      <Canvas ref={this.handleCanvas} />
    </View>
  );
}
```
In Flutter, you can use the
[`CustomPaint`]({{site.api}}/flutter/widgets/CustomPaint-class.html)
and [`CustomPainter`]({{site.api}}/flutter/rendering/CustomPainter-class.html)
classes to draw to the canvas.

在 Flutter 中，你可以使用 [`CustomPaint`]({{site.api}}/flutter/widgets/CustomPaint-class.html)
和 [`CustomPainter`]({{site.api}}/flutter/rendering/CustomPainter-class.html) 进行绘图。

The following example shows how to draw during the paint phase using the
`CustomPaint` widget. It implements the abstract class, CustomPainter,
and passes it to CustomPaint's painter property. CustomPaint subclasses
must implement the `paint` and `shouldRepaint` methods.

下面的示例代码展示了如何使用 `CustomPaint` 进行绘图。它实现了抽象类 CustomPainter，然后将它赋值给 CustomPainter 的 painter 属性。CustomPainter 子类必须实现 `paint` 和 `shouldRepaint` 方法。

<!-- skip -->
```dart
// Flutter
class MyCanvasPainter extends CustomPainter {

  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint();
    paint.color = Colors.amber;
    canvas.drawCircle(Offset(100.0, 200.0), 40.0, paint);
    Paint paintRect = Paint();
    paintRect.color = Colors.lightBlue;
    Rect rect = Rect.fromPoints(Offset(150.0, 300.0), Offset(300.0, 400.0));
    canvas.drawRect(rect, paintRect);
  }

  bool shouldRepaint(MyCanvasPainter oldDelegate) => false;
  bool shouldRebuildSemantics(MyCanvasPainter oldDelegate) => false;
}
class _MyCanvasState extends State<MyCanvas> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomPaint(
        painter: MyCanvasPainter(),
      ),
    );
  }
}
```

{% include android-ios-figure-pair.md image="react-native/canvas.png" alt="Canvas" class="border" %}

## Layouts

## 布局

### How do I use widgets to define layout properties?

### 如何使用控件来定义布局属性？

In React Native, most of the layout can be done with the props that are passed
to a specific component. For example, you could use the `style` prop on the
`View` component in order to specify the flexbox properties. To arrange your
components in a column, you would specify a prop such as:
`flexDirection: “column”`.

在 React Native 中，大多数布局需要通过向指定的组件传递属性参数进行设置。比如，你可以使用 `View` 的 `style` 来设置 flexbox 属性。如果要整理一列的组件，你可以使用如下的属性设置：`flexDirection: “column”`。

```js
// React Native
<View
  style={%raw%}{{
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }}{%endraw%}
>
```

In Flutter, the layout is primarily defined by widgets specifically designed to
 provide layout, combined with control widgets and their style properties.

在 Flutter 中，布局主要是由专门的控件定义的，它们同控制类控件和样式属性一起发挥功能。

For example, the
[Column]({{site.api}}/flutter/widgets/Column-class.html) and
[Row]({{site.api}}/flutter/widgets/Row-class.html) widgets
take an array of children and align them vertically and horizontally respectively.
A [Container]({{site.api}}/flutter/widgets/Container-class.html)
widget takes a combination of layout and styling properties, and a
[`Center`]({{site.api}}/flutter/widgets/Center-class.html) widget centers
its child widgets.

比如，[Column]({{site.api}}/flutter/widgets/Column-class.html) 和
[Row]({{site.api}}/flutter/widgets/Row-class.html) 控件
接受一个数组的子元素并且分别按照纵向和横向进行排列。

<!-- skip -->
```dart
// Flutter
Center(
  child: Column(
    children: <Widget>[
      Container(
        color: Colors.red,
        width: 100.0,
        height: 100.0,
      ),
      Container(
        color: Colors.blue,
        width: 100.0,
        height: 100.0,
      ),
      Container(
        color: Colors.green,
        width: 100.0,
        height: 100.0,
      ),
    ],
  ),
)
```

Flutter provides a variety of layout widgets in its core widget library.
For example, [`Padding`]({{site.api}}/flutter/widgets/Padding-class.html),
[`Align`]({{site.api}}/flutter/widgets/Align-class.html),
and [`Stack`]({{site.api}}/flutter/widgets/Stack-class.html).

Flutter 在核心控件库中提供多种不同的布局控件。比如[`Padding`]({{site.api}}/flutter/widgets/Padding-class.html)，
[`Align`]({{site.api}}/flutter/widgets/Align-class.html)，
和 [`Stack`]({{site.api}}/flutter/widgets/Stack-class.html)。

For a complete list, see [Layout Widgets](/docs/development/ui/widgets/layout).

要得到完整的控件列表，请参考 [Layout Widgets](/docs/development/ui/widgets/layout)。

{% include android-ios-figure-pair.md image="react-native/basic-layout.gif" alt="Layout" class="border" %}

### How do I layer widgets?

### 如何为控件分层？

In React Native, components can be layered using `absolute` positioning.

在 React Native 中，组件可以通过 `absolute` 划分层次。

Flutter uses the
[`Stack`]({{site.api}}/flutter/widgets/Stack-class.html)
widget to arrange children widgets in layers.
The widgets can entirely or partially overlap the base widget.

在 Flutter 中使用 [`Stack`]({{site.api}}/flutter/widgets/Stack-class.html) 控件将子控件进行分层。该控件可以将整体或者部分的子控件进行分层。

The `Stack` widget positions its children relative to the edges of its box.
This class is useful if you simply want to overlap several children widgets.

`Stack` 控件将子控件根据容器的边界进行布局。如果你仅仅想把子控件重叠摆放的话，这个控件非常合适。

<!-- skip -->
```dart
// Flutter
Stack(
  alignment: const Alignment(0.6, 0.6),
  children: <Widget>[
    CircleAvatar(
      backgroundImage: NetworkImage(
        "https://avatars3.githubusercontent.com/u/14101776?v=4"),
    ),
    Container(
      decoration: BoxDecoration(
          color: Colors.black45,
      ),
      child: Text('Flutter'),
    ),
  ],
)
```

The previous example uses `Stack` to overlay a Container (that displays its `Text`
on a translucent black background) on top of a `CircleAvatar`. The Stack offsets
the text using the alignment property and Alignment coordinates.

上面的示例代码使用 `Stack` 将一个 Container （将 `Text` 显示在一个半透明的黑色背景上）覆盖在一个 `CircleAvatar` 上。Stack 使用对齐属性和 Alignment 坐标微调文本。

{% include android-ios-figure-pair.md image="react-native/stack.png" alt="Stack" class="border" %}

For more information, see the
[Stack]({{site.api}}/flutter/widgets/Stack-class.html) class documentation.

如果想了解更多相关信息，请参考 [Stack]({{site.api}}/flutter/widgets/Stack-class.html) 类文档。

## Styling

## 风格化

### How do I style my components?

### 如何设置组件的风格？

In React Native, inline styling and `stylesheets.create` are used to style
components.

在 React Native 中，内联风格化和 `stylesheets.create` 可以用于设置组件的风格。

```js
// React Native
<View style={styles.container}>
  <Text style={%raw%}{{ fontSize: 32, color: "cyan", fontWeight: "600" }}{%endraw%}>
    This is a sample text
  </Text>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
```

In Flutter, a `Text` widget can take a `TextStyle` class for its style property.
If you want to use the same text style in multiple places, you can create a
[`TextStyle`]({{site.api}}/flutter/dart-ui/TextStyle-class.html)
class and use it for multiple `Text` widgets.

在 Flutter 中， `Text` 控件可以接受 `TextStyle` 作为它的风格化属性。如果你想在不同的场合使用相同的文本风格，你可以创建一个 [`TextStyle`]({{site.api}}/flutter/dart-ui/TextStyle-class.html) 类，并且在多个 `Text` 控件中使用它。

<!-- skip -->
```dart
// Flutter
var textStyle = TextStyle(fontSize: 32.0, color: Colors.cyan, fontWeight:
   FontWeight.w600);
	...
Center(
  child: Column(
    children: <Widget>[
      Text(
        'Sample text',
        style: textStyle,
      ),
      Padding(
        padding: EdgeInsets.all(20.0),
        child: Icon(Icons.lightbulb_outline,
          size: 48.0, color: Colors.redAccent)
      ),
    ],
  ),
)
```

{% include android-ios-figure-pair.md image="react-native/flutterstyling.gif" alt="Styling" class="border" %}

### How do I use `Icons` and `Colors`?

### 我如何使用 `Icons` 和 `Colors` 呢？

React Native doesn't include support for icons so third party libraries are used.

React Native 并不包含默认图标，所以需要使用第三方库。

In Flutter, importing the Material library also pulls in the rich set of
[Material icons]({{site.api}}/flutter/material/Icons-class.html)
and [colors]({{site.api}}/flutter/material/Colors-class.html).

在 Flutter 中，引用 Material 库的时候就同时引入了 [Material icons]({{site.api}}/flutter/material/Icons-class.html)
和 [colors]({{site.api}}/flutter/material/Colors-class.html)。

<!-- skip -->
```dart
Icon(Icons.lightbulb_outline, color: Colors.redAccent)
```

When using the `Icons` class, make sure to set `uses-material-design: true` in
the project's `pubspec.yaml` file. This ensures that
the `MaterialIcons` font, which displays the icons, is included in your app.
{% prettify dart %}
name: my_awesome_application
flutter: [[highlight]]uses-material-design: true[[/highlight]]
{% endprettify %}

当使用 `Icons` 类时，确保在项目的 `pubspec.yaml` 文件中设置 `uses-material-design: true`。这样保证 `MaterialIcons` 相关字体被包含在你的应用中。
{% prettify dart %}
name: my_awesome_application
flutter: [[highlight]]uses-material-design: true[[/highlight]]
{% endprettify %}

Flutter's [Cupertino (iOS-style)](/docs/development/ui/widgets/cupertino) package provides high
fidelity widgets for the current iOS design language. To use the `CupertinoIcons`
font, add a dependency for `cupertino_icons` in your project's  `pubspec.yaml` file.

Flutter 的 [Cupertino (iOS-style)](/docs/development/ui/widgets/cupertino) 包为 iOS 设计语言提供高分辨率的控件。要使用 `CupertinoIcons` 字体，在项目的 `pubspec.yaml` 文件中添加 `cupertino_icons` 的依赖即可。

```yaml
name: my_awesome_application
dependencies:
  cupertino_icons: ^0.1.0
```

To globally customize the colors and styles of components, use `ThemeData`
to specify default colors for various aspects of the theme. Set the theme
property in `MaterialApp` to the `ThemeData` object. The
[`Colors`]({{site.api}}/flutter/material/Colors-class.html)
class provides colors from the Material Design [color
palette]({{site.material}}/guidelines/style/color.html).

要在全局范围内自定义组件的颜色和风格，使用 `ThemeData` 为不同的主题指定默认颜色。在 `MaterialApp` 的主题属性中设置 `ThemeData` 对象。[`Colors`]({{site.api}}/flutter/material/Colors-class.html) 类提供 Material Design [color
palette]({{site.material}}/guidelines/style/color.html) 中所提供的颜色配置。

The following example sets the primary swatch to `blue` and the text
selection to `red`.

下面的示例代码将主色调设置为 `blue` 然后文本颜色设置为 `red`。

<!-- skip -->
{% prettify dart %}
class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        [[highlight]]primarySwatch: Colors.blue,[[/highlight]]
        [[highlight]]textSelectionColor: Colors.red[[/highlight]]
      ),
      home: SampleAppPage(),
    );
  }
}
{% endprettify %}

### How do I add style themes?

### 如何增加风格化主题？

In React Native, common themes are defined for components in stylesheets and
then used in components.

在 React Native，常用主题都定义在 stylesheets 中。

In Flutter, create uniform styling for almost everything by defining the
 styling in the
[`ThemeData`]({{site.api}}/flutter/material/ThemeData-class.html)
class and passing it to the theme property in the
[`MaterialApp`]({{site.api}}/flutter/material/MaterialApp-class.html)
widget.

在 Flutter 中，为所有组件创建统一风格可以在 [`ThemeData`]({{site.api}}/flutter/material/ThemeData-class.html) 类中定义，并将它赋值给 [`MaterialApp`]({{site.api}}/flutter/material/MaterialApp-class.html) 的主题属性。

<!-- skip -->
```dart
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.cyan,
        brightness: Brightness.dark,
      ),
      home: StylingPage(),
    );
  }
```

A `Theme` can be applied even without using the `MaterialApp` widget. The
[`Theme`]({{site.api}}/flutter/material/Theme-class.html)
widget takes a `ThemeData` in its `data` parameter and applies the
`ThemeData` to all of its children widgets.

`Theme` 可以在不使用 `MaterialApp` 控件的情况下使用。[`Theme`]({{site.api}}/flutter/material/Theme-class.html) 接受一个 `ThemeData` 参数，并且将 `ThemeData` 应用于它的全部子控件。

<!-- skip -->
```dart
 @override
  Widget build(BuildContext context) {
    return Theme(
      data: ThemeData(
        primaryColor: Colors.cyan,
        brightness: brightness,
      ),
      child: Scaffold(
         backgroundColor: Theme.of(context).primaryColor,
              ...
              ...
      ),
    );
  }
```

## State Management

## 状态管理

State is information that can be read synchronously when a widget is built
or information that might change during the lifetime of a widget.
To manage app state in Flutter, use a
[StatefulWidget]({{site.api}}/flutter/widgets/StatefulWidget-class.html)
paired with a State object.

当控件被创建或者在控件的生命周期中有信息发生改变时所产生的信息叫做状态。要在 Flutter 中管理应用程序的状态，使用 [StatefulWidget]({{site.api}}/flutter/widgets/StatefulWidget-class.html) 和 State 对象。

### The StatelessWidget

### StatelessWidget 控件

A `StatelessWidget` in Flutter is a widget that doesn't require a state
change&mdash;it has no internal state to manage.

`StatelessWidget` 在 Flutter 中是一个不需要状态改变的控件，它没有内部的状态。

Stateless widgets are useful when the part of the user interface you are
describing does not depend on anything other than the configuration information
in the object itself and the
[`BuildContext`]({{site.api}}/flutter/widgets/BuildContext-class.html)
in which the widget is inflated.

当你展现给用户的界面并不依赖其它任何配置信息并且使用 [`BuildContext`]({{site.api}}/flutter/widgets/BuildContext-class.html)
 来解析控件，则需要使用无状态控件。

[AboutDialog]({{site.api}}/flutter/material/AboutDialog-class.html),
[CircleAvatar]({{site.api}}/flutter/material/CircleAvatar-class.html),
and [Text]({{site.api}}/flutter/widgets/Text-class.html) are examples
of stateless widgets which subclass
[StatelessWidget]({{site.api}}/flutter/widgets/StatelessWidget-class.html).

[AboutDialog]({{site.api}}/flutter/material/AboutDialog-class.html)、
[CircleAvatar]({{site.api}}/flutter/material/CircleAvatar-class.html)
和 [Text]({{site.api}}/flutter/widgets/Text-class.html) 是
[StatelessWidget]({{site.api}}/flutter/widgets/StatelessWidget-class.html) 的子类，并且是很典型的无状态控件。

<!-- skip -->
```dart
// Flutter
import 'package:flutter/material.dart';

void main() => runApp(MyStatelessWidget(text: "StatelessWidget Example to show immutable data"));

class MyStatelessWidget extends StatelessWidget {
  final String text;
  MyStatelessWidget({Key key, this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        text,
        textDirection: TextDirection.ltr,
      ),
    );
  }
}
```

In the previous example, you used the constructor of the `MyStatelessWidget` class
to pass the `text`, which is marked as `final`. This class extends
 `StatelessWidget`&mdash;it contains immutable data.

在上面的例子中，你用到了 `MyStatelessWidget` 类的构造函数来传递 `text`。并且它被标记为 `final`。该类继承了 `StatelessWidget`，它包含不可数的数据。

The `build` method of a stateless widget is typically called in only three
 situations:

无状态控件的 `build` 方法通常只有在三种情况下会被调用：

* When the widget is inserted into a tree

* 当控件被插入到控件树中

* When the widget's parent changes its configuration

* 当控件的父控件改变了配置

* When an
  [`InheritedWidget`]({{site.api}}/flutter/widgets/InheritedWidget-class.html)
  it depends on, changes

* 当所依赖的 [`InheritedWidget`]({{site.api}}/flutter/widgets/InheritedWidget-class.html) 发生了改变

### The StatefulWidget

### StatefulWidget 控件

A [StatefulWidget]({{site.api}}/flutter/widgets/StatefulWidget-class.html)
is a widget that changes state. Use the `setState` method to manage the
state changes for a `StatefulWidget`. A call to `setState` tells the Flutter
framework that something has changed in a state, which causes an app to
rerun the `build` method so that the app can reflect the change.

[StatefulWidget]({{site.api}}/flutter/widgets/StatefulWidget-class.html) 是携带状态变化的控件。通过调用 `setState` 方法可以管理 `StatefulWidget` 的状态。当调用 `setState` 的时候，程序会通知 Flutter 框架有状态发生了改变，然后会重新运行 `build` 方法来更新应用的状态。

State is information that can be read synchronously when a widget is built and
might change during the lifetime of the widget. It's the responsibility of the
widget implementer to ensure that the state is promptly notified when the state
changes. Use `StatefulWidget` when a widget can change dynamically.
For example, the state of the widget changes by typing into a form,
or moving a slider. Or, it can change over time—perhaps a data feed updates the UI.

状态是在控件被创建期间可以被同步读取的信息，并且在控件的生命周期中会发生改变。实现该控件的时候要注意保证党状态发生改变的时候程序能够获得相应的提醒。当控件能够动态改变的时候，请使用 `StatefulWidget`。比如，某个控件会随着用户填写表单或者移动滑块的时候发生改变。亦或者随着数据源更新的时候发生改变。

[Checkbox]({{site.api}}/flutter/material/Checkbox-class.html),
[Radio]({{site.api}}/flutter/material/Radio-class.html),
[Slider]({{site.api}}/flutter/material/Slider-class.html),
[InkWell]({{site.api}}/flutter/material/InkWell-class.html),
[Form]({{site.api}}/flutter/widgets/Form-class.html),
and [TextField]({{site.api}}/flutter/material/TextField-class.html)
are examples of stateful widgets, that subclass
[StatefulWidget]({{site.api}}/flutter/widgets/StatefulWidget-class.html).

[Checkbox]({{site.api}}/flutter/material/Checkbox-class.html),
[Radio]({{site.api}}/flutter/material/Radio-class.html),
[Slider]({{site.api}}/flutter/material/Slider-class.html),
[InkWell]({{site.api}}/flutter/material/InkWell-class.html),
[Form]({{site.api}}/flutter/widgets/Form-class.html),
和 [TextField]({{site.api}}/flutter/material/TextField-class.html)
都是有状态的控件 [StatefulWidget]({{site.api}}/flutter/widgets/StatefulWidget-class.html).

The following example declares a `StatefulWidget` which requires a `createState()`
method. This method creates the state object that manages the widget's state,
`_MyStatefulWidgetState`.

下面的示例代码声明了一个 `StatefulWidget`，需要实现 `createState()` 方法。该方法创建一个对象来管理控件的状态，也就是 `_MyStatefulWidgetState`。

<!-- skip -->
```dart
class MyStatefulWidget extends StatefulWidget {
  MyStatefulWidget({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}
```

The following state class, `_MyStatefulWidgetState`, implements the `build()`
method for the widget. When the state changes, for example, when the user toggles
the button, `setState` is called with the new toggle value. This causes the
framework to rebuild this widget in the UI.

下面的状态类，`_MyStatefulWidgetState`，实现了 `build()` 方法。当状态发生改变的时候，比如说用户点击了开关按钮，这时 `setState` 就会被调用，并且将新的开关状态传进来。这就会使整体框架重构这个控件。

<!-- skip -->
```dart
class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  bool showtext=true;
  bool toggleState=true;
  Timer t2;

  void toggleBlinkState(){
    setState((){
      toggleState=!toggleState;
    });
    var twenty = const Duration(milliseconds: 1000);
    if(toggleState==false) {
      t2 = Timer.periodic(twenty, (Timer t) {
        toggleShowText();
      });
    } else {
      t2.cancel();
    }
  }

  void toggleShowText(){
    setState((){
      showtext=!showtext;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            (showtext
              ?(Text('This execution will be done before you can blink.'))
              :(Container())
            ),
            Padding(
              padding: EdgeInsets.only(top: 70.0),
              child: RaisedButton(
                onPressed: toggleBlinkState,
                child: (toggleState
                  ?( Text('Blink'))
                  :(Text('Stop Blinking'))
                )
              )
            )
          ],
        ),
      ),
    );
  }
}
```

### What are the StatefulWidget and StatelessWidget best practices?

### StatefulWidget 和 StatelessWidget 的最佳实践是什么？

Here are a few things to consider when designing your widget.

下面有一些设计原则供大家参考。

#### 1. Determine whether a widget should be a StatefulWidget or a StatelessWidget

### 1. 确定一个控件应该是 StatefulWidget 还是 StatelessWidget

In Flutter, widgets are either Stateful or Stateless—depending on whether
they depend on a state change.

在 Flutter 中，控件要么是有状态的，要么是无状态的。这取决于控件是否依赖状态的改变。

* If a widget changes—the user interacts with it or a data feed interrupts
  the UI, then it’s Stateful.

* 如果一个控件发生了改变，而它所处的用户界面或者数据中断了 UI，那么该控件就是有状态的。

* If a widget is final or immutable, then it's Stateless.

* 如果一个控件是 final 类型或者 immutable 类型的，那么该控件是无状态的。

#### 2. Determine which object manages the widget’s state (for a StatefulWidget)

#### 2. 确定哪个对象来控制控件的状态（ 针对 StatefulWidget ）。

In Flutter, there are three primary ways to manage state:

在 Flutter 中，有三种途径来管理状态：

* The widget manages its own state

* 控件管理它的自身状态

* The parent widget manages the widget’s state

* 由其父控件管理控件状态

* A mix-and-match approach

* 通过混搭的方式

When deciding which approach to use, consider the following principles:

当决定了使用哪个途径后，要考虑下述的几个原则：

* If the state in question is user data, for example the checked or unchecked
  mode of a checkbox, or the position of a slider, then the state is best managed
  by the parent widget.

* 如果状态信息是用户数据，比如 checkbox 是被勾选还是未被勾选，或者滑块的位置，那么父控件会很好的处理当前控件的状态。

* If the state in question is aesthetic, for example an animation, then the
  widget itself best manages the state.

* 如果状态是和外观效果相关的，比如动画，那么控件自己会处理状态的变化。

* When in doubt, let the parent widget manage the child widget's state.‘

* 如果无法确定，那么父控件会处理子控件的状态。



#### 3. Subclass StatefulWidget and State

#### 3. 继承 StatefulWidget 和 状态

The `MyStatefulWidget` class manages its own state—it extends
`StatefulWidget`, it overrides the `createState()` method to create the State
object, and the framework calls `createState()` to build the widget. In this
example, `createState()` creates an instance of `_MyStatefulWidgetState`, which
is implemented in the next best practice.

`MyStatefulWidget` 类管理它自身的状态 - 它继承自 `StatefulWidget`，重写了 `createState()` 方法。该方法创建了 State 对象，同时框架会调用 `createState()` 方法来构建控件。在这个例子中，`createState()` 方法创建了一个 `_MyStatefulWidgetState` 实例。下面的最佳实践中也实现了类似的方法。

<!-- skip -->
```dart
class MyStatefulWidget extends StatefulWidget {
  MyStatefulWidget({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {

  @override
  Widget build(BuildContext context) {
    ...
  }
}
```

#### 4. Add the StatefulWidget into the widget tree

#### 4. 将 StatefulWidget 添加到控件树中

Add your custom `StatefulWidget` to the widget tree in the app’s build method.

将你自定义的 `StatefulWidget` 通过应用程序的 build 方法添加到控件树中。

<!-- skip -->
```dart
class MyStatelessWidget extends StatelessWidget {
  // This widget is the root of your application.

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyStatefulWidget(title: 'State Change Demo'),
    );
  }
}
```

{% include android-ios-figure-pair.md image="react-native/state-change.gif" alt="State change" class="border" %}

## Props

## Props

In React Native, most components can be customized when they are created with
different parameters or properties, called `props`. These
parameters can be used in a child component using `this.props`.

在 React Native 中，大多数组件都可以在创建的时候通过不同的参数或者属性来自定义，叫做 `props`。这些参数可以在子组件中通过 `this.props` 进行调用。

```js
// React Native
class CustomCard extends React.Component {
  render() {
    return (
      <View>
        <Text> Card {this.props.index} </Text>
        <Button
          title="Press"
          onPress={() => this.props.onPress(this.props.index)}
        />
      </View>
    );
  }
}
class App extends React.Component {

  onPress = index => {
    console.log("Card ", index);
  };

  render() {
    return (
      <View>
        <FlatList
          data={[ ... ]}
          renderItem={({ item }) => (
            <CustomCard onPress={this.onPress} index={item.key} />
          )}
        />
      </View>
    );
  }
}
```



In Flutter, you assign a local variable or function marked `final` with the
 property received in the parameterized constructor.

在 Flutter 中，你可以将构造函数中的参数值赋值给标记为 `final` 的本地变量或者函数。

<!-- skip -->
```dart
// Flutter
class CustomCard extends StatelessWidget {

  CustomCard({@required this.index, @required this.onPress});
  final index;
  final Function onPress;

  @override
  Widget build(BuildContext context) {
  return Card(
    child: Column(
      children: <Widget>[
        Text('Card $index'),
        FlatButton(
          child: const Text('Press'),
          onPressed: this.onPress,
        ),
      ],
    ));
  }
}
    ...
//Usage
CustomCard(
  index: index,
  onPress: () {
    print('Card $index');
  },
)
```

{% include android-ios-figure-pair.md image="react-native/modular.png" alt="Cards" class="border" %}

## Local storage

## 本地存储

If you don't need to store a lot of data and it doesn't require
structure, you can use `shared_preferences` which allows you to
read and write persistent key-value pairs of primitive data
types: booleans, floats, ints, longs, and strings.

如果你不需要在本地存储太多数据同时也不需要存储结构化数据，那么你可以使用 `shared_preferences`，通过它来读写一些原始数据类型键值对，数据类型包括 boolean, float, ints, longs 和 string。

### How do I store persistent key-value pairs that are global to the app?

### 如何存储在应用程序中全局有效的键值对？

In React Native, you use the `setItem` and `getItem` functions of the
`AsyncStorage` component to store and retrieve data that is persistent and
global to the app.

在 React Native，可以使用 `AsyncStorage` 中的 `setItem` 和 `getItem` 函数来存储和读取应用程序中的全局数据。

```js
// React Native
await AsyncStorage.setItem( "counterkey", json.stringify(++this.state.counter));
AsyncStorage.getItem("counterkey").then(value => {
  if (value != null) {
    this.setState({ counter: value });
  }
});
```

In Flutter, use the
[`shared_preferences`]({{site.github}}/flutter/plugins/tree/master/packages/shared_preferences)
plugin to store and retrieve key-value data that is persistent and global
to the app. The `shared_preferences` plugin wraps `NSUserDefaults` on iOS
and `SharedPreferences` on Android, providing a persistent store for simple data.
To use the plugin, add `shared_preferences` as a dependency in the `pubspec.yaml`
file then import the package in your Dart file.

在 Flutter 中，使用 [`shared_preferences`]({{site.github}}/flutter/plugins/tree/master/packages/shared_preferences) 插件来存储和访问应用程序内全局有效的键值对数据。`shared_preferences` 插件封装了 iOS 中的 `NSUserDefaults` 和 Android 中的 `SharedPreferences` 来实现简单数据的持续存储。如果要使用该插件，可以在 `pubspec.yaml` 中添加依赖 `shared_preferences`，然后再 Dart 文件中引用包即可。

```yaml
dependencies:
  flutter:
    sdk: flutter
  shared_preferences: ^0.4.3
```

<!-- skip -->
```dart
// Dart
import 'package:shared_preferences/shared_preferences.dart';
```

To implement persistent data, use the setter methods provided by the
`SharedPreferences` class. Setter methods are available for various primitive
types, such as `setInt`, `setBool`, and `setString`. To read data, use the
appropriate getter method provided by the `SharedPreferences` class. For each
setter there is a corresponding getter method, for example, `getInt`, `getBool`,
and `getString`.

要实现持久数据存储，使用 `SharedPreferences` 类提供的 setter 方法即可。Setter 方法适用于多种原始类型数据，比如 `setInt`, `setBool`, 和 `setString`。要读取数据，使用 `SharedPreferences` 类中相应的 getter 方法。对于每一个 setter 方法都有对应的 getter 方法。 比如，`getInt`, `getBool`, 和 `getString`。


<!-- skip -->
```dart
SharedPreferences prefs = await SharedPreferences.getInstance();
_counter = prefs.getInt('counter');
prefs.setInt('counter', ++_counter);
setState(() {
  _counter = _counter;
});
```


## Routing

## 路径

Most apps contain several screens for displaying different types of information.
For example, you might have a product screen that displays images where users
could tap on a product image to get more information about the product on a new
screen.

大多数应用都会包含多个页面来显示不同类型的数据。比如，你有一个页面展示商品列表，用户可以通过点击其中的任意一个商品在另外一个页面查看该商品的详细信息。

In Android, new screens are new Activities. In iOS, new screens are new
ViewControllers. In Flutter, screens are just Widgets! And to navigate to new
screens in Flutter, use the Navigator widget.

在 Android 中，新的页面是 Activity。 在 iOS 中，新的页面是 ViewController。在 Flutter 中，页面就是控件！如果在 Flutter 中要切换页面，使用 Navigator 控件即可。

### How do I navigate between screens?

### 如何在页面之间进行切换？

In React Native, there are three main navigators: StackNavigator, TabNavigator,
and DrawerNavigator. Each provides a way to configure and define the screens.

在 React Native，有三种主要的导航控件：StackNavigator, TabNavigator 和 DrawerNavigator。每个都提供了配置和定义页面的方法。

```js
// React Native
const MyApp = TabNavigator(
  { Home: { screen: HomeScreen }, Notifications: { screen: tabNavScreen } },
  { tabBarOptions: { activeTintColor: "#e91e63" } }
);
const SimpleApp = StackNavigator({
  Home: { screen: MyApp },
  stackScreen: { screen: StackScreen }
});
export default (MyApp1 = DrawerNavigator({
  Home: {
    screen: SimpleApp
  },
  Screen2: {
    screen: drawerScreen
  }
}));
```

In Flutter, there are two main widgets used to navigate between screens:
* A [Route]({{site.api}}/flutter/widgets/Route-class.html)
  is an abstraction for an app screen or page.
* A [Navigator]({{site.api}}/flutter/widgets/Navigator-class.html)
  is a widget that manages routes.

在 Flutter 中，有两种主要的控件实现页面之间的切换：
* [Route]({{site.api}}/flutter/widgets/Route-class.html) 是应用程序页面的一个抽象类。
* [Navigator]({{site.api}}/flutter/widgets/Navigator-class.html) 是管理页面路径的控件。

A `Navigator` is defined as a widget that manages a set of child widgets with a
stack discipline. The navigator manages a stack of `Route` objects and provides
methods for managing the stack, like
[`Navigator.push`]({{site.api}}/flutter/widgets/Navigator/push.html)
and [`Navigator.pop`]({{site.api}}/flutter/widgets/Navigator/pop.html).
A list of routes might be specified in the
[`MaterialApp`]({{site.api}}/flutter/material/MaterialApp-class.html)
widget, or they might be built on the fly, for example, in hero animations.
The following example specifies named routes in the `MaterialApp` widget.

`Navigator` 以堆栈的方式管理子控件。它的堆栈里存储的是 `Route` 对象，并且提供方法管理整个堆栈，比如 [`Navigator.push`]({{site.api}}/flutter/widgets/Navigator/push.html)
和 [`Navigator.pop`]({{site.api}}/flutter/widgets/Navigator/pop.html)。路径列表需要在 [`MaterialApp`]({{site.api}}/flutter/material/MaterialApp-class.html) 中指定。或者在页面切换的时候进行构建，比如 hero 动画。下面的例子在 `MaterialApp` 控件中指定了页面切换路径。

<!-- skip -->
```dart
// Flutter
class NavigationApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
            ...
      routes: <String, WidgetBuilder>{
        '/a': (BuildContext context) => usualNavscreen(),
        '/b': (BuildContext context) => drawerNavscreen(),
      }
            ...
  );
  }
}
```

To navigate to a named route, the
[of]({{site.api}}/flutter/widgets/Navigator/of.html)
method of the `Navigator` widget is used to specify the `BuildContext`
(a handle to the location of a widget in the widget tree).
The name of the route is passed to the `pushNamed` function to
navigate to the specified route.

要切换到一个已命名的路径，`Navigator` 中的 [of]({{site.api}}/flutter/widgets/Navigator/of.html) 方法被用于指定 `BuildContext` ( 该对象可以定位到控件树中的一个具体的控件)。路径的名称传递到 `pushNamed` 函数来切换至指定的路径。

<!-- skip -->
```dart
Navigator.of(context).pushNamed('/a');
```

You can also use the push method of `Navigator` which adds the given
[`route`]({{site.api}}/flutter/widgets/Route-class.html)
to the history of the navigator that most tightly encloses the given
[`context`]({{site.api}}/flutter/widgets/BuildContext-class.html),
and transitions to it. In the following example, the
[`MaterialPageRoute`]({{site.api}}/flutter/material/MaterialPageRoute-class.html)
widget is a modal route that replaces the entire screen with a platform-adaptive
transition. It takes a
[`WidgetBuilder`]({{site.api}}/flutter/widgets/WidgetBuilder.html)
as a required parameter.

你可以使用 `Navigator` 中的 push 方法添加 [`route`]({{site.api}}/flutter/widgets/Route-class.html) 到 navigator 的历史队列中，其中包含 [`context`]({{site.api}}/flutter/widgets/BuildContext-class.html) 并且可以切换到指定页面。在下面的例子中，[`MaterialPageRoute`]({{site.api}}/flutter/material/MaterialPageRoute-class.html) 是一个模式化路径，可以将整个页面通过平台自适应切换方式进行切换。它需要一个 [`WidgetBuilder`]({{site.api}}/flutter/widgets/WidgetBuilder.html) 参数。

<!-- skip -->
```dart
Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)
 => UsualNavscreen()));
```

### How do I use tab navigation and drawer navigation?

### 如何使用 tab 导航和 drawer 导航？ 

In Material Design apps, there are two primary options for Flutter navigation:
tabs and drawers. When there is insufficient space to support tabs, drawers
provide a good alternative.

在 Material Design 应用程序中，Flutter 的导航形式主要有两种：tab 和 drawer。如果没有足够的控件可以容纳 tab，drawer 就是个不错的选择。


#### Tab navigation

### Tab 导航

In React Native, `createBottomTabNavigator` and `TabNavigation`  are used to
show tabs and for tab navigation.

在 React Native 中，`createBottomTabNavigator` 和 `TabNavigation` 用来显示 tab 和 tab 导航。

```js
// React Native
import { createBottomTabNavigator } from 'react-navigation';

const MyApp = TabNavigator(
  { Home: { screen: HomeScreen }, Notifications: { screen: tabNavScreen } },
  { tabBarOptions: { activeTintColor: "#e91e63" } }
);
```

Flutter provides several specialized widgets for drawer and tab navigation:
* [TabController]({{site.api}}/flutter/material/TabController-class.html)&mdash;Coordinates
  the tab selection between a TabBar and a TabBarView.
* [TabBar]({{site.api}}/flutter/material/TabBar-class.html)&mdash;Displays
  a horizontal row of tabs.
* [Tab]({{site.api}}/flutter/material/Tab-class.html)&mdash;Creates
  a material design TabBar tab.
* [TabBarView]({{site.api}}/flutter/material/TabBarView-class.html)&mdash;Displays
  the widget that corresponds to the currently selected tab.

Flutter 针对 drawer 和 tab 导航提供几种专用的 widget：
* [TabController]({{site.api}}/flutter/material/TabController-class.html)&mdash;将 tab 与 TabBar 和 TabBarView 结合起来使用。
* [TabBar]({{site.api}}/flutter/material/TabBar-class.html)&mdash;水平显示一行 tab。
* [Tab]({{site.api}}/flutter/material/Tab-class.html)&mdash;创建一个 material design 风格的 TabBar 中的 tab。
* [TabBarView]({{site.api}}/flutter/material/TabBarView-class.html)&mdash;显示目前所选 tab 所对应的 widget。


<!-- skip -->
```dart
// Flutter
TabController controller=TabController(length: 2, vsync: this);

TabBar(
  tabs: <Tab>[
    Tab(icon: Icon(Icons.person),),
    Tab(icon: Icon(Icons.email),),
  ],
  controller: controller,
),

```


A `TabController` is required to coordinate the tab selection between a `TabBar`
and a `TabBarView`. The `TabController` constructor `length` argument is the total
number of tabs. A `TickerProvider` is required to trigger the notification whenever
a frame triggers a state change. The `TickerProvider` is `vsync`. Pass the
`vsync: this` argument to the `TabController` constructor whenever you create
a new `TabController`.

要将 tab 选项与 `TabBar` 和 `TabBarView` 结合起来使用就需要 `TabController`。 `TabController` 的构造函数中的 `length` 参数定义了 tab 的总数。当状态变化时，需要使用 `TickerProvider` 来触发通知。`TickerProvider` 是 `vsync`。当你需要创建新的 `TabController` 时，将 `vsync: this` 作为构造函数的参数即可。

The [TickerProvider]({{site.api}}/flutter/scheduler/TickerProvider-class.html)
is an interface implemented by classes that can vend
[`Ticker`]({{site.api}}/flutter/scheduler/Ticker-class.html)
objects. Tickers can be used by any object that must be notified whenever a
frame triggers, but they're most commonly used indirectly via an
[`AnimationController`]({{site.api}}/flutter/animation/AnimationController-class.html).
`AnimationControllers` need a `TickerProvider` to obtain their `Ticker`.
If you are creating an AnimationController from a State, then you can use the
[`TickerProviderStateMixin`]({{site.api}}/flutter/widgets/TickerProviderStateMixin-mixin.html)
or [`SingleTickerProviderStateMixin`]({{site.api}}/flutter/widgets/SingleTickerProviderStateMixin-mixin.html)
classes to obtain a suitable `TickerProvider`.

[TickerProvider]({{site.api}}/flutter/scheduler/TickerProvider-class.html) 接口可以用于生成 [`Ticker`]({{site.api}}/flutter/scheduler/Ticker-class.html) 对象。
当有对象被触发通知后会用到 Tickers，不过它通常都是被 [`AnimationController`]({{site.api}}/flutter/animation/AnimationController-class.html) 间接调用。
`AnimationControllers` 需要 `TickerProvider` 来获得对应的 `Ticker`。 
如果你通过 State 创建了一个 AnimationController，那么你就可以使用 [`TickerProviderStateMixin`]({{site.api}}/flutter/widgets/TickerProviderStateMixin-mixin.html) 或者
[`SingleTickerProviderStateMixin`]({{site.api}}/flutter/widgets/SingleTickerProviderStateMixin-mixin.html) 来获得对应的 `TickerProvider`。

The [`Scaffold`]({{site.api}}/flutter/material/Scaffold-class.html)
widget wraps a new `TabBar` widget and creates two tabs. The `TabBarView` widget
is passed as the `body` parameter of the `Scaffold` widget. All screens
corresponding to the `TabBar` widget’s tabs are children to the `TabBarView`
widget along with the same `TabController`.

[`Scaffold`]({{site.api}}/flutter/material/Scaffold-class.html) 
封装了一个新的 `TabBar` 控件，其中包含两个 tab。`TabBarView` 作为 `body` 参数传递到 `Scaffold` 中。所有和 `TabBar` 中的 tab 相关的页面均是 `TabBarView` 的子控件，并且都对应同一个 `TabController`。


<!-- skip -->
```dart
// Flutter

class _NavigationHomePageState extends State<NavigationHomePage> with SingleTickerProviderStateMixin {
  TabController controller=TabController(length: 2, vsync: this);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: Material (
        child: TabBar(
          tabs: <Tab> [
            Tab(icon: Icon(Icons.person),)
            Tab(icon: Icon(Icons.email),),
          ],
          controller: controller,
        ),
        color: Colors.blue,
      ),
      body: TabBarView(
        children: <Widget> [
          home.homeScreen(),
          tabScreen.tabScreen()
        ],
        controller: controller,
      )
    );
  }
}
```

#### Drawer navigation

#### Drawer 导航

In React Native, import the needed react-navigation packages and then use
`createDrawerNavigator` and `DrawerNavigation`.

在 React Native 中，导入所需的 react-navigation 包，然后使用 `createDrawerNavigator` 和 `DrawerNavigation` 实现。

```js
// React Native
export default (MyApp1 = DrawerNavigator({
  Home: {
    screen: SimpleApp
  },
  Screen2: {
    screen: drawerScreen
  }
}));
```

In Flutter, we can use the `Drawer` widget in combination with a `Scaffold` to
create a layout with a Material Design drawer. To add a `Drawer` to an app,
wrap it in a `Scaffold` widget. The `Scaffold` widget provides a consistent
visual structure to apps that follow the
[Material Design]({{site.material}}/design) guidelines. It also supports
special Material Design components, such as `Drawers`, `AppBars`, and `SnackBars`.

在 Flutter 中，我们可以结合 `Drawer` 和 `Scaffold` 一起使用来实现 Material Design 风格的 drawer 布局。如果要在应用程序中添加 `Drawer`， 可以将它封装在 `Scaffold` 控件中。`Scaffold` 控件提供了一种一致的界面风格，它遵循 [Material Design]({{site.material}}/design) 的设计原则。同时它还支持一些特殊的 Material Design 组件，比如 `Drawers`，`AppBars`， 和 `SnackBars`。

The `Drawer` widget is a Material Design panel that slides in horizontally from
the edge of a `Scaffold` to show navigation links in an application. You can
provide a [`Button`]({{site.api}}/flutter/material/RaisedButton-class.html),
a [`Text`]({{site.api}}/flutter/widgets/Text-class.html) widget,
or a list of items to display as the child to the `Drawer` widget.
In the following example, the
[`ListTile`]({{site.api}}/flutter/material/ListTile-class.html)
widget provides the navigation on tap.

`Drawer` 就是一个 Material Design 窗格，它可以从 `Scaffold` 边缘水平滑动显示应用程序的导航选项。你可以在里面添加 [`Button`]({{site.api}}/flutter/material/RaisedButton-class.html)， [`Text`]({{site.api}}/flutter/widgets/Text-class.html)。或者添加一个列表的元素作为 `Drawer` 的子控件。
在下面的例子中，[`ListTile`]({{site.api}}/flutter/material/ListTile-class.html) 提供了点击导航。###

<!-- skip -->
```dart
// Flutter
Drawer(
  child:ListTile(
    leading: Icon(Icons.change_history),
    title: Text('Screen2'),
    onTap: () {
      Navigator.of(context).pushNamed("/b");
    },
  ),
  elevation: 20.0,
),
```

The `Scaffold` widget also includes an `AppBar` widget that automatically
displays an appropriate IconButton to show the `Drawer` when a Drawer is
available in the `Scaffold`. The `Scaffold` automatically handles the
edge-swipe gesture to show the `Drawer`.

`Scaffold` 还包含一个 `AppBar`。它会自动显示一个图标按钮来表明 `Scaffold` 中有一个`Drawer`。`Scaffold` 会自动处理边缘的滑动手势来显示 `Drawer`。

<!-- skip -->
```dart
// Flutter
@override
Widget build(BuildContext context) {
  return Scaffold(
    drawer: Drawer(
      child: ListTile(
        leading: Icon(Icons.change_history),
        title: Text('Screen2'),
        onTap: () {
          Navigator.of(context).pushNamed("/b");
        },
      ),
      elevation: 20.0,
    ),
    appBar: AppBar(
      title: Text("Home"),
    ),
    body: Container(),
  );
}
```

{% include android-ios-figure-pair.md image="react-native/navigation.gif" alt="Navigation" class="border" %}

## Gesture detection and touch event handling

## 手势检测和触摸事件处理

To listen for and respond to gestures, Flutter supports taps, drags, and
scaling. The gesture system in Flutter has two separate layers. The first layer
includes raw pointer events, which describe the location and movement of
pointers, (such as touches, mice, and styli movements), across the screen. The
second layer includes gestures, which describe semantic actions that consist of
one or more pointer movements.

Flutter 支持点击、拖拽和缩放手势来监听和相应手势操作。Flutter 中的手势处理有两个独立的层。第一层是指针事件，指针事件定义了指针在屏幕上的位置和动作，比如触摸、鼠标和触摸笔。第二层指手势，主要是语义层面的动作，里面包含一种或者多种指针动作。

### How do I add a click or press listeners to a widget?

### 如何为控件添加点击或者按压的监听器？

In React Native, listeners are added to components using `PanResponder` or
the `Touchable` components.

在 React Native 中，使用 `PanResponder` 或者 `Touchable` 组件来添加监听器。

```js
// React Native
<TouchableOpacity
  onPress={() => {
    console.log("Press");
  }}
  onLongPress={() => {
    console.log("Long Press");
  }}
>
  <Text>Tap or Long Press</Text>
</TouchableOpacity>
```

For more complex gestures and combining several touches into a single gesture,
[`PanResponder`](https://facebook.github.io/react-native/docs/panresponder.html)
is used.

对于更加复杂手势以及将多个触摸添加到单独的一个手势中，可以使用 [`PanResponder`](https://facebook.github.io/react-native/docs/panresponder.html)。

```js
// React Native
class App extends Component {

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        !!getDirection(gestureState),
      onPanResponderMove: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        const drag = getDirection(gestureState);
      },
      onPanResponderTerminationRequest: (event, gestureState) => true
    });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <View style={styles.center}>
          <Text>Swipe Horizontally or Vertically</Text>
        </View>
      </View>
    );
  }
}
```

In Flutter, to add a click (or press) listener to a widget, use a button
or a touchable widget that has an `onPress: field`. Or, add gesture detection
to any widget by wrapping it in a
[`GestureDetector`]({{site.api}}/flutter/widgets/GestureDetector-class.html).

在 Flutter 中，要为控件添加点击或者按压监听器，使用带有 `onPress: field` 的按钮或者可触摸控件即可。或者，用任何控件封装 [`GestureDetector`]({{site.api}}/flutter/widgets/GestureDetector-class.html)，在其中添加手势检测。

<!-- skip -->
```dart
// Flutter
GestureDetector(
  child: Scaffold(
    appBar: AppBar(
      title: Text("Gestures"),
    ),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text('Tap, Long Press, Swipe Horizontally or Vertically '),
        ],
      )
    ),
  ),
  onTap: () {
    print('Tapped');
  },
  onLongPress: () {
    print('Long Pressed');
  },
  onVerticalDragEnd: (DragEndDetails value) {
    print('Swiped Vertically');
  },
  onHorizontalDragEnd: (DragEndDetails value) {
    print('Swiped Horizontally');
  },
);
```
For more information, including a list of Flutter `GestureDetector` callbacks,
see the [GestureDetector class][].

如果想要了解更多详细内容，包括 Flutter 的 `GestureDetector` 回调函数的列表，请查看页面 [`GestureDetector class`]({{site.api}}/flutter/widgets/GestureDetector-class.html#instance-properties)。


[GestureDetector class]: {{site.api}}/flutter/widgets/GestureDetector-class.html#instance-properties

{% include android-ios-figure-pair.md image="react-native/flutter-gestures.gif" alt="Gestures" class="border" %}

## Making HTTP network requests

## 发起 HTTP 网络请求

Fetching data from the internet is common for most apps. And in Flutter,
the `http` package provides the simplest way to fetch data from the internet.

对于大多数应用程序来说都需要从互联网上获取数据。在 Flutter 中，`http` 包提供了从互联网获取数据的最简单的途径。

### How do I fetch data from API calls?

### 如何通过 API 调用来获得数据呢？

React Native provides the Fetch API for networking—you make a fetch request
and then receive the response to get the data.

React Native 提供 Fetch API 实现网络编程，你可以发起请求，然后接收响应来获得数据。

```js
// React Native
_getIPAddress = () => {
  fetch("https://httpbin.org/ip")
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ _ipAddress: responseJson.origin });
    })
    .catch(error => {
      console.error(error);
    });
};
```

Flutter uses the `http` package. To install the `http` package, add it to
the dependencies section of our pubspec.yaml.

Flutter 使用 `http` 包。如果要安装 `http` 包，将它添加到 pubspec.yaml 的 dependencies 部分。

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: <latest_version>
```

Flutter uses the
[`dart:io`]({{site.api}}/flutter/dart-io/dart-io-library.html)
core HTTP support client. To create an HTTP Client, import `dart:io`.

Flutter 使用 [`dart:io`]({{site.api}}/flutter/dart-io/dart-io-library.html) 提供核心的 HTTP 客户端支持，要创建一个 HTTP 客户端，引用 `dart:io`。

<!-- skip -->
```dart
import 'dart:io';
```

The client supports the following HTTP operations: GET, POST, PUT, and DELETE.

客户端支持如下所列的 HTTP 操作：GET, POST, PUT 和 DELETE。

<!-- skip -->
```dart
// Flutter
final url = Uri.https('httpbin.org', 'ip');
final httpClient = HttpClient();
_getIPAddress() async {
  var request = await httpClient.getUrl(url);
  var response = await request.close();
  var responseBody = await response.transform(utf8.decoder).join();
  String ip = json.decode(responseBody)['origin'];
  setState(() {
    _ipAddress = ip;
  });
}
```

{% include android-ios-figure-pair.md image="react-native/api-calls.gif" alt="API calls" class="border" %}

## Form input

## 输入表单

Text fields allow users to type text into your app so they can be used to build
forms, messaging apps, search experiences, and more. Flutter provides two
core text field widgets:
[TextField]({{site.api}}/flutter/material/TextField-class.html) and
[TextFormField]({{site.api}}/flutter/material/TextFormField-class.html).

TextField 用于在应用程序中输入文本，这样就可以实现创建表单、短消息应用、搜索框等等功能。Flutter 提供两个核心文本输入控件：
[TextField]({{site.api}}/flutter/material/TextField-class.html) 和
[TextFormField]({{site.api}}/flutter/material/TextFormField-class.html).

### How do I use text field widgets?

### 如何使用文本输入控件？

In React Native, to enter text you use a `TextInput` component to show a text
input box and then use the callback to store the value in a variable.

在 React Native 里，可以使用 `TextInput` 组件来输入文本，它会显示一个输入框，然后通过回调函数来传递输入值。

```js
// React Native
<TextInput
  placeholder="Enter your Password"
  onChangeText={password => this.setState({ password })}
 />
<Button title="Submit" onPress={this.validate} />
```

In Flutter, use the
[`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html)
class to manage a `TextField` widget. Whenever the text field is modified,
the controller notifies its listeners.

在 Flutter 中，使用 [`TextEditingController`]({{site.api}}/flutter/widgets/TextEditingController-class.html) 类来管理 `TextField` 控件。当用户修改文本的时候，controller 会通知监听器。

Listeners read the text and selection properties to learn what the user typed
into the field. You can access the text in `TextField` by the `text` property of
the controller.

监听器读取文本和选项属性来获知用户所输入的内容。你可以通过 `TextField` 中的 `text` 属性获得用户输入的文本数据。

<!-- skip -->
```dart
// Flutter
final TextEditingController _controller = TextEditingController();
      ...
TextField(
  controller: _controller,
  decoration: InputDecoration(
    hintText: 'Type something', labelText: "Text Field "
  ),
),
RaisedButton(
  child: Text('Submit'),
  onPressed: () {
    showDialog(
      context: context,
        child: AlertDialog(
          title: Text('Alert'),
          content: Text('You typed ${_controller.text}'),
        ),
     );
   },
 ),
)
```

In this example, when a user clicks on the submit button an alert dialog
displays the current text entered in the text field. This is achieved using an
[`alertDialog`]({{site.api}}/flutter/material/AlertDialog-class.html)
widget that displays the alert message, and the text from
the `TextField` is accessed by the `text` property of the
[TextEditingController]({{site.api}}/flutter/widgets/TextEditingController-class.html).

在这个例子中，当用户点击提交按钮的时候，会弹出窗口显示当前输入的文本内容。可以使用 [`alertDialog`]({{site.api}}/flutter/material/AlertDialog-class.html) 控件显示提示信息，`TextField` 的文本通过 `text` 属性来获得，该属性属于 [TextEditingController]({{site.api}}/flutter/widgets/TextEditingController-class.html)。

### How do I use Form widgets?

### 如何使用 Form 控件呢？

In Flutter, use the
[`Form`]({{site.api}}/flutter/widgets/Form-class.html)
widget where
[`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html)
widgets along with the submit button are passed as children.
The `TextFormField` widget has a parameter called
[`onSaved`]({{site.api}}/flutter/widgets/FormField/onSaved.html)
which takes a callback and executes when the form is saved. A `FormState`
object is used to save, reset, or validate
each `FormField` that is a descendant of this `Form`. To obtain the `FormState`,
you can use  `Form.of` with a context whose ancestor is the Form, or pass a
`GlobalKey` to the Form constructor and call `GlobalKey.currentState`.

在 Flutter 中，当需要使用带有提交按钮和 [`TextFormField`]({{site.api}}/flutter/material/TextFormField-class.html) 组件的复合控件时，就会用到 [`Form`]({{site.api}}/flutter/widgets/Form-class.html)。`TextFormField` 内含一个 [`onSaved`]({{site.api}}/flutter/widgets/FormField/onSaved.html) 参数，它可以设置一个回调函数，当表单存储的时候会回调该函数。`FormState` 用于存储、重置或者验证 `Form` 内含的每个 `FormField`。你可以通过将当前表单的 context 属性赋值给 `Form.of` 来获得 `FormState`。或者在表单的构造函数里使用 `GlobalKey`，然后调用 `GlobalKey.currentState` 来获得 `FormState`。

<!-- skip -->
```dart
final formKey = GlobalKey<FormState>();

...

Form(
  key:formKey,
  child: Column(
    children: <Widget>[
      TextFormField(
        validator: (value) => !value.contains('@') ? 'Not a valid email.' : null,
        onSaved: (val) => _email = val,
        decoration: const InputDecoration(
          hintText: 'Enter your email',
          labelText: 'Email',
        ),
      ),
      RaisedButton(
        onPressed: _submit,
        child: Text('Login'),
      ),
    ],
  ),
)
```

The following example shows how `Form.save()` and `formKey` (which is a
`GlobalKey`) are used to save the form on submit.

下面的示例代码展示了 `Form.save()` 和 `formKey`（这个实际上是 `GlobalKey`）如何被用于表单提交的。

<!-- skip -->
```dart
void _submit() {
  final form = formKey.currentState;
  if (form.validate()) {
    form.save();
    showDialog(
      context: context,
      child: AlertDialog(
        title: Text('Alert'),
        content: Text('Email: $_email, password: $_password'),
      )
    );
  }
}
```

{% include android-ios-figure-pair.md image="react-native/input-fields.gif" alt="Input" class="border" %}

## Platform-specific code

## 平台相关代码

When building a cross-platform app, you want to re-use as much code as
possible across platforms. However, scenarios may arise where it makes sense for
the code to be different depending on the OS. This requires a separate
implementation by declaring a specific platform.

当构建跨平台应用程序的时候，你会尽量多地复用代码。然而，根据不同的应用场景，代码会根据平台的不同有所变化。这就需要提前声明具体的平台来进行独立的实现。

In React Native, the following implementation would be used:

在 React Native 中，下面的实现代码会被用到：

```js
// React Native
if (Platform.OS === "ios") {
  return "iOS";
} else if (Platform.OS === "android") {
  return "android";
} else {
  return "not recognised";
}
```
In Flutter, use the following implementation:

而在 Flutter 中，则是下面这样的实现：
<!-- skip -->
```dart
// Flutter
if (Theme.of(context).platform == TargetPlatform.iOS) {
  return "iOS";
} else if (Theme.of(context).platform == TargetPlatform.android) {
  return "android";
} else if (Theme.of(context).platform == TargetPlatform.fuchsia) {
  return "fuchsia";
} else {
  return "not recognised ";
}
```

## Debugging

## 调试

Before running your applications, verify your code with `flutter analyze`. The
Flutter analyzer (which is a wrapper around the `dartanalyzer` tool) examines
your code and helps identify possible issues. If you’re using a Flutter-enabled
IDE, this occurs automatically.

在运行应用程序之前，可以使用 `flutter analyze` 检验一下代码。Flutter analyzer （它封装了 `dartanalyzer` 工具）可以验证你的代码并且帮助你定位潜在的问题。如果你使用的是启用了 Flutter 的 IDE 的话，这个过程是全自动的。

### How do I access the in-app developer menu?

### 如何打开程序里的开发者菜单？

In React Native, the developer menu can be accessed by shaking your device: ⌘D
for the iOS Simulator or ⌘M for Android emulator.

在 React Native 中，开发者菜单可以通过摇动设备打开：对于 iOS 模拟器的快捷键是 ⌘D 而 Android 模拟器的快捷键是 ⌘M。

In Flutter, if you are using an IDE, you can use the IDE tools. If you start
your application using `flutter run` you can also access the menu by typing `h`
in the terminal window, or type the following shortcuts:

在 Flutter 中，如果你使用 IDE，那么可以直接使用 IDE 工具。如果你是通过命令行运行 `flutter run` 来启动应用程序的，你可以在命令行窗口通过输入 `h` 来打开菜单，或者参考下面的快捷键说明：

<div class="table-wrapper" markdown="1">
| Action| Terminal Shortcut| Debug functions and properties|
| :------- | :------: | :------ |
| Widget hierarchy of the app| `w`| debugDumpApp()|
| Rendering tree of the app | `t`| debugDumpRenderTree()|
| Layers| `L`| debugDumpLayerTree()|
| Accessibility | `S` (traversal order) or<br>`U` (inverse hit test order)|debugDumpSemantics()|
| To toggle the widget inspector | `i` | WidgetsApp. showWidgetInspectorOverride|
| To toggle the display of construction lines| `p` | debugPaintSizeEnabled|
| To simulate different operating systems| `o` | defaultTargetPlatform|
| To display the performance overlay | `P` | WidgetsApp. showPerformanceOverlay|
| To save a screenshot to flutter. png| `s` ||
| To quit| `q` ||
{:.table.table-striped}
</div>

<div class="table-wrapper" markdown="1">
| 功能| 命令行快捷键| 调试功能和属性|
| :------- | :------: | :------ |
| 应用程序的控件层级| `w`| debugDumpApp()|
| 渲染程序的控件树 | `t`| debugDumpRenderTree()|
| 层| `L`| debugDumpLayerTree()|
| 可访问性 | `S` (遍历顺序) 或者<br>`U` (反转点击测试顺序)|debugDumpSemantics()|
| 打开或者关闭控件窗口 | `i` | WidgetsApp. showWidgetInspectorOverride|
| 显示或者隐藏框架线条| `p` | debugPaintSizeEnabled|
| 模拟不同的操作系统| `o` | defaultTargetPlatform|
| 叠加显示性能参数| `P` | WidgetsApp. showPerformanceOverlay|
| 将截屏保存为 flutter.png| `s` ||
| 退出| `q` ||
{:.table.table-striped}
</div>


### How do I perform a hot reload?

### 如何进行热重载？

Flutter’s hot reload feature helps you quickly and easily experiment, build UIs,
add features, and fix bugs. Instead of recompiling your app every time you make
a change, you can hot reload your app instantly. The app is updated to reflect
your change, and the current state of the app is preserved.

Flutter 的热重载特性可以帮助你快速便捷地实验、构建 UI 和各种特性以及修复 bug。每次修改代码以后，你只需直接热重载你的应用程序即可，而无需重新进行编译。应用程序会根据你的修改进行相应的更新，而程序原有的状态则会被保留。

In React Native, the shortcut is ⌘R for the iOS Simulator and tapping R twice on
Android emulators.

在 React Native 中，iOS 模拟器对应的快捷键是 ⌘R ，对应 Android 模拟器的快捷键是点击两次 R 。

In Flutter, If you are using IntelliJ IDE or Android Studio, you can select Save
All (⌘s/ctrl-s), or you can click the Hot Reload button on the toolbar. If you
are running the app at the command line using `flutter run`, type `r` in the
Terminal window. You can also perform a full restart by typing `R` in the
Terminal window.

在 Flutter 中，如果你使用的是 IntelliJ 或者 Android Studio，可以使用 Save All (⌘s/ctrl-s)，或者可以点击工具栏上的 Hot Reload 按钮。如果你是在命令行里使用 `flutter run` 命令运行的程序，在窗口里输入 `r` 即可。也可以输入 `R` 进行彻底的重启。

### What tools can I use to debug my app in Flutter?

### 在 Flutter 中使用什么工具可以调试应用程序呢？

There are several options and tools you can use when you need to debug your
Flutter app.

关于 Flutter 应用程序的调试，有多个可选方式和工具供你选择。

In addition to the Flutter analyzer, the
[`Dart Observatory`](https://dart-lang.github.io/observatory/) is a tool used to
profile and debug your Dart applications. If you started your application using
`flutter run` in Terminal, you can open the web page at the Observatory URL
printed to the terminal window, for example:  `http://127.0.0.1:8100/`.

除了 Flutter analyzer，还可以使用 [`Dart Observatory`](https://dart-lang.github.io/observatory/)，它可用于调试 Dart 应用程序。如果你是通过命令行运行 `flutter run` 启动应用程序的，可以打开 Observatory URL 所显示的地址，比如：`http://127.0.0.1:8100/`。

The Observatory includes support for profiling, examining the heap, observing
executed lines of code, debugging memory leaks and memory fragmentation. For
more information, see the
[Observatory documentation](https://dart-lang.github.io/observatory/).
Observatory is included for free when you download and install the Dart SDK.

Observatory 包括程序运行状态监控，堆栈测试，运行代码监视，内存泄漏和内存分段调试。如果想了解更多详细内容，请参考 [Observatory documentation](https://dart-lang.github.io/observatory/)。

If you're using an IDE, you can debug your application using the IDE debugger.

如果你在使用 IDE，那么你可以直接使用 IDE 内置的调试器进行调试。

If you're using IntelliJ and Android Studio, you can use the Flutter Inspector.
 The Flutter Inspector makes it much easier to understand why your application
  is rendering the way it does. It allows you to:
* View the UI structure of your app as a tree of widgets
* Select a point on your device or simulator and find the corresponding widget
 that rendered those pixels
* View properties for individual widgets
* Quickly identify layout issues and determine their cause

如果你使用的是 IntelliJ 和 Android Studio，你可以使用 Flutter Inspector。
Flutter Inspector 很好上手，并且可以帮你洞悉应用程序图像渲染的过程。通过它，你可以：
* 以控件树的形式查看应用程序的 UI 结构
* 在设备或者模拟器上选择某一个点，然后找到该位置图像对应的控件
* 查看每个控件的属性
* 快速定位布局问题并找到原因

The Flutter Inspector view can be opened from View > Tool Windows > Flutter
Inspector. Content is shown only when an app is running.

Flutter Inspector 窗口可以通过如下步骤打开：View > Tool Windows > Flutter
Inspector。只有在应用程序运行的时候才会显示内容。

To inspect a specific widget, select the **Toggle inspect mode** action in the
toolbar, then click on the desired widget on an attached phone or simulator. The
widget is highlighted in your app’s UI. You’ll see the widget in the widget
hierarchy in IntelliJ and the individual properties for that widget.

如果要查看特定的控件，在工具栏中选择 **Toggle inspect mode** ，然后在已连接的手机或者模拟器上点击对应的控件。该控件会高亮显示。你就可以在 IntelliJ 看到对应的控件层级和控件属性。

For more information, see
[Debugging Flutter Apps](/docs/testing/debugging).

更多详细内容，请查看 [Debugging Flutter Apps](/docs/testing/debugging)。

## Animation

## 动画

Well-designed animation makes a UI feel intuitive, contributes to the look and
feel of a polished app, and improves the user experience. Flutter’s animation
support makes it easy to implement simple and complex animations. The Flutter
SDK includes many Material Design widgets that include standard
motion effects and you can easily customize these effects to personalize your
app.

精美的动画效果会使得 UI 更加直观，可以提升整体视觉效果，使应用显得更加精致，从而提升用户体验。Flutter 的动画框架使得开发者能够更方便地实现简单和复杂的动画。Flutter SDK 含有很多 Material Design 控件。其中已经包括了标准的动画效果，你可以很方便地自定义这些效果。

In React Native, Animated APIs are used to create animations.

在 React Native 中，动画 API 用于创建动画。

In Flutter, use the
[`Animation`]({{site.api}}/flutter/animation/Animation-class.html)
class and the
[`AnimationController`]({{site.api}}/flutter/animation/AnimationController-class.html)
class.  `Animation` is an abstract class that understands its current value and
its state (completed or dismissed). The `AnimationController` class lets you
play an animation forward or in reverse, or stop animation and set the animation
to a specific value to customize the motion.

在 Flutter 中，使用 [`Animation`]({{site.api}}/flutter/animation/Animation-class.html) 类和 [`AnimationController`]({{site.api}}/flutter/animation/AnimationController-class.html) 类实现动画。`Animation` 是抽象类，内含其当前的值和它的状态（已完成或者已取消）。`AnimationController` 类可以正向或者反向播放动画或者停止动画以及为动画设置特定值来自定义动画。

### How do I add a simple fade-in animation?

### 如何添加一个简单的淡入动画效果？

In the React Native example below, an animated component, `FadeInView` is
created using the Animated API. The initial opacity state, final state, and the
duration over which the transition occurs are defined. The animation component
is added inside the `Animated` component, the opacity state `fadeAnim` is mapped
to the opacity of the Text component that we want to animate, and then,
`start()` is called to start the animation.

在下面的 React Native 示例中，有一个动画组件，也就是 `FadeInView`，它是使用 Animated API 创建的。定义了初始的不透明状态，最终状态和动画切换之间的时间间隔。在 `Animated` 中添加了动画组件，不透明状态 `fadeAnim` 映射到我们想要添加动画效果的文本组件上，然后在开始动画的时候调用 `start()`。

```js
// React Native
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 10000
    }).start();
  }
  render() {
    return (
      <Animated.View style={%raw%}{{...this.props.style, opacity: this.state.fadeAnim }}{%endraw%} >
        {this.props.children}
      </Animated.View>
    );
  }
}
    ...
<FadeInView>
  <Text> Fading in </Text>
</FadeInView>
    ...
```

To create the same animation in Flutter, create an
[`AnimationController`]({{site.api}}/flutter/animation/AnimationController-class.html)
object named `controller` and specify the duration. By default, an
`AnimationController` linearly produces values that range from 0.0 to 1.0,
during a given duration. The animation controller generates a new value
whenever the device running your app is ready to display a new frame.
Typically, this rate is around 60 values per second.

要在 Flutter 中实现相同的动画效果，创建一个 [`AnimationController`]({{site.api}}/flutter/animation/AnimationController-class.html) 对象，叫它 `controller`，并且指定时间间隔。在默认配置下， `AnimationController` 会在给定时间间隔线性的生成从 0.0 到 1.0 的数值。当你的程序可以显示新一帧画面的时候，AnimationController 会生成一个新的值。通常，这个频率在每秒 60 个值。

When defining an `AnimationController`, you must pass in a `vsync` object. The
presence of `vsync` prevents offscreen animations from consuming unnecessary
resources. You can use your stateful object as the `vsync` by adding
`TickerProviderStateMixin` to the class definition. An `AnimationController`
needs a TickerProvider, which is configured using the `vsync` argument on the
constructor.

当定义 `AnimationController` 的时候，你必须传入一个 `vsync` 对象。`vsync` 会防止屏幕显示区域之外的动画消耗不必要的资源。你可以通过添加 `TickerProviderStateMixin` 到类定义中来使用有状态的对象。`AnimationController` 需要传入一个 TickerProvider，它是通过构造函数里的 `vsync` 参数进行配置的。

A [`Tween`]({{site.api}}/flutter/animation/Tween-class.html)
describes the interpolation between a beginning and ending value
or the mapping from an input range to an output range. To use a `Tween` object
with an animation, call the `Tween` object's `animate` method and pass it the
`Animation` object that you want to modify.

[`Tween`]({{site.api}}/flutter/animation/Tween-class.html) 定义了起始和结束值之间或者输入段到输出段之间的过渡。如果要在动画中使用 `Tween` 对象，调用 `Tween` 对象的 `animate` 方法，然后把它赋给你要修改的 `Animation` 对象。

For this example, a
[`FadeTransition`]({{site.api}}/flutter/widgets/FadeTransition-class.html)
widget is used and the `opacity` property is mapped to the `animation` object.

在这个例子中，用到了 [`FadeTransition`]({{site.api}}/flutter/widgets/FadeTransition-class.html) 控件，它的 `opacity` 属性映射到了 `animation` 对象上。

To start the animation, use `controller.forward()`. Other operations can also be
performed using the controller such as `fling()` or `repeat()`. For this
example, the
[`FlutterLogo`]({{site.api}}/flutter/material/FlutterLogo-class.html)
widget is used inside the `FadeTransition` widget.

要开始动画，使用 `controller.forward()`。其它的操作也可以使用控制器里的方法，比如 `fling()` 或者 `repeat()`。这个例子里，[`FlutterLogo`]({{site.api}}/flutter/material/FlutterLogo-class.html) 控件被用于 `FadeTransition` 控件中。

<!-- skip -->
```dart

// Flutter
import 'package:flutter/material.dart';

void main() {
  runApp(Center(child: LogoFade()));
}

class LogoFade extends StatefulWidget {
  _LogoFadeState createState() => _LogoFadeState();
}

class _LogoFadeState extends State<LogoFade> with TickerProviderStateMixin {
  Animation animation;
  AnimationController controller;

  initState() {
    super.initState();
    controller = AnimationController(
        duration: const Duration(milliseconds: 3000), vsync: this);
    final CurvedAnimation curve =
    CurvedAnimation(parent: controller, curve: Curves.easeIn);
    animation = Tween(begin: 0.0, end: 1.0).animate(curve);
    controller.forward();
  }

  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: animation,
      child: Container(
        height: 300.0,
        width: 300.0,
        child: FlutterLogo(),
      ),
    );
  }

  dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

{% include android-ios-figure-pair.md image="react-native/flutter-fade.gif" alt="Flutter fade" class="border" %}

### How do I add swipe animation to cards?

### 如何为卡片添加滑动动画呢？

In React Native, either the `PanResponder` or third-party libraries are used for
swipe animation.

在 React Native 中，无论  `PanResponder` 或者第三方库都可被用于滑动动画。

In Flutter, to add a swipe animation, use the
[`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html)
widget and nest the child widgets.

在 Flutter 中，要添加滑动动画，使用 [`Dismissible`]({{site.api}}/flutter/widgets/Dismissible-class.html)控件封装其它子控件即可。

<!-- skip -->
```dart
child: Dismissible(
  key: key,
  onDismissed: (DismissDirection dir) {
    cards.removeLast();
  },
  child: Container(
    ...
  ),
),
```

{% include android-ios-figure-pair.md image="react-native/card-swipe.gif" alt="Card swipe" class="border" %}

## React Native and Flutter Widget equivalent components

## React Native 和 Flutter 控件对等的组件

The following table lists commonly-used React Native components mapped to the
corresponding Flutter widget and common widget properties.

下面的表格列举了通用的 React Native 组件与对应的 Flutter 控件和通用的控件属性。

<div class="table-wrapper" markdown="1">
| React Native Component                                                                    | Flutter Widget                                                                                             | Description                                                                                                                            |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [Button](https://facebook.github.io/react-native/docs/button.html)                        | [Raised Button]({{site.api}}/flutter/material/RaisedButton-class.html)                           | A basic raised button.                                                                              |
|                                                                                           |  onPressed [required]                                                                                        | The callback when the button is tapped or otherwise activated.                                                          |
|                                                                                           | Child                                                                              | The button's label.                                                                                                      |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Button](https://facebook.github.io/react-native/docs/button.html)                        | [Flat Button]({{site.api}}/flutter/material/FlatButton-class.html)                               | A basic flat button.                                                                                                         |
|                                                                                           |  onPressed [required]                                                                                        | The callback when the button is tapped or otherwise activated.                                                            |
|                                                                                           | Child                                                                              | The button's label.                                                                                                      |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html)                | [ListView]({{site.api}}/flutter/widgets/ListView-class.html)                                    | A scrollable list of widgets arranged linearly.|
||        children                                                                              | 	( <Widget\> [ ])  List of child widgets to display.
||controller |[ [Scroll Controller]({{site.api}}/flutter/widgets/ScrollController-class.html) ] An object that can be used to control a scrollable widget.
||itemExtent|[ double ] If non-null, forces the children to have the given extent in the scroll direction.
||scroll Direction|[ [Axis]({{site.api}}/flutter/painting/Axis-class.html) ] The axis along which the scroll view scrolls.
||                                                                                                            |                                                                                                                                        |
| [FlatList](https://facebook.github.io/react-native/docs/flatlist.html)                    | [ListView. builder()]({{site.api}}/flutter/widgets/ListView/ListView.builder.html)               | The constructor for a linear array of widgets that are created on demand.
||itemBuilder [required] |[[ Indexed Widget Builder]({{site.api}}/flutter/widgets/IndexedWidgetBuilder.html)] helps in building the children on demand. This callback is called only with indices greater than or equal to zero and less than the itemCount.
||itemCount |[ int ] improves the ability of the ListView to estimate the maximum scroll extent.
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Image]({{site.api}}/flutter/widgets/Image-class.html)                         | [Image](https://facebook.github.io/react-native/docs/image.html)                                           | A widget that displays an image.                                                                                                       |
|                                                                                           |  image [required]                                                                                          | The image to display.                                                                                                                  |
|                                                                                           | Image. asset                                                                                                | Several constructors are provided for the various ways that an image can be specified.                                                 |
|                                                                                           | width, height, color, alignment                                                                            | The style and layout for the image.                                                                                                         |
|                                                                                           | fit                                                                                                        | Inscribing the image into the space allocated during layout.                                                                           |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Modal](https://facebook.github.io/react-native/docs/modal.html)                          | [ModalRoute]({{site.api}}/flutter/widgets/ModalRoute-class.html)                                | A route that blocks interaction with previous routes.                                                                                  |
|                                                                                           | animation                                                                                                  | The animation that drives the route's transition and the previous route's forward transition.                                          |
|                                                                                           |                                                                                                            |                                                                                                                                        |
|  [Activity Indicator](https://facebook.github.io/react-native/docs/activityindicator.html) | [Circular Progress Indicator]({{site.api}}/flutter/material/CircularProgressIndicator-class.html) | A widget that shows progress along a circle.                                                                                           |
|                                                                                           | strokeWidth                                                                                                | The width of the line used to draw the circle.                                                                                         |
|                                                                                           | backgroundColor                                                                                            | The progress indicator's background color. The current theme's `ThemeData.backgroundColor` by default.                                   |
|                                                                                           |                                                                                                            |                                                                                                                                        |
|  [Activity Indicator](https://facebook.github.io/react-native/docs/activityindicator.html) | [Linear Progress Indicator]({{site.api}}/flutter/material/LinearProgressIndicator-class.html)     | A widget that shows progress along a circle.                                                                                           |
|                                                                                           | value                                                                                                      | The value of this progress indicator.                                                                                                   |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Refresh Control](https://facebook.github.io/react-native/docs/refreshcontrol.html)        | [Refresh Indicator]({{site.api}}/flutter/material/RefreshIndicator-class.html)                   | A widget that supports the Material "swipe to refresh" idiom.                                                                          |
|                                                                                           | color                                                                                                      | The progress indicator's foreground color.                                                                                             |
|                                                                                           | onRefresh                                                                                                  | A function that's called when a user drags the refresh indicator far enough to demonstrate that they want the app to refresh.  |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Container]({{site.api}}/flutter/widgets/Container-class.html)                                  | A widget that surrounds a child widget.                                                                                                                |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Column]({{site.api}}/flutter/widgets/Column-class.html)                                        | A widget that displays its children in a vertical array.                                                                                              |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Row]({{site.api}}/flutter/widgets/Row-class.html)                                              | A widget that displays its children in a horizontal array.                                                                                            |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Center]({{site.api}}/flutter/widgets/Center-class.html)                                        | A widget that centers its child within itself.                                                                                                       |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Padding]({{site.api}}/flutter/widgets/Padding-class.html)                                      | A widget that insets its child by the given padding.                                                                                                 |
|                                                                                           | padding [required]                                                                                         | [ EdgeInsets ] The amount of space to inset the child.
|||
| [Touchable Opacity](https://facebook.github.io/react-native/docs/touchableopacity.html)    | [Gesture Detector]({{site.api}}/flutter/widgets/GestureDetector-class.html)                      | A widget that detects gestures.                                                                                                                       |
|                                                                                           | onTap                                                                                                      | A callback when a tap occurs.                                                                                                               |
|                                                                                           | onDoubleTap                                                                                                | A callback when a tap occurs at the same location twice in quick succession.
|||
| [Text Input]({{site.api}}/flutter/services/TextInput-class.html)                | [Text Input](https://facebook.github.io/react-native/docs/textinput.html)                                   | The interface to the system's text input control.                                                                                           |
|                                                                                           | controller                                                                                                 | [ [Text Editing Controller]({{site.api}}/flutter/widgets/TextEditingController-class.html) ] used to access and modify text.
|||
| [Text](https://facebook.github.io/react-native/docs/text.html)                          | [Text]({{site.api}}/flutter/widgets/Text-class.html)                                            | The Text widget that displays a string of text with a single style.                                                                                                                                                                           |
|                                                                                         | data                                                                                                      | [ String ] The text to display.                                                                                                                                                                              |
|                                                                                         | textDirection                                                                                             | [ [Text Align]({{site.api}}/flutter/dart-ui/TextAlign-class.html) ] The direction in which the text flows.                                                                                     |
|                                                                                         |                                                                                                           |                                                                                                                                                                                                              |
| [Switch](https://facebook.github.io/react-native/docs/switch.html)                      | [Switch]({{site.api}}/flutter/material/Switch-class.html)                                      | A material design switch.                                                                                                                                                                                    |
|                                                                                         | value [required]                                                                                          | [ boolean ] Whether this switch is on or off.                                                                                                                                                                 |
|                                                                                         | onChanged [required]                                                                                      | [ callback ] Called when the user toggles the switch on or off.                                                                                                                                               |
|                                                                                         |                                                                                                           |                                                                                                                                                                                                              |
| [Slider](https://facebook.github.io/react-native/docs/slider.html)                      | [Slider]({{site.api}}/flutter/material/Slider-class.html)                                      | Used to select from a range of values.                                                                                                                                                                       |
|                                                                                         | value [required]                                                                                          | [ double ] The current value of the slider.                                                                                                                                                                           |
|                                                                                         | onChanged [required]                                                                                      | Called when the user selects a new value for the slider.                                                                                                                                                      |
{:.table.table-striped}
</div>

<div class="table-wrapper" markdown="1">
| React Native Component                                                                    | Flutter 控件                                                                                             | 描述                                                                                                                            |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [Button](https://facebook.github.io/react-native/docs/button.html)                        | [Raised Button]({{site.api}}/flutter/material/RaisedButton-class.html)                           | 基本的悬浮按钮                                                                              |
|                                                                                           |  onPressed [required]                                                                                        | 该回调函数在当按钮被点击的时候被触发。                                                       |
|                                                                                           | Child                                                                              | 按钮的标签                                                                                                     |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Button](https://facebook.github.io/react-native/docs/button.html)                        | [Flat Button]({{site.api}}/flutter/material/FlatButton-class.html)                               | 基本的平面按钮                                                                                                       |
|                                                                                           |  onPressed [required]                                                                                        | 该回调函数在当按钮被点击的时候被触发。                                                        |
|                                                                                           | Child                                                                              | The button's label.                                                                                                      |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html)                | [ListView]({{site.api}}/flutter/widgets/ListView-class.html)                                    | 一个可滑动的纵向排列的控件列表。|
||        children                                                                              |   ( <Widget\> [ ])  要显示的子控件列表
||controller |[ [Scroll Controller]({{site.api}}/flutter/widgets/ScrollController-class.html) ] 可用于控制滑动控件的对象
||itemExtent|[ double ] 如果非空，那么强制所有子控件在滑动方向上增加给定的距离
||scroll Direction|[ [Axis]({{site.api}}/flutter/painting/Axis-class.html) ] 滑动页面的滑动轴
||                                                                                                            |                                                                                                                                        |
| [FlatList](https://facebook.github.io/react-native/docs/flatlist.html)                    | [ListView. builder()]({{site.api}}/flutter/widgets/ListView/ListView.builder.html)               | 根据需要创建的一组控件的构造函数。
||itemBuilder [required] |[[ Indexed Widget Builder]({{site.api}}/flutter/widgets/IndexedWidgetBuilder.html)] 根据需要创建子控件。当元素序号大于等于零并且小于队列元素总数时，该回调函数会被调用。
||itemCount |[ int ] 优化了 ListView 对于最大滑动范围的预估能力。
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Image]({{site.api}}/flutter/widgets/Image-class.html)                         | [Image](https://facebook.github.io/react-native/docs/image.html)                                           | 显示图片的控件。                                                                                                    |
|                                                                                           |  image [required]                                                                                          | 要显示的图片                                              |
|                                                                                           | Image. asset                                                                                                | 有多个构造函数可以用于指定图片。       |
|                                                                                           | 宽, 高, 颜色, alignment                                                                            | 图片的风格和布局。                                                                                                         |
|                                                                                           | fit                                                                                                        | 将图片内嵌到布局对应的空间里。I                       |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Modal](https://facebook.github.io/react-native/docs/modal.html)                          | [ModalRoute]({{site.api}}/flutter/widgets/ModalRoute-class.html)                                | 避免和之前路径交叉的路径。               |
|                                                                                           | animation                                                                                                  | 路径切换的动画和之前路径向前切换的动画。        |
|                                                                                           |                                                                                                            |                                                                                                                                        |
|  [Activity Indicator](https://facebook.github.io/react-native/docs/activityindicator.html) | [Circular Progress Indicator]({{site.api}}/flutter/material/CircularProgressIndicator-class.html) | 一个圆形的进度条控件。                                        |
|                                                                                           | strokeWidth                                                                                                | 圆形线条的宽度。         |
|                                                                                           | backgroundColor                                                                                            | 指示进度的背景色。默认是当前主题的 `ThemeData.backgroundColor`。
|                                                                                           |                                                                                                            |                                                                                                                                        |
|  [Activity Indicator](https://facebook.github.io/react-native/docs/activityindicator.html) | [Linear Progress Indicator]({{site.api}}/flutter/material/LinearProgressIndicator-class.html)     | 一个水平条形的进度条。                                                         |
|                                                                                           | value                                                                                                      | 进度值。       |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [Refresh Control](https://facebook.github.io/react-native/docs/refreshcontrol.html)        | [Refresh Indicator]({{site.api}}/flutter/material/RefreshIndicator-class.html)                   | 支持 Material 中滑动刷新的控件     |
|                                                                                           | color                                                                                                      | 进度指示的前景色。         |
|                                                                                           | onRefresh                                                                                                  | 当用户拖拽刷新指示器想要刷新的时候会调用该函数。  |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Container]({{site.api}}/flutter/widgets/Container-class.html)                                  | 封装子控件的控件。      |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Column]({{site.api}}/flutter/widgets/Column-class.html)                                        | 将子控件纵向排列的控件。                     |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Row]({{site.api}}/flutter/widgets/Row-class.html)                                              | 将子控件横向排列的控件。                   |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Center]({{site.api}}/flutter/widgets/Center-class.html)                                        | 将子控件放置于中央的控件。                                  |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [View](https://facebook.github.io/react-native/docs/view.html)                            | [Padding]({{site.api}}/flutter/widgets/Padding-class.html)                                      | 将子控件按照给定的间隔进行排列的控件。              |
|                                                                                           | padding [required]                                                                                         | [ EdgeInsets ] 子控件间隔。
|||
| [Touchable Opacity](https://facebook.github.io/react-native/docs/touchableopacity.html)    | [Gesture Detector]({{site.api}}/flutter/widgets/GestureDetector-class.html)                      | 检测手势的控件。                                                                    |
|                                                                                           | onTap                                                                                                      | 当点击的时候会调用。         |
|                                                                                           | onDoubleTap                                                                                                | 当两次点击的时候会调用。
|||
| [Text Input]({{site.api}}/flutter/services/TextInput-class.html)                | [Text Input](https://facebook.github.io/react-native/docs/textinput.html)                                   | 调用系统文本输入的接口。                                |
|                                                                                           | controller                                                                                                 | [ [Text Editing Controller]({{site.api}}/flutter/widgets/TextEditingController-class.html) ] 用于获取或者修改文本。
|||
| [Text](https://facebook.github.io/react-native/docs/text.html)                          | [Text]({{site.api}}/flutter/widgets/Text-class.html)                                            | 以单一的样式显示文本的文本控件。                                                                              |
|                                                                                         | data                                                                                                      | [ String ] 要显示的文本。                                                                                                                                                                          |
|                                                                                         | textDirection                                                                                             | [ [Text Align]({{site.api}}/flutter/dart-ui/TextAlign-class.html) ]文本的方向。    |
|                                                                                         |                                                                                                           |                                                                                                                                                                                                              |
| [Switch](https://facebook.github.io/react-native/docs/switch.html)                      | [Switch]({{site.api}}/flutter/material/Switch-class.html)                                      | Material Design 样式的开关。                                                                                                                                         |
|                                                                                         | value [required]                                                                                          | [ boolean ] 开关的开启或者闭合状态。                                                                                                                                                                 |
|                                                                                         | onChanged [required]                                                                                      | [ callback ] 当用户点击开关的时候调用。                   |
|                                                                                         |                                                                                                           |                                                                                                                                                                                                              |
| [Slider](https://facebook.github.io/react-native/docs/slider.html)                      | [Slider]({{site.api}}/flutter/material/Slider-class.html)                                      | 选择一个范围的值。                                                                                                                               |
|                                                                                         | value [required]                                                                                          | [ double ] 当前滑动器的值。                                                                                                                                                                           |
|                                                                                         | onChanged [required]                                                                                      | 当用户为滑动器选择了新的值时会调用                                                                       |
{:.table.table-striped}
</div>
