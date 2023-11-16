
{% assign id = include.ref-os | downcase -%}
{% assign mainpath = include.filepath -%}
{%- case id %}
{% when 'windows','macos' %}
{%- assign file-format = 'zip' %}
{% else %}
{%- assign file-format = 'tar.xz' %}
{% endcase %}
{%- if id == 'chromeos' %}
{% assign plat = 'linux' %}
{%- else %}
{% assign plat = id %}
{% endif %}
{% capture filepath -%}{{mainpath | replace: "opsys", plat}}{{file-format}} {% endcapture -%}


<div id="{{id}}-dl" class="tab-pane
  {%- if id == 'windows' %} active {% endif %}"
  role="tabpanel" aria-labelledby="{{id}}-dl-tab" markdown="1">

To download the {{include.ref-os}} 3.13 version of the Flutter SDK,
you would change the original URL from:

要下载 {{include.ref-os}} 3.16 版本的 Flutter SDK，
你需要将原始 URL：

```terminal
https://storage.googleapis.com/{{filepath}}
```

to the mirror URL:

改为镜像 URL：

```terminal
https://storage.flutter-io.cn/{{filepath}}
```

</div>
