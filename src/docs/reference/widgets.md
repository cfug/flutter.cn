---
title: Flutter widget index
title: Flutter Widget 目录
short-title: Widgets
short-title: Widget 目录
show_breadcrumbs: false
---

{% assign sorted = site.data.catalog.widgets | sort:'name' -%}

This is an alphabetical list of nearly every widget that is bundled with
Flutter. You can also [browse widgets by category][catalog].

你可以在下方以字母顺序查看各个 Widget 的使用方法，几乎包括了所有与 Flutter 相关的 widget。除此之外你还可以查阅 [核心 Widget 目录][catalog]。

You might also want to check out our Widget of the Week video series
on the [Flutter YouTube channel]({{site.social.youtube}}). Each short
episode features a different Flutter widget. For more video series, see
our [videos](/docs/resources/videos) page.

我们每周都会在 [Youtube Flutter 频道]({{site.social.youtube}}) 发布关于 Widget 的系列视频，你可以前去观看学习。每一个短视频都介绍了
一个不同的 Flutter Widget。关于更多系列视频，也欢迎查看我们的 [学习 Flutter 的视频列表](/docs/resources/videos)。



<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55795672&cid=97539385&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[Widget of the Week playlist](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

[Widget 视频的每周播放列表](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

<div class="card-deck card-deck--responsive">
{% for comp in sorted %}
    <div class="card">
        <a href="{{comp.link}}">
            <div class="card-image-holder">
                {{comp.image}}
            </div>
        </a>
        <div class="card-body">
            <a href="{{comp.link}}"><header class="card-title">{{comp.name}}</header></a>
            <p class="card-text">{{comp.description}}</p>
        </div>
        <div class="card-footer card-footer--transparent">
            <a href="{{comp.link}}">Documentation</a>
        </div>
    </div>
{% endfor %}
</div>

[catalog]: /docs/development/ui/widgets
