---
# title: Notable rendering and layout changes after v3.7
title: v3.7 之后值得注意的渲染与布局变更
# description: Non-API related breaking changes made after Flutter v3.7.
description: Flutter v3.7 之后与 API 无关的破坏性改动。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Changes

## 变更

This section lists the notable non-API breaking changes.

本节列出值得注意的、与 API 无关的破坏性改动。

### (Only Affects Tests) `FlutterTest` is now the default test font

### （仅影响测试）`FlutterTest` 现为默认测试字体

The `FlutterTest` font replaced `Ahem` as the default font in tests: when
`fontFamily` isn't specified, or the font families specified are not registered,
tests use the `FlutterTest` font to render text. The `Ahem` font is still
available in tests if specified as the `fontFamily` to use.

`FlutterTest` 字体取代 `Ahem`，成为测试中的默认字体：
未指定 `fontFamily`，或指定的字体族尚未注册时，
测试会用 `FlutterTest` 字体渲染文本。
如果把 `fontFamily` 指定为 `Ahem`，测试中仍可使用该字体。

The `FlutterTest` font produces more precise font and glyph metrics than `Ahem`,
and the metrics are generally font-engine agnostic.
Check out the [Flutter Test Fonts][]
wiki page for more details about the test font.

`FlutterTest` 字体的字体与字形度量比 `Ahem` 更精确，
而且这些度量通常与字体引擎无关。
测试字体的更多细节请查看 [Flutter 测试字体][Flutter Test Fonts] Wiki 页面。

**Differences**

**差异**

The `FlutterTest` font looks almost identical to the old default `Ahem`: the
glyph for most characters is a box that fills the em square. The notable
differences between the `FlutterTest` font and `Ahem` font are:

`FlutterTest` 字体看起来与旧的默认字体 `Ahem` 几乎一样：
大多数字符的字形是填满 em 方块的方框。
`FlutterTest` 字体与 `Ahem` 字体的显著差别如下：

**1. Different baseline location**

**1. 基线位置不同**

The `FlutterTest` font's ascent and descent are 0.75 em and 0.25 em, while
`Ahem`'s are 0.8 em and 0.2 em, respectively.

`FlutterTest` 字体的 ascent 与 descent 分别为 0.75 em 和 0.25 em，
而 `Ahem` 分别为 0.8 em 和 0.2 em。

In the example golden image change below, the white blocks are text rendered
using `Ahem` and `FlutterTest`. The second character is taller in the new font
since it has a larger descent.

在下面的黄金图像变更示例中，白色方块是分别用 `Ahem` 和 `FlutterTest`
渲染的文本。新字体的第二个字符更高，因为它的 descent 更大。

| <t>Before (`Ahem`)</t><t>之前（`Ahem`）</t> | <t>After</t><t>之后</t> | <t>Animated Diff</t><t>动画差异</t> |
| :---: | :---: |:-----------------------------------------:|
| ![before](/assets/images/docs/breaking-changes/material.ink_sparkle.bottom_right.0_masterImage.png) | ![after](/assets/images/docs/breaking-changes/material.ink_sparkle.bottom_right.0_testImage.png) | ![baseline_animated](/assets/images/docs/breaking-changes/baseline.gif) |
| ![之前](/assets/images/docs/breaking-changes/material.ink_sparkle.bottom_right.0_masterImage.png) | ![之后](/assets/images/docs/breaking-changes/material.ink_sparkle.bottom_right.0_testImage.png) | ![基线动画](/assets/images/docs/breaking-changes/baseline.gif) |

**2. Different decoration position**

**2. 装饰线位置不同**

The underline location is slightly higher in `FlutterTest` than `Ahem`.

`FlutterTest` 中的下划线位置比 `Ahem` 略高。

In the example golden image change below, the 3 lines of white blocks are text
rendered using `Ahem` and `FlutterTest`. The blue dashed lines indicate the
[TextDecoration.overline]/[TextDecoration.lineThrough]/[TextDecoration.underline]
positions for each line.

在下面的黄金图像变更示例中，三行白色方块是分别用 `Ahem` 和 `FlutterTest`
渲染的文本。蓝色虚线标出每一行的
[TextDecoration.overline][]、[TextDecoration.lineThrough][] 和
[TextDecoration.underline][] 位置。

| <t>Before (`Ahem`)</t><t>之前（`Ahem`）</t> | <t>After</t><t>之后</t> | <t>Animated Diff</t><t>动画差异</t> |
| :---: | :---: |:------------------------------------------:|
| ![before](/assets/images/docs/breaking-changes/widgets.text_golden.Decoration.1_masterImage.png) | ![after](/assets/images/docs/breaking-changes/widgets.text_golden.Decoration.1_testImage.png) | ![baseline_animated](/assets/images/docs/breaking-changes/underline.gif) |
| ![之前](/assets/images/docs/breaking-changes/widgets.text_golden.Decoration.1_masterImage.png) | ![之后](/assets/images/docs/breaking-changes/widgets.text_golden.Decoration.1_testImage.png) | ![基线动画](/assets/images/docs/breaking-changes/underline.gif) |

**3. The glyph used for unmapped characters are slightly different**

**3. 未映射字符所用的字形略有不同**

Unmapped characters are rendered as hollow boxes in both fonts, with
a slight difference:

两种字体都会把未映射字符渲染成空心方框，但略有差别：

| <t>Before (`Ahem`)</t><t>之前（`Ahem`）</t> | <t>After</t><t>之后</t> | <t>Diff</t><t>差异</t> |
| :---: | :---: |:---------------------------------------:|
| ![before](/assets/images/docs/breaking-changes/material.floating_action_button_test.clip_masterImage.png) | ![after](/assets/images/docs/breaking-changes/material.floating_action_button_test.clip_testImage.png) | ![not_def_animated](/assets/images/docs/breaking-changes/not_def.gif) |
| ![之前](/assets/images/docs/breaking-changes/material.floating_action_button_test.clip_masterImage.png) | ![之后](/assets/images/docs/breaking-changes/material.floating_action_button_test.clip_testImage.png) | ![差异动画](/assets/images/docs/breaking-changes/not_def.gif) |

## References

## 参考资料

Relevant PRs:

相关 PR：

* The `FlutterTest` font was added in: [Add new test font]({{site.repo.engine}}/pull/39809)

  `FlutterTest` 字体添加于：[添加新的测试字体]({{site.repo.engine}}/pull/39809)

* The `FlutterTest` font was made the default in: [Make FlutterTest the default test font]({{site.repo.engine}}/pull/40188)

  `FlutterTest` 字体被设为默认字体：
  [将 FlutterTest 设为默认测试字体]({{site.repo.engine}}/pull/40188)

Wiki page:

Wiki 页面：

* [Flutter Test Fonts][]

  [Flutter 测试字体][Flutter Test Fonts]

[Flutter Test Fonts]: {{site.repo.flutter}}/blob/main/docs/contributing/testing/Flutter-Test-Fonts.md
[TextDecoration.underline]: {{site.api}}/flutter/dart-ui/TextDecoration/underline-constant.html
[TextDecoration.overline]: {{site.api}}/flutter/dart-ui/TextDecoration/overline-constant.html
[TextDecoration.lineThrough]: {{site.api}}/flutter/dart-ui/TextDecoration/lineThrough-constant.html
