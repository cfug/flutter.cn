---
# title: Flutter documentation
title: Flutter 开发文档
# short-title: Docs
short-title: 文档
# description: Get started with Flutter. Widgets, examples, updates, and API docs to help you write your first Flutter app.
description: Flutter 上手起步，包括 widgets 介绍、样例代码、最新更新和 API 文档，帮助你撰写第一个 Flutter 应用。
tags: Flutter中文文档
keywords: Flutter文档,Flutter汉语文档,Flutter开发导航
---

<div class="card-grid">
{% for card in docs_cards -%}
    <a class="card" href="{{card.url}}">
      <div class="card-body">
        <header class="card-title">{{card.name}}</header>
        <p class="card-text">{{card.description}}</p>
      </div>
    </a>
{% endfor %}
</div>

**To see changes to the site since our last release,
see [What's new][].**

查看最近网站更新的内容，请查阅
[文档网站更新内容归档][What's new]。

[What's new]: /release/whats-new

## New to Flutter?

## 新接触 Flutter 吗？

Once you've [Set up Flutter][],
you should follow the 
[Write your first Flutter app][] codelab 
and read [Flutter fundamentals][]. 
These resources are opinionated documentation 
that guide you through the most important
parts of building a Flutter app.

当你 [设置完成 Flutter][Set up Flutter] 后，
接下来你可以上手试试 [第一个 Flutter 应用的开发][Write your first Flutter app] codelab 
以及阅读 [Flutter 基础知识][Flutter fundamentals]。
这些资源是有明确指导性的文档，
会引导你了解构建 Flutter 应用的重要部分。

[Write your first Flutter app]: /get-started/codelab
[Flutter fundamentals]: /get-started/fundamentals

### Docs

### 文档

Coming from another platform? Check out Flutter for:
[Android][], [SwiftUI][], [UIKit][], [React Native][], and
[Xamarin.Forms][] developers.

看我们为各种已经有相关平台开发经验的开发者准备的文档：
- [给 Android 开发者的 Flutter 指南][Android]
- [给 iOS SwiftUI 开发者的 Flutter 指南][SwiftUI]
- [给 iOS UIKit 开发者的 Flutter 指南][UIKit]
- [给 React Native 开发者的 Flutter 指南][React Native]
- [给 Xamarin.Forms 开发者的 Flutter 指南][Xamarin.Forms]

[Building layouts][]
<br> Learn how to create layouts in Flutter,
  where everything is a widget.

[Flutter 中的布局][Building layouts]
<br> 学习如何在 Flutter 中创建布局，在 Flutter 里，所有事物都是 widget。

[Understanding constraints][]
<br> Once you understand that "Constraints
  flow up. Sizes flow down. Parents set
  positions", then you are well on your
  way to understanding Flutter's layout model.

[理解布局约束][Understanding constraints]
<br> 一旦你理解了 Constraints flow up. Sizes flow down. Parents set positions
这个思路之后，就能更好帮助你了解 Flutter 的布局模型。

[Adding interactivity to your Flutter app][interactivity]
<br> Learn how to add a stateful widget to your app.

[为你的 Flutter 应用加入交互体验][interactivity]
<br> 在 app 里使用有状态的 widget。

[FAQ][]
<br> Get the answers to frequently asked questions.

[常见问题][FAQ]
<br> 常见问题解答

[Android]: /get-started/flutter-for/android-devs
[Building layouts]: /ui/layout
[FAQ]: /resources/faq
[Set up Flutter]: /get-started/install
[interactivity]: /ui/interactivity
[SwiftUI]: /get-started/flutter-for/swiftui-devs
[UIKit]: /get-started/flutter-for/uikit-devs
[React Native]: /get-started/flutter-for/react-native-devs
[Understanding constraints]: /ui/layout/constraints
[Xamarin.Forms]: /get-started/flutter-for/xamarin-forms-devs

### Videos

### 视频资源

Check out the Introducing Flutter series.
Learn Flutter basics like
[how do I make my first Flutter app?][first-app]
In Flutter, "everything is a widget"!
Learn more about `Stateless` and `Stateful`
widgets in [What is State?][]

我们在 YouTube 上有一个 [Flutter 频道](https://www.youtube.com/c/flutterdev)，欢迎订阅！
更多视频和播放列表介绍，以及社区制作的视频教程，
可以查看我们的 [Flutter 技术视频资源][videos] 页面。
同时，你可以关注 [“Google中国”的哔哩哔哩账号](https://space.bilibili.com/64169458)
了解更多更全面的谷歌技术中文内容，
也可以关注 [“Flutter 社区”的哔哩哔哩账号](https://space.bilibili.com/344928717)
了解更多来自社区的内容更新。

请查看下述 Flutter 入门系列视频，通过 [构建第一个 Flutter 应用][] 学习 Flutter 基础内容，Flutter 里 “所有的事物都是 widget”，如果你想更好了解有状态 `Stateful` 和无状态 `Stateless` 的 widget，查看视频 [什么是状态][]？

<div class="card-grid">
    <div class="card">
        <div class="card-body">
            <iframe class="full-width" src="{{site.bili.embed}}?aid=557525809&bvid=BV1Se4y1Z74p&cid=818071255&page=1&autoplay=false" title="构建第一个 Flutter 应用"  {{site.bili.set}}></iframe> 
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <iframe class="full-width" src="{{site.bili.embed}}?aid=815087524&bvid=BV14G4y167Tu&cid=818431224&page=1&autoplay=false" title="什么是状态？" {{site.bili.set}}></iframe> 
        </div>
    </div>
</div>

[first-app]: {{site.yt.watch}}?v=xWV71C2kp38
[What is State?]: {{site.yt.watch}}?v=QlwiL_yLh6E
[构建第一个 Flutter 应用]: {{site.bili.video}}/BV1Se4y1Z74p
[什么是状态]: {{site.bili.video}}/BV14G4y167Tu

{% videoWrapper '一分钟！快速学习构建和部署 Flutter 应用' %} <!-- Only have 60 seconds? Learn how to build and deploy a Flutter App! -->
{% ytEmbed 'ZnufaryH43s', 'How to build and deploy a Flutter app in 60 seconds!', true %}
{% endvideoWrapper %}

## Want to skill up?

## 提升内容

Dive deeper into how Flutter works under the hood!
Learn [why you write standalone widgets instead of
using helper methods][standalone-widgets] or
[what is "BuildContext" and how is it used][buildcontext]?

深入了解 Flutter 的工作原理，
了解为什么要编写独立的 widget 而不是使用 help 方法，
以及 ["BuildContext" 是什么，以及如何使用][buildcontext]：

<div class="card-grid">
    <div class="card">
        <div class="card-body">
            {% ytEmbed 'IOyq-eTRhvo', 'Widgets vs helper methods | Decoding Flutter', true, true %}
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            {% ytEmbed 'rIaaH87z1-g', 'BuildContext?! | Decoding Flutter', true, true %}
        </div>
    </div>
</div>

[standalone-widgets]: {{site.yt.watch}}?v=IOyq-eTRhvo
[buildcontext]: {{site.yt.watch}}?v=rIaaH87z1-g

To learn about all of the Flutter video series,
see our [videos][] page.

了解更多 Flutter 的视频系列内容，可以查看 [视频学习资源][videos] 页面。

We release new videos almost every week on the Flutter YouTube channel:

我们每周都会在 Flutter 的 YouTube 频道更新视频，欢迎关注:

<a class="btn btn-primary" target="_blank" href="https://www.youtube.com/@flutterdev">Explore more Flutter videos</a>

[videos]: /resources/videos
