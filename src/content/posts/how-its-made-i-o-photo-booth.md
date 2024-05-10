---
title: 用 Flutter 和 Firebase 轻松构建 Web 应用
toc: true
---

![]({{site.flutter-files-cn}}/posts/images/2021/11/da90dd75700e2.png)

*作者 / Very Good Ventures Team*

我们 (Very Good Ventures 团队) 与 Google 合作，在今年 5 月推出了 [照相亭互动体验](https://photobooth.flutter.cn/) (Flutter Photo Booth)。你可以与深受喜爱的 Google 吉祥物合影: [Flutter 的 Dash](https://flutter.cn/dash)、Android Jetpack、Chrome 的 Dino 和 Firebase 的 Sparky，并用各种贴纸装饰照片，包括派对帽、披萨、时髦眼镜等。当然，你也可以通过社交媒体下载并分享，或者用作你的个人头像！

![△ Flutter 的 Dash、Firebase 的 Sparky、Android Jetpack 和 Chrome 的 Dino]({{site.flutter-files-cn}}/posts/images/2021/06/Rjow8V.png)

△ Flutter 的 Dash、Firebase 的 Sparky、Android Jetpack 和 Chrome 的 Dino

我们使用 [Flutter web](https://flutter.cn/web) 和 [Firebase](https://firebase.google.cn/) 构建了 Flutter 照相亭。因为 [Flutter 现在支持打造 Web 应用](https://flutter.cn/posts/whats-new-in-flutter-2-0)，我们认为这将是一个很好的方式，可以让世界各地的与会者在线上轻松访问这一应用。Flutter web 消除了必须通过应用商店安装应用的障碍，同时用户还可以灵活选择运行应用的设备: 移动设备、桌面设备或平板电脑。因此，只要能使用浏览器，用户便可无需下载直接使用 Flutter 照相亭。

尽管 Flutter 照相亭旨在提供 Web 体验，但所有代码均采用与平台无关的架构编写而成。当相机插件等原生功能的支持在各个平台就绪后，这套代码即可在所有平台 (桌面、Web 和移动设备) 通用。

## **使用 Flutter 构建虚拟照相亭**

**构建 Web 版 Flutter 相机插件**

第一个挑战即在 Web 上为 Flutter 构建摄像头插件。最初，我们联系了 [Baseflow](https://www.baseflow.com/) 团队，因为他们负责维护现有的开源 [Flutter 摄像头插件](https://github.com/Baseflow/flutter-plugins)。Baseflow 致力于构建适用于 iOS 和 Android 的一流摄像头插件支持，我们也很乐于与其合作，使用 [联合插件](https://docs.flutter.cn/development/packages-and-plugins/developing-packages#federated-plugins) 方法为插件提供 Web 支持。我们尽可能符合官方插件接口，以便我们可以在准备就绪时将其合并回官方插件。

我们确定了两个对于在 Flutter 中构建 Flutter 照相亭相体验至关重要的 API。

* **初始化摄像头:** 应用首先需要访问你的设备摄像头。对于桌面设备，访问的可能是网络摄像头，而对于移动设备，我们选择了访问前置摄像头。我们还提供了 1080p 的预期分辨率，以根据用户设备类型充分提高拍摄质量。
* **拍照:** 我们使用了内置的 [HtmlElementView](https://api.flutter.cn/flutter/widgets/HtmlElementView-class.html)，该控件使用平台视图将原生 Web 元素渲染为 Flutter widget。在此项目中，我们将 [VideoElement](https://api.flutter.cn/flutter/dart-html/VideoElement-class.html) 渲染为原生 HTML 元素，这便是你在拍照前会在屏幕上看到的内容。我们还使用了一个 [CanvasElement](https://api.flutter.cn/flutter/dart-html/CanvasElement-class.html)，用于在你点击拍照按钮时从媒体流中捕获图像。


```dart
Future<CameraImage> takePicture() async {
 final videoWidth = videoElement.videoWidth;
 final videoHeight = videoElement.videoHeight;
 final canvas = html.CanvasElement(
   width: videoWidth,
   height: videoHeight,
 );
 canvas.context2D
   ..translate(videoWidth, 0)
   ..scale(-1, 1)
   ..drawImageScaled(videoElement, 0, 0, videoWidth, videoHeight);
 final blob = await canvas.toBlob();
 return CameraImage(
   data: html.Url.createObjectUrl(blob),
   width: videoWidth,
   height: videoHeight,
 );
}
```

**摄像头权限**

在 Web 上完成 Flutter 摄像头插件后，我们创建了一个抽象布局，以根据相机权限显示不同的界面。例如，在等待你允许或拒绝使用浏览器摄像头时，或者如果没有可供访问的摄像头时，我们可以显示一条说明性消息。

```dart
Camera(
 controller: _controller,
 placeholder: (_) => const SizedBox(),
 preview: (context, preview) => PhotoboothPreview(
   preview: preview,
   onSnapPressed: _onSnapPressed,
 ),
 error: (context, error) => PhotoboothError(error: error),
)
```

在上面的抽象布局中，placeholder 会在应用等待你授予摄像头权限时返回初始界面。Preview 则会在你授予权限后返回真实的界面，并显示摄像头的实时视频流。结尾的 Error 构造语句则可以在错误发生时捕获错误并显示相应的消息。

**生成镜像照片**

我们的下一个挑战是生成镜像照片。如果我们照原样使用摄像头拍摄的照片，那么你看到的内容将与你在照镜子时所看到的内容不一样。[某些设备会提供专门处理这一问题的设置选项](https://9to5mac.com/2020/07/09/iphone-mirror-selfie-photos/)，所以，如果你用前置摄像头拍照，你看到的其实是照片的镜像版本。

在我们的第一种方法中，我们尝试捕捉默认的摄像头视图，然后围绕 y 轴对其进行 180 度翻转。这种方法似乎有效，但后来我们遇到了 [一个问题](https://github.com/flutter/flutter/issues/79519)，即 Flutter 偶尔会覆盖这个翻转，导致视频恢复到未镜像的版本。

在 Flutter 团队的帮助下，我们将 VideoElement 放在 [DivElement](https://api.flutter.cn/flutter/dart-html/DivElement-class.html) 中，并更新 VideoElement 以填充 DivElement 的宽度和高度，解决了这个问题。这样一来，我们能够为视频元素应用镜像，同时因为父元素是 div，所以不会被 Flutter 覆盖翻转效果。如此一来，我们便获得了所需的镜像摄像头视图！

![△ 未镜像的视图]({{site.flutter-files-cn}}/posts/images/2021/06/rPthpJ.png)

△ 未镜像的视图

![△ 镜像视图]({{site.flutter-files-cn}}/posts/images/2021/06/CRBd2x.png)

△ 镜像视图

**保持宽高比**

在大屏幕上保持 4:3 宽高比，以及在小屏幕上保持 3:4 宽高比，这个操作起来比看起来更难！保持宽高比非常重要，既要符合 Web 应用的整体设计，又要确保在社交媒体上分享照片时，令其中的像素呈现出清晰的本色效果。这是一项具有挑战性的任务，因为不同设备上内置摄像头的宽高比差异很大。

为了强制保持宽高比，应用首先使用 JavaScript [getUserMedia API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) 从设备摄像头请求可能的最大分辨率。随后，我们将此 API 传递到 VideoElement 流中，这便是你在摄像头视图中看到的内容 (当然是已镜像的版本)。我们还应用了 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) CSS 属性来确保视频元素能盖住其父级容器。我们使用 Flutter 自带的 AspectRatio widget 来设置宽高比。因此，摄像头不会对显示的宽高比做出任何假设；它始终返回支持的最大分辨率，然后遵守 Flutter 提供的约束条件 (在本例中为 4:3 或 3:4)。

```dart
final orientation = MediaQuery.of(context).orientation;
final aspectRatio = orientation == Orientation.portrait
   ? PhotoboothAspectRatio.portrait
   : PhotoboothAspectRatio.landscape;
return Scaffold(
 body: _PhotoboothBackground(
   aspectRatio: aspectRatio,
   child: Camera(
     controller: _controller,
     placeholder: (_) => const SizedBox(),
     preview: (context, preview) => PhotoboothPreview(
       preview: preview,
       onSnapPressed: () => _onSnapPressed(
         aspectRatio: aspectRatio,
       ),
     ),
     error: (context, error) => PhotoboothError(error: error),
   ),
 ),
);
```

**通过拖放添加贴纸**

Flutter 照相亭的一大重要体验在于与你最喜欢的 Google 吉祥物合影并添加道具。你能够在照片中拖放吉祥物和道具，以及调整大小和旋转，直到获得你喜欢的图像。你也会发现，在将吉祥物添加到屏幕上时，你可以拖动它们并调整其大小。吉祥物们还是有动画效果的——这种效果由 sprite sheet 来实现。

```dart
for (final character in state.characters)
 DraggableResizable(   
   canTransform: character.id == state.selectedAssetId,
   onUpdate: (update) {
     context.read<PhotoboothBloc>().add(
       PhotoCharacterDragged(
         character: character, 
         update: update,
       ),
     );
   },
   child: _AnimatedCharacter(name: character.asset.name),
 ),
```

为调整对象的大小，我们创建了可拖动、可调整大小且可以容纳其他 Flutter widget 的 widget，在本例中，即为吉祥物和道具。该 widget 会使用 [LayoutBuilder](https://api.flutter.cn/flutter/widgets/LayoutBuilder-class.html)，根据窗口的约束条件来处理 widget 的缩放。在内部，我们使用 [GestureDetector](https://api.flutter.cn/flutter/widgets/GestureDetector-class.html) 以挂接到 onScaleStart、onScaleUpdate 和 onScaleEnd 事件。这些回调提供了必要的手势详细信息，以反映用户对吉祥物和道具的操作。

通过多个 GestureDetector 回馈的数据，[Transform](https://api.flutter.cn/flutter/widgets/Transform-class.html) widget 和 4D 矩阵变换即可根据用户所做的各种手势处理缩放，以及旋转吉祥物和道具。

```dart
Transform(
 alignment: Alignment.center,
 transform: Matrix4.identity()
   ..scale(scale)
   ..rotateZ(angle),
 child: _DraggablePoint(...),
)
```

最后，我们创建了单独的 package 来确定你的设备是否支持触摸输入。可拖动、可调整大小的 widget 会根据触摸功能做出相应的调整。在具有触摸输入功能的设备上，你并不能看到调整大小的锚点和旋转图标，因为你可以通过双指张合和平移手势来直接操纵图像；而在不支持触摸输入的设备 (例如你的桌面设备) 上，我们则添加了锚点和旋转图标，以适应单击和拖动操作。

![]({{site.flutter-files-cn}}/posts/images/2021/06/XfyErj.png)

## **针对 Web 优化 Flutter**

**使用 Flutter 针对 Web 进行开发**

这是我们使用 Flutter 构建的首批纯 Web 项目之一，其与移动应用具有不同的特征。

我们需要确保该应用对任何设备上的任何浏览器都具有 [响应性和自适应性](https://docs.flutter.cn/development/ui/layout/adaptive-responsive)。也就是说，我们必须确保 Flutter 照相亭可以根据浏览器大小进行缩放，并且能够处理移动设备和 Web 端的输入。我们通过以下几种方式做到了这一点:

* **响应式调整大小:** 用户能够随意调整浏览器的大小，并且界面能做出响应。如果你的浏览器窗口为纵向，则相机会从 4:3 的横向视图翻转为 3:4 的纵向视图。
* **响应式设计:** 针对桌面浏览器，我们设计为在右侧显示 Dash、Android Jetpack、Dino 和 Sparky，而对于移动设备，这些要素则会显示在顶部。我们针对桌面设备，在摄像头右侧设计使用了抽屉式导航栏，而对于移动设备，则使用了 BottomSheet 类。
* **自适应输入:** 如果你使用桌面设备访问 Flutter 照相亭，则鼠标点击操作将被视为输入，如果你使用的是平板电脑或手机，则使用触摸输入。在调整贴纸大小并将其放置在照片中时，这一点尤其重要。移动设备支持双指张合和平移手势，桌面设备支持点击和拖动操作。

**可扩展架构**

我们还为此应用构建了可扩展的移动应用。我们的 Flutter 照相亭在创建之初就具有稳固的基础，包括良好的空安全性、国际化，以及从第一次提交开始就做到的 100% 单元和 widget 测试覆盖率。我们使用 [flutter_bloc](https://pub.flutter-io.cn/packages/flutter_bloc) 进行状态管理，因为它支持我们轻松测试业务逻辑，并观察应用中的所有状态变化。这对于生成开发者日志和确保可追溯性特别有用，因为我们可以准确地观察到从一个状态到另一个状态的变化，并更快地隔离问题。

我们还实现了由功能驱动的单一代码库结构。例如，贴纸、分享和实时相机预览，均在各自的文件夹中得到实现，其中每个文件夹包含其各自的界面组件和业务逻辑。这些功能也会用到外部依赖，例如位于 package 子目录中的相机插件。利用这种架构，我们的团队能够在互不干扰的情况下并行处理多个功能，最大限度地减少合并冲突，并有效地重用代码。例如，界面组件库是名为 [photobooth_ui](https://github.com/flutter/photobooth/tree/main/packages/photobooth_ui) 的单独 package，相机插件也是单独的。

通过将组件分成独立的 package，我们可以提取未与此特定项目绑定的各个组件，并将其开源。与 [Material](https://docs.flutter.cn/development/ui/widgets/material) 和 [Cupertino](https://docs.flutter.cn/development/ui/widgets/cupertino) 组件库类似，我们甚至可以将界面组件库 package 做开源处理，以供 Flutter 社区使用。

## **Firebase + Flutter = 完美组合**

**Firebase Auth、存储、托管等**

照相亭利用 Firebase 生态系统进行各种后端集成。[firebase_auth](https://pub.flutter-io.cn/packages/firebase_auth) package 支持用户在应用启动后立即匿名登录。每个会话都使用 Firebase Auth 创建具有唯一 ID 的匿名用户。

当你来到共享页面时，此设置即会开始发挥作用。你可以下载照片以保存为个人头像，也可以直接将其分享到社交媒体。如果你下载照片，则该照片将存储在你的本地设备上。如果你分享照片，我们会使用 [firebase_storage](https://pub.flutter-io.cn/packages/firebase_storage) package 将照片存储在 Firebase 中，以便稍后检索并生成帖子通过社交媒体发布。

我们在 Firebase 的存储分区上定义了 [Firebase 安全规则](https://firebase.google.cn/docs/rules)，确保照片在创建后不可变。这可以防止其他用户修改或删除存储分区中的照片。此外，我们使用 Google Cloud 提供的 [对象生命周期管理](https://cloud.google.com/storage/docs/lifecycle)，定义了一个删除 30 天前所有对象的规则，但你可以按照应用中列出的说明请求尽快删除你的照片。

此应用还使用 [Firebase Hosting](https://firebase.google.cn/docs/hosting) 快速安全地进行托管。我们可以借助 [action-hosting-deploy](https://github.com/FirebaseExtended/action-hosting-deploy) GitHub Action，根据目标分支，将应用自动部署到 Firebase Hosting。当我们将变更合并到主分支时，该操作会触发一个工作流，用于构建应用的特定开发版本，并将其部署到 Firebase Hosting。同样，当我们将变更合并到发布分支时，该操作也会触发部署生产版本。通过结合使用 GitHub Action 与 Firebase Hosting，我们的团队能够快速迭代，并始终得到最新版本的预览。

最后，我们使用 [Firebase 性能监测](https://firebase.google.cn/products/performance) 来监控主要的 Web 性能指标。

**使用 Cloud Functions 进行社交**

在生成你的社交帖子之前，我们首先会确保照片内容是像素级完美的。最终图像包含漂亮的边框，以呈现 Flutter 照相亭特色，并按 4:3 或 3:4 的宽高比进行裁剪，以便在社交帖子上呈现出色的效果。

我们使用 [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) API 或 [CanvasElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) 来合成原始照片、吉祥物和道具的图层，并生成你可以下载的单个图像。这个处理步骤由 [image_compositor](https://github.com/flutter/photobooth/tree/main/packages/image_compositor) package 负责执行。

然后，我们利用 Firebase 强大的 [Cloud Functions](https://firebase.google.cn/docs/functions)，来将照片分享到社交媒体。当你点击分享按钮时，系统会带你前往新标签页，并在所选的社交平台上自动生成待发布的帖子。该帖子还包含一个链接，连接到我们编写的 Cloud Functions。浏览器在分析网址时，会检测 Cloud Functions 生成的动态元数据，并据此在你的社交帖子中显示照片的精美预览，以及一个指向分享页面的链接，你的粉丝们可以在该页面上查看照片，并导航回 Flutter 照相亭应用，以获取他们自己的照片。

```dart
function renderSharePage(imageFileName: string, baseUrl: string): string {
 const context = Object.assign({}, BaseHTMLContext, {
   appUrl: baseUrl,
   shareUrl: `${baseUrl}/share/${imageFileName}`,
   shareImageUrl: bucketPathForFile(`${UPLOAD_PATH}/${imageFileName}`),
 });
 return renderTemplate(shareTmpl, context);
}
```

成品如下所示:

![]({{site.flutter-files-cn}}/posts/images/2021/06/6TLvkS.png)

有关如何在 Flutter 项目中使用 Firebase 的更多信息，请查看 [此 Codelab](https://firebase.google.cn/codelabs/firebase-get-to-know-flutter#0)。

## **最终成果**

本项目详细地示范了如何针对 Web 来构建应用的方法。令我们感到惊喜的是，与使用 Flutter 构建移动应用的体验相比，这个 Web 应用的构建工作流与之非常相似。我们必须考虑窗口大小、自适应、触摸与鼠标输入、图像加载时间、浏览器兼容性等元素，以及在构建 Web 应用时所必需考虑的其他所有因素。但是，我们仍然可以使用相同的模式、架构和编码标准来编写 Flutter 代码，这让我们在构建 Web 应用时感到非常自在。Flutter package 提供的工具和不断发展的生态系统，包括 Firebase 工具套件，帮助我们实现了 Flutter 照相亭。

![△ 打造 Flutter 照相亭的 Very Good Ventures 团队]({{site.flutter-files-cn}}/posts/images/2021/11/0219cca9b22ab.png)

△ 打造 Flutter 照相亭的 Very Good Ventures 团队

我们已经开放了所有源代码，欢迎大家前往 GitHub 查看 [photo_booth](https://github.com/flutter/photobooth) 项目，也别忘了多多拍照秀出来哦！

*Flutter 照相亭中文版有部分功能删减，你可以在 <a href="https://photobooth.flutter.dev">https://photobooth.flutter.dev</a> 体验完整功能*