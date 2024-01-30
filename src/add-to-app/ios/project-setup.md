---
title: Integrate a Flutter module into your iOS project
title: 将 Flutter module 集成到 iOS 项目
short-title: Integrate Flutter
short-title: 集成 Flutter
description: Learn how to integrate a Flutter module into your existing iOS project.
description: 了解如何将 Flutter module 集成到你现有的 iOS 项目中。
tags: Flutter混合工程,add2app
keywords: iOS,项目集成
---

Flutter UI components can be incrementally added into your existing iOS
application as embedded frameworks. There are a few ways to embed Flutter 
in your existing application.

Flutter UI 组件可以渐进式地内嵌到你现有的 iOS 应用中，下面是几种方法：

1. **Use the CocoaPods dependency manager and installed Flutter SDK.**
  In this case, the `flutter_module` is compiled from
  the source each time the app is built. (Recommended.)

   **使用 CocoaPods 依赖管理器安装 Flutter SDK**
   使用这种方法，每次构建应用的时候都会从源代码中编译 `flutter_module`。(推荐)

1. **Create frameworks for the Flutter engine, your compiled Dart code,
  and all Flutter plugins.** Here, you manually embed the frameworks,
  and update your existing application's build settings in Xcode.
  This can be useful for teams that don't want to require every developer
  to have the Flutter SDK and Cocoapods installed locally.

   **创建一个框架，把 Flutter 引擎、已编译的 Dart 代码和所有 Flutter 插件都放进去**
   这种方式你可以手动嵌入这个框架，并在 Xcode 中更改现有的应用的构建设置。
   如果不想要求开发团队的每一位成员都在本地安装 Flutter SDK 和 Cocoapods，
   这种方式比较适用。

1. **Create frameworks for your compiled Dart code,
  and all Flutter plugins. Use CocoaPods for the Flutter engine.** 
  With this option, embed the frameworks for your application
  and the plugins in Xcode, but distribute the
  Flutter engine as a CocoaPods podspec.
  This is similar to the second option, but it provides
  an alternative to distributing the large Flutter.xcframework.

   **为已编译的 Dart 代码和所有 Flutter 插件创建一个框架，对 Flutter 引擎使用 CocoaPods 来管理**
   这种方式是将应用内容和插件作为内嵌的框架，但将 Flutter 引擎作为 CocoaPods podspec 分发。
   这有点类似第二种方式，但是它为分发大型的 Flutter.xcframework 文件提供了替代方案。

For examples using an app built with UIKit, 
see the iOS directories in the [add_to_app code samples][]. 
For an example using SwiftUI, see the iOS directory in [News Feed App][].

例如使用 UIKit 构建的应用，请参阅
[add_to_app 代码示例][add_to_app code samples] 中 iOS 这个目录。
有关使用 SwiftUI 的示例，请参阅 [News Feed App][] 中的 iOS 目录。

## System requirements

## 系统要求

Your development environment must meet the
[macOS system requirements for Flutter][]
with [Xcode installed][].
Flutter supports iOS 11 and later.
Additionally, you will need [CocoaPods][]
version 1.10 or later.

你的开发环境必须满足
[Flutter 对 macOS 系统的版本要求][macOS system requirements for Flutter]
并 [已经安装 Xcode][Xcode installed]，Flutter 支持 iOS 11 及以上。
此外，你还需要 1.10 或以上版本的 [CocoaPods][]

## Create a Flutter module

## 创建 Flutter module

To embed Flutter into your existing application, 
using any of the methods mentioned above, 
first create a Flutter module.

为了将 Flutter 集成到你的既有应用里，
参考上面的任意方法先创建一个 Flutter module。

From the command line, run:

在命令行中执行：

```terminal
cd some/path/
flutter create --template module my_flutter
```

A Flutter module project is created at `some/path/my_flutter/`.
If you are using the first method mentioned above, 
the module should be created in the same parent directory 
as your existing iOS app. 

Flutter module 会创建在 `some/path/my_flutter/` 目录。
如果你使用上述第一种方法，则应在与现有 iOS 应用工程的父目录中创建这个 Flutter module。

From the Flutter module directory, you can run the same `flutter`
commands you would in any other Flutter project,
like `flutter run --debug` or `flutter build ios`.
You can also run the module in
[Android Studio/IntelliJ][] or [VS Code][] with
the Flutter and Dart plugins. This project contains a
single-view example version of your module before it's
embedded in your existing application,
which is useful for incrementally
testing the Flutter-only parts of your code.

在这个目录中，你可以像在其它 Flutter 项目中一样，执行 `flutter` 命令。
比如 `flutter run --debug` 或者 `flutter build ios`。
同样，你也可以通过 [Android Studio/IntelliJ][] 或者 [VS Code][]
中的 Flutter 和 Dart 插件运行这个 module，在集成到现有应用前，
这个项目在 Flutter module 中包含了一个单视图的示例代码，
对 Flutter 侧代码的测试会有帮助。

### Module organization

### Module 的目录结构

The `my_flutter` module directory structure is similar to a
normal Flutter application:

在 `my_flutter` module 里，目录结构和普通 Flutter 应用类似：

```text
my_flutter/
├── .ios/
│   ├── Runner.xcworkspace
│   └── Flutter/podhelper.rb
├── lib/
│   └── main.dart
├── test/
└── pubspec.yaml
```

Add your Dart code to the `lib/` directory.

添加你的 Dart 代码到 `lib/` 目录。

Add Flutter dependencies to `my_flutter/pubspec.yaml`,
including Flutter packages and plugins.

添加 Flutter 依赖到 `my_flutter/pubspec.yaml`，
包括 Flutter packages 和 plugins。

The `.ios/` hidden subfolder contains an Xcode workspace where
you can run a standalone version of your module.
It is a wrapper project to bootstrap your Flutter code,
and contains helper scripts to facilitate building frameworks or
embedding the module into your existing application with CocoaPods.

`.ios/` 隐藏文件夹包含了一个 Xcode workspace，用于单独运行你的 Flutter module。
它是一个独立启动 Flutter 代码的壳工程，并且包含了一个帮助脚本，
用于编译 framewroks 或者使用 CocoaPods 将 Flutter module 集成到你的既有应用。

{{site.alert.note}}

  Add custom iOS code to your own existing application's
  project or to a plugin, not to the module's `.ios/`
  directory. Changes made in your module's `.ios/`
  directory don't appear in your existing iOS project
  using the module, and might be overwritten by Flutter.

  iOS 代码要添加到你的既有应用或者 Flutter plugin中，
  而不是 Flutter module 的 `.ios/` 目录下。
  `.ios/` 下的改变不会集成到你的既有应用，
  并且这有可能被 Flutter 重写。

  Do not source control the `.ios/` directory since it's autogenerated.
  Before building the module on a new machine, run `flutter pub get`
  in the `my_flutter` directory first to regenerate the `.ios/`
  directory before building iOS project using the Flutter module.

  由于 `.ios/` 目录是自动生成的，因此请勿对其进行版本控制。在新机器上构建 module 时，
  请在使用 Flutter module 构建 iOS 项目之前，
  先于 `my_flutter` 目录运行 `flutter pub get` 以生成 `.ios/` 目录。

{{site.alert.end}}

## Embed the Flutter module in your existing application

## 在你的既有应用中集成 Flutter module

After you have developed your Flutter module,
you can embed it using the methods described at the top of the page.

在你的 module 开发完成后，
你就能使用页面顶部描述的方法将其嵌入到应用中去了。

{{site.alert.note}}

  You can run in Debug mode on a simulator or a real device,
  and Release on a real device. Learn more about
  [Flutter's build modes][build modes of Flutter]

  你可以在模拟机和真机上运行 Debug 模式，
  在真机上运行 Release 模式，了解更多，
  请查看文档 [Flutter 的构建模式][build modes of Flutter]。

  To leverage Flutter debugging functionality 
  such as hot reload, see  [Debugging your add-to-app module][].

  若要尝试 Flutter 调试里类似热重载等功能，请参阅文档
  [调试你的 add-to-app 模块][Debugging your add-to-app module]。

{{site.alert.end}}

Using Flutter [increases your app size][].

使用 Flutter 会 [增加应用体积][increases your app size] 。

### Option A - Embed with CocoaPods and the Flutter SDK

### 选项 A - 使用 CocoaPods 和 Flutter SDK 集成

This method requires every developer working on your
project to have a locally installed version of the Flutter SDK.
The Flutter module is compiled from source each time the app is built.
Simply build your application in Xcode to automatically
run the script to embed your Dart and plugin code.
This allows rapid iteration with the most up-to-date
version of your Flutter module without running additional
commands outside of Xcode.

这个方法需要你的项目的所有开发者，都在本地安装 Flutter SDK。
你的工程在每次构建的的时候，都将会从源码里编译 Flutter 模块。
只需要在 Xcode 中编译应用，就可以自动运行脚本来集成 Dart 代码和插件。
这个方法允许你使用 Flutter module 中的最新代码快速迭代开发，
而无需在 Xcode 以外执行额外的命令。

The following example assumes that your existing
application and the Flutter module are in sibling
directories. If you have a different directory structure,
you might need to adjust the relative paths.

下面的示例假设你的既有应用和 Flutter module 在相邻目录。
如果你有不同的目录结构，需要适配到对应的路径。

```text
some/path/
├── my_flutter/
│   └── .ios/
│       └── Flutter/
│         └── podhelper.rb
└── MyApp/
    └── Podfile
```

If your existing application (`MyApp`) doesn't
already have a Podfile, run `pod init` in the  
`MyApp` directory to create one. 
You can find more details on using 
CocoaPods in the [CocoaPods getting started guide][].

如果你的应用下（`MyApp`）还没有 Podfile，
请运行 `pod init` 来创建一个。
你可以在 [CocoaPods 起步指南][CocoaPods getting started guide]
中了解更多。


<ol markdown="1">
<li markdown="1">

Add the following lines to your `Podfile`:

在 `Podfile` 中添加下面代码：

<?code-excerpt title="MyApp/Podfile"?>
```ruby
flutter_application_path = '../my_flutter'
load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')
```

</li>

<li markdown="1">

For each [Podfile target][] that needs to
embed Flutter, call `install_all_flutter_pods(flutter_application_path)`.

每个需要集成 Flutter 的 [Podfile target][]，
执行 `install_all_flutter_pods(flutter_application_path)`：

<?code-excerpt title="MyApp/Podfile"?>
```ruby
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end
```

</li>

<li markdown="1">

In the `Podfile`'s `post_install` block, call `flutter_post_install(installer)`.

在 `Podfile` 的 `post_install` 部分，调用 `flutter_post_install(installer)`。

<?code-excerpt title="MyApp/Podfile"?>
```ruby
post_install do |installer|
  flutter_post_install(installer) if defined?(flutter_post_install)
end
```

{{site.alert.note}}

  The `flutter_post_install` method (added in Flutter 3.1.0),
  adds build settings to support native Apple Silicon `arm64` iOS simulators.
  Include the `if defined?(flutter_post_install)` check to ensure your `Podfile`
  is valid if you are running on older versions of Flutter that don't have this method.

  `flutter_post_install` 方法（Flutter 3.1.0 中新增的）
  增加了原生 Apple Silicon `arm64` iOS 模拟器的支持。
  它包括 `if defined?(flutter_post_install)` 的检查以确保你的
  `Podfile` 在旧版本的没有该方法的 Flutter 上也能正常运行。

{{site.alert.end}}

</li>

<li markdown="1">

Run `pod install`.

   运行 `pod install`。

{{site.alert.note}}

  When you change the Flutter plugin dependencies in
  `my_flutter/pubspec.yaml`, run `flutter pub get`
  in your Flutter module directory to refresh the list
  of plugins read by the `podhelper.rb` script.
  Then, run `pod install` again from
  your application at `some/path/MyApp`.

  当你在 `my_flutter/pubspec.yaml` 改变了 Flutter plugin 依赖，
  需要在 Flutter module 目录运行 `flutter pub get`，
  来更新会被`podhelper.rb` 脚本用到的 plugin 列表，
  然后再次在你的应用目录 `some/path/MyApp` 运行 `pod install`.

{{site.alert.end}}

</li>
</ol>

The `podhelper.rb` script embeds your plugins,
`Flutter.framework`, and `App.framework` into your project.

`podhelper.rb` 脚本会把你的 plugins，
`Flutter.framework`，和 `App.framework` 集成到你的项目中。

Your app's Debug and Release build configurations embed
the Debug or Release [build modes of Flutter][], respectively.
Add a Profile build configuration
to your app to test in profile mode.

你应用的 Debug 和 Release 编译配置，将会集成相对应的
Debug 或 Release 的 [编译产物][build modes of Flutter]。
可以增加一个 Profile 编译配置用于在 profile 模式下测试应用。

{{site.alert.tip}}

  `Flutter.framework` is the bundle for the Flutter engine,
  and `App.framework` is the compiled Dart code for this project.

  `Flutter.framework` 是 Flutter engine 的框架，
  `App.framework` 是你的 Dart 代码的编译产物。

{{site.alert.end}}

Open `MyApp.xcworkspace` in Xcode.
You can now build the project using `⌘B`.

在 Xcode 中打开 `MyApp.xcworkspace` ，你现在可以使用 `⌘B` 编译项目了。

### Option B - Embed frameworks in Xcode

### 选项 B - 在 Xcode 中集成 frameworks

Alternatively, you can generate the necessary frameworks
and embed them in your application by manually editing
your existing Xcode project. You might do this if members of your
team can't locally install Flutter SDK and CocoaPods,
or if you don't want to use CocoaPods
as a dependency manager in your existing applications.
You must run `flutter build ios-framework`
every time you make code changes in your Flutter module.

除了上面的方法，你也可以创建必备的 frameworks，手动修改既有 Xcode 项目，将他们集成进去。
当你组内其它成员们不能在本地安装 Flutter SDK 和 CocoaPods，
或者你不想使用 CocoaPods 作为既有应用的依赖管理时，这种方法会比较合适。
但是每当你在 Flutter module 中改变了代码，
都必须运行 `flutter build ios-framework`。

The following example assumes that you want to generate the
frameworks to `some/path/MyApp/Flutter/`.

下面的示例假设你想在 `some/path/MyApp/Flutter/` 目录下创建 frameworks：

```terminal
flutter build ios-framework --output=some/path/MyApp/Flutter/
```

```text
some/path/MyApp/
└── Flutter/
    ├── Debug/
    │   ├── Flutter.xcframework
    │   ├── App.xcframework
    │   ├── FlutterPluginRegistrant.xcframework (only if you have plugins with iOS platform code)
    │   └── example_plugin.xcframework (each plugin is a separate framework)
    ├── Profile/
    │   ├── Flutter.xcframework
    │   ├── App.xcframework
    │   ├── FlutterPluginRegistrant.xcframework
    │   └── example_plugin.xcframework
    └── Release/
        ├── Flutter.xcframework
        ├── App.xcframework
        ├── FlutterPluginRegistrant.xcframework
        └── example_plugin.xcframework
```

{{site.alert.warning}}

  Always use `Flutter.xcframework` and `App.xcframework`
  from the same directory. Mixing `.xcframework` imports
  from different directories (such as `Profile/Flutter.xcframework`
  with `Debug/App.xcframework`) causes runtime crashes.

  始终使用相同目录下的 `Flutter.framework` 和 `App.framework`。
  混合使用不同目录（例如 `Profile/Flutter.framework`
  以及 `Debug/App.framework`）将会导致运行失败。

{{site.alert.end}}

Link and embed the generated frameworks into your existing
application in Xcode.  There are multiple ways to do
this&mdash;use the method that is best for your project.

在 Xcode 中将生成的 frameworks 集成到你的既有应用中。
例如，你可以在 `some/path/MyApp/Flutter/Release/`
目录拖拽 frameworks 到 你的应用 target 编译设置的
General > Frameworks, Libraries, and Embedded Content 下，
然后在 Embed 下拉列表中选择 "Embed & Sign"。

#### Link on the frameworks

#### 链接到框架

For example, you can drag the frameworks from
`some/path/MyApp/Flutter/Release/` in Finder
into your target's **Build
Settings > Build Phases > Link Binary With Libraries**.

例如，你可以将框架从 Finder 的 `some/path/MyApp/Flutter/Release/`
拖到你的目标项目中，
然后点击以下步骤
build settings > Build Phases > Link Binary With Libraries。

In the target's build settings, add `$(PROJECT_DIR)/Flutter/Release/`
to the **Framework Search Paths** (`FRAMEWORK_SEARCH_PATHS`).

在 target 的编译设置中的
Framework Search Paths (`FRAMEWORK_SEARCH_PATHS`)
增加 `$(PROJECT_DIR)/Flutter/Release/`。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/framework-search-paths.png" alt="Update Framework Search Paths in Xcode" %}

{{site.alert.tip}}

  To use the simulator, you will need to 
  embed the Debug version of the Flutter frameworks in your
  Debug build configuration. To do this 
  you can use `$(PROJECT_DIR)/Flutter/$(CONFIGURATION)`
  in the **Framework Search Paths** (`FRAMEWORK_SEARCH_PATHS`)
  build setting. This embeds the Release frameworks in the Release configuration, 
  and the Debug frameworks in the Debug Configuration.

  若你需要使用模拟器，你需要在你的 Debug 构建配置中嵌入 Debug 环境的 Flutter framework。 
  此时你应该在 **Framework Search Paths** (`FRAMEWORK_SEARCH_PATHS`) 构建设置中使用
  `$(PROJECT_DIR)/Flutter/$(CONFIGURATION)`。
  它会让不同环境的 Flutter framework 对应地嵌入到不同模式。
  
  You must also open `MyApp.xcodeproj/project.pbxproj` (from Finder) 
  and replace `path = Flutter/Release/example.xcframework;`
  with `path = "Flutter/$(CONFIGURATION)/example.xcframework";`
  for all added frameworks. (Note the added `"`.)

  你需要打开 `MyApp.xcodeproj/project.pbxproj`（从访达中打开）
  将 `path = Flutter/Release/example.xcframework;` 替换为
  `path = "Flutter/$(CONFIGURATION)/example.xcframework";`
  来添加所有的 framework（注意增加的 `"` 双引号）。

{{site.alert.end}}

#### Embed the frameworks

### 内嵌框架

The generated dynamic frameworks must be embedded
into your app to be loaded at runtime.

生成的动态框架必须嵌入你的应用并且在运行时被加载。

{{site.alert.important}}

  Plugins might produce [static or dynamic frameworks][].
  Static frameworks should be linked on, but never embedded.
  If you embed a static framework into your application,
  your application is not publishable to the App Store
  and fails with a
  **Found an unexpected Mach-O header code** archive error.

  插件会帮助你生成 [静态或动态框架][static or dynamic frameworks]。
  静态框架应该直接链接而不是嵌入。
  如果你在应用中嵌入了静态框架，
  你的应用将不能发布到 App Store 并且会得到一个
  **Found an unexpected Mach-O header code** 的 archive error。

{{site.alert.end}}

After linking the frameworks, you should see them in the 
**Frameworks, Libraries, and Embedded Content**
section of your target's **General** settings. 
To embed the dynamic frameworks
select **Embed & Sign**. 

例如，你可以从应用框架组中拖拽框架
（除了 FlutterPluginRegistrant 以及其他的静态框架）
到你的目标 ' build settings > Build Phases > Embed Frameworks。
然后从下拉菜单中选择 “Embed & Sign”。

They will then appear under **Embed Frameworks** within 
**Build Phases** as follows: 

之后它们将出现在 **Build Phases** 中的 **Embed Frameworks** 内，
如下所示：

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/embed-xcode.png" alt="Embed frameworks in Xcode" %}

You should now be able to build the project in Xcode using `⌘B`.

你现在可以在 Xcode中使用 `⌘B` 编译项目。

### Option C - Embed application and plugin frameworks in Xcode and Flutter framework with CocoaPods

### 选项 C -  使用 CocoaPods 在 Xcode 和 Flutter 框架中内嵌应用和插件框架

Alternatively, instead of distributing the large Flutter.xcframework
to other developers, machines, or continuous integration systems,
you can instead generate Flutter as CocoaPods podspec by adding
the flag `--cocoapods`. This produces a `Flutter.podspec`
instead of an engine Flutter.xcframework.
The App.xcframework and plugin frameworks are generated
as described in Option B.

除了将一个很大的 Flutter.framework 分发给其他开发者、机器或者持续集成 (CI) 系统
之外，你可以加入一个参数 `--cocoapods` 将 Flutter 框架作为一个
CocoaPods 的 podspec 文件分发。
这将会生成一个 `Flutter.podspec` 文件而不再生成 Flutter.framework 引擎文件。
如选项 B 中所说的那样，它将会生成 App.framework 和插件框架。

To generate the `Flutter.podspec` and frameworks, run the following 
from the command line in the root of your Flutter module:

要生成 `Flutter.podspec` 和框架，
命令行切换到 Flutter module 根目录，然后运行以下命令：

```terminal
flutter build ios-framework --cocoapods --output=some/path/MyApp/Flutter/
```

```text
some/path/MyApp/
└── Flutter/
    ├── Debug/
    │   ├── Flutter.podspec
    │   ├── App.xcframework
    │   ├── FlutterPluginRegistrant.xcframework
    │   └── example_plugin.xcframework (each plugin with iOS platform code is a separate framework)
    ├── Profile/
    │   ├── Flutter.podspec
    │   ├── App.xcframework
    │   ├── FlutterPluginRegistrant.xcframework
    │   └── example_plugin.xcframework
    └── Release/
        ├── Flutter.podspec
        ├── App.xcframework
        ├── FlutterPluginRegistrant.xcframework
        └── example_plugin.xcframework
```

Host apps using CocoaPods can add Flutter to their Podfile:

使用 CocoaPods 的宿主应用程序可以将 Flutter 添加到 Podfile 中：

<?code-excerpt title="MyApp/Podfile"?>
```ruby
pod 'Flutter', :podspec => 'some/path/MyApp/Flutter/[build mode]/Flutter.podspec'
```

{{site.alert.note}}

  You must hard code the `[build mode]` value.
  For example, use `Debug` if you need to use
  `flutter attach` and `Release` when you're ready to ship.

  你必须选择相应的构建模式进行硬编码，
  将构建模式的值写在上面指令中的 `[build mode]` 位置。 
  例如，你需要 `flutter attach` 的时候，应该使用 `Debug`，
  在你准备发布版本的时候，应该使用 `Release`。

{{site.alert.end}}

Link and embed the generated App.xcframework,
FlutterPluginRegistrant.xcframework,
and any plugin frameworks into your existing application
as described in Option B.

如选项 B 所述，将生成的 App.xcframework、
FlutterPluginRegistrant.xcframework 以及
任何插件框架，链接并嵌入到你现有的应用程序中。

## Local Network Privacy Permissions

## 本地网络隐私权限

On iOS 14 and higher, enable the Dart multicast DNS
service in the Debug version of your app
to add [debugging functionalities such as hot-reload and
DevTools][] via `flutter attach`.

在 iOS 14 及更高的版本中，
可以在应用程序的 Debug 版本中启用 Dart 的 多播 DNS 服务 (multicast DNS service)，
通过 `flutter attach` 添加 
[调试功能，如热重载和 DevTools][debugging functionalities such as hot-reload and DevTools]。

{{site.alert.warning}}

  This service must not be enabled in the **Release**
  version of your app, or you might experience App Store rejections.

  不可以在应用程序的 **Release** 版本中启用这项服务，
  否则你很有可能被 App Store 拒绝上架。

{{site.alert.end}}

One way to do this is to maintain a separate copy of your app's Info.plist per
build configuration. The following instructions assume
the default **Debug** and **Release**.
Adjust the names as needed depending on your app's build configurations.

还有一种方式是将每种不同的构建配置，单独创建对应配置的 Info.plist。
下面的说明假定默认为 **调试版本 (Debug)** 和 **发布版本 (Release)**。
根据应用程序构建配置的需要调整名称。

<ol markdown="1">
<li markdown="1">

Rename your app's **Info.plist** to **Info-Debug.plist**.
Make a copy of it called **Info-Release.plist** and add it to your Xcode project.

将应用程序中的 **Info.plist** 重命名为 **Info-Debug.plist**，
再复制一个相同的文件并重命名为 **Info-Release.plist**，
最后将 **Info-Debug.plist**、**Info-Release.plist** 添加到 Xcode 项目中。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/info-plists.png" alt="Info-Debug.plist and Info-Release.plist in Xcode" %}

</li>

<li markdown="1">

In **Info-Debug.plist** _only_ add the key `NSBonjourServices`
and set the value to an array with the string `_dartVmService._tcp`.
Note Xcode will display this as "Bonjour services".

在 **Info-Debug.plist** 中 **只** 添加 key `NSBonjourServices`，
并将它的值设置为数组 (Array)，然后在该数组中添加 `_dartVmService._tcp` 字符串 (String)。

Optionally, add the key `NSLocalNetworkUsageDescription` set to your
desired customized permission dialog text.

可以选择添加 key `NSLocalNetworkUsageDescription`，
并设置为你自定义的权限提示对话框文本。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/debug-plist.png" alt="Info-Debug.plist with additional keys" %}

</li>

<li markdown="1">

In your target's build settings, change the **Info.plist File**
(`INFOPLIST_FILE`) setting path from `path/to/Info.plist` to `path/to/Info-$(CONFIGURATION).plist`.

在 target 构建设置中，将 **Info.plist File** (`INFOPLIST_FILE`) 设置路径
从 `path/to/Info.plist` 改为 `path/to/Info-$(CONFIGURATION).plist`。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/set-plist-build-setting.png" alt="Set INFOPLIST_FILE build setting" %}

This will resolve to the path **Info-Debug.plist** in **Debug** and
**Info-Release.plist** in **Release**.

这个设置将会在 **Debug** 时，使用 **Info-Debug.plist** 的配置，
在 **Release** 时，使用 **Info-Release.plist** 的配置。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/plist-build-setting.png" alt="Resolved INFOPLIST_FILE build setting" %}

Alternatively, you can explicitly set the **Debug** path to **Info-Debug.plist**
and the **Release** path to **Info-Release.plist**.

又或者，你可以明确地将 **Debug** 的路径设置为 **Info-Debug.plist**，
将 **Release** 的路径设置为 **Info-Release.plist**。

</li>

<li markdown="1">

If the **Info-Release.plist** copy is in your target's **Build Settings > Build Phases > Copy Bundle**
Resources build phase, remove it.

如果 **Info-Release.plist** 在 target 中 **Build Settings > Build Phases > Copy Bundle Resources** 
的时候，请删除它。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/copy-bundle.png" alt="Copy Bundle build phase" %}

The first Flutter screen loaded by your Debug app will now prompt
for local network permission. The permission can also be allowed by enabling
**Settings > Privacy > Local Network > Your App**.

现在 Debug 应用程序会在 Flutter 启动时提示本地网络权限。
也可以通过打开 **设置 > 隐私与安全性 > 本地网络 > 你的应用程序** 来允许该权限。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/network-permission.png" alt="Local network permission dialog" %}

</li>
</ol>

## Apple Silicon (`arm64` Macs)

On an Apple Silicon (M1) Mac, the host app builds for an `arm64` simulator.
While Flutter supports `arm64` simulators, some plugins might not. If you use
one of these plugins, you might see a compilation error like **Undefined symbols
for architecture arm64** and you must exclude `arm64` from the simulator
architectures in your host app.

在使用 Apple Silicon 芯片的 Mac 上 (M1)，宿主应用将针对 `arm64` 架构的模拟器编译。
尽管 Flutter 支持 `arm64` 的 iOS 模拟器，但一些插件仍有可能未进行支持。
当你在使用这些插件时，你会遇到 **Undefined symbols for architecture arm64** 的错误，
此时你必须从模拟器支持架构中移除 `arm64`。

In your host app target, find the **Excluded Architectures** (`EXCLUDED_ARCHS`) build setting.
Click the right arrow disclosure indicator icon to expand the available build configurations.
Hover over **Debug** and click the plus icon. Change **Any SDK** to **Any iOS Simulator SDK**.
Add `arm64` to the build settings value.

在宿主应用的 Target 中，找到名为 **Excluded Architectures** (`EXCLUDED_ARCHS`) 的构建设置。
单击右侧的箭头指示器图标以展开可用的构建配置。
将鼠标悬停在 **Debug** 处并单击加号图标。将 **Any SDK** 更改为 **Any iOS Simulator SDK**。
然后向构建设置值中添加 `arm64`。

{% include docs/app-figure.md image="development/add-to-app/ios/project-setup/excluded-archs.png" alt="Set conditional EXCLUDED_ARCHS build setting" %}

When done correctly, Xcode will add `"EXCLUDED_ARCHS[sdk=iphonesimulator*]" = arm64;` to your **project.pbxproj** file.

当全部都正确设置后，Xcode 将会向你的 **project.pbxproj** 文件中添加 `"EXCLUDED_ARCHS[sdk=iphonesimulator*]" = arm64;`。

Repeat for any iOS unit test targets.

然后对全部 iOS 目标再次执行单元测试。

## Development

## 开发

You can now [add a Flutter screen][] to your existing application.

你现在可以 [添加一个 Flutter 页面][add a Flutter screen] 到你的既有应用中。

[add_to_app code samples]: {{site.repo.samples}}/tree/main/add_to_app
[add a Flutter screen]: {{site.url}}/add-to-app/ios/add-flutter-screen
[Android Studio/IntelliJ]: {{site.url}}/tools/android-studio
[build modes of Flutter]: {{site.url}}/testing/build-modes
[embed the frameworks]: {{site.url}}/add-to-app/ios/project-setup#embed-the-frameworks
[CocoaPods]: https://cocoapods.org/
[CocoaPods getting started guide]: https://guides.cocoapods.org/using/using-cocoapods.html
[debugging functionalities such as hot-reload and DevTools]: {{site.url}}/add-to-app/debugging
[Embed with CocoaPods and Flutter tools]: #option-a---embed-with-cocoapods-and-the-flutter-sdk
[increases your app size]: {{site.url}}/resources/faq#how-big-is-the-flutter-engine
[macOS system requirements for Flutter]: {{site.url}}/get-started/install/macos#system-requirements
[On iOS 14 and higher]: {{site.apple-dev}}/news/?id=0oi77447
[Podfile target]: https://guides.cocoapods.org/syntax/podfile.html#target
[static or dynamic frameworks]: {{site.so}}/questions/32591878/ios-is-it-a-static-or-a-dynamic-framework
[VS Code]: {{site.url}}/tools/vs-code
[XCFrameworks]: {{site.apple-dev}}/documentation/xcode_release_notes/xcode_11_release_notes
[Xcode installed]: {{site.url}}/get-started/install/macos#install-xcode
[News Feed app]: https://github.com/flutter/put-flutter-to-work/tree/022208184ec2623af2d113d13d90e8e1ce722365
[Debugging your add-to-app module]: {{site.url}}/add-to-app/debugging/
