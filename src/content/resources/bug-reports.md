---
title: Create useful bug reports
title: 如何有效提出 Bug
description: >
  Where to file bug reports and enhancement requests for 
  flutter and the website.
description: 在哪里提出 bug 最有效呢？
tags: Flutter参考资料
keywords: 提出错误,Flutter调试信息,Flutter反馈指南,Flutter doctor
---

The instructions in this document detail the current steps
required to provide the most actionable bug reports for
crashes and other bad behavior. Each step is optional but
will greatly improve how quickly issues are diagnosed and addressed.
We appreciate your effort in sending us as much feedback as possible.

本文通过每个详细的步骤，介绍了如何提供最具可操作性的 bug 报告，以更好地解决崩溃和其他不良行为。
虽然每个步骤都是可选的，但它们能够显著提高诊断及解决问题的速度。
我们希望你能够尽可能多地反馈错误报告，我们由衷地感谢你对此做出的努力。

## Create an issue on GitHub

## 在 Github 上提出 issue

* To report a Flutter crash or bug,
  [create an issue in the flutter/flutter project][Flutter issue].

  报告 Flutter 的崩溃或 bug，
  [请在 flutter/flutter 项目中提出 issue][Flutter issue]。

* To report a problem with the website,
  [create an issue in the flutter/website project][Website issue].

  报告文档网站的问题，
  [请在 flutter/website 项目中提出 issue][Website issue]。

## Provide a minimal reproducible code sample

## 提供最小可复现的代码样本

Create a minimal Flutter app that shows the problem you are facing,
and paste it into the GitHub issue.

创建一个最小可运行的 Flutter 应用程序，复现你所面临的问题，
并且将这些代码粘贴到 GitHub issue 中。

To create it you can use `flutter create bug` command and update
the `main.dart` file.

为了更好地调试完成最小可复现的代码，
我们建议你可以使用 `flutter create bug` 命令创建新项目，
并在 `main.dart` 文件中复现问题。

Alternatively, you can use [DartPad][], which is capable
of creating and running small Flutter apps.

另外，你还可以使用 [DartPad][]，
它能够创建和运行小型 Flutter 应用程序。

If your problem goes out of what can be placed in a single file, for example
you have a problem with native channels, you can upload the full code of
the reproduction into a separate repository and link it.

如果你复现的问题由多个代码文件组成，
例如，你有一个关于本地通道的问题，
你可以把这些代码文件完整上传到网络，
并在 issue 中附上链接地址。

## Provide some Flutter diagnostics

## 提供一些 Flutter 的诊断

* Run `flutter doctor -v` in your project directory and paste
  the results into the GitHub issue:

  在你的项目目录中运行 `flutter doctor -v`，
  并将结果粘贴到 GitHub issue 中：

```plaintext
[✓] Flutter (Channel stable, 1.22.3, on Mac OS X 10.15.7 19H2, locale en-US)
    • Flutter version 1.22.3 at /Users/me/projects/flutter
    • Framework revision 8874f21e79 (5 days ago), 2020-10-29 14:14:35 -0700
    • Engine revision a1440ca392
    • Dart version 2.10.3

[✓] Android toolchain - develop for Android devices (Android SDK version 29.0.2)
    • Android SDK at /Users/me/Library/Android/sdk
    • Platform android-30, build-tools 29.0.2
    • Java binary at: /Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin/java
    • Java version OpenJDK Runtime Environment (build 1.8.0_242-release-1644-b3-6222593)
    • All Android licenses accepted.

[✓] Xcode - develop for iOS and macOS (Xcode 12.2)
    • Xcode at /Applications/Xcode.app/Contents/Developer
    • Xcode 12.2, Build version 12B5035g
    • CocoaPods version 1.9.3

[✓] Android Studio (version 4.0)
    • Android Studio at /Applications/Android Studio.app/Contents
    • Flutter plugin version 50.0.1
    • Dart plugin version 193.7547
    • Java version OpenJDK Runtime Environment (build 1.8.0_242-release-1644-b3-6222593)

[✓] VS Code (version 1.50.1)
    • VS Code at /Applications/Visual Studio Code.app/Contents
    • Flutter extension version 3.13.2

[✓] Connected device (1 available)
    • iPhone (mobile) • 00000000-0000000000000000 • ios • iOS 14.0
```

## Run the command in verbose mode

## 在详细模式 (verbose mode) 下运行命令

Follow these steps only if your issue is related to the
`flutter` tool.

当你遇到的问题与 `flutter` 工具相关时，
你才需要遵循以下步骤。

* All Flutter commands accept the `--verbose` flag.
  If attached to the issue, the output from this command
  might aid in diagnosing the problem.

  所有 Flutter 命令都接受 `--verbose` 标志。
  如果将这个命令的输出附在 issue 上，可能有助于诊断问题。

* Attach the results of the command to the GitHub issue.

  将该命令的结果附在 GitHub issue 上。

![flutter verbose](/assets/images/docs/verbose_flag.png){:width="100%"}

## Provide the most recent logs

## 提供最新的日志

* Logs for the currently connected device are accessed
  using `flutter logs`.

  使用 `flutter logs` 命令访问当前连接设备的日志。

* If the crash is reproducible, clear the logs
  (⌘ + k on Mac), reproduce the crash and copy the
  newly generated logs into a file attached to the bug report.

  如果崩溃的情况是可以复现的，
  请你先清除当前的日志（Mac 上的 ⌘ + k），
  然后复现崩溃的情况，
  最后将新生成的日志复制到 bug 报告中。

* If you are getting exceptions thrown by the framework,
  include all the output between and including the dashed
  lines of the first such exception.

  如果你得到了由底层框架抛出的异常，
  请你提供从第一个异常开始的所有输出内容（包括虚线之间的内容）。

![flutter logs](/assets/images/docs/logs.png){:width="100%"}

## Provide the crash report

## 提供崩溃报告

* When the iOS simulator crashes,
  a crash report is generated in `~/Library/Logs/DiagnosticReports/`.

  在 iOS 模拟器中崩溃时，
  会在 `~/Library/Logs/DiagnosticReports/` 中生成一份崩溃报告。

* When an iOS device crashes,
  a crash report is generated in `~/Library/Logs/CrashReporter/MobileDevice`.

  在 iOS 真机中崩溃时，
  会在 `~/Library/Logs/CrashReporter/MobileDevice` 中生成一份崩溃报告。

* Find the report corresponding to the crash (usually the latest)
  and attach it to the GitHub issue.

  找到与崩溃相对应的报告（通常是最新的）
  并将其附加到 GitHub issue 上。

![crash report](/assets/images/docs/crash_reports.png){:width="100%"}


[DartPad]: {{site.dartpad}}
[Flutter issue]: {{site.repo.flutter}}/issues/new/choose
[Website issue]: {{site.repo.this}}/issues/new/choose
