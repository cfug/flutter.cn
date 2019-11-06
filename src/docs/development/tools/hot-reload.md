---
title: Hot reload
title: 热重载 (Hot reload)
description: Speed up development using Flutter's hot reload feature.
description: 使用热重载提高你的开发速度和体验。
---

Flutter's hot reload feature helps you quickly and easily experiment,
build UIs, add features, and fix bugs.
Hot reload works by injecting updated source code files into
the running [Dart Virtual Machine (VM)](https://dart.cn/platforms).
After the VM updates classes with the new versions of fields and functions,
the Flutter framework automatically rebuilds the widget tree,
allowing you to quickly view the effects of your changes.

Flutter 的热重载功能可帮助您在无需重新启动应用程序的情况下快速、轻松地测试、构建用户界面、添加功能以及修复错误。
通过将更新的源代码文件注入到正在运行的 [Dart 虚拟机（VM）](https://dart.cn/platforms)来实现热重载。在虚拟机使用新的字段和函数更新类之后，
Flutter 框架会自动重新构建 widget 树，以便您可以快速查看更改的效果。

To hot reload a Flutter app:

要热重载 Flutter 应用程序：

 1. Run the app from a supported [Flutter editor](/docs/get-started/editor)
    or a terminal window.
    Either a physical or virtual device can be the target.
    **Only Flutter apps in debug mode can be hot reloaded.**
    
    在支持 [Flutter 编辑器](/docs/get-started/editor) 
    或终端窗口运行应用程序，物理机或虚拟器都可以。
    **Flutter 应用程序只有在调试模式下才能被热重载。**
    
1.  Modify one of the Dart files in your project.
    Most types of code changes can be hot reloaded;
    for a list of changes that require a hot restart, see
    [Limitations](#limitations).
    
    修改项目中的一个Dart文件。
    大多数类型的代码更改可以热重载；
    一些需要重新启动应用程序的更改列表，请参阅 [限制](#limitations)。
    
 1. If you're working in an IDE/editor that supports Flutter's IDE tools,
    select **Save All** (`cmd-s`/`ctrl-s`), or click the Hot Reload
    button on the toolbar: 
    
    如果您在支持 Flutter IDE 工具的 IDE /编辑器中工作，
    请选择 **Save All** (`cmd-s`/`ctrl-s`)，或单击工具栏上的 Hot Reload 按钮。

    ![Hot reload]({% asset tools/android-studio/hot-reload.gif @path %}){:width="735px"}

    If you're running the app at the command line using `flutter run`,
    enter `r` in the terminal window.
    
    如果您正在使用命令行 `flutter run` 运行应用程序，请在终端窗口输入 `r`。

After a successful hot reload operation,
you'll see a message in the console similar to:

成功执行热重载后，您将在控制台中看到类似于以下内容的消息：

```
Performing hot reload...
Reloaded 1 of 448 libraries in 978ms.
```
The app updates to reflect your change, and the current state of the
app&mdash;the value of the counter variable in the above example&mdash;is
preserved. Your app continues to execute from where it was prior to running
the hot reload command. The code updates and execution continues.

应用程序更新以反映您的更改，并且应用程序的当前状态（上面示例中的计数器变量的值）将保留。
您的应用程序将继续从之前运行热重载命令的位置开始执行。代码被更新并继续执行。

A code change has a visible effect only if the modified Dart code is run again
after the change. Specifically, a hot reload causes all the existing widgets to
rebuild. Only code involved in the rebuilding of the widgets are automatically
re-executed.

只有修改后的 Dart 代码再次运行时，代码更改才会产生可见效果。
具体来说，热重载会导致所有现有的 widgets 重新构建。只有与 widgets 重新构建相关的代码才会自动重新执行。

The next sections describe common situations where the
modified code _won't_ run again after hot reload. In some cases,
small changes to the Dart code enable you to continue using hot
reload for your app.

接下来的部分将介绍修改后的代码在热重载后不会再次运行的常见情况。
在某些情况下，对 Dart 代码的小改动将确保您能够继续使用热重载。

## Compilation errors

## 编译错误

When a code change introduces a compilation error,
hot reload always generates an error message similar to:

当代码更改导致编译错误时，热重载会生成类似于以下内容的错误消息：

```nocode
Hot reload was rejected:
'/Users/obiwan/Library/Developer/CoreSimulator/Devices/AC94F0FF-16F7-46C8-B4BF-218B73C547AC/data/Containers/Data/Application/4F72B076-42AD-44A4-A7CF-57D9F93E895E/tmp/ios_testWIDYdS/ios_test/lib/main.dart': warning: line 16 pos 38: unbalanced '{' opens here
  Widget build(BuildContext context) {
                                     ^
'/Users/obiwan/Library/Developer/CoreSimulator/Devices/AC94F0FF-16F7-46C8-B4BF-218B73C547AC/data/Containers/Data/Application/4F72B076-42AD-44A4-A7CF-57D9F93E895E/tmp/ios_testWIDYdS/ios_test/lib/main.dart': error: line 33 pos 5: unbalanced ')'
    );
    ^
```

In this situation, simply correct the errors on the specified lines of
Dart code to keep using hot reload.

在这种情况下，只需更正上述代码的错误，即可以继续使用热重载。

## Previous state is combined with new code

## 先前的状态与新代码并存

Flutter's Stateful Hot Reload preserves the state of your app.
This design enables you to view the effect of the most recent change only,
without throwing away the current state. For example, if your app requires a
user to log in, you can modify and hot reload a page several levels down in
the navigation hierarchy, without re-entering your login credentials.
State is kept, which is usually the desired behavior.

Flutter 的热重载功能（有时称为 有状态热重载 ）可保留您的应用程序的状态。
这种设计允许您能查看最近更改的效果，并且不会丢弃当前状态。 
例如，如果您的应用需要用户登录，您可以在导航层次结构中下几个级别修改并重新加载页面，
而无需重新输入登录凭据。状态保持不变，这通常是期望的行为。

If code changes affect the state of your app (or its dependencies),
the data your app has to work with might not be fully consistent with
the data it would have if it executed from scratch. The result might be
different behavior after hot reload versus a hot restart.

如果代码更改会影响应用程序（或其依赖项）的状态，则应用程序使用的数据可能与它从头开始执行的数据不完全一致。
在热重载和完全重启之后，结果可能是不同的行为。

For example, if you modify a class definition from extending StatelessWidget
to StatefulWidget (or the reverse), after hot reload the previous state of
your app is preserved. However, the state might not be compatible with the
new changes.

例如，如果您将某个类的定义从 StatelessWidget 改为 StatefulWidget（或反向更改），则在热重载之后，应用程序的以前状态将保留。
但是，该状态可能与新的更改不兼容。
 
Consider the following code:

参考以下代码：

```dart
class MyWidget extends StatelessWidget {
  Widget build(BuildContext context) {
    return GestureDetector(onTap: () => print('T'));
  }
}
```

After running the app, if you make the following change:

运行应用程序后，如果进行以下更改:

<!-- skip -->
```dart
class MyWidget extends StatefulWidget {
  @override
  State<MyWidget> createState() => MyWidgetState();
}

class MyWidgetState extends State<MyWidget> { /*...*/ }
```

Then hot reload; the console displays an assertion failure similar to:

热重载后；控制台将显示类似于以下内容的断言失败的信息:

```nocode
MyWidget is not a subtype of StatelessWidget
```

In these situations, a hot restart is required to see the updated app.

在这些情况下，需要完全重新启动才可以查看更新后的应用程序.

## Recent code change is included but app state is excluded

## 代码发生更改但应用程序的状态没有改变

In Dart, [static fields are lazily initialized][const-new].
This means that the first time you run a Flutter app and a static
field is read, it is set to whatever value its initializer was evaluated to.
Global variables and static fields are treated as state,
and are therefore not reinitialized during hot reload.

在 Dart 中，[静态字段会被惰性初始化][const-new]。 这意味着第一次运行 Flutter 应用程序并读取静态字段时，
会将静态字段的值设为其初始表达式的结果。全局变量和静态字段都被视为状态，因此在热重载期间不会重新初始化。

If you change initializers of global variables and static fields,
a full restart is necessary to see the changes.
For example, consider the following code:

如果更改全局变量和静态字段的初始化语句，则需要完全重启以查看更改。
例如，参考以下代码：

<!-- skip -->
```dart
final sampleTable = [
  Table("T1"),
  Table("T2"),
  Table("T3"),
  Table("T4"),
];
```

After running the app, if you make the following change:

运行应用程序后，如果进行以下更改:

<!-- skip -->
```dart
final sampleTable = [
  Table("T1"),
  Table("T2"),
  Table("T3"),
  Table("T10"),    // modified
];
```

and then hot reload, the change is not reflected.

热重载后，这个改变并没有产生效果。

Conversely, in the following example:

相反，在下面示例中：

<!-- skip -->
```dart
const foo = 1;
final bar = foo;
void onClick() {
  print(foo);
  print(bar);
}
```

running the app for the first time prints `1` and `1`. Then, if you make the
following change:

第一次运行应用程序会打印 `1` 和 `1`。然后，如果您进行以下更改：

<!-- skip -->
```dart
const foo = 2;    // modified
final bar = foo;
void onClick() {
  print(foo);
  print(bar);
}
```


While changes to `const` field values
are always hot reloaded, the static field initializer is not rerun.
Conceptually, `const` fields are treated like aliases instead of state.

热重载后，现在打印出 `2`和 `1`。虽然对 const 定义的字段值的更改始终会重新加载，但不会重新运行静态字段的初始化语句。
从概念上讲，const 字段被视为别名而不是状态。

The Dart VM detects initializer changes and flags when a set of changes needs a
hot restart to take effect. The flagging mechanism is triggered for
most of the initialization work in the above example,
but not for cases like:

Dart VM 在一组更改需要完全重启才能生效时，会检测初始化程序更改和标志。
在上面的示例中，大部分初始化工作都会触发标记机制，但不适用于以下情况：



<!-- skip -->
```dart
final bar = foo;
```

To be able to update `foo` and view the change after hot reload,
consider redefining the field as `const` or using a getter to
return the value, rather than using `final`. For example:

为了能够更改 `foo` 并在热重载后查看更改，应该将字段重新用 const 定义或使用 getter 来返回值，而不是使用 final。例如：

<!-- skip -->
```dart
const bar = foo;
```

or:

或者：

<!-- skip -->
```dart
get bar => foo;
```

Read more about the [differences between the `const` and `final`
keywords][const-new] in Dart.

了解更多 Dart 中关于 [const 和 final 关键字的区别]({{site.news}}/2012/06/const-static-final-oh-my.html).

## Recent UI change is excluded

## 用户界面没有改变

Even when a hot reload operation appears successful and generates no
exceptions, some code changes might not be visible in the refreshed UI.
This behavior is common after changes to the app's `main()` method.

即使热重载操作看起来成功了并且没有抛出异常，但某些代码更改可能在更新的 UI 中不可见。
这种行为在更改应用程序的 `main()` 方法后很常见。

As a general rule, if the modified code is downstream of the root
widget's build method, then hot reload behaves as expected.
However, if the modified code won't be re-executed as a result
of rebuilding the widget tree, then you won't
see its effects after hot reload.

作为一般规则，如果修改后的代码位于根 widget 的构建方法的下游，
则热重载将按预期运行。但是，如果修改后的代码不会因重新构建 widget
树而重新执行的话，那么在热重载后您将看不到它的效果。

For example, consider the following code:

例如，参考以下代码：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return GestureDetector(onTap: () => print('tapped'));
  }
}
```

After running this app, you might change the code as follows:

运行应用程序后，你可能会像如下示例更改代码:

```dart
import 'package:flutter/widgets.dart';

void main() {
  runApp(const Center(
      child: const Text('Hello', textDirection: TextDirection.ltr)));
}
```

With a hot restart, the program starts from the beginning, executes the new
version of `main()`, and builds a widget tree that displays the text `Hello`.

完全重启后，程序会从头开始执行新的 `main()` 方法，并构建一个 widget 树来显示文本 `Hello`。

However, if you hot reload the app after this change, `main()` is not
re-executed, and the widget tree is rebuilt with the unchanged instance of
`MyApp` as the root widget. The result is no visible change after hot reload.

但是，如果您在更改后是通过热重载运行，`main()` 方法则不会重新执行，
并且会使用未修改的 `MyApp` 实例作为根 widget 树来构建新的 widget 树，热重载后结果没有变化。

但是，如果您在此更改后热重新加载应用程序，main()则不会重新执行，
并且使用未更改的实例MyApp作为根小部件重建窗口小部件树 。热重载后结果没有明显变化。

## Limitations

## 限制

You might also encounter the rare cases where hot reload is not
supported at all. These include:

您可能还会遇到极少数根本不支持热重载的情况。这些包括：

* Changes on `initState()` are not reflected by hot reload.
  A hot restart is required.

  更改 `initState()` 方法，热重载后不会产生效果，需要重新启动。

* Enumerated types are changed to regular classes or regular
  classes are changed to enumerated types. For example, if you change:

  枚举类型更改为常规类或常规类更改为枚举类型。例如，如果您更改:

  <!-- skip -->
  ```dart
  enum Color {
    red,
    green,
    blue
  }
  ```

  to:
  
  改为:

  <!-- skip -->
  ```dart
  class Color {
    Color(this.i, this.j);
    final int i;
    final int j;
    }
  ```

* Generic type declarations are modified. For example, if you change:
  
  泛型类声明被修改。例如，如果您更改:

  <!-- skip -->
  ```dart
  class A<T> {
    T i;
  }
  ```

  to:
  
  改为:

  <!-- skip -->
  ```dart
  class A<T, V> {
    T i;
    V v;
  }
  ```

In these situations,
hot reload generates a diagnostic message and fails without
committing any changes.

在这些情况下，热重载会生成诊断消息，并会失败，也不会提交任何改变。

## How it works

## 如何实现

When hot reload is invoked, the host machine looks at the edited
code since the last compilation. The following libraries are recompiled:

调用热重载时，主机会查看自上次编译以来编辑的代码。重新编译以下文件：

* Any libraries with changed code
 
  任何有代码更改的文件；

* The application's main library

  应用程序的主入口文件。 

* The libraries from the main library leading to affected libraries

  受主入口文件影响的文件。

In Dart 2, those libraries' Dart source code are turned into
[kernel files]({{site.github}}/dart-lang/sdk/tree/master/pkg/kernel)
and sent to the mobile device's Dart VM.

在 Dart 2 中，这些文件的 Dart 源代码被转换为 [内核文件]({{site.github}}/dart-lang/sdk/tree/master/pkg/kernel)
并发送到移动设备的 Dart VM。

The Dart VM re-loads all libraries from the new kernel file.
So far no code is re-executed.

Dart VM 重新加载新内核文件中的所有文件。到目前为止，没有重新执行代码。

The hot reload mechanism then causes the Flutter framework to trigger a
rebuild/re-layout/repaint of all existing widgets and render objects.

然后，热重载机制使 Flutter 框架触发所有现有的 widgets 和渲染对象的重建/重新布局/重绘。

[static fields are lazily initialized]: {{site.news}}/2012/02/static-variables-no-longer-have-to-be.html
[静态字段会被惰性初始化]: {{site.news}}/2012/02/static-variables-no-longer-have-to-be.html
[const-new]: {{site.news}}/2012/02/static-variables-no-longer-have-to-be.html
