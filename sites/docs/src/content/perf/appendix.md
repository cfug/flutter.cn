---
# title: More thoughts about performance
title: 关于性能的更多思考
# description: What is performance, and why is performance important
description: 什么是性能，以及性能为何重要
ai-translated: true
---

## What is performance?

## 什么是性能？

Performance is a set of quantifiable properties of a performer.

性能是执行者（performer）的一组可量化属性。

In this context, performance isn't the execution of an action itself;
it's how well something or someone performs. Therefore, we use the adjective
 _performant_.

在此语境下，性能不是动作本身的执行，而是某物或某人表现得好不好。因此我们使用形容词 _performant_（高性能的）。

While the _how well_ part can, in general, be described in natural languages,
in our limited scope, the focus is on something that is quantifiable as a real
number. Real numbers include integers and 0/1 binaries as special cases.
Natural language descriptions are still very important. For example, a news
article that heavily criticizes Flutter's performance by just using words
without any numbers (a quantifiable value) could still be meaningful, and it
could have great impacts. The limited scope is chosen only because of our
limited resources.

虽然「多好」一般可用自然语言描述，但在我们有限的范围内，焦点放在可量化为实数的指标上。实数包括整数和 0/1 二进制等特殊情形。自然语言描述仍然很重要。例如，一篇仅用文字、没有任何数字（可量化值）却大力批评 Flutter 性能的新闻文章仍可能有意义并产生重大影响。范围有限仅因资源有限。

The required quantity to describe performance is often referred to as a
metric.

描述性能所需的量通常称为 metric（指标）。

To navigate through countless performance issues and metrics, you can categorize
based on performers.

要在无数性能问题与指标中导航，可按执行者分类。

For example, most of the content on this website is about the Flutter app
performance, where the performer is a Flutter app. Infra performance is also
important to Flutter, where the performers are build bots and CI task runners:
they heavily affect how fast Flutter can incorporate code changes, to improve
the app's performance.

例如，本站大部分内容关于 Flutter 应用性能，执行者是 Flutter 应用。基础设施性能对 Flutter 也很重要，执行者是构建 bot 和 CI 任务运行器：它们严重影响 Flutter 融入代码变更的速度，从而影响应用性能。

Here, the scope was intentionally broadened to include performance issues other
than just app performance issues because they can share many tools regardless of
who the performers are. For example, Flutter app performance and infra
performance might share the same dashboard and similar alert mechanisms.

此处有意扩大范围，纳入应用性能以外的问题，因为无论执行者是谁，它们可共享许多工具。例如 Flutter 应用性能与基础设施性能可能共用同一仪表板和类似的告警机制。

Broadening the scope also allows performers to be included that traditionally
are easy to ignore. Document performance is such an example. The performer
could be an API doc of the SDK, and a metric could be: the percentage of readers
who find the API doc useful.

扩大范围还可纳入传统上易被忽视的执行者。文档性能即是一例：执行者可以是 SDK 的 API 文档，指标可以是：认为 API 文档有用的读者百分比。

## Why is performance important?

## 性能为何重要？

Answering this question is not only crucial for validating the work in
performance, but also for guiding the performance work in order to be more
useful. The answer to "why is performance important?" often is also the answer
to "how is performance useful?"

回答此问题不仅对验证性能工作至关重要，也有助于指导性能工作使其更有用。「性能为何重要？」的答案往往也是「性能如何有用？」的答案。

Simply speaking, performance is important and useful because, in the scope,
performance must have quantifiable properties or metrics. This implies:

简而言之，性能重要且有用，因为在该范围内性能必须有可量化属性或指标。这意味着：

1. A performance report is easy to consume.

1. 性能报告易于阅读。

2. Performance has little ambiguity.

2. 性能歧义少。

3. Performance is comparable and convertible.

3. 性能可比较、可转换。

4. Performance is fair.

4. 性能是公平的。

Not that non-performance, or non-measurable issues or descriptions are not
important. They're meant to highlight the scenarios where performance can be
more useful.

并非说非性能、不可衡量的问题或描述不重要。此处意在突出性能更有用的场景。

### 1. A performance report is easy to consume

### 1. 性能报告易于阅读

Performance metrics are numbers. Reading a number is much easier than reading a
passage. For example, it probably takes an engineer 1 second to consume the
performance rating as a number from 1 to 5. It probably takes the same engineer
at least 1 minute to read the full, 500-word feedback summary.

性能指标是数字。读数字比读段落容易得多。例如工程师可能用 1 秒读完 1 到 5 的性能评分，却至少需要 1 分钟读完 500 字的完整反馈摘要。

If there are many numbers, it's easy to summarize or visualize them for quick
consumption. For example, you can quickly consume millions of numbers by
looking at its histogram, average, quantiles, and so on. If a metric has a
history of thousands of data points, then you can easily plot a timeline to
read its trend.

若有许多数字，易于汇总或可视化以便快速阅读。例如可通过直方图、平均值、分位数等快速理解数百万个数字。若某指标有数千个历史数据点，可轻松绘制时间线观察趋势。

On the other hand, having _n_ number of 500-word texts almost guarantees an
_n_-time cost to consume those texts. It would be a daunting task to analyze
thousands of historical descriptions, each having 500 words.

另一方面，_n_ 篇各 500 字的文本几乎保证需要 _n_ 倍时间阅读。分析数千条各 500 字的历史描述将是艰巨任务。

### 2. Performance has little ambiguity

### 2. 性能歧义少

Another advantage of having performance as a set of numbers is its unambiguity.
When you want an animation to have a performance of 20 ms per frame or
50 fps, there's little room for different interpretations about the numbers. On
the other hand, to describe the same animation in words, someone might call it
good, while someone else might complain that it's bad. Similarly, the same
word or phrase could be interpreted differently by different people. You might
interpret an OK frame rate to be 60 fps, while someone else might interpret it
to be 30 fps.

将性能表示为一组数字的另一优势是歧义少。当你要求动画达到每帧 20 ms 或 50 fps 时，对数字的解读空间很小。而用文字描述同一动画时，有人可能说好，有人可能说差。同样，同一词语不同人理解不同：你可能认为可接受的帧率是 60 fps，他人可能认为是 30 fps。

Numbers can still be noisy. For example, the measured time per frame might
be a true computation time of this frame, plus a random amount of time (noise)
that CPU/GPU spends on some unrelated work. Hence, the metric fluctuates.
Nevertheless, there's no ambiguity of what the number means. And, there are
also rigorous theory and testing tools to handle such noise. For example, you
could take multiple measurements to estimate the distribution of a random
variable, or you could take the average of many measurements to eliminate the
noise by [the law of large numbers][1].

数字仍可能有噪声。例如测得的每帧时间可能是该帧的真实计算时间加上 CPU/GPU 在无关工作上花费的随机时间（噪声），因此指标会波动。但数字含义并无歧义，且有严谨理论和测试工具处理噪声。例如可多次测量估计随机变量分布，或通过 [the law of large numbers][1]（大数定律）对多次测量取平均以消除噪声。

### 3. Performance is comparable and convertible

### 3. 性能可比较、可转换

Performance numbers not only have unambiguous meanings, but they also have
unambiguous comparisons. For example, there's no doubt that 5 is greater than 4.
On the other hand, it might be subjective to figure out whether excellent is
better or worse than superb. Similarly, could you figure out whether epic is
better than legendary? Actually, the phrase _strongly exceeds expectations_
could be better than _superb_ in someone's interpretation. It only becomes
unambiguous and comparable after a definition that maps strongly exceeds
expectations to 4 and superb to 5.

性能数字不仅含义明确，比较也明确。例如 5 大于 4 毫无疑问。而判断 excellent 是否优于 superb 可能很主观。epic 是否优于 legendary？实际上 _strongly exceeds expectations_ 在某人理解中可能优于 _superb_。只有定义将 strongly exceeds expectations 映射为 4、superb 映射为 5 后才变得明确可比较。

Numbers are also easily convertible using formulas and functions. For example,
60 fps can be converted to 16.67 ms per frame. A frame's rendering
time _x_ (ms) can be converted to a binary indicator
`isSmooth = [x <= 16] = (x <= 16 ? 1 :0)`. Such conversion can be compounded or
chained, so you can get a large variety of quantities using a single
measurement without any added noise or ambiguity. The converted quantity can
then be used for further comparisons and consumption. Such conversions are
almost impossible if you're dealing with natural languages.

数字也易于用公式和函数转换。例如 60 fps 可转为每帧 16.67 ms。帧渲染时间 _x_（ms）可转为二元指标 `isSmooth = [x <= 16] = (x <= 16 ? 1 :0)`。此类转换可复合或链式进行，用单次测量得到多种量而无额外噪声或歧义，再用于进一步比较与分析。自然语言几乎无法实现此类转换。

### 4. Performance is fair

### 4. 性能是公平的

If issues rely on verbose words to be discovered, then an unfair advantage is
given to people who are more verbose (more willing to chat or write) or those
who are closer to the development team, who have a larger bandwidth and lower
cost for chatting or face-to-face meetings.

若问题依赖冗长文字才能被发现，则更健谈（更愿意聊天或写作）或更接近开发团队、拥有更大沟通带宽和更低面对面会议成本的人会获得不公平优势。

By having the same metrics to detect problems no matter how far away or how
silent the users are, we can treat all issues fairly. That, in turn,
allows us to focus on the right issues that have greater impact.

无论用户多远或多沉默，用相同指标发现问题，可公平对待所有问题，从而聚焦影响更大的正确问题。

### How to make performance useful

### 如何让性能更有用

The following summarizes the 4 points discussed here, from a slightly different
perspective:

以下从不同角度总结前述 4 点：

1. Make performance metrics easy to consume. Do not overwhelm the readers with a
   lot of numbers (or words). If there are many numbers, then try to summarize
   them into a smaller set of numbers (for example, summarize many numbers into
   a single average number). Only notify readers when the numbers change
   significantly (for example, automatic alerts on spikes or regressions).

1. 让性能指标易于阅读。不要用大量数字（或文字）淹没读者。若数字很多，尽量汇总为更少的数字（例如汇总为单个平均值）。仅在数字显著变化时通知读者（例如尖峰或回归时自动告警）。

2. Make performance metrics as unambiguous as possible. Define the unit that the
   number is using. Precisely describe how the number is measured. Make the
   number easily reproducible. When there's a lot of noise, try to show the full
   distribution, or eliminate the noise as much as possible by aggregating many
   noisy measurements.

2. 尽量消除性能指标的歧义。定义数字使用的单位，精确描述测量方式，使数字易于复现。噪声大时尽量展示完整分布，或通过聚合多次噪声测量尽可能消除噪声。

3. Make it easy to compare performance. For example, provide a timeline to
   compare the current version with the old version. Provide ways and tools to
   convert one metric to another. For example, if we can convert both memory
   increase and fps drops into the number of users dropped or revenue lost in
   dollars, then we can compare them and make an informed trade-off.

3. 便于比较性能。例如提供时间线比较当前版与旧版，提供将一种指标转换为另一种的方式和工具。例如若将内存增长和 fps 下降都转换为用户流失数或美元收入损失，即可比较并做出明智权衡。

4. Make performance metrics monitor a population that is as wide as possible,
   so no one is left behind.

4. 让性能指标监控尽可能广泛的人群，以免有人被遗漏。

[1]: https://en.wikipedia.org/wiki/Law_of_large_numbers
