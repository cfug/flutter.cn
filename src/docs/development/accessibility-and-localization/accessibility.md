---
title: Accessibility
title: 无障碍
description: Information on Flutter's accessibility support.
tags: Flutter开发
keywords: 联合国关于残疾人权利,CRPD,无障碍
---

Ensuring apps are accessible to a broad range of users is an essential
part of building a high-quality app. Applications that are poorly
designed create barriers to people of all ages. The [UN Convention on
the Rights of Persons with Disabilities][CRPD] states the moral and legal
imperative to ensure universal access to information systems; countries
around the world enforce accessibility as a requirement; and companies
recognize the business advantages of maximizing access to their services.

确保你的应用能够被广泛的用户使用是构建高质量应用程序至关重要的一点。
如果你的应用设计不佳，可能会无法覆盖到所有年龄段的人。
[联合国关于残疾人权利][CRPD] 规定了道德和法律必须确保信息系统能够普遍使用。
世界各地也都要求提供无障碍的环境；
同样，公司也认识到了最大限度覆盖服务的优势所在。

We strongly encourage you to include an accessibility checklist 
as a key criteria before shipping your app. Flutter is committed to
supporting developers in making their apps more accessible, and includes
first-class framework support for accessibility in addition to that
provided by the underlying operating system, including:

我们强烈建议你将辅助功能清单添加到发布应用前的关键指标。
Flutter 始终致力于支持开发者能够使它的应用更易于访问，
其中就包括了由底层操作系统提供的一流的无障碍支持，
包括：

[**Large fonts**][]
<br> Render text widgets with user-specified font sizes

[**大字体**][**Large fonts**]
<br> 使用用户指定的字体大小呈现文本 widget

[**Screen readers**][]
<br> Communicate spoken feedback about UI contents

[**读屏器**][**Screen readers**]
<br> 通过语音反馈传达用户界面的内容

[**Sufficient contrast**][]
<br> Render widgets with colors that have sufficient contrast

[**高对比度**][**Sufficient contrast**]
<br> 在渲染 widget 时，使用具有高对比度的颜色

Details of these features are discussed below.

## Inspecting accessibility support

## 辅助功能检测

Details of these are discussed below.
In addition to testing for these specific topics,
we recommend using automated accessibility scanners:

关于无障碍功能检测的细节，我们将在下面讨论。除了测试这些特定主题外，我们还建议您使用自动辅助功能扫描程序

  * For Android:

    对于 Android:

    1. Install the [Accessibility Scanner][] for Android

       在 Android 上安装 [辅助扫描程序][Accessibility Scanner]

    1. Enable the Accessibility Scanner from
       **Android Settings > Accessibility >
       Accessibility Scanner > On**

       通过 **设置 > 辅助 > 辅助扫描仪 > 开启 在 Android 启用辅助功能扫描程序**

    1. Navigate to the Accessibility Scanner 'checkbox'
       icon button to initiate a scan

       在导航栏找到辅助扫描仪复选框按钮启动扫描

  * For iOS:

    对于 iOS:

    1. Open the `iOS` folder of your Flutter app in Xcode

       在 Xcode 中打开 Flutter 应用程序的 `iOS` 文件夹

    1. Select a Simulator as the target, and click **Run** button

       找到模拟器，然后单击 **运行** 按钮

    1. In Xcode, select
       **Xcode > Open Developer Tools > Accessibility Inspector**

       在  Xcode 选择 **Xcode > 开发者工具 > 辅助检查器**

    1. In the Accessibility Inspector,
       select **Inspection > Enable Point to Inspect**,
       and then select the various user interface elements in running
       Flutter app to inspect their accessibility attributes

       在辅助检查器中，选择 **检查> 启用点检查**，然后运行 Flutter 应用程序，
       选择各种用户界面元素来检查其辅助功能

    1. In the Accessibility Inspector,
       select **Audit** in the toolbar, and then
       select **Run Audit** to get a report of potential issues

       在辅助检查器中，选择工具栏中的**审核**，
       然后选择**运行音频”**来获取潜在问题的报告

## Large fonts

## 大字体

Both Android and iOS contain system settings to configure the desired font
sizes used by apps. Flutter text widgets respect this OS setting when
determining font sizes.

Android 和 iOS 都包含配置应用程序所需字体大小的系统设置。
在确定字体大小时，
Flutter 文本 widget 会遵循当前系统设置。

### Tips for developers

### 给开发者的提示

Font sizes are calculated automatically by Flutter based on the OS setting.
However, as a developer you should make sure your layout has enough room to
render all its contents when the font sizes are increased.
For example, you can test all parts of your app on a small-screen
device configured to use the largest font setting.

Flutter 会根据操作系统设置自动计算字体大小。
但是，作为开发人员，你应确保在增加字体大小时，
你的页面有足够的空间来呈现其所有内容。例如，
你可以在小屏幕上设置最大的字体来测试你应用上的全部内容。

### Example

### 例子

The following two screenshots show the standard Flutter app
template rendered with the default iOS font setting,
and with the largest font setting selected in iOS accessibility settings.

以下两个屏幕截图分别显示了使用默认 iOS 字体设置呈现的标准
Flutter 应用程序，和使用 iOS 辅助功能设置中选择的最大字体
设置呈现的 Flutter 应用程序。

<div class="row">
  <div class="col-md-6">
    {% include app-figure.md image="a18n/app-regular-fonts.png" caption="Default font setting" img-class="border" %}
  </div>
  <div class="col-md-6">
    {% include app-figure.md image="a18n/app-large-fonts.png" caption="Largest accessibility font setting" img-class="border" %}
  </div>
</div>

## Screen readers

## 读屏器

Screen readers ([TalkBack][], [VoiceOver][]) enable visually
impaired users to get spoken feedback about the contents of the screen.

读屏器 ([TalkBack][], [VoiceOver][]) 可以使视障用户通过语音获得相关的屏幕内容。

### Tips for developers

### 给开发者的提示

Turn on VoiceOver or TalkBack on your device and navigate around your app. If
you run into any issues, use the [`Semantics` widget][] to customize the
accessibility experience of your app.

在您的设备上启用 VoiceOver 或 TalkBack 来浏览您的应用。
如果遇到任何问题，可以使用
[语义 widget][`Semantics` widget] 来自定义您应用程序的无障碍体验。

## Sufficient contrast

## 高对比度

Sufficient color contrast makes text and images easier to read.
Along with benefitting users with various visual impairments,
sufficient color contrast helps all users when viewing an interface
on devices in extreme lighting conditions,
such as when exposed to direct sunlight or on a display with low
brightness.

高对比度能够使文本和图像更易于阅读。除了使具有各种视觉障碍的用户受益外，
高对比度也能够帮助所有用户在极端光照条件下
(例如在直射阳光下或在低亮度显示器上) 观看设备上的界面。

The [W3C recommends][]: 

[W3C 建议][W3C recommends]:

* At least 4.5:1 for small text (below 18 point regular or 14 point bold)

  小文本至少 4.5:1 (低于 18 像素常规或 14 像素粗体) 
  
* At least 3.0:1 for large text (18 point and above regular or 14 point and
  above bold)

  大文本至少 3.0:1 (18 像素及以上常规或 14 像素及以上粗体) 

### Tips for developers

### 给开发者的提示

Make sure any images you include have sufficient contrast.

确保你包含的任何图像都具有较高的对比度。

When specifying colors on widgets,
make sure sufficient contrast is used between
foreground and background color selections.

在 widget 上指定颜色时，请确保在前景色和背景色之间具备足够的对比度。

## Building with accessibility in mind

## 思考如何构建无障碍应用

Ensuring your app can be used by everyone means building accessibility
into it from the start. For some apps, that's easier said than done.
In the video below, two of our engineers take a mobile app from a dire
accessibility state to one that takes advantage of Flutter's built-in
widgets to offer a dramatically more accessible experience.

确保你的应用能够被所有人使用，
这意味着你需要从一开始就考虑到无障碍。
对于一些应用，说起来容易做起来难。
在下面的视频中，我们的两名工程师
从一个无障碍状态中获取了一个
Flutter 内置的 widget，
以提供更加便捷的体验。

<iframe width="560" height="315" src="https://www.youtube.com/embed/bWbBgbmAdQs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Accessibility release checklist

## 无障碍发布清单

Here is a non-exhaustive list of things to consider as you prepare your
app for release.

这里是一些应用发布前的你需要考虑的部分清单。

- **Active interactions**. Ensure that all active interactions do
something. Any button that can
be pushed should do something when pushed. For example, if you have a
no-op callback for an `onPressed` event, change it to show a `SnackBar`
on the screen explaining which control you just pushed.

  **主动交互**。 确保所有可以交互的地方都会给予反馈。
  任何按钮在按下之后都会做点什么。
  例如，如果你有一个“onPressed”事件的无操作回调，
  请改为显示一个“SnackBar”，并告诉用户刚才按下了哪个控件。

- **Screen reader testing**. The screen reader should be able to
describe all controls on the page when you tap on them, and the
descriptions should be intelligible. Test your app with [TalkBack][]
(Android) and [VoiceOver][] (iOS).

  **屏幕阅读测试**。
  屏幕阅读器应该能够让你在点击控件时描述页面上所有的控件，
  并且描述应易于理解。请使用 [TalkBack][]（Android）
  以及 [VoiceOver][] (iOS) 测试你的应用。

  **Contrast ratios**. We encourage you to have a contrast ratio of at
least 4.5:1 between controls or text and the background, with the
exception of disabled components. Images should also be vetted for
sufficient contrast. 

  **对比度**。我们建议你至少将控件或文本与背景之间的比例
  设为 4.5 : 1，禁用的组件除外。图片也应该经过审核足够的对比度。

- **Context switching**. Nothing should change the user's context
automatically while typing in information. Generally, the widgets
should avoid changing the user's context without some sort of
confirmation action.

  **上下文切换**。当用户输入信息时你不应改变其信息。
  通常来说，widget 应该避免在没有任何确认动作的情况下
  更改用户的上下文。

- **Tappable targets**. All tappable targets should be at least 48x48
pixels.

  **可点击的目标**。所有可点击的目标平均
  至少应为 48x48 像素。

- **Errors**. Important actions should be able to be undone. In fields
that show errors, suggest a correction if possible.

  **错误**。所有重要动作应该能够被撤销。
  在有限范围内显示错误原因，
  如果可能的话，提供订正建议。

- **Color vision deficiency testing**. Controls should be usable and
legible in colorblind and grayscale modes.

  **色觉不足测试**。控件应该可用并且在色盲和灰度模式下清晰可见。

- **Scale factors**. The UI should remain legible and usable at very
large scale factors for text size and display scaling.

  **比例系数**。 文本大小和显示比例的用户界面应保持清晰易用。

## More information

## 更多信息

For more information, particularly about how to configure
the semantics tree,
see the following articles written by community members:

如果你希望了解更多，尤其是如何配置 semantics tree，
请查看如下社区成员贡献的文章：

* [A deep dive into Flutter's accessibility widgets][]
* [Semantics in Flutter][]


[辅助扫描程序]: https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor&hl=en
[CRPD]: https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities/article-9-accessibility.html
[A deep dive into Flutter's accessibility widgets]: {{site.medium}}/flutter-community/a-deep-dive-into-flutters-accessibility-widgets-eb0ef9455bc
[Accessibility Scanner]: https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor&hl=en
[**Large fonts**]: #large-fonts
[**Screen readers**]: #screen-readers
[Semantics in Flutter]: https://www.didierboelens.com/2018/07/semantics/
[`Semantics` widget]: {{site.api}}/flutter/widgets/Semantics-class.html
[**Sufficient contrast**]: #sufficient-contrast
[TalkBack]: https://support.google.com/accessibility/android/answer/6283677?hl=en
[W3C recommends]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
[VoiceOver]: https://www.apple.com/lae/accessibility/iphone/vision/
