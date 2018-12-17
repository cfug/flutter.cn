# 翻译指南

## 参见样本

[src/docs/resources/faq.md](/src/docs/resources/faq.md)

## 翻译语法

### 页面元数据

直接把中文放在原文下方即可：

```
title: Flutter - Beautiful native apps in record time
title: Flutter - 绝妙原生应用
```

### markdown 标题、段落等

直接把中文放在原文下方即可：

```
## english

## 中文

english

中文
```

### markdown 列表（`-`、`*`、`1. ` 等）

中文要换行并且缩进要与文字部分对齐

```
- one

  一
  
- two

  二
  
- three

  三

```

注意：不要省略中间和末尾的空行。

### markdown 表头/其它内容

对原有内容套上 <t> 标签，如：

```
<t>one</t><t>一</t> | <t>two</t><t>二</t> | <t>three</t><t>三</t>
----|----|----
four | five | six

```

### markdown 表体

在紧下一行书写中文（可任意添加空格进行对齐），如：

```
<t>one</t><t>一</t> | <t>two</t><t>二</t> | <t>three</t><t>三</t>
----|----|----
four | five | six
四    | 五   | 六

```

## HTML 内容 - 容器型块元素

对于内嵌在 md 中的 html 内容，需要特殊处理

### `h\d|p|header`

可以直接在下方放中文，如：

```
<p>
english
</p>

<p>
中文
</p>

```

内容不限

### `div`

可以直接在下方放中文，但只支持单行，如：

```
<div>english</div>

<div>中文</div>

```

但不支持：

```
<div>
english
</div>

<div>
中文
</div>

```

### `span|a`

可以直接在紧后方放中文，如：

```
<span>english</span><span>中文</span>
```
中间换行也可以。但尽量不要用这种方式，而是优先使用整段翻译的方式。

## 发布

翻译完内容之后：

1. 先按照 <https://github.com/flutter/website> 中的指示建立起原文编译环境
1. （有权限的人）运行 `tool/translator/deploy-cn.sh` 将其推送到 github pages 进行发布

## 额外注意

因为构架脚本使用了 Bundle ，需要确保在在本机上安装了 Ruby 与 Bundle，推荐使用 [RVM](https://ruby-china.org/wiki/rvm-guide) 新建一个虚拟环境做隔离

## 同步更新

用 WebStorm/IntelliJ 的 git 合并功能合并远程更新并处理合并冲突即可。
