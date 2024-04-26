---
title: Networking
title: 网络
description: Internet network calls in Flutter.
description: 在 Flutter 中访问网络
tags: 数据调用和后端
keywords: 网络请求
---

## Cross-platform http networking

## 跨平台 http 网络

The [`http`][] package provides the simplest way to issue http requests. This
package is supported on Android, iOS, macOS, Windows, Linux and the web.

[`http`][] package 提供了 http 请求最简单易用的方法。
该 package 支持 Android、iOS、macOS、Windows、Linux 以及 Web。

## Platform notes

## 平台说明

Some platforms require additional steps, as detailed below.

部分平台需要额外的步骤，详见下文。

### Android

Android apps must [declare their use of the internet][declare] in the Android
manifest (`AndroidManifest.xml`):

Android 应用程序必须在 Android manifest (`AndroidManifest.xml`) 中
[声明使用网络权限][declare]

```xml
<manifest xmlns:android...>
 ...
 <uses-permission android:name="android.permission.INTERNET" />
 <application ...
</manifest>
```

### macOS

macOS apps must allow network access in the relevant `*.entitlements` files. 

macOS 应用程序必须在相关 `*.entitlements` 的文件中允许网络访问。

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Learn more about [setting up entitlements][].

了解更多信息，请查阅 [设置 entitlements][setting up entitlements]。

[setting up entitlements]: /platform-integration/macos/building#setting-up-entitlements

## Samples

## 示例

For a practical sample of various networking tasks (incl. fetching data,
WebSockets, and parsing data in the background) see the 
[networking cookbook](/cookbook#networking).

有关各种网络任务（包括：获取数据、WebSockets 和后台解析数据）的
实用示例，请查阅 [网络 cookbook](/cookbook#networking)。

[declare]: {{site.android-dev}}/training/basics/network-ops/connecting
[`http`]: {{site.pub-pkg}}/http
