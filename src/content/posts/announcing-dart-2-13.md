---
title: Dart 2.13 版现已发布
toc: true
---

![]({{site.flutter-files-cn}}posts/images/2021/05/mnqClZ.png)

*作者 / Kevin Moore & Michael Thomsen*

Dart 2.13 版现已发布，其中新增了*类型别名*功能，这是目前用户呼声第二高的语言功能。Dart 2.13 还改进了 Dart FFI 以及更好的性能，并且我们还为 Dart 提供了新的官方镜像。本文将为你奉上 2.12 版中推出的空安全功能的最新信息，介绍 2.13 版本的新特性，以及 Docker 和 Google Cloud 对 Dart 后端支持的新消息。另外，还会预告在后续版本中的其他变化。

## **空安全更新**

在今年 3 月份发布的 [Dart 2.12](https://flutter.cn/posts/announcing-dart-2-12) 中，我们推出了 [健全的空安](https://dart.cn/null-safety) 全功能。空安全可谓是 Dart 最近推出的一项重要功能，旨在帮助你避免空值错误 (这类错误经常难以发现)，有效提升工作效率。我们希望发布 package 的开发者能够及时跟进这项发布，更新 pub.dev 上分享的 package 以支持空安全。

我们极其欣喜地看到，在发布后的短短几个月内，空安全就已被广泛采用，目前 **pub.dev 上前 500 个最受欢迎的 package 中，93% 的 package 已经支持空安全。**在此，谨向如此迅速跟进的所有 package 开发者致以最诚挚的谢意，感谢大家帮助推动整个生态系统不断向前！

有了这么多 package 支持空安全，你就可以开始考虑着手将自己的应用迁移到使用空安全的环境。要开始迁移，请首先使用 `dart pub outdated` 检查应用的依赖项。详细步骤，请参阅 [空安全迁移指南](https://dart.cn/null-safety/migration-guide#step1-wait)。我们还调整了 `dart create` 和 `flutter create` 模板，现在它们在新的应用程序和 package 中默认启用空安全。

## **推出类型别名功能**

类型别名是 2.13 版中新增的语言功能，也是广大开发者翘首以盼的功能，曾在语言问题的反馈中高居 [第二位](https://github.com/dart-lang/language/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc)。有了这一功能，开发者就能够创建函数类型的别名，但不能创建其他任何类型。

利用类型别名你可以为任何现有的类型创建新的名称，然后将新创建的名称用在原始类型可以出现的任何地方。创建新名称并不会真的定义一个新类型，只不过是引入一个简短的别名而已。该别名甚至能通过类型等同测试:

```dart
typedef Integer = int;

void main() {
  print(int == Integer); // true
}
```

那么，类型别名可以怎么用？一种常见的用法是给某类型指定一个更短或更具描述性的名称，以便你的代码更易于理解和维护。

比如，给 JSON 类型指定别名就是种不错的用法 (此示例由 GitHub 用户 [Levi-Lesches](https://github.com/Levi-Lesches) 提供，特此感谢)。在下列示例中，我们可以定义一个新的类型别名 `Json`，它将一个 JSON 文档描述为一个 map，其键为 `String`，值为任意值 (使用动态类型)。这样，当我们定义名为 `fromJson` 的构造函数和 json get函数时，就能使用该 Json 类型别名。

```dart
typedef Json = Map<String, dynamic>;

class User {
  final String name;
  final int age;

  User.fromJson(Json json) : 
    name = json['name'],
    age = json['age'];

  Json get json => {
    'name': name, 
    'age': age,
  };
}
```

你也可以对指代某个类的类型别名调用构造函数，比如以下示例就非常合规:

```dart
main() {
  var j = Json();
  j['name'] = 'Michael';
}
```

通过使用类型别名来指代复杂类型，可以让读者更容易理解你代码的不变量。例如，以下代码定义了一个类型别名来描述键值为泛型类型 X、值为类型 `List<X>` 的映射。如果给该类型指定一个具有单一类型参数的名称，映射的常规结构在代码读者眼中会变得更为清晰。

```dart
typedef MapToList<X> = Map<X, List<X>>;
void main() {
  MapToList<int> m = {};
  m[7] = [7]; // OK
  m[8] = [2, 2, 2]; // OK
  for (var x in m.keys) {
    print('$x --> ${m[x]}');
  }
}

=>

7 --> [7]
8 --> [2, 2, 2]
```

如果你尝试使用不匹配的类型，将出现分析错误:

```dart
m[42] = ['The', 'meaning', 'of', 'life']; 


=>

The element type 'String' can't be assigned to the list type 'int'.
```

你甚至可以使用类型别名来重命名公共库中的类。假设现在公共库中有一个 `PoorlyNamedClass` 类，你想要将它重命名为 `BetterNamedClass`。如果你只是重命名该类，那么你的 API 客户那边将会出现突发编译错误。而使用类型别名，则不会出现这一问题，你可以随意重命名，只不过要先为旧的类名称定义一个新的类型别名，再给旧名称添加几行 `@Deprecated` 注解。这样，使用 `PoorlyNamedClass` 的代码虽然会出现警告，但仍可继续编译并照旧正常运行，让用户有时间升级其代码。

```dart
mylibrary.dart:

class BetterNamedClass {}

@Deprecated('Use BetterNamedClass instead')
typedef PoorlyNamedClass = BetterNamedClass;

main.dart


import 'mylibrary.dart';


void main() {
  PoorlyNamedClass p;
}

=>

'PoorlyNamedClass' is deprecated and shouldn't be used. Use BetterNamedClass instead.
```

下面介绍实现 `BetterNamedClass` 和弃用 `PoorlyNamedClass` 的方法 (在一个名为 `mylibrary.dart` 的文件中)。

```dart
class BetterNamedClass {...}

@Deprecated('Use BetterNamedClass instead')
typedef PoorlyNamedClass = BetterNamedClass;
```

下面是尝试使用 `PoorlyNamedClass` 时会发生的情况:

```dart
import 'mylibrary.dart';
void main() {
 PoorlyNamedClass p;
}
=>
'PoorlyNamedClass' is deprecated and shouldn't be used. Use BetterNamedClass instead.
```

类型别名功能从 Dart 2.13 版开始即可使用，要启用此功能，需要将你 pubspec 中版本较低的 Dart SDK 约束设置为最低 2.13 版，如下所示:

```yaml
environment:
  sdk: ">=2.13.0 <3.0.0"
```

此功能支持向后兼容，这要归功于 [语言的版本管理](https://dart.cn/guides/language/evolution#language-versioning)。也就是说，SDK 约束版本低于 2.13 的 package 可以安全地引用 2.13 版 package 中定义的类型别名，尽管 2.13 版之前的 package 不能定义其自己的类型别名。

## **Dart 2.13 FFI 的变化**

我们还在 Dart FFI (这是用来调用 C 语言代码的互操作机制) 中引入了一些新功能。

首先，FFI 现在支持包含内联数组 ([#35763](https://github.com/dart-lang/sdk/issues/35763)) 的结构。假设某 C 语言结构具有如下内联数组:

```dart
struct MyStruct {
  uint8_t arr[8];
}
```

现在，只需将包含一个类型实参的元素类型指定给 `Array`，即可直接将该结构体封装在 Dart 中，如下所示:

```dart
class StructInlineArray extends Struct {
  @Array(8)
  external Array<Uint8> arr;
}
```

其次，FFI 现在支持封装结构体 ([#38158](https://github.com/dart-lang/sdk/issues/38158))。结构体通常都被放置在内存中，以便其位于地址边界内的成员能够被 CPU 更轻松地存取。使用 [封装结构体](http://www.catb.org/esr/structure-packing/) 时，为了减少整体内存占用量，经常会以平台特有的方式忽略一些填充字节。借助新的 `@Packed(<alignment>)` 注解，你可以轻松指定填充字节。例如，下列代码创建的结构体就指定其在内存中时的字节对齐为 4。

```dart
@Packed(4)
class TASKDIALOGCONFIG extends Struct {
  @Uint32()
  external int cbSize;
  @IntPtr()
  external int hwndParent;
  @IntPtr()
  external int hInstance;
  @Uint32()
  external int dwFlags;
…
}
```

## **Dart 2.13 在性能方面的提升**

我们一直在不断努力降低 Dart 代码的应用体量和内存占用量。在大型 Flutter 应用中，经过 AOT 编译 Dart 程序的元数据的内部结构可能要占用非常可观的内存。这些元数据的存在大多是为了实现热重载、交互式调试，以及格式化可读堆栈轨迹等功能，这些功能在需要部署的应用中从不会用到。过去几年来，我们一直在重构 Dart 原生运行时环境，以便尽可能多地消除这种开销。其中一些改进适用于所有以版本模式构建的 Flutter 应用，而有些则需要使用 [--split-debug-info](https://docs.flutter.cn/perf/app-size#reducing-app-size) 标志将 AOT 编译应用中的调试信息拆分出来，从而放弃可读的堆栈轨迹。

Dart 2.13 在内存消耗上取得了很大的进步，在使用 `--split-debug-info` 时，程序元数据占用的空间量降幅显著。例如，Flutter Gallery 的空间占用降幅达到 30%: 在 --split-debug-info 模式下，程序元数据在 Dart 2.12 中要占用 5.7Mb，而在 Dart 2.13 中仅需 3.7Mb。以 Flutter Gallery 应用为例，在 Android 平台上，包含调试信息的发布 APK 大小为 112.4MB，不包含的情况下大小为 106.7MB (总体积减少了 5%)。该 APK 中包含了大量的资源。仅从 APK 内部的元数据体积来说，从 Dart 2.12 平台上的 5.7MB 减少至 Dart 2.13 平台上的 3.7MB (减少了35%！)。

如果对你来说应用体量和内存占用量比较重要，可以使用 [--split-debug-info](https://docs.flutter.cn/perf/app-size#reducing-app-size) 标志省略调试信息。请注意，一旦这么做，你需要使用 [symbolize 命令](https://docs.flutter.cn/deployment/obfuscate#reading-an-obfuscated-stack-trace) 来重新使堆栈轨迹可读。

## **Dart 官方 Docker 镜像发布以及 Cloud 支持**

Dart 现在在 [官方镜像](https://docs.docker.com/docker-hub/official_images/) 中可用，虽然 Dart 早已提供了 Docker 镜像，但为了遵循最佳实践，这些 [新的 Dart 镜像](https://hub.docker.com/_/dart) 是由 Docker 进行测试和验证的。它们还支持 AOT 编译，可以大大减少构建容器的大小，并且可以在容器环境中提升部署速度——如 [Cloud Run](https://cloud.google.com/run)。

虽然 Dart 始终专注于使 Flutter 等应用框架在每个屏幕上构建出色的界面，但我们意识到，大多数用户体验的背后至少有一个托管服务。通过让 Dart 轻松构建后端服务来支持全栈体验，开发者可以使用与前端 widget 相同的语言和业务逻辑，将他们的应用扩展到云端。

通常来说，将 Dart 用于 Flutter 应用程序的后端，特别符合 Google 无服务器管理平台 Cloud Run 的简单性和可扩展性。这也包括零扩展，意味着当你的后端不处理任何请求时，就不会产生成本。我们与 Google Cloud 团队合作，提供 [Dart 的函数框架](https://pub.dev/packages/functions_framework)，这是一个 packages、工具和实例的集合，使开发者们能够轻松地编写 Dart 函数，以取代处理 HTTP 请求和 CloudEvents 的完整服务器部署。

你可以查看我们的 [Google Cloud 官方文档](https://dart.cn/server/google-cloud) 以便开始使用。

## **后续更新预告**

在接下来的版本中，还会有一些令人激动的改变。和以往一样，你可以使用 [language funnel](https://github.com/dart-lang/language/projects/1) 追踪器留意我们的后续工作。

我们一直努力改进的一个方面是，为 Dart 和 Flutter 定义一组新的 canonical lint。lint 是配置 Dart [静态分析](https://dart.cn//guides/language/analysis-options) 的一种高效方式，但由于可能有成百上千个 lint 要启用或禁用，有时可能会难以抉择。眼下，我们正打算定义两组要在 Dart 和 Flutter 项目中默认应用的 canonical lint。预计这两组 lint 将在下一个稳定版中默认启用。如果你想要提前预览，请查看 [lints](https://pub.dev/packages/lints) 和 [flutter_lints](https://pub.dev/packages/flutter_lints) 这两个 package。

最后，如果你深度嵌套了 Dart VM 运行时环境，请注意，我们打算弃用其现有的机制。我们将用一个基于 Dart FFI 的更快、更灵活的模型取代它 (请参阅追踪问题 [#45451](https://github.com/dart-lang/sdk/issues/45451))。

## **Dart 2.13 版现已发布**

Dart 2.13 版现已在 [Dart 2.13](https://dart.cn/get-dart) 和 [Flutter 2.2](https://dart.cn/get-dart) SDK 中推出，此版本新增了类型别名功能，还改进了 FFI。

如果你一直在等待将自己的依赖项迁移到空安全环境的时机，不妨使用 [dart pub outdated](https://dart.cn/null-safety/migration-guide) 再次检查一下。目前，前 500 个最受欢迎的 package 中，93% 的 package 都已迁移，现在没准就是你迁移的好时机。在此，谨向那些已经迁移的开发者致以最衷心的感谢！

欢迎试用本指南中介绍的新功能和改进后的功能，并将你使用后的感想告诉我们。
