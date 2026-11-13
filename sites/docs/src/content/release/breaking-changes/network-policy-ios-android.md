---
# title: Insecure HTTP connections are disabled by default on iOS and Android
title: iOS 和 Android 默认禁用不安全的 HTTP 连接
# description: >
#   Accessing a URL with HTTP protocol throws an exception unless
#   the domain is explicitly allowed by policy.
description: >-
  使用 HTTP 协议访问 URL 会抛出异常，
  除非策略明确允许该域名。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

If your code tries to open an HTTP connection to a host
on iOS or Android, a `StateException` is now thrown with
the following message:

如果你的代码试图在 iOS 或 Android 上打开到某台主机的 HTTP 连接，
现在会抛出 `StateException`，消息如下：

```plaintext
Insecure HTTP is not allowed by platform: <host>
```

Use HTTPS instead.

请改用 HTTPS。

## Context

## 背景

Starting with Android [API 28][] and [iOS 9][],
these platforms disable insecure HTTP connections by default.

从 Android [API 28][] 和 [iOS 9][] 开始，
这些平台默认禁用不安全的 HTTP 连接。

With this change Flutter also disables insecure connections on
mobile platforms. Other platforms (desktop, web, etc)
are not affected.

此次变更后，Flutter 也会在移动平台上禁用不安全连接。
其他平台（桌面、Web 等）不受影响。

You can override this behavior by following the
platform-specific guidelines to define a domain-specific
network policy. See the migration guide below for details.

你可以按照各平台的指南定义针对特定域名的网络策略，
从而覆盖此行为。详情请参阅下面的迁移指南。

[API 28]: {{site.android-dev}}/training/articles/security-config#CleartextTrafficPermitted
[iOS 9]: {{site.apple-dev}}/documentation/bundleresources/information_property_list/nsapptransportsecurity

:::important
The following only applies to platform native sockets (sockets owned
by the Android and iOS platforms).

以下内容仅适用于平台原生 socket
（由 Android 和 iOS 平台持有的 socket）。

Flutter does not enforce any policy at socket level; you would be
responsible for securing the connection. If the socket is owned by
Dart/Flutter, no policy will be enforced.

Flutter 不会在 socket 层面强制执行任何策略；
你需要自行保证连接安全。
如果 socket 由 Dart/Flutter 持有，则不会强制执行策略。
:::

## Migration guide

## 迁移指南

On iOS, you can add [NSExceptionDomains][] to your
application's Info.plist.

在 iOS 上，可以把 [NSExceptionDomains][] 添加到应用的 Info.plist。

On Android, you can add a [network security config][] XML.

在 Android 上，可以添加一份 [网络安全配置][network security config] XML。

### Allowing cleartext connection for debug builds

### 允许调试构建使用明文连接

If you would like to allow HTTP connections for Android debug
builds, you can add the following snippet to your $project_path\android\app\src\debug\AndroidManifest.xml:

如果希望 Android 调试构建允许 HTTP 连接，
可以把以下片段添加到
$project_path\android\app\src\debug\AndroidManifest.xml：

```xml
<application android:networkSecurityConfig="@xml/network_security_config">
  ...
</application>
```

Then, add the network configuration to your $project_path/android/app/src/debug/res/xml/network_security_config.xml:

然后，把网络配置添加到
$project_path/android/app/src/debug/res/xml/network_security_config.xml：

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

It is also possible to set the policy per domain.  See the Android
documentation for more information.

也可以按域名设置策略。更多信息请参阅 Android 文档。

For iOS, you can follow [these instructions][] to create a `Info-debug.plist`
and put this in:

对于 iOS，可以按照 [这些说明][these instructions] 创建 `Info-debug.plist`，
并写入以下内容：

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

We **do not** recommend you do this for your release builds.

我们 **不建议** 你在发布构建中这样做。

## Additional Information

## 补充信息

* Build time configuration is the only way to change
  network policy. It cannot be modified at runtime.

  构建时配置是更改网络策略的唯一方式，无法在运行时修改。

[network security config]: {{site.android-dev}}/training/articles/security-config#CleartextTrafficPermitted
[NSExceptionDomains]: {{site.apple-dev}}/documentation/bundleresources/information_property_list/nsapptransportsecurity/nsexceptiondomains

## Timeline

## 时间线

Landed in version: 1.23<br>
合入版本：1.23<br>
In stable release: 2.0.0<br>
进入稳定版：2.0.0<br>
Reverted in version: 2.2.0 (proposed)

回退版本：2.2.0（提议）

## References

## 参考资料

API documentation: There's no API for this change since
the modification to network policy is done through the
platform specific configuration as detailed above.

API 文档：此次变更没有对应 API，
因为网络策略是通过上文所述的平台专属配置修改的。

Relevant PRs:

相关 PR：

* [PR 20218: Plumbing for setting domain network policy][]

  [PR 20218：域名网络策略的底层支持][PR 20218: Plumbing for setting domain network policy]

* [Introduce per-domain policy for strict secure connections][]

  [为严格安全连接引入按域名的策略][Introduce per-domain policy for strict secure connections]

[PR 20218: Plumbing for setting domain network policy]: {{site.repo.engine}}/pull/20218
[Introduce per-domain policy for strict secure connections]: {{site.repo.dart-sdk}}/commit/d878cfbf20375befa09f9bf85f0ba2b87b319427
[these instructions]: /add-to-app/ios/project-setup#local-network-permissions
