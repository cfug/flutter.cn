---
title: Choose your first type of app
title: 选择你的应用类型
description: Configure your system to develop Flutter on Windows.
description: 配置你的 Windows 系统环境，以便开发 Flutter。
short-title: Windows
target-list: [Desktop, Mobile, Web]
js: [{url: '/assets/js/temp/windows-install-redirector.js'}]
---

{% assign os = 'windows' -%}
{% assign recommend = 'Mobile' %}
{% capture rec-target -%}
[{{recommend}}]({{site.url}}/get-started/install/{{os | downcase}}/{{recommend | downcase}})
{%- endcapture %}

<div class="card-deck mb-8">
{% for target in page.target-list %}
  <a class="card" id="install-{{os | remove: ' ' | downcase}}" href="{{site.url}}/get-started/install/{{os | remove: ' ' | downcase}}/{{target | downcase}}">
    <div class="card-body">
      <header class="card-title text-center m-0">
        <span class="d-block h1">
          {% assign icon = target | downcase -%}
          {% if icon == 'desktop' -%}
            <span class="material-symbols">desktop_windows</span>
          {% elsif icon == 'mobile' -%}
            <span class="material-symbols">phone_android</span>
          {% else -%}
            <span class="material-symbols">open_in_browser</span>
          {% endif -%}
        </span>
        <span class="text-muted text-nowrap">{{target}}</span>
        {% if icon == 'mobile' -%}
          <div class="card-subtitle">推荐</div>
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
