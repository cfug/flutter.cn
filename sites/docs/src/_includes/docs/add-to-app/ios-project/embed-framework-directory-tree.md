The following example assumes that you want to generate the
frameworks to `/path/to/MyApp/Flutter/`.

以下示例假定你要将 framework 生成到 `/path/to/MyApp/Flutter/`。

```console
$ flutter build ios-framework --output=/path/to/MyApp/Flutter/
```

Run this _every time_ you change code in your Flutter module.

**每次** 更改 Flutter 模块中的代码时都要运行此命令。

The resulting project structure should resemble this directory tree.

生成的项目结构应与此目录树类似。

<FileTree>

- /path/to/MyApp/
  - Flutter/
    - Debug/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework (If you have plugins with iOS-platform code)
      - example_plugin.xcframework (One framework file for each plugin)
    - Profile/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework
    - Release/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework

</FileTree>

:::warning
Always use `Flutter.xcframework` and `App.xcframework` bundles
located in the same directory.
Mixing `.xcframework` imports from different directories
(like `Profile/Flutter.xcframework` with `Debug/App.xcframework`)
causes runtime crashes.

始终使用位于同一目录中的 `Flutter.xcframework` 和 `App.xcframework` bundle。
混用来自不同目录的 `.xcframework` 导入
（例如将 `Profile/Flutter.xcframework` 与 `Debug/App.xcframework` 搭配使用）
会导致运行时崩溃。
:::
