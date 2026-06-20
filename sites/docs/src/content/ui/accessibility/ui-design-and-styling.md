---
# title: UI design & styling
title: UI 设计与样式
# description: Information on Flutter's accessibility support.
description: 关于 Flutter 无障碍支持的信息。
ai-translated: true
---

To create an accessible app, design your UI with accessibility in mind.
This page covers key aspects of accessible UI design and styling.

要创建无障碍应用，请在设计 UI 时考虑无障碍。本页介绍无障碍 UI 设计与样式的关键方面。

## Large fonts

## 大字体

Both Android and iOS contain system settings to configure the desired font
sizes used by apps. Flutter text widgets respect this OS setting when
determining font sizes.

Android 和 iOS 都提供系统设置，用于配置应用使用的字体大小。
Flutter 文本 widget 在确定字体大小时会遵循该操作系统设置。

Font sizes are calculated automatically by Flutter based on the OS setting.
However, as a developer you should make sure your layout has enough room to
render all its contents when the font sizes are increased.
For example, you can test all parts of your app on a small-screen
device configured to use the largest font setting.

Flutter 会根据操作系统设置自动计算字体大小。
不过，作为开发者，你应确保在字体变大时，布局仍有足够空间渲染全部内容。
例如，可在配置为最大字体的小屏设备上测试应用的各个部分。

To adjust font sizes: on iOS, go to
Settings > Accessibility > Display & Text Size;
on Android, go to Settings > Font size.

调整字体大小：在 iOS 上，前往 设置 > 无障碍 > 显示与文字大小；
在 Android 上，前往 设置 > 字体大小。

### Example

### 示例

The following two screenshots show the standard Flutter app
template rendered with the default iOS font setting,
and with the largest font setting selected in iOS accessibility settings.

以下两张截图分别展示：
使用 iOS 默认字体设置渲染的标准 Flutter 应用模板，
以及在 iOS 无障碍设置中选择最大字体后的渲染效果。

<div class="wrapping-row">
  <DashImage figure image="a11y/app-regular-fonts.png" caption="Default font setting" img-class="simple-border" img-style="max-height: 480px;" />
  <DashImage figure image="a11y/app-large-fonts.png" caption="Largest accessibility font setting" img-class="simple-border" img-style="max-height: 480px;" />
</div>


## Sufficient contrast

## 足够对比度

Sufficient color contrast makes text and images easier to read.
Along with benefitting users with various visual impairments,
sufficient color contrast helps all users when viewing an interface
on devices in extreme lighting conditions,
such as when exposed to direct sunlight or on a display with low
brightness.

足够的颜色对比度让文字和图片更易阅读。
除了惠及各类视障用户，在强光直射或屏幕亮度较低等极端光照条件下查看界面时，
足够对比度也有助于所有用户。

The [W3C recommends][]:

[W3C 建议][W3C recommends]：

* At least 4.5:1 for small text (below 18 point regular or 14 point bold)

  小号文字（低于 18 磅常规或 14 磅粗体）至少 4.5:1

* At least 3.0:1 for large text (18 point and above regular or 14 point and
  above bold)

  大号文字（18 磅及以上常规或 14 磅及以上粗体）至少 3.0:1

You can test contrast using Flutter's [Accessibility Guideline API][].
For more details on testing, check out the [accessibility testing page](/ui/accessibility/accessibility-testing/).

你可以使用 Flutter 的 [Accessibility Guideline API][] 测试对比度。有关测试的更多详情，请参阅[无障碍测试页面](/ui/accessibility/accessibility-testing/)。

[W3C recommends]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html

## Tap target size

## 点击目标尺寸

Controls that are too small are hard for many people to interact with and select.
Ensure that interactive elements have a large enough tap target to be easily
pressed by users.

过小的控件对许多人来说难以操作和选中。请确保交互元素具有足够大的点击目标，便于用户按压。

Both [Android][] and [iOS][] recommend a minimum tap target size of 48x48 dp and 44x44 pts respectively.

[Android][] 和 [iOS][] 分别建议最小点击目标为 48x48 dp 和 44x44 pt。

The [W3C] recommends a minimum target size of 44 by 44 CSS pixels.

[W3C] 建议最小目标尺寸为 44×44 CSS 像素。

You can test tap target size using Flutter's [Accessibility Guideline API][].
For more details on testing, check out the [accessibility testing page](/ui/accessibility/accessibility-testing/).

你可以使用 Flutter 的 [Accessibility Guideline API][] 测试点击目标尺寸。有关测试的更多详情，请参阅[无障碍测试页面](/ui/accessibility/accessibility-testing/)。

[Android]: https://developer.android.com/guide/topics/ui/accessibility/apps#large-controls
[iOS]: https://developer.apple.com/design/human-interface-guidelines/accessibility#Mobility
[W3C]: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html

[Accessibility Guideline API]: {{site.api}}/flutter/flutter_test/AccessibilityGuideline-class.html

## Other accessibility features

## 其他无障碍功能

You can check the [AccessibilityFeatures] class for additional
accessibility features that may be enabled by the platform,
such as bold text, high contrast, and inverted colors.

你可以查看 [AccessibilityFeatures] 类，了解平台可能启用的其他无障碍功能，例如粗体文字、高对比度和反色。

[AccessibilityFeatures]: https://api.flutter-io.cn/flutter/dart-ui/AccessibilityFeatures-class.html
