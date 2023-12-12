---
title: State management
title: 状态 (State) 管理介绍
description: How to structure an app to manage the state of the data flowing through it.
tags: Flutter状态管理
keywords: 概览
next:
  title: Start thinking declaratively
  title: 状态管理中的声明式编程思维
  path: /docs/data-and-backend/state-mgmt/declarative
---

{{site.alert.note}}

  If you have written a mobile app using Flutter
  and wonder why your app's state is lost
  on a restart, check out [Restore state on Android][]
  or [Restore state on iOS][].

  如果你使用 Flutter 编写了移动应用，
  并希望搞清楚为什么在重启的时候，
  应用的状态会丢失，
  请查阅：[在 Android 上恢复状态][Restore state on Android] 和 
  [在 iOS 上恢复状态][Restore state on iOS]

{{site.alert.end}}

[Restore state on Android]: {{site.url}}/platform-integration/android/restore-state-android
[Restore state on iOS]: {{site.url}}/platform-integration/ios/restore-state-ios

_If you are already familiar with state management in reactive apps,
you can skip this section, though you might want to review the
[list of different approaches][]._

**如果你早已熟悉响应式 App 中的状态管理，你可以跳过这个部分，
不过这里也有一些关于 
[状态 (State) 管理参考][list of different approaches] 的信息供你查阅。**

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/state-management-explainer.gif' width="100%" alt="A short animated gif that shows the workings of a simple declarative state management system. This is explained in full in one of the following pages. Here it's just a decoration.">

{% comment %}
Source of the above animation tracked internally as b/122314402
{% endcomment %}

As you explore Flutter,
there comes a time when you need to share application
state between screens, across your app.
There are many approaches you can take,
and many questions to think about.

当你使用 Futter 进行开发时，有时会需要在 app 的不同界面中共享应用程序的状态，
在这里你可以找到许多有用的方案以及一些可以深思的问题。

In the following pages,
you will learn the basics of dealing with state in Flutter apps.

在接下来的文档里，你将会学习一些基础的状态管理知识。

[list of different approaches]: {{site.url}}/data-and-backend/state-mgmt/options
