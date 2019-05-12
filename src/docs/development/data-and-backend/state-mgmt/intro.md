---
title: State management
title: 状态 (State) 管理介绍
description: How to structure an app to manage the state of the data flowing through it.
next:
  title: Start thinking declaratively
  title: 状态管理中的声明式编程思维
  path: /docs/development/data-and-backend/state-mgmt/declarative
---

_If you are already familiar with state management in reactive apps, you can 
skip this section, though you might want to review the [list of different 
approaches](/docs/development/data-and-backend/state-mgmt/options)._

_如果你早已在响应式 App 中使用了状态管理，你可以跳过这个部分，你可能需要看一下[不同方式的清单](/docs/development/data-and-backend/state-mgmt/options)。_

{% asset development/data-and-backend/state-mgmt/state-management-explainer width="100%" alt="A short animated gif that shows the workings of a simple declarative state management system. This is explained in full in one of the following pages. Here it's just a decoration." %}

{% comment %} 
Source of the above animation tracked internally as b/122314402 
{% endcomment %}

As you explore Flutter, there comes a time when you need to share application 
state between screens, across your app. There are many approaches you can take, 
and many questions to think about.

当您探索 Flutter 时，有时需要在屏幕之间、整个应用程序之间、共享应用程序状态。你可以采用许多方案、思考许多问题。

In the following pages, you will learn the basics of dealing with state in 
Flutter apps.

在后续的页面中，你将会学习在 Flutter App 中处理状态的基础。
