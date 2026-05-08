---
# title: Accessibility
title: 无障碍 (a11y)
# description: Information on Flutter's accessibility support.
description: Flutter 的无障碍支持。
tags: Flutter开发
keywords: 联合国关于残疾人权利,CRPD,无障碍
---

## Background

## 背景

Ensuring that apps are accessible to a broad range of users is an essential
part of building a high-quality app. Applications that are poorly
designed create barriers to people of all ages. The [UN Convention on
the Rights of Persons with Disabilities][CRPD] states the moral and legal
imperative to ensure universal access to information systems; countries
around the world enforce accessibility as a requirement; and companies
recognize the business advantages of maximizing access to their services.

确保你的应用能够被广泛的用户使用是构建高质量应用程序至关重要的一点。
如果你的应用设计不佳，可能会无法覆盖到所有年龄段的人。
[联合国关于残疾人权利][CRPD] 规定了道德和法律必须确保信息系统能够普遍使用。
世界各地也都要求提供无障碍的环境；
同样，公司也认识到了最大限度覆盖服务的优势所在。

We strongly encourage you to include an accessibility checklist
as a key criteria before shipping your app. Flutter is committed to
supporting developers in making their apps more accessible, and includes
first-class framework support for accessibility in addition to that
provided by the underlying operating system, including:

我们强烈建议你将辅助功能清单添加到发布应用前的关键指标。
Flutter 始终致力于支持开发者能够使它的应用更易于访问，
其中就包括了由底层操作系统提供的一流的无障碍支持，

[UI Design and styling][]

[Assistive Technologies (Screen Reader) supports][]

[UI Design and styling]: /ui/accessibility/ui-design-and-styling
[Assistive Technologies (Screen Reader) supports]:/ui/accessibility/assistive-technologies

## Accessibility regulations

Accessibility standards and regulations help ensure that products are
accessible to people with disabilities. Many of these have been enacted into
laws and policies, making them requirements for products and services.

*   **WCAG 2**: [Web Content Accessibility Guidelines (WCAG) 2][] is an
internationally recognized standard for making web content more accessible
to people with disabilities. It is a stable, technical standard developed
by the World Wide Web Consortium (W3C).

*   **EN 301 549**: [EN 301 549][] is the European harmonized standard for
accessibility requirements for Information and Communication Technology (ICT)
products and services.

*   **VPAT**: The [Voluntary Product Accessibility Template (VPAT)][] is a
free template that translates accessibility requirements and standards into
 actionable testing criteria for products and services.

Laws around the world require digital content and services to be accessible
to people with disabilities.
In the U.S., the [Americans with Disabilities Act (ADA)][] prohibits
discrimination in public accommodations.
[Section 508 of the Rehabilitation Act ][] requires federal agencies and their
contractors to meet WCAG standards for all ICT.

In the EU, the [European Accessibility Act (EAA)][] requires a wide range of
public and private sector services to be accessible, primarily using
the [EN 301 549][] as its technical basis.



[Web Content Accessibility Guidelines (WCAG) 2]: https://www.w3.org/WAI/standards-guidelines/wcag/
[EN 301 549]: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf
[Voluntary Product Accessibility Template (VPAT)]: https://www.itic.org/policy/accessibility/vpat

[Americans with Disabilities Act (ADA)]: https://www.ada.gov/
[Section 508 of the Rehabilitation Act]: https://www.section508.gov/
[European Accessibility Act (EAA)]: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en


## Building with accessibility in mind

## 思考如何构建无障碍应用

Ensuring that your app can be used by everyone means building accessibility
into it from the start. For some apps, that's easier said than done.
In the video below, two of our engineers take a mobile app from a dire
accessibility state to one that takes advantage of Flutter's built-in
widgets to offer a dramatically more accessible experience.

确保你的应用能够被所有人使用，
这意味着你需要从一开始就考虑到无障碍。
对于一些应用，说起来容易做起来难。
在下面的视频中，我们的两名工程师
从一个无障碍状态中获取了一个
Flutter 内置的 widget，
以提供更加便捷的体验。

<iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1N84y1c7hW&page=1&autoplay=false" title="Building Flutter apps with accessibility in mind" {{site.bili.set}}></iframe><br>
<p><a href="{{site.bili.video}}/BV1N84y1c7hW/" target="_blank" rel="noopener" title="在新标签页打开 'Building Flutter apps with accessibility in mind' 视频">Building Flutter apps with accessibility in mind</a></p>

## Accessibility release checklist

## 无障碍发布清单

Here is a non-exhaustive list of things to consider as you prepare your
app for release.

这里是一些应用发布前的你需要考虑的部分清单。

* **Active interactions**. Ensure that all active interactions do
  something. Any button that can
  be pushed should do something when pushed. For example, if you have a
  no-op callback for an `onPressed` event, change it to show a `SnackBar`
  on the screen explaining which control you just pushed.

  **主动交互**。 确保所有可以交互的地方都会给予反馈。
  任何按钮在按下之后都会做点什么。
  例如，如果你有一个“onPressed”事件的无操作回调，
  请改为显示一个“SnackBar”，并告诉用户刚才按下了哪个控件。

* **Screen reader testing**. The screen reader should be able to
  describe all controls on the page when you tap on them, and the
  descriptions should be intelligible. Test your app with [TalkBack][]
  (Android) and [VoiceOver][] (iOS).

  **屏幕阅读测试**。
  屏幕阅读器应该能够让你在点击控件时描述页面上所有的控件，
  并且描述应易于理解。请使用 [TalkBack][]（Android）
  以及 [VoiceOver][] (iOS) 测试你的应用。

* **Contrast ratios**. We encourage you to have a contrast ratio of at
  least 4.5:1 between controls or text and the background, with the
  exception of disabled components. Images should also be vetted for
  sufficient contrast.

  **对比度**。我们建议你至少将控件或文本与背景之间的比例
  设为 4.5 : 1，禁用的组件除外。图片也应该经过审核足够的对比度。

* **Context switching**. Nothing should change the user's context
  automatically while typing in information. Generally, the widgets
  should avoid changing the user's context without some sort of
  confirmation action.

  **上下文切换**。当用户输入信息时你不应改变其信息。
  通常来说，widget 应该避免在没有任何确认动作的情况下
  更改用户的上下文。

* **Tappable targets**. All tappable targets should be at least 48x48 pixels.

  **可点击的目标**。所有可点击的目标至少应为 48x48 像素。

* **Errors**. Important actions should be able to be undone. In fields
  that show errors, suggest a correction if possible.

  **错误**。所有重要动作应该能够被撤销。
  在有限范围内显示错误原因，
  如果可能的话，提供订正建议。

* **Color vision deficiency testing**. Controls should be usable and
  legible in colorblind and grayscale modes.

  **色觉辨认障碍测试**。控件应该可用并且在色盲和灰度模式下清晰可见。

* **Scale factors**. The UI should remain legible and usable at very
  large scale factors for text size and display scaling.

  **比例系数**。 文本大小和显示比例的用户界面应保持清晰易用。

[TalkBack]: https://support.google.com/accessibility/android/answer/6283677?hl=en
[VoiceOver]: https://www.apple.com/lae/accessibility/iphone/vision/

## Learn more

## 更多信息

To learn more about Flutter and accessibility, check out
the following articles written by community members:

如果你希望了解更多，尤其是如何配置 semantics tree，
请查看以下社区成员贡献的文章：

* [A deep dive into Flutter's accessibility widgets][]
* [Flutter: Crafting a great experience for screen readers][]

[A deep dive into Flutter's accessibility widgets]: {{site.medium}}/flutter-community/a-deep-dive-into-flutters-accessibility-widgets-eb0ef9455bc
[CRPD]: https://social.desa.un.org/issues/disability/crpd/article-9-accessibility
[Flutter: Crafting a great experience for screen readers]: https://blog.gskinner.com/archives/2022/09/flutter-crafting-a-great-experience-for-screen-readers.html
