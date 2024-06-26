---
title: Dart 3.2 更新盘点
toc: true
---

![]({{site.flutter-files-cn}}posts/images/2024/01/07/BzdDG1.png)

*作者 / Kevin Moore 和 Michael Thomsen*

我们隆重宣布推出 Dart 3.2，这一版本针对以下方面做出了改进: 新增了一项语言功能，可对私有 final 字段进行非空升级；通过新增的互操作功能改善了开发者体验；支持 DevTools 的扩展程序；并更新了我们的 Web 路线图，包括提供对 Wasm (又名 WebAssembly) 的支持。

## **私有 final 字段的非空升级**

自我们在 [Dart 2.12](https://flutter.cn/posts/announcing-dart-2-12) 中引入 [健全的空安全 (sound null safety)](https://medium.com/dartlang/announcing-dart-2-12-499a6e689c87) 以来已过去几年时间。你可以借助空安全声明哪些类型可为空 (可以包含值或 null)，哪些类型不可为空 (始终包含值)。通过将空安全与 [流程分析](https://dart.cn/null-safety/understanding-null-safety#flow-analysis) 相结合，能够检测何时可以将可为空的变量 "升级" 为更安全的非空类型:

```dart
int definitelyInt(int? aNullableInt) {
  if (aNullableInt == null) {
    return 0;
  }
  // If flow analysis reaches this point, 
  // aNullableInt can safely promote to a non-null int.
  return aNullableInt; 
}
```

自 Dart 2.12 发布以来，类型升级一直是空安全的核心部分，但仅限于局部变量。字段或顶级变量无法升级，例如以下代码示例:

```dart
class Container {
  final int? _fillLevel;
  Container(this._fillLevel);
  check() {
    if (_fillLevel != null) {
      int i = _fillLevel; // Prior to Dart 3.2, causes an error.
    }
  }
}
```

这种局限性由多种复杂的情况导致。在这些情况中，流程分析无法安全地确定字段何时或如何变化。以类上的字段升级为例，如果子类使用 getter 覆盖字段，可能会存在问题，因为有时会返回 null。

在 Dart 3.2 中，我们改进了流程分析引擎，现在能够对**私有 final 字段**实施类型升级。现在，上面的代码示例可以正常运行。你可以这样理解: 对于私有 final 字段，它的值在初始分配后永不更改，因此仅检查一次也是安全的。私有 final 字段升级从 Dart 3.2 起推出，并将应用于配置 [3.2 及以上版本](https://dart.cn/guides/language/evolution#language-versioning) Dart SDK 的项目。

## **在 package:lints 3.0 中加入新的代码分析选项**

针对代码分析，我们还对 [package:lints](https://pub.flutter-io.cn/packages/lints) 中的标准代码分析规则进行了一些改进。此 package 包含默认和推荐的静态分析规则集，适用于任何根据 dart create 或 flutter create (通过 [package:flutter_lints](https://pub.flutter-io.cn/packages/flutter_lints) — package:lints 的扩展) 创建的新项目。

此 lint 集新的主要版本 (版本 3.0) 现已推出。我们在此修订版的核心集中添加了六个 lint，在推荐集中添加了两个 lint，可用于验证 pubspec URL，以及验证是否使用正确的参数调用集合方法等。你可以查看 [更新日志](https://github.com/dart-lang/lints/blob/main/CHANGELOG.md#300) 获取完整的更改列表。3.0 版本将成为即将发布的新项目的默认版本。你也可以 [立即升级](https://github.com/dart-lang/lints#upgrading-to-the-latest-lints) 现有项目。

## **Dart 互操作性更新**

提供 [广泛的跨平台支持](https://dart.cn/overview#platform) 一直是 Dart 的核心原则。但是，即使一行 Dart 代码可以做到无需更改就能在所有平台上运行，大型应用通常仍然需要与现有代码进行互操作。现有代码指旧项目的代码，或其他库中可用的 API 或系统 API。我们在这一领域投入了大量精力，首先是用于 [与原生 C API 进行互操作](https://dart.cn/guides/libraries/c-interop) 的 FFI。我们目前正在努力扩大该领域，以支持与 [Java、Kotlin](https://dart.cn/guides/libraries/java-interop)、[Objective C 和 Swift](https://dart.cn/guides/libraries/objective-c-interop) 的互操作。你可以阅读下文 Dart Web 部分，了解有关 JS 互操作性的精彩更新。

从 Dart 3.2 开始，我们对原生互操作进行了许多改进:

* 我们为 C FFI 引入了 [NativeCallable.isolateLocal](https://api.dart.cn/stable/dart-ffi/NativeCallable/NativeCallable.isolateLocal.html) 构造函数，它可以根据任意 Dart 函数创建 C 函数指针。这是一项由 [Pointer.fromFunction](https://api.dart.cn/stable/dart-ffi/Pointer/fromFunction.html) 提供的扩展功能，只能根据顶级函数创建函数指针。

* 我们更新了 Objective-C 绑定生成器，以使用在 Dart 3.1 中添加的 [NativeCallable.listener](https://api.dart.cn/stable/dart-ffi/NativeCallable/NativeCallable.listener.html)。该生成器现在可以自动处理包含异步回调的 API，例如 [Core Motion](https://developer.apple.com/documentation/coremotion) 这类此前需要手动编写部分绑定代码的 API。

* 我们为实现 Java 和 Kotlin 互操作而持续改进 [package:jnigen](https://dart.cn/guides/libraries/java-interop)。现在能够将 [package:cronet_http](https://pub.flutter-io.cn/packages/cronet_http) (适用于 Android 的 Cronet HTTP 客户端的封装容器) 从手写的绑定代码迁移到 [自动生成的封装容器](https://github.com/dart-lang/http/blob/master/pkgs/cronet_http/jnigen.yaml)。

* 我们在 [Native Assets](https://github.com/dart-lang/sdk/issues/50565) 功能方面取得了重大进展，该功能旨在解决与依赖原生代码的 Dart package 分发相关的许多问题。Native Assets 提供统一的钩子来集成构建 Flutter 和独立 Dart 应用所涉及的各种构建系统，从而解决相关问题。你可以查看相关 [文档](http://dart.cn/guides/libraries/c-interop#native-assets) 获取预览。

## **适用于 Dart package 的 DevTools 扩展程序**

Dart [DevTools](https://dart.cn/tools/dart-devtools) 是一套用于支持纯 Dart 和 Flutter 应用的调试及性能工具。我们在 Dart 3.2 和 Flutter 3.16 中 [推出](https://medium.com/p/c8bc1aaf8e5f/) 了新的 [扩展框架](https://pub.flutter-io.cn/packages/devtools_extensions)，让 package 作者能够直接在 DevTools 中为其 package 构建自定义工具。因此，包含框架的 pub.dev package 能够提供特定于其用例的自定义工具。例如，[Serverpod](https://pub.flutter-io.cn/packages/serverpod) 的作者一直在努力为其 package 构建 DevTools，并且很高兴在即将发布的 [1.2 版本](https://github.com/orgs/serverpod/projects/4) 中提供 DevTools 扩展程序。

![]({{site.flutter-files-cn}}posts/images/2024/01/07/toBjEO.png)

△ 计划纳入即将发布的 ServerPod 1.2 版本中的 DevTools 扩展程序

## **Dart Web 和 Wasm 更新**

Wasm (也称为 [WebAssembly](https://webassembly.org/)) 是一种在 Web 浏览器上非常棒的新指令格式，还提供可移植、独立于平台的二进制格式，以适用于现代浏览器。我们正在将高级托管语言 (如 Dart) 的垃圾回收功能添加到 Wasm 标准中。从 Chrome 119 开始默认启用 [Wasm 的垃圾回收支持](https://developer.chrome.com/blog/wasmgc/) (也称为 Wasm-GC)。下一个稳定版本 Firefox 120 也将支持 Wasm-GC。那么 Dart、Flutter 和 Wasm-GC 现在是什么情况呢？

Dart-to-Wasm 编译器几乎配备所有功能。我们对性能和兼容性非常满意，正在进一步关注边缘情况，以确保在各种场景中实现畅快运行。

对于 Flutter Web，我们完成了一个新的 "Skwasm" 渲染引擎开发。为了最大限度提高性能，Skwasm 通过 wasm-to-wasm 绑定，将编译后的应用代码直接连接到自定义 [CanvasKit Wasm 模块](https://skia.org/docs/user/modules/canvaskit/)。这是 Flutter Web 多线程渲染支持的首次迭代，进一步提高了帧时间。

在采用 Wasm 的 Flutter Web 准备结束目前的实验状态之前，我们还有一些事情要做:

* **双重编译** : 生成 Wasm 和 JavaScript 输出，并在运行时启用功能检测，以支持具备或不具备 Wasm-GC 支持的浏览器。
* **现代 JavaScript 互操作性** : 一种新的基于 [扩展类型](https://github.com/dart-lang/language/issues/2727) 的 JS 互操作机制，当针对 JavaScript 和 Wasm 时，可以在 Dart 代码、浏览器 API 和 JS 库之间实现简洁的、类型安全的调用。
* **支持 Wasm 的浏览器 API** : 新的 package:web，基于现代 JS 互操作机制，取代了 dart:html (及相关库)，借此可轻松访问浏览器 API，并且支持在 JS 和 Wasm 目标上使用。

我们正在开始将大量的内部项目迁移到 package:web 和新的 JS 互操作机制，并希望在下一个稳定版本中向你提供更多更新。与此同时，你可以在我们的 [WebAssembly 支持](https://flutter.dev/wasm) 页面上获取最新的详细信息。

## **开始体验**

以上就是我们要与你分享的所有内容。Dart 3.2 现已在 [dart.dev](https://dart.cn/get-dart) 中推出，你也可以通过我们将在后续介绍的 [Flutter 3.16](https://flutter.cn/posts/whats-new-in-flutter-3-16) 版本使用此产品。尽情体验新版 Dart 吧！
