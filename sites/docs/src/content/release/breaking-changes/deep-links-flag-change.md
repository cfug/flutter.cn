---
# title: Deep links flag change
title: 深层链接标志变更
# description: >-
#   If you use a third party deep linking plugin package for mobile apps,
#   set Flutter's deep linking flag to false.
description: >-
  如果你的移动应用使用第三方深层链接插件 package，
  请把 Flutter 的深层链接标志设为 false。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

**This breaking change only affects mobile apps that
use a third party deep linking plugin package.**

**这次破坏性改动只影响使用第三方深层链接插件 package 的移动应用。**

The default value for Flutter's deep linking option has changed from
`false` to `true`, meaning that deep linking is now opt-in by default.

Flutter 深层链接选项的默认值已从 `false` 改为 `true`，
也就是说深层链接现在默认处于开启状态。

## Migration guide

## 迁移指南

If you're using Flutter's default deep linking setup,
this isn't a breaking change for you.

如果你使用的是 Flutter 默认的深层链接配置，
这次对你来说不是破坏性改动。

However, if you're using a third-party plugin for deep links,
such as the following, this update introduces a breaking change:

但是，如果你使用第三方深层链接插件，
例如下面这些，这次更新就是破坏性改动：

- [Firebase dynamic links](https://firebase.google.com/docs/dynamic-links)

  [Firebase 动态链接](https://firebase.google.com/docs/dynamic-links)

- [`package:uni_link`]({{site.pub-pkg}}/uni_links)

  [`package:uni_link`]({{site.pub-pkg}}/uni_links)

- [`package:app_links`]({{site.pub-pkg}}/app_links)

  [`package:app_links`]({{site.pub-pkg}}/app_links)

- [`package:flutter_branch_sdk`]({{site.pub-pkg}}/flutter_branch_sdk)

  [`package:flutter_branch_sdk`]({{site.pub-pkg}}/flutter_branch_sdk)

In this case, you must manually reset the
Flutter deep linking option to `false`.

这时，你必须手动把 Flutter 的深层链接选项改回 `false`。

Within your app's `AndroidManifest.xml` file for Android:

在 Android 应用的 `AndroidManifest.xml` 文件中：

```xml title="AndroidManifest.xml" highlightLines=4
<manifest>
   <application
       <activity>
<meta-data android:name="flutter_deeplinking_enabled" android:value="false" />
       </activity>
   </application>
</manifest>
```

Within your app's `info.plist` file for iOS:

在 iOS 应用的 `info.plist` 文件中：

```xml title="info.plist"
 <key>FlutterDeepLinkingEnabled</key>
 <false/>
```

## Timeline

## 时间线

Landed in version: 3.25.0-0.1.pre<br>
合入版本：3.25.0-0.1.pre<br>
Stable release: 3.27

进入稳定版：3.27

## References

## 参考资料

Design document:

设计文档：

- [flutter.dev/go/deep-link-flag-migration]({{site.main-url}}/go/deep-link-flag-migration)

  [flutter.dev/go/deep-link-flag-migration]({{site.main-url}}/go/deep-link-flag-migration)

Relevant PR:

相关 PR：

* [Set deep linking flag to true by default]({{site.repo.engine}}/pull/52350)

  [默认将深层链接标志设为 true]({{site.repo.engine}}/pull/52350)
