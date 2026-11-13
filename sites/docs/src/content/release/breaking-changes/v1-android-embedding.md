---
# title: Removal of v1 Android embedding Java APIs
title: 移除 v1 Android 嵌入 Java API
# description: >-
#   Learn how to account for the removal of the Android v1 embedding APIs.
description: >-
  了解如何应对 Android v1 嵌入 API 的移除。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Android's v1 embedding has been removed in Flutter 3.29.0.
This follows the deprecation described in
[Android v1 embedding app and plugin creation deprecation][].
The following is a full list of classes removed.

Android 的 v1 嵌入已在 Flutter 3.29.0 中移除。
这延续了
[Android v1
嵌入应用与插件创建弃用][Android v1 embedding app and plugin creation deprecation]
中描述的弃用。
以下是已移除类的完整列表。

```text
io.flutter.app.FlutterActivity
io.flutter.app.FlutterActivityDelegate
io.flutter.app.FlutterActivityEvents
io.flutter.app.FlutterApplication
io.flutter.app.FlutterFragmentActivity
io.flutter.app.FlutterPlayStoreSplitApplication
io.flutter.app.FlutterPluginRegistry

io.flutter.embedding.engine.plugins.shim.ShimPluginRegistry
io.flutter.embedding.engine.plugins.shim.ShimRegistrar

io.flutter.view.FlutterMain
io.flutter.view.FlutterNativeView
io.flutter.view.FlutterView
```

If your project references any of the above classes, consult the following
list for instructions on migration.

如果项目引用了上述任何类，请查阅以下列表中的迁移说明。

* `io.flutter.app.FlutterActivity` was
   replaced with `io.flutter.embedding.android.FlutterActivity`.

  `io.flutter.app.FlutterActivity` 已替换为
  `io.flutter.embedding.android.FlutterActivity`。

* `io.flutter.app.FlutterActivityDelegate` was
   replaced with `io.flutter.embedding.android.FlutterActivityAndFragmentDelegate`.

  `io.flutter.app.FlutterActivityDelegate` 已替换为
  `io.flutter.embedding.android.FlutterActivityAndFragmentDelegate`。

* `io.flutter.app.FlutterActivityEvents` was removed.

  `io.flutter.app.FlutterActivityEvents` 已移除。

* `io.flutter.app.FlutterApplication` was removed.
   Flutter projects with custom `Application` implementations should
   instead extend the base `android.app.Application`.

  `io.flutter.app.FlutterApplication` 已移除。
  带有自定义 `Application` 实现的 Flutter 项目
  应改为继承基类 `android.app.Application`。

* `io.flutter.app.FlutterFragmentActivity` was
  replaced with `io.flutter.embedding.android.FlutterFragmentActivity`.

  `io.flutter.app.FlutterFragmentActivity` 已替换为
  `io.flutter.embedding.android.FlutterFragmentActivity`。

* `io.flutter.app.FlutterPlayStoreSplitApplication` was
  replaced with `io.flutter.embedding.android.FlutterPlayStoreSplitApplication`.

  `io.flutter.app.FlutterPlayStoreSplitApplication` 已替换为
  `io.flutter.embedding.android.FlutterPlayStoreSplitApplication`。

* `io.flutter.app.FlutterPluginRegistry` was removed,
   as it only served to let plugins support apps using the v1 embedding.

  `io.flutter.app.FlutterPluginRegistry` 已移除，
  它仅用于让插件支持使用 v1 嵌入的应用。

* `io.flutter.embedding.engine.plugins.shim.ShimPluginRegistry` was removed,
   as it only served to support let plugins support apps using the v1 embedding.

  `io.flutter.embedding.engine.plugins.shim.ShimPluginRegistry` 已移除，
  它仅用于让插件支持使用 v1 嵌入的应用。

* `io.flutter.embedding.engine.plugins.shim.ShimRegistrar` was removed,
   as it only served to support let plugins support apps using the v1 embedding.

  `io.flutter.embedding.engine.plugins.shim.ShimRegistrar` 已移除，
  它仅用于让插件支持使用 v1 嵌入的应用。

* `io.flutter.view.FlutterMain` was
   replaced by `io.flutter.embedding.engine.loader.FlutterLoader`.

  `io.flutter.view.FlutterMain` 已替换为
  `io.flutter.embedding.engine.loader.FlutterLoader`。

* `io.flutter.view.FlutterNativeView` was
   replaced by `io.flutter.embedding.android.FlutterView`.

  `io.flutter.view.FlutterNativeView` 已替换为
  `io.flutter.embedding.android.FlutterView`。

* `io.flutter.view.FlutterView` was
   replaced by `io.flutter.embedding.android.FlutterView`.

  `io.flutter.view.FlutterView` 已替换为
  `io.flutter.embedding.android.FlutterView`。

[Android v1 embedding app and plugin creation deprecation]: /release/breaking-changes/android-v1-embedding-create-deprecation

## Plugin authors

## 插件作者

Plugins should remove the `registerWith` method from
their `FlutterPlugin` interface implementation:

插件应从其 `FlutterPlugin` 接口实现中移除 `registerWith` 方法：

```java
public static void registerWith(@NonNull io.flutter.plugin.common.PluginRegistry.Registrar registrar);
```

For an example of this migration,
check out the pull request to remove this method from the
Flutter team-owned plugins: [flutter/packages#6494][].

此迁移的示例，
请查看从 Flutter 团队维护的插件中移除该方法的拉取请求：
[flutter/packages#6494][flutter/packages#6494]。

[flutter/packages#6494]: {{site.repo.packages}}/pull/6494

## Timeline

## 时间线

Landed in version: 3.28.0-0.1.pre<br>
合入版本：3.28.0-0.1.pre<br>
In stable release: 3.29

进入稳定版：3.29
