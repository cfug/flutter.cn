---
# title: Flutter learning resources
title: Flutter 学习资源
# description: A catalog of Flutter sample applications, codelabs, and tutorials.
description: Flutter 示例应用、codelab 和教程的目录。
# short-title: Learning resources
short-title: 学习资源
show_breadcrumbs: false
layout: wide
toc: false
js: [ { url: '/assets/js/learning-resources-index.js', defer: true } ]
---

:::secondary
This page lists all of our additional learning resources:

本页列出了我们所有额外的学习资源：

* Cookbook recipes that demonstrate how to solve common problems with Flutter.

  实用教程 (Cookbook)：演示如何使用 Flutter 解决常见问题。

* Guided Codelabs and tutorials that walk you through building features and applications.

  编程练习 (Codelab) 和教程：引导你完成功能和引用的构建。

* Working sample applications that show how to use Flutter.

  Workshop：展示如何使用 Flutter 的示例应用。

* Feature-rich demo applications that show how larger applications are built.

  Demo 应用：展示如何构建功能丰富的大型应用。

:::

{% assign resources = learning-resources-index.codelabs | concat: learning-resources-index.cookbook | concat: learning-resources-index.demos | concat: learning-resources-index.quickstarts_flutter | concat: learning-resources-index.quickstarts_dart -%}

{% assign filters = learning-resources-index.filters -%}

<div id="resource-index-content">
    <div class="left-col" id="resource-index-main-content">
        <div 
            id="resource-search-group" 
            class="chip-filters-group" 
            style="margin-bottom:20px"
        >
            <div class="top-row">
                <div class="search-wrapper" id="resource-search">
                    <span class="material-symbols leading-icon" aria-hidden="true">search</span>
                    <input type="search" placeholder='输入需要搜索的内容，比如 "button" 或 "networking"...'
                        aria-label="Search learning resources by name and category">
                </div>
                {% comment -%}This dropdown is shown on narrow screens{% endcomment -%}
                <button class="show-filters-button">
                    <span class="material-symbols" aria-hidden="true">filter_list</span>
                </button>
            </div>
            <div class="label-row">
                <label for="resource-search">
                    显示 <span id="displayed-resource-card-count">0</span> / <span id="total-resource-card-count">0</span>
                </label>
                <button id="clear-resource-index-filters" disabled>
                    <span class="material-symbols" aria-hidden="true">close_small</span>
                    <span><!-- Clear filters -->清除筛选</span>
                </button>
            </div>
        </div>
        {%- render docs/learning-resources-index/grid.md resources:resources -%}
    </div>
    <div class="right-col">
        {%- render docs/learning-resources-index/side-filters.liquid filters:filters id:"resource-filter-group" -%}
    </div>
</div>
