---
# title: Play or stream sound and music with flutter_soloud
title: 使用 flutter_soloud 播放或流式传输声音与音乐
# description: >-
#   Learn how to play or stream audio in
#   your Flutter app using the flutter_soloud package.
description: >-
  了解如何在你的 Flutter 应用中使用 flutter_soloud package
  播放或流式传输音频。
ai-translated: true
---

This recipe demonstrates how to integrate the [`flutter_soloud` package][]
into your Flutter application to play sound effects and
background music with low latency.
To get started using the package, follow these steps:

本食谱演示如何将 [`flutter_soloud` package][] 集成到你的 Flutter 应用中，以低延迟播放音效和背景音乐。要开始使用该 package，请按以下步骤操作：

[`flutter_soloud` package]: {{site.pub-pkg}}/flutter_soloud

## 1. Add the package dependency

## 1. 添加 package 依赖

To add `package:flutter_soloud` as a dependency, use `flutter pub add`:

要将 `package:flutter_soloud` 添加为依赖，请使用 `flutter pub add`：

```console
$ flutter pub add flutter_soloud
```

## 2. Initialize `SoLoud`

## 2. 初始化 `SoLoud`

Before playing any audio,
you need to initialize the `SoLoud` instance.
You can also configure playback settings like sample rate,
buffer size, and the number of channels.

在播放任何音频之前，你需要初始化 `SoLoud` 实例。你还可以配置采样率、缓冲区大小和声道数等播放设置。

```dart
import 'package:flutter_soloud/flutter_soloud.dart';

// Initialize with default settings.
await SoLoud.instance.init();

// Or configure with custom settings.
await SoLoud.instance.init(
  sampleRate: 44100,
  bufferSize: 2048,
  channels: Channels.stereo,
);
```

## 3. Load audio

## 3. 加载音频

The `flutter_soloud` package supports various audio formats
including MP3, WAV, OGG, and FLAC.
You can load audio from different sources.

`flutter_soloud` package 支持 MP3、WAV、OGG、FLAC 等多种音频格式。你可以从不同来源加载音频。

From a local file:

从本地文件：

```dart
final sound = await SoLoud.instance.loadFile('path/to/sound.mp3');
```

From an app asset:

从应用资源：

```dart
final sound = await SoLoud.instance.loadAsset('assets/sound.mp3');
```

From a network URL:

从网络 URL：

```dart
final sound = await SoLoud.instance.loadUrl(
  'https://example.com/sound.mp3',
  mode: LoadMode.memory,
);
```

From bytes in memory:

从内存中的字节：

```dart
// TODO: Replace with your actual audio data.
final soundBytes = Uint8List.fromList([]);

final sound = await SoLoud.instance.loadMem(
  'reference_name.mp3',
  soundBytes,
  mode: LoadMode.memory,
);
```

## 4. Play audio

## 4. 播放音频

Once the audio is loaded,
you can play it using `SoLoud.instance.play`.
You can also configure gapless looping.

音频加载完成后，你可以使用 `SoLoud.instance.play` 播放。你还可以配置无缝循环。

```dart
// Play the sound.
var handle = await SoLoud.instance.play(sound);

// Play with gapless looping.
handle = await SoLoud.instance.play(
  sound,
  looping: true,
  loopingStartAt: Duration(seconds: 1),
);
```

The `play` method returns a handle that references
that particular instance of the sound being played.
You can use this handle to control the playback.

`play` 方法返回一个 handle，用于引用正在播放的该声音实例。你可以使用此 handle 控制播放。

## 5. Control playback

## 5. 控制播放

With the handle returned from `play`,
you can perform various actions such as pausing or resuming playback:

使用 `play` 返回的 handle，你可以执行暂停或恢复播放等多种操作：

```dart
// Toggle pause state.
SoLoud.instance.pauseSwitch(handle);
```

Seek to a specific timestamp:

跳转到指定时间戳：

```dart
SoLoud.instance.seek(handle, Duration(seconds: 5));
```

Set playback speed:

设置播放速度：

```dart
// Play twice as fast.
SoLoud.instance.setRelativePlaySpeed(handle, 2.0);
```

Adjust playback volume:

调整播放音量：

```dart
// Set playback to 50% volume.
SoLoud.instance.setVolume(handle, 0.5);
```

Fade the audio volume:

淡入淡出音量：

```dart
SoLoud.instance.fadeVolume(
  handle,
  0.0, // The volume to fade to.
  Duration(seconds: 2), // The duration of the fade.
);
```

Stop playback:

停止播放：

```dart
await SoLoud.instance.stop(handle);
```

## 6. Dispose of sound sources

## 6. 释放声音源

When you are finished with a sound source,
remember to dispose of it to free up resources.

当你不再使用某个声音源时，记得释放它以释放资源。

```dart
await SoLoud.instance.disposeSource(sound);
```

## 7. [Optional] Stream audio

## 7. [可选] 流式传输音频

The `flutter_soloud` package also supports streaming
audio data in real time.

`flutter_soloud` package 还支持实时流式传输音频数据。

Initialize and configure a buffer stream:

初始化并配置缓冲区流：

```dart
final stream = SoLoud.instance.setBufferStream(
  bufferingType: BufferingType.released,
  sampleRate: 24000,
  channels: Channels.mono,
  format: BufferType.s16le, // pcm16bits
);
```

Play the stream:

播放流：

```dart
final handle = await SoLoud.instance.play(stream);
```

As your app receives audio data, add it to the stream:

当你的应用收到音频数据时，将其添加到流中：

```dart
// TODO: Replace with your actual audio data.
final audioChunk = Uint8List.fromList([]);

SoLoud.instance.addAudioDataStream(
  stream,
  audioChunk,
);
```

When you're done with the audio stream, mark it as complete:

当你完成音频流时，将其标记为已完成：

```dart
SoLoud.instance.setDataIsEnded(stream);
```

## More information

## 更多信息

For more detailed information and examples,
visit the [`flutter_soloud` package][] on pub.dev or
check out the `flutter_soloud` Package of the Week video.

更多详细信息和示例，请访问 pub.dev 上的 [`flutter_soloud` package][]，或观看 `flutter_soloud` Package of the Week 视频。

<div class="video-wrapper">
  <YouTubeEmbed id="2t6Bt04EyLw" title="flutter_soloud - Package of the Week"></YouTubeEmbed>
</div>
