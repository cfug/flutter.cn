---
# title: Performance
title: 性能评估
# description: Evaluating the performance of your app from several angles.
description: 从多个角度评估你的应用性能..
tags: Flutter性能
keywords: 性能评估,包体积,内存占用
---

<iframe width="560" height="315" src="{{site.bili.embed}}?aid=243695231&bvid=BV1zv411B7gY&cid=207457008&page=1&autoplay=false" title="了解提高 Flutter 性能的技巧" {{site.bili.set}}></iframe>

[Flutter performance basics]({{site.yt.watch}}?v=PKGguGUwSYE)

[Flutter 性能入门]({{site.bili.video}}/BV1zv411B7gY/)

:::note

If your app has a performance issue and you are
trying to debug it, check out the DevTool's page
on [Using the Performance view][].

如果你的应用程序存在性能问题，并且你正在尝试进行调试，
可以查看 DevTools 的页面 [使用性能视图][Using the Performance view]。

:::

[Using the Performance view]: /tools/devtools/performance

What is performance? Why is performance important? How do I improve performance?

什么是性能？为什么性能很重要？如何才能提升性能？

Our goal is to answer those three questions (mainly the third one), and
anything related to them. This document should serve as the single entry
point or the root node of a tree of resources that addresses any questions
that you have about performance.

我们的目标是回答这三个问题（主要是第三个）以及任何与之相关的话题。
如果你有任何关于性能方面的问题，本文档可以作为解决你疑惑的起点。

The answers to the first two questions are mostly philosophical,
and not as helpful to many developers who visit this page with specific
performance issues that need to be solved.
Therefore, the answers to those
questions are in the [appendix](/perf/appendix).

前两个问题的答案比较哲学，对于正在阅读这篇文章的开发者而言，当他们需要解决特定的性能问题时，并没有什么帮助。
所以，我们将它们放在了 [附录](/perf/appendix)。

To improve performance, you first need metrics: some measurable numbers to
verify the problems and improvements.
In the [metrics](/perf/metrics) page,
you'll see which metrics are currently used,
and which tools and APIs are available to get the metrics.

为了提升性能，首先你需要一些可以量化的指标来验证问题和性能的提升。
在 [指标](/perf/metrics) 页面，你可以看到一些现有的指标，
以及哪些工具和 API 可以用于获取这些指标。

There is a list of [Frequently asked questions](/perf/faq),
so you can find out if the questions you have or the problems you're having
were already answered or encountered, and whether there are existing solutions.
(Alternatively, you can check the Flutter GitHub issue database using the
[performance][performance] label.)
 
这里有一个 [常见问题](/perf/faq) 的列表，
你可以查询你的问题是否出现过或者已经被解答，
以及是否有现成的解决方案。
（你也可以查看 GitHub issues 里含有 [性能][performance] 标签的内容。） 

Finally, the performance issues are divided into four categories. They
correspond to the four labels that are used in the Flutter GitHub issue
database: "[perf: speed][speed]", "[perf: memory][memory]",
"[perf: app size][size]", "[perf: energy][energy]".

最后，性能问题可以分为四类，对应 GitHub issue 里的四个标签：
「[流畅度][speed]」、「[内存][memory]」、「[应用大小][size]」、和 「[功耗][energy]」。

The rest of the content is organized using those four categories.

其它内容均已归纳到这四个类别中。

{% comment %}
Let's put "speed" (rendering) first as it's the most popular performance issue
category.
{% endcomment -%}

## Speed

## 流畅度

Are your animations janky (not smooth)? Learn how to
evaluate and fix rendering issues.

你的动画是否卡顿（不流畅）？学习如何评估和修复渲染问题。

[Improving rendering performance](/perf/rendering-performance)

[提高渲染性能](/perf/rendering-performance)

{% comment %}
Do your apps take a long time to open? We'll also cover the startup speed issue
in some future pages.
{% endcomment -%}

{% comment %}

TODO(<https://github.com/flutter/website/issues/8249>): Reintroduce this article and add this link back.

## Memory

## 内存

[Using memory wisely](/perf/memory)

[正确地管理内存](/perf/memory)

{% endcomment -%}

## App size

## 应用大小

How to measure your app's size. The smaller the size,
the quicker it is to download.

如何测量应用的体积。体积越小，下载就越快。

[Measuring your app's size][]

[测量应用的体积][Measuring your app's size]

{% comment %}

TODO(<https://github.com/flutter/website/issues/8249>): Reintroduce this article and add this link back.

## Energy

## 功耗

How to ensure a longer battery life when running your app.

当运行你的应用程序时，如何确保更久的电池续航。

[Preserving your battery](/perf/power)

[节省电量](/perf/power)

{% endcomment -%}

[Measuring your app's size]: /perf/app-size

[speed]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+speed%22+sort%3Aupdated-asc+
[energy]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+energy%22+sort%3Aupdated-asc+
[memory]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+memory%22+sort%3Aupdated-asc+
[size]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+app+size%22+sort%3Aupdated-asc+
[performance]: {{site.repo.flutter}}/issues?q=+label%3A%22severe%3A+performance%22
