---
# title: Create a download button
title: 创建一个带进度条的下载按钮
# description: How to implement a download button.
description: 如何实现下载按钮
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/effects/download_button"?>

Apps are filled with buttons that execute long-running behaviors.
For example, a button might trigger a download,
which starts a download process, receives data over time,
and then provides access to the downloaded asset. 
It's helpful to show the user the progress of a
long-running process, and the button itself is a good place
to provide this feedback. In this recipe,
you'll build a download button that transitions through
multiple visual states, based on the status of an app download.

应用程序中有许多按钮需要执行长时间的操作。
例如，一个按钮可能会触发下载，
从而启动下载流程，并在一段时间内接收数据，
最终提供对下载资源的访问。
向用户展示长时间运行过程的进度有助于提升体验，
而按钮本身正是传达这种反馈的理想位置。
在本教程中，
你将构建一个能够根据应用程序的下载状态，
切换不同视觉效果的下载按钮。

The following animation shows the app's behavior:

下面的动画展示了应用程序的行为：

![The download button cycles through its stages](/assets/images/docs/cookbook/effects/DownloadButton.webp){:.site-mobile-screenshot}

## Define a new stateless widget

## 定义一个新的 stateless widget

Your button widget needs to change its appearance over time.
Therefore, you need to implement your button with a custom
stateless widget. 

你的按钮 widget 需要随着时间的推移改变其外观。
因此，你需要自定义 stateless widget 来实现这种按钮。

Define a new stateless widget called `DownloadButton`.

定义一个新的 stateless widget，名为 `DownloadButton`。

<?code-excerpt "lib/stateful_widget.dart (DownloadButton)"?>
```dart
@immutable
class DownloadButton extends StatelessWidget {
  const DownloadButton({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO:
    return const SizedBox();
  }
}
```

## Define the button's possible visual states

## 定义按钮的各种视觉状态

The download button's visual presentation is based on a
given download status. Define the possible states of
the download, and then update `DownloadButton` to accept
a `DownloadStatus` and a `Duration` for how long the button
should take to animate from one status to another.

下载按钮的视觉呈现基于给定的下载状态。
首先定义下载可能会出现的各种状态，
然后更新 `DownloadButton`，
使其接收一个 `DownloadStatus` 和一个 `Duration` 类型的参数，
`Duration` 用于指定按钮在不同状态之间切换时的动画过渡时间。

<?code-excerpt "lib/visual_states.dart (VisualStates)"?>
```dart
enum DownloadStatus { notDownloaded, fetchingDownload, downloading, downloaded }

@immutable
class DownloadButton extends StatelessWidget {
  const DownloadButton({
    super.key,
    required this.status,
    this.transitionDuration = const Duration(milliseconds: 500),
  });

  final DownloadStatus status;
  final Duration transitionDuration;

  @override
  Widget build(BuildContext context) {
    // TODO: We'll add more to this later.
    return const SizedBox();
  }
}
```

:::note

Each time you define a custom widget,
you must decide whether all relevant 
information is provided to that widget
from its parent or if that widget orchestrates
the application behavior within itself.
For example, `DownloadButton` could receive the
current `DownloadStatus` from its parent, 
or the `DownloadButton` could orchestrate the
download process itself within its `State` object.
For most widgets, the best answer is to pass the relevant 
information into the widget from its parent,
rather than manage behavior within the widget.
By passing in all the relevant information,
you ensure greater reusability for the widget,
easier testing, and easier changes to application 
behavior in the future.

每次自定义 widget 时，
你都需要决定所有相关信息，
是否从父级传递给该 widget，
还是让该 widget 在内部自行协调应用程序的行为。
例如，`DownloadButton` 可以从父级接收当前的 `DownloadStatus`，
或者也可以在其 `State` 对象内部自行协调下载过程。
对于大多数 widget 来说，最佳做法是将相关信息从父级传递给 widget，
而不是在 widget 内部自行协调行为。
通过将所有相关信息传递给 widget，
你可以确保 widget 具有更高的可重用性、更易于测试，
同时也更方便在未来改变应用程序的行为。

:::

## Display the button shape

## 显示按钮形状

The download button changes its shape based on the download
status. The button displays a grey, rounded rectangle during
the `notDownloaded` and `downloaded` states.
The button displays a transparent circle during the
`fetchingDownload` and `downloading` states. 

下载按钮会根据下载状态改变其形状。
在 `notDownloaded` 和 `downloaded` 状态下，按钮显示为灰色的圆角矩形。
而在 `fetchingDownload` 和 `downloading` 状态下，按钮显示为透明的圆形。

Based on the current `DownloadStatus`,
build an `AnimatedContainer` with a 
`ShapeDecoration` that displays a rounded
rectangle or a circle.

根据当前的 `DownloadStatus`，
构建一个 `AnimatedContainer`，
其中使用 `ShapeDecoration` 来显示圆角矩形或圆形。

Consider defining the shape's widget tree in a separated 
`Stateless` widget so that the main `build()`
method remains simple, allowing for the additions 
that follow. Instead of creating a function to return a widget,
like `Widget _buildSomething() {}`, always prefer creating a
`StatelessWidget` or a `StatefulWidget` which is more performant. More
considerations on this can be found in the [documentation]({{site.api}}/flutter/widgets/StatelessWidget-class.html)
or in a dedicated video in the Flutter [YouTube channel]({{site.yt.watch}}?v=IOyq-eTRhvo).

建议将形状的 widget 树定义在一个单独的 `Stateless` widget 中，
这样可以保持主 `build()` 方法的简洁，便于后续添加功能。
与其创建一个返回 widget 的函数（例如 `Widget _buildSomething() {}`），
更好的做法是创建一个 `StatelessWidget` 或 `StatefulWidget`，这在性能上更优。
有关更多的考虑因素，你可以在 [文档]({{site.api}}/flutter/widgets/StatelessWidget-class.html) 中找到，
或者在 Flutter 的 [YouTube 频道]({{site.yt.watch}}?v=IOyq-eTRhvo) 上观看相关视频。

For now, the `AnimatedContainer` child is just a `SizedBox` because we will come back at it in another step.

目前，`AnimatedContainer` 的子 widget 只是一个 `SizedBox`，
因为我们将在后续步骤中再来处理它。

<?code-excerpt "lib/display.dart (Display)"?>
```dart
@immutable
class DownloadButton extends StatelessWidget {
  const DownloadButton({
    super.key,
    required this.status,
    this.transitionDuration = const Duration(milliseconds: 500),
  });

  final DownloadStatus status;
  final Duration transitionDuration;

  bool get _isDownloading => status == DownloadStatus.downloading;

  bool get _isFetching => status == DownloadStatus.fetchingDownload;

  bool get _isDownloaded => status == DownloadStatus.downloaded;

  @override
  Widget build(BuildContext context) {
    return ButtonShapeWidget(
      transitionDuration: transitionDuration,
      isDownloaded: _isDownloaded,
      isDownloading: _isDownloading,
      isFetching: _isFetching,
    );
  }
}

@immutable
class ButtonShapeWidget extends StatelessWidget {
  const ButtonShapeWidget({
    super.key,
    required this.isDownloading,
    required this.isDownloaded,
    required this.isFetching,
    required this.transitionDuration,
  });

  final bool isDownloading;
  final bool isDownloaded;
  final bool isFetching;
  final Duration transitionDuration;

  @override
  Widget build(BuildContext context) {
    final ShapeDecoration shape;
    if (isDownloading || isFetching) {
      shape = const ShapeDecoration(
        shape: CircleBorder(),
        color: Colors.transparent,
      );
    } else {
      shape = const ShapeDecoration(
        shape: StadiumBorder(),
        color: CupertinoColors.lightBackgroundGray,
      );
    }

    return AnimatedContainer(
      duration: transitionDuration,
      curve: Curves.ease,
      width: double.infinity,
      decoration: shape,
      child: const SizedBox(),
    );
  }
}
```

You might wonder why you need a `ShapeDecoration`
widget for a transparent circle, given that it's invisible.
The purpose of the invisible circle is to orchestrate
the desired animation. The `AnimatedContainer` begins with a rounded 
rectangle. When the `DownloadStatus` changes to `fetchingDownload`,
the `AnimatedContainer` needs to animate from a rounded rectangle
to a circle, and then fade out as the animation takes place.
The only way to implement this animation is to define both
the beginning shape of a rounded rectangle and the 
ending shape of a circle. But, you don't want the final
circle to be visible, so you make it transparent,
which causes an animated fade-out.

你可能会疑惑，既然透明圆形是不可见的，
为什么还需要使用 `ShapeDecoration` widget 呢？
因为这个透明圆形的目的是为了协调动画效果。
`AnimatedContainer` 一开始显示为圆角矩形。
当 `DownloadStatus` 变为 `fetchingDownload` 时，
`AnimatedContainer` 需要从圆角矩形动画过渡到圆形，并在动画进行的过程中逐渐淡出。
实现这种动画的唯一方法是定义圆角矩形的起始形状和圆形的结束形状。
但是，你不希望最终的圆形可见，所以将其设置为透明，这样就能实现动画淡出的效果。

## Display the button text

## 显示按钮文本

The `DownloadButton` displays `GET` during the
`notDownloaded` phase, `OPEN` during the `downloaded`
phase, and no text in between. 

`DownloadButton` 在 `notDownloaded` 阶段显示 `GET`，
在 `downloaded` 阶段显示 `OPEN`，
而在其他阶段则不显示文本。

Add widgets to display text during each download phase,
and animate the text's opacity in between. Add the text
widget tree as a child of the `AnimatedContainer` in the
button wrapper widget.

添加用于显示每个下载阶段文本的 widget，
并在各阶段之间对文本的不透明度进行动画处理。
将文本 widget 树作为 `AnimatedContainer` 的子 widget，
添加到包装按钮的 widget 中。

<?code-excerpt "lib/display_text.dart (DisplayText)"?>
```dart
@immutable
class ButtonShapeWidget extends StatelessWidget {
  const ButtonShapeWidget({
    super.key,
    required this.isDownloading,
    required this.isDownloaded,
    required this.isFetching,
    required this.transitionDuration,
  });

  final bool isDownloading;
  final bool isDownloaded;
  final bool isFetching;
  final Duration transitionDuration;

  @override
  Widget build(BuildContext context) {
    final ShapeDecoration shape;
    if (isDownloading || isFetching) {
      shape = const ShapeDecoration(
        shape: CircleBorder(),
        color: Colors.transparent,
      );
    } else {
      shape = const ShapeDecoration(
        shape: StadiumBorder(),
        color: CupertinoColors.lightBackgroundGray,
      );
    }

    return AnimatedContainer(
      duration: transitionDuration,
      curve: Curves.ease,
      width: double.infinity,
      decoration: shape,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: AnimatedOpacity(
          duration: transitionDuration,
          opacity: isDownloading || isFetching ? 0.0 : 1.0,
          curve: Curves.ease,
          child: Text(
            isDownloaded ? 'OPEN' : 'GET',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: CupertinoColors.activeBlue,
            ),
          ),
        ),
      ),
    );
  }
}
```

## Display a spinner while fetching download

## 获取下载时显示一个加载指示器

During the `fetchingDownload` phase, the `DownloadButton`
displays a radial spinner. This spinner fades in from
the `notDownloaded` phase and fades out to 
the `fetchingDownload` phase. 

在 `fetchingDownload` 阶段，`DownloadButton` 会显示一个旋转的加载指示器。
这个加载指示器从 `notDownloaded` 阶段淡入，到 `fetchingDownload` 阶段淡出。

Implement a radial spinner that sits on top of the button
shape and fades in and out at the appropriate times.

实现一个覆盖在按钮上方的加载指示器，并在适当的时机淡入和淡出。

We have removed the `ButtonShapeWidget`'s constructor to keep the
focus on its build method and the `Stack` widget we've added.

我们删除了 `ButtonShapeWidget` 的构造函数，
以便将重点放在 build 方法和我们添加的 `Stack` widget 上。

<?code-excerpt "lib/spinner.dart (Spinner)"?>
```dart
@override
Widget build(BuildContext context) {
  return GestureDetector(
    onTap: _onPressed,
    child: Stack(
      children: [
        ButtonShapeWidget(
          transitionDuration: transitionDuration,
          isDownloaded: _isDownloaded,
          isDownloading: _isDownloading,
          isFetching: _isFetching,
        ),
        Positioned.fill(
          child: AnimatedOpacity(
            duration: transitionDuration,
            opacity: _isDownloading || _isFetching ? 1.0 : 0.0,
            curve: Curves.ease,
            child: ProgressIndicatorWidget(
              downloadProgress: downloadProgress,
              isDownloading: _isDownloading,
              isFetching: _isFetching,
            ),
          ),
        ),
      ],
    ),
  );
}
```

## Display the progress and a stop button while downloading

## 下载时显示进度和停止按钮

After the `fetchingDownload` phase is the `downloading` phase.
During the `downloading` phase, the `DownloadButton`
replaces the radial progress spinner with a growing
radial progress bar. The `DownloadButton` also displays a stop 
button icon so that the user can cancel an in-progress download.

在 `fetchingDownload` 阶段之后，是 `downloading` 阶段。
在 `downloading` 阶段，
`DownloadButton` 会用一个随进度增长的径向进度条来替代加载指示器。
`DownloadButton` 还会显示一个停止按钮图标，以便用户可以取消正在进行的下载。

Add a progress property to the `DownloadButton` widget,
and then update the progress display to switch to a radial
progress bar during the `downloading` phase. 

为 `DownloadButton` widget 添加一个进度属性，
然后更新进度的显示，
使其在 `downloading` 阶段切换到径向进度条。

Next, add a stop button icon at the center of the
radial progress bar.

接下来，在径向进度条的中心添加一个停止按钮图标。

<?code-excerpt "lib/stop.dart (StopIcon)"?>
```dart
@override
Widget build(BuildContext context) {
  return GestureDetector(
    onTap: _onPressed,
    child: Stack(
      children: [
        ButtonShapeWidget(
          transitionDuration: transitionDuration,
          isDownloaded: _isDownloaded,
          isDownloading: _isDownloading,
          isFetching: _isFetching,
        ),
        Positioned.fill(
          child: AnimatedOpacity(
            duration: transitionDuration,
            opacity: _isDownloading || _isFetching ? 1.0 : 0.0,
            curve: Curves.ease,
            child: Stack(
              alignment: Alignment.center,
              children: [
                ProgressIndicatorWidget(
                  downloadProgress: downloadProgress,
                  isDownloading: _isDownloading,
                  isFetching: _isFetching,
                ),
                if (_isDownloading)
                  const Icon(
                    Icons.stop,
                    size: 14.0,
                    color: CupertinoColors.activeBlue,
                  ),
              ],
            ),
          ),
        ),
      ],
    ),
  );
}
```

## Add button tap callbacks

## 添加按钮点击回调

The last detail that your `DownloadButton` needs is the
button behavior. The button must do things when the user taps it. 

最后一步，`DownloadButton` 还需要实现按钮的行为。
按钮必须在用户点击时执行相应的操作。

Add widget properties for callbacks to start a download,
cancel a download, and open a download. 

为 widget 添加回调，用于开始下载、取消下载和打开下载。

Finally, wrap `DownloadButton`'s existing widget tree
with a `GestureDetector` widget, and forward the
tap event to the corresponding callback property.

最后，用 `GestureDetector` widget 包装 `DownloadButton` 现有的 widget 树，
并将点击事件转发到相应的回调属性。

<?code-excerpt "lib/button_taps.dart (TapCallbacks)"?>
```dart
@immutable
class DownloadButton extends StatelessWidget {
  const DownloadButton({
    super.key,
    required this.status,
    this.downloadProgress = 0,
    required this.onDownload,
    required this.onCancel,
    required this.onOpen,
    this.transitionDuration = const Duration(milliseconds: 500),
  });

  final DownloadStatus status;
  final double downloadProgress;
  final VoidCallback onDownload;
  final VoidCallback onCancel;
  final VoidCallback onOpen;
  final Duration transitionDuration;

  bool get _isDownloading => status == DownloadStatus.downloading;

  bool get _isFetching => status == DownloadStatus.fetchingDownload;

  bool get _isDownloaded => status == DownloadStatus.downloaded;

  void _onPressed() {
    switch (status) {
      case DownloadStatus.notDownloaded:
        onDownload();
      case DownloadStatus.fetchingDownload:
        // do nothing.
        break;
      case DownloadStatus.downloading:
        onCancel();
      case DownloadStatus.downloaded:
        onOpen();
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _onPressed,
      child: const Stack(
        children: [
          /* ButtonShapeWidget and progress indicator */
        ],
      ),
    );
  }
}
```

Congratulations! You have a button that changes its display
depending on which phase the button is in: not downloaded,
fetching download, downloading, and downloaded.
Now, the user can tap to start a download, tap to cancel an 
in-progress download, and tap to open a completed download.

恭喜！你已经完成了一个按钮，
它会根据按钮所处的阶段来改变显示效果：未下载、获取下载、下载中和已下载。
现在，用户可以点击按钮来启动下载、取消正在进行的下载，或者打开已完成的下载。

## Interactive example

## 交互示例

Run the app:

运行应用程序：

* Click the **GET** button to kick off a
  simulated download.

  点击 **GET** 按钮开始模拟下载。

* The button changes to a progress indicator
  to simulate an in-progress download.

  按钮会切换到进度指示器，以模拟下载中的状态。

* When the simulated download is complete, the
  button transitions to **OPEN**, to indicate
  that the app is ready for the user
  to open the downloaded asset.

  当模拟下载完成后，
  按钮将过渡到 **OPEN**，
  表示应用已准备好让用户打开下载的资源。

<!-- start dartpad -->

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter download button hands-on example in DartPad" run="true"
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleCupertinoDownloadButton(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

@immutable
class ExampleCupertinoDownloadButton extends StatefulWidget {
  const ExampleCupertinoDownloadButton({super.key});

  @override
  State<ExampleCupertinoDownloadButton> createState() =>
      _ExampleCupertinoDownloadButtonState();
}

class _ExampleCupertinoDownloadButtonState
    extends State<ExampleCupertinoDownloadButton> {
  late final List<DownloadController> _downloadControllers;

  @override
  void initState() {
    super.initState();
    _downloadControllers = List<DownloadController>.generate(
      20,
      (index) => SimulatedDownloadController(
        onOpenDownload: () {
          _openDownload(index);
        },
      ),
    );
  }

  void _openDownload(int index) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text('Open App ${index + 1}')));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Apps')),
      body: ListView.separated(
        itemCount: _downloadControllers.length,
        separatorBuilder: (_, __) => const Divider(),
        itemBuilder: _buildListItem,
      ),
    );
  }

  Widget _buildListItem(BuildContext context, int index) {
    final theme = Theme.of(context);
    final downloadController = _downloadControllers[index];

    return ListTile(
      leading: const DemoAppIcon(),
      title: Text(
        'App ${index + 1}',
        overflow: TextOverflow.ellipsis,
        style: theme.textTheme.titleLarge,
      ),
      subtitle: Text(
        'Lorem ipsum dolor #${index + 1}',
        overflow: TextOverflow.ellipsis,
        style: theme.textTheme.bodySmall,
      ),
      trailing: SizedBox(
        width: 96,
        child: AnimatedBuilder(
          animation: downloadController,
          builder: (context, child) {
            return DownloadButton(
              status: downloadController.downloadStatus,
              downloadProgress: downloadController.progress,
              onDownload: downloadController.startDownload,
              onCancel: downloadController.stopDownload,
              onOpen: downloadController.openDownload,
            );
          },
        ),
      ),
    );
  }
}

@immutable
class DemoAppIcon extends StatelessWidget {
  const DemoAppIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const AspectRatio(
      aspectRatio: 1,
      child: FittedBox(
        child: SizedBox(
          width: 80,
          height: 80,
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: [Colors.red, Colors.blue]),
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            child: Center(
              child: Icon(Icons.ac_unit, color: Colors.white, size: 40),
            ),
          ),
        ),
      ),
    );
  }
}

enum DownloadStatus { notDownloaded, fetchingDownload, downloading, downloaded }

abstract class DownloadController implements ChangeNotifier {
  DownloadStatus get downloadStatus;
  double get progress;

  void startDownload();
  void stopDownload();
  void openDownload();
}

class SimulatedDownloadController extends DownloadController
    with ChangeNotifier {
  SimulatedDownloadController({
    DownloadStatus downloadStatus = DownloadStatus.notDownloaded,
    double progress = 0.0,
    required VoidCallback onOpenDownload,
  }) : _downloadStatus = downloadStatus,
       _progress = progress,
       _onOpenDownload = onOpenDownload;

  DownloadStatus _downloadStatus;
  @override
  DownloadStatus get downloadStatus => _downloadStatus;

  double _progress;
  @override
  double get progress => _progress;

  final VoidCallback _onOpenDownload;

  bool _isDownloading = false;

  @override
  void startDownload() {
    if (downloadStatus == DownloadStatus.notDownloaded) {
      _doSimulatedDownload();
    }
  }

  @override
  void stopDownload() {
    if (_isDownloading) {
      _isDownloading = false;
      _downloadStatus = DownloadStatus.notDownloaded;
      _progress = 0.0;
      notifyListeners();
    }
  }

  @override
  void openDownload() {
    if (downloadStatus == DownloadStatus.downloaded) {
      _onOpenDownload();
    }
  }

  Future<void> _doSimulatedDownload() async {
    _isDownloading = true;
    _downloadStatus = DownloadStatus.fetchingDownload;
    notifyListeners();

    // Wait a second to simulate fetch time.
    await Future<void>.delayed(const Duration(seconds: 1));

    // If the user chose to cancel the download, stop the simulation.
    if (!_isDownloading) {
      return;
    }

    // Shift to the downloading phase.
    _downloadStatus = DownloadStatus.downloading;
    notifyListeners();

    const downloadProgressStops = [0.0, 0.15, 0.45, 0.8, 1.0];
    for (final stop in downloadProgressStops) {
      // Wait a second to simulate varying download speeds.
      await Future<void>.delayed(const Duration(seconds: 1));

      // If the user chose to cancel the download, stop the simulation.
      if (!_isDownloading) {
        return;
      }

      // Update the download progress.
      _progress = stop;
      notifyListeners();
    }

    // Wait a second to simulate a final delay.
    await Future<void>.delayed(const Duration(seconds: 1));

    // If the user chose to cancel the download, stop the simulation.
    if (!_isDownloading) {
      return;
    }

    // Shift to the downloaded state, completing the simulation.
    _downloadStatus = DownloadStatus.downloaded;
    _isDownloading = false;
    notifyListeners();
  }
}

@immutable
class DownloadButton extends StatelessWidget {
  const DownloadButton({
    super.key,
    required this.status,
    this.downloadProgress = 0.0,
    required this.onDownload,
    required this.onCancel,
    required this.onOpen,
    this.transitionDuration = const Duration(milliseconds: 500),
  });

  final DownloadStatus status;
  final double downloadProgress;
  final VoidCallback onDownload;
  final VoidCallback onCancel;
  final VoidCallback onOpen;
  final Duration transitionDuration;

  bool get _isDownloading => status == DownloadStatus.downloading;

  bool get _isFetching => status == DownloadStatus.fetchingDownload;

  bool get _isDownloaded => status == DownloadStatus.downloaded;

  void _onPressed() {
    switch (status) {
      case DownloadStatus.notDownloaded:
        onDownload();
      case DownloadStatus.fetchingDownload:
        // do nothing.
        break;
      case DownloadStatus.downloading:
        onCancel();
      case DownloadStatus.downloaded:
        onOpen();
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _onPressed,
      child: Stack(
        children: [
          ButtonShapeWidget(
            transitionDuration: transitionDuration,
            isDownloaded: _isDownloaded,
            isDownloading: _isDownloading,
            isFetching: _isFetching,
          ),
          Positioned.fill(
            child: AnimatedOpacity(
              duration: transitionDuration,
              opacity: _isDownloading || _isFetching ? 1.0 : 0.0,
              curve: Curves.ease,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  ProgressIndicatorWidget(
                    downloadProgress: downloadProgress,
                    isDownloading: _isDownloading,
                    isFetching: _isFetching,
                  ),
                  if (_isDownloading)
                    const Icon(
                      Icons.stop,
                      size: 14,
                      color: CupertinoColors.activeBlue,
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

@immutable
class ButtonShapeWidget extends StatelessWidget {
  const ButtonShapeWidget({
    super.key,
    required this.isDownloading,
    required this.isDownloaded,
    required this.isFetching,
    required this.transitionDuration,
  });

  final bool isDownloading;
  final bool isDownloaded;
  final bool isFetching;
  final Duration transitionDuration;

  @override
  Widget build(BuildContext context) {
    final ShapeDecoration shape;
    if (isDownloading || isFetching) {
      shape = const ShapeDecoration(
        shape: CircleBorder(),
        color: Colors.transparent,
      );
    } else {
      shape = const ShapeDecoration(
        shape: StadiumBorder(),
        color: CupertinoColors.lightBackgroundGray,
      );
    }

    return AnimatedContainer(
      duration: transitionDuration,
      curve: Curves.ease,
      width: double.infinity,
      decoration: shape,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: AnimatedOpacity(
          duration: transitionDuration,
          opacity: isDownloading || isFetching ? 0.0 : 1.0,
          curve: Curves.ease,
          child: Text(
            isDownloaded ? 'OPEN' : 'GET',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: CupertinoColors.activeBlue,
            ),
          ),
        ),
      ),
    );
  }
}

@immutable
class ProgressIndicatorWidget extends StatelessWidget {
  const ProgressIndicatorWidget({
    super.key,
    required this.downloadProgress,
    required this.isDownloading,
    required this.isFetching,
  });

  final double downloadProgress;
  final bool isDownloading;
  final bool isFetching;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1,
      child: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: downloadProgress),
        duration: const Duration(milliseconds: 200),
        builder: (context, progress, child) {
          return CircularProgressIndicator(
            backgroundColor:
                isDownloading
                    ? CupertinoColors.lightBackgroundGray
                    : Colors.transparent,
            valueColor: AlwaysStoppedAnimation(
              isFetching
                  ? CupertinoColors.lightBackgroundGray
                  : CupertinoColors.activeBlue,
            ),
            strokeWidth: 2,
            value: isFetching ? null : progress,
          );
        },
      ),
    );
  }
}
```
