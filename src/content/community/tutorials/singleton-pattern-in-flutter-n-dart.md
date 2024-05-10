---
title: Flutter(able) 的单例模式
toc: true
---

文/ 杨加康，CFUG 社区成员，《Flutter 开发之旅从南到北》作者，小米工程师

**单例设计模式**（Singleton Design Pattern）理解起来非常简单。

> 一个类只允许创建一个实例，那这个类就是一个单例类，这种设计模式就叫作单例设计模式，简称单例模式。

作为最简单的一种设计模式之一，对于单例本身的概念，大家一看就能明白，但在某些情况下也很容易使用不恰当。相比其他语言，Dart 和 Flutter 中的单例模式也不尽相同，本篇文章我们就一起探究看看它在 Dart 和 Flutter 中的应用。

![]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-07-29-%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.png)

## Flutter(able) 的单例模式

一般来说，要在代码中使用单例模式，结构上会有下面这些约定俗成的要求：

- 单例类（Singleton）中包含一个引用自身类的静态属性实例（instance），且能自行创建这个实例。
- 该实例只能通过静态方法 `getInstance()` 访问。
- 类构造函数通常没有参数，且被标记为私有，确保不能从类外部实例化该类。

![单例设计模式 UML 图，图源：https://www.uml-diagrams.org/class-reference.html]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-07-29-1_CqdIf_w0sOciElKyfam3fQ.png)

遵循以上这些要求，我们就不难能用 Dart 写出一个普通的单例模式：

```dart
class Singleton {
  static Singleton _instance;
  
  // 私有的命名构造函数
  Singleton._internal();
  
  static Singleton getInstance() {
    if (_instance == null) {
      _instance = Singleton._internal();
    }
    
    return _instance;
  }
}
```

同时，在实现单例模式时，也需要考虑如下几点，以防在使用过程中出现问题：

- 是否需要懒加载，即类实例只在第一次需要时创建。
- 是否线程安全，在 Java、C++ 等多线程语言中需要考虑到多线程的并发问题。由于 Dart 是单线程模型的语言，所有的代码通常都运行在同一个 isolate 中，因此不需要考虑线程安全的问题。
- 在某些情况下，单例模式会被认为是一种 **反模式**，因为它违反了 SOLID 原则中的单一责任原则，单例类自己控制了自己的创建和生命周期，且单例模式一般没有接口，扩展困难。
- 单例模式的使用会影响到代码的可测试性。如果单例类依赖比较重的外部资源，比如 DB，我们在写单元测试的时候，希望能通过 mock 的方式将它替换掉。而单例类这种硬编码式的使用方式，导致无法实现 mock 替换。

在实际编码过程中，单例模式常见应用有：

- 全局日志的 Logger 类、应用全局的配置数据对象类，单业务管理类。
- 创建实例时占用资源较多，或实例化耗时较长的类。
- 等等...

## Dart 化

如上文所说的，Dart 语言作为单线程模型的语言，实现单例模式时，我们本身已经可以不用再去考虑 **线程安全** 的问题了。Dart 的很多其他特性也依然可以帮助到我们实现更加 Dart 化的单例。

使用 **getter** 操作符，可以打破单例模式中既定的，一定要写一个 `getInstance()` 静态方法的规则，简化我们必须要写的模版化代码，如下的 `get instance`:

```dart
class Singleton {
  static Singleton _instance;
  static get instance {
    if (_instance == null) {
      _instance = Singleton._internal();
    }
    
    return _instance;
  }
  
  Singleton._internal();
}
```

Dart 的 getter 的使用方式与普通方法大致相同，只是调用者不再需要使用括号，这样，我们在使用时就可以直接使用如下方式拿到这个单例对象：

```dart
final singleton = Singleton.instance;
```

而 Dart 中特有的 **工厂构造函数**（factory constructor）也原生具备了 **不必每次都去创建新的类实例** 的特性，将这个特性利用起来，我们就可以写出更优雅的 Dart(able) 单例模式了，如下：

```dart
class Singleton {
  static Singleton _instance;
  
  Singleton._internal();
  
  // 工厂构造函数
  factory Singleton() {
    if (_instance == null) {
      _instance = Singleton._internal();
    }
    
    return _instance;
  }
}
```

这里我们不再使用 **getter** 操作符额外提供一个函数，而是将单例对象的生成交给工厂构造函数，此时，工厂构造函数仅在第一次需要时创建 `_instance`，并之后每次返回相同的实例。这时，我们就可以像下面这样使用普通构造函数的方式获取到单例了：

```dart
final singleton = Singleton();
```

如果你还掌握了 Dart 空安全及箭头函数等特性，那么还可以使用另一种方式进一步精简代码，写出像下面这样 Dart 风味十足的代码：

```dart
class Singleton {
  static Singleton _instance;

  Singleton._internal() {
    _instance = this;
  }

  factory Singleton() => _instance ?? Singleton._internal();
}
```

这里，使用 `??` 作为 `_instance` 实例的判空操作符，如果为空则调用构造函数实例化否则直接返回，也可以达到单例的效果。

以上，Dart 单例中懒加载的无不是使用判空来实现的（`if (_instance == null)` 或 `??`），但是在 Dart 空安全特性里还有一个非常重要的操作符 `late ` ，它在语言层面就实现了实例的懒加载，如下面这个例子：

```dart
class Singleton {
  Singleton._internal();
  
  factory Singleton() => _instance;
  
  static late final Singleton _instance = Singleton._internal();
}
```

被标记为 `late ` 的变量 `_instance` 的初始化操作将会延迟到字段首次被访问时执行，而不是在类加载时就初始化。这样，Dart 语言特有的单例模式的实现方式就这么产生了。

## Flutter 化

说到工厂构造函数/空安全操作符等 Dart 语法上的特性，Flutter 应用中的例子已经屡见不鲜了， 但光看单例模式的定义，我们还必须联想到 Flutter 中另一个非常重要的 widget，那就是 InheritedWidget。

如果你已经是一个 Flutter 小能手，或者已经看过《Flutter 开发之旅从南到北》和之前的文章的话，一定已经对他的作用有了清晰的认识了。

InheritedWidget 状态可遗传的特性可以帮助我们很方便的实现父子组件之间的数据传递，同时，它也可以作为状态管理中的 **数据仓库**，作为整个应用的数据状态统一保存的地方。

![图源《Flutter 开发之旅从南到北》—— 第九章 图 9.4]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-07-29-%E6%95%B0%E6%8D%AE%E4%BB%93%E5%BA%93-3243985.svg)

上面代码中，我们通过继承 InheritedWidget 就实现了自己的可遗传组件 `_InheritedStateContainer`，其中的 `data` 变量表示全局状态数据，**在这里就可以被认为是整个应用的一个单例对象**。

`_InheritedStateContainer` 还接受 `child` 参数作为它的子组件，`child` 表示的所以子组件们就都能够以某种方式得到 `data` 这个单一的全局数据了。

约定俗成地，Flutter 源码经常会提供一些 `of` 方法（类比 `getInstance()`）作为帮助我们拿到全局数据的辅助函数。

以 Flutter 中典型的 Theme 对象为例。我们通常会在应用的根组件 `MaterialApp` 中创建 `ThemeData` 对象作为应用统一的主题样式对象：

```dart
MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.blue,
    visualDensity: VisualDensity.adaptivePlatformDensity,
  ),
  home: MyHomePage(title: 'Flutter Demo Home Page'),
);
```

在其他任意的组件中，我们可以使用 `Theme.of(context)` 拿到该对象了，且这个对象全局唯一。如下所示，我们可以将该 `ThemeData` 对象中的 `primaryColor` 应用在 `Text` 中：

```dart
// 使用全局文本样式
Text(
  'Flutter',
  style: TextStyle(color: Theme.of(context).primaryColor),
)
```

这个角度来看，InheritedWidget 完全可以被我们看作是最原生、最 Flutter 的单例应用了。

## 本文小结

本篇文章，我们经历了从实现普通单例到应用 **getter 操作符** 的 Dart 单例，到使用 **工厂构造函数** Dart 单例，再到使用了 **工厂构造函数 + 空安全语法 + 箭头函数** 的 Dart 单例，最后结合对 InheritedWidget 概念的理解，看到了 Flutter 中特有的单例模式，算是每一步都走了一遍。但学习设计模式的重点还是在于实际应用，希望大家今后在实际工程中能将这些概念用起来，如果你想更进一步理解 Dart 中的单例模式，可以参阅「**拓展阅读**」学习更多，希望对你有帮助。

![单例模式从南到北]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-07-29-%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.svg)

## 拓展阅读

- 图书 [《Flutter 开发之旅从南到北》](https://item.jd.com/12757223.html)—— 第 2 章、第 9 章
- [单例模式](https://c.biancheng.net/view/1338.html)
- [Dart 空安全](https://dart.cn/null-safety)
- [延迟初始化](https://dart.cn/null-safety/understanding-null-safety#lazy-initialization)

## 关于本系列文章

Flutter / Dart 设计模式从南到北（简称 Flutter 设计模式）系列内容预计两周发布一篇，着重向开发者介绍 Flutter 应用开发中常见的设计模式以及开发方式，旨在推进 Flutter / Dart 语言特性的普及，以及帮助开发者更高效地开发出高质量、可维护的 Flutter 应用。
