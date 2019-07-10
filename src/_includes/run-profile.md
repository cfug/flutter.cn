## Profile or release runs

## 以 profile 模式运行

{{site.alert.important}}

  Do _not_ test the performance of your app with debug and
  hot reload enabled.
  
  **请勿**在调试模式和热重载功能开启的情况下做性能测试。
  
{{site.alert.end}}

The app you've run so far is built in debug mode,
which allows faster development
(for example, by supporting hot reload)
at a big performance cost. Therefore,
janky animations are expected in such mode.
Once you are ready to analyze performance or
release your app, you'll want to use Flutter's
profile or release builds. For more information,
see [Flutter's build modes](/docs/testing/build-modes).

截止目前文档所示内容，你的应用应该运行在调试 (debug) 模式中，
这个模式意味着在更大的性能开销下实现了更快速的开发效率，
比如热重载功能的启用，因此你可能要面临较差质量的动画效果。
当你准备分析应用性能或要打包发布的时候，你可能需要 Flutter
的 profile 或者 release 构建，相关文档，请查阅文档：
[Flutter 的构建模式选择](/docs/testing/build-modes)。
