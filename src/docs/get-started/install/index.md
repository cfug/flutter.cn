---
title: Install
title: 安装和环境配置
description: How to set up your code editor.
description: 如何设置你的代码编辑器。
next:
  title: Set up an editor
  title: 编辑工具设定
  path: /docs/get-started/editor
---

Select the operating system on which you are installing Flutter:

你想把 Flutter 安装在哪个操作系统呢？

{{site.alert.note}}

  **Are you on Chrome OS?**
  
  **你在使用 Chrome OS 吗**

  If so, see the official [Chrome OS Flutter installation docs][]
  
  Chrome OS 用户可以参考本文档 [在 Chrome OS 上安装和配置 Flutter 开发环境][Chrome OS Flutter installation docs]
  
{{site.alert.end}}

<div class="card-deck mb-8">
{% for os in site.os-list %}
  <a class="card" href="/docs/get-started/install/{{os | downcase}}">
    <div class="card-body">
      <header class="card-title text-center m-0">
        {{os}}
        <i class="fab fa-{{os | downcase}}"></i>
      </header>
    </div>
  </a>
{% endfor %}
</div>

{{site.alert.important}}

  If you're in China, first read [Using Flutter in China][].
  
  如果你在中国的网络环境下使用 Flutter，请先看一下 [这篇文章][Using Flutter in China]，查看是否需要对网络环境进行特别设置。

{{site.alert.end}}

[Chrome OS Flutter installation docs]: /docs/get-started/install/chromeos
[Using Flutter in China]: /community/china
