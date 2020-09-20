---
title: Hot reload
title: 热重载 (Hot reload)
description: Speed up development using Flutter's hot reload feature.
description: 使用热重载提高你的开发速度和体验。
tags: SDK,Flutter SDK
keywords: 热重载,效率提升,widget渲染
---

Flutter's hot reload feature helps you quickly and
easily experiment, build UIs, add features, and fix bugs.
Hot reload works by injecting updated source code files into
the running [Dart Virtual Machine (VM)][]. After the VM
updates classes with the new versions of fields and functions,
the Flutter framework automatically rebuilds the widget tree,
allowing you to quickly view the effects of your changes.

Flutter 的热重载功能可帮助您在无需重新启动应用程序的情况下
快速、轻松地测试、构建用户界面、添加功能以及修复错误。
通过将更新的源代码文件注入到正在运行的 
[Dart 虚拟机（VM）][Dart Virtual Machine (VM)] 来实现热重载。
在虚拟机使用新的字段和函数更新类之后，
Flutter 框架会自动重新构建 widget 树，以便您可以快速查看更改的效果。

## How to perform a hot reload

## 如何热重载：

To hot reload a Flutter app:

热重载 Flutter 应用：

 1. Run the app from a supported [Flutter editor][]
    or a terminal window.
    Either a physical or virtual device can be the target.
    **Only Flutter apps in debug mode can be hot reloaded.**
    
    在支持 [Flutter 编辑器][Flutter editor] 
    或终端窗口运行应用程序，物理机或虚拟器都可以。
    **Flutter 应用程序只有在调试模式下才能被热重载。**
    
1.  Modify one of the Dart files in your project.
    Most types of code changes can be hot reloaded;
    for a list of changes that require a hot restart, see
    [Special cases](#special-cases).
    
    修改项目中的一个Dart文件。
    大多数类型的代码更改可以热重载；
    一些需要重新启动应用程序的更改列表，
    请参阅 [特别情况](#limitations)。
    
 1. If you're working in an IDE/editor that supports Flutter's IDE tools,
    select **Save All** (`cmd-s`/`ctrl-s`), or click the hot reload
    button on the toolbar.
    
    如果您在支持 Flutter IDE 工具的 IDE /编辑器中工作，
    请选择 **Save All** (`cmd-s`/`ctrl-s`)，或单击工具栏上的 Hot Reload 按钮。

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

The app updates to reflect your change,
and the current state of the app is preserved.
Your app continues to execute from where it was prior to running
the hot reload command. The code updates and execution continues.

应用程序更新以反映您的更改，并且应用程序的当前状态将保留。
您的应用程序将继续从之前运行热重载命令的位置开始执行。代码被更新并继续执行。

{{site.alert.secondary}}
  **What is the difference between hot reload, hot restart,
  and full restart?**<br>

  * **Hot reload** loads code changes into the VM and re-builds
    the widget tree, preserving the app state;
    it doesn’t rerun `main()` or `initState()`.
    (`⌘\` in Intellij and Android Studio, `⌃F5` in VSCode)
  * **Hot restart** loads code changes into the VM,
    and restarts the Flutter app, losing the app state.
    (`⇧⌘\` in IntelliJ and Android Studio, `⇧⌘F5` in VSCode)
  * **Full restart** restarts the iOS, Android, or web app.
    This takes longer because it also recompiles the
    Java / Kotlin / ObjC / Swift code. On the web,
    it also restarts the Dart Development Compiler.
    There is no specific keyboard shortcut for this;
    you need to stop and start the run configuration.

  Flutter web currently supports hot restart but not
  hot reload.
{{site.alert.end}}

![Android Studio UI]({% asset development/tools/android-studio-run-controls.png @path %}){:width="550px"}<br>
Controls for run, run debug, hot reload, and hot restart in Android Studio

A code change has a visible effect only if the modified
Dart code is run again after the change. Specifically,
a hot reload causes all of the existing widgets to rebuild.
Only code involved in the rebuilding of the widgets is
automatically re-executed. The `main()` and `initState()`
functions, for example, are not run again.

只有修改后的 Dart 代码再次运行时，代码更改才会产生可见效果。
具体来说，热重载会导致所有现有的 widgets 重新构建。
只有与 widgets 重新构建相关的代码才会自动重新执行。
`main()` and `initState()` 方法则不会再次运行。

## Special cases

## 特别情况

The next sections describe specific scenarios that involve
hot reload. In some cases, small changes to the Dart code
enable you to continue using hot reload for your app.
In other cases, a hot restart, or a full restart is
needed.

下面的部分会描述一些热重载的特别的情况。
在某些情况下，对 Dart 代码的小改动将确保您能够继续使用热重载。
在其他情况下，需要热重启或完全重启。

### An app is killed

### 应用被杀死

Hot reload can break when the app is killed.
For example, if the app was in the background for
too long.

热重载会在应用被杀死之后断掉。
比如一直在后台运行的应用（会被系统杀死）。

### Compilation errors

## 编译错误

When a code change introduces a compilation error,
hot reload generates an error message similar to:

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

In this situation, simply correct the errors on the
specified lines of Dart code to keep using hot reload.

在这种情况下，只需更正上述代码的错误，即可以继续使用热重载。

### CupertinoTabView's builder

Hot reload won't apply changes made to a `builder`
of a `CupertinoTabView`. For more information, see
[Issue 43574][].

### Enumerated types

Hot reload doesn't work when enumerated types are
changed to regular classes or regular classes are
changed to enumerated types.

For example:

Before the change:
<!-- skip -->
```dart
enum Color {
  red,
  green,
  blue
}
```

After the change:
<!-- skip -->
```dart
class Color {
  Color(this.i, this.j);
  final int i;
  final int j;
}
```

### Changing fonts

### 字体修改

Hot reload supports changing assets, for the most part.
However, if you change fonts, you'll need to hot restart.

### Generic types

Hot reload won't work when generic type declarations
are modified.  For example, the following won't work:

Before the change:
<!-- skip -->
```dart
class A<T> {
  T i;
}
```

After the change:
<!-- skip -->
```dart
class A<T, V> {
  T i;
  V v;
}
```

### Native code

If you've changed native code (such as Kotlin, Java, Swift,
or Objective-C), you must perform a full restart (stop and
restart the app) to see the changes take effect.

### Previous state is combined with new code

Flutter's stateful hot reload preserves the state of your app.
This approach enables you to view the effect of the most
recent change only, without throwing away the current state.
For example, if your app requires a user to log in,
you can modify and hot reload a page several levels down in
the navigation hierarchy, without re-entering your login credentials.
State is kept, which is usually the desired behavior.

If code changes affect the state of your app (or its dependencies),
the data your app has to work with might not be fully consistent with
the data it would have if it executed from scratch.
The result might be different behavior after hot reload
versus a hot restart.

{{site.alert.note}}
  As of Flutter 1.17, you can switch a widget
  from a `StatefulWidget` to a `StatelessWidget`
  (or the reverse), without requiring a hot restart.
{{site.alert.end}}

### Recent code change is included but app state is excluded

## 代码发生更改但应用程序的状态没有改变

In Dart, [static fields are lazily initialized][const-new].
This means that the first time you run a Flutter app and a
static field is read, it is set to whatever value its
initializer was evaluated to.
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

After running the app, you make the following change:

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

You hot reload, but the change is not reflected.

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

Running the app for the first time prints `1` and `1`.
Then, you make the following change:

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

While changes to `const` field values are always hot reloaded,
the static field initializer is not rerun. Conceptually,
`const` fields are treated like aliases instead of state.

热重载后，现在打印出 `2`和 `1`。虽然对 const 定义的字段值的更改始终会重新加载，
但不会重新运行静态字段的初始化语句。
从概念上讲，const 字段被视为别名而不是状态。

The Dart VM detects initializer changes and flags when a set
of changes needs a hot restart to take effect.
The flagging mechanism is triggered for
most of the initialization work in the above example,
but not for cases like the following:

Dart VM 在一组更改需要完全重启才能生效时，会检测初始化程序更改和标志。
在上面的示例中，大部分初始化工作都会触发标记机制，但不适用于以下情况：



<!-- skip -->
```dart
final bar = foo;
```

To update `foo` and view the change after hot reload,
consider redefining the field as `const` or using a getter to
return the value, rather than using `final`.
For example, either of the following solutions work:

为了能够更改 `foo` 并在热重载后查看更改，
应该将字段重新用 const 定义或使用 getter 来返回值，而不是使用 final。
例如下面的解决方案应该都可以使用：

<!-- skip -->
```dart
const bar = foo;
```

or:

或者：

<!-- skip -->
```dart
const bar = foo;    // Convert foo to a const...
get bar => foo;     // ...or provide a getter.
```

For more information, read about the [differences
between the `const` and `final` keywords][const-new] in Dart.

了解更多 Dart 中关于 [const 和 final 关键字的区别][const-new].

### Recent UI change is excluded

## 用户界面没有改变

Even when a hot reload operation appears successful and generates no
exceptions, some code changes might not be visible in the refreshed UI.
This behavior is common after changes to the app's `main()` or
`initState()` methods.

即使热重载操作看起来成功了并且没有抛出异常，
但某些代码更改可能在更新的 UI 中不可见。
这种行为在更改应用程序的 `main()` 方法后很常见。

As a general rule, if the modified code is downstream of the root
widget's `build()` method, then hot reload behaves as expected.
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

After running this app, change the code as follows:

运行应用程序后，你可能会像如下示例更改代码:

```dart
import 'package:flutter/widgets.dart';

void main() {
  runApp(const Center(
      child: const Text('Hello', textDirection: TextDirection.ltr)));
}
```

With a hot restart, the program starts from the beginning,
executes the new version of `main()`,
and builds a widget tree that displays the text `Hello`.

完全重启后，程序会从头开始执行新的 `main()` 方法，并构建一个 widget 树来显示文本 `Hello`。

However, if you hot reload the app after this change,
`main()` and `initState()` are not re-executed,
and the widget tree is rebuilt with the unchanged instance
of `MyApp` as the root widget.
This results in no visible change after hot reload.

但是，如果您在更改后是通过热重载运行，`main()` 方法则不会重新执行，
并且会使用未修改的 `MyApp` 实例作为根 widget 树来构建新的 widget 树，
热重载后结果没有变化。

## How it works

## 如何实现

When hot reload is invoked, the host machine looks
at the edited code since the last compilation.
The following libraries are recompiled:

调用热重载时，主机会查看自上次编译以来编辑的代码。重新编译以下文件：

* Any libraries with changed code
 
  任何有代码更改的文件；

* The application's main library

  应用程序的主入口文件。 

* The libraries from the main library leading
  to affected libraries

  受主入口文件影响的文件。

The source code from those libraries is compiled into
[kernel files][] and sent to the mobile device's Dart VM.

这些库中的源代码被编译为 [内核文件][kernel files]，
并发送到移动设备的 Dart VM 中。

The Dart VM re-loads all libraries from the new kernel file.
So far no code is re-executed.

Dart VM 重新加载新内核文件中的所有文件。到目前为止，没有重新执行代码。

The hot reload mechanism then causes the Flutter framework
to trigger a rebuild/re-layout/repaint of all existing
widgets and render objects.

然后，热重载机制使 Flutter 框架触发所有现有的
widget 和渲染对象的重建/重新布局/重绘。

[static fields are lazily initialized]: {{site.news}}/2012/02/static-variables-no-longer-have-to-be.html
[静态字段会被惰性初始化]: {{site.news}}/2012/02/static-variables-no-longer-have-to-be.html
[const-new]: {{site.news}}/2012/02/static-variables-no-longer-have-to-be.html
[Dart Virtual Machine (VM)]: https://dart.dev/platforms
[Flutter editor]: /docs/get-started/editor
[Issue 43574]: {{site.github}}/flutter/flutter/issues/43574
[kernel files]: {{site.github}}/dart-lang/sdk/tree/master/pkg/kernel
