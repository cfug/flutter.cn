---
# title: Start building Flutter iOS apps on macOS
title: 开始在 macOS 上构建 Flutter iOS 应用
# description: Configure your system to develop Flutter mobile apps on macOS and iOS.
description: 配置你的 macOS 系统环境，以便开发 Flutter iOS 移动应用。
# short-title: Make iOS apps
short-title: 制作 iOS 应用
target: iOS
devos: macOS
next:
  # title: Create your first app
  title: 编写你的第一个应用
  path: /get-started/codelab
---

{% include docs/install/reqs/macos/base.md os=devos target=target %}

{% include docs/install/flutter-sdk.md os=devos target=target terminal='Terminal' %}

{% include docs/install/compiler/xcode.md os=devos target=target attempt='first' %}

{% include docs/install/flutter-doctor.md devos=devos target=target %}

{% include docs/install/next-steps.md devos=devos target=target %}
