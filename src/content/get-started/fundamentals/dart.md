---
# title: Intro to Dart
title: Dart 入门
# description: Learn about the Dart programming language
description: 了解 Dart 编程语言
prev:
  # title: Fundamentals
  title: 基础知识 
  path: /get-started/fundamentals
next:
  title: Widgets
  path: /get-started/fundamentals/widgets
---

To get started with Flutter,
you need to have some familiarity with
the Dart programming language, which Flutter
applications are written in.
This page is a gentle introduction to Dart,
and if you're comfortable reading the
code examples, feel free to skip this page.
You do not need to be an expert in Dart to
continue with this series.

要开始使用 Flutter，
你需要对 Dart 编程语言有所了解，
因为 Flutter 应用程序就是用 Dart 编写的。
本页面是对 Dart 的简要介绍，如果你能轻松理解代码示例，可以跳过此页。
你不需要成为 Dart 专家，就可以继续后续的内容。

## Dart

Flutter applications are built in [Dart][],
a language that will look familiar
to anyone who's written Java, Javascript,
or any other C-like language.

Flutter 应用程序是用 [Dart][] 编写的，
对于曾经写过 Java、Javascript 或其他类似 C 风格语言的人来说，
这种语言应该很熟悉。

:::note

Installing Flutter also installs Dart,
so you don't need to install Dart separately.

安装 Flutter 时也会同时安装 Dart，
因此你无需单独安装 Dart。

:::

The following example is a small program that
fetches data from dart.dev,
decodes the returned json,
and prints it to the console.
If you're confident in your ability to
understand this program,
feel free to skip to the next page.

以下是一个小型示例程序，它从 dart.dev 获取数据，
解码返回的 JSON，并将其打印到控制台。
如果你感觉自己已经能够理解该程序，
那就可以跳过这一页。

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class Package {
  final String name;
  final String latestVersion;
  final String? description;

  Package(this.name, this.latestVersion, {this.description});

  @override
  String toString() {
    return 'Package{name: $name, latestVersion: $latestVersion, description: $description}';
  }
}

void main() async {
  final httpPackageUrl = Uri.https('dart.dev', '/f/packages/http.json');
  final httpPackageResponse = await http.get(httpPackageUrl);
  if (httpPackageResponse.statusCode != 200) {
    print('Failed to retrieve the http package!');
    return;
  }
  final json = jsonDecode(httpPackageResponse.body);
  final package = Package(
    json['name'],
    json['latestVersion'],
    description: json['description'],
  );
  print(package);
}
```

This program has two parts:
the `Package` class declaration, and the business logic,
which is contained in the [`main`][] function.

这个程序分为两部分：
`Package` 类的声明，以及包含业务逻辑的 [`main`][] 函数。

The `Package` class contains many of the most common
features you'll use when working with [classes in Dart][].
This class has three members,
and defines a constructor and a method.

`Package` 类包含了你在 [Dart 中使用类][classes in Dart] 时最常用的一些特性。
这个类有三个成员，并定义了一个构造函数和一个方法。

The Dart language is [type safe][]; it uses
static type checking to ensure that
a variable's value always matches the
variable's static type.
When defining a class, annotating the members with
`String` is required,
but it is often optional due to type inference.
In the `main` function in this example
there are many lines that start with `final variableName =`.
These lines are type safe,
despite not being explicitly given a type.

Dart 是 [类型安全][type safe] 的编程语言；
它使用静态类型检查来确保变量的值始终与变量的静态类型相匹配。
在定义类时，通常是必须给成员加上 `String` 类型标注，
但由于类型推断的存在，这一步变得可选了。
在这个例子的 `main` 函数里，
许多行以 `final variableName =` 开头。
尽管这些行没有显式指定类型，但它们依然是类型安全的。

Dart also has built-in [sound null safety][].
In the example, the `description` member is
declared with the type `String?`.
The `?` at the end of `String?` means that
this property can be null.
The other two members cannot be null,
and the program will not compile if
you tried to set them to `null`.
You can see this demonstrated in the constructor for
the `Package` class. It takes two required,
positional arguments and one optional, named argument.

Dart 内置了 [健全的空安全][sound null safety]。
在这个例子中，`description` 成员的类型被声明为 `String?`，
`?` 表示该属性可以为 null。
而其它两个成员则不能为 null，
如果你尝试将它们设置为 null，程序将无法编译。
你可以在 `Package` 类的构造函数中看到这一点。
该构造函数接受两个必需的位置参数和一个可选的命名参数。

Next in the example is the `main` function.
All Dart programs, including Flutter apps,
start with a `main` function.
The function showcases several basic Dart language features,
including using libraries, marking functions as async,
making function calls, using `if` statement control-flow,
and more.

接下来是 `main` 函数。
所有 Dart 程序，包括 Flutter 应用程序，
都是从 `main` 函数开始的。
该函数展示了 Dart 语言的一些基本特性，
包括使用库、标记函数为异步、调用函数、使用 `if` 语句控制流等等。

:::note 初始化的代码应该放在哪？
<!-- Where does initialization code go? -->

The main entrypoint in a starter
Flutter app is in `lib/main.dart`.
The default `main` method looks
like the following:

Flutter 应用的主入口点是在 `lib/main.dart` 中。
默认的 `main` 方法如下所示：

```dart title="lib/main.dart"
void main() {
  runApp(const MyApp());
}
```

Perform any _quick_ initialization (less than a frame or two)
_before_ calling `runApp()`,
though be aware that the widget tree hasn't been created yet.
If you want to perform initialization that takes awhile,
such as loading data from disk or over a network,
do it in a way that won't block the main UI thread.
For more information, check out [Asynchronous programming][],
the [`FutureBuilder`][] API, [Deferred components][],
or the [Working with long lists][] cookbook recipe,
as appropriate.

在调用 `runApp()` _之前_，
可以执行任何 _快速_ 的初始化（少于一两帧的时间），
但要注意，这时 widget 树还未创建。
如果你需要进行较长时间的初始化，
比如从磁盘或网络加载数据，
请确保以不会阻塞主 UI 线程的方式进行。
更多相关信息，请具体根据需要来参考 [异步编程][Asynchronous programming]、
[`FutureBuilder`][] API、[延迟加载组件][Deferred components]、
或 [处理长列表][Working with long lists] 的实用教程 (Cookbook)。

Every stateful widget has an `initState()`
method that is called when the widget is
created and added to the widget tree.
You can override this method and perform
initialization there, though the first line of
this method _must_ be `super.initState()`.

每个 stateful widget 都有一个 `initState()` 方法，
它会在 widget 创建并添加到 widget 树时调用。
你可以重写这个方法并在其中进行初始化，
但这个方法的第一行 _必须_ 是 `super.initState()`。

Finally, hot reloading your app does _not_
call `initState` or `main` again.
Hot restart calls both.

最后，需要注意，
热重载应用 _不会_ 再次调用 `initState` 或 `main`。
但热重启会调用这两者。

:::

If these features aren't familiar to you,
you can find resources to learn Dart on the
[Bootstrap into Dart][] page.

如果这些特性对你来说不太熟悉，你可以在
[Dart 语言指引][Bootstrap into Dart] 页面上找到相关资源。

## Next: Widgets

## 下一步：Widget

This page is an introduction to Dart,
and helps you become familiar with reading
Flutter and Dart code. It's okay if you don't
feel clear on all the code on this page,
as long as you feel comfortable with the _syntax_
of the Dart language.
In the next section, you'll learn about the
building block of Flutter apps: widgets.

本页面介绍了 Dart，
并帮助你熟悉阅读 Flutter 和 Dart 代码。
如果你对本页的所有代码不太清楚也没关系，
重要的是你能对 Dart 语言的 _语法_ 感到熟悉。
在下一部分，你将学习 Flutter 应用程序的构建模块：widget。

[Asynchronous programming]: {{site.dart-site}}/libraries/async/async-await
[Dart]: {{site.dart-site}}
[Deferred components]: /perf/deferred-components
[`main`]: {{site.dart-site}}/language#hello-world
[classes in Dart]: {{site.dart-site}}/language/classes
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[type safe]: {{site.dart-site}}/language/type-system
[sound null safety]: {{site.dart-site}}/null-safety
[Working with long lists]: /cookbook/lists/long-lists
[Bootstrap into Dart]: /resources/bootstrap-into-dart

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

由于本网站的此部分正在不断发展，
我们 [欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="dart"
