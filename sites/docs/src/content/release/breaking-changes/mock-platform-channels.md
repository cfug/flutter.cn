---
# title: Transition of platform channel test interfaces to flutter_test package
title: 平台通道测试接口迁移至 flutter_test package
# description: >
#    The setMockMessageHandler method related APIs have
#    moved from package:flutter to package:flutter_test
description: >
   与 setMockMessageHandler 方法相关的 API
   已从 package:flutter 移至 package:flutter_test。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The following methods have been replaced by APIs
in the `flutter_test` package:

下列方法已由 `flutter_test` package 中的 API 替代：

* `BinaryMessenger.checkMessageHandler`
* `BinaryMessenger.setMockMessageHandler`
* `BinaryMessenger.checkMockMessageHandler`
* `BasicMessageChannel.setMockMessageHandler`
* `MethodChannel.checkMethodCallHandler`
* `MethodChannel.setMockMethodCallHandler`
* `MethodChannel.checkMockMethodCallHandler`

The `onPlatformMessage` callback is no longer used
by the Flutter framework.

Flutter 框架不再使用 `onPlatformMessage` 回调。

## Context

## 上下文

As part of a refactoring of the low-level plugin
communications architecture, we have moved from the
previous `onPlatformMessage`/`handlePlatformMessage`
logic to a per-channel buffering system implemented in
the engine in the `ChannelBuffers` class.
To maintain compatibility with existing code,
the existing `BinaryMessenger.setMessageHandler` API
has been refactored to use the new `ChannelBuffers` API.

作为底层插件通信架构重构的一部分，
我们从之前的 `onPlatformMessage`/`handlePlatformMessage`
逻辑，改为引擎中 `ChannelBuffers` 类实现的
按通道缓冲系统。
为了与现有代码保持兼容，
现有的 `BinaryMessenger.setMessageHandler` API
已重构为使用新的 `ChannelBuffers` API。

One difference between the `ChannelBuffers` API and the
previous API is that the new API is more consistent in
its approach to asynchrony. As a side-effect,
the APIs around message passing are now entirely asynchronous.

`ChannelBuffers` API 与之前 API 的一个区别是，
新 API 在异步处理上更加一致。
由此带来的影响是，消息传递相关的 API 现在完全异步。

This posed a problem for the implementation of the legacy
testing APIs which, for historical reasons,
were previously in the `flutter` package.
Since they relied on the underlying logic being partly synchronous,
they required refactoring.
To avoid adding even more test logic into the `flutter` package,
a decision was made to move this logic to the `flutter_test` package.

这给旧测试 API 的实现带来了问题。
出于历史原因，这些 API 以前放在 `flutter` package 中。
它们依赖底层逻辑部分同步，因此需要重构。
为避免把更多测试逻辑放进 `flutter` package，
我们决定把这部分逻辑移到 `flutter_test` package。

## Description of change

## 改动说明

Specifically, the following APIs were affected:

具体受影响的 API 如下：

* `BinaryMessenger.checkMessageHandler`: Obsolete.

  `BinaryMessenger.checkMessageHandler`：已过时。

* `BinaryMessenger.setMockMessageHandler`: Replaced by
  `TestDefaultBinaryMessenger.setMockMessageHandler`.

  `BinaryMessenger.setMockMessageHandler`：由
  `TestDefaultBinaryMessenger.setMockMessageHandler` 替代。

* `BinaryMessenger.checkMockMessageHandler`: Replaced
   by `TestDefaultBinaryMessenger.checkMockMessageHandler`.

  `BinaryMessenger.checkMockMessageHandler`：由
  `TestDefaultBinaryMessenger.checkMockMessageHandler` 替代。

* `BasicMessageChannel.setMockMessageHandler`: Replaced
   by `TestDefaultBinaryMessenger.setMockDecodedMessageHandler`.

  `BasicMessageChannel.setMockMessageHandler`：由
  `TestDefaultBinaryMessenger.setMockDecodedMessageHandler` 替代。

* `MethodChannel.checkMethodCallHandler`: Obsolete.

  `MethodChannel.checkMethodCallHandler`：已过时。

* `MethodChannel.setMockMethodCallHandler`: Replaced by
   `TestDefaultBinaryMessenger.setMockMethodCallHandler`.

  `MethodChannel.setMockMethodCallHandler`：由
  `TestDefaultBinaryMessenger.setMockMethodCallHandler` 替代。

* `MethodChannel.checkMockMethodCallHandler`: Replaced
   by `TestDefaultBinaryMessenger.checkMockMessageHandler`.

  `MethodChannel.checkMockMethodCallHandler`：由
  `TestDefaultBinaryMessenger.checkMockMessageHandler` 替代。

These replacements are only available to code using the
new `TestDefaultBinaryMessengerBinding`
(such as any code using `testWidgets` in a `flutter_test` test).
There is no replacement for production code that was using
these APIs, as they were not intended for production code use.

这些替代 API 只提供给使用新的
`TestDefaultBinaryMessengerBinding` 的代码
（例如在 `flutter_test` 测试中使用 `testWidgets` 的代码）。
生产代码如果使用了这些 API，没有对应替代，
因为它们本来就不是给生产代码用的。

Tests using `checkMessageHandler` have no equivalent in the
new API, since message handler registration is handled
directly by the `ChannelBuffers` object, which does not
expose the currently registered listener for a channel.
(Tests verifying handler registration appear to be rare.)

使用 `checkMessageHandler` 的测试在新 API 中没有等价物，
因为消息处理器的注册由 `ChannelBuffers` 对象直接处理，
它不会暴露某个通道当前注册的监听器。
（验证处理器注册的测试似乎很少见。）

Code that needs migrating may see errors such as the following:

需要迁移的代码可能会看到类似下面的错误：

```plaintext
  error - The method 'setMockMessageHandler' isn't defined for the type 'BinaryMessenger' at test/sensors_test.dart:64:8 - (undefined_method)

  error • The method 'setMockMethodCallHandler' isn't defined for the type 'MethodChannel' • test/widgets/editable_text_test.dart:5623:30 • undefined_method

[error] The method 'setMockMessageHandler' isn't defined for the type 'BasicMessageChannel' (test/material/feedback_test.dart:37:36)
```

In addition, the `onPlatformMessage` callback,
which previously was hooked by the framework to
receive messages from plugins, is no longer used
(and will be removed in due course). As a result,
calling this callback to inject messages into the
framework no longer has an effect.

此外，框架以前用来挂接并接收插件消息的
`onPlatformMessage` 回调已不再使用
（并将在适当时候移除）。
因此，调用这个回调向框架注入消息不再有效。

## Migration guide

## 迁移指南

The `flutter_test` package provides some shims so that
uses of the obsolete `setMock...` and `checkMock...`
methods will continue to work.
Tests that previously did not import
`package:flutter_test/flutter_test.dart` can
do so to enable these shims;
this should be sufficient to migrate most code.

`flutter_test` package 提供了一些兼容垫片，
让已过时的 `setMock...` 和 `checkMock...` 方法仍能工作。
以前没有导入 `package:flutter_test/flutter_test.dart` 的测试
可以加上这个导入来启用这些垫片；
这对大多数代码来说已经足够完成迁移。

These shim APIs are deprecated, however. Instead,
in code using `WidgetTester` (for example, using `testWidgets`),
it is recommended to use the following patterns to
replace calls to those methods
(where `tester` is the `WidgetTester` instance):

不过这些垫片 API 已弃用。
在使用 `WidgetTester` 的代码中（例如使用 `testWidgets`），
建议用下面的写法替换对这些方法的调用
（其中 `tester` 是 `WidgetTester` 实例）。
旧代码走 `ServicesBinding`，新代码改为 `tester.binding`：

```dart
// old code
ServicesBinding.defaultBinaryMessenger.setMockMessageHandler(...);
ServicesBinding.defaultBinaryMessenger.checkMockMessageHandler(...);
// new code
tester.binding.defaultBinaryMessenger.setMockMessageHandler(...);
tester.binding.defaultBinaryMessenger.checkMockMessageHandler(...);
```

`BasicMessageChannel` 改为使用解码后的消息处理器：

```dart
// old code
myChannel.setMockMessageHandler(...);
myChannel.checkMockMessageHandler(...);
// new code
tester.binding.defaultBinaryMessenger.setMockDecodedMessageHandler(myChannel, ...);
tester.binding.defaultBinaryMessenger.checkMockMessageHandler(myChannel, ...);
```

`MethodChannel` 改为在 `defaultBinaryMessenger` 上设置方法调用处理器：

```dart
// old code
myMethodChannel.setMockMethodCallHandler(...);
myMethodChannel.checkMockMethodCallHandler(...);
// new code
tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(myMethodChannel, ...);
tester.binding.defaultBinaryMessenger.checkMockMessageHandler(myMethodChannel, ...);
```

Tests that use `package:test` and `test()`
can be changed to use `package:flutter_test` and `testWidgets()`
to get access to a `WidgetTester`.

使用 `package:test` 和 `test()` 的测试
可以改为使用 `package:flutter_test` 和 `testWidgets()`，
从而拿到 `WidgetTester`。

Code that does not have access to a `WidgetTester` can refer to
`TestDefaultBinaryMessengerBinding.instance!.defaultBinaryMessenger`
instead of `tester.binding.defaultBinaryMessenger`.

拿不到 `WidgetTester` 的代码可以改用
`TestDefaultBinaryMessengerBinding.instance!.defaultBinaryMessenger`，
而不是 `tester.binding.defaultBinaryMessenger`。

Tests that do not use the default test widgets binding
(`AutomatedTestWidgetsFlutterBinding`,
which is initialized by `testWidgets`) can mix the
`TestDefaultBinaryMessengerBinding` mixin into their
binding to get the same results.

不使用默认测试 widget binding
（由 `testWidgets` 初始化的 `AutomatedTestWidgetsFlutterBinding`）
的测试，可以把 `TestDefaultBinaryMessengerBinding` mixin
混入自己的 binding，以得到相同的结果。

Tests that manipulate `onPlatformMessage` will no longer
function as designed. To send mock messages to the framework,
consider using `ChannelBuffers.push`.
There is no mechanism to intercept messages from the plugins
and forward them to the framework in the new API.
If your use case requires such a mechanism, please file a bug.

操作 `onPlatformMessage` 的测试将不再按原设计工作。
要向框架发送模拟消息，可以考虑使用 `ChannelBuffers.push`。
新 API 中没有拦截插件消息并转发给框架的机制。
如果你的使用场景需要这种机制，请提交 bug。

## Timeline

## 时间线

Landed in version: 2.3.0-17.0.pre.1<br>
合入版本：2.3.0-17.0.pre.1<br>
In stable release: 2.5

进入稳定版：2.5

## References

## 参考资料

API documentation:

API 文档：

* [`TestDefaultBinaryMessenger`][]
* [`TestDefaultBinaryMessengerBinding`][]

Relevant PR:

相关 PR：

* [PR #76288: Migrate to ChannelBuffers.push][]

  [PR #76288：改用 ChannelBuffers.push][PR #76288: Migrate to ChannelBuffers.push]

[`TestDefaultBinaryMessenger`]: {{site.api}}/flutter/flutter_test/TestDefaultBinaryMessenger-class.html
[`TestDefaultBinaryMessengerBinding`]: {{site.api}}/flutter/flutter_test/TestDefaultBinaryMessengerBinding-mixin.html

[PR #76288: Migrate to ChannelBuffers.push]: {{site.repo.flutter}}/pull/76288
