# Flutter 中文文档翻译 Agent 指南

> 本文档是给 AI 翻译 Agent 的**最高优先级指令**。所有翻译行为必须严格遵守本文档规则。

---

## 核心理念

本仓库采用**中英文对照**模式管理翻译：英文原文永远保留在源文件中，中文译文作为追加层嵌入。
翻译完成后，构建工具链（`nt` tool）会自动折叠英文，只对外展示中文。

**这意味着：**
- 英文原文是"锚"——上游文档更新时，维护者通过 diff 英文原文定位变更位置
- 你**绝对不能**修改、删除、移动任何英文原文内容
- 中文译文的位置和格式直接决定 `nt` 折叠是否正确

---

## 第一原则：翻译质量

| 准则 | 说明 |
|------|------|
| 信达雅 | 准确理解原意，用地道中文表达，拒绝逐字机翻 |
| 人称 | **一律用「你」**，绝对禁止「您」 |
| 排版 | 中英文之间、中文与数字之间保留一个半角空格 |
| 术语一致 | 参考已翻译页面的用词，保持全站统一 |
| 禁止翻译腔 | "allows you to" → **不要**翻译成"允许你"，用"让你""借助 X 你可以"等自然表达 |
| 代码不译 | 代码块、API 名、类名、变量名保持英文原样 |

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

**⚠️ 这是最常见的错误！** 中文**不能**作为独立列表项，必须是英文项的**缩进延续段**：

```markdown
- English list item one

  中文列表项一

- English list item two

  中文列表项二
```

**错误示范（绝对禁止）：**

```markdown
- English list item one
- 中文列表项一
```

多行列表项同理——缩进对齐：

```markdown
* **Predictable performance**:
  Impeller compiles all shaders and reflection offline at build time.
  It builds all pipeline state objects upfront.

  **可预测的性能**：Impeller 在构建时离线编译所有着色器与反射，预先构建所有管线状态对象。
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

- 标题字段直接在下方追加中文行：

```yaml
title: Understanding constraints
title: 理解约束
description: A description of how constraints work.
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

---

## 第三原则：禁止事项清单

| # | 禁止行为 | 后果 |
|---|----------|------|
| 1 | 删除或修改英文原文 | 无法 diff 上游更新 |
| 2 | 列表中文作为独立 `*`/`-` 项 | 页面渲染出两个列表项 |
| 3 | 提示框拆成两个 `:::` 块 | 页面渲染出两个提示框 |
| 4 | 使用「您」 | 违反全站人称规范 |
| 5 | 修改链接路径 | CI 报 404 |
| 6 | 修改 `<?code-excerpt` 指令 | CI 报语法错误 |
| 7 | 脚注定义重复 | 构建报锚点缺失 |
| 8 | 相同内容标题不加区分 | 页面出现重复标题和锚点冲突 |
| 9 | "allows you to" 译为"允许你" | 翻译腔 |
| 10 | 组件 YAML 中做中英对照 | YAML 解析失败，构建报错 |

---

## 第四原则：自检流程

翻译完成后，Agent 必须自行验证：

1. **构建测试**：`dart run dash_site build` 无错误
2. **链接检查**：`dart run dash_site --site=docs check-link-references` 无报错
3. **代码片段**：`dart run dash_site --site=docs refresh-excerpts --fail-on-update --dry-run` 无报错
4. **格式扫描**：
   - 不存在连续同类型 `:::` 块（`:::\n\n:::note` 模式）
   - 不存在中文开头的独立列表项（`^[\s]*[-*+]\s+[\u4e00-\u9fff]`紧跟英文列表项）
   - 不存在「您」
   - 不存在「允许你」
5. **折叠测试**：运行 `tool/translator/build.sh`，确认 `_site` 产物中英文已被正确折叠

---

## 术语表（部分）

| English | 中文 | 备注 |
|---------|------|------|
| widget | widget | 不翻译 |
| state | 状态 | |
| build method | build 方法 | build 不译 |
| hot reload | 热重载 | |
| hot restart | 热重启 | |
| pub | pub | 不翻译 |
| package | package / 软件包 | 视上下文 |
| plugin | 插件 | |
| scaffold | Scaffold | 代码中不译 |
| render object | render object | 不翻译 |
| layout | 布局 | |
| constraint | 约束 | |
| shader | 着色器 | |
| pipeline | 管线 | |
| raster | 光栅化 | |
| jank | 卡顿 | |
| frame | 帧 | |
| impeller | Impeller | 专有名词不译 |
| Skia | Skia | 专有名词不译 |
| tree shaking | 摇树优化 | |
| deep link | 深层链接 | |
| platform channel | 平台通道 | |
| method channel | 方法通道 | |
| isolate | isolate | 不翻译 |
| future | Future | 代码名不译 |
| stream | Stream | 代码名不译 |
| mixin | mixin | 不翻译 |

---

## 文件处理优先级

1. `sites/docs/src/content/` — 主要文档内容（最高优先级）
2. `sites/docs/src/_includes/` — 可复用文档片段
3. `release/` 目录 — 版本发布说明（可选，按需翻译）

---

## 参考资源

- 已翻译样本：`sites/docs/src/content/get-started/` 目录下大部分文件
- 折叠工具：`tool/translator/` 目录下的 `build.sh`、`gulpfile.js`
- 上游仓库：`https://github.com/flutter/website`
- 翻译仓库：`https://github.com/cfug/flutter.cn`
