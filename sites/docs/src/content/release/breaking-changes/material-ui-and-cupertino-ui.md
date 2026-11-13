---
# title: Migrate to standalone material_ui and cupertino_ui packages
title: 迁移到独立的 material_ui 与 cupertino_ui package
# description: >-
#   The Material and Cupertino design libraries are now available as
#   standalone packages, decoupling design systems from the Flutter SDK.
description: >-
  Material 与 Cupertino 设计库现在以独立 package 提供，
  从而把设计系统从 Flutter SDK 中解耦出来。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The Material and Cupertino design libraries are now available as
standalone packages: [`package:material_ui`][] and [`package:cupertino_ui`][].
In Flutter 3.47, developers can opt in to these packages ahead of
the formal deprecation of the in-framework design libraries.

Material 与 Cupertino 设计库现在以独立 package 提供：
[`package:material_ui`][`package:material_ui`] 和
[`package:cupertino_ui`][`package:cupertino_ui`]。
在 Flutter 3.47 中，开发者可以在框架内设计库正式弃用之前，
提前选用这些 package。

## Background

## 背景

Historically, Flutter's Material (`package:flutter/material.dart`)
and Cupertino (`package:flutter/cupertino.dart`) widget libraries
were bundled directly inside the core Flutter SDK.
While this made it easy to get started with pixel-perfect widgets,
bundling design systems inside the core framework presented several challenges:

过去，Flutter 的 Material（`package:flutter/material.dart`）
和 Cupertino（`package:flutter/cupertino.dart`）widget 库
直接捆绑在核心 Flutter SDK 中。
这让人很容易上手像素级精确的 widget，
但把设计系统捆绑在核心框架中也带来了若干挑战：

* Widget updates, bug fixes, and new components were tied to
  quarterly Flutter SDK releases.

  Widget 更新、问题修复和新组件都绑定在
  Flutter SDK 的季度发布上。

* Contributions and iteration on design libraries moved slower
  than standalone Dart packages.

  设计库的贡献和迭代比独立的 Dart package 更慢。

* Applications couldn't update design libraries independently of
  the engine and framework.

  应用无法独立于引擎和框架来更新设计库。

To resolve these challenges, the design systems are now decoupled
from the core framework.
Starting in Flutter 3.47, version 1.0 of the standalone
`material_ui` and `cupertino_ui` packages is published on `pub.dev`.

为解决这些挑战，设计系统现在已从核心框架中解耦。
从 Flutter 3.47 开始，独立的 `material_ui` 和 `cupertino_ui`
package 的 1.0 版本已发布到 `pub.dev`。

Decoupling the design systems provides several benefits:

把设计系统解耦带来若干好处：

* **Independent release cycles**:
  The packages can ship bug fixes, improvements, and new components
  on their own release schedules (planned for weekly releases),
  without requiring a full Flutter SDK upgrade.

  **独立发布周期**：
  这些 package 可以按自己的发布节奏
  （计划每周发布）交付问题修复、改进和新组件，
  无需升级整个 Flutter SDK。

* **Faster contributions**:
  Community members can contribute directly to the libraries in the
  [`flutter/packages`][] repository.

  **更快的贡献**：
  社区成员可以直接向 [`flutter/packages`][`flutter/packages`]
  仓库中的库贡献代码。

* **Style-neutral core**:
  Decoupling lays the groundwork for a style-neutral Flutter core widget
  catalog, making it easier to build and maintain custom design systems.

  **风格中立的核心**：
  解耦为风格中立的 Flutter 核心 widget 目录奠定基础，
  让构建和维护自定义设计系统更加容易。

Contributions to `package:flutter/material.dart` and
`package:flutter/cupertino.dart` inside the core SDK were frozen
starting in Flutter 3.44.
The initial 1.0.0 versions of `package:material_ui` and `package:cupertino_ui`
match the frozen framework code to provide a seamless transition.
Future releases of the packages will use semantic versioning for major, minor,
and patch updates.
The in-framework design libraries are scheduled for formal deprecation
in an upcoming stable release.

从 Flutter 3.44 开始，核心 SDK 内
`package:flutter/material.dart` 和 `package:flutter/cupertino.dart`
的贡献已被冻结。
`package:material_ui` 和 `package:cupertino_ui` 最初的 1.0.0 版本
与冻结的框架代码一致，以便无缝过渡。
这些 package 的后续发布将对主版本、次版本和补丁更新使用语义化版本。
框架内的设计库计划在即将到来的稳定版中正式弃用。

## Migration guide

## 迁移指南

To migrate your project from the in-framework design libraries to the
standalone packages, you can use the automated `dart fix` tool
or perform the migration manually.

要把项目从框架内设计库迁移到独立 package，
可以使用自动化的 `dart fix` 工具，也可以手动迁移。

### Automated migration with dart fix

### 使用 dart fix 自动迁移

The quickest way to migrate is using the `migrate_design_widgets` fix rule
with `dart fix`:

最快的迁移方式是配合 `dart fix` 使用 `migrate_design_widgets` 修复规则：

```console
$ dart fix --apply --code=migrate_design_widgets
```

This command automatically updates your imports from
`package:flutter/material.dart` and `package:flutter/cupertino.dart`
to the corresponding standalone package imports.

该命令会自动把 import 从
`package:flutter/material.dart` 和 `package:flutter/cupertino.dart`
更新为对应的独立 package import。

:::note
If `dart fix` doesn't automatically add the new packages to your
`pubspec.yaml` dependencies, manually add them by running
`flutter pub add material_ui` or `flutter pub add cupertino_ui` as needed.

如果 `dart fix` 没有自动把新 package 加入 `pubspec.yaml` 依赖，
请按需手动运行 `flutter pub add material_ui` 或
`flutter pub add cupertino_ui`。
:::

Run `dart fix` once more to ensure all other automated migrations are applied,
and lint warnings addressed, such as import sorting.

再运行一次 `dart fix`，以确保其他自动迁移都已应用，
并且 lint 警告（例如 import 排序）已处理。

### Manual migration

### 手动迁移

To migrate manually, follow these steps:

要手动迁移，请按以下步骤操作：

1.  Add the standalone packages to your `pubspec.yaml` dependencies:

    将独立 package 添加到 `pubspec.yaml` 的依赖中：

    ```console
    $ flutter pub add material_ui
    $ flutter pub add cupertino_ui
    ```

1.  Update the imports in your Dart files to reference the new packages.

    更新 Dart 文件中的 import，使其引用新 package。

    Code before migration:

    迁移之前的代码：

    ```dart
    import 'package:flutter/cupertino.dart';
    import 'package:flutter/material.dart';
    ```

    Code after migration:

    迁移之后的代码：

    ```dart
    import 'package:cupertino_ui/cupertino_ui.dart';
    import 'package:material_ui/material_ui.dart';
    ```

### Compatibility bridge

### 兼容桥接

During the ecosystem transition, your application might depend on
third-party packages that still import the legacy in-framework libraries
(`package:flutter/material.dart` or `package:flutter/cupertino.dart`).

在生态过渡期间，你的应用可能依赖仍在导入旧框架内库
（`package:flutter/material.dart` 或 `package:flutter/cupertino.dart`）
的第三方 package。

To allow your application to migrate to the standalone packages immediately
without waiting for all dependencies to update, `material_ui` and
`cupertino_ui` provide compatibility bridge utilities.
Wrap your app using `MaterialUiCompatibilityBridge` inside
`MaterialApp.builder`:

为了让应用可以立即迁移到独立 package，
而不必等待所有依赖更新，`material_ui` 和 `cupertino_ui`
提供了兼容桥接工具。
在 `MaterialApp.builder` 中用 `MaterialUiCompatibilityBridge` 包裹应用：

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6750A4),
        ),
      ),
      builder: (BuildContext context, Widget? child) {
        return MaterialUiCompatibilityBridge(child: child!);
      },
      home: const HomeScreen(),
    );
  }
}
```

#### Bridge capabilities and limitations

#### 桥接的能力与限制

`MaterialUiCompatibilityBridge` injects theme and localization data
downward into the widget tree.
This allows unmigrated child widgets and dependencies that read design state
from context
(such as `Theme.of(context)` or `MaterialLocalizations.of(context)`)
to continue functioning properly.

`MaterialUiCompatibilityBridge` 会把主题和本地化数据
向下注入 widget 树。
这让尚未迁移、并从 context 读取设计状态的子 widget 和依赖
（例如 `Theme.of(context)` 或 `MaterialLocalizations.of(context)`）
可以继续正常工作。

However, the compatibility bridge cannot resolve type mismatches
when a dependency exposes, accepts, or returns in-framework SDK types
in its public API signatures (such as passing a `FloatingActionButtonLocation`,
`ColorScheme`, or `TextTheme` as a parameter or callback return value).
Because Dart enforces static typing across distinct package imports,
values from `package:flutter/material.dart` cannot be assigned to parameters
expecting types from `package:material_ui`.
Dependencies with API-signature coupling must be migrated to the standalone
package before your application can pass modern types to them.

不过，当依赖在公开 API 签名中暴露、接受或返回框架内 SDK 类型时
（例如把 `FloatingActionButtonLocation`、`ColorScheme` 或 `TextTheme`
作为参数或回调返回值传递），兼容桥接无法解决类型不匹配。
由于 Dart 对来自不同 package 的 import 强制静态类型，
来自 `package:flutter/material.dart` 的值不能赋给
期望 `package:material_ui` 类型的参数。
API 签名与框架类型耦合的依赖必须先迁移到独立 package，
应用才能把新类型传给它们。

### Decoupled localizations

### 解耦的本地化

As part of this transition, `flutter_localizations` is unbundled
for design components.
Localization delegates and translated strings for Material and Cupertino
widgets now reside directly in `package:material_ui` and
`package:cupertino_ui`.

作为这次过渡的一部分，设计组件的 `flutter_localizations` 已被拆出。
Material 和 Cupertino widget 的本地化委托与翻译字符串
现在直接位于 `package:material_ui` 和 `package:cupertino_ui` 中。

Code before migration:

迁移之前的代码：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

// ...
MaterialApp(
  localizationsDelegates: const <LocalizationsDelegate<dynamic>>[
    GlobalCupertinoLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  // ...
);
```

Code after migration:

迁移之后的代码：

```dart
import 'package:material_ui/material_ui.dart';

// ...
MaterialApp(
  localizationsDelegates: GlobalMaterialLocalizations.delegates,
  // ...
);
```

Setting `localizationsDelegates` to `GlobalMaterialLocalizations.delegates`
automatically includes the Cupertino and Widgets delegates as well,
simplifying localization setup.

把 `localizationsDelegates` 设为 `GlobalMaterialLocalizations.delegates`
也会自动包含 Cupertino 和 Widgets 委托，从而简化本地化配置。

### Guidance for package authors

### 给 package 作者的指引

If you maintain an open source package or plugin in the Flutter ecosystem,
migrating to `package:material_ui` or `package:cupertino_ui` introduces
a breaking change for consumers who haven't updated their dependencies.
While the symbols and class names remain the same,
they are technically referenced from an entirely new library.
Treat this migration as a major version bump for your package.

如果你维护 Flutter 生态中的开源 package 或插件，
迁移到 `package:material_ui` 或 `package:cupertino_ui`
对尚未更新依赖的使用者而言是破坏性改动。
虽然符号和类名保持不变，
但从技术上说，它们来自一个全新的库。
请把这次迁移视为 package 的主版本号升级。

## References

## 参考资料

Package documentation:

Package 文档：

* [`package:material_ui`][]
* [`package:cupertino_ui`][]

Relevant issues:

相关 issue：

* [Issue 191448][]

Relevant blog posts and announcements:

相关博客文章与公告：

* [What's new in Flutter 3.47][]

  [Flutter 3.47 的新功能][What's new in Flutter 3.47]

* [Flutter's Material and Cupertino code freeze][]

  [Flutter 的 Material 与
  Cupertino 代码冻结][Flutter's Material and Cupertino code freeze]

[`flutter/packages`]: {{site.repo.packages}}
[Issue 191448]: {{site.repo.flutter}}/issues/191448
[`package:cupertino_ui`]: {{site.pub-pkg}}/cupertino_ui
[`package:material_ui`]: {{site.pub-pkg}}/material_ui
[Flutter's Material and Cupertino code freeze]: {{site.main-url}}/blog/flutters-material-and-cupertino-code-freeze
[What's new in Flutter 3.47]: {{site.main-url}}/blog/whats-new-in-flutter-3-47
