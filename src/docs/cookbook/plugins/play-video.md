---
title: Play and pause a video
title: 视频的播放和暂停
description: How to use the video_player plugin.
description: 如何使用 video_player 插件。
prev:
  title: Store key-value data on disk
  title: 存储键值对数据
  path: /docs/cookbook/persistence/key-value
next:
  title: Take a picture using the camera
  title: 使用 Camera 插件实现拍照功能
  path: /docs/cookbook/plugins/picture-using-camera
---

Playing videos is a common task in app development,
and Flutter apps are no exception. To play videos,
the Flutter team provides the [`video_player`][] plugin.
You can use the `video_player` plugin to play videos
stored on the file system, as an asset, or from the internet.

在任何应用开发中，视频播放都是一项常见任务，Flutter 应用也不例外。
为了支持视频播放，Flutter 团队提供了
[`video_player`]({{site.pub-pkg}}/video_player) 插件。
你可以使用 `video_player` 插件播放存储在本地文件系统中的视频或者网络视频。

On iOS, the `video_player` plugin makes use of
[`AVPlayer`][] to handle playback. On Android,
it uses [`ExoPlayer`][].

在 iOS 上，`video_player` 使用
[`AVPlayer`](https://developer.apple.com/documentation/avfoundation/avplayer) 
进行播放控制。
在 Android 上，使用的是 [`ExoPlayer`](https://google.github.io/ExoPlayer/)。

This recipe demonstrates how to use the `video_player` package to stream a
video from the internet with basic play and pause controls using
the following steps:

这个章节讲解的是如何借助 `video_player` 包接收网络视频流，
并加入基本的播放、暂停操作。

## Directions

## 步骤

  1. Add the `video_player` dependency.
     
     添加 `video_player` 依赖

  2. Add permissions to your app.

     添加权限

  3. Create and initialize a `VideoPlayerController`.

     创建并初始化 `VideoPlayerController`

  4. Display the video player.

     展示视频播放器

  5. Play and pause the video.

     播放视频和暂停视频

## 1. Add the `video_player` dependency

## 1. 添加 `video_player` 依赖

This recipe depends on one Flutter plugin: `video_player`. First, add this
dependency to your `pubspec.yaml`.

这个章节基于一个 Flutter 插件： `video_player`。
首先，添加依赖到 `pubspec.yaml` 中：

```yaml
dependencies:
  flutter:
    sdk: flutter
  video_player:
```

## 2. Add permissions to your app

## 2. 添加权限

Next, update your `android` and `ios` configurations to ensure
that your app has the correct permissions to stream videos
from the internet.

然后，你需要确保你的应用拥有从网络中获取视频流的权限。
因此，你需要更新你的 `android` 和 `ios` 配置。

### Android

### Android 配置

Add the following permission to the `AndroidManifest.xml` file just after the
`<application>` definition. The `AndroidManifest.xml` file is found at
`<project root>/android/app/src/main/AndroidManifest.xml`.

在 `AndroidManifest.xml` 文件中的 `<application>` 配置项下加入如下权限。
`AndroidManifest.xml` 文件的路径是
`<project root>/android/app/src/main/AndroidManifest.xml`

<!-- skip -->
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application ...>

    </application>

    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

### iOS

### iOS 配置

For iOS, add the following to the `Info.plist` file found at 
`<project root>/ios/Runner/Info.plist`. 

针对 iOS，你需要在 `<project root>/ios/Runner/Info.plist`
路径下的 `Info.plist` 文件中加入如下配置。

<!-- skip -->
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

{{site.alert.warning}}

  The `video_player` plugin doesn't work on iOS simulators.
  You must test videos on real iOS devices.
  
  `video_player` 插件在 iOS 模拟器上不能使用，必须要在 iOS 真机上进行测试。

{{site.alert.end}}

## 3. Create and initialize a `VideoPlayerController`

## 3. 创建并初始化 `VideoPlayerController`

Now that you have the `video_player` plugin installed with the correct
permissions, create a `VideoPlayerController`. The
`VideoPlayerController` class allows you to connect to different types of
videos and control playback.

`video_player` 插件成功安装且权限设置完成后，
需要创建一个 `VideoPlayerController`。
`VideoPlayerController` 类允许你播放不同类型的视频并进行播放控制。

Before you can play videos, you must also `initialize` the controller.
This establishes the connection to the video and prepare the
controller for playback.

在播放视频前，需要对播放控制器进行初始化。初始化过程主要是与视频源建立连接和播放控制的准备。

To create and initialize the `VideoPlayerController` do the following:

创建和初始化 `VideoPlayerController` 时，请遵循以下步骤：

  1. Create a `StatefulWidget` with a companion `State` class 

     创建一个 `StatefulWidget` 组件和 `State` 类

  2. Add a variable to the `State` class to store the `VideoPlayerController`

     在 `State` 类中增加一个变量来存放 `VideoPlayerController`

  3. Add a variable to the `State` class to store the `Future` returned from
  `VideoPlayerController.initialize`

     在 `State` 类中增加另外一个变量来存放 `VideoPlayerController.initialize` 返回的 `Future`

  4. Create and initialize the controller in the `initState` method

     在 `initState` 方法里创建和初始化控制器

  5. Dispose of the controller in the `dispose` method

     在 `dispose` 方法里销毁控制器
  
<!-- skip -->
```dart
class VideoPlayerScreen extends StatefulWidget {
  VideoPlayerScreen({Key key}) : super(key: key);

  @override
  _VideoPlayerScreenState createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  VideoPlayerController _controller;
  Future<void> _initializeVideoPlayerFuture;

  @override
  void initState() {
    // Create an store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    _controller = VideoPlayerController.network(
      'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4',
    );

    _initializeVideoPlayerFuture = _controller.initialize();

    super.initState();
  }

  @override
  void dispose() {
    // Ensure disposing of the VideoPlayerController to free up resources.
    _controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Complete the code in the next step.
  }
}
```

## 4. Display the video player

## 4. 展示视频播放器

Now, display the video. The `video_player` plugin provides the
[`VideoPlayer`][] widget to display the video initialized by
the `VideoPlayerController`.
By default, the `VideoPlayer` widget takes up as much space as possible.
This often isn't ideal for videos because they are meant
to be displayed in a specific aspect ratio, such as 16x9 or 4x3.

现在到了展示播放器的时候。`video_player` 插件提供了 [`VideoPlayer`][]组件
来展示已经被 `VideoPlayerController` 初始化完成的视频。
默认情况下，`VideoPlayer` 组件会尽可能撑满整个空间。
但是这通常不会太理想，因为很多时候视频需要在特定的宽高比下展示，
比如 16x9 或者 4x3。

Therefore, wrap the `VideoPlayer` widget in an [`AspectRatio`][]
widget to ensure that the video has the correct proportions.

因此，你可以把 `VideoPlayer` 组件嵌进一个
[`AspectRatio`]({{site.api}}/flutter/widgets/AspectRatio-class.html) 
组件中，保证视频播放保持正确的比例。

Furthermore, you must display the `VideoPlayer` widget after the
`_initializeVideoPlayerFuture()` completes. Use `FutureBuilder` to
display a loading spinner until the controller finishes initializing.
Note: initializing the controller does not begin playback.

此外，你必须在 `_initializeVideoPlayerFuture` 完成后才展示 `VideoPlayer` 组件。
你可以使用 `FutureBuilder` 来展示一个旋转的加载图标直到初始化完成。
请注意：控制器初始化完成并不会立即开始播放。

<!-- skip -->
```dart
// Use a FutureBuilder to display a loading spinner while waiting for the
// VideoPlayerController to finish initializing.
FutureBuilder(
  future: _initializeVideoPlayerFuture,
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.done) {
      // If the VideoPlayerController has finished initialization, use
      // the data it provides to limit the aspect ratio of the VideoPlayer.
      return AspectRatio(
        aspectRatio: _controller.value.aspectRatio,
        // Use the VideoPlayer widget to display the video.
        child: VideoPlayer(_controller),
      );
    } else {
      // If the VideoPlayerController is still initializing, show a
      // loading spinner.
      return Center(child: CircularProgressIndicator());
    }
  },
)
```

## 5. Play and pause the video

## 5. 播放视频和暂停视频

By default, the video starts in a paused state. To begin playback,
call the [`play()`][] method provided by the `VideoPlayerController`.
To pause playback, call the [`pause()`][] method.

默认情况下，播放器启动时会处于暂停状态。开始播放，
需要调用 `VideoPlayerController` 提供的[`play()`][] 方法。
停止播放，需要调用 [`pause()`][] 方法。

For this example,
add a `FloatingActionButton` to your app that displays a play
or pause icon depending on the situation.
When the user taps the button,
play the video if it's currently paused,
or pause the video if it's playing.

在这个示例中，向应用加入了一个 `FloatingActionButton`，
这个按钮会根据播放状态展示播放或者暂停的图标。
当用户点击按钮，会切换播放状态。
如果当前是暂停状态，就开始播放。如果当前是播放状态，就暂停播放。

<!-- skip -->
```dart
FloatingActionButton(
  onPressed: () {
    // Wrap the play or pause in a call to `setState`. This ensures the
    // correct icon is shown
    setState(() {
      // If the video is playing, pause it.
      if (_controller.value.isPlaying) {
        _controller.pause();
      } else {
        // If the video is paused, play it.
        _controller.play();
      }
    });
  },
  // Display the correct icon depending on the state of the player.
  child: Icon(
    _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
  ),
)
```

## Complete example

## 完整样例

```dart
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

void main() => runApp(VideoPlayerApp());

class VideoPlayerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Video Player Demo',
      home: VideoPlayerScreen(),
    );
  }
}

class VideoPlayerScreen extends StatefulWidget {
  VideoPlayerScreen({Key key}) : super(key: key);

  @override
  _VideoPlayerScreenState createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  VideoPlayerController _controller;
  Future<void> _initializeVideoPlayerFuture;

  @override
  void initState() {
    // Create and store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    _controller = VideoPlayerController.network(
      'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4',
    );

    // Initialize the controller and store the Future for later use.
    _initializeVideoPlayerFuture = _controller.initialize();

    // Use the controller to loop the video.
    _controller.setLooping(true);

    super.initState();
  }

  @override
  void dispose() {
    // Ensure disposing of the VideoPlayerController to free up resources.
    _controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Butterfly Video'),
      ),
      // Use a FutureBuilder to display a loading spinner while waiting for the
      // VideoPlayerController to finish initializing.
      body: FutureBuilder(
        future: _initializeVideoPlayerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // If the VideoPlayerController has finished initialization, use
            // the data it provides to limit the aspect ratio of the video.
            return AspectRatio(
              aspectRatio: _controller.value.aspectRatio,
              // Use the VideoPlayer widget to display the video.
              child: VideoPlayer(_controller),
            );
          } else {
            // If the VideoPlayerController is still initializing, show a
            // loading spinner.
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Wrap the play or pause in a call to `setState`. This ensures the
          // correct icon is shown.
          setState(() {
            // If the video is playing, pause it.
            if (_controller.value.isPlaying) {
              _controller.pause();
            } else {
              // If the video is paused, play it.
              _controller.play();
            }
          });
        },
        // Display the correct icon depending on the state of the player.
        child: Icon(
          _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```


[`AspectRatio`]: {{site.api}}/flutter/widgets/AspectRatio-class.html
[`AVPlayer`]: https://developer.apple.com/documentation/avfoundation/avplayer
[`ExoPlayer`]: https://google.github.io/ExoPlayer/
[`pause()`]: {{site.pub-api}}/video_player/latest/video_player/VideoPlayerController/pause.html
[`play()`]: {{site.pub-api}}/video_player/latest/video_player/VideoPlayerController/play.html
[`video_player`]: {{site.pub-pkg}}/video_player
[`VideoPlayer`]: {{site.pub-api}}/video_player/latest/video_player/VideoPlayer-class.html
