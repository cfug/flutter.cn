{% assign os=include.os %}
{% assign target = include.target %}
{% assign terminal=include.terminal %}
{% case target %}
{% when 'mobile-ios' %}
   {% assign v-target = 'iOS' %}
{% when 'mobile-android','mobile' %}
   {% assign v-target = 'Android' %}
{% else %}
   {% assign v-target = target %}
{% endcase %}

## Install the Flutter SDK

## 安装 Flutter SDK

To install the Flutter SDK, you can use the VS Code Flutter extension
or download and install the Flutter bundle yourself.

你可以使用 VS Code Flutter 扩展或自行下载安装 Flutter 压缩包，
来安装 Flutter SDK。

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="flutter-install" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="vscode-tab" href="#vscode" role="tab" aria-controls="vscode" aria-selected="true">使用 VS Code 安装</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="download-tab" href="#download" role="tab" aria-controls="download" aria-selected="false">自行下载安装</a>
    </li>
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">

<div class="tab-pane active" id="vscode" role="tabpanel" aria-labelledby="vscode-tab">

{% include docs/install/flutter/vscode.md os=os terminal=terminal target=v-target %}

</div>

<div class="tab-pane" id="download" role="tabpanel" aria-labelledby="download-tab">

{% include docs/install/flutter/download.md os=os terminal=terminal target=v-target%}

</div>
</div>

{% comment %} End: Tab panes. {% endcomment -%}
