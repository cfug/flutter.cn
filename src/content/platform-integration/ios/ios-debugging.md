---
title: iOS debugging
title: iOS 平台调试
description: iOS-specific debugging techniques for Flutter apps
description: 用于 Flutter 应用程序的 iOS 专用调试技巧
---

Due to security around
[local network permissions in iOS 14 or later][],
you must accept a permission dialog box to enable
Flutter debugging functionalities such as hot-reload
and DevTools.

由于 [iOS 14 或更高版本中本地网络权限][local network permissions in iOS 14 or later] 
的安全限制，你必须在以下权限的对话框中允许权限来启用 Flutter 调试功能，
如热重载和 DevTools。

![Screenshot of "allow network connections" dialog](/assets/images/docs/development/device-connect.png)

This affects debug and profile builds only and won't
appear in release builds. You can also allow this
permission by enabling
**Settings > Privacy > Local Network > Your App**.

这只会出现在 debug 和 profile 构建中，
不会出现在 release 构建中。
你也可以通过打开 **设置 > 隐私与安全性 > 本地网络 > 你的应用程序** 来允许该权限。

[local network permissions in iOS 14 or later]: {{site.apple-dev}}/news/?id=0oi77447

