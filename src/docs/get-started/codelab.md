---
title: Write your first Flutter app, part 1
title: 编写第一个 Flutter 应用
short-title: Write your first app
short-title: 编写第一个 Flutter 应用
prev:
  title: Test drive
  title: 开发体验初探
  path: /docs/get-started/test-drive
next:
  title: Learn more
  title: 了解更多
  path: /docs/get-started/learn-more
diff2html: true
---

{% assign code-url = 'https://raw.githubusercontent.com/flutter/codelabs/master' -%}

{% asset get-started/startup-namer-part-1 alt="The app that you'll be building" class='site-image-right' %}

{%- comment %}
  Code highlights in this page are green, to match diff additions.
{% endcomment -%}
<style>pre .highlight { background-color: #dfd; }</style>

This is a guide to creating your first Flutter app. If you
are familiar with object-oriented code and basic programming
concepts such as variables, loops, and conditionals,
you can complete this tutorial. You don’t need
previous experience with Dart, mobile, or web programming.

这是一个指引你完成第一个 Flutter 应用的手把手操作教程（我们也称之为是 codelab）。
我们将会着手创建一个简单的 Flutter 应用，无需 Dart 语言、
移动开发语言或 Web 开发经验，
只需你具备面向对象语言开发基础即可（如变量，循环和条件语句）。

This guide is part 1 of a two-part codelab. You can find
[part 2]({{site.codelabs}}/codelabs/first-flutter-app-pt2)
on [Google Developers]({{site.codelabs}}).
[Part 1]({{site.codelabs}}/codelabs/first-flutter-app-pt1)
can also be found on [Google Developers]({{site.codelabs}}).

完整的教程分为两部分，本页面是第一部分的内容，
你可以在这里查看 [第二部分](https://codelabs.flutter-io.cn/codelabs/first-flutter-app-pt2-cn/index.html#0) 的内容。

## What you'll build in part 1
{:.no_toc}

## 第一部分的内容概览
{:.no_toc}

You’ll implement a simple mobile app that generates proposed
names for a startup company. The user can select and unselect names,
saving the best ones. The code lazily generates names.
As the user scrolls, more names are generated.
There is no limit to how far a user can scroll.

你将完成一个简单的移动应用程序，功能是：为一个创业公司生成建议的公司名称。
用户可以选择和取消选择的名称、保存喜欢的名称。
该代码一次生成十个名称，当用户滚动时，会生成一新批名称。

The animated GIF shows how the app works at the completion of part 1.

页面上方的这个 GIF 可以引导你预览本 codelab 做完之后的应用效果图。

{{site.alert.secondary}}

  <h4 class="no_toc">What you’ll learn in part 1</h4>

  <h4 class="no_toc">第一部分，我们将共同构建：</h4>

  * How to write a Flutter app that looks natural on iOS, Android,
    and the web.
  
    Flutter 如何在 Android、iOS 和 Web 里自动适应不同的 UI 体系

  * Basic structure of a Flutter app.

    Flutter 工程/项目的基本结构
  
  * Finding and using packages to extend functionality.
 
    查找和使用 packages 来扩展功能

  * Using hot reload for a quicker development cycle.
   
    使用热重载 (hot reload) 加快开发周期

  * How to implement a stateful widget.
  
    如何实现有状态的 widget

  * How to create an infinite, lazily loaded list.

    如何创建一个无限的、延迟加载的列表

  In [part 2]({{site.codelabs}}/codelabs/first-flutter-app-pt2)
  of this codelab, you'll add interactivity, modify the app's theme,
  and add the ability to navigate to a new screen
  (called a _route_ in Flutter).
  
  在本 codelab 的 [第二部分](https://codelabs.flutter-io.cn/codelabs/first-flutter-app-pt2-cn/index.html#0)，
  你还将学到添加交互，
  修改应用的主题，
  以及为应用添加一个新的页面（在 Flutter，我们称之为 route）。
  
{{site.alert.end}}

{{site.alert.secondary}}

  <h4 class="no_toc">What you'll use</h4>

  <h4 class="no_toc">所需工具</h4>
  
  You need two pieces of software to complete this lab: the
  [Flutter SDK](/docs/get-started/install) and [an editor](/docs/get-started/editor).
  This codelab assumes Android Studio, but you can use your preferred
  editor.
  
  你需要安装两部分内容来完成本次实验：[Flutter SDK 安装](/docs/get-started/install) 和 [编辑器 (editor)](/docs/get-started/editor) 设置。
  本 codelab 里，我们以 macOS 环境下的 Android Studio 以做演示，
  但你可以选用更顺手的配置。

  You can run this codelab using any of the following devices:
  
  你可以通过如下任何设备完成本 codelab：

  * A physical device ([Android](install/macos#set-up-your-android-device)
    or [iOS](install/macos#deploy-to-ios-devices)) connected to your
    computer and set to developer mode.
    
    开启开发者模式 (developer mode) 的 [Android](install/macos#set-up-your-android-device) 和 / 或 [iOS](install/macos#deploy-to-ios-devices) 真机；

  * The [iOS simulator](install/macos#set-up-the-ios-simulator).
    
    [iOS 模拟器](install/macos#set-up-the-ios-simulator)；
  
  * The [Android emulator](install/macos#set-up-the-android-emulator).
    
    [Android 模拟器](install/macos#set-up-the-android-emulator)。
 
  * A browser (currently Chrome is preferred).

    浏览器（目前最好可以是 Chrome 浏览器）
    
{{site.alert.end}}

## Step 1: Create the starter Flutter app

## 第一步：创建初始化工程

<?code-excerpt path-base="codelabs/startup_namer/step1_base"?>

Create a simple, templated Flutter app, using the instructions in
[Getting Started with your first Flutter
app.](/docs/get-started/test-drive#create-app)
Name the project **startup_namer** (instead of _myapp_).

按照 [这个指南](/docs/get-started/test-drive#create-app) 中所描述的步骤，
创建一个简单的、基于模板的 Flutter 工程，然后将项目命名为 startup_namer (而不是 myapp)，
接下来你将会修改这个工程来完成最终的 App。

{{site.alert.tip}}

  If you don't see "New Flutter Project" as an option in your IDE, make
  sure you have the [plugins installed for Flutter and
  Dart](/docs/get-started/editor).
  
  如果你没有在你的集成开发环境（IDE）里看到"New Flutter Project"（新建一个 Flutter 工程），
  请按照本文档完成 [Dart 和 Flutter 插件的安装](/docs/get-started/editor)。
  
{{site.alert.end}}

In this codelab, you'll mostly be editing **lib/main.dart**,
where the Dart code lives.

在这个示例中，你将主要编辑 Dart 代码所在的 **lib/main.dart** 文件,

 1. Replace the contents of `lib/main.dart`.<br>
    Delete all of the code from **lib/main.dart**.
    Replace with the following code, which displays "Hello World" in the center
    of the screen.
    
    替换 lib/main.dart <br>
    删除 lib/main.dart 中的所有代码，然后替换为下面的代码，它将在屏幕的中心显示"Hello World"。


    <?code-excerpt "lib/main.dart" title?>
    ```dart
    // Copyright 2018 The Flutter team. All rights reserved.
    // Use of this source code is governed by a BSD-style license that can be
    // found in the LICENSE file.

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
              child: Text('Hello World'),
            ),
          ),
        );
      }
    }
    ```

    {{site.alert.tip}}
    
      When pasting code into your app, indentation can become skewed.
      You can fix this automatically with the Flutter tools:
      
      在向你的工程项目中粘贴代码的时候，缩进可能会变形。
      你可以使用 Flutter 工具自动修复此问题：

      * Android Studio / IntelliJ IDEA: Right-click the code and
        select **Reformat Code with dartfmt**.
        
        Android Studio / IntelliJ IDEA: 右键单击Dart代码，然后选择 **Reformat Code with dartfmt**
        
      * VS Code: Right-click and select **Format Document**.
      
        VS Code: 右键单击并选择 Format Document.、

      * Terminal: Run `flutter format <filename>`.
        
        Terminal: 运行 `flutter format <filename>`

    {{site.alert.end}}

 2. Run the app [in the way your IDE describes](/docs/get-started/test-drive).
    You should see either Android or iOS output, depending on your device.

    [运行](/docs/get-started/test-drive#androidstudio) 你的工程项目，
    根据不同的操作系统，你会看到如下运行结果界面：

    {% indent %}
      {% include android-ios-figure-pair.md image="hello-world.png" alt="Hello world app" %}
    {% endindent %}

    {{site.alert.tip}}
    
      The first time you run on a physical device, it can take awhile to load.
      After this, you can use hot reload for quick updates. **Save** also
      performs a hot reload if the app is running.
      
      第一次真机运行的时候可能会需要更多的等待时间，但是这是值得的，
      因为接下来你就可以使用热重载（hot reload）功能，真正的为下次运行时更新的预览**节省**更多时间。
      
    {{site.alert.end}}

### Observations
{:.no_toc}

### 观察和分析
{:.no_toc}

* This example creates a Material app.
  [Material]({{site.material}}/guidelines) is a visual design language
  that is standard on mobile and the web. Flutter offers a rich set
  of Material widgets.

  本示例创建了一个具有 Material Design 风格的应用，
  [Material]({{site.material}}/guidelines) 是一种移动端和网页端通用的视觉设计语言，
  Flutter 提供了丰富的 Material 风格的 widgets。
  
* The `main()` method uses arrow (`=>`) notation.
  Use arrow notation for one-line functions or methods.

  主函数（main）使用了 (`=>`) 符号，这是 Dart 中单行函数或方法的简写。


* The app extends `StatelessWidget` which makes the app itself a
  widget. In Flutter, almost everything is a widget, including
  alignment, padding, and layout.
  
  该应用程序继承了 `StatelessWidget`，这将会使应用本身也成为一个 widget。
  在 Flutter 中，几乎所有都是 widget，
  包括对齐 (alignment)、填充 (padding) 和布局 (layout)。


* The `Scaffold` widget, from the Material library,
  provides a default app bar, title, and a body property that
  holds the widget tree for the home screen. The widget subtree
  can be quite complex.

  `Scaffold` 是 Material 库中提供的一个 widget，
  它提供了默认的导航栏、标题和包含主屏幕 widget 树的 body 属性。
  widget 树可以很复杂。


* A widget’s main job is to provide a `build()` method
  that describes how to display the widget in terms of other,
  lower level widgets.

  一个 widget 的主要工作是提供一个 `build()` 方法来描述如何根据其他较低级别的 widgets 来显示自己。


* The body for this example consists of a `Center` widget containing
  a `Text` child widget. The Center widget aligns its widget subtree
  to the center of the screen.

  本示例中的 body 的 widget 树中包含了一个 `Center` widget，
  Center widget 又包含一个 `Text` 子 widget，
  Center widget 可以将其子 widget 树对齐到屏幕中心。

  
## Step 2: Use an external package

## 第二步：使用外部 package

In this step, you’ll start using an open-source package named
[english_words]({{site.pub}}/packages/english_words),
which contains a few thousand of the most used
English words plus some utility functions.

在这一步中，你将开始使用一个名为 [english_words]({{site.pub}}/packages/english_words)
的开源软件包，其中包含数千个最常用的英文单词以及一些实用功能。

You can find the `english_words` package, as well as many other open source
packages, on the [Pub site]({{site.pub}}/flutter).

你可以在 [Pub site]({{site.pub}}/flutter) 上找到
`english_words` 软件包以及其他许多开源软件包。

 1. The pubspec file manages the assets and dependencies for a Flutter app. In
    `pubspec.yaml`, add `english_words` (3.1.0 or higher) to the dependencies
    list:
    
    pubspec 文件管理 Flutter 应用程序的 assets（资源，如图片、package等）。
    在pubspec.yaml 中，将 english_words（3.1.0或更高版本）添加到依赖项列表，
    如下面高亮显示的行：

    <?code-excerpt path-base="codelabs/startup_namer"?>
    <?code-excerpt "{step1_base,step2_use_package}/pubspec.yaml" diff-u="4" from="dependencies" to="english"?>
    ```diff
    --- step1_base/pubspec.yaml
    +++ step2_use_package/pubspec.yaml
    @@ -5,4 +5,5 @@
     dependencies:
       flutter:
         sdk: flutter
       cupertino_icons: ^0.1.2
    +  english_words: ^3.1.0
    ```

 2. While viewing the pubspec in Android Studio's editor view,
    click **Packages get**. This pulls the package into
    your project. You should see the following in the console:

    在 Android Studio 的编辑器视图中查看 pubspec 时，
    单击右上角的 Packages get，这会将依赖包安装到你的项目。
    你可以在控制台中看到以下内容：

    ```terminal
    $ flutter pub get
    Running "flutter pub get" in startup_namer...
    Process finished with exit code 0
    ```

    Performing `Packages get` also auto-generates the `pubspec.lock`
    file with a list of all packages pulled into the project and
    their version numbers.
    
    在执行 `Packages get` 命令的时候，同时会自动生成一个名为 `pubspec.lock`
    的文件，这里包含了你依赖 packages 的名称和版本。

 3. In `lib/main.dart`, import the new package:
    
    在 `lib/main.dart` 中引入，如下所示：
    
    <?code-excerpt path-base="codelabs/startup_namer/step2_use_package"?>
    <?code-excerpt "lib/main.dart" title retain="/^import/" replace="/import.*?english.*/[!$&!]/g" indent-by="2"?>
    ```dart
      import 'package:flutter/material.dart';
      [!import 'package:english_words/english_words.dart';!]
    ```

    As you type, Android Studio gives you suggestions for libraries to import.
    It then renders the import string in gray, letting you know that the
    imported library is unused (so far).
    
    在你输入时，Android Studio会为你提供有关库导入的建议。
    然后它将呈现灰色的导入字符串，让你知道导入的库截至目前尚未被使用。

 4. Use the English words package to generate the text instead of
    using the string "Hello World":
    
    接下来，我们使用 English words 包生成文本来替换字符串"Hello World"：

    <?code-excerpt path-base="codelabs/startup_namer"?>
    <?code-excerpt "{step1_base,step2_use_package}/lib/main.dart" from="class"?>
    ```diff
    --- step1_base/lib/main.dart
    +++ step2_use_package/lib/main.dart
    @@ -9,6 +10,7 @@
     class MyApp extends StatelessWidget {
       @override
       Widget build(BuildContext context) {
    +    final wordPair = WordPair.random();
         return MaterialApp(
           title: 'Welcome to Flutter',
           home: Scaffold(
    @@ -16,7 +18,7 @@
               title: Text('Welcome to Flutter'),
             ),
             body: Center(
    -          child: Text('Hello World'),
    +          child: Text(wordPair.asPascalCase),
             ),
           ),
         );
    ```

    {{site.alert.note}}
    
      "Pascal case" (also known as "upper camel case"),
      means that each word in the string, including the first one,
      begins with an uppercase letter. So, "uppercamelcase" becomes
      "UpperCamelCase".
      
      「大驼峰式命名法」也称为 upper camel case 或 Pascal case，
      表示字符串中的每个单词（包括第一个单词）都以大写字母开头。
      所以，uppercamelcase 会变成 UpperCamelCase。
      
    {{site.alert.end}}

 5. If the app is running, [hot reload](/docs/get-started/test-drive)
    to update the running app. Each time you click hot reload,
    or save the project, you should see a different word pair,
    chosen at random, in the running app.
    This is because the word pairing is generated inside the build
    method, which is run each time the MaterialApp requires rendering,
    or when toggling the Platform in Flutter Inspector.

    如果应用程序正在运行，请使用热重载按钮 <i class="material-icons align-bottom">offline_bolt</i>
    更新正在运行的应用程序。每次单击热重载或保存项目时，都会在正在运行的应用程序中随机选择不同的单词对。
    这是因为单词对是在 build 方法内部生成的。每次 MaterialApp 需要渲染时或者在 Flutter Inspector 中切换平台时 build 都会运行。

    {% indent %}
      {% include android-ios-figure-pair.md image="step2.png" alt="App at completion of second step" %}
    {% endindent %}

### Problems?
{:.no_toc}

### 遇到问题?
{:.no_toc}

If your app is not running correctly, look for typos.
If you want to try some of Flutter's debugging tools,
check out the [DevTools][] suite of debugging and profiling tools.
If needed, use the code at the following links to get back on track.

如果你的应用程序运行不正常，请查找是否有拼写错误。
如果需要通过 Flutter 的 debug 工具，可以查看 [开发者工具][DevTools] 页面
来查看 debug 和 profile 的工具。
如果需要，使用下面链接中的代码来对比更正。

* [pubspec.yaml]({{code-url}}/startup_namer/step2_use_package/pubspec.yaml)
* [lib/main.dart]({{code-url}}/startup_namer/step2_use_package/lib/main.dart)

## Step 3: Add a Stateful widget

## 第三步：添加一个 Stateful widget

<?code-excerpt path-base="codelabs/startup_namer/step3_stateful_widget"?>

State<em>less</em> widgets are immutable, meaning that their
properties can’t change&mdash;all values are final.

State<em>less</em> widgets 是不可变的，这意味着它们的属性不能改变
—— 所有的值都是 final。

State<em>ful</em> widgets maintain state that might change
during the lifetime of the widget. Implementing a stateful
widget requires at least two classes: 1) a StatefulWidget class
that creates an instance of 2) a State class. The StatefulWidget
class is, itself, immutable, but the State class persists over the
lifetime of the widget.

State<em>ful</em> widgets 持有的状态可能在 widget 生命周期中发生变化，
实现一个 stateful widget 至少需要两个类：
1）一个 StatefulWidget 类；2）一个 State 类，StatefulWidget 类本身是不变的，
但是 State 类在 widget 生命周期中始终存在。

In this step, you’ll add a stateful widget, `RandomWords`, which creates
its `State` class, `RandomWordsState`. You'll then use `RandomWords` as
a child inside the existing `MyApp` stateless widget.

在这一步，你将添加一个 stateful widget（有状态的 widget）—— `RandomWords`，
它会创建自己的状态类 —— `RandomWordsState`，然后你需要将 `RandomWords`
内嵌到已有的无状态的 `MyApp` widget。

 1. Create a minimal state class. Add the following to the bottom
    of `main.dart`:

    创建一个最简的 state 类，这个类可以在任意地方创建而不一定非要在 MyApp 里，
    我们的示例代码是放在 MyApp 类的最下面了：

    <?code-excerpt "lib/main.dart (RandomWordsState)" title region="RWS-class-only" plaster="// TODO Add build() method" indent-by="2"?>
    ```dart
      class RandomWordsState extends State<RandomWords> {
        // TODO Add build() method
      }
    ```

    Notice the declaration `State<RandomWords>`. This indicates that we're
    using the generic
    [State]({{site.api}}/flutter/widgets/State-class.html)
    class specialized for use with `RandomWords`. Most of the app's logic
    and state resides here&mdash;it maintains the state for the `RandomWords`
    widget. This class saves the generated word pairs, which grows infinitely
    as the user scrolls, and favorite word pairs (in
    [part 2]({{site.codelabs}}/codelabs/first-flutter-app-pt2)),
    as the user adds or removes them from the list by toggling the heart icon.
    
    注意一下 `State<RandomWords>` 的声明。这表明我们在使用专门用于 `RandomWords` 的 
    [State]({{site.api}}/flutter/widgets/State-class.html) 泛型类。
    应用的大部分逻辑和状态都在这里 —— 它会维护 RandomWords widget 的状态。
    这个类会保存代码生成的单词对，这个单词对列表会随着用户滑动而无限增长，
    另外还会保存用户喜爱的单词对（第二部分），
    也即当用户点击爱心图标的时候会从喜爱的列表中添加或者移除当前单词对。

    `RandomWordsState` depends on the `RandomWords` class. You'll add that next.
    
    `RandomWordsState` 依赖 `RandomWords`，我们接下来会创建这个类。

 2. Add the stateful `RandomWords` widget to `main.dart`.
    The `RandomWords` widget does little else beside creating its State class:

    添加有状态的 `RandomWords` widget 到 `main.dart`，`RandomWords` widget
    除了创建 State 类之外几乎没有其他任何东西：

    <?code-excerpt "lib/main.dart (RandomWords)" title indent-by="2"?>
    ```dart
      class RandomWords extends StatefulWidget {
        @override
        RandomWordsState createState() => RandomWordsState();
      }
    ```

    After adding the state class, the IDE complains that
    the class is missing a build method. Next, you'll add a basic
    build method that generates the word pairs by moving the
    word generation code from `MyApp` to `RandomWordsState`.
    
    在添加状态类后，IDE 会提示该类缺少 build 方法。
    接下来，你将添加一个基本的 build 方法，
    该方法通过将生成单词对的代码从 `MyApp` 移动到 `RandomWordsState` 来生成单词对。

 3. Add the `build()` method to `RandomWordsState`:
 
    将 `build()` 方法添加到 `RandomWordState` 中，如下所示：

    <?code-excerpt "lib/main.dart (RandomWordsState)" title indent-by="2" replace="/(\n  )(.*)/$1[!$2!]/g"?>
    ```dart
      class RandomWordsState extends State<RandomWords> {
        [!@override!]
        [!Widget build(BuildContext context) {!]
        [!  final wordPair = WordPair.random();!]
        [!  return Text(wordPair.asPascalCase);!]
        [!}!]
      }
    ```

 4. Remove the word generation code from `MyApp` by making the changes shown in
    the following diff:
    
    如下所示，删除 `MyApp` 里生成文字的代码：

    <?code-excerpt path-base="codelabs/startup_namer"?>
    <?code-excerpt "{step2_use_package,step3_stateful_widget}/lib/main.dart" to="}"?>
    ```diff
    --- step2_use_package/lib/main.dart
    +++ step3_stateful_widget/lib/main.dart
    @@ -10,7 +10,6 @@
     class MyApp extends StatelessWidget {
       @override
       Widget build(BuildContext context) {
    -    final wordPair = WordPair.random();
         return MaterialApp(
           title: 'Welcome to Flutter',
           home: Scaffold(
    @@ -18,8 +17,8 @@
               title: Text('Welcome to Flutter'),
             ),
             body: Center(
    -          child: Text(wordPair.asPascalCase),
    +          child: RandomWords(),
             ),
           ),
         );
       }
    ```

 5. Restart the app.
    The app should behave as before, displaying a word
    pairing each time you hot reload or save the app.

    重启应用。
    应用应该像之前一样运行，每次热重载或保存应用程序时都会显示一个单词对。

{{site.alert.tip}}

  If you see the following warning on a hot reload, consider restarting
  the app:
  
  如果你尝试热重载，则可能会看到一条警告，考虑重新启动当前应用：

  **Reloading...<br>
  Some program elements were changed during reload but did not run when
  the view was reassembled; you might need to restart the app (by pressing "R")
  for the changes to have an effect.**

  It might be a false positive, but restarting ensures that your changes
  are reflected in the app's UI.
  
  因为重启应用之后就可以生效，故这可能是误报。
  
{{site.alert.end}}


### Problems?
{:.no_toc}

### 遇到问题？
{:.no_toc}

If your app is not running correctly, look for typos.
If you want to try some of Flutter's debugging tools,
check out the [DevTools][] suite of debugging and profiling tools.
If needed, use the code at the following link to get back on track.

如果你的应用程序运行不正常，请查找是否有拼写错误。
如果需要通过 Flutter 的 debug 工具，可以查看 [开发者工具][DevTools] 页面
来查看 debug 和 profile 的工具。
如果需要，使用下面链接中的代码来对比更正。

* [lib/main.dart]({{code-url}}/startup_namer/step3_stateful_widget/lib/main.dart)

## Step 4: Create an infinite scrolling ListView

## 第四步：创建一个无限滚动的 ListView

<?code-excerpt path-base="codelabs/startup_namer/step4_infinite_list"?>

In this step, you'll expand `RandomWordsState` to generate
and display a list of word pairings. As the user scrolls, the list
displayed in a `ListView` widget, grows infinitely. `ListView`'s
`builder` factory constructor allows you to build a list view
lazily, on demand.

在这一步中，你将扩展（继承）`RandomWordsState` 类，以生成并显示单词对列表。
当用户滚动时，`ListView` 中显示的列表将无限增长。
`ListView` 的 `builder` 工厂构造函数允许你按需建立一个懒加载的列表视图。

 1. Add a `_suggestions` list to the `RandomWordsState`
    class for saving suggested word pairings.
    Also, add a `_biggerFont` variable for making the font size larger.

    向 `RandomWordsState` 类中添加一个 `_suggestions` 列表以保存建议的单词对，
    同时，添加一个 `_biggerFont` 变量来增大字体大小。

    <?code-excerpt "lib/main.dart" title region="RWS-var" indent-by="2" replace="/final .*/[!$&!]/g"?>
    ```dart
      class RandomWordsState extends State<RandomWords> {
        [!final _suggestions = <WordPair>[];!]
        [!final _biggerFont = const TextStyle(fontSize: 18.0);!]
        // ···
      }
    ```

    {{site.alert.note}}
    
      Prefixing an identifier with an underscore [enforces
      privacy]({{site.dart-site}}/guides/language/language-tour)
      in the Dart language.
      
      在 Dart 语言中使用下划线前缀标识符，会 [强制其变成私有]({{site.dart-site}}/guides/language/language-tour)。
      
    {{site.alert.end}}

    Next, you'll add a `_buildSuggestions()` function to the `RandomWordsState`
    class. This method builds the `ListView` that displays the suggested
    word pairing.
    
    接下来，我们将向 `RandomWordsState` 类添加一个 `_buildSuggestions()` 方法，
    此方法构建显示建议单词对的 `ListView`。

    The `ListView` class provides a builder property, `itemBuilder`, that's a
    factory builder and callback function specified as an anonymous function.
    Two parameters are passed to the function&mdash;the `BuildContext`,
    and the row iterator, `i`. The iterator begins at 0 and increments each
    time the function is called. It increments twice for every suggested word pairing:
    once for the ListTile, and once for the Divider. This model allows the suggested
    list to grow infinitely as the user scrolls.
    
    `ListView` 类提供了一个名为 `itemBuilder` 的 builder 属性，这是一个工厂匿名回调函数，
    接受两个参数 `BuildContext` 和行迭代器 `i`。迭代器从 0 开始，每调用一次该函数 `i` 就会自增，
    每次建议的单词对都会让其递增两次，一次是 ListTile，另一次是 Divider。
    它用于创建一个在用户滚动时候无限增长的列表。

 2. Add a `_buildSuggestions()` function to the `RandomWordsState` class:
 
    向 `RandomWordsState` 类添加 `_buildSuggestions()` 方法，内容如下：

    <?code-excerpt "lib/main.dart (_buildSuggestions)" title indent-by="2"?>
    ```dart
      Widget _buildSuggestions() {
        return ListView.builder(
            padding: const EdgeInsets.all(16.0),
            itemBuilder: /*1*/ (context, i) {
              if (i.isOdd) return Divider(); /*2*/

              final index = i ~/ 2; /*3*/
              if (index >= _suggestions.length) {
                _suggestions.addAll(generateWordPairs().take(10)); /*4*/
              }
              return _buildRow(_suggestions[index]);
            });
      }
    ```

    {:.numbered-code-notes}
    
     1. The `itemBuilder` callback is called once per suggested word pairing,
        and places each suggestion into a `ListTile` row. For even rows, the
        function adds a `ListTile` row for the word pairing. For odd rows, the
        function adds a `Divider` widget to visually separate the entries. Note
        that the divider might be difficult to see on smaller devices.
        
        对于每个建议的单词对都会调用一次 itemBuilder，然后将单词对添加到 ListTile 行中。
        在偶数行，该函数会为单词对添加一个 ListTile row，
        在奇数行，该函数会添加一个分割线的 widget，来分隔相邻的词对。
        注意，在小屏幕上，分割线看起来可能比较吃力。
        
     2. Add a one-pixel-high divider widget before each row in the `ListView`.
     
        在每一列之前，添加一个1像素高的分隔线 widget。
     
     3. The expression `i ~/ 2` divides `i` by 2 and returns an integer result.
        For example: 1, 2, 3, 4, 5 becomes 0, 1, 1, 2, 2. This calculates the
        actual number of word pairings in the `ListView`, minus the divider
        widgets.
        
        语法 "i ~/ 2" 表示i除以2，但返回值是整形（向下取整），
        比如 i 为：1, 2, 3, 4, 5 时，结果为 0, 1, 1, 2, 2，
        这个可以计算出 ListView 中减去分隔线后的实际单词对数量。
        
     4. If you've reached the end of the available word pairings, then generate
        10 more and add them to the suggestions list.
        
        如果是建议列表中最后一个单词对，接着再生成10个单词对，然后添加到建议列表。

    The `_buildSuggestions()` function calls `_buildRow()` once per
    word pair. This function displays each new pair in a `ListTile`,
    which allows you to make the rows more attractive in the next step.
    
    对于每一个单词对，`_buildSuggestions()` 都会调用一次 `_buildRow()`。
    这个函数在 `ListTile` 中显示每个新词对，
    这使你在下一步中可以生成更漂亮的显示行，详见本 codelab 的第二部分。

 3. Add a `_buildRow()` function to `RandomWordsState`:
    
    在 `RandomWordsState` 中添加 `_buildRow()` 函数 : 

    <?code-excerpt "lib/main.dart (_buildRow)" title indent-by="2"?>
    ```dart
      Widget _buildRow(WordPair pair) {
        return ListTile(
          title: Text(
            pair.asPascalCase,
            style: _biggerFont,
          ),
        );
      }
    ```

 4. In the `RandomWordsState` class, update the `build()` method to use
    `_buildSuggestions()`, rather than directly calling the word
    generation library.
    ([Scaffold]({{site.api}}/flutter/material/Scaffold-class.html)
    implements the basic Material Design visual layout.)
    Replace the method body with the highlighted code:

    更新 RandomWordsState 的 build 方法以使用 _buildSuggestions()，
    而不是直接调用单词生成库，代码更改后如下：
    （使用 [Scaffold]({{site.api}}/flutter/material/Scaffold-class.html)
    类实现基础的 Material Design 布局）

    <?code-excerpt "lib/main.dart (build)" title region="RWS-build" replace="/(\n  )(return.*|  .*|\);)/$1[!$2!]/g" indent-by="2"?>
    ```dart
      @override
      Widget build(BuildContext context) {
        [!return Scaffold(!]
        [!  appBar: AppBar(!]
        [!    title: Text('Startup Name Generator'),!]
        [!  ),!]
        [!  body: _buildSuggestions(),!]
        [!);!]
      }
    ```

 5. In the `MyApp` class, update the `build()` method by changing the title, and
    changing the home to be a `RandomWords` widget:

    更新 `MyApp` 的 `build()` 方法，修改 `title` 的值来改变标题，
    修改 `home` 的值为 `RandomWords` widget。

    <?code-excerpt path-base="codelabs/startup_namer"?>
    <?code-excerpt "{step3_stateful_widget,step4_infinite_list}/lib/main.dart" diff-u="4" from="class MyApp" to="}"?>
    ```diff
    --- step3_stateful_widget/lib/main.dart
    +++ step4_infinite_list/lib/main.dart
    @@ -10,15 +10,8 @@
     class MyApp extends StatelessWidget {
       @override
       Widget build(BuildContext context) {
         return MaterialApp(
    -      title: 'Welcome to Flutter',
    -      home: Scaffold(
    -        appBar: AppBar(
    -          title: Text('Welcome to Flutter'),
    -        ),
    -        body: Center(
    -          child: RandomWords(),
    -        ),
    -      ),
    +      title: 'Startup Name Generator',
    +      home: RandomWords(),
         );
       }
    ```

 6. Restart the app. You should see a list of word pairings no matter how far
    you scroll.

    重新启动你的项目工程应用，你应该看到一个单词对列表。
    尽可能地向下滚动，你将继续看到新的单词对。

    {% indent %}
      {% include android-ios-figure-pair.md image="step4-infinite-list.png" alt="App at completion of fourth step" %}
    {% endindent %}

### Problems?
{:.no_toc}

### 遇到问题？
{:.no_toc}

If your app is not running correctly, look for typos.
If you want to try some of Flutter's debugging tools,
check out the [DevTools][] suite of debugging and profiling tools.
If needed, use the code at the following link to get back on track.

如果你的应用程序运行不正常，请查找是否有拼写错误。
如果需要通过 Flutter 的 debug 工具，可以查看 [开发者工具][DevTools] 页面
来查看 debug 和 profile 的工具。
如果需要，使用下面链接中的代码来对比更正。

* [lib/main.dart]({{code-url}}/startup_namer/step4_infinite_list/lib/main.dart)

{% include run-profile.md %}

## Next steps
{:.no_toc}

## 下一步
{:.no_toc}

{% include app-figure.md class="site-image-right" img-class="border"
    image="get-started/startup-namer.gif" caption="The app from part 2" %}

Congratulations!

祝贺你！

You've written an interactive Flutter app that runs on both iOS and Android.
In this codelab, you've:

你已经完成了一个可以同时运行在 iOS 和 Android 平台的 Flutter 应用！
同时收获了如下内容：

* Created a Flutter app from the ground up.
  
  从零开始创建了一个 Flutter 应用；

* Written Dart code.

  编写 Dart 代码；
  
* Leveraged an external, third-party library.
  
  使用外部的第三方库（package）；
  
* Used hot reload for a faster development cycle.

  在开发过程中试用了热重载 (hot reload)；

* Implemented a stateful widget.

  实现了一个有状态的 widget；

* Created a lazily loaded, infinite scrolling list.

  创建了一个懒加载的，无限滚动的列表。

If you would like to extend this app, proceed to
[part 2]({{site.codelabs}}/codelabs/first-flutter-app-pt2/index.html)
on the
[Google Developers Codelabs]({{site.codelabs}}) site,
where you add the following functionality:

如果你想继续扩展你的应用，在这里进行 [第二部分](https://codelabs.flutter-io.cn/codelabs/first-flutter-app-pt2-cn/index.html)，
你将会从以下方面修改你的应用：

* Implement interactivity by adding a clickable heart icon to save
  favorite pairings.

  为应用添加交互功能，一个能点击的小心心，来保存喜欢的公司名字；

* Implement navigation to a new route by adding a new screen
  containing the saved favorites.

  为应用添加一个新的页面（Route），查看收藏列表；

* Modify the theme color, making an all-white app.

  修改应用的主题，变成一个白色系的应用。

[DevTools]: /docs/development/tools/devtools
