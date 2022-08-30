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
|Android | API 16 (Android 4.1) & above | All     |
|Android | API 16 (Android 4.1) 及更高的版本 | 所有    |
|iOS     | iOS 9 & above                | All     |
|iOS     | iOS 9 及更高的版本             | 所有     |
|Linux   | Debian, 64-bit               | All     |
|Linux   | Debian, 64-bit               | 所有     |
|macOS   | El Capitan (10.11) & above   | All     |
|macOS   | El Capitan (10.11)及更高的版本 | 所有     |
|Web     | Chrome 84  & above           | All     |
|Web     | Chrome 84  及更高的版本        | 所有     |
|Web     | Firefox 72.0 & above         | All     |
|Web     | Firefox 72.0 及更高的版本      | 所有     |
|Web     | Safari on El Capitan & above | All     |
|Web     | Safari on El Capitan 及更高的版本| 所有   |
|Web     | Edge 1.2.0 & above           | All     |
|Web     | Edge 1.2.0 及更高的版本        | 所有     |
|Windows | Windows 7 & above, 64-bit    | All     |
|Windows | 64 位 Windows 7 及更高的版本   | 所有     |

All channels include master, beta,
and stable channels. 

Flutter 版本发布渠道中的「所有」渠道，
包括 master、beta 和 stable 发布渠道。

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
|Android |Android SDK 21–30     |
|Android |Android SDK 19        |
|iOS     |14-15                 |
|Linux   |Debian 10             |
|macOS   |El Capitan & greater  |
|Web     |Chrome 84             |
|Web     |Firefox 72.0          |
|Web     |Safari / Catalina     |
|Web     |Edge 1.2.0            |
|Windows |Windows 10            |

Note that Android SDK 20 is covered by
testing Android SDK 19, as the differences
between the two platform versions are minimal.

请注意，Android SDK 19 的测试涵盖了 Android SDK 20，
因为两个版本之间的差异很小。

### Best-effort platforms

### 尽力支持的平台

|Platform|Version             |
|--------|--------------------|
|Android |Android SDK 20      |
|Android |Android SDK 16–18   |
|Android |Android SDK 17      |
|Android |Android SDK 16      |
|iOS     |iOS 9-13            |
|Linux   |Debian 9 & below    |
|Linux   |Debian 9 以及更低的版本|
|Windows |Windows 8           |
|Windows |Windows 7           |

### Unsupported platforms

### 不受支持的平台

|Platform|Version                                     |
|平台     |版本                                         |
|--------|--------------------------------------------|
|Android |Android SDK 15 & below                      |
|Android |Android SDK 18 及更低的版本                   |
|iOS     |[iOS 8][] & below and [`arm7v` 32-bit iOS][]|
|iOS     |[iOS 8][] 及更低的版本 and [`armv7` 架构的 32 位 iOS][`arm7v` 32-bit iOS] 系统|
|Linux   |Any 32-bit platform                         |
|Linux   |任何 32 位的平台                              |
|Windows |Windows Vista & below                       |
|Windows |Windows Vista 及更低的版本                    |
|Windows |Any 32-bit platform                         |
|Windows |任何 32 位的平台                              |
|macOS   |Yosemite & below                            |
|macOS   |Yosemite 及更低的版本                         |

[iOS 8]: {{site.url}}/go/rfc-ios8-deprecation
[`arm7v` 32-bit iOS]: {{site.url}}/go/rfc-32-bit-ios-unsupported
