---
title: Dart 2.15 现已发布
toc: true
---

*作者 / Michael Thomsen, Dart & Flutter Product Manager, Google*

我们已经正式发布了 Dart SDK 的 2.15 版本，该版本新增了可快速并发的工作器 isolate、新的构造函数拆分 (tear-off) 语言特性、经过改进的 dart:core 库枚举支持、package 发布者相关的新功能，等等。

![](https://files.flutter-io.cn/posts/images/2021/12/8CA8pZ.png)

## **工作器 isolate 的快速并发**

如今，几乎所有现代设备都使用多核 CPU，可以并行执行多个任务。对于大多数 Dart 程序来说，这些内核的使用情况对开发者而言是透明的: 默认情况下，Dart 运行时系统在单个内核上运行所有的 Dart 代码，不过会使用其他内核来执行系统级任务，比如异步输入/输出，包括写入文件或者调用网络等。

不过你自己的 Dart 代码可能也需要并发运行。例如，你可能需要展示一个连续的动画，同时执行一个长时间运行的任务，比如解析一个大型 JSON 文件。如果额外任务花了太长时间，就可能会导致界面卡顿或延迟。如果将这些额外的任务移动到另一个单独的内核，动画就可以在主执行线程上继续运行而不受干扰。

Dart 的并发模型基于 [isolate](https://dart.dev/guides/language/concurrency)，isolate 是一种相互隔离的独立执行单元，这是为了避免出现与共享内存相关的大量并发编程错误，如 [数据争用等竞态条件](https://en.wikipedia.org/wiki/Race_condition#In_software)。Dart 通过禁止在 isolate 之间共享任何可变对象来避免这些错误，并使用 [消息传递](https://dart.dev/guides/language/concurrency#sending-multiple-messages-between-isolates) 在 isolate 之间交换状态。在 Dart 2.15 中，我们对 isolate 进行了许多实质性的改进。

我们首先重新设计和实现了 isolate 的工作方式，引入了一个新概念: isolate 组。Isolate 组中的 isolate 共享各种内部数据结构，这些数据结构则表示正在运行的程序。这使得组中的单个 isolate 变得更加轻便。如今，因为不需要初始化程序结构，在现有 isolate 组中启动额外的 isolate 比之前快 100 多倍，并且产生的 isolate 所消耗的内存减少了 10 至 100 倍。

虽然 isolate 组仍然阻止在 isolate 间共享访问可变对象，但由于 isolate 组使用共享堆实现，这也让其拥有了更多的功能。我们可以将对象从一个 isolate 传递到另一个 isolate，这可用于执行返回大量内存数据的任务的工作器 isolate。例如，工作器 isolate 通过网络调用获得数据，将该数据解析为大型 JSON 对象图，然后将这个 JSON 图返回到主 isolate 中。在推出 Dart 2.15 之前，执行该操作需要深度复制，如果复制花费的时间超过帧预算时间，就会导致界面卡顿。

在 Dart 2.15 中，工作器 isolate 可以调用 [`Isolate.exit()`](https://api.dart.cn/stable/2.15.0/dart-isolate/Isolate/exit.html)，将其结果作为参数传递。然后，Dart 运行时将包含结果的内存数据从工作器 isolate 传递到主 isolate 中，无需复制，且主 isolate 可以在固定时间内接收结果。我们已经在 [Flutter 2.8](https://mp.weixin.qq.com/s/22Ylncb3V95MGkMBRSrZoA) 中更新了 [compute()](https://api.flutter-io.cn/flutter/foundation/compute-constant.html) 实用函数，来利用 Isolate.exit()。如果你已经在使用 compute()，那么在升级到 Flutter 2.8 后，你将自动获得这些性能提升。

最后，我们还重新设计了 isolate 消息传递机制的实现方式，使得中小型消息的传递速度提高了大约 8 倍。发送消息的速度明显更快，而接收信息几乎总是在恒定的时间内完成。另外，我们扩展了 isolate 可以相互发送的对象种类，增加了对函数类型、闭包和堆栈跟踪对象的支持。请参阅 [SendPort.send()](https://api.dart.cn/stable/2.15.0/dart-isolate/SendPort/send.html) 的 API 文档了解详情。

要了解有关如何使用 isolate 的更多信息，请参阅我们为 Dart 2.15 添加的官方文档 [Dart 中的并发](https://dart.cn/guides/language/concurrency)，以及更多 [代码示例](https://github.com/dart-lang/samples/tree/master/isolates)。

## **新语言特性: 构造函数拆分**

在 Dart 中，你可以使用函数名称创建一个函数对象，该对象指向另一个对象的函数。在以下示例中，main() 方法的第二行演示了将 `g` 指向 `m.greet` 的语法:

```dart
class Greeter {
  final String name;
  Greeter(this.name);

  void greet(String who) {
    print('$name says: Hello $who!');
  }
}
void main() {
  final m = Greeter('Michael');
  final g = m.greet; // g holds a function pointer to m.greet.
  g('Leaf'); // Invokes and prints "Michael says: Hello Leaf!"
}
```

在使用 Dart 核心库时，这种函数指针 (也被称为函数*拆分*) 经常出现。下面是通过传递函数指针在 iterable 上调用 `foreach()` 的示例:

```dart
final m = Greeter('Michael');
['Lasse', 'Bob', 'Erik'].forEach(m.greet);
// Prints "Michael says: Hello Lasse!", "Michael says: Hello Bob!",
// "Michael says: Hello Erik!"
```

在之前的版本中，Dart SDK 不支持创建构造函数的拆分 (语言问题 [#216](https://github.com/dart-lang/language/issues/2))。这就有点烦人，因为在许多情况下，例如构建 Flutter 界面时，就需要用到构造函数的拆分。从 Dart 2.15 开始，我们支持这种语法。以下是构建包含三个 `Text` widget 的 `Column` widget 的示例，通过调用 `.map()` 将 Text 构造函数的拆分传递给 `Column` 的子项。

```dart
class FruitWidget extends StatelessWidget {
 @override
 Widget build(BuildContext context) {
   return Column(
       children: ['Apple', 'Orange'].map(Text.new).toList());
 }
}
```

`Text.new` 指 `Text` 类的默认构造函数。你也可以引用命名构造函数，例如 `.map(Text.rich)`。

## **相关语言变化**

在实现构造函数拆分时，我们也借此机会修复了现有的函数指针功能中的一些不一致问题。现在可以特化泛型方法来创建非泛型方法:

```dart
T id<T>(T value) => value;
var intId = id<int>; // New in 2.15.
int Function(int) intId = id; // Pre-2.15 workaround.
```

你甚至可以特化一个泛型函数对象来创建一个非泛型函数对象:

```dart
const fo = id; // Tear off `id`, creating a function object.
const c1 = fo<int>; // New in 2.15; error before.
```

最后，Dart 2.15 清理了涉及泛型的类型字面量:

```dart
var y = List; // Already supported.
var z = List<int>; // New in 2.15.
var z = typeOf<List<int>>(); // Pre-2.15 workaround.
```

**改进 dart:core 库中的枚举**

我们为 dart:core 库的枚举 API 添加了许多优化 (语言问题 [#1511](https://github.com/dart-lang/language/issues/1511))。现在你可以通过 `.name` 获取每个枚举值的 `String` 值:

```dart
enum MyEnum {
 one, two, three
}
void main() {
 print(MyEnum.one.name);  // Prints "one".
}
```

还可以按名称查找枚举值:

```dart
print(MyEnum.values.byName('two') == MyEnum.two);  // Prints "true".
```

最后，你可以获得所有名称-值对的映射:

```dart
final map = MyEnum.values.asNameMap();
print(map['three'] == MyEnum.three);  // Prints "true".
```

请参阅此 [Flutter PR](https://github.com/flutter/flutter/pull/94496/files) 查看这些新 API 的使用示例。

## **压缩指针**

Dart 2.15 增加了对压缩指针的支持，这样，如果只需要支持 32 位的地址空间 (最多 4 GB 内存)，则 64 位 SDK 可以使用更加节省空间的指针表示形式。压缩指针显著减少了内存占用，在对 Google Pay 应用的内部测试中，我们发现 Dart 堆的体积减少了大约 10%。

压缩指针意味着无法处理 4 GB 以上的可用 RAM，因此该功能只存在于 Dart SDK 的配置选项中，只能在构建 SDK 时由 Dart SDK 的嵌入器启用。Flutter SDK 2.8 版已为 Android 构建启用此配置，Flutter 团队正在考虑在后续版本中 [为 iOS 构建启用此配置](https://github.com/flutter/flutter/issues/94753)。

## **Dart SDK 中包含 Dart DevTools**

以往 Dart SDK 不提供调试和性能工具的 [DevTools 套件](https://dart.dev/tools/dart-devtools#using-devtools-with-a-command-line-app)，你需要单独下载。从 Dart 2.15 开始，下载 Dart SDK 时也会获取 DevTools，无需进一步的安装步骤。有关在 Dart 命令行应用中使用 DevTools 的更多信息，请参阅 [DevTools 文档](https://dart.dev/tools/dart-devtools#)。

## **面向 package 发布者的新 pub 功能**

Dart 2.15 SDK 在 `dart pub` 开发者命令和 [pub.dev](https://pub.dev) package repo 中还新增了两个功能。

首先，为 package 发布者新增了一个安全功能，用于检测发布者在 pub package 中意外发布 secret，例如 Cloud 或 CI 凭据。在了解到 GitHub repo 中 [每天都有数以千计的 secret 被泄露后](https://www.ndss-symposium.org/wp-content/uploads/2019/02/ndss2019_04B-3_Meli_paper.pdf)，我们便决定添加这个泄露检测功能。

泄露检测作为 `dart pub publish` 命令中的预发布验证的一部分运行。如果它在即将发布的文件中检测到潜在的 secret，`publish` 命令会退出，而不进行发布，并打印如下输出:

```console
Publishing my_package 1.0.0 to https://pub.dartlang.org:
Package validation found the following errors:
* line 1, column 1 of lib/key.pem: Potential leak of Private Key detected.
╷
1 │ ┌ - - -BEGIN PRIVATE KEY - - -
2 │ │ H0M6xpM2q+53wmsN/eYLdgtjgBd3DBmHtPilCkiFICXyaA8z9LkJ
3 │ └ - - -END PRIVATE KEY - - -
╵
* line 2, column 23 of lib/my_package.dart: Potential leak of Google OAuth Refresh Token detected.
╷
2 │ final refreshToken = "1//042ys8uoFwZrkCgYIARAAGAQSNwF-L9IrXmFYE-sfKefSpoCnyqEcsHX97Y90KY-p8TPYPPnY2IPgRXdy0QeVw7URuF5u9oUeIF0";
```

在极少数情况下，此项检测可能会出现误报，将你实际上打算发布的内容或文件标记为潜在泄露。在这些情况下，你可以将文件添加到 [许可名单](https://dart.cn/tools/pub/pubspec#false_secrets) 中。

其次，我们还为发布者添加了另一个功能: 撤销已发布的 package 版本。当发布了有问题的 package 版本时，我们通常的建议是发布一个小幅升级的新版本来修复意外问题。但在极少数情况下，例如你尚未修复这些问题，或是你在原打算只发布一个次要版本时意外发布了一个主要版本，那么你就可以使用新的 [package 撤销功能](https://dart.cn/tools/pub/publishing#retract)，作为最后的补救方法。此功能在 pub.dev 的管理界面中提供:

![](https://files.flutter-io.cn/posts/images/2021/12/Cr4RZ4.png)

在 package 版本被撤销后，pub 客户端在 `pub get` 或 `pub upgrade` 中将不再解析该版本。如果有开发者已经解析该撤销的版本 (并存在于他们的 `pubspec.lock` 文件中)，他们将在下次运行 `pub` 时看到警告:

```console
$ dart pub get
Resolving dependencies…
mypkg 0.0.181-buggy (retracted, 0.0.182-fixed available)
Got dependencies!
```

## **检测双向 Unicode 字符的安全性分析 (CVE-2021–22567)**

最近发现了一个涉及双向 Unicode 字符的通用编程语言漏洞 ([CVE-2021–42574](https://nvd.nist.gov/vuln/detail/CVE-2021-42574))。这个漏洞影响了大多数支持 Unicode 的现代编程语言。下面的 Dart 源代码演示了这个问题:

```dart
main() {
 final accessLevel = 'user';
 if (accessLevel == 'user .⁦// Check if admin⁩ ⁦') {
   print('You are a regular user.');
 } else {
   print('You are an admin.');
 }
}
```

你可能会认为该程序会打印出 *You are a regular user.*，但实际上它打印出的是 *You are an admin.*！通过使用包含双向 Unicode 字符的字符串，你就可能会造成这一漏洞。这些双向字符针对在同一行的文本，可以将文本的方向由从左到右更改为从右到左，反之亦然。双向字符文本在屏幕上的呈现与实际文本内容截然不同。你可以进一步查看此 [GitHub gist 示例](https://gist.github.com/mit-mit/7dda00ca6278ce7d2555f78d59d9e67b?h=1)。

针对此漏洞的缓解措施包括使用检测双向 Unicode 字符的工具 (编辑器、代码审查工具等)，以便开发者发现它们，并在知情的情况下使用这些字符。上面提到的 GitHub gist 文件查看器便是发现这些字符的工具的一个例子。

Dart 2.15 引入了进一步的缓解措施 ([Dart 安全建议 CVE-2021–22567](https://github.com/dart-lang/sdk/security/advisories/GHSA-8pcp-6qc9-rqmv))。现在，Dart 分析器会扫描双向 Unicode 字符，并标记对它们的任何使用:

```console
$ dart analyze
Analyzing cvetest...                   2.6s
info • bin/cvetest.dart:4:27 • The Unicode code point 'U+202E'
      changes the appearance of text from how it's interpreted
      by the compiler. Try removing the code point or using the
      Unicode escape sequence '\u202E'. •
      text_direction_code_point_in_literal
```

我们建议用 Unicode 转义序列替换这些字符，这样它们就可在任何文本编辑器或查看器中显示出来。或者，如果你确实正当使用了这些字符，你可以在使用这些字符的代码行之前添加覆盖语句来禁用警告:

```console
// ignore: text_direction_code_point_in_literal
```

## **使用第三方 pub 服务器时的 pub.dev 凭据漏洞 (CVE-2021–22568)**

我们也发布了第二个与 pub.dev 相关的 Dart 安全建议: [CVE-2021–22568](https://github.com/dart-lang/sdk/security/advisories/GHSA-r32f-vhjp-qhj7)。此建议针对可能将 package 发布到第三方 pub package 服务器 (例如私人或公司内部 package 服务器) 的 package 发布者。仅将 package 发布到公开 pub.dev repo (标准配置) 的开发者 **不受此漏洞的影响**。

如果你已经将 package 发布至第三方 repo，那么漏洞是: 用于在第三方 repo 进行身份验证的 OAuth2 临时 (一小时) 访问令牌可能被误用，以在公开 pub.dev repo 上进行身份验证。因此恶意的第三方 pub 服务器可能会使用访问令牌，在 pub.dev 上冒充你，并发布 package。如果你已经将 package 发布到一个不受信任的第三方 package repo，请考虑审查你的帐号在 pub.dev 公开 package repo 上的所有活动。我们推荐你使用 [pub.dev 活动日志](https://pub.dev/my-activity-log) 进行查看。

## **最后**

希望你喜欢 [已经推出](https://dart.cn/get-dart) 的 Dart 2.15 中的新功能。这是我们今年的最后一个版本，我们想借此机会表达我们对美妙的 Dart 生态系统的感谢。感谢大家的宝贵反馈，以及对我们一直以来的支持，感谢大家在过去的一年中在 [pub.dev](https://pub.dev) 上发布的数千个 package，它们丰富了我们的生态系统。我们迫切期待明年再次投入工作，我们计划在 2022 年推出很多激动人心的内容。预祝大家新年快乐，好好享受即将到来的假期吧！
