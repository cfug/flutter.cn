---
title: Networking
title: 网络
description: Internet network calls in Flutter.
description: 在 Flutter 中访问网络
tags: 数据调用和后端
keywords: 网络请求
---

## Cross-platform http networking

## 跨平台 http 通信

The [`http`][] package provides the simplest way to issue http requests. This
package is supported on Android, iOS, macOS, Windows, Linux and the web.

[`http`][]包提供了简单易用的提交http请求的接口，它被多种平台广泛支持，例如Android, iOS, macOS, Windows, Linux以及Web。

## Platform notes

## 平台特殊说明

Some platforms require additional steps, as detailed below.

一些平台需要一些额外的操作，如下所示。

### Android

### Android

Android apps must [declare their use of the internet][declare] in the Android
manifest (`AndroidManifest.xml `):

Android应用必须在配置文件(`AndroidManifest.xml `)中[声明其使用网络][declare]。

```
<manifest xmlns:android...>
 ...
 <uses-permission android:name="android.permission.INTERNET" />
 <application ...
</manifest>
```

### macOS

### macOS

macOS apps must allow network access in the relevant `.entitlements` files. 

macOS应用必须在相关配置文件`.entitlements`中允许其访问网络。

```
<key>com.apple.security.network.client</key>
<true/>
```

Learn more about [setting up entitlements][].

了解更多关于[设置权限][setting up entitlements].

[setting up entitlements]: {{site.url}}/platform-integration/macos/building#setting-up-entitlements

## Samples

## 示例

For a practical sample of various networking tasks (incl. fetching data,
WebSockets, and parsing data in the background) see the 
[networking cookbook]({{site.url}}/cookbook#networking).

对于各种网络任务的实际样本（包括获取数据、WebSockets，以及在后台解析数据），请参见[networking cookbook]({{site.url}}/cookbook#networking)。

[declare]: {{site.android-dev}}/training/basics/network-ops/connecting
[`http`]: {{site.pub-pkg}}/http
