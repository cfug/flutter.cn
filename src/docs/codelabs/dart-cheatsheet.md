---
title: Dart cheatsheet codelab
title: Dart 速查表 codelab
description: Interactively learn (or relearn) some of Dart's unique features.
description: 用交互的形式学习（或回顾）Dart 的独特之处。
toc: false
---

<style>
  iframe {
    border: 1px solid #ccc;
    width: 100%;
    height: 400px;
  }

  iframe[short] {
    height: 220px;
  }
</style>

The Dart language is designed to be easy to learn for
coders coming from other languages,
but it has a few unique features.
This codelab — which is based on a 
[Dart language cheatsheet]({{site.dart-site}}/guides/language/cheatsheet)
written by and for Google engineers —
walks you through the most important of these language features.

Dart 语言旨在让从其他编程语言转来的开发者们能够轻松学习，但也有它的独特之处。
本篇将基于谷歌工程师编写的
[Dart 语言速查表]({{site.dart-site}}/guides/language/cheatsheet)
为你介绍一些最重要的语言特性。

The embedded editors in this codelab have partially completed code snippets.
You can use these editors to test your knowledge by completing the code and
clicking the **Run** button.
If you need help, click the **Hint** button.
To run the code formatter ([dartfmt]({{site.dart-site}}/tools/dartfmt)), click **Format**.
The **Reset** button erases your work and
restores the editor to its original state.

在这篇 codelab 中的嵌入式编辑器已经完成了部分代码片段。
你可以在这些编辑器上将代码补充完整，然后点击 **Run (运行)** 按钮进行测试。
如果你需要帮助，请点击 **Hint (提示)** 按钮。
要运行代码格式化 ([dartfmt]({{site.dart-site}}/tools/dartfmt))，
点击 **Format (格式化)** 按钮，**Reset (重置)**按钮将会清除你的操作，
并把编辑器恢复到初始状态。

<aside class="alert alert-warning">

The embedded editors use an experimental version of DartPad.
If you find a DartPad bug or have suggestions for DartPad, please
<a target="_BLANK" href="https://github.com/dart-lang/dart-pad/issues/new">create a DartPad issue.</a>
If you have suggestions for the text or examples in this codelab,
you can create a site issue by clicking the bug icon
at the top right of this page.

这里的嵌入式编辑器使用了实验版 DartPad。如果你发现了 DartPad 中的 bug，
请 <a target="_BLANK" href="https://github.com/dart-lang/dart-pad/issues/new">创建一个 DartPad issue</a>。
如果你对该 codelab 的语言描述或样例有任何建议，
可以点击本页面右上角的 bug 图标提出 issue。

</aside>

## String interpolation

## 字符串插值

To put the value of an expression inside a string, use `${expression}`.
If the expression is an identifier, you can omit the `{}`.

为了将表达式的值放在字符串中，请使用 `${expression}`。若表达式为单个标识符，则可以省略 `{}`。

Here are some examples of using string interpolation:

下面是一些使用字符串插值的例子：

| String  | | Result |
| 字符串  | | 结果 |
|-----------------------------+-+ -------|
| `'${3 + 2}'`                | | `'5'` |
| `'${"word".toUpperCase()}'` | | `'WORD'` |
| `'$myObject'`               | | `myObject.toString()` 的值|


### Code example

### 代码样例

The following function takes two integers as parameters.
Make it return a string containing both integers separated by a space.
For example, `stringify(2, 3)` should return `'2 3'`.

下面的方法接收两个整形变量作为参数，然后让它返回一个包含以空格分隔的整数的字符串。
例如，`stringify(2, 3)` 应该返回 `'2 3'`。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=43f3db47b0632c557200270807696687"></iframe>

## Null-aware operators

## 避空运算符

Dart offers some handy operators for dealing with values that might be null. One is the
`??=` assignment operator, which assigns a value to a variable only if that
variable is currently null:

Dart 提供了一系列方便的运算符用于处理可能会为空值的变量。
其中一个是 `??=` 赋值运算符，仅当该变量为空值时才为其赋值：

{% comment %}
TBD: Make this and all non-trivial snippets testable.
I found an error in one of the getter/setter snippets.
{% endcomment %}

{% prettify dart %}
int a; // The initial value of any object is null.
a ??= 3;
print(a); // <-- Prints 3.

a ??= 5;
print(a); // <-- Still prints 3.
{% endprettify %}

Another null-aware operator is `??`,
which returns the expression on its left unless that expression's value is null,
in which case it evaluates and returns the expression on its right:

另外一个避空运算符是 `??`，如果该运算符左边的表达式返回的是空值，则会计算并返回右边的表达式。

{% prettify dart %}
    print(1 ?? 3); // <-- Prints 1.
    print(null ?? 12); // <-- Prints 12.
{% endprettify %}

### Code example

### 代码样例

Try putting the `??=` and `??` operators to work below.

尝试在下面使用 `??=` 和 `??` 操作符。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=ee3d441f60acc95a07d73762a61b3b98"></iframe>

## Conditional property access

## 条件属性访问

To guard access to a property or method of an object that might be null,
put a question mark (`?`) before the dot (`.`):

要保护可能会为空的属性的正常访问，请在点（`.`）之前加一个问号（`?`）。

{% prettify dart %}
myObject?.someProperty
{% endprettify %}

The preceding code is equivalent to the following:

上述代码等效于以下内容：

{% prettify dart %}
(myObject != null) ? myObject.someProperty : null
{% endprettify %}

You can chain multiple uses of `?.` together in a single expression:

你可以在一个表达式中连续使用多个 `?.`：

{% prettify dart %}
myObject?.someProperty?.someMethod()
{% endprettify %}

The preceding code returns null (and never calls `someMethod`) if either
`myObject` or `myObject.someProperty` is
null.

如果 `myObject` 或 `myObject.someProperty` 为空，则前面的代码返回 null（并不再调用 `someMethod`）。

### Code example

### 代码样例

Try using conditional property access to finish the code snippet below.

尝试使用条件属性访问来完成下面的代码片段。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=58f14a3d943be6231ae611036fcfc80d"></iframe>


## Collection literals

## 集合字面量（Collection literals）

Dart has built-in support for lists, maps, and sets.
You can create them using literals:

Dart 内置了对 list、map 以及 set 的支持。你可以通过字面量直接创建它们：

{% prettify dart %}
final aListOfStrings = ['one', 'two', 'three'];
final aSetOfStrings = {'one', 'two', 'three'};
final aMapOfStringsToInts = {
  'one': 1,
  'two': 2,
  'three': 3,
};
{% endprettify %}

Dart's type inference can assign types to these variables for you.
In this case, the inferred types are `List<String>`,
`Set<String>`, and `Map<String, int>`.

Dart 的类型推断可以自动帮你分配这些变量的类型。在这个例子中，推断类型是 `List<String>`、`Set<String>`和 `Map<String, int>`。

Or you can specify the type yourself:

你也可以手动指定类型：

{% prettify dart %}
final aListOfInts = <int>[];
final aSetOfInts = <int>{};
final aMapOfIntToDouble = <int, double>{};
{% endprettify %}

Specifying types is handy when you initialize a list with contents of a subtype,
but still want the list to be `List<BaseType>`:

在使用子类型的内容初始化列表，但仍希望列表为 `List <BaseType>` 时，指定其类型很方便：

{% prettify dart %}
final aListOfBaseType = <BaseType>[SubType(), SubType()];
{% endprettify %}

### Code example

### 代码样例

Try setting the following variables to the indicated values.

尝试将以下变量设定为指定的值。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=8ba5e98559ff2a2e92e58ac5a28f1cff"></iframe>

## Arrow syntax

## 箭头语法

You might have seen the `=>` symbol in Dart code.
This arrow syntax is a way to define a function that executes the
expression to its right and returns its value.

你也许已经在 Dart 代码中见到过 `=>` 符号。这种箭头语法是一种定义函数的方法，该函数将在其右侧执行表达式并返回其值。

For example, consider this call to the `List` class's
`any` method:

例如，考虑调用这个 `List` 类中的 `any` 方法：

{% prettify dart %}
bool hasEmpty = aListOfStrings.any((s) {
  return s.isEmpty;
});
{% endprettify %}

Here’s a simpler way to write that code:

这里是一个更简单的代码实现：

{% prettify dart %}
bool hasEmpty = aListOfStrings.any((s) => s.isEmpty);
{% endprettify %}

### Code example

### 代码样例

Try finishing the following statements, which use arrow syntax.

尝试使用箭头语法完成下面语句：

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=7c287c55dcc7f414a5dfa5837e3450e3"></iframe>

{% comment %}
ISSUE: The analysis output kept getting in the way of my typing for the
last part of this code. Also, how are they supposed to know to use the
join() method?

TBD: The comments in "Your code" are in the form of doc comments,
but they don't use `///`, and they end in `:`, not `.`.
{% endcomment %}

## Cascades

## 级连

To perform a sequence of operations on the same object, use cascades (`..`).
We've all seen an expression like this:

要对同一对象执行一系列操作，请使用级联（`..`）。我们都看到过这样的表达式：

{% prettify dart %}
myObject.someMethod()
{% endprettify %}

It invokes `someMethod` on `myObject`, and the result of
the expression is the return value of `someMethod`.

它在 `myObject` 上调用 `someMethod` 方法，而表达式的结果是 `someMethod` 的返回值。

Here's the same expression with a cascade:

下面是一个使用级连语法的相同表达式：

{% prettify dart %}
myObject..someMethod()
{% endprettify %}

Although it still invokes `someMethod` on `myObject`, the result
of the expression **isn't** the return value — it's a reference to `myObject`!
Using cascades, you can chain together operations that
would otherwise require separate statements.
For example, consider this code:

虽然它仍然在 `myObject` 上调用了 `someMethod`，但表达式的结果却**不是**该方法返回值，而是是 `myObject` 对象的引用！使用级联，你可以将需要单独操作的语句链接在一起。
例如，请考虑以下代码：

{% prettify dart %}
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
{% endprettify %}

With cascades, the code becomes much shorter,
and you don’t need the `button` variable:

使用级连能够让代码变得更加简洁，而且你也不再需要 `button` 变量了。

{% prettify dart %}
querySelector('#confirm')
..text = 'Confirm'
..classes.add('important')
..onClick.listen((e) => window.alert('Confirmed!'));
{% endprettify %}

### Code example

### 代码样例

Use cascades to create a single statement that
sets the `anInt`, `aString`, and `aList` properties of a `BigObject`
to `1`, `'String!'`, and `[3.0]` (respectively)
and then calls `allDone()`.

使用级联创建一个语句，分别将 `BigObject` 的 `anInt` 属性设为 `1`、`aString` 属性设为 `String!`、`aList` 属性设置为 `[3.0]` 然后调用 `allDone()`。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=72bde0b4d5c8c6046b4853a3b4053c3a"></iframe>


## Getters and setters

You can define getters and setters
whenever you need more control over a property
than a simple field allows.

任何需要对属性进行更多控制而不是允许简单字段访问的时候，你都可以自定义 getter 和 setter。

For example, you can make sure a property's value is valid:

例如，你可以用来确保属性值合法：

{% prettify dart %}
class MyClass {
  int _aProperty = 0;

  int get aProperty => _aProperty;

  set aProperty(int value) {
    if (value >= 0) {
      _aProperty = value;
    }
  }
}
{% endprettify %}

You can also use a getter to define a computed property:

你还可以使用 getter 来定义计算属性：

{% prettify dart %}
class MyClass {
  List<int> _values = [];

  void addValue(int value) {
    _values.add(value);
  }

  // A computed property.
  int get count {
    return _values.length;
  }
}
{% endprettify %}

### Code example

### 代码样例

Imagine you have a shopping cart class that keeps a private `List<double>`
of prices.
Add the following:

想象你有一个购物车类，其中有一个私有的 `List<double>` 类型的 prices 属性。添加以下内容：

* A getter called `total` that returns the sum of the prices

  一个名为 `total` 的 getter，用于返回总价格。

* A setter that replaces the list with a new one,
  as long as the new list doesn't contain any negative prices
  (in which case the setter should throw an `InvalidPriceException`).

  只要新列表不包含任何负价格，setter 就会用新的列表替换列表（在这种情况下，setter 应该抛出 `InvalidPriceException`。）

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=84561041d263cbd4c92f614eceec85e6"></iframe>


## Optional positional parameters

## 可选位置参数

Dart has two kinds of function parameters: positional and named. Positional parameters are the kind
you're likely familiar with:

Dart 有两种传参方法：位置参数和命名参数。位置参数你可能会比较熟悉：

{% prettify dart %}
int sumUp(int a, int b, int c) {
  return a + b + c;
}

int total = sumUp(1, 2, 3);
{% endprettify %}

With Dart, you can make these positional parameters optional by wrapping them in brackets:

在 Dart 中，你可以通过将这些参数包裹在大括号中使其变成可选位置参数：

{% prettify dart %}
int sumUpToFive(int a, [int b, int c, int d, int e]) {
  int sum = a;
  if (b != null) sum += b;
  if (c != null) sum += c;
  if (d != null) sum += d;
  if (e != null) sum += e;
  return sum;
}

int total = sumUptoFive(1, 2);
int otherTotal = sumUpToFive(1, 2, 3, 4, 5);
{% endprettify %}

Optional positional parameters are always last
in a function's parameter list.
Their default value is null unless you provide another default value:

可选位置参数永远放在方法参数列表的最后。除非你给它们提供一个默认值，否则默认为 null。

{% prettify dart %}
int sumUpToFive(int a, [int b = 2, int c = 3, int d = 4, int e = 5]) {
  ...
}

int newTotal = sumUpToFive(1);
print(newTotal); // <-- prints 15
{% endprettify %}

### Code example

### 代码样例

Implement a function called `joinWithCommas` that accepts one to
five integers, then returns a string of those numbers separated by commas.
Here are some examples of function calls and returned values:

实现一个名为 `joinWithCommas` 的方法，它接收一至五个整数，然后返回由逗号分隔的包含这些数字的字符串。
以下是方法调用和返回值的一些示例：

| <t>Function call</t><t>方法调用</t> | | <t>Returned value</t><t>返回值</t> |
|---------------------------------+-+----------------|
| `joinWithCommas(1)`             | | `'1'`          |
| `joinWithCommas(1, 2, 3)`       | | `'1,2,3'`      |
| `joinWithCommas(1, 1, 1, 1, 1)` | | `'1,1,1,1,1'`  |

<br>

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=9e7d5b6b56319b7e3b12b791c0ae27c1"></iframe>


## Optional named parameters

## 可选命名参数

Using a curly brace syntax,
you can define optional parameters that have names.

你可以使用大括号语法定义可选命名参数。

{% prettify dart %}
void printName(String firstName, String lastName, {String suffix}) {
  print('$firstName $lastName ${suffix ?? ''}');
}

printName('Avinash', 'Gupta');
printName('Poshmeister', 'Moneybuckets', suffix: 'IV');
{% endprettify %}

As you might expect, the value of these parameters is null by default,
but you can provide default values:

正如你所料，这些参数默认为 null，但你也可以为其提供默认值。

{% prettify dart %}
void printName(String firstName, String lastName, {String suffix = ''}) {
  print('$firstName $lastName ${suffix}');
}
{% endprettify %}

A function can't have both optional positional and optional named parameters.

一个方法不能同时使用可选位置参数和可选命名参数。

### Code example

### 代码样例

Add a `copyWith` instance method to the `MyDataObject`
class. It should take three named parameters:

向 `MyDataObject` 类添加一个 `copyWith` 实例方法，它应该包含三个命名参数。

* `int newInt`
* `String newString`
* `double newDouble`

When called, `copyWith` should return a new `MyDataObject`
based on the current instance,
with data from the preceding parameters (if any)
copied into the object's properties.
For example, if `newInt` is non-null,
then copy its value into `anInt`.

当该方法被调用时，`copyWith` 应该根据当前实例返回一个新的 `MyDataObject` 并将前面参数（如果有的话）的数据复制到对象的属性中。
例如，如果 `newInt` 不为空，则将其值复制到 `anInt` 中。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=1dd9cc9654f9e6d080f99bfb9772dae4"></iframe>


## Exceptions

## 异常

Dart code can throw and catch exceptions. In contrast to Java, all of Dart’s exceptions are unchecked
exceptions. Methods don't declare which exceptions they might throw, and you aren't required to catch
any exceptions.

Dart 代码可以抛出和捕获异常。与 Java 相比，Dart 的所有异常都是 unchecked exception。方法不会声明它们可能抛出的异常，你也不需要捕获任何异常。

Dart provides `Exception` and `Error` types, but you're
allowed to throw any non-null object:

虽然 Dart 提供了 Exception 和 Error 类型，但是你可以抛出任何非空对象：

{% prettify dart %}
throw Exception('Something bad happened.');
throw 'Waaaaaaah!';
{% endprettify %}

Use the `try`, `on`, and `catch` keywords when handling exceptions:

使用 `try`、`on` 以及 `catch` 关键字来处理异常： 

{% prettify dart %}
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
{% endprettify %}

The `try` keyword works as it does in most other languages.
Use the `on` keyword to filter for specific exceptions by type,
and the `catch` keyword to get a reference to the exception object.

`try` 关键字作用与其他大多数语言一样。使用 `on` 关键字按类型过滤特定异常，而 `catch` 关键字则能够获取捕捉到的异常对象的引用。

If you can't completely handle the exception, use the `rethrow` keyword
to propagate the exception:

如果你无法完全处理该异常，请使用 `rethrow` 关键字再次抛出异常：

{% prettify dart %}
try {
  breedMoreLlamas();
} catch (e) {
  print('I was just trying to breed llamas!.');
  rethrow;
}
{% endprettify %}

To execute code whether or not an exception is thrown,
use `finally`:

要执行一段无论是否抛出异常都会执行的代码，请使用 `finally`：

{% prettify dart %}
try {
  breedMoreLlamas();
} catch (e) {
  … handle exception ...
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
{% endprettify %}

### Code example

### 代码样例

Implement `tryFunction` below. It should execute an untrustworthy method and
then do the following:

在下面实现 `tryFunction` 方法。它应该会执行一个不可靠的方法，然后做以下操作：

* If `untrustworthy` throws an `ExceptionWithMessage`,
  call `logger.logException` with the exception type and message
  (try using `on` and `catch`).

  如果 `untrustworthy` 抛出了 `ExceptionWithMessage`，则调用 `logger.logException` 并传入使用异常类型和消息（尝试使用 `on` 和 `catch`）。

* If `untrustworthy` throws an `Exception`,
  call `logger.logException` with the exception type
  (try using `on` for this one).

  如果 `untrustworthy` 抛出了一个 `Exception`，则调用 `logger.logException` 并传入使用异常类型（这次请尝试使用 `on`）。

* If `untrustworthy` throws any other object, don't catch the exception.

  如果 `untrustworthy` 抛出了其他对象，请不要捕获该异常。

* After everything's caught and handled, call `logger.doneLogging`
  (try using `finally`).

  捕获并处理完所有内容后，调用 `logger.doneLogging`（尝试使用 `finally`）。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=e221e3fd667825e62aac79079b8b5c59"></iframe>

{% comment %}
I was confused about the text saying "call... with the exception type" but
using only on for it (since how would you know the type without the exception
object?). I used on catch at first, and that worked. Then I looked at the
solution and changed to what it used, and it did NOT work! Here's what I saw:

我对文中提到的 "调用... 并传入使用异常类型" 但只使用 on 关键字感到困惑。(因为你怎么知道没有异常对象的类型？)我一开始使用 on 可以的成功捕获的。然后我看了解决方案并使用它，却发现无法正常工作了。这是我遇到的情况：

Untrustworthy threw an Exception, but a different type was logged: Exception.

(Looking at the test code, I see the type it looks for is actually _Exception.)

（我查看了测试代码，发现它的类型实际上是 _Exception。）

Both the text & the test need to be changed.

文章和测试用例都需要更改。

ISSUE: Solution doesn't exactly match the comments in "Your code", so the
line count is off.

问题：解决方案与“您的代码”中的注释不完全匹配，因此该问题已关闭。

ISSUE: When I select all in the Solution and then switch to the Your code tab,
everything in THAT tab looks selected, too. The same is NOT true of the
Test code tab. After I reloaded, this behavior stopped.

问题：当我在解决方案中选择所有内容然后切换到您的代码选项卡时，THAT 选项卡中的所有内容也会被选中。 “测试代码”选项卡也不是这样。重新加载后，此行为停止。

{% endcomment %}


## Using `this` in a constructor

## 在构造方法中使用 `this`

Dart provides a handy shortcut for assigning
values to properties in a constructor:
use `this.propertyName` when declaring the constructor:

Dart 提供了一个方便的快捷方式，用于为构造方法中的属性赋值：在声明构造方法时使用 `this.propertyName`。

{% prettify dart %}
class MyColor {
  int red;
  int green;
  int blue;

  MyColor(this.red, this.green, this.blue);
}

final color = MyColor(80, 80, 128);
{% endprettify %}

This technique works for named parameters, too.
Property names become the names of the parameters:

此技巧同样也适用于命名参数。属性名为参数的名称：

{% prettify dart %}
class MyColor {
  ...

  MyColor({this.red, this.green, this.blue});
}

final color = MyColor(red: 80, green: 80, blue: 80);
{% endprettify %}

For optional parameters, default values work as expected:

对于可选参数，默认值为期望值：

{% prettify dart %}
MyColor([this.red = 0, this.green = 0, this.blue = 0]);
// or
MyColor({this.red = 0, this.green = 0, this.blue = 0});
{% endprettify %}

### Code example

### 代码样例

Add a one-line constructor to `MyClass` that uses
`this.` syntax to receive and assign values for
all three properties of the class.

使用 `this` 语法向 `MyClass` 添加一行构造方法，并接收和分配全部（三个）属性。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=2778e81ae2c5729d45c611829f3888c2"></iframe>

{% comment %}
This one seems super easy compared to previous ones.
We've already seen it in the Exceptions example,
and I'd already used it in a previous example.
Move it up higher? Or make it more challenging, somehow?
Maybe require both positional and optional named parameters (with defaults)?

这样相比之前要简单很多。我们已经在 Exception 的样例中见过它了。并且我已经在之前的样例中使用了。
把它变得更高级？或者以某种方式让它更具挑战性？
也许需要位置和可选的命名参数（具有默认值）？

{% endcomment %}

## Initializer lists

Sometimes when you implement a constructor,
you need to do some setup before the constructor body executes.
For example, final fields must have values
before the constructor body executes.
Do this work in an initializer list,
which goes between the constructor's signature and its body:

有时，当你在实现构造函数时，您需要在构造函数体执行之前进行一些初始化。
例如，final 修饰的字段必须在构造函数体执行之前赋值。
在初始化列表中执行此操作，该列表位于构造函数的签名与其函数体之间：

{% prettify dart %}
Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
{% endprettify %}

The initializer list is also a handy place to put asserts,
which run only during development:

初始化列表也是放置断言的便利位置，它仅会在开发期间运行：

{% prettify dart %}
NonNegativePoint(this.x, this.y)
    : assert(x >= 0),
      assert(y >= 0) {
  print('I just made a NonNegativePoint: ($x, $y)');
}
{% endprettify %}

### Code example

### 代码样例

Complete the `FirstTwoLetters` constructor below.
Use an initializer list to assign the first two characters in `word` to
the `letterOne` and `LetterTwo` properties.
For extra credit, add an `assert` to catch words of less than two characters.

完成下面的 `FirstTwoLetters` 的构造函数。使用的初始化列表将 `word` 的前两个字符分配给 `letterOne` 和 `LetterTwo` 属性。要获得额外的信用，请添加一个 `断言` 以捕获少于两个字符的单词。

{% comment %}
ISSUE: The test was broken. I've fixed it in my gist.

问题：测试出错了，我会在我的要点中修复它。

Is the assert even executed? I can't see any effect on the test,
which makes me think asserts are ignored.
Also, the test just checks for the presence of any exception, not for
an AssertionError.

断言真的被执行了吗？我看不出它对测试有任何影响，这让我觉得断言被忽略了。此外，这个测试仅仅是检查是否存在任何异常，而不是为了 AssertionError。

Also, my print() wasn't visible in the Output until I fixed my code and/or
the test. That was unexpected.
It'd be cool if Output appeared only if you want it, like Solution does.
{% endcomment %}

同样的，直到我修复了我代码或者测试之前，我都看不见 print() 的输出。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=df45dfc1af2e6af712930c331115eb78"></iframe>


## Named constructors

## 命名构造方法

{% comment %}
Much like JavaScript, Dart doesn't support method overloads
(two methods with the same name but different signatures).
[ISSUE: methods & constructors aren't the same thing,
so I deleted that. We can add it back if we can word it better

就像 JavaScript 那样，Dart 不支持方法的重载。（两个方法具有相同的名字但有不同的签名）[问题：方法和构造方法并不是同一个东西，所以我删掉了这段。如果找到了更好的描述，我们可以把它加回来]

{% endcomment %}
To allow classes to have multiple constructors,
Dart supports named constructors:

为了允许一个类具有多个构造方法，Dart 支持命名构造方法：

{% prettify dart %}
class Point {
  num x, y;

  Point(this.x, this.y);

  Point.origin() {
    x = 0;
    y = 0;
  }
}
{% endprettify %}

To use a named constructor, invoke it using its full name:

为了使用命名构造方法，请使用全名调用它：

{% prettify dart %}
final myPoint = Point.origin();
{% endprettify %}

### Code example

### 代码样例

Give the Color class a constructor named `Color.black`
that sets all three properties to zero.

给 Color 类添加一个叫做 `Color.black` 的方法，它将会把三个属性的值都设为 0。

{% comment %}
ISSUE: comment says "a named constructor called "black"", which sounds
wrong to me. I fixed it in the text but not in the example.
{% endcomment %}

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=e1a82c77547e659eb24f4e698abf1eca"></iframe>


## Factory constructors

## 工厂构造方法

Dart supports factory constructors,
which can return subtypes or even null.
To create a factory constructor, use the `factory` keyword:

Dart 支持工厂构造方法。它能够返回其子类甚至 null 对象。要创建一个工厂构造方法，请使用 `factory` 关键字。

{% prettify dart %}
class Square extends Shape {}

class Circle extends Shape {}

class Shape {
  Shape();

  factory Shape.fromTypeName(String typeName) {
    if (typeName == 'square') return Square();
    if (typeName == 'circle') return Circle();

    print('I don\'t recognize $typeName');
    return null;
  }
}
{% endprettify %}

### Code example

### 代码样例

Fill in the factory constructor named `IntegerHolder.fromList`,
making it do the following:

填写名为 `IntegerHolder.fromList` 的工厂构造方法，使其执行以下操作：

* If the list has **one** value,
  create an `IntegerSingle` with that value.

  若列表只有**一个**值，那么就用它来创建一个 `IntegerSingle`。

* If the list has **two** values,
  create an `IntegerDouble` with the values in order.

  如果这个列表有两个值，那么按其顺序创建一个 `IntegerDouble`。

* If the list has **three** values,
  create an `IntegerTriple` with the values in order.

  如果这个列表有三个值，那么按其顺序创建一个 `IntegerTriple`。

* Otherwise, return null.

  否则返回 null。
    
{% comment %}
TODO: Fix the comment to not say "named".
ISSUE: The hint acts like you don't already have the signature for the constructor.
{% endcomment %}
<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=727981a8ece1244b52a3c6dc377a8085"></iframe>

## Redirecting constructors

## 重定向构造方法

Sometimes a constructor’s only purpose is to redirect to
another constructor in the same class.
A redirecting constructor’s body is empty,
with the constructor call appearing after a colon (`:`).

有时一个构造方法仅仅用来重定向到该类的另一个构造方法。重定向方法没有主体，它在冒号（`:`）之后调用另一个构造方法。

{% prettify dart %}
class Automobile {
  String make;
  String model;
  int mpg;

  // The main constructor for this class.
  Automobile(this.make, this.model, this.mpg);

  // Delegates to the main constructor.
  Automobile.hybrid(String make, String model) : this(make, model, 60);

  // Delegates to a named constructor
  Automobile.fancyHybrid() : this.hybrid('Futurecar', 'Mark 2');
}
{% endprettify %}

### Code example

### 代码样例

Remember the `Color` class from above? Create a named constructor called
`black`, but rather than manually assigning the properties, redirect it to the
default constructor with zeros as the arguments.

还记得我们之前提到的 `Color` 类吗？创建一个叫做 `black` 的命名构造方法，但这次我们不要手动分配属性，而是将 0 作为参数，重定向到默认的构造方法。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=94eb1d8be5b64163753c7350f1f09edf"></iframe>


## Const constructors

## Const 构造方法

If your class produces objects that never change, you can make these objects compile-time constants. To
do this, define a `const` constructor and make sure that all instance variables
are final.

如果你的类生成的对象永远都不会更改，则可以让这些对象成为编译时常量。为此，请定义 `const` 构造方法并确保所有实例变量都是 final 的。

{% prettify dart %}
class ImmutablePoint {
  const ImmutablePoint(this.x, this.y);

  final int x;
  final int y;

  static const ImmutablePoint origin =
      ImmutablePoint(0, 0);
}
{% endprettify %}

### Code example

### 代码样例

Modify the `Recipe` class so its instances can be constants,
and create a constant constructor that does the following:

修改 `Recipe` 类，使其实例成为常量，并创建一个执行以下操作的常量构造方法：

* Has three parameters: `ingredients`, `calories`,
  and `milligramsOfSodium` (in that order).

  该方法有三个参数：`ingredients`、`calories` 和 `milligramsOfSodium`。（按照此顺序）

* Uses `this.` syntax to automatically assign the parameter values to the
  object properties of the same name.

  使用 `this` 语法自动将参数值分配给同名的对象属性。

* Is constant, with the `const` keyword just before
  `Recipe` in the constructor declaration.

  在 `Recipe` 的构造方法声明之前，用 `const` 关键字使其成为常量。

<iframe src="{{site.dartpad}}/experimental/embed-new.html?id=c400cb84fab309ddbbb436c1ced90dad"></iframe>

{% comment %}
TODO: Copy edit the hint.
{% endcomment %}

## What next?

## 下一步是什么？

We hope you enjoyed using this codelab to learn or test your knowledge of
some of the most interesting features of the Dart language.
Here are some suggestions for what to do now:

我们希望你能够喜欢这个 codelab 来学习或测试你对 Dart 语言中一些最有趣的功能的知识。下面是一些有关现在该做什么的建议：

* Try [other Dart codelabs]({{site.dart-site}}/codelabs).

  尝试阅读 [其他 Dart codelab]({{site.dart-site}}/codelabs)。

* Read the [Dart language tour]({{site.dart-site}}/guides/language/language-tour).

  阅读 [Dart 语言之旅]({{site.dart-site}}/guides/language/language-tour)。

* Play with [DartPad.]({{site.dartpad}})

  在 [DartPad]({{site.dartpad}}) 上进行练习。

* [Get the Dart SDK]({{site.dart-site}}/get-dart).

  [获取 Dart SDK]({{site.dart-site}}/get-dart)。
