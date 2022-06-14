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

As of the current release,
Flutter supports the following platforms:

Flutter 3 稳定版正式发布之后，
Flutter 支持的平台列表如下：

|Platform|Version                       |Channels |
|平台     | 版本                         | Flutter 版本发布渠道 |
|--------|------------------------------|---------|
|Android | API 19 & above               | All     |
|Android | API 19 及更高的版本            | 所有    |
|iOS     | iOS 9 & above                | All     |
|iOS     | iOS 9 及更高的版本             | 所有     |
|Linux   | Debian 10 & above            | All     |
|Linux   | Debian 10 及更高的版本         | 所有     |
|macOS   | El Capitan & above           | All     |
|macOS   | El Capitan 及更高的版本        | 所有     |
|Web     | Chrome 84  & above           | All     |
|Web     | Chrome 84  及更高的版本        | 所有     |
|Web     | Firefox 72.0 & above         | All     |
|Web     | Firefox 72.0 及更高的版本      | 所有     |
|Web     | Safari on El Capitan & above | All     |
|Web     | Safari on El Capitan 及更高的版本| 所有   |
|Web     | Edge 1.2.0 & above           | All     |
|Web     | Edge 1.2.0 及更高的版本        | 所有     |
|Windows | Windows 10 & above           | All     |
|Windows | Windows 10 及更高的版本        | 所有     |

All channels include master, beta,
and stable channels. 

Flutter 版本发布渠道中的「所有」渠道，
包括 master、beta 和 stable 发布渠道。

{{site.alert.note}}

  The dev channel is retired. For more information,
  refer to [What's new in Flutter 2.8][].
  
  dev 发布渠道已正式弃用。
  详细信息请查阅 [Flutter 2.8 更新详解][] 文章。
{{site.alert.end}}

[What's new in Flutter 2.8]: {{site.medium}}/flutter/whats-new-in-flutter-2-8-d085b763d181
[Flutter 2.8 更新详解]: https://flutter.cn/posts/whats-new-in-flutter-2-8

## How we define a supported platform

## 我们如何定义一个已支持的平台

We define three tiers of support for the platforms on
which Flutter runs:

我们为 Flutter 的平台支持定义了三个等级：

1. Supported Google-tested platforms,
   which are platforms the Flutter team at 
   Google tests in continuous integration at every commit. 

   **完全支持** 谷歌公司级别的平台，
   这些平台“归属”在整个公司级别的产品测试体系下、
   Flutter 团队每次提交时都会进行集成测试的平台。

1. Best effort platforms, supported through community
   testing, are platforms we believe we support through
   coding practices and ad-hoc testing,
   but rely on the community for testing.

   **尽力支持** 由社区维护的测试平台，
   我们相信这些平台是通过编码实践和特别测试支持的，
   但依赖社区（非官方）进行测试。

1. Unsupported platforms, which are platforms that
   might work, but that the development team
   doesn't directly test or support.

   **不受支持** 的平台，
   这些平台可能是可以正常工作的，
   但开发团队不会直接测试或提供支持。

### Supported Google-tested platforms

### 完全支持的平台

|Platform|Version               |
|平台    |版本                   |
|--------|----------------------|
|Android |Android SDK 30        |
|Android |Android SDK 29        |
|Android |Android SDK 28        |
|Android |Android SDK 27        |
|Android |Android SDK 26        |
|Android |Android SDK 25        |
|Android |Android SDK 24        |
|Android |Android SDK 23        |
|Android |Android SDK 22        |
|Android |Android SDK 21        |
|Android |Android SDK 19        |
|iOS     |14-15                 |
|Web     |Chrome 84             |
|Web     |Firefox 72.0          |
|Web     |Safari / Catalina     |
|Web     |Edge 1.2.0            |
|Windows |Windows 10            |
|macOS   |El Capitan & greater  |
|macOS   |El Capitan 及更高的版本 |
|Linux   |Debian 10             |

Note that Android SDK 20 is covered by
testing Android SDK 19, as the differences
between the two platform versions are minimal.

请注意，Android SDK 19 的测试涵盖了 Android SDK 20，
因为两个版本之间的差异很小。

### Best effort platforms tested by the community

### 尽力支持的平台

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
|Linux   |Debian 及更低的版本|

### Unsupported platforms

### 不受支持的平台

|Platform|Version                                     |
|平台     |版本                                         |
|--------|--------------------------------------------|
|Android |Android SDK 18 & below                      |
|Android |Android SDK 18 及更低的版本                   |
|iOS     |[iOS 8][] & below and [`arm7v` 32-bit iOS][]|
|iOS     |[iOS 8][] 及更低的版本 and [`armv7` 架构的 32 位 iOS][`arm7v` 32-bit iOS] 系统|
|Windows |Windows Vista & below                       |
|Windows |Windows Vista 及更低的版本                    |
|Windows |Any 32-bit platform                         |
|macOS   |Yosemite & below                            |
|macOS   |Yosemite & 及更低的版本                       |

[iOS 8]: {{site.url}}/go/rfc-ios8-deprecation
[`arm7v` 32-bit iOS]: {{site.url}}/go/rfc-32-bit-ios-unsupported
