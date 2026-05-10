---
title: Flutter 状态管理：使用 MobX
description: Flutter 状态管理：使用 MobX
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2021/04/2fbde82783576.jpg)

_文 / Paul Halliday, developer.school 创始人_

众所周知，状态管理是每个软件项目都需要持续迭代更新的方向。它并不是一个「一次性」的工作，
而需要不断确保你遵循的最佳实践能够让你的工程保持良好的可维护性。

<iframe {{site.bili.std-size}} src="{{site.bili.embed}}?aid=62886932&bvid=BV1Gt411K7JD&cid=327927635&page=1&autoplay=false" {{site.bili.set-short}}> </iframe>

要在 Flutter 中高效地使用 MobX ，需要遵循以下原则：

1. 我们能访问任意状态中的可观察对象（即在我们应用运行过程中发生变化的变量）。
1. 我们可以在 View 中展示这些状态，并响应 Action 意图。
1. 我们可以修改状态，从而更新可观察对象以及相应的 View。

那么它的优势在哪呢？答案是，通过 MobX 完成这一切将会变得超级简单！codegen 工具可以帮我们完成绝大部分模版化的工作。

## 初始化项目

让我们从创建一个全新的 Flutter 工程开始吧：

<!--skip-->
```shell
# New Flutter project
$ flutter create f_mobx && cd f_mobx
 
# Open in VS Code
$ code .
```

下一步，我们得在 `pubspec.yaml` 中拉取一些依赖 (`dependencies` 与 `dev_dependencies`):

<!--skip-->
```yaml
dependencies: 
 flutter:
    sdk: flutter
 
  mobx:
  flutter_mobx:
 
dev_dependencies:
  flutter_test:
    sdk: flutter
 
  build_runner: ^1.3.1
  mobx_codegen:
```

之后我们可以在 `main.dart` 中创建一个全新的 `MaterialApp` 以放置我们的 `CounterPage`。

<!--skip-->
```dart
import 'package:f_mobx/pages/counter_page.dart';
import 'package:flutter/material.dart';
 
void main() => runApp(MyApp());
 
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      home: CounterPage(),
    );
  }
}
```

下一步，我们需要在 `lib/pages/counter_page.dart` 中创建 `CounterPage`，并完成用户界面的构建。其中包括了一个增加按钮和一个减少按钮。

<!--skip-->
```dart
import 'package:flutter/material.dart';
 
class CounterPage extends StatelessWidget {
 
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: AppBar(
          title: Text('Flutter and MobX'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'Counter',
                style: TextStyle(fontSize: 30.0),
              ),
              Text(
                '0', 
                style: TextStyle(fontSize: 42.0),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  FlatButton.icon(
                    icon: Icon(Icons.add),
                    label: Text('Add'),
                    onPressed: () {},
                  ),
                  FlatButton.icon(
                    icon: Icon(Icons.remove),
                    label: Text('Remove'),
                    onPressed: () {},
                    ),
                  ),
                ],
              )
            ],
          ),
        ));
  }
}
```

## 创建计数器的状态

太棒了！我们现在已经在 `lib/store/counter/counter.dart` 创建好了我们的计数器。现在，让我们来看看代码，逐行进行解释:

<!--skip-->
```dart
import 'package:mobx/mobx.dart';
 
// This is our generated file (we'll see this soon!)
part 'counter.g.dart';
 
// We expose this to be used throughout our project
class Counter = _Counter with _$Counter;
 
// Our store class
abstract class _Counter with Store {
  @observable
  int value = 1;
 
  @action
  void increment() {
    value++;
  }
 
  @action
  void decrement() {
    value--;
  }
}
```

1. 我们导入了 `mobx.dart`，这样就可以访问 Store 以及其他功能了。
1. 接下来，我们使用了 `part` 语法组合此类的自动生成的部分。我们暂时还没使用到生成器，但是别担心，我们将会在下一个部分进行这个操作。
1. 接下来，我们将暴露 `Counter` 类，该类将与生成的与 MobX 绑定的 `_$Counter` 类一起使用。
1. 最后，我们使用 Store 类创建一个 `_Counter`，并定一个 `@observable` 属性和 `@actions` 以确定 Store 可以与之交互的区域。
 
MobX 已经帮我们做了绝大部分繁琐的事情，所以我们不需要关心底层是如何实现的。

现在我们已经有了 `Counter` 类，让我们在终端的该工程目录下通过下面的命令运行 `build_runner` 和 `mobx_codegen`：

<!--skip-->
```shell
$ flutter packages pub run build_runner watch
```
 
我们现在应该可以看到生成的 `counter.g.dart` 文件。它看上去类似下面这样：

<!--skip-->
```dart
part of 'counter.dart';
mixin _$Counter on _Counter, Store {
  final _$valueAtom = Atom(name: '_Counter.value');
 
  @override
  int get value {
    _$valueAtom.reportObserved();
    return super.value;
  }
 
  @override
  set value(int value) {
    _$valueAtom.context.checkIfStateModificationsAreAllowed(_$valueAtom);
    super.value = value;
    _$valueAtom.reportChanged();
  }
 
  final _$_CounterActionController = ActionController(name: '_Counter');
 
  @override
  void increment() {
    final _$actionInfo = _$_CounterActionController.startAction();
    try {
      return super.increment();
    } finally {
      _$_CounterActionController.endAction(_$actionInfo);
    }
  }
 
  @override
  void decrement() {
    final _$actionInfo = _$_CounterActionController.startAction();
    try {
      return super.decrement();
    } finally {
      _$_CounterActionController.endAction(_$actionInfo);
    }
  }
}
```

这些东西，我们都不需要自己来实现！是不是很棒呀？

## 与 Store 进行绑定

接下来，我们需要让 `counter_page.dart` 绑定到 Counter store。让我们再次看看它长什么样，然后进行深入探索：

<!--skip-->
```dart
import 'package:flut_mobx/store/counter/counter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
 
class CounterPage extends StatelessWidget {
  final Counter counter = Counter();
 
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: AppBar(
          title: Text('Flutter and MobX'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'Counter',
                style: TextStyle(fontSize: 30.0),
              ),
              Observer(
                builder: (_) =>
                    Text('${counter.value}', style: TextStyle(fontSize: 42.0)),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  FlatButton.icon(
                    icon: Icon(Icons.add),
                    label: Text('Add'),
                    onPressed: counter.increment,
                  ),
                  FlatButton.icon(
                    icon: Icon(Icons.remove),
                    label: Text('Remove'),
                    onPressed: counter.decrement,
                  ),
                ],
              )
            ],
          ),
        ));
  }
}
```

让我们深入研究一下：

1. 我们导入了 `flutter_mobx` 以及我们的 Counter store，所以之后我们可以用到他们。
1. 接下来，我们初始化了 `Counter`，并将其命名为 `counter`，之后我们就可以轻松监听这个可观察对象的值，或是发出 `actions：final Counter counter = Counter()`;
1. 我们使用 Observer 监听 `counter.value` 的值。
1. 我们将 onPressed 事件绑定到 `counter.increment` 和 `counter.decrement`，它们会将 `action` 发送到 Store。
 
上面这些代码结合起来就完成了我们小型的计数器应用！
 
## 总结

希望这篇 MobX 的介绍能够帮到你。我目前仍在持续探索 Flutter 状态管理的最佳实践，所以我也非常期待将来能对该系列进一步的更新。
 
原文：[developer.school](https://developer.school/flutter-state-management-with-mobx/)，文章 & 视频本地化和发布已获得作者本人授权

## 致谢

- 本文作者：Paul Halliday
- 中文字幕翻译: Alex、鑫磊
- 文章翻译：加康、鑫磊
- 头图：Lynn
