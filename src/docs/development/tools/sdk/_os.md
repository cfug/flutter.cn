{% assign id =  include.os | downcase -%}
{% assign channels =  'stable beta dev' | split: ' ' -%}

<div id="{{id}}" class="tab-pane
  {%- if id == 'windows' %} active {% endif %}"
  role="tabpanel" aria-labelledby="{{id}}-tab" markdown="1">

{% for channel in channels -%}
## {{channel | capitalize }} channel ({{include.os}})

Select from the following scrollable list:

请从下列列表中选择：

<div class="scrollable-table">
  <table id="downloads-{{id}}-{{channel}}" class="table table-striped">
  <thead><tr><th>版本</th><th>Ref</th><th class="date">发布日期</th></tr></thead>
  <tr class="loading"><td colspan="3">Loading...</td></tr>
  </table>
</div>
{% endfor -%}

</div>
