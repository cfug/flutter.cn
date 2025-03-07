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

[Code obfuscation]: https://en.wikipedia.org/wiki/Obfuscation_(software)

## Limitations and warnings {: #limitations}

## 局限性和警告

**Flutter's code obfuscation works
only on a [release build][].**

**Flutter 的代码混淆功能仅在 [生产构建][release build] 上生效。**

:::warning

It is a **poor security practice** to
store secrets in an app.

在应用程序中存储重要私密的信息（如密码、密钥等）
是一种 **非常不安全的做法**。

:::

Obfuscating your code does _not_
encrypt resources nor does it protect against
reverse engineering.
It only renames symbols with more obscure names.

混淆你的代码并 **不会** 加密资源，
也不能防止逆向工程。
它只是用更晦涩的名称重命名这些符号。

Web apps don't support obfuscation.
A web app can be [minified][], which provides a similar result.
When you build a release version of a Flutter web app,
the web compiler minifies the app. To learn more,
see [Build and release a web app][].

Web 应用不支持混淆。
但 Web 应用支持 [代码压缩][minified]，这提供了类似的效果。
在构建 Flutter Web 应用的发布 (release) 版本时，
Web 编译器会对应用进行代码压缩。
请参阅 [构建和发布为 Web 应用][Build and release a web app]，
来了解更多信息。

[release build]: /testing/build-modes#release
[Build and release a web app]: /deployment/web
[minified]: https://en.wikipedia.org/wiki/Minification_(programming)

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

For detailed information about the command line options
available for a build target, run the following
command. The `--obfuscate` and  `--split-debug-info` options should
be listed in the output. If they aren't, you'll need to
install a newer version of Flutter to obfuscate your code.

构建目标可以使用命令行选项来了解更详细的信息，
请运行以下命令。
输出的命令行帮助信息应该会列出 `--obfuscate` 和  `--split-debug-info` 选项。
如果没有这些选项，你需要安装最新版本的 Flutter 来混淆代码。

```console
$ flutter build <build-target> -h
```
   *  `<build-target>`: The build target. For example,
      `apk`.

      `<build-target>`：构建目标，例如 `apk`。

## Obfuscate your app

## 混淆你的应用

To obfuscate your app and create a symbol map, use the
`flutter build` command in release mode
with the `--obfuscate` and `--split-debug-info` options.
If you want to debug your obfuscated
app in the future, you will need the symbol map.

要混淆你的应用并创建符号表 (symbol)，
请在 release 模式下使用 `flutter build` 命令以及
`--obfuscate` 和 `--split-debug-info` 选项。
在以后需要调试经过混淆处理的应用的时候，就需要符号表 (symbol)。

1. Run the following command to obfuscate your app and
   generate a SYMBOLS file:

   运行以下命令来混淆应用并生成 SYMBOLS 文件：

   ```console
   $ flutter build <build-target> \ 
      --obfuscate \ 
      --split-debug-info=/<symbols-directory>
   ```

   *  `<build-target>`: The build target. For example,
      `apk`.

      `<build-target>`：构建目标，例如 `apk`。

   *  `<symbols-directory>`: The directory where the SYMBOLS
      file should be placed. For example,
      `out/android`.

      `<symbols-directory>`：存放 SYMBOLS 文件的目录。例如，`out/android`。

1. Once you've obfuscated your binary, **backup
   the SYMBOLS file**. You might need this if you lose
   your original SYMBOLs file and you
   want to de-obfuscate a stack trace.

   混淆二进制文件后，请 **备份符号表 SYMBOLS 文件**。
   这是为了避免你丢失原始 SYMBOLS 文件，
   而你又想解析混淆后的堆栈跟踪，
   这个时候你就需要使用备份的 SYMBOLS 文件。

如果输出中没有列出这些标志，
请运行 `flutter --version` 命令，检查你的 Flutter 版本。

## Read an obfuscated stack trace

## 读取混淆的堆栈跟踪

To debug a stack trace created by an obfuscated app,
use the following steps to make it human readable:

如果你需要调试被混淆的应用程序创建的堆栈跟踪，
请遵循以下步骤将其解析为人类可读的内容：

1. Find the matching SYMBOLS file.
   For example, a crash from an Android arm64
   device would need `app.android-arm64.symbols`.

   找到与应用程序匹配的 SYMBOLS 符号文件。
   例如，在 Android arm64 设备崩溃时，
   需要 `app.android-arm64.symbols` 文件。

1. Provide both the stack trace (stored in a file)
   and the SYMBOLS file to the `flutter symbolize` command.

   向 `flutter symbolize` 命令提供堆栈跟踪（存储在文件中）和 SYMBOLS 符号文件。
   例如：

   ```console
   $ flutter symbolize \
      -i <stack-trace-file> \
      -d <obfuscated-symbols-file>
   ```

   *  `<stack-trace-file>`: The file path for the
      stacktrace. For example, `???`.

      `<stack-trace-file>`：堆栈跟踪的文件路径。例如，`???`。

   *  `<obfuscated-symbols-file>`: The file path for the
      symbols file that contains the obfuscated symbols.
      For example, `out/android/app.android-arm64.symbols`.

      `<obfuscated-symbols-file>`：包含混淆符号的符号表文件路径。
      例如，`out/android/app.android-arm64.symbols`。

   For more information about the `symbolize` command,
   run `flutter symbolize -h`.

   关于 `symbolize` 命令的更多信息，
   请运行 `flutter symbolize -h` 命令。

## Read an obfuscated name

## 读取混淆的名称

You can generate a JSON file that contains
an obfuscation map. An obfuscation map is a JSON array with
pairs of original names and obfuscated names. For example,
`["MaterialApp", "ex", "Scaffold", "ey"]`, where
`ex` is the obfuscated name of `MaterialApp`.

你可以生成一个包含混淆表的 JSON 文件。
混淆表是一个 JSON 数组，包含成对的原始名称和混淆名称。
例如，`["MaterialApp", "ex", "Scaffold", "ey"]` 中的 `ex` 是 `MaterialApp` 的混淆名称。

To generate an obfuscation map, use the following command:

你可以使用以下命令，来生成混淆表：

```console
$ flutter build <build-target> \
   --obfuscate \
   --split-debug-info=/<symbols-directory> \
   --extra-gen-snapshot-options=--save-obfuscation-map=/<obfuscation-map-file>
```

*  `<build-target>`: The build target. For example,
   `apk`.

   `<build-target>`：构建目标。例如，`apk`。

*  `<symbols-directory>`: The directory where the symbols
   should be placed. For example, `out/android`

   `<symbols-directory>`：存放 SYMBOLS 符号的目录。例如，`out/android`。

*  `<obfuscation-map-file>`: The file path where the
   JSON obfuscation map should be placed. For example,
   `out/android/map.json`

   `<obfuscation-map-file>`：存放 JSON 混淆表的目录。例如，`out/android/map.json`。

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

  目前，枚举 (Enum) 名称未被混淆。
