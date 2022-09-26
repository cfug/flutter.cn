---
title: Write your first Flutter app, part 1
title: 编写第一个 Flutter 应用
description: How to write a web-based app in Flutter.
description: 如何使用 Flutter 编写一个网页应用。
short-title: Write your first app
short-title: 编写第一个 Flutter 应用
tags: Flutter安装,Flutter起步教程
keywords: Flutter 第一个应用,Flutter Hello World,codelab
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

{{site.alert.tip}}

  This codelab walks you through writing your first Flutter
  app. You might prefer to try
  [writing your first Flutter app on the web][codelab-web].

  这篇 codelab 将带你初体验移动端 Flutter 应用开发。
  你也许更想尝试 [编写你的第一个 Flutter 网页应用][codelab-web]。

  **Note that if you have [enabled web][],
  the completed app just works on all of these devices!**

  **提示：如果你已经 [启用 web][enabled web]，你的应用可以在这里面的所有设备上运行。**

{{site.alert.end}}

If you prefer an instructor-led version of this codelab,
check out the following workshop:

如果你更喜欢由讲师介绍的 codelab 版本，请查看以下的 workshop：

<iframe width="560" height="315" src="https://player.bilibili.com/player.html?aid=846249495&bvid=BV1n54y1H7dZ&cid=354773704&page=1" title="Bilibili video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{% assign code-url = 'https://raw.githubusercontent.com/flutter/codelabs/main' -%}

<img src="/assets/images/docs/get-started/startup-namer-part-1.gif" alt="The app that you'll be building" class='site-image-right'>

{%- comment %}
  Code highlights in this page are green, to match diff additions.
{% endcomment -%}
<style>pre .highlight { background-color: #dfd; }</style>

This is a guide to creating your first Flutter app.
If you are familiar with object-oriented code and basic programming
concepts such as variables, loops, and conditionals,
you can complete this tutorial. You don’t need
previous experience with Dart, mobile, desktop, or web programming.

这是一个指引你完成第一个 Flutter 应用的手把手操作教程（我们也称之为是 codelab）。
我们将会着手创建一个简单的 Flutter 应用，无需 Dart 语言、
移动端开发、桌面端开发或 Web 开发的经验，
只需你具备面向对象语言开发基础即可（如变量，循环和条件语句）。

This codelab is part 1 of a two-part codelab.
You can find [part 2][] on [Google Developers Codelabs][]
(as well as a copy of this codelab, [part 1][]).

完整的教程分为两部分，本页面是第一部分的内容，
你可以在这里查看 [第二部分][part 2] 的内容。
(Codelabs 里的第一部分内容与本页内容相同)。

## What you'll build in part 1
{:.no_toc}

## 第一部分的内容概览
{:.no_toc}

You’ll implement a simple app that generates proposed
names for a startup company. The user can select and unselect names,
saving the best ones. The code lazily generates 10 names at a time.
As the user scrolls, more names are generated.
There is no limit to how far a user can scroll.

你将完成一个简单的应用，功能是：为一个创业公司生成建议的公司名称。
用户可以选择和取消选择的名称、保存喜欢的名称。
该代码一次生成十个名称，当用户滚动时，会生成新一批名称。

The animated GIF shows how the app works at the completion of part 1.

页面上方的这个 GIF 可以引导你预览本 codelab 做完之后的应用效果图。

{{site.alert.secondary}}

  <h4 class="no_toc">What you’ll learn in part 1</h4>

  <h4 class="no_toc">第一部分，我们将共同构建：</h4>

  * How to write a Flutter app that looks natural on iOS, Android,
    desktop (Windows, for example), and the web

    Flutter 如何在 Android、iOS、桌面（例如 Windows）和 Web 里自动适应不同的 UI 体系

  * Basic structure of a Flutter app

    Flutter 工程/项目的基本结构
  
  * Finding and using packages to extend functionality
 
    查找和使用 packages 来扩展功能

  * Using hot reload for a quicker development cycle
   
    使用热重载 (hot reload) 加快开发周期

  * How to implement a stateful widget
  
    如何实现有状态的 widget

  * How to create an infinite, lazily loaded list

    如何创建一个无限的、延迟加载的列表

  In [part 2][] of this codelab, you'll add interactivity,
  modify the app's theme, and add the ability to navigate
  to a new screen (called a _route_ in Flutter).
  
  在本 codelab 的 
  [第二部分][part 2]，
  你还将学到添加交互，
  修改应用的主题，
  以及为应用添加一个新的页面（在 Flutter，我们称之为 route）。
  
{{site.alert.end}}

{{site.alert.secondary}}

  <h4 class="no_toc">What you'll use</h4>

  <h4 class="no_toc">所需工具</h4>
  
  You need two pieces of software to complete this lab: the
  [Flutter SDK][] and [an editor][].

  你需要安装两部分内容来完成本次实验：
  [Flutter SDK 安装][Flutter SDK] 和 
  [编辑器 (editor)][an editor] 设置。

  You can run this codelab by using any of the following devices:
  
  你可以通过如下任何设备完成本 codelab：

  * A physical device ([Android][] or [iOS][]) connected to your
    computer and set to developer mode
    
    开启开发者模式 (developer mode) 的 [Android][] 和 / 或 [iOS][] 真机；

  * The [iOS simulator][] (requires installing Xcode tools)
    
    [iOS 模拟器][iOS simulator] (需要安装 Xcode 工具)；
  
  * The [Android emulator][] (requires setup in Android Studio)
    
    [Android 模拟器][Android emulator] (需要安装设置 Android Studio)。
 
  * A browser (Chrome is required for debugging)

    浏览器（如果需要 debug，则需要用 Chrome 浏览器）；

  * A [Windows][], [Linux][], or [macOS][] desktop application

    [Windows][]、[Linux][] 或 [macOS][] 桌面端系统。
{{site.alert.end}}

[Android]: {{site.url}}/get-started/install/macos#set-up-your-android-device
[Android emulator]: {{site.url}}/get-started/install/macos#set-up-the-android-emulator
[iOS]: {{site.url}}/get-started/install/macos#deploy-to-ios-devices
[iOS simulator]: {{site.url}}/get-started/install/macos#set-up-the-ios-simulator

Every Flutter app you
create also compiles for the web. In your IDE under
the **devices** pulldown, or at the command line
using `flutter devices`, you should now see **Chrome**
and **Web server** listed. The **Chrome** device
automatically starts Chrome. The **Web server**
starts a server that hosts the app so that you can
load it from any browser. Use the Chrome device during
development so that you can use DevTools,
and the web server when you want to test on
other browsers. For more information,
see [Building a web application with Flutter][]
and [Write your first Flutter app on the web][codelab-web].

任何一个 Flutter 的项目都可以编译为 web 应用。
你可以在 IDE 中打开 **devices** 选择器，
或者是在命令行中输入 `flutter devices`，
这样你就可以看到 **Chrome** 以及 **Web server** 选项卡。
**Chrome** 设备将会自动打开 Chrome。
**Web server** 则会运行一个服务程式托管应用，这样你就可以在任意浏览器加载它。
在开发时请使用 Chrome 进行调试，以使用 DevTools。
当你想在其他浏览器测试时，请使用 web server。
更多详细信息请查看 [使用 Flutter 构建 web 应用][Building a web application with Flutter]，
以及 [编写你的第一个 Flutter web 应用程序][codelab-web]。

Also, Flutter apps can compile for desktop.
You should see your operating system listed
in your IDE under **devices**,
for example: **Windows (desktop)**,
or at the command line using `flutter devices`.
For more information on building apps for desktop,
see [Write a Flutter desktop application][].

同时，Flutter 应用也可以编译到桌面端。
你会在 IDE 的 **设备** 列表内或运行 `flutter devices`
时看到其列举了你的操作系统，例如 **Windows (desktop)**，
想了解更多关于构建桌面端应用的信息，参考
[编写一个 Flutter 桌面应用][Write a Flutter desktop application]。

## Step 1: Create the starter Flutter app

## 第一步：创建初始化工程

<?code-excerpt path-base="codelabs/startup_namer/step1_base"?>

Create a simple, templated Flutter app, using the instructions in
[Getting Started with your first Flutter app][].
Name the project **startup_namer** (instead of _flutter_app_).

按照 [这个指南][Getting Started with your first Flutter app] 中所描述的步骤，
创建一个简单的、基于模板的 Flutter 工程，然后将项目命名为 startup_namer (而不是 myapp)，
接下来你将会修改这个工程来完成最终的 App。

{{site.alert.tip}}

  If you don't see "New Flutter Project" as an option in your IDE, make
  sure you have the [plugins installed for Flutter and Dart][].
  
  如果你没有在你的集成开发环境（IDE）里看到"New Flutter Project"（新建一个 Flutter 工程），
  请按照本文档完成 [Dart 和 Flutter 插件的安装][plugins installed for Flutter and Dart]。
  
{{site.alert.end}}

You'll mostly edit **lib/main.dart**,
where the Dart code lives.

在这个示例中，你将主要编辑 Dart 代码所在的 **lib/main.dart** 文件,

 1. Replace the contents of `lib/main.dart`.<br>
    Delete all of the code from **lib/main.dart**.
    Replace with the following code, which displays
    "Hello World" in the center of the screen.
    
    删除 lib/main.dart 中的所有代码，然后替换为下面的代码，它将在屏幕的中心显示「Hello World」。

    <?code-excerpt "lib/main.dart" title?>
    ```dart
    // Copyright 2018 The Flutter team. All rights reserved.
    // Use of this source code is governed by a BSD-style license that can be
    // found in the LICENSE file.

    import 'package:flutter/material.dart';

    void main() {
      runApp(const MyApp());
    }

    class MyApp extends StatelessWidget {
      const MyApp({super.key});

      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          title: 'Welcome to Flutter',
          home: Scaffold(
            appBar: AppBar(
              title: const Text('Welcome to Flutter'),
            ),
            body: const Center(
              child: Text('Hello World'),
            ),
          ),
        );
      }
    }
    ```

    {{site.alert.tip}}

      When pasting code into your app, indentation can become skewed.
      You can fix this with the following formatting tool:

      在向你的工程项目中粘贴代码的时候，缩进可能会变形。
      你可以使用下面的 Flutter 工具修复此问题：

      * VS Code: Right-click and select **Format Document**.

        VS Code: 右键单击并选择 Format Document。

      * Android Studio and IntelliJ IDEA: Right-click the code and
        select **Reformat Code with dartfmt**.

        Android Studio 和 IntelliJ IDEA: 右键单击 Dart 代码，
        然后选择 **Reformat Code with dartfmt**。
      * Terminal: Run `flutter format <filename>`.

        Terminal: 运行 `flutter format <filename>`。

    {{site.alert.end}}

 2. Run the app [in the way your IDE describes][].
    You should see either Android, iOS, Windows, Linux, macOS,
    or web output, depending on your chosen device.

    [运行]({{site.url}}/get-started/test-drive#androidstudio) 你的工程项目，
    根据不同的操作系统，你会看到如下运行结果界面：

    {% indent %}
      {% include docs/ios-windows-figure-pair.md image="hello-world.png" alt="Hello world app" %}
    {% endindent %}

    {{site.alert.tip}}

      The first time you run on a physical device,
      it can take a while to load.
      Afterward, you can use hot reload for quick updates.
      **Save** also performs a hot reload if the app is running.
      When running an app directly from the console using
      `flutter run`, enter `r` to perform hot reload.

      第一次真机运行的时候可能会需要更多的等待时间，但是这是值得的，
      因为接下来你就可以使用热重载（hot reload）功能，
      真正的为下次运行时更新的预览**节省**更多时间。
      如果你是在终端窗口里通过 `flutter run` 运行应用的话，
      直接输入 `r` 进行热重载。

    {{site.alert.end}}

### Observations
{:.no_toc}

### 观察和分析
{:.no_toc}

* This example creates a Material app.
  [Material][] is a visual design language
  that is standard on mobile and the web.
  Flutter offers a rich set of Material widgets.  
  It's a good idea to have a `uses-material-design: true` entry
  in the `flutter` section of your `pubspec.yaml` file.
  This allows you to use more features of Material,
  such as its set of predefined [Icons][].

  本示例创建了一个具有 Material Design 风格的应用，
  [Material][] 是一种移动端和网页端通用的视觉设计语言，
  Flutter 提供了丰富的 Material 风格的 widgets。
  在 `pubspec.yaml` 文件的 `flutter` 部分选择加入
  `uses-material-design: true` 会是一个明智之举，
  通过这个可以让您使用更多 Material 的特性，
  比如其预定义好的 [图标][Icons] 集。

* The app extends `StatelessWidget`, which makes the app itself a
  widget. In Flutter, almost everything is a widget,
  including alignment, padding, and layout.

  该应用程序继承了 `StatelessWidget`，这将会使应用本身也成为一个 widget。
  在 Flutter 中，几乎所有都是 widget，
  包括对齐 (alignment)、填充 (padding) 和布局 (layout)。

* The `Scaffold` widget, from the Material library,
  provides a default app bar, and a body property that
  holds the widget tree for the home screen.
  The widget subtree can be quite complex.

  `Scaffold` 是 Material 库中提供的一个 widget，
  它提供了默认的导航栏、标题和包含主屏幕 widget 树的 body 属性。
  widget 树可以很复杂。

* A widget’s main job is to provide a `build()` method
  that describes how to display the widget in terms of other,
  lower level widgets.

  一个 widget 的主要工作是提供一个 `build()` 
  方法来描述如何根据其他较低级别的 widgets 来显示自己。

* The body for this example consists of a `Center` widget containing
  a `Text` child widget. The Center widget aligns its widget subtree
  to the center of the screen.

  本示例中的 body 的 widget 树中包含了一个 `Center` widget，
  Center widget 又包含一个 `Text` 子 widget，
  Center widget 可以将其子 widget 树对齐到屏幕中心。

## Step 2: Use an external package

## 第二步：使用外部 package

In this step, you’ll start using an open-source package named
[english_words][], which contains a few thousand of the most used
English words plus some utility functions.

在这一步中，你将开始使用一个名为 [english_words][]
的开源软件包，其中包含数千个最常用的英文单词以及一些实用功能。

You can find the `english_words` package,
as well as many other open source packages, on [pub.dev][].

你可以在 [pub.dev][] 上找到
`english_words` package 以及其他许多开源的 package。

The `pubspec.yaml` file manages the assets and dependencies
for a Flutter app.

`pubspec.yaml` 文件管理着 Flutter 工程中的所有资源和依赖。

 1. Add the `english_words` package to your project as follows:

    通过下面的方式将 `english_words` 这个 package 加入你的工程里：

    In your IDE, add the line `english_words 4.0.0`
    just after the `cupertino_icons 1.0.4` line 
    and save the file.

    在你的 IDE 中，将 `english_words 4.0.0` 加到
    `cupertino_icons 1.0.4` 后面，然后保存文件。

    Saving the file causes the dependencies to be
    fetched. The equivalent command-line prompt is
    the following:

    文件保存后就会触发依赖的获取，这等同于执行下面的命令:

```terminal
$ `flutter pub add english_words`
```

The output will look something like the following:

输出的结果会类似下面这些:

```terminal
Resolving dependencies...
These packages are no longer being depended on:
+ english_words 4.0.0
Downloading english_words 4.0.0...

Changed 1 dependency!
```

Fetching the dependencies also auto-generates the `pubspec.lock`
file with a list of all packages pulled into the project and
their version numbers.

依赖关系的获取也会自动生成 `pubspec.lock` 文件，
这个文件包含所有加入项目的 package 和版本号信息。

The `pubspec.yaml` file manages the assets and dependencies
for a Flutter app. In `pubspec.yaml`, you will see
that the `english_words` dependency has been added:

`pubspec.yaml` 文件管理着 Flutter 工程中的所有资源和依赖。
在这个文件中，现在你会观察到 `english_words` 这个依赖已经添加:
    
<?code-excerpt path-base="codelabs/startup_namer"?>
<?code-excerpt "{step1_base,step2_use_package}/pubspec.yaml" diff-u="4" from="dependencies" to="english"?>
```diff
--- step1_base/pubspec.yaml
+++ step2_use_package/pubspec.yaml
@@ -25,4 +25,5 @@
 dependencies:
   flutter:
     sdk: flutter
   cupertino_icons: ^1.0.2
+  english_words: ^4.0.0
```

 2. While viewing the `pubspec.yaml` file in your IDE's editor view,
    click **Pub get**. This pulls the package into
    your project. The equivalent command-line prompt is as follows:

    在 Android Studio 的编辑器视图中查看 `pubspec.yaml` 文件时，
    点击 **Pub get** 会将依赖包安装到你的项目。
    你应该会在控制台中看到以下内容：

```terminal
$ `flutter pub get`
```

The output will look something like the following:

会大约输出下面类似的内容:

```terminal
Running "flutter pub get" in startup_namer...
Process finished with exit code 0
```

 3. In `lib/main.dart`, import the new package:

    在 `lib/main.dart` 中引入，如下所示：

    <?code-excerpt path-base="codelabs/startup_namer/step2_use_package"?>
    <?code-excerpt "lib/main.dart" title retain="/^import/" replace="/import.*?english.*/[!$&!]/g" indent-by="2"?>
    ```dart
      [!import 'package:english_words/english_words.dart';!]
      import 'package:flutter/material.dart';
    ```

    As you type, the IDE gives you suggestions for libraries to import.
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
    @@ -2,6 +2,7 @@
     // Use of this source code is governed by a BSD-style license that can be
     // found in the LICENSE file.

    +import 'package:english_words/english_words.dart';
     import 'package:flutter/material.dart';

     void main() {
    @@ -13,14 +14,15 @@

       @override
       Widget build(BuildContext context) {
    +    final wordPair = WordPair.random();
         return MaterialApp(
           title: 'Welcome to Flutter',
           home: Scaffold(
             appBar: AppBar(
               title: const Text('Welcome to Flutter'),
             ),
    -        body: const Center(
    -          child: Text('Hello World'),
    +        body: Center(
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

 5. If the app is running, [hot reload][]
    to update the running app. Each time you click hot reload,
    or save the project, you should see a different word pair,
    chosen at random, in the running app.
    This is because the word pairing is generated inside the build
    method, which is run each time the `MaterialApp` requires rendering,
    or when toggling the Platform in Flutter Inspector.

    如果应用程序正在运行，请使用热重载按钮 <i class="material-icons align-bottom">offline_bolt</i>
    更新正在运行的应用程序。每次单击热重载或保存项目时，
    都会在正在运行的应用程序中随机选择不同的单词对。
    这是因为单词对是在 build 方法内部生成的。
    每次 `MaterialApp` 需要渲染时或者在 Flutter Inspector
    中切换平台时 build 都会运行。

    {% indent %}
      {% include docs/ios-windows-figure-pair.md image="step2.png" alt="App at completion of second step" %}
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

**无** 状态的 widgets 是不可变的，这意味着它们的属性不能改变
—— 所有的值都是 final。

State<em>ful</em> widgets maintain state that might change
during the lifetime of the widget. Implementing a stateful
widget requires at least two classes: 1) a `StatefulWidget` class
that creates an instance of 2) a `State` class. The `StatefulWidget`
class is, itself, immutable and can be thrown away and regenerated,
but the `State` class persists over the lifetime of the widget.

**有** 状态的 widgets 也是不可变的，
但其持有的状态可能在 widget 生命周期中发生变化，
实现一个有状态的 widget 至少需要两个类：
1）一个 `StatefulWidget` 类；2）一个 `State` 类，`StatefulWidget` 类本身是不变的，
但是 `State` 类在 widget 生命周期中始终存在。

In this step, you’ll add a stateful widget, `RandomWords`,
which creates its `State` class, `_RandomWordsState`.
You'll then use `RandomWords` as
a child inside the existing `MyApp` stateless widget.

在这一步，你将添加一个有状态的 widget —— `RandomWords`，
它会创建自己的状态类 —— `_RandomWordsState`，
然后你需要将 `RandomWords`
内嵌到已有的无状态的 `MyApp` widget。

<ol markdown="1">
<li markdown="1"><p markdown="1">Create the boilerplate code for a stateful widget.<br>
  In `lib/main.dart`, position your cursor after all of the code,
  enter **Return** a couple times to start on a fresh line.
  In your IDE, start typing `stful`.
  The editor asks if you want to create a
  `Stateful` widget. Press **Return** to accept.
  The boilerplate code for two classes appears,
  and the cursor is positioned for you to enter the name of
  your stateful widget.</p>
  <p markdown="1">创建有状态 widget 的样板代码。<br>
  在 `lib/main.dart` 中，将光标置于所有代码之后，
  输入 **回车** 几次另起新行。
  在 IDE 中，输入 `stful`，编辑器就会提示您是否要创建一个 `Stateful` widget。
  按回车键表示接受建议，随后就会出现两个类的样板代码，
  光标也会被定位在输入有状态 widget 的名称处。</p>
</li>

<li markdown="1"> <p markdown="1">Enter `RandomWords` as the name of your widget.<br>
  The `RandomWords` widget does little else beside creating its
  `State` class.<br><br>
  Once you've entered `RandomWords` as the name of
  the stateful widget, the IDE automatically updates
  the accompanying `State` class, naming it `_RandomWordsState`.
  By default, the name of the `State` class is prefixed
  with an underbar. Prefixing an identifier with an
  underscore [enforces privacy][] in the Dart language and
  is a recommended best practice for `State` objects.<br><br>
  The IDE also automatically updates the state class
  to extend `State<RandomWords>`, indicating
  that you're using a generic [`State`][]
  class specialized for use with `RandomWords`.
  Most of the app's logic resides here&mdash;it maintains
  the state for the `RandomWords` widget. This class saves the list
  of generated word pairs, which grows infinitely
  as the user scrolls and, in part 2 of this lab,
  favorites word pairs as the user adds or removes them from
  the list by toggling the heart icon.<br><br>
  Both classes now look as follows:</p>
  <p markdown="1">输入 `RandomWords` 作为有状态 widget 的名称。<br>
  `RandomWords` widget 的主要作用就是创建其对应的 `State` 类。<br><br>
  输入 `RandomWords` 作为有有状态 widget 的名称后，
  IDE 会自动更新其对应的 `State` 类，并将其命名为 `_RandomWordsState`。
  默认情况下，`State` 类的名称带有下划线前缀。
  Dart 语言中，给标识符加上下划线前缀可以 [增强隐私性][enforces privacy]，
  并且这也是针对 `State` 对象推荐的最佳实践写法。<br><br>
  IDE 也会自动将状态类继承自 `State<RandomWords>`，
  这表示专门用于 `RandomWords` 的通用 [`State`][] 类。
  该应用程序的大多数逻辑都位于此处&mdash;它维护 `RandomWords` widget 的状态。
  该类会保存生成的单词对的列表，该列表随用户滚动而无限增长，
  在本实验的第 2 部分中，用户可以通过点击心形图标，添加或删除列表中收藏的单词对。<br><br>
  这两个类现在都如下所示：</p>

<?code-excerpt "lib/main.dart (RandomWordsWidget)" replace="/final wordPair = WordPair.random\(\);\n *return Text\(wordPair.asPascalCase\);/return Container();/g" indent-by="2"?>
  ```dart
  class RandomWords extends StatefulWidget {
    const RandomWords({super.key});

    @override
    State<RandomWords> createState() => _RandomWordsState();
  }

  class _RandomWordsState extends State<RandomWords> {
    @override
    Widget build(BuildContext context) {
      return Container();
    }
  }
  ```
</li>

<li markdown="1"> <p markdown="1">Update the `build()` method in `_RandomWordsState`:</p>
<p markdown="1">更新 `_RandomWordsState` 中的 `build()` 方法：</p>
  <?code-excerpt "lib/main.dart (_RandomWordsState)" title replace="/(\n  )(.*)/$1[!$2!]/g"?>
  ```dart
  class _RandomWordsState extends State<RandomWords> {
    [!@override!]
    [!Widget build(BuildContext context) {!]
    [!  final wordPair = WordPair.random();!]
    [!  return Text(wordPair.asPascalCase);!]
    [!}!]
  }
  ```
</li>

<li markdown="1"> <p markdown="1">Remove the word generation code from `MyApp`
  by making the changes shown in the following diff:</p>
  <p markdown="1">通过以下差异所示的更改，删除 `MyApp` 中单词生成的代码：</p>

  <?code-excerpt path-base="codelabs/startup_namer"?>
  <?code-excerpt "{step2_use_package,step3_stateful_widget}/lib/main.dart" to="}"?>
  ```diff
  --- step2_use_package/lib/main.dart
  +++ step3_stateful_widget/lib/main.dart
  @@ -14,16 +14,15 @@

     @override
     Widget build(BuildContext context) {
  -    final wordPair = WordPair.random();
       return MaterialApp(
         title: 'Welcome to Flutter',
         home: Scaffold(
           appBar: AppBar(
             title: const Text('Welcome to Flutter'),
           ),
  -        body: Center(
  -          child: Text(wordPair.asPascalCase),
  +        body: const Center(
  +          child: RandomWords(),
           ),
         ),
       );
     }
  ```

<li markdown="1"> <p markdown="1">Restart the app.
  The app should behave as before, displaying a word
  pairing each time you hot reload or save the app.</p>
  <p markdown="1">重启应用。
    应用应该像之前一样运行，每次热重载或保存应用程序时都会显示一个单词对。</p>
</li>


{{site.alert.tip}}

  If you see a warning on a hot reload that you might
  need to restart the app, consider restarting it.
  The warning might be a false positive, but
  restarting your app ensures that
  your changes are reflected in the app's UI.

  如果在热重载时看到需要您重启应用程序的警告，请考虑重新启动。
  该警告可能是误报，但重新启动您的应用程序可确保您的更改真实反映在应用程序的 UI 中。

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

In this step, you'll expand `_RandomWordsState` to generate
and display a list of word pairings. As the user scrolls the list
(displayed in a `ListView` widget) grows infinitely. `ListView`'s
`builder` factory constructor allows you to build a list view
lazily, on demand.

在该步骤中，您会拓展 `_RandomWordsState` 以生成并显示单词对列表。
随着用户滚动，列表（显示在 `ListView` widget 中）将无限增长。
`ListView` 的 `builder` 工厂构造函数使您可以按需延迟构建列表视图。

 1. Add a `_suggestions` list to the `_RandomWordsState`
    class for saving suggested word pairings. Also,
    add a `_biggerFont` variable for making the font size larger.

    向 `_RandomWordsState` 类中添加一个 `_suggestions` 列表以保存建议的单词对，
    同时，添加一个 `_biggerFont` 变量来增大字体大小。

    <?code-excerpt "lib/main.dart" title region="RWS-var" indent-by="2" replace="/final .*/[!$&!]/g"?>
    ```dart
      class _RandomWordsState extends State<RandomWords> {
        [!final _suggestions = <WordPair>[];!]
        [!final _biggerFont = const TextStyle(fontSize: 18);!]
        // ···
      }
    ```

 2. Next, you'll add a `ListView` widget to the
    `_RandomWordsState` class with the `ListView.builder` constructor.
    This method creates the `ListView` that displays the suggested word pairing.

    接下来，我们将向 `_RandomWordsState` 类添加一个 `_buildSuggestions()` 方法，
    此方法构建显示建议单词对的 `ListView`。

    The `ListView` class provides a builder property, `itemBuilder`,
    that's a factory builder and callback function specified as an
    anonymous function. Two parameters are passed to the
    function&mdash;the `BuildContext`, and the row iterator, `i`.
    The iterator begins at 0 and increments each time the function
    is called. It increments twice for every suggested word pairing:
    once for the ListTile, and once for the Divider.
    This model allows the suggested list to continue growing
    as the user scrolls.

    `ListView` 类提供了一个名为 `itemBuilder` 的 builder 属性，这是一个工厂匿名回调函数，
    接受两个参数 `BuildContext` 和行迭代器 `i`。迭代器从 0 开始，每调用一次该函数 `i` 就会自增，
    每次建议的单词对都会让其递增两次，一次是 ListTile，另一次是 Divider。
    它用于创建一个在用户滚动时候无限增长的列表。

 2. Return a `ListView` widget from the `build` method
    of the `_RandomWordsState` class using the `ListView.builder` constructor:
 
    使用 `ListView.builder` 构造函数，从 `_RandomWordsState`
    类的 `build` 方法中返回一个 `ListView` widget。

    <?code-excerpt "lib/main.dart (itemBuilder)" title replace="/ListTile([\S\s]*?)\);/Text(_suggestions[index].asPascalCase);/g" indent-by="2"?>
    ```dart
      return ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemBuilder: /*1*/ (context, i) {
          if (i.isOdd) return const Divider(); /*2*/

          final index = i ~/ 2; /*3*/
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10)); /*4*/
          }
          return Text(_suggestions[index].asPascalCase);
        },
      );
    ```

    {:.numbered-code-notes}
     1. The `itemBuilder` callback is called once per row,
        and places each suggestion into a `ListTile` row. For even rows, the
        function adds a `ListTile` row for the word pairing. For odd rows, the
        function adds a `Divider` widget to visually separate the entries. Note
        that the divider might be difficult to see on smaller devices.

        对于每个建议的单词对都会调用一次 `itemBuilder`，然后将单词对添加到 `ListTile` 行中。
        在偶数行，该函数会为单词对添加一个 `ListTile` row，
        在奇数行，该函数会添加一个分割线的 widget，来分隔相邻的词对。
        注意，在小屏幕上，分割线可能较难辨别。

     2. Add a one-pixel-high divider widget before each row in the `ListView`.

        在 `ListView` 里的每一行之前，添加一个 1 像素高的分隔线 widget。

     3. The expression `i ~/ 2` divides `i` by 2 and returns an integer result.
        For example: 1, 2, 3, 4, 5 becomes 0, 1, 1, 2, 2. This calculates the
        actual number of word pairings in the `ListView`, minus the divider
        widgets.

        语法 `i ~/ 2` 表示 `i` 除以 2，但返回值是整型（向下取整），
        比如 i 为：1, 2, 3, 4, 5 时，结果为 0, 1, 1, 2, 2，
        这个可以计算出 `ListView` 中减去分隔线后的实际单词对数量。

     4. If you've reached the end of the available word pairings,
        then generate 10 more and add them to the suggestions list.

        如果是建议列表中最后一个单词对，接着再生成 10 个单词对，然后添加到建议列表。

    The `ListView.builder` constructor creates and displays
    a `Text` widget once per word pairing.
    In the next step, you'll instead return each new pair as a `ListTile`,
    which allows you to make the rows more attractive in the next step.

    `ListView.builder` 的构造函数会为每个单词对创建并显示一个 `Text` widget，
    下一步里，你将可以为每个单词对返回一个 `ListTile` widget，这可以让每一行的显示更漂亮。

 3. Replace the returned `Text` in the `itemBuilder` body
    of the `ListView.builder` in `_RandomWordsState`
    with a `ListTile` displaying the suggestion:

    在 `_RandomWordsState` 类的 `ListView.builder` 里的
    `itemBuilder` 属性体里，将 `Text` 替换为 `ListTile` widget：

    <?code-excerpt "lib/main.dart (listTile)" title indent-by="2"?>
    ```dart
      return ListTile(
        title: Text(
          _suggestions[index].asPascalCase,
          style: _biggerFont,
        ),
      );
    ```

    A `ListTile` is a fixed height row that contains text
    as well as leading or trailing icons or other widgets.

    `ListTile` 是包含了文本以及前后位图标 widget 的一行。

 4. Once complete, the `build()` method in the `_RandomWordsState` class
    should match the following highlighted code:

    更新 `_RandomWordsState` 的 `build()` 方法以使用 _buildSuggestions()，
    而不是直接调用单词生成库，代码更改后如下：

    <?code-excerpt "lib/main.dart (build)" title region="RWS-build" replace="/(\n  )(return.*|  .*|\);)/$1[!$2!]/g" indent-by="2"?>
    ```dart
      @override
      Widget build(BuildContext context) {
        [!return ListView.builder(!]
        [!  padding: const EdgeInsets.all(16.0),!]
        [!  itemBuilder: /*1*/ (context, i) {!]
        [!    if (i.isOdd) return const Divider(); /*2*/!]

        [!    final index = i ~/ 2; /*3*/!]
        [!    if (index >= _suggestions.length) {!]
        [!      _suggestions.addAll(generateWordPairs().take(10)); /*4*/!]
        [!    }!]
        [!    return ListTile(!]
        [!      title: Text(!]
        [!        _suggestions[index].asPascalCase,!]
        [!        style: _biggerFont,!]
        [!      ),!]
        [!    );!]
        [!  },!]
        [!);!]
      }
    ```

 5. To put it all together, update the displayed title of the app
    by updating the `build()` method in the `MyApp` class
    and changing the title of the `AppBar`:

    更新 `MyApp` 的 `build()` 方法，修改 `title` 的值来改变标题，
    修改 `home` 的值为 `RandomWords` widget。

    <?code-excerpt path-base="codelabs/startup_namer"?>
    <?code-excerpt "{step3_stateful_widget,step4_infinite_list}/lib/main.dart" diff-u="4" from="class MyApp" to="}"?>
    ```diff
    --- step3_stateful_widget/lib/main.dart
    +++ step4_infinite_list/lib/main.dart
    @@ -14,12 +14,12 @@

       @override
       Widget build(BuildContext context) {
         return MaterialApp(
    -      title: 'Welcome to Flutter',
    +      title: 'Startup Name Generator',
           home: Scaffold(
             appBar: AppBar(
    -          title: const Text('Welcome to Flutter'),
    +          title: const Text('Startup Name Generator'),
             ),
             body: const Center(
               child: RandomWords(),
             ),
    @@ -27,18 +27,36 @@
         );
       }
     }

    -class RandomWords extends StatefulWidget {
    -  const RandomWords({super.key});
    +class _RandomWordsState extends State<RandomWords> {
    +  final _suggestions = <WordPair>[];
    +  final _biggerFont = const TextStyle(fontSize: 18);

       @override
    -  State<RandomWords> createState() => _RandomWordsState();
    +  Widget build(BuildContext context) {
    +    return ListView.builder(
    +      padding: const EdgeInsets.all(16.0),
    +      itemBuilder: /*1*/ (context, i) {
    +        if (i.isOdd) return const Divider(); /*2*/
    +
    +        final index = i ~/ 2; /*3*/
    +        if (index >= _suggestions.length) {
    +          _suggestions.addAll(generateWordPairs().take(10)); /*4*/
    +        }
    +        return ListTile(
    +          title: Text(
    +            _suggestions[index].asPascalCase,
    +            style: _biggerFont,
    +          ),
    +        );
    +      },
    +    );
    +  }
     }

    -class _RandomWordsState extends State<RandomWords> {
    +class RandomWords extends StatefulWidget {
    +  const RandomWords({super.key});
    +
       @override
    -  Widget build(BuildContext context) {
    -    final wordPair = WordPair.random();
    -    return Text(wordPair.asPascalCase);
    -  }
    +  State<RandomWords> createState() => _RandomWordsState();
     }
    ```

 6. Restart the app. You should see a list of word pairings no matter how far
    you scroll.

    重新启动你的项目工程应用，你应该看到一个单词对列表。
    尽可能地向下滚动，你将继续看到新的单词对。

    {% indent %}
      {% include docs/ios-windows-figure-pair.md image="step4-infinite-list.png" alt="App at completion of fourth step" %}
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

{% include docs/run-profile.md %}

## Next steps
{:.no_toc}

## 下一步
{:.no_toc}

{% include docs/app-figure.md class="site-image-right" img-class="border"
    image="get-started/startup-namer.gif" caption="The app from part 2" %}

Congratulations!

祝贺你！

You've written an interactive Flutter app that runs on iOS, Android, Windows and web.
In this codelab, you've:

你已经完成了一个可以同时运行在
iOS、Android、Windows 和 Web 平台的 Flutter 应用！
同时学习了如下内容：

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
[part 2][] on the
[Google Developers Codelabs][] site,
where you add the following functionality:

如果你想继续扩展你的应用，在这里进行 
[第二部分](https://codelabs.flutter-io.cn/codelabs/first-flutter-app-pt2-cn/index.html)，
你将会从以下方面修改你的应用：

* Implement interactivity by adding a clickable heart icon to save
  favorite pairings.

  为应用添加交互功能，一个能点击的小心心，来保存喜欢的公司名字；

* Implement navigation to a new route by adding a new screen
  containing the saved favorites.

  为应用添加一个新的页面（Route），查看收藏列表；

* Modify the theme color, making an all-white app.

  修改应用的主题，变成一个白色系的应用。

[an editor]: {{site.url}}/get-started/editor
[Building a web application with Flutter]: {{site.url}}/web
[DevTools]: {{site.url}}/development/tools/devtools
[enabled web]: {{site.url}}/get-started/web
[enforces privacy]: {{site.dart-site}}/guides/language/language-tour#libraries-and-visibility
[english_words]: {{site.pub}}/packages/english_words
[Flutter SDK]: {{site.url}}/get-started/install
[Getting Started with your first Flutter app]: {{site.url}}/get-started/test-drive#create-app
[Google Developers Codelabs]: {{site.codelabs}}
[hot reload]: {{site.url}}/get-started/test-drive
[in the way your IDE describes]: {{site.url}}/get-started/test-drive
[Icons]: https://fonts.google.com/icons
[Material]: {{site.material}}/guidelines
[Part 1]: {{site.codelabs}}/codelabs/first-flutter-app-pt1
[part 2]: {{site.codelabs}}/codelabs/first-flutter-app-pt2
[plugins installed for Flutter and Dart]: {{site.url}}/get-started/editor
[pub.dev]: {{site.pub}}
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[codelab-web]: {{site.url}}/get-started/codelab-web
[Windows]: {{site.url}}/get-started/install/windows#windows-setup
[Linux]: {{site.url}}/get-started/install/linux#linux-setup
[macOS]: {{site.url}}/get-started/install/macos#macos-setup
[Write a Flutter desktop application]: {{site.codelabs}}/codelabs/flutter-github-client
