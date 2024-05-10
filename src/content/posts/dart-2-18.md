---
title: Dart 2.18 正式发布
toc: true
keywords: Dart正式版, Dart2.18
description: 互操作性增强、平台特定的网络组件、优化类型推断，以及空安全语言里程碑的近期更新。
image:
    path: https://files.flutter-io.cn/posts/flutter-cn/2022/dart-2-18/image3.png
    width: 2000
    height: 850
---
*文/ Michael Thomsen, Google Dart 团队产品经理，2022 年 8 月 31 日发表于 Dart 官方博客*

Dart 2.18 稳定版也随着 [Flutter 3.3 稳定版](/posts/whats-new-in-flutter-3-3) 一起发布，本次更新带来了 Dart 与 Objective-C \& Swift 互操作特性的预览版，以及根据这个特性构建的 iOS / macOS 网络组件的 package。新的 Dart 还包括泛型方法的类型推断优化、异步代码的性能提升、pub.dev 新的功能，以及对我们工具和核心库的一些调整。

文章最后我们也给出了最新的空安全迁移状态情况数据，以及最终完全实现 Dart 空安全特性路线图的一个重要更新，请务必读到最后。

![]({{site.flutter-files-cn}}/posts/flutter-cn/2022/dart-2-18/image3.png)

## Dart 与 Objective-C 和 Swift 互调

早在 2020 年的时候，我们发布了外部功能接口 (FFI) 用于调用原生 C 语言接口的预览，并在 2021 年的 Dart 2.12 中正式发布。自那时起，大量的 package 借助于 FFI 的优势与现有的原生 C 语言接口 API 集成，举一些例子，比如 `file_picker`、`printing`、`win32`、`objectbox`、`realm`、`isar`、`tflite_flutter` 以及 `dbus` 这些 package。

Dart 团队希望主流编程语言之间的互操作能够在所有 Dart 可以运行的平台上都支持，2.18 正式版达到了这个目标的下一个里程碑，现在，Dart 代码可以直接调用 Objective-C 和 Swift 代码了，主要用于在 macOS 和 iOS 平台调用 API。Dart 支持“全端调用”——从后端的命令行代码，再到前端的 Flutter 界面，你可以在任何应用中使用这种互操作机制。

这种全新机制源自于 Objective-C 和 Swift 代码可以通过 API 绑定机制用 C 语言代码来调用。Dart 的 [ffigen](https://pub.flutter-io.cn/packages/ffigen "Dart FFI 工具: ffigen 的 pub.dev 页面") 工具可以通过 API 头文件来创建这些绑定，接下来看一个例子。

## 在 Objective-C 中操作时区的例子

macOS 上有一个查询时区信息的 API，可以通过 [NSTimeZone](https://developer.apple.com/documentation/foundation/nstimezone?language%3Dobjc%5D&language=objc "NSTimeZone 类的 API 页面") 类来调用，开发者们可以通过这个 API 来查询用户为设备设定的时区和 UTC 时区偏移。

下面的示例 Objective-C 应用就调用了这个时区 API 来获得系统时区设定和 GMT 偏移。

```objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSTimeZone *timezone = [NSTimeZone systemTimeZone]; // Get current time zone.
        NSLog(@"Timezone name: %@", timezone.name);
        NSLog(@"Timezone offset GMT: %ld hours", timezone.secondsFromGMT/60/60);
    }
    return 0;
}
```

这个示例应用首先导入了 `Foundation.h` 头文件，它包含了 Apple 的基础库的 API 头文件。在接下来的方法体中，它调用了 NSTimeZone 的 `systemTimeZone` 方法，这个方法会返回一个实例化之后的 `NSTimeZone` 并包含了设备所设定的时区信息。

最后，这个应用会向控制台输出两行内容，包含时区名称和 UTC 的小时偏移量:

```console
Timezone name: Europe/Copenhagen
Timezone offset GMT: 2 hours
```

## 在 Dart 中操作时区的例子

让我们用 Dart 和 Objective-C 的互操作来重复一遍刚刚的实现。

首先通过 Dart 命令行创建一个应用:

`$ dart create timezones`

接着，在你的 `pubspec` 文件里加入 `ffigen` 的配置参数，这些配置会在 headers 里设定头文件路径，并且罗列出要生成的包装类 (wrapper) 的 Objective-C 接口:

```yaml
ffigen:
  name: TimeZoneLibrary
  language: objc
  output: "foundation_bindings.dart"
  exclude-all-by-default: true
  objc-interfaces:
    include:
      - "NSTimeZone"
  headers:
    entry-points:
      - "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Foundation.framework/
         Headers/NSTimeZone.h"
```

这会为 `NSTimeZone.h` 这个头文件配置 Objective-C 绑定，并且仅包含 `NSTimeZone` 接口中的 API，然后运行下面代码生成包装类:

`$ dart run ffigen`

这个命令会创建一个包含了各种 API 绑定的新 dart 文件 `foundation_bindings.dart`，调用这个文件之后，我们就可以来写 Dart 主方法 (`main`) 了，这个方法「镜像」了 Objective-C 的代码，如下:

```dart
void main(List<String> args) async {
  const dylibPath =
      '/System/Library/Frameworks/Foundation.framework/Versions/Current/Foundation';
  final lib = TimeZoneLibrary(DynamicLibrary.open(dylibPath));

  final timeZone = NSTimeZone.getLocalTimeZone(lib);
  if (timeZone != null) {
    print('Timezone name: ${timeZone.name}');
    print('Offset from GMT: ${timeZone.secondsFromGMT / 60 / 60} hours');
  }
}
```

这样就可以啦，这个新特性从 Dart 2.18 开始以实验性的支持开始提供，它增强了 Dart 的基础互操作特性，可以直接在 Dart 代码里或者通过 Flutter 插件来调用 macOS 和 iOS API 了。

我们非常欢迎开发者们的反馈，你可以通过我们的 GitHub Issue [提出反馈建议](https://github.com/dart-lang/sdk/issues/49673 "针对 Dart 和 Objective-C 和 Swift 的互操作提出反馈建议")，让我们知道哪些已然做的很好了、哪些地方尚有待改进，以及任何你遇到的问题。了解互操作性的更多信息，可以参阅 Dart 文档: [使用 package:ffigen 来进行与 Objective-C 和 Swift 的互操作](https://dart.cn/guides/libraries/objective-c-interop "Dart 文档: 使用 package:ffigen 来进行与 Objective-C 和 Swift 的互操作")。


## 平台特定的 http 库

Dart 自带一个通用的、可适用于多个平台的 `http` 库，使用这个库进行网络请求可免于考虑各个平台的不同情况。但有些时候，开发者们可能会想在某个平台使用这个平台的网络请求 API 来进行构建。

比如，Apple 的网络请求库 [NSURLSession](https://developer.apple.com/documentation/foundation/nsurlsession "NSURLSession 类的 API 页面") 可以限定仅在 Wi-Fi 下访问或需要 VPN 才能连接。为了支持这些用例，我们创建了一个新的网络请求的 package: `cupertino_http`，它基于上一节提到的新的 Objective-C 互操作，并从 Apple Foundation 库中网络请求库中「提取」了大量的 API。

## `cupertino_http` 示例

这个例子里，Flutter 应用的 HTTP 客户端在 macOS 和 iOS 上使用了 `cupertino_http`，在其他平台中仍使用普通的 `dart:io` 库:

```dart
late Client client;
if (Platform.isIOS || Platform.isMacOS) {
  final config = URLSessionConfiguration.ephemeralSessionConfiguration()
    ..allowsCellularAccess = false
    ..allowsExpensiveNetworkAccess = false;
  client = CupertinoClient.fromSessionConfiguration(config);
} else {
  client = Client(); // 使用基于 dart:io 的 HTTP 客户端
}
```

像这样的初始配置完成之后，应用就会在不同平台上执行特定的网络请求，比如现在的 `get()` 请求类似于下面这样:

```dart
final response = await get(
  Uri.https(
    'www.googleapis.com',
    '/books/v1/volumes',
    {'q': 'HTTP', 'maxResults': '40', 'printType': 'books'},
  ),
);
```

当无法使用通用的接口时，你可以通过 `cupertino_http` 来调用 Apple 的网络请求 API:

```dart
final session = URLSession.sessionWithConfiguration(
    URLSessionConfiguration.backgroundSession('com.example.bgdownload'),
    onFinishedDownloading: (s, t, fileUri) {
      actualContent = File.fromUri(fileUri).readAsStringSync();
    });

final task = session.downloadTaskWithRequest(
    URLRequest.fromUrl(Uri.https(...))
    ..resume();
```

## 多平台应用中使用特定平台的网络

我们的设计目标仍旧是尽可能保持应用的多平台通用性，因此我们为 `http` API 保留了多平台通用的基础网络请求的等操作，并且可以通过配置文件在不同平台配置网络请求库。开发者们可以使用 `package:http` 的 Client API 来减少编写平台特定的代码，它可以按照平台进行配置并以独立于平台的方式使用。

Dart 2.18 对 `package:http` [Client API](https://pub.flutter-io.cn/documentation/http/latest/http/Client-class.html "Client API 文档页面") 提供了特定平台 http 库的实验性支持:

* 在 macOS / iOS 使用基于 [NSURLSession](https://developer.apple.com/documentation/foundation/nsurlsession "NSURLSession 类的 API 页面")
* 在 Android 上使用基于 [Cronet](https://developer.android.google.cn/guide/topics/connectivity/cronet "Android 开发者文档: 使用 Cronet 执行网络操作")，Cronet 是一个在 Android 上非常流行的网络请求库

将一个通用的 Client API 与几个不同的网络请求实现结合在一起可以让你获得两方面的好处，既可以使用平台特定的行为，同时也仍然在维护同一组共享的网络请求资源。我们希望 [在 GitHub 上收到大家的反馈](https://github.com/dart-lang/http/issues/764 "针对「在多平台应用中使用特定平台的网络」的反馈连接")。

## 增强类型推断

Dart 使用了许多通用方法，试想这个可以将集合元素转换为一个单一值的 [fold](https://api.dart.cn/stable/2.17.6/dart-core/Iterable/fold.html "Dart fold 类的 API 页面") 方法。下面是一个对集合中的数字进行求和的例子：

```dart
List<int> numbers = [1, 2, 3];
final sum = numbers.fold(0, (x, y) => x + y);
print(‘The sum of $numbers is $sum’);
```

在 Dart 2.17 之前这个方法会返回一个类型错误：

```console
line 2 • The operator ‘+’ can’t be unconditionally invoked because the receiver can be ‘null’.
```

Dart 无法结合多个参数之间的信息进行类型推断。这导致了 `x` 类型具有不确定性。要纠正这个潜在的错误，你需要指定类型：

`final sum = numbers.fold(0, (int x, int y) => x + y)`

Dart 2.18 增强了类型推断。在前面样例中，Dart 将会进行静态分析，并推断出 x 和 y 都是非空的整型。这个改动能够让你在保留强类型推断带来的稳健性的同时编写出更加简洁的 Dart 代码。

## 异步函数性能增强

这个版本的 Dart 优化了 Dart VM 执行 `async` 以及 `async*`/`sync*` 的方式。这会缩减代码体积：在 Google 的两个大型应用上，我们看到 AOT snapshot 产物大小减少大约了 10% 左右。同时在我们的微基准测试上也反映出了性能的提升。

VM 中还包含了一些额外的小的行为变更，了解更多请查看 [发行注记](https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md%23dart-vm "Dart 编程语言发行注记")。

## Pub.dev 网站的改进

结合 2.18 版本发布的改动，我们在 `pub.dev` 这个 package 生态网站上也带来了两个新的改动。

通常情况下，个人的 package 开发者会使用业余时间维护并发布新的 package，这可能会耗费他们大量的时间和资源。为方便其他使用者进行赞助，我们在 `pubspec` 中支持了全新的 `funding` 标签，package 开发者可以用它列出一个或多个赞助其持续开发的链接，这些链接会展示在 `pub.dev` 网站的侧栏中。

![]({{site.flutter-files-cn}}/posts/flutter-cn/2022/dart-2-18/image2.png)

了解更多请访问 [pubspec 文档](https://dart.cn/tools/pub/pubspec%23funding "pubspec 规范文档中关于 funding 标签的部分")。

此外，我们也希望促进开源 package 的丰富生态，为了突出这一点，`pub.dev` 上的自动评分系统会为使用了 [OSI 批准的许可证](https://opensource.org/licenses "OSI 批准的许可证列表") 的 package 额外奖励 10 分。

## 一些破坏性改动

Dart 特别注重简单性和可学习性，因此在增加新功能时，我们也一直小心翼翼。保持简单的一种做法是移除很少被使用或已经有更好的替代品的旧功能和 API。Dart 2.18 清理了这类条目，并包含少量的破坏性改动：

* 我们在 2020 年 10 月添加了统一的 `dart` CLI 开发者工具。在 2.18 中，我们完成了此过渡。此版本移除了最后两个已弃用的命令行工具: `dart2js` (更换为使用 `dart compile js`) 和 `dartanalyzer` (更换为使用 `dart analyze`)。
* 随着语言版本控制的引入，`pub` 命令会生成一个新的解析文件: `.dart_tool/package_config.json` (之前使用的 `.packages` 格式的文件不能包含版本)，现在我们已经停止使用 `.packages` 文件了，如果你有任何 `.packages` 文件，你可以删除它们。
* 非继承自 `Object` 的类不能再作为 Mixin 被使用 (破坏性改动 [#48167](https://github.com/dart-lang/sdk/issues/48167 "破坏性改动 #48167"))，这种行为从未有意提倡。
* `dart:io` 中 `RedirectException` 的 `uri` 属性已更改为可为空 (nullable) (破坏性改动 [#49045](https://github.com/dart-lang/sdk/issues/49045 "破坏性改动 #49045"))。
* `dart:io` 网络请求 API 中遵循 `SCREAMING_SNAKE` 约定的常量已被移除 (破坏性改动 [#34218](https://github.com/dart-lang/sdk/issues/34218 "破坏性改动 #34218"))，请改用相应的 lowerCamelCase 常量。
* Dart VM 在退出时不再恢复初始终端设置，更改标准输入设置 `lineMode` 和 `echoMode` 的程序现在负责在程序退出时恢复设置 (破坏性改动 [#45630](https://github.com/dart-lang/sdk/issues/45630 "破坏性改动 #45630"))。

## 空安全更新

空安全自 2020 年 11 月 Beta 版发布、2021 年 3 月随着 [Dart 2.12](/posts/announcing-dart-2-12) 正式推出以来，我们很高兴看到空安全已被广泛使用。

首先，`pub.dev` 上大部分流行 package 的开发者都已迁移到了空安全。我们的分析表明，最常用的 package 前 250 已全部支持空安全，前 1,000 中也有 98% 已经支持空安全。

其次，大部分开发者已经在具有完全空安全性的代码库中开发。这一点至关重要，因为在将所有代码和所有依赖项 (包括传递性) 迁移之前，[Dart 健全的空安全性](https://dart.cn/null-safety/understanding-null-safety "Dart 健全的空安全性") 并不会发挥作用，我们正在通过 `flutter run` 命令的遥测来跟踪这一点。

下图展示了 `flutter run` 命令执行中非健全 (Unsound) 和健全 (Sound) 的空安全的对比情况。在引入空安全之前，两者都为零。随后非健全的空安全快速增长，此时应用开始逐渐迁移到空安全，开发者先进行了部分迁移，但有些部分仍然需要迁移。一段时间过后，我们可以看到健全的空安全曲线稳定增长，到上月底，与非健全的空安全相比，健全的空安全执行量多出了四倍。我们希望在接下来的几个季度中，我们将看到健全空安全到达 100%！

![]({{site.flutter-files-cn}}/posts/flutter-cn/2022/dart-2-18/image1.png)

## 重要的空安全路线图更新

同时支持非健全和健全的空安全性不可避免地会增加开销和复杂性。

首先，Dart 开发者需要学习和理解这两种模式。每当阅读一段 Dart 代码时，都需要 [检查语言版本](https://dart.cn/guides/language/evolution%23language-versioning "Dart 文档: 语言版本控制")。

其次，在编译器和运行时同时支持这两种模式也会减慢 Dart SDK 支持新功能的发展。

>基于非健全空安全的开销和上一节中提到的非常可观的统计数据，我们的目标是过渡到仅支持健全的空安全，并停止支持非空安全和非健全的空安全模式，我们暂时将其定于 2023 年年中发布。

这将意味着停止对 Dart 2.11 及更早版本的支持。具有 SDK 约束且下限小于 2.12 的 `pubspec` 将不再在 Dart 3 及更高版本中解析。在包含语言标记的源代码中，如果设置为小于 2.12 (例如 `//@dart=2.9`) 则会失败。

如果你已迁移到健全的空安全，你的代码将在 Dart 3 中以完全的空安全工作。如果你还没有，我们的建议是请立即着手开始迁移。了解有关这些更改的更多信息，请参阅 [这个议题](https://github.com/dart-lang/sdk/issues/49530 "Dart 编程语言议题 #49530: Dart 3 开始将停止支持非空安全")。

## 总结

与 Objective-C 和 Swift 等互操作、网络请求库、Dart 编程语言的类型推断以及 pub.dev 的更新等已经正式可用。开始体验，请下载最新的 Dart 2.18 正式版，或者直接在 Flutter 3.3 中体验，也可以直接在 DartPad 中体验 Dart 编程语言。

最后就是空安全的迁移，请即刻着手迁移，与我们共同构建和体验拥有健全空安全特性的 Dart 编程语言！

> **原文链接**: [Dart 官方博客](https://medium.com/dartlang/dart-2-18-f4b3101f146c)
>
> **本地化**: CFUG 团队: @chenglu、@Vadaski、@MeandNi、@Realank
>
> **中文链接**: [flutter.cn/posts/dart-2-18](https://flutter.cn/posts/dart-2-18)