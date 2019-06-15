---
title: Start thinking declaratively
title: 状态管理中的声明式编程思维
prev:
  title: Intro
  title: 状态 (State) 管理介绍
  path: /docs/development/data-and-backend/state-mgmt
next:
  title: Ephemeral versus app state
  title: 短时 (ephemeral) 和共享 (app) 状态
  path: /docs/development/data-and-backend/state-mgmt/ephemeral-vs-app
---

If you're coming to Flutter from an imperative framework (such as Android SDK or 
iOS UIKit), you need to start thinking about app development from a new 
perspective. 

如果你是从命令式框架（例如 Android SDK 或者 iOS UIKit）转到 Flutter 应用，那么，你需要开始从一个新的角度来考虑 app 开发了。

Many assumptions that you might have don't apply to Flutter. For example, in 
Flutter it's okay to rebuild parts of your UI from scratch instead of modifying 
it. Flutter is fast enough to do that, even on every frame if needed.

因此，很多在命令式框架下的假设可能并不适用于 Flutter。例如，在 Flutter 应用中这是可行的，重新构建你的部分界面，而不是直接去修改它。 如果有需要的话，Flutter 甚至可以在每一帧上都很快做到这点。

Flutter is _declarative_. This means that Flutter builds its user interface to 
reflect the current state of your app:

Flutter 应用是 **声明式** 的，这也就意味着 Flutter 构建的用户界面就是应用的当前状态。

{% asset development/data-and-backend/state-mgmt/ui-equals-function-of-state alt="A mathematical formula of UI = f(state). 'UI' is the layout on the screen. 'f' is your build methods. 'state' is the application state." %}

{% comment %}
Source drawing for the png above: : https://docs.google.com/drawings/d/1RDcR5LyFtzhpmiT5-UupXBeos2Ban5cUTU0-JujS3Os/edit?usp=sharing
{% endcomment %}

When the state of your app changes (for example, the user flips a switch in the 
settings screen), you change the state, and that triggers a redraw of the user 
interface. There is no imperative changing of the UI itself (like 
`widget.setText`) — you change the state, and the UI rebuilds from scratch.

当你的 Flutter 应用的状态发生改变时（例如，用户在设置界面中点击了一个开关选项），你改变了状态，这会触发用户界面的重绘。去改变用户界面本身是没有必要的（例如 widget.setText ）— 你改变了状态，那么用户界面将重新构建。

Read more about the declarative approach to UI programming [in 
the get started guide](/docs/get-started/flutter-for/declarative). 

在入门指南中你可以阅读更多有关声明式编程思维的信息。

The declarative style of UI programming has many benefits. Remarkably, there is 
only one code path for any state of the UI. You describe what the UI should look 
like for any given state, once — and that is it.

声明式的编程风格有许多好处。值得注意的是，用户界面任何状态的改变都只有一种编码途径。
一旦给定任意状态，你就描述了用户界面应该长什么样，并且它就是这样。

At first, this style of programming may not seem as intuitive as the imperative 
style. This is why this section is here. Read on.

刚开始的时候，这种编码风格可能看起来不像命令式的那么直观。
这也是本章为什么出现在这的原因。
