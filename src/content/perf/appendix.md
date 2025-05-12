## What is performance?

## 什么是性能？

Performance is a set of quantifiable properties of a performer.

性能是执行者的一组可量化的属性。

In this context, performance isn't the execution of an action itself;
it's how well something or someone performs. Therefore, we use the adjective
 _performant_.

在此上下文中，性能不是指执行动作本身，而是指某事物或某人执行的*好坏*程度。
因此，我们使用形容词“_performant_”（高性能的）。

While the _how well_ part can, in general, be described in natural languages,
in our limited scope, the focus is on something that is quantifiable as a real
number. Real numbers include integers and 0/1 binaries as special cases.
Natural language descriptions are still very important. For example, a news
article that heavily criticizes Flutter's performance by just using words
without any numbers (a quantifiable value) could still be meaningful, and it
could have great impacts. The limited scope is chosen only because of our
limited resources.

虽然“_好坏_”程度通常可以用自然语言来描述，但在我们有限的范围内，重点是可以用实数来量化的东西。
实数包括整数和 0/1 二进制数作为特殊情况。自然语言描述仍然非常重要。
例如，一篇新闻文章如果只是用文字而没有任何数字（可量化的值）来强烈批评 Flutter 的性能，
仍然可能是有意义的，并且可能产生巨大的影响。选择有限的范围仅仅是因为我们有限的资源。

The required quantity to describe performance is often referred to as a
metric.

描述性能所需的量通常被称为指标。

To navigate through countless performance issues and metrics, you can categorize
based on performers.

为了应对无数的性能问题和指标，你可以根据执行者进行分类。

For example, most of the content on this website is about the Flutter app
performance, where the performer is a Flutter app. Infra performance is also
important to Flutter, where the performers are build bots and CI task runners:
they heavily affect how fast Flutter can incorporate code changes, to improve
the app's performance.

例如，本网站上的大部分内容都是关于 Flutter 应用程序的性能，其中执行者是 Flutter 应用程序。
基础设施性能对于 Flutter 也很重要，其中的执行者是构建机器人和 CI 任务运行器：
它们极大地影响了 Flutter 整合代码更改以提高应用程序性能的速度。

Here, the scope was intentionally broadened to include performance issues other
than just app performance issues because they can share many tools regardless of
who the performers are. For example, Flutter app performance and infra
performance might share the same dashboard and similar alert mechanisms.

在这里，范围被有意扩大，以包括除了应用程序性能问题之外的性能问题，
因为无论执行者是谁，它们都可以共享许多工具。
例如，Flutter 应用程序性能和基础设施性能可能共享相同的仪表板和类似的警报机制。

Broadening the scope also allows performers to be included that traditionally
are easy to ignore. Document performance is such an example. The performer
could be an API doc of the SDK, and a metric could be: the percentage of readers
who find the API doc useful.

扩大范围还允许包括传统上容易被忽略的执行者。文档性能就是一个例子。
执行者可以是 SDK 的 API 文档，指标可以是：发现 API 文档有用的读者百分比。

## Why is performance important?

## 为什么性能很重要？

Answering this question is not only crucial for validating the work in
performance, but also for guiding the performance work in order to be more
useful. The answer to "why is performance important?" often is also the answer
to "how is performance useful?"

回答这个问题不仅对于验证性能方面的工作至关重要，而且对于指导性能工作以使其更有用也至关重要。
“为什么性能很重要？”的答案通常也是“性能如何有用？”的答案。

Simply speaking, performance is important and useful because, in the scope,
performance must have quantifiable properties or metrics. This implies:
1. A performance report is easy to consume.
2. Performance has little ambiguity.
3. Performance is comparable and convertible.
4. Performance is fair.

简单来说，性能之所以重要和有用，是因为在这个范围内，性能必须具有可量化的属性或指标。
这意味着：
1. 性能报告易于理解。
2. 性能几乎没有歧义。
3. 性能是可比较和可转换的。
4. 性能是公平的。

Not that non-performance, or non-measurable issues or descriptions are not
important. They're meant to highlight the scenarios where performance can be
more useful.

并不是说非性能或不可衡量的问题或描述不重要。
它们旨在突出性能可以更有用的场景。

### 1. A performance report is easy to consume

### 1. 性能报告易于理解

Performance metrics are numbers. Reading a number is much easier than reading a
passage. For example, it probably takes an engineer 1 second to consume the
performance rating as a number from 1 to 5. It probably takes the same engineer
at least 1 minute to read the full, 500-word feedback summary.

性能指标是数字。阅读数字比阅读段落容易得多。
例如，工程师可能需要 1 秒钟才能将性能评级理解为 1 到 5 之间的数字。
同一位工程师可能至少需要 1 分钟才能阅读完整的 500 字反馈摘要。

If there are many numbers, it's easy to summarize or visualize them for quick
consumption. For example, you can quickly consume millions of numbers by
looking at its histogram, average, quantiles, and so on. If a metric has a
history of thousands of data points, then you can easily plot a timeline to
read its trend.

如果有许多数字，很容易总结或可视化它们以供快速理解。
例如，你可以通过查看数百万个数字的直方图、平均值、分位数等来快速理解它们。
如果一个指标有数千个数据点的历史记录，那么你可以轻松地绘制时间线来读取其趋势。

On the other hand, having _n_ number of 500-word texts almost guarantees an
_n_-time cost to consume those texts. It would be a daunting task to analyze
thousands of historical descriptions, each having 500 words.

另一方面，拥有 _n_ 个 500 字的文本几乎保证了理解这些文本的 _n_ 倍成本。
分析数千个历史描述（每个描述都有 500 个单词）将是一项艰巨的任务。

### 2. Performance has little ambiguity

### 2. 性能几乎没有歧义

Another advantage of having performance as a set of numbers is its unambiguity.
When you want an animation to have a performance of 20 ms per frame or
50 fps, there's little room for different interpretations about the numbers. On
the other hand, to describe the same animation in words, someone might call it
good, while someone else might complain that it's bad. Similarly, the same
word or phrase could be interpreted differently by different people. You might
interpret an OK frame rate to be 60 fps, while someone else might interpret it
to be 30 fps.

将性能作为一组数字的另一个优点是其明确性。
当你希望动画的性能为每帧 20 毫秒或 50 fps 时，对于这些数字几乎没有不同的解释空间。
另一方面，要用文字描述相同的动画，有人可能会称其为好，而另一些人可能会抱怨它不好。
类似地，同一个人或短语可能会被不同的人以不同的方式解释。
你可能会将可以接受的帧速率解释为 60 fps，而其他人可能会将其解释为 30 fps。

Numbers can still be noisy. For example, the measured time per frame might
be a true computation time of this frame, plus a random amount of time (noise)
that CPU/GPU spends on some unrelated work. Hence, the metric fluctuates.
Nevertheless, there's no ambiguity of what the number means. And, there are
also rigorous theory and testing tools to handle such noise. For example, you
could take multiple measurements to estimate the distribution of a random
variable, or you could take the average of many measurements to eliminate the
noise by [the law of large numbers][1].

数字仍然可能存在噪声。例如，每帧的测量时间可能是该帧的真实计算时间，
加上 CPU/GPU 花费在一些不相关工作上的随机时间量（噪声）。因此，指标会波动。
然而，数字的含义并没有歧义。并且，还有严格的理论和测试工具来处理这种噪声。
例如，你可以进行多次测量以估计随机变量的分布，或者你可以取多次测量的平均值以通过
[大数定律][1]消除噪声。

### 3. Performance is comparable and convertible

### 3. 性能是可比较和可转换的

Performance numbers not only have unambiguous meanings, but they also have
unambiguous comparisons. For example, there's no doubt that 5 is greater than 4.
On the other hand, it might be subjective to figure out whether excellent is
better or worse than superb. Similarly, could you figure out whether epic is
better than legendary? Actually, the phrase _strongly exceeds expectations_
could be better than _superb_ in someone's interpretation. It only becomes
unambiguous and comparable after a definition that maps strongly exceeds
expectations to 4 and superb to 5.

性能数字不仅具有明确的含义，而且还具有明确的比较。例如，毫无疑问 5 大于 4。
另一方面，弄清楚优秀是否优于卓越可能是主观的。
类似地，你能弄清楚史诗是否优于传奇吗？
实际上，短语“_强烈超出预期_”在某些人的解释中可能比“_卓越_”更好。
只有在定义将强烈超出预期映射到 4 并将卓越映射到 5 之后，它才会变得明确且可比较。

Numbers are also easily convertible using formulas and functions. For example,
60 fps can be converted to 16.67 ms per frame. A frame's rendering
time _x_ (ms) can be converted to a binary indicator
`isSmooth = [x <= 16] = (x <= 16 ? 1 :0)`. Such conversion can be compounded or
chained, so you can get a large variety of quantities using a single
measurement without any added noise or ambiguity. The converted quantity can
then be used for further comparisons and consumption. Such conversions are
almost impossible if you're dealing with natural languages.

数字也可以使用公式和函数轻松转换。例如，60 fps 可以转换为每帧 16.67 毫秒。
帧的渲染时间 _x_（毫秒）可以转换为二进制指标 `isSmooth = [x <= 16] = (x <= 16 ? 1 :0)`。
这种转换可以被复合或链接，因此你可以使用单个测量获得各种各样的量，而不会增加任何噪声或歧义。
然后可以将转换后的量用于进一步的比较和理解。如果你处理的是自然语言，这种转换几乎是不可能的。

### 4. Performance is fair

### 4. 性能是公平的

If issues rely on verbose words to be discovered, then an unfair advantage is
given to people who are more verbose (more willing to chat or write) or those
who are closer to the development team, who have a larger bandwidth and lower
cost for chatting or face-to-face meetings.

如果问题的发现依赖于冗长的文字，那么那些更健谈（更愿意聊天或写作）或那些更接近开发团队的人，
他们拥有更大的带宽和更低的聊天或面对面会议成本，就会获得不公平的优势。

By having the same metrics to detect problems no matter how far away or how
silent the users are, we can treat all issues fairly. That, in turn,
allows us to focus on the right issues that have greater impact.

通过使用相同的指标来检测问题，无论用户距离有多远或有多沉默，我们都可以公平地对待所有问题。
反过来，这使我们能够专注于具有更大影响的正确问题。

### How to make performance useful

### 如何使性能有用

The following summarizes the 4 points discussed here, from a slightly different
perspective:
1. Make performance metrics easy to consume. Do not overwhelm the readers with a
   lot of numbers (or words). If there are many numbers, then try to summarize
   them into a smaller set of numbers (for example, summarize many numbers into
   a single average number). Only notify readers when the numbers change
   significantly (for example, automatic alerts on spikes or regressions).

以下从略有不同的角度总结了此处讨论的 4 点：
1. 使性能指标易于理解。不要用大量的数字（或文字）淹没读者。
   如果有许多数字，则尝试将它们总结为较小的数字集（例如，将许多数字总结为单个平均数）。
   仅当数字发生显着变化时才通知读者（例如，自动警报在峰值或回归时）。

2. Make performance metrics as unambiguous as possible. Define the unit that the
   number is using. Precisely describe how the number is measured. Make the
   number easily reproducible. When there's a lot of noise, try to show the full
   distribution, or eliminate the noise as much as possible by aggregating many
   noisy measurements.

2. 使性能指标尽可能明确。定义数字使用的单位。精确描述数字的测量方式。
   使数字易于重现。当存在大量噪声时，尝试显示完整分布，或通过聚合许多嘈杂的测量值来尽可能消除噪声。

3. Make it easy to compare performance. For example, provide a timeline to
   compare the current version with the old version. Provide ways and tools to
   convert one metric to another. For example, if we can convert both memory
   increase and fps drops into the number of users dropped or revenue lost in
   dollars, then we can compare them and make an informed trade-off.

3. 使比较性能变得容易。例如，提供时间线以比较当前版本与旧版本。
   提供将一个指标转换为另一个指标的方法和工具。
   例如，如果我们可以将内存增加和 fps 下降都转换为用户数量下降或以美元计的收入损失，
   那么我们可以比较它们并做出明智的权衡。

4. Make performance metrics monitor a population that is as wide as possible,
   so no one is left behind.

4. 使性能指标监控尽可能广泛的人群，这样就不会落下任何人。

[1]: https://en.wikipedia.org/wiki/Law_of_large_numbers