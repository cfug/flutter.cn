---
# title: Widget catalog
title: 核心 Widget 目录
# description: A catalog of some of Flutter's rich set of widgets.
description: 一组丰富的 Flutter widget 目录。
# short-title: Widgets
short-title: 核心 Widgets
toc: false
---

Create beautiful apps faster with Flutter's collection of visual, structural,
platform, and interactive widgets. In addition to browsing widgets by category,
you can also see all the widgets in the [widget index][].

借助 Flutter 上关于视觉、结构、平台和交互的 widget，我们可以快速创建出色的应用程序。
除了能够按照如下类别浏览 widget，你还可以在 [Flutter Widget 目录][widget index] 中查看所有的 widget。

## Design systems

## 设计系统

Flutter ships with two design systems as part of the SDK.

Flutter SDK 中附带了两套设计系统。
你可以在 Dart 和 Flutter 的 package 资源库 [pub.dev]({{site.pub}}) 上找到
更多由 Flutter 社区创建的设计系统。

<div class="card-grid">
{% assign categories = catalog.index | sort: 'name' -%}
{% for section in categories %}
    {%- if section.name == "Cupertino" or section.name == "Material components" -%}
        <div class="card">
            <div class="card-body">
                <a href="{{page.url}}{{section.id}}"><header class="card-title">{{section.name}}</header></a>
                <p class="card-text">{{section.description}}</p>
            </div>
        </div>
    {% endif -%}
{% endfor %}
</div>

You can find many more designs systems created by the Flutter community
on [pub.dev]({{site.pub}}), the package repository for Dart and Flutter,
like for example the Windows-inspired [fluent_ui]({{site.pub-pkg}}/fluent_ui),
macOS-inspired [macos_ui]({{site.pub-pkg}}/macos_ui),
and the Ubuntu-inspired [yaru]({{site.pub-pkg}}/yaru) widgets.

## Base widgets

## 基础 widget

Base widgets support a range of common rendering options
like input, layout, and text.

基础 widget 支持一系列常用的功能，
如输入、布局和文本。

<div class="card-grid">
{% assign categories = catalog.index | sort: 'name' -%}
{% for section in categories %}
    {%- if section.name != "Cupertino" and section.name != "Material components" and section.name != "Material 2 components" -%}
        <div class="card">
            <div class="card-body">
                <a href="{{page.url}}{{section.id}}"><header class="card-title">{{section.name}}</header></a>
                <p class="card-text">{{section.description}}</p>
            </div>
        </div>
    {% endif -%}
{% endfor %}
</div>

## Widget of the Week

## 每周 Widget (Widget of the Week)

100+ short, 1-minute explainer videos to
help you quickly get started with Flutter widgets.

这里有 100 多部 1 分钟的讲解短片，
帮助你快速入门 Flutter widget。

<div class="card-grid wide">
    <div class="card">
        <div class="card-body">
            {% ytEmbed '1z6YP7YmvwA', 'TextStyle - Flutter widget of the week', true, true %}
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            {% ytEmbed 'VdkRy3yZiPo', 'flutter_rating_bar - Flutter package of the week', true, true %}
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            {% ytEmbed 'gYNTcgZVcWw', 'LinearGradient - Flutter widget of the week', true, true %}
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            {% ytEmbed '-Nny8kzW380', 'AutoComplete - Flutter widget of the week', true, true %}
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            {% ytEmbed 'y9xchtVTtqQ', 'NavigationRail - Flutter widget of the week', true, true %}
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            {% ytEmbed 'qjA0JFiPMnQ', 'mason - Flutter package of the week', true, true %}
        </div>
    </div>
</div>

<a class="btn btn-primary full-width" target="_blank" href="{{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG"><t>Watch more widget of the week videos</t><t>观看更多每周 Widget (Widget of the Week) 视频</t></a>

[widget index]: /reference/widgets
