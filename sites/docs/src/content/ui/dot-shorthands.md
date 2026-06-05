---
# title: "Dot shorthands in Flutter"
title: "Flutter 中的点简写"
# description: "Learn how to use Dart's dot shorthands to write cleaner, concise Flutter code."
description: "了解如何使用 Dart 的点简写编写更简洁、更清爽的 Flutter 代码。"
ai-translated: true
---

The **dot shorthands** feature allows you to omit the explicit type when
accessing static members, constructors, or enum values, provided the compiler
can infer the type from the surrounding context.

**点简写**（dot shorthands）特性让你在访问静态成员、构造函数或枚举值时省略显式类型，前提是编译器能从周围上下文推断出类型。

:::note
For a technical overview of this feature, refer to the
[Dot Shorthands guide](https://dart.dev/language/dot-shorthand) in the Dart
documentation.
:::

:::note
如需该特性的技术概览，请参阅 Dart 文档中的
[点简写指南](https://dart.dev/language/dot-shorthand)。
:::

## Why dot shorthands matter

## 为什么点简写很重要

Building layouts in Flutter often involves deeply nested widget trees.
Historically, this meant repeatedly typing explicit class and enum names for
properties like colors, typography, and alignment. Dot shorthands reduces this
boilerplate, making your code easier to read and faster to write.

在 Flutter 中构建布局通常涉及深度嵌套的 widget 树。
以往这意味着需要为颜色、排版、对齐等属性反复输入显式的类和枚举名称。
点简写减少了这类样板代码，让你的代码更易读、写得更快。

Here is a side-by-side comparison of building a simple `Container`:

下面是通过构建一个简单的 `Container` 进行的并排对比：

### Without dot shorthands

### 不使用点简写

```dart
Container(
  alignment: Alignment.center,
  padding: const EdgeInsets.all(16.0),
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        'Hello World',
        style: TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
    ],
  ),
);
```

### With dot shorthands

### 使用点简写

```dart
Container(
  alignment: .center, // Instead of Alignment.center,
  padding: const .all(16.0), // Instead of EdgeInsets.all(16.0)
  child: Column(
    mainAxisAlignment: .center, // Instead of MainAxisAlignment.center
    crossAxisAlignment: .start, // Instead of CrossAxisAlignment.start
    children: [
      Text(
        'Hello World',
        style: TextStyle(
          fontWeight: .bold, // Instead of FontWeight.bold
        ),
      ),
    ],
  ),
);
```

## Where to use dot shorthands

## 在哪里使用点简写

Dot shorthands work anywhere the Dart compiler has a clear "context type",
meaning it knows exactly what type it expects. In Flutter, this is almost
everywhere inside a widget's property list.


只要 Dart 编译器有明确的「上下文类型」（context type），即它确切知道期望的类型，点简写就可以使用。
在 Flutter 中，这几乎适用于 widget 属性列表内的所有位置。

The most common targets for dot shorthands in Flutter are:

在 Flutter 中，点简写最常见的目标包括：

*   **Enums**: `MainAxisAlignment`, `CrossAxisAlignment`, `BoxFit`, `TextDirection`.


  **枚举**：`MainAxisAlignment`、`CrossAxisAlignment`、`BoxFit`、`TextDirection`。

*   **Static properties and methods**: `FontWeight` (constants like `.bold`). 


  **静态属性和方法**：`FontWeight`（如 `.bold` 等常量）。

*   **Constructors**: `EdgeInsets.all()`, `BorderRadius.circular()`.


  **构造函数**：`EdgeInsets.all()`、`BorderRadius.circular()`。

### Example: enums

### 示例：枚举

When a property expects an `enum`, such as `mainAxisAlignment`, you can omit the
enum's name and just provide the value preceded by a dot (`.`):

当某个属性期望 `enum` 类型（例如 `mainAxisAlignment`）时，你可以省略枚举名，只提供以点（`.`）开头的值：

```dart
Row(
  mainAxisAlignment: .spaceEvenly, // Infers MainAxisAlignment.spaceEvenly
  children: [ /* ... */ ],
)
```

### Example: static properties

### 示例：静态属性

Static properties work when the context type is exactly the class that defines the property. A common example is text styling with `FontWeight`:

当上下文类型恰好是定义该属性的类时，静态属性即可使用点简写。常见示例是用 `FontWeight` 设置文本样式：

```dart
Text(
  'Feature highlights',
  style: TextStyle(
    fontWeight: .bold, // Infers FontWeight.bold
  ),
)
```

### Example: constructors

### 示例：构造函数

You can also use dot shorthands for named constructors. Many Flutter layout properties accept a base class like `EdgeInsetsGeometry`. To support dot shorthands, Flutter adds redirecting constructors to these base classes that point to the appropriate subclasses.

你也可以对命名构造函数使用点简写。许多 Flutter 布局属性接受 `EdgeInsetsGeometry` 等基类。
为支持点简写，Flutter 在这些基类上添加了重定向构造函数，指向相应的子类。

```dart
Padding(
  padding: .symmetric(horizontal: 16.0, vertical: 8.0), // Infers EdgeInsetsGeometry.symmetric
  child: Text('Spaced out text'),
)
```

You can even use `.new` to call an unnamed constructor, though this is less
common in standard widget trees:

你甚至可以使用 `.new` 调用未命名构造函数，不过在标准 widget 树中较少见：

```dart
class _MyState extends State<MyWidget> {
  final ScrollController _scrollController = .new(); // Infers ScrollController()
  // ...
}
```
