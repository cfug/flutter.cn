---
# title: Implicit Animations
title: 隐式动画
# description: Where to find more information on using implicit animations in Flutter.
description: 在 Flutter 中寻找有关使用隐式动画的更多信息。
tags: 用户界面,Flutter UI,动画
keywords: 隐式动画
---

With Flutter's [animation library][],
you can add motion and create visual effects
for the widgets in your UI.
One part of the library is an assortment of widgets
that manage animations for you.
These widgets are collectively referred to as _implicit animations_,
or _implicitly animated widgets_, deriving their name from the
[`ImplicitlyAnimatedWidget`][] class that they implement.

通过 Flutter 的 [动画库][animation library]，
你可以为 UI 中的 widgets 添加动作并创造视觉效果。
有些库包含各种各样可以帮你管理动画的 widget。
这些 widgets 被统称为 **隐式动画** 或 **隐式动画 widget**，
其名字来源于它们所实现的 [`ImplicitlyAnimatedWidget`][] 类。

With implicit animations, you don't need to
manage an `AnimationController` or `Ticker`.
Instead, you pass a `duration` and an optional `curve`
to an implicitly animated widget, such as `AnimatedOpacity`.
When you update the widget with a new target value,
such as after calling `setState()`,
the widget automatically animates to that value:

<?code-excerpt "animation/implicit/lib/main.dart (fade-box-demo)"?>
```dart
import 'package:material_ui/material_ui.dart';

class FadeBoxDemo extends StatefulWidget {
  const FadeBoxDemo({super.key});

  @override
  State<FadeBoxDemo> createState() => _FadeBoxDemoState();
}

class _FadeBoxDemoState extends State<FadeBoxDemo> {
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        AnimatedOpacity(
          opacity: _visible ? 1 : 0,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
          child: const FlutterLogo(size: 100),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: () => setState(() => _visible = !_visible),
          child: const Text('Toggle opacity'),
        ),
      ],
    );
  }
}
```

**App source:** [implicit animation example][]

When no built-in implicitly animated widget covers
the property you want to animate,
you can build a custom implicit animation with [`TweenAnimationBuilder`][].

The following set of resources provides many ways to learn
about implicit animations in Flutter.

[animation library]: {{site.api}}/flutter/animation/animation-library.html
[implicit animation example]: {{site.repo.this}}/tree/main/examples/animation/implicit

## Documentation

## 文档

[Animations in Flutter codelab][]
<br> Learn about implicit and explicit animations
  and get hands-on experience adding implicit animations
  to a complete Flutter app.

[Flutter 动画编程练习 (Codelab)][Animations in Flutter codelab]
<br> 了解隐式动画和显式动画，并通过实践来掌握在 Flutter 应用中添加隐式动画。

[`AnimatedContainer` sample][]
<br> A step-by-step recipe for using the
  [`AnimatedContainer`][] implicitly animated widget.

[`AnimatedContainer` 示例][`AnimatedContainer` sample]
<br>针对如何使用 [`AnimatedContainer`][] 隐式动画 widget 进行了手把手的指导。

[Fade a widget in and out][]
<br>A cookbook recipe showing how to fade a widget using [`AnimatedOpacity`][].

[让 widget 渐显渐隐][Fade a widget in and out]
<br>演示了如何使用 [`AnimatedOpacity`][] 使 widget 渐显渐隐。

[`TweenAnimationBuilder`][] API page
<br>Create custom implicit animations for any property using a `Tween`
  and a `builder` callback.

[`TweenAnimationBuilder`][] API 页面
<br>使用 `Tween` 和 `builder` 回调，
  来为任何属性创建自定义隐式动画。

[`ImplicitlyAnimatedWidget`][] API page
<br> All implicit animations extend the `ImplicitlyAnimatedWidget` class.

[`ImplicitlyAnimatedWidget`][] API 页面
<br>所有隐式动画都扩展了 `ImplicitlyAnimatedWidget` 类。

[Animations in Flutter codelab]: {{site.codelabs}}/advanced-flutter-animations
[`AnimatedContainer` sample]: /cookbook/animation/animated-container
[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[`AnimatedOpacity`]: {{site.api}}/flutter/widgets/AnimatedOpacity-class.html
[Fade a widget in and out]: /cookbook/animation/opacity-animation
[`ImplicitlyAnimatedWidget`]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
[`TweenAnimationBuilder`]: {{site.api}}/flutter/widgets/TweenAnimationBuilder-class.html

## Flutter in Focus videos

## 聚焦 Flutter 视频

Flutter in Focus videos feature 5-10 minute tutorials
with real code that cover techniques
that every Flutter dev needs to know from top to bottom.
The following videos cover topics
that are relevant to implicit animations.

聚焦 Flutter 视频以 5 到 10 分钟的实战代码为特点，涵盖了每个 Flutter 开发人员都需要从头到尾了解的技术。
下列视频涵盖了所有与隐式动画相关的话题。

<YouTubeEmbed id="IVTjpW3W33s" title="Flutter 隐式动画基础知识"></YouTubeEmbed> <!-- Flutter implicit animation basics -->

<YouTubeEmbed id="6KiPEqzJIKQ" title="使用 TweenAnimationBuilder 创建自定义隐式动画"></YouTubeEmbed> <!-- Create custom implicit animations with TweenAnimationBuilder -->

## The Boring Show

Watch the Boring Show to follow Google engineers building apps
from scratch in Flutter. The following episode covers
using implicit animations in a news aggregator app.

观看《The Boring Show》，跟随谷歌工程师用 Flutter 从零开始构建应用程序。
下面这一集涉及在一个新闻聚合器应用中使用隐式动画。

<YouTubeEmbed id="8ehlWchLVlQ" title="了解 Hacker News 应用的隐式动画设计"></YouTubeEmbed> <!-- Adding implicit animations to a news application -->

## Widget of the Week videos

## 每周 Widget 视频

A weekly series of short animated videos each showing
the important features of one particular widget.
In about 60 seconds, you'll see real code for each
widget with a demo about how it works.
The following Widget of the Week videos cover
implicitly animated widgets:

每周都有一个系列的动画短片，每个短片都展示了一个特定 widget 的核心功能。
在大约六十秒的时间里，你将会看到每个 widget 的实战代码，以及关于它是如何工作的演示。
下列「每周 Widget」视频涉及了隐含动画 widget 有：

<div class="card-grid wide">
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1W54y1U7ma&page=1&autoplay=false" title="AnimatedOpacity" {{site.bili.set}}></iframe>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1354y1U7gU&page=1&autoplay=false" title="AnimatedPadding" {{site.bili.set}}></iframe>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1T54y1D7hk&page=1&autoplay=false" title="AnimatedPositioned" {{site.bili.set}}></iframe>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1dv4y1o7BG&page=1&autoplay=false" title="AnimatedSwitcher" {{site.bili.set}}></iframe>
    </div>
  </div>
</div>
