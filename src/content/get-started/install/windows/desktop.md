---
# title: Start building Flutter native desktop apps on Windows
title: 开始在 Windows 上构建 Flutter 原生桌面应用
# description: Configure your system to develop Flutter desktop apps on Windows.
description: 配置你的 Windows 系统环境，以便开发 Flutter 桌面应用。
# short-title: Make Windows desktop apps
short-title: 开发 Windows 桌面应用
target: desktop
config: WindowsDesktop
devos: Windows
next:
  # title: Create your first app
  title: 编写你的第一个应用
  path: /get-started/codelab
---

{% include docs/install/reqs/windows/base.md os=devos target=target %}

{% include docs/install/flutter-sdk.md os=devos target=target terminal='PowerShell' -%}

{% include docs/install/flutter-doctor.md devos=devos target=target platform=target config=config %}

{% include docs/install/next-steps.md devos=devos target=target config=config %}
