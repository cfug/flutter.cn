---
# title: Localized messages are generated into source, not a synthetic package
title: 本地化消息改为生成到源码中，不再使用合成 package
# description: >-
#   When using `package:flutter_localizations`, the default generated location
#   (and eventually, only possible location) is within your source (`lib/`)
#   directory, and not the synthetic package `package:flutter_gen`.
description: >-
  使用 `package:flutter_localizations` 时，
  默认生成位置（最终也是唯一可用位置）位于源码（`lib/`）目录中，
  不再是合成 package `package:flutter_gen`。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `flutter` tool will no longer generate a synthetic `package:flutter_gen`
or modify the `package_config.json` of the app.

`flutter` 工具将不再生成合成的 `package:flutter_gen`，
也不会再修改应用的 `package_config.json`。

Applications or tools that referenced `package:flutter_gen` should instead
reference source files generated into the app's source directory directly.

引用了 `package:flutter_gen` 的应用或工具，
应改为直接引用生成到应用源码目录中的源文件。

In addition, the property `generate: true` is now required when using generated
l10n source.

此外，使用生成的 l10n 源码时，现在必须设置 `generate: true`。

## Background

## 背景

`flutter_gen` is a virtual (synthetic) package that is
created by the `flutter` command-line tool to allow developers to
import that package to access generated symbols and functionality,
such as for [internationalization][].
As the package isn't listed in an app's `pubspec.yaml`, and
is created via re-writing the generated `package_config.json` file,
many problems have been created.

`flutter_gen` 是由 `flutter` 命令行工具创建的虚拟（合成）package，
让开发者可以导入该 package，以访问生成的符号和功能，
例如用于 [国际化][internationalization]。
由于该 package 并未列在应用的 `pubspec.yaml` 中，
而是通过改写生成的 `package_config.json` 文件创建的，
因此产生了许多问题。

## Migration guide

## 迁移指南

This change only affects apps that have the
following entry in their `pubspec.yaml`:

这次改动只影响 `pubspec.yaml` 中包含以下条目的应用：

```yaml
flutter:
  generate: true
```

If your app previously used `gen-l10n` without this property, it is now
required.

如果应用此前在没有该属性的情况下使用了 `gen-l10n`，现在则必须加上。

A synthetic package (`package:flutter_gen`) is
created and referenced by the app:

应用会创建并引用一个合成 package（`package:flutter_gen`）：

```dart
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
// ...
const MaterialApp(
  title: 'Localizations Sample App',
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
);
```

To migrate away from importing `package:flutter_gen`:

要不再导入 `package:flutter_gen`，请按以下步骤迁移：

 1. **Update configuration**. Specify `synthetic-package: false` in the
    accompanying [`l10n.yaml`][] file:

    **更新配置**。在配套的 [`l10n.yaml`][`l10n.yaml`] 文件中
    指定 `synthetic-package: false`：

    ```yaml title="l10n.yaml"
    synthetic-package: false

    # The files are generated into the path specified by `arb-dir`
    arb-dir: lib/i18n

    # Or, specifically provide an output path:
    output-dir: lib/src/generated/i18n
    ```

 2. **Update imports**. Update your Dart import statements to point to the
    new location of the generated files:

    **更新 import**。更新 Dart 的 import 语句，
    使其指向生成文件的新位置：

    ```dart
    // Before
    import 'package:flutter_gen/gen_l10n/app_localizations.dart';

    // After (assuming arb-dir: lib/i18n, importing from lib/main.dart)
    import 'i18n/app_localizations.dart';
    ```

## Timeline

## 时间线

Landed in version: 3.28.0-0.0.pre<br>
合入版本：3.28.0-0.0.pre<br>
Stable release: 3.32.0

进入稳定版：3.32.0

**In the next stable release after this change lands,
`package:flutter_gen` support will be removed.**

**在此改动合入后的下一个稳定版中，
将移除对 `package:flutter_gen` 的支持。**

## References

## 参考资料

Relevant Issues:

相关 issue：

- [Issue 73870][], where `package:flutter_gen` pub problems are first found.

  [Issue 73870][Issue 73870]，其中首次发现 `package:flutter_gen` 的 pub 问题。

- [Issue 102983][], where `package:flutter_gen` problems are outlined.

  [Issue 102983][Issue 102983]，其中概述了 `package:flutter_gen` 的问题。

- [Issue 157819][], where `--implicit-pubspec-resolution` is discussed.

  [Issue 157819][Issue 157819]，其中讨论了 `--implicit-pubspec-resolution`。

Relevant Articles:

相关文章：

- [Internationalizing Flutter apps][internationalization],
  the canonical documentation for the feature.

  [Flutter 应用国际化][internationalization]，
  该功能的权威文档。

[`l10n.yaml`]: /ui/internationalization#configuring-the-l10n-yaml-file
[Issue 73870]: {{site.repo.flutter}}/issues/73870
[Issue 102983]: {{site.repo.flutter}}/issues/102983
[Issue 157819]: {{site.repo.flutter}}/issues/157819
[internationalization]: /ui/internationalization#adding-your-own-localized-messages
