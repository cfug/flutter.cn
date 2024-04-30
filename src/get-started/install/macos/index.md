---
title: Choose your first type of app
titl: 选择你的应用类型
description: Configure your system to develop Flutter on macOS.
description: 配置你的 macOS 系统环境，以便开发 Flutter。
short-title: macOS
target-list: [Desktop, Mobile-iOS, Mobile-Android, Web]
js: [{url: '/assets/js/temp/macos-install-redirector.js'}]
---

{% assign os = 'macos' -%}
{% assign recommend = 'mobile-iOS' %}
{% capture rec-target -%}
[{{recommend | remove: 'mobile-' | strip}}]({{site.url}}/get-started/install/{{os | remove: ' ' | downcase}}/{{recommend | downcase}})
{%- endcapture %}

<div class="card-deck mb-8">
{% for target in page.target-list %}
  <a class="card" id="install-{{os | remove: ' ' | downcase}}" href="{{site.url}}/get-started/install/{{os | remove: ' ' | downcase}}/{{target | downcase}}">
    <div class="card-body">
      <header class="card-title text-center m-0">
        <span class="d-block h1">
          {% assign icon = target | downcase -%}
          {% if icon == 'desktop' -%}
            <span class="material-symbols">laptop_mac</span>
          {% elsif icon == 'mobile-ios' -%}
            <span class="material-symbols">phone_iphone</span>
          {% elsif icon == 'mobile-android' -%}
            <span class="material-symbols">phone_android</span>
          {% else -%}
            <span class="material-symbols">open_in_browser</span>
          {% endif -%}
        </span>
        <span class="text-muted text-nowrap">
        {% if target == "Desktop" or target == "Web" %}
        {% assign target = "-" | append: target %}
        {% endif -%}
        {% assign mac_target = target | split: "-" | last %}
        {{ mac_target }}
        </span>
        {% if icon == 'mobile-ios' -%}
          <div class="card-subtitle">Recommended</div>
        {% endif %}
      </header>
    </div>
  </a>
{% endfor %}
</div>

Your choice informs which parts of Flutter tooling you configure
to run your first Flutter app.
You can set up additional platforms later.
_If you don't have a preference, choose **{{rec-target}}**._

你的选择会影响你对 Flutter 相关环境以及工具的配置，
以便帮助你运行第一个 Flutter 应用程序。
你可以稍后再设置其他平台。
_如果你没有特别的偏好，推荐你选择 **{{rec-target}}**。_

{% include docs/china-notice.md %}
