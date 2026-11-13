---
# title: Use maxLengthEnforcement instead of maxLengthEnforced
title: 使用 maxLengthEnforcement 替代 maxLengthEnforced
# description: Introducing the MaxLengthEnforcement enum.
description: 介绍 MaxLengthEnforcement 枚举。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

To control the behavior of `maxLength` in the
`LengthLimitingTextInputFormatter`, use `maxLengthEnforcement`
instead of the now-deprecated `maxLengthEnforced`.

要控制 `LengthLimitingTextInputFormatter` 中 `maxLength` 的行为，
请使用 `maxLengthEnforcement`，
不要再使用已弃用的 `maxLengthEnforced`。

## Context

## 上下文

The `maxLengthEnforced` parameter was used to decide
whether text fields should truncate the input value
when it reaches the `maxLength` limit, or whether
(for `TextField` and `TextFormField`)
a warning message should instead be shown in the
character count when the length of the user input
exceeded `maxLength`.

`maxLengthEnforced` 参数用来决定：
文本框在达到 `maxLength` 上限时是否截断输入值，
或者（对于 `TextField` 和 `TextFormField`）
当用户输入长度超过 `maxLength` 时，
是否改为在字符计数处显示警告信息。

However, to enter CJK characters, some input methods
require the user to enter a sequence of Latin characters
into the text field, then turn this sequence
into desired CJK characters (a referred to as *text composition*).
The Latin sequence is usually longer than the resulting CJK characters,
so setting a hard maximum character limit on a text field may mean
the user is unable to finish the text composition normally due to the
`maxLength` character limit.

不过，要输入 CJK 字符，有些输入法要求用户先在文本框中
输入一串拉丁字符，再把这串字符转换成想要的 CJK 字符
（称为 **文本合成**）。
拉丁字符序列通常比最终的 CJK 字符更长，
因此如果给文本框设置硬性的最大字符限制，
用户可能因为 `maxLength` 字符上限而无法正常完成文本合成。

Text composition is also used by some input methods to
indicate that the text within the highlighted composing
region is being actively edited, even when entering
Latin characters. For example, Gboard's English keyboard on Android
(as with many other input methods on Android) puts the current word
in a composing region.

有些输入法也会用文本合成来表示高亮合成区域内的文本
正在被积极编辑，即使输入的是拉丁字符也是如此。
例如，Android 上 Gboard 的英文键盘
（以及 Android 上的许多其他输入法）
会把当前单词放在合成区域中。

To improve the input experience in these scenarios,
a new tri-state enum, `MaxLengthEnforcement`, was introduced.
Its values describe supported strategies for handling
active composing regions when applying a
`LengthLimitingTextInputFormatter`.
A new `maxLengthEnforcement` parameter that uses
this enum has been added to text fields to replace
the boolean `maxLengthEnforced` parameter.
With the new enum parameter,
developers can choose different strategies
based on the type of the content the text field expects.

为改善这些场景下的输入体验，
新增了三态枚举 `MaxLengthEnforcement`。
它的值描述了在应用 `LengthLimitingTextInputFormatter` 时，
处理活动合成区域的受支持策略。
文本框新增了使用该枚举的 `maxLengthEnforcement` 参数，
用以替代布尔参数 `maxLengthEnforced`。
有了这个新的枚举参数，
开发者可以根据文本框期望的内容类型选择不同策略。

For more information, see the docs for [`maxLength`][] and
[`MaxLengthEnforcement`][].

更多信息请参阅 [`maxLength`][] 与 [`MaxLengthEnforcement`][] 的文档。

The default value of the `maxLengthEnforcement`
parameter is inferred from the `TargetPlatform`
of the application, to conform to the platform's conventions:

`maxLengthEnforcement` 参数的默认值
会根据应用的 `TargetPlatform` 推断，
以符合该平台的惯例：

## Description of change

## 改动说明

* Added a `maxLengthEnforcement` parameter using the
  new enum type `MaxLengthEnforcement`,
  as a replacement for the now-deprecated boolean
  `maxLengthEnforced` parameter on
  `TextField`, `TextFormField`, `CupertinoTextField`, and
  `LengthLimitingTextInputFormatter` classes.

  为 `TextField`、`TextFormField`、`CupertinoTextField`
  和 `LengthLimitingTextInputFormatter` 新增了
  `maxLengthEnforcement` 参数，类型为新枚举 `MaxLengthEnforcement`，
  用以替代已弃用的布尔参数 `maxLengthEnforced`。

## Migration guide

## 迁移指南

_Using the default behavior for the current platform is recommended,
since this will be the behavior most familiar to the user._

**建议使用当前平台的默认行为，
因为这是用户最熟悉的行为。**

### Default values of `maxLengthEnforcement`

### `maxLengthEnforcement` 的默认值

* Android, Windows: `MaxLengthEnforcement.enforced`.
  The native behavior of these platforms is enforced.
  The inputting value will be truncated whether
  the user is entering with composition or not.

  Android、Windows：`MaxLengthEnforcement.enforced`。
  这些平台会强制执行原生行为。
  无论用户是否正在进行文本合成，输入值都会被截断。

* iOS, macOS: `MaxLengthEnforcement.truncateAfterCompositionEnds`.
  These platforms do not have a "maximum length"
  feature and therefore require that developers implement
  the behavior themselves. No standard convention seems
  to have evolved on these platforms. We have chosen
  to allow the composition to exceed the maximum length
  to avoid breaking CJK input.

  iOS、macOS：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  这些平台没有「最大长度」功能，
  因此需要开发者自行实现该行为。
  这些平台上似乎还没有形成标准惯例。
  我们选择允许合成内容超过最大长度，以免打断 CJK 输入。

* Web and Linux: `MaxLengthEnforcement.truncateAfterCompositionEnds`.
  While there is no standard on these platforms
  (and many implementation exist with conflicting behavior),
  the common convention seems to be to allow the composition
  to exceed the maximum length by default.

  Web 与 Linux：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  这些平台上没有标准
  （而且存在许多行为互相冲突的实现），
  常见惯例似乎是默认允许合成内容超过最大长度。

* Fuchsia: `MaxLengthEnforcement.truncateAfterCompositionEnds`.
  There is no platform convention on this platform yet,
  so we have chosen to default to the convention that is
  least likely to result in data loss.

  Fuchsia：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  该平台目前还没有平台惯例，
  因此我们默认选择最不容易导致数据丢失的惯例。

### To enforce the limit all the time

### 始终强制执行长度限制

To enforce the limit that always truncate the value when
it reaches the limit (for example, when entering a
verification code), use `MaxLengthEnforcement.enforced` in
editable text fields.

要强制执行长度限制，在达到上限时始终截断值
（例如输入验证码时），
请在可编辑文本框中使用 `MaxLengthEnforcement.enforced`。

_This option may give suboptimal user experience when used
with input methods that rely on text composition.
Consider using the `truncateAfterCompositionEnds`
option when the text field expects arbitrary user input
which may contain CJK characters.
See the [Context](#context) section for more information._

**与依赖文本合成的输入法一起使用时，
此选项的用户体验可能不够理想。
当文本框期望的是可能包含 CJK 字符的任意用户输入时，
请考虑使用 `truncateAfterCompositionEnds` 选项。
更多信息请参阅 [上下文](#context) 一节。**

Code before migration:

迁移前的代码：

```dart
TextField(maxLength: 6)
```

or:

或：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforced: true,
)
```

Code after migration:

迁移后的代码：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforcement: MaxLengthEnforcement.enforced,
)
```

### To not enforce the limitation

### 不强制执行长度限制

To show a max length error in `TextField`,
but _not_ truncate when the limit is exceeded,
use `MaxLengthEnforcement.none` instead of
`maxLengthEnforced: false`.

要在 `TextField` 中显示最大长度错误，
但在超过限制时 **不** 截断，
请使用 `MaxLengthEnforcement.none`，
不要再使用 `maxLengthEnforced: false`。

Code before migration:

迁移前的代码：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforced: false,
)
```

Code after migration:

迁移后的代码：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforcement: MaxLengthEnforcement.none,
)
```

For `CupertinoTextField`, which isn't able to show an error message,
just don't set the `maxLength` value.

对于无法显示错误信息的 `CupertinoTextField`，
只要不设置 `maxLength` 即可。

Code before migration:

迁移前的代码：

```dart
CupertinoTextField(
  maxLength: 6,
  maxLengthEnforced: false,
)
```

Code after migration:

迁移后的代码：

```dart
CupertinoTextField()
```

### To enforce the limit, but not for composing text

### 强制执行长度限制，但合成中的文本除外

To avoid truncating text while the user is inputting text
by using composition, specify
`MaxLengthEnforcement.truncateAfterCompositionEnds`.
This behavior allows input methods that use composing
regions larger than the resulting text,
as is common for example with Chinese, Japanese,
and Korean (CJK) text, to temporarily
ignore the limit until editing is complete.

为避免在用户通过文本合成输入时截断文本，
请指定 `MaxLengthEnforcement.truncateAfterCompositionEnds`。
这种行为允许合成区域比最终文本更长的输入法
（中文、日文和韩文等 CJK 文本中很常见）
在编辑完成前暂时忽略该限制。

_Gboard's English keyboard on Android
(and many other Android input methods)
creates a composing region for the word being entered.
When used in a `truncateAfterCompositionEnds` text field,
the user won't be stopped right away at the `maxLength` limit.
Consider the `enforced` option if you are confident that
the text field will not be used with input methods
that use temporarily long composing regions such as CJK text._

**Android 上 Gboard 的英文键盘
（以及许多其他 Android 输入法）
会为正在输入的单词创建合成区域。
在使用 `truncateAfterCompositionEnds` 的文本框中，
用户不会在一达到 `maxLength` 上限时就被拦住。
如果你确信该文本框不会配合使用
临时较长合成区域的输入法（例如 CJK 文本），
可以考虑 `enforced` 选项。**

Code for the implementation:

实现代码：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforcement: MaxLengthEnforcement.truncateAfterCompositionEnds, // Temporarily lifts the limit.
)
```

### Be wary of assuming input will not use composing regions

### 不要假定输入不会使用合成区域

It is tempting when targeting a particular locale to assume
that all users will be satisfied with input from that locale.
For example, forum software targeting an English-language
community might be assumed to only need to deal with English
text. However, this kind of assumption is often incorrect.
For example, maybe the English-language forum participants
will want to discuss Japanese anime or Vietnamese cooking.
Maybe one of the participants is Korean and prefers to express
their name in their native ideographs. For this reason,
freeform fields should rarely use the `enforced` value
and should instead prefer the
`truncateAfterCompositionEnds` value if at all possible.

面向特定区域设置时，很容易假定所有用户
都满足于该区域的输入方式。
例如，面向英语社区的论坛软件可能被认为
只需要处理英文文本。但这种假定往往并不正确。
比如，英语论坛的参与者可能想讨论日本动漫或越南菜。
也许某位参与者是韩国人，更希望用母语表意文字写自己的名字。
因此，自由输入字段应尽量少用 `enforced`，
并尽可能优先使用 `truncateAfterCompositionEnds`。

## Timeline

## 时间线

Landed in version: v1.26.0-1.0.pre<br>
合入版本：v1.26.0-1.0.pre<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

Design doc:

设计文档：

* [`MaxLengthEnforcement` design doc][]

  [`MaxLengthEnforcement` 设计文档][`MaxLengthEnforcement` design doc]

API documentation:

API 文档：

* [`MaxLengthEnforcement`][]
* [`LengthLimitingTextInputFormatter`][]
* [`maxLength`][]

Relevant issues:

相关 issue：

* [Issue 63753][]
* [Issue 67898][]

Relevant PR:

相关 PR：

* [PR 63754][]: Fix TextField crashed with composing and maxLength set

  [PR 63754][PR 63754]：修复设置了 composing 与 maxLength 时
  TextField 崩溃的问题

* [PR 68086][]: Introduce `MaxLengthEnforcement`

  [PR 68086][PR 68086]：引入 `MaxLengthEnforcement`

[`MaxLengthEnforcement` design doc]: /go/max-length-enforcement
[`MaxLengthEnforcement`]: {{site.api}}/flutter/services/MaxLengthEnforcement.html
[`LengthLimitingTextInputFormatter`]: {{site.api}}/flutter/services/LengthLimitingTextInputFormatter-class.html
[`maxLength`]: {{site.api}}/flutter/services/LengthLimitingTextInputFormatter/maxLength.html
[Issue 63753]: {{site.repo.flutter}}/issues/63753
[Issue 67898]: {{site.repo.flutter}}/issues/67898
[PR 63754]: {{site.repo.flutter}}/pull/63754
[PR 68086]: {{site.repo.flutter}}/pull/68086
