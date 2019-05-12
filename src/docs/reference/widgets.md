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

这里展示了一个以字母顺序排列的几乎是所以有 Flutter 的 Widget 的列表。你还可以 [按目录顺序查看][catalog]

You might also want to check out our Widget of the Week video series
on the [Flutter YouTube channel]({{site.social.youtube}}). Each short
episode features a different Flutter widget. For more video series, see
our [videos](/docs/resources/videos) page.

你可能还想看我们每周在 [Youtube Flutter 频道]发布的关于 Widget 的系列视频。每一个短视频介绍
一个不同的 Flutter Widget。关于更多的系列视频，你可以查看我们的 [视频页面](/docs/resources/videos)。



<iframe width="560" height="315" src="https://www.youtube.com/embed/b_sQ9bMltGU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[Widget of the Week playlist](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

[每周 Widget 视频播放清单](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

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
