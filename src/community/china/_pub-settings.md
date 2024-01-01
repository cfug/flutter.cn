
{% assign id =  include.os | downcase -%}

<div id="{{id}}-pub" class="tab-pane
  {%- if id == 'windows' %} active {% endif %}"
  role="tabpanel" aria-labelledby="{{id}}-tab" markdown="1">

1. Configure a proxy.
   To configure a proxy, check out the
   [Dart documentation on proxies]({{site.dart-site}}/tools/pub/troubleshoot#pub-get-fails-from-behind-a-corporate-firewall).

   配置代理。
   要配置代理，请查阅 [Dart 关于代理的文档]({{site.dart-site}}/tools/pub/troubleshoot#pub-get-fails-from-behind-a-corporate-firewall)。

  {% comment %}
  From <https://github.com/flutter/website/issues/2556#issuecomment-481566476>
  {% endcomment %}

1. Verify that your `PUB_HOSTED_URL` environment variable is either unset
   or empty.

   确认 `PUB_HOSTED_URL` 环境变量未设置或为空。

   {% if id == 'windows' -%}

   ```terminal
   {{prompt}} echo $env:PUB_HOSTED_URL
   ```

   If this command returns any value, unset it.

   如果该指令返回任何值，则取消设置。

   ```terminal
   {{prompt}} Remove-Item $env:PUB_HOSTED_URL
   ```

   {% else -%}

   ```terminal
   {{prompt}} echo $PUB_HOSTED_URL
   ```

   如果该指令返回任何值，则取消设置。

   ```terminal
   {{prompt}} unset $PUB_HOSTED_URL
   ```

   {% endif %}

</div>
