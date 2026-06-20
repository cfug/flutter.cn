---
# title: Prompting
title: 提示词 (Prompt)
sidenav: ai
# description: >
#   Learn how to build and optimize generative AI prompts in Flutter using system 
#   instructions, dynamic parameters, and versioning techniques.
description: >
  了解如何在 Flutter 中使用系统指令、动态参数与版本化技术构建并优化生成式 AI 提示词。
prev:
  # title: Flutter AI best practices
  title: Flutter AI 最佳实践
  path: /ai/best-practices
next:
  # title: Structure & output
  title: 结构 & 输出
  path: /ai/best-practices/structure-output
ai-translated: true
---


Assuming you've configured your Flutter app with the Firebase project and
configuration you need to use the Firebase AI Logic SDK (which you can learn
about in [the README][crossword-readme]), you're all set to start using
generative AI. Generative AI is the branch of Machine Learning (ML) that uses a
neural network trained on a large set of human language to produce a Large
Language Model (LLM). At this point, the best models (like Google Gemini) are
trained on what is essentially the entire internet.

假设你已用 Firebase 项目及配置好 Flutter 应用以使用 Firebase AI Logic SDK
（可在 [README][crossword-readme] 中了解），即可开始使用生成式 AI。
生成式 AI 是机器学习 (ML) 的一个分支，用在大规模人类语言上训练的神经网络产出大语言模型 (LLM)。
目前最好的模型（如 Google Gemini）训练数据本质上覆盖整个互联网。

At that scale, a model trained with that much data has created models that can
interpret human language and produce useful human language outputs. By now I'm
sure you've used [the Gemini chat app][gemini-app] (or ChatGPT or Claude or
other chat apps), so you know that if you talk to an LLM using vague language,
you're likely to get vague, often incorrect, results. If you want to get good
results, you'll have to use good prompts.

在这种规模下，用如此多数据训练的模型能够解读人类语言并产出有用的人类语言输出。
你肯定用过 [Gemini 聊天应用][gemini-app]（或 ChatGPT、Claude 等），
因此知道若用模糊语言与 LLM 对话，往往得到模糊且常错误的结果。
要获得好结果，就得用好提示词。

### Prompt construction

### 提示词构建

A prompt is the input you provide to an LLM to get the output you want. It will
include text as well zero or more files, like images or PDF files. If you're
building chat into your app, then the user will be entering the prompts (and
[the Flutter AI Toolkit][ai-toolkit] is useful for building the chat UI). If
you're using an LLM to implement the features of your app, like parsing an image
for crossword puzzle data, then you're going to be building the prompts
yourself. How you build them matters.

提示词是你提供给 LLM 以获得期望输出的输入，可包含文本以及零个或多个文件（如图像或 PDF）。
若你在应用中构建聊天，用户将输入提示词（[Flutter AI Toolkit][ai-toolkit] 有助于构建聊天 UI）。
若你用 LLM 实现应用功能（如从图像解析填字游戏数据），则需自己构建提示词。
如何构建很重要。

As an example, in building the Crossword Companion, the original clue solving prompt looked like this:

例如，构建 Crossword Companion 时，最初的线索求解提示词如下：

```dart
You are a crossword puzzle solver. Your goal is to solve the puzzle by filling in the grid with the correct answers. Given the current state of the crossword grid and a single clue, provide the answer for that clue. The answer should be a single word, returned in a JSON object that matches the following schema: '{"type": "object", "properties": {"answer": {"type": "string"}}}'.

# Puzzle Information
## Grid Layout
The grid is (${grid.width}x${grid.height}):
${_getGridStateAsString(grid)}

## Clue
${clue.number} ${clue.direction == ClueDirection.across ? 'Across' : 'Down'}: ${clue.text}
```

This prompt isn't all bad – it has some useful pieces:

这条提示词并非一无是处——它有一些有用部分：

- **Persona:** the phrase "You are a crossword puzzle solver" narrows the
  model's focus  

  **角色 (Persona)：**「You are a crossword puzzle solver」缩小模型关注点

- **Context:** the current state of the puzzle  

  **上下文 (Context)：** 谜题的当前状态

- **Query:** asking for a solution to a clue  

  **查询 (Query)：** 请求某条线索的解答

- **Format:** provide the output in JSON so the result could be parsed
  programmatically

  **格式 (Format)：** 以 JSON 输出结果，供程序解析

However, because of the two-dimensional nature of the data, this is a hard
prompt for some models to solve. The results from Gemini 2.5 Flash (the more
efficient of the models available at the time) were inconsistent. The quality of
the results from Gemini 2.5 Pro were excellent, but they were slower and more
expensive to obtain. Debugging revealed that Pro was essentially solving the
entire puzzle every time it was called, responding with just the solution to a
single clue.

然而，由于数据的二维性质，对部分模型这是难解的提示词。
Gemini 2.5 Flash（当时可用模型中更高效者）结果不一致。
Gemini 2.5 Pro 质量优秀但更慢更贵。
调试发现 Pro 每次调用几乎解完整张谜题，却只返回单条线索的答案。

What was needed was the efficiency of Flash with the quality of Pro. To do that
required some work on the prompt:

需要的是 Flash 的效率与 Pro 的质量。
为此需要改进提示词：

```markdown
Your task is to solve the following crossword clue.

**Clue:** "${clue.text}"

**Constraints:**
- The answer is a **$length-letter** word.
- The current letter pattern is `$pattern`, where `_` represents an unknown letter.

Return your answer and confidence score in the required JSON format.
```

This prompt asks to solve the clue, provides the important context, and
specifies the output format. Instead of handing in the entire state of the
two-dimensional grid, the input was narrowed to the length requirement and a
pattern, such as "_ R _ Y". These simplifications produce high quality results
from Flash that come back quickly enough to make it [fun to
watch][crossword-demo].  

该提示词要求解线索、提供重要上下文并指定输出格式。
不再传入整个二维网格状态，输入收窄为长度要求与模式（如 "_ R _ Y"）。
这些简化让 Flash 产出高质量且足够快的结果，使观看过程[有趣][crossword-demo]。  

<img
src="/assets/images/docs/ai-best-practices/crossword-companion-interface-showing-a.png"
alt="Crossword Companion interface showing a partially solved grid and clues
with AI-generated answers and confidence scores">

### Layering your prompts

### 分层提示词

The prompt used to solve the clues is not the only prompt the model sees. It
also has the system instruction (also known as the system message or the system
prompt) which is set as part of model instance creation. Think of the system
instruction as "this is what you do" while the individual prompts are "now do
this."

用于求解线索的提示词不是模型看到的唯一提示词。
还有系统指令（也称 system message 或 system prompt），在创建模型实例时设置。
可将系统指令视为「这是你要做的」，而各条提示词是「现在做这个」。

Here is the partial system instruction for the clue solver model (you'll see the
rest later):

以下是线索求解模型的部分系统指令（其余稍后可见）：

```dart
final clueSolverSystemInstruction =
'''
You are an expert crossword puzzle solver.

**Follow these rules at all times:**
1.  **Prefer Common Words:** Prioritize common English words and proper nouns. Avoid obscure, archaic, or highly technical terms unless the clue strongly implies them.
2.  **Match the Clue:** Ensure your answer strictly matches the clue's tense, plurality (singular vs. plural), and part of speech.
3.  **Verify Grammatically:** If a clue implies a specific part of speech (e.g., it's a verb, adverb, or plural), it's a good idea to use the `getWordMetadata` tool to verify your candidate answer matches. However, avoid using it for every clue.
4.  **Be Confident:** Provide a confidence score from 0.0 to 1.0 indicating your certainty.
5.  **Trust the Clue Over the Pattern:** The provided letter pattern is only a suggestion based on other potentially incorrect answers. Your primary goal is to find the best word that fits the **clue text**. If you are confident in an answer that contradicts the provided pattern, you should use that answer.
6.  **Format Correctly:** You must return your answer in the specified JSON format.
...
''';

```

Given the model we want to use and the system instruction, we now have
everything we need to create an instance:

有了要用的模型与系统指令，即可创建实例：

```dart
// The model for solving clues.
_clueSolverModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-flash',
  systemInstruction: Content.text(clueSolverSystemInstruction),
  ...
);
```

While the system instruction is often static, the individual prompts are usually
created dynamically based on data.

系统指令常为静态，各条提示词通常根据数据动态创建。

### Parameterizing your prompts

### 参数化提示词

Each clue solver prompt is created using the text from the clue, the target
length of the answer and the pattern so far given previously solved clues, such
as "_R_Y":

每条线索求解提示词用线索文本、答案目标长度以及此前已解线索形成的模式（如 "_R_Y"）创建：

```dart
String getSolverPrompt(Clue clue, int length, String pattern) =>
'''
Your task is to solve the following crossword clue.

**Clue:** "${clue.text}"

**Constraints:**
- The answer is a **$length-letter** word.
- The current letter pattern is `$pattern`, where `_` represents an unknown letter.

Return your answer and confidence score in the required JSON format.
''';
```

With the prompt in hand, we can pass it along to the model for our clue answer:

有了提示词，即可传给模型获取线索答案：

```dart
final result = await _clueSolverModel.generateContent(
  prompt: getSolverPrompt(clue, length, pattern),
);
```

### Prompt versioning

### 提示词版本化

This basic app keeps the prompt strings in code.
This makes them hard to track down and update.
For production apps, it's better to keep your prompts separated from the code,
perhaps bundled as Flutter assets.
One way to arrange prompt files is to
use [the Google dotprompt format][dotprompt],
which allows you to write `.prompt` files that look like this:

这个基础应用把提示词字符串放在代码里，难以查找和更新。
生产应用最好将提示词与代码分离，例如打包为 Flutter 资源。
组织提示词文件的一种方式是用 [Google dotprompt 格式][dotprompt]，
可编写如下 `.prompt` 文件：

```markdown
---
model: googleai/gemini-2.5-flash
input:
  schema:
    text: string
output:
  format: json
  schema:
    title?: string, the title of the article if it has one
    summary: string, a 3-sentence summary of the text
    tags?(array, a list of string tag category for the text): string
---

Extract the requested information from the given text. If a piece of information is not present, omit that field from the output.

Text: {{text}}
```

To expand a `.prompt` file for use in your Dart and Flutter projects, you can
use [the dotprompt_dart package][dotprompt-dart].

要在 Dart 和 Flutter 项目中展开 `.prompt` 文件，
可使用 [dotprompt_dart package][dotprompt-dart]。


[crossword-readme]: {{site.github}}/flutter/demos/tree/main/crossword_companion
[gemini-app]: https://gemini.google.com/app
[ai-toolkit]: /ai-toolkit
[crossword-demo]: {{site.github}}/flutter/demos/raw/refs/heads/main/crossword_companion/readme/screen-recording.mov
[dotprompt]: https://google.github.io/dotprompt/getting-started/
[dotprompt-dart]: {{site.pub-pkg}}/dotprompt_dart
