---
title: Take a picture using the camera
title: 使用 Camera 插件实现拍照功能
description: How to use a camera plugin on mobile.
description: 如何在移动设备上使用 camera 插件。
prev:
  title: Play and pause a video
  title: 视频的播放和暂停
  path: /docs/cookbook/plugins/play-video
next:
  title: An introduction to integration testing
  title: 集成测试介绍
  path: /docs/cookbook/testing/integration/introduction
---

Many apps require working with the device's cameras to
take photos and videos.  Flutter provides the [`camera`][] plugin
for this purpose. The `camera` plugin provides tools to get a list of the
available cameras, display a preview coming from a specific camera,
and take photos or videos.

很多应用都需要使用到设备的相机模块拍摄图片和视频。
因此，Flutter 提供了 [`camera`]({{site.pub-pkg}}/camera) 插件。
`camera` 插件提供了一系列可用的相机，并使用特定的相机展示相机预览、拍照、录视频。

This recipe demonstrates how to use the `camera` plugin to display a preview, 
take a photo, and display it using the following steps:

这个章节将会讲解如何使用 `camera` 插件去展示相机预览、拍照并显示。

## Directions

## 步骤

  1. Add the required dependencies.

     添加所需依赖

  2. Get a list of the available cameras.

     获取可用相机列表

  3. Create and initialize the `CameraController`.

     创建并初始化 `CameraController`

  4. Use a `CameraPreview` to display the camera's feed.

     使用 `CameraPreview` 展示相机的帧流

  5. Take a picture with the `CameraController`.

     使用 `CameraController` 拍摄一张图片

  6. Display the picture with an `Image` widget.

     使用 `Image` 组件展示图片

## 1. Add the required dependencies

## 1. 添加所需依赖

To complete this recipe, you need to add three dependencies to your app:

为了完成这个章节，你需要向你的应用添加三个依赖：

[`camera`][]
<br> Provides tools to work with the cameras on the device.

[`camera`][]
<br> 提供使用设备相机模块的工具

[`path_provider`][]
<br> Finds the correct paths to store images.

[`path_provider`][]
<br>寻找存储图片的正确路径

[`path`][]
<br> Creates paths that work on any platform.

[`path`][]
<br> 创建适配任何平台的路径

    [`path`]({{site.pub-pkg}}/path) - 创建适配任何平台的路径

```yaml
dependencies:
  flutter:
    sdk: flutter
  camera:
  path_provider:
  path:
```
{{site.alert.tip}}

  - For android, You must have to update `minSdkVersion` to 21 (or higher).

    针对 Android 来说，工程的 `minSdkVersion` 需要设置为 21 或者更高。
    
{{site.alert.end}}

## 2. Get a list of the available cameras

## 2. 获取可用相机列表

Next, get a list of available cameras using the `camera` plugin.

接着，你可以使用 `camera` 插件获取可用相机列表。

<!-- skip -->
```dart
// Ensure that plugin services are initialized so that `availableCameras()`
// can be called before `runApp()`
WidgetsFlutterBinding.ensureInitialized();

// Obtain a list of the available cameras on the device.
final cameras = await availableCameras();

// Get a specific camera from the list of available cameras.
final firstCamera = cameras.first;
```

## 3. Create and initialize the `CameraController`

## 3. 创建并初始化 `CameraController`

Once you have a camera, use the following steps to
create and initialize a `CameraController`.
This process establishes a connection to
the device's camera that allows you to control the camera
and display a preview of the camera's feed.

在选择了一个相机后，你需要创建并初始化 `CameraController`。
在这个过程中，与设备相机建立了连接并允许你控制相机并展示相机的预览帧流。

To achieve this, please:

实现这个过程，请依照以下步骤：

  1. Create a `StatefulWidget` with a companion `State` class.

     创建一个带有 `State` 类的 `StatefulWidget` 组件

  2. Add a variable to the `State` class to store the `CameraController`.

     添加一个变量到 `State` 类来存放 `CameraController`

  3. Add a variable to the `State` class to store the `Future`
     returned from `CameraController.initialize()`.

     添加另外一个变量到 `State` 类中来存放 `CameraController.initialize()` 返回的 `Future`

  4. Create and initialize the controller in the `initState()` method.

     在 `initState()` 方法中创建并初始化控制器

  5. Dispose of the controller in the `dispose()` method.

     在 `dispose()` 方法中销毁控制器
  
<!-- skip -->
```dart
// A screen that takes in a list of cameras and the Directory to store images.
class TakePictureScreen extends StatefulWidget {
  final CameraDescription camera;

  const TakePictureScreen({
    Key key,
    @required this.camera,
  }) : super(key: key);

  @override
  TakePictureScreenState createState() => TakePictureScreenState();
}

class TakePictureScreenState extends State<TakePictureScreen> {
  // Add two variables to the state class to store the CameraController and
  // the Future.
  CameraController _controller;
  Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();
    // To display the current output from the camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      widget.camera,
      // Define the resolution to use.
      ResolutionPreset.medium,
    );

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next steps.
  }
}
```

{{site.alert.warning}}

  If you do not initialize the `CameraController`,
  you *cannot* use the camera to display a preview and take pictures.

  如果你没有初始化 `CameraController`，你就 *不能* 使用相机预览和拍照。

{{site.alert.end}}

## 4. Use a `CameraPreview` to display the camera's feed

## 4. 在 `initState` 方法中创建并初始化控制器

Next, use the `CameraPreview` widget from the `camera` package to
display a preview of the camera's feed.

接着，你能够使用 `camera` 中的 `CameraPreview` 组件来展示相机预览帧流。

{{site.alert.secondary}}

  **Remember** You must wait until the controller has finished
  initializing before working with the camera. Therefore,
  you must wait for the `_initializeControllerFuture()` created
  in the previous step to complete before showing a `CameraPreview`.
  
  **请记住**： 在使用相机前，请确保控制器已经完成初始化。
  因此，你一定要等待前一个步骤创建 `_initializeControllerFuture()`
  执行完毕才去展示 `CameraPreview`。
  
{{site.alert.end}}

Use a [`FutureBuilder`][] for exactly this purpose.

你可以使用 [`FutureBuilder`]({{site.api}}/flutter/widgets/FutureBuilder-class.html) 完成这个任务。

<!-- skip -->
```dart
// You must wait until the controller is initialized before displaying the
// camera preview. Use a FutureBuilder to display a loading spinner until the
// controller has finished initializing.
FutureBuilder<void>(
  future: _initializeControllerFuture,
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.done) {
      // If the Future is complete, display the preview.
      return CameraPreview(_controller);
    } else {
      // Otherwise, display a loading indicator.
      return Center(child: CircularProgressIndicator());
    }
  },
)
```

## 5. Take a picture with the `CameraController`

## 5. 使用 `CameraController` 拍照

You can use the `CameraController` to take pictures using the
[`takePicture()`][] method. In this example,
create a `FloatingActionButton` that takes a picture
using the `CameraController` when a user taps on the button.

你可以使用 `CameraController` 的
[`takePicture`]({{site.pub-api}}/camera/latest/camera/CameraController/takePicture.html) 
方法拍照。在这个示例中，
创建了一个浮动按钮 `FloatingActionButton`，
用户点击这个按钮，就能通过 `CameraController` 来拍摄图片。

Saving a picture requires 3 steps:

保存一张图片，需要经过一下三个步骤：

  1. Ensure the camera is initialized

     确保相机模块已经被初始化完成

  2. Construct a path that defines where the picture should be saved

     创建图片需要被保存的路径

  3. Use the controller to take a picture and save the result to the path

     使用控制器拍摄一张图片并保存结果到上述路径
  
It is good practice to wrap these operations in a `try / catch` block in order
to handle any errors that might occur.

最好把这些操作都放在 `try / catch` 方法块中来处理可能发生的异常。

<!-- skip -->
```dart
FloatingActionButton(
  child: Icon(Icons.camera_alt),
  // Provide an onPressed callback.
  onPressed: () async {
    // Take the Picture in a try / catch block. If anything goes wrong,
    // catch the error.
    try {
      // Ensure that the camera is initialized.
      await _initializeControllerFuture;

      // Construct the path where the image should be saved using the path
      // package.
      final path = join(
        // Store the picture in the temp directory.
        // Find the temp directory using the `path_provider` plugin.
        (await getTemporaryDirectory()).path,
        '${DateTime.now()}.png',
      );

      // Attempt to take a picture and log where it's been saved.
      await _controller.takePicture(path);
    } catch (e) {
      // If an error occurs, log the error to the console.
      print(e);
    }
  },
)
```
## 6. Display the picture with an `Image` widget

## 6. 在 `dispose` 方法中销毁控制器

If you take the picture successfully, you can then display the saved picture
using an `Image` widget. In this case, the picture is stored as a file on
the device.

如果你能成功拍摄图片，你就可以使用 `Image` 组件展示被保存的图片。
在这个示例中，这张图片是以文件的形式存储在设备中。

Therefore, you must provide a `File` to the `Image.file` constructor.
You can create an instance of the `File` class by passing the path created in
the previous step.

因此，你需要提供一个 `File` 给 `Image.file` 构造函数。
你能够通过传递你在上一步中创建的路径来创建一个 `File` 类的实例。

<!-- skip -->
```dart
Image.file(File('path/to/my/picture.png'))
```

## Complete example

## 完整样例

```dart
import 'dart:async';
import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:path/path.dart' show join;
import 'package:path_provider/path_provider.dart';

Future<void> main() async {
  // Ensure that plugin services are initialized so that `availableCameras()`
  // can be called before `runApp()`
  WidgetsFlutterBinding.ensureInitialized();

  // Obtain a list of the available cameras on the device.
  final cameras = await availableCameras();

  // Get a specific camera from the list of available cameras.
  final firstCamera = cameras.first;

  runApp(
    MaterialApp(
      theme: ThemeData.dark(),
      home: TakePictureScreen(
        // Pass the appropriate camera to the TakePictureScreen widget.
        camera: firstCamera,
      ),
    ),
  );
}

// A screen that allows users to take a picture using a given camera.
class TakePictureScreen extends StatefulWidget {
  final CameraDescription camera;

  const TakePictureScreen({
    Key key,
    @required this.camera,
  }) : super(key: key);

  @override
  TakePictureScreenState createState() => TakePictureScreenState();
}

class TakePictureScreenState extends State<TakePictureScreen> {
  CameraController _controller;
  Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();
    // To display the current output from the Camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      widget.camera,
      // Define the resolution to use.
      ResolutionPreset.medium,
    );

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Take a picture')),
      // Wait until the controller is initialized before displaying the
      // camera preview. Use a FutureBuilder to display a loading spinner
      // until the controller has finished initializing.
      body: FutureBuilder<void>(
        future: _initializeControllerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // If the Future is complete, display the preview.
            return CameraPreview(_controller);
          } else {
            // Otherwise, display a loading indicator.
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.camera_alt),
        // Provide an onPressed callback.
        onPressed: () async {
          // Take the Picture in a try / catch block. If anything goes wrong,
          // catch the error.
          try {
            // Ensure that the camera is initialized.
            await _initializeControllerFuture;

            // Construct the path where the image should be saved using the
            // pattern package.
            final path = join(
              // Store the picture in the temp directory.
              // Find the temp directory using the `path_provider` plugin.
              (await getTemporaryDirectory()).path,
              '${DateTime.now()}.png',
            );

            // Attempt to take a picture and log where it's been saved.
            await _controller.takePicture(path);

            // If the picture was taken, display it on a new screen.
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DisplayPictureScreen(imagePath: path),
              ),
            );
          } catch (e) {
            // If an error occurs, log the error to the console.
            print(e);
          }
        },
      ),
    );
  }
}

// A widget that displays the picture taken by the user.
class DisplayPictureScreen extends StatelessWidget {
  final String imagePath;

  const DisplayPictureScreen({Key key, this.imagePath}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Display the Picture')),
      // The image is stored as a file on the device. Use the `Image.file`
      // constructor with the given path to display the image.
      body: Image.file(File(imagePath)),
    );
  }
}
```


[`camera`]: {{site.pub-pkg}}/camera
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[`path`]: {{site.pub-pkg}}/path
[`path_provider`]: {{site.pub-pkg}}/path_provider
[`takePicture()`]: {{site.pub-pkg}}/camera/latest/camera/CameraController/takePicture.html
