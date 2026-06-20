---
# title: External windows in Flutter Windows apps
title: Flutter Windows 应用中的外部窗口
# description: >-
#   Special considerations for adding external windows to Flutter apps
description: >-
  向 Flutter 应用添加外部窗口时的特殊注意事项
ai-translated: true
---

# Windows lifecycle

# Windows 生命周期

## Who is affected

## 受影响的对象

Windows applications built against Flutter versions after 3.13
that open non-Flutter windows.

针对 Flutter 3.13 之后版本构建、并打开非 Flutter 窗口的 Windows 应用。

## Overview

## 概述

When adding a non-Flutter window to a Flutter Windows app, it will not be part
of the logic for application lifecycle state updates by default. For example,
this means that when the external window is shown or hidden, the app lifecycle
state won't appropriately update to inactive or hidden. As a result, the app
might receive incorrect lifecycle state changes through
[WidgetsBindingObserver.didChangeAppLifecycle][].

向 Flutter Windows 应用添加非 Flutter 窗口时，
默认不会纳入应用生命周期状态更新逻辑。
例如，当外部窗口显示或隐藏时，
应用生命周期状态不会正确更新为 inactive 或 hidden。
因此，应用可能通过 [WidgetsBindingObserver.didChangeAppLifecycle][] 收到不正确的生命周期状态变更。

# What do I need to do?

# 我需要做什么？

To add the external window to this application logic,
the window's `WndProc` procedure
must invoke `FlutterEngine::ProcessExternalWindowMessage`.

要将外部窗口纳入该应用逻辑，
窗口的 `WndProc` 过程必须调用 `FlutterEngine::ProcessExternalWindowMessage`。

To achieve this, add the following code to the message handler function
of your custom external window. In C++ wrappers for the Win32 API,
this is often a class method called from the window's `WndProc`.
The exact file and class name depend on your app's implementation.

为此，请在你自定义外部窗口的消息处理函数中添加以下代码。
在 Win32 API 的 C++ 封装中，这通常是从窗口 `WndProc` 调用的类方法。
具体文件与类名取决于你的应用实现。

```cpp diff
  LRESULT MyExternalWindow::MessageHandler(HWND hwnd, UINT msg, WPARAM wparam, LPARAM lparam) {
+     std::optional<LRESULT> result = flutter_controller_->engine()->ProcessExternalWindowMessage(hwnd, msg, wparam, lparam);
+     if (result.has_value()) {
+         return *result;
+     }
      // Original contents of WndProc...
  }
```

[documentation of this breaking change.]: /release/breaking-changes/win_lifecycle_process_function
[WidgetsBindingObserver.didChangeAppLifecycle]: {{site.api}}/flutter/widgets/WidgetsBindingObserver/didChangeAppLifecycleState.html
