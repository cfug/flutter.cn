---
# title: Structure & output
title: 结构与输出
sidenav: ai
# description: >
#   Learn how to use structured input and output schemas to receive reliable, 
#   parsable JSON data from an LLM.
description: >
  了解如何使用结构化输入与输出 schema，从 LLM 获得可靠、可解析的 JSON 数据。
prev:
  # title: Prompting
  title: 提示词
  path: /ai/best-practices/prompting
next:
  # title: Tool calls (aka function calls)
  title: 工具调用（又称函数调用）
  path: /ai/best-practices/tool-calls
ai-translated: true
---


When you're writing programs against an LLM, you want to provide unambiguous
input and get unambiguous output.

针对 LLM 编写程序时，你希望提供明确的输入并获得明确的输出。

### Structured input

### 结构化输入

As input, an LLM can take pretty much anything you can render as text. That
includes free form text and semi-structured text like Markdown, but also
includes structured formats like CSV, JSON, and XML. If you have data with
structure, format the data with that structure and the LLM is going to give you
better results.

作为输入，LLM 几乎可以接收任何能渲染为文本的内容，包括自由文本、Markdown 等半结构化文本，以及 CSV、JSON、XML 等结构化格式。若数据有结构，用该结构格式化数据，LLM 会给出更好结果。

In addition to structured text input, you can also pass binary data, like images
or PDFs. In the sample, the app passes the crossword puzzle screenshot images to
Gemini for it to infer the grid data:

除结构化文本输入外，还可传入二进制数据（如图像或 PDF）。在示例中，应用将填字游戏截图传给 Gemini 以推断网格数据：

```dart
final imageParts = <Part>[];
for (final image in images) {
  final imageBytes = await image.readAsBytes();
  final mimeType = lookupMimeType(image.path, headerBytes: imageBytes)!;
  imageParts.add(InlineDataPart(mimeType, imageBytes));
}

final content = [
  Content.multi([
    TextPart(_crosswordPrompt),
    ...imageParts,
  ]),
];

final response = await _crosswordModel.generateContent(content);
...
```

```dart
final imageParts = <Part>[];
for (final image in images) {
  final imageBytes = await image.readAsBytes();
  final mimeType = lookupMimeType(image.path, headerBytes: imageBytes)!;
  imageParts.add(InlineDataPart(mimeType, imageBytes));
}

final content = [
  Content.multi([
    TextPart(_crosswordPrompt),
    ...imageParts,
  ]),
];

final response = await _crosswordModel.generateContent(content);
...
```

This code passes the prompt and the images to Gemini as part of the same
request.

该代码在同一请求中将提示词与图像一并传给 Gemini。

### Structured output

### 结构化输出

An LLM can have a harder time with structured output than with structured input.
You want to be clear and thorough when asking the model for JSON output to
ensure you get something that you can reliably parse in your apps. 

LLM 处理结构化输出往往比结构化输入更难。
向模型请求 JSON 输出时要清晰详尽，确保得到应用中可靠解析的内容。

Start by initializing the model instance with your expected output format:

先在初始化模型实例时指定期望的输出格式：

```dart
// the schema for the clue solver output
static final _crosswordSchema = Schema(
  SchemaType.object,
  properties: {
    'width': Schema(SchemaType.integer),
    'height': Schema(SchemaType.integer),
    'grid': Schema(
      SchemaType.array,
      items: Schema(
        SchemaType.array,
        items: Schema(
          SchemaType.object,
          properties: {
            'color': Schema(SchemaType.string),
            'clueNumber': Schema(SchemaType.integer, nullable: true),
          },
        ),
      ),
    ),
    'clues': Schema(
      SchemaType.object,
      properties: {
        'across': Schema(
          SchemaType.array,
          items: Schema(
            SchemaType.object,
            properties: {
              'number': Schema(SchemaType.integer),
              'text': Schema(SchemaType.string),
            },
          ),
        ),
        'down': Schema(
          SchemaType.array,
          items: Schema(
            SchemaType.object,
            properties: {
              'number': Schema(SchemaType.integer),
              'text': Schema(SchemaType.string),
            },
          ),
        ),
      },
    ),
  },
);

// The model for inferring crossword data from images.
_crosswordModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-pro',
  generationConfig: GenerationConfig(
    responseMimeType: 'application/json',
    responseSchema: _crosswordSchema,
  ),
);
```

And while this might be enough, the most reliable results come when you also
specify the output schema in the system instruction:

仅这样可能已足够，最可靠的结果来自在系统指令中也指定输出 schema：

```dart
final _crosswordPrompt =
'''
Analyze the following crossword puzzle images and return a JSON object
representing the grid size, contents, and clues. The images may contain
different parts of the same puzzle (e.g., the grid the across clues, the down
clues). Combine them to form a complete puzzle.

The JSON schema is as follows: ${jsonEncode(_crosswordSchema.toJson())}
'''
```

```dart
final _crosswordPrompt =
'''
分析以下填字游戏图像，返回表示网格尺寸、内容与线索的 JSON 对象。图像可能包含同一谜题的不同部分（如网格、横向线索、纵向线索）。将它们合并为完整谜题。

JSON schema 如下：${jsonEncode(_crosswordSchema.toJson())}
'''
```

Now you can parse the model's text response as JSON:

现在可将模型的文本响应解析为 JSON：

```dart
final response = await _crosswordModel.generateContent(content);

final json = jsonDecode(response.text!);
final width = json['width'] as int;
final height = json['height'] as int;
final gridData = json['grid'] as List;
final cluesData = json['clues'] as Map<String, dynamic>;
...
```

```dart
final response = await _crosswordModel.generateContent(content);

final json = jsonDecode(response.text!);
final width = json['width'] as int;
final height = json['height'] as int;
final gridData = json['grid'] as List;
final cluesData = json['clues'] as Map<String, dynamic>;
...
```

Reliable JSON output from the model is what makes it possible to integrate AI
into your app. The data might or might not be correct, but it will be in a
format your app can work with.

模型可靠的 JSON 输出使 AI 能集成到应用中。数据可能对也可能错，但会是应用可处理的格式。
