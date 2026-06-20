---
# title: Capabilities & policies
title: 能力与策略
# description: >-
#   Learn how to adapt your app to the
#   capabilities and policies required
#   by the platform, app store, your company,
#   and so on.
description: >-
  了解如何让应用适配平台、应用商店、公司等要求的
  能力与策略。
ai-translated: true
---

Most real-world apps have the need to adapt to the
capabilities and policies of different devices and platforms.
This page contains advice for how to
handle these scenarios in your code.

大多数真实应用都需要适配不同设备与平台的能力与策略。
本页提供在代码中处理这些场景的建议。

## Design to the strengths of each device type

## 针对各设备类型优势进行设计

Consider the unique strengths and weaknesses of different devices.
Beyond their screen size and inputs, such as touch, mouse, keyboard,
what other unique capabilities can you leverage?
Flutter enables your code to _run_ on different devices,
but strong design is more than just running code.
Think about what each platform does best and
see if there are unique capabilities to leverage.

考虑不同设备的独特优势与劣势。
除屏幕尺寸以及触控、鼠标、键盘等输入外，还有哪些独特能力可利用？
Flutter 让你的代码能在不同设备上 **运行**，但优秀设计不止于运行代码。
思考各平台最擅长什么，看是否有独特能力可借力。

For example: Apple's App Store and Google's Play Store
have different rules that apps need to abide by.
Different host operating systems have differing
capabilities across time as well as each other.

例如：Apple App Store 与 Google Play Store 规则不同，应用需遵守。
不同宿主操作系统的能力也会随时间变化且彼此不同。

Another example is leveraging the web's extremely
low barrier for sharing. If you're deploying a web app,
decide what deep links to support,
and design the navigation routes with those in mind.

另一例是利用 Web 极低的分享门槛。
若部署 Web 应用，决定支持哪些深度链接，并据此设计导航路由。

Flutter's recommended pattern for handling different
behavior based on these unique capabilities is to create
a set of `Capability` and `Policy` classes for your app.

Flutter 推荐的做法是：根据这些独特能力，为应用创建一组 `Capability` 与 `Policy` 类。

### Capabilities

### 能力

A _capability_ defines what the code or device _can_ do.
Examples of capabilities include:

**能力** 定义代码或设备 **能** 做什么。
能力示例包括：

* The existence of an API

  API 是否存在

* OS-enforced restrictions

  操作系统强制限制

* Physical hardware requirements (like a camera)

  物理硬件要求（如相机）

### Policies

### 策略

A _policy_ defines what the code _should_ do.

**策略** 定义代码 **应** 做什么。

Examples of policies include:

策略示例包括：

* App store guidelines

  应用商店指南

* Design preferences

  设计偏好

* Assets or copy that refers to the host device

  引用宿主设备的资源或文案

* Features enabled on the server side

  服务端启用的功能

### How to structure policy code

### 如何组织策略代码

The simplest mechanical way is `Platform.isAndroid`,
`Platform.isIOS`, and `kIsWeb`. These APIs mechanically
let you know where the code is running but have some
problems as the app expands where it can run, and
as host platforms add functionality.

最简单的方式是使用 `Platform.isAndroid`、`Platform.isIOS` 和 `kIsWeb`。
这些 API 能机械地告诉你代码运行位置，
但随着应用可运行范围扩大以及宿主平台增加功能，会有一些问题。

The following guidelines explain best practices
when developing the capabilities and policies for your app:

以下指南说明为应用开发能力与策略时的最佳实践：

**Avoid using `Platform.isAndroid` and similar functions
to make layout decisions or assumptions about what a device can do.**

**避免使用 `Platform.isAndroid` 及类似函数做布局决策或假设设备能做什么。**

Instead, describe what you want to branch on in a method.

请改为在方法中描述你要分支的条件。

Example: Your app has a link to buy something in a
website, but you don't want to show that link on iOS
devices for policy reasons.

示例：应用有在网站购买的链接，但出于策略原因不想在 iOS 设备上显示。

```dart
bool shouldAllowPurchaseClick() {
  // Banned by Apple App Store guidelines.
  return !Platform.isIOS;
}

...
TextSpan(
  text: 'Buy in browser',
  style: new TextStyle(color: Colors.blue),
  recognizer: shouldAllowPurchaseClick ? TapGestureRecognizer()
    ..onTap = () { launch('<some url>') : null;
  } : null,
```

What did you get by adding an additional layer of indirection?
The code makes it more clear why the branched path exists.
This method can exist directly in the class but it's likely
that other parts of the code might need this same check.
If so, put the code in a class.

增加一层间接能带来什么？代码更清楚地说明分支存在的原因。
该方法可直接放在类中，但代码其他部分可能也需要相同检查；
若是，请放入类中。

```dart title="policy.dart"

class Policy {

  bool shouldAllowPurchaseClick() {
    // Banned by Apple App Store guidelines.
    return !Platform.isIOS;
  }
}
```

With this code in a class, any widget test can mock
`Policy().shouldAllowPurchaseClick` and verify the behavior
independently of where the device runs.
It also means that later, if you decide that
buying on the web isn't the right flow for
Android users, you can change the implementation
and the tests for clickable text won't need to change.

将代码放在类中后，任何 widget 测试都可 mock `Policy().shouldAllowPurchaseClick`，并在不依赖运行设备的情况下验证行为。
这也意味着日后若认为 Web 购买不适合 Android 用户，可改实现而可点击文本的测试无需改动。

## Capabilities

## 能力

Sometimes you want your code to do something but the
API doesn't exist, or maybe you depend on a plugin feature
that isn't yet implemented on all of the platforms you support.
This is a limitation of what the device _can_ do.

有时你想让代码做某事但 API 不存在，或依赖的插件功能尚未在你支持的所有平台实现。
这是设备 **能** 做什么的限制。

Those situations are similar to the policy decisions
described above, but these are referred to as _capabilities_.
Why separate policy classes from capabilities
when the structure of the classes is similar?
The Flutter team has found with productionized apps that making
a logical distinction between what apps _can_ do and
what they _should_ do helps larger products respond to
changes in what platforms can do or require
in addition to your own preferences after
the initial code is written.

这些情况与上述策略决策类似，但称为 **能力**。
类结构相似时为何将策略与能力分开？
Flutter 团队在生产应用中发现，区分应用 **能** 做什么与 **应** 做什么，
有助于大型产品在初始代码完成后，除自身偏好外，还能响应平台能力或要求的变化。

For example, consider the case where one platform adds
a new permission that requires users to interact with
a system dialog before your code calls a sensitive API.
Your team does the work for platform 1 and creates a
capability named `requirePermissionDialogFlow`.
Then, if and when platform 2 adds a similar requirement
but only for new API versions,
then the implementation of `requirePermissionDialogFlow`
can now check the API level and return true for platform 2.
You've leveraged the work you already did.

例如，某平台新增权限，要求用户在调用敏感 API 前与系统对话框交互。
团队为平台 1 实现并创建名为 `requirePermissionDialogFlow` 的能力。
若平台 2 日后有类似要求但仅针对新 API 版本，
`requirePermissionDialogFlow` 的实现可检查 API 级别并对平台 2 返回 true，
从而复用已有工作。

## Policies

## 策略

We encourage starting with a `Policy` class initially
even if it seems like you won't make many policy based decisions.
As the complexity of the class grows or the number of inputs expands,
you might decide to break up the policy class by feature
or some other criteria.

我们鼓励即使看似不会做很多策略决策，也先创建 `Policy` 类。
随着类复杂度或输入增多，你可按功能或其他标准拆分策略类。

For policy implementation, you can use compile time,
run time, or Remote Procedure Call (RPC) backed implementations.

策略实现可使用编译时、运行时或远程过程调用 (RPC) 支持的方式。

Compile-time policy checks are good for platforms
where the preference is unlikely to change and where
accidentally changing the value might have large consequences.
For example, if a platform requires that you not
link to the Play store, or requires that you use
a specific payment provider given the content of your app.

编译时策略检查适用于偏好不太可能改变、误改值可能后果严重的平台。
例如，某平台要求不得链接 Play 商店，或根据应用内容要求使用特定支付提供商。

Runtime checks can be good for determining if there
is a touch screen the user can use. Android has a feature
you can check and your web implementation could
check for max touch points.

运行时检查适合判断用户是否可使用触摸屏。
Android 有可检查的特性，Web 实现可检查 max touch points。

RPC-backed policy changes are good for incremental
feature rollout or for decisions that might change later.

RPC 支持的策略变更适合渐进式功能发布或日后可能改变的决策。

## Summary

## 摘要

Use a `Capability` class to define what the code *can* do.
You might check against the existence of an API,
OS-enforced restrictions,
and physical hardware requirements (like a camera).
A capability usually involves compile or runtime checks.

使用 `Capability` 类定义代码 **能** 做什么。
可检查 API 是否存在、操作系统限制及物理硬件要求（如相机）。
能力通常涉及编译或运行时检查。

Use a `Policy` class (or classes depending on complexity)
to define what the code _should_ do to comply with
App store guidelines, design preferences,
and assets or copy that need to refer to the host device.
Policies can be a mix of compile, runtime, or RPC checks.

使用 `Policy` 类（或按复杂度使用多个类）定义代码 **应** 做什么以符合应用商店指南、设计偏好及需引用宿主设备的资源或文案。
策略可混合编译、运行时或 RPC 检查。

Test the branching code by mocking capabilities and
policies so the widget tests don't need to change
when capabilities or policies change.

通过 mock 能力与策略测试分支代码，这样在能力或策略变化时 widget 测试无需改动。

Name the methods in your capabilities and policies classes
based on what they are trying to branch, rather than on device type.

能力与策略类中的方法命名应基于分支意图，而非设备类型。
