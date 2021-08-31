## Profile or release runs

## 以 profile 模式运行

{{site.alert.important}}

  Do _not_ test the performance of your app with debug and
  hot reload enabled.
  
  **请勿**在调试模式和热重载功能开启的情况下做性能测试。
  
{{site.alert.end}}

So far you've been running your app in *debug* mode. Debug
mode trades performance for useful developer features such
as hot reload and step debugging. It's not unexpected to
see slow performance and janky animations in debug mode.
Once you are ready to analyze performance or release your
app, you'll want to use Flutter's "profile" or "release"
build modes. For more details, see [Flutter's build modes][].

截止目前文档所示内容，你的应用应该运行在调试 (debug) 模式中，
这个模式意味着在更大的性能开销下实现了更快速的开发效率，
比如热重载功能的启用，因此你可能要面临较差质量的动画效果。
当你准备分析应用性能或要打包发布的时候，你可能需要 Flutter
的 profile 或者 release 构建，相关文档，请查阅文档：
[Flutter 的构建模式选择](/docs/testing/build-modes)。

{{site.alert.important}}
  
  If you're concerned about the package size of your app,
  see [Measuring your app's size][].
  
  如果你关心应用大小，请参考 [这篇文档][Measuring your app's size]。
  
{{site.alert.end}}

[Flutter's build modes]: /docs/testing/build-modes
[Measuring your app's size]:  /docs/perf/app-size
