---
title: 工厂模式家族
toc: true
---

文/ 杨加康，CFUG 社区成员，《Flutter 开发之旅从南到北》作者，小米工程师

在围绕设计模式的话题中，工厂这个词频繁出现，从 **简单工厂** 模式到 **工厂方法** 模式，再到 **抽象工厂** 模式。工厂名称含义是制造产品的工业场所，应用在面向对象中，顺理成章的成为了比较典型的创建型模式。

![图源：https://media2.giphy.com/media/3ohjUKYWSqORcgIIsE/giphy.gif](https://files.flutter-io.cn/posts/community/tutorial/images/2022-02-20-1_X-eyz2eZZDho_bFBGBOWEA.gif)

> 从形式上讲，工厂可以是一个返回我们想要对象的一个方法/函数，即可以作为构造函数的一种抽象。

本文，就带大家使用 Dart 理解它们的各自的实现，以及它们之间的关系。

### 简单工厂 & factory 关键字

**简单工厂模式** 不在 23 种 GoF 设计模式中，却是我们最常使用的一种编程方式。
其中主要涉及到一个特殊的方法，专门用来提供我们想要的实例对象（对象工厂），
我们可以将这个方法放到一个单独的类 `SimpleFactory` 中，如下：

```dart
class SimpleFactory {

  /// 工厂方法
  static Product createProduct(int type) {
    if (type == 1) {
      return ConcreteProduct1();
    }
    if (type == 2) {
      return ConcreteProduct2();
    }
    return ConcreteProduct();
  }
}
```

我们认为该方法要创建的对象同属一个 **Product** 类（抽象类），并通过参数 type 指定要创建具体的对象类型。
Dart 不支持 `interface` 关键词，但我们可以使用 `abstract` 以抽象类的方式定义接口，
然后各个具体的类型继承实现它即可：

```dart
/// 抽象类
abstract class Product {
  String? name;
}

/// 实现类
class ConcreteProduct implements Product {
  @override
  String? name = 'ConcreteProduct';
}

/// 实现类1
class ConcreteProduct1 implements Product {
  @override
  String? name = 'ConcreteProduct1';
}

/// 实现类2
class ConcreteProduct2 implements Product {
  @override
  String? name = 'ConcreteProduct2';
}
```

当我们想要在代码中获取对应的类型对象时，只需要通过这个方法传入想要的类型值即可，
我们不必关心生产如何被生产以及哪个对象被选择的具体逻辑：

```dart
void main() {
  final Product product = SimpleFactory.createProduct(1);
  print(product.name); // ConcreteProduct1
}
```

这就是 **简单工厂模式**。
说到这里，就不得不提到 Dart 中特有的 **factory** 关键词了。

**factory 关键词** 可以用来修饰 Dart 类的构造函数，意为 **工厂构造函数**，它能够让 **类** 的构造函数天然具有工厂的功能，使用方式如下：

```dart
class Product {
  /// 工厂构造函数（修饰 create 构造函数）
  factory Product.createFactory(int type) {
    if (type == 1) {
      return Product.product1;
    } else if (type == 2) {
      return Product._concrete2();
    }
    return Product._concrete();
  }

  /// 命名构造函数
  Product._concrete() : name = 'concrete';

  /// 命名构造函数1
  Product._concrete1() : name = 'concrete1';

  /// 命名构造函数2
  Product._concrete2() : name = 'concrete2';

  String name;
}
```

**factory** 修饰的构造函数需要返回一个当前类的对象实例，
我们可以根据参数调用对应的构造函数，返回对应的对象实例。

```dart
void main() {
  Product product = Product.createFactory(1);
  print(product.name); // concrete1
}
```

此外，工厂构造函数也并不要求我们每次都必须生成新的对象，
我们也可以在类中预先定义一些对象供工厂构造函数使用，
这样每次在使用同样的参数构建对象时，返回的会是同一个对象，
在 [单例模式](https://flutter.cn/community/tutorials/singleton-pattern-in-flutter-n-dart) 的章节中我们已经介绍过：

```dart
class Product {
  /// 工厂构造函数
  factory Product.create(int type) {
    if (type == 1) {
      return product1;
    } else if (type == 2) {
      return product2();
    }
    return Product._concrete();
  }

  static final Product product1 = Product._concrete1();
  static final Product product2 = Product._concrete2();
}
```

**factory** 除了可以修饰命名构造函数外，也可以修饰默认的非命名构造函数，

```dart
class Product {
  factory Product(int type) {
    return Product._concrete(); 
  }

  String? name;
}
```

到这里为止，工厂构造函数的一个缺点已经凸显了出来，即使用者并不能直观的感觉到自己正在使用的是工厂函数。
工厂构造函数的使用方法和普通构造函数没有区别，但这个构造函数生产的实例相当于是一种单例：

```dart
void main() {
  Product product = Product(1);
  print(product.name); // concrete1
}
```

这样的用法很容易造成使用者的困扰，因此，我们应当尽量使用特定的
**命名构造函数** 作为工厂构造函数（如上面示例中的 `createFactory`）。

### 工厂方法模式

工厂方法模式同样也是我们编程中最常用到的一种手段。

![抽象工厂 UML，图源：refactoring.guru](https://files.flutter-io.cn/posts/community/tutorial/images/2022-02-20-2022-02-20-1_yyGj6x9PNJLYiq4miG3mww.png)

在简单工厂中，它主要服务的对象是客户，而 **工厂方法** 的使用者与工厂本身的类并不相干，
而工厂方法模式主要服务自身的父类，如下的 `ProductFactory`（类比 UML 中的 Creator）：

```dart
/// 抽象工厂
abstract class ProductFactory {
  /// 抽象工厂方法
  Product factoryMethod();

  /// 业务代码
  void dosomthing() {
    Product product = factoryMethod();
    print(product.name);
  }
}
```

在 `ProductFactory` 类中，工厂方法 `factoryMethod` 是抽象方法，
每个子类都必须重写这个方法并返回对应不同的 `Product` 对象，
在 `dosomthing()` 方法被调用时，就可以根据返回的对象做出不同的响应。
具体使用方法如下：

```dart
/// 具体工厂
class ProductFactory1 extends ProductFactory {
  
  /// 具体工厂方法1
  @override
  Product factoryMethod() {
    return ConcreteProduct1();
  }
}

class ProductFactory2 extends ProductFactory {
  /// 具体工厂方法2
  @override
  Product factoryMethod() {
    return ConcreteProduct2();
  }
}

/// 使用
main() {
  ProductFactory product = ProductFactory1();
  product.dosomthing();	// ConcreteProduct1
}
```

在 Flutter 中，抽象方法有一个非常实用的应用场景。我们在使用 Flutter 开发多端应用时通常需要考虑到多平台的适配，即在多个平台中，同样的操作有时会产生不同的结果/样式，我们可以将这些不同结果/样式生成的逻辑放在工厂方法中。

如下，我们定义一个 `DialogFacory`，用作生成不同样式 Dialog 的工厂：

```dart
abstract class DialogFacory {
  Widget createDialog(BuildContext context);

  Future<void> show(BuildContext context) async {
    final dialog = createDialog(context);
    return showDialog<void>(
      context: context,
      builder: (_) {
        return dialog;
      },
    );
  }
}
```

然后，针对 Android 和 iOS 两个平台，就可以创建两个不同样式的 Dialog 了：

```dart
/// Android 平台
class AndroidAlertDialog extends DialogFactory {

  @override
  Widget createDialog(BuildContext context) {
    return AlertDialog(
      title: Text(getTitle()),
      content: const Text('This is the material-style alert dialog!'),
      actions: <Widget>[
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Close'),
        ),
      ],
    );
  }
}
/// iOS 平台
class IOSAlertDialog extends DialogFactory {
  
  @override
  Widget createDialog(BuildContext context) {
    return CupertinoAlertDialog(
      title: Text(getTitle()),
      content: const Text('This is the cupertino-style alert dialog!'),
      actions: <Widget>[
        CupertinoButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Close'),
        ),
      ],
    );
  }
}
```

现在，我们就可以像这样使用对应的 Dialog 了：

```dart
Future _showCustomDialog(BuildContext context) async {
  final dialog = AndroidAlertDialog();
  // final dialog = IOSAlertDialog();
  await selectedDialog.show(context);
}
```

### 抽象工厂

抽象工厂模式，相较于 **简单工厂** 和 **工厂方法** 最大的不同是：这两种模式只生产一种对象，而抽象工厂**生产的是一系列对象**（对象族），而且生成的这一系列对象一定存在某种联系。比如 Apple 会生产 **手机**、**平板** 等多个产品，这些产品都属于 Apple 这个品牌。

如下面这个抽象的工厂类：

```dart
abstract class ElectronicProductFactory {
  Product createComputer();
  
  Product createMobile();

  Product createPad();
  
  // ...
}
```

对于 Apple 来说，我就是生产这类电子产品的工厂，于是可以继承这个类，实现其中的方法生产各类产品：

```dart
class Apple extends ElectronicProductFactory {

  @override
  Product createComputer() {
    return Mac();
  }

  @override
  Product createMobile() {
    return IPhone();
  }

  @override
  Product createPad() {
    return IPad();
  }
  
  // ...
}
```

同样地，对于华为、小米等电子产品厂商也可以使用相同的方式表示，这就是抽象工厂模式。

在开发 Flutter 应用中，我们也可以充分利用抽象工厂模式做切合应用的适配，我们可以定义如下这个抽象工厂，用于生产 widget：

```dart
abstract class IWidgetsFactory {
  
  Widget createButton(BuildContext context);
  
  Widget createDialog(BuildContext context);
  
  // ...
}
```

我们的应用通常需要针对各个平台展示不同风格的 widget。因此针对每一个平台，我们都可以实现对应的实现工厂，如下：

```dart
/// Material 风格组件工厂
class MaterialWidgetsFactory extends IWidgetsFactory {
  @override
  Widget createButton(
      BuildContext context, VoidCallback? onPressed, String text) {
    return ElevatedButton(
      child: Text(text),
      onPressed: onPressed,
    );
  }

  @override
  Widget createDialog(BuildContext context, String title, String content) {
    return AlertDialog(title: Text(title), content: Text(content));
  }
  
  /// ...
}

/// Cupertino 风格组件工厂
class CupertinoWidgetsFactory extends IWidgetsFactory {
  @override
  Widget createButton(
    BuildContext context,
    VoidCallback? onPressed,
    String text,
  ) {
    return CupertinoButton(
      child: Text(text),
      onPressed: onPressed,
    );
  }

  @override
  Widget createDialog(BuildContext context, String title, String content) {
    return CupertinoAlertDialog(
      title: Text(title),
      content: Text(content),
    );
  }
  
  // ...
}
```

这样，在 Android 平台上我们使用 `MaterialWidgetsFactory`，在 iOS 平台上使用 `CupertinoWidgetsFactory`，就能使用对应平台的 widget，想要适配更多平台只需要再继承 `IWidgetsFactory` 实现对应平台的工厂类即可。

至此，我们可以发现，作为创建型模式，这三类工厂模式主要工作就是以不同的方式创建对象，但他们各有特点：简单工厂模式抽象的是 **生产对象**，工厂方法模式抽象的是 **类方法**，工厂方法模式抽象的则是 **生产对象的工厂**，如何使用就见仁见智了。

### 拓展阅读

- [百度百科：工厂方法模式](http://baike.baidu.com/l/JAsmKIAk)
- [百度百科：抽象工厂模式](http://baike.baidu.com/l/j5yzRvW)
- [Mangirdas Kazlauskas：Flutter Design Patterns: Abstract Factory](https://medium.com/flutter-community/flutter-design-patterns-11-abstract-factory-7098112925d8)

## 关于本系列文章

Flutter / Dart 设计模式从南到北（简称 Flutter 设计模式）系列内容预计两周发布一篇，着重向开发者介绍 Flutter 应用开发中常见的设计模式以及开发方式，旨在推进 Flutter / Dart 语言特性的普及，以及帮助开发者更高效地开发出高质量、可维护的 Flutter 应用。

我很乐意继续完善本系列中的文章，如果你对本文还有任何疑问或者文章的建议，欢迎向中文社区官方 Github 仓库提交 issue 或者直接与我联系，我会及时回复。
