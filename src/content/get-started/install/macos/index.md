---
# title: Choose your first type of app
titl: 选择你的应用类型
# description: Configure your system to develop Flutter on macOS.
description: 配置你的 macOS 系统环境，以便开发 Flutter。
short-title: macOS
target-list: [iOS, Android, Web, Desktop]
js: [{url: '/assets/js/temp/macos-install-redirector.js'}]
---

{% assign os = 'macos' -%}
{% assign recommend = 'iOS' %}
{% capture rec-target -%}
[{{recommend | strip}}](/get-started/install/{{os | downcase}}/mobile-{{recommend | downcase}})
{%- endcapture %}

<div class="card-grid narrow">
{% for target in target-list %}
  {% case target %}
  {% when "iOS", "Android" %}
  {% assign targetlink = target | downcase | prepend: 'mobile-' %}
  {% else %}
  {% assign targetlink = target | downcase %}
  {% endcase %}

  <a class="card outlined-card install-card card-macos" id="install-{{os | downcase}}" href="/get-started/install/{{os | downcase}}/{{targetlink}}">
    {% assign icon = target | downcase -%}
    <div class="card-leading">
      {% case icon %}
      {% when 'desktop' -%}
        <span class="material-symbols" aria-hidden="true">laptop_mac</span>
      {% when 'ios' -%}
        <span class="material-symbols" aria-hidden="true">phone_iphone</span>
      {% when 'android' -%}
        <span class="material-symbols" aria-hidden="true">phone_android</span>
      {% when 'web' -%}
        <span class="material-symbols" aria-hidden="true">web</span>
      {% endcase -%}
    </div>
    <div class="card-header text-center">
      <header class="card-title">{{target}}</header>
      {% if icon == 'ios' -%}
        <span class="card-subtitle"><t>Recommended</t><t>推荐</t></span>
      {% endif -%}
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
