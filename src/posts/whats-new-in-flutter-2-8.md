---
title: Flutter 2.8 更新详解
toc: true
---

北半球的冬意已至，黄叶与气温均随风而落。年终的最后一个 Flutter 稳定版本 [已悄然来到你的面前](https://mp.weixin.qq.com/s/mr9F5VSRSOiV0QVxOYyT9g)。让我们向 **Flutter 2.8** 打声招呼～

本次更新包含了 **207 位贡献者和 178 位审核者** 的辛勤劳作，所有人共同产出了 **2424 个 PR**，关闭了 **2976 个 issue**。在此特别感谢本次发布中最突出的社区贡献者: 来自 VGV 的 Flutter 开发工程师 Bartosz Selwesiuk，他为 Web 平台的 camera 插件并提交了 23 个 PR。

以上的所有产出让 Flutter 引擎和开发者工具 (DevTools) 都有了非常显著的性能提升，同时带来的还有 Google 移动端广告 SDK Flutter 版本的稳定版发布、一系列针对 Firebase 的新功能和优化、Flutter WebView 3.0、新的 Flutter Favorite package、向桌面端稳定版迈出的一大步，以及支持更多 package 的新版 DartPad。让我们一起来看看吧！

## 性能提升

Flutter 的首要目标是一如既往地保证其质量。我们花费了大量时间以确保 Flutter 在多种多样的设备上都能流畅且稳定地运行。

### 应用启动性能

本次更新优化了应用启动的延迟。我们在拥有一百万行以上的代码量的 GPay 应用上进行了测试，以确保改动在实际生产的应用上有效。这些改动**将 GPay 在低端 Android 设备上启动的时间减少了约 50%**、**高端设备上减少了约 10%**。

我们对 Flutter 调用 Dart VM 的 GC 策略也做了一些改进，以此避免在程序启动期间出现不合时宜的 GC。例如，在 Android 设备上渲染出第一帧前，Flutter [仅在 TRIM_LEVEL_RUNNING_CRITYCAL 及高于其等级的信号出现时，通知 Dart VM 有内存压力](https://github.com/flutter/flutter/issues/90551)。在本地测试中，**低端 Android 设备的初始帧出现间隔时间最多减少了约 300ms**。

在先前的 Flutter 版本中，[出于谨慎考虑](https://github.com/flutter/engine/pull/29145#pullrequestreview-778935616)，在创建 PlatformView 时会阻塞平台线程。[在经过仔细的推理和测试后](https://github.com/flutter/flutter/issues/91711)，我们删除了部分序列化的步骤，使得 GPay **在低端设备上的启动时间至少减少了 100ms**。

长久以来，在初始化首个 Dart isolate 前初始化默认的字体管理器会引入人为的延迟。由于它是首要的延迟瓶颈，所以 [将默认字体管理器的初始化延迟](https://github.com/flutter/engine/pull/29291) 到与首个 Dart isolate 同时运行，降低了启动的延迟，并让上述的所有启动优化的表现更加明显。

### 应用内存

由于 Flutter 会尽可能快地加载 Dart VM 的服务 isolate，并将其和绑定在应用内的 AOT 代码一并加载到内存中，这会导致 Flutter 开发人员在部分内存 [有限制的设备上难以追踪内存指标](https://github.com/flutter/flutter/issues/91382)。在 Flutter 2.8 版本中，Android 设备上 Dart VM 的服务 isolate [已被拆分至单独的 bundle 中](https://github.com/flutter/engine/pull/29245)，可以单独加载，减少了在其加载前约 40MB 的内存使用。原本 Dart VM 向操作系统发送 AOT 程序的内存用量的通知，已转由一个无需多次读取的文件支持，后续的内存占用量进一步减少了约 10%。因此，先前保存了文件数据拷贝的内存可以回收并用于其他用途。

### 性能分析

某些场景下，开发者希望能同时看到 Flutter 和 Android 的性能追踪事件，又或者是在生产模式下查看追踪事件来更好地了解应用的性能问题。为了这一需求，Flutter 2.8 现在可以选择在应用启动后，将性能追踪事件发送至 Android 的事件记录器，在生产模式下也同样如此。

![Flutter 性能追踪事件现在显示在 Android systrace 记录工具中（底部）](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flutter-trace-event.png)

此外，一些开发人员想要更多的关于光栅缓存行为的性能跟踪信息，以减少制作动画效果时的卡顿，这允许 Flutter 快速地对昂贵的、重复使用的图片进行复用而不是重新绘制。性能跟踪中的新的 **流事件** 让开发人员可以跟踪光栅缓存图片的生命周期。

### Flutter 开发者工具

对于调试性能问题，新版的开发者工具 (DevTools) 添加了一个新的「增强跟踪」功能，用来帮助开发者诊断消耗较大的构建、布局和绘制操作引起的 UI 卡顿。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/enable-trace-feat.png)

启用任何一个追踪功能后，时间轴中将视情况展示 Widget 的构建、RenderObject 布局和 RenderObject 绘制的事件。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/render-draw-event.png)

此外，新版的开发者工具也增加了应用启动性能的分析支持。该配置文件包含了从 Dart VM 初始化到第一帧 Flutter 渲染的 CPU 样本。在你按下「Profile app start up」按钮并加载应用启动配置文件后，你将看到为配置文件选择了「AppStartUp」标签。你还可以通过在可用用户标签列表中选择此用户标签过滤器（如果存在）来加载应用启动配置文件。选择此标签会显示你的应用启动的个人资料数据。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/profile-app-start.png)

### Web 平台的平台视图 (PlatformView)

不仅仅是 Android 和 iOS 平台获得了性能提升，本次发布同时包含了对 Flutter Web 平台视图的性能优化。平台视图是从宿主平台向 Flutter 嵌入 UI 组件的媒介。Flutter Web 使用 [HtmlElementView](https://api.flutter-io.cn/flutter/widgets/HtmlElementView-class.html) widget 实现了这一功能，让你能在 Flutter Web 应用中嵌入 HTML 元素。如果你正在使用 `google_maps_flutter` 插件或 `video_player` 插件的 Web 版本，或者你正在遵循 Flutter 团队关于 [如何优化网络上显示图像](https://docs.flutter.cn/development/platform-integration/web-images#use-img-in-a-platform-view) 的建议，那说明你已经在使用平台视图了。

在之前版本的 Flutter 中，嵌入平台视图会创建一个新的 canvas，每嵌入一个平台视图都会新增一个 canvas。
创建额外的 canvas 是十分消耗性能的操作，因为每个 canvas 的大小都与整个窗口相等。在 Flutter 2.8 中，将 [复用为先前的平台视图创建的 canvas](https://github.com/flutter/engine/pull/28087)。因此，你不会在应用的整个生命周期内产生每秒 60 倍的成本，而是只有一次创建的成本。这意味着你可以在 Web 应用中拥有多个 `HtmlElementView` 实例而不会降低性能，同时还可以减少使用平台视图时的滚动卡顿。

## 生态

Flutter 不仅仅是框架、引擎和工具——pub.dev 上现有超过 2w 个与 Flutter 兼容的包和插件，而且每天都在增加。Flutter 开发人员大量的日常操作也是庞大的生态系统的一部分，所以让我们来看看自上一个版本以来 Flutter 生态系统中有什么改变。

### 适用于 Flutter 广告的 Google 广告

首先也是最重要的是，[Google Mobile SDK for Flutter 已于 11 月正式发布](https://medium.com/flutter/announcing-general-availability-for-the-google-mobile-ads-sdk-for-flutter-574e51ea6783)。此版本支持 5 种广告格式，集成了 AdMob 和 Ad Manager 支持，并包含一个新的中转功能的测试版，可以帮助你优化广告展现的效果。有关将 Google Ads 集成到 Flutter 应用以及其他货币化选项的更多信息，请查看 [Flutter 网站上的页面](https://flutter.cn/monetization)。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/admob-sdk-flutter-ga.png)

### WebView 3.0

这次 Flutter 附带的另一个新版本是 [webview_flutter 插件](https://pub.flutter-io.cn/packages/webview_flutter) 的 3.0 版本。因为新功能的数量增加，我们提升了主要版本号，但也因为 Web 视图在 Android 上的工作方式可能发生了重大变化。在之前的 `webview_flutter` 版本中，Hybrid composition 已经可用，但不是默认的。而现在它修复了先前默认以虚拟显示模式运行的许多问题。
根据用户反馈和我们的问题跟踪，我们认为是时候让 Hybrid composition 成为默认设置了。此外，`webview_flutter` 还增加了一些呼声极高的功能: 

* 支持使用 POST 和 GET 来加载内容
* 加载文件或字符串内容为 HTML
* 支持透明背景
* 在加载内容前设置 Cookies

此外，在 3.0 版本中，`webview_flutter` 为新平台提供了初步支持: Flutter Web。已经有很多人要求能够在 Flutter Web 应用中托管 Web 视图，这允许开发者利用单个源代码库构建移动或 Web 应用。在 Flutter Web 应用中托管 Web 视图是什么样的？从编写代码的角度来看，其实是一样的: 

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_web/webview_flutter_web.dart';

void main() {
  runApp(const MaterialApp(home: HomePage()));
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();

    // required while web support is in preview
    if (kIsWeb) WebView.platform = WebWebViewPlatform();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Flutter WebView example')),
    body: const WebView(initialUrl: 'https://flutter.dev'),
  ;
}
```

在 Flutter Web 上运行时，它会按你的预期工作: 

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/webview_flutter-demo-in-2-8.gif)

请注意，当前 `webview_flutter` 的 web 实现有许多限制，因为它是使用 iframe 构建的，
iframe 仅支持简单的 URL 加载，无法控制加载的内容或与加载的内容交互。
但是，由于需求呼声太高，我们决定将 `webview_flutter_web` 作为未经认可的插件提供。
如果你想尝试一下，请将以下内容添加到你的 `pubspec.yaml` 中: 

```yaml
dependencies:
  webview_flutter: ^3.0.0
  webview_flutter_web: ^0.1.0 # 显式依赖未经认可的插件
```

如果你对 `webview_flutter` v3.0 有任何反馈，无论是否是关于 Web 平台，请 [将问题提交到 Flutter 仓库中](https://github.com/flutter/flutter/issues)。此外，如果你之前没有使用过 webview 或者想复习一下，请查看 [新的 webview codelab](https://codelabs.developers.google.com/codelabs/flutter-webview)，它将带你逐步完成在 Flutter 应用中托管 Web 内容的过程。

### Flutter Favorites 项目

Flutter 生态系统委员会再次召开会议，将以下 package 指定为 Flutter Favorite 的 package: 

* 新路由 API (又名 Navigator 2) 的三个自定义路由 package: [beamer](https://pub.flutter-io.cn/packages/beamer)、[routemaster](https://pub.flutter-io.cn/packages/routemaster) 和 [go_router](https://pub.flutter-io.cn/packages/go_router)；
* [drift](https://pub.flutter-io.cn/packages/drift): 对 Flutter 和 Dart 已经功能强大且流行的响应式持久性库的重命名，基于 sqlite 构建；
* [freezed](https://pub.flutter-io.cn/packages/freezed): 一个 Dart「语言补丁」，为定义模型、克隆对象、模式匹配等提供简单的语法；
* [dart_code_metrics](https://pub.flutter-io.cn/packages/dart_code_metrics): 一个帮助你分析和提高代码质量的静态分析工具；
* 以及有着漂亮界面的 package: [flex_color_scheme](https://pub.flutter-io.cn/packages/flex_color_scheme)、[flutter_svg](https://pub.flutter-io.cn/packages/flutter_svg)、[feedback](https://pub.flutter-io.cn/packages/feedback)、[toggle_switch](https://pub.flutter-io.cn/packages/toggle_switch) 和 [auto_size_text](https://pub.flutter-io.cn/packages/auto_size_text)。

![使用 flex_color_scheme 构建的可灵活折叠的应用](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flex_color_scheme-demo-in-2-8.gif)

祝贺这些 package 的作者，并感谢你通过你的辛勤工作支持 Flutter 社区。如果你有兴趣提名你最喜欢的 Flutter package 加入 Flutter Favorite 嘉奖，请按照 [Flutter Favorite 计划页面](https://docs.flutter.cn/development/packages-and-plugins/favorites) 上的指南和说明进行操作。

### 特定平台的插件

如果你是 package / 插件作者，你需要声明和实现支持哪些平台。如果你正在使用特定于平台的原生代码构建插件，你可以 [使用项目 pubspec.yaml 中的 pluginClass 属性](https://docs.flutter.cn/development/packages-and-plugins/developing-packages#plugin-platforms)
来实现，该属性将指定提供原生功能的原生类名: 

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
```

然而，随着 Dart FFI 变得更加成熟，有可能使用 100% 的 Dart 实现特定平台的功能，就像 [path_provider_windows package](https://pub.flutter-io.cn/packages/path_provider_windows) 所做的那样。在这种情况下，你没有任何本地类可以使用，但你仍然希望将你的插件指定为仅支持某些平台。此时你可以改用 `dartPluginClass` 属性: 

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        dartPluginClass: HelloPluginWindows
```

经过这样的设置后，即使你没有任何本机代码，也可以为特定平台定制插件。你还必须提供 Dart 插件的类，有关详细内容，你可以在 [Flutter 文档上阅读 Dart 平台实现文档](https://docs.flutter.cn/development/packages-and-plugins/developing-packages#dart-only-platform-implementations) 以了解更多。

## Firebase 相关的更新

Flutter 生态中另一个重要组成是 FlutterFire，大约有三分之二的 Flutter 应用都在使用它。这次稳定版增加了一系列新的功能，方便开发者们更好的在 Flutter 里使用 Firebase:

- 所有 FlutterFire 插件都从测试版毕业，「成长」为稳定版
- DartPad 开始支持部分 Firebase 服务，方便线上使用和体验
- 更方便构建认证和在实时查询 Firestore 数据的 UI 界面
- Flutter 中使用 Firestore Object/Document 映射的支持进入 Alpha 版

### 生产质量

[The FlutterFire plugins](http://firebase.flutter.dev/) 几乎已经全部从测试版转为文稳定版，可用于生产环境。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flutterfire-website.png)

Android、iOS 和网页版的插件已转为稳定版，包括 [Analytics](https://firebase.flutter.dev/docs/analytics/overview)、[Dynamic Links](https://firebase.flutter.dev/docs/dynamic-links/overview)、[In-App Messaging](https://firebase.flutter.dev/docs/in-app-messaging/overview/)、[Performance Monitoring](https://firebase.flutter.dev/docs/performance/overview)、[Realtime Database](https://firebase.flutter.dev/docs/database/overview)、[Remote Config](https://firebase.flutter.dev/docs/remote-config/overview) 和 [Installations](https://firebase.flutter.dev/docs/installations/overview)。有些 Firebase 库本身在部分平台上仍处于测试阶段，所以它的 Flutter 插件也会是测试版状态，比如 App Check 在 macOS 平台。但类似实时数据库 (Realtime Database)、分析 (Analytics)、远程配置 (Remote Config) 等 FlutterFire 插件已经在生产环境中可用了，可以选择试试看！

### Firebase 初始化仅需在 Dart 代码中配置即可

因为这些 package 已经达到生产质量，现在你 [只用在 Dart 代码中配置](https://github.com/FirebaseExtended/flutterfire/pull/6549)，就可以完成 Firebase 的初始化了。

```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart'; // generated via `flutterfire` CLI

Future<void> main() async {
  // initialize firebase across all supported platforms
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  runApp(MyApp());
}
```

在 `firebase_options.dart` 文件中定义的各种配置信息，就可以在选择的每个支持的平台里初始化 Firebase: 

```dart
static const FirebaseOptions web = FirebaseOptions(
  apiKey: 'AIzaSyCZFKryCEiKhD0JMPeq_weJguspf09h7Cg',
  appId: '1:111079797892:web:b9195888086158195ffed1',
  messagingSenderId: '111079797892',
  projectId: 'flutterfire-fun',
  authDomain: 'flutterfire-fun.firebaseapp.com',
  storageBucket: 'flutterfire-fun.appspot.com',
  measurementId: 'G-K029Y6KJDX',
);
```

如果你想为每个平台的初始化自定义数据结构的话，请使用这个 `flutterfire` 命令行工具完成: 

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flutterfire-cli.png)

这个命令行工具会从每个平台的子文件夹中找到唯一的 bundle ID，进而用它来查找以及创建匹配的特定平台下的 Firebase 工程详情。这意味着你将省去下载 `.json`文件到 Android 工程、下载 `.plist` 文件到 iOS 和 macOS 工程的时间了，当然，也无需再复制粘贴代码到你的 Web 工程了。换句话说，无论你的应用要为哪些平台初始化 Firebase，这句代码都可以帮你做到。当然，这也可能不是唯一一处初始化代码的地方，比如你需要在 Android 或 iOS 中创建 Crashlytics 调试符号 (dSYM) 的时候。但至少可以针对新的 Firebase 工程能够快速跑起来。

### 在 DartPad 中使用 Firebase

由于我们可以只在 Dart 代码中初始化并使用 FlutterFire，那 DartPad 自然也就支持使用 Firebase 啦: 

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/dartpad-flutterfire-demo.png)

这里有一个使用 Flutter 和 Firebase 构建的在线聊天的演示，所有这些都可以在 DartPad 中直接使用而无需安装任何内容。DartPad 对 Firebase 的支持已经包括了核心 API、身份验证和 Firestore，随着时间的推进，未来 DartPad 会支持更多 Firebase 服务。

另一个支持是在 FlutterFire 文档中直接内嵌了 DartPad 实例，比如 [Firestore 的示例页面](https://firebase.flutter.dev/docs/firestore/example/):

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/firestore-docs-with-dartpad.png)

在这个示例中，你将看到 Cloud Firestore 的文档以及 [示例应用](https://github.com/FirebaseExtended/flutterfire/tree/master/packages/cloud_firestore/cloud_firestore/example) 的代码，并且可以在浏览器中直接运行和编辑，无需安装任何软件。

### Firebase 用户界面

大多数用户都有身份验证的流程，包括但不仅限于通过邮箱和密码或者第三方账号登录等。使用 Firebase 身份认证 (Authentication) 服务，你就可以完成创建新用户、邮箱认证、重置密码，甚至是短信两步验证、使用手机号码登录、将多个账号合并为一个账号等功能。直到今天，开发者们仍需要自行来完成这些逻辑和 UI。

今天我们很希望大家尝试一个新的 package，名为 [flutterfire_ui](https://pub.dev/packages/flutterfire_ui)。这个 package 可以用少量的代码构建一个基本的身份验证体验，例如，在 Firebase 项目中设置了使用邮箱和 Google 账号登录:

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/firebase-console-auth-page.png)

通过这个配置你可以通过下面的代码构建一个身份验证:

```dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutterfire_ui/auth.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => MaterialApp(
        home: AuthenticationGate(),
      );
}

class AuthenticationGate extends StatelessWidget {
  const AuthenticationGate({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          // User is not signed in - show a sign-in screen
          if (!snapshot.hasData) {
            return SignInScreen(
              providerConfigs: [
                EmailProviderConfiguration(),
                GoogleProviderConfiguration(
                  clientId: 'xxxx-xxxx.apps.googleusercontent.com',
                ),
              ],
            );
          }

          return HomePage(); // show your app’s home page after login
        },
      );
}
```

这段代码将首先初始化 Firebase，然后会发现用户尚未登录进而显示登录界面，`SigninScreen` widget 配置了邮件和 Google 账号登录，代码里还使用了 `firebase_auth` package 来监测用户的身份验证状态，因此一旦用户登录完成，你就可以显示接下来的应用内容。使用这个代码片段，你将可以在所有 Firebase 支持的平台上完成身份验证功能。

再加入一些其他配置的话，你还可以添加一些图像和自定义文本 (详情见 [本文档](https://firebase.flutter.dev/docs/ui/overview))，从而为你提供更全面的用户身份验证体验: 

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flutterfire_ui-auth-mobile.png)

上面这个截图是移动端的身份认证，不过因为 `flutterfire_ui` 的 UI 是响应性设计，因此在桌面浏览器上，它会是这样的效果:

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flutterfire_ui-auth-desktop-browser.png)

用户可以使用邮箱地址和密码直接完成登录，如果他们选择使用通过谷歌身份验证登录，不论是在移动端、Web 端还是桌面端，则将会看到常见的 Google 身份验证流程。如果用户还没有账户，他们可以点击注册按钮进入注册流程。用户登录之后就会有电子邮件验证、密码重置、登出以及社交账户绑定功能。通过电子邮件和密码的身份验证适用于所有平台，并支持使用 Google、Facebook 和 Twitter 账号登录，以及在 iOS 系统上支持通过 Apple ID 登录。`flutterfire_ui` 的身份认证支持多种场景和导航方案以及自定义和本地化选项等。查看 [FlutterFire UI 的文档](https://firebase.flutter.dev/docs/ui/overview/) 了解更多。

此外，身份认证不是 `flutterfire_ui` 唯一支持的 Flutter UI 的相关功能。它还可以向用户展示一个来自 Firebase 数据查询并无限滚动的数据列表，这个版本也包含了一个 `FirestoreListView` 可以使用: 

```dart
class UserListView extends StatelessWidget {
  UserListView({Key? key}) : super(key: key);

  // live Firestore query
  final usersCollection = FirebaseFirestore.instance.collection('users');

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Contacts')),
        body: FirestoreListView<Map>(
          query: usersCollection,
          pageSize: 15,
          primary: true,
          padding: const EdgeInsets.all(8),
          itemBuilder: (context, snapshot) {
            final user = snapshot.data();

            return Column(
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      child: Text((user['firstName'] ?? 'Unknown')[0]),
                    ),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          '${user['firstName'] ?? 'unknown'} '
                          '${user['lastName'] ?? 'unknown'}',
                          style: Theme.of(context).textTheme.subtitle1,
                        ),
                        Text(
                          user['number'] ?? 'unknown',
                          style: Theme.of(context).textTheme.caption,
                        ),
                      ],
                    ),
                  ],
                ),
                const Divider(),
              ],
            );
          },
        ),
      );
}
```

实际的运行效果如下: 

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flutterfire_ui-contact-demo.gif)

或者你想为用户提供对表格数据的增删改查功能，你可以使用 `FirestoreDataTable`:

```dart
class FirestoreTableStory extends StatelessWidget {
  FirestoreTableStory({Key? key}) : super(key: key);

  // live Firestore query
  final usersCollection = FirebaseFirestore.instance.collection('users');

  @override
  Widget build(BuildContext context) {
    return FirestoreDataTable(
      query: usersCollection,
      columnLabels: const {
        'firstName': Text('First name'),
        'lastName': Text('Last name'),
        'prefix': Text('Prefix'),
        'userName': Text('User name'),
        'email': Text('Email'),
        'number': Text('Phone number'),
        'streetName': Text('Street name'),
        'city': Text('City'),
        'zipCode': Text('Zip code'),
        'country': Text('Country'),
      },
    );
  }
}
```

效果是这样的:

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/firebase-table-crud-demo.gif)

有关身份验证、列表视图和数据表的更多信息，[请查阅 flutterfire_ui 文档](https://firebase.flutter.dev/docs/ui/overview/)。这个 package 仍处于预览状态，可能会加入更多新的特性，如果你有任何使用的问题或者新的特性需求，请 [在 GitHub repo 里参与我们的讨论](https://github.com/FirebaseExtended/flutterfire/discussions/6978)。

### Firestore Object/Document 映射 (ODM)

我们同时发布了 [Firestore 对象 / 文档映射 (ODM)](https://firebase.flutter.dev/docs/firestore-odm/overview/) 的 Alpha 版本，Firestore ODM 的目标是让开发者更高效的通过类型安全、结构化对象和方法来简化 Firestore 的使用。通过生成代码，你可以以类型安全的方式对数据进行建模，从而改进与文档和集合交互的语法：

```dart
@JsonSerializable()
class Person {
  Person({required this.name, required this.age});

  final String name;
  final int age;
}

@Collection<Person>(‘/persons’)
final personsRef = PersonCollectionReference();
```

有了这些类型，你可以执行类型安全的查询:

```dart
personsRef.whereName(isEqualTo: 'Bob');
personsRef.whereAge(isGreaterThan: 42);
```

ODM 还支持强类型子集合，也提供了一些内置、优化过的 widget 来重建其 `select` 功能，你可以在 [Firestore ODM 文档](https://firebase.flutter.dev/docs/firestore-odm/overview/) 中阅读相关内容。因为这个还是 Alpha 版本，请尽可能 [在 GitHub repo 里向我们提出反馈](https://github.com/FirebaseExtended/flutterfire/discussions/7475)。

## 桌面平台更新

Flutter 2.8 版本在 Windows、macOS 和 Linux 稳定版本的道路上又迈出了一大步。
我们的目标质量标准很高，包括国际化和本地化支持，例如 [新的中文输入法支持](https://github.com/flutter/engine/pull/29620)、[韩语输入法支持](https://github.com/flutter/engine/pull/24713) 以及刚刚合并的 [Kanji（日文）输入法](https://github.com/flutter/engine/pull/29761) 支持。或者，就像我们在紧密构建 [Windows 辅助功能的支持](https://github.com/flutter/flutter/issues/77838) 一样。
对于 Flutter 来说，在稳定版渠道的桌面端上“运行”是不够的，它必须在世界各地的语言和文化以及不同能力的设备上运行良好。我们还没有达到我们想要的目标，但未来可期！

其中一个例子是我们重构了 Flutter 处理键盘事件以允许同步响应的架构。这使 widget 能够处理按键并拦截它在整个 widget tree 中的其余部分中的传递。我们在 Flutter 2.5 中完成了这项工作的落地，并在 Flutter 2.8 中修复了许多问题。这是对我们如何处理特定于设备的键盘输入的方式的重新设计，以及和重构 Flutter 处理文本编辑方式的持续工作的补充，所有这些都是用键盘这样输入密集型的桌面应用所必需的。

此外，我们还在继续 [向 Flutter 扩展视觉密度的定义](https://github.com/flutter/flutter/pull/89353)，暴露对话框对齐方式的设置，以便开发者可以实现更加友好的桌面 UI。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/flutter-desktop-dialog-demo.png)

最后，Flutter 团队并不是唯一一个在为了 Flutter desktop 付出心血的团队。举个例子，Canonical 的桌面团队正在与 Invertase 合作，在 Linux 和 Windows 上开发最流行的 Flutter Firebase 插件。

你可以在 [Invertase 博客上](https://invertase.io/blog/announcing-flutterfire-desktop) 阅读有关预览版的更多信息。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/invertase-flutterfire-desktop-preview.png)

## DartPad

如果没有工具的改进，那么这个 Flutter 新版本的发布是不完整的。我们将重点介绍 DartPad 的改进，其中最大的改进是对更多软件包的支持。事实上，目前共有 23 个 package 可供导入使用。除了几个 Firebase 服务之外，该列表还包括诸如 `bloc`、`characters`、`collection`、`google_fonts` 和 `flutter_riverpod` 等流行的 package。
DartPad 团队会继续添加新的 package，如果你想查看当前支持哪些 package 的话，可以单击右下角的信息图标。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/dartpad-support-packages-1211.png)

如果你想了解未来我们向 DartPad 添加新 package 的计划，请查看 [Dart wiki 上的这篇文章](https://github.com/dart-lang/dart-pad/wiki/Adding-support-for-a-new-package)。
还有另一个新的 DartPad 功能也非常方便，在此之前，DartPad 总是以运行最新的稳定版本运行。在新版本中，你可以使用状态栏中新的 **Channel 菜单** 来切换到使用最新的 Beta 渠道版本以及先前稳定版本 (我们称为 "old channel" 旧渠道)。

![](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-8/dartpad-using-channel-switch.png)

DartPad 里旧渠道的使用场景比如你正在撰写一篇博客文章，而最新的稳定版本还是特别流行，那这将非常有用。

## 移除 Dev 渠道

Flutter 的发布「渠道」(也就是 channel) 决定了 Flutter 框架和引擎在你的开发机器上变化的速度，`stable` 代表最少的变更，而 `master` 代表最多。由于资源有限，我们决定最近将停止更新 `dev` 渠道。虽然我们确实收到了一些关于 `dev` 渠道的问题，但我们发现只有不到 3% 的 Flutter 开发人员使用 `dev` 渠道，因此，我们决定 **不久将正式停用 dev 渠道**。

因为虽然很少有开发人员使用 `dev` 渠道，但 Flutter 工程师仍需要花费大量时间和精力来维护它。
如果你基本都只使用 `stable` 渠道的 Flutter 版本 (超过 90% 的 Flutter 者都在这么做)，那么这项改动将不会影响你的日常开发。通过放弃维护这个渠道，开发者们也可以少做一个渠道选择的决定，同时 Flutter 团队也可以将时间和精力花在其他事情上。你可以使用 `flutter channel` 命令来决定你想要哪个渠道。以下是 Flutter 团队对每个渠道的计划: 

* **Stable 渠道**: 代表我们拥有的最高质量的构建。它们每季度（大致）发布一次，并针对中间的关键问题进行热修复。这是「慢」通道: 安全、成熟、长期服务；
* **Beta 渠道**: 为那些习惯于更快节奏的开发者提供一种快速调整的替代方案。目前每月发布，稳定测试后会发布。这是一个「快速」通道，如果我们发现 `dev` 渠道相较于 `beta` 渠道有特别的需求和需求而 `beta` 渠道无法满足，我们可能会改变 `beta` 渠道的计划来满足 (比如，加速发布节奏或降低我们对该渠道执行的测试和热修复级别)；
* **Master 渠道**: 是我们活跃的开发渠道。我们不提供对该渠道的支持，但我们针对它运行了一套全面的单元测试。对于对不稳定的构建感到满意的贡献者或高级开发者而言，这是适合他们的渠道。在这个频道上，我们跑得很快，打破了一些东西 (然后会很快地修复它们)。

当我们在未来几个月停用 `dev` 渠道时，请考虑使用 `beta` 或 `master` 渠道，这取决于你对变更的容忍度以及对使用「最新」还是「最好」的平衡点。

## 破坏性改动 (breaking changes)

与往常一样，我们努力减少每个版本中破坏性更改的数量。在此版本中，Flutter 2.8 除了已过期并根据我们的 [破坏性改动政策](https://github.com/flutter/flutter/wiki/Tree-hygiene#handling-breaking-changes) 被删除的已弃用 API 之外，没有重大变更。

* [90292](https://github.com/flutter/flutter/pull/90292) 移除已废弃的 `autovalidate` 
* [90293](https://github.com/flutter/flutter/pull/90293) 移除已废弃的 `FloatingHeaderSnapConfiguration.vsync`
* [90294](https://github.com/flutter/flutter/pull/90294) 移除已废弃的 `AndroidViewController.id`
* [90295](https://github.com/flutter/flutter/pull/90295) 移除已废弃的 `BottomNavigationBarItem.title`
* [90296](https://github.com/flutter/flutter/pull/90296) 移除已废弃的文本输入格式化类

如果你仍在使用这些 API 并想了解如何迁移代码，你可以阅读 [Flutter 文档网站上的迁移指南](https://docs.flutter.cn/release/breaking-changes/2-5-deprecations)。
与往常一样，非常感谢社区 [贡献的测试用例](https://github.com/flutter/tests/blob/master/README.md)，帮助我们识别这些破坏性改动。

## 总结

在我们结束 2021 年并展望 2022 年之际，Flutter 团队要对整个 Flutter 社区的工作和支持表示感谢。诚然，我们正在为世界上越来越多的开发人员构建 Flutter，但如果没有你和每位开发者的存在，我们也无法维护并构建它。Flutter 社区与众不同，感谢你所做的一切！