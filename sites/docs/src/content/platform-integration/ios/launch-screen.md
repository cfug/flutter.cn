---
# title: Adding a launch screen to your iOS app
title: 向 iOS 应用添加启动屏幕
# shortTitle: Launch screen
shortTitle: 启动屏幕
# description: Learn how to add a launch screen to your iOS app.
description: 了解如何向 iOS 应用添加启动屏幕。
showToc: false
ai-translated: true
---

{% comment %}
Consider introducing an image here similar to the android splash-screen one:
https://github.com/flutter/website/issues/8357
{% endcomment -%}

[Launch screens][] provide a simple initial experience while your iOS app loads.
They set the stage for your application, while allowing time for the app engine
to load and your app to initialize.

[启动屏幕][Launch screens] 在 iOS 应用加载时提供简洁的初始体验，
为应用做好铺垫，同时为应用引擎加载与应用初始化争取时间。

[Launch screens]: {{site.apple-dev}}/design/human-interface-guidelines/launching#Launch-screens

All apps submitted to the Apple App Store
[must provide a launch screen][apple-requirement]
with an Xcode storyboard.

提交到 Apple App Store 的所有应用
[必须提供][apple-requirement]
基于 Xcode storyboard 的启动屏幕。

## Customize the launch screen

## 自定义启动屏幕

The default Flutter template includes an Xcode
storyboard named `LaunchScreen.storyboard`
that can be customized with your own assets.
By default, the storyboard displays a blank image,
but you can change this. To do so,
open the Flutter app's Xcode project
by typing `open ios/Runner.xcworkspace`
from the root of your app directory.
Then select `Runner/Assets.xcassets`
from the Project Navigator and
drop in the desired images to the `LaunchImage` image set.

默认 Flutter 模板包含名为 `LaunchScreen.storyboard` 的 Xcode storyboard，
可用你自己的资源进行自定义。
默认 storyboard 显示空白图像，你可以修改。
在应用目录根目录执行 `open ios/Runner.xcworkspace` 打开 Flutter 应用的 Xcode 项目，
然后在项目导航器中选择 `Runner/Assets.xcassets`，将所需图像拖入 `LaunchImage` 图像集。

Apple provides detailed guidance for launch screens as
part of the [Human Interface Guidelines][].

Apple 在 [人机界面指南][Human Interface Guidelines] 中提供了启动屏幕的详细指导。

[apple-requirement]: {{site.apple-dev}}/documentation/xcode/specifying-your-apps-launch-screen
[Human Interface Guidelines]: {{site.apple-dev}}/design/human-interface-guidelines/patterns/launching#launch-screens
