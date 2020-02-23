---
title: Animate a widget across screens
title: 跨页面切换的动效 Widget (Hero animations)
prev:
  title: Report errors to a service
  title: 把报错信息通过服务上传
  path: /docs/cookbook/maintenance/error-reporting
next:
  title: Navigate to a new screen and back
  title: 导航到一个新页面和返回
  path: /docs/cookbook/navigation/navigation-basics
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

It's often helpful to guide users through an app as they navigate from screen
to screen. A common technique to lead users through an app is to animate a
widget from one screen to the next. This creates a visual anchor connecting
the two screens.

在页面跳转过程中给用户加以引导是非常有用的。实现引导的一种通用做法是在页面切换时为某个组件加上转场动画，从而在两个页面间建立视觉上的锚定关联。

Use the [`Hero`][] widget
to animate a widget from one screen to the next.

在 Flutter 中，可以通过 [`Hero`][] widget 实现页面切换时组件的转场动画。

This recipe uses the following steps:

这个教程将包含以下步骤：

  1. Create two screens showing the same image.

     创建两个页面，展示相同的图片

  2. Add a `Hero` widget to the first screen.

     在第一个页面中加入 `Hero` 组件

  3. Add a `Hero` widget to the second screen.

     在第二个页面中加入 `Hero` 组件

## 1. Create two screens showing the same image

## 1. 创建两个页面，展示相同的图片

In this example, display the same image on both screens.
Animate the image from the first screen to the second screen when
the user taps the image. For now, create the visual structure;
handle animations in the next steps.

在这个示例中，将在两个页面中展示相同的图片。当用户在第一个页面点击图片，会通过一个转场动画切换到第二个页面。现在，我们将会创建页面的视觉结构，并在后续步骤中处理动画。

{{site.alert.note}}

  This example builds upon the
  [Navigate to a new screen and back][]
  and [Handle taps][] recipes.
  
  这个示例建立在 [导航到一个新页面和返回](/docs/cookbook/navigation/navigation-basics) 和 [处理点击事件](/docs/cookbook/gestures/handling-taps) 这两个章节的基础上。
  
{{site.alert.end}}


```dart
class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Main Screen'),
      ),
      body: GestureDetector(
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (_) {
            return DetailScreen();
          }));
        },
        child: Image.network(
          'https://picsum.photos/250?image=9',
        ),
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {
          Navigator.pop(context);
        },
        child: Center(
          child: Image.network(
            'https://picsum.photos/250?image=9',
          ),
        ),
      ),
    );
  }
}
```

## 2. Add a `Hero` widget to the first screen

## 2. 在第一个页面中加入 `Hero` 组件

To connect the two screens together with an animation, wrap
the `Image` widget on both screens in a `Hero` widget.
The `Hero` widget requires two arguments:

为了通过动画在两个页面间建立联系，需要把每个页面的 `Image` 组件都包裹进 `Hero` 组件里面。`Hero` 组件有两个参数：

<dl>
  <dt>`tag`</dt>
  
  <dd><p>An object that identifies the `Hero`. It must be the same on both screens.</p><p>作为 `Hero` 组件的标识，在这两个页面中必须相同。</p></dd>

  <dt>`child`</dt>
  
  <dd><p>The widget to animate across screens.</p><p>在两个屏幕直接跨越的那个 widget。</p></dd>
  
</dl>

<!-- skip -->
```dart
Hero(
  tag: 'imageHero',
  child: Image.network(
    'https://picsum.photos/250?image=9',
  ),
);
```

## 3. Add a `Hero` widget to the second screen

## 3. 在第二个页面中加入 `Hero` 组件

To complete the connection with the first screen,
wrap the `Image` on the second screen with a `Hero`
widget that has the same `tag` as the `Hero` in the first screen.

为了完善与第一个页面的关联，同样需要把第二个页面中的 `Image` 组件包裹进 `Hero` 组件里面。它的 `tag` 也必须和第一个页面相同。

After applying the `Hero` widget to the second screen,
the animation between screens just works.

当 `Hero` 组件被应用到第二个页面后，页面的转场动画就生效了。

<!-- skip -->
```dart
Hero(
  tag: 'imageHero',
  child: Image.network(
    'https://picsum.photos/250?image=9',
  ),
);
```

{{site.alert.note}}

  This code is identical to what you have on the first screen.
  As a best practice, create a reusable widget instead of
  repeating code. This example uses identical code for both
  widgets, for simplicity.

  这份代码和第一个页面中的代码是相同的。
  实际上，可以创建一个可复用的组件来代替这些重复的代码。
  但是在这个示例中，重复的代码会更易于讲解和演示。
  
{{site.alert.end}}

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
import 'package:flutter/material.dart';

void main() => runApp(HeroApp());

class HeroApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Transition Demo',
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Main Screen'),
      ),
      body: GestureDetector(
        child: Hero(
          tag: 'imageHero',
          child: Image.network(
            'https://picsum.photos/250?image=9',
          ),
        ),
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (_) {
            return DetailScreen();
          }));
        },
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        child: Center(
          child: Hero(
            tag: 'imageHero',
            child: Image.network(
              'https://picsum.photos/250?image=9',
            ),
          ),
        ),
        onTap: () {
          Navigator.pop(context);
        },
      ),
    );
  }
}
```

<noscript>
  <img src="/images/cookbook/hero.gif" alt="Hero demo" class="site-mobile-screenshot" />
</noscript>


[Handle taps]: /docs/cookbook/gestures/handling-taps
[`Hero`]: {{site.api}}/flutter/widgets/Hero-class.html
[Navigate to a new screen and back]: /docs/cookbook/navigation/navigation-basics
