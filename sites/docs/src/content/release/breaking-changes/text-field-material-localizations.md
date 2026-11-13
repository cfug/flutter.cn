---
# title: TextField requires a MaterialLocalizations widget
title: TextField 需要 MaterialLocalizations widget
# description: >
#   TextField now throws an assert error if there is
#   no MaterialLocalizations widget in the widget tree.
description: >
  如果 widget 树中没有 MaterialLocalizations widget，TextField
  现在会抛出断言错误。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Instances of `TextField` must have a
`MaterialLocalizations` present in the widget tree.
Trying to instantiate a `TextField` without the proper localizations
results in an assertion such as the following:

`TextField` 实例的 widget 树中必须有 `MaterialLocalizations`。
在没有正确本地化信息的情况下实例化 `TextField`，
会产生类似下面的断言：

```plaintext
No MaterialLocalizations found.
TextField widgets require MaterialLocalizations to be provided by a Localizations widget ancestor.
The material library uses Localizations to generate messages, labels, and abbreviations.
To introduce a MaterialLocalizations, either use a MaterialApp at the root of your application to
include them automatically, or add a Localization widget with a MaterialLocalizations delegate.
The specific widget that could not find a MaterialLocalizations ancestor was:
  TextField
```

## Context

## 上下文

If the `TextField` descends from a `MaterialApp`, the
`DefaultMaterialLocalizations` is already instantiated
and won't require any changes to your existing code.

如果 `TextField` 是 `MaterialApp` 的后代，`DefaultMaterialLocalizations`
已经实例化，
现有代码不需要改动。

If the `TextField` doesn't descend from `MaterialApp`,
you can use a `Localizations` widget to
provide your own localizations.

如果 `TextField` 不是 `MaterialApp` 的后代，
你可以用 `Localizations` widget
提供自己的本地化信息。

## Migration guide

## 迁移指南

If you see an assertion error, make sure that
locale information is available to the `TextField`,
either through an ancestor `MaterialApp`
(that automatically provides `Localizations`), or
by creating your own `Localizations` widget.

如果看到断言错误，请确保 `TextField` 能拿到语言环境信息。
可以通过祖先 `MaterialApp`
（它会自动提供 `Localizations`），
也可以自己创建 `Localizations` widget。

Code before migration:

迁移之前的代码：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MediaQuery(
      data: const MediaQueryData(),
      child: Directionality(
        textDirection: TextDirection.ltr,
        child: Material(
          child: TextField(),
        ),
      ),
    );
  }
}
```

Code after migration (Providing localizations using the `MaterialApp`):

迁移之后的代码（通过 `MaterialApp` 提供本地化）：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Material(
        child: TextField(),
      ),
    );
  }
}
```

Code after migration (Providing localizations via the `Localizations` widget):

迁移之后的代码（通过 `Localizations` widget 提供本地化）：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Localizations(
      locale: const Locale('en', 'US'),
      delegates: const <LocalizationsDelegate<dynamic>>[
        DefaultWidgetsLocalizations.delegate,
        DefaultMaterialLocalizations.delegate,
      ],
      child: MediaQuery(
        data: const MediaQueryData(),
        child: Directionality(
          textDirection: TextDirection.ltr,
          child: Material(
            child: TextField(),
          ),
        ),
      ),
    );
  }
}
```

## Timeline

## 时间线

Landed in version: 1.20.0-1.0.pre<br>
In stable release: 1.20

合入版本：1.20.0-1.0.pre<br>
进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`TextField`][]
* [`Localizations`][]
* [`MaterialLocalizations`][]
* [`DefaultMaterialLocalizations`][]
* [`MaterialApp`][]
* [Internationalizing Flutter apps][]

  [Flutter 应用国际化][Internationalizing Flutter apps]

Relevant PR:

相关 PR：

* [PR 58831: Assert debugCheckHasMaterialLocalizations on TextField][]

  [PR 58831：在 TextField 上断言
  debugCheckHasMaterialLocalizations][PR 58831: Assert
  debugCheckHasMaterialLocalizations on TextField]

[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[`MaterialLocalizations`]: {{site.api}}/flutter/material/MaterialLocalizations-class.html
[`DefaultMaterialLocalizations`]: {{site.api}}/flutter/material/DefaultMaterialLocalizations-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[Internationalizing Flutter apps]: /ui/internationalization
[PR 58831: Assert debugCheckHasMaterialLocalizations on TextField]: {{site.repo.flutter}}/pull/58831
