---
title: Dart 2.7 发布：更安全、更具表现力的 Dart
description: Dart 2.7 发布：更安全、更具表现力的 Dart
toc: true
---
上周，我们发布了 Dart 2.7 SDK 的稳定版本，它可以为开发者提供多项新功能。Dart 语言经过了充实的一年，它是一种针对客户端优化的语言，适用于在任何平台上开发高效运行的应用。我们今年发布了 6 个新版本，数十项新功能。我们很欣喜地看到这些功能已经被 Dart 社区广泛使用。最近的 [GitHub Octoverse](https://octoverse.github.com/) 显示，根据多个参与方的评估结果，Dart 被认定为 [增长速度最快的编程语言](https://octoverse.github.com/#top-languages) (排名第一)，这一消息让我们备受鼓舞。

Dart 2.7 增加了对扩展方法的支持，此外还添加了一个新的代码包，用来处理带有特殊字符的字符串。我们更新了空安全 (已经实现类型安全的可空和非空类型)，还通过 DartPad 带来了全新的代码体验环境 (而且支持空安全)。在生态系统层级，pub.dev 现在加入了新的点赞 (Like) 功能，用户们喜欢代码包如今更加一目了然。Dart 2.7 现在就可以 [从 dart.dev 下载](http://dart.dev/) 并作为 SDK 使用，并且它也包含在 [发布的 Flutter 1.12 中](https://flutter.cn/posts/announcing-flutter-1-12)。

![]({{site.flutter-files-cn}}/posts/images/2021/05/gw7QIg.png)

## **扩展方法**

Dart 2.7 加入了一个长期以来备受期待的强大新语言功能: 扩展方法。扩展方法可以让你给任何类型 (包括你无法控制的类型) 添加新功能，并依然享受和常规方法一样的简洁输入体验以及代码自动补全功能。

我们来看一个简单的例子: 如何从为 String 添加解析 int 和 double 的方法。作为应用开发者，我们无法更改 String 类，因为这个类是在 dart:core 代码库中定义的，但是在扩展方法的帮助下，我们就可以亲手扩展它！在定义了扩展方法之后，我们就可以在 String 上调用新的 parseInt 方法，就如同这个方法是在 String 类中被原生定义的那样:

```dart
extension ParseNumbers on String {
  int parseInt() {
    return int.parse(this);
  }

  double parseDouble() {
    return double.parse(this);
  }
}

main() {
  int i = '42'.parseInt();
  print(i);
}
```

**扩展方法是静态的**

扩展方法是静态解析、静态配置的，也就是说，你无法通过动态值来调用它们。如下所示，该调用在运行时会抛出异常:

```dart
  dynamic d = '2';
  d.parseInt();

→ Runtime exception: NoSuchMethodError
```

扩展方法和 Dart 的 [类型推断](https://dart.dev/guides/language/sound-dart#type-inference) 可以很好地协作，所以在下面这个例子中，变量 "v" 被推断为 String 类，自然 String 上的扩展方法是可用的:

```dart
  var v = '1';
  v.parseInt(); // Works!
```

因为扩展方法是静态解析的，所以它们的速度就和调用静态方法或 helper 方法一样快，但调用语法则要友好很多

**扩展可以拥有类型变量**

因为扩展方法是静态解析的，所以它们的速度就和调用静态方法或 helper 方法一样假如我们想在 List 上定义一个扩展，用来获取序号为偶数的内容列表。那么我们就会希望让这个扩展运行在任何类型的列表上，返回和输入列表相同类型的新列表。为了做到这一点，我们可以把扩展泛型化，并将它的类型参数应用到它扩展的类型和方法里:

```dart
extension FancyList<T> on List<T> {
  List<T> get evenElements {
    return <T>[for (int i = 0; i < this.length; i += 2) this[i]];
  }
}
```

**扩展方法是扩展成员**

我们把这个功能称作 "扩展方法" 是因为，如果你在其他编程语言中使用过相应的语言功能，就会对这个术语感到熟悉。不过在 Dart 中，这个功能更加宽泛: 它还支持使用新的 getter、setter 以及运算符来扩展类。在上面那个 FancyList 的例子中，evenElements 就是一个 getter。下面则是一个例子，用来展示如何为 String 添加一个用于字符串移位的运算符:

```dart
extension ShiftString on String {
  String operator <<(int shift) {
    return this.substring(shift, this.length) + this.substring(0, shift);
  }
}
```

**来自社区的优秀范例**

我们已经看到 Dart 社区的很多开发者们开始试用扩展方法。下面列出我们见过的几个优秀范例。

Jeremiah Ogbomo 创建了 [time 代码包](https://pub.dev/packages/time)，它在 num (int 和 double 的基类) 上使用扩展，从而简化了 Duration 的创建过程。

```dart
// Create a Duration via a `minutes` extension on num.
Duration tenMinutes = 10.minutes;

// Create a Duration via an `hours` extension on num.
Duration oneHourThirtyMinutes = 1.5.hours;

// Create a DateTime using a `+` operator extension on DateTime.
final DateTime afterTenMinutes = DateTime.now() + 10.minutes;
```

Marcelo Glasberg 创建了 [i18n (国际化) 代码包](https://www.reddit.com/r/FlutterDev/comments/dm288s/dart_extensions_applied_to_i18n_you_have/)，它使用扩展方法来简化字符串的本地化操作:

```dart
Text('Hello'.i18n) // Displays Hello in English, Hola in Spanish, etc.
```

Simon Leier 创建了 [dartx 代码包](https://pub.dev/packages/dartx)，其中包含了多个核心 Dart 类型的扩展，如:

```dart
var allButFirstAndLast = list.slice(1, -2);   // [1, 2, 3, 4] 
var notBlank = '   .'.isBlank;       // false 
var file = File('some/path/testFile.dart'); 
print(file.name);           // testFile.dart 
print(file.nameWithoutExtension);       // testFile
```

Brian Egan 正在更新广受欢迎的 RxDart 代码包，使用扩展方法重新定义 API，以便更好地操作流。

## **更安全的字符串截取操作**

Dart 的标准 String 类使用 [UTF-16 编码](https://en.wikipedia.org/wiki/UTF-16)。这是编程语言的常见选择，特别是那些需要同时支持设备本地运行和 Web 端运行的编程语言。

UTF-16 字符串通常运作良好，编码过程对于开发者来说是透明的。然而，在操作字符串时，特别是操作那些由用户输入的字符串时，你可能会发现，某些被用户认为是字符的东西，和相应的被 UTF-16 编码系统认为是字符单元的东西，其实并不一致。下面我们来看一个例子，从用户输入的字符串中截取前三个字符:

```console
var input = ['Resume'];
input.forEach((s) => print(s.substring(0, 3)));

$ dart main.dart
Res
```

目前看来没有问题；我们打印出了输入列表中的字符串上的前三个字母，结果是 Res。现在我们来想想，假如用户来自世界上不同的地区，他们输入的字符中可能包含自己语言特有的符号，比如韩语，他们甚至还会创造性地用表情符号组合来表达出 "简历" 的含义:

```console
// New longer input list:
var input = ['Resume', 'Résumé', '이력서', '💼📃', 'Currículo'];

$ dart main.dart 
Res
Ré
이력서
💼�
Cur
```

那问题来了。有些字符串处理正常，但是 Résumé 和 💼📃 这些 "特殊" 字符串呢？先来看 Résumé，为什么我们的结果字符串里只有两个字符？再看看 💼📃，这个奇怪的问号又是怎么回事？这里的问题涉及到 [Unicode 中的一些不为人知的秘密](https://eev.ee/blog/2015/09/12/dark-corners-of-unicode/)。Résumé 中的字符 é 其实会占据两个编码位: 一个 e，还有一个 "[重音组合符](https://unicode.org/cldr/utility/character.jsp?a=0301)" 。而 [纸卷图标 📃](https://emojipedia.org/emoji/%F0%9F%93%83/)，确实只占据一个编码位，但这个编码却是用 U+d83d 和 U+dcc3 代理对 (surrogate pair) 来编码的。是不是被搞迷糊了？

我们说过，你通常不需要担心字符和编码位。如果你要做的只是接收和传递完整字符串的话，那么内部编码系统对你来说就是透明的。但是如果你需要处理字符串内部的一些字符，或是需要操控字符串的内容，那么你可能就会遇到麻烦。好消息是，Dart 2.7 加入了全新的 characters 代码包来解决这些问题。这个代码包会按照用户期待的方式处理字符串中的字符，这个功能又被叫做 [Unicode 字形群集](https://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries) (grapheme clusters)。有了 [characters 代码包](https://pub.dev/packages/characters)，我们只需稍微改动一下 shortenText() 方法，即可修正代码中的错误:

```dart
// Before:
input.forEach((s) => print(s.substring(0, 3)));

// After, using the characters package:
input.forEach((s) => print(s.characters.take(3)));
```

首先，我们要使用便捷的 .characters 扩展方法，从文本中的 String 里创建出新的 Characters 实例。然后我们就可以使用 take() 方法提取出前 3 个字符。

这个新代码包的技术预览版已经在 pub.dev 上发布。很期待听到大家对这个代码包的反馈。如果你发现了其中的任何问题，请随时 [告知我们](https://github.com/dart-lang/characters/issues)。

## **空安全预览**

几个月前，我们宣布 [即将在 Dart 中支持空安全](https://medium.com/dartlang/announcing-dart-2-5-super-charged-development-328822024970#0391)，支持安全访问对象，而不会触发空引用异常。我们为大家带来空安全静态分析的预览。下面我们来看一个颇令人激动的例子:

```dart
void main() {
  Person('Larry', birthday: DateTime(1973, 03, 26)).describe();
  Person('Sergey').describe();
}

class Person {
  String firstName;
  DateTime birthday;

  Person(this.firstName, {this.birthday});

  void describe() {
    print(firstName);
    int birthyear = birthday?.year;
    print('Born ${DateTime.now().year - birthyear} years ago');
  }
}
```

如果我们运行这段代码，它就会在运行第二个 Person 的 describe 方法时崩溃，并抛出一个空指针异常。因为这个人没有设定生日。我们在编程时犯了一个错误: 虽然我们已经预料到有些人的生日是未知的，在构造方法里中将 "生日" 设为可选，并在 birthday?.year 中有测试空生日，但我们忘了去处理 birthyear 也为空的情况。

现在我们把这段代码粘贴进我们新推出的 [空安全代码体验环境](https://nullsafety.dartpad.dev)，它是 DartPad 的一个特殊版本，其中包含静态分析功能 (是空安全功能的子集) 的技术预览。甚至都不需要运行代码，我们就可以看到 3 个问题:

![]({{site.flutter-files-cn}}/posts/images/2021/05/0zBwPq.png)

通过依次修复这些分析错误之后，我们就可以尽享空安全带来的好处了。请在空安全体验环境中试着做出如下修改 (并 [最终得到空安全代码](https://gist.github.com/mit-mit/c210bfb088545e69ba9231ee459615ba)):

1. 声明 birthday 可空，将 DateTime birthday 修改为 DateTime? birthday
2. 声明当 birthday 为空时 birthyear 可空，将 int birthyear 修改为 int? birthyear
3. 将第二个 print 调用放进空测试中:if (birthyear != null) {...}

希望这个例子可以让你明白我们想使用空安全功能带来何种体验。如前所示，这个体验环境只是空安全功能中的一部分的早期技术预览，开发工作仍在进行。我们正在努力在 Dart SDK 中提供空安全功能的第一个 beta 版本。以下是我们准备在 beta 版中推出的内容:

1. 可空和非空引用的完整实现

2. 将空安全整合至 Dart 的类型推断和 smart promotion (例如，允许在分配或空检查后安全访问可空变量)
3. 修改 Dart [核心代码库](https://dart.dev/guides/libraries)，使之声明可空和非可空类型
4. 添加迁移工具，这个工具可以自动完成大部分的代码升级操作，协助开发者升级 Dart 应用和代码包

此项工作完成后，我们会在 beta 版 SDK 中发布它，供大家在自己的应用和代码包中使用。我们还准备在新功能实现后对空安全体验环境进行更新。

我们知道很多开发者都想尽快用上空安全功能，大家可以在自己方便的时候展开代码迁移工作，在做好准备之后再使用这项功能。尚未采用这项功能的代码库和代码包将可以依赖那些已经采用这项功能的代码库，反之亦然。

在今后的几个月中，我们还会带来更多关于空安全的消息，比如说，我们会提出更加详细的建议，引导大家为迁移做准备。

## **在 pub.dev 上为代码包点赞**

我们还在 pub.dev 上发布了 "为代码包点赞" 功能，方便大家 "亲手" 表明自己对代码包的喜爱。如果你想要为一个代码包点赞，只需点击代码包详情信息旁边的大拇指图标即可。

![△ pub.dev 代码包详情页增加了点赞按钮]({{site.flutter-files-cn}}/posts/images/2021/05/Vw0mJN.png)

> △ pub.dev 代码包详情页增加了点赞按钮

目前我们并未考虑在我们的总体评分模型中纳入点赞数，但我们计划在今后的版本中纳入这个指标。我们还打算对我们的搜索界面和列表页面进行视觉更新，在其中强调代码包的点赞信息。

## **谢谢大家**

我们代表 Dart 团队感谢大家，感谢 Dart 社区的所有成员，谢谢你们持续不断的支持！请继续向我们提供反馈，并继续  [参与 Dart 相关讨论，继续融入 Dart 社区](https://dart.dev/community)。很显然，没有 Dart 社区的支持，我们不可能完成这个优异的开源项目。

对 Dart 来说，2019 年是激动人心的一年，但我们并不会就此止步。我们为 2020 年制定了雄心勃勃的计划。我们准备发布一些功能的稳定版本，这些功能包括 [dart:ffi](https://dart.dev/guides/libraries/c-interop)、[空安全](https://github.com/dart-lang/language/issues/110)，以及其他全新功能。请大家开始使用 Dart 2.7，大家可以 [前往 dart.dev 下载](http://dart.dev)，另外最新发布的 [Flutter 1.12](https://flutter.cn/posts/announcing-flutter-1-12) 中也包含它，最近刚刚经过 [重新设计的 DartPad](https://medium.com/dartlang/a-brand-new-dartpad-dev-with-flutter-support-16fe6027784) 中也包含 Dart 2.7。
