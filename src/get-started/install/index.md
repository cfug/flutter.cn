---
title: Install
title: 安装和环境配置
description: Install Flutter and get started. Downloads available for Windows, macOS, Linux, and Chrome OS operating systems.
description: Flutter安装和上手起步教程, 下载 Windows、macOS、Linux 和 Chrome OS 系统的 Flutter SDK。
tags: Flutter安装,Flutter环境搭建
keywords: Flutter Windows,Flutter Linux,Flutter macOS,Flutter镜像,Flutter使用教程
next:
  title: Set up an editor
  title: 编辑工具设定
  path: {{site.url}}/get-started/editor
os-list: [Windows, macOS, Linux, "Chrome OS"]
---

Select the operating system on which you are installing Flutter:

你想把 Flutter 安装在哪个操作系统呢？

<div class="card-deck mb-8">
{% for os in page.os-list %}
  <a class="card" id="install-{{os | remove: ' ' | downcase}}" href="/docs/get-started/install/{{os | remove: ' ' | downcase}}">
    <div class="card-body">
      <header class="card-title text-center m-0">
        <span class="d-block h1">
          {% assign icon = os | downcase %}
          {% if icon == 'macos' %}
            <i class="fab fa-apple"></i>
          {% else %}
            <i class="fab fa-{{icon}}"></i>
          {% endif %}
        </span>
        <span class="text-muted text-nowrap">{{os}}</span>
      </header>
    </div>
  </a>
{% endfor %}
</div>

{{site.alert.important}}

  If you're in China, first read [Using Flutter in China][].
  
  如果你在中国的网络环境下使用 Flutter，请先看一下
  [这篇文章][Using Flutter in China]，查看是否需要对网络环境进行特别设置。
{{site.alert.end}}

[Using Flutter in China]: {{site.url}}/community/china
