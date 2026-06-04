---
# title: "Restore state on iOS"
title: "在 iOS 上恢复状态"
# description: "How to restore the state of your iOS app after it's been killed by the OS."
description: "如何在操作系统终止 iOS 应用后恢复其状态。"
ai-translated: true
---

When a user runs a mobile app and then selects another
app to run, the first app is moved to the background,
or _backgrounded_. The operating system (both iOS and Android)
often kills the backgrounded app to release memory or
improve performance for the app running in the foreground.

用户运行移动应用后再切换到其他应用时，第一个应用会进入后台（_backgrounded_）。操作系统（iOS 与 Android）常会终止后台应用以释放内存或提升前台应用的性能。

You can use the [`RestorationManager`][] (and related)
classes to handle state restoration.
An iOS app requires [a bit of extra setup][] in Xcode,
but the restoration classes otherwise work the same on
both iOS and Android.

你可以使用 [`RestorationManager`][]（及相关类）处理状态恢复。iOS 应用需要在 Xcode 中 [做一些额外设置][]，除此之外恢复类在 iOS 与 Android 上的用法相同。

For more information, check out [State restoration on Android][].

更多信息请参阅 [Android 上的状态恢复][]。

[a bit of extra setup]: {{site.api}}/flutter/services/RestorationManager-class.html#state-restoration-on-ios
[做一些额外设置]: {{site.api}}/flutter/services/RestorationManager-class.html#state-restoration-on-ios
[`RestorationManager`]: {{site.api}}/flutter/services/RestorationManager-class.html
[State restoration on Android]: /platform-integration/android/restore-state-android
[Android 上的状态恢复]: /platform-integration/android/restore-state-android
