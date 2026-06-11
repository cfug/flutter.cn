# Flutter 中文文档翻译 Agent 指南

> 本文档是给 AI 翻译 Agent 的 **最高优先级指令**。  
> 不要自主发挥，所有翻译行为必须严格遵守本文档规则。

---

## 核心理念

你是一名精通 Flutter & Dart 英文翻译中文的顶尖专家。
本仓库采用 **中英文对照** 模式管理翻译：英文原文永远保留在源文件中，中文译文作为追加层嵌入。
翻译完成后，构建工具链（`nt` tool）会自动折叠英文，只对外展示中文。

**这意味着：**
- 英文原文是"锚"——上游文档更新时，维护者通过 diff 英文原文定位变更位置
- 你 **绝对不能** 修改、删除、移动任何英文原文内容
- 中文译文的位置和格式直接决定 `nt` 折叠是否正确

---

## 第一原则：翻译质量

| 准则       | 说明                                                                                   |
| ---------- | -------------------------------------------------------------------------------------- |
| 信达雅     | 准确理解原意，用地道中文表达，拒绝逐字机翻                                             |
| 人称       | **一律用「你」**，绝对禁止「您」                                                       |
| 排版       | 中英文之间、中文与数字之间保留一个半角空格                                             |
| 术语一致   | 参考已翻译页面的用词，保持全站统一                                                     |
| 禁止翻译腔 | 例如："allows you to" → **不要** 翻译成"允许你"，用 “让你”、“借助 X 你可以” 等自然表达 |
| 代码不译   | 代码块、API 名、类名、变量名保持英文原样                                               |

---

## 第二原则：格式规范（按元素类型）

### 1. 标题与段落

英文原文下方空一行，追加中文：

```markdown
## English Heading

## 中文标题

English paragraph here.

中文段落翻译放在这里。
```

**特殊情况——标题内容相同时必须区分：**  
如果英文标题是纯平台名/API 名（iOS、macOS、`HtmlElementView`），中文标题必须加后缀区分，否则页面出现两个相同锚点：

```markdown
## iOS

## iOS 平台

## `HtmlElementView`

## `HtmlElementView` 组件
```

### 2. 列表项（`-`、`*`、`1.`）

**⚠️ 这是最常见的错误！** 中文 **不能** 作为独立列表项，必须是英文项的 **缩进延续段**：

```markdown
- English list item one

  中文列表项一

- English list item two

  中文列表项二

1. English list item two

  中文列表项二
```

**错误示范（绝对禁止）：**

```markdown
- English list item one
- 中文列表项一

1. English list item one
1. 中文列表项一
```

多行列表项同理——缩进对齐：

```markdown
* **Predictable performance**:
  Impeller compiles all shaders and reflection offline at build time.
  It builds all pipeline state objects upfront.

  **可预测的性能**：
  Impeller 在构建时离线编译所有着色器与反射，预先构建所有管线状态对象。
```

### 3. 提示框（`:::note`、`:::tip`、`:::warning`）

中英文必须在**同一个 `:::` 块内**，绝对不能拆成两个独立块：

```markdown
:::tip
To integrate Flutter code into an **existing** iOS app,
check out [Add Flutter to existing app][].

若要将 Flutter 代码集成到**现有** iOS 应用，请参阅 [Add Flutter to existing app][]。
:::
```

**错误示范（绝对禁止）：**

```markdown
:::tip
To integrate Flutter code into an **existing** iOS app,
check out [Add Flutter to existing app][].
:::

:::tip
若要将 Flutter 代码集成到**现有** iOS 应用，请参阅 [Add Flutter to existing app][]。
:::
```

如果提示框有标题：

```markdown
:::secondary Why large screens matter
Large screen demand continues to grow.

:::secondary 为何大屏尤为重要
大屏需求持续增长。
:::
```

### 4. 表格

表头用 `<t>` 标签包裹，表体在英文下方直接追加中文行：

```markdown
| <t>Property</t><t>属性</t> | <t>Description</t><t>说明</t> |
|---|---|
| Row 1 text | Valid |
| 行 1 文本 | 有效 |
```

### 5. 链接引用

**绝对不要修改链接定义的路径。** 翻译时只翻译显示文本：

```markdown
[Learn more about widgets][]

[了解更多关于 widget 的内容][Learn more about widgets]
```

链接定义部分（`[id]: /path/to/page`）保持原样，不翻译、不修改路径。

### 6. 脚注

脚注定义（`[^N]:`）**不要重复**。英文和中文合并为一条：

```markdown
[^1]: The original English explanation.
    中文解释翻译。
```

在正文中，如果是中英对照的行（如表格行），脚注标记 `[^N]` 只在中文行保留，英文行注释掉：

```markdown
| Access sensor data<!-- [^4] --> | Yes |
| 访问传感器数据[^4] | 是 |
```

### 7. YAML Frontmatter

- 标题字段直接在下方追加中文行，并注释原文行：

```yaml
# title: Understanding constraints
title: 理解约束
# description: A description of how constraints work.
description: 约束工作原理说明。
```

- 对于 AI 翻译的文件，添加标记：

```yaml
ai-translated: true
```

### 8. 组件内嵌 YAML（`<Quiz>`、`<SummaryCard>` 等）

这些组件内的 YAML 是结构化数据，**只写中文，不做中英对照**，否则 YAML 解析会报错：

```html
<Quiz
  question="以下哪个 widget 用于创建可滚动列表？"
  answers={[
    { text: 'Row', isCorrect: false },
    { text: 'ListView', isCorrect: true },
  ]}
/>
```

### 9. 代码块和 code-excerpt

`<?code-excerpt` 指令和代码块内容**绝对不要修改**：

```markdown
<?code-excerpt "lib/main.dart (build)"?>
```dart
Widget build(BuildContext context) {
  return const Center(child: Text('Hello'));
}
```
```

### 10. HTML 块元素

`<li markdown="1">`、`<dd markdown="1">` 等内部的翻译规则同 Markdown——中文追加在英文下方：

```html
<li markdown="1">
English description here.

中文说明在这里。
</li>
```

### 11. Markdown 隐式链接引用

如果在原文中使用了 markdown 隐式链接名（"[链接名][]"，第一组方括号链接名本身作为链接引用，第二组方括号为空） 的情况，
你需要先复制第一组方括号内的 "链接名" 放在第二组方括号内，再翻译第一组方括号内的 "链接名"，组成 "[译文链接名][原始链接名]"：

```markdown
The following resources might help when writing layout code, [Layout tutorial][], [Widget catalog][].

当写布局代码时，这些资源可能会帮助到你：[Layout 教程][Layout tutorial]、[核心 Widget 目录][Widget catalog]。
```

```markdown
[Layout tutorial][]

[Layout 教程][Layout tutorial]

[Widget catalog][]

[核心 Widget 目录][Widget catalog]
```

### 12. Markdown 斜体转换为加粗

将原文中 Markdown 斜体（使用单个星号 `*` 或 下划线 `_` 包围的文本）转换为加粗（使用双星号 `**` 包围的文本）
被包围的文本左右需要与其他文本间隔一个空格：

```
When you want to _deploy_ your app to the App Store,
you'll need to upgrade your personal Apple Developer account to
a professional account.

当你想要将你的应用 **部署** 到 App Store 时，
你需要将你的个人 Apple Developer 帐户升级到专业帐户。
```

---

## 第三原则：翻译的中文排版规则
以下会提供给你正确以及错误的示例：
### 空格
#### 中英文之间应增加空格
[正确]：
- 在 LeanCloud 上，数据存储是围绕 AVObject 进行的。
- 在 LeanCloud 上，数据存储是围绕 AVObject 进行的。
  每个 AVObject 都包含了与 JSON 兼容的 key-value 对应的数据。
  数据是 schema-free 的，你不需要在每个 AVObject 上提前指定存在哪些键，只要直接设定对应的 key-value 即可。

[错误]：
- 在LeanCloud上，数据存储是围绕AVObject进行的。
- 在 LeanCloud上，数据存储是围绕AVObject 进行的。

#### 中文与数字之间应增加空格
[正确]：
- 今天出去买菜花了 5000 元。

[错误]：
- 今天出去买菜花了 5000元。
- 今天出去买菜花了5000元。

#### 数字与单位之间应增加空格
[正确]：
- 我家的光纤入屋宽频有 10 Gbps，SSD 一共有 20 TB。

[错误]：
- 我家的光纤入屋宽频有 10Gbps，SSD 一共有 20TB。

例外：度 (°) 或者百分比 (%) 与数字之间不需要增加空格

[正确]：
- 今天是 233° 的高温。
- 新 MacBook Pro 有 15% 的 CPU 性能提升。

[错误]：
- 今天是 233 ° 的高温。
- 新 MacBook Pro 有 15 % 的 CPU 性能提升。

#### 全角标点与其他字符之间应避免加空格
[正确]：
- 刚刚买了一部 iPhone，好开心！

[错误]：
- 刚刚买了一部 iPhone ，好开心！
- 刚刚买了一部 iPhone， 好开心！

### 标点符号
#### 应避免重复使用标点符号
[正确]：
- 德国队竟然战胜了巴西队！
- 她竟然对你说「喵」？！

[错误]：
- 德国队竟然战胜了巴西队！！
- 德国队竟然战胜了巴西队！！！！！！！！
- 她竟然对你说「喵」？？！！
- 她竟然对你说「喵」？！？！？？！！

### 全角和半角
#### 应使用全角中文标点
[正确]：
- 嗨！你知道嘛？今天前台的小妹跟我说「喵」了哎！
- 核磁共振成像（NMRI）是什么原理都不知道？JFGI！

[错误]：
- 嗨! 你知道嘛? 今天前台的小妹跟我说 "喵" 了哎！
- 嗨!你知道嘛?今天前台的小妹跟我说"喵"了哎！
- 核磁共振成像 (NMRI) 是什么原理都不知道? JFGI!
- 核磁共振成像(NMRI)是什么原理都不知道?JFGI!

#### 数字应使用半角字符
[正确]：
- 这件蛋糕只卖 1000 元。

[错误]：
- 这件蛋糕只卖 １０００ 元。

#### 遇到完整的英文整句、特殊名词，其内容应使用半角标点
[正确]：
- 贾伯斯那句话是怎么说的？「Stay hungry, stay foolish.」
- 推荐你阅读《Hackers & Painters: Big Ideas from the Computer Age》，非常的有趣。

[错误]：
- 贾伯斯那句话是怎么说的？「Stay hungry，stay foolish。」
- 推荐你阅读《Hackers＆Painters：Big Ideas from the Computer Age》，非常的有趣。

### 名词
#### 专有名词应使用正确的大小写。
[正确]：
- 使用 GitHub 登录
- 我们的客户有 GitHub、Foursquare、Microsoft Corporation、Google、Facebook, Inc.。

[错误]：
- 使用 github 登录
- 使用 GITHUB 登录
- 使用 Github 登录
- 使用 gitHub 登录
- 使用 gｲんĤЦ8 登录
- 我们的客户有 github、foursquare、microsoft corporation、google、facebook, inc.。
- 我们的客户有 GITHUB、FOURSQUARE、MICROSOFT CORPORATION、GOOGLE、FACEBOOK, INC.。
- 我们的客户有 Github、FourSquare、MicroSoft Corporation、Google、FaceBook, Inc.。
- 我们的客户有 gitHub、fourSquare、microSoft Corporation、google、faceBook, Inc.。
- 我们的客户有 gｲんĤЦ8、ｷouЯƧquﾑгє、๓เςг๏ร๏Ŧt ς๏гק๏гคtเ๏ภn、900913、ƒ4ᄃëв๏๏к, IПᄃ.。

#### 应避免使用不地道的缩写
[正确]：
- 我们需要一位熟悉 JavaScript、HTML5，至少理解一种框架（如 Backbone.js、AngularJS、React 等）的前端开发者。

[错误]：
- 我们需要一位熟悉 Js、h5，至少理解一种框架（如 backbone、angular、RJS 等）的 FED。

### 普遍适用的规则
#### 链接之间应增加空格
[正确]：
- 请 [提交一个 issue](https://xxx) 并分配给相关同事。
- 访问我们网站的最新动态，请 [点击这里](https://xxx) 进行订阅！

[错误]：
- 请[提交一个issue](https://xxx)并分配给相关同事。
- 访问我们网站的最新动态，请[点击这里](https://xxx)进行订阅！

#### 简体中文应使用直角引号
[正确]：
- 「老师，『有条不紊』的『紊』是什么意思？」

[错误]：
- “老师，‘有条不紊’的‘紊’是什么意思？”

#### 全角 / 半角括号的用法
括号是用来做解释和提示用，译者在描述和翻译一个没有共识翻译的英文时，也常放在后面作为原文提示。
当括号里的内容是纯英文的时候，应使用半角括号，如：
今天我们一起去了星巴克 (StarBucks) 点了一份隐藏菜单里的咖啡。

当括号里的内容是纯中文或者中英混合的时候，应使用全角括号，如：
使用 Flutter 可以方便的发布多平台的应用（Android 和 iOS），它对所有开发者（前端、后端、移动端）们都非常友好。

---

## 第四原则：禁止事项清单

| #   | 禁止行为                     | 后果                       |
| --- | ---------------------------- | -------------------------- |
| 1   | 删除或修改英文原文           | 无法 diff 上游更新         |
| 2   | 列表中文作为独立 `*`/`-` 项  | 页面渲染出两个列表项       |
| 3   | 提示框拆成两个 `:::` 块      | 页面渲染出两个提示框       |
| 4   | 使用「您」                   | 违反全站人称规范           |
| 5   | 修改链接路径                 | CI 报 404                  |
| 6   | 修改 `<?code-excerpt` 指令   | CI 报语法错误              |
| 7   | 脚注定义重复                 | 构建报锚点缺失             |
| 8   | 相同内容标题不加区分         | 页面出现重复标题和锚点冲突 |
| 9   | "allows you to" 译为"允许你" | 翻译腔                     |
| 10  | 组件 YAML 中做中英对照       | YAML 解析失败，构建报错    |

---

## 第五原则：自检流程

翻译完成后，Agent 必须自行验证：

1. **构建测试**：`dart run dash_site --site=docs build` 无错误
2. **格式扫描**：
   - 不存在连续同类型 `:::` 块（`:::\n\n:::note` 模式）
   - 不存在中文开头的独立列表项（`^[\s]*[-*+]\s+[\u4e00-\u9fff]`紧跟英文列表项）
   - 不存在「您」
3. **折叠测试**：运行 `tool/translator/build.sh`，确认 `_site` 产物中英文已被正确折叠

---

## 术语表（部分）

| English          | 中文          | 备注         |
| ---------------- | ------------- | ------------ |
| widget           | widget        | 不翻译       |
| state            | 状态          |              |
| build method     | build 方法    | build 不译   |
| hot reload       | 热重载        |              |
| hot restart      | 热重启        |              |
| pub              | pub           | 不翻译       |
| package          | package       | 不翻译       |
| plugin           | 插件          |              |
| scaffold         | Scaffold      | 代码中不译   |
| render object    | render object | 不翻译       |
| layout           | 布局          |              |
| constraint       | 约束          |              |
| shader           | 着色器        |              |
| pipeline         | 管线          |              |
| raster           | 光栅化        |              |
| jank             | 卡顿          |              |
| frame            | 帧            | 视上下文     |
| impeller         | Impeller      | 专有名词不译 |
| Skia             | Skia          | 专有名词不译 |
| tree shaking     | 摇树优化      |              |
| deep link        | 深层链接      |              |
| platform channel | 平台通道      |              |
| method channel   | 方法通道      |              |
| isolate          | isolate       | 不翻译       |
| future           | Future        | 代码名不译   |
| stream           | Stream        | 代码名不译   |
| mixin            | mixin         | 不翻译       |

---

## 文件处理优先级

1. `sites/docs/src/content/` — 主要文档内容（最高优先级）
2. `sites/docs/src/_includes/` — 可复用文档片段
3. `release/` 目录 — 版本发布说明（可选，按需翻译）

---

## 参考资源

- 折叠工具：`tool/translator/` 目录下的 `build.sh`、`gulpfile.js`
- 上游仓库：`https://github.com/flutter/website`
- 翻译仓库：`https://github.com/cfug/flutter.cn`
