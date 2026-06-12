---
# title: Developer experience
title: 开发者体验
sidenav: ai
# description: >
#   Learn how to use spec-driven development and Gemini to plan, code, and 
#   iterate on high-quality Flutter applications.
description: >
  了解如何使用规格驱动开发与 Gemini 来规划、编码并迭代高质量的 Flutter 应用。
prev:
  # title: Mode of interaction
  title: 交互模式
  path: /ai/best-practices/mode-of-interaction
ai-translated: true
---


Generative AI is not just useful for implementing features in your app; it's
also useful for generating the code to implement those features.

生成式 AI 不仅有助于在应用中实现功能，也有助于生成实现这些功能的代码。

Unfortunately, it's just as easy as prompting an AI coding agent to "build a
Flutter app that solves crossword puzzles." I'm sure that prompt would yield
something, but I doubt very much that it would give us the powerful AI-assisted,
user-validated combination the Crossword Companion provides.

不幸的是，向 AI 编码智能体提示「构建一个能解决填字游戏的 Flutter 应用」同样容易。
我确信那条提示词会产出一些东西，
但我很怀疑它能给出 Crossword Companion 所提供的那种强大的 AI 辅助与用户校验组合。

With better prompting, however, the sample app was implemented with Gemini 2.5
Pro for the bulk of the functionality and Gemini 3 Pro Preview to add the final
touches. The process to get the best results from both models was the same:

不过，借助更好的提示词，
示例应用通过 Gemini 2.5 Pro 实现了大部分功能，
用 Gemini 3 Pro Preview 做了最后润色。
从两个模型获得最佳结果的流程相同：

- Plan  

  规划 (Plan)

- Code  

  编码 (Code)

- Validate  

  验证 (Validate)

- Iterate

  迭代 (Iterate)

### Plan

### 规划

The goal of the planning process is to kick off the coding process with enough
detail to let the agent know what you have in mind. The Crossword Companion
planning process was started with the following prompt:

规划过程的目标是以足够细节启动编码过程，让智能体了解你的想法。
Crossword Companion 的规划过程从以下提示词开始：

```plaintext
I'd like to create a file called requirements.md in the plans folder at the root of the project. here's a description of the project:

The application will be an open-source sample hosted on GitHub in the flutter/demos directory. It aims to demonstrate the use of Flutter, Firebase AI Logic, and Gemini to produce an agentic workflow that can solve a small crossword puzzle (one with a size under 10x10)....lots more description of the app along with a sample puzzle screenshot...
Ask any questions you may have before you get started.
```

This prompt, with a little bit of Q&A, manual edits by a human, and some updates
during the coding process, yielded [the requirements file][requirements].

这条提示词，加上少量问答、人工编辑以及编码过程中的一些更新，
产出了[需求文件][requirements]。

Before jumping into architectural design, the Gemini CLI was asked to initialize
the GEMINI.md rules file and then to update it with a list of architectural
principles:

在进入架构设计之前，我们让 Gemini CLI 初始化 GEMINI.md 规则文件，
然后用一系列架构原则更新它：

```plaintext
DRY (Don't Repeat Yourself) – eliminate duplicated logic by extracting shared utilities and modules.

Separation of Concerns – each module should handle one distinct responsibility.

Single Responsibility Principle (SRP) – every class/module/function/file should have exactly one reason to change.

Clear Abstractions & Contracts – expose intent through small, stable interfaces and hide implementation details.

Low Coupling, High Cohesion – keep modules self-contained, minimize cross-dependencies.

Scalability & Statelessness – design components to scale horizontally and prefer stateless services when possible.

Observability & Testability – build in logging, metrics, tracing, and ensure components can be unit/integration tested.

KISS (Keep It Simple, Sir) - keep solutions as simple as possible.

YAGNI (You're Not Gonna Need It) – avoid speculative complexity or over-engineering.
```

The GEMINI.md file is loaded into every new prompt you create with Gemini; it
provides the set of rules you want it to remember for any activity. Gemini was
running inside of an empty Flutter app project, so the `/init` command
documented how to build, test and run it, which was useful during coding.

GEMINI.md 文件会加载到你用 Gemini 创建的每条新提示词中；
它提供你希望 Gemini 在任何活动中记住的规则集。
Gemini 运行在一个空的 Flutter 应用项目中，
因此 `/init` 命令记录了如何构建、测试和运行，这在编码过程中很有用。

If you're building something more than a sample, I also recommend adding
something for test-driven development:

如果你构建的不只是示例，我还建议加入测试驱动开发相关内容：

```markdown
- **TDD (Test-Driven Development)** - write the tests first; the implementation
  code isn't done until the tests pass.

- **TDD（Test-Driven Development，测试驱动开发）** - 先写测试；测试通过前实现代码不算完成。
```

This helps to build guardrails to ensure the coding agent is writing solid code
over time.

这有助于建立护栏，确保编码智能体长期写出扎实代码。

With the requirements and rules in place, prompting for the design.md file was
next:

需求和规则就绪后，下一步是提示生成 design.md 文件：

```plaintext
great. i'd like to work on the design with you to be created in a design.md file to be stored in the plans folder. please use the @GEMINI.md and @requirements.md files as input. ask any questions you may have before you get started.
```

After inspecting and editing the generated app design, Gemini was prompted to
break it down into [tasks][tasks-spec]:

检查并编辑生成的应用设计后，我们提示 Gemini 将其拆解为[任务][tasks-spec]：

```plaintext
please read the files in the @specs folder and create a corresponding tasks.md file in the same folder that lays out a set of tasks and subtasks representing the functionality of this app. lay out the top-level tasks as minimal new functionality that the user can see in the running app, step-by-step as each top-level task is completed. each top-level task should include sub-tasks for creating and running tests and updating the @README.md with a description of the current functionality of the app. ask any questions you may have before you get started.
```

All of this happens before any code is written. You don't have to split things
into separate files, but by carefully considering the requirements, the design
and the task breakdown, you're helping the agent to provide results that meet
your expectations. This is called "Spec-Driven Development" and it's currently
the best way we know of to upgrade your process from "vibe coding" to
"AI-assisted software development."

这一切都在写任何代码之前完成。
你不必拆成独立文件，但通过认真考虑需求、设计和任务拆解，你是在帮助智能体提供符合你预期的结果。
这称为「规格驱动开发（Spec-Driven Development）」，
目前是我们所知的将流程从「vibe coding」升级为「AI 辅助软件开发」的最佳方式。

Also, the sentence that says "ask any questions you may have before you get
started" is a great way for the agent to clarify anything that it doesn't
understand instead of just making up the answers as it goes. It's also useful to
help you to decide on details you might not otherwise have considered.

此外，「在开始之前，如有任何问题请先提问」
这句话是让智能体澄清不理解之处、而不是一路编造答案的好方法。
它也有助于你决定原本可能未考虑到的细节。

### Code

### 编码

With the requirements, rules, design and tasks in place, kicking off the coding
part is easy:

需求、规则、设计和任务就绪后，启动编码部分很简单：

```plaintext
Read the @tasks.md file and implement the first milestone.
```

You can watch the coding agent at work, jumping in to correct it as it works, or
just let it go. Either way, when it's done, it's time to check its work.

你可以观察编码智能体工作，在其工作时介入纠正，也可以放手让它跑。
无论哪种方式，完成后都该检查它的工作。

### Validate

### 验证

At this point, you have some code and (in the world outside of samples) some
tests. To validate, ask yourself some questions:

此时你已有一些代码，（在示例之外的世界里）还有一些测试。验证时，问自己几个问题：

- Does the analyzer show it to be free of errors? Of warnings?  

  分析器是否显示无错误？无警告？

- Does the app run?  

  应用能否运行？

- Does it have the features you asked for? Do they work?  

  是否具备你要求的功能？它们是否正常工作？

- Do the tests pass?  

  测试是否通过？

- Does the code pass your review?

  代码是否通过你的审查？

The answers to these questions are the input for the next phase.

这些问题的答案是下一阶段的输入。

### Iterate

### 迭代

Gather the issues that need to be addressed and hand the ones that need fixing
back to the coding agent, iterating between it coding and your validation until
you get to a good place from a functional point of view.

收集需要处理的问题，把需要修复的交回编码智能体，
在它编码与你的验证之间迭代，直到功能上达到满意状态。

Now take another pass through validation from an architectural principles point
of view, spinning up a new agent to check the code. By clearing out the agent's
context, you remove the biases the original agent gathered choosing what code to
write in the first place. To ground it on just the code changes the agent has
just made, use a prompt like this:

现在从架构原则角度再做一轮验证，启动新智能体检查代码。
清空智能体上下文可消除原智能体在最初选择写哪些代码时积累的偏见。
若只让它关注智能体刚做的代码变更，可使用类似这样的提示词：

```plaintext
Use git diff to find the new code and check it against the architectural principles listed here: @GEMINI.md. Make recommendations for important improvements.
```

Doing this a few times keeps the code in good shape for AI agents and humans
alike.

多做几次能让代码对 AI 智能体和人类都保持良好状态。


[requirements]: {{site.github}}/flutter/demos/blob/main/crossword_companion/specs/requirements.md
[tasks-spec]: {{site.github}}/flutter/demos/blob/main/crossword_companion/specs/tasks.md
