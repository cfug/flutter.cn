{% assign id =  include.os | downcase -%}
{% assign channels =  'stable beta' | split: ' ' -%}

{% for channel in channels -%}

## {{channel | capitalize }} channel ({{include.os}})

Select from the following scrollable list:

请从下列列表中选择：

<div class="scrollable-table">
  <table id="downloads-{{id}}-{{channel}}" class="table table-striped">
  <thead><tr><th>Flutter 版本</th><th>架构</th><th>Ref</th><th class="date">发布日期</th><th>Dart 版本</th><th>出处/来源</th></tr></thead>
  <tr class="loading"><td colspan="6">Loading...</td></tr>
  </table>
</div>

{% endfor -%}
