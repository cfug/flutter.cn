---
title: Flutter Navigator 2.0 指南与原理解析
toc: true
---

文/ 杨加康

Flutter 1.22 发布后，大家可以发现，
官方对路由相关 API 的改动很大，
设计文档中表示，由于传统的命令式 API，
如 `Navigator.pop()`、`Navigator.push()` 等接口，
并**没有给开发者一种灵活的方式去直接管理路由栈**，
甚至觉得已经过时了，一点也不 Flutter。

{{site.alert.note}}

As mentioned by a participant in one of Flutter's user studies, 
the API also feels outdated and not very Flutter-y.

{{site.alert.end}}

而 Navigator 2.0 引入了一套全新的声明式 API，
全新的实现方式与调用方法与以往都截然不同，
在官方推荐的 [Learning Flutter’s new navigation and routing system](https://medium.com/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade)
（译文：[Flutter Navigator 2.0 全面解析](https://mp.weixin.qq.com/s/zGpzJahDSTZDhWqYmkzi5g)）文章中，
许多读者也表示并不能立即适应 Navigator 2.0 的一些反差。

本文就来带领读者们进一步深入 Navigator 2.0 的基本原理，
帮助大家从中探索出最佳的使用方式。

## 为什么需要新的 API

在探究具体细节之前，我们有必要了解一下 
Flutter 团队为什么要不惜这些代价对 Navigator API 做这次的重构，
主要有如下几点原因。

- **原始 API 中的 `initialRoute` 参数，
  即系统默认的初始页面，在应用运行后就不能再更改了**。
  这种情况下，如果用户接收到一个系统通知，
  点击后想要从当前的路由栈状态 [Main -> Profile -> Settings] 
  重启切换到新的 [Main -> List -> Detail[id=24] 路由栈，
  旧的 Navigator API 并没有一种优雅的实现方式实现这种效果。

- **原始的命令式 Navigator API 只提供给了
  开发者一些非常针对性的接口，如 `push()`、`pop()` 等，
  而没有给出一种更灵活的方式让我们直接操作路由栈**。
  这种做法其实与 Flutter 理念相违背，
  试想如果我们想要改变某个 widget 的所有子组件
  只需要重建所有子组件并且创建一系列新的 widget 即可，
  而将此概念应用在路由中，
  当应用中存在一系列路由页面并想要更改时，
  我们只能调用 `push()`、`pop()` 这类接口来回操作，
  **这样的 Flutter 食之无味**。

- **嵌套路由下，手机设备自带的回退按钮
  只能由根 Navigator 响应**。
  在目前的应用中，我们很多场景都需要
  在某个子 tab 内单独管理一个子路由栈。
  假设有这个场景，用户在子路由栈中
  做一系列路由操作之后，点击系统回退按钮，
  消失的将是整个上层的根路由，
  我们当然可以使用某种措施来避免这种状况，
  但归咎起来，这也不应该是应用开发者应该考虑的问题。

于是，Navigator 2.0 就肩负着这千里之任来了。

## Navigator 2.0

Navigator 2.0 新增的声明式 API 主要包含
[Page](https://api.flutter-io.cn/flutter/widgets/Page-class.html) API、[Router](https://api.flutter-io.cn/flutter/widgets/Router-class.html) API 两个部分，
它们各自强大的功能为 Navigator 2.0 提供了强有力的基石，
本节我就带读者们看看它们各自的实现细节。

### Page

Page 是 Navigator 2.0 中最常见的类之一，
从名字就能知道它的含义就是 “**页面**”，
正如 widget 就是 **组件** 一样，
但 Page 与 Widget 的关系也更加微妙。

与 Flutter 中 Widget、Element、
RenderObject 三棵树的概念保持一致。
Widget 只保存组件配置信息，
框架层内置了一个 `createElement()` 可以创建
与之对应的 Element 实例。
Page 同样只保存页面路由相关信息，
框架层也存在一个 `createRoute()` 方法
可以创建与之对应的 Route 实例。

![](https://devrel.andfun.cn/devrel/posts/2020/11/bc57589cd7882.png)

English placeholder for the translation toggle tools issue.

Widget 和 Page 中也都有一个 `canUpdate()` 方法，
帮助 Flutter 判断其是否已更新或改变：

<!--skip-->
```dart
// Page
bool canUpdate(Page<dynamic> other) {
  return other.runtimeType == runtimeType &&
         other.key == key;
}

// Widget
static bool canUpdate(Widget oldWidget, Widget newWidget) {
  return oldWidget.runtimeType == newWidget.runtimeType
      && oldWidget.key == newWidget.key;
}
```

甚至连比较的条件都是 **运行时类型与 key**。

而在代码层面，Page 类就继承自我们在
旧的 Navigator API 用过的 `RouteSettings`：

<!--skip-->
```dart
abstract class Page<T> extends RouteSettings
```

其中就保存了包含路由名称（name，如 "/settings"）和
路由参数 (arguments) 等信息。

#### pages 参数

在新的 Navigator 组件中，新增了一个 `pages` 参数，
它接受的就是一个 Page 对象列表，如下这段代码：

<!--skip-->
```dart
class _MyAppState extends State<MyApp> {
  final pages = [
    MyPage(
      key: Key('/'),
      name: '/',
      builder: (context) => HomeScreen(),
    ),
    MyPage(
      key: Key('/category/5'),
      name: '/category/5',
      builder: (context) => CategoryScreen(id: 5),
    ),
    MyPage(
      key: Key('/item/15'),
      name: '/item/15',
      builder: (context) => ItemScreen(id: 15),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return //...
      Navigator(
          key: _navigatorKey,
          pages: List.of(pages),
        ),
  }
}
```

此时，运行应用，**Flutter 就会根据这里 pages 列表中的
所有 Page 对象在底层的路由栈生成对应的 Route 实例**，
即与 pages 对应的三个路由页面。

应用打开某个页面，就表示在 pages 中添加一个 Page 对象，
系统接收到上层的 pages 改变的通知后
就会 **比较新的 pages 与旧的 pages**，
根据比较结果，Flutter 就会在底层路由栈中新生成一个 Route 实例，
这样一个新的页面就算打开成功了。

<!--skip-->
```dart
void addPage(MyPage page) {
  setState(() => pages.add(page));
}
```

Navigator 组件同样也新增了一个 `onPopPage` 参数，
接受一个回调函数来响应页面的 pop 事件，
如下面代码中的 `_onPopPage` 函数：

<!--skip-->
```dart
class _MyAppState extends State<MyApp> {
  bool _onPopPage(Route<dynamic> route, dynamic result) {
    setState(() => pages.remove(route.settings));
    return route.didPop(result);
  }

  @override
  Widget build(BuildContext context) {
    print('build: $pages');
    return // ...
      Navigator(
        key: _navigatorKey,
        onPopPage: _onPopPage,
        pages: List.of(pages),
      )
  }
}
```

当我们调用 `Navigator.pop()` 关闭某个页面时，
即能触发这个函数调用，
而函数接受到的 route 对象参数就表示需要在 pages 中被移除的页面，
在这里，我们顺势更新 pages 列表做移除操作即可。

在 `_onPopPage` 中，如果我们同意关闭该页面，
则调用 `route.didPop(result)`，该函数默认返回 true。

当然，我们也完全可以选择在接收到通知时不更新 pages 列表，
这完全由我们控制，如下这段代码：

<!--skip-->
```dart
bool _onPopPage(Route<dynamic> route, dynamic result) {
  // setState(() => pages.remove(route.settings));
  return route.didPop(result);
}
```

那么，此时会导致什么现象？
`route.didPop(result)` 函数被直接触发，
表示在底层路由栈中弹出该页面，
这时，Flutter 就会比较
**底层已经关闭了一个页面的路由栈** 和 **当前 Navigator 中存有的 pages**，
发现不一致，就会按照现有的 pages 将多余的一个 Page 当做新页面，
再生成一个 Route 对象，这样，底层路由栈中的内容
就能随时保持与上层 pages 数据一致了。

也就是说，**某个页面是否能够关闭完全由开发者掌控**，
而不是单纯地交给系统的 `Navigator.pop()`。
这里，如果我们不想关闭某个页面，
也可以在 `onPopPage` 的回调函数中直接返回 false：

<!--skip-->
```dart
bool _onPopPage(Route<dynamic> route, dynamic result) {
  if (...) {
    return false;
  }
  setState(() => pages.remove(route.settings));
  return route.didPop(result);
}
```

需要注意的是，onPopPage 只响应路由栈顶层页面的推出，
中间页面的移除不会调用这个回调函数。

**这也合情合理**，如果我们想要移除非顶层页面，
那么下次弹出页面时候，底层路由栈会直接与
新的 pages 列表比较来做出相应改变。

要运行上述完整案例，查看 [完整代码](https://github.com/MeandNi/flutter_navigator_v2/blob/master/lib/pages_example.dart)。

Flutter 框架中预先内置了 `MaterialPage` 和 
`CupertinoPage` 两种 Page，分别表示 Material 
和 Cupertino 风格下的页面，
与之前我们常用的 `MaterialPageRoute` 
和 `CupertinoPageRoute` 相呼应，
它们都接受一个 child 组件表示该页面所要呈现的内容。
例如下面这个例子，我们可以直接在 pages 中
使用 `MaterialPage` 创建页面：

<!--skip-->
```dart
List<Page> pages = <Page>[
  MaterialPage(
    key: ValueKey('VeggiesListPage'),
    child: VeggiesListScreen(
      veggies: veggies,
      onTapped: _handleVeggieTapped,
    ),
  ),
  if (show404)
    MaterialPage(key: ValueKey('UnknownPage'), child: UnknownScreen())
  else if (_selectedVeggie != null)
    VeggieDetailsPage(veggie: _selectedVeggie)
];
```

我们也可以直接继承 Page 定义自己的页面类型，如下：

<!--skip-->
```dart
class MyPage extends Page {
  final Veggie veggie;

  MyPage({
    this.veggie,
  }) : super(key: ValueKey(veggie));

  Route createRoute(BuildContext context) {
    return MaterialPageRoute(
      settings: this,
      builder: (BuildContext context) {
        return VeggieDetailsScreen(veggie: veggie);
      },
    );
  }
}
```

这里，我们重写了 `createRoute()` 返回
一个 `MaterialPageRoute` 对象即可。

### Router

Router 是 Navigator 2.0 中新增的另一个非常重要的组件，
继承自 StatefulWidget，可以管理自己的状态。

它所管理的状态就是应用的 **路由状态**，
结合上节中提到的 Page 的概念，
我们就可以将其中的 pages 看做这里的路由状态，当
我们改变 pages 的内容或状态时，
Router 就会将该状态分发给子组件，
状态改变导致子组件重建应用最新的状态。

所以当 Navigator 作为 Router 的子组件时，
就会天然具有感知路由状态改变的能力了，如下图所示：

![](https://devrel.andfun.cn/devrel/posts/2020/11/957f7d75ef977.png)

当用户点击某个按钮就会触发类似下面这个函数的调用，
该函数又会导致状态改变而重建子组件。

<!--skip-->
```dart
void _pushPage() {
  MyRouteDelegate.of(context).push('Route$_counter');
}
```

Navigator 2.0 所强调的声明式 API 的核心就在于此，
我们操作路由的方式并非再是 push 或者 pop，
而是改变应用的状态了！
我们需要从观念上理解声明式 API 与以往的不同之处。

### Router 代理

Router 要完成上面所说的功能主要需要
通过配置 RouterDelegate（路由代理）实现。

Navigator 2.0 之后，Flutter 也提供了 
MaterialApp 的新构造函数 router 
来帮助我们直接在应用顶层
构造出全局的 Router 组件，使用方式如下：

<!--skip-->
```dart
MaterialApp.router(
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.blue,
    visualDensity: VisualDensity.adaptivePlatformDensity,
  ),
  routeInformationParser: MyRouteParser(),
  routerDelegate: delegate,
)
```

该构造函数接受一个 `routerDelegate` 参数，
这里，就可以传入我们自己创建的 
`MyRouteDelegate` 对象，具体代码如下：

<!--skip-->
```dart
class MyRouteDelegate extends RouterDelegate<String>
    with PopNavigatorRouterDelegateMixin<String>, ChangeNotifier {
  final _stack = <String>[];

  static MyRouteDelegate of(BuildContext context) {
    final delegate = Router.of(context).routerDelegate;
    assert(delegate is MyRouteDelegate, 'Delegate type must match');
    return delegate as MyRouteDelegate;
  }

  MyRouteDelegate({
    @required this.onGenerateRoute,
  });

  // ...
  @override
  Widget build(BuildContext context) {
    print('${describeIdentity(this)}.stack: $_stack');
    return Navigator(
      key: navigatorKey,
      onPopPage: _onPopPage,
      pages: [
        for (final name in _stack)
            MyPage(
              key: ValueKey(name),
              name: name,
              routeFactory: onGenerateRoute,
            ),
      ],
    );
  }
}
```

上面的 MyRouteDelegate 继承自 RouterDelegate，
内部可以实现它的 `setInitialRoutePath`、`setNewRoutePath`、
`build` 三个方法与 `currentConfiguration` 的 getter 方法，
并且也混入了 `PopNavigatorRouterDelegateMixin` 类，
它的主要作用是响应 Android 设备的回退按钮，
而 `ChangeNotifier` 作用便是做事件通知，
下文的 “[实现 RouterDelegate](#实现 routerdelegate)” 中
就会分析这些方法各自的作用。

这里，我们先看 `MyRouteDelegate.build` 方法，
与上一小节一样，我们可以通过传入 `pages` 和 `onPopPage` 参数
创建一个 Navigator 组件返回，
这样，当 MyRouteDelegate 组件
传入到 `MaterialApp.router()` 构造函数后，
这里的 Navigator 就顺利成为了 Router 的子组件了。

大部分情况下，一个自定义的路由代理就可以这样实现完成了。

### Router 事件

在应用开发中，Router 最根本的作用还是监听各种
来自系统的路由相关事件，包括：

- 首次启动应用程序时，系统请求的初始路由。
- 监听来自系统的新 intent，即打开一个新路由页面。
- 监听设备回退，关闭路由栈中顶部路由。

而要想完整的响应这些事件，
还得为 Router 配置 **RouteNameProvider Delegate** 
和 **BackButtonDispatcher Delegate**。

最初，应用启动或者打开新页面的事件从系统发出时，
**会转发给应用层一个表示该事件的字符串**，
RouteNameParser Delegate 会将该字符串传递给 RouteNameParser，
进而会解析成一个类型 `T` 的对象，
类型 `T` 默认为 `RouteSetting`，
其中就会包含传递的路由名称和参数等信息了。

类似地，用户点击设备回退按钮后，
会将该事件传递给 BackButtonDispatcher Delegate。

最终，RouteNameParser 解析的对象数据和 
BackButtonDispatcher Delegate 回退事件都会转发给
上文中的 RouteDelegate，RouteDelegate 接收到这些事件通知后，
就会执行响应，改变状态，
从而导致含有 pages 的 Navigator 组件重建，
在应用层中呈现最新的路由状态。

整个过程可以用下图表示：

![](https://devrel.andfun.cn/devrel/posts/2020/11/516f15849e0aa.png)

{{site.alert.note}}

需要知道的是，RouteNameProvider Delegate 和 
BackButtonDispatcher Delegate 都有 Flutter 内置的默认实现，
因此，大部分情况下，我们并不需要考虑其中的细节，
此时类型 `T` 默认为 RouteSetting
（与旧的 Navogator API 一致，包含路由信息）。

{{site.alert.end}}

从以上部分可以看出，
一系列的操作只是将最终事件传递给 RouterDelegate 而已，
之后状态更新等操作都可以由我们自定义的 RouterDelegate 决定。

### 实现 RouterDelegate

正如我们上文说的，Flutter 为 RouteNameProvider Delegate 
和 BackButtonDispatcher Delegate 都提供了默认实现，
而 RouterDelegate 则必须要我们手动实现，
并传递给 `MaterialApp.router()` 构造函数才行。

我们可以在这里完成各种业务相关的操作，
RouteDelegate 本身实现自 Listenable，即可监听对象，
也可以叫做被观察者，
每当状态改变时，观察者们就能通知它响应该事件，
从而促使 Navigator 组件重建，更新路由状态。

RouterDelegate 中的路由事件的通知主要由下面几个函数接收：

- backButtonDispatcher 发出回退按钮事件时，
会调用 RouterDelegate 的 `popRoute()` 方法，
由混入的 PopNavigatorRouterDelegateMixin 实现。
- 发出应用初始路由的通知时，
会调用 RouterDelegate 的 `setInitialRoutePath()` 方法，
该方法接受路由名称作为参数，
默认此方法会直接调用 RouterDelegate 的 `setNewRoutePath()` 函数。
- 系统通过 routeNameProvider 发出打开新路由页面的通知时，
直接调用 `setNewRoutePath()` 方法，
参数就是由 routeNameParser 解析的结果。

因此，我们最终就可以实现如下这样的 RouterDelegate：

<!--skip-->
```dart
class MyRouteDelegate extends RouterDelegate<String>
    with PopNavigatorRouterDelegateMixin<String>, ChangeNotifier {
  final _stack = <String>[];

  static MyRouteDelegate of(BuildContext context) {
    final delegate = Router.of(context).routerDelegate;
    assert(delegate is MyRouteDelegate, 'Delegate type must match');
    return delegate as MyRouteDelegate;
  }

  MyRouteDelegate({
    @required this.onGenerateRoute,
  });

  final RouteFactory onGenerateRoute;

  @override
  GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  @override
  String get currentConfiguration => _stack.isNotEmpty ? _stack.last : null;

  List<String> get stack => List.unmodifiable(_stack);

  void push(String newRoute) {
    _stack.add(newRoute);
    notifyListeners();
  }

  void pop() {
    if (_stack.isNotEmpty) {
      _stack.remove(_stack.last);
    }
    notifyListeners();
  }

  @override
  Future<void> setInitialRoutePath(String configuration) {
    return setNewRoutePath(configuration);
  }

  @override
  Future<void> setNewRoutePath(String configuration) {
    print('setNewRoutePath $configuration');
    _stack
      ..clear()
      ..add(configuration);
    return SynchronousFuture<void>(null);
  }

  bool _onPopPage(Route<dynamic> route, dynamic result) {
    if (_stack.isNotEmpty) {
      if (_stack.last == route.settings.name) {
        _stack.remove(route.settings.name);
        notifyListeners();
      }
    }
    return route.didPop(result);
  }

  @override
  Widget build(BuildContext context) {
    print('${describeIdentity(this)}.stack: $_stack');
    return Navigator(
      key: navigatorKey,
      onPopPage: _onPopPage,
      pages: [
        for (final name in _stack)
            MyPage(
              key: ValueKey(name),
              name: name,
            ),
      ],
    );
  }
}
```

这里的 `_stack` 表示一个数据集，
每个数据会在 build 函数中创建出一个 MyPage，默认为空。
应用启动时，会先调用这里的 
`setInitialRoutePath(String configuration)` 方法，
参数为 `/`，此时路由栈就会存在一个首页了。

完整代码，请 [参考这里](https://github.com/MeandNi/flutter_navigator_v2/blob/master/lib/router_example.dart)。

在子组件中，我们也可以使用 MyRouteDelegate，
通过如下方式打开或者关闭一个页面：

<!--skip-->
```dart
MyRouteDelegate.of(context).push('Route$_counter');

MyRouteDelegate.of(context).pop();
```

与 InheritWidget 的性质相同，
这里会触发 MyRouteDelegate 中，
我们自定义的 `push()` 和 `pop()` 方法操作声明的路由栈，
最终通知 Navigator 更新路由状态。

### 实现 RouteInformationParser

`MaterialApp.router` 除了需要接受
路由代理 `routerDelegate` 这个必要参数外，
还需要同时指定 `routeInformationParser` 参数，如下：

<!--skip-->
```dart
MaterialApp.router(
  title: 'Flutter Demo',
  routeInformationParser: MyRouteParser(), 	// 传入 MyRouteParser
  routerDelegate: delegate,
)
```

该参数接受一个 RouteInformationParser 对象，
定义该类通常有一个最简单直接的实现，如下：

<!--skip-->
```dart
class MyRouteParser extends RouteInformationParser<String> {
  @override
  Future<String> parseRouteInformation(RouteInformation routeInformation) {
    return SynchronousFuture(routeInformation.location);
  }

  @override
  RouteInformation restoreRouteInformation(String configuration) {
    return RouteInformation(location: configuration);
  }
}
```

MyRouteParser 继承自 RouteInformationParser，
并重写了父类 `parseRouteInformation()` 
和 `restoreRouteInformation()` 两个方法。

如上文所述，`parseRouteInformation()` 方法的作用就是
接受系统传递给我们的路由信息 routeInformation，
然后，返回转发给我们之前定义的路由代理 RouterDelegate，
解析后的类型为 RouteInformationParser 的泛型类型，
即这里的 String。也就是说，
下面这个 RouterDelegate 中 `setNewRoutePath()` 方法的
参数 `configuration` 就是从那里转发而来的：

<!--skip-->
```dart
@override
Future<void> setNewRoutePath(String configuration) {
  print('setNewRoutePath $configuration');
  _stack
    ..clear()
    ..add(configuration);
  return SynchronousFuture<void>(null);
}
```

`restoreRouteInformation()` 方法返回一个 
RouteInformation 对象，表示从传入的 `configuration` 恢复路由信息。
与 `parseRouteInformation()` 相呼应。

例如，在浏览器中，Flutter 应用所在的标签被关闭，
此时如果我们想要恢复整个页面的路由栈则需要重写此方法，

上面 MyRouteParser 的实现，是最简单的实现方式，
功能就是在 `parseRouteInformation()` 中接受底层的 `routeInformation`，
在 `restoreRouteInformation()` 中恢复上层的 `configuration`。

我们也可以继续为这两个方法赋能，
实现更符合业务需求的逻辑，如下这代码：

<!--skip-->
```dart
import 'package:flutter/material.dart';
import 'package:flutter_navigator_v2/navigator_v2/model.dart';

class VeggieRouteInformationParser extends RouteInformationParser<VeggieRoutePath> {
  @override
  Future<VeggieRoutePath> parseRouteInformation(
      RouteInformation routeInformation) async {
    print("parseRouteInformation");
    final uri = Uri.parse(routeInformation.location);
    // Handle '/'
    if (uri.pathSegments.length == 0) {
      return VeggieRoutePath.home();
    }

    // Handle '/veggie/:id'
    if (uri.pathSegments.length == 2) {
      if (uri.pathSegments[0] != 'veggie') return VeggieRoutePath.unknown();
      var remaining = uri.pathSegments[1];
      var id = int.tryParse(remaining);
      if (id == null) return VeggieRoutePath.unknown();
      return VeggieRoutePath.details(id);
    }

    // Handle unknown routes
    return VeggieRoutePath.unknown();
  }

  @override
  RouteInformation restoreRouteInformation(VeggieRoutePath path) {
    print("restoreRouteInformation");
    if (path.isUnknown) {
      return RouteInformation(location: '/404');
    }
    if (path.isHomePage) {
      return RouteInformation(location: '/');
    }
    if (path.isDetailsPage) {
      return RouteInformation(location: '/veggie/${path.id}');
    }
    return null;
  }
}
```

这里的 VeggieRouteInformationParser 
继承的 RouteInformationParser 泛型类型被指定为了
我们自定义的 VeggieRoutePath，
在 Navigator 2.0 中我们称这个解析后的形式为 **路由 Model**。

此时 VeggieRouteInformationParser 作用就凸显出来了，
它在 `parseRouteInformation()` 方法中
接受到系统传递过来的 RouteInformation 信息后就可以将其转换成
我们上层熟悉的 VeggieRoutePath Model 对象。
VeggieRoutePath 类内容如下：

<!--skip-->
```dart
class VeggieRoutePath {
  final int id;
  final bool isUnknown;

  VeggieRoutePath.home()
      : id = null,
        isUnknown = false;

  VeggieRoutePath.details(this.id) : isUnknown = false;

  VeggieRoutePath.unknown()
      : id = null,
        isUnknown = true;

  bool get isHomePage => id == null;

  bool get isDetailsPage => id != null;
}
```

此时，在 `RouterDelegate<VeggieRoutePath>` 中，
我们就可以根据该对象做路由状态的更新了。

## 最佳实践

Navigator 2.0 与以往不同的方面主要体现在，
将路由状态转换成了应用本身的状态，
给了开发者更大的自由与想象空间，
此后，我们可以将路由逻辑及其状态的管理
与我们的业务逻辑紧密相连，
形成自己的一套方案，
相信这又会是以后 Flutter 体系中一块大主题。

上述提及的所有代码包含三个案例，分别是：

- [pages_example.dart](https://github.com/MeandNi/flutter_navigator_v2/blob/master/lib/pages_example.dart)，Navigator + Page 实现路由状态管理。
- [router_example.dart](https://github.com/MeandNi/flutter_navigator_v2/blob/master/lib/router_example.dart)，Router + Navigator + Page 实现路由状态的统一管理
- [水果列表最佳实践](https://github.com/MeandNi/flutter_navigator_v2/blob/master/lib/)，相对完整的一个案例，包含自定义 RouteInformationParser Model 和路由状态管理操作。

[示例完整源码地址](https://github.com/MeandNi/flutter_navigator_v2)。

## 写在最后

感谢 [@Vadaski](https://github.com/Vadaski)、[@Alex Li](https://github.com/AlexV525) 对本文的 Review。

如果你对本文还有任何疑问或者文章的建议，
欢迎向我的 Github 中的示例仓库提交 issue 
或者通过邮箱与我联系，我会及时回复。

**本文作者：** 杨加康

《Flutter 开发之旅从南到北》作者，现就职于小米浏览器团队。

联系方式：yangjiakay@gmail.com
