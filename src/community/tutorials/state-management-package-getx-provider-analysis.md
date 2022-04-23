---
title: Flutter 状态管理框架 provider getx 分析
toc: true

---

文/ Nayuta

状态管理一直是 flutter 开发中一个火热的话题。谈到状态管理框架，社区也有诸如有以 getx，provider 为代表的多种方案，它们有各自的优缺点。 面对这么多的选择，你可能会想。“我需要使用状态管理么？哪种框架更适合我？“  本文从作者的实际开发经验出发，分析状态管理解决的问题以及思路，希望能帮助你做出选择。

## 一、为什么需要状态管理：解决声明式开发带来的问题

首先，为什么 flutter 开发中需要状态管理？在我看来，是因为 flutter 采用 [**声明式** ](https://flutter.cn/docs/resources/architectural-overview#reactive-user-interfaces)构建带来的一系列问题。这是一种区别于传原生的方式，所以我们没有在原生开发中听到过状态管理。

### 1.「声明式」 VS 「命令式」分析

那么怎么理解「声明式」和「命令式」？ 以最经典的的计数器例子分析：

<img src="https://files.flutter-io.cn/posts/community/tutorial/images/image-20220417103627166.png" alt="image-20220417103627166" style="zoom:30%;" />

如图，点击右下角按钮，显示的文本数字加一。
Android 中可以这么实现：当右下角按钮点中时，拿到 TextView 的对象，手动设置其展示的文本。

实现代码如下：

<img src="https://files.flutter-io.cn/posts/community/tutorial/images/image-20220406184550463.png" alt="image-20220406184550463" style="zoom:50%;" />

而在 flutter 中，我们只需要使变量增加之后调用 `setState((){})`即可。`setState` 会刷新整个页面，使的中间展示的值进行变更。

<img src="https://files.flutter-io.cn/posts/community/tutorial/images/image-20220406185003242.png" alt="image-20220406185003242" style="zoom:50%;" />

可以发现，flutter 中只对 `_counter` 属性进行了修改，并没有对 Text 组件进行任何的操作，整个界面随着状态的改变而改变。

所以在 flutter 中有这么一种说法，**UI = F ( State )** 。

上面的例子中，state 就是 ``_counter`` 的值，调用 setState 驱动  `F (build 方法)` 生成新的 UI。

那么声明式有哪些优点和不足呢？

### 2. 声明式开发的优点：让开发者摆脱组件的繁琐控制，聚焦于状态处理

声明式开发最大的优点在我看来是：**让开发者摆脱组件的繁琐控制，聚焦于状态处理**。

习惯 flutter 开发之后，回到原生平台开发，你会发现对于 View 的控制非常麻烦，尤其是多个组件之间相互关联时。

而在 flutter 中我们只需要处理好状态即可（复杂度转移到了状态 -> UI 的映射，也就是 Widget 的构建）。
jetpack compose，swift 等技术的最新发展，也是在朝着「声明式」的方向前进。

### 3.  声明式开发带来的问题：状态管理解决的目标

没有使用状态管理，直接「声明式」开发的时候，遇到的问题总结有三个：

> **逻辑和页面 UI 耦合，导致无法复用/单元测试，修改混乱等**

![image-20220416153119414](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416153119414.png)

一开始业务不复杂的时候，所有的代码都直接写到 widget 中，随着业务迭代，文件越来越大，其他开发者很难直观的明白里面的业务逻辑。并且一些通用逻辑，例如网络请求状态的处理、分页等，在不同的页面来回粘贴。

这个问题在原生上同样存在，后面也衍生了诸如 MVP 设计模式的思路去解决。

> **难以跨组件（跨页面）访问数据**

![image-20220416152601484](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416152601484.png)

第二点在于跨组件交互，比如在 Widget 结构中，一个子组件想要展示父组件中的 name 字段，可能需要层层进行传递。

或者要在两个页面之间共享筛选数据，并没有一个很优雅的机制去解决这种跨页面的数据访问。

> **无法轻松的控制刷新范围（页面 setState 的变化会导致全局页面的变化）**

最后一个问题也是上面提到的优点，很多场景我们只是部分状态的修改，例如按钮的颜色。但是整个页面的 setState 会使的其他不需要变化的地方也进行重建，带来不必要的开销。

在我看来，Flutter 中状态管理框架的核心在于这三个问题的解决思路，下面一起看看 provider、get 是如何解决？

****

## 二、provider、get 状态管理框架设计分析

### 1. 解决逻辑和页面 UI 耦合

传统的原生开发同样存在这个问题，Activity 文件也可能随着迭代变得难以维护，这个问题可以通过 MVP 模式进行解耦。

简单来说就是将 View 中的逻辑代码抽离到 Presenter 层，View 只负责视图的构建。

![image-20220416152955696](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416152955696.png)

这也是 flutter 中几乎所有状态管理框架的解决思路，上面的 Presenter 你可以认为是 get 中的 `GetxController`、provider 中的 `ChangeNotifier`，bloc 中的 `Bloc`。值得一提的是，具体做法上 flutter 和原生 MVP 框架有所不同。

我们知道在经典 MVP 模式中，一般 View 和 Presenter 以接口定义自身行为（action），**相互持有接口进行调用** 。

![image-20220416153312721](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416153312721.png)

但 Flutter 中不太适合这么做，从 Presenter → View 关系上 View 在 Flutter 中对应 Widget，但在 Flutter 中 Widget 只是用户声明 UI 的配置，直接控制 Widget 实例并不是好的做法。

而在从 View → Presenter 的关系上，Widget 可以确实可以直接持有 Presenter，但是这样又会带来难以数据通信的问题。

这一点不同状态管理框架的解决思路不一样，从实现上他们可以分为两大类：

一类通过 **Flutter 树机制** 解决，例如 provider，另一类是 get 这种通过 **依赖注入** ，例如 getx。

#### 树机制处理 V -> P 的获取

![image-20220416154157466](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416154157466.png)

我们知道 Flutter 中存在三棵树，Widget，Element，RenderObject 。所谓的 **Widget 树其实只是我们描述组件嵌套关系的一种说法，是一种虚拟的结构**。但 Element 和 RenderObject 在运行时实际存在，可以看到 Element 组件中包含了 _parent 属性，存放其父节点。而它实现了 BuildContext 接口，包含了诸多对于树结构操作的方法，例如 `findAncestorStateOfType`，向上查找父节点；`visitChildElements`  遍历子节点。

在一开始的例子中，我们可以通过 `context.findAncestorStateOfType` 一层一层的向上查找到需要的 Element 对象，获取 Widget 或者 State 后即可取出需要的变量。

![image-20220416154300160](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416154300160.png)

provider 也是借助了这样的机制，完成了 View -> Presenter 的获取。通过 `Provider.of` 获取顶层 Provider 组件中的 Present 对象。显然，所有 Provider 以下的 Widget 节点，都可以通过自身的 context 访问到 Provider 中的 Presenter，很好的解决了跨组件的通信问题。

#### 通过依赖注入的方式解决 V -> P

树机制很不错，但依赖于 context，这一点有时很让人抓狂。我们知道 Dart 是一种单线程的模型，所以不存在多线程下对于对象访问的竞争问题。基于此 getx 借助了一个全局单例的 Map 存储对象。通过依赖注入的方式，实现了对 Presenter 层的获取。这样在任意的类中都可以获取到 Presenter。

![image-20220416154732460](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416154732460.png)

这个 Map 对应的 Key 是 `runtimeType + tag`，其中 tag 是一个可选参数，而 Value 对应 Object，也就是说我们可以存入任何类型的对象，并且在任意位置获取。

### 2. 难以跨组件（跨页面）访问数据

这个问题其实和上一部分的思考基本类似，所以我们可以总结一下两种方案特点：

![image-20220416154955957](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416154955957.png)

provider：1、依赖树机制，必须基于 context  2、提供了子组件访问上层的能力

getx：1、全局单例，任意位置可以存取 2、存在类型重复，内存回收问题

### 3. 高层级 setState 引起不必要刷新的问题

最后就是我们提到的高层级 setState 引起不必要刷新的问题，flutter 通过采用观察者模式解决。

关键在于两步： 1、观察者去订阅被观察的对象；2、被观察的对象通知观察者。

系统也提供了 ValueNotifier 等组件实现：

![image-20220416231100104](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416231100104.png)

了解到最基础的观察者模式后，看看不同框架中提供的组件：

比如 Provider 中提供了 ChangeNotifierProvider：

<img src="https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416155654687.png" alt="image-20220416155654687" style="zoom:30%;" />

还是之前计数器的例子，这里 Counter 继承 了 ChangeNotifier 通过顶层的 Provider 进行存储。子节点通过 Consumer 即可获取实例，调用了 increment 方法之后，只有对应的 Text 组件进行变化。

同样的功能，在 getx 中，只需要提前调用 `Get.put` 方法存储 Counter 对象，为 GetBuilder 组件指定 Counter 作为泛型。因为 getx 基于单例，所以 GetBuilder 可以直接通过泛型获取到存入的对象，并在 builder 方法中暴露。这样 Counter 便与组件建立了监听关系，之后 Counter 的变动，只会驱动以它作为泛型的 GetBuilder 组件更新。

<img src="https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416225707295.png" alt="image-20220416225707295" style="zoom:50%;" />

***

## 三、实践中的常见问题

在使用这些框架过程中，可能会遇到以下的问题：

#### 1. provider 中 context 层级过高

![image-20220416230243094](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416230243094.png)

如图代码所示，当我们直接将 Provider 与组件嵌套于同一层级时，这时代码中的 `Provider.of(context)` 运行时抛出 **ProviderNotFoundException** 。因为此处我们使用的 context 是 MyApp，而他的 element 节点实际位于 MyApp 的下方，所以无法正确获取到 Provider 节点。这个问题可以有两种改法，如下方代码所示：

![image-20220416230755671](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416230755671.png)

#### 2. getx 由于全局单例带来的问题

getx 由于是全局单例存储，并且默认以 runtimeType 为 key，在一些场景比如商品详情页之间跳转。由于不同的页面实例对应的是同一 Class 即 runtimeType 相同 ，这时需要加添加 tag（例如商品 id）避免 getx 获取到其他页面的存储对象。同时注意全局单例存储一定要考虑到 Presenter 的回收，不然很有可能引起内存泄漏。使用 getx 要么手动在页面 `dispose` 的时候做 `delete` 操作，要么完全 getx 的系列组件，例如 `GetBuilder` ，它会在 dispose 去做释放。

![image-20220416234303617](https://files.flutter-io.cn/posts/community/tutorial/images/image-20220416234303617.png)

***

## 四、getx 与 provider 优缺点总结

以上便是对状态管理以及框架的分析，看到这里你可能还会有些疑惑，到底是否需要使用状态管理？

在我看来，框架是为了解决问题而存在。所以这取决于你是否也在经历一开始提出的那些问题。如果有，那么你可以尝试使用状态管理解决；如果没有，则没必要过度设计，为了使用而使用。

其次，如果使用状态管理，那么 getx 和 provider 哪个更好？

这两个框架各有优缺点，我认为如果你或者你的团队刚接触 flutter，使用 provider 能帮助你们更快理解 flutter 的核心机制。而如果已经对 flutter 的原理有了解，getx 丰富的功能，简洁的 API，则能帮助你很好的提高开发效率。