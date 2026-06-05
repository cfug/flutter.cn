---
# title: Material Design for Flutter
title: Flutter 的 Material Design
# description: Learn about Material Design for Flutter.
description: 了解 Flutter 的 Material Design。
ai-translated: true
---

Material Design is an open-source design system built
and supported by Google designers and developers.

Material Design 是由 Google 设计师和开发者构建并支持的开源设计系统。

The latest version, Material 3, enables personal,
adaptive, and expressive experiences—from dynamic color
and enhanced accessibility, to foundations for
large screen layouts, and design tokens.

最新版本 Material 3 支持个性化、自适应和富有表现力的体验——从动态颜色和增强的无障碍性，到大屏布局基础和设计令牌。

:::warning
As of the Flutter 3.16 release, **Material 3 is
enabled by default**. For now, you can opt out
of Material 3 by setting the [`useMaterial3`][] property
to `false`. But be aware that the `useMaterial3`
property and support for Material 2
will eventually be deprecated according to
Flutter's [deprecation policy][].

自 Flutter 3.16 发布起，**Material 3 默认启用**。目前，你可以通过将 [`useMaterial3`][] 属性设为 `false` 来退出 Material 3。但请注意，根据 Flutter 的[弃用政策][deprecation policy]，`useMaterial3` 属性以及对 Material 2 的支持最终将被弃用。
:::

For _most_ Flutter widgets, upgrading to Material 3
is seamless. But _some_ widgets couldn't be
updated—entirely new implementations were needed,
such as [`NavigationBar`][].
You must make these changes to your code manually.
Until your app is entirely updated,
the UI might look or act a bit strange.
You can find the entirely new Material components by
visiting the [Affected widgets][] page.

对_大多数_ Flutter widget 而言，升级到 Material 3 是无缝的。但_有些_ widget 无法直接更新——需要全新的实现，例如 [`NavigationBar`][]。你必须在代码中手动进行这些更改。在应用完全更新之前，UI 的外观或行为可能会有些异常。你可以访问[受影响的 widget][Affected widgets] 页面查看全新的 Material widget。

[Affected widgets]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html#affected-widgets
[deprecation policy]: /release/compatibility-policy#deprecation-policy
[demo]: {{site.github}}/flutter/samples/blob/main/material_3_demo/
[`NavigationBar`]: {{site.api}}/flutter/material/NavigationBar-class.html
[`useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html

Explore the updated components, typography, color system,
and elevation support with the
[Material 3 demo][demo].

通过 [Material 3 演示][demo] 探索更新后的 widget、字体排版、颜色系统和 elevation 支持。

## More information {:.no_toc}

## 更多信息 {:.no_toc}

To learn more about Material Design and Flutter,
check out:

要了解更多关于 Material Design 和 Flutter 的信息，请查看：

* [Material.io developer documentation][]

  [Material.io 开发者文档][Material.io developer documentation]

* [Migrating a Flutter app to Material 3][] blog post by Taha Tesser

  Taha Tesser 撰写的[将 Flutter 应用迁移到 Material 3][Migrating a Flutter app to Material 3] 博客文章

* [Umbrella issue on GitHub][]

  GitHub 上的[总括 issue][Umbrella issue on GitHub]

[Material.io developer documentation]: {{site.material}}/develop/flutter
[Migrating a Flutter app to Material 3]: https://blog.codemagic.io/migrating-a-flutter-app-to-material-3/
[Umbrella issue on GitHub]: {{site.github}}/flutter/flutter/issues/91605
