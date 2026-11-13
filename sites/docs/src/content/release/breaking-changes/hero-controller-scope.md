---
# title: More strict assertions in the Navigator and the Hero controller scope
title: Navigator 与 Hero 控制器作用域中更严格的断言
# description: >
#   Added additional assertions to guarantee that
#   one hero controller scope can only subscribe to one navigator at a time.
description: >-
  增加了额外断言，保证一个 Hero 控制器作用域
  一次只能订阅一个 navigator。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The framework throws an assertion error when it detects there are
multiple navigators registered with one hero controller scope.

当框架检测到多个 navigator 注册到同一个 Hero 控制器作用域时，
会抛出断言错误。

## Context

## 背景

The hero controller scope hosts a hero controller for its widget
subtree. The hero controller can only support one navigator at
a time. Previously, there was no assertion to guarantee that.

Hero 控制器作用域为其 widget 子树托管一个 Hero 控制器。
Hero 控制器一次只能支持一个 navigator。
以前没有断言来保证这一点。

## Description of change

## 变更说明

If the code starts throwing assertion errors after this change,
it means the code was already broken even before this change.
Multiple navigators may be registered under the same hero
controller scope, and they can not trigger hero animations when
their route changes. This change only surfaced this problem.

如果代码在此次变更后开始抛出断言错误，
说明这些代码在变更之前就已经有问题。
多个 navigator 可能注册在同一个 Hero 控制器作用域下，
路由变化时无法触发 Hero 动画。
此次变更只是把这个问题暴露出来。

## Migration guide

## 迁移指南

An example application that starts to throw exceptions.

下面是一个开始抛出异常的示例应用。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      builder: (BuildContext context, Widget child) {
        // Builds two parallel navigators. This throws
        // error because both of navigators are under the same
        // hero controller scope created by MaterialApp.
        return Stack(
          children: <Widget>[
            Navigator(
              onGenerateRoute: (RouteSettings settings) {
                return MaterialPageRoute<void>(
                  settings: settings,
                  builder: (BuildContext context) {
                    return const Text('first Navigator');
                  }
                );
              },
            ),
            Navigator(
              onGenerateRoute: (RouteSettings settings) {
                return MaterialPageRoute<void>(
                  settings: settings,
                  builder: (BuildContext context) {
                    return const Text('Second Navigator');
                  }
                );
              },
            ),
          ],
        );
      }
    )
  );
}
```

You can fix this application by introducing your own hero controller scopes.

你可以通过引入自己的 Hero 控制器作用域来修复此应用。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      builder: (BuildContext context, Widget child) {
        // Builds two parallel navigators.
        return Stack(
          children: <Widget>[
            HeroControllerScope(
              controller: MaterialApp.createMaterialHeroController(),
              child: Navigator(
                onGenerateRoute: (RouteSettings settings) {
                  return MaterialPageRoute<void>(
                    settings: settings,
                    builder: (BuildContext context) {
                      return const Text('first Navigator');
                    }
                  );
                },
              ),
            ),
            HeroControllerScope(
              controller: MaterialApp.createMaterialHeroController(),
              child: Navigator(
                onGenerateRoute: (RouteSettings settings) {
                  return MaterialPageRoute<void>(
                    settings: settings,
                    builder: (BuildContext context) {
                      return const Text('second Navigator');
                    }
                  );
                },
              ),
            ),
          ],
        );
      }
    )
  );
}
```

## Timeline

## 时间线

Landed in version: 1.20.0<br>
合入版本：1.20.0<br>
In stable release: 1.20

进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`Navigator`][]
* [`HeroController`][]
* [`HeroControllerScope`][]

Relevant issue:

相关 issue：

* [Issue 45938][]

Relevant PR:

相关 PR：

* [Clean up hero controller scope][]

  [清理 Hero 控制器作用域][Clean up hero controller scope]

[Clean up hero controller scope]: {{site.repo.flutter}}/pull/60655
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`HeroController`]: {{site.api}}/flutter/widgets/HeroController-class.html
[`HeroControllerScope`]: {{site.api}}/flutter/widgets/HeroControllerScope-class.html
[Issue 45938]: {{site.repo.flutter}}/issues/45938
