---
title: Flutter 上的内存泄漏监控
toc: true
---

## 一、前言

Flutter 所使用的 Dart 语言具有垃圾回收机制，有垃圾回收就避免不了会内存泄漏。在 Android 平台上有个内存泄漏检测工具 [LeakCanary](https://github.com/square/leakcanary)，它可以方便地在 debug 环境下检测当前页面是否泄漏。本文将会带你实现一个 Flutter 可用的 LeakCanary，并讲述我是怎么用该工具检测出了 1.9.1 Framework 上的两个泄漏。

## 二、Dart 中的弱引用

在具有垃圾回收的语言中，弱引用是检测对象是否泄漏的一个好方式。我们只需弱引用观测对象，等待下次 **Full GC**，如果 GC 之后对象为 `null`，说明被回收了，如果不为 `null` 就可能是泄漏了

Dart 语言中也有着弱引用，它叫 `Expando<T>` ，看下它的 API：

```dart
class Expando<T> {
  external T operator [](Object object);
  external void operator []=(Object object, T value);
}
```

你可能会好奇上述代码弱引用体现在哪里呢？其实是在 `expando[key]=value` 这个赋值语句上。`Expando` 会以弱引用的方式持有 `key`，这里就是弱引用的地方。

那么问题来了，这个 `Expando` 弱引用持有的是 `key`，但是本身又没有提供 `getKey()` 这样的 API，我们就无从下手去得知 `key` 这个对象是否被回收了。

为了解决这个问题，我们来看下 `Expando` 的具体实现，具体的代码在 [expando_path.dart](https://github.com/dart-lang/sdk/blob/master/sdk/lib/_internal/vm/lib/expando_patch.dart)：

```dart
@path
class Expando<T> {
  // ...
  T operator [](Objet object) {
    var mask = _size - 1;
    var idx = object._identityHashCode & mask;
    // sdk 是把 key 放到了一个 _data 数组内，这个 wp 是个 _WeakProperty
    var wp = _data[idx];

    // ... 省略部分代码
    return wp.value;
    // ... 省略部分代码
  }
}
```

> **注意**: 此 patch 代码不适用于 Web 平台

我们可以发现这个 `key` 对象是放到了 `_data` 数组内，用了一个 `_WeakProperty` 来包裹，那么这个 `_WeakProperty` 就是关键类了，看下它实现，代码在 [weak_property.dart](https://github.com/dart-lang/sdk/blob/master/sdk_nnbd/lib/_internal/vm/lib/weak_property.dart)：

```dart
@pragma("vm:entry-point")
class _WeakProperty {

  get key => _getKey();
  // ... 省略部分代码
  _getKey() native "WeakProperty_getKey";
  // ... 省略部分代码
}
```

这个类有我们想要的 `key`，可以用于判断对象是否还在！

怎么获取这种私有属性和变量呢？Flutter 中的 Dart 是不支持反射的（为了优化打包体积，关闭了反射），有没有其他办法来获取到这种私有属性呢？

答案肯定是 **“有”**，为了解决上述问题，我这边介绍一个 Dart 自带的服务，**Dart VM Service**。

## 三、Dart vm_service

[Dart VM Service](https://github.com/dart-lang/sdk/blob/master/runtime/vm/service/service.md) （后面简称 `vm_service`）是 Dart 虚拟机内部提供的一套 Web 服务，数据传输协议是 JSON-RPC 2.0。不过我们并不需要要自己去实现数据请求解析，官方已经写好了一个可用的 Dart SDK 给我们用：[vm_service](https://pub.flutter-io.cn/packages/vm_service)。

### `ObjRef`, `Obj` 和 `id` 的作用

先介绍 `vm_service` 中的核心内容：**`ObjRef`、`Obj`、`id`**

`vm_service` 返回的数据主要分为两大类，`ObjRef`（引用类型） 和 `Obj`（对象实例类型）。其中 `Obj` 完整的包含了 `ObjRef` 的数据，并在其基础上增加了额外信息（`ObjRef` 只包含了一些基本信息，例如：`id`，`name` 等）。

基本所有的 `API` 返回的数据都是 `ObjRef`，当 `ObjRef` 里面的信息满足不了你的时候，再调用 `getObject(,,,)`来获取 `Obj`。

**关于 `id`：** `Obj` 和 `ObjRef` 都含有 `id`，这个 `id` 是对象实例在 `vm_service` 里面的一个标识符，`vm_service` 几乎所有的 API 都需要通过 `id` 来操作，比如：`getInstance(isolateId, classId, ...)`、`getIsolate(isolateId)`、`getObject(isolateId, objectId, ...)`。

### 如何使用 `vm_service` 服务

`vm_service` 在启动的时候会在本地开启一个 `WebSocket` 服务，服务 URI 可以在对应的平台中获得：

- Android 在 `FlutterJNI.getObservatoryUri()` 中
- iOS 在 `FlutterEngine.observatoryUrl` 中

有了 URI 之后我们就可以使用 `vm_service` 的服务了，官方有一个帮我们写好的 SDK: [vm_service](https://pub.flutter-io.cn/packages/vm_service) ，直接使用内部的 `vmServiceConnectUri` 就可以获得一个可用的 `VmService` 对象。

> `vmServiceConnectUri` 的参数需要是一个 `ws://` 协议的 URI，默认获取的是 `http` 协议，需要借助 `convertToWebSocketUrl`方法转化下

## 四、泄漏检测实现

有了 `vm_service` 之后，我们就可以用它来弥补 `Expando` 的不足了。按照之前的分析，我们要获 `Expando` 的私有字段 `_data`， 这里可以使用 [getObject(isolateId, objectId)](https://github.com/dart-lang/sdk/blob/master/runtime/vm/service/service.md#getobject) api，它的返回值是 [Instance](https://github.com/dart-lang/sdk/blob/master/runtime/vm/service/service.md#instance)，内部的 `fields` 字段保存了当前对象的所有属性。这样我们就可以遍历属性获取到 `_data`，来达到反射的效果。

现在的问题是 API 参数中的 `isoateId` 和 `objectId` 是什么呢？根据我前面介绍的 `id` 相关内容，它是对象在 `vm_serive` 中的标识符。也就是我们只有通过 `vm_service` 才可以获取到这两个参数。

### `IsolateId` 的获取

`Isolate`（隔离区）是 Dart 里面的一个非常重要的概念，**基本上**一个 `isolate` 相当于一个线程，但是和我们平常接触的线程不同的是：不同 `isolate` 之间的内存不共享。

因为有了上述特性，我们在查找对象的时候也要带上 `isolateId`。通过 `vm_service` 的 `getVM()` API 可以获取到虚拟机对象数据，再通过 `isolates` 字段可以获取到当前虚拟机所有的 `isolate`。

那么怎么筛选出我们想要的 `isolate` 呢？这里简单起见只筛选主 `isolate`，这部分的筛选可以查看 [dev_tools](https://github.com/flutter/devtools) 的源码: [service_manager.dart#\_initSelectedIsolate](https://github.com/flutter/devtools/blob/v0.2.5/packages/devtools_app/lib/src/service_manager.dart#L450) 函数。

### `ObjectId` 的获取

我们要获取的 `objectId` 就是 `expando` 在 `vm_service` 中的 `id`，这里可以把问题扩展下：

**如何获取指定对象在 `vm_service` 中的 `id`？**

这个问题比较麻烦，`vm_service` 中没有实例对象和 `id` 转换的 API，有个 `getInstance(isolateId, classId, limit)` 的 API，可以获取某个 `classId` 的所有子类实例，先不说如何获取到想要的 `classId`，此 API 的性能和 `limit` 都让人担忧。

没有好办法了吗？其实我们可以借助 Library 的 **顶级函数（直接写在当前文件，不在类中，例如 main 函数）** 来实现该功能。

> 简单说明下 Library 是什么东西，Dart 中的分包管理是根据 Library 来的，同一个 Library 内的类名不能重复，一般情况下一个 `.dart` 文件就是一个 Library，当然也有例外，比如：part of 和 export

`vm_service` 有个 [invoke(isolateId, targetId, selector, argumentIds)](https://github.com/dart-lang/sdk/blob/master/runtime/vm/service/service.md#invoke) API，可以用来执行某个常规函数（`getter`、`setter`、构造函数、私有函数属于非常规函数），其中如果 `targetId` 是 Library 的 `id`，那么 `invoke` 执行的就是 Library 的顶级函数。

有了 `invoke` Library 顶级函数的路径，就可以用它实现对象转 `id` 了，代码如下：

```dart
int _key = 0;
/// 顶级函数，必须常规方法，生成 key 用
String generateNewKey() {
  return "${++_key}";
}

Map<String, dynamic> _objCache = Map();
/// 顶级函数，根据 key 返回指定对象
dynamic keyToObj(String key) {
  return _objCache[key];
}

/// 对象转 id
String obj2Id(VMService service, dynamic obj) async {

  // 找到 isolateId。这里的方法就是前面讲的 isolateId 获取方法
  String isolateId = findMainIsolateId();
  // 找到当前 Library。这里可以遍历 isolate 的 libraries 字段
  // 根据 uri 筛选出当前 Library 即可，具体不展开了
  String libraryId = findLibraryId();

  // 用 vm service 执行 generateNewKey 函数
  InstanceRef keyRef = await service.invoke(
    isolateId,
    libraryId,
    "generateNewKey",
    // 无参数，所以是空数组
    []
  );
  // 获取 keyRef 的 String 值
  // 这是唯一一个能把 ObjRef 类型转为数值的 api
  String key = keyRef.valueAsString;

  _objCache[key] = obj;
  try {
    // 调用 keyToObj 顶级函数，传入 key，获取 obj
    InstanceRef valueRef = await service.invoke(
      isolateId,
      libraryId,
      "keyToObj",
      // 这里注意，vm_service 需要的是 id，不是值
      [keyRef.id]
    )
    // 这里的 id 就是 obj 对应的 id
    return valueRef.id;
  } finally {
    _objCache.remove(key);
  }
  return null;
}
```

### 对象泄漏判断

现在我们已经可以获取到 `expando` 实例在 `vm_service` 中的 `id` 了，接下来就简单了

先通过 `vm_service` 获取到 `Instance`，遍历里面的 `fields` 属性，找到 `_data` 字段（注意 `_data` 是 `ObjRef` 类型），用同样的办法把 `_data` 字段转成 `Instance` 类型（`_data` 是个数组，`Obj` 里面有数组的 child 信息）。

遍历 `_data` 字段，如果都是 `null`，表明我们观测的 `key` 对象已经被释放了。如果 `item` 不为 `null`，再次把 `item` 转为 `Instance` 对象，取它的 `propertyKey` （因为 item 是 `_WeakProperty` 类型，`Instance` 里面特地为 `_WeakProperty` 开了这个字段）。

### 强制 GC

文章开头说到，如果要判断对象是否泄漏，需要在 Full GC 之后判断弱引用是否还在。有没有办法手动触发 GC 呢？

答案是有的，`vm_service` 虽然没有强制 GC 的 API，但是 dev_tools 的内存图标右上角有个 GC 的按钮，我们仿照着它来操作就行！dev_tools 是调用了 `vm_service` 的 [getAllocationProfile(isolateId, gc: true)](https://github.com/dart-lang/sdk/blob/master/runtime/vm/service/service.md#getallocationprofile) API 来实现手动 GC 的。

至于这个 API 触发的是不是 FULL GC，并没有说明，我测试触发的都是 FULL GC，如果要确定在 FULL GC 之后检测泄漏，可以监听 gc 事件流，`vm_service` 提供了该功能。

至此为止，我们已经可以实现泄漏的监控，而且可以获取到泄漏目标在 `vm_serive` 中的 `id` 了，下面就开始获取分析泄漏路径。

## 五、获取泄漏路径

关于泄漏路径的获取，`vm_service` 提供了一个 API 叫 [getRetainingPath(isolateId, objectId, limit)](https://github.com/dart-lang/sdk/blob/master/runtime/vm/service/service.md#getretainingpath)。直接使用此 API 就可以获取到泄漏对象到 GC Roots 的引用链信息，是不是感觉很简单？不过光这样可不行，因为它有以下几个坑点：

### Expando 持有问题

如果在执行 `getRetainingPath` 的时候，泄漏对象被 `expando` 持有的话会产生以下两个问题

- 因为该 API 返回的引用链只有一条，返回的引用链会经过 `expando`，导致无法获取真正的泄漏节点信息
- 在 ARM 设备上会出现 native crash，具体错误出现在 utf8 字符解码上

此问题很好解决，注意下在前面泄漏检测完之后，释放掉 `expando` 就行。

### `id` 过期问题

`Instance` 类型的 `id` 和 `Class`、`Library`、`Isolate` 这种 `id` 不一样，是会过期的。`vm_service` 中对于此类临时 `id` 的缓存容量默认大小是 `8192`，是一个循环队列。

因为此问题的存在，我们在检测到泄漏的时候，不能只保存泄漏对象的 `id`，需要保存原对象，而且不能强引用持有对象。所以这里我们还是需要使用 `expando` 来保存我们检测到的泄漏对象，等到需要分析泄漏路径的时候，再把对象专为 `id`。

## 六、1.9.1 Framework 上的内存泄漏

完成了泄漏检测和路径获取之后，得到了一个简陋的 leakcanary 工具。当我在 1.9.1 版本的 framework 下测试此工具的时候发现，**我观测一个页面它就泄漏一个页面！！！**

> 通过 dev_tools dump 出来的对象来看，的确泄漏了！

也就是 1.9.1 Framework 里面存在着泄漏，而且此泄漏会泄漏整个页面。

接下来开始排查泄漏原因，这里就碰到一个问题：泄漏路径太长：`getRetainingPath` 返回的链路长度有 300+，排查了一下午也没有找到问题根源。

结论：直接根据 `vm_service` 返回的数据是很难分析问题来源的，需要对泄漏路径的信息二次处理下。

### 如何缩短引用链

首先看下泄漏路径为什么会这么长，通过观测返回的链路后发现，绝大部分的节点都是 Flutter UI 组件节点（例如：`widget`、`element`、`state`、`renderObject`）。

也就是说引用链经过了 Flutter 的 widget tree，用过 Flutter 的应该都知道 Flutter 组 widget tree 的层次是非常深的。既然引用链长的原因是因为包含了 widget tree，而且 widget tree 基本都是成块出现的，那我们只要把引用链中的节点根据类型来分类、聚合，就可以大幅缩短泄漏路径了。

#### 分类

根据 Flutter 的组件类型，将节点分为以下几种类型：

- `element`：对应 `Element` 节点
- `widget`：对应 `Widget` 节点
- `renderObject`：对应 `RenderObject`节点
- `state`：对应 `State<T extends StatefulWdget>` 节点
- `collection`：对应集合类型节点，例如：List、Map、Set
- other：对应其他节点

#### 聚合

节点的分类做好了之后，就可以把相同类型的节点聚合一下。这里提下我的聚合方式

把 `collection` 类型的节点看成了连接节点，相邻的相同节点合并到一个集合内，如果两个相同类型的集合中间是通过 `collection` 节点相连的，就继续把这两个集合合并成一个集合，递归进行

> 通过 **分类-聚合** 的处理后，原先 300+ 的链路长度，可以缩短为 100+。

继续排查 1.9.1 Framework 的泄漏问题，路径虽然缩短了，可以找到问题大致出现在 `FocusManager` 节点上！但是具体问题还是难以定位，主要有以下两点：

- **引用链节点缺少代码位置**：因为 `RetainingObject` 数据中只有 `parentField`、`parentIndex` 和 `parentKey` 三个字段来表示当前对象引用下一个对象的信息，通过该信息找代码位置效率低下
- **无法知道当前 Flutter 组件节点的信息**：比如 `Text` 的文本信息，`element` 所在的 widget 是啥，state 的生命周期状态，当前组件属于哪个页面，等等

介于上述两个痛点，还需要对泄漏节点的信息做扩展处理：

- **代码位置**：节点的引用代码位置其实只需要解析 `parentField` 就行，通过 `vm_serive` 解析 `class`，取内部的 `field`，找到对应的 `script` 等信息。此方法可以获取到源码
- **组件节点信息**：Flutter 的 UI 组件都是继承自 `Diagnosticable`，也就是只要是 `Diagnosticable` 类型的节点都可获取到非常详细的信息（dev_tools 调试时候，组件树信息就是通过 `Diagnosticable.debugFillProperties` 方法获取的）。除了这个还需要扩展当前组件所在 route 的信息，这个很重要，判断组件所在页面用

### 排查 1.9.1 Framework 泄漏根源

通过上述的种种优化后，我得到了下面这个工具，在两个 `_InkResponseState` 节点中发现了问题：

![](https://imgkr.cn-bj.ufileos.com/4df44206-dde5-4196-ad52-1538480552e1.png)

泄漏路径中有两个 `_InkResponseState` 节点所属的 route 信息不同，表明这两个节点在两个不同的页面中。顶部 `_InkResponseState` 的描述信息显示 `lifecycle not mounted`，说明组件已经销毁了，但是还是被 `FocusManager` 引用着！问题出现在这，来看下这部分代码

![](https://imgkr.cn-bj.ufileos.com/3105a9bd-7004-439a-8561-5297ac7b3c47.png)

代码中可以明显的看到 `addListener` 时候对 `StatefulWidget` 的生命周期理解错误。`didChangeDependencies` 是会多次调用的，`dispose` 只会调用一次，所以这里就会出现 `listener` 移除不干净的情况。

修复了上述泄漏之后，发现还有一处泄漏。排查后发现泄漏源在 `TransitionRoute` 中：

![](https://imgkr.cn-bj.ufileos.com/ebbc4718-f3df-4a81-9a28-61fa3c629dff.jpg)

当打开一个新页面的时候，该页面的 `Route`（也就是代码中的 `nextRoute`）会被前一个页面的 `animation` 所持有，如果页面跳转都是 `TransitionRoute`，那么所有的 `Route` 都会泄漏  ！

> 好消息是以上泄漏都在 1.12 版本之后修复了

修复完上述两个泄漏之后，再次测试，`Route` 和 `Widget` 都可以回收了，至此 1.9.1 Framework 排查完毕。

---

**本文作者：** 戚耿鑫

现就职于快手应用研发平台组 Flutter 团队，负责 APM 方向开发研究。从 2018 年开始接触 Flutter，在 Flutter 混合栈、工程化落地、UI 组件等方面有大量经验。

联系方式：qigengxin@kuaishou.com