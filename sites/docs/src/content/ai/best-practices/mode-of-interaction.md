---
# title: Mode of interaction
title: 交互模式
sidenav: ai
# description: >
#   Learn to balance LLM capabilities with traditional code and implement 
#   guardrails to manage nondeterministic AI behavior.
description: >
  了解如何平衡 LLM 能力与传统代码，并实现护栏以管理非确定性的 AI 行为。
prev:
  # title: Tool calls (aka function calls)
  title: 工具调用（又称函数调用）
  path: /ai/best-practices/tool-calls
next:
  # title: Developer experience
  title: 开发者体验
  path: /ai/best-practices/developer-experience
ai-translated: true
---


It's a mistake to think of a request to an LLM in the same way as calling a
function. Given the same set of inputs in the same order, a function acts
predictably. We can write tests and inject faults and harden a function for a
wide variety of inputs.

把对 LLM 的请求想成调用函数是一个错误。
在相同顺序下给定相同输入，函数行为可预测。
我们可以编写测试、注入故障，并针对多种输入加固函数。

An LLM is not like that. A better way to think about it is as if the LLM were a
user and to treat the data we get from them as such. Like a user, an LLM is
nondeterministic, often wrong (partially or wholly) and sometimes plain random.
To guard our apps under these conditions, we need to build the same guardrails
around LLM input as we do around user input.

LLM 并非如此。更好的做法是把 LLM 当作用户，并同样对待从它获得的数据。
与用户一样，LLM 是非确定性的，常常出错（部分或全部），
有时纯属随机。要在这些条件下保护应用，
我们需要围绕 LLM 输入建立与用户输入相同的护栏。

If we can do that successfully, then we can bring extraordinary abilities to
apps in the form of problem solving and creativity that can rival that of a
human.

若能做到这一点，我们就能为应用带来可与人类媲美的解题与创造力等非凡能力。

### Separation of concerns

### 关注点分离

LLMs are good at some things and bad at others; the key is to bring them into
your apps for the good while mitigating the bad. As an example, let's consider
the task list in the Crossword Companion:

LLM 有擅长与不擅长之事；关键是在应用中发挥长处、减轻短处。
以 Crossword Companion 中的任务列表为例：

<img
src="/assets/images/docs/ai-best-practices/crossword-task-list-showing-solved-clues.png"
alt="Crossword task list showing solved clues in green with confidence
percentages and unsolved clues in red">

The task list is the set of clues that need solving. The goal is to use colors
and solutions in the task list to show progress during the solving process. The
initial implementation provided the model with a tool for managing the task
list, asking it to provide updates on progress as it went. Flash could not solve
the puzzle this way, but Pro could. Unfortunately, it solved it in big chunks,
only remembering to update the task list once or twice with a big delay in
between. No amount of prompting could convince it to update the tasks as it
went. You'll see the same behavior with modern AI agents managing their own task
lists; that's just where we are in the evolution of LLMs at the moment.

任务列表是需要求解的线索集合。
目标是用任务列表中的颜色和解法在求解过程中展示进度。
最初实现为模型提供了管理任务列表的工具，要求它在进行时更新进度。
Flash 无法以此方式解谜，Pro 可以。
不幸的是，它大块求解，只记得更新一两次任务列表，中间间隔很长。
无论怎么提示都无法让它边做边更新任务。
你会在现代 AI 智能体管理自己的任务列表时看到同样行为；
这正是当前 LLM 演进所处的阶段。

So how do we get consistent, deterministic updates of the task list? Take task
management out of the LLM's hands and handle it in the code.

那么如何一致、确定地更新任务列表？
把任务管理从 LLM 手中拿走，在代码中处理。

To generalize, before applying an LLM solution to a problem you're facing, ask yourself whether an LLM is the best tool for the job. Is human-like problem solving and creativity worth the tradeoff in unpredictability?

概括而言，在对你面临的问题应用 LLM 方案之前，先问自己 LLM 是否最适合该工作。
类人的解题与创造力是否值得不可预测性的代价？

The answer to that question comes with experimentation. Here are some examples
from the sample:

答案需要实验。以下是示例中的一些例子：

| <t>Task</t><t>任务</t> | <t>LLM Suitability</t><t>LLM 适用性</t> | <t>Code Suitability</t><t>代码适用性</t> |
| ------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Parsing the grid for size, contents and clues** | Great for an LLM by using vision and language understanding | Difficult to write the code to do this |
| **解析网格的尺寸、内容与线索** | 借助视觉与语言理解，非常适合 LLM | 用代码实现很困难 |
| **Validating grid contents** | Possible to do with another LLM checking the work | Easier for a human to glance at and adjust |
| **验证网格内容** | 可用另一个 LLM 检查工作 | 人类扫一眼并调整更容易 |
| **Handling the task list** | An LLM is unlikely to do this consistently | Easy to write the code to loop through a task list, updating as it goes |
| **处理任务列表** | LLM 很难一致完成 | 用代码遍历任务列表并边做边更新很容易 |
| **Solving each clue** | Great for an LLM using language understanding and generation | Difficult to do given real world clues that depend on word play, names, and slang |
| **求解每条线索** | 借助语言理解与生成，非常适合 LLM | 现实线索依赖文字游戏、人名、俚语时很难用代码做 |
| **Resolving conflicts** | An LLM is inconsistent on this kind of looping | Easy for a human to glance at and adjust |
| **解决冲突** | LLM 在这种循环上不一致 | 人类扫一眼并调整很容易 |

It's a judgement call for sure, but if you can reasonably write the code to do
it, your results will be predictable. However, if writing the code would be
unreasonably difficult, then consider an LLM, knowing you'll have to build the
guardrails like we did in the sample.

这当然是判断题，但若能合理用代码实现，结果就可预测。
若写代码不合理地困难，则考虑 LLM，并知道你必须像示例中那样建立护栏。

### Ask vs agent

### 询问 (Ask) 与智能体 (Agent)

There's more than just one pivot to consider besides code vs. LLM. Models
operate in roughly two modes: "ask" and "agent".

除了代码与 LLM 之外，还要考虑的不止一个支点。
模型大致有两种模式：「ask（询问）」和「agent（智能体）」。

A LLM is in "ask" mode when we prompt it without giving it tools to affect
change in the world, for example, no tools at all or tools just for looking up
data. Both the crossword interference model and clue solver models run in ask
mode, using tools only for additional data.

当我们提示 LLM 却不给它能改变世界状态的工具时，它处于「ask」模式，
例如完全没有工具，或只有查找数据的工具。
填字游戏推断模型和线索求解模型都在 ask 模式下运行，工具仅用于获取额外数据。

On the other hand, when we give an LLM a set of tools that allow it to operate
on our behalf in the world – like reading and writing files, executing bash
commands, loading web pages, calling web APIs, and so on – that LLM is in
"agent" mode.

另一方面，当我们给 LLM 一组工具，
让它代表我们在世界中操作——如读写文件、执行 bash 命令、加载网页、调用 Web API 等——
该 LLM 处于「agent」模式。

### Guardrails

### 护栏

The difference between ask and agent mode is not the model you choose or the
prompts you give it, but the tools you supply. The combination of the tools and
the agentic loop described in the Tool calls section allow an LLM to call any
number of those tools as often as it decides. Giving it that power puts the
responsibility on you to make sure you treat it as unpredictable; more like a
person than a program.

ask 与 agent 模式的区别不在于你选的模型或给的提示词，而在于你提供的工具。
工具与工具调用一节所述的智能体循环结合，允许 LLM 按自己的决定任意次数调用这些工具。
赋予这种能力意味着你有责任将其视为不可预测——更像人而非程序。

You do that the same way that you validate user input, by building up a suite of
tests to see how your app works against LLM responses. Give real LLMs a wide
variety of prompts and mock the tools to evaluate how the LLM is using them.
Like your first user testing experience, your first LLM testing results might
surprise you. Use that data to build the guardrails you need to harden your app.

做法与验证用户输入相同：建立一套测试，观察应用如何应对 LLM 响应。
给真实 LLM 多种提示词并 mock 工具，评估 LLM 如何使用它们。
就像第一次用户测试，第一次 LLM 测试结果可能让你意外。
用这些数据建立加固应用所需的护栏。

In the sample, we didn't have to guard against harm, but we did have to guard
against imperfect results. It was extensive testing against real-world data that
led to the institution of human-in-the-loop guards against attempting to solve
an invalid puzzle or conflicting solutions. In this way, Flutter and Firebase AI
Logic make the perfect combination to harness the power of an LLM and bring
unique capabilities to your apps.

在示例中，我们不必防范伤害，但要防范不完美结果。
针对真实数据的广泛测试促成了人机回圈 (human-in-the-loop) 护栏：
防止尝试求解无效谜题或冲突解法。
这样，Flutter 与 Firebase AI Logic 成为驾驭 LLM 能力、为应用带来独特功能的理想组合。

