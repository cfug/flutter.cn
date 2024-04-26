---
title: Performance metrics
title: 性能指标
description: Flutter metrics, and which tools and APIs are used to get them
description: Flutter 性能指标与能获取它们的 API 和工具
---

* Startup time to the first frame

  第一帧的启动时间

  * Check the time when
    [WidgetsBinding.instance.firstFrameRasterized][firstFrameRasterized] 
    is true.
    
    当 [WidgetsBinding.instance.firstFrameRasterized][firstFrameRasterized] 为 true 时查看耗时。
    
  * See the
    [perf dashboard](https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3DtimeToFirstFrameRasterizedMicros).
    
    查看 [性能数据看板](https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3DtimeToFirstFrameRasterizedMicros)。
    
* Frame buildDuration, rasterDuration, and totalSpan

  一帧的构建时间，栅格化时间，以及总时间
  
  * See [`FrameTiming`]({{site.api}}/flutter/dart-ui/FrameTiming-class.html)
    in the API docs.
    
    在 API 文档中查看 [`FrameTiming`]({{site.api}}/flutter/dart-ui/FrameTiming-class.html.) 。
    
* Statistics of frame `buildDuration` (`*_frame_build_time_millis`)

  一帧的构建时间 `buildDuration` (`*_frame_build_time_millis`)

  * We recommend monitoring four stats: average, 90th percentile, 99th
    percentile, and worst frame build time.
    
    我们建议监测四个数据：平均值、90 分位值、99 分位值和最差帧构建时间。
    
  * See, for example, [metrics][transition_build] for the 
    `flutter_gallery__transition_perf` test.

    例如，查看 `flutter_gallery__transition_perf` 测试案例中的 [构建数据][transition_build] 。
    
* Statistics of frame `rasterDuration` (`*_frame_build_time_millis`)

  一帧的栅格化时间 `rasterDuration` (`*_frame_build_time_millis`)
  
  * We recommend monitoring four stats: average, 90th percentile, 99th
    percentile, and worst frame build time.
  
    我们建议监测四个数据：平均值、90 分位值、99 分位值和最差帧构建时间。    
    
  * See, for example, [metrics][transition_raster] for the 
    `flutter_gallery__transition_perf` test.

    例如，查看 `flutter_gallery__transition_perf` 测试案例中的 [栅格化数据][transition_build] 。

* CPU/GPU usage (a good approximation for energy use)

  CPU/GPU 的使用情况（一个可以近似衡量功耗的指标）

  * The usage is currently only available through trace events. See
    [profiling_summarizer.dart][profiling_summarizer].
    
    该数据目前仅能通过跟踪事件获取。查看 [profiling_summarizer.dart][profiling_summarizer] 。
    
  * See [metrics][cpu_gpu] for the `simple_animation_perf_ios` test.
  
    查看 `simple_animation_perf_ios` 测试案例中的 [CPU/GPU 数据][cpu_gpu]。

* release_size_bytes to approximately measure the size of a Flutter app

  release_size_bytes 对 Flutter 应用程序的大小进行估算

  * See the [basic_material_app_android][], [basic_material_app_ios][],
    [hello_world_android][], [hello_world_ios][], [flutter_gallery_android][],
    and [flutter_gallery_ios][] tests.
    
    查看 [basic_material_app_android][]、[basic_material_app_ios][]、[hello_world_android][]、[hello_world_ios][]、[flutter_gallery_android][] 和
    [flutter_gallery_ios][] 测试案例。
    
  * See [metrics][size_perf] in the dashboard.
  
    查看数据看板中的 [体积大小][size_perf] 数据。
  
  * For info on how to measure the size more accurately,
    see the [app size](/perf/app-size) page.

    有关如何更精确的测量应用体积信息，查看 [应用体积](/perf/app-size) 页面。

For a complete list of performance metrics Flutter measures per commit, visit 
the following sites, click **Query**, and filter the **test** and 
**sub_result** fields:

如果你想获取完整的 Flutter 性能指标列表，访问以下的站点，点击 **Query** ，
然后选择 **test** 和 **sub_result** ：

  * [https://flutter-flutter-perf.skia.org/e/](https://flutter-flutter-perf.skia.org/e/)
  * [https://flutter-engine-perf.skia.org/e/](https://flutter-engine-perf.skia.org/e/)

[firstFrameRasterized]: {{site.api}}/flutter/widgets/WidgetsBinding/firstFrameRasterized.html
[transition_build]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3D90th_percentile_frame_build_time_millis%26sub_result%3D99th_percentile_frame_build_time_millis%26sub_result%3Daverage_frame_build_time_millis%26sub_result%3Dworst_frame_build_time_millis%26test%3Dflutter_gallery__transition_perf
[transition_raster]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3D90th_percentile_frame_rasterizer_time_millis%26sub_result%3D99th_percentile_frame_rasterizer_time_millis%26sub_result%3Daverage_frame_rasterizer_time_millis%26sub_result%3Dworst_frame_rasterizer_time_millis%26test%3Dflutter_gallery__transition_perf
[profiling_summarizer]: {{site.repo.flutter}}/blob/master/packages/flutter_driver/lib/src/driver/profiling_summarizer.dart
[cpu_gpu]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3Daverage_cpu_usage%26sub_result%3Daverage_gpu_usage%26test%3Dsimple_animation_perf_ios
[basic_material_app_android]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/basic_material_app_android__compile.dart
[basic_material_app_ios]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/basic_material_app_ios__compile.dart
[hello_world_android]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/hello_world_android__compile.dart
[hello_world_ios]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/hello_world_ios__compile.dart
[flutter_gallery_android]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_android__compile.dart
[flutter_gallery_ios]: {{site.repo.flutter}}/blob/master/dev/devicelab/bin/tasks/flutter_gallery_ios__compile.dart
[size_perf]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3Drelease_size_bytes%26test%3Dbasic_material_app_android__compile%26test%3Dbasic_material_app_ios__compile%26test%3Dhello_world_android__compile%26test%3Dhello_world_ios__compile%26test%3Dflutter_gallery_ios__compile%26test%3Dflutter_gallery_android__compile