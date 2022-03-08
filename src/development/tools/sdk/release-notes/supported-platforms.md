---
title: Supported platforms
title: 已支持的平台
short-title: Supported platforms
short-title: 已支持的平台
description: The platforms that Flutter supports by platform version.
description: Flutter 支持的平台以及版本号
---

## Supported platforms

## 已支持的平台

As of the current release, Flutter supports the following platforms:

基于现有的稳定版本，Flutter 支持以下平台：

|Platform|Version                       |Channels |
|--------|------------------------------|---------|
|平台     |版本                           |渠道      |
|Android | API 19 & above               | All     |
|Android | API 19 及以上                 | 全部     |
|iOS     | iOS 9 & above                | All     |
|iOS     | iOS 9 及以上                  | 全部     |
|Linux   | Debian 10 & above            | All     |
|Linux   | Debian 10 及以上              | 全部     |
|macOS   | El Capitan & above           | All     |
|macOS   | El Capitan 及以上             | 全部     |
|Web     | Chrome 84  & above           | All     |
|Web     | Chrome 84  及以上             | 全部     |
|Web     | Firefox 72.0 & above         | All     |
|Web     | Firefox 72.0 及以上           | 全部     |
|Web     | Safari on El Capitan & above | All     |
|Web     | Safari on El Capitan 及以上   | 全部     |
|Web     | Edge 1.2.0 & above           | All     |
|Web     | Edge 1.2.0 及以上             | 全部     |
|Windows | Windows 7 & above            | All     |
|Windows | Windows 7 及以上              | 全部     |

All channels include master, beta and stable channels. 

「全部」渠道包括 master、beta 和 stable 渠道。

**Please note - dev channel has been retired. Refer to this [blog](https://medium.com/flutter/whats-new-in-flutter-2-8-d085b763d181) for more information.**

**请注意，dev 渠道已经弃用，详细信息请查阅 <a href="https://flutter.cn/posts/whats-new-in-flutter-2-8">Flutter 2.8 更新详解</a> 文章。**

## How we define a supported platform

## 我们如何定义一个已支持的平台

We define three tiers of support for the platforms on which Flutter runs:

我们为 Flutter 运行的平台定义了三层支撑：

1. Supported Google-tested platforms,
   which are platforms the Flutter team at 
   Google tests in continuous integration at every commit. 
   
   完全支持谷歌测试的平台，这些平台是谷歌 Flutter 团队在每次提交时集成测试的平台。
   
1. Best effort platforms, supported community testing,
   which are platforms we believe we support through coding practices 
    and ad-hoc testing, but rely on the community for testing.

   尽力支持社区的测试平台，我们相信这些平台是通过编码实践和特别测试支持的，
   但依赖社区进行测试。

1. Unsupported platforms, which are platforms that may work,
   but that the development team does not directly test or support.
   
   不受支持的平台，这些平台可以工作，但开发团队不直接测试或支持。

### Supported Google-tested platforms

### 支持谷歌测试的平台

|Platform|Version              |
|-------|----------------------|
|平台    |版本                   |
|Android|Android SDK 30        |
|Android|Android SDK 29        |
|Android|Android SDK 28        |
|Android|Android SDK 27        |
|Android|Android SDK 26        |
|Android|Android SDK 25        |
|Android|Android SDK 24        |
|Android|Android SDK 23        |
|Android|Android SDK 22        |
|Android|Android SDK 21        |
|Android|Android SDK 19        |
|iOS    | 14-15                |
|Web    | Chrome 84            |
|Web    | Firefox 72.0         |
|Web    | Safari / Catalina    |
|Web    | Edge 1.2.0           |
|Windows| Windows 10           |
|macOS  | El Capitan & greater |
|Linux  | Debian 10            |

Note that Android SDK 20 is covered by testing Android SDK 19, 
as the differences between the two platform versions are
minimal.

请注意，Android SDK 19 的测试涵盖 Android SDK 20，因为两个版本之间的差异很小。

### Best effort platforms tested by the community

### 社区测试尽力支持的平台

|Platform|Version       |
|--------|---------------|
|平台     |版本 
|Android |Android SDK 20 |
|Android |Android SDK 18 |
|Android |Android SDK 17 |
|Android |Android SDK 16 |
|iOS     |iOS 9-13       |
|Windows |Windows 8      |
|Windows |Windows 7      |
|Linux   |Debian & below |

We have dropped iOS8 support. For more information,
see [go/rfc-ios8-deprecation] for details.

我们已经放弃对 iOS 8 的支持。
更多信息，请参阅我们 [对 iOS 8 放弃支持的提案文档](https://files.flutter-io.cn/flutter-design-docs/RFC_iOS_8_Deprecation(PUBLICLY_SHARED).pdf)。

[go/rfc-ios8-deprecation]: {{site.url}}/go/rfc-ios8-deprecation

### Unsupported platforms

### 不受支持的平台

|Platform|Version                |
|--------|-----------------------|
|平台     | 版本                    |
|Android | Android SDK 18 & below|
|Android | Android SDK 18 及以上    |
|iOS     | iOS 8 & below         |
|iOS     | iOS 8 及以上             |
|Windows | Windows Vista & below |
|Windows | Windows Vista 及以上     |
|Windows | Any 32-bit platform   |
|Windows | 任何 32 位平台             |   
|macOS   | Yosemite & below      |
|macOS   | Yosemite 及以上          |
