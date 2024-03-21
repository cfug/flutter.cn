---
title: Flutter 状态管理框架 Provider 和 Get 分析
toc: true
---

文/ Nayuta，CFUG 社区

状态管理一直是 Flutter 开发中一个火热的话题。谈到状态管理框架，社区也有诸如有以
[Get](https://pub.flutter-io.cn/packages/get)、[Provider](https://pub.flutter-io.cn/packages/provider)
为代表的多种方案，它们有各自的优缺点。
面对这么多的选择，你可能会想：「我需要使用状态管理么？哪种框架更适合我？」
本文将从作者的实际开发经验出发，分析状态管理解决的问题以及思路，希望能帮助你做出选择。

## 为什么需要状态管理？

首先，为什么需要状态管理？
根据笔者的经验，这是因为 Flutter 基于
[**声明式**](https://docs.flutter.cn/resources/architectural-overview#reactive-user-interfaces) 构建 UI ，
使用状态管理的目的之一就是解决「声明式」开发带来的问题。

「声明式」开发是一种区别于传原生的方式，所以我们没有在原生开发中听到过状态管理，那如何理解「声明式」开发呢？

### 「声明式」VS「命令式」分析

以最经典的的计数器例子分析：

![通过计数器 app 理解 Flutter 的「声明式」和「命令式」](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220417103627166.jpg)

如上图所示：点击右下角按钮，显示的文本数字加一。
Android 中可以这么实现：当右下角按钮点中时，
拿到 `TextView` 的对象，手动设置其展示的文本。

实现代码如下：

```java
// 一、定义展示的内容
private int mCount =0;
 
// 二、中间展示数字的控件 TextView
private TextView mTvCount;
 
// 三、关联 TextView 与 xml 中的组件
mTvCount = findViewById(R.id.tv_count)
 
// 四、点击按钮控制组件更新
private void increase( ){ 
	mCount++;
	mTvCounter.setText(mCount.toString()); 
}

```

而在 Flutter 中，我们只需要使变量增加之后调用 `setState((){})` 即可。`setState` 会刷新整个页面，使得中间展示的值进行变更。

```dart
// 一、声明变量
int _counter =0; 

// 二、展示变量 
Text('$_counter')

//  三、变量增加，更新界面
setState(() {
   _counter++; 
});
```

可以发现，Flutter 中只对 `_counter` 属性进行了修改，并没有对 Text 组件进行任何的操作，整个界面随着状态的改变而改变。

所以在 Flutter 中有这么一种说法: **UI = f(state)**:

![](https://files.flutter-io.cn/posts/community/tutorial/images/2022-05-03-ui-equals-function-of-state.jpg)

上面的例子中，状态 (state) 就是 `_counter` 的值，调用 `setState` 驱动 `f` build 方法生成新的 UI。

那么，声明式有哪些优势，并带来了哪些问题呢？

**优势: 让开发者摆脱组件的繁琐控制，聚焦于状态处理**

习惯 Flutter 开发之后，回到原生平台开发，你会发现当多个组件之间相互关联时，对于 View 的控制非常麻烦。

而在 Flutter 中我们只需要处理好状态即可 (复杂度转移到了状态 -> UI 的映射，也就是 Widget 的构建)。包括 Jetpack Compose、Swift 等技术的最新发展，也是在朝着「声明式」的方向演进。

**声明式开发带来的问题**

没有使用状态管理，直接「声明式」开发的时候，遇到的问题总结有三个:
1. 逻辑和页面 UI 耦合，导致无法复用/单元测试、修改混乱等
1. 难以跨组件 (跨页面) 访问数据
1. 无法轻松的控制刷新范围 (页面 setState 的变化会导致全局页面的变化)

接下来，我先带领大家逐个了解这些问题，下一章向大家详细描述状态管理框架如何解决这些问题。

**1) 逻辑和页面 UI 耦合，导致无法复用/单元测试、修改混乱等**

![](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416153119414.jpg)

一开始业务不复杂的时候，所有的代码都直接写到 widget 中，随着业务迭代，
文件越来越大，其他开发者很难直观地明白里面的业务逻辑。
并且一些通用逻辑，例如网络请求状态的处理、分页等，在不同的页面来回粘贴。

这个问题在原生上同样存在，后面也衍生了诸如 MVP 设计模式的思路去解决。

**2) 难以跨组件 (跨页面) 访问数据**

![](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416152601484.jpg)

第二点在于跨组件交互，比如在 Widget 结构中，
一个子组件想要展示父组件中的 `name` 字段，
可能需要层层进行传递。

又或者是要在两个页面之间共享筛选数据，
并没有一个很优雅的机制去解决这种跨页面的数据访问。

**3) 无法轻松的控制刷新范围 (页面 setState 的变化会导致全局页面的变化)**

最后一个问题也是上面提到的优点，很多场景我们只是部分状态的修改，例如按钮的颜色。
但是整个页面的 `setState` 会使得其他不需要变化的地方也进行重建，
带来不必要的开销。

## Provider、Get 状态管理框架设计分析

Flutter 中状态管理框架的核心在于这三个问题的解决思路，
下面一起看看 Provider、Get 是如何解决的：

### 解决逻辑和页面 UI 耦合问题

传统的原生开发同样存在这个问题，Activity 文件也可能随着迭代变得难以维护，
这个问题可以通过 MVP 模式进行解耦。

简单来说就是将 View 中的逻辑代码抽离到 Presenter 层，
View 只负责视图的构建。

![](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416152955696.jpg)

这也是 Flutter 中几乎所有状态管理框架的解决思路，
上图的 Presenter 你可以认为是 Get 中的 `GetController`、
Provider 中的 `ChangeNotifier` 或者 Bloc 中的 `Bloc`。
值得一提的是，具体做法上 Flutter 和原生 MVP 框架有所不同。

我们知道在经典 MVP 模式中，
一般 View 和 Presenter 以接口定义自身行为 (action)，
**相互持有接口进行调用** 。

![](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416153312721.jpg)

但 Flutter 中不太适合这么做，
从 Presenter → View 关系上 View 在 Flutter 中对应 Widget，
但在 Flutter 中 Widget 只是用户声明 UI 的配置，
直接控制 Widget 实例并不是好的做法。

而在从 View → Presenter 的关系上，
Widget 可以确实可以直接持有 Presenter，
但是这样又会带来难以数据通信的问题。

这一点不同状态管理框架的解决思路不一样，从实现上他们可以分为两大类：

- 通过 **Flutter 树机制** 解决，例如 Provider；
- 通过 **依赖注入**，例如 Get。

**1) 通过 Flutter 树机制处理 V → P 的获取**

![](https://files.flutter-io.cn/posts/community/tutorial/images/2022-05-03-three-trees-on-flutter.jpg)

```dart
abstract class Element implements BuildContext { 
	/// 当前 Element 的父节点
	Element? _parent; 
}

abstract class BuildContext {
	/// 查找父节点中的T类型的State
	T findAncestorState0fType<T extends State>( );

	/// 遍历子元素的element对象
	void visitChildElements(ElementVisitor visitor);

	/// 查找父节点中的T类型的 InheritedWidget 例如 MediaQuery 等
	T dependOnInheritedWidget0fExactType<T extends InheritedWidget>({ 
		Object aspect });
	……
} 
```
<center> Element 实现了父类 BuildContext 中操作树结构的方法 </center>

我们知道 Flutter 中存在三棵树，Widget、Element 和 RenderObject。
所谓的 **Widget 树其实只是我们描述组件嵌套关系的一种说法，是一种虚拟的结构**。
但 Element 和 RenderObject 在运行时实际存在，
可以看到 Element 组件中包含了 `_parent` 属性，存放其父节点。
而它实现了 `BuildContext` 接口，包含了诸多对于树结构操作的方法，
例如 `findAncestorStateOfType`，向上查找父节点；
`visitChildElements` 遍历子节点。

在一开始的例子中，我们可以通过 `context.findAncestorStateOfType`
一层一层地向上查找到需要的 Element 对象，
获取 Widget 或者 State 后即可取出需要的变量。

![](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416154300160.jpg)

provider 也是借助了这样的机制，完成了 View -> Presenter 的获取。
通过 `Provider.of` 获取顶层 Provider 组件中的 Present 对象。
显然，所有 Provider 以下的 Widget 节点，
都可以通过自身的 context 访问到 Provider 中的 Presenter，
很好地解决了跨组件的通信问题。

**2) 通过依赖注入的方式解决 V → P**

树机制很不错，但依赖于 context，这一点有时很让人抓狂。
我们知道 Dart 是一种单线程的模型，
所以不存在多线程下对于对象访问的竞态问题。
基于此 Get 借助一个全局单例的 Map 存储对象。
通过依赖注入的方式，实现了对 Presenter 层的获取。
这样在任意的类中都可以获取到 Presenter。

![](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416154732460.jpg)

这个 Map 对应的 key 是 `runtimeType` + `tag`，
其中 tag 是可选参数，而 value 对应 `Object`，
也就是说我们可以存入任何类型的对象，并且在任意位置获取。

### 解决难以跨组件 (跨页面) 访问数据的问题

这个问题其实和上一部分的思考基本类似，所以我们可以总结一下两种方案特点：

![](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416154955957.jpg)

**Provider**
* 依赖树机制，必须基于 context
* 提供了子组件访问上层的能力

**Get**
* 全局单例，任意位置可以存取
* 存在类型重复，内存回收问题

### 解决高层级 setState 引起不必要刷新的问题

最后就是我们提到的高层级 `setState` 引起不必要刷新的问题，
Flutter 通过采用观察者模式解决，其关键在于两步：
1. 观察者去订阅被观察的对象；
1. 被观察的对象通知观察者。

![](https://files.flutter-io.cn/posts/community/tutorial/images/2022-05-03-2-steps-of-the-observer-mode.jpg)

系统也提供了 `ValueNotifier` 等组件的实现：

```dart
/// 声明可能变化的数据
ValueNotifier<int> _statusNotifier = ValueNotifier(0); 

ValueListenableBuilder<int>(
	// 建立与 _statusNotifier 的绑定关系 
	valueListenable: _statusNotifier, 
	builder: (c, data, _) {
		return Text('$data'); 
})

///数据变化驱动 ValueListenableBuilder 局部刷新 
_statusNotifier.value += 1;

```

了解到最基础的观察者模式后，看看不同框架中提供的组件：

比如 Provider 中提供了 `ChangeNotifierProvider`:

```dart
class Counter extend ChangeNotifier { 
	int count = 0;

	/// 调用此方法更新所有观察节点
	void increment() {
		count++;
		notifyListeners(); 
	}
}

void main() { 
	runApp(
		ChangeNotifierProvider(
			///  返回一个实现 ChangeNotifier 接口的对象 
			create: (_) => Counter(),
			child: const MyApp( ), 
		),
	);
 }

///  子节点通过 Consumer 获取 Counter 对象 
Consumer<Counter>(
	builder:(_, counter, _) => Text(counter.count.toString()) 

```

还是之前计数器的例子，这里 `Counter` 继承了
`ChangeNotifier` 通过顶层的 Provider 进行存储。
子节点通过 Consumer 即可获取实例，
调用了 `increment` 方法之后，只有对应的 Text 组件进行变化。

同样的功能，在 Get 中，
只需要提前调用 `Get.put` 方法存储 `Counter` 对象，
为 `GetBuilder` 组件指定 `Counter` 作为泛型。
因为 Get 基于单例，所以 `GetBuilder` 可以直接通过泛型获取到存入的对象，
并在 builder 方法中暴露。这样 `Counter` 便与组件建立了监听关系，
之后 `Counter` 的变动，只会驱动以它作为泛型的 `GetBuilder` 组件更新。

```dart
class Counter extends GetxController { 
	int count = 0;

	void increase() { 
		count++;
		update(); 
	}
}

/// 提前进行存储
final counter = Get.put(Counter( )); 

/// 直接通过泛型获取存储好的实例
GetBuilder<Counter>(
	builder: (Counter counter) => Text('${counter.count}') ); 

```

## 实践中的常见问题

在使用这些框架过程中，可能会遇到以下的问题：

### Provider 中 context 层级过高

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Provider(
      create: (_) => const Count(),
      child: MaterialApp(
        home: Scaffold(
          body: Center(child: Text('${Provider.of<Counter>(context).count}')),
        ),
      ),
    );
  }
}
```

![](https://files.flutter-io.cn/posts/community/tutorial/images/2022-05-03-provider-level.jpg)

如代码所示，当我们直接将 Provider 与组件嵌套于同一层级时，
这时代码中的 `Provider.of(context)` 运行时抛出 `ProviderNotFoundException`。
因为此处我们使用的 context 来自于 MyApp，
但 Provider 的 element 节点位于 MyApp 的下方，
所以 `Provider.of(context)` 无法获取到 Provider 节点。
这个问题可以有两种改法，如下方代码所示：

**改法 1: 通过嵌套 Builder 组件，使用子节点的 context 访问:**

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Provider(
      create: (_) => const Count(),
      child: MaterialApp(
        home: Scaffold(
          body: Center(
            child: Builder(builder: (builderContext) {
              return Text('${Provider.of<Counter>(builderContext).count}');
            }),
          ),
        ),
      ),
    );
  }
}
```

**改法 2: 将 Provider 提至顶层:**

```dart
void main() {
  runApp(
    Provider(
      create: (_) => Counter(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(child: Text('${Provider.of<Counter>(context).count}')),
      ),
    );
  }
}
```

### Get 由于全局单例带来的问题

正如前面提到 Get 通过全局单例，默认以 `runtimeType` 为 key 进行对象的存储，
部分场景可能获取到的对象不符合预期，例如商品详情页之间跳转。
由于不同的详情页实例对应的是同一 Class，即 `runtimeType` 相同。
如果不添加 tag 参数，在某个页面调用 `Get.find` 会获取到其它页面已经存储过的对象。
同时 Get 中一定要注意考虑到对象的回收，不然很有可能引起内存泄漏。
要么手动在页面 `dispose` 的时候做 `delete` 操作，
要么完全使用 Get 中提供的组件，例如 `GetBuilder`，
它会在 `dispose` 中释放。

![](https://files.flutter-io.cn/posts/community/tutorial/images/2022-05-03-getx-runtimetype.jpg)

`GetBuilder` 中在 `dispose` 阶段进行回收:

```dart
@override
void dispose() {
  super.dispose();
  widget.dispose?.call(this);
  if (_isCreator! || widget.assignId) {
    if (widget.autoRemove && GetInstance().isRegistered<T>(tag: widget.tag)) {
      GetInstance().delete<T>(tag: widget.tag);
    }
  }

  _remove?.call();

  controller = null;
  _isCreator = null;
  _remove = null;
  _filter = null;
}

```

## Get 与 Provider 优缺点总结

通过本文，我向大家介绍了状态管理的必要性、它解决了 Flutter 开发中的哪些问题以及是如何解决的，
与此同时，我也为大家总结了在实践中常见的问题等，看到这里你可能还会有些疑惑，到底是否需要使用状态管理？

在我看来，框架是为了解决问题而存在。所以这取决于你是否也在经历一开始提出的那些问题。
如果有，那么你可以尝试使用状态管理解决；如果没有，则没必要过度设计，为了使用而使用。

其次，如果使用状态管理，那么 Get 和 Provider 哪个更好？

这两个框架各有优缺点，我认为如果你或者你的团队刚接触 Flutter，
使用 Provider 能帮助你们更快理解 Flutter 的核心机制。
而如果已经对 Flutter 的原理有了解，Get 丰富的功能和简洁的 API，
则能帮助你很好地提高开发效率。
