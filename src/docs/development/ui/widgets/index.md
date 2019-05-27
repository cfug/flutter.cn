---
title: Widget catalog
title: 核心 Widget 目录
short-title: Widgets
short-title: 核心 Widgets
toc: false
---

Create beautiful apps faster with Flutter's collection of visual, structural,
platform, and interactive widgets. In addition to browsing widgets by category,
you can also see all the widgets in the [widget index](/docs/reference/widgets).

借助 Flutter 上关于视觉、结构、平台和交互的 widgets，我们可以快速创建出色的应用程序。除了能够按照如下类别浏览 widgets，你还可以在 [Flutter Widget 目录](/docs/reference/widgets) 中查看所有的 widgets。

<div class="card-deck card-deck--responsive">
{% assign categories = site.data.catalog.index | sort: 'name' -%}
{% for section in categories %}
    <div class="card">
        <div class="card-body">
            <a href="{{page.url}}{{section.id}}"><header class="card-title">{{section.name}}</header></a>
            <p class="card-text">{{section.description}}</p>
        </div>
        <div class="card-footer card-footer--transparent">
            <a href="{{page.url}}{{section.id}}">Visit</a>
        </div>
    </div>
{% endfor %}
</div>
