---
title: 流动的观察者模式
toc: true
---

文/ 杨加康，CFUG 社区成员，《Flutter 开发之旅从南到北》作者，小米工程师

**观察者模式**，又称发布订阅模式，是一种行为设计模式——你可以定义一种订阅机制，可在对象事件发生时通知多个 **观察** 该对象的其他对象。

>> 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。
>>
>> 这个主题对象在状态上发生变化时，会通知所有观察者对象，让它们能够自动更新自己。

![]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-08-14-ObserverPattern.png)

从定义中，不难发现，**观察者** 与 **被观察者 / 发布者** 是这个模式中最重要的组成元素。

![]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-08-14-Observer1.png)

微信的公众号可以被视为生活中最典型的观察者模式的例子。如果你订阅了「Flutter社区」，每当 Flutter 社区发布文章时，就会给你及其他订阅者推送这个消息，这其中你就是 **观察者**，公众号「Flutter社区」就是 **被观察者 (Observable) 或发布者 (Subject)**。

观察者模式经常被应用在这类事件处理系统中，从概念上理解，被观察者也经常被称作是 **事件流 (stream of events)** 或者说是 **事件流的来源 (stream source of events)**，而观察者相当于 **事件接收器 (sinks of events)**。

同时，观察者模式也是实现 **响应式编程** 的基础，RxDart、EventBus 等库都是观察者模式下的产物。

## 面向对象

面向对象中，观察者和和发布者 (被观察者) 分别对应两个类 (Observer 和 Subject) 的对象。

![观察者模式 UML 图，图源维基百科]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-08-04-2880px-Observer_w_update.svg.png)

发布类 (Subject) 中通常会有提供给每个对象订阅或取消订阅发布者事件流的 **订阅机制**，包括：

1. 一个用于存储订阅者对象引用的列表成员变量；
2. 几个用于添加或删除该列表中订阅者的公有方法。

```dart
// 被观察者
class Subject {
  List<Observer> _observers;
  Subject([List<Observer> observers]) {
    _observers = observers ?? [];
  }

  // 注册观察者
  void registerObserver(Observer observer) {
    _observers.add(observer);
  }
  
  // 解注册观察者
  void unregisterObserver(Observer observer) {
    _observers.remove(observer)
  }

  // 通知观察者
  void notifyobservers(Notification notification) {
    for (var observer in _observers) {
      observer.notify(notification);
    }
  }
}
```

此时，每当事件发生，它只需遍历订阅者并调用其对象的特定通知方法即可 (如上面代码中的 `notifyobservers` 方法) 。

实际应用中，一个发布者通常会对应多个订阅者，且发布者与订阅者应当遵循面向对象的开发设计原则，因此：

1. 为了避免耦合，订阅者们必须实现同样的接口；
2. 发布者仅通过该接口与订阅者交互，接口方法可以声明参数， 这样发布者在发出通知时就能传递一些上下文数据 (如下面代码中的 notification 对象) 。

```dart
// 观察者
class Observer {
  String name;
  
  Observer(this.name);

  void notify(Notification notification) {
    print("[${notification.timestamp.toIso8601String()}] Hey $name, ${notification.message}!");
  }
}
```

这样，我们可以得出如下这样用 Dart 语言实现的观察者模式了，下面是一个简单的应用：

```dart
// 具体的被观察者 CoffeeMaker
// 每当 Coffee 制作完成发出通知给观察者。
class CoffeeMaker extends Subject {
  CoffeeMaker([List<Observer> observers]) : super(observers);
  
  void brew() {
    print("Brewing the coffee...");
    notifyobservers(Notification.forNow("coffee's done"));
  }
}

void main() {
  var me = Observer("Tyler");
  var mrCoffee = CoffeeMaker(List.from([me]));
  var myWife = Observer("Kate");
  mrCoffee.registerObserver(myWife);
  mrCoffee.brew();
}
```

这里的 CoffeeMaker 继承自 Subject，作为一个具体的发布类，`brew()` 方法是其内部，每当咖啡制作完成后，用于通知其他各个观察者的方法。上面代码中，我们在 `mrCoffee` 这台咖啡机上注册了 `myWife` 这一个观察者，`mrCoffee.brew();` 触发后，`myWife` 内部的 `notify`  方法就会被调用。

观察者模式很好的实现了他们两者之间发布订阅的关系，在实际应用中，被观察者正在处理的事件很可能是异步的，而作为观察者不必显示的去阻塞等待事件的完成，而是由被观察者通知，当事件完成后，再将事件主动地「推」给关心这个事件的观察者。与之相对的，有一类观察者也会使用后台线程时刻轮询地监听着其关心的主题事件，这个话题我们暂不展开。

观察者模式使用不慎的话，也很容易出现传说中的 **失效监听器** 问题，导致内存泄漏，因为在基本实现中，被观察者依然持有观察者的强引用，如果事件中途，被观察者已经不存在时或不再关心此事件，就会导致观察者无法被回收，因此，我们在这种情况下应当在被观察中做好取消订阅的机制，及时释放无用的资源。

## Dart

Stream 可以被看作是 Dart 语言原生支持的观察者模式的典型模型之一，它本身是 `Dart:async` 包中一个用于异步操作的类，响应式编程库 RxDart 也是基于 Stream 封装而成的。

从概念上讲，我们可以将 Stream 看做是一个可以连接两端的传送带，作为开发者，我们可以在传送带的一端放入数据，Stream 就会将这些数据传送到另一端。

![]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-08-12-stream.svg)

和现实中的情况类似，如果传送带的另一端没有人接受数据，这些数据就会被程序丢弃，因此，我们通常会在传送到尾端安排一个接收数据的对象，在响应式编程中，它被称为数据的观察者。

![]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-08-12-stream4.svg)

如果说上文 Dart 面向对象中，观察者和被观察者两者的关系是在尽量保持低耦合的情况下而形成的，相对独立。那么在响应式编程中，它们的关系就是变得更加紧密的 **上游与下游** 的关系。

因为 Stream，顾名思义，就是「流」的含义，被观察者在流的入口产生事件，观察者则在流的出口等待数据或事件的到来。

![]({{site.flutter-files-cn}}/posts/community/tutorial/images/2021-08-14-Observer2.png)

在这套流程里，观察者的 **订阅** 与被观察者的 **事件发布** 等一系列操作都直接在 Stream 或者说是框架内部完成的。

Dart 中，我们可以使用 StreamController 来创建流：

```dart
var controller = new StreamController<int>();

controller.add(1); // 将数据放入流中
```

如上面代码所示，创建 `StreamController` 时必须指定泛型类型来定义可以加入 `Stream` 的数据对象，上面的 `controller` 可以接受 `int` 类型的数据，我们使用它的 `add` 方法就可以将数据放入到它的传送带中。

如果我们直接运行上面的两行代码，最终并不会不到任何结果，因为我们还没有为传送带设置接收数据的对象：

```dart
var controller = new StreamController<int>();

controller.stream.listen((item) => print(item)); // 数据观察者函数

controller.add(1);
controller.add(2);
controller.add(3);
```

上面的代码中，我们通过调用 StreamController 内部的 stream 对象的 listen 方法，就可以为 controller 对象添加监听这个 Stream 事件的观察者，这个方法接受一个回调函数，这个回调函数又接受一个我们在 `new StreamController<int>()` 泛型中声明的数据对象作为参数。

这时，每当我们再次通过 `add` 方法将数据放入传送带后，就会通知观察者，调用这个函数，并将传递的数据打印出来：

```dart
1
2
3
```

另外，我们也可以使观察者在某个时间段后停止监听 Stream 中传递的数据，在上面代码中的 `listen` 函数会返回一个  `StreamSubscription` 类型的订阅对象，当我们调用它的 `.cancel()` 后就会释放这个观察者，不再接收数据：

```dart
var controller = new StreamController<String>();

StreamSubscription subscription = controller.stream.listen((item) => print(item));

controller.add(1);
controller.add(2);
controller.add(3);

await Future.delayed(Duration(milliseconds: 500));

subscription.cancel();
```

## Flutter

### ChangeNotifier

ChangeNotifier 大概是 Flutter 中实现观察者模式最典型的例子了，它实现自 Listenable，内部维护一个 `_listeners` 列表用来存放观察者，并实现了 `addListener`、`removeListener` 等方法来完成其内部的订阅机制：

```dart
class ChangeNotifier implements Listenable {
  LinkedList<_ListenerEntry>? _listeners = LinkedList<_ListenerEntry>();

  @protected
  bool get hasListeners {
    return _listeners!.isNotEmpty;
  }
  
  @override
  void addListener(VoidCallback listener) {
    _listeners!.add(_ListenerEntry(listener));
  }

  @override
  void removeListener(VoidCallback listener) {
    for (final _ListenerEntry entry in _listeners!) {
      if (entry.listener == listener) {
        entry.unlink();
        return;
      }
    }
  }

  @mustCallSuper
  void dispose() {
    _listeners = null;
  }

  @protected
  @visibleForTesting
  void notifyListeners() {
    if (_listeners!.isEmpty)
      return;
    final List<_ListenerEntry> localListeners = List<_ListenerEntry>.from(_listeners!);
    for (final _ListenerEntry entry in localListeners) {
      try {
        if (entry.list != null)
          entry.listener();
      } catch (exception, stack) {
        // ...
      }
    }
  }
}
```

在实际使用时，我们只需要继承 ChangeNotifier 便能具备这种订阅机制，如下这个 CartModel 类：

```dart
class CartModel extends ChangeNotifier {
  final List<Item> _items = [];

  UnmodifiableListView<Item> get items => UnmodifiableListView(_items);

  int get totalPrice => _items.length * 42;

  void add(Item item) {
    _items.add(item);
    notifyListeners();
  }

  void removeAll() {
    _items.clear();
    notifyListeners();
  }
}
```

`CartModel` 内部维护一个 `_items` 数组，`add`、`removeAll` 方法时提供给外部操作该数组的接口，每当 `_items` 改变则会调用 `notifyListeners()` 通知它的所有观察者。

`ChangeNotifier` 作为 `flutter:foundation` 中最基础的类，不依赖其他任何上层的类，测试起来也非常简单，我们可以针对 `CartModel` 做一个简单的单元测试：

```dart
test('adding item increases total cost', () {
  final cart = CartModel();
  final startingPrice = cart.totalPrice;
  cart.addListener(() {
    expect(cart.totalPrice, greaterThan(startingPrice));
  });
  cart.add(Item('Dash'));
});
```

这里，当我们调用 `cart.add(Item('Dash'));` 后，就是会触发观察者函数的调用，实现一种由数据的改变驱动事件执行的机制。

Flutter 应用中最传统的状态管理方案是使用有状态 widget 的 `setState` 的方法，这种方式暴露出来的问题是，大型应用中的 widget 树会非常复杂，每当状态更新调用 `setState` 时，则会牵一发而动全身，重建所有子树，使性能大打折扣。

那么，当将 `ChangeNotifier` 观察者模式应用在状态管理方案中时，便能解决这个问题。设想让每一个最小组件充当观察者，观察应用的状态，每当状态改变时即驱动该局部小组件更新，是不是就能达到这种目的。我们常用 provider 库就应用了这个原理。

provider 内部提供了一个 ChangeNotifierProvider widget，可以向其子组件暴露一个 ChangeNotifier 实例 (被观察者) ：

```dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CartModel(),
      child: const MyApp(),
    ),
  );
}
```

在子组件中，只需要使用 Consumer widget 注册观察者组件，就能接收到 `CartModel` 内部数据更新的通知：

```dart
return Consumer<CartModel>(
  builder: (context, cart, child) {
    return Text("Total price: ${cart.totalPrice}");
  },
);
```

这里，使用 Consumer 必须指定要观察的 ChangeNotifier 类型，我们要访问 `CartModel` 那么就写上 `Consumer<CartModel>`，builder 最为 Consumer 唯一一个必要参数，用来构建展示在页面中的子组件。

当 `ChangeNotifier` 发生变化的时候会调用 builder 这个函数。 (换言之，当调用 `CartModel` 的  `notifyListeners()` 方法时，所有相关的 `Consumer` widget 的 builder 方法都会被调用。) ，重建子树，达到局部更新状态的目的。

### Navigator

路由是在 Flutter 应用中常去讨论的话题，在整个应用运行过程中，路由操作也都需要被时刻关注着，它是我们了解用户行为的一种有效的方式。Flutter 提供了一套很方便的观察者模式的模型帮助我们实现这个功要求。

Flutter 中每个 Navigator 对象都接受一个 NavigatorObserver 对象的数组，在实际开发过程中，我们可以通过根组件 `MaterialApp` (或 `CupertinoPageRoute`)  的 `navigatorObservers` 属性传递给根 Navigator 组件，用于观察根 Navigator 的路由行为，这一组 NavigatorObserver 对象就是一系列的路由观察者。

```dart
 Widget build(BuildContext context) {
    return new MaterialApp(
      navigatorObservers: [new MyNavigatorObserver()],
      home: new Scaffold(
        body: new MyPage(),
      ),
    );
  }
```

路由观察者们统一继承自 RouteObserver，范型类型为 PageRoute，这时，它就能监听 CupertinoPageRoute 和 MaterialPageRoute 两种类型的路由了：

```dart
class MyRouteObserver extends RouteObserver<PageRoute<dynamic>> {

  // 监听导航器的 push 操作
  @override
  void didPush(Route<dynamic> route, Route<dynamic> previousRoute) {
    super.didPush(route, previousRoute);
    if (previousRoute is PageRoute && route is PageRoute) {
      print('${previousRoute.settings.name} => ${route.settings.name}');
    }
  }

  // 监听导航器的 replace 操作
  @override
  void didReplace({Route<dynamic> newRoute, Route<dynamic> oldRoute}) {
    super.didReplace(newRoute: newRoute, oldRoute: oldRoute);
    if (newRoute is PageRoute) {
      print('${oldRoute.settings.name} => ${oldRoute.settings.name}');
    }
  }

  // 监听导航器的 pop 操作
  @override
  void didPop(Route<dynamic> route, Route<dynamic> previousRoute) {
    super.didPop(route, previousRoute);
    if (previousRoute is PageRoute && route is PageRoute) {
      print('${route.settings.name} => ${previousRoute.settings.name}');
    }
  }
}
```

在我们做实际路由操作，调用 `Navigator` 的 `pop`，`push` 等方法时，就会按照惯例遍历调用这些观察者对象对应的方法：

```dart
 Future<T> push<T extends Object>(Route<T> route) {
  // ...
  for (NavigatorObserver observer in widget.observers)
    observer.didPush(route, oldRoute);
	// ...
}
```

这样，观察者模式在 Flutter 路由中又完成了这个非常重要的任务。

## 本文小结

本文内容到这里就结束了，观察者模式的场景例子数不胜数，在实际开发中，我们也会经常需要使用到，但我们要记住的是设计模式的运用并不是套用模版，而是要根据实际场景找到最合适的解决方案。

对于行为型模式来说，观察者模式将被观察者与观察者这两件事物抽象出来，实现了代码上的解藕，在实际场景中，观察者可能是关心某种状态的组件，监听某个事件的监听器等等，整体的设计也会变得更加直观，希望大家能在以后的开发中多多使用。

## 拓展阅读

- [《Flutter开发之旅从南到北》](https://item.jd.com/12757223.html) —— 第8章 路由管理 & 第9章 状态管理
- [观察者模式 wikipedia](https://en.wikipedia.org/wiki/Observer_pattern)
- [Design Patterns in Dart](https://scottt2.github.io/design-patterns-in-dart/observer/)
- [什么是Stream](https://juejin.cn/post/6844903686737494023)
- [简单的应用状态管理](https://docs.flutter.cn/data-and-backend/state-mgmt/simple)

## 关于本系列文章

Flutter / Dart 设计模式从南到北 (简称 Flutter 设计模式) 系列内容由 CFUG 社区成员、《Flutter 开发之旅从南到北》作者、小米工程师杨加康撰写并发布在 Flutter 社区公众号和 flutter.cn 网站的社区教程栏目。

本系列预计两周发布一篇，着重向开发者介绍 Flutter 应用开发中常见的设计模式以及开发方式，旨在推进 Flutter / Dart 语言特性的普及，以及帮助开发者更高效地开发出高质量、可维护的 Flutter 应用。
