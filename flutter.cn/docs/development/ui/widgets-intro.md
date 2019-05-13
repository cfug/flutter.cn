
#Widgets 介绍
Flutter组件是由一个新兴框架构建的，它的灵感来源于[React](https://flutter.cn/docs/development/ui/widgets-intro)。它的核心思想是用组件
来构建你的UI界面。组件描述了在当前的配置和状态下，视图所应该呈现的样子。当组件的状
态改变，框架会通过比较渲染的树结构，来获得最小的改变，并更新状态。


 注意：如果你想熟练掌握Flutter，请查阅[在Flutter中构建布局](https://debug.flutter.cn/docs/development/ui/layout/)和[如何在Flutter工程中进行
 交互](https://debug.flutter.cn/docs/development/ui/interactive)这两篇文章。


##Hello World
一个最基小的Flutter工程只需要在组件中调用[runApp()](https://api.flutter.dev/flutter/widgets/runApp.html)方法。
```
import 'package:flutter/material.dart';

void main() {
  runApp(
    Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}

```
[runApp()](https://api.flutter.dev/flutter/widgets/runApp.html)会持有组件，并且使该组件成为组件树结构中的根节点。在这个实例中：一棵组件树有两个组件，
[中心组件](https://api.flutter.dev/flutter/widgets/Center-class.html)及其子组件，文本组件。框架在布局时，根组件会铺满整个屏幕，也就是说”Hello World”
会在屏幕中居中显示。在该例中我们需要指定文本的位置，如果使用MaterialApp组件时，你需要
考虑这一点，之后我们会进一步的描述。

在写APP的过程中，你可能会创建一个新的组件继承无状态组件或有状态组件，这取决于该组件是否
有管理组件的状态。
组件的主要工作是是实现[构建](https://api.flutter.dev/flutter/widgets/StatelessWidget/build.html)方法。
该方法描述了其他更低层级的组件。框架会逐一构建这些组件直到最底层的计算和描述组件的[渲染对象](https://api.flutter.dev/flutter/rendering/RenderObject-class.html)组件构建完成。


##基本组件
Flutter有很多基础组件，下面列出的组件是一些常用组件：
> * [Text](https://debug.flutter.cn/docs/development/ui/widgets-intro):
[Text](https://debug.flutter.cn/docs/development/ui/widgets-intro)组件是用来在APP内创建带样式的文本。
> * Row，column:这些布局组件，可以在[水平](https://api.flutter.dev/flutter/widgets/Row-class.html)
和[垂直](https://api.flutter.dev/flutter/widgets/Column-class.html)方向灵活布局，它们是基于Web的盒式布局模型而设计的。
> * [Stack](https://api.flutter.dev/flutter/widgets/Stack-class.html):和以线性(水平或垂直)布局为主的组件不一样，
[栈](https://api.flutter.dev/flutter/widgets/Stack-class.html)组件可以让组件居于绘制顺序的顶部。
你可以让[指定位置](https://api.flutter.dev/flutter/widgets/Positioned-class.html)组件成为
[栈](https://api.flutter.dev/flutter/widgets/Stack-class.html)的子组件，居于栈的上，右，下，左的位置。
栈是基于Web中的绝对位置布局模型设计的。
> * [Container](https://api.flutter.dev/flutter/widgets/Container-class.html):[容器]
(https://api.flutter.dev/flutter/widgets/Container-class.html)组件可以用来创建一个可见的矩形元素。
容器可以使用[盒式装饰](https://api.flutter.dev/flutter/painting/BoxDecoration-class.html)
来进行装饰，如背景，边框，或阴影等。[容器](https://api.flutter.dev/flutter/widgets/Container-class.html)
还可以设置外边缘，内边缘尺寸的约束条件。此外容器可以使用矩阵在三维空间进行转换。

下面是使用上面提到的这些组件以及其他的一些组件写的一个示例程序：
```
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  MyAppBar({this.title});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56.0, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        // <Widget> is the type of items in the list.
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child to fill the available space.
          Expanded(
            child: title,
          ),
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Material is a conceptual piece of paper on which the UI appears.
    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: <Widget>[
          MyAppBar(
            title: Text(
              'Example title',
              style: Theme.of(context).primaryTextTheme.title,
            ),
          ),
          Expanded(
            child: Center(
              child: Text('Hello, world!'),
            ),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'My app', // used by the OS task switcher
    home: MyScaffold(),
  ));
}

```

一定要将属性uses-material-design: true 放在pubspec.yaml文件入口的flutter部分，
这样就可以预定义一些[资源图标](https://design.google.com/icons/)。

```
name: my_app
flutter:
  uses-material-design: true

```

为了继承主题，很多组件需要在[MaterialAPP](https://api.flutter.dev/flutter/material/MaterialApp-class.html)
中合理展现，因此可以以[MaterialAPP](https://api.flutter.dev/flutter/material/MaterialApp-class.html)的方式运行应用程序。

上例中的MyAppBar组件创建了一个高为56像素的[容器](https://api.flutter.dev/flutter/widgets/Container-class.html)，
左右内边缘为8像素。在容器里面，MyAppBar以[水平](https://api.flutter.dev/flutter/widgets/Row-class.html)
布局来布局子元素。中间子元素也就是标题组件，设为[扩展](https://api.flutter.dev/flutter/widgets/Expanded-class.html)
填充，也就是它要填充剩余空间。你可以定义多个[扩展](https://api.flutter.dev/flutter/widgets/Expanded-class.html)
子元素，然后用[flex](https://api.flutter.dev/flutter/widgets/Expanded-class.html)属性设置每个子元素所占的比进行[扩展](https://api.flutter.dev/flutter/widgets/Expanded-class.html)。

MyScaffold以垂直方式来进行布局。在顶部放了一个MyAppBar组件实例，并把[Text](https://api.flutter.dev/flutter/widgets/Text-class.html)
组件传给它来作为APP的标题。把组件作为参数传递给其他的组价是一个很强大的技术，它可以让你以各种方式创建一些
可重用的通用组件。最后，MyScaffold使用可[扩展](https://api.flutter.dev/flutter/widgets/Expanded-class.html)
的主体部分填充剩余的空间，主体部分分包含了一些重要的信息。
<br> 更多详细信息可以参考：[Layouts](https://debug.flutter.cn/docs/development/ui/widgets/layout)布局。

##Using Material Components

Flutter提供了很多组件来构建一个APP，这些组件都遵守Material Design原则。一个 Material 应用使用 [MaterialApp](https://api.flutter.dev/flutter/material/MaterialApp-class.html)组件，
它可以在APP的根组件上创建很多有用的组件。包括[导航栏](https://api.flutter.dev/flutter/material/MaterialApp-class.html)，
它管理一系列标为字符串的组件，也就是路由。[导航栏](https://api.flutter.dev/flutter/material/MaterialApp-class.html)
可以在APP页面中平滑的切换。使用[MaterialApp](https://api.flutter.dev/flutter/material/MaterialApp-class.html)是可选的但是是一个很好的实践。
```
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Flutter Tutorial',
    home: TutorialHome(),
  ));
}

class TutorialHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Scaffold is a layout for the major Material Components.
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: Text('Example title'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
      // body is the majority of the screen.
      body: Center(
        child: Text('Hello, world!'),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        child: Icon(Icons.add),
        onPressed: null,
      ),
    );
  }
}

```


既然我们已经从myAppBar和MyScaffold说到material.dart中的[AppBar](https://api.flutter.dev/flutter/material/AppBar-class.html)
和[Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html)组件，我们可以看下应用程序更多属性。
例如，应用的标题栏有阴影，并且标题组件自动继承正确的样式。
我们也加了一个悬浮按钮看起来更美观。
<br>注意到我们又把组件作为参数传给别的组件。
[Scoffold](https://api.flutter.dev/flutter/material/Scaffold-class.html)用一系列的组件作为参数，
每个组件都布局在Scofford的合适位置。同样的, [AppBar](https://api.flutter.dev/flutter/material/AppBar-class.html)
组件也允许我们传递组件给[标题](https://api.flutter.dev/flutter/material/AppBar-class.html#title)
34444组件作为组件的展示[样式](https://api.flutter.dev/flutter/material/AppBar-class.html#leading)和
[行为](https://api.flutter.dev/flutter/material/AppBar-class.html#actions)。这种方式是在这个框架中出现的，也是我们在设计自定义组件时所需要考虑的一点。

更多信息可以参考：[Material  components](https://debug.flutter.cn/docs/development/ui/widgets/material)


注意：Material是Flutter中两个自带的设计之一，如果想参考以iOS为主的设计，可以参考[Cupertino component](https://flutter.cn/docs/development/ui/widgets/cupertino)，
它包含[CupertinoApp](https://api.flutter.dev/flutter/cupertino/CupertinoApp-class.htmlhttps://api.flutter.dev/flutter/cupertino/CupertinoApp-class.html),
[CupertinoNavigationBar](https://api.flutter.dev/flutter/cupertino/CupertinoNavigationBar-class.html) 等。

##处理手势
大多数应用程序都需要和系统进行用户交互。创建可交互的应用程序的第一步就是检测输入的手势。我们通过下面的一个简单的按钮实例来看看它的工作机制。

```
class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 36.0,
        padding: const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          color: Colors.lightGreen[500],
        ),
        child: Center(
          child: Text('Engage'),
        ),
      ),
    );
  }
}

```

[手势检测](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html)组件在界面上是看不到的，但是它能识别用户的手势。
当用户触碰[容器](https://api.flutter.dev/flutter/widgets/Container-class.html)，[手势检测](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html)
会调用[onTap](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html#onTap)回调，此时会在控制台上输出一行信息。
你可以使用[手势检测](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html)组件检测各种输入手势，包括点击，拖拽，缩放。

很多组件使用[手势检测组件](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html)来为其他组提供可选的回调，例如
[图标按钮](https://api.flutter.dev/flutter/material/IconButton-class.html)，当用户点击组件时，[凸起按钮](https://api.flutter.dev/flutter/material/RaisedButton-class.html)，
[悬浮按钮](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html)等都有[onPressed](https://api.flutter.dev/flutter/material/RaisedButton-class.html#onPressed)
回调。

更多信息请参考：[Flutter中的手势识别](https://debug.flutter.cn/docs/development/ui/advanced/gestures)

##根据用户输入改变组件

到目前为止，我们只使用了无状态组件。无状态组件接收的参数来自于它的父组件，并将参数存为[final](https://www.dartlang.org/guides/language/language-tour#final-and-const)
成员变量。当需要[创建](https://api.flutter.dev/flutter/widgets/StatelessWidget/build.html)组件时，就是用这些存储的变量为创建的组件生成新的参数。


为了创建更复杂的经验，比如对用户的输入有更复杂的交互，应用通常会维护一些状态。Flutter使用有状态组件来实现这一想法。有状态组件会产生一些状态对象来持有这些状态。
参考使用上文提到过的[按钮](https://api.flutter.dev/flutter/material/RaisedButton-class.html)来实现的一个简单示例：

```
class Counter extends StatefulWidget {
  // This class is the configuration for the state. It holds the
  // values (in this case nothing) provided by the parent and used by the build
  // method of the State. Fields in a Widget subclass are always marked "final".

  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      // This call to setState tells the Flutter framework that
      // something has changed in this State, which causes it to rerun
      // the build method below so that the display can reflect the
      // updated values. If we changed _counter without calling
      // setState(), then the build method would not be called again,
      // and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance
    // as done by the _increment method above.
    // The Flutter framework has been optimized to make rerunning
    // build methods fast, so that you can just rebuild anything that
    // needs updating rather than having to individually change
    // instances of widgets.
    return Row(
      children: <Widget>[
        RaisedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
        Text('Count: $_counter'),
      ],
    );
  }
}

```
你可能奇怪为什么有状态组件和状态是独立的对象。在 Flutter 框架中，这两种类型的对象的生命周期是不一样的，
组件是临时对象，用于展现当前状态下应用的展现。另一方面，状态对象在调用和[创建](https://api.flutter.dev/flutter/widgets/State/build.html)
之间是持久的，以此来存储信息。

上文的示例接收用户的输入，在创建函数里面直接使用结果。在更复杂的应用中，组件的不同部分响应用户的不同行为；
比如，一个组件展现一个复杂的用户接口来收集一特定信息，比如日期，位置等，而另一个组件就用这些信息来改变整体的布局显示。

在Flutter中，当当前状态传给展现的无状态组件时，通过组件的回调来改变组件结构，而携带的就是状态。下面的复杂小示例展示了在实践中它的工作机制：

```
class CounterDisplay extends StatelessWidget {
  CounterDisplay({this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  CounterIncrementor({this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: onPressed,
      child: Text('Increment'),
    );
  }
}

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(children: <Widget>[
      CounterIncrementor(onPressed: _increment),
      CounterDisplay(count: _counter),
    ]);
  }
}

```


注意到我们是如何创建两个无状态组件，分别用来显示数量和改变数量。尽管最后的结果和之前的例子是一样的，
这种分别处理可以保证父组件简单，同时带个组件也可以封装更复杂的功能。

更多信息可参考:
[有状态组件](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html)
[状态设置](https://api.flutter.dev/flutter/widgets/State/setState.html)

##整合一下

下面是一个完整的示例，将上面所提到一些概念结合起来。一个购物应用提供了各种商品来售卖，还需要购物车
放一些想购买的物品，首先定义一个展现类，<font color=#0099ff>ShoppingListItem</font>:
```
class Product {
  const Product({this.name});
  final String name;
}

typedef void CartChangedCallback(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({Product product, this.inCart, this.onCartChanged})
      : product = product,
        super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different parts of the tree
    // can have different themes.  The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart ? Colors.black54 : Theme.of(context).primaryColor;
  }

  TextStyle _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onCartChanged(product, !inCart);
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(product.name[0]),
      ),
      title: Text(product.name, style: _getTextStyle(context)),
    );
  }
}

```
<font color=#0099ff>ShoppingList</font>类继承自无状态组件,它接收并存储构造函数的 [final](https://www.dartlang.org/guides/language/language-tour#final-and-const)
成员变量，这些值在[构建](https://api.flutter.dev/flutter/widgets/StatelessWidget/build.html)
函数的时候会使用到。例如，<font color=#0099ff>inCart</font>有两种样式，一个是使用当前主题的样式，一个是使用灰色。

当用户点击列表中的一项，组件不会直接改变<font color=#0099ff>inCart</font>
的值，而是通过父组件调用<font color=#0099ff>onCartChanged</font>函数。这种方式可以在组件的生命周期中存储状态更长久，从而使状态持久化。理想情况下，组件的传给
[runApp](https://api.flutter.dev/flutter/widgets/runApp.html)的状态可以持久到整个应用的生命周期。

当父组件收到了<font color=#0099ff>onCartChanged</font>回调，父组件开始更新内部状态，这会触发父组件重新创建<font color=#0099ff>ShoppingListItem</font> 实例，
<font color=#0099ff>inCart</font>的值也是新的。尽管父组件在重建时会创建子组件的实例，但是这种代价是很小的，
因为重新[渲染对象](https://api.flutter.dev/flutter/rendering/RenderObject-class.html)
时，框架会比较新组件和原始组件的差异，并且之渲染那些有差异的部分。

这里有一个示例展示父组件是如何存储变化的状态：
```
class ShoppingList extends StatefulWidget {
  ShoppingList({Key key, this.products}) : super(key: key);

  final List<Product> products;

  // The framework calls createState the first time a widget appears at a given
  // location in the tree. If the parent rebuilds and uses the same type of
  // widget (with the same key), the framework re-uses the State object
  // instead of creating a new State object.

  @override
  _ShoppingListState createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
  Set<Product> _shoppingCart = Set<Product>();

  void _handleCartChanged(Product product, bool inCart) {
    setState(() {
      // When a user changes what's in the cart, we need to change _shoppingCart
      // inside a setState call to trigger a rebuild. The framework then calls
      // build, below, which updates the visual appearance of the app.

      if (inCart)
        _shoppingCart.add(product);
      else
        _shoppingCart.remove(product);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Shopping List'),
      ),
      body: ListView(
        padding: EdgeInsets.symmetric(vertical: 8.0),
        children: widget.products.map((Product product) {
          return ShoppingListItem(
            product: product,
            inCart: _shoppingCart.contains(product),
            onCartChanged: _handleCartChanged,
          );
        }).toList(),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'Shopping App',
    home: ShoppingList(
      products: <Product>[
        Product(name: 'Eggs'),
        Product(name: 'Flour'),
        Product(name: 'Chocolate chips'),
      ],
    ),
  ));
}

```

示例中 <font color=#0099ff>ShoppingList</font> 继承自[有状态组件](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html)
，就是说这个组件会存储状态的变化，当<font color=#0099ff>ShoppingList</font>首次插入到渲染树结构中，框架会调用
 [createState](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html#createState) 方法创建一个
书中对应位置的<font color=#0099ff>_ShoppingListState</font>实例(注意到[State](https://api.flutter.dev/flutter/widgets/State-class.html)
的子类通常以下划线开头来命名，表示它们的实现细节是私有的)。当该组件的父组件重新创建时，
父组件首先创建一个ShoppingList的实例，但是框架会复用之前创建的 ShoppingListState，而不会重新调用
 [createState](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html#createState) 。

为了访问当前<font color=#0099ff>ShoppingList</font>的属性，<font color=#0099ff>_ShoppingListState</font>可以使用它的
[组件](https://api.flutter.dev/flutter/widgets/State-class.html#widget)属性，当父组件重新创建一个新的<font color=#0099ff>ShoppingList</font>，
<font color=#0099ff>_ShoppingListState</font>会使用属性值来创建。如果你想在
[组件](https://api.flutter.dev/flutter/widgets/State-class.html#widget)属性变化时接收到通知，你可以继承
[didUpdateWidget](https://api.flutter.dev/flutter/widgets/State-class.html#didUpdateWidget)方法，
该方法会传递给老的组件，这样你就可以比较<font color=#0099ff>老组件</font>和新[组件](https://api.flutter.dev/flutter/widgets/State-class.html#widget)。

当处理<font color=#0099ff>onCartChanged</font>回调时，<font color=#0099ff>_ShoppingListState</font>通过增加或删除<font color=#0099ff>购物车</font>购物车中的产品来计算最终的状态。
在调用[setState](https://api.flutter.dev/flutter/widgets/State-class.html#setState)时，会通知框架改变最终的状态。调用
[setState](https://api.flutter.dev/flutter/widgets/State-class.html#setState)标志着这个组件时脏的，
在屏幕下次更新时，组件也需要重新创建。当你改变了组件的最终状态而忘了调用 [setState](https://api.flutter.dev/flutter/widgets/State-class.html#setState)，
框架不知道组件是脏组件，也就不会新 [创建](https://api.flutter.dev/flutter/widgets/StatelessWidget/build.html)
组件，用户接口就不会对状态的改变做更新。

通过这种方式管理状态，你不需要单独写代码来创建更新子组件，你只需要实现build方法，它会处理这两种情形。

##响应组件的生命周期事件
在有状态组件调用 [createState](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html#createState)
后，框架插入一个新的状态对象到树中，然后在状态对象中调用
 [initState](https://api.flutter.dev/flutter/widgets/State-class.html#initState)。
 [State](https://api.flutter.dev/flutter/widgets/State-class.html) 的子类可以实现
 [initState](https://api.flutter.dev/flutter/widgets/State-class.html#initState) 做一些只会发生一次的初始化工作。
例如配置动画或订阅平台服务。实现[initState](https://api.flutter.dev/flutter/widgets/State-class.html#initState)
需要调用父类的 [initState](https://api.flutter.dev/flutter/widgets/State-class.html#initState) 方法。
 [super.initState](https://api.flutter.dev/flutter/widgets/State-class.html#initState)

当不在需要状态对象，框架会对该对象调用[dispose](https://api.flutter.dev/flutter/widgets/State-class.html#dispose)
方法。你可以继承来清理状态。例如，你可以实现[dispose](https://api.flutter.dev/flutter/widgets/State-class.html#dispose)
来取消计时器或者取消订阅平台服务。实现[dispose](https://api.flutter.dev/flutter/widgets/State-class.html#dispose)
也需要调用父类的[super.dispose](https://api.flutter.dev/flutter/widgets/State-class.html#dispose) 方法。

更多信息请参考:[State](https://api.flutter.dev/flutter/widgets/State-class.html)

##关键点
你可以使用 Keys 来控制框架对应哪些组件当组件重新创建时。默认情况下，框架会根据以前构建组件首次出现时的
[运行时类型](https://api.flutter.dev/flutter/widgets/Widget-class.html#runtimeType)来匹配当前的组件。
使用[Keys](https://api.flutter.dev/flutter/widgets/Widget-class.html#runtimeType)时，
框架要求组件在的类型保持和[运行时类型](https://api.flutter.dev/flutter/widgets/Widget-class.html#runtimeType)一致。

当同一组件需要构建多个实例时，Keys 就很有用。例如，<font color=#0099ff>ShoppingList</font> 组件，就需要构建多个
<font color=#0099ff>ShoppingListItem</font> 实例来填充可见区域。

没有keys，首次构建的入口总是跟之前构建的入口同步。
尽管列表已经滑出列表在屏幕的可见区域。

通过在列表的入口指定 semantic 值，有限长度的列表会更高效，因为框架通过匹配 semantic 值来来同步入口，视觉上也更好。
此外在语义上同步入口意味着在有状态子组件持有的状态附加到相同的 semantic 条目，而不是视图中相同数字位置的条目。


更多信息参考：[Key API](https://api.flutter.dev/flutter/foundation/Key-class.html)

##全局Keys
你可以使用全局键来唯一标识子组件。 全局键在整个组件结构中必须是全局唯一的，而不像本地键只需要兄弟姐妹节点中是唯一的。
由于它们是全局唯一的，因此可以使用全局键来检索子组件的状态。

更多信息参考：[GlobalKey API](https://api.flutter.dev/flutter/foundation/Key-class.html)


