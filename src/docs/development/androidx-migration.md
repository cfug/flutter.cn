---
title: AndroidX Migration
title: 迁移到 AndroidX
description: How to migrate existing Flutter projects to AndroidX.
description: 如何将现有的 Flutter 项目迁移到 AndroidX。
tags: Flutter开发,部署
keywords: AndoridX, Android Studio, Flutter 里使用 AndroidX
---

{{site.alert.note}}

  You might be directed to this page if Flutter detects that your project
  doesn't use AndroidX.

  如果 Flutter 监测到你的项目中未使用到 AndroidX，那么你会跳转到此页面。
{{site.alert.end}}

[AndroidX]({{site.android-dev}}/jetpack/androidx) is a major improvement
to the original Android Support Library.

[AndroidX]({{site.android-dev}}/jetpack/androidx) 是针对 Android 原生支持库的重大改进。

It provides the `androidx.*` package libraries, unbundled from the platform API.
This means that it offers backward compatibility and is updated more frequently
than the Android platform.

其提供了包名为 `androidx.*`，且并未与平台 API 关联的类库，
这意味着它提供了向后的兼容性，以及比 Android 平台更频繁的更新。

## Common Questions

## 常见问题

### How do I migrate my existing app, plugin or host-editable module project to AndroidX?

### 如何将现有的应用程序、插件，或者可编辑的模块项目迁移至 AndroidX?

_You will need Android Studio 3.2 or higher. If you don’t have it installed,
you can download the latest version from
[developer.android.com/studio]({{site.android-dev}}/studio)_.

**你需要 Android Studio 3.2 或其更高的版本。
若尚未安装，可从 [developer.android.com/studio]({{site.android-dev}}/studio) 
下载最新的版本。**

1. Open Android Studio.

   打开 Android Studio。

2. Select **Open an existing Android Studio Project**.

   选中 **Open an existing Android Studio Project** 。

3. Open the `android` directory within your app.

   在你的应用路径中打开 `android` 目录。

4. Wait until the project has been synced successfully.

   等待项目直到其同步成功。

  (This happens automatically once you open the project, but if it doesn’t,
   select **Sync Project with Gradle Files** from the **File** menu).

  （一旦打开项目，同步就会自动构建，若没有自动构建，
  请从 **File** 菜单中选中 **Sync Project with Gradle Files**）。

5. Select **Migrate to AndroidX** from the Refactor menu.

   从 **Refactor** 菜单中选择 **Migrate to AndroidX** 。

6. If you are asked to backup the project before proceeding,
   check **Backup project as Zip file**, then click **Migrate**. Lastly, save
   the zip file in your location of preference. <br/>

   在继续之前，若被要求对项目进行备份，选中 **Backup project as Zip file** ，
   然后单击 **Migrate** ，最终将 zip 文件保存在你喜欢的路径下。<br/>

  <img
      width="500"
      style="border-radius: 12px;"
      src="/images/androidx/migrate_prompt.png"
      class="figure-img img-fluid"
      alt="Select backup project as zip file" />
7. The refactoring preview shows the list of changes. Finally, click **Do Refactor**:

   重构预览展示了变动的列表，最后，单击 **Do Refactor** ：

  <img
      width="600"
      style="border-radius: 12px;"
      src="/images/androidx/do_androidx_refactor.png"
      class="figure-img img-fluid"
      alt="An animation of the bottom-up page transition on Android" />
      
8. That is it! You successfully migrated your project to AndroidX.

   大功告成！你已成功将项目迁移到 AndroidX。

Finally, if you migrated a plugin, publish the new AndroidX version to pub and update
your `CHANGELOG.md` to indicate that this new version is compatible with AndroidX.

最后，如果你对插件进行了迁移，
请发布新的 AndroidX 版本到 pub 并更新的 `CHANGELOG.md`，以指明该版本与 AndroidX 兼容。

### What if I can't use Android Studio?

### 若无法使用 Android Studio 怎么办？

You can create a new project using the Flutter tool and then move the Dart code and
assets to the new project.

你可以使用 Flutter 工具创建一个新项目，
然后将 Dart 代码和资源文件移动到新的项目中。

To create a new project run:

要创建一个新的项目，请运行：

```bash
flutter create -t <project-type> <new-project-path>
```

### Add to App

### 添加至应用

If your Flutter project is a module type for adding to an existing Android app, and
contains a `.android` directory, add the following line to `pubspec.yaml`:

若的 Flutter 项目类型是用于添加至现有 Android 应用的模块，
并且包含 `.android` 目录，则将下述代码添加至 `pubspec.yaml` 中。

```yaml
 module:
   ...
    androidX: true # Add this line.
```

Finally, run `flutter clean`.

最后，运行 `flutter clean` 。

If your module contains an `android` directory instead, then follow the
steps in previous section.

若你的模块中包含一个 `android` 目录，请按照上一节中的步骤执行。

### How do I know if my project is using AndroidX?

### 如何判断我的项目中是否使用了 AndroidX？

Starting from Flutter v1.12.13, new projects created with `flutter create -t <project-type>`
use AndroidX by default.

自 Flutter 1.12.13 版本之后，使用 `flutter create -t <project-type>`
命令行创建的 Flutter 项目将会默认使用 AndroidX。

Projects created prior to this Flutter version must not depend on any
[old build artifact][] or [old Support Library class][].

在此 Flutter 版本（1.12.13）之前创建的项目不能依赖任何
[工件映射][old build artifact] 和 [类映射][old Support Library class]。

In an app or module project, the file `android/gradle.properties` or `.android/gradle.properties`
must contain:

`android/gradle.properties` 或 `.android/gradle.properties` 文件中需要包含下述代码：

```
android.useAndroidX=true
android.enableJetifier=true
```

### What if I don’t migrate my app or module to AndroidX?

### 若不将应用程序或模块迁移至 AndroidX 将会怎样？

Your app may continue to work. However, combining AndroidX and Support artifacts
is generally not recommended because it can result in dependency conflicts or
other kind of Gradle failures. As a result, as more plugins migrate to AndroidX,
plugins depending on Android core libraries are likely to cause build failures.

你的应用程序也许能继续运行。
然而，通常不建议将 AndroidX 和 Support 组件结合起来使用，
因为这会导致依赖关系冲突或者 Gradle 的其它类型失败。

### What if my app is migrated to AndroidX, but not all of the plugins I use?

### 若我将应用迁移到了 AndroidX，但我使用到的插件没有全部支持 AndroidX 怎么办？

The Flutter tool uses Jetifier to automatically migrate Flutter plugins using
the Support Library to AndroidX, so you can use the same plugins even if they
haven’t been migrated to AndroidX yet.

Flutter 工具使用 Jetifier 将支持库中的 Flutter 插件自动迁移到 AndroidX，
因此，即使你尚未将其迁移到 AndroidX ，你也可以使用相同的插件。

### I'm having issues migrating to AndroidX

### 在迁移至 AndroidX 的过程中遇到了问题

[Open an issue on GitHub][] and add `[androidx-migration]` to the title of the issue.

[在 GitHub 上创建一个问题][Open an issue on GitHub]
并为其添加一个 `[androidx-migration]` 标题。


[old build artifact]: https://developer.android.com/jetpack/androidx/migrate/artifact-mappings
[old Support Library class]: https://developer.android.com/jetpack/androidx/migrate/class-mappings
[Open an issue on GitHub]: https://github.com/flutter/flutter/issues/new/choose