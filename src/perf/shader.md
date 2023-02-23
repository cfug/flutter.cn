---
title: Shader compilation jank
title: 着色器编译时卡顿
short-title: Shader jank
short-title: 着色器卡顿
description: What is shader jank and how to minimize it.
description: 你会了解到什么是着色器卡顿以及如何减少它。
tags: Flutter性能
keywords: 卡顿
---

{% include docs/performance.md %}

If the animations on your mobile app appear to be janky,
but only on the first run,
this is likely due to shader compilation.
Flutter's long term solution to
shader compilation jank is [Impeller][],
which is in preview
(behind a flag) for iOS.
(It's not yet available on Android.)

Before continuing with the instructions below,
please try Impeller on iOS, and let us know
in a [GitHub issue][] if it doesn't address your issue.
Impeller on Android is being actively developed,
but is not yet in developer preview.

[Impeller]: {{site.repo.flutter}}/wiki/Impeller
[GitHub issue]: {{site.github}}/orgs/flutter/projects/21

While we work on making Impeller production ready,
you can mitigate shader compilation jank by bundling
precompiled shaders with an iOS app.
Unfortunately, this approach doesn't work well on Android
due to precompiled shaders being device or GPU-specific.
The Android hardware ecosystem is large enough that the
GPU-specific precompiled shaders bundled with an application
will work on only a small subset of devices,
and will likely make jank worse on the other devices,
or even create rendering errors.

Also, please note that we aren't planning to make
improvements to the developer experience for creating
precompiled shaders described below. Instead,
we are focusing our energies on the more robust
solution to this problem that Impeller offers.

## What is shader compilation jank?

A shader is a piece of code that runs on a GPU (graphics processing unit). When
the Skia graphics backend that Flutter uses for rendering sees a new sequence
of draw commands for the first time, it sometimes generates and compiles a
custom GPU shader for that sequence of commands. This allows that sequence and
potentially similar sequences to render as fast as possible.

Unfortunately, Skia's shader generation and compilation happen in sequence with
the frame workload. The compilation could cost up to a few hundred milliseconds
whereas a smooth frame needs to be drawn within 16 milliseconds for a 60 fps
(frame-per-second) display. Therefore, a compilation could cause tens of frames
to be missed, and drop the fps from 60 to 6. This is _compilation jank_. After
the compilation is complete, the animation should be smooth.

On the other hand, Impeller generates and compiles all necessary shaders when
we build the Flutter Engine. Therefore apps running on Impeller already have
all the shaders they need, and the shaders can be used without introducing jank
into animations.

Definitive evidence for the presence of shader compilation jank is to see
`GrGLProgramBuilder::finalize` in the tracing with `--trace-skia` enabled. See
the following screenshot for an example timeline tracing.

要获得更加确切的着色器编译卡顿存在的证据，
你可以在 `--trace-skia` 开启时查看追踪文件中的
`GrGLProgramBuilder::finalize`。
下面的截图展示了一个 timeline 追踪的样例。

![A tracing screenshot verifying jank]({{site.url}}/assets/images/docs/perf/render/tracing.png){:width="100%"}

## What do we mean by "first run"?

## 如何定义「首次运行」？

On iOS, "first run" means that the user might see
jank when an animation first occurs every time
the user opens the app from scratch.

在 iOS 上来说，
「首次运行」意味着用户可能在每次打开应用后，
在动画首次加载时都会出现卡顿。

## How to use SkSL warmup

## 如何使用 SkSL 预热

As of release 1.20, Flutter provides command line tools for app developers to
collect shaders that might be needed for end-users in the SkSL
(Skia Shader Language) format. The SkSL shaders can then be
packaged into the app, and get warmed up (pre-compiled)
when an end-user first opens the app, thereby reducing the compilation
jank in later animations. Use the following instructions to collect
and package the SkSL shaders:

在 1.20 发布的时候，Flutter 为应用开发者提供了一个命令行工具以收集
终端用户在 SkSL（Skia 着色器语言）进行格式化处理中需要用到的着色器。
SkSL 着色器可以被打包进应用，并提前进行预热（预编译），
这样当终端用户第一次打开应用时，就能够减少动画的编译掉帧了。
使用下面的指令收集并打包 SkSL 的着色器：

<ol markdown="1">
<li markdown="1">Run the app with `--cache-sksl` turned on
    to capture shaders in SkSL:

​    打开 `--cache-sksl` 运行你的应用以捕获 SkSL 中的着色器：

```terminal
flutter run --profile --cache-sksl
```

If the same app has been previously run without `--cache-sksl`, then the
`--purge-persistent-cache` flag may be needed:

如果这个相同的应用之前运行的时候没有使用 `--cache-sksl`，
你需要加上 `--purge-persistent-cache` 标志：

```terminal
flutter run --profile --cache-sksl --purge-persistent-cache
```

This flag removes older non-SkSL shader caches that could interfere with SkSL
shader capturing. It also purges the SkSL shaders so use it *only* on the first
`--cache-sksl` run.

这个标志将会删除可能干扰 SkSL 的较旧的非 SkSL 着色器缓存捕获的着色器。 
它还清除了 SkSL 着色器，因此*仅*在第一次使用 `--cache-sksl` 运行。

</li>

<li markdown="1"> Play with the app to trigger as many animations
    as needed; particularly those with compilation jank.

   尽可能多触发应用的动画，特别是那些会引起编译卡顿的。
</li>

<li markdown="1"> Press `M` at the command line of `flutter run` to
    write the captured SkSL shaders into a file named something like
   `flutter_01.sksl.json`. For best results, capture SkSL shaders on an actual
   iOS device. A shader captured on a simulator isn't likely to work correctly
   on actual hardware.

   在执行 `flutter run` 命令后行按下 `M` 键以捕获 SkSL 着色器到一个类似
   `flutter_01.sksl.json` 的文件中。为了达到最好的效果，最好是能够在
   iOS 真机上抓取 SkSL 着色器，在模拟器上的抓取通常会是无效的。
</li>

<li markdown="1"> Build the app with SkSL warm-up using the following,
    as appropriate:

    在下面的命令中选择合适的构建带有 SkSL 预热的应用：

```terminal
flutter build ios --bundle-sksl-path flutter_01.sksl.json
```

If it's built for a driver test like `test_driver/app.dart`, make sure to also
specify `--target=test_driver/app.dart` (for example, `flutter build
ios --bundle-sksl-path flutter_01.sksl.json --target=test_driver/app.dart`).

如果它会构建一个类似 `test_driver/app.dart` 的驱动测试，
请确保指定 `--target=test_driver/app.dart`。
（例如 `flutter build ios --bundle-sksl-path flutter_01.sksl.json --target=test_driver/app.dart`）

</li>

<li markdown="1"> Test the newly built app.
</li>
</ol>

Alternatively, you can write some integration tests to
automate the first three steps using a single command.
For example:

或者，你可以编写一些集成测试来
使用一个命令自动执行前三个步骤。
例如：

```terminal
flutter drive --profile --cache-sksl --write-sksl-on-exit flutter_01.sksl.json -t test_driver/app.dart
```

With such [integration tests][], you can easily and reliably get the
new SkSLs when the app code changes, or when Flutter upgrades.
Such tests can also be used to verify the performance change
before and after the SkSL warm-up. Even better, you can put
those tests into a CI (continuous integration) system so the
SkSLs are generated and tested automatically over the lifetime of an app.

使用这样的 [集成测试][integration tests]，无论是代码发生改变或者 Flutter 更新了，
你都可以轻松获得可靠的着色器缓存。
这些测试也被用于验证开启着色器预热前后的性能变化上。
更好的做法是，你可以把这些测试放进 CI（持续集成）系统上，
这样就能在每次应用发布前自动生成并测试着色器缓存了。

[integration tests]: {{site.url}}/cookbook/testing/integration/introduction

{{site.alert.note}}

  The integration_test package is now the recommended way to write integration
  tests. See the [Integration testing]({{site.url}}/testing/integration-tests/) page
  for details.

  集成测试（integration_test）package，现在已经成为编写集成测试首推的 package。
  请在 [集成测试](/docs/testing/integration-tests/) 页面上查看详情。

{{site.alert.end}}

Take the original version of [Flutter Gallery][] as an example.
The CI system is set up to generate SkSLs for every Flutter commit,
and verifies the performance, in the [`transitions_perf_test.dart`][] test.
For more details, see the [`flutter_gallery_sksl_warmup__transition_perf`][]
and [`flutter_gallery_sksl_warmup__transition_perf_e2e_ios32`][] tasks.

就拿原始版本的 [Flutter Gallery][] 举例。
我们让 CI 系统在每次 Flutter commit 后都生成着色器缓存，
并在 `transitions_perf_test.dart`][] 中验证性能。
更多详细信息请查看 [Flutter Gallery sksl 预热过渡性能验证][`flutter_gallery_sksl_warmup__transition_perf`]，
以及 [Flutter Gallery sksl 预热过渡在 iOS_32 上的性能验证][`flutter_gallery_sksl_warmup__transition_perf_e2e_ios32`]。

[Flutter Gallery]: {{site.repo.flutter}}/tree/main/dev/integration_tests/flutter_gallery
[`flutter_gallery_sksl_warmup__transition_perf`]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_sksl_warmup__transition_perf.dart
[`flutter_gallery_sksl_warmup__transition_perf_e2e_ios32`]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_sksl_warmup__transition_perf_e2e_ios32.dart
[`transitions_perf_test.dart`]: {{site.repo.flutter}}/blob/master/dev/integration_tests/flutter_gallery/test_driver/transitions_perf_test.dart

The worst frame rasterization time is a nice metric from
such integration tests to indicate the severity of shader
compilation jank. For instance,
the steps above reduce Flutter gallery's shader compilation
jank and speeds up its worst frame rasterization time on a
Moto G4 from ~90 ms to ~40 ms. On iPhone 4s,
it's reduced from ~300 ms to ~80 ms. That leads to the visual
difference as illustrated in the beginning of this article.

在这种这种集成测试中，
最差的帧光栅化时间是一个很好的指标来衡量
着色器编译卡顿的严重性。 
例如，上述步骤减少了 Flutter gallery 应用的着色器编译卡顿，
并减少了它在 Moto G4 手机上的最差的帧光栅化时间，从 ~90 ms 减少到 ~40 ms。
在 iPhone 4s 上，它从 ~300 ms 减少到 ~80 ms。 
这种视觉差异如同本文开头所示一样。

