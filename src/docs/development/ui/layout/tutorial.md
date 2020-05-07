---
title: Building layouts
title: 布局构建教程
short-title: Tutorial
short-title: 布局教程
description: Learn how to build a layout.
description: 学习如何在 Flutter 里构建布局。
diff2html: true
---

{% assign api = '{{site.api}}/flutter' -%}
{% capture examples -%} {{site.repo.this}}/tree/{{site.branch}}/examples {%- endcapture -%}
{% assign rawExFile = 'https://raw.githubusercontent.com/flutter/website/master/examples' -%}
{% capture demo -%} {{site.repo.flutter}}/tree/{{site.branch}}/examples/flutter_gallery/lib/demo {%- endcapture -%}

<style>dl, dd { margin-bottom: 0; }</style>

{{site.alert.secondary}}
  <h4 class="no_toc">What you’ll learn</h4>

  <h4 class="no_toc">你将会学习到</h4>

  * How Flutter's layout mechanism works.

    Flutter 的布局机制是如何工作的。

  * How to lay out widgets vertically and horizontally.

    如何竖直或者水平地对 widgets 进行布局。

  * How to build a Flutter layout.

    如何构建一个 Flutter 布局。

{{site.alert.end}}

This is a guide to building layouts in Flutter.
You'll build the layout for the following app:

这是一份如何在 Flutter 中构建布局的指南。你将为如下 app 创建布局：

{% include app-figure.md img-class="site-mobile-screenshot border"
    image="ui/layout/lakes.jpg" caption="The finished app" %}

This guide then takes a step back to explain Flutter's
approach to layout, and shows how to place a single widget
on the screen. After a discussion of how to lay widgets
out horizontally and vertically, some of the most common
layout widgets are covered.

这份指南之前溯源一步解释了 Flutter 中的布局方式，以及展示了如何在屏幕中放置单个 widget。
经过了如何水平以及竖直放置 widgets 的讨论之后，一些最常使用的 widgets 都涉及到了。

If you want a "big picture" understanding of the layout mechanism,
start with [Flutter's approach to layout][].

如果你想对布局机制有个"全局"的理解，可以先从 [Flutter 中的布局](/docs/development/ui/layout) 开始.

## Step 0: Create the app base code

## 第一步: 创建 app 基础代码

Make sure to [set up][] your environment,
then do the following:

确保你已经 [安装和配置][set up] 好了你的环境，
然后做如下步骤：

 1. [Create a basic "Hello World" Flutter app][hello-world].

    [创建一个简单的 Flutter app ——"Hello World"][hello-world]。

 2. Change the app bar title and the app title as follows:

    按照如下方法修改 app 标题栏的标题以及 app 的标题：

    <?code-excerpt "{codelabs/startup_namer/step1_base,layout/base}/lib/main.dart"?>
    ```diff
    --- codelabs/startup_namer/step1_base/lib/main.dart
    +++ layout/base/lib/main.dart
    @@ -10,10 +10,10 @@
       @override
       Widget build(BuildContext context) {
         return MaterialApp(
    -      title: 'Welcome to Flutter',
    +      title: 'Flutter layout demo',
           home: Scaffold(
             appBar: AppBar(
    -          title: Text('Welcome to Flutter'),
    +          title: Text('Flutter layout demo'),
             ),
             body: Center(
               child: Text('Hello World'),
    ```

## Step 1: Diagram the layout

## 第一步: 对布局进行图形分解

The first step is to break the layout down to its basic elements:

第一步需要将布局分解成它的各个基础元素：

* Identify the rows and columns.

  识别出它的行和列。

* Does the layout include a grid?

  这个布局是否包含网格布局？

* Are there overlapping elements?

  是否有重叠的元素？

* Does the UI need tabs?

  界面是否需要选项卡？

* Notice areas that require alignment, padding, or borders.

  留意需要对齐、内间距、或者边界的区域。

First, identify the larger elements. In this example,
four elements are arranged into a column: an image, two rows, and a block of text.  

首先，识别出稍大的元素。在这个例子中，四个元素排成一列：一个图像，两个行区域，和一个文本区域。

{% include app-figure.md img-class="site-mobile-screenshot border"
    image="ui/layout/lakes-column-elts.png" caption="Column elements (circled in red)" %}

Next, diagram each row. The first row, called the Title
section, has 3 children: a column of text, a star icon,
and a number. Its first child, the column, contains 2 lines of text.
That first column takes a lot of space, so it must be wrapped in an
Expanded widget.

接着，对每一行进行图解。第一行，也就是标题区域，
有三个子元素：一个文本列，一个星形图标，和一个数字。
它的第一个子元素，文本列，包含两行文本。
第一列占据大量空间，因此它应当被封装在一个 Expanded widget 当中。

{% include app-figure.md image="ui/layout/title-section-parts.png" alt="Title section" %}

The second row, called the Button section, also has
3 children: each child is a column that contains an icon and text.

第二行，也就是按钮区域，同样有三个子元素：每个子元素是一个包含图标和文本的列。

{% include app-figure.md image="ui/layout/button-section-diagram.png" alt="Button section" %}

Once the layout has been diagrammed, it's easiest to
take a bottom-up approach to implementing it.
To minimize the visual confusion of deeply nested layout code,
place some of the implementation in variables and functions.

一旦图解好布局，采取自下而上的方法来实现它就变得尤为轻松了。
为了最大程度减少，深层嵌套的布局代码带来的视觉混乱，需要用一些变量和函数来替代某些实现。

## Step 2: Implement the title row

## 第二步: 实现标题行

<?code-excerpt path-base="layout/lakes/step2"?>

First, you'll build the left column in the title section.
Add the following code at the top of the `build()`
method of the `MyApp` class:

首先，你可以构建标题部分左侧列。添加如下代码到 `MyApp` 类的 `build()` 方法内顶部。

<?code-excerpt "lib/main.dart (titleSection)" title?>
```dart
Widget titleSection = Container(
  padding: const EdgeInsets.all(32),
  child: Row(
    children: [
      Expanded(
        /*1*/
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /*2*/
            Container(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                'Oeschinen Lake Campground',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Text(
              'Kandersteg, Switzerland',
              style: TextStyle(
                color: Colors.grey[500],
              ),
            ),
          ],
        ),
      ),
      /*3*/
      Icon(
        Icons.star,
        color: Colors.red[500],
      ),
      Text('41'),
    ],
  ),
);
```

{:.numbered-code-notes}
 1. Putting a `Column` inside an `Expanded` widget stretches
    the column to use all remaining free space in the row.
    Setting the `crossAxisAlignment` property to
    `CrossAxisAlignment.start` positions the column at
    the start of the row.

    将 Column 元素放到 Expanded widget 中可以拉伸该列，以利用该行中所有剩余的闲置空间。
    设置 `crossAxisAlignment` 属性值为 `CrossAxisAlignment.start`，
    这会将该列放置在行的起始位置。

 2. Putting the first row of text inside a `Container`
    enables you to add padding. The second child in the
    `Column`, also text, displays as grey.

    将第一行文本放入 Container 容器中使得你可以增加内间距。
    列中的第二个子元素，同样为文本，显示为灰色。

 3. The last two items in the title row are a star icon,
    painted red, and the text "41". The entire row is in
    a `Container` and padded along each edge by 32 pixels.
    Add the title section to the app body like this:

    标题行中的最后两项是一个红色星形图标，和文字"41"。
    整行都在一个 Container 容器布局中，而且每条边都有 32 像素的内间距。

Add the title section to the app body like this:

如下添加标题部分到 app body 中：

<?code-excerpt path-base="layout/lakes"?>
<?code-excerpt "{../base,step2}/lib/main.dart" from="return MaterialApp"?>
```diff
--- ../base/lib/main.dart
+++ step2/lib/main.dart
@@ -12,11 +46,13 @@
     return MaterialApp(
       title: 'Flutter layout demo',
       home: Scaffold(
         appBar: AppBar(
           title: Text('Flutter layout demo'),
         ),
-        body: Center(
-          child: Text('Hello World'),
+        body: Column(
+          children: [
+            titleSection,
+          ],
         ),
       ),
     );
```

{{site.alert.tip}}
  * When pasting code into your app, indentation can
    become skewed. You can fix this in your Flutter editor
    using the [automatic reformatting support][].

    在粘贴代码到你的 app 中时，行首缩进可能会发生偏移。
    你可以通过使用 [代码自动格式化][automatic reformatting support] 来修复这个问题。

  - For a faster development experience,
    try Flutter's [hot reload][] feature.

    为了获得更便捷的开发体验，请尝试 Flutter 的 [热重载][hot reload] 功能。

  - If you have problems, compare your code to [`lib/main.dart`][].

    如果你有任何问题，可以将你的代码与 [`lib/main.dart`][] 比对.

{{site.alert.end}}

## Step 3: Implement the button row

## 第三步: 实现按钮行

<?code-excerpt path-base="layout/lakes/step3"?>

The button section contains 3 columns that use the same
layout&mdash;an icon over a row of text.
The columns in this row are evenly spaced,
and the text and icons are painted with the primary color.

按钮区域包含三列使用相同布局－一行文本上面一个图标。此行的各列被等间隙放置，文本和图标被着以初始色。

Since the code for building each column is almost identical,
create a private helper method named `buildButtonColumn()`,
which takes a color, an `Icon` and `Text`,
and returns a column with its widgets painted in the given color.

由于构建每列的代码基本相同，因此可以创建一个名为 `buildButtonColumn()` 的私有辅助函数，
以颜色、图标和文本为入参，返回一个以指定颜色绘制自身 widgets 的一个 column 列对象。

<?code-excerpt "lib/main.dart (_buildButtonColumn)" title?>
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // ···
  }

  Column _buildButtonColumn(Color color, IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, color: color),
        Container(
          margin: const EdgeInsets.only(top: 8),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: color,
            ),
          ),
        ),
      ],
    );
  }
}
```

The function adds the icon directly to the column.
The text is inside a `Container` with a top-only margin,
separating the text from the icon.

这个函数直接将图标添加到这列里。
文本在以一个仅有上间距的 Container 容器中，
使得文本与图标分隔开。

Build the row containing these columns by calling the
function and passing the color, `Icon`, and text specific
to that column. Align the columns along the main axis
using `MainAxisAlignment.spaceEvenly` to arrange the
free space evenly before, between, and after each column.
Add the following code just below the
`titleSection` declaration inside the `build()` method:

通过调用函数并传递针对某列的颜色，`Icon` 图标和文本，来构建包含这些列的行。
然后在行的主轴方向通过使用 `MainAxisAlignment.spaceEvenly` ，将剩余的空间均分到每列各自的前后及中间。
只需在 `build()` 方法中的 `titleSection` 声明下添加如下代码：

<?code-excerpt "lib/main.dart (buttonSection)" title?>
```dart
Color color = Theme.of(context).primaryColor;

Widget buttonSection = Container(
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      _buildButtonColumn(color, Icons.call, 'CALL'),
      _buildButtonColumn(color, Icons.near_me, 'ROUTE'),
      _buildButtonColumn(color, Icons.share, 'SHARE'),
    ],
  ),
);
```

Add the button section to the body:

添加按钮部分到 body 属性中去：

<?code-excerpt path-base="layout/lakes"?>
<?code-excerpt "{step2,step3}/lib/main.dart" from="return MaterialApp" to="}"?>
```diff
--- step2/lib/main.dart
+++ step3/lib/main.dart
@@ -46,3 +59,3 @@
     return MaterialApp(
       title: 'Flutter layout demo',
       home: Scaffold(
@@ -52,8 +65,9 @@
         body: Column(
           children: [
             titleSection,
+            buttonSection,
           ],
         ),
       ),
     );
   }
```

## Step 4: Implement the text section

## 第四步: 实现文本区域

<?code-excerpt path-base="layout/lakes/step4"?>

Define the text section as a variable. Put the text
in a `Container` and add padding along each edge.
Add the following code just below the `buttonSection`
declaration:

将文本区域定义为一个变量。将文本放置到一个 Container 容器中，然后为每条边添加内边距。
只需在 `buttonSection` 声明下添加如下代码：

<?code-excerpt "lib/main.dart (textSection)" title?>
```dart
Widget textSection = Container(
  padding: const EdgeInsets.all(32),
  child: Text(
    'Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese '
        'Alps. Situated 1,578 meters above sea level, it is one of the '
        'larger Alpine Lakes. A gondola ride from Kandersteg, followed by a '
        'half-hour walk through pastures and pine forest, leads you to the '
        'lake, which warms to 20 degrees Celsius in the summer. Activities '
        'enjoyed here include rowing, and riding the summer toboggan run.',
    softWrap: true,
  ),
);
```

By setting `softwrap` to true, text lines will fill the column width before
wrapping at a word boundary.

通过设置 `softwrap` 为 true，文本将在填充满列宽后在单词边界处自动换行。

Add the text section to the body:

添加文本部分到 body 属性：

<?code-excerpt path-base="layout/lakes"?>
<?code-excerpt "{step3,step4}/lib/main.dart" from="return MaterialApp"?>
```diff
--- step3/lib/main.dart
+++ step4/lib/main.dart
@@ -59,3 +72,3 @@
     return MaterialApp(
       title: 'Flutter layout demo',
       home: Scaffold(
@@ -66,6 +79,7 @@
           children: [
             titleSection,
             buttonSection,
+            textSection,
           ],
         ),
       ),
```

## Step 5: Implement the image section

## 第五步: 实现图片区域

Three of the four column elements are now complete,
leaving only the image. Add the image file to the example:

四个列元素中的三个已经完成了，只剩下图片部分了。如下添加图片文件到示例工程中：

* Create an `images` directory at the top of the project.
* Add [`lake.jpg`][].

  添加 [`lake.jpg`][]

{{site.alert.info}}

  Note that `wget` doesn't work for saving this binary file.
  The original image is [available online][] under a
  Creative Commons license, but it's large and slow to fetch.
  
  注意 `wget` 不能保存二进制文件。
  原始的图片虽然可以在 Creative Commons 许可下 [在线获取][available online]，
  但是文件较大，下载缓慢。
  
{{site.alert.end}}

* Update the `pubspec.yaml` file to include an `assets` tag.
  This makes the image available to your code.

  更新 `pubspec.yaml` 文件，添加一个 `assets` 标签。
  这使得在你的代码中可以访问到该图片。

  <?code-excerpt "{step4,step5}/pubspec.yaml"?>
  ```diff
  --- step4/pubspec.yaml
  +++ step5/pubspec.yaml
  @@ -17,3 +17,5 @@

   flutter:
     uses-material-design: true
  +  assets:
  +    - images/lake.jpg
  ```
{{site.alert.tip}}
  * Note that `pubspec.yaml` is case sensitive,
    so write `assets:` and the image URL
    as shown above.
  * The pubspec file is also sensitive to white
    space, so use proper indentation.
{{site.alert.end}}

Now you can reference the image from your code:

现在你可以在你的代码中引用该图片了：

<?code-excerpt "{step4,step5}/lib/main.dart"?>
```diff
--- step4/lib/main.dart
+++ step5/lib/main.dart
@@ -77,6 +77,12 @@
         ),
         body: Column(
           children: [
+            Image.asset(
+              'images/lake.jpg',
+              width: 600,
+              height: 240,
+              fit: BoxFit.cover,
+            ),
             titleSection,
             buttonSection,
             textSection,
```

`BoxFit.cover` tells the framework that the image should
be as small as possible but cover its entire render box.

`BoxFit.cover` 告诉系统图片应当尽可能等比缩小到刚好能够覆盖住整个渲染 box。

## Step 6: Final touch

## 第六步: 最终的收尾

In this final step, arrange all of the elements in a
`ListView`, rather than a `Column`, because a
`ListView` supports app body scrolling when the app is run
on a small device.

在最后的步骤中，需要在一个 `ListView` 中排列好所有的元素，而不是在一个 `Column` 中，
因为当 app 运行在某个小设备上时，`ListView` 支持 app body 的滚动。

<?code-excerpt "{step5,step6}/lib/main.dart" diff-u="6" from="return MaterialApp"?>
```diff
--- step5/lib/main.dart
+++ step6/lib/main.dart
@@ -72,13 +77,13 @@
     return MaterialApp(
       title: 'Flutter layout demo',
       home: Scaffold(
         appBar: AppBar(
           title: Text('Flutter layout demo'),
         ),
-        body: Column(
+        body: ListView(
           children: [
             Image.asset(
               'images/lake.jpg',
               width: 600,
               height: 240,
               fit: BoxFit.cover,
```

**Dart code:** [`main.dart`][]<br>
**Image:** [images][]<br>
**Pubspec:** [`pubspec.yaml`][]<br>

That's it! When you hot reload the app,
you should see the same app layout as
the screenshot at the top of this page.

大功告成！当你热加载 app 时，你应当可以看到和本页开头截图一样的 app 布局了。

You can add interactivity to this layout by following
[Adding Interactivity to Your Flutter App][].

你可以参考文档
[为你的 Flutter 应用加入交互体验][Adding Interactivity to Your Flutter App] 
来给这个布局增加交互。

[Adding Interactivity to Your Flutter App]: /docs/development/ui/interactive
[automatic reformatting support]: /docs/development/tools/formatting
[available online]: https://images.unsplash.com/photo-1471115853179-bb1d604434e0?dpr=1&amp;auto=format&amp;fit=crop&amp;w=767&amp;h=583&amp;q=80&amp;cs=tinysrgb&amp;crop=
[Flutter's approach to layout]: /docs/development/ui/layout
[hello-world]: /docs/get-started/codelab#step-1-create-the-starter-flutter-app
[images]: {{examples}}/layout/lakes/step6/images
[`lake.jpg`]: {{rawExFile}}/layout/lakes/step5/images/lake.jpg
[`lib/main.dart`]: {{examples}}/layout/lakes/step2/lib/main.dart
[hot reload]: /docs/development/tools/hot-reload
[`main.dart`]: {{examples}}/layout/lakes/step6/lib/main.dart
[`pubspec.yaml`]: {{examples}}/layout/lakes/step6/pubspec.yaml
[set up]: /docs/get-started/install
[hot reload]: /docs/development/tools/hot-reload
[lib/main.dart]: {{examples}}/layout/lakes/step2/lib/main.dart

