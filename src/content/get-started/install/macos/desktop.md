---
# title: Start building Flutter native desktop apps on macOS
title: 开始在 macOS 上构建 Flutter 原生桌面应用
# description: Configure your system to develop Flutter desktop apps on macOS.
description: 配置你的 macOS 系统环境，以便开发 Flutter 桌面应用。
# short-title: Make macOS desktop apps
short-title: 制作 macOS 桌面应用
target: desktop
config: macOSDesktop
devos: macOS
next:
  # title: Create your first app
  title: 编写你的第一个应用
  path: /get-started/codelab
---

{% include docs/install/reqs/macos/base.md os=devos target=target %}

{% include docs/install/flutter-sdk.md os=devos target=target terminal='Terminal' %}

{% include docs/install/compiler/xcode.md os=devos target=target attempt='first' %}

{% include docs/install/flutter-doctor.md devos=devos target=target config=config %}

{% include docs/install/next-steps.md devos=devos target=target config=config %}
