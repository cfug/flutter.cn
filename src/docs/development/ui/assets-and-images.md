---
title: Adding assets and images
title: 添加资源和图片
short-title: Assets and images
short-title: 资源和图片
---

Flutter应用程序包含代码和 assets（有时称为资源）。资源是被打包到应用程序安装包中，
可以在运行时访问。常见的资源类型包括静态数据（例如JSON文件），配置文件，图标和
图片（JPEG，WebP，GIF，动画WebP / GIF，PNG，BMP和WBMP）。

## 指定资源

Flutter使用[`pubspec.yaml`]文件，位于项目根目录, 来识别应用程序所需的资源。

下面举个例子:

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

如果要包含一个目录下的所有assets，需要在目录名称的结尾加上 `/`：

```yaml
flutter:
  assets:
    - assets/
```

注意只包含目录下根节点的所有文件，如果要添加子目录下的文件，需要给每个目录创建节点。

### 资源打包

该 `assets` 部分的 `flutter` 部分需要指定包含在应用程序中的文件。 每个资源都通过相对于 `pubspec.yaml` 文件所在位置的路径进行标识。资源的声明顺序是无关紧要的。资源的实际目录可以是任意文件夹（在本示例中是 `assets` ）

在一次构建中，Flutter将assets放到 _asset bundle_ 的特殊归档中，以便应用程序在运行时读取它们。

### 资源变体

构建过程支持asset变体：不同版本的资源可能会显示在不同的上下文中。 在 `pubspec.yaml` 的 `assets` 部分中指定的资源路径，会在构建过程中，查找同级子目录中相同名称的任何文件。这些文件会与指定的asset一起
被打包在资源bundle中。

例如，你的应用程序目录中有以下文件：

```
  .../pubspec.yaml
  .../graphics/my_icon.png
  .../graphics/background.png
  .../graphics/dark/background.png
  ...etc.
```

...同时 `pubspec.yaml` 文件包含：

```yaml
flutter:
  assets:
    - graphics/background.png
```

...那么这两个图片， `graphics/background.png` 和 `graphics/dark/background.png`
将被打包在你的资源bundle中。前者被称为是 _main asset_，后者被称为是一种变体（ _variant_）。

如果指定的是graphics目录：

```yaml
flutter:
  assets:
    - graphics/
```

... 那么 `graphics/my_icon.png`， `graphics/background.png` 和 `graphics/dark/background.png` 同时被包含。

在选择当前设备分辨率的图片时，Flutter会使用资源变体；见下文。
将来，这种机制可能会扩展到本地化、阅读提示等方面。

## 加载 assets

你的应用程序可以通过[`AssetBundle`]({{site.api}}/flutter/services/AssetBundle-class.html)
对象访问其asset。

Asset bundle 通过指定一个逻辑键（key），允许你读取 string/text（`loadString`）
和 image/binary（`load`）。在编译期间，这个逻辑键（key）会映射在 `pubspec.yaml` 中指定的资源路径。


### 加载文本assets

每个Flutter应用程序都有一个[`rootBundle`]({{site.api}}/flutter/services/rootBundle.html)对象， 
可以轻松访问主资源bundle。还可以直接使用 `package:flutter/services.dart` 中
全局静态的 `rootBundle` 来加载资源。

但是，如果获取当前BuildContext的AssetBundle，建议
使用[`DefaultAssetBundle`]({{site.api}}/flutter/widgets/DefaultAssetBundle-class.html) 。
这种方式不是使用应用程序构建的默认资源bundle，而是让父级widget在
运行时替换的不同的AssetBundle，这对于本地化或测试场景很有用。

通常，你可以从应用程序运行时的 `rootBundle`中，间接使用 `DefaultAssetBundle.of()` 
来加载资源（例如JSON文件）。

在Widget上下文之外，或AssetBundle的句柄不可用时，你可以使用 `rootBundle` 
直接加载这些assets，例如：

```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

### 加载 images

Flutter可以为当前设备加载适合其分辨率的图像。

#### 声明分辨率相关的图片 assets

[`AssetImage`]({{site.api}}/flutter/painting/AssetImage-class.html) 
可以将逻辑请求资源映射到最接近当前设备[device pixel ratio]({{site.api}}/flutter/dart-ui/Window/devicePixelRatio.html) 的资源。
为了使这种映射起作用，应该根据特定的目录结构来保存资源：

```
  .../image.png
  .../Mx/image.png
  .../Nx/image.png
  ...etc.
```

...其中 _M_ 和 _N_  是数字标识符，对应于其中包含的图像的分辨率，换句话说，
它们指定不同素设备像比例的图片。

主资源默认对应于1.0倍的分辨率图片。比如下面的图片 `my_icon.png`：

```
  .../my_icon.png
  .../2.0x/my_icon.png
  .../3.0x/my_icon.png
```

而在设备像素比率为1.8的设备上，对应是 `.../2.0x/my_icon.png` 。
如果是2.7的设备像素比，对应是 `.../3.0x/my_icon.png` 。

如果在 `Image` 控件上未指定渲染图像的宽度和高度，通常会扩展资源来保证与主资源相同的屏幕空间量，
并不是相同的物理像素，只是分辨率更高。 换句话说，`.../my_icon.png` 是72px乘72px，
那么 `.../3.0x/my_icon.png` 应该是216px乘216px；但如果未指定宽度和高度，
它们都将渲染为72像素×72像素（以逻辑像素为单位）。

在 `pubspec.yaml` 中资源部分的每一项都应与实际文件相对应，除过主资源节点。
当主资源缺少某个文件时，会按分辨率从低到高的顺序去选择，也就是说1x中
没有的话会在2x中找，2x中还没有的话就在3x中找。该条目需要在 `pubspec.yaml` 中指定。

#### 加载 images

加载图片，请在widget的 `build` 方法中使用[`AssetImage`]({{site.api}}/flutter/painting/AssetImage-class.html)类。

例如，你的应用程序可以从上面的资源声明中加载背景图片：

```dart
Widget build(BuildContext context) {
  // ...
  return DecoratedBox(
    decoration: BoxDecoration(
      image: DecorationImage(
        image: AssetImage('graphics/background.png'),
        // ...
      ),
      // ...
    ),
  );
  // ...
}
```

使用默认的资源bundle加载资源时，系统会自动处理分辨率等。
（如果你使用一些更低级别的类，如[`ImageStream`]({{site.api}}/flutter/painting/ImageStream-class.html)或 [`ImageCache`]({{site.api}}/flutter/painting/ImageCache-class.html), 你需要注意scale相关的参数。)

### 依赖包中的资源图片

加载依赖[package](/docs/development/packages-and-plugins/using-packages)中的图像，
必须给[`AssetImage`]({{site.api}}/flutter/painting/AssetImage-class.html)提供 `package` 参数。

例如，你的应用程序依赖于一个名为 `my_icons`的package，它的目录结构如下：

```
  .../pubspec.yaml
  .../icons/heart.png
  .../icons/1.5x/heart.png
  .../icons/2.0x/heart.png
  ...etc.
```

然后加载image, 使用：

<!-- skip -->
```dart
 AssetImage('icons/heart.png', package: 'my_icons')
```
package使用的本身的Assets也需要加上 `package` 参数来获取。

#### 打包 package assets

如果在 `pubspec.yaml` 文件中声明了资源文件，它将会打包到响应的package中。
特别是，package本身使用的资源必须在 `pubspec.yaml` 中指定。

package也可以选择在其 `lib/` 文件夹中包含未在 `pubspec.yaml` 文件中声明的资源。
在这种情况下，对于要打包的图片，应用程序必须在 `pubspec.yaml`中指定包含哪些图像。 
例如，一个名为 `fancy_backgrounds` 的包，可能包含以下文件：

```
  .../lib/backgrounds/background1.png
  .../lib/backgrounds/background2.png
  .../lib/backgrounds/background3.png
```

总而言之，要包含第一张图像，必须在 `pubspec.yaml` 的 `assets` 部分中声明它：

```yaml
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png
```

 `lib/` 是隐含的，所以它不应该包含在资源路径中。

## 平台共享 assets

在不同平台读取Flutter assets，Android是通过AssetManager，iOS是NSBundle。

### Android

在安卓平台上，assets通过[AssetManager API]({{site.android-dev}}/reference/android/content/res/AssetManager)读取。
通过[PluginRegistry.Registrar]({{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html)的 `lookupKeyForAsset`方法，
或者[FlutterView]({{site.api}}/javadoc/io/flutter/view/FlutterView.html)的 `getLookupKeyForAsset` 方法来获取文件路径，
然后[AssetManager API]({{site.android-dev}}/reference/android/content/res/AssetManager)的
[openFd]({{site.android-dev}}/reference/android/content/res/AssetManager#openFd(java.lang.String))根据文件路径得到文件描述符。
开发插件时可以使用 `PluginRegistry.Registrar` ，而开发应用程序使用平台视图时， `FlutterView` 是最好的选择。

举个例子，假设你在pubspec.yaml中这样指定：

```yaml
flutter:
  assets:
    - icons/heart.png
```

在你的Flutter应用程序对应以下结构。

```
  .../pubspec.yaml
  .../icons/heart.png
  ...etc.
```

想要在Java插件中访问 `icons/heart.png` ；

```java
AssetManager assetManager = registrar.context().getAssets();
String key = registrar.lookupKeyForAsset("icons/heart.png");
AssetFileDescriptor fd = assetManager.openFd(key);
```

### iOS

在iOS平台上，assets通过[mainBundle](https://developer.apple.com/documentation/foundation/nsbundle/1410786-mainbundle)读取。
通过[FlutterPluginRegistrar]({{site.api}}/objcdoc/Protocols/FlutterPluginRegistrar.html)的 `lookupKeyForAsset` 或者 `lookupKeyForAsset:fromPackage:` 方法获取文件路径，
同样[FlutterViewController]({{site.api}}/objcdoc/Classes/FlutterViewController.html)的 `lookupKeyForAsset:` 或者 `lookupKeyForAsset:fromPackage:` 方法也可以获取文件路径，
然后[AssetManager API]({{site.android-dev}}/reference/android/content/res/AssetManager)的
[openFd]({{site.android-dev}}/reference/android/content/res/AssetManager#openFd(java.lang.String))根据文件路径得到文件描述符。
开发插件时可以使用 `FlutterPluginRegistrar` ，而开发应用程序使用平台视图时， `FlutterViewController` 是最好的选择。

举个例子，假设你的Flutter配置和上面一样。

想要在Objective-C插件中访问 `icons/heart.png` ；

```objective-c
NSString* key = [registrar lookupKeyForAsset:@"icons/heart.png"];
NSString* path = [[NSBundle mainBundle] pathForResource:key ofType:nil];
```

这有一个更完整的实例可以理解Flutter的应用，[video_player plugin]({{site.pub}}/packages/video_player)。

## 平台 assets

某些场景可以直接在平台项目中使用assets。以下是在Flutter框架加载并运行之前使用资源的两种常见情况。

### 更新桌面icon

更新你的Flutter应用程序启动图标，和原生Android或iOS应用程序中更新启动图标的方法相同。

![启动图标](/images/assets-and-images/icon.png)

#### Android

在Flutter项目的根目录中，导航到 `.../android/app/src/main/res` 路径。各种位图资源文件夹，
比如 `mipmap-hdpi` ，已包含占位符图像 `ic_launcher.png` 。 只需按照[Android开发指南]({{site.android-dev}}/training/multiscreen/screendensities)中的说明， 将其替换为所需的资源，并遵守每种屏幕分辨率的建议图标大小标准。

![Android图标位置](/images/assets-and-images/android-icon-path.png)

{{site.alert.note}}
  如果你重命名.png文件，则还必须在 `AndroidManifest.xml` 中 `<application>` 
  标签的 `android:icon` 属性中更新名称。
{{site.alert.end}}

#### iOS

在你的Flutter项目的根目录中，导航到 `.../ios/Runner` 路径。该目录中 `Assets.xcassets/AppIcon.appiconset`
已经包含占位符图片，只需将它们替换为适当大小的图片，[iOS开发指南](https://developer.apple.com/ios/human-interface-guidelines/graphics/app-icon)，保持文件名称不变。

![iOS图标位置](/images/assets-and-images/ios-icon-path.png)

### 更新启动图

<p align="center">
  <img src="/images/assets-and-images/launch-screen.png" alt="Launch screen" />
</p>

在Flutter框架加载时，Flutter会使用原生平台机制绘制启动页。此启动页将持续到Flutter渲染应用程序的第一帧。

{{site.alert.note}}
  这意味着如果你不在应用程序的 `main()` 方法中调用[runApp()]({{site.api}}/flutter/widgets/runApp.html)函数 （或者更具体地说，如果你不调用[`window.render()`]({{site.api}}/flutter/dart-ui/Window/render.html)去响应[`window.onDrawFrame`]({{site.api}}/flutter/dart-ui/Window/onDrawFrame.html)）的话， 启动页将永远持续显示。
{{site.alert.end}}

#### Android

将启动屏幕"splash screen"添加到你的Flutter应用程序， 请导航至 `.../android/app/src/main` 路径。
在 `res/drawable/launch_background.xml` 文件中 ，通过使用
[图层列表]({{site.android-dev}}/guide/topics/resources/drawable-resource#LayerList) XML来实现自定义启动页。
现有模板提供了一个示例，用于将图片添加到白色启动页的中间（注释代码中）。你也可以取消注释使用 [可绘制对象资源]({{site.android-dev}}/guide/topics/resources/drawable-resource) 来实现预期效果。

#### iOS

将图片添加到启动屏幕"splash screen"的中心，请导航至 `.../ios/Runner` 路径。
在 `Assets.xcassets/LaunchImage.imageset` ，拖入图片，并命名为 `LaunchImage.png`， `LaunchImage@2x.png`，`LaunchImage@3x.png`。 如果你使用不同的文件名，
那你还必须更新同一目录中的 `Contents.json` 文件中对应的名称。

You can also fully customize your launch screen storyboard in Xcode by opening `.../ios/Runner.xcworkspace`. Navigate to `Runner/Runner` in the Project Navigator and drop in images by opening `Assets.xcassets` or do any customization using the Interface Builder in `LaunchScreen.storyboard`.

你也可以通过打开 `.../ios/Runner.xcworkspace` ，完全自定义storyboard。
在Project Navigator中导航到 `Runner/Runner` ，然后打开 `Assets.xcassets` 拖入图片，或者
在 `LaunchScreen.storyboard` 中使用Interface Builder进行自定义。

![Xcode中添加启动图](/images/assets-and-images/ios-launchscreen-xcode.png)
