---
# title: Shader compilation jank
title: 着色器编译时卡顿
# shortTitle: Shader jank
shortTitle: 着色器卡顿
# description: What is shader jank and how to minimize it.
description: 你会了解到什么是着色器卡顿以及如何减少它。
tags: Flutter性能
keywords: 卡顿
---

{% render docs/performance.md %}

If the animations on your mobile app appear to be janky,
but only on the first run,
this is likely due to shader compilation.
Flutter's long term solution to
shader compilation jank is [Impeller][],
which is the default renderer on iOS.
You can preview Impeller on Android by passing
`--enable-impeller` to `flutter run`.

如果你的移动应用程序上的动画只在首次运行时卡顿，
很可能是着色器编译引起的。
Flutter 对着色器编译卡顿的长期解决方案是 [Impeller][]，
在 iOS 上是默认的渲染器。
在 Android 上，你可以使用指令 `flutter run` 传递 `--enable-impeller`
来预览 Impeller。

[Impeller]: /perf/impeller

While we work on making Impeller fully production ready,
you can mitigate shader compilation jank by bundling
precompiled shaders with an iOS app.
Unfortunately, this approach doesn't work well on Android
due to precompiled shaders being device or GPU-specific.
The Android hardware ecosystem is large enough that the
GPU-specific precompiled shaders bundled with an application
will work on only a small subset of devices,
and will likely make jank worse on the other devices,
or even create rendering errors.

在我们努力让 Impeller 为生产做好准备的时候，
你可以尝试将预编译的着色器与 iOS 应用绑定在一起来减轻着色器编译的卡顿。
不幸的是，由于预编译的着色器是针对设备或特定 GPU 进行优化的，
所以这种方法在 Android 上效果不佳。
Android 的硬件生态系统非常庞大，
因此与应用程序绑定的特定 GPU 预编译着色器只能在一小部分设备上运行，
而且很可能会加剧其他设备上的卡顿问题，甚至引发渲染错误。

Also, note that we aren't planning to make
improvements to the developer experience for creating
precompiled shaders described below. Instead,
we are focusing our energies on more robust
solution to this problem that Impeller offers.

另外，请注意，我们并不打算改进下面描述的创建预编译着色器。
相反，为了真正解决这个问题，
我们将主要精力集中在 Impeller 提供的更强大的解决方案上。

## What is shader compilation jank?

## 什么是着色器编译卡顿？

A shader is a piece of code that runs on a
GPU (graphics processing unit).
When the Skia graphics backend that Flutter uses for rendering
sees a new sequence of draw commands for the first time,
it sometimes generates and compiles a
custom GPU shader for that sequence of commands.
This allows that sequence and potentially similar sequences
to render as fast as possible.

着色器是在 GPU（图形处理单元）上运行的代码。
当 Flutter 渲染的 Skia 图形后端首次看到新的绘制命令序列时，
它有时会生成和编译一个自定义的 GPU 着色器用于该命令序列。
使得该序列和潜在类似的序列能够尽可能快地渲染。

Unfortunately, Skia's shader generation and compilation
happens in sequence with the frame workload.
The compilation could cost up to a few hundred milliseconds
whereas a smooth frame needs to be drawn within 16 milliseconds
for a 60 fps (frame-per-second) display.
Therefore, a compilation could cause tens of frames
to be missed, and drop the fps from 60 to 6.
This is _compilation jank_.
After the compilation is complete,
the animation should be smooth.

然而不幸的是，Skia 着色器生成和编译的过程与帧的工作是依次进行的。
编译过程可能需要几百毫秒的时间，而对于 60 帧/秒 (frame-per-second) 的显示来说，
一个流畅的帧必须在 16 毫秒内绘制完成。因此，编译过程可能导致数十帧被丢失，
使帧数从 60 降到 6。这就是所谓的 **编译卡顿** 。编译完成之后，动画应该会变得流畅。

On the other hand, Impeller generates and compiles all
necessary shaders when we build the Flutter Engine.
Therefore apps running on Impeller already have
all the shaders they need, and the shaders can be used
without introducing jank into animations.

另一方面，Impeller 在我们构建 Flutter 引擎时已经生成并编译了所有必要的着色器。
因此，在 Impeller 上运行的应用程序已经拥有了它们所需的所有着色器，
并且这些着色器不会在动画中引起卡顿。

Definitive evidence for the presence of shader compilation jank
is to set `GrGLProgramBuilder::finalize` in the tracing
with `--trace-skia` enabled.
The following screenshot shows an example timeline tracing.

要获得更加确切的着色器编译卡顿存在的证据，
你可以在 `--trace-skia` 开启时查看追踪文件中的
`GrGLProgramBuilder::finalize`。
下面的截图展示了一个 timeline 追踪的样例。

![A tracing screenshot verifying jank](/assets/images/docs/perf/render/tracing.png){:width="100%"}

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

Flutter provides command line tools
for app developers to collect shaders that might be needed
for end-users in the SkSL (Skia Shader Language) format.
The SkSL shaders can then be packaged into the app,
and get warmed up (pre-compiled) when an end-user first
opens the app, thereby reducing the compilation
jank in later animations.
Use the following instructions to collect
and package the SkSL shaders:

Flutter 为应用开发者提供了一个命令行工具以收集终端用户在
SkSL（Skia 着色器语言）进行格式化处理中需要用到的着色器。
SkSL 着色器可以被打包进应用，并提前进行预热（预编译），
这样当终端用户第一次打开应用时，就能够减少动画的编译掉帧了。
使用下面的指令收集并打包 SkSL 的着色器：

<ol>
<li>

Run the app with `--cache-sksl` turned on
to capture shaders in SkSL:

​打开 `--cache-sksl` 运行你的应用以捕获 SkSL 中的着色器：

```console
flutter run --profile --cache-sksl
```

If the same app has been previously run
without `--cache-sksl`, then the
`--purge-persistent-cache` flag might be needed:

如果这个相同的应用之前运行的时候没有使用 `--cache-sksl`，
你需要加上 `--purge-persistent-cache` 标志：

```console
flutter run --profile --cache-sksl --purge-persistent-cache
```

This flag removes older non-SkSL shader caches that
could interfere with SkSL shader capturing.
It also purges the SkSL shaders so use it *only* on the first
`--cache-sksl` run.

这个标志将会删除可能干扰 SkSL 的较旧的非 SkSL 着色器缓存捕获的着色器。 
它还清除了 SkSL 着色器，因此*仅*在第一次使用 `--cache-sksl` 运行。

</li>

<li>

Play with the app to trigger as many animations
as needed; particularly those with compilation jank.

尽可能多触发应用的动画，特别是那些会引起编译卡顿的。

</li>

<li> 

Press `M` at the command line of `flutter run` to
write the captured SkSL shaders into a file named something like
`flutter_01.sksl.json`.
For best results,
capture SkSL shaders on an actual iOS device.
A shader captured on a simulator isn't likely to work correctly
on actual hardware.

在执行 `flutter run` 命令后行按下 `M` 键以捕获 SkSL 着色器到一个类似
`flutter_01.sksl.json` 的文件中。为了达到最好的效果，最好是能够在
iOS 真机上抓取 SkSL 着色器，在模拟器上的抓取通常会是无效的。

</li>

<li> 

Build the app with SkSL warm-up using the following,
as appropriate:

在下面的命令中选择合适的构建带有 SkSL 预热的应用：

```console
flutter build ios --bundle-sksl-path flutter_01.sksl.json
```

If it's built for a driver test like `test_driver/app.dart`,
make sure to also specify `--target=test_driver/app.dart`
(for example, `flutter build ios --bundle-sksl-path
flutter_01.sksl.json --target=test_driver/app.dart`).

如果它会构建一个类似 `test_driver/app.dart` 的驱动测试，
请确保指定 `--target=test_driver/app.dart`。
（例如 `flutter build ios --bundle-sksl-path flutter_01.sksl.json --target=test_driver/app.dart`）

</li>

<li> Test the newly built app.
</li>
</ol>

Alternatively, you can write some integration tests to
automate the first three steps using a single command.
For example:

或者，你可以编写一些集成测试来
使用一个命令自动执行前三个步骤。
例如：

```console
flutter drive --profile --cache-sksl --write-sksl-on-exit flutter_01.sksl.json -t test_driver/app.dart
```

With such [integration tests][],
you can easily and reliably get the
new SkSLs when the app code changes,
or when Flutter upgrades.
Such tests can also be used to verify the performance change
before and after the SkSL warm-up.
Even better, you can put those tests into a
CI (continuous integration) system so the
SkSLs are generated and tested automatically over the lifetime of an app.

使用这样的 [集成测试][integration tests]，无论是代码发生改变或者 Flutter 更新了，
你都可以轻松获得可靠的着色器缓存。
这些测试也被用于验证开启着色器预热前后的性能变化上。
更好的做法是，你可以把这些测试放进 CI（持续集成）系统上，
这样就能在每次应用发布前自动生成并测试着色器缓存了。

[integration tests]: /cookbook/testing/integration/introduction

:::note

The integration_test package is now the recommended way
to write integration tests. Refer to the
[Integration testing](/testing/integration-tests/)
page for details.

集成测试（integration_test）package，
现在已经成为编写集成测试首推的 package。
请在 [集成测试](/testing/integration-tests/) 页面上查看详情。

:::

Take the original version of [Flutter Gallery][] as an example.
The CI system is set up to generate SkSLs for every Flutter commit,
and verifies the performance, in the [`transitions_perf_test.dart`][] test.
For more details,
check out the [`flutter_gallery_sksl_warmup__transition_perf`][] and
[`flutter_gallery_sksl_warmup__transition_perf_e2e_ios32`][] tasks.

就拿原始版本的 [Flutter Gallery][] 举例。
我们让 CI 系统在每次 Flutter commit 后都生成着色器缓存，
并在 [`transitions_perf_test.dart`][] 中验证性能。
更多详细信息请查看 [Flutter Gallery sksl 预热过渡性能验证][`flutter_gallery_sksl_warmup__transition_perf`]，
以及 [Flutter Gallery sksl 预热过渡在 iOS_32 上的性能验证][`flutter_gallery_sksl_warmup__transition_perf_e2e_ios32`]。

[Flutter Gallery]: {{site.repo.flutter}}/tree/main/dev/integration_tests/flutter_gallery
[`flutter_gallery_sksl_warmup__transition_perf`]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_sksl_warmup__transition_perf.dart
[`flutter_gallery_sksl_warmup__transition_perf_e2e_ios32`]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_sksl_warmup__transition_perf_e2e_ios32.dart
[`transitions_perf_test.dart`]: {{site.repo.flutter}}/blob/master/dev/integration_tests/flutter_gallery/test_driver/transitions_perf_test.dart

The worst frame rasterization time is a useful metric from
such integration tests to indicate the severity of shader
compilation jank.
For instance,
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

