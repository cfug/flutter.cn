---
# title: $FLUTTER_ROOT/bin/cache/flutter.version.json replaces $FLUTTER_ROOT/version
title: $FLUTTER_ROOT/bin/cache/flutter.version.json 取代 $FLUTTER_ROOT/version
# description: >-
#   The deprecated '$FLUTTER_ROOT/version' tool file output has been replaced by
#   '$FLUTTER_ROOT/bin/cache/flutter.version.json', and any build scripts or
#   references to it must also be updated.
description: >-
  已弃用的 `$FLUTTER_ROOT/version` 工具文件输出，
  已由 `$FLUTTER_ROOT/bin/cache/flutter.version.json` 取代。
  构建脚本以及所有对它的引用也必须更新。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `flutter` tool will no longer
output the `$FLUTTER_ROOT/version` metadata file, and
only output `$FLUTTER_ROOT/bin/cache/flutter.version.json`.

`flutter` 工具将不再输出 `$FLUTTER_ROOT/version` 元数据文件，
只会输出 `$FLUTTER_ROOT/bin/cache/flutter.version.json`。

Tools and build scripts that rely on the presence of `$FLUTTER_ROOT/version`
need to be updated.

依赖 `$FLUTTER_ROOT/version` 存在的工具和构建脚本需要更新。

## Background

## 背景

[In 2023][PR 124558], `$FLUTTER_ROOT/bin/cache/fluttter.version.json` was added
as a newer file format that replaces `$FLUTTER_ROOT/version`.

[2023 年][PR 124558] 新增了 `$FLUTTER_ROOT/bin/cache/fluttter.version.json`，
作为取代 `$FLUTTER_ROOT/version` 的新文件格式。

So a file that looked something like this:

因此，原先类似这样的文件：

```plaintext title="version"
3.33.0-1.0.pre-1070
```

Was replaced by something like this:

被类似这样的内容取代：

```json title="flutter.version.json"
{
  "frameworkVersion": "3.33.0-1.0.pre-1070",
  "channel": "master",
  "repositoryUrl": "unknown source",
  "frameworkRevision": "be9526fbaaaab9474e95d196b70c41297eeda2d0",
  "frameworkCommitDate": "2025-07-22 11:34:11 -0700",
  "engineRevision": "be9526fbaaaab9474e95d196b70c41297eeda2d0",
  "engineCommitDate": "2025-07-22 18:34:11.000Z",
  "engineContentHash": "70fb28dde094789120421d4e807a9c37a0131296",
  "engineBuildDate": "2025-07-22 11:47:42.829",
  "dartSdkVersion": "3.10.0 (build 3.10.0-15.0.dev)",
  "devToolsVersion": "2.48.0",
  "flutterVersion": "3.33.0-1.0.pre-1070"
}
```

Generating both files is a source of technical debt.

同时生成这两个文件会带来技术债。

## Migration guide

## 迁移指南

Most Flutter developers don't parse or use this file, but
custom tools or CI configurations might.

大多数 Flutter 开发者不会解析或使用这个文件，
但自定义工具或 CI 配置可能会。

For example, the Flutter team's own `api.flutter.dev` generation script:

例如，Flutter 团队自己的 `api.flutter.dev` 生成脚本：

```dart title="post_process_docs.dart"
final File versionFile = File('version');
final String version = versionFile.readAsStringSync();
```

Was updated in [172601][PR 172601] to:

已在 [172601][PR 172601] 中更新为：

```dart
final File versionFile = File(path.join(checkoutPath, 'bin', 'cache', 'flutter.version.json'));
final String version = () {
  final Map<String, Object?> json =
      jsonDecode(versionFile.readAsStringSync()) as Map<String, Object?>;
  return json['flutterVersion']! as String;
}();
```

To temporarily opt-out of `$FLUTTER_ROOT/version` no longer being emitted:

若要暂时恢复输出 `$FLUTTER_ROOT/version`：

```sh
flutter config --no-enable-omit-legacy-version-file
```

## Timeline

## 时间线

Landed in version: 3.33.0-1.0.pre-1416<br>
Stable release: _Not published yet_

合入版本：3.33.0-1.0.pre-1416<br>
稳定版：**尚未发布**

One stable release after this change lands,
`--no-enable-omit-legacy-version-file` will be removed.

此改动合入后再经过一个稳定版，
就会移除 `--no-enable-omit-legacy-version-file`。

## References

## 参考资料

Relevant Issues:

相关 issue：

- [Issue 171900][], where `FLUTTER_ROOT/version` was slated for removal

  [Issue 171900][]，计划移除 `FLUTTER_ROOT/version`

Relevant PRs:

相关 PR：

- [PR 124558][], where `flutter.version.json` was added as the new format

  [PR 124558][]，新增 `flutter.version.json` 作为新格式

- [PR 172601][], an example of migrating a script to use `flutter.version.json`

  [PR 172601][]，将脚本迁移为使用 `flutter.version.json` 的示例

[Issue 171900]: {{site.repo.flutter}}/issues/171900
[PR 124558]: {{site.repo.flutter}}/pull/124558
[PR 172601]: {{site.repo.flutter}}/pull/172601
