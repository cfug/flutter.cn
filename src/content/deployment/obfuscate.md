---
# title: Obfuscating Dart code
title: 混淆 Dart 代码
# description: How to remove function and class names from your Dart binary.
description: 如何移除你的 Dart 库中的方法名和类名。
tags: 发布, Dart
keywords: 代码混淆,保护
---

<?code-excerpt path-base="deployment/obfuscate"?>

## What is code obfuscation?

## 什么是代码混淆？

[Code obfuscation][] is the process of modifying an
app's binary to make it harder for humans to understand.
Obfuscation hides function and class names in your
compiled Dart code, replacing each symbol with
another symbol, making it difficult for an attacker
to reverse engineer your proprietary app.

[代码混淆][Code obfuscation] 是一种将应用程序二进制文件转换为功能上等价，
但人类难于阅读和理解的行为。
在编译 Dart 代码时，混淆会隐藏函数和类的名称，
并用其他符号替代每个符号，从而使攻击者难以进行逆向工程。

**Flutter's code obfuscation works
only on a [release build][].**

**Flutter 的代码混淆功能仅在 [生产构建][release build] 上生效。**

[Code obfuscation]: https://en.wikipedia.org/wiki/Obfuscation_(software)
[release build]: /testing/build-modes#release

## Limitations

## 局限性

Note that obfuscating your code does _not_
encrypt resources nor does it protect against
reverse engineering.
It only renames symbols with more obscure names.

请注意，混淆你的代码并 **不会** 加密资源，
也不能防止逆向工程。
它只是用更晦涩的名称重命名这些符号。

:::warning

It is a **poor security practice** to
store secrets in an app.

在应用程序中存储重要私密的信息（如密码、密钥等）
是一种 **非常不安全的做法**。

:::

## Supported targets

## 支持的构建目标

The following build targets
support the obfuscation process
described on this page:

以下构建目标支持本篇介绍的混淆过程：

* `aar`
* `apk`
* `appbundle`
* `ios`
* `ios-framework`
* `ipa`
* `linux`
* `macos`
* `macos-framework`
* `windows`

:::note

Web apps don't support obfuscation.
A web app can be [minified][], which provides a similar result.
When you build a release version of a Flutter web app,
the web compiler minifies the app. To learn more,
see [Build and release a web app][].

Web 应用不支持混淆。
因为当你构建 Flutter Web 应用发布版本时，
Web 应用已经经过了 [压缩][minified] 处理。
Web 压缩提供了与混淆相似的效果。

:::

[Build and release a web app]: /deployment/web
[minified]: https://en.wikipedia.org/wiki/Minification_(programming)

## Obfuscate your app

## 混淆你的应用程序

To obfuscate your app, use the `flutter build` command
in release mode
with the `--obfuscate` and  `--split-debug-info` options.
The `--split-debug-info` option specifies the directory
where Flutter outputs debug files.
In the case of obfuscation, it outputs a symbol map.
For example:

要混淆你的应用程序，
请在 release 模式下使用 `flutter build` 命令，
并使用 `--obfuscate` 和 `--split-debug-info` 选项。
`--split-debug-info` 选项指定了 Flutter 输出调试文件的目录。
在混淆的情况下，它会输出一个符号表。
请参考以下命令：

```console
$ flutter build apk --obfuscate --split-debug-info=/<project-name>/<directory>
```

Once you've obfuscated your binary, **save
the symbols file**. You need this if you later
want to de-obfuscate a stack trace.

一旦你混淆了二进制文件，
请务必 **保存符号表文件**。
如果你将来需要解析混淆后的堆栈跟踪，
你将需要该文件。

:::tip

The `--split-debug-info` option can also be used without `--obfuscate`
to extract Dart program symbols, reducing code size.
To learn more about app size, see [Measuring your app's size][].

`--split-debug-info` 选项也可以不使用 `--obfuscate` 来提取 Dart 程序符号，
以减少代码体积。
想了解更多关于应用体积的信息，
请查阅 [测量你的应用体积][Measuring your app's size]。

:::

[Measuring your app's size]: /perf/app-size

For detailed information on these flags, run
the help command for your specific target, for example:

关于这些标志的详细信息，
请运行特定构建目标类型的帮助命令，
例如：

```console
$ flutter build apk -h
```

If these flags are not listed in the output,
run `flutter --version` to check your version of Flutter.

如果输出中没有列出这些标志，
请运行 `flutter --version` 命令，检查你的 Flutter 版本。

## Read an obfuscated stack trace

## 读取混淆的堆栈跟踪

To debug a stack trace created by an obfuscated app,
use the following steps to make it human readable:

如果你需要调试被混淆的应用程序创建的堆栈跟踪，
请遵循以下步骤将其解析为人类可读的内容：

1. Find the matching symbols file.
   For example, a crash from an Android arm64
   device would need `app.android-arm64.symbols`.

   找到与应用程序匹配的符号文件。
   例如，在 Android arm64 设备崩溃时，
   需要 `app.android-arm64.symbols` 文件。

1. Provide both the stack trace (stored in a file)
   and the symbols file to the `flutter symbolize` command.
   For example:

   向 `flutter symbolize` 命令提供堆栈跟踪（存储在文件中）和符号文件。
   例如：

   ```console
   $ flutter symbolize -i <stack trace file> -d out/android/app.android-arm64.symbols
   ```

   For more information on the `symbolize` command,
   run `flutter symbolize -h`.

   关于 `symbolize` 命令的更多信息，
   请运行 `flutter symbolize -h` 命令。

## Read an obfuscated name

To make the name that an app obfuscated human readable,
use the following steps:

1. To save the name obfuscation map at app build time,
   use `--extra-gen-snapshot-options=--save-obfuscation-map=/<your-path>`.
   For example:

   ```console
   $ flutter build apk --obfuscate --split-debug-info=/<project-name>/<directory> --extra-gen-snapshot-options=--save-obfuscation-map=/<your-path>
   ```

1. To recover the name, use the generated obfuscation map.
   The obfuscation map is a flat JSON array with pairs of
   original names and obfuscated names. For example,
   `["MaterialApp", "ex", "Scaffold", "ey"]`, where `ex`
   is the obfuscated name of `MaterialApp`.

## Caveat

## 注意事项

Be aware of the following when coding an app that will
eventually be an obfuscated binary.

当你打算将二进制的应用程序进行混淆时，
需要注意以下内容：

* Code that relies on matching specific class, function,
  or library names will fail.
  For example, the following call to `expect()` won't
  work in an obfuscated binary:

  使用匹配特定的类、函数或库名的代码将会失效。
  例如，以下在混淆的二进制文件中对 `expect()` 的调用就不会工作：

<?code-excerpt "lib/main.dart (Expect)"?>
```dart
expect(foo.runtimeType.toString(), equals('Foo'));
```

* Enum names are not obfuscated currently.
