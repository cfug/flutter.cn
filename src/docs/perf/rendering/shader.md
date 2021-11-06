---
title: Reduce shader compilation jank on mobile
title: 在移动设备上减少着色器编译卡顿
short-title: Shader jank
short-title: 着色器卡顿
description: What is shader jank and how to minimize it.
description: 你会了解到什么是着色器卡顿以及如何减少它。
tags: Flutter性能
keywords: 卡顿
---

{% include docs/performance.md %}

If the animations on your mobile app appear to be janky,
but only on the first run, you can _warm up_ the
shader captured in the Skia Shader Language (SkSL) for a
significant improvement.

如果在你的手机应用中发现有些动画出现了卡顿，
但仅仅会在第一次运行的时候会有这种情况，
那么你可以通过 Skia 的着色器语言进行着色器预热，
带来颇见成效的改善。

![Side-by-side screenshots of janky mobile app next to non-janky app](/assets/images/docs/perf/render/shader-jank.gif)

## What is shader compilation jank?

## 什么是着色器编译卡顿？

If an app has janky animations during the first run,
and later becomes smooth for the same animation,
then it's very likely due to shader compilation jank.

如果应用中一些动画在首次运行时出现卡顿，
但同样的动画在之后变得流畅，
那么这非常可能是由于着色器编译导致的卡顿。

More technically, a shader is a piece of code that runs on
a GPU (graphics processing unit).
When a shader is first used, it needs to be compiled on the device.
The compilation could cost up to a few hundred milliseconds
whereas a smooth frame needs to be drawn within 16 milliseconds
for a 60 fps (frame-per-second) display.
Therefore, a compilation could cause tens of frames to be missed,
and drop the fps from 60 to 6. This is _compilation jank_.
After the compilation is complete, the animation should be smooth.

严格来说，着色器是运行在 GPU（图形处理单元）的一段代码。
当首次使用着色器时，它需要在设备上进行编译。
这个编译过程可能会消耗数百毫秒的时间，而要达到 60 fps 的流畅度，
我们必须要在 16 毫秒以内绘制完一帧。
因此，这个编译过程可能导致数十帧被丢失，让刷新率从 60 帧跌至 6 帧。
这就是编译卡顿。
在编译完成后，动画就流畅了。

Definitive evidence for the presence of shader compilation jank is to see
`GrGLProgramBuilder::finalize` in the tracing with `--trace-skia` enabled. See
the following screenshot for an example timeline tracing.

要获得更加确切的着色器编译卡顿存在的证据，你可以在 `--trace-skia` 开启时查看追踪文件中的 `GrGLProgramBuilder::finalize`。
下面的截图展示了一个 timeline 追踪的样例。

![A tracing screenshot verifying jank](/assets/images/docs/perf/render/tracing.png){:width="100%"}

## What do we mean by "first run"?

## 如何定义「首次运行」？

On Android, "first run" means that the user might see
jank the first time opening the app after a fresh
installation. Subsequent runs should be fine.

在 Android 上来说，
「首次运行」 意味着用户可能在新安装应用后，
第一次打开应用的时候看到了卡顿。
而之后运行都很正常。

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

    打开 `--cache-sksl` 运行你的应用以捕获 SkSL 中的着色器：

```sh
flutter run --profile --cache-sksl
```

If the same app has been previously run without `--cache-sksl`, then the
`--purge-persistent-cache` flag may be needed:

如果这个相同的应用之前运行的时候没有使用 `--cache-sksl`，
你需要加上 `--purge-persistent-cache` 标志：

```sh
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
   `flutter_01.sksl.json`. For best results, capture SkSL shaders on actual
   Android and iOS devices separately.

   在执行 `flutter run` 命令后行按下 `M` 键以捕获 SkSL 着色器到一个类似 `flutter_01.sksl.json` 的文件中。
   最好在 Android 和 iOS 真机上分别抓取 SkSL 着色器。
</li>

<li markdown="1"> Build the app with SkSL warm-up using the following,
    as appropriate:

    在下面的命令中选择合适的构建带有 SkSL 预热的应用：

Android:
```sh
flutter build apk --bundle-sksl-path flutter_01.sksl.json
```
or
```sh
flutter build appbundle --bundle-sksl-path flutter_01.sksl.json
```

iOS:
```sh
flutter build ios --bundle-sksl-path flutter_01.sksl.json
```

If it's built for a driver test like `test_driver/app.dart`, make sure to also specify `--target=test_driver/app.dart` (e.g., `flutter build ios --bundle-sksl-path flutter_01.sksl.json --target=test_driver/app.dart`).

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

```sh
flutter drive --profile --cache-sksl --write-sksl-on-exit flutter_01.sksl.json -t test_driver/app.dart
```

With such [integration tests][], you can easily and reliably get the
new SkSLs when the app code changes, or when Flutter upgrades.
Such tests can also be used to verify the performance change
before and after the SkSL warm-up. Even better, you can put
those tests into a CI (continuous integration) system so the
SkSLs are generated and tested automatically over the lifetime of an app.

使用这样的 [集成测试][integration tests]，无论是代码发生改变，或者 Flutter 更新了，
你都可以轻松获得可靠的着色器缓存。
这些测试也被用于验证开启着色器预热前后的性能变化上。
更好的做法是，你可以把这些测试放进 CI（持续集成）系统上，
这样就能在每次应用发布前自动生成并测试着色器缓存了。

{{site.alert.note}}

  The integration_test package is now the recommended way to write integration
  tests. See the [Integration testing](/docs/testing/integration-tests/) page
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

[Flutter Gallery]: {{site.repo.flutter}}/tree/master/dev/integration_tests/flutter_gallery
[`flutter_gallery_sksl_warmup__transition_perf`]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_sksl_warmup__transition_perf.dart
[`flutter_gallery_sksl_warmup__transition_perf_e2e_ios32`]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_sksl_warmup__transition_perf_e2e_ios32.dart
[integration tests]: /docs/cookbook/testing/integration/introduction
[`transitions_perf_test.dart`]: {{site.repo.flutter}}/blob/master/dev/integration_tests/flutter_gallery/test_driver/transitions_perf_test.dart
[limitations and considerations]: /docs/perf/rendering/shader#limitations-and-considerations

## Frequently asked questions

## 常见问题

1. **Why not just compile or warm up _all_ possible shaders?**<br><br>
   If there were only a limited number of possible shaders,
   then Flutter could compile all of them when an application is built.
   However, for the best overall performance,
   the Skia GPU backend used by Flutter dynamically generates
   shaders based on many parameters at runtime
   (for example draws, device models, and driver versions).
   Due to all possible combinations of those parameters,
   the number of possible shaders multiplies quickly.
   In short, Flutter uses programs (app, Flutter, and Skia code)
   to generate some other programs (shaders). The number of possible
   shader programs that Flutter can generate is too large to
   precompute and bundle with an application.

   **为什么不把全部可能的着色器都给预编译/预热了？**<br><br>
   如果只有少数几个可能有的着色器的话，
   Flutter 当然可以在应用构建时将他们全部预编译。
   然而，对于最佳总体性能来看，
   Skia GPU 后端在运行时使用了 Flutter 基于许多参数（例如，绘图、设备型号和驱动程序版本）在动态生成的着色器。
   由于这些参数的所有可能的组合，导致着色器数量迅速增加。
   简而言之，Flutter 使用程序（app、Flutter 和 Skia 代码）生成一些其他程序（着色器）可能太大
   而无法预先计算并与应用程序捆绑。

2. **Can SkSLs captured from one device help shader compilation jank
   on another device?**<br><br>
   Theoretically, there's no guarantee that the SkSLs from one device
   would help on another device (but they also won't cause any troubles
   if SkSLs aren't compatible across devices).
   Practically, as shown in the table on this [SkSL-based warmup issue][],
   SkSLs work surprisingly well
   even if 1) SkSLs are captured from iOS and then applied to Android devices,
   or 2) SkSLs are captured from emulators and then applied to real mobile
   devices. As the Flutter team has only a limited number of devices in the lab,
   we currently don't have enough data to provide a big picture of cross-device
   effectiveness. We'd love you to provide us more data points to see how it
   works in the wild&mdash;[`FrameTiming`][] can be used to compute the worst frame
   rasterization time in release mode; the worst frame rasterization time is
   a good indicator on how severe the shader compilation jank is.

    **不同设备下 SkSLs 捕捉的着色器编译能通用吗**<br><br>
    理论上不保证一个设备的 SkSLs 能够帮助另一个设备（但也不会因为 SkSLs 在不同的设备上的不匹配导致其他问题）。
    在这个 [SkSL-based warmup issue][] 的表格中，SkSLs 几乎都表现得出乎意料的好，
    即使是 1）在 iOS 设备上捕捉 SkSLs 然后再 Android 设备上使用，
    或是 2）SkSLs 在模拟器上捕捉，然后用在真机上。
    由于 Flutter 团队的实验室设备数量有限，
    我们目前没有足够的数据来支持跨设备有效性。 
    我们希望您向我们提供更多数据，以了解它如何
    在大范围的生效&mdash;&mdash;
    [`FrameTiming`][] 可用于计算 release 模式下的最差帧的光栅化时间； 
    最坏的帧光栅化时间是衡量着色器编译卡顿严重程度的一个很好的指标。

   
3. **Why can't you create a single "ubershader" and just compile that once?**<br><br>
   One idea that people sometimes suggest is to create a single large shader that
   implements all of Skia's features, and use that shader while the more optimized
   bespoke shaders are being compiled.<br><br>
   This is similar to [a solution used by the Dolphin Emulator][].<br><br>
   In practice we believe implementing this for Flutter (or more specifically for
   Skia) would be impractical. Such a shader would be fantastically large, essentially
   reimplementing all of Skia on the GPU. This would itself take a long time to compile,
   thus introducing more jank; it would not necessarily be fast enough to avoid jank 
   even when compiled; and it would likely introduce fidelity issues (e.g. flickering)
   since there would likely be differences in precise rendering between the optimized
   shaders and the "ubershader".<br><br>
   That said, Flutter and Skia are open source and we are eager to see proofs-of-concept
   along these lines if this is something that interests you. To get started, please
   see our [contribution guidelines].

   **为什么不能创建一个「超级着色器」并只编译一次？**<br><br>
   有人建议创建一个超大的着色器
   实现了 Skia 的所有功能，并在优化的同时使用该着色器
   定制正在编译的着色器。<br><br>
   这类似于 [海豚模拟器使用的解决方案][a solution used by the Dolphin Emulator]。<br><br>
   在实践中，我们相信为 Flutter（更具体地来说，是为 Skia）这样做将是不切实际的。
   这样的着色器会非常大，本质上在 GPU 上重新实现所有 Skia。
   这本身需要很长时间来编译，从而引入更多的卡顿；
   即使在编译时，它也不一定足够快以避免卡顿；
   它还可能会引入保真度问题（例如闪烁）
   着色器和「超级着色器」之间因为优化后的精确渲染可能存在差异。<br><br>
   Flutter 和 Skia 是开源的，如果这是你感兴趣的东西的话，
   我们希望看到沿着这些思路的概念被验证。
   要开始，请请参阅我们的 [贡献指南][contribution guidelines]。

4. **This process would be easier if the `flutter` tool could do X!**<br><br>
   There are a number of possible ways that the tooling around shader warm-up
   could be improved. Some are already listed as ideas under our [Early-onset jank][]
   project on GitHub. Please let us know what is important to you by giving
   a thumbs-up to your feature request, or by filing a new one if one doesn't
   already exist.

   **如果 `flutter` 工具可以做 X 就可以简化这些过程！**<br><br>
   围绕着色器预热的工具有多种可能的方式可以改进。 
   有些已经在想法已经被列在我们的 [Early-onset jank][] 这个 GitHub 的项目下。 
   请在你想要的功能下点赞，让我们知道什么对你非常重要。
   如果没有已经存在的功能需求的话，请提交一个新请求。

## Future work

## 将要做的事

On both Android and iOS, shader warm-up has a few drawbacks:
1. The size of the deployed app is larger because it contains the bundled shaders.
2. App startup latency is longer because the bundled shaders need to be precompiled.
3. Most importantly, we are not happy with the developer experience of shader
warm-up. In particular we view the process of performing training runs, and reasoning
about the trade-offs imposed by (1) and (2) to be too onerous.

在 Android 和 iOS 上，着色器预热有一些缺点：
1. 交付的应用包体积增加了，因为它包含了一些绑定的着色器。
2. 应用启动等待时间变长，因为这些绑定的着色器需要进行编译。
3. 最重要的是，我们对着色器预热的开发体验很不满意。
特别是我们发现由于 (1) 和 (2) 导致执行训练运行和推理的过程的权衡过于繁重。

Therefore, we are [continuing to investigate][] approaches to shader compilation jank, and
jank more generally, that do not rely on shader warm-up. In particular, we are both
working with Skia to [reduce the number of shaders][] it generates in response to
Flutter’s requests, as well as investigating how much of Flutter could be implemented
with a [small set of statically defined shaders][] that we could bundle with the Flutter
Engine. Stay tuned for more progress!

因此，我们正在 [继续研究][continuing to investigate] 解决着色器编译卡顿的方法，
并且不依赖于着色器预热，更常见的卡顿。 
特别是，我们与 Skia 共同 [减少着色器的数量][reduce the number of shaders]，
它根据 Flutter 的请求返回 Flutter 可以实现多少可以与 
Flutter 引擎捆绑的 [一小组静态定义的着色器][small set of statically defined shaders]。 
敬请期待更多进展！

[`FrameTiming`]: {{site.api}}/flutter/dart-ui/FrameTiming-class.html
[SkSL-based warmup issue]: {{site.repo.flutter}}/issues/53607#issuecomment-608587484
[a solution used by the Dolphin Emulator]: https://dolphin-emu.org/blog/2017/07/30/ubershaders/
[contribution guidelines]: {{site.repo.flutter}}/blob/master/CONTRIBUTING.md
[continuing to investigate]: {{site.repo.flutter}}/projects/188
[Early-onset jank]: {{site.repo.flutter}}/projects/188
[reduce the number of shaders]: https://bugs.chromium.org/p/skia/issues/detail?id=11844
[small set of statically defined shaders]: {{site.repo.flutter}}/issues/77412

If you have questions on SkSL shader warm-up,
please comment on [Issue 60313][] and [Issue 53607][].
If you have general shader warm-up questions,
please refer to [Issue 32170][].

如果你对 SkSL 着色器预热有任何疑问，
请在 [Issue 60313][] 以及 [Issue 53607][] 提问。
如果你有一般的着色器预热的问题，
请链接到 [Issue 32170][]。

[Issue 32170]: {{site.repo.flutter}}/issues/32170
[Issue 53607]: {{site.repo.flutter}}/issues/53607
[Issue 60313]: {{site.repo.flutter}}/issues/60313
