---
# title: CupertinoTabBar requires Localizations parent
title: CupertinoTabBar 需要 Localizations 父级
# description: >
#   In order to provide locale appropriate semantics, the
#   CupertinoTabBar requires a Localizations parent.
description: >
  为了提供符合语言环境的语义，CupertinoTabBar
  需要一个 Localizations 父级。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Instances of `CupertinoTabBar` must have a
`Localizations`parent in order to provide a localized
`Semantics` hint. Trying to instantiate a
`CupertinoTabBar` without localizations
results in an assertion such as the following:

`CupertinoTabBar` 实例必须有一个 `Localizations` 父级，
才能提供本地化的 `Semantics` 提示。
在没有本地化信息的情况下实例化 `CupertinoTabBar`，
会产生类似下面的断言：

```plaintext
CupertinoTabBar requires a Localizations parent in order to provide an appropriate Semantics hint
for tab indexing. A CupertinoApp provides the DefaultCupertinoLocalizations, or you can
instantiate your own Localizations.
'package:flutter/src/cupertino/bottom_tab_bar.dart':
Failed assertion: line 213 pos 7: 'localizations != null'
```

## Context

## 上下文

To support localized semantics information,
the `CupertinoTabBar` requires localizations.

为了支持本地化的语义信息，`CupertinoTabBar`
需要本地化信息。

Before this change, the `Semantics` hint provided
to the `CupertinoTabBar` was a hard-coded String,
'tab, $index of $total'. The content of the semantics
hint was also updated from this original
String to 'Tab $index of $total' in English.

在此改动之前，提供给 `CupertinoTabBar` 的
`Semantics` 提示是硬编码字符串
'tab, $index of $total'。
语义提示的内容也从原来的字符串
更新为英文的 'Tab $index of $total'。

If your `CupertinoTabBar` is within the scope
of a `CupertinoApp`, the `DefaultCupertinoLocalizations`
is already instantiated and may suit your
needs without having to make a change to your existing code.

如果 `CupertinoTabBar` 位于 `CupertinoApp` 的范围内，`DefaultCupertinoLocalizations`
已经实例化，
现有代码可能无需改动就能满足需求。

If your `CupertinoTabBar` is not within a `CupertinoApp`,
you may provide the localizations of
your choosing using the `Localizations` widget.

如果 `CupertinoTabBar` 不在 `CupertinoApp` 内，
你可以用 `Localizations` widget
提供自己选择的本地化信息。

## Migration guide

## 迁移指南

If you are seeing a `'localizations != null'` assertion error,
make sure locale information is being
provided to your `CupertinoTabBar`.

如果看到 `'localizations != null'` 断言错误，
请确保正在向 `CupertinoTabBar` 提供语言环境信息。

Code before migration:

迁移之前的代码：

```dart
import 'package:flutter/cupertino.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MediaQuery(
      data: const MediaQueryData(),
      child: CupertinoTabBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled),
            label: 'Tab 1',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled_solid),
            label: 'Tab 2',
          ),
        ],
        currentIndex: 1,
      ),
    );
  }
}
```

Code after migration (Providing localizations via the `CupertinoApp`):

迁移之后的代码（通过 `CupertinoApp` 提供本地化）：

```dart
import 'package:flutter/cupertino.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      home: CupertinoTabBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled),
            label: 'Tab 1',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled_solid),
            label: 'Tab 2',
          ),
        ],
        currentIndex: 1,
      ),
    );
  }
}
```

Code after migration (Providing localizations by using
the `Localizations` widget):

迁移之后的代码（使用 `Localizations` widget 提供本地化）：

```dart
import 'package:flutter/cupertino.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Localizations(
      locale: const Locale('en', 'US'),
      delegates: <LocalizationsDelegate<dynamic>>[
        DefaultWidgetsLocalizations.delegate,
        DefaultCupertinoLocalizations.delegate,
      ],
      child: MediaQuery(
        data: const MediaQueryData(),
        child: CupertinoTabBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(CupertinoIcons.add_circled),
              label: 'Tab 1',
            ),
            BottomNavigationBarItem(
              icon: Icon(CupertinoIcons.add_circled_solid),
              label: 'Tab 2',
            ),
          ],
          currentIndex: 1,
        ),
      ),
    );
  }
}
```

## Timeline

## 时间线

Landed in version: 1.18.0-9.0.pre<br>
In stable release: 1.20.0

合入版本：1.18.0-9.0.pre<br>
进入稳定版：1.20.0

## References

## 参考资料

API documentation:

API 文档：

* [`CupertinoTabBar`][]
* [`Localizations`][]
* [`DefaultCupertinoLocalizations`][]
* [`Semantics`][]
* [`CupertinoApp`][]
* [Internationalizing Flutter Apps][]

  [Flutter 应用国际化][Internationalizing Flutter Apps]


Relevant PR:

相关 PR：

* [PR 55336: Adding tabSemanticsLabel to CupertinoLocalizations][]

  [PR 55336：为 CupertinoLocalizations
  添加 tabSemanticsLabel][PR 55336: Adding tabSemanticsLabel
  to CupertinoLocalizations]

* [PR 56582: Update Tab semantics in Cupertino to be the same as Material][]

  [PR 56582：将 Cupertino 中的 Tab
  语义更新为与 Material 一致][PR 56582: Update Tab semantics
  in Cupertino to be the same as Material]

[`CupertinoTabBar`]: {{site.api}}/flutter/cupertino/CupertinoTabBar-class.html
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[`DefaultCupertinoLocalizations`]: {{site.api}}/flutter/cupertino/DefaultCupertinoLocalizations-class.html
[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[Internationalizing Flutter Apps]: /ui/internationalization
[PR 55336: Adding tabSemanticsLabel to CupertinoLocalizations]: {{site.repo.flutter}}/pull/55336
[PR 56582: Update Tab semantics in Cupertino to be the same as Material]: {{site.repo.flutter}}/pull/56582#issuecomment-625497951
