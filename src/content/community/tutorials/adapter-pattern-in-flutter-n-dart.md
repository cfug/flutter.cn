---
title: 灵动的适配器模式
toc: true
---

文/ 杨加康，CFUG 社区成员，《Flutter 开发之旅从南到北》作者，小米工程师

设计模式系列的前两篇，分别向大家介绍了一种
[创建性型模式（单例模式）]({{site.main_url}}/community/tutorials/singleton-pattern-in-flutter-n-dart)
和一种 [行为型设计模式（观察者模式）]({{site.main_url}}/community/tutorials/observer-pattern-in-flutter-n-dart)，
今天我们再来介绍一种结构型设计模式 —— 适配器模式。

**适配器模式** (Adapter Design Pattern)，顾名思义，这个模式就是用来做适配的，像一个「粘合剂」一样。

> 适配器模式可以将不兼容的接口转换为可兼容的接口，让原本由于接口不兼容而不能一起工作的类黏合在一起，最终使他们可以一起工作。

和 [观察者模式](/community/tutorials/observer-pattern-in-flutter-n-dart) 中的观察者与被观察者类似，适配器模式中担任主要角色是 **适配器 (Adapter)** 和 **被适配者 (Adaptee)**。一个比较典型的例子是，插座转接头可以被认为是一种适配器，可以把本身不兼容的接口，通过转接变得可以一起工作。

![适配器模式示意图，图源网络](https://files.flutter-io.cn/posts/community/tutorial/images/2021-09-05-002.jpeg)

在代码世界中，也有很多接口不适配的场景，如我们引入了一个第三方库后，发现它其中的类实现与我们现有代码并不兼容，需要一个 Adapter 类做一层转换才行。另外，相较于直接接触原始的代码实现，这种模式下，客户端仅仅依赖适配器类，对于代码复用和维护性也多了一层保障。

## 类适配器与对象适配器

![适配器模式 UML 图](https://files.flutter-io.cn/posts/community/tutorial/images/2021-09-05-1_2oBi8WnJT31i2E-KaW0rhw.png)

适配器模式有两种实现方式：**类适配器** 和 **对象适配器**。其中，类适配器使用继承关系来实现，而对象适配器使用组合关系来实现。具体的代码实现如下所示。

```dart
/// 被适配者
class Adaptee {
  String concreteOperator() {
    return 'Adaptee';
  }
}

abstract class ITarget {
  String operator();
}

/// 对象适配器
class ObjectAdapter implements ITarget {
  var adaptee = Adaptee();

  String operator() {
    return adaptee.concreteOperator();
  }
}

/// 类适配器
class ClassAdapter extends Adaptee {
  String operator() {
    return super.concreteOperator();
  }
}
```

`ITarget` 表示要转化成的接口，是一个规范化的接口定义。
Dart 本身不支持关键词 `interface`，因此我们可以创建一个没有默认实现的抽象类代替。

需要被适配的 `Adaptee` 表示一组不兼容 `ITarget` 接口定义的类或接口，`ObjectAdapter` 和 `ClassAdapter` 两种适配器分别用不同的方式将 `Adaptee` 转化成了符合 `ITarget` 接口定义的接口。而在客户端使用时只需要依赖 `ITarget` 即可完成对 `Adaptee` 的适配。

```dart
class Client {
  Client(this.adapter);

  final ITarget adapter;

  operator() {
    var result = adapter.operator();
    assert(result == 'Adaptee');
  }
}
```

关于类适配器与对象适配器：

- 如果希望你一个适配器可以同时适配多个不同的类，则单继承机制的 Dart 语言无法使用 **类适配器** 实现这种一对多的适配器。
- 如果 `Adaptee` 接口很多，而且 `Adaptee` 和 `ITarget` 接口定义大部分都相同，那我们推荐使用类适配器，因为 可以充分将继承的代码复用作用利用起来。
- 大部分场景下，我们推荐使用 **对象适配器** 的方式实现适配器模式，因为 **继承** 在很多情况下容易被 **滥用** 并造成 **层级过多** 的现象，而 **组合** 更加灵活。

## 实现

在代码应用中，适配器模式典型的例子是 Android 中的 ListView，在 Android 中，ListView 作为一个展示列表的 UI 组件，它的主要作用是将用户交给它的 Item View 以列表形式展示出来，然而描述 View 的形式却多种多样，可以是 Android 中 XML 布局，也可以是以 Java 代码中自定义 View 的形式提供，甚至可以是自定义的一套规则，实现自己的 UI 描述语言。

本身，XML 或者其他描述语言对于 ListView 是不可知的，所以，在 ListView 和它们之前介入一个适配器就可以有效的解决这个问题，适配器的作用就是将这些形式转换成 Item View 以适应 Listview。

在 Flutter 中，这种形式的模式很容易实现，例如，我们想自定义一个可以展示蔬果列表的组件 `VeggieList`：

```dart
class VeggieList extends StatefulWidget {
  @override
  _VeggieListState createState() => _VeggieListState();
}

class _VeggieListState extends State<VeggieList> {

  final List<Veggie> veggies = [];

  @override
  Widget build(BuildContext context) {
    return veggies.isEmpty
        ? Text('无水果')
        : Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        for (var veggie in veggies)
          ListTile(title: Text('${veggie.name}')))
      ],
    );
  }
}
```

这个组件主要关心的是 `veggies`，一个提供一组 `Veggie` 对象的数组。

`veggies` 数据源并不统一，可能来自多个不同的接口，可能在云端，也可能是本地的假数据，并且不同的接口提供的数据格式也可能不相同，可能是 xml 或者是 json。

```dart
/// 返回 json 数据格式的接口
class JsonVeggiesApi {
  final String _veggiesJson = '''
  {
    "veggies": [
      {
        "name": "apple (JSON)",
      },
      {
        "name": "banana (JSON)",
      },
    ]
  }
  ''';

  String getVeggiesJson() {
    return _veggiesJson;
  }
}

/// 返回 xml 数据格式的接口
class XmlVeggiesApi {
  final String _contactsXml = '''
  <?xml version="1.0"?>
  <veggies>
    <veggie>
      <name>apple (XML)</name>
    </veggie>
    <veggie>
      <name>banana (XML)</name>
    </veggie>
  </veggies>
  ''';

  String getVeggiesXml() {
    return _contactsXml;
  }
}
```

这些接口显然不能直接应用在 `VeggieList` 中展示，因此，需要做一些适配工作，适配的目的就是将这些数据转换成 `Veggie` 对象的数组，因此我们可以定义如下这个接口：

```dart
abstract class IVeggiesAdapter {
  List<Veggie> getVeggies();
}
```

其中的 `getVeggies` 方法返回的就是 `VeggieList` 组件需要的 `Veggie` 对象数组。

创建适配器时，只需要实现这个接口，然后组合目标需要被适配的类做接口转换即可，例如下面的 `JsonnVeggiesAdapter`，专门负责将 `JsonVeggiesApi` 转换为兼容 `VeggieList` 的适配器：

```dart
class JsonnVeggiesAdapter implements IVeggiesAdapter {
  final JsonVeggiesApi _api = JsonVeggiesApi();

  @override
  List<Veggie> getVeggies() {
    final veggiesJson = _api.getVeggiesJson();
    final veggiesList = _parseContactsJson(veggiesJson);

    return veggiesList;
  }

  List<Veggie> _parseContactsJson(String contactsJson) {
    final contactsMap = json.decode(contactsJson) as Map<String, dynamic>;
    final contactsJsonList = contactsMap['contacts'] as List;
    final contactsList = contactsJsonList.map((json) {
      final contactJson = json as Map<String, dynamic>;

      return Veggie(
        name: contactJson['name'] as String,
      );
    }).toList();

    return contactsList;
  }
}
```

最终，在使用到 `VeggieList` 时，注入 `JsonnVeggiesAdapter` 这个适配器就可以将原本不兼容的 `JsonVeggiesApi` 中的数据展示出来了：

```dart
class AdapterExample extends StatelessWidget {
  const AdapterExample();

  @override
  Widget build(BuildContext context) {
    return ScrollConfiguration(
      behavior: const ScrollBehavior(),
      child: SingleChildScrollView(
        child: VeggieList(
          adapter: JsonnVeggiesAdapter(),
        ),
      ),
    );
  }
}


/// 最终的 VeggieList
class VeggieList extends StatefulWidget {
  final IVeggiesAdapter adapter;

  const VeggieList({
    @required this.adapter,
  });

  @override
  _VeggieListState createState() => _VeggieListState();
}

class _VeggieListState extends State<VeggieList> {

  final List<Veggie> veggies = [];

  void _getVeggies() {
    setState(() {
      veggies.addAll(widget.adapter.getVeggies());
    });
  }

  @override
  Widget build(BuildContext context) {
    return veggies.isEmpty
        ? Text('无水果',)
        : Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        for (var veggie in veggies)
          ListTile(title: Text('${veggie.name}')))
      ],
    );
  }
}
```

同理，不同接口来源的数据都可以通过适配器实现 `IVeggiesAdapter` 接口与 `VeggieList` 做兼容。

## Flutter

在应用中，我们经常会使用到 **`CustomScrollView`** 创建拥有自定义滚动效果的组件，而 `CustomScrollView` 只允许包含 `sliver` 系列组件 (`SliverAppBar`、`SliverList`、`SliverPersistentHeader` 等) ，如果想包含普通的组件，必然需要使用 `SliverToBoxAdapter`：

```dart

return MaterialApp(
  home: CustomScrollView(
    controller: scrollController,
    slivers: <Widget>[
      SliverAppBar(),
      SliverToBoxAdapter(
        child: Container(
          height: 100.0,
        ),
      ),
    ],
  ),
);
```

这里，将 `Container` 放入 `SliverToBoxAdapter` 中便可以在 `CustomScrollView` 展示出来了。

我们认为普通的 widget 是不兼容 `CustomScrollView` 的，`SliverToBoxAdapter` 在其中就扮演了适配器的角色。它使用 **类适配器** 的方式，将 `SingleChildRenderObjectWidget` 中 `createRenderObject` 接口重写转换成可以包含 `RenderBox` (对应一般 widget 的 `RenderObject`) 的 `RenderSliver` (对应 sliver 系列 widget 的 `RenderObject`)，即这里的 `RenderSliverToBoxAdapter`：

```dart
class SliverToBoxAdapter extends SingleChildRenderObjectWidget {
  /// Creates a sliver that contains a single box widget.
  const SliverToBoxAdapter({
    Key? key,
    Widget? child,
  }) : super(key: key, child: child);

  @override
  RenderSliverToBoxAdapter createRenderObject(BuildContext context) => RenderSliverToBoxAdapter();
}
```

## 拓展阅读

- 适配器模式：https://refactoringguru.cn/design-patterns/adapter
- 组合优于继承：https://time.geekbang.org/column/article/169593
- Flutter Sliver：https://juejin.cn/post/6844903901720739848

## 关于本系列文章

Flutter / Dart 设计模式从南到北 (简称 Flutter 设计模式) 系列内容由 CFUG 社区成员、《Flutter 开发之旅从南到北》作者、小米工程师杨加康撰写并发布在 Flutter 社区公众号和 flutter.cn 网站的社区教程栏目。

本系列内容旨在推进 Flutter / Dart 语言特性的普及，帮助开发者更高效地开发出高质量、可维护的 Flutter 应用。如果你对本文还有任何疑问或者文章的建议，欢迎向中文社区官方 GitHub 仓库 (cfug/flutter.cn) 提交 Issue 或者直接与我联系 (yangjiakay@gmail.com)。
