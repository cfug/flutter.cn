---
# title: Plugins in Flutter tests
title: Flutter 测试中的插件
# shortTitle: Plugin tests
shortTitle: 插件测试
# description: Adding plugin as part of your Flutter tests.
description: 将插件作为 Flutter 测试的一部分。
ai-translated: true
---

:::note
To learn how to avoid crashes from a plugin when
testing your Flutter app, read on.
To learn how to test your plugin code, check out
[Testing plugins][].

要了解在测试 Flutter 应用时如何避免插件导致的崩溃，请继续阅读。
要了解如何测试插件代码，请参阅
[测试插件][Testing plugins]。
:::

[Testing plugins]: /testing/testing-plugins

Almost all [Flutter plugins][] have two parts:

几乎所有 [Flutter 插件][Flutter plugins] 都包含两部分：

* Dart code, which provides the API your code calls.

  Dart 代码，提供你的代码所调用的 API。

* Code written in a platform-specific (or "host") language,
  such as Kotlin or Swift, which implements those APIs.

  用平台特定（或「宿主」）语言编写的代码，
  例如 Kotlin 或 Swift，用于实现这些 API。

In fact, the native (or host) language code distinguishes
a plugin package from a standard package.

事实上，原生（或宿主）语言代码是
插件 package 与标准 package 的区别所在。

[Flutter plugins]: /packages-and-plugins/using-packages

Building and registering the host portion of a plugin
is part of the Flutter application build process,
so plugins only work when your code is running
in your application, such as with `flutter run`
or when running [integration tests][].
When running [Dart unit tests][] or
[widget tests][], the host code isn't available.
If the code you are testing calls any plugins,
this often results in errors like the following:

构建并注册插件的宿主部分是
Flutter 应用构建流程的一部分，
因此插件仅在你的代码运行于
应用中时有效，例如通过 `flutter run`
或运行 [集成测试][integration tests] 时。
运行 [Dart 单元测试][Dart unit tests] 或
[widget 测试][widget tests] 时，宿主代码不可用。
如果你测试的代码调用了任何插件，
通常会出现如下错误：

```console
MissingPluginException(No implementation found for method someMethodName on channel some_channel_name)
```

[Dart unit tests]: /cookbook/testing/unit/introduction
[integration tests]: /cookbook/testing/integration/introduction
[widget tests]: {{site.api}}/flutter/flutter_test/flutter_test-library.html

:::note
Plugin implementations that [only use Dart][]
will work in unit tests. This is an implementation
detail of the plugin, however,
so tests shouldn't rely on it.

[仅使用 Dart][only use Dart] 的插件实现
可在单元测试中工作。然而这是插件的
实现细节，
因此测试不应依赖这一点。
:::

[only use Dart]: /packages-and-plugins/developing-packages#dart-only-platform-implementations

When unit testing code that uses plugins,
there are several options to avoid this exception.
The following solutions are listed in order of preference.

在单元测试使用插件的代码时，
有几种方式可避免此异常。
以下解决方案按推荐顺序列出。

## Wrap the plugin

## 封装插件

In most cases, the best approach is to wrap plugin
calls in your own API,
and provide a way of [mocking][] your own API in tests.

在大多数情况下，最佳做法是将插件
调用封装在你自己的 API 中，
并在测试中提供 [mock][mocking] 你自己 API 的方式。

This has several advantages:

这有几个优点：

* If the plugin API changes,
  you won't need to update your tests.

  如果插件 API 变更，
  你无需更新测试。

* You are only testing your own code,
  so your tests can't fail due to behavior of
  a plugin you're using.

  你只测试自己的代码，
  因此测试不会因你使用的
  插件行为而失败。

* You can use the same approach regardless of
  how the plugin is implemented,
  or even for non-plugin package dependencies.

  无论插件如何实现，
  甚至对于非插件 package 依赖，
  你都可以使用相同方法。

[mocking]: /cookbook/testing/unit/mocking

## Mock the plugin's public API

## Mock 插件的公共 API

If the plugin's API is already based on class instances,
you can mock it directly, with the following caveats:

如果插件 API 已基于类实例，
你可以直接 mock，但需注意以下限制：

* This won't work if the plugin uses
  non-class functions or static methods.

  如果插件使用
  非类函数或静态方法，此方法无效。

* Tests will need to be updated when
  the plugin API changes.

  插件 API 变更时
  需要更新测试。

## Mock the plugin's platform interface

## Mock 插件的平台接口

If the plugin is a [federated plugin][],
it will include a platform interface that allows
registering implementations of its internal logic.
You can register a mock of that platform interface
implementation instead of the public API with the
following caveats:

如果插件是 [联合插件][federated plugin]，
它会包含一个平台接口，允许
注册其内部逻辑的实现。
你可以注册该平台接口实现的 mock，
而不是公共 API，但需注意以下限制：

* This won't work if the plugin isn't federated.

  如果插件不是联合插件，此方法无效。

* Your tests will include part of the plugin's code,
  so plugin behavior could cause problems for your tests.
  For instance, if a plugin writes files as part of an
  internal cache, your test behavior might change
  based on whether you had run the test previously.

  你的测试将包含插件的部分代码，
  因此插件行为可能给你的测试带来问题。
  例如，如果插件将文件写入
  内部缓存，测试行为可能取决于
  你是否曾运行过该测试。

* Tests might need to be updated when the platform interface changes.

  平台接口变更时可能需要更新测试。

An example of when this might be necessary is
mocking the implementation of a plugin used by
a package that you rely on,
rather than your own code,
so you can't change how it's called.
However, if possible,
you should mock the dependency that uses the plugin instead.

可能需要这样做的一个例子是
mock 你所依赖的 package 使用的插件实现，
而不是你自己的代码，
因此你无法更改其调用方式。
不过，如果可能，
你应改为 mock 使用该插件的依赖。

[federated plugin]: /packages-and-plugins/developing-packages#federated-plugins

## Mock the platform channel

## Mock 平台通道

If the plugin uses [platform channels][],
you can mock the platform channels using
[`TestDefaultBinaryMessenger`][].
This should only be used if, for some reason,
none of the methods above are available,
as it has several drawbacks:

如果插件使用 [平台通道][platform channels]，
你可以使用 [`TestDefaultBinaryMessenger`][] mock 平台通道。
仅当出于某种原因上述方法都不可用时才应使用，
因为它有几个缺点：

* Only implementations that use platform channels
  can be mocked. This means that if some implementations
  don't use platform channels,
  your tests will unexpectedly use
  real implementations when run on some platforms.

  只有使用平台通道的实现
  才能被 mock。这意味着如果某些实现
  不使用平台通道，
  在某些平台上运行时测试会意外使用真实实现。

* Platform channels are usually internal implementation
  details of plugins.
  They might change substantially even
  in a bugfix update to a plugin,
  breaking your tests unexpectedly.

  平台通道通常是插件的内部实现
  细节。
  即使在插件的 bug 修复更新中
  也可能大幅变更，
  导致测试意外失败。

* Platform channels might differ in each implementation
  of a federated plugin. For instance,
  you might set up mock platform channels to
  make tests pass on a Windows machine,
  then find that they fail if run on macOS or Linux.

  联合插件的每种实现中
  平台通道可能不同。例如，
  你可能设置 mock 平台通道使
  测试在 Windows 机器上通过，
  却发现若在 macOS 或 Linux 上运行会失败。

* Platform channels aren't strongly typed.
  For example, method channels often use dictionaries
  and you have to read the plugin's implementation
  to know what the key strings and value types are.

  平台通道不是强类型的。
  例如，method channel 常使用字典，
  你必须阅读插件实现
  才能知道键字符串和值类型。

Because of these limitations, `TestDefaultBinaryMessenger`
is mainly useful in the internal tests
of plugin implementations,
rather than tests of code using plugins.

由于这些限制，`TestDefaultBinaryMessenger`
主要用于插件实现的内部测试，
而不是使用插件的代码的测试。

You might also want to check out
[Testing plugins][].

你也可以参阅 [测试插件][Testing plugins]。

[platform channels]: /platform-integration/platform-channels
[`TestDefaultBinaryMessenger`]: {{site.api}}/flutter/flutter_test/TestDefaultBinaryMessenger-class.html
[Testing plugins]: /testing/testing-plugins
