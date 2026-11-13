---
# title: Package dependency management
title: Package 依赖管理
# description: >-
#   Learn how Flutter and Dart resolve package dependencies,
#   and how to handle version conflicts.
description: >-
  了解 Flutter 与 Dart 如何解析 package 依赖，
  以及如何处理版本冲突。
ai-translated: true
---

When you build a Flutter app,
you often use external packages to add functionality.
Each package can depend on other packages, creating a tree of dependencies.
Understanding how Dart and Flutter manage these dependencies helps you
resolve version conflicts and keep your app stable.

构建 Flutter 应用时，
你经常会用外部 package 来增加功能。
每个 package 都可能依赖其他 package，从而形成一棵依赖树。
理解 Dart 与 Flutter 如何管理这些依赖，
有助于你解决版本冲突并保持应用稳定。

## How dependency resolution works

## 依赖解析如何工作

Your Flutter project specifies dependencies in the `pubspec.yaml` file.
When you run `flutter pub get`,
the package manager resolves the dependencies and
records the exact versions in the `pubspec.lock` file.

Flutter 项目在 `pubspec.yaml` 文件中声明依赖。
运行 `flutter pub get` 时，
包管理器会解析这些依赖，
并把确切版本记录到 `pubspec.lock` 文件中。

### Direct and transitive dependencies

### 直接依赖与传递依赖

A dependency can be direct or transitive:

依赖可以是直接的，也可以是传递的：

**Direct dependencies**
: The packages you explicitly list under the `dependencies` or
  `dev_dependencies` section in your `pubspec.yaml` file.

**直接依赖**
: 你在 `pubspec.yaml` 的 `dependencies` 或
  `dev_dependencies` 部分明确列出的 package。

**Transitive dependencies**
: The packages that your direct dependencies depend on.
  You don't list these packages in your `pubspec.yaml` file,
  but your project requires them to compile.

**传递依赖**
: 你的直接依赖所依赖的 package。
  这些 package 不会写在 `pubspec.yaml` 里，
  但项目编译需要它们。

### The pubspec.lock file

### pubspec.lock 文件

The `pubspec.lock` file contains the exact version of every direct and
transitive dependency used in your project.
This file ensures that every developer on your team, and your build servers,
use the exact same package versions.
Commit the `pubspec.lock` file to version control for application projects,
but not for package projects.

`pubspec.lock` 文件包含项目使用的每个直接依赖和传递依赖的确切版本。
它保证团队中的每位开发者以及构建服务器
都使用完全相同的 package 版本。
应用项目应把 `pubspec.lock` 提交到版本控制，
package 项目则不必。

:::note Use version ranges, not exact versions
Since `pubspec.lock` always pins exact versions for predictable builds,
you should use ranges in your `pubspec.yaml` file
(possibly using caret syntax described below).
This allows the version solver to find
compatible versions of transitive dependencies,
and enables you to safely update dependencies using `flutter pub upgrade`.

:::note 使用版本范围，而非精确版本
`pubspec.lock` 总会锁定精确版本，以便构建结果可预测，
因此你应在 `pubspec.yaml` 中使用版本范围
（也可以使用下文介绍的脱字符语法）。
这样版本求解器才能找到兼容的传递依赖版本，
你也可以用 `flutter pub upgrade` 安全地更新依赖。
:::

## The role of the version solver

## 版本求解器的作用

Unlike some package managers,
the Dart package manager (`pub`) allows only a
single version of any package in your app's compilation tree.

与某些包管理器不同，
Dart 包管理器 (`pub`) 在应用的编译树中
对任意 package 只保留一个版本。

This constraint exists for several reasons:

这一限制有以下几个原因：

1.  **Type safety:**
    If your app uses two versions of the same package,
    you can get type mismatch errors.
    For example, if `v1` and `v2` of a package both define a `User` class,
    the Dart compiler treats them as two distinct types.
    You can't pass a `v1.User` to a method expecting a `v2.User`.

    **类型安全：**
    如果应用使用同一 package 的两个版本，
    就可能出现类型不匹配错误。
    例如，某个 package 的 `v1` 和 `v2` 都定义了 `User` 类，
    Dart 编译器会把它们视为两种不同的类型。
    你无法把 `v1.User` 传给期望 `v2.User` 的方法。

1.  **Binary size:**
    Including multiple versions of the same package
    increases the size of your application.

    **二进制体积：**
    同一 package 包含多个版本
    会增大应用体积。

1.  **Global state:**
    Many packages use global variables or singletons.
    Having multiple copies of the package can
    lead to inconsistent state or bugs.

    **全局状态：**
    许多 package 使用全局变量或单例。
    同一 package 存在多份副本时，
    可能导致状态不一致或出现 bug。

The version solver's job is to look at all version constraints for
your direct and transitive dependencies and find a
single concrete version for each package that satisfies all constraints.

版本求解器的工作是查看直接依赖和传递依赖的全部版本约束，
并为每个 package 找出一个满足所有约束的具体版本。

## Understand version constraints

## 理解版本约束

When you declare a dependency in `pubspec.yaml`,
you specify a version constraint.
Dart packages use [Semantic Versioning][] (SemVer).
A version number has three parts: `major.minor.patch` (for example, `2.1.4`).

在 `pubspec.yaml` 中声明依赖时，
你需要指定版本约束。
Dart package 使用 [语义化版本][Semantic Versioning] (SemVer)。
版本号由三部分组成：`major.minor.patch`（例如 `2.1.4`）。

You can define version constraints in your `pubspec.yaml` file
using different syntaxes:

你可以在 `pubspec.yaml` 中用不同语法定义版本约束：

[Semantic Versioning]: https://semver.org/spec/v2.0.0-rc.1.html

### Caret syntax

### 脱字符语法

The caret syntax (`^`) is the most common way to define a version constraint.
It tells the solver to use any version that is
compatible with the specified version.

脱字符语法 (`^`) 是定义版本约束最常用的方式。
它告诉求解器使用与指定版本兼容的任意版本。

* For stable versions (1.0.0 and higher),
  the caret allows updates that don't change the major version:

  对于稳定版本（1.0.0 及以上），
  脱字符涵盖不改变主版本号的更新：

  * `^1.2.3` is equivalent to `>=1.2.3 <2.0.0`

    `^1.2.3` 等价于 `>=1.2.3 <2.0.0`

* For pre-release/pre-1.0.0 versions,
  any change in the minor or patch version can introduce breaking changes.
  Therefore, the caret constraint is more restrictive:

  对于预发布版本以及低于 1.0.0 的版本，
  次版本号或修订号的任何变化都可能引入破坏性变更。
  因此脱字符约束更为严格：

  * `^0.8.0` is equivalent to `>=0.8.0 <0.9.0`

    `^0.8.0` 等价于 `>=0.8.0 <0.9.0`

  * `^0.0.3` is equivalent to `>=0.0.3 <0.0.4`

    `^0.0.3` 等价于 `>=0.0.3 <0.0.4`

### Traditional ranges

### 传统范围

You can define explicit version ranges using comparison operators:

你可以用比较运算符定义明确的版本范围：

```yaml
dependencies:
  url_launcher: '>=5.4.0 <6.0.0'
```

### Any version

### 任意版本

If you don't specify a version constraint or use `any`,
the solver can choose any version:

如果不指定版本约束，或使用 `any`，
求解器可以选择任意版本：

```yaml
dependencies:
  url_launcher: any
```

:::note Avoid using `any`
We don't recommend using `any` because a future package update might
introduce breaking changes that break your build.

:::note 避免使用 `any`
我们不建议使用 `any`，因为 package 日后的更新
可能会引入破坏性变更，导致构建失败。
:::

## Understand dependency conflicts

## 理解依赖冲突

A dependency conflict occurs when two packages in your dependency tree require
incompatible versions of the same transitive dependency.

当依赖树中的两个 package 需要
同一传递依赖的不兼容版本时，就会发生依赖冲突。

Consider this example scenario:

看下面这个例子：

1.  Your app depends on two direct dependencies: `package_a` and `package_b`.

    你的应用依赖两个直接依赖：`package_a` 和 `package_b`。

1.  `package_a` depends on `foo: ^1.0.0`.

    `package_a` 依赖 `foo: ^1.0.0`。

1.  `package_b` depends on `foo: ^2.0.0`.

    `package_b` 依赖 `foo: ^2.0.0`。

![Version solver conflict](/assets/images/docs/development/packages-and-plugins/version-solver.png)

Because `foo` can't be both `^1.0.0` (which is `<2.0.0`) and
`^2.0.0` (which is `>=2.0.0`), the version solver fails.

因为 `foo` 不可能同时满足 `^1.0.0`（即 `<2.0.0`）
和 `^2.0.0`（即 `>=2.0.0`），版本求解失败。

When you run `flutter pub get` or try to build the app,
the solver prints an error message:

运行 `flutter pub get` 或尝试构建应用时，
求解器会打印如下错误信息：

```console
Because every version of package_a depends on foo ^1.0.0 and
every version of package_b depends on foo ^2.0.0,
package_a is incompatible with package_b.
So, because my_app depends on both package_a ^1.0.0
and package_b ^1.0.0, version solving failed.
```

To read this error message, trace the conflict from the
bottom up in the dependency graph:

阅读这条错误信息时，在依赖图中自下而上追踪冲突：

1.  Identify the conflicting package (`foo`).

    找出冲突的 package（`foo`）。

1.  Find which packages require conflicting versions.
    For example, `package_a` requires `foo: ^1.0.0` and
    `package_b` requires `foo: ^2.0.0`.

    找出哪些 package 要求了冲突的版本。
    例如，`package_a` 要求 `foo: ^1.0.0`，
    `package_b` 要求 `foo: ^2.0.0`。

1.  Check which direct dependencies pull in those conflicting packages.
    For example, `my_app` depends on
    both `package_a: ^1.0.0` and `package_b: ^1.0.0`.

    检查是哪些直接依赖引入了这些冲突的 package。
    例如，`my_app` 同时依赖
    `package_a: ^1.0.0` 和 `package_b: ^1.0.0`。

## Resolve dependency conflicts

## 解决依赖冲突

You can use the following steps to resolve dependency conflicts.

可以按以下步骤解决依赖冲突。

### Upgrade package versions

### 升级 package 版本

Before making manual changes, check if newer,
compatible versions of your dependencies exist.
Run the following command to upgrade your packages to the
latest versions allowed by your `pubspec.yaml` constraints:

在手动修改之前，先检查依赖是否已有更新且兼容的版本。
运行以下命令，把 package 升级到
`pubspec.yaml` 约束范围内的最新版本：

```bash
flutter pub upgrade
```

To see which packages have newer versions available beyond
your current constraints, run:

要查看哪些 package 在当前约束之外还有更新版本，请运行：

```bash
flutter pub outdated
```

To upgrade to newer major versions,
run `flutter pub upgrade --major-versions`.
This command upgrades the constraints in your `pubspec.yaml` file
to allow the latest resolvable versions, and then
runs `flutter pub get` to retrieve those upgraded dependencies.

要升级到更新的主版本，
请运行 `flutter pub upgrade --major-versions`。
该命令会放宽 `pubspec.yaml` 中的约束，
从而接受最新的可解析版本，
然后运行 `flutter pub get` 获取这些升级后的依赖。

### Use dependency overrides

### 使用依赖覆盖

If no compatible versions exist because one of the packages hasn't been updated,
you can force the version solver to use a specific version.
Add a `dependency_overrides` section to your `pubspec.yaml` file:

如果因为某个 package 尚未更新而不存在兼容版本，
你可以强制版本求解器使用指定版本。
在 `pubspec.yaml` 中添加 `dependency_overrides` 部分：

```yaml
dependencies:
  package_a: ^1.0.0
  package_b: ^1.0.0

dependency_overrides:
  foo: ^2.0.0
```

This overrides all constraints for `foo` and
forces the version solver to use `^2.0.0`.

这会覆盖 `foo` 的全部约束，
并强制版本求解器使用 `^2.0.0`。

:::warning
Use dependency overrides only as a temporary fix.
If the packages aren't actually compatible,
bypassing the version solver can cause
compilation errors or runtime crashes (such as `NoSuchMethodError`).
Thoroughly test your app after applying an override.

请只把依赖覆盖当作临时修复。
如果这些 package 实际上并不兼容，
绕过版本求解器可能导致编译错误或运行时崩溃
（例如 `NoSuchMethodError`）。
应用覆盖后，请充分测试你的应用。
:::

:::note
Dependency overrides only apply to the root package.
If you're developing a package to publish to pub.dev,
don't include `dependency_overrides` in your `pubspec.yaml` file because
other projects that depend on your package will ignore them.

依赖覆盖只对根 package 生效。
如果你正在开发要发布到 pub.dev 的 package，
请不要在 `pubspec.yaml` 中加入 `dependency_overrides`，
因为依赖你这个 package 的其他项目会忽略它们。
:::

### Support the ecosystem

### 支持生态系统

If a package is unmaintained or slow to update,
you can help resolve the issue:

如果某个 package 无人维护或更新缓慢，
你可以这样帮忙解决问题：

1.  **File an issue:**
    Search the package's repository for existing issues or
    file a new issue to notify the maintainer.

    **提交 issue：**
    在该 package 的仓库中搜索已有 issue，
    或提交新 issue 通知维护者。

1.  **Submit a pull request:**
    If you can fix the conflict, fork the package repository,
    update the constraints, and submit a pull request.

    **提交拉取请求：**
    如果你能修复冲突，请 fork 该 package 仓库，
    更新约束并提交拉取请求。

1.  **Use a git or path dependency:**
    While waiting for the maintainer to merge your pull request,
    you can point your `pubspec.yaml` to your fork or a local copy:

    **使用 git 或路径依赖：**
    在维护者合并你的拉取请求之前，
    可以让 `pubspec.yaml` 指向你的 fork 或本地副本：

    ```yaml
    dependencies:
      package_a:
        git:
          url: https://github.com/your-username/package_a.git
          ref: update-foo-dependency
    ```

## Learn more

## 了解更多

For more information on how Dart manages dependencies,
see the following resources:

要进一步了解 Dart 如何管理依赖，
请参阅以下资源：

* [Package versioning][] on dart.dev

  dart.dev 上的 [Package 版本管理][Package versioning]

* [Pub dependencies][] on dart.dev

  dart.dev 上的 [Pub 依赖][Pub dependencies]

* [Dependency overrides][] on dart.dev

  dart.dev 上的 [依赖覆盖][Dependency overrides]

[Dependency overrides]: {{site.dart-site}}/tools/pub/dependencies#dependency-overrides
[Package versioning]: {{site.dart-site}}/tools/pub/versioning
[Pub dependencies]: {{site.dart-site}}/tools/pub/dependencies
