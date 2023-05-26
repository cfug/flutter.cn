---
title: Widget catalog
title: 核心 Widget 目录
description: A catalog of some of Flutter's rich set of widgets.
description: 一组丰富的 Flutter widget 目录。
short-title: Widgets
short-title: 核心 Widgets
toc: false
---

Create beautiful apps faster with Flutter's collection of visual, structural,
platform, and interactive widgets. In addition to browsing widgets by category,
you can also see all the widgets in the [widget index][].

借助 Flutter 上关于视觉、结构、平台和交互的 widgets，我们可以快速创建出色的应用程序。
除了能够按照如下类别浏览 widgets，你还可以在 [Flutter Widget 目录]({{site.url}}/reference/widgets) 中查看所有的 widgets。

<div class="card-deck card-deck--responsive">
{% assign categories = site.data.catalog.index | sort: 'name' -%}
{% for section in categories %}
    <!-- <div class="card">
        <div class="card-body">
            <a href="{{site.main-url}}{{page.url}}{{section.id}}"><header class="card-title">{{section.name}}</header></a>
            <p class="card-text">{{section.description}}</p>
        </div>
        <div class="card-footer card-footer--transparent">
            <a href="{{site.main-url}}{{page.url}}{{section.id}}">查看</a>
        </div>
    </div> -->
    <!-- Don't display the legacy Material 2 card. It is only accessible via the Material 3 components page. -->
    {% if section.name != "Material 2 Components" %}
        <div class="card">
            <div class="card-body">
                <a href="{{page.url}}{{section.id}}"><header class="card-title">{{section.name}}</header></a>
                <p class="card-text">{{section.description}}</p>
            </div>
            <div class="card-footer card-footer--transparent">
                <a href="{{page.url}}{{section.id}}">查看</a>
            </div>
        </div>
    {% endif -%}
{% endfor %}
</div>

## Widget of the Week

100+ short, 1 minute explainer videos to help you quickly get started with Flutter widgets.

<div class="card-deck card-deck--responsive">
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/1z6YP7YmvwA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/VdkRy3yZiPo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/gYNTcgZVcWw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/-Nny8kzW380" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/y9xchtVTtqQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
    <div class="video-card">
        <div class="card-body">
            <iframe style="max-width: 100%; width: 100%; height: 230px;" src="{{site.youtube-site}}/embed/qjA0JFiPMnQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </div>
    </div>
</div>

<a class="btn btn-primary full-width" target="_blank" href="https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG" >See more Widget of the Weeks</a>

[widget index]: {{site.url}}/reference/widgets
