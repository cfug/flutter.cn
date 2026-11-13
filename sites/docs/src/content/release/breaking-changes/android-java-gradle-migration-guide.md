---
# title: Android Java Gradle migration guide
title: Android Java Gradle 迁移指南
# description: >
#   How to migrate your Android app if you experience
#   a run or build error from Gradle.
description: >
  如果运行或构建时遇到 Gradle 错误，如何迁移你的 Android 应用。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

If you've recently upgraded Android Studio to the Flamingo
release and have either run or built an existing Android app,
you might have run into an error similar to the following:

如果你最近把 Android Studio 升级到了 Flamingo 版本，
并且运行或构建了现有的 Android 应用，
可能会遇到类似下面的错误：

```sh
Caused by: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:
```

The terminal output for this error is
similar to the following:


此错误的终端输出类似如下：


```sh
FAILURE: Build failed with an exception.

* Where:
Build file '…/example/android/build.gradle'
* What went wrong:
Could not compile build file '…/example/android/build.gradle'.
> startup failed:
  General error during conversion: Unsupported class file major version 61

  java.lang.IllegalArgumentException: Unsupported class file major version 61
  	at groovyjarjarasm.asm.ClassReader.<init>(ClassReader.java:189)
  	at groovyjarjarasm.asm.ClassReader.<init>(ClassReader.java:170)
  	[…
  	 …
  	 … 209 more lines of Groovy and Gradle stack trace …
  	 …
  	 …]
  	at java.base/java.lang.Thread.run(Thread.java:833)
```

This error occurs because Android Studio Flamingo
updates its bundled Java SDK from 11 to 17.
Flutter uses the version of Java bundled with
Android Studio to build Android apps.
Gradle versions [prior to 7.3][] can't run
when using Java 17.

出现此错误，是因为 Android Studio Flamingo
将其捆绑的 Java SDK 从 11 更新到了 17。
Flutter 使用 Android Studio 捆绑的 Java 版本来构建 Android 应用。
使用 Java 17 时，[7.3 之前][prior to 7.3] 的 Gradle 版本无法运行。

**You can fix this error by upgrading your Gradle project
to a compatible version (7.3 through 7.6.1, inclusive)
using one of the following approaches.**

**你可以通过以下任一方式，将 Gradle 项目升级到兼容版本
（7.3 至 7.6.1，含两端），从而修复此错误。**

[prior to 7.3]: https://docs.gradle.org/current/userguide/compatibility.html#java

## Solution #1: Guided fix using Android Studio

## 解决方案 1：使用 Android Studio 引导修复

Upgrade the Gradle version in Android Studio Flamingo
as follows:

在 Android Studio Flamingo 中按以下步骤升级 Gradle 版本：

1. In Android Studio, open the `android` folder.
   This should bring up the following dialog:

   在 Android Studio 中打开 `android` 文件夹。
   此时应出现以下对话框：

   ![Dialog prompting you to upgrade Gradle](/assets/images/docs/releaseguide/android-studio-flamingo-upgrade-alert.png){:width="50%"}

   Update to a Gradle release between 7.3 through 7.6.1, inclusive.

   将 Gradle 更新到 7.3 至 7.6.1（含两端）之间的版本。

1. Follow the guided workflow to update Gradle.

   按照引导流程更新 Gradle。

   ![Workflow to upgrade Gradle](/assets/images/docs/releaseguide/android-studio-flamingo-gradle-upgrade.png){:width="85%"}

## Solution #2: Manual fix at the command line

## 解决方案 2：在命令行手动修复

Do the following from the top of your Flutter project.

在 Flutter 项目根目录执行以下操作。

1. Go to the Android directory for your project.

   进入项目的 Android 目录。

   ```console
   $ cd android
   ```

1. Update Gradle to the preferred version. Choose between 7.3 through 7.6.1, inclusive.

   将 Gradle 更新到首选版本。请在 7.3 至 7.6.1（含两端）之间选择。

   ```console
   $ ./gradlew wrapper --gradle-version=7.6.1
   ```

## You didn't update Android Studio and still have a Java error

## 未更新 Android Studio 但仍出现 Java 错误

The error appears similar to `Unsupported class file major version 65`.
This is an indication that your Java version is newer than the version of
Gradle you are running can handle. There is a non-obvious set of dependencies
surrounding AGP, Java, and Gradle.

该错误类似 `Unsupported class file major version 65`。
这表明你的 Java 版本高于当前 Gradle 所能支持的版本。
AGP、Java 与 Gradle 之间有一组并不直观的依赖关系。

### Solution 1: Android Studio

### 解决方案 1：Android Studio

The easiest way to resolve this issue is to use Android Studio AGP upgrade assistant.
To use select your top-level `build.gradle` file in Android Studio then select
Tools -> AGP Upgrade Assistant.

解决此问题最简单的方式是使用 Android Studio 的 AGP Upgrade Assistant。
在 Android Studio 中选中顶层 `build.gradle` 文件，
然后选择 Tools → AGP Upgrade Assistant。

### Solution 2: Command line

### 解决方案 2：命令行

Run `flutter analyze --suggestions` to see if your AGP, Java, and Gradle versions are compatible.
If Gradle needs to be updated you can update it with `./gradlew wrapper --gradle-version=SOMEGRADLEVERSION`
where SOMEGRADLEVERSION is the version (you can use a newer version)
suggested by `flutter analyze`.

运行 `flutter analyze --suggestions`，
查看 AGP、Java 与 Gradle 版本是否兼容。
如果需要更新 Gradle，可以用
`./gradlew wrapper --gradle-version=SOMEGRADLEVERSION` 更新，
其中 SOMEGRADLEVERSION 是 `flutter analyze` 建议的版本
（也可以使用更新的版本）。

To find the Java version being used run `flutter doctor`.
On a mac, you can find the Java versions that the OS knows about with `/usr/libexec/java_home -V`.
To set the version of Java that all flutter projects use run `flutter config --jdk-dir=SOMEJAVAPATH`
where SOMEJAVAPATH is a path to a Java version like `/opt/homebrew/Cellar/openjdk@17/17.0.13/libexec/openjdk.jdk/Contents/Home`

要查看正在使用的 Java 版本，请运行 `flutter doctor`。
在 Mac 上，可以用 `/usr/libexec/java_home -V`
查看操作系统已知的 Java 版本。
要为所有 Flutter 项目设置所用的 Java 版本，
请运行 `flutter config --jdk-dir=SOMEJAVAPATH`，
其中 SOMEJAVAPATH 是某个 Java 版本的路径，
例如 `/opt/homebrew/Cellar/openjdk@17/17.0.13/libexec/openjdk.jdk/Contents/Home`。

## Notes

## 说明

A few notes to be aware of:

请注意以下几点：

* Repeat this step for each affected Android app.

  对每个受影响的 Android 应用重复此步骤。

* This issue can be experienced by those who
  _don't_ download Java and the Android SDK through
  Android studio.
  If you've manually upgraded your Java SDK to
  version 17 but haven't upgraded Gradle, you can
  also encounter this issue. The fix is the same:
  upgrade Gradle to a release between 7.3 and 7.6.1.

  那些 **没有** 通过 Android Studio 下载 Java 与 Android SDK 的人
  也可能遇到此问题。
  如果你已手动将 Java SDK 升级到 17，但尚未升级 Gradle，
  同样会遇到此问题。修复方式相同：
  将 Gradle 升级到 7.3 至 7.6.1 之间的版本。

* Your development machine _might_ contain more
  than one copy of the Java SDK:

  你的开发机 **可能** 包含不止一份 Java SDK：

  * The Android Studio app includes a version of Java,
    which Flutter uses by default.

    Android Studio 应用自带一份 Java，
    Flutter 默认使用该版本。

  * If you don't have Android Studio installed,
    Flutter relies on the version defined by your
    shell script's `JAVA_HOME` environment variable.

    如果未安装 Android Studio，
    Flutter 会使用 shell 脚本中
    `JAVA_HOME` 环境变量所指定的版本。

  * If `JAVA_HOME` isn't defined, Flutter looks
    for any `java` executable in your path.
    The `flutter doctor -v` command reports which version
    of Java is used.

    如果未定义 `JAVA_HOME`，Flutter 会在 PATH 中
    查找任何 `java` 可执行文件。
    `flutter doctor -v` 命令会报告所使用的 Java 版本。

* If you upgrade Gradle to a release _newer_ than 7.6.1,
  you might (though it's unlikely) encounter issues
  that result from changes to Gradle, such as
  [deprecated Gradle classes][], or changes to the
  Android file structure.
  If this occurs, downgrade to a release of Gradle
  between 7.3 and 7.6.1, inclusive.

  如果将 Gradle 升级到 **高于** 7.6.1 的版本，
  你可能会（尽管可能性不大）遇到 Gradle 变更带来的问题，
  例如 [已弃用的 Gradle 类][deprecated Gradle classes]，
  或 Android 文件结构的变化。
  若出现这种情况，请将 Gradle 降级到
  7.3 至 7.6.1（含两端）之间的版本。

* Upgrading to Flutter 3.10 won't fix this issue.

  升级到 Flutter 3.10 无法修复此问题。

[deprecated Gradle classes]: https://docs.gradle.org/7.6/javadoc/deprecated-list.html
[issue 122609]: {{site.repo.flutter}}/issues/122609
