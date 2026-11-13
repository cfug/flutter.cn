---
# title: Introduction of FlutterEngine::ProcessExternalWindowMessage
title: 引入 FlutterEngine::ProcessExternalWindowMessage
# description: >-
#   External windows should call ProcessExternalWindowMessage to
#   be considered for application lifecycle events.
description: >-
  外部窗口应调用 ProcessExternalWindowMessage，
  才会被纳入应用生命周期事件。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

When you add any external windows to your Flutter app,
you need to include them in the Window's app lifecycle logic.
To include the window, its `WndProc` function should invoke
`FlutterEngine::ProcessExternalWindowMessage`.

向 Flutter 应用添加任何外部窗口时，
需要把它们纳入窗口的应用生命周期逻辑。
要纳入该窗口，其 `WndProc` 函数应调用
`FlutterEngine::ProcessExternalWindowMessage`。

## Who is affected

## 受影响的对象

Windows applications built against Flutter 3.13 or newer that
open non-Flutter windows.

针对 Flutter 3.13 或更高版本构建、
并且会打开非 Flutter 窗口的 Windows 应用。

## Description of change

## 改动说明

Implementing application lifecycle on Windows involves listening for Window
messages in order to update the lifecycle state. In order for additional
non-Flutter windows to affect the lifecycle state, they must forward their
window messages to `FlutterEngine::ProcessExternalWindowMessage` from their
`WndProc` functions. This function returns an `std::optional<LRESULT>`, which
is `std::nullopt` when the message is received, but not consumed. When the
returned result has a value, the message has been consumed, and further
processing in `WndProc` should cease.

在 Windows 上实现应用生命周期，需要监听窗口消息以更新生命周期状态。
要让额外的非 Flutter 窗口影响生命周期状态，
它们必须在各自的 `WndProc` 函数中，
把窗口消息转发给 `FlutterEngine::ProcessExternalWindowMessage`。
该函数返回 `std::optional<LRESULT>`：
消息已收到但未被消费时，返回值为 `std::nullopt`。
当返回结果包含值时，表示消息已被消费，
`WndProc` 中的后续处理应当停止。

## Migration guide

## 迁移指南

The following example `WndProc` procedure invokes
`FlutterEngine::ProcessExternalWindowMessage`:

下面的示例 `WndProc` 过程会调用
`FlutterEngine::ProcessExternalWindowMessage`：

```cpp
LRESULT Window::Messagehandler(HWND hwnd, UINT msg, WPARAM wparam, LPARAM lparam) {
    std::optional<LRESULT> result = flutter_controller_->engine()->ProcessExternalWindowMessage(hwnd, msg, wparam, lparam);
    if (result.has_value()) {
        return *result;
    }
    // Original contents of WndProc...
}
```

## Timeline

## 时间线

Landed in version: 3.14.0-3.0.pre<br>
合入版本：3.14.0-3.0.pre<br>
In stable release: 3.16

进入稳定版：3.16

## References

## 参考资料

Relevant PRs:

相关 PR：

* [Reintroduce Windows lifecycle with guard for posthumous OnWindowStateEvent][]

  [重新引入 Windows 生命周期，并为事后的 OnWindowStateEvent 加上防护
  ][Reintroduce Windows lifecycle with guard for posthumous OnWindowStateEvent]

[Reintroduce Windows lifecycle with guard for posthumous OnWindowStateEvent]: {{site.repo.engine}}/pull/44344
