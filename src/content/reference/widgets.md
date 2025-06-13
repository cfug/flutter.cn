---
# title: Flutter widget index
title: Flutter Widget 目录
# description: An alphabetical list of Flutter widgets.
description: 按照字母顺序排序的 Flutter widgets 列表。
# short-title: Widgets
short-title: Widget 目录
showBreadcrumbs: false
---

{% assign sorted = catalog.widgets | sort:'name' -%}

This is an alphabetical list of many of the widgets that
are bundled with Flutter.
You can also [browse widgets by category][catalog].

你可以在下方以字母顺序查看各个 Widget 的使用方法，几乎包括了所有与 Flutter 相关的 widget。除此之外你还可以查阅 [核心 Widget 目录][catalog]。

You might also want to check out our Widget of the Week video series
on the [Flutter YouTube channel]({{site.social.youtube}}). Each short
episode features a different Flutter widget. For more video series, see
our [videos](/resources/videos) page.

我们每周都会在 [Youtube Flutter 频道]({{site.social.youtube}})
发布关于 Widget 的系列视频，你可以前去观看学习。
每一个短视频都介绍了一个不同的 Flutter Widget。
关于更多系列视频，也欢迎查看我们的
[学习 Flutter 的视频列表](/resources/videos)。

<iframe width="560" height="315" src="{{site.bili.embed}}?bvid=BV15441157cc&page=1&autoplay=false" title="每周 Flutter Widget 介绍" {{site.bili.set}}></iframe><br>
<p><a href="{{site.bili.video}}/BV15441157cc/" target="_blank" rel="noopener" title="在新标签页打开 '每周 Flutter Widget 介绍' 视频">每周 Flutter Widget 介绍</a></p>

[Widget of the Week playlist]({{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

[每周 Widget 的视频播放列表]({{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

<div class="card-grid">
{% for comp in sorted -%}
  <a class="card outlined-card" href="{{comp.link}}">
    <div class="card-image-holder">
      {% if comp.vector -%}
        {{comp.vector}}
      {% elsif comp.image -%}
        <img alt="Rendered image or visualization of the {{comp.name}} widget." src="{{comp.image.src}}">
      {% else -%}
        <img alt="Flutter logo for widget missing visualization image." src="/assets/images/docs/catalog-widget-placeholder.png" aria-hidden="true">
      {% endif -%}
    </div>
    <div class="card-header">
      <span class="card-title">{{comp.name}}</span>
    </div>
    <div class="card-content">
      <p class="card-text">{{ comp.description | truncatewords: 25 }}</p>
    </div>
  </a>
{% endfor %}
</div>

[catalog]: /ui/widgets
