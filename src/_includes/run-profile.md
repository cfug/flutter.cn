## Profile run

## 以 profile 模式运行

{{site.alert.important}}

  Do _not_ test the performance of your app with debug and hot reload enabled.
  
  **请勿**在调试模式和热重载功能开启的情况下做性能测试。
  
{{site.alert.end}}

The app you've run so far is in the debug mode which allows faster development (e.g., hot reload) at a big performance overhead. Therefore, janky animations are expected in such mode. To see how the app performs in release, try {{include.ide_profile}} the following terminal command.

截止目前文档所示内容，你的应用应该运行在调试 (debug) 模式中，这个模式意味着在更大的性能开销下实现了更快速的开发效率，比如热重载功能的启用。因此，你可能要面临较差质量的动画效果。要查看应用在发布 (release) 模式下的性能，请尝试 {{include.ide_profile}} 执行下面的命令。

```terminal
$ flutter run --profile
```

The animations should be much smoother compared to those in the debug mode.

Profile 模式运行应用的动画效果将会比调试模式更平滑。