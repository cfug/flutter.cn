---
title: 深入理解 Function & Closure
toc: true
---

文/ 鑫磊，滴滴出行实习生

# 前言

在最初设计 Dart 的时候，参考了 `JavaScript` 许多特性。无论是在异步处理，还是在语法上，都能看到它的影子。熟悉 Dart 的同学应该明白，在 Dart 中一切皆为对象。不仅 `int`、`bool` 是通过 core library 提供的类创建出的对象，连函数也被看作是对象。（本文中可能会出现 **函数** / **方法** 二者仅叫法不同）而本文将带你深入理解 Dart 的函数 （Function）&闭包（Closure）以及它们的用法。

## 什么是 Closure（闭包）

如果你从未听说过闭包，没关系，本节将会从零开始引入闭包这个概念。在正式介绍闭包之前，我们需要先来了解一下 **Lexical scoping**。

### 詞法作用域 Lexical scoping

也许你对这个词很陌生，但是它却是最熟悉的陌生人。我们先来看下面一段代码。
``` dart
void main() {
  var a = 0;
  var a = 1; //  Error：The name 'a' is already defined
}
```
你肯定已经发现了，我们在该段代码中犯了一个明显的错误。那就是定义了两次变量 `a`，而编译器也会提示我们，a 这个变量名已经被定义了。

这是由于，我们的变量都有它的 **词法作用域** ，在同一个词法作用域中仅允许存在一个名称为 `a` 的变量，且在编译期就能够提示语法错误。

这很好理解，如果一个 **Lexical scoping** 中存在两个同名变量 `a`，那么我们访问的时候从语法上就无法区分到底你是想要访问哪一个 `a` 了。

 > 上述代码中，我们在 `main` 函数的词法作用域中定义了两次 a

仅需稍作修改
 ``` dart
 void main() {
  var a = 1; 
  print(a); // => 1
}

 var a = 0;
 ```
我们就能够正常打印出 `a` 的值为 1。
简单的解释，` var a = 0;` 是该 **dart 文件**的 **Lexical scoping** 中定义的变量，而 `var a = 1;` 是在 main 函数的 **Lexical scoping** 中定义的变量，二者不是一个空间，所以不会产生冲突。

### Function is Object

首先，要证明方法（函数）是一个对象这很简单。
``` dart
print( (){} is Object ); // true
```
`(){}` 为一个匿名函数，我们可以看到输出为 `true`。

知道了 Function is Object 还不够，我们应该如何看待它呢。
``` dart
void main() {
  var name = 'Vadaski';
  
  var printName = (){
    print(name);
  };
}
```
可以很清楚的看到，我们可以在 `main` 函数内定义了一个新的方法，而且还能够将这个方法赋值给一个变量 `printName`。

但是如果你运行这段代码，你将看不到任何输出，这是为什么呢。

实际上我们在这里定义了 `printName` 之后，并没有真正的去执行它。我们知道，要执行一个方法，需要使用 `XXX()` 才能真正执行。

``` dart
void main() {
  var name = 'Vadaski';
  
  var printName = (){
    print(name);
  };
  
  printName(); // Vadaski
}
```
上面这个例子非常常见，在 `printName` 内部访问到了外部定义的变量 `name`。也就是说，一个 Lexical scoping **内部** 是能够访问到 **外部** Lexical scoping 中定义的变量的。

### Function + Lexical scoping

**内部**访问**外部**定义的变量是 ok 的，很容易就能够想到，外部是否可以访问内部定义的变量呢。

如果是正常访问的话，就像下面这样。

``` dart
void main() {
  
  var printName = (){
    var name = 'Vadaski';
  };
  printName();
  
  print(name); // Error：Undefined name 'name'
}
```

这里出现了**未定义该变量**的错误警告，可以看出 `printName` 中定义的变量，对于 `main` 函数中的变量是不可见的。Dart 和 JavaScript 一样具有链式作用域，也就是说，**子作用域**可以访问**父（甚至是祖先）作用域**中的变量，而反过来不行。

#### 访问规则

从上面的例子我们可以看出，**Lexical scoping** 实际上是以链式存在的。一个 scope 中可以开一个新的 scope，而不同 scope 中是可以允许重名变量的。那么我们在某个 scope 中访问一个变量，究竟是基于什么规则来访问变量的呢。

``` dart
void main() {
  var a = 1;
  firstScope(){
    var a = 2;
    print('$a in firstScope'); //2 in firstScope
  }
  print('$a in mainScope'); //1 in mainScope
  firstScope();
}
```

在上面这个例子中我们可以看到，在 main 和 firstScope 中都定义了变量 a。我们在 `firstScope` 中 print，输出了 `2 in firstScope` 而在 main 中 print 则会输出 `1 in mainScope` 。

我们已经可以总结出规律了：**近者优先**。

如果你在某个 scope 中访问一个变量，它首先会看当前 scope 中是否已经定义该变量，如果已经定义，那么就使用该变量。如果当前 scope 没找到该变量，那么它就会在它的上一层 scope 中寻找，以此类推，直到最初的 scope。如果所有 scope 链上都不存在该变量，则会提示 `Error：Undefined name 'name'`。

> Tip: Dart scope 中的变量是静态确定的，如何理解呢？
>
> ``` dart
> void main() {
>   print(a); // Local variable 'a' can't be referenced before it is declared
>   var a;
> }
> var a = 0;
> ```
>
> 我们可以看到，虽然在 main 的父 scope 中存在变量 a，且已经赋值，但是我们在 main 的 scope 中也定义了变量 a。因为是静态确定的，所以在 print 的时候会优先使用当前 scope 中定义的 a，而这时候 a 的定义在 print 之后，同样也会导致编译器错误：Local variable 'a' can't be referenced before it is declared。

### Closure 的定义

有了上面这些知识，我们现在可以来看看 Closure 的定义了。
> A closure is a function object that has access to variables in its lexical scope, even when the function is used outside of its original scope.

> 闭包 即一个函数对象，即使函数对象的调用在它原始作用域之外，依然能够访问在它词法作用域内的变量。

你可能对这段话还是很难一下就理解到它到底在说什么。如果简要概括 Closure 的话，它实际上就是**有状态**的函数。

### 函数状态

#### 无状态函数
通常我们执行一个函数，它都是**无状态**的。你可能会产生疑问，啥？状态？？我们还是看一个例子。
``` dart
void main() {
  printNumber(); // 10
  printNumber(); // 10
}

void printNumber(){
  int num = 0;
  for(int i = 0; i < 10; i++){
    num++;
  }
  print(num);
}
```
上面的代码很好预测，它将会输出两次 10，我们多次调用一个函数的时候，它还是会得到一样的输出。

但是，当我们理解 Function is Object 之后，我们应该如何从 Object 的角度来看待函数的执行呢。

显然 `printNumber();` 创建了一个 Function 对象，但是我们没有将它赋值给任何变量，下次一个 `printNumber();` 实际上创建了一个新的 Function，两个对象都执行了一遍方法体，所以得到了相同的输出。

#### 有状态函数
无状态函数很好理解，我们现在可以来看看有状态的函数了。
``` dart
void main() {
  var numberPrinter = (){
    int num = 0;
    return (){
      for(int i = 0; i < 10; i++){
        num++;
      }
      print(num);
    };
  };
  
  var printNumber = numberPrinter();
  printNumber(); // 10
  printNumber(); // 20
}
```
上面这段代码同样执行了两次 `printNumber();`，然而我们却得到了不同的输出 10，20。好像有点 **状态** 的味道了呢。

但看上去似乎还是有些难以理解，让我们一层一层来看。

``` dart
var numberPrinter = (){
    int num = 0;
    /// execute function
  };
```
首先我们定义了一个 Function 对象，然后把交给 `numberPrinter` 管理。在创建出来的这个 Function 的 **Lexical scoping** 中定义了一个 num 变量，并赋值为 0。
> 注意：这时候该方法并不会立刻执行，而是等调用了 `numberPrinter()` 的时候才执行。所以这时候 num 是不存在的。

``` dart
return (){
    for(int i = 0; i < 10; i++){
        num++;
    }
    print(num);
};
```
然后返回了一个 Function。这个 Function 能够拿到其父级 scope 中的 num ，并让其增加 10，然后打印 `num` 的值。

``` dart
var printNumber = numberPrinter();
```
然后我们通过调用 numberPrinter()，创建了该 Function 对象，**这就是一个 Closure！** 这个对象**真正执行**我们刚才定义的 `numberPrinter`，并且在它的内部的 scope 中就定义了一个 int 类型的 `num`。然后返回了一个方法给 `printNumber`。

> 实际上返回的 匿名 Function 又是另一个闭包了。

然后我们执行第一次 `printNumber()`，这时候将会获得闭包储存的 num 变量，执行下面的内容。
``` dart
// num: 0
for(int i = 0; i < 10; i++){
    num++; 
}
print(num);
```
最开始 printNumber 的 scope 中储存的 num 为 0，所以经过 10 次自增，num 的值为 10，最后 `print` 打印了 10。

而第二次执行 `printNumber()` 我们使用的还是同一个 `numberPrinter` 对象，这个对象在第一次执行完毕后，其 num 已经为 10，所以第二次执行后，是从 10 开始自增，那么最后 `print` 的结果自然就是 20 了。

在整个调用过程中，printNumber 作为一个 closure，它保存了内部 num 的状态，只要 printNumber 不被回收，那么其内部的所有对象都不会被 GC 掉。

> 所以我们也需要注意到闭包可能会造成内存泄漏，或带来内存压力问题。

### 到底啥是闭包
再回过头来理解一下，我们对于闭包的定义就应该好理解了。

> 闭包 即一个函数对象，即使函数对象的调用在它原始作用域之外，依然能够访问在它词法作用域内的变量。

在刚才的例子中，我们的 num 是在 `numberPrinter` 内部定义的，可是我们可以通过返回的 Function 在外部访问到了这个变量。而我们的 `printNumber` 则一直保存了  `num`。

## 分阶段看闭包
在我们使用闭包的时候，我将它看为三个阶段。
### 定义阶段
这个阶段，我们定义了 Function 作为闭包，但是却没有真正执行它。
``` dart
void main() {
  var numberPrinter = (){
    int num = 0;
    return (){
      print(num);
    };
  };
```
这时候，由于我们只是定义了闭包，而没有执行，所以 num 对象是不存在的。

### 创建阶段
``` dart
var printNumber = numberPrinter();
```
这时候，我们真正执行了 nu mberPrinter 闭包的内容，并返回执行结果，num 被创建出来。这时候，只要 printNumber 不被 GC，那么 num 也会一直存在。

### 访问阶段
``` dart
printNumber(); 
printNumber();
```
然后我们可以通过某种方式访问 numberPrinter 闭包中的内容。(本例中间接访问了 num)

以上三个阶段仅方便理解，不是严谨描述。
## Closure 的应用
如果仅是理解概念，那么我们看了可能也就忘了。来点实在的，到底 Closure 可以怎么用？

### 在传递对象的位置执行方法
比如说我们有一个 Text Widget 的内容有些问题，直接给我们 show 了一个 Error Widget。这时候，我想打印一下这个内容看看到底发生了啥，你可以这样做。

``` dart
Text((){
    print(data);
    return data;
}())
```
是不是很神奇，竟然还有这种操作。
> Tip 立即执行闭包内容：我们这里通过闭包的语法 `(){}()` 立刻执行闭包的内容，并把我们的 data 返回。

虽然 Text 这里仅允许我们传一个 String，但是我依然可以执行 `print` 方法。

另一个 case 是，如果我们想要仅在 debug 模式下执行某些语句，也可以通过 closure  配合断言来实现。

``` dart
assert(() {
   child.owner._debugElementWasRebuilt(child);// execute some code
   return true;
}());
```

解释一下，首先 assert 断言仅在 debug 模式下才会开启，所以断言内的内容可以仅在 debug 模式才得以执行。

然后我们知道，Function( ) 调用就会执行，所以这里我们通过匿名闭包 `(){}()` 立刻执行了闭包中的内容，并返回 true 给断言，让它不会挂掉。从而达到了仅在 debug 模式下执行该闭包内的语句。

### 实现策略模式
通过 closure 我们可以很方便实现策略模式。
``` dart
void main(){
  var res = exec(select('sum'),1 ,2);
  print(res);
}

Function select(String opType){
  if(opType == 'sum') return sum;
  if(opType == 'sub') return sub;
  return (a, b) => 0;
}

int exec(NumberOp op, int a, int b){
  return op(a,b);
}

int sum(int a, int b) => a + b;
int sub(int a, int b) => a - b;

typedef NumberOp = Function (int a, int b);
```
通过 select 方法，可以动态选择我们要执行的具体方法。你可以在 https://dartpad.cn/143c33897a0eac7e2d627b01983b7307 运行这段代码。

### 实现 Builder 模式 / 懒加载
如果你有 Flutter 经验，那么你应该使用过 `ListView.builder`，它很好用对不对。我们只向 builder 属性传一个方法，`ListView` 就可以根据这个 `builder` 来构建它的每一个 item。实际上，这也是 closure 的一种体现。

``` dart
ListView.builder({
//...
    @required IndexedWidgetBuilder itemBuilder,
//...
  })
  
typedef IndexedWidgetBuilder = Widget Function(BuildContext context, int index);
```
Flutter 通过 typedef 定义了一种 Function，它接收 `BuildContext` 和 `int` 作为参数，然后会返回一个 Widget。对这样的 Function 我们将它定义为 `IndexedWidgetBuilder` 然后将它内部的 Widget 返回出来。这样外部的 scope 也能够访问 `IndexedWidgetBuilder` 的 scope 内部定义的 Widget，从而实现了 builder 模式。

> 同样，ListView 的懒加载（延迟执行）也是闭包很重要的一个特性哦～

## 牛刀小试
在学习了 closure 以后，我们来道题检验一下你是否真正理解了吧～
``` dart
main(){
  var counter = Counter(0);
  fun1(){
    var innerCounter = counter;
    Counter incrementCounter(){
      print(innerCounter.value);
      innerCounter.increment();
      return innerCounter;
    }
    return incrementCounter;
  }

  var myFun = fun1();
  print(myFun() == counter);
  print(myFun() == counter);
}

class Counter{
  int value;
  Counter(int value) 
  : this.value = value;

  increment(){
    value++;
  }
}
```

上面这段代码会输出什么呢？

如果你已经想好了答案，就来 <a href="https://dartpad.cn/75e338c727ae608cd31d389f7557a0f1">DartPad 线上运行</a> 看看是否正确吧！

## 写在最后

本文非常感谢 [@Realank Liu](https://juejin.im/user/5b5ae02df265da0f9e58a9a7) 的 Review 以及宝贵的建议～

时隔半年来迟迟的更新，不知道是否对大家有点帮助呢～ Closure 在实现 Flutter 的诸多功能上都发挥着重要的作用，可以说它已经深入你编程的日常，默默帮助我们更好地编写 Dart 代码，作为一名不断精进的 Dart 开发者，是时候用起来啦～之后的文章中，我会逐渐转向 Dart，给大家带来更深入的内容，敬请期待！

如果您对本文还有任何疑问或者文章的建议，欢迎通过我的邮箱 xinlei966@gmail.com 与我联系，我会及时回复！

