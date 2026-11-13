---
# title: Integration test default golden-file comparators changed on Android and iOS.
title: Android 和 iOS 上集成测试的默认 golden 文件比较器已更改
# description: >-
#   When using `package:integration_test` to run a test _on_ an Android device or
#   emulator, or an iOS device or simulator, the default `goldenFileComparator`
#   has changed, and correctly uses the host filesystem.
description: >-
  使用 package:integration_test 在 Android 设备或模拟器、
  或 iOS 设备或模拟器上运行测试时，默认的 goldenFileComparator 已更改，
  并会正确使用宿主机文件系统。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Unless a user-defined [`goldenFileComparator`][] is set, either manually in a
test, or using a `flutter_test_config.dart` file, Android and iOS devices
and emulators/simulators have a new default that proxies to the local host
filesystem, fixing a long-standing bug ([#143299][Issue 143299]).

除非你手动在测试里设置了自定义的 [`goldenFileComparator`][`goldenFileComparator`]，
或通过 `flutter_test_config.dart` 文件设置了它，
否则 Android 和 iOS 的设备与模拟器会使用新的默认实现，
代理到本地宿主机文件系统。
这修复了一个长期存在的 bug（[#143299][Issue 143299]）。

## Background

## 背景

The package [`integration_test`][], and its integration with [`flutter_test`][]
has historically had a bug where using [`matchesGoldenFile`][] or similar APIs
where a `FileSystemException` was thrown.

[`integration_test`][`integration_test`] 这个 package
及其与 [`flutter_test`][`flutter_test`] 的集成，
在使用 [`matchesGoldenFile`][`matchesGoldenFile`] 或类似 API 时
会抛出 `FileSystemException`，这是一个历史 bug。

Some users may have worked around this issue by writing and using a custom
[`goldenFileComparator`][]:

你可能已经通过编写并使用自定义的
[`goldenFileComparator`][`goldenFileComparator`] 绕过了这个问题：

```dart
import 'package:integration_test/integration_test.dart';
import 'package:my_integration_test/custom_golden_file_comparator.dart';

void main() {
  goldenFileComparator = CustomGoldenFileComparatorThatWorks();

  // ...
}
```

Such workarounds are no longer necessary, and if type checking the default,
will no longer work as before:

这类变通方案不再必要。
如果对默认值做类型检查，行为也会和以前不同：

```dart
if (goldenFileComparator is ...) {
  // The new default is a new (hidden) type that has not existed before.
}
```

## Migration guide

## 迁移指南

In most cases, we expect users to have to do nothing - this will be in a sense
_new_ functionality that replaced functionality that did not work and caused
an unhandled exception which would fail a test.

大多数情况下你什么都不用做。
这在某种意义上是 **新** 功能，
它替换了原先无法工作、
并会抛出未处理异常从而导致测试失败的实现。

In cases where users wrote custom test infrastructure and comparators, consider
instead removing the [`goldenFileComparator`][] overrides, and instead rely on
the (new) default which should work as expected:

如果你编写了自定义测试基础设施和比较器，
可以考虑去掉 [`goldenFileComparator`][`goldenFileComparator`] 的覆盖，
改用（新的）默认实现，它应该能按预期工作：

```dart diff
  import 'package:integration_test/integration_test.dart';
- import 'package:my_integration_test/custom_golden_file_comparator.dart';

  void main() {
-   goldenFileComparator = CustomGoldenFileComparatorThatWorks();

    // ...
  }
```

_Fun fact_: The existing code that was used for
the _web_ platform was [reused][PR 160484].

**趣闻**：原先用于 **Web** 平台的代码已被 [复用][PR 160484]。

## Timeline

## 时间线

Landed in version: 3.29.0-0.0.pre<br>
合入版本：3.29.0-0.0.pre<br>
Stable release: 3.32

进入稳定版：3.32

## References

## 参考资料

Relevant APIs:

相关 API：

- [`flutter_test`][], which talks about `flutter_test_config.dart` and its capabilities.

  [`flutter_test`][`flutter_test`]，其中介绍了 `flutter_test_config.dart` 及其能力。

- [`goldenFileComparator`][], which implements comparison, and is user-configurable.

  [`goldenFileComparator`][`goldenFileComparator`]，负责实现比较，并且可以由你配置。

Relevant Issues:

相关 issue：

- [Issue 143299][], one of many user reports about the long-standing bug.

  [Issue 143299][Issue 143299]，关于这个长期 bug 的众多反馈之一。

- [Issue 160043][], which explains in technical detail why [`matchesGoldenFile`][] failed.

  [Issue 160043][Issue 160043]，从技术细节上解释了 [`matchesGoldenFile`][`matchesGoldenFile`] 失败的原因。

Relevant PRs:

相关 PR：

- [PR 160215][], where the web tool implementation was refactored to make it generic.

  [PR 160215][PR 160215]，重构了 Web 工具的实现，使其更通用。

- [PR 160484][], which uses the Dart VM service protocol to proxy between device and host.

  [PR 160484][PR 160484]，使用 Dart VM service 协议在设备与宿主机之间做代理。

[`flutter_test`]: {{site.api}}/flutter/flutter_test
[`goldenFileComparator`]: {{site.api}}/flutter/flutter_test/goldenFileComparator.html
[`integration_test`]: {{site.api}}/flutter/package-integration_test_integration_test/
[Issue 143299]: {{site.repo.flutter}}/issues/143299
[Issue 160043]: {{site.repo.flutter}}/issues/160043
[`matchesGoldenFile`]: {{site.api}}/flutter/flutter_test/MatchesGoldenFile-class.html
[PR 160215]: {{site.repo.flutter}}/pull/160215
[PR 160484]: {{site.repo.flutter}}/pull/160484
