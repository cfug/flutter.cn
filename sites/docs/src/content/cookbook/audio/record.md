---
# title: Record or stream audio input
title: 录制或流式传输音频输入
# description: >-
#   Learn how to record or stream audio input in
#   your Flutter app using the record package.
description: >-
  了解如何在你的 Flutter 应用中使用 record package
  录制或流式传输音频输入。
ai-translated: true
---

This recipe demonstrates how to use the [`record` package][] to add
audio recording and streaming capabilities to your Flutter app.
To get started using the package, follow these steps:

本食谱演示如何使用 [`record` package][] 为你的 Flutter 应用添加音频录制与流式传输能力。要开始使用该 package，请按以下步骤操作：

[`record` package]: {{site.pub-pkg}}/record

## 1. Add the package dependency

## 1. 添加 package 依赖

To add `package:record` as a dependency, use `flutter pub add`:

要将 `package:record` 添加为依赖，请使用 `flutter pub add`：

```console
$ flutter pub add record
```

## 2. Initialize an `AudioRecorder`

## 2. 初始化 `AudioRecorder`

Initialize an `AudioRecorder` object. This is the primary object
that controls the recording process.

初始化一个 `AudioRecorder` 对象。这是控制录制过程的主要对象。

```dart
import 'package:record/record.dart';

final recorder = AudioRecorder();
```

## 3. Request user permission

## 3. 请求用户权限

Before recording, you need to request user permission.
You might also need to add platform-specific permission configurations.
Refer to the [`record` package][] documentation for details.

录制前，你需要请求用户权限。你可能还需要添加各平台特定的权限配置。详情请参阅 [`record` package][] 文档。

```dart
final recorder = AudioRecorder();
if (await recorder.hasPermission()) {
  // Permission granted, proceed with recording.
} else {
  // Permission denied.
}
```

## 4. Create a recording configuration

## 4. 创建录制配置

Create and configure a `RecordConfig` object to specify the record settings,
such as the encoder, sample rate, and channel number.
You can also enable features like auto gain, echo cancellation,
and noise suppression.

创建并配置 `RecordConfig` 对象以指定录制设置，例如编码器、采样率和声道数。你还可以启用自动增益、回声消除和噪声抑制等功能。

```dart
final recordConfig = RecordConfig(
  encoder: AudioEncoder.pcm16bits,
  sampleRate: 24000,
  numChannels: 1,
  autoGain: true,
  echoCancel: true,
  noiseSuppress: true,
);
```

## 5. Start recording to a file

## 5. 开始录制到文件

To start recording to a file,
call the `start` method on the `AudioRecorder`,
passing in the `recordConfig` you defined
and the path where the file should be stored.

要开始录制到文件，请在 `AudioRecorder` 上调用 `start` 方法，传入你定义的 `recordConfig` 以及文件应保存的路径。

```dart
// TODO: Specify the path where the audio file should be saved.
final audioFilePath = 'myRecording.wav';
await recorder.start(recordConfig, path: audioFilePath);
```

## 6. Control an ongoing recording

## 6. 控制进行中的录制

You can control an ongoing recording using the
`pause`, `resume`, and `stop` methods on the `AudioRecorder`.

你可以使用 `AudioRecorder` 上的 `pause`、`resume` 和 `stop` 方法来控制进行中的录制。

```dart
await recorder.pause();
await recorder.resume();
await recorder.stop();
```

## 7. [Optional] Record to an audio stream

## 7. [可选] 录制到音频流

To stream audio, use the `startStream` method.
This returns a [stream][] of audio data.

要流式传输音频，请使用 `startStream` 方法。该方法会返回音频数据的 [stream][]。

```dart
final stream = await recorder.startStream(recordConfig);
stream.listen((audioChunk) {
  // Process the audio data. For example, send it to a server.
});
```

[stream]: {{site.api}}/flutter/dart-async/Stream-class.html

## 8. Stop recording

## 8. 停止录制

To stop the recording and get the path to the saved file,
call the asynchronous `stop` method on the `AudioRecorder`.

要停止录制并获取已保存文件的路径，请在 `AudioRecorder` 上调用异步的 `stop` 方法。

```dart
final path = await recorder.stop();
print('Recording stopped. File saved to: $path');
```

## 9. Dispose of the recorder

## 9. 释放 recorder

When you are finished using the `AudioRecorder`,
remember to call its `dispose` method to release its resources.

当你不再使用 `AudioRecorder` 时，记得调用其 `dispose` 方法以释放资源。

```dart
await recorder.dispose();
```

## Supported formats and encodings

## 支持的格式与编码

The `record` package supports various encoders and file formats,
but support varies by platform.
For the full list of supported encoders per platform,
check out the package's [encoding support table][].

`record` package 支持多种编码器和文件格式，但各平台支持情况不同。要查看各平台支持的完整编码器列表，请参阅该 package 的 [编码支持表][encoding support table]。

For more detailed information and examples,
visit the [`record` package][] page on pub.dev or
check out the `record` Package of the Week video.

更多详细信息和示例，请访问 pub.dev 上的 [`record` package][] 页面，或观看 `record` Package of the Week 视频。

<div class="video-wrapper">
  <YouTubeEmbed id="Vv2A_nUL1tw" title="record - Package of the Week"></YouTubeEmbed>
</div>

[encoding support table]: {{site.pub-pkg}}/record#file
