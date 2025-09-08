---
# title: Choose your development platform to get started
title: 选择你的开发平台，开始使用
# short-title: Install
short-title: 安装和环境配置
# description: >-
#   Install Flutter and get started developing!
#   Downloads available for Windows, macOS, Linux, and ChromeOS operating systems.
description: Flutter 安装和上手起步教程, 下载 Windows、macOS、Linux 和 ChromeOS 系统的 Flutter SDK。
tags: Flutter安装,Flutter环境搭建
keywords: Flutter Windows,Flutter Linux,Flutter macOS,Flutter镜像,Flutter使用教程
os-list: [Windows, macOS, Linux, ChromeOS]
js: [{url: '/assets/js/page/install-current.js'}]
---

<div class="card-grid narrow">
{% for os in os-list %}
  <a class="card outlined-card install-card" id="install-{{os | remove: ' ' | downcase}}" href="/get-started/install/{{os | remove: ' ' | downcase}}" aria-label="{{os}} setup instructions">
    <div class="card-leading">
      <img src="/assets/images/docs/brand-svg/{{os | downcase}}.svg" width="72" height="72" aria-hidden="true" alt="{{os}} logo">
    </div>
    <div class="card-header text-center">
      <span class="card-title">{{os}}</span>
    </div>
  </a>
{% endfor %}
</div>

:::tip 考虑使用 VS Code 吗？
<!-- Planning to use VS Code? -->

Are you planning to use VS Code to develop Flutter apps?

你是否考虑使用 VS Code 开发 Flutter 应用？

Try out the streamlined getting-started experience
outlined in [Set up and test drive Flutter][]!

尝试 [配置并试用 Flutter][Set up and test drive Flutter] 中
描述的精简版入门体验！

[Set up and test drive Flutter]: /get-started/quick

:::

{% render docs/china-notice.md %}
