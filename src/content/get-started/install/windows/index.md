---
# title: Choose your first type of app
title: 选择你的应用类型
# description: Configure your system to develop Flutter on Windows.
description: 配置你的 Windows 系统环境，以便开发 Flutter。
short-title: Windows
target-list: [Desktop, Android, Web]
js: [{url: '/assets/js/temp/windows-install-redirector.js'}]
---

{% assign os = 'windows' -%}
{% assign recommend = 'Android' %}
{% capture rec-target -%}
[{{recommend}}](/get-started/install/{{os | downcase}}/mobile)
{%- endcapture %}

<div class="card-deck mb-8">
{% for target in target-list %}
  {% case target %}
  {% when "Android" %}
  {% assign targetlink = target | downcase | replace: 'android', 'mobile' %}
  {% else %}
  {% assign targetlink = target | downcase %}
  {% endcase %}
  <a class="card card-app-type card-windows" id="install-{{os | downcase}}" href="/get-started/install/{{os | downcase}}/{{targetlink}}">
    <div class="card-body">
      <header class="card-title text-center m-0">
        <span class="d-block h1">
          {% assign icon = target | downcase -%}
          {% case icon %}
          {% when 'desktop' -%}
            <span class="material-symbols">desktop_windows</span>
          {% when 'android' -%}
            <span class="material-symbols">phone_android</span>
          {% when 'web' -%}
            <span class="material-symbols">web</span>
          {% endcase -%}
        </span>
        <span class="text-muted text-nowrap">{{target}}</span>
        {% if icon == 'android' -%}
          <div class="card-subtitle"><t>Recommended</t><t>推荐</t></div>
        {% endif -%}
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

{% render docs/china-notice.md %}
