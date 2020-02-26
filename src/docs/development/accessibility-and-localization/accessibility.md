---
title: Accessibility
title: 无障碍
description: Information on Flutter's accessibility support.
---

Flutter is committed to supporting developers who want to make
their apps more accessible: usable by as many people as possible,
including those with disabilities such as blindness or motor impairment.

Flutter 始终致力于支持那些希望开发出能让包括失明、运动障碍等残障人士在内的，
尽可能多的用户无障碍访问自己的应用的开发人员。

Flutter supports three components for accessibility support:

为实现无障碍支持，Flutter 提供了三种组件：

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
       select **Run Audio** to get a report of potential issues

       在辅助检查器中，选择工具栏中的**审核**，
       然后选择**运行音频”**来获取潜在问题的报告

## Large fonts

## 大字体

Both Android and iOS contain system settings to configure the desired font
sizes used by apps. Flutter text widgets respect this OS setting when
determining font sizes.

Android 和 iOS 都包含配置应用程序所需字体大小的系统设置。在确定字体大小时， Flutter 文本 widget 会遵循当前系统设置。

### Tips for developers

### 给开发者的提示

Font sizes are calculated automatically by Flutter based on the OS setting.
However, as a developer you should make sure your layout has enough room to
render all its contents when the font sizes are increased.
For example, you can test all parts of your app on a small-screen
device configured to use the largest font setting.

Flutter 会根据操作系统设置自动计算字体大小。但是，作为开发人员，你应确保在增加字体大小时，你的页面有足够的空间来呈现其所有内容。例如，
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
