## How to turn on Swift Package Manager

## 如何开启 Swift Package Manager

Flutter's Swift Package Manager support is turned off by default.
To turn it on:

默认情况下，Flutter 的 Swift Package Manager 支持处于关闭状态。
要开启它：

1. Upgrade to the latest Flutter SDK:

   升级到最新的 Flutter SDK：

   ```sh
   flutter upgrade
   ```

1. Turn on the Swift Package Manager feature:

   开启 Swift Package Manager 功能：

   ```sh
   flutter config --enable-swift-package-manager
   ```

Using the Flutter CLI to run an app [migrates the project][addSPM] to add
Swift Package Manager integration.
This makes your project download the Swift packages that
your Flutter plugins depend on.
An app with Swift Package Manager integration requires Flutter version 3.24 or
higher.
To use an older Flutter version,
you will need to [remove Swift Package Manager integration][removeSPM]
from the app.

使用 Flutter CLI 运行应用会[迁移项目][addSPM]以添加
Swift Package Manager 集成。
这会让你的项目下载
你的 Flutter 插件所依赖的 Swift 包。
集成了 Swift Package Manager 的应用需要 Flutter 3.24 或
更高版本。
若要使用较旧的 Flutter 版本，
你需要从应用中[移除 Swift Package Manager 集成][removeSPM]。

Flutter falls back to CocoaPods for dependencies that do not support Swift
Package Manager yet.

对于尚不支持 Swift
Package Manager 的依赖，Flutter 会回退到 CocoaPods。

## How to turn off Swift Package Manager

## 如何关闭 Swift Package Manager

:::secondary Plugin authors
Plugin authors need to turn on and off Flutter's Swift Package Manager
support for testing.
App developers do not need to disable Swift Package Manager support,
unless they are running into issues.

插件作者需要为测试而开启或关闭 Flutter 的 Swift Package Manager
支持。
应用开发者无需禁用 Swift Package Manager 支持，
除非遇到问题。

If you find a bug in Flutter's Swift Package Manager support,
[open an issue][].

如果你在 Flutter 的 Swift Package Manager 支持中发现 bug，
[提交 issue][open an issue]。
:::

Disabling Swift Package Manager causes Flutter to use CocoaPods for all
dependencies.
However, Swift Package Manager remains integrated with your project.
To remove Swift Package Manager integration completely from your project,
follow the [How to remove Swift Package Manager integration][removeSPM]
instructions.

禁用 Swift Package Manager 会导致 Flutter 对所有
依赖都使用 CocoaPods。
不过，Swift Package Manager 仍会集成在你的项目中。
若要从项目中完全移除 Swift Package Manager 集成，
请按照[如何移除 Swift Package Manager 集成][removeSPM]
说明操作。

### Turn off for a single project

### 为单个项目关闭

In the project's `pubspec.yaml` file, under the `flutter` section,
set `enable-swift-package-manager` to `false` in the `config` subsection.

在项目的 `pubspec.yaml` 文件中，于 `flutter` 小节下的 `config` 子小节里，
将 `enable-swift-package-manager` 设为 `false`。

```yaml title="pubspec.yaml"
# The following section is specific to Flutter packages.
flutter:
  config:
    enable-swift-package-manager: false
```

This turns off Swift Package Manager for all contributors to this project.

这会为参与该项目的所有贡献者关闭 Swift Package Manager。

:::note Migrating from deprecated syntax
If you were previously using `disable-swift-package-manager: true`,
update your `pubspec.yaml` to use the new `config` section format shown above.
The old syntax is deprecated and will produce an error in Flutter 3.38 and later.

如果你之前使用的是 `disable-swift-package-manager: true`，
请将 `pubspec.yaml` 更新为上述新的 `config` 小节格式。
旧语法已弃用，在 Flutter 3.38 及更高版本中将产生错误。
:::

### Turn off globally for all projects

### 为所有项目全局关闭

Run the following command:

运行以下命令：

```sh
flutter config --no-enable-swift-package-manager
```

This turns off Swift Package Manager for the current user.

这会为当前用户关闭 Swift Package Manager。

If a project is incompatible with Swift Package Manager, all contributors
need to run this command.

如果某个项目与 Swift Package Manager 不兼容，所有贡献者
都需要运行此命令。

[addSPM]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-add-swift-package-manager-integration
[removeSPM]: /packages-and-plugins/swift-package-manager/for-app-developers#how-to-remove-swift-package-manager-integration
[open an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml
