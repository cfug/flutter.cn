---
# title: Removal of AssetManifest.json
title: 移除 AssetManifest.json
# description: >-
#     Built Flutter apps will no longer include an AssetManifest.json asset file.
description: >-
  构建后的 Flutter 应用将不再包含 AssetManifest.json 资源文件。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Flutter apps included an asset file named `AssetManifest.json`.
This file effectively contains a list of assets.
Application code can read it using the [`AssetBundle`][] API to
determine what assets are available at runtime.

Flutter 应用曾包含一个名为 `AssetManifest.json` 的资源文件。
该文件实际上是一份资源列表。
应用代码可以通过 [`AssetBundle`][`AssetBundle`] API 读取它，
从而在运行时判断有哪些资源可用。

The `AssetManifest.json` file is an undocumented implementation detail.
It's no longer used by the framework, and it's planned to
no longer generate it in a future release of Flutter.
If your app's code needs to get a list of available assets,
use the [`AssetManifest`][] API instead.

`AssetManifest.json` 文件是未公开的实现细节。
框架已不再使用它，并计划在未来的 Flutter 版本中不再生成该文件。
如果应用代码需要获取可用资源列表，请改用 [`AssetManifest`][`AssetManifest`] API。

## Migration guide

## 迁移指南

### Reading asset manifest from Flutter application code

### 从 Flutter 应用代码读取资源清单

Before:

之前：

```dart
import 'dart:convert';
import 'package:flutter/services.dart';

void readAssetList() async {
  final assetManifestContent = await rootBundle.loadString('AssetManifest.json');
  final decodedAssetManifest =
      json.decode(assetManifestContent) as Map<String, Object?>;
  final assets = decodedAssetManifest.keys.toList().cast<String>();
}
```

After:

之后：

```dart
import 'package:flutter/services.dart';

void readAssetList() async {
  final assetManifest = await AssetManifest.loadFromAssetBundle(rootBundle);
  final assets = assetManifest.listAssets();
}
```

### Reading asset manifest information from Dart code outside of a Flutter app

### 从 Flutter 应用之外的 Dart 代码读取资源清单信息

The `flutter` CLI tool generates a new file, `AssetManifest.bin`.
This replaces `AssetManifest.json`.
This file contains the same information as `AssetManifest.json`,
but in a different format.
If you need to read this file from code that isn't part of a Flutter app, and
therefore can't use the [`AssetManifest`][] API,
you can still parse the file yourself.

`flutter` 命令行工具会生成新文件 `AssetManifest.bin`。
它取代了 `AssetManifest.json`。
该文件包含与 `AssetManifest.json` 相同的信息，但格式不同。
如果你需要从不属于 Flutter 应用的代码中读取此文件，
因而无法使用 [`AssetManifest`][`AssetManifest`] API，
仍然可以自行解析该文件。

The [`standard_message_codec`][] package can be used to parse the contents.

可以使用 [`standard_message_codec`][`standard_message_codec`] package 来解析其内容。

```dart
import 'dart:io';
import 'dart:typed_data';

import 'package:standard_message_codec/standard_message_codec.dart';

void main() {
  // The path to AssetManifest.bin depends on the target platform.
  final pathToAssetManifest = './build/web/assets/AssetManifest.bin';
  final manifest = File(pathToAssetManifest).readAsBytesSync();
  final decoded = const StandardMessageCodec()
      .decodeMessage(ByteData.sublistView(manifest));
  final assets = decoded.keys.cast<String>().toList();
}
```

Keep in mind that `AssetManifest.bin` is an implementation detail of Flutter.
Reading this file isn't an officially supported workflow.
The contents or format of the file might change in
a future Flutter release without an announcement.

请记住，`AssetManifest.bin` 是 Flutter 的实现细节。
读取此文件并不是官方支持的工作流。
文件的内容或格式可能在未来的 Flutter 版本中发生变化，且不会另行公告。

## Timeline

## 时间线

`AssetManifest.json` will no longer be generated starting with
the fourth stable release after 3.19 or one year after the release of 3.19,
whichever comes later.

从 3.19 之后的第四个稳定版起，或 3.19 发布一年之后
（以较晚者为准），将不再生成 `AssetManifest.json`。

## References

## 参考资料

Relevant issues:

相关 issue：

* When building a Flutter app, the flutter tool generates an
  `AssetManifest.json` file that's unused by the framework [(Issue #143577)][]

  构建 Flutter 应用时，flutter 工具会生成框架并未使用的
  `AssetManifest.json` 文件 [(Issue #143577)][(Issue #143577)]

Relevant PR:

相关 PR：

* [Remove deprecated `AssetManifest.json` file][PR 172594]

  [移除已弃用的 `AssetManifest.json` 文件][PR 172594]

[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html
[`AssetManifest`]: {{site.api}}/flutter/services/AssetManifest-class.html
[(Issue #143577)]: {{site.repo.flutter}}/issues/143577
[`standard_message_codec`]: {{site.pub-pkg}}/standard_message_codec
[PR 172594]: {{site.repo.flutter}}/pull/172594
