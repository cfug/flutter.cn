---
title: Adding assets and images
title: 添加资源和图片
short-title: Assets and images
short-title: 资源和图片
---

Flutter apps can include both code and _assets_ (sometimes called
resources). An asset is a file that is bundled and deployed with your
app, and is accessible at runtime. Common types of assets include
static data (for example, JSON files), configuration files, icons, and
images (JPEG, WebP, GIF, animated WebP/GIF, PNG, BMP, and WBMP).

Flutter 应用程序包含代码和 _assets_（有时称为资源）。资源是被打包到应用程序安装包中，
可以在运行时访问的一种文件。常见的资源类型包括静态数据（例如 JSON 文件），配置文件，图标和
图片（JPEG，WebP，GIF，动画 WebP / GIF，PNG，BMP 和 WBMP）。

## Specifying assets

## 指定资源

Flutter uses the [`pubspec.yaml`][] file,
located at the root of your project,
to identify assets required by an app.

Flutter 使用 [`pubspec.yaml`]({{site.dart-site}}/tools/pub/pubspec) 文件，位于项目根目录, 来识别应用程序所需的资源。

Here is an example:

下面举个例子:

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

To include all assets under a directory,
specify the directory name with the `/` character at the end:

如果要包含一个目录下的所有 assets，需要在目录名称的结尾加上  `/`：

```yaml
flutter:
  assets:
    - assets/
```

Note that only files located directly in the directory are
included. To add files located in subdirectories,
create an entry per directory.

注意只包含目录下根节点的所有文件，如果要添加子目录下的文件，需要给每个目录创建节点。

### Asset bundling

### 资源打包

The `assets` subsection of the `flutter` section specifies files that
should be included with the app. Each asset is identified by an
explicit path (relative to the `pubspec.yaml` file) where the asset
file is located. The order in which the assets are declared does not
matter. The actual directory used (`assets` in this case) does not
matter.

该 `assets` 部分的 `flutter` 部分需要指定包含在应用程序中的文件。
每个资源都通过相对于 `pubspec.yaml` 文件所在位置的路径进行标识。
资源的声明顺序是无关紧要的。
资源的实际目录可以是任意文件夹（在本示例中是 `assets`）

During a build, Flutter places assets into a special archive called
the _asset bundle_, which apps can read from at runtime.

在一次构建中，Flutter 将 assets 放到 _asset bundle_ 的特殊归档中，以便应用程序在运行时读取它们。

### Asset variants

### 资源变体

The build process supports the notion of asset variants: different
versions of an asset that might be displayed in different contexts.
When an asset's path is specified in the `assets` section of
`pubspec.yaml`, the build process looks for any files with the same
name in adjacent subdirectories. Such files are then included in the
asset bundle along with the specified asset.

构建过程支持 asset 变体：不同版本的资源可能会显示在不同的上下文中。
在 `pubspec.yaml` 的 `assets` 部分中指定的资源路径，
会在构建过程中，查找同级子目录中相同名称的任何文件。
这些文件会与指定的资源一起被打包在资源 bundle 中。

For example, if you have the following files in your application
directory:

例如，你的应用程序目录中有以下文件：

```
  .../pubspec.yaml
  .../graphics/my_icon.png
  .../graphics/background.png
  .../graphics/dark/background.png
  ...etc.
```

And your `pubspec.yaml` file contains the following:

...同时 `pubspec.yaml` 文件包含：

```yaml
flutter:
  assets:
    - graphics/background.png
```

Then both `graphics/background.png` and `graphics/dark/background.png`
are included in your asset bundle. The former is considered the
_main asset_, while the latter is considered a _variant_.

...那么这两个图片， `graphics/background.png` 和 `graphics/dark/background.png`
将被打包在你的资源 bundle 中。
前者被称为是 _main asset_，后者被称为是一种变体（ _variant_）。

If, on the other hand, the graphics directory is specified:

如果指定的是 graphics 目录：

```yaml
flutter:
  assets:
    - graphics/
```

Then the `graphics/my_icon.png`, `graphics/background.png`
and `graphics/dark/background.png` files are also included.

... 那么 `graphics/my_icon.png`，
`graphics/background.png` 和 `graphics/dark/background.png` 同时被包含。

Flutter uses asset variants when choosing resolution-appropriate
images. In the future, this mechanism might be extended to
include variants for different locales or regions,
reading directions, and so on.

在选择当前设备分辨率的图片时，Flutter 会使用资源变体；见下文。
将来，这种机制可能会扩展到本地化、阅读提示等方面。

## Loading assets

## 加载 assets

Your app can access its assets through an
[`AssetBundle`][] object.

你的应用程序可以通过 [`AssetBundle`][] 对象访问其资源。

The two main methods on an asset bundle allow you to load a
string/text asset (`loadString()`) or an image/binary asset (`load()`)
out of the bundle, given a logical key. The logical key maps to the path
to the asset specified in the `pubspec.yaml` file at build time.

Asset bundle 通过指定一个逻辑键（key），允许你读取 string/text（`loadString`）
和 image/binary（`load`）。在编译期间，
这个逻辑键（key）会映射在 `pubspec.yaml` 中指定的资源路径。

### Loading text assets

### 加载文本 assets

Each Flutter app has a [`rootBundle`][]
object for easy access to the main asset bundle. It is possible to
load assets directly using the `rootBundle` global static from
`package:flutter/services.dart`.

每个 Flutter 应用程序都有一个 [`rootBundle`][] 对象， 
可以轻松访问主资源 bundle 。还可以直接使用 `package:flutter/services.dart` 中
全局静态的 `rootBundle` 来加载资源。

However, it's recommended to obtain the AssetBundle for the current
BuildContext using [`DefaultAssetBundle`][].
Rather than the default asset bundle that was built with the app, this
approach enables a parent widget to substitute a different AssetBundle
at run time, which can be useful for localization or testing
scenarios.

但是，如果获取当前 BuildContext 的 AssetBundle，建议
使用 [`DefaultAssetBundle`][]。
这种方式不是使用应用程序构建的默认资源 bundle，而是让父级 widget 在
运行时替换的不同的 AssetBundle，这对于本地化或测试场景很有用。

Typically, you'll use `DefaultAssetBundle.of()` to indirectly load an
asset, for example a JSON file, from the app's runtime `rootBundle`.

通常，你可以从应用程序运行时的 `rootBundle` 中，间接使用 `DefaultAssetBundle.of()` 
来加载资源（例如JSON文件）。

{% comment %}
Need example here to show obtaining the AssetBundle for the current
BuildContext using DefaultAssetBundle.of
这里需要举个例子说明使用 DefaultAssetBundle.of 来获取当前 BuildContext 的 AssetBundle
{% endcomment %}

Outside of a Widget context, or when a handle to an AssetBundle is not
available, you can use `rootBundle` to directly load such assets.
For example:

在 Widget 上下文之外，或 AssetBundle 的句柄不可用时，你可以使用 `rootBundle` 
直接加载这些 assets，例如：

```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

### Loading images

### 加载 images

Flutter can load resolution-appropriate images for the current device
pixel ratio.

Flutter 可以为当前设备加载适合其分辨率的图像。

#### Declaring resolution-aware image assets {#resolution-aware}

#### 声明分辨率相关的图片 assets

[`AssetImage`][] understands how to map a logical requested
asset onto one that most closely matches the current
[device pixel ratio][].
In order for this mapping to work, assets should be arranged
according to a particular directory structure:

[`AssetImage`][]
可以将逻辑请求资源映射到最接近当前设备 [device pixel ratio][]的资源。
为了使这种映射起作用，应该根据特定的目录结构来保存资源：

```
  .../image.png
  .../Mx/image.png
  .../Nx/image.png
  ...etc.
```

Where _M_ and _N_ are numeric identifiers that correspond to the
nominal resolution of the images contained within.
In other words, they specify the device pixel ratio that
the images are intended for.

...其中 _M_ 和 _N_  是数字标识符，对应于其中包含的图像的分辨率，换句话说，
它们指定不同设备像素比例的图片。

The main asset is assumed to correspond to a resolution of 1.0.
For example, consider the following asset layout for an
image named `my_icon.png`:

主资源默认对应于 1.0 倍的分辨率图片。比如下面的图片 `my_icon.png`：

```
  .../my_icon.png
  .../2.0x/my_icon.png
  .../3.0x/my_icon.png
```

On devices with a device pixel ratio of 1.8, the asset
`.../2.0x/my_icon.png` would be chosen.
For a device pixel ratio of 2.7, the asset
`.../3.0x/my_icon.png` would be chosen.

而在设备像素比率为 1.8 的设备上，对应是 `.../2.0x/my_icon.png` 。
如果是 2.7 的设备像素比，对应是 `.../3.0x/my_icon.png` 。

If the width and height of the rendered image are not specified
on the `Image` widget, the nominal resolution is used to scale
the asset so that it occupies the same amount of screen space
as the main asset would have, just with a higher resolution.
That is, if `.../my_icon.png` is 72px by 72px, then
`.../3.0x/my_icon.png` should be 216px by 216px;
but they both render into 72px by 72px (in logical pixels)
if width and height are not specified.

如果在 `Image` widget 上未指定渲染图像的宽度和高度，
通常会扩展资源来保证与主资源相同的屏幕空间量，
并不是相同的物理像素，只是分辨率更高。
换句话说，`.../my_icon.png` 是 72 px 乘 72 px，
那么 `.../3.0x/my_icon.png` 应该是 216 px 乘 216 px；
但如果未指定宽度和高度，
它们都将渲染为 72 px 乘 72 px（以逻辑像素为单位）。

Each entry in the asset section of the `pubspec.yaml`
should correspond to a real file, with the exception of
the main asset entry. If the main asset entry does not correspond
to a real file, then the asset with the lowest resolution
is used as the fallback for devices with device pixel
ratios below that resolution. The entry should still
be included in the `pubspec.yaml` manifest, however.

在 `pubspec.yaml` 中资源部分的每一项都应与实际文件相对应，
除过主资源节点。当主资源缺少某个文件时，会按分辨率从低到高的顺序去选择，
也就是说 1x 中没有的话会在 2x 中找，2x 中还没有的话就在 3x 中找。
该条目需要在 `pubspec.yaml` 中指定。

#### Loading images

#### 加载 images

To load an image, use the [`AssetImage`][]
class in a widget's `build` method.

加载图片，请在 widget 的 `build` 方法中使用 [`AssetImage`][] 类。

For example, your app can load the background image from the asset
declarations above:

例如，你的应用程序可以从上面的资源声明中加载背景图片：

```dart
Widget build(BuildContext context) {
  return Image(image: AssetImage('graphics/background.png'));
}
```

Anything using the default asset bundle inherits resolution
awareness when loading images. (If you work with some of the lower
level classes, like [`ImageStream`][] or [`ImageCache`][],
you'll also notice parameters related to scale.)

使用默认的资源 bundle 加载资源时，系统会自动处理分辨率等。
（如果你使用一些更低级别的类，如 [`ImageStream`][] 或
[`ImageCache`]({{site.api}}/flutter/painting/ImageCache-class.html)，
你需要注意 scale 相关的参数)。

### Asset images in package dependencies {#from-packages}

### 依赖包中的资源图片

To load an image from a [package][] dependency,
the `package` argument must be provided to [`AssetImage`][].

加载依赖 [package][] 中的图像，
必须给 [`AssetImage`][] 提供 `package` 参数。

For instance, suppose your application depends on a package
called `my_icons`, which has the following directory structure:

例如，你的应用程序依赖于一个名为 `my_icons` 的 package，它的目录结构如下：

```
  .../pubspec.yaml
  .../icons/heart.png
  .../icons/1.5x/heart.png
  .../icons/2.0x/heart.png
  ...etc.
```

To load the image, use:

然后加载 image, 使用：

<!-- skip -->
```dart
 AssetImage('icons/heart.png', package: 'my_icons')
```

Assets used by the package itself should also be fetched
using the `package` argument as above.

package 使用的本身的 Assets 也需要加上 `package` 参数来获取。

#### Bundling of package assets

#### 打包 assets

If the desired asset is specified in the `pubspec.yaml`
file of the package, it's bundled automatically with the
application. In particular, assets used by the package
itself must be specified in its `pubspec.yaml`.

如果在 `pubspec.yaml` 文件中声明了资源文件，它将会打包到响应的 package 中。
特别是，package 本身使用的资源必须在 `pubspec.yaml` 中指定。

A package can also choose to have assets in its `lib/`
folder that are not specified in its `pubspec.yaml` file.
In this case, for those images to be bundled,
the application has to specify which ones to include in its
`pubspec.yaml`. For instance, a package named `fancy_backgrounds`
could have the following files:

package 也可以选择在其 `lib/`
文件夹中包含未在 `pubspec.yaml` 文件中声明的资源。
在这种情况下，对于要打包的图片，
应用程序必须在 `pubspec.yaml` 中指定包含哪些图像。 
例如，一个名为 `fancy_backgrounds` 的包，
可能包含以下文件：

```
  .../lib/backgrounds/background1.png
  .../lib/backgrounds/background2.png
  .../lib/backgrounds/background3.png
```

To include, say, the first image, the `pubspec.yaml` of the
application should specify it in the `assets` section:

总而言之，要包含第一张图像，必须在 `pubspec.yaml` 的 `assets` 部分中声明它：

```yaml
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png
```

The `lib/` is implied, so it should not be included in the asset path.

 `lib/` 是隐含的，所以它不应该包含在资源路径中。

## Sharing assets with the underlying platform

## 平台共享 assets

Flutter assets are readily available to platform code via
AssetManager on Android and NSBundle on iOS.


在不同平台读取 Flutter assets，Android 是通过 AssetManager，iOS 是 NSBundle。

### Loading Flutter assets in Android

### 在 Android 中加载 Flutter 资源文件

On Android the assets are available via the [AssetManager API][].
The lookup key used in, for instance [openFd][], is obtained from
`lookupKeyForAsset` on [PluginRegistry.Registrar][] or
`getLookupKeyForAsset` on [FlutterView][].
`PluginRegistry.Registrar` is available when developing a plugin
while `FlutterView` would be the choice when developing an
app including a platform view.

在 Android 平台上，assets 通过 [AssetManager API][] 读取。
通过 [PluginRegistry.Registrar][] 的 `lookupKeyForAsset` 方法，
或者 [FlutterView][] 的 `getLookupKeyForAsset` 方法来获取文件路径，
然后 [AssetManager API][] 的 [openFd][] 根据文件路径得到文件描述符。
开发插件时可以使用 `PluginRegistry.Registrar`，
而开发应用程序使用平台视图时，`FlutterView` 是最好的选择。

As an example, suppose you have specified the following
in your pubspec.yaml

举个例子，假设你在 pubspec.yaml 中这样指定：

```yaml
flutter:
  assets:
    - icons/heart.png
```

This reflects the following structure in your Flutter app.

在你的 Flutter 应用程序对应以下结构。

```
  .../pubspec.yaml
  .../icons/heart.png
  ...etc.
```

To access `icons/heart.png` from your Java plugin code,
do the following:

想要在 Java 插件中访问 `icons/heart.png`；

```java
AssetManager assetManager = registrar.context().getAssets();
String key = registrar.lookupKeyForAsset("icons/heart.png");
AssetFileDescriptor fd = assetManager.openFd(key);
```

### Loading Flutter assets in iOS

### 在 iOS 中加载 Flutter 资源文件

On iOS the assets are available via the [mainBundle][].
The lookup key used in, for instance [pathForResource:ofType:][],
is obtained from `lookupKeyForAsset` or `lookupKeyForAsset:fromPackage:`
on [FlutterPluginRegistrar][], or `lookupKeyForAsset:` or
`lookupKeyForAsset:fromPackage:` on [FlutterViewController][].
`FlutterPluginRegistrar` is available when developing
a plugin while `FlutterViewController` would be the choice
when developing an app including a platform view.

在 iOS 平台上，assets 通过 [mainBundle][] 读取。
通过 [FlutterPluginRegistrar][] 的 `lookupKeyForAsset` 
或者 `lookupKeyForAsset:fromPackage:` 方法获取文件路径，
同样 [FlutterViewController][]的 `lookupKeyForAsset:` 
或者 `lookupKeyForAsset:fromPackage:` 方法也可以获取文件路径，
然后 [AssetManager API][] 的 [openFd][] 根据文件路径得到文件描述符。
开发插件时可以使用 `FlutterPluginRegistrar`，
而开发应用程序使用平台视图时， `FlutterViewController` 是最好的选择。

As an example, suppose you have the Flutter setting from above.

举个例子，假设你的 Flutter 配置和上面一样。

To access `icons/heart.png` from your Objective-C plugin code you
would do the following:

要在 Objective-C 插件中访问 `icons/heart.png`：

```objective-c
NSString* key = [registrar lookupKeyForAsset:@"icons/heart.png"];
NSString* path = [[NSBundle mainBundle] pathForResource:key ofType:nil];
```

For a more complete example, see the implementation of the
Flutter [video_player plugin][].

这有一个更完整的实例可以理解 Flutter 的应用：[video_player plugin][]。

The plugin [ios_platform_images][] on pub.dev wraps up this logic in a
convenient category.  It allows writing:

pub.dev 上的 [ios_platform_images][] plugin 将这些逻辑封装成方便的类别。
它允许编写：

**Objective-C:**
```objective-c
[UIImage flutterImageWithName:@"icons/heart.png"];
```

**Swift:**
```swift
UIImage.flutterImageNamed("icons/heart.png")
```

### Loading iOS images in Flutter

### 在 Flutter 中加载 iOS 的图片

When implementing Flutter as
[Add-to-app](/docs/development/add-to-app/ios/), you might have images hosted in
iOS which you want to use in Flutter.  For accomplishing that there is a plugin
available on pub.dev called [ios_platform_images][].

## Platform assets

## 平台 assets

There are other occasions to work with assets in the
platform projects directly. Below are two common cases
where assets are used before the Flutter framework is
loaded and running.

某些场景可以直接在平台项目中使用 assets。
以下是在 Flutter 框架加载并运行之前使用资源的两种常见情况。

### Updating the app icon

### 更新桌面icon

Updating a Flutter application's launch icon works the same
way as updating launch icons in native Android or iOS applications.

更新你的 Flutter 应用程序启动图标，
和原生 Android 或 iOS 应用程序中更新启动图标的方法相同。

![Launch icon](/images/assets-and-images/icon.png)

![启动图标](/images/assets-and-images/icon.png)

#### Android

In your Flutter project's root directory, navigate to
`.../android/app/src/main/res`. The various bitmap resource
folders such as `mipmap-hdpi` already contain placeholder images named
`ic_launcher.png`. Replace them with your desired assets
respecting the recommended icon size per screen density
as indicated by the [Android Developer Guide][].

在 Flutter 项目的根目录中，导航到 `.../android/app/src/main/res` 路径。
各种位图资源文件夹，比如 `mipmap-hdpi`，已包含占位符图像 `ic_launcher.png`。 
只需按照 [Android 开发指南][Android Developer Guide]中的说明，
将其替换为所需的资源，并遵守每种屏幕分辨率的建议图标大小标准。

![Android icon location](/images/assets-and-images/android-icon-path.png)
![Android 图标位置](/images/assets-and-images/android-icon-path.png)

{{site.alert.note}}

  If you rename the .png files, you must also update the
  corresponding name in your `AndroidManifest.xml`'s
  `<application>` tag's `android:icon` attribute.

  如果你重命名 .png 文件，则还必须在 `AndroidManifest.xml` 
  中 `<application>` 标签的 `android:icon` 属性中更新名称。

{{site.alert.end}}

#### iOS

In your Flutter project's root directory,
navigate to `.../ios/Runner`. The
`Assets.xcassets/AppIcon.appiconset` directory already contains
placeholder images. Replace them with the appropriately
sized images as indicated by their filename as dictated by the
Apple [Human Interface Guidelines][].
Keep the original file names.

在你的 Flutter 项目的根目录中，导航到 `.../ios/Runner` 路径。
该目录中 `Assets.xcassets/AppIcon.appiconset`已经包含占位符图片，
只需将它们替换为适当大小的图片，
并且根据 [iOS 开发指南][Human Interface Guidelines]，文件名称保持不变。

![iOS icon location](/images/assets-and-images/ios-icon-path.png)

![iOS 图标位置](/images/assets-and-images/ios-icon-path.png)

### Updating the launch screen

### 更新启动图

<p align="center">
  <img src="/images/assets-and-images/launch-screen.png" alt="Launch screen" />
</p>

Flutter also uses native platform mechanisms to draw
transitional launch screens to your Flutter app while the
Flutter framework loads. This launch screen persists until
Flutter renders the first frame of your application.

在 Flutter 框架加载时，Flutter 会使用原生平台机制绘制启动页。
此启动页将持续到 Flutter 渲染应用程序的第一帧。

{{site.alert.note}}

  This implies that if you don't call [runApp()][] in the
  `main()` function of your app (or more specifically, if you don't call
  [`window.render()`][] in response to [`window.onDrawFrame`][]),
  the launch screen persists forever.

  这意味着如果你不在应用程序的 `main()` 方法中调用 [runApp()][] 函数
  （或者更具体地说，如果你不调用 [`window.render()`][] 去响应 
  [`window.onDrawFrame`][]的话， 启动页将永远持续显示。

{{site.alert.end}}

#### Android

To add a "splash screen" to your Flutter application,
navigate to `.../android/app/src/main`.
In `res/drawable/launch_background.xml`,
use this [layer list drawable][] XML to customize
the look of your launch screen. The existing template provides
an example of adding an image to the middle of a white splash
screen in commented code. You can uncomment it or use other
[drawables][] to achieve the intended effect.

将启动屏幕「splash screen」添加到你的 Flutter 应用程序， 
请导航至 `.../android/app/src/main` 路径。
在 `res/drawable/launch_background.xml` 文件中 ，通过使用
[图层列表][layer list drawable]  XML 来实现自定义启动页。
现有模板提供了一个示例，用于将图片添加到白色启动页的中间（注释代码中）。
你也可以取消注释使用 [可绘制对象资源][drawables] 来实现预期效果。

For more details, see [Adding a splash screen and launch screen to an Android app](/docs/development/add-to-app/android/add-splash-screen).

更多详细信息，请查看[在 Android 应用中添加闪屏页与启动页](/docs/development/add-to-app/android/add-splash-screen)。

#### iOS

To add an image to the center of your "splash screen",
navigate to `.../ios/Runner`.
In `Assets.xcassets/LaunchImage.imageset`,
drop in images named `LaunchImage.png`,
`LaunchImage@2x.png`, `LaunchImage@3x.png`.
If you use different filenames,
update the `Contents.json` file in the same directory.

将图片添加到启动屏幕「splash screen」的中心，请导航至 `.../ios/Runner` 路径。
在 `Assets.xcassets/LaunchImage.imageset` ，拖入图片，
并命名为 `LaunchImage.png`， `LaunchImage@2x.png`，`LaunchImage@3x.png`。 
如果你使用不同的文件名，
那你还必须更新同一目录中的 `Contents.json` 文件中对应的名称。

You can also fully customize your launch screen storyboard
in Xcode by opening `.../ios/Runner.xcworkspace`.
Navigate to `Runner/Runner` in the Project Navigator and
drop in images by opening `Assets.xcassets` or do any
customization using the Interface Builder in
`LaunchScreen.storyboard`.

你也可以通过打开 `.../ios/Runner.xcworkspace` ，完全自定义 storyboard。
在 Project Navigator 中导航到 `Runner/Runner` ，然后打开 `Assets.xcassets` 拖入图片，或者
在 `LaunchScreen.storyboard` 中使用 Interface Builder 进行自定义。

![Adding launch icons in Xcode](/images/assets-and-images/ios-launchscreen-xcode.png)
![Xcode 中添加启动图](/images/assets-and-images/ios-launchscreen-xcode.png)


[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html
[`AssetImage`]: {{site.api}}/flutter/painting/AssetImage-class.html
[`DefaultAssetBundle`]: {{site.api}}/flutter/widgets/DefaultAssetBundle-class.html
[`ImageCache`]: {{site.api}}/flutter/painting/ImageCache-class.html
[`ImageStream`]: {{site.api}}/flutter/painting/ImageStream-class.html
[`pubspec.yaml`]: {{site.dart-site}}/tools/pub/pubspec
[`rootBundle`]: {{site.api}}/flutter/services/rootBundle.html
[`window.onDrawFrame`]: {{site.api}}/flutter/dart-ui/Window/onDrawFrame.html
[`window.render()`]: {{site.api}}/flutter/dart-ui/Window/render.html
[Android Developer Guide]: {{site.android-dev}}/training/multiscreen/screendensities
[AssetManager API]: {{site.android-dev}}/reference/android/content/res/AssetManager
[device pixel ratio]: {{site.api}}/flutter/dart-ui/Window/devicePixelRatio.html
[drawables]: {{site.android-dev}}/guide/topics/resources/drawable-resource
[FlutterPluginRegistrar]: {{site.api}}/objcdoc/Protocols/FlutterPluginRegistrar.html
[FlutterView]: {{site.api}}/javadoc/io/flutter/view/FlutterView.html
[FlutterViewController]: {{site.api}}/objcdoc/Classes/FlutterViewController.html
[Human Interface Guidelines]: https://developer.apple.com/ios/human-interface-guidelines/graphics/app-icon
[layer list drawable]: {{site.android-dev}}/guide/topics/resources/drawable-resource#LayerList
[mainBundle]: https://developer.apple.com/documentation/foundation/nsbundle/1410786-mainbundle
[openFd]: {{site.android-dev}}/reference/android/content/res/AssetManager#openFd(java.lang.String
[package]: /docs/development/packages-and-plugins/using-packages
[pathForResource:ofType:]: https://developer.apple.com/documentation/foundation/nsbundle/1410989-pathforresource
[PluginRegistry.Registrar]: {{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html
[video_player plugin]: {{site.pub}}/packages/video_player
[ios_platform_images]: {{site.pub}}/packages/ios_platform_images