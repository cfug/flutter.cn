---
title: Flutter documentation
title: Flutter 开发文档
short-title: Docs
short-title: 文档
description: Get started with Flutter. Widgets, examples, updates, and API docs to help you write your first Flutter app.
description: Flutter 上手起步，包括 widgets 介绍、样例代码、最新更新和 API 文档，帮助您撰写第一个 Flutter 应用。
tags: Flutter中文文档
keywords: Flutter文档,Flutter汉语文档,Flutter开发导航
---

{% for card in site.data.docs_cards -%}
  {% capture index0Modulo3 %}{{ forloop.index0 | modulo:3 }}{% endcapture %}
  {% capture indexModulo3 %}{{ forloop.index | modulo:3 }}{% endcapture %}
  {% if index0Modulo3 == '0' %}
  <div class="card-deck mb-4">
  {% endif %}
    <a class="card" href="{{card.url}}">
      <div class="card-body">
        <header class="card-title">{{card.name}}</header>
        <p class="card-text">{{card.description}}</p>
      </div>
    </a>
  {% if indexModulo3 == '0' %}
  </div>
  {% endif %}
{% endfor -%}

<a name="latest-release"></a>

## What's new on this site

## 网站更新

To see changes to the site since our last release,
see [What's new][].

查看最近网站更新的内容，请查阅
[文档网站更新内容归档][What's new]。

## New to Flutter?

## 新接触 Flutter 吗

Once you've gone through [Get started][],
including [Write your first Flutter app][],
here are some next steps.

你可以从 [安装和环境配置][Get Started] 开始，
也可以上手试试看 [第一个 Flutter 应用的开发][Write your first Flutter app]。

### Docs

### 文档

Coming from another platform? Check out Flutter for:
[Android][], [iOS][], [Web][], [React Native][] and
[Xamarin.Forms][] developers.

看我们为各种已经有相关平台开发经验的开发者准备的文档：
- [给 Android 开发者的 Flutter 指南][Android]
- [给 iOS 开发者的 Flutter 指南][iOS]
- [给 React Native 开发者的 Flutter 指南][React Native]
- [给 Web 开发者的 Flutter 指南][Web]
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

[Adding interactivity to your Flutter app][]
<br> Learn how to add a stateful widget to your app.

[为你的 Flutter 应用加入交互体验][Adding interactivity to your Flutter app]
<br> 在 app 里使用有状态的 widget。

[A tour of the Flutter widget framework][]
<br> Learn more about Flutter's react-style framework.

[Widgets 介绍][A tour of the Flutter widget framework]
<br> 学习 Flutter 响应式框架的核心。

[FAQ][]
<br> Get the answers to frequently asked questions.

[常见问题][FAQ]
<br> 常见问题解答

### Videos

### 视频资源

We also have some helpful videos on our [Flutter YouTube channel][]!
In particular, check out the [Flutter in Focus series][],
and learn about other series on our [videos][] page.

我们在 YouTube 上有一个 [视频频道][Flutter YouTube channel]，欢迎订阅！
更多视频和播放列表介绍，以及社区制作的视频教程，
可以查看我们的 [Flutter 技术视频资源][videos] 页面。
同时，你可以关注 [“Google中国”的哔哩哔哩账号](https://space.bilibili.com/64169458)
了解更多更全面的谷歌技术中文内容，
也可以关注 [“Flutter 社区”的哔哩哔哩账号](https://space.bilibili.com/344928717)
了解更多来自社区的内容更新。

Check out the Introducing Flutter series. Learn Flutter basics like [how do I make my first Flutter app?][] In Flutter, "everything is a widget"! Learn more about `Stateless` and `Stateful` widgets in [What is State?][]

请查看下述 Flutter 入门系列视频，通过 [构建第一个 Flutter 应用][] 学习 Flutter 基础内容，Flutter 里 “所有的事物都是 widget”，如果你想更好了解有状态 `Stateful` 和无状态 `Stateless` 的 widget，查看视频 [什么是状态][]？

<div class="card-deck card-deck--responsive">
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="//player.bilibili.com/player.html?aid=557525809&bvid=BV1Se4y1Z74p&cid=818071255&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="//player.bilibili.com/player.html?aid=815087524&bvid=BV14G4y167Tu&cid=818431224&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
</div>

[How do I make my first Flutter app?]: {{site.youtube-site}}/watch?v=xWV71C2kp38
[What is State?]: {{site.youtube-site}}/watch?v=QlwiL_yLh6E
[构建第一个 Flutter 应用]: https://www.bilibili.com/video/BV1Se4y1Z74p
[什么是状态]: https://www.bilibili.com/video/BV14G4y167Tu



<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <h4>Only have 60 seconds? Learn how to build and deploy a Flutter App!</h4>

  <iframe style="max-width: 100%" width="560" height="315" src="{{site.youtube-site}}/embed/ZnufaryH43s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Want to skill up?

## 提升内容

If you learn best by watching engineers write code,
make mistakes, and fix them,
check out the [Boring Flutter Show][] video series:

如果你想看工程师们在线写代码、写 bug、修 bug，请关注
[Boring Flutter Show 系列视频][Boring Flutter Show]。

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55815727&cid=97573460&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[Boring Flutter Show 系列视频][Boring Flutter Show]

{% comment %}
Dive deeper into how Flutter works under the hood! Learn [why you write standalone widgets instead of using helper methods][] or [what is “BuildContext” and how is it used][]?

<div class="card-deck card-deck--responsive">
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/IOyq-eTRhvo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/rIaaH87z1-g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
</div>

[why you write standalone widgets instead of using helper methods]: {{site.youtube-site}}/IOyq-eTRhvo
[what is “BuildContext” and how is it used]: {{site.youtube-site}}/rIaaH87z1-g

To learn about all of the Flutter video series, see our [videos][] page.

We release new videos every week on the Flutter YouTube channel.

<a class="btn btn-primary" target="_blank" href="https://www.youtube.com/c/flutterdev">Explore more Flutter videos</a>

#TODO: 这一部分内容提及的视频尚未上传 Bilibili，上传之后再做替换。
{% endcomment %}



You might also find these docs useful:

下列文档可能也会对你有所帮助：

* [Using packages][]

  [在 Flutter 里使用 Packages][Using packages]

* [Adding assets and images][]

  [添加资源和图片][Adding assets and images]

* [Navigation and routing][]

  [路由和导航][Navigation and routing]

* [State management][]

  [状态 (State) 管理介绍][State management]

* [Animations][]

  [动画效果介绍][Animations]

The documentation on this site reflects the latest stable release of Flutter.

本网站的文档基于 Flutter 最新的稳定版。

[A tour of the Flutter widget framework]: {{site.url}}/development/ui/widgets-intro
[Adding assets and images]: {{site.url}}/development/ui/assets-and-images
[Adding interactivity to your Flutter app]: {{site.url}}/development/ui/interactive
[Android]: {{site.url}}/get-started/flutter-for/android-devs
[Animations]: {{site.url}}/development/ui/animations
[Boring Flutter Show]: {{site.youtube-site}}/watch?v=vqPG1tU6-c0&list=PLjxrf2q8roU28W3pXbISJbVA5REsA41Sx&index=3&t=9s
[Boring Flutter Show playlist]: {{site.youtube-site}}/watch?v=vqPG1tU6-c0&list=PLjxrf2q8roU28W3pXbISJbVA5REsA41Sx&index=3&t=9s
[Building layouts]: {{site.url}}/development/ui/layout
[FAQ]: {{site.url}}/resources/faq
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[Flutter in Focus]: {{site.youtube-site}}/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2
[Flutter in Focus series]: {{site.youtube-site}}/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2
[Flutter YouTube channel]: {{site.social.youtube}}
[Get started]: {{site.url}}/get-started/install
[iOS]: {{site.url}}/get-started/flutter-for/ios-devs
[Navigation and routing]: {{site.url}}/development/ui/navigation
[React Native]: {{site.url}}/get-started/flutter-for/react-native-devs
[State management]: {{site.url}}/development/data-and-backend/state-mgmt/intro
[Understanding constraints]: {{site.url}}/development/ui/layout/constraints
[Using packages]: {{site.url}}/development/packages-and-plugins/using-packages
[videos]: {{site.url}}/resources/videos
[Web]: {{site.url}}/get-started/flutter-for/web-devs
[What's new]: {{site.url}}/whats-new
[Write your first Flutter app]: {{site.url}}/get-started/codelab
[Xamarin.Forms]: {{site.url}}/get-started/flutter-for/xamarin-forms-devs
