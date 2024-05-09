---
# title: Choose your development platform to get started
title: 选择你的开发平台，开始使用
# short-title: Install
short-title: 安装和环境配置
# description: Install Flutter and get started. Downloads available for Windows, macOS, Linux, and ChromeOS operating systems.
description: Flutter安装和上手起步教程, 下载 Windows、macOS、Linux 和 ChromeOS 系统的 Flutter SDK。
tags: Flutter安装,Flutter环境搭建
keywords: Flutter Windows,Flutter Linux,Flutter macOS,Flutter镜像,Flutter使用教程
os-list: [Windows, macOS, Linux, ChromeOS]
---

<div class="card-deck mb-8">
{% for os in os-list %}
  <a class="card" id="install-{{os | remove: ' ' | downcase}}" href="/get-started/install/{{os | remove: ' ' | downcase}}">
    <div class="card-body">
      <header class="card-title text-center m-0">
        <span class="d-block h1">
          {% assign icon = os | downcase -%}
            <img src="/assets/images/docs/brand-svg/{{icon}}.svg" width="72" height="72" aria-hidden="true" alt="{{os}} logo"> 
        </span>
        <span class="text-muted text-nowrap">{{os}}</span>
      </header>
    </div>
  </a>
{% endfor %}
</div>

{% include docs/china-notice.md %}
