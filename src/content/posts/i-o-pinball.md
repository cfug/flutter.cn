---
title: 使用 Flutter 与 Firebase 制作弹球游戏
toc: true
keywords: 弹球游戏, pinball, Firebase, Flutter 游戏开发
description: 让 Flutter 游戏开发能力更上一层楼。
image:
    path: https://files.flutter-io.cn/events/gdd2022/pinball/pinball_share_image.png
---

*文/ Very Good Ventures 团队，5 月 11 日发表于 Flutter 官方博客*

![](https://files.flutter-io.cn/events/gdd2022/pinball/pinball_share_image.png)

Flutter 团队使用 Flutter 以及 Firebase 构建了一款经典的弹球游戏。
下面将会介绍我们是如何通过 Flame 游戏引擎将 [Flutter 弹球游戏](https://pinball.flutter.cn/ "Flutter 弹球游戏主页") 带到 Web 端的。

## 游戏开发要点

使用 Flutter 打造用户交互类型的游戏是一个很棒的选择，例如拼图或者文字游戏这样的游戏。
[Flame](https://docs.flame-engine.org/ "Flame 开发文档主页") 是一个在 Flutter 上构建的 2D 游戏引擎，
当涉及到使用游戏循环的游戏时它会非常有用。
Flutter 弹球游戏使用了 Flame 提供的一系列特性，例如动画、物理引擎、碰撞检测等等，
同时还借助了 Flutter 框架的基础架构。
如果你能用 Flutter 构建应用，你就获得 Flame 构建游戏所需的基础。

![](https://files.flutter-io.cn/posts/images/2022/05/8Qcwcy.jpg)

## 游戏循环

通常来说应用屏幕在没有用户交互事件的时候都会保持视觉静止状态。
游戏中则是相反的—— UI 会持续的渲染，而且游戏状态会不断变化。
Flame 提供了一个 game widget，它内部管理了一个游戏循环，
所以能恒定且高效地进行渲染。`Game` 类包含了游戏组件以及其逻辑的实现，
然后被交给 widget 树中的 `GameWidget`。
在 Flutter 弹球游戏中，游戏循环反映了弹球在游戏场的位置以及状态，
然后如果球与物体碰撞或跌出比赛则需要给出必要的反馈。


```dart
@override
void update(double dt) {
  super.update(dt);
  final direction = -parent.body.linearVelocity.normalized();
  angle = math.atan2(direction.x, -direction.y);
  size = (_textureSize / 45) * 
    parent.body.fixtures.first.shape.radius;
}
```

## 使用 2D 组件渲染 3D 空间

在做 Flutter 弹球游戏的时候，其中遇到的一个挑战即是如何使用 2D 元素渲染一个 3D 的交互体验。
组件需要知道在屏幕上渲染的前后顺序。
例如，当小球发射到斜坡上时，它的顺序会向前，这样就会让它看起来出现在斜坡的顶部。

![](https://files.flutter-io.cn/posts/images/2022/05/Ko46wg.jpg)

弹球、弹射活塞、挡板以及 Chrome 小恐龙等等这些元素都是可活动的，这意味着它应该遵循真实世界的物理规则。
而且弹球也需要根据它在板子上的位置改变其大小。当弹球滚到顶部时，
它应该越来越小，以让它看着离用户更远。此外，重力还会让弹球调整角度，让它能在斜坡上更快地落下。

```dart
/// Scales the ball's body and sprite according to its position on the board.
class BallScalingBehavior extends Component with ParentIsA<Ball> {
  @override
  void update(double dt) {
    super.update(dt);
    final boardHeight = BoardDimensions.bounds.height;
    const maxShrinkValue = BoardDimensions.perspectiveShrinkFactor;
    final standardizedYPosition = parent.body.position.y +   (boardHeight / 2);
    final scaleFactor = maxShrinkValue +
        ((standardizedYPosition / boardHeight) * (1 - maxShrinkValue));
parent.body.fixtures.first.shape.radius = (Ball.size.x / 2) * scaleFactor;
final ballSprite = parent.descendants().whereType<SpriteComponent>();
    if (ballSprite.isNotEmpty) {
      ballSprite.single.scale.setValues(
        scaleFactor,
        scaleFactor,
      );
    }
  }
}
```

## Forge 2D 的物理引擎

Flutter 弹球游戏很大程度依赖了 Flame 团队维护的
[forge2d](https://pub.flutter-io.cn/packages/forge2d "Flame 团队维护的 package: forge2d") package。
这个 package 将开源的 [Box2D 物理引擎](https://box2d.org/ "Box2D 物理引擎官网") 移植到 Dart 中，以便可以轻松集成到 Flutter。
我们使用 `forge2d` 增强游戏中的物理特性，例如物体（夹板）在游戏场上的之间的碰撞检测。
使用 `forge2D` 能够我们监听夹板发生碰撞的时机。
我们就可以在这里向夹板添加交互的回调，当两个物体发生碰撞的时候我们就能收到通知。
例如，弹球（它是圆形的）与弹簧（它是椭圆形的）接触时，我们就会增加它的得分。
在这些回调中，我们可以清楚地设置接触开始和结束的位置，
以便当两个物体相互接触时，会发生碰撞。

```dart
@override
Body createBody() {
  final shape = CircleShape()..radius = size.x / 2;
  final bodyDef = BodyDef(
    position: initialPosition,
    type: BodyType.dynamic,
    userData: this,
  );
  return world.createBody(bodyDef)
    ..createFixtureFromShape(shape, 1);
}
```

## Sprite sheet 动画

在弹球游戏场中有一些小东西，
例如 Android、Dash（Dart 吉祥物）、Sparky（Firebase 吉祥物）以及 Chrome 小恐龙，这些都是动画。
对于这些东西，我们使用了 sprite sheets，它已经包含在 Flame 引擎中了，
叫做 `SpriteAnimationComponent`。
对于每个元素，我们都有一个文件，其中包含不同方向的图像、文件中的帧数以及帧之间的时间。
使用这些数据，Flame 中的 `SpriteAnimationComponent` 能够在一个循环中将所有图像编在一起，
使元素看起来在运动。

![△ Sprite sheet 示例](https://files.flutter-io.cn/posts/images/2022/05/sMkc3K.jpg)

△ Sprite sheet 示例

```dart
final spriteSheet = gameRef.images.fromCache(
  Assets.images.android.spaceship.animatronic.keyName,
);
const amountPerRow = 18;
const amountPerColumn = 4;
final textureSize = Vector2(
  spriteSheet.width / amountPerRow,
  spriteSheet.height / amountPerColumn,
);
size = textureSize / 10;
animation = SpriteAnimation.fromFrameData(
  spriteSheet,
  SpriteAnimationData.sequenced(
    amount: amountPerRow * amountPerColumn,
    amountPerRow: amountPerRow,
    stepTime: 1 / 24,
    textureSize: textureSize,
  ),
);
```

接下来详细解析 Flutter 弹球游戏代码。

## 来自 Firebase 的实时积分排行榜

Flutter 弹球排行榜实时地显示世界各地玩家的最高分数。
我们使用 Firebase [Cloud Firestore](https://firebase.google.cn/docs/firestore "Firebase Cloud Firestore 文档") 记录排名前十的分数，将其显示在排行榜上。
当一个新的分数计入排行榜时，一个 [Cloud Function](https://firebase.google.cn/docs/functions "Firebase Cloud Function 文档") 会将分数按降序排列并删除目前不在前十的分数。

![](https://files.flutter-io.cn/posts/images/2022/05/PTfsgf.png)

```dart
/// Acquires top 10 [LeaderboardEntryData]s.
Future<List<LeaderboardEntryData>> fetchTop10Leaderboard() async {
  try {
    final querySnapshot = await _firebaseFirestore
      .collection(_leaderboardCollectionName)
      .orderBy(_scoreFieldName, descending: true)
      .limit(_leaderboardLimit)
      .get();
    final documents = querySnapshot.docs;
    return documents.toLeaderboard();
  } on LeaderboardDeserializationException {
    rethrow;
  } on Exception catch (error, stackTrace) {
    throw FetchTop10LeaderboardException(error, stackTrace);
  }
}
```

## 构建 Web 应用

与传统应用相比，制作响应式的游戏更容易。弹球游戏只需要根据设备的大小进行缩放即可。
对于 Flutter 弹球游戏，我们基于固定比例的设备大小进行缩放。
确保了无论在何种显示大小，坐标系统总是相同的。保证组件在不同设备之间的一致显示和交互非常重要。

Flutter 弹球游戏也适配了移动和桌面浏览器。
在移动浏览器上，用户可以点击启动按钮开始播放，也可以点击屏幕左右两侧来控制相应的挡板。
在桌面浏览器上，用户可以使用键盘来发射弹球和控制挡板。

## 代码架构

弹球代码遵循分层架构，每个功能都在自己的文件夹中。
在这个项目中，游戏逻辑也与视觉组件分离。让我们能独立于游戏逻辑轻松地更新视觉元素。
弹球游戏的主题取决于玩家在游戏开始前选择的角色。主题是由 `CharacterThemeCubit` 类控制的。
根据角色的选择，球的颜色、背景和其他元素都会更新。

![](https://files.flutter-io.cn/posts/images/2022/05/BPnkOM.png)

```dart
/// {@template character_theme}
/// Base class for creating character themes.
///
/// Character specific game components should have a getter specified here to
/// load their corresponding assets for the game.
/// {@endtemplate}
abstract class CharacterTheme extends Equatable {
  /// {@macro character_theme}
  const CharacterTheme();
/// Name of character.
  String get name;
/// Asset for the ball.
  AssetGenImage get ball;
/// Asset for the background.
  AssetGenImage get background;
/// Icon asset.
  AssetGenImage get icon;
/// Icon asset for the leaderboard.
  AssetGenImage get leaderboardIcon;
/// Asset for the the idle character animation.
  AssetGenImage get animation;
@override
  List<Object> get props => [
        name,
        ball,
        background,
        icon,
        leaderboardIcon,
        animation,
      ];
}
```

Flutter 弹球的游戏状态是用
[flam_bloc](https://pub.flutter-io.cn/packages/flame_bloc "Flutter package: flam_bloc 页面") 这个 package 处理的，
这是一个组合了 bloc 和 Flame 组件的 package。
例如，我们使用 `flame_bloc` 来记录剩余的游戏回合数、游戏中获得的奖励以及当前的游戏分数。
另外，在 wdget 树顶层有一个 widget，它包含加载页面的逻辑以及玩游戏的说明。
我们还遵循 [行为型模式](http://baike.baidu.com/l/i4znnfCN "百度百科: 设计模式行为型模式") 来封装和隔离基于组件的游戏功能元素。
例如，保险杠在被球击中时会发出声音，所以我们实现了 `BumperNoiseBehavior` 类来处理这个问题。


```dart
class BumperNoiseBehavior extends ContactBehavior {
  @override
  void beginContact(Object other, Contact contact) {
    super.beginContact(other, contact);
    readProvider<PinballPlayer>().play(PinballAudio.bumper);
  }
}
```

代码库还包含全面的单元测试、组件测试和黄金测试。测试游戏会带来一些挑战，
因为一个组件可能具有多个职责，使得它们很难单独地进行测试。
最终我们定义了更好的隔离和测试组件的模式，
并将其改进整合到
[flame_test](https://pub.flutter-io.cn/packages/flame_test "Flutter package: flame_test 页面") 这个 package 中。

## 组件沙盒

这个项目高度依赖于 Flame 组件带来的仿真弹球体验。
代码附带了一个组件沙盒，它类似于 Flutter Gallery 中展示的
[UI 组件库](https://gallery.flutter.cn/#/ "Flutter Gallery 网页版")。
在开发游戏时，这是一个很有用的工具，
因为它提供了独立的每个游戏组件以确保它们的外观和行为符合预期，然后再将它们整合到游戏中。

## 接下来

邀请你来 [Flutter Pinball](https://pinball.flutter.cn/ "Flutter Pinball 弹球游戏") 试玩并获取高分！
关注积分排行榜并且在社交媒体上分享你的分数，
也可以在 [GitHub repo](https://github.com/flutter/pinball "弹球游戏源代码仓库") 访问并学习项目的开源代码。

---
[原文](https://medium.com/flutter/i-o-pinball-powered-by-flutter-and-firebase-d22423f3f5d)，
本地化：CFUG 团队，[中文链接](https://flutter.cn/posts/i-o-pinball)。