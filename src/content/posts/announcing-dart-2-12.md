---
title: Dart 2.12 现已发布
toc: true
---

![](https://devrel.andfun.cn/devrel/posts/2021/03/6b1a0818de0a5.png)

*作者 / Michael Thomsen*

Dart 2.12 现已发布，其中包含 [健全的空安全](https://dart.cn/null-safety) 和 [Dart FFI](https://dart.cn/guides/libraries/c-interop) 的稳定版。空安全是我们最新主打的一项生产力强化功能，意在帮助你规避空值错误，以前这种错误通常很难被发现，你可以观看下面这支视频了解详情。FFI 则是一种互操作机制，支持调用以 C 语言编写的既有代码，例如调用 Windows [Win32 API](https://pub.flutter-io.cn/packages/win32)。欢迎大家即刻开始使用 Dart 2.12。

<iframe width="560" height="315" src="{{site.bili.embed}}?aid=415467484&bvid=BV1GV411Y7sW&cid=262014735&page=1&autoplay=false" {{site.bili.set-short}}> </iframe>

## **Dart 平台的独特功能**

在详细了解健全空安全和 FFI 之前，我们先来讨论一下它们在哪些方面契合了我们对 Dart 平台的期望。编程语言往往有很多类似的功能，例如，很多语言都支持面向对象的编程或在 web 上运行。真正将各个语言区分开来的，是其独特的功能组合。

![](https://devrel.andfun.cn/devrel/posts/2021/03/6773481aed985.jpg)

Dart 具有横跨三个维度的独特功能组合:

* **可移植性:** 高效的编译器可针对设备生成 x86 和 ARM 机器代码，并针对 web 生成优化的 JavaScript。同时兼容移动设备、桌面 PC、应用后端等多种 [目标平台](https://dart.cn/overview#platform)。大量的开发库和 package 提供了可在所有平台上使用的一致的 API，进一步降低了开发者创建真正多平台应用的成本。

* **高生产力:** Dart 平台支持热重载，因此可在原生设备和 web 上实现快速迭代开发。此外，Dart 还提供了丰富的结构，如 isolates 和 async/await 等，用以处理和实现常见的并发和事件驱动的应用模式。

* **稳健:** Dart 的健全空安全类型系统可以在开发过程中就捕捉到错误。整个平台拥有极好的可扩展性和可靠性，已经被大量且多样的应用在累计超过十年的生产环境中实战检验过，其中包括 Google 的一些关键业务应用，如 Google Ads 和 Google Assistant 等。

健全空安全增强了类型系统的稳健性，同时提高了性能。借助 Dart FFI，你可以获得更强的可移植性，同时沿用由 C 语言编写的既有代码，在处理对性能要求极为严苛的任务时，可以尽情使用经过精心优化的 C 语言代码。

## **健全的空安全**

自 [Dart 2.0](https://medium.com/dartlang/announcing-dart-2-80ba01f43b6) 中引入健全类型系统以来，Dart 语言中最重大的新增内容便是健全空安全。空安全进一步增强了类型系统，让你能够捕捉到空值错误，此类错误经常导致应用崩溃。启用空安全后，你就可以在开发过程中捕捉到空值错误，避免应用在生产环境中发生崩溃。

健全空安全的设计围绕一套核心原则展开。你可以阅读 [官方文档](https://dart.cn/null-safety#null-safety-principles) 了解这些原则对开发者的影响。

### **默认不可空: 从根本改变类型系统**

在空安全出现之前，开发者面临的核心挑战在于无法区分预期收到空值的代码和不接受空值的代码。几个月前，我们在 Flutter 的 master 渠道中发现了一个错误，多个 flutter 工具命令在特定计算机配置下会发生崩溃，并触发空值错误: `The method '>=' was called on null`。问题出自如下代码:

```
final int major = version?.major;
final int minor = version?.minor;
if (globals.platform.isMacOS) {
 // plugin path of Android Studio changed after version 4.1.
 if (major >= 4 && minor >= 1) {
 ...
```

你发现错误了吗？由于 `version` 可能为空，所以 `major` 和 `minor` 也可能为空。如果单独检查此处代码，这一错误似乎并不难发现。但实际上，即使经过了严格的代码审查过程 (如 Flutter repo 所采用的代码审查流程)，也总是难免有这样的漏网之鱼。在启用空安全后，静态分析能够立即捕捉到这一问题 (如下图)。你可以 [在 DartPad 中亲自上手体验](https://dartpad.dev/0e9797be7488d8ec6c3fca92b7f2740f?null_safety=true)。

![△ IDE 中的分析结果](https://devrel.andfun.cn/devrel/posts/2021/03/7260c6d9d0a2a.png)

△ IDE 中的分析结果

这只是一个非常简单的错误。我们早期在 Google 内部的代码中使用空安全时，捕捉到的复杂错误远多于此。其中一些是多年前就已经发现的 bug，但在通过空安全进行额外的静态检查前，很多团队都未能找到原因。

* 内部团队发现，他们经常检查表达式中是否存在空值，而这些表达式永远不可能为空。这个问题在使用 [protobuf](https://developers.google.cn/protocol-buffers) 的代码中最常见，其中可选字段在未经设置时会返回一个默认值，而且永不为空。这会导致代码混淆默认值和空值，并错误地检查默认条件。
* Google Pay 团队在他们的 Flutter 代码中发现了一些 bug，在尝试访问 Widget 上下文之外的 Flutter State 对象时会出错。在采用空安全之前，这些对象会返回 null 并掩盖错误；在采用空安全之后，健全分析确定这些属性永远不可能为空，并会给出分析错误。
* Flutter 团队发现了一个 bug: 如果在 Window.render() 中向 scene 参数传递空值，则 Flutter 引擎可能会崩溃。在向空安全迁移的过程中，他们添加了一个提示，[将 Scene 标记为不可空](https://github.com/cbracken/engine/blob/bad869e229a8a02cad6e63d12e80807b33b5c12f/lib/ui/window.dart#L1069)，即可轻松防止空值可能引发的应用崩溃。

### **在默认不可空的前提下工作**

[启用空安全](https://dart.cn/null-safety#enable-null-safety) 后，声明变量的基础方法会发生变化，因为默认类型不可为空:

```
// 在空安全的 Dart 中，以下均不可为空
var i = 42; // Inferred to be an int.
String name = getFileName();
final b = Foo();
```

如果你想要创建可能同时包含值或 null 的变量，则需要在声明变量时在类型后面显式添加 ? 后缀:

```
// aNullableInt 可以为整型或 null
int? aNullableInt = null;
```

空安全的实现很稳健，并提供丰富的静态流程分析，方便开发者轻松处理可空类型。例如，局部变量在进行空值检查后，Dart 会将其类型从可空提升为非空:

```
int definitelyInt(int? aNullableInt) {
 if (aNullableInt == null) {
   return 0;
 }
 // aNullableInt 现在会被提示为非空 int
 return aNullableInt;
}
```

我们还添加了一个新的关键字，required。当一个命名的参数被标记为 required (在 Flutter widget API 中经常出现)，而调用者忘记提供该参数时，就会发生如下分析错误:

![](https://devrel.andfun.cn/devrel/posts/2021/03/17e1a588495f7.png)

### **渐进迁移至空安全**

空安全对于我们的类型系统而言是一项根本性的改变，因此如果我们执意强制所有开发者采用，势必会造成严重的混乱。因此，我们想让**你自行决定**合适的迁移时机，空安全将是一项可选特性: 在做好准备之前，你可以在无需强制启用空安全的情况下使用 Dart 2.12。你甚至可以在尚未启用空安全的应用或 package 中依赖已启用空安全的 package。

为了帮助你将现有代码迁移至空安全，我们提供了迁移工具和 [迁移指南](https://dart.cn/null-safety/migration-guide)。该工具会首先分析你所有的代码，然后你可以交互式地查看工具推断出的可空属性，如果你不同意工具得出的结论，则可以添加可空性提示以更改推断。添加迁移提示可能会大幅提升迁移质量。

![](https://devrel.andfun.cn/devrel/posts/2021/03/e4f5172c2403a.png)

目前，在默认情况下，使用 [dart create](https://dart.cn/tools/dart-tool) 和 [flutter create](https://docs.flutter.cn/reference/flutter-cli) 新创建的 package 和应用中不会启用健全空安全。在大部分生态系统完成迁移后，我们预计将在后续的稳定版本中默认启用。你可以通过 `dart migrate` 在新创建的 package 或应用中轻松 [启用空安全](https://dart.cn/null-safety#create)。

### **Dart 生态系统的空安全迁移状态**

去年，我们提供了健全空安全的数个预览版和 Beta 版，旨在为生态系统提供首批支持空安全的 package。这项工作非常重要，我们建议大家 [有序迁移至健全空安全](https://dart.cn/null-safety/migration-guide#step1-wait)，也就是说，在所有依赖项迁移完成之前，最好不要迁移自己的 package 或应用。

我们已发布由 [Dart](https://pub.flutter-io.cn/packages?q=publisher%3Adart.dev&sort=popularity&null-safe=1)、[Flutter](https://pub.flutter-io.cn/packages?q=publisher%3Aflutter.dev&sort=popularity&null-safe=1)、[Firebase](https://pub.flutter-io.cn/packages?q=publisher%3Afirebase.google.com&sort=popularity&null-safe=1) 和 [Material](https://pub.flutter-io.cn/packages?q=publisher%3Amaterial.io&sort=popularity&null-safe=1) 团队所提供的数百个 package 的空安全版本。令人惊喜的是，Dart 和 Flutter 生态系统对此也予以巨大的支持，pub.dev 现在共有 1,000 多个 package 支持空安全。而且重要的是，最受欢迎的 package 已率先完成迁移，截止到 Dart 2.12 发布时，前 100 个最受欢迎的 package 中已有 98 个支持空安全，而在前 250 和前 500 的 package 中，支持空安全的比例则为 78% 和 57%。我们希望在接下来的几周，pub.dev 上能够出现更多支持空安全的 package。[我们的分析](https://github.com/dart-lang/sdk/wiki/Null-safety-migration-status) 表明，pub.dev 上的绝大多数 package 已经可以 [开始迁移](https://dart.cn/null-safety/migration-guide)。

### **充分健全的空安全的优势**

完成迁移后，你的项目就处于健全的空安全模式下了。这意味着 Dart 能够完全确保具有不可空类型的表达式不为空。当 Dart 分析完你的代码并确定某个变量不可为空时，该变量将始终不可为空。Dart 与 Swift 都拥有健全的空安全，但有些编程语言在这方面仍有待改进。

Dart 的健全空安全还暗含另一项备受期待的优势: 你的程序可以更小、更快。由于 Dart 能够确保不可为空的变量绝不为空，因此可以 [实现优化](https://medium.com/dartlang/dart-and-the-performance-benefits-of-sound-types-6ceedd5b6cdc)。例如，Dart 的运行前 (ahead-of-time, AOT) 编译器可以生成更小更快的原生代码，因为当其知道变量不为空时，便不再需要添加空值检查了。

## **Dart FFI: 集成 Dart 与 C 语言代码库**

你可以通过 Dart FFI 调用 C 语言编写的既有代码库，从而增强可移植性，还可以通过精心打磨的 C 代码完成对性能要求极为严苛的任务。从 Dart 2.12 起，[Dart FFI](https://dart.cn/guides/libraries/c-interop) 已结束 Beta 测试阶段，现已进入稳定状态，可以用于生产环境。我们还添加了一些新功能，包括嵌套结构和按值传递结构。

### **按值传递结构**

在 C 语言中，结构可通过引用和值进行传递。FFI 以前仅支持按引用传递结构，但从 Dart 2.12 开始，也支持按值传递。下方的简单示例中，两个 C 函数使用引用和值完成传递:

```
struct Link {
  double value;
  Link* next;
};

void MoveByReference(Link* link) {
  link->value = link->value + 10.0;
}

Coord MoveByValue(Link link) {
  link.value = link.value + 10.0;
  return link;
}
```

### **嵌套结构**

C API 通常使用嵌套结构，这种结构本身也包含结构，比如以下示例:

```
struct Wheel {
 int spokes;
};

struct Bike {
 struct Wheel front;
 struct Wheel rear;
 int buildYear;
};
```

从 Dart 2.12 起，FFI 将支持嵌套结构。

### **API 改动**

作为 FFI 稳定版发布内容的一部分，并且为了支持上述功能，我们做了一些小幅的 API 改动。

现在不允许创建空结构 (重要改动参照 [#44622](https://github.com/dart-lang/sdk/issues/44622))，并会给出弃用警告。你可以使用一个新的类型 Opaque 来表示空结构。dart:ffi 函数 sizeOf、elementAt 和 ref 现在需要编译时的类型参数 (重要改动参照 [#44621](https://github.com/dart-lang/sdk/issues/44621))。因为在 package:ffi 中增加了新的便利函数，所以在常见的情况下，无需额外添加关于分配和释放内存的模板代码:

```
// 分配一个 Utf8 数组，使用 Dart 字符串填充，然后传递给 C 方法并转换结果，最后释放 arg
//
// API 变更前：
final pointer = allocate<Int8>(count: 10);
free(pointer);
final arg = Utf8.toUtf8('Michael');
var result = helloWorldInC(arg);
print(Utf8.fromUtf8(result);
free(arg);
// API 变更后：
final pointer = calloc<Int8>(10);
calloc.free(pointer);
final arg = 'Michael'.toNativeUtf8();
var result = helloWorldInC(arg);
print(result.toDartString);
calloc.free(arg);
```

### **自动生成 FFI 绑定**

对于大型的 API 接口，编写与 C 代码集成的 Dart 绑定极其耗时。为减轻这一负担，我们为大家准备了绑定生成器，可以通过 C 头文件自动创建 FFI 封装代码，[欢迎试用](https://pub.flutter-io.cn/packages/ffigen)。

### **FFI 路线图**

核心 FFI 平台完成后，我们的工作重心将转向基于核心平台扩展 FFI 功能集。我们正在研究的一些功能包括:

* ABI 特定数据类型，如 int、long、size_t ([#36140](https://github.com/dart-lang/sdk/issues/36140))
* 结构中的内联数组 ([#35763](https://github.com/dart-lang/sdk/issues/35763))
* Packed 结构 ([#38158](https://github.com/dart-lang/sdk/issues/38158))
* 联合类型 ([#38491](https://github.com/dart-lang/sdk/issues/38491))
* 对 Dart 开放终结方法 (finalizer) ([#35770](https://github.com/dart-lang/sdk/issues/35770)，请注意，你现在可以通过 C 语言使用终结方法)

### **FFI 使用示例**

在过去的几个月中，我们看到大家在使用 Dart FFI 集成一系列基于 C 语言的 API 时，发掘出了许多有创意的用法。下面介绍几个示例:

* [open_file](https://pub.flutter-io.cn/packages/open_file) 是一个用于在多个平台打开文件的 API，使用 FFI 在 Windows、macOS 和 Linux 上调用操作系统原生 API。https://pub.flutter-io.cn/packages/open_file
* [win32](https://pub.flutter-io.cn/packages/win32) 封装了最常用的 Win32 API，便于从 Dart 直接调用各种 Windows API。
* [objectbox](https://pub.flutter-io.cn/packages/objectbox) 是一个快速数据库，底层由 C 语言实现。
* [tflite_flutter](https://pub.flutter-io.cn/packages/tflite_flutter) 使用 FFI 封装了 TensorFlow Lite API。

## **Dart 语言的未来计划**

健全空安全是这几年我们对 Dart 语言做出的最大改变。接下来，我们将继续稳步改进 Dart 语言和平台。下面简单介绍一些我们在 [语言设计规划](https://github.com/dart-lang/language/projects/1) 中实验的内容:

* **类型别名** ([#65](https://github.com/dart-lang/language/issues/65)): 将创建类型别名的功能扩展到非函数类型。例如，你可以创建一个 typedef 并将其用作变量类型:

```
typedef IntList = List<int>;
IntList il = [1,2,3];
```

* **无符号右移运算符** ([#120](https://github.com/dart-lang/language/issues/120)): 添加新的 >>> 运算符，便于对整数执行无符号移位操作。此运算符可完全重写。

* **通用元数据注解** ([#1297](https://github.com/dart-lang/language/issues/1297)): 扩展元数据注解，以同时支持含类型参数的注解。

* **静态元编程** ([#1482](https://github.com/dart-lang/language/issues/1482)): 支持静态元编程，即编译期间生成新 Dart 源代码的 Dart 程序，与 Rust 宏 ([macro](https://doc.rust-lang.org/book/ch19-06-macros.html)) 和 Swift 函数构建器 ([function builder](https://github.com/apple/swift-evolution/blob/9992cf3c11c2d5e0ea20bee98657d93902d5b174/proposals/XXXX-function-builders.md)) 类似。该功能目前仍处于早期探索阶段，但我们认为它可能会开启全新用例的大门，打破现在依赖代码生成的僵局。

## **Dart 2.12 现已发布**

欢迎大家下载 [Dart 2.12](https://dart.cn/get-dart) 和 [Flutter 2.0](https://docs.flutter.cn/get-started/) SDK，即刻开始使用 Dart 2.12，尽情体验健全空安全和稳定版 FFI。请大家阅览 [Dart](https://dart.cn/null-safety#known-issues) 和 [Flutter](https://docs.flutter.cn/null-safety#known-issues) 的已知空安全问题。如果你发现其他任何问题，请在 [Dart 问题跟踪页](https://github.com/dart-lang/sdk/issues) 中报告给我们。

如果你已在 [pub.dev](https://pub.dev/) 上发布了 package，请立即参阅 [迁移指南](https://dart.cn/null-safety/migration-guide)，了解如何迁移至健全空安全。迁移有助于依赖你的 package 的其他 package 和应用完成迁移。我们在此向已经完成迁移的开发者们表示感谢！

欢迎大家与我们分享自己的健全空安全和 FFI 体验，我们评论区见！