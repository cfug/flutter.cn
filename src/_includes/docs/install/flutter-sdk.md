{% case include.target %}
{% when 'mobile-ios' %}
   {% assign v-target = 'iOS' %}
{% when 'mobile-android','mobile' %}
   {% assign v-target = 'Android' %}
{% else %}
   {% assign v-target = include.target %}
{% endcase %}

## Install the Flutter SDK

## 安装 Flutter SDK

To install the Flutter SDK, you can use the VS Code Flutter extension
or download and install the Flutter bundle yourself.

你可以使用 VS Code Flutter 扩展或自行下载安装 Flutter 压缩包，
来安装 Flutter SDK。

{% tabs "vs-code-or-download" %}
{% tab "使用 VS Code 安装" %}

{% include docs/install/flutter/vscode.md os=include.os terminal=include.terminal target=v-target %}

{% endtab %}
{% tab "自行下载安装" %}

{% include docs/install/flutter/download.md os=include.os terminal=include.terminal target=v-target %}

{% endtab %}
{% endtabs %}
