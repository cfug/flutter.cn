---
# title: Protect your app's sensitive content
title: 保护应用的敏感内容
# shortTitle: Sensitive content
shortTitle: 敏感内容
# description: >-
#   Learn how to protect sensitive content in your Flutter app.
description: >-
  了解如何保护 Flutter 应用中的敏感内容。
ai-translated: true
---

The [`SensitiveContent`] widget allows you to prevent
screens that contain sensitive content (such as passwords)
from being projected. To learn more,
check out the following two-minute Widget of the Week video:

[`SensitiveContent`] widget 可阻止包含敏感内容（如密码）的屏幕被投射。
要了解更多信息，请观看以下两分钟「Flutter widget of the week」视频：

<YouTubeEmbed id="WnzHARTIZww"
  title="SensitiveContent | Flutter widget of the week"></YouTubeEmbed>

## About the `SensitiveContent` widget

## 关于 `SensitiveContent` widget

You can use the `SensitiveContent` widget in your app to set the content
sensitivity of a child `Widget` to one of the following [`ContentSensitivity`]
values: `notSensitive`, `sensitive`, or `autoSensitive`.
Your chosen mode determines if the device screen should be obscured
(blacked out) during media projection to protect sensitive data.

你可以在应用中使用 `SensitiveContent` widget，
将子 widget 的内容敏感度设置为以下 [`ContentSensitivity`] 值之一：
`notSensitive`、`sensitive` 或 `autoSensitive`。
所选模式决定在媒体投射期间是否应遮挡（黑屏）设备屏幕以保护敏感数据。

You can have as many `SensitiveContent` widgets in your app as you wish,
but if _any_ one of those widgets has a `sensitive` content value, then the
entire screen is obscured during media projection. Thus, for most use cases,
using multiple `SensitiveContent` widgets provides no advantage over having
one `SensitiveContent` widget in your app’s widget tree.

你可以在应用中放置任意数量的 `SensitiveContent` widget，
但若 **任一** widget 的内容值为 `sensitive`，则媒体投射期间整个屏幕都会被遮挡。
因此，在大多数用例中，使用多个 `SensitiveContent` widget 相比在应用的 widget 树中只放一个并无优势。

This feature is available on Android API 35+
and has no effect on lower API versions or other platforms.

该功能在 Android API 35+ 上可用，
在更低 API 版本或其他平台上无效。

:::note
The `autoSensitive` value isn't supported as of Flutter 3.35 and behaves
the same as `notSensitive`. See [Issue #160879][] for more information.

自 Flutter 3.35 起不支持 `autoSensitive` 值，其行为与 `notSensitive` 相同。
更多信息请参阅 [Issue #160879][]。
:::

[Issue #160879]: {{site.github}}/flutter/flutter/issues/160879

## Using the `SensitiveContent` widget

## 使用 `SensitiveContent` widget

Given some content that you want to protect from media screen share
(for example, a `MySensitiveContent()` widget), you can wrap it with the
`SensitiveContent` widget as shown in the following example:

对于希望防止媒体屏幕共享的内容（例如 `MySensitiveContent()` widget），可按以下示例用 `SensitiveContent` widget 包裹：

```dart
class MyWidget extends StatelessWidget {
  ...
  Widget build(BuildContext context) {
    return SensitiveContent(
      sensitivity: ContentSensitivity.sensitive,
      child: MySensitiveContent(),
    );
  }
}
```

When running on Android API 34 and below, the screen won't be obscured
during media projection. The widget will exist in the tree but has no other
effect, and you don't need to avoid usages of `SensitiveContent` on platforms
that don't support this feature.

在 Android API 34 及以下版本运行时，媒体投射期间屏幕不会被遮挡。
该 widget 会存在于树中但无其他效果，你无需在不支持此功能的平台上避免使用 `SensitiveContent`。

## For more information

## 更多信息

For more information, visit the [`SensitiveContent`][]
and [`ContentSensitivity`][] API docs.

更多信息请访问 [`SensitiveContent`][] 与 [`ContentSensitivity`][] API 文档。

[`SensitiveContent`]: {{site.api}}/flutter/widgets/SensitiveContent-class.html
[`ContentSensitivity`]: {{site.api}}/flutter/services/ContentSensitivity.html
