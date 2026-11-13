---
# title: Adding 'linux' and 'windows' to TargetPlatform enum
title: 向 TargetPlatform 枚举添加 linux 和 windows
# description: >
#   Two new values were added to the TargetPlatform enum that could
#   require additional cases in switch statements that switch on a TargetPlatform.
description: >
  TargetPlatform 枚举新增了两个值。
  对 TargetPlatform 做 switch 且没有 default 分支的语句可能需要补充 case。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Two new values were added to the [`TargetPlatform`][] enum
that could require additional cases in switch statements that
switch on a `TargetPlatform` and don't include a `default:` case.

[`TargetPlatform`][`TargetPlatform`] 枚举新增了两个值。
对 `TargetPlatform` 做 switch、且没有 `default:` 分支的语句
可能需要补充 case。

## Context

## 上下文

Prior to this change, the `TargetPlatform` enum only contained four values,
and was defined like this:

此次改动之前，`TargetPlatform` 枚举只有四个值，定义如下：

```dart
enum TargetPlatform {
  android,
  fuchsia,
  iOS,
  macOS,
}
```

A `switch` statement only needed to handle these cases,
and desktop applications that wanted to run on Linux or
Windows usually had a test like this in their
`main()` method:

`switch` 语句只需要处理这些 case。
希望在 Linux 或 Windows 上运行的桌面应用，
通常会在 `main()` 方法里写一段类似下面的检测：

```dart
// Sets a platform override for desktop to avoid exceptions. See
// https://docs.flutter.dev/desktop#target-platform-override for more info.
void _enablePlatformOverrideForDesktop() {
  if (!kIsWeb && (Platform.isWindows || Platform.isLinux)) {
    debugDefaultTargetPlatformOverride = TargetPlatform.fuchsia;
  }
}

void main() {
  _enablePlatformOverrideForDesktop();
  runApp(MyApp());
}
```

## Description of change

## 改动说明

The `TargetPlatform` enum is now defined as:

`TargetPlatform` 枚举现在的定义如下：

```dart
enum TargetPlatform {
  android,
  fuchsia,
  iOS,
  linux, // new value
  macOS,
  windows, // new value
}
```

And the platform test setting
[`debugDefaultTargetPlatformOverride`][] in `main()`
is no longer required on Linux and Windows.

在 Linux 和 Windows 上，
也不再需要在 `main()` 里设置
[`debugDefaultTargetPlatformOverride`][`debugDefaultTargetPlatformOverride`]
来做平台检测。

This can cause the Dart analyzer to give the
[`missing_enum_constant_in_switch`][] warning for
switch statements that don't include a `default` case.
Writing a switch without a `default:` case is the
recommended way to handle enums, since the analyzer
can then help you find any cases that aren't handled.

这会让 Dart 分析器对没有 `default` 分支的 switch 语句
发出 [`missing_enum_constant_in_switch`][`missing_enum_constant_in_switch`] 警告。
处理枚举时，建议编写不带 `default:` 分支的 switch，
这样分析器才能帮你找出尚未处理的 case。

## Migration guide

## 迁移指南

In order to migrate to the new enum, and avoid the analyzer's
`missing_enum_constant_in_switch` error, which looks like:

要迁移到新枚举，并避免分析器报出如下的
`missing_enum_constant_in_switch` 错误：

```plaintext
warning: Missing case clause for 'linux'. (missing_enum_constant_in_switch at [package] path/to/file.dart:111)
```

or:

或：

```plaintext
warning: Missing case clause for 'windows'. (missing_enum_constant_in_switch at [package] path/to/file.dart:111)
```

Modify your code as follows:

请按下面的方式修改代码：

Code before migration:

迁移之前的代码：

```dart
void dance(TargetPlatform platform) {
  switch (platform) {
    case TargetPlatform.android:
      // Do Android dance.
      break;
    case TargetPlatform.fuchsia:
      // Do Fuchsia dance.
      break;
    case TargetPlatform.iOS:
      // Do iOS dance.
      break;
    case TargetPlatform.macOS:
      // Do macOS dance.
      break;
  }
}
```

Code after migration:

迁移之后的代码：

```dart
void dance(TargetPlatform platform) {
  switch (platform) {
    case TargetPlatform.android:
      // Do Android dance.
      break;
    case TargetPlatform.fuchsia:
      // Do Fuchsia dance.
      break;
    case TargetPlatform.iOS:
      // Do iOS dance.
      break;
    case TargetPlatform.linux: // new case
      // Do Linux dance.
      break;
    case TargetPlatform.macOS:
      // Do macOS dance.
      break;
    case TargetPlatform.windows: // new case
      // Do Windows dance.
      break;
  }
}
```

Having `default:` cases in such switch statements isn't
recommended, because then the analyzer can't help you find
all the cases that need to be handled.

不建议在这类 switch 语句中使用 `default:` 分支，
否则分析器就无法帮你找出所有需要处理的 case。

Also, any tests like the one referenced above that set the
`debugDefaultTargetPlatformOverride` are no longer needed
for Linux and Windows applications.

另外，上面那种设置 `debugDefaultTargetPlatformOverride` 的检测，
对 Linux 和 Windows 应用来说也不再需要。

## Timeline

## 时间线

Landed in version: 1.15.4<br>
合入版本：1.15.4<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`TargetPlatform`][]

Relevant issues:

相关 issue：

* [Issue #31366][]

Relevant PR:

相关 PR：

* [Add Windows, and Linux as TargetPlatforms][]

  [将 Windows 和 Linux 添加为 TargetPlatform][Add Windows, and Linux as TargetPlatforms]

[Add Windows, and Linux as TargetPlatforms]: {{site.repo.flutter}}/pull/51519
[`debugDefaultTargetPlatformOverride`]: {{site.api}}/flutter/foundation/debugDefaultTargetPlatformOverride.html
[Issue #31366]: {{site.repo.flutter}}/issues/31366
[`missing_enum_constant_in_switch`]: {{site.dart-site}}/tools/diagnostic-messages#missing_enum_constant_in_switch
[`TargetPlatform`]: {{site.api}}/flutter/foundation/TargetPlatform-class.html
