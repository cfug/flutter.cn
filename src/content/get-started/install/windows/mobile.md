---
# title: Start building Flutter Android apps on Windows
title: 开始在 Windows 上构建 Flutter Android 应用
# description: Configure your system to develop Flutter mobile apps on Windows.
description: 配置你的 Windows 系统环境，以便开发 Flutter 移动应用。
# short-title: Make Android apps
short-title: 开发 Android 应用
target: Android
config: WindowsAndroid
devos: Windows
next:
  # title: Create a test app
  title: 开发体验初探
  path: /get-started/test-drive
---

{% include docs/install/reqs/windows/base.md os=devos target=target %}

{% include docs/install/flutter-sdk.md os=devos target=target terminal='PowerShell' -%}

{% include docs/install/compiler/android.md devos=devos target=target attempt='first' %}

{% include docs/install/flutter-doctor.md devos=devos target=target config=config %}

{% include docs/install/next-steps.md devos=devos target=target config=config %}
