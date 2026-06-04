---
# title: Accessibility technologies
title: 无障碍技术
# description: >-
#   Information about accessibility technologies for Flutter developers.
description: >-
  面向 Flutter 开发者的无障碍技术信息。
ai-translated: true
---

## Summary

## 摘要

Assistive technologies are essential for making digital content accessible to
individuals with disabilities. This document provides an overview of two key
categories of assistive technologies relevant to Flutter development: screen
readers for users with visual impairments and mobility support tools for
those with motor limitations. By understanding and testing with these
technologies, you can ensure your Flutter application provides a more inclusive
and user-friendly experience for everyone.

辅助技术对于让残障人士能够访问数字内容至关重要。本文概述了与 Flutter 开发相关的两类关键辅助技术：面向视障用户的屏幕阅读器，以及面向运动能力受限用户的移动辅助工具。通过了解并使用这些技术进行测试，你可以确保 Flutter 应用为所有人提供更包容、更友好的体验。

## Screen readers

## 屏幕阅读器

For mobile, screen readers ([TalkBack][], [VoiceOver][])
enable visually impaired users to get spoken feedback about
the contents of the screen and interact with the UI by using
gestures on mobile and keyboard shortcuts on desktop.
Turn on VoiceOver or TalkBack on your mobile device and
navigate around your app.

在移动端，屏幕阅读器（[TalkBack][]、[VoiceOver][]）让视障用户获得屏幕内容的语音反馈，并通过移动端手势或桌面端键盘快捷键与 UI 交互。在移动设备上开启 VoiceOver 或 TalkBack，并在应用中导航。

**To turn on the screen reader on your device, complete the following steps:**

**要在设备上开启屏幕阅读器，请完成以下步骤：**

<Tabs key="screen-reader-os" wrapped="true">

<Tab name="Android">

1. On your device, open **Settings**.
2. Select **Accessibility** and then **TalkBack**.
3. Turn 'Use TalkBack' on or off.
4. Select Ok.

1. 在设备上打开 **设置**。
2. 选择 **无障碍**，然后选择 **TalkBack**。
3. 开启或关闭「使用 TalkBack」。
4. 选择确定。

To learn how to find and customize Android's
accessibility features, view the following video.

要了解如何查找和自定义 Android 的无障碍功能，请观看以下视频。

<YouTubeEmbed id="FQyj_XTl01w" title="Customize Pixel and Android accessibility features" />

</Tab>
<Tab name="iOS or iPadOS">

1. On your device, open **Settings > Accessibility > VoiceOver**
2. Turn the VoiceOver setting on or off

1. 在设备上打开 **设置 > 无障碍 > VoiceOver**
2. 开启或关闭 VoiceOver 设置

To learn how to find and customize iOS
accessibility features, view the following video.

要了解如何查找和自定义 iOS 的无障碍功能，请观看以下视频。

<YouTubeEmbed id="ROIe49kXOc8" title="How to navigate your iPhone or iPad with VoiceOver" />

</Tab>
<Tab name="Browsers">

For web, the following screen readers are currently supported:

对于 Web，目前支持以下屏幕阅读器：

Mobile browsers:

* iOS - VoiceOver
* Android - TalkBack

移动端浏览器：

* iOS - VoiceOver
* Android - TalkBack

Desktop browsers:

* macOS - VoiceOver
* Windows - JAWs & NVDA

桌面端浏览器：

* macOS - VoiceOver
* Windows - JAWs & NVDA

Screen readers users on web must toggle the
"Enable accessibility" button to build the semantics tree.
Users can skip this step if you programmatically auto-enable
accessibility for your app using this API:

Web 上的屏幕阅读器用户必须切换「Enable accessibility」按钮以构建语义树。如果你使用以下 API 以编程方式为应用自动启用无障碍，用户可跳过此步骤：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

void main() {
  runApp(const MyApp());
  SemanticsBinding.instance.ensureSemantics();
}
```

</Tab>
<Tab name="Desktop">

Windows comes with a screen reader called Narrator
but some developers recommend using the more popular
NVDA screen reader. To learn about using NVDA to test
Windows apps, check out
[Screen Readers 101 For Front-End Developers (Windows)][nvda].

Windows 自带名为 Narrator 的屏幕阅读器，但部分开发者建议使用更流行的 NVDA 屏幕阅读器。要了解如何使用 NVDA 测试 Windows 应用，请参阅 [Screen Readers 101 For Front-End Developers (Windows)][nvda]。

[nvda]: https://evinced.com/blog/screen-readers-101-for-front-end-developers-windows

On a Mac, you can use the desktop version of VoiceOver,
which is included in macOS.

在 Mac 上，你可以使用 macOS 自带的桌面版 VoiceOver。

<YouTubeEmbed id="5R-6WvAihms" title="Screen reader basics: VoiceOver" />

On Linux, a popular screen reader is called Orca.
It comes pre-installed with some distributions
and is available on package repositories such as `apt`.
To learn about using Orca, check out
[Getting started with Orca screen reader on Gnome desktop][orca].

在 Linux 上，常用的屏幕阅读器是 Orca。部分发行版已预装，也可通过 `apt` 等软件包仓库安装。要了解如何使用 Orca，请参阅 [Getting started with Orca screen reader on Gnome desktop][orca]。

[orca]: https://www.a11yproject.com/posts/getting-started-with-orca

</Tab>
</Tabs>

<br/>

Check out the following [video demo][] to see how to
use VoiceOver with the now-archived [Flutter Gallery][] web app.

请观看以下[视频演示][video demo]，了解如何将 VoiceOver 与已归档的 [Flutter Gallery][] Web 应用配合使用。

Flutter's standard widgets generate an accessibility tree automatically.
However, if your app needs something different,
it can be customized using the [`Semantics` widget][].

Flutter 的标准 widget 会自动生成无障碍树。不过，若应用需要不同行为，可使用 [`Semantics` widget][] 进行自定义。

When there is text in your app that should be voiced
with a specific voice, inform the screen reader
which voice to use by calling [`TextSpan.locale`][].
`MaterialApp.locale` and `Localizations.override`
will affect screen reader voices starting from flutter 3.38 release.
Usually, the screen reader uses the system voice
except where you explicitly set it with `TextSpan.locale`.

当应用中的文本需要使用特定语音朗读时，请调用 [`TextSpan.locale`][] 告知屏幕阅读器使用哪种语音。从 Flutter 3.38 起，`MaterialApp.locale` 和 `Localizations.override` 会影响屏幕阅读器的语音。通常，屏幕阅读器使用系统语音，除非你通过 `TextSpan.locale` 显式指定。

[Flutter Gallery]: {{site.gallery-archive}}
[`TextSpan.locale`]: {{site.api}}/flutter/painting/TextSpan/locale.html
[`Semantics` widget]: {{site.api}}/flutter/widgets/Semantics-class.html
[TalkBack]: https://support.google.com/accessibility/android/answer/6283677?hl=en
[VoiceOver]: https://www.apple.com/lae/accessibility/iphone/vision/
[video demo]: {{site.yt.watch}}?v=A6Sx0lBP8PI

## Mobility support

## 移动辅助

For users with limited dexterity or hand strength, mobility support features
can be helpful. Both Android and iOS offer a range of tools designed to make
navigation and control easier.
These features allow users to operate their devices through external switches,
voice commands, or simplified on-screen menus.

对于灵巧度或手部力量受限的用户，移动辅助功能很有帮助。Android 和 iOS 都提供多种工具，旨在让导航和控制更轻松。这些功能允许用户通过外接开关、语音命令或简化的屏幕菜单操作设备。

Android provides Switch Access, Voice Access and Accessibility Menu,
while iOS offers Switch Control, Voice Control, and AssistiveTouch.
Understanding these tools helps in creating
apps that are usable by people with diverse physical abilities.

Android 提供 Switch Access、Voice Access 和 Accessibility Menu，iOS 提供 Switch Control、Voice Control 和 AssistiveTouch。了解这些工具有助于创建可供不同身体能力人群使用的应用。

<table class="table table-striped">
  <thead>
    <tr>
      <th>OS</th>
      <th>Features </th>
      <th>Functions</th>
    </tr>
    <tr>
      <th>操作系统</th>
      <th>功能</th>
      <th>作用</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Android</td>
      <td><strong>Switch Access</strong> </td>
      <td>As an alternate input method, you can use Switch Access and Camera Switches</td>
    </tr>
    <tr>
      <td>Android</td>
      <td><strong>Switch Access</strong> </td>
      <td>作为替代输入方式，你可以使用 Switch Access 和 Camera Switches</td>
    </tr>
    <tr>
      <td>Android</td>
      <td><strong>Voice Access</strong> </td>
      <td>Control your device with your voice</td>
    </tr>
    <tr>
      <td>Android</td>
      <td><strong>Voice Access</strong> </td>
      <td>用语音控制设备</td>
    </tr>
    <tr>
      <td>Android</td>
      <td><strong>Accessibility Menu</strong> </td>
      <td>A floating, on-screen menu that provides simplified buttons to control essential phone functions.</td>
    </tr>
    <tr>
      <td>Android</td>
      <td><strong>Accessibility Menu</strong> </td>
      <td>浮动屏幕菜单，提供简化按钮以控制手机基本功能。</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>Switch Control</strong> </td>
      <td>Use switches as an alternate input methods</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>Switch Control</strong> </td>
      <td>将开关用作替代输入方式</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>Voice Control</strong> </td>
      <td>Control your device with your voice</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>Voice Control</strong> </td>
      <td>用语音控制设备</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>AssistiveTouch</strong> </td>
      <td>Use AssistiveTouch to replace multi-finger gestures or hardware button actions</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>AssistiveTouch</strong> </td>
      <td>使用 AssistiveTouch 替代多指手势或硬件按钮操作</td>
    </tr>
  </tbody>
</table>
