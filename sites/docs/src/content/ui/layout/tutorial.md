---
# title: Build a Flutter layout
title: 构建 Flutter 布局
# shortTitle: Layout tutorial
shortTitle: 布局教程
# description: Learn how to build a layout in Flutter.
description: 学习如何在 Flutter 中构建布局。
tags: 用户界面,Flutter UI,布局
keywords: 布局教程,自动换行
ai-translated: true
---

:::secondary What you'll learn
* How to lay out widgets next to each other.
* How to add space between widgets.
* How adding and nesting widgets results in a Flutter layout.
:::

:::secondary 你将学到
* 如何将 widget 并排放置。
* 如何在 widget 之间添加间距。
* 如何通过添加与嵌套 widget 构成 Flutter 布局。
:::

This tutorial explains how to design and build layouts in Flutter.

本教程说明如何在 Flutter 中设计并构建布局。

If you use the example code provided, you can build the following app.

若使用提供的示例代码，你可以构建如下应用。

<DashImage figure img-class="site-mobile-screenshot border" image="ui/layout/layout-demo-app.png" caption="The finished app." width="50%" />

<figcaption class="figure-caption">

Photo by [Dino Reichmuth][ch-photo] on [Unsplash][].
Text by [Switzerland Tourism][].

图片来自 [Unsplash][] 上的 [Dino Reichmuth][ch-photo]。
文字来自 [Switzerland Tourism][]。

</figcaption>

To get a better overview of the layout mechanism, start with
[Flutter's approach to layout][].

要更好理解布局机制，请先阅读 [Flutter 的布局方法][Flutter's approach to layout]。

[Switzerland Tourism]: https://www.myswitzerland.com/en-us/destinations/lake-oeschinen
[Flutter's approach to layout]: /ui/layout

Consider how to position the components of your user interface.
A layout consists of the total end result of these positionings.
Consider planning your layout to speed up your coding.
Using visual cues to know where something goes on screen can be a great help.

考虑如何摆放用户界面各组件的位置。布局由这些摆放的最终结果构成。规划布局有助于加快编码。用视觉线索判断元素在屏幕上的位置会很有帮助。

Use whichever method you prefer, like an interface design tool or a pencil
and a sheet of paper. Figure out where you want to place elements on your
screen before writing code. It's the programming version of the adage:
"Measure twice, cut once."

你可用喜欢的方式，如界面设计工具或纸笔，在写代码前想好元素在屏幕上的位置。这是「量两次，裁一次」这句俗语在编程中的体现。

## Diagram the layout

## 绘制布局草图

In this section, consider what type of user experience you want for
your app users.

在本节中，考虑你希望为应用用户提供怎样的体验。

Consider how to position the components of your user interface.
A layout consists of the total end result of these positionings.
Consider planning your layout to speed up your coding.
Using visual cues to know where something goes on screen can be a great help.

考虑如何摆放用户界面各组件的位置。布局由这些摆放的最终结果构成。规划布局有助于加快编码。用视觉线索判断元素在屏幕上的位置会很有帮助。

Use whichever method you prefer, like an interface design tool or a pencil
and a sheet of paper. Figure out where you want to place elements on your
screen before writing code. It's the programming version of the adage:
"Measure twice, cut once."

你可用喜欢的方式，如界面设计工具或纸笔，在写代码前想好元素在屏幕上的位置。这是「量两次，裁一次」这句俗语在编程中的体现。

<ol>
<li>

Ask these questions to break the layout down to its basic elements.

用以下问题将布局分解为基本元素。

* Can you identify the rows and columns?
* Does the layout include a grid?
* Are there overlapping elements?
* Does the UI need tabs?
* What do you need to align, pad, or border?

* 能否识别出行与列？
* 布局是否包含网格？
* 是否有重叠元素？
* UI 是否需要标签页？
* 需要对齐、内边距或边框的是什么？

</li>

<li>

Identify the larger elements. In this example, you arrange the image, title,
buttons, and description into a column.

识别较大的元素。本例中，你将图片、标题、按钮和描述排成一列。

<DashImage figure img-class="site-mobile-screenshot border" image="ui/layout/layout-sketch-intro.svg" caption="Major elements in the layout: image, row, row, and text block" width="50%" />

</li>
<li>

Diagram each row.

绘制每一行。

<ol type="a">

<li>

Row 1, the **Title** section, has three children:
a column of text, a star icon, and a number.
Its first child, the column, contains two lines of text.
That first column might need more space.

第 1 行 **Title** 区域有三个子节点：一列文字、星形图标和一个数字。其第一个子节点（列）包含两行文字，该列可能需要更多空间。

<DashImage figure image="ui/layout/layout-sketch-title-block.svg" caption="Title section with text blocks and an icon" />

</li>

<li>

Row 2, the **Button** section, has three children: each child contains
a column which then contains an icon and text.

第 2 行 **Button** 区域有三个子节点：每个子节点包含一列，列内再有图标和文字。

<DashImage figure image="ui/layout/layout-sketch-button-block.svg" caption="The Button section with three labeled buttons" width="50%" />

  </li>

</ol>

</li>
</ol>

After diagramming the layout, consider how you would code it.

绘制布局草图后，考虑如何编码实现。

Would you write all the code in one class?
Or, would you create one class for each part of the layout?

你会把所有代码写在一个类里，还是为布局的每个部分各创建一个类？

To follow Flutter best practices, create one class, or Widget,
to contain each part of your layout.
When Flutter needs to re-render part of a UI,
it updates the smallest part that changes.
This is why Flutter makes "everything a widget".
If only the text changes in a `Text` widget, Flutter redraws only that text.
Flutter changes the least amount of the UI possible in response to user input.

遵循 Flutter 最佳实践时，为布局的每个部分创建一个类或 Widget。当 Flutter 需要重新渲染 UI 的某一部分时，只更新变化的最小部分。这就是 Flutter「万物皆 widget」的原因。若 `Text` widget 中只有文字变化，Flutter 只重绘该文字。Flutter 响应用户输入时尽可能少地改变 UI。

In this tutorial, write a widget for each element you identify.

本教程中，将你识别的每个元素写成各自的 widget。

## Create the app base code

## 创建应用基础代码

In this section, shell out the basic Flutter app code to start your app.

本节搭建启动应用所需的基础 Flutter 应用代码。

<?code-excerpt path-base="layout/base"?>

1. [Set up your Flutter environment][].

1. [Create a new Flutter app][new-flutter-app].

1. Replace the contents of `lib/main.dart` with the following code.
   This app uses a parameter for the app title and the title shown
   on the app's `appBar`. This decision simplifies the code.

   <?code-excerpt "lib/main.dart (all)"?>
   ```dart
   import 'package:flutter/material.dart';
   
   void main() => runApp(const MyApp());
   
   class MyApp extends StatelessWidget {
     const MyApp({super.key});
   
     @override
     Widget build(BuildContext context) {
       const String appTitle = 'Flutter layout demo';
       return MaterialApp(
         title: appTitle,
         home: Scaffold(
           appBar: AppBar(title: const Text(appTitle)),
           body: const Center(
             child: Text('Hello World'),
           ),
         ),
       );
     }
   }
   ```

[Set up your Flutter environment]: /install
[new-flutter-app]: /reference/create-new-app

1. [配置 Flutter 开发环境][Set up your Flutter environment]。

1. [创建新的 Flutter 应用][new-flutter-app]。

1. 将 `lib/main.dart` 的内容替换为以下代码。此应用使用参数设置应用标题以及在 `appBar` 中显示的标题，以简化代码。

## Add the Title section

## 添加标题区域

In this section, create a `TitleSection` widget that resembles
the following layout.

本节创建一个与下列布局相似的 `TitleSection` widget。

<?code-excerpt path-base="layout/lakes"?>

<DashImage figure image="ui/layout/layout-sketch-title-block-unlabeled.svg" caption="The Title section as sketch and prototype UI" />

### Add the `TitleSection` Widget

### 添加 `TitleSection` Widget

Add the following code after the `MyApp` class.

在 `MyApp` 类之后添加以下代码。

<?code-excerpt "step2/lib/main.dart (title-section)"?>
```dart
class TitleSection extends StatelessWidget {
  const TitleSection({super.key, required this.name, required this.location});

  final String name;
  final String location;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(32),
      child: Row(
        children: [
          Expanded(
            /*1*/
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /*2*/
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Text(
                    name,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                Text(location, style: TextStyle(color: Colors.grey[500])),
              ],
            ),
          ),
          /*3*/
          Icon(Icons.star, color: Colors.red[500]),
          const Text('41'),
        ],
      ),
    );
  }
}
```

{:.numbered-code-notes}

1. To use all remaining free space in the row, use the `Expanded` widget to
   stretch the `Column` widget.
   To place the column at the start of the row,
   set the `crossAxisAlignment` property to `CrossAxisAlignment.start`.
2. To add space between the rows of text, put those rows in a `Padding` widget.
3. The title row ends with a red star icon and the text `41`.
    The entire row falls inside a `Padding` widget and pads each edge
    by 32 pixels.

1. 要在行中使用所有剩余空闲空间，用 `Expanded` widget 拉伸 `Column` widget。要将列放在行首，将 `crossAxisAlignment` 设为 `CrossAxisAlignment.start`。
2. 要在文本行之间添加间距，将这些行放在 `Padding` widget 中。
3. 标题行以红色星形图标和文本 `41` 结束。整行位于 `Padding` widget 内，四边各留 32 像素内边距。

### Change the app body to a scrolling view

### 将应用 body 改为可滚动视图

In the `body` property, replace the `Center` widget with a
`SingleChildScrollView` widget.
Within the [`SingleChildScrollView`][] widget, replace the `Text` widget with a
`Column` widget.

在 `body` 属性中，将 `Center` widget 替换为 `SingleChildScrollView` widget。在 [`SingleChildScrollView`][] widget 内，将 `Text` widget 替换为 `Column` widget。

```dart diff
- body: const Center(
-   child: Text('Hello World'),
+ body: const SingleChildScrollView(
+   child: Column(
+     children: [
```

These code updates change the app in the following ways.

这些代码更新会以如下方式改变应用。

* A `SingleChildScrollView` widget can scroll.
  This allows elements that don't fit on the current screen to display.
* A `Column` widget displays any elements within its `children` property
  in the order listed.
  The first element listed in the `children` list displays at
  the top of the list. Elements in the `children` list display
  in array order on the screen from top to bottom.

* `SingleChildScrollView` widget 可以滚动，使放不进当前屏幕的元素得以显示。
* `Column` widget 按 `children` 属性中列出的顺序显示其中的元素。`children` 列表中的第一项显示在顶部，列表中的元素按数组顺序自上而下显示在屏幕上。

[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html

### Update the app to display the title section

### 更新应用以显示标题区域

Add the `TitleSection` widget as the first element in the `children` list.
This places it at the top of the screen.
Pass the provided name and location to the `TitleSection` constructor.

将 `TitleSection` widget 作为 `children` 列表的第一项添加，使其显示在屏幕顶部。将提供的名称和位置传给 `TitleSection` 构造函数。

```dart diff
+ children: [
+   TitleSection(
+     name: 'Oeschinen Lake Campground',
+     location: 'Kandersteg, Switzerland',
+   ),
+ ],
```

:::tip
* When pasting code into your app, indentation can become skewed.
  To fix this in your Flutter editor, use [automatic reformatting support][].
* To accelerate your development, try Flutter's [hot reload][] feature.
* If you have problems, compare your code to [`lib/main.dart`][].
:::

[automatic reformatting support]: /tools/formatting
[hot reload]: /tools/hot-reload
[`lib/main.dart`]: {{site.repo.this}}/blob/main/examples/layout/lakes/step2/lib/main.dart

:::tip
* 将代码粘贴到应用时，缩进可能错乱。在 Flutter 编辑器中使用[自动重新格式化支持][automatic reformatting support]可修复。
* 要加快开发，可尝试 Flutter 的[热重载][hot reload]功能。
* 若遇到问题，请将代码与 [`lib/main.dart`][] 对比。
:::

## Add the Button section

## 添加按钮区域

In this section, add the buttons that will add functionality to your app.

本节添加为应用增加功能的按钮。

<?code-excerpt path-base="layout/lakes/step3"?>

The **Button** section contains three columns that use the same layout:
an icon over a row of text.

**Button** 区域包含三列，使用相同布局：图标在上、文字在下。

<DashImage figure image="ui/layout/layout-sketch-button-block-unlabeled.svg" caption="The Button section as sketch and prototype UI" />

Plan to distribute these columns in one row so each takes the same
amount of space. Paint all text and icons with the primary color.

计划将这些列放在一行中，使每列占用相同空间。将所有文字和图标绘制为主题主色。

### Add the `ButtonSection` widget

### 添加 `ButtonSection` widget

Add the following code after the `TitleSection` widget to contain the code
to build the row of buttons.

在 `TitleSection` widget 之后添加以下代码，用于构建按钮行。

<?code-excerpt "lib/main.dart (button-start)"?>
```dart
class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});

  @override
  Widget build(BuildContext context) {
    final Color color = Theme.of(context).primaryColor;
    // ···
  }

}
```

### Create a widget to make buttons

### 创建用于制作按钮的 widget

As the code for each column could use the same syntax,
create a widget named `ButtonWithText`.
The widget's constructor accepts a color, icon data, and a label for the button.
Using these values, the widget builds a `Column` with an `Icon` and a stylized
`Text` widget as its children.
To help separate these children, a `Padding` widget the `Text` widget
is wrapped with a `Padding` widget.

由于每列代码可使用相同写法，创建一个名为 `ButtonWithText` 的 widget。其构造函数接受颜色、图标数据和按钮标签。widget 用这些值构建包含 `Icon` 和样式化 `Text` widget 的 `Column`。为分隔子节点，用 `Padding` widget 包裹 `Text` widget。

Add the following code after the `ButtonSection` class.

在 `ButtonSection` 类之后添加以下代码。

<?code-excerpt "lib/main.dart (button-with-text)"?>
```dart
class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});
  // ···
}

class ButtonWithText extends StatelessWidget {
  const ButtonWithText({
    super.key,
    required this.color,
    required this.icon,
    required this.label,
  });

  final Color color;
  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, color: color),
        Padding(
          padding: const EdgeInsets.only(top: 8),
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

### Position the buttons with a `Row` widget

### 用 `Row` widget 摆放按钮

Add the following code into the `ButtonSection` widget.

将以下代码添加到 `ButtonSection` widget 中。

1. Add three instances of the `ButtonWithText` widget, once for each button.
1. Pass the color, `Icon`, and text for that specific button.
1. Align the columns along the main axis with the
   `MainAxisAlignment.spaceEvenly` value.
   The main axis for a `Row` widget is horizontal and the main axis for a
   `Column` widget is vertical.
   This value, then, tells Flutter to arrange the free space in equal amounts
   before, between, and after each column along the `Row`.

1. 为每个按钮各添加一个 `ButtonWithText` widget 实例。
1. 传入该按钮对应的颜色、`Icon` 和文字。
1. 用 `MainAxisAlignment.spaceEvenly` 沿主轴对齐各列。`Row` widget 的主轴是水平的，`Column` widget 的主轴是垂直的。该值告诉 Flutter 在 `Row` 上于各列之前、之间和之后均分空闲空间。

<?code-excerpt "lib/main.dart (button-section)"?>
```dart
class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});

  @override
  Widget build(BuildContext context) {
    final Color color = Theme.of(context).primaryColor;
    return SizedBox(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ButtonWithText(color: color, icon: Icons.call, label: 'CALL'),
          ButtonWithText(color: color, icon: Icons.near_me, label: 'ROUTE'),
          ButtonWithText(color: color, icon: Icons.share, label: 'SHARE'),
        ],
      ),
    );
  }

}

class ButtonWithText extends StatelessWidget {
  const ButtonWithText({
    super.key,
    required this.color,
    required this.icon,
    required this.label,
  });

  final Color color;
  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      // ···
    );
  }
}
```

### Update the app to display the button section

### 更新应用以显示按钮区域

Add the button section to the `children` list.

将按钮区域添加到 `children` 列表。

<?code-excerpt path-base="layout/lakes"?>

```dart diff
    TitleSection(
      name: 'Oeschinen Lake Campground',
      location: 'Kandersteg, Switzerland',
    ),
+   ButtonSection(),
  ],
```

## Add the Text section

## 添加文本区域

In this section, add the text description to this app.

本节为应用添加文字描述。

<DashImage figure image="ui/layout/layout-sketch-add-text-block.svg" caption="The text block as sketch and prototype UI" />

<?code-excerpt path-base="layout/lakes"?>

### Add the `TextSection` widget

### 添加 `TextSection` widget

Add the following code as a separate widget after the `ButtonSection` widget.

在 `ButtonSection` widget 之后作为独立 widget 添加以下代码。

<?code-excerpt "step4/lib/main.dart (text-section)"?>
```dart
class TextSection extends StatelessWidget {
  const TextSection({super.key, required this.description});

  final String description;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(32),
      child: Text(description, softWrap: true),
    );
  }
}
```

By setting [`softWrap`][] to `true`, text lines fill the column width before
wrapping at a word boundary.

将 [`softWrap`][] 设为 `true` 时，文字行会先填满列宽，再在词边界处换行。

[`softWrap`]: {{site.api}}/flutter/widgets/Text/softWrap.html

### Update the app to display the text section

### 更新应用以显示文本区域

Add a new `TextSection` widget as a child after the `ButtonSection`.
When adding the `TextSection` widget, set its `description` property to
the text of the location description.

在 `ButtonSection` 之后添加新的 `TextSection` widget 作为子节点。添加 `TextSection` widget 时，将其 `description` 属性设为地点描述文字。

```dart diff
      location: 'Kandersteg, Switzerland',
    ),
    ButtonSection(),
+   TextSection(
+     description:
+         'Lake Oeschinen lies at the foot of the Blüemlisalp in the '
+         'Bernese Alps. Situated 1,578 meters above sea level, it '
+         'is one of the larger Alpine Lakes. A gondola ride from '
+         'Kandersteg, followed by a half-hour walk through pastures '
+         'and pine forest, leads you to the lake, which warms to 20 '
+         'degrees Celsius in the summer. Activities enjoyed here '
+         'include rowing, and riding the summer toboggan run.',
+   ),
  ],
```

## Add the Image section

## 添加图片区域

In this section, add the image file to complete your layout.

本节添加图片文件以完成布局。

### Configure your app to use supplied images

### 配置应用以使用提供的图片

To configure your app to reference images, modify its `pubspec.yaml` file.

要配置应用引用图片，请修改其 `pubspec.yaml` 文件。

1. Create an `images` directory at the top of the project.

1. 在项目顶层创建 `images` 目录。

1. Download the [`lake.jpg`][] image and add it to the new `images` directory.

1. 下载 [`lake.jpg`][] 图片并添加到新的 `images` 目录。

   :::note
   You can't use `wget` to save this binary file.
   You can download the [image][ch-photo] from [Unsplash][]
   under the Unsplash License. The small size comes in at 94.4 kB.
   :::

   :::note
   你不能用 `wget` 保存此二进制文件。可在 [Unsplash][] 上按 Unsplash 许可下载[图片][ch-photo]。小尺寸约为 94.4 kB。
   :::

1. To include images, add an `assets` tag to the `pubspec.yaml` file
   at the root directory of your app.
   When you add `assets`, it serves as the set of pointers to the images
   available to your code.

1. 要包含图片，在应用根目录的 `pubspec.yaml` 文件中添加 `assets` 标签。添加 `assets` 后，它作为代码可用图片的指针集合。

   ```yaml title="pubspec.yaml" diff
     flutter:
       uses-material-design: true
   +   assets:
   +     - images/lake.jpg
   ```

:::tip
Text in the `pubspec.yaml` respects whitespace and text case.
Write the changes to the file as given in the previous example.

This change might require you to restart the running program to
display the image.
:::

:::tip
`pubspec.yaml` 中的文字区分空白和大小写。请按上一示例所示修改文件。此更改可能需要重启正在运行的程序才能显示图片。
:::

[`lake.jpg`]: https://raw.githubusercontent.com/flutter/website/main/examples/layout/lakes/step5/images/lake.jpg

### Create the `ImageSection` widget

### 创建 `ImageSection` widget

Define the following `ImageSection` widget after the other declarations.

在其他声明之后定义以下 `ImageSection` widget。

<?code-excerpt "step5/lib/main.dart (image-section)"?>
```dart
class ImageSection extends StatelessWidget {
  const ImageSection({super.key, required this.image});

  final String image;

  @override
  Widget build(BuildContext context) {
    return Image.asset(image, width: 600, height: 240, fit: BoxFit.cover);
  }
}
```

The `BoxFit.cover` value tells Flutter to display the image with
two constraints. First, display the image as small as possible.
Second, cover all the space that the layout allotted, called the render box.

`BoxFit.cover` 值告诉 Flutter 在两项约束下显示图片：首先尽可能小地显示图片；其次覆盖布局分配的全部空间，即 render box。

### Update the app to display the image section

### 更新应用以显示图片区域

Add an `ImageSection` widget as the first child in the `children` list.
Set the `image` property to the path of the image you added in
[Configure your app to use supplied images](#configure-your-app-to-use-supplied-images).

将 `ImageSection` widget 作为 `children` 列表的第一项添加。将 `image` 属性设为你于[配置应用以使用提供的图片](#configure-your-app-to-use-supplied-images)中添加的图片路径。

```dart diff
  children: [
+   ImageSection(
+     image: 'images/lake.jpg',
+   ),
    TitleSection(
      name: 'Oeschinen Lake Campground',
      location: 'Kandersteg, Switzerland',
```

## Congratulations

## 恭喜

That's it! When you hot reload the app, your app should look like this.

就是这样！热重载应用后，应用应如下所示。

<DashImage figure img-class="site-mobile-screenshot border" image="ui/layout/layout-demo-app.png" caption="The finished app" width="50%" />

## Resources

## 资源

You can access the resources used in this tutorial from these locations:

可从以下位置访问本教程使用的资源：

**Dart code:** [`main.dart`][]<br>
**Image:** [ch-photo][]<br>
**Pubspec:** [`pubspec.yaml`][]<br>

[`main.dart`]: {{site.repo.this}}/blob/main/examples/layout/lakes/step6/lib/main.dart
[ch-photo]: https://unsplash.com/photos/red-and-gray-tents-in-grass-covered-mountain-5Rhl-kSRydQ
[`pubspec.yaml`]: {{site.repo.this}}/blob/main/examples/layout/lakes/step6/pubspec.yaml

## Next Steps

## 下一步

To add interactivity to this layout, follow the
[interactivity tutorial][].

要为该布局添加交互性，请参阅[交互性教程][interactivity tutorial]。

[interactivity tutorial]: /ui/interactivity
[Unsplash]: https://unsplash.com
